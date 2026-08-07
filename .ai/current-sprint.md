# Current Sprint — Frontend

**Status:** Demo-Ready — 6 Pages Wired to Backend
**Date:** 2026-08-07
**Branch:** `main`

---

## Completed Today (2026-08-07)

### Backend Wiring
- [x] `api.js` — localhost:8080 for local dev
- [x] `customerStore.js` — full rewrite: api.js Axios, parallel portfolio+list, `_mapCustomer()`, `DEFAULT_AS_OF_DATE`
- [x] `predictionStore.js` — api.js, sends `as_of_date`, fixed `churn_probability` field
- [x] `modelsStore.js` — NEW: model registry + champion metrics
- [x] `etlStore.js` — already existed, drives both ETL pages

### Pages Wired
- [x] `DashboardHome.vue` — live KPIs (4,998 total, 2,291 at risk), ledger with StateBadge
- [x] `PortfolioOverview.vue` — live KPIs from customerStore
- [x] `CustomerDetail.vue` — fetches customer, timeline, churn, health, markov on mount
- [x] `Models.vue` — AUC-ROC 76.7%, Log Loss 0.57, Brier 0.19
- [x] `EtlPipeline.vue` — health cards, quality SVG, execution table, bottom stats
- [x] `ETLRunHistory.vue` — already wired

### Sidebar
- [x] Section headers: CUSTOMER LIFECYCLE + AI & DATA
- [x] 6 clean links, Branch Manager added, Portfolio route fixed
- [x] Breadcrumb maps all 9 route names

## Store → API Map

| Store | Endpoints | Pages |
|-------|-----------|-------|
| `customerStore` | `/customers/portfolio`, `/customers`, `/{id}`, `/{id}/timeline` | DashboardHome, Portfolio, CustomerDetail |
| `predictionStore` | `/predictions/{id}/churn`, `/health`, `/markov-matrix` | CustomerDetail |
| `modelsStore` | `/models` | Models |
| `etlStore` | `/etl/runs` | EtlPipeline, ETLRunHistory |

## Known Gaps
- [ ] Branch Manager Dashboard not wired
- [ ] Customer names are synthetic "Customer 00001"
- [ ] Account number, tenure, RM name show `...`
- [ ] Churn % and CLV show `--` in ledger (needs prediction enrichment)

## Startup
```powershell
cd "c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend"
npm run dev
```
