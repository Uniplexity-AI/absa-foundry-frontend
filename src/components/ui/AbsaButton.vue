<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    v-bind="$attrs"
  >
    <!-- Loading spinner -->
    <svg v-if="loading" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>

    <!-- Left icon slot -->
    <slot v-if="!loading" name="icon-left" />

    <span><slot /></span>

    <!-- Right icon slot -->
    <slot v-if="!loading" name="icon-right" />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  /** absa: Passion bg (primary), power: Power bg, outline: Passion border, ghost: no bg */
  variant: {
    type: String,
    default: 'absa',
    validator: (v) => ['absa', 'power', 'hope', 'outline', 'ghost', 'energy', 'danger'].includes(v)
  },
  /** sm, md, lg */
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  /** Make button full-width */
  block: { type: Boolean, default: false }
})

const sizeClasses = {
  sm: 'px-3 py-1.5 text-xs gap-1.5 rounded-button',
  md: 'px-4 py-2 text-sm gap-2 rounded-button',
  lg: 'px-6 py-3 text-base gap-2.5 rounded-button'
}

const buttonClasses = computed(() => {
  const base = [
    'inline-flex items-center justify-center font-semibold transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--absa-passion,#DC0037)]',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    sizeClasses[props.size],
    props.block ? 'w-full' : ''
  ]

  const variants = {
    absa: [
      'bg-[var(--absa-passion,#DC0037)] text-white',
      'hover:bg-[var(--absa-power,#B50232)] hover:shadow-md',
      'active:bg-[var(--absa-hope,#95052A)]'
    ],
    power: [
      'bg-[var(--absa-power,#B50232)] text-white',
      'hover:bg-[var(--absa-hope,#95052A)] hover:shadow-md',
      'active:bg-[var(--absa-inspire,#77021E)]'
    ],
    hope: [
      'bg-[var(--absa-hope,#95052A)] text-white',
      'hover:bg-[var(--absa-inspire,#77021E)] hover:shadow-md',
      'active:bg-[var(--absa-inspire,#77021E)]'
    ],
    outline: [
      'border-2 border-[var(--absa-passion,#DC0037)] text-[var(--absa-passion,#DC0037)] bg-transparent',
      'hover:bg-[var(--absa-passion,#DC0037)] hover:text-white hover:shadow-md',
      'active:bg-[var(--absa-power,#B50232)] active:border-[var(--absa-power,#B50232)]'
    ],
    ghost: [
      'text-[var(--absa-passion,#DC0037)] bg-transparent',
      'hover:bg-red-50',
      'active:bg-red-100'
    ],
    energy: [
      'bg-[var(--absa-energy,#FF780F)] text-white',
      'hover:brightness-110 hover:shadow-md',
      'active:brightness-95'
    ],
    danger: [
      'bg-red-600 text-white',
      'hover:bg-red-700 hover:shadow-md',
      'active:bg-red-800'
    ]
  }

  return [...base, ...(variants[props.variant] || variants.absa)]
})
</script>
