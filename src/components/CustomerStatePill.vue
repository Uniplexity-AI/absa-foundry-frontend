<script setup>
/**
 * Shared lifecycle-state pill used by the My Customers pages.
 * Colour ramp comes from the centralised severity-tier mapping
 * (see `useSeverityTier.js`) — no hard-coded brand hexes here.
 */
import { computed } from 'vue'
import { stateTier, tierColor } from '@/composables/useSeverityTier'

defineOptions({ name: 'CustomerStatePill' })

const props = defineProps({
  state: { type: String, default: '' },
  size: { type: String, default: 'md' }, // 'sm' | 'md' | 'lg'
})

const label = computed(() => String(props.state || 'UNKNOWN').replace(/_/g, ' '))

const color = computed(() => tierColor(stateTier(props.state)))

const sizeClass = computed(() => ({
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-2.5 py-0.5 text-[11px]',
  lg: 'px-3 py-1 text-xs',
}[props.size] || 'px-2.5 py-0.5 text-[11px]'))
</script>

<template>
  <span
    class="inline-flex items-center rounded-sm font-bold uppercase tracking-wide text-white"
    :class="sizeClass"
    :style="{ backgroundColor: color }"
  >{{ label }}</span>
</template>
