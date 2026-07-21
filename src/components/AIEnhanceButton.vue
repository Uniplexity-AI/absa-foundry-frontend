<template>
  <button
    @click="handleEnhance"
    :disabled="isEnhancing || !modelValue || modelValue.trim().length === 0"
    class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
    :title="tooltip"
  >
    <!-- Lightning bolt icon -->
    <svg v-if="!isEnhancing" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
    
    <!-- Loading spinner -->
    <svg v-else class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    
    <span>{{ isEnhancing ? 'Enhancing...' : buttonText }}</span>
  </button>
</template>

<script setup>
import { ref } from 'vue';
import API_BASE_URL from '@/services/api';

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  context: {
    type: String,
    default: 'general'
  },
  tooltip: {
    type: String,
    default: 'Use AI to improve this text'
  },
  buttonText: {
    type: String,
    default: 'Enhance with AI'
  }
});

const emit = defineEmits(['update:modelValue', 'enhanced']);

const isEnhancing = ref(false);

async function handleEnhance() {
  if (!props.modelValue || props.modelValue.trim().length === 0) {
    return;
  }
  
  isEnhancing.value = true;
  
  try {
    const tenantId = localStorage.getItem('tenantId') || 'tenant2980';
    
    const response = await fetch(`${API_BASE_URL}/invoices/enhance-text?tenant_id=${tenantId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: props.modelValue,
        context: props.context
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to enhance text');
    }
    
    const data = await response.json();
    
    // Update the model value with enhanced text
    emit('update:modelValue', data.enhanced_text);
    emit('enhanced', data.enhanced_text);
    
  } catch (error) {
    console.error('AI Enhancement Error:', error);
    alert(`Failed to enhance text: ${error.message}`);
  } finally {
    isEnhancing.value = false;
  }
}
</script>

<style scoped>
/* Additional styles if needed */
</style>
