---
kind: build_system
name: Vite + Express Build, Docker Packaging & Google Cloud Deployment Pipeline
category: build_system
scope:
    - '**'
source_files:
    - package.json
    - vite.config.js
    - Dockerfile
    - server.js
    - cloudbuild.yaml
    - .github/workflows/docker-image.yml
    - app.yaml
    - scripts/update-sw-cache.js
    - tailwind.config.js
    - postcss.config.js
    - vitest.config.js
---

## Build System Overview

The ABSA Foundry Frontend is a Vue 3 SPA built with **Vite** and served in production by a lightweight **Express** static server. The build pipeline produces a `dist/` bundle that is deployed to **Google App Engine** via Cloud Build, or containerized as a multi-stage **Docker** image.

## Build Toolchain

- **Build tool**: Vite 6 (`vite.config.js`) with the official Vue plugin (`@vitejs/plugin-vue`).
- **PWA**: `vite-plugin-pwa` configured with `injectManifest` strategy pointing at `src/sw.js`; manifest generated into `public/manifest.json`. Service Worker cache names are versioned per build via a pre-build script.
- **CSS pipeline**: Tailwind CSS 3 + PostCSS (`tailwind.config.js`, `postcss.config.js`).
- **Module resolution**: `@` alias resolves to `./src` (Vite resolve alias).
- **Dev server**: Vite dev server binds to `0.0.0.0:3000`.
- **Testing**: Vitest (`vitest.config.js`) for unit tests; Playwright (`@playwright/test`) installed as a dev dependency for potential E2E runs.

## NPM Scripts (`package.json`)

| Script | Command | Purpose |
|---|---|---|
| `dev` | `vite` | Local development server |
| `build` | `node scripts/update-sw-cache.js && vite build` | Pre-injects timestamp-based cache versions into `sw.js`, then builds the optimized bundle |
| `preview` | `vite preview` | Preview production build locally |
| `serve` | `vue-cli-service serve --host 0.0.0.0 --port $PORT` | Legacy fallback using vue-cli (not used by current Vite pipeline) |
| `test` | `vitest` | Unit test runner |

## Production Server (`server.js`)

A minimal Express app serves the Vite-built `dist/` directory:
- Enables gzip compression via `compression()`.
- Serves `index.html` with `Cache-Control: no-cache, no-store, must-revalidate` so the browser always fetches the latest HTML (which references content-hashed JS/CSS assets).
- Serves all other static assets from `dist/` with aggressive caching (`maxAge: '30d'`).
- Falls back to `dist/index.html` for every non-static route, enabling client-side SPA routing.
- Listens on `process.env.PORT || 3000`.

## Docker Image (`Dockerfile`)

Multi-stage build using `node:24-alpine`:
1. **Builder stage**: Installs system deps needed by native modules (`python3`, `make`, `g++`, `cairo-dev`, `jpeg-dev`, `pango-dev`, `giflib-dev`), sets npm retry/retry-factor settings and configures the registry to `https://registry.npmmirror.com/` to avoid 429 errors, copies `package*.json` and runs `npm ci --legacy-peer-deps` (falling back to `npm install`), then executes `npm run build` with `NODE_OPTIONS="--max-old-space-size=4096"` to prevent heap OOM during Vite bundling.
2. **Runtime stage**: Copies only runtime OS libs (`cairo`, `jpeg`, `pango`, `giflib`), installs production-only Node deps (`npm ci --omit=dev --ignore-scripts --legacy-peer-deps`), copies `dist/` from the builder stage plus `server.js`, exposes port 3000, and runs `node server.js`.

Build-time env vars are injected via `ARG`/`ENV` for Vite's `VITE_*` variables: `VITE_GOOGLE_CLIENT_ID`, `VITE_API_BASE_URL`, `VITE_ASSETS_MANAGER_MFE_URL`.

## CI / CD Pipelines

### GitHub Actions (`/.github/workflows/docker-image.yml`)
- Triggered on push/PR to `main`.
- Checks out code and runs `docker build . --file Dockerfile --tag my-image-name:$(date +%s)` on `ubuntu-latest`.

### Google Cloud Build (`cloudbuild.yaml`)
- Uses `node:24` images to `npm install` then `npm run build --no-cache`.
- Deploys the resulting `dist/` to Google App Engine via `gcloud app deploy`.
- Runs on an `E2_HIGHCPU_8` machine type with a 1600s timeout and `NO_CACHE=true` env var.

### App Engine Config (`app.yaml`)
- Declares `runtime: nodejs24`.
- Routes all file extensions (`/(.*\..+)$`) to `dist/<file>` for static asset serving.
- Fallback route (`/.*`) serves `dist/index.html` for SPA client-side routing.

## Versioning & Caching Strategy

- **Service Worker cache busting**: `scripts/update-sw-cache.js` runs before `vite build`. It reads `src/sw.js`, replaces hardcoded cache names (`api-cache`, `static-assets-v2`, `fonts-v2`, `images-v2`) with timestamp-versioned variants (`api-cache-v<epoch>`, etc.), and rewrites the `currentCaches` array accordingly. This forces the browser to invalidate old caches on each build.
- **Asset caching**: Vite generates content-hashed filenames for JS/CSS; the Express server caches them aggressively (`30d`) while never caching `index.html`.
- **Package version**: `package.json` declares `version: "2.0.1"` (semantic versioning); no automated bump step was found in the scripts.

## Conventions Observed

- All build-time configuration lives in root-level config files: `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `vitest.config.js`, `jsconfig.json`.
- Environment-specific values are passed to Vite via `VITE_*` environment variables (injected through Docker `ARG`/`ENV` and consumed at build time).
- Native module build dependencies are isolated to the builder stage of the Docker image to keep the runtime image small.
- The legacy `vue-cli-service serve` script remains in `package.json` but is superseded by Vite's dev server.