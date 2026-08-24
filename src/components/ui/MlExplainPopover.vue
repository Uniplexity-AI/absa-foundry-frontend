<template>
  <!-- Inline trigger + floating popover container -->
  <span class="relative inline-flex items-center gap-1" ref="containerRef">

    <!-- Trigger: score value slot + info icon -->
    <slot />
    <button
      @click.stop="toggle"
      class="inline-flex items-center justify-center w-4 h-4 rounded-full text-gray-400 hover:text-absa-passion hover:bg-gray-100 transition-colors focus:outline-none"
      :aria-label="`Explain score for ${label}`"
      title="Explain score"
    >
      <span class="material-symbols-outlined" style="font-size:13px;line-height:1">info</span>
    </button>

    <!-- Popover panel -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 scale-95 translate-y-1"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 translate-y-1"
    >
      <div
        v-if="open"
        class="absolute z-50 bg-white border border-gray-300 rounded-sm shadow-lg w-72"
        :class="alignRight ? 'right-0 top-6' : 'left-0 top-6'"
      >
        <!-- Header -->
        <div class="px-3 py-2 border-b border-gray-200 flex items-center justify-between">
          <div>
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider">ML Score Explanation</p>
            <p v-if="label" class="text-[11px] text-absa-enrich font-semibold mt-0.5 truncate max-w-[200px]">{{ label }}</p>
          </div>
          <button
            @click="open = false"
            class="text-gray-400 hover:text-gray-700 focus:outline-none ml-2"
          >
            <span class="material-symbols-outlined" style="font-size:14px">close</span>
          </button>
        </div>

        <!-- Score + Confidence -->
        <div class="px-3 py-2 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
          <div>
            <p class="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">{{ scoreLabel }}</p>
            <p class="text-lg font-bold font-mono" :class="scoreClass">{{ displayScore }}</p>
          </div>
          <div v-if="confidenceLow !== null && confidenceHigh !== null" class="text-right">
            <p class="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">80% CI</p>
            <p class="text-[11px] font-mono text-gray-600">{{ confidenceLow }} – {{ confidenceHigh }}</p>
          </div>
          <div v-else class="text-right">
            <p class="text-[10px] text-gray-400">Confidence</p>
            <p class="text-[11px] font-mono text-gray-600">± {{ confidence ?? '—' }}</p>
          </div>
        </div>

        <!-- Feature Drivers -->
        <div class="px-3 py-2">
          <p class="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Top Feature Drivers</p>
          <div
            v-for="(driver, i) in drivers"
            :key="i"
            class="mb-2 last:mb-0"
          >
            <div class="flex items-center justify-between mb-0.5">
              <span class="text-[11px] text-absa-enrich font-semibold truncate max-w-[160px]">{{ driver.label }}</span>
              <span
                class="text-[11px] font-mono font-bold ml-2 shrink-0"
                :class="driver.direction === 'negative' ? 'text-absa-inspire' : 'text-absa-passion'"
              >
                {{ driver.direction === 'negative' ? '▲' : '▼' }}
                {{ Math.abs(driver.impact * 100).toFixed(0) }}pp
              </span>
            </div>
            <!-- Impact bar -->
            <div class="h-1 bg-gray-100 rounded-full overflow-hidden">
              <div
                class="h-full rounded-full transition-all"
                :class="driver.direction === 'negative' ? 'bg-absa-inspire' : 'bg-absa-passion'"
                :style="{ width: Math.min(Math.abs(driver.impact) * 3 * 100, 100) + '%' }"
              ></div>
            </div>
          </div>
          <div v-if="!drivers || drivers.length === 0" class="text-[11px] text-gray-400 italic">
            No feature data available.
          </div>
        </div>

        <!-- Footer -->
        <div class="px-3 py-1.5 border-t border-gray-200 bg-gray-50">
          <p class="text-[10px] text-gray-400">
            Score generated: {{ scoreDate ?? 'Last model run' }} ·
            <span class="text-absa-enrich font-semibold">Model v{{ modelVersion ?? '2.1' }}</span>
          </p>
        </div>
      </div>
    </Transition>

  </span>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  /** Customer/entity name for the header label */
  label: { type: String, default: '' },
  /** The raw numeric score (e.g. 0.82 for churn, or 1240000 for CLV) */
  score: { type: [Number, String], default: null },
  /** Displayed score string (pre-formatted, e.g. "0.82" or "K 1.24M") */
  displayScore: { type: String, default: '—' },
  /** Label for the score row (e.g. "Churn Probability" or "Customer Lifetime Value") */
  scoreLabel: { type: String, default: 'Score' },
  /** Tailwind class for the score value color */
  scoreClass: { type: String, default: 'text-absa-enrich' },
  /** ± confidence figure as a string (e.g. "0.06") */
  confidence: { type: String, default: null },
  /** P10 lower bound string */
  confidenceLow: { type: String, default: null },
  /** P90 upper bound string */
  confidenceHigh: { type: String, default: null },
  /**
   * Feature driver objects:
   * [{ label: String, impact: Number (-1 to +1), direction: 'negative' | 'positive' }]
   */
  drivers: { type: Array, default: () => [] },
  /** Date score was generated */
  scoreDate: { type: String, default: null },
  /** Model version string */
  modelVersion: { type: String, default: '2.1' },
  /** Align popover to the right edge instead of left (for table columns near right margin) */
  alignRight: { type: Boolean, default: false },
})

const open = ref(false)
const containerRef = ref(null)

function toggle() {
  open.value = !open.value
}

function handleOutsideClick(event) {
  if (containerRef.value && !containerRef.value.contains(event.target)) {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
})
</script>
