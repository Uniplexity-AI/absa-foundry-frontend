<script setup>
import { computed } from 'vue'

const props = defineProps({
  score: { type: Number, default: null },
  trend: { type: String, default: 'stable' },
  previousScore: { type: Number, default: null },
  loading: { type: Boolean, default: false },
  error: { type: [String, Boolean], default: false },
})

const emit = defineEmits(['retry'])

const scoreInt = computed(() =>
  props.score != null ? Math.round(props.score) : null,
)

const color = computed(() => {
  if (props.score == null) return '#9CA3AF'
  if (props.score >= 70) return 'var(--absa-success, #16A34A)'
  if (props.score >= 40) return 'var(--absa-warning, #F59E0B)'
  return 'var(--absa-critical, #DC2626)'
})

// SVG gauge constants
const radius = 70
const circumference = 2 * Math.PI * radius
const arcLength = computed(() => {
  if (props.score == null) return 0
  return (props.score / 100) * circumference * 0.75 // 270° arc
})
const rotation = 135 // start angle offset

const trendIcon = computed(() => {
  if (props.trend === 'up') return '▲'
  if (props.trend === 'down') return '▼'
  return '◆'
})

const trendColor = computed(() => {
  if (props.trend === 'up') return 'var(--absa-success, #16A34A)'
  if (props.trend === 'down') return 'var(--absa-critical, #DC2626)'
  return 'var(--absa-neutral, #6B7280)'
})

const trendLabel = computed(() => {
  if (props.previousScore == null || props.score == null) return ''
  const diff = props.score - props.previousScore
  if (diff === 0) return 'No change'
  return `${diff > 0 ? '+' : ''}${Math.round(diff)} pts vs last period`
})
</script>

<template>
  <div class="health-gauge flex flex-col items-center">
    <!-- LOADING -->
    <div v-if="loading" class="flex flex-col items-center gap-3">
      <svg width="180" height="110" viewBox="0 0 180 110">
        <circle
          cx="90" cy="90" :r="radius"
          fill="none" stroke="#E5E7EB" stroke-width="10"
          stroke-dasharray="330 400"
          stroke-dashoffset="0"
          class="animate-pulse"
        />
      </svg>
      <span class="text-sm text-gray-400">Loading...</span>
    </div>

    <!-- ERROR -->
    <div v-else-if="error" class="flex flex-col items-center gap-3">
      <svg width="180" height="110" viewBox="0 0 180 110">
        <circle cx="90" cy="90" :r="radius" fill="none" stroke="#E5E7EB" stroke-width="10" stroke-dasharray="330 400" />
        <text x="90" y="85" text-anchor="middle" fill="#DC2626" font-size="28">⚠</text>
      </svg>
      <span class="text-sm text-gray-500">{{ typeof error === 'string' ? error : 'Failed to load' }}</span>
      <button
        class="text-xs px-3 py-1 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
        @click="emit('retry')"
      >
        Retry
      </button>
    </div>

    <!-- EMPTY / NULL -->
    <div v-else-if="score == null" class="flex flex-col items-center gap-3">
      <svg width="180" height="110" viewBox="0 0 180 110">
        <circle cx="90" cy="90" :r="radius" fill="none" stroke="#E5E7EB" stroke-width="10" stroke-dasharray="330 400" />
      </svg>
      <span class="text-sm text-gray-400">No data</span>
    </div>

    <!-- LOADED -->
    <div v-else class="flex flex-col items-center gap-2">
      <svg width="180" height="110" viewBox="0 0 180 110">
        <!-- background ring -->
        <circle
          cx="90" cy="90" :r="radius"
          fill="none" stroke="#E5E7EB" stroke-width="10"
          stroke-dasharray="330 400"
          pathLength="100"
        />
        <!-- colored arc (270°) -->
        <circle
          cx="90" cy="90" :r="radius"
          fill="none" :stroke="color" stroke-width="10"
          stroke-linecap="round"
          :stroke-dasharray="`${score} 100`"
          stroke-dashoffset="25"
          pathLength="100"
          transform="rotate(135 90 90)"
          style="transition: stroke-dasharray 0.6s ease, stroke 0.6s ease"
        />
        <!-- center score -->
        <text x="90" y="82" text-anchor="middle" :fill="color" font-size="32" font-weight="700" font-family="var(--font-family-main, sans-serif)">
          {{ scoreInt }}
        </text>
        <text x="90" y="102" text-anchor="middle" fill="#9CA3AF" font-size="11" font-family="var(--font-family-main, sans-serif)">
          / 100
        </text>
      </svg>
      <!-- trend -->
      <div class="flex items-center gap-1 text-xs" :style="{ color: trendColor }">
        <span>{{ trendIcon }}</span>
        <span>{{ trendLabel }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.health-gauge {
  font-family: var(--font-family-main, 'Inter', sans-serif);
}
</style>
