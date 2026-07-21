<template>
  <div class="absa-settings">
    <!-- Breadcrumb -->
    <div class="absa-settings__breadcrumb">
      <span>Home</span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      <span>Dashboard</span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      <span class="absa-settings__breadcrumb-current">Settings</span>
    </div>

    <!-- Header Actions -->
    <div class="absa-settings__actions">
      <h1 class="absa-settings__title">Settings Configuration</h1>
      <div class="absa-settings__btns">
        <button @click="resetActiveTab" class="absa-settings__btn absa-settings__btn--outline">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
          Reset
        </button>
        <button @click="saveActiveTab" class="absa-settings__btn absa-settings__btn--primary" :disabled="isUIPreferencesLoading || notificationsLoading || currencyLoading || telegramLoading">
          <svg v-if="!(isUIPreferencesLoading||notificationsLoading||currencyLoading||telegramLoading)" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
          <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="absa-settings__spin"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>
          {{ (isUIPreferencesLoading||notificationsLoading||currencyLoading||telegramLoading) ? 'Saving...' : 'Save Changes' }}
        </button>
      </div>
    </div>

    <!-- Tab Navigation -->
    <div class="absa-settings__tabs">
      <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
        class="absa-settings__tab" :class="{ 'absa-settings__tab--active': activeTab === tab.id }">
        <i :class="tab.icon" style="font-size:12px"></i>
        {{ tab.name }}
        <span v-if="tab.id === 'notifications' && notificationCount > 0" class="absa-settings__tab-badge">{{ notificationCount }}</span>
      </button>
    </div>

    <!-- Tab Content -->
    <div class="absa-settings__content">
      <KeepAlive>
        <component :is="activeComponent" />
      </KeepAlive>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, Teleport } from 'vue';
import { useRoute } from 'vue-router';
import { Modal } from '@/components/ui';

import {
  useSettingsBase,
  useSettingsProfile,
  useSettingsModules,
  useSettingsEmail, NOTIFICATION_TYPES,
  useSettingsNotifications,
  useSettingsAiAgents,
  useSettingsIntegrations,
  useSettingsRoles,
  useSettingsBranding,
  useSettingsCurrency,
  useSettingsAudit,
  useSettingsGoals
} from '@/composables/settings'

import SettingsProfile from './components/SettingsProfile.vue'
import SettingsEmail from './components/SettingsEmail.vue'
import SettingsModules from './components/SettingsModules.vue'
import SettingsAiAgents from './components/SettingsAiAgents.vue'
import SettingsIntegrations from './components/SettingsIntegrations.vue'
import SettingsNotifications from './components/SettingsNotifications.vue'
import SettingsRoles from './components/SettingsRoles.vue'
import SettingsAudit from './components/SettingsAudit.vue'

import SettingsBranding from './components/SettingsBranding.vue'
import SettingsCurrency from './components/SettingsCurrency.vue'

const route = useRoute()

const componentMap = {
  'profile': SettingsProfile, 'email': SettingsEmail, 'modules': SettingsModules,
  'ai-agents': SettingsAiAgents, 'integrations': SettingsIntegrations,
  'notifications': SettingsNotifications, 'roles': SettingsRoles,
  'audit': SettingsAudit,
  'branding': SettingsBranding, 'currency': SettingsCurrency
}
const activeComponent = computed(() => componentMap[activeTab.value] || SettingsProfile)

// â”€â”€ Shared Base â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const base = useSettingsBase()
const {
  getTenantId, getUserRole, getUserEmail, tenantId, userRole, userEmail,
  formatCurrency, formatCurrencyCompact, currencyCode,
  settingsConfirmState, openSettingsConfirm, closeSettingsConfirm, handleSettingsConfirm,
  brandPrefs, saveBrandPrefs, logAudit,
  hasPermission, initializeRBAC, isAdmin, isSuperAdmin,
  createRole, updateRole,
  dashboardStore, authStore, pricingStore, fetchModules,
  DEFAULT_ROLES, PERMISSION_ENTITIES, PERMISSION_TYPES, ALL_PERMISSIONS,
  getPermissionsForEntity, ORGANIZATION_TYPES, ACCESS_SCOPES,
  FONT_FAMILIES, FONT_SIZES, THEME_MODES,
  UI_CARD_RADIUS_OPTIONS, UI_BUTTON_RADIUS_OPTIONS, UI_INPUT_RADIUS_OPTIONS,
  UI_BUTTON_STYLE_OPTIONS, UI_CARD_ELEVATION_OPTIONS, UI_PATTERN_OPTIONS,
  UI_VISUAL_STYLE_OPTIONS, UI_VISUAL_STYLE_PRESETS,
  DEFAULT_BRAND_COLORS, DEFAULT_UI_PREFERENCES, ORIGINAL_UI_PREFERENCES,
  uiPreferencesForm, isUIPreferencesLoading,
  ALL_POS_ADDONS, activeSubscriptionKPIs,
  activeTab, tabs,
  selectedTierId, customMonths, customUsers, customBranches,
  selectedModuleIds, moduleInputs, expandedModuleDetails,
  selectedStorageId, showCalculatorSuccess,
  config, totals, selectedModulesCount, activeCycle,
  toggleModuleDetails, isModuleSelected, calculateModulePrice, formatDiscount, formatStorage,
  isTierCapacityExceeded, toggleModuleSelection,
  handleUpgradeSubscription, selectTier,
  incrementUsers, decrementUsers, incrementBranches, decrementBranches,
  incrementMonths, decrementMonths,
  availablePermissions,
  isInitializing, fetchOwnerSubscription, ownerSubscription,
  applyUIPreferences,
} = base

// â”€â”€ Profile â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const profileModule = useSettingsProfile()
const {
  profile, fetchTenantDetailsForSettings, updateProfile,
  handleLogoUpload, removeCompanyLogo,
  showProfilePassword, showProfileConfirmPassword,
  isPressingProfilePassword, isPressingProfileConfirm,
  profileNewPasswordType, profileConfirmPasswordType
} = profileModule

// â”€â”€ Modules / Subscription â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const modulesModule = useSettingsModules()
const {
  availableModules, allModuleCards,
  subscribedModules, pendingModules, subscriptionDetails,
  enrichedSubscriptions, subscriptionTotals, // NOTE: confirm these are exported from useSettingsModules
  modulePaymentPlans, moduleSubscriptionDetails,
  branchesCount, storageUsage,
  unsubscribingModules, subscribingModules,
  filteredModules, activeModulesList, inactiveModulesList,
  fetchSubscribedModules, fetchOwnerRequests, fetchSubscriptionDetails,
  fetchBranches, fetchStorageUsage,
  getPaymentPlanLabel, getModulePlanTotal, getModulePaymentPlan,
  getModuleDueDate, isModuleDueSoon, formatDueDate, getModuleSubscriptionInfo,
  addPending, removePending, isModulePending, isModuleSubscribed,
  upgradeModule, requestModule, cancelPendingRequest,
  handleUnsubscribeModule, handleSubscribeModule,
  savePaymentPlansCache
} = modulesModule

// â”€â”€ Email â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const emailModule = useSettingsEmail()
const {
  emailConfigurations, showEmailConfigForm, editingEmailConfig,
  savingEmailConfig, showEmailPassword, emailConfigForm,
  showTestEmailPrompt, testEmailRecipient, pendingTestEmailConfigId,
  testEmailSending, isValidTestEmailRecipient,
  openNewEmailConfig, cancelEmailConfig, saveEmailConfig,
  editEmailConfig, deleteEmailConfig, testEmailConfig,
  testSavedEmailConfig,
  closeTestEmailPrompt, confirmTestEmailPrompt, loadEmailConfigurations,
  toggleNotifType,
} = emailModule

// â”€â”€ Notifications â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const notifModule = useSettingsNotifications()
const {
  notifications, autoSendEnabled, whatsAppNumber, notificationEmail,
  selectedCategory, filterEquipment, filterProduct, filterLeads,
  scheduleType, scheduleTime, scheduleDay, testSendResults, showTestResults,
  stockAlerts, channelWhatsapp, channelEmail,
  notifSearch, notifSeverity, collapsedNotifCategories, expandedNotifs,
  notificationCount,
  inventoryItems, showItemSettingsPanel, selectedItem, selectedItemSettings,
  globalLowStockThreshold, globalCriticalStockThreshold,
  groupedNotifications, filteredGroupedNotifications,
  clearAdvancedFilters,
  getCategoryIcon, getNotifStatusClass, getCategoryMeta,
  getSeverityBorder, getSeverityDot, countBySeverity,
  toggleNotifCategory, notifKey, isNotifExpanded, toggleNotifExpanded,
  getNotifDetailText, truncateText, formatNotifRelative, formatDate,
  loadNotifications, loadStockAlerts, dismissNotification,
  resolveNotification, dismissAllNotifications,
  saveNotificationSettings, sendTest,
  fetchInventoryForSettings, openItemSettingsPanel, openItemSettings, saveItemSettings,
  fetchGlobalStockSettings, saveGlobalStockSettings,
  exportNotificationsExcel, exportNotificationsPDF,
} = notifModule

// â”€â”€ AI Agents â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const aiModule = useSettingsAiAgents()
const { aiAgents, saveAgentSettings } = aiModule

// â”€â”€ Integrations (Telegram) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const integModule = useSettingsIntegrations()
const {
  telegramConfig, telegramSuccess, telegramError,
  telegramConversations, telegramConversationsLoading, showTokenField,
  loadTelegramConfig, saveTelegramConfig, disableTelegramBot, loadTelegramConversations
} = integModule

// â”€â”€ Roles â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const rolesModule = useSettingsRoles()
const {
  visibleTenantRoles: visibleTenantRolesBase, tenantRoles,
  showRoleModal, editingRole, roleForm, roleFormErrors,
  rbacSuccess: rbacRoleSuccess, rbacFeedbackMessage: rbacRoleFeedback,
  rbacLoading, // NOTE: confirm this is exported from useSettingsRoles (or move to useSettingsBase)
  originalRoleForm,
  expandedAddons,
  ENTITIES_WITH_ADDONS, POS_ADDON_FEATURES, ASSET_SCOPE_FIELDS,
  ADMIN_ONLY_ROLE_IDS, ADMIN_ONLY_ROLE_NAMES,
  isRoleDirty,
  getPosAddon, togglePosAddon, syncPosPermsToLocalStorage,
  hasAddon, toggleAddon, isAddonOpen,
  openRoleModal, closeRoleModal,
  togglePermission, toggleAllEntityPermissions, hasEntityPermission,
  setAssetScope,
  saveRole: saveRoleBase,
  handleDeleteRole
} = rolesModule


// Helper: count selected permissions per entity
function getEntityPermissionsSelected(entityId) {
  const perms = roleForm.value?.permissions?.[entityId]
  return Array.isArray(perms) ? perms.length : 0
}



// Organizations module removed

// Roles success banner
const rbacSuccess = computed(() => !!rbacRoleSuccess.value)
const rbacFeedbackMessage = computed(() => rbacRoleFeedback.value)


const brandingModule = useSettingsBranding()
const {
  showColorPicker, selectedVisualStyleName,
  resetUIPreferences, updateBrandColor, previewThemeMode,
  applyVisualStylePreset, saveUIPreferences
} = brandingModule

// â”€â”€ Currency â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const currencyModule = useSettingsCurrency()
const {
  currencySettings, currencySuccess, currencyError, currencyLoading,
  currencySymbols, formatCurrencyPreview, updateCurrency,
  saveCurrencySettings, loadCurrencySettings
} = currencyModule

// â”€â”€ Audit â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const auditModule = useSettingsAudit()
const {
  auditLogs, auditTotal, auditPage, auditLimit, isLoadingAudit,
  auditModuleFilter, showAuditChart, auditTotalPages,
  AUDIT_SENSITIVE, FLAG_DELETE_THRESHOLD, FLAG_UPDATE_THRESHOLD,
  auditIsFlagged, auditFlags, auditActionTotals, auditChartModules,
  fetchAuditLogs, auditPrevPage, auditNextPage
} = auditModule

// â”€â”€ Goals â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const goalsModule = useSettingsGoals()
const {
  companyGoals, showAddGoalModal, showEditGoalModal, activeGoalMenu, editingGoal, goalForm,
  activeGoalsCount, achievedGoalsCount, aiInsightsCount,
  toggleGoalActions, closeGoalModal, editGoal, saveGoal, deleteGoal,
  duplicateGoal, generateAIInsights, getSmartRecommendation,
  getGoalStatusClass, getGoalPriorityClass, getProgressBarClass,
  getRiskLevelClass, getDaysLeft
} = goalsModule

// â”€â”€ Header "Save/Processing" flags â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const notificationsLoading = ref(false)
const telegramLoading = ref(false)


const visibleTenantRoles = computed(() => {
  const hasHealthcare = subscribedModules.value.some(m => m.id === 'healthcare');
  return (visibleTenantRolesBase.value || []).filter(r => {
    const id = String(r?.id || '').toLowerCase().trim();
    if (!hasHealthcare && HEALTHCARE_ROLE_IDS.has(id)) return false;
    return true;
  });
});

// Save role, then push POS + Healthcare addon caches to localStorage so the
// POS and Healthcare modules immediately reflect the new permissions.
async function saveRole() {
  await saveRoleBase(createRole, updateRole);
  syncPosPermsToLocalStorage();
  syncHealthPermsToLocalStorage();
}

// â”€â”€ Modal blur (dims the page behind any open modal/dialog) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const isAnyModalOpen = computed(() => {
  return showRoleModal.value ||
    showAddGoalModal.value || showEditGoalModal.value ||
    showItemSettingsPanel.value || !!settingsConfirmState.value ||
    showTestEmailPrompt.value
})

watch(isAnyModalOpen, (isOpen) => {
  if (isOpen) document.body.classList.add('scoped-modal-open')
  else document.body.classList.remove('scoped-modal-open')
}, { immediate: true })

onBeforeUnmount(() => {
  document.body.classList.remove('scoped-modal-open')
})

// â”€â”€ Auto-select a pricing tier based on saved subscription / business type â”€
function autoSelectTier() {
  if (selectedTierId.value) return
  const sub = ownerSubscription.value
  if (sub && sub.tier && config.value?.tiers?.[sub.tier]) {
    selectTier(sub.tier)
    return
  }
  if (profile.value?.business_type) {
    const type = profile.value.business_type.toLowerCase()
    if (type.includes('micro') || type.includes('informal')) selectTier('micro')
    else if (type.includes('small') || type.includes('start')) selectTier('small')
    else if (type.includes('medium') || type.includes('grow')) selectTier('medium')
    else if (type.includes('enter') || type.includes('large') || type.includes('corp')) selectTier('enterprise')
  }
}

// â”€â”€ Header Save / Reset actions â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function saveActiveTab() {
  switch (activeTab.value) {
    case 'branding':
      saveUIPreferences()
      logAudit('update', 'settings', { resource_type: 'branding' })
      break
    case 'currency':
      saveCurrencySettings()
      logAudit('update', 'settings', { resource_type: 'currency' })
      break
    case 'notifications':
      saveNotificationSettings()
      logAudit('update', 'settings', { resource_type: 'notifications' })
      break
    case 'integrations':
      saveTelegramConfig()
      logAudit('update', 'settings', { resource_type: 'integrations' })
      break
    default:
      break
  }
}

function resetActiveTab() {
  openSettingsConfirm({
    title: 'Discard Unsaved Changes',
    message: 'Are you sure you want to discard unsaved changes in this section?',
    detail: 'Current edits in the active tab will be lost.',
    variant: 'warning',
    confirmLabel: 'Discard',
    onConfirm: () => {
      switch (activeTab.value) {
        case 'branding':
          uiPreferencesForm.value = { ...DEFAULT_UI_PREFERENCES }
          break
        case 'notifications':
          loadNotifications()
          break
        case 'integrations':
          loadTelegramConfig()
          break
        default:
          break
      }
    },
  })
}

// â”€â”€ Lifecycle â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
onMounted(async () => {
  isInitializing.value = true

  try {
    // 1. Handle tab query parameter
    const tabParam = route.query.tab
    const validTabs = ['profile', 'branding', 'currency', 'notifications', 'roles', 'organizations', 'modules', 'goals', 'ai-agents', 'integrations']
    if (tabParam && validTabs.includes(tabParam)) activeTab.value = tabParam

    // 2. Initialize core services & configs
    if (!pricingStore.config) await pricingStore.fetchConfig()
    await fetchGlobalStockSettings()
    await loadCurrencySettings()

    // 3. Fetch domain data
    await fetchSubscribedModules()
    await fetchOwnerRequests()
    await fetchSubscriptionDetails()
    await fetchOwnerSubscription()
    await fetchTenantDetailsForSettings()
    await fetchBranches()
    await fetchStorageUsage()
    await loadNotifications()
    try { await loadStockAlerts() } catch (e) { console.warn('loadStockAlerts initial error', e) }

    // 4. Auto-select tier once data is in, and keep re-checking as data settles
    autoSelectTier()
    watch([profile, config], () => {
      if (!selectedTierId.value) autoSelectTier()
    }, { deep: true })

    // 5. Telegram + Email + RBAC
    await loadTelegramConfig()
    watch(activeTab, (newTab) => {
      if (newTab === 'integrations') { loadTelegramConfig(); loadTelegramConversations() }
      if (newTab === 'audit') fetchAuditLogs()
    })

    await loadEmailConfigurations()
    await initializeRBAC()

    // 6. Final sync of selected module ids for the calculator
    selectedModuleIds.clear()
    subscribedModules.value.forEach(m => selectedModuleIds.add(m.id))
  } catch (err) {
    console.error('[Settings] Error during initialization:', err)
  } finally {
    isInitializing.value = false
  }
})

watch(auditModuleFilter, () => { auditPage.value = 1; fetchAuditLogs() })
</script>


<style scoped>
/* --- ABSA Settings Shell --- */
.absa-settings {
  padding: 10px 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.absa-settings__breadcrumb {
  display: flex; align-items: center; gap: 6px;
  font-size: 0.7rem; font-weight: 600; color: #9CA3AF;
  margin-bottom: 12px; font-family: 'Space Mono', monospace;
}

.absa-settings__breadcrumb-current { color: #BE0F2C; }

.absa-settings__actions {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 20px; flex-wrap: wrap; gap: 12px;
}

.absa-settings__title {
  font-size: 1.5rem; font-weight: 900; color: #111827;
  margin: 0; letter-spacing: -0.02em;
}

.absa-settings__btns { display: flex; gap: 8px; flex-wrap: wrap; }

.absa-settings__btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 16px; border-radius: 6px; font-size: 0.75rem;
  font-weight: 700; cursor: pointer; transition: all 150ms ease;
  border: 1px solid #E8E8EC; background: #FFFFFF; color: #4B5563;
  font-family: 'Montserrat', system-ui, sans-serif;
}

.absa-settings__btn:hover { border-color: #BE0F2C; color: #BE0F2C; }

.absa-settings__btn--primary {
  background: linear-gradient(135deg, #BE0F2C, #8B0015); color: #FFFFFF;
  border-color: transparent; box-shadow: 0 4px 14px rgba(190, 15, 44, 0.25);
}

.absa-settings__btn--primary:hover { opacity: 0.9; }

.absa-settings__btn--primary:disabled { opacity: 0.55; cursor: not-allowed; }

.absa-settings__btn--outline { background: #FFFFFF; }

.absa-settings__spin { animation: absaSpin 1s linear infinite; }
@keyframes absaSpin { to { transform: rotate(360deg); } }

/* Tabs */
.absa-settings__tabs {
  display: flex; gap: 2px; overflow-x: auto;
  border-bottom: 2px solid #E8E8EC; margin-bottom: 24px;
  padding: 0 4px;
}

.absa-settings__tab {
  padding: 10px 16px; font-size: 0.7rem; font-weight: 700;
  font-family: 'Space Mono', monospace; text-transform: uppercase;
  letter-spacing: 0.04em; border: none; background: transparent;
  color: #9CA3AF; cursor: pointer; transition: all 150ms ease;
  border-bottom: 2px solid transparent; margin-bottom: -2px;
  white-space: nowrap; display: flex; align-items: center; gap: 6px;
}

.absa-settings__tab:hover { color: #4B5563; }

.absa-settings__tab--active {
  color: #BE0F2C; border-bottom-color: #BE0F2C;
}

.absa-settings__tab-badge {
  background: #DC2626; color: #FFF; font-size: 0.55rem;
  padding: 1px 6px; border-radius: 999px; font-weight: 800;
}

.absa-settings__content { min-height: 60vh; }

@media (max-width: 768px) {
  .absa-settings { padding: 10px; }
  .absa-settings__actions { flex-direction: column; align-items: flex-start; }
  .absa-settings__tabs { gap: 0; }
  .absa-settings__tab { padding: 8px 12px; font-size: 0.6rem; }
}
</style>