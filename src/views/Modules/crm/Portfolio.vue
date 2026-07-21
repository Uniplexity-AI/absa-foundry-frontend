<template>
  <div class="absa-dashboard-layout">
    <!-- ── Left Sidebar Navigation ── -->
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

    <!-- ── Main Content Area ── -->
    <main class="absa-main">
      <!-- Top Header Navigation Bar -->
      <header class="absa-topbar">
        <h1 class="absa-topbar__title">Portfolio Overview</h1>

        <div class="absa-topbar__right">
          <!-- FR-DASH-03: Search Input -->
          <div class="absa-search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input 
              v-model="searchQuery" 
              class="absa-search__input" 
              type="text" 
              placeholder="Search customer, account or ID..." 
            />
          </div>

          <button class="absa-icon-btn" aria-label="Notifications">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
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

      <!-- Main Body Container -->
      <div class="absa-content">
        <!-- Dashboard Welcome & Period Selector Header -->
        <div class="absa-page-header">
          <div>
            <h2 class="absa-page-header__title">Customer Lifecycle Prediction Hub</h2>
            <p class="absa-page-header__subtitle">Real-time risk scoring, CLV estimations & AI-driven retention triggers.</p>
          </div>

          <!-- FR-DASH-04: Period Selector -->
          <div class="absa-period-selector">
            <label class="absa-period-selector__label">Snapshot Period:</label>
            <select v-model="selectedPeriod" class="absa-period-selector__select">
              <option value="latest">Latest Snapshot (July 20, 2026)</option>
              <option value="2026-06-30">June 30, 2026</option>
              <option value="2026-05-31">May 31, 2026</option>
              <option value="2026-04-30">April 30, 2026</option>
            </select>
          </div>
        </div>

        <!-- ── FR-DASH-01: Summary KPI Cards ── -->
        <div class="absa-kpi-grid">
          <!-- Total Customers -->
          <div 
            class="absa-card absa-kpi-card" 
            :class="{ 'absa-kpi-card--active': activeStateFilter === 'ALL' }"
            @click="filterByState('ALL')"
          >
            <div class="absa-kpi-card__label">Total Portfolio</div>
            <div class="absa-kpi-card__value">1,240</div>
            <div class="absa-kpi-card__sub absa-kpi-card__sub--up">↑ +2.4% vs last period</div>
          </div>

          <!-- At Risk (Color coded as per FR-DASH-01: Amber/Red threshold) -->
          <div 
            class="absa-card absa-kpi-card absa-kpi-card--critical" 
            :class="{ 'absa-kpi-card--active': activeStateFilter === 'At Risk' }"
            @click="filterByState('At Risk')"
          >
            <div class="absa-kpi-card__label">At Risk</div>
            <div class="absa-kpi-card__value">
              68 <span class="absa-kpi-card__rate">| 5.5%</span>
            </div>
            <div class="absa-kpi-card__sub absa-kpi-card__sub--down">↑ +4 since last snapshot</div>
          </div>

          <!-- Dormant -->
          <div 
            class="absa-card absa-kpi-card absa-kpi-card--warning" 
            :class="{ 'absa-kpi-card--active': activeStateFilter === 'Dormant' }"
            @click="filterByState('Dormant')"
          >
            <div class="absa-kpi-card__label">Dormant Accounts</div>
            <div class="absa-kpi-card__value">42 <span class="absa-kpi-card__rate">| 3.4%</span></div>
            <div class="absa-kpi-card__sub">Stable across 3 periods</div>
          </div>

          <!-- Actions Due Today -->
          <div 
            class="absa-card absa-kpi-card absa-kpi-card--action"
            @click="filterByActions()"
          >
            <div class="absa-kpi-card__label">Actions Due Today</div>
            <div class="absa-kpi-card__value">12</div>
            <div class="absa-kpi-card__sub absa-kpi-card__sub--urgent">8 URGENT | 4 ROUTINE</div>
          </div>
        </div>

        <!-- ── FR-DASH-02: Priority Alerts ── -->
        <div class="absa-card absa-alerts-panel">
          <div class="absa-section-header">
            <div class="absa-section-header__title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#BE0F2C"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12" stroke="white" stroke-width="2"/><line x1="12" y1="16" x2="12.01" y2="16" stroke="white" stroke-width="2"/></svg>
              🚨 Priority Risk Alerts
            </div>
            <span class="absa-badge absa-badge--critical">{{ activeAlerts.length }} Active Triggers</span>
          </div>

          <div class="absa-alerts-list">
            <div 
              v-for="alert in activeAlerts" 
              :key="alert.id" 
              class="absa-alert-item"
              :class="'absa-alert-item--' + alert.severity"
            >
              <div class="absa-alert-item__content">
                <div class="absa-alert-item__title">
                  <a :href="'/customers/' + alert.customerId" class="absa-alert-link">{{ alert.customerName }}</a>
                  — {{ alert.title }}
                </div>
                <div class="absa-alert-item__detail">{{ alert.detail }}</div>
              </div>
              <button class="absa-btn-acknowledge" @click="acknowledgeAlert(alert.id)">
                ACKNOWLEDGE
              </button>
            </div>
          </div>
        </div>

        <!-- ── FR-DASH-03: Customer Table Section ── -->
        <div class="absa-card absa-table-panel">
          <div class="absa-table-header">
            <div class="absa-table-header__left">
              <h3 class="absa-table-title">Predictive Portfolio Ledger</h3>
              <span class="absa-table-subtitle">Showing {{ filteredCustomers.length }} customers</span>
            </div>

            <!-- Table Filters -->
            <div class="absa-table-filters">
              <select v-model="stateFilter" class="absa-filter-select">
                <option value="ALL">All States</option>
                <option value="Active">Active</option>
                <option value="At Risk">At Risk</option>
                <option value="Dormant">Dormant</option>
                <option value="Churned">Churned</option>
              </select>

              <select v-model="branchFilter" class="absa-filter-select">
                <option value="ALL">All Branches</option>
                <option value="Lusaka Main">Lusaka Main</option>
                <option value="Kitwe Central">Kitwe Central</option>
                <option value="Ndola Corporate">Ndola Corporate</option>
              </select>
            </div>
          </div>

          <!-- Customer Data Table -->
          <table class="absa-table">
            <thead>
              <tr>
                <th @click="sortBy('name')" class="sortable">Customer Name</th>
                <th>State</th>
                <th @click="sortBy('healthScore')" class="sortable">Health Score</th>
                <th @click="sortBy('churnProb')" class="sortable">Churn Prob (%)</th>
                <th @click="sortBy('clv')" class="sortable">CLV (ZMW)</th>
                <th>Recommended Action</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="cust in paginatedCustomers" 
                :key="cust.id" 
                class="absa-table-row"
                @click="navigateToCustomer(cust.id)"
              >
                <!-- Name & ID -->
                <td class="absa-table__cell-name">
                  <div class="absa-cust-name">{{ cust.name }}</div>
                  <div class="absa-cust-id">ID: {{ cust.id }}</div>
                </td>

                <!-- State Pill -->
                <td>
                  <span class="absa-status-pill" :class="'absa-status-pill--' + cust.state.toLowerCase().replace(' ', '-')">
                    {{ cust.state }}
                  </span>
                </td>

                <!-- Health Score Bar Gauge -->
                <td>
                  <div class="absa-health-bar-cell">
                    <span class="absa-health-score-val" :class="getHealthClass(cust.healthScore)">
                      {{ cust.healthScore }}
                    </span>
                    <div class="absa-health-bar-bg">
                      <div 
                        class="absa-health-bar-fill" 
                        :class="getHealthBgClass(cust.healthScore)"
                        :style="{ width: cust.healthScore + '%' }"
                      ></div>
                    </div>
                  </div>
                </td>

                <!-- Churn Probability -->
                <td class="absa-table__cell-numeric" :class="{ 'absa-val-high-risk': cust.churnProb >= 50 }">
                  {{ cust.churnProb }}%
                </td>

                <!-- CLV Value -->
                <td class="absa-table__cell-numeric font-mono">
                  ZMW {{ cust.clv.toLocaleString() }}
                </td>

                <!-- Recommended Next Best Action Button -->
                <td @click.stop>
                  <button 
                    class="absa-action-btn" 
                    :class="getActionBtnClass(cust.actionType)"
                    @click="triggerQuickAction(cust)"
                  >
                    {{ cust.recommendedAction }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Pagination Footer -->
          <div class="absa-pagination">
            <span class="absa-pagination__info">Page {{ currentPage }} of {{ totalPages }}</span>
            <div class="absa-pagination__buttons">
              <button :disabled="currentPage === 1" @click="currentPage--" class="absa-btn-page">Previous</button>
              <button :disabled="currentPage === totalPages" @click="currentPage++" class="absa-btn-page">Next</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// ── State Management & Data ──
const selectedPeriod = ref('latest');
const searchQuery = ref('');
const stateFilter = ref('ALL');
const branchFilter = ref('ALL');
const activeStateFilter = ref('ALL');
const currentPage = ref(1);
const itemsPerPage = 25;

// FR-DASH-02: Priority Alerts Mock Data
const activeAlerts = ref([
  { id: 101, customerId: '994022/11/1', customerName: 'Mwenda Kapambwe', title: 'Health Score Drop -25', detail: 'Significant decrease in incoming wire transfers over last 30 days.', severity: 'critical' },
  { id: 102, customerId: '883921/10/2', customerName: 'Joseph Phiri', title: 'State Transition: At Risk', detail: 'Customer moved from Active to At Risk based on behavioral scoring.', severity: 'warning' },
  { id: 103, customerId: '772109/44/1', customerName: 'Patricia Lungu', title: 'Large Withdrawal Detected', detail: 'Withdrawal of ZMW 450,000 from Savings account.', severity: 'critical' }
]);

// Customer Dataset for Dashboard Ledger (FR-DASH-03)
const customers = ref([
  { id: '994022/11/1', name: 'Mwenda Kapambwe', state: 'Churned', healthScore: 22, churnProb: 89, clv: 450000, recommendedAction: 'RETENTION CALL', actionType: 'critical', branch: 'Lusaka Main' },
  { id: '883921/10/2', name: 'Joseph Phiri', state: 'At Risk', healthScore: 48, churnProb: 52, clv: 280000, recommendedAction: 'BALANCE REVIEW', actionType: 'warning', branch: 'Lusaka Main' },
  { id: '772109/44/1', name: 'Patricia Lungu', state: 'Active', healthScore: 82, churnProb: 8, clv: 1200000, recommendedAction: 'UPSELL OPPORTUNITY', actionType: 'success', branch: 'Kitwe Central' },
  { id: '552190/33/2', name: 'Sibongile Banda', state: 'Dormant', healthScore: 35, churnProb: 18, clv: 95000, recommendedAction: 'KYC UPDATE', actionType: 'neutral', branch: 'Ndola Corporate' },
  { id: '441092/12/3', name: 'Chanda Mulenga', state: 'Active', healthScore: 91, churnProb: 3, clv: 670000, recommendedAction: 'INVESTMENT REVIEW', actionType: 'success', branch: 'Lusaka Main' },
  { id: '332019/88/1', name: 'Kondwani Tembo', state: 'At Risk', healthScore: 41, churnProb: 64, clv: 310000, recommendedAction: 'FIXED DEPOSIT OFFER', actionType: 'warning', branch: 'Kitwe Central' }
]);

// Filter & Search Logic
const filteredCustomers = computed(() => {
  return customers.value.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          c.id.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesState = stateFilter.value === 'ALL' || c.state === stateFilter.value;
    const matchesBranch = branchFilter.value === 'ALL' || c.branch === branchFilter.value;
    return matchesSearch && matchesState && matchesBranch;
  });
});

const totalPages = computed(() => Math.ceil(filteredCustomers.value.length / itemsPerPage) || 1);

const paginatedCustomers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredCustomers.value.slice(start, start + itemsPerPage);
});

// KPI Card Filter Trigger (FR-DASH-01)
const filterByState = (state: string) => {
  activeStateFilter.value = state;
  stateFilter.value = state;
};

const filterByActions = () => {
  stateFilter.value = 'At Risk';
};

// Alert Action Trigger (FR-DASH-02)
const acknowledgeAlert = (id: number) => {
  activeAlerts.value = activeAlerts.value.filter(a => a.id !== id);
};

// Table Helper Styles
const getHealthClass = (score: number) => {
  if (score < 40) return 'text-red-600';
  if (score < 70) return 'text-amber-600';
  return 'text-green-600';
};

const getHealthBgClass = (score: number) => {
  if (score < 40) return 'bg-red-600';
  if (score < 70) return 'bg-amber-500';
  return 'bg-green-600';
};

const getActionBtnClass = (type: string) => {
  switch (type) {
    case 'critical': return 'absa-btn--critical';
    case 'warning': return 'absa-btn--warning';
    case 'success': return 'absa-btn--success';
    default: return 'absa-btn--neutral';
  }
};

const navigateToCustomer = (id: string) => {
  window.location.href = `/customers/${id}`;
};

const triggerQuickAction = (customer: any) => {
  alert(`Initiating action: ${customer.recommendedAction} for ${customer.name}`);
};

const sortBy = (field: string) => {
  // Sort logic placeholder for table columns
};
</script>

<style scoped>
/* ════════════════════════════════════════════════════════
   Absa Bank Design Tokens & Landing Page Layout
   ════════════════════════════════════════════════════════ */

.absa-dashboard-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  min-height: 100vh;
  background-color: #F8F9FA;
  font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  color: #1F2937;
}

/* ── Sidebar ── */
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

.absa-nav-item:hover { background: #F3F4F6; }

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

/* ── Topbar ── */
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

.absa-topbar__right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.absa-search {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #F3F4F6;
  border-radius: 20px;
  padding: 6px 16px;
  width: 320px;
}

.absa-search__input {
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
  font-size: 0.85rem;
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

.absa-topbar__user-name { font-weight: 700; font-size: 0.85rem; }
.absa-topbar__user-role { font-size: 0.725rem; color: #6B7280; }

/* ── Content Body ── */
.absa-content {
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.absa-page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.absa-page-header__title {
  font-size: 1.2rem;
  font-weight: 800;
  margin: 0 0 4px 0;
  color: #1F2937;
}

.absa-page-header__subtitle {
  font-size: 0.8rem;
  color: #6B7280;
  margin: 0;
}

.absa-period-selector {
  display: flex;
  align-items: center;
  gap: 8px;
}

.absa-period-selector__label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #4B5563;
}

.absa-period-selector__select {
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #D1D5DB;
  background: #FFFFFF;
  font-size: 0.8rem;
  font-weight: 700;
  color: #1F2937;
}

/* ── KPI Grid ── */
.absa-kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.absa-card {
  background: #FFFFFF;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.absa-kpi-card {
  padding: 16px 20px;
  cursor: pointer;
  transition: transform 0.15s, border-color 0.15s;
}

.absa-kpi-card:hover {
  transform: translateY(-2px);
  border-color: #BE0F2C;
}

.absa-kpi-card--active {
  border: 2px solid #BE0F2C;
  background: #FFF5F5;
}

.absa-kpi-card__label {
  font-size: 0.75rem;
  font-weight: 700;
  color: #6B7280;
  text-transform: uppercase;
}

.absa-kpi-card__value {
  font-size: 1.8rem;
  font-weight: 900;
  color: #1F2937;
  margin: 6px 0;
}

.absa-kpi-card__rate {
  font-size: 0.9rem;
  color: #6B7280;
  font-weight: 600;
}

.absa-kpi-card__sub {
  font-size: 0.725rem;
  color: #6B7280;
}

.absa-kpi-card__sub--up { color: #16A34A; font-weight: 700; }
.absa-kpi-card__sub--down { color: #DC2626; font-weight: 700; }
.absa-kpi-card__sub--urgent { color: #BE0F2C; font-weight: 800; }

/* ── Alerts Panel ── */
.absa-alerts-panel {
  padding: 20px;
}

.absa-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.absa-section-header__title {
  font-weight: 800;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.absa-badge--critical {
  background: #FEE2E2;
  color: #DC2626;
  font-size: 0.65rem;
  font-weight: 800;
  padding: 3px 8px;
  border-radius: 4px;
}

.absa-alerts-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.absa-alert-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  border-radius: 6px;
  background: #FFF5F5;
  border-left: 4px solid #DC2626;
}

.absa-alert-item--warning {
  background: #FFFBEB;
  border-left-color: #F59E0B;
}

.absa-alert-link {
  color: #BE0F2C;
  font-weight: 800;
  text-decoration: none;
}

.absa-alert-item__title { font-size: 0.8rem; font-weight: 700; }
.absa-alert-item__detail { font-size: 0.725rem; color: #6B7280; }

.absa-btn-acknowledge {
  background: transparent;
  border: 1px solid #DC2626;
  color: #DC2626;
  font-size: 0.65rem;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
}

/* ── Table Panel ── */
.absa-table-panel {
  padding: 20px;
}

.absa-table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.absa-table-title { font-size: 0.95rem; font-weight: 800; margin: 0; }
.absa-table-subtitle { font-size: 0.725rem; color: #6B7280; }

.absa-table-filters {
  display: flex;
  gap: 8px;
}

.absa-filter-select {
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #D1D5DB;
  font-size: 0.75rem;
  font-weight: 600;
}

.absa-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.absa-table th {
  padding: 10px 12px;
  font-size: 0.725rem;
  font-weight: 800;
  color: #6B7280;
  text-transform: uppercase;
  border-bottom: 2px solid #F3F4F6;
}

.absa-table-row {
  cursor: pointer;
  transition: background 0.1s;
}

.absa-table-row:hover { background: #F9FAFB; }

.absa-table td {
  padding: 12px;
  border-bottom: 1px solid #F3F4F6;
  font-size: 0.8rem;
}

.absa-cust-name { font-weight: 700; color: #1F2937; }
.absa-cust-id { font-size: 0.7rem; color: #6B7280; font-family: monospace; }

.absa-status-pill {
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.65rem;
  font-weight: 800;
}

.absa-status-pill--active { background: #DCFCE7; color: #15803D; }
.absa-status-pill--at-risk { background: #FEF3C7; color: #B45309; }
.absa-status-pill--dormant { background: #F3F4F6; color: #4B5563; }
.absa-status-pill--churned { background: #FEE2E2; color: #B91C1C; }

/* Health score gauge bar cell */
.absa-health-bar-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.absa-health-score-val { font-weight: 900; width: 20px; }

.absa-health-bar-bg {
  width: 80px;
  height: 6px;
  background: #E5E7EB;
  border-radius: 3px;
  overflow: hidden;
}

.absa-health-bar-fill { height: 100%; border-radius: 3px; }

.text-red-600 { color: #DC2626; }
.text-amber-600 { color: #D97706; }
.text-green-600 { color: #16A34A; }

.bg-red-600 { background: #DC2626; }
.bg-amber-500 { background: #F59E0B; }
.bg-green-600 { background: #16A34A; }

.absa-val-high-risk { color: #DC2626; font-weight: 800; }
.font-mono { font-family: monospace; }

/* Action Buttons */
.absa-action-btn {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.65rem;
  font-weight: 800;
  border: none;
  cursor: pointer;
}

.absa-btn--critical { background: #FEE2E2; color: #DC2626; }
.absa-btn--warning { background: #FEF3C7; color: #B45309; }
.absa-btn--success { background: #DCFCE7; color: #15803D; }
.absa-btn--neutral { background: #F3F4F6; color: #4B5563; }

/* Pagination */
.absa-pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
}

.absa-pagination__info { font-size: 0.75rem; color: #6B7280; }

.absa-btn-page {
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #D1D5DB;
  background: #FFFFFF;
  font-size: 0.75rem;
  cursor: pointer;
}

.absa-btn-page:disabled { opacity: 0.5; cursor: not-allowed; }
</style>