<template>
  <div class="absa-bm">
    <div class="absa-bm-content">
      <!-- Breadcrumb -->
      <div class="absa-bm-breadcrumb">
        <span>Home</span>
        <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="#5d3f3f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <span class="absa-bm-breadcrumb--active">Dashboard</span>
      </div>

      <!-- Subtitle -->
      <div class="absa-bm-subtitle">Ranked 4th of 22 branches</div>

      <!-- Section 1: Top KPIs -->
      <div class="absa-bm-kpi-grid">
        <div class="absa-bm-kpi">
          <div class="absa-bm-kpi__top">
            <div>
              <div class="absa-bm-kpi__label">AGGREGATE AT RISK %</div>
              <div class="absa-bm-kpi__value absa-bm-kpi__value--red">14.2%</div>
            </div>
            <div class="absa-bm-kpi__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#dc0037" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
          </div>
          <div class="absa-bm-kpi__trend">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M4 0l4 5H0z" fill="#4caf50"/></svg>
            <span class="absa-bm-kpi__trend-up">2.1%</span>
            <span class="absa-bm-kpi__trend-label">vs last month</span>
          </div>
          <div class="absa-bm-kpi__bar">
            <div class="absa-bm-kpi__bar-fill absa-bm-kpi__bar-fill--red" style="width: 14.2%"></div>
          </div>
        </div>

        <div class="absa-bm-kpi">
          <div class="absa-bm-kpi__top">
            <div>
              <div class="absa-bm-kpi__label">DORMANT ACCOUNTS</div>
              <div class="absa-bm-kpi__value">328</div>
            </div>
            <div class="absa-bm-kpi__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#dc0037" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
          </div>
          <div class="absa-bm-kpi__trend">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M0 0l4 5 4-5H0z" fill="#920021"/></svg>
            <span class="absa-bm-kpi__trend-down">12 cases</span>
            <span class="absa-bm-kpi__trend-label">re-activated</span>
          </div>
          <div class="absa-bm-kpi__bar">
            <div class="absa-bm-kpi__bar-fill absa-bm-kpi__bar-fill--dormant" style="width: 45%"></div>
          </div>
        </div>

        <div class="absa-bm-kpi">
          <div class="absa-bm-kpi__top">
            <div>
              <div class="absa-bm-kpi__label">MONTHLY CHURN RATE</div>
              <div class="absa-bm-kpi__value">0.84%</div>
            </div>
            <div class="absa-bm-kpi__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#dc0037" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            </div>
          </div>
          <div class="absa-bm-kpi__trend">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M0 0l4 5 4-5H0z" fill="#920021"/></svg>
            <span class="absa-bm-kpi__trend-down">0.12%</span>
            <span class="absa-bm-kpi__trend-label">well within 1.5% target</span>
          </div>
          <div class="absa-bm-kpi__bar">
            <div class="absa-bm-kpi__bar-fill absa-bm-kpi__bar-fill--churn" style="width: 25%"></div>
          </div>
        </div>
      </div>

      <!-- Section 2: Team Performance Table -->
      <div class="absa-bm-table-section">
        <div class="absa-bm-table-section__header">
          <h3 class="absa-bm-table-section__title">Relationship Manager Performance</h3>
          <div class="absa-bm-table-section__actions">
            <button class="absa-bm-btn absa-bm-btn--outline">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>
              Filter
            </button>
            <button class="absa-bm-btn absa-bm-btn--primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Export Report
            </button>
          </div>
        </div>
        <div class="absa-bm-table-wrap">
          <table class="absa-bm-table">
            <thead>
              <tr>
                <th>RELATIONSHIP MANAGER</th>
                <th>PORTFOLIO SIZE</th>
                <th>AT RISK %</th>
                <th>ACTIONS LOGGED (MOM)</th>
                <th>AVG HEALTH SCORE</th>
                <th class="absa-bm-table__th-center">TREND</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="rm in teamMembers" :key="rm.name">
                <td>
                  <div class="absa-bm-table__rm">
                    <div class="absa-bm-table__divider" :class="'absa-bm-table__divider--' + rm.color"></div>
                    <div>
                      <div class="absa-bm-table__rm-name">{{ rm.name }}</div>
                      <div class="absa-bm-table__rm-dept">{{ rm.dept }}</div>
                    </div>
                  </div>
                </td>
                <td class="absa-bm-table__cell">{{ rm.portfolio }}</td>
                <td>
                  <span class="absa-bm-table__at-risk" :class="'absa-bm-table__at-risk--' + rm.riskColor">{{ rm.atRisk }}</span>
                </td>
                <td class="absa-bm-table__cell">{{ rm.actionsLogged }} <span class="absa-bm-table__target">/ {{ rm.actionsTarget }} target</span></td>
                <td>
                  <div class="absa-bm-table__health">
                    <div class="absa-bm-table__health-bar">
                      <div class="absa-bm-table__health-fill" :class="'absa-bm-table__health-fill--' + rm.healthColor" :style="{ width: rm.healthScore + '%' }"></div>
                    </div>
                    <span class="absa-bm-table__health-val">{{ rm.healthScore }}</span>
                  </div>
                </td>
                <td class="absa-bm-table__td-center">
                  <div class="absa-bm-table__sparkline">
                    <svg width="60" height="30" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <polyline :points="rm.sparkline" fill="none" :stroke="rm.sparkColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Section 3: Churn Forecast (Bento 3:1) -->
      <div class="absa-bm-churn-grid">
        <!-- Main Chart -->
        <div class="absa-bm-chart">
          <div class="absa-bm-chart__header">
            <div>
              <h3 class="absa-bm-chart__title">Churn Forecast Prediction</h3>
              <p class="absa-bm-chart__subtitle">Projected customer exits based on transactional AI patterns</p>
            </div>
            <div class="absa-bm-chart__toggles">
              <span class="absa-bm-chart__toggle absa-bm-chart__toggle--active">30 Days</span>
              <span class="absa-bm-chart__toggle">60 Days</span>
              <span class="absa-bm-chart__toggle">90 Days</span>
            </div>
          </div>
          <div class="absa-bm-chart__viz">
            <div class="absa-bm-chart__bars">
              <div class="absa-bm-chart__bar-col" v-for="(bar, i) in forecastBars" :key="i">
                <span class="absa-bm-chart__bar-label">{{ bar.value }}</span>
                <div class="absa-bm-chart__bar" :style="{ height: bar.height + 'px' }">
                  <div class="absa-bm-chart__bar-fill" :style="{ height: bar.fill + '%' }"></div>
                </div>
              </div>
            </div>
            <div class="absa-bm-chart__axis">
              <span v-for="wk in weekLabels" :key="wk">{{ wk }}</span>
            </div>
          </div>
        </div>

        <!-- AI Insight Panel -->
        <div class="absa-bm-ai-card">
          <div class="absa-bm-ai-card__bg"></div>
          <div class="absa-bm-ai-card__content">
            <div class="absa-bm-ai-card__heading">PREDICTED CHURN BY<br/>SEGMENT</div>
            <div class="absa-bm-ai-card__segments">
              <div class="absa-bm-ai-card__segment" v-for="seg in churnSegments" :key="seg.label">
                <div class="absa-bm-ai-card__segment-top">
                  <span class="absa-bm-ai-card__segment-label">{{ seg.label }}</span>
                  <span class="absa-bm-ai-card__segment-pct">{{ seg.pct }}%</span>
                </div>
                <div class="absa-bm-ai-card__segment-bar">
                  <div class="absa-bm-ai-card__segment-fill" :style="{ width: seg.pct + '%' }"></div>
                </div>
              </div>
            </div>
            <div class="absa-bm-ai-card__insight">
              <p class="absa-bm-ai-card__insight-text">"Corporate Plus<br/>accounts show high<br/>sensitivity to interest<br/>rate fluctuations.<br/>Recommended<br/>review of fee<br/>structures."</p>
              <span class="absa-bm-ai-card__insight-label">AI INSIGHT ENGINE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const teamMembers = ref([
  {
    name: 'Sarah Dlamini',
    dept: 'Elite Banking',
    color: 'red',
    portfolio: '142 Accounts',
    atRisk: '18.4%',
    riskColor: 'high',
    actionsLogged: '42',
    actionsTarget: '50',
    healthScore: 72,
    healthColor: 'red',
    sparkColor: '#ae0029',
    sparkline: '0,25 10,18 20,22 30,10 40,15 50,8'
  },
  {
    name: 'Thabo Cele',
    dept: 'Commercial Banking',
    color: 'pink',
    portfolio: '88 Accounts',
    atRisk: '9.1%',
    riskColor: 'medium',
    actionsLogged: '56',
    actionsTarget: '45',
    healthScore: 88,
    healthColor: 'red',
    sparkColor: '#ae0029',
    sparkline: '0,20 10,15 20,18 30,8 40,12 50,5'
  },
  {
    name: 'Linda Smith',
    dept: 'SME Finance',
    color: 'grey',
    portfolio: '210 Accounts',
    atRisk: '12.5%',
    riskColor: 'low',
    actionsLogged: '38',
    actionsTarget: '40',
    healthScore: 65,
    healthColor: 'grey',
    sparkColor: '#5d3f3f',
    sparkline: '0,15 10,20 20,12 30,18 40,10 50,14'
  }
])

const forecastBars = ref([
  { value: '42', height: 195, fill: 80 },
  { value: '58', height: 225, fill: 70 },
  { value: '31', height: 135, fill: 90 },
  { value: '77', height: 270, fill: 60 },
  { value: '39', height: 165, fill: 85 },
  { value: '52', height: 210, fill: 75 }
])

const weekLabels = ref(['WK 01', 'WK 02', 'WK 03', 'WK 04', 'WK 05', 'WK 06'])

const churnSegments = ref([
  { label: 'Premier Banking', pct: 12 },
  { label: 'Corporate Plus', pct: 45 },
  { label: 'Retail Flex', pct: 28 },
  { label: 'Wealth Legacy', pct: 15 }
])
</script>

<style scoped>
.absa-bm {
  min-height: 100vh;
  background: #f8f9fa;
}

.absa-bm-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 1600px;
  margin: 0 auto;
  padding: 32px;
}

/* ═══ Breadcrumb ═══ */
.absa-bm-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
}

.absa-bm-breadcrumb span {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #5d3f3f;
  letter-spacing: 0.6px;
  line-height: 16px;
}

.absa-bm-breadcrumb--active {
  color: #77021e !important;
  font-weight: 700 !important;
}

/* ═══ Subtitle ═══ */
.absa-bm-subtitle {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 16px;
  font-weight: 200;
  color: #191c1d;
  letter-spacing: -0.32px;
  line-height: 40px;
  margin-top: -20px;
}

/* ═══ KPI Grid ═══ */
.absa-bm-kpi-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.absa-bm-kpi {
  background: #fff;
  border: 1px solid #e7bcbc;
  border-radius: 4px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.absa-bm-kpi__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.absa-bm-kpi__label {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #5d3f3f;
  letter-spacing: 1.2px;
  line-height: 16px;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.absa-bm-kpi__value {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #191c1d;
  letter-spacing: -0.32px;
  line-height: 40px;
}

.absa-bm-kpi__value--red {
  color: #ae0029;
}

.absa-bm-kpi__icon svg {
  display: block;
}

.absa-bm-kpi__trend {
  display: flex;
  align-items: center;
  gap: 4px;
}

.absa-bm-kpi__trend svg {
  display: flex;
  align-self: center;
  flex-shrink: 0;
}

.absa-bm-kpi__trend-up {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #4caf50;
  line-height: 16px;
}

.absa-bm-kpi__trend-down {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #920021;
  line-height: 16px;
}

.absa-bm-kpi__trend-label {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #5d3f3f;
  line-height: 16px;
}

.absa-bm-kpi__bar {
  height: 4px;
  background: #edeeef;
  border-radius: 12px;
  overflow: hidden;
}

.absa-bm-kpi__bar-fill {
  height: 100%;
  border-radius: 12px;
}

.absa-bm-kpi__bar-fill--red {
  background: #ae0029;
}

.absa-bm-kpi__bar-fill--dormant {
  background: #920021;
}

.absa-bm-kpi__bar-fill--churn {
  background: #a71935;
}

/* ═══ Table Section ═══ */
.absa-bm-table-section {
  background: #fff;
  border: 1px solid #e7bcbc;
  border-radius: 4px;
  overflow: hidden;
}

.absa-bm-table-section__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 25px;
  border-bottom: 1px solid #e7bcbc;
}

.absa-bm-table-section__title {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: #191c1d;
  line-height: 32px;
  margin: 0;
}

.absa-bm-table-section__actions {
  display: flex;
  gap: 16px;
}

.absa-bm-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 17px;
  border-radius: 2px;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.6px;
  line-height: 16px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 150ms ease;
}

.absa-bm-btn--outline {
  border: 1px solid #926e6e;
  background: transparent;
  color: #191c1d;
}

.absa-bm-btn--outline:hover {
  border-color: #dc0037;
}

.absa-bm-btn--primary {
  border: none;
  background: #BE0F2C;
  color: #fff;
}

.absa-bm-btn--primary:hover {
  background: #A01028;
}

.absa-bm-table-wrap {
  overflow-x: auto;
}

.absa-bm-table {
  width: 100%;
  border-collapse: collapse;
}

.absa-bm-table thead th {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #5d3f3f;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  text-align: left;
  padding: 12px 16px 13px;
  background: #f3f4f5;
  white-space: nowrap;
}

.absa-bm-table tbody td {
  padding: 12px 16px;
  border-top: 1px solid #e7bcbc;
  vertical-align: middle;
}

.absa-bm-table__th-center {
  text-align: center !important;
}

.absa-bm-table__td-center {
  text-align: center;
  vertical-align: middle;
}

.absa-bm-table__rm {
  display: flex;
  align-items: center;
  gap: 12px;
}

.absa-bm-table__divider {
  width: 8px;
  height: 32px;
  border-radius: 12px;
  flex-shrink: 0;
}

.absa-bm-table__divider--red {
  background: #920021;
}

.absa-bm-table__divider--pink {
  background: #c9354b;
}

.absa-bm-table__divider--grey {
  background: #e1e3e4;
}

.absa-bm-table__rm-name {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #191c1d;
  line-height: 24px;
}

.absa-bm-table__rm-dept {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 11px;
  font-weight: 400;
  color: #5d3f3f;
  line-height: 24px;
}

.absa-bm-table__cell {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #191c1d;
  line-height: 24px;
  white-space: nowrap;
}

.absa-bm-table__target {
  color: #5d3f3f;
}

.absa-bm-table__at-risk {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
}

.absa-bm-table__at-risk--high {
  color: #ba1a1a;
}

.absa-bm-table__at-risk--medium {
  color: #920021;
}

.absa-bm-table__at-risk--low {
  color: #5d3f3f;
}

.absa-bm-table__health {
  display: flex;
  align-items: center;
  gap: 16px;
}

.absa-bm-table__health-bar {
  flex: 1;
  min-width: 80px;
  height: 8px;
  background: #edeeef;
  border-radius: 12px;
  overflow: hidden;
}

.absa-bm-table__health-fill {
  height: 100%;
  border-radius: 12px;
}

.absa-bm-table__health-fill--red {
  background: #ae0029;
}

.absa-bm-table__health-fill--grey {
  background: #5d3f3f;
}

.absa-bm-table__health-val {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #191c1d;
  line-height: 20px;
}

.absa-bm-table__sparkline {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ═══ Churn Forecast Grid (3:1) ═══ */
.absa-bm-churn-grid {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 24px;
  padding-bottom: 32px;
}

/* ═══ Chart Panel ═══ */
.absa-bm-chart {
  background: #fff;
  border: 1px solid #e7bcbc;
  border-radius: 4px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.absa-bm-chart__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.absa-bm-chart__title {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: #191c1d;
  line-height: 32px;
  margin: 0;
}

.absa-bm-chart__subtitle {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #5d3f3f;
  line-height: 20px;
  margin: 0;
}

.absa-bm-chart__toggles {
  display: flex;
  gap: 0;
  background: #edeeef;
  border-radius: 4px;
  padding: 4px;
  flex-shrink: 0;
}

.absa-bm-chart__toggle {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #5d3f3f;
  letter-spacing: 0.6px;
  padding: 6px 16px;
  border-radius: 6px;
  cursor: pointer;
  line-height: 16px;
  text-align: center;
  transition: all 150ms ease;
}

.absa-bm-chart__toggle--active {
  background: #fff;
  color: #ae0029;
  font-weight: 700;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}

.absa-bm-chart__viz {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.absa-bm-chart__bars {
  display: flex;
  align-items: flex-end;
  gap: 4px;
  padding: 16px 16px 0;
}

.absa-bm-chart__bar-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-width: 0;
}

.absa-bm-chart__bar-label {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #191c1d;
  line-height: 20px;
}

.absa-bm-chart__bar {
  width: 100%;
  background: rgba(174, 0, 41, 0.1);
  border-radius: 15px 15px 0 0;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
}

.absa-bm-chart__bar-fill {
  width: 100%;
  background: linear-gradient(180deg, #dd2336 23.077%, #821021 100%);
  border-radius: 15px 15px 0 0;
  align-self: flex-end;
}

.absa-bm-chart__axis {
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
}

.absa-bm-chart__axis span {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #5d3f3f;
  line-height: 16px;
}

/* ═══ AI Insight Card ═══ */
.absa-bm-ai-card {
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  min-height: 566px;
  background: linear-gradient(135deg, #dc2337 0%, #a9192a 20%, #760e1d 40%, #440f17 70%, #2b1013 85%, #121010 100%);
}

.absa-bm-ai-card__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.3;
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 20px,
    rgba(220, 35, 55, 0.15) 20px,
    rgba(220, 35, 55, 0.15) 21px
  );
}

.absa-bm-ai-card__content {
  position: relative;
  z-index: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
}

.absa-bm-ai-card__heading {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.6px;
  line-height: 16px;
  text-transform: uppercase;
}

.absa-bm-ai-card__segments {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.absa-bm-ai-card__segment-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}

.absa-bm-ai-card__segment-label {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #fff;
  line-height: 20px;
}

.absa-bm-ai-card__segment-pct {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  line-height: 20px;
}

.absa-bm-ai-card__segment-bar {
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  overflow: hidden;
}

.absa-bm-ai-card__segment-fill {
  height: 100%;
  background: #fff;
  border-radius: 12px;
  transition: width 0.3s ease;
}

.absa-bm-ai-card__insight {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.absa-bm-ai-card__insight-text {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 14px;
  font-style: italic;
  font-weight: 400;
  color: #fff;
  line-height: 20px;
  margin: 0;
}

.absa-bm-ai-card__insight-label {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 10px;
  font-weight: 700;
  color: #ffdad9;
  letter-spacing: 0.6px;
  line-height: 15px;
  text-transform: uppercase;
}

/* ═══ Responsive ═══ */
@media (max-width: 1200px) {
  .absa-bm-kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .absa-bm-churn-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .absa-bm-content {
    padding: 16px;
    gap: 24px;
  }

  .absa-bm-kpi-grid {
    grid-template-columns: 1fr;
  }

  .absa-bm-chart__header {
    flex-direction: column;
  }

  .absa-bm-table-section__header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>
