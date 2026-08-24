# Design Patterns — ABSA Foundry Frontend (Intelligence Unit Standard)

> **CANONICAL REFERENCE:** All new pages, components, and views for the Intelligence Unit, RM dashboards, and Core Application must adopt these patterns. This supersedes previous generalized design guides.

---

## 1. Page Layout & Root Wrappers

Every dashboard page must use the identical root structure for consistency.

**Rule:** `w-full pt-6 px-6 pb-6`

```html
<template>
  <div class="w-full pt-6 px-6 pb-6">
    <!-- Page content here -->
  </div>
</template>
```

| ❌ Don't | ✅ Do |
|---------|------|
| `max-w-[1440px] mx-auto` | `w-full pt-6 px-6 pb-6` |
| Nested deep padding | Clean top-level padding |

---

## 2. Panel / Box Design (High-Density)

We design for an operational, high-density environment. We do NOT use marketing styles, large padding, or heavy shadows. 

**Rule:** `bg-white rounded-sm border border-gray-300 shadow-none mb-6`

```html
<!-- Standard Panel -->
<div class="bg-white rounded-sm border border-gray-300 shadow-none mb-6 overflow-hidden">
  <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
    <div>
      <h2 class="text-sm font-bold text-absa-enrich">Panel Title</h2>
      <p class="text-[11px] text-gray-500 mt-0.5">Descriptive subtitle for context</p>
    </div>
  </div>
  <div class="p-5">
    <!-- content -->
  </div>
</div>
```

**Key Box Rules:**
- **No Box Shadows:** Use `shadow-none` to override any default shadows. Operations tools must stay flat and crisp.
- **Section Spacing:** Always use `mb-6`. **NEVER** use `mb-8` or `mb-10`.
- **Rounding:** Always use `rounded-sm`. Never `rounded-xl` or `rounded-lg`.

---

## 3. High-Density Tables

Tables are the primary interface for operations. They must fit a massive amount of data above the fold.

**Rule:** Table cells (`<td>` and `<th>`) must use `px-3 py-1.5` padding (not `p-4` or `py-3`).

```html
<table class="w-full text-left border-collapse">
  <thead>
    <tr class="border-b border-gray-200 bg-gray-50">
      <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Customer ID</th>
      <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Metric</th>
    </tr>
  </thead>
  <tbody class="divide-y divide-gray-100">
    <tr class="hover:bg-gray-50 transition-colors">
      <td class="px-3 py-1.5 text-xs font-mono text-gray-500">1004592</td>
      <td class="px-3 py-1.5 text-xs font-mono font-bold text-absa-enrich">K 4.5M</td>
    </tr>
  </tbody>
</table>
```

### Table Typography & Data Formatting
- **Numbers & IDs:** ALL numeric table values, currencies, probabilities, and IDs **MUST** have the `font-mono` class.
- **Currencies:** **ALWAYS Zambian Kwacha**. Formatted as `K 1,234`, `K 1.2M`, `K 4.57B`. **Must have a space after the capital K.** Never use Rand (R) or Dollars ($).

---

## 4. Tabs Navigation

Use a clean, flat underline approach for active states. 

**Active Tab Rule:** `text-absa-passion border-b-2 border-absa-passion -mb-px`
**Inactive Tab Rule:** `text-gray-500 border-b-2 border-transparent hover:text-absa-enrich hover:border-gray-300`

---

## 5. UI Primitives & Brand Colors

**Core Colors:**
- **Primary Red:** `text-absa-passion` (`#DC0037`)
- **Dark Text:** `text-absa-enrich` (`#131010`)
- **System States:** `green-600` (success), `amber-700` (warning), `red-900` (critical/churned).
- **FORBIDDEN:** `blue-*`, `indigo-*`, `purple-*`, `violet-*`.

**Reusable Absa Components:**
Always use `AbsaButton`, `AbsaCard`, `AbsaBadge` from `@/components/ui` over raw HTML where applicable. 

---

## 6. Advanced Operational Patterns

### A. Bulk Actions (Tables)
For tables requiring user action (e.g., Win-Back Pipelines, Top Value Customers), always include a checkbox column as the first column, and a conditional `BulkActionsBar`.

```html
<div v-if="selectedItems.size > 0" class="flex items-center gap-3 bg-absa-enrich text-white px-4 py-2 rounded-sm mb-3">
  <span class="text-sm font-semibold">{{ selectedItems.size }} selected</span>
  <div class="ml-auto">
    <button @click="executeBulkAction" class="bg-amber-400 text-absa-enrich px-3 py-1 rounded-sm text-[11px] font-bold">
      Enrol in Campaign
    </button>
  </div>
</div>
```

### B. ML Explainability 
To build trust with business users, AI predictions (Churn Probability, CLV scores) must be explainable. 
**Always use:** `<MlExplainPopover>` next to critical scores. It provides the 80% confidence interval and Top 3 Feature Drivers (with directional impact bars).

### C. Collapsible Scope Notes
Complex analytical panels (e.g., Heatmaps, Sensitivity Analysis, Priority Matrices) must include an explanatory scope note. 
To preserve vertical space, this note must be **collapsible**.

```html
<div class="rounded-sm border border-gray-300 overflow-hidden mb-6">
  <button @click="isExpanded = !isExpanded" class="w-full flex items-center gap-3 px-4 py-2.5 bg-gray-50 text-left hover:bg-gray-100 transition-colors">
    <span class="material-symbols-outlined text-[18px] text-gray-400">info</span>
    <span class="text-xs font-semibold text-gray-600 flex-1">How to read this matrix</span>
    <span class="material-symbols-outlined" :class="isExpanded ? 'rotate-180' : ''">expand_more</span>
  </button>
  <div v-if="isExpanded" class="px-4 pb-3 pt-0 border-t border-gray-100">
    <p class="text-xs text-gray-500 leading-relaxed">Scope note explanation here...</p>
  </div>
</div>
```
