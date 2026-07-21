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
│   ├── Admin/          # Super admin pages (16 views)
│   └── Modules/   # Feature modules
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

| Role | Module | Scope | Key Screens |
|---|---|---|---|
| **Relationship Manager** | Managers → RM | Own customer portfolio | RM Dashboard, Customer Detail, NBA Actions |
| **Branch Manager** | Managers → BM | All branch customers | Branch KPIs, Team Performance, Churn Forecast |
| **Data Scientist** | AI Agents → Models | Model governance | Model Metrics, Feature Drift, Prediction Log |
| **AI Operator** | AI Agents → Chatbots | Bot configuration & monitoring | Chat Analytics, KB Management, Escalation Rules |
| **Data Engineer** | Data Pipeline → ETL | Pipeline orchestration | ETL Run History, DAG Viewer, Backfill |
| **Data Quality Analyst** | Data Pipeline → Health | Data quality assurance | Data Health Scorecard, Rules Editor, Lineage |
| **Super Admin** | Starting Pages | Platform management | Sub-accounts, Roles & Permissions, Audit, Revenue, Reports |

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
| `/superadmin/dashboard` | `Admin/AdminDashboard.vue` | Admin overview |
| `/superadmin/system-traces` | `Admin/SystemTraces.vue` | System audit logs |
| `/superadmin/tenant-revenues` | `Admin/Revenue.vue` | Tenant revenue |
| `/superadmin/tenant-reports` | `Admin/Reports.vue` | Tenant reports |

All routes defined in `src/router/index.js`. PoC scope aligns with FRONTEND-REQUIREMENTS.md §9.

---

## Managers

The **Managers** module houses role-specific dashboards and tools for frontline banking staff, organised into sub-folders for **components** (UI widgets, charts, tables) and **functions** (composable logic, API bindings, state management).

### Branch Manager

| Path | Component | Description |
|---|---|---|
| `/dashboard/branch` | `views/Modules/strategic/` | Branch KPIs, team performance table, churn forecast chart |
| `/dashboard/branch/team` | *(Post-PoC)* | Individual RM performance drill-down |
| `/dashboard/branch/customers` | *(Post-PoC)* | Branch-level customer portfolio with risk segmentation |

**Key capabilities:**
- Aggregated branch health score across all relationship managers
- Team performance ranking (retention rate, NPS proxy, action completion)
- Churn forecast: 30/60/90-day projections per branch segment
- Drill-down from branch → RM → individual customer

### Relationship Manager

| Path | Component | Description |
|---|---|---|
| `/dashboard/home` | `views/DashboardHome.vue` | RM Dashboard: KPI cards, priority alerts, customer table, period selector |
| `/dashboard/customers/:id` | *(PoC — in scope)* | Customer Detail: profile card, AI Health Score gauge, state timeline, SHAP explanation, NBA recommendations, action history |
| `/dashboard/portfolio` | *(Post-PoC)* | Portfolio View: churn risk heatmap, state distribution chart, health score histogram |

**Key capabilities:**
- Personalised customer portfolio with AI-driven Next Best Action (NBA)
- Customer 360° profile: demographics, product holdings, transaction patterns
- Action logging & tracking against predicted churn events
- Health Score trend over time with SHAP value explainability

---

## AI Agents

The **AI Agents** module provides intelligent automation and conversational interfaces. Organised into sub-folders for **components** (chat widgets, model cards, prompt builders) and **functions** (LLM orchestration, RAG pipelines, model registry).

### Chatbots

| Path | Component | Description |
|---|---|---|
| `/dashboard/aiagents/chat` | `views/Modules/aiagents/` | Conversational AI interface for RM assistance |
| `/dashboard/aiagents/chat/history` | *(Post-PoC)* | Chat history & transcript browser |
| `/dashboard/aiagents/chat/settings` | *(Post-PoC)* | Bot personality, escalation rules, knowledge base |

**Key capabilities:**
- Natural-language querying of customer portfolios ("Show me high-risk customers")
- Guided NBA workflow: bot suggests retention actions based on churn risk
- Context-aware responses grounded in customer data (RAG over CRM + transactions)
- Escalation hand-off to human RM when confidence is low

### AI Models

| Path | Component | Description |
|---|---|---|
| `/dashboard/models` | `views/Modules/aiagents/` | Model metrics (AUC-ROC, F1), champion vs challenger, feature drift monitor (PSI), prediction log browser |
| `/dashboard/models/registry` | *(Post-PoC)* | Model version registry & approval workflow |
| `/dashboard/models/explain` | *(Post-PoC)* | Global & local SHAP explainability dashboard |

**Key capabilities:**
- Champion/challenger model comparison with statistical significance tests
- Feature drift monitoring (Population Stability Index) with alert thresholds
- Prediction log browser: inspect every inference with input features & scores
- Model governance: versioning, staging (dev → uat → prod), rollback

---

## Data Pipeline

The **Data Pipeline** module manages data ingestion, transformation, and quality assurance. Organised into sub-folders for **components** (run history tables, DAG visualisers, quality scorecards) and **functions** (ETL orchestration, data quality rules engine, lineage tracking).

### ETL Engine

| Path | Component | Description |
|---|---|---|
| `/dashboard/operations` | `views/Modules/` | ETL Run History table, pipeline status, DAG viewer |
| `/dashboard/operations/runs/:id` | *(PoC — in scope)* | Run detail: duration, rows processed, errors, log tail |
| `/dashboard/operations/schedule` | *(Post-PoC)* | Cron schedule editor, backfill trigger, dependency graph |

**Key capabilities:**
- Real-time pipeline status: ingestion → validation → feature engineering → prediction
- Run history with duration trends, failure rate, and SLA compliance
- DAG visualisation of pipeline stages with upstream/downstream dependencies
- Manual backfill & re-run trigger with parameter overrides

### Data Health Engine

| Path | Component | Description |
|---|---|---|
| `/dashboard/operations/health` | *(PoC — in scope)* | Data quality dashboard: completeness, freshness, accuracy |
| `/dashboard/operations/health/rules` | *(Post-PoC)* | Data quality rule editor (Great Expectations-style) |
| `/dashboard/operations/health/lineage` | *(Post-PoC)* | Column-level lineage from source → feature → prediction |

**Key capabilities:**
- Automated data quality checks: null %, cardinality drift, outlier detection
- Freshness monitoring: SLA timers per data source with breach alerts
- Data quality scorecard per pipeline stage (completeness, uniqueness, validity)
- Anomaly detection on row counts, schema changes, and value distributions

---

## Starting Pages (Shared Attributes)

These are platform-wide screens that span across roles and modules, providing common administrative and navigational capabilities.

### Sub-Account Management

| Path | Component | Description |
|---|---|---|
| `/dashboard/settings/subaccounts` | `views/Modules/settings/` | Create & manage sub-accounts (branches) |
| `/dashboard/settings/subaccounts/:id/users` | *(Post-PoC)* | Assign users to branches with role bindings |

**Shared attributes:**
- **Branch creation:** Define new branches with metadata (name, code, region, status)
- **User assignment:** Add users to branches and map them to roles (RM, BM, Ops, etc.)
- **Role binding:** Each user-branch pair carries a specific role that gates feature access
- **Bulk operations:** Import/export user-branch-role mappings via CSV

### Settings — Role & Permissions

| Path | Component | Description |
|---|---|---|
| `/dashboard/settings/roles` | `views/Modules/settings/` | Define roles with granular permissions |
| `/dashboard/settings/roles/:id` | *(Post-PoC)* | Permission matrix editor per role |

**Shared attributes:**
- **Role definition:** Create custom roles with named permission sets
- **Permission matrix:** Toggle access per module, action (view/edit/delete/export), and data scope
- **Branch visibility:** Per-role control over which branches a role can see/operate on
- **Audit trail:** Every permission change is logged with timestamp and actor identity

### Main Dashboard

| Path | Component | Description |
|---|---|---|
| `/dashboard/home` | `views/DashboardHome.vue` | Role-aware landing with filtered KPIs and navigation |

**Shared attributes:**
- **Permission-driven filtering:** Widgets and data scoped to the user's role and assigned branches
- **Role-based views:** RM sees own portfolio; BM sees all branch RMs; Admin sees cross-branch aggregates
- **Branch selector:** Multi-branch users can toggle between assigned branches or view "All"
- **User context:** Avatar, role badge, branch indicator always visible in the shell

### Config Files — Shared Audit & Activity

| File / Module | Location | Purpose |
|---|---|---|
| `useActivityTracker.js` | `src/config/` | Tracks user page views, clicks, and session duration |
| `audit_log.js` | `src/api_services/` | Frontend audit trail — logs sensitive actions to backend |
| `requestLogger.js` | `src/utils/` | HTTP request/response interceptor for diagnostics |
| `useAudit.js` | `src/config/` | Composable for triggering audit events (create, update, delete, export) |

**Shared attributes:**
- **User activity:** Page visits, feature usage, session duration — all tracked client-side
- **Audit trail:** Every CUD (create/update/delete) action and export is logged with actor, timestamp, resource, and outcome
- **Config sharing:** Activity tracker and audit configuration is shared across all modules via the `config/` directory
- **Backend sync:** Audit events are batched and flushed to the FastAPI Gateway for persistent storage

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
- ETL Run History (Operations → Data Pipeline)
- Sub-account management (branch CRUD, user assignment)
- Role & permissions configuration
- CSV export
- LDAP authentication flow

### In Progress
- Branch Manager Dashboard (Managers module)
- Data Health Engine (Data Pipeline → Health)
- AI Models registry & drift monitoring (AI Agents → Models)
- Chatbot interface (AI Agents → Chatbots)
- Permission-driven main dashboard filtering

### Deferred
- Champion/Challenger model comparison with statistical tests
- Full SHAP waterfall explanations
- Column-level data lineage
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
