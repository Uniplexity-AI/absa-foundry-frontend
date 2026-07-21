<template>
  <div class="min-h-screen flex flex-col font-sans relative text-gray-900">
    <!-- Mesh Background -->
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-2 h-8 bg-[#2F2E8B] rounded-sm"></div>
          <div>
              <div class="flex items-center gap-2">
                 <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">SYS_ADMIN // DASHBOARD</span>
              </div>
              <h1 class="text-xl font-black text-gray-900 uppercase tracking-tight">Overview</h1>
          </div>
        </div>
        
        <div class="flex items-center gap-3">
          <!-- Notification Bell -->
          <button
            @click="showNotifications = !showNotifications"
            class="relative w-9 h-9 flex items-center justify-center border border-gray-200 bg-white hover:border-[#2F2E8B] hover:text-[#2F2E8B] text-gray-500 transition-colors rounded-sm"
          >
            <i class="fas fa-bell text-sm"></i>
            <span
              v-if="pendingCount > 0"
              class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold font-mono flex items-center justify-center rounded-full"
            >{{ pendingCount > 9 ? '9+' : pendingCount }}</span>
          </button>

          <button 
            @click="refreshDashboard" 
            class="bg-[#2F2E8B] hover:bg-[#1D226B] text-white px-4 py-2 rounded-sm text-xs font-bold font-mono uppercase shadow-md transition-all flex items-center gap-2 active:scale-95"
          >
            <i class="fas fa-sync-alt" :class="{'animate-spin': loading}"></i>
            REFRESH_DATA
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-40 relative z-10">
      
      <!-- Top Stats Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-fade-in">
        <!-- Revenue Card -->
        <div class="bg-white dot-pattern p-5 border border-gray-200 shadow-sm relative group hover:border-[#2F2E8B] transition-colors rounded-sm overflow-hidden">
          <div class="absolute top-0 left-0 w-1 h-full bg-[#2F2E8B] opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div class="flex justify-between items-start mb-3">
            <div class="p-1.5 text-[#2F2E8B]"><i class="fas fa-chart-line text-base"></i></div>
            <span class="text-[9px] font-mono font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-sm uppercase border border-green-100">+{{ displayStats.revenueGrowth }}%</span>
          </div>
          <h3 class="text-xl font-black text-gray-900 tracking-tight mb-0.5">K{{ formatNumber(displayStats.totalRevenue) }}</h3>
          <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Total Revenue</p>
        </div>

        <!-- Active Tenants Card -->
        <div class="bg-white dot-pattern p-5 border border-gray-200 shadow-sm relative group hover:border-[#2F2E8B] transition-colors rounded-sm overflow-hidden">
          <div class="absolute top-0 left-0 w-1 h-full bg-[#2F2E8B] opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div class="flex justify-between items-start mb-3">
            <div class="p-1.5 text-[#2F2E8B]"><i class="fas fa-users text-base"></i></div>
            <span class="text-[9px] font-mono font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-sm uppercase border border-green-100">+{{ displayStats.tenantGrowth }}</span>
          </div>
          <h3 class="text-xl font-black text-gray-900 tracking-tight mb-0.5">{{ displayStats.activeTenants }}</h3>
          <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Active Tenants</p>
        </div>

        <!-- Pending Subscriptions KPI -->
        <div
          class="bg-white dot-pattern p-5 border shadow-sm relative group hover:border-orange-400 transition-colors rounded-sm overflow-hidden cursor-pointer"
          :class="pendingCount > 0 ? 'border-orange-200' : 'border-gray-200'"
          @click="showNotifications = true"
        >
          <div class="absolute top-0 left-0 w-1 h-full bg-orange-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div class="flex justify-between items-start mb-3">
            <div class="p-1.5 text-orange-500"><i class="fas fa-clock text-base"></i></div>
            <span v-if="pendingCount > 0" class="text-[9px] font-mono font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded-sm uppercase border border-orange-100 animate-pulse">ACTION REQ.</span>
            <span v-else class="text-[9px] font-mono font-bold text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded-sm uppercase border border-gray-100">CLEAR</span>
          </div>
          <h3 class="text-xl font-black tracking-tight mb-0.5" :class="pendingCount > 0 ? 'text-orange-600' : 'text-gray-900'">{{ pendingCount }}</h3>
          <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Pending Subscriptions</p>
        </div>

        <!-- Total Sales Card -->
        <div class="bg-white dot-pattern p-5 border border-gray-200 shadow-sm relative group hover:border-[#2F2E8B] transition-colors rounded-sm overflow-hidden">
          <div class="absolute top-0 left-0 w-1 h-full bg-[#2F2E8B] opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div class="flex justify-between items-start mb-3">
            <div class="p-1.5 text-purple-600"><i class="fas fa-shopping-cart text-base"></i></div>
            <span class="text-[9px] font-mono font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-sm uppercase border border-green-100">+{{ displayStats.salesGrowth }}%</span>
          </div>
          <h3 class="text-xl font-black text-gray-900 tracking-tight mb-0.5">{{ displayStats.totalSales }}</h3>
          <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Total Sales</p>
        </div>
      </div>

      <!-- Two-column layout: charts + notifications -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

        <!-- Charts (left 2 cols) -->
        <div class="lg:col-span-2 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="p-6 border border-gray-200 rounded-sm bg-white">
              <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-2">
                <i class="fas fa-chart-area text-gray-400 text-xs"></i> Revenue Overview
              </h3>
              <div class="relative h-52 w-full">
                <canvas ref="revenueChart"></canvas>
              </div>
            </div>
            <div class="p-6 border border-gray-200 rounded-sm bg-white">
              <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-2">
                <i class="fas fa-chart-pie text-gray-400 text-xs"></i> Sales by Category
              </h3>
              <div class="relative h-52 w-full flex justify-center">
                <canvas ref="salesChart"></canvas>
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="bg-white p-6 border border-gray-200 shadow-sm rounded-sm">
            <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-2">
              <i class="fas fa-history text-gray-400 text-xs"></i> Recent Activity
            </h3>
            <div class="space-y-3">
              <div v-if="recentActivity.length === 0" class="text-center py-6 text-gray-400 font-mono text-xs">
                // NO_RECENT_ACTIVITY
              </div>
              <div v-for="activity in recentActivity" :key="activity.id"
                   class="flex items-start gap-3 p-2.5 hover:bg-gray-50 rounded-sm transition-colors border border-transparent hover:border-gray-100">
                <div :class="`w-7 h-7 rounded-sm flex items-center justify-center shrink-0 ${activity.iconBg || 'bg-gray-100'}`">
                  <i :class="`${activity.icon} ${activity.iconColor || 'text-gray-500'} text-xs`"></i>
                </div>
                <div>
                  <p class="text-xs font-bold text-gray-800 uppercase mb-0.5">{{ activity.title }}</p>
                  <p class="text-[10px] font-mono text-gray-400">{{ activity.time }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pending Subscriptions Notification Panel (right col) -->
        <div class="lg:col-span-1">
          <div class="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden sticky top-24">
            <!-- Panel Header -->
            <div class="bg-[#2F2E8B] px-5 py-4 flex items-center justify-between">
              <div>
                <h3 class="text-sm font-black text-white uppercase tracking-widest">Subscription Queue</h3>
                <p class="text-blue-200 text-[10px] font-mono uppercase mt-0.5">Pending Approvals</p>
              </div>
              <span
                class="w-7 h-7 flex items-center justify-center rounded-sm text-sm font-black font-mono"
                :class="pendingCount > 0 ? 'bg-orange-400 text-white' : 'bg-blue-800 text-blue-300'"
              >{{ pendingCount }}</span>
            </div>

            <!-- Loading state -->
            <div v-if="pendingLoading" class="px-5 py-8 text-center">
              <i class="fas fa-spinner animate-spin text-gray-300 text-xl mb-2"></i>
              <p class="text-[10px] font-mono text-gray-400 uppercase">Scanning Tenants...</p>
            </div>

            <!-- Empty state -->
            <div v-else-if="pendingRequests.length === 0" class="px-5 py-8 text-center">
              <i class="fas fa-check-circle text-green-400 text-2xl mb-2"></i>
              <p class="text-xs font-bold text-gray-500 uppercase">All Clear</p>
              <p class="text-[10px] font-mono text-gray-400 mt-1">No pending subscription requests</p>
            </div>

            <!-- Request list -->
            <div v-else class="divide-y divide-gray-100 max-h-[520px] overflow-y-auto">
              <div
                v-for="req in pendingRequests"
                :key="req.request_id"
                class="px-5 py-4 hover:bg-orange-50/50 transition-colors"
              >
                <!-- Tenant + tier -->
                <div class="flex items-start justify-between gap-2 mb-2">
                  <div class="min-w-0">
                    <p class="text-xs font-black text-gray-900 uppercase truncate">{{ req.business_name }}</p>
                    <p class="text-[9px] font-mono text-gray-400">{{ req.tenant_id }}</p>
                  </div>
                  <span v-if="req.tier_request" class="shrink-0 text-[9px] font-mono font-bold bg-blue-50 text-[#2F2E8B] border border-blue-100 px-1.5 py-0.5 rounded-sm uppercase">
                    {{ req.tier_request }}
                  </span>
                </div>

                <!-- Modules requested -->
                <div v-if="req.requested_modules?.length" class="flex flex-wrap gap-1 mb-2">
                  <span
                    v-for="mod in req.requested_modules.slice(0, 4)"
                    :key="mod"
                    class="px-1.5 py-0.5 text-[9px] font-mono bg-gray-100 text-gray-600 rounded-sm border border-gray-200"
                  >{{ mod }}</span>
                  <span v-if="req.requested_modules.length > 4" class="px-1.5 py-0.5 text-[9px] font-mono bg-gray-100 text-gray-500 rounded-sm border border-gray-200">
                    +{{ req.requested_modules.length - 4 }} more
                  </span>
                </div>

                <!-- Estimated total + date -->
                <div class="flex items-center justify-between mb-3">
                  <span v-if="req.total_est" class="text-xs font-black text-[#2F2E8B]">
                    K{{ Number(req.total_est).toLocaleString() }}
                  </span>
                  <span v-else class="text-[10px] font-mono text-gray-400">No estimate</span>
                  <span class="text-[9px] font-mono text-gray-400">{{ formatRelativeTime(req.requested_at) }}</span>
                </div>

                <!-- Actions -->
                <div class="flex gap-2">
                  <button
                    @click="approveRequest(req)"
                    :disabled="processingId === req.request_id"
                    class="flex-1 bg-[#2F2E8B] hover:bg-[#1D226B] disabled:opacity-50 text-white text-[10px] font-bold font-mono uppercase py-1.5 rounded-sm transition-colors flex items-center justify-center gap-1"
                  >
                    <i class="fas fa-check text-[8px]"></i>
                    {{ processingId === req.request_id ? 'Processing...' : 'Approve' }}
                  </button>
                  <button
                    @click="rejectRequest(req)"
                    :disabled="processingId === req.request_id"
                    class="flex-1 border border-red-200 hover:bg-red-50 disabled:opacity-50 text-red-500 text-[10px] font-bold font-mono uppercase py-1.5 rounded-sm transition-colors flex items-center justify-center gap-1"
                  >
                    <i class="fas fa-times text-[8px]"></i>
                    Reject
                  </button>
                </div>
              </div>
            </div>

            <!-- Footer: refresh -->
            <div v-if="!pendingLoading" class="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <span class="text-[9px] font-mono text-gray-400 uppercase">Last synced {{ lastSyncTime }}</span>
              <button @click="fetchPendingSubscriptions" class="text-[9px] font-mono font-bold text-[#2F2E8B] hover:underline uppercase">
                <i class="fas fa-sync-alt mr-1 text-[8px]"></i>Refresh
              </button>
            </div>
          </div>
        </div>

      </div><!-- end two-col -->

      <!-- ── All Tenants Table ──────────────────────────────────────────── -->
      <div class="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden mt-6">
        <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-1 h-5 bg-[#2F2E8B]"></div>
            <h3 class="text-sm font-black text-gray-900 uppercase tracking-widest">All Tenants</h3>
            <span class="text-[10px] font-mono font-bold text-gray-400">({{ tenantsData.length }} registered)</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-[9px] font-mono text-gray-400 uppercase">Last updated {{ lastSyncTime }}</span>
            <button
              @click="fetchTenants"
              class="text-[10px] font-mono font-bold text-[#2F2E8B] hover:underline uppercase flex items-center gap-1"
            >
              <i class="fas fa-sync-alt text-[9px]"></i> Refresh
            </button>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="tenantsLoading" class="p-10 text-center">
          <i class="fas fa-spinner animate-spin text-gray-300 text-xl mb-2"></i>
          <p class="text-[10px] font-mono text-gray-400 uppercase">Loading tenants...</p>
        </div>

        <!-- Tenants table -->
        <div v-else class="overflow-x-auto">
          <table class="w-full text-left text-xs font-mono">
            <thead class="bg-gray-50 border-b border-gray-100">
              <tr>
                <th class="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Business Name</th>
                <th class="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Tenant ID</th>
                <th class="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Email</th>
                <th class="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Tier</th>
                <th class="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest text-center">Modules</th>
                <th class="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th class="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Registered</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="t in tenantsData" :key="t.tenant_id" class="hover:bg-gray-50/50 transition-colors">
                <td class="px-4 py-3 font-bold text-gray-900 uppercase">{{ t.name }}</td>
                <td class="px-4 py-3 text-gray-500">
                  <code class="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded-sm">{{ t.tenant_id }}</code>
                </td>
                <td class="px-4 py-3 text-gray-600">{{ t.email || '—' }}</td>
                <td class="px-4 py-3">
                  <span
                    v-if="t.tier && t.tier !== '—'"
                    class="text-[9px] font-bold font-mono bg-blue-50 text-[#2F2E8B] border border-blue-100 px-1.5 py-0.5 rounded-sm uppercase"
                  >{{ t.tier }}</span>
                  <span v-else class="text-gray-400">—</span>
                </td>
                <td class="px-4 py-3 text-center">
                  <span class="inline-flex items-center justify-center w-6 h-6 text-[10px] font-black rounded-sm"
                    :class="t.modules_count > 0 ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-400'"
                  >{{ t.modules_count }}</span>
                </td>
                <td class="px-4 py-3">
                  <span
                    class="inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-bold font-mono uppercase rounded-sm"
                    :class="statusClass(t.status)"
                  >
                    <span class="w-1.5 h-1.5 rounded-full" :class="statusDotClass(t.status)"></span>
                    {{ t.status === 'active' ? 'Active' : t.status || 'Active' }}
                  </span>
                </td>
                <td class="px-4 py-3 text-gray-400 text-[10px]">{{ formatRelativeTime(t.registered_at) }}</td>
              </tr>
              <!-- Empty -->
              <tr v-if="tenantsData.length === 0">
                <td colspan="7" class="px-4 py-10 text-center text-gray-400 font-mono text-xs">No tenants found</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </main>

    <!-- Full notification drawer (mobile / expanded view) -->
    <div
      v-if="showNotifications"
      class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm"
      @click.self="showNotifications = false"
    >
      <div class="bg-white rounded-t-xl sm:rounded-sm w-full sm:max-w-xl max-h-[80vh] overflow-hidden shadow-2xl border border-gray-200 flex flex-col animate-slide-up">
        <div class="bg-[#2F2E8B] px-6 py-4 flex items-center justify-between shrink-0">
          <div>
            <h2 class="text-base font-black text-white uppercase tracking-widest">Pending Subscriptions</h2>
            <p class="text-blue-200 text-[10px] font-mono uppercase">{{ pendingCount }} request{{ pendingCount !== 1 ? 's' : '' }} awaiting approval</p>
          </div>
          <button @click="showNotifications = false" class="text-blue-200 hover:text-white transition-colors">
            <i class="fas fa-times text-lg"></i>
          </button>
        </div>

        <div class="overflow-y-auto flex-1">
          <div v-if="pendingLoading" class="py-12 text-center">
            <i class="fas fa-spinner animate-spin text-gray-300 text-2xl mb-3"></i>
            <p class="text-xs font-mono text-gray-400 uppercase">Scanning databases...</p>
          </div>
          <div v-else-if="pendingRequests.length === 0" class="py-12 text-center">
            <i class="fas fa-check-circle text-green-400 text-3xl mb-3"></i>
            <p class="text-sm font-bold text-gray-500 uppercase">All clear — no pending requests</p>
          </div>
          <div v-else class="divide-y divide-gray-100">
            <div v-for="req in pendingRequests" :key="req.request_id" class="px-6 py-5 hover:bg-gray-50/50">
              <div class="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p class="text-sm font-black text-gray-900 uppercase">{{ req.business_name }}</p>
                  <p class="text-[10px] font-mono text-gray-400">{{ req.tenant_id }} · {{ req.email }}</p>
                </div>
                <div class="flex flex-col items-end gap-1 shrink-0">
                  <span v-if="req.tier_request" class="text-[10px] font-mono font-bold bg-blue-50 text-[#2F2E8B] border border-blue-100 px-2 py-0.5 rounded-sm uppercase">{{ req.tier_request }}</span>
                  <span class="text-[10px] font-mono text-gray-400">{{ formatRelativeTime(req.requested_at) }}</span>
                </div>
              </div>

              <div v-if="req.requested_modules?.length" class="flex flex-wrap gap-1.5 mb-3">
                <span v-for="mod in req.requested_modules" :key="mod" class="px-2 py-0.5 text-[10px] font-mono bg-gray-100 text-gray-600 rounded-sm border border-gray-200">{{ mod }}</span>
              </div>

              <div class="flex items-center justify-between mb-4 text-xs font-mono">
                <span v-if="req.custom_users" class="text-gray-500"><i class="fas fa-users text-[10px] mr-1"></i>{{ req.custom_users }} users</span>
                <span v-if="req.custom_branches" class="text-gray-500"><i class="fas fa-building text-[10px] mr-1"></i>{{ req.custom_branches }} branches</span>
                <span v-if="req.total_est" class="font-black text-[#2F2E8B] text-sm">K{{ Number(req.total_est).toLocaleString() }} est.</span>
              </div>

              <div class="flex gap-3">
                <button
                  @click="approveRequest(req); showNotifications = false"
                  :disabled="processingId === req.request_id"
                  class="flex-1 bg-[#2F2E8B] hover:bg-[#1D226B] disabled:opacity-50 text-white text-xs font-bold font-mono uppercase py-2 rounded-sm transition-colors"
                >
                  <i class="fas fa-check mr-1"></i> Approve
                </button>
                <button
                  @click="rejectRequest(req); showNotifications = false"
                  :disabled="processingId === req.request_id"
                  class="flex-1 border border-red-200 hover:bg-red-50 disabled:opacity-50 text-red-500 text-xs font-bold font-mono uppercase py-2 rounded-sm transition-colors"
                >
                  <i class="fas fa-times mr-1"></i> Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <transition name="toast">
      <div
        v-if="toast.visible"
        class="fixed bottom-6 right-6 z-[60] flex items-center gap-3 px-4 py-3 rounded-sm shadow-xl text-white text-xs font-bold font-mono uppercase"
        :class="toast.type === 'success' ? 'bg-green-600' : 'bg-red-500'"
      >
        <i :class="toast.type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'"></i>
        {{ toast.message }}
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import Chart from 'chart.js/auto';
import API_BASE_URL, { authFetch } from '@/services/api';

const loading = ref(false);
const stats = ref(null);
const recentActivity = ref([]);
const showNotifications = ref(false);
const pendingRequests = ref([]);
const pendingLoading = ref(false);
const processingId = ref(null);
const lastSyncTime = ref('—');
const toast = ref({ visible: false, message: '', type: 'success' });
const tenantsData = ref([]);
const tenantsLoading = ref(false);

const pendingCount = computed(() => pendingRequests.value.length);

const displayStats = computed(() => ({
  totalRevenue: stats.value?.totalRevenue ?? null,
  revenueGrowth: stats.value?.revenueGrowth ?? 0,
  activeTenants: stats.value?.activeTenants ?? 0,
  tenantGrowth: stats.value?.tenantGrowth ?? 0,
  totalSales: stats.value?.totalSales ?? 0,
  salesGrowth: stats.value?.salesGrowth ?? 0,
  taxRevenue: stats.value?.taxRevenue ?? null,
  taxRate: stats.value?.taxRate ?? 0
}));

const formatNumber = (value) => {
  if (value === null || value === undefined) return '-';
  return new Intl.NumberFormat('en-ZM').format(value);
};

const formatRelativeTime = (iso) => {
  if (!iso) return '—';
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
};

const showToast = (message, type = 'success') => {
  toast.value = { visible: true, message, type };
  setTimeout(() => { toast.value.visible = false; }, 3500);
};

// ── Status helpers for tenants table ───────────────────────────────────────
const statusClass = (status) => {
  if (!status || status === 'active') return 'bg-green-50 text-green-700 border border-green-100';
  if (status === 'suspended' || status === 'disabled') return 'bg-red-50 text-red-600 border border-red-100';
  return 'bg-yellow-50 text-yellow-700 border border-yellow-100';
};
const statusDotClass = (status) => {
  if (!status || status === 'active') return 'bg-green-500';
  if (status === 'suspended' || status === 'disabled') return 'bg-red-500';
  return 'bg-yellow-500';
};

// ── Chart refs ───────────────────────────────────────────────────────────────
const revenueChart = ref(null);
const salesChart = ref(null);
let revenueChartInstance = null;
let salesChartInstance = null;

const initCharts = () => {
  if (revenueChartInstance) revenueChartInstance.destroy();
  if (salesChartInstance) salesChartInstance.destroy();

  const createPattern = (ctx) => {
    const c = document.createElement('canvas');
    c.width = 20; c.height = 20;
    const tc = c.getContext('2d');
    tc.fillStyle = '#e5e7eb';
    tc.beginPath(); tc.arc(10, 10, 1, 0, Math.PI * 2); tc.fill();
    return ctx.createPattern(c, 'repeat');
  };

  if (revenueChart.value) {
    const ctx = revenueChart.value.getContext('2d');
    revenueChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Revenue',
          data: [12000, 19000, 3000, 5000, 2000, 3000, 15000],
          borderColor: '#2F2E8B',
          backgroundColor: createPattern(ctx),
          borderWidth: 2, tension: 0.3, fill: true,
          pointBackgroundColor: '#fff', pointBorderColor: '#2F2E8B'
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { grid: { borderDash: [2, 4], color: '#f3f4f6' }, ticks: { font: { family: 'monospace', size: 10 } } },
          x: { grid: { display: false }, ticks: { font: { family: 'monospace', size: 10 } } }
        }
      }
    });
  }

  if (salesChart.value) {
    const ctx = salesChart.value.getContext('2d');
    salesChartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Retail', 'Services', 'Subscriptions', 'Other'],
        datasets: [{
          data: [35, 25, 25, 15],
          backgroundColor: createPattern(ctx),
          borderColor: ['#2F2E8B', '#10B981', '#F59E0B', '#EF4444'],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false, cutout: '75%',
        plugins: { legend: { position: 'right', labels: { usePointStyle: true, font: { family: 'monospace', size: 10 } } } }
      }
    });
  }
};

// ── Data fetching ────────────────────────────────────────────────────────────
const fetchDashboardData = async () => {
  try {
    const res = await authFetch(`${API_BASE_URL}/superadmin/dashboard-stats`);
    if (res.ok) stats.value = await res.json();
  } catch (e) { console.error('dashboard-stats:', e); }
};

const fetchRecentActivity = async () => {
  try {
    const res = await authFetch(`${API_BASE_URL}/superadmin/recent-activity`);
    if (res.ok) recentActivity.value = await res.json();
  } catch (e) { console.error('recent-activity:', e); }
};

const fetchTenantsSummary = async () => {
  try {
    const res = await authFetch(`${API_BASE_URL}/tenants/tenants/summary`);
    if (!res.ok) return;
    const data = await res.json();
    const current = stats.value || {};
    stats.value = {
      ...current,
      activeTenants: data.total_tenants ?? data.totalTenants ?? current.activeTenants ?? 0,
      tenantGrowth: data.tenant_growth ?? data.tenantGrowth ?? current.tenantGrowth ?? 0
    };
  } catch (e) { console.error('tenants-summary:', e); }
};

const fetchPendingSubscriptions = async () => {
  pendingLoading.value = true;
  try {
    const res = await authFetch(`${API_BASE_URL}/superadmin/pending-subscriptions`);
    if (res.ok) {
      const data = await res.json();
      pendingRequests.value = data.pending ?? [];
      const now = new Date();
      lastSyncTime.value = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;
    }
  } catch (e) { console.error('pending-subscriptions:', e); }
  finally { pendingLoading.value = false; }
};

const fetchTenants = async () => {
  tenantsLoading.value = true;
  try {
    const res = await authFetch(`${API_BASE_URL}/superadmin/tenants`);
    if (res.ok) {
      const data = await res.json();
      tenantsData.value = data.tenants ?? [];
    }
  } catch (e) { console.error('tenants:', e); }
  finally { tenantsLoading.value = false; };
};

const approveRequest = async (req) => {
  processingId.value = req.request_id;
  try {
    const res = await authFetch(
      `${API_BASE_URL}/superadmin/approve-subscription/${req.tenant_id}/${req.request_id}`,
      { method: 'POST' }
    );
    if (res.ok) {
      pendingRequests.value = pendingRequests.value.filter(r => r.request_id !== req.request_id);
      showToast(`Approved — ${req.business_name}`, 'success');
    } else {
      showToast('Approval failed', 'error');
    }
  } catch (e) { showToast('Network error', 'error'); }
  finally { processingId.value = null; }
};

const rejectRequest = async (req) => {
  processingId.value = req.request_id;
  try {
    const res = await authFetch(
      `${API_BASE_URL}/superadmin/reject-subscription/${req.tenant_id}/${req.request_id}`,
      { method: 'POST' }
    );
    if (res.ok) {
      pendingRequests.value = pendingRequests.value.filter(r => r.request_id !== req.request_id);
      showToast(`Rejected — ${req.business_name}`, 'error');
    } else {
      showToast('Rejection failed', 'error');
    }
  } catch (e) { showToast('Network error', 'error'); }
  finally { processingId.value = null; }
};

const refreshDashboard = async () => {
  loading.value = true;
  await Promise.all([
    fetchDashboardData(),
    fetchTenantsSummary(),
    fetchRecentActivity(),
    fetchPendingSubscriptions(),
    fetchTenants()
  ]);
  initCharts();
  loading.value = false;
};

let refreshInterval;

onMounted(() => {
  refreshDashboard();
  refreshInterval = setInterval(refreshDashboard, 300000);
});

onUnmounted(() => {
  if (refreshInterval) clearInterval(refreshInterval);
  if (revenueChartInstance) revenueChartInstance.destroy();
  if (salesChartInstance) salesChartInstance.destroy();
});
</script>

<style scoped>
.mesh-background {
  background-color: #ffffff;
  background-image: 
    linear-gradient(#f3f4f6 1px, transparent 1px),
    linear-gradient(90deg, #f3f4f6 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: center center;
}

.dot-pattern {
  background-image: radial-gradient(#e5e7eb 1px, transparent 1px);
  background-size: 20px 20px;
}

.toast-enter-active, .toast-leave-active { transition: all .3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(12px); }

@keyframes slide-up {
  from { transform: translateY(100%); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}
.animate-slide-up { animation: slide-up .25s ease; }
</style>

   