# Twitter OAuth with Vercel Frontend + Separate API

## 🚀 Quick Setup with Railway (Recommended)

### 1. Deploy API to Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Select your `openadvisor` repository
4. Configure:
   - **Root Directory**: `/`
   - **Build Command**: `cd apps/api && pnpm install && pnpm build`
   - **Start Command**: `cd apps/api && pnpm start`

5. Add environment variables in Railway:
   ```bash
   # Required
   DATABASE_URL=your_supabase_url
   TWITTER_API_KEY=RFI5MXJwdXVOT01VNnZDZ1o5Z1M6MTpjaQ
   TWITTER_API_SECRET=KJsHm7zTdOy_MoxKCQOo5_vWIjTBt4uUrJ8HWLsjhT5hQUcQ7d
   JWT_SECRET=generate_a_secure_random_string_here
   
   # URLs (update with your Railway domain)
   NODE_ENV=production
   PORT=8080
   BASE_URL=https://your-app.up.railway.app
   FRONTEND_URL=https://openadvisor-sxnz-git-main-rohun-voras-projects.vercel.app
   TWITTER_CALLBACK_URL=https://your-app.up.railway.app/api/auth/twitter/callback
   ```

6. Railway will give you a URL like: `https://openadvisor-api.up.railway.app`

### 2. Update Twitter App Settings

In your Twitter Developer Dashboard:

1. Go to your app's settings
2. Add these callback URLs:
   ```
   https://your-railway-app.up.railway.app/api/auth/twitter/callback
   ```
3. Update Website URL:
   ```
   https://openadvisor-sxnz-git-main-rohun-voras-projects.vercel.app
   ```

### 3. Configure Vercel Frontend

In your Vercel project settings, add this environment variable:
```
NEXT_PUBLIC_API_URL=https://your-railway-app.up.railway.app
```

### 4. Update CORS Settings

The API already has CORS configured to accept the `FRONTEND_URL`, so it should work automatically.

## 🎯 Alternative: Quick Deploy Options

### Option A: Deploy to Render
```yaml
# render.yaml
services:
  - type: web
    name: openadvisor-api
    runtime: node
    rootDir: apps/api
    buildCommand: pnpm install && pnpm build
    startCommand: pnpm start
    envVars:
      # Add all the environment variables
```

### Option B: Deploy to Fly.io
```toml
# fly.toml
app = "openadvisor-api"

[build]
  builder = "heroku/buildpacks:20"

[env]
  PORT = "8080"

[[services]]
  http_checks = []
  internal_port = 8080
  protocol = "tcp"
```

## 🔧 Testing Your Setup

1. Visit your Vercel app: https://openadvisor-sxnz-git-main-rohun-voras-projects.vercel.app
2. Click "Sign in with Twitter"
3. Should redirect to Twitter, then back to your app
4. Check the leaderboard for your profile

## 🚨 Common Issues

### "Twitter sign-in hit a snag"
- Check Railway logs for errors
- Verify all environment variables are set
- Ensure callback URL matches exactly

### CORS Errors
- Make sure `FRONTEND_URL` in Railway matches your Vercel URL
- Check browser console for specific CORS errors

### API Not Responding
- Check Railway deployment status
- Verify the API URL in Vercel env vars
- Test the health endpoint: `https://your-api.up.railway.app/api/health`

## 📝 For True Production

When you're ready for a custom domain:
1. Add custom domain to Vercel: `openadvisor.com`
2. Add custom domain to Railway: `api.openadvisor.com`
3. Update all URLs accordingly
4. Add both to Twitter app callbacks 