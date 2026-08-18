# ABSA Foundry Frontend — Design Documentation

> **Document version:** 1.0  
> **Date:** 11 August 2026  
> **Phase:** PoC Month 2  
> **Design Authority:** ETL Manager page (`ETLRunHistory.vue`)

---

## 1. Architecture Overview

```
Vue 3 (Composition API, <script setup>)
 └── Vite + Pinia + Vue Router 4 + Tailwind CSS + Chart.js + Axios
      └── 7 Dashboard Pages + Auth + Layout System
           └── 5 Pinia Stores → Gateway (:8080) → 5 Microservices
```

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Vue 3 + Composition API (`<script setup>`) | Reactive UI |
| Build | Vite | HMR, bundling |
| State | Pinia | Centralized stores |
| Routing | Vue Router 4 | Lazy-loaded page chunks |
| Styling | Tailwind CSS + CSS Variables | ABSA brand design system |
| HTTP | Axios + Fetch | API calls |
| Charts | Chart.js via vue-chartjs | Portfolio analytics |

---

## 2. Design System

### 2.1 Canonical Design Authority

The **ETL Manager page** (`ETLRunHistory.vue`) is the canonical design reference. All new pages must adopt its patterns. Full documentation in `.ai/design-patterns.md`.

### 2.2 Color Palette (ABSA Brand)

| Token | Hex | Usage |
|-------|-----|-------|
| Passion (Primary) | `#DC0037` | Buttons, active tabs, badges, brand accents |
| Power | `#B50232` | Hover states, button dark |
| Energy | `#FF780F` | Warning indicators, rejection counts |
| Enrich | `#131010` | Text (`text-on-surface`) |
| Serene | `#FFFFFF` | Backgrounds (`bg-surface`) |

### 2.3 Box / Card Pattern (Universal)

```html
<div class="bg-surface rounded border border-outline-variant global-dotted-bg shadow-sm">
  <p class="text-xs text-on-surface-variant font-label uppercase tracking-wide font-semibold mb-2">LABEL</p>
  <span class="text-3xl font-headline font-bold text-on-surface">VALUE</span>
</div>
```

### 2.4 Table Pattern (Universal)

```html
<div class="bg-surface rounded shadow-sm overflow-hidden global-dotted-bg">
  <div class="p-5 flex justify-between items-center bg-surface">
    <h3 class="text-headline-md font-headline font-semibold text-on-surface font-bold">Title</h3>
  </div>
  <div class="overflow-x-auto">
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="bg-surface text-xs text-on-surface-variant font-label uppercase tracking-wider">
          <th class="p-4 font-semibold">Column</th>
        </tr>
      </thead>
      <tbody class="text-sm">
        <tr v-if="items.length === 0">
          <td colspan="N" class="p-12 text-center text-body-md text-secondary">No data</td>
        </tr>
        <tr v-for="item in items" :key="item.id" class="hover:bg-surface-container-low transition-colors">
          <td class="p-4 font-semibold text-on-surface">{{ item.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

### 2.5 Page Layout

```html
<div class="dashboard-root global-mesh-bg w-full min-h-screen p-4 md:p-6 lg:p-8">
  <!-- Full-width, no centering, no max-width -->
</div>
```

### 2.6 Typography CSS Variables (Never Hardcoded)

| Class | For |
|-------|-----|
| `text-on-surface` | Primary text |
| `text-on-surface-variant` | Secondary / muted text |
| `text-primary` | Brand red text |
| `text-on-primary` | White text on red backgrounds |
| `bg-surface` | Card/container backgrounds |
| `bg-surface-container-low` | Hover/alternate rows |
| `border-outline-variant` | Borders |

---

## 3. Dashboard Pages

### 3.1 Portfolio Overview (`/dashboard/portfolio`)

**Component:** `PortfolioOverview.vue`  
**Store:** `customerStore` + `predictionStore`

| Feature | Details |
|---------|---------|
| KPI Cards | Churn risk %, active customers, at-risk count, CLV |
| Charts | Health histogram (bar), churn segments (doughnut), both ABSA-colored |
| Customer Table | Paginated list from `customerStore`, clickable rows |
| Snapshot Dropdown | 30 dates centered on 2026-07-27, changes `asOfDate` parameter |
| AI Churn Intelligence | Live driver data, branch-level churn summary |
| Pagination | Dynamic from `customerStore.totalPages` |
| Loading | Full-page skeleton (4 KPI + block + table) |
| Empty States | "No data" messages for every section |

### 3.2 Customer Detail (`/dashboard/customer/:id`)

**Component:** `CustomerDetail.vue`  
**API:** `customerStore`, `predictionStore`, axios direct for NBA/reason-codes

| Section | Data Source |
|---------|------------|
| Customer Profile | `customerStore.fetchCustomerProfile()` |
| Health Score Gauge | `predictionStore.fetchChurnProbability()` |
| Churn Probability Bar | `predictionStore.fetchChurnProbability()` |
| State Timeline | `customerStore.fetchCustomerTimeline()` — condensed identical states |
| Markov Matrix | `predictionStore` — null-safe (states with insufficient data) |
| Next Best Action | `GET /recommendations/{id}` — async with loading spinner, 60s timeout |
| Risk Drivers | `GET /insights/reason-codes/{id}` — mapped from code/severity/detail fields |

### 3.3 Branch Manager Dashboard (`/dashboard/branch-manager`)

**Component:** `BranchManagerDashboard.vue`  
**API:** 3 endpoints

| Section | Details |
|---------|---------|
| Branch List | 13 branches from API, clickable rows |
| Forecast Bars | v-for loop, reactive |
| Churn Segments | v-for loop, reactive |
| Loading | Full-page skeleton |

### 3.4 Model Performance (`/dashboard/models`)

**Component:** `Models.vue`  
**API:** Proxy via gateway → prediction service (:8004)

| Section | Data |
|---------|------|
| Model Cards | AUC-ROC 76.7%, log loss, Brier score |
| Performance History | Chart from `/monitoring/performance-history` |
| Feature Drift | Table from `/monitoring/feature-drift` — 8 features with PSI |
| Prediction Log | Table from `/monitoring/prediction-log` — 4,211 entries |

### 3.5 ETL Manager (`/dashboard/etl-run-history`)

**Component:** `ETLRunHistory.vue`  
**Store:** `etlStore`  
**API:** `etlApi.js`

| Section | Details |
|---------|---------|
| Action Buttons | Export Logs, **Trigger Manual Run** (opens config selector modal) |
| Health Cards | PostgreSQL Cluster, Redis Cache, API Gateway — from `statusPanel` |
| Quality Trend | Bar chart — last 10 runs from `qualityTrend` |
| Execution History | Table with Run ID, Batch ID, Duration, Rows, Quality Score bar, Status badge |
| Pagination | Dynamic v-for on `etlStore.totalPages`, prev/next disabled at boundaries |
| Footer Metrics | Storage Growth, Average Quality, Failed Retries, Gateway Latency |
| Row Click | Navigates to Batch Detail page |
| Action Button | `open_in_new` icon → Batch Detail |
| Loading | Full-page skeleton |

**Trigger Pipeline Modal:**
- Fetches config list from `GET /api/etl/configs` on open
- Dropdown: `filename.yaml — description`
- Run button calls `POST /api/etl/trigger`
- Success: green banner, auto-dismiss 5s, dashboard refreshes
- Error: red banner, auto-dismiss 8s

### 3.6 Batch Execution Detail (`/dashboard/etl-run-history/batch/:runId`)

**Component:** `BatchExecutionDetail.vue`  
**API:** `GET /api/etl/runs/{runId}`

| Section | Content |
|---------|---------|
| Header | Back link, Batch ID (UUID), Status badge, Pipeline name, Trigger info |
| Run Snapshot (4 cards) | Quality Score (with SLA checkmark), Duration (start/end), Rows Processed (Received→Valid→Loaded→Rejected), Data Quality (Duplicates/Warnings/Errors/Skipped) |
| Execution Timeline | 6-step vertical timeline with colored dots, connecting lines, timestamps |
| Rejection Analysis | Left: By Category table. Right: Top Failing Rules table (from `error_by_category`/`error_by_rule`) |
| Investigation Tabs | Rejected Records / Execution Logs / Audit Trail — all computed from batch data |
| Config Snapshot | Collapsible read-only YAML viewer with line numbers and syntax coloring |
| Loading | Full-page skeleton |
| Error State | Error message + back link |

### 3.7 ETL Config Manager (`/dashboard/etl-config-manager`)

**Component:** `EtlConfigManager.vue`

| Feature | Details |
|---------|---------|
| Tab Navigation | Run History / Configurations |
| Config Table | All YAML specs from `GET /api/etl/configs` — Name, Status, Last Modified, Size, Actions |
| Inline Editor | GitHub-style: breadcrumb header, Edit/Preview toggle, line numbers, syntax-highlighted YAML |
| New Config | Opens editor with default YAML template |
| Cancel / Save | Cancel returns to table, Save calls API and refreshes |
| Row Click | Opens config in editor |

---

## 4. Pinia Stores

### 4.1 `etlStore` (`src/stores/etlStore.js`)

| State | Type | Purpose |
|-------|------|---------|
| `runs` | `array` | Paginated run list |
| `totalRuns` | `number` | Total count for pagination |
| `page` | `number` | Current page (1-based) |
| `limit` | `number` | Items per page (default 25) |
| `kpis` | `object` | Aggregated KPIs (avg_quality, failed_runs, etc.) |
| `statusPanel` | `object` | Current operational status |
| `qualityTrend` | `array` | Last 10 quality points for chart |
| `loading` | `boolean` | Loading state |
| `error` | `string|null` | Error message |
| `totalPages` | `computed` | `ceil(totalRuns / limit)` |

**Actions:** `loadDashboard()`, `setPage(p)`, `setStatusFilter(s)`, `refresh()`

### 4.2 `customerStore` (`src/stores/customerStore.js`)

Portfolio-level customer data: `fetchPortfolio()`, `fetchCustomerProfile()`, `fetchCustomerTimeline()`, pagination, snapshot date support. Timeout: 15,000ms.

### 4.3 `predictionStore` (`src/stores/predictionStore.js`)

Prediction data: `fetchChurnProbability()`, `fetchBatchPredictions()` (batch size 2 to avoid timeouts), `fetchChurnDrivers()`. Timeout: 15,000ms.

---

## 5. API Services

### 5.1 `etlApi.js` (`src/services/etlApi.js`)

| Function | Method | Endpoint | Returns |
|----------|--------|----------|---------|
| `fetchETLDashboard(params)` | GET | `/api/etl/runs` | Dashboard with KPIs, status, trend, runs |
| `fetchETLRunDetail(runId)` | GET | `/api/etl/runs/{runId}` | Full audit record + validation data |
| `fetchETLConfigs()` | GET | `/api/etl/configs` | List of extraction specs |
| `triggerETLPipeline(name, dryRun)` | POST | `/api/etl/trigger` | Trigger response |

### 5.2 `auth_api.js` (`src/services/auth_api.js`)

Direct base URL computation (no circular dependency). JWT token in `Authorization` header from `localStorage`.

---

## 6. Routing (`src/router/index.js`)

| Path | Name | Component | Title |
|------|------|-----------|-------|
| `/dashboard/portfolio` | DashboardHome | PortfolioOverview.vue | Dashboard |
| `/dashboard/customer/:id` | CustomerDetail | CustomerDetail.vue | Customer Detail |
| `/dashboard/branch-manager` | BranchManagerDashboard | BranchManagerDashboard.vue | Branch Manager |
| `/dashboard/models` | ModelsMonitoring | Models.vue | Model Performance |
| `/dashboard/etl-pipeline` | EtlPipeline | EtlPipeline.vue | ETL Pipeline |
| `/dashboard/etl-run-history` | EtlRunHistory | ETLRunHistory.vue | ETL Manager |
| `/dashboard/etl-run-history/batch/:runId` | BatchExecutionDetail | BatchExecutionDetail.vue | Batch Detail |
| `/dashboard/etl-config-manager` | EtlConfigManager | EtlConfigManager.vue | ETL Config Manager |

All dashboard routes lazy-loaded. Auth guard via `router.beforeEach`. `DEV_BYPASS` flag for development.

---

## 7. Component Inventory

### 7.1 Core UI
| Component | Location | Purpose |
|-----------|----------|---------|
| `LoadingSkeleton` | `src/components/LoadingSkeleton.vue` | KPI/block/table skeleton loaders |

### 7.2 Removed (Old Imports, August 2026 Cleanup)
- `src/components/absa/` — 6 files (replaced by inline patterns)
- `src/components/icons/` — 5 Vite template icons
- `src/components/ui/` — AbsaButton, AbsaBadge, etc. (replaced by Tailwind)
- 5 ETL sub-components (`EtlHealthCard`, `EtlQualityTrend`, etc.)
- `src/views/Admin/` — 4 orphaned admin pages
- `src/workers/`, `src/events/` — unrelated code
- `.git_disabled/` — entire foreign git repo
- 32 files total removed

---

## 8. Design Patterns Reference

### 8.1 Status Badges

```html
<span :class="['inline-flex items-center gap-1.5 text-xs font-bold', statusColor]">
  <span v-if="status === 'RUNNING'" class="w-1.5 h-1.5 rounded-full animate-pulse bg-amber-500"></span>
  <span v-if="status === 'COMPLETED'" class="material-symbols-outlined text-[14px]">check</span>
  <span v-if="status === 'FAILED'" class="material-symbols-outlined text-[14px]">close</span>
  {{ status }}
</span>
```

Colors: `text-green-600` (COMPLETED), `text-red-600` (FAILED), `text-amber-600` (RUNNING/WARNING)

### 8.2 Pagination

```html
<div class="p-4 flex items-center justify-between bg-surface text-sm text-on-surface-variant">
  <span>{{ total ? `Showing ${from} to ${to} of ${total} results` : 'No results' }}</span>
  <div class="flex items-center gap-1">
    <button @click="prevPage" :disabled="page <= 1"
      class="w-8 h-8 flex items-center justify-center rounded border border-outline-variant hover:bg-surface-variant disabled:opacity-30">
      <span class="material-symbols-outlined text-[16px]">chevron_left</span>
    </button>
    <button v-for="p in totalPages" :key="p" @click="goToPage(p)"
      :class="['w-8 h-8 flex items-center justify-center rounded border font-semibold',
        p === page ? 'bg-primary text-on-primary border-primary' : 'border-outline-variant hover:bg-surface-variant']">
      {{ p }}
    </button>
    <button @click="nextPage" :disabled="page >= totalPages"
      class="w-8 h-8 flex items-center justify-center rounded border border-outline-variant hover:bg-surface-variant disabled:opacity-30">
      <span class="material-symbols-outlined text-[16px]">chevron_right</span>
    </button>
  </div>
</div>
```

### 8.3 Empty / Null States

Every data-bound element must handle empty state:
- Cards: `"No data available"` centered text
- Tables: `<tr><td colspan="N">No records found</td></tr>`
- Values: `{{ value != null ? value : '—' }}`

### 8.4 Button Patterns

| Type | Classes |
|------|---------|
| Primary | `px-4 py-2 bg-primary text-on-primary rounded hover:bg-primary-container shadow-sm` |
| Secondary | `px-4 py-2 bg-surface text-on-surface border border-outline-variant rounded hover:bg-surface-container-low shadow-sm` |
| Disabled | `disabled:opacity-30` or `disabled:opacity-50` |

---

## 9. What NOT to Do (Anti-Patterns)

| ❌ Don't | ✅ Do |
|---------|------|
| `bg-[#FFFFFF]` or `bg-white` | `bg-surface` |
| `border-[#e4e2e2]` | `border-outline-variant` |
| `text-[#131010]` | `text-on-surface` |
| `text-[#131010]/70` | `text-on-surface-variant` |
| `rounded-xl`, `rounded-lg` | `rounded` |
| `max-w-[1440px] mx-auto` | `w-full` (full width) |
| Modal-based editors | Inline / page-filling views |
| Custom components (AbsaButton, AbsaBadge) | Tailwind classes directly |
| `shadow-lg` on boxes | `shadow-sm` |
