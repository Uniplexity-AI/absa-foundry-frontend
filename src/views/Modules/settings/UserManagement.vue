<template>
  <div class="h-full flex flex-col font-sans relative text-gray-900 bg-transparent overflow-auto">
    <!-- Mesh Background (Fixed to viewport) -->
    
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 shrink-0 relative z-0">
      <div class="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex items-center gap-3 min-w-0">
          <div class="min-w-0">
              <span class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Module // User Management</span>
              <h1 class="text-xl sm:text-2xl font-black text-gray-900 uppercase tracking-tight font-display leading-tight truncate">User Management</h1>
              <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-1">
                Create staff accounts, assign roles &amp; branches, and control module access
              </p>
          </div>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <button @click="showBranchModal = true; newBranch = {branch_code: '', name: '', location: '', phone: '', email: ''}" class="h-9 px-4 border border-gray-200 text-gray-600 text-[10px] font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 bg-white hover:border-absa-passion hover:text-absa-passion cursor-pointer">
            <i class="fas fa-store"></i> Add Branch
          </button>
          <button @click="showBranchModal = true; newBranch = {branch_code: '', name: '', location: '', phone: '', email: ''}" class="h-9 px-4 border border-gray-200 text-gray-600 text-[10px] font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 bg-white hover:border-absa-passion hover:text-absa-passion cursor-pointer">
            <i class="fas fa-cog"></i> Manage Branches
          </button>
          <button @click="showCreateModal = true" class="h-9 px-5 bg-absa-passion text-white text-[10px] font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 hover:bg-[#b3002d] cursor-pointer">
            <i class="fas fa-plus"></i> New User
          </button>
        </div>
      </div>
      
      <!-- Navigation Tabs -->
      <div class="max-w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 border-t border-gray-200">
        <button type="button" @click="activeTab = 'users'" :class="activeTab === 'users' ? 'border-absa-passion text-absa-passion bg-white' : 'border-transparent text-gray-500 hover:text-gray-900 bg-transparent'" class="py-2.5 px-4 text-[10px] font-mono font-bold uppercase tracking-widest border-b-2 transition-colors flex items-center gap-2 cursor-pointer">
          <i class="fas fa-users"></i> Users
          <span class="text-[9px] font-mono px-1.5 py-0.5 bg-gray-100 text-gray-600 font-black">{{ users.length }}</span>
        </button>
        <button type="button" @click="activeTab = 'roles'" :class="activeTab === 'roles' ? 'border-absa-passion text-absa-passion bg-white' : 'border-transparent text-gray-500 hover:text-gray-900 bg-transparent'" class="py-2.5 px-4 text-[10px] font-mono font-bold uppercase tracking-widest border-b-2 transition-colors flex items-center gap-2 cursor-pointer">
          <i class="fas fa-user-shield"></i> Roles & Permissions
          <span class="text-[9px] font-mono px-1.5 py-0.5 bg-red-50 text-absa-passion font-black">{{ roles.length }}</span>
        </button>
        <button type="button" @click="activeTab = 'sessions'" :class="activeTab === 'sessions' ? 'border-absa-passion text-absa-passion bg-white' : 'border-transparent text-gray-500 hover:text-gray-900 bg-transparent'" class="py-2.5 px-4 text-[10px] font-mono font-bold uppercase tracking-widest border-b-2 transition-colors flex items-center gap-2 cursor-pointer">
          <i class="fas fa-user-check"></i> Active Sessions
          <span class="text-[9px] font-mono px-1.5 py-0.5 bg-green-50 text-green-700 border border-green-200 font-black">{{ activeUsersCount || 0 }}</span>
        </button>
      </div>
    </header>

    <div v-show="activeTab === 'users'" class="flex-1 max-w-full mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 relative z-0 space-y-8 pb-20">

            <!-- Metrics Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <!-- Total Users KPI -->
        <div class="bg-white border border-gray-200 shadow-sm p-4 relative group hover:border-absa-passion transition cursor-pointer">
          <div class="flex items-center justify-between mb-3">
            <div class="text-gray-400"><i class="fas fa-users text-[18px]"></i></div>
            <span class="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Users</span>
          </div>
          <h5 class="text-xs font-medium text-gray-500 mb-1">Registered Users</h5>
          <p class="text-2xl font-black tracking-tight text-gray-900">{{ users.length || 0 }}</p>
        </div>

        <!-- Total Branches KPI -->
        <div class="bg-white border border-gray-200 shadow-sm p-4 relative group hover:border-absa-passion transition cursor-pointer">
          <div class="flex items-center justify-between mb-3">
            <div class="text-gray-400"><i class="fas fa-store text-[18px]"></i></div>
            <span class="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Branches</span>
          </div>
          <h5 class="text-xs font-medium text-gray-500 mb-1">Active Branches</h5>
          <p class="text-2xl font-black tracking-tight text-gray-900">{{ activeBranches || 0 }}</p>
        </div>

        <!-- Active Users KPI -->
        <div class="bg-white border border-gray-200 shadow-sm p-4 relative group hover:border-absa-passion transition cursor-pointer">
          <div class="flex items-center justify-between mb-3">
            <div class="text-gray-400"><i class="fas fa-user-check text-[18px]"></i></div>
            <span class="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Active</span>
          </div>
          <h5 class="text-xs font-medium text-gray-500 mb-1">Active Accounts</h5>
          <p class="text-2xl font-black tracking-tight text-gray-900">{{ activeUsersCount || 0 }}</p>
        </div>

        <!-- Filtered KPI -->
        <div class="bg-white border border-gray-200 shadow-sm p-4 relative group hover:border-absa-passion transition cursor-pointer">
          <div class="flex items-center justify-between mb-3">
            <div class="text-gray-400"><i class="fas fa-database text-[18px]"></i></div>
            <span class="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Filtered</span>
          </div>
          <h5 class="text-xs font-medium text-gray-500 mb-1">Filtered Context</h5>
          <p class="text-2xl font-black tracking-tight text-gray-900">{{ filteredUsers.length || 0 }}</p>
        </div>
      </div>

      <!-- Filters & Toolbar -->
      <div class="bg-white p-3 border border-gray-200 flex flex-col md:flex-row gap-3 items-center justify-between relative z-10 transition-colors hover:border-absa-passion">
        <div class="relative flex-1 w-full md:max-w-md">
          <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
          <input v-model="search" placeholder="Search by name or email..." autocomplete="off" data-1p-ignore
                 class="w-full h-9 pl-10 pr-4 bg-gray-50 border border-gray-200 focus:border-absa-passion outline-none transition-colors placeholder-gray-400 text-[11px] font-mono font-bold" />
        </div>
        <div class="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <div class="relative min-w-[140px]">
            <select class="w-full h-9 appearance-none px-3 bg-gray-50 border border-gray-200 text-[10px] font-mono font-bold uppercase tracking-widest outline-none cursor-pointer hover:border-absa-passion focus:border-absa-passion transition-colors">
              <option value="">All Roles</option>
            </select>
            <i class="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[8px]"></i>
          </div>
          <div class="relative min-w-[150px]">
            <select class="w-full h-9 appearance-none px-3 bg-gray-50 border border-gray-200 text-[10px] font-mono font-bold uppercase tracking-widest outline-none cursor-pointer hover:border-absa-passion focus:border-absa-passion transition-colors">
              <option value="">All Departments</option>
            </select>
            <i class="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[8px]"></i>
          </div>
          <div class="relative min-w-[150px]">
            <select class="w-full h-9 appearance-none px-3 bg-gray-50 border border-gray-200 text-[10px] font-mono font-bold uppercase tracking-widest outline-none cursor-pointer hover:border-absa-passion focus:border-absa-passion transition-colors">
              <option value="">All Branches</option>
            </select>
            <i class="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[8px]"></i>
          </div>
          <div class="flex items-center border border-gray-200 overflow-hidden bg-gray-50">
            <button @click="viewMode = 'cards'" :class="viewMode === 'cards' ? 'bg-absa-passion text-white' : 'text-gray-500 hover:text-absa-passion hover:bg-white'" class="h-9 px-3 text-[10px] font-mono font-bold uppercase transition-colors flex items-center gap-1.5 cursor-pointer">
              <i class="fas fa-th"></i>
            </button>
            <button @click="viewMode = 'list'" :class="viewMode === 'list' ? 'bg-absa-passion text-white' : 'text-gray-500 hover:text-absa-passion hover:bg-white'" class="h-9 px-3 text-[10px] font-mono font-bold uppercase transition-colors flex items-center gap-1.5 border-l border-gray-200 cursor-pointer">
              <i class="fas fa-list"></i>
            </button>
          </div>
          <button @click="fetchUsers" class="h-9 px-4 bg-white border border-gray-200 text-gray-500 transition-colors flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest cursor-pointer hover:border-absa-passion hover:text-absa-passion">
            <i class="fas fa-sync-alt"></i>
            <span>Reload</span>
          </button>
        </div>
      </div>

      
      <!-- -- CARD VIEW -- -->
      <div v-if="viewMode === 'cards'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 relative z-10">
        <div v-for="(u, index) in filteredUsers" :key="u.user_id" 
             class="group bg-white border border-gray-200 p-5 transition-colors duration-200 cursor-pointer relative overflow-hidden flex flex-col justify-between h-full min-h-[220px] hover:border-absa-passion">
          
          <div class="absolute top-0 right-0 max-w-[65%] py-1 px-3 text-right leading-[1.15] bg-white border-b border-l border-gray-200 text-[9px] font-black text-gray-500 uppercase tracking-wider group-hover:bg-absa-passion group-hover:text-white group-hover:border-absa-passion transition-colors z-20">
            {{ (u.roles || []).join(', ') || 'USER' }}
          </div>
  
          <div class="relative z-10">
            <div class="flex items-center gap-4 mb-5">
              <div class="h-12 w-12 shrink-0 flex items-center justify-center bg-red-50 text-absa-passion font-mono font-black text-xl group-hover:bg-absa-passion group-hover:text-white transition-colors">
                {{ (u.display_name || u.username || '?').charAt(0).toUpperCase() }}
              </div>
              <div class="min-w-0">
                <h3 class="font-black text-[11px] text-gray-900 group-hover:text-absa-passion transition-colors truncate uppercase tracking-tight">{{ u.display_name || u.username }}</h3>
                <p class="text-[9px] font-bold text-gray-500 truncate mt-0.5">{{ u.email }}</p>
              </div>
            </div>
  
            <div class="space-y-3 pb-4">
              <div class="flex items-center justify-between text-[11px] border-b border-gray-200 pb-2">
                <span class="text-gray-400 uppercase tracking-widest text-[9px] font-bold">Branch</span>
                <span class="text-gray-900 font-bold text-right break-words leading-tight max-w-[60%] uppercase">{{ getBranchName(u.branch_code) }}</span>
              </div>
              <div class="flex items-center justify-between text-[11px] border-b border-gray-200 pb-2">
                <span class="text-gray-400 uppercase tracking-widest text-[9px] font-bold">Dept</span>
                <span class="px-1.5 py-0.5 bg-gray-50 border border-gray-200 text-gray-700 text-[8px] font-bold uppercase truncate max-w-[60%]">
                  {{ u.department || 'N/A' }}
                </span>
              </div>
              <div class="flex items-center justify-between text-[11px]">
                <span class="text-gray-400 uppercase tracking-widest text-[9px] font-bold">Status</span>
                <span :class="u.is_active ? 'text-gray-900' : 'text-gray-400'" class="flex items-center gap-1.5 uppercase font-bold text-[9px] tracking-wider">
                  <span class="w-1.5 h-1.5 rounded-full" :class="u.is_active ? 'bg-absa-passion' : 'bg-gray-300'"></span>
                  {{ u.is_active ? 'Active' : 'Offline' }}
                </span>
              </div>
            </div>
          </div>
  
          <div class="flex items-center gap-2 pt-4 border-t border-gray-200 relative z-10">
             <button @click.stop="toggleUserStatus(u)" class="flex-1 h-9 flex items-center justify-center gap-2 text-white transition-colors text-[10px] font-bold uppercase tracking-widest cursor-pointer" :class="u.is_active ? 'bg-absa-passion hover:bg-[#b3002d] text-white' : 'bg-gray-800 hover:bg-gray-900 text-white'">
               <i class="fas" :class="u.is_active ? 'fa-ban' : 'fa-check'"></i> {{ u.is_active ? 'Disable' : 'Enable' }}
             </button>
             <button @click.stop="openEditUser(u)" class="w-9 h-9 shrink-0 flex items-center justify-center text-gray-400 border border-gray-200 transition-colors cursor-pointer hover:text-absa-passion hover:border-absa-passion" title="Edit user">
                <i class="fas fa-edit text-xs"></i>
             </button>
             <button @click.stop="deleteUser(u)" class="w-9 h-9 shrink-0 flex items-center justify-center text-gray-400 border border-gray-200 transition-colors cursor-pointer hover:text-red-600 hover:border-red-600" title="Delete">
                <i class="fas fa-trash-alt text-xs"></i>
             </button>
          </div>
        </div>
        <!-- Empty state -->
        <div v-if="filteredUsers.length === 0" class="col-span-full text-center py-16 border border-dashed border-gray-200 bg-gray-50">
          <i class="fas fa-users-slash text-gray-300 text-4xl mb-4"></i>
          <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">No users match current filters</p>
        </div>
      </div>

      <div v-else-if="viewMode === 'list'" class="relative z-10 bg-white border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="px-4 py-3 text-[9px] font-black text-gray-500 uppercase tracking-widest">User</th>
                <th class="px-4 py-3 text-[9px] font-black text-gray-500 uppercase tracking-widest">Roles</th>
                  <th class="px-4 py-3 text-[9px] font-black text-gray-500 uppercase tracking-widest">Branch</th>
                <th class="px-4 py-3 text-[9px] font-black text-gray-500 uppercase tracking-widest">Status</th>
                <th class="px-4 py-3 text-[9px] font-black text-gray-500 uppercase tracking-widest">Last Login</th>
                <th class="px-4 py-3 text-[9px] font-black text-gray-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="u in filteredUsers" :key="u.user_id" class="hover:bg-gray-50 transition-colors group">
                <td class="px-4 py-3">
                  <div class="flex items-center gap-3">
                    <div class="h-9 w-9 shrink-0 bg-red-50 flex items-center justify-center font-black text-[11px] text-absa-passion group-hover:bg-absa-passion group-hover:text-white transition-colors">
                      {{ (u.display_name || u.username || '?').charAt(0).toUpperCase() }}
                    </div>
                    <div class="min-w-0 flex flex-col justify-center">
                      <div class="text-[11px] font-black text-gray-900 uppercase">{{ u.display_name || u.username }}</div>
                      <div class="text-[9px] font-bold text-gray-500 mt-0.5 truncate">{{ u.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3">
                  <span class="inline-flex items-center gap-1 px-2 py-1 bg-gray-50 text-gray-600 border border-gray-200 text-[9px] font-black uppercase tracking-widest">{{ (u.roles || []).join(', ') || 'USER' }}</span>
                </td>
                <td class="px-4 py-3">
                  <span :class="u.is_active ? 'text-gray-900 bg-gray-100 border-gray-200' : 'text-gray-500 bg-gray-50 border-gray-200'" class="inline-flex items-center gap-1.5 px-2 py-1 border text-[9px] font-black uppercase tracking-widest">
                    <span class="w-1.5 h-1.5 rounded-full" :class="u.is_active ? 'bg-absa-passion' : 'bg-gray-300'"></span>
                    {{ u.is_active ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td class="px-4 py-3">
                  <div class="text-[10px] font-black text-gray-900 uppercase">{{ formatDate(u.last_login_at) }}</div>
                </td>
                <td class="px-4 py-3 text-right">
                  <div class="flex items-center justify-end gap-1">
                    <button @click="toggleUserStatus(u)" :class="u.is_active ? 'text-gray-800 hover:border-gray-900 hover:text-gray-900' : 'text-gray-400 hover:border-absa-passion hover:text-absa-passion'" class="h-8 w-8 border border-gray-200 transition-colors flex items-center justify-center cursor-pointer" :title="u.is_active ? 'Deactivate' : 'Activate'">
                        <i class="fas text-[11px]" :class="u.is_active ? 'fa-toggle-on' : 'fa-toggle-off'"></i>
                    </button>
                    <button @click="openEditUser(u)" class="h-8 w-8 border border-gray-200 text-gray-400 transition-colors flex items-center justify-center cursor-pointer hover:border-absa-passion hover:text-absa-passion" title="Edit User">
                        <i class="fas fa-edit text-[11px]"></i>
                    </button>
                    <button @click="deleteUser(u)" class="h-8 w-8 border border-gray-200 text-gray-400 transition-colors flex items-center justify-center cursor-pointer hover:border-red-600 hover:text-red-600" title="Delete User">
                        <i class="fas fa-trash-alt text-[11px]"></i>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredUsers.length === 0">
                <td colspan="5" class="px-4 py-16 text-center">
                  <i class="fas fa-users-slash text-gray-300 text-3xl mb-3"></i>
                  <p class="text-[11px] font-black text-gray-500 uppercase tracking-widest">No users found</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <!-- Roles Tab -->
    <div v-show="activeTab === 'roles'" class="flex-1 max-w-full mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 relative z-0 space-y-8 pb-20">
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-8 gap-4">
        <div>
          <div class="flex items-center gap-2">
            <div class="w-1 h-5 bg-absa-passion"></div>
            <h2 class="text-lg font-black text-gray-900 uppercase tracking-tight font-display">ROLES & PERMISSIONS</h2>
          </div>
          <p class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mt-2">MANAGE USER ROLES, MAIN PERMISSIONS, AND GRANULAR MODULE FEATURE ACCESS</p>
        </div>
        <button @click="openRoleDetails({ name: '', description: '', permissions: {} })" class="h-9 px-5 bg-absa-passion text-white text-[10px] font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 hover:bg-[#b3002d] cursor-pointer shrink-0">
          <i class="fas fa-plus"></i> CREATE ROLE
        </button>
      </div>
      
      <!-- Loading -->
      <div v-if="rolesLoading" class="flex items-center justify-center py-16">
        <i class="fas fa-circle-notch fa-spin text-absa-passion text-2xl mr-3"></i>
        <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Loading roles...</span>
      </div>

      <!-- Error -->
      <div v-else-if="rolesError" class="bg-red-50 border border-red-200 p-4 text-[10px] font-mono text-red-700 font-bold uppercase tracking-widest">
        <i class="fas fa-exclamation-triangle mr-2"></i> {{ rolesError }}
      </div>

      <!-- Roles List -->
      <div v-else-if="roles.length > 0" class="flex flex-col space-y-4">
        <div v-for="role in roles" :key="role.id" class="bg-white border border-gray-100 p-6 flex flex-row justify-between items-start hover:border-gray-200 transition-colors">
          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-2">
              <h3 class="text-[13px] font-black text-gray-900 uppercase tracking-wider">{{ role.name }}</h3>
              <span class="px-2 py-0.5 bg-gray-100 text-gray-500 text-[9px] font-mono font-bold uppercase tracking-widest">SYSTEM</span>
              <span v-if="role.name === 'SUPERADMIN' || role.name === 'OWNER'" class="px-2 py-0.5 bg-absa-passion text-white text-[9px] font-mono font-bold uppercase tracking-widest">FULL ACCESS</span>
              <span v-else class="px-2 py-0.5 bg-red-50 text-absa-passion text-[9px] font-mono font-bold uppercase tracking-widest">TEMPLATE</span>
            </div>
            
            <p class="text-xs text-gray-500">{{ role.description || 'No description provided.' }}</p>
            
            <div class="flex items-center gap-2 flex-wrap mt-1">
              <span v-for="page in getAccessiblePages(role).slice(0, 5)" :key="page" class="px-2 py-1 bg-red-50 text-absa-passion text-[8px] font-mono font-bold uppercase tracking-widest">
                {{ page }}
              </span>
              <span v-if="getAccessiblePages(role).length > 5" class="text-[9px] font-mono text-gray-400 font-bold ml-1">
                +{{ getAccessiblePages(role).length - 5 }} more
              </span>
            </div>
          </div>
          
          <div class="flex items-center gap-2 ml-4">
            <button @click.stop="openRoleDetails(role)" class="w-8 h-8 flex items-center justify-center border border-gray-200 text-absa-passion hover:border-absa-passion hover:bg-red-50 transition-colors bg-white">
              <i class="fas fa-edit text-xs"></i>
            </button>
            <button v-if="role.name !== 'SUPERADMIN' && role.name !== 'OWNER'" @click.stop="deleteRole(role)" class="w-8 h-8 flex items-center justify-center border border-gray-200 text-[#ff6b6b] hover:border-[#ff6b6b] hover:bg-red-50 transition-colors bg-white">
              <i class="fas fa-trash-alt text-xs"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else class="flex flex-col items-center justify-center py-16 text-center">
        <i class="fas fa-user-shield text-gray-200 text-5xl mb-4"></i>
        <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">No roles configured in the system</p>
      </div>
    </div>

    
        <!-- Role Details Modal (EDIT ROLE) -->
    <div v-if="selectedRole" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-md" @click.self="closeRoleDetails">
      <div class="bg-white border-t-4 border-absa-passion shadow-2xl w-full max-w-7xl max-h-[95vh] flex flex-col relative overflow-hidden">
        
        <!-- Header -->
        <div class="flex justify-between items-start p-6 border-b border-gray-100 bg-gray-50/50">
          <div>
            <div class="flex items-center gap-2">
              <div class="w-1 h-5 bg-absa-passion"></div>
              <h2 class="text-lg font-black text-gray-900 uppercase tracking-tight font-display">EDIT ROLE</h2>
            </div>
            <p class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mt-2">CONFIGURE MODULE ACCESS AND GRANULAR TOOL TOGGLES</p>
          </div>
          <div class="flex items-center gap-4">
            <span class="px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-mono font-bold uppercase tracking-widest rounded-sm">{{ actualModules.length }} MODULES AVAILABLE</span>
            <button @click="closeRoleDetails" class="text-gray-400 hover:text-absa-passion transition-colors"><i class="fas fa-times text-lg"></i></button>
          </div>
        </div>

                        <!-- Role Basic Info Form -->
        <div class="p-6 border-b border-gray-100 bg-white flex flex-col md:flex-row gap-6 shrink-0">
          <div class="flex-1">
            <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-2">ROLE NAME <span class="text-absa-passion">*</span></label>
            <input type="text" v-model="selectedRole.name" class="w-full bg-gray-50/50 border border-gray-100 p-3 text-xs font-black text-gray-900 focus:bg-white focus:border-absa-passion focus:ring-0 outline-none transition-colors" />
          </div>
          <div class="flex-[2]">
            <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-2">DESCRIPTION</label>
            <input type="text" v-model="selectedRole.description" class="w-full bg-gray-50/50 border border-gray-100 p-3 text-xs font-mono text-gray-700 focus:bg-white focus:border-absa-passion focus:ring-0 outline-none transition-colors" />
          </div>
        </div>

        <!-- Body -->
        <div class="flex-1 overflow-hidden flex flex-col md:flex-row">
          
          <!-- Left Column (Modules & Main Permissions) -->
          <div class="w-full md:w-80 flex flex-col border-r border-gray-100 bg-gray-50/30 shrink-0 h-[60vh] md:h-auto overflow-y-auto">
            
            <!-- Modules Section -->
            <div class="p-5 flex-1">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2 text-absa-passion">
                  <i class="fas fa-th-large text-xs"></i>
                  <span class="text-[10px] font-black uppercase tracking-widest text-gray-900">MODULES</span>
                </div>
                <span class="text-[9px] font-mono font-bold text-absa-passion uppercase tracking-widest">{{ actualModules.length }} ENABLED</span>
              </div>
              
              <div class="flex flex-col space-y-1">
                <button 
                  v-for="mod in actualModules" 
                  :key="mod.id"
                  @click="activeModalModule = mod.id"
                  :class="['w-full flex items-center justify-between p-3 transition-colors group text-left border', activeModalModule === mod.id ? 'bg-red-50 border-absa-passion' : 'bg-white border-gray-100 hover:border-absa-passion']"
                >
                  <div class="flex items-center gap-3">
                    <i :class="[mod.icon, 'text-xs w-4', activeModalModule === mod.id ? 'text-absa-passion' : 'text-gray-400 group-hover:text-absa-passion']"></i>
                    <span :class="['text-[10px] font-black uppercase tracking-wider', activeModalModule === mod.id ? 'text-absa-passion' : 'text-gray-700 group-hover:text-gray-900']">{{ mod.name }}</span>
                  </div>
                  <span :class="['text-[9px] font-mono font-bold px-1.5 py-0.5', activeModalModule === mod.id ? 'text-white bg-absa-passion' : 'text-absa-passion bg-red-50']">{{ mod.features.length }}/{{ mod.features.length }}</span>
                </button>
              </div>
            </div>

            <!-- Main Permissions Grid -->
                <div class="p-5 border-t border-gray-100 bg-white shrink-0">
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-2">
                      <i class="fas fa-shield-alt text-gray-400 text-xs"></i>
                      <span class="text-[10px] font-black uppercase tracking-widest text-gray-900">MAIN PERMISSIONS</span>
                    </div>
                    <button type="button" @click.stop.prevent="deselectAllMain(activeModalModule)" class="text-[9px] font-mono font-bold text-gray-500 hover:text-absa-passion uppercase tracking-widest transition-colors cursor-pointer z-10">DESELECT ALL</button>
                  </div>
                  
                  <div class="grid grid-cols-2 gap-y-3 gap-x-4">
                    <div v-for="perm in ['READ', 'WRITE', 'EDIT', 'DELETE', 'ASSIGN', 'APPROVE', 'EXPORT']" :key="perm" @click.stop.prevent="toggleFeature(activeModalModule, perm.toLowerCase())" class="flex items-center gap-2 cursor-pointer group select-none">
                      <div class="w-4 h-4 rounded-sm flex items-center justify-center shadow-sm border transition-colors" :class="hasFeature(activeModalModule, perm.toLowerCase()) ? 'bg-absa-passion border-absa-passion text-white' : 'bg-white border-gray-300 group-hover:border-absa-passion text-transparent'">
                        <i class="fas fa-check text-[10px]"></i>
                      </div>
                      <span class="text-[10px] font-black text-gray-700 group-hover:text-gray-900 uppercase tracking-wider">{{ perm }}</span>
                    </div>
                  </div>
                </div>
          </div>
          
          <!-- Right Column (Feature Access) -->
          <div class="flex-1 bg-gray-50/50 flex flex-col h-[60vh] md:h-auto overflow-hidden">
            <div class="flex justify-between items-center p-5 border-b border-gray-100 bg-white shrink-0">
              <div class="flex items-center gap-2 text-absa-passion">
                <i class="fas fa-puzzle-piece text-xs"></i>
                <span class="text-[10px] font-black uppercase tracking-widest text-gray-900">FEATURE ACCESS</span>
              </div>
              <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">{{ activeModuleData.name }}</span>
            </div>
            
            <div class="p-6 overflow-y-auto flex-1">
              <div class="bg-white border border-gray-100 p-6 shadow-sm rounded-sm">
                <div class="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                  <i :class="[activeModuleData.icon, 'text-gray-400 text-sm']"></i>
                  <h3 class="text-xs font-black text-gray-900 uppercase tracking-wider">{{ activeModuleData.name }} FEATURE ACCESS</h3>
                </div>
                
                <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  <div v-for="feat in activeModuleData.features" :key="feat.id" @click.stop.prevent="toggleFeature(activeModuleData.id, feat.id)" class="flex items-start gap-3 p-4 border transition-colors cursor-pointer group rounded-sm select-none" :class="hasFeature(activeModuleData.id, feat.id) ? 'border-absa-passion bg-red-50/10' : 'border-gray-100 hover:border-absa-passion'">
  <div class="w-4 h-4 mt-0.5 rounded-sm flex items-center justify-center text-white shadow-sm border shrink-0 transition-colors" :class="hasFeature(activeModuleData.id, feat.id) ? 'bg-absa-passion border-absa-passion' : 'bg-white border-gray-300 group-hover:border-absa-passion'">
    <i v-if="hasFeature(activeModuleData.id, feat.id)" class="fas fa-check text-[10px]"></i>
  </div>

                    <div>
    <div class="flex items-center gap-2">
      <i :class="[feat.icon, 'text-absa-passion text-[10px]']"></i>
      <span class="text-[11px] font-black text-gray-900 uppercase tracking-wider">{{ feat.name }}</span>
    </div>
    <p class="text-[10px] font-mono text-gray-500 mt-1">{{ feat.desc }}</p>
  </div>
</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 shrink-0">
          <button @click="closeRoleDetails" class="px-5 py-2.5 bg-white border border-gray-200 text-gray-600 text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-colors">CANCEL</button>
          <button @click="saveRoleDetails" :disabled="savingRole" class="px-5 py-2.5 bg-absa-passion text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#b3002d] transition-colors shadow-md disabled:opacity-50">
              <span v-if="savingRole">SAVING...</span>
              <span v-else>UPDATE ROLE</span>
            </button>
        </div>
      </div>
    </div>

    <!-- Create User Modal -->
      <div v-if="showCreateModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm" @click.self="showCreateModal = false">
        <div class="bg-white border border-gray-200 shadow-xl w-full max-w-md p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-sm font-black text-gray-900 uppercase tracking-tight">Create User</h2>
            <button @click="showCreateModal = false" class="text-gray-400 hover:text-absa-passion transition-colors"><i class="fas fa-times"></i></button>
          </div>
          <form @submit.prevent="handleCreateUser" class="space-y-4">
            <div>
              <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1">Username</label>
              <input v-model="createForm.username" required class="w-full h-9 px-3 border border-gray-200 text-xs focus:outline-none focus:border-absa-passion transition-colors" />
            </div>
            <div>
              <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1">Email</label>
              <input v-model="createForm.email" type="email" required class="w-full h-9 px-3 border border-gray-200 text-xs focus:outline-none focus:border-absa-passion transition-colors" />
            </div>
            <div>
              <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1">Password</label>
              <input v-model="createForm.password" type="password" required autocomplete="new-password" class="w-full h-9 px-3 border border-gray-200 text-xs focus:outline-none focus:border-absa-passion transition-colors" />
            </div>
            <div>
              <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1">Display Name</label>
              <input v-model="createForm.display_name" class="w-full h-9 px-3 border border-gray-200 text-xs focus:outline-none focus:border-absa-passion transition-colors" />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1">Role</label>
                <select v-model="createForm.role" class="w-full h-9 px-3 border border-gray-200 text-xs focus:outline-none focus:border-absa-passion transition-colors">
                  <option v-for="r in roles" :key="r.id" :value="r.name">{{ r.name }}</option>
                </select>
              </div>
              <div>
                <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1">Branch</label>
                <select v-model="createForm.branch_code" class="w-full h-9 px-3 border border-gray-200 text-xs focus:outline-none focus:border-absa-passion transition-colors">
                  <option value="">MASTER</option>
                  <option v-for="b in branches" :key="b.branch_code" :value="b.branch_code">{{ b.name.toUpperCase() }}</option>
                </select>
              </div>
            </div>
            <div class="pt-4 flex justify-end gap-2">
              <button type="button" @click="showCreateModal = false" class="px-4 py-2 border border-gray-200 text-gray-600 text-[10px] font-bold uppercase transition-colors hover:border-gray-300">Cancel</button>
              <button type="submit" class="px-4 py-2 bg-absa-passion text-white text-[10px] font-bold uppercase transition-colors hover:bg-[#b3002d]">Create</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Enhanced User Profile Modal -->
      <div v-if="showEditModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm" @click.self="showEditModal = false">
        <div class="bg-white shadow-2xl w-full max-w-5xl flex flex-col max-h-[90vh]">
          
          <!-- Header -->
          <div class="p-6 border-b border-gray-100 flex justify-between items-start shrink-0">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-red-50 text-absa-passion rounded flex items-center justify-center text-xl">
                <i class="fas fa-id-badge"></i>
              </div>
              <div>
                <span class="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">SUB_ACCOUNT // PROFILE</span>
                <h2 class="text-xl font-black text-gray-900 uppercase tracking-tight mt-1">{{ editForm.display_name || editForm.username }}</h2>
              </div>
            </div>
            <button @click="showEditModal = false" class="text-gray-400 hover:text-absa-passion transition-colors mt-2">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>

          <!-- Tabs -->
          <div class="flex border-b border-gray-100 px-6 shrink-0">
            <button 
              @click="activeUserTab = 'profile'"
              :class="['px-6 py-4 text-[10px] font-black uppercase tracking-widest transition-colors', activeUserTab === 'profile' ? 'text-absa-passion border-b-2 border-absa-passion' : 'text-gray-500 hover:text-gray-900']"
            >PROFILE</button>
            <button 
              @click="activeUserTab = 'modules'"
              :class="['px-6 py-4 text-[10px] font-black uppercase tracking-widest transition-colors', activeUserTab === 'modules' ? 'text-absa-passion border-b-2 border-absa-passion' : 'text-gray-500 hover:text-gray-900']"
            >MODULES</button>
          </div>

          <!-- Profile Tab Content -->
          <div v-show="activeUserTab === 'profile'" class="p-8 overflow-y-auto flex-1">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              
              <!-- Left Column -->
              <div class="space-y-6">
                <div>
                  <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-2">DISPLAY NAME</label>
                  <input v-model="editForm.display_name" autocomplete="off" data-1p-ignore class="w-full h-11 px-4 bg-gray-50/50 border border-gray-200 text-xs font-bold focus:bg-white focus:border-absa-passion focus:ring-0 outline-none transition-colors" />
                </div>
                <div>
                  <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-2">SYSTEM CREDENTIALS</label>
                  <input v-model="editForm.email" disabled autocomplete="off" data-1p-ignore class="w-full h-11 px-4 bg-gray-50 border border-gray-200 text-xs font-mono text-gray-500 cursor-not-allowed" />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-2">PHONE NUMBER (optional)</label>
                    <input v-model="editForm.phone" placeholder="+260_XXX_XXXXXX" autocomplete="off" data-1p-ignore class="w-full h-11 px-4 bg-gray-50/50 border border-gray-200 text-xs font-mono focus:bg-white focus:border-absa-passion focus:ring-0 outline-none transition-colors" />
                  </div>
                  <div>
                    <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-2">SECONDARY EMAIL (optional)</label>
                    <input v-model="editForm.secondary_email" autocomplete="off" data-1p-ignore class="w-full h-11 px-4 bg-gray-50 border border-gray-200 text-xs font-mono focus:bg-white focus:border-absa-passion focus:ring-0 outline-none transition-colors" />
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-2">DEPARTMENT / ORG UNIT</label>
                    <select v-model="editForm.department" class="w-full h-11 px-4 bg-gray-50/50 border border-gray-200 text-xs font-bold focus:bg-white focus:border-absa-passion focus:ring-0 outline-none transition-colors">
                      <option value="SALES & MARKETING">SALES & MARKETING</option>
                      <option value="FINANCE & ACCOUNTING">FINANCE & ACCOUNTING</option>
                      <option value="OPERATIONS">OPERATIONS</option>
                      <option value="IT & ENGINEERING">IT & ENGINEERING</option>
                      <option value="HUMAN RESOURCES">HUMAN RESOURCES</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-2">APPROVAL AUTHORITY LEVEL</label>
                    <select v-model="editForm.approval_level" class="w-full h-11 px-4 bg-gray-50/50 border border-gray-200 text-xs font-bold focus:bg-white focus:border-absa-passion focus:ring-0 outline-none transition-colors">
                      <option value="LEVEL 0: AUTO-APPROVED">LEVEL 0: AUTO-APPROVED / STANDARD</option>
                      <option value="LEVEL 1: MANAGER">LEVEL 1: MANAGER</option>
                      <option value="LEVEL 2: DIRECTOR">LEVEL 2: DIRECTOR</option>
                    </select>
                  </div>
                </div>
                <p class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-1">USER'S DEPARTMENT AND AUTHORITY LEVEL FOR WORKFLOW ACTIONS AND APPROVALS</p>
              </div>

              <!-- Right Column -->
              <div class="space-y-6">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <div class="flex items-center justify-between mb-2">
                      <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">ASSIGN ROLE</label>
                      <button @click.prevent="fetchRoles" class="text-[8px] font-mono font-bold text-absa-passion uppercase tracking-widest hover:underline"><i class="fas fa-sync-alt mr-1"></i> refresh</button>
                    </div>
                    <select v-model="editForm.role" class="w-full h-11 px-4 bg-gray-50/50 border border-gray-200 text-xs font-bold focus:bg-white focus:border-absa-passion focus:ring-0 outline-none transition-colors">
                      <option v-for="r in roles" :key="r.id" :value="r.name">{{ r.name }}</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-2">ASSIGN BRANCH</label>
                    <select v-model="editForm.branch_code" class="w-full h-11 px-4 bg-gray-50/50 border border-gray-200 text-xs font-bold focus:bg-white focus:border-absa-passion focus:ring-0 outline-none transition-colors">
                      <option value="">MASTER</option>
                      <option v-for="b in branches" :key="b.branch_code" :value="b.branch_code">{{ b.name.toUpperCase() }}</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-2">SECURITY OVERRIDE (PASSWORD)</label>
                  <div class="relative">
                    <input v-model="editForm.password" :type="showPwd ? 'text' : 'password'" placeholder="••••••••" autocomplete="new-password" data-1p-ignore class="w-full h-11 px-4 bg-red-50/30 border border-gray-200 text-xs font-mono focus:bg-white focus:border-absa-passion focus:ring-0 outline-none transition-colors" />
                    <button @click.prevent="showPwd = !showPwd" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><i class="fas fa-eye"></i></button>
                  </div>
                </div>
                <div>
                  <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-2">CONFIRM IDENTITY</label>
                  <div class="relative">
                    <input v-model="editForm.confirm_password" :type="showPwd2 ? 'text' : 'password'" placeholder="••••••••" autocomplete="new-password" data-1p-ignore class="w-full h-11 px-4 bg-gray-50/50 border border-gray-200 text-xs font-mono focus:bg-white focus:border-absa-passion focus:ring-0 outline-none transition-colors" />
                    <button @click.prevent="showPwd2 = !showPwd2" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><i class="fas fa-eye"></i></button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Modules Tab Content -->
          <div v-show="activeUserTab === 'modules'" class="p-8 overflow-y-auto flex-1 bg-gray-50/30">
            <div class="bg-white border border-gray-200 p-4 mb-6 flex items-start gap-4">
              <div class="text-absa-passion text-xl mt-1"><i class="fas fa-shield-alt"></i></div>
              <div>
                <h3 class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">MODULE ACCESS CONTROL</h3>
                <p class="text-[10px] font-mono font-bold text-gray-900 uppercase tracking-widest">CLICK MODULES TO TOGGLE ACCESS FOR {{ editForm.display_name?.toUpperCase() || editForm.username?.toUpperCase() }}. CHANGES ARE SAVED AUTOMATICALLY.</p>
              </div>
            </div>
            
            <div class="flex items-center justify-between mb-4">
              <h4 class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">FEATURE_ACCESS_MATRIX</h4>
              <select class="h-8 px-3 border border-gray-200 text-[9px] font-mono font-bold bg-white focus:outline-none">
                <option>SHOW_ALL_MATRICES</option>
              </select>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <button 
                v-for="mod in actualModules" 
                :key="mod.id"
                @click.prevent="toggleUserModule(mod.id)"
                :class="['h-14 px-4 border flex items-center justify-between text-left transition-colors bg-white', editForm.custom_modules?.includes(mod.id) ? 'border-absa-passion bg-red-50/10 text-absa-passion' : 'border-gray-200 text-gray-500 hover:border-gray-300']"
              >
                <div class="flex items-center gap-2">
                  <i :class="[mod.icon, 'text-xs w-4']"></i>
                  <span class="text-[10px] font-black uppercase tracking-wider">{{ mod.name }}</span>
                </div>
                <i v-if="editForm.custom_modules?.includes(mod.id)" class="fas fa-check text-xs"></i>
                <i v-else class="fas fa-plus text-xs text-gray-300"></i>
              </button>
            </div>
          </div>

          <!-- Footer -->
          <div class="p-4 border-t border-gray-100 bg-white flex justify-end gap-3 shrink-0">
            <button @click.prevent="showEditModal = false" class="px-6 py-3 bg-white text-gray-700 text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-colors">CANCEL</button>
            <button @click.prevent="handleEditUser" :disabled="saving" class="px-8 py-3 bg-absa-passion text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#b3002d] transition-colors shadow-md disabled:opacity-50">
              <span v-if="saving">SAVING...</span>
              <span v-else>SAVE CHANGES</span>
            </button>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { DEFAULT_ROLE_PERMISSIONS } from '@/stores/auth'
import authApi from '@/services/auth_api'

const router = useRouter()
const activeTab = ref('users')
const showRoleModal = ref(false)
const selectedRole = ref(null)
const savingRole = ref(false)
const errorMsg = ref('')
const roleForm = ref({ role_name: '', description: '' })

const activeModalModule = ref('crm')

  const deselectAllMain = (modId) => {
    if (!selectedRole.value || !selectedRole.value.permissions || !selectedRole.value.permissions[modId]) return
    const mainPerms = ['read', 'write', 'edit', 'delete', 'assign', 'approve', 'export']
    selectedRole.value.permissions[modId] = selectedRole.value.permissions[modId].filter(p => !mainPerms.includes(p))
  }

  const toggleFeature = (modId, featId) => {
    console.log('toggleFeature', modId, featId);
    if (!selectedRole.value) return
    if (!selectedRole.value.permissions) selectedRole.value.permissions = {}
    if (!selectedRole.value.permissions[modId]) selectedRole.value.permissions[modId] = []
    
    const arr = selectedRole.value.permissions[modId]
    const idx = arr.indexOf(featId)
    if (idx === -1) {
      arr.push(featId)
    } else {
      arr.splice(idx, 1)
    }
  }
  
  const hasFeature = (modId, featId) => {
    if (!selectedRole.value || !selectedRole.value.permissions) return false
    return (selectedRole.value.permissions[modId] || []).includes(featId)
  }


const actualModules = [
  {
    id: 'crm',
    name: 'CRM & SALES',
    icon: 'fas fa-address-book',
    features: [
      { id: 'workspace', name: 'WORKSPACE', desc: 'Omnichannel workspace & communication', icon: 'fas fa-headset' },
      { id: 'customers', name: 'MY CUSTOMERS', desc: 'Assigned customer list and profiles', icon: 'fas fa-users' },
      { id: 'tickets', name: 'TICKETS & CASES', desc: 'Customer support ticketing', icon: 'fas fa-ticket-alt' },
      { id: 'analytics', name: 'CRM ANALYTICS', desc: 'Sales and performance dashboards', icon: 'fas fa-chart-pie' },
      { id: 'calendar', name: 'CALENDAR & ACTIVITIES', desc: 'Manage meetings and activities', icon: 'fas fa-calendar-alt' }
    ]
  },
  {
    id: 'etl-pipeline',
    name: 'DATA PIPELINE',
    icon: 'fas fa-network-wired',
    features: [
      { id: 'pipeline', name: 'ETL PIPELINE', desc: 'Main data integration pipeline', icon: 'fas fa-project-diagram' },
      { id: 'history', name: 'ETL RUN HISTORY', desc: 'Logs and execution history', icon: 'fas fa-history' },
      { id: 'config', name: 'ETL CONFIG MANAGER', desc: 'Pipeline settings and configurations', icon: 'fas fa-cogs' }
    ]
  },
  {
    id: 'intelligence',
    name: 'INTELLIGENCE & AI',
    icon: 'fas fa-brain',
    features: [
      { id: 'cv', name: 'CUSTOMER VALUE', desc: 'Lifetime value & profitability metrics', icon: 'fas fa-gem' },
      { id: 'lifecycle', name: 'LIFECYCLE PREDICTION', desc: 'Customer journey prediction and churn', icon: 'fas fa-recycle' },
      { id: 'forecast', name: 'BALANCE FORECAST', desc: 'Predictive account balance models', icon: 'fas fa-chart-area' },
      { id: 'outcomes', name: 'BUSINESS OUTCOMES', desc: 'Goal tracking and projections', icon: 'fas fa-bullseye' },
      { id: 'models', name: 'MODEL PERFORMANCE', desc: 'AI model monitoring and drift', icon: 'fas fa-robot' }
    ]
  },
  {
    id: 'operations',
    name: 'OPERATIONS',
    icon: 'fas fa-briefcase',
    features: [
      { id: 'portfolio', name: 'PORTFOLIO OVERVIEW', desc: 'Global portfolio metrics dashboard', icon: 'fas fa-globe' },
      { id: 'branch', name: 'BRANCH MANAGER', desc: 'Branch-level performance dashboard', icon: 'fas fa-store' }
    ]
  },
  {
    id: 'settings',
    name: 'SETTINGS & ADMIN',
    icon: 'fas fa-sliders-h',
    features: [
      { id: 'settings', name: 'PLATFORM SETTINGS', desc: 'System-wide configurations', icon: 'fas fa-cog' },
      { id: 'users', name: 'USER MANAGEMENT', desc: 'Roles, permissions and users', icon: 'fas fa-users-cog' },
      { id: 'subaccounts', name: 'SUB ACCOUNTS', desc: 'Manage sub-entities', icon: 'fas fa-sitemap' }
    ]
  }
]

const activeModuleData = computed(() => {
  return actualModules.find(m => m.id === activeModalModule.value) || actualModules[0]
})


const openRoleDetails = (role) => {
  selectedRole.value = { 
        ...role, 
        permissions: role.permissions ? JSON.parse(JSON.stringify(role.permissions)) : {
          'crm': ['workspace', 'customers', 'tickets', 'analytics', 'calendar'],
          'etl-pipeline': ['pipeline', 'history', 'config'],
          'intelligence': ['cv', 'lifecycle', 'forecast', 'outcomes', 'models'],
          'operations': ['portfolio', 'branch'],
          'settings': ['settings', 'users']
        }
      }
}


  
  const saveRoleDetails = async () => {
    if (!selectedRole.value) return
    savingRole.value = true
    errorMsg.value = ''
    try {
      const roleId = selectedRole.value.id || selectedRole.value.name.toLowerCase().replace(/ /g, '_')
      
      const payload = {
        id: roleId,
        name: selectedRole.value.name,
        description: selectedRole.value.description || '',
        permissions: selectedRole.value.permissions
      }

      // Robust Local Simulation for Save
      let localRoles = JSON.parse(localStorage.getItem('mock_absa_roles') || '[]')
      const existingIdx = localRoles.findIndex(r => r.id === roleId)
      if (existingIdx >= 0) {
        localRoles[existingIdx] = payload
      } else {
        localRoles.push(payload)
      }
      localStorage.setItem('mock_absa_roles', JSON.stringify(localRoles))

      closeRoleDetails()
      await fetchRoles()
    } catch (err) {
      console.error('Failed to save role', err)
      errorMsg.value = err.message || 'Failed to save role'
    } finally {
      savingRole.value = false
    }
  }

  const closeRoleDetails = () => {
  selectedRole.value = null
}

const getAccessiblePages = (role) => {
  const routes = router.getRoutes()
  const pages = new Set()
  const rolePerms = (role.permissions && Object.keys(role.permissions).length > 0) 
    ? role.permissions 
    : (DEFAULT_ROLE_PERMISSIONS[role.name || role] || {})
  
  let hasGranularFeatures = false

  Object.keys(rolePerms).forEach(modId => {
    const mod = actualModules.find(m => m.id === modId)
    if (mod) {
      rolePerms[modId].forEach(featId => {
        const feat = mod.features.find(f => f.id === featId)
        if (feat) {
          pages.add(feat.name)
          hasGranularFeatures = true
        }
      })
    }
  })

  if (!hasGranularFeatures) {
    const roleName = role.name || role
    routes.forEach(route => {
      let hasAccess = false
      if (route.meta && route.meta.requiredPermissions) {
        hasAccess = route.meta.requiredPermissions.every(p => {
          return rolePerms[p.entity] && rolePerms[p.entity].includes(p.action)
        })
      } else if (route.meta && route.meta.requiresRoles) {
        hasAccess = route.meta.requiresRoles.includes(roleName)
      }

      if (hasAccess) {
        if (route.meta.title) {
          pages.add(route.meta.title)
        } else if (route.name) {
          pages.add(route.name)
        }
      }
    })
  }

  return Array.from(pages).sort()
}
const users = ref([])
const roles = ref([])
const search = ref('')

const showCreateModal = ref(false)
const showEditModal = ref(false)
const activeUserTab = ref('profile')
const showPwd = ref(false)
const showPwd2 = ref(false)
const saving = ref(false)

const moduleMatrixList = [
  { id: 'hr_module', name: 'HR MODULE' },
  { id: 'ub_recruiter', name: 'UB RECRUITER' },
  { id: 'payroll', name: 'PAYROLL' },
  { id: 'project_management', name: 'PROJECT MANAGEMENT' },
  { id: 'user_management', name: 'USER MANAGEMENT' },
  { id: 'finance_dashboard', name: 'FINANCE DASHBOARD' },
  { id: 'expenses', name: 'EXPENSES' },
  { id: 'billing', name: 'BILLING' },
  { id: 'taxes_module', name: 'TAXES MODULE' },
  { id: 'budgets', name: 'BUDGETS' },
  { id: 'loans_module', name: 'LOANS MODULE' },
  { id: 'compliance_center', name: 'COMPLIANCE CENTER' },
  { id: 'crm_module', name: 'CRM MODULE' },
  { id: 'pos_operations', name: 'POINT OF SALE (POS) OPERATIONS' },
  { id: 'inventory_management', name: 'INVENTORY MANAGEMENT' },
  { id: 'supplier_management', name: 'SUPPLIER MANAGEMENT' },
  { id: 'delivery_ticket', name: 'DELIVERY TICKET' },
  { id: 'unified_assets', name: 'UNIFIED ASSETS' },
  { id: 'production_costing', name: 'PRODUCTION & COSTING' },
  { id: 'marketplace', name: 'MARKETPLACE' },
  { id: 'microfinance_dashboard', name: 'MICROFINANCE CLIENT DASHBOARD' }
]

const toggleUserModule = (modId) => {
  if (!editForm.value.custom_modules) editForm.value.custom_modules = []
  const idx = editForm.value.custom_modules.indexOf(modId)
  if (idx >= 0) {
    editForm.value.custom_modules.splice(idx, 1)
  } else {
    editForm.value.custom_modules.push(modId)
  }
}


const viewMode = ref('cards')
const branches = ref([])
const showBranchModal = ref(false)
const showManageBranchesModal = ref(false)
const showEditBranchModal = ref(false)
const newBranch = ref({branch_code: '', name: '', location: '', phone: '', email: ''})
const editBranchData = ref({})

const fetchBranches = async () => {
  try {
    branches.value = await authApi.listBranches()
  } catch (err) {
    console.error('Failed to fetch branches', err)
  }
}

const getBranchName = (code) => {
  if (!code) return 'N/A'
  const b = branches.value.find(x => x.branch_code === code)
  return b ? b.name : code
}

const createBranch = async () => {
  saving.value = true
  try {
    await authApi.createBranch(newBranch.value)
    showBranchModal.value = false
    await fetchBranches()
  } catch (err) {
    alert(err.message || 'Failed to create branch')
  } finally {
    saving.value = false
  }
}

const handleEditBranch = (b) => {
  editBranchData.value = {...b}
  showEditBranchModal.value = true
}

const updateBranch = async () => {
  saving.value = true
  try {
    await authApi.updateBranch(editBranchData.value.branch_code, editBranchData.value)
    showEditBranchModal.value = false
    await fetchBranches()
  } catch (err) {
    alert(err.message || 'Failed to update branch')
  } finally {
    saving.value = false
  }
}

const deleteBranch = async (b) => {
  if (!confirm('Are you sure you want to permanently delete branch: ' + b.name + '?')) return
  try {
    await authApi.deleteBranch(b.branch_code)
    await fetchBranches()
  } catch (err) {
    alert(err.message || 'Failed to delete branch')
  }
}

const toggleBranchStatus = async (b) => {
  try {
    const newStatus = b.status === 'active' ? 'inactive' : 'active'
    await authApi.updateBranch(b.branch_code, { status: newStatus })
    await fetchBranches()
  } catch (err) {
    alert(err.message || 'Failed to update status')
  }
}

const createForm = ref({ username: '', email: '', display_name: '', password: '', role: '', branch_code: '' })
const editForm = ref({ user_id: null, role: '', branch_code: '' })

const fetchUsers = async () => {
  try {
    users.value = await authApi.listUsers()
  } catch (err) {
    console.error('Failed to fetch users', err)
  }
}

const rolesLoading = ref(false)
const rolesError = ref('')


  
  const deleteRole = async (role) => {
    if (!confirm(`Are you sure you want to delete role ${role.name}?`)) return
    try {
      // Robust Local Simulation for Delete
      let localRoles = JSON.parse(localStorage.getItem('mock_absa_roles') || '[]')
      localRoles = localRoles.filter(r => r.id !== role.id)
      localStorage.setItem('mock_absa_roles', JSON.stringify(localRoles))
      
      await fetchRoles()
    } catch (err) {
      console.error('Failed to delete role', err)
      rolesError.value = err.message || 'Failed to delete role'
    }
  }

  const fetchRoles = async () => {
    rolesLoading.value = true
    rolesError.value = ''
    try {
      const token = localStorage.getItem('token')
      const BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').trim() || 'http://22.84.115.25:8080'
      
      let apiRoles = []
      try {
        const res = await fetch(`${BASE_URL}/auth/admin/roles`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if (res.ok) {
          const rawRoles = await res.json()
          apiRoles = rawRoles.map(r => ({
            id: r.role_id || r.role_name,
            name: r.role_name,
            description: r.description || '',
            permissions: DEFAULT_ROLE_PERMISSIONS[r.role_name] || DEFAULT_ROLE_PERMISSIONS['SUPERADMIN']
          }))
        }
      } catch (apiErr) {
        console.warn('API roles fetch failed, falling back to local only:', apiErr)
      }

      // Robust Local Simulation for Roles (Overrides)
      let localRoles = JSON.parse(localStorage.getItem('mock_absa_roles') || '[]')
      
      const merged = [...apiRoles]
      for (const lr of localRoles) {
        const idx = merged.findIndex(r => r.id === lr.id || r.name === lr.name)
        if (idx >= 0) {
          merged[idx] = { ...merged[idx], ...lr }
        } else {
          merged.push(lr)
        }
      }

      // If empty, supply some defaults just in case
      if (merged.length === 0) {
        merged.push({ id: 'superadmin', name: 'SUPERADMIN', description: 'System Administrator.', permissions: DEFAULT_ROLE_PERMISSIONS['SUPERADMIN'] })
        merged.push({ id: 'relationship_manager', name: 'RELATIONSHIP_MANAGER', description: 'Manages customers.', permissions: DEFAULT_ROLE_PERMISSIONS['RELATIONSHIP_MANAGER'] || {} })
      }
      
      roles.value = merged
    } catch (err) {
      console.error('Failed to fetch roles', err)
      rolesError.value = err.message || 'Failed to load roles'
    } finally {
      rolesLoading.value = false
    }
}

const filteredUsers = computed(() => {
  if (!search.value) return users.value
  const q = search.value.toLowerCase()
  return users.value.filter(u => 
    (u.display_name && u.display_name.toLowerCase().includes(q)) || 
    (u.email && u.email.toLowerCase().includes(q)) ||
    (u.username && u.username.toLowerCase().includes(q))
  )
})

const activeBranches = computed(() => {
  const branchSet = new Set(users.value.map(u => u.branch_code).filter(Boolean))
  return branchSet.size || 0
})

const activeUsersCount = computed(() => {
  return users.value.filter(u => u.is_active).length || 0
})

const handleCreateUser = async () => {
  saving.value = true
  try {
    await authApi.createUser({
      username: createForm.value.username,
      email: createForm.value.email,
      display_name: createForm.value.display_name,
      password: createForm.value.password,
      roles: [createForm.value.role], branch_code: createForm.value.branch_code
    })
    showCreateModal.value = false
    createForm.value = { username: '', email: '', display_name: '', password: '', role: '', branch_code: '' }
    await fetchUsers()
  } catch (err) {
    alert(err.message || 'Failed to create user')
  } finally {
    saving.value = false
  }
}

const openEditUser = (u) => {
  const userRole = (u.roles || [])[0]
  const matchedRole = roles.value.find(r => {
    const rId = String(r.id || '')
    const rName = String(r.name || '')
    const uRole = String(userRole || '')
    return rId === uRole || rName === uRole || rId.toLowerCase() === uRole.toLowerCase() || rName.toLowerCase() === uRole.toLowerCase()
  })
  
  editForm.value = { 
    user_id: u.user_id, 
    username: u.username || '',
    display_name: u.display_name || u.username || '',
    email: u.email || '',
    phone: u.phone || '',
    secondary_email: u.secondary_email || '',
    department: u.department || 'SALES & MARKETING',
    approval_level: u.approval_level || 'LEVEL 0: AUTO-APPROVED',
    role: matchedRole ? matchedRole.name : (userRole || ''), 
    branch_code: u.branch_code || '',
    password: '',
    confirm_password: '',
    custom_modules: u.custom_modules || []
  }
  activeUserTab.value = 'profile'
  showEditModal.value = true
}

const handleEditUser = async () => {
  saving.value = true
  try {
    await authApi.updateUser(editForm.value.user_id, {
      roles: [editForm.value.role], branch_code: editForm.value.branch_code
    })
    showEditModal.value = false
    await fetchUsers()
  } catch (err) {
    alert(err.message || 'Failed to update user')
  } finally {
    saving.value = false
  }
}

const toggleUserStatus = async (u) => {
  try {
    await authApi.updateUser(u.user_id, { is_active: !u.is_active })
    await fetchUsers()
  } catch (err) {
    alert(err.message || 'Failed to update status')
  }
}

const deleteUser = async (u) => {
  if (!confirm(`Are you sure you want to permanently delete user: ${u.display_name || u.username}?`)) return
  try {
    await authApi.deleteUser(u.user_id)
    await fetchUsers()
  } catch (err) {
    console.error("Delete failed:", err.response?.data || err)
    const serverDetail = err.response?.data?.detail
    alert(serverDetail ? `Error: ${serverDetail}` : (err.message || 'Failed to delete user'))
  }
}

const formatDate = (dateStr) => {
  if (!dateStr) return 'Never'
  return new Date(dateStr).toLocaleString()
}

onMounted(() => {
  fetchUsers()
  fetchRoles()
})
</script>





<style scoped>



</style>






















