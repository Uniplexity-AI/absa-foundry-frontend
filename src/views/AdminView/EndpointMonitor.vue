<template>
  <AdminPageWrapper
    title="Endpoint Monitor"
    subtitle="Probe all registered API endpoints to detect working & broken routes"
    icon="fas fa-heartbeat"
  >
    <template #actions>
      <button
        @click="fetchHealth"
        class="bg-[#2F2E8B] hover:bg-[#1D226B] text-white px-4 py-2 rounded-none text-xs font-bold font-mono uppercase shadow-md transition-all flex items-center gap-2 active:scale-95"
        :disabled="loading"
      >
        <i class="fas fa-sync-alt" :class="{ 'animate-spin': loading }"></i>
        {{ loading ? 'PROBING...' : 'RUN_SCAN' }}
      </button>
    </template>

    <!-- Mesh Background -->
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <!-- Stats Summary -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 relative z-10">
      <!-- Total -->
      <div class="bg-white p-5 border border-gray-200 shadow-sm relative group hover:border-[#2F2E8B] transition-colors rounded-sm overflow-hidden">
        <div class="flex justify-between items-start mb-3">
          <div class="p-1.5 text-[#2F2E8B]"><i class="fas fa-list text-base"></i></div>
        </div>
        <h3 class="text-xl font-black text-gray-900 tracking-tight mb-0.5">{{ summary.total_probed }}</h3>
        <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Endpoints</p>
      </div>

      <!-- Working -->
      <div class="bg-white p-5 border border-gray-200 shadow-sm relative group hover:border-green-500 transition-colors rounded-sm overflow-hidden">
        <div class="flex justify-between items-start mb-3">
          <div class="p-1.5 text-green-600"><i class="fas fa-check-circle text-base"></i></div>
        </div>
        <h3 class="text-xl font-black text-green-600 tracking-tight mb-0.5">{{ summary.working }}</h3>
        <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Working</p>
      </div>

      <!-- Restricted -->
      <div class="bg-white p-5 border border-gray-200 shadow-sm relative group hover:border-amber-500 transition-colors rounded-sm overflow-hidden">
        <div class="flex justify-between items-start mb-3">
          <div class="p-1.5 text-amber-500"><i class="fas fa-shield-alt text-base"></i></div>
        </div>
        <h3 class="text-xl font-black text-amber-500 tracking-tight mb-0.5">{{ summary.restricted }}</h3>
        <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Auth Required</p>
      </div>

      <!-- Failing -->
      <div class="bg-white p-5 border border-gray-200 shadow-sm relative group hover:border-red-500 transition-colors rounded-sm overflow-hidden">
        <div class="flex justify-between items-start mb-3">
          <div class="p-1.5 text-red-500"><i class="fas fa-exclamation-triangle text-base"></i></div>
        </div>
        <h3 class="text-xl font-black text-red-500 tracking-tight mb-0.5">{{ summary.failing }}</h3>
        <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Failing</p>
      </div>
    </div>

    <!-- Progress Bar (when loading) -->
    <div v-if="loading" class="relative z-10 mb-6">
      <div class="w-full bg-gray-100 rounded-sm h-3 overflow-hidden border border-gray-200">
        <div
          class="h-full bg-[#2F2E8B] transition-all duration-300 rounded-sm"
          :style="{ width: progressPercent + '%' }"
        ></div>
      </div>
      <p class="text-[10px] font-mono text-gray-400 mt-1 uppercase">
        {{ probedCount }} / {{ endpoints.length }} endpoints probed
      </p>
    </div>

    <!-- Filter Bar -->
    <div class="relative z-10 flex flex-wrap gap-2 mb-6">
      <button
        v-for="f in filters"
        :key="f.key"
        @click="activeFilter = f.key"
        class="px-3 py-1.5 text-[10px] font-mono font-bold uppercase border transition-colors rounded-sm"
        :class="activeFilter === f.key
          ? 'bg-[#2F2E8B] text-white border-[#2F2E8B]'
          : 'bg-white text-gray-500 border-gray-200 hover:border-[#2F2E8B]'"
      >
        {{ f.label }} ({{ f.count }})
      </button>

      <input
        v-model="searchQuery"
        type="text"
        placeholder="FILTER_BY_PATH..."
        class="ml-auto px-3 py-1.5 text-xs font-mono border border-gray-200 bg-white rounded-sm focus:border-[#2F2E8B] outline-none w-64"
      />
    </div>

    <!-- Endpoints Table -->
    <div class="bg-white border border-gray-200 shadow-sm relative z-10 overflow-hidden rounded-sm">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="border-b border-gray-200 bg-gray-50">
              <th class="px-4 py-3 text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest w-12">#</th>
              <th class="px-4 py-3 text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Endpoint Path</th>
              <th class="px-4 py-3 text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest w-20">Method</th>
              <th class="px-4 py-3 text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest w-24">Status</th>
              <th class="px-4 py-3 text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest w-32">Health</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(ep, i) in filteredEndpoints"
              :key="ep.path"
              class="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td class="px-4 py-2.5 text-xs font-mono text-gray-400">{{ i + 1 }}</td>
              <td class="px-4 py-2.5 text-xs font-mono text-gray-800 font-bold">{{ ep.path }}</td>
              <td class="px-4 py-2.5">
                <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm bg-blue-50 text-blue-600 border border-blue-100">GET</span>
              </td>
              <td class="px-4 py-2.5">
                <span
                  class="text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm border"
                  :class="statusBadgeClass(ep)"
                >
                  {{ ep.status_code === null ? '—' : ep.status_code }}
                </span>
              </td>
              <td class="px-4 py-2.5">
                <span
                  class="text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm border flex items-center gap-1.5 w-fit"
                  :class="healthBadgeClass(ep.health)"
                >
                  <i :class="healthIcon(ep.health)"></i>
                  {{ ep.health.toUpperCase() }}
                </span>
              </td>
            </tr>
            <tr v-if="filteredEndpoints.length === 0 && !loading">
              <td colspan="5" class="px-4 py-12 text-center text-gray-400 font-mono text-xs uppercase">
                {{ endpoints.length === 0 ? 'NO_DATA — RUN_SCAN to probe endpoints' : 'NO_MATCHES for this filter' }}
              </td>
            </tr>
            <tr v-if="loading && endpoints.length === 0">
              <td colspan="5" class="px-4 py-12 text-center">
                <i class="fas fa-spinner animate-spin text-[#2F2E8B] text-xl"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Last scan info -->
    <div v-if="lastScanAt" class="relative z-10 mt-4 text-[10px] font-mono text-gray-400 uppercase text-right">
      Last scan: {{ lastScanAt }}
    </div>
  </AdminPageWrapper>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import AdminPageWrapper from './components/AdminPageWrapper.vue';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

const loading = ref(false);
const lastScanAt = ref('');
const probedCount = ref(0);

const summary = reactive({
  total_probed: 0,
  working: 0,
  failing: 0,
  restricted: 0,
  httpx_available: true,
});

const endpoints = ref([]);
const searchQuery = ref('');
const activeFilter = ref('all');

const filters = computed(() => [
  { key: 'all', label: 'ALL', count: endpoints.value.length },
  { key: 'working', label: 'WORKING', count: endpoints.value.filter(e => e.health === 'working').length },
  { key: 'restricted', label: 'AUTH', count: endpoints.value.filter(e => e.health === 'restricted').length },
  { key: 'failing', label: 'FAILING', count: endpoints.value.filter(e => !['working', 'restricted', 'unknown'].includes(e.health)).length },
]);

const progressPercent = computed(() => {
  if (endpoints.value.length === 0) return 0;
  return Math.round((probedCount.value / endpoints.value.length) * 100);
});

const filteredEndpoints = computed(() => {
  let list = endpoints.value;
  if (activeFilter.value === 'working') {
    list = list.filter(e => e.health === 'working');
  } else if (activeFilter.value === 'restricted') {
    list = list.filter(e => e.health === 'restricted');
  } else if (activeFilter.value === 'failing') {
    list = list.filter(e => !['working', 'restricted', 'unknown'].includes(e.health));
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase();
    list = list.filter(e => e.path.toLowerCase().includes(q));
  }
  return list;
});

function statusBadgeClass(ep) {
  if (ep.status_code === null) return 'bg-gray-50 text-gray-400 border-gray-100';
  if (ep.status_code >= 200 && ep.status_code < 300) return 'bg-green-50 text-green-600 border-green-100';
  if (ep.status_code === 0) return 'bg-orange-50 text-orange-600 border-orange-100';
  if (ep.status_code < 0) return 'bg-red-50 text-red-600 border-red-100';
  if (ep.status_code >= 400 && ep.status_code < 500) return 'bg-amber-50 text-amber-600 border-amber-100';
  return 'bg-red-50 text-red-600 border-red-100';
}

function healthBadgeClass(health) {
  switch (health) {
    case 'working': return 'bg-green-50 text-green-600 border-green-100';
    case 'restricted': return 'bg-amber-50 text-amber-600 border-amber-100';
    case 'unknown': return 'bg-gray-50 text-gray-400 border-gray-100';
    default: return 'bg-red-50 text-red-600 border-red-100';
  }
}

function healthIcon(health) {
  switch (health) {
    case 'working': return 'fas fa-check-circle text-green-500';
    case 'restricted': return 'fas fa-lock text-amber-500';
    case 'unknown': return 'fas fa-question-circle text-gray-400';
    case 'timeout': return 'fas fa-clock text-orange-500';
    default: return 'fas fa-times-circle text-red-500';
  }
}

async function fetchHealth() {
  loading.value = true;
  probedCount.value = 0;
  endpoints.value = [];

  try {
    // First request gets the full results (may take a while)
    const { data } = await axios.get(`${API_BASE}/superadmin/endpoint-health`, {
      timeout: 120000, // 2 minute timeout for full scan
    });

    summary.total_probed = data.summary?.total_probed ?? 0;
    summary.working = data.summary?.working ?? 0;
    summary.failing = data.summary?.failing ?? 0;
    summary.restricted = data.summary?.restricted ?? 0;
    summary.httpx_available = data.summary?.httpx_available ?? false;

    endpoints.value = data.endpoints || [];
    probedCount.value = endpoints.value.length;
    lastScanAt.value = new Date().toLocaleString();
  } catch (err) {
    console.error('Failed to fetch endpoint health:', err);
    endpoints.value = [];
    summary.total_probed = 0;
    summary.working = 0;
    summary.failing = 0;
    summary.restricted = 0;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchHealth();
});
</script>

<style scoped>
/* Ensure table doesn't overflow on mobile */
table {
  min-width: 600px;
}
</style>
