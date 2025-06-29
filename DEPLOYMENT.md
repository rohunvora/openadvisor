# Deployment Instructions for Vercel

## Quick Deploy

The repository is ready for deployment to Vercel. Follow these steps:

### 1. Push to GitHub

```bash
# Add your GitHub repository as origin
git remote add origin https://github.com/YOUR_USERNAME/openadvisor.git

# Push to GitHub
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project" 
3. Import your GitHub repository
4. Configure the deployment:
   - **Framework Preset**: Next.js
   - **Root Directory**: `apps/web` (IMPORTANT!)
   - **Build Command**: Leave as default (`pnpm build`)
   - **Output Directory**: Leave as default (`.next`)
   - **Install Command**: `pnpm install --frozen-lockfile`

### 3. Environment Variables

**IMPORTANT**: Add this environment variable in Vercel to enable pnpm:
- `ENABLE_EXPERIMENTAL_COREPACK`: `1`

For the web app, add:
- `NEXT_PUBLIC_API_URL`: Your API URL (e.g., `https://api.openadvisor.io`)

For now, the landing page doesn't require any other environment variables. When you're ready to add authentication, you'll need to add:

- `DATABASE_URL` - Your Supabase database URL
- `SUPABASE_URL` - Your Supabase project URL  
- `SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key

### 4. Custom Domain (Optional)

After deployment, you can add a custom domain in the Vercel dashboard under Settings → Domains.

## Important Notes

- The project uses pnpm workspaces, so make sure Vercel uses pnpm
- The actual Next.js app is in `apps/web`, not the root directory
- The landing page is currently static and doesn't require a database connection

## Development

To run locally:
```bash
make dev
# or
cd apps/web && pnpm dev
```

Visit http://localhost:3000 to see the landing page. 