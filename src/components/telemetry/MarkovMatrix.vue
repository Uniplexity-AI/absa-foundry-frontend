<script setup>
import { computed } from 'vue'
import { TIERS } from '@/composables/useSeverityTier'

defineOptions({ name: 'MarkovMatrix' })

const props = defineProps({
  matrix: { type: Array, default: () => [] }, // 4x4 probabilities (0-1)
  states: {
    type: Array,
    default: () => ['Active', 'At Risk', 'Dormant', 'Churned'],
  },
})

const DEFAULT = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
]

const cells = computed(() =>
  Array.isArray(props.matrix) && props.matrix.length === 4 ? props.matrix : DEFAULT
)

// magnitude ramp: higher transition probability → darker red
function cellColor(p) {
  const v = Number(p) || 0
  if (v >= 0.75) return TIERS.inspire
  if (v >= 0.5) return TIERS.hope
  if (v >= 0.25) return TIERS.power
  if (v > 0) return TIERS.passion
  return '#f3f1f1'
}

function cellText(p) {
  const v = Number(p) || 0
  return v > 0 ? '#ffffff' : '#9a9797'
}

function fmt(p) {
  const v = Number(p) || 0
  return v > 0 ? (v * 100).toFixed(0) + '%' : '—'
}
</script>

<template>
  <div
    class="bg-surface rounded border border-outline-variant p-4 global-dotted-bg shadow-sm"
  >
    <div class="overflow-x-auto">
      <table class="w-full text-center border-collapse">
        <thead>
          <tr class="text-xs text-on-surface-variant font-label uppercase tracking-wide">
            <th class="p-2 font-semibold text-left">From \ To</th>
            <th v-for="(s, j) in states" :key="j" class="p-2 font-semibold">{{ s }}</th>
          </tr>
        </thead>
        <tbody class="text-sm">
          <tr v-for="(row, i) in cells" :key="i">
            <td class="p-2 text-xs font-label font-semibold text-on-surface-variant text-left">
              {{ states[i] }}
            </td>
            <td
              v-for="(cell, j) in row"
              :key="j"
              class="p-2 font-semibold"
              :style="{ backgroundColor: cellColor(cell), color: cellText(cell) }"
            >
              {{ fmt(cell) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
