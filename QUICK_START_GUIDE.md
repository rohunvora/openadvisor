# 🚀 OpenAdvisor Quick Start Guide

## You're almost there! Just need to add your API keys.

### 1. Supabase Setup (5 minutes)

1. Go to [supabase.com](https://supabase.com) and create a free project
2. Once created, go to **Settings → API**
3. Copy these values to your `.env` file:
   ```
   SUPABASE_URL=https://[your-project-ref].supabase.co
   SUPABASE_ANON_KEY=[your-anon-key]
   SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]
   ```
4. For `DATABASE_URL`, go to **Settings → Database** and copy the connection string

### 2. Twitter OAuth Setup (10 minutes)

1. Go to [developer.twitter.com](https://developer.twitter.com)
2. Create a new app (or use existing)
3. In your app settings, add this callback URL:
   ```
   http://localhost:8080/api/auth/twitter/callback
   ```
4. Copy your API keys to `.env`:
   ```
   TWITTER_API_KEY=[your-consumer-key]
   TWITTER_API_SECRET=[your-consumer-secret]
   ```

### 3. Generate JWT Secret (30 seconds)

Run this command:

```bash
openssl rand -base64 32
```

Copy the output to `JWT_SECRET` in your `.env` file.

### 4. Start Development! 🎉

```bash
# Without Docker (recommended for now)
pnpm dev

# The app will be available at:
# - Web: http://localhost:3000
# - API: http://localhost:8080
```

### What's Running?

- **Web App** (Next.js): The KOL interface at http://localhost:3000
- **API** (Fastify): Backend API at http://localhost:8080
- **Database**: Using your Supabase cloud database

### Troubleshooting

If you see any errors:

1. **"Invalid Supabase URL"**: Make sure you copied the full URL including `https://`
2. **"Twitter auth failed"**: Double-check your callback URL matches exactly
3. **Port already in use**: Kill the process using the port or change ports in `.env`

### Next Steps

1. Visit http://localhost:3000
2. Click "Sign in with Twitter"
3. You're now a KOL on OpenAdvisor! 🎊

Need help? Check the [main README](README.md) or the docs folder.
