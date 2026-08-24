# Project Context — ABSA Foundry Frontend

## What We're Building

The frontend for ABSA Bank Zambia's AI-driven banking analytics platform. It provides Relationship Managers, Branch Managers, and Operations staff with:

1. **Intelligence Unit** — Customer Value (CLV), Lifecycle Prediction, Balance Forecasting, and Business Outcomes (ROI)
2. **Customer Lifecycle Dashboard** — Customer detail, state timeline, and NBA recommendations
3. **Portfolio Overview** — Branch-level analytics and Branch Manager dashboards
4. **ETL Pipeline Monitoring** — ETL Config Manager, Run history, data quality metrics
5. **AI Agent Interface** — Model performance, drift monitoring, champion/challenger
6. **Authentication & RBAC** — Role-based views (Admin, RM, Branch Manager, Data Scientist)

## Who Uses This

| Role | Primary Views |
|------|---------------|
| Relationship Managers | Customer detail, Counterfactual outcomes, AI prescriptive interventions |
| Branch Managers | Portfolio overview, branch performance |
| Data Scientists | Model management, ETL run history |
| Administrators | User management, system configuration |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Vue 3 (Composition API, `<script setup>`) |
| Build | Vite |
| State | Pinia |
| Routing | Vue Router 4 |
| Styling | Tailwind CSS |
| HTTP | Axios |
| Charts | Chart.js |
| PDF | jsPDF + html2pdf.js |
| Excel | ExcelJS |
| Auth | JWT (stored in localStorage) |

## Domain Terminology

| Term | Definition |
|------|------------|
| **Customer State** | Discrete label: Active, At Risk, Dormant, Churned |
| **Health Score** | Composite 0–100 score for a customer or portfolio |
| **NBA** | Next Best Action — recommended action for RM |
| **CLV** | Customer Lifetime Value — predicted total future revenue |
| **Churn Probability** | Likelihood a customer will leave within 90 days |
| **Feature Snapshot** | Computed ML features for a customer at a point in time |
| **Win-Back Pipeline** | Churned customers with a high probability of returning if targeted |
| **AUM** | Assets Under Management — the total balance held by a customer |
| **Monte Carlo Simulation** | Mathematical technique used to model probability of different AUM trajectories |

## Backend Integration

| Backend Service | Port | Frontend Usage |
|----------------|------|----------------|
| API Gateway | `:8080` | All API calls — 15 routes proxying to all services |
| Feature Engineering | `:8002` | Feature snapshots (`/features/*`) |
| Customer State (L1) | `:8003` | Portfolio, customer list, detail, timeline (via gateway) |
| Prediction (L2) | `:8004` | Churn probability, health score, Markov matrix (via gateway) |
| Decision Intelligence (L3) | `:8005` | NBA recommendations, routing (via gateway) |

**Remote devs:** Use Tailscale IP `100.82.12.85` instead of `localhost`. See `REMOTE-DEV-GUIDE.md`.

## Business Constraints

- **On-Premise:** Runs on bank's internal network, no internet access
- **Air-Gapped:** All assets bundled, no CDN dependencies
- **ABSA Branding:** Must follow ABSA colour guidelines (see `docs/Absa_colour_guideline (1).md`)
- **GDPR:** No customer PII in browser console logs or localStorage beyond JWT tokens

