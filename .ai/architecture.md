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
    ├── DropdownMenu (3 groups: Dashboard, INTELLIGENCE, AI & DATA)
    ├── TopBar (search, user menu)
    └── <router-view>
        ├── DashboardHome       → /dashboard/portfolio
        ├── BranchManager       → /dashboard/branch-manager
        ├── CustomerValueIntelligence → /dashboard/customer-value
        ├── LifecyclePrediction → /dashboard/lifecycle
        ├── BalanceForecast     → /dashboard/balance-forecast
        ├── BusinessOutcomes    → /dashboard/business-outcomes
        ├── Models              → /dashboard/models
        ├── ETLRunHistory       → /dashboard/etl-run-history
        └── EtlConfigManager    → /dashboard/etl-config-manager
```

---

## 2. Routing

```
/dashboard                         → redirect → /dashboard/portfolio
/dashboard/portfolio               → PortfolioOverview
/dashboard/branch-manager          → BranchManagerDashboard
/dashboard/customer-value          → CustomerValueIntelligence
/dashboard/lifecycle               → LifecyclePrediction
/dashboard/balance-forecast        → BalanceForecast
/dashboard/business-outcomes       → BusinessOutcomes
/dashboard/models                  → Models
/dashboard/etl-run-history         → ETLRunHistory
/dashboard/etl-config-manager      → EtlConfigManager
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
│  intelligenceStore | customerStore | modelsStore     │
│  etlStore | authStore                                │
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
| `intelligenceStore` | clvData, lifecycleData, forecastData, outcomesData | 4 endpoints | CustomerValue, Lifecycle, BalanceForecast, Outcomes |
| `customerStore` | customers[], selectedCustomer, portfolio, timeline | 4 endpoints | DashboardHome, Portfolio, CustomerDetail |
| `modelsStore` | models[], championChurn, championCLV | 1 endpoint | Models |
| `etlStore` | runs[], kpis, statusPanel, qualityTrend | 1 endpoint | EtlPipeline, ETLRunHistory |
| `authStore` | user, token, isAuthenticated | /auth/* | Login, DashboardLayout |

---

## 5. Sidebar / Dropdown Structure

```
ABSA INTELLIGENCE UNIT

DASHBOARD
  ▣  Dashboard               → /dashboard/portfolio
  ⌂  Branch Manager          → /dashboard/branch-manager

INTELLIGENCE
  ★  Customer Value          → /dashboard/customer-value
  ♒  Lifecycle Prediction    → /dashboard/lifecycle
  📈 Balance Forecast        → /dashboard/balance-forecast
  💰 Business Outcomes       → /dashboard/business-outcomes

AI & DATA
  ◫  Model Performance       → /dashboard/models
  ⛭  Run History             → /dashboard/etl-run-history
  ⚙  ETL Config Manager      → /dashboard/etl-config-manager
```
  ◷  Run History         → /dashboard/etl-run-history

──
  ⏻  Logout
```

---

## 6. Reusable Components

| Component | Purpose |
|-----------|---------|
| `LoadingSkeleton` | Stats, table, card loading states |
| `AbsaCard` | Branded card container |
| `AbsaButton` | Primary/outline styled buttons |
| `AbsaBadge` | Status/category badges |
| `AbsaStatCard` | KPI metric cards |
| `AbsaSectionHeader` | Section title with accent bar |
| `AbsaGradientBg` | ABSA red gradient background |
| `AiNbaPanel` | AI Next Best Action panel — prescriptive intervention with SHAP drivers and counterfactual outcomes |
| `AiCampaignModal` | AI Campaign Recommendation Engine — slide-over with cohort analysis, 3 ranked strategies, uplift predictions |
| `AiShapDriverBar` | Reusable SHAP feature contribution bar (feature name, contribution %, direction) |
| `AiConfidenceBadge` | Reusable model confidence score pill with progress bar |

