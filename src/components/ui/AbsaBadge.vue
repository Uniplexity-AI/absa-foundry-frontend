<template>
  <span :class="badgeClasses">
    <span
      v-if="!noDot"
      class="w-1.5 h-1.5 rounded-full shrink-0"
      :class="dotColorClass"
      aria-hidden="true"
    />
    <slot />
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  /** Customer state style: active, at-risk, dormant, churned */
  state: {
    type: String,
    default: 'active',
    validator: (v) => ['active', 'at-risk', 'dormant', 'churned', 'info', 'success', 'warning', 'error', 'completed', 'running', 'failed'].includes(v)
  },
  /** Size variant */
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md'].includes(v)
  },
  /** Hide the coloured dot */
  noDot: { type: Boolean, default: false },
  /** Pill style (rounded-full) vs default (rounded-md) */
  pill: { type: Boolean, default: true }
})

const sizeClasses = {
  sm: 'px-2 py-0.5 text-[10px] gap-1',
  md: 'px-2.5 py-1 text-xs gap-1.5'
}

const dotColorClass = computed(() => {
  const map = {
    active: 'bg-[--absa-passion]',
    'at-risk': 'bg-[--absa-energy]',
    dormant: 'bg-gray-400',
    churned: 'bg-[--absa-passion]',
    info: 'bg-blue-500',
    success: 'bg-[--absa-passion]',
    warning: 'bg-[--absa-energy]',
    error: 'bg-[--absa-passion]',
    completed: 'bg-[--absa-passion]',
    running: 'bg-[--absa-power]',
    failed: 'bg-[--absa-inspire]'
  }
  return map[props.state] || map.active
})

const badgeClasses = computed(() => [
  'inline-flex items-center font-semibold tracking-wide whitespace-nowrap',
  sizeClasses[props.size],
  props.pill ? 'rounded-full' : 'rounded-md',
  stateStyle[props.state] || stateStyle.active
])

const stateStyle = {
  // Customer lifecycle states
  active: 'bg-red-50 text-[--absa-passion]',
  'at-risk': 'bg-orange-50 text-orange-700',
  dormant: 'bg-gray-100 text-gray-600',
  churned: 'bg-red-50 text-[--absa-passion]',
  // Generic
  info: 'bg-blue-50 text-blue-700',
  success: 'bg-red-50 text-[--absa-passion]',
  warning: 'bg-orange-50 text-orange-700',
  error: 'bg-red-50 text-red-700',
  // Ops states (per dashboard mapping: Completed=Passion, Running=Power, Failed=Inspire)
  completed: 'bg-red-50 text-[--absa-passion]',
  running: 'bg-red-50 text-[--absa-power]',
  failed: 'bg-red-50 text-[--absa-inspire]'
}
</script>
