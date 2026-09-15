// Shared severity-tier mapping for all telemetry components.
// Source of truth: .ai/skills/rm-dashboard-colour-mapping.md
//
// NOTE: ABSA brand guide contains no green and no amber/red severity convention.
// This uses the documented working substitution — the four brand reds, light→dark,
// as a severity ramp. INVERTED convention: brightest red (Passion) = best/lowest-risk,
// darkest red (Inspire) = worst/highest-risk. Pending Absa brand sign-off
// (BrandHelp@absa.africa); re-key here only once confirmed.

export const TIERS = {
  passion: '#DC0037', // best / lowest risk
  power:   '#B50232', // moderate
  hope:    '#95052A', // high risk
  inspire: '#77021E', // critical / highest
}

const STATE_TIER = {
  NEW:     'passion',
  GROWING: 'passion',
  ACTIVE:  'passion',
  AT_RISK: 'power',
  DORMANT: 'hope',
  CHURNED: 'inspire',
}

export function tierColor(tier) {
  return TIERS[tier] ?? TIERS.power
}

export function stateTier(state) {
  return STATE_TIER[String(state).toUpperCase().replace(/[\s-]/g, '_')] ?? 'power'
}

// churn probability (0-1 decimal) → tier (low churn = best = passion)
export function churnTier(probability) {
  const p = Number(probability) || 0
  if (p < 0.2) return 'passion'
  if (p < 0.5) return 'power'
  if (p < 0.8) return 'hope'
  return 'inspire'
}

// health score (0-100) → tier (high score = best = passion)
export function healthTier(score) {
  const s = Number(score) || 0
  if (s >= 80) return 'passion'
  if (s >= 60) return 'power'
  if (s >= 40) return 'hope'
  return 'inspire'
}

export function useSeverityTier() {
  return { TIERS, tierColor, stateTier, churnTier, healthTier }
}
