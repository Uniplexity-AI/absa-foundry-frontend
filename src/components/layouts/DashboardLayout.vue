<template>
  <!-- ════════════════════════════════════════════════════
       ABSA Intelligence Unit — Dashboard Layout
       Wraps all authenticated /dashboard/* child routes.
       ════════════════════════════════════════════════════ -->
  <div class="absa-dashboard-layout">
    <!-- Left Sidebar -->
    <aside class="absa-sidebar">
      <div class="absa-sidebar__brand">
        <div class="absa-sidebar__logo">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="6" fill="url(#absaDashLogoGrad)"/>
            <text x="14" y="20" text-anchor="middle" fill="white" font-size="16" font-weight="900" font-family="Montserrat, sans-serif">A</text>
            <defs>
              <linearGradient id="absaDashLogoGrad" x1="0" y1="0" x2="28" y2="28">
                <stop stop-color="#BE0F2C"/><stop offset="1" stop-color="#8B0015"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span class="absa-sidebar__brand-text">absa Intelligence Unit</span>
      </div>

      <nav class="absa-sidebar__nav">
        <router-link to="/dashboard/home" class="absa-nav-item" active-class="absa-nav-item--active">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
          Dashboard
        </router-link>
        <router-link to="/customers" class="absa-nav-item" active-class="absa-nav-item--active">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          My Customers
        </router-link>
        <router-link to="/portfolio" class="absa-nav-item" active-class="absa-nav-item--active">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
          Portfolio
        </router-link>
        <router-link to="/operations" class="absa-nav-item" active-class="absa-nav-item--active">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
          Operations
        </router-link>
      </nav>

      <div class="absa-sidebar__bottom">
        <button class="absa-sidebar__ai-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          AI Assistant
        </button>
        <router-link to="/dashboard/settings" class="absa-nav-item" active-class="absa-nav-item--active">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          Settings
        </router-link>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="absa-main">
      <header class="absa-topbar">
        <div class="absa-topbar__left">
          <slot name="breadcrumb">
            <span class="absa-topbar__breadcrumb-current">Dashboard</span>
          </slot>
        </div>
        <div class="absa-topbar__right">
          <div class="absa-search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input class="absa-search__input" type="text" placeholder="Search customer, account or ID..." />
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
      <div class="absa-content absa-mesh-dense">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { decodeJWT } from '@/api_services/decodeJWT'

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
</script>

<style scoped>
/* ── Root Layout ── */
.absa-dashboard-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  min-height: 100vh;
  background: #F8F8FA;
  font-family: 'Montserrat', 'Inter', system-ui, -apple-system, sans-serif;
}

/* ── Sidebar ── */
.absa-sidebar {
  background: #FFFFFF;
  border-right: 1px solid #E8E8EC;
  display: flex;
  flex-direction: column;
  padding: 0;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}

.absa-sidebar__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 18px 20px;
  border-bottom: 1px solid #F3F4F6;
}

.absa-sidebar__brand-text {
  font-size: 0.8125rem;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.01em;
  line-height: 1.2;
}

.absa-sidebar__nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 12px 12px;
  flex: 1;
}

.absa-sidebar__bottom {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 12px 12px;
  border-top: 1px solid #F3F4F6;
}

.absa-sidebar__ai-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  margin-bottom: 6px;
  background: linear-gradient(135deg, #BE0F2C, #8B0015);
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  font-size: 0.8125rem;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 150ms ease;
}

.absa-sidebar__ai-btn:hover { opacity: 0.9; }

/* Nav items */
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
}

.absa-nav-item:hover { background: #F3F4F6; color: #111827; }

.absa-nav-item--active {
  background: #FDE8EC;
  color: #BE0F2C;
  font-weight: 700;
}

/* ── Main ── */
.absa-main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.absa-content {
  flex: 1;
  padding: 24px 32px;
  overflow-y: auto;
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
  background: linear-gradient(135deg, #BE0F2C, #8B0015);
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
  border-color: #BE0F2C;
  box-shadow: 0 0 0 3px rgba(190, 15, 44, 0.12);
  background: #FFFFFF;
}

.absa-search__input {
  flex: 1; border: none; outline: none;
  background: transparent; font-size: 0.8125rem; color: #111827;
}

.absa-search__input::placeholder { color: #9CA3AF; }

/* ── Responsive ── */
@media (max-width: 768px) {
  .absa-dashboard-layout { grid-template-columns: 1fr; }
  .absa-sidebar { display: none; }
  .absa-content { padding: 16px; }
  .absa-topbar { padding: 0 16px; }
  .absa-search { width: 180px; }
}

.absa-sidebar::-webkit-scrollbar { width: 4px; }
.absa-sidebar::-webkit-scrollbar-track { background: transparent; }
.absa-sidebar::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 4px; }
</style>
