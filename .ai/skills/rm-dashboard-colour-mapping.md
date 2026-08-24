# Skill: RM Dashboard — Colour Mapping Spec

> **CRITICAL:** Use this skill when building or styling any RM Dashboard component. Every colour decision must trace back to this spec.
> **Source:** Absa Brand Guide (Feb 2024, V3) only.
> **Reusable components:** `AbsaButton`, `AbsaCard`, `AbsaBadge`, `AbsaGradientBg`, `AbsaSectionHeader`, `AbsaStatCard` from `@/components/ui`.

---

## ✅ Conflict Resolved: System Status Colours

The initial brand guide lacked standard traffic-light status colors. For the Intelligence Unit and RM Dashboard UIs, we have established a standardized set of system colors specifically for functional indicators (health scores, at-risk flags, heatmaps):

- **Success / Active:** `text-green-600` or `bg-green-600`
- **Warning / At-Risk:** `text-amber-700` or `bg-amber-700`
- **Critical / Churned:** `text-red-900` or `bg-red-900`

**Important:** These colors are ONLY for functional status indicators (like `AbsaBadge` states). They must NEVER be used for large backgrounds, hero sections, or non-functional decorative elements.

---

## Severity Scale (Replaces earlier Passion/Power gradient mapping)

| Severity Tier | Colour | HEX | AbsaBadge/Tailwind |
|---|---|---|---|
| Best / Lowest risk | Green | N/A | `green-600` |
| Moderate / High risk | Amber | N/A | `amber-700` |
| Critical / Churned | Red | N/A | `red-900` |
| Critical / Highest | Inspire | `#77021E` | Not applicable as a badge |

> **Note:** This is an **inverted** scale from typical red=bad. Passion (brightest red) = best tier. Inspire (darkest red) = worst tier. This aligns with the brand guide's own light→dark gradient ordering.

---

## 1. RM Dashboard — Summary Cards (FR-DASH-01)

| Element | Colour | Basis | Component |
|---|---|---|---|
| Card background | Serene (`#FFFFFF`) | Application ratios: "predominantly white layouts are an exception where red backgrounds cannot be used" | `AbsaCard` default |
| Card value text | Enrich (`#131010`) | Contrast table: Enrich on Serene = High | Native in `AbsaStatCard` |
| "At Risk %" — lowest tier | Passion (`#DC0037`) | Website/Banking App permitted | `AbsaStatCard` accent |
| "At Risk %" — middle tier | Power (`#B50232`) | Website/Banking App permitted | `AbsaStatCard` accent |
| "At Risk %" — highest tier | Inspire (`#77021E`) | Website/Banking App permitted | `AbsaStatCard` accent |
| "Dormant %" card | Same Passion/Power/Inspire progression | Same basis | `AbsaStatCard` accent |
| Card border/divider | Neutral Grey | Neutrals permitted for Website/Banking App | `AbsaCard` border |

## 2. Priority Alerts (FR-DASH-02)

| Element | Colour | Basis | Component |
|---|---|---|---|
| Alert list background | Serene | Application ratios (white-layout exception) | `AbsaCard` flat |
| Alert severity marker | Passion / Power / Inspire, by tier | Website/Banking App permitted | Custom icon/badge |
| Alert text | Enrich on Serene | Contrast table: High | Default text |
| Acknowledged/read alert text | Neutral Grey | Neutrals permitted | `text-gray-400` |

## 3. Customer Table (FR-DASH-03)

| Element | Colour | Basis | Component |
|---|---|---|---|
| Table background | Serene | Application ratios | White bg |
| Header row | Power bg, Serene text | Contrast: Serene on Power = High | Custom table header |
| State icon — Active | Passion (`#DC0037`) | Website/Banking App | `AbsaBadge` (custom) |
| State icon — At Risk | Power (`#B50232`) | Website/Banking App | `AbsaBadge` (custom) |
| State icon — Dormant | Hope (`#95052A`) | Website/Banking App | `AbsaBadge` (custom) |
| State icon — Churned | Inspire (`#77021E`) | Website/Banking App | `AbsaBadge` (custom) |
| Row hover | Lightest Neutral Grey | Neutrals permitted | `hover:bg-gray-50` |

> **Note:** The current `AbsaBadge` component uses green/orange/gray/red for lifecycle states per the functional spec. Per this brand-only spec, states should use the brand reds. This needs resolution (see conflict above).

## 4. Customer Detail — AI Health Score Gauge (FR-CUST-02)

| Score Band | Colour | Basis |
|---|---|---|
| Highest band (best health) | Passion (`#DC0037`) | Website/Banking App |
| Middle band | Power (`#B50232`) | Website/Banking App |
| Lowest band (worst health) | Inspire (`#77021E`) | Website/Banking App |
| Gauge track (unfilled) | Neutral Grey | Neutrals permitted |
| Gauge label text | Enrich | Contrast: Enrich on Serene = High |
| Trend — improving | Passion | Consistent with best-tier |
| Trend — worsening | Inspire | Consistent with worst-tier |

## 5. State Timeline (FR-CUST-03)

| Functional State | Colour | Basis |
|---|---|---|
| Active | Passion (`#DC0037`) | Website/Banking App |
| At Risk | Power (`#B50232`) | Website/Banking App |
| Dormant | Neutral Grey | Neutrals permitted |
| Churned | Inspire (`#77021E`) | Website/Banking App |
| Timeline connecting line | Neutral Grey | Neutrals permitted |
| Tooltip bg/text | Enrich bg, Serene text | Contrast: Serene on Enrich = High |

## 6. NBA Recommendations (FR-CUST-05)

| Element | Colour | Basis | Component |
|---|---|---|---|
| Priority badge — highest | Inspire (`#77021E`) | Website/Banking App | `AbsaBadge` variant |
| Priority badge — middle | Power (`#B50232`) | Website/Banking App | `AbsaBadge` variant |
| Priority badge — lowest | Passion (`#DC0037`) | Website/Banking App | `AbsaBadge` variant |
| [Log Action] button | Passion bg, Serene text | Contrast: Serene on Passion = High | `AbsaButton variant="absa"` |
| Confidence % text | Enrich on Serene | Contrast: High | Default text |

## 7. Portfolio View — Heatmap & Distribution (FR-PORT-01/02/03)

| Element | Colour | Basis |
|---|---|---|
| Churn risk heatmap scale | Passion → Power → Hope → Inspire | Gradient rules: always include Passion, light→dark, ≤3 approved colours |
| State Distribution donut/pie | Passion / Power / Hope-or-Grey / Inspire | Website/Banking App |
| Health Score histogram bars | Passion | Primary colour for single-series chart |
| Branch average overlay | Enrich (`#131010`) | Website/Banking App |
| Bank-wide average overlay | Neutral Grey | Neutrals permitted |

## 8. Buttons, Links & Interactive Elements

| Element | Colour | Basis | Component |
|---|---|---|---|
| Primary button | Passion bg, Serene text | Contrast: Serene on Passion = High | `AbsaButton variant="absa"` |
| Secondary button | Serene bg, Passion text/border | Contrast: Passion on Serene = High | `AbsaButton variant="outline"` |
| Disabled button | Neutral Grey bg + text | Neutrals permitted | `AbsaButton :disabled` |
| Link text | Passion | Contrast: Passion on Serene = High | `text-[--absa-passion]` |
| Focus/active outline | Passion | Consistent with primary interactive | Built into `AbsaButton` |

## 9. Operations Screens (FR-OPS-01/02/03)

| Element | Colour | Basis |
|---|---|---|
| ETL status — Completed | Passion (`#DC0037`) | Website/Banking App |
| ETL status — Failed | Inspire (`#77021E`) | Website/Banking App |
| ETL status — Running | Power (`#B50232`) | Website/Banking App |
| Data quality threshold line | Enrich (`#131010`) | Contrast: Enrich on Serene = High |
| System health — up | Passion | Website/Banking App |
| System health — down | Inspire | Website/Banking App |

---

## Quick Reference: Which Component to Use

| Dashboard Element | Use |
|---|---|
| Summary stat cards | `<AbsaStatCard label="AT RISK" :value="count" accent-color="var(--absa-passion)" />` |
| Primary action button | `<AbsaButton variant="absa">Log Action</AbsaButton>` |
| Secondary/cancel button | `<AbsaButton variant="outline">Cancel</AbsaButton>` |
| Content card | `<AbsaCard accent="passion">...</AbsaCard>` |
| Section header | `<AbsaSectionHeader title="Portfolio Overview" overline="ANALYTICS" color="passion" />` |
| Priority badge | Custom — see Section 6 (Passion/Power/Inspire bg, Serene text) |
| Gradient hero/header | `<AbsaGradientBg variant="passion-to-power" padding="lg">` |
| Heatmap scale | Custom gradient: `linear-gradient(90deg, #DC0037, #B50232, #95052A, #77021E)` |

## Decision Needed Before Implementation

Section 0's substitution (brand reds standing in for the functional spec's green/amber/red) resolves a conflict that the brand guide itself does not address. **Confirm with Absa's brand/design owner (BrandHelp@absa.africa) before building**, since it is an interpretation applied to fill a gap, not a rule stated in the guide.
