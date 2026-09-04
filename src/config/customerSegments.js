/** Official ABSA market-segment taxonomy supplied by the bank. */
export const MARKET_SEGMENTS = Object.freeze({
  30: { marketSegment: 30, code: 'CIB', label: 'Corporate & Investment Banking' },
  40: { marketSegment: 40, code: 'BB', label: 'Business Banking' },
  45: { marketSegment: 45, code: 'SME', label: 'Small & Medium Enterprise' },
  50: { marketSegment: 50, code: 'Enterprise', label: 'Enterprise' },
  60: { marketSegment: 60, code: 'Prestige', label: 'Prestige' },
  65: { marketSegment: 65, code: 'Personal', label: 'Personal' },
  75: { marketSegment: 75, code: 'Mass', label: 'Mass' },
  85: { marketSegment: 85, code: 'Premier', label: 'Premier' },
})

// Excluded from all frontend lists, filters, and exports.
export const EXCLUDED_MARKET_SEGMENTS = Object.freeze(new Set([90, 99]))

export const OTHER_MARKET_SEGMENT = Object.freeze({
  marketSegment: null,
  code: 'Other',
  label: 'Other',
})

export const MARKET_SEGMENT_OPTIONS = Object.freeze([
  ...Object.values(MARKET_SEGMENTS),
  OTHER_MARKET_SEGMENT,
])

export function resolveMarketSegment(value) {
  const numericValue = Number(value)
  const byNumber = Number.isInteger(numericValue) ? MARKET_SEGMENTS[numericValue] : null
  if (byNumber) return byNumber

  const normalized = String(value ?? '').trim().toLowerCase()
  return Object.values(MARKET_SEGMENTS).find((segment) => (
    segment.code.toLowerCase() === normalized || segment.label.toLowerCase() === normalized
  )) || OTHER_MARKET_SEGMENT
}

export function isFrontendVisibleMarketSegment(value) {
  return !EXCLUDED_MARKET_SEGMENTS.has(Number(value))
}

export function formatMarketSegment(value) {
  const segment = resolveMarketSegment(value)
  return segment.code === 'Other' ? segment.label : `${segment.code} — ${segment.label}`
}
