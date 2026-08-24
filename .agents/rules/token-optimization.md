---
trigger: always_on
---
# Token-Minimization & Execution Protocol (Graphify + .ai Knowledge Base)

### 0. Active Command Center Scope (Ignore Legacy Base Code)
- **Active Router Tree:** Focus ONLY on components mapped in `.ai/architecture.md`:
  - `DashboardLayout` routes (`/dashboard/*`): `PortfolioOverview`, `BranchManagerDashboard`, `CustomerValueIntelligence`, `LifecyclePrediction`, `BalanceForecast`, `BusinessOutcomes`, `Models`, `ETLRunHistory`, `EtlConfigManager`.
  - Core Pinia Stores: `intelligenceStore`, `customerStore`, `modelsStore`, `etlStore`, `authStore`.
- **Legacy Exclusions:** Do NOT reference, inspect, or modify legacy CRM views or unmapped views in `src/views/Modules/crm/` unless explicitly instructed.

### 1. Macro Architectural & Domain Rules
- Consult `.ai/README.md`, `.ai/architecture.md`, and `.qoder/repowiki/` first to understand application architecture and module boundaries.
- **Brand & Component Rules:** Check `.ai/skills/absa-brand-colour.md` before generating UI. ALWAYS use `Absa*` UI primitives (`AbsaButton`, `AbsaCard`, `AbsaBadge`, etc.) from `@/components/ui` and `absa-*` Tailwind tokens. NEVER build buttons/cards from raw HTML.
- **State & API Rules:** Use Pinia for state and Axios via `src/services/api.js`. Never use raw `fetch()` or hardcoded API URLs.
- Do NOT read raw component or view files line-by-line just to understand top-level repo layout.

### 2. AST Symbol & Dependency Lookups (Micro)
- Query `graphify-out/graph.json` or `graphify-out/GRAPH_REPORT.md` to resolve class/function nodes, component imports, and community dependencies.
- You may run `graphify query` commands to inspect structural node relationships instead of scanning workspace files.

### 3. Execution & Context Budget
- Use Vue 3 Composition API `<script setup>` syntax and include `defineOptions({ name: '...' })` on every component file.
- Open ONLY the specific 1–2 target source files identified by `graph.json` to perform code edits.
- Avoid workspace-wide text searches (`grep`, `find`) for structural questions.
- Output concise unified diff patches or targeted block replacements rather than rewriting entire files.