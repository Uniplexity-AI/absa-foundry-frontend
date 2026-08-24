---
kind: configuration_system
name: Vite Environment Variables, Static Config Modules, and Runtime Preferences
category: configuration_system
scope:
    - '**'
source_files:
    - .env
    - vite.config.js
    - src/services/api.js
    - src/config/devFlags.js
    - src/config/rbac.js
    - src/config/moduleCards.js
    - src/config/currency.js
    - src/config/usePreferences.js
    - public/manifest.json
    - public/version.json
    - server.js
    - app.yaml
---

## Overview

The application uses a layered configuration approach built around Vite's `import.meta.env` for build-time variables, plain JavaScript modules under `src/config/` for static feature flags and domain constants, and runtime user preferences persisted to `localStorage` and synced with the backend. There is no centralized config loader — each layer owns its own concern.

## Build-time / Environment Configuration

- **`.env`** (committed) defines `VITE_API_BASE_URL`, pointing at a shared Tailscale-hosted backend so remote developers connect automatically without per-machine setup. The comment explicitly says overrides go in `.env.local` (gitignored).
- **`vite.config.js`** configures the dev server (`host: '0.0.0.0', port: 3000`), PWA via `vite-plugin-pwa` (injectManifest strategy, `sw.js`, `manifest.json`), module aliases (`@` → `./src`), and build options (`target: 'esnext'`, minify disabled). It also declares the PWA manifest name, theme color, icons, and start URL.
- **`public/manifest.json`** mirrors the PWA manifest (name, short_name, theme_color, icons) used by browsers when installed as a PWA.
- **`public/version.json`** holds a static `{ version, buildDate }` object consumed at runtime (e.g., for update banners or cache busting logic).

Environment variable resolution lives in **`src/services/api.js`**: it reads `import.meta.env.VITE_API_BASE_URL`; if empty it falls back to `http://localhost:8080` on localhost or `https://ub-app-backend-692487163735.europe-west1.run.app` otherwise. This is the single source of truth for every API call.

## Static Feature Flags & Domain Constants (`src/config/`)

Configuration that does not change at runtime is kept as ES modules:

| File | Purpose |
|---|---|
| `devFlags.js` | Exposes `DEV_BYPASS` from `import.meta.env.VITE_DEV_BYPASS === 'true'`, a mock JWT payload (`DEV_AUTH_PAYLOAD`), and `ensureDevAuthSession()` which seeds `auth_token` and `user_session` into `localStorage` when bypass mode is active. |
| `rbac.js` | Defines `PERMISSION_TYPES`, `PERMISSION_ENTITIES`, `DEFAULT_ROLES` (owner, manager, cashier, accountant, auditor, attendant, hotel_attendant, asset roles), `HEALTHCARE_ROLE_IDS`, UI preference presets (`DEFAULT_UI_PREFERENCES`, `ORIGINAL_UI_PREFERENCES`, visual style presets like `material`, `flat`, `glassmorphism`), and helpers (`hasPermission`, `mergeRoles`, `validateRole`). Roles can be merged with backend-provided custom roles via `mergeRoles(customRoles, baseRoles)` so runtime overrides win. |
| `moduleCards.js` | Centralizes dashboard module cards, sidebar navigation items, super-admin sidebar items, and the `availableModules` list used by Settings/SubAccount pages to gate features behind subscription flags. Routes are computed from `BASE_ROUTE = '/dashboard'` and `HR_ROUTE = '/'`. |
| `moduleIdMap.js` | Maps module IDs to routes (referenced elsewhere in the app). |
| `currency.js` | Vue plugin exposing `$formatCurrency`, `$formatCurrencyCompact`, `$parseCurrency`, `$getCurrencySymbol`, `$getCurrencyCode` globally plus providing `currencyService` via `app.provide`. |
| `useActivityTracker.js`, `useAudit.js` | Composables that wrap activity tracking / audit logging; they consume the same `API_BASE_URL` from `services/api.js`. |

These modules are imported directly where needed — there is no central registry that consumes them all.

## Runtime User Preferences

**`src/config/usePreferences.js`** is a Vue composable that manages per-user branding and display preferences:

1. Starts with default values in a `reactive` object (`primaryColor`, `secondaryColor`, `tertiaryColor`, `fontFamily`, etc.).
2. On load, tries `localStorage` key `ub_prefs` first for speed.
3. If `DEV_BYPASS` is true, skips the network call and marks `isLoaded`.
4. Otherwise fetches `${API_BASE_URL}/preferences/`, merges the response into the reactive state, persists it back to `localStorage`, and applies CSS custom properties (`--brand-primary`, `--brand-secondary`, `--brand-tertiary`) to `document.documentElement`.
5. `savePreferences(newPrefs)` PUTs the payload to `/preferences/` and updates local storage.

This pattern — read localStorage → optionally hydrate from backend → apply CSS variables — is the only place runtime user-configurable settings live.

## Server-Side Serving Configuration

**`server.js`** (Express) serves the built `dist/` directory with two cache tiers: `index.html` is served with `no-cache, no-store, must-revalidate` so the browser always picks up new content-hashed assets; all other static files get `maxAge: '30d'`. SPA routing falls through to `dist/index.html` for any non-file route. Port defaults to `process.env.PORT || 3000`.

**`app.yaml`** configures Google App Engine to serve `dist/` statically with a fallback to `dist/index.html` for SPA client-side routing.

## Conventions Observed

- All environment variables intended for the browser bundle are prefixed `VITE_` so Vite injects them via `import.meta.env`.
- Backend URLs are never hard-coded in components; they flow through `src/services/api.js`, which centralizes the env-var → fallback resolution.
- Development-only behavior is gated by `import.meta.env.VITE_DEV_*` flags exported from `src/config/devFlags.js`, never by checking `process.env.NODE_ENV` directly in business code.
- RBAC and module visibility are defined declaratively in JS objects (`DEFAULT_ROLES`, `moduleCards.js`, `availableModules`) and can be overridden at runtime by merging backend data (see `mergeRoles`).
- Per-user UI preferences are stored in `localStorage` with a specific key (`ub_prefs`) and synced to a REST endpoint (`/preferences/`); changes are applied immediately by setting CSS custom properties on `:root`.
- PWA metadata is duplicated between `vite.config.js` (build-time) and `public/manifest.json` (runtime), both describing the same app identity and icons.
- Deployment targets (App Engine via `app.yaml`, containerized via `Dockerfile`) treat the entire `dist/` folder as immutable static assets — no server-side templating or dynamic config injection at deploy time.