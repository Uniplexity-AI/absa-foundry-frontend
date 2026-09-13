import { a1 as defineStore, X as axios, T as API_BASE_URL, r as ref } from './index-DmPoKdyt.js';

const api = axios.create({ baseURL: API_BASE_URL, timeout: 15000 });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config
});

const DEFAULT_AS_OF_DATE = '2026-07-27';

// ── Store ───────────────────────────────────────────────────────
const usePredictionStore = defineStore('prediction', () => {
  // ── State ──
  const predictions = ref({});       // customerId → { churn_probability, clv_percentile, ... }
  const healthScores = ref({});
  const markovMatrix = ref(null);
  const churnDrivers = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // ── Actions ──
  async function fetchChurnProbability(customerId) {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get(`/api/v1/predictions/${customerId}/churn`, {
        params: { as_of_date: DEFAULT_AS_OF_DATE },
      });
      predictions.value = { ...predictions.value, [customerId]: { churn_probability: data.churn_probability ?? data.probability } };
    } catch (e) {
      console.warn('fetchChurnProbability failed:', e.message);
      error.value = e.response?.data?.detail || e.message || 'Failed to load churn probability';
    } finally {
      loading.value = false;
    }
  }

  async function fetchHealthScore(customerId) {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get(`/api/v1/predictions/${customerId}/health`, {
        params: { as_of_date: DEFAULT_AS_OF_DATE },
      });
      healthScores.value = { ...healthScores.value, [customerId]: data };
    } catch (e) {
      console.warn('fetchHealthScore failed:', e.message);
      error.value = e.response?.data?.detail || e.message || 'Failed to load health score';
    } finally {
      loading.value = false;
    }
  }

  /** Fetch full prediction (churn + CLV + health + state) for one customer */
  async function fetchPrediction(customerId) {
    error.value = null;
    try {
      const { data } = await api.get(`/api/v1/predictions/${customerId}`, {
        params: { as_of_date: DEFAULT_AS_OF_DATE },
      });
      predictions.value = {
        ...predictions.value,
        [customerId]: {
          churn_probability: data.churn_probability ?? data.probability ?? null,
          clv_percentile: data.clv_percentile ?? null,
          health_score: data.health_score ?? null,
          state: data.state ?? null,
        },
      };
    } catch (e) {
      console.warn('fetchPrediction failed:', e.message);
      error.value = e.response?.data?.detail || e.message || 'Failed to load prediction';
    }
  }

  async function fetchMarkovMatrix() {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get('/api/v1/predictions/markov-matrix', {
        params: { as_of_date: DEFAULT_AS_OF_DATE },
      });
      markovMatrix.value = data;
    } catch (e) {
      console.warn('fetchMarkovMatrix failed:', e.message);
      error.value = e.response?.data?.detail || e.message || 'Failed to load Markov matrix';
      markovMatrix.value = null;
    } finally {
      loading.value = false;
    }
  }

  /** Convenience: get churn probability for a customer (0-1 float) */
  function getChurnProbability(customerId) {
    const p = predictions.value[customerId];
    return p?.churn_probability ?? null
  }

  /** Convenience: get health score object for a customer */
  function getHealthScore(customerId) {
    return healthScores.value[customerId] ?? null
  }

  /** Batch fetch predictions for multiple customers (churn + CLV in one call) */
  async function fetchBatchPredictions(customerIds, asOfDate = null) {
    if (!customerIds.length) return
    error.value = null;
    const date = asOfDate || DEFAULT_AS_OF_DATE;
    // Fetch 2 at a time to avoid overwhelming the backend
    const batchSize = 2;
    for (let i = 0; i < customerIds.length; i += batchSize) {
      const batch = customerIds.slice(i, i + batchSize);
      const results = await Promise.allSettled(
        batch.map(id =>
          api.get(`/api/v1/predictions/${id}`, { params: { as_of_date: date } })
        )
      );
      results.forEach((r, idx) => {
        if (r.status === 'fulfilled') {
          const d = r.value.data;
          predictions.value = {
            ...predictions.value,
            [batch[idx]]: {
              churn_probability: d.churn_probability,
              clv_percentile: d.clv_percentile,
              health_score: d.health_score,
              state: d.state,
            }
          };
        }
      });
    }
  }

  /** Fetch top churn drivers for AI recommendation engine */
  async function fetchChurnDrivers(asOfDate = null) {
    error.value = null;
    try {
      const { data } = await api.get('/api/v1/churn-intel/drivers', {
        params: { as_of_date: asOfDate || DEFAULT_AS_OF_DATE },
      });
      churnDrivers.value = data.drivers || [];
    } catch (e) {
      console.warn('fetchChurnDrivers failed:', e.message);
      churnDrivers.value = [];
    }
  }

  return {
    predictions,
    healthScores,
    markovMatrix,
    churnDrivers,
    loading,
    error,
    fetchChurnProbability,
    fetchHealthScore,
    fetchPrediction,
    fetchMarkovMatrix,
    fetchBatchPredictions,
    fetchChurnDrivers,
    getChurnProbability,
    getHealthScore,
  }
});

export { usePredictionStore as u };
