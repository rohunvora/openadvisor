# 🚨 Railway Deployment Fix

## The Issue
Railway's Nixpacks couldn't find a start command for the monorepo.

## Quick Fix Options

### Option 1: Use Railway Dashboard (Easiest)
In your Railway project settings, add these:

**Build Command:**
```bash
pnpm install --frozen-lockfile && cd apps/api && pnpm build
```

**Start Command:**
```bash
cd apps/api && pnpm start
```

### Option 2: Push the Config Files
I've added 3 different config files that Railway will recognize:
- `nixpacks.toml` (preferred by Nixpacks)
- `railway.json` (Railway's native format)
- `railway.toml` (alternative format)

```bash
git add -A
git commit -m "Fix Railway deployment with start command"
git push origin main
```

Then redeploy on Railway.

### Option 3: Set Root Directory (Alternative)
In Railway dashboard:
1. Go to Settings → Build
2. Set **Root Directory** to `apps/api`
3. Railway will then use the API's package.json directly

## Environment Variables to Add
Make sure these are set in Railway:
```bash
DATABASE_URL=postgresql://postgres.vkqevnifqwdsnvmuxbdp:9TVBa5augulV4edG@aws-0-us-west-1.pooler.supabase.com:6543/postgres
TWITTER_API_KEY=RFI5MXJwdXVOT01VNnZDZ1o5Z1M6MTpjaQ
TWITTER_API_SECRET=KJsHm7zTdOy_MoxKCQOo5_vWIjTBt4uUrJ8HWLsjhT5hQUcQ7d
JWT_SECRET=generate-a-secure-random-string-here
NODE_ENV=production
FRONTEND_URL=https://openadvisor-sxnz-git-main-rohun-voras-projects.vercel.app
BASE_URL=https://YOUR-APP.up.railway.app
TWITTER_CALLBACK_URL=https://YOUR-APP.up.railway.app/api/auth/twitter/callback
```

## What Happens Next
1. Railway will rebuild with the correct start command
2. You'll get your API URL (like `https://openadvisor-api.up.railway.app`)
3. Add that URL to Vercel as `NEXT_PUBLIC_API_URL`
4. Update Twitter callback URL
5. Test the flow! 