import { ref, computed } from 'vue'

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

const STORAGE_KEY = 'clvBandRanges'

// Must match the backend's _BAND_ORDER (highest first). Band names are fixed —
// the backend keys its display order on them and the cards key their badge
// colours — only the boundaries move.
export const CLV_BANDS = ['Platinum', 'Gold', 'Silver', 'Bronze']

// Starting boundaries for a first-time setup. Deliberately editable: a sane
// opening position for this portfolio, not a calibrated cut.
const SEED = {
  Platinum: { min: 50000, max: null },
  Gold:     { min: 20000, max: 50000 },
  Silver:   { min: 5000,  max: 20000 },
  Bronze:   { min: null,  max: 5000  },
}

function _rowsFromSeed() {
  return CLV_BANDS.map((band) => ({ band, ...SEED[band] }))
}

function _numOrNull(value) {
  if (value === null || value === undefined || String(value).trim() === '') return null
  const n = Number(String(value).replace(/[,\s]/g, ''))
  return Number.isFinite(n) ? n : NaN
}

/** Validate edit rows. Returns `{ ranges, error }` — mirrors the backend's rules. */
export function validateRows(rows) {
  const ranges = {}
  for (const row of rows) {
    const lo = _numOrNull(row.min)
    const hi = _numOrNull(row.max)
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
    ranges[row.band] = [lo, hi]
  }

  const ordered = Object.keys(ranges).sort(
    (a, b) => (ranges[a][0] ?? -Infinity) - (ranges[b][0] ?? -Infinity),
  )
  if (ordered.length !== CLV_BANDS.length) {
    return { ranges: null, error: 'All four bands are required' }
  }
  if (ranges[ordered[0]][0] !== null) {
    return { ranges: null, error: `Lowest band (${ordered[0]}) must be open at the bottom` }
  }
  const top = ordered[ordered.length - 1]
  if (ranges[top][1] !== null) {
    return { ranges: null, error: `Highest band (${top}) must be open at the top` }
  }
  for (let i = 0; i < ordered.length - 1; i += 1) {
    const lower = ordered[i]
    const upper = ordered[i + 1]
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
export function serializeRanges(ranges) {
  const fmt = (v) => (v === null ? '' : String(v))
  return CLV_BANDS.map((b) => `${b}:${fmt(ranges[b][0])}-${fmt(ranges[b][1])}`).join(';')
}

/** The persisted spec, or null to use the backend's percentile default. */
export function getClvBandRanges() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
    if (!saved || saved.mode !== 'custom' || !Array.isArray(saved.rows)) return null
    const { ranges } = validateRows(saved.rows)
    return ranges ? serializeRanges(ranges) : null
  } catch {
    return null
  }
}

export function useClvBands() {
  const initial = (() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
      if (saved && Array.isArray(saved.rows) && saved.rows.length === CLV_BANDS.length) {
        return saved
      }
    } catch { /* unparseable -> fall through to the seed */ }
    return { mode: 'percentile', rows: _rowsFromSeed() }
  })()

  const mode = ref(initial.mode === 'custom' ? 'custom' : 'percentile')
  const rows = ref(initial.rows.map((r) => ({ ...r })))
  const error = ref(null)

  const isCustom = computed(() => mode.value === 'custom')
  const preview = computed(() => {
    const { ranges, error: err } = validateRows(rows.value)
    return err ? null : serializeRanges(ranges)
  })

  function _persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ mode: mode.value, rows: rows.value }))
    } catch { /* private mode / quota — the config simply will not survive reload */ }
  }

  /** Returns true when the caller should re-fetch. */
  function apply() {
    if (mode.value === 'custom') {
      const { error: err } = validateRows(rows.value)
      if (err) {
        error.value = err
        return false
      }
    }
    error.value = null
    _persist()
    return true
  }

  function reset() {
    mode.value = 'percentile'
    rows.value = _rowsFromSeed()
    error.value = null
    _persist()
    return true
  }

  return { mode, rows, error, isCustom, preview, apply, reset }
}
