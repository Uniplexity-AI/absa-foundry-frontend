import re

with open('src/views/Modules/settings/UserManagement.vue', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace header buttons to open modals
content = content.replace(
    '<button class="h-9 px-4 border border-gray-200 text-gray-600 text-[10px] font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 bg-white hover:border-absa-passion hover:text-absa-passion cursor-pointer">',
    '<button @click="showBranchModal = true; newBranch = {branch_code: \'\', name: \'\', location: \'\', phone: \'\', email: \'\'}" class="h-9 px-4 border border-gray-200 text-gray-600 text-[10px] font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 bg-white hover:border-absa-passion hover:text-absa-passion cursor-pointer">'
)

content = content.replace(
    '<button class="h-9 px-4 border border-gray-200 text-gray-600 text-[10px] font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 bg-white hover:border-absa-passion hover:text-absa-passion cursor-pointer">\n            <i class="fas fa-cog"></i> Manage Branches\n          </button>',
    '<button @click="showManageBranchesModal = true" class="h-9 px-4 border border-gray-200 text-gray-600 text-[10px] font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 bg-white hover:border-absa-passion hover:text-absa-passion cursor-pointer">\n            <i class="fas fa-cog"></i> Manage Branches\n          </button>'
)

# Replace the list/cards toggle bindings
content = content.replace(
    '<button class="h-9 px-3 text-[10px] font-mono font-bold uppercase transition-colors flex items-center gap-1.5 cursor-pointer bg-absa-passion text-white">\n              <i class="fas fa-th"></i>\n            </button>\n            <button class="h-9 px-3 text-[10px] font-mono font-bold uppercase transition-colors flex items-center gap-1.5 border-l border-gray-200 cursor-pointer text-gray-500 hover:text-absa-passion hover:bg-white">\n              <i class="fas fa-list"></i>\n            </button>',
    '''<button @click="viewMode = 'cards'" :class="viewMode === 'cards' ? 'bg-absa-passion text-white' : 'text-gray-500 hover:text-absa-passion hover:bg-white'" class="h-9 px-3 text-[10px] font-mono font-bold uppercase transition-colors flex items-center gap-1.5 cursor-pointer">
              <i class="fas fa-th"></i>
            </button>
            <button @click="viewMode = 'list'" :class="viewMode === 'list' ? 'bg-absa-passion text-white' : 'text-gray-500 hover:text-absa-passion hover:bg-white'" class="h-9 px-3 text-[10px] font-mono font-bold uppercase transition-colors flex items-center gap-1.5 border-l border-gray-200 cursor-pointer">
              <i class="fas fa-list"></i>
            </button>'''
)

# Add Cards View logic before Table View
table_view_regex = r'(<!-- Table View -->\s*<div class="relative z-10 bg-white border border-gray-200 overflow-hidden">)'
cards_view_html = '''
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
'''
content = re.sub(table_view_regex, cards_view_html + r'\n      <div v-else-if="viewMode === \'list\'" class="relative z-10 bg-white border border-gray-200 overflow-hidden">', content)

# Remove the closing div of table view and insert branches modal
closing_teleport_regex = r'(</Teleport>)'

modals_html = '''
    <!-- Create Branch Panel -->
    <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="showBranchModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm" @click="showBranchModal = false">
        <div class="bg-white border border-gray-200 relative overflow-hidden w-full max-w-3xl max-h-[90vh] overflow-y-auto" @click.stop>
        <div class="relative z-10">
          <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div class="flex items-center gap-3">
              <div class="w-1 h-5 bg-absa-passion"></div>
              <h3 class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest">System // New Branch Setup</h3>
            </div>
            <button @click="showBranchModal = false" class="text-gray-400 hover:text-gray-600 cursor-pointer">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <form @submit.prevent="createBranch" class="p-6 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
             <div class="space-y-5">
                <div>
                   <label class="block text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mb-2">Branch Code (Unique)</label>
                   <input v-model="newBranch.branch_code" required class="w-full h-10 px-3 bg-gray-50 border border-gray-200 focus:border-absa-passion outline-none transition-colors placeholder-gray-400 text-[11px] font-mono font-bold uppercase" placeholder="BRANCH_CODE" />
                </div>
                <div>
                   <label class="block text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mb-2">Branch Designation</label>
                   <input v-model="newBranch.name" required class="w-full h-10 px-3 bg-gray-50 border border-gray-200 focus:border-absa-passion outline-none transition-colors placeholder-gray-400 text-[11px] font-mono font-bold uppercase" placeholder="BRANCH_NAME" />
                </div>
                <div>
                   <label class="block text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mb-2">Physical Location</label>
                   <div class="relative">
                       <i class="fas fa-map-marker-alt absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
                       <input v-model="newBranch.location" class="w-full h-10 pl-10 pr-3 bg-gray-50 border border-gray-200 focus:border-absa-passion outline-none transition-colors placeholder-gray-400 text-[11px] font-mono font-bold uppercase" placeholder="STREET_CITY_LOC" />
                   </div>
                </div>
             </div>
             <div class="space-y-5">
                <div>
                   <label class="block text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mb-2">Technical Phone</label>
                   <input v-model="newBranch.phone" type="tel" class="w-full h-10 px-3 bg-gray-50 border border-gray-200 focus:border-absa-passion outline-none transition-colors placeholder-gray-400 text-[11px] font-mono font-bold" placeholder="+260_XXX_XXXXXX" />
                </div>
                <div>
                   <label class="block text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mb-2">Technical Email</label>
                   <input v-model="newBranch.email" type="email" class="w-full h-10 px-3 bg-gray-50 border border-gray-200 focus:border-absa-passion outline-none transition-colors placeholder-gray-400 text-[11px] font-mono font-bold" placeholder="BRANCH_SUPPORT_EMAIL" />
                </div>
             </div>
          </div>

          <div class="flex items-center justify-end gap-2 pt-5 border-t border-gray-200">
            <button type="button" @click="showBranchModal = false" class="h-9 px-4 text-gray-500 text-[10px] font-mono font-bold uppercase tracking-widest transition-colors cursor-pointer hover:text-gray-900">Cancel</button>
            <button type="submit" :disabled="saving" class="h-9 px-5 bg-absa-passion text-white text-[10px] font-mono font-bold uppercase tracking-widest transition-colors cursor-pointer hover:bg-[#b3002d] disabled:opacity-50 disabled:cursor-not-allowed">
              <span v-if="saving"><i class="fas fa-spinner fa-spin mr-2"></i>Saving...</span>
              <span v-else>Create Branch</span>
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
        <div class="bg-white border border-gray-200 relative overflow-hidden w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto" @click.stop>
        <div class="relative z-10">
          <div class="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-200">
            <div class="flex items-center gap-2 sm:gap-3">
              <div class="w-1 h-5 bg-absa-passion"></div>
              <h3 class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest">System // Manage Branches</h3>
            </div>
            <button @click="showManageBranchesModal = false" class="text-gray-400 hover:text-gray-600 p-1 cursor-pointer">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
             <div class="bg-red-50 border border-red-200 p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div class="flex gap-3 sm:gap-4 text-red-600">
                  <div><i class="fas fa-exclamation-triangle"></i></div>
                  <div>
                      <h4 class="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest font-black">Warning: Irreversible Action</h4>
                      <p class="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-widest leading-relaxed mt-1 text-red-500">
                        Deleting a branch will permanently purge ALL associated data.
                      </p>
                  </div>
                </div>
                <button @click="showManageBranchesModal = false; showBranchModal = true; newBranch = {branch_code: \'\', name: \'\', location: \'\', phone: \'\', email: \'\'}" class="h-9 px-4 bg-orange-500 text-white text-[10px] font-mono font-bold uppercase tracking-widest transition-all cursor-pointer hover:bg-orange-600 shrink-0 w-full sm:w-auto text-center">
                  <i class="fas fa-plus"></i> ADD_NEW
                </button>
             </div>

            <div class="border border-gray-200 overflow-hidden overflow-x-auto">
                <table class="w-full text-left border-collapse min-w-[600px]">
                    <thead class="bg-gray-50 border-b border-gray-200">
                        <tr>
                             <th class="px-3 sm:px-4 py-3 text-[9px] sm:text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest">Code / Branch Name / Loc</th>
                             <th class="px-3 sm:px-4 py-3 text-[9px] sm:text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest hidden sm:table-cell">Contacts / Email</th>
                             <th class="px-3 sm:px-4 py-3 text-[9px] sm:text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest hidden sm:table-cell">Status</th>
                             <th class="px-3 sm:px-4 py-3 text-[9px] sm:text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        <tr v-for="(branch, index) in branches" :key="branch.branch_code" class="hover:bg-gray-50 transition-colors">
                             <td class="px-3 sm:px-4 py-3 sm:py-4">
                                <div class="flex items-center gap-1.5 text-[11px] font-bold text-gray-900 uppercase tracking-tight">
                                  <span class="truncate">{{ branch.name }}</span>
                                  <span class="px-1 py-0.5 bg-gray-100 text-gray-500 text-[8px] font-mono font-black uppercase border border-gray-300">{{ branch.branch_code }}</span>
                                </div>
                                <div class="text-[9px] font-mono text-gray-400 uppercase mt-0.5">{{ branch.location || 'Unknown Location' }}</div>
                            </td>
                            <td class="px-3 sm:px-4 py-3 sm:py-4 hidden sm:table-cell">
                                <div class="text-[10px] font-mono font-bold text-gray-500">{{ branch.phone || 'NO_PHONE' }}</div>
                                <div class="text-[9px] font-mono text-gray-400 lowercase">{{ branch.email || 'no_email@sys.com' }}</div>
                            </td>
                            <td class="px-3 sm:px-4 py-3 sm:py-4 hidden sm:table-cell">
                                <span v-if="branch.status === 'active'" class="inline-flex items-center gap-1.5 text-[9px] font-mono font-black uppercase tracking-widest text-green-600"><span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>Active</span>
                                <span v-else class="inline-flex items-center gap-1.5 text-[9px] font-mono font-black uppercase tracking-widest text-red-600"><span class="w-1.5 h-1.5 rounded-full bg-red-500"></span>Inactive</span>
                            </td>
                             <td class="px-2 sm:px-4 py-3 sm:py-4 text-right">
                                <div class="flex items-center justify-end gap-1 sm:gap-2">
                                  <button @click="toggleBranchStatus(branch)" :class="branch.status === 'active' ? 'text-green-600 hover:border-green-600' : 'text-gray-400 hover:border-absa-passion hover:text-absa-passion'" class="h-8 w-8 border border-gray-200 transition-colors flex items-center justify-center cursor-pointer">
                                      <i class="fas text-xs" :class="branch.status === 'active' ? 'fa-toggle-on' : 'fa-toggle-off'"></i>
                                  </button>
                                  <button @click="handleEditBranch(branch)" class="h-8 w-8 border border-gray-200 text-gray-400 transition-colors flex items-center justify-center cursor-pointer hover:border-absa-passion hover:text-absa-passion" title="Edit Branch">
                                      <i class="fas fa-edit text-xs"></i>
                                  </button>
                                  <button @click="deleteBranch(branch)" class="h-8 w-8 border border-gray-200 text-gray-400 transition-colors flex items-center justify-center cursor-pointer hover:border-red-600 hover:text-red-600" title="Delete Branch">
                                      <i class="fas fa-trash-alt text-xs"></i>
                                  </button>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="branches.length === 0">
                            <td colspan="4" class="px-4 py-12 text-center">
                                <i class="fas fa-store-slash text-gray-300 text-3xl mb-3"></i>
                                <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">No active branches found</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="flex justify-end pt-4 border-t border-gray-200">
                <button @click="showManageBranchesModal = false" class="h-9 px-5 border border-gray-200 text-gray-500 text-[10px] font-mono font-bold uppercase tracking-widest transition-colors cursor-pointer hover:border-absa-passion hover:text-absa-passion">Close</button>
            </div>
            </div>
        </div>
      </div>
    </div>
    </Transition>

    <!-- Edit Branch Panel -->
    <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="showEditBranchModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm" @click="showEditBranchModal = false">
        <div class="bg-white border border-gray-200 relative overflow-hidden w-full max-w-3xl max-h-[90vh] overflow-y-auto" @click.stop>
        <div class="relative z-10">
          <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div class="flex items-center gap-3">
              <div class="w-1 h-5 bg-absa-passion"></div>
              <h3 class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest">System // Edit Branch Details</h3>
            </div>
            <button type="button" @click="showEditBranchModal = false" class="text-gray-400 hover:text-gray-600 cursor-pointer"><i class="fas fa-times"></i></button>
          </div>
        <form @submit.prevent="updateBranch" class="p-6 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
             <div class="space-y-5">
                <div>
                   <label class="block text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mb-2">Branch Code</label>
                   <input v-model="editBranchData.branch_code" disabled class="w-full h-10 px-3 bg-gray-100 border border-gray-200 outline-none transition-colors text-gray-500 text-[11px] font-mono font-bold uppercase" />
                </div>
                <div>
                   <label class="block text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mb-2">Branch Designation</label>
                   <input v-model="editBranchData.name" required class="w-full h-10 px-3 bg-gray-50 border border-gray-200 focus:border-absa-passion outline-none transition-colors placeholder-gray-400 text-[11px] font-mono font-bold uppercase" />
                </div>
                <div>
                   <label class="block text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mb-2">Physical Location</label>
                   <div class="relative">
                       <i class="fas fa-map-marker-alt absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
                       <input v-model="editBranchData.location" class="w-full h-10 pl-10 pr-3 bg-gray-50 border border-gray-200 focus:border-absa-passion outline-none transition-colors placeholder-gray-400 text-[11px] font-mono font-bold uppercase" />
                   </div>
                </div>
             </div>
             <div class="space-y-5">
                <div>
                   <label class="block text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mb-2">Technical Phone</label>
                   <input v-model="editBranchData.phone" type="tel" class="w-full h-10 px-3 bg-gray-50 border border-gray-200 focus:border-absa-passion outline-none transition-colors placeholder-gray-400 text-[11px] font-mono font-bold" />
                </div>
                <div>
                   <label class="block text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mb-2">Technical Email</label>
                   <input v-model="editBranchData.email" type="email" class="w-full h-10 px-3 bg-gray-50 border border-gray-200 focus:border-absa-passion outline-none transition-colors placeholder-gray-400 text-[11px] font-mono font-bold" />
                </div>
             </div>
          </div>
          
          <div class="flex items-center justify-end gap-2 pt-5 border-t border-gray-200">
            <button type="button" @click="showEditBranchModal = false" class="h-9 px-4 text-gray-500 text-[10px] font-mono font-bold uppercase tracking-widest transition-colors cursor-pointer hover:text-gray-900">Cancel</button>
            <button type="submit" :disabled="saving" class="h-9 px-5 bg-absa-passion text-white text-[10px] font-mono font-bold uppercase tracking-widest transition-colors cursor-pointer hover:bg-[#b3002d] disabled:opacity-50 disabled:cursor-not-allowed">
              <span v-if="saving"><i class="fas fa-spinner fa-spin mr-2"></i>Saving...</span>
              <span v-else>Save Changes</span>
            </button>
          </div>
        </form>
        </div>
        </div>
      </div>
    </Transition>
'''
content = re.sub(closing_teleport_regex, modals_html + r'\n\1', content)

# Modify script variables
script_vars = '''
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
  if (!confirm(Are you sure you want to permanently delete branch: ?)) return
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

'''

content = content.replace(
    'const createForm = ref({ username: \'\', email: \'\', display_name: \'\', password: \'\', role: \'\' })',
    script_vars + 'const createForm = ref({ username: \'\', email: \'\', display_name: \'\', password: \'\', role: \'\' })'
)

# Insert fetchBranches into onMounted
content = content.replace(
    'fetchRoles()\n  })',
    'fetchRoles()\n    fetchBranches()\n  })'
)

# Calculate activeBranches correctly
content = content.replace(
    'const branchSet = new Set(users.value.map(u => u.branch_code).filter(Boolean))\n    return branchSet.size || 0',
    'return branches.value.filter(b => b.status === \'active\').length || 0'
)

with open('src/views/Modules/settings/UserManagement.vue', 'w', encoding='utf-8') as f:
    f.write(content)

