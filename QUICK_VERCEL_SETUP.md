# 🚀 Quick Setup: Twitter OAuth with Vercel

Since you want to test with your Vercel deployment ([https://openadvisor-sxnz-git-main-rohun-voras-projects.vercel.app/](https://openadvisor-sxnz-git-main-rohun-voras-projects.vercel.app/)), here's the fastest way:

## Option 1: Railway (5 minutes) ⚡

### Step 1: Deploy API to Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway link  # Create new project when prompted
railway up    # This will deploy your API

# Get your API URL
railway open
```

### Step 2: Set Railway Environment Variables
In Railway dashboard, add these variables:
```bash
DATABASE_URL=postgresql://postgres.vkqevnifqwdsnvmuxbdp:9TVBa5augulV4edG@aws-0-us-west-1.pooler.supabase.com:6543/postgres
TWITTER_API_KEY=RFI5MXJwdXVOT01VNnZDZ1o5Z1M6MTpjaQ
TWITTER_API_SECRET=KJsHm7zTdOy_MoxKCQOo5_vWIjTBt4uUrJ8HWLsjhT5hQUcQ7d
JWT_SECRET=your-secure-jwt-secret-generate-one
NODE_ENV=production
FRONTEND_URL=https://openadvisor-sxnz-git-main-rohun-voras-projects.vercel.app
BASE_URL=https://YOUR-APP.up.railway.app
TWITTER_CALLBACK_URL=https://YOUR-APP.up.railway.app/api/auth/twitter/callback
```

### Step 3: Update Vercel Environment
In Vercel dashboard for your project:
1. Go to Settings → Environment Variables
2. Add:
   ```
   NEXT_PUBLIC_API_URL=https://YOUR-RAILWAY-APP.up.railway.app
   ```
3. Redeploy

### Step 4: Update Twitter App
In Twitter Developer Portal, add callback URL:
```
https://YOUR-RAILWAY-APP.up.railway.app/api/auth/twitter/callback
```

## Option 2: Use ngrok for Testing (2 minutes) 🏃‍♂️

If you just want to test quickly without deploying the API:

### Step 1: Install ngrok
```bash
brew install ngrok  # or download from ngrok.com
```

### Step 2: Run API locally with production frontend
```bash
# Terminal 1: Start API
cd apps/api
FRONTEND_URL=https://openadvisor-sxnz-git-main-rohun-voras-projects.vercel.app pnpm dev

# Terminal 2: Expose API with ngrok
ngrok http 8080
```

### Step 3: Configure
1. Copy the ngrok URL (like `https://abc123.ngrok.io`)
2. Add to Vercel env: `NEXT_PUBLIC_API_URL=https://abc123.ngrok.io`
3. Add Twitter callback: `https://abc123.ngrok.io/api/auth/twitter/callback`

## 🎯 What Happens Next

1. Visit: https://openadvisor-sxnz-git-main-rohun-voras-projects.vercel.app
2. Click "Sign in with Twitter"
3. Authorize on Twitter
4. Get redirected back with your profile in the leaderboard!

## 🔧 Debugging

Check if everything is connected:
- API Health: `https://your-api.up.railway.app/api/health`
- Should show: `twitter_configured: true`

Common issues:
- **Redirect mismatch**: Callback URL must match EXACTLY
- **CORS error**: Check FRONTEND_URL in API env vars
- **No users showing**: Check browser console for API errors 