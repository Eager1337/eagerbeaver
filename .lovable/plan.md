## Scope

Transform the current portfolio into a "Portfolio Operating System" — a premium, fully interactive site with:

- **50 investor-grade features** (identity, trust, intelligence, experience, business)
- **50 new portfolio pages** (brand, work, proof, technical, commercial, creative, community, interactive, professional, premium)
- **50 showcase project sites** in an Explore section (education, medical, government, Sierra Leone, business, AI, creator, startup, advanced, experimental)
- Looping **ninja tortoise video** in the hero
- Every project card opens a detail view with: Overview · Problem · Solution · Tech · Demo · Design · Metrics · Docs · Clone · Contact
- Premium interactions: cursor effects, magnetic buttons, counters, command palette, glassmorphism, bento, micro-animations, AI assistant, theme toggle, etc.

## Reality check (please read)

This is genuinely enormous — roughly **150+ new routes** and **100+ interactive features** with full content on each. To do it well (investor-grade, not stubs) is many days of work and would balloon the codebase past what's healthy in one shot. If I try to ship all of it in a single pass, you'll get shallow placeholder pages — which is the opposite of what you want.

I'd like to propose a **phased build** so each phase ships something polished and demo-ready, then we layer on more.

## Proposed phases

**Phase 1 — Foundation & Hero (this turn)**
- New design system tokens (dark/light, glassmorphism, gradients, premium typography)
- Ninja tortoise looping video hero with cursor reveal + magnetic CTAs
- Global shell: command palette (⌘K), theme toggle, smooth page transitions, animated cursor, scroll progress
- New top-level nav structure for the 10 page groups (Brand / Work / Proof / Technical / Commercial / Creative / Community / Interactive / Professional / Premium)
- Reusable `ProjectCard` + `ProjectDetailModal` with the 9-tab structure (Overview/Problem/Solution/Tech/Demo/Design/Metrics/Docs/Clone+Contact)
- Data files seeding all 50 showcase projects and all 50 features (so later phases just render them)

**Phase 2 — Explore (50 project sites)**
- `/explore` index with filters, live search, compare mode, bookmarks
- 50 project detail routes generated from the data file, each fully populated (problem, solution, stack, metrics, mock demo)

**Phase 3 — Portfolio pages (50 routes)**
- All 10 groups, each route with real content, animations, SEO head()

**Phase 4 — Features layer**
- Investor mode toggle, analytics dashboard, quote estimator, scheduler, proposal generator, AI assistant chat, voice narration, 3D scene, etc.

**Phase 5 — Polish**
- Accessibility mode, multi-language scaffolding, offline support, keyboard shortcuts overlay, onboarding tour

## Technical notes

- Routes use TanStack file-based routing under `src/routes/` (flat dot convention)
- Project data lives in `src/data/projects.ts` (single source of truth → drives Explore grid, detail modal, and dynamic route)
- Single dynamic route `explore.$slug.tsx` renders all 50 projects from data (avoids 50 hand-written files)
- Same pattern for portfolio pages where content is data-driven; bespoke routes only where the page needs unique layout
- Ninja tortoise video served from a CDN asset (uploaded via lovable-assets)
- Lovable Cloud not required for Phase 1; enable later if you want real booking/forms/AI chat backed by a DB

## What I need from you

1. **Approve the phased approach** — or tell me to attempt it all in one shot (with the trade-off that pages will be thinner)
2. **Ninja tortoise video** — do you have the file? If so, upload it; otherwise I'll use a placeholder loop until you provide one
3. **Real content vs. plausible mock copy** — for 50 projects and 50 pages I'll write strong, believable copy unless you supply specifics

Once you confirm, I'll start Phase 1 immediately.