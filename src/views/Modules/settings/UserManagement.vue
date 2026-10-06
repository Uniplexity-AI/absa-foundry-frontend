<template>
  <div class="h-full flex flex-col font-sans relative text-gray-900 bg-transparent overflow-auto">
    <!-- Mesh Background (Fixed to viewport) -->
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

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
        <button type="button" class="py-2.5 px-4 text-[10px] font-mono font-bold uppercase tracking-widest border-b-2 transition-colors flex items-center gap-2 border-absa-passion text-absa-passion bg-white cursor-pointer">
          <i class="fas fa-users"></i> Users
          <span class="text-[9px] font-mono px-1.5 py-0.5 bg-gray-100 text-gray-600 font-black">{{ users.length }}</span>
        </button>
        <button type="button" class="py-2.5 px-4 text-[10px] font-mono font-bold uppercase tracking-widest border-b-2 transition-colors flex items-center gap-2 border-transparent text-gray-500 hover:text-gray-900 bg-transparent cursor-pointer">
          <i class="fas fa-user-shield"></i> Roles & Permissions
          <span class="text-[9px] font-mono px-1.5 py-0.5 bg-red-50 text-absa-passion font-black">{{ roles.length }}</span>
        </button>
        <button type="button" class="py-2.5 px-4 text-[10px] font-mono font-bold uppercase tracking-widest border-b-2 transition-colors flex items-center gap-2 border-transparent text-gray-500 hover:text-gray-900 bg-transparent cursor-pointer">
          <i class="fas fa-user-check"></i> Active Sessions
          <span class="text-[9px] font-mono px-1.5 py-0.5 bg-green-50 text-green-700 border border-green-200 font-black">{{ activeUsersCount }}</span>
        </button>
      </div>
    </header>

    <div class="flex-1 max-w-full mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 relative z-0 space-y-8 pb-20">

            <!-- Metrics Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <!-- Total Users KPI -->
        <div class="bg-white border border-gray-200 p-6 relative group overflow-hidden dot-pattern">
          <div class="absolute top-0 right-0 bg-white border-b border-l border-gray-200 px-2 py-0.5 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest z-20">Users</div>
          <div class="flex justify-between items-start mb-6 relative z-10">
            <div class="text-gray-400"><i class="fas fa-users text-lg"></i></div>
          </div>
          <div class="relative z-10">
            <h3 class="text-3xl font-black font-display text-gray-900 uppercase tracking-tight leading-none mb-1">{{ users.length || 0 }}</h3>
            <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Registered Users</p>
          </div>
        </div>

        <!-- Total Branches KPI -->
        <div class="bg-white border border-gray-200 p-6 relative group overflow-hidden dot-pattern">
          <div class="absolute top-0 right-0 bg-white border-b border-l border-gray-200 px-2 py-0.5 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest z-20">Branches</div>
          <div class="flex justify-between items-start mb-6 relative z-10">
            <div class="text-gray-400"><i class="fas fa-store text-lg"></i></div>
          </div>
          <div class="relative z-10">
            <h3 class="text-3xl font-black font-display text-gray-900 uppercase tracking-tight leading-none mb-1">{{ activeBranches || 0 }}</h3>
            <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Active Branches</p>
          </div>
        </div>

        <!-- Active Users KPI -->
        <div class="bg-white border border-gray-200 p-6 relative group overflow-hidden dot-pattern flex flex-col justify-between">
          <div class="absolute top-0 right-0 bg-white border-b border-l border-gray-200 px-2 py-0.5 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest z-20">Active</div>
          <div>
            <div class="flex justify-between items-start mb-6 relative z-10">
              <div class="text-gray-400"><i class="fas fa-user-check text-lg"></i></div>
            </div>
            <div class="relative z-10">
              <h3 class="text-3xl font-black font-display text-gray-900 uppercase tracking-tight leading-none mb-1">{{ activeUsersCount || 0 }}</h3>
              <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-4">Active Accounts</p>
            </div>
          </div>
          <div class="relative z-10 border-t border-gray-100 pt-3 mt-auto">
             <p class="text-[8px] font-mono text-gray-400 uppercase tracking-wider mt-0.5">Currently Enabled Users</p>
          </div>
        </div>

        <!-- Filtered KPI -->
        <div class="bg-white border border-gray-200 p-6 relative group overflow-hidden dot-pattern">
          <div class="absolute top-0 right-0 bg-white border-b border-l border-gray-200 px-2 py-0.5 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest z-20">Filtered</div>
          <div class="flex justify-between items-start mb-6 relative z-10">
            <div class="text-gray-400"><i class="fas fa-database text-lg"></i></div>
          </div>
          <div class="relative z-10">
            <h3 class="text-3xl font-black font-display text-gray-900 uppercase tracking-tight leading-none mb-1">{{ filteredUsers.length || 0 }}</h3>
            <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Filtered Context</p>
          </div>
        </div>
      </div>

      <!-- Filters & Toolbar -->
      <div class="bg-white p-3 border border-gray-200 flex flex-col md:flex-row gap-3 items-center justify-between relative z-10 transition-colors hover:border-absa-passion">
        <div class="relative flex-1 w-full md:max-w-md">
          <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
          <input v-model="search" placeholder="Search by name or email..." 
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
          
          <div class="absolute top-0 right-0 max-w-[65%] py-1 px-3 text-right leading-[1.15] bg-white border-b border-l border-gray-200 text-[9px] font-mono font-black text-gray-500 uppercase tracking-wider group-hover:bg-absa-passion group-hover:text-white group-hover:border-absa-passion transition-colors z-20">
            {{ (u.roles || []).join(', ') || 'USER' }}
          </div>
  
          <div class="relative z-10">
            <div class="flex items-center gap-4 mb-5">
              <div class="h-12 w-12 shrink-0 flex items-center justify-center bg-red-50 text-absa-passion font-mono font-black text-xl group-hover:bg-absa-passion group-hover:text-white transition-colors">
                {{ (u.display_name || u.username || '?').charAt(0).toUpperCase() }}
              </div>
              <div class="min-w-0">
                <h3 class="font-black text-[11px] text-gray-900 group-hover:text-absa-passion transition-colors truncate uppercase tracking-tight">{{ u.display_name || u.username }}</h3>
                <p class="text-[10px] font-mono font-bold text-gray-400 truncate mt-0.5 lowercase">{{ u.email }}</p>
              </div>
            </div>
  
            <div class="space-y-3 pb-4">
              <div class="flex items-center justify-between text-[11px] border-b border-gray-200 pb-2">
                <span class="text-gray-400 font-mono uppercase tracking-widest text-[9px] font-bold">Branch</span>
                <span class="text-gray-900 font-bold text-right break-words leading-tight max-w-[60%] uppercase">{{ getBranchName(u.branch_code) }}</span>
              </div>
              <div class="flex items-center justify-between text-[11px] border-b border-gray-200 pb-2">
                <span class="text-gray-400 font-mono uppercase tracking-widest text-[9px] font-bold">Dept</span>
                <span class="px-1.5 py-0.5 bg-blue-50/70 border border-blue-200 text-blue-800 text-[8px] font-mono font-bold uppercase truncate max-w-[60%]">
                  {{ u.department || 'N/A' }}
                </span>
              </div>
              <div class="flex items-center justify-between text-[11px]">
                <span class="text-gray-400 font-mono uppercase tracking-widest text-[9px] font-bold">Status</span>
                <span :class="u.is_active ? 'text-green-600' : 'text-gray-400'" class="flex items-center gap-1.5 uppercase font-mono font-bold text-[10px]">
                  <span class="w-1.5 h-1.5 rounded-full" :class="u.is_active ? 'bg-green-500 animate-pulse' : 'bg-gray-300'"></span>
                  {{ u.is_active ? 'Active' : 'Offline' }}
                </span>
              </div>
            </div>
          </div>
  
          <div class="flex items-center gap-2 pt-4 border-t border-gray-200 relative z-10">
             <button @click.stop="toggleUserStatus(u)" class="flex-1 h-9 flex items-center justify-center gap-2 text-white transition-colors text-[10px] font-mono font-bold uppercase tracking-widest cursor-pointer" :class="u.is_active ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-600 hover:bg-green-700'">
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
                  <span :class="u.is_active ? 'text-green-600 bg-green-50 border-green-200' : 'text-gray-500 bg-gray-50 border-gray-200'" class="inline-flex items-center gap-1.5 px-2 py-1 border text-[9px] font-black uppercase tracking-widest">
                    <span class="w-1.5 h-1.5 rounded-full" :class="u.is_active ? 'bg-green-500 animate-pulse' : 'bg-gray-300'"></span>
                    {{ u.is_active ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td class="px-4 py-3">
                  <div class="text-[10px] font-black text-gray-900 uppercase">{{ formatDate(u.last_login_at) }}</div>
                </td>
                <td class="px-4 py-3 text-right">
                  <div class="flex items-center justify-end gap-1">
                    <button @click="toggleUserStatus(u)" :class="u.is_active ? 'text-green-500 hover:border-green-500' : 'text-gray-400 hover:border-absa-passion hover:text-absa-passion'" class="h-8 w-8 border border-gray-200 transition-colors flex items-center justify-center cursor-pointer" :title="u.is_active ? 'Deactivate' : 'Activate'">
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
              <input v-model="createForm.password" type="password" required class="w-full h-9 px-3 border border-gray-200 text-xs focus:outline-none focus:border-absa-passion transition-colors" />
            </div>
            <div>
              <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1">Display Name</label>
              <input v-model="createForm.display_name" class="w-full h-9 px-3 border border-gray-200 text-xs focus:outline-none focus:border-absa-passion transition-colors" />
            </div>
            <div class="pt-4 flex justify-end gap-2">
              <button type="button" @click="showCreateModal = false" class="px-4 py-2 border border-gray-200 text-gray-600 text-[10px] font-bold uppercase transition-colors hover:border-gray-300">Cancel</button>
              <button type="submit" class="px-4 py-2 bg-absa-passion text-white text-[10px] font-bold uppercase transition-colors hover:bg-[#b3002d]">Create</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Edit User Modal -->
      <div v-if="showEditModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm" @click.self="showEditModal = false">
        <div class="bg-white border border-gray-200 shadow-xl w-full max-w-md p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-sm font-black text-gray-900 uppercase tracking-tight">Edit User</h2>
            <button @click="showEditModal = false" class="text-gray-400 hover:text-absa-passion transition-colors"><i class="fas fa-times"></i></button>
          </div>
          <form @submit.prevent="handleEditUser" class="space-y-4">
            <div>
              <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1">Username (Disabled)</label>
              <input v-model="editForm.username" disabled class="w-full h-9 px-3 bg-gray-50 border border-gray-200 text-xs text-gray-500 cursor-not-allowed" />
            </div>
            <div>
              <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1">Email</label>
              <input v-model="editForm.email" type="email" required class="w-full h-9 px-3 border border-gray-200 text-xs focus:outline-none focus:border-absa-passion transition-colors" />
            </div>
            <div>
              <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1">Display Name</label>
              <input v-model="editForm.display_name" class="w-full h-9 px-3 border border-gray-200 text-xs focus:outline-none focus:border-absa-passion transition-colors" />
            </div>
            <div class="pt-4 flex justify-end gap-2">
              <button type="button" @click="showEditModal = false" class="px-4 py-2 border border-gray-200 text-gray-600 text-[10px] font-bold uppercase transition-colors hover:border-gray-300">Cancel</button>
              <button type="submit" class="px-4 py-2 bg-absa-passion text-white text-[10px] font-bold uppercase transition-colors hover:bg-[#b3002d]">Save Changes</button>
            </div>
          </form>
        </div>
      </div>

      </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import authApi from '@/services/auth_api'

const users = ref([])
const roles = ref([])
const search = ref('')

const showCreateModal = ref(false)
const showEditModal = ref(false)
const saving = ref(false)


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

const fetchRoles = async () => {
  try {
    roles.value = await authApi.listRoles()
  } catch (err) {
    console.error('Failed to fetch roles', err)
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
  editForm.value = { user_id: u.user_id, role: (u.roles || [])[0] || '', branch_code: u.branch_code || '' }
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
.dot-pattern {
  background-image: radial-gradient(#e5e7eb 1px, transparent 1px);
  background-size: 16px 16px;
}

.mesh-background {
  background-color: #fcfcfc;
  background-image:
    linear-gradient(#f0f0f0 1px, transparent 1px),
    linear-gradient(90deg, #f0f0f0 1px, transparent 1px);
  background-size: 40px 40px;
}
</style>






















