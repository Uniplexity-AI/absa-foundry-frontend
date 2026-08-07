# Frontend Authentication — Integration Guide

**For:** Frontend Developer
**Backend:** FastAPI Gateway (`http://localhost:8080`)
**Stack:** Vue 3 + Pinia + Axios + Vue Router 4
**Last Updated:** 2026-07-21

---

## 1. Backend Endpoints

All endpoints are at `http://localhost:8080` (or the deployed gateway URL).

### 1.1 Login

```
POST /auth/login
Content-Type: application/json

Request:
{
  "username": "jsmith",
  "password": "MyP@ssw0rd1"
}

Response 200:
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "L1m0-7sAogow79wuEPbmQr8xYzN2v...",
  "token_type": "bearer",
  "expires_in": 900
}
```

| Field | Value |
|---|---|
| `access_token` | JWT — expires in 15 minutes |
| `refresh_token` | Opaque string — expires in 7 days |
| `expires_in` | Seconds until access token expires (900 = 15 min) |

**Error Responses:**

| HTTP | `detail` | When |
|---|---|---|
| 400 | `{"error":"Password policy violation","rules":["Minimum 8 characters",...]}` | Password too weak |
| 401 | `"Invalid credentials"` | Wrong username or password |
| 423 | `"Account temporarily locked. Retry in 12 minutes."` | Too many failed attempts |
| 429 | `{"error":"Rate limit exceeded","retry_after_seconds":900}` | 5+ attempts in 15 min |
| 503 | `"Authentication service temporarily unavailable"` | LDAP/AD down |

---

### 1.2 Refresh Token

Call this when the access token is about to expire (or has expired).

```
POST /auth/refresh
Content-Type: application/json

Request:
{
  "refresh_token": "L1m0-7sAogow79wuEPbm..."
}

Response 200:
{
  "access_token": "eyJhbGciOi...",    // NEW access token
  "refresh_token": "A6-pjCD2m_Sw...",  // NEW refresh token (old one revoked)
  "token_type": "bearer",
  "expires_in": 900
}
```

**Important:** Each refresh call revokes the old refresh token and issues a new one. Store the new refresh token immediately.

**Error:**

| HTTP | `detail` | When |
|---|---|---|
| 401 | `"Invalid or expired refresh token"` | Token revoked, expired, or invalid → force logout |

---

### 1.3 Logout

```
POST /auth/logout
Authorization: Bearer eyJhbGci...

Response: 204 No Content
```

After logout:
- The access token is blacklisted immediately
- All refresh tokens for this user are revoked
- Clear tokens from localStorage/sessionStorage

---

### 1.4 Get Current User

```
GET /auth/me
Authorization: Bearer eyJhbGci...

Response 200:
{
  "user_id": "a1417f36-1234-5678-9abc-def012345678",
  "username": "jsmith",
  "email": "john.smith@absa.co.zm",
  "display_name": "John Smith",
  "department": "Retail Banking",
  "branch_code": "B015",
  "roles": ["RELATIONSHIP_MANAGER"],
  "is_active": true,
  "last_login_at": "2026-07-21T08:30:00Z",
  "created_at": "2026-01-15T10:00:00Z"
}
```

| Field | Use |
|---|---|
| `roles` | Array of role names — use to show/hide UI elements |
| `branch_code` | Scope data — filter customers by branch |
| `is_active` | If `false`, account is deactivated |

---

### 1.5 Admin: List Users (ADMIN only)

```
GET /admin/users
Authorization: Bearer eyJhbGci...

Response 200:
[
  {
    "user_id": "a1417f36-...",
    "username": "jsmith",
    "email": "john.smith@absa.co.zm",
    "display_name": "John Smith",
    "department": "Retail Banking",
    "branch_code": "B015",
    "roles": ["RELATIONSHIP_MANAGER"],
    "is_active": true,
    "last_login_at": "2026-07-21T08:30:00Z",
    "created_at": "2026-01-15T10:00:00Z"
  }
]
```

---

### 1.6 Admin: List Roles (ADMIN only)

```
GET /admin/roles
Authorization: Bearer eyJhbGci...

Response 200:
[
  {"role_id": 1, "role_name": "ADMIN", "description": "Full system access"},
  {"role_id": 2, "role_name": "RELATIONSHIP_MANAGER", "description": "Dashboard + NBA"},
  {"role_id": 3, "role_name": "BRANCH_MANAGER", "description": "Portfolio analytics"},
  {"role_id": 4, "role_name": "DATA_SCIENTIST", "description": "Model training"},
  {"role_id": 5, "role_name": "OPERATIONS", "description": "Monitoring"},
  {"role_id": 6, "role_name": "SERVICE_ACCOUNT", "description": "Machine-to-machine"}
]
```

---

## 2. JWT Structure

Decode the access token with `jwt-decode` (already in `package.json`):

```typescript
import { jwtDecode } from 'jwt-decode'

interface JwtPayload {
  sub: string          // User UUID
  username: string
  display_name: string
  email: string
  roles: string[]       // e.g. ["RELATIONSHIP_MANAGER"]
  branch_code: string | null
  iat: number           // Issued at (Unix timestamp)
  exp: number           // Expires at (Unix timestamp)
  jti: string           // JWT ID — unique per token
}

const payload = jwtDecode<JwtPayload>(accessToken)
const expiresAt = new Date(payload.exp * 1000)
const minutesLeft = Math.floor((payload.exp * 1000 - Date.now()) / 60000)
```

---

## 3. Implementation Guide

### 3.1 Store: `src/stores/auth.ts` (Pinia)

```typescript
// src/stores/auth.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'

const API = 'http://localhost:8080'

interface JwtPayload {
  sub: string
  username: string
  display_name: string
  email: string
  roles: string[]
  branch_code: string | null
  exp: number
  iat: number
  jti: string
}

interface User {
  userId: string
  username: string
  displayName: string
  email: string
  roles: string[]
  branchCode: string | null
}

export const useAuthStore = defineStore('auth', () => {
  // --- State ---
  const accessToken = ref<string | null>(localStorage.getItem('access_token'))
  const refreshToken = ref<string | null>(localStorage.getItem('refresh_token'))
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // --- Getters ---
  const isAuthenticated = computed(() => !!accessToken.value && !!user.value)
  const isTokenExpired = computed(() => {
    if (!accessToken.value) return true
    try {
      const payload = jwtDecode<JwtPayload>(accessToken.value)
      return payload.exp * 1000 < Date.now()
    } catch {
      return true
    }
  })
  const userRoles = computed(() => user.value?.roles ?? [])

  // Check if user has a specific role
  function hasRole(role: string): boolean {
    return userRoles.value.includes(role)
  }

  // Check if user has any of the given roles
  function hasAnyRole(roles: string[]): boolean {
    return roles.some(r => userRoles.value.includes(r))
  }

  // --- Actions ---

  async function login(username: string, password: string): Promise<void> {
    loading.value = true
    error.value = null

    try {
      const response = await axios.post(`${API}/auth/login`, {
        username,
        password,
      })

      const { access_token, refresh_token } = response.data

      // Store tokens
      accessToken.value = access_token
      refreshToken.value = refresh_token
      localStorage.setItem('access_token', access_token)
      localStorage.setItem('refresh_token', refresh_token)

      // Decode user from JWT
      const payload = jwtDecode<JwtPayload>(access_token)
      user.value = {
        userId: payload.sub,
        username: payload.username,
        displayName: payload.display_name,
        email: payload.email,
        roles: payload.roles,
        branchCode: payload.branch_code,
      }

      // Set default Authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
    } catch (e: any) {
      error.value = e.response?.data?.detail ?? 'Login failed'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function refresh(): Promise<boolean> {
    if (!refreshToken.value) return false

    try {
      const response = await axios.post(`${API}/auth/refresh`, {
        refresh_token: refreshToken.value,
      })

      const { access_token, refresh_token } = response.data

      accessToken.value = access_token
      refreshToken.value = refresh_token
      localStorage.setItem('access_token', access_token)
      localStorage.setItem('refresh_token', refresh_token)

      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`

      const payload = jwtDecode<JwtPayload>(access_token)
      user.value = {
        userId: payload.sub,
        username: payload.username,
        displayName: payload.display_name,
        email: payload.email,
        roles: payload.roles,
        branchCode: payload.branch_code,
      }

      return true
    } catch {
      // Refresh failed — force logout
      await logout()
      return false
    }
  }

  async function logout(): Promise<void> {
    try {
      if (accessToken.value) {
        await axios.post(`${API}/auth/logout`)
      }
    } catch {
      // Logout should always succeed locally
    } finally {
      accessToken.value = null
      refreshToken.value = null
      user.value = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      delete axios.defaults.headers.common['Authorization']
    }
  }

  // Restore session from localStorage on app start
  async function restoreSession(): Promise<boolean> {
    const stored = localStorage.getItem('access_token')
    if (!stored) return false

    accessToken.value = stored
    refreshToken.value = localStorage.getItem('refresh_token')

    try {
      const payload = jwtDecode<JwtPayload>(stored)
      if (payload.exp * 1000 < Date.now()) {
        // Token expired — try refresh
        return await refresh()
      }

      user.value = {
        userId: payload.sub,
        username: payload.username,
        displayName: payload.display_name,
        email: payload.email,
        roles: payload.roles,
        branchCode: payload.branch_code,
      }

      axios.defaults.headers.common['Authorization'] = `Bearer ${stored}`
      return true
    } catch {
      await logout()
      return false
    }
  }

  return {
    accessToken,
    refreshToken,
    user,
    loading,
    error,
    isAuthenticated,
    isTokenExpired,
    userRoles,
    hasRole,
    hasAnyRole,
    login,
    refresh,
    logout,
    restoreSession,
  }
})
```

---

### 3.2 Axios Interceptor: `src/api/http.ts`

Auto-refresh expired tokens on 401 responses:

```typescript
// src/api/http.ts
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const http = axios.create({
  baseURL: 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
})

// Request interceptor — attach token
http.interceptors.request.use((config) => {
  const auth = useAuthStore()
  if (auth.accessToken && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${auth.accessToken}`
  }
  return config
})

// Response interceptor — auto-refresh on 401
let isRefreshing = false
let failedQueue: Array<{ resolve: Function; reject: Function }> = []

function processQueue(error: any, token: string | null) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error)
    else resolve(token)
  })
  failedQueue = []
}

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const auth = useAuthStore()
    const originalRequest = error.config

    // Only attempt refresh for 401s that aren't from /auth/* endpoints
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.startsWith('/auth/')
    ) {
      if (isRefreshing) {
        // Queue this request until refresh completes
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          return http(originalRequest)
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const success = await auth.refresh()
        if (success) {
          processQueue(null, auth.accessToken)
          originalRequest.headers.Authorization = `Bearer ${auth.accessToken}`
          return http(originalRequest)
        }
      } catch {
        processQueue(error, null)
        await auth.logout()
        window.location.href = '/login'
        return Promise.reject(error)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)

export default http
```

---

### 3.3 Router Guard: `src/router/index.ts`

```typescript
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/',
    component: () => import('@/layouts/DashboardLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/DashboardView.vue'),
        meta: { roles: ['ADMIN', 'RELATIONSHIP_MANAGER', 'BRANCH_MANAGER'] },
      },
      {
        path: 'admin/users',
        name: 'AdminUsers',
        component: () => import('@/views/AdminUsersView.vue'),
        meta: { roles: ['ADMIN'] },
      },
      {
        path: 'models',
        name: 'Models',
        component: () => import('@/views/ModelsView.vue'),
        meta: { roles: ['ADMIN', 'DATA_SCIENTIST'] },
      },
      {
        path: 'monitoring',
        name: 'Monitoring',
        component: () => import('@/views/MonitoringView.vue'),
        meta: { roles: ['ADMIN', 'OPERATIONS'] },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, _from, next) => {
  const auth = useAuthStore()

  // Restore session on first navigation
  if (!auth.isAuthenticated && localStorage.getItem('access_token')) {
    await auth.restoreSession()
  }

  // Public routes
  if (!to.meta.requiresAuth) {
    if (auth.isAuthenticated && to.name === 'Login') {
      return next('/') // Already logged in — redirect to dashboard
    }
    return next()
  }

  // Auth required
  if (!auth.isAuthenticated) {
    return next({ name: 'Login', query: { redirect: to.fullPath } })
  }

  // Role check
  const requiredRoles = to.meta.roles as string[] | undefined
  if (requiredRoles && requiredRoles.length > 0) {
    if (!auth.hasAnyRole(requiredRoles)) {
      return next('/') // Unauthorized — redirect to dashboard
    }
  }

  next()
})

export default router
```

---

### 3.4 Login View: `src/views/LoginView.vue`

```vue
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">
        ABSA Customer Lifecycle AI
      </h1>

      <div v-if="error" class="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
        {{ error }}
      </div>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            v-model="username"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="AD username"
          />
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Password"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 font-medium"
        >
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>

      <p class="mt-4 text-xs text-center text-gray-500">
        Use your ABSA network credentials
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref<string | null>(null)

async function handleLogin() {
  loading.value = true
  error.value = null

  try {
    await auth.login(username.value, password.value)
    const redirect = (route.query.redirect as string) || '/'
    router.push(redirect)
  } catch (e: any) {
    const detail = e.response?.data?.detail
    if (typeof detail === 'string') {
      error.value = detail
    } else if (detail?.error) {
      error.value = detail.error
      if (detail.rules) {
        error.value += ': ' + detail.rules.join(', ')
      }
    } else {
      error.value = 'Login failed. Please try again.'
    }
  } finally {
    loading.value = false
  }
}
</script>
```

---

### 3.5 Role-Based UI: `useRoleCheck`

```typescript
// src/composables/useRoleCheck.ts
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

export function useRoleCheck() {
  const auth = useAuthStore()

  const isAdmin = computed(() => auth.hasRole('ADMIN'))
  const isRelationshipManager = computed(() => auth.hasRole('RELATIONSHIP_MANAGER'))
  const isBranchManager = computed(() => auth.hasRole('BRANCH_MANAGER'))
  const isDataScientist = computed(() => auth.hasRole('DATA_SCIENTIST'))
  const isOperations = computed(() => auth.hasRole('OPERATIONS'))

  const canManageUsers = computed(() => isAdmin.value)
  const canViewDashboard = computed(() =>
    auth.hasAnyRole(['ADMIN', 'RELATIONSHIP_MANAGER', 'BRANCH_MANAGER']),
  )
  const canManageModels = computed(() =>
    auth.hasAnyRole(['ADMIN', 'DATA_SCIENTIST']),
  )
  const canViewMonitoring = computed(() =>
    auth.hasAnyRole(['ADMIN', 'OPERATIONS']),
  )

  return {
    isAdmin,
    isRelationshipManager,
    isBranchManager,
    isDataScientist,
    isOperations,
    canManageUsers,
    canViewDashboard,
    canManageModels,
    canViewMonitoring,
  }
}
```

Usage in templates:

```vue
<template>
  <nav>
    <router-link v-if="canViewDashboard" to="/">Dashboard</router-link>
    <router-link v-if="canManageUsers" to="/admin/users">Users</router-link>
    <router-link v-if="canManageModels" to="/models">Models</router-link>
    <router-link v-if="canViewMonitoring" to="/monitoring">Monitoring</router-link>
  </nav>
</template>

<script setup lang="ts">
import { useRoleCheck } from '@/composables/useRoleCheck'
const { canViewDashboard, canManageUsers, canManageModels, canViewMonitoring } = useRoleCheck()
</script>
```

---

## 4. Token Lifecycle Summary

```
App Start
  │
  ▼
restoreSession()
  ├── No token in localStorage → go to /login
  ├── Token valid → set user, go to route
  └── Token expired → try refresh()
       ├── Refresh OK → set new tokens, go to route
       └── Refresh FAILED → clear tokens, go to /login

User Activity
  │
  ▼
Axios interceptor catches 401
  ├── Auto-refresh with refresh_token
  ├── Queue concurrent requests during refresh
  └── Refresh fails → force logout

User clicks Logout
  │
  ▼
POST /auth/logout → clear localStorage → go to /login

Token expiring (proactive)
  │
  ▼
Check exp every API call or set interval
  └── If < 5 min remaining → refresh()
```

---

## 5. Error Handling Patterns

```typescript
import http from '@/api/http'

// Pattern 1: Try/catch with typed errors
try {
  const { data } = await http.get('/dashboard/customers')
  customers.value = data
} catch (e: any) {
  if (e.response?.status === 403) {
    errorMessage.value = 'You do not have permission to view this page.'
  } else if (e.response?.status === 429) {
    const retryAfter = e.response.data?.detail?.retry_after_seconds ?? 60
    errorMessage.value = `Too many requests. Please wait ${retryAfter} seconds.`
  } else {
    errorMessage.value = 'An error occurred. Please try again.'
  }
}
```

---

## 6. Session Timeout (30 Minutes)

Per `FRONTEND-REQUIREMENTS.md`, sessions should time out after 30 minutes of inactivity.

```typescript
// src/composables/useSessionTimeout.ts
import { onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const INACTIVITY_TIMEOUT = 30 * 60 * 1000 // 30 minutes

export function useSessionTimeout() {
  const auth = useAuthStore()
  const router = useRouter()
  let timer: ReturnType<typeof setTimeout> | null = null

  function resetTimer() {
    if (timer) clearTimeout(timer)
    timer = setTimeout(async () => {
      await auth.logout()
      router.push('/login?reason=timeout')
    }, INACTIVITY_TIMEOUT)
  }

  // Activity events that reset the timer
  const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click']

  onMounted(() => {
    events.forEach((e) => window.addEventListener(e, resetTimer))
    resetTimer()
  })

  onUnmounted(() => {
    if (timer) clearTimeout(timer)
    events.forEach((e) => window.removeEventListener(e, resetTimer))
  })
}
```

---

## 7. Quick Start — Local Development

```bash
# Terminal 1: Start backend gateway
cd absa-foundry-backend/customer-lifecycle-ai
python scripts/seed_iam.py                    # Seed admin user + API keys
python -m uvicorn gateway.main:app --reload    # Gateway on :8080

# Terminal 2: Start frontend
cd absa-foundry-frontend
npm run dev                                     # Vite on :5173

# Login credentials (dev mode):
#   Username: admin
#   Password: Admin123!  (or any password meeting policy)
```

### Verify Flow

```bash
# 1. Login
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"Admin123!"}'

# 2. Copy access_token from response

# 3. Get current user
curl http://localhost:8080/auth/me \
  -H "Authorization: Bearer eyJhbG..."

# 4. List users (admin only)
curl http://localhost:8080/admin/users \
  -H "Authorization: Bearer eyJhbG..."
```
