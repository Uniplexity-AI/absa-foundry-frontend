---
kind: dependency_management
name: npm-based Dependency Management with Mirror Registry and Local File Package
category: dependency_management
scope:
    - '**'
source_files:
    - package.json
    - package-lock.json
    - Dockerfile
    - .gitignore
    - server.js
---

## System / Approach

This repository uses **npm** as the package manager for a Vue 3 + Vite SPA backed by a small Express server. Dependencies are declared in `package.json` under both `dependencies` (runtime) and `devDependencies` (build/test tooling). A `package-lock.json` is present at the repo root, indicating npm lockfile usage to pin transitive versions.

There is no vendoring strategy — `node_modules` is listed in `.gitignore`, so dependencies are installed fresh from the registry on each build. No private npm registry URL is configured in `.npmrc`; instead, the Dockerfile sets a mirror registry via `npm config set registry https://registry.npmmirror.com/` to avoid rate-limiting (429) errors during CI builds.

## Key Files

- `package.json` — single source of truth for all runtime and dev dependencies; also defines scripts (`dev`, `build`, `preview`, `serve`, `test`).
- `package-lock.json` — locks exact dependency tree versions.
- `Dockerfile` — installs deps via `npm ci --legacy-peer-deps` (with fallback to `npm install --legacy-peer-deps`) in both builder and production stages; pins the npm mirror registry and Node image (`node:24-alpine`).
- `.gitignore` — excludes `node_modules`, `dist`, `coverage`, etc.; does not exclude `package-lock.json`, so it is committed.
- `server.js` — lightweight Express server that serves the built SPA; its own runtime deps (`express`, `cors`, `body-parser`, `compression`, `dotenv`, `serve-static`) come from the same `package.json` `dependencies` block.

## Architecture and Conventions

- **Single-package monorepo**: All frontend and backend code lives in one `package.json`; there is no per-directory `package.json` or workspace setup.
- **Peer dependency handling**: The Dockerfile consistently passes `--legacy-peer-deps` to both `npm ci` and `npm install`, indicating known peer dependency conflicts between packages (e.g., Pinia v3 vs Vuex v4 coexisting).
- **Local file dependency**: `ub-frontend` is declared as `"file:"`, meaning it is expected to be available locally at install time (not published to a registry). This is an internal shared library consumed via a relative path resolved by npm's file protocol.
- **Version ranges**: Most dependencies use caret (`^`) ranges, allowing minor/patch updates within the major version. A few are pinned without a range (e.g., `ub-frontend: "file:"`).
- **Build-time-only tools**: Testing (`vitest`, `@testing-library/vue`, `@playwright/test`), styling (`tailwindcss`, `postcss`, `sass-embedded`), and bundling (`vite`, `vite-plugin-pwa`, `@vitejs/plugin-vue*`) live exclusively in `devDependencies`.
- **Runtime-only tooling**: Runtime libraries such as `axios`, `pinia`, `vue-router`, `chart.js`, `firebase`, `ollama`, `pdfjs-dist`, `workbox-*` are in `dependencies`.

## Conventions and Constraints

- **No `yarn.lock` / `pnpm-lock.yaml`**: Only `package-lock.json` is used; yarn/pnpm lockfiles are ignored but not referenced.
- **Registry override in CI**: The Dockerfile hardcodes `https://registry.npmmirror.com/` as the npm registry to mitigate upstream rate limits. This is enforced only inside the container build; local development still uses the default npm registry unless overridden by user config.
- **Legacy peer deps policy**: Both install commands fall back through `--legacy-peer-deps`, which is a project-wide convention to tolerate peer dependency mismatches rather than upgrading every conflicting package.
- **Local-only internal package**: `ub-frontend` must be placed alongside the repo root before running `npm install`; it is not resolvable from any registry.
- **No `.npmrc` or `.npmrc.local`**: There is no checked-in npm configuration beyond what is set imperatively in the Dockerfile; private registries would need to be configured per-developer or via environment-level npm config.