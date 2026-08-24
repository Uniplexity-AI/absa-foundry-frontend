---
kind: error_handling
name: Error Handling in ABSA Foundry Frontend — Axios Interceptors, Store-Level try/catch, and Express Middleware
category: error_handling
scope:
    - '**'
source_files:
    - src/services/api.js
    - src/services/etlApi.js
    - src/stores/etlStore.js
    - src/views/auth/login.vue
    - src/views/403.vue
    - src/router/index.js
    - server.js
---

## Overview

The ABSA Foundry Frontend (Vue 3 SPA + lightweight Express server) uses a layered error-handling approach: HTTP-level handling via an Axios response interceptor with automatic token refresh, per-service `_handleRes` helpers that normalize backend errors into `Error` objects with `.status`/`.data`, Pinia stores that catch failures and expose reactive `loading`/`error` state, Vue views that render user-facing banners for auth/network failures, and a single Express error middleware on the Node server.

There is no centralized custom error class hierarchy or global Vue error handler; instead, each layer handles what it can and surfaces the rest upward.

## HTTP Layer — Axios Interceptor (`src/services/api.js`)

- **Request interceptor**: injects `Authorization: Bearer <token>` from `localStorage` into every axios request.
- **Response interceptor** (lines 90–146): centralizes 401 handling:
  - Skips retry for `/auth/login` and `/auth/refresh` endpoints.
  - On first 401, attempts to call `/auth/refresh` using `refresh_token` from localStorage. If successful, updates both tokens, replays the original request, and drains a `failedQueue` of waiting requests.
  - If refresh fails or no refresh token exists, clears tokens and redirects to `/login`.
  - Non-401 errors are rejected unchanged.
- `postRequest` helper (lines 40–62) wraps legacy POST calls and throws `new Error(data.detail || data.message || "Request failed")` when `response.ok` is false.
- `logout()` swallows logout errors with `.catch(console.log)` so clearing local storage proceeds regardless.

## Service Helpers — Normalized Errors (`src/services/etlApi.js`)

Each service function goes through a shared `_handleRes(res)` helper (lines 18–38):

1. Reads response text and tries to parse JSON (falls back to `null`).
2. If `!res.ok`, extracts a human-readable message from `data.detail`, `data.message`, `data.error`, arrays of `{msg|message}`, or nested objects, then constructs `new Error(msg)` and attaches `.status = res.status` and `.data = parsed body` before throwing.
3. Returns parsed data on success.

This convention gives callers a uniform `Error` object they can inspect for `e.status` and `e.data`.

## Store-Level Handling — Reactive `loading`/`error` State

Stores follow a consistent pattern: set `loading = true`, `error = null`, wrap the async call in `try/catch`, store the error message in a reactive `error` ref, log via `console.error`, and always clear `loading` in `finally`.

Example — `src/stores/etlStore.js` `loadDashboard`:
```js
loading.value = true
error.value = null
try {
  const data = await fetchETLDashboard(...)
  // update state
} catch (e) {
  error.value = e.message || 'Failed to load ETL dashboard'
  console.error('[etlStore] loadDashboard failed:', e)
} finally {
  loading.value = false
}
```

The store exposes `loading` and `error` as refs so components can bind to them directly.

## View-Level Presentation — User-Facing Error Banners

Views handle presentation errors locally rather than relying on a global toast system (the `ui` store's `showErrorToast` currently only `console.log`s).

- **Login page** (`src/views/auth/login.vue`): maintains `errorMessage`, `successMessage`, and per-field `errors` reactive objects. A `login__error-banner` div renders a red banner with an icon when `errorMessage` is set. The submit handler catches network/auth errors and sets a friendly message: `'Invalid username or password. Please verify your Active Directory credentials or contact IT Support.'`.
- **403 page** (`src/views/403.vue`): a dedicated route rendering a static "Unauthorized Access" message, navigable back to the dashboard.
- Route guard (`src/router/index.js`): redirects unauthorized users to `/403` based on role/module subscription checks stored in localStorage.

## Server-Side Error Handling (`server.js`)

The Express server defines a standard 4-argument error middleware at the top of the stack (line 14–17):
```js
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```
It also attaches a `.on('error', ...)` listener to the listening server instance to log startup failures.

## Conventions Observed

| Area | Convention | Evidence |
|---|---|---|
| Network errors | Throw `new Error(message)` with optional `.status` and `.data` attached | `src/services/etlApi.js:_handleRes` |
| Auth failures | Centralized in Axios response interceptor; auto-refresh + redirect to `/login` | `src/services/api.js` response interceptor |
| Store errors | Catch, assign to reactive `error` ref, log with `console.error`, clear `loading` in `finally` | `src/stores/etlStore.js` |
| UI errors | Render inline banners/messages in the view that triggered the action | `src/views/auth/login.vue` |
| Authorization errors | Redirect to `/403` route via router guard | `src/router/index.js` |
| Server errors | Single Express error middleware returns 500 with generic message | `server.js` |
| Logout failures | Silently swallowed so cleanup still proceeds | `src/services/api.js:logout` |

## Constraints & Gaps

- There is no application-wide Vue error boundary or global `app.config.errorHandler`; errors bubble up to the browser console unless caught by a component/store.
- Toast/notification infrastructure exists as stubs in `src/stores/ui.js` but is not wired into error flows yet.
- Not all services use a centralized `_handleRes` helper — some call axios/fetch directly without normalizing errors (e.g., `api.js` `Signup`, `login`, `refreshToken`), leaving error handling to the caller.
- No custom error type classes or sentinel codes are defined; status codes are passed through as `Error.status` where available.