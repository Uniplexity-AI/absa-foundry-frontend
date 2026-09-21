<template>
  <div class="w-full pt-8 mt-4 px-8 pb-8">
    
    <!-- Breadcrumb + actions -->
    <div class="mb-8 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
      <div>
        <div class="flex items-center gap-2 text-sm text-gray-500 mb-2 flex-wrap">
          <router-link to="/dashboard/portfolio" class="hover:text-absa-passion">Home</router-link>
          <span>/</span>
          <span class="text-absa-enrich font-bold">Roles & Permissions</span>
        </div>
        <p class="text-sm text-gray-500">Manage system roles and access levels.</p>
      </div>
      <div class="flex items-center gap-2 flex-wrap shrink-0">
        <button 
          @click="showRoleModal = true" 
          class="bg-absa-passion text-white px-4 py-2 text-xs font-bold rounded-sm hover:bg-absa-power transition-colors uppercase tracking-wider shadow-sm"
        >
          Create Role
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <template v-if="loading">
      <div class="grid grid-cols-12 gap-6 mb-6">
        <div v-for="i in 3" :key="i" class="col-span-12 lg:col-span-4 h-32 bg-gray-100 rounded-sm animate-pulse"></div>
      </div>
    </template>
    
    <!-- Error State -->
    <template v-else-if="errorMsg">
      <div class="mb-6 px-4 py-3 bg-amber-50 border border-amber-300 rounded-sm flex items-start gap-2">
        <span class="material-symbols-outlined text-[20px] text-amber-700">warning</span>
        <div class="text-sm text-amber-900">
          <p class="font-bold">Error loading roles</p>
          <p class="mt-1">{{ errorMsg }}</p>
        </div>
      </div>
    </template>
    
    <!-- Empty state -->
    <template v-else-if="roles.length === 0">
      <div class="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <span class="material-symbols-outlined text-gray-400 text-[32px]">shield</span>
        </div>
        <h2 class="text-base font-bold text-absa-enrich mb-2">No Roles Found</h2>
        <p class="text-sm text-gray-500 max-w-md">There are currently no roles configured in the system.</p>
      </div>
    </template>
    
    <!-- Roles Grid -->
    <template v-else>
      <div class="grid grid-cols-12 gap-6">
        <div 
          v-for="role in roles" 
          :key="role.role_id" 
          class="col-span-12 lg:col-span-4 bg-white border border-gray-300 rounded-sm p-6 cursor-pointer hover:shadow-md hover:border-absa-passion/50 transition-all duration-200 flex flex-col justify-between"
          @click="openRoleDetails(role)"
        >
          <div>
            <div class="flex items-center justify-between mb-3">
              <h2 class="text-sm font-bold uppercase tracking-wider text-absa-enrich">{{ role.role_name }}</h2>
              <span class="material-symbols-outlined text-gray-400 text-[20px]">chevron_right</span>
            </div>
            <p class="text-sm text-gray-500 mt-1 line-clamp-3 leading-relaxed">{{ role.description || 'No description provided.' }}</p>
          </div>
        </div>
      </div>
    </template>

    <!-- Role Details Modal -->
    <div v-if="selectedRole" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm" @click.self="closeRoleDetails">
      <div class="bg-white rounded-sm w-full max-w-md p-6 shadow-xl border border-gray-200">
        <div class="flex justify-between items-start mb-4">
          <h2 class="text-sm font-bold text-absa-enrich uppercase tracking-wider">{{ selectedRole.role_name }}</h2>
          <button @click="closeRoleDetails" class="text-gray-400 hover:text-absa-passion transition-colors">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        
        <p class="text-xs text-gray-500 mb-5">{{ selectedRole.description }}</p>
        
        <div>
          <span class="text-[10px] font-bold uppercase tracking-widest text-gray-400">Accessible Pages</span>
          <div class="mt-2 p-4 bg-gray-50 border border-gray-100 rounded-sm max-h-[40vh] overflow-y-auto">
            <ul class="space-y-2">
              <li v-for="page in getAccessiblePages(selectedRole.role_name)" :key="page" class="text-xs font-semibold text-absa-enrich flex items-start gap-2">
                <span class="material-symbols-outlined text-[16px] text-absa-passion mt-0.5">check_circle</span>
                {{ page }}
              </li>
              <li v-if="getAccessiblePages(selectedRole.role_name).length === 0" class="text-xs text-gray-400 italic">
                No UI pages explicitly assigned.
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-6 flex justify-end">
          <button type="button" class="bg-gray-100 text-gray-700 px-4 py-2 text-xs font-bold rounded-sm hover:bg-gray-200 transition-colors tracking-wider uppercase" @click="closeRoleDetails">Close</button>
        </div>
      </div>
    </div>

    <!-- Create Role Modal -->
    <div v-if="showRoleModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm" @click.self="showRoleModal = false">
      <div class="bg-white rounded-sm w-full max-w-md p-6 shadow-xl border border-gray-200">
        <div class="flex justify-between items-start mb-4">
          <h2 class="text-sm font-bold text-absa-enrich uppercase tracking-wider">Create New Role</h2>
          <button @click="showRoleModal = false" class="text-gray-400 hover:text-absa-passion transition-colors">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        
        <form @submit.prevent="handleCreateRole" class="space-y-4">
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Role Name</label>
            <input 
              v-model="roleForm.role_name" 
              required 
              placeholder="e.g. AUDITOR" 
              class="w-full text-sm border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:border-absa-passion focus:ring-1 focus:ring-absa-passion"
            />
          </div>
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Description</label>
            <input 
              v-model="roleForm.description" 
              placeholder="Brief description..." 
              class="w-full text-sm border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:border-absa-passion focus:ring-1 focus:ring-absa-passion"
            />
          </div>
          
          <div class="pt-4 flex justify-end gap-2">
            <button type="button" class="bg-gray-100 text-gray-700 px-4 py-2 text-xs font-bold rounded-sm hover:bg-gray-200 transition-colors tracking-wider uppercase" @click="showRoleModal = false">Cancel</button>
            <button type="submit" class="bg-absa-passion text-white px-4 py-2 text-xs font-bold rounded-sm hover:bg-absa-power transition-colors tracking-wider uppercase" :disabled="saving">
              {{ saving ? 'Saving...' : 'Create Role' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import authApi from '@/services/auth_api'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const roles = ref([])
const showRoleModal = ref(false)
const selectedRole = ref(null)
const saving = ref(false)
const roleForm = ref({ role_name: '', description: '' })
const errorMsg = ref('')
const loading = ref(true)

const openRoleDetails = (role) => {
  selectedRole.value = role
}

const closeRoleDetails = () => {
  selectedRole.value = null
}

const getAccessiblePages = (roleName) => {
  const routes = router.getRoutes()
  const pages = new Set()
  
  routes.forEach(route => {
    if (route.meta && route.meta.requiresRoles && route.meta.requiresRoles.includes(roleName)) {
      if (route.meta.title) {
        pages.add(route.meta.title)
      } else if (route.name) {
        pages.add(route.name)
      }
    }
  })
  
  return Array.from(pages).sort()
}

const fetchRoles = async () => {
  errorMsg.value = ''
  loading.value = true
  try {
    const authStore = useAuthStore()
    const token = authStore.token || localStorage.getItem('token')
    const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'
    const res = await fetch(`${BASE_URL}/auth/admin/roles`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    if (!res.ok) {
      const errText = await res.text()
      throw new Error(`HTTP ${res.status}: ${errText}`)
    }
    
    roles.value = await res.json()
  } catch (err) {
    console.error('Failed to fetch roles', err)
    errorMsg.value = err.message
  } finally {
    loading.value = false
  }
}

const handleCreateRole = async () => {
  if (!roleForm.value.role_name) return
  saving.value = true
  try {
    await authApi.createRole({
      role_name: roleForm.value.role_name,
      description: roleForm.value.description
    })
    showRoleModal.value = false
    roleForm.value = { role_name: '', description: '' }
    await fetchRoles()
  } catch (err) {
    console.error('Failed to create role', err)
    alert(err.message || 'Error creating role')
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  fetchRoles()
})
</script>
