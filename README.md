# ABSA Intelligence Unit — Frontend

AI-driven banking analytics platform for customer lifecycle prediction, retention management, and portfolio intelligence. Built for ABSA Bank Zambia's internal network (air-gapped, on-premise deployment).

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Vue 3 (Composition API)                  │
│  ┌──────────┐  ┌───────────┐  ┌────────────┐  ┌──────────┐ │
│  │  Views   │  │Components │  │ Composables│  │  Store   │ │
│  │ (pages)  │  │  (ui +    │  │ (reusable  │  │ (Pinia + │ │
│  │          │  │  layouts) │  │  logic)    │  │  Vuex)   │ │
│  └────┬─────┘  └─────┬─────┘  └─────┬──────┘  └────┬─────┘ │
│       │              │              │               │       │
│  ┌────┴──────────────┴──────────────┴───────────────┴────┐  │
│  │                  API Services Layer                     │  │
│  │   (auth, crm, documents, notifications, audit, etc.)   │  │
│  └────────────────────────┬───────────────────────────────┘  │
│                           │                                  │
│  ┌────────────────────────┴───────────────────────────────┐  │
│  │              FastAPI Gateway (:8080)                     │  │
│  │    → Feature Service  →  Prediction Service              │  │
│  │    → Decision Intel   →  ETL Audit                       │  │
│  └─────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vue 3 (Composition API) + Vite |
| State | Pinia (primary) + Vuex (legacy) |
| Routing | Vue Router 4 |
| Styling | Tailwind CSS + ABSA Design System (CSS custom properties) |
| Charts | Chart.js via vue-chartjs |
| HTTP | Axios |
| Auth | JWT + LDAP/Active Directory |
| PWA | vite-plugin-pwa (offline-ready) |
| Build | Vite + esbuild |

---

## Project Structure

```
src/
├── api_services/          # API abstraction layer
│   ├── api.js             # Axios instance & interceptors
│   ├── auth_api.js        # LDAP login/logout
│   ├── decodeJWT.js       # JWT parsing utility
│   ├── crm_api.js         # Customer & CRM endpoints
│   ├── notification_api.js
│   ├── audit_log.js       # Frontend audit trail
│   └── ...                # (17 service modules)
│
├── assets/                # Static assets & design system
│   ├── main.css           # Tailwind + design tokens
│   ├── pages.css          # Page-level shared styles
│   ├── patterns.css       # Background patterns & gradients
│   ├── base.css           # Vue theme defaults
│   └── styles/
│       └── absa-colors.css # ABSA brand design tokens
│
├── components/            # Reusable UI components
│   ├── layouts/           # Page shells
│   │   ├── DashboardLayout.vue      # Authenticated layout
│   │   └── SuperAdminLayout.vue     # Admin panel layout
│   ├── ui/                # Design-system primitives
│   │   ├── PageHeader.vue
│   │   ├── KpiCard.vue
│   │   ├── KpiSection.vue
│   │   ├── Modal.vue
│   │   ├── ConfirmDialog.vue
│   │   ├── EmptyState.vue
│   │   ├── DashboardWidgets.vue
│   │   └── ...
│   ├── LandingPage/       # Public marketing site (18 components)
│   └── *.vue              # Standalone components
│
├── composables/           # Reusable logic (Vue composables)
│   ├── useRBAC.js         # Role-based access control
│   ├── useCurrency.js     # Currency formatting
│   ├── useDashboardWidgets.js
│   ├── useExport.js       # CSV / PDF export
│   ├── useNetworkStatus.js
│   ├── usePwaInstall.js
│   └── settings/          # Preferences management
│
├── config/                # App configuration
│   ├── devFlags.js        # Dev bypass & mock auth
│   ├── moduleCards.js     # Module registry & routing
│   ├── moduleIdMap.js     # Module ID mapping
│   ├── rbac.js            # RBAC definitions
│   ├── usePreferences.js  # User preferences
│   └── useActivityTracker.js
│
├── router/
│   └── index.js           # Route definitions
│
├── store/                 # State management
│   ├── index.js           # Vuex store (legacy)
│   ├── store.js           # Vuex modules
│   └── auth_store.js      # Auth state
│
├── utils/                 # Pure utilities
│   ├── formatting.js      # Number/date formatting
│   ├── reportExport.js    # PDF generation
│   ├── pwaManager.js      # PWA lifecycle
│   └── v-role.js          # Role-based directive
│
├── views/                 # Page components (route targets)
│   ├── Home.vue            # Landing / dashboard hub
│   ├── DashboardHome.vue   # Authenticated dashboard
│   ├── 403.vue             # Access denied
│   ├── auth/               # Login, reset password, logout
│   ├── AdminView/          # Super admin pages (16 views)
│   └── dashboardModules/   # Feature modules
│       ├── sales/          # CRM (13 pages), Invoicing
│       ├── strategic/      # Strategic management (12 subpages)
│       ├── accounting/     # Finance, expenses, loans
│       ├── settings/       # Profile, settings, sub-accounts
│       ├── aiagents/       # AI module, image capture
│       ├── microfinance/   # Lending admin fallback
│       └── mining/         # Mining module placeholder
│
├── workers/
│   └── dataProcessor.worker.js  # Web Worker
│
├── App.vue                # Root component
├── main.js                # App entry point
└── index.css              # Tailwind directives
```

---

## User Roles

| Role | Scope | Key Screens |
|---|---|---|
| **Relationship Manager** | Own customer portfolio | RM Dashboard, Customer Detail, NBA Actions |
| **Branch Manager** | All branch customers | Branch KPIs, Team Performance, Churn Forecast |
| **Data Scientist** | Model governance | Model Metrics, Feature Drift, Prediction Log |
| **Operations** | Pipeline health | ETL Run History, Data Quality, System Health |
| **Super Admin** | Platform management | Tenant management, Revenue, Reports, Settings |

---

## Route Map

### Public Routes (no auth)

| Path | Component | Description |
|---|---|---|
| `/` | `views/Home.vue` | Landing / dashboard hub |
| `/login` | `views/auth/login.vue` | LDAP authentication (FR-AUTH-01) |
| `/reset-password` | `views/auth/ResetPassword.vue` | Password reset |
| `/forgot-password` | `views/auth/ForgotPassword.vue` | Forgot password |
| `/logout` | `views/auth/Logout.vue` | Session termination |
| `/403` | `views/403.vue` | Access denied |

### Relationship Manager (`/dashboard/*`)

Layout: `components/layouts/DashboardLayout.vue`

| Path | Component | Req | Description |
|---|---|---|---|
| `/dashboard/home` | `views/DashboardHome.vue` | FR-DASH-01–04 | RM Dashboard: KPI cards, priority alerts, customer table, period selector |
| `/dashboard/customers/:id` | *(PoC — in scope)* | FR-CUST-01–06 | Customer Detail: profile card, AI Health Score gauge, state timeline, SHAP explanation, NBA recommendations, action history |
| `/dashboard/portfolio` | *(Post-PoC)* | FR-PORT-01–03 | Portfolio View: churn risk heatmap, state distribution chart, health score histogram |

### Branch Manager

| Path | Component | Req | Description |
|---|---|---|---|
| `/dashboard/branch` | *(Post-PoC)* | FR-BM-01–03 | Branch KPIs, team performance table, churn forecast chart |

### Data Scientist

| Path | Component | Req | Description |
|---|---|---|---|
| `/dashboard/models` | *(Post-PoC)* | FR-DS-01–04 | Model metrics (AUC-ROC, F1), champion vs challenger, feature drift monitor (PSI), prediction log browser |

### Operations

| Path | Component | Req | Description |
|---|---|---|---|
| `/dashboard/operations` | *(PoC — in scope)* | FR-OPS-01–03 | ETL Run History table, data quality dashboard, system health (PostgreSQL, Redis, API Gateway) |

### Super Admin

| Path | Component | Description |
|---|---|---|
| `/superadmin/dashboard` | `AdminView/AdminDashboard.vue` | Admin overview |
| `/superadmin/system-traces` | `AdminView/SystemTraces.vue` | System audit logs |
| `/superadmin/tenant-revenues` | `AdminView/Revenue.vue` | Tenant revenue |
| `/superadmin/tenant-reports` | `AdminView/Reports.vue` | Tenant reports |

All routes defined in `src/router/index.js`. PoC scope aligns with FRONTEND-REQUIREMENTS.md §9.

---

## Design System — ABSA Colors

All colors are defined as CSS custom properties in `src/assets/styles/absa-colors.css`:

| Token | Value | Usage |
|---|---|---|
| `--absa-maroon` | `#BE0F2C` | Primary brand, CTAs, active states |
| `--absa-maroon-deep` | `#8B0015` | Hover/pressed, gradients |
| `--absa-critical` | `#DC2626` | Churned status, health alerts |
| `--absa-warning` | `#F59E0B` | At Risk, warnings |
| `--absa-success` | `#16A34A` | Active, positive KPIs |
| `--absa-info` | `#2563EB` | Informational badges |

Key CSS utility files:
- **`absa-colors.css`** — design tokens (overrides `--brand-primary` etc.)
- **`patterns.css`** — background gradients, meshes, alert banners, ETL run states
- **`pages.css`** — shared components: metric cards, status pills, tables, timeline, action cards, search, pagination

---

## Getting Started

### Prerequisites
- Node.js 18+
- Internal network access to FastAPI Gateway (port 8080)

### Development

```bash
# Install dependencies
npm install

# Start dev server (hot reload)
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables

| Variable | Default | Purpose |
|---|---|---|
| `VITE_API_BASE_URL` | `http://localhost:8080` | Backend API URL |
| `VITE_DEV_BYPASS` | `false` | Skip auth + SW in dev |
| `VITE_GOOGLE_CLIENT_ID` | — | Google OAuth (optional) |

Set `VITE_DEV_BYPASS=true` in `.env.development` to use mock auth payloads during local development.

---

## PoC Scope (July 2026)

### Implemented
- RM Dashboard with KPI cards, alerts, customer table
- Customer Detail with AI Health Score, NBA recommendations, action logging
- State Timeline
- ETL Run History (Operations)
- CSV export
- LDAP authentication flow

### Deferred
- Branch Manager Dashboard
- Champion/Challenger model comparison
- Full SHAP waterfall explanations
- PDF export
- Mobile layout
- Real-time WebSocket notifications

---

## Deployment

On-premise Ubuntu + Nginx. Build output is static files in `dist/`.

```bash
npm run build
# Serve dist/ via Nginx with reverse proxy to FastAPI Gateway
```

See `Dockerfile` and `app.yaml` for containerised deployment options.

---

## Related Repositories

| Repository | Purpose |
|---|---|
| `absa-foundry-backend` | FastAPI Gateway + AI services |
| `absa-foundry-ml` | Model training & feature engineering |

---

*ABSA Intelligence Unit — Customer Lifecycle Prediction System · PoC Phase*