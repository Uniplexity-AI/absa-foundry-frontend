/** ABSA Customer Lifecycle Intelligence module registry. */

const BASE_ROUTE = '/dashboard';
const HR_ROUTE = '/'; // Backward-compatible export for older consumers.

const MODULE_CARDS = [
  { id: 'portfolio', emoji: '📊', icon: 'fas fa-chart-line', title: 'Customer Portfolio', desc: 'Monitor customer lifecycle, churn risk, and retention opportunities.', free: true, route: `${BASE_ROUTE}/portfolio` },
  { id: 'etl', emoji: '🔄', icon: 'fas fa-database', title: 'Data Pipeline', desc: 'Monitor ETL runs, data quality, and source freshness.', free: true, route: `${BASE_ROUTE}/etl-pipeline` },
  { id: 'models', emoji: '🧠', icon: 'fas fa-brain', title: 'Model Monitoring', desc: 'Monitor lifecycle prediction model performance and drift.', free: true, route: `${BASE_ROUTE}/models` },
  { id: 'ai', emoji: '🤖', icon: 'fas fa-robot', title: 'ABSA AI Assistant', desc: 'Get customer insights and retention recommendations.', free: true, route: `${BASE_ROUTE}/ai` },
  { id: 'crm', emoji: '🧑‍💼', icon: 'fas fa-address-book', title: 'Customer Engagement', desc: 'Manage customer interactions and action plans.', free: true, route: `${BASE_ROUTE}/crm` },
  { id: 'branch-manager', emoji: '🏢', icon: 'fas fa-building', title: 'Branch Manager', desc: 'Review branch-level performance and churn risk.', free: true, route: `${BASE_ROUTE}/branch-manager` },
  { id: 'subaccounts', emoji: '👥', icon: 'fas fa-users-cog', title: 'User Management', desc: 'Manage users, roles, branches, and access to customer intelligence.', free: true, route: `${BASE_ROUTE}/subaccounts` },
  { id: 'settings', emoji: '⚙️', icon: 'fas fa-cogs', title: 'Settings', desc: 'Manage access, branches, and user preferences.', free: true, route: `${BASE_ROUTE}/settings` },
];

export function getModuleCards() { return [...MODULE_CARDS]; }
export function getPaidModules() { return MODULE_CARDS.filter((card) => !card.free); }
export function getFreeModules() { return MODULE_CARDS.filter((card) => card.free); }
export function getModuleById(id) { return MODULE_CARDS.find((card) => card.id === id) || null; }

export function getSidebarItems() {
  return MODULE_CARDS.map(({ id, title, icon, route }) => ({ id, label: title, icon, route }));
}

export function getSuperAdminSidebarItems() {
  return [
    { id: 'superadmin-home', label: 'Overview', icon: 'fas fa-home', route: '/superadmin/dashboard' },
    { id: 'user-activities', label: 'User Activities', icon: 'fas fa-user-clock', route: '/superadmin/user-activities' },
    { id: 'user-module-access', label: 'Module Access', icon: 'fas fa-key', route: '/superadmin/user-module-access' },
    { id: 'system-traces', label: 'System Traces', icon: 'fas fa-network-wired', route: '/superadmin/system-traces' },
    { id: 'endpoint-monitor', label: 'Endpoints', icon: 'fas fa-heartbeat', route: '/superadmin/endpoint-monitor' },
    { id: 'back-to-app', label: 'Back to App', icon: 'fas fa-arrow-left', route: '/dashboard/portfolio' },
  ];
}

export function getSidebarItemById(id) {
  return getSidebarItems().find((item) => item.id === id) || null;
}

export const availableModules = MODULE_CARDS.map(({ id, title }) => ({
  id,
  title,
  requiresSubscription: false,
}));

export function getAvailableModules() { return availableModules; }
export function getModuleTitle(moduleId) { return getModuleById(moduleId)?.title || moduleId; }
export const BASE_DASHBOARD_ROUTE = BASE_ROUTE;
export const HR_MODULE_ROUTE = HR_ROUTE;
