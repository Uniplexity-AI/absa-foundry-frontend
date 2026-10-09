<template>
  <div v-if="modelValue" class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-none shadow-2xl max-w-2xl w-full overflow-hidden animate-scale-in border border-gray-200 relative">
            <!-- Header -->
      <div class="bg-white/80 backdrop-blur-md border-b border-gray-100 p-6 flex items-center justify-between relative z-10">
        <div class="flex items-center gap-3">
          <div class="w-1.5 h-6 bg-orange-500"></div>
          <h3 class="text-xl font-black text-gray-900 font-display uppercase tracking-tight">Subscription Required</h3>
        </div>
        <button @click="close" class="text-gray-400 hover:text-gray-600 p-2 transition">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>

      <!-- Body -->
      <div class="p-8 space-y-8 relative z-10">
        <!-- Icon & Title -->
        <div class="text-center">
          <div class="w-16 h-16 bg-gray-50 border border-gray-100 flex items-center justify-center mx-auto mb-6">
            <i class="fas fa-lock text-2xl text-orange-500"></i>
          </div>
          <h4 class="mb-2 text-2xl font-black tracking-tight text-gray-900">{{ featureName }}</h4>
          <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest leading-relaxed max-w-sm mx-auto">
            You need access to the <span class="text-orange-600">{{ moduleName }}</span> to utilize this architectural feature.
          </p>
        </div>

        <!-- Feature Benefits -->
        <div class="bg-gray-50/50 p-6 border border-gray-100 relative overflow-hidden">
                    <h5 class="text-[10px] font-mono font-black text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-2 relative z-10">
            <i class="fas fa-shield-alt text-orange-500"></i>
            Architectural Benefits:
          </h5>
          <ul class="space-y-3 relative z-10">
            <li v-for="(benefit, index) in benefits" :key="index" class="flex items-start gap-3 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">
              <i class="fas fa-check-circle text-orange-500 mt-1"></i>
              <span>{{ benefit }}</span>
            </li>
          </ul>
        </div>

        <!-- Pricing Info (if provided) -->
        <div v-if="modulePrice !== null" class="border border-gray-100 p-6 bg-white relative overflow-hidden">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Standard Rate</p>
              <p class="text-3xl font-black text-gray-900 font-display">
                ${{ modulePrice.toFixed(2) }}
                <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest ml-1">/ Month</span>
              </p>
            </div>
            <div class="w-12 h-12 bg-gray-50 border border-gray-100 flex items-center justify-center">
              <i class="fas fa-tag text-gray-300"></i>
            </div>
          </div>
        </div>

        <!-- Info Note -->
        <div class="bg-orange-50/30 border border-orange-100 p-4">
          <div class="flex items-start gap-3">
            <i class="fas fa-info-circle text-orange-500 mt-1"></i>
            <div class="text-[9px] font-mono font-bold text-orange-800 uppercase tracking-widest leading-relaxed">
              <p class="font-black mb-1">Status: Pending Approval</p>
              <p>Requested subscriptions are subject to administrative review. Notification will be issued upon clearance.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="bg-gray-50 px-8 py-4 flex justify-end gap-3 border-t border-gray-100 relative z-20">
        <button
          @click="close"
          class="px-8 py-3 border border-gray-200 text-gray-400 font-bold font-mono text-[10px] rounded-none hover:bg-gray-100 transition uppercase tracking-widest"
        >
          Decline
        </button>
        <button
          @click="requestSubscription"
          :disabled="isRequesting"
          class="px-8 py-3 bg-orange-600 text-white font-bold font-mono text-[10px] rounded-none hover:bg-orange-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest flex items-center gap-3"
        >
          <i v-if="isRequesting" class="fas fa-spinner fa-spin"></i>
          <i v-else class="fas fa-paper-plane"></i>
          <span>{{ isRequesting ? 'Deploying Request...' : 'Authorize Subscription' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { requestModuleSubscription } from '@/services/modules_api';

const props = defineProps({
  modelValue: Boolean,
  moduleId: {
    type: String,
    required: true
  },
  moduleName: {
    type: String,
    default: 'Invoicing Module'
  },
  featureName: {
    type: String,
    default: 'Create Invoice/Quote'
  },
  modulePrice: {
    type: Number,
    default: null
  },
  benefits: {
    type: Array,
    default: () => [
      'Professional invoice and quotation generation',
      'Custom branding with your business logo',
      'PDF export with automated email delivery',
      'Track invoice status and payment history',
      'Automated payment reminders',
      'Multi-currency support'
    ]
  }
});

const emit = defineEmits(['update:modelValue', 'requested']);

const isRequesting = ref(false);

async function requestSubscription() {
  try {
    isRequesting.value = true;
    
    // Request subscription for the module
    const result = await requestModuleSubscription(props.moduleId);
    
    // Show success message
    alert(`Subscription request sent successfully! Request ID: ${result.request_id || 'N/A'}\n\nAn admin will review your request shortly.`);
    
    // Emit event
    emit('requested', result);
    
    close();
  } catch (error) {
    console.error('Failed to request subscription:', error);
    alert(`Failed to request subscription: ${error.message}`);
  } finally {
    isRequesting.value = false;
  }
}

function close() {
  emit('update:modelValue', false);
}
</script>

<style scoped>
@keyframes scale-in {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
.animate-scale-in {
  animation: scale-in 0.2s ease-out;
}
</style>
