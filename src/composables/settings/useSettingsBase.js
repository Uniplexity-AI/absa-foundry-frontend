import axios from 'axios'
import { ref, reactive, computed } from 'vue'
import { toast } from 'vue3-toastify'
import { decodeJWT } from '@/api_services/decodeJWT'
import currencyService from '@/services/currencyService.js'
import { useCurrency } from '@/composables/useCurrency.js'
import { useConfirmDialog } from '@/composables/useConfirmDialog.js'
import API_BASE_URL from '@/api_services/api'
import { mapFrontendToBackend } from '@/config/moduleIdMap'
import { useDashboardStore } from '@/stores/dashboard'
import { useAuthStore } from '@/stores/auth'
// import { usePricingStore } from '@/stores/pricingStore'
import { useRBAC } from '@/composables/useRBAC'
import { usePreferences } from '@/config/usePreferences.js'
import { useAudit } from '@/config/useAudit.js'
import {
  DEFAULT_ROLES, PERMISSION_ENTITIES, PERMISSION_TYPES, ALL_PERMISSIONS,
  getPermissionsForEntity, ORGANIZATION_TYPES, ACCESS_SCOPES,
  FONT_FAMILIES, FONT_SIZES, THEME_MODES,
  UI_CARD_RADIUS_OPTIONS, UI_BUTTON_RADIUS_OPTIONS, UI_INPUT_RADIUS_OPTIONS,
  UI_BUTTON_STYLE_OPTIONS, UI_CARD_ELEVATION_OPTIONS, UI_PATTERN_OPTIONS,
  UI_VISUAL_STYLE_OPTIONS, UI_VISUAL_STYLE_PRESETS,
  DEFAULT_BRAND_COLORS, DEFAULT_UI_PREFERENCES, ORIGINAL_UI_PREFERENCES
} from '@/config/rbac'

export function useSettingsBase() {
  const { getTenantId, getUserRole, getUserEmail } = decodeJWT()
  const dashboardStore = useDashboardStore()
  const { fetchModules } = dashboardStore
  const authStore = useAuthStore()
  const pricingStore = reactive({ config: null, fetchConfig: () => {} })
  const {
    confirmState: settingsConfirmState,
    openConfirm: openSettingsConfirm,
    cancelConfirm: closeSettingsConfirm,
    confirmAction: handleSettingsConfirm,
  } = useConfirmDialog()
  const { preferences: brandPrefs, savePreferences: saveBrandPrefs } = usePreferences()
  const { logAudit } = useAudit()
  const { hasPermission, initializeRBAC, isAdmin, isSuperAdmin, tenantUIPreferences, updateUIPreferences, applyUIPreferences, createRole, updateRole, deleteRole, tenantRoles } = useRBAC()
  const { formatCurrency, formatCurrencyCompact, currencyCode } = useCurrency()

  const tenantId = computed(() => getTenantId())
  const userRole = ref(getUserRole() || 'user')
  const userEmail = computed(() => getUserEmail())

  const isInitializing = ref(true)
  const uiPreferencesForm = ref({ ...DEFAULT_UI_PREFERENCES })
  const isUIPreferencesLoading = ref(false)

  // ── Tabs ──────────────────────────────────────────────────────
  const activeTab = ref('profile')
  const tabs = [
    { id: 'profile', name: 'Profile', icon: 'fas fa-user-circle' },
    { id: 'email', name: 'Email', icon: 'fas fa-envelope-open-text' },
    { id: 'modules', name: 'Modules', icon: 'fas fa-puzzle-piece' },
    { id: 'roles', name: 'Roles', icon: 'fas fa-user-shield' },
    { id: 'organizations', name: 'Organizations', icon: 'fas fa-building' },
    { id: 'approvals', name: 'Approvals', icon: 'fas fa-check-double' },
    { id: 'branding', name: 'Branding', icon: 'fas fa-palette' },
    { id: 'currency', name: 'Currency', icon: 'fas fa-coins' },
    { id: 'ai-agents', name: 'AI Agents', icon: 'fas fa-robot' },
    { id: 'integrations', name: 'Integrations', icon: 'fab fa-telegram-plane' },
    { id: 'notifications', name: 'Notifications', icon: 'fas fa-bell' },
    { id: 'audit', name: 'Audit Log', icon: 'fas fa-clipboard-list' }
  ]

  function resetActiveTab() {
    activeTab.value = 'profile'
  }

  // ── Owner Subscription ────────────────────────────────────────
  const ownerSubscription = ref(null)
  const subscribedModules = ref([])

  async function fetchOwnerSubscription() {
    try {
      const tid = tenantId.value
      if (!tid) return
      const res = await fetch(`${API_BASE_URL}/modules-manager/owner/subscription?tenant_id=${tid}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      })
      if (res.ok) ownerSubscription.value = await res.json()
    } catch (e) {
      console.warn('Failed to fetch owner subscription', e)
    }
  }

  // ── Pricing Calculator State ──────────────────────────────────
  const selectedTierId = ref(null)
  const customMonths = ref(1)
  const customUsers = ref(null)
  const users = ref([])
  const customBranches = ref(null)
  const selectedModuleIds = reactive(new Set())
  const moduleInputs = reactive({ ub_recruiter: 10 })
  const expandedModuleDetails = reactive(new Set())
  const selectedStorageId = ref(null)
  const showCalculatorSuccess = ref('')
  const branchesCount = ref(0)
  const storageUsage = ref({ total_mb: 0 })

  const config = computed(() => pricingStore.config || {})

  const activeSubscriptionKPIs = computed(() => {
    if (!config.value) return null
    const sub = ownerSubscription.value
    const tierKey = (sub && sub.tier) ? sub.tier : selectedTierId.value
    const tier = config.value.tiers[tierKey] || Object.values(config.value.tiers)[0]

    let totalCost = 0
    if (sub && sub.total_est) {
      totalCost = parseFloat(sub.total_est)
    } else if (Array.isArray(config.value.modules)) {
      const priceMap = {}
      config.value.modules.forEach(cat => {
        if (cat && Array.isArray(cat.items)) {
          cat.items.forEach(mod => { priceMap[mod.id] = mod })
        }
      })
      const subIds = new Set(subscribedModules.value.map(m => m.id))
      const hasHR = subIds.has('hrmodule')
      const hasFinance = subIds.has('finance')
      const hasInventory = subIds.has('inventory')
      const hasCopilot = subIds.has('ai')

      subscribedModules.value.forEach(m => {
        const mod = priceMap[m.id]
        if (!mod || mod.included) return
        if (hasHR && ['payroll', 'project-management', 'ub_recruiter'].includes(m.id)) return
        if (hasFinance && ['expenses', 'reports'].includes(m.id)) return
        if (hasInventory && m.id === 'supplier') return
        if (hasCopilot && m.id === 'image-capture') return
        let price = mod.price || 0
        if (tier.discountPercentage) price -= price * (tier.discountPercentage / 100)
        totalCost += price
      })
    }

    const moduleCount = subscribedModules.value.length
    const actualBranches = branchesCount.value || 1
    const usersAllowed = (sub && sub.custom_users) || tier.maxUsers
    const storageMB = storageUsage.value.total_mb || 0

    return [
      { label: 'Plan Type', value: tier.label, icon: 'fas fa-shield-alt', color: 'text-blue-600' },
      { label: 'Est. Cost', value: `${config.value.baseCurrency}${totalCost.toLocaleString()}`, icon: 'fas fa-wallet', color: 'text-green-600' },
      { label: 'Modules', value: moduleCount, icon: 'fas fa-cubes', color: 'text-purple-600' },
      { label: 'Branches', value: actualBranches, icon: 'fas fa-map-marker-alt', color: 'text-orange-600' },
      { label: 'Users Allowed', value: usersAllowed, icon: 'fas fa-users', color: 'text-cyan-600' },
      { label: 'Storage Used', value: `${storageMB.toFixed(2)} MB`, icon: 'fas fa-hdd', color: 'text-indigo-600' },
    ]
  })

  const toggleModuleDetails = (moduleId) => {
    if (expandedModuleDetails.has(moduleId)) expandedModuleDetails.delete(moduleId)
    else expandedModuleDetails.add(moduleId)
  }

  const selectTier = (tierId) => {
    const tier = config.value?.tiers?.[tierId]
    if (!tier) return
    selectedTierId.value = tierId
    customUsers.value = tier.maxUsers
    customBranches.value = tier.maxBranches
    selectedStorageId.value = null
    if (Array.isArray(config.value?.modules)) {
      config.value.modules.forEach(cat => {
        if (cat && Array.isArray(cat.items)) {
          cat.items.forEach(mod => {
            if (mod.included) selectedModuleIds.add(mod.id)
          })
        }
      })
    }
  }

  const formatDiscount = (percentage) => percentage === 0 ? 'BASE' : `${percentage}% OFF`

  const calculateModulePrice = (module) => {
    if (module.included) return 0
    if (!selectedTierId.value) return module.price
    const tier = config.value?.tiers?.[selectedTierId.value]
    if (!tier) return module.price
    const discount = module.price * ((tier.discountPercentage || 0) / 100)
    return module.price - discount
  }

  const isModuleSelected = (id) => selectedModuleIds.has(id)

  const formatStorage = (mb) => {
    if (!mb && mb !== 0) return 'Unlimited'
    return mb >= 1024 ? (mb / 1024) + ' GB' : mb + ' MB'
  }

  const isTierCapacityExceeded = (tierId) => {
    const tier = config.value.tiers[tierId]
    if (!tier || !tier.baseStorageMB) return false
    const totalStorageUsed = subscribedModules.value.reduce((sum, sub) => sum + parseFloat(sub.storage_used || 0), 0)
    return totalStorageUsed > tier.baseStorageMB
  }

  const toggleModuleSelection = (id, module) => {
    if (module.included) return
    if (selectedModuleIds.has(id)) selectedModuleIds.delete(id)
    else selectedModuleIds.add(id)
  }

  const activeCycle = computed(() => {
    const m = customMonths.value || 1
    const cycles = config.value?.billingCycles || {}
    if (m % 12 === 0) return cycles.yearly
    if (m % 3 === 0) return cycles.quarterly
    return cycles.monthly
  })

  const totals = computed(() => {
    if (!selectedTierId.value || !config.value) return { modulesCost: 0, grandTotal: 0 }
    let modulesCost = 0
    const isHRSelected = selectedModuleIds.has('hrmodule')
    const isFinanceSelected = selectedModuleIds.has('finance')
    const isInventorySelected = selectedModuleIds.has('inventory')
    const isCopilotSelected = selectedModuleIds.has('ai')

    if (Array.isArray(config.value.modules)) {
      config.value.modules.forEach(cat => {
        if (cat && Array.isArray(cat.items)) {
          cat.items.forEach(mod => {
            if (selectedModuleIds.has(mod.id)) {
              if (isHRSelected && ['payroll', 'project-management', 'ub_recruiter'].includes(mod.id)) return
              if (isFinanceSelected && mod.id === 'expenses') return
              if (isFinanceSelected && mod.id === 'reports') return
              if (isInventorySelected && mod.id === 'supplier') return
              if (isCopilotSelected && mod.id === 'image-capture') return
              let price = calculateModulePrice(mod)
              if (mod.id === 'ub_recruiter') price *= (moduleInputs.ub_recruiter || 0)
              modulesCost += price
            }
          })
        }
      })
    }

    const tier = config.value.tiers?.[selectedTierId.value]
    if (!tier) return { modulesCost, grandTotal: modulesCost }
    const extraUsers = Math.max(0, (customUsers.value || 0) - (tier.maxUsers || 0))
    const extraBranches = Math.max(0, (customBranches.value || 0) - (tier.maxBranches || 0))
    const surcharges = config.value.surcharges || {}
    const extraUserCost = (modulesCost * ((surcharges.extraUserPercentage || 0) / 100)) * extraUsers
    const extraBranchCost = (modulesCost * ((surcharges.extraBranchPercentage || 0) / 100)) * extraBranches
    const storageOption = (surcharges.storageOptions || []).find(o => o.id === selectedStorageId.value)
    const storageCost = storageOption ? storageOption.price : 0
    const monthlySubTotal = modulesCost + extraUserCost + extraBranchCost + storageCost
    const grossTotal = monthlySubTotal * (customMonths.value || 1)
    const discountPercentage = activeCycle.value?.discountPercentage || 0
    const discountAmount = grossTotal * (discountPercentage / 100)
    return {
      modulesCost, extraUsers, extraUserCost, extraBranches, extraBranchCost, storageCost,
      discountAmount, grandTotal: grossTotal - discountAmount,
      monthlyEquivalent: (grossTotal - discountAmount) / (customMonths.value || 1)
    }
  })

  const selectedModulesCount = computed(() => {
    if (!config.value || !Array.isArray(config.value.modules)) return 0
    let count = 0
    selectedModuleIds.forEach(id => {
      const isIncluded = config.value.modules.some(c => c && Array.isArray(c.items) && c.items.some(m => m.id === id && m.included))
      if (!isIncluded) count++
    })
    return count
  })

  const handleUpgradeSubscription = async () => {
    if (!selectedTierId.value) return toast.warning('Please select a Business Tier first.')
    try {
      const modulesToRequest = Array.from(selectedModuleIds)
      const cycle = activeCycle.value.id || 'monthly'
      const mappedModules = [...new Set(modulesToRequest.map(mid => mapFrontendToBackend(mid) || mid))]
      const selectedTier = selectedTierId.value
      const payload = {
        modules: mappedModules, cycle, tier: selectedTier,
        custom_users: customUsers.value, custom_branches: customBranches.value,
        selected_storage_id: selectedStorageId.value,
        total_est: totals.value.grandTotal, timestamp: new Date().toISOString()
      }
      const { requestModuleSubscription } = await import('@/api_services/modules_api.js')
      await requestModuleSubscription(mappedModules, cycle, selectedTier, payload)
      showCalculatorSuccess.value = `Upgrade Request Submitted!\n\nTier: ${config.value.tiers[selectedTierId.value].label}\nRequested Users: ${customUsers.value}\nRequested Branches: ${customBranches.value}\nTotal Est: ${config.value.baseCurrency}${totals.value.grandTotal.toLocaleString()}`
      alert(showCalculatorSuccess.value)
      await fetchModules()
    } catch (err) {
      console.error('Upgrade failed', err)
      toast.error('Failed to update subscription: ' + err.message)
    }
  }

  const incrementUsers = () => customUsers.value++
  const decrementUsers = () => { if (customUsers.value > 1) customUsers.value-- }
  const incrementBranches = () => customBranches.value++
  const decrementBranches = () => { if (customBranches.value > 1) customBranches.value-- }
  const incrementMonths = () => customMonths.value++

  const availablePermissions = computed(() => {
    // If config isn't loaded yet or subscribed modules haven't been fetched,
    // show all available permission entities.
    if (!config.value || !subscribedModules.value) return PERMISSION_ENTITIES
    // If no modules are subscribed yet, show all entities so the admin
    // can still configure roles with full permissions upfront.
    if (subscribedModules.value.length === 0) return PERMISSION_ENTITIES
    const subIds = new Set(subscribedModules.value.map(m => m.id))
    const orderedModules = []
    config.value.modules.forEach(cat => {
      cat.items.forEach(item => {
        if (subIds.has(item.id)) orderedModules.push(item.id)
      })
    })
    return PERMISSION_ENTITIES.filter(entity => {
      return subIds.has(entity.id) || orderedModules.some(mid => mid === entity.id || mid.includes(entity.id))
    })
  })

  // ── Navigation ────────────────────────────────────────────────
  function navigateTo(path) {
    const router = import('vue-router').then(m => m.useRouter())
    // injected by page
  }

  // ── ALL_POS_ADDONS (default set of POS feature-addon keys) ───
  const ALL_POS_ADDONS = [
    'view_kpis',
    'view_history',
    'view_sales',
    'view_settings',
    'view_reconciliation',
  ]

  return {
    // deps
    axios, toast,
    API_BASE_URL, getTenantId, getUserRole, getUserEmail,
    tenantId, userRole, userEmail,
    decodeJWT, currencyService,
    formatCurrency, formatCurrencyCompact, currencyCode,
    settingsConfirmState, openSettingsConfirm, closeSettingsConfirm, handleSettingsConfirm,
    brandPrefs, saveBrandPrefs, logAudit,
    hasPermission, initializeRBAC, isAdmin, isSuperAdmin,
    tenantUIPreferences, updateUIPreferences, applyUIPreferences,
    createRole, updateRole, deleteRole, tenantRoles,
    dashboardStore, authStore, pricingStore, fetchModules,
    // constants
    DEFAULT_ROLES, PERMISSION_ENTITIES, PERMISSION_TYPES, ALL_PERMISSIONS,
    getPermissionsForEntity, ORGANIZATION_TYPES, ACCESS_SCOPES,
    FONT_FAMILIES, FONT_SIZES, THEME_MODES,
    UI_CARD_RADIUS_OPTIONS, UI_BUTTON_RADIUS_OPTIONS, UI_INPUT_RADIUS_OPTIONS,
    UI_BUTTON_STYLE_OPTIONS, UI_CARD_ELEVATION_OPTIONS, UI_PATTERN_OPTIONS,
    UI_VISUAL_STYLE_OPTIONS, UI_VISUAL_STYLE_PRESETS,
    DEFAULT_BRAND_COLORS, DEFAULT_UI_PREFERENCES, ORIGINAL_UI_PREFERENCES,
    // tabs
    activeTab, tabs, resetActiveTab,
    // subscription
    ownerSubscription, subscribedModules, fetchOwnerSubscription,
    // calculator
    selectedTierId, customMonths, customUsers, users, customBranches,
    selectedModuleIds, moduleInputs, expandedModuleDetails,
    selectedStorageId, showCalculatorSuccess,
    branchesCount, storageUsage,
    config, activeSubscriptionKPIs, totals, selectedModulesCount,
    activeCycle,
    toggleModuleDetails, selectTier, formatDiscount,
    calculateModulePrice, isModuleSelected, formatStorage,
    isTierCapacityExceeded, toggleModuleSelection,
    handleUpgradeSubscription,
    incrementUsers, decrementUsers, incrementBranches, decrementBranches, incrementMonths,
    availablePermissions,
    isInitializing,
    uiPreferencesForm,
    isUIPreferencesLoading,
    ALL_POS_ADDONS,
  }
}
