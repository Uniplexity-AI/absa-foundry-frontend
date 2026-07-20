<template>
  <div class="absa-subaccounts-page">
    <!-- Header -->
    <div class="absa-subaccounts__breadcrumb">
      <span>Home</span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      <span>Dashboard</span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      <span class="absa-subaccounts__breadcrumb-current">User Management</span>
    </div>

    <!-- Actions Bar -->
    <div class="absa-subaccounts__actions">
      <h1 class="absa-subaccounts__title">User Management</h1>
      <div class="absa-subaccounts__btns">
        <button @click="handleAddBranchClick" class="absa-subaccounts__btn absa-subaccounts__btn--outline">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          Add Branch
        </button>
        <button @click="showManageBranchesModal = true" class="absa-subaccounts__btn absa-subaccounts__btn--outline">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          Manage Branches
        </button>
        <button @click="handleAddUserClick" class="absa-subaccounts__btn absa-subaccounts__btn--primary">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          New User
        </button>
      </div>
    </div>

    <div class="flex-1 max-w-full mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 relative z-10 space-y-8">

      <!-- Active Sessions Alert -->
      <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="transform -translate-y-2 opacity-0" enter-to-class="transform translate-y-0 opacity-100">
        <div v-if="activeSessions.length > 0" class="absa-alert-info absa-subaccounts__sessions">
          <div class="absa-subaccounts__sessions-header">
            <div class="absa-subaccounts__sessions-title">
              <span class="absa-subaccounts__sessions-dot"></span>
              Active Sessions ({{ activeSessions.length }})
            </div>
            <button @click="logoutFromAllSubAccounts" class="absa-subaccounts__sessions-logout-all">
              Logout All
            </button>
          </div>
          <div class="absa-subaccounts__sessions-list">
            <div v-for="session in activeSessions" :key="session.subAccountId"
                 class="absa-subaccounts__session-card">
              <div class="absa-subaccounts__session-avatar">
                {{ session.subAccountName.substring(0, 2) }}
              </div>
              <div class="absa-subaccounts__session-info">
                <div class="absa-subaccounts__session-name">{{ session.subAccountName }}</div>
                <div class="absa-subaccounts__session-time">Since {{ new Date(session.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}</div>
              </div>
              <button @click="logoutFromSubAccount(session.subAccountId)" class="absa-subaccounts__session-close">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Metrics Grid -->
      <div class="absa-subaccounts__kpi-grid">
        <!-- Total Users KPI -->
        <div class="absa-metric-bg absa-accent-left-maroon">
          <div class="absa-subaccounts__kpi-header">
            <span class="absa-subaccounts__kpi-badge">STAT_USER</span>
          </div>
          <div class="absa-subaccounts__kpi-body">
            <div class="absa-subaccounts__kpi-icon absa-subaccounts__kpi-icon--maroon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h3 class="absa-subaccounts__kpi-value">{{ totalSubAccounts }}</h3>
            <p class="absa-subaccounts__kpi-label">Registered Users</p>
          </div>
        </div>

        <!-- Total Branches KPI -->
        <div class="absa-metric-bg absa-accent-left-success">
          <div class="absa-subaccounts__kpi-header">
            <span class="absa-subaccounts__kpi-badge">STAT_SHOP</span>
          </div>
          <div class="absa-subaccounts__kpi-body">
            <div class="absa-subaccounts__kpi-icon absa-subaccounts__kpi-icon--green">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
            <h3 class="absa-subaccounts__kpi-value">{{ totalBranches }}</h3>
            <p class="absa-subaccounts__kpi-label absa-subaccounts__kpi-label--green">Active Branches</p>
          </div>
        </div>

        <!-- Tier Info KPI -->
        <div class="absa-metric-bg absa-accent-left-warning">
          <div class="absa-subaccounts__kpi-header">
            <span class="absa-subaccounts__kpi-badge">STAT_TIER</span>
          </div>
          <div class="absa-subaccounts__kpi-body">
            <div class="absa-subaccounts__kpi-icon absa-subaccounts__kpi-icon--amber">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <h3 class="absa-subaccounts__kpi-value absa-subaccounts__kpi-value--sm">{{ currentTier?.tier || 'COMMERCIAL' }}</h3>
            <p class="absa-subaccounts__kpi-label absa-subaccounts__kpi-label--amber">Subscription Tier</p>
          </div>
        </div>

        <!-- Filtered Context KPI -->
        <div class="absa-metric-bg absa-accent-left-info">
          <div class="absa-subaccounts__kpi-header">
            <span class="absa-subaccounts__kpi-badge">STAT_CTX</span>
          </div>
          <div class="absa-subaccounts__kpi-body">
            <div class="absa-subaccounts__kpi-icon absa-subaccounts__kpi-icon--blue">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
            </div>
            <h3 class="absa-subaccounts__kpi-value">{{ filtered.length }}</h3>
            <p class="absa-subaccounts__kpi-label absa-subaccounts__kpi-label--blue">Filtered Context</p>
          </div>
        </div>
      </div>

    <!-- Filters & Toolbar -->
    <div class="absa-subaccounts__toolbar">
      <div class="absa-subaccounts__search-wrap">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input v-model="search" @input="applySearch" placeholder="Search by name or email..." />
      </div>
      <div class="flex gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
        <div class="absa-subaccounts__select-wrap">
          <select v-model="filterRole" @change="applySearch" class="absa-subaccounts__select">
            <option value="">ALL_ROLES</option>
            <option v-for="r in roles" :key="r.id || r" :value="r.name || r">{{ r.name || r }}</option>
          </select>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="absa-subaccounts__select-wrap">
          <select v-model="filterBranch" @change="applySearch" class="absa-subaccounts__select">
            <option value="">ALL_BRANCHES</option>
            <option v-for="b in branches" :key="b._id" :value="b._id">{{ b.name }}</option>
          </select>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="absa-subaccounts__view-toggle">
          <button @click="viewMode = 'cards'" 
            class="absa-subaccounts__view-btn"
            :class="{ 'absa-subaccounts__view-btn--active': viewMode === 'cards' }">
            <i class="fas fa-th"></i>
          </button>
          <button @click="viewMode = 'list'" 
            class="absa-subaccounts__view-btn"
            :class="{ 'absa-subaccounts__view-btn--active': viewMode === 'list' }">
            <i class="fas fa-list"></i>
          </button>
        </div>
        <button @click="refresh" class="absa-subaccounts__reload-btn">
          <i class="fas fa-sync-alt" :class="{'animate-spin': loading}"></i>
          <span>Reload</span>
        </button>
      </div>
    </div>

    <!-- Sub-accounts Loading -->
    <div v-if="loading" class="absa-subaccounts__loading-grid">
      <div v-for="i in 4" :key="`skeleton-${i}`" class="absa-subaccounts__loading-card"></div>
    </div>

    <!-- ── CARD VIEW ── -->
    <div v-else-if="viewMode === 'cards'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 relative z-10">
      <div v-for="(acc, index) in paged" :key="acc.id || acc.email || index" @click="openDetailsModal(acc)" 
           class="group bg-white rounded-sm border border-gray-200 p-5 shadow-sm hover:shadow-md hover:border-[#BE0F2C] transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between h-full min-h-[220px]">
        
        <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>

        <div class="absolute top-0 right-0 py-1 px-3 bg-gray-50 border-b border-l border-gray-100 text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest rounded-bl-sm group-hover:bg-[#BE0F2C] group-hover:text-white transition-colors">
          {{ acc.role }}
        </div>

        <div class="relative z-10">
          <div class="flex items-center gap-4 mb-5">
            <div class="h-12 w-12 text-[#BE0F2C] flex items-center justify-center font-black text-xl group-hover:scale-110 transition-transform">
              {{ acc.name.charAt(0).toUpperCase() }}
            </div>
            <div class="min-w-0">
              <h3 class="font-black text-gray-900 group-hover:text-[#BE0F2C] transition-colors truncate uppercase tracking-tight">{{ acc.name }}</h3>
              <p class="text-[10px] font-mono font-bold text-gray-400 truncate mt-0.5">{{ acc.email }}</p>
            </div>
          </div>

          <div class="space-y-3 pb-4">
            <div class="flex items-center justify-between text-[11px] font-bold text-gray-600 border-b border-gray-50 pb-2">
              <span class="text-gray-400 font-mono uppercase tracking-[0.1em]">Branch</span>
              <span class="text-gray-900 truncate max-w-[140px] uppercase">{{ getBranchName(acc.branch_id) }}</span>
            </div>
            <div class="flex items-center justify-between text-[11px] font-bold text-gray-600">
              <span class="text-gray-400 font-mono uppercase tracking-[0.1em]">Status</span>
              <span :class="isLoggedInToSubAccount(acc.id) ? 'text-green-600 bg-green-50 px-1.5 rounded-sm' : 'text-gray-400'" class="flex items-center gap-1.5 uppercase">
                <span class="w-1.5 h-1.5 rounded-full" :class="isLoggedInToSubAccount(acc.id) ? 'bg-green-500 animate-pulse' : 'bg-gray-300'"></span>
                {{ isLoggedInToSubAccount(acc.id) ? 'Active' : 'Offline' }}
              </span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2 pt-4 border-t border-gray-50 relative z-10">
           <button 
             v-if="!isLoggedInToSubAccount(acc.id)"
             @click.stop="loginToSubAccount(acc)" 
             class="flex-1 flex items-center justify-center gap-2 bg-[#BE0F2C] text-white px-4 py-2 rounded-sm hover:bg-[#8B0015] transition-all text-[10px] font-mono font-bold uppercase shadow-sm"
           >
             <i class="fas fa-sign-in-alt"></i> Login
           </button>
            <button 
             v-else
             @click.stop="logoutFromSubAccount(acc.id)" 
             class="flex-1 flex items-center justify-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-sm hover:bg-orange-600 transition-all text-[10px] font-mono font-bold uppercase shadow-sm"
           >
             <i class="fas fa-sign-out-alt"></i> Logout
           </button>
           <button @click.stop="confirmDelete(acc)" class="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-sm transition-all border border-transparent hover:border-red-100" title="Delete">
              <i class="fas fa-trash-alt text-xs"></i>
           </button>
        </div>
      </div>
      <!-- Empty state -->
      <div v-if="paged.length === 0" class="absa-subaccounts__empty absa-dots">
        <div class="absa-subaccounts__empty-icon">
          <i class="fas fa-users-slash"></i>
        </div>
        <p class="absa-subaccounts__empty-text">No sub-accounts match current filters</p>
      </div>
    </div>

    <!-- ── LIST / TABLE VIEW ── -->
    <div v-else-if="viewMode === 'list'" class="relative z-10 bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead class="absa-table-header">
            <tr>
              <th class="px-4 py-3 text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest">User</th>
              <th class="px-4 py-3 text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest">Role</th>
              <th class="px-4 py-3 text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest">Branch</th>
              <th class="px-4 py-3 text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest">Status</th>
              <th class="px-4 py-3 text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="(acc, index) in paged" :key="`list-${acc.id || acc.email || index}`"
                @click="openDetailsModal(acc)"
                class="hover:bg-maroon-soft-bg/30 transition-colors cursor-pointer group">
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <div class="h-9 w-9 shrink-0 rounded-sm bg-[#BE0F2C]/5 flex items-center justify-center font-black text-sm text-[#BE0F2C] group-hover:bg-[#BE0F2C] group-hover:text-white transition-colors">
                    {{ (acc.name || '?').charAt(0).toUpperCase() }}
                  </div>
                  <div>
                    <div class="text-xs font-bold text-gray-900 uppercase tracking-tight">{{ acc.name }}</div>
                    <div class="text-[9px] font-mono text-gray-400">{{ acc.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3">
                <span class="px-2 py-1 bg-gray-100 border border-gray-200 text-[9px] font-mono font-bold text-gray-600 uppercase rounded-sm">{{ acc.role }}</span>
              </td>
              <td class="px-4 py-3">
                <span class="text-xs font-bold text-gray-700 uppercase">{{ getBranchName(acc.branch_id) }}</span>
              </td>
              <td class="px-4 py-3">
                <span :class="isLoggedInToSubAccount(acc.id) ? 'text-green-600 bg-green-50 border-green-100' : 'text-gray-400 bg-gray-50 border-gray-100'" class="inline-flex items-center gap-1.5 px-2 py-1 text-[9px] font-mono font-bold uppercase rounded-sm border">
                  <span class="w-1.5 h-1.5 rounded-full" :class="isLoggedInToSubAccount(acc.id) ? 'bg-green-500 animate-pulse' : 'bg-gray-300'"></span>
                  {{ isLoggedInToSubAccount(acc.id) ? 'Active' : 'Offline' }}
                </span>
              </td>
              <td class="px-4 py-3 text-right">
                <div class="flex items-center justify-end gap-1">
                  <button v-if="!isLoggedInToSubAccount(acc.id)"
                    @click.stop="loginToSubAccount(acc)"
                    class="h-8 px-3 flex items-center gap-1.5 bg-[#BE0F2C] text-white rounded-sm hover:bg-[#8B0015] transition-all text-[9px] font-mono font-bold uppercase shadow-sm">
                    <i class="fas fa-sign-in-alt text-[8px]"></i> Login
                  </button>
                  <button v-else
                    @click.stop="logoutFromSubAccount(acc.id)"
                    class="h-8 px-3 flex items-center gap-1.5 bg-orange-500 text-white rounded-sm hover:bg-orange-600 transition-all text-[9px] font-mono font-bold uppercase shadow-sm">
                    <i class="fas fa-sign-out-alt text-[8px]"></i> Logout
                  </button>
                  <button @click.stop="confirmDelete(acc)"
                    class="h-8 w-8 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-sm transition-all border border-transparent hover:border-red-100">
                    <i class="fas fa-trash-alt text-[10px]"></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="paged.length === 0">
              <td colspan="5" class="px-4 py-16 text-center">
                <i class="fas fa-users-slash text-gray-200 text-3xl mb-3"></i>
                <p class="text-[10px] font-mono font-bold text-gray-300 uppercase tracking-widest">No sub-accounts match current filters</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div class="absa-subaccounts__pagination">
      <div class="absa-subaccounts__pagination-info">Displaying {{ filtered.length }} entries</div>
      <div class="absa-subaccounts__pagination-controls">
        <button @click="prevPage" :disabled="page <= 1" class="absa-subaccounts__page-btn">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <span class="absa-subaccounts__page-btn absa-subaccounts__page-btn--current">{{ page }}</span>
        <span class="absa-subaccounts__pagination-info">of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="page >= totalPages" class="absa-subaccounts__page-btn">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>

    <Teleport to="body">
    <!-- Create User Panel -->
    <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="showCreateModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm" @click="closeCreateModal">
        <div class="bg-white border border-gray-200 rounded-sm p-8 shadow-2xl relative overflow-hidden w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar" @click.stop>
        <div class="absolute inset-0 dotted-pattern opacity-[0.02] pointer-events-none"></div>
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div class="flex items-center gap-3">
              <div class="w-1 h-6 bg-[#BE0F2C]"></div>
              <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight">System // New User Registration</h3>
            </div>
            <button @click="closeCreateModal" class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <form @submit.prevent="createSubAccount" class="space-y-6 pt-2">
          <!-- Multi-column Layout -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
             <!-- Identity Section -->
             <div class="space-y-6">
                <div>
                   <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Display Name</label>
                   <input v-model="newAccount.name" required class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#BE0F2C] focus:border-[#BE0F2C] outline-none transition-all placeholder-gray-300 text-xs font-bold uppercase" placeholder="NAME_REQUIRED" />
                </div>
                <div>
                   <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                   <div class="relative">
                       <i class="far fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs text-xs"></i>
                       <input v-model="newAccount.email" required type="email" class="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#BE0F2C] focus:border-[#BE0F2C] outline-none transition-all placeholder-gray-300 text-xs font-mono font-bold" placeholder="EMAIL_REQUIRED" />
                   </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center justify-between">
                      <span>Role</span>
                      <button type="button" @click="fetchRoles" class="text-[8px] font-mono font-bold text-[#BE0F2C] normal-case hover:underline flex items-center gap-1" title="Reload roles from Settings">
                        <i class="fas fa-sync-alt"></i> refresh
                      </button>
                    </label>
                    <div class="relative">
                        <select v-model="newAccount.role" required class="w-full appearance-none px-4 py-2 bg-gray-50 border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#BE0F2C] outline-none cursor-pointer text-[10px] font-mono font-bold uppercase">
                          <option value="" disabled>SELECT_ROLE</option>
                          <option v-for="r in availableCreateRoles" :key="`new-role-${r.id || r}`" :value="r.id || r">
                            {{ (r.name || r) }}<template v-if="r.isCustom || r.is_custom"> • CUSTOM</template>
                          </option>
                        </select>
                        <i class="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[8px]"></i>
                    </div>
                    <p v-if="availableCreateRoles.length === 0" class="mt-1 text-[9px] font-mono text-amber-600">No roles available. Create one in Settings → Roles.</p>
                  </div>
                  <div>
                    <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Branch</label>
                    <div class="relative">
                        <select v-model="newAccount.branch_id" class="w-full appearance-none px-4 py-2 bg-gray-50 border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#BE0F2C] outline-none cursor-pointer text-[10px] font-mono font-bold uppercase">
                          <option :value="null">MASTER_ALL</option>
                          <option v-for="b in availableBranches" :key="`new-branch-${b._id || b.id}`" :value="b._id || b._id">{{ b.name }}</option>
                        </select>
                        <i class="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[8px]"></i>
                    </div>
                  </div>
                </div>
             </div>

             <!-- Security Section -->
             <div class="space-y-6">
                <div>
                   <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Access Password</label>
                   <input v-model="newAccount.password" required type="password" class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#BE0F2C] focus:border-[#BE0F2C] outline-none transition-all placeholder-gray-300 text-xs font-bold" placeholder="••••••••" />
                </div>
                <div>
                   <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Confirm Identity</label>
                   <input v-model="newAccount.confirmPassword" required type="password" class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#BE0F2C] focus:border-[#BE0F2C] outline-none transition-all placeholder-gray-300 text-xs font-bold" placeholder="••••••••" />
                </div>
                <div v-if="newAccount.password && newAccount.confirmPassword && newAccount.password !== newAccount.confirmPassword" class="text-red-500 text-[10px] font-mono font-bold uppercase bg-red-50 p-3 border border-red-100 rounded-sm flex items-center gap-2">
                    <i class="fas fa-exclamation-triangle"></i> ERROR_PASSWORD_MISMATCH
                </div>
                <div class="p-4 bg-maroon-soft-bg border border-maroon-soft-border rounded-sm border-l-4 border-l-[#BE0F2C]">
                  <p class="text-[10px] font-mono font-bold text-indigo-900 uppercase tracking-wider leading-relaxed">
                    User permissions will be automatically inherited from the selected role.
                  </p>
                </div>
             </div>
          </div>

          <div class="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
            <button type="button" @click="closeCreateModal" class="px-5 py-2 text-gray-500 font-bold text-xs uppercase hover:bg-gray-100 rounded-sm transition-colors">CANCEL_OP</button>
            <button type="submit" :disabled="loading" class="px-6 py-2 bg-[#BE0F2C] text-white font-bold text-xs uppercase rounded-sm hover:bg-[#8B0015] shadow-md transition-all disabled:opacity-50">
              <span v-if="loading"><i class="fas fa-spinner fa-spin mr-2"></i>EXECUTING...</span>
              <span v-else>COMMIT_REGISTRATION</span>
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
    </Transition>



    <!-- Create Branch Panel -->
    <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="showBranchModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm" @click="closeBranchModal">
        <div class="bg-white border border-gray-200 rounded-sm p-8 shadow-2xl relative overflow-hidden w-full max-w-3xl max-h-[90vh] overflow-y-auto custom-scrollbar" @click.stop>
        <div class="absolute inset-0 dotted-pattern opacity-[0.02] pointer-events-none"></div>
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div class="flex items-center gap-3">
              <div class="w-1 h-6 bg-[#BE0F2C]"></div>
              <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight">System // New Branch Setup</h3>
            </div>
            <button @click="closeBranchModal" class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <form @submit.prevent="createBranch" class="space-y-6 pt-2">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
             <!-- Location Details -->
             <div class="space-y-6">
                <div>
                   <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Branch Designation</label>
                   <input v-model="newBranch.name" required class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#BE0F2C] focus:border-[#BE0F2C] outline-none transition-all placeholder-gray-300 text-xs font-bold uppercase" placeholder="BRANCH_NAME" />
                </div>
                <div>
                   <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Physical Location</label>
                   <div class="relative">
                       <i class="fas fa-map-marker-alt absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
                       <input v-model="newBranch.location" required class="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#BE0F2C] focus:border-[#BE0F2C] outline-none transition-all placeholder-gray-300 text-xs font-bold uppercase" placeholder="STREET_CITY_LOC" />
                   </div>
                </div>
             </div>

             <!-- Communication Details -->
             <div class="space-y-6">
                <div>
                   <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Technical Phone</label>
                   <input v-model="newBranch.phone" type="tel" class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#BE0F2C] focus:border-[#BE0F2C] outline-none transition-all placeholder-gray-300 text-xs font-mono font-bold" placeholder="+260_XXX_XXXXXX" />
                </div>
                <div>
                   <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Technical Email</label>
                   <input v-model="newBranch.email" type="email" class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#BE0F2C] focus:border-[#BE0F2C] outline-none transition-all placeholder-gray-300 text-xs font-mono font-bold" placeholder="BRANCH_SUPPORT_EMAIL" />
                </div>
             </div>
          </div>
          
          <div class="p-4 bg-blue-50 border border-blue-100 rounded-sm border-l-4 border-l-blue-600 flex gap-4">
             <div class="text-blue-600 mt-0.5"><i class="fas fa-info-circle"></i></div>
             <p class="text-[10px] font-mono font-bold text-blue-900 uppercase tracking-wider leading-relaxed">
               Branch creation initializes localized inventory and sales tracking silos.
             </p>
          </div>

          <div class="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
            <button type="button" @click="closeBranchModal" class="px-5 py-2 text-gray-500 font-bold text-xs uppercase hover:bg-gray-100 rounded-sm transition-colors">HALT_OP</button>
            <button type="submit" :disabled="loading" class="px-6 py-2 bg-[#BE0F2C] text-white font-bold text-xs uppercase rounded-sm hover:bg-[#8B0015] shadow-md transition-all disabled:opacity-50">
              <span v-if="loading"><i class="fas fa-spinner fa-spin mr-2"></i>EXECUTING...</span>
              <span v-else>INITIALIZE_BRANCH</span>
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
    </Transition>

    <!-- Manage Branches Panel -->
    <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="showManageBranchesModal" class="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-gray-900/60 backdrop-blur-sm" @click="showManageBranchesModal = false">
        <div class="bg-white border border-gray-200 rounded-sm p-4 sm:p-8 shadow-2xl relative overflow-hidden w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto custom-scrollbar" @click.stop>
        <div class="absolute inset-0 dotted-pattern opacity-[0.02] pointer-events-none"></div>
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-100">
            <div class="flex items-center gap-2 sm:gap-3">
              <div class="w-1 h-5 sm:h-6 bg-orange-500"></div>
              <h3 class="text-xs sm:text-sm font-black text-gray-900 uppercase tracking-tight">System // Manage Branches</h3>
            </div>
            <button @click="showManageBranchesModal = false" class="text-gray-400 hover:text-gray-600 p-1">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="space-y-4 sm:space-y-6 pt-1 sm:pt-2">
             <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-orange-50 p-3 sm:p-4 border border-orange-100 rounded-sm border-l-4 border-l-orange-500 gap-3 sm:gap-4">
                <div class="flex gap-3 sm:gap-4">
                  <div class="text-orange-600 mt-0.5 shrink-0"><i class="fas fa-exclamation-triangle"></i></div>
                  <div>
                      <h4 class="text-[10px] sm:text-[11px] font-black text-orange-900 uppercase">Warning: Irreversible Action</h4>
                      <p class="text-[9px] sm:text-[10px] font-mono font-bold text-orange-800 uppercase tracking-wider leading-relaxed mt-1">
                        Deleting a branch will permanently purge ALL associated data (Inventory, Sales, Expenses, and Sub-Accounts). Use extreme caution.
                      </p>
                  </div>
                </div>
                <button @click="handleAddBranchClick(); showManageBranchesModal = false" class="bg-orange-600 hover:bg-orange-700 text-white px-3 sm:px-4 py-2 rounded-sm text-[9px] sm:text-[10px] font-mono font-bold uppercase shadow-sm shrink-0 w-full sm:w-auto text-center">
                  <i class="fas fa-plus"></i> ADD_NEW
                </button>
             </div>

            <div class="border border-gray-200 rounded-sm overflow-hidden overflow-x-auto">
                <table class="w-full text-left border-collapse min-w-[600px]">
                    <thead class="bg-gray-50 border-b border-gray-200">
                        <tr>
                             <th class="px-3 sm:px-4 py-2 sm:py-3 text-[9px] sm:text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest">Branch Name / Loc</th>
                             <th class="px-3 sm:px-4 py-2 sm:py-3 text-[9px] sm:text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest hidden sm:table-cell">Contacts / Email</th>
                             <th class="px-3 sm:px-4 py-2 sm:py-3 text-[9px] sm:text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest">Users</th>
                             <th class="px-3 sm:px-4 py-2 sm:py-3 text-[9px] sm:text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest hidden sm:table-cell">Status</th>
                             <th class="px-3 sm:px-4 py-2 sm:py-3 text-[9px] sm:text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <tr v-for="(branch, index) in branches" :key="branch._id || branch.id || index" class="hover:bg-gray-50 transition-colors">
                             <td class="px-3 sm:px-4 py-3 sm:py-4">
                                <div class="text-[11px] sm:text-xs font-bold text-gray-900 uppercase tracking-tight">{{ branch.name }}</div>
                                <div class="text-[8px] sm:text-[9px] font-mono text-gray-400 uppercase mt-0.5">{{ branch.location }}</div>
                                <!-- Mobile: show status inline -->
                                <div class="sm:hidden mt-1">
                                  <span v-if="branch.status === 'active'" class="px-1.5 py-0.5 bg-green-50 text-green-600 text-[8px] font-mono font-black uppercase rounded-sm border border-green-100">Active</span>
                                  <span v-else class="px-1.5 py-0.5 bg-red-50 text-red-600 text-[8px] font-mono font-black uppercase rounded-sm border border-red-100">Inactive</span>
                                </div>
                            </td>
                            <td class="px-3 sm:px-4 py-3 sm:py-4 hidden sm:table-cell">
                                <div class="text-[9px] sm:text-[10px] font-mono font-bold text-gray-500">{{ branch.phone || 'NO_PHONE' }}</div>
                                <div class="text-[8px] sm:text-[9px] font-mono text-gray-400 lowercase">{{ branch.email || 'no_email@sys.com' }}</div>
                            </td>
                            <td class="px-3 sm:px-4 py-3 sm:py-4">
                                <span class="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-600 text-[8px] sm:text-[9px] font-mono font-black uppercase rounded-sm border border-gray-200">
                                  {{ branch.user_count || 0 }}
                                </span>
                            </td>
                            <td class="px-3 sm:px-4 py-3 sm:py-4 hidden sm:table-cell">
                                <span v-if="branch.status === 'active'" class="px-2 py-0.5 bg-green-50 text-green-600 text-[9px] font-mono font-black uppercase rounded-sm border border-green-100">Active</span>
                                <span v-else class="px-2 py-0.5 bg-red-50 text-red-600 text-[9px] font-mono font-black uppercase rounded-sm border border-red-100">Inactive</span>
                            </td>
                             <td class="px-2 sm:px-4 py-3 sm:py-4 text-right">
                                <div class="flex items-center justify-end gap-1 sm:gap-2">
                                  <button @click="toggleBranchStatus(branch)" :class="branch.status === 'active' ? 'text-green-500 hover:bg-green-50 hover:border-green-200' : 'text-gray-400 hover:bg-gray-100'" class="h-7 w-7 sm:h-8 sm:w-8 rounded-sm transition-all shadow-sm border border-transparent flex items-center justify-center" :title="branch.status === 'active' ? 'Deactivate Branch' : 'Activate Branch'">
                                      <i class="fas text-xs" :class="branch.status === 'active' ? 'fa-toggle-on' : 'fa-toggle-off'"></i>
                                  </button>
                                  <button @click="handleEditBranch(branch)" class="h-7 w-7 sm:h-8 sm:w-8 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-sm transition-all shadow-sm border border-transparent hover:border-blue-100 flex items-center justify-center" title="Edit Branch">
                                      <i class="fas fa-edit text-xs"></i>
                                  </button>
                                  <button @click="openDeleteBranchModal(branch)" class="h-7 w-7 sm:h-8 sm:w-8 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-sm transition-all shadow-sm border border-transparent hover:border-red-100 flex items-center justify-center" title="Delete Branch">
                                      <i class="fas fa-trash-alt text-xs"></i>
                                  </button>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="branches.length === 0">
                            <td colspan="5" class="px-4 py-12 text-center">
                                <i class="fas fa-store-slash text-gray-200 text-3xl mb-3"></i>
                                <p class="text-[10px] font-mono font-bold text-gray-300 uppercase">No active branches found</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="flex justify-end pt-4 border-t border-gray-100">
                <button @click="showManageBranchesModal = false" class="px-5 sm:px-6 py-2 bg-gray-100 text-gray-500 font-bold text-[11px] sm:text-xs uppercase rounded-sm hover:bg-gray-200 transition-all">Close</button>
            </div>
            </div>
        </div>
      </div>
    </div>
    </Transition>

    <!-- Delete Branch Confirmation Modal -->
    <div v-if="showDeleteBranchModal" class="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm" @click="closeDeleteBranchModal">
      <div class="bg-white border border-gray-200 rounded-sm shadow-2xl w-full max-w-md" @click.stop>
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div class="flex items-center gap-2">
            <div class="w-1 h-5 bg-red-500"></div>
            <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight font-mono">Delete Branch</h3>
          </div>
          <button @click="closeDeleteBranchModal" class="text-gray-400 hover:text-gray-600 p-1">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="p-6 space-y-4">
          <div class="bg-red-50 border border-red-100 rounded-sm p-4">
            <p class="text-[10px] font-mono font-bold text-red-800 uppercase tracking-widest leading-relaxed">
              Deleting <span class="text-red-900">{{ branchPendingDelete?.name || 'this branch' }}</span> will permanently remove its inventory, sales, expenses, and assigned sub-accounts.
            </p>
          </div>

          <p class="text-sm text-gray-600">
            Type <span class="font-bold text-gray-900">DELETE</span> to confirm this irreversible action.
          </p>

          <div>
            <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Confirmation Text</label>
            <input
              v-model="branchDeleteConfirmation"
              type="text"
              autocomplete="off"
              class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#BE0F2C] focus:border-[#BE0F2C] outline-none transition-all placeholder-gray-300 text-xs font-mono font-bold uppercase"
              placeholder="DELETE"
              @input="branchDeleteError = ''"
            />
            <p class="mt-2 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
              This check is case-sensitive.
            </p>
            <p v-if="branchDeleteError" class="mt-2 text-[10px] font-mono font-bold text-red-600 uppercase tracking-widest">
              {{ branchDeleteError }}
            </p>
          </div>
        </div>

        <div class="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
          <button type="button" @click="closeDeleteBranchModal" class="px-5 py-2 text-gray-500 font-bold text-xs uppercase hover:bg-gray-100 rounded-sm transition-colors">
            Cancel
          </button>
          <button
            type="button"
            :disabled="branchDeleteLoading || branchDeleteConfirmation.trim().toUpperCase() !== 'DELETE'"
            @click="confirmDeleteBranch"
            class="px-5 py-2 bg-red-600 text-white font-bold text-xs uppercase rounded-sm hover:bg-red-700 shadow-md transition-all disabled:opacity-50"
          >
            <span v-if="branchDeleteLoading">Deleting...</span>
            <span v-else>Delete Branch</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Subaccount Details & Edit Panel -->
    <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="showDetailsModal && selectedSubAccount" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm" @click="closeDetailsModal">
        <div class="bg-white border border-gray-200 rounded-sm p-8 shadow-2xl relative overflow-hidden w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar" @click.stop>
        <div class="absolute inset-0 dotted-pattern opacity-[0.02] pointer-events-none"></div>
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div class="flex items-center gap-4">
              <div class="h-10 w-10 flex items-center justify-center text-[#BE0F2C] font-black">
                  <i class="fas fa-id-badge text-lg"></i>
              </div>
              <div>
                  <div class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">SUB_ACCOUNT // PROFILE</div>
                  <div class="text-sm font-black text-gray-900 uppercase tracking-tight">{{ selectedSubAccount.name }}</div>
              </div>
            </div>
            <button @click="closeDetailsModal" class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-times"></i>
            </button>
          </div>
         <!-- Tabs -->
         <div class="border-b border-gray-100 mb-8 flex gap-8">
             <button @click="detailsTab = 'profile'" :class="{'border-b-2 border-[#BE0F2C] text-[#BE0F2C]': detailsTab === 'profile', 'text-gray-400 border-transparent hover:text-gray-600': detailsTab !== 'profile'}" class="pb-3 px-1 text-[10px] font-mono font-black uppercase tracking-[0.2em] transition-all">PROFILE_CFG</button>
             <button @click="detailsTab = 'modules'" :class="{'border-b-2 border-[#BE0F2C] text-[#BE0F2C]': detailsTab === 'modules', 'text-gray-400 border-transparent hover:text-gray-600': detailsTab !== 'modules'}" class="pb-3 px-1 text-[10px] font-mono font-black uppercase tracking-[0.2em] transition-all">FEATURE_MATIX</button>
         </div>
         
         <!-- PROFILE TAB -->
         <div v-if="detailsTab === 'profile'" class="space-y-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <!-- Left Col: Core Identity -->
              <div class="space-y-6">
                <div>
                   <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Display Name</label>
                   <input v-model="editProfile.name" class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#BE0F2C] focus:border-[#BE0F2C] outline-none transition-all text-xs font-bold uppercase" />
                </div>
                <div>
                   <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">System Credentials</label>
                   <input v-model="editProfile.email" disabled class="w-full px-4 py-2 bg-gray-100 border border-gray-100 rounded-sm text-gray-500 cursor-not-allowed text-xs font-mono font-bold" />
                </div>
              </div>

              <!-- Right Col: Security & Assignment -->
              <div class="space-y-6">
                 <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center justify-between">
                        <span>Assign Role</span>
                        <button type="button" @click="fetchRoles" class="text-[8px] font-mono font-bold text-[#BE0F2C] normal-case hover:underline flex items-center gap-1" title="Reload roles from Settings">
                          <i class="fas fa-sync-alt"></i> refresh
                        </button>
                      </label>
                      <div class="relative">
                        <select v-model="editProfile.role" class="w-full appearance-none px-4 py-2 bg-gray-50 border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#BE0F2C] outline-none cursor-pointer text-[10px] font-mono font-bold uppercase">
                            <option v-for="r in availableAssignableRoles" :key="`edit-role-${r.id || r}`" :value="r.id || r">
                              {{ (r.name || r) }}<template v-if="r.isCustom || r.is_custom"> • CUSTOM</template>
                            </option>
                        </select>
                        <i class="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[8px]"></i>
                      </div>
                      <p v-if="editProfile.role && !availableAssignableRoles.some(r => (r.id || r) === editProfile.role)" class="mt-1 text-[9px] font-mono text-amber-600">
                        Current role “{{ editProfile.role }}” is no longer available. Pick a new role.
                      </p>
                    </div>
                    <div>
                      <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Assign Branch</label>
                      <div class="relative">
                        <select v-model="editProfile.branch_id" class="w-full appearance-none px-4 py-2 bg-gray-50 border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#BE0F2C] outline-none cursor-pointer text-[10px] font-mono font-bold uppercase">
                            <option :value="null">MASTER_ALL</option>
                            <option v-for="b in branches" :key="`edit-branch-${b._id || b.id}`" :value="b._id || b.id">{{ b.name }}</option>
                        </select>
                        <i class="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[8px]"></i>
                      </div>
                    </div>
                 </div>
                 <div>
                    <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Security Override (Password)</label>
                    <input v-model="editProfile.password" type="password" class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#BE0F2C] focus:border-[#BE0F2C] outline-none transition-all text-xs font-bold" placeholder="VERIFICATION_KEY_UNAVAILABLE" />
                 </div>
              </div>
            </div>

            <div class="flex justify-end pt-8 gap-3 border-t border-gray-100">
                <button type="button" @click="closeDetailsModal" class="px-5 py-2 text-gray-500 font-bold text-xs uppercase hover:bg-gray-100 rounded-sm transition-colors">DISCARD_CHG</button>
                <button @click="saveProfile" :disabled="loading" class="px-6 py-2 bg-[#BE0F2C] text-white font-bold text-xs uppercase rounded-sm hover:bg-[#8B0015] shadow-md transition-all transform active:scale-95">
                   <span v-if="loading"><i class="fas fa-spinner fa-spin mr-2"></i>EXECUTING...</span>
                   <span v-else>COMMIT_UPDATE</span>
                </button>
            </div>
         </div>
         
         <!-- MODULES TAB -->
         <div v-if="detailsTab === 'modules'" class="space-y-6">
            <div class="bg-maroon-soft-bg p-5 rounded-sm border border-maroon-soft-border border-l-4 border-l-[#BE0F2C]">
               <div class="flex gap-4">
                   <div class="text-[#BE0F2C] mt-1"><i class="fas fa-shield-alt text-lg"></i></div>
                   <div>
                       <h4 class="font-black text-[#BE0F2C] text-[11px] uppercase tracking-wider">Module Access Control</h4>
                       <p class="text-[10px] font-mono font-bold text-indigo-900 uppercase tracking-wider mt-1.5 leading-relaxed">
                         Click modules to toggle access for <span class="text-[#BE0F2C]">{{ selectedSubAccount?.name || selectedSubAccount?.email }}</span>. Changes are saved automatically.
                       </p>
                   </div>
               </div>
            </div>
            
            <div class="flex justify-between items-center mb-4">
               <div class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Feature_Access_Matrix</div>
               <div class="relative">
                 <select v-model="roleFilter" class="appearance-none px-3 py-1.5 border border-gray-200 rounded-sm text-[9px] font-mono font-bold uppercase bg-white text-gray-700 outline-none focus:ring-1 focus:ring-[#BE0F2C]">
                    <option value="">SHOW_ALL_MATRICES</option>
                    <option v-for="r in roles" :key="`matrix-role-${r.id || r}`" :value="r.id || r">{{ r.name || r }} DEFAULTS</option>
                 </select>
                 <i class="fas fa-filter absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none text-[8px]"></i>
               </div>
            </div>
            
            <div v-if="modulesLoading" class="text-center py-12 bg-gray-50 rounded-sm border border-dashed border-gray-200">
                <i class="fas fa-spinner fa-spin text-xl text-[#BE0F2C] mb-3"></i>
                <p class="text-[10px] font-mono font-bold text-gray-400 uppercase">SYNCHRONIZING_MODULE_DATA...</p>
            </div>
            
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
               <div v-for="(mod, index) in filteredModules" :key="mod.id || index" 
                    @click="toggleModuleAssignment(mod.id)"
                    class="p-4 border rounded-sm flex items-center justify-between group transition-all cursor-pointer hover:shadow-sm"
                     :class="assignedModules.includes(mod.id) ? 'bg-maroon-soft-bg/50 border-indigo-200 hover:border-[var(--absa-maroon,#BE0F2C)]' : 'bg-gray-50/50 border-gray-100 hover:border-gray-300 opacity-60 hover:opacity-80'"
               >
                  <span class="text-[10px] font-mono font-black text-gray-800 uppercase tracking-widest">{{ mod.name }}</span>
                  <div v-if="savingModules && togglingModuleId === mod.id" class="text-[#BE0F2C]">
                    <i class="fas fa-spinner fa-spin text-[10px]"></i>
                  </div>
                  <div v-else-if="assignedModules.includes(mod.id)" class="text-[#BE0F2C] flex items-center justify-center">
                    <i class="fas fa-check text-[10px]"></i>
                  </div>
                  <div v-else class="text-gray-300 group-hover:text-gray-400">
                    <i class="fas fa-plus text-[10px]"></i>
                  </div>
               </div>
               
               <div v-if="filteredModules.length === 0" class="col-span-3 text-center text-gray-400 py-12 border-2 border-dashed border-gray-100 rounded-sm">
                  <p class="text-[10px] font-mono font-bold uppercase">NO_MODULES_MATCH_CURRENT_FILTER</p>
               </div>
            </div>
            
             <div class="flex justify-end pt-8 border-t border-gray-100">
                <button type="button" @click="closeDetailsModal" class="px-6 py-2 bg-white border border-gray-200 rounded-sm text-xs font-bold uppercase text-gray-500 hover:border-[#BE0F2C] hover:text-[#BE0F2C] transition-colors">CLOSE_MATIX</button>
            </div>
         </div>
        </div>
        </div>
      </div>
    </Transition>
     <!-- Edit Branch Panel -->
    <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="showEditBranchModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm" @click="closeEditBranchModal">
        <div class="bg-white border border-gray-200 rounded-sm p-8 shadow-2xl relative overflow-hidden w-full max-w-3xl max-h-[90vh] overflow-y-auto custom-scrollbar" @click.stop>
        <div class="absolute inset-0 dotted-pattern opacity-[0.02] pointer-events-none"></div>
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div class="flex items-center gap-3">
              <div class="w-1 h-6 bg-blue-500"></div>
              <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight">System // Edit Branch Details</h3>
            </div>
            <button type="button" @click="closeEditBranchModal" class="text-gray-400 hover:text-gray-600 text-2xl font-light leading-none">&times;</button>
          </div>
        <form @submit.prevent="updateBranch" class="space-y-6 pt-2">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
             <div class="space-y-6">
                <div>
                   <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Branch Designation</label>
                   <input v-model="editBranchData.name" required class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#BE0F2C] focus:border-[#BE0F2C] outline-none transition-all placeholder-gray-300 text-xs font-bold uppercase" />
                </div>
                <div>
                   <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Physical Location</label>
                   <div class="relative">
                       <i class="fas fa-map-marker-alt absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
                       <input v-model="editBranchData.location" required class="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#BE0F2C] focus:border-[#BE0F2C] outline-none transition-all placeholder-gray-300 text-xs font-bold uppercase" />
                   </div>
                </div>
             </div>
             <div class="space-y-6">
                <div>
                   <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Technical Phone</label>
                   <input v-model="editBranchData.phone" type="tel" class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#BE0F2C] focus:border-[#BE0F2C] outline-none transition-all placeholder-gray-300 text-xs font-mono font-bold" />
                </div>
                <div>
                   <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Technical Email</label>
                   <input v-model="editBranchData.email" type="email" class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#BE0F2C] focus:border-[#BE0F2C] outline-none transition-all placeholder-gray-300 text-xs font-mono font-bold" />
                </div>
             </div>
          </div>
          
          <div class="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
            <button type="button" @click="closeEditBranchModal" class="px-5 py-2 text-gray-500 font-bold text-xs uppercase hover:bg-gray-100 rounded-sm transition-colors">CANCEL_OP</button>
            <button type="submit" :disabled="loading" class="px-6 py-2 bg-[#BE0F2C] text-white font-bold text-xs uppercase rounded-sm hover:bg-[#8B0015] shadow-md transition-all disabled:opacity-50">
              <span v-if="loading"><i class="fas fa-spinner fa-spin mr-2"></i>EXECUTING...</span>
              <span v-else>UPDATE_BRANCH</span>
            </button>
          </div>
        </form>
        </div>
        </div>
      </div>
    </Transition>
    </Teleport>
  </div>
</div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useCurrency } from '@/composables/useCurrency';
import API_BASE_URL from '@/api_services/api';
import { decodeJWT } from '@/api_services/decodeJWT.js';
import { useRBAC } from '@/composables/useRBAC';
import { useRouter } from 'vue-router';

import { DEFAULT_ROLES } from '@/config/rbac';
import { Modal } from '@/components/ui/index.js';


const { formatCurrency } = useCurrency();
const { getTenantId } = decodeJWT();
const router = useRouter();

// RBAC integration for roles
const { tenantRoles, fetchRoles, initializeRBAC } = useRBAC();

// State
const subAccounts = ref([]);
const branches = ref([]); // Shops/branches list
const loading = ref(false);
const error = ref('');
const profile = ref({});
const subscription = ref(null);
const currentTier = computed(() => subscription.value || {});


const showCreateModal = ref(false);
const showManageUsersModal = ref(false);
const showBranchModal = ref(false); // Modal to create new branch
const showManageBranchesModal = ref(false); // Modal to manage/delete branches
const manageTarget = ref(null);
const newUserEmail = ref('');
const showDeleteBranchModal = ref(false);
const branchPendingDelete = ref(null);
const branchDeleteConfirmation = ref('');
const branchDeleteError = ref('');
const branchDeleteLoading = ref(false);


const newAccount = ref({ name: '', email: '', password: '', confirmPassword: '', role: 'attendant', branch_id: null, pin: '' });
const newBranch = ref({ name: '', location: '', phone: '', email: '' });
const showEditBranchModal = ref(false);
const editBranchData = ref({ _id: '', name: '', location: '', phone: '', email: '' });

// Computed roles from RBAC (fallback to defaults if not loaded)
const roles = computed(() => {
  if (tenantRoles.value && tenantRoles.value.length > 0) {
    return tenantRoles.value;
  }
  // Fallback default roles (admin/super_admin intentionally omitted — managed from Admin dashboard)
  return [
    { id: 'manager', name: 'Manager' },
    { id: 'cashier', name: 'Cashier' },
    { id: 'attendant', name: 'Attendant' },
    { id: 'hotel_attendant', name: 'Hotel Staff' },
    // { id: 'kitchen', name: 'Kitchen' },
  ];
});

// Role hierarchy filtering - users can only create users with equal or lower roles
const _roleHierarchy = ['attendant', 'hotel_attendant', 'cashier', 'accountant', 'auditor', 'manager', 'admin', 'super_admin', 'owner'];
const currentUserRoleId = computed(() => String(localStorage.getItem('role') || 'attendant').toLowerCase().trim());

const availableRoles = computed(() => {
  const currentUserRole = currentUserRoleId.value;
  const currentUserLevel = _roleHierarchy.indexOf(currentUserRole);

  // admin / super_admin roles are managed exclusively from the Admin dashboard
  // and must NEVER appear in the User Management role dropdown.
  const ADMIN_ONLY = new Set(['admin', 'super_admin', 'superadmin']);
  const ADMIN_ONLY_NAMES = new Set(['admin', 'super admin', 'superadmin']);
  const isAdminOnly = (r) => {
    const id = String(r?.id || r || '').toLowerCase().trim();
    const name = String(r?.name || '').toLowerCase().trim();
    return ADMIN_ONLY.has(id) || ADMIN_ONLY_NAMES.has(name);
  };

  // Owner / admin / super_admin can assign any role except admin/super_admin
  if (['owner', 'admin', 'super_admin'].includes(currentUserRole)) {
    return roles.value.filter(r => {
      const roleId = r.id || r;
      if (isAdminOnly(r)) return false;
      return true;
    });
  }
  
  try {
    return roles.value.filter(r => {
      const roleId = r.id || r;
      if (roleId === 'super_admin') return false;
      if (isAdminOnly(r)) return false;
      const roleLevel = _roleHierarchy.indexOf(roleId);
      // If roleId is not in hierarchy (custom role), allow it
      if (roleLevel < 0) return true;
      // Allow equal or lower level roles
      return roleLevel <= currentUserLevel;
    });
  } catch (e) {
    console.error('Error filtering roles:', e);
    return roles.value;
  }
});

const availableCreateRoles = computed(() => availableRoles.value);

const availableAssignableRoles = computed(() => {
  const assignable = [...availableRoles.value];
  if (currentUserRoleId.value !== 'owner') return assignable;
  const hasOwner = assignable.some(r => String(r?.id || r || '').toLowerCase().trim() === 'owner');
  if (hasOwner) return assignable;
  const ownerRole = roles.value.find(r => String(r?.id || r || '').toLowerCase().trim() === 'owner');
  return ownerRole ? [...assignable, ownerRole] : assignable;
});

// Branch filtering - non-admin users can only assign to their own branch
const availableBranches = computed(() => {
  const currentUserRole = localStorage.getItem('role') || 'attendant';
  const currentUserBranchId = localStorage.getItem('branch_id');
  
  // Owners and admins can assign to any branch
  if (['owner', 'admin', 'super_admin'].includes(currentUserRole)) {
    return branches.value;
  }
  
  // Other users can only assign to their own branch
  if (currentUserBranchId) {
    return branches.value.filter(b => b._id === currentUserBranchId);
  }
  
  return branches.value;
});

// Sub-account session management
const subAccountSessions = ref(new Map()); // Map<subAccountId, sessionInfo>
const STORAGE_KEY = 'subaccount_sessions';

// View Mode: 'cards' | 'list'
const viewMode = ref(localStorage.getItem('subaccount_view_mode') || 'cards');

// Persist view mode preference
watch(viewMode, (mode) => {
  localStorage.setItem('subaccount_view_mode', mode);
});

// Filters & Pagination
const search = ref('');
const filterRole = ref('');
const filterBranch = ref('');
const page = ref(1);
const pageSize = 8;

const fetchTenantProfile = async () => {
  try {
    const tenantId = getTenantId();
    const res = await fetch(`${API_BASE_URL}/tenant-details/details?tenant_id=${tenantId}`);
    if (res.ok) {
      profile.value = await res.json();
    }
  } catch (e) {
    console.error('Failed to fetch profile', e);
  }
};
  const fetchOwnerSubscription = async () => {
    try {
      const tenantId = getTenantId();
      const res = await fetch(`${API_BASE_URL}/modules-manager/owner/subscription?tenant_id=${tenantId}`);
      if (!res.ok) throw new Error('Failed to fetch owner subscription');
      const data = await res.json();
      subscription.value = data || { tier: null, payment_plan: null, modules: [] };
    } catch (e) {
      console.warn('Failed to fetch owner subscription', e);
      subscription.value = { tier: null, payment_plan: null, modules: [] };
    }
  };

const checkLimit = async (type) => {
  await fetchOwnerSubscription();
  await fetchBranches();
  
  // Use custom limits from approved subscription first, fall back to tier defaults
  const sub = subscription.value || {};
  const tier = currentTier.value || {};

  console.log('[checkLimit]', type, { custom_users: sub.custom_users, custom_branches: sub.custom_branches, tierMaxUsers: tier.maxUsers, tierMaxBranches: tier.maxBranches });

  if (type === 'user') {
    const maxUsers = (sub.custom_users != null && sub.custom_users !== '') ? Number(sub.custom_users) : tier.maxUsers;
    if (maxUsers && totalSubAccounts.value + 1 > maxUsers) {
      if (confirm(`You have reached the limit for users in your ${tier.label || 'current'} plan (${maxUsers} users). Would you like to upgrade your plan?`)) {
        router.push('/dashboard/settings?tab=modules');
      }
      return false;
    }
  } else if (type === 'branch') {
     const maxBranches = (sub.custom_branches != null && sub.custom_branches !== '') ? Number(sub.custom_branches) : tier.maxBranches;
     const totalActualBranches = branches.value.length + 1;
     if (maxBranches && totalActualBranches > maxBranches) {
       if (confirm(`You have reached the limit for branches in your ${tier.label || 'current'} plan (${maxBranches} branches). Would you like to upgrade your plan?`)) {
         router.push('/dashboard/settings?tab=modules');
       }
       return false;
     }
  }
  return true;
};

const handleAddUserClick = async () => {
  if (await checkLimit('user')) {
    // Refresh tenant roles (including custom roles created in Settings) so the dropdown
    // always reflects the latest list before opening the modal.
    try { await fetchRoles(); } catch (e) { console.warn('[handleAddUserClick] fetchRoles failed', e); }
    // If the currently selected default role no longer exists in the refreshed list,
    // fall back to the first available option.
    const firstAvailable = availableRoles.value[0];
    if (firstAvailable) {
      const exists = availableRoles.value.some(r => (r.id || r) === newAccount.value.role);
      if (!exists) newAccount.value.role = firstAvailable.id || firstAvailable;
    }
    showCreateModal.value = true;
  }
};

const handleAddBranchClick = async () => {
  if (await checkLimit('branch')) {
    showBranchModal.value = true;
  }
};

// Fetch branches from subaccounts API

const fetchBranches = async () => {
  try {
    const url = `${API_BASE_URL}/subaccounts/branches/list?tenant_id=${getTenantId()}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch branches');
    const data = await res.json();
    const fetched = Array.isArray(data) ? data : [];
    branches.value = [{ _id: 'main', name: 'Main Branch', location: 'Headquarters' }, ...fetched];
  } catch (e) {
    console.warn('Failed to fetch branches', e);
    branches.value = [{ _id: 'main', name: 'Main Branch', location: 'Headquarters' }];
  }
};

// Create new branch
const createBranch = async () => {
  if (!newBranch.value.name || !newBranch.value.location) {
    alert('Branch name and location are required');
    return;
  }
  try {
    loading.value = true;
    const url = `${API_BASE_URL}/subaccounts/branches`;
    // Build payload, only include non-empty optional fields
    const payload = {
      name: newBranch.value.name,
      location: newBranch.value.location,
      tenant_id: getTenantId()
    };
    if (newBranch.value.phone) payload.phone = newBranch.value.phone;
    if (newBranch.value.email) payload.email = newBranch.value.email;
    
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Create branch failed');
    await fetchBranches();
    closeBranchModal();
    alert('Branch created successfully!');
  } catch (e) {
    console.error('Failed to create branch', e);
    alert('Failed to create branch.');
  } finally {
    loading.value = false;
  }
};

const closeBranchModal = () => {
  showBranchModal.value = false;
  newBranch.value = { name: '', location: '', phone: '', email: '' };
};

const toggleBranchStatus = async (branch) => {
  try {
    loading.value = true;
    const newStatus = branch.status === 'active' ? 'inactive' : 'active';
    const url = `${API_BASE_URL}/subaccounts/branches/${branch._id}?tenant_id=${getTenantId()}`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    if (!res.ok) throw new Error('Toggle failed');
    await fetchBranches();
  } catch (e) {
    console.error('Failed to toggle branch status', e);
    alert('Failed to update status');
  } finally {
    loading.value = false;
  }
};

const handleEditBranch = (branch) => {
  editBranchData.value = {
    _id: branch._id,
    name: branch.name,
    location: branch.location,
    phone: branch.phone || '',
    email: branch.email || ''
  };
  showEditBranchModal.value = true;
};

const closeEditBranchModal = () => {
  showEditBranchModal.value = false;
  editBranchData.value = { _id: '', name: '', location: '', phone: '', email: '' };
};

const updateBranch = async () => {
  if (!editBranchData.value.name || !editBranchData.value.location) {
    alert('Name and location are required');
    return;
  }
  try {
    loading.value = true;
    const url = `${API_BASE_URL}/subaccounts/branches/${editBranchData.value._id}?tenant_id=${getTenantId()}`;
    const payload = {
      name: editBranchData.value.name,
      location: editBranchData.value.location,
      phone: editBranchData.value.phone || null,
      email: editBranchData.value.email || null
    };
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Update branch failed');
    await fetchBranches();
    closeEditBranchModal();
    alert('Branch updated successfully!');
  } catch (e) {
    console.error('Failed to update branch', e);
    alert('Failed to update branch: ' + e.message);
  } finally {
    loading.value = false;
  }
};

const handleDeleteBranch = (branch) => {
  openDeleteBranchModal(branch);
};

const confirmDeleteBranch = async () => {
  const branch = branchPendingDelete.value;
  if (!branch) return;

  if (branchDeleteConfirmation.value.trim().toUpperCase() !== 'DELETE') {
    branchDeleteError.value = 'Type DELETE exactly to confirm this irreversible action.';
    return;
  }

  try {
    branchDeleteLoading.value = true;
    const token = localStorage.getItem('token');
    const url = `${API_BASE_URL}/subaccounts/branches/${branch._id}?tenant_id=${getTenantId()}`;
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Delete failed');
    }

    await fetchBranches();
    await fetchSubAccounts();
    closeDeleteBranchModal();
    alert(`Branch "${branch.name}" was deleted successfully.`);
  } catch (e) {
    console.error('Branch deletion failed', e);
    branchDeleteError.value = `Failed to delete branch: ${e.message}`;
  } finally {
    branchDeleteLoading.value = false;
  }
};

// Get branch name by ID
const getBranchName = (branchId) => {
  if (!branchId || branchId === null) {
    return 'Master Account';
  }
  const branch = branches.value.find(b => b._id === branchId || b.id === branchId);
  return branch?.name || 'No Branch';
};

// Get role name by ID
const getRoleName = (roleId) => {
  const role = roles.value.find(r => r.id === roleId);
  return role?.name || roleId;
};

const fetchSubAccounts = async () => {
  loading.value = true;
  error.value = '';
  try {
    const url = `${API_BASE_URL}/subaccounts/?tenant_id=${getTenantId()}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch sub-accounts');
    const data = await res.json();
    // Expect array of { id, name, email, role, branch_id, usersCount, sales, users: [] }
    subAccounts.value = Array.isArray(data) ? data : (data.subaccounts || []);
  } catch (e) {
    console.warn('subaccounts API failed, falling back to empty list', e);
    subAccounts.value = subAccounts.value.length ? subAccounts.value : [];
    error.value = 'Failed to load sub-accounts (showing cached)';
  } finally {
    loading.value = false;
  }
};

const createSubAccount = async () => {
  if (!newAccount.value.name || !newAccount.value.email || !newAccount.value.password) {
    alert('Name, email, and password are required');
    return;
  }

  try {
    loading.value = true;
    const url = `${API_BASE_URL}/subaccounts/`;
    const token = localStorage.getItem('token');
    const res = await fetch(url, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ ...newAccount.value, tenant_id: getTenantId() })
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.detail || 'Create failed');
    }
    await fetchSubAccounts();
    closeCreateModal();
    alert('Sub-account created successfully!');
  } catch (e) {
    console.error('Failed to create sub-account', e);
    alert('Failed to create sub-account: ' + e.message);
  } finally {
    loading.value = false;
  }
};

const updateRole = async (acc) => {
  try {
    const url = `${API_BASE_URL}/subaccounts/${acc.id}?tenant_id=${getTenantId()}`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: acc.role })
    });
    if (!res.ok) throw new Error('Update role failed');
    // optimistic UI already updated
  } catch (e) {
    console.error('Update role failed', e);
    alert('Failed to update role');
    await fetchSubAccounts();
  }
};

const deleteSubAccount = async (acc) => {
  if (!confirm(`Delete sub-account ${acc.name}?`)) return;
  try {
    const url = `${API_BASE_URL}/subaccounts/${acc.id}?tenant_id=${getTenantId()}`;
    const res = await fetch(url, { method: 'DELETE' });
    if (!res.ok) throw new Error('Delete failed');
    await fetchSubAccounts();
  } catch (e) {
    console.error('Delete failed', e);
    alert('Failed to delete sub-account');
  }
};

const confirmDelete = (acc) => deleteSubAccount(acc);

const openManageUsers = (acc) => {
  manageTarget.value = acc;
  showManageUsersModal.value = true;
};

const closeCreateModal = () => {
  showCreateModal.value = false;
  newAccount.value = { name: '', email: '', password: '', confirmPassword: '', role: 'attendant', branch_id: null, pin: '' };
};

const closeManageUsersModal = () => {
  showManageUsersModal.value = false;
  manageTarget.value = null;
  newUserEmail.value = '';
};

const openDeleteBranchModal = (branch) => {
  branchPendingDelete.value = branch;
  branchDeleteConfirmation.value = '';
  branchDeleteError.value = '';
  branchDeleteLoading.value = false;
  showDeleteBranchModal.value = true;
};

const closeDeleteBranchModal = () => {
  showDeleteBranchModal.value = false;
  branchPendingDelete.value = null;
  branchDeleteConfirmation.value = '';
  branchDeleteError.value = '';
  branchDeleteLoading.value = false;
};

const isValidEmailAddress = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((value || '').trim());

const addUser = async (acc) => {
  const email = newUserEmail.value?.trim();
  if (!email) return alert('Enter the email address for the user you want to add.');
  if (!isValidEmailAddress(email)) return alert('Enter a valid email address, like name@example.com.');
  try {
    const url = `${API_BASE_URL}/subaccounts/${acc.id}/users`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, tenant_id: getTenantId() })
    });
    if (!res.ok) throw new Error('Add user failed');
    await fetchSubAccounts();
    newUserEmail.value = '';
  } catch (e) {
    console.error('Add user failed', e);
    alert('We could not add that user. Check the email address and try again.');
  }
};

const removeUser = async (acc, user) => {
  if (!confirm(`Remove user ${user.email}?`)) return;
  try {
    const url = `${API_BASE_URL}/subaccounts/${acc.id}/users/${user.id}?tenant_id=${getTenantId()}`;
    const res = await fetch(url, { method: 'DELETE' });
    if (!res.ok) throw new Error('Remove user failed');
    await fetchSubAccounts();
  } catch (e) {
    console.error('Remove user failed', e);
    alert('Failed to remove user');
  }
};

// Derived data
const filtered = computed(() => {
  let items = (subAccounts.value || []).slice();
  if (search.value) {
    const s = search.value.toLowerCase();
    items = items.filter(a => (a.name || '').toLowerCase().includes(s) || (a.email || '').toLowerCase().includes(s));
  }
  if (filterRole.value) items = items.filter(a => a.role === filterRole.value);
  if (filterBranch.value) items = items.filter(a => a.branch_id === filterBranch.value);
  return items;
});

const totalSubAccounts = computed(() => subAccounts.value.length);
const totalBranches = computed(() => branches.value.length);
const totalUsers = computed(() => subAccounts.value.reduce((sum, a) => sum + (a.usersCount || (a.users ? a.users.length : 0) || 0), 0));
const totalSales = computed(() => subAccounts.value.reduce((sum, a) => sum + (Number(a.sales) || 0), 0));

const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)));
const paged = computed(() => filtered.value.slice((page.value - 1) * pageSize, page.value * pageSize));

const prevPage = () => { if (page.value > 1) page.value--; };
const nextPage = () => { if (page.value < totalPages.value) page.value++; };

const applySearch = () => { page.value = 1; };
const refresh = () => fetchSubAccounts();



// Sub-account session management functions
const loadSessions = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const sessions = JSON.parse(stored);
      subAccountSessions.value = new Map(Object.entries(sessions));
    }
  } catch (e) {
    console.error('Failed to load sub-account sessions:', e);
    subAccountSessions.value = new Map();
  }
};

const saveSessions = () => {
  try {
    const sessionsObj = Object.fromEntries(subAccountSessions.value);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionsObj));
  } catch (e) {
    console.error('Failed to save sub-account sessions:', e);
  }
};

const loginToSubAccount = async (subAccount) => {
  try {
    // Store the original tenant owner's token before switching
    const originalToken = localStorage.getItem('token');
    const originalRole = localStorage.getItem('role');
    const originalEmail = localStorage.getItem('email');
    const originalUserId = localStorage.getItem('user_id');
    
    if (!localStorage.getItem('original_tenant_token')) {
      // First time logging into a sub-account, save original credentials
      localStorage.setItem('original_tenant_token', originalToken);
      localStorage.setItem('original_tenant_role', originalRole);
      localStorage.setItem('original_tenant_email', originalEmail);
      localStorage.setItem('original_tenant_user_id', originalUserId);
    }

    // Call backend impersonate endpoint to get sub-account JWT token
    const url = `${API_BASE_URL}/subaccounts/${subAccount.id}/impersonate?tenant_id=${getTenantId()}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${originalToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ detail: 'Failed to impersonate sub-account' }));
      throw new Error(errorData.detail || 'Failed to impersonate sub-account');
    }

    const data = await res.json();
    
    // Update localStorage with sub-account JWT token and credentials
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('role', data.role);
    localStorage.setItem('email', data.subaccount_email);
    localStorage.setItem('user_id', data.subaccount_id);
    localStorage.setItem('active_subaccount_id', subAccount.id);
    localStorage.setItem('active_subaccount_email', data.subaccount_email);
    localStorage.setItem('active_subaccount_name', data.subaccount_name);
    
    const sessionInfo = {
      subAccountId: subAccount.id,
      subAccountName: data.subaccount_name,
      subAccountEmail: data.subaccount_email,
      role: data.role,
      loginTime: new Date().toLocaleString(),
      timestamp: Date.now()
    };
    
    subAccountSessions.value.set(subAccount.id, sessionInfo);
    saveSessions();
    
    // Emit event to refresh CRM data with new sub-account context
    window.dispatchEvent(new CustomEvent('subaccount-context-changed', { 
      detail: { 
        type: 'login',
        subAccountEmail: data.subaccount_email,
        subAccountId: subAccount.id,
        subAccountName: data.subaccount_name
      } 
    }));
    
    // Show success notification
    alert(`Successfully logged into ${data.subaccount_name}!\n\nCRM data will now show ${data.subaccount_name}'s isolated data.`);
    
  } catch (error) {
    console.error('Login to sub-account failed:', error);
    alert(`Failed to login to sub-account: ${error.message || 'Please try again.'}`);
  }
};

const logoutFromSubAccount = async (subAccountId) => {
  try {
    const session = subAccountSessions.value.get(subAccountId);
    if (!session) return;

    // Restore original tenant owner's credentials
    const originalToken = localStorage.getItem('original_tenant_token');
    const originalRole = localStorage.getItem('original_tenant_role');
    const originalEmail = localStorage.getItem('original_tenant_email');
    const originalUserId = localStorage.getItem('original_tenant_user_id');
    
    if (originalToken) {
      localStorage.setItem('token', originalToken);
      localStorage.setItem('role', originalRole);
      localStorage.setItem('email', originalEmail);
      localStorage.setItem('user_id', originalUserId);
      
      // Clean up original credentials if no more active sessions
      if (subAccountSessions.value.size <= 1) {
        localStorage.removeItem('original_tenant_token');
        localStorage.removeItem('original_tenant_role');
        localStorage.removeItem('original_tenant_email');
        localStorage.removeItem('original_tenant_user_id');
      }
    }
    
    // Clear sub-account context
    localStorage.removeItem('active_subaccount_id');
    localStorage.removeItem('active_subaccount_email');
    localStorage.removeItem('active_subaccount_role');

    subAccountSessions.value.delete(subAccountId);
    saveSessions();
    
    // Emit event to refresh CRM data with tenant owner context
    window.dispatchEvent(new CustomEvent('subaccount-context-changed', { 
      detail: { 
        type: 'logout',
        restoredToTenant: true 
      }
    }));
    
    alert(`Logged out of ${session.subAccountName} successfully.`);
    window.location.reload(); 
    
  } catch (error) {
    console.error('Logout from sub-account failed:', error);
    alert('Failed to logout from sub-account.');
  }
};

const isLoggedInToSubAccount = (subAccountId) => {
  return subAccountSessions.value.has(subAccountId);
};

const getSessionInfo = (subAccountId) => {
  return subAccountSessions.value.get(subAccountId);
};

const logoutFromAllSubAccounts = () => {
    subAccountSessions.value.clear();
    saveSessions();
    // restore logic if needed...
    if (localStorage.getItem('original_tenant_token')) {
        const originalToken = localStorage.getItem('original_tenant_token');
        const originalRole = localStorage.getItem('original_tenant_role');
        const originalEmail = localStorage.getItem('original_tenant_email');
        const originalUserId = localStorage.getItem('original_tenant_user_id');

        localStorage.setItem('token', originalToken);
        localStorage.setItem('role', originalRole);
        localStorage.setItem('email', originalEmail);
        localStorage.setItem('user_id', originalUserId);

        localStorage.removeItem('original_tenant_token');
        localStorage.removeItem('original_tenant_role');
        localStorage.removeItem('original_tenant_email');
        localStorage.removeItem('original_tenant_user_id');
        localStorage.removeItem('active_subaccount_id');
        localStorage.removeItem('active_subaccount_email');
        localStorage.removeItem('active_subaccount_name');
        
        window.location.reload();
    }
};

// --- Subaccount Details & Modules Logic ---
const showDetailsModal = ref(false);
const selectedSubAccount = ref(null);
const detailsTab = ref('profile'); 
const availableModules = ref([]);
const assignedModules = ref([]); 
const editProfile = ref({ name: '', email: '', role: '', password: '', confirmPassword: '', pin: '' });
const modulesLoading = ref(false);
const roleFilter = ref(''); // New state for filter

// Computed modules based on filter
const filteredModules = computed(() => {
   const modules = availableModules.value || [];
   if (!roleFilter.value) return modules;
   
   const roleDef = DEFAULT_ROLES.find(r => (r.id || r) === roleFilter.value);
   if (!roleDef || !roleDef.permissions) return modules;
   
   return modules.filter(mod => {
      if (!mod || !mod.id) return false;
      const perms = roleDef.permissions[mod.id];
      // Show module if the role has any permission for it
      return Array.isArray(perms) && perms.length > 0;
   });
});

const openDetailsModal = async (acc) => {
  if (!acc) return;
  
  selectedSubAccount.value = acc;
  // Refresh tenant roles so the Assign Role dropdown reflects the latest list
  // (custom roles created in Settings, plus removals of admin/super_admin).
  try { await fetchRoles(); } catch (e) { console.warn('[openDetailsModal] fetchRoles failed', e); }
  editProfile.value = { 
    name: acc.name || '', 
    email: acc.email || '', 
    role: acc.role || 'attendant',
    branch_id: acc.branch_id || null,
    password: '', 
    confirmPassword: '',
    pin: acc.pin || '' 
  };
  detailsTab.value = 'profile';
  roleFilter.value = ''; // Reset filter
  
  // Reset modules state before fetching
  assignedModules.value = [];
  
  showDetailsModal.value = true;
  
  try {
    // Prefetch modules
    await Promise.all([
      fetchAvailableModules(),
      fetchAssignedModules(acc.email)
    ]);
  } catch (err) {
    console.error('Error opening details modal:', err);
  }
};

// ... (rest of the file)

const closeDetailsModal = () => {
  showDetailsModal.value = false;
  selectedSubAccount.value = null;
  assignedModules.value = [];
};

const fetchAvailableModules = async () => {
  try {
     const url = `${API_BASE_URL}/modules-manager/available`;
     const res = await fetch(url);
     if (res.ok) {
        const data = await res.json();
        availableModules.value = Array.isArray(data.modules) ? data.modules : [];
     }
  } catch(e) {
     console.error('Failed to fetch available modules', e);
  }
};

const fetchAssignedModules = async (email) => {
  if (!email) return;
  modulesLoading.value = true;
  try {
     const url = `${API_BASE_URL}/modules-manager/attendant/modules?attendant_email=${email}&tenant_id=${getTenantId()}`;
     const res = await fetch(url);
     if (res.ok) {
        const data = await res.json();
        assignedModules.value = Array.isArray(data.modules) ? data.modules : [];
     } else {
        // 404 or other non-ok status is a valid state (no modules assigned)
        assignedModules.value = [];
     }
  } catch(e) {
     console.warn('Failed to fetch assigned modules', e);
     assignedModules.value = [];
  } finally {
     modulesLoading.value = false;
  }
};

const saveProfile = async () => {
    if (editProfile.value.password && editProfile.value.password !== editProfile.value.confirmPassword) {
       alert('Passwords do not match');
       return;
    }
    
    try {
       loading.value = true;
       const url = `${API_BASE_URL}/subaccounts/${selectedSubAccount.value.id}?tenant_id=${getTenantId()}`;
       const payload = {
          name: editProfile.value.name,
          role: editProfile.value.role,
          branch_id: editProfile.value.branch_id
       };
       if (editProfile.value.password) {
          payload.password = editProfile.value.password;
       }
       
       const res = await fetch(url, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(payload)
       });
       
       if (!res.ok) throw new Error('Update failed');
       
       alert('Profile updated successfully');
       await fetchSubAccounts(); // Refresh list
    } catch(e) {
       console.error('Update profile failed', e);
       alert('Failed to update profile');
    } finally {
       loading.value = false;
    }
};

// Module saving and toggling functions removed to enforce role-based access only.

const savingModules = ref(false);
const togglingModuleId = ref(null);

async function toggleModuleAssignment(moduleId) {
  if (!selectedSubAccount.value?.email || savingModules.value) return;
  
  savingModules.value = true;
  togglingModuleId.value = moduleId;
  
  try {
    const currentModules = [...assignedModules.value];
    let newModules;
    
    if (currentModules.includes(moduleId)) {
      newModules = currentModules.filter(id => id !== moduleId);
    } else {
      newModules = [...currentModules, moduleId];
    }
    
    const tenantId = getTenantId();
    const res = await fetch(`${API_BASE_URL}/modules-manager/attendant/modules/assign?tenant_id=${tenantId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        attendant_email: selectedSubAccount.value.email,
        modules: newModules
      })
    });
    
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Failed to update modules');
    }
    
    const data = await res.json();
    assignedModules.value = Array.isArray(data.modules) ? data.modules : newModules;
  } catch (e) {
    console.error('Failed to toggle module:', e);
    alert(e.message || 'Failed to update module access');
  } finally {
    savingModules.value = false;
    togglingModuleId.value = null;
  }
}

// Computed properties for active sessions
const activeSessions = computed(() => {
  return Array.from(subAccountSessions.value.values()).sort((a, b) => b.timestamp - a.timestamp);
});

// Auto-cleanup expired sessions (optional - sessions expire after 24 hours)
const cleanupExpiredSessions = () => {
  const now = Date.now();
  const maxAge = 24 * 60 * 60 * 1000; // 24 hours
  
  let hasExpired = false;
  for (const [subAccountId, session] of subAccountSessions.value.entries()) {
    if (now - session.timestamp > maxAge) {
      subAccountSessions.value.delete(subAccountId);
      hasExpired = true;
    }
  }
  
  if (hasExpired) {
    saveSessions();
  }
};

onMounted(async () => {
  loadSessions();
  await fetchTenantProfile();
  await fetchBranches();
  await fetchSubAccounts();
  await initializeRBAC();
  cleanupExpiredSessions();
  
  // Set up periodic cleanup
  setInterval(cleanupExpiredSessions, 60 * 60 * 1000); // Check every hour
});
</script>

<style scoped lang="postcss">
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&family=Inter:wght@400;500;700&display=swap');

.font-outfit {
  font-family: 'Outfit', sans-serif;
}

/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  @apply bg-gray-50;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-gray-200 rounded-full;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-300;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out forwards;
}

/* ═══ ABSA SubAccounts Page Styles ═══ */
.absa-subaccounts-page {
  padding: 0;
}

.absa-subaccounts__breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.7rem;
  font-weight: 600;
  color: #9CA3AF;
  margin-bottom: 14px;
  font-family: 'Space Mono', monospace;
}

.absa-subaccounts__breadcrumb-current {
  color: #BE0F2C;
}

.absa-subaccounts__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
}

.absa-subaccounts__title {
  font-size: 1.5rem;
  font-weight: 900;
  color: #111827;
  margin: 0;
  letter-spacing: -0.02em;
}

.absa-subaccounts__btns {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.absa-subaccounts__btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 150ms ease;
  border: 1px solid #E8E8EC;
  background: #FFFFFF;
  color: #4B5563;
  font-family: 'Montserrat', system-ui, sans-serif;
}

.absa-subaccounts__btn:hover {
  border-color: #BE0F2C;
  color: #BE0F2C;
}

.absa-subaccounts__btn--primary {
  background: linear-gradient(135deg, #BE0F2C, #8B0015);
  color: #FFFFFF;
  border-color: transparent;
  box-shadow: 0 4px 14px rgba(190, 15, 44, 0.25);
}

.absa-subaccounts__btn--primary:hover {
  opacity: 0.9;
  color: #FFFFFF;
}

.absa-subaccounts__btn--outline {
  background: #FFFFFF;
}

/* ═══ KPI Cards ═══ */
.absa-subaccounts__kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.absa-subaccounts__kpi-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
}

.absa-subaccounts__kpi-badge {
  font-family: 'Space Mono', monospace;
  font-size: 0.55rem;
  font-weight: 800;
  color: #9CA3AF;
  letter-spacing: 0.08em;
  background: #F3F4F6;
  padding: 2px 8px;
  border-radius: 4px;
}

.absa-subaccounts__kpi-body {
  display: flex;
  flex-direction: column;
}

.absa-subaccounts__kpi-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.absa-subaccounts__kpi-icon--maroon { background: #FDE8EC; color: #BE0F2C; }
.absa-subaccounts__kpi-icon--green  { background: #DCFCE7; color: #16A34A; }
.absa-subaccounts__kpi-icon--amber  { background: #FEF3C7; color: #F59E0B; }
.absa-subaccounts__kpi-icon--blue   { background: #DBEAFE; color: #2563EB; }

.absa-subaccounts__kpi-value {
  font-size: 1.75rem;
  font-weight: 900;
  color: #111827;
  letter-spacing: -0.02em;
  margin: 0 0 4px 0;
}

.absa-subaccounts__kpi-value--sm {
  font-size: 1.25rem;
}

.absa-subaccounts__kpi-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.6rem;
  font-weight: 700;
  color: #9CA3AF;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.absa-subaccounts__kpi-label--green { color: #16A34A; }
.absa-subaccounts__kpi-label--amber { color: #F59E0B; }
.absa-subaccounts__kpi-label--blue  { color: #2563EB; }

/* ═══ Toolbar ═══ */
.absa-subaccounts__toolbar {
  background: #FFFFFF;
  border: 1px solid #E8E8EC;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.absa-subaccounts__search-wrap {
  position: relative;
  flex: 1;
  max-width: 320px;
  min-width: 200px;
}

.absa-subaccounts__search-wrap input {
  width: 100%;
  padding: 9px 14px 9px 36px;
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 0.7rem;
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  color: #111827;
  outline: none;
  transition: all 150ms ease;
}

.absa-subaccounts__search-wrap input:focus {
  border-color: #BE0F2C;
  box-shadow: 0 0 0 3px rgba(190, 15, 44, 0.12);
  background: #FFFFFF;
}

.absa-subaccounts__search-wrap input::placeholder {
  color: #9CA3AF;
}

.absa-subaccounts__search-wrap svg,
.absa-subaccounts__search-wrap i {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #9CA3AF;
  font-size: 0.7rem;
  pointer-events: none;
}

/* Toolbar selects */
.absa-subaccounts__select {
  appearance: none;
  padding: 8px 32px 8px 12px;
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 0.675rem;
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  text-transform: uppercase;
  color: #4B5563;
  outline: none;
  cursor: pointer;
  transition: all 150ms ease;
  min-width: 140px;
}

.absa-subaccounts__select:focus {
  border-color: #BE0F2C;
  box-shadow: 0 0 0 3px rgba(190, 15, 44, 0.12);
}

.absa-subaccounts__select-wrap {
  position: relative;
}

.absa-subaccounts__select-wrap svg {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #9CA3AF;
  pointer-events: none;
}

/* View toggle */
.absa-subaccounts__view-toggle {
  display: flex;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  overflow: hidden;
  background: #F9FAFB;
}

.absa-subaccounts__view-btn {
  padding: 8px 12px;
  font-size: 0.675rem;
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  border: none;
  background: transparent;
  color: #9CA3AF;
  transition: all 150ms ease;
  display: flex;
  align-items: center;
  gap: 4px;
}

.absa-subaccounts__view-btn--active {
  background: linear-gradient(135deg, #BE0F2C, #8B0015);
  color: #FFFFFF;
}

.absa-subaccounts__view-btn:not(.absa-subaccounts__view-btn--active):hover {
  background: #FFFFFF;
  color: #BE0F2C;
}

.absa-subaccounts__view-btn + .absa-subaccounts__view-btn {
  border-left: 1px solid #E5E7EB;
}

/* Reload button */
.absa-subaccounts__reload-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  background: #FFFFFF;
  color: #6B7280;
  font-size: 0.675rem;
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 150ms ease;
}

.absa-subaccounts__reload-btn:hover {
  border-color: #BE0F2C;
  color: #BE0F2C;
}

/* ═══ Sessions ═══ */
.absa-subaccounts__sessions {
  margin-bottom: 24px;
  padding: 20px;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

.absa-subaccounts__sessions-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.absa-subaccounts__sessions-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  font-weight: 800;
  color: #2563EB;
}

.absa-subaccounts__sessions-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #2563EB;
  animation: absaPulse 2s ease-in-out infinite;
}

@keyframes absaPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.absa-subaccounts__sessions-logout-all {
  font-family: 'Space Mono', monospace;
  font-size: 0.625rem;
  font-weight: 800;
  color: #DC2626;
  text-transform: uppercase;
  background: none;
  border: none;
  cursor: pointer;
  letter-spacing: 0.04em;
}

.absa-subaccounts__sessions-logout-all:hover {
  text-decoration: underline;
}

.absa-subaccounts__sessions-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.absa-subaccounts__session-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: #FFFFFF;
  border: 1px solid #E8E8EC;
  border-radius: 8px;
  transition: all 150ms ease;
}

.absa-subaccounts__session-card:hover {
  border-color: #BE0F2C;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.absa-subaccounts__session-avatar {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #FDE8EC;
  color: #BE0F2C;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 0.75rem;
  flex-shrink: 0;
}

.absa-subaccounts__session-info {
  min-width: 0;
}

.absa-subaccounts__session-name {
  font-size: 0.75rem;
  font-weight: 700;
  color: #111827;
  text-transform: uppercase;
}

.absa-subaccounts__session-time {
  font-family: 'Space Mono', monospace;
  font-size: 0.575rem;
  font-weight: 700;
  color: #9CA3AF;
  margin-top: 2px;
}

.absa-subaccounts__session-close {
  color: #D1D5DB;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 150ms ease;
  margin-left: auto;
}

.absa-subaccounts__session-close:hover {
  color: #DC2626;
  background: #FEE2E2;
}

/* ═══ Content Area ═══ */
.absa-subaccounts__content {
  margin-bottom: 24px;
}

/* ═══ Loading ═══ */
.absa-subaccounts__loading-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.absa-subaccounts__loading-card {
  height: 220px;
  border-radius: 12px;
  background: linear-gradient(90deg, #F3F4F6 0%, #E5E7EB 40%, #F3F4F6 80%);
  background-size: 200% 100%;
  animation: absaShimmer 1.8s ease-in-out infinite;
}

/* ═══ Empty State ═══ */
.absa-subaccounts__empty {
  grid-column: 1 / -1;
  text-align: center;
  padding: 48px 24px;
  border: 2px dashed #E8E8EC;
  border-radius: 12px;
  background-color: #FBFBFB;
}

.absa-subaccounts__empty-icon {
  font-size: 2.5rem;
  color: #D1D5DB;
  margin-bottom: 12px;
}

.absa-subaccounts__empty-text {
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  font-weight: 800;
  color: #9CA3AF;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

/* ═══ Pagination ═══ */
.absa-subaccounts__pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  flex-wrap: wrap;
  gap: 12px;
}

.absa-subaccounts__pagination-info {
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  font-weight: 700;
  color: #9CA3AF;
  letter-spacing: 0.06em;
}

.absa-subaccounts__pagination-controls {
  display: flex;
  gap: 4px;
}

.absa-subaccounts__page-btn {
  min-width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #E8E8EC;
  border-radius: 6px;
  background: #FFFFFF;
  color: #4B5563;
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 150ms ease;
}

.absa-subaccounts__page-btn:hover:not(:disabled) {
  border-color: #BE0F2C;
  color: #BE0F2C;
}

.absa-subaccounts__page-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.absa-subaccounts__page-btn--current {
  background: linear-gradient(135deg, #BE0F2C, #8B0015);
  color: #FFFFFF;
  border-color: transparent;
}

/* ═══ Card Items ═══ */
.absa-subaccounts__card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.absa-subaccounts__user-card {
  background: #FFFFFF;
  border: 1px solid #E8E8EC;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 150ms ease;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.absa-subaccounts__user-card:hover {
  border-color: #BE0F2C;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  transform: translateY(-2px);
}

.absa-subaccounts__user-card-role {
  position: absolute;
  top: 12px;
  right: 12px;
  font-family: 'Space Mono', monospace;
  font-size: 0.55rem;
  font-weight: 800;
  padding: 3px 10px;
  border-radius: 999px;
  background: #F3F4F6;
  color: #6B7280;
  letter-spacing: 0.06em;
}

.absa-subaccounts__user-card:hover .absa-subaccounts__user-card-role {
  background: #BE0F2C;
  color: #FFFFFF;
}

.absa-subaccounts__user-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.absa-subaccounts__user-card-avatar {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: #FDE8EC;
  color: #BE0F2C;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 1rem;
  flex-shrink: 0;
}

.absa-subaccounts__user-card-name {
  font-size: 0.85rem;
  font-weight: 800;
  color: #111827;
}

.absa-subaccounts__user-card-email {
  font-family: 'Space Mono', monospace;
  font-size: 0.6rem;
  color: #9CA3AF;
  margin-top: 2px;
}

.absa-subaccounts__user-card-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 4px;
  border-top: 1px solid #F3F4F6;
}

.absa-subaccounts__user-card-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.7rem;
}

.absa-subaccounts__user-card-row-label {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  color: #9CA3AF;
  letter-spacing: 0.04em;
}

.absa-subaccounts__user-card-row-value {
  font-weight: 700;
  color: #111827;
}

.absa-subaccounts__user-card-actions {
  display: flex;
  gap: 8px;
  padding-top: 8px;
  border-top: 1px solid #F3F4F6;
}

.absa-subaccounts__user-card-action {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.625rem;
  font-family: 'Space Mono', monospace;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: all 150ms ease;
  border: none;
}

.absa-subaccounts__user-card-action--login {
  background: linear-gradient(135deg, #BE0F2C, #8B0015);
  color: #FFFFFF;
  box-shadow: 0 4px 14px rgba(190, 15, 44, 0.25);
}

.absa-subaccounts__user-card-action--login:hover {
  opacity: 0.9;
}

.absa-subaccounts__user-card-action--logout {
  background: #FEF3C7;
  color: #D97706;
}

.absa-subaccounts__user-card-action--delete {
  width: 36px;
  flex: 0 0 auto;
  background: #FFFFFF;
  border: 1px solid #E8E8EC;
  color: #9CA3AF;
}

.absa-subaccounts__user-card-action--delete:hover {
  color: #DC2626;
  border-color: #DC2626;
  background: #FEE2E2;
}

/* ═══ Table View ═══ */
.absa-subaccounts__table-wrap {
  background: #FFFFFF;
  border: 1px solid #E8E8EC;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

/* ═══ Responsive ═══ */
@media (max-width: 1200px) {
  .absa-subaccounts__kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .absa-subaccounts__kpi-grid {
    grid-template-columns: 1fr;
  }
  .absa-subaccounts__actions {
    flex-direction: column;
    align-items: flex-start;
  }
  .absa-subaccounts__toolbar {
    flex-direction: column;
    align-items: stretch;
  }
  .absa-subaccounts__search-wrap {
    max-width: 100%;
  }
}

@media (max-width: 640px) {
  .absa-subaccounts__card-grid {
    grid-template-columns: 1fr;
  }
}
</style>
