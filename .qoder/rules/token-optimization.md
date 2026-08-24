---
trigger: always_on
---
# Token-Minimization Protocol (Graphify + .ai Knowledge Base)

### 0. Active Command Center Scope (Ignore Legacy Base Code)
- **Active Router Tree:** Focus ONLY on components mapped in `.ai/architecture.md`:
  - `DashboardLayout` routes (`/dashboard/*`): `PortfolioOverview`, `BranchManagerDashboard`, `CustomerValueIntelligence`, `LifecyclePrediction`, `BalanceForecast`, `BusinessOutcomes`, `Models`, `ETLRunHistory`, `EtlConfigManager`.
  - Core Pinia Stores: `intelligenceStore`, `customerStore`, `modelsStore`, `etlStore`, `authStore`.
- **Legacy Exclusions:** Do NOT reference, inspect, or modify legacy CRM views or unmapped views in `src/views/Modules/crm/` unless explicitly instructed.

### 1. Macro Domain & Architectural Context
- Consult `.ai/README.md`, `.ai/architecture.md`, and `.qoder/repowiki/` first to understand high-level system flows, module architecture, and business domain boundaries.
- **Brand & Component Rules:** Check `.ai/skills/absa-brand-colour.md` before generating UI. ALWAYS use `Absa*` primitives (`AbsaButton`, `AbsaCard`, `AbsaBadge`, etc.) from `@/components/ui` and `absa-*` Tailwind tokens. NEVER build buttons/cards from raw HTML.
- **State & API Rules:** Use Pinia for state and Axios via `src/services/api.js`. Never use raw `fetch()` or hardcoded API URLs.
- Do NOT read raw component/service files just to understand general project layout.

### 2. Dependency Navigation & Symbol Lookup (Micro)
- Check `graphify-out/graph.json` or `graphify-out/GRAPH_REPORT.md` to map class/function nodes, imports, and component relationships.
- Use `graphify query` when looking up execution paths or child component structures instead of scanning workspace files.

### 3. File Loading & Output Limits
- Use Vue 3 Composition API `<script setup>` syntax with `defineOptions({ name: '...' })`.
- Open ONLY the specific 1-2 source files identified by the graph query to make code changes.
- Avoid wide text searches (`grep` or `find`) or loading unreferenced files into context.
- Output concise, targeted diff patches rather than rewriting entire source files.