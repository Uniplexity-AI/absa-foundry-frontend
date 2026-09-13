/**
 * Customer administration API — soft delete and restore.
 *
 * Backend: gateway `/api/v1/customer-admin/*`
 * (see `gateway/routes/customer_admin_routes.py`).
 *
 * Deliberately a separate prefix from `/api/v1/customers/*`. The gateway's RBAC
 * matrix is a union with no deny rules, so anything under `/api/v1/customers/**`
 * is open to RELATIONSHIP_MANAGER; deletion is restricted to OPERATIONS (+ ADMIN
 * via bypass) and only a prefix outside that wildcard can be restricted.
 *
 * Deletion is a **soft** delete: the customer is flagged and filtered out of
 * every customer-facing read, and can be restored.
 *
 *   DELETE /api/v1/customer-admin/customers/{id}        → soft-delete one
 *   POST   /api/v1/customer-admin/customers/bulk-delete → soft-delete many
 *   POST   /api/v1/customer-admin/restore               → undo
 *   GET    /api/v1/customer-admin/deleted               → recently deleted
 *   GET    /api/v1/customer-admin/deleted/count         → how many are hidden
 */

import { API_BASE_URL } from './api'

/** Server-side guard: one bulk operation may not exceed this many customers. */
export const MAX_BULK_DELETE = 500

function _authHeaders(json = true) {
  const token = localStorage.getItem('token') || localStorage.getItem('access_token') || ''
  const headers = {}
  if (token) headers.Authorization = `Bearer ${token}`
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
 * Soft-delete one customer.
 *
 * @param {string} customerId
 * @param {string} [reason] recorded in the audit trail
 */
export async function deleteCustomer(customerId, reason) {
  const query = reason ? `?reason=${encodeURIComponent(reason)}` : ''
  const res = await fetch(
    `${API_BASE_URL}/api/v1/customer-admin/customers/${encodeURIComponent(customerId)}${query}`,
    { method: 'DELETE', headers: _authHeaders() },
  )
  return _handleRes(res)
}

/**
 * Soft-delete many customers in one confirmed action.
 *
 * @param {string[]} customerIds
 * @param {string} [reason]
 * @returns {Promise<{requested:number, deleted:number, deleted_ids:string[],
 *                    already_deleted:string[], not_found:string[]}>}
 */
export async function bulkDeleteCustomers(customerIds, reason) {
  const res = await fetch(`${API_BASE_URL}/api/v1/customer-admin/customers/bulk-delete`, {
    method: 'POST',
    headers: _authHeaders(),
    body: JSON.stringify({ customer_ids: customerIds, reason: reason || null }),
  })
  return _handleRes(res)
}

/** Undo a soft delete (single id or many). */
export async function restoreCustomers(customerIds) {
  const res = await fetch(`${API_BASE_URL}/api/v1/customer-admin/restore`, {
    method: 'POST',
    headers: _authHeaders(),
    body: JSON.stringify({ customer_ids: customerIds }),
  })
  return _handleRes(res)
}

/** Recently deleted customers, newest first. */
export async function fetchDeletedCustomers(limit = 100) {
  const res = await fetch(
    `${API_BASE_URL}/api/v1/customer-admin/deleted?limit=${encodeURIComponent(limit)}`,
    { headers: _authHeaders(false) },
  )
  return _handleRes(res)
}

/** How many customers are currently hidden from the portfolio. */
export async function fetchDeletedCount() {
  const res = await fetch(`${API_BASE_URL}/api/v1/customer-admin/deleted/count`, {
    headers: _authHeaders(false),
  })
  return _handleRes(res)
}
