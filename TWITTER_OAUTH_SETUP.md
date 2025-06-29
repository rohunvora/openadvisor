# Twitter OAuth Setup Guide for OpenAdvisor

## 🐦 Prerequisites

You'll need:
1. A Twitter Developer Account
2. Your API keys from the Twitter app
3. The correct callback URLs configured

## 📋 Step-by-Step Setup

### 1. Create Twitter App (if you haven't already)

1. Go to [developer.twitter.com](https://developer.twitter.com)
2. Navigate to the Developer Portal
3. Create a new App (or use existing)
4. In your app settings, find the **Keys and tokens** section

### 2. Configure OAuth Settings

In your Twitter App settings:

1. Go to **User authentication settings**
2. Click **Set up** or **Edit**
3. Configure:
   - **App permissions**: Read (minimum)
   - **Type of App**: Web App
   - **Callback URI / Redirect URL**: 
     - Development: `http://localhost:8080/api/auth/twitter/callback`
     - Production: `https://your-api-domain.com/api/auth/twitter/callback`
   - **Website URL**: Your frontend URL

### 3. Get Your API Keys

From the Twitter Developer Dashboard:
- **API Key** (also called Consumer Key)
- **API Key Secret** (also called Consumer Secret)

⚠️ **Important**: These are the OAuth 1.0a keys, NOT the Bearer Token!

### 4. Set Environment Variables

Add these to your `.env` file:

```bash
# Twitter OAuth (Required)
TWITTER_API_KEY=your_api_key_here
TWITTER_API_SECRET=your_api_secret_here

# API Configuration
JWT_SECRET=your_secure_jwt_secret_here
PORT=8080
NODE_ENV=development

# URLs
BASE_URL=http://localhost:8080
FRONTEND_URL=http://localhost:3000
TWITTER_CALLBACK_URL=http://localhost:8080/api/auth/twitter/callback

# Database (already configured)
DATABASE_URL=your_supabase_database_url
```

### 5. For Production Deployment

When deploying to production (e.g., Railway, Render, etc.):

1. Update the Twitter App callback URL to include your production domain
2. Set these environment variables in your hosting platform:
   ```bash
   TWITTER_API_KEY=your_api_key
   TWITTER_API_SECRET=your_api_secret
   TWITTER_CALLBACK_URL=https://api.yourdomain.com/api/auth/twitter/callback
   BASE_URL=https://api.yourdomain.com
   FRONTEND_URL=https://yourdomain.com
   NODE_ENV=production
   JWT_SECRET=generate_a_secure_random_string
   ```

### 6. Test the Flow

1. Start the development environment:
   ```bash
   make dev
   ```

2. Visit http://localhost:3000

3. Click "Sign in with Twitter"

4. You should be redirected to Twitter, then back to your app

5. Check the user directory to see your profile

## 🔧 Troubleshooting

### "Twitter sign-in hit a snag"
- Check that your API keys are correct
- Verify the callback URL matches exactly
- Ensure your Twitter app is not in "Suspended" state

### "Invalid or expired token"
- Twitter OAuth 1.0a requires session support
- Make sure cookies are enabled
- Check that JWT_SECRET is set

### Rate Limiting
- Twitter has rate limits on OAuth
- If you hit limits, wait 15 minutes

## 🎯 How It Works

1. User clicks "Sign in with Twitter"
2. Backend initiates OAuth 1.0a flow with Twitter
3. User authorizes on Twitter
4. Twitter redirects back with tokens
5. Backend creates/updates user in database
6. JWT token is generated
7. User is redirected to frontend with token
8. Frontend stores token and shows authenticated state

## 📝 Database Schema

When a user signs in with Twitter, we store:
- `twitter_id`: Unique Twitter user ID
- `twitter_handle`: Their @username
- `twitter_name`: Display name
- `twitter_profile_image`: Profile picture URL
- `created_at`: When they first joined
- `last_login_at`: Last sign-in time

## 🚀 Next Steps

After Twitter OAuth is working:
1. Users can sign in instantly
2. Their profile appears in the directory
3. Ready to accept advisor deals (future feature)
4. Wallet connection can be added later 