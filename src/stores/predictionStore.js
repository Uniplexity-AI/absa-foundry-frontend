import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { API_BASE_URL } from '@/services/api'

const api = axios.create({ baseURL: API_BASE_URL, timeout: 5000 })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

const DEFAULT_AS_OF_DATE = '2026-07-27'

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
      const { data } = await api.get(`/api/v1/predictions/${customerId}/churn`, {
        params: { as_of_date: DEFAULT_AS_OF_DATE },
      })
      predictions.value = { ...predictions.value, [customerId]: data.churn_probability ?? data.probability ?? data }
    } catch (e) {
      console.warn('fetchChurnProbability failed:', e.message)
      error.value = e.response?.data?.detail || e.message || 'Failed to load churn probability'
    } finally {
      loading.value = false
    }
  }

  async function fetchHealthScore(customerId) {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.get(`/api/v1/predictions/${customerId}/health`, {
        params: { as_of_date: DEFAULT_AS_OF_DATE },
      })
      healthScores.value = { ...healthScores.value, [customerId]: data }
    } catch (e) {
      console.warn('fetchHealthScore failed:', e.message)
      error.value = e.response?.data?.detail || e.message || 'Failed to load health score'
    } finally {
      loading.value = false
    }
  }

  async function fetchMarkovMatrix() {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.get('/api/v1/predictions/markov-matrix', {
        params: { as_of_date: DEFAULT_AS_OF_DATE },
      })
      markovMatrix.value = data
    } catch (e) {
      console.warn('fetchMarkovMatrix failed:', e.message)
      error.value = e.response?.data?.detail || e.message || 'Failed to load Markov matrix'
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
