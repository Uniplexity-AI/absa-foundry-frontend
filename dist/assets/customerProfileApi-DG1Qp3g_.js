import { R as API_BASE_URL } from './index-DJKk8LB7.js';

/**
 * Customer profile API — the identity header shown on the customer page.
 *
 * Backend: GET /api/v1/customers/{customer_id}/profile
 * (gateway/routes/customer_profile_routes.py → reads the clean layer directly)
 *
 * Returns account number, national ID (NRC), tenure, assigned RM and health
 * score. Fields no pilot source supplies yet come back as null with an
 * availability flag, so the UI can explain the gap instead of showing a dash.
 */


function _headers() {
  const token = localStorage.getItem('token') || localStorage.getItem('access_token') || '';
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers
}

/**
 * Fetch the composed profile header for one customer.
 *
 * Resolves to `null` when the customer is unknown (HTTP 404) so callers can
 * fall back to the store-driven view rather than surfacing an error.
 *
 * @param {string} customerId
 * @returns {Promise<object|null>}
 */
async function fetchCustomerProfile(customerId) {
  const res = await fetch(
    `${API_BASE_URL}/api/v1/customers/${encodeURIComponent(customerId)}/profile`,
    { headers: _headers() }
  );

  if (res.status === 404) return null
  if (!res.ok) {
    let detail = '';
    try {
      const data = await res.json();
      detail = data?.detail || data?.message || '';
    } catch { /* non-JSON error body */ }
    throw new Error(detail || `Failed to load customer profile (${res.status})`)
  }

  return res.json()
}

export { fetchCustomerProfile as f };
