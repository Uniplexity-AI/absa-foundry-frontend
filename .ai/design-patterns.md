# Design Patterns — ABSA Foundry Frontend

> **CANONICAL REFERENCE:** All new pages, components, and views must adopt these patterns.
> The ETL Run History page (`ETLRunHistory.vue`) is the **design authority** for layout, boxes, tables, typography, and spacing.

---

## 1. Page Layout

Every dashboard page must use the same root structure. **No max-width, no centering, no custom headers.**

```html
<template>
  <div class="dashboard-root global-mesh-bg w-full min-h-screen p-4 md:p-6 lg:p-8">
    <!-- Page content here -->
  </div>
</template>
```

| Rule | Do | Don't |
|------|----|-------|
| Root element | `class="dashboard-root global-mesh-bg w-full min-h-screen p-4 md:p-6 lg:p-8"` | `max-w-[1440px] mx-auto`, custom headers, sidebar wrappers |
| Background | `global-mesh-bg` CSS class | Inline `radial-gradient()`, custom background colors |
| Width | `w-full` (full viewport) | `max-w-*`, constrained widths |

---

## 2. Box / Card Design

**ALL containers must use this exact class string.** This is the single most important rule.

```html
<div class="bg-surface rounded border border-outline-variant global-dotted-bg shadow-sm">
  <!-- card content -->
</div>
```

### Component breakdown

| Class | Purpose | Notes |
|-------|---------|-------|
| `bg-surface` | Background color | CSS variable — never `bg-white` or `bg-[#FFFFFF]` |
| `rounded` | Sharp corners (0.125rem) | Never `rounded-xl`, `rounded-lg` |
| `border` | 1px border | Always paired with border color |
| `border-outline-variant` | Border color | CSS variable — never `border-[#e4e2e2]` |
| `global-dotted-bg` | Dot pattern texture | Always present on boxes |
| `shadow-sm` | Subtle shadow | Always present on boxes |

### Variations

| Card type | Additional classes | Example |
|-----------|-------------------|---------|
| Standard card | `p-5` | Footer metric cards |
| Larger card | `p-6` | Quality trend chart card |
| Flex card | `flex items-center justify-between` | Health status cards |
| Flex column | `flex flex-col justify-between` | Simple metric cards |

### Common card template

```html
<div class="bg-surface rounded border border-outline-variant p-5 shadow-sm global-dotted-bg">
  <p class="text-xs text-on-surface-variant font-label uppercase tracking-wide font-semibold mb-2">Label</p>
  <span class="text-3xl font-headline font-bold text-on-surface">Value</span>
</div>
```

---

## 3. Table Design

### Table container

```html
<div class="bg-surface rounded shadow-sm overflow-hidden global-dotted-bg">
  <!-- table header bar -->
  <!-- table -->
  <!-- pagination -->
</div>
```

> Note: Table container does NOT use `border border-outline-variant` — it uses `shadow-sm` alone for separation.

### Table header bar

```html
<div class="p-5 flex justify-between items-center bg-surface">
  <h3 class="text-headline-md font-headline font-semibold text-on-surface font-bold">Title</h3>
  <!-- optional filters -->
</div>
```

### Table markup

```html
<table class="w-full text-left border-collapse">
  <thead>
    <tr class="bg-surface text-xs text-on-surface-variant font-label uppercase tracking-wider">
      <th class="p-4 font-semibold">Column</th>
    </tr>
  </thead>
  <tbody class="text-sm">
    <tr v-if="items.length === 0">
      <td colspan="N" class="p-12 text-center text-body-md text-secondary">No data</td>
    </tr>
    <tr v-for="item in items" :key="item.id" class="hover:bg-surface-container-low transition-colors">
      <td class="p-4 font-semibold text-on-surface">{{ item.name }}</td>
      <td class="p-4 text-on-surface-variant">{{ item.value }}</td>
    </tr>
  </tbody>
</table>
```

### Status badges (in-table)

```html
<span :class="['inline-flex items-center gap-1.5 text-xs font-bold', statusColor]">
  <span v-if="status === 'RUNNING'" class="w-1.5 h-1.5 rounded-full animate-pulse bg-amber-500"></span>
  <span v-if="status === 'COMPLETED'" class="material-symbols-outlined text-[14px]">check</span>
  <span v-if="status === 'FAILED'" class="material-symbols-outlined text-[14px]">close</span>
  {{ status }}
</span>
```

**Status colors** (computed):
- `COMPLETED` → `text-green-600`
- `FAILED` → `text-red-600`
- `RUNNING` → `text-amber-600`

---

## 4. Pagination

```html
<div class="p-4 flex items-center justify-between bg-surface text-sm text-on-surface-variant">
  <span>{{ total ? `Showing ${from} to ${to} of ${total} results` : 'No results' }}</span>
  <div class="flex items-center gap-1">
    <button @click="prevPage" :disabled="page <= 1"
      class="w-8 h-8 flex items-center justify-center rounded border border-outline-variant hover:bg-surface-variant disabled:opacity-30">
      <span class="material-symbols-outlined text-[16px]">chevron_left</span>
    </button>
    <button v-for="p in totalPages" :key="p" @click="goToPage(p)"
      :class="['w-8 h-8 flex items-center justify-center rounded border font-semibold',
        p === page ? 'bg-primary text-on-primary border-primary' : 'border-outline-variant hover:bg-surface-variant']">
      {{ p }}
    </button>
    <button @click="nextPage" :disabled="page >= totalPages"
      class="w-8 h-8 flex items-center justify-center rounded border border-outline-variant hover:bg-surface-variant disabled:opacity-30">
      <span class="material-symbols-outlined text-[16px]">chevron_right</span>
    </button>
  </div>
</div>
```

---

## 5. Typography — CSS Variable Classes

### Text colors (always use these, never hardcoded hex)

| Class | Purpose | Former hardcoded value |
|-------|---------|----------------------|
| `text-on-surface` | Primary text | `#131010` |
| `text-on-surface-variant` | Secondary / muted text | `#131010` at 70% opacity |
| `text-primary` | Brand red text | `#DC0037` |
| `text-secondary` | Gray / disabled text | — |
| `text-on-primary` | White text on red bg | `#FFFFFF` |

### Typography classes

| Class | Usage |
|-------|-------|
| `text-headline-lg` / `text-headline-md` | Section headings |
| `text-body-md` / `text-body-lg` | Body text |
| `text-xs` | Labels, metadata |
| `text-sm` | Table body, pagination |
| `text-3xl font-headline font-bold` | KPI / metric values |
| `font-label uppercase tracking-wide font-semibold` | Card labels |
| `font-headline font-semibold` | Card titles |

---

## 6. Background & Texture Classes

| Class | Purpose |
|-------|---------|
| `global-mesh-bg` | Page-level background (radial dot mesh) |
| `global-dotted-bg` | Box-level background (dotted texture) |
| `bg-surface` | Card / container background |
| `bg-surface-container-low` | Subtle variation for hover / alternates |
| `bg-surface-variant` | Progress bar background |

---

## 7. Button Patterns

### Primary action button
```html
<button class="px-4 py-2 bg-primary text-on-primary rounded flex items-center gap-2
  hover:bg-primary-container transition-colors font-label text-sm font-semibold shadow-sm">
  <span class="material-symbols-outlined text-[18px]">icon_name</span>
  Label
</button>
```

### Secondary / outline button
```html
<button class="px-4 py-2 bg-surface text-on-surface border border-outline-variant rounded
  flex items-center gap-2 hover:bg-surface-container-low transition-colors
  font-label text-sm font-semibold shadow-sm">
  <span class="material-symbols-outlined text-[18px]">icon_name</span>
  Label
</button>
```

### Pagination button
```html
<button class="w-8 h-8 flex items-center justify-center rounded border
  border-outline-variant hover:bg-surface-variant disabled:opacity-30">
  <span class="material-symbols-outlined text-[16px]">chevron_left</span>
</button>
```

### Active page button
```html
<button class="w-8 h-8 flex items-center justify-center rounded border font-semibold
  bg-primary text-on-primary border-primary">
  {{ page }}
</button>
```

### Toggle / segment button
```html
<button class="px-3 py-1 text-xs font-semibold rounded bg-surface shadow-sm">Active</button>
<button class="px-3 py-1 text-xs font-semibold rounded text-on-surface-variant">Inactive</button>
```

---

## 8. Page Section Spacing

| Element | Spacing |
|---------|---------|
| Between sections | `mb-8` |
| Between cards in a grid | `gap-4` or `gap-6` |
| Card internal padding | `p-5` (standard) or `p-6` (larger) |
| Page root padding | `p-4 md:p-6 lg:p-8` |

---

## 9. Empty / Null States

Every data-bound element must handle empty state:

```html
<!-- Card with no data -->
<div v-if="items.length === 0" class="bg-surface rounded border border-outline-variant p-5 text-center text-body-md text-secondary">
  No data available
</div>

<!-- Table with no rows -->
<tr v-if="items.length === 0">
  <td colspan="N" class="p-12 text-center text-body-md text-secondary">No records found</td>
</tr>

<!-- Value with null -->
<span>{{ value != null ? value : '—' }}</span>
```

---

## 10. What NOT to Do

| ❌ Don't | ✅ Do |
|---------|------|
| `bg-[#FFFFFF]` or `bg-white` | `bg-surface` |
| `border-[#e4e2e2]` | `border-outline-variant` |
| `text-[#131010]` | `text-on-surface` |
| `text-[#131010]/70` | `text-on-surface-variant` |
| `rounded-xl`, `rounded-lg` | `rounded` |
| `max-w-[1440px] mx-auto` | `w-full` (full width) |
| Custom TopNavBar / header in page | None — layout handles this |
| Inline `style=""` | Tailwind classes |
| `shadow-lg` on boxes | `shadow-sm` |
| `dotted-pattern` (inline class) | `global-dotted-bg` |
| `backdrop-blur-sm` on box headers | `bg-surface` |
| Modal-based editors (unless unavoidable) | Inline / page-filling views |

---

## 11. Quick Copy-Paste: Box Template

```html
<div class="bg-surface rounded border border-outline-variant p-5 global-dotted-bg shadow-sm">
  <p class="text-xs text-on-surface-variant font-label uppercase tracking-wide font-semibold mb-2">
    CARD LABEL
  </p>
  <span class="text-3xl font-headline font-bold text-on-surface">
    {{ value != null ? value : '—' }}
  </span>
</div>
```

## 12. Quick Copy-Paste: Table Template

```html
<div class="bg-surface rounded shadow-sm overflow-hidden global-dotted-bg">
  <div class="p-5 flex justify-between items-center bg-surface">
    <h3 class="text-headline-md font-headline font-semibold text-on-surface font-bold">Table Title</h3>
  </div>
  <div class="overflow-x-auto">
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="bg-surface text-xs text-on-surface-variant font-label uppercase tracking-wider">
          <th class="p-4 font-semibold">Column A</th>
          <th class="p-4 font-semibold">Column B</th>
        </tr>
      </thead>
      <tbody class="text-sm">
        <tr v-if="items.length === 0">
          <td colspan="2" class="p-12 text-center text-body-md text-secondary">No data</td>
        </tr>
        <tr v-for="item in items" :key="item.id" class="hover:bg-surface-container-low transition-colors">
          <td class="p-4 font-semibold text-on-surface">{{ item.a }}</td>
          <td class="p-4 text-on-surface-variant">{{ item.b }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```
