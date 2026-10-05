import { R as API_BASE_URL } from './index-CSRWfGkc.js';

/**
 * ETL API Service — pipeline run history and dashboard data.
 *
 * FR-OPS-01 / FR-OPS-02 / FR-OPS-03
 * Backend: GET /api/etl/runs
 */


function _headers() {
  const token = localStorage.getItem('token') || '';
  return {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
  }
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
      detail = detail.map(d => (d && (d.msg || d.message)) || JSON.stringify(d)).join('; ');
    } else if (detail && typeof detail === 'object') {
      detail = detail.msg || detail.message || JSON.stringify(detail);
    }
    const msg = detail || res.statusText || `Request failed (${res.status})`;
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err
  }
  return data
}

function _sanitizeParams(params = {}) {
  const out = {};
  Object.keys(params || {}).forEach((k) => {
    const v = params[k];
    if (v === undefined || v === null) return
    if (typeof v === 'string' && (v.trim() === '' || v === 'undefined')) return
    out[k] = v;
  });
  return out
}

/**
 * Fetch ETL dashboard: KPIs, status panel, quality trend, paginated runs.
 *
 * @param {object} params
 * @param {number} [params.page=1]
 * @param {number} [params.limit=25]
 * @param {string} [params.status]  — COMPLETED | FAILED | RUNNING
 * @returns {Promise<{
 *   kpis: object,
 *   status: object,
 *   quality_trend: array,
 *   runs: array,
 *   total_runs: number,
 *   page: number,
 *   limit: number
 * }>}
 */
async function fetchETLDashboard(params = {}) {
  const clean = _sanitizeParams(params);
  const query = new URLSearchParams(clean).toString();
  const res = await fetch(`${API_BASE_URL}/api/etl/runs?${query}`, {
    headers: _headers(),
  });
  return _handleRes(res)
}

/**
 * Fetch single batch/run detail for BatchExecutionDetail.vue.
 *
 * @param {string} runId — audit_id or batch_id
 * @returns {Promise<{ run: object, validation: object|null }>}
 */
async function fetchETLRunDetail(runId) {
  const res = await fetch(`${API_BASE_URL}/api/etl/runs/${encodeURIComponent(runId)}`, {
    headers: _headers(),
  });
  return _handleRes(res)
}

/**
 * List all extraction spec configs for the trigger modal.
 * @returns {Promise<Array<{ name: string, description: string, status: string, last_modified: string, size_bytes: number }>>}
 */
async function fetchETLConfigs() {
  const res = await fetch(`${API_BASE_URL}/api/etl/configs`, {
    headers: _headers(),
  });
  return _handleRes(res)
}

/**
 * Fetch a single config's raw YAML content by filename.
 * @param {string} name — filename, e.g. "customer_360.yaml"
 * @returns {Promise<{ name: string, content: string, last_modified: string }>}
 */
async function fetchETLConfigContent(name) {
  const res = await fetch(`${API_BASE_URL}/api/etl/configs/${encodeURIComponent(name)}`, {
    headers: _headers(),
  });
  return _handleRes(res)
}

/**
 * Create a new extraction spec. The backend derives the filename from the
 * YAML `name:` field (falls back to a timestamp name if absent).
 * @param {string} content — full YAML content
 * @returns {Promise<{ name: string, content: string, last_modified: string }>}
 */
async function createETLConfig(content) {
  const res = await fetch(`${API_BASE_URL}/api/etl/configs`, {
    method: 'POST',
    headers: _headers(),
    body: JSON.stringify({ content }),
  });
  return _handleRes(res)
}

/**
 * Update (or upsert) an extraction spec by filename.
 * @param {string} name — filename, e.g. "customer_360.yaml"
 * @param {string} content — full YAML content
 * @returns {Promise<{ name: string, content: string, last_modified: string }>}
 */
async function saveETLConfig(name, content) {
  const res = await fetch(`${API_BASE_URL}/api/etl/configs/${encodeURIComponent(name)}`, {
    method: 'PUT',
    headers: _headers(),
    body: JSON.stringify({ content }),
  });
  return _handleRes(res)
}

/**
 * Delete an extraction spec by filename.
 * @param {string} name — filename, e.g. "customer_360.yaml"
 * @returns {Promise<{ status: string, name: string }>}
 */
async function deleteETLConfig(name) {
  const res = await fetch(`${API_BASE_URL}/api/etl/configs/${encodeURIComponent(name)}`, {
    method: 'DELETE',
    headers: _headers(),
  });
  return _handleRes(res)
}

/**
 * Trigger an ETL pipeline run with a given config.
 * @param {string} configName — filename, e.g. "customer_360.yaml"
 * @param {boolean} [dryRun=false]
 * @returns {Promise<{ status: string, config_name: string, message: string, triggered_at: string }>}
 */
async function triggerETLPipeline(configName, dryRun = false) {
  const res = await fetch(`${API_BASE_URL}/api/etl/trigger`, {
    method: 'POST',
    headers: _headers(),
    body: JSON.stringify({ config_name: configName, dry_run: dryRun }),
  });
  return _handleRes(res)
}

/**
 * Fetch database metadata for ETL visual builder
 */
async function fetchDatabaseMetadata() {
  const res = await fetch(`${API_BASE_URL}/api/etl/metadata/tables`, {
    method: 'GET',
    headers: _headers(),
  });
  return _handleRes(res)
}

export { fetchETLConfigs as a, fetchETLRunDetail as b, fetchDatabaseMetadata as c, createETLConfig as d, fetchETLConfigContent as e, fetchETLDashboard as f, deleteETLConfig as g, saveETLConfig as s, triggerETLPipeline as t };
