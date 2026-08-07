<script setup>
import { computed } from 'vue'

const props = defineProps({
  state: {
    type: String,
    required: true,
    validator: (v) => ['ACTIVE', 'AT_RISK', 'DORMANT', 'CHURNED'].includes(v),
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v),
  },
})

const config = computed(() => {
  const map = {
    ACTIVE: { label: 'Active', bg: '#F0FDF4', text: 'var(--absa-success, #16A34A)', dot: 'var(--absa-success, #16A34A)' },
    AT_RISK: { label: 'At Risk', bg: '#FFFBEB', text: 'var(--absa-warning, #F59E0B)', dot: 'var(--absa-warning, #F59E0B)' },
    DORMANT: { label: 'Dormant', bg: '#F9FAFB', text: 'var(--absa-neutral, #6B7280)', dot: 'var(--absa-neutral, #6B7280)' },
    CHURNED: { label: 'Churned', bg: '#FEF2F2', text: 'var(--absa-critical, #DC2626)', dot: 'var(--absa-critical, #DC2626)' },
  }
  return map[props.state] || map.ACTIVE
})

const sizeClasses = computed(() => {
  const map = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-3 py-1 text-sm gap-1.5',
    lg: 'px-4 py-1.5 text-base gap-2',
  }
  return map[props.size] || map.md
})

const dotSize = computed(() => {
  const map = { sm: 'w-1.5 h-1.5', md: 'w-2 h-2', lg: 'w-2.5 h-2.5' }
  return map[props.size] || map.md
})
</script>

<template>
  <span
    class="inline-flex items-center rounded-full font-medium"
    :class="sizeClasses"
    :style="{ backgroundColor: config.bg, color: config.text }"
  >
    <span
      class="rounded-full flex-shrink-0"
      :class="dotSize"
      :style="{ backgroundColor: config.dot }"
    ></span>
    {{ config.label }}
  </span>
</template>
