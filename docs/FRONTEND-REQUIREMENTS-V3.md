# ABSA Customer Lifecycle Platform — Frontend Functional Requirements v3.0

**Date:** 2026-08-07  
**Status:** Backend-Grounded — All requirements derived from live API responses  
**Supersedes:** FRONTEND-REQUIREMENTS-V2.md (PoC era)  
**Backend Reference:** Decision Intelligence Platform v3.0 · 5 services on ports 8002-8005, 8080

---

## 1. Architecture Context

The frontend consumes a unified API Gateway (`:8080`) that proxies to 4 backend microservices:

```
Browser (Vue 3) → Axios → Gateway :8080 → State :8003
                                         → Prediction :8004
                                         → ETL Audit (PostgreSQL)
                                         → Feature :8002
```

All requests require `?as_of_date=2026-07-27` (default snapshot date).

---

## 2. API Contract — Verified Endpoints

### 2.1 GET /api/v1/customers/portfolio

**Purpose:** Aggregate portfolio KPIs for dashboard cards.

**Request:** `GET /api/v1/customers/portfolio?as_of_date=2026-07-27`

**Response:**
```json
{
  "as_of_date": "2026-07-27",
  "branch_code": null,
  "total_customers": 4998,
  "by_state": {
    "DORMANT":  { "count": 2417, "pct": 48.4 },
    "AT_RISK":  { "count": 2291, "pct": 45.8 },
    "CHURNED":  { "count": 290,  "pct": 5.8 }
  }
}
```

**Frontend Usage:** DashboardHome KPI cards, PortfolioOverview KPI cards. Derive `actionsDue = atRisk.count + dormant.count`.

---

### 2.2 GET /api/v1/customers

**Purpose:** Paginated list of all customer state snapshots.

**Request:** `GET /api/v1/customers?as_of_date=2026-07-27&limit=100&offset=0`

**Response (array):**
```json
[
  {
    "customer_id": "CUST00001",
    "as_of_date": "2026-07-27",
    "state": "DORMANT",
    "previous_state": null,
    "is_transition": false,
    "classification_rules": { "risk_rules": ["inactive_90d"] },
    "health_score": 41.2,
    "component_scores": {
      "behaviour_sub": 0.0,
      "churn_risk_sub": 61.5,
      "clv_percentile_sub": 55.2
    },
    "computed_at": "2026-08-07T01:06:25.324321+02:00"
  }
]
```

**Frontend Usage:** DashboardHome ledger table (500 rows). Map via `_mapCustomer()`:
- `customerId` ← `customer_id`
- `fullName` ← `"Customer " + id.replace('CUST','')`
- `state` ← `state`
- `healthScore` ← `health_score`
- `churnProbability` ← `null` (not in this endpoint — see §2.5)
- `clv` ← `null` (not in this endpoint)

---

### 2.3 GET /api/v1/customers/{customer_id}

**Purpose:** Single customer state snapshot for detail page.

**Request:** `GET /api/v1/customers/CUST00001?as_of_date=2026-07-27`

**Response:**
```json
{
  "customer_id": "CUST00001",
  "as_of_date": "2026-07-27",
  "state": "DORMANT",
  "previous_state": null,
  "is_transition": false,
  "classification_rules": { "risk_rules": ["inactive_90d"] },
  "health_score": 41.2,
  "component_scores": {
    "behaviour_sub": 0.0,
    "churn_risk_sub": 61.5,
    "clv_percentile_sub": 55.2
  },
  "computed_at": "2026-08-07T01:06:25.324321+02:00"
}
```

**Frontend Usage:** CustomerDetail.vue profile card — `state`, `health_score`, `classification_rules`. Fields NOT provided: `fullName`, `segment`, `accountNumber`, `idNumber`, `tenureYears`, `assignedRM`. These show `...` placeholder.

---

### 2.4 GET /api/v1/customers/{customer_id}/timeline

**Purpose:** Customer state transition history.

**Request:** `GET /api/v1/customers/CUST00001/timeline`

**Response:**
```json
{
  "customer_id": "CUST00001",
  "timeline": [
    { "as_of_date": "2026-07-27", "state": "DORMANT" },
    { "as_of_date": "2026-07-20", "state": "ACTIVE" }
  ],
  "transitions": [
    {
      "transition_date": "2026-07-27",
      "from_state": "ACTIVE",
      "to_state": "DORMANT",
      "trigger_reason": "inactive_90d",
      "days_in_previous_state": 120
    }
  ]
}
```

**Frontend Usage:** StateTimeline component — `timeline` array for timeline visualization, `transitions` array for transition detail cards.

---

### 2.5 GET /api/v1/predictions/{customer_id}/churn

**Purpose:** Per-customer churn probability.

**Request:** `GET /api/v1/predictions/CUST00001/churn?as_of_date=2026-07-27`

**Response:**
```json
{
  "customer_id": "CUST00001",
  "as_of_date": "2026-07-27",
  "churn_probability": 0.3847,
  "model_version": "churn_v1",
  "computed_at": "2026-08-07T08:35:55.759760Z"
}
```

**Frontend Usage:** ChurnProbabilityBar component — `churn_probability` (0-1 float). Display as percentage: `Math.round(churn_probability * 100) + '%'`.

---

### 2.6 GET /api/v1/predictions/{customer_id}/health

**Purpose:** Per-customer health score breakdown.

**Request:** `GET /api/v1/predictions/CUST00001/health?as_of_date=2026-07-27`

**Response:**
```json
{
  "customer_id": "CUST00001",
  "as_of_date": "2026-07-27",
  "health_score": 41.2,
  "component_scores": {
    "churn_risk_sub": 61.5,
    "clv_percentile_sub": 55.2,
    "behaviour_sub": 0.0
  },
  "model_versions": {
    "churn": "churn_v1",
    "clv": "percentile_v1"
  },
  "computed_at": "2026-08-07T08:35:57.796221Z"
}
```

**Frontend Usage:** HealthScoreGauge component — `health_score` (0-100). Component breakdown shows sub-scores with labels.

---

### 2.7 GET /api/v1/predictions/markov-matrix

**Purpose:** 4×4 state transition probability matrix (portfolio-level).

**Request:** `GET /api/v1/predictions/markov-matrix?as_of_date=2026-07-27`

**Response:**
```json
{
  "as_of_date": "2026-07-27",
  "window_days": 180,
  "states": ["ACTIVE", "AT_RISK", "DORMANT", "CHURNED"],
  "matrix": [
    [0.0, 1.0, 0.0, 0.0],
    [0.0, 0.0, 0.8751, 0.1249],
    [0.0, 0.0, 0.0, 1.0],
    [0.0, 0.0, 0.0, 1.0]
  ],
  "steady_state": {
    "ACTIVE": 0.0,
    "AT_RISK": 0.0,
    "DORMANT": 0.0,
    "CHURNED": 1.0
  },
  "warnings": [],
  "total_transitions_observed": 4
}
```

**Frontend Usage:** MarkovMatrix component — rows = from_state, columns = to_state. Cell value = probability of transitioning from row state to column state.

---

### 2.8 GET /api/v1/models

**Purpose:** Registered ML model registry with champion metrics.

**Request:** `GET /api/v1/models`

**Response:**
```json
{
  "models": [
    {
      "model_id": "churn_v1",
      "type": "churn",
      "status": "champion",
      "metrics": {
        "auc": 0.7672,
        "brier": 0.1892,
        "ece": 0.2854,
        "log_loss": 0.5663
      },
      "method": null
    },
    {
      "model_id": "clv_percentile_v1",
      "type": "clv",
      "status": "champion",
      "metrics": null,
      "method": "percentile_rank"
    }
  ]
}
```

**Frontend Usage:** Models.vue — KPI cards show:
- AUC-ROC: `(metrics.auc * 100).toFixed(1) + '%'` → 76.7%
- Log Loss: `metrics.log_loss.toFixed(4)` → 0.5663
- Brier Score: `metrics.brier.toFixed(4)` → 0.1892
- F1 / Precision / Recall: `--` (not in backend metrics yet)

---

### 2.9 GET /api/etl/runs

**Purpose:** ETL pipeline dashboard — KPIs, status, quality trend, paginated run history.

**Request:** `GET /api/etl/runs?page=1&limit=25&status=COMPLETED`

**Response:**
```json
{
  "kpis": {
    "todays_runs": 14,
    "successful_runs": 14,
    "failed_runs": 0,
    "running_runs": 0,
    "avg_quality": 64.5,
    "avg_duration": "00m 26s",
    "success_rate": 100.0
  },
  "status": {
    "current_status": "Operational",
    "current_status_since": "2026-08-07T09:06:11.367492+00:00",
    "current_pipeline": "etl_full_pipeline",
    "last_successful_run": "c3dc3ae7-...",
    "last_successful_duration": "00m 16s",
    "last_successful_rows": "15K",
    "last_successful_quality": 100.0,
    "latest_quality": 100.0,
    "latest_quality_rows": "15K",
    "sla_threshold": 95.0,
    "last_failure_run": null,
    "last_failure_detail": null
  },
  "quality_trend": [
    { "label": "09:06", "value": 100.0, "rows": "15K", "rejected": "0", "failed": false },
    { "label": "22:58", "value": 100.0, "rows": "15K", "rejected": "0", "failed": false }
  ],
  "runs": [
    {
      "id": 34,
      "runId": "c3dc3ae7-...",
      "batchId": "484c1e5f-...",
      "duration": "00m 16s",
      "rowsReceived": "15K",
      "rowsValid": "15K",
      "rowsLoaded": "15K",
      "rowsRejected": 0,
      "qualityScore": 100.0,
      "qualityClass": "good",
      "status": "COMPLETED",
      "statusClass": "completed"
    }
  ],
  "total_runs": 14,
  "page": 1,
  "limit": 25
}
```

**Frontend Usage:** EtlPipeline.vue + ETLRunHistory.vue
- Health cards: `status.current_status`, `kpis.avg_duration`
- Quality trend SVG: `quality_trend[].value` mapped to line chart
- Execution table: `runs[]` with camelCase fields
- Bottom stats: `total_runs`, `kpis.failed_runs`, `kpis.avg_quality`

---

## 3. Page-by-Page Requirements

### PAGE 1: Dashboard Home — `/dashboard/home`

**Store:** `useCustomerStore`  
**APIs:** `GET /portfolio` + `GET /customers?limit=500` (parallel via `Promise.all`)  
**`as_of_date`:** `2026-07-27`

#### FR-DASH-01: KPI Summary Cards
| Card | Binding | Source |
|------|---------|--------|
| Total Customers | `{{ portfolio.total.toLocaleString() }}` | `portfolio.total_customers` |
| At Risk | `{{ portfolio.atRisk }} \| {{ portfolio.atRiskPct }}%` | `by_state.AT_RISK.count / .pct` |
| Dormant | `{{ portfolio.dormant }} \| {{ portfolio.dormantPct }}%` | `by_state.DORMANT.count / .pct` |
| Actions Due | `{{ portfolio.actionsDue }}` | `atRisk + dormant` |

#### FR-DASH-02: KPI Click Filtering
- Click "At Risk" → `setFilter('state', 'AT_RISK')` — filters table
- Click "Dormant" → `setFilter('state', 'DORMANT')`
- Click "Total" → `clearFilters()`

#### FR-DASH-03: Predictive Lifecycle Ledger
| Column | Binding | Source |
|--------|---------|--------|
| Name | `row.fullName` | `"Customer XXXXX"` (synthetic) |
| Customer ID | `row.customerId` | `customer_id` |
| State | `<StateBadge :state="row.state" />` | `state` |
| Health Score | `row.healthScore \|\| '--'` | `health_score` (0-100) |
| Churn Probability | `row.churnProbability ? % : '--'` | Null — needs enrichment batch |
| CLV | `row.clv ? 'ZMW ' + fmt : '--'` | Null — needs enrichment batch |
| Action | Derived | `state === 'AT_RISK' ? 'REVIEW' : state === 'CHURNED' ? 'RETENTION' : '--'` |

#### FR-DASH-04: Row Click → Customer Detail
- Click any row → `router.push('/dashboard/customer/' + row.customerId)`

#### FR-DASH-05: Loading State
- `<LoadingSkeleton type="stats" />` while `customerStore.loading === true`
- `<LoadingSkeleton type="table" :count="4" />` for table skeleton

#### FR-DASH-06: Error State
- Red banner: "Could not load portfolio data" + [Retry] button → `customerStore.fetchPortfolio()`

---

### PAGE 2: Customer Detail — `/dashboard/customer/:id`

**Stores:** `useCustomerStore` + `usePredictionStore`  
**APIs (on mount):** `GET /customers/{id}`, `GET /customers/{id}/timeline`, `GET /predictions/{id}/churn`, `GET /predictions/{id}/health`, `GET /predictions/markov-matrix`

#### FR-CUST-01: Profile Card
| Field | Binding | Source |
|-------|---------|--------|
| Customer Name | `customer.fullName \|\| 'Loading...'` | Synthetic "Customer XXXXX" |
| Customer ID | `customer.customerId` | `customer_id` |
| Segment | `customer.segment \|\| '...'` | Not in backend — placeholder |
| State Badge | `<StateBadge :state="customer.state" />` | `state` |
| Account Number | `customer.accountNumber \|\| '...'` | Not in backend |
| Branch | `customer.branch \|\| '...'` | Not in backend |
| ID Number | `customer.idNumber \|\| '...'` | Not in backend |
| Tenure | `customer.tenureYears + ' Years' \|\| '...'` | Not in backend |
| Assigned RM | `customer.assignedRM \|\| '...'` | Not in backend |

#### FR-CUST-02: Health Score Gauge
```html
<HealthScoreGauge
  :score="customer.healthScore"
  :trend="healthTrend"
  :previousScore="previousHealthScore"
/>
```
- `healthScore` from customer detail or prediction health endpoint
- Trend: derived from `component_scores` or timeline comparison

#### FR-CUST-03: Churn Probability Bar
```html
<ChurnProbabilityBar
  :probability="churnProbability"
  :showLabel="true"
/>
```
- `churnProbability` from `predictionStore.getChurnProbability(customerId)`
- Display as percentage with color coding: green <30%, amber 30-60%, red >60%

#### FR-CUST-04: State Timeline
```html
<StateTimeline :transitions="timeline" />
```
- `timeline` from `customerStore.timeline` (array of `{as_of_date, state}`)
- Transitions from `customerStore.timeline.transitions`

#### FR-CUST-05: Markov Transition Matrix
```html
<details>
  <summary>Advanced: State Transition Probabilities</summary>
  <MarkovMatrix :matrix="markovMatrix" />
</details>
```
- `markovMatrix` from `predictionStore.markovMatrix`
- 4×4 grid: rows=from, cols=to, cells=probability

#### FR-CUST-06: Loading State
- Profile card: grey skeleton blocks
- Health gauge: spinning ring
- Timeline: 4 grey dots
- Markov: hidden until data exists

#### FR-CUST-07: Empty/Error States
- No predictions: amber banner "Predictions not yet computed..."
- Error: red banner "Could not load customer data" + [Retry]
- 404: "Customer not found" with back navigation

---

### PAGE 3: Portfolio Overview — `/dashboard/portfolio`

**Store:** `useCustomerStore`  
**API:** `GET /portfolio?as_of_date=2026-07-27`

#### FR-PORT-01: KPI Cards
Same as DashboardHome but add CHURNED card:
| Card | Source |
|------|--------|
| Total Customers | `by_state` sum |
| Active | `by_state.ACTIVE.count` |
| At Risk | `by_state.AT_RISK.count` |
| Dormant | `by_state.DORMANT.count` |
| Churned | `by_state.CHURNED.count` |

#### FR-PORT-02: State Distribution Donut Chart
- Data: `by_state` counts → `{ACTIVE: N, AT_RISK: N, DORMANT: N, CHURNED: N}`
- Colors: Green, Amber, Grey, Red
- Library: `vue-chartjs` Doughnut

#### FR-PORT-03: Loading/Error
- Same pattern as DashboardHome

---

### PAGE 4: Model Performance — `/dashboard/models`

**Store:** `useModelsStore`  
**API:** `GET /api/v1/models`

#### FR-MOD-01: KPI Metric Cards
| Card | Value | Source |
|------|-------|--------|
| AUC-ROC | `76.7%` | `churn_v1.metrics.auc * 100` |
| Log Loss | `0.5663` | `churn_v1.metrics.log_loss` |
| Brier Score | `0.1892` | `churn_v1.metrics.brier` |
| F1 Score | `--` | Not in backend metrics |
| Precision / Recall | `-- / --` | Not in backend metrics |

#### FR-MOD-02: Model Registry Count
- Subtitle: `{{ modelCount }} models deployed · champion: churn_v1`

#### FR-MOD-03: Performance Over Time Chart
- SVG placeholder (no time-series data from backend yet)

#### FR-MOD-04: Loading/Error
- `<LoadingSkeleton type="stats" />` + `<LoadingSkeleton type="table" />`

---

### PAGE 5: ETL Pipeline Health — `/dashboard/etl-pipeline`

**Store:** `useETLStore`  
**API:** `GET /api/etl/runs`

#### FR-ETL-01: System Health Cards
| Card | Value | Source |
|------|-------|--------|
| PostgreSQL Cluster | Operational | `status.current_status` |
| Redis Cache | Operational | `status.current_status` |
| API Gateway | Operational | `status.current_status` |
| Avg Duration | `00m 26s` | `kpis.avg_duration` |
| Uptime Since | `8/7/2026` | `status.current_status_since` |

#### FR-ETL-02: Quality Score Trend
- SVG line chart from `quality_trend[].value` (0-100)
- Threshold line at 95%
- X-axis: `quality_trend[].label` (time)
- Data Integrity Score: `kpis.avg_quality`%

#### FR-ETL-03: Execution History Table
| Column | Source |
|--------|--------|
| Run ID | `runs[].runId` (truncated to 12 chars) |
| Batch ID | `runs[].batchId` (truncated to 12 chars) |
| Duration | `runs[].duration` |
| Rows Recv/Valid/Loaded/Rejected | `runs[].rowsReceived / rowsValid / rowsLoaded / rowsRejected` |
| Quality Score | `runs[].qualityScore`% (bar + color) |
| Status | `runs[].status` badge (COMPLETED=green, FAILED=red) |

#### FR-ETL-04: Bottom Stats
| Stat | Source |
|------|--------|
| Total Runs | `total_runs` |
| Average Quality | `kpis.avg_quality`% |
| Failed Retries | `kpis.failed_runs` |
| Avg Query Latency | `kpis.avg_duration` |

---

### PAGE 6: ETL Run History — `/dashboard/etl-run-history`

**Store:** `useETLStore`  
**API:** `GET /api/etl/runs?page=N&limit=25&status=FILTER`

#### FR-ETLHIST-01: Paginated Audit Table
- Same columns as Pipeline page execution table
- Pagination: prev/next, page numbers, total runs
- Status filter: All / COMPLETED / FAILED dropdown

#### FR-ETLHIST-02: Status Badges
- COMPLETED → green badge with ✓
- FAILED → red badge with ✗
- RUNNING → amber badge with spinner

---

## 4. Shared Component Requirements

### Loading States
All data-driven pages MUST render `<LoadingSkeleton>` variants while `store.loading === true`:
- `type="stats"` — 4 skeleton KPI cards
- `type="table" :count="N"` — N skeleton table rows
- `type="card"` — single skeleton card

### Error States
All data-driven pages MUST render error banner when `store.error !== null`:
- Red background, error message text
- [Retry] button calling the appropriate `store.fetchXxx()` method

### Empty States
When API returns success but no data:
- Portfolio: "No portfolio data available. Run batch computation."
- Customer: 404 handling with back navigation
- Models: "No models registered in the registry."
- ETL: "No pipeline runs recorded. Trigger a pipeline execution."

---

## 5. Pinia Store Specifications

### customerStore
```
State: customers[], selectedCustomer, filters{}, pagination{}, loading, error, timeline[]
Computed: portfolio (from by_state), filteredCustomers (client-side filter)
Actions: fetchPortfolio(params), fetchCustomerDetail(id), fetchCustomerTimeline(id)
Helpers: _mapCustomer(raw) → { customerId, fullName, state, healthScore, ... }
```

### predictionStore
```
State: predictions{}, healthScores{}, markovMatrix, loading, error
Actions: fetchChurnProbability(id), fetchHealthScore(id), fetchMarkovMatrix()
Getters: getChurnProbability(id), getHealthScore(id)
```

### modelsStore
```
State: models[], loading, error
Computed: championChurn, championCLV, modelCount
Actions: fetchModels()
```

### etlStore
```
State: runs[], totalRuns, page, limit, statusFilter, kpis, statusPanel, qualityTrend, loading, error
Actions: loadDashboard(params), setPage(n), setStatusFilter(s), refresh()
```

---

## 6. Current Gaps & Phase 2 Priorities

| Priority | Feature | Requirement |
|----------|---------|-------------|
| 🔴 P0 | Branch Manager Dashboard | Wire to portfolio aggregation + branch filters |
| 🔴 P0 | Prediction Enrichment Batch | Populate churn % + CLV in customer list for ledger table |
| 🟡 P1 | Customer Profile Enrichment | Add fullName, segment, accountNumber, tenure to state service |
| 🟡 P1 | Model Metrics Expansion | Add precision, recall, F1 to prediction model registry |
| 🟡 P1 | Performance Over Time | Time-series data for model metrics trend chart |
| 🟢 P2 | Decision Intelligence Frontend | NBA recommendations, routing, approval workflow UI |
| 🟢 P2 | Churn Intelligence Frontend | Root cause drivers, segment analysis dashboard |
| 🟢 P2 | Forecast Dashboard | Churn forecast, revenue at risk visualizations |
| 🟢 P3 | LLM Explanations UI | Natural language summaries, RM talking points |
| 🟢 P3 | Real-time WebSocket | Live alerts via Redis pub/sub |

---

## 7. Appendix: Quick Reference

### Backend Service Map
| Port | Service | Key Data |
|------|---------|----------|
| 8080 | Gateway | 15 routes, proxies to all services |
| 8002 | Feature Engineering | 22 features per customer |
| 8003 | Customer State (L1) | State classification, Markov matrix |
| 8004 | Prediction (L2) | Churn (AUC 0.77), health scores |
| 8005 | Decision Intelligence (L3) | 9 engines, NBA actions |

### Default Parameters
- `as_of_date`: `2026-07-27`
- `limit`: `500` (customer list), `25` (ETL runs)
- Axios timeout: `5000ms`
- API base URL: `http://localhost:8080`
