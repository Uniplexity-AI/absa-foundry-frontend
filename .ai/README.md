# AI Development Guide — ABSA Foundry Frontend

> **CRITICAL:** Read this file first before making ANY frontend changes.
> **Backend:** `absa-foundry-backend/customer-lifecycle-ai/` — Gateway on `:8080`, Feature Service on `:8002`

---

## Before You Write Code

Read these documents **in order** before generating any implementation:

| # | Document | Purpose |
|---|----------|---------|
| 1 | [project-context.md](./project-context.md) | What we're building and why |
| 2 | [current-sprint.md](./current-sprint.md) | What's in progress right now |
| 3 | [architecture.md](./architecture.md) | Component tree, routing, data flow |
| 4 | [coding-standards.md](./coding-standards.md) | How we write Vue 3 code |
| 5 | [skills/absa-brand-colour.md](./skills/absa-brand-colour.md) | ABSA brand colour palette, contrast, gradients |
| 6 | [skills/rm-dashboard-colour-mapping.md](./skills/rm-dashboard-colour-mapping.md) | Per-element colour spec for RM Dashboard views |

---

## Quick Rules (Always Follow)

1. **Vue 3 Composition API only** — `<script setup>` syntax, no Options API.
2. **Pinia for state** — no Vuex, no local `ref()` for shared state.
3. **Axios via `src/services/api.js`** — never use raw `fetch()` for backend calls.
4. **Tailwind CSS for styling** — no inline styles, no scoped `<style>` blocks unless unavoidable.
5. **ABSA brand colours only** — use `absa-*` Tailwind tokens. No custom colours, no "close enough" hex values. See [skills/absa-brand-colour.md](./skills/absa-brand-colour.md).
6. **Use Absa* reusable components** — `AbsaButton`, `AbsaCard`, `AbsaBadge`, `AbsaGradientBg`, `AbsaSectionHeader`, `AbsaStatCard` from `@/components/ui`. Never build buttons/cards/badges/gradients from raw HTML. See [skills/absa-brand-colour.md](./skills/absa-brand-colour.md) for usage.
7. **Every component file must have a `name` in `defineOptions({ name: '...' })`**.
8. **Routes defined in `src/router/index.js`** — lazy-loaded via `() => import(...)`.
8. **No hardcoded API URLs** — use `API_BASE_URL` from `src/services/api.js`.
9. **Composables in `src/composables/`** — reusable logic extracted from components.

---

## Running

```bash
npm run dev        # Vite dev server (default :5173)
npm run build      # Production build
npm run preview    # Preview production build
npm run test       # Vitest
```

---

## Project Layout

```
src/
├── assets/           # Static assets (images, fonts)
├── components/       # Shared UI components
│   └── layouts/      # DashboardLayout, AuthLayout, etc.
├── composables/      # Reusable composition functions
├── config/           # App configuration constants
├── events/           # Event bus / mitt events
├── router/           # Vue Router (index.js)
├── services/         # API layer (api.js, axios interceptors)
├── stores/           # Pinia stores
├── utils/            # Utility functions
├── views/            # Page-level components
│   └── Modules/      # Feature modules (datapipeline, aiagents, managers)
└── workers/          # Web Workers
```

---

## .ai Directory Structure

```
.ai/
├── README.md                 ← YOU ARE HERE
├── project-context.md        What we're building, tech stack, domain terms
├── current-sprint.md         Live sprint status, store→API mapping
├── architecture.md           Component tree, routing, data flow
├── coding-standards.md       Vue 3 conventions, naming, component order
├── MEMORIES.md                Persistent agent memory bank — rules + learning ledger
└── skills/
    ├── absa-brand-colour.md  ABSA colour guidelines
    └── rm-dashboard-colour-mapping.md  Dashboard colour scheme
```
