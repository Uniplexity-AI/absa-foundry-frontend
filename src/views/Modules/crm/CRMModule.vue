<template>
  <div class="min-h-screen flex flex-col font-sans relative text-gray-900">
    <!-- Mesh Background -->
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <!-- Primary Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm relative blur-scoped">
      <div class="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-2 h-8 bg-[#2F2E8B] rounded-sm"></div>
          <div>
            <div class="flex items-center gap-1.5">
              <router-link to="/dashboard/sales" class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest hover:text-[#2F2E8B] transition">Sales</router-link>
              <span class="text-[10px] font-mono font-bold text-gray-300">//</span>
              <span class="text-[10px] font-mono font-bold text-gray-900 uppercase tracking-widest">CRM</span>
            </div>
            <h1 class="text-xl font-black text-gray-900 uppercase tracking-tight">CRM System</h1>
          </div>
        </div>

        <!-- User Context & Branch Selector -->
        <div class="flex items-center gap-3">
          <div v-if="branches.length > 0" class="relative">
            <select
              v-model="selectedBranch"
              @change="onBranchChange"
              class="appearance-none bg-white border border-gray-300 text-gray-700 py-2 pl-3 pr-8 rounded-sm text-xs font-mono font-bold uppercase focus:outline-none focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent cursor-pointer hover:border-[#2F2E8B] transition"
            >
              <option value="">ALL_BRANCHES</option>
              <option v-for="branch in branches" :key="branch._id" :value="branch._id">
                {{ branch.name.toUpperCase() }}
              </option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <ChevronDown :size="12" />
            </div>
          </div>
          <CRMNotificationPanel :tenantId="getTenantId()" />
          <span class="text-[10px] font-mono font-bold text-[#2F2E8B] bg-blue-50 border border-blue-100 px-3 py-1.5 flex items-center gap-2 rounded-sm uppercase tracking-wider">
            <UserCircle :size="14" />
            {{ getUserEmail() || 'USER' }}
          </span>
        </div>
      </div>
    </header>

    <div class="flex-1 w-full relative z-10 blur-scoped">
      <div class="px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        <!-- KPI Cards -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <div class="w-1 h-4 bg-[#2F2E8B]"></div>
            <h4 class="text-xs font-black text-gray-900 uppercase tracking-tight">Key Performance Indicators</h4>
          </div>

          <!-- Row 0: Conversion & Health KPIs -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <div class="bg-white border border-gray-200 shadow-sm hover:border-[#2F2E8B] transition cursor-pointer group relative overflow-hidden" @click="showAnalyticsModal = true">
              <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
              <div class="p-4 relative z-10">
                <div class="flex items-center justify-between mb-3">
                  <div class="bg-green-50 p-2 border border-green-100">
                    <TrendingUp :size="18" class="text-green-500 group-hover:text-green-600 transition-colors" />
                  </div>
                  <span class="text-[9px] text-green-600 font-mono font-bold uppercase">Rate</span>
                </div>
                <h5 class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Conv_Rate</h5>
                <p class="text-2xl font-black text-[#2F2E8B] tracking-tight">{{ getConversionRate() }}<span class="text-sm font-normal text-gray-400">%</span></p>
              </div>
            </div>
            <div class="bg-white border border-gray-200 shadow-sm hover:border-[#2F2E8B] transition cursor-pointer group relative overflow-hidden" @click="showAnalyticsModal = true">
              <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
              <div class="p-4 relative z-10">
                <div class="flex items-center justify-between mb-3">
                  <div class="bg-blue-50 p-2 border border-blue-100">
                    <Clock :size="18" class="text-blue-500 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <span class="text-[9px] text-blue-600 font-mono font-bold uppercase">Avg Time</span>
                </div>
                <h5 class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Lead?Client</h5>
                <p class="text-2xl font-black text-[#2F2E8B] tracking-tight">{{ avgConversionDays }}<span class="text-sm font-normal text-gray-400 ml-1">days</span></p>
              </div>
            </div>
            <div class="bg-white border border-gray-200 shadow-sm hover:border-[#2F2E8B] transition cursor-pointer group relative overflow-hidden" @click="showAnalyticsModal = true">
              <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
              <div class="p-4 relative z-10">
                <div class="flex items-center justify-between mb-3">
                  <div class="bg-orange-50 p-2 border border-orange-100">
                    <Zap :size="18" class="text-orange-500 group-hover:text-orange-600 transition-colors" />
                  </div>
                  <span class="text-[9px] text-orange-600 font-mono font-bold uppercase">Stale</span>
                </div>
                <h5 class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Stale_Leads</h5>
                <p class="text-2xl font-black text-orange-500 tracking-tight">{{ staleLeadsCount }}</p>
              </div>
            </div>
            <div class="bg-[#2F2E8B] border border-[#2F2E8B] shadow-sm hover:bg-[#1D226B] transition cursor-pointer group relative overflow-hidden" @click="showAnalyticsModal = true">
              <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-10"></div>
              <div class="p-4 relative z-10">
                <div class="flex items-center justify-between mb-3">
                  <div class="bg-white/15 p-2 border border-white/20">
                    <BarChart2 :size="18" class="text-white" />
                  </div>
                  <span class="text-[9px] text-blue-200 font-mono font-bold uppercase">Analytics</span>
                </div>
                <h5 class="text-[10px] font-mono font-bold text-blue-200 uppercase tracking-widest mb-1">CRM_Analytics</h5>
                <p class="text-sm font-black text-white tracking-tight">View Dashboard</p>
              </div>
            </div>
          </div>

          <!-- Row 1: Counts -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <div class="bg-white border border-gray-200 shadow-sm hover:border-[#2F2E8B] transition cursor-pointer group relative overflow-hidden" @click="router.push('/dashboard/crm/leads')">
              <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
              <div class="p-4 relative z-10">
                <div class="flex items-center justify-between mb-3">
                  <div class="bg-gray-50 p-2 border border-gray-200">
                    <UserPlus :size="18" class="text-gray-400 group-hover:text-[#2F2E8B] transition-colors" />
                  </div>
                  <span class="text-[9px] text-[#2F2E8B] font-mono font-bold uppercase">+{{ kpiNewLeadsThisMonth() }} this mo.</span>
                </div>
                <h5 class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Total_Leads</h5>
                <p class="text-2xl font-black text-[#2F2E8B] tracking-tight">{{ filteredLeadsForKPI.length }}</p>
              </div>
            </div>

            <div class="bg-white border border-gray-200 shadow-sm hover:border-[#2F2E8B] transition cursor-pointer group relative overflow-hidden" @click="router.push('/dashboard/crm/accounts')">
              <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
              <div class="p-4 relative z-10">
                <div class="flex items-center justify-between mb-3">
                  <div class="bg-gray-50 p-2 border border-gray-200">
                    <Building :size="18" class="text-gray-400 group-hover:text-[#2F2E8B] transition-colors" />
                  </div>
                  <span class="text-[9px] text-[#2F2E8B] font-mono font-bold uppercase">{{ filteredAccountsForKPI.length }} co.</span>
                </div>
                <h5 class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Total_Accounts</h5>
                <p class="text-2xl font-black text-[#2F2E8B] tracking-tight">{{ filteredAccountsForKPI.length }}</p>
              </div>
            </div>

            <div class="bg-white border border-gray-200 shadow-sm hover:border-[#2F2E8B] transition cursor-pointer group relative overflow-hidden" @click="router.push('/dashboard/crm/pipeline')">
              <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
              <div class="p-4 relative z-10">
                <div class="flex items-center justify-between mb-3">
                  <div class="bg-gray-50 p-2 border border-gray-200">
                    <GitBranch :size="18" class="text-gray-400 group-hover:text-[#2F2E8B] transition-colors" />
                  </div>
                  <span class="text-[9px] text-[#2F2E8B] font-mono font-bold uppercase">{{ getOpenDeals() }} open</span>
                </div>
                <h5 class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Total_Deals</h5>
                <p class="text-2xl font-black text-[#2F2E8B] tracking-tight">{{ filteredDealsForKPI.length }}</p>
              </div>
            </div>

            <div class="bg-white border border-gray-200 shadow-sm hover:border-[#2F2E8B] transition cursor-pointer group relative overflow-hidden" @click="router.push('/dashboard/crm/pipeline')">
              <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
              <div class="p-4 relative z-10">
                <div class="flex items-center justify-between mb-3">
                  <div class="bg-gray-50 p-2 border border-gray-200">
                    <TrendingUp :size="18" class="text-gray-400 group-hover:text-[#2F2E8B] transition-colors" />
                  </div>
                  <span class="text-[9px] text-[#2F2E8B] font-mono font-bold uppercase">{{ getConversionRate() }}% conv.</span>
                </div>
                <h5 class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Pipeline_Value</h5>
                <p class="text-2xl font-black text-[#2F2E8B] tracking-tight">{{ formatCurrency(kpiTotalPipelineValue) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Second Row: Nav Cards -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-5">
          <!-- Leads -->
          <button
            @click="router.push('/dashboard/crm/leads')"
            class="group bg-white border-2 border-gray-200 hover:border-[#2F2E8B] transition-all duration-200 p-8 flex flex-col items-center text-center relative overflow-hidden shadow-sm hover:shadow-xl focus:outline-none"
          >
            <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity"></div>
            <div class="relative z-10 flex flex-col items-center gap-4">
              <div class="w-14 h-14 bg-gray-50 border border-gray-200 group-hover:bg-[#2F2E8B] group-hover:border-[#2F2E8B] flex items-center justify-center transition-all duration-200">
                <UserPlus :size="22" class="text-gray-400 group-hover:text-white transition-colors duration-200" />
              </div>
              <div>
                <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight group-hover:text-[#2F2E8B] transition-colors mb-1">Leads</h3>
                <p class="text-[10px] font-mono text-gray-400 uppercase tracking-wide leading-relaxed">Manage � Filter � Assign<br>Track � Import � Export</p>
              </div>
              <div class="flex items-center gap-1.5 text-[9px] font-mono font-bold text-gray-300 group-hover:text-[#2F2E8B] uppercase tracking-widest transition-colors">
                <span>Open</span><ArrowRight :size="9" />
              </div>
            </div>
          </button>

          <!-- Events Pipeline -->
          <button
            @click="router.push('/dashboard/crm/pipeline')"
            class="group bg-white border-2 border-gray-200 hover:border-[#2F2E8B] transition-all duration-200 p-8 flex flex-col items-center text-center relative overflow-hidden shadow-sm hover:shadow-xl focus:outline-none"
          >
            <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity"></div>
            <div class="relative z-10 flex flex-col items-center gap-4">
              <div class="w-14 h-14 bg-gray-50 border border-gray-200 group-hover:bg-[#2F2E8B] group-hover:border-[#2F2E8B] flex items-center justify-center transition-all duration-200">
                <GitBranch :size="22" class="text-gray-400 group-hover:text-white transition-colors duration-200" />
              </div>
              <div>
                <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight group-hover:text-[#2F2E8B] transition-colors mb-1">Events Pipeline</h3>
                <p class="text-[10px] font-mono text-gray-400 uppercase tracking-wide leading-relaxed">Kanban � Stages � Deals<br>Convert � Track � Forecast</p>
              </div>
              <div class="flex items-center gap-1.5 text-[9px] font-mono font-bold text-gray-300 group-hover:text-[#2F2E8B] uppercase tracking-widest transition-colors">
                <span>Open</span><ArrowRight :size="9" />
              </div>
            </div>
          </button>

          <!-- Accounts -->
          <button
            @click="router.push('/dashboard/crm/accounts')"
            class="group bg-white border-2 border-gray-200 hover:border-[#2F2E8B] transition-all duration-200 p-8 flex flex-col items-center text-center relative overflow-hidden shadow-sm hover:shadow-xl focus:outline-none"
          >
            <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity"></div>
            <div class="relative z-10 flex flex-col items-center gap-4">
              <div class="w-14 h-14 bg-gray-50 border border-gray-200 group-hover:bg-[#2F2E8B] group-hover:border-[#2F2E8B] flex items-center justify-center transition-all duration-200">
                <Building :size="22" class="text-gray-400 group-hover:text-white transition-colors duration-200" />
              </div>
              <div>
                <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight group-hover:text-[#2F2E8B] transition-colors mb-1">Accounts</h3>
                <p class="text-[10px] font-mono text-gray-400 uppercase tracking-wide leading-relaxed">Companies � Contacts<br>Relationships � History</p>
              </div>
              <div class="flex items-center gap-1.5 text-[9px] font-mono font-bold text-gray-300 group-hover:text-[#2F2E8B] uppercase tracking-widest transition-colors">
                <span>Open</span><ArrowRight :size="9" />
              </div>
            </div>
          </button>

          <!-- Calendar -->
          <button
            @click="router.push('/dashboard/crm/meetings')"
            class="group bg-white border-2 border-gray-200 hover:border-[#2F2E8B] transition-all duration-200 p-8 flex flex-col items-center text-center relative overflow-hidden shadow-sm hover:shadow-xl focus:outline-none"
          >
            <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity"></div>
            <div class="relative z-10 flex flex-col items-center gap-4">
              <div class="w-14 h-14 bg-gray-50 border border-gray-200 group-hover:bg-[#2F2E8B] group-hover:border-[#2F2E8B] flex items-center justify-center transition-all duration-200">
                <Clock :size="22" class="text-gray-400 group-hover:text-white transition-colors duration-200" />
              </div>
              <div>
                <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight group-hover:text-[#2F2E8B] transition-colors mb-1">Calendar & Activities</h3>
                <p class="text-[10px] font-mono text-gray-400 uppercase tracking-wide leading-relaxed">Meetings � Follow-ups<br>Visits � Google Sync</p>
              </div>
              <div class="flex items-center gap-1.5 text-[9px] font-mono font-bold text-gray-300 group-hover:text-[#2F2E8B] uppercase tracking-widest transition-colors">
                <span>Open</span><ArrowRight :size="9" />
              </div>
            </div>
          </button>
        </div>

        <!-- Quick Action Shortcuts -->
        <div class="mt-10 flex items-center justify-center gap-6 border-t border-gray-100 pt-8 flex-wrap">
          <button @click="router.push('/dashboard/crm/leads')" class="text-[10px] font-mono font-bold text-gray-400 hover:text-[#2F2E8B] uppercase tracking-widest transition flex items-center gap-1.5 group">
            <div class="w-5 h-5 border border-gray-200 group-hover:border-[#2F2E8B] flex items-center justify-center transition-colors">
              <UserPlus :size="10" class="group-hover:text-[#2F2E8B] transition-colors" />
            </div>
            Add Lead
          </button>
          <div class="w-px h-5 bg-gray-200"></div>
          <button @click="router.push('/dashboard/crm/pipeline')" class="text-[10px] font-mono font-bold text-gray-400 hover:text-[#2F2E8B] uppercase tracking-widest transition flex items-center gap-1.5 group">
            <div class="w-5 h-5 border border-gray-200 group-hover:border-[#2F2E8B] flex items-center justify-center transition-colors">
              <GitBranch :size="10" class="group-hover:text-[#2F2E8B] transition-colors" />
            </div>
            Open Events Pipeline
          </button>
          <div class="w-px h-5 bg-gray-200"></div>
          <button @click="router.push('/dashboard/crm/accounts')" class="text-[10px] font-mono font-bold text-gray-400 hover:text-[#2F2E8B] uppercase tracking-widest transition flex items-center gap-1.5 group">
            <div class="w-5 h-5 border border-gray-200 group-hover:border-[#2F2E8B] flex items-center justify-center transition-colors">
              <Building :size="10" class="group-hover:text-[#2F2E8B] transition-colors" />
            </div>
            Create Account
          </button>
          <div class="w-px h-5 bg-gray-200"></div>
          <button @click="showAnalyticsModal = true" class="text-[10px] font-mono font-bold text-[#2F2E8B] hover:text-[#1D226B] uppercase tracking-widest transition flex items-center gap-1.5 group">
            <div class="w-5 h-5 border border-[#2F2E8B]/30 group-hover:border-[#2F2E8B] flex items-center justify-center transition-colors bg-blue-50">
              <BarChart2 :size="10" class="text-[#2F2E8B] transition-colors" />
            </div>
            CRM Analytics
          </button>
          <div class="w-px h-5 bg-gray-200"></div>
          <button @click="router.push('/dashboard/crm/meetings')" class="text-[10px] font-mono font-bold text-gray-400 hover:text-[#2F2E8B] uppercase tracking-widest transition flex items-center gap-1.5 group">
            <div class="w-5 h-5 border border-gray-200 group-hover:border-[#2F2E8B] flex items-center justify-center transition-colors">
              <Clock :size="10" class="group-hover:text-[#2F2E8B] transition-colors" />
            </div>
            Schedule Meeting
          </button>
        </div>

      </div>
    </div>

  </div>

  <!-- Analytics Modal -->
  <CRMAnalyticsModal
    v-model="showAnalyticsModal"
    :stats="stats"
    :performance-list="performanceList"
    :activities="crmActivities"
    :pipeline-leads="pipelineLeads"
    :pipeline-deals="pipelineDeals"
    :pipeline-accounts="pipelineAccounts"
    :pipeline-stages="allPipelineStages"
    :tenant-users="tenantUsers"
    :format-currency="formatCurrency"
    :is-admin="isAdminUser"
    :current-user-email="getUserEmail()"
    :can-assign-crm="canAssignCrm"
    @auto-assign="autoAssignLeads()"
    @refresh-stats="fetchPipelineData()"
  />
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCRMModule } from './functions/CRMModule.js';
import * as crmApi from '@/api_services/crm_api';
import { UserPlus, Building, UserCircle, ChevronDown, GitBranch, ArrowRight, TrendingUp, BarChart2, Zap, Clock } from 'lucide-vue-next';
import { useActivityTracker } from '@/config/useActivityTracker.js';
import CRMNotificationPanel from './components/CRMNotificationPanel.vue';
import CRMAnalyticsModal from './components/CRMAnalyticsModal.vue';

const router = useRouter();

const {
  formatCurrency, branches, selectedBranch, onBranchChange,
  getUserEmail, getTenantId,
  filteredLeadsForKPI, filteredAccountsForKPI, filteredDealsForKPI,
  kpiNewLeadsThisMonth, getOpenDeals, kpiTotalPipelineValue,
  getConversionRate,
  stats, performanceList, pipelineLeads, pipelineDeals, pipelineAccounts, tenantUsers, allPipelineStages,
  autoAssignLeads, avgConversionDays, staleLeadsCount, currentUserRole, currentUserEmail,
  canAssignCrm,
} = useCRMModule();

const isAdminUser = computed(() => {
  const role = currentUserRole.value?.id || '';
  return ['owner', 'admin', 'super_admin'].includes(role);
});

useActivityTracker({
  userId: getUserEmail(),
  tenantId: getTenantId(),
  module: 'crm'
});

const showAnalyticsModal = ref(false);
const crmActivities = ref([]);

// Fetch activities from both leads & accounts when analytics modal opens
watch(showAnalyticsModal, async (open) => {
  if (open) {
    const tenantId = getTenantId();
    if (!tenantId) return;
    try {
      const [leadActs, accountActs] = await Promise.all([
        crmApi.getActivities(tenantId, { related_type: 'lead', per_page: 2000 }).catch(() => []),
        crmApi.getActivities(tenantId, { related_type: 'account', per_page: 2000 }).catch(() => [])
      ]);
      const leadList = Array.isArray(leadActs) ? leadActs : (leadActs?.items || []);
      const accountList = Array.isArray(accountActs) ? accountActs : (accountActs?.items || []);
      // Also fetch activities without related_type filter (catch-all) — high limit to capture everything
      try {
        const allActs = await crmApi.getActivities(tenantId, { per_page: 5000 }).catch(() => null);
        if (allActs) {
          const allList = Array.isArray(allActs) ? allActs : (allActs?.items || []);
          const existingIds = new Set([...leadList, ...accountList].map(a => a.id || a._id));
          const extra = allList.filter(a => !existingIds.has(a.id || a._id));
          crmActivities.value = [...leadList, ...accountList, ...extra];
        } else {
          crmActivities.value = [...leadList, ...accountList];
        }
      } catch {
        crmActivities.value = [...leadList, ...accountList];
      }
      crmActivities.value.sort(
        (a, b) => new Date(b.created_at || b.createdAt || 0) - new Date(a.created_at || a.createdAt || 0)
      );
    } catch (e) {
      console.warn('[CRMModule] Failed to fetch activities:', e);
      crmActivities.value = [];
    }
  }
});

</script>

<style scoped>
select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%232F2E8B' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px;
  padding-right: 32px;
  cursor: pointer;
}

select:focus {
  outline: none;
}
</style>