// src/services/audit_log.js

// Call this function after important user actions (login, logout, data changes, permission changes, etc.)
export async function logAuditEvent(action, details = {}) {
  try {
    await fetch('/api/audit-log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action,
        details,
        timestamp: new Date().toISOString(),
        user: localStorage.getItem('userEmail') || null // or get from store
      })
    });
  } catch (err) {
    // Optionally handle/log error locally
    console.error('Failed to log audit event:', err);
  }
} 