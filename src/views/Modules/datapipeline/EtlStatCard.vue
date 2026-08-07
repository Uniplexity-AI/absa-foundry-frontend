<template>
  <div class="absa-etl-bottom-card">
    <div class="absa-etl-bottom-card__label">{{ label }}</div>
    <div class="absa-etl-bottom-card__value">{{ value }}</div>

    <!-- Trend row (always rendered for consistent spacing, except plain variant) -->
    <div v-if="variant !== 'plain'" class="absa-etl-bottom-card__trend">
      <template v-if="trend !== undefined">
        <svg v-if="trend >= 0" width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 0l5 6H0z" fill="var(--absa-passion, #DC0037)"/></svg>
        <svg v-else width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M0 0l5 6 5-6H0z" fill="var(--absa-inspire, #77021E)"/></svg>
        <span :class="trendLabelClass">{{ trendLabel }}</span>
      </template>
      <span v-else class="absa-etl-bottom-card__trend-placeholder">&nbsp;</span>
    </div>

    <!-- Variant content area — fixed 40px height for consistent alignment -->
    <div v-if="variant !== 'plain'" class="absa-etl-bottom-card__variant">
      <div v-if="variant === 'progress'" class="absa-etl-bottom-card__progress">
        <div class="absa-etl-bottom-card__progress-fill" :style="{ width: progressPct + '%' }"></div>
      </div>

      <div v-if="variant === 'chart'" class="absa-etl-bottom-card__chart">
        <div class="absa-etl-bottom-card__chart-bar" v-for="(h, i) in chartBars" :key="i" :style="{ height: h + '%', opacity: 0.2 + i * 0.15 }"></div>
      </div>

      <div v-if="variant === 'badges'" class="absa-etl-bottom-card__variant-inner">
        <slot name="badges" />
      </div>

      <div v-if="variant === 'bar'" class="absa-etl-bottom-card__bar">
        <div class="absa-etl-bottom-card__bar-fill" :style="{ width: progressPct + '%' }"></div>
      </div>
    </div>

    <div class="absa-etl-bottom-card__sub">{{ subLabel }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  value: { type: String, required: true },
  subLabel: { type: String, default: '' },
  trend: { type: Number, default: undefined },
  trendLabel: { type: String, default: '' },
  /** Variant: progress (bar), chart (mini bars), bar (latency), badges (avatar) */
  variant: {
    type: String,
    default: 'progress',
    validator: (v) => ['progress', 'chart', 'bar', 'badges', 'plain'].includes(v)
  },
  progressPct: { type: Number, default: 0 },
  chartBars: { type: Array, default: () => [] }
})

const trendLabelClass = computed(() => {
  if (props.trend === undefined) return ''
  if (props.trendLabel === 'High') return 'absa-etl-bottom-card__trend-warn'
  return props.trend >= 0 ? 'absa-etl-bottom-card__trend-up' : 'absa-etl-bottom-card__trend-down'
})
</script>

<style scoped>
.absa-etl-bottom-card {
  background: #fff;
  border: 1px solid #E8E8EC;
  border-top: 3px solid var(--absa-passion, #DC0037);
  border-radius: 4px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.absa-etl-bottom-card__label {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #6B7280;
  letter-spacing: 0.6px;
  line-height: 16px;
}

.absa-etl-bottom-card__value {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: var(--absa-enrich, #131010);
  line-height: 32px;
}

.absa-etl-bottom-card__trend {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 4px;
  min-height: 16px; /* consistent even when empty */
}

.absa-etl-bottom-card__trend-placeholder {
  display: block;
  height: 16px;
}

.absa-etl-bottom-card__trend span {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
}

/* ═══ Variant content area — fixed height for cross-card alignment ═══ */
.absa-etl-bottom-card__variant {
  min-height: 40px;
  display: flex;
  align-items: center;
  margin: 4px 0;
}

.absa-etl-bottom-card__variant-inner {
  display: flex;
  align-items: center;
}

.absa-etl-bottom-card__trend-up   { color: var(--absa-passion, #DC0037); }
.absa-etl-bottom-card__trend-down { color: var(--absa-inspire, #77021E); }
.absa-etl-bottom-card__trend-warn { color: var(--absa-energy, #FF780F); }

.absa-etl-bottom-card__progress {
  width: 100%;
  height: 4px;
  background: #E8E8EC;
  border-radius: 2px;
  overflow: hidden;
}

.absa-etl-bottom-card__progress-fill {
  height: 100%;
  background: var(--absa-passion, #DC0037);
  border-radius: 2px;
}

.absa-etl-bottom-card__sub {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 10px;
  font-weight: 400;
  color: #6B7280;
  line-height: 15px;
}

.absa-etl-bottom-card__chart {
  display: flex;
  align-items: flex-end;
  gap: 4px;
  width: 100%;
  height: 100%;
}

.absa-etl-bottom-card__chart-bar {
  flex: 1;
  background: var(--absa-passion, #DC0037);
  border-radius: 1px;
  min-height: 4px;
}

.absa-etl-bottom-card__bar {
  width: 100%;
  height: 32px;
  background: rgba(255, 120, 15, 0.08);
  border-radius: 2px;
  overflow: hidden;
  position: relative;
}

.absa-etl-bottom-card__bar-fill {
  height: 100%;
  background: rgba(255, 120, 15, 0.25);
  border-right: 2px solid var(--absa-energy, #FF780F);
  border-radius: 2px;
}
</style>
