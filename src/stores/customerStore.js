import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { API_BASE_URL } from '@/services/api'

const api = axios.create({ baseURL: API_BASE_URL, timeout: 15000 })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

const DEFAULT_AS_OF_DATE = '2026-07-27'

// ── Store ───────────────────────────────────────────────────────
export const useCustomerStore = defineStore('customer', () => {
  // ── State ──
  const customers = ref([])
  const selectedCustomer = ref(null)
  const filters = ref({ state: null, search: '', branch: null })
  const pagination = ref({ page: 1, limit: 25, total: 0 })
  const loading = ref(false)
  const error = ref(null)
  const timeline = ref([])
  const features = ref(null)

  // Raw portfolio summary from API (aggregate counts)
  const _portfolioSummary = ref({ total_customers: 0, by_state: {} })

  // ── Computed ──
  const portfolio = computed(() => {
    const ps = _portfolioSummary.value
    const byState = ps.by_state || {}
    const active = byState.ACTIVE || { count: 0, pct: 0 }
    const atRisk = byState.AT_RISK || { count: 0, pct: 0 }
    const dormant = byState.DORMANT || { count: 0, pct: 0 }
    const churned = byState.CHURNED || { count: 0, pct: 0 }
    return {
      total: ps.total_customers || 0,
      active: active.count,
      activePct: active.pct,
      atRisk: atRisk.count,
      atRiskPct: atRisk.pct,
      dormant: dormant.count,
      dormantPct: dormant.pct,
      churned: churned.count,
      churnedPct: churned.pct,
      actionsDue: atRisk.count + dormant.count,
    }
  })

  const filteredCustomers = computed(() => {
    let list = [...customers.value]
    if (filters.value.state) {
      list = list.filter((c) => c.state === filters.value.state)
    }
    if (filters.value.search) {
      const q = filters.value.search.toLowerCase()
      list = list.filter(
        (c) =>
          c.customerId?.toLowerCase().includes(q) ||
          c.fullName?.toLowerCase().includes(q),
      )
    }
    pagination.value.total = list.length
    const start = (pagination.value.page - 1) * pagination.value.limit
    return list.slice(start, start + pagination.value.limit)
  })

  // ── Helpers ──
  function _mapCustomer(raw) {
    const id = raw.customer_id
    return {
      customerId: id,
      fullName: `Customer ${id.replace('CUST', '')}`,
      state: raw.state,
      healthScore: raw.health_score,
      churnProbability: raw.churn_probability ?? null,
      clv: raw.clv ?? null,
      branch: raw.branch_code ?? null,
      segment: raw.segment ?? null,
      previousState: raw.previous_state,
      isTransition: raw.is_transition,
      computedAt: raw.computed_at,
      _raw: raw,
    }
  }

  // ── Actions ──
  async function fetchPortfolio(params = {}) {
    loading.value = true
    error.value = null
    const dateParams = { as_of_date: params.as_of_date || DEFAULT_AS_OF_DATE }

    try {
      const [portfolioRes, listRes] = await Promise.all([
        api.get('/api/v1/customers/portfolio', { params: dateParams }),
        api.get('/api/v1/customers', { params: { ...dateParams, limit: 500, offset: 0 } }),
      ])

      _portfolioSummary.value = portfolioRes.data
      customers.value = (listRes.data || []).map(_mapCustomer)
      pagination.value.total = customers.value.length
    } catch (e) {
      console.warn('fetchPortfolio failed:', e.message)
      error.value = e.response?.data?.detail || e.message || 'Failed to load portfolio data'
      customers.value = []
      _portfolioSummary.value = { total_customers: 0, by_state: {} }
      pagination.value.total = 0
    } finally {
      loading.value = false
    }
  }

  async function fetchCustomerDetail(id) {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.get(`/api/v1/customers/${id}`, {
        params: { as_of_date: DEFAULT_AS_OF_DATE },
      })
      selectedCustomer.value = _mapCustomer(data)
    } catch (e) {
      console.warn('fetchCustomerDetail failed:', e.message)
      error.value = e.response?.data?.detail || e.message || 'Failed to load customer data'
      selectedCustomer.value = null
    } finally {
      loading.value = false
    }
  }

  async function fetchCustomerTimeline(id) {
    error.value = null
    try {
      const { data } = await api.get(`/api/v1/customers/${id}/timeline`)
      timeline.value = data || []
    } catch (e) {
      console.warn('fetchCustomerTimeline failed:', e.message)
      error.value = e.message || 'Failed to load timeline'
      timeline.value = []
    }
  }

  async function fetchCustomerFeatures(id) {
    error.value = null
    try {
      // Gateway exposes the feature snapshot in-process at /features/{id}/latest
      // (no /api/v1 prefix, unlike the other proxied routes).
      const { data } = await api.get(`/features/${id}/latest`)
      features.value = data || null
    } catch (e) {
      console.warn('fetchCustomerFeatures failed:', e.message)
      features.value = null
    }
  }

  function setFilter(key, value) {
    filters.value[key] = value
    pagination.value.page = 1
  }

  function clearFilters() {
    filters.value = { state: null, search: '', branch: null }
    pagination.value.page = 1
  }

  return {
    customers,
    selectedCustomer,
    filters,
    pagination,
    loading,
    error,
    timeline,
    features,
    portfolio,
    filteredCustomers,
    fetchPortfolio,
    fetchCustomerDetail,
    fetchCustomerTimeline,
    fetchCustomerFeatures,
    setFilter,
    clearFilters,
  }
})
