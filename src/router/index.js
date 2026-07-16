import { createRouter, createWebHistory } from 'vue-router';
import { decodeJWT } from '@/api_services/decodeJWT';
import { getModuleCards, availableModules } from '@/config/moduleCards';
import { DEV_BYPASS } from '@/config/devFlags.js';

// Lazy load LandingPage to avoid circular dependency with api.js importing router
const LandingPage = () => import('@/views/Home.vue');

// =============================UB App Bot================================
const UBBot = () => import('@/views/ubbot/ubbot.vue');

// ============================Authentications page imports=============================
import MultiStepSignup from '@/views/auth/MultiStepSignup.vue';
import Login from '@/views/auth/login.vue';
import ResetPassword from '@/views/auth/ResetPassword.vue';

import SuperAdminLayout from '@/components/layouts/SuperAdminLayout.vue';
import SuperAdminOverview from '@/views/AdminView/AdminDashboard.vue';
import TenantManagement from '@/views/AdminView/TenantManagement.vue';
import PaymentGateway from '@/views/AdminView/PaymentGateway.vue';
import TenantRevenues from '@/views/AdminView/Revenue.vue';
import TenantReports from '@/views/AdminView/Reports.vue';
import TenantTaxes from '@/views/AdminView/Taxes.vue';
import RagChat from '@/views/AdminView/RagChat.vue'
import RagUpload from '@/views/AdminView/RagUpload.vue'
import EmailManagement from '@/views/AdminView/EmailManagement.vue'
import PartnerLogoManagement from '@/views/AdminView/PartnerLogoManagement.vue'
import TestimonialsManager from '@/views/AdminView/TestimonialsManager.vue'
import UserActivities from '@/views/AdminView/UserActivities.vue'

//===========================HR Module Imports ===========================
import ResumeParsing from '@/views/HRModule/pages/ResumeParsing.vue';
import ProfileScoring from '@/views/HRModule/pages/ProfileScoring.vue';
import Shortlisting from '@/views/HRModule/pages/Shortlisting.vue';
import ChatScreening from '@/views/HRModule/pages/ChatScreening.vue';
import Scheduling from '@/views/HRModule/pages/Scheduling.vue';
import DecisionSupport from '@/views/HRModule/pages/DecisionSupport.vue';
import CandidateProfile from '@/views/HRModule/pages/CandidateProfile.vue';
import Dashboard from '@/views/HRModule/pages/Dashboard.vue';
import NotFound from '@/views/HRModule/pages/NotFound.vue';
import AutomationOverview from '@/views/HRModule/pages/AutomationOverview.vue';
import UserPortal from '@/views/HRModule/portal/UsersPortal.vue';


// ===================================Strategic Management Module ==============================

import OverviewSubpage from '@/views/dashboardModules/strategic/OverviewSubpage.vue';
import NotesSubpage from '@/views/dashboardModules/strategic/NotesSubpage.vue';
import GovernanceSubpage from '@/views/dashboardModules/strategic/GovernanceSubpage.vue';
import ActionsSubpage from '@/views/dashboardModules/strategic/ActionsSubpage.vue';
import GoalsSubpage from '@/views/dashboardModules/strategic/GoalsSubpage.vue';
import PredictionsSubpage from '@/views/dashboardModules/strategic/PredictionsSubpage.vue';
import AnalysisSubpage from '@/views/dashboardModules/strategic/AnalysisSubpage.vue';
import FundingSubpage from '@/views/dashboardModules/strategic/FundingSubpage.vue';
import EnvironmentalSubpage from '@/views/dashboardModules/strategic/EnvironmentalSubpage.vue';
import InternalAnalysisSubpage from '@/views/dashboardModules/strategic/InternalAnalysisSubpage.vue';
import PositioningSubpage from '@/views/dashboardModules/strategic/PositioningSubpage.vue';
import BrandStrategySubpage from '@/views/dashboardModules/strategic/BrandStrategySubpage.vue';
import ProjectsModule from '@/views/dashboardModules/hrmodules/projects/ProjectsModule.vue';
import ProjectDetails from '@/views/dashboardModules/hrmodules/projects/ProjectDetails.vue';


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
  {
    path: '/pricing',
    name: 'PricingCalculator',
    component: () => import('@/views/PricingCalculator.vue'),
    meta: {
      requiresAuth: false,
      isPublic: true
    }
  },
  {
    path: '/marketplace',
    name: 'MarketplaceStorefront',
    component: () => import('@/views/MarketplaceStorefront.vue'),
    meta: {
      requiresAuth: false,
      isPublic: true
    }
  },
  {
    path: '/apply/:slug',
    name: 'PublicApplicationPortal',
    component: () => import('../views/portals/PublicApplicationPortal.vue'),
    meta: {
      requiresAuth: false,
      isPublic: true
    }
  },

  //==============================compliance Module =====================
  //  {path:'/compliance' ,name: 'Compliance', component: ComplianceModule},
  // Loading test page
  {
    path: '/loading-test',
    name: 'LoadingTest',
    component: () => import('@/views/LoadingTestPage.vue'),
    meta: { requiresAuth: false }
  },

  // ================================Hr Routes =====================
  {
    path: '/hrmodule',
    component: () => import('../components/layouts/DashboardLayout.vue'),
    name: 'dashboard-layout',
    children: [
      { path: '', component: Dashboard, name: 'dashboard' },
      { path: 'resume-parsing', component: ResumeParsing, name: 'resume-parsing' },
      { path: 'profile-scoring', component: ProfileScoring, name: 'profile-scoring' },
      { path: 'shortlisting', component: Shortlisting, name: 'shortlisting' },
      { path: 'chat-screening', component: ChatScreening, name: 'chat-screening' },
      { path: 'scheduling', component: Scheduling, name: 'scheduling' },
      { path: 'decision-support', component: DecisionSupport, name: 'decision-support' },
      { path: 'candidate/:id', component: CandidateProfile, name: 'candidate-profile' },
      { path: 'automation-overview', component: AutomationOverview, name: 'automation-overview' },
      { path: 'staff', name: 'StaffPage', component: () => import('../views/dashboardModules/hrmodules/StaffPage.vue') },
      { path: 'task-payroll', name: 'TaskPayroll', component: () => import('../views/dashboardModules/hrmodules/TaskPayrollPage.vue') },
      { path: 'attendance', name: 'MyAttendance', component: () => import('../views/dashboardModules/hrmodules/AttendancePage.vue') },
      { path: 'hr-reports', name: 'HRReports', component: () => import('../views/dashboardModules/hrmodules/HRReportsPage.vue') },
      // Portal Builder Routes
      { path: 'discipline', name: 'EmployeeDiscipline', component: () => import('../views/dashboardModules/hrmodules/EmployeeDisciplinePage.vue') },
      { path: 'portals', name: 'PortalLaunchpad', component: () => import('../views/HRModule/pages/PortalLaunchpad.vue') },
      { path: 'portals/new', name: 'PortalBuilderNew', component: () => import('../views/HRModule/pages/PortalBuilder.vue') },
      { path: 'portals/edit/:id', name: 'PortalBuilderEdit', component: () => import('../views/HRModule/pages/PortalBuilder.vue') },
    ],
  },
  // Public pages required by Google OAuth
 

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
    path: '/signup',
    name: 'MultiStepSignup',
    component: MultiStepSignup,
    meta: { requiresAuth: false },
    beforeEnter: (to, from, next) => {
      if (DEV_BYPASS) {
        return next();
      }
      const consent = localStorage.getItem('uniplexity_consent')
      if (!consent) {
        next('/terms-acceptance')
      } else {
        next()
      }
    }
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

  { path: '/portal', component: UserPortal, name: 'user-portal' },

  //==================== Super Admin =========================
  {
    path: '/superadmin',
    component: SuperAdminLayout,
    children: [
      { path: 'dashboard', name: 'SuperAdmin', component: SuperAdminOverview },
      { path: 'system-traces', name: 'SystemTraces', component: () => import('@/views/AdminView/SystemTraces.vue') },
      { path: 'tenant-management', name: 'TenantManagement', component: TenantManagement },
      { path: 'tenant-revenues', name: 'TenantRevenues', component: TenantRevenues },
      { path: 'tenant-reports', name: 'TenantReports', component: TenantReports },
      { path: 'tenant-taxes', name: 'TenantTaxes', component: TenantTaxes },
      { path: 'rag-chat', component: RagChat },
      { path: 'rag-upload', component: RagUpload },
      { path: 'email-management', name: 'EmailManagement', component: EmailManagement },
      { path: 'user-activities', name: 'UserActivities', component: UserActivities },
      { path: 'partner-logos', name: 'PartnerLogoManagement', component: PartnerLogoManagement },
      { path: 'testimonials', name: 'TestimonialsManager', component: TestimonialsManager },
      { path: 'lending-admin', name: 'LendingAdminMfe', component: () => import('../views/dashboardModules/microfinance/MicrofinanceFallback.vue') },
      { path: 'settings', name: 'SuperAdminSettings', component: () => import('@/views/AdminView/Settings.vue') },
      { path: 'pricing-management', name: 'PricingManagement', component: () => import('@/views/AdminView/PricingManagement.vue') },
      { path: 'kpi-growth', name: 'KPIGrowthMonitor', component: () => import('@/views/AdminView/KPIGrowthMonitor.vue') },
      { path: 'tenant-storage', name: 'TenantStorage', component: () => import('@/views/AdminView/TenantStorage.vue') },
      { path: 'payment-gateway', name: 'PaymentGateway', component: PaymentGateway },
      { path: 'endpoint-monitor', name: 'EndpointMonitor', component: () => import('@/views/AdminView/EndpointMonitor.vue') },
      { path: 'sales-analytics', name: 'SalesAnalytics', component: () => import('@/views/AdminView/SalesAnalytics.vue') },
      { path: 'user-module-access', name: 'UserModuleAccess', component: () => import('@/views/AdminView/UserModuleManagement.vue') },
    ]
  },
  { path: '/lexi-ai-lawyer', component: RagChat },

  //==================ai bot=================================
  { path: '/ub-bot', name: 'UBBot', component: UBBot },

  // Dashboard routes
  {
    path: '/dashboard',
    component: () => import('../components/layouts/DashboardLayout.vue'),
    meta: { requiresAuth: true },

    children: [
      { path: '', redirect: '/dashboard/home' },
      { path: 'home', name: 'DashboardHome', component: () => import('../views/DashboardHome.vue') },
     
      { path: 'invoicing', name: 'InvoicingModule', component: () => import('../views/dashboardModules/sales/InvoicingModule.vue') },
      { path: 'invoicing/invoices', name: 'InvoicesPage', component: () => import('../views/dashboardModules/sales/invoicing/InvoicesPage.vue') },
      { path: 'invoicing/quotations', name: 'QuotationsPage', component: () => import('../views/dashboardModules/sales/invoicing/QuotationsPage.vue') },
      { path: 'invoicing/proposals', name: 'ProposalsPage', component: () => import('../views/dashboardModules/sales/invoicing/ProposalsPage.vue') },
      { path: 'invoicing/contracts', name: 'ContractsPage', component: () => import('../views/dashboardModules/sales/invoicing/ContractsPage.vue') },
      { path: 'invoicing/progress-reports', name: 'ProgressReportsPage', component: () => import('../views/dashboardModules/sales/invoicing/ProgressReportsPage.vue') },
      { path: 'invoicing/recurring', name: 'RecurringInvoicesPage', component: () => import('../views/dashboardModules/sales/invoicing/RecurringInvoicesPage.vue') },
      { path: 'invoicing/billing-report', name: 'BillingReportPage', component: () => import('../views/dashboardModules/sales/invoicing/BillingReportPage.vue') },
      { path: 'invoicing/receipts', name: 'ReceiptsPage', component: () => import('../views/dashboardModules/sales/invoicing/ReceiptsPage.vue') },
      { path: 'invoicing/credit-debit-notes', name: 'CreditDebitNotesPage', component: () => import('../views/dashboardModules/sales/invoicing/CreditDebitNotesPage.vue') },
      { path: 'invoicing/bank-accounts', name: 'BankAccountsPage', component: () => import('../views/dashboardModules/sales/invoicing/BankAccountsPage.vue') },
      { path: 'invoicing/all', name: 'AllDocumentsPage', component: () => import('../views/dashboardModules/sales/invoicing/AllDocumentsPage.vue') },
      { path: 'ai', name: 'AiModule', component: () => import('../views/dashboardModules/aiagents/AiModule.vue') },
      { path: 'reports', name: 'ReportsModule', component: () => import('../views/dashboardModules/ReportsModule.vue') },

      { path: 'settings', name: 'SettingsModule', component: () => import('../views/dashboardModules/settings/SettingsModule.vue') },
      { path: 'allshops', name: 'AllShopsModule', component: () => import('../views/dashboardModules/settings/SubAccountModule.vue') },
      { path: 'profile', name: 'ProfileModule', component: () => import('../views/dashboardModules/settings/ProfileModule.vue') },
      { path: 'expenses', name: 'ExpensesModule', component: () => import('../views/dashboardModules/accounting/ExpensesDashboard.vue') },
      { path: 'expenses/list', name: 'ExpensesList', component: () => import('../views/dashboardModules/accounting/expenses/ExpensesListPage.vue') },
      { path: 'expenses/fixed-costs', name: 'FixedCosts', component: () => import('../views/dashboardModules/accounting/expenses/FixedCostsPage.vue') },
      // Legacy aliases (ExpensesModuleFull.vue removed)
      { path: 'expenses/all', name: 'AllExpenses', redirect: (to) => ({ name: 'ExpensesList', query: to.query }) },
      { path: 'expenses/reports', name: 'ExpensesReports', redirect: (to) => ({ name: 'ExpensesModule', query: { ...to.query, open: 'reports' } }) },
      { path: 'delivery-tickets', name: 'DeliveryTickets', component: () => import('@/views/dashboardModules/DeliveryTicketModule.vue') },
      { path: 'image-capture', name: 'ImageCaptureModule', component: () => import('../views/dashboardModules/aiagents/ImageCaptureModule.vue') },
      { path: 'mining', name: 'MiningModule', component: () => import('../views/dashboardModules/mining/MiningModule2.vue') },
      { path: 'crm', name: 'CrmModule', component: () => import('../views/dashboardModules/sales/CRMModule.vue') },
      { path: 'crm/leads', name: 'CrmLeads', component: () => import('../views/dashboardModules/sales/CRMLeadsPage.vue') },
      { path: 'crm/pipeline', name: 'CrmPipeline', component: () => import('../views/dashboardModules/sales/CRMPipelinePage.vue') },
      { path: 'crm/contacts', name: 'CrmContacts', component: () => import('../views/dashboardModules/sales/CRMContactsPage.vue') },
      { path: 'crm/accounts', name: 'CrmAccounts', component: () => import('../views/dashboardModules/sales/CRMAccountsPage.vue') },
      { path: 'crm/deals', name: 'CrmDeals', component: () => import('../views/dashboardModules/sales/CRMDealsPage.vue') },
      { path: 'crm/documents', name: 'CrmDocuments', component: () => import('../views/dashboardModules/sales/CRMDocumentsPage.vue') },
      { path: 'crm/meetings', name: 'CrmMeetings', component: () => import('../views/dashboardModules/sales/CRMMeetingsPage.vue') },
      { path: 'crm/emails', name: 'CrmEmails', component: () => import('../views/dashboardModules/sales/CRMEmailsPage.vue') },
      { path: 'crm/calls', name: 'CrmCalls', component: () => import('../views/dashboardModules/sales/CRMCallsPage.vue') },
      { path: 'crm/visits', name: 'CrmVisits', component: () => import('../views/dashboardModules/sales/CRMVisitsPage.vue') },
      { path: 'crm/whatsapp', name: 'CrmWhatsApp', component: () => import('../views/dashboardModules/sales/CRMWhatsAppPage.vue') },
      { path: 'crm/acquisition', name: 'CrmAcquisition', component: () => import('../views/dashboardModules/sales/CRMAcquisitionPage.vue') },
      { path: 'loans', name: 'LoansModule', component: () => import('../views/dashboardModules/accounting/LoansModule.vue') },
      { path: 'payroll', name: 'PayrollModule', component: () => import('../views/dashboardModules/hrmodules/PayrollModule.vue') },
      { path: 'hr-staff', name: 'StaffDashboardModule', component: () => import('../views/dashboardModules/hrmodules/StaffDashboardModule.vue') },
      { path: 'training', name: 'TrainingCenter', component: () => import('../views/dashboardModules/hrmodules/TrainingPage.vue') },
      
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
      // { path: 'income-capital', name: 'IncomeCapital', component: () => import('../views/dashboardModules/accounting/IncomeCapitalModule.vue') },
      { path: 'finance', name: 'FinanceModule', component: () => import('../views/dashboardModules/accounting/FinanceModule.vue') },
      { path: 'ubpay', name: 'UbPayWallet', component: () => import('../views/dashboardModules/accounting/UbPayWallet.vue') },
      { path: 'bank-accounts', name: 'BankAccountsModule', component: () => import('../views/dashboardModules/accounting/BankAccountsModule.vue') },
      { path: 'hr-dashboard', name: 'HRDashboardModule', component: () => import('../views/dashboardModules/hrmodules/HRDashboardModule.vue') },
      
      // Marketplace Module
      { path: 'marketplace', name: 'MarketplaceDashboard', component: () => import('../views/dashboardModules/marketplace/MarketplaceDashboard.vue') },

      { path: 'projects', name: 'ProjectsModule', component: ProjectsModule },
      { path: 'projects/:projectId', name: 'ProjectDetailsNew', component: ProjectDetails },
      { path: 'project-details/:projectId', name: 'ProjectDetails', component: ProjectDetails },
      { path: 'budgets', name: 'BudgetManagement', component: () => import('../views/dashboardModules/accounting/BudgetManagement.vue') },
    ],
  },



  // Error pages
  { path: '/403', component: () => import('../views/403.vue') },
  { path: '/unauthorized', name: 'Unauthorized', component: { template: '<div><h2>Unauthorized</h2><p>You do not have permission to access this page.</p></div>' } },

  // Catch all route - must be last
  { path: '/:pathMatch(.*)*', component: NotFound, name: 'not-found' },
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

  const { getTenantId, getUserRole } = decodeJWT();
  const token = localStorage.getItem('token');
  const tenantId = getTenantId();
  const role = getUserRole();

  // 1. Authentication Check
  if (to.meta.requiresAuth && !token) {
    return next('/login');
  }

  // 2. Subscription & Module Access Check (Dashboard routes)
  if (to.path.startsWith('/dashboard') && to.path !== '/dashboard/home') {
    // Special handling for profile/settings/allshops (usually allowed if logged in)
    const allowedUniversal = ['/dashboard/profile', '/dashboard/settings', '/dashboard/allshops'];
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
  if (to.path === '/dashboard/pos') {
    try { sessionStorage.setItem('pos_scroll_on_entry', '1'); } catch (e) {}
  }

  next();
});

export default router;