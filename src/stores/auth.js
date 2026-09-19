import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'

const STORAGE_KEYS = {
  token:        'token',
  refreshToken: 'refresh_token',
  userId:       'user_id',
  username:     'userName',
  displayName:  'displayName',
  email:        'email',
  roles:        'roles',
  branchCode:   'branch_code',
  expiresAt:    'token_expires_at',
}

const BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').trim() ||
  (typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://22.84.115.25:8080'
    : 'https://ub-app-backend-692487163735.europe-west1.run.app')

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token:       null,
    refreshToken: null,
    userId:      null,
    username:    null,
    displayName: null,
    email:       null,
    roles:       [],        // full array, e.g. ['RELATIONSHIP_MANAGER']
    branchCode:  null,
    expiresAt:   null,      // epoch ms
  }),

  getters: {
    isAuthenticated: (state) => !!state.token && Date.now() < (state.expiresAt ?? 0),
    hasRole:         (state) => (role) => state.roles.includes(role),
    isAdmin:         (state) => state.roles.includes('ADMIN'),
    isRM:            (state) => state.roles.includes('RELATIONSHIP_MANAGER'),
    isDS:            (state) => state.roles.includes('DATA_SCIENTIST'),
    isOps:           (state) => state.roles.includes('OPERATIONS'),
    /** First role — for display only, never for access decisions */
    primaryRole:     (state) => state.roles[0] ?? null,
    /** Legacy single-string for components not yet updated */
    userRole:        (state) => state.roles[0] ?? null,
    userEmail:       (state) => state.email,
  },

  actions: {
    /**
     * Decode a token response from /auth/login or /auth/refresh and populate state.
     */
    setSession(tokenResponse) {
      const { access_token, refresh_token } = tokenResponse
      if (!access_token) return

      let decoded
      try { decoded = jwtDecode(access_token) } catch { return }

      const roles = Array.isArray(decoded.roles)
        ? decoded.roles
        : decoded.roles ? [decoded.roles] : []

      this.token        = access_token
      this.refreshToken = refresh_token ?? this.refreshToken
      this.userId       = decoded.sub ?? null
      this.username     = decoded.username ?? null
      this.displayName  = decoded.display_name ?? decoded.username ?? null
      this.email        = decoded.email ?? null
      this.roles        = roles
      this.branchCode   = decoded.branch_code ?? null
      this.expiresAt    = (decoded.exp ?? 0) * 1000  // convert to ms

      // Persist
      localStorage.setItem(STORAGE_KEYS.token,        access_token)
      localStorage.setItem(STORAGE_KEYS.refreshToken,  refresh_token ?? '')
      localStorage.setItem(STORAGE_KEYS.userId,        this.userId ?? '')
      localStorage.setItem(STORAGE_KEYS.username,      this.username ?? '')
      localStorage.setItem(STORAGE_KEYS.displayName,   this.displayName ?? '')
      localStorage.setItem(STORAGE_KEYS.email,         this.email ?? '')
      localStorage.setItem(STORAGE_KEYS.roles,         JSON.stringify(roles))
      localStorage.setItem(STORAGE_KEYS.branchCode,    this.branchCode ?? '')
      localStorage.setItem(STORAGE_KEYS.expiresAt,     String(this.expiresAt))
      // Legacy keys kept for compatibility
      localStorage.setItem('access_token', access_token)
      localStorage.setItem('role', roles[0] ?? '')
    },

    /**
     * Re-hydrate from localStorage on app boot.
     * Returns false if the stored session is missing or expired.
     */
    hydrateFromStorage() {
      const token     = localStorage.getItem(STORAGE_KEYS.token)
      const expiresAt = Number(localStorage.getItem(STORAGE_KEYS.expiresAt) ?? 0)
      if (!token || Date.now() >= expiresAt) return false

      this.token        = token
      this.refreshToken = localStorage.getItem(STORAGE_KEYS.refreshToken) ?? null
      this.userId       = localStorage.getItem(STORAGE_KEYS.userId) ?? null
      this.username     = localStorage.getItem(STORAGE_KEYS.username) ?? null
      this.displayName  = localStorage.getItem(STORAGE_KEYS.displayName) ?? null
      this.email        = localStorage.getItem(STORAGE_KEYS.email) ?? null
      this.roles        = JSON.parse(localStorage.getItem(STORAGE_KEYS.roles) ?? '[]')
      this.branchCode   = localStorage.getItem(STORAGE_KEYS.branchCode) ?? null
      this.expiresAt    = expiresAt
      return true
    },

    /**
     * Call POST /auth/refresh and update the session.
     * Throws if the refresh token is invalid / expired.
     */
    async refreshSession() {
      const rt = this.refreshToken ?? localStorage.getItem(STORAGE_KEYS.refreshToken)
      if (!rt) throw new Error('No refresh token')

      const res = await fetch(`${BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: rt }),
      })
      if (!res.ok) throw new Error('Refresh failed')
      const data = await res.json()
      this.setSession(data)
      return data
    },

    /**
     * Clear state, remove all localStorage keys, and tell the backend to
     * revoke the current token.
     */
    async clearSession() {
      const token = this.token ?? localStorage.getItem(STORAGE_KEYS.token)

      // Fire-and-forget backend logout
      if (token) {
        fetch(`${BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        }).catch(() => {})
      }

      // Wipe state
      this.token        = null
      this.refreshToken = null
      this.userId       = null
      this.username     = null
      this.displayName  = null
      this.email        = null
      this.roles        = []
      this.branchCode   = null
      this.expiresAt    = null

      // Wipe storage
      const ALL_KEYS = [
        ...Object.values(STORAGE_KEYS),
        'access_token', 'role', 'userEmail', 'userName',
        'token_type', 'computedAt', 'asOfDate',
      ]
      ALL_KEYS.forEach(k => localStorage.removeItem(k))
    },

    /** Legacy — kept for backward compatibility with components using authStore.logout() */
    async logout() {
      await this.clearSession()
    },
  },
})
