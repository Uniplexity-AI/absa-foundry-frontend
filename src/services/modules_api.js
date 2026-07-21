/**
 * Modules API Service
 * Handles module subscription checks and management
 */

import { decodeJWT } from './decodeJWT';

import { API_BASE_URL } from './api';
const { getTenantId, getToken } = decodeJWT();

/**
 * Check if tenant has access to a specific module
 * @param {string} moduleId - Module ID to check (e.g., 'invoicing', 'crm')
 * @returns {Promise<boolean>} - True if subscribed, false otherwise
 */
export async function checkModuleSubscription(moduleId) {
  try {
    const tenantId = getTenantId();
    const token = getToken();

    if (!tenantId) {
      console.error('No tenant ID found');
      return false;
    }

    const response = await fetch(
      `${API_BASE_URL}/modules-manager/owner/modules?tenant_id=${tenantId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch modules:', response.status);
      return false;
    }

    const data = await response.json();
    const subscribedModules = data.modules || [];

    // Check if the module is in the subscribed list
    return subscribedModules.includes(moduleId);
  } catch (error) {
    console.error('Error checking module subscription:', error);
    return false;
  }
}

/**
 * Get all subscribed modules for the tenant
 * @returns {Promise<string[]>} - Array of subscribed module IDs
 */
export async function getSubscribedModules() {
  try {
    const tenantId = getTenantId();
    const token = getToken();

    if (!tenantId) {
      console.error('No tenant ID found');
      return [];
    }

    const response = await fetch(
      `${API_BASE_URL}/modules-manager/owner/modules?tenant_id=${tenantId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch modules:', response.status);
      return [];
    }

    const data = await response.json();
    return data.modules || [];
  } catch (error) {
    console.error('Error fetching subscribed modules:', error);
    return [];
  }
}

/**
 * Get all module statuses (active and pending)
 * @returns {Promise<{active: string[], pending: string[]}>}
 */
export async function getModuleStatuses() {
  try {
    const tenantId = getTenantId();
    const token = getToken();

    if (!tenantId) return { active: [], pending: [] };

    const response = await fetch(
      `${API_BASE_URL}/modules-manager/owner/modules?tenant_id=${tenantId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) return { active: [], pending: [] };

    const data = await response.json();
    return {
      active: data.modules || [],
      pending: data.pending_modules || []
    };
  } catch (error) {
    console.error('Error fetching module statuses:', error);
    return { active: [], pending: [] };
  }
}

/**
 * Get all available modules with prices
 * @returns {Promise<Array>} - Array of available modules
 */
export async function getAvailableModules() {
  try {
    const token = getToken();

    const response = await fetch(
      `${API_BASE_URL}/modules-manager/available`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch available modules:', response.status);
      return [];
    }

    const data = await response.json();
    return data.modules || [];
  } catch (error) {
    console.error('Error fetching available modules:', error);
    return [];
  }
}

/**
 * Request subscription to a module
 * @param {string} moduleId - Module ID to subscribe to
 * @param {string} subscriptionType - Optional subscription type
 * @returns {Promise<Object>} - Response with success status and message
 */
export async function requestModuleSubscription(modules, paymentPlan = null, tier = null, extraPayload = null) {
  try {
    const tenantId = getTenantId();
    const token = getToken();

    if (!tenantId) {
      throw new Error('No tenant ID found');
    }

    // Handle both single module ID (string) and array of IDs
    const moduleList = Array.isArray(modules) ? modules : [modules];

    const body = {
      modules: moduleList
    };

    if (paymentPlan) {
      body.payment_plan = paymentPlan;
    }

    if (tier) {
      body.tier = tier;
    }

    // Merge extra capacity fields (custom_users, custom_branches, etc.)
    if (extraPayload) {
      if (extraPayload.custom_users != null) body.custom_users = extraPayload.custom_users;
      if (extraPayload.custom_branches != null) body.custom_branches = extraPayload.custom_branches;
      if (extraPayload.selected_storage_id != null) body.selected_storage_id = extraPayload.selected_storage_id;
      if (extraPayload.total_est != null) body.total_est = extraPayload.total_est;
    }

    const response = await fetch(
      `${API_BASE_URL}/modules-manager/owner/modules/select?tenant_id=${tenantId}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to request module subscription');
    }

    return await response.json();
  } catch (error) {
    console.error('Error requesting module subscription:', error);
    throw error;
  }
}
