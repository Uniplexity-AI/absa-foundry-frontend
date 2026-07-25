import { createRouter, createWebHistory } from 'vue-router';
import { decodeJWT } from '@/services/decodeJWT.js';
import { getModuleCards, availableModules } from '@/config/moduleCards';
import { DEV_BYPASS } from '@/config/devFlags.js';

// Lazy load LandingPage to avoid circular dependency with api.js importing router
const LandingPage = () => import('@/views/Home.vue');

// =============================UB App Bot================================


// ============================Authentications page imports=============================

import Login from '@/views/auth/login.vue';
import ResetPassword from '@/views/auth/ResetPassword.vue';

import SuperAdminLayout from '@/components/layouts/SuperAdminLayout.vue';
import SuperAdminOverview from '@/views/Admin/AdminDashboard.vue';


import TenantRevenues from '@/views/Admin/Revenue.vue';
import TenantReports from '@/views/Admin/Reports.vue';

import RagChat from '@/views/Admin/RagChat.vue'
import RagUpload from '@/views/Admin/RagUpload.vue'
import EmailManagement from '@/views/Admin/EmailManagement.vue'
import UserActivities from '@/views/Admin/UserActivities.vue'




// ===================================Strategic Management Module ==============================

import OverviewSubpage from '@/views/Modules/strategic/OverviewSubpage.vue';
import NotesSubpage from '@/views/Modules/strategic/NotesSubpage.vue';
import GovernanceSubpage from '@/views/Modules/strategic/GovernanceSubpage.vue';
import ActionsSubpage from '@/views/Modules/strategic/ActionsSubpage.vue';
import GoalsSubpage from '@/views/Modules/strategic/GoalsSubpage.vue';
import PredictionsSubpage from '@/views/Modules/strategic/PredictionsSubpage.vue';
import AnalysisSubpage from '@/views/Modules/strategic/AnalysisSubpage.vue';
import FundingSubpage from '@/views/Modules/strategic/FundingSubpage.vue';
import EnvironmentalSubpage from '@/views/Modules/strategic/EnvironmentalSubpage.vue';
import InternalAnalysisSubpage from '@/views/Modules/strategic/InternalAnalysisSubpage.vue';
import PositioningSubpage from '@/views/Modules/strategic/PositioningSubpage.vue';
import BrandStrategySubpage from '@/views/Modules/strategic/BrandStrategySubpage.vue';


// Define routes
const routes = [
  // Homepage route - must be publicly accessible and meet Google requirements
  {
    path: '/',
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



  //==================== Super Admin =========================
  {
    path: '/superadmin',
    component: SuperAdminLayout,
    children: [
      { path: 'dashboard', name: 'SuperAdmin', component: SuperAdminOverview },
      { path: 'system-traces', name: 'SystemTraces', component: () => import('@/views/Admin/SystemTraces.vue') },
      
      { path: 'tenant-revenues', name: 'TenantRevenues', component: TenantRevenues },
      { path: 'tenant-reports', name: 'TenantReports', component: TenantReports },
     
      { path: 'rag-chat', component: RagChat },
      { path: 'rag-upload', component: RagUpload },
      { path: 'email-management', name: 'EmailManagement', component: EmailManagement },
      
    
      { path: 'user-module-access', name: 'UserModuleAccess', component: () => import('@/views/Admin/UserModuleManagement.vue') },
    ]
  },
  { path: '/lexi-ai-lawyer', component: RagChat },


  // Dashboard routes
  {
    path: '/dashboard',
    component: () => import('../components/layouts/DashboardLayout.vue'),
    meta: { requiresAuth: false }, // We'll handle auth in the global beforeEach guard

    children: [
      { path: '', redirect: '/dashboard/home' },
      { path: 'home', name: 'DashboardHome', component: () => import('../views/DashboardHome.vue') },
      { path: 'portfolio', name: 'PortfolioOverview', component: () => import('../views/PortfolioOverview.vue') },
      { path: 'customer/:id', name: 'CustomerDetail', component: () => import('../views/CustomerDetail.vue') },
      { path: 'branch-manager', name: 'BranchManagerDashboard', component: () => import('../views/Modules/managers/BranchManagerDashboard.vue') },
      { path: 'models', name: 'ModelsMonitoring', component: () => import('../views/Modules/aiagents/Models.vue') },
      { path: 'etl-pipeline', name: 'EtlPipeline', component: () => import('../views/Modules/datapipeline/EtlPipeline.vue') },
      { path: 'etl-run-history', name: 'EtlRunHistory', component: () => import('../views/Modules/datapipeline/ETLRunHistory.vue') },
     
      { path: 'ai', name: 'AiModule', component: () => import('../views/Modules/aiagents/AiModule.vue') },
      { path: 'settings', name: 'SettingsModule', component: () => import('../views/Modules/settings/SettingsModule.vue') },
      { path: 'subaccounts', name: 'SubAccountsModule', component: () => import('../views/Modules/settings/SubAccountModule.vue') },
      { path: 'settings/users', name: 'UserManagement', component: () => import('../views/Modules/settings/UserManagement.vue') },
      { path: 'profile', name: 'ProfileModule', component: () => import('../views/Modules/settings/ProfileModule.vue') },
      
      // { path: 'image-capture', name: 'ImageCaptureModule', component: () => import('../views/Modules/aiagents/ImageCaptureModule.vue') },
    
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
      
      { path: 'strategic-management', redirect: '/dashboard/strategic/overview' },
      { path: 'strategic/overview', name: 'StrategicOverview', component: OverviewSubpage },
      { path: 'strategic/notes', name: 'StrategicNotes', component: NotesSubpage },
      { path: 'strategic/governance', name: 'StrategicGovernance', component: GovernanceSubpage },
      { path: 'strategic/actions', name: 'StrategicActions', component: ActionsSubpage },
      { path: 'strategic/goals', name: 'StrategicGoals', component: GoalsSubpage },
      { path: 'strategic/predictions', name: 'StrategicPredictions', component: PredictionsSubpage },
      { path: 'strategic/analysis', name: 'StrategicAnalysis', component: AnalysisSubpage },
      { path: 'strategic/funding', name: 'StrategicFunding', component: FundingSubpage },
      { path: 'strategic/environmental', name: 'StrategicEnvironmental', component: EnvironmentalSubpage },
      { path: 'strategic/internal-analysis', name: 'StrategicInternalAnalysis', component: InternalAnalysisSubpage },
      { path: 'strategic/positioning', name: 'StrategicPositioning', component: PositioningSubpage },
      { path: 'strategic/brand', name: 'StrategicBrand', component: BrandStrategySubpage },
      
      
     
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

// Centralized Route Guard: Authentication & Subscription Enforcement
router.beforeEach(async (to, from, next) => {
  if (DEV_BYPASS) {
    return next();
  }

  // Handle admin impersonation token from URL query param
  const impersonateToken = to.query.ub_impersonate;
  if (impersonateToken) {
    localStorage.setItem('token', impersonateToken);
    // Clear the query param and redirect to dashboard
    const cleanQuery = { ...to.query };
    delete cleanQuery.ub_impersonate;
    // Navigate to dashboard/home, the app will decode the JWT and set user context
    return next({ path: '/dashboard/home', query: cleanQuery, replace: true });
  }

  const { getUserRole } = decodeJWT();
  const token = localStorage.getItem('token');
  const role = getUserRole();

  // 1. Authentication Check
  if (to.meta.requiresAuth && !token) {
    return next('/login');
  }

  // 2. Subscription & Module Access Check (Dashboard routes)
  if (to.path.startsWith('/dashboard') && to.path !== '/dashboard/home') {
    // Special handling for profile/settings/subaccounts (usually allowed if logged in)
    const allowedUniversal = ['/dashboard/profile', '/dashboard/settings', '/dashboard/subaccounts', '/dashboard/home'];
    if (allowedUniversal.includes(to.path)) {
      return next();
    }

    // Identify which module this path belongs to
    const cards = getModuleCards();
    const targetModule = cards.find(c => to.path.startsWith(c.route));

    if (targetModule) {
      // Check if this module requires a subscription
      const moduleDef = availableModules.find(m => m.id === targetModule.id);

      if (moduleDef && moduleDef.requiresSubscription) {
        // Fetch/Check subscriptions from cache
        const subDetails = JSON.parse(localStorage.getItem('ub_subscription_details_v1') || '{}');
        const activeSubs = subDetails.modules || []; // Adjust based on cache structure in SettingsModule.vue

        // If owner/admin, we might want to check against the full fetched list
        // For now, if it's in the cache, allow. If not, we could consider it unauthorized.
        // HOWEVER, a better way is to check the 'subscribedModules' logic from DashboardLayout.
        // Since router guards are async, we can't easily wait for a fetch every time without lag.
        // We'll trust the cache for now, or allow if user is owner (they see the module and get the 'Subscribe' prompt inside)

        if (role !== 'owner' && role !== 'admin' && role !== 'super_admin' && role !== 'manager') {
          // For non-admin/non-manager roles, strict check if module is even in their 'allowed' list (from local storage)
          // Manager role is excluded because it has broad default permissions and the DashboardLayout
          // will correctly filter what it can see — the stale localStorage check would false-block it.
          const allowedModules = JSON.parse(localStorage.getItem('ub_allowed_modules') || '[]');
          if (allowedModules.length > 0 && !allowedModules.includes(targetModule.id)) {
            return next('/403');
          }
        }
      }
    }
  }

  // If navigating to the POS module, set a short-lived session flag so the POS view
  // can scroll the sale controls into view immediately on mount.


  next();
});

export default router;
