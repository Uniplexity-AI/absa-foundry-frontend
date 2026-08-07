import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const API_BASE = 'http://100.82.12.85'

function fetchWithTimeout(url, options = {}, timeoutMs = 5000) {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), timeoutMs)
  return fetch(url, { ...options, signal: ctrl.signal }).finally(() => clearTimeout(t))
}

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

  // ── Computed ──
  const portfolio = computed(() => {
    if (customers.value.length === 0) {
      return { total: 0, active: 0, activePct: 0, atRisk: 0, atRiskPct: 0, dormant: 0, dormantPct: 0, churned: 0, churnedPct: 0, actionsDue: 0 }
    }
    const total = customers.value.length
    const active = customers.value.filter((c) => c.state === 'ACTIVE').length
    const atRisk = customers.value.filter((c) => c.state === 'AT_RISK').length
    const dormant = customers.value.filter((c) => c.state === 'DORMANT').length
    const churned = customers.value.filter((c) => c.state === 'CHURNED').length
    return {
      total,
      active,
      activePct: total ? Math.round((active / total) * 1000) / 10 : 0,
      atRisk,
      atRiskPct: total ? Math.round((atRisk / total) * 1000) / 10 : 0,
      dormant,
      dormantPct: total ? Math.round((dormant / total) * 1000) / 10 : 0,
      churned,
      churnedPct: total ? Math.round((churned / total) * 1000) / 10 : 0,
      actionsDue: atRisk + dormant, // simple heuristic
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
          c.fullName?.toLowerCase().includes(q) ||
          c.customerId?.toLowerCase().includes(q) ||
          c.accountNumber?.toLowerCase().includes(q),
      )
    }
    if (filters.value.branch) {
      list = list.filter((c) => c.branch === filters.value.branch)
    }
    pagination.value.total = list.length
    const start = (pagination.value.page - 1) * pagination.value.limit
    return list.slice(start, start + pagination.value.limit)
  })

  // ── Actions ──
  async function fetchPortfolio(params = {}) {
    loading.value = true
    error.value = null
    try {
      const qs = new URLSearchParams(params).toString()
      const res = await fetchWithTimeout(`${API_BASE}/api/v1/customers/portfolio?${qs}`)
      if (res.ok) {
        const data = await res.json()
        customers.value = data.customers || []
        pagination.value.total = data.total || customers.value.length
      } else {
        throw new Error(`HTTP ${res.status}`)
      }
    } catch (e) {
      console.warn('fetchPortfolio failed:', e.message)
      error.value = e.message || 'Failed to load portfolio data'
      customers.value = []
      pagination.value.total = 0
    } finally {
      loading.value = false
    }
  }

  async function fetchCustomerDetail(id) {
    loading.value = true
    error.value = null
    try {
      const res = await fetchWithTimeout(`${API_BASE}/api/v1/customers/${id}`)
      if (res.ok) {
        selectedCustomer.value = await res.json()
      } else {
        throw new Error(`HTTP ${res.status}`)
      }
    } catch (e) {
      console.warn('fetchCustomerDetail failed:', e.message)
      error.value = e.message || 'Failed to load customer data'
      selectedCustomer.value = null
    } finally {
      loading.value = false
    }
  }

  async function fetchCustomerTimeline(id) {
    error.value = null
    try {
      const res = await fetchWithTimeout(`${API_BASE}/api/v1/customers/${id}/timeline`)
      if (res.ok) {
        timeline.value = await res.json()
      } else {
        throw new Error(`HTTP ${res.status}`)
      }
    } catch (e) {
      console.warn('fetchCustomerTimeline failed:', e.message)
      error.value = e.message || 'Failed to load timeline'
      timeline.value = []
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
    portfolio,
    filteredCustomers,
    fetchPortfolio,
    fetchCustomerDetail,
    fetchCustomerTimeline,
    setFilter,
    clearFilters,
  }
})
