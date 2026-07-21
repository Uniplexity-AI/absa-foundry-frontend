<template>
  <div class="absa-etl">
    <!-- Breadcrumb -->
    <div class="absa-etl__breadcrumb">
      <span>Home</span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      <span>Operations</span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      <span class="absa-etl__breadcrumb-current">ETL Execution Logs</span>
    </div>

    <!-- Header -->
    <div class="absa-etl__header">
      <div>
        <h1 class="absa-etl__title">Data Pipeline Health</h1>
        <p class="absa-etl__subtitle">Monitoring ingestion, transformation, and quality across all data sources</p>
      </div>
      <div class="absa-etl__header-right">
        <button class="absa-etl__btn absa-etl__btn--outline">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export Logs
        </button>
        <button class="absa-etl__btn absa-etl__btn--primary">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          Trigger Manual Run
        </button>
        <div class="absa-etl__user">
          <div class="absa-etl__avatar">CA</div>
          <div class="absa-etl__user-info">
            <span class="absa-etl__user-name">C. Analyst</span>
            <span class="absa-etl__user-role">Lvl 4 Reviewer</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══ System Health Cards ═══ -->
    <div class="absa-etl__health-grid">
      <div class="absa-metric-bg absa-etl__health-card">
        <div class="absa-etl__health-top">
          <div class="absa-etl__health-icon absa-etl__health-icon--green">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
          </div>
          <span class="absa-etl__health-dot absa-etl__health-dot--green"></span>
        </div>
        <div class="absa-etl__health-label">PostgreSQL Cluster</div>
        <div class="absa-etl__health-value absa-etl__health-value--green">Active</div>
        <div class="absa-etl__health-stat">99.98% uptime</div>
      </div>

      <div class="absa-metric-bg absa-etl__health-card">
        <div class="absa-etl__health-top">
          <div class="absa-etl__health-icon absa-etl__health-icon--blue">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <span class="absa-etl__health-dot absa-etl__health-dot--green"></span>
        </div>
        <div class="absa-etl__health-label">Redis Cache</div>
        <div class="absa-etl__health-value absa-etl__health-value--green">Healthy</div>
        <div class="absa-etl__health-stat">0.4ms Latency</div>
      </div>

      <div class="absa-metric-bg absa-etl__health-card">
        <div class="absa-etl__health-top">
          <div class="absa-etl__health-icon absa-etl__health-icon--amber">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          </div>
          <span class="absa-etl__health-dot absa-etl__health-dot--amber"></span>
        </div>
        <div class="absa-etl__health-label">API Gateway</div>
        <div class="absa-etl__health-value absa-etl__health-value--amber">Stable</div>
        <div class="absa-etl__health-stat">Load Balance 72%</div>
      </div>
    </div>

    <!-- ═══ Quality Score Trend ═══ -->
    <div class="absa-chart-container absa-etl__quality">
      <div class="absa-etl__quality-header">
        <div>
          <h3 class="absa-etl__quality-title">Quality Score Trend</h3>
          <p class="absa-etl__quality-sub">Data Integrity Score: <strong>98.4</strong> &bull; Last scan: 2 mins ago</p>
        </div>
        <div class="absa-etl__quality-legend">
          <span class="absa-etl__legend-label">
            <span class="absa-etl__legend-dot absa-etl__legend-dot--maroon"></span> Quality Score
          </span>
        </div>
      </div>
      <div class="absa-etl__quality-chart">
        <svg viewBox="0 0 800 160" preserveAspectRatio="none" class="absa-etl__quality-svg">
          <defs>
            <linearGradient id="qualityGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="rgba(190,15,44,0.25)"/>
              <stop offset="100%" stop-color="rgba(190,15,44,0.02)"/>
            </linearGradient>
          </defs>
          <!-- Grid -->
          <line v-for="i in 4" :key="'g'+i" x1="0" :y1="i*40" x2="800" :y2="i*40" stroke="#F3F4F6" stroke-width="1"/>
          <!-- Area -->
          <polygon :points="qualityArea" fill="url(#qualityGrad)"/>
          <!-- Line -->
          <polyline :points="qualityLine" fill="none" stroke="#BE0F2C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <!-- Threshold line -->
          <line x1="0" y1="30" x2="800" y2="30" stroke="#F59E0B" stroke-width="1.5" stroke-dasharray="6,4"/>
          <text x="805" y="34" fill="#F59E0B" font-size="10" font-family="monospace">90%</text>
        </svg>
      </div>
    </div>

    <!-- ═══ Execution History ═══ -->
    <div class="absa-etl__section">
      <div class="absa-etl__section-header">
        <h3 class="absa-etl__section-title">Execution History</h3>
        <span class="absa-etl__section-period">Today</span>
      </div>
      <div class="absa-etl__table-wrap">
        <table class="absa-etl__table">
          <thead class="absa-table-header">
            <tr>
              <th>Run ID</th>
              <th>Batch ID</th>
              <th>Duration</th>
              <th>Rows Recv / Valid / Loaded / Rejected</th>
              <th>Quality Score</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="run in executionHistory" :key="run.id">
              <td class="absa-etl__run-id">{{ run.runId }}</td>
              <td class="absa-etl__table-mono">{{ run.batchId }}</td>
              <td class="absa-etl__table-val">{{ run.duration }}</td>
              <td>
                <div class="absa-etl__rows">
                  <span class="absa-etl__row-stat">{{ run.rowsReceived }}</span>
                  <span class="absa-etl__row-sep">/</span>
                  <span class="absa-etl__row-stat absa-etl__row-stat--green">{{ run.rowsValid }}</span>
                  <span class="absa-etl__row-sep">/</span>
                  <span class="absa-etl__row-stat">{{ run.rowsLoaded }}</span>
                  <span class="absa-etl__row-sep">/</span>
                  <span class="absa-etl__row-stat absa-etl__row-stat--red" v-if="run.rowsRejected > 0">{{ run.rowsRejected }}</span>
                  <span class="absa-etl__row-stat" v-else>0</span>
                </div>
              </td>
              <td>
                <div class="absa-etl__quality-cell">
                  <div class="absa-etl__quality-bar">
                    <div class="absa-etl__quality-fill" :class="'absa-etl__quality-fill--' + run.qualityClass" :style="{ width: run.qualityScore + '%' }"></div>
                  </div>
                  <span class="absa-etl__quality-val" :class="'absa-etl__quality-val--' + run.qualityClass">{{ run.qualityScore }}%</span>
                </div>
              </td>
              <td>
                <span class="absa-etl__status" :class="'absa-etl__status--' + run.statusClass">
                  <span class="absa-etl__status-dot" :class="'absa-etl__status-dot--' + run.statusClass"></span>
                  {{ run.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="absa-etl__pagination">
        <span>Showing 1-4 of 8842 executions</span>
        <div class="absa-etl__page-btns">
          <button disabled><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg></button>
          <button class="absa-etl__page-btn--active">1</button>
          <button>2</button>
          <button>3</button>
          <button>...</button>
          <button>2211</button>
          <button><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></button>
        </div>
      </div>
    </div>

    <!-- ═══ Bottom Stats ═══ -->
    <div class="absa-etl__stats-grid">
      <div class="absa-metric-bg absa-etl__stat-card">
        <div class="absa-etl__stat-icon absa-etl__stat-icon--blue">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/></svg>
        </div>
        <div class="absa-etl__stat-value">+14.2 GB</div>
        <div class="absa-etl__stat-label">Storage Growth</div>
        <div class="absa-etl__stat-trend absa-etl__stat-trend--up">2.4%</div>
      </div>

      <div class="absa-metric-bg absa-etl__stat-card">
        <div class="absa-etl__stat-icon absa-etl__stat-icon--green">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        </div>
        <div class="absa-etl__stat-value">99.1%</div>
        <div class="absa-etl__stat-label">Average Quality</div>
        <div class="absa-etl__stat-trend absa-etl__stat-trend--up">+0.3%</div>
      </div>

      <div class="absa-metric-bg absa-etl__stat-card">
        <div class="absa-etl__stat-icon absa-etl__stat-icon--amber">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
        </div>
        <div class="absa-etl__stat-value">02</div>
        <div class="absa-etl__stat-label">Failed Retries</div>
        <div class="absa-etl__stat-trend absa-etl__stat-trend--neutral">Active</div>
      </div>

      <div class="absa-metric-bg absa-etl__stat-card">
        <div class="absa-etl__stat-icon absa-etl__stat-icon--red">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
        <div class="absa-etl__stat-value">118ms</div>
        <div class="absa-etl__stat-label">Gateway Latency</div>
        <div class="absa-etl__stat-trend absa-etl__stat-trend--up absa-etl__stat-trend--warn">High</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const qualityPoints = [97, 98, 97.5, 98.2, 99, 98.8, 98.4, 98.6, 99.1, 98.4]

const qualityLine = computed(() => {
  const w = 800; const h = 160; const min = 90
  return qualityPoints.map((v, i) => `${(i / (qualityPoints.length - 1)) * w},${h - ((v - min) / (100 - min)) * h}`).join(' ')
})

const qualityArea = computed(() => {
  const w = 800; const h = 160; const min = 90
  const pts = qualityPoints.map((v, i) => `${(i / (qualityPoints.length - 1)) * w},${h - ((v - min) / (100 - min)) * h}`)
  return `0,${h} ${pts.join(' ')} ${w},${h}`
})

const executionHistory = ref([
  { id: 1, runId: '#RUN-8842', batchId: 'BTH-2026-07-20-04', duration: '14m 32s', rowsReceived: '1.2M', rowsValid: '1.18M', rowsLoaded: '1.18M', rowsRejected: 2400, qualityScore: 99.2, qualityClass: 'good', status: 'RUNNING', statusClass: 'running' },
  { id: 2, runId: '#RUN-8841', batchId: 'BTH-2026-07-20-03', duration: '12m 08s', rowsReceived: '1.1M', rowsValid: '1.09M', rowsLoaded: '1.09M', rowsRejected: 1100, qualityScore: 99.5, qualityClass: 'good', status: 'COMPLETED', statusClass: 'completed' },
  { id: 3, runId: '#RUN-8840', batchId: 'BTH-2026-07-20-02', duration: '18m 45s', rowsReceived: '980K', rowsValid: '890K', rowsLoaded: '890K', rowsRejected: 90000, qualityScore: 91.2, qualityClass: 'warning', status: 'FAILED', statusClass: 'failed' },
  { id: 4, runId: '#RUN-8839', batchId: 'BTH-2026-07-20-01', duration: '10m 15s', rowsReceived: '1.05M', rowsValid: '1.04M', rowsLoaded: '1.04M', rowsRejected: 500, qualityScore: 99.8, qualityClass: 'good', status: 'COMPLETED', statusClass: 'completed' }
])
</script>

<style scoped>
/* ═══ ETL Pipeline Health ═══ */
.absa-etl { }

.absa-etl__breadcrumb {
  display: flex; align-items: center; gap: 6px;
  font-size: 0.7rem; font-weight: 600; color: #9CA3AF;
  margin-bottom: 14px; font-family: 'Space Mono', monospace;
}
.absa-etl__breadcrumb-current { color: #BE0F2C; }

/* Header */
.absa-etl__header {
  display: flex; align-items: flex-start; justify-content: space-between;
  margin-bottom: 24px; flex-wrap: wrap; gap: 16px;
}
.absa-etl__title { font-size: 1.5rem; font-weight: 900; color: #111827; margin: 0 0 4px 0; letter-spacing: -0.02em; }
.absa-etl__subtitle { font-size: 0.725rem; color: #9CA3AF; margin: 0; font-family: 'Space Mono', monospace; }

.absa-etl__header-right { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.absa-etl__btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 16px; border-radius: 6px; font-size: 0.7rem;
  font-weight: 700; cursor: pointer; transition: all 150ms ease;
  border: 1px solid #E8E8EC; background: #FFF; color: #4B5563;
  font-family: 'Montserrat', system-ui, sans-serif; white-space: nowrap;
}
.absa-etl__btn:hover { border-color: #BE0F2C; color: #BE0F2C; }
.absa-etl__btn--primary { background: linear-gradient(135deg, #BE0F2C, #8B0015); color: #FFF; border-color: transparent; box-shadow: 0 4px 14px rgba(190,15,44,0.25); }
.absa-etl__btn--primary:hover { opacity: 0.9; color: #FFF; }
.absa-etl__btn--outline { background: #FFF; }

.absa-etl__user { display: flex; align-items: center; gap: 10px; }
.absa-etl__avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #BE0F2C, #8B0015); color: #FFF; font-size: 0.75rem; font-weight: 800; display: flex; align-items: center; justify-content: center; }
.absa-etl__user-info { display: flex; flex-direction: column; line-height: 1.2; }
.absa-etl__user-name { font-size: 0.8rem; font-weight: 700; color: #111827; }
.absa-etl__user-role { font-size: 0.625rem; color: #9CA3AF; font-family: 'Space Mono', monospace; }

/* Health Cards */
.absa-etl__health-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px; }
.absa-etl__health-card { padding: 20px; }
.absa-etl__health-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
.absa-etl__health-icon { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
.absa-etl__health-icon--green { background: #DCFCE7; color: #16A34A; }
.absa-etl__health-icon--blue { background: #DBEAFE; color: #2563EB; }
.absa-etl__health-icon--amber { background: #FEF3C7; color: #D97706; }

.absa-etl__health-dot { width: 10px; height: 10px; border-radius: 50%; }
.absa-etl__health-dot--green { background: #16A34A; box-shadow: 0 0 0 3px rgba(22,163,74,0.2); }
.absa-etl__health-dot--amber { background: #F59E0B; box-shadow: 0 0 0 3px rgba(245,158,11,0.2); }

.absa-etl__health-label { font-family: 'Space Mono', monospace; font-size: 0.6rem; font-weight: 700; color: #9CA3AF; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 4px; }
.absa-etl__health-value { font-size: 1.25rem; font-weight: 900; letter-spacing: -0.02em; margin-bottom: 2px; }
.absa-etl__health-value--green { color: #16A34A; }
.absa-etl__health-value--amber { color: #D97706; }
.absa-etl__health-stat { font-family: 'Space Mono', monospace; font-size: 0.6rem; color: #9CA3AF; }

/* Quality Chart */
.absa-etl__quality { margin-bottom: 24px; }
.absa-etl__quality-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
.absa-etl__quality-title { font-size: 0.9rem; font-weight: 800; color: #111827; margin: 0 0 2px 0; }
.absa-etl__quality-sub { font-size: 0.675rem; color: #9CA3AF; margin: 0; font-family: 'Space Mono', monospace; }
.absa-etl__quality-sub strong { color: #111827; }
.absa-etl__quality-legend { }
.absa-etl__legend-label { display: flex; align-items: center; gap: 6px; font-size: 0.65rem; font-weight: 600; color: #6B7280; }
.absa-etl__legend-dot { width: 8px; height: 8px; border-radius: 50%; }
.absa-etl__legend-dot--maroon { background: #BE0F2C; }
.absa-etl__quality-chart { height: 160px; }
.absa-etl__quality-svg { width: 100%; height: 100%; }

/* Section */
.absa-etl__section { margin-bottom: 24px; }
.absa-etl__section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
.absa-etl__section-title { font-size: 0.9rem; font-weight: 800; color: #111827; margin: 0; }
.absa-etl__section-period { font-family: 'Space Mono', monospace; font-size: 0.575rem; font-weight: 700; color: #BE0F2C; background: #FDE8EC; padding: 3px 10px; border-radius: 999px; }

/* Table */
.absa-etl__table-wrap { background: #FFF; border: 1px solid #E8E8EC; border-radius: 12px; overflow: hidden; }
.absa-etl__table { width: 100%; border-collapse: collapse; font-size: 0.725rem; }
.absa-etl__table th { font-family: 'Space Mono', monospace; font-size: 0.575rem; font-weight: 800; color: #9CA3AF; letter-spacing: 0.06em; text-align: left; padding: 12px 20px; }
.absa-etl__table td { padding: 13px 20px; border-bottom: 1px solid #F3F4F6; vertical-align: middle; }
.absa-etl__table tbody tr:hover { background: #F9FAFB; }
.absa-etl__table-val { font-weight: 700; color: #111827; }
.absa-etl__table-mono { font-family: 'Space Mono', monospace; font-size: 0.6rem; color: #6B7280; }
.absa-etl__run-id { font-weight: 800; color: #BE0F2C; font-family: 'Space Mono', monospace; font-size: 0.675rem; }

/* Row stats */
.absa-etl__rows { display: flex; align-items: center; gap: 4px; }
.absa-etl__row-stat { font-family: 'Space Mono', monospace; font-size: 0.6rem; font-weight: 700; color: #6B7280; }
.absa-etl__row-stat--green { color: #16A34A; }
.absa-etl__row-stat--red { color: #DC2626; }
.absa-etl__row-sep { color: #D1D5DB; font-size: 0.6rem; }

/* Quality cell */
.absa-etl__quality-cell { display: flex; align-items: center; gap: 8px; }
.absa-etl__quality-bar { width: 60px; height: 6px; background: #E5E7EB; border-radius: 3px; overflow: hidden; }
.absa-etl__quality-fill { height: 100%; border-radius: 3px; }
.absa-etl__quality-fill--good { background: #16A34A; }
.absa-etl__quality-fill--warning { background: #F59E0B; }
.absa-etl__quality-val { font-weight: 800; font-size: 0.7rem; }
.absa-etl__quality-val--good { color: #16A34A; }
.absa-etl__quality-val--warning { color: #D97706; }

/* Status */
.absa-etl__status { display: inline-flex; align-items: center; gap: 6px; font-family: 'Space Mono', monospace; font-size: 0.6rem; font-weight: 800; letter-spacing: 0.04em; padding: 4px 12px; border-radius: 6px; }
.absa-etl__status-dot { width: 6px; height: 6px; border-radius: 50%; }
.absa-etl__status--completed { background: #DCFCE7; color: #16A34A; }
.absa-etl__status--running { background: #DBEAFE; color: #2563EB; }
.absa-etl__status--failed { background: #FEE2E2; color: #DC2626; }
.absa-etl__status-dot--completed { background: #16A34A; }
.absa-etl__status-dot--running { background: #2563EB; animation: statusPulse 1.5s ease-in-out infinite; }
.absa-etl__status-dot--failed { background: #DC2626; }
@keyframes statusPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }

/* Pagination */
.absa-etl__pagination { display: flex; justify-content: space-between; align-items: center; padding: 12px 20px; border-top: 1px solid #F3F4F6; font-family: 'Space Mono', monospace; font-size: 0.6rem; color: #9CA3AF; }
.absa-etl__page-btns { display: flex; gap: 4px; }
.absa-etl__page-btns button { min-width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; border: 1px solid #E8E8EC; border-radius: 6px; background: #FFF; color: #4B5563; font-family: 'Space Mono', monospace; font-size: 0.6rem; font-weight: 700; cursor: pointer; transition: all 150ms ease; }
.absa-etl__page-btns button:hover { border-color: #BE0F2C; color: #BE0F2C; }
.absa-etl__page-btns button:disabled { opacity: 0.35; cursor: not-allowed; }
.absa-etl__page-btn--active { background: #BE0F2C !important; color: #FFF !important; border-color: #BE0F2C !important; }

/* Bottom Stats */
.absa-etl__stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
.absa-etl__stat-card { padding: 20px; }
.absa-etl__stat-icon { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 10px; }
.absa-etl__stat-icon--blue { background: #DBEAFE; color: #2563EB; }
.absa-etl__stat-icon--green { background: #DCFCE7; color: #16A34A; }
.absa-etl__stat-icon--amber { background: #FEF3C7; color: #D97706; }
.absa-etl__stat-icon--red { background: #FEE2E2; color: #DC2626; }
.absa-etl__stat-value { font-size: 1.25rem; font-weight: 900; color: #111827; letter-spacing: -0.02em; margin-bottom: 2px; }
.absa-etl__stat-label { font-family: 'Space Mono', monospace; font-size: 0.575rem; font-weight: 700; color: #9CA3AF; letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 4px; }
.absa-etl__stat-trend { font-family: 'Space Mono', monospace; font-size: 0.575rem; font-weight: 800; }
.absa-etl__stat-trend--up { color: #16A34A; }
.absa-etl__stat-trend--neutral { color: #6B7280; }
.absa-etl__stat-trend--warn { color: #DC2626; }

/* Responsive */
@media (max-width: 1200px) { .absa-etl__health-grid { grid-template-columns: repeat(2,1fr); } .absa-etl__stats-grid { grid-template-columns: repeat(2,1fr); } }
@media (max-width: 768px) { .absa-etl__health-grid,.absa-etl__stats-grid { grid-template-columns: 1fr; } .absa-etl__header { flex-direction: column; } }
</style>
