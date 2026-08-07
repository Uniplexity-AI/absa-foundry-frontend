/**
 * ETL API Service — pipeline run history and dashboard data.
 *
 * FR-OPS-01 / FR-OPS-02 / FR-OPS-03
 * Backend: GET /api/etl/runs
 */

import { API_BASE_URL } from './api'

function _headers() {
  const token = localStorage.getItem('token') || ''
  return {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
  }
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
      detail = detail.map(d => (d && (d.msg || d.message)) || JSON.stringify(d)).join('; ')
    } else if (detail && typeof detail === 'object') {
      detail = detail.msg || detail.message || JSON.stringify(detail)
    }
    const msg = detail || res.statusText || `Request failed (${res.status})`
    const err = new Error(msg)
    err.status = res.status
    err.data = data
    throw err
  }
  return data
}

function _sanitizeParams(params = {}) {
  const out = {}
  Object.keys(params || {}).forEach((k) => {
    const v = params[k]
    if (v === undefined || v === null) return
    if (typeof v === 'string' && (v.trim() === '' || v === 'undefined')) return
    out[k] = v
  })
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
export async function fetchETLDashboard(params = {}) {
  const clean = _sanitizeParams(params)
  const query = new URLSearchParams(clean).toString()
  const res = await fetch(`${API_BASE_URL}/api/etl/runs?${query}`, {
    headers: _headers(),
  })
  return _handleRes(res)
}
