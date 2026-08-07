<template>
  <!-- ════════════════════════════════════════════════════
       ABSA Intelligence Unit — Dashboard Layout
       Wraps all authenticated /dashboard/* child routes.
       Collapsible sidebar with icon-only mode.
       ════════════════════════════════════════════════════ -->
  <div class="absa-dashboard-layout" :class="{ 'absa-dashboard-layout--collapsed': collapsed }">
    <!-- Fixed Collapsible Sidebar -->
    <aside class="absa-sidebar" :class="{ 'absa-sidebar--collapsed': collapsed }">
      <!-- Logo + Toggle -->
      <div class="absa-sidebar__brand group">
        <img src="/logo_red.png" alt="ABSA" class="absa-sidebar__logo-img" />
        <div v-show="!collapsed" class="absa-sidebar__brand-text">
          <span class="absa-sidebar__brand-name">absa</span>
          <span class="absa-sidebar__brand-sub">Intelligence Unit</span>
        </div>
        <button class="absa-sidebar__toggle opacity-0 group-hover:opacity-100 transition-opacity duration-200" @click="toggleSidebar" :title="collapsed ? 'Expand sidebar' : 'Collapse sidebar'">
          <svg v-if="collapsed" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="5" height="18" rx="1"/>
            <rect x="10" y="3" width="11" height="18" rx="1"/>
            <polyline points="14 10 17 12 14 14"/>
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="5" height="18" rx="1"/>
            <rect x="10" y="3" width="11" height="18" rx="1"/>
            <polyline points="17 10 14 12 17 14"/>
          </svg>
        </button>
      </div>

      <!-- Primary Navigation -->
      <nav class="absa-sidebar__nav">
        <!-- ── Customer Lifecycle ── -->
        <div class="absa-sidebar__section-label" v-show="!collapsed">CUSTOMER LIFECYCLE</div>
        <router-link to="/dashboard/home" class="absa-nav-item" active-class="absa-nav-item--active" title="Dashboard Home">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
          <span>Dashboard</span>
        </router-link>

        <router-link to="/dashboard/portfolio" class="absa-nav-item" active-class="absa-nav-item--active" title="Portfolio Overview">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
          <span>Portfolio</span>
        </router-link>

        <router-link to="/dashboard/branch-manager" class="absa-nav-item" active-class="absa-nav-item--active" title="Branch Manager">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span>Branch Manager</span>
        </router-link>

        <!-- ── AI & Data Pipeline ── -->
        <div class="absa-sidebar__section-label" v-show="!collapsed" style="margin-top:8px">AI &amp; DATA</div>
        <router-link to="/dashboard/models" class="absa-nav-item" active-class="absa-nav-item--active" title="Model Performance">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          <span>Model Performance</span>
        </router-link>

        <router-link to="/dashboard/etl-pipeline" class="absa-nav-item" active-class="absa-nav-item--active" title="ETL Pipeline">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>
          <span>ETL Pipeline</span>
        </router-link>

        <router-link to="/dashboard/etl-run-history" class="absa-nav-item" active-class="absa-nav-item--active" title="ETL Run History">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>Run History</span>
        </router-link>
      </nav>

      <!-- AI Assistant + Bottom -->
      <div class="absa-sidebar__bottom">
        <button v-if="false" class="absa-sidebar__ai-btn" @click="$router.push('/dashboard/ai')" title="AI Assistant">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          <span>AI Assistant</span>
        </button>

        <router-link v-if="false" to="/dashboard/settings" class="absa-nav-item absa-nav-item--bottom" active-class="absa-nav-item--active" title="Settings">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          <span>Settings</span>
        </router-link>

        <a v-if="false" class="absa-nav-item absa-nav-item--bottom" href="#" title="Support">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          <span>Support</span>
        </a>

        <button class="absa-nav-item absa-nav-item--bottom" @click="handleLogout" title="Logout">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          <span>Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="absa-main">
      <header class="absa-topbar">
        <div class="absa-topbar__left">
          <slot name="breadcrumb">
            <span class="absa-topbar__breadcrumb-current">{{ breadcrumbTitle }}</span>
          </slot>
        </div>
        <div class="absa-topbar__right">
          <div class="absa-search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input class="absa-search__input" type="text" placeholder="Search customer, account or ID..." />
          </div>
          <div class="period-selector flex items-center gap-2 mr-2">
            <span class="text-sm font-medium text-gray-600 hidden xl:inline whitespace-nowrap">Data Snapshot:</span>
            <select v-model="selectedPeriod" class="border border-gray-200 rounded-lg px-3 py-1.5 text-sm bg-white focus:ring-2 focus:ring-[var(--absa-maroon,#BE0F2C)] focus:border-transparent">
              <option value="latest">Latest (August 6, 2026)</option>
            </select>
          </div>
          <button class="absa-icon-btn" aria-label="Notifications">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </button>
          <div class="absa-topbar__user">
            <div class="absa-topbar__avatar">{{ userInitials }}</div>
            <div class="absa-topbar__user-info">
              <span class="absa-topbar__user-name">{{ userName }}</span>
              <span class="absa-topbar__user-role">{{ userRole }}</span>
            </div>
          </div>
        </div>
      </header>
      <div class="absa-content">
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

const breadcrumbTitle = computed(() => {
  const map = {
    'DashboardHome': 'Dashboard',
    'PortfolioOverview': 'Portfolio Overview',
    'CustomerDetail': 'Customer Detail',
    'BranchManagerDashboard': 'Branch Manager',
    'ModelsMonitoring': 'Model Performance',
    'EtlPipeline': 'ETL Pipeline',
    'EtlRunHistory': 'ETL Run History',
    'BatchExecutionDetail': 'Batch Execution Detail',
    'UserManagement': 'User Management',
  }
  return map[route.name] || 'Dashboard'
})

// ── Sidebar Collapse State ──
const collapsed = ref(false)
const selectedPeriod = ref('latest')

function toggleSidebar() {
  collapsed.value = !collapsed.value
  localStorage.setItem('absa_sidebar_collapsed', collapsed.value ? '1' : '0')
}

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
  const saved = localStorage.getItem('absa_sidebar_collapsed')
  if (saved === '1') collapsed.value = true
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
  background: #F8F8FA;
  font-family: 'Montserrat', 'Inter', system-ui, -apple-system, sans-serif;
}

/* ── Sidebar (Fixed — never moves) ── */
.absa-sidebar {
  background: #FFFFFF;
  border-right: 1px solid #E8E8EC;
  display: flex;
  flex-direction: column;
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 50;
  transition: width 250ms ease;
}

.absa-sidebar--collapsed {
  width: 64px;
}

/* ── Brand / Logo ── */
.absa-sidebar__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 16px;
  border-bottom: 1px solid #F3F4F6;
  text-decoration: none;
  position: relative;
  min-height: 60px;
}

.absa-sidebar__logo-img {
  height: 32px;
  width: auto;
  object-fit: contain;
  flex-shrink: 0;
}

.absa-sidebar--collapsed .absa-sidebar__logo-img {
  height: 26px;
}

.absa-sidebar__brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
  overflow: hidden;
  white-space: nowrap;
}

.absa-sidebar__brand-name {
  font-size: 1rem;
  font-weight: 900;
  color: var(--absa-passion, #DC0037);
}

.absa-sidebar__brand-sub {
  font-size: 0.7rem;
  font-weight: 600;
  color: #6B7280;
  letter-spacing: 0.02em;
}

/* ── Toggle Button ── */
.absa-sidebar__toggle {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid #E8E8EC;
  background: #F9FAFB;
  color: #6B7280;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 150ms ease;
  flex-shrink: 0;
}

.absa-sidebar__toggle:hover {
  background: rgba(220, 0, 55, 0.08);
  border-color: var(--absa-passion, #DC0037);
  color: var(--absa-passion, #DC0037);
}

.absa-sidebar--collapsed .absa-sidebar__toggle {
  right: calc(50% + 3px);
  transform: translate(50%, -50%);
}

/* ── Navigation ── */
.absa-sidebar__nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 8px;
  flex: 1;
}

.absa-sidebar--collapsed .absa-sidebar__nav {
  padding: 10px 6px;
}

.absa-sidebar__bottom {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 8px;
  border-top: 1px solid #F3F4F6;
}

.absa-sidebar--collapsed .absa-sidebar__bottom {
  padding: 10px 6px;
}

/* ── AI Button ── */
.absa-sidebar__ai-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px 14px;
  margin-bottom: 6px;
  /* Passion-to-Inspire gradient — elegant, premium per brand guide */
  background: linear-gradient(135deg, var(--absa-passion, #DC0037), var(--absa-inspire, #77021E));
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  font-size: 0.8125rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 150ms ease;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
}

.absa-sidebar__ai-btn:hover { opacity: 0.9; }

.absa-sidebar--collapsed .absa-sidebar__ai-btn {
  padding: 10px 0;
  justify-content: center;
  border-radius: 6px;
  gap: 0;
}

.absa-sidebar__ai-btn span {
  transition: opacity 150ms ease;
}

.absa-sidebar--collapsed .absa-sidebar__ai-btn span {
  display: none;
}

/* ── Section Labels ── */
.absa-sidebar__section-label {
  padding: 12px 14px 6px;
  font-size: 0.6rem;
  font-weight: 800;
  color: #9CA3AF;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

/* ── Nav Items ── */
.absa-nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #4B5563;
  text-decoration: none;
  transition: all 150ms ease;
  overflow: hidden;
  white-space: nowrap;
}

.absa-nav-item:hover { background: #F3F4F6; color: #111827; }

.absa-nav-item--active {
  background: rgba(220, 0, 55, 0.08);
  color: var(--absa-passion, #DC0037);
  font-weight: 700;
}

.absa-nav-item--bottom {
  font-size: 0.75rem;
}

.absa-nav-item__icon {
  font-size: 15px;
  width: 18px;
  text-align: center;
  flex-shrink: 0;
}

/* Collapsed: center icons, hide labels */
.absa-sidebar--collapsed .absa-nav-item {
  justify-content: center;
  padding: 10px 0;
  gap: 0;
  border-radius: 6px;
}

.absa-sidebar--collapsed .absa-nav-item span {
  display: none;
}

/* ── Main Area ── */
.absa-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 0;
  margin-left: 240px;
  transition: margin-left 250ms ease;
}

.absa-dashboard-layout--collapsed .absa-main {
  margin-left: 64px;
}

.absa-content {
  flex: 1 1 auto;
  overflow-y: auto;
  background: #F8F8FA;
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
  /* Passion-to-Power gradient per brand guide */
  background: linear-gradient(135deg, var(--absa-passion, #DC0037), var(--absa-power, #B50232));
  color: #FFFFFF;
  font-size: 0.75rem; font-weight: 800;
  display: flex; align-items: center; justify-content: center;
}

.absa-topbar__user-info { display: flex; flex-direction: column; }

.absa-topbar__user-name { font-size: 0.8125rem; font-weight: 700; color: #111827; }

.absa-topbar__user-role { font-size: 0.6875rem; color: #6B7280; }

.absa-icon-btn {
  width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  border: none; background: transparent; border-radius: 8px;
  color: #6B7280; cursor: pointer; transition: all 150ms ease;
}

.absa-icon-btn:hover { background: #F3F4F6; color: #111827; }

/* Search */
.absa-search {
  display: flex; align-items: center;
  height: 40px; width: 320px;
  background: #F9FAFB; border: 1px solid #E5E7EB;
  border-radius: 8px; padding: 0 12px; gap: 8px;
  transition: border-color 150ms ease, box-shadow 150ms ease;
}

.absa-search:focus-within {
  border-color: var(--absa-passion, #DC0037);
  box-shadow: 0 0 0 3px rgba(220, 0, 55, 0.12);
  background: #FFFFFF;
}

.absa-search__input {
  flex: 1; border: none; outline: none;
  background: transparent; font-size: 0.8125rem; color: #111827;
}

.absa-search__input::placeholder { color: #9CA3AF; }

/* ── Responsive ── */
@media (max-width: 768px) {
  .absa-sidebar,
  .absa-sidebar--collapsed {
    display: none;
  }
  .absa-main,
  .absa-dashboard-layout--collapsed .absa-main {
    margin-left: 0;
  }
  .absa-topbar { padding: 0 16px; }
  .absa-search { width: 180px; }
}

.absa-sidebar::-webkit-scrollbar { width: 4px; }
.absa-sidebar::-webkit-scrollbar-track { background: transparent; }
.absa-sidebar::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 4px; }
</style>
