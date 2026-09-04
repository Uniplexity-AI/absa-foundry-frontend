import { createRouter, createWebHistory } from 'vue-router';
import { decodeJWT } from '@/services/decodeJWT.js';
import { DEV_BYPASS } from '@/config/devFlags.js';

// Lazy load LandingPage to avoid circular dependency with api.js importing router
const LandingPage = () => import('@/views/Home.vue');


// ============================Authentications page imports=============================

import Login from '@/views/auth/login.vue';
import ResetPassword from '@/views/auth/ResetPassword.vue';

import SuperAdminLayout from '@/components/layouts/SuperAdminLayout.vue';

// Define routes
const routes = [
  // Root — splash initialisation before login
  {
    path: '/',
    name: 'InitialisationScreen',
    component: () => import('@/views/InitialisationScreen.vue'),
    meta: { requiresAuth: false, isPublic: true }
  },

  // Landing page (accessible at /landing if needed)
  {
    path: '/landing',
    name: 'LandingPage',
    component: LandingPage,
    meta: {
      requiresAuth: false,
      isPublic: true
    }
  },


  
  // PWA Test Page (development only)
  {
    path: '/pwa-test',
    name: 'PWATestPage',
    component: () => import('@/views/PWATestPage.vue'),
    meta: {
      requiresAuth: false,
      isPublic: true
    }
  },

  
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('@/views/auth/ForgotPassword.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false },
    // beforeEnter: (to, from, next) => {
    //   const consent = localStorage.getItem('uniplexity_consent')
    //   if (!consent) {
    //     next('/terms-acceptance')
    //   } else {
    //     next()
    //   }
    // }
  },

  
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword,
    meta: { requiresAuth: false }
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('@/views/auth/Logout.vue'),
    meta: { requiresAuth: false }
  },


  // Dashboard routes
  {
    path: '/dashboard',
    component: () => import('../components/layouts/DashboardLayout.vue'),
    meta: { requiresAuth: false }, // We'll handle auth in the global beforeEach guard

    children: [
      { path: '', redirect: '/dashboard/portfolio' },
      { path: 'portfolio', name: 'DashboardHome', component: () => import('../views/PortfolioOverview.vue'), meta: { title: 'Dashboard' } },
      { path: 'customer/:id/action-plan', name: 'CreateActionPlan', component: () => import('../views/CreateActionPlan.vue'), meta: { title: 'Create Action Plan' } },
      { path: 'customer/:id/take-action', name: 'TakeAction', component: () => import('../views/TakeAction.vue'), meta: { title: 'Take Action' } },
      { path: 'customer/:id', name: 'CustomerDetail', component: () => import('../views/CustomerDetail.vue'), meta: { title: 'Customer Detail' } },
      { path: 'branch-manager', name: 'BranchManagerDashboard', component: () => import('../views/Modules/managers/BranchManagerDashboard.vue'), meta: { title: 'Branch Manager Dashboard' } },
      { path: 'models', name: 'ModelsMonitoring', component: () => import('../views/Modules/aiagents/Models.vue'), meta: { title: 'Model Performance' } },
      { path: 'etl-pipeline', name: 'EtlPipeline', component: () => import('../views/Modules/datapipeline/EtlPipeline.vue'), meta: { title: 'ETL Pipeline' } },
      { path: 'etl-run-history', name: 'EtlRunHistory', component: () => import('../views/Modules/datapipeline/ETLRunHistory.vue'), meta: { title: 'ETL Manager' } },
      { path: 'etl-run-history/batch/:runId', name: 'BatchExecutionDetail', component: () => import('../views/Modules/datapipeline/BatchExecutionDetail.vue'), meta: { title: 'Batch Execution Detail' } },
      { path: 'etl-config-manager', name: 'EtlConfigManager', component: () => import('../views/Modules/datapipeline/EtlConfigManager.vue'), meta: { title: 'ETL Config Manager' } },

      // ── Strategic & Value Layer ──
      { path: 'customer-value',    name: 'CustomerValueIntelligence', component: () => import('../views/Modules/intelligence/CustomerValueIntelligence.vue'), meta: { title: 'Customer Value Intelligence' } },
      { path: 'balance-forecast',  name: 'BalanceForecast',           component: () => import('../views/Modules/intelligence/BalanceForecast.vue'),           meta: { title: 'Balance Forecast' } },
      { path: 'business-outcomes', name: 'BusinessOutcomes',          component: () => import('../views/Modules/intelligence/BusinessOutcomes.vue'),          meta: { title: 'Business Outcomes' } },
      { path: 'lifecycle',         name: 'LifecyclePrediction',       component: () => import('../views/Modules/intelligence/LifecyclePrediction.vue'),       meta: { title: 'Customer Lifecycle' } },
     
      { path: 'ai', name: 'AiModule', component: () => import('../views/Modules/aiagents/AiModule.vue'), meta: { title: 'AI Assistant' } },
      { path: 'ai/codebase-insights', name: 'CodebaseInsights', component: () => import('../views/Modules/aiagents/CodebaseInsights.vue'), meta: { title: 'Codebase Insights' } },
      { path: 'settings', name: 'SettingsModule', component: () => import('../views/Modules/settings/SettingsModule.vue'), meta: { title: 'Settings' } },
      { path: 'subaccounts', name: 'SubAccountsModule', component: () => import('../views/Modules/settings/SubAccountModule.vue'), meta: { title: 'Sub Accounts' } },
      { path: 'settings/users', name: 'UserManagement', component: () => import('../views/Modules/settings/UserManagement.vue'), meta: { title: 'User Management' } },
      { path: 'profile', name: 'ProfileModule', component: () => import('../views/Modules/settings/ProfileModule.vue') },
      
    
      { path: 'crm', name: 'CrmModule', component: () => import('../views/Modules/crm/CRMModule.vue') },
      { path: 'crm/leads', name: 'CrmLeads', component: () => import('../views/Modules/crm/CRMLeadsPage.vue') },
      { path: 'crm/pipeline', name: 'CrmPipeline', component: () => import('../views/Modules/crm/CRMPipelinePage.vue') },
      { path: 'crm/contacts', name: 'CrmContacts', component: () => import('../views/Modules/crm/CRMContactsPage.vue') },
      { path: 'crm/accounts', name: 'CrmAccounts', component: () => import('../views/Modules/crm/CRMAccountsPage.vue') },
      { path: 'crm/deals', name: 'CrmDeals', component: () => import('../views/Modules/crm/CRMDealsPage.vue') },
      { path: 'crm/documents', name: 'CrmDocuments', component: () => import('../views/Modules/crm/CRMDocumentsPage.vue') },
      { path: 'crm/meetings', name: 'CrmMeetings', component: () => import('../views/Modules/crm/CRMMeetingsPage.vue') },
      { path: 'crm/emails', name: 'CrmEmails', component: () => import('../views/Modules/crm/CRMEmailsPage.vue') },
      { path: 'crm/calls', name: 'CrmCalls', component: () => import('../views/Modules/crm/CRMCallsPage.vue') },
      { path: 'crm/visits', name: 'CrmVisits', component: () => import('../views/Modules/crm/CRMVisitsPage.vue') },
      { path: 'crm/whatsapp', name: 'CrmWhatsApp', component: () => import('../views/Modules/crm/CRMWhatsAppPage.vue') },
      { path: 'crm/acquisition', name: 'CrmAcquisition', component: () => import('../views/Modules/crm/CRMAcquisitionPage.vue') },
      
      
      
     
    ],
  },

  // Portfolio route (also accessible from sidebar)
  {
    path: '/portfolio',
    component: () => import('../components/layouts/DashboardLayout.vue'),
    children: [
      { path: '', component: () => import('../views/PortfolioOverview.vue') },
    ],
  },

  // Customer detail route (also accessible from sidebar)
  {
    path: '/customer/:id',
    component: () => import('../components/layouts/DashboardLayout.vue'),
    children: [
      { path: '', component: () => import('../views/CustomerDetail.vue') },
    ],
  },

  // Error pages
  { path: '/403', component: () => import('../views/403.vue') },
  { path: '/unauthorized', name: 'Unauthorized', component: { template: '<div><h2>Unauthorized</h2><p>You do not have permission to access this page.</p></div>' } },

  // Catch all route - must be last
  // { path: '/:pathMatch(.*)*', component: NotFound, name: 'not-found' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Centralized Route Guard: authentication + role-scoped area access (ABSA)
const ABSA_ROLES = { ADMIN: 'ADMIN', RM: 'RELATIONSHIP_MANAGER', DS: 'DATA_SCIENTIST', OPS: 'OPERATIONS' }

const AREA_ROLES = {
  analytics: [ABSA_ROLES.ADMIN, ABSA_ROLES.RM],
  models: [ABSA_ROLES.ADMIN, ABSA_ROLES.DS],
  etl: [ABSA_ROLES.ADMIN, ABSA_ROLES.OPS]
}

function currentRole() {
  try {
    return String(decodeJWT().getUserRole?.() || '').toUpperCase()
  } catch (e) {
    return ''
  }
}

function homeForRole(role) {
  if (role === ABSA_ROLES.DS) return '/dashboard/models'
  if (role === ABSA_ROLES.OPS) return '/dashboard/etl-run-history'
  return '/dashboard/portfolio'
}

function requiredArea(path) {
  if (path.startsWith('/dashboard/models')) return 'models'
  if (path.startsWith('/dashboard/etl')) return 'etl'
  if (
    path.startsWith('/dashboard/customer') || path.startsWith('/dashboard/portfolio') ||
    path.startsWith('/dashboard/branch-manager') || path.startsWith('/dashboard/customer-value') ||
    path.startsWith('/dashboard/lifecycle') || path.startsWith('/dashboard/balance-forecast') ||
    path.startsWith('/dashboard/business-outcomes') || path.startsWith('/portfolio') ||
    path.startsWith('/customer/')
  ) return 'analytics'
  return null
}

router.beforeEach((to, from, next) => {
  // Local dev bypass (VITE_DEV_BYPASS=true) — skip all checks
  if (DEV_BYPASS) {
    return next();
  }

  const isAppRoute = to.path.startsWith('/dashboard') || to.path.startsWith('/portfolio') || to.path.startsWith('/customer/')

  if (isAppRoute) {
    const token = localStorage.getItem('token')
    if (!token) {
      return next('/login');
    }

    const role = currentRole()
    if (!role) {
      return next('/login');
    }

    const area = requiredArea(to.path)
    if (area && !(AREA_ROLES[area] || []).includes(role)) {
      return next({ path: homeForRole(role), replace: true });
    }
  }

  next();
});

export default router;
