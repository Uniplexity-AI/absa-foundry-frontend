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
              <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">SYS_ADMIN // ANALYTICS</span>
            </div>
            <h1 class="text-xl font-black text-gray-900 uppercase tracking-tight">Sales Analytics</h1>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <!-- Period Filter -->
          <div class="flex items-center gap-1 bg-gray-100 rounded-sm p-0.5 border border-gray-200">
            <button
              v-for="p in periods"
              :key="p.value"
              @click="selectedPeriod = p.value; fetchSalesData()"
              class="px-3 py-1.5 text-[10px] font-bold font-mono uppercase rounded-sm transition-all"
              :class="selectedPeriod === p.value
                ? 'bg-[#2F2E8B] text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'"
            >{{ p.label }}</button>
          </div>

          <button
            @click="fetchSalesData()"
            class="bg-[#2F2E8B] hover:bg-[#1D226B] text-white px-4 py-2 rounded-sm text-xs font-bold font-mono uppercase shadow-md transition-all flex items-center gap-2 active:scale-95"
          >
            <i class="fas fa-sync-alt" :class="{'animate-spin': loading}"></i>
            REFRESH
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-40 relative z-10">

      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-20">
        <div class="text-center">
          <i class="fas fa-spinner animate-spin text-[#2F2E8B] text-3xl mb-3"></i>
          <p class="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">Aggregating Sales Data...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-sm p-6 text-center">
        <i class="fas fa-exclamation-triangle text-red-400 text-2xl mb-2"></i>
        <p class="text-sm font-bold text-red-600 uppercase">{{ error }}</p>
        <button @click="fetchSalesData()" class="mt-3 text-xs font-mono font-bold text-red-500 hover:underline uppercase">Retry</button>
      </div>

      <!-- Data Display -->
      <template v-else-if="salesData">
        <!-- KPI Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-fade-in">
          <!-- Grand Total Amount -->
          <div class="bg-white dot-pattern p-5 border border-gray-200 shadow-sm relative group hover:border-[#2F2E8B] transition-colors rounded-sm overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-[#2F2E8B] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="flex justify-between items-start mb-3">
              <div class="p-1.5 text-[#2F2E8B]"><i class="fas fa-coins text-base"></i></div>
              <span class="text-[9px] font-mono font-bold text-[#2F2E8B] bg-blue-50 px-1.5 py-0.5 rounded-sm uppercase border border-blue-100">{{ selectedPeriod }}</span>
            </div>
            <h3 class="text-2xl font-black text-gray-900 tracking-tight mb-0.5">K{{ formatNumber(salesData.grand_total.amount) }}</h3>
            <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Total Sales Amount</p>
          </div>

          <!-- Total Transactions -->
          <div class="bg-white dot-pattern p-5 border border-gray-200 shadow-sm relative group hover:border-[#2F2E8B] transition-colors rounded-sm overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-[#2F2E8B] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="flex justify-between items-start mb-3">
              <div class="p-1.5 text-green-600"><i class="fas fa-receipt text-base"></i></div>
            </div>
            <h3 class="text-2xl font-black text-gray-900 tracking-tight mb-0.5">{{ formatNumber(salesData.grand_total.count) }}</h3>
            <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Total Transactions</p>
          </div>

          <!-- Active Tenants with Sales -->
          <div class="bg-white dot-pattern p-5 border border-gray-200 shadow-sm relative group hover:border-[#2F2E8B] transition-colors rounded-sm overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-[#2F2E8B] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="flex justify-between items-start mb-3">
              <div class="p-1.5 text-purple-600"><i class="fas fa-store text-base"></i></div>
            </div>
            <h3 class="text-2xl font-black text-gray-900 tracking-tight mb-0.5">{{ salesData.per_tenant.length }}</h3>
            <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Tenants With Sales</p>
          </div>
        </div>

        <!-- Timeline Chart -->
        <div class="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden mb-6">
          <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-1 h-5 bg-[#2F2E8B]"></div>
              <h3 class="text-sm font-black text-gray-900 uppercase tracking-widest">Sales Timeline</h3>
            </div>
          </div>
          <div class="p-6" v-if="salesData.timeline.labels.length > 0">
            <div class="relative h-64 w-full">
              <canvas ref="timelineChart"></canvas>
            </div>
          </div>
          <div v-else class="p-10 text-center text-gray-400 font-mono text-xs">
            // NO_SALES_DATA_FOR_THIS_PERIOD
          </div>
        </div>

        <!-- Per-Tenant Breakdown Table -->
        <div class="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-1 h-5 bg-[#2F2E8B]"></div>
              <h3 class="text-sm font-black text-gray-900 uppercase tracking-widest">Sales by Tenant</h3>
              <span class="text-[10px] font-mono font-bold text-gray-400">({{ salesData.per_tenant.length }} tenants)</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-[9px] font-mono text-gray-400 uppercase">Sorted by volume</span>
            </div>
          </div>

          <!-- Table -->
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs font-mono">
              <thead class="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th class="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">#</th>
                  <th class="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Tenant</th>
                  <th class="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Tenant ID</th>
                  <th class="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest text-right">Transactions</th>
                  <th class="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest text-right">Total Amount</th>
                  <th class="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest text-right">Share</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr
                  v-for="(tenant, index) in salesData.per_tenant"
                  :key="tenant.tenant_id"
                  class="hover:bg-gray-50/50 transition-colors"
                >
                  <td class="px-4 py-3 text-gray-400 font-bold">{{ index + 1 }}</td>
                  <td class="px-4 py-3 font-bold text-gray-900 uppercase">{{ tenant.name }}</td>
                  <td class="px-4 py-3">
                    <code class="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded-sm">{{ tenant.tenant_id }}</code>
                  </td>
                  <td class="px-4 py-3 text-right font-bold text-gray-800">{{ formatNumber(tenant.count) }}</td>
                  <td class="px-4 py-3 text-right font-black text-[#2F2E8B]">K{{ formatNumber(tenant.total_amount) }}</td>
                  <td class="px-4 py-3 text-right">
                    <div class="flex items-center justify-end gap-2">
                      <div class="w-16 bg-gray-100 rounded-sm h-2 overflow-hidden">
                        <div
                          class="h-full bg-[#2F2E8B] rounded-sm transition-all duration-500"
                          :style="{ width: sharePercent(tenant.total_amount) + '%' }"
                        ></div>
                      </div>
                      <span class="text-[10px] font-bold text-gray-500">{{ sharePercent(tenant.total_amount) }}%</span>
                    </div>
                  </td>
                </tr>
                <!-- Empty -->
                <tr v-if="salesData.per_tenant.length === 0">
                  <td colspan="6" class="px-4 py-10 text-center text-gray-400 font-mono text-xs">No sales data found</td>
                </tr>
              </tbody>
              <!-- Footer with totals -->
              <tfoot v-if="salesData.per_tenant.length > 0" class="bg-gray-50 border-t-2 border-gray-200">
                <tr>
                  <td colspan="3" class="px-4 py-3 text-[10px] font-black text-gray-600 uppercase tracking-widest">Grand Total</td>
                  <td class="px-4 py-3 text-right font-black text-gray-900">{{ formatNumber(salesData.grand_total.count) }}</td>
                  <td class="px-4 py-3 text-right font-black text-[#2F2E8B] text-sm">K{{ formatNumber(salesData.grand_total.amount) }}</td>
                  <td class="px-4 py-3 text-right text-gray-400">100%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </template>

      <!-- Empty / No Data -->
      <div v-else class="flex items-center justify-center py-20">
        <div class="text-center">
          <i class="fas fa-chart-bar text-gray-300 text-4xl mb-3"></i>
          <p class="text-sm font-bold text-gray-400 uppercase">No Data Available</p>
          <p class="text-[10px] font-mono text-gray-400 mt-1">Click refresh to load sales data</p>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import Chart from 'chart.js/auto';
import API_BASE_URL, { authFetch } from '@/api_services/api';

const loading = ref(false);
const error = ref(null);
const salesData = ref(null);
const selectedPeriod = ref('monthly');
const timelineChart = ref(null);
let timelineChartInstance = null;

const periods = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
];

const formatNumber = (value) => {
  if (value === null || value === undefined) return '-';
  return new Intl.NumberFormat('en-ZM', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const sharePercent = (amount) => {
  if (!salesData.value || !salesData.value.grand_total.amount) return 0;
  return ((amount / salesData.value.grand_total.amount) * 100).toFixed(1);
};

const initChart = () => {
  if (timelineChartInstance) {
    timelineChartInstance.destroy();
    timelineChartInstance = null;
  }

  if (!timelineChart.value || !salesData.value?.timeline?.labels?.length) return;

  const ctx = timelineChart.value.getContext('2d');
  timelineChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: salesData.value.timeline.labels,
      datasets: [{
        label: 'Sales Amount',
        data: salesData.value.timeline.values,
        backgroundColor: '#2F2E8B',
        borderColor: '#1D226B',
        borderWidth: 1,
        borderRadius: 2,
        barPercentage: 0.6,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `K${new Intl.NumberFormat('en-ZM').format(ctx.raw)}`,
          }
        }
      },
      scales: {
        y: {
          grid: { borderDash: [2, 4], color: '#f3f4f6' },
          ticks: {
            font: { family: 'monospace', size: 10 },
            callback: (value) => `K${new Intl.NumberFormat('en-ZM').format(value)}`,
          }
        },
        x: {
          grid: { display: false },
          ticks: { font: { family: 'monospace', size: 10 } }
        }
      }
    }
  });
};

const fetchSalesData = async () => {
  loading.value = true;
  error.value = null;

  try {
    const res = await authFetch(
      `${API_BASE_URL}/superadmin/sales-analytics?period=${selectedPeriod.value}`
    );
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.detail || `HTTP ${res.status}`);
    }
    salesData.value = await res.json();
    await nextTick();
    initChart();
  } catch (e) {
    console.error('sales-analytics:', e);
    error.value = e.message || 'Failed to load sales analytics';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchSalesData();
});

onUnmounted(() => {
  if (timelineChartInstance) {
    timelineChartInstance.destroy();
    timelineChartInstance = null;
  }
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

@keyframes fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-fade-in { animation: fade-in .35s ease; }
</style>
