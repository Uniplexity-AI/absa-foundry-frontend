<template>
  <div class="min-h-screen flex flex-col font-sans relative text-gray-900">
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm relative text-gray-800 blur-scoped">
      <div class="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <BackButton route="/dashboard/crm" variant="icon-only" />
          <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
          <div>
            <div class="flex items-center gap-1.5">
              <router-link to="/dashboard/sales" class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest hover:text-[#2F2E8B] transition">Sales</router-link>
              <span class="text-[10px] font-mono font-bold text-gray-300">//</span>
              <router-link to="/dashboard/crm" class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest hover:text-[#2F2E8B] transition">CRM</router-link>
              <span class="text-[10px] font-mono font-bold text-gray-300">//</span>
              <span class="text-[10px] font-mono font-bold text-gray-900 uppercase tracking-widest">Deals</span>
            </div>
            <h1 class="text-lg font-black text-gray-900 uppercase tracking-tight">Deal_Pipeline</h1>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <div v-if="branches.length > 0" class="relative">
            <select v-model="selectedBranch" @change="onBranchChange"
              class="appearance-none bg-white border border-gray-200 text-gray-700 py-1.5 pl-3 pr-8 rounded-sm text-[10px] font-mono font-bold uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent cursor-pointer hover:border-[#2F2E8B] transition">
              <option value="">ALL_BRANCHES</option>
              <option v-for="branch in branches" :key="branch._id" :value="branch._id">{{ branch.name.toUpperCase() }}</option>
            </select>
          </div>
          <span class="text-[10px] font-mono font-bold text-[#2F2E8B] bg-blue-50 border border-blue-100 px-3 py-1.5 flex items-center gap-2 rounded-sm uppercase tracking-wider">
            <UserCircle :size="14" /> {{ getUserEmail() || 'USER' }}
          </span>
        </div>
      </div>
    </header>

    <div class="flex-1 w-full relative z-10 pb-40 blur-scoped">
      <div class="px-4 sm:px-6 lg:px-8 py-6 relative">
        <!-- Loading Overlay -->
        <div v-if="moduleLoading" class="absolute inset-0 z-20 bg-white/70 backdrop-blur-[1px] flex items-center justify-center">
          <div class="h-12 w-12 border-4 border-gray-100 border-t-[#2F2E8B] rounded-full animate-spin"></div>
        </div>
        <DealsView :users="tenantUsers" />
      </div>
    </div>

    <!-- Deal Form Modal -->
    <Teleport to="#modal-target">
      <DealFormModal v-if="showDealFormModal" v-model="showDealFormModal" :deal="editingDeal" :users="tenantUsers" @saved="fetchPipelineData" />
    </Teleport>
  </div>
</template>

<script setup>
import { BackButton } from '@/components/ui'
import { onMounted } from 'vue';
import { useCRMModule } from './composables/CRMModule.js';
import DealsView from './components/DealsView.vue';
import DealFormModal from './components/DealFormModal.vue';
import { UserCircle } from 'lucide-vue-next';

const {
  branches, selectedBranch, onBranchChange, getUserEmail, tenantUsers,
  activeTab, moduleLoading, showDealFormModal, editingDeal, fetchPipelineData
} = useCRMModule();

onMounted(() => {
  activeTab.value = 'deals';
  fetchPipelineData();
});
</script>
