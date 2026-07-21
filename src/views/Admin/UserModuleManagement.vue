<template>
  <div class="min-h-screen flex flex-col font-sans relative text-gray-900">
    <!-- Mesh Background -->
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-2 h-8 bg-[#2F2E8B] rounded-sm"></div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">SYS_ADMIN // ACCESS</span>
            </div>
            <h1 class="text-xl font-black text-gray-900 uppercase tracking-tight">User Module Access</h1>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-[9px] font-mono text-gray-400 uppercase">Tenants with Admin module — subaccount users</span>
          <button @click="fetchTenants" :disabled="loading"
            class="bg-[#2F2E8B] hover:bg-[#1D226B] text-white px-4 py-2 rounded-sm text-xs font-bold font-mono uppercase shadow-md transition-all flex items-center gap-2 active:scale-95">
            <i class="fas fa-sync-alt" :class="{'animate-spin': loading}"></i>
            REFRESH
          </button>
        </div>
      </div>
    </header>

    <main class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-40 relative z-10">

      <!-- Loading -->
      <div v-if="loading" class="flex items-center justify-center py-20">
        <div class="text-center">
          <i class="fas fa-spinner animate-spin text-[#2F2E8B] text-3xl mb-3"></i>
          <p class="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">Loading tenants & users...</p>
        </div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-sm p-6 text-center">
        <i class="fas fa-exclamation-triangle text-red-400 text-2xl mb-2"></i>
        <p class="text-sm font-bold text-red-600 uppercase">{{ error }}</p>
        <button @click="fetchTenants" class="mt-3 text-xs font-mono font-bold text-red-500 hover:underline uppercase">Retry</button>
      </div>

      <template v-else>
        <!-- Tenant Selector -->
        <div class="mb-6">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-1 h-6 bg-[#2F2E8B]"></div>
            <h2 class="text-sm font-black text-gray-900 uppercase tracking-widest">Select Tenant</h2>
            <span class="text-[10px] font-mono font-bold text-gray-400">({{ tenants.length }} registered)</span>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            <button
              v-for="t in tenants"
              :key="t.tenant_id"
              @click="selectedTenant = t"
              class="text-left p-3 border rounded-sm transition-all font-mono"
              :class="selectedTenant?.tenant_id === t.tenant_id
                ? 'bg-[#2F2E8B] text-white border-[#2F2E8B] shadow-md'
                : 'bg-white text-gray-700 border-gray-200 hover:border-[#2F2E8B] hover:text-[#2F2E8B]'"
            >
              <div class="text-[10px] font-black uppercase truncate">{{ t.name }}</div>
              <div class="text-[8px] font-mono mt-0.5 opacity-70 truncate">{{ t.tenant_id }}</div>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-[8px] font-bold opacity-70">{{ t.users.length }} users</span>
                <span class="w-1 h-1 rounded-full opacity-40"></span>
                <span class="text-[8px] font-bold opacity-70">{{ t.owner_email || '—' }}</span>
              </div>
            </button>
          </div>
        </div>

        <!-- Selected Tenant Detail -->
        <div v-if="selectedTenant" class="animate-fade-in">
          <!-- Tenant Info Bar -->
          <div class="bg-white border border-gray-200 rounded-sm p-4 mb-6 flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 bg-[#2F2E8B]/10 rounded-sm flex items-center justify-center">
                <i class="fas fa-building text-[#2F2E8B]"></i>
              </div>
              <div>
                <h3 class="text-sm font-black text-gray-900 uppercase">{{ selectedTenant.name }}</h3>
                <div class="flex items-center gap-3 mt-0.5 text-[10px] font-mono">
                  <span class="text-gray-500">{{ selectedTenant.tenant_id }}</span>
                  <span class="w-px h-3 bg-gray-200"></span>
                  <span class="font-bold text-[#2F2E8B]">Owner: {{ selectedTenant.owner_email || '—' }}</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-[9px] font-mono bg-blue-50 text-[#2F2E8B] px-2 py-1 rounded-sm border border-blue-100">
                <i class="fas fa-users mr-1"></i>{{ selectedTenant.users.length }} Users
              </span>
              <span class="text-[9px] font-mono bg-purple-50 text-purple-700 px-2 py-1 rounded-sm border border-purple-100">
                <i class="fas fa-cubes mr-1"></i>{{ selectedTenant.module_subscriptions?.owner?.[0]?.modules?.length || 0 }} Owner Modules
              </span>
            </div>
          </div>

          <!-- Owner's Subscribed Modules -->
          <div class="bg-white border border-gray-200 rounded-sm overflow-hidden mb-6">
            <div class="px-5 py-3 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <i class="fas fa-crown text-yellow-500 text-xs"></i>
                <h4 class="text-xs font-black text-gray-900 uppercase tracking-widest">Owner's Subscribed Modules</h4>
              </div>
              <span class="text-[9px] font-mono text-gray-400">
                {{ ownerModules.length }} modules
              </span>
            </div>
            <div class="px-5 py-3">
              <div v-if="ownerModules.length" class="flex flex-wrap gap-1.5">
                <span v-for="m in ownerModules" :key="m"
                  class="px-2 py-1 text-[9px] font-mono font-bold bg-[#2F2E8B]/5 text-[#2F2E8B] border border-[#2F2E8B]/20 rounded-sm uppercase">
                  <i class="fas fa-check-circle text-[8px] mr-1"></i>{{ m }}
                </span>
              </div>
              <div v-else class="text-[10px] font-mono text-gray-400 py-2 text-center">
                No subscribed modules found for this tenant's owner
              </div>
            </div>
          </div>

          <!-- Users Table -->
          <div class="bg-white border border-gray-200 rounded-sm overflow-hidden">
            <div class="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-1 h-5 bg-[#2F2E8B]"></div>
                <h4 class="text-sm font-black text-gray-900 uppercase tracking-widest">Users & Module Access</h4>
                <span class="text-[10px] font-mono font-bold text-gray-400">({{ selectedTenant.users.length }})</span>
              </div>
              <div class="text-[9px] font-mono text-gray-400 italic">
                Assign modules to users via their email
              </div>
            </div>

            <div v-if="!selectedTenant.users.length" class="p-10 text-center text-gray-400 font-mono text-xs">
              No users found for this tenant
            </div>

            <div v-else class="overflow-x-auto">
              <table class="w-full text-left text-xs font-mono">
                <thead class="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th class="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Email</th>
                    <th class="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Name</th>
                    <th class="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Role</th>
                    <th class="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Branch</th>
                    <th class="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                    <th class="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Assigned Modules</th>
                    <th class="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest text-center">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr v-for="user in selectedTenant.users" :key="user.user_id"
                    class="hover:bg-gray-50/50 transition-colors"
                    :class="{'bg-yellow-50/30': user.email === selectedTenant.owner_email}">
                    <td class="px-4 py-3">
                      <div class="flex items-center gap-2">
                        <span class="font-bold text-gray-900 text-[10px]">{{ user.email || '—' }}</span>
                        <span v-if="user.email === selectedTenant.owner_email"
                          class="text-[8px] font-mono font-bold bg-yellow-100 text-yellow-700 px-1 py-0.5 rounded-sm uppercase border border-yellow-200">Owner</span>
                      </div>
                    </td>
                    <td class="px-4 py-3 text-gray-600">{{ user.name || '—' }}</td>
                    <td class="px-4 py-3">
                      <span class="text-[9px] font-bold font-mono uppercase"
                        :class="user.role === 'owner' ? 'text-yellow-600' : 'text-gray-500'">
                        {{ user.role || 'staff' }}
                      </span>
                    </td>
                    <td class="px-4 py-3 text-gray-500 text-[10px]">{{ user.branch || 'main' }}</td>
                    <td class="px-4 py-3 text-center">
                      <span class="inline-flex items-center gap-1 px-1.5 py-0.5 text-[8px] font-bold font-mono uppercase rounded-sm"
                        :class="(user.status || 'active') === 'active' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'">
                        <span class="w-1.5 h-1.5 rounded-full" :class="(user.status || 'active') === 'active' ? 'bg-green-500' : 'bg-red-500'"></span>
                        {{ user.status || 'active' }}
                      </span>
                    </td>
                    <td class="px-4 py-3">
                      <div v-if="getUserModules(user.email).length" class="flex flex-wrap gap-1">
                        <span v-for="m in getUserModules(user.email)" :key="m"
                          class="px-1.5 py-0.5 text-[8px] font-mono font-bold bg-[#2F2E8B]/5 text-[#2F2E8B] border border-[#2F2E8B]/20 rounded-sm uppercase leading-tight">
                          {{ m }}
                        </span>
                      </div>
                      <span v-else class="text-[9px] text-gray-400 italic">No specific modules</span>
                    </td>
                    <td class="px-4 py-3 text-center">
                      <button @click="openAssignModal(user)"
                        class="px-2 py-1 text-[9px] font-mono font-bold bg-[#2F2E8B] hover:bg-[#1D226B] text-white rounded-sm uppercase transition-colors">
                        <i class="fas fa-edit text-[8px] mr-1"></i>Assign
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- No tenant selected -->
        <div v-else class="h-[400px] bg-white border border-gray-200 rounded-sm flex flex-col items-center justify-center">
          <i class="fas fa-arrow-left text-gray-300 text-3xl mb-3"></i>
          <p class="text-sm font-black text-gray-400 uppercase tracking-widest">Select a tenant above</p>
          <p class="text-[10px] font-mono text-gray-400 mt-1">Choose a tenant to view its users and assign module access</p>
        </div>
      </template>

      <!-- ── Assign Modal ────────────────────────────────────────────────── -->
      <div v-if="showModal && selectedUser" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        @click.self="showModal = false">
        <div class="bg-white rounded-sm shadow-2xl border border-gray-200 w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col animate-slide-up">
          <!-- Modal Header -->
          <div class="bg-[#2F2E8B] px-6 py-4 flex items-center justify-between shrink-0">
            <div>
              <h2 class="text-base font-black text-white uppercase tracking-widest">Assign Modules</h2>
              <p class="text-blue-200 text-[10px] font-mono mt-0.5">{{ selectedUser.email }}</p>
            </div>
            <button @click="showModal = false" class="text-blue-200 hover:text-white transition-colors">
              <i class="fas fa-times text-lg"></i>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="overflow-y-auto flex-1 p-6">
            <!-- Owner's modules as reference -->
            <div class="bg-blue-50 border border-blue-100 rounded-sm p-3 mb-4">
              <p class="text-[9px] font-mono font-bold text-[#2F2E8B] uppercase tracking-widest mb-1">
                <i class="fas fa-info-circle mr-1"></i>Owner's subscribed modules
              </p>
              <div class="flex flex-wrap gap-1">
                <span v-for="m in ownerModules" :key="m"
                  class="px-1.5 py-0.5 text-[8px] font-mono font-bold bg-blue-100 text-[#2F2E8B] rounded-sm uppercase">
                  {{ m }}
                </span>
              </div>
            </div>

            <!-- Regular app modules -->
            <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-3">
              App Modules
            </p>
            <div v-if="regularModules.length" class="grid grid-cols-2 gap-2 mb-5">
              <label
                v-for="mod in regularModules"
                :key="mod.id"
                class="flex items-center gap-2 p-2 border rounded-sm cursor-pointer transition-colors font-mono"
                :class="selectedModules.includes(mod.id)
                  ? 'bg-[#2F2E8B]/5 border-[#2F2E8B] text-[#2F2E8B]'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'"
              >
                <input type="checkbox" :value="mod.id" v-model="selectedModules"
                  class="w-3.5 h-3.5 rounded-sm accent-[#2F2E8B]" />
                <span class="text-[10px] font-bold uppercase">{{ mod.title || mod.id }}</span>
              </label>
            </div>
            <div v-else class="text-[10px] font-mono text-gray-400 mb-5 py-2 italic">
              No app modules available — owner has no subscriptions
            </div>

            <!-- Admin Dashboard Pages -->
            <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <i class="fas fa-shield-alt text-[#2F2E8B]"></i> Admin Dashboard Pages
              <span class="text-[8px] font-normal normal-case text-gray-400">(assign to grant admin access)</span>
            </p>
            <div class="grid grid-cols-2 gap-2">
              <label
                v-for="mod in adminPages"
                :key="mod.id"
                class="flex items-center gap-2 p-2 border rounded-sm cursor-pointer transition-colors font-mono"
                :class="selectedModules.includes(mod.id)
                  ? 'bg-yellow-50 border-yellow-400 text-yellow-800'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'"
              >
                <input type="checkbox" :value="mod.id" v-model="selectedModules"
                  class="w-3.5 h-3.5 rounded-sm accent-yellow-600" />
                <i :class="mod.icon" class="text-[10px] w-4 text-center"></i>
                <span class="text-[10px] font-bold uppercase">{{ mod.title || mod.id }}</span>
              </label>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="shrink-0 border-t border-gray-100 px-6 py-4 flex items-center justify-between bg-gray-50">
            <button @click="showModal = false"
              class="text-[10px] font-mono font-bold text-gray-500 hover:text-gray-800 uppercase transition-colors">
              Cancel
            </button>
            <button @click="submitAssignment" :disabled="assigning"
              class="px-6 py-2 bg-[#2F2E8B] hover:bg-[#1D226B] disabled:opacity-50 text-white text-[10px] font-mono font-bold uppercase rounded-sm transition-colors flex items-center gap-2">
              <i :class="assigning ? 'fas fa-spinner fa-spin' : 'fas fa-check'"></i>
              {{ assigning ? 'Saving...' : 'Save Assignment' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Toast -->
      <transition name="toast">
        <div v-if="toast.visible"
          class="fixed bottom-6 right-6 z-[60] flex items-center gap-3 px-4 py-3 rounded-sm shadow-xl text-white text-xs font-bold font-mono uppercase"
          :class="toast.type === 'success' ? 'bg-green-600' : 'bg-red-500'">
          <i :class="toast.type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'"></i>
          {{ toast.message }}
        </div>
      </transition>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import API_BASE_URL, { authFetch } from '@/api_services/api';
import { getModuleCards } from '@/config/moduleCards';

const loading = ref(false);
const error = ref(null);
const tenants = ref([]);
const selectedTenant = ref(null);
const showModal = ref(false);
const selectedUser = ref(null);
const selectedModules = ref([]);
const assigning = ref(false);
const toast = ref({ visible: false, message: '', type: 'success' });

const allModules = computed(() => getModuleCards());

const ownerModules = computed(() => {
  if (!selectedTenant.value) return [];
  const subs = selectedTenant.value.module_subscriptions?.owner;
  if (subs?.length) return subs[0].modules || [];
  return [];
});

const availableModules = computed(() => {
  // Show only modules the owner has subscribed to + free modules
  const ownerMods = ownerModules.value;
  return allModules.value.filter(m => ownerMods.includes(m.id) || m.free);
});

const adminPages = computed(() => {
  return allModules.value.filter(m => m.adminPage === true);
});

const regularModules = computed(() => {
  return availableModules.value.filter(m => !m.adminPage);
});

function getUserModules(email) {
  if (!selectedTenant.value) return [];
  const attendants = selectedTenant.value.module_subscriptions?.attendants || [];
  const found = attendants.find(a => a.email === email);
  return found?.modules || [];
}

const showToast = (message, type = 'success') => {
  toast.value = { visible: true, message, type };
  setTimeout(() => { toast.value.visible = false; }, 3500);
};

async function fetchTenants() {
  loading.value = true;
  error.value = null;
  try {
    const res = await authFetch(`${API_BASE_URL}/superadmin/tenant-users`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    tenants.value = data.tenants || [];
  } catch (e) {
    console.error('tenant-users:', e);
    error.value = e.message || 'Failed to load tenants';
  } finally {
    loading.value = false;
  }
}

function openAssignModal(user) {
  selectedUser.value = user;
  selectedModules.value = [...getUserModules(user.email)];
  showModal.value = true;
}

async function submitAssignment() {
  if (!selectedUser.value || !selectedTenant.value) return;
  assigning.value = true;
  try {
    const modulesStr = selectedModules.value.join(',');
    const res = await authFetch(
      `${API_BASE_URL}/superadmin/assign-user-modules?tenant_id=${selectedTenant.value.tenant_id}&user_email=${encodeURIComponent(selectedUser.value.email)}&modules=${encodeURIComponent(modulesStr)}`,
      { method: 'POST' }
    );
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.detail || `HTTP ${res.status}`);
    }
    showToast(`Modules assigned to ${selectedUser.value.email}`, 'success');
    showModal.value = false;
    // Refresh tenant data
    await fetchTenants();
    // Re-select the same tenant
    const refreshed = tenants.value.find(t => t.tenant_id === selectedTenant.value.tenant_id);
    if (refreshed) selectedTenant.value = refreshed;
  } catch (e) {
    console.error('assign-modules:', e);
    showToast(e.message || 'Assignment failed', 'error');
  } finally {
    assigning.value = false;
  }
}

onMounted(() => {
  fetchTenants();
});
</script>

<style scoped>
.mesh-background {
  background-color: #ffffff;
  background-image:
    linear-gradient(#f3f4f6 1px, transparent 1px),
    linear-gradient(90deg, #f3f4f6 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: center center;
}

.animate-fade-in {
  animation: fadeIn 0.35s ease;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.animate-slide-up {
  animation: slideUp 0.25s ease;
}
@keyframes slideUp {
  from { transform: translateY(100%); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}

.toast-enter-active, .toast-leave-active { transition: all .3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(12px); }
</style>
