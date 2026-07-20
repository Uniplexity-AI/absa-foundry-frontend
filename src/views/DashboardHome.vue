<template>
  <div class="min-h-screen flex flex-col font-sans relative text-gray-900 overflow-x-hidden">
    <div class="fixed inset-0 z-0 pointer-events-none absa-mesh-dense"></div>


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
        <section class="relative mb-10 overflow-hidden rounded-xl bg-white border border-[#E8E8EC] p-8 md:p-12 text-gray-800 group shadow-sm">
          <div class="absolute inset-0 absa-dots pointer-events-none opacity-30"></div>
          <div class="absolute top-0 left-0 w-full h-1 absa-gradient-maroon"></div>

          <div class="absolute top-4 right-4 z-20">
            <InstallAppButton variant="pill" />
          </div>

          <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div class="flex-1 text-center md:text-left">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider mb-6" style="background:#FDE8EC;color:#BE0F2C;border:1px solid rgba(190,15,44,0.15)">
                <div class="w-2.5 h-2.5 rounded-full" style="background:#16A34A;box-shadow:0 0 0 3px rgba(22,163,74,0.2)"></div>
                System Active
              </div>

              <h1 class="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight text-gray-900" style="letter-spacing:-0.02em">
                {{ greeting }}, <span style="color:#BE0F2C">{{ userFirstName }}</span>
              </h1>
              <p class="text-gray-600 text-base md:text-lg max-w-xl font-medium leading-relaxed">
                Welcome back. Everything is running smoothly. Here is a quick look at your workspace today.
              </p>

              <div class="mt-8 flex flex-wrap justify-center md:justify-start gap-3">
                <div class="flex items-center gap-3 px-4 py-2 rounded-lg border text-xs font-semibold" style="background:#FBFBFB;border-color:#E8E8EC;color:#4B5563">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#BE0F2C" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  <span>{{ currentDateFixed }}</span>
                </div>
                <div v-if="companyName" class="flex items-center gap-3 px-4 py-2 rounded-lg border text-xs font-semibold" style="background:#FBFBFB;border-color:#E8E8EC;color:#4B5563">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#BE0F2C" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  <span>{{ companyName }}</span>
                </div>
              </div>
            </div>

            <div class="hidden lg:block w-80">
              <div class="rounded-xl p-6 border relative overflow-hidden group" style="background:#FBFBFB;border-color:#E8E8EC">
                <div class="absolute top-0 right-0 w-1.5 h-full absa-gradient-maroon-vertical"></div>
                <div class="flex justify-between items-center mb-4">
                  <span class="text-xs font-bold text-gray-500 tracking-wider uppercase">Account Setup</span>
                  <span class="text-xs font-extrabold" style="color:#BE0F2C">85% Complete</span>
                </div>
                <div class="w-full bg-gray-200 h-2 rounded-full mb-6 overflow-hidden">
                  <div class="absa-gradient-maroon h-2 rounded-full" style="width:85%"></div>
                </div>
                <button @click="goTo('/dashboard/profile')" class="w-full py-2.5 rounded-lg text-white font-bold text-xs tracking-wider transition-all active:scale-95 flex items-center justify-center gap-2" style="background:linear-gradient(135deg,#BE0F2C,#8B0015)">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  Complete Profile
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Universal Utilities Grid -->
        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          <div @click="goTo('/dashboard/profile')" class="group relative bg-white p-6 rounded-xl border hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden" style="border-color:#E8E8EC">
            <div class="absolute inset-0 absa-gradient-maroon-subtle pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="relative z-10">
              <div class="w-11 h-11 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform" style="background:linear-gradient(135deg,#BE0F2C,#8B0015)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <h3 class="text-sm font-extrabold text-gray-900 mb-1.5">My Profile</h3>
              <p class="text-xs text-gray-500 mb-5 leading-relaxed">Personalize your identity and manage business cards.</p>
              <span class="text-xs font-bold flex items-center gap-2" style="color:#BE0F2C">
                Open Profile <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="group-hover:translate-x-0.5 transition-transform"><polyline points="9 18 15 12 9 6"/></svg>
              </span>
            </div>
          </div>

          <div v-if="canAccessSettings" @click="goTo('/dashboard/settings')" class="group relative bg-white p-6 rounded-xl border hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden" style="border-color:#E8E8EC">
            <div class="absolute inset-0 absa-gradient-maroon-subtle pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="relative z-10">
              <div class="w-11 h-11 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform" style="background:linear-gradient(135deg,#2563EB,#1D4ED8)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              </div>
              <h3 class="text-sm font-extrabold text-gray-900 mb-1.5">Settings</h3>
              <p class="text-xs text-gray-500 mb-5 leading-relaxed">Customize your branding and system preferences.</p>
              <span class="text-xs font-bold flex items-center gap-2" style="color:#2563EB">
                Open Settings <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="group-hover:translate-x-0.5 transition-transform"><polyline points="9 18 15 12 9 6"/></svg>
              </span>
            </div>
          </div>

          <div v-if="canAccessSettings" @click="goTo('/dashboard/settings?tab=modules')" class="group relative bg-white p-6 rounded-xl border hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden" style="border-color:#E8E8EC">
            <div class="absolute inset-0 absa-gradient-maroon-subtle pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="relative z-10">
              <div class="w-11 h-11 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform" style="background:linear-gradient(135deg,#16A34A,#15803D)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              </div>
              <h3 class="text-sm font-extrabold text-gray-900 mb-1.5">Add Modules</h3>
              <p class="text-xs text-gray-500 mb-5 leading-relaxed">Unlock more features by subscribing to premium modules.</p>
              <span class="text-xs font-bold flex items-center gap-2" style="color:#BE0F2C">
                View Modules <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="group-hover:translate-x-0.5 transition-transform"><polyline points="9 18 15 12 9 6"/></svg>
              </span>
            </div>
          </div>

          <div @click="goTo('/dashboard/ai')" class="group relative bg-white p-6 rounded-xl border hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden" style="border-color:#E8E8EC">
            <div class="absolute inset-0 absa-gradient-maroon-subtle pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="relative z-10">
              <div class="w-11 h-11 rounded-lg flex items-center justify-center mb-5 group-hover:rotate-12 transition-transform" style="background:linear-gradient(135deg,#F59E0B,#D97706)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              </div>
              <h3 class="text-sm font-extrabold text-gray-900 mb-1.5">Universal AI</h3>
              <p class="text-xs text-gray-500 mb-5 leading-relaxed">Ask anything about your business or use our AI tools.</p>
              <span class="text-xs font-bold flex items-center gap-2" style="color:#BE0F2C">
                UB Copilot <span class="inline-block w-1.5 h-1.5 rounded-full" style="background:#F59E0B"></span>
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
        <div class="bg-white shadow-2xl max-w-md w-full p-8 rounded-2xl border relative overflow-hidden" style="border-color:#E8E8EC">
          <div class="absolute top-0 left-0 w-full h-1.5 absa-gradient-maroon"></div>
          <div class="text-center">
            <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-2xl mb-6" style="background:#FDE8EC;border:1px solid rgba(190,15,44,0.15)">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#BE0F2C" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
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
              class="w-full py-3 px-4 rounded-lg text-white font-bold text-xs tracking-wider transition-all active:scale-95"
              style="background:linear-gradient(135deg,#BE0F2C,#8B0015)"
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
          <div class="bg-white shadow-2xl max-w-md w-full p-8 rounded-2xl border relative overflow-hidden animate-fade-in" style="border-color:#E8E8EC">
            <div class="absolute top-0 left-0 w-full h-1.5 absa-gradient-maroon"></div>
            <div class="absolute -right-8 -top-8 text-gray-50 opacity-10">
              <i class="fas fa-rocket text-9xl"></i>
            </div>
            <div class="text-center relative z-10">
              <div class="mx-auto flex items-center justify-center h-20 w-20 rounded-2xl mb-6 group" style="background:#FDE8EC;border:1px solid rgba(190,15,44,0.15)">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#BE0F2C" stroke-width="2" class="animate-pulse"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              </div>
              <h2 class="text-2xl font-bold mb-3 text-gray-900 tracking-tight">Expand Your Workspace</h2>
              <p class="text-sm text-gray-500 mb-8 leading-relaxed font-medium">
                You are currently using the <span class="text-[var(--brand-primary)] font-bold">Standard Core</span>.
                Unlock advanced business modules like POS, Inventory, and HRM to start scaling your operations.
              </p>
              <div class="space-y-3">
                <button v-if="canAccessSettings"
                  @click="goTo('/dashboard/settings?tab=modules')"
                  class="w-full py-3.5 px-6 rounded-lg text-white font-bold text-xs tracking-[0.2em] uppercase transition-all active:scale-95 flex items-center justify-center gap-2 group"
                  style="background:linear-gradient(135deg,#BE0F2C,#8B0015)"
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
