import { aa as defineStore, r as ref, i as computed } from './index-DX7cgo_Y.js';
import { f as fetchETLDashboard } from './etlApi-DFxDgtba.js';

/**
 * ETL Store — Pinia store for pipeline run history and dashboard state.
 *
 * Consumes GET /api/etl/runs via etlApi.js.
 * Drives ETLRunHistory.vue with reactive, paginated data.
 */


const useETLStore = defineStore('etl', () => {
  // ── State ──
  const runs = ref([]);
  const totalRuns = ref(0);
  const page = ref(1);
  const limit = ref(25);
  const statusFilter = ref(null);

  const kpis = ref(null);
  const statusPanel = ref(null);
  const qualityTrend = ref([]);

  const loading = ref(false);
  const error = ref(null);

  // ── Computed ──
  const totalPages = computed(() => Math.max(1, Math.ceil(totalRuns.value / limit.value)));

  const isEmpty = computed(() => !loading.value && runs.value.length === 0);

  // ── Actions ──
  async function loadDashboard(params = {}) {
    loading.value = true;
    error.value = null;
    try {
      const data = await fetchETLDashboard({
        page: params.page ?? page.value,
        limit: params.limit ?? limit.value,
        status: params.status ?? statusFilter.value,
      });

      runs.value = data.runs || [];
      totalRuns.value = data.total_runs || 0;
      page.value = data.page || 1;
      limit.value = data.limit || 25;

      kpis.value = data.kpis || null;
      statusPanel.value = data.status || null;
      qualityTrend.value = data.quality_trend || [];
    } catch (e) {
      error.value = e.message || 'Failed to load ETL dashboard';
      console.error('[etlStore] loadDashboard failed:', e);
    } finally {
      loading.value = false;
    }
  }

  function setPage(p) {
    page.value = p;
    loadDashboard();
  }

  function setStatusFilter(status) {
    statusFilter.value = status || null;
    page.value = 1;
    loadDashboard();
  }

  function refresh() {
    loadDashboard();
  }

  return {
    // state
    runs,
    totalRuns,
    page,
    limit,
    statusFilter,
    kpis,
    statusPanel,
    qualityTrend,
    loading,
    error,
    // computed
    totalPages,
    isEmpty,
    // actions
    loadDashboard,
    setPage,
    setStatusFilter,
    refresh,
  }
});

export { useETLStore as u };
