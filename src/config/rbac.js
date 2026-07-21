/**
 * Role-Based Access Control (RBAC) Configuration
 * Defines roles, permissions, entities, and default settings for the platform
 */

// ==================== PERMISSIONS ====================

/**
 * Available permission types for each entity
 * NOTE: 'write' is treated as 'create' and 'edit' as 'update' for action labelling.
 * 'approve' and 'export' added for asset governance (Module 9 / 9.1 Access Control).
 */
export const PERMISSION_TYPES = {
  READ: 'read',
  WRITE: 'write',
  EDIT: 'edit',
  DELETE: 'delete',
  ASSIGN: 'assign',
  APPROVE: 'approve',
  EXPORT: 'export'
};

/**
 * All permission types as an array
 */
export const ALL_PERMISSIONS = Object.values(PERMISSION_TYPES);

export const ENTITY_SPECIFIC_PERMISSIONS = {
  crm: [PERMISSION_TYPES.ASSIGN, PERMISSION_TYPES.APPROVE],
  'project-management': [PERMISSION_TYPES.ASSIGN],
  hrmodule: [PERMISSION_TYPES.ASSIGN],
  payroll: [PERMISSION_TYPES.ASSIGN],
  'hr-staff': [PERMISSION_TYPES.ASSIGN],
  ub_recruiter: [PERMISSION_TYPES.ASSIGN]
};

export function getPermissionsForEntity(entityId) {
  // Deduplicate: ALL_PERMISSIONS already contains common perms (incl. 'assign'),
  // so entity-specific entries that overlap must not render twice in the UI.
  return Array.from(new Set([...ALL_PERMISSIONS, ...(ENTITY_SPECIFIC_PERMISSIONS[entityId] || [])]));
}

/**
 * Entities/modules that can have permissions applied
 */
export const PERMISSION_ENTITIES = [
  { id: 'pos', name: 'POS Operations', icon: 'fas fa-cash-register' },
  { id: 'inventory', name: 'Inventory Management', icon: 'fas fa-boxes' },
  { id: 'healthcare_admin', name: 'Healthcare', icon: 'fas fa-hospital' },
  { id: 'supplier', name: 'Supplier Management', icon: 'fas fa-truck' },
  { id: 'invoicing', name: 'Invoicing', icon: 'fas fa-file-invoice' },
  { id: 'reports', name: 'Reports & Analytics', icon: 'fas fa-chart-pie' },
  { id: 'settings', name: 'Settings', icon: 'fas fa-cogs' },
  { id: 'expenses', name: 'Expenses', icon: 'fas fa-file-invoice' },
  { id: 'loans', name: 'Loans', icon: 'fas fa-hand-holding-usd' },
  { id: 'payroll', name: 'Payroll', icon: 'fas fa-money-check-alt' },
  { id: 'hrmodule', name: 'HR Module', icon: 'fas fa-user-tie' },
  { id: 'ub_recruiter', name: 'UB Recruiter', icon: 'fas fa-user-tie' },
  { id: 'crm', name: 'CRM', icon: 'fas fa-address-book' },
  { id: 'mining-image', name: 'Mining/Image Capture', icon: 'fas fa-mountain' },
  { id: 'taxes', name: 'ZRA Tax', icon: 'fas fa-file-invoice-dollar' },
  { id: 'ai', name: 'AI Agent', icon: 'fas fa-robot' },
  { id: 'allshops', name: 'Users', icon: 'fas fa-users-cog' },
  { id: 'delivery-tickets', name: 'Delivery Tickets', icon: 'fas fa-truck-loading' },
  { id: 'strategic-management', name: 'Executive Module', icon: 'fas fa-chess' },
  { id: 'finance', name: 'Finance Dashboard', icon: 'fas fa-wallet' },
  { id: 'hr-dashboard', name: 'HR Dashboard', icon: 'fas fa-users' },
  { id: 'image-capture-standalone', name: 'Image Capture - Text Scanner', icon: 'fas fa-camera' },
  { id: 'profile', name: 'Profile', icon: 'fas fa-user-circle' },
  { id: 'assets-manager', name: 'Unified Assets', icon: 'fas fa-hard-hat' },
  { id: 'project-management', name: 'Project Management', icon: 'fas fa-project-diagram' },
  { id: 'hotel-manager', name: 'Hotel Management', icon: 'fas fa-hotel' },
  { id: 'minetech-hub', name: 'MineTech Hub', icon: 'fas fa-mountain' },
  { id: 'tender-management', name: 'Tender Management', icon: 'fas fa-file-contract' },
  { id: 'hr-staff', name: 'Staff Portal', icon: 'fas fa-user-circle' },
  { id: 'compliance', name: 'Compliance Center', icon: 'fas fa-shield-alt' }
];

// ==================== DEFAULT ROLES ====================

/**
 * Default system roles with their permission configurations
 * These can be customized per tenant
 */
export const DEFAULT_ROLES = [
  // {
  //   id: 'super_admin',
  //   name: 'Super Admin',
  //   description: 'Full access to all features and settings',
  //   isSystem: true, // Cannot be deleted
  //   permissions: PERMISSION_ENTITIES.reduce((acc, entity) => {
  //     acc[entity.id] = [...ALL_PERMISSIONS];
  //     return acc;
  //   }, {})
  // },
  {
    id: 'owner',
    name: 'Owner',
    description: 'Business owner with full access to all features',
    isSystem: true,
    permissions: PERMISSION_ENTITIES.reduce((acc, entity) => {
      acc[entity.id] = [...ALL_PERMISSIONS];
      return acc;
    }, {})
  },
  // {
  //   id: 'admin',
  //   name: 'Admin',
  //   description: 'Administrative access with most permissions',
  //   isSystem: true,
  //   permissions: PERMISSION_ENTITIES.reduce((acc, entity) => {
  //     // Admin has all permissions except on settings
  //     acc[entity.id] = entity.id === 'settings'
  //       ? ['read', 'write', 'edit']
  //       : [...ALL_PERMISSIONS];
  //     return acc;
  //   }, {})
  // },
  {
    id: 'manager',
    name: 'Manager',
    description: 'Manage day-to-day operations and staff',
    isSystem: true,
    permissions: {
      pos: ['read', 'write', 'edit', 'delete'],
      inventory: ['read', 'write', 'edit'],
      supplier: ['read', 'write', 'edit'],
      invoicing: ['read', 'write', 'edit'],
      reports: ['read'],
      settings: ['read'],
      expenses: ['read', 'write', 'edit'],
      loans: ['read'],
      payroll: ['read'],
      hrmodule: ['read'],
      'hr-staff': ['read', 'write'],
      crm: ['read', 'write', 'edit'],
      'image-capture': ['read'],
      taxes: ['read'],
      ai: ['read'],
      allshops: ['read'],
      'hotel-manager': ['read', 'write', 'edit'],
      'minetech-hub': ['read'],
      'strategic-management': ['read']
    }
  },
  {
    id: 'cashier',
    name: 'Cashier',
    description: 'Process sales and handle cash transactions',
    isSystem: true,
    permissions: {
      pos: ['read', 'write'],
      inventory: ['read'],
      // suppliers: [],
      invoicing: ['read', 'write'],
      reports: [],
      // users: [],
      // settings: [],
      // expenses: [],
      // loans: [],
      // payroll: [],
      // hrmodule: [],
      crm: ['read'],
      'hr-staff': ['read', 'write'],
      // 'image-capture': [],
      // taxes: [],
      ai: ['read'],
      // allshops: [],
      'delivery-tickets': ['read'],
      'strategic-management': []
    }
  },
  {
    id: 'accountant',
    name: 'Accountant',
    description: 'Handle financial records and reports',
    isSystem: true,
    permissions: {
      pos: ['read'],
      inventory: ['read'],
      suppliers: ['read', 'write', 'edit'],
      invoicing: ['read', 'write', 'edit', 'delete'],
      reports: ['read', 'write'],
      settings: ['read'],
      expenses: ['read', 'write', 'edit', 'delete'],
      loans: ['read', 'write', 'edit'],
      payroll: ['read', 'write', 'edit'],
      hrmodule: ['read'],
      'hr-staff': ['read', 'write'],
      crm: ['read'],
      // 'image-capture': ['read'],
      taxes: ['read', 'write', 'edit'],
      ai: ['read'],
      allshops: ['read'],
      'hotel-manager': ['read'],
      'minetech-hub': ['read'],
      'strategic-management': ['read']
    }
  },
  {
    id: 'auditor',
    name: 'Auditor',
    description: 'Read-only + export access for audit purposes (includes asset audit trail)',
    isSystem: true,
    permissions: PERMISSION_ENTITIES.reduce((acc, entity) => {
      acc[entity.id] = entity.id === 'assets-manager' ? ['read', 'export'] : ['read'];
      return acc;
    }, {})
  },
  {
    id: 'attendant',
    name: 'Attendant',
    description: 'Basic POS and inventory access',
    isSystem: true,
    permissions: {
      pos: ['read', 'write'],
      inventory: ['read'],
      'hr-staff': ['read', 'write'],
      // suppliers: [],
      // invoicing: [],
      reports: [],
      // users: [],
      // settings: [],
      // expenses: [],
      // loans: [],
      // payroll: [],
      // hrmodule: [],
      // crm: [],
      // mining: [],
      // zra: [],
      // ai: [],
      // allshops: [],
      // 'delivery-ticket': [],
      // 'strategic-management': []
    }
  },

  {
    id: 'hotel_attendant',
    name: 'Hotel Attendant',
    description: 'Hotel Managers access',
    isSystem: true,
    permissions: {
      pos: ['read', 'write'],
      // hotelmanager:['read', 'write'],
      inventory: ['read'],
      invoicing: [],
      reports: [],
      // users: [],
      // settings: [],
      // expenses: [],
      // loans: [],
      // payroll: [],
      // hrmodule: [],
      crm: [],
      // mining: [],
      // zra: [],
      ai: [],
      // allshops: [],
      'hotel-manager': ["read", "write"],

    }
  },

  // ==================== ASSET MANAGER ROLES (Module 9.1 Access Control) ====================
  // Each asset role declares explicit permissions on the `assets-manager` entity
  // across Create (write) / Read / Update (edit) / Delete / Approve / Export.
  // Optional `assetScope` restricts visibility to specific departments / locations / categories.
  {
    id: 'system_admin',
    name: 'System Admin',
    description: 'Full administrative control over assets, configuration and governance',
    isSystem: true,
    permissions: {
      'assets-manager': ['read', 'write', 'edit', 'delete', 'approve', 'export'],
      settings: ['read', 'write', 'edit'],
      allshops: ['read', 'write', 'edit']
    },
    assetScope: { allowedDepartments: [], allowedLocations: [], allowedCategories: [] }
  },
  {
    id: 'asset_manager',
    name: 'Asset Manager',
    description: 'Manage asset lifecycle, maintenance and operations',
    isSystem: true,
    permissions: {
      'assets-manager': ['read', 'write', 'edit', 'delete', 'approve', 'export'],
      reports: ['read', 'export'],
      crm: ['read']
    },
    assetScope: { allowedDepartments: [], allowedLocations: [], allowedCategories: [] }
  },
  {
    id: 'finance_officer',
    name: 'Finance Officer',
    description: 'Depreciation, capex, revaluation and financial approvals on assets',
    isSystem: true,
    permissions: {
      'assets-manager': ['read', 'edit', 'approve', 'export'],
      expenses: ['read', 'write', 'edit'],
      finance: ['read', 'write', 'edit', 'export'],
      reports: ['read', 'export']
    },
    assetScope: { allowedDepartments: [], allowedLocations: [], allowedCategories: [] }
  },
  {
    id: 'technician',
    name: 'Technician',
    description: 'Field service: log maintenance, update status, no financial or delete rights',
    isSystem: true,
    permissions: {
      'assets-manager': ['read', 'write', 'edit']
    },
    assetScope: { allowedDepartments: [], allowedLocations: [], allowedCategories: [] }
  },
  {
    id: 'department_manager',
    name: 'Department Manager',
    description: 'Manage assets for their department only (department-scoped access)',
    isSystem: true,
    permissions: {
      'assets-manager': ['read', 'write', 'edit', 'approve', 'export'],
      reports: ['read', 'export']
    },
    assetScope: { allowedDepartments: [], allowedLocations: [], allowedCategories: [] }
  },
  {
    id: 'readonly_viewer',
    name: 'Read-Only Viewer',
    description: 'View-only access to assets — no modifications, no exports',
    isSystem: true,
    permissions: {
      'assets-manager': ['read']
    },
    assetScope: { allowedDepartments: [], allowedLocations: [], allowedCategories: [] }
  }
];

/**
 * Healthcare-specific role IDs that should only be visible/assignable when
 * the tenant has subscribed to the "healthcare" module.
 * Mirrors the HEALTHCARE_ROLE_IDS set in the backend DEFAULT_ROLES filter.
 */
export const HEALTHCARE_ROLE_IDS = new Set([
  'healthcare_admin', 'medical_director', 'consultant', 'medical_officer',
  'resident', 'nurse_manager', 'registered_nurse', 'enrolled_nurse',
  'lab_manager', 'lab_scientist', 'lab_technician', 'phlebotomist',
  'radiology_manager', 'radiologist', 'radiographer',
  'pharmacy_manager', 'pharmacist', 'pharmacy_technician',
  'receptionist', 'billing_clerk', 'insurance_officer',
  'health_records_officer', 'quality_officer', 'patient'
]);

// ==================== ASSOCIATED ORGANIZATIONS ====================

/**
 * Pre-defined organization types for association
 */
export const ORGANIZATION_TYPES = [
  { id: 'investor', name: 'Investor', icon: 'fas fa-chart-line' },
  { id: 'bank', name: 'Bank', icon: 'fas fa-university' },
  { id: 'cdf', name: 'CDF (Constituency Development Fund)', icon: 'fas fa-landmark' },
  { id: 'undp', name: 'UNDP', icon: 'fas fa-globe' },
  { id: 'ngo', name: 'NGO', icon: 'fas fa-hands-helping' },
  { id: 'government', name: 'Government Agency', icon: 'fas fa-building-columns' },
  { id: 'cooperative', name: 'Cooperative', icon: 'fas fa-people-group' },
  { id: 'other', name: 'Other', icon: 'fas fa-ellipsis-h' }
];

/**
 * Access scope levels for organization associations
 */
export const ACCESS_SCOPES = [
  { id: 'full', name: 'Full Access', description: 'Complete data visibility and reporting' },
  { id: 'financial', name: 'Financial Only', description: 'Access to financial data and reports only' },
  { id: 'operational', name: 'Operational', description: 'Access to operational metrics and performance data' },
  { id: 'summary', name: 'Summary Reports', description: 'Access to summary and aggregated reports only' },
  { id: 'custom', name: 'Custom', description: 'Custom access scope with specific permissions' }
];

// ==================== UI PERSONALIZATION ====================

/**
 * Default brand color schemes
 */
export const DEFAULT_BRAND_COLORS = {
  primary: '#2F2E8B',
  secondary: '#1E40AF',
  accent: '#059669',
  background: '#F5F5F5',
  text: '#1F2937',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444'
};

/**
 * Available font families
 */
export const FONT_FAMILIES = [
  { id: 'inter', name: 'Inter', value: "'Inter', sans-serif" },
  { id: 'roboto', name: 'Roboto', value: "'Roboto', sans-serif" },
  { id: 'open-sans', name: 'Open Sans', value: "'Open Sans', sans-serif" },
  { id: 'lato', name: 'Lato', value: "'Lato', sans-serif" },
  { id: 'poppins', name: 'Poppins', value: "'Poppins', sans-serif" },
  { id: 'nunito', name: 'Nunito', value: "'Nunito', sans-serif" },
  { id: 'montserrat', name: 'Montserrat', value: "'Montserrat', sans-serif" },
  { id: 'raleway', name: 'Raleway', value: "'Raleway', sans-serif" },
  { id: 'source-sans', name: 'Source Sans 3', value: "'Source Sans 3', sans-serif" },
  { id: 'outfit', name: 'Outfit', value: "'Outfit', sans-serif" },
  { id: 'system', name: 'System Default', value: "system-ui, -apple-system, sans-serif" }
];

/**
 * Font size presets
 */
export const FONT_SIZES = [
  { id: 'small', name: 'Small', scale: 0.875 },
  { id: 'medium', name: 'Medium (Default)', scale: 1 },
  { id: 'large', name: 'Large', scale: 1.125 },
  { id: 'extra-large', name: 'Extra Large', scale: 1.25 }
];

/**
 * Theme modes
 */
export const THEME_MODES = [
  { id: 'light', name: 'Light Mode', icon: 'fas fa-sun' },
  { id: 'dark', name: 'Dark Mode', icon: 'fas fa-moon' },
  { id: 'system', name: 'System Default', icon: 'fas fa-desktop' }
];

export const UI_CARD_RADIUS_OPTIONS = [
  { id: 'sharp', name: 'Sharp', value: '0px' },
  { id: 'soft', name: 'Soft', value: '7px' },
  { id: 'rounded', name: 'Rounded', value: '16px' },
  { id: 'premium', name: 'Premium', value: '24px' }
];

export const UI_BUTTON_RADIUS_OPTIONS = [
  { id: 'sharp', name: 'Square', value: '0px' },
  { id: 'soft', name: 'Soft', value: '13px' },
  { id: 'rounded', name: 'Rounded', value: '18px' },
  { id: 'pill', name: 'Pill', value: '999px' }
];

export const UI_INPUT_RADIUS_OPTIONS = [
  { id: 'sharp', name: 'Sharp', value: '0px' },
  { id: 'soft', name: 'Soft', value: '7px' },
  { id: 'rounded', name: 'Rounded', value: '12px' }
];

export const UI_BUTTON_STYLE_OPTIONS = [
  { id: 'filled', name: 'Filled' },
  { id: 'soft', name: 'Soft' },
  { id: 'outline', name: 'Outline' }
];

export const UI_CARD_ELEVATION_OPTIONS = [
  { id: 'flat', name: 'Flat', value: 'none' },
  { id: 'subtle', name: 'Subtle', value: '0 2px 8px rgba(0, 0, 0, 0.06)' },
  { id: 'lifted', name: 'Lifted', value: '0 8px 24px rgba(0, 0, 0, 0.10)' }
];

export const UI_PATTERN_OPTIONS = [
  { id: 'off', name: 'Off', value: '0' },
  { id: 'subtle', name: 'Subtle', value: '0.05' },
  { id: 'visible', name: 'Visible', value: '0.12' }
];

export const UI_VISUAL_STYLE_OPTIONS = [
  {
    id: 'flat',
    name: 'Flat Design',
    description: 'Low-depth panels, crisp borders, and direct information density.',
    icon: 'fas fa-square'
  },
  {
    id: 'material',
    name: 'Material Design',
    description: 'Structured surfaces with clear elevation and familiar controls.',
    icon: 'fas fa-layer-group'
  },
  {
    id: 'minimalism',
    name: 'Minimalism',
    description: 'Quiet white space, restrained borders, and reduced visual noise.',
    icon: 'fas fa-minus'
  },
  {
    id: 'glassmorphism',
    name: 'Glassmorphism',
    description: 'Translucent surfaces, blur, and premium layered depth.',
    icon: 'fas fa-gem'
  },
  {
    id: 'skeuomorphism',
    name: 'Skeuomorphism',
    description: 'Tactile raised surfaces with soft highlights and realistic depth.',
    icon: 'fas fa-cube'
  }
];

export const UI_VISUAL_STYLE_PRESETS = {
  material: {
    cardRadius: 'soft',
    buttonRadius: 'soft',
    inputRadius: 'soft',
    buttonStyle: 'filled',
    cardElevation: 'subtle',
    patternIntensity: 'subtle',
    compactMode: false,
    layoutDensity: 'comfortable',
    tokens: {
      '--ui-surface-alpha': '1',
      '--ui-surface-blur': '0px',
      '--ui-surface-outline': 'var(--color-border)',
      '--ui-raised-shadow': '0 4px 16px rgba(0, 0, 0, 0.08)',
      '--ui-card-surface': '#ffffff',
      '--ui-button-shadow': '0 3px 8px rgba(0, 0, 0, 0.12)',
      '--ui-control-shadow': 'none',
      '--ui-inset-highlight': 'inset 0 1px 0 rgba(255, 255, 255, 0.48)'
    }
  },
  flat: {
    cardRadius: 'sharp',
    buttonRadius: 'sharp',
    inputRadius: 'sharp',
    buttonStyle: 'filled',
    cardElevation: 'subtle',
    patternIntensity: 'subtle',
    compactMode: false,
    layoutDensity: 'comfortable',
    tokens: {
      '--ui-surface-alpha': '1',
      '--ui-surface-blur': '0px',
      '--ui-surface-outline': '#e5e7eb',
      '--ui-raised-shadow': '0 1px 2px rgba(0, 0, 0, 0.06)',
      '--ui-card-surface': '#ffffff',
      '--ui-button-shadow': '0 1px 2px rgba(0, 0, 0, 0.06)',
      '--ui-control-shadow': 'none',
      '--ui-inset-highlight': 'none'
    }
  },
  minimalism: {
    cardRadius: 'soft',
    buttonRadius: 'soft',
    inputRadius: 'soft',
    buttonStyle: 'outline',
    cardElevation: 'flat',
    patternIntensity: 'off',
    compactMode: false,
    layoutDensity: 'comfortable',
    tokens: {
      '--ui-surface-alpha': '1',
      '--ui-surface-blur': '0px',
      '--ui-surface-outline': '#eeeeee',
      '--ui-raised-shadow': 'none',
      '--ui-card-surface': '#ffffff',
      '--ui-button-shadow': 'none',
      '--ui-control-shadow': 'none',
      '--ui-inset-highlight': 'none'
    }
  },
  glassmorphism: {
    cardRadius: 'premium',
    buttonRadius: 'rounded',
    inputRadius: 'rounded',
    buttonStyle: 'soft',
    cardElevation: 'lifted',
    patternIntensity: 'visible',
    compactMode: false,
    layoutDensity: 'comfortable',
    tokens: {
      '--ui-surface-alpha': '0.38',
      '--ui-surface-blur': '24px',
      '--ui-surface-outline': 'rgba(255, 255, 255, 0.62)',
      '--ui-raised-shadow': '0 24px 70px rgba(47, 46, 139, 0.18), 0 8px 24px rgba(31, 41, 55, 0.08)',
      '--ui-card-surface': 'linear-gradient(135deg, rgba(255, 255, 255, 0.54), rgba(255, 255, 255, 0.22))',
      '--ui-button-shadow': '0 16px 34px rgba(47, 46, 139, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.62)',
      '--ui-control-shadow': 'inset 0 1px 0 rgba(255, 255, 255, 0.72), 0 10px 24px rgba(47, 46, 139, 0.08)',
      '--ui-inset-highlight': 'inset 0 1px 0 rgba(255, 255, 255, 0.78), inset 0 -1px 0 rgba(255, 255, 255, 0.18)'
    }
  },
  skeuomorphism: {
    cardRadius: 'premium',
    buttonRadius: 'rounded',
    inputRadius: 'rounded',
    buttonStyle: 'filled',
    cardElevation: 'lifted',
    patternIntensity: 'subtle',
    compactMode: false,
    layoutDensity: 'comfortable',
    tokens: {
      '--ui-surface-alpha': '1',
      '--ui-surface-blur': '0px',
      '--ui-surface-outline': 'rgba(255, 255, 255, 0.86)',
      '--ui-raised-shadow': '8px 8px 18px rgba(0, 0, 0, 0.18), -4px -4px 12px rgba(255, 255, 255, 0.55)',
      '--ui-card-surface': 'linear-gradient(145deg, #ffffff, #f2f3f7)',
      '--ui-button-shadow': '4px 4px 10px rgba(0, 0, 0, 0.16), -2px -2px 8px rgba(255, 255, 255, 0.62)',
      '--ui-control-shadow': 'inset 2px 2px 5px rgba(0, 0, 0, 0.12), inset -2px -2px 5px rgba(255, 255, 255, 0.78)',
      '--ui-inset-highlight': 'inset 0 1px 1px rgba(255, 255, 255, 0.9), inset 0 -1px 1px rgba(0, 0, 0, 0.08)'
    }
  }
};

/**
 * Default UI preferences
 */
export const DEFAULT_UI_PREFERENCES = {
  visualStyle: 'flat',
  themeMode: 'light',
  brandColors: { ...DEFAULT_BRAND_COLORS },
  fontFamily: 'inter',
  fontSize: 'medium',
  compactMode: false,
  showAnimations: true,
  cardRadius: 'sharp',
  buttonRadius: 'sharp',
  inputRadius: 'sharp',
  buttonStyle: 'filled',
  cardElevation: 'subtle',
  patternIntensity: 'subtle',
  sidebarCollapsed: false,
  customFontFamilies: [...FONT_FAMILIES],
  layoutDensity: 'comfortable'
};

/**
 * Original UI preferences used by "Reset to Defaults".
 * This intentionally bypasses the visual style presets so reset returns to the
 * pre-design-system dashboard treatment instead of the Material preset.
 */
export const ORIGINAL_UI_PREFERENCES = {
  visualStyle: 'flat',
  themeMode: 'light',
  brandColors: { ...DEFAULT_BRAND_COLORS },
  fontFamily: 'montserrat',
  fontSize: 'medium',
  compactMode: false,
  showAnimations: true,
  cardRadius: 'sharp',
  buttonRadius: 'sharp',
  inputRadius: 'sharp',
  buttonStyle: 'filled',
  cardElevation: 'flat',
  patternIntensity: 'subtle',
  sidebarCollapsed: false,
  customFontFamilies: [...FONT_FAMILIES],
  layoutDensity: 'comfortable'
};

// ==================== HELPER FUNCTIONS ====================

/**
 * Check if a role has a specific permission for an entity
 */
export function hasPermission(role, entity, permission) {
  if (!role || !role.permissions) return false;
  const entityPerms = role.permissions[entity];
  return Array.isArray(entityPerms) && entityPerms.includes(permission);
}

/**
 * Check if a role has any permissions for an entity
 */
export function hasAnyPermission(role, entity) {
  if (!role || !role.permissions) return false;
  const entityPerms = role.permissions[entity];
  return Array.isArray(entityPerms) && entityPerms.length > 0;
}

/**
 * Get a role by ID from the defaults
 */
export function getDefaultRole(roleId) {
  return DEFAULT_ROLES.find(r => r.id === roleId) || null;
}

/**
 * Create a new custom role template
 */
export function createEmptyRole() {
  return {
    id: '',
    name: '',
    description: '',
    isSystem: false,
    permissions: PERMISSION_ENTITIES.reduce((acc, entity) => {
      acc[entity.id] = [];
      return acc;
    }, {})
  };
}

/**
 * Merge custom roles with default roles.
 * @param {Array} customRoles - Custom/overridden roles from the backend DB.
 * @param {Array} [baseRoles] - Base default roles. Falls back to the static DEFAULT_ROLES list.
 */
export function mergeRoles(customRoles = [], baseRoles = DEFAULT_ROLES) {
  const merged = [...baseRoles];
  customRoles.forEach(customRole => {
    const existingIndex = merged.findIndex(r => r.id === customRole.id);
    if (existingIndex >= 0) {
      // Allow overriding ALL roles, including system roles, if a custom configuration exists for them
      merged[existingIndex] = { ...merged[existingIndex], ...customRole };
    } else {
      merged.push(customRole);
    }
  });
  return merged;
}

/**
 * Validate a role object
 */
export function validateRole(role) {
  const errors = [];

  if (!role.id || typeof role.id !== 'string') {
    errors.push('Role ID is required');
  }
  if (!role.name || typeof role.name !== 'string') {
    errors.push('Role name is required');
  }
  if (!role.permissions || typeof role.permissions !== 'object') {
    errors.push('Permissions object is required');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Create default organization association
 */
export function createEmptyOrganization() {
  return {
    id: '',
    name: '',
    type: 'other',
    accessScope: 'summary',
    contactEmail: '',
    contactPhone: '',
    notes: '',
    isActive: true,
    createdAt: new Date().toISOString()
  };
}
