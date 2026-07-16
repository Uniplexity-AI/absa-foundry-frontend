<template>
  <div class="bg-white border border-gray-200">
    <!-- Controls -->
    <div class="px-4 py-3 border-b border-gray-200 bg-gray-50 flex flex-wrap items-center gap-3">
      <div class="flex items-center gap-2">
        <label class="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider">From</label>
        <input type="date" :value="dateFrom" @input="$emit('update:dateFrom', $event.target.value)" class="text-[10px] font-mono border border-gray-200 px-2 py-1.5 w-36" />
      </div>
      <div class="flex items-center gap-2">
        <label class="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider">To</label>
        <input type="date" :value="dateTo" @input="$emit('update:dateTo', $event.target.value)" class="text-[10px] font-mono border border-gray-200 px-2 py-1.5 w-36" />
      </div>
      <button @click="$emit('apply')" class="px-3 py-1.5 bg-[var(--brand-primary)] text-white text-[10px] font-mono font-bold tracking-wider uppercase hover:brightness-110 transition-all">
        <i class="fas fa-search mr-1 text-[9px]"></i>
        Filter
      </button>
      <div class="flex-1"></div>
      <slot name="actions" />
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="p-8 text-center">
      <i class="fas fa-spinner fa-spin text-gray-300 text-xl"></i>
      <p class="text-[10px] font-mono text-gray-400 mt-2">Loading archive data...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="p-8 text-center">
      <i class="fas fa-exclamation-triangle text-red-300 text-xl"></i>
      <p class="text-[10px] font-mono text-red-400 mt-2">{{ error }}</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="data.length === 0" class="p-8 text-center">
      <i class="fas fa-archive text-gray-300 text-xl"></i>
      <p class="text-[10px] font-mono text-gray-400 mt-2">No archive records found</p>
    </div>

    <!-- Data Table -->
    <div v-else class="overflow-x-auto">
      <slot name="table" :data="data" />
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="px-4 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
      <span class="text-[9px] font-mono text-gray-400">Page {{ currentPage }} of {{ totalPages }} ({{ totalItems }} records)</span>
      <div class="flex items-center gap-2">
        <button @click="$emit('prev')" :disabled="!hasPrevious" class="px-3 py-1 text-[9px] font-mono font-bold uppercase border border-gray-200 text-gray-500 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
          <i class="fas fa-chevron-left mr-1"></i> Prev
        </button>
        <button @click="$emit('next')" :disabled="!hasMore" class="px-3 py-1 text-[9px] font-mono font-bold uppercase border border-gray-200 text-gray-500 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
          Next <i class="fas fa-chevron-right ml-1"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  error: { type: String, default: '' },
  dateFrom: { type: String, default: '' },
  dateTo: { type: String, default: '' },
  currentPage: { type: Number, default: 1 },
  totalPages: { type: Number, default: 1 },
  totalItems: { type: Number, default: 0 },
  hasMore: { type: Boolean, default: false },
  hasPrevious: { type: Boolean, default: false }
})

defineEmits(['update:dateFrom', 'update:dateTo', 'apply', 'prev', 'next'])
</script>
