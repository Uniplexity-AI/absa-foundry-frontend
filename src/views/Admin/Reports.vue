<template>
  <div class="min-h-screen flex flex-col font-sans relative text-gray-900">
    <!-- Mesh Background -->
    <!-- Mesh Background (Fixed to viewport to prevent cutoff on scroll) -->
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-2 h-8 bg-[#2F2E8B] rounded-sm"></div>
          <div>
              <div class="flex items-center gap-2">
                 <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">SYS_ADMIN // REPORTS</span>
              </div>
              <h1 class="text-xl font-black text-gray-900 uppercase tracking-tight">Tenant Reports & KPIs</h1>
          </div>
        </div>
        
        <div class="flex items-center gap-3">
           <button 
             @click="refreshAll" 
             class="bg-[#2F2E8B] hover:bg-[#1D226B] text-white px-4 py-2 rounded-sm text-xs font-bold font-mono uppercase shadow-md transition-all flex items-center gap-2 active:scale-95"
           >
             <i class="fas fa-sync-alt" :class="{'animate-spin': loadingAll}"></i>
             REFRESH_ALL
           </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-40 relative z-10">

      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 animate-fade-in">
        <!-- Total Tenants -->
        <div class="bg-white dot-pattern p-6 border border-gray-200 shadow-sm relative group hover:border-[#2F2E8B] transition-colors rounded-sm overflow-hidden">
          <div class="absolute top-0 left-0 w-1 h-full bg-[#2F2E8B] opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div class="flex justify-between items-start mb-4">
            <div class="p-2 text-[#2F2E8B] rounded-sm">
              <i class="fas fa-chart-line text-lg"></i>
            </div>
            <span class="text-[10px] font-mono font-bold text-[#2F2E8B] bg-indigo-50 px-2 py-1 rounded-sm uppercase tracking-wide">+{{ kpis.growthRate }}%</span>
          </div>
          <div>
            <h3 class="text-2xl font-black text-gray-900 tracking-tight mb-1">{{ kpis.totalTenants }}</h3>
            <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Total Tenants</p>
          </div>
        </div>

        <!-- Time Saved -->
        <div class="bg-white dot-pattern p-6 border border-gray-200 shadow-sm relative group hover:border-[#2F2E8B] transition-colors rounded-sm overflow-hidden">
          <div class="absolute top-0 left-0 w-1 h-full bg-[#2F2E8B] opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div class="flex justify-between items-start mb-4">
            <div class="p-2 text-blue-600 rounded-sm">
              <i class="fas fa-clock text-lg"></i>
            </div>
          </div>
          <div>
            <h3 class="text-2xl font-black text-gray-900 tracking-tight mb-1">{{ kpis.timeSaved }} hrs</h3>
            <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Time Saved (Reporting)</p>
          </div>
        </div>

        <!-- Compliance -->
        <div class="bg-white dot-pattern p-6 border border-gray-200 shadow-sm relative group hover:border-[#2F2E8B] transition-colors rounded-sm overflow-hidden">
          <div class="absolute top-0 left-0 w-1 h-full bg-[#2F2E8B] opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div class="flex justify-between items-start mb-4">
            <div class="p-2 text-teal-600 rounded-sm">
              <i class="fas fa-shield-alt text-lg"></i>
            </div>
          </div>
          <div>
            <h3 class="text-2xl font-black text-gray-900 tracking-tight mb-1">{{ kpis.complianceScore }}%</h3>
            <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">ZRA Compliance</p>
          </div>
        </div>

        <!-- Money Saved -->
        <div class="bg-white dot-pattern p-6 border border-gray-200 shadow-sm relative group hover:border-[#2F2E8B] transition-colors rounded-sm overflow-hidden">
          <div class="absolute top-0 left-0 w-1 h-full bg-[#2F2E8B] opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div class="flex justify-between items-start mb-4">
            <div class="p-2 text-green-600 rounded-sm">
              <i class="fas fa-piggy-bank text-lg"></i>
            </div>
          </div>
          <div>
            <h3 class="text-2xl font-black text-gray-900 tracking-tight mb-1">K{{ formatNumber(kpis.moneySaved) }}</h3>
            <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Money Saved</p>
          </div>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="flex items-center gap-2 mb-6 border-b border-gray-200 pb-1">
        <button 
           @click="activeTab = 'kpi'" 
           :class="activeTab === 'kpi' ? 'text-[#2F2E8B] border-b-2 border-[#2F2E8B]' : 'text-gray-400 hover:text-gray-600 border-transparent'"
           class="px-4 py-2 text-xs font-bold font-mono uppercase tracking-widest transition-all border-b-2"
        >
           Tenant KPI Breakdown
        </button>
      </div>

      <!-- Tab Content Area -->
      <div class="bg-white p-6 border border-gray-200 shadow-sm rounded-sm mb-8 animate-fade-in">
        
        <!-- KPI Table -->
        <div v-if="activeTab === 'kpi'">
           <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight mb-6 flex items-center gap-2">
              <i class="fas fa-table text-gray-400 text-xs"></i> Tenant KPI Breakdown
           </h3>
           <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-100 border border-gray-100">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-[9px] font-bold text-gray-400 uppercase tracking-widest font-mono">Tenant</th>
                  <th class="px-6 py-3 text-right text-[9px] font-bold text-gray-400 uppercase tracking-widest font-mono">Growth</th>
                  <th class="px-6 py-3 text-right text-[9px] font-bold text-gray-400 uppercase tracking-widest font-mono">Time Saved</th>
                  <th class="px-6 py-3 text-right text-[9px] font-bold text-gray-400 uppercase tracking-widest font-mono">Compliance</th>
                  <th class="px-6 py-3 text-right text-[9px] font-bold text-gray-400 uppercase tracking-widest font-mono">Money Saved</th>
                  <th class="px-6 py-3 text-right text-[9px] font-bold text-gray-400 uppercase tracking-widest font-mono">Consulting Fees</th>
                  <th class="px-6 py-3 text-right text-[9px] font-bold text-gray-400 uppercase tracking-widest font-mono">Receipt Books</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-100">
                <tr v-for="tenant in tenantsKpi" :key="tenant.tenant_id" class="hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-4 whitespace-nowrap text-xs font-bold text-gray-800 uppercase">{{ tenant.business_name }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-xs font-mono font-medium text-green-600">{{ tenant.growthRate }}%</td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-xs font-mono font-medium text-gray-600">{{ tenant.timeSaved }} hrs</td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-xs font-mono font-medium text-blue-600">{{ tenant.complianceScore }}%</td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-xs font-mono font-medium text-gray-600">K{{ formatNumber(tenant.moneySaved) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-xs font-mono font-medium text-gray-600">K{{ formatNumber(tenant.consultingFeesSaved) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-xs font-mono font-medium text-gray-600">K{{ formatNumber(tenant.receiptBookSavings) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>



      </div>

      <!-- Admin Agent (AI Chat) -->
      <div class="bg-gradient-to-br from-white to-gray-50 rounded-sm shadow-md border border-gray-200 p-6 max-w-4xl mx-auto my-6 animate-fade-in delay-100">
        <div class="flex flex-col items-center mb-6 relative">
             <div class="w-10 h-10 bg-[#2F2E8B] rounded-full flex items-center justify-center text-white mb-2 shadow-sm">
                <i class="fas fa-robot text-lg"></i>
             </div>
             <h2 class="text-lg font-black text-gray-900 uppercase tracking-tight text-center">Admin Agent // Insights</h2>
             <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest text-center">AI-POWERED REPORTING ASSISTANT</p>
        </div>
        
        <div class="flex-1 overflow-y-auto p-4 max-h-[400px] border border-gray-200 rounded-sm bg-white mb-4 custom-scrollbar shadow-inner" ref="chatContainer">
          <div v-if="chatMessages.length === 0" class="text-center py-10 opacity-50">
             <i class="fas fa-comment-dots text-4xl text-gray-300 mb-2"></i>
             <p class="text-xs font-mono font-bold text-gray-400 uppercase">Ask me to generate a custom report...</p>
          </div>
          <div v-for="(msg, idx) in chatMessages" :key="idx" class="flex items-start mb-4 animate-fade-in-up" :class="msg.sender === 'admin' ? 'justify-end' : 'justify-start'">
            <div class="flex items-start max-w-[85%]" :class="msg.sender === 'admin' ? 'flex-row-reverse' : 'flex-row'">
              <div class="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden mx-2 shadow-sm border border-gray-200 bg-gray-100 flex items-center justify-center">
                 <i v-if="msg.sender === 'admin'" class="fas fa-user text-gray-500 text-xs"></i>
                 <i v-else class="fas fa-robot text-[#2F2E8B] text-xs"></i>
              </div>
              <div :class="[ msg.sender === 'admin' ? 'bg-[#2F2E8B] text-white rounded-br-none' : 'bg-gray-50 text-gray-900 border border-gray-200 rounded-bl-none', 'px-4 py-3 rounded-lg shadow-sm text-sm' ]">
                <div v-html="msg.text" class="prose prose-sm max-w-none prose-p:my-1 prose-headings:my-2 prose-ul:my-1 text-xs"></div>
                <span class="text-[9px] font-mono opacity-50 mt-1 block uppercase">{{ msg.timestamp }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="relative">
          <input 
            v-model="message" 
            @keyup.enter="sendMessage" 
            type="text" 
            placeholder="Type your request here (e.g., 'Show me top selling items this month')..." 
            class="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-sm outline-none focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] transition-colors bg-white text-sm placeholder-gray-400 font-sans shadow-sm"
          />
          <button 
            @click="sendMessage" 
            :disabled="loading || !message.trim()" 
            class="absolute right-2 top-1.5 p-1.5 bg-[#2F2E8B] text-white rounded-sm hover:bg-[#1D226B] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-sm"
          >
            <i class="fas fa-paper-plane text-xs"></i>
          </button>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import API_BASE_URL, { authFetch } from '@/services/api';
import { decodeJWT } from '@/services/decodeJWT.js';

const { getTenantId } = decodeJWT();
import { marked } from 'marked';

// Common State
const loadingAll = ref(false);

// Active tab state: 'kpi'
const activeTab = ref('kpi');

// Small spinner helper (returns HTML string for v-html) - simple inline loader
const spinnerHtml = `<svg class="animate-spin h-5 w-5 text-[#2F2E8B]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>`;

// KPI summary
const kpis = ref({
  totalTenants: 0,
  growthRate: 0,
  timeSaved: 0,
  complianceScore: 0,
  moneySaved: 0
});

// Per-tenant KPI breakdown
const tenantsKpi = ref([]);

// Format number utility
const formatNumber = (value) => {
  return Number(value || 0).toLocaleString('en-ZM', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};



// Fetch KPIs and breakdown
const fetchKpis = async () => {
  try {
  const response = await authFetch(`${API_BASE_URL}/reports/kpis?include_delivery=true`);
    if (!response.ok) throw new Error('Failed to fetch KPIs');
    const data = await response.json();
    kpis.value = {
      totalTenants: data.totalTenants || 0,
      growthRate: data.growthRate || 0,
      timeSaved: data.timeSaved || 0,
      complianceScore: data.complianceScore || 0,
      moneySaved: data.moneySaved || 0
    };
    tenantsKpi.value = data.tenantsKpi || [];
  } catch (error) {
    console.error('Error fetching KPIs:', error);
    kpis.value = { totalTenants: 0, growthRate: 0, timeSaved: 0, complianceScore: 0, moneySaved: 0 };
    tenantsKpi.value = [];
  }
};



// Admin Agent (AI Chat for Reports)
const chatMessages = ref([]);
const message = ref('');
const loading = ref(false);
const chatContainer = ref(null);

const sendMessage = async () => {
  if (!message.value.trim() || loading.value) return;

  const userMessage = message.value;
  const timestamp = new Date().toLocaleTimeString('en-ZM', { hour12: true });

  chatMessages.value.push({
    sender: 'admin',
    text: userMessage,
    timestamp
  });

  message.value = '';
  loading.value = true;
  await nextTick();
  if (chatContainer.value) chatContainer.value.scrollTop = chatContainer.value.scrollHeight;

  try {
    const queryString = `[admin] ${userMessage} | Please provide a structured response using Markdown with KPIs, growth rates, compliance, savings, and actionable insights for tenant impact.`;
    const response = await authFetch(`${API_BASE_URL}/owners-agent/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: queryString })
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    let botResponse = data.response || data.answer || data.message || 'No data available.';
    botResponse = marked.parse(botResponse);

    chatMessages.value.push({
      sender: 'bot',
      text: botResponse,
      timestamp: new Date().toLocaleTimeString('en-ZM', { hour12: true })
    });
  } catch (error) {
    chatMessages.value.push({
      sender: 'bot',
      text: `<p>Sorry, I couldn't process that request. Please try again.</p>`,
      timestamp: new Date().toLocaleTimeString('en-ZM', { hour12: true })
    });
  } finally {
    loading.value = false;
    await nextTick();
    if (chatContainer.value) chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

const refreshAll = async () => {
    loadingAll.value = true;
    await Promise.all([fetchKpis()]);
    loadingAll.value = false;
};

onMounted(refreshAll);
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

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #d1d5db #f3f4f6;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f3f4f6;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 0;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #9ca3af;
}

.dot-pattern {
  background-image: radial-gradient(#e5e7eb 1px, transparent 1px);
  background-size: 20px 20px;
}
</style>
