# OpenAdvisor Platform - Multi-Agent System Scratchpad

## Background and Motivation

OpenAdvisor is a transparency-first platform designed to solve the opacity and compliance issues in crypto advisor deals. The platform enables:

- **KOLs (Key Opinion Leaders)**: Accept token grants on Solana with automatic compliance and disclosure
- **Projects**: Issue standardized, auditable token grants without manual legal processes

Key Problems Being Solved:
1. Regulatory compliance fears (SEC §17(b), FTC disclosures)
2. Manual, slow deal flow through back-channels
3. Lack of transparency undermining community trust
4. No standardized process for advisor agreements

**V1 Simplification**: Focus on KOL signup and transparent deal tracking without vesting complexity. Vesting will be added in v2.

## User Journey (v1 - Simplified)

### KOL Journey
1. **Discovery**: KOL learns about OpenAdvisor through project invitation or marketing
2. **Onboarding**: Clicks "I'm a KOL" → Connects Twitter → Signs wallet verification
3. **Profile Creation**: Creates public profile showing advisor status
4. **Deal Visibility**: All accepted advisor deals are publicly visible on their profile
5. **Compliance**: Platform provides clear disclosure guidelines and templates

### Project Journey (v2 - Future)
- Projects will be able to create offers and track deals
- For v1, focus is entirely on KOL experience and transparency

## User Stories (v1)

### KOL Stories
- As a KOL, I want to connect my Twitter and wallet in under 60 seconds so I can create my advisor profile
- As a KOL, I want a public profile page showing all my advisor relationships for transparency
- As a KOL, I want clear disclosure guidelines so I stay compliant
- As a KOL, I want to manually log my advisor deals to build trust with my community
- As a KOL, I want a verification badge showing I'm committed to transparency

## High-level Task Breakdown (Revised for v1)

### Phase 1: Foundation ✅ COMPLETE
- [x] **Task 1.1**: Set up monorepo structure
- [x] **Task 1.2**: Initialize database schema
- [x] **Task 1.3**: Set up development environment

### Phase 2: Clear Vision & Documentation (Current)
- [ ] **Task 2.1**: Create comprehensive platform documentation
  - Success: Clear README explaining the vision and v1 scope
- [ ] **Task 2.2**: Design KOL onboarding flow diagrams
  - Success: Visual flow charts showing signup process
- [ ] **Task 2.3**: Write disclosure compliance guide
  - Success: Simple guide KOLs can follow for FTC compliance
- [ ] **Task 2.4**: Create product roadmap (v1 → v2 → v3)
  - Success: Clear progression from MVP to full platform

### Phase 3: Authentication & KOL Profiles
- [ ] **Task 3.1**: Implement Twitter OAuth v2 flow
  - Success: KOLs can connect Twitter account
- [ ] **Task 3.2**: Implement Solana wallet connection
  - Success: Wallet signature proves ownership
- [ ] **Task 3.3**: Create KOL profile system
  - Success: Public profiles with Twitter + wallet verified
- [ ] **Task 3.4**: Add session management
  - Success: Secure auth persists across sessions

### Phase 4: KOL Dashboard & Deal Tracking
- [ ] **Task 4.1**: Build KOL dashboard UI
  - Success: KOLs can view and edit their profile
- [ ] **Task 4.2**: Create manual deal entry form
  - Success: KOLs can log their advisor deals
- [ ] **Task 4.3**: Build public profile pages
  - Success: Anyone can view KOL's transparent deal history
- [ ] **Task 4.4**: Add verification badge system
  - Success: Visual indicator of transparency commitment

### Phase 5: Landing Page & Marketing
- [ ] **Task 5.1**: Build compelling landing page
  - Success: Clear value prop, "I'm a KOL" CTA
- [ ] **Task 5.2**: Create KOL onboarding tutorial
  - Success: Step-by-step guide with screenshots
- [ ] **Task 5.3**: Design social sharing features
  - Success: KOLs can share their transparent profile
- [ ] **Task 5.4**: Add SEO optimization
  - Success: KOL profiles discoverable via search

### Future Phases (v2+)
- Smart contracts and vesting
- Project dashboard and offer creation
- Automated disclosure bot
- Deal acceptance flow with on-chain recording

## Key Challenges and Analysis (Updated for v1)

### Technical Challenges
1. **Twitter OAuth Integration**: Must handle rate limits and API changes
   - Mitigation: Robust error handling, fallback flows
2. **Profile Page Performance**: Public pages need to load fast
   - Mitigation: Static generation, CDN caching

### Adoption Challenges
1. **KOL Trust**: Getting first KOLs to sign up
   - Mitigation: Manual outreach to friendly KOLs
2. **Value Perception**: v1 is simpler than full vision
   - Mitigation: Clear roadmap showing future features

### Simplified Architecture
- Remove smart contract complexity for v1
- Focus on web2 features with web3 identity
- Database-driven with future on-chain migration path

## Project Status Board

### TODO
- [ ] Create comprehensive platform documentation (Task 2.1)
- [ ] Design KOL onboarding flow diagrams (Task 2.2)
- [ ] Write disclosure compliance guide (Task 2.3)
- [ ] Create product roadmap document (Task 2.4)
- [ ] Add API endpoints for waitlist signup
- [ ] Connect waitlist form to database

### IN PROGRESS
- [ ] Landing page implementation

### DONE
- [x] PRD analysis and requirements gathering
- [x] Initial scratchpad creation
- [x] Planning approved by user
- [x] Set up monorepo structure (Task 1.1) - Completed
- [x] Initialize database schema (Task 1.2) - Completed
- [x] Create development environment (Task 1.3) - Completed
- [x] Revised plan for simplified v1 without vesting
- [x] Created compelling landing page with clear vision communication

### BLOCKED
- None currently

## Executor's Feedback or Assistance Requests

### Executor Update - Task 1.1 Complete ✅
Successfully set up monorepo structure with:
- ✅ pnpm workspace configuration
- ✅ Next.js frontend (apps/web) with TypeScript and Tailwind
- ✅ Fastify API backend (apps/api) 
- ✅ Shared types package (packages/shared)
- ✅ Database package (packages/database)
- ✅ Solana vesting contract structure (contracts/vesting) - *Note: Not needed for v1*
- ✅ All dependencies installed successfully

**Verification**: Run `pnpm install` - it completes without errors. Structure matches planned architecture.

### Executor Update - Task 1.2 Complete ✅ 
Successfully created and deployed database schema to Supabase:
- ✅ Database password received and configured
- ✅ All tables created with proper relationships
- ✅ Indexes applied for optimal query performance
- ✅ Foreign key constraints established
- ✅ Enums created for type safety

**Note for v1**: Some tables like `vesting_schedules` won't be used until v2. For v1 we'll primarily use:
- `users` table - For KOL profiles
- `deals` table - For manually logged advisor relationships
- `disclosure_logs` table - For tracking compliance efforts

**Verification**: Run `pnpm -C packages/database db:push` - shows "[✓] Changes applied"

### Executor Update - Task 1.3 Complete ✅
Successfully created comprehensive development environment:
- ✅ Docker Compose configuration (PostgreSQL, Redis, Adminer, Bull Board)
- ✅ Development environment variables
- ✅ Helper scripts for common tasks (dev.sh, stop.sh, db.sh)
- ✅ Makefile with all development commands
- ✅ VS Code workspace configuration
- ✅ Updated README with complete setup instructions

**Verification**: Run `make help` to see all available commands

### Executor Update - Landing Page Implementation ✅

Successfully created a compelling landing page that:
- ✅ Clearly communicates the OpenAdvisor vision
- ✅ Shows how it works (simplified for v1)
- ✅ Includes KOL signup flow with waitlist modal
- ✅ Displays clear product roadmap (v1 → v2 → v3)
- ✅ Highlights compliance and transparency features
- ✅ Responsive design with modern UI

**Key Features Added:**
1. **Hero Section**: Clear value proposition with gradient text
2. **Problem Statement**: Three key issues OpenAdvisor solves
3. **How It Works**: 4-step process (3 active, 1 coming soon)
4. **Product Roadmap**: Visual timeline showing current and future phases
5. **Waitlist Modal**: Captures Twitter handle and email for early access
6. **SEO Optimization**: Meta tags and structured content

**Verification**: Run `make dev` and visit http://localhost:3000 to see the landing page

### Next Steps Required

The landing page is ready but needs backend support:

1. **Waitlist API Endpoint**: Need to create `/api/waitlist` endpoint to store signups
2. **Database Table**: Add `waitlist` table to store emails and Twitter handles
3. **Form Validation**: Add client-side validation for email and Twitter format
4. **Success State**: Show confirmation after successful signup

Would you like me to:
1. **Implement waitlist backend functionality** (recommended)
2. **Continue with documentation tasks**
3. **Start building KOL authentication**

The landing page effectively communicates the vision and allows KOLs to express interest. The roadmap clearly shows token functionality is coming in Q1 2025.

## Lessons
- Always include debugging info in program output
- Read files before editing them
- Run security audits (npm audit) when vulnerabilities appear
- Ask before using git --force commands
- For LLM-powered features, provide rich context over rigid templates
- Simplify scope for v1 - vesting and complex features can wait
- Tailwind v4 uses @tailwindcss/postcss instead of traditional config 