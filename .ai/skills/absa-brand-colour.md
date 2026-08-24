# Skill: ABSA Brand Colour System

> **CRITICAL:** Use this skill when choosing colours, contrast pairs, gradients, or checking a layout against ABSA brand rules.
> **Rule:** No colours outside this palette. No custom tints, shades, or "variations." Exactly what's specified here.

## When to Apply

- Picking background or text colours for any component
- Building gradients
- Designing new views or layouts
- Reviewing UI for brand compliance
- Configuring Tailwind theme colours
- **For RM Dashboard-specific elements, also see [rm-dashboard-colour-mapping.md](./rm-dashboard-colour-mapping.md)** — it maps every dashboard element (FR-DASH-01 through FR-OPS-03) to a brand colour
- Reviewing UI for brand compliance
- Configuring Tailwind theme colours

---

## Tailwind Configuration

These must be in `tailwind.config.js`:

```javascript
colors: {
  absa: {
    passion: '#DC0037',   // Primary — always present
    power:   '#B50232',   // Secondary
    hope:    '#95052A',   // Secondary
    inspire: '#77021E',   // Secondary
    energy:  '#FF780F',   // Accent — use sparingly
    uplift:  '#F93F24',   // Accent — use sparingly
    enrich:  '#131010',   // Accent — black
    serene:  '#FFFFFF',   // White
  }
}
```

## Core Rules

1. **Passion is always present** — designs must "show up red."
2. **Accent colours sparingly** — Energy and Uplift for warm-red accents, never as primary backgrounds.
3. **Website/Banking App accent = Enrich only** — no Energy/Uplift in app UI backgrounds per brand matrix.
4. **Gradients: digital only, backgrounds only, always include Passion** — bottom-left to top-right, 45°, 70:30 ratio.
5. **System State Colours:** For status indicators (e.g., success, warning, churned), use ONLY `green-600` (Success/Active), `amber-700` (Warning/At-Risk), and `red-900` (Critical/Churned).
6. **FORBIDDEN COLOURS:** Under no circumstances should `blue-*`, `indigo-*`, `purple-*`, or `violet-*` be used anywhere in the UI.
7. **Contrast: never same colour for text + background** — use the contrast tables below.

## High-Contrast Pairs (Safe Defaults)

| Background | Text |
|------------|------|
| Serene (white) | Passion, Power, Hope, Inspire, Enrich, Energy, Uplift |
| Passion | Serene, Energy, Inspire, Enrich |
| Power | Serene, Energy, Uplift, Inspire, Enrich |
| Hope | Serene, Energy, Uplift, Enrich |
| Inspire | Serene, Energy, Uplift, Passion, Enrich |
| Enrich | Serene, Energy, Uplift, Hope |

## Gradient Recipes

```
Passion → Uplift    = youthful, energetic, dynamic
Passion → Power     = balanced mid-point
Passion → Inspire   = elegant, premium, sophisticated
Energy → Passion → Hope   = youthful tricolour
Uplift → Passion → Inspire = balanced tricolour
Passion → Inspire → Enrich = sophisticated tricolour
```

## CSS Custom Properties

```css
:root {
  --absa-passion: #DC0037;
  --absa-power: #B50232;
  --absa-hope: #95052A;
  --absa-inspire: #77021E;
  --absa-energy: #FF780F;
  --absa-uplift: #F93F24;
  --absa-enrich: #131010;
  --absa-serene: #FFFFFF;
}
```

## Checklist (Before Committing UI)

- [ ] No custom colours outside the palette
- [ ] Passion is dominant (design "feels red")
- [ ] Accent colours (Energy/Uplift) used sparingly
- [ ] Gradients: 45°, include Passion, background only
- [ ] Text-background contrast uses approved pairs
- [ ] Enrich is the only accent used in app UI backgrounds (per brand matrix)
- [ ] Prefer reusable `Absa*` components over raw HTML (see below)

---

## Reusable Brand Components

**Always prefer these over raw HTML elements.** They enforce brand rules automatically.

Import from `@/components/ui`:

```javascript
import { AbsaButton, AbsaCard, AbsaBadge, AbsaGradientBg, AbsaSectionHeader, AbsaStatCard } from '@/components/ui'
```

### Component → Brand Rule Mapping

| Instead of | Use | Why |
|---|---|---|
| `<button class="...">` | `<AbsaButton variant="absa">` | Enforces Passion bg, hover→Power, focus ring |
| `<div class="bg-white shadow...">` | `<AbsaCard accent="passion">` | Red accent bar, brand hover gradient, consistent rounding |
| `<span class="bg-green-100...">` | `<AbsaBadge state="active">` | Correct lifecycle colours (green=Active, orange=At-Risk, red=Churned) |
| `<div style="background:linear-gradient...">` | `<AbsaGradientBg variant="passion-to-power">` | 45° angle enforced, Passion always included, brand-approved combos only |
| `<h2>Section Title</h2>` | `<AbsaSectionHeader title="..." color="passion">` | Red vertical bar, correct typography scale, overline slot |
| Custom KPI card | `<AbsaStatCard label="..." :value="..." accent-color="var(--absa-passion)">` | Red top bar, formatted value (currency/percent/number), trend indicator |

### Quick Reference

```vue
<!-- Buttons -->
<AbsaButton variant="absa">Primary</AbsaButton>
<AbsaButton variant="outline">Secondary</AbsaButton>
<AbsaButton variant="ghost">Tertiary</AbsaButton>
<AbsaButton variant="danger" size="sm">Delete</AbsaButton>

<!-- Cards -->
<AbsaCard accent="passion" hoverable>
  <template #header><AbsaSectionHeader size="sm" title="Card Title" /></template>
  Content
  <template #footer>Footer actions</template>
</AbsaCard>

<!-- Badges (customer lifecycle) -->
<AbsaBadge state="active">Active</AbsaBadge>
<AbsaBadge state="at-risk">At Risk</AbsaBadge>
<AbsaBadge state="dormant">Dormant</AbsaBadge>
<AbsaBadge state="churned">Churned</AbsaBadge>

<!-- Gradients (backgrounds only) -->
<AbsaGradientBg variant="passion-to-power" padding="lg" rounded="xl">
  <h1 class="text-white font-extrabold text-3xl">Dashboard</h1>
</AbsaGradientBg>

<!-- Section headers -->
<AbsaSectionHeader
  title="Portfolio Overview"
  overline="ANALYTICS"
  subtitle="Last updated: today"
  color="passion"
>
  <template #actions>
    <AbsaButton size="sm" variant="outline">Export</AbsaButton>
  </template>
</AbsaSectionHeader>

<!-- Stat cards -->
<AbsaStatCard
  label="CHURN RATE"
  :value="0.034"
  format="percentage"
  :trend="-2.1"
/>
<AbsaStatCard
  label="TOTAL CLV"
  :value="2450000"
  format="currency"
  accent-color="var(--absa-power)"
/>
```

## Reference

Full brand guide at `docs/Absa_colour_guideline (1).md`. For official sign-off: BrandHelp@absa.africa.
