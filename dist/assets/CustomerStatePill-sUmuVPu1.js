import { i as computed, o as openBlock, c as createElementBlock, t as toDisplayString, n as normalizeStyle, h as normalizeClass } from './index-B6Idg27_.js';

// Shared severity-tier mapping for all telemetry components.
// Source of truth: .ai/skills/rm-dashboard-colour-mapping.md
//
// NOTE: ABSA brand guide contains no green and no amber/red severity convention.
// This uses the documented working substitution — the four brand reds, light→dark,
// as a severity ramp. INVERTED convention: brightest red (Passion) = best/lowest-risk,
// darkest red (Inspire) = worst/highest-risk. Pending Absa brand sign-off
// (BrandHelp@absa.africa); re-key here only once confirmed.

const TIERS = {
  passion: '#DC0037', // best / lowest risk
  power:   '#B50232', // moderate
  hope:    '#95052A', // high risk
  inspire: '#77021E', // critical / highest
};

const STATE_TIER = {
  NEW:     'passion',
  GROWING: 'passion',
  ACTIVE:  'passion',
  AT_RISK: 'power',
  DORMANT: 'hope',
  CHURNED: 'inspire',
};

function tierColor(tier) {
  return TIERS[tier] ?? TIERS.power
}

function stateTier(state) {
  return STATE_TIER[String(state).toUpperCase().replace(/[\s-]/g, '_')] ?? 'power'
}

// churn probability (0-1 decimal) → tier (low churn = best = passion)
function churnTier(probability) {
  const p = Number(probability) || 0;
  if (p < 0.2) return 'passion'
  if (p < 0.5) return 'power'
  if (p < 0.8) return 'hope'
  return 'inspire'
}

// health score (0-100) → tier (high score = best = passion)
function healthTier(score) {
  const s = Number(score) || 0;
  if (s >= 80) return 'passion'
  if (s >= 60) return 'power'
  if (s >= 40) return 'hope'
  return 'inspire'
}

const _sfc_main = /*@__PURE__*/Object.assign({ name: 'CustomerStatePill' }, {
  __name: 'CustomerStatePill',
  props: {
  state: { type: String, default: '' },
  size: { type: String, default: 'md' }, // 'sm' | 'md' | 'lg'
},
  setup(__props) {

/**
 * Shared lifecycle-state pill used by the My Customers pages.
 * Colour ramp comes from the centralised severity-tier mapping
 * (see `useSeverityTier.js`) — no hard-coded brand hexes here.
 */


const props = __props;

const label = computed(() => String(props.state || 'UNKNOWN').replace(/_/g, ' '));

const color = computed(() => tierColor(stateTier(props.state)));

const sizeClass = computed(() => ({
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-2.5 py-0.5 text-[11px]',
  lg: 'px-3 py-1 text-xs',
}[props.size] || 'px-2.5 py-0.5 text-[11px]'));

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("span", {
    class: normalizeClass(["inline-flex items-center rounded-sm font-bold uppercase tracking-wide text-white", sizeClass.value]),
    style: normalizeStyle({ backgroundColor: color.value })
  }, toDisplayString(label.value), 7))
}
}

});

export { _sfc_main as _, churnTier as c, healthTier as h, stateTier as s, tierColor as t };
