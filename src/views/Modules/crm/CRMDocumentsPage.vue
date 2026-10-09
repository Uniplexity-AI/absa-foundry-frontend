<template>
  <div class="min-h-screen flex flex-col font-sans relative text-gray-900">
    
    <!-- Header -->
    <header class="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-[100] shadow-none">
      <div class="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <button @click="$router.push('/dashboard/crm')" class="text-gray-400 hover:text-[#2F2E8B] transition-colors mr-2">
            <i class="fas fa-arrow-left text-lg"></i>
          </button>
          <div class="w-2 h-8 bg-[#2F2E8B] rounded-none"></div>
          <div>
            <div class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <i class="fas fa-file-alt text-[#2F2E8B]"></i>
              <span>CRM // Documents</span>
            </div>
            <h1 class="text-xl font-black text-gray-900 uppercase tracking-tight font-display">Documents</h1>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-[10px] font-mono font-bold text-[#2F2E8B] bg-blue-50/50 border border-blue-100 px-3 py-1.5 flex items-center gap-2 rounded-none uppercase">
            <i class="fas fa-user-circle"></i>{{ getUserEmail() || 'USER' }}
          </span>
        </div>
      </div>
    </header>

    <main class="flex-1 w-full px-4 sm:px-6 lg:px-8 pt-8 pb-40 relative z-10 transition-all duration-300">
      <div class="relative">
        <div v-if="moduleLoading" class="absolute inset-0 z-20 bg-white/70 backdrop-blur-[1px] flex items-center justify-center">
          <div class="flex items-center gap-3 text-[#2F2E8B]"><i class="fas fa-spinner fa-spin text-2xl"></i><span class="font-semibold">Loading documents...</span></div>
        </div>
        <DocumentsView />
      </div>
      </main>
    </div>
</template>

<script setup>
import { BackButton } from '@/components/ui'
import { onMounted } from 'vue';
import { useCRMModule } from './composables/CRMModule.js';
import DocumentsView from './components/DocumentsView.vue';

const { getUserEmail, activeTab, moduleLoading } = useCRMModule();

onMounted(() => {
  activeTab.value = 'documents';
});
</script>
