<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { API_BASE_URL, authFetch } from '@/services/api'

/**
 * AI narration panel (Ollama).
 *
 * ADR-005: the LLM is an advisor — it only narrates a decision that the
 * deterministic rule engine already made. On CPU a 7B model needs ~1-2 minutes,
 * so generation is user-triggered (never on mount) and uses fetch with no
 * axios timeout, plus a hard 5-minute abort.
 */
const props = defineProps({
  customerId: { type: String, required: true },
  asOfDate: { type: String, default: '2026-07-27' },
})

const loading = ref(false)
const elapsed = ref(0)
const error = ref('')
const narration = ref('')
const model = ref('')
const topAction = ref('')
const available = ref(null)

let ticker = null
let controller = null

const elapsedLabel = computed(() =>
  elapsed.value < 60
    ? `${elapsed.value}s`
    : `${Math.floor(elapsed.value / 60)}m ${elapsed.value % 60}s`,
)

async function generate() {
  if (loading.value) return
  loading.value = true
  error.value = ''
  narration.value = ''
  elapsed.value = 0
  ticker = setInterval(() => { elapsed.value += 1 }, 1000)
  controller = new AbortController()
  const hardStop = setTimeout(() => controller?.abort(), 300000)

  try {
    const url = `${API_BASE_URL}/api/v1/insights/llm-explain/${encodeURIComponent(props.customerId)}`
      + `?as_of_date=${encodeURIComponent(props.asOfDate)}`
    const res = await authFetch(url, { signal: controller.signal })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(data?.detail || `Request failed (${res.status})`)

    available.value = data.llm_available ?? null
    model.value = data.model || ''
    topAction.value = data.top_action || ''
    narration.value = data.llm_explanation || ''
  } catch (e) {
    error.value = e?.name === 'AbortError'
      ? 'Cancelled.'
      : (e?.message || 'Failed to generate the explanation')
  } finally {
    clearTimeout(hardStop)
    if (ticker) { clearInterval(ticker); ticker = null }
    loading.value = false
  }
}

function cancel() {
  controller?.abort()
  if (ticker) { clearInterval(ticker); ticker = null }
  loading.value = false
}

onBeforeUnmount(() => {
  controller?.abort()
  if (ticker) clearInterval(ticker)
})
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-sm p-4">
    <div class="flex items-start justify-between gap-3 mb-2">
      <div>
        <h4 class="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
          AI Explanation
        </h4>
        <p class="text-[11px] text-gray-400 mt-1">
          Narration only — the recommended action is produced by the deterministic rule engine (ADR-005).
        </p>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <button
          v-if="loading"
          @click="cancel"
          class="px-3 py-1.5 border border-gray-300 text-gray-600 text-xs font-bold rounded-sm hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          @click="generate"
          :disabled="loading"
          :class="['px-3 py-1.5 text-xs font-bold rounded-sm transition-colors',
                   loading ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-absa-enrich text-white hover:bg-absa-power']"
        >
          {{ loading ? `Generating… ${elapsedLabel}` : (narration ? 'Regenerate' : 'Generate explanation') }}
        </button>
      </div>
    </div>

    <p v-if="loading" class="text-[11px] text-gray-500 mt-2">
      Local Ollama model — allow ~1-2 minutes on CPU. You can navigate away; this request is cancelled if you do.
    </p>

    <p v-if="error" class="mt-2 text-[11px] text-absa-passion font-semibold">{{ error }}</p>

    <p v-if="available === false && !error" class="mt-2 text-[11px] text-status-warning font-semibold">
      LLM unavailable — Ollama is not running or the model is not pulled. Showing the deterministic summary.
    </p>

    <div v-if="narration" class="mt-3">
      <div class="flex flex-wrap items-center gap-2 mb-2">
        <span v-if="model" class="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-mono rounded-sm">{{ model }}</span>
        <span v-if="topAction" class="px-2 py-0.5 bg-absa-enrich/10 text-absa-enrich text-[10px] font-bold rounded-sm">
          Rule-engine action: {{ topAction }}
        </span>
      </div>
      <p class="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{{ narration }}</p>
    </div>
  </div>
</template>
