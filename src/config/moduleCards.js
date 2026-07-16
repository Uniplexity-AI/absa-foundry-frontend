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
    { id: 'allshops', emoji: '👥', icon: 'fas fa-users-cog', title: 'User Management', desc: 'Manage users, roles, and branch access.', free: true, route: `${BASE_ROUTE}/allshops` },
    { id: 'delivery-tickets', emoji: '🚚', icon: 'fas fa-truck-loading', title: 'Delivery Tickets', desc: 'Delivery Tickets Management.', price: 120, route: `${BASE_ROUTE}/delivery-tickets` },
    { id: 'image-capture', emoji: '📷', icon: 'fas fa-camera', title: 'Image Capture - Text Scanner', desc: 'Scan documents and extract text with AI-powered OCR.', free: true, route: `${BASE_ROUTE}/image-capture` },
    { id: 'inventory', emoji: '📦', icon: 'fas fa-boxes', title: 'Inventory', desc: 'Track stock and get low stock alerts.', price: 25, route: `${BASE_ROUTE}/inventory` },
    { id: 'invoicing', emoji: '🧾', icon: 'fas fa-file-invoice', title: 'Billing', desc: 'Create and manage invoices, quotations, proposals & contracts.', price: 100, route: `${BASE_ROUTE}/invoicing` },
    { id: 'pos', emoji: '💰', icon: 'fas fa-cash-register', title: 'POS', desc: 'Sell products and manage transactions.', price: 25, route: `${BASE_ROUTE}/pos` },
    { id: 'profile', emoji: '👤', icon: 'fas fa-user-circle', title: 'Profile', desc: 'Manage your business profile.', free: true, route: `${BASE_ROUTE}/profile` },
    { id: 'reports', emoji: '📊', icon: 'fas fa-chart-pie', title: 'Reports', desc: 'View charts and business analytics.', price: 0, route: `${BASE_ROUTE}/reports`, bundledWith: 'finance' },
    { id: 'settings', emoji: '⚙️', icon: 'fas fa-cogs', title: 'Settings', desc: 'Update shop and app configurations.', free: true, route: `${BASE_ROUTE}/settings` },
    { id: 'supplier', emoji: '🚛', icon: 'fas fa-truck', title: 'Suppliers', desc: 'Manage suppliers and purchase orders.', price: 0, route: `${BASE_ROUTE}/suppliers`, bundledWith: 'inventory' },

    { id: 'expenses', emoji: '💸', icon: 'fas fa-file-invoice', title: 'Expenses', desc: 'Track and manage business expenses.', price: 50, route: `${BASE_ROUTE}/expenses` },
    { id: 'taxes', emoji: '📋', icon: 'fas fa-file-invoice-dollar', title: 'Taxes Module', desc: 'Generate and submit tax reports.', free: true, route: `${BASE_ROUTE}/taxes` },
    { id: 'loans', emoji: '💰', icon: 'fas fa-hand-holding-usd', title: 'Loans Tracker', desc: 'Loan Tracking and management.', price: 100, route: `${BASE_ROUTE}/loans` },
    { id: 'payroll', emoji: '👔', icon: 'fas fa-money-check-alt', title: 'Payroll', desc: 'Manage payroll, payslips and statutory returns.', price: 150, route: `${BASE_ROUTE}/payroll` },
    { id: 'crm', emoji: '🧑‍💼', icon: 'fas fa-address-book', title: 'CRM Module', desc: 'Customer Relationship Management.', price: 500, route: `${BASE_ROUTE}/crm` },
    { id: 'strategic-management', emoji: '♟️', icon: 'fas fa-chess', title: 'Executive Module', desc: 'Strategic Planning and Analysis.', price: 300, route: `${BASE_ROUTE}/strategic-management` },
    { id: 'finance', emoji: '💳', icon: 'fas fa-wallet', title: 'Finance', desc: 'Complete financial overview and management.', price: 200, route: `${BASE_ROUTE}/finance` },
    { id: 'hrmodule', emoji: '👥', icon: 'fas fa-users', title: 'HR Management', desc: 'Human resources overview, recruiter, and personnel management.', price: 500, route: `${BASE_ROUTE}/hr-dashboard` },
    { id: 'ub_recruiter', emoji: '🎯', icon: 'fas fa-user-tie', title: 'UB Recruiter', desc: 'AI-powered recruitment engine for scoring, shortlisting and hiring.', price: 60, route: '/hrmodule' },
    { id: 'microfinance', emoji: '🏦', icon: 'fas fa-university', title: 'Microfinance', desc: 'Loans, savings, and credit scoring management.', price: 500, route: `${BASE_ROUTE}/microfinance` },
    { id: 'hotel-manager', emoji: '🏨', icon: 'fas fa-hotel', title: 'Hotel Manager', desc: 'Room bookings, clients, conference & billing.', price: 400, route: `${BASE_ROUTE}/hotel-manager` },
    { id: 'minetech-hub', emoji: '⛏️', icon: 'fas fa-mountain', title: 'MineTech Hub', desc: 'Governed AI knowledge, incident intelligence and expert escalation for mines.', price: 650, route: `${BASE_ROUTE}/minetech-hub` },
    { id: 'assets-manager', emoji: '🏗️', icon: 'fas fa-hard-hat', title: 'Unified Assets', desc: 'Manage fleets, real estate, and machinery.', price: 300, route: `${BASE_ROUTE}/assets-manager` },
    { id: 'project-management', emoji: '📊', icon: 'fas fa-project-diagram', title: 'Project Management', desc: 'Plan and track business projects.', price: 250, route: `${BASE_ROUTE}/projects` },
    { id: 'tender-management', emoji: '📋', icon: 'fas fa-file-contract', title: 'Tender Management', desc: 'Track tenders, bids, pipeline & win/loss analytics.', price: 500, route: `${BASE_ROUTE}/tenders` },
    { id: 'edu-manager', emoji: '🎓', icon: 'fas fa-graduation-cap', title: 'Educational Management', desc: 'AI-powered lesson planning, grading & assessments.', price: 350, route: `${BASE_ROUTE}/edu-manager` },
    { id: 'marketplace', emoji: '🛒', icon: 'fas fa-store', title: 'Marketplace', desc: 'Sell products online, manage orders, deliveries & clients. 2% platform fee per sale.', free: true, route: `${BASE_ROUTE}/marketplace` },
    { id: 'hr-staff', emoji: '👤', icon: 'fas fa-user-circle', title: 'My Workspace', desc: 'Personal HR portal for attendance, tasks, and payslips.', free: true, route: `${BASE_ROUTE}/hr-staff` },
    { id: 'admin', emoji: '🛡️', icon: 'fas fa-shield-alt', title: 'Admin', desc: 'Super Admin Dashboard.', free: false, route: '/superadmin/dashboard', adminPage: true },
    { id: 'admin_overview', emoji: '📊', icon: 'fas fa-home', title: 'Admin Overview', desc: 'Admin dashboard overview.', free: true, route: '/superadmin/dashboard', adminPage: true },
    { id: 'admin_tenants', emoji: '👥', icon: 'fas fa-users', title: 'Tenant Management', desc: 'Manage tenants.', free: true, route: '/superadmin/tenant-management', adminPage: true },
    { id: 'admin_revenue', emoji: '💰', icon: 'fas fa-chart-line', title: 'Revenue Overview', desc: 'Tenant revenues.', free: true, route: '/superadmin/tenant-revenues', adminPage: true },
    { id: 'admin_taxes', emoji: '📋', icon: 'fas fa-file-invoice-dollar', title: 'Taxes', desc: 'Tenant taxes.', free: true, route: '/superadmin/tenant-taxes', adminPage: true },
    { id: 'admin_reports', emoji: '📄', icon: 'fas fa-file-alt', title: 'Reports', desc: 'Tenant reports.', free: true, route: '/superadmin/tenant-reports', adminPage: true },
    { id: 'admin_sales_analytics', emoji: '📊', icon: 'fas fa-chart-bar', title: 'Sales Analytics', desc: 'Cross-tenant sales.', free: true, route: '/superadmin/sales-analytics', adminPage: true },
    { id: 'admin_kpis', emoji: '📈', icon: 'fas fa-tachometer-alt', title: 'KPI Monitor', desc: 'KPI growth monitor.', free: true, route: '/superadmin/kpi-growth', adminPage: true },
    { id: 'admin_user_activities', emoji: '👤', icon: 'fas fa-user-clock', title: 'User Activities', desc: 'Track user activity.', free: true, route: '/superadmin/user-activities', adminPage: true },
    { id: 'admin_module_access', emoji: '🔑', icon: 'fas fa-key', title: 'Module Access', desc: 'Assign modules to users.', free: true, route: '/superadmin/user-module-access', adminPage: true },
    { id: 'admin_email', emoji: '📧', icon: 'fas fa-envelope-open-text', title: 'Email Mgmt', desc: 'Email configuration.', free: true, route: '/superadmin/email-management', adminPage: true },
    { id: 'admin_logos', emoji: '🤝', icon: 'fas fa-handshake', title: 'Partner Logos', desc: 'Manage partner logos.', free: true, route: '/superadmin/partner-logos', adminPage: true },
    { id: 'admin_testimonials', emoji: '💬', icon: 'fas fa-quote-right', title: 'Testimonials', desc: 'Customer success stories.', free: true, route: '/superadmin/testimonials', adminPage: true },
    { id: 'admin_lending', emoji: '🏦', icon: 'fas fa-university', title: 'Lending Admin', desc: 'Lending admin panel.', free: true, route: '/superadmin/lending-admin', adminPage: true },
    { id: 'admin_rag_upload', emoji: '📤', icon: 'fas fa-upload', title: 'RAG Upload', desc: 'Upload RAG documents.', free: true, route: '/superadmin/rag-upload', adminPage: true },
    { id: 'admin_rag_chat', emoji: '💭', icon: 'fas fa-comments', title: 'RAG Chat', desc: 'Chat with RAG system.', free: true, route: '/superadmin/rag-chat', adminPage: true },
    { id: 'admin_pricing', emoji: '🏷️', icon: 'fas fa-tags', title: 'Pricing Mgmt', desc: 'Manage pricing.', free: true, route: '/superadmin/pricing-management', adminPage: true },
    { id: 'admin_storage', emoji: '💾', icon: 'fas fa-hdd', title: 'Storage', desc: 'Tenant storage stats.', free: true, route: '/superadmin/tenant-storage', adminPage: true },
    { id: 'admin_payment_gateway', emoji: '💳', icon: 'fas fa-credit-card', title: 'Payment GW', desc: 'Payment gateway config.', free: true, route: '/superadmin/payment-gateway', adminPage: true },
    { id: 'admin_traces', emoji: '🔗', icon: 'fas fa-network-wired', title: 'System Traces', desc: 'System trace viewer.', free: true, route: '/superadmin/system-traces', adminPage: true },
    { id: 'admin_endpoints', emoji: '❤️', icon: 'fas fa-heartbeat', title: 'Endpoints', desc: 'Endpoint health monitor.', free: true, route: '/superadmin/endpoint-monitor', adminPage: true },
    { id: 'mining', emoji: '⛏️', icon: 'fas fa-hammer', title: 'Mining (Custom)', desc: 'Manage and oversee mining operations.', free: false, route: `${BASE_ROUTE}/mining`, adminOnly: true },
    { id: 'healthcare', emoji: '🏥', icon: 'fas fa-hospital', title: 'Healthcare (UB Health)', desc: 'Complete hospital management: patients, clinical, lab, radiology, pharmacy, inpatient & insurance.', price: 500, route: `${BASE_ROUTE}/healthcare` },
    { id: 'compliance', emoji: '🛡️', icon: 'fas fa-shield-alt', title: 'Compliance Center', desc: 'Regulatory compliance, VSDC/ZRA Smart Invoice, risk scoring, and obligation tracking.', free: true, route: `${BASE_ROUTE}/compliance` }
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
    { id: 'pos', label: 'POS', icon: 'fas fa-cash-register', route: '/dashboard/pos' },
    { id: 'inventory', label: 'Inventory', icon: 'fas fa-boxes', route: '/dashboard/inventory' },
    { id: 'supplier', label: 'Suppliers', icon: 'fas fa-truck', route: '/dashboard/suppliers' },
    { id: 'invoicing', label: 'Billing', icon: 'fas fa-file-invoice', route: '/dashboard/invoicing' },
    { id: 'ai', label: 'UB Copilot', icon: 'fas fa-robot', route: '/dashboard/ai' },
    { id: 'reports', label: 'Reports', icon: 'fas fa-chart-pie', route: '/dashboard/reports' },
    { id: 'image-capture', label: 'Text Scanner', icon: 'fas fa-camera', route: '/dashboard/image-capture' },
    { id: 'expenses', label: 'Expenses', icon: 'fas fa-file-invoice', route: '/dashboard/expenses' },
    { id: 'taxes', label: 'Taxes Module', icon: 'fas fa-file-invoice-dollar', route: '/dashboard/zra' },

    { id: 'settings', label: 'Settings', icon: 'fas fa-cogs', route: '/dashboard/settings' },
    { id: 'admin', label: 'Admin', icon: 'fas fa-shield-alt', route: '/superadmin/dashboard' },
    { id: 'allshops', label: 'Users', icon: 'fas fa-users-cog', route: '/dashboard/allshops' },
    { id: 'delivery-tickets', label: 'Delivery Tickets', icon: 'fas fa-truck-loading', route: '/dashboard/delivery-tickets' },
    { id: 'crm', label: 'CRM', icon: 'fas fa-address-book', route: '/dashboard/crm' },
    { id: 'strategic-management', label: 'Executive Suite', icon: 'fas fa-chess', route: '/dashboard/strategic-management' },
    { id: 'finance', label: 'Finance', icon: 'fas fa-wallet', route: '/dashboard/finance' },
    { id: 'hrmodule', label: 'HR Management', icon: 'fas fa-users', route: '/dashboard/hr-dashboard' },
    { id: 'ub_recruiter', label: 'UB Recruiter', icon: 'fas fa-user-tie', route: '/hrmodule' },
    { id: 'microfinance', label: 'Microfinance', icon: 'fas fa-university', route: '/dashboard/microfinance' },
    // Internal Microfinance Routes
    { id: 'mf-lender', label: 'Lender Portal', icon: 'fas fa-hand-holding-usd', route: '/dashboard/microfinance/lender' },
    { id: 'mf-investor', label: 'Investor Portal', icon: 'fas fa-chart-line', route: '/dashboard/microfinance/investor' },
    { id: 'mf-wallet', label: 'My Wallet', icon: 'fas fa-wallet', route: '/dashboard/microfinance/wallet' },
    // Hotel Manager Module
    { id: 'hotel-manager', label: 'Hotel Manager', icon: 'fas fa-hotel', route: '/dashboard/hotel-manager' },
    { id: 'hotel-frontdesk', label: 'Front Desk', icon: 'fas fa-concierge-bell', route: '/dashboard/hotel-manager/frontdesk' },
    { id: 'hotel-rooms', label: 'Rooms', icon: 'fas fa-bed', route: '/dashboard/hotel-manager/rooms' },
    { id: 'hotel-conference', label: 'Conference', icon: 'fas fa-chalkboard-teacher', route: '/dashboard/hotel-manager/conference' },
    { id: 'hotel-client-reports', label: 'Client Reports', icon: 'fas fa-users', route: '/dashboard/hotel-manager/reports/clients' },
    { id: 'minetech-hub', label: 'MineTech Hub', icon: 'fas fa-mountain', route: '/dashboard/minetech-hub' },
    { id: 'minetech-knowledge', label: 'Knowledge Vault', icon: 'fas fa-database', route: '/dashboard/minetech-hub/knowledge' },
    { id: 'minetech-incidents', label: 'Incident Intel', icon: 'fas fa-triangle-exclamation', route: '/dashboard/minetech-hub/incidents' },
    { id: 'minetech-governance', label: 'Governance', icon: 'fas fa-lock', route: '/dashboard/minetech-hub/governance' },
    // Assets Manager
    { id: 'assets-manager', label: 'Assets Manager', icon: 'fas fa-hard-hat', route: '/dashboard/assets-manager' },
    // Project Management
    { id: 'project-management', label: 'Projects', icon: 'fas fa-project-diagram', route: '/dashboard/projects' },
    // Tender Management
    { id: 'tender-management', label: 'Tenders', icon: 'fas fa-file-contract', route: '/dashboard/tenders' },
    // Educational Management
    { id: 'edu-manager', label: 'Education', icon: 'fas fa-graduation-cap', route: '/dashboard/edu-manager' },
    { id: 'edu-lessons', label: 'Lesson Plans', icon: 'fas fa-chalkboard-teacher', route: '/dashboard/edu-manager/planning/lessons' },
    { id: 'edu-quiz', label: 'Quiz Generator', icon: 'fas fa-question-circle', route: '/dashboard/edu-manager/assessment/quiz' },
    { id: 'edu-grading', label: 'Grading', icon: 'fas fa-check-circle', route: '/dashboard/edu-manager/grading/assignments' },
    { id: 'edu-ai-detection', label: 'AI Detection', icon: 'fas fa-robot', route: '/dashboard/edu-manager/integrity/ai-detection' },
    // Marketplace
    { id: 'marketplace', label: 'Marketplace', icon: 'fas fa-store', route: '/dashboard/marketplace' },
    // Mining
    { id: 'mining', label: 'Mining', icon: 'fas fa-hammer', route: '/dashboard/mining' },
    // Staff Portal
    { id: 'hr-staff', label: 'My Workspace', icon: 'fas fa-user-circle', route: '/dashboard/hr-staff' },
    // Healthcare Module
    { id: 'compliance', label: 'Compliance', icon: 'fas fa-shield-alt', route: '/dashboard/compliance' },
    { id: 'healthcare', label: 'Healthcare', icon: 'fas fa-hospital', route: '/dashboard/healthcare' },
    { id: 'healthcare-patients', label: 'Patients', icon: 'fas fa-user-injured', route: '/dashboard/healthcare/patients' },
    { id: 'healthcare-queue', label: 'Queue & Appointments', icon: 'fas fa-calendar-check', route: '/dashboard/healthcare/queue' },
    { id: 'healthcare-encounter', label: 'Clinical EMR', icon: 'fas fa-notes-medical', route: '/dashboard/healthcare/encounter' },
    { id: 'healthcare-lab', label: 'Laboratory', icon: 'fas fa-flask', route: '/dashboard/healthcare/lab' },
    { id: 'healthcare-radiology', label: 'Radiology & DMS', icon: 'fas fa-x-ray', route: '/dashboard/healthcare/radiology' },
    { id: 'healthcare-inpatient', label: 'Inpatient', icon: 'fas fa-procedures', route: '/dashboard/healthcare/inpatient' },
    { id: 'healthcare-financial', label: 'Financial', icon: 'fas fa-file-invoice-dollar', route: '/dashboard/healthcare/financial' },
  ];
}

/**
 * Super Admin navigation items
 */
export function getSuperAdminSidebarItems() {
  return [
    { id: 'superadmin-home', label: 'Overview', icon: 'fas fa-home', route: '/superadmin/dashboard' },
    { id: 'tenants', label: 'Tenants', icon: 'fas fa-users', route: '/superadmin/tenant-management' },
    { id: 'revenue', label: 'Revenue', icon: 'fas fa-chart-line', route: '/superadmin/tenant-revenues' },
    { id: 'taxes', label: 'Taxes', icon: 'fas fa-file-invoice-dollar', route: '/superadmin/tenant-taxes' },
    { id: 'reports', label: 'Reports', icon: 'fas fa-file-alt', route: '/superadmin/tenant-reports' },
    { id: 'sales-analytics', label: 'Sales Analytics', icon: 'fas fa-chart-bar', route: '/superadmin/sales-analytics' },
    { id: 'kpi-growth', label: 'KPIs', icon: 'fas fa-tachometer-alt', route: '/superadmin/kpi-growth' },
    { id: 'user-activities', label: 'User Activities', icon: 'fas fa-user-clock', route: '/superadmin/user-activities' },
    { id: 'user-module-access', label: 'Module Access', icon: 'fas fa-key', route: '/superadmin/user-module-access' },
    { id: 'email', label: 'Email', icon: 'fas fa-envelope-open-text', route: '/superadmin/email-management' },
    { id: 'logos', label: 'Logos', icon: 'fas fa-handshake', route: '/superadmin/partner-logos' },
    { id: 'testimonials', label: 'Testimonials', icon: 'fas fa-quote-right', route: '/superadmin/testimonials' },
    { id: 'lending-admin', label: 'Lending Admin', icon: 'fas fa-university', route: '/superadmin/lending-admin' },
    { id: 'rag-upload', label: 'RAG Upload', icon: 'fas fa-upload', route: '/superadmin/rag-upload' },
    { id: 'rag-chat', label: 'RAG Chat', icon: 'fas fa-comments', route: '/superadmin/rag-chat' },
    { id: 'pricing-management', label: 'Pricing Mgmt', icon: 'fas fa-tags', route: '/superadmin/pricing-management' },
    { id: 'tenant-storage', label: 'Storage', icon: 'fas fa-hdd', route: '/superadmin/tenant-storage' },
    { id: 'payment-gateway', label: 'Payment GW', icon: 'fas fa-credit-card', route: '/superadmin/payment-gateway' },
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
  { id: 'pos', title: 'POS Operations', requiresSubscription: true },
  { id: 'inventory', title: 'Inventory Management', requiresSubscription: true },
  { id: 'supplier', title: 'Supplier Management', requiresSubscription: true },
  { id: 'taxes', title: 'Taxes Module', requiresSubscription: false },
  { id: 'invoicing', title: 'Invoicing', requiresSubscription: true },
  { id: 'delivery-tickets', title: 'Delivery Ticket', requiresSubscription: true },
  { id: 'expenses', title: 'Expenses', requiresSubscription: true },
  { id: 'loans', title: 'Loans Module', requiresSubscription: true },
  { id: 'crm', title: 'CRM Module', requiresSubscription: true },
  { id: 'payroll', title: 'Payroll', requiresSubscription: true },
  { id: 'ai', title: 'AI Agent Module', requiresSubscription: true },
  { id: 'reports', title: 'Reports & Analytics', requiresSubscription: true },

  { id: 'settings', title: 'Settings', requiresSubscription: false },
  { id: 'finance', title: 'Finance Dashboard', requiresSubscription: true },
  { id: 'hrmodule', title: 'HR Dashboard', requiresSubscription: true },
  { id: 'ub_recruiter', title: 'UB Recruiter', requiresSubscription: true },
  { id: 'microfinance', title: 'Microfinance Client Dashboard', requiresSubscription: true },
  { id: 'hotel-manager', title: 'Hotel Management System', requiresSubscription: true },
  { id: 'minetech-hub', title: 'MineTech Hub', requiresSubscription: true },
  { id: 'assets-manager', title: 'Unified Assets', requiresSubscription: true },
  { id: 'strategic-management', title: 'Executive Module', requiresSubscription: true },
  { id: 'project-management', title: 'Project Management', requiresSubscription: true },
  { id: 'tender-management', title: 'Tender Management', requiresSubscription: true },
  { id: 'edu-manager', title: 'Educational Management', requiresSubscription: true },
  { id: 'marketplace', title: 'Marketplace (2% per sale)', requiresSubscription: false },
  { id: 'hr-staff', title: 'Staff Portal (Personal)', requiresSubscription: false },
  { id: 'allshops', title: 'User Management', requiresSubscription: false },
  { id: 'mining', title: 'Mining Operations (Custom)', requiresSubscription: true },
  { id: 'healthcare', title: 'Healthcare Management (UB Health)', requiresSubscription: true },
  { id: 'compliance', title: 'Compliance Center', requiresSubscription: false },
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
