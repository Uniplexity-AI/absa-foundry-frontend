<!-- 
  Example Usage of Currency Service in Vue Components
  This file demonstrates various ways to use the global currency service
-->

<template>
  <div class="currency-examples p-6 bg-white rounded-lg shadow-sm">
    <h3 class="text-lg font-semibold mb-4">Currency Service Examples</h3>
    
    <!-- Using Global Properties in Template -->
    <div class="mb-4">
      <h4 class="font-medium mb-2">Global Properties Usage (in template):</h4>
      <div class="space-y-2 text-sm">
        <div>Simple Price: {{ $formatCurrency(1250.50) }}</div>
        <div>Large Amount: {{ $formatCurrency(125000) }}</div>
        <div>Compact Format: {{ $formatCurrencyCompact(1250000) }}</div>
        <div>Currency Symbol: {{ $getCurrencySymbol() }}</div>
        <div>Currency Code: {{ $getCurrencyCode() }}</div>
      </div>
    </div>

    <!-- Using Composable in Script -->
    <div class="mb-4">
      <h4 class="font-medium mb-2">Composable Usage (in script):</h4>
      <div class="space-y-2 text-sm">
        <div>Formatted Price: {{ formattedPrice }}</div>
        <div>Compact Price: {{ compactPrice }}</div>
        <div>Current Symbol: {{ currencySymbol }}</div>
        <div>Current Code: {{ currencyCode }}</div>
      </div>
    </div>

    <!-- Using Direct Service Import -->
    <div class="mb-4">
      <h4 class="font-medium mb-2">Direct Service Usage:</h4>
      <div class="space-y-2 text-sm">
        <div>Service Formatted: {{ serviceFormatted }}</div>
        <div>Service Settings: {{ JSON.stringify(serviceSettings) }}</div>
      </div>
    </div>

    <!-- Interactive Example -->
    <div class="border-t pt-4">
      <h4 class="font-medium mb-2">Interactive Example:</h4>
      <div class="flex gap-2 items-center">
        <input 
          v-model.number="testAmount" 
          type="number" 
          placeholder="Enter amount"
          class="border rounded px-3 py-2 w-32"
        />
        <span>→</span>
        <span class="font-medium">{{ $formatCurrency(testAmount) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCurrency } from '@/composables/useCurrency.js'
import currencyService from '@/services/currencyService.js'

// Using the composable
const { 
  formatCurrency, 
  formatCurrencyCompact, 
  currencySymbol, 
  currencyCode,
  initializeCurrency
} = useCurrency()

// Reactive test amount
const testAmount = ref(1500)

// Computed properties using composable
const formattedPrice = computed(() => formatCurrency(2500.75))
const compactPrice = computed(() => formatCurrencyCompact(1500000))

// Using direct service
const serviceFormatted = ref('')
const serviceSettings = ref({})

onMounted(async () => {
  // Ensure currency service is initialized
  await initializeCurrency()
  
  // Use direct service
  serviceFormatted.value = currencyService.format(3750.25)
  serviceSettings.value = currencyService.getSettings()
})
</script>

<style scoped>
/* Component specific styles */
.currency-examples {
  max-width: 600px;
}
</style>