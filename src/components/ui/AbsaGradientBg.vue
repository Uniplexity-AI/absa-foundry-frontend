<template>
  <div class="relative" :class="containerClass">
    <!-- Gradient background layer -->
    <div
      class="absolute inset-0"
      :style="gradientStyle"
      aria-hidden="true"
    />

    <!-- Optional gesture pattern overlay -->
    <div
      v-if="showPattern"
      class="absolute inset-0 opacity-10"
      :style="patternStyle"
      aria-hidden="true"
    />

    <!-- Content -->
    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  /** Gradient variant from brand guide */
  variant: {
    type: String,
    default: 'passion-to-power',
    validator: (v) => [
      'passion-to-power',
      'passion-to-uplift',
      'passion-to-inspire',
      'passion-to-enrich',
      'energy-to-passion-to-hope',
      'uplift-to-passion-to-inspire',
      'passion-to-inspire-to-enrich'
    ].includes(v)
  },
  /** Show subtle gesture/dot pattern overlay */
  showPattern: { type: Boolean, default: false },
  /** Additional padding — none (raw), md, lg */
  padding: {
    type: String,
    default: 'none',
    validator: (v) => ['none', 'md', 'lg'].includes(v)
  },
  /** Rounding: none, md, lg, xl */
  rounded: {
    type: String,
    default: 'lg',
    validator: (v) => ['none', 'md', 'lg', 'xl'].includes(v)
  }
})

const gradientDefinitions = {
  'passion-to-power': {
    colors: ['#DC0037', '#B50232'],
    feel: 'balanced mid-point'
  },
  'passion-to-uplift': {
    colors: ['#DC0037', '#F93F24'],
    feel: 'youthful, energetic, dynamic'
  },
  'passion-to-inspire': {
    colors: ['#DC0037', '#77021E'],
    feel: 'elegant, premium, sophisticated'
  },
  'passion-to-enrich': {
    colors: ['#DC0037', '#131010'],
    feel: 'deep, sophisticated'
  },
  'energy-to-passion-to-hope': {
    colors: ['#FF780F', '#DC0037', '#95052A'],
    feel: 'youthful tricolour'
  },
  'uplift-to-passion-to-inspire': {
    colors: ['#F93F24', '#DC0037', '#77021E'],
    feel: 'balanced tricolour'
  },
  'passion-to-inspire-to-enrich': {
    colors: ['#DC0037', '#77021E', '#131010'],
    feel: 'sophisticated tricolour'
  }
}

const gradientStyle = computed(() => {
  const def = gradientDefinitions[props.variant]
  const stops = def.colors.map((c, i) => `${c} ${(i / (def.colors.length - 1)) * 100}%`).join(', ')
  // 45° from bottom-left to top-right per brand guide
  return `background: linear-gradient(45deg, ${stops})`
})

const patternStyle = computed(() => ({
  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
  backgroundSize: '16px 16px'
}))

const paddingClasses = {
  none: '',
  md: 'p-6',
  lg: 'p-10'
}

const roundedClasses = {
  none: '',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl'
}

const containerClass = computed(() => [
  paddingClasses[props.padding],
  roundedClasses[props.rounded]
])
</script>
