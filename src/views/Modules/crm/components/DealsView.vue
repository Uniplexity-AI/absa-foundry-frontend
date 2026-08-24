<template>
  <div class="deals-view space-y-6">
    <div v-if="loading" class="absolute inset-0 z-20 bg-white/80 backdrop-blur-sm flex items-center justify-center">
      <div class="flex items-center gap-3 text-[#2F2E8B]">
        <Loader2 class="animate-spin" :size="24" />
        <span class="font-mono font-black uppercase text-sm tracking-widest">Loading_Pipeline...</span>
      </div>
    </div>

    <!-- Header with Title and Quick Stats -->
    <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div class="flex-1 w-full">
        <div class="flex items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <div class="w-1 h-4 bg-[#2F2E8B]"></div>
              <h3 class="text-[10px] font-black text-gray-900 uppercase tracking-widest font-mono">Deal_Pipeline</h3>
            </div>
            <p class="text-[9px] font-mono text-gray-400 mt-1 uppercase tracking-widest">
              Total_Deals: <span class="text-[#2F2E8B] font-black">{{ totalDeals }}</span> // Range: {{ (currentPage - 1) * perPage + 1 }}-{{ Math.min(currentPage * perPage, totalDeals) }}
            </p>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-2">
            <button
              @click="openCreateModal"
              class="px-4 py-2 bg-[#2F2E8B] text-white hover:bg-[#3D2F88] transition flex items-center gap-2 font-mono font-bold uppercase text-[9px] rounded-sm tracking-widest"
            >
              <Plus :size="12" />
              Add_Deal
            </button>
          </div>
        </div>
      </div>
      
      <!-- Quick Stats Cards -->
      <div class="flex gap-4">
        <div class="bg-white border border-gray-200 hover:border-[#2F2E8B] transition-all duration-300 relative overflow-hidden group">
          <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-[0.03]"></div>
          <div class="px-4 py-2 relative z-10 w-32">
            <div class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Total_Value</div>
            <div class="text-xl font-black text-[#2F2E8B] tracking-tighter group-hover:scale-110 transition-transform origin-left truncate">{{ formatCurrency(stats.totalValue) }}</div>
            <div class="absolute right-2 bottom-2 text-blue-100 group-hover:text-blue-200 transition-colors">
              <DollarSign :size="14" />
            </div>
          </div>
        </div>
        <div class="bg-white border border-gray-200 hover:border-purple-500 transition-all duration-300 relative overflow-hidden group">
          <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-[0.03]"></div>
          <div class="px-4 py-2 relative z-10 w-32">
            <div class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Weighted_Value</div>
            <div class="text-xl font-black text-purple-600 tracking-tighter group-hover:scale-110 transition-transform origin-left truncate">{{ formatCurrency(stats.weightedValue) }}</div>
            <div class="absolute right-2 bottom-2 text-purple-100 group-hover:text-purple-200 transition-colors">
              <Percent :size="14" />
            </div>
          </div>
        </div>
        <div class="bg-white border border-gray-200 hover:border-green-500 transition-all duration-300 relative overflow-hidden group">
          <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-[0.03]"></div>
          <div class="px-4 py-2 relative z-10 w-32">
            <div class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Win_Rate</div>
            <div class="text-xl font-black text-green-600 tracking-tighter group-hover:scale-110 transition-transform origin-left">{{ stats.winRate }}%</div>
            <div class="absolute right-2 bottom-2 text-green-100 group-hover:text-green-200 transition-colors">
              <TrendingUp :size="14" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Search Row -->
    <div class="bg-white p-4 space-y-3 border border-gray-200">
      <div class="flex flex-col lg:flex-row gap-4">
        <!-- Search -->
        <div class="flex-1 relative group">
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#2F2E8B] transition-colors" :size="14" />
          <input
            v-model="searchQuery"
            @input="debouncedSearch"
            type="text"
            placeholder="Search_Deals_By_Name_Account_Contact..."
            class="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-sm focus:bg-white focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] transition-all font-mono text-[10px] uppercase tracking-wider"
          />
        </div>

        <!-- Stage Filter -->
        <div class="relative min-w-[160px]">
          <Filter class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" :size="12" />
          <select
            v-model="stageFilter"
            @change="loadDeals"
            class="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-sm focus:bg-white focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] transition-all font-mono text-[10px] uppercase tracking-wider appearance-none"
          >
            <option value="">All_Stages</option>
            <option value="prospecting">Prospecting</option>
            <option value="qualification">Qualification</option>
            <option value="proposal">Proposal</option>
            <option value="negotiation">Negotiation</option>
            <option value="closed-won">Closed Won</option>
            <option value="closed-lost">Closed Lost</option>
          </select>
          <ChevronDown class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" :size="12" />
        </div>

        <!-- View Toggle -->
        <div class="flex items-center gap-1 bg-gray-50 border border-gray-100 rounded-sm p-1">
          <button
            @click="viewMode = 'grid'"
            :class="viewMode === 'grid' ? 'bg-[#2F2E8B] text-white shadow-none' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'"
            class="p-1.5 rounded-sm transition-all"
            title="Grid View"
          >
            <LayoutGrid :size="14" />
          </button>
          <button
            @click="viewMode = 'list'"
            :class="viewMode === 'list' ? 'bg-[#2F2E8B] text-white shadow-none' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'"
            class="p-1.5 rounded-sm transition-all"
            title="List View"
          >
            <LayoutList :size="14" />
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2F2E8B]"></div>
    </div>

    <!-- Grid View -->
    <div v-else-if="viewMode === 'grid' && deals.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div
        v-for="deal in deals"
        :key="deal.id"
        @click="viewDeal(deal)"
        class="group bg-white border border-gray-200 hover:border-[#2F2E8B] transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col h-full rounded-sm"
      >
        <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-[0.02]"></div>
        
        <!-- Card Header -->
        <div class="p-4 border-b border-gray-100 relative z-10 flex-1">
          <div class="flex justify-between items-start mb-3">
            <div :class="getStageBadgeClass(deal.stage)" class="px-2 py-0.5 border text-[8px] font-mono font-black uppercase tracking-widest rounded-sm">
              {{ formatStage(deal.stage) }}
            </div>
            <div class="text-[9px] font-mono font-black text-[#2F2E8B] bg-blue-50 px-2 py-0.5 rounded-sm border border-blue-100">
              {{ deal.probability }}%_WIN
            </div>
          </div>

          <h4 class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-wider mb-4 line-clamp-2 group-hover:text-[#2F2E8B] transition-colors leading-relaxed">
            {{ deal.name }}
          </h4>

          <div class="space-y-2">
            <!-- Amount -->
            <div class="flex items-center justify-between group/val">
              <span class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">Deal_Value</span>
              <span class="text-xs font-mono font-black text-[#2F2E8B]">{{ formatCurrency(deal.amount) }}</span>
            </div>
            
            <!-- Account -->
            <div v-if="deal.accountName" class="flex items-center gap-2 mt-3 pt-2 border-t border-gray-50">
              <Building2 :size="10" class="text-gray-400" />
              <span class="text-[9px] font-mono text-gray-500 uppercase tracking-tight truncate">{{ deal.accountName }}</span>
            </div>
            
            <!-- Contact -->
            <div v-if="deal.contactName" class="flex items-center gap-2">
              <User :size="10" class="text-gray-400" />
              <span class="text-[9px] font-mono text-gray-600 font-bold uppercase tracking-tight truncate">{{ deal.contactName }}</span>
            </div>
          </div>
        </div>

        <!-- Card Footer -->
        <div class="px-4 py-2 border-t border-gray-100 bg-gray-50/50 relative z-10 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <Calendar :size="10" class="text-gray-400" />
            <span class="text-[8px] font-mono text-gray-400 uppercase tracking-tighter">{{ formatDate(deal.expectedCloseDate) }}</span>
          </div>
          <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              @click.stop="editDeal(deal)"
              class="p-1 hover:bg-white rounded-sm border border-transparent hover:border-gray-200 text-gray-400 hover:text-orange-500 transition-all"
              title="Edit"
            >
              <Edit :size="12" />
            </button>
            <button
              @click.stop="deleteDeal(deal)"
              class="p-1 hover:bg-white rounded-sm border border-transparent hover:border-gray-200 text-gray-400 hover:text-red-500 transition-all"
              title="Delete"
            >
              <Trash2 :size="12" />
            </button>
          </div>
          <button @click.stop="viewDeal(deal)" class="px-2 py-0.5 bg-[#2F2E8B] text-white text-[8px] font-mono font-black uppercase tracking-widest rounded-sm hover:bg-[#3D2F88] transition-all">
            REVIEW
          </button>
        </div>
      </div>
    </div>

    <!-- List View -->
    <div v-else-if="viewMode === 'list' && deals.length > 0" class="bg-white border border-gray-200 overflow-hidden rounded-sm relative">
      <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-[0.01]"></div>
      <div class="overflow-x-auto relative z-10">
        <table class="min-w-full divide-y divide-gray-100">
          <thead>
            <tr class="bg-gray-50/50">
              <th class="px-4 py-3 text-left text-[9px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]">
                <div class="flex items-center gap-2">
                  <span>Deal_Identity</span>
                  <ArrowUpDown :size="10" />
                </div>
              </th>
              <th class="px-4 py-3 text-left text-[9px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]">Stage</th>
              <th class="px-4 py-3 text-left text-[9px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]">Value_Estimate</th>
              <th class="px-4 py-3 text-left text-[9px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]">Probability</th>
              <th class="px-4 py-3 text-left text-[9px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]">Organization</th>
              <th class="px-4 py-3 text-left text-[9px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]">Contact</th>
              <th class="px-4 py-3 text-left text-[9px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]">Target_Date</th>
              <th class="px-4 py-3 text-right text-[9px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="deal in deals" :key="deal.id" class="hover:bg-gray-50/80 transition-colors group cursor-pointer" @click="viewDeal(deal)">
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-gray-50 border border-gray-100 rounded-sm flex items-center justify-center text-[10px] font-mono font-black text-gray-400 group-hover:text-[#2F2E8B] group-hover:border-blue-100 transition-colors uppercase">
                    {{ deal.name.charAt(0) }}
                  </div>
                  <div class="text-[10px] font-mono font-black text-gray-900 group-hover:text-[#2F2E8B] transition-colors uppercase truncate max-w-[200px]">{{ deal.name }}</div>
                </div>
              </td>
              <td class="px-4 py-3">
                <div :class="getStageBadgeClass(deal.stage)" class="inline-block px-2 py-0.5 border text-[8px] font-mono font-black uppercase tracking-widest rounded-sm">
                  {{ formatStage(deal.stage) }}
                </div>
              </td>
              <td class="px-4 py-3">
                <div class="text-[10px] font-mono font-black text-[#2F2E8B]">{{ formatCurrency(deal.amount) }}</div>
                <div class="text-[8px] font-mono text-gray-400 uppercase tracking-tighter">Deal_Value</div>
              </td>
              <td class="px-4 py-3">
                <div class="flex items-center gap-2">
                  <div class="w-12 bg-gray-100 h-1 rounded-full overflow-hidden">
                    <div class="bg-[#2F2E8B] h-full transition-all duration-500" :style="{ width: deal.probability + '%' }"></div>
                  </div>
                  <span class="text-[9px] font-mono font-black text-gray-600">{{ deal.probability }}%</span>
                </div>
              </td>
              <td class="px-4 py-3">
                <div v-if="deal.accountName" class="flex items-center gap-1.5 min-w-0">
                  <Building2 :size="10" class="text-gray-300" />
                  <span class="text-[9px] font-mono text-gray-500 uppercase tracking-tight truncate">{{ deal.accountName }}</span>
                </div>
                <span v-else class="text-[9px] font-mono text-gray-300 uppercase">n/a</span>
              </td>
              <td class="px-4 py-3">
                <div v-if="deal.contactName" class="flex items-center gap-1.5">
                  <User :size="10" class="text-gray-300" />
                  <span class="text-[9px] font-mono text-gray-700 font-bold uppercase tracking-tight">{{ deal.contactName }}</span>
                </div>
                <span v-else class="text-[9px] font-mono text-gray-300 uppercase">n/a</span>
              </td>
              <td class="px-4 py-3">
                <div class="flex items-center gap-1.5">
                  <Calendar :size="10" class="text-gray-300" />
                  <span class="text-[9px] font-mono text-gray-500 uppercase tracking-tight">{{ formatDate(deal.expectedCloseDate) }}</span>
                </div>
              </td>
              <td class="px-4 py-3 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button @click.stop="viewDeal(deal)" class="p-1 hover:bg-white rounded-sm border border-transparent hover:border-gray-200 text-gray-400 hover:text-[#2F2E8B] transition-all" title="View">
                    <Eye :size="12" />
                  </button>
                  <button @click.stop="editDeal(deal)" class="p-1 hover:bg-white rounded-sm border border-transparent hover:border-gray-200 text-gray-400 hover:text-orange-500 transition-all" title="Edit">
                    <Edit :size="12" />
                  </button>
                  <button @click.stop="deleteDeal(deal)" class="p-1 hover:bg-white rounded-sm border border-transparent hover:border-gray-200 text-gray-400 hover:text-red-500 transition-all" title="Delete">
                    <Trash2 :size="12" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!loading && deals.length === 0" class="bg-white border border-gray-100 p-16 text-center relative overflow-hidden rounded-sm">
      <div class="absolute inset-0 dotted-pattern opacity-[0.02] pointer-events-none"></div>
      <div class="relative z-10 flex flex-col items-center">
        <div class="w-16 h-16 bg-gray-50 border border-gray-100 rounded-sm flex items-center justify-center mb-6 shadow-none">
          <Inbox :size="32" class="text-gray-200" />
        </div>
        <h3 class="text-[12px] font-mono font-black text-gray-400 uppercase tracking-[0.2em] mb-2">NO_RECORDS_DETECTED</h3>
        <p class="text-[10px] font-mono text-gray-400 mb-8 max-w-xs mx-auto uppercase tracking-wider leading-relaxed">
          {{ searchQuery ? 'SEARCH_QUERY_RETURNED_ZERO_RESULTS // ADJUST_FILTERS' : 'PIPELINE_IS_EMPTY // INITIALIZE_FIRST_DEAL' }}
        </p>
        <button
          v-if="!searchQuery"
          @click="openCreateModal"
          class="px-8 py-3 bg-[#2F2E8B] text-white font-mono font-black uppercase text-[10px] rounded-sm tracking-[0.2em] hover:bg-[#3D2F88] transition-all flex items-center gap-3"
        >
          <Plus :size="14" />
          <span>INIT_NEW_DEAL</span>
        </button>
      </div>
    </div>

    <!-- Pagination Row -->
    <div v-if="deals.length > 0" class="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-gray-200 p-4 rounded-sm">
      <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">
        Showing_Records: 
        <span class="text-[#2F2E8B] font-black">{{ (currentPage - 1) * perPage + 1 }}</span> 
        -- 
        <span class="text-[#2F2E8B] font-black">{{ Math.min(currentPage * perPage, totalDeals) }}</span> 
        // Total: 
        <span class="text-[#2F2E8B] font-black">{{ totalDeals }}</span>
      </div>
      <div class="flex items-center gap-2">
        <button
          @click="previousPage"
          :disabled="currentPage === 1"
          class="p-2 border border-gray-200 rounded-sm text-gray-400 hover:text-[#2F2E8B] hover:border-[#2F2E8B] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          title="Previous Page"
        >
          <ChevronLeft :size="14" />
        </button>
        <div class="px-4 py-1.5 bg-gray-50 border border-gray-100 rounded-sm">
          <span class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest">
            Page_{{ currentPage }}_Of_{{ totalPages }}
          </span>
        </div>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="p-2 border border-blue-200 rounded-sm text-[#2F2E8B] hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          title="Next Page"
        >
          <ChevronRight :size="14" />
        </button>
      </div>
    </div>

    <!-- Modals -->
    <DealDetailModal
      v-model="showDetailModal"
      :deal="selectedDeal"
      @edit="handleEdit"
      @delete="handleDelete"
      @refresh="loadDeals"
    />

    <DealFormModal
      v-model="showFormModal"
      :deal="dealToEdit"
      :users="users"
      @saved="handleSaved"
    />

    <!-- Delete Confirmation Modal (Tech Grid) -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-[#0B0B1E]/60 backdrop-blur-md flex items-center justify-center z-[100] p-4 font-mono uppercase tracking-widest">
      <div class="bg-white border border-gray-200 shadow-2xl max-w-sm w-full relative overflow-hidden rounded-sm animate-scale-in">
        <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
        <div class="h-1 w-full bg-red-600 relative z-10"></div>
        
        <div class="p-6 relative z-10 text-center">
          <div class="w-12 h-12 bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-4 rounded-sm">
            <TriangleAlert :size="20" class="text-red-600" />
          </div>
          
          <h3 class="text-[12px] font-black text-gray-900 mb-2">SYSTEM_WARNING</h3>
          <p class="text-[9px] font-bold text-gray-400 mb-6 leading-relaxed">
            CONFIRM_DELETION_OF: <br/>
            <span class="text-gray-900 font-black">"{{ dealToDelete?.name }}"</span><br/>
            THIS_OPERATION_IS_PERMANENT.
          </p>

          <div class="grid grid-cols-2 gap-3">
            <button
              @click="showDeleteConfirm = false"
              class="px-4 py-2.5 border border-gray-200 text-gray-600 font-black text-[9px] hover:bg-gray-50 transition-all rounded-sm uppercase"
            >
              ABORT
            </button>
            <button
              @click="confirmDelete"
              class="px-4 py-2.5 bg-red-600 text-white font-black text-[9px] hover:bg-red-700 transition-all rounded-sm shadow-lg shadow-red-200 uppercase"
            >
              EXEC_DELETE
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  Plus, 
  Loader2, 
  Search, 
  Filter, 
  ChevronDown, 
  LayoutGrid, 
  LayoutList, 
  Building2, 
  User, 
  Calendar, 
  Edit, 
  Trash2, 
  Eye, 
  ArrowUpDown, 
  Inbox, 
  ChevronLeft, 
  ChevronRight, 
  TriangleAlert,
  DollarSign,
  Percent,
  TrendingUp
} from 'lucide-vue-next';
import { ref, computed, onMounted } from 'vue';
import * as crmApi from '@/services/crm_api.js';
import { decodeJWT } from '@/services/decodeJWT.js';
import { emit as emitCrmEvent } from '@/events/crmEvents.js';
import DealDetailModal from './DealDetailModal.vue';
import DealFormModal from './DealFormModal.vue';
import { useCurrency } from '@/composables/useCurrency';

const props = defineProps({
  users: {
    type: Array,
    default: () => []
  }
});

const { getTenantId } = decodeJWT();
const { formatCurrency } = useCurrency();

// State
const deals = ref([]);
const loading = ref(false);
const searchQuery = ref('');
const currentPage = ref(1);
const perPage = ref(10);
const totalDeals = ref(0);
const stageFilter = ref('');
const viewMode = ref('grid');

const showDetailModal = ref(false);
const showFormModal = ref(false);
const showDeleteConfirm = ref(false);
const selectedDeal = ref(null);
const dealToEdit = ref(null);
const dealToDelete = ref(null);

// Computed
const totalPages = computed(() => Math.ceil(totalDeals.value / perPage.value));

const stats = computed(() => {
  const total = deals.value.length;
  const totalValue = deals.value.reduce((sum, d) => sum + (d.amount || 0), 0);
  const weightedValue = deals.value.reduce((sum, d) => sum + ((d.amount || 0) * (d.probability || 0)) / 100, 0);
  const closedWon = deals.value.filter(d => d.stage === 'closed-won').length;
  const closedLost = deals.value.filter(d => d.stage === 'closed-lost').length;
  const totalClosed = closedWon + closedLost;
  const winRate = totalClosed > 0 ? Math.round((closedWon / totalClosed) * 100) : 0;

  return { total, totalValue, weightedValue, winRate };
});

// Methods
async function loadDeals() {
  loading.value = true;
  try {
    const tenantId = String(getTenantId() || '');
    const params = {
      page: currentPage.value,
      per_page: perPage.value,
      q: searchQuery.value || undefined,
      stage: stageFilter.value || undefined
    };

    const response = await crmApi.getDeals(tenantId, params);
    deals.value = response.items || response || [];
    totalDeals.value = response.total || deals.value.length;
  } catch (error) {
    console.error('Failed to load deals:', error);
    deals.value = [];
    totalDeals.value = 0;
  } finally {
    loading.value = false;
  }
}

let searchTimeout = null;
function debouncedSearch() {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    currentPage.value = 1;
    loadDeals();
  }, 500);
}

function openCreateModal() {
  dealToEdit.value = null;
  showFormModal.value = true;
}

function viewDeal(deal) {
  selectedDeal.value = deal;
  showDetailModal.value = true;
}

function editDeal(deal) {
  dealToEdit.value = deal;
  showFormModal.value = true;
}

function deleteDeal(deal) {
  dealToDelete.value = deal;
  showDeleteConfirm.value = true;
}

async function confirmDelete() {
  try {
    const tenantId = String(getTenantId() || '');
    await crmApi.deleteDeal(dealToDelete.value.id, tenantId);
    showDeleteConfirm.value = false;
    dealToDelete.value = null;
    await loadDeals();
    emitCrmEvent('crm:deals:changed');
  } catch (error) {
    console.error('Failed to delete deal:', error);
  }
}

function handleEdit(deal) {
  showDetailModal.value = false;
  setTimeout(() => {
    dealToEdit.value = deal;
    showFormModal.value = true;
  }, 100);
}

function handleDelete(deal) {
  showDetailModal.value = false;
  setTimeout(() => {
    deleteDeal(deal);
  }, 100);
}

async function handleSaved() {
  showFormModal.value = false;
  dealToEdit.value = null;
  await loadDeals();
  emitCrmEvent('crm:deals:changed');
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    loadDeals();
  }
}

function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
    loadDeals();
  }
}

function formatDate(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatStage(stage) {
  if (!stage) return '';
  return stage.replace(/-/g, ' ');
}

function getStageBadgeClass(stage) {
  return 'bg-gray-50 text-gray-400 border-gray-100';
}

// Lifecycle
onMounted(() => {
  loadDeals();
});
</script>

<style scoped>
.dotted-pattern {
  background-image: radial-gradient(circle, #2F2E8B 1px, transparent 1px);
  background-size: 20px 20px;
}

@keyframes scale-in {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
.animate-scale-in { animation: scale-in 0.2s ease-out; }

.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.overflow-x-auto::-webkit-scrollbar {
  height: 4px;
}
.overflow-x-auto::-webkit-scrollbar-track {
  background: transparent;
}
.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #E5E7EB;
  border-radius: 10px;
}
.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #D1D5DB;
}
</style>
