/**
 * Module card definitions for the dashboard
 * Each module has: id, emoji, icon, title, desc, price/free, and a route generator
 */

// Base routes
const BASE_ROUTE = '/dashboard';
const HR_ROUTE = '/';

/**
 * Returns the full list of module cards with computed routes
 */
export function getModuleCards() {
  return [
    { id: 'ai', emoji: '🤖', icon: 'fas fa-robot', title: 'UB Copilot', desc: 'Get sales forecasts and AI recommendations.', price: 50, route: `${BASE_ROUTE}/ai` },
    { id: 'subaccounts', emoji: '👥', icon: 'fas fa-users-cog', title: 'User Management', desc: 'Manage users, roles, and branch access.', free: true, route: `${BASE_ROUTE}/subaccounts` },

    // { id: 'image-capture', emoji: '📷', icon: 'fas fa-camera', title: 'Image Capture - Text Scanner', desc: 'Scan documents and extract text with AI-powered OCR.', free: true, route: `${BASE_ROUTE}/image-capture` },
   
    { id: 'profile', emoji: '👤', icon: 'fas fa-user-circle', title: 'Profile', desc: 'Manage your business profile.', free: true, route: `${BASE_ROUTE}/profile` },
    { id: 'reports', emoji: '📊', icon: 'fas fa-chart-pie', title: 'Reports', desc: 'View charts and business analytics.', price: 0, route: `${BASE_ROUTE}/reports`, bundledWith: 'finance' },
    { id: 'settings', emoji: '⚙️', icon: 'fas fa-cogs', title: 'Settings', desc: 'Update shop and app configurations.', free: true, route: `${BASE_ROUTE}/settings` },
  
    { id: 'crm', emoji: '🧑‍💼', icon: 'fas fa-address-book', title: 'CRM Module', desc: 'Customer Relationship Management.', price: 500, route: `${BASE_ROUTE}/crm` },
    { id: 'strategic-management', emoji: '♟️', icon: 'fas fa-chess', title: 'Executive Module', desc: 'Strategic Planning and Analysis.', price: 300, route: `${BASE_ROUTE}/strategic-management` },
    { id: 'finance', emoji: '💳', icon: 'fas fa-wallet', title: 'Finance', desc: 'Complete financial overview and management.', price: 200, route: `${BASE_ROUTE}/finance` },
   
   
  
    { id: 'admin', emoji: '🛡️', icon: 'fas fa-shield-alt', title: 'Admin', desc: 'Super Admin Dashboard.', free: false, route: '/superadmin/dashboard', adminPage: true },
    { id: 'admin_overview', emoji: '📊', icon: 'fas fa-home', title: 'Admin Overview', desc: 'Admin dashboard overview.', free: true, route: '/superadmin/dashboard', adminPage: true },
    
    { id: 'admin_revenue', emoji: '💰', icon: 'fas fa-chart-line', title: 'Revenue Overview', desc: 'Tenant revenues.', free: true, route: '/superadmin/tenant-revenues', adminPage: true },
   
    { id: 'admin_reports', emoji: '📄', icon: 'fas fa-file-alt', title: 'Reports', desc: 'Tenant reports.', free: true, route: '/superadmin/tenant-reports', adminPage: true },
   
    { id: 'admin_kpis', emoji: '📈', icon: 'fas fa-tachometer-alt', title: 'KPI Monitor', desc: 'KPI growth monitor.', free: true, route: '/superadmin/kpi-growth', adminPage: true },
    { id: 'admin_user_activities', emoji: '👤', icon: 'fas fa-user-clock', title: 'User Activities', desc: 'Track user activity.', free: true, route: '/superadmin/user-activities', adminPage: true },
    { id: 'admin_module_access', emoji: '🔑', icon: 'fas fa-key', title: 'Module Access', desc: 'Assign modules to users.', free: true, route: '/superadmin/user-module-access', adminPage: true },
    { id: 'admin_email', emoji: '📧', icon: 'fas fa-envelope-open-text', title: 'Email Mgmt', desc: 'Email configuration.', free: true, route: '/superadmin/email-management', adminPage: true },

   
    { id: 'admin_rag_upload', emoji: '📤', icon: 'fas fa-upload', title: 'RAG Upload', desc: 'Upload RAG documents.', free: true, route: '/superadmin/rag-upload', adminPage: true },
    { id: 'admin_rag_chat', emoji: '💭', icon: 'fas fa-comments', title: 'RAG Chat', desc: 'Chat with RAG system.', free: true, route: '/superadmin/rag-chat', adminPage: true },
   
    { id: 'admin_traces', emoji: '🔗', icon: 'fas fa-network-wired', title: 'System Traces', desc: 'System trace viewer.', free: true, route: '/superadmin/system-traces', adminPage: true },
    { id: 'admin_endpoints', emoji: '❤️', icon: 'fas fa-heartbeat', title: 'Endpoints', desc: 'Endpoint health monitor.', free: true, route: '/superadmin/endpoint-monitor', adminPage: true },

    { id: 'branch-manager', emoji: '🏢', icon: 'fas fa-building', title: 'Branch Manager', desc: 'Branch-level analytics, RM performance, and churn forecasting.', free: true, route: '/dashboard/branch-manager' }
  ];
}

/**
 * Get only paid modules
 */
export function getPaidModules() {
  return getModuleCards().filter(c => !c.free);
}

/**
 * Get only free modules
 */
export function getFreeModules() {
  return getModuleCards().filter(c => c.free === true);
}

/**
 * Find a module by ID
 */
export function getModuleById(id) {
  return getModuleCards().find(c => c.id === id) || null;
}

/**
 * Sidebar navigation items
 * Used by Sidebar.vue for the main navigation menu
 */
export function getSidebarItems() {
  return [
   
    
    { id: 'ai', label: 'UB Copilot', icon: 'fas fa-robot', route: '/dashboard/ai' },
    { id: 'reports', label: 'Reports', icon: 'fas fa-chart-pie', route: '/dashboard/reports' },
    { id: 'image-capture', label: 'Text Scanner', icon: 'fas fa-camera', route: '/dashboard/image-capture' },
   

    { id: 'settings', label: 'Settings', icon: 'fas fa-cogs', route: '/dashboard/settings' },
    { id: 'admin', label: 'Admin', icon: 'fas fa-shield-alt', route: '/superadmin/dashboard' },
    { id: 'subaccounts', label: 'Users', icon: 'fas fa-users-cog', route: '/dashboard/subaccounts' },
   
    { id: 'crm', label: 'CRM', icon: 'fas fa-address-book', route: '/dashboard/crm' },
    { id: 'strategic-management', label: 'Executive Suite', icon: 'fas fa-chess', route: '/dashboard/strategic-management' },
   
   
   

    { id: 'branch-manager', label: 'Branch Manager', icon: 'fas fa-building', route: '/dashboard/branch-manager' },
  ];
}

/**
 * Super Admin navigation items
 */
export function getSuperAdminSidebarItems() {
  return [
    { id: 'superadmin-home', label: 'Overview', icon: 'fas fa-home', route: '/superadmin/dashboard' },
   
    { id: 'reports', label: 'Reports', icon: 'fas fa-file-alt', route: '/superadmin/tenant-reports' },
  
    { id: 'user-activities', label: 'User Activities', icon: 'fas fa-user-clock', route: '/superadmin/user-activities' },
    { id: 'user-module-access', label: 'Module Access', icon: 'fas fa-key', route: '/superadmin/user-module-access' },
    { id: 'email', label: 'Email', icon: 'fas fa-envelope-open-text', route: '/superadmin/email-management' },
   
    { id: 'rag-upload', label: 'RAG Upload', icon: 'fas fa-upload', route: '/superadmin/rag-upload' },
    { id: 'rag-chat', label: 'RAG Chat', icon: 'fas fa-comments', route: '/superadmin/rag-chat' },
    
    { id: 'system-traces', label: 'System Traces', icon: 'fas fa-network-wired', route: '/superadmin/system-traces' },
    { id: 'endpoint-monitor', label: 'Endpoints', icon: 'fas fa-heartbeat', route: '/superadmin/endpoint-monitor' },
    { id: 'back-to-app', label: 'Back to App', icon: 'fas fa-arrow-left', route: '/dashboard/home' },
  ];
}

/**
 * Get a sidebar item by ID
 */
export function getSidebarItemById(id) {
  return getSidebarItems().find(item => item.id === id) || null;
}

/**
 * Available modules for settings/subscription management
 * Canonical list of modules with subscription requirements
 * Used by SettingsModule.vue and SubAccountModule.vue
 */
export const availableModules = [

  { id: 'crm', title: 'CRM Module', requiresSubscription: true },
  { id: 'payroll', title: 'Payroll', requiresSubscription: true },
  { id: 'ai', title: 'AI Agent Module', requiresSubscription: true },
  { id: 'reports', title: 'Reports & Analytics', requiresSubscription: true },

  { id: 'settings', title: 'Settings', requiresSubscription: false },
 
  { id: 'subaccounts', title: 'User Management', requiresSubscription: false },
 
];

/**
 * Get available modules (for backward compatibility)
 */
export function getAvailableModules() {
  return availableModules;
}

/**
 * Get module title by ID
 */
export function getModuleTitle(moduleId) {
  return getModuleCards().find(m => m.id === moduleId)?.title || moduleId;
}

// Export routes for use elsewhere
export const BASE_DASHBOARD_ROUTE = BASE_ROUTE;
export const HR_MODULE_ROUTE = HR_ROUTE;
