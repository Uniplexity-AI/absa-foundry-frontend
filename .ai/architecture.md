# Architecture — ABSA Foundry Frontend

## Component Tree

```
App.vue
├── AuthLayout
│   ├── LoginView
│   └── ForgotPasswordView
│
└── DashboardLayout
    ├── Sidebar (navigation)
    ├── TopBar (user menu, notifications)
    └── <router-view>
        ├── Dashboard (home)
        ├── PortfolioOverview
        ├── CustomerDetail
        ├── Modules/
        │   ├── datapipeline/
        │   │   └── ETLRunHistory
        │   ├── aiagents/
        │   │   └── Models
        │   ├── managers/
        │   │   └── BranchManagerDashboard
        │   └── ... (to be expanded)
        └── Admin/
            ├── UserManagement
            └── SystemConfig
```

## Routing Structure

```
/                          → Dashboard home
/login                     → LoginView
/portfolio                 → PortfolioOverview
/customer/:id              → CustomerDetail
/etl/history               → ETLRunHistory
/models                    → Models (AI agents)
/branch-manager            → BranchManagerDashboard
/admin/users               → UserManagement
/admin/config              → SystemConfig
```

## Data Flow

```
┌─────────────────────────────────────────────────────┐
│                    Vue Component                     │
│  Template ← ref() ← computed() ← store (Pinia)      │
└───────────────────────┬─────────────────────────────┘
                        │ calls
┌───────────────────────▼─────────────────────────────┐
│              src/services/api.js                     │
│  Axios instance + interceptors (JWT, refresh, 401)   │
└───────────────────────┬─────────────────────────────┘
                        │ HTTP
┌───────────────────────▼─────────────────────────────┐
│           API Gateway (:8080)                        │
│  Auth → RBAC → Rate Limit → Route → Backend Service  │
└─────────────────────────────────────────────────────┘
```

## State Management (Pinia)

| Store | Purpose | Key State |
|-------|---------|-----------|
| `useAuthStore` | Authentication | `user`, `token`, `refreshToken`, `isAuthenticated` |
| `usePortfolioStore` | Portfolio overview | `customers[]`, `metrics`, `filters` |
| `useCustomerStore` | Single customer | `customer`, `features`, `predictions`, `nba` |
| `useETLStore` | ETL monitoring | `runs[]`, `quality`, `audit` |

## API Integration Pattern

```javascript
// src/services/api.js — all backend calls go through here
import axios from 'axios'

// JWT interceptor attached automatically
// 401 → auto-refresh → retry
// Refresh failure → redirect /login

export async function login(username, password) { ... }
export async function logout() { ... }
export async function getFeatures(customerId) { ... }
export async function getPortfolio(filters) { ... }
```
