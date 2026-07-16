<template>
  <div class="min-h-screen flex flex-col font-sans relative text-gray-900 overflow-x-hidden">
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>


    <PageHeader
      parentModule="DASHBOARD"
      currentView="HOME"
      title="Overview"
    >
      <template #actions>


<!--       <div v-if="loading" class="fixed inset-0 bg-white/90 z-[120] flex justify-center items-center backdrop-blur-sm">
      <div class="flex flex-col items-center gap-4">
        <div class="h-16 w-16 border-4 border-gray-100 border-t-[#2F2E8B] rounded-full animate-spin shadow-lg"></div>
        <div class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest animate-pulse">Loading Dashboard...</div>
      </div>
    </div>

 
    <header v-else class="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
 -->
        <div class="flex items-center gap-3">
          <div class="hidden sm:flex flex-col items-end">
            <span class="text-[11px] font-medium text-[var(--brand-primary)] tracking-wider">Active</span>
            <span class="text-[10px] text-gray-500">{{ currentDateFixed }}</span>
          </div>
          <NotificationBell />
          <button
            @click="refetchAll"
            :disabled="kpiLoading"
            class="w-8 h-8 flex items-center justify-center bg-gray-50 border border-gray-200 text-gray-400 hover:text-[var(--brand-primary)] hover:border-[var(--brand-primary)] transition-all disabled:opacity-50"
            aria-label="Refresh data"
          >
            <i class="fas fa-sync-alt text-xs" :class="{ 'animate-spin': kpiLoading }"></i>
          </button>
        </div>
      </template>
    </PageHeader>

    <main class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-40 relative z-10">
      <!-- Inline skeleton loading state (no full-screen spinner) -->
      <template v-if="loading">
        <LoadingSkeleton type="stats" class="mb-8" />
        <div class="bg-white border border-gray-200 p-8 md:p-12 mb-10">
          <div class="animate-pulse space-y-6">
            <div class="h-4 bg-gray-200 w-1/4"></div>
            <div class="h-10 bg-gray-200 w-3/4"></div>
            <div class="h-4 bg-gray-200 w-1/2"></div>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <LoadingSkeleton v-for="i in 4" :key="i" type="card" />
        </div>
      </template>

      <template v-else>
        <!-- KPI Section with toggle visibility -->
        <KpiSection
          :showKpis="showKpis"
          :graphsVisible="true"
          :showKpiToggle="true"
          :showGraphToggle="false"
          title="KEY METRICS"
          @toggle-kpis="showKpis = !showKpis"
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

        <!-- Hero Section -->
        <section class="relative mb-10 overflow-hidden bg-white border border-gray-200 p-8 md:p-12 text-gray-800 group">
          <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>

          <div class="absolute top-4 right-4 z-20">
            <InstallAppButton variant="pill" />
          </div>

          <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div class="flex-1 text-center md:text-left">
              <div class="inline-flex items-center gap-2 px-3 py-1 bg-blue-50/50 border border-blue-100 text-[var(--brand-primary)] text-[11px] font-medium tracking-widest mb-6">
                <div class="w-3 h-3 border-2 border-gray-200 border-t-[var(--brand-primary)] rounded-full animate-spin"></div>
                System Active
              </div>

              <h1 class="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900">
                {{ greeting }}, <span class="text-[var(--brand-primary)]">{{ userFirstName }}</span>
              </h1>
              <p class="text-gray-600 text-base md:text-lg max-w-xl font-medium leading-relaxed">
                Welcome back. Everything is running smoothly. Here is a quick look at your workspace today.
              </p>

              <div class="mt-8 flex flex-wrap justify-center md:justify-start gap-3">
                <div class="flex items-center gap-3 bg-gray-50 px-4 py-2 border border-gray-200">
                  <i class="fas fa-calendar-alt text-[var(--brand-primary)] text-xs"></i>
                  <span class="text-xs font-medium text-gray-600">{{ currentDateFixed }}</span>
                </div>
                <div v-if="companyName" class="flex items-center gap-3 bg-gray-50 px-4 py-2 border border-gray-200">
                  <i class="fas fa-building text-[var(--brand-primary)] text-xs"></i>
                  <span class="text-xs font-medium text-gray-600">{{ companyName }}</span>
                </div>
              </div>
            </div>

            <div class="hidden lg:block w-80">
              <div class="bg-gray-50/50 p-6 border border-gray-200 relative overflow-hidden group">
                <div class="absolute top-0 right-0 w-1.5 h-full bg-[var(--brand-primary)]"></div>
                <div class="flex justify-between items-center mb-4">
                  <span class="text-xs font-semibold text-gray-500 tracking-wider">Account Setup</span>
                  <span class="text-xs font-semibold text-[var(--brand-primary)]">85% Complete</span>
                </div>
                <div class="w-full bg-gray-200 h-1.5 mb-6">
                  <div class="bg-[var(--brand-primary)] h-1.5 w-[85%]"></div>
                </div>
                <button @click="goTo('/dashboard/profile')" class="w-full py-2.5 bg-[var(--brand-primary)] text-white font-bold text-sm tracking-widest hover:bg-[var(--brand-primary-hover)] transition-all active:scale-95 flex items-center justify-center gap-2">
                  <i class="fas fa-user-check text-[10px]"></i> Complete Profile
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Universal Utilities Grid -->
        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div @click="goTo('/dashboard/profile')" class="group relative bg-white p-6 border border-gray-200 hover:border-[var(--brand-primary)]/50 hover:shadow-sm transition-all duration-200 cursor-pointer overflow-hidden">
            <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
            <div class="relative z-10">
              <div class="w-12 h-12 text-[var(--brand-primary)] flex items-center justify-start mb-6 group-hover:scale-110 transition-transform">
                <i class="fas fa-id-badge text-2xl"></i>
              </div>
              <h3 class="text-sm font-bold text-gray-900 tracking-tight mb-2">My Profile</h3>
              <p class="text-xs text-gray-500 mb-6 leading-relaxed">Personalize your identity and manage business cards.</p>
              <span class="text-xs font-bold text-[var(--brand-primary)] flex items-center gap-2 tracking-widest">
                Open Profile <i class="fas fa-chevron-right text-[8px] group-hover:translate-x-1 transition-transform"></i>
              </span>
            </div>
          </div>

          <div v-if="canAccessSettings" @click="goTo('/dashboard/settings')" class="group relative bg-white p-6 border border-gray-200 hover:border-[var(--brand-primary)]/50 hover:shadow-sm transition-all duration-200 cursor-pointer overflow-hidden">
            <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
            <div class="relative z-10">
              <div class="w-12 h-12 text-purple-600 flex items-center justify-start mb-6 group-hover:scale-110 transition-transform">
                <i class="fas fa-cubes text-2xl"></i>
              </div>
              <h3 class="text-sm font-bold text-gray-900 tracking-tight mb-2">Settings</h3>
              <p class="text-xs text-gray-500 mb-6 leading-relaxed">Customize your branding and system preferences.</p>
              <span class="text-xs font-bold text-purple-600 flex items-center gap-2 tracking-widest">
                Open Settings <i class="fas fa-chevron-right text-[8px] group-hover:translate-x-1 transition-transform"></i>
              </span>
            </div>
          </div>

          <div v-if="canAccessSettings" @click="goTo('/dashboard/settings?tab=modules')" class="group relative bg-white p-6 border border-gray-200 hover:border-[var(--brand-primary)]/50 hover:shadow-sm transition-all duration-200 cursor-pointer overflow-hidden">
            <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
            <div class="relative z-10">
              <div class="w-12 h-12 text-[var(--brand-primary)] flex items-center justify-start mb-6 group-hover:scale-110 transition-transform">
                <i class="fas fa-rocket text-2xl"></i>
              </div>
              <h3 class="text-sm font-bold text-gray-900 tracking-tight mb-2">Add Modules</h3>
              <p class="text-xs text-gray-500 mb-6 leading-relaxed">Unlock more features by subscribing to premium modules.</p>
              <span class="text-xs font-bold text-[var(--brand-primary)] flex items-center gap-2 tracking-widest">
                View Modules <i class="fas fa-chevron-right text-[8px] group-hover:translate-x-1 transition-transform"></i>
              </span>
            </div>
          </div>

          <div @click="goTo('/dashboard/ai')" class="group relative bg-white p-6 border border-gray-200 hover:border-[var(--brand-primary)]/50 hover:shadow-sm transition-all duration-200 cursor-pointer overflow-hidden">
            <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
            <div class="relative z-10">
              <div class="w-12 h-12 text-[var(--brand-primary)] flex items-center justify-start mb-6 group-hover:rotate-12 transition-transform">
                <i class="fas fa-robot text-2xl"></i>
              </div>
              <h3 class="text-sm font-bold text-gray-900 tracking-tight mb-2">Universal AI</h3>
              <p class="text-xs text-gray-500 mb-6 leading-relaxed">Ask anything about your business or use our AI tools.</p>
              <span class="text-xs font-bold text-[var(--brand-primary)] flex items-center gap-2 tracking-widest">
                UB Copilot <i class="fas fa-bolt text-[8px] text-yellow-400"></i>
              </span>
            </div>
          </div>
        </section>

        <!-- Dashboard Widgets -->
        <DashboardWidgets class="mb-12" />
      </template>

      <!-- Approval Popup (always rendered, even during loading) -->
      <div v-if="showApprovalPopup"
           class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div class="bg-white shadow-2xl max-w-md w-full p-8 border border-gray-200 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-1.5 bg-[var(--brand-primary)]"></div>
          <div class="text-center">
            <div class="mx-auto flex items-center justify-center h-16 w-16 bg-blue-50 border border-blue-100 mb-6">
              <i class="fas fa-info-circle text-[var(--brand-primary)] text-2xl"></i>
            </div>
            <h2 class="text-xl font-bold mb-2 text-gray-900 tracking-tight">Access Pending</h2>
            <p class="text-sm text-gray-500 mb-8 leading-relaxed font-medium">
              Your subscription request has been submitted. Please contact the administrator for approval:
            </p>
            <div class="bg-gray-50 border border-gray-200 p-5 mb-8 text-left relative">
              <div class="absolute top-0 right-0 px-2 py-0.5 bg-gray-200 text-[8px] font-medium text-gray-500 tracking-widest">Admin Contact</div>
              <p class="text-[10px] font-bold text-[var(--brand-primary)] mb-2 tracking-wider">Contact Credentials:</p>
              <p class="mb-1 text-sm font-bold text-gray-800 tracking-tighter">Kondwani Nyirenda</p>
              <p class="text-sm font-black text-[var(--brand-primary)]">
                <a href="tel:+260960322980" class="hover:underline flex items-center gap-2">
                  <i class="fas fa-phone-alt text-[10px]"></i> +260 960 322 980
                </a>
              </p>
            </div>
            <button
              @click="showApprovalPopup = false"
              class="w-full py-3 px-4 bg-[var(--brand-primary)] text-white font-bold text-xs tracking-widest hover:bg-[var(--brand-primary-hover)] transition-all active:scale-95"
            >
              Acknowledge
            </button>
          </div>
        </div>
      </div>

      <!-- Subscription Popup (teleported) -->
      <Teleport to="body">
        <div v-if="showModulePopup"
             class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div class="bg-white shadow-2xl max-w-md w-full p-8 border border-gray-200 relative overflow-hidden animate-fade-in">
            <div class="absolute top-0 left-0 w-full h-1.5 bg-[var(--brand-primary)]"></div>
            <div class="absolute -right-8 -top-8 text-gray-50 opacity-10">
              <i class="fas fa-rocket text-9xl"></i>
            </div>
            <div class="text-center relative z-10">
              <div class="mx-auto flex items-center justify-center h-20 w-20 bg-blue-50 border border-blue-100 mb-6 group">
                <i class="fas fa-rocket text-[var(--brand-primary)] text-3xl animate-pulse"></i>
              </div>
              <h2 class="text-2xl font-bold mb-3 text-gray-900 tracking-tight">Expand Your Workspace</h2>
              <p class="text-sm text-gray-500 mb-8 leading-relaxed font-medium">
                You are currently using the <span class="text-[var(--brand-primary)] font-bold">Standard Core</span>.
                Unlock advanced business modules like POS, Inventory, and HRM to start scaling your operations.
              </p>
              <div class="space-y-3">
                <button v-if="canAccessSettings"
                  @click="goTo('/dashboard/settings?tab=modules')"
                  class="w-full py-3.5 px-6 bg-[var(--brand-primary)] text-white font-bold text-xs tracking-[0.2em] uppercase hover:bg-[var(--brand-primary-hover)] transition-all active:scale-95 flex items-center justify-center gap-2 group"
                >
                  Explore Modules <i class="fas fa-arrow-right text-[10px] group-hover:translate-x-1 transition-all"></i>
                </button>
                <button
                  @click="showModulePopup = false"
                  class="w-full py-2.5 px-6 border border-gray-200 text-gray-400 font-bold text-[10px] tracking-widest uppercase hover:bg-gray-50 hover:text-gray-600 transition-all active:scale-95"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      </Teleport>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { decodeJWT } from '@/api_services/decodeJWT.js';
import API_BASE_URL from '@/api_services/api';
import PageHeader from '@/components/ui/PageHeader.vue';
import KpiSection from '@/components/ui/KpiSection.vue';
import KpiCard from '@/components/ui/KpiCard.vue';
import LoadingSkeleton from '@/components/LoadingSkeleton.vue';
import DashboardWidgets from '@/components/ui/DashboardWidgets.vue';
import { useDashboardWidgets } from '@/composables/useDashboardWidgets';
import { RevenueWidget, PendingTasksWidget } from '@/components/widgets';
import '@/assets/main.css';
import NotificationBell from '@/components/NotificationBell.vue';
import InstallAppButton from '@/components/InstallAppButton.vue';
import { useCurrency } from '@/composables/useCurrency.js';
import { useAuthStore } from '@/stores/useAuthStore';
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

const currentDateFixed = computed(() => {
  return new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
});

const { formatCurrency } = useCurrency();

// Register dashboard widgets
const { registerWidgets } = useDashboardWidgets()
registerWidgets([
  { id: 'revenue', label: 'Revenue', icon: 'fas fa-chart-line', component: RevenueWidget },
  { id: 'pending-tasks', label: 'Pending Tasks', icon: 'fas fa-tasks', component: PendingTasksWidget },
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
.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

button:active {
  transform: scale(0.98);
}

.tracking-tight {
  letter-spacing: -0.025em;
}
</style>
