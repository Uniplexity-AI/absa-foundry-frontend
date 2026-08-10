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
          <div class="absolute left-0 top-full mt-2 w-48 bg-white/20 backdrop-blur-xl border border-white/20 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 ease-out z-50 before:absolute before:inset-x-0 before:-top-2 before:h-2 before:content-['']">
            <nav class="flex flex-col p-2">
              <router-link class="flex items-center gap-3 px-4 py-2 rounded text-secondary hover:bg-surface-container-low transition-colors" to="/dashboard/portfolio" active-class="!bg-[#a40022] !text-white !font-semibold">
                <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">dashboard</span>
                <span class="text-body-md font-medium">Dashboard</span>
              </router-link>
              <router-link class="flex items-center gap-3 px-4 py-2 rounded text-secondary hover:bg-surface-container-low transition-colors" to="/dashboard/branch-manager" active-class="!bg-[#a40022] !text-white !font-semibold">
                <span class="material-symbols-outlined text-[20px]">store</span>
                <span class="text-body-md font-medium">Branch Manager</span>
              </router-link>
              <div class="px-4 pt-3 pb-1 text-[10px] font-bold tracking-widest uppercase text-gray-400">AI &amp; DATA</div>
              <router-link class="flex items-center gap-3 px-4 py-2 rounded text-secondary hover:bg-surface-container-low transition-colors" to="/dashboard/models" active-class="!bg-[#a40022] !text-white !font-semibold">
                <span class="material-symbols-outlined text-[20px]">monitoring</span>
                <span class="text-body-md font-medium">Model Performance</span>
              </router-link>
              <router-link class="flex items-center gap-3 px-4 py-2 rounded text-secondary hover:bg-surface-container-low transition-colors" to="/dashboard/etl-run-history" active-class="!bg-[#a40022] !text-white !font-semibold">
                <span class="material-symbols-outlined text-[20px]">schedule</span>
                <span class="text-body-md font-medium">Run History</span>
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
          <div class="hidden md:flex relative w-96">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary">search</span>
            <input class="w-full bg-surface-container rounded py-2 pl-10 pr-4 text-body-md border-none focus:ring-1 focus:ring-primary" placeholder="Search customer, account or ID..." type="text" />
          </div>
          <button class="text-secondary hover:bg-surface-container-low p-2 rounded-full transition-colors hidden md:block">
            <span class="material-symbols-outlined">notifications</span>
          </button>
          <button class="text-secondary hover:bg-surface-container-low p-2 rounded-full transition-colors hidden md:block">
            <span class="material-symbols-outlined">help</span>
          </button>
          <div class="flex items-center gap-2">
            <div class="absa-topbar__avatar">{{ userInitials }}</div>
            <div class="hidden md:block">
              <p class="text-body-md font-body-md font-semibold">{{ userName }}</p>
              <p class="text-label-sm font-label-sm text-secondary">{{ userRole }}</p>
            </div>
          </div>
        </div>
      </header>
      <div class="absa-content pt-14">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { decodeJWT } from '@/services/decodeJWT'
import { getModuleCards } from '@/config/moduleCards.js'
import { useRBAC } from '@/composables/useRBAC'
import API_BASE_URL from '@/services/api'

const router = useRouter()
const route = useRoute()
const { hasPermission, initializeRBAC, isAdmin, isSuperAdmin } = useRBAC()

const pageTitle = computed(() => {
  return route.meta.title || 'Dashboard'
})

// ── State ──

async function handleLogout() {
  try {
    const token = localStorage.getItem('token')
    if (token) {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
    }
  } catch (e) {
    console.warn('Backend logout failed, clearing locally', e)
  }
  // Clear all auth data
  ;['token','refresh_token','user_id','email','role','userName','company_name','branches','selected_branch']
    .forEach(k => localStorage.removeItem(k))
  router.push('/login')
}

// Restore saved preference on mount
onMounted(() => {
  fetchSubscribedModules()
})

// ── User Info ──
const userEmail = computed(() => {
  try { return decodeJWT().getUserEmail?.() || 'User' }
  catch { return 'User' }
})

const userInitials = computed(() => {
  const email = userEmail.value
  if (email && email !== 'User') {
    return email.split('@')[0].slice(0, 2).toUpperCase()
  }
  return 'TT'
})

const userName = computed(() => {
  const email = userEmail.value
  return email !== 'User' ? email.split('@')[0].replace(/[._]/g, ' ') : 'Tina Tembo'
})

const userRole = computed(() => {
  try { return decodeJWT().getUserRole?.() || 'Relationship Manager' }
  catch { return 'Relationship Manager' }
})

const canAccessSettings = computed(() => isAdmin.value || isSuperAdmin.value || hasPermission('settings', 'read'))

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
