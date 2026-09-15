import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { API_BASE_URL } from '@/services/api'
import { useSnapshotStore } from './snapshotStore'
import { getClvBandRanges } from '@/composables/useClvBands'

const api = axios.create({ baseURL: API_BASE_URL, timeout: 15000 })
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ── Store ────────────────────────────────────────────────────────
export const useIntelligenceStore = defineStore('intelligence', () => {
  const snapshotStore = useSnapshotStore()

  const clvData       = ref(null)
  const lifecycleData = ref(null)
  const forecastData  = ref(null)
  const outcomesData  = ref(null)
  const loading       = ref({ clv: false, lifecycle: false, forecast: false, outcomes: false })
  const error         = ref({ clv: null,  lifecycle: null,  forecast: null,  outcomes: null  })

  async function fetchClv() {
    loading.value.clv = true
    try {
      const params = { as_of_date: snapshotStore.asOfDate }
      // Absolute ZMW band boundaries, when the operator has configured them.
      // Absent -> the backend's percentile default (top 10% / 75th-90th / ...).
      const spec = getClvBandRanges()
      if (spec) params.band_ranges = spec
      const { data } = await api.get('/api/v1/customers/clv-summary', { params })
      clvData.value = data
      error.value.clv = null
    } catch (e) {
      clvData.value = null
      // An invalid band configuration comes back as a 400 with a readable detail.
      error.value.clv = e.response?.data?.detail || e.message || 'Failed to load CLV data'
    } finally {
      loading.value.clv = false
    }
  }

  async function runClvPredictions() {
    // Explicitly run the CLV LightGBM model for the selected snapshot date.
    // No proxy fallback: a CLV_MODEL_NOT_LOADED status means nothing was scored.
    const { data } = await api.post('/api/v1/predictions/clv-run', null, {
      params: { as_of_date: snapshotStore.asOfDate },
      timeout: 300000,
    })
    return data
  }

  async function fetchLifecycle() {
    loading.value.lifecycle = true
    try {
      const { data } = await api.get('/api/v1/customers/lifecycle-stages', { params: { as_of_date: snapshotStore.asOfDate } })
      lifecycleData.value = data
      error.value.lifecycle = null
    } catch (e) {
      lifecycleData.value = null
      error.value.lifecycle = e.message || 'Failed to load lifecycle data'
    } finally {
      loading.value.lifecycle = false
    }
  }

  async function fetchForecast() {
    loading.value.forecast = true
    try {
      const { data } = await api.get('/api/v1/forecasts/balance', { params: { as_of_date: snapshotStore.asOfDate } })
      forecastData.value = data
      error.value.forecast = null
    } catch (e) {
      forecastData.value = null
      error.value.forecast = e.message || 'Failed to load forecast data'
    } finally {
      loading.value.forecast = false
    }
  }

  async function fetchOutcomes() {
    loading.value.outcomes = true
    try {
      const { data } = await api.get('/api/v1/outcomes/retention-roi', { params: { as_of_date: snapshotStore.asOfDate } })
      outcomesData.value = data
      error.value.outcomes = null
    } catch (e) {
      outcomesData.value = null
      error.value.outcomes = e.message || 'Failed to load outcomes data'
    } finally {
      loading.value.outcomes = false
    }
  }

  async function runForecastModel() {
    // Run the balance-growth LightGBM model for the selected snapshot date.
    // The prediction service scores all customers, embeds balance_growth_pct
    // in the portfolio-scores payload, and the decision-intelligence-service
    // picks it up the next time GET /forecasts/balance is called.
    // Timeout is generous — large portfolios can take up to 2 minutes.
    const { data } = await api.post('/api/v1/predictions/balance-growth-run', null, {
      params: { as_of_date: snapshotStore.asOfDate },
      timeout: 300000,
    })
    return data
  }

  return {
    clvData, lifecycleData, forecastData, outcomesData,
    loading, error,
    fetchClv, runClvPredictions, fetchLifecycle, fetchForecast, fetchOutcomes,
    runForecastModel,
  }
})
