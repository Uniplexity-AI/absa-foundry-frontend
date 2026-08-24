# ABSA Customer Lifecycle Platform — Frontend Functional Requirements v4.0

**Date:** 2026-08-24  
**Status:** Expanded Layer — Incorporates newly-designed Strategic & Value Intelligence Dashboards  
**Supersedes:** FRONTEND-REQUIREMENTS-V3.md (Backend-Grounded era)  
**Backend Reference:** Decision Intelligence Platform v4.0 · 5 services on ports 8002-8005, 8080

---

## 1. Architecture Context

The frontend consumes a unified API Gateway (`:8080`) that proxies to 5 backend microservices:

```
Browser (Vue 3) → Axios → Gateway :8080 → State :8003
                                         → Prediction :8004
                                         → Decision Intelligence (L3) :8005
                                         → ETL Audit (PostgreSQL)
                                         → Feature :8002
```

All requests require `?as_of_date=2026-07-27` (default snapshot date).

---

## 2. API Contract — Verified & New Endpoints

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

### 2.10 GET /api/v1/customers/clv-summary [NEW]

**Purpose:** Retrieve aggregate Customer Lifetime Value (CLV) KPIs, value segmentation bands, and top high-value at-risk customers with ML explainability drivers.

**Request:** `GET /api/v1/customers/clv-summary?as_of_date=2026-07-27`

**Response:**
```json
{
  "summary": {
    "total_clv": 8420000000,
    "avg_clv": 41280,
    "high_value_count": 3840,
    "clv_at_risk": 312000000,
    "value_protected_mtd": 48600000,
    "churn_adjusted_clv": 7980000000
  },
  "bands": [
    { "band": "Platinum", "label": "Platinum", "threshold": "CLV > K500K", "count": 820, "avg_clv": 1240000, "avg_churn_prob": 0.12, "total_aum": 1016800000, "pct": 0.4 },
    { "band": "Gold", "label": "Gold", "threshold": "K100K–K500K", "count": 3020, "avg_clv": 210000, "avg_churn_prob": 0.19, "total_aum": 634200000, "pct": 1.5 },
    { "band": "Silver", "label": "Silver", "threshold": "K20K–K100K", "count": 28400, "avg_clv": 52000, "avg_churn_prob": 0.31, "total_aum": 1476800000, "pct": 13.9 },
    { "band": "Bronze", "label": "Bronze", "threshold": "CLV < K20K", "count": 172060, "avg_clv": 8400, "avg_churn_prob": 0.42, "total_aum": 1445304000, "pct": 84.2 }
  ],
  "top_customers": [
    {
      "customer_id": "CU-00421",
      "name": "Mpho Radebe",
      "segment": "Wealth Management",
      "band": "Platinum",
      "clv": 2140000,
      "churn_prob": 0.91,
      "aum": "K 2.1M",
      "rm": null,
      "days_since_contact": 12,
      "churn_confidence": "± 0.04",
      "clv_confidence": "± K 84K",
      "churn_drivers": [
        { "label": "Deposit Velocity (3M trend)", "impact": -0.31, "direction": "negative" },
        { "label": "Digital Channel Dormancy", "impact": -0.22, "direction": "negative" },
        { "label": "Products Held", "impact": 0.08, "direction": "positive" }
      ]
    }
  ]
}
```

**Frontend Usage:** CustomerValueIntelligence.vue — details in Section 3.

---

### 2.11 GET /api/v1/customers/lifecycle-stages [NEW]

**Purpose:** Retrieve customer distribution metrics across lifecycle stages, transition counts, onboarding funnel performance metrics, and a list of churned customers ready for win-back campaigns.

**Request:** `GET /api/v1/customers/lifecycle-stages?as_of_date=2026-07-27`

**Response:**
```json
{
  "distribution": [
    { "stage": "ONBOARDING", "label": "Onboarding", "count": 4820, "pct": 2.4, "mom_delta": 312, "color": "text-gray-600", "bg": "bg-gray-100", "dot": "bg-gray-500" },
    { "stage": "GROWING", "label": "Growing", "count": 38240, "pct": 18.7, "mom_delta": -820, "color": "text-absa-passion", "bg": "bg-red-50", "dot": "bg-absa-passion" },
    { "stage": "MATURE", "label": "Mature", "count": 124300, "pct": 60.9, "mom_delta": -1240, "color": "text-absa-enrich", "bg": "bg-gray-50", "dot": "bg-absa-enrich" },
    { "stage": "AT_RISK", "label": "At Risk", "count": 22840, "pct": 11.2, "mom_delta": 1840, "color": "text-absa-energy", "bg": "bg-orange-50", "dot": "bg-absa-energy" },
    { "stage": "CHURNING", "label": "Churning", "count": 8420, "pct": 4.1, "mom_delta": 410, "color": "text-absa-inspire", "bg": "bg-red-100", "dot": "bg-absa-inspire" },
    { "stage": "CHURNED", "label": "Churned", "count": 3680, "pct": 1.8, "mom_delta": 280, "color": "text-red-900", "bg": "bg-red-100", "dot": "bg-red-900" },
    { "stage": "WIN_BACK", "label": "Win-Back", "count": 1000, "pct": 0.5, "mom_delta": 55, "color": "text-amber-700", "bg": "bg-amber-50", "dot": "bg-amber-500" }
  ],
  "transitions": {
    "stages": ["ONBOARDING", "GROWING", "MATURE", "AT_RISK", "CHURNING", "CHURNED"],
    "matrix": [
      [2800, 1840, 120, 40, 12, 8],
      [0, 36200, 1420, 480, 110, 30],
      [0, 180, 121840, 1240, 420, 620],
      [0, 140, 4200, 16200, 1840, 460],
      [0, 0, 280, 840, 5200, 2100],
      [0, 0, 0, 0, 0, 3680]
    ]
  },
  "onboarding": {
    "total_new": 4820,
    "activated_30d": 3240,
    "activated_60d": 3820,
    "activated_90d": 4140,
    "early_at_risk": 380,
    "avg_products": 1.4,
    "digital_enrolled": 72
  },
  "win_back": [
    { "customer_id": "CU-W0041", "name": "Lerato Dlamini", "last_product": "Savings Account", "months_churned": 3, "est_value": "K 28K", "status": "ELIGIBLE", "prob": 0.62 },
    { "customer_id": "CU-W0088", "name": "Bongani Khumalo", "last_product": "Business Current", "months_churned": 5, "est_value": "K 84K", "status": "IN CAMPAIGN", "prob": 0.55 }
  ]
}
```

**Frontend Usage:** LifecyclePrediction.vue — details in Section 3.

---

### 2.12 GET /api/v1/forecasts/balance [NEW]

**Purpose:** Monte Carlo projection of deposits (AUM) including segment breakdowns, sensitivity projections for varying churn parameters, and P10/P90 confidence bounds across 12-week trajectories.

**Request:** `GET /api/v1/forecasts/balance?as_of_date=2026-07-27`

**Response:**
```json
{
  "current_aum": 4572000000,
  "as_of_date": "2026-07-27",
  "scenarios": {
    "optimistic": [4572, 4598, 4621, 4648, 4672, 4691, 4710, 4728, 4741, 4758, 4771, 4784],
    "base":       [4572, 4541, 4512, 4484, 4458, 4432, 4408, 4384, 4362, 4340, 4319, 4298],
    "pessimistic":[4572, 4498, 4426, 4356, 4288, 4220, 4154, 4090, 4028, 3967, 3907, 3848]
  },
  "labels": ["Jul 27","Aug 3","Aug 10","Aug 17","Aug 24","Aug 31","Sep 7","Sep 14","Sep 21","Sep 28","Oct 5","Oct 12"],
  "by_segment": [
    { "segment": "Retail Savings", "current_aum": 1445000000, "projected_exits": 312, "aum_at_risk": 112800000, "projected_remaining": 1332200000 },
    { "segment": "Mature / Core", "current_aum": 1876000000, "projected_exits": 84, "aum_at_risk": 31200000, "projected_remaining": 1844800000 }
  ],
  "sensitivity": [
    { "churn_delta": "-2%", "label": "Churn ↓ 2pp (Best)", "projected_aum": 4692000000, "delta_vs_base": 394000000, "aum_change": "+8.6%" },
    { "churn_delta": "Base", "label": "Base Scenario", "projected_aum": 4298000000, "delta_vs_base": 0, "aum_change": "Baseline" }
  ],
  "confidence_bounds": {
    "p10": [4572, 4498, 4441, 4386, 4333, 4280, 4228, 4178, 4130, 4083, 4036, 3990],
    "p90": [4572, 4582, 4582, 4582, 4582, 4583, 4586, 4588, 4592, 4595, 4600, 4605]
  },
  "ci_checkpoints": [
    { "label": "Now (Jul 27)", "base": 4572, "p10": 4572, "p90": 4572 },
    { "label": "30D (Aug 27)", "base": 4458, "p10": 4333, "p90": 4582 }
  ],
  "model_meta": {
    "version": "2.1",
    "last_run": "2026-07-27 02:15 UTC",
    "auc_roc": 0.847,
    "n_simulations": 10000
  }
}
```

**Frontend Usage:** BalanceForecast.vue — details in Section 3.

---

### 2.13 GET /api/v1/outcomes/retention-roi [NEW]

**Purpose:** Retrieve business metrics representing direct ROI on campaigns, contact/retained counts per branch, scorecard tracking on key criteria targets, and A/B pilot vs. control statistical variance.

**Request:** `GET /api/v1/outcomes/retention-roi?as_of_date=2026-07-27`

**Response:**
```json
{
  "roi": {
    "revenue_protected": 48600000,
    "customers_retained": 1284,
    "intervention_cost": 3200000,
    "net_roi_pct": 1418,
    "roi_multiple": 15.2,
    "trend": [
      { "month": "Mar", "revenue": 2100000 },
      { "month": "Apr", "revenue": 4800000 },
      { "month": "May", "revenue": 8200000 },
      { "month": "Jun", "revenue": 14100000 },
      { "month": "Jul", "revenue": 48600000 }
    ]
  },
  "retention_performance": [
    { "entity": "Sandton Branch", "flagged": 284, "contacted": 198, "retained": 142, "churned": 56, "revenue_protected": "K 9.2M", "rate": 71.7 }
  ],
  "success_criteria": [
    { "criterion": "Reduce monthly churn rate by 15% within 90 days of pilot launch", "target": "≤ 5.1%", "current": "5.8%", "status": "AT RISK", "delta": "+0.7pp" }
  ],
  "pilot_vs_control": {
    "pilot":   { "branches": 6, "churn_rate": 5.1, "retention_rate": 74, "aum_change": -1.2, "contacts_per_rm": 28 },
    "control": { "branches": 7, "churn_rate": 7.8, "retention_rate": 58, "aum_change": -4.8, "contacts_per_rm": 11 },
    "significance": "p < 0.05"
  }
}
```

**Frontend Usage:** BusinessOutcomes.vue — details in Section 3.

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

### PAGE 7: Customer Value Intelligence — `/dashboard/customer-value` [NEW]

**Store:** `useIntelligenceStore`  
**API:** `GET /api/v1/customers/clv-summary`  
**`as_of_date`:** `2026-07-27`

#### FR-VAL-01: CLV Dashboard Cards
The dashboard displays six core metrics calculated from the aggregate predicted values:
| Card | Binding | Source |
|------|---------|--------|
| Total Predicted Value | `clvData.summary.total_clv` | Sum of customer predicted lifetimes |
| Average CLV Score | `clvData.summary.avg_clv` | Arithmetic mean of calculated CLV |
| High Value Base | `clvData.summary.high_value_count` | Customer count with CLV exceeding threshold |
| Revenue Churn Risk | `clvData.summary.clv_at_risk` | CLV multiplied by risk factor (at-risk value) |
| Protected Month-To-Date | `clvData.summary.value_protected_mtd` | Sum of CLV of successfully contacted customers |
| Churn-Adjusted CLV | `clvData.summary.churn_adjusted_clv` | `total_clv - clv_at_risk` |

#### FR-VAL-02: Value Segmentation Bands Table
Divides total base into four tiers (Platinum, Gold, Silver, Bronze) with columns:
- **Band Label:** (e.g. "Platinum")
- **Threshold Rule:** (e.g. "CLV > K500K")
- **Active Customers:** `bands[].count`
- **Average CLV:** `bands[].avg_clv` ZMW (Mono + Currency formatted)
- **Average Churn Risk:** `bands[].avg_churn_prob` %
- **Total Assets Under Management:** `bands[].total_aum` ZMW
- **Share of Base:** `bands[].pct` %

#### FR-VAL-03: High-Value At-Risk Priority Action Ledger
A grid highlighting top high-value customers with critical churn risk. Displays:
- **Customer:** Name + ID (`top_customers[].name` / `customer_id`)
- **Segment / Tier:** `segment` (e.g., "Wealth Management") and `band`
- **CLV Score:** `clv` formatted with confidence bounds e.g., `± K 84K` (`clv_confidence`)
- **Churn Probability:** `churn_prob` represented with a color-coded percentage plus confidence bounds e.g., `± 0.04` (`churn_confidence`)
- **Current Balances (AUM):** `aum`
- **Assigned RM:** `rm` or '--'
- **Days Since Contact:** `days_since_contact` (trigger warning if >10 days)
- **Explainability:** Includes `<MlExplainPopover>` containing `churn_drivers[]` with labels and positive/negative direction impacts.

---

### PAGE 8: Customer Lifecycle — `/dashboard/lifecycle` [NEW]

**Store:** `useIntelligenceStore`  
**API:** `GET /api/v1/customers/lifecycle-stages`  
**`as_of_date`:** `2026-07-27`

#### FR-LIFE-01: Lifecycle Stage Distribution Cards
Displays vertical columns/cards representing customers in each operational stage (ONBOARDING, GROWING, MATURE, AT_RISK, CHURNING, CHURNED, WIN_BACK):
- **Stage Count / %:** `distribution[].count` and `pct` %
- **Mom Delta:** Month-on-Month difference (`mom_delta` e.g., +312)
- **Styling Hooks:** Driven by API color mappings (`color`, `bg`, `dot`).

#### FR-LIFE-02: Stage Transition Flow Matrix
A high-density 6x6 grid showing historical customer movement between stages:
- **Rows:** "From State" list (`transitions.stages`)
- **Columns:** "To State" list
- **Grid Cells:** Intersecting transition count `transitions.matrix[from_idx][to_idx]`.

#### FR-LIFE-03: Early Onboarding Performance Funnel
Special tracking for recently boarded customers:
- **Total New Sign-ups:** `onboarding.total_new`
- **Activated Checkpoints:** `onboarding.activated_30d` / `_60d` / `_90d`
- **Early Churn Risk:** `onboarding.early_at_risk` (new sign-ups with dropping transactions)
- **Digital Engagement:** `onboarding.digital_enrolled` %

#### FR-LIFE-04: Win-Back Campaign Ledger
List of churned customers showing high re-engagement suitability:
- **Customer:** Name + ID
- **Last Held Product:** `last_product`
- **Duration Churned:** `months_churned` Months
- **Estimated Re-entry Value:** `est_value` ZMW
- **Campaign Eligibility Status:** `status` (ELIGIBLE, IN CAMPAIGN, INELIGIBLE)
- **Win Probability:** `prob` % (e.g. 71% Suitability Score)

---

### PAGE 9: Balance Forecast — `/dashboard/balance-forecast` [NEW]

**Store:** `useIntelligenceStore`  
**API:** `GET /api/v1/forecasts/balance`  
**`as_of_date`:** `2026-07-27`

#### FR-FOR-01: Monte Carlo Deposit Trajectory Chart
Renders a time-series line chart tracking Assets Under Management (AUM) over 12 forecast intervals:
- **X-Axis:** Date intervals (`labels` array of strings, e.g. "Jul 27", "Aug 3")
- **Chart Series:**
  - Optimistic Trajectory: `scenarios.optimistic`
  - Base Trajectory: `scenarios.base`
  - Pessimistic Trajectory: `scenarios.pessimistic`
  - P10/P90 Confidence Boundaries: `confidence_bounds.p10` and `confidence_bounds.p90` shaded zone.

#### FR-FOR-02: Balance Exits Segment Breakdown
Summarizes how churn and lifecycle predictions impact specific retail segments:
- **Segment Name:** `by_segment[].segment`
- **Current Total Deposits:** `by_segment[].current_aum` ZMW
- **Projected Account Closures:** `by_segment[].projected_exits` Count
- **Deposits At Risk:** `by_segment[].aum_at_risk` ZMW
- **Retained Projection:** `by_segment[].projected_remaining` ZMW

#### FR-FOR-03: Churn Rate Sensitivity Analysis
Simulates projected total deposits under hypothetical churn variance variables:
- **Simulation Delta:** `sensitivity[].churn_delta` (e.g., -2%, Churn Base, +1%, etc.)
- **Projected AUM:** `sensitivity[].projected_aum` ZMW
- **ZMW Variance vs. Baseline:** `sensitivity[].delta_vs_base` ZMW
- **AUM Percent Growth/Stress:** `sensitivity[].aum_change`

#### FR-FOR-04: Forecast Metadata & Simulations audit
- Displays model version `model_meta.version`, last computation runtime `model_meta.last_run`, backtest accuracy `model_meta.auc_roc`, and simulated path count `model_meta.n_simulations` (e.g. 10,000 trajectories).

---

### PAGE 10: Business Outcomes — `/dashboard/business-outcomes` [NEW]

**Store:** `useIntelligenceStore`  
**API:** `GET /api/v1/outcomes/retention-roi`  
**`as_of_date`:** `2026-07-27`

#### FR-OUT-01: Proactive Action Campaign ROI
Calculates bottom-line performance of retention actions:
- **Financial Benefit:** `roi.revenue_protected` ZMW saved
- **Direct Retain Count:** `roi.customers_retained` Customers
- **Campaign Cost:** `roi.intervention_cost` ZMW
- **Net ROI %:** `roi.net_roi_pct` %
- **ROI Multiple:** `roi.roi_multiple` x (e.g. K 15.2 saved per K 1 spent)
- **Savings Progression Chart:** Line chart plotting `roi.trend[]` (Month vs Revenue Protected)

#### FR-OUT-02: Regional / Branch Retention Scorecard
Performance comparison tracking RM proactive reach per branch:
- **Entity name:** `retention_performance[].entity` (e.g. "Rosebank Branch")
- **Customers Flagged:** `flagged` Count
- **Successful Contacts:** `contacted` Count
- **Customers Retained vs Churned:** `retained` vs `churned`
- **Branch Revenue Saved:** `revenue_protected`
- **RM Outreach Conversion Rate:** `rate` %

#### FR-OUT-03: Strategic Goal Trackers Checklist
SLA compliance scorecard detailing objectives and variance parameters:
- **Strategic Objective:** `success_criteria[].criterion`
- **Target KPI:** `target`
- **Current Performance:** `current`
- **Goal Status Badge:** `status` (MET, MONITOR, AT RISK)
- **Variance Delta:** `delta`

#### FR-OUT-04: Pilot Vs. Control A/B Statistical Significance
Compares metrics between pilot branches implementing the platform and control branches continuing standard operations:
- **Branches participating:** `pilot.branches` vs `control.branches`
- **Average Churn Rates:** `pilot.churn_rate` vs `control.churn_rate` %
- **Customer Retain Rates:** `pilot.retention_rate` vs `control.retention_rate` %
- **Weekly RM Outreach Average:** `pilot.contacts_per_rm` vs `control.contacts_per_rm` Actions
- **P-Value Significance:** `pilot_vs_control.significance` (e.g., `p < 0.05` confirming statistically significant lift).

---

## 4. Shared Component Requirements

### Loading States
All data-driven pages MUST render `<LoadingSkeleton>` variants while `store.loading === true` or equivalent component loadings are true:
- `type="stats"` — 4 or 6 skeleton KPI cards
- `type="table" :count="N"` — N skeleton table rows
- `type="card"` — single skeleton card

### Error States
All data-driven pages MUST render error banner when `store.error !== null` (or specific store category error):
- Red background, error message text
- [Retry] button calling the appropriate `store.fetchXxx()` method

### Empty States
When API returns success but no data:
- Portfolio: "No portfolio data available. Run batch computation."
- Customer: 404 handling with back navigation
- Models: "No models registered in the registry."
- ETL: "No pipeline runs recorded. Trigger a pipeline execution."
- Intelligence: "Analytic predictions not yet generated. Trigger intelligence processing engine."

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

### intelligenceStore [NEW]
```
State: clvData, lifecycleData, forecastData, outcomesData, loading{}, error{}
Actions: fetchClv(), fetchLifecycle(), fetchForecast(), fetchOutcomes()
Getters: clvSummary, clvBands, topAtRiskCustomers, stageDistribution, onboardingFunnel, winBackCandidates, balanceTrajectories, regionalPerformance, outcomesScorecard
```

---

## 6. Current Gaps & Phase 2 Priorities

| Priority | Feature | Requirement |
|----------|---------|-------------|
| 🔴 P0 | Strategic Intelligence APIs | Implement backend services and Gateway endpoints for `/api/v1/customers/clv-summary`, `/api/v1/customers/lifecycle-stages`, `/api/v1/forecasts/balance`, and `/api/v1/outcomes/retention-roi` (Sections 2.10 - 2.13) |
| 🔴 P0 | Branch Manager Dashboard | Wire to portfolio aggregation + branch filters |
| 🔴 P0 | Prediction Enrichment Batch | Populate churn % + CLV in customer list for ledger table |
| 🟡 P1 | Customer Profile Enrichment | Add fullName, segment, accountNumber, tenure to state service |
| 🟡 P1 | Model Metrics Expansion | Add precision, recall, F1 to prediction model registry |
| 🟡 P1 | Performance Over Time | Time-series data for model metrics trend chart |
| 🟢 P2 | Decision Intelligence Frontend | NBA recommendations, routing, approval workflow UI |
| 🟢 P3 | LLM Explanations UI | Natural language summaries, RM talking points |
| 🟢 P3 | Real-time WebSocket | Live alerts via Redis pub/sub |

---

## 7. Appendix: Quick Reference

### Backend Service Map
| Port | Service | Key Data | Endpoints |
|------|---------|----------|-----------|
| 8080 | Gateway | Unified Gateway API | Proxies to all routes |
| 8002 | Feature Engineering | Customer calculated features | `/features/*` |
| 8003 | Customer State (L1) | State classifications, lifecycle stages, value tiers | `/customers/*`, `/customers/clv-summary`, `/customers/lifecycle-stages` |
| 8004 | Prediction (L2) | Churn risk model, health, Monte Carlo forecasts | `/predictions/*`, `/forecasts/balance` |
| 8005 | Decision Intelligence (L3) | Campaign performance, ROI metrics, success tracker | `/outcomes/retention-roi`, `/actions/*` |

### Default Parameters
- `as_of_date`: `2026-07-27`
- `limit`: `500` (customer list), `25` (ETL runs)
- Axios timeout: `5000ms`
- API base URL: `http://localhost:8080`
