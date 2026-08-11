<template>
  <div class="absa-dashboard-layout">
    <!-- Admin Sidebar -->
    <aside class="absa-sidebar">
      <div class="absa-sidebar__brand">
        <div class="absa-sidebar__logo">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="6" fill="url(#saLogoGrad)"/>
            <text x="14" y="20" text-anchor="middle" fill="white" font-size="10" font-weight="900" font-family="Montserrat">ADMIN</text>
            <defs>
              <linearGradient id="saLogoGrad" x1="0" y1="0" x2="28" y2="28">
                <stop stop-color="#BE0F2C"/><stop offset="1" stop-color="#8B0015"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span class="absa-sidebar__brand-text">Super Admin</span>
      </div>

      <nav class="absa-sidebar__nav">
        <router-link to="/super-admin/dashboard" class="absa-nav-item" active-class="absa-nav-item--active">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
          Dashboard
        </router-link>
        <router-link to="/super-admin/tenant-management" class="absa-nav-item" active-class="absa-nav-item--active">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
          Tenants
        </router-link>
        <router-link to="/super-admin/tenant-revenues" class="absa-nav-item" active-class="absa-nav-item--active">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          Revenue
        </router-link>
        <router-link to="/super-admin/tenant-reports" class="absa-nav-item" active-class="absa-nav-item--active">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          Reports
        </router-link>
        <router-link to="/super-admin/system-traces" class="absa-nav-item" active-class="absa-nav-item--active">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          System Traces
        </router-link>
      </nav>

      <div class="absa-sidebar__bottom">
        <router-link to="/dashboard/portfolio" class="absa-nav-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
          Back to App
        </router-link>
      </div>
    </aside>

    <main class="absa-main">
      <header class="absa-topbar">
        <span class="absa-topbar__breadcrumb-current">Super Admin</span>
        <div class="absa-topbar__right">
          <div class="absa-topbar__avatar" style="background:linear-gradient(135deg,#8B0015,#BE0F2C)">SA</div>
        </div>
      </header>
      <div class="absa-content absa-mesh-dense">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
// Super Admin Layout — wraps all /super-admin/* routes
</script>

<style scoped>
.absa-dashboard-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  min-height: 100vh;
  background: #F8F8FA;
  font-family: 'Montserrat', 'Inter', system-ui, -apple-system, sans-serif;
}

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
  display: flex; align-items: center; gap: 10px;
  padding: 18px 20px;
  border-bottom: 1px solid #F3F4F6;
}

.absa-sidebar__brand-text {
  font-size: 0.8125rem; font-weight: 800; color: #111827;
}

.absa-sidebar__nav {
  display: flex; flex-direction: column; gap: 2px;
  padding: 12px; flex: 1;
}

.absa-sidebar__bottom {
  display: flex; flex-direction: column; gap: 2px;
  padding: 12px; border-top: 1px solid #F3F4F6;
}

.absa-nav-item {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 14px; border-radius: 8px;
  font-size: 0.8125rem; font-weight: 500; color: #4B5563;
  text-decoration: none; transition: all 150ms ease;
}

.absa-nav-item:hover { background: #F3F4F6; color: #111827; }

.absa-nav-item--active {
  background: #FDE8EC; color: #BE0F2C; font-weight: 700;
}

.absa-main { display: flex; flex-direction: column; min-height: 100vh; }

.absa-content { flex: 1; padding: 24px 32px; overflow-y: auto; }

.absa-topbar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 32px; height: 64px;
  background: #FFFFFF; border-bottom: 1px solid #E8E8EC;
  position: sticky; top: 0; z-index: 30;
}

.absa-topbar__breadcrumb-current { font-size: 0.875rem; font-weight: 600; color: #111827; }

.absa-topbar__right { display: flex; align-items: center; gap: 16px; }

.absa-topbar__avatar {
  width: 36px; height: 36px; border-radius: 50%;
  color: #FFFFFF; font-size: 0.75rem; font-weight: 800;
  display: flex; align-items: center; justify-content: center;
}

@media (max-width: 768px) {
  .absa-dashboard-layout { grid-template-columns: 1fr; }
  .absa-sidebar { display: none; }
  .absa-content { padding: 16px; }
  .absa-topbar { padding: 0 16px; }
}

.absa-sidebar::-webkit-scrollbar { width: 4px; }
.absa-sidebar::-webkit-scrollbar-track { background: transparent; }
.absa-sidebar::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 4px; }
</style>
