import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifyEnv from "@fastify/env";
import fastifyCookie from "@fastify/cookie";
import fastifySession from "@fastify/session";
import fastifyPassport from "@fastify/passport";
import { Strategy as TwitterStrategy } from "passport-twitter";
import jwt from "jsonwebtoken";
import type { FastifyRequest, FastifyReply } from "fastify";

// Environment schema
const envSchema = {
  type: "object",
  required: ["JWT_SECRET", "TWITTER_API_KEY", "TWITTER_API_SECRET"],
  properties: {
    PORT: {
      type: "string",
      default: "8080",
    },
    JWT_SECRET: {
      type: "string",
    },
    TWITTER_API_KEY: {
      type: "string",
    },
    TWITTER_API_SECRET: {
      type: "string",
    },
    TWITTER_CALLBACK_URL: {
      type: "string",
      default: "http://localhost:8080/api/auth/twitter/callback",
    },
    BASE_URL: {
      type: "string",
      default: "http://localhost:8080",
    },
    FRONTEND_URL: {
      type: "string",
      default: "http://localhost:3000",
    },
    NODE_ENV: {
      type: "string",
      default: "development",
    },
  },
};

declare module "fastify" {
  interface FastifyInstance {
    config: {
      PORT: string;
      JWT_SECRET: string;
      TWITTER_API_KEY: string;
      TWITTER_API_SECRET: string;
      TWITTER_CALLBACK_URL: string;
      BASE_URL: string;
      FRONTEND_URL: string;
      NODE_ENV: string;
    };
  }
}

const buildApp = async () => {
  const app = Fastify({
    logger: true,
    trustProxy: true,
  });

  // Register environment variables
  await app.register(fastifyEnv, {
    schema: envSchema,
    dotenv: {
      path: "../../.env",
    },
  });

  // Register CORS
  await app.register(cors, {
    origin: app.config.FRONTEND_URL,
    credentials: true,
  });

  // Register cookie parser (required for session)
  await app.register(fastifyCookie);

  // Register session (required for Twitter OAuth 1.0a)
  await app.register(fastifySession, {
    secret: app.config.JWT_SECRET,
    cookie: {
      secure: app.config.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 600000, // 10 minutes
    },
  });

  // Register Passport
  await app.register(fastifyPassport.initialize());
  await app.register(fastifyPassport.secureSession());

  // Configure Twitter OAuth strategy
  fastifyPassport.use(
    new TwitterStrategy(
      {
        consumerKey: app.config.TWITTER_API_KEY,
        consumerSecret: app.config.TWITTER_API_SECRET,
        callbackURL: app.config.TWITTER_CALLBACK_URL,
      },
      async (token, tokenSecret, profile, done) => {
        try {
          app.log.info({ profile }, "Twitter OAuth callback received");

          const twitterId = profile.id;
          const twitterUsername = profile.username;
          const twitterName = profile.displayName;
          const profileImage = profile.photos?.[0]?.value || null;

          // Dynamic import to avoid circular dependency issues
          const { userOperations } = await import("./db/index");

          // Check if user exists
          let user = await userOperations.findByTwitterId(twitterId);

          if (!user) {
            // Create new user
            user = await userOperations.createTwitterUser({
              twitterId,
              twitterHandle: twitterUsername,
              twitterName,
              twitterProfileImage: profileImage,
              twitterFollowers: null, // Can be fetched later
              walletAddress: `pending_${twitterId}`, // Temporary until wallet connected
            });
          } else {
            // Update last login
            await userOperations.updateLastLogin(user.id);
          }

          return done(null, user);
        } catch (error) {
          app.log.error(error, "Twitter OAuth error");
          return done(error, null);
        }
      }
    )
  );

  // Serialize user
  fastifyPassport.registerUserSerializer(async (user: any) => user.id);
  fastifyPassport.registerUserDeserializer(async (id: string) => {
    // TODO: Get user from database
    return { id };
  });

  // Routes
  app.get("/api/health", async () => {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      twitter_configured: !!(
        app.config.TWITTER_API_KEY && app.config.TWITTER_API_SECRET
      ),
      jwt_configured: !!app.config.JWT_SECRET,
      environment: app.config.NODE_ENV,
    };
  });

  // Twitter OAuth routes
  app.get(
    "/api/auth/twitter",
    { preValidation: fastifyPassport.authenticate("twitter") },
    async () => {
      // This route redirects to Twitter
    }
  );

  app.get(
    "/api/auth/twitter/callback",
    {
      preValidation: fastifyPassport.authenticate("twitter", {
        failureRedirect:
          app.config.NODE_ENV === "production"
            ? "/?error=twitter_auth_failed"
            : `${app.config.FRONTEND_URL}?error=twitter_auth_failed`,
      }),
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const user = request.user as any;

        // Generate JWT token
        const token = jwt.sign(
          { userId: user.id, handle: user.twitterHandle },
          app.config.JWT_SECRET,
          { expiresIn: "30d" }
        );

        // Redirect to frontend with token
        const redirectUrl =
          app.config.NODE_ENV === "production"
            ? `/?token=${encodeURIComponent(token)}&handle=${encodeURIComponent(
                user.twitterHandle
              )}&auth_type=twitter`
            : `${app.config.FRONTEND_URL}/?token=${encodeURIComponent(
                token
              )}&handle=${encodeURIComponent(
                user.twitterHandle
              )}&auth_type=twitter`;

        // Clear session after successful auth
        request.logOut();

        return reply.redirect(redirectUrl);
      } catch (error) {
        app.log.error(error, "Twitter callback error");
        const errorRedirect =
          app.config.NODE_ENV === "production"
            ? "/?error=token_generation_failed"
            : `${app.config.FRONTEND_URL}?error=token_generation_failed`;
        return reply.redirect(errorRedirect);
      }
    }
  );

  // Get user directory (public)
  app.get("/api/users/directory", async () => {
    const { userOperations } = await import("./db/index");
    const users = await userOperations.getAllUsers(50);

    // Return public user data
    const publicUsers = users.map((user) => ({
      id: user.id,
      handle: user.twitterHandle,
      name: user.twitterName,
      profileImage: user.twitterProfileImage,
      createdAt: user.createdAt,
    }));

    return { users: publicUsers };
  });

  // Waitlist endpoint
  app.post<{
    Body: {
      email: string;
      twitterHandle?: string;
      referralSource?: string;
    };
  }>("/api/waitlist", async (request, reply) => {
    try {
      const { email, twitterHandle, referralSource } = request.body;

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        return reply.code(400).send({ error: "Valid email is required" });
      }

      // Clean up Twitter handle (remove @ if present)
      const cleanTwitterHandle = twitterHandle?.replace(/^@/, "");

      // Dynamic import to get database operations
      const { db } = await import("./db/index");
      const { eq } = await import("drizzle-orm");
      const { waitlist } = await import("@openadvisor/database");

      // Check if email already exists
      const existing = await db
        .select()
        .from(waitlist)
        .where(eq(waitlist.email, email.toLowerCase()))
        .limit(1);

      if (existing.length > 0) {
        return reply.code(409).send({ error: "Email already on waitlist" });
      }

      // Add to waitlist
      const [entry] = await db
        .insert(waitlist)
        .values({
          email: email.toLowerCase(),
          twitterHandle: cleanTwitterHandle || null,
          referralSource: referralSource || null,
          userAgent: request.headers["user-agent"] || null,
          ipAddress: request.ip || null,
        })
        .returning();

      console.log("Added to waitlist:", entry.email);

      return {
        success: true,
        message: "Successfully added to waitlist",
      };
    } catch (error) {
      console.error("Error adding to waitlist:", error);
      return reply.code(500).send({ error: "Failed to join waitlist" });
    }
  });

  return app;
};

const start = async () => {
  try {
    const app = await buildApp();
    await app.listen({ port: parseInt(app.config.PORT), host: "0.0.0.0" });
    app.log.info(`Server listening on port ${app.config.PORT}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
