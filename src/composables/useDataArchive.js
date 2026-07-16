import { ref, computed } from 'vue'

export function useDataArchive(options = {}) {
  const {
    fetchFn = null,
    pageSize = 20
  } = options

  const data = ref([])
  const loading = ref(false)
  const error = ref(null)
  const currentPage = ref(1)
  const totalItems = ref(0)
  const dateFrom = ref('')
  const dateTo = ref('')
  const searchQuery = ref('')

  const totalPages = computed(() => Math.max(1, Math.ceil(totalItems.value / pageSize)))
  const hasMore = computed(() => currentPage.value < totalPages.value)
  const hasPrevious = computed(() => currentPage.value > 1)

  async function load(params = {}) {
    loading.value = true
    error.value = null
    try {
      if (fetchFn) {
        const result = await fetchFn({
          page: currentPage.value,
          pageSize,
          dateFrom: dateFrom.value || undefined,
          dateTo: dateTo.value || undefined,
          search: searchQuery.value || undefined,
          ...params
        })
        data.value = result.data || result.items || result || []
        totalItems.value = result.total || data.value.length
      }
    } catch (err) {
      error.value = err.message
      data.value = []
    } finally {
      loading.value = false
    }
  }

  function setDateRange(from, to) {
    dateFrom.value = from
    dateTo.value = to
    currentPage.value = 1
    load()
  }

  function search(query) {
    searchQuery.value = query
    currentPage.value = 1
    load()
  }

  function nextPage() {
    if (hasMore.value) {
      currentPage.value++
      load()
    }
  }

  function prevPage() {
    if (hasPrevious.value) {
      currentPage.value--
      load()
    }
  }

  function goToPage(page) {
    currentPage.value = Math.max(1, Math.min(page, totalPages.value))
    load()
  }

  return {
    data,
    loading,
    error,
    currentPage,
    totalItems,
    totalPages,
    hasMore,
    hasPrevious,
    dateFrom,
    dateTo,
    searchQuery,
    load,
    setDateRange,
    search,
    nextPage,
    prevPage,
    goToPage
  }
}
