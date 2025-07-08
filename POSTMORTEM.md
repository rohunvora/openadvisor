# Post-mortem: OpenAdvisor v0.1

_Date: 2025-07-08_

## 1. Original Goal

Build a public, compliance-friendly platform that makes crypto KOL advisory deals transparent and ultimately automates token vesting on Solana.

## 2. Status Quo Ante (before this session)

- Monorepo scaffolding existed (Next.js web, Fastify API, Drizzle schema).
- Twitter OAuth worked end-to-end, but the session deserializer returned a stub user.
- Landing page, dashboard, and wait-list UI were already designed but ran on mocked data.
- Database migrations were incomplete / duplicated.
- README was marketing-heavy and out-of-date.
- No clear MVP definition.

## 3. What Blocked Progress

1. **Time & Scope-creep** – the repo attempted to ship smart-contracts, a full project dashboard, and compliance automation all at once.
2. **Missing DB glue** – user deserialization and wait-list email validation were half-done, stopping end-to-end flows.
3. **Docs drift** – contributors lacked a single source of truth for setup; multiple `.env` and SQL migration paths existed.

## 4. Decisions Taken to Ship v0.1 Today

- Defined a **minimal feature set**: Twitter sign-in, public directory, wait-list, stub dashboard.
- Fixed the **Fastify user deserializer** so sessions resolve against the database.
- Left advanced features (deal CRUD, Solana vesting, compliance bot) behind a `TODO.md` stub.
- Rewrote **README.md** to focus on quick-start, architecture, and roadmap.
- Added this **POSTMORTEM.md** to document trade-offs and guide future maintainers.

## 5. Future Improvements

1. Replace dashboard mocks with real CRUD endpoints.
2. Migrate legacy Drizzle SQL files into a single source-controlled migration flow.
3. Add email confirmation and rate-limiting to the wait-list endpoint.
4. Ship the Solana vesting contract and integrate via RPC.
5. Set up CI (lint, type-check, simple tests) and automated deployments.
6. Harden security: CSRF tokens, helmet headers, rotate JWT secret per-env.

---

**Thanks** to all contributors who laid the groundwork & to the next dev picking this up – you’ve got a running start!  
_Keep shipping, keep it transparent._
