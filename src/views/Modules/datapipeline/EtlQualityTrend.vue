<template>
  <div class="eq">
    <div class="eq__head">
      <h3 class="eq__title">Quality Score Trend</h3>
      <div class="eq__toggles">
        <span class="eq__tog eq__tog--on">24 HOURS</span>
        <span class="eq__tog">7 DAYS</span>
      </div>
    </div>

    <!-- KPI bar — moved above chart -->
    <div class="eq__kpis">
      <div class="eq__kpi">
        <span class="eq__kpi-label">Current Score</span>
        <span class="eq__kpi-val">{{ currentScore }}</span>
        <span class="eq__trend" :class="trendClass">{{ trendText }}</span>
      </div>
      <div class="eq__kpi">
        <span class="eq__kpi-label">SLA Target</span>
        <span class="eq__kpi-val eq__kpi-val--muted">{{ sla }}%</span>
      </div>
      <div class="eq__kpi">
        <span class="eq__kpi-label">Status</span>
        <span class="eq__badge" :class="badgeClass">{{ statusLabel }}</span>
      </div>
      <span class="eq__scan">{{ lastScan }}</span>
    </div>

    <!-- Chart -->
    <div class="eq__chart">
      <svg :viewBox="`0 0 ${svgW} ${svgH}`" class="eq__svg" preserveAspectRatio="xMidYMid meet">
        <g v-for="(tick, i) in yTicks" :key="'y'+i">
          <line :x1="ml" :y1="y(tick)" :x2="svgW - mr" :y2="y(tick)" stroke="#E8E8EC" stroke-width="1"/>
          <text :x="ml - 6" :y="y(tick) + 4" text-anchor="end" class="s-y">{{ tick }}</text>
        </g>
        <text x="14" :y="svgH / 2" text-anchor="middle" class="s-yt" transform="rotate(-90, 14, 130)">Quality (%)</text>

        <!-- SLA — left edge label to avoid "Now" collision -->
        <line :x1="ml" :y1="y(sla)" :x2="svgW - mr + 16" :y2="y(sla)" stroke="var(--absa-enrich, #131010)" stroke-width="1" stroke-dasharray="5,4" opacity="0.4"/>
        <text :x="ml + 4" :y="y(sla) - 5" class="s-sl">{{ sla }}% SLA</text>

        <polygon :points="areaPoints" fill="rgba(220,0,55,0.05)"/>
        <polyline :points="linePoints" fill="none" stroke="var(--absa-passion, #DC0037)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>

        <g v-for="(pt, i) in points" :key="'pt'+i">
          <circle :cx="x(i)" :cy="y(pt.value)" :r="i === points.length - 1 ? 6 : 4"
            :fill="pt.failed ? 'var(--absa-inspire, #77021E)' : 'var(--absa-passion, #DC0037)'"
            stroke="#fff" stroke-width="2" class="s-mk"
            @mouseenter="hover = i" @mouseleave="hover = -1"/>
          <text v-if="i === points.length - 1" :x="x(i) + 10" :y="y(pt.value) - 10" class="s-now">Now</text>
          <g v-if="hover === i">
            <rect :x="ttX(i)" :y="ttY(i) - 50" width="155" :height="pt.failed ? 65 : 48" rx="4" fill="var(--absa-enrich, #131010)"/>
            <text :x="ttX(i) + 8" :y="ttY(i) - 33" class="s-tt1">{{ pt.label }} &mdash; {{ pt.value.toFixed(1) }}%</text>
            <text :x="ttX(i) + 8" :y="ttY(i) - 17" class="s-tt2">Rows {{ pt.rows }} &middot; Rej {{ pt.rejected }}</text>
            <text v-if="pt.failed" :x="ttX(i) + 8" :y="ttY(i) - 3" class="s-tt3">RUN FAILED</text>
          </g>
        </g>

        <g v-for="(pt, i) in xLabels" :key="'x'+i">
          <text :x="x(pt.index)" :y="svgH - 6" text-anchor="middle" class="s-xl">{{ pt.label }}</text>
        </g>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  points: { type: Array, default: () => [] },
  sla: { type: Number, default: 99.5 },
  lastScan: { type: String, default: 'Last scan: 2 mins ago' }
})

const hover = ref(-1)

// Dynamic y-axis — auto-pads above max value + below min
const dataMax = computed(() => props.points.length ? Math.max(...props.points.map(p => p.value)) : 100)
const dataMin = computed(() => props.points.length ? Math.min(...props.points.map(p => p.value)) : 94)
const yMin = computed(() => Math.floor(dataMin.value - 1))
const yMax = computed(() => Math.ceil(Math.max(dataMax.value + 0.8, props.sla + 0.3)))

// SVG — mr=32 prevents "Now" marker clipping
const svgW = 800, svgH = 240
const ml = 30, mr = 32, mt = 10, mb = 24
const pw = computed(() => svgW - ml - mr)
const ph = computed(() => svgH - mt - mb)
const yr = computed(() => yMax.value - yMin.value)

function x(i) {
  if (props.points.length <= 1) return ml + pw.value / 2
  return ml + (i / (props.points.length - 1)) * pw.value
}
function y(v) { return mt + ph.value - ((v - yMin.value) / yr.value) * ph.value }

const yTicks = computed(() => {
  const t = []; const step = yr.value <= 6 ? 1 : 2
  for (let v = yMin.value; v <= yMax.value; v += step) t.push(v)
  return t
})

const xLabels = computed(() => {
  const len = props.points.length
  if (len <= 10) return props.points.map((p, i) => ({ label: p.label, index: i }))
  const s = Math.ceil(len / 8)
  return props.points.filter((_, i) => i % s === 0 || i === len - 1).map(p => ({ label: p.label, index: props.points.indexOf(p) }))
})

const linePoints = computed(() => props.points.map((pt, i) => `${x(i)},${y(pt.value)}`).join(' '))
const areaPoints = computed(() => {
  if (!props.points.length) return ''
  const b = y(yMin.value)
  const pts = props.points.map((pt, i) => `${x(i)},${y(pt.value)}`).join(' ')
  return `${x(0)},${b} ${pts} ${x(props.points.length - 1)},${b}`
})

function ttX(i) { return x(i) + 80 > svgW - mr ? x(i) - 155 : x(i) + 10 }
function ttY(i) { return y(props.points[i].value) }

const lastPt = computed(() => props.points.length ? props.points[props.points.length - 1] : null)
const currentScore = computed(() => lastPt.value ? `${lastPt.value.value.toFixed(1)}%` : '—')
const aboveSla = computed(() => lastPt.value ? lastPt.value.value >= props.sla : true)
const statusLabel = computed(() => aboveSla.value ? 'Above SLA' : 'Below SLA')
const badgeClass = computed(() => aboveSla.value ? 'eq__badge--ok' : 'eq__badge--warn')

const firstPt = computed(() => props.points.length > 1 ? props.points[0] : null)
const delta = computed(() => {
  if (!lastPt.value || !firstPt.value || props.points.length < 2) return 0
  return lastPt.value.value - firstPt.value.value
})
const trendText = computed(() => {
  const d = delta.value
  if (Math.abs(d) < 0.05) return 'Stable'
  return d > 0 ? `\u2191 ${d.toFixed(1)}pp` : `\u2193 ${Math.abs(d).toFixed(1)}pp`
})
const trendClass = computed(() => {
  if (Math.abs(delta.value) < 0.05) return ''
  return delta.value > 0 ? 'eq__trend--up' : 'eq__trend--down'
})
</script>

<style scoped>
/* ═══ Brand colour map (dashboard spec Section 9) ═══ */
.eq {
  background: #fff; border: 1px solid #E8E8EC; border-radius: 4px;
  padding: 14px 14px 12px;
  display: flex; flex-direction: column; gap: 0;
  min-height: 340px;
}

.eq__head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; flex-shrink: 0; }

.eq__title {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 18px; font-weight: 600; color: var(--absa-enrich, #131010);
  line-height: 24px; margin: 0;
}

.eq__toggles { display: flex; align-items: center; gap: 0; }
.eq__tog {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 10px; font-weight: 700; color: #6B7280;
  padding: 3px 8px; border-radius: 2px; cursor: pointer; line-height: 15px;
}
.eq__tog--on { background: rgba(220,0,55,0.08); color: var(--absa-passion, #DC0037); }

/* KPI bar */
.eq__kpis {
  display: flex; align-items: center; gap: 32px;
  padding-bottom: 10px; margin-bottom: 6px;
  border-bottom: 1px solid #E8E8EC; flex-shrink: 0;
}
.eq__kpi { display: flex; align-items: baseline; gap: 8px; }
.eq__kpi-label {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 10px; font-weight: 700; color: #9CA3AF;
  letter-spacing: 0.06em; text-transform: uppercase;
}
.eq__kpi-val {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 20px; font-weight: 700; color: var(--absa-enrich, #131010); line-height: 26px;
}
.eq__kpi-val--muted { color: #6B7280; }

.eq__trend { font-family: 'Public Sans', system-ui, sans-serif; font-size: 12px; font-weight: 700; }
.eq__trend--up   { color: var(--absa-passion, #DC0037); }
.eq__trend--down { color: var(--absa-inspire, #77021E); }

.eq__badge {
  display: inline-flex; align-items: center;
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 10px; font-weight: 700; letter-spacing: 0.04em;
  padding: 3px 10px; border-radius: 4px; line-height: 16px;
}
.eq__badge--ok   { background: rgba(220,0,55,0.08); color: var(--absa-passion, #DC0037); }
.eq__badge--warn { background: rgba(119,2,30,0.08);  color: var(--absa-inspire, #77021E); }

.eq__scan { margin-left: auto; font-family: 'Public Sans', system-ui, sans-serif; font-size: 10px; color: #9CA3AF; }

/* Chart */
.eq__chart { flex: 1; display: flex; align-items: stretch; min-height: 180px; }
.eq__svg { width: 100%; height: 100%; display: block; }

.s-y  { font-family: 'Public Sans', system-ui, sans-serif; font-size: 10px; fill: #9CA3AF; }
.s-yt { font-family: 'Public Sans', system-ui, sans-serif; font-size: 10px; fill: #9CA3AF; font-weight: 600; }
.s-xl { font-family: 'Public Sans', system-ui, sans-serif; font-size: 9px; fill: #9CA3AF; }
.s-sl { font-family: 'Public Sans', system-ui, sans-serif; font-size: 10px; fill: var(--absa-enrich, #131010); opacity: 0.55; }
.s-now { font-family: 'Public Sans', system-ui, sans-serif; font-size: 9px; font-weight: 700; fill: var(--absa-passion, #DC0037); }

.s-mk { cursor: pointer; transition: r 0.15s ease; }
.s-mk:hover { r: 6; }

.s-tt1 { font-family: 'Public Sans', system-ui, sans-serif; font-size: 10px; font-weight: 700; fill: #fff; }
.s-tt2 { font-family: 'Public Sans', system-ui, sans-serif; font-size: 9px; fill: #fff; opacity: 0.7; }
.s-tt3 { font-family: 'Public Sans', system-ui, sans-serif; font-size: 9px; font-weight: 700; fill: var(--absa-inspire, #77021E); }
</style>
