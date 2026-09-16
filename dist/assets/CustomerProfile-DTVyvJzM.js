import { Q as API_BASE_URL, R as axios, r as ref, D as computed, h as onMounted, c as createElementBlock, F as Fragment, b as createBaseVNode, e as renderList, q as createVNode, w as withCtx, t as toDisplayString, m as createTextVNode, l as createCommentVNode, n as normalizeStyle, j as normalizeClass, v as withDirectives, K as vModelSelect, A as resolveComponent, J as useRoute, u as useRouter, H as decodeJWT, o as openBlock, y as unref, I as withKeys, s as withModifiers, x as vModelText } from './index-BDk32LgJ.js';
import { u as useCustomerStore } from './customerStore-BRoLvcJZ.js';
import { u as usePredictionStore } from './predictionStore-DE3XL_zG.js';
import { useSnapshotStore } from './snapshotStore-CBvUDR3G.js';
import { _ as _sfc_main$1, t as tierColor, s as stateTier, h as healthTier, c as churnTier } from './CustomerStatePill-I0KLJfXr.js';
import { g as getActionLog, h as hydrateLogFromServer, b as getCustomerState, r as recordAction } from './absaActions-C1zoYsMw.js';
import { n as notify } from './absaExport-DS4NsexK.js';
import { _ as _sfc_main$2, d as deleteCustomer } from './customerAdminApi-Cge2nYL7.js';
import { _ as _sfc_main$3 } from './LoadingSkeleton-DQ0zKghI.js';

/**
 * Customer profile API — the identity header shown on the customer page.
 *
 * Backend: GET /api/v1/customers/{customer_id}/profile
 * (gateway/routes/customer_profile_routes.py → reads the clean layer directly)
 *
 * Returns account number, national ID (NRC), tenure, assigned RM and health
 * score. Fields no pilot source supplies yet come back as null with an
 * availability flag, so the UI can explain the gap instead of showing a dash.
 */


function _headers() {
  const token = localStorage.getItem('token') || localStorage.getItem('access_token') || '';
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers
}

/**
 * Fetch the composed profile header for one customer.
 *
 * Resolves to `null` when the customer is unknown (HTTP 404) so callers can
 * fall back to the store-driven view rather than surfacing an error.
 *
 * @param {string} customerId
 * @returns {Promise<object|null>}
 */
async function fetchCustomerProfile(customerId) {
  const res = await fetch(
    `${API_BASE_URL}/api/v1/customers/${encodeURIComponent(customerId)}/profile`,
    { headers: _headers() }
  );

  if (res.status === 404) return null
  if (!res.ok) {
    let detail = '';
    try {
      const data = await res.json();
      detail = data?.detail || data?.message || '';
    } catch { /* non-JSON error body */ }
    throw new Error(detail || `Failed to load customer profile (${res.status})`)
  }

  return res.json()
}

const _hoisted_1 = { class: "w-full pt-6 px-6 pb-8" };
const _hoisted_2 = { class: "grid grid-cols-12 gap-4 mb-6" };
const _hoisted_3 = {
  key: 1,
  class: "flex flex-col items-center justify-center min-h-[50vh] text-center"
};
const _hoisted_4 = { class: "mb-5 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3" };
const _hoisted_5 = { class: "flex items-center gap-2 text-[11px] text-gray-500 mb-1 flex-wrap" };
const _hoisted_6 = { class: "text-absa-enrich font-bold" };
const _hoisted_7 = { class: "text-[11px] text-gray-400" };
const _hoisted_8 = { key: 0 };
const _hoisted_9 = { class: "flex items-center gap-2 flex-wrap shrink-0" };
const _hoisted_10 = ["href"];
const _hoisted_11 = ["disabled"];
const _hoisted_12 = { class: "bg-white border border-gray-300 rounded-sm mb-5" };
const _hoisted_13 = { class: "p-5 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6" };
const _hoisted_14 = { class: "flex items-start gap-4 min-w-0" };
const _hoisted_15 = { class: "min-w-0" };
const _hoisted_16 = { class: "flex items-center gap-2 flex-wrap" };
const _hoisted_17 = { class: "text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400" };
const _hoisted_18 = {
  key: 0,
  class: "text-[10px] font-bold uppercase tracking-wide text-gray-500 border border-gray-300 rounded-sm px-2 py-0.5"
};
const _hoisted_19 = { class: "text-xl font-headline font-semibold text-absa-enrich leading-tight mt-1.5" };
const _hoisted_20 = { class: "text-[11px] text-gray-500 mt-1" };
const _hoisted_21 = { key: 0 };
const _hoisted_22 = { class: "grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-3 shrink-0" };
const _hoisted_23 = { class: "text-[10px] font-bold uppercase tracking-wide text-gray-400" };
const _hoisted_24 = { class: "text-xs font-semibold text-absa-enrich mt-0.5 break-words" };
const _hoisted_25 = { class: "border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5" };
const _hoisted_26 = { class: "px-5 py-4 border-b border-gray-200 sm:border-b-0 sm:border-r xl:border-r border-gray-200" };
const _hoisted_27 = { class: "text-[11px] text-gray-500 mt-0.5" };
const _hoisted_28 = { class: "px-5 py-4 border-b border-gray-200 sm:border-b-0 sm:border-r xl:border-r border-gray-200" };
const _hoisted_29 = { class: "text-[11px] text-gray-500 mt-0.5" };
const _hoisted_30 = { class: "px-5 py-4 border-b border-gray-200 sm:border-b-0 sm:border-r xl:border-r border-gray-200" };
const _hoisted_31 = { class: "text-[11px] text-gray-500 mt-0.5" };
const _hoisted_32 = { class: "px-5 py-4 border-b border-gray-200 sm:border-b-0 sm:border-r xl:border-r border-gray-200" };
const _hoisted_33 = { class: "text-[11px] text-gray-500 mt-0.5" };
const _hoisted_34 = { class: "px-5 py-4" };
const _hoisted_35 = { class: "flex items-baseline gap-1 mt-1" };
const _hoisted_36 = {
  key: 0,
  class: "text-[11px] text-gray-400"
};
const _hoisted_37 = { class: "h-1 bg-gray-200 rounded-full overflow-hidden mt-2" };
const _hoisted_38 = { class: "grid grid-cols-12 gap-4 mb-5" };
const _hoisted_39 = { class: "col-span-12 lg:col-span-6 bg-white border border-gray-300 rounded-sm p-5" };
const _hoisted_40 = { class: "flex items-center justify-between mb-1" };
const _hoisted_41 = {
  key: 0,
  class: "text-[10px] text-gray-400"
};
const _hoisted_42 = { class: "flex flex-col sm:flex-row items-center gap-5 mt-4" };
const _hoisted_43 = { class: "flex flex-col items-center" };
const _hoisted_44 = ["viewBox", "aria-label"];
const _hoisted_45 = ["cx", "cy", "r"];
const _hoisted_46 = ["cx", "cy", "r", "stroke", "stroke-dasharray", "stroke-dashoffset", "transform"];
const _hoisted_47 = ["x", "y", "fill", "font-size"];
const _hoisted_48 = ["x", "y", "fill", "font-size"];
const _hoisted_49 = { class: "flex-1 w-full space-y-3" };
const _hoisted_50 = { class: "flex items-center justify-between text-[11px] mb-1" };
const _hoisted_51 = { class: "text-gray-500 font-semibold" };
const _hoisted_52 = { class: "h-1.5 bg-gray-200 rounded-full overflow-hidden" };
const _hoisted_53 = { class: "col-span-12 lg:col-span-6 bg-white border border-gray-300 rounded-sm p-5" };
const _hoisted_54 = {
  key: 0,
  class: "space-y-4"
};
const _hoisted_55 = { class: "flex items-center justify-between mb-1" };
const _hoisted_56 = { class: "text-xs font-bold text-absa-enrich" };
const _hoisted_57 = { class: "h-1.5 bg-gray-200 rounded-full overflow-hidden mb-1.5" };
const _hoisted_58 = { class: "text-[11px] text-gray-500 leading-snug" };
const _hoisted_59 = {
  key: 1,
  class: "text-xs text-gray-500"
};
const _hoisted_60 = { class: "bg-white border border-gray-300 rounded-sm p-5 mb-5" };
const _hoisted_61 = { class: "flex items-center justify-between mb-1" };
const _hoisted_62 = { class: "text-[10px] text-gray-400" };
const _hoisted_63 = {
  key: 0,
  class: "mt-6 overflow-x-auto pb-2"
};
const _hoisted_64 = { class: "flex items-start min-w-[560px]" };
const _hoisted_65 = { class: "flex flex-col items-center flex-1 min-w-[92px]" };
const _hoisted_66 = { class: "text-[10px] font-semibold text-gray-500 mt-0.5 uppercase tracking-wide" };
const _hoisted_67 = {
  key: 1,
  class: "text-xs text-gray-500 mt-4"
};
const _hoisted_68 = { class: "grid grid-cols-12 gap-4" };
const _hoisted_69 = {
  class: "col-span-12 lg:col-span-4 rounded-sm p-5 text-white",
  style: {"background":"linear-gradient(135deg, #77021E 0%, #3d0110 55%, #131010 100%)"}
};
const _hoisted_70 = { class: "flex items-center justify-between mb-4" };
const _hoisted_71 = { class: "text-[10px] font-bold uppercase tracking-widest" };
const _hoisted_72 = {
  key: 0,
  class: "text-[10px] font-bold uppercase tracking-widest"
};
const _hoisted_73 = { class: "flex items-start gap-4" };
const _hoisted_74 = { class: "w-12 h-12 rounded-full bg-white/10 border border-white/30 flex items-center justify-center shrink-0" };
const _hoisted_75 = { class: "material-symbols-outlined text-[26px]" };
const _hoisted_76 = { class: "min-w-0" };
const _hoisted_77 = { class: "text-sm font-bold" };
const _hoisted_78 = { class: "text-[11px] text-white/70 mt-0.5" };
const _hoisted_79 = { class: "text-xs text-white/85 mt-4 leading-relaxed" };
const _hoisted_80 = { class: "flex items-center gap-2 mt-5" };
const _hoisted_81 = ["disabled"];
const _hoisted_82 = ["disabled"];
const _hoisted_83 = { class: "col-span-12 lg:col-span-8 bg-white border border-gray-300 rounded-sm p-5" };
const _hoisted_84 = { class: "flex items-center justify-between mb-4" };
const _hoisted_85 = ["value"];
const _hoisted_86 = {
  key: 0,
  class: "space-y-4 max-h-[320px] overflow-y-auto pr-1"
};
const _hoisted_87 = { class: "flex flex-col items-center pt-1" };
const _hoisted_88 = { class: "pb-1 min-w-0" };
const _hoisted_89 = { class: "flex items-center gap-2 flex-wrap" };
const _hoisted_90 = { class: "text-xs font-bold text-absa-enrich" };
const _hoisted_91 = { class: "text-[10px] text-gray-400" };
const _hoisted_92 = { class: "text-[11px] text-gray-500 mt-0.5" };
const _hoisted_93 = {
  key: 0,
  class: "text-[10px] text-gray-400"
};
const _hoisted_94 = {
  key: 1,
  class: "text-xs text-gray-500"
};
const _hoisted_95 = ["onKeydown"];

const TWELVE_MONTHS_MS = 365 * 24 * 60 * 60 * 1000;

const RING_SIZE = 132;
const RING_STROKE = 11;

const _sfc_main = /*@__PURE__*/Object.assign({ name: 'CustomerProfile' }, {
  __name: 'CustomerProfile',
  setup(__props) {

/**
 * Customer Profile — single-customer predictive profile.
 *
 * Pairs with the My Customers list: identity/predictive-insight cards on top,
 * the 12-month lifecycle journey, the AI next-best-action card, and the
 * per-customer action history below.
 */


const route = useRoute();
const router = useRouter();
const customerStore = useCustomerStore();
const predictionStore = usePredictionStore();
const snapshotStore = useSnapshotStore();

const api = axios.create({ baseURL: API_BASE_URL, timeout: 30000 });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config
});

const loading = ref(true);
const reasonCodes = ref([]);
const recommendations = ref([]);
const actionLog = ref([]);
const historyFilter = ref('');
const nbaDismissed = ref(false);
const localState = ref(null);
// Identity facts composed server-side from the clean layer (account number,
// national ID, tenure, assigned RM, health score).
const profile = ref(null);

const customerId = computed(() => String(route.params.id || ''));
const customer = computed(() => customerStore.selectedCustomer || {});
// The identity header comes from Postgres, so the page stays useful even when
// the customer-state / prediction services are unreachable.
const isEmpty = computed(() => !loading.value && !customerStore.selectedCustomer && !profile.value);
const features = computed(() => customerStore.features || {});

const displayName = computed(
  () => profile.value?.full_name || customer.value.fullName || `Customer ${customerId.value}`
);
const state = computed(
  () => profile.value?.lifecycle_state || customer.value.state || 'UNKNOWN'
);
const stateColor = computed(() => tierColor(stateTier(state.value)));

const initials = computed(() => {
  const name = displayName.value.replace(/^Customer\s+/i, '');
  return name.slice(0, 2).toUpperCase() || 'CU'
});

const clientTier = computed(() => {
  const code = customer.value.segmentCode;
  if (['Prestige', 'Premier'].includes(code)) return 'Verified Private Client'
  return profile.value?.market_segment || customer.value.segmentLabel || ''
});

const healthScore = computed(() => {
  const fromProfile = profile.value?.health_score;
  if (fromProfile != null) return fromProfile
  const h = predictionStore.healthScores[customerId.value]?.health_score;
  if (h != null) return h
  return customer.value.healthScore ?? null
});

const churnProbability = computed(() => {
  const p = predictionStore.predictions[customerId.value];
  const value = p?.churn_probability ?? customer.value.churnProbability;
  return value == null ? null : Number(value)
});

const clvPercentile = computed(() => {
  const p = predictionStore.predictions[customerId.value];
  return p?.clv_percentile ?? null
});

const components = computed(() => {
  const h = predictionStore.healthScores[customerId.value];
  return h?.component_scores || customer.value._raw?.component_scores || {}
});

const computedAt = computed(() => customer.value._raw?.computed_at || customer.value.computedAt || null);

const timelineEntries = computed(() => {
  const raw = customerStore.timeline;
  return Array.isArray(raw) ? raw : (raw?.timeline || [])
});

const stateSince = computed(() => {
  const entries = timelineEntries.value;
  if (!entries.length) return null
  const current = entries.filter((e) => e.state === state.value);
  return (current.length ? current[current.length - 1] : entries[entries.length - 1]).as_of_date
});

const tenureLabel = computed(() => {
  const days = features.value.customer_tenure_days;
  if (days != null) {
    const years = days / 365;
    return years >= 1 ? `${years.toFixed(0)} Years` : `${Math.round(days / 30)} Months`
  }
  const entries = timelineEntries.value;
  if (entries.length) {
    const sorted = [...entries].sort((a, b) => new Date(a.as_of_date) - new Date(b.as_of_date));
    const first = new Date(sorted[0].as_of_date);
    const months = Math.max(1, Math.round((Date.now() - first.getTime()) / TWELVE_MONTHS_MS * 12));
    return months >= 12 ? `${(months / 12).toFixed(0)} Years` : `${months} Months`
  }
  return '—'
});

const assignedRm = computed(() => {
  const fromProfile = profile.value?.assigned_rm;
  if (fromProfile) return fromProfile
  const s = localState.value || getCustomerState(customerId.value);
  return s?.rm || customer.value._raw?.assigned_rm || null
});

// ── Headline identity facts (account, NRC, tenure, RM, health) ──
const accountNumber = computed(() => profile.value?.account_number || customer.value._raw?.account_number || null);

const accountSub = computed(() => {
  const type = profile.value?.account_type;
  const count = profile.value?.account_count;
  if (!accountNumber.value) return 'No account on record'
  const parts = [];
  if (type) parts.push(prettify(type));
  if (count > 1) parts.push(`${count} accounts held`);
  return parts.join(' · ') || null
});

const nationalId = computed(() => profile.value?.national_id || customer.value._raw?.national_id || null);

const tenureText = computed(() => profile.value?.tenure_label || (tenureLabel.value !== '—' ? tenureLabel.value : null));

const tenureSub = computed(() => {
  const since = profile.value?.customer_since_date || customer.value._raw?.customer_since_date;
  return since ? `Since ${fmtDate(since)}` : null
});

const assignedRmSub = computed(() => (assignedRm.value ? 'Relationship Manager' : 'Not yet assigned'));

const ageText = computed(() => {
  const age = profile.value?.age_years;
  return age != null ? `${age} years old` : null
});

const lastActivityText = computed(() => {
  const days = features.value.days_since_last_txn;
  if (days == null) return '—'
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  return `${days} days ago`
});

const healthTileLabel = computed(() => (hasHealth.value ? ringTierLabel.value : 'Not available'));

const detailFields = computed(() => {
  features.value;
  return [
    { label: 'Branch', value: profile.value?.branch_code || customer.value.branch || '—' },
    { label: 'Segment', value: profile.value?.market_segment || customer.value.segmentLabel || '—' },
    { label: 'KYC Tier', value: profile.value?.kyc_tier || '—' },
    { label: 'Nationality', value: profile.value?.nationality || '—' },
    { label: 'Last Activity', value: lastActivityText.value },
    { label: 'Lifecycle State', value: String(state.value).replace(/_/g, ' ') },
  ]
});

// ── Health-score ring (inline SVG) ──────────────────────────────
const ringValue = computed(() => {
  const n = Number(healthScore.value);
  return Number.isFinite(n) ? Math.min(100, Math.max(0, n)) : 0
});
const hasHealth = computed(() => healthScore.value != null && Number.isFinite(Number(healthScore.value)));
const ringColor = computed(() => tierColor(healthTier(ringValue.value)));
const ringTierLabel = computed(() => {
  if (!hasHealth.value) return 'No Data'
  const s = ringValue.value;
  if (s < 25) return 'Critical'
  if (s < 40) return 'High Risk'
  if (s < 60) return 'Watch'
  if (s < 80) return 'Healthy'
  return 'Thriving'
});
const ringRadius = computed(() => (RING_SIZE - RING_STROKE) / 2);
const ringCircumference = computed(() => 2 * Math.PI * ringRadius.value);
const ringDashOffset = computed(() => ringCircumference.value * (1 - ringValue.value / 100));

const insightMetrics = computed(() => {
  const c = components.value;
  const churnPct = churnProbability.value != null ? (churnProbability.value * 100) : null;
  const clvPct = clvPercentile.value != null ? Math.round(clvPercentile.value * 100) : null;
  const behaviour = c.behaviour_sub ?? features.value.engagement_score ?? null;
  return [
    {
      label: 'Churn Risk',
      value: churnPct != null ? (churnPct >= 60 ? 'High' : churnPct >= 30 ? 'Medium' : 'Low') + ` (${churnPct.toFixed(1)}%)` : '—',
      pct: churnPct ?? 0,
      color: tierColor(churnTier(churnProbability.value)),
    },
    {
      label: 'CLV Percentile',
      value: clvPct != null ? `${clvPct}th` : '—',
      pct: clvPct ?? 0,
      color: tierColor('passion'),
    },
    {
      label: 'Behavioural Score',
      value: behaviour != null ? (Number(behaviour) < 40 ? 'Low' : Number(behaviour) < 70 ? 'Moderate' : 'High') + ` (${Math.round(behaviour)})` : '—',
      pct: behaviour != null ? Math.min(100, Math.max(0, Number(behaviour))) : 0,
      color: behaviour != null && Number(behaviour) < 40 ? tierColor('inspire') : tierColor(healthTier(behaviour)),
    },
  ]
});

const riskDrivers = computed(() => {
  const risks = reasonCodes.value.filter((r) => r.category === 'RISK' && r.severity !== 'LOW');
  if (risks.length) {
    return risks.slice(0, 4).map((r) => {
      const color = r.severity === 'HIGH' ? tierColor('inspire') : tierColor('hope');
      return {
        label: prettify(r.code),
        value: r.severity,
        pct: r.severity === 'HIGH' ? 92 : r.severity === 'MEDIUM' ? 60 : 30,
        color,
        detail: detailText(r.detail) || 'Flagged by the lifecycle reason-code engine.',
      }
    })
  }
  // Fallback: derive drivers from the behavioural feature snapshot.
  const f = features.value;
  const derived = [];
  if (f.days_since_last_txn != null && f.days_since_last_txn > 30) {
    derived.push({
      label: 'Digital / Transaction Recency',
      value: `${f.days_since_last_txn}d`,
      pct: Math.min(100, (f.days_since_last_txn / 180) * 100),
      color: tierColor('hope'),
      detail: `No transaction activity recorded for ${f.days_since_last_txn} days.`,
    });
  }
  if (f.amount_growth_ratio != null && f.amount_growth_ratio < 0) {
    derived.push({
      label: 'Transaction Value Trend',
      value: `${(f.amount_growth_ratio * 100).toFixed(0)}%`,
      pct: Math.min(100, Math.abs(f.amount_growth_ratio) * 100),
      color: tierColor('inspire'),
      detail: 'Decline in transaction value versus the previous window.',
    });
  }
  if (f.engagement_score != null && f.engagement_score < 40) {
    derived.push({
      label: 'Engagement',
      value: `${Math.round(f.engagement_score)}/100`,
      pct: Math.max(8, 100 - f.engagement_score),
      color: tierColor('hope'),
      detail: 'Low digital engagement relative to the portfolio average.',
    });
  }
  if (f.txn_frequency_trend != null && f.txn_frequency_trend < 0) {
    derived.push({
      label: 'Transaction Frequency',
      value: `${(f.txn_frequency_trend * 100).toFixed(0)}%`,
      pct: Math.min(100, Math.abs(f.txn_frequency_trend) * 100),
      color: tierColor('power'),
      detail: 'Fewer transactions than the prior period.',
    });
  }
  return derived.slice(0, 4)
});

const journeyNodes = computed(() => {
  const entries = [...timelineEntries.value]
    .filter((e) => e.as_of_date)
    .sort((a, b) => new Date(a.as_of_date) - new Date(b.as_of_date));
  const cutoff = Date.now() - TWELVE_MONTHS_MS;
  const recent = entries.filter((e) => new Date(e.as_of_date).getTime() >= cutoff);
  const source = recent.length ? recent : entries.slice(-6);
  if (!source.length) return []

  // Collapse consecutive duplicate states, always keeping the latest snapshot.
  const collapsed = [];
  for (const e of source) {
    if (!collapsed.length || collapsed[collapsed.length - 1].state !== e.state) collapsed.push(e);
  }
  const last = source[source.length - 1];
  if (collapsed[collapsed.length - 1] !== last) collapsed.push(last);

  return collapsed.slice(-6).map((e, i, arr) => ({
    label: String(e.state || '—').replace(/_/g, ' '),
    color: tierColor(stateTier(e.state)),
    when: relativeMonths(e.as_of_date),
    isCurrent: i === arr.length - 1,
  }))
});

const nba = computed(() => {
  const top = recommendations.value[0];
  const churn = churnProbability.value;
  const confidence = top?.propensity_score != null
    ? Math.round(top.propensity_score * 100)
    : churn != null ? Math.round(Math.min(0.95, 0.55 + churn * 0.45) * 100) : null;

  if (top) {
    const product = top.product_name || top.campaign_name || 'Retention offer';
    return {
      priority: 'I',
      confidence,
      icon: 'phone_in_talk',
      title: top.campaign_name || `Offer ${product}`,
      source: 'AI-Lifecycle Engine',
      rationale: top.reason || `Customer qualifies for ${product} based on current lifecycle signals and product propensity.`,
    }
  }

  const fallback = {
    CHURNED: {
      title: 'Immediate Retention',
      icon: 'phone_in_talk',
      rationale: 'Customer has churned. A win-back conversation with a tailored loyalty offer has the highest probability of re-engagement within 48 hours.',
    },
    DORMANT: {
      title: 'Re-engagement Outreach',
      icon: 'campaign',
      rationale: 'Customer has been dormant for an extended period. A proactive re-engagement call with a personalised offer is recommended.',
    },
    AT_RISK: {
      title: 'Retention Call',
      icon: 'support_agent',
      rationale: 'Customer is showing early signs of disengagement. A retention call with a relationship-manager offer is recommended.',
    },
    ACTIVE: {
      title: 'Relationship Review',
      icon: 'handshake',
      rationale: 'Customer is active. Review product holdings for cross-sell and deepen the relationship.',
    },
  }[state.value] || {
    title: 'Monitor & Review',
    icon: 'visibility',
    rationale: 'No immediate intervention required. Continue monitoring lifecycle signals.',
  };
  return { priority: 'I', confidence, source: 'AI-Lifecycle Engine', ...fallback }
});

const historyEntries = computed(() => {
  return actionLog.value
    .filter((a) => !a.customerId || a.customerId === customerId.value)
    .map((a) => ({
      id: a.id,
      title: prettify(a.type || 'Action'),
      at: a.at,
      detail: a.detail || a.meta?.reason || 'Logged by the relationship manager.',
      actor: a.actor,
    }))
});

const historyTypes = computed(() => [...new Set(historyEntries.value.map((h) => h.title))]);

const filteredHistory = computed(() =>
  historyFilter.value ? historyEntries.value.filter((h) => h.title === historyFilter.value) : historyEntries.value
);

const coreBankingUrl = computed(() =>
  `https://corebanking.absa.local/customer/${encodeURIComponent(customerId.value)}`
);

// ── Helpers ────────────────────────────────────────────────────
function prettify(code) {
  return String(code || '')
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim()
}

function detailText(detail) {
  if (!detail || typeof detail !== 'object' || !Object.keys(detail).length) return ''
  return Object.entries(detail)
    .map(([k, v]) => `${k.replace(/_/g, ' ')}: ${typeof v === 'number' ? (Number.isInteger(v) ? v : v.toFixed(2)) : v}`)
    .join(' · ')
}

function fmtDate(value) {
  if (!value) return '—'
  try { return new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) } catch { return String(value) }
}

function relativeMonths(value) {
  const ms = Date.now() - new Date(value).getTime();
  const months = Math.round(ms / (30 * 24 * 60 * 60 * 1000));
  if (months <= 0) return 'Now'
  return `${months}m ago`
}

// ── Actions ────────────────────────────────────────────────────
async function copyId() {
  try {
    await navigator.clipboard.writeText(customerId.value);
    notify(`Customer ID ${customerId.value} copied`, 'success', { autoClose: 2000 });
  } catch {
    notify('Could not copy — clipboard unavailable', 'error', { autoClose: 2500 });
  }
}
// ── Delete (soft, reversible) ─────────────────────────────
// Deletion is restricted to OPERATIONS on the backend (ADMIN bypasses). This
// only decides whether the control renders — the server still enforces it.
const canDelete = computed(() => {
  try {
    const jwt = decodeJWT();
    const roles = jwt.getUserRoles?.() || [jwt.getUserRole?.()].filter(Boolean);
    return roles
      .map((r) => String(r).toUpperCase())
      .some((r) => ['ADMIN', 'OPERATIONS'].includes(r))
  } catch {
    return false
  }
});

const confirmOpen = ref(false);
const deleteReason = ref('');
const deleting = ref(false);

function askDelete() {
  deleteReason.value = '';
  confirmOpen.value = true;
}

function cancelDelete() {
  confirmOpen.value = false;
  deleteReason.value = '';
}

async function confirmDelete() {
  if (deleting.value) return
  deleting.value = true;
  try {
    const result = await deleteCustomer(customerId.value, deleteReason.value.trim() || undefined);
    confirmOpen.value = false;

    if (!result.deleted) {
      notify(
        result.already_deleted?.length
          ? 'That customer was already deleted'
          : `Customer ${customerId.value} was not found`,
        'error',
        { autoClose: 4000 },
      );
      return
    }

    // The profile 404s once flagged, so this page can no longer render the
    // record — leave before the page refetches anything.
    notify(
      `Deleted ${displayName.value} — hidden from the portfolio and restorable from My Customers`,
      'success',
      { autoClose: 5000 },
    );
    await customerStore.fetchPortfolio();
    router.push({ name: 'MyCustomers' });
  } catch (e) {
    notify(e.message || 'Delete failed', 'error', { autoClose: 6000 });
  } finally {
    deleting.value = false;
  }
}
function logAction() {
  const entry = recordAction({
    type: nba.value.title,
    customerId: customerId.value,
    customerName: displayName.value,
    detail: nba.value.rationale,
    meta: { confidence: nba.value.confidence, source: nba.value.source },
  });
  actionLog.value = [entry, ...actionLog.value];
  notify(`Action logged for ${displayName.value}`, 'success', { autoClose: 2500 });
}

function dismissAction() {
  nbaDismissed.value = true;
  recordAction({
    type: 'Recommendation Dismissed',
    customerId: customerId.value,
    customerName: displayName.value,
    detail: `Dismissed "${nba.value.title}" — RM discretion.`,
  });
  notify('Recommendation dismissed', 'info', { autoClose: 2500 });
}

// ── Effects ────────────────────────────────────────────────────
onMounted(async () => {
  loading.value = true;
  const id = customerId.value;
  if (!id) { loading.value = false; return }

  actionLog.value = getActionLog();

  await Promise.allSettled([
    customerStore.fetchCustomerDetail(id),
    customerStore.fetchCustomerTimeline(id),
    customerStore.fetchCustomerFeatures(id),
    predictionStore.fetchPrediction(id),
    predictionStore.fetchHealthScore(id),
    hydrateLogFromServer(50).then(() => { actionLog.value = getActionLog(); }),
    // Identity header (account number, NRC, tenure, assigned RM, health).
    // A 404 resolves to null rather than failing the whole page.
    fetchCustomerProfile(id)
      .then((data) => { profile.value = data; })
      .catch((e) => { console.warn('customer profile header failed:', e.message); }),
  ]);

  localState.value = getCustomerState(id);
  loading.value = false;

  await Promise.allSettled([
    (async () => {
      try {
        const { data } = await api.get(`/api/v1/insights/reason-codes/${id}`, { params: { as_of_date: snapshotStore.asOfDate } });
        reasonCodes.value = data.reason_codes || [];
      } catch (e) { console.warn('reason-codes failed:', e.message); }
    })(),
    (async () => {
      try {
        const { data } = await api.get(`/api/v1/recommendations/${id}`, { params: { as_of_date: snapshotStore.asOfDate } });
        recommendations.value = data.recommendations || [];
      } catch (e) { console.warn('recommendations failed:', e.message); }
    })(),
  ]);
});

return (_ctx, _cache) => {
  const _component_router_link = resolveComponent("router-link");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    (loading.value)
      ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          _cache[2] || (_cache[2] = createBaseVNode("div", { class: "mb-6 h-5 bg-white rounded-sm w-1/3 animate-pulse" }, null, -1)),
          createBaseVNode("div", _hoisted_2, [
            (openBlock(), createElementBlock(Fragment, null, renderList(3, (i) => {
              return createBaseVNode("div", {
                key: i,
                class: "col-span-12 lg:col-span-4"
              }, [
                createVNode(_sfc_main$3, { type: "block" })
              ])
            }), 64))
          ]),
          createVNode(_sfc_main$3, { type: "block" })
        ], 64))
      : (!customerId.value || isEmpty.value)
        ? (openBlock(), createElementBlock("div", _hoisted_3, [
            _cache[4] || (_cache[4] = createBaseVNode("div", { class: "w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4" }, [
              createBaseVNode("span", { class: "material-symbols-outlined text-amber-600 text-[32px]" }, "person_off")
            ], -1)),
            _cache[5] || (_cache[5] = createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich mb-2" }, "Customer Not Found", -1)),
            _cache[6] || (_cache[6] = createBaseVNode("p", { class: "text-xs text-gray-500 max-w-md" }, "No profile is available for this customer.", -1)),
            createVNode(_component_router_link, {
              to: "/dashboard/customers",
              class: "mt-6 bg-absa-passion text-white text-xs font-bold py-2.5 px-5 rounded-sm hover:bg-absa-power transition-colors"
            }, {
              default: withCtx(() => [...(_cache[3] || (_cache[3] = [
                createTextVNode("Back to My Customers", -1)
              ]))]),
              _: 1
            })
          ]))
        : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("div", null, [
                createBaseVNode("div", _hoisted_5, [
                  createVNode(_component_router_link, {
                    to: "/dashboard/portfolio",
                    class: "hover:text-absa-passion"
                  }, {
                    default: withCtx(() => [...(_cache[7] || (_cache[7] = [
                      createTextVNode("Home", -1)
                    ]))]),
                    _: 1
                  }),
                  _cache[9] || (_cache[9] = createBaseVNode("span", null, "/", -1)),
                  createVNode(_component_router_link, {
                    to: "/dashboard/customers",
                    class: "hover:text-absa-passion"
                  }, {
                    default: withCtx(() => [...(_cache[8] || (_cache[8] = [
                      createTextVNode("My Customers", -1)
                    ]))]),
                    _: 1
                  }),
                  _cache[10] || (_cache[10] = createBaseVNode("span", null, "/", -1)),
                  createBaseVNode("span", _hoisted_6, toDisplayString(displayName.value) + " (ID: " + toDisplayString(customerId.value) + ")", 1)
                ]),
                createBaseVNode("p", _hoisted_7, [
                  createTextVNode(" Snapshot " + toDisplayString(fmtDate(profile.value?.snapshot_date || computedAt.value)) + " ", 1),
                  (stateSince.value)
                    ? (openBlock(), createElementBlock("span", _hoisted_8, " · Lifecycle state since " + toDisplayString(fmtDate(stateSince.value)), 1))
                    : createCommentVNode("", true)
                ])
              ]),
              createBaseVNode("div", _hoisted_9, [
                createBaseVNode("a", {
                  href: coreBankingUrl.value,
                  target: "_blank",
                  rel: "noopener",
                  class: "px-4 py-2.5 bg-absa-passion text-white rounded-sm flex items-center gap-2 hover:bg-absa-power transition-colors text-xs font-bold"
                }, [...(_cache[11] || (_cache[11] = [
                  createBaseVNode("span", { class: "material-symbols-outlined text-[18px]" }, "open_in_new", -1),
                  createTextVNode(" View in Core Banking ", -1)
                ]))], 8, _hoisted_10),
                createVNode(_component_router_link, {
                  to: `/dashboard/customer/${customerId.value}`,
                  class: "px-4 py-2.5 bg-white text-absa-enrich border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors text-xs font-bold flex items-center gap-2"
                }, {
                  default: withCtx(() => [...(_cache[12] || (_cache[12] = [
                    createBaseVNode("span", { class: "material-symbols-outlined text-[18px]" }, "analytics", -1),
                    createTextVNode(" Full Analytics ", -1)
                  ]))]),
                  _: 1
                }, 8, ["to"]),
                createBaseVNode("button", {
                  class: "px-4 py-2.5 bg-white text-absa-enrich border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors text-xs font-bold flex items-center gap-2",
                  onClick: copyId
                }, [...(_cache[13] || (_cache[13] = [
                  createBaseVNode("span", { class: "material-symbols-outlined text-[18px]" }, "content_copy", -1),
                  createTextVNode(" Copy ID ", -1)
                ]))]),
                (canDelete.value)
                  ? (openBlock(), createElementBlock("button", {
                      key: 0,
                      class: "px-4 py-2.5 bg-white text-absa-passion border border-red-200 rounded-sm hover:bg-red-50 transition-colors text-xs font-bold flex items-center gap-2",
                      disabled: deleting.value,
                      onClick: askDelete
                    }, [...(_cache[14] || (_cache[14] = [
                      createBaseVNode("span", { class: "material-symbols-outlined text-[18px]" }, "delete", -1),
                      createTextVNode(" Delete customer ", -1)
                    ]))], 8, _hoisted_11))
                  : createCommentVNode("", true)
              ])
            ]),
            createBaseVNode("section", _hoisted_12, [
              createBaseVNode("div", _hoisted_13, [
                createBaseVNode("div", _hoisted_14, [
                  createBaseVNode("div", {
                    class: "w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold shrink-0",
                    style: normalizeStyle({ background: stateColor.value })
                  }, toDisplayString(initials.value), 5),
                  createBaseVNode("div", _hoisted_15, [
                    createBaseVNode("div", _hoisted_16, [
                      createBaseVNode("span", _hoisted_17, toDisplayString(customerId.value), 1),
                      createVNode(_sfc_main$1, { state: state.value }, null, 8, ["state"]),
                      (clientTier.value)
                        ? (openBlock(), createElementBlock("span", _hoisted_18, toDisplayString(clientTier.value), 1))
                        : createCommentVNode("", true)
                    ]),
                    createBaseVNode("h1", _hoisted_19, toDisplayString(displayName.value), 1),
                    createBaseVNode("p", _hoisted_20, [
                      (ageText.value)
                        ? (openBlock(), createElementBlock("span", _hoisted_21, toDisplayString(ageText.value) + " · ", 1))
                        : createCommentVNode("", true),
                      createTextVNode(" Profile snapshot " + toDisplayString(fmtDate(profile.value?.snapshot_date || computedAt.value)), 1)
                    ])
                  ])
                ]),
                createBaseVNode("dl", _hoisted_22, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(detailFields.value, (f) => {
                    return (openBlock(), createElementBlock("div", {
                      key: f.label
                    }, [
                      createBaseVNode("dt", _hoisted_23, toDisplayString(f.label), 1),
                      createBaseVNode("dd", _hoisted_24, toDisplayString(f.value), 1)
                    ]))
                  }), 128))
                ])
              ]),
              createBaseVNode("div", _hoisted_25, [
                createBaseVNode("div", _hoisted_26, [
                  _cache[15] || (_cache[15] = createBaseVNode("p", { class: "text-[10px] font-bold uppercase tracking-widest text-gray-400" }, "Account Number", -1)),
                  createBaseVNode("p", {
                    class: normalizeClass(["mt-1 text-sm font-bold font-mono break-all", accountNumber.value ? 'text-absa-enrich' : 'text-gray-400 font-normal italic'])
                  }, toDisplayString(accountNumber.value || 'Not on file'), 3),
                  createBaseVNode("p", _hoisted_27, toDisplayString(accountSub.value), 1)
                ]),
                createBaseVNode("div", _hoisted_28, [
                  _cache[16] || (_cache[16] = createBaseVNode("p", { class: "text-[10px] font-bold uppercase tracking-widest text-gray-400" }, "ID Number (NRC)", -1)),
                  createBaseVNode("p", {
                    class: normalizeClass(["mt-1 text-sm font-bold font-mono break-all", nationalId.value ? 'text-absa-enrich' : 'text-gray-400 font-normal italic'])
                  }, toDisplayString(nationalId.value || 'Not on file'), 3),
                  createBaseVNode("p", _hoisted_29, toDisplayString(nationalId.value ? 'Verified identifier' : 'Awaiting source feed'), 1)
                ]),
                createBaseVNode("div", _hoisted_30, [
                  _cache[17] || (_cache[17] = createBaseVNode("p", { class: "text-[10px] font-bold uppercase tracking-widest text-gray-400" }, "Tenure", -1)),
                  createBaseVNode("p", {
                    class: normalizeClass(["mt-1 text-sm font-bold", tenureText.value ? 'text-absa-enrich' : 'text-gray-400 font-normal italic'])
                  }, toDisplayString(tenureText.value || 'Not available'), 3),
                  createBaseVNode("p", _hoisted_31, toDisplayString(tenureSub.value || 'Customer since date missing'), 1)
                ]),
                createBaseVNode("div", _hoisted_32, [
                  _cache[18] || (_cache[18] = createBaseVNode("p", { class: "text-[10px] font-bold uppercase tracking-widest text-gray-400" }, "Assigned RM", -1)),
                  createBaseVNode("p", {
                    class: normalizeClass(["mt-1 text-sm font-bold", assignedRm.value ? 'text-absa-enrich' : 'text-gray-400 font-normal italic'])
                  }, toDisplayString(assignedRm.value || 'Unassigned'), 3),
                  createBaseVNode("p", _hoisted_33, toDisplayString(assignedRmSub.value), 1)
                ]),
                createBaseVNode("div", _hoisted_34, [
                  _cache[19] || (_cache[19] = createBaseVNode("p", { class: "text-[10px] font-bold uppercase tracking-widest text-gray-400" }, "Health Score", -1)),
                  createBaseVNode("div", _hoisted_35, [
                    createBaseVNode("span", {
                      class: "text-lg font-bold font-mono leading-none",
                      style: normalizeStyle({ color: hasHealth.value ? ringColor.value : '#9ca3af' })
                    }, toDisplayString(hasHealth.value ? Math.round(ringValue.value) : '—'), 5),
                    (hasHealth.value)
                      ? (openBlock(), createElementBlock("span", _hoisted_36, "/ 100"))
                      : createCommentVNode("", true)
                  ]),
                  createBaseVNode("div", _hoisted_37, [
                    createBaseVNode("div", {
                      class: "h-full rounded-full transition-all",
                      style: normalizeStyle({ width: (hasHealth.value ? ringValue.value : 0) + '%', background: ringColor.value })
                    }, null, 4)
                  ]),
                  createBaseVNode("p", {
                    class: "text-[11px] font-semibold mt-1",
                    style: normalizeStyle({ color: hasHealth.value ? ringColor.value : '#9ca3af' })
                  }, toDisplayString(healthTileLabel.value), 5)
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_38, [
              createBaseVNode("section", _hoisted_39, [
                createBaseVNode("div", _hoisted_40, [
                  _cache[20] || (_cache[20] = createBaseVNode("h2", { class: "text-[11px] font-bold uppercase tracking-wider text-gray-500" }, "Predictive Insights", -1)),
                  (profile.value?.snapshot_date || computedAt.value)
                    ? (openBlock(), createElementBlock("span", _hoisted_41, " Updated " + toDisplayString(fmtDate(profile.value?.snapshot_date || computedAt.value)), 1))
                    : createCommentVNode("", true)
                ]),
                createBaseVNode("div", _hoisted_42, [
                  createBaseVNode("div", _hoisted_43, [
                    (openBlock(), createElementBlock("svg", {
                      width: RING_SIZE,
                      height: RING_SIZE,
                      viewBox: `0 0 ${RING_SIZE} ${RING_SIZE}`,
                      role: "img",
                      "aria-label": `AI health score ${hasHealth.value ? Math.round(ringValue.value) : 'unavailable'}`
                    }, [
                      createBaseVNode("circle", {
                        cx: RING_SIZE / 2,
                        cy: RING_SIZE / 2,
                        r: ringRadius.value,
                        fill: "none",
                        stroke: "#e9e7e7",
                        "stroke-width": RING_STROKE
                      }, null, 8, _hoisted_45),
                      (hasHealth.value)
                        ? (openBlock(), createElementBlock("circle", {
                            key: 0,
                            cx: RING_SIZE / 2,
                            cy: RING_SIZE / 2,
                            r: ringRadius.value,
                            fill: "none",
                            stroke: ringColor.value,
                            "stroke-width": RING_STROKE,
                            "stroke-linecap": "round",
                            "stroke-dasharray": ringCircumference.value,
                            "stroke-dashoffset": ringDashOffset.value,
                            transform: `rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`,
                            style: {"transition":"stroke-dashoffset 600ms ease"}
                          }, null, 8, _hoisted_46))
                        : createCommentVNode("", true),
                      createBaseVNode("text", {
                        x: RING_SIZE / 2,
                        y: RING_SIZE / 2 - 2,
                        "text-anchor": "middle",
                        "dominant-baseline": "middle",
                        fill: hasHealth.value ? ringColor.value : '#9ca3af',
                        "font-size": RING_SIZE * 0.26,
                        "font-weight": "700"
                      }, toDisplayString(hasHealth.value ? Math.round(ringValue.value) : '—'), 9, _hoisted_47),
                      createBaseVNode("text", {
                        x: RING_SIZE / 2,
                        y: RING_SIZE / 2 + RING_SIZE * 0.17,
                        "text-anchor": "middle",
                        "dominant-baseline": "middle",
                        fill: hasHealth.value ? ringColor.value : '#9ca3af',
                        "font-size": RING_SIZE * 0.085,
                        "font-weight": "700",
                        "letter-spacing": "0.5"
                      }, toDisplayString(ringTierLabel.value.toUpperCase()), 9, _hoisted_48)
                    ], 8, _hoisted_44)),
                    _cache[21] || (_cache[21] = createBaseVNode("span", { class: "text-[10px] text-gray-400 mt-1" }, "AI Health Score", -1))
                  ]),
                  createBaseVNode("div", _hoisted_49, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(insightMetrics.value, (m) => {
                      return (openBlock(), createElementBlock("div", {
                        key: m.label
                      }, [
                        createBaseVNode("div", _hoisted_50, [
                          createBaseVNode("span", _hoisted_51, toDisplayString(m.label), 1),
                          createBaseVNode("span", {
                            class: "font-bold",
                            style: normalizeStyle({ color: m.color })
                          }, toDisplayString(m.value), 5)
                        ]),
                        createBaseVNode("div", _hoisted_52, [
                          createBaseVNode("div", {
                            class: "h-full rounded-full",
                            style: normalizeStyle({ width: m.pct + '%', background: m.color })
                          }, null, 4)
                        ])
                      ]))
                    }), 128))
                  ])
                ])
              ]),
              createBaseVNode("section", _hoisted_53, [
                _cache[22] || (_cache[22] = createBaseVNode("h2", { class: "text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-4" }, "Key Risk Drivers", -1)),
                (riskDrivers.value.length)
                  ? (openBlock(), createElementBlock("div", _hoisted_54, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(riskDrivers.value, (d) => {
                        return (openBlock(), createElementBlock("div", {
                          key: d.label
                        }, [
                          createBaseVNode("div", _hoisted_55, [
                            createBaseVNode("span", _hoisted_56, toDisplayString(d.label), 1),
                            createBaseVNode("span", {
                              class: "text-[11px] font-bold font-mono",
                              style: normalizeStyle({ color: d.color })
                            }, toDisplayString(d.value), 5)
                          ]),
                          createBaseVNode("div", _hoisted_57, [
                            createBaseVNode("div", {
                              class: "h-full rounded-full",
                              style: normalizeStyle({ width: d.pct + '%', background: d.color })
                            }, null, 4)
                          ]),
                          createBaseVNode("p", _hoisted_58, toDisplayString(d.detail), 1)
                        ]))
                      }), 128))
                    ]))
                  : (openBlock(), createElementBlock("p", _hoisted_59, "No material risk drivers detected for this customer."))
              ])
            ]),
            createBaseVNode("section", _hoisted_60, [
              createBaseVNode("div", _hoisted_61, [
                _cache[23] || (_cache[23] = createBaseVNode("h2", { class: "text-[11px] font-bold uppercase tracking-wider text-gray-500" }, "Lifecycle Journey (12 Months)", -1)),
                createBaseVNode("span", _hoisted_62, toDisplayString(journeyNodes.value.length) + " snapshots", 1)
              ]),
              (journeyNodes.value.length)
                ? (openBlock(), createElementBlock("div", _hoisted_63, [
                    createBaseVNode("div", _hoisted_64, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(journeyNodes.value, (n, i) => {
                        return (openBlock(), createElementBlock(Fragment, { key: i }, [
                          createBaseVNode("div", _hoisted_65, [
                            createBaseVNode("div", {
                              class: "w-4 h-4 rounded-full border-2",
                              style: normalizeStyle({ borderColor: n.color, background: n.isCurrent ? n.color : '#ffffff' })
                            }, null, 4),
                            createBaseVNode("div", {
                              class: "text-[11px] font-bold mt-2",
                              style: normalizeStyle({ color: n.color })
                            }, toDisplayString(n.isCurrent ? 'Current' : n.when), 5),
                            createBaseVNode("div", _hoisted_66, toDisplayString(n.label), 1)
                          ]),
                          (i < journeyNodes.value.length - 1)
                            ? (openBlock(), createElementBlock("div", {
                                key: 0,
                                class: "flex-1 h-[2px] mt-2",
                                style: normalizeStyle({ background: n.color })
                              }, null, 4))
                            : createCommentVNode("", true)
                        ], 64))
                      }), 128))
                    ])
                  ]))
                : (openBlock(), createElementBlock("p", _hoisted_67, "No lifecycle history recorded for this customer."))
            ]),
            createBaseVNode("div", _hoisted_68, [
              createBaseVNode("section", _hoisted_69, [
                createBaseVNode("div", _hoisted_70, [
                  createBaseVNode("span", _hoisted_71, "Priority " + toDisplayString(nba.value.priority), 1),
                  (nba.value.confidence != null)
                    ? (openBlock(), createElementBlock("span", _hoisted_72, " AI Confidence " + toDisplayString(nba.value.confidence) + "% ", 1))
                    : createCommentVNode("", true)
                ]),
                createBaseVNode("div", _hoisted_73, [
                  createBaseVNode("div", _hoisted_74, [
                    createBaseVNode("span", _hoisted_75, toDisplayString(nba.value.icon), 1)
                  ]),
                  createBaseVNode("div", _hoisted_76, [
                    createBaseVNode("h2", _hoisted_77, toDisplayString(nba.value.title), 1),
                    createBaseVNode("p", _hoisted_78, "Recommended by " + toDisplayString(nba.value.source), 1)
                  ])
                ]),
                createBaseVNode("p", _hoisted_79, toDisplayString(nba.value.rationale), 1),
                createBaseVNode("div", _hoisted_80, [
                  createBaseVNode("button", {
                    disabled: nbaDismissed.value,
                    class: "flex-1 bg-white/95 text-absa-inspire text-xs font-bold py-2.5 px-4 rounded-sm hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50",
                    onClick: logAction
                  }, [...(_cache[24] || (_cache[24] = [
                    createBaseVNode("span", { class: "material-symbols-outlined text-[18px]" }, "call", -1),
                    createTextVNode(" Log Action ", -1)
                  ]))], 8, _hoisted_81),
                  createBaseVNode("button", {
                    disabled: nbaDismissed.value,
                    class: "flex-1 border border-white/40 text-white text-xs font-bold py-2.5 px-4 rounded-sm hover:bg-white/10 transition-colors disabled:opacity-50",
                    onClick: dismissAction
                  }, toDisplayString(nbaDismissed.value ? 'Dismissed' : 'Dismiss'), 9, _hoisted_82)
                ])
              ]),
              createBaseVNode("section", _hoisted_83, [
                createBaseVNode("div", _hoisted_84, [
                  _cache[26] || (_cache[26] = createBaseVNode("h2", { class: "text-[11px] font-bold uppercase tracking-wider text-gray-500" }, "Action History", -1)),
                  withDirectives(createBaseVNode("select", {
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((historyFilter).value = $event)),
                    class: "border border-gray-300 rounded-sm px-2 py-1 text-[11px] font-semibold text-absa-enrich outline-none"
                  }, [
                    _cache[25] || (_cache[25] = createBaseVNode("option", { value: "" }, "All", -1)),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(historyTypes.value, (t) => {
                      return (openBlock(), createElementBlock("option", {
                        key: t,
                        value: t
                      }, toDisplayString(t), 9, _hoisted_85))
                    }), 128))
                  ], 512), [
                    [vModelSelect, historyFilter.value]
                  ])
                ]),
                (filteredHistory.value.length)
                  ? (openBlock(), createElementBlock("div", _hoisted_86, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(filteredHistory.value, (h) => {
                        return (openBlock(), createElementBlock("div", {
                          key: h.id,
                          class: "flex gap-3"
                        }, [
                          createBaseVNode("div", _hoisted_87, [
                            createBaseVNode("div", {
                              class: "w-2.5 h-2.5 rounded-full",
                              style: normalizeStyle({ background: unref(tierColor)('power') })
                            }, null, 4),
                            _cache[27] || (_cache[27] = createBaseVNode("div", { class: "w-[1px] flex-1 bg-gray-200 mt-1" }, null, -1))
                          ]),
                          createBaseVNode("div", _hoisted_88, [
                            createBaseVNode("div", _hoisted_89, [
                              createBaseVNode("span", _hoisted_90, toDisplayString(h.title), 1),
                              createBaseVNode("span", _hoisted_91, toDisplayString(fmtDate(h.at)), 1)
                            ]),
                            createBaseVNode("p", _hoisted_92, toDisplayString(h.detail), 1),
                            (h.actor)
                              ? (openBlock(), createElementBlock("span", _hoisted_93, "Logged by " + toDisplayString(h.actor), 1))
                              : createCommentVNode("", true)
                          ])
                        ]))
                      }), 128))
                    ]))
                  : (openBlock(), createElementBlock("p", _hoisted_94, "No actions logged for this customer yet."))
              ])
            ])
          ], 64)),
    createVNode(_sfc_main$2, {
      open: confirmOpen.value,
      title: "Delete customer",
      message: `Remove ${displayName.value} (${customerId.value}) from the portfolio?\n\nThe record is hidden from every list, score and report, and this is recorded in the audit trail. You can restore it from My Customers.`,
      eyebrow: "Soft delete — reversible",
      "confirm-label": "Delete customer",
      "busy-label": "Deleting…",
      busy: deleting.value,
      variant: "danger",
      onConfirm: confirmDelete,
      onCancel: cancelDelete,
      onClose: cancelDelete
    }, {
      body: withCtx(() => [
        createBaseVNode("div", null, [
          _cache[28] || (_cache[28] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-1.5" }, " Reason (optional — stored in the audit trail) ", -1)),
          withDirectives(createBaseVNode("input", {
            "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((deleteReason).value = $event)),
            type: "text",
            maxlength: "255",
            placeholder: "e.g. duplicate record, customer request, test data",
            class: "w-full border border-gray-300 rounded-sm px-3 py-2 text-xs text-absa-enrich focus:ring-1 focus:ring-absa-passion outline-none",
            onKeydown: withKeys(withModifiers(confirmDelete, ["prevent"]), ["enter"])
          }, null, 40, _hoisted_95), [
            [vModelText, deleteReason.value]
          ])
        ])
      ]),
      _: 1
    }, 8, ["open", "message", "busy"])
  ]))
}
}

});

export { _sfc_main as default };
