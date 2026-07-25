<template>
  <div class="absa-models">
    <div class="absa-models__content">
    <!-- Breadcrumb -->
    <div class="absa-models__breadcrumb">
      <span>Home</span>
      <svg width="12" height="12" viewBox="0 0 6 10" fill="none" stroke="#9CA3AF" stroke-width="1.5"><path d="M1 1l4 4-4 4"/></svg>
      <span>Models</span>
      <svg width="12" height="12" viewBox="0 0 6 10" fill="none" stroke="#9CA3AF" stroke-width="1.5"><path d="M1 1l4 4-4 4"/></svg>
      <span class="absa-models__breadcrumb-current">Churn-Propensity-V4.2.1</span>
    </div>

    <!-- Header -->
    <div class="absa-models__header">
      <div>
        <div class="absa-models__champion-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#dc0037" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          CHAMPION MODEL
        </div>
        <h1 class="absa-models__title">Churn-Propensity-V4.2.1</h1>
        <p class="absa-models__subtitle">Deployed &bull; Last trained: July 18, 2026 &bull; Traffic: 100%</p>
      </div>
      <div class="absa-models__header-right">
        <div class="absa-models__search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
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
      </div>
    </div>

    <!-- ═══ Model Metrics Cards ═══ -->
    <div class="absa-models__kpi-grid">
      <div class="absa-metric-bg absa-accent-left-success absa-models__kpi">
        <div class="absa-models__kpi-header">
          <span class="absa-models__kpi-badge">AUC-ROC</span>
          <svg width="36" height="20" viewBox="0 0 36 20" fill="none" stroke="#16A34A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 15 8 12 14 16 22 8 28 11 35 5"/></svg>
        </div>
        <div class="absa-models__kpi-value">0.892</div>
        <div class="absa-models__kpi-label">Area Under Curve</div>
        <div class="absa-models__kpi-trend-row">
          <div class="absa-models__kpi-trend absa-models__kpi-trend--up">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            +0.4%
          </div>
          <span class="absa-models__kpi-threshold">Threshold: 0.70</span>
        </div>
      </div>

      <div class="absa-metric-bg absa-accent-left-warning absa-models__kpi">
        <div class="absa-models__kpi-header">
          <span class="absa-models__kpi-badge">F1 SCORE</span>
          <svg width="36" height="20" viewBox="0 0 36 20" fill="none" stroke="#D97706" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 15 8 12 14 16 22 8 28 11 35 14"/></svg>
        </div>
        <div class="absa-models__kpi-value">0.764</div>
        <div class="absa-models__kpi-label">Harmonic Mean</div>
        <div class="absa-models__kpi-trend absa-models__kpi-trend--down">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>
          -1.2%
        </div>
      </div>

      <div class="absa-metric-bg absa-accent-left-maroon absa-models__kpi">
        <div class="absa-models__kpi-header">
          <span class="absa-models__kpi-badge">PRECISION / RECALL</span>
          <svg width="36" height="20" viewBox="0 0 36 20" fill="none" stroke="#BE0F2C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="6" width="6" height="13" rx="1"/><rect x="10" y="9" width="6" height="10" rx="1"/><rect x="19" y="3" width="6" height="16" rx="1"/><rect x="28" y="10" width="6" height="9" rx="1"/></svg>
        </div>
        <div class="absa-models__kpi-value">0.74 / 0.79</div>
        <div class="absa-models__kpi-label">Precision / Recall</div>
        <div class="absa-models__kpi-trend absa-models__kpi-trend--neutral">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Stable
        </div>
      </div>
    </div>

    <!-- ═══ Performance Over Time (30D) ═══ -->
    <div class="absa-chart-container absa-models__chart">
      <div class="absa-models__chart-header">
        <h3 class="absa-models__chart-title">Performance Over Time (30D)</h3>
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
            <line v-for="i in 5" :key="'gl'+i" x1="0" :y1="i*40" x2="600" :y2="i*40" stroke="#F4F4F6" stroke-width="1"/>
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

    <!-- ═══ Feature Drift Monitor (PSI) ═══ -->
    <div class="absa-models__section">
      <div class="absa-models__section-header">
        <div>
          <h3 class="absa-models__section-title">Feature Drift Monitor (PSI)</h3>
          <p class="absa-models__section-desc">Analyzing shift between Training Distribution and Current Inference Logs</p>
        </div>
        <span class="absa-models__section-badge">Threshold: 0.20 PSI</span>
      </div>
      <div class="absa-models__table-wrap">
        <table class="absa-models__table">
          <thead class="absa-table-header">
            <tr>
              <th>FEATURE NAME</th>
              <th>TRAINING MEAN</th>
              <th>CURRENT MEAN</th>
              <th>DISTRIBUTION SHIFT</th>
              <th>DRIFT SCORE (PSI)</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="f in driftFeatures" :key="f.name">
              <td class="absa-models__feature-name">{{ f.name }}</td>
              <td class="absa-models__table-val">{{ f.trainingMean }}</td>
              <td class="absa-models__table-val">{{ f.currentMean }}</td>
              <td>
                <div class="absa-models__shift-bar-viz">
                  <div class="absa-models__shift-bar-track">
                    <div class="absa-models__shift-bar-fill" :style="{ width: f.shiftPct + '%' }" :class="'absa-models__shift-bar-fill--' + f.statusClass"></div>
                  </div>
                </div>
              </td>
              <td>
                <span class="absa-models__psi-val" :class="'absa-models__psi-val--' + f.statusClass">{{ f.psi }}</span>
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
        <div>
          <h3 class="absa-models__section-title">Live Prediction Log</h3>
          <p class="absa-models__section-desc">Real-time inference stream from production endpoint</p>
        </div>
        <div class="absa-models__section-actions">
          <button class="absa-models__btn absa-models__btn--outline">Export Logs</button>
          <div class="absa-models__dropdown-select">
            <span>Last 1 Hour</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <button class="absa-models__btn-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2" stroke-linecap="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
          </button>
        </div>
      </div>
      <div class="absa-models__table-wrap">
        <table class="absa-models__table">
          <thead class="absa-table-header">
            <tr>
              <th>TIMESTAMP</th>
              <th>CORRELATION ID</th>
              <th>CUSTOMER ID</th>
              <th>PROB (CHURN)</th>
              <th>CLASS</th>
              <th>LATENCY</th>
              <th style="width: 48px;"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(log, idx) in predictionLogs" :key="log.id">
              <td class="absa-models__table-mono">{{ log.timestamp }}</td>
              <td class="absa-models__correlation">{{ log.correlationId }}</td>
              <td class="absa-models__table-val">{{ log.customerId }}</td>
              <td>
                <div class="absa-models__prob-bar-group">
                  <div class="absa-models__prob-track">
                    <div class="absa-models__prob-fill" :class="'absa-models__prob-fill--' + log.probClass" :style="{ width: log.probPct + '%' }"></div>
                  </div>
                  <span class="absa-models__prob-num" :class="'absa-models__prob-num--' + log.probClass">{{ log.probDisplay }}</span>
                </div>
              </td>
              <td>
                <span class="absa-models__class-pill" :class="'absa-models__class-pill--' + log.className.toLowerCase()">{{ log.className }}</span>
              </td>
              <td class="absa-models__table-mono">{{ log.latency }}ms</td>
              <td>
                <div class="absa-models__action-cell" @click.stop>
                  <button class="absa-models__action-dots" @click="toggleDropdown(idx)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#6B7280"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>
                  </button>
                  <div v-if="openDropdown === idx" class="absa-models__dropdown">
                    <button class="absa-models__dropdown-item" @click="handleView(log)">View</button>
                    <button v-if="log.className === 'HIGH'" class="absa-models__dropdown-item" @click="handleRetry(log)">Retry</button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="absa-models__pagination">
        <span>Showing latest 50 of 4,211 predictions</span>
        <div class="absa-models__page-btns">
          <button disabled>
            <svg width="10" height="10" viewBox="0 0 6 10" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 1l-4 4 4 4"/></svg>
          </button>
          <button>
            <svg width="10" height="10" viewBox="0 0 6 10" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 1l4 4-4 4"/></svg>
          </button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

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
  { name: 'balance_avg_90d', trainingMean: 'K 12,450.00', currentMean: 'K 11,210.00', shiftPct: 30, psi: '0.042', status: 'LOW', statusClass: 'good' },
  { name: 'inflow_freq_m1', trainingMean: '4.2', currentMean: '1.8', shiftPct: 75, psi: '0.321', status: 'ALERT', statusClass: 'critical' },
  { name: 'customer_tenure_yrs', trainingMean: '6.1', currentMean: '6.2', shiftPct: 10, psi: '0.015', status: 'LOW', statusClass: 'good' },
  { name: 'digital_engagement_score', trainingMean: '72.4', currentMean: '88.9', shiftPct: 55, psi: '0.185', status: 'WARN', statusClass: 'warning' }
])

const predictionLogs = ref([
  { id: 1, timestamp: '2025-11-24 14:22:11.002', correlationId: 'req-99x-a21b', customerId: 'ZM-8821992', probPct: 89, probDisplay: '0.892', probClass: 'critical', className: 'HIGH', latency: 12 },
  { id: 2, timestamp: '2025-11-24 14:22:10.884', correlationId: 'req-99x-c33a', customerId: 'ZM-1029381', probPct: 11, probDisplay: '0.114', probClass: 'good', className: 'LOW', latency: 14 },
  { id: 3, timestamp: '2025-11-24 14:22:10.551', correlationId: 'req-99x-b99s', customerId: 'ZM5561223', probPct: 45, probDisplay: '0.452', probClass: 'warning', className: 'MED', latency: 11 },
  { id: 4, timestamp: '2025-11-24 14:22:09.912', correlationId: 'req-99x-f112', customerId: 'ZM9900881', probPct: 92, probDisplay: '0.921', probClass: 'critical', className: 'HIGH', latency: 18 },
  { id: 5, timestamp: '2025-11-24 14:22:08.442', correlationId: 'req-99x-z88p', customerId: 'ZM-7761122', probPct: 8, probDisplay: '0.082', probClass: 'good', className: 'LOW', latency: 9 }
])

const openDropdown = ref(null)

function toggleDropdown(idx) {
  openDropdown.value = openDropdown.value === idx ? null : idx
}

function handleView(log) {
  console.log('View prediction:', log.id)
  openDropdown.value = null
}

function handleRetry(log) {
  console.log('Retry prediction:', log.id)
  openDropdown.value = null
}

function handleClickOutside(e) {
  if (openDropdown.value !== null && !e.target.closest('.absa-models__action-cell')) {
    openDropdown.value = null
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<style scoped>
/* ═══ Models Page ═══ */
.absa-models__content {
  max-width: 1600px;
  margin: 0 auto;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  flex: 1;
}
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
.absa-models__subtitle { font-size: 0.7rem; color: #9CA3AF; margin: 0; font-family: 'Space Mono', monospace; }

.absa-models__header-right { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.absa-models__search {
  display: flex; align-items: center; gap: 8px;
  background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 8px;
  padding: 7px 14px; color: #9CA3AF; width: 240px;
}
.absa-models__search-input { border: none; background: transparent; font-size: 0.7rem; color: #111827; outline: none; width: 100%; font-family: 'Space Mono', monospace; }
.absa-models__search-input::placeholder { color: #9CA3AF; }

.absa-models__btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 16px; border-radius: 6px; font-size: 0.7rem;
  font-weight: 700; cursor: pointer; transition: all 150ms ease;
  border: 1px solid #E8E8EC; background: #FFF; color: #4B5563;
  font-family: 'Montserrat', system-ui, sans-serif; white-space: nowrap;
}
.absa-models__btn:hover { border-color: #BE0F2C; color: #BE0F2C; }
.absa-models__btn--primary { background: #BE0F2C; color: #FFF; border-color: transparent; }
.absa-models__btn--primary:hover { background: #A01028; color: #FFF; border-color: transparent; }
.absa-models__btn--outline { background: #FFF; }
.absa-models__btn-icon {
  display: flex; align-items: center; justify-content: center;
  width: 34px; height: 34px; border: 1px solid #E8E8EC; border-radius: 6px;
  background: #FFF; cursor: pointer; transition: all 150ms ease;
}
.absa-models__btn-icon:hover { border-color: #BE0F2C; }

/* Dropdown select */
.absa-models__dropdown-select {
  display: flex; align-items: center; gap: 6px;
  padding: 8px 12px; border: 1px solid #E8E8EC; border-radius: 6px;
  font-size: 0.7rem; font-weight: 600; color: #4B5563;
  background: #FFF; cursor: pointer; font-family: 'Space Mono', monospace;
}

/* KPI Cards */
.absa-models__kpi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px; }
.absa-models__kpi { padding: 20px; }
.absa-models__kpi-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
.absa-models__kpi-badge { font-family: 'Space Mono', monospace; font-size: 0.525rem; font-weight: 800; color: #9CA3AF; background: #F3F4F6; padding: 2px 8px; border-radius: 4px; letter-spacing: 0.06em; }
.absa-models__kpi-value { font-size: 1.75rem; font-weight: 900; color: #111827; letter-spacing: -0.02em; margin-bottom: 2px; }
.absa-models__kpi-label { font-family: 'Space Mono', monospace; font-size: 0.575rem; font-weight: 700; color: #9CA3AF; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 8px; }
.absa-models__kpi-trend-row { display: flex; align-items: center; gap: 12px; }
.absa-models__kpi-trend { display: flex; align-items: center; gap: 4px; font-size: 0.6rem; font-weight: 700; font-family: 'Space Mono', monospace; }
.absa-models__kpi-trend--up { color: #16A34A; }
.absa-models__kpi-trend--down { color: #DC2626; }
.absa-models__kpi-trend--neutral { color: #6B7280; }
.absa-models__kpi-threshold { font-family: 'Space Mono', monospace; font-size: 0.55rem; color: #D1D5DB; }

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
.absa-models__section-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; gap: 12px; }
.absa-models__section-title { font-size: 0.9rem; font-weight: 800; color: #111827; margin: 0; }
.absa-models__section-desc { font-size: 0.65rem; color: #9CA3AF; margin: 2px 0 0 0; font-family: 'Space Mono', monospace; }
.absa-models__section-actions { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
.absa-models__section-badge { font-family: 'Space Mono', monospace; font-size: 0.575rem; font-weight: 800; color: #BE0F2C; background: #FDE8EC; padding: 4px 12px; border-radius: 999px; letter-spacing: 0.04em; white-space: nowrap; }

/* Table */
.absa-models__table-wrap { background: #FFF; border: 1px solid #E8E8EC; border-radius: 12px; overflow: hidden; }
.absa-models__table { width: 100%; border-collapse: collapse; font-size: 0.7rem; }
.absa-models__table th { font-family: 'Space Mono', monospace; font-size: 0.575rem; font-weight: 800; color: #9CA3AF; letter-spacing: 0.06em; text-align: left; padding: 12px 20px; }
.absa-models__table td { padding: 13px 20px; border-bottom: 1px solid #F3F4F6; vertical-align: middle; }
.absa-models__table tbody tr:hover { background: #F9FAFB; }
.absa-models__table-val { font-weight: 700; color: #111827; }
.absa-models__table-mono { font-family: 'Space Mono', monospace; font-size: 0.65rem; color: #6B7280; }
.absa-models__feature-name { font-weight: 700; color: #111827; font-family: 'Space Mono', monospace; font-size: 0.675rem; }
.absa-models__correlation { font-family: 'Space Mono', monospace; font-size: 0.65rem; color: #BE0F2C; }

/* Shift bars */
.absa-models__shift-bar-viz { display: flex; align-items: center; }
.absa-models__shift-bar-track { width: 80px; height: 6px; background: #E5E7EB; border-radius: 3px; overflow: hidden; }
.absa-models__shift-bar-fill { height: 100%; border-radius: 3px; }
.absa-models__shift-bar-fill--good { background: #16A34A; }
.absa-models__shift-bar-fill--warning { background: #F59E0B; }
.absa-models__shift-bar-fill--critical { background: #DC2626; }

.absa-models__psi-val { font-weight: 800; font-size: 0.75rem; }
.absa-models__psi-val--good { color: #16A34A; }
.absa-models__psi-val--warning { color: #D97706; }
.absa-models__psi-val--critical { color: #DC2626; }

/* Status Pills */
.absa-models__status-pill { font-family: 'Space Mono', monospace; font-size: 0.55rem; font-weight: 800; padding: 3px 10px; border-radius: 999px; letter-spacing: 0.04em; }
.absa-models__status-pill--good { background: #DCFCE7; color: #16A34A; }
.absa-models__status-pill--warning { background: #FEF3C7; color: #D97706; }
.absa-models__status-pill--critical { background: #FEE2E2; color: #DC2626; }

/* Probability bars */
.absa-models__prob-bar-group { display: flex; align-items: center; gap: 8px; }
.absa-models__prob-track { width: 60px; height: 6px; background: #E5E7EB; border-radius: 3px; overflow: hidden; }
.absa-models__prob-fill { height: 100%; border-radius: 3px; }
.absa-models__prob-fill--critical { background: #DC2626; }
.absa-models__prob-fill--warning { background: #F59E0B; }
.absa-models__prob-fill--good { background: #16A34A; }
.absa-models__prob-num { font-weight: 800; font-size: 0.7rem; }
.absa-models__prob-num--critical { color: #DC2626; }
.absa-models__prob-num--warning { color: #D97706; }
.absa-models__prob-num--good { color: #16A34A; }

.absa-models__class-pill { font-family: 'Space Mono', monospace; font-size: 0.55rem; font-weight: 800; padding: 3px 10px; border-radius: 6px; letter-spacing: 0.04em; }
.absa-models__class-pill--high { background: #FEE2E2; color: #DC2626; }
.absa-models__class-pill--med { background: #FEF3C7; color: #D97706; }
.absa-models__class-pill--low { background: #DCFCE7; color: #16A34A; }

/* Action dropdown */
.absa-models__action-cell { position: relative; }
.absa-models__action-dots {
  background: none; border: none; cursor: pointer; padding: 4px; border-radius: 4px; display: flex;
  transition: background 150ms ease;
}
.absa-models__action-dots:hover { background: #F3F4F6; }
.absa-models__dropdown {
  position: absolute; right: 0; top: 100%; z-index: 10;
  background: #FFF; border: 1px solid #E8E8EC; border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08); min-width: 100px;
  overflow: hidden;
}
.absa-models__dropdown-item {
  display: block; width: 100%; text-align: left;
  padding: 8px 16px; font-size: 0.7rem; font-weight: 600; color: #374151;
  background: none; border: none; cursor: pointer; font-family: 'Montserrat', system-ui, sans-serif;
  transition: background 100ms ease;
}
.absa-models__dropdown-item:hover { background: #F9FAFB; color: #BE0F2C; }
.absa-models__dropdown-item + .absa-models__dropdown-item { border-top: 1px solid #F3F4F6; }

/* Pagination */
.absa-models__pagination { display: flex; justify-content: space-between; align-items: center; padding: 12px 20px; border-top: 1px solid #F3F4F6; font-family: 'Space Mono', monospace; font-size: 0.6rem; color: #9CA3AF; }
.absa-models__page-btns { display: flex; gap: 4px; }
.absa-models__page-btns button { min-width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; border: 1px solid #E8E8EC; border-radius: 6px; background: #FFF; color: #4B5563; font-family: 'Space Mono', monospace; font-size: 0.6rem; font-weight: 700; cursor: pointer; transition: all 150ms ease; }
.absa-models__page-btns button:hover { border-color: #BE0F2C; color: #BE0F2C; }
.absa-models__page-btns button:disabled { opacity: 0.35; cursor: not-allowed; }

/* Responsive */
@media (max-width: 1200px) { .absa-models__kpi-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px) { .absa-models__kpi-grid { grid-template-columns: 1fr; } .absa-models__header { flex-direction: column; } .absa-models__header-right { width: 100%; } .absa-models__search { width: 100%; } }
</style>
