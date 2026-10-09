<template>
  <div class="min-h-screen flex flex-col font-sans relative text-gray-900">
    
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-none relative blur-scoped">
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
              <span class="text-[10px] font-mono font-bold text-gray-900 uppercase tracking-widest">Contacts</span>
            </div>
            <h1 class="text-lg font-black text-gray-900 uppercase tracking-tight">Contact_Directory</h1>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <!-- Branch selector -->
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

    <div class="flex-1 w-full relative z-10 pb-40 blur-scoped">
      <div class="px-4 sm:px-6 lg:px-8 py-6 relative">
        <!-- Loading Overlay -->
        <div v-if="moduleLoading" class="absolute inset-0 z-20 bg-white/70 backdrop-blur-[1px] flex items-center justify-center">
          <div class="h-12 w-12 border-4 border-gray-100 border-t-[#2F2E8B] rounded-full animate-spin"></div>
        </div>
        <ContactsView :users="tenantUsers" @call="callRecord" @whatsapp="whatsappTextRecord" />
      </div>
    </div>

    <!-- Contact Form Modal -->
    <Teleport to="#modal-target">
      <ContactFormModal v-if="showContactFormModal" v-model="showContactFormModal" :contact="editingContact"
        :accounts="pipelineAccounts" :users="tenantUsers" @saved="fetchPipelineData" />
    </Teleport>
  </div>
</template>

<script setup>
import { BackButton } from '@/components/ui'
import { onMounted } from 'vue';
import { useCRMModule } from './composables/CRMModule.js';
import ContactsView from './components/ContactsView.vue';
import ContactFormModal from './components/ContactFormModal.vue';
import { UserCircle } from 'lucide-vue-next';

const {
  branches, selectedBranch, onBranchChange, getUserEmail, tenantUsers,
  activeTab, moduleLoading, callRecord, whatsappTextRecord,
  showContactFormModal, editingContact, pipelineAccounts, fetchPipelineData
} = useCRMModule();

onMounted(() => {
  activeTab.value = 'contacts';
  fetchPipelineData();
});
</script>
