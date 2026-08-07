<template>
  <div
    :class="wrapperClass"
    v-bind="$attrs"
  >
    <!-- Colour accent bar at top -->
    <div
      class="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
      :style="{ backgroundColor: accentColor }"
      aria-hidden="true"
    />

    <div class="relative z-10">
      <!-- Label -->
      <div class="flex items-center justify-between mb-2">
        <span class="text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase">
          {{ label }}
        </span>

        <!-- Trend badge -->
        <span
          v-if="trend !== undefined && trend !== null"
          :class="[
            'text-[10px] font-bold tracking-wider flex items-center gap-1',
            trend >= 0 ? 'text-green-600' : 'text-red-500'
          ]"
        >
          <svg v-if="trend > 0" class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-8 8h16z"/></svg>
          <svg v-else-if="trend < 0" class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 20l-8-8h16z"/></svg>
          {{ Math.abs(trend) }}%
        </span>
      </div>

      <!-- Value -->
      <div v-if="!loading" class="text-2xl font-extrabold text-gray-900 truncate">
        {{ formattedValue }}
      </div>
      <div v-else class="h-8 w-2/3 bg-gray-200 animate-pulse rounded" />

      <!-- Sub-label -->
      <p v-if="subLabel" class="mt-1 text-xs text-gray-400">{{ subLabel }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], default: '' },
  subLabel: { type: String, default: '' },
  trend: { type: Number, default: undefined },
  loading: { type: Boolean, default: false },
  /** ABSA brand accent colour for top bar */
  accentColor: {
    type: String,
    default: 'var(--absa-passion)'
  },
  /** Format: number, currency, percentage, raw */
  format: {
    type: String,
    default: 'number',
    validator: (v) => ['number', 'currency', 'percentage', 'raw'].includes(v)
  }
})

const formattedValue = computed(() => {
  if (props.value === null || props.value === undefined || props.value === '') return '—'
  const num = Number(props.value)

  switch (props.format) {
    case 'currency':
      return isNaN(num) ? props.value : `ZMW ${num.toLocaleString('en-ZM', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    case 'percentage':
      return isNaN(num) ? props.value : `${(num * 100).toFixed(1)}%`
    case 'number':
      return isNaN(num) ? props.value : num.toLocaleString('en-ZM')
    case 'raw':
    default:
      return String(props.value)
  }
})

const wrapperClass = 'relative bg-white border border-[#E8E8EC] rounded-xl p-5 transition-all duration-200 hover:shadow-md'
</script>
