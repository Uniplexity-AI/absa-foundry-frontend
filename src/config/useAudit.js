// src/config/useAudit.js
// ─────────────────────────────────────────────────────────────────────────────
// Shared audit composable. Import and use in ANY module/page to log user
// activity (create, update, delete, export, login, etc.) to the backend.
//
// Usage:
//   import { useAudit } from '@/config/useAudit';
//   const { logAudit } = useAudit();
//
//   await logAudit('create', 'inventory', { resource_type: 'product', label: item.name });
//   await logAudit('delete', 'pos',       { resource_type: 'cash_in', resource_id: id });
//   await logAudit('update', 'settings',  { resource_type: 'branding' });
//   await logAudit('export', 'sales',     { resource_type: 'pdf_report', period: 'month' });
// ─────────────────────────────────────────────────────────────────────────────

import { API_BASE_URL } from '@/api_services/api';
import { decodeJWT } from '@/api_services/decodeJWT';

export function useAudit() {
  const { getToken, getUserEmail, getUserName, getUserRole, getTenantId } = decodeJWT();

  /**
   * Resolve the active operator role at call time.
   * Priority: localStorage 'role' → pos_operator.role → JWT role
   */
  const _resolveRole = () => {
    const localRole = (localStorage.getItem('role') || '').toLowerCase();
    if (localRole) return localRole;
    try {
      const op = JSON.parse(localStorage.getItem('pos_operator') || 'null');
      if (op?.role) return op.role.toLowerCase();
    } catch (_) {}
    return (getUserRole() || 'unknown').toLowerCase();
  };

  /**
   * Log a user action to the backend audit log.
   *
   * @param {string} action   - 'create' | 'update' | 'delete' | 'login' | 'logout' | 'export' | 'import' | 'approve' | 'reject' | ...
   * @param {string} module   - 'settings' | 'pos' | 'cash-in' | 'inventory' | 'invoices' | 'hr' | 'crm' | 'assets' | ...
   * @param {object} details  - optional context: { resource_type, resource_id, label, old_value, new_value, ... }
   */
  async function logAudit(action, module, details = {}) {
    try {
      const tenantId = getTenantId();
      if (!tenantId) {
        console.warn('[Audit] Skipping log — no tenant_id available');
        return;
      }

      const payload = {
        tenant_id: tenantId,
        user_email: getUserEmail(),
        user_name: getUserName(),
        role: _resolveRole(),
        action,
        module,
        details,
        timestamp: new Date().toISOString()
      };

      const res = await fetch(`${API_BASE_URL}/audit-logs/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errBody = await res.text();
        console.warn('[Audit] POST /audit-logs/ failed:', res.status, errBody);
      }
    } catch (e) {
      // Audit must never break the calling feature — silently warn only.
      console.warn('[Audit] Failed to log event:', action, module, e);
    }
  }

  return { logAudit };
}
