<template>
  <!-- KPI Card skeleton -->
  <div v-if="type === 'kpi'" class="animate-pulse bg-white border border-gray-200 p-5">
    <div class="space-y-3">
      <div class="h-3 bg-gray-200 rounded-none w-2/3"></div>
      <div class="h-8 bg-gray-200 rounded-none w-1/2"></div>
      <div class="h-3 bg-gray-200 rounded-none w-1/3"></div>
    </div>
  </div>

  <!-- Card skeleton -->
  <div v-else-if="type === 'card'" class="animate-pulse bg-white border border-gray-200 p-6">
    <div class="space-y-4">
      <div class="h-4 bg-gray-200 rounded-none w-3/4"></div>
      <div class="h-8 bg-gray-200 rounded-none w-1/2"></div>
      <div class="h-3 bg-gray-200 rounded-none w-full"></div>
    </div>
  </div>

  <!-- Table row skeleton -->
  <div v-else-if="type === 'table'" class="animate-pulse">
    <div v-for="i in count" :key="i" class="flex gap-4 py-3 border-b border-gray-100">
      <div class="h-4 bg-gray-200 rounded-none w-1/4"></div>
      <div class="h-4 bg-gray-200 rounded-none w-1/3"></div>
      <div class="h-4 bg-gray-200 rounded-none w-1/4"></div>
      <div class="h-4 bg-gray-200 rounded-none w-1/6"></div>
    </div>
  </div>

  <!-- Module card skeleton -->
  <div v-else-if="type === 'module'" class="animate-pulse bg-white border border-gray-200 p-6">
    <div class="flex items-center gap-4 mb-4">
      <div class="w-12 h-12 bg-gray-200 rounded-none"></div>
      <div class="flex-1">
        <div class="h-5 bg-gray-200 rounded-none w-3/4 mb-2"></div>
        <div class="h-4 bg-gray-200 rounded-none w-1/2"></div>
      </div>
    </div>
    <div class="h-10 bg-gray-200 rounded-none w-full"></div>
  </div>

  <!-- Stats row skeleton (horizontal KPI group) -->
  <div v-else-if="type === 'stats'" class="animate-pulse">
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="i in 4" :key="i" class="bg-white border border-gray-200 p-5">
        <div class="h-3 bg-gray-200 rounded-none w-2/3 mb-3"></div>
        <div class="h-7 bg-gray-200 rounded-none w-1/2 mb-2"></div>
        <div class="h-3 bg-gray-200 rounded-none w-1/4"></div>
      </div>
    </div>
  </div>

  <!-- Context-aware inline block -->
  <div v-else-if="type === 'block'" class="animate-pulse h-full">
    <div class="bg-white border border-gray-200 p-6 h-full">
      <div class="h-4 bg-gray-200 rounded-none w-1/3 mb-4"></div>
      <div class="space-y-3">
        <div class="h-3 bg-gray-200 rounded-none w-full"></div>
        <div class="h-3 bg-gray-200 rounded-none w-5/6"></div>
        <div class="h-3 bg-gray-200 rounded-none w-4/6"></div>
      </div>
    </div>
  </div>

  <!-- Spinner (inline only, never fullscreen) -->
  <div v-else-if="type === 'spinner'" class="flex items-center justify-center py-6">
    <div class="flex items-center gap-3">
      <div class="h-5 w-5 border-2 border-gray-200 border-t-[var(--brand-primary)] rounded-full animate-spin"></div>
      <p v-if="message" class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">{{ message }}</p>
    </div>
  </div>

  <!-- Default bar skeleton -->
  <div v-else class="animate-pulse">
    <div class="bg-gray-200 rounded-none h-4 w-full"></div>
  </div>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ['card', 'kpi', 'table', 'module', 'stats', 'block', 'spinner'].includes(value)
  },
  message: {
    type: String,
    default: ''
  },
  count: {
    type: Number,
    default: 5
  }
})
</script>
