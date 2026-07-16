import { ref, computed, reactive } from 'vue'
import { toast } from 'vue3-toastify'
import { mapFrontendToBackend, mapBackendToFrontend } from '@/config/moduleIdMap'
import { getAvailableModules, getModuleCards } from '@/config/moduleCards'
import { getModuleStatuses, requestModuleSubscription } from '@/api_services/modules_api.js'
import { useSettingsBase } from './useSettingsBase'

export function useSettingsModules() {
  const {
    getTenantId, API_BASE_URL, toast: t,
    selectedTierId, customMonths, customUsers, customBranches,
    selectedModuleIds, moduleInputs, expandedModuleDetails,
    selectedStorageId, showCalculatorSuccess,
    config, ownerSubscription, fetchOwnerSubscription,
    fetchModules, selectTier, selectTier: autoSelectTier,
    totals, incrementUsers, decrementUsers,
    incrementBranches, decrementBranches, incrementMonths,
    toggleModuleDetails, isModuleSelected, calculateModulePrice, formatDiscount,
    isTierCapacityExceeded, isInitializing
  } = useSettingsBase()

  const availableModules = getAvailableModules()
  const allModuleCards = getModuleCards().filter(c => c.id !== 'admin' && c.id !== 'mining')

  const subscribedModules = ref([])
  const pendingModules = ref([])
  const subscriptionDetails = ref([])
  const modulePaymentPlans = ref(loadPaymentPlansCache())
  const moduleSubscriptionDetails = ref(loadSubscriptionDetailsCache())
  const branchesCount = ref(1)
  const storageUsage = ref({ data_size_mb: 0, storage_size_mb: 0, total_mb: 0 })
  const unsubscribingModules = ref({})
  const subscribingModules = ref({})

  const OWNER_REQUESTS_CACHE_KEY = 'ub_owner_module_requests_cache_v1'
  const PAYMENT_PLANS_CACHE_KEY = 'ub_module_payment_plans_v1'
  const SUBSCRIPTION_DETAILS_CACHE_KEY = 'ub_subscription_details_v1'

  function loadOwnerRequestsCache() {
    try { return JSON.parse(localStorage.getItem(OWNER_REQUESTS_CACHE_KEY) || '[]') }
    catch { return [] }
  }
  function saveOwnerRequestsCache(arr) {
    try { localStorage.setItem(OWNER_REQUESTS_CACHE_KEY, JSON.stringify(Array.from(new Set(arr || [])))) }
    catch {}
  }
  function loadPaymentPlansCache() {
    try { return JSON.parse(localStorage.getItem(PAYMENT_PLANS_CACHE_KEY) || '{}') }
    catch { return {} }
  }
  function savePaymentPlansCache(plans) {
    try { localStorage.setItem(PAYMENT_PLANS_CACHE_KEY, JSON.stringify(plans || {})) }
    catch {}
  }
  function loadSubscriptionDetailsCache() {
    try { return JSON.parse(localStorage.getItem(SUBSCRIPTION_DETAILS_CACHE_KEY) || '{}') }
    catch { return {} }
  }
  function saveSubscriptionDetailsCache(details) {
    try { localStorage.setItem(SUBSCRIPTION_DETAILS_CACHE_KEY, JSON.stringify(details || {})) }
    catch {}
  }

  // Initialize default payment plans
  availableModules.forEach(module => {
    if (!modulePaymentPlans.value[module.id]) {
      modulePaymentPlans.value[module.id] = 'monthly'
    }
  })

  function getPaymentPlanLabel(plan) {
    const labels = { monthly: 'Monthly', '2months': '2 Months', quarterly: 'Quarterly (3 Months)', '6months': '6 Months', yearly: 'Yearly' }
    return labels[plan] || plan
  }

  function getModulePlanTotal(mod, plan) {
    const monthsMap = { monthly: 1, '2months': 2, quarterly: 3, '6months': 6, yearly: 12 }
    const months = monthsMap[plan] || 1
    const basePrice = mod.price || 0
    const cycles = config.value?.billingCycles || { monthly: {}, quarterly: { discountPercentage: 4 }, yearly: { discountPercentage: 9 } }
    let discount = 0
    if (months >= 12) discount = cycles?.yearly?.discountPercentage || 9
    else if (months >= 3) discount = cycles?.quarterly?.discountPercentage || 4
    const total = basePrice * months
    return Math.round(total * (1 - discount / 100) * 100) / 100
  }

  function getModulePaymentPlan(moduleId) {
    return moduleSubscriptionDetails.value[moduleId]?.payment_plan || modulePaymentPlans.value[moduleId] || 'monthly'
  }

  function getModuleDueDate(moduleId) {
    return moduleSubscriptionDetails.value[moduleId]?.due_date || null
  }

  function isModuleDueSoon(moduleId) {
    const dueDate = getModuleDueDate(moduleId)
    if (!dueDate) return false
    const daysUntilDue = Math.ceil((new Date(dueDate) - new Date()) / (1000 * 60 * 60 * 24))
    return daysUntilDue <= 7 && daysUntilDue >= 0
  }

  function formatDueDate(dateString) {
    if (!dateString) return 'Not set'
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  const addPending = (moduleId) => {
    if (!moduleId) return
    pendingModules.value = Array.from(new Set([...(pendingModules.value || []), moduleId]))
    saveOwnerRequestsCache(pendingModules.value)
  }

  const removePending = (moduleId) => {
    if (!moduleId) return
    pendingModules.value = (pendingModules.value || []).filter(m => m !== moduleId)
    saveOwnerRequestsCache(pendingModules.value)
  }

  const isModulePending = (moduleId) => (pendingModules.value || []).includes(moduleId)
  function isModuleSubscribed(moduleId) { return subscribedModules.value.some(m => m.id === moduleId) }

  async function fetchOwnerRequests() {
    try {
      const statuses = await getModuleStatuses()
      pendingModules.value = (statuses.pending || []).flatMap(id => mapBackendToFrontend(id))
      saveOwnerRequestsCache(pendingModules.value)
    } catch (err) {
      console.debug('Could not load owner module requests:', err)
      pendingModules.value = Array.isArray(loadOwnerRequestsCache()) ? loadOwnerRequestsCache() : []
    }
  }

  async function fetchSubscribedModules() {
    try {
      const statuses = await getModuleStatuses()
      const activeFrontendIds = (statuses.active || []).flatMap(id => mapBackendToFrontend(id))
      subscribedModules.value = availableModules.filter(module =>
        !module.requiresSubscription || activeFrontendIds.includes(module.id)
      )
      subscribedModules.value.forEach(m => selectedModuleIds.add(m.id))
      pendingModules.value = (statuses.pending || []).flatMap(id => mapBackendToFrontend(id))
      saveOwnerRequestsCache(pendingModules.value)
      try {
        const detailsRes = await fetch(`${API_BASE_URL}/modules-manager/owner/subscription-details?tenant_id=${getTenantId()}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        if (detailsRes.ok) {
          const detailsData = await detailsRes.json()
          if (detailsData.subscriptions && Array.isArray(detailsData.subscriptions)) {
            const details = {}
            detailsData.subscriptions.forEach(sub => {
              if (sub.module_id) {
                details[sub.module_id] = {
                  payment_plan: sub.payment_plan || 'monthly',
                  due_date: sub.due_date || null,
                  subscribed_at: sub.subscribed_at || sub.created_at || null
                }
              }
            })
            moduleSubscriptionDetails.value = details
            saveSubscriptionDetailsCache(details)
          }
        }
      } catch (detailsErr) {
        console.warn('Could not fetch subscription details:', detailsErr)
      }
    } catch (err) {
      console.error('Error fetching modules:', err)
      subscribedModules.value = availableModules.filter(module => !module.requiresSubscription)
    }
  }

  const filteredModules = computed(() =>
    availableModules.map(module => ({
      ...module,
      available: !module.requiresSubscription || subscribedModules.value.some(m => m.id === module.id)
    }))
  )

  const activeModulesList = computed(() => {
    const subIds = new Set(subscribedModules.value.map(m => m.id))
    return allModuleCards.filter(c => subIds.has(c.id))
  })

  const inactiveModulesList = computed(() => {
    const subIds = new Set(subscribedModules.value.map(m => m.id))
    return allModuleCards.filter(c => !subIds.has(c.id))
  })

  async function fetchSubscriptionDetails() {
    try {
      const tenantId = getTenantId()
      if (!tenantId) return
      const res = await fetch(`${API_BASE_URL}/modules-manager/owner/subscription-details?tenant_id=${tenantId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      if (res.ok) {
        const data = await res.json()
        subscriptionDetails.value = data.subscriptions || []
      }
    } catch (e) {
      console.error('Error fetching subscription details:', e)
    }
  }

  function getModuleSubscriptionInfo(moduleId) {
    return subscriptionDetails.value.find(s => s.module_id === moduleId)
  }

  async function upgradeModule(moduleId) {
    const selectedPlan = modulePaymentPlans.value[moduleId] || 'monthly'
    savePaymentPlansCache(modulePaymentPlans.value)
    try {
      const endpoint = `${API_BASE_URL}/modules-manager/owner/modules/select?tenant_id=${getTenantId()}`
      const backendId = mapFrontendToBackend(moduleId) || moduleId
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ modules: [backendId], payment_plan: selectedPlan })
      })
      if (res.ok) {
        await res.json()
        addPending(moduleId)
        toast.success('Subscription requested — pending admin approval.')
        try { await fetchOwnerRequests() } catch (e) { console.warn('fetchOwnerRequests failed', e) }
      } else {
        const txt = await res.text().catch(() => '<no body>')
        console.warn('Upgrade request failed', res.status, txt)
        toast.error('Failed to submit request for approval. Please try again.')
      }
    } catch (err) {
      toast.error(err.message || 'Failed to upgrade/subscribe module')
      console.error('upgradeModule error:', err)
    }
  }

  async function requestModule(moduleId) {
    try {
      const tenantId = getTenantId()
      const plan = modulePaymentPlans.value[moduleId] || 'monthly'
      const mappedId = mapFrontendToBackend(moduleId) || moduleId
      addPending(moduleId)
      await requestModuleSubscription(tenantId, [{ module_id: mappedId, payment_plan: plan }])
      toast.success('Request sent successfully!')
      await fetchOwnerRequests()
    } catch (err) {
      removePending(moduleId)
      toast.error('Failed to request module: ' + (err.message || 'Unknown error'))
    }
  }

  async function cancelPendingRequest(moduleId) {
    try {
      const tenantId = getTenantId()
      const mapped = mapFrontendToBackend(moduleId) || moduleId
      const res = await fetch(`${API_BASE_URL}/modules-manager/owner/modules/cancel-request?tenant_id=${tenantId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ modules: [mapped] })
      })
      if (!res.ok) {
        const txt = await res.text().catch(() => '<no body>')
        throw new Error(`Cancel failed (${res.status}): ${txt}`)
      }
      removePending(moduleId)
      try { await fetchOwnerRequests() } catch {}
      toast.success('Pending request canceled')
    } catch (err) {
      console.error('Cancel pending request error:', err)
      toast.error('Failed to cancel pending request.')
    }
  }

  async function handleUnsubscribeModule(moduleId) {
    const mod = allModuleCards.find(c => c.id === moduleId)
    const label = mod?.title || moduleId
    if (!confirm(`Unsubscribe from "${label}"? This module will be removed from your dashboard.`)) return
    unsubscribingModules.value = { ...unsubscribingModules.value, [moduleId]: true }
    try {
      const tenantId = getTenantId()
      const backendId = mapFrontendToBackend(moduleId) || moduleId
      const res = await fetch(`${API_BASE_URL}/modules-manager/owner/modules/unsubscribe?tenant_id=${tenantId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ modules: [backendId] })
      })
      if (!res.ok) {
        const txt = await res.text().catch(() => '')
        throw new Error(txt || 'Unsubscribe failed')
      }
      subscribedModules.value = subscribedModules.value.filter(m => m.id !== moduleId)
      selectedModuleIds.delete(moduleId)
      await fetchModules()
      toast.success(`Unsubscribed from ${label}`)
    } catch (err) {
      console.error('Unsubscribe error:', err)
      toast.error('Failed to unsubscribe: ' + (err.message || 'Unknown error'))
    } finally {
      const copy = { ...unsubscribingModules.value }
      delete copy[moduleId]
      unsubscribingModules.value = copy
    }
  }

  async function handleSubscribeModule(mod) {
    subscribingModules.value = { ...subscribingModules.value, [mod.id]: true }
    try {
      const tenantId = getTenantId()
      const backendId = mapFrontendToBackend(mod.id) || mod.id
      if (mod.free) {
        const res = await fetch(`${API_BASE_URL}/modules-manager/owner/modules/select?tenant_id=${tenantId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
          body: JSON.stringify({ modules: [backendId], payment_plan: 'monthly' })
        })
        if (!res.ok) {
          const txt = await res.text().catch(() => '')
          throw new Error(txt || 'Subscribe failed')
        }
        if (!subscribedModules.value.some(m => m.id === mod.id)) {
          const avMod = availableModules.find(m => m.id === mod.id) || { id: mod.id, title: mod.title }
          subscribedModules.value.push(avMod)
          selectedModuleIds.add(mod.id)
        }
        await fetchModules()
        toast.success(`${mod.title} activated!`)
      } else {
        const plan = modulePaymentPlans.value[mod.id] || 'monthly'
        const res = await fetch(`${API_BASE_URL}/modules-manager/owner/modules/select?tenant_id=${tenantId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
          body: JSON.stringify({ modules: [backendId], payment_plan: plan })
        })
        if (!res.ok) {
          const txt = await res.text().catch(() => '')
          throw new Error(txt || 'Subscribe request failed')
        }
        addPending(mod.id)
        toast.success(`${mod.title} subscription requested — pending admin approval.`)
      }
    } catch (err) {
      console.error('Subscribe error:', err)
      toast.error('Failed to subscribe: ' + (err.message || 'Unknown error'))
    } finally {
      const copy = { ...subscribingModules.value }
      delete copy[mod.id]
      subscribingModules.value = copy
    }
  }

  async function fetchBranches() {
    try {
      const tenantId = getTenantId()
      if (!tenantId) return
      const res = await fetch(`${API_BASE_URL}/subaccounts/branches/list?tenant_id=${tenantId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      if (res.ok) {
        const data = await res.json()
        branchesCount.value = Array.isArray(data) ? data.length : 0
      }
    } catch (e) { console.error('Error fetching branches:', e) }
  }

  async function fetchStorageUsage() {
    try {
      const tenantId = getTenantId()
      if (!tenantId) return
      const res = await fetch(`${API_BASE_URL}/modules-manager/owner/storage?tenant_id=${tenantId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      if (res.ok) storageUsage.value = await res.json()
    } catch (e) { console.error('Error fetching storage usage:', e) }
  }

  return {
    availableModules, allModuleCards,
    subscribedModules, pendingModules, subscriptionDetails,
    modulePaymentPlans, moduleSubscriptionDetails,
    branchesCount, storageUsage,
    unsubscribingModules, subscribingModules,
    filteredModules, activeModulesList, inactiveModulesList,
    fetchSubscribedModules, fetchOwnerRequests, fetchSubscriptionDetails,
    fetchBranches, fetchStorageUsage,
    getPaymentPlanLabel, getModulePlanTotal, getModulePaymentPlan,
    getModuleDueDate, isModuleDueSoon, formatDueDate,
    getModuleSubscriptionInfo,
    addPending, removePending, isModulePending, isModuleSubscribed,
    upgradeModule, requestModule, cancelPendingRequest,
    handleUnsubscribeModule, handleSubscribeModule,
    savePaymentPlansCache,
    loadOwnerRequestsCache
  }
}
