<template>
  <div class="absa-um">
    <div class="absa-um__content">
      <div class="absa-um__header">
        <div>
          <h1 class="absa-um__title">User Management</h1>
          <p class="absa-um__subtitle">Manage platform users and access.</p>
        </div>
        <button class="btn btn-primary" @click="showCreateModal = true">
          Create User
        </button>
      </div>

      <div class="absa-um__toolbar">
        <div class="absa-um__search">
          <input v-model="search" type="text" placeholder="Search users..." class="absa-um__search-input" />
        </div>
      </div>

      <div class="absa-um__table-wrap">
        <table class="absa-um__table">
          <thead>
            <tr>
              <th>USER NAME</th>
              <th>ROLES</th>
              <th>STATUS</th>
              <th>LAST LOGIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in filteredUsers" :key="u.user_id">
              <td>
                <div class="absa-um__user-cell">
                  <div>
                    <div class="absa-um__user-name">{{ u.display_name || u.username }}</div>
                    <div class="absa-um__user-email">{{ u.email }}</div>
                  </div>
                </div>
              </td>
              <td><span class="absa-um__role-text">{{ (u.roles || []).join(', ') }}</span></td>
              <td>
                <span :class="['absa-um__status', u.is_active ? 'absa-um__status--active' : 'absa-um__status--inactive']">
                  {{ u.is_active ? 'ACTIVE' : 'INACTIVE' }}
                </span>
              </td>
              <td class="absa-um__login-time">{{ formatDate(u.last_login_at) }}</td>
              <td>
                <button class="btn btn-secondary btn-sm" @click="openEditUser(u)">Edit</button>
                <button class="btn btn-secondary btn-sm" @click="toggleUserStatus(u)">
                  {{ u.is_active ? 'Deactivate' : 'Activate' }}
                </button>
                <button class="btn btn-primary btn-sm" style="background-color: #dc2626;" @click="deleteUser(u)">
                  Delete
                </button>
              </td>
            </tr>
            <tr v-if="filteredUsers.length === 0">
              <td colspan="5" class="text-center py-4">No users found.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Create User Modal -->
      <div v-if="showCreateModal" class="modal-overlay" @click.self="showCreateModal = false">
        <div class="modal-content">
          <h2>Create User</h2>
          <form @submit.prevent="handleCreateUser">
            <label class="field"><span>Username</span><input v-model="createForm.username" required /></label>
            <label class="field"><span>Email</span><input v-model="createForm.email" type="email" required /></label>
            <label class="field"><span>Display Name</span><input v-model="createForm.display_name" required /></label>
            <label class="field"><span>Password</span><input v-model="createForm.password" type="password" required /></label>
            
            <label class="field">
              <span>Role</span>
              <select v-model="createForm.role" required>
                <option value="" disabled>Select Role</option>
                <option v-for="r in roles" :key="r.role_id" :value="r.role_name">{{ r.role_name }}</option>
              </select>
            </label>

            <div class="modal-actions">
              <button type="button" @click="showCreateModal = false" class="btn btn-secondary">Cancel</button>
              <button type="submit" class="btn btn-primary" :disabled="saving">Create</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Edit User Modal -->
      <div v-if="showEditModal" class="modal-overlay" @click.self="showEditModal = false">
        <div class="modal-content">
          <h2>Edit User</h2>
          <form @submit.prevent="handleEditUser">
            <label class="field">
              <span>Role</span>
              <select v-model="editForm.role" required>
                <option value="" disabled>Select Role</option>
                <option v-for="r in roles" :key="r.role_id" :value="r.role_name">{{ r.role_name }}</option>
              </select>
            </label>
            <div class="modal-actions">
              <button type="button" @click="showEditModal = false" class="btn btn-secondary">Cancel</button>
              <button type="submit" class="btn btn-primary" :disabled="saving">Save</button>
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

const createForm = ref({ username: '', email: '', display_name: '', password: '', role: '' })
const editForm = ref({ user_id: null, role: '' })

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

const handleCreateUser = async () => {
  saving.value = true
  try {
    await authApi.createUser({
      username: createForm.value.username,
      email: createForm.value.email,
      display_name: createForm.value.display_name,
      password: createForm.value.password,
      roles: [createForm.value.role]
    })
    showCreateModal.value = false
    createForm.value = { username: '', email: '', display_name: '', password: '', role: '' }
    await fetchUsers()
  } catch (err) {
    alert(err.message || 'Failed to create user')
  } finally {
    saving.value = false
  }
}

const openEditUser = (u) => {
  editForm.value = { user_id: u.user_id, role: (u.roles || [])[0] || '' }
  showEditModal.value = true
}

const handleEditUser = async () => {
  saving.value = true
  try {
    await authApi.updateUser(editForm.value.user_id, {
      roles: [editForm.value.role]
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
.absa-um { padding: 2rem; max-width: 1200px; margin: 0 auto; font-family: sans-serif; }
.absa-um__header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
.absa-um__title { font-size: 1.5rem; font-weight: 600; color: #111827; }
.absa-um__subtitle { color: #6b7280; font-size: 0.875rem; margin-top: 0.25rem; }
.absa-um__toolbar { margin-bottom: 1rem; }
.absa-um__search-input { width: 100%; max-width: 300px; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 4px; }
.absa-um__table { width: 100%; border-collapse: collapse; text-align: left; }
.absa-um__table th { border-bottom: 2px solid #e5e7eb; padding: 0.75rem 1rem; color: #4b5563; font-size: 0.75rem; font-weight: 600; }
.absa-um__table td { border-bottom: 1px solid #e5e7eb; padding: 1rem; vertical-align: middle; }
.absa-um__user-name { font-weight: 500; color: #111827; }
.absa-um__user-email { color: #6b7280; font-size: 0.875rem; }
.absa-um__status { display: inline-block; padding: 0.25rem 0.5rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; }
.absa-um__status--active { background: #d1fae5; color: #065f46; }
.absa-um__status--inactive { background: #fee2e2; color: #991b1b; }
.btn { padding: 0.5rem 1rem; border-radius: 4px; font-weight: 500; cursor: pointer; border: none; }
.btn-primary { background: #be0f2c; color: white; }
.btn-secondary { background: #e5e7eb; color: #374151; }
.btn-sm { padding: 0.25rem 0.5rem; font-size: 0.875rem; margin-right: 0.5rem; }
.modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 50; }
.modal-content { background: white; padding: 2rem; border-radius: 8px; width: 400px; }
.modal-content h2 { margin-bottom: 1.5rem; }
.field { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }
.field input, .field select { padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 4px; }
.modal-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 2rem; }
</style>
