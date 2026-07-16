<template>
  <div class="flex flex-col items-center justify-center py-16 px-6 text-center">
    <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
      <i :class="[icon, 'text-xl text-gray-300']"></i>
    </div>
    <h3 class="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">{{ title }}</h3>
    <p class="text-xs text-gray-400 max-w-sm mb-6 font-mono">{{ message }}</p>
    <button
      v-if="actionLabel"
      @click="$emit('action')"
      class="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--brand-primary)] text-white text-[10px] font-mono font-bold tracking-wider uppercase hover:brightness-110 transition-all"
    >
      <i :class="actionIcon"></i>
      {{ actionLabel }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  icon: { type: String, default: 'fas fa-inbox' },
  title: { type: String, default: 'No data' },
  message: { type: String, default: 'There is nothing here yet.' },
  actionLabel: { type: String, default: '' },
  actionIcon: { type: String, default: 'fas fa-plus' }
})

defineEmits(['action'])
</script>
