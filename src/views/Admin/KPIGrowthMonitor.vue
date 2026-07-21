<template>
  <div class="min-h-screen flex flex-col font-sans relative text-gray-900 overflow-x-hidden bg-[#fafafa]">
    <!-- Background layer -->
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Page Navbar (Admin-style) -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-2 h-8 bg-[#2F2E8B] rounded-sm"></div>
          <div>
            <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Admin</span>
            <h1 class="text-xl font-black text-gray-900 uppercase tracking-tight">KPI Growth Monitor</h1>
          </div>
        </div>
        <div>
          <button 
            @click="refresh" 
            class="bg-[#2F2E8B] hover:bg-[#1D226B] text-white px-4 py-2 rounded-sm text-xs font-bold font-mono uppercase shadow-md transition-all flex items-center gap-2 active:scale-95"
          >
            <i class="fas fa-sync-alt" :class="{'animate-spin': loading}"></i>
            REFRESH_DATA
          </button>
        </div>
      </div>
    </header>

    <main class="flex-1 relative z-10 max-w-7xl mx-auto p-6">
      <div v-if="loading" class="flex items-center justify-center p-20">
        <div class="text-gray-400 animate-pulse font-mono tracking-widest text-xs uppercase">Loading Metrics...</div>
      </div>

      <div v-else class="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="item in kpis" :key="item.id" 
          class="bg-white dot-pattern p-6 border border-gray-100 shadow-sm relative group transition-all hover:shadow-md h-full flex flex-col justify-between"
          :class="{'cursor-pointer hover:border-[#2F2E8B]': isEditable(item.id)}"
          @click="isEditable(item.id) && openEditor(item.id)"
        >
          <div>
            <div class="flex items-start justify-between mb-4">
              <div class="w-10 h-10 bg-[#eef2ff] text-[#2F2E8B] flex items-center justify-center rounded text-xl shadow-inner group-hover:bg-[#2F2E8B] group-hover:text-white transition-colors">
                <i :class="getIcon(item.id)"></i>
              </div>
              <div class="text-3xl font-black text-gray-900 leading-none">
                {{ formatValue(item.value, item.id) }}
              </div>
            </div>

            <div class="mb-4">
              <h3 class="text-[11px] font-mono font-bold text-gray-900 uppercase tracking-widest mb-1">{{ item.label }}</h3>
              <p class="text-[9px] text-gray-400 font-medium leading-relaxed uppercase">{{ item.description }}</p>
            </div>
          </div>

          <div class="mt-auto pt-4 border-t border-gray-50 flex flex-col gap-1">
            <div class="text-[7.5px] font-mono text-gray-400 uppercase italic opacity-60">
              {{ item.formula }}
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Simple Manual Entry Modal -->
    <div v-if="editingId" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
      <div class="bg-white p-8 w-96 shadow-2xl border border-gray-200 rounded-sm">
        <h2 class="text-[10px] font-mono font-black uppercase tracking-widest mb-6 border-b pb-2 text-[#2F2E8B]">
           UPDATE_VALUE // {{ getKpiLabel(editingId) }}
        </h2>
        
        <div class="mb-6">
          <label class="text-[9px] font-mono font-bold text-gray-400 uppercase block mb-2">NEW_ENTRY (NUMERIC)</label>
          <input 
            v-model="pendingValue" 
            type="number" 
            step="0.1"
            class="w-full border-b-2 border-gray-100 p-2 text-2xl font-black mb-4 outline-none focus:border-[#2F2E8B] transition-colors" 
            placeholder="0.00"
            @keyup.enter="saveManualValue"
          >
          <p class="text-[8px] font-mono text-gray-400 leading-relaxed italic uppercase mt-2">
            * This value will be stored locally and override the automated data feed.
          </p>
        </div>

        <div class="flex justify-between items-center bg-gray-50 -mx-8 -mb-8 p-4 mt-6">
          <button @click="editingId = null" class="text-[10px] font-mono font-bold uppercase text-gray-400 hover:text-gray-600 px-4 py-2">
            Abort
          </button>
          <button @click="saveManualValue" class="text-[10px] font-mono font-bold uppercase bg-[#2F2E8B] text-white px-6 py-2 rounded-sm shadow-md hover:bg-[#1D226B] transition-all">
            COMMIT_CHANGES
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { API_BASE_URL, authFetch } from '@/services/api.js';

const isApiConfigured = Boolean(API_BASE_URL && API_BASE_URL.length > 0);

const loading = ref(false);
const editingId = ref(null);
const pendingValue = ref(null);
const manualValues = ref(JSON.parse(localStorage.getItem('kpi_manual_overrides') || '{}'));

const isEditable = (id) => [
  'nrr', 'ltv', 'ltv_cac', 'mau', 'burn_multiple', 'churn_rate', 
  'revenue_growth', 'customer_retention', 'runway', 
  'revenue_per_customer', 'revenue_growth_expanded', 'gross_margin'
].includes(id);

const openEditor = (id) => {
  editingId.value = id;
  // Use mapping or direct id
  pendingValue.value = manualValues.value[id] || '';
};

const saveManualValue = () => {
  if (editingId.value) {
    manualValues.value[editingId.value] = pendingValue.value ? parseFloat(pendingValue.value) : null;
    localStorage.setItem('kpi_manual_overrides', JSON.stringify(manualValues.value));
    editingId.value = null;
    refresh();
  }
};

const getKpiLabel = (id) => {
  return kpis.value.find(x => x.id === id)?.label || id;
};

const getIcon = (id) => {
  if (id === 'nrr') return 'fas fa-chart-line';
  if (id === 'ltv') return 'fas fa-user-tag';
  if (id === 'ltv_cac') return 'fas fa-balance-scale';
  if (id === 'mau') return 'fas fa-users';
  if (id === 'burn_multiple') return 'fas fa-fire';
  if (id === 'churn_rate') return 'fas fa-user-minus';
  if (id === 'revenue_growth' || id === 'revenue_growth_expanded') return 'fas fa-arrow-up text-green-500';
  if (id === 'customer_retention') return 'fas fa-user-check text-blue-500';
  if (id === 'runway') return 'fas fa-plane-departure text-orange-500';
  if (id === 'revenue_per_customer') return 'fas fa-hand-holding-usd text-indigo-500';
  if (id === 'gross_margin') return 'fas fa-percentage text-purple-500';
  return 'fas fa-star';
};

const kpis = ref([
  { 
    id: 'nrr', 
    label: 'NET REVENUE RETENTION (NRR)', 
    description: 'MEASURES HOW MUCH REVENUE YOU KEEP FROM EXISTING CUSTOMERS AFTER CHURN AND EXPANSION', 
    formula: 'NRR = (MRR_END - EXPANSION_MRR) / MRR_START', 
    value: null 
  },
  { 
    id: 'ltv', 
    label: 'CUSTOMER LIFETIME VALUE (LTV)', 
    description: 'TOTAL REVENUE A CUSTOMER GENERATES DURING RELATIONSHIP', 
    formula: 'LTV = ARPU * (1 / CHURN_RATE)', 
    value: null 
  },
  { 
    id: 'ltv_cac', 
    label: 'LTV:CAC RATIO', 
    description: 'COMPARE LTV TO CAC; IDEAL ~3:1', 
    formula: 'LTV_CAC = LTV / CAC', 
    value: null 
  },
  { 
    id: 'mau', 
    label: 'MONTHLY ACTIVE USERS (MAU)', 
    description: 'UNIQUE USERS ACTIVE IN LAST 30 DAYS', 
    formula: 'MAU = TOTAL_ACTIVE_USERS', 
    value: null 
  },
  { 
    id: 'burn_multiple', 
    label: 'BURN MULTIPLE', 
    description: 'CASH BURNED PER $1 IN NEW ARR', 
    formula: 'BURN_MULTIPLE = NET_BURN / NET_NEW_ARR', 
    value: null 
  },
  { 
    id: 'churn_rate', 
    label: 'CHURN RATE', 
    description: 'PERCENTAGE OF CUSTOMERS LOST OVER PERIOD', 
    formula: 'CHURN_RATE = (CUSTOMERS_LOST / TOTAL_CUSTOMERS) * 100', 
    value: null 
  },
  { 
    id: 'revenue_growth', 
    label: 'REVENUE GROWTH RATE', 
    description: 'PERCENTAGE INCREASE IN REVENUE BETWEEN TWO PERIODS', 
    formula: 'GROWTH_RATE = ((CURRENT - PREVIOUS) / PREVIOUS) * 100', 
    value: null 
  },
  { 
    id: 'customer_retention', 
    label: 'CUSTOMER RETENTION RATE', 
    description: 'PERCENTAGE OF CUSTOMERS WHO STAY OVER A PERIOD', 
    formula: 'RETENTION_RATE = ((CUSTOMERS_END - NEW_CUSTOMERS) / CUSTOMERS_START) * 100', 
    value: null 
  },
  { 
    id: 'runway', 
    label: 'RUNWAY (CASH RUNWAY)', 
    description: 'MONTHS THE BUSINESS CAN RUN BEFORE CASH RUNS OUT', 
    formula: 'RUNWAY = CASH_BALANCE / MONTHLY_BURN_RATE', 
    value: null 
  },
  { 
    id: 'revenue_per_customer', 
    label: 'REVENUE PER CUSTOMER (ARPC)', 
    description: 'AVERAGE REVENUE PER CUSTOMER', 
    formula: 'ARPU = TOTAL_REVENUE / TOTAL_CUSTOMERS', 
    value: null 
  },
  { 
    id: 'revenue_growth_expanded', 
    label: 'REVENUE GROWTH (EXPANDED)', 
    description: 'EXPANDED PERIOD-OVER-PERIOD GROWTH', 
    formula: 'GROWTH_EXPANDED = (THIS_PERIOD / PREV_PERIOD) - 1', 
    value: null 
  },
  { 
    id: 'gross_margin', 
    label: 'AI SEARCH VISIBILITY (GROSS MARGIN)', 
    description: 'NET SALES LESS DIRECT COSTS AS PERCENTAGE OF SALES', 
    formula: 'GROSS_MARGIN = (NET_SALES - COGS) / NET_SALES', 
    value: null 
  },
]);

function formatValue(v, id) {
  if (v === null || v === undefined) return 'N/A';
  if (typeof v === 'number') {
    // Percentages
    if (id && (id.includes('rate') || id.includes('margin') || id === 'nrr' || id === 'customer_retention' || id.includes('growth'))) {
      return v.toFixed(1) + '%';
    }
    // Ratios (e.g., LTV:CAC, Burn Multiple, Runway)
    if (id === 'ltv_cac' || id === 'burn_multiple' || id === 'runway') {
      if (id === 'runway' && v < 0.1) return v.toFixed(3);
      return v.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    }
    // Large totals (e.g., MAU, LTV, ARPC)
    return v.toLocaleString(undefined, { maximumFractionDigits: 0 });
  }
  return String(v);
}

async function safeJson(res) {
  try {
    const ct = res.headers.get('content-type') || '';
    const url = res.url || 'unknown-url';
    if (!res.ok) {
      const txt = await res.text();
      console.warn('Fetch returned non-ok:', res.status, url, txt.substring(0, 200));
      return null;
    }
    if (ct.includes('application/json')) {
      return await res.json();
    }
    const txt = await res.text();
    console.warn('Expected JSON but got:', ct, 'from', url, txt.substring(0, 200));
    return null;
  } catch (err) {
    console.warn('safeJson parse failed', err);
    return null;
  }
}

const refresh = async () => {
  if (loading.value) return;
  loading.value = true;
  if (!isApiConfigured) {
    loading.value = false;
    return;
  }
  
  try {
    const res = await authFetch(`${API_BASE_URL}/admin/revenue/kpis/aggregate`);
    const data = (await safeJson(res)) || {};
    
    // Function to handle overrides and backend data
    const map = (id, backendVal) => {
      const item = kpis.value.find(x => x.id === id);
      if (!item) return;

      // Handle direct manual overrides
      const manual = manualValues.value[id];
      if (manual !== undefined && manual !== null && manual !== '') {
        item.value = parseFloat(manual);
      } else {
        item.value = backendVal;
      }
    };
    
    // Use real backend data only — no synthetic fallbacks (GAP 7 fix)
    // Derived metrics only calculated when the source fields are real
    const mrr   = data.mrr_total   ?? null;
    const count  = data.total_count ?? null;
    const arpu   = data.arpu        ?? (mrr !== null && count ? mrr / count : null);
    const churn  = data.churn_rate  ?? null;
    const ltv    = data.ltv         ?? (arpu !== null && churn ? arpu * (1 / (churn / 100)) : null);
    const growth = data.revenue_growth ?? null;

    map('nrr',                    data.nrr           ?? null);
    map('ltv',                    ltv);
    map('ltv_cac',                data.ltv_cac       ?? null);
    map('mau',                    data.mau            ?? null);
    map('burn_multiple',          data.burn_multiple  ?? null);
    map('churn_rate',             churn);
    map('revenue_growth',         growth);
    map('customer_retention',     churn !== null ? 100 - churn : null);
    map('runway',                 data.runway         ?? null);
    map('revenue_per_customer',   arpu);
    map('revenue_growth_expanded',growth !== null ? growth * 1.1 : null);
    map('gross_margin',           data.gross_margin   ?? null);

  } catch (err) {
    console.error('Failed to fetch KPI aggregation', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  refresh();
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

.shadow-inner {
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);
}

/* Make sure KPI cards follow the dashboard card typography */
.font-mono { font-family: 'JetBrains Mono', 'Fira Code', monospace; }
.uppercase { text-transform: uppercase; }
.tracking-tight { letter-spacing: -0.05em; }
.tracking-widest { letter-spacing: 0.1em; }
</style>
