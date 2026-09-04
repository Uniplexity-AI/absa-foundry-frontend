// ─────────────────────────────────────────────────────────────────────────────
// ABSA pilot shared frontend helpers:
//  - CSV / JSON download (client-side, no backend needed)
//  - Toast shim over the app's vue3-toastify instance
// Used by every intelligence/portfolio/customer page so export, download and
// action buttons are all functional pre-pilot.
// ─────────────────────────────────────────────────────────────────────────────

function escapeCell(value) {
  if (value === null || value === undefined) return ''
  const s = String(value)
  if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"'
  return s
}

/**
 * Serialise rows (array of objects, or array of arrays) into CSV text.
 * @param {Array<object|Array>} rows
 * @param {string[]} [columns] header labels / object keys
 */
export function toCsv(rows, columns) {
  const arr = Array.isArray(rows) ? rows : []
  const header = Array.isArray(columns) && columns.length > 0 ? columns : []
  const body = arr.map((row) => {
    if (Array.isArray(row)) return row.map(escapeCell).join(',')
    const keys = header.length > 0 ? header : Object.keys(row || {})
    return keys.map((k) => escapeCell(row ? row[k] : '')).join(',')
  }).join('\n')
  return [header.join(','), body].filter((x) => x !== '').join('\n')
}

/** Trigger a browser download of text content. */
export function downloadText(filename, content, mime = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

/** Download rows as CSV with a UTF-8 BOM (so Excel opens currency correctly). */
export function downloadCsv(filename, rows, columns) {
  downloadText(filename, '\uFEFF' + toCsv(rows, columns), 'text/csv;charset=utf-8')
}

/** Download an arbitrary JSON payload. */
export function downloadJson(filename, payload) {
  downloadText(filename, JSON.stringify(payload, null, 2), 'application/json;charset=utf-8')
}

/** Download a plain-text / markdown business-case summary. */
export function downloadMarkdown(filename, sections) {
  downloadText(filename, sections, 'text/markdown;charset=utf-8')
}

/** Timestamp label for filenames: 2026-07-27T1430 */
export function stamp() {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}${p(d.getMinutes())}`
}

/** Default export filename from a page slug + date. */
export function reportFilename(page) {
  const slug = String(page).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  return `absa-${slug || 'report'}-${stamp()}.csv`
}

/** ISO date label for report headers. */
export function todayLabel() {
  return new Date().toISOString().slice(0, 10)
}

// ── Toast shim ───────────────────────────────────────────────────────────────
let toastApi = null
/** Lazily import the app toast instance (avoids SSR/import-order pitfalls). */
export async function notify(message, type = 'success', options = {}) {
  try {
    if (!toastApi) {
      const mod = await import('vue3-toastify')
      toastApi = mod.toast || mod.default
    }
    const fn = toastApi[type] || toastApi
    fn(message, { position: 'top-right', autoClose: 3200, theme: 'colored', closeOnClick: true, pauseOnHover: true, ...options })
  } catch (e) {
    // Toast unavailable — never break the click.
    console.log(`[absa] ${type}: ${message}`)
  }
}
