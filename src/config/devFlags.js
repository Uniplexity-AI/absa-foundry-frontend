/**
 * Development flags — safe defaults for local development.
 *
 * Set VITE_DEV_BYPASS=true in .env or .env.development to
 * skip service worker registration and use mock auth payloads.
 */
export const DEV_BYPASS = import.meta.env.VITE_DEV_BYPASS === 'true'

/** Mock JWT payload used when DEV_BYPASS is active. */
export const DEV_AUTH_PAYLOAD = {
  email: 'dev@absa.co.zm',
  tenantId: 'dev-tenant-001',
  role: 'admin',
  companyName: 'ABSA Intelligence Unit',
  firstName: 'Dev',
  exp: Math.floor(Date.now() / 1000) + 86400
}

/** Ensure a development auth session exists in localStorage. */
export function ensureDevAuthSession() {
  if (!DEV_BYPASS) return
  const existing = localStorage.getItem('auth_token')
  if (!existing) {
    localStorage.setItem('auth_token', 'dev-mock-jwt-token')
    localStorage.setItem('user_session', JSON.stringify(DEV_AUTH_PAYLOAD))
  }
}
