import { r as ref, D as computed, Y as defineStore, R as axios, Q as API_BASE_URL } from './index-D2okVICq.js';
import { useSnapshotStore } from './snapshotStore-DgZI2MBu.js';

/**
 * CLV value-band configuration (absolute ZMW boundaries).
 *
 * The backend bands the portfolio by the predicted 12-month CLV. Its default is
 * percentile buckets (top 10% / 75th-90th / 50th-75th / below 50th); this module
 * lets an operator replace them with absolute ZMW ranges. The configuration is
 * persisted per browser and sent to `/api/v1/customers/clv-summary` as the
 * `band_ranges` query parameter.
 *
 * Validation mirrors the backend's `parse_band_ranges` exactly, so an invalid
 * configuration is caught here with a field-level message instead of costing a
 * round-trip (and a 400).
 */

const STORAGE_KEY = 'clvBandRanges';

// Must match the backend's _BAND_ORDER (highest first). Band names are fixed —
// the backend keys its display order on them and the cards key their badge
// colours — only the boundaries move.
const CLV_BANDS = ['Platinum', 'Gold', 'Silver', 'Bronze'];

// Starting boundaries for a first-time setup. Deliberately editable: a sane
// opening position for this portfolio, not a calibrated cut.
const SEED = {
  Platinum: { min: 50000, max: null },
  Gold:     { min: 20000, max: 50000 },
  Silver:   { min: 5000,  max: 20000 },
  Bronze:   { min: null,  max: 5000  },
};

function _rowsFromSeed() {
  return CLV_BANDS.map((band) => ({ band, ...SEED[band] }))
}

function _numOrNull(value) {
  if (value === null || value === undefined || String(value).trim() === '') return null
  const n = Number(String(value).replace(/[,\s]/g, ''));
  return Number.isFinite(n) ? n : NaN
}

/** Validate edit rows. Returns `{ ranges, error }` — mirrors the backend's rules. */
function validateRows(rows) {
  const ranges = {};
  for (const row of rows) {
    const lo = _numOrNull(row.min);
    const hi = _numOrNull(row.max);
    if (Number.isNaN(lo) || Number.isNaN(hi)) {
      return { ranges: null, error: `${row.band}: bounds must be numbers` }
    }
    if ((lo !== null && lo < 0) || (hi !== null && hi < 0)) {
      return { ranges: null, error: `${row.band}: bounds cannot be negative` }
    }
    if (lo === null && hi === null) {
      return { ranges: null, error: `${row.band} cannot be open at both ends` }
    }
    if (lo !== null && hi !== null && lo >= hi) {
      return {
        ranges: null,
        error: `${row.band}: lower bound must be below the upper bound`,
      }
    }
    ranges[row.band] = [lo, hi];
  }

  const ordered = Object.keys(ranges).sort(
    (a, b) => (ranges[a][0] ?? -Infinity) - (ranges[b][0] ?? -Infinity),
  );
  if (ordered.length !== CLV_BANDS.length) {
    return { ranges: null, error: 'All four bands are required' }
  }
  if (ranges[ordered[0]][0] !== null) {
    return { ranges: null, error: `Lowest band (${ordered[0]}) must be open at the bottom` }
  }
  const top = ordered[ordered.length - 1];
  if (ranges[top][1] !== null) {
    return { ranges: null, error: `Highest band (${top}) must be open at the top` }
  }
  for (let i = 0; i < ordered.length - 1; i += 1) {
    const lower = ordered[i];
    const upper = ordered[i + 1];
    if (ranges[lower][1] === null) {
      return {
        ranges: null,
        error: `Only the highest band may be open at the top (${lower})`,
      }
    }
    if (ranges[lower][1] !== ranges[upper][0]) {
      return {
        ranges: null,
        error: `${lower} ends at ${ranges[lower][1]} but ${upper} starts at `
          + `${ranges[upper][0]} — bands must be contiguous`,
      }
    }
  }
  return { ranges, error: null }
}

/** `{ Platinum: [50000, null], ... }` -> the `band_ranges` query value. */
function serializeRanges(ranges) {
  const fmt = (v) => (v === null ? '' : String(v));
  return CLV_BANDS.map((b) => `${b}:${fmt(ranges[b][0])}-${fmt(ranges[b][1])}`).join(';')
}

/** The persisted spec, or null to use the backend's percentile default. */
function getClvBandRanges() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (!saved || saved.mode !== 'custom' || !Array.isArray(saved.rows)) return null
    const { ranges } = validateRows(saved.rows);
    return ranges ? serializeRanges(ranges) : null
  } catch {
    return null
  }
}

function useClvBands() {
  const initial = (() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (saved && Array.isArray(saved.rows) && saved.rows.length === CLV_BANDS.length) {
        return saved
      }
    } catch { /* unparseable -> fall through to the seed */ }
    return { mode: 'percentile', rows: _rowsFromSeed() }
  })();

  const mode = ref(initial.mode === 'custom' ? 'custom' : 'percentile');
  const rows = ref(initial.rows.map((r) => ({ ...r })));
  const error = ref(null);

  const isCustom = computed(() => mode.value === 'custom');
  const preview = computed(() => {
    const { ranges, error: err } = validateRows(rows.value);
    return err ? null : serializeRanges(ranges)
  });

  function _persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ mode: mode.value, rows: rows.value }));
    } catch { /* private mode / quota — the config simply will not survive reload */ }
  }

  /** Returns true when the caller should re-fetch. */
  function apply() {
    if (mode.value === 'custom') {
      const { error: err } = validateRows(rows.value);
      if (err) {
        error.value = err;
        return false
      }
    }
    error.value = null;
    _persist();
    return true
  }

  function reset() {
    mode.value = 'percentile';
    rows.value = _rowsFromSeed();
    error.value = null;
    _persist();
    return true
  }

  return { mode, rows, error, isCustom, preview, apply, reset }
}

const api = axios.create({ baseURL: API_BASE_URL, timeout: 15000 });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config
});

// ── Store ────────────────────────────────────────────────────────
const useIntelligenceStore = defineStore('intelligence', () => {
  const snapshotStore = useSnapshotStore();

  const clvData       = ref(null);
  const lifecycleData = ref(null);
  const forecastData  = ref(null);
  const outcomesData  = ref(null);
  const loading       = ref({ clv: false, lifecycle: false, forecast: false, outcomes: false });
  const error         = ref({ clv: null,  lifecycle: null,  forecast: null,  outcomes: null  });

  async function fetchClv() {
    loading.value.clv = true;
    try {
      const params = { as_of_date: snapshotStore.asOfDate };
      // Absolute ZMW band boundaries, when the operator has configured them.
      // Absent -> the backend's percentile default (top 10% / 75th-90th / ...).
      const spec = getClvBandRanges();
      if (spec) params.band_ranges = spec;
      const { data } = await api.get('/api/v1/customers/clv-summary', { params });
      clvData.value = data;
      error.value.clv = null;
    } catch (e) {
      clvData.value = null;
      // An invalid band configuration comes back as a 400 with a readable detail.
      error.value.clv = e.response?.data?.detail || e.message || 'Failed to load CLV data';
    } finally {
      loading.value.clv = false;
    }
  }

  async function runClvPredictions() {
    // Explicitly run the CLV LightGBM model for the selected snapshot date.
    // No proxy fallback: a CLV_MODEL_NOT_LOADED status means nothing was scored.
    const { data } = await api.post('/api/v1/predictions/clv-run', null, {
      params: { as_of_date: snapshotStore.asOfDate },
      timeout: 300000,
    });
    return data
  }

  async function fetchLifecycle() {
    loading.value.lifecycle = true;
    try {
      const { data } = await api.get('/api/v1/customers/lifecycle-stages', { params: { as_of_date: snapshotStore.asOfDate } });
      lifecycleData.value = data;
      error.value.lifecycle = null;
    } catch (e) {
      lifecycleData.value = null;
      error.value.lifecycle = e.message || 'Failed to load lifecycle data';
    } finally {
      loading.value.lifecycle = false;
    }
  }

  async function fetchForecast() {
    loading.value.forecast = true;
    try {
      const { data } = await api.get('/api/v1/forecasts/balance', { params: { as_of_date: snapshotStore.asOfDate } });
      forecastData.value = data;
      error.value.forecast = null;
    } catch (e) {
      forecastData.value = null;
      error.value.forecast = e.message || 'Failed to load forecast data';
    } finally {
      loading.value.forecast = false;
    }
  }

  async function fetchOutcomes() {
    loading.value.outcomes = true;
    try {
      const { data } = await api.get('/api/v1/outcomes/retention-roi', { params: { as_of_date: snapshotStore.asOfDate } });
      outcomesData.value = data;
      error.value.outcomes = null;
    } catch (e) {
      outcomesData.value = null;
      error.value.outcomes = e.message || 'Failed to load outcomes data';
    } finally {
      loading.value.outcomes = false;
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
    });
    return data
  }

  return {
    clvData, lifecycleData, forecastData, outcomesData,
    loading, error,
    fetchClv, runClvPredictions, fetchLifecycle, fetchForecast, fetchOutcomes,
    runForecastModel,
  }
});

export { useClvBands as a, useIntelligenceStore as u };
