# Remote Dev Connection Guide — Frontend

**Backend Host:** `100.82.12.85` (Tailscale)  
**Prerequisite:** All devs must be on the Uniplexity Tailscale network.

---

## Quick Test

```bash
curl http://100.82.12.85:8080/health
```

Should return healthy.

---

## Frontend Config

Set the API base URL to the Tailscale host:

```bash
# .env
VITE_API_BASE_URL=http://100.82.12.85:8080
```

Or update `src/services/api.js` directly:

```js
const RAW_API_URL = 'http://100.82.12.85:8080'
```

---

## API Endpoints (via Gateway :8080)

| Endpoint | Response |
|----------|----------|
| `GET /api/v1/customers/portfolio?as_of_date=2026-07-27` | `{total_customers, by_state: {DORMANT: {count,pct}, ...}}` |
| `GET /api/v1/customers?as_of_date=2026-07-27&limit=100` | `[{customer_id, state, health_score, ...}]` |
| `GET /api/v1/customers/{id}?as_of_date=2026-07-27` | Single customer snapshot |
| `GET /api/v1/customers/{id}/timeline` | `{timeline: [...], transitions: [...]}` |
| `GET /api/v1/predictions/{id}/churn?as_of_date=2026-07-27` | `{churn_probability: 0.38, model_version}` |
| `GET /api/v1/predictions/{id}/health?as_of_date=2026-07-27` | `{health_score: 41.2, component_scores}` |
| `GET /api/v1/predictions/markov-matrix?as_of_date=2026-07-27` | `{states, matrix: [[...]], steady_state}` |
| `GET /api/v1/models` | `{models: [{model_id, metrics: {auc, brier, log_loss}}]}` |
| `GET /api/etl/runs?limit=5` | `{kpis, status, quality_trend, runs}` |

## Which Store Calls What

| Pinia Store | API Endpoint | Used By |
|-------------|-------------|---------|
| `customerStore` | `/customers/portfolio` + `/customers` + `/{id}` + `/{id}/timeline` | DashboardHome, Portfolio, CustomerDetail |
| `predictionStore` | `/predictions/{id}/churn` + `/health` + `/markov-matrix` | CustomerDetail |
| `modelsStore` | `/models` | Models |
| `etlStore` | `/etl/runs` | EtlPipeline, ETLRunHistory |

## Backend Service Map

| Port | Service | Direct URL |
|------|---------|------------|
| 8080 | API Gateway | `http://100.82.12.85:8080` |
| 8002 | Feature Engineering | `http://100.82.12.85:8002` |
| 8003 | Customer State (L1) | `http://100.82.12.85:8003` |
| 8004 | Prediction (L2) | `http://100.82.12.85:8004` |
| 8005 | Decision Intelligence (L3) | `http://100.82.12.85:8005` |

## Docs

- Frontend requirements: `docs/FRONTEND-REQUIREMENTS-V3.md`
- Full API contract: `docs/FRONTEND-REQUIREMENTS-V3.md` §2
- Backend knowledge base: `absa-foundry-backend/customer-lifecycle-ai/.ai/ABSA-KNOWLEDGE-BASE.md`
