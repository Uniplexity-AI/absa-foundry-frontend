<template>
  <div class="absa-bm-dashboard">
    <!-- Breadcrumb -->
    <div class="absa-bm__breadcrumb">
      <span>Home</span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      <span>Branch Management</span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      <span class="absa-bm__breadcrumb-current">Branch Manager Dashboard</span>
    </div>

    <!-- Header -->
    <div class="absa-bm__header">
      <div>
        <h1 class="absa-bm__title">Branch Manager Dashboard</h1>
        <p class="absa-bm__subtitle">{{ currentBranch }} &bull; {{ currentDate }}</p>
      </div>
      <div class="absa-bm__header-right">
        <div class="absa-bm__search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" placeholder="Search RM, customer or account..." class="absa-bm__search-input" />
        </div>
        <div class="absa-bm__user">
          <div class="absa-bm__avatar">SB</div>
          <div class="absa-bm__user-info">
            <span class="absa-bm__user-name">S. Bwalya</span>
            <span class="absa-bm__user-role">Branch Manager</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══ Branch KPI Cards ═══ -->
    <div class="absa-bm__kpi-grid">
      <div class="absa-metric-bg absa-bm__kpi absa-accent-left-critical">
        <div class="absa-bm__kpi-header">
          <span class="absa-bm__kpi-badge">AGGREGATE</span>
          <div class="absa-bm__kpi-icon absa-bm__kpi-icon--red">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
        </div>
        <div class="absa-bm__kpi-value absa-bm__kpi-value--critical">14.2%</div>
        <div class="absa-bm__kpi-label">Aggregate At Risk</div>
        <div class="absa-bm__kpi-comp">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
          +1.8% vs last month
        </div>
      </div>

      <div class="absa-metric-bg absa-bm__kpi absa-accent-left-info">
        <div class="absa-bm__kpi-header">
          <span class="absa-bm__kpi-badge">DORMANT</span>
          <div class="absa-bm__kpi-icon absa-bm__kpi-icon--blue">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          </div>
        </div>
        <div class="absa-bm__kpi-value">328</div>
        <div class="absa-bm__kpi-label">Dormant Accounts</div>
        <div class="absa-bm__kpi-comp absa-bm__kpi-comp--neutral">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Stable across 3 periods
        </div>
      </div>

      <div class="absa-metric-bg absa-bm__kpi absa-accent-left-success">
        <div class="absa-bm__kpi-header">
          <span class="absa-bm__kpi-badge">CHURN</span>
          <div class="absa-bm__kpi-icon absa-bm__kpi-icon--green">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          </div>
        </div>
        <div class="absa-bm__kpi-value absa-bm__kpi-value--success">0.84%</div>
        <div class="absa-bm__kpi-label">Monthly Churn Rate</div>
        <div class="absa-bm__kpi-comp absa-bm__kpi-comp--down">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>
          -0.3% vs last month
        </div>
      </div>
    </div>

    <!-- ═══ RM Performance Table ═══ -->
    <div class="absa-bm__section">
      <div class="absa-bm__section-header">
        <h2 class="absa-bm__section-title">Relationship Manager Performance</h2>
        <span class="absa-bm__section-period">{{ currentPeriod }}</span>
      </div>
      <div class="absa-bm__table-wrap">
        <table class="absa-bm__table">
          <thead class="absa-table-header">
            <tr>
              <th>RM Name</th>
              <th>Portfolio Size</th>
              <th>At Risk %</th>
              <th>Actions (Month)</th>
              <th>Avg Health</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="rm in rmPerformance" :key="rm.name">
              <td>
                <div class="absa-bm__rm-cell">
                  <div class="absa-bm__rm-avatar">{{ rm.initials }}</div>
                  <span class="absa-bm__rm-name">{{ rm.name }}</span>
                </div>
              </td>
              <td class="absa-bm__table-val">{{ rm.portfolioSize }}</td>
              <td>
                <span class="absa-bm__risk-pill" :class="'absa-bm__risk-pill--' + rm.riskClass">{{ rm.atRiskPct }}%</span>
              </td>
              <td>
                <div class="absa-bm__actions-info">
                  <span class="absa-bm__actions-count">{{ rm.actionsLogged }}</span>
                  <span class="absa-bm__actions-target">/ {{ rm.actionsTarget }} target</span>
                </div>
                <div class="absa-bm__actions-bar">
                  <div class="absa-bm__actions-fill" :style="{ width: (rm.actionsLogged / rm.actionsTarget * 100) + '%' }"></div>
                </div>
              </td>
              <td>
                <div class="absa-bm__health">
                  <div class="absa-bm__health-bar">
                    <div class="absa-bm__health-fill" :class="'absa-bm__health-fill--' + rm.healthClass" :style="{ width: rm.avgHealth + '%' }"></div>
                  </div>
                  <span class="absa-bm__health-val" :class="'absa-bm__health-val--' + rm.healthClass">{{ rm.avgHealth }}</span>
                </div>
              </td>
              <td>
                <span class="absa-bm__status-pill" :class="'absa-bm__status-pill--' + rm.statusClass">{{ rm.status }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ═══ Bottom Row: Churn Forecast + Segment ═══ -->
    <div class="absa-bm__bottom-grid">
      <!-- Churn Forecast Chart -->
      <div class="absa-chart-container">
        <div class="absa-bm__chart-header">
          <h3 class="absa-bm__chart-title">Churn Forecast Prediction</h3>
          <span class="absa-bm__chart-period">Next 6 Weeks</span>
        </div>
        <div class="absa-bm__chart-body">
          <div class="absa-bm__bar-chart">
            <div class="absa-bm__bar-item" v-for="bar in churnForecast" :key="bar.week">
              <div class="absa-bm__bar-val">{{ bar.count }}</div>
              <div class="absa-bm__bar-wrap">
                <div class="absa-bm__bar" :style="{ height: (bar.count / maxForecast * 100) + '%' }" :class="bar.count > 5 ? 'absa-bm__bar--critical' : 'absa-bm__bar--warning'"></div>
              </div>
              <div class="absa-bm__bar-label">{{ bar.week }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Predicted Churn by Segment -->
      <div class="absa-chart-container">
        <div class="absa-bm__chart-header">
          <h3 class="absa-bm__chart-title">Predicted Churn by Segment</h3>
        </div>
        <div class="absa-bm__segment-list">
          <div class="absa-bm__segment-item" v-for="seg in segments" :key="seg.name">
            <div class="absa-bm__segment-top">
              <span class="absa-bm__segment-name">{{ seg.name }}</span>
              <span class="absa-bm__segment-pct" :class="'absa-bm__segment-pct--' + seg.color">{{ seg.pct }}%</span>
            </div>
            <div class="absa-bm__segment-bar">
              <div class="absa-bm__segment-fill" :class="'absa-bm__segment-fill--' + seg.color" :style="{ width: seg.pct + '%' }"></div>
            </div>
            <div class="absa-bm__segment-count">{{ seg.customers }} customers at risk</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentBranch = ref('Lusaka Main Branch')
const currentDate = ref(new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }))
const currentPeriod = ref('July 2026')

const rmPerformance = ref([
  { name: 'Sarah Dlamini', initials: 'SD', portfolioSize: 312, atRiskPct: 18.2, riskClass: 'high', actionsLogged: 42, actionsTarget: 50, avgHealth: 58, healthClass: 'warning', status: 'Needs Review', statusClass: 'warning' },
  { name: 'Thabo Cele', initials: 'TC', portfolioSize: 285, atRiskPct: 12.8, riskClass: 'mid', actionsLogged: 38, actionsTarget: 45, avgHealth: 64, healthClass: 'warning', status: 'On Track', statusClass: 'good' },
  { name: 'Linda Smith', initials: 'LS', portfolioSize: 298, atRiskPct: 8.5, riskClass: 'low', actionsLogged: 31, actionsTarget: 40, avgHealth: 76, healthClass: 'good', status: 'Good', statusClass: 'good' }
])

const churnForecast = ref([
  { week: 'W01', count: 3 }, { week: 'W02', count: 5 },
  { week: 'W03', count: 8 }, { week: 'W04', count: 6 },
  { week: 'W05', count: 4 }, { week: 'W06', count: 2 }
])

const maxForecast = computed(() => Math.max(...churnForecast.value.map(b => b.count), 1))

const segments = ref([
  { name: 'Premium', pct: 12, customers: 24, color: 'critical' },
  { name: 'Mass Market', pct: 45, customers: 142, color: 'warning' },
  { name: 'SME', pct: 28, customers: 88, color: 'info' },
  { name: 'Student/Youth', pct: 15, customers: 74, color: 'success' }
])
</script>

<style scoped>
/* ═══ Branch Manager Dashboard ═══ */
.absa-bm-dashboard { }

.absa-bm__breadcrumb {
  display: flex; align-items: center; gap: 6px;
  font-size: 0.7rem; font-weight: 600; color: #9CA3AF;
  margin-bottom: 14px; font-family: 'Space Mono', monospace;
}

.absa-bm__breadcrumb-current { color: #BE0F2C; }

/* Header */
.absa-bm__header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 24px; flex-wrap: wrap; gap: 12px;
}

.absa-bm__title { font-size: 1.5rem; font-weight: 900; color: #111827; margin: 0; letter-spacing: -0.02em; }
.absa-bm__subtitle { font-size: 0.75rem; color: #9CA3AF; margin: 2px 0 0 0; font-family: 'Space Mono', monospace; }

.absa-bm__header-right { display: flex; align-items: center; gap: 16px; }

.absa-bm__search {
  display: flex; align-items: center; gap: 8px;
  background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 8px;
  padding: 7px 14px; color: #9CA3AF; width: 320px;
}
.absa-bm__search-input { border: none; background: transparent; font-size: 0.75rem; color: #111827; outline: none; width: 100%; font-family: 'Space Mono', monospace; }
.absa-bm__search-input::placeholder { color: #9CA3AF; }

.absa-bm__user { display: flex; align-items: center; gap: 10px; }
.absa-bm__avatar {
  width: 36px; height: 36px; border-radius: 50%;
  background: linear-gradient(135deg, #BE0F2C, #8B0015);
  color: #FFF; font-size: 0.75rem; font-weight: 800;
  display: flex; align-items: center; justify-content: center;
}
.absa-bm__user-info { display: flex; flex-direction: column; line-height: 1.2; }
.absa-bm__user-name { font-size: 0.8rem; font-weight: 700; color: #111827; }
.absa-bm__user-role { font-size: 0.625rem; color: #9CA3AF; font-family: 'Space Mono', monospace; }

/* KPI Cards */
.absa-bm__kpi-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px;
}

.absa-bm__kpi { padding: 20px; }
.absa-bm__kpi-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
.absa-bm__kpi-badge {
  font-family: 'Space Mono', monospace; font-size: 0.55rem; font-weight: 800;
  color: #9CA3AF; background: #F3F4F6; padding: 2px 8px; border-radius: 4px; letter-spacing: 0.06em;
}
.absa-bm__kpi-icon { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
.absa-bm__kpi-icon--red { background: #FEE2E2; color: #DC2626; }
.absa-bm__kpi-icon--blue { background: #DBEAFE; color: #2563EB; }
.absa-bm__kpi-icon--green { background: #DCFCE7; color: #16A34A; }

.absa-bm__kpi-value { font-size: 1.75rem; font-weight: 900; color: #111827; letter-spacing: -0.02em; margin-bottom: 2px; }
.absa-bm__kpi-value--critical { color: #DC2626; }
.absa-bm__kpi-value--success { color: #16A34A; }
.absa-bm__kpi-label { font-family: 'Space Mono', monospace; font-size: 0.6rem; font-weight: 700; color: #9CA3AF; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 8px; }

.absa-bm__kpi-comp { display: flex; align-items: center; gap: 4px; font-size: 0.625rem; font-weight: 700; font-family: 'Space Mono', monospace; color: #DC2626; }
.absa-bm__kpi-comp--down { color: #16A34A; }
.absa-bm__kpi-comp--neutral { color: #6B7280; }

/* Sections */
.absa-bm__section { margin-bottom: 24px; }
.absa-bm__section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
.absa-bm__section-title { font-size: 1rem; font-weight: 800; color: #111827; margin: 0; }
.absa-bm__section-period { font-family: 'Space Mono', monospace; font-size: 0.6rem; font-weight: 700; color: #BE0F2C; background: #FDE8EC; padding: 3px 10px; border-radius: 999px; }

/* Table */
.absa-bm__table-wrap { background: #FFF; border: 1px solid #E8E8EC; border-radius: 12px; overflow: hidden; }
.absa-bm__table { width: 100%; border-collapse: collapse; font-size: 0.75rem; }
.absa-bm__table th { font-family: 'Space Mono', monospace; font-size: 0.6rem; font-weight: 800; color: #9CA3AF; letter-spacing: 0.06em; text-align: left; padding: 12px 20px; }
.absa-bm__table td { padding: 14px 20px; border-bottom: 1px solid #F3F4F6; vertical-align: middle; }
.absa-bm__table tbody tr:hover { background: #F9FAFB; }

.absa-bm__rm-cell { display: flex; align-items: center; gap: 10px; }
.absa-bm__rm-avatar { width: 32px; height: 32px; border-radius: 8px; background: #FDE8EC; color: #BE0F2C; font-weight: 800; font-size: 0.7rem; display: flex; align-items: center; justify-content: center; }
.absa-bm__rm-name { font-weight: 700; color: #111827; }
.absa-bm__table-val { font-weight: 700; color: #111827; }

/* Risk Pills */
.absa-bm__risk-pill {
  font-family: 'Space Mono', monospace; font-size: 0.625rem; font-weight: 800;
  padding: 3px 10px; border-radius: 999px; letter-spacing: 0.04em;
}
.absa-bm__risk-pill--high { background: #FEE2E2; color: #DC2626; }
.absa-bm__risk-pill--mid { background: #FEF3C7; color: #D97706; }
.absa-bm__risk-pill--low { background: #DCFCE7; color: #16A34A; }

/* Actions */
.absa-bm__actions-info { display: flex; align-items: baseline; gap: 4px; margin-bottom: 4px; }
.absa-bm__actions-count { font-weight: 800; font-size: 0.8rem; color: #111827; }
.absa-bm__actions-target { font-size: 0.6rem; color: #9CA3AF; font-family: 'Space Mono', monospace; }
.absa-bm__actions-bar { height: 4px; background: #E5E7EB; border-radius: 2px; overflow: hidden; }
.absa-bm__actions-fill { height: 100%; background: linear-gradient(90deg, #BE0F2C, #8B0015); border-radius: 2px; transition: width 0.3s; }

/* Health */
.absa-bm__health { display: flex; align-items: center; gap: 8px; }
.absa-bm__health-bar { width: 60px; height: 6px; background: #E5E7EB; border-radius: 3px; overflow: hidden; }
.absa-bm__health-fill { height: 100%; border-radius: 3px; }
.absa-bm__health-fill--good { background: #16A34A; }
.absa-bm__health-fill--warning { background: #F59E0B; }
.absa-bm__health-fill--critical { background: #DC2626; }
.absa-bm__health-val { font-weight: 800; font-size: 0.75rem; }
.absa-bm__health-val--good { color: #16A34A; }
.absa-bm__health-val--warning { color: #D97706; }
.absa-bm__health-val--critical { color: #DC2626; }

/* Status */
.absa-bm__status-pill {
  font-family: 'Space Mono', monospace; font-size: 0.6rem; font-weight: 800;
  padding: 4px 10px; border-radius: 6px; letter-spacing: 0.04em;
}
.absa-bm__status-pill--good { background: #DCFCE7; color: #16A34A; }
.absa-bm__status-pill--warning { background: #FEF3C7; color: #D97706; }

/* Bottom Grid */
.absa-bm__bottom-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; }

/* Chart Header */
.absa-bm__chart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.absa-bm__chart-title { font-size: 0.85rem; font-weight: 800; color: #111827; margin: 0; }
.absa-bm__chart-period { font-family: 'Space Mono', monospace; font-size: 0.575rem; font-weight: 700; color: #BE0F2C; }

/* Bar Chart */
.absa-bm__chart-body { padding: 0 8px; }
.absa-bm__bar-chart { display: flex; align-items: flex-end; justify-content: center; gap: 20px; height: 180px; }
.absa-bm__bar-item { display: flex; flex-direction: column; align-items: center; gap: 6px; flex: 1; max-width: 48px; }
.absa-bm__bar-val { font-size: 0.65rem; font-weight: 800; color: #6B7280; font-family: 'Space Mono', monospace; }
.absa-bm__bar-wrap { flex: 1; width: 100%; display: flex; align-items: flex-end; }
.absa-bm__bar { width: 100%; border-radius: 4px 4px 0 0; min-height: 4px; transition: height 0.3s; }
.absa-bm__bar--critical { background: linear-gradient(180deg, #DC2626, #BE0F2C); }
.absa-bm__bar--warning { background: linear-gradient(180deg, #F59E0B, #D97706); }
.absa-bm__bar-label { font-family: 'Space Mono', monospace; font-size: 0.575rem; font-weight: 700; color: #9CA3AF; }

/* Segments */
.absa-bm__segment-list { display: flex; flex-direction: column; gap: 16px; }
.absa-bm__segment-item { }
.absa-bm__segment-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
.absa-bm__segment-name { font-size: 0.75rem; font-weight: 700; color: #111827; }
.absa-bm__segment-pct { font-size: 0.75rem; font-weight: 800; }
.absa-bm__segment-pct--critical { color: #DC2626; }
.absa-bm__segment-pct--warning { color: #D97706; }
.absa-bm__segment-pct--info { color: #2563EB; }
.absa-bm__segment-pct--success { color: #16A34A; }
.absa-bm__segment-bar { height: 8px; background: #E5E7EB; border-radius: 4px; overflow: hidden; }
.absa-bm__segment-fill { height: 100%; border-radius: 4px; }
.absa-bm__segment-fill--critical { background: #DC2626; }
.absa-bm__segment-fill--warning { background: #F59E0B; }
.absa-bm__segment-fill--info { background: #2563EB; }
.absa-bm__segment-fill--success { background: #16A34A; }
.absa-bm__segment-count { font-family: 'Space Mono', monospace; font-size: 0.575rem; color: #9CA3AF; margin-top: 4px; }

/* ═══ Responsive ═══ */
@media (max-width: 1200px) {
  .absa-bm__bottom-grid { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .absa-bm__kpi-grid { grid-template-columns: 1fr; }
  .absa-bm__header { flex-direction: column; align-items: flex-start; }
  .absa-bm__search { width: 100%; }
}
</style>
