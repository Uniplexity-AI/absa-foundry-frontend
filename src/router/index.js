import { createRouter, createWebHistory } from 'vue-router'
import { setRouter } from '@/services/decodeJWT.js'
import { DEV_BYPASS } from '@/config/devFlags.js'

// ── Lazy-loaded page components ──────────────────────────────────────────────
const LandingPage = () => import('@/views/Home.vue')

// ── ABSA RBAC roles ──────────────────────────────────────────────────────────
const ADMIN = 'ADMIN'
const RM    = 'RELATIONSHIP_MANAGER'
const DS    = 'DATA_SCIENTIST'
const OPS   = 'OPERATIONS'

/** After login, each role lands on its natural home page. */
function homeForRole(roles = []) {
  if (roles.includes(DS))    return '/dashboard/models'
  if (roles.includes(OPS))   return '/dashboard/etl-run-history'
  return '/dashboard/portfolio'
}

// ── Routes ───────────────────────────────────────────────────────────────────
const routes = [
  // Public splash / auth routes
  { path: '/',                name: 'InitialisationScreen', component: () => import('@/views/InitialisationScreen.vue'), meta: { isPublic: true } },
  { path: '/landing',         name: 'LandingPage',          component: LandingPage,                                      meta: { isPublic: true } },
  { path: '/login',           name: 'Login',                component: () => import('@/views/auth/login.vue'),           meta: { isPublic: true } },
  { path: '/forgot-password', name: 'ForgotPassword',       component: () => import('@/views/auth/ForgotPassword.vue'), meta: { isPublic: true } },
  { path: '/reset-password',  name: 'ResetPassword',        component: () => import('@/views/auth/ResetPassword.vue'),  meta: { isPublic: true } },
  { path: '/logout',          name: 'Logout',               component: () => import('@/views/auth/Logout.vue'),         meta: { isPublic: true } },
  { path: '/403',             name: 'Forbidden',            component: () => import('@/views/403.vue'),                 meta: { isPublic: true } },
  { path: '/unauthorized',    name: 'Unauthorized',         component: { template: '<div><h2>Unauthorized</h2><p>You do not have permission to access this page.</p></div>' }, meta: { isPublic: true } },

  // ── Dashboard (requires auth) ──────────────────────────────────────────────
  {
    path: '/dashboard',
    component: () => import('../components/layouts/DashboardLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { 
        path: '', 
        redirect: () => {
          const roles = JSON.parse(localStorage.getItem('roles') || '[]')
          if (roles.includes(DS)) return '/dashboard/models'
          if (roles.includes(OPS)) return '/dashboard/etl-run-history'
          return '/dashboard/portfolio'
        }
      },

      // ── Analytics / Customer workspace — RM + ADMIN ──
      { path: 'portfolio',             name: 'DashboardHome',             component: () => import('../views/PortfolioOverview.vue'),                                            meta: { requiredPermissions: [{ entity: 'crm', action: 'read' }], title: 'Dashboard' } },
      { path: 'customers',             name: 'MyCustomers',               component: () => import('../views/MyCustomers.vue'),                                                  meta: { requiresRoles: [ADMIN, RM, OPS], title: 'My Customers' } },
      { path: 'customers/:id',         name: 'CustomerProfile',           component: () => import('../views/CustomerProfile.vue'),                                              meta: { requiresRoles: [ADMIN, RM, OPS], title: 'Customer Profile' } },
      { path: 'customer/:id',          name: 'CustomerDetail',            component: () => import('../views/CustomerDetail.vue'),                                               meta: { requiresRoles: [ADMIN, RM, OPS], title: 'Customer Detail' } },
      { path: 'customer/:id/action-plan', name: 'CreateActionPlan',      component: () => import('../views/CreateActionPlan.vue'),                                             meta: { requiredPermissions: [{ entity: 'crm', action: 'read' }], title: 'Create Action Plan' } },
      { path: 'customer/:id/take-action', name: 'TakeAction',            component: () => import('../views/TakeAction.vue'),                                                   meta: { requiredPermissions: [{ entity: 'crm', action: 'read' }], title: 'Take Action' } },

      // 🔮 Intelligence layer – RM + ADMIN + DS 🔮
      { path: 'customer-value',    name: 'CustomerValueIntelligence', component: () => import('../views/Modules/intelligence/CustomerValueIntelligence.vue'), meta: { requiredPermissions: [{ entity: 'intelligence', action: 'read' }], title: 'Customer Value Intelligence' } },
      { path: 'balance-forecast',  name: 'BalanceForecast',           component: () => import('../views/Modules/intelligence/BalanceForecast.vue'),           meta: { requiredPermissions: [{ entity: 'intelligence', action: 'read' }], title: 'Balance Forecast' } },
      { path: 'business-outcomes', name: 'BusinessOutcomes',          component: () => import('../views/Modules/intelligence/BusinessOutcomes.vue'),          meta: { requiredPermissions: [{ entity: 'intelligence', action: 'read' }], title: 'Business Outcomes' } },
      { path: 'lifecycle',         name: 'LifecyclePrediction',       component: () => import('../views/Modules/intelligence/LifecyclePrediction.vue'),       meta: { requiredPermissions: [{ entity: 'intelligence', action: 'read' }], title: 'Customer Lifecycle' } },

      // ── CRM — RM + ADMIN ──
      { path: 'crm',                 name: 'CrmModule',           component: () => import('../views/Modules/crm/CRMModule.vue'),           meta: { requiredPermissions: [{ entity: 'crm', action: 'read' }], title: 'CRM' } },
      { path: 'crm/workspace',       name: 'CrmWorkspace', component: () => import('../views/Modules/crm/CRMOmnichannelWorkspace.vue'), meta: { requiredPermissions: [{ entity: 'crm', action: 'read' }] } },
      { path: 'crm/calendar', name: 'CRMCalendar', component: () => import('../views/Modules/crm/CRMCalendarPage.vue'), meta: { requiredPermissions: [{ entity: 'crm', action: 'read' }], title: 'Calendar & Activities' } },
      { path: 'crm/analytics', name: 'CrmAnalytics', component: () => import('../views/Modules/crm/CRMAnalyticsDashboard.vue'), meta: { requiredPermissions: [{ entity: 'crm', action: 'read' }], title: 'CRM Analytics' } },
      { path: 'crm/tickets', name: 'CrmTickets', component: () => import('../views/Modules/crm/CRMTicketsPage.vue'), meta: { requiredPermissions: [{ entity: 'crm', action: 'read' }], title: 'CRM Tickets' } },
      { path: 'crm/leads', name: 'CrmLeads',            component: () => import('../views/Modules/crm/CRMLeadsPage.vue'),        meta: { requiredPermissions: [{ entity: 'crm', action: 'read' }] } },
      { path: 'crm/pipeline',        name: 'CrmPipeline',         component: () => import('../views/Modules/crm/CRMPipelinePage.vue'),     meta: { requiredPermissions: [{ entity: 'crm', action: 'read' }] } },
      { path: 'crm/contacts',        name: 'CrmContacts',         component: () => import('../views/Modules/crm/CRMContactsPage.vue'),     meta: { requiredPermissions: [{ entity: 'crm', action: 'read' }] } },
      { path: 'crm/accounts',        name: 'CrmAccounts',         component: () => import('../views/Modules/crm/CRMAccountsPage.vue'),     meta: { requiredPermissions: [{ entity: 'crm', action: 'read' }] } },
      { path: 'crm/deals',           name: 'CrmDeals',            component: () => import('../views/Modules/crm/CRMDealsPage.vue'),        meta: { requiredPermissions: [{ entity: 'crm', action: 'read' }] } },
      { path: 'crm/documents',       name: 'CrmDocuments',        component: () => import('../views/Modules/crm/CRMDocumentsPage.vue'),    meta: { requiredPermissions: [{ entity: 'crm', action: 'read' }] } },
      { path: 'crm/meetings',        name: 'CrmMeetings',         component: () => import('../views/Modules/crm/CRMMeetingsPage.vue'),     meta: { requiredPermissions: [{ entity: 'crm', action: 'read' }] } },
      { path: 'crm/emails',          name: 'CrmEmails',           component: () => import('../views/Modules/crm/CRMEmailsPage.vue'),       meta: { requiredPermissions: [{ entity: 'crm', action: 'read' }] } },
      { path: 'crm/calls',           name: 'CrmCalls',            component: () => import('../views/Modules/crm/CRMCallsPage.vue'),        meta: { requiredPermissions: [{ entity: 'crm', action: 'read' }] } },
      { path: 'crm/visits',          name: 'CrmVisits',           component: () => import('../views/Modules/crm/CRMVisitsPage.vue'),       meta: { requiredPermissions: [{ entity: 'crm', action: 'read' }] } },
      { path: 'crm/whatsapp',        name: 'CrmWhatsApp',         component: () => import('../views/Modules/crm/CRMWhatsAppPage.vue'),     meta: { requiredPermissions: [{ entity: 'crm', action: 'read' }] } },
      { path: 'crm/acquisition',     name: 'CrmAcquisition',      component: () => import('../views/Modules/crm/CRMAcquisitionPage.vue'),  meta: { requiredPermissions: [{ entity: 'crm', action: 'read' }] } },
      { path: 'crm/promise-to-fund', name: 'PromiseToFundReport', component: () => import('../views/Modules/crm/PromiseToFundReport.vue'), meta: { requiredPermissions: [{ entity: 'crm', action: 'read' }] } },

      // ── Models / Data Science — DS + ADMIN ──
      { path: 'models', name: 'ModelsMonitoring', component: () => import('../views/Modules/aiagents/Models.vue'), meta: { requiredPermissions: [{ entity: 'intelligence', action: 'read' }], title: 'Model Performance' } },

      // ── ETL / Operations — OPS + ADMIN ──
      { path: 'etl-pipeline',                    name: 'EtlPipeline',        component: () => import('../views/Modules/datapipeline/EtlPipeline.vue'),          meta: { requiredPermissions: [{ entity: 'etl-pipeline', action: 'read' }], title: 'ETL Pipeline' } },
      { path: 'etl-run-history',                 name: 'EtlRunHistory',       component: () => import('../views/Modules/datapipeline/ETLRunHistory.vue'),         meta: { requiredPermissions: [{ entity: 'etl-pipeline', action: 'read' }], title: 'ETL Manager' } },
      { path: 'etl-run-history/batch/:runId',    name: 'BatchExecutionDetail', component: () => import('../views/Modules/datapipeline/BatchExecutionDetail.vue'), meta: { requiredPermissions: [{ entity: 'etl-pipeline', action: 'read' }], title: 'Batch Execution Detail' } },
      { path: 'etl-config-manager',             name: 'EtlConfigManager',    component: () => import('../views/Modules/datapipeline/EtlConfigManager.vue'),      meta: { requiredPermissions: [{ entity: 'etl-pipeline', action: 'read' }], title: 'ETL Config Manager' } },

      // ── Branch Manager — OPS + ADMIN ──
      { path: 'branch-manager', name: 'BranchManagerDashboard', component: () => import('../views/Modules/managers/BranchManagerDashboard.vue'), meta: { requiredPermissions: [{ entity: 'operations', action: 'read' }], title: 'Branch Manager Dashboard' } },

      // ── Settings — ADMIN only ──
      { path: 'settings',       name: 'SettingsModule',  component: () => import('../views/Modules/settings/SettingsModule.vue'),   meta: { requiredPermissions: [{ entity: 'settings', action: 'read' }], title: 'Settings' } },
      { path: 'settings/users', name: 'UserManagement',  component: () => import('../views/Modules/settings/UserManagement.vue'),   meta: { requiredPermissions: [{ entity: 'settings', action: 'read' }], title: 'User Management' } },
      { path: 'subaccounts',    name: 'SubAccountsModule', component: () => import('../views/Modules/settings/SubAccountModule.vue'), meta: { requiredPermissions: [{ entity: 'settings', action: 'read' }], title: 'Sub Accounts' } },

      // ── Profile — any authenticated user ──
      { path: 'profile', name: 'ProfileModule', component: () => import('../views/Modules/settings/ProfileModule.vue'), meta: { requiresAuth: true, title: 'Profile' } },
    ],
  },

  // ── Alternate top-level paths (covered by same guard) ─────────────────────
  {
    path: '/portfolio',
    component: () => import('../components/layouts/DashboardLayout.vue'),
    meta: { requiresAuth: true, requiredPermissions: [{ entity: 'operations', action: 'read' }] },
    children: [{ path: '', component: () => import('../views/PortfolioOverview.vue') }],
  },
  {
    path: '/customer/:id',
    component: () => import('../components/layouts/DashboardLayout.vue'),
    meta: { requiresAuth: true, requiredPermissions: [{ entity: 'operations', action: 'read' }] },
    children: [{ path: '', component: () => import('../views/CustomerDetail.vue') }],
  },
]

// ── Router instance ──────────────────────────────────────────────────────────
const router = createRouter({ history: createWebHistory(), routes })

setRouter(router)

// ── Global navigation guard ──────────────────────────────────────────────────
router.beforeEach(async (to) => {
  // Dev bypass — skip all checks in local development
  if (DEV_BYPASS) return true

  // Public routes — always allowed
  if (to.meta.isPublic) return true

  // Lazy-import the auth store (avoids circular dependency at module load)
  const { useAuthStore } = await import('@/stores/auth')
  const authStore = useAuthStore()

  // Rehydrate from localStorage if the store is empty (e.g. page refresh)
  if (!authStore.token) authStore.hydrateFromStorage()

  // Not authenticated → login
  if (!authStore.isAuthenticated) return '/login'

  // Permission check (RBAC)
  const requiredPerms = to.meta.requiredPermissions
  if (requiredPerms && requiredPerms.length > 0) {
    const hasAccess = requiredPerms.every(p => authStore.hasPermission(p.entity, p.action))
    if (!hasAccess) return '/403'
  }
  
  // Legacy Role check fallback for routes not yet updated
  const requiredRoles = to.meta.requiresRoles
  if (requiredRoles && requiredRoles.length > 0) {
    const canAccess = requiredRoles.some(r => authStore.roles.includes(r))
    if (!canAccess) return '/403'
  }

  return true
})

router.onError((error) => {
  if (/Failed to fetch dynamically imported module/.test(error?.message)) {
    window.location.reload()
  }
})

export default router

