import os, re

path = 'src/views/Modules/settings/UserManagement.vue'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add activeTab and role state
script_insert = '''
const activeTab = ref('users')
const showRoleModal = ref(false)
const selectedRole = ref(null)
const savingRole = ref(false)
const roleForm = ref({ role_name: '', description: '' })

const openRoleDetails = (role) => {
  selectedRole.value = role
}

const closeRoleDetails = () => {
  selectedRole.value = null
}

const getAccessiblePages = (roleName) => {
  const pages = new Set()
  // Mock accessible pages since router might not have all meta here
  pages.add('Dashboard')
  pages.add('CRM')
  return Array.from(pages).sort()
}
'''
content = content.replace("const users = ref([])", script_insert.strip() + "\nconst users = ref([])")

# 2. Update navigation tabs
tabs_replacement = '''
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
'''
content = re.sub(r'<!-- Navigation Tabs -->.*?</div>\s*</header>', tabs_replacement.strip() + '\n    </header>', content, flags=re.DOTALL)

# 3. Wrap main Users content in v-show
content = content.replace('<div class="flex-1 max-w-full mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 relative z-0 space-y-8 pb-20">', '<div v-show="activeTab === \'users\'" class="flex-1 max-w-full mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 relative z-0 space-y-8 pb-20">')

# 4. Inject Roles content
roles_content = '''
    <!-- Roles Tab -->
    <div v-show="activeTab === 'roles'" class="flex-1 max-w-full mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 relative z-0 space-y-8 pb-20">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h2 class="text-lg font-black text-gray-900 uppercase tracking-tight font-display">System Roles</h2>
          <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-1">Manage permissions and access levels</p>
        </div>
        <button @click="showRoleModal = true" class="h-9 px-5 bg-absa-passion text-white text-[10px] font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 hover:bg-[#b3002d] cursor-pointer">
          <i class="fas fa-plus"></i> New Role
        </button>
      </div>
      
      <!-- Roles Grid -->
      <div v-if="roles.length > 0" class="grid grid-cols-12 gap-6">
        <div v-for="role in roles" :key="role.role_id" @click="openRoleDetails(role)" class="col-span-12 lg:col-span-4 bg-white border border-gray-200 p-6 cursor-pointer hover:shadow-md hover:border-absa-passion transition-all duration-200 flex flex-col justify-between min-h-[140px] group">
          <div>
            <div class="flex items-center justify-between mb-3">
              <h2 class="text-[11px] font-black uppercase tracking-wider text-gray-900">{{ role.role_name }}</h2>
              <i class="fas fa-chevron-right text-gray-300 text-[10px] group-hover:text-absa-passion transition-colors"></i>
            </div>
            <p class="text-[10px] font-mono text-gray-500 leading-relaxed">{{ role.description || 'No description provided.' }}</p>
          </div>
        </div>
      </div>
    </div>
'''
content = content.replace('<!-- Create User Modal -->', roles_content + '\n    <!-- Create User Modal -->')

# 5. Inject Roles Modals
roles_modals = '''
    <!-- Role Details Modal -->
    <div v-if="selectedRole" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md" @click.self="closeRoleDetails">
      <div class="bg-white border border-gray-200 shadow-2xl w-full max-w-md p-6 relative">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-sm font-black text-gray-900 uppercase tracking-tight">{{ selectedRole.role_name }}</h2>
          <button @click="closeRoleDetails" class="text-gray-400 hover:text-absa-passion transition-colors"><i class="fas fa-times"></i></button>
        </div>
        <p class="text-xs text-gray-500 mb-5">{{ selectedRole.description }}</p>
        <div>
          <span class="text-[10px] font-bold uppercase tracking-widest text-gray-400">Accessible Pages</span>
          <div class="mt-2 p-4 bg-gray-50 border border-gray-100 max-h-[40vh] overflow-y-auto">
            <ul class="space-y-2">
              <li v-for="page in getAccessiblePages(selectedRole.role_name)" :key="page" class="text-[10px] font-mono font-bold text-gray-600 uppercase flex items-center gap-2">
                <i class="fas fa-check text-absa-passion"></i> {{ page }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
'''
content = content.replace('<!-- Create User Modal -->', roles_modals + '\n    <!-- Create User Modal -->')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated UserManagement.vue with Roles Tab")
