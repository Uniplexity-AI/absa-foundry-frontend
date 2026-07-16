<template>
  <div class="relative">
    <!-- Back navigation overlay -->
    <div class="fixed top-0 left-0 right-0 z-[200] bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
        <BackButton :route="backRoute" />
        <div class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
          <i class="fas fa-file-invoice text-[#2F2E8B]"></i> Full Document Manager
        </div>
      </div>
    </div>
    <!-- Spacer for fixed header -->
    <div class="h-12"></div>
    <!-- Render the original full InvoicingModule -->
    <InvoicingModuleFull ref="fullModuleRef" />
  </div>
</template>

<script setup>
import { BackButton } from '@/components/ui'
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import InvoicingModuleFull from '../InvoicingModule.vue';

const route = useRoute();
const fullModuleRef = ref(null);

const backLabel = computed(() => {
  const from = route.query.from;
  if (from === 'invoices') return 'Invoices';
  if (from === 'quotations') return 'Quotations';
  if (from === 'proposals') return 'Proposals';
  if (from === 'contracts') return 'Contracts';
  if (from === 'progress-reports') return 'Progress Reports';
  return 'Invoicing Dashboard';
});

const backRoute = computed(() => {
  const from = route.query.from;
  if (from) return `/dashboard/invoicing/${from}`;
  return '/dashboard/invoicing';
});
</script>
