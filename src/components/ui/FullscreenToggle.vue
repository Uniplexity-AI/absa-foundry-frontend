<template>
  <button
    @click="toggleFullscreen"
    :class="[
      'inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-mono font-bold tracking-wider uppercase border transition-all',
      isFullscreen
        ? 'bg-[var(--brand-primary)] text-white border-[var(--brand-primary)]'
        : 'border-gray-200 text-gray-500 hover:text-gray-800 hover:border-gray-400 bg-white'
    ]"
    :title="isFullscreen ? 'Exit full-screen mode' : 'Enter full-screen mode'"
  >
    <i class="fas" :class="isFullscreen ? 'fa-compress' : 'fa-expand'"></i>
    {{ isFullscreen ? 'Normal' : 'Full Screen' }}
  </button>
</template>

<script setup>
import { useFullscreenMode } from '@/composables/useFullscreenMode'

const { isFullscreen, toggleFullscreen } = useFullscreenMode()
</script>
