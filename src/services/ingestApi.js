/**
 * Customer ingest API — CSV onboarding and core-banking sync.
 *
 * Backend: gateway `/api/v1/ingest/*` (see gateway/routes/ingest_routes.py).
 *
 *   GET  /api/v1/ingest/schema          → loadable datasets + fields + formats
 *   POST /api/v1/ingest/csv/preview     → upload (or re-map) a CSV, get columns + mapping
 *   POST /api/v1/ingest/csv/load        → commit the confirmed mapping
 *   POST /api/v1/ingest/core-banking/run→ pull from the core Absa system
 *   GET  /api/v1/ingest/runs            → recent ingest runs
 *
 * A CSV can land in either loadable dataset:
 *   `customers`         → public.customers_clean   (key customer_id)
 *   `customer_features` → public.customer_features (key customer_id + as_of_date)
 *
 * FR-INGEST-01 / FR-INGEST-02
 */

import { API_BASE_URL } from './api'

function _authHeaders(json = true) {
  const token = localStorage.getItem('token') || localStorage.getItem('access_token') || ''
  const headers = {}
  if (token) headers.Authorization = `Bearer ${token}`
  // Multipart requests must let the browser set the boundary themselves.
  if (json) headers['Content-Type'] = 'application/json'
  return headers
}

async function _handleRes(res) {
  const text = await res.text()
  let data = null
  if (text) {
    try { data = JSON.parse(text) } catch { data = null }
  }
  if (!res.ok) {
    let detail = data && (data.detail || data.message || data.error)
    if (Array.isArray(detail)) {
      detail = detail.map((d) => (d && (d.msg || d.message)) || JSON.stringify(d)).join('; ')
    } else if (detail && typeof detail === 'object') {
      detail = detail.msg || detail.message || JSON.stringify(detail)
    }
    const err = new Error(detail || res.statusText || `Request failed (${res.status})`)
    err.status = res.status
    err.data = data
    throw err
  }
  return data
}

/**
 * The ingest contract: target table, per-field formats, and the core feeds
 * that can be pulled. Drives the mapping table and the format hints.
 */
export async function fetchIngestSchema() {
  const res = await fetch(`${API_BASE_URL}/api/v1/ingest/schema`, {
    headers: _authHeaders(false),
  })
  return _handleRes(res)
}

/**
 * Stage a CSV upload and get back its columns, sample rows and a proposed
 * column → field mapping for the chosen dataset.
 *
 * @param {File} file
 * @param {string} [dataset] target dataset key ('customers' | 'customer_features')
 * @returns {Promise<object>} preview payload (upload_id, dataset, columns, mapping, column_checks…)
 */
export async function previewCsv(file, dataset) {
  const form = new FormData()
  form.append('file', file)
  if (dataset) form.append('dataset', dataset)
  const res = await fetch(`${API_BASE_URL}/api/v1/ingest/csv/preview`, {
    method: 'POST',
    headers: _authHeaders(false),
    body: form,
  })
  return _handleRes(res)
}

/**
 * Re-preview an already-staged upload against another dataset.
 *
 * Used when the operator switches the target dataset before loading: the file
 * is already in the landing zone, so nothing is uploaded again.
 *
 * @param {string} uploadId
 * @param {string} dataset
 */
export async function remapCsv(uploadId, dataset) {
  const form = new FormData()
  form.append('upload_id', uploadId)
  form.append('dataset', dataset)
  const res = await fetch(`${API_BASE_URL}/api/v1/ingest/csv/preview`, {
    method: 'POST',
    headers: _authHeaders(false),
    body: form,
  })
  return _handleRes(res)
}

/**
 * Commit a staged upload using the operator-confirmed mapping.
 *
 * @param {{upload_id: string, mapping: Record<string, string|null>, dataset?: string, filename?: string, dry_run?: boolean}} payload
 * @returns {Promise<object>} load summary (inserted / updated / rejected / quality_score…)
 */
export async function loadCsv(payload) {
  const res = await fetch(`${API_BASE_URL}/api/v1/ingest/csv/load`, {
    method: 'POST',
    headers: _authHeaders(),
    body: JSON.stringify({
      upload_id: payload.upload_id,
      mapping: payload.mapping,
      dataset: payload.dataset || 'customers',
      filename: payload.filename || null,
      dry_run: !!payload.dry_run,
    }),
  })
  return _handleRes(res)
}

/**
 * Trigger the ETL Engine pull from the core Absa system.
 *
 * @param {{dataset?: string, limit?: number|null, dry_run?: boolean, as_of_date?: string|null}} payload
 */
export async function runCoreBanking(payload = {}) {
  const res = await fetch(`${API_BASE_URL}/api/v1/ingest/core-banking/run`, {
    method: 'POST',
    headers: _authHeaders(),
    body: JSON.stringify({
      dataset: payload.dataset || 'customers_core',
      limit: payload.limit ?? null,
      dry_run: !!payload.dry_run,
      as_of_date: payload.as_of_date || null,
    }),
  })
  return _handleRes(res)
}

/** Recent ingest runs (CSV + core-banking) from the audit trail. */
export async function fetchIngestRuns(limit = 20) {
  const res = await fetch(`${API_BASE_URL}/api/v1/ingest/runs?limit=${encodeURIComponent(limit)}`, {
    headers: _authHeaders(false),
  })
  return _handleRes(res)
}

/**
 * Distinct snapshot dates that have computed states — the options for the
 * global "as-of" selector.
 *
 * @returns {Promise<{dates: string[]}>}
 */
export async function fetchSnapshots() {
  const res = await fetch(`${API_BASE_URL}/api/v1/customers/snapshots`, {
    headers: _authHeaders(false),
  })
  return _handleRes(res)
}

/**
 * Recompute the lifecycle state snapshot for one date.
 *
 * The portfolio list, counts and KPIs read `customer_states` — a derived
 * per-snapshot table — so a customer added with a feature snapshot stays
 * invisible until the state engine has run for that as_of_date. Idempotent.
 *
 * @param {string} asOfDate YYYY-MM-DD
 * @returns {Promise<{as_of_date:string, customers_processed:number, states_upserted:number, status:string}>}
 */
export async function computeCustomerStates(asOfDate) {
  const axios = (await import('axios')).default
  const { data } = await axios.post(
    `${API_BASE_URL}/api/v1/customers/compute-states`,
    null,
    { params: { as_of_date: asOfDate }, timeout: 120000 }
  )
  return data
}

/**
 * Add one customer without a CSV — the Add Customer form.
 *
 * Goes through the same contract as the CSV path: the backend coerces and
 * validates every value against the selected dataset spec and upserts via the
 * shared loader, so field formats can never drift from the loader.
 *
 * Two datasets are loadable from one customer:
 *   customers         → public.customers_clean   (identity master, 12 fields)
 *   customer_features → public.customer_features (85 feature columns, keyed on
 *                                                 customer_id + as_of_date)
 *
 * Create-only for the master dataset. An id that already exists (or a
 * soft-deleted one) comes back as 409 rather than silently overwriting the row.
 *
 * @param {Record<string, string>} row target field name → value
 * @param {{dataset?: 'customers'|'customer_features', dryRun?: boolean, allowUpdate?: boolean}} [opts]
 * @returns {Promise<object>} load summary (rows_inserted / rows_updated / quality_score…)
 */
export async function addCustomer(row, opts = {}) {
  const res = await fetch(`${API_BASE_URL}/api/v1/ingest/customer`, {
    method: 'POST',
    headers: _authHeaders(),
    body: JSON.stringify({
      row,
      dataset: opts.dataset || 'customers',
      dry_run: !!opts.dryRun,
      allow_update: !!opts.allowUpdate,
    }),
  })
  return _handleRes(res)
}

/**
 * The raw master row for one customer — the Edit Customer form's pre-fill.
 *
 * Reads the same columns `patchCustomer` writes, keyed by the dataset's field
 * names, so the form loads, diffs and submits against one contract. Do not
 * pre-fill an edit form from the portfolio/list payload: that is a
 * `customer_states` snapshot and carries none of the identity columns, which is
 * why the form used to open blank.
 *
 * Returns `{ customer_id, row, columns_missing, target_table }`.
 * `columns_missing` lists dataset fields the database has no column for — those
 * cannot be stored, so the form must not offer them as editable.
 *
 * @param {string} customerId
 * @returns {Promise<object>}
 */
export async function getCustomerMaster(customerId) {
  const res = await fetch(
    `${API_BASE_URL}/api/v1/ingest/customer/${encodeURIComponent(customerId)}`,
    // Never serve a pre-fill from the HTTP cache — it must reflect the last save.
    { headers: _authHeaders(false), cache: 'no-store' },
  )
  return _handleRes(res)
}

/**
 * Partially update one customer — only the supplied fields are written.
 *
 * This is the safe edit path. `addCustomer` with `allowUpdate` upserts EVERY
 * column of the dataset, so a form that only carries the fields the operator
 * touched would null all the others (and silently drop any column the database
 * does not have). Send only what changed.
 *
 * Rejects with the backend detail when a supplied field has no column on the
 * target table, so callers can surface "apply the migration" rather than
 * reporting a successful save that wrote nothing.
 *
 * @param {string} customerId
 * @param {Record<string, string>} fields field name → new value (changed only)
 * @returns {Promise<{customer_id: string, rows_updated: number, columns_missing: string[]}>}
 */
export async function patchCustomer(customerId, fields) {
  const res = await fetch(`${API_BASE_URL}/api/v1/ingest/customer`, {
    method: 'PATCH',
    headers: _authHeaders(),
    body: JSON.stringify({ customer_id: customerId, fields }),
  })
  return _handleRes(res)
}
