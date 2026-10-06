import { Z as __vitePreload, R as API_BASE_URL } from './index-CAIvJQgo.js';

function _authHeaders(json = true) {
  const token = localStorage.getItem('token') || localStorage.getItem('access_token') || '';
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  // Multipart requests must let the browser set the boundary themselves.
  if (json) headers['Content-Type'] = 'application/json';
  return headers
}

async function _handleRes(res) {
  const text = await res.text();
  let data = null;
  if (text) {
    try { data = JSON.parse(text); } catch { data = null; }
  }
  if (!res.ok) {
    let detail = data && (data.detail || data.message || data.error);
    if (Array.isArray(detail)) {
      detail = detail.map((d) => (d && (d.msg || d.message)) || JSON.stringify(d)).join('; ');
    } else if (detail && typeof detail === 'object') {
      detail = detail.msg || detail.message || JSON.stringify(detail);
    }
    const err = new Error(detail || res.statusText || `Request failed (${res.status})`);
    err.status = res.status;
    err.data = data;
    throw err
  }
  return data
}

/**
 * The ingest contract: target table, per-field formats, and the core feeds
 * that can be pulled. Drives the mapping table and the format hints.
 */
async function fetchIngestSchema() {
  const res = await fetch(`${API_BASE_URL}/api/v1/ingest/schema`, {
    headers: _authHeaders(false),
  });
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
async function previewCsv(file, dataset) {
  const form = new FormData();
  form.append('file', file);
  if (dataset) form.append('dataset', dataset);
  const res = await fetch(`${API_BASE_URL}/api/v1/ingest/csv/preview`, {
    method: 'POST',
    headers: _authHeaders(false),
    body: form,
  });
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
async function remapCsv(uploadId, dataset) {
  const form = new FormData();
  form.append('upload_id', uploadId);
  form.append('dataset', dataset);
  const res = await fetch(`${API_BASE_URL}/api/v1/ingest/csv/preview`, {
    method: 'POST',
    headers: _authHeaders(false),
    body: form,
  });
  return _handleRes(res)
}

/**
 * Commit a staged upload using the operator-confirmed mapping.
 *
 * @param {{upload_id: string, mapping: Record<string, string|null>, dataset?: string, filename?: string, dry_run?: boolean}} payload
 * @returns {Promise<object>} load summary (inserted / updated / rejected / quality_score…)
 */
async function loadCsv(payload) {
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
  });
  return _handleRes(res)
}

/**
 * Trigger the ETL Engine pull from the core Absa system.
 *
 * @param {{dataset?: string, limit?: number|null, dry_run?: boolean, as_of_date?: string|null}} payload
 */
async function runCoreBanking(payload = {}) {
  const res = await fetch(`${API_BASE_URL}/api/v1/ingest/core-banking/run`, {
    method: 'POST',
    headers: _authHeaders(),
    body: JSON.stringify({
      dataset: payload.dataset || 'customers_core',
      limit: payload.limit ?? null,
      dry_run: !!payload.dry_run,
      as_of_date: payload.as_of_date || null,
    }),
  });
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
async function computeCustomerStates(asOfDate) {
  const axios = (await __vitePreload(async () => { const {default: __vite_default__} = await import('./index-CAIvJQgo.js').then(n => n.ag);return { default: __vite_default__ }},true              ?[]:void 0)).default;
  const { data } = await axios.post(
    `${API_BASE_URL}/api/v1/customers/compute-states`,
    null,
    { params: { as_of_date: asOfDate }, timeout: 120000 }
  );
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
async function addCustomer(row, opts = {}) {
  const res = await fetch(`${API_BASE_URL}/api/v1/ingest/customer`, {
    method: 'POST',
    headers: _authHeaders(),
    body: JSON.stringify({
      row,
      dataset: opts.dataset || 'customers',
      dry_run: !!opts.dryRun,
      allow_update: !!opts.allowUpdate,
    }),
  });
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
async function patchCustomer(customerId, fields) {
  const res = await fetch(`${API_BASE_URL}/api/v1/ingest/customer`, {
    method: 'PATCH',
    headers: _authHeaders(),
    body: JSON.stringify({ customer_id: customerId, fields }),
  });
  return _handleRes(res)
}

export { runCoreBanking as a, addCustomer as b, computeCustomerStates as c, patchCustomer as d, fetchIngestSchema as f, loadCsv as l, previewCsv as p, remapCsv as r };
