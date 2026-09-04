/**
 * Development flags — safe defaults for local development.
 *
 * Set VITE_DEV_BYPASS=true in .env or .env.development to
 * skip service worker registration and use mock auth payloads.
 */
export const DEV_BYPASS = import.meta.env.VITE_DEV_BYPASS === 'true'

/** Mock JWT payload used when DEV_BYPASS is active (ABSA-shaped claims). */
export const DEV_AUTH_PAYLOAD = {
  sub: '00000000-0000-0000-0000-000000000001',
  username: 'dev.admin',
  display_name: 'Dev Administrator',
  email: 'dev.admin@absa.co.zm',
  roles: ['ADMIN'],
  role: 'ADMIN',
  branch_code: null,
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
