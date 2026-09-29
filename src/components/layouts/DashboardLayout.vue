<template>
  <!-- ════════════════════════════════════════════════════
       ABSA Intelligence Unit — Dashboard Layout
       Wraps all authenticated /dashboard/* child routes.
       ════════════════════════════════════════════════════ -->
  <div class="absa-dashboard-layout">
    <!-- Main Content Area -->
    <main class="absa-main">
      <!-- Unified Header with Dropdown Navigation -->
      <header class="dark:bg-surface text-primary dark:text-inverse-primary border-b border-outline-variant dark:border-outline flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 fixed top-0 left-0 right-0 z-40 bg-white">
        
        <!-- DROPDOWN MENU (Replaces Sidebar) -->
        <div class="relative group">
          <button class="text-secondary hover:bg-surface-container-low p-2 rounded-full transition-colors flex items-center justify-center">
            <span class="material-symbols-outlined">menu</span>
          </button>
          <div class="absolute left-0 top-full mt-2 w-64 bg-white/20 backdrop-blur-xl border border-white/20 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 ease-out z-50 before:absolute before:inset-x-0 before:-top-2 before:h-2 before:content-['']">
            <nav class="flex flex-col p-2">
              <router-link v-if="canAnalytics" class="flex items-center gap-3 px-4 py-2 rounded text-secondary hover:bg-surface-container-low transition-colors" to="/dashboard/portfolio" active-class="!bg-[#a40022] !text-white !font-semibold">
                <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">dashboard</span>
                <span class="text-body-md font-medium">Dashboard</span>
              </router-link>
              <router-link v-if="canAnalytics" class="flex items-center gap-3 px-4 py-2 rounded text-secondary hover:bg-surface-container-low transition-colors" to="/dashboard/crm" active-class="!bg-[#a40022] !text-white !font-semibold">
                <span class="material-symbols-outlined text-[20px]">group</span>
                <span class="text-body-md font-medium">CRM</span>
              </router-link>
              <router-link v-if="canEtl" class="flex items-center gap-3 px-4 py-2 rounded text-secondary hover:bg-surface-container-low transition-colors" to="/dashboard/branch-manager" active-class="!bg-[#a40022] !text-white !font-semibold">
                <span class="material-symbols-outlined text-[20px]">store</span>
                <span class="text-body-md font-medium">Branch Manager</span>
              </router-link>

              <div v-if="canPredict" class="px-4 pt-3 pb-1 text-[10px] font-bold tracking-widest uppercase text-gray-400">INTELLIGENCE</div>
              <router-link v-if="canPredict" class="flex items-center gap-3 px-4 py-2 rounded text-secondary hover:bg-surface-container-low transition-colors" to="/dashboard/customer-value" active-class="!bg-[#a40022] !text-white !font-semibold">
                <span class="material-symbols-outlined text-[20px]">star</span>
                <span class="text-body-md font-medium">Customer Value</span>
              </router-link>
              <router-link v-if="canPredict" class="flex items-center gap-3 px-4 py-2 rounded text-secondary hover:bg-surface-container-low transition-colors" to="/dashboard/lifecycle" active-class="!bg-[#a40022] !text-white !font-semibold">
                <span class="material-symbols-outlined text-[20px]">waterfall_chart</span>
                <span class="text-body-md font-medium">Lifecycle Prediction</span>
              </router-link>
              <router-link v-if="canPredict" class="flex items-center gap-3 px-4 py-2 rounded text-secondary hover:bg-surface-container-low transition-colors" to="/dashboard/balance-forecast" active-class="!bg-[#a40022] !text-white !font-semibold">
                <span class="material-symbols-outlined text-[20px]">show_chart</span>
                <span class="text-body-md font-medium">Balance Forecast</span>
              </router-link>
              <router-link v-if="canPredict" class="flex items-center gap-3 px-4 py-2 rounded text-secondary hover:bg-surface-container-low transition-colors" to="/dashboard/business-outcomes" active-class="!bg-[#a40022] !text-white !font-semibold">
                <span class="material-symbols-outlined text-[20px]">monetization_on</span>
                <span class="text-body-md font-medium">Business Outcomes</span>
              </router-link>

              <div class="px-4 pt-3 pb-1 text-[10px] font-bold tracking-widest uppercase text-gray-400">AI &amp; DATA</div>
              <router-link v-if="canModels" class="flex items-center gap-3 px-4 py-2 rounded text-secondary hover:bg-surface-container-low transition-colors" to="/dashboard/models" active-class="!bg-[#a40022] !text-white !font-semibold">
                <span class="material-symbols-outlined text-[20px]">monitoring</span>
                <span class="text-body-md font-medium">Model Performance</span>
              </router-link>
              <router-link v-if="canEtl" class="flex items-center gap-3 px-4 py-2 rounded text-secondary hover:bg-surface-container-low transition-colors" to="/dashboard/etl-pipeline" active-class="!bg-[#a40022] !text-white !font-semibold">
                <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">bolt</span>
                <span class="text-body-md font-medium">Data Pipeline</span>
              </router-link>
              <router-link v-if="canEtl" class="flex items-center gap-3 px-4 py-2 rounded text-secondary hover:bg-surface-container-low transition-colors" to="/dashboard/etl-run-history" active-class="!bg-[#a40022] !text-white !font-semibold">
                <span class="material-symbols-outlined text-[20px]">schedule</span>
                <span class="text-body-md font-medium">Run History</span>
              </router-link>
              <router-link v-if="canEtl" class="flex items-center gap-3 px-4 py-2 rounded text-secondary hover:bg-surface-container-low transition-colors" to="/dashboard/etl-config-manager" active-class="!bg-[#a40022] !text-white !font-semibold">
                <span class="material-symbols-outlined text-[20px]">settings</span>
                <span class="text-body-md font-medium">ETL Config Manager</span>
              </router-link>

              <div v-if="canAdmin" class="px-4 pt-3 pb-1 text-[10px] font-bold tracking-widest uppercase text-gray-400">ADMIN</div>
              <router-link v-if="canAdmin" class="flex items-center gap-3 px-4 py-2 rounded text-secondary hover:bg-surface-container-low transition-colors" to="/dashboard/settings" active-class="!bg-[#a40022] !text-white !font-semibold">
                <span class="material-symbols-outlined text-[20px]">manage_accounts</span>
                <span class="text-body-md font-medium">Settings</span>
              </router-link>
              <router-link v-if="canAdmin" class="flex items-center gap-3 px-4 py-2 rounded text-secondary hover:bg-surface-container-low transition-colors" to="/dashboard/settings/users" active-class="!bg-[#a40022] !text-white !font-semibold">
                <span class="material-symbols-outlined text-[20px]">group_add</span>
                <span class="text-body-md font-medium">User Management</span>
              </router-link>
            </nav>
          </div>
        </div>
        
        <div class="flex items-center gap-3 md:hidden">
          <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-sm">A</div>
          <h1 class="text-headline-md font-headline-md font-bold text-primary dark:text-inverse-primary">Intelligence Unit</h1>
        </div>
        
        <div class="hidden md:flex items-center flex-1 ml-4">
          <h1 class="text-headline-lg font-headline-lg text-primary">{{ pageTitle }}</h1>
        </div>
        
        <div class="flex items-center gap-4">
          <label class="hidden md:flex items-center gap-2 text-xs text-gray-500">
            <span class="material-symbols-outlined text-[16px]">calendar_today</span>
            <input
              v-model="snapshotStore.selectedDate"
              type="date"
              @change="onSnapshotDateChange"
              class="border border-gray-300 rounded-sm px-2 py-1.5 text-xs font-mono text-absa-enrich bg-white"
            />
          </label>
          <div class="hidden md:flex relative w-96">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary">search</span>
            <input
              v-model="searchQuery"
              @keyup.enter="submitSearch"
              @input="searchQuery = searchQuery"
              class="w-full bg-surface-container rounded py-2 pl-10 pr-4 text-body-md border-none focus:ring-1 focus:ring-primary"
              placeholder="Search customer, account or ID... (Enter to open)"
              type="text"
            />
          </div>
          <button @click="toggleNotifications" class="relative text-secondary hover:bg-surface-container-low p-2 rounded-full transition-colors hidden md:block">
            <span class="material-symbols-outlined">notifications</span>
            <span v-if="notificationCount > 0" class="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#DC0037] text-white text-[9px] font-bold rounded-full flex items-center justify-center">{{ notificationCount }}</span>
          </button>
          <button @click="openHelp" class="text-secondary hover:bg-surface-container-low p-2 rounded-full transition-colors hidden md:block">
            <span class="material-symbols-outlined">help</span>
          </button>
          <div ref="userMenuRef" class="relative">
            <button
              type="button"
              class="flex items-center gap-2 rounded-full pl-0.5 pr-1.5 py-1 hover:bg-surface-container-low transition-colors"
              aria-haspopup="menu"
              :aria-expanded="showUserMenu ? 'true' : 'false'"
              aria-label="Account menu"
              @click="toggleUserMenu"
            >
              <div class="absa-topbar__avatar">{{ userInitials }}</div>
              <div class="hidden md:block text-left">
                <p class="text-body-md font-body-md font-semibold">{{ userName }}</p>
                <p class="text-label-sm font-label-sm text-secondary">{{ userRole }}</p>
              </div>
              <span class="material-symbols-outlined text-secondary text-[18px] hidden md:inline">expand_more</span>
            </button>

            <!-- Account menu -->
            <div
              v-if="showUserMenu"
              role="menu"
              class="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 shadow-xl z-50"
            >
              <div class="px-4 py-3 border-b border-gray-200">
                <p class="text-xs font-bold text-absa-enrich truncate">{{ userName }}</p>
                <p class="text-[11px] text-gray-500 truncate mt-0.5">{{ userEmail }}</p>
                <span class="inline-block mt-2 text-[10px] font-bold uppercase tracking-wider text-absa-passion border border-gray-200 rounded-sm px-2 py-0.5">
                  {{ userRole }}
                </span>
              </div>
              <button
                type="button"
                role="menuitem"
                class="w-full text-left px-4 py-2.5 text-xs font-bold text-absa-passion hover:bg-red-50 transition-colors flex items-center gap-2"
                @click="handleLogout"
              >
                <span class="material-symbols-outlined text-[18px]">logout</span>
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Notifications dropdown -->
      <div v-if="showNotifications" class="fixed top-16 right-6 z-50 w-96 bg-white border border-gray-200 shadow-xl">
        <div class="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <span class="text-xs font-bold text-absa-enrich uppercase tracking-wider">Notifications</span>
          <button @click="clearNotifications" class="text-[11px] font-semibold text-absa-passion hover:underline">Mark all read</button>
        </div>
        <div class="max-h-96 overflow-y-auto">
          <div v-if="notifications.length === 0" class="px-4 py-8 text-center text-xs text-gray-500">No new notifications</div>
          <button v-for="(n, i) in notifications" :key="i" @click="openNotification(n)" class="w-full text-left px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
            <div class="flex items-start gap-2">
              <span class="material-symbols-outlined text-[16px] text-absa-passion mt-0.5">{{ n.icon || 'info' }}</span>
              <div>
                <p class="text-xs font-bold text-absa-enrich">{{ n.title }}</p>
                <p class="text-[11px] text-gray-500 mt-0.5">{{ n.body }}</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      <!-- Help modal -->
      <div v-if="showHelp" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="showHelp = false">
        <div class="absolute inset-0 bg-black/30" @click="showHelp = false"></div>
        <div class="relative w-full max-w-md bg-white border border-gray-200 shadow-2xl">
          <div class="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 class="text-sm font-bold text-absa-enrich">Intelligence Unit — Help</h3>
            <button @click="showHelp = false" class="text-gray-400 hover:text-gray-600"><span class="material-symbols-outlined">close</span></button>
          </div>
          <div class="p-5 space-y-3 text-xs text-gray-600">
            <p><strong class="text-absa-enrich">Customer search:</strong> type a customer ID (e.g. CUST00042) or name in the header search and press Enter.</p>
            <p><strong class="text-absa-enrich">Alerts:</strong> acknowledge critical alerts on the Portfolio dashboard to clear them.</p>
            <p><strong class="text-absa-enrich">Reports:</strong> every intelligence page has an Export button that downloads a CSV report.</p>
            <p><strong class="text-absa-enrich">Pilot scope:</strong> data is synthetic ABSA data (as-of 2026-07-27) for the PoC pilot.</p>
          </div>
        </div>
      </div>
      <div class="absa-content pt-20">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { decodeJWT } from '@/services/decodeJWT'
import { getModuleCards } from '@/config/moduleCards.js'
import { useRBAC } from '@/composables/useRBAC'
import API_BASE_URL from '@/services/api'
import { useSnapshotStore } from '@/stores/snapshotStore'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const { hasPermission, initializeRBAC, isAdmin: _legacyIsAdmin, isSuperAdmin } = useRBAC()
const snapshotStore = useSnapshotStore()
const authStore = useAuthStore()

const pageTitle = computed(() => {
  return route.meta.title || 'Dashboard'
})

// ── Header: search / notifications / help / account menu ──
const searchQuery = ref('')
const showNotifications = ref(false)
const showHelp = ref(false)
const showUserMenu = ref(false)
const userMenuRef = ref(null)

const notifications = ref([
  { title: 'High churn risk flagged', body: 'Customer CUST00421 has a 91% churn probability.', icon: 'warning', to: '/dashboard/customer/CUST00421' },
  { title: 'Campaign cohort ready', body: '34 customers are eligible for the Digital Reactivation campaign.', icon: 'campaign', to: '/dashboard/lifecycle' },
  { title: 'Pilot data snapshot refreshed', body: 'Synthetic ABSA data as-of 2026-07-27 is loaded.', icon: 'database', to: '/dashboard/portfolio' },
])
const notificationCount = computed(() => notifications.value.length)

function toggleNotifications() {
  showNotifications.value = !showNotifications.value
  showHelp.value = false
  showUserMenu.value = false
}

function openNotification(n) {
  showNotifications.value = false
  if (n?.to) router.push(n.to)
}

function clearNotifications() {
  notifications.value = []
}

// ── Snapshot (as-of) date selector ──
function onSnapshotDateChange() {
  snapshotStore.setDate(snapshotStore.selectedDate)
  // The chosen date is read by every store/view on fetch; a full reload is the
  // simplest way to guarantee the visible page re-queries with the new date.
  window.location.reload()
}

function openHelp() {
  showHelp.value = !showHelp.value
  showNotifications.value = false
  showUserMenu.value = false
}

// ── Account menu (corner avatar) ──
function toggleUserMenu() {
  showUserMenu.value = !showUserMenu.value
  if (showUserMenu.value) {
    showNotifications.value = false
    showHelp.value = false
  }
}

function onDocumentPointerDown(event) {
  if (!showUserMenu.value) return
  if (userMenuRef.value && !userMenuRef.value.contains(event.target)) {
    showUserMenu.value = false
  }
}

function onDocumentKeydown(event) {
  if (event.key === 'Escape') showUserMenu.value = false
}

async function submitSearch() {
  const q = (searchQuery.value || '').trim()
  if (!q) return
  // Customer ID patterns seen in the synthetic portfolio: CUST####, CU-####, CU####
  if (/^CUST?\d{2,}/i.test(q) || /^CU-?\d{2,}/i.test(q)) {
    router.push({ name: 'CustomerProfile', params: { id: q } })
  } else {
    // Free-text queries land on the My Customers list with the query pre-applied.
    router.push({ name: 'MyCustomers', query: { q } })
  }
  searchQuery.value = ''
}

// ── State ──

async function handleLogout() {
  showUserMenu.value = false
  // Single canonical sign-out path (clears the session, revokes the token and
  // redirects) — see services/decodeJWT.js.
  await decodeJWT().logout()
}

// Restore saved preference on mount
onMounted(() => {
  fetchSubscribedModules()
  snapshotStore.fetchAvailable()
  document.addEventListener('pointerdown', onDocumentPointerDown)
  document.addEventListener('keydown', onDocumentKeydown)
})

onUnmounted(() => {
  document.removeEventListener('pointerdown', onDocumentPointerDown)
  document.removeEventListener('keydown', onDocumentKeydown)
})

// ── User Info (ABSA roles: ADMIN / RELATIONSHIP_MANAGER / DATA_SCIENTIST / OPERATIONS) ──
const ROLE_LABELS = {
  ADMIN: 'Administrator',
  RELATIONSHIP_MANAGER: 'Relationship Manager',
  DATA_SCIENTIST: 'Data Scientist',
  OPERATIONS: 'Operations Analyst'
}


const userEmail = computed(() => authStore.email || 'User')

// Use authStore (roles array) for all access decisions
const canAnalytics = computed(() => authStore.isAdmin || authStore.isRM)
const canPredict   = computed(() => authStore.isAdmin || authStore.isRM || authStore.isDS)
const canModels    = computed(() => authStore.isAdmin || authStore.isDS)
const canEtl       = computed(() => authStore.isAdmin || authStore.isOps)
const canAdmin     = computed(() => authStore.isAdmin)

// Keep currentRole for display labels (uses first role)
const currentRole = computed(() => authStore.primaryRole || '')

const userName = computed(() => {
  if (authStore.displayName) return authStore.displayName
  const email = authStore.email || ''
  return email ? email.split('@')[0].replace(/[._]/g, ' ') : 'Absa User'
})

const userRole = computed(() => ROLE_LABELS[currentRole.value] || 'Relationship Manager')

const userInitials = computed(() => {
  const parts = String(userName.value).replace(/[()]/g, '').trim().split(/\s+/)
  const initials = ((parts[0] || '')[0] || '') + ((parts[1] || '')[0] || '')
  return (initials || 'AU').toUpperCase()
})

const canAccessSettings = computed(() => authStore.isAdmin)

// ── Dynamic Modules ──
const allModuleCards = getModuleCards()
const subscribedModules = ref([])

// Filter: show modules the user is subscribed to, excluding primary nav items & admin pages
const visibleModules = computed(() => {
  const primaryIds = ['dashboard', 'crm', 'portfolio']
  const alwaysShow = ['profile', 'allshops', 'ai', 'image-capture', 'taxes', 'compliance', 'marketplace', 'hr-staff']
  
  const filtered = allModuleCards.filter(card => {
    // Skip admin-only pages in normal dashboard
    if (card.adminPage) return false
    // Skip primary nav items
    if (primaryIds.includes(card.id)) return false
    // Always show free essentials
    if (alwaysShow.includes(card.id) && card.free) return true
    // Show if subscribed
    return subscribedModules.value.some(m => m.id === card.id)
  })

  // Deduplicate by id
  const seen = new Set()
  return filtered.filter(c => {
    if (seen.has(c.id)) return false
    seen.add(c.id)
    return true
  })
})

async function fetchSubscribedModules() {
  try {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 5000)
    const res = await fetch(`${API_BASE_URL}/modules-manager/owner/modules`, { signal: ctrl.signal })
    clearTimeout(t)
    if (!res.ok) return
    const data = await res.json()

    let moduleIds = []
    if (data && Array.isArray(data.modules)) {
      moduleIds = data.modules
    } else if (data?.subscribed_modules) {
      moduleIds = data.subscribed_modules
    }

    const role = decodeJWT().getUserRole?.()?.toLowerCase()
    const cards = getModuleCards()

    if (role === 'owner' || isAdmin.value || isSuperAdmin.value) {
      subscribedModules.value = cards.filter(c => moduleIds.includes(c.id) || c.free === true)
    } else {
      subscribedModules.value = cards.filter(c => {
        if (c.free) return true
        if (!moduleIds.includes(c.id)) return false
        let permEntity = c.id
        if (c.id === 'supplier') permEntity = 'suppliers'
        if (c.id === 'hr-dashboard' || c.id === 'hrmodule') permEntity = 'hrmodule'
        return hasPermission(permEntity, 'read')
      })
    }
  } catch (e) {
    console.warn('Failed to fetch subscribed modules for sidebar:', e)
  }
}
</script>

<style scoped>
/* ── Root Layout ── */
.absa-dashboard-layout {
  display: flex;
  min-height: 100vh;
  background: #ffffff;
  font-family: 'Montserrat', 'Inter', system-ui, -apple-system, sans-serif;
}

/* ── Main Area ── */
.absa-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 0;
}

.absa-content {
  flex: 1 1 auto;
  overflow-y: auto;
  background: #ffffff;
}

/* ── Top Bar ── */
.absa-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  height: 64px;
  background: #FFFFFF;
  border-bottom: 1px solid #E8E8EC;
  position: sticky;
  top: 0;
  z-index: 30;
}

.absa-topbar__breadcrumb-current { font-size: 0.875rem; font-weight: 600; color: #111827; }

.absa-topbar__right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.absa-topbar__user { display: flex; align-items: center; gap: 10px; }

.absa-topbar__avatar {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: #a40022;
  color: #FFFFFF;
  font-size: 0.75rem; font-weight: 800;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

.absa-topbar__user-info { display: flex; flex-direction: column; }

.absa-topbar__user-name { font-size: 0.8125rem; font-weight: 700; color: #111827; }

.absa-topbar__user-role { font-size: 0.6875rem; color: #6B7280; }
</style>
