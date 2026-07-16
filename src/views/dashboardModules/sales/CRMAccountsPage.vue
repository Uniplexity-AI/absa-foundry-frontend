<template>
  <div class="min-h-screen flex flex-col font-sans relative text-gray-900">
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm relative blur-scoped">
      <div class="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <BackButton route="/dashboard/crm" variant="icon-only" />
          <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
          <div>
            <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">CRM // Accounts</span>
            <h1 class="text-lg font-black text-gray-900 uppercase tracking-tight">Accounts</h1>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <select v-if="branches.length > 0" v-model="selectedBranch" @change="onBranchChange"
            class="appearance-none bg-white border border-gray-200 text-gray-700 py-1.5 pl-3 pr-7 rounded-sm text-[10px] font-mono font-bold uppercase focus:outline-none focus:ring-1 focus:ring-[#2F2E8B] cursor-pointer hover:border-[#2F2E8B] transition">
            <option value="">ALL_BRANCHES</option>
            <option v-for="branch in branches" :key="branch._id" :value="branch._id">{{ branch.name.toUpperCase() }}</option>
          </select>
          <span class="text-[10px] font-mono font-bold text-[#2F2E8B] bg-blue-50 border border-blue-100 px-3 py-1.5 flex items-center gap-2 rounded-sm uppercase tracking-wider">
            <UserCircle :size="14" /> {{ getUserEmail() || 'USER' }}
          </span>
        </div>
      </div>
    </header>

    <!-- CRM Section Navigation -->
    <nav class="bg-white border-b border-gray-100 sticky top-16 z-20 blur-scoped">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-0">
          <router-link to="/dashboard/crm/leads"
            class="flex items-center gap-2 px-5 py-3 text-[10px] font-mono font-black uppercase tracking-widest border-b-2 transition-colors"
            :class="$route.path === '/dashboard/crm/leads' ? 'border-[#2F2E8B] text-[#2F2E8B]' : 'border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300'"
          >
            <i class="fas fa-user-plus text-[10px]"></i> Leads
          </router-link>
          <router-link to="/dashboard/crm/pipeline"
            class="flex items-center gap-2 px-5 py-3 text-[10px] font-mono font-black uppercase tracking-widest border-b-2 transition-colors"
            :class="$route.path === '/dashboard/crm/pipeline' ? 'border-[#2F2E8B] text-[#2F2E8B]' : 'border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300'"
          >
            <i class="fas fa-project-diagram text-[10px]"></i> Events Pipeline
          </router-link>
          <router-link to="/dashboard/crm/accounts"
            class="flex items-center gap-2 px-5 py-3 text-[10px] font-mono font-black uppercase tracking-widest border-b-2 transition-colors"
            :class="$route.path === '/dashboard/crm/accounts' ? 'border-[#2F2E8B] text-[#2F2E8B]' : 'border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300'"
          >
            <i class="fas fa-building text-[10px]"></i> Accounts
          </router-link>
        </div>
      </div>
    </nav>

    <div class="flex-1 w-full relative z-10 pb-40 blur-scoped">
      <div class="px-4 sm:px-6 lg:px-8 py-6 relative">
        <!-- Skeleton Loading -->
        <div v-if="moduleLoading" class="space-y-4 w-full animate-pulse">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="h-4 w-40 bg-gray-200 rounded-sm"></div>
              <div class="h-3 w-36 bg-gray-100 rounded-sm"></div>
            </div>
            <div class="h-8 w-28 bg-gray-200 rounded-sm"></div>
          </div>
          <div class="flex gap-3">
            <div class="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div v-for="i in 4" :key="i" class="h-24 bg-gray-100 rounded-sm"></div>
            </div>
            <div class="w-72 space-y-2">
              <div class="h-10 bg-gray-100 rounded-sm"></div>
              <div class="h-8 bg-gray-100 rounded-sm"></div>
            </div>
          </div>
          <div class="flex gap-3">
            <div v-for="col in 4" :key="col" class="flex-1 space-y-2">
              <div class="h-6 bg-gray-200 rounded-sm"></div>
              <div v-for="r in 3" :key="r" class="h-16 bg-gray-100 rounded-sm"></div>
            </div>
          </div>
        </div>
        <AccountsView v-else :users="tenantUsers" />
      </div>
    </div>

    <!-- Account Form Modal -->
    <AccountFormModal v-if="showAccountFormModal" v-model="showAccountFormModal"
      :account="editingAccount" :users="tenantUsers" @saved="fetchPipelineData" />
  </div>
</template>

<script setup>
import { BackButton } from '@/components/ui'
import { onMounted } from 'vue';
import { useCRMModule } from '../functions/CRMModule.js';
import AccountsView from '../components/crm/AccountsView.vue';
import AccountFormModal from '../components/crm/AccountFormModal.vue';
import { UserCircle } from 'lucide-vue-next';

const {
  branches, selectedBranch, onBranchChange, getUserEmail, tenantUsers,
  activeTab, moduleLoading, showAccountFormModal, editingAccount,
  fetchPipelineData, loadMeetings
} = useCRMModule();

onMounted(() => {
  activeTab.value = 'accounts';
  fetchPipelineData().catch(() => {});
  loadMeetings().catch(() => {});
});
</script>
