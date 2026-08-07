<script setup>
import { ref } from 'vue'

const props = defineProps({
  transitions: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  error: { type: [String, Boolean], default: false },
})

const emit = defineEmits(['retry'])

const hoveredIndex = ref(null)

function stateColor(state) {
  const map = {
    ACTIVE: 'var(--absa-success, #16A34A)',
    AT_RISK: 'var(--absa-warning, #F59E0B)',
    DORMANT: 'var(--absa-neutral, #6B7280)',
    CHURNED: 'var(--absa-critical, #DC2626)',
  }
  return map[state] || '#9CA3AF'
}

function stateLabel(state) {
  const map = {
    ACTIVE: 'Active',
    AT_RISK: 'At Risk',
    DORMANT: 'Dormant',
    CHURNED: 'Churned',
  }
  return map[state] || state
}
</script>

<template>
  <div class="state-timeline">
    <!-- LOADING -->
    <div v-if="loading" class="flex items-center justify-center gap-8 py-6">
      <div v-for="i in 4" :key="i" class="flex flex-col items-center gap-2">
        <div class="w-4 h-4 rounded-full bg-gray-200 animate-pulse" />
        <div class="w-16 h-3 rounded bg-gray-100 animate-pulse" />
        <div class="w-12 h-2 rounded bg-gray-50 animate-pulse" />
      </div>
    </div>

    <!-- ERROR -->
    <div v-else-if="error" class="flex flex-col items-center gap-3 py-4">
      <span class="text-sm text-gray-500">{{ typeof error === 'string' ? error : 'Failed to load timeline' }}</span>
      <button
        class="text-xs px-3 py-1 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
        @click="emit('retry')"
      >
        Retry
      </button>
    </div>

    <!-- EMPTY -->
    <div v-else-if="!transitions.length" class="flex items-center justify-center py-6">
      <span class="text-sm text-gray-400">No state transitions recorded</span>
    </div>

    <!-- LOADED -->
    <div v-else class="flex items-start justify-center gap-0 py-4 px-2">
      <template v-for="(t, i) in transitions" :key="i">
        <!-- node -->
        <div
          class="flex flex-col items-center relative"
          @mouseenter="hoveredIndex = i"
          @mouseleave="hoveredIndex = null"
        >
          <div
            class="rounded-full border-2 border-white transition-all duration-200"
            :class="[
              i === transitions.length - 1 ? 'w-5 h-5 shadow-lg ring-2 ring-offset-2' : 'w-4 h-4',
            ]"
            :style="{
              backgroundColor: stateColor(t.to),
              '--tw-ring-color': stateColor(t.to),
              boxShadow: i === transitions.length - 1 ? `0 0 0 4px ${stateColor(t.to)}33` : undefined,
            }"
          />
          <span class="text-[10px] text-gray-500 mt-1.5 whitespace-nowrap">
            {{ t.date?.slice(0, 7) || '' }}
          </span>

          <!-- tooltip -->
          <div
            v-if="hoveredIndex === i"
            class="absolute bottom-full mb-2 z-10 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg"
          >
            <div class="font-semibold">{{ t.date || '' }} — {{ stateLabel(t.to) }}</div>
            <div>{{ t.daysInState }} days — {{ t.triggerReason || 'No reason recorded' }}</div>
          </div>
        </div>

        <!-- connector line -->
        <div
          v-if="i < transitions.length - 1"
          class="h-0.5 mt-[7px] -mx-1 flex-1 min-w-[40px]"
          :class="i === transitions.length - 2 ? 'bg-gray-300' : 'bg-gray-200'"
          :style="i === transitions.length - 2 ? {} : {}"
        />
      </template>
    </div>
  </div>
</template>

<style scoped>
.state-timeline {
  font-family: var(--font-family-main, 'Inter', sans-serif);
}
</style>
