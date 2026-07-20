<template>
  <!-- ════════════════════════════════════════════════════
       ABSA Intelligence Unit — Dashboard Hub
       Starting point for portfolio overview, customers,
       operations, and AI-driven insights.
       ════════════════════════════════════════════════════ -->
  <div class="absa-dashboard-layout">
    <!-- ── Left Sidebar ── -->
    <aside class="absa-sidebar">
      <div class="absa-sidebar__brand">
        <div class="absa-sidebar__logo">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="6" fill="url(#absaLogoGrad)"/>
            <text x="14" y="20" text-anchor="middle" fill="white" font-size="16" font-weight="900" font-family="Montserrat, sans-serif">A</text>
            <defs>
              <linearGradient id="absaLogoGrad" x1="0" y1="0" x2="28" y2="28">
                <stop stop-color="#BE0F2C"/><stop offset="1" stop-color="#8B0015"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span class="absa-sidebar__brand-text">absa Intelligence Unit</span>
      </div>

      <nav class="absa-sidebar__nav">
        <a href="/" class="absa-nav-item absa-nav-item--active">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
          Dashboard
        </a>
        <a href="/customers" class="absa-nav-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          My Customers
        </a>
        <a href="/portfolio" class="absa-nav-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
          Portfolio
        </a>
        <a href="/operations" class="absa-nav-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
          Operations
        </a>
      </nav>

      <div class="absa-sidebar__bottom">
        <button class="absa-sidebar__ai-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          AI Assistant
        </button>
        <a href="/settings" class="absa-nav-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          Settings
        </a>
        <a href="/support" class="absa-nav-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          Support
        </a>
      </div>
    </aside>

    <!-- ── Main Content ── -->
    <main class="absa-main">
      <!-- Top Bar -->
      <header class="absa-topbar">
        <div class="absa-topbar__breadcrumb">
          <span class="absa-topbar__breadcrumb-dim">Home</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          <span class="absa-topbar__breadcrumb-current">Dashboard</span>
        </div>
        <div class="absa-topbar__right">
          <div class="absa-search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input class="absa-search__input" type="text" placeholder="Search customer, account or ID..." />
          </div>
          <button class="absa-icon-btn" aria-label="Notifications">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </button>
          <div class="absa-topbar__user">
            <div class="absa-topbar__avatar">TT</div>
            <div class="absa-topbar__user-info">
              <span class="absa-topbar__user-name">Tina Tembo</span>
              <span class="absa-topbar__user-role">Relationship Manager</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Dashboard Content -->
      <div class="absa-content absa-mesh-dense">
        <!-- Page Header -->
        <div class="absa-page-header">
          <div>
            <h1 class="absa-page-header__title">Portfolio Overview</h1>
            <p class="absa-page-header__subtitle">Data Snapshot: Latest (July 20, 2026)</p>
          </div>
          <div class="absa-page-header__actions">
            <button class="absa-toolbar-btn">📥 Export Report</button>
            <button class="absa-toolbar-btn absa-toolbar-btn--primary">+ New Action</button>
          </div>
        </div>

        <!-- ── KPI Cards Row ── -->
        <div class="absa-kpi-grid">
          <div class="absa-metric-card absa-accent-left-success">
            <span class="absa-metric-card__label">Total Customers</span>
            <span class="absa-metric-card__value">1,240</span>
            <span class="absa-metric-card__delta absa-metric-card__delta--up">↑ +2.4% vs last period</span>
          </div>
          <div class="absa-metric-card absa-accent-left-critical">
            <span class="absa-metric-card__label">At Risk</span>
            <span class="absa-metric-card__value">68 <span style="font-size:0.875rem;color:#6B7280;font-weight:500">| 5.5%</span></span>
            <span class="absa-metric-card__delta absa-metric-card__delta--down">↑ +4 since last snapshot</span>
          </div>
          <div class="absa-metric-card absa-accent-left-warning">
            <span class="absa-metric-card__label">Dormant Accounts</span>
            <span class="absa-metric-card__value">42</span>
            <span class="absa-metric-card__delta absa-metric-card__delta--flat">Stable across 3 periods</span>
          </div>
          <div class="absa-metric-card absa-accent-left-maroon">
            <span class="absa-metric-card__label">Actions Due Today</span>
            <span class="absa-metric-card__value">12</span>
            <span class="absa-metric-card__delta" style="color:#DC2626;font-weight:600">8 URGENT | 4 ROUTINE</span>
          </div>
        </div>

        <!-- ── Two-Column Layout ── -->
        <div class="absa-grid-2col">
          <!-- Left: Critical Alerts -->
          <div class="absa-card absa-card--panel">
            <div class="absa-section-header">
              <h2 class="absa-section-header__title">🚨 Critical Alerts</h2>
              <span class="absa-badge absa-badge--critical">3 Active</span>
            </div>
            <div class="absa-alert-item absa-alert-item--critical">
              <svg class="absa-alert-item__icon" viewBox="0 0 24 24" fill="#DC2626"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12" stroke="white" stroke-width="2"/><line x1="12" y1="16" x2="12.01" y2="16" stroke="white" stroke-width="2"/></svg>
              <div class="absa-alert-item__content">
                <div class="absa-alert-item__title">M. Kapambwe — Health Score drop -25</div>
                <div class="absa-alert-item__detail">Significant decrease in incoming wire transfers over last 30 days.</div>
              </div>
              <button class="absa-alert-item__action absa-alert-item__action--critical">ACKNOWLEDGE</button>
            </div>
            <div class="absa-alert-item absa-alert-item--warning">
              <svg class="absa-alert-item__icon" viewBox="0 0 24 24" fill="#F59E0B"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13" stroke="white" stroke-width="2"/><line x1="12" y1="17" x2="12.01" y2="17" stroke="white" stroke-width="2"/></svg>
              <div class="absa-alert-item__content">
                <div class="absa-alert-item__title">J. Phiri — State Transition: At Risk</div>
                <div class="absa-alert-item__detail">Customer moved from Active to At Risk based on behavioral scoring.</div>
              </div>
              <button class="absa-alert-item__action" style="color:#D97706;border-color:#FDE68A">REVIEW</button>
            </div>
            <div class="absa-alert-item absa-alert-item--critical">
              <svg class="absa-alert-item__icon" viewBox="0 0 24 24" fill="#DC2626"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12" stroke="white" stroke-width="2"/><line x1="12" y1="16" x2="12.01" y2="16" stroke="white" stroke-width="2"/></svg>
              <div class="absa-alert-item__content">
                <div class="absa-alert-item__title">P. Lungu — Large Withdrawal Detected</div>
                <div class="absa-alert-item__detail">Withdrawal of ZMW 450,000 from Savings account.</div>
              </div>
              <button class="absa-alert-item__action absa-alert-item__action--critical">ACKNOWLEDGE</button>
            </div>
          </div>

          <!-- Right: Quick Links + Predictive Ledger -->
          <div class="absa-card absa-card--panel">
            <div class="absa-section-header">
              <h2 class="absa-section-header__title">⚡ Predictive Lifecycle Ledger</h2>
              <a href="/portfolio" class="absa-link-sm">View All →</a>
            </div>
            <table class="absa-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>State</th>
                  <th>Health</th>
                  <th>Churn Prob</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="absa-table__cell-name">Mwenda Kapambwe</td>
                  <td><span class="absa-status-pill absa-status-pill--churned">Churned</span></td>
                  <td><span style="color:#DC2626;font-weight:700">22</span></td>
                  <td class="absa-table__cell-numeric" style="color:#DC2626;font-weight:700">89%</td>
                  <td><button class="absa-table-action-btn absa-table-action-btn--critical">RETENTION CALL</button></td>
                </tr>
                <tr>
                  <td class="absa-table__cell-name">Joseph Phiri</td>
                  <td><span class="absa-status-pill absa-status-pill--at-risk">At Risk</span></td>
                  <td><span style="color:#F59E0B;font-weight:700">48</span></td>
                  <td class="absa-table__cell-numeric" style="color:#F59E0B;font-weight:700">52%</td>
                  <td><button class="absa-table-action-btn absa-table-action-btn--warning">BALANCE REVIEW</button></td>
                </tr>
                <tr>
                  <td class="absa-table__cell-name">Patricia Lungu</td>
                  <td><span class="absa-status-pill absa-status-pill--active">Active</span></td>
                  <td><span style="color:#16A34A;font-weight:700">82</span></td>
                  <td class="absa-table__cell-numeric" style="color:#16A34A">8%</td>
                  <td><button class="absa-table-action-btn absa-table-action-btn--success">UPSELL OPPORTUNITY</button></td>
                </tr>
                <tr>
                  <td class="absa-table__cell-name">Sibongile Banda</td>
                  <td><span class="absa-status-pill absa-status-pill--dormant">Dormant</span></td>
                  <td><span style="color:#9CA3AF;font-weight:700">35</span></td>
                  <td class="absa-table__cell-numeric" style="color:#9CA3AF">18%</td>
                  <td><button class="absa-table-action-btn absa-table-action-btn--neutral">KYC UPDATE</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- ── Quick Navigation Cards ── -->
        <div class="absa-section-header" style="margin-top:8px">
          <h2 class="absa-section-header__title">📊 Platform Modules</h2>
          <span class="absa-section-header__subtitle">Jump to any section</span>
        </div>
        <div class="absa-module-grid">
          <a href="/customers" class="absa-module-card">
            <div class="absa-module-card__icon absa-module-card__icon--maroon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div class="absa-module-card__body">
              <h3 class="absa-module-card__title">My Customers</h3>
              <p class="absa-module-card__desc">AI-driven customer profiles, health scores & retention actions</p>
            </div>
          </a>
          <a href="/portfolio" class="absa-module-card">
            <div class="absa-module-card__icon absa-module-card__icon--info">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
            </div>
            <div class="absa-module-card__body">
              <h3 class="absa-module-card__title">Portfolio Analytics</h3>
              <p class="absa-module-card__desc">Segment risk, churn forecasts & branch performance metrics</p>
            </div>
          </a>
          <a href="/operations" class="absa-module-card">
            <div class="absa-module-card__icon absa-module-card__icon--success">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            </div>
            <div class="absa-module-card__body">
              <h3 class="absa-module-card__title">Operations</h3>
              <p class="absa-module-card__desc">ETL pipeline health, data quality monitoring & execution logs</p>
            </div>
          </a>
          <a href="/models" class="absa-module-card">
            <div class="absa-module-card__icon absa-module-card__icon--warning">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
            <div class="absa-module-card__body">
              <h3 class="absa-module-card__title">AI Models</h3>
              <p class="absa-module-card__desc">Model monitoring, feature drift detection & champion/challenger tracking</p>
            </div>
          </a>
        </div>

        <!-- ── AI Recommendation Banner ── -->
        <div class="absa-ai-banner">
          <svg class="absa-ai-banner__icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          <div>
            <strong>AI Recommendation Engine</strong> — Based on current portfolio trends, the Premier Banking segment shows a predicted 12% churn uplift in the next 30 days. Prioritize retention calls for customers with Health Score below 40.
          </div>
        </div>

        <!-- ── Footer Metrics ── -->
        <div class="absa-footer-metrics">
          <div class="absa-footer-metric">
            <span class="absa-footer-metric__label">Pipeline Health</span>
            <span class="absa-footer-metric__value">All Systems Operational</span>
          </div>
          <div class="absa-footer-metric">
            <span class="absa-footer-metric__label">Avg. Quality Score</span>
            <span class="absa-footer-metric__value">99.1% <span class="absa-footer-metric__delta--up">↑ 0.3%</span></span>
          </div>
          <div class="absa-footer-metric">
            <span class="absa-footer-metric__label">Models in Production</span>
            <span class="absa-footer-metric__value">4 Active</span>
          </div>
          <div class="absa-footer-metric">
            <span class="absa-footer-metric__label">Last Data Refresh</span>
            <span class="absa-footer-metric__value">2 minutes ago</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// ABSA Intelligence Unit — Dashboard Hub
// No external dependencies needed for the static dashboard view.
// All interactivity (router links, search, etc.) uses native HTML.
</script>

<style scoped>
/* ════════════════════════════════════════════════════════
   ABSA Dashboard Layout — Scoped Styles
   Built on absa-colors.css, patterns.css & pages.css tokens.
   ════════════════════════════════════════════════════════ */

/* ── Root Layout ── */
.absa-dashboard-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  min-height: 100vh;
  background: #F8F8FA;
  font-family: 'Montserrat', 'Inter', system-ui, -apple-system, sans-serif;
}

/* ── Sidebar ── */
.absa-sidebar {
  background: #FFFFFF;
  border-right: 1px solid #E8E8EC;
  display: flex;
  flex-direction: column;
  padding: 0;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}

.absa-sidebar__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 18px 20px;
  border-bottom: 1px solid #F3F4F6;
}

.absa-sidebar__brand-text {
  font-size: 0.8125rem;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.01em;
  line-height: 1.2;
}

.absa-sidebar__nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 12px 12px;
  flex: 1;
}

.absa-sidebar__bottom {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 12px 12px;
  border-top: 1px solid #F3F4F6;
}

.absa-sidebar__ai-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  margin-bottom: 6px;
  background: linear-gradient(135deg, #BE0F2C, #8B0015);
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  font-size: 0.8125rem;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 150ms ease;
}

.absa-sidebar__ai-btn:hover {
  opacity: 0.9;
}

/* Nav items (reused from pages.css pattern) */
.absa-nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #4B5563;
  text-decoration: none;
  transition: all 150ms ease;
}

.absa-nav-item:hover {
  background: #F3F4F6;
  color: #111827;
}

.absa-nav-item--active {
  background: #FDE8EC;
  color: #BE0F2C;
  font-weight: 700;
}

/* ── Main Content ── */
.absa-main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.absa-content {
  flex: 1;
  padding: 24px 32px;
  overflow-y: auto;
}

/* ── Top Bar ── */
.absa-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  height: 64px;
  background: #FFFFFF;
  border-bottom: 1px solid #E8E8EC;
  position: sticky;
  top: 0;
  z-index: 30;
}

.absa-topbar__breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8125rem;
  color: #9CA3AF;
}

.absa-topbar__breadcrumb-dim { color: #9CA3AF; }
.absa-topbar__breadcrumb-current { color: #111827; font-weight: 600; }

.absa-topbar__right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.absa-topbar__user {
  display: flex;
  align-items: center;
  gap: 10px;
}

.absa-topbar__avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #BE0F2C, #8B0015);
  color: #FFFFFF;
  font-size: 0.75rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

.absa-topbar__user-info {
  display: flex;
  flex-direction: column;
}

.absa-topbar__user-name {
  font-size: 0.8125rem;
  font-weight: 700;
  color: #111827;
}

.absa-topbar__user-role {
  font-size: 0.6875rem;
  color: #6B7280;
}

.absa-icon-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  border-radius: 8px;
  color: #6B7280;
  cursor: pointer;
  transition: all 150ms ease;
}

.absa-icon-btn:hover {
  background: #F3F4F6;
  color: #111827;
}

/* Search (matches pages.css) */
.absa-search {
  display: flex;
  align-items: center;
  height: 40px;
  width: 320px;
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 0 12px;
  gap: 8px;
  transition: border-color 150ms ease, box-shadow 150ms ease;
}

.absa-search:focus-within {
  border-color: #BE0F2C;
  box-shadow: 0 0 0 3px rgba(190, 15, 44, 0.12);
  background: #FFFFFF;
}

.absa-search__input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 0.8125rem;
  color: #111827;
}

.absa-search__input::placeholder {
  color: #9CA3AF;
}

/* ── Page Header ── */
.absa-page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 24px;
}

.absa-page-header__title {
  font-size: 1.375rem;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.02em;
  margin: 0 0 4px;
}

.absa-page-header__subtitle {
  font-size: 0.8125rem;
  color: #6B7280;
  margin: 0;
}

.absa-page-header__actions {
  display: flex;
  gap: 8px;
}

/* ── KPI Grid ── */
.absa-kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

@media (max-width: 1200px) {
  .absa-kpi-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .absa-kpi-grid { grid-template-columns: 1fr; }
  .absa-dashboard-layout { grid-template-columns: 1fr; }
  .absa-sidebar { display: none; }
  .absa-grid-2col { grid-template-columns: 1fr; }
  .absa-module-grid { grid-template-columns: 1fr; }
  .absa-content { padding: 16px; }
  .absa-topbar { padding: 0 16px; }
}

/* ── Two Column Grid ── */
.absa-grid-2col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
}

/* ── Panel Card ── */
.absa-card--panel {
  background: #FFFFFF;
  border: 1px solid #E8E8EC;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

/* ── Badge ── */
.absa-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  font-size: 0.6875rem;
  font-weight: 700;
  border-radius: 999px;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.absa-badge--critical {
  background: #FEE2E2;
  color: #DC2626;
}

/* ── Link ── */
.absa-link-sm {
  font-size: 0.75rem;
  font-weight: 600;
  color: #BE0F2C;
  text-decoration: none;
}

.absa-link-sm:hover {
  text-decoration: underline;
}

/* ── Table Action Buttons ── */
.absa-table-action-btn {
  padding: 4px 10px;
  font-size: 0.625rem;
  font-weight: 700;
  border-radius: 5px;
  border: 1px solid;
  cursor: pointer;
  white-space: nowrap;
  letter-spacing: 0.03em;
  transition: all 150ms ease;
}

.absa-table-action-btn--critical {
  background: #FEE2E2;
  color: #DC2626;
  border-color: #FECACA;
}
.absa-table-action-btn--critical:hover { background: #FECACA; }

.absa-table-action-btn--warning {
  background: #FEF3C7;
  color: #D97706;
  border-color: #FDE68A;
}
.absa-table-action-btn--warning:hover { background: #FDE68A; }

.absa-table-action-btn--success {
  background: #DCFCE7;
  color: #16A34A;
  border-color: #BBF7D0;
}
.absa-table-action-btn--success:hover { background: #BBF7D0; }

.absa-table-action-btn--neutral {
  background: #F3F4F6;
  color: #6B7280;
  border-color: #E5E7EB;
}
.absa-table-action-btn--neutral:hover { background: #E5E7EB; }

.absa-table__cell-name {
  font-weight: 600;
  color: #111827;
}

/* ── Module Navigation Cards ── */
.absa-module-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

@media (max-width: 1000px) {
  .absa-module-grid { grid-template-columns: repeat(2, 1fr); }
}

.absa-module-card {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 18px;
  background: #FFFFFF;
  border: 1px solid #E8E8EC;
  border-radius: 12px;
  text-decoration: none;
  transition: all 200ms ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.absa-module-card:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
  border-color: #D1D5DB;
}

.absa-module-card__icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.absa-module-card__icon--maroon  { background: linear-gradient(135deg, #BE0F2C, #8B0015); }
.absa-module-card__icon--info    { background: linear-gradient(135deg, #2563EB, #1D4ED8); }
.absa-module-card__icon--success { background: linear-gradient(135deg, #16A34A, #15803D); }
.absa-module-card__icon--warning { background: linear-gradient(135deg, #F59E0B, #D97706); }

.absa-module-card__body {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.absa-module-card__title {
  font-size: 0.875rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.absa-module-card__desc {
  font-size: 0.75rem;
  color: #6B7280;
  margin: 0;
  line-height: 1.4;
}

/* ── Scrollbar ── */
.absa-sidebar::-webkit-scrollbar { width: 4px; }
.absa-sidebar::-webkit-scrollbar-track { background: transparent; }
.absa-sidebar::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 4px; }
.absa-sidebar::-webkit-scrollbar-thumb:hover { background: #D1D5DB; }
</style>
