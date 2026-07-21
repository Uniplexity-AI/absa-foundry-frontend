<template>
  <div class="absa-db-page">
    <!-- Content Area -->
    <div v-if="!loading">
      <!-- Breadcrumb -->
      <div class="absa-db-breadcrumb">
        <span>Home</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        <span>Dashboard</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        <span class="absa-db-breadcrumb__current">Portfolio Overview</span>
      </div>

        <!-- ═══ 4 KPI Summary Cards ═══ -->
        <div class="absa-db-kpi-grid">
          <div class="absa-db-kpi-card">
            <div class="absa-db-kpi-card__label">TOTAL CUSTOMERS</div>
            <div class="absa-db-kpi-card__value">1,240</div>
            <div class="absa-db-kpi-card__trend absa-db-kpi-card__trend--up">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
              +2.4%
            </div>
            <div class="absa-db-kpi-card__accent absa-db-kpi-card__accent--blue"></div>
          </div>

          <div class="absa-db-kpi-card">
            <div class="absa-db-kpi-card__label">AT RISK</div>
            <div class="absa-db-kpi-card__value">68 <span class="absa-db-kpi-card__pct">| 5.5%</span></div>
            <div class="absa-db-kpi-card__trend absa-db-kpi-card__trend--down">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>
              +4 since last snapshot
            </div>
            <div class="absa-db-kpi-card__accent absa-db-kpi-card__accent--red"></div>
          </div>

          <div class="absa-db-kpi-card">
            <div class="absa-db-kpi-card__label">DORMANT</div>
            <div class="absa-db-kpi-card__value">42 <span class="absa-db-kpi-card__pct">3.4%</span></div>
            <div class="absa-db-kpi-card__trend absa-db-kpi-card__trend--neutral">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Stable across 3 periods
            </div>
            <div class="absa-db-kpi-card__accent absa-db-kpi-card__accent--amber"></div>
          </div>

          <div class="absa-db-kpi-card">
            <div class="absa-db-kpi-card__label">ACTIONS DUE TODAY</div>
            <div class="absa-db-kpi-card__value">12</div>
            <div class="absa-db-kpi-card__subtags">
              <span class="absa-db-kpi-card__tag absa-db-kpi-card__tag--urgent">8 URGENT</span>
              <span class="absa-db-kpi-card__tag absa-db-kpi-card__tag--routine">4 ROUTINE</span>
            </div>
            <div class="absa-db-kpi-card__accent absa-db-kpi-card__accent--maroon"></div>
          </div>
        </div>

        <!-- ═══ Two-Column: Alerts + Ledger ═══ -->
        <div class="absa-db-two-col">
          <!-- Critical Alerts Panel -->
          <div class="absa-db-alerts">
            <div class="absa-db-alerts__header">
              <h3 class="absa-db-alerts__title">Critical Alerts</h3>
              <span class="absa-db-alerts__badge">5 NEW</span>
            </div>
            <div class="absa-db-alerts__list">
              <div class="absa-db-alert-item" v-for="alert in criticalAlerts" :key="alert.id">
                <div class="absa-db-alert-item__icon" :class="'absa-db-alert-item__icon--' + alert.severity">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                </div>
                <div class="absa-db-alert-item__body">
                  <div class="absa-db-alert-item__top">
                    <span class="absa-db-alert-item__customer">{{ alert.customer }}</span>
                    <span class="absa-db-alert-item__time">{{ alert.time }}</span>
                  </div>
                  <div class="absa-db-alert-item__event">{{ alert.event }}</div>
                  <div class="absa-db-alert-item__detail">{{ alert.detail }}</div>
                  <button class="absa-db-alert-item__ack">ACKNOWLEDGE</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Predictive Lifecycle Ledger -->
          <div class="absa-db-ledger">
            <div class="absa-db-ledger__header">
              <h3 class="absa-db-ledger__title">Predictive Lifecycle Ledger</h3>
              <div class="absa-db-ledger__filters">
                <select class="absa-db-ledger__select">
                  <option>All States</option>
                  <option>Active</option>
                  <option>At Risk</option>
                  <option>Churned</option>
                  <option>Dormant</option>
                </select>
              </div>
            </div>
            <div class="absa-db-ledger__table-wrap">
              <table class="absa-db-ledger__table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>State</th>
                    <th>Health</th>
                    <th>Churn Prob</th>
                    <th>CLV (ZMW)</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in ledgerData" :key="row.id">
                    <td>
                      <div class="absa-db-ledger__name">{{ row.name }}</div>
                      <div class="absa-db-ledger__id">{{ row.customerId }}</div>
                    </td>
                    <td>
                      <span class="absa-db-ledger__state" :class="'absa-db-ledger__state--' + row.stateClass">{{ row.state }}</span>
                    </td>
                    <td>
                      <div class="absa-db-ledger__health">
                        <div class="absa-db-ledger__health-bar">
                          <div class="absa-db-ledger__health-fill" :class="'absa-db-ledger__health-fill--' + row.healthClass" :style="{ width: row.health + '%' }"></div>
                        </div>
                        <span class="absa-db-ledger__health-val" :class="'absa-db-ledger__health-val--' + row.healthClass">{{ row.health }}</span>
                      </div>
                    </td>
                    <td>
                      <span class="absa-db-ledger__churn" :class="'absa-db-ledger__churn--' + row.churnClass">{{ row.churnProb }}%</span>
                    </td>
                    <td class="absa-db-ledger__clv">ZMW {{ row.clv }}</td>
                    <td>
                      <span class="absa-db-ledger__action" :class="'absa-db-ledger__action--' + row.actionClass">{{ row.action }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="absa-db-ledger__pagination">
              <span>Showing 1-4 of 1,240</span>
              <div class="absa-db-ledger__page-btns">
                <button disabled><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg></button>
                <button class="absa-db-ledger__page-btn--active">1</button>
                <button>2</button>
                <button>3</button>
                <button>...</button>
                <button>310</button>
                <button><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></button>
              </div>
            </div>
          </div>
        </div>

        <!-- ═══ Bottom Row: AI + Health ═══ -->
        <div class="absa-db-bottom">
          <!-- AI Recommendation Engine -->
          <div class="absa-db-ai-card">
            <div class="absa-db-ai-card__header">
              <div class="absa-db-ai-card__icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              </div>
              <div>
                <h3 class="absa-db-ai-card__title">AI Recommendation Engine</h3>
                <span class="absa-db-ai-card__badge">SYSTEM PREDICTION</span>
              </div>
            </div>
            <div class="absa-db-ai-card__body">
              <p class="absa-db-ai-card__prediction">
                <strong>Increased dormancy predicted</strong> for segment <em>"HNI-Retail"</em> within the next 60 days unless proactive outreach is initiated. Recommend scheduling personalized relationship reviews for the top 25 accounts in this segment.
              </p>
              <div class="absa-db-ai-card__confidence">
                <span>AI Confidence</span>
                <div class="absa-db-ai-card__conf-bar">
                  <div class="absa-db-ai-card__conf-fill" style="width:87%"></div>
                </div>
                <span class="absa-db-ai-card__conf-pct">87%</span>
              </div>
            </div>
          </div>

          <!-- Portfolio Health Trend -->
          <div class="absa-db-health-card">
            <div class="absa-db-health-card__header">
              <h3 class="absa-db-health-card__title">Portfolio Health Trend</h3>
              <span class="absa-db-health-card__period">Q3 2026</span>
            </div>
            <div class="absa-db-health-card__body">
              <div class="absa-db-health-card__score">
                <div class="absa-db-health-card__score-ring">
                  <svg width="80" height="80" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="34" fill="none" stroke="#E5E7EB" stroke-width="8"/>
                    <circle cx="40" cy="40" r="34" fill="none" stroke="#16A34A" stroke-width="8"
                      stroke-dasharray="213.6" stroke-dashoffset="28" stroke-linecap="round"
                      transform="rotate(-90 40 40)"/>
                  </svg>
                  <span class="absa-db-health-card__score-val">+3.4<span class="absa-db-health-card__score-unit">pts</span></span>
                </div>
                <div class="absa-db-health-card__score-info">
                  <p class="absa-db-health-card__score-label">Overall portfolio health improved by <strong>+3.4 pts</strong> since last quarter.</p>
                  <div class="absa-db-health-card__score-items">
                    <div class="absa-db-health-card__score-item absa-db-health-card__score-item--good">
                      <span class="absa-db-health-card__score-dot"></span>
                      Active <strong>78%</strong>
                    </div>
                    <div class="absa-db-health-card__score-item absa-db-health-card__score-item--warn">
                      <span class="absa-db-health-card__score-dot"></span>
                      At Risk <strong>5.5%</strong>
                    </div>
                    <div class="absa-db-health-card__score-item absa-db-health-card__score-item--crit">
                      <span class="absa-db-health-card__score-dot"></span>
                      Churned <strong>2.1%</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- KPI Section (from existing functionality) -->
        <KpiSection
          v-if="showKpis"
          :showKpis="showKpis"
          :graphsVisible="true"
          :showKpiToggle="true"
          :showGraphToggle="false"
          title="KEY METRICS"
          @toggle-kpis="showKpis = !showKpis"
          class="absa-db-kpi-section"
        >
          <template #kpis>
            <KpiCard
              v-for="kpi in kpiList"
              :key="kpi.id"
              :label="kpi.label"
              :value="kpi.value.value"
              :format="kpi.format"
              :currency="kpi.currency || ''"
              :trend="kpi.value.trend"
              :subLabel="kpi.subLabel"
              :navigateTo="kpi.route"
              :loading="kpi.value.loading"
              :accentColor="kpi.accentColor"
              :actions="kpi.actions"
            />
          </template>
        </KpiSection>

        <!-- Dashboard Widgets -->
        <DashboardWidgets class="absa-db-widgets" />
    </div>

    <!-- Loading State -->
    <div class="absa-db-loading" v-else>
      <div class="absa-db-loading__spinner"></div>
      <p>Loading Portfolio Overview...</p>
    </div>

    <!-- ═══ Popups (from existing) ═══ -->
    <div v-if="showApprovalPopup" class="absa-db-overlay" @click.self="showApprovalPopup = false">
      <div class="absa-db-popup">
        <div class="absa-db-popup__accent"></div>
        <div class="absa-db-popup__icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#BE0F2C" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        </div>
        <h2>Access Pending</h2>
        <p>Your subscription request has been submitted. Please contact the administrator for approval:</p>
        <div class="absa-db-popup__contact">
          <p class="absa-db-popup__contact-label">Contact Credentials:</p>
          <p class="absa-db-popup__contact-name">Kondwani Nyirenda</p>
          <p><a href="tel:+260960322980">+260 960 322 980</a></p>
        </div>
        <button @click="showApprovalPopup = false" class="absa-db-btn absa-db-btn--primary absa-db-btn--block">Acknowledge</button>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="showModulePopup" class="absa-db-overlay" @click.self="showModulePopup = false">
        <div class="absa-db-popup">
          <div class="absa-db-popup__accent"></div>
          <div class="absa-db-popup__icon absa-db-popup__icon--large">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#BE0F2C" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          </div>
          <h2>Expand Your Workspace</h2>
          <p>You are currently using the <strong>Standard Core</strong>. Unlock advanced business modules like POS, Inventory, and HRM to start scaling your operations.</p>
          <div class="absa-db-popup__actions">
            <button v-if="canAccessSettings" @click="goTo('/dashboard/settings?tab=modules')" class="absa-db-btn absa-db-btn--primary absa-db-btn--block">
              Explore Modules
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
            <button @click="showModulePopup = false" class="absa-db-btn absa-db-btn--ghost absa-db-btn--block">Maybe Later</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { decodeJWT } from '@/services/decodeJWT.js';
import API_BASE_URL from '@/services/api';
import KpiSection from '@/components/ui/KpiSection.vue';
import KpiCard from '@/components/ui/KpiCard.vue';
import DashboardWidgets from '@/components/ui/DashboardWidgets.vue';
import { useDashboardWidgets } from '@/composables/useDashboardWidgets';
// Widget components to be implemented: RevenueWidget, PendingTasksWidget
import '@/assets/main.css';
import { useCurrency } from '@/composables/useCurrency.js';
// import { useAuthStore } from '@/stores/useAuthStore';
import { useRBAC } from '@/composables/useRBAC';
import { getModuleCards } from '@/config/moduleCards.js';

const router = useRouter();
const { getTenantId, getUserRole, getUserEmail, getCompanyName } = decodeJWT();
const { hasPermission, initializeRBAC, isAdmin, isSuperAdmin } = useRBAC();

const userRole = ref(getUserRole() || 'user');
const companyName = ref(getCompanyName() || localStorage.getItem('company_name') || '');
const subscribedModules = ref([]);
const loading = ref(true);
const kpiLoading = ref(true);
const showKpis = ref(false);
const showApprovalPopup = ref(false);
const showModulePopup = ref(false);
const cards = getModuleCards();

const canAccessSettings = computed(() => isAdmin.value || isSuperAdmin.value || hasPermission('settings', 'read'));

const greeting = computed(() => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
});

const userFirstName = computed(() => {
  const email = getUserEmail() || '';
  if (!email) return userRole.value;
  if (email.toLowerCase().startsWith('info@')) {
    return companyName.value || 'Company';
  }
  const namePart = email.split('@')[0];
  return namePart.charAt(0).toUpperCase() + namePart.slice(1);
});

const userInitial = computed(() => {
  return userFirstName.value.charAt(0).toUpperCase();
});

const currentDateFixed = computed(() => {
  return new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
});

const { formatCurrency } = useCurrency();

// Register dashboard widgets (components to be implemented)
const { registerWidgets } = useDashboardWidgets()
registerWidgets([
  // { id: 'revenue', label: 'Revenue', icon: 'fas fa-chart-line', component: RevenueWidget },
  // { id: 'pending-tasks', label: 'Pending Tasks', icon: 'fas fa-tasks', component: PendingTasksWidget },
])

// ─── Mock Dashboard Data (Portfolio Overview) ──────────────────
const criticalAlerts = ref([
  {
    id: 1,
    customer: 'M. Kapambwe',
    time: '2h ago',
    event: 'Health Score drop -25',
    detail: 'Significant decrease in incoming wire transfers over last 30 days.',
    severity: 'critical'
  },
  {
    id: 2,
    customer: 'J. Phiri',
    time: '4h ago',
    event: 'State Transition: At Risk',
    detail: 'Churn probability exceeds 45% threshold.',
    severity: 'warning'
  },
  {
    id: 3,
    customer: 'P. Lungu',
    time: 'Yesterday',
    event: 'Large Withdrawal Detected',
    detail: 'Withdrawal of ZMW 450,000 from Savings account.',
    severity: 'info'
  }
])

const ledgerData = ref([
  {
    id: 1,
    name: 'Mwenda Kapambwe',
    customerId: '994022/11/1',
    state: 'Churned',
    stateClass: 'churned',
    health: 22,
    healthClass: 'critical',
    churnProb: 92,
    churnClass: 'high',
    clv: '1.2M',
    action: 'RETENTION CALL',
    actionClass: 'critical'
  },
  {
    id: 2,
    name: 'Joseph Phiri',
    customerId: '884512/08/3',
    state: 'At Risk',
    stateClass: 'atrisk',
    health: 45,
    healthClass: 'warning',
    churnProb: 48,
    churnClass: 'mid',
    clv: '0.8M',
    action: 'BALANCE REVIEW',
    actionClass: 'warning'
  },
  {
    id: 3,
    name: 'Patricia Lungu',
    customerId: '772301/04/2',
    state: 'Active',
    stateClass: 'active',
    health: 88,
    healthClass: 'good',
    churnProb: 3,
    churnClass: 'low',
    clv: '4.5M',
    action: 'UPSELL OPPORTUNITY',
    actionClass: 'success'
  },
  {
    id: 4,
    name: 'Sibongile Banda',
    customerId: '661890/02/7',
    state: 'Dormant',
    stateClass: 'dormant',
    health: 35,
    healthClass: 'warning',
    churnProb: 22,
    churnClass: 'low',
    clv: '0.3M',
    action: 'KYC UPDATE',
    actionClass: 'info'
  }
])

// ─── KPI Definitions ───────────────────────────────────────────
const kpiData = reactive({
  revenue: { value: null, trend: null, loading: true },
  expenses: { value: null, trend: null, loading: true },
  invoices: { value: null, trend: null, loading: true },
  payroll: { value: null, trend: null, loading: true },
  posToday: { value: null, trend: null, loading: true },
  inventory: { value: null, trend: null, loading: true }
})

const kpiList = computed(() => [
  {
    id: 'revenue',
    label: 'Total Revenue',
    value: kpiData.revenue,
    format: 'currency',
    currency: 'K',
    route: '/dashboard/finance',
    subLabel: 'All-time revenue',
    accentColor: '#16a34a',
    actions: [
      { label: 'New Invoice', icon: 'fas fa-plus', to: '/dashboard/invoicing', variant: 'primary' },
      { label: 'Reports', icon: 'fas fa-chart-bar', to: '/dashboard/reports' }
    ]
  },
  {
    id: 'expenses',
    label: 'Total Expenses',
    value: kpiData.expenses,
    format: 'currency',
    currency: 'K',
    route: '/dashboard/expenses',
    subLabel: 'Month to date',
    accentColor: '#dc2626',
    actions: [
      { label: 'Add Expense', icon: 'fas fa-plus', to: '/dashboard/expenses', variant: 'primary' },
      { label: 'Reports', icon: 'fas fa-chart-bar', to: '/dashboard/reports' }
    ]
  },
  {
    id: 'invoices',
    label: 'Active Invoices',
    value: kpiData.invoices,
    format: 'number',
    route: '/dashboard/invoicing',
    subLabel: 'Pending / overdue',
    accentColor: '#2563eb',
    actions: [
      { label: 'New Invoice', icon: 'fas fa-file-invoice', to: '/dashboard/invoicing', variant: 'primary' },
      { label: 'View All', icon: 'fas fa-list', to: '/dashboard/invoicing' }
    ]
  },
  {
    id: 'payroll',
    label: 'Pending Payroll',
    value: kpiData.payroll,
    format: 'currency',
    currency: 'K',
    route: '/dashboard/payroll',
    subLabel: 'This pay period',
    accentColor: '#9333ea',
    actions: [
      { label: 'Process', icon: 'fas fa-cog', to: '/dashboard/payroll', variant: 'primary' },
      { label: 'Reports', icon: 'fas fa-chart-bar', to: '/dashboard/reports' }
    ]
  },
  {
    id: 'posToday',
    label: 'POS Today',
    value: kpiData.posToday,
    format: 'currency',
    currency: 'K',
    route: '/dashboard/pos',
    subLabel: 'Today\'s sales',
    accentColor: '#0891b2',
    actions: [
      { label: 'Open POS', icon: 'fas fa-cash-register', to: '/dashboard/pos', variant: 'primary' },
      { label: 'History', icon: 'fas fa-clock', to: '/dashboard/pos' }
    ]
  },
  {
    id: 'inventory',
    label: 'Inventory Items',
    value: kpiData.inventory,
    format: 'number',
    route: '/dashboard/inventory',
    subLabel: 'Low stock alert',
    accentColor: '#d97706',
    actions: [
      { label: 'Add Item', icon: 'fas fa-plus', to: '/dashboard/inventory', variant: 'primary' },
      { label: 'Stock Count', icon: 'fas fa-cubes', to: '/dashboard/inventory' }
    ]
  }
])

// ─── KPI Fetching ──────────────────────────────────────────────
async function fetchKpis() {
  const tenantId = getTenantId()
  if (!tenantId) {
    Object.values(kpiData).forEach(k => { k.loading = false })
    return
  }

  kpiLoading.value = true

  const fetchers = [
    {
      key: 'revenue',
      url: `${API_BASE_URL}/sales/dashboard-summary?tenant_id=${tenantId}`,
      transform: (d) => ({ value: d?.total_revenue ?? d?.revenue ?? null, trend: d?.revenue_trend ?? null })
    },
    {
      key: 'expenses',
      url: `${API_BASE_URL}/expenses/summary?tenant_id=${tenantId}`,
      transform: (d) => ({ value: d?.total_expenses ?? d?.total ?? null, trend: d?.expense_trend ?? null })
    },
    {
      key: 'invoices',
      url: `${API_BASE_URL}/invoicing/summary?tenant_id=${tenantId}`,
      transform: (d) => ({ value: d?.active_invoices ?? d?.pending_count ?? null, trend: null })
    },
    {
      key: 'payroll',
      url: `${API_BASE_URL}/payroll/summary?tenant_id=${tenantId}`,
      transform: (d) => ({ value: d?.pending_total ?? d?.total ?? null, trend: null })
    },
    {
      key: 'posToday',
      url: `${API_BASE_URL}/pos/today?tenant_id=${tenantId}`,
      transform: (d) => ({ value: d?.total_sales ?? d?.today_total ?? null, trend: d?.trend ?? null })
    },
    {
      key: 'inventory',
      url: `${API_BASE_URL}/inventory/summary?tenant_id=${tenantId}`,
      transform: (d) => ({ value: d?.total_items ?? d?.item_count ?? null, trend: null })
    }
  ]

  const results = await Promise.allSettled(
    fetchers.map(async ({ key, url, transform }) => {
      const res = await fetch(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      const { value, trend } = transform(data)
      kpiData[key] = { value, trend, loading: false }
    })
  )

  results.forEach((result, idx) => {
    if (result.status === 'rejected') {
      kpiData[fetchers[idx].key].loading = false
    }
  })

  kpiLoading.value = false
}

// ─── Module Fetching ───────────────────────────────────────────
async function fetchModules() {
  const tenantId = getTenantId()
  const role = getUserRole()
  const email = getUserEmail()
  userRole.value = role || 'user'
  companyName.value = getCompanyName() || companyName.value

  try {
    await initializeRBAC()
    const endpoint = `${API_BASE_URL}/modules-manager/owner/modules?tenant_id=${tenantId}`

    const res = await fetch(endpoint)
    if (!res.ok) throw new Error(`Failed to fetch modules: ${res.statusText}`)
    const data = await res.json()

    let tenantModuleIds = []
    if (data && Array.isArray(data.modules)) {
      tenantModuleIds = data.modules
    } else if (data && typeof data === 'object' && data.subscribed_modules) {
      tenantModuleIds = data.subscribed_modules
    }

    if (!tenantModuleIds.length) {
      subscribedModules.value = cards.filter(c => c.free === true)
      if (role === 'owner') {
        showModulePopup.value = true
      }
    } else {
      if (role === 'owner' || isAdmin.value || isSuperAdmin.value) {
        subscribedModules.value = cards.filter(c => tenantModuleIds.includes(c.id) || c.free === true)
        if (role === 'owner' && subscribedModules.value.every(m => m.free)) {
          showModulePopup.value = true
        }
      } else {
        const filteredIds = tenantModuleIds.filter(modId => {
          let permissionEntity = modId
          if (modId === 'supplier') permissionEntity = 'suppliers'
          if (modId === 'hr-dashboard') permissionEntity = 'hrmodule'
          return hasPermission(permissionEntity, 'read')
        })
        subscribedModules.value = cards.filter(c => c.free || filteredIds.includes(c.id))
      }
    }
  } catch (err) {
    console.error('Error fetching modules:', err)
    subscribedModules.value = cards.filter(c => c.free === true)
  }
}

// ─── Module Expiration ────────────────────────────────────────────
const MODULE_EXPIRY_DAYS = 30;

async function checkModuleExpiration() {
  const tenantId = getTenantId();
  try {
    const res = await fetch(`${API_BASE_URL}/modules-manager/owner/modules?tenant_id=${tenantId}`);
    if (!res.ok) throw new Error(`Failed to fetch modules: ${res.statusText}`);
    const data = await res.json();

    if (data.modules && data.approvalDates) {
      const today = new Date();
      const expiredModules = [];

      Object.entries(data.approvalDates).forEach(([moduleId, approvalDate]) => {
        const approved = new Date(approvalDate);
        const daysSinceApproval = Math.floor((today - approved) / (1000 * 60 * 60 * 24));
        if (daysSinceApproval >= MODULE_EXPIRY_DAYS) {
          expiredModules.push(moduleId);
        }
      });

      if (expiredModules.length > 0) {
        await unsubscribeExpiredModules(expiredModules);
        await fetchModules();
        alert(`The following modules have expired after ${MODULE_EXPIRY_DAYS} days: ${
          expiredModules.map(id => cards.find(c => c.id === id)?.title).join(', ')
        }\n\nPlease renew your subscription to continue using these modules.`);
      }
    }
  } catch (err) {
    console.error('Error checking module expiration:', err);
  }
}

async function unsubscribeExpiredModules(expiredModuleIds) {
  const tenantId = getTenantId();
  try {
    const res = await fetch(`${API_BASE_URL}/modules-manager/owner/modules/unsubscribe?tenant_id=${tenantId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        modules: expiredModuleIds,
        reason: 'subscription_expired'
      })
    });
    if (!res.ok) throw new Error(`Failed to unsubscribe expired modules: ${res.statusText}`);
    console.log('Successfully unsubscribed expired modules:', expiredModuleIds);
  } catch (err) {
    console.error('Error unsubscribing expired modules:', err);
    throw err;
  }
}

// ─── Navigation Guard ──────────────────────────────────────────
function checkModulePermission(moduleId, userRole) {
  if (['manager', 'attendant', 'cashier'].includes(userRole)) return true
}

function goTo(route) {
  const checkRoute = route.split('?')[0]
  const module = cards.find(m => m.route === checkRoute)

  if (module && (module.free || subscribedModules.value.find(m => m.id === module.id))) {
    if (module.isExternal) {
      window.open(route, '_self', 'noopener,noreferrer')
    } else {
      router.push(route)
    }
  } else {
    if (['/dashboard/profile', '/dashboard/settings', '/dashboard/home'].includes(checkRoute)) {
      router.push(route)
    } else {
      router.push(subscribedModules.value[0]?.route || '/dashboard/profile')
    }
  }
}

function handleLogout() {
  try {
    const authStore = useAuthStore()
    authStore.logout()
  } catch (e) {
    console.warn('Logout failed locally', e)
  }
  router.push('/login').catch(() => {})
}

async function fetchData() {
  loading.value = true
  try {
    await fetchModules()
    await fetchKpis()
  } catch (err) {
    console.error('Error fetching data:', err)
  } finally {
    loading.value = false
  }
}

async function refetchAll() {
  await Promise.all([fetchModules(), fetchKpis()])
}

// ─── Offline Detection ─────────────────────────────────────────
const isOffline = ref(!navigator.onLine)

const handleOffline = () => {
  isOffline.value = true
  router.push('/dashboard/pos')
}

const handleOnline = () => {
  isOffline.value = false
}

onMounted(async () => {
  if (!navigator.onLine) {
    handleOffline()
  } else {
    window.addEventListener('offline', handleOffline)
    window.addEventListener('online', handleOnline)
    await fetchData()
  }
  checkModuleExpiration()
  setInterval(checkModuleExpiration, 24 * 60 * 60 * 1000)
})

onUnmounted(() => {
  window.removeEventListener('offline', handleOffline)
  window.removeEventListener('online', handleOnline)
})
</script>

<style scoped>
/* ════════════════════════════════════════════════════════
   ABSA Portfolio Overview Dashboard
   References: absa-colors.css, patterns.css, pages.css
   ════════════════════════════════════════════════════════ */

/* ── Page Wrapper (rendered inside DashboardLayout) ── */
.absa-db-page {
  padding: 24px 32px;
}

/* Breadcrumb */
.absa-db-breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--absa-text-muted, #9CA3AF);
  margin-bottom: 24px;
  font-family: var(--absa-font-mono, 'Space Mono', monospace);
}

.absa-db-breadcrumb__current {
  color: var(--absa-maroon, #BE0F2C);
}

/* ═══ KPI Grid ═══ */
.absa-db-kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.absa-db-kpi-card {
  background: var(--absa-surface-card, #FFFFFF);
  border: var(--absa-border-card, 1px solid #E8E8EC);
  border-radius: var(--absa-radius-card, 12px);
  padding: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: var(--absa-shadow-card, 0 2px 8px rgba(0,0,0,0.06));
  transition: box-shadow 0.15s;
}

.absa-db-kpi-card:hover {
  box-shadow: var(--absa-shadow-elevated, 0 8px 24px rgba(0,0,0,0.10));
}

.absa-db-kpi-card__label {
  font-family: var(--absa-font-mono, 'Space Mono', monospace);
  font-size: 0.6rem;
  font-weight: 800;
  color: var(--absa-text-muted, #9CA3AF);
  letter-spacing: 0.1em;
  margin-bottom: 8px;
}

.absa-db-kpi-card__value {
  font-size: 1.75rem;
  font-weight: 900;
  color: var(--absa-text-primary, #111827);
  letter-spacing: -0.02em;
  margin-bottom: 6px;
}

.absa-db-kpi-card__pct {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--absa-text-muted, #9CA3AF);
}

.absa-db-kpi-card__trend {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.675rem;
  font-weight: 700;
  font-family: var(--absa-font-mono, 'Space Mono', monospace);
}

.absa-db-kpi-card__trend--up { color: var(--absa-success, #16A34A); }
.absa-db-kpi-card__trend--down { color: var(--absa-critical, #DC2626); }
.absa-db-kpi-card__trend--neutral { color: var(--absa-neutral, #6B7280); }

.absa-db-kpi-card__subtags {
  display: flex;
  gap: 8px;
  margin-top: 4px;
}

.absa-db-kpi-card__tag {
  font-family: var(--absa-font-mono, 'Space Mono', monospace);
  font-size: 0.6rem;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 4px;
  letter-spacing: 0.04em;
}

.absa-db-kpi-card__tag--urgent {
  background: var(--absa-critical-soft, #FEE2E2);
  color: var(--absa-critical, #DC2626);
}

.absa-db-kpi-card__tag--routine {
  background: var(--absa-neutral-soft, #F3F4F6);
  color: var(--absa-neutral, #6B7280);
}

.absa-db-kpi-card__accent {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
}

.absa-db-kpi-card__accent--blue { background: var(--absa-info, #2563EB); }
.absa-db-kpi-card__accent--red { background: var(--absa-critical, #DC2626); }
.absa-db-kpi-card__accent--amber { background: var(--absa-warning, #F59E0B); }
.absa-db-kpi-card__accent--maroon { background: var(--absa-maroon, #BE0F2C); }

/* ═══ Two-Column Layout ═══ */
.absa-db-two-col {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 20px;
  margin-bottom: 24px;
}

/* ── Critical Alerts ── */
.absa-db-alerts {
  background: var(--absa-surface-card, #FFFFFF);
  border: var(--absa-border-card, 1px solid #E8E8EC);
  border-radius: var(--absa-radius-card, 12px);
  overflow: hidden;
  box-shadow: var(--absa-shadow-card, 0 2px 8px rgba(0,0,0,0.06));
}

.absa-db-alerts__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--absa-border-light, #E8E8EC);
}

.absa-db-alerts__title {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 800;
  color: var(--absa-text-primary, #111827);
}

.absa-db-alerts__badge {
  font-family: var(--absa-font-mono, 'Space Mono', monospace);
  font-size: 0.6rem;
  font-weight: 800;
  background: var(--absa-critical-soft, #FEE2E2);
  color: var(--absa-critical, #DC2626);
  padding: 3px 10px;
  border-radius: 999px;
  letter-spacing: 0.04em;
}

.absa-db-alerts__list {
  padding: 8px;
}

.absa-db-alert-item {
  display: flex;
  gap: 12px;
  padding: 14px;
  border-radius: var(--absa-radius-sm, 6px);
  transition: background 0.15s;
}

.absa-db-alert-item:hover {
  background: var(--absa-surface-hover, #F3F4F6);
}

.absa-db-alert-item + .absa-db-alert-item {
  border-top: 1px solid var(--absa-border-light, #E8E8EC);
}

.absa-db-alert-item__icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
}

.absa-db-alert-item__icon--critical {
  background: var(--absa-critical-soft, #FEE2E2);
  color: var(--absa-critical, #DC2626);
}

.absa-db-alert-item__icon--warning {
  background: var(--absa-warning-soft, #FEF3C7);
  color: var(--absa-warning, #F59E0B);
}

.absa-db-alert-item__icon--info {
  background: var(--absa-info-soft, #DBEAFE);
  color: var(--absa-info, #2563EB);
}

.absa-db-alert-item__body {
  flex: 1;
  min-width: 0;
}

.absa-db-alert-item__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3px;
}

.absa-db-alert-item__customer {
  font-weight: 800;
  font-size: 0.8rem;
  color: var(--absa-text-primary, #111827);
}

.absa-db-alert-item__time {
  font-family: var(--absa-font-mono, 'Space Mono', monospace);
  font-size: 0.6rem;
  color: var(--absa-text-muted, #9CA3AF);
}

.absa-db-alert-item__event {
  font-size: 0.725rem;
  font-weight: 700;
  color: var(--absa-text-secondary, #4B5563);
  margin-bottom: 3px;
}

.absa-db-alert-item__detail {
  font-size: 0.675rem;
  color: var(--absa-text-muted, #9CA3AF);
  margin-bottom: 10px;
  line-height: 1.4;
}

.absa-db-alert-item__ack {
  font-family: var(--absa-font-mono, 'Space Mono', monospace);
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  padding: 5px 12px;
  background: var(--absa-white, #FFFFFF);
  border: 1px solid var(--absa-border-light, #E8E8EC);
  border-radius: var(--absa-radius-sm, 6px);
  color: var(--absa-text-secondary, #4B5563);
  cursor: pointer;
  transition: all 0.15s;
}

.absa-db-alert-item__ack:hover {
  background: var(--absa-maroon, #BE0F2C);
  color: var(--absa-text-inverse, #FFFFFF);
  border-color: var(--absa-maroon, #BE0F2C);
}

/* ── Predictive Lifecycle Ledger ── */
.absa-db-ledger {
  background: var(--absa-surface-card, #FFFFFF);
  border: var(--absa-border-card, 1px solid #E8E8EC);
  border-radius: var(--absa-radius-card, 12px);
  overflow: hidden;
  box-shadow: var(--absa-shadow-card, 0 2px 8px rgba(0,0,0,0.06));
}

.absa-db-ledger__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--absa-border-light, #E8E8EC);
}

.absa-db-ledger__title {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 800;
  color: var(--absa-text-primary, #111827);
}

.absa-db-ledger__select {
  font-family: var(--absa-font-mono, 'Space Mono', monospace);
  font-size: 0.65rem;
  font-weight: 700;
  padding: 5px 10px;
  border: 1px solid var(--absa-border-light, #E8E8EC);
  border-radius: var(--absa-radius-sm, 6px);
  background: var(--absa-surface-page, #F8F8FA);
  color: var(--absa-text-secondary, #4B5563);
  outline: none;
  cursor: pointer;
}

.absa-db-ledger__table-wrap {
  overflow-x: auto;
}

.absa-db-ledger__table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.75rem;
}

.absa-db-ledger__table th {
  font-family: var(--absa-font-mono, 'Space Mono', monospace);
  font-size: 0.6rem;
  font-weight: 800;
  color: var(--absa-text-muted, #9CA3AF);
  letter-spacing: 0.08em;
  text-align: left;
  padding: 12px 20px;
  background: var(--absa-surface-page, #F8F8FA);
  border-bottom: 2px solid var(--absa-border-light, #E8E8EC);
}

.absa-db-ledger__table td {
  padding: 14px 20px;
  border-bottom: 1px solid var(--absa-border-light, #E8E8EC);
  vertical-align: middle;
}

.absa-db-ledger__table tbody tr:hover {
  background: var(--absa-surface-hover, #F3F4F6);
}

.absa-db-ledger__name {
  font-weight: 800;
  color: var(--absa-text-primary, #111827);
}

.absa-db-ledger__id {
  font-family: var(--absa-font-mono, 'Space Mono', monospace);
  font-size: 0.6rem;
  color: var(--absa-text-muted, #9CA3AF);
  margin-top: 2px;
}

/* States */
.absa-db-ledger__state {
  font-family: var(--absa-font-mono, 'Space Mono', monospace);
  font-size: 0.625rem;
  font-weight: 800;
  padding: 3px 10px;
  border-radius: 999px;
  letter-spacing: 0.04em;
  white-space: nowrap;
}

.absa-db-ledger__state--active {
  background: var(--absa-success-soft, #DCFCE7);
  color: var(--absa-success, #16A34A);
}

.absa-db-ledger__state--atrisk {
  background: var(--absa-warning-soft, #FEF3C7);
  color: var(--absa-warning, #F59E0B);
}

.absa-db-ledger__state--churned {
  background: var(--absa-critical-soft, #FEE2E2);
  color: var(--absa-critical, #DC2626);
}

.absa-db-ledger__state--dormant {
  background: var(--absa-neutral-soft, #F3F4F6);
  color: var(--absa-neutral, #6B7280);
}

/* Health Bar */
.absa-db-ledger__health {
  display: flex;
  align-items: center;
  gap: 8px;
}

.absa-db-ledger__health-bar {
  width: 60px;
  height: 6px;
  background: #E5E7EB;
  border-radius: 999px;
  overflow: hidden;
}

.absa-db-ledger__health-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.3s;
}

.absa-db-ledger__health-fill--good { background: var(--absa-success, #16A34A); }
.absa-db-ledger__health-fill--warning { background: var(--absa-warning, #F59E0B); }
.absa-db-ledger__health-fill--critical { background: var(--absa-critical, #DC2626); }

.absa-db-ledger__health-val {
  font-weight: 800;
  font-size: 0.75rem;
}

.absa-db-ledger__health-val--good { color: var(--absa-success, #16A34A); }
.absa-db-ledger__health-val--warning { color: var(--absa-warning, #F59E0B); }
.absa-db-ledger__health-val--critical { color: var(--absa-critical, #DC2626); }

/* Churn */
.absa-db-ledger__churn {
  font-weight: 800;
}

.absa-db-ledger__churn--high { color: var(--absa-critical, #DC2626); }
.absa-db-ledger__churn--mid { color: var(--absa-warning, #F59E0B); }
.absa-db-ledger__churn--low { color: var(--absa-success, #16A34A); }

/* CLV */
.absa-db-ledger__clv {
  font-weight: 800;
  color: var(--absa-text-primary, #111827);
}

/* Actions */
.absa-db-ledger__action {
  font-family: var(--absa-font-mono, 'Space Mono', monospace);
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  padding: 4px 10px;
  border-radius: var(--absa-radius-sm, 6px);
  white-space: nowrap;
}

.absa-db-ledger__action--critical {
  background: var(--absa-critical-soft, #FEE2E2);
  color: var(--absa-critical, #DC2626);
}

.absa-db-ledger__action--warning {
  background: var(--absa-warning-soft, #FEF3C7);
  color: var(--absa-warning, #F59E0B);
}

.absa-db-ledger__action--success {
  background: var(--absa-success-soft, #DCFCE7);
  color: var(--absa-success, #16A34A);
}

.absa-db-ledger__action--info {
  background: var(--absa-info-soft, #DBEAFE);
  color: var(--absa-info, #2563EB);
}

/* Pagination */
.absa-db-ledger__pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-top: 1px solid var(--absa-border-light, #E8E8EC);
  font-family: var(--absa-font-mono, 'Space Mono', monospace);
  font-size: 0.65rem;
  color: var(--absa-text-muted, #9CA3AF);
}

.absa-db-ledger__page-btns {
  display: flex;
  gap: 4px;
}

.absa-db-ledger__page-btns button {
  min-width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--absa-border-light, #E8E8EC);
  border-radius: var(--absa-radius-sm, 6px);
  background: var(--absa-white, #FFFFFF);
  color: var(--absa-text-secondary, #4B5563);
  font-family: var(--absa-font-mono, 'Space Mono', monospace);
  font-size: 0.65rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s;
}

.absa-db-ledger__page-btns button:hover {
  border-color: var(--absa-maroon, #BE0F2C);
  color: var(--absa-maroon, #BE0F2C);
}

.absa-db-ledger__page-btns button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.absa-db-ledger__page-btn--active {
  background: var(--absa-maroon, #BE0F2C) !important;
  color: var(--absa-text-inverse, #FFFFFF) !important;
  border-color: var(--absa-maroon, #BE0F2C) !important;
}

/* ═══ Bottom Row ═══ */
.absa-db-bottom {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
}

/* ── AI Recommendation Card ── */
.absa-db-ai-card {
  background: var(--absa-surface-card, #FFFFFF);
  border: var(--absa-border-card, 1px solid #E8E8EC);
  border-radius: var(--absa-radius-card, 12px);
  padding: 20px;
  box-shadow: var(--absa-shadow-card, 0 2px 8px rgba(0,0,0,0.06));
}

.absa-db-ai-card__header {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 16px;
}

.absa-db-ai-card__icon {
  width: 40px;
  height: 40px;
  border-radius: var(--absa-radius-sm, 6px);
  background: var(--absa-maroon-soft, #FDE8EC);
  color: var(--absa-maroon, #BE0F2C);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.absa-db-ai-card__title {
  margin: 0 0 4px 0;
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--absa-text-primary, #111827);
}

.absa-db-ai-card__badge {
  font-family: var(--absa-font-mono, 'Space Mono', monospace);
  font-size: 0.55rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: var(--absa-maroon, #BE0F2C);
}

.absa-db-ai-card__body {
  padding-left: 0;
}

.absa-db-ai-card__prediction {
  font-size: 0.775rem;
  color: var(--absa-text-secondary, #4B5563);
  line-height: 1.6;
  margin: 0 0 16px 0;
}

.absa-db-ai-card__prediction strong {
  color: var(--absa-text-primary, #111827);
}

.absa-db-ai-card__prediction em {
  font-style: italic;
  color: var(--absa-maroon, #BE0F2C);
}

.absa-db-ai-card__confidence {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--absa-font-mono, 'Space Mono', monospace);
  font-size: 0.625rem;
  font-weight: 700;
  color: var(--absa-text-muted, #9CA3AF);
}

.absa-db-ai-card__conf-bar {
  flex: 1;
  height: 6px;
  background: #E5E7EB;
  border-radius: 999px;
  overflow: hidden;
}

.absa-db-ai-card__conf-fill {
  height: 100%;
  border-radius: 999px;
  background: var(--absa-success, #16A34A);
}

.absa-db-ai-card__conf-pct {
  color: var(--absa-success, #16A34A);
  font-weight: 800;
}

/* ── Portfolio Health Card ── */
.absa-db-health-card {
  background: var(--absa-surface-card, #FFFFFF);
  border: var(--absa-border-card, 1px solid #E8E8EC);
  border-radius: var(--absa-radius-card, 12px);
  padding: 20px;
  box-shadow: var(--absa-shadow-card, 0 2px 8px rgba(0,0,0,0.06));
}

.absa-db-health-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.absa-db-health-card__title {
  margin: 0;
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--absa-text-primary, #111827);
}

.absa-db-health-card__period {
  font-family: var(--absa-font-mono, 'Space Mono', monospace);
  font-size: 0.6rem;
  font-weight: 800;
  color: var(--absa-maroon, #BE0F2C);
  background: var(--absa-maroon-soft, #FDE8EC);
  padding: 3px 10px;
  border-radius: 999px;
}

.absa-db-health-card__body {
  display: flex;
  flex-direction: column;
}

.absa-db-health-card__score {
  display: flex;
  align-items: center;
  gap: 24px;
}

.absa-db-health-card__score-ring {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.absa-db-health-card__score-val {
  position: absolute;
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--absa-success, #16A34A);
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1;
}

.absa-db-health-card__score-unit {
  font-size: 0.6rem;
  font-weight: 700;
  color: var(--absa-text-muted, #9CA3AF);
}

.absa-db-health-card__score-info {
  flex: 1;
}

.absa-db-health-card__score-label {
  font-size: 0.75rem;
  color: var(--absa-text-secondary, #4B5563);
  line-height: 1.5;
  margin: 0 0 14px 0;
}

.absa-db-health-card__score-label strong {
  color: var(--absa-success, #16A34A);
}

.absa-db-health-card__score-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.absa-db-health-card__score-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.725rem;
  color: var(--absa-text-secondary, #4B5563);
}

.absa-db-health-card__score-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.absa-db-health-card__score-item--good .absa-db-health-card__score-dot { background: var(--absa-success, #16A34A); }
.absa-db-health-card__score-item--warn .absa-db-health-card__score-dot { background: var(--absa-warning, #F59E0B); }
.absa-db-health-card__score-item--crit .absa-db-health-card__score-dot { background: var(--absa-critical, #DC2626); }

/* ═══ Popups ═══ */
.absa-db-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  padding: 16px;
}

.absa-db-popup {
  background: var(--absa-surface-card, #FFFFFF);
  border: var(--absa-border-card, 1px solid #E8E8EC);
  border-radius: var(--absa-radius-lg, 16px);
  padding: 32px;
  max-width: 420px;
  width: 100%;
  position: relative;
  overflow: hidden;
  box-shadow: var(--absa-shadow-modal, 0 16px 48px rgba(0,0,0,0.14));
  text-align: center;
  animation: absaFadeIn 0.3s ease-out;
}

@keyframes absaFadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.absa-db-popup__accent {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--absa-maroon-gradient, linear-gradient(135deg, #BE0F2C, #8B0015));
}

.absa-db-popup__icon {
  width: 56px;
  height: 56px;
  border-radius: var(--absa-radius-card, 12px);
  background: var(--absa-maroon-soft, #FDE8EC);
  border: 1px solid rgba(190, 15, 44, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.absa-db-popup__icon--large {
  width: 72px;
  height: 72px;
}

.absa-db-popup h2 {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--absa-text-primary, #111827);
  margin: 0 0 8px 0;
}

.absa-db-popup p {
  font-size: 0.8rem;
  color: var(--absa-text-secondary, #4B5563);
  line-height: 1.6;
  margin: 0 0 24px 0;
}

.absa-db-popup p strong {
  color: var(--absa-maroon, #BE0F2C);
}

.absa-db-popup__contact {
  background: var(--absa-surface-page, #F8F8FA);
  border: 1px solid var(--absa-border-light, #E8E8EC);
  padding: 16px;
  margin-bottom: 24px;
  text-align: left;
}

.absa-db-popup__contact-label {
  font-family: var(--absa-font-mono, 'Space Mono', monospace);
  font-size: 0.6rem;
  font-weight: 800;
  color: var(--absa-maroon, #BE0F2C);
  letter-spacing: 0.06em;
  margin-bottom: 8px;
}

.absa-db-popup__contact-name {
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--absa-text-primary, #111827);
  margin-bottom: 4px;
}

.absa-db-popup__contact a {
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--absa-maroon, #BE0F2C);
  text-decoration: none;
}

.absa-db-popup__actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* ── Buttons ── */
.absa-db-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 800;
  font-size: 0.8rem;
  padding: 12px 20px;
  border: none;
  border-radius: var(--absa-radius-sm, 6px);
  cursor: pointer;
  transition: all 0.15s;
  font-family: var(--absa-font-main, 'Montserrat', system-ui, sans-serif);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.absa-db-btn--primary {
  background: var(--absa-maroon-gradient, linear-gradient(135deg, #BE0F2C, #8B0015));
  color: var(--absa-text-inverse, #FFFFFF);
  box-shadow: 0 4px 14px rgba(190, 15, 44, 0.3);
}

.absa-db-btn--primary:hover {
  opacity: 0.9;
}

.absa-db-btn--ghost {
  background: transparent;
  color: var(--absa-text-muted, #9CA3AF);
  border: 1px solid var(--absa-border-light, #E8E8EC);
}

.absa-db-btn--ghost:hover {
  background: var(--absa-surface-hover, #F3F4F6);
  color: var(--absa-text-secondary, #4B5563);
}

.absa-db-btn--block {
  width: 100%;
}

/* ── Widgets & KPI Section ── */
.absa-db-kpi-section,
.absa-db-widgets {
  margin-top: 24px;
}

/* ── Loading ── */
.absa-db-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  gap: 16px;
  color: var(--absa-text-muted, #9CA3AF);
  font-family: var(--absa-font-mono, 'Space Mono', monospace);
  font-size: 0.8rem;
}

.absa-db-loading__spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--absa-border-light, #E8E8EC);
  border-top-color: var(--absa-maroon, #BE0F2C);
  border-radius: 50%;
  animation: absaSpin 0.8s linear infinite;
}

@keyframes absaSpin {
  to { transform: rotate(360deg); }
}

/* ── Responsive ── */
@media (max-width: 1200px) {
  .absa-db-kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .absa-db-two-col {
    grid-template-columns: 1fr;
  }
  .absa-db-bottom {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .absa-db-page {
    padding: 16px;
  }
  .absa-db-kpi-grid {
    grid-template-columns: 1fr;
  }
}
</style>
