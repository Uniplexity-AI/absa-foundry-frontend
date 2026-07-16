<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-[10px] font-mono font-bold tracking-[0.25em] text-gray-400 uppercase">Dashboard Widgets</h2>
      <button
        @click="showSettings = !showSettings"
        class="text-[10px] font-mono font-bold tracking-wider uppercase px-3 py-1.5 border border-gray-200 text-gray-500 hover:text-gray-800 hover:border-gray-400 transition-all"
      >
        <i class="fas fa-cog mr-1.5 text-[9px]"></i>
        Configure
      </button>
    </div>

    <!-- Widget Settings Panel -->
    <transition name="widget-slide">
      <div v-if="showSettings" class="bg-white border border-gray-200 p-4">
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          <button
            v-for="w in allWidgets"
            :key="w.id"
            @click="toggleWidget(w.id)"
            :class="[
              'flex items-center gap-2 px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-wider border transition-all text-left',
              isWidgetEnabled(w.id)
                ? 'bg-[var(--brand-primary)] text-white border-[var(--brand-primary)]'
                : 'bg-white border-gray-200 text-gray-500 hover:border-gray-400'
            ]"
          >
            <i :class="[w.icon, 'text-[9px]']"></i>
            {{ w.label }}
          </button>
        </div>
      </div>
    </transition>

    <!-- Active Widgets Grid -->
    <div v-if="activeWidgets.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <component
        v-for="w in activeWidgets"
        :key="w.id"
        :is="w.component"
      />
    </div>
    <div v-else class="bg-white border border-gray-200 p-8 text-center">
      <i class="fas fa-puzzle-piece text-2xl text-gray-300 mb-3"></i>
      <p class="text-xs font-mono text-gray-400">No widgets enabled. Click "Configure" to add widgets.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDashboardWidgets } from '@/composables/useDashboardWidgets'

const showSettings = ref(false)

const { activeWidgets, allWidgets, toggleWidget, isWidgetEnabled } = useDashboardWidgets()
</script>

<style scoped>
.widget-slide-enter-active,
.widget-slide-leave-active {
  transition: all 0.2s ease;
}
.widget-slide-enter-from,
.widget-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
