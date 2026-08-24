<script setup>
import { computed } from 'vue'
import { healthTier, tierColor, TIERS } from '@/composables/useSeverityTier'

defineOptions({ name: 'HealthScoreGauge' })

const props = defineProps({
  value: { type: Number, default: 0 }, // 0-100
  label: { type: String, default: 'Health Score' },
  trend: { type: Number, default: null }, // +/- delta
})

const score = computed(() =>
  Math.min(100, Math.max(0, Number(props.value) || 0))
)
const tier = computed(() => healthTier(score.value))
const color = computed(() => tierColor(tier.value))

// semicircle arc geometry — top half, grows left→right
const ARC_LEN = Math.PI * 60 // ≈ 188.5
const dashOffset = computed(() => ARC_LEN * (1 - score.value / 100))

const trendUp = computed(() => Number(props.trend) > 0)
const trendLabel = computed(() =>
  props.trend == null ? '' : `${Number(props.trend) > 0 ? '+' : ''}${props.trend}`
)
</script>

<template>
  <div
    class="bg-surface rounded border border-outline-variant p-4 global-dotted-bg shadow-sm flex flex-col items-center"
  >
    <span
      class="text-xs text-on-surface-variant font-label uppercase tracking-wide font-semibold mb-2"
      >{{ label }}</span
    >
    <svg width="140" height="76" viewBox="0 0 140 76" role="img">
      <!-- unfilled track -->
      <path
        d="M 10 68 A 60 60 0 0 0 130 68"
        fill="none"
        stroke="#e9e7e7"
        stroke-width="10"
        stroke-linecap="round"
      />
      <!-- filled arc -->
      <path
        d="M 10 68 A 60 60 0 0 0 130 68"
        fill="none"
        :stroke="color"
        stroke-width="10"
        stroke-linecap="round"
        :stroke-dasharray="ARC_LEN"
        :stroke-dashoffset="dashOffset"
      />
      <text
        x="70"
        y="58"
        text-anchor="middle"
        :fill="color"
        font-size="22"
        font-weight="bold"
        >{{ Math.round(score) }}</text
      >
    </svg>
    <span
      v-if="trendLabel"
      class="text-xs font-label font-semibold mt-1"
      :style="{ color: trendUp ? TIERS.passion : TIERS.inspire }"
    >
      <span class="material-symbols-outlined text-[14px] align-middle">{{
        trendUp ? 'trending_up' : 'trending_down'
      }}</span>
      {{ trendLabel }}
    </span>
  </div>
</template>
