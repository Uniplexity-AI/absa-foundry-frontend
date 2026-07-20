<template>
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
        <span class="absa-sidebar__brand-text">absa <span class="absa-sidebar__brand-sub">Intelligence Unit</span></span>
      </div>

      <nav class="absa-sidebar__nav">
        <a href="/" class="absa-nav-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
          Dashboard
        </a>
        <a href="/customers" class="absa-nav-item absa-nav-item--active">
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

    <!-- ── Main Content Area ── -->
    <main class="absa-main">
      <!-- Top Header Navigation Bar -->
      <header class="absa-topbar">
        <h1 class="absa-topbar__title">My Customers</h1>
        
        <div class="absa-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input class="absa-search__input" type="text" placeholder="Search customer, account or ID..." />
        </div>

        <div class="absa-topbar__right">
          <button class="absa-icon-btn" aria-label="Notifications">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </button>
          <button class="absa-icon-btn" aria-label="Help">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </button>

          <div class="absa-topbar__user">
            <img class="absa-topbar__avatar" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80" alt="Tina Tembo" />
            <div class="absa-topbar__user-info">
              <span class="absa-topbar__user-name">Tina Tembo</span>
              <span class="absa-topbar__user-role">Relationship Manager</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Container Body -->
      <div class="absa-content">
        <!-- Sub Bar with Title & Breadcrumbs -->
        <div class="absa-subbar">
          <div>
            <div class="absa-customer-heading">
              <span class="absa-customer-heading__name">{{ customer.name }}</span>
              <span class="absa-customer-heading__id">(ID: {{ customer.id }})</span>
            </div>
            <div class="absa-breadcrumb">
              <a href="/" class="absa-breadcrumb__link">Home</a>
              <span class="absa-breadcrumb__sep">></span>
              <a href="/customers" class="absa-breadcrumb__link">My Customers</a>
              <span class="absa-breadcrumb__sep">></span>
              <span class="absa-breadcrumb__current">{{ customer.name }}</span>
            </div>
          </div>

          <a :href="customer.coreBankingUrl" target="_blank" class="absa-btn-primary-action">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            View in Core Banking
          </a>
        </div>

        <!-- ── Top Grid (FR-CUST-01 & FR-CUST-02 & FR-CUST-04) ── -->
        <div class="absa-grid-top">
          <!-- FR-CUST-01: Customer Profile Card -->
          <div class="absa-card absa-profile-card">
            <div class="absa-profile-card__badge-id">{{ customer.id }}</div>
            <div class="absa-profile-card__avatar-wrap">
              <img :src="customer.avatar" :alt="customer.name" class="absa-profile-card__avatar" />
            </div>
            <h2 class="absa-profile-card__name">{{ customer.name }}</h2>
            <div class="absa-profile-card__segment">{{ customer.segment }}</div>
            <div class="absa-profile-card__status-pill">{{ customer.state }}</div>

            <div class="absa-profile-details">
              <div class="absa-profile-row">
                <span class="absa-profile-row__label">Account #</span>
                <span class="absa-profile-row__value absa-profile-row__value--mono">{{ customer.accountNumber }}</span>
              </div>
              <div class="absa-profile-row">
                <span class="absa-profile-row__label">Branch</span>
                <span class="absa-profile-row__value">{{ customer.branch }}</span>
              </div>
              <div class="absa-profile-row">
                <span class="absa-profile-row__label">ID Number</span>
                <span class="absa-profile-row__value absa-profile-row__value--mono">{{ customer.id }}</span>
              </div>
              <div class="absa-profile-row">
                <span class="absa-profile-row__label">Tenure</span>
                <span class="absa-profile-row__value">{{ customer.tenure }}</span>
              </div>
              <div class="absa-profile-row">
                <span class="absa-profile-row__label">Assigned RM</span>
                <span class="absa-profile-row__value">{{ customer.assignedRm }}</span>
              </div>
            </div>
          </div>

          <!-- Predictive Insights Card (FR-CUST-02 & FR-CUST-04) -->
          <div class="absa-card absa-insights-card">
            <div class="absa-card-header">
              <div class="absa-card-header__title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#BE0F2C" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                PREDICTIVE INSIGHTS
              </div>
              <span class="absa-card-header__updated">Last updated: Today, {{ customer.lastUpdated }}</span>
            </div>

            <div class="absa-insights-grid">
              <!-- Left Column: FR-CUST-02 Health Gauge -->
              <div class="absa-health-column">
                <div class="absa-health-column__title">AI Health Score</div>
                
                <div class="absa-gauge-container">
                  <svg class="absa-gauge-svg" viewBox="0 0 160 160">
                    <circle cx="80" cy="80" r="66" class="absa-gauge-bg" />
                    <circle 
                      cx="80" 
                      cy="80" 
                      r="66" 
                      class="absa-gauge-fill" 
                      :style="{ strokeDashoffset: gaugeOffset }" 
                    />
                  </svg>
                  <div class="absa-gauge-content">
                    <span class="absa-gauge-number">{{ customer.healthScore }}</span>
                    <span class="absa-gauge-label">CRITICAL</span>
                  </div>
                </div>

                <div class="absa-health-delta">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>
                  {{ customer.healthDelta }} pts vs last month
                </div>

                <div class="absa-health-metrics">
                  <div class="absa-health-metric-row">
                    <span>Churn Risk</span>
                    <span class="absa-metric-critical">{{ customer.churnRisk }}</span>
                  </div>
                  <div class="absa-health-metric-row">
                    <span>CLV Percentile</span>
                    <span class="absa-metric-dark">{{ customer.clvPercentile }}</span>
                  </div>
                  <div class="absa-health-metric-row">
                    <span>Behavioral Score</span>
                    <span class="absa-metric-critical">{{ customer.behavioralScore }}</span>
                  </div>
                </div>
              </div>

              <!-- Right Column: FR-CUST-04 SHAP / Key Risk Drivers -->
              <div class="absa-drivers-column">
                <div class="absa-drivers-column__title">Key Risk Drivers</div>

                <div class="absa-driver-item" v-for="driver in customer.riskDrivers" :key="driver.name">
                  <div class="absa-driver-header">
                    <span class="absa-driver-name">{{ driver.name }}</span>
                    <span class="absa-driver-value" :class="{ 'absa-driver-value--negative': driver.impact < 0 }">
                      {{ driver.valueText }}
                    </span>
                  </div>
                  <div class="absa-driver-bar-bg">
                    <div 
                      class="absa-driver-bar-fill" 
                      :style="{ width: Math.abs(driver.impact) + '%' }"
                    ></div>
                  </div>
                  <div class="absa-driver-sub">{{ driver.description }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ── FR-CUST-03: State Timeline ── -->
        <div class="absa-card absa-timeline-card">
          <div class="absa-timeline-card__title">LIFECYCLE JOURNEY (12 MONTHS)</div>
          
          <div class="absa-timeline-wrapper">
            <div class="absa-timeline-line"></div>
            <div 
              v-for="(point, idx) in customer.lifecycleHistory" 
              :key="idx" 
              class="absa-timeline-node"
              :class="{ 'absa-timeline-node--current': point.isCurrent }"
            >
              <div v-if="point.transitionLabel" class="absa-timeline-transition">
                {{ point.transitionLabel }}
              </div>
              <div class="absa-timeline-dot" :class="'absa-timeline-dot--' + point.state.toLowerCase().replace(' ', '-')"></div>
              <div class="absa-timeline-state">{{ point.state }}</div>
              <div class="absa-timeline-time">{{ point.timeAgo }}</div>
            </div>
          </div>
        </div>

        <!-- ── Bottom Grid (FR-CUST-05 NBA & FR-CUST-06 Action History) ── -->
        <div class="absa-grid-bottom">
          <!-- FR-CUST-05: NBA Recommendation Hero Banner -->
          <div class="absa-nba-card">
            <div class="absa-nba-card__left">
              <div class="absa-nba-card__exclamation">!</div>
              <div class="absa-nba-card__label-main">Next Best Action</div>
              <div class="absa-nba-card__sub-main">Recommended by AI-Lifecycle Engine</div>
            </div>

            <div class="absa-nba-card__right">
              <div class="absa-nba-card__header-tags">
                <span class="absa-nba-tag absa-nba-tag--priority">PRIORITY {{ topNba.priority }}</span>
                <div class="absa-nba-confidence">
                  <span class="absa-nba-confidence__label">AI CONFIDENCE</span>
                  <span class="absa-nba-confidence__value">{{ topNba.confidence }}%</span>
                </div>
              </div>

              <h3 class="absa-nba-card__title">{{ topNba.title }}</h3>
              <p class="absa-nba-card__desc">{{ topNba.description }}</p>

              <div class="absa-nba-card__actions">
                <button class="absa-btn-log-action" @click="openLogActionModal">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  Log Action
                </button>
                <button class="absa-btn-dismiss">Dismiss</button>
              </div>
            </div>
          </div>

          <!-- FR-CUST-06: Action History -->
          <div class="absa-card absa-history-card">
            <div class="absa-history-header">
              <span class="absa-history-header__title">ACTION HISTORY</span>
              <div class="absa-history-header__controls">
                <button class="absa-history-dropdown">All <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></button>
                <a href="#" class="absa-history-view-all">View All</a>
              </div>
            </div>

            <div class="absa-history-list">
              <div class="absa-history-item" v-for="act in customer.actionHistory" :key="act.id">
                <div class="absa-history-item__icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </div>
                <div class="absa-history-item__content">
                  <div class="absa-history-item__top">
                    <span class="absa-history-item__type">{{ act.type }}</span>
                    <span class="absa-history-item__date">{{ act.date }}</span>
                  </div>
                  <p class="absa-history-item__text">{{ act.notes }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal for Logging Actions (FR-CUST-05) -->
    <div class="absa-modal-overlay" v-if="showLogModal">
      <div class="absa-modal">
        <h3 class="absa-modal__title">Log Retention Action</h3>
        <p class="absa-modal__subtitle">Customer: {{ customer.name }} (ID: {{ customer.id }})</p>

        <form @submit.prevent="submitLogAction" class="absa-modal-form">
          <div class="absa-form-group">
            <label class="absa-form-label">Action Type</label>
            <select v-model="actionForm.type" class="absa-form-select" required>
              <option value="Retention Call">Retention Call</option>
              <option value="Offer Fixed Deposit Rate">Offer Fixed Deposit Rate</option>
              <option value="KYC Update Request">KYC Update Request</option>
              <option value="In-Person Branch Meeting">In-Person Branch Meeting</option>
            </select>
          </div>

          <div class="absa-form-group">
            <label class="absa-form-label">Notes & Outcome</label>
            <textarea v-model="actionForm.notes" rows="4" class="absa-form-textarea" placeholder="Detail the customer conversation and agreed next steps..." required></textarea>
          </div>

          <div class="absa-modal-actions">
            <button type="button" class="absa-btn-cancel" @click="showLogModal = false">Cancel</button>
            <button type="submit" class="absa-btn-submit">Submit Record</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Customer Data Structure following FR-CUST requirements
const customer = ref({
  id: '994022/11/1',
  name: 'Mwenda Kapambwe',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  segment: 'Verified Private Client',
  state: 'Churned',
  accountNumber: 'ZMK-8820-192',
  branch: 'Lusaka Main',
  tenure: '8 Years',
  assignedRm: 'Tina Tembo',
  coreBankingUrl: 'https://corebanking.internal.absa.co.zm/client/994022',
  lastUpdated: '08:45 AM',
  healthScore: 22,
  healthDelta: -12,
  churnRisk: 'High',
  clvPercentile: '85th',
  behavioralScore: 'Low',
  riskDrivers: [
    { name: 'Salary Inflow', valueText: '-42%', impact: 85, description: 'Major decrease in monthly deposits detected.' },
    { name: 'Digital Activity', valueText: 'Low', impact: 45, description: 'No mobile app logins in the last 45 days.' },
    { name: 'Withdrawal Volume', valueText: 'Spike', impact: 70, description: 'Recent lump-sum exit to external institution.' }
  ],
  lifecycleHistory: [
    { state: 'Active', timeAgo: '12m ago', isCurrent: false },
    { state: 'Active', timeAgo: '6m ago', isCurrent: false },
    { state: 'Active', timeAgo: '4m ago', isCurrent: false },
    { state: 'At Risk', timeAgo: '2m ago', isCurrent: false, transitionLabel: 'Transition' },
    { state: 'Churned', timeAgo: 'Current', isCurrent: true }
  ],
  actionHistory: [
    { id: 1, type: 'General Inquiry', date: 'June 10, 2024', notes: 'Logged by RM Sarah Bwalya. Customer queried interest rates on fixed deposits but expressed frustration with app performance.' },
    { id: 2, type: 'Cross-sell: Credit Card', date: 'May 15, 2024', notes: 'Inbound call center lead. Product offered: Absa Infinite Card. Customer declined citing high annual fees.' },
    { id: 3, type: 'KYC Update', date: 'April 02, 2024', notes: 'Routine identity verification completed at Lusaka Main Branch.' }
  ]
});

// Top Next Best Action (FR-CUST-05)
const topNba = ref({
  priority: 1,
  confidence: 92,
  title: 'Immediate Retention Call',
  description: 'High risk of customer attrition. The AI predicts a 45% chance of re-engagement if contacted within the next 48 hours with a customized "Prestige Loyalty" offer.'
});

// Gauge calculation for Health Score (0 to 100 mapping to SVG stroke Dash)
// Circle circumf = 2 * PI * 66 = ~414.69
const gaugeOffset = computed(() => {
  const circumference = 414.69;
  const score = Math.max(0, Math.min(100, customer.value.healthScore));
  return circumference - (score / 100) * circumference;
});

// Modal state & form submission (FR-CUST-05)
const showLogModal = ref(false);
const actionForm = ref({
  type: 'Retention Call',
  notes: ''
});

const openLogActionModal = () => {
  showLogModal.value = true;
};

const submitLogAction = () => {
  customer.value.actionHistory.unshift({
    id: Date.now(),
    type: actionForm.value.type,
    date: 'Just Now',
    notes: actionForm.value.notes
  });
  showLogModal.value = false;
  actionForm.value.notes = '';
};
</script>

<style scoped>
/* ════════════════════════════════════════════════════════
   Absa Bank Design Tokens & Scoped Layout
   ════════════════════════════════════════════════════════ */

.absa-dashboard-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  min-height: 100vh;
  background-color: #F8F9FA;
  font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  color: #1F2937;
}

/* ── Sidebar Styling ── */
.absa-sidebar {
  background: #FFFFFF;
  border-right: 1px solid #E5E7EB;
  display: flex;
  flex-direction: column;
}

.absa-sidebar__brand {
  padding: 20px 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #F3F4F6;
}

.absa-sidebar__brand-text {
  font-weight: 800;
  font-size: 0.95rem;
  color: #BE0F2C;
}

.absa-sidebar__brand-sub {
  color: #4B5563;
  font-weight: 500;
}

.absa-sidebar__nav {
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.absa-nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  border-radius: 8px;
  color: #4B5563;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 600;
  transition: background 0.15s;
}

.absa-nav-item:hover {
  background: #F3F4F6;
}

.absa-nav-item--active {
  background: #BE0F2C;
  color: #FFFFFF;
}

.absa-sidebar__bottom {
  padding: 16px 12px;
  border-top: 1px solid #F3F4F6;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.absa-sidebar__ai-btn {
  background: linear-gradient(135deg, #BE0F2C, #8B0015);
  color: #FFFFFF;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  margin-bottom: 8px;
}

/* ── Top Header Navigation ── */
.absa-main {
  display: flex;
  flex-direction: column;
}

.absa-topbar {
  height: 64px;
  background: #FFFFFF;
  border-bottom: 1px solid #E5E7EB;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.absa-topbar__title {
  font-size: 1.25rem;
  font-weight: 800;
  color: #BE0F2C;
  margin: 0;
}

.absa-search {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #F3F4F6;
  border-radius: 20px;
  padding: 6px 16px;
  width: 380px;
}

.absa-search__input {
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
  font-size: 0.85rem;
}

.absa-topbar__right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.absa-icon-btn {
  background: transparent;
  border: none;
  color: #6B7280;
  cursor: pointer;
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
  object-fit: cover;
}

.absa-topbar__user-info {
  display: flex;
  flex-direction: column;
}

.absa-topbar__user-name {
  font-weight: 700;
  font-size: 0.85rem;
}

.absa-topbar__user-role {
  font-size: 0.725rem;
  color: #6B7280;
}

/* ── Sub Bar (Header metadata) ── */
.absa-content {
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.absa-subbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.absa-customer-heading {
  display: flex;
  align-items: center;
  gap: 8px;
}

.absa-customer-heading__name {
  font-weight: 800;
  font-size: 0.95rem;
  color: #BE0F2C;
}

.absa-customer-heading__id {
  color: #8B0015;
  font-weight: 700;
  font-size: 0.85rem;
}

.absa-breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  color: #6B7280;
  margin-top: 2px;
}

.absa-breadcrumb__link {
  color: #6B7280;
  text-decoration: none;
}

.absa-btn-primary-action {
  background: #8B0015;
  color: #FFFFFF;
  text-decoration: none;
  padding: 10px 18px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* ── General Card Style ── */
.absa-card {
  background: #FFFFFF;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

/* ── Top Layout Grid ── */
.absa-grid-top {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 20px;
}

/* Profile Card (FR-CUST-01) */
.absa-profile-card {
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.absa-profile-card__badge-id {
  position: absolute;
  top: 16px;
  left: 16px;
  font-size: 0.85rem;
  font-weight: 800;
  color: #FFFFFF;
  background: #8B0015;
  padding: 4px 10px;
  border-radius: 4px;
}

.absa-profile-card__avatar-wrap {
  margin-top: 24px;
  margin-bottom: 12px;
}

.absa-profile-card__avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.absa-profile-card__name {
  font-size: 1.15rem;
  font-weight: 800;
  margin: 0;
  text-align: center;
}

.absa-profile-card__segment {
  font-size: 0.8rem;
  color: #6B7280;
  margin-top: 2px;
}

.absa-profile-card__status-pill {
  background: #FEE2E2;
  color: #DC2626;
  font-size: 0.725rem;
  font-weight: 800;
  padding: 3px 12px;
  border-radius: 12px;
  margin-top: 10px;
  margin-bottom: 20px;
}

.absa-profile-details {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-top: 1px solid #F3F4F6;
  padding-top: 16px;
}

.absa-profile-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
}

.absa-profile-row__label {
  color: #6B7280;
}

.absa-profile-row__value {
  font-weight: 700;
  color: #1F2937;
}

.absa-profile-row__value--mono {
  font-family: monospace;
  color: #BE0F2C;
}

/* Predictive Insights Card (FR-CUST-02 & FR-CUST-04) */
.absa-insights-card {
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
}

.absa-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #F3F4F6;
  padding-bottom: 12px;
  margin-bottom: 20px;
}

.absa-card-header__title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 800;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  color: #1F2937;
}

.absa-card-header__updated {
  font-size: 0.725rem;
  color: #9CA3AF;
}

.absa-insights-grid {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 32px;
  flex: 1;
}

/* Health Gauge Column */
.absa-health-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid #F3F4F6;
  padding-right: 24px;
}

.absa-health-column__title {
  font-size: 0.85rem;
  font-weight: 700;
  margin-bottom: 12px;
  width: 100%;
}

.absa-gauge-container {
  position: relative;
  width: 140px;
  height: 140px;
}

.absa-gauge-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.absa-gauge-bg {
  fill: none;
  stroke: #E5E7EB;
  stroke-width: 12;
}

.absa-gauge-fill {
  fill: none;
  stroke: #BE0F2C;
  stroke-width: 12;
  stroke-dasharray: 414.69;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.8s ease;
}

.absa-gauge-content {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.absa-gauge-number {
  font-size: 2.2rem;
  font-weight: 900;
  color: #BE0F2C;
  line-height: 1;
}

.absa-gauge-label {
  font-size: 0.65rem;
  font-weight: 800;
  color: #DC2626;
  letter-spacing: 0.05em;
  margin-top: 4px;
}

.absa-health-delta {
  font-size: 0.75rem;
  font-weight: 700;
  color: #DC2626;
  margin-top: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.absa-health-metrics {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.775rem;
}

.absa-health-metric-row {
  display: flex;
  justify-content: space-between;
  color: #4B5563;
}

.absa-metric-critical {
  font-weight: 800;
  color: #DC2626;
}

.absa-metric-dark {
  font-weight: 800;
  color: #1F2937;
}

/* Drivers Column (SHAP Bar Rendering) */
.absa-drivers-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.absa-drivers-column__title {
  font-size: 0.85rem;
  font-weight: 700;
}

.absa-driver-item {
  display: flex;
  flex-direction: column;
}

.absa-driver-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.825rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.absa-driver-value--negative {
  color: #DC2626;
}

.absa-driver-bar-bg {
  height: 8px;
  background: #E5E7EB;
  border-radius: 4px;
  overflow: hidden;
}

.absa-driver-bar-fill {
  height: 100%;
  background: #BE0F2C;
  border-radius: 4px;
}

.absa-driver-sub {
  font-size: 0.725rem;
  color: #6B7280;
  margin-top: 4px;
}

/* ── FR-CUST-03: Lifecycle Journey Timeline ── */
.absa-timeline-card {
  padding: 20px 24px;
}

.absa-timeline-card__title {
  font-size: 0.75rem;
  font-weight: 800;
  color: #4B5563;
  letter-spacing: 0.05em;
  margin-bottom: 24px;
}

.absa-timeline-wrapper {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
  margin-bottom: 10px;
}

.absa-timeline-line {
  position: absolute;
  top: 7px;
  left: 60px;
  right: 60px;
  height: 2px;
  background: #BE0F2C;
  z-index: 1;
}

.absa-timeline-node {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.absa-timeline-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #BE0F2C;
  border: 3px solid #FFFFFF;
}

.absa-timeline-node--current .absa-timeline-dot {
  background: #111827;
  width: 18px;
  height: 18px;
}

.absa-timeline-transition {
  position: absolute;
  top: -28px;
  background: #8B0015;
  color: #FFFFFF;
  font-size: 0.65rem;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 3px;
}

.absa-timeline-state {
  font-size: 0.8rem;
  font-weight: 800;
  margin-top: 8px;
}

.absa-timeline-time {
  font-size: 0.7rem;
  color: #6B7280;
}

/* ── Bottom Grid (FR-CUST-05 & FR-CUST-06) ── */
.absa-grid-bottom {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

/* NBA Hero Card (FR-CUST-05) */
.absa-nba-card {
  background: linear-gradient(135deg, #7A0010 0%, #3B0007 100%);
  border-radius: 8px;
  color: #FFFFFF;
  display: grid;
  grid-template-columns: 140px 1fr;
  overflow: hidden;
}

.absa-nba-card__left {
  background: rgba(0, 0, 0, 0.2);
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.absa-nba-card__exclamation {
  font-size: 2.5rem;
  font-weight: 900;
  line-height: 1;
  margin-bottom: 8px;
}

.absa-nba-card__label-main {
  font-weight: 800;
  font-size: 0.95rem;
}

.absa-nba-card__sub-main {
  font-size: 0.65rem;
  opacity: 0.7;
  margin-top: 4px;
}

.absa-nba-card__right {
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.absa-nba-card__header-tags {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.absa-nba-tag--priority {
  background: rgba(255, 255, 255, 0.15);
  font-size: 0.65rem;
  font-weight: 800;
  padding: 3px 8px;
  border-radius: 4px;
}

.absa-nba-confidence {
  display: flex;
  align-items: center;
  gap: 6px;
}

.absa-nba-confidence__label {
  font-size: 0.65rem;
  opacity: 0.8;
}

.absa-nba-confidence__value {
  font-size: 1.1rem;
  font-weight: 900;
}

.absa-nba-card__title {
  font-size: 1.25rem;
  font-weight: 800;
  margin: 0 0 8px 0;
}

.absa-nba-card__desc {
  font-size: 0.8rem;
  line-height: 1.4;
  opacity: 0.9;
  margin: 0 0 20px 0;
  flex: 1;
}

.absa-nba-card__actions {
  display: flex;
  gap: 12px;
}

.absa-btn-log-action {
  background: #FFFFFF;
  color: #8B0015;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 800;
  font-size: 0.825rem;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.absa-btn-dismiss {
  background: rgba(255, 255, 255, 0.15);
  color: #FFFFFF;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 700;
  font-size: 0.825rem;
  cursor: pointer;
}

/* Action History Card (FR-CUST-06) */
.absa-history-card {
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
}

.absa-history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.absa-history-header__title {
  font-size: 0.75rem;
  font-weight: 800;
  color: #4B5563;
  letter-spacing: 0.05em;
}

.absa-history-header__controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.absa-history-dropdown {
  background: transparent;
  border: none;
  font-size: 0.85rem;
  font-weight: 700;
  color: #BE0F2C;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
}

.absa-history-view-all {
  font-size: 0.8rem;
  font-weight: 700;
  color: #BE0F2C;
  text-decoration: none;
}

.absa-history-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.absa-history-item {
  background: #F9FAFB;
  border-radius: 6px;
  padding: 12px 14px;
  display: flex;
  gap: 12px;
}

.absa-history-item__icon {
  color: #BE0F2C;
  margin-top: 2px;
}

.absa-history-item__content {
  flex: 1;
}

.absa-history-item__top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.absa-history-item__type {
  font-weight: 700;
  font-size: 0.825rem;
}

.absa-history-item__date {
  font-size: 0.725rem;
  color: #6B7280;
}

.absa-history-item__text {
  font-size: 0.775rem;
  color: #4B5563;
  margin: 0;
  line-height: 1.35;
}

/* Modal Popup Styles */
.absa-modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.absa-modal {
  background: #FFFFFF;
  border-radius: 8px;
  width: 480px;
  padding: 24px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}

.absa-modal__title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 800;
  color: #BE0F2C;
}

.absa-modal__subtitle {
  font-size: 0.8rem;
  color: #6B7280;
  margin: 4px 0 16px 0;
}

.absa-form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}

.absa-form-label {
  font-size: 0.8rem;
  font-weight: 700;
}

.absa-form-select, .absa-form-textarea {
  border: 1px solid #D1D5DB;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 0.85rem;
  outline: none;
}

.absa-modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
}

.absa-btn-cancel {
  background: #F3F4F6;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 700;
  cursor: pointer;
}

.absa-btn-submit {
  background: #BE0F2C;
  color: #FFFFFF;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 700;
  cursor: pointer;
}
</style>