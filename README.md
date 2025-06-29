# OpenAdvisor 🌟

**Transparency-first platform for crypto KOL token grants on Solana**

OpenAdvisor solves the opacity and compliance issues plaguing crypto advisor deals. We enable KOLs to accept token grants with automatic SEC/FTC compliance while giving projects a standardized way to issue advisor agreements.

## 🎯 The Problem

The crypto advisory ecosystem is broken:

- **KOLs fear regulatory action** - SEC §17(b) and FTC disclosure rules create legal landmines
- **Projects waste time on legal** - Each deal requires custom contracts and manual tracking
- **Communities demand transparency** - Undisclosed paid promotions erode trust
- **Manual compliance is impossible** - Tracking vesting schedules and disclosure requirements across multiple deals doesn't scale

## 💡 Our Solution

OpenAdvisor is the first platform that makes crypto advisory deals transparent, compliant, and efficient:

### For KOLs

- ✅ **One-click Twitter signup** - Join in seconds, no forms
- ✅ **Public advisor profile** - Show all your advisor relationships transparently
- ✅ **Automated compliance** - We handle SEC/FTC disclosure requirements
- ✅ **Future: Smart vesting** - Token grants vest on-chain with Solana (v2)

### For Projects (Coming v2)

- ✅ **Standardized offers** - Create advisor agreements without lawyers
- ✅ **Transparent tracking** - See all your advisors in one place
- ✅ **Automated vesting** - Smart contracts handle token distribution
- ✅ **Compliance built-in** - Every deal meets regulatory requirements

### For Communities

- ✅ **Full transparency** - See which KOLs advise which projects
- ✅ **Verified relationships** - On-chain proof of advisory deals
- ✅ **Fair token distribution** - Know exactly how tokens vest
- ✅ **Trust through transparency** - No more hidden paid shills

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- pnpm 8+
- PostgreSQL 14+ (or use our Docker setup)
- Supabase account (for production)

### Development Setup

1. **Clone and install**

   ```bash
   git clone https://github.com/yourusername/openadvisor.git
   cd openadvisor
   pnpm install
   ```

2. **Set up environment**

   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

3. **Start development**

   ```bash
   make dev
   # Or manually:
   # docker-compose up -d  # Starts PostgreSQL
   # pnpm dev              # Starts frontend and backend
   ```

4. **Access the app**
   - Frontend: http://localhost:3000
   - API: http://localhost:8080
   - Database UI: http://localhost:8081

## 📋 Product Roadmap

### v1: KOL Transparency (Current)

**Goal**: Get KOLs comfortable with transparency

- ✅ Twitter OAuth signup
- ✅ Public KOL profiles
- ✅ Manual deal logging
- ✅ Compliance guidelines
- 🔄 Landing page with vision
- 🔄 KOL leaderboard

### v2: Smart Vesting (Q1 2025)

**Goal**: Automate token vesting on Solana

- Token vesting smart contracts
- Project dashboard
- Automated deal creation
- On-chain vesting schedules
- Disclosure bot for Twitter

### v3: Full Platform (Q2 2025)

**Goal**: Complete advisory ecosystem

- Deal negotiation tools
- Multi-chain support
- Analytics dashboard
- API for integrations
- Mobile app

## 🏗 Architecture

```
openadvisor/
├── apps/
│   ├── web/          # Next.js 15 frontend
│   └── api/          # Fastify backend
├── packages/
│   ├── database/     # Drizzle ORM + PostgreSQL
│   └── shared/       # Shared types
└── contracts/        # Solana programs (v2)
```

### Tech Stack

- **Frontend**: Next.js 15, Tailwind CSS, TypeScript
- **Backend**: Fastify, TypeScript, JWT auth
- **Database**: PostgreSQL with Drizzle ORM
- **Deployment**: Vercel (frontend) + Railway/Supabase (backend)
- **Smart Contracts**: Anchor Framework on Solana (v2)

## 🔑 Environment Variables

Create a `.env` file with:

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/openadvisor

# Supabase (production)
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_KEY=your-service-key

# Authentication
JWT_SECRET=your-secret-key
NEXTAUTH_SECRET=your-nextauth-secret

# Twitter OAuth
TWITTER_CLIENT_ID=your-twitter-client-id
TWITTER_CLIENT_SECRET=your-twitter-client-secret

# URLs
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🤝 Contributing

We're building this in public! Contributions welcome:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Write tests for new features
- Follow TypeScript best practices
- Keep components small and focused
- Document your code

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- Built on Solana for transparent, efficient token vesting
- Inspired by the need for better crypto advisory infrastructure
- Thanks to all KOLs pushing for more transparency

---

**Ready to make crypto advisory deals transparent?**

[🚀 Try OpenAdvisor](https://openadvisor.xyz) | [📖 Read our docs](https://docs.openadvisor.xyz) | [🐦 Follow us](https://twitter.com/openadvisor)
