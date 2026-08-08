# Architecture — ABSA Foundry Frontend

**Last updated:** 2026-08-07  
**Backend:** 5 services on Tailscale `100.82.12.85` (ports 8002-8005, 8080)

---

## 1. Component Tree

```
App.vue
├── AuthLayout
│   ├── LoginView
│   ├── ForgotPasswordView
│   └── ResetPasswordView
│
└── DashboardLayout
    ├── Sidebar (2 groups: CUSTOMER LIFECYCLE + AI & DATA)
    ├── TopBar (search, period selector, user menu)
    └── <router-view>
        ├── DashboardHome       → /dashboard/home
        ├── PortfolioOverview   → /dashboard/portfolio
        ├── CustomerDetail      → /dashboard/customer/:id
        ├── BranchManager       → /dashboard/branch-manager (not yet wired)
        ├── Models              → /dashboard/models
        ├── EtlPipeline         → /dashboard/etl-pipeline
        ├── ETLRunHistory       → /dashboard/etl-run-history
        └── BatchExecutionDetail → /dashboard/etl-run-history/batch/:runId
```

---

## 2. Routing

```
/dashboard                         → redirect → /dashboard/home
/dashboard/home                    → DashboardHome
/dashboard/portfolio               → PortfolioOverview
/dashboard/customer/:id            → CustomerDetail
/dashboard/branch-manager          → BranchManagerDashboard
/dashboard/models                  → Models
/dashboard/etl-pipeline            → EtlPipeline
/dashboard/etl-run-history        → ETLRunHistory
/dashboard/etl-run-history/batch/:id → BatchExecutionDetail
```

---

## 3. Data Flow

```
┌─────────────────────────────────────────────────────┐
│                    Vue Component                     │
│  Template ← ref() ← computed() ← store (Pinia)      │
└───────────────────────┬─────────────────────────────┘
                        │ calls
┌───────────────────────▼─────────────────────────────┐
│              Pinia Store (axios.create)              │
│  customerStore | predictionStore | modelsStore      │
│  etlStore | authStore | dashboardStore              │
└───────────────────────┬─────────────────────────────┘
                        │ HTTP /api/v1/*
┌───────────────────────▼─────────────────────────────┐
│     src/services/api.js — Axios + JWT interceptor    │
│  API_BASE_URL: localhost:8080 or 100.82.12.85:8080  │
└───────────────────────┬─────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────┐
│           API Gateway (:8080)                        │
│  Auth → RBAC → Rate Limit → Route → Backend Service  │
└─────────────────────────────────────────────────────┘
```

---

## 4. State Management (Pinia)

| Store | Key State | APIs Called | Pages |
|-------|-----------|-------------|-------|
| `customerStore` | customers[], selectedCustomer, portfolio, timeline | 4 endpoints | DashboardHome, Portfolio, CustomerDetail |
| `predictionStore` | predictions{}, healthScores{}, markovMatrix | 3 endpoints | CustomerDetail |
| `modelsStore` | models[], championChurn, championCLV | 1 endpoint | Models |
| `etlStore` | runs[], kpis, statusPanel, qualityTrend | 1 endpoint | EtlPipeline, ETLRunHistory |
| `authStore` | user, token, isAuthenticated | /auth/* | Login, DashboardLayout |

---

## 5. Sidebar Structure

```
ABSA INTELLIGENCE UNIT

CUSTOMER LIFECYCLE
  ▣  Dashboard           → /dashboard/home
  ▨  Portfolio           → /dashboard/portfolio
  ⌂  Branch Manager      → /dashboard/branch-manager

AI & DATA
  ◫  Model Performance   → /dashboard/models
  ⛭  ETL Pipeline        → /dashboard/etl-pipeline
  ◷  Run History         → /dashboard/etl-run-history

──
  ⏻  Logout
```

---

## 6. Reusable Components

| Component | Purpose |
|-----------|---------|
| `LoadingSkeleton` | Stats, table, card loading states |
| `StateBadge` | Customer state icon + label (ACTIVE, AT_RISK, DORMANT, CHURNED) |
| `HealthScoreGauge` | 0-100 gauge with trend indicator |
| `ChurnProbabilityBar` | Horizontal bar with color coding |
| `StateTimeline` | Vertical timeline of state transitions |
| `MarkovMatrix` | 4×4 transition probability grid |
| `AbsaCard` | Branded card container |
| `AbsaButton` | Primary/outline styled buttons |
| `AbsaBadge` | Status/category badges |
| `AbsaStatCard` | KPI metric cards |
| `AbsaSectionHeader` | Section title with accent bar |
| `AbsaGradientBg` | ABSA red gradient background |
