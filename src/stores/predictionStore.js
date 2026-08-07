import { defineStore } from 'pinia'
import { ref } from 'vue'

const API_BASE = 'http://100.82.12.85'

function fetchWithTimeout(url, options = {}, timeoutMs = 5000) {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), timeoutMs)
  return fetch(url, { ...options, signal: ctrl.signal }).finally(() => clearTimeout(t))
}

// ── Store ───────────────────────────────────────────────────────
export const usePredictionStore = defineStore('prediction', () => {
  // ── State ──
  const predictions = ref({})
  const healthScores = ref({})
  const markovMatrix = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // ── Actions ──
  async function fetchChurnProbability(customerId) {
    loading.value = true
    error.value = null
    try {
      const res = await fetchWithTimeout(`${API_BASE}/api/v1/predictions/${customerId}/churn`)
      if (res.ok) {
        const data = await res.json()
        predictions.value = { ...predictions.value, [customerId]: data.probability ?? data.churnProbability ?? data }
      } else {
        throw new Error(`HTTP ${res.status}`)
      }
    } catch (e) {
      console.warn('fetchChurnProbability failed:', e.message)
      error.value = e.message || 'Failed to load churn probability'
    } finally {
      loading.value = false
    }
  }

  async function fetchHealthScore(customerId) {
    loading.value = true
    error.value = null
    try {
      const res = await fetchWithTimeout(`${API_BASE}/api/v1/predictions/${customerId}/health`)
      if (res.ok) {
        const data = await res.json()
        healthScores.value = { ...healthScores.value, [customerId]: data }
      } else {
        throw new Error(`HTTP ${res.status}`)
      }
    } catch (e) {
      console.warn('fetchHealthScore failed:', e.message)
      error.value = e.message || 'Failed to load health score'
    } finally {
      loading.value = false
    }
  }

  async function fetchMarkovMatrix() {
    loading.value = true
    error.value = null
    try {
      const res = await fetchWithTimeout(`${API_BASE}/api/v1/predictions/markov-matrix`)
      if (res.ok) {
        markovMatrix.value = await res.json()
      } else {
        throw new Error(`HTTP ${res.status}`)
      }
    } catch (e) {
      console.warn('fetchMarkovMatrix failed:', e.message)
      error.value = e.message || 'Failed to load Markov matrix'
      markovMatrix.value = null
    } finally {
      loading.value = false
    }
  }

  /** Convenience: get churn probability for a customer (0-1) */
  function getChurnProbability(customerId) {
    return predictions.value[customerId] ?? null
  }

  /** Convenience: get health score object for a customer */
  function getHealthScore(customerId) {
    return healthScores.value[customerId] ?? null
  }

  return {
    predictions,
    healthScores,
    markovMatrix,
    loading,
    error,
    fetchChurnProbability,
    fetchHealthScore,
    fetchMarkovMatrix,
    getChurnProbability,
    getHealthScore,
  }
})
