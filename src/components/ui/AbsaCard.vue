<template>
  <div
    :class="cardClasses"
    v-bind="$attrs"
  >
    <!-- Red accent bar at top -->
    <div
      class="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
      :class="accentColorClass"
      aria-hidden="true"
    />

    <!-- Subtle gradient overlay on hover -->
    <div
      v-if="hoverable"
      class="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
      :style="hoverGradient"
      aria-hidden="true"
    />

    <div class="relative z-10">
      <!-- Header slot: title, subtitle, actions -->
      <div v-if="$slots.header" class="mb-4">
        <slot name="header" />
      </div>

      <!-- Default content -->
      <slot />

      <!-- Footer slot -->
      <div v-if="$slots.footer" class="mt-4 pt-4 border-t border-gray-100">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  /** Card padding size */
  padding: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  },
  /** Accent bar colour */
  accent: {
    type: String,
    default: 'passion',
    validator: (v) => ['passion', 'power', 'hope', 'energy', 'none'].includes(v)
  },
  /** Enable hover lift + gradient effect */
  hoverable: { type: Boolean, default: true },
  /** Flat style — no shadow, lighter border */
  flat: { type: Boolean, default: false }
})

const paddingClasses = {
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-8'
}

const accentColorClass = computed(() => {
  const map = {
    passion: 'bg-[var(--absa-passion,#DC0037)]',
    power: 'bg-[var(--absa-power,#B50232)]',
    hope: 'bg-[var(--absa-hope,#95052A)]',
    energy: 'bg-[var(--absa-energy,#FF780F)]',
    none: 'bg-transparent'
  }
  return map[props.accent]
})

const hoverGradient = computed(() => {
  // Extra-subtle brand red gradient — only visible on hover
  return 'background: linear-gradient(135deg, rgba(220,0,55,0.015) 0%, rgba(181,2,50,0.015) 50%, rgba(149,5,42,0.01) 100%)'
})

const cardClasses = computed(() => [
  'relative bg-white border overflow-hidden group transition-all duration-200 rounded-xl',
  paddingClasses[props.padding],
  props.hoverable ? 'hover:shadow-md hover:-translate-y-0.5' : '',
  props.flat ? 'shadow-none border-gray-100' : 'shadow-sm',
  'border-[#E8E8EC]'
])
</script>
