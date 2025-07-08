# TODOs beyond MVP (tagged stubs)

- [ ] **Data-model audit** – ensure `waitlist` entries are linked to `users` once email-based sign-up is added.  
      _Plan_: add `waitlistId` FK column on `users`, migrate existing data, then deprecate standalone `waitlist` table.

- [ ] **Strip legacy SQL migrations** – unify Drizzle generated migration files under `packages/database/drizzle/` and delete the duplicated Supabase scripts.  
      _Plan_: run `drizzle-kit generate:pg` after schema audit, commit new migrations, remove `/supabase/migrations/*`.

- [ ] **Dashboard CRUD endpoints** – `/api/deals` routes for create/read/update of advisory deals.  
      _Plan_: add Fastify route, service layer using Drizzle, then connect React query hooks in `apps/web`.

- [ ] **CI Pipeline** – add GitHub Actions workflow running `pnpm lint`, `pnpm typecheck`, and simple smoke tests.  
      _Plan_: copy template from `actions/setup-node`, cache pnpm, run docker-compose Postgres service for API tests.

- [ ] **Security hardening** – CSRF protection, session cookie flags, helmet headers.  
      _Plan_: install `@fastify/helmet`, enable CSRF if forms are added, set `SameSite=Strict` and `Secure` where appropriate.
