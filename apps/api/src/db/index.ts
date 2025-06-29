import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq, desc } from 'drizzle-orm';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { users } from '@openadvisor/database';

// Type definitions
type User = InferSelectModel<typeof users>;
type NewUser = InferInsertModel<typeof users>;

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../../../.env') });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

// Create postgres client
const queryClient = postgres(connectionString);

// Create drizzle instance
export const db = drizzle(queryClient) as ReturnType<typeof drizzle>;

// User operations
export const userOperations = {
  async findByTwitterId(twitterId: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.twitterId, twitterId));
    return result[0];
  },

  async findByHandle(handle: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.twitterHandle, handle));
    return result[0];
  },

  async findById(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  },

  async createTwitterUser(data: {
    twitterId: string;
    twitterHandle: string;
    twitterName: string;
    twitterProfileImage?: string | null;
    twitterFollowers?: number | null;
    walletAddress: string;
  }): Promise<User> {
    const result = await db.insert(users).values({
      type: 'kol',
      twitterId: data.twitterId,
      twitterHandle: data.twitterHandle,
      twitterName: data.twitterName,
      twitterProfileImage: data.twitterProfileImage,
      twitterFollowers: data.twitterFollowers,
      walletAddress: data.walletAddress || `pending_${data.twitterId}`, // Temporary until wallet connected
    }).returning();
    return result[0];
  },

  async getAllUsers(limit = 50): Promise<User[]> {
    return await db.select().from(users)
      .where(eq(users.type, 'kol'))
      .orderBy(users.createdAt)
      .limit(limit);
  },

  async updateLastLogin(userId: string): Promise<void> {
    await db.update(users)
      .set({ lastLoginAt: new Date() })
      .where(eq(users.id, userId));
  }
}; 