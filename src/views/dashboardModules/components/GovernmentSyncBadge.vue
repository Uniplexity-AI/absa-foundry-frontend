<template>
  <span v-if="status === 'synced'"
    class="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-none font-black text-[8px] uppercase tracking-widest">
    <i class="fas fa-check-circle text-[8px]"></i> Synced
  </span>
  <span v-else-if="status === 'syncing'"
    class="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-none font-black text-[8px] uppercase tracking-widest">
    <i class="fas fa-spinner fa-spin text-[8px]"></i> Syncing
  </span>
  <span v-else-if="status === 'pending'"
    class="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 rounded-none font-black text-[8px] uppercase tracking-widest">
    <i class="fas fa-clock text-[8px]"></i> Pending
  </span>
  <span v-else-if="status === 'warning'"
    class="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-100 text-orange-700 rounded-none font-black text-[8px] uppercase tracking-widest">
    <i class="fas fa-exclamation-triangle text-[8px]"></i> Warning
  </span>
  <span v-else-if="status === 'failed'"
    class="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 rounded-none font-black text-[8px] uppercase tracking-widest">
    <i class="fas fa-exclamation-circle text-[8px]"></i> Failed
  </span>
  <span v-else
    class="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-400 rounded-none font-black text-[8px] uppercase tracking-widest">
    <i class="fas fa-minus-circle text-[8px]"></i> N/A
  </span>
</template>

<script setup>
defineProps({
  status: { type: String, default: '' }
});
</script>
