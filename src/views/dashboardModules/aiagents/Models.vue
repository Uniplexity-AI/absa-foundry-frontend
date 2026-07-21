<template>
  <div class="absa-models">
    <!-- Breadcrumb -->
    <div class="absa-models__breadcrumb">
      <span>Home</span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      <span>AI Agents</span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      <span class="absa-models__breadcrumb-current">Model Monitoring</span>
    </div>

    <!-- Header -->
    <div class="absa-models__header">
      <div>
        <div class="absa-models__champion-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          CHAMPION MODEL
        </div>
        <h1 class="absa-models__title">Churn-Propensity-V4.2.1</h1>
        <p class="absa-models__subtitle">Deployed &bull; Last trained: July 18, 2026 &bull; Traffic: 100%</p>
      </div>
      <div class="absa-models__header-right">
        <div class="absa-models__search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" placeholder="Search prediction log..." class="absa-models__search-input" />
        </div>
        <button class="absa-models__btn absa-models__btn--outline">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export Report
        </button>
        <button class="absa-models__btn absa-models__btn--primary">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
          Retrain Model
        </button>
        <div class="absa-models__user">
          <div class="absa-models__avatar">MM</div>
          <div class="absa-models__user-info">
            <span class="absa-models__user-name">Mariah Mutale</span>
            <span class="absa-models__user-role">Data Scientist</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══ Model Metrics Cards ═══ -->
    <div class="absa-models__kpi-grid">
      <div class="absa-metric-bg absa-accent-left-success absa-models__kpi">
        <div class="absa-models__kpi-header">
          <span class="absa-models__kpi-badge">PRIMARY</span>
          <div class="absa-models__kpi-icon absa-models__kpi-icon--green">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          </div>
        </div>
        <div class="absa-models__kpi-value absa-models__kpi-value--success">0.892</div>
        <div class="absa-models__kpi-label">AUC-ROC</div>
        <div class="absa-models__kpi-trend absa-models__kpi-trend--up">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
          +0.4%
        </div>
        <div class="absa-models__kpi-threshold">Threshold: 0.70</div>
      </div>

      <div class="absa-metric-bg absa-accent-left-warning absa-models__kpi">
        <div class="absa-models__kpi-header">
          <span class="absa-models__kpi-badge">F1</span>
          <div class="absa-models__kpi-icon absa-models__kpi-icon--amber">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
        </div>
        <div class="absa-models__kpi-value absa-models__kpi-value--warning">0.764</div>
        <div class="absa-models__kpi-label">F1 Score</div>
        <div class="absa-models__kpi-trend absa-models__kpi-trend--down">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>
          -1.2%
        </div>
      </div>

      <div class="absa-metric-bg absa-accent-left-maroon absa-models__kpi">
        <div class="absa-models__kpi-header">
          <span class="absa-models__kpi-badge">P/R</span>
          <div class="absa-models__kpi-icon absa-models__kpi-icon--maroon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
        </div>
        <div class="absa-models__kpi-value">0.74 / 0.79</div>
        <div class="absa-models__kpi-label">Precision / Recall</div>
        <div class="absa-models__kpi-trend absa-models__kpi-trend--neutral">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Stable
        </div>
        <div class="absa-models__kpi-threshold">Target: 0.75 / 0.75</div>
      </div>
    </div>

    <!-- ═══ Performance Over Time ═══ -->
    <div class="absa-chart-container absa-models__chart">
      <div class="absa-models__chart-header">
        <h3 class="absa-models__chart-title">Model Performance Over Time</h3>
        <div class="absa-models__chart-legend">
          <span class="absa-models__legend-item"><span class="absa-models__legend-dot absa-models__legend-dot--green"></span> Precision</span>
          <span class="absa-models__legend-item"><span class="absa-models__legend-dot absa-models__legend-dot--maroon"></span> Recall</span>
        </div>
      </div>
      <div class="absa-models__perf-chart">
        <div class="absa-models__perf-y">
          <span>1.0</span><span>0.8</span><span>0.6</span><span>0.4</span><span>0.2</span><span>0</span>
        </div>
        <div class="absa-models__perf-area">
          <svg viewBox="0 0 600 200" class="absa-models__perf-svg" preserveAspectRatio="none">
            <!-- Grid lines -->
            <line v-for="i in 5" :key="'gl'+i" x1="0" :y1="i*40" x2="600" :y2="i*40" stroke="#F3F4F6" stroke-width="1"/>
            <!-- Precision line -->
            <polyline :points="precisionPoints" fill="none" stroke="#16A34A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <!-- Recall line -->
            <polyline :points="recallPoints" fill="none" stroke="#BE0F2C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <!-- Area under precision -->
            <polygon :points="precisionAreaPoints" fill="rgba(22,163,74,0.08)"/>
          </svg>
        </div>
      </div>
      <div class="absa-models__perf-x">
        <span v-for="d in perfDates" :key="d">{{ d }}</span>
      </div>
    </div>

    <!-- ═══ Feature Drift Monitor ═══ -->
    <div class="absa-models__section">
      <div class="absa-models__section-header">
        <h3 class="absa-models__section-title">Feature Drift Monitor (PSI)</h3>
        <span class="absa-models__section-period">Last 30 Days</span>
      </div>
      <div class="absa-models__table-wrap">
        <table class="absa-models__table">
          <thead class="absa-table-header">
            <tr>
              <th>Feature</th>
              <th>Training Mean</th>
              <th>Current Mean</th>
              <th>Distribution Shift</th>
              <th>Drift Score (PSI)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="f in driftFeatures" :key="f.name">
              <td class="absa-models__feature-name">{{ f.name }}</td>
              <td class="absa-models__table-val">{{ f.trainingMean }}</td>
              <td class="absa-models__table-val">{{ f.currentMean }}</td>
              <td>
                <div class="absa-models__shift-bar">
                  <div class="absa-models__shift-fill" :style="{ width: f.shiftPct + '%' }" :class="'absa-models__shift-fill--' + f.statusClass"></div>
                </div>
              </td>
              <td>
                <span class="absa-models__drift-val" :class="'absa-models__drift-val--' + f.statusClass">{{ f.psi }}</span>
              </td>
              <td>
                <span class="absa-models__status-pill" :class="'absa-models__status-pill--' + f.statusClass">{{ f.status }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ═══ Live Prediction Log ═══ -->
    <div class="absa-models__section">
      <div class="absa-models__section-header">
        <h3 class="absa-models__section-title">Live Prediction Log</h3>
        <div class="absa-models__live-dot">
          <span class="absa-models__live-pulse"></span>
          Streaming
        </div>
      </div>
      <div class="absa-models__table-wrap">
        <table class="absa-models__table">
          <thead class="absa-table-header">
            <tr>
              <th>Timestamp</th>
              <th>Correlation ID</th>
              <th>Customer ID</th>
              <th>Churn Probability</th>
              <th>Class</th>
              <th>Latency</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in predictionLogs" :key="log.id">
              <td class="absa-models__table-mono">{{ log.timestamp }}</td>
              <td class="absa-models__table-mono absa-models__correlation">{{ log.correlationId }}</td>
              <td class="absa-models__table-val">{{ log.customerId }}</td>
              <td>
                <div class="absa-models__prob">
                  <div class="absa-models__prob-bar">
                    <div class="absa-models__prob-fill" :class="'absa-models__prob-fill--' + log.probClass" :style="{ width: log.probability + '%' }"></div>
                  </div>
                  <span class="absa-models__prob-val" :class="'absa-models__prob-val--' + log.probClass">{{ log.probability }}%</span>
                </div>
              </td>
              <td>
                <span class="absa-models__class-pill" :class="'absa-models__class-pill--' + log.className.toLowerCase()">{{ log.className }}</span>
              </td>
              <td class="absa-models__table-mono">{{ log.latency }}ms</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="absa-models__pagination">
        <span>Showing 1-10 of 4,821 predictions today</span>
        <div class="absa-models__page-btns">
          <button disabled><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg></button>
          <button class="absa-models__page-btn--active">1</button>
          <button>2</button>
          <button>3</button>
          <button>...</button>
          <button>483</button>
          <button><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const perfDates = ref(['Jul 12', 'Jul 14', 'Jul 16', 'Jul 18', 'Jul 20'])
const precisionValues = [0.72, 0.74, 0.75, 0.73, 0.74]
const recallValues = [0.77, 0.78, 0.80, 0.79, 0.79]

const precisionPoints = computed(() => {
  const w = 600; const h = 200
  return precisionValues.map((v, i) => `${(i / (precisionValues.length - 1)) * w},${h - v * h}`).join(' ')
})
const recallPoints = computed(() => {
  const w = 600; const h = 200
  return recallValues.map((v, i) => `${(i / (recallValues.length - 1)) * w},${h - v * h}`).join(' ')
})
const precisionAreaPoints = computed(() => {
  const w = 600; const h = 200
  const pts = precisionValues.map((v, i) => `${(i / (precisionValues.length - 1)) * w},${h - v * h}`)
  return `0,${h} ${pts.join(' ')} ${w},${h}`
})

const driftFeatures = ref([
  { name: 'balance_avg_90d', trainingMean: 'ZMW 45,200', currentMean: 'ZMW 41,800', shiftPct: 35, psi: 0.18, status: 'LOW', statusClass: 'good' },
  { name: 'inflow_freq_m1', trainingMean: '8.4 / month', currentMean: '5.1 / month', shiftPct: 62, psi: 0.31, status: 'ALERT', statusClass: 'critical' },
  { name: 'customer_tenure_yrs', trainingMean: '4.2 yrs', currentMean: '4.0 yrs', shiftPct: 15, psi: 0.08, status: 'LOW', statusClass: 'good' },
  { name: 'digital_engagement_score', trainingMean: '0.72', currentMean: '0.54', shiftPct: 48, psi: 0.24, status: 'WARN', statusClass: 'warning' }
])

const predictionLogs = ref([
  { id: 1, timestamp: '2026-07-20 14:32:01', correlationId: 'c7a2-4f1b-9d3e', customerId: '994022/11/1', probability: 92, probClass: 'critical', className: 'HIGH', latency: 42 },
  { id: 2, timestamp: '2026-07-20 14:32:01', correlationId: 'd8b3-5e2c-0f4a', customerId: '884512/08/3', probability: 48, probClass: 'warning', className: 'MED', latency: 38 },
  { id: 3, timestamp: '2026-07-20 14:32:02', correlationId: 'e9c4-6f3d-1a5b', customerId: '772301/04/2', probability: 3, probClass: 'good', className: 'LOW', latency: 45 },
  { id: 4, timestamp: '2026-07-20 14:32:02', correlationId: 'f0d5-7a4e-2b6c', customerId: '661890/02/7', probability: 22, probClass: 'good', className: 'LOW', latency: 41 },
  { id: 5, timestamp: '2026-07-20 14:32:03', correlationId: 'a1e6-8b5f-3c7d', customerId: '550123/05/9', probability: 67, probClass: 'warning', className: 'MED', latency: 39 }
])
</script>

<style scoped>
/* ═══ Models Page ═══ */
.absa-models { }

.absa-models__breadcrumb {
  display: flex; align-items: center; gap: 6px;
  font-size: 0.7rem; font-weight: 600; color: #9CA3AF;
  margin-bottom: 14px; font-family: 'Space Mono', monospace;
}
.absa-models__breadcrumb-current { color: #BE0F2C; }

/* Header */
.absa-models__header {
  display: flex; align-items: flex-start; justify-content: space-between;
  margin-bottom: 24px; flex-wrap: wrap; gap: 16px;
}
.absa-models__champion-badge {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: 'Space Mono', monospace; font-size: 0.6rem; font-weight: 800;
  color: #BE0F2C; background: #FDE8EC; padding: 3px 12px;
  border-radius: 999px; letter-spacing: 0.06em; margin-bottom: 8px;
}
.absa-models__title { font-size: 1.5rem; font-weight: 900; color: #111827; margin: 0 0 4px 0; letter-spacing: -0.02em; }
.absa-models__subtitle { font-size: 0.725rem; color: #9CA3AF; margin: 0; font-family: 'Space Mono', monospace; }

.absa-models__header-right { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.absa-models__search {
  display: flex; align-items: center; gap: 8px;
  background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 8px;
  padding: 7px 14px; color: #9CA3AF; width: 260px;
}
.absa-models__search-input { border: none; background: transparent; font-size: 0.725rem; color: #111827; outline: none; width: 100%; font-family: 'Space Mono', monospace; }
.absa-models__search-input::placeholder { color: #9CA3AF; }

.absa-models__btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 16px; border-radius: 6px; font-size: 0.7rem;
  font-weight: 700; cursor: pointer; transition: all 150ms ease;
  border: 1px solid #E8E8EC; background: #FFF; color: #4B5563;
  font-family: 'Montserrat', system-ui, sans-serif; white-space: nowrap;
}
.absa-models__btn:hover { border-color: #BE0F2C; color: #BE0F2C; }
.absa-models__btn--primary { background: linear-gradient(135deg, #BE0F2C, #8B0015); color: #FFF; border-color: transparent; box-shadow: 0 4px 14px rgba(190,15,44,0.25); }
.absa-models__btn--primary:hover { opacity: 0.9; color: #FFF; }
.absa-models__btn--outline { background: #FFF; }

.absa-models__user { display: flex; align-items: center; gap: 10px; }
.absa-models__avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #BE0F2C, #8B0015); color: #FFF; font-size: 0.75rem; font-weight: 800; display: flex; align-items: center; justify-content: center; }
.absa-models__user-info { display: flex; flex-direction: column; line-height: 1.2; }
.absa-models__user-name { font-size: 0.8rem; font-weight: 700; color: #111827; }
.absa-models__user-role { font-size: 0.625rem; color: #9CA3AF; font-family: 'Space Mono', monospace; }

/* KPI Cards */
.absa-models__kpi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px; }
.absa-models__kpi { padding: 20px; }
.absa-models__kpi-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; }
.absa-models__kpi-badge { font-family: 'Space Mono', monospace; font-size: 0.525rem; font-weight: 800; color: #9CA3AF; background: #F3F4F6; padding: 2px 8px; border-radius: 4px; letter-spacing: 0.06em; }
.absa-models__kpi-icon { width: 34px; height: 34px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
.absa-models__kpi-icon--green { background: #DCFCE7; color: #16A34A; }
.absa-models__kpi-icon--amber { background: #FEF3C7; color: #D97706; }
.absa-models__kpi-icon--maroon { background: #FDE8EC; color: #BE0F2C; }
.absa-models__kpi-value { font-size: 1.75rem; font-weight: 900; color: #111827; letter-spacing: -0.02em; margin-bottom: 2px; }
.absa-models__kpi-value--success { color: #16A34A; }
.absa-models__kpi-value--warning { color: #D97706; }
.absa-models__kpi-label { font-family: 'Space Mono', monospace; font-size: 0.575rem; font-weight: 700; color: #9CA3AF; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 6px; }
.absa-models__kpi-trend { display: flex; align-items: center; gap: 4px; font-size: 0.6rem; font-weight: 700; font-family: 'Space Mono', monospace; }
.absa-models__kpi-trend--up { color: #16A34A; }
.absa-models__kpi-trend--down { color: #DC2626; }
.absa-models__kpi-trend--neutral { color: #6B7280; }
.absa-models__kpi-threshold { font-family: 'Space Mono', monospace; font-size: 0.55rem; color: #D1D5DB; margin-top: 4px; }

/* Performance Chart */
.absa-models__chart { margin-bottom: 24px; }
.absa-models__chart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.absa-models__chart-title { font-size: 0.85rem; font-weight: 800; color: #111827; margin: 0; }
.absa-models__chart-legend { display: flex; gap: 16px; font-size: 0.675rem; font-weight: 600; color: #6B7280; }
.absa-models__legend-item { display: flex; align-items: center; gap: 6px; }
.absa-models__legend-dot { width: 8px; height: 8px; border-radius: 50%; }
.absa-models__legend-dot--green { background: #16A34A; }
.absa-models__legend-dot--maroon { background: #BE0F2C; }

.absa-models__perf-chart { display: flex; gap: 12px; height: 200px; }
.absa-models__perf-y { display: flex; flex-direction: column; justify-content: space-between; font-family: 'Space Mono', monospace; font-size: 0.575rem; color: #9CA3AF; padding: 0 4px; }
.absa-models__perf-area { flex: 1; position: relative; }
.absa-models__perf-svg { width: 100%; height: 100%; }
.absa-models__perf-x { display: flex; justify-content: space-between; padding-left: 40px; padding-top: 8px; font-family: 'Space Mono', monospace; font-size: 0.575rem; color: #9CA3AF; }

/* Sections */
.absa-models__section { margin-bottom: 24px; }
.absa-models__section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
.absa-models__section-title { font-size: 0.9rem; font-weight: 800; color: #111827; margin: 0; }
.absa-models__section-period { font-family: 'Space Mono', monospace; font-size: 0.575rem; font-weight: 700; color: #BE0F2C; background: #FDE8EC; padding: 3px 10px; border-radius: 999px; }

/* Table */
.absa-models__table-wrap { background: #FFF; border: 1px solid #E8E8EC; border-radius: 12px; overflow: hidden; }
.absa-models__table { width: 100%; border-collapse: collapse; font-size: 0.725rem; }
.absa-models__table th { font-family: 'Space Mono', monospace; font-size: 0.575rem; font-weight: 800; color: #9CA3AF; letter-spacing: 0.06em; text-align: left; padding: 12px 20px; }
.absa-models__table td { padding: 13px 20px; border-bottom: 1px solid #F3F4F6; vertical-align: middle; }
.absa-models__table tbody tr:hover { background: #F9FAFB; }
.absa-models__table-val { font-weight: 700; color: #111827; }
.absa-models__table-mono { font-family: 'Space Mono', monospace; font-size: 0.65rem; color: #6B7280; }
.absa-models__feature-name { font-weight: 700; color: #111827; font-family: 'Space Mono', monospace; font-size: 0.675rem; }
.absa-models__correlation { color: #BE0F2C; font-size: 0.6rem; }

/* Shift */
.absa-models__shift-bar { width: 60px; height: 4px; background: #E5E7EB; border-radius: 2px; overflow: hidden; }
.absa-models__shift-fill { height: 100%; border-radius: 2px; }
.absa-models__shift-fill--good { background: #16A34A; }
.absa-models__shift-fill--warning { background: #F59E0B; }
.absa-models__shift-fill--critical { background: #DC2626; }

.absa-models__drift-val { font-weight: 800; font-size: 0.75rem; }
.absa-models__drift-val--good { color: #16A34A; }
.absa-models__drift-val--warning { color: #D97706; }
.absa-models__drift-val--critical { color: #DC2626; }

/* Status Pills */
.absa-models__status-pill { font-family: 'Space Mono', monospace; font-size: 0.575rem; font-weight: 800; padding: 3px 10px; border-radius: 999px; letter-spacing: 0.04em; }
.absa-models__status-pill--good { background: #DCFCE7; color: #16A34A; }
.absa-models__status-pill--warning { background: #FEF3C7; color: #D97706; }
.absa-models__status-pill--critical { background: #FEE2E2; color: #DC2626; }

/* Probability */
.absa-models__prob { display: flex; align-items: center; gap: 8px; }
.absa-models__prob-bar { width: 60px; height: 6px; background: #E5E7EB; border-radius: 3px; overflow: hidden; }
.absa-models__prob-fill { height: 100%; border-radius: 3px; }
.absa-models__prob-fill--critical { background: #DC2626; }
.absa-models__prob-fill--warning { background: #F59E0B; }
.absa-models__prob-fill--good { background: #16A34A; }
.absa-models__prob-val { font-weight: 800; font-size: 0.7rem; }
.absa-models__prob-val--critical { color: #DC2626; }
.absa-models__prob-val--warning { color: #D97706; }
.absa-models__prob-val--good { color: #16A34A; }

.absa-models__class-pill { font-family: 'Space Mono', monospace; font-size: 0.575rem; font-weight: 800; padding: 3px 10px; border-radius: 6px; letter-spacing: 0.04em; }
.absa-models__class-pill--high { background: #FEE2E2; color: #DC2626; }
.absa-models__class-pill--med { background: #FEF3C7; color: #D97706; }
.absa-models__class-pill--low { background: #DCFCE7; color: #16A34A; }

/* Live indicator */
.absa-models__live-dot { display: flex; align-items: center; gap: 6px; font-family: 'Space Mono', monospace; font-size: 0.6rem; font-weight: 700; color: #16A34A; }
.absa-models__live-pulse { width: 8px; height: 8px; border-radius: 50%; background: #16A34A; animation: livePulse 2s ease-in-out infinite; }
@keyframes livePulse { 0%,100% { opacity: 1; box-shadow: 0 0 0 0 rgba(22,163,74,0.4); } 50% { opacity: 0.6; box-shadow: 0 0 0 6px rgba(22,163,74,0); } }

/* Pagination */
.absa-models__pagination { display: flex; justify-content: space-between; align-items: center; padding: 12px 20px; border-top: 1px solid #F3F4F6; font-family: 'Space Mono', monospace; font-size: 0.6rem; color: #9CA3AF; }
.absa-models__page-btns { display: flex; gap: 4px; }
.absa-models__page-btns button { min-width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; border: 1px solid #E8E8EC; border-radius: 6px; background: #FFF; color: #4B5563; font-family: 'Space Mono', monospace; font-size: 0.6rem; font-weight: 700; cursor: pointer; transition: all 150ms ease; }
.absa-models__page-btns button:hover { border-color: #BE0F2C; color: #BE0F2C; }
.absa-models__page-btns button:disabled { opacity: 0.35; cursor: not-allowed; }
.absa-models__page-btn--active { background: #BE0F2C !important; color: #FFF !important; border-color: #BE0F2C !important; }

/* Responsive */
@media (max-width: 1200px) { .absa-models__kpi-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px) { .absa-models__kpi-grid { grid-template-columns: 1fr; } .absa-models__header { flex-direction: column; } .absa-models__header-right { width: 100%; } .absa-models__search { width: 100%; } }
</style>
