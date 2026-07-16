/**
 * useRBAC Composable
 * Provides role-based access control utilities for Vue components
 */

import { ref, computed, readonly } from 'vue';
import { decodeJWT } from '@/api_services/decodeJWT';
import API_BASE_URL from '@/api_services/api';
import { DEV_BYPASS } from '@/config/devFlags.js';
import {
  DEFAULT_ROLES,
  PERMISSION_ENTITIES,
  PERMISSION_TYPES,
  ALL_PERMISSIONS,
  ORGANIZATION_TYPES,
  ACCESS_SCOPES,
  FONT_FAMILIES,
  DEFAULT_UI_PREFERENCES,
  ORIGINAL_UI_PREFERENCES,
  UI_CARD_RADIUS_OPTIONS,
  UI_BUTTON_RADIUS_OPTIONS,
  UI_INPUT_RADIUS_OPTIONS,
  UI_CARD_ELEVATION_OPTIONS,
  UI_PATTERN_OPTIONS,
  UI_VISUAL_STYLE_PRESETS,
  HEALTHCARE_ROLE_IDS,
  hasPermission as checkPermission,
  hasAnyPermission as checkAnyPermission,
  createEmptyRole,
  createEmptyOrganization,
  mergeRoles,
  validateRole
} from '@/config/rbac';

// Healthcare sub-entity keys used as feature flags in healthcare_addons.
// Must match ALL_HEALTHCARE_ADDONS in SettingsModule.vue.
const HC_SUB_ENTITY_KEYS = [
  'patient_registration', 'patient_demographics', 'patient_clinical', 'appointments', 'queue', 'triage',
  'clinical_emr', 'diagnosis', 'prescriptions', 'prescriptions_controlled', 'procedures',
  'lab_orders', 'lab_results', 'lab_verify', 'lab_config',
  'radiology_orders', 'radiology_reporting', 'radiology_images', 'radiology_config',
  'admissions', 'bed_management', 'nursing_notes', 'nursing_mar', 'nursing_care_plans', 'theatre', 'discharge',
  'insurance', 'claims', 'billing', 'documents', 'dms_admin',
  'ai_queries', 'whatsapp_config',
  'reports_clinical', 'reports_operational', 'reports_financial', 'reports_regulatory', 'audit_logs'
];

// ==================== REACTIVE STATE ====================

// Current user's role and permissions (loaded from JWT/API)
const currentUserRole = ref(null);
const currentUserPermissions = ref({});
const currentUserOrganizations = ref([]);

// Tenant-specific roles (defaults + custom)
const tenantRoles = ref([...DEFAULT_ROLES]);
const tenantOrganizations = ref([]);
const tenantUIPreferences = ref({ ...DEFAULT_UI_PREFERENCES });

// Loading states
const isLoading = ref(false);
const error = ref(null);

// ==================== COMPOSABLE ====================

export function useRBAC() {
  const { getTenantId, getUserRole, getUserEmail } = decodeJWT();

  // ==================== PERMISSION CHECKING ====================

  /**
   * Check if current user has a specific permission for an entity
   */
  const hasPermission = (entity, permission) => {
    if (DEV_BYPASS) return true;
    if (!currentUserRole.value) return false;
    if (['owner', 'admin', 'super_admin'].includes(currentUserRole.value?.id)) return true;
    return checkPermission(currentUserRole.value, entity, permission);
  };

  /**
   * Check if current user has any permission for an entity
   */
  const hasAnyPermission = (entity) => {
    if (DEV_BYPASS) return true;
    if (!currentUserRole.value) return false;
    if (['owner', 'admin', 'super_admin'].includes(currentUserRole.value?.id)) return true;
    return checkAnyPermission(currentUserRole.value, entity);
  };

  /**
   * Check if current user can read an entity
   */
  const canRead = (entity) => hasPermission(entity, PERMISSION_TYPES.READ);

  /**
   * Check if current user can write to an entity
   */
  const canWrite = (entity) => hasPermission(entity, PERMISSION_TYPES.WRITE);

  /**
   * Check if current user can edit an entity
   */
  const canEdit = (entity) => hasPermission(entity, PERMISSION_TYPES.EDIT);

  /**
   * Check if current user can delete from an entity
   */
  const canDelete = (entity) => hasPermission(entity, PERMISSION_TYPES.DELETE);

  /**
   * Check if current user can assign records within an entity
   */
  const canAssign = (entity) => hasPermission(entity, PERMISSION_TYPES.ASSIGN);

  /**
   * Check if current user can approve records within an entity
   */
  const canApprove = (entity) => hasPermission(entity, PERMISSION_TYPES.APPROVE);

  /**
   * Check if current user can export records from an entity
   */
  const canExport = (entity) => hasPermission(entity, PERMISSION_TYPES.EXPORT);

  /**
   * Check if user is super admin
   */
  const isSuperAdmin = computed(() => {
    if (DEV_BYPASS) return true;
    return currentUserRole.value?.id === 'super_admin';
  });

  /**
   * Check if user is any admin type
   */
  const isAdmin = computed(() => {
    if (DEV_BYPASS) return true;
    const role = currentUserRole.value?.id;
    return role === 'super_admin' || role === 'admin';
  });

  /**
   * Check if user can manage roles
   */
  const canManageRoles = computed(() => {
    return isAdmin.value || hasPermission('settings', PERMISSION_TYPES.EDIT);
  });

  // ==================== ROLE MANAGEMENT ====================

  /**
   * Fetch tenant-specific roles from API
   */
  const fetchRoles = async () => {
    const tenantId = getTenantId();
    if (!tenantId) return;

    isLoading.value = true;
    error.value = null;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/rbac/roles?tenant_id=${tenantId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        const deletedIds = data.deletedRoleIds || [];
        // Prefer backend defaultRoles (they carry pos_addons etc.) over the static frontend list.
        // Fall back to the static list if the backend doesn't return them (older deployments).
        const baseRoles = data.defaultRoles && data.defaultRoles.length
          ? data.defaultRoles
          : DEFAULT_ROLES;
        let roles = mergeRoles(data.customRoles || [], baseRoles);
        // Remove roles that were explicitly deleted by this tenant
        if (deletedIds.length > 0) {
          roles = roles.filter(r => !deletedIds.includes(r.id));
        }
        tenantRoles.value = roles;
      } else {
        // Use defaults if API fails
        tenantRoles.value = [...DEFAULT_ROLES];
      }
      // ─── Derive healthcare_addons from entity permissions and sync to localStorage ───
      // This ensures healthcare_role_perms is populated even before the user visits Settings.
      try {
        const hcTranslated = {};
        for (const role of tenantRoles.value) {
          const rId = (role.id || '').toLowerCase();
          if (!rId) continue;
          const perms = role.permissions || {};
          if (['owner', 'admin', 'super_admin'].includes(rId)) {
            const full = {};
            HC_SUB_ENTITY_KEYS.forEach(k => { full[k.replace(/_([a-z])/g, (_, c) => c.toUpperCase())] = true; });
            hcTranslated[rId] = full;
            continue;
          }
          const result = {};
          for (const snakeKey of HC_SUB_ENTITY_KEYS) {
            const camelKey = snakeKey.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
            const addons = perms.healthcare_addons;
            if (Array.isArray(addons)) {
              result[camelKey] = addons.includes(snakeKey);
              continue;
            }
            const entityPerms = perms[snakeKey];
            result[camelKey] = Array.isArray(entityPerms) && entityPerms.length > 0;
          }
          hcTranslated[rId] = result;
        }
        if (Object.keys(hcTranslated).length > 0) {
          localStorage.setItem('healthcare_role_perms', JSON.stringify(hcTranslated));
        }
        // ─── Also store the current user's healthcare_admin CRUD permissions ───
        const currentRole = (localStorage.getItem('role') || '').toLowerCase().trim();
        const userRoleDef = tenantRoles.value.find(r => (r.id || '').toLowerCase() === currentRole);
        if (userRoleDef?.permissions?.healthcare_admin) {
          localStorage.setItem('healthcare_admin_perms', JSON.stringify(userRoleDef.permissions.healthcare_admin));
        } else if (['owner', 'admin', 'super_admin'].includes(currentRole)) {
          // These roles bypass all checks — store full perms
          localStorage.setItem('healthcare_admin_perms', JSON.stringify(['read', 'write', 'edit', 'delete']));
        } else {
          localStorage.removeItem('healthcare_admin_perms');
        }
      } catch (e) {
        console.warn('[useRBAC] Failed to sync healthcare perms:', e);
      }
      // ─── End healthcare perms sync ───────────────────────────────────────────
    } catch (err) {
      console.error('Error fetching roles:', err);
      tenantRoles.value = [...DEFAULT_ROLES];
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Create a new custom role
   */
  const createRole = async (roleData) => {
    const tenantId = getTenantId();
    if (!tenantId) throw new Error('Tenant ID not found');

    const validation = validateRole(roleData);
    if (!validation.valid) {
      throw new Error(validation.errors.join(', '));
    }

    isLoading.value = true;
    error.value = null;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/rbac/roles?tenant_id=${tenantId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...roleData,
          createdBy: getUserEmail(),
          createdAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to create role');
      }

      const newRole = await response.json();
      tenantRoles.value.push(newRole);
      return newRole;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Update an existing role
   */
  const updateRole = async (roleId, updates) => {
    const tenantId = getTenantId();
    if (!tenantId) throw new Error('Tenant ID not found');

    isLoading.value = true;
    error.value = null;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/rbac/roles/${roleId}?tenant_id=${tenantId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...updates,
          updatedBy: getUserEmail(),
          updatedAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to update role');
      }

      const updatedRole = await response.json();
      const index = tenantRoles.value.findIndex(r => r.id === roleId);
      if (index >= 0) {
        tenantRoles.value[index] = updatedRole;
      }
      return updatedRole;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Delete a custom role (system roles cannot be deleted)
   */
  const deleteRole = async (roleId) => {
    const tenantId = getTenantId();
    if (!tenantId) throw new Error('Tenant ID not found');

    const role = tenantRoles.value.find(r => r.id === roleId);
    if (role?.id === 'owner') {
      throw new Error('The Owner role cannot be deleted');
    }

    isLoading.value = true;
    error.value = null;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/rbac/roles/${roleId}?tenant_id=${tenantId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to delete role');
      }

      tenantRoles.value = tenantRoles.value.filter(r => r.id !== roleId);
      return true;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // ==================== ORGANIZATION MANAGEMENT ====================

  /**
   * Fetch associated organizations
   */
  const fetchOrganizations = async () => {
    const tenantId = getTenantId();
    if (!tenantId) return;

    isLoading.value = true;
    error.value = null;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/rbac/organizations?tenant_id=${tenantId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        tenantOrganizations.value = data.organizations || [];
      }
    } catch (err) {
      console.error('Error fetching organizations:', err);
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Add a new associated organization
   */
  const addOrganization = async (orgData) => {
    const tenantId = getTenantId();
    if (!tenantId) throw new Error('Tenant ID not found');

    isLoading.value = true;
    error.value = null;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/rbac/organizations?tenant_id=${tenantId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...orgData,
          id: orgData.id || `org_${Date.now()}`,
          createdBy: getUserEmail(),
          createdAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to add organization');
      }

      const newOrg = await response.json();
      tenantOrganizations.value.push(newOrg);
      return newOrg;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Update an organization
   */
  const updateOrganization = async (orgId, updates) => {
    const tenantId = getTenantId();
    if (!tenantId) throw new Error('Tenant ID not found');

    isLoading.value = true;
    error.value = null;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/rbac/organizations/${orgId}?tenant_id=${tenantId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...updates,
          updatedBy: getUserEmail(),
          updatedAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to update organization');
      }

      const updatedOrg = await response.json();
      const index = tenantOrganizations.value.findIndex(o => o.id === orgId);
      if (index >= 0) {
        tenantOrganizations.value[index] = updatedOrg;
      }
      return updatedOrg;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Remove an organization association
   */
  const removeOrganization = async (orgId) => {
    const tenantId = getTenantId();
    if (!tenantId) throw new Error('Tenant ID not found');

    isLoading.value = true;
    error.value = null;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/rbac/organizations/${orgId}?tenant_id=${tenantId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to remove organization');
      }

      tenantOrganizations.value = tenantOrganizations.value.filter(o => o.id !== orgId);
      return true;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // ==================== UI PREFERENCES ====================

  /**
   * Fetch UI preferences for tenant
   */
  const fetchUIPreferences = async () => {
    const tenantId = getTenantId();
    if (!tenantId) return;

    try {
      const cachedPrefs = localStorage.getItem('ub_ui_preferences');
      if (cachedPrefs) {
        tenantUIPreferences.value = { ...DEFAULT_UI_PREFERENCES, ...JSON.parse(cachedPrefs) };
        applyUIPreferences();
      }

      if (DEV_BYPASS) return;

      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/rbac/preferences?tenant_id=${tenantId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        tenantUIPreferences.value = { ...DEFAULT_UI_PREFERENCES, ...data.preferences };
        applyUIPreferences();
        // Sync to localStorage for faster loading on next page load
        localStorage.setItem('ub_ui_preferences', JSON.stringify(tenantUIPreferences.value));
      }
    } catch (err) {
      console.error('Error fetching UI preferences:', err);
    }
  };

  /**
   * Update UI preferences
   */
  const updateUIPreferences = async (preferences) => {
    const tenantId = getTenantId();
    if (!tenantId) throw new Error('Tenant ID not found');

    isLoading.value = true;
    error.value = null;

    try {
      if (DEV_BYPASS) {
        tenantUIPreferences.value = { ...tenantUIPreferences.value, ...preferences };
        applyUIPreferences();
        localStorage.setItem('ub_ui_preferences', JSON.stringify(tenantUIPreferences.value));
        return tenantUIPreferences.value;
      }

      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/rbac/preferences?tenant_id=${tenantId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          preferences,
          updatedBy: getUserEmail(),
          updatedAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to update preferences');
      }

      tenantUIPreferences.value = { ...tenantUIPreferences.value, ...preferences };
      applyUIPreferences();

      // Also save to localStorage for faster loading
      localStorage.setItem('ub_ui_preferences', JSON.stringify(tenantUIPreferences.value));

      return tenantUIPreferences.value;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Apply UI preferences to the document
   */
  const applyUIPreferences = (forcePrefs = null) => {
    const prefs = forcePrefs || tenantUIPreferences.value;
    const root = document.documentElement;

    // Apply brand colors as CSS variables
    if (prefs.brandColors) {
      Object.entries(prefs.brandColors).forEach(([key, value]) => {
        root.style.setProperty(`--brand-${key}`, value);
        // Map common keys for backward compatibility
        if (key === 'primary') root.style.setProperty('--color-primary', value);
        if (key === 'secondary') root.style.setProperty('--color-secondary', value);
      });
    }

    // Apply font family
    if (prefs.fontFamily) {
      const selectedFont = FONT_FAMILIES.find(f => f.id === prefs.fontFamily);
      if (selectedFont) {
        root.style.setProperty('--font-family-main', selectedFont.value);
        // Also set on body to ensure global application
        document.body.style.fontFamily = selectedFont.value;
      }
    }

    // Apply theme mode
    if (prefs.themeMode === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else if (prefs.themeMode === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      // System default
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', prefersDark);
      root.classList.toggle('light', !prefersDark);
    }

    // Apply font size scale
    const fontSizes = { small: 0.875, medium: 1, large: 1.125, 'extra-large': 1.25 };
    const scale = fontSizes[prefs.fontSize] || 1;
    root.style.setProperty('--font-scale', scale);
    root.style.fontSize = `${scale * 16}px`;

    const cardRadius = UI_CARD_RADIUS_OPTIONS.find(option => option.id === prefs.cardRadius)?.value || '0px';
    const buttonRadius = UI_BUTTON_RADIUS_OPTIONS.find(option => option.id === prefs.buttonRadius)?.value || '0px';
    const inputRadius = UI_INPUT_RADIUS_OPTIONS.find(option => option.id === prefs.inputRadius)?.value || '0px';
    const cardShadow = UI_CARD_ELEVATION_OPTIONS.find(option => option.id === prefs.cardElevation)?.value || 'none';
    const patternOpacity = UI_PATTERN_OPTIONS.find(option => option.id === prefs.patternIntensity)?.value || '0.05';
    const visualStyle = prefs.visualStyle || DEFAULT_UI_PREFERENCES.visualStyle;
    const isOriginalUI = visualStyle === 'original';
    const visualStyleTokens = isOriginalUI
      ? {
          '--ui-surface-alpha': '1',
          '--ui-surface-blur': '0px',
          '--ui-surface-outline': 'var(--color-border)',
          '--ui-raised-shadow': 'var(--shadow-sm)',
          '--ui-card-surface': '#ffffff',
          '--ui-button-shadow': 'var(--shadow-sm)',
          '--ui-control-shadow': 'none',
          '--ui-inset-highlight': 'inset 0 1px 0 rgba(255, 255, 255, 0.48)'
        }
      : (UI_VISUAL_STYLE_PRESETS[visualStyle]?.tokens || UI_VISUAL_STYLE_PRESETS.flat.tokens);

    root.style.setProperty('--ui-card-radius', cardRadius);
    root.style.setProperty('--ui-button-radius', buttonRadius);
    root.style.setProperty('--ui-input-radius', inputRadius);
    root.style.setProperty('--ui-card-shadow', cardShadow);
    root.style.setProperty('--ui-pattern-opacity', patternOpacity);
    root.style.setProperty('--ui-button-style', prefs.buttonStyle || 'filled');
    Object.entries(visualStyleTokens).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
    if (isOriginalUI) {
      delete root.dataset.uiButtonStyle;
      delete root.dataset.uiVisualStyle;
    } else {
      root.dataset.uiButtonStyle = prefs.buttonStyle || 'filled';
      root.dataset.uiVisualStyle = visualStyle;
    }
    root.dataset.uiDensity = prefs.compactMode ? 'compact' : 'comfortable';
    root.dataset.uiAnimations = prefs.showAnimations === false ? 'off' : 'on';

    console.log('[useRBAC] UI Preferences applied:', { theme: prefs.themeMode, font: prefs.fontFamily, size: prefs.fontSize, visualStyle: visualStyle, cardRadius: cardRadius, buttonRadius: buttonRadius });
  };

  // ==================== INITIALIZATION ====================

  /**
   * Initialize RBAC for current user
   */
  const initializeRBAC = async () => {
    const userRole = getUserRole();
    console.log('[initializeRBAC] Initial User Role from JWT:', userRole);

    // Helper to find role by ID or Name (case-insensitive)
    const findRole = (roles, target) => {
      if (!target) return null;
      const lowerTarget = target.toLowerCase();
      return roles.find(r =>
        r.id === target ||
        r.id.toLowerCase() === lowerTarget ||
        r.name === target ||
        r.name.toLowerCase() === lowerTarget
      );
    };

    // Find role from tenant roles or defaults
    // Start with null/restrictive rather than assuming 'attendant' during load
    currentUserRole.value = findRole(tenantRoles.value, userRole)
      || findRole(DEFAULT_ROLES, userRole);

    if (currentUserRole.value) {
      currentUserPermissions.value = { ...currentUserRole.value.permissions };
    }

    // Load from localStorage first for faster UI
    const cachedPrefs = localStorage.getItem('ub_ui_preferences');
    if (cachedPrefs) {
      try {
        tenantUIPreferences.value = { ...DEFAULT_UI_PREFERENCES, ...JSON.parse(cachedPrefs) };
        applyUIPreferences();
      } catch (e) {
        // Ignore parse errors
      }
    }

    // Fetch from API in background
    await Promise.all([
      fetchRoles(),
      fetchOrganizations(),
      fetchUIPreferences()
    ]);

    // Re-evaluate role after fetching (in case custom role was loaded)
    const updatedUserRole = getUserRole();
    const foundRole = findRole(tenantRoles.value, updatedUserRole);

    if (foundRole) {
      currentUserRole.value = foundRole;
      currentUserPermissions.value = { ...foundRole.permissions };
    }
  };

  // ==================== RETURN ====================

  return {
    // State (readonly)
    currentUserRole: readonly(currentUserRole),
    currentUserPermissions: readonly(currentUserPermissions),
    tenantRoles: readonly(tenantRoles),
    tenantOrganizations: readonly(tenantOrganizations),
    tenantUIPreferences: readonly(tenantUIPreferences),
    isLoading: readonly(isLoading),
    error: readonly(error),

    // Permission checking
    hasPermission,
    hasAnyPermission,
    canRead,
    canWrite,
    canEdit,
    canDelete,
    canAssign,
    canApprove,
    canExport,
    isSuperAdmin,
    isAdmin,
    canManageRoles,

    // Role management
    fetchRoles,
    createRole,
    updateRole,
    deleteRole,

    // Organization management
    fetchOrganizations,
    addOrganization,
    updateOrganization,
    removeOrganization,

    // UI preferences
    fetchUIPreferences,
    updateUIPreferences,
    applyUIPreferences,

    // Initialization
    initializeRBAC,

    // Utilities
    createEmptyRole,
    createEmptyOrganization,

    // Constants
    PERMISSION_ENTITIES,
    PERMISSION_TYPES,
    ALL_PERMISSIONS,
    ORGANIZATION_TYPES,
    ACCESS_SCOPES,
    DEFAULT_UI_PREFERENCES,
    ORIGINAL_UI_PREFERENCES
  };
}

export default useRBAC;
