# OpenAdvisor

Transparency-first platform for crypto KOL token grants on Solana.

## Overview

OpenAdvisor enables:
- **KOLs**: Accept token grants with automatic SEC/FTC compliance
- **Projects**: Issue standardized advisor agreements without legal friction

## Monorepo Structure

```
openadvisor/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # Fastify backend
├── packages/
│   ├── shared/       # Shared types and utilities
│   └── database/     # Database schema and migrations
└── contracts/
    └── vesting/      # Solana vesting program
```

## Prerequisites

- Node.js >= 18
- pnpm >= 8
- Docker & Docker Compose
- PostgreSQL 15+ (or use Supabase)
- Solana CLI (for contract development)
- Anchor Framework (for Solana programs)

## Getting Started

### Quick Setup

```bash
# Clone the repository
git clone https://github.com/your-org/openadvisor.git
cd openadvisor

# Run automated setup
make setup

# Start development
make dev
```

### Manual Setup

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables:
```bash
cp env.example .env
# Edit .env with your credentials
```

3. Start Docker services:
```bash
docker-compose up -d
```

4. Push database schema:
```bash
pnpm -C packages/database db:push
```

5. Start development servers:
```bash
pnpm dev
```

## Development

### Available Commands

```bash
make help         # Show all available commands
make dev          # Start development environment
make stop         # Stop development environment
make db-studio    # Open database GUI
make build        # Build all packages
make test         # Run tests
make lint         # Run linters
```

### Service URLs

- **Frontend**: http://localhost:3000
- **API**: http://localhost:8080
- **Database Studio**: Run `make db-studio`
- **Adminer** (DB GUI): http://localhost:8081
- **Bull Board** (Queue Monitor): http://localhost:3030

### Development Scripts

```bash
./scripts/dev.sh    # Start development with Docker
./scripts/stop.sh   # Stop all services
./scripts/db.sh     # Database management commands
```

### VS Code Setup

This project includes VS Code configuration:
- Install recommended extensions when prompted
- Settings are pre-configured for TypeScript, ESLint, and Prettier

## Database

We use Drizzle ORM with PostgreSQL (via Supabase):

```bash
# Open database studio
pnpm -C packages/database db:studio

# Generate migrations
pnpm -C packages/database db:generate

# Push schema changes
pnpm -C packages/database db:push
```

## Environment Variables

See `env.example` for required variables:
- Twitter API credentials
- Supabase/Database credentials
- JWT secrets
- Solana RPC endpoints

## Architecture

- **Frontend**: Next.js 15 with App Router, Tailwind CSS, shadcn/ui
- **Backend**: Fastify (high-performance Node.js framework)
- **Database**: PostgreSQL with Drizzle ORM
- **Smart Contracts**: Anchor framework on Solana
- **Caching**: Redis
- **Authentication**: Twitter OAuth + Solana wallet signing

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests: `make test`
4. Submit a pull request

## License

MIT 