# OpenAdvisor

> The first platform for compliant crypto advisor deals. Link your Twitter, showcase your advisor relationships, and build trust through radical transparency.

## 🚀 Overview

OpenAdvisor solves the opacity and compliance issues in crypto advisor deals by providing:

- **For KOLs**: Accept token grants on Solana with automatic compliance and disclosure
- **For Projects**: Issue standardized, auditable token grants without manual legal processes

## 🎯 Key Features

### v1 (Live Now)
- ✅ KOL profile creation with Twitter & wallet verification
- ✅ Public advisor profiles for transparency
- ✅ Manual deal logging for existing relationships
- ✅ Compliance guidelines and resources

### v2 (Coming Q1 2025)
- 🔜 On-chain token grant acceptance
- 🔜 Automated vesting contracts
- 🔜 Project offer creation dashboard

### v3 (Coming Q2 2025)
- 🔜 Automatic disclosure bot for Twitter
- 🔜 SAATP legal templates
- 🔜 Multi-chain support

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Fastify (Node.js)
- **Database**: PostgreSQL (Supabase)
- **Blockchain**: Solana (Anchor framework)
- **Infrastructure**: pnpm workspaces, Docker

## 📦 Project Structure

```
openadvisor/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # Fastify backend
├── packages/
│   ├── database/     # Drizzle ORM & schemas
│   └── shared/       # Shared types & utilities
├── contracts/        # Solana programs
└── scripts/          # Development scripts
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm 8+
- Docker (for local development)

### Development Setup

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/openadvisor.git
cd openadvisor

# Install dependencies
pnpm install

# Copy environment variables
cp env.example .env

# Start development servers
make dev
```

Visit http://localhost:3000 to see the landing page.

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed Vercel deployment instructions.

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FYOUR_USERNAME%2Fopenadvisor&root-directory=apps/web)

**Important**: Set the root directory to `apps/web` when deploying.

## 📝 Environment Variables

For development, copy `env.example` to `.env`:

```bash
# Database
DATABASE_URL=your_database_url
DATABASE_PASSWORD=your_password

# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# Twitter API (for future features)
TWITTER_API_KEY=your_api_key
TWITTER_API_KEY_SECRET=your_api_secret
TWITTER_BEARER_TOKEN=your_bearer_token
```

## 🤝 Contributing

We're building in public! Contributions are welcome:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source. See LICENSE file for details.

## 🔗 Links

- [Website](https://openadvisor.io) (coming soon)
- [Twitter](https://twitter.com/OpenAdvisor)
- [Documentation](./docs) (coming soon)

---

Built with ❤️ for transparent crypto advisor relationships 