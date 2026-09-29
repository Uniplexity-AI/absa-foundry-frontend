import { a1 as defineStore, Q as axios, P as API_BASE_URL, r as ref, i as computed } from './index-D3zh6Tx5.js';
import { useSnapshotStore } from './snapshotStore-C1w-s1OI.js';

/** Official ABSA market-segment taxonomy supplied by the bank. */
const MARKET_SEGMENTS = Object.freeze({
  30: { marketSegment: 30, code: 'CIB', label: 'Corporate & Investment Banking' },
  40: { marketSegment: 40, code: 'BB', label: 'Business Banking' },
  45: { marketSegment: 45, code: 'SME', label: 'Small & Medium Enterprise' },
  50: { marketSegment: 50, code: 'Enterprise', label: 'Enterprise' },
  60: { marketSegment: 60, code: 'Prestige', label: 'Prestige' },
  65: { marketSegment: 65, code: 'Personal', label: 'Personal' },
  75: { marketSegment: 75, code: 'Mass', label: 'Mass' },
  85: { marketSegment: 85, code: 'Premier', label: 'Premier' },
});

// Excluded from all frontend lists, filters, and exports.
const EXCLUDED_MARKET_SEGMENTS = Object.freeze(new Set([90, 99]));

const OTHER_MARKET_SEGMENT = Object.freeze({
  marketSegment: null,
  code: 'Other',
  label: 'Other',
});

const MARKET_SEGMENT_OPTIONS = Object.freeze([
  ...Object.values(MARKET_SEGMENTS),
  OTHER_MARKET_SEGMENT,
]);

function resolveMarketSegment(value) {
  const numericValue = Number(value);
  const byNumber = Number.isInteger(numericValue) ? MARKET_SEGMENTS[numericValue] : null;
  if (byNumber) return byNumber

  const normalized = String(value ?? '').trim().toLowerCase();
  return Object.values(MARKET_SEGMENTS).find((segment) => (
    segment.code.toLowerCase() === normalized || segment.label.toLowerCase() === normalized
  )) || OTHER_MARKET_SEGMENT
}

function isFrontendVisibleMarketSegment(value) {
  return !EXCLUDED_MARKET_SEGMENTS.has(Number(value))
}

function formatMarketSegment(value) {
  const segment = resolveMarketSegment(value);
  return segment.code === 'Other' ? segment.label : `${segment.code} — ${segment.label}`
}

const api = axios.create({ baseURL: API_BASE_URL, timeout: 15000 });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config
});

// `/api/v1/customers` caps `limit` at 500 (server-side, returns HTTP 422 above
// that) and responds with a bare array — no total, no headers. So the client can
// hold at most this many rows, and that number must never be presented as the
// portfolio size.
const LEDGER_FETCH_LIMIT = 500;

// ── Store ───────────────────────────────────────────────────────
const useCustomerStore = defineStore('customer', () => {
  const snapshotStore = useSnapshotStore();

  // ── State ──
  const customers = ref([]);
  const selectedCustomer = ref(null);
  const filters = ref({ state: null, search: '', branch: null, marketSegment: null });
  const pagination = ref({ page: 1, limit: 25, total: 0 });
  // True portfolio size for the current snapshot (authoritative, from the server).
  // `customers.length` is only how many rows the client managed to fetch.
  const loadedCount = computed(() => customers.value.length);
  const loading = ref(false);
  const error = ref(null);
  const timeline = ref([]);
  const features = ref(null);
  const currentNba = ref(null);
  const loadingNba = ref(false);

  // Raw portfolio summary from API (aggregate counts)
  const _portfolioSummary = ref({ total_customers: 0, by_state: {} });

  // ── Computed ──
  const portfolio = computed(() => {
    const ps = _portfolioSummary.value;
    const byState = ps.by_state || {};
    const active = byState.ACTIVE || { count: 0, pct: 0 };
    const atRisk = byState.AT_RISK || { count: 0, pct: 0 };
    const dormant = byState.DORMANT || { count: 0, pct: 0 };
    const churned = byState.CHURNED || { count: 0, pct: 0 };
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
  });

  const filteredCustomers = computed(() => {
    let list = [...customers.value];
    if (filters.value.state) {
      list = list.filter((c) => c.state === filters.value.state);
    }
    if (filters.value.marketSegment !== null) {
      list = list.filter((c) => c.marketSegment === filters.value.marketSegment);
    }
    if (filters.value.search) {
      const q = filters.value.search.toLowerCase();
      list = list.filter(
        (c) =>
          c.customerId?.toLowerCase().includes(q) ||
          c.fullName?.toLowerCase().includes(q),
      );
    }
    // NOTE: deliberately does not write pagination.total. Filtering narrows the
    // rows we already hold; it must not overwrite the authoritative portfolio
    // size (use `filteredCustomers.length` for the filtered count).
    const start = (pagination.value.page - 1) * pagination.value.limit;
    return list.slice(start, start + pagination.value.limit)
  });

  // ── Helpers ──
  /**
   * Map one `customer_states` row to a ledger row.
   *
   * `raw` is a Customer State Service snapshot — it carries customer_id, state,
   * health_score and component_scores, and **no** identity columns. A real name
   * has to be joined in from the master record (see `fetchCustomerNames`), so
   * `name` is passed in rather than invented here.
   */
  function _mapCustomer(raw, name = null) {
    const id = raw.customer_id;
    const marketSegment = resolveMarketSegment(raw.market_segment ?? raw.segment);
    return {
      customerId: id,
      // The placeholder is a last resort for an id we have no name for, not the
      // default: showing "Customer 000877" for a named customer made saved
      // edits to the name look as if they had been ignored.
      fullName: name || `Customer ${String(id).replace('CUST', '')}`,
      state: raw.state,
      healthScore: raw.health_score,
      churnProbability: raw.churn_probability ?? null,
      clv: raw.clv ?? null,
      branch: raw.branch_code ?? null,
      marketSegment: marketSegment.marketSegment,
      segmentCode: marketSegment.code,
      segmentLabel: marketSegment.label,
      segment: formatMarketSegment(raw.market_segment ?? raw.segment),
      previousState: raw.previous_state,
      isTransition: raw.is_transition,
      computedAt: raw.computed_at,
      _raw: raw,
    }
  }

  // ── Actions ──
  /**
   * Customer id → full_name for the rows about to be rendered.
   *
   * Names exist only on ``public.customers_clean``; the portfolio payload is a
   * ``customer_states`` projection with no name column, and fetching a profile
   * per row would be N requests. One batched lookup fills the whole ledger.
   * A failure degrades to the placeholder — the list must still render.
   */
  async function fetchCustomerNames(ids) {
    const wanted = [...new Set((ids || []).filter(Boolean))].slice(0, LEDGER_FETCH_LIMIT);
    if (!wanted.length) return {}
    try {
      const { data } = await api.get('/api/v1/customers/names', {
        params: { ids: wanted.join(',') },
      });
      return data?.names || {}
    } catch (e) {
      console.warn('fetchCustomerNames failed:', e.message);
      return {}
    }
  }

  async function fetchPortfolio(params = {}) {
    loading.value = true;
    error.value = null;
    const dateParams = { as_of_date: params.as_of_date || snapshotStore.asOfDate };

    try {
      const [portfolioRes, countRes, listRes] = await Promise.all([
        api.get('/api/v1/customers/portfolio', { params: dateParams }),
        api.get('/api/v1/customers/count', { params: dateParams }),
        api.get('/api/v1/customers', { params: { ...dateParams, limit: LEDGER_FETCH_LIMIT, offset: 0 } }),
      ]);

      _portfolioSummary.value = portfolioRes.data;

      const rawRows = (listRes.data || [])
        .filter((customer) => isFrontendVisibleMarketSegment(customer.market_segment ?? customer.segment));

      // Join in the identity names the snapshot cannot carry.
      const names = await fetchCustomerNames(rawRows.map((c) => c.customer_id));
      customers.value = rawRows.map((customer) => _mapCustomer(customer, names[customer.customer_id] ?? null));

      // The authoritative portfolio size. Deriving this from
      // `customers.value.length` is what made the ledger read "of 500 customers"
      // for a 5,000-customer portfolio — it was reporting the fetch page size.
      pagination.value.total =
        countRes.data?.total ?? portfolioRes.data?.total_customers ?? customers.value.length;
    } catch (e) {
      console.warn('fetchPortfolio failed:', e.message);
      error.value = e.response?.data?.detail || e.message || 'Failed to load portfolio data';
      customers.value = [];
      _portfolioSummary.value = { total_customers: 0, by_state: {} };
      pagination.value.total = 0;
    } finally {
      loading.value = false;
    }
  }

  async function fetchCustomerDetail(id) {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get(`/api/v1/customers/${id}`, {
        params: { as_of_date: snapshotStore.asOfDate },
      });
      if (!isFrontendVisibleMarketSegment(data.market_segment ?? data.segment)) {
        selectedCustomer.value = null;
        error.value = 'Customer record is unavailable';
        return
      }
      selectedCustomer.value = _mapCustomer(data);
    } catch (e) {
      console.warn('fetchCustomerDetail failed:', e.message);
      error.value = e.response?.data?.detail || e.message || 'Failed to load customer data';
      selectedCustomer.value = null;
    } finally {
      loading.value = false;
    }
  }

  async function fetchCustomerTimeline(id) {
    error.value = null;
    try {
      const { data } = await api.get(`/api/v1/customers/${id}/timeline`);
      timeline.value = data || [];
    } catch (e) {
      console.warn('fetchCustomerTimeline failed:', e.message);
      error.value = e.message || 'Failed to load timeline';
      timeline.value = [];
    }
  }

  async function fetchCustomerFeatures(id) {
    error.value = null;
    try {
      // Gateway exposes the feature snapshot in-process at /features/{id}/latest
      // (no /api/v1 prefix, unlike the other proxied routes).
      const { data } = await api.get(`/features/${id}/latest`);
      features.value = data || null;
    } catch (e) {
      console.warn('fetchCustomerFeatures failed:', e.message);
      features.value = null;
    }
  }

  async function fetchNextBestAction(id) {
    loadingNba.value = true;
    currentNba.value = null;
    try {
      // NOTE: Using the gateway/proxy base or full URL depending on how api.get resolves.
      // Assuming decisions route is proxied like customers.
      const { data } = await api.get(`/api/v1/decisions/${id}/nba`, { timeout: 180000 });
      currentNba.value = data || null;
    } catch (e) {
      console.warn('fetchNextBestAction failed:', e.message);
      currentNba.value = null;
    } finally {
      loadingNba.value = false;
    }
  }

  function setFilter(key, value) {
    filters.value[key] = value;
    pagination.value.page = 1;
  }

  function clearFilters() {
    filters.value = { state: null, search: '', branch: null };
    pagination.value.page = 1;
  }

  return {
    customers,
    selectedCustomer,
    filters,
    pagination,
    loadedCount,
    loading,
    error,
    timeline,
    features,
    currentNba,
    loadingNba,
    portfolio,
    filteredCustomers,
    fetchPortfolio,
    fetchCustomerNames,
    fetchCustomerDetail,
    fetchCustomerTimeline,
    fetchCustomerFeatures,
    fetchNextBestAction,
    setFilter,
    clearFilters,
  }
});

export { MARKET_SEGMENT_OPTIONS as M, formatMarketSegment as f, useCustomerStore as u };
