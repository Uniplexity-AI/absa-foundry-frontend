---
kind: frontend_style
name: Tailwind CSS Design System with ABSA Brand Tokens and Multi-Theme Support
category: frontend_style
scope:
    - '**'
source_files:
    - tailwind.config.js
    - postcss.config.js
    - src/index.css
    - src/assets/base.css
    - src/assets/main.css
    - src/assets/pages.css
    - src/assets/patterns.css
    - src/components/ThemeManager.vue
    - package.json
---

## What system/approach is used

The frontend uses **Tailwind CSS v3** as the primary styling framework, built on top of a custom design token layer defined in CSS custom properties (`:root` variables). The project is a Vue 3 SPA (Vite + PostCSS) that layers three distinct style systems:

1. **Tailwind utility classes** — the default atomic class system for layout, spacing, colors, and responsive breakpoints.
2. **Custom design tokens** — semantic CSS variables under `src/assets/main.css` defining brand colors, spacing scale (`--space-*`), radii (`--radius-*`), shadows (`--shadow-*`), z-index tiers, and UI surface tokens (`--ui-card-surface`, `--ui-surface-outline`, etc.).
3. **ABSA-branded component styles** — hand-written CSS modules in `src/assets/pages.css` and `src/assets/patterns.css` providing domain-specific components (status pills, KPI cards, tables, alerts, timelines) using an `absa-*` BEM-style naming convention.

Dark mode is implemented via Tailwind's `darkMode: "class"` strategy, toggled by adding/removing the `dark` class on `<html>` through `src/components/ThemeManager.vue`. A second runtime theming axis is provided via `data-ui-visual-style` attributes (`material`, `flat`, `minimalism`, `glassmorphism`, `skeuomorphism`) which swap entire visual palettes and surface treatments.

## Key files and packages

- `tailwind.config.js` — extends Tailwind with ABSA brand colors (`absa-passion`, `absa-power`, …), Material Design color tokens, custom fonts (`Hanken Grotesk`, `Space Mono`), spacing/radius/shadow/z-index scales, animations, and maps CSS variables to Tailwind utilities (`brand.*`, `status.*`, `text.primary/secondary/muted`).
- `postcss.config.js` — runs `tailwindcss` then `autoprefixer`.
- `src/index.css` — imports Google Fonts, emits `@tailwind base/components/utilities`, defines mesh/dotted background utilities, scrollbar styling, and modal-scoped blur helpers.
- `src/assets/base.css` — legacy Vue scaffolding tokens (`--vt-c-*`) plus light/dark semantic color aliases.
- `src/assets/main.css` — the central design-token file: declares `--font-family-main`, `--color-*`, `--brand-*`, `--space-*`, `--radius-*`, `--shadow-*`, `--z-*`, dark-mode overrides, and five `data-ui-visual-style` theme blocks (material, flat, minimalism, glassmorphism, skeuomorphism) that override surfaces, buttons, inputs, gradients, and backgrounds per theme.
- `src/assets/pages.css` — page-level component library (`absa-status-pill`, `absa-metric-card`, `absa-table`, `absa-alert-item`, `absa-pipeline-card`, `absa-segment-bar`, `absa-pagination`, etc.) with dark-mode variants.
- `src/assets/patterns.css` — reusable patterns: maroon gradient overlays, mesh backgrounds, dotted textures, alert banners, shimmer/skeleton loaders, gauge tracks, accent bars, and their dark-mode counterparts.
- `src/components/ThemeManager.vue` — runtime dark/light toggle persisted to `localStorage` and synced with `prefers-color-scheme`.
- `package.json` — lists `tailwindcss ^3.4`, `@tailwindcss/forms`, `@tailwindcss/container-queries`, `autoprefixer`, `vite-plugin-pwa`, `sass-embedded`.

## Architecture and conventions

- **Token-first approach**: All colors, spacing, radii, shadows, and z-index values are declared as CSS custom properties in `main.css` and referenced everywhere else via `var(--*)`. Tailwind config maps these variables into named utilities (`brand.primary`, `status.success`, `text.primary`, `spacing.space-6`, etc.), so components compose via both Tailwind classes and semantic tokens.
- **BEM-style component classes**: Domain components use `absa-*` prefixes (e.g., `.absa-status-pill--churned`, `.absa-metric-card__value`, `.absa-alert-item__action--critical`) rather than Tailwind-only composition, keeping shared page-level UI cohesive.
- **Layered utilities**: `pages.css` and `patterns.css` define higher-level building blocks (mesh backgrounds, status pills, KPI cards, tables, alerts) that components compose; `main.css` provides low-level tokens and global resets.
- **Multi-theme via attribute selectors**: Visual style switching is driven by `html[data-ui-visual-style="..."]` selectors that reassign `--ui-card-surface`, `--ui-surface-outline`, `--ui-button-shadow`, gradients, and even input/button appearances. Dark mode stacks on top via `.dark` or `html.dark` selectors.
- **Responsive strategy**: Uses Tailwind's built-in responsive prefixes (`md:`, `lg:`) and container queries (`@tailwindcss/container-queries`). Spacing is expressed through the `--space-*` scale mapped into Tailwind's `spacing` namespace.
- **Typography**: Font families are centralized in `tailwind.config.js` under `fontFamily` (headline-md/lg, body-md, label-sm/caps, metric-lg) and imported from Google Fonts in `index.css`. `--font-scale` allows global font scaling.
- **Component library**: Reusable UI primitives live in `src/components/ui/` (`AbsaButton`, `AbsaCard`, `AbsaBadge`, `AbsaSectionHeader`, `Modal`, `ConfirmDialog`, etc.) and are styled via the shared token system rather than inline styles.

## Conventions and constraints

- **Brand colors must come from tokens**: ABSA brand palette (`absa-passion`, `absa-power`, `absa-hope`, `absa-inspire`, `absa-energy`, `absa-uplift`) and Material Design tokens are the only approved color sources; hard-coded hex literals should be avoided in favor of `var(--brand-primary)` or Tailwind's `brand.*` utilities.
- **Spacing uses the `--space-*` scale**: Margins, paddings, and gaps should reference `--space-1` through `--space-16` (mapped to 4px–64px) via Tailwind's `space-1`…`space-16` utilities rather than arbitrary pixel values.
- **Z-index is tiered**: Shell/header/backdrop/popover/modal/toast z-index values are locked to `--z-shell`…`--z-toast`; new layers must not introduce ad-hoc z-index numbers.
- **Dark mode is class-based**: Themes are toggled by adding/removing the `dark` class on `<html>`; all dark-mode overrides live in `main.css` under `.dark` or `html.dark` selectors.
- **Visual themes are attribute-driven**: Switching between material/flat/minimalism/glassmorphism/skeuomorphism requires setting `data-ui-visual-style` on `<html>`; each theme fully redefines surface, button, input, and pattern styles.
- **Page-level components use `absa-*` BEM naming**: New shared UI should follow the existing `absa-component` / `absa-component__element--modifier` pattern documented in `pages.css` and `patterns.css`.
- **Patterns are scoped to utility classes**: Mesh backgrounds, dotted patterns, and shimmer loaders are exposed as reusable classes (`.mesh-background`, `.dotted-pattern`, `.absa-shimmer`) rather than being duplicated per component.