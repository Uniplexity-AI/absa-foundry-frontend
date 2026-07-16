import { ref, computed } from 'vue'
import { toast } from 'vue3-toastify'
import { useSettingsBase } from './useSettingsBase'

export function useSettingsRoles() {
  const {
    DEFAULT_ROLES, getPermissionsForEntity, ALL_POS_ADDONS,
    availablePermissions,
    tenantRoles: rbacTenantRoles,
    deleteRole: rbacDeleteRole,
  } = useSettingsBase()

  // These come from useRBAC which is set up in the page
  const showRoleModal = ref(false)
  const editingRole = ref(null)
  const roleForm = ref({ permissions: {}, name: '', id: '' })
  const roleFormErrors = ref([])
  const rbacSuccess = ref(false)
  const rbacFeedbackMessage = ref('')
  const originalRoleForm = ref(null)

  // visibleTenantRoles is derived from the RBAC tenantRoles (source of truth)
  const visibleTenantRoles = computed(() => rbacTenantRoles.value || [])

  // tenantRoles alias for compatibility
  const tenantRoles = computed(() => rbacTenantRoles.value || [])

  const ENTITIES_WITH_ADDONS = new Set(['pos', 'assets-manager'])
  const expandedAddons = ref({})

  const ADMIN_ONLY_ROLE_IDS = ['admin', 'super_admin']
  const ADMIN_ONLY_ROLE_NAMES = ['admin', 'super admin', 'superadmin']

  const POS_ADDON_FEATURES = [
    { key: 'view_kpis',          label: 'Show KPIs',         icon: 'fas fa-chart-line',     desc: 'KPI cards in POS toolbar' },
    { key: 'view_history',       label: 'Show History',       icon: 'fas fa-history',        desc: 'Transaction history panel' },
    { key: 'view_sales',         label: 'Sales Access',       icon: 'fas fa-receipt',        desc: 'Sales / Transactions link' },
    { key: 'view_settings',      label: 'POS Settings',       icon: 'fas fa-sliders-h',      desc: 'Beep & volume controls' },
    { key: 'view_reconciliation', label: 'Reconciliation',    icon: 'fas fa-balance-scale',   desc: 'Cash reconciliation tab on Cash-In page' },
  ]

  const ASSET_SCOPE_FIELDS = [
    { key: 'allowedDepartments', label: 'Allowed Departments', icon: 'fas fa-building', placeholder: 'e.g. Operations, Finance', desc: 'Only assets in these departments will be visible' },
    { key: 'allowedLocations',   label: 'Allowed Locations',   icon: 'fas fa-map-marker-alt', placeholder: 'e.g. HQ, Site-A', desc: 'Only assets at these locations will be visible' },
    { key: 'allowedCategories',  label: 'Allowed Categories',  icon: 'fas fa-tags', placeholder: 'e.g. Vehicles, IT Equipment', desc: 'Only assets in these categories will be visible' },
  ]

  function hasAddon(entityId) { return ENTITIES_WITH_ADDONS.has(entityId) }
  function toggleAddon(entityId) { expandedAddons.value = { ...expandedAddons.value, [entityId]: !expandedAddons.value[entityId] } }
  function isAddonOpen(entityId) { return !!expandedAddons.value[entityId] }

  function getPosAddon(featureKey) {
    const addons = roleForm.value.permissions?.['pos_addons']
    if (!Array.isArray(addons)) return true
    return addons.includes(featureKey)
  }

  function togglePosAddon(featureKey) {
    const current = Array.isArray(roleForm.value.permissions?.['pos_addons'])
      ? [...roleForm.value.permissions['pos_addons']] : [...ALL_POS_ADDONS]
    const idx = current.indexOf(featureKey)
    if (idx >= 0) current.splice(idx, 1); else current.push(featureKey)
    roleForm.value = { ...roleForm.value, permissions: { ...roleForm.value.permissions, pos_addons: current } }
  }

  function syncPosPermsToLocalStorage() {
    try {
      const translated = {}
      for (const role of tenantRoles.value) {
        const rId = (role.id || '').toLowerCase()
        if (!rId) continue
        const addons = role.permissions?.pos_addons
        if (rId === 'owner' || rId === 'admin') {
          translated[rId] = { viewKpis: true, viewHistory: true, viewSales: true, viewSettings: true }
        } else if (Array.isArray(addons)) {
          translated[rId] = {
            viewKpis: addons.includes('view_kpis'), viewHistory: addons.includes('view_history'),
            viewSales: addons.includes('view_sales'), viewSettings: addons.includes('view_settings'),
          }
        } else {
          translated[rId] = { viewKpis: true, viewHistory: true, viewSales: true, viewSettings: true }
        }
      }
      if (Object.keys(translated).length > 0) localStorage.setItem('pos_role_perms', JSON.stringify(translated))
    } catch (e) { console.warn('[Settings] Failed to sync POS perms to localStorage:', e) }
  }

  const isRoleDirty = computed(() => {
    if (!originalRoleForm.value) return true
    return JSON.stringify(roleForm.value) !== JSON.stringify(originalRoleForm.value)
  })

  function openRoleModal(role = null) {
    if (role) { editingRole.value = role; roleForm.value = JSON.parse(JSON.stringify(role)) }
    else { editingRole.value = null; roleForm.value = { permissions: {}, name: '', id: '' } }
    if (!Array.isArray(roleForm.value.permissions?.['pos_addons'])) {
      roleForm.value = { ...roleForm.value, permissions: { ...roleForm.value.permissions, pos_addons: [...ALL_POS_ADDONS] } }
    }
    if (!roleForm.value.assetScope || typeof roleForm.value.assetScope !== 'object') {
      roleForm.value.assetScope = { allowedDepartments: [], allowedLocations: [], allowedCategories: [] }
    } else {
      roleForm.value.assetScope = {
        allowedDepartments: Array.isArray(roleForm.value.assetScope.allowedDepartments) ? roleForm.value.assetScope.allowedDepartments : [],
        allowedLocations: Array.isArray(roleForm.value.assetScope.allowedLocations) ? roleForm.value.assetScope.allowedLocations : [],
        allowedCategories: Array.isArray(roleForm.value.assetScope.allowedCategories) ? roleForm.value.assetScope.allowedCategories : [],
      }
    }
    originalRoleForm.value = JSON.parse(JSON.stringify(roleForm.value))
    roleFormErrors.value = []
    showRoleModal.value = true
  }

  function closeRoleModal() {
    showRoleModal.value = false; editingRole.value = null
    roleForm.value = { permissions: {}, name: '', id: '' }; roleFormErrors.value = []
  }

  function togglePermission(entityId, permission) {
    if (!roleForm.value.permissions[entityId]) roleForm.value.permissions[entityId] = []
    const perms = roleForm.value.permissions[entityId]
    const idx = perms.indexOf(permission)
    if (idx >= 0) perms.splice(idx, 1); else perms.push(permission)
  }

  function toggleAllEntityPermissions(entityId) {
    if (!roleForm.value.permissions[entityId]) roleForm.value.permissions[entityId] = []
    const perms = roleForm.value.permissions[entityId]
    const entityPermissions = getPermissionsForEntity(entityId)
    if (perms.length === entityPermissions.length) roleForm.value.permissions[entityId] = []
    else roleForm.value.permissions[entityId] = [...entityPermissions]
  }

  function hasEntityPermission(entityId, permission) {
    return roleForm.value.permissions[entityId]?.includes(permission) || false
  }

  function setAssetScope(field, raw) {
    if (!roleForm.value.assetScope) roleForm.value.assetScope = { allowedDepartments: [], allowedLocations: [], allowedCategories: [] }
    roleForm.value.assetScope[field] = String(raw || '').split(',').map(s => s.trim()).filter(Boolean)
  }

  async function saveRole(createRole, updateRole) {
    roleFormErrors.value = []
    if (!roleForm.value.name?.trim()) roleFormErrors.value.push('Role name is required')
    if (!roleForm.value.id?.trim() && !editingRole.value) {
      roleForm.value.id = roleForm.value.name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
    }
    if (roleFormErrors.value.length > 0) return
    try {
      if (editingRole.value) { await updateRole(editingRole.value.id, roleForm.value); rbacFeedbackMessage.value = 'Role updated successfully' }
      else { await createRole(roleForm.value); rbacFeedbackMessage.value = 'Role created successfully' }
      rbacSuccess.value = true; setTimeout(() => { rbacSuccess.value = false }, 3000)
      syncPosPermsToLocalStorage(); closeRoleModal()
    } catch (err) { roleFormErrors.value.push(err.message) }
  }

  async function handleDeleteRole(roleId) {
    const role = tenantRoles.value.find(r => r.id === roleId)
    if (role?.id === 'owner') return toast.warning('The Owner role cannot be deleted')
    if (role?.isSystem) return toast.warning('System roles cannot be deleted')
    if (!window.confirm(`Are you sure you want to delete the role "${role?.name}"?`)) return
    try {
      await rbacDeleteRole(roleId);
      rbacFeedbackMessage.value = 'Role deleted successfully';
      rbacSuccess.value = true;
      setTimeout(() => { rbacSuccess.value = false }, 3000);
    } catch (err) {
      toast.error(err.message);
    }
  }

  return {
    visibleTenantRoles, tenantRoles,
    showRoleModal, editingRole, roleForm, roleFormErrors,
    rbacSuccess, rbacFeedbackMessage, originalRoleForm,
    expandedAddons,
    ENTITIES_WITH_ADDONS, POS_ADDON_FEATURES, ASSET_SCOPE_FIELDS,
    ADMIN_ONLY_ROLE_IDS, ADMIN_ONLY_ROLE_NAMES,
    isRoleDirty,
    getPosAddon, togglePosAddon, syncPosPermsToLocalStorage,
    hasAddon, toggleAddon, isAddonOpen,
    openRoleModal, closeRoleModal,
    togglePermission, toggleAllEntityPermissions, hasEntityPermission,
    setAssetScope, saveRole, handleDeleteRole
  }
}
