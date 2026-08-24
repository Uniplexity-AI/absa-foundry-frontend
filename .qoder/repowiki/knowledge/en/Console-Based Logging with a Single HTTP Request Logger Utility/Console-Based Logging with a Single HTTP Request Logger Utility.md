---
kind: logging_system
name: Console-Based Logging with a Single HTTP Request Logger Utility
category: logging_system
scope:
    - '**'
source_files:
    - src/utils/requestLogger.js
    - server.js
    - src/main.js
    - scripts/update-sw-cache.js
    - src/composables/settings/useSettingsAudit.js
    - src/composables/settings/useSettingsApprovals.js
    - src/composables/settings/useSettingsBase.js
    - src/composables/settings/useSettingsCurrency.js
    - src/composables/settings/useSettingsEmail.js
    - src/composables/settings/useSettingsGoals.js
---

## What system/approach is used

The ABSA Foundry Frontend does **not** use a dedicated logging framework (no pino, winston, loglevel, bunyan, or similar dependency). All logging in both the Vue SPA and the lightweight Express server is done via the native `console.*` API (`console.log`, `console.error`, `console.warn`, `console.groupCollapsed`). There is no centralized logger module, no structured log object schema, no log-level configuration, and no external sink — logs go directly to the browser console or Node stdout.

The only reusable logging helper is `src/utils/requestLogger.js`, which wraps `fetch` to emit grouped request/response logs for HTTP calls. It deliberately avoids logging Authorization headers or other secrets and prints the parsed JSON payload when possible, falling back to raw text if parsing fails.

## Key files and packages

- `src/utils/requestLogger.js` — the sole shared utility that emits structured-ish console output around HTTP requests/responses using `console.groupCollapsed`, `console.log`, and `console.error`.
- `server.js` — Express static server; uses bare `console.error(err.stack)` in error middleware and `console.log`/`console.error` on startup and errors.
- `src/main.js` — application bootstrap; uses `console.log`/`console.error`/`console.warn` for PWA install prompt capture, service worker registration lifecycle events, dev-bypass diagnostics, and app version checks.
- `scripts/update-sw-cache.js` — build-time script that uses `console.log` to report cache update status.
- Various composables under `src/composables/settings/` (e.g. `useSettingsAudit.js`, `useSettingsApprovals.js`, `useSettingsBase.js`, `useSettingsCurrency.js`, `useSettingsEmail.js`, `useSettingsGoals.js`) — each contains ad-hoc `console.error`/`console.warn` calls at failure points, often prefixed with a module tag like `[Audit]` or `[Settings]`.

## Architecture and conventions

- **No central logger**: Every file that needs to log imports nothing and calls `console.*` directly. There is no `logger.js`, no `log.js`, and no package.json dependency for logging.
- **Ad-hoc grouping for HTTP traffic**: `requestLogger.js` groups related request/response lines with `console.groupCollapsed(...)` so developers can expand/collapse network activity in the DevTools Console.
- **Module-tagged messages**: Some composables prefix error messages with a bracketed module name (e.g. `[Audit] GET /audit-logs/ failed:`) to visually distinguish sources in the console.
- **Level usage is informal**: `console.log` is used for informational/status messages (service worker updates, server start, new version detected), `console.warn` for non-fatal failures (failed fetches, subscription checks), and `console.error` for actual exceptions and error responses. There is no runtime level filter — all levels are always emitted.
- **Secrets avoidance**: The comment in `requestLogger.js` explicitly states it avoids logging Authorization headers or other secrets; the implementation omits header inspection but does not strip arbitrary sensitive fields from payloads.
- **Server-side logging is minimal**: The Express server only logs unhandled errors and startup/shutdown events; there is no request/response logging middleware.

## Conventions and constraints

- **Observed convention**: Log messages use emoji prefixes in user-facing or developer-friendly contexts (e.g. `✨ Captured beforeinstallprompt event globally`, `🚧 Dev bypass enabled`, `❌ Service Worker registration failed`, `🔄 New app version detected`) — this is a stylistic choice in `main.js` and `scripts/update-sw-cache.js`, not enforced by any linter or config.
- **No enforced rule exists**: There is no ESLint rule, commit hook, or CI check that enforces structured logging, log levels, or prohibits `console.log`. The pattern is purely conventional and scattered across files.
- **Structured fields are absent**: Logs are plain strings; there is no consistent shape (timestamp, level, correlation ID, user context) across outputs. Only `requestLogger.js` produces a semi-structured group of key/value-like lines per request.
- **Scope limitation**: This logging approach applies to the entire repository as observed — both the Vite-built SPA under `src/` and the Express server under `server.js` rely exclusively on `console.*` with no third-party logging library.