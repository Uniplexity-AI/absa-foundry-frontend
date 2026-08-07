<script setup>
import { computed } from 'vue'

const props = defineProps({
  matrix: { type: Array, default: null },
  states: {
    type: Array,
    default: () => ['ACTIVE', 'AT_RISK', 'DORMANT', 'CHURNED'],
  },
  loading: { type: Boolean, default: false },
  error: { type: [String, Boolean], default: false },
})

const emit = defineEmits(['retry'])

const maroonRgb = '190, 15, 44' // --absa-maroon #BE0F2C

function cellBg(value) {
  return `rgba(${maroonRgb}, ${value})`
}

function cellText(value) {
  return value > 0.6 ? '#fff' : '#111827'
}

function isAbsorbing(row) {
  return row.every((v) => v === 0)
}
</script>

<template>
  <div class="markov-matrix">
    <!-- LOADING -->
    <div v-if="loading" class="grid gap-1" :style="{ gridTemplateColumns: `auto repeat(${states.length}, 1fr)` }">
      <div /> <!-- empty corner -->
      <div v-for="s in states" :key="s" class="h-6 rounded bg-gray-100 animate-pulse" />
      <template v-for="r in states" :key="r">
        <div class="h-6 w-20 rounded bg-gray-100 animate-pulse" />
        <div v-for="c in states" :key="c" class="h-10 rounded bg-gray-50 animate-pulse" />
      </template>
    </div>

    <!-- ERROR -->
    <div v-else-if="error" class="flex flex-col items-center gap-3 py-6">
      <span class="text-sm text-gray-500">{{ typeof error === 'string' ? error : 'Failed to load matrix' }}</span>
      <button
        class="text-xs px-3 py-1 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
        @click="emit('retry')"
      >
        Retry
      </button>
    </div>

    <!-- EMPTY -->
    <div v-else-if="!matrix" class="flex items-center justify-center py-6">
      <span class="text-sm text-gray-400">No transition data available</span>
    </div>

    <!-- LOADED -->
    <div v-else class="overflow-x-auto">
      <table class="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th class="p-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">FROM ↓ TO →</th>
            <th
              v-for="s in states"
              :key="s"
              class="p-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              {{ s.replace('_', ' ') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, ri) in matrix" :key="ri" :class="{ 'opacity-50': isAbsorbing(row) }">
            <td class="p-2 text-xs font-semibold text-gray-600 uppercase whitespace-nowrap">
              {{ states[ri]?.replace('_', ' ') }}
              <span v-if="isAbsorbing(row)" class="text-[10px] text-gray-400 ml-1">(absorbing)</span>
            </td>
            <td
              v-for="(cell, ci) in row"
              :key="ci"
              class="p-2 text-center font-mono text-sm font-medium rounded-md transition-colors"
              :style="{
                backgroundColor: cellBg(cell),
                color: cellText(cell),
              }"
            >
              {{ cell.toFixed(2) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.markov-matrix {
  font-family: var(--font-family-main, 'Inter', sans-serif);
}
</style>
