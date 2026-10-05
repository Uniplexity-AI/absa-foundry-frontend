import { a1 as defineStore, Q as axios, R as API_BASE_URL, r as ref } from './index-DJl1D5pd.js';
import { useSnapshotStore } from './snapshotStore-DgtrZJFu.js';

const api = axios.create({ baseURL: API_BASE_URL, timeout: 15000 });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config
});

// ── Store ───────────────────────────────────────────────────────
const usePredictionStore = defineStore('prediction', () => {
  const snapshotStore = useSnapshotStore();

  // ── State ──
  // customerId → { churn_probability, clv, clv_percentile, health_score, state }
  // `clv` is absolute 12-month net revenue (ZMW); `clv_percentile` is only its
  // rank within the cohort — they are different numbers and must not be swapped.
  const predictions = ref({});
  const healthScores = ref({});
  // as_of_date already loaded from /predict/portfolio-scores, so that (whole
  // portfolio) call is made at most once per snapshot date per session.
  const portfolioScoresDate = ref(null);
  let _portfolioScoresInFlight = null;
  // Forward-looking lifecycle stage per horizon:
  //   customerId → { "14": {stage, confidence, probabilities}, "30": {...}, "90": {...} }
  // This is NOT the current state — the state service's rule engine owns "now".
  const lifecycleForecast = ref({});
  const lifecycleHorizons = ref({});
  const lifecycleForecastDate = ref(null);
  // Why a forecast can be legitimately empty: ``status`` is the service's own
  // verdict (NO_DATA = no feature snapshot for that date) and ``count`` is how
  // many customers were scored.
  const lifecycleForecastStatus = ref(null);
  const lifecycleForecastCount = ref(0);
  let _lifecycleForecastInFlight = null;
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
        params: { as_of_date: snapshotStore.asOfDate },
      });
      // Merge, never replace: this route knows nothing about CLV, and a
      // wholesale replace would wipe the clv/clv_percentile loaded for the date.
      predictions.value = {
        ...predictions.value,
        [customerId]: {
          ...(predictions.value[customerId] ?? {}),
          churn_probability: data.churn_probability ?? data.probability ?? null,
        },
      };
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
        params: { as_of_date: snapshotStore.asOfDate },
      });
      healthScores.value = { ...healthScores.value, [customerId]: data };
    } catch (e) {
      console.warn('fetchHealthScore failed:', e.message);
      error.value = e.response?.data?.detail || e.message || 'Failed to load health score';
    } finally {
      loading.value = false;
    }
  }

  /**
   * Fetch one customer's prediction (churn + CLV percentile + health + state).
   *
   * Also pulls the portfolio-wide scores once per snapshot date, because the
   * absolute CLV only exists there. That call is de-duplicated, and the merge
   * below means a failure of this per-customer route (it raises 500 while the
   * churn model is missing) still leaves the CLV/percentile in place.
   */
  async function fetchPrediction(customerId) {
    error.value = null;
    await ensurePortfolioScores();
    await ensureLifecycleForecast();
    try {
      const { data } = await api.get(`/api/v1/predictions/${customerId}`, {
        params: { as_of_date: snapshotStore.asOfDate },
      });
      predictions.value = {
        ...predictions.value,
        [customerId]: {
          ...(predictions.value[customerId] ?? {}),
          churn_probability: data.churn_probability ?? data.probability ?? null,
          clv_percentile: data.clv_percentile ?? predictions.value[customerId]?.clv_percentile ?? null,
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
        params: { as_of_date: snapshotStore.asOfDate },
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

  /**
   * Forward lifecycle-stage forecast for every customer, all horizons, one call.
   *
   * Each entry is `{stage, confidence, probabilities}` per horizon, or `null`
   * when that horizon's artifact did not load — never a fallback prediction. The
   * current stage is deliberately absent; `StateEngine` owns that.
   */
  async function fetchLifecycleForecast() {
    const date = snapshotStore.asOfDate;
    try {
      const { data } = await api.get('/api/v1/predictions/lifecycle-forecast', {
        params: { as_of_date: date },
        timeout: 180000,
      });
      const next = {};
      for (const row of data?.forecast ?? []) next[row.customer_id] = row.horizons ?? {};
      lifecycleForecast.value = next;
      lifecycleHorizons.value = data?.horizons ?? {};
      lifecycleForecastStatus.value = data?.status ?? null;
      lifecycleForecastCount.value = data?.count ?? 0;
      lifecycleForecastDate.value = date;
    } catch (e) {
      console.warn('fetchLifecycleForecast failed:', e.message);
      // Keep any previous forecast — an unavailable horizon still has to render.
    }
  }

  /** fetchLifecycleForecast once per snapshot date, de-duplicating concurrent calls. */
  async function ensureLifecycleForecast() {
    if (lifecycleForecastDate.value === snapshotStore.asOfDate) return
    if (_lifecycleForecastInFlight) return _lifecycleForecastInFlight
    _lifecycleForecastInFlight = fetchLifecycleForecast().finally(() => {
      _lifecycleForecastInFlight = null;
    });
    return _lifecycleForecastInFlight
  }

  /** Forward forecast for one customer, or null. Keys are horizon strings: "14"/"30"/"90". */
  function getLifecycleForecast(customerId) {
    return lifecycleForecast.value[customerId] ?? null
  }

  /** Convenience: get churn probability for a customer (0-1 float) */
  function getChurnProbability(customerId) {
    const p = predictions.value[customerId];
    return p?.churn_probability ?? null
  }

  /** Convenience: get absolute CLV (ZMW, 12-month net revenue) for a customer. */
  function getClv(customerId) {
    const v = predictions.value[customerId]?.clv;
    return v == null ? null : Number(v)
  }

  /** Convenience: get CLV percentile (0-1) for a customer — a rank, not money. */
  function getClvPercentile(customerId) {
    const p = predictions.value[customerId]?.clv_percentile;
    return p == null ? null : Number(p)
  }

  /** Convenience: get health score object for a customer */
  function getHealthScore(customerId) {
    return healthScores.value[customerId] ?? null
  }

  /**
   * Load the whole portfolio's scores for the selected snapshot date.
   *
   * One request returns every customer's churn probability, **absolute** CLV
   * (ZMW) and CLV percentile — this is the only source of the absolute value.
   * It degrades rather than failing when the churn model is absent (churn null,
   * CLV still present), which the per-customer route does not.
   */
  async function fetchPortfolioScores() {
    const date = snapshotStore.asOfDate;
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get('/api/v1/predictions/portfolio-scores', {
        params: { as_of_date: date },
        timeout: 120000,
      });
      const next = { ...predictions.value };
      for (const s of data?.scores ?? []) {
        next[s.customer_id] = {
          ...(next[s.customer_id] ?? {}),
          churn_probability: s.churn_probability ?? null,
          clv: s.clv ?? null,
          clv_percentile: s.clv_percentile ?? null,
        };
      }
      predictions.value = next;
      portfolioScoresDate.value = date;
    } catch (e) {
      console.warn('fetchPortfolioScores failed:', e.message);
      error.value = e.response?.data?.detail || e.message || 'Failed to load portfolio scores';
    } finally {
      loading.value = false;
    }
  }

  /** fetchPortfolioScores once per snapshot date, de-duplicating concurrent calls. */
  async function ensurePortfolioScores() {
    if (portfolioScoresDate.value === snapshotStore.asOfDate) return
    if (_portfolioScoresInFlight) return _portfolioScoresInFlight
    _portfolioScoresInFlight = fetchPortfolioScores().finally(() => {
      _portfolioScoresInFlight = null;
    });
    return _portfolioScoresInFlight
  }

  /**
   * Kept for compatibility — now a single portfolio-wide call.
   *
   * The old implementation issued one request per customer, two at a time, and
   * returned only the CLV *percentile*. `customerIds` is therefore ignored: the
   * whole snapshot is loaded (and cached for the date) in one request.
   */
  async function fetchBatchPredictions(_customerIds, _asOfDate = null) {
    // The ledger wants both families for the page it is about to render.
    return Promise.all([ensurePortfolioScores(), ensureLifecycleForecast()])
  }

  /** Fetch top churn drivers for AI recommendation engine */
  async function fetchChurnDrivers(asOfDate = null) {
    error.value = null;
    try {
      const { data } = await api.get('/api/v1/churn-intel/drivers', {
        params: { as_of_date: asOfDate || snapshotStore.asOfDate },
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
    fetchPortfolioScores,
    ensurePortfolioScores,
    fetchLifecycleForecast,
    ensureLifecycleForecast,
    getLifecycleForecast,
    lifecycleForecast,
    lifecycleHorizons,
    lifecycleForecastStatus,
    lifecycleForecastCount,
    lifecycleForecastDate,
    fetchMarkovMatrix,
    fetchBatchPredictions,
    fetchChurnDrivers,
    getChurnProbability,
    getClv,
    getClvPercentile,
    getHealthScore,
  }
});

export { usePredictionStore as u };
