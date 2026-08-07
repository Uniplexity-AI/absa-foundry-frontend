# MEMORIES.md — ABSA Foundry Frontend Memory Bank

This file acts as the persistent, self-learning memory ledger for AI agents working on the **ABSA Foundry Frontend**.

> **Parent Memory Bank:** See `absa-foundry-backend/customer-lifecycle-ai/.ai/MEMORIES.md` for system-wide rules.

---

## 1. Agent Memory Guidelines

1. **Pre-Task:** Review Section 2 rules and Section 3 ledger before making changes.
2. **Post-Task:** Append structured records to Section 3 after resolving issues.
3. **Promotion:** Move High-Confidence entries from Section 3 → Section 2.

---

## 2. High-Confidence System Rules

* **API Client Pattern:**
  - All stores MUST use `axios.create({ baseURL: API_BASE_URL })` imported from `@/services/api`.
  - Never use raw `fetch()` with hardcoded IPs in Pinia stores.
  - Attach JWT token via request interceptor: `config.headers.Authorization = \`Bearer ${token}\``.

* **Store Naming & Structure:**
  - Pinia stores use `defineStore('name', () => { ... })` setup syntax.
  - Export named: `export const useXxxStore = defineStore(...)`.
  - Computed properties go before actions in the store body.

* **API Field Mapping:**
  - Always test backend responses with `curl` before writing store mappings.
  - Use `_mapCustomer()` / `_mapRun()` normalizer functions to translate API shapes.
  - Handle `as_of_date` parameter: send `DEFAULT_AS_OF_DATE = '2026-07-27'` on all requests.

* **Component Structure Order:**
  1. Imports → 2. Props/Emits → 3. Composables → 4. State → 5. Computed → 6. Methods → 7. Lifecycle → 8. Watchers

* **Sidebar & Navigation:**
  - Sidebar groups: CUSTOMER LIFECYCLE + AI & DATA.
  - Breadcrumb maps route names via `breadcrumbTitle` computed.
  - All dashboard routes MUST be children of `/dashboard` path.

---

## 3. Dynamic Learning Ledger

### [2026-08-07] Portfolio KPI Shape Mismatch
* **Context:** `customerStore.fetchPortfolio()` expected `data.customers` array but backend returned `{total_customers, by_state: {...}}`.
* **Learned Rule:** Fetch both `/portfolio` (KPIs) and `/customers` (table rows) in parallel via `Promise.all()`. Derive KPI cards from `by_state` dict, table rows from customer list.
* **Confidence:** High

### [2026-08-07] Models Page AUC Display
* **Context:** Models page showed `--` for all metrics. Backend returned `{models: [{metrics: {auc: 0.7672}}]}`.
* **Learned Rule:** API returns decimal AUC (0-1), frontend displays as percentage. Use `(m.metrics.auc * 100).toFixed(1) + '%'`.
* **Confidence:** High

### [2026-08-07] ETL Pipeline Page Field Casing
* **Context:** `EtlPipeline.vue` execution history showed empty rows because store mapping used snake_case but API returned camelCase.
* **Learned Rule:** ETL API returns: `runId`, `batchId`, `rowsReceived`, `rowsValid`, `rowsLoaded`, `rowsRejected`, `qualityScore`, `qualityClass`, `statusClass` (all camelCase). Quality trend uses `{label, value, rows, rejected, failed}`.
* **Confidence:** High

### [2026-08-07] Sidebar Route Fix
* **Context:** Sidebar had `to="/portfolio"` (legacy route) instead of `to="/dashboard/portfolio"` (canonical).
* **Learned Rule:** All dashboard pages live under `/dashboard/*`. Legacy `/portfolio` and `/customer/:id` routes exist but sidebar should link to canonical paths.
* **Confidence:** High

---

## 4. Pending Verification

- [ ] Branch Manager Dashboard not yet wired — needs `branchStore.js` + backend aggregation endpoint
- [ ] Churn % and CLV columns in ledger show `--` — needs prediction enrichment batch to populate per-row
- [ ] Customer Detail shows `...` for accountNumber, idNumber, tenure, RM — backend doesn't provide these fields
