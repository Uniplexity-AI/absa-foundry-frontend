<template>
  <transition name="bulk-slide">
    <div v-if="count > 0" class="bg-red-50 border border-red-200 px-4 py-3 flex items-center justify-between shadow-sm">
      <div class="flex items-center gap-3">
        <span class="text-[10px] font-mono font-black text-red-700 uppercase tracking-widest">{{ count }} SELECTED</span>
        <button @click="$emit('clear')" class="text-[9px] font-mono font-bold text-gray-500 hover:text-gray-700 uppercase tracking-wider">
          Clear
        </button>
      </div>
      <div class="flex items-center gap-2">
        <slot name="actions" />
        <button
          v-if="showDelete"
          @click="$emit('delete')"
          :disabled="deleting"
          class="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
        >
          <i class="fas" :class="deleting ? 'fa-spinner fa-spin' : 'fa-trash'"></i>
          {{ deleting ? 'DELETING...' : 'DELETE SELECTED' }}
        </button>
        <slot name="secondary" />
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  count: { type: Number, default: 0 },
  showDelete: { type: Boolean, default: true },
  deleting: { type: Boolean, default: false }
})
defineEmits(['clear', 'delete'])
</script>

<style scoped>
.bulk-slide-enter-active,
.bulk-slide-leave-active {
  transition: all 0.2s ease;
}
.bulk-slide-enter-from,
.bulk-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
