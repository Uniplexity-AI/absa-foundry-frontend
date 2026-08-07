<template>
  <div :class="wrapperClass">
    <!-- Red vertical accent bar -->
    <div
      class="shrink-0 rounded-full"
      :class="[barHeightClass, barColorClass]"
      :style="{ width: barWidth }"
      aria-hidden="true"
    />

    <div class="min-w-0 flex-1">
      <!-- Top label row -->
      <div v-if="overline || $slots.overline" class="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase truncate mb-1">
        <slot name="overline">
          {{ overline }}
        </slot>
      </div>

      <!-- Title -->
      <component :is="titleTag" :class="titleClass">
        <slot name="title">{{ title }}</slot>
      </component>

      <!-- Subtitle / description -->
      <p v-if="subtitle || $slots.subtitle" class="mt-1 text-sm text-gray-500">
        <slot name="subtitle">{{ subtitle }}</slot>
      </p>
    </div>

    <!-- Right actions -->
    <div v-if="$slots.actions" class="flex items-center gap-2 shrink-0">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  overline: { type: String, default: '' },
  /** Size variant */
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  },
  /** Bar colour */
  color: {
    type: String,
    default: 'passion',
    validator: (v) => ['passion', 'power', 'energy', 'hope'].includes(v)
  }
})

const titleTag = computed(() => props.size === 'sm' ? 'h3' : props.size === 'lg' ? 'h1' : 'h2')

const barWidth = computed(() => props.size === 'sm' ? '3px' : '4px')

const barHeightClass = computed(() => ({
  sm: 'h-5',
  md: 'h-7',
  lg: 'h-9'
})[props.size])

const barColorClass = computed(() => ({
  passion: 'bg-[var(--absa-passion,#DC0037)]',
  power: 'bg-[var(--absa-power,#B50232)]',
  energy: 'bg-[var(--absa-energy,#FF780F)]',
  hope: 'bg-[var(--absa-hope,#95052A)]'
})[props.color])

const titleClass = computed(() => ({
  sm: 'text-base font-bold text-gray-900',
  md: 'text-lg font-extrabold text-gray-900 leading-tight',
  lg: 'text-2xl font-extrabold text-gray-900 leading-tight'
})[props.size])

const wrapperClass = 'flex items-start gap-3'
</script>
