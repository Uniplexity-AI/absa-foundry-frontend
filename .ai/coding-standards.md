# Coding Standards — ABSA Foundry Frontend

## Vue 3 Conventions

### Component Structure (Always This Order)

```vue
<script setup>
// 1. Imports
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// 2. Props & Emits
const props = defineProps({
  customerId: { type: String, required: true }
})
const emit = defineEmits(['update', 'close'])

// 3. Composables
const router = useRouter()
const store = useSomeStore()

// 4. Reactive state
const loading = ref(false)
const items = ref([])

// 5. Computed
const filtered = computed(() => items.value.filter(...))

// 6. Methods
function handleClick() { ... }

// 7. Lifecycle
onMounted(() => { ... })

// 8. Watchers (if needed)
watch(() => props.customerId, (id) => { ... })
</script>

<template>
  <!-- Template here -->
</template>
```

## Naming Conventions

| Thing | Convention | Example |
|-------|-----------|---------|
| Components | PascalCase, multi-word | `CustomerDetail.vue`, `ETLRunHistory.vue` |
| Composables | `use` prefix, camelCase | `useAuth.js`, `usePortfolio.js` |
| Pinia stores | `use` prefix, camelCase | `useAuthStore.js`, `useETLStore.js` |
| Props | camelCase | `customerId`, `isLoading` |
| Events | kebab-case in template | `@update:model-value` |
| Routes | kebab-case paths | `/branch-manager`, `/customer/:id` |

## API Calls

```javascript
// ✅ DO: Use api.js
import { login, getPortfolio } from '@/services/api'
const data = await login(username, password)

// ❌ DON'T: Raw fetch or axios directly
const res = await fetch('http://...')
const res = await axios.post('http://...')
```

## Styling Rules

```vue
<template>
  <!-- ✅ DO: Tailwind classes -->
  <div class="flex items-center gap-4 p-6 bg-white rounded-lg shadow">

  <!-- ❌ DON'T: Inline styles -->
  <div style="display: flex; padding: 24px;">

  <!-- ❌ DON'T: Scoped CSS blocks unless unavoidable -->
  <style scoped>.my-class { ... }</style>
</template>
```

## Route Definitions

```javascript
// ✅ DO: Lazy-loaded, named chunks
{
  path: '/portfolio',
  name: 'Portfolio',
  component: () => import('@/views/PortfolioOverview.vue'),
  meta: { requiresAuth: true, roles: ['RM', 'BRANCH_MANAGER'] }
}
```

## Brand Components

**Always use Absa* components instead of raw HTML for brand elements.** Import from `@/components/ui`:

```vue
<script setup>
import { AbsaButton, AbsaCard, AbsaBadge, AbsaGradientBg, AbsaSectionHeader, AbsaStatCard } from '@/components/ui'
</script>
```

```vue
<!-- ✅ DO: Use brand components -->
<AbsaButton variant="absa" size="sm">Save</AbsaButton>
<AbsaCard accent="passion">Content</AbsaCard>
<AbsaBadge state="at-risk">At Risk</AbsaBadge>
<AbsaGradientBg variant="passion-to-power" padding="lg">Hero</AbsaGradientBg>
<AbsaSectionHeader title="Overview" overline="ANALYTICS" />
<AbsaStatCard label="CHURN" :value="0.034" format="percentage" />

<!-- ❌ DON'T: Raw elements with brand colours -->
<button class="bg-red-600 text-white px-4 py-2 rounded">Save</button>
<div class="bg-white shadow rounded p-5">Content</div>
<span class="bg-orange-100 text-orange-700 rounded-full px-2">At Risk</span>
<div :style="{ background: 'linear-gradient(45deg, #DC0037, #B50232)' }">Hero</div>
```

## Error Handling

```javascript
// ✅ DO: Try/catch with user-facing messages
try {
  const data = await getPortfolio(filters)
} catch (error) {
  console.error('[Portfolio]', error)
  toast.error(error.response?.data?.detail || 'Failed to load portfolio')
}
```
