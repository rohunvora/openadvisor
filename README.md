# OpenAdvisor

OpenAdvisor is an open-source platform that lets crypto influencers (KOLs) publicly disclose advisory deals while projects (and their communities) can verify them. It ships with a Next.js frontend, a Fastify + Drizzle API, a PostgreSQL database, and early Solana smart-contract stubs for on-chain vesting.

## Features

• Twitter OAuth one-click sign-in  
• Public KOL directory & profile pages  
• Wait-list capture for early users  
• Minimal dashboard for managing deals (client-only stub)  
• JSON/REST API powered by Fastify  
• Type-safe Drizzle ORM schema & migrations  
• Docker-compose for local Postgres  
• Monorepo (pnpm workspaces) with shared types  
• Future: Solana token-vesting contracts

## Quick-start (local dev)

```bash
# 1. Clone and install deps
$ git clone https://github.com/<you>/openadvisor
$ cd openadvisor
$ pnpm install

# 2. Configure environment
$ cp env.example .env
# -> fill in DATABASE_URL, JWT_SECRET, TWITTER_…

# 3. Fire everything up (Postgres + API + Web)
$ docker-compose up -d postgres
$ pnpm --filter @openadvisor/api dev        # API on :8080
$ pnpm --filter @openadvisor/web dev        # Web on :3000
```

Production-grade deployment is covered in `DEPLOYMENT.md`.

## How it works

```mermaid
flowchart TD
  Browser -->|OAuth| API(Fastify)
  API -->|SQL| DB[(PostgreSQL)]
  subgraph Frontend
    NextJS[Next.js (apps/web)]
  end
  Browser --> NextJS
  API <--> Supabase[(Supabase Storage)]
  API --- Drizzle
```

_Users authenticate via Twitter; the Fastify API issues a JWT and stores/reads data from Postgres via Drizzle ORM. The Next.js app consumes the same API for server actions and client calls._

## Roadmap / Known Limitations

| Stage | Focus                             | Status         |
| ----- | --------------------------------- | -------------- |
| v0.1  | KOL sign-up, directory, wait-list | ✅ Done (MVP)  |
| v0.2  | Deal CRUD from dashboard          | ⏳ WIP         |
| v0.3  | On-chain vesting (Solana)         | ❌ Not started |

Known gaps:

1. No email confirmation for wait-list entries.
2. Dashboard uses mocked data.
3. Smart-contract code is untested & not integrated.
4. No CI pipeline yet.

## License

MIT © 2025 OpenAdvisor
