<template>
  <div class="absa-etl-run-history">
    <div class="absa-etl-content">
      <!-- Page Header -->
      <div class="absa-etl-header">
        <div>
          <div class="absa-etl-breadcrumb">
            <span>Home</span>
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="#5d3f3f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span>Operations</span>
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="#5d3f3f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span class="absa-etl-breadcrumb--active">ETL Execution Logs</span>
          </div>
          <h2 class="absa-etl-header__title absa-etl-header__title--red">ETL Run History</h2>
        </div>
        <div class="absa-etl-header__actions">
          <button class="absa-etl-btn absa-etl-btn--outline">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export Logs
          </button>
          <button class="absa-etl-btn absa-etl-btn--primary">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Trigger Manual Run
          </button>
        </div>
      </div>

      <!-- Bento Grid: Health Cards + Quality Trend -->
      <div class="absa-etl-grid">
        <!-- System Health Cards -->
        <div class="absa-etl-health-cards">
          <div class="absa-etl-health-card" v-for="card in healthCards" :key="card.label">
            <div class="absa-etl-health-card__body">
              <div class="absa-etl-health-card__icon">
                <div v-html="card.icon"></div>
              </div>
              <div>
                <div class="absa-etl-health-card__label">{{ card.label }}</div>
                <div class="absa-etl-health-card__value">{{ card.value }}</div>
              </div>
            </div>
            <div class="absa-etl-health-card__status">
              <div class="absa-etl-health-card__dot" :class="'absa-etl-health-card__dot--' + card.statusColor"></div>
              <div class="absa-etl-health-card__stat" :class="'absa-etl-health-card__stat--' + card.statusColor">{{ card.stat }}</div>
            </div>
          </div>
        </div>

        <!-- Quality Score Trend -->
        <div class="absa-etl-quality">
          <div class="absa-etl-quality__header">
            <h3 class="absa-etl-quality__title">Quality Score Trend</h3>
            <div class="absa-etl-quality__toggles">
              <span class="absa-etl-quality__toggle absa-etl-quality__toggle--active">24 HOURS</span>
              <span class="absa-etl-quality__toggle">7 DAYS</span>
            </div>
          </div>
          <div class="absa-etl-quality__chart">
            <div class="absa-etl-quality__bars">
              <div class="absa-etl-quality__bar" v-for="(bar, i) in qualityBars" :key="i"
                :style="{ height: bar + '%', background: 'rgba(174,0,41,0.2)', borderTop: '2px solid var(--inspire, #77021e)' }"
                :title="bar + '%'">
              </div>
            </div>
          </div>
          <div class="absa-etl-quality__footer">
            <div class="absa-etl-quality__score">
              <span class="absa-etl-quality__dot"></span>
              Data Integrity Score: <strong>98.4</strong>
            </div>
            <span class="absa-etl-quality__scan">Last scan: 2 mins ago</span>
          </div>
        </div>
      </div>

      <!-- Execution History Table -->
      <div class="absa-etl-table-section">
        <div class="absa-etl-table-section__header">
          <h3 class="absa-etl-table-section__title">Execution History</h3>
          <div class="absa-etl-table-section__filter">
            <span class="absa-etl-table-section__filter-label">Filter by:</span>
            <div class="absa-etl-table-section__dropdown">
              <span>All Statuses</span>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="#191c1d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
          </div>
        </div>
        <div class="absa-etl-table-wrap">
          <table class="absa-etl-table">
            <thead>
              <tr>
                <th>RUN ID</th>
                <th>BATCH ID</th>
                <th>DURATION</th>
                <th>ROWS (RCV/VAL/LD/REJ)</th>
                <th>QUALITY<br/>SCORE</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="run in executionHistory" :key="run.id">
                <td class="absa-etl-table__run-id">
                  <div class="absa-etl-table__run-divider" :class="'absa-etl-table__run-divider--' + run.statusClass"></div>
                  <span class="absa-etl-table__run-text">#RUN-{{ run.runId }}</span>
                </td>
                <td class="absa-etl-table__batch">{{ run.batchId }}</td>
                <td class="absa-etl-table__duration">{{ run.duration }}</td>
                <td>
                  <div class="absa-etl-table__rows">
                    <span>{{ run.rowsReceived }}</span>
                    <span class="absa-etl-table__sep">/</span>
                    <span class="absa-etl-table__valid">{{ run.rowsValid }}</span>
                    <span class="absa-etl-table__sep">/</span>
                    <span>{{ run.rowsLoaded }}</span>
                    <span class="absa-etl-table__sep">/</span>
                    <span class="absa-etl-table__rejected" :class="{ 'absa-etl-table__rejected--warn': run.rowsRejected > 0 }">{{ run.rowsRejected }}</span>
                  </div>
                </td>
                <td>
                  <div class="absa-etl-table__quality">
                    <div class="absa-etl-table__quality-bar">
                      <div class="absa-etl-table__quality-fill" :class="'absa-etl-table__quality-fill--' + run.qualityClass" :style="{ width: run.qualityScore + '%' }"></div>
                    </div>
                    <span class="absa-etl-table__quality-val" :class="'absa-etl-table__quality-val--' + run.qualityClass">{{ run.qualityScore }}%</span>
                  </div>
                </td>
                <td>
                  <span class="absa-etl-table__status" :class="'absa-etl-table__status--' + run.statusClass">
                    <span class="absa-etl-table__status-dot" :class="'absa-etl-table__status-dot--' + run.statusClass"></span>
                    {{ run.status }}
                  </span>
                </td>
                <td class="absa-etl-table__action-cell">
                  <div class="absa-etl-table__action-wrap">
                    <button class="absa-etl-table__action-btn" @click.stop="toggleMenu(run.id)">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                    </button>
                    <div class="absa-etl-table__dropdown" v-if="openMenuId === run.id" @click.stop>
                      <button class="absa-etl-table__dropdown-item" @click="viewRun(run)">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        View
                      </button>
                      <button class="absa-etl-table__dropdown-item" v-if="run.statusClass === 'failed'" @click="retryRun(run)">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
                        Retry
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="absa-etl-table-section__pagination">
          <span>Showing 1-4 of 8842 executions</span>
          <div class="absa-etl-table-section__page-btns">
            <button disabled class="absa-etl-table-section__page-nav">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button class="absa-etl-table-section__page-btn absa-etl-table-section__page-btn--active">1</button>
            <button class="absa-etl-table-section__page-btn">2</button>
            <button class="absa-etl-table-section__page-btn">3</button>
            <button class="absa-etl-table-section__page-btn">...</button>
            <button class="absa-etl-table-section__page-btn">2211</button>
            <button class="absa-etl-table-section__page-nav">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Bottom Detail Cards -->
      <div class="absa-etl-bottom-cards">
        <div class="absa-etl-bottom-card">
          <div class="absa-etl-bottom-card__label">STORAGE GROWTH</div>
          <div class="absa-etl-bottom-card__value">+14.2 GB</div>
          <div class="absa-etl-bottom-card__trend">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 0l5 6H0z" fill="#4caf50"/></svg>
            <span class="absa-etl-bottom-card__trend-up">2.4%</span>
          </div>
          <div class="absa-etl-bottom-card__progress">
            <div class="absa-etl-bottom-card__progress-fill" style="width: 65%"></div>
          </div>
          <div class="absa-etl-bottom-card__sub">6.2TB of 10TB Allocated</div>
        </div>
        <div class="absa-etl-bottom-card">
          <div class="absa-etl-bottom-card__label">AVERAGE QUALITY</div>
          <div class="absa-etl-bottom-card__value">99.1%</div>
          <div class="absa-etl-bottom-card__trend">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 0l5 6H0z" fill="#4caf50"/></svg>
            <span class="absa-etl-bottom-card__trend-up">0.3%</span>
          </div>
          <div class="absa-etl-bottom-card__chart">
            <div class="absa-etl-bottom-card__chart-bar" v-for="(h, i) in qualityChartBars" :key="i" :style="{ height: h + '%', opacity: 0.2 + i * 0.15 }"></div>
          </div>
          <div class="absa-etl-bottom-card__sub">Based on last 50 batches</div>
        </div>
        <div class="absa-etl-bottom-card">
          <div class="absa-etl-bottom-card__label">FAILED RETRIES</div>
          <div class="absa-etl-bottom-card__value">02</div>
          <div class="absa-etl-bottom-card__trend">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M0 0l5 6 5-6H0z" fill="#ba1a1a"/></svg>
            <span class="absa-etl-bottom-card__trend-down">Active</span>
          </div>
          <div class="absa-etl-bottom-card__badges">
            <span class="absa-etl-bottom-card__badge absa-etl-bottom-card__badge--dark">BT</span>
            <span class="absa-etl-bottom-card__badge absa-etl-bottom-card__badge--red">ETL</span>
          </div>
          <div class="absa-etl-bottom-card__sub">Requires manual intervention</div>
        </div>
        <div class="absa-etl-bottom-card">
          <div class="absa-etl-bottom-card__label">GATEWAY LATENCY</div>
          <div class="absa-etl-bottom-card__value">118ms</div>
          <div class="absa-etl-bottom-card__trend">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffc107" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            <span class="absa-etl-bottom-card__trend-warn">High</span>
          </div>
          <div class="absa-etl-bottom-card__bar">
            <div class="absa-etl-bottom-card__bar-fill" style="width: 78%"></div>
          </div>
          <div class="absa-etl-bottom-card__sub">Peak load during batch processing</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const healthCards = ref([
  {
    label: 'PostgreSQL Cluster',
    value: 'Active',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc0037" stroke-width="2.5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
    statusColor: 'green',
    stat: '99.98%'
  },
  {
    label: 'Redis Cache',
    value: 'Healthy',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc0037" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    statusColor: 'green',
    stat: '0.4ms Latency'
  },
  {
    label: 'API Gateway',
    value: 'Stable',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc0037" stroke-width="2.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    statusColor: 'amber',
    stat: 'Load Balance 72%'
  }
])

const qualityBars = ref([70, 65, 80, 85, 75, 92, 88, 94, 90, 98])

const qualityChartBars = ref([30, 55, 40, 65, 80])

const openMenuId = ref(null)

function toggleMenu(id) {
  openMenuId.value = openMenuId.value === id ? null : id
}

function viewRun(run) {
  openMenuId.value = null
}

function retryRun(run) {
  openMenuId.value = null
}

function handleClickOutside() {
  openMenuId.value = null
}

import { onMounted, onUnmounted } from 'vue'

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))

const executionHistory = ref([
  {
    id: 1,
    runId: '8842',
    batchId: 'BT-2023-Q4-M11',
    duration: '04m 12s',
    rowsReceived: '840K',
    rowsValid: '792K',
    rowsLoaded: '--',
    rowsRejected: 1200,
    qualityScore: 99.2,
    qualityClass: 'good',
    status: 'COMPLETED',
    statusClass: 'completed'
  },
  {
    id: 2,
    runId: '8841',
    batchId: 'BT-2023-Q4-M10',
    duration: '12m 08s',
    rowsReceived: '1.1M',
    rowsValid: '1.09M',
    rowsLoaded: '1.09M',
    rowsRejected: 1100,
    qualityScore: 99.5,
    qualityClass: 'good',
    status: 'COMPLETED',
    statusClass: 'completed'
  },
  {
    id: 3,
    runId: '8840',
    batchId: 'BT-2023-Q4-M09',
    duration: '18m 45s',
    rowsReceived: '980K',
    rowsValid: '890K',
    rowsLoaded: '890K',
    rowsRejected: 90000,
    qualityScore: 91.2,
    qualityClass: 'warning',
    status: 'FAILED',
    statusClass: 'failed'
  },
  {
    id: 4,
    runId: '8839',
    batchId: 'BT-2023-Q4-M08',
    duration: '10m 15s',
    rowsReceived: '1.05M',
    rowsValid: '1.04M',
    rowsLoaded: '1.04M',
    rowsRejected: 500,
    qualityScore: 99.8,
    qualityClass: 'good',
    status: 'COMPLETED',
    statusClass: 'completed'
  }
])
</script>

<style scoped>
.absa-etl-run-history {
  min-height: 100vh;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
}

/* ═══ Content Area ═══ */
.absa-etl-content {
  max-width: 1600px;
  margin: 0 auto;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  flex: 1;
}

/* ═══ Page Header ═══ */
.absa-etl-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-bottom: 4px;
}

.absa-etl-breadcrumb {
  display: flex;
  align-items: center;
  gap: 0;
  margin-bottom: 8px;
}

.absa-etl-breadcrumb span {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #5d3f3f;
  letter-spacing: 0.6px;
  line-height: 16px;
}

.absa-etl-breadcrumb--active {
  color: #77021e !important;
  font-weight: 700 !important;
}

.absa-etl-breadcrumb svg {
  margin: 0 4px;
}

.absa-etl-header__title {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #191c1d;
  letter-spacing: -0.32px;
  line-height: 40px;
  margin: 0;
}

.absa-etl-header__title--red {
  color: #dc0037;
}

.absa-etl-header__actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.absa-etl-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 17px;
  border-radius: 2px;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  cursor: pointer;
  transition: all 150ms ease;
  white-space: nowrap;
}

.absa-etl-btn--outline {
  border: 1px solid #dc0037;
  background: transparent;
  color: #191c1d;
}

.absa-etl-btn--outline:hover {
  background: rgba(220, 0, 55, 0.04);
}

.absa-etl-btn--primary {
  border: none;
  background: #77021e;
  color: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}

.absa-etl-btn--primary:hover {
  opacity: 0.9;
}

/* ═══ Bento Grid ═══ */
.absa-etl-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 355px;
  gap: 24px;
}

/* ═══ System Health Cards ═══ */
.absa-etl-health-cards {
  grid-column: 1 / span 4;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.absa-etl-health-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border: 1px solid #e7bcbc;
  border-radius: 4px;
  padding: 29.83px 21px;
}

.absa-etl-health-card__body {
  display: flex;
  align-items: center;
  gap: 16px;
}

.absa-etl-health-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5d3f3f;
}

.absa-etl-health-card__label {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #5d3f3f;
  letter-spacing: 0.6px;
  line-height: 16px;
}

.absa-etl-health-card__value {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: #191c1d;
  line-height: 32px;
}

.absa-etl-health-card__status {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.absa-etl-health-card__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.absa-etl-health-card__dot--green {
  background: #4caf50;
}

.absa-etl-health-card__dot--amber {
  background: #ffc107;
}

.absa-etl-health-card__stat {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 10px;
  font-weight: 700;
  line-height: 15px;
}

.absa-etl-health-card__stat--green {
  color: #4caf50;
}

.absa-etl-health-card__stat--amber {
  color: #ffc107;
}

/* ═══ Quality Score Trend ═══ */
.absa-etl-quality {
  grid-column: 5 / span 8;
  background: #fff;
  border: 1px solid #e7bcbc;
  border-radius: 4px;
  position: relative;
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.absa-etl-quality__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.absa-etl-quality__title {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: #191c1d;
  line-height: 32px;
  margin: 0;
}

.absa-etl-quality__toggles {
  display: flex;
  align-items: center;
  gap: 0;
}

.absa-etl-quality__toggle {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 10px;
  font-weight: 700;
  color: #5d3f3f;
  padding: 4px 8px;
  border-radius: 2px;
  cursor: pointer;
  line-height: 15px;
}

.absa-etl-quality__toggle--active {
  background: rgba(174, 0, 41, 0.1);
  color: #ae0029;
}

.absa-etl-quality__chart {
  flex: 1;
  display: flex;
  align-items: flex-end;
  padding: 16px 0;
  min-height: 200px;
}

.absa-etl-quality__bars {
  display: flex;
  align-items: flex-end;
  gap: 0;
  width: 100%;
  height: 168px;
}

.absa-etl-quality__bar {
  flex: 1;
  min-width: 0;
}

.absa-etl-quality__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #e7bcbc;
  padding-top: 17px;
}

.absa-etl-quality__score {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #5d3f3f;
  letter-spacing: 0.6px;
  line-height: 16px;
}

.absa-etl-quality__score strong {
  font-weight: 400;
  color: #191c1d;
}

.absa-etl-quality__dot {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background: #ae0029;
}

.absa-etl-quality__scan {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #5d3f3f;
  letter-spacing: 0.6px;
  line-height: 16px;
}

/* ═══ Execution History Table Section ═══ */
.absa-etl-table-section {
  background: #fff;
  border: 1px solid #e7bcbc;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.absa-etl-table-section__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px 17px;
  background: #f3f4f5;
  border-bottom: 1px solid #e7bcbc;
}

.absa-etl-table-section__title {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #191c1d;
  line-height: 28px;
  margin: 0;
}

.absa-etl-table-section__filter {
  display: flex;
  align-items: center;
  gap: 8px;
}

.absa-etl-table-section__filter-label {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #5d3f3f;
  letter-spacing: 0.6px;
  line-height: 16px;
}

.absa-etl-table-section__dropdown {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  border: 1px solid #e7bcbc;
  border-radius: 2px;
  padding: 5px 9px;
  cursor: pointer;
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #191c1d;
  letter-spacing: 0.6px;
  line-height: 16px;
}

.absa-etl-table-wrap {
  overflow-x: auto;
}

.absa-etl-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.825rem;
}

.absa-etl-table thead th {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #5d3f3f;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  text-align: left;
  padding: 24px 24px 24.5px;
  background: #f3f4f5;
  border-bottom: 1px solid #e7bcbc;
  white-space: nowrap;
}

.absa-etl-table tbody tr {
  border-bottom: 1px solid #e7bcbc;
}

.absa-etl-table tbody tr:last-child {
  border-bottom: none;
}

.absa-etl-table tbody td {
  padding: 16px 24px;
  vertical-align: middle;
}

.absa-etl-table__run-id {
  display: flex;
  align-items: center;
  gap: 16px;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #ae0029;
  line-height: 24px;
}

.absa-etl-table__run-divider {
  width: 1.39px;
  height: 32px;
  border-radius: 0;
  flex-shrink: 0;
}

.absa-etl-table__run-divider--completed {
  background: #ae0029;
}

.absa-etl-table__run-divider--failed {
  background: #dc2626;
}

.absa-etl-table__run-divider--running {
  background: #2563eb;
}

.absa-etl-table__run-text {
  white-space: nowrap;
}

.absa-etl-table__batch {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #191c1d;
  line-height: 20px;
  white-space: nowrap;
}

.absa-etl-table__duration {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 14px;
  font-style: italic;
  font-weight: 400;
  color: #5d3f3f;
  line-height: 20px;
  white-space: nowrap;
}

.absa-etl-table__rows {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #191c1d;
  letter-spacing: 0.6px;
  line-height: 16px;
  white-space: nowrap;
}

.absa-etl-table__sep {
  color: #5d3f3f;
}

.absa-etl-table__valid {
  color: #191c1d;
}

.absa-etl-table__rejected {
  font-weight: 700;
}

.absa-etl-table__rejected--warn {
  color: #ba1a1a;
}

.absa-etl-table__quality {
  display: flex;
  align-items: center;
  gap: 8px;
}

.absa-etl-table__quality-bar {
  width: 60px;
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
}

.absa-etl-table__quality-fill {
  height: 100%;
  border-radius: 3px;
}

.absa-etl-table__quality-fill--good {
  background: #16a34a;
}

.absa-etl-table__quality-fill--warning {
  background: #f59e0b;
}

.absa-etl-table__quality-val {
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
}

.absa-etl-table__quality-val--good {
  color: #16a34a;
}

.absa-etl-table__quality-val--warning {
  color: #d97706;
}

.absa-etl-table__status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.6px;
  padding: 6px 12px;
  border-radius: 4px;
  white-space: nowrap;
}

.absa-etl-table__status--completed {
  background: #dcfce7;
  color: #16a34a;
}

.absa-etl-table__status--running {
  background: #dbeafe;
  color: #2563eb;
}

.absa-etl-table__status--failed {
  background: #fee2e2;
  color: #dc2626;
}

.absa-etl-table__status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.absa-etl-table__status-dot--completed {
  background: #16a34a;
}

.absa-etl-table__status-dot--running {
  background: #2563eb;
  animation: absaPulse 1.5s ease-in-out infinite;
}

.absa-etl-table__status-dot--failed {
  background: #dc2626;
}

@keyframes absaPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.absa-etl-table__action-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #5d3f3f;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.absa-etl-table__action-btn:hover {
  color: #dc0037;
}

.absa-etl-table__action-cell {
  position: relative;
}

.absa-etl-table__action-wrap {
  position: relative;
  display: inline-block;
}

.absa-etl-table__dropdown {
  position: absolute;
  right: 0;
  top: 100%;
  z-index: 20;
  background: #fff;
  border: 1px solid #e7bcbc;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 120px;
  padding: 4px 0;
  margin-top: 4px;
}

.absa-etl-table__dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 16px;
  border: none;
  background: none;
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #191c1d;
  cursor: pointer;
  text-align: left;
  transition: background 0.1s ease;
}

.absa-etl-table__dropdown-item:hover {
  background: #f8f9fa;
  color: #dc0037;
}

/* ═══ Pagination ═══ */
.absa-etl-table-section__pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  border-top: 1px solid #e7bcbc;
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 12px;
  color: #5d3f3f;
  line-height: 16px;
}

.absa-etl-table-section__page-btns {
  display: flex;
  gap: 4px;
}

.absa-etl-table-section__page-btn,
.absa-etl-table-section__page-nav {
  min-width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e7bcbc;
  border-radius: 2px;
  background: #fff;
  color: #5d3f3f;
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 150ms ease;
}

.absa-etl-table-section__page-btn:hover,
.absa-etl-table-section__page-nav:hover {
  border-color: #dc0037;
  color: #dc0037;
}

.absa-etl-table-section__page-btn:disabled,
.absa-etl-table-section__page-nav:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.absa-etl-table-section__page-btn--active {
  background: #dc0037 !important;
  color: #fff !important;
  border-color: #dc0037 !important;
}

.absa-etl-table-section__page-nav {
  border: none;
  background: none;
}

/* ═══ Bottom Detail Cards ═══ */
.absa-etl-bottom-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.absa-etl-bottom-card {
  background: #fff;
  border: 1px solid #e7bcbc;
  border-radius: 4px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.absa-etl-bottom-card__label {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #5d3f3f;
  letter-spacing: 0.6px;
  line-height: 16px;
}

.absa-etl-bottom-card__value {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: #191c1d;
  line-height: 32px;
}

.absa-etl-bottom-card__trend {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 4px;
}

.absa-etl-bottom-card__trend-up {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #4caf50;
  line-height: 16px;
}

.absa-etl-bottom-card__trend-down {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #ba1a1a;
  line-height: 16px;
}

.absa-etl-bottom-card__trend-warn {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #ffc107;
  line-height: 16px;
}

.absa-etl-bottom-card__progress {
  height: 4px;
  background: #e7bcbc;
  border-radius: 2px;
  overflow: hidden;
  margin: 4px 0;
}

.absa-etl-bottom-card__progress-fill {
  height: 100%;
  background: #dc0037;
  border-radius: 2px;
}

.absa-etl-bottom-card__sub {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 10px;
  font-weight: 400;
  color: #5d3f3f;
  line-height: 15px;
}

.absa-etl-bottom-card__chart {
  display: flex;
  align-items: flex-end;
  gap: 4px;
  height: 40px;
  margin: 4px 0;
}

.absa-etl-bottom-card__chart-bar {
  flex: 1;
  background: #ae0029;
  border-radius: 1px;
  min-height: 4px;
}

.absa-etl-bottom-card__badges {
  display: flex;
  gap: 0;
  margin: 4px 0;
}

.absa-etl-bottom-card__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 10px;
  font-weight: 700;
  color: #fff;
  line-height: 15px;
}

.absa-etl-bottom-card__badge:last-child {
  margin-left: -8px;
}

.absa-etl-bottom-card__badge--dark {
  background: #0b1c30;
}

.absa-etl-bottom-card__badge--red {
  background: #dc0037;
}

.absa-etl-bottom-card__bar {
  height: 32px;
  background: rgba(255, 193, 7, 0.1);
  border-radius: 2px;
  overflow: hidden;
  margin: 4px 0;
  position: relative;
}

.absa-etl-bottom-card__bar-fill {
  height: 100%;
  background: rgba(255, 193, 7, 0.4);
  border-right: 2px solid #ffc107;
  border-radius: 2px;
}

/* ═══ Responsive ═══ */
@media (max-width: 1200px) {
  .absa-etl-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }

  .absa-etl-health-cards {
    grid-column: 1;
  }

  .absa-etl-quality {
    grid-column: 1;
  }

}

@media (max-width: 768px) {
  .absa-etl-content {
    padding: 16px;
  }

  .absa-etl-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .absa-etl-health-cards {
    grid-column: 1;
  }

  .absa-etl-quality {
    grid-column: 1;
  }

  .absa-etl-bottom-cards {
    grid-template-columns: 1fr;
  }
}
</style>
