import { a1 as defineStore, Q as axios, P as API_BASE_URL, r as ref, i as computed } from './index-D7z0QEXH.js';

const api = axios.create({ baseURL: API_BASE_URL, timeout: 5000 });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config
});

// ── Store ───────────────────────────────────────────────────────
const useModelsStore = defineStore('models', () => {
  // ── State ──
  const models = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // ── Computed ──
  const championChurn = computed(() =>
    models.value.find((m) => m.type === 'churn' && m.status === 'champion'),
  );
  const championCLV = computed(() =>
    models.value.find((m) => m.type === 'clv' && m.status === 'champion'),
  );
  const modelCount = computed(() => models.value.length);

  // ── Actions ──
  async function fetchModels() {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get('/api/v1/models');
      // Spread the raw registry entry so per-family cards can read task / trained_at /
      // artifacts etc. The id/type/status/metrics shorthands are kept for existing callers.
      models.value = (data.models || []).map((m) => ({
        ...m,
        id: m.model_id,
        type: m.type,
        status: m.status,
        metrics: m.metrics || {},
        method: m.method,
      }));
    } catch (e) {
      console.warn('fetchModels failed:', e.message);
      error.value = e.response?.data?.detail || e.message || 'Failed to load models';
      models.value = [];
    } finally {
      loading.value = false;
    }
  }

  return { models, loading, error, championChurn, championCLV, modelCount, fetchModels }
});

export { useModelsStore as u };
