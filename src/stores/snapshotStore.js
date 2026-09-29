import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { API_BASE_URL } from '@/services/api'

/**
 * Snapshot ("as-of") date store — single source of truth for the date every
 * customer-facing view queries.
 *
 * Previously each store/view hardcoded `DEFAULT_AS_OF_DATE = '2026-07-27'`,
 * so any data loaded for another snapshot date was invisible. The date is now
 * read here, initialised from localStorage (user choice) or `VITE_AS_OF_DATE`
 * (default), and the real snapshot dates are fetched from
 * `GET /api/v1/customers/snapshots`.
 */

const STORAGE_KEY = 'asOfDate'

const api = axios.create({ baseURL: API_BASE_URL, timeout: 15000 })
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

function cleanDate(val, fallback = '2026-07-27') {
  let d = String(val || '').trim()
  if (!d) return fallback
  // Auto-correct common adjacent-key typo: 2026-07027 -> 2026-07-27 (0 is next to - on the keyboard)
  if (/^\d{4}-\d{2}0\d{2}$/.test(d)) {
    d = d.slice(0, 7) + '-' + d.slice(8)
  }
  // Validate standard ISO format YYYY-MM-DD
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) {
    return fallback
  }
  return d
}

export const useSnapshotStore = defineStore('snapshot', () => {
  const initial = import.meta.env.VITE_AS_OF_DATE || '2026-07-27'

  const stored = localStorage.getItem(STORAGE_KEY)
  const resolved = cleanDate(stored, initial)
  if (stored && stored !== resolved) {
    localStorage.setItem(STORAGE_KEY, resolved)
  }

  const selectedDate = ref(resolved)
  const availableDates = ref([])

  const asOfDate = computed(() => cleanDate(selectedDate.value, initial))

  async function fetchAvailable() {
    try {
      const { data } = await api.get('/api/v1/customers/snapshots')
      const dates = data?.dates || []
      availableDates.value = dates
      // A stored date can outlive the data behind it — a reload or re-ingest
      // leaves localStorage pointing at a snapshot that no longer exists, and
      // then every view renders empty with nothing to explain why. Snapshots
      // come back newest-first, so fall back to the newest real one.
      if (dates.length && !dates.includes(selectedDate.value)) setDate(dates[0])
    } catch {
      availableDates.value = []
    }
  }

  function setDate(value) {
    const d = cleanDate(value, null)
    if (!d) return
    selectedDate.value = d
    localStorage.setItem(STORAGE_KEY, d)
  }

  return { selectedDate, availableDates, asOfDate, fetchAvailable, setDate }
})
