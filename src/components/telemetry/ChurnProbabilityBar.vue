<script setup>
import { computed } from 'vue'
import { churnTier, tierColor } from '@/composables/useSeverityTier'

defineOptions({ name: 'ChurnProbabilityBar' })

const props = defineProps({
  value: { type: Number, default: 0 }, // 0-1 decimal
  label: { type: String, default: 'Churn Probability' },
  showValue: { type: Boolean, default: true },
})

const pct = computed(() =>
  Math.min(100, Math.max(0, (Number(props.value) || 0) * 100))
)
const tier = computed(() => churnTier(props.value))
const color = computed(() => tierColor(tier.value))
const displayValue = computed(() => `${pct.value.toFixed(1)}%`)
</script>

<template>
  <div
    class="bg-surface rounded border border-outline-variant p-4 global-dotted-bg shadow-sm"
  >
    <div class="flex items-center justify-between mb-2">
      <span
        class="text-xs text-on-surface-variant font-label uppercase tracking-wide font-semibold"
        >{{ label }}</span
      >
      <span
        v-if="showValue"
        class="text-sm font-headline font-bold text-on-surface"
        >{{ displayValue }}</span
      >
    </div>
    <div class="w-full h-2 rounded bg-surface-variant overflow-hidden">
      <div
        class="h-full rounded transition-all duration-300"
        :style="{ width: pct + '%', backgroundColor: color }"
      ></div>
    </div>
  </div>
</template>
