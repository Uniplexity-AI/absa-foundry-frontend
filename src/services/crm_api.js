import { API_BASE_URL } from './api'

function _headers() {
  const token = localStorage.getItem('token') || ''
  return {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : ''
  }
}

async function _handleRes(res) {
  const text = await res.text()
  let data = null
  if (text) {
    try { data = JSON.parse(text) } catch { data = null }
  }
  if (!res.ok) {
    let detail = data && (data.detail || data.message || data.error)
    // FastAPI validation errors can be arrays of {loc,msg,type}
    if (Array.isArray(detail)) {
      detail = detail.map(d => (d && (d.msg || d.message)) || JSON.stringify(d)).join('; ')
    } else if (detail && typeof detail === 'object') {
      detail = detail.msg || detail.message || JSON.stringify(detail)
    }
    const msg = detail || res.statusText || `Request failed (${res.status})`
    const err = new Error(msg)
    err.status = res.status
    err.data = data
    throw err
  }
  return data
}

function _sanitizeParams(params = {}) {
  const out = {}
  Object.keys(params || {}).forEach((k) => {
    const v = params[k]
    // Skip undefined, null, empty string, or literal 'undefined'
    if (v === undefined || v === null) return
    if (typeof v === 'string' && (v.trim() === '' || v === 'undefined')) return
    out[k] = v
  })
  return out
}

export async function getLeads(tenantId, params = {}) {
  const clean = _sanitizeParams(params)
  const query = new URLSearchParams({ tenant_id: tenantId, ...clean }).toString()
  const res = await fetch(`${API_BASE_URL}/crm/leads?${query}`, { headers: _headers() })
  return _handleRes(res)
}

export async function getLead(leadId, tenantId) {
  const res = await fetch(`${API_BASE_URL}/crm/leads/${leadId}?tenant_id=${tenantId}`, { headers: _headers() })
  return _handleRes(res)
}

export async function getLeadNotes(leadId, tenantId) {
  const res = await fetch(`${API_BASE_URL}/crm/leads/${leadId}/notes?tenant_id=${tenantId}`, { headers: _headers() })
  return _handleRes(res)
}

export async function getLeadEmails(leadId, tenantId) {
  const res = await fetch(`${API_BASE_URL}/crm/leads/${leadId}/emails?tenant_id=${tenantId}`, { headers: _headers() })
  return _handleRes(res)
}

export async function getLeadAttachments(leadId, tenantId) {
  const res = await fetch(`${API_BASE_URL}/crm/leads/${leadId}/attachments?tenant_id=${tenantId}`, { headers: _headers() })
  return _handleRes(res)
}

export async function getLeadCampaigns(leadId, tenantId) {
  const res = await fetch(`${API_BASE_URL}/crm/leads/${leadId}/campaigns?tenant_id=${tenantId}`, { headers: _headers() })
  return _handleRes(res)
}

export async function createLead(payload) {
  const res = await fetch(`${API_BASE_URL}/crm/leads`, {
    method: 'POST',
    headers: _headers(),
    body: JSON.stringify(payload)
  })
  return _handleRes(res)
}

export async function updateLead(leadId, payload, tenantId) {
  const res = await fetch(`${API_BASE_URL}/crm/leads/${leadId}?tenant_id=${tenantId}`, {
    method: 'PUT',
    headers: _headers(),
    body: JSON.stringify(payload)
  })
  return _handleRes(res)
}

export async function deleteLead(leadId, tenantId) {
  const res = await fetch(`${API_BASE_URL}/crm/leads/${leadId}?tenant_id=${tenantId}`, {
    method: 'DELETE',
    headers: _headers()
  })
  const data = await _handleRes(res)
  try {
    await logLeadActivity(leadId, { tenant_id: tenantId, action: 'deleted', notes: '' })
  } catch (e) {
    console.warn('Failed to log lead deletion activity', e)
  }
  return data
}

// Customers
export async function getCustomers(tenantId) {
  const res = await fetch(`${API_BASE_URL}/crm/customers?tenant_id=${tenantId}`, { headers: _headers() })
  return _handleRes(res)
}
export async function createCustomer(payload) {
  const res = await fetch(`${API_BASE_URL}/crm/customers`, { method: 'POST', headers: _headers(), body: JSON.stringify(payload) })
  return _handleRes(res)
}
export async function updateCustomer(customerId, payload, tenantId) {
  const res = await fetch(`${API_BASE_URL}/crm/customers/${customerId}?tenant_id=${tenantId}`, { method: 'PUT', headers: _headers(), body: JSON.stringify(payload) })
  return _handleRes(res)
}
export async function deleteCustomer(customerId, tenantId) {
  const res = await fetch(`${API_BASE_URL}/crm/customers/${customerId}?tenant_id=${tenantId}`, { method: 'DELETE', headers: _headers() })
  return _handleRes(res)
}

// Accounts & Conversion helpers
export async function createAccount(payload, tenantId) {
  const body = Object.assign({ tenant_id: tenantId }, payload || {})
  const res = await fetch(`${API_BASE_URL}/crm/accounts`, { method: 'POST', headers: _headers(), body: JSON.stringify(body) })
  return _handleRes(res)
}

export async function createContact(payload, tenantId) {
  const body = Object.assign({ tenant_id: tenantId }, payload || {})
  const res = await fetch(`${API_BASE_URL}/crm/contacts`, { method: 'POST', headers: _headers(), body: JSON.stringify(body) })
  return _handleRes(res)
}

export async function convertLead(leadId, tenantId, options = {}) {
  // Server-side endpoint for conversion expects tenant_id in the payload
  const payload = Object.assign({ leadId, tenant_id: tenantId }, options || {})
  const res = await fetch(`${API_BASE_URL}/crm/leads/${leadId}/convert`, { method: 'POST', headers: _headers(), body: JSON.stringify(payload) })
  return _handleRes(res)
}

// Communications
export async function getCommunications(tenantId, params = {}) {
  const clean = _sanitizeParams(params)
  const q = new URLSearchParams({ tenant_id: tenantId, ...clean }).toString()
  const res = await fetch(`${API_BASE_URL}/crm/communications?${q}`, { headers: _headers() })
  return _handleRes(res)
}
export async function createCommunication(payload) {
  const res = await fetch(`${API_BASE_URL}/crm/communications`, { method: 'POST', headers: _headers(), body: JSON.stringify(payload) })
  const data = await _handleRes(res)
  try {
    if (payload.contactId && payload.tenant_id) {
      // Log communication as activity for the contact (lead)
      await logLeadActivity(payload.contactId, { tenant_id: payload.tenant_id, action: `communication:${payload.type}`, notes: payload.message || payload.subject || '' })
    }
  } catch (e) {
    console.warn('Failed to log communication activity', e)
  }
  return data
}

// Convenience WhatsApp helpers
export async function startWhatsAppText({ tenantId, related_type, related_id, name, phone, text }) {
  const payload = { related_type, related_id, contactName: name, type: 'whatsapp', subtype: 'text', message: text || `WhatsApp message to ${name}`, phone, tenant_id: tenantId }
  try { createCommunication(payload).catch(() => { }) } catch { }
  const waPhone = (phone || '').replace(/[^+0-9]/g, '').replace(/^\+/, '')
  const url = waPhone ? `https://wa.me/${encodeURIComponent(waPhone)}?text=${encodeURIComponent(text || '')}` : `https://web.whatsapp.com/send?text=${encodeURIComponent(text || '')}`
  window.open(url, '_blank')
}

export async function startWhatsAppAudioCall({ tenantId, related_type, related_id, name, phone }) {
  const payload = { related_type, related_id, contactName: name, type: 'whatsapp', subtype: 'audio_call', message: `WhatsApp audio call to ${name}`, phone, tenant_id: tenantId }
  try { createCommunication(payload).catch(() => { }) } catch { }
  // Open chat as a proxy to initiate the call within WhatsApp UI
  const waPhone = (phone || '').replace(/[^+0-9]/g, '').replace(/^\+/, '')
  const url = waPhone ? `https://wa.me/${encodeURIComponent(waPhone)}` : `https://web.whatsapp.com/`
  window.open(url, '_blank')
}

export async function startWhatsAppVideoCall({ tenantId, related_type, related_id, name, phone }) {
  const payload = { related_type, related_id, contactName: name, type: 'whatsapp', subtype: 'video_call', message: `WhatsApp video call to ${name}`, phone, tenant_id: tenantId }
  try { createCommunication(payload).catch(() => { }) } catch { }
  const waPhone = (phone || '').replace(/[^+0-9]/g, '').replace(/^\+/, '')
  const url = waPhone ? `https://wa.me/${encodeURIComponent(waPhone)}` : `https://web.whatsapp.com/`
  window.open(url, '_blank')
}
export async function deleteCommunication(commId, tenantId) {
  const res = await fetch(`${API_BASE_URL}/crm/communications/${commId}?tenant_id=${tenantId}`, { method: 'DELETE', headers: _headers() })
  return _handleRes(res)
}

export async function patchCommunication(commId, tenantId, payload) {
  const res = await fetch(`${API_BASE_URL}/crm/communications/${commId}?tenant_id=${tenantId}`, {
    method: 'PATCH',
    headers: _headers(),
    body: JSON.stringify(payload || {})
  })
  return _handleRes(res)
}

export async function getCommunicationNotes(commId, tenantId) {
  const res = await fetch(`${API_BASE_URL}/crm/communications/${commId}/notes?tenant_id=${tenantId}`, { headers: _headers() })
  return _handleRes(res)
}

export async function addCommunicationNote(commId, tenantId, text) {
  const res = await fetch(`${API_BASE_URL}/crm/communications/${commId}/notes?tenant_id=${tenantId}`, {
    method: 'POST', headers: _headers(), body: JSON.stringify({ text })
  })
  return _handleRes(res)
}

// Lead activities
export async function getLeadActivities(leadId, tenantId) {
  const res = await fetch(`${API_BASE_URL}/crm/leads/${leadId}/activities?tenant_id=${tenantId}`, { headers: _headers() })
  return _handleRes(res)
}

export async function logLeadActivity(leadId, payload) {
  const tenantId = payload.tenant_id
  const res = await fetch(`${API_BASE_URL}/crm/leads/${leadId}/activities?tenant_id=${tenantId}`, { method: 'POST', headers: _headers(), body: JSON.stringify(payload) })
  return _handleRes(res)
}

// Notifications
export async function getNotifications(tenantId, params = {}) {
  const clean = _sanitizeParams(params)
  const query = new URLSearchParams({ tenant_id: tenantId, ...clean }).toString()
  const res = await fetch(`${API_BASE_URL}/notifications?${query}`, { headers: _headers() })
  return _handleRes(res)
}

export async function getLeadNotifications(leadId, tenantId) {
  const res = await fetch(`${API_BASE_URL}/notifications?tenant_id=${tenantId}&lead_id=${encodeURIComponent(leadId)}&category=crm`, { headers: _headers() })
  return _handleRes(res)
}

export async function markNotificationRead(notifId, tenantId) {
  const res = await fetch(`${API_BASE_URL}/notifications/${notifId}/read?tenant_id=${tenantId}`, {
    method: 'PUT', headers: _headers()
  })
  return _handleRes(res)
}

export async function markAllNotificationsRead(tenantId) {
  const res = await fetch(`${API_BASE_URL}/notifications/mark-read?tenant_id=${tenantId}`, {
    method: 'PUT', headers: _headers()
  })
  return _handleRes(res)
}

export async function dismissNotification(notifId, tenantId) {
  const res = await fetch(`${API_BASE_URL}/notifications/${notifId}/dismiss?tenant_id=${tenantId}`, {
    method: 'POST', headers: _headers()
  })
  return _handleRes(res)
}

export async function dismissAllNotifications(tenantId) {
  const res = await fetch(`${API_BASE_URL}/notifications?tenant_id=${tenantId}`, {
    method: 'DELETE', headers: _headers()
  })
  return _handleRes(res)
}

export async function scanCrmNotifications(tenantId) {
  const res = await fetch(`${API_BASE_URL}/crm/notifications/scan?tenant_id=${tenantId}`, {
    method: 'POST', headers: _headers()
  })
  return _handleRes(res)
}

// Module metadata & generic records API (for dynamic module UI)
export async function getModuleMetadata(tenantId) {
  const res = await fetch(`${API_BASE_URL}/metadata/modules?tenant_id=${tenantId}`, { headers: _headers() })
  return _handleRes(res)
}

export async function getModuleRecords(moduleName, tenantId, params = {}) {
  const clean = _sanitizeParams(params)
  const query = new URLSearchParams({ module: moduleName, tenant_id: tenantId, ...clean }).toString()
  const res = await fetch(`${API_BASE_URL}/records?${query}`, { headers: _headers() })
  return _handleRes(res)
}

// CRM Metadata (Pipeline Stages)
export async function getCRMMetadata(tenantId) {
  const res = await fetch(`${API_BASE_URL}/crm/metadata?tenant_id=${tenantId}`, { headers: _headers() })
  return _handleRes(res)
}

export async function updateCRMMetadata(metadata) {
  const res = await fetch(`${API_BASE_URL}/crm/metadata`, {
    method: 'PUT',
    headers: _headers(),
    body: JSON.stringify(metadata)
  })
  return _handleRes(res)
}

// Import/Export functions
export async function bulkImportLeads(leadsData, tenantId) {
  const res = await fetch(`${API_BASE_URL}/crm/leads/import?tenant_id=${tenantId}`, {
    method: 'POST',
    headers: _headers(),
    body: JSON.stringify(leadsData)
  })
  return _handleRes(res)
}

export async function exportLeads(tenantId, limit = 10000) {
  const res = await fetch(`${API_BASE_URL}/crm/leads/export?tenant_id=${tenantId}&limit=${limit}`, {
    headers: _headers()
  })
  return _handleRes(res)
}

export async function fetchLeads(params = {}) {
  // Alias for getLeads with tenant_id from params
  const tenantId = params.tenant_id
  if (!tenantId) throw new Error('tenant_id required')
  return getLeads(tenantId, params)
}

// ============================================================================
// CONTACTS API
// ============================================================================

export async function getContacts(tenantId, params = {}) {
  const clean = _sanitizeParams(params)
  const query = new URLSearchParams({ tenant_id: tenantId, ...clean }).toString()
  const res = await fetch(`${API_BASE_URL}/crm/contacts?${query}`, { headers: _headers() })
  return _handleRes(res)
}

export async function getContact(contactId, tenantId) {
  const res = await fetch(`${API_BASE_URL}/crm/contacts/${contactId}?tenant_id=${tenantId}`, { headers: _headers() })
  return _handleRes(res)
}

export async function updateContact(contactId, payload, tenantId) {
  const body = Object.assign({ tenant_id: tenantId }, payload || {})
  const res = await fetch(`${API_BASE_URL}/crm/contacts/${contactId}`, {
    method: 'PUT',
    headers: _headers(),
    body: JSON.stringify(body)
  })
  return _handleRes(res)
}

export async function deleteContact(contactId, tenantId) {
  const res = await fetch(`${API_BASE_URL}/crm/contacts/${contactId}?tenant_id=${tenantId}`, {
    method: 'DELETE',
    headers: _headers()
  })
  return _handleRes(res)
}

export async function getContactActivities(contactId, tenantId) {
  const res = await fetch(`${API_BASE_URL}/crm/activities?tenant_id=${tenantId}&related_type=contact&related_id=${contactId}`, {
    headers: _headers()
  })
  return _handleRes(res)
}

// ============================================================================
// ACCOUNTS API
// ============================================================================

export async function getAccounts(tenantId, params = {}) {
  const clean = _sanitizeParams(params)
  const query = new URLSearchParams({ tenant_id: tenantId, ...clean }).toString()
  const res = await fetch(`${API_BASE_URL}/crm/accounts?${query}`, { headers: _headers() })
  return _handleRes(res)
}

export async function getAccount(accountId, tenantId) {
  const res = await fetch(`${API_BASE_URL}/crm/accounts/${accountId}?tenant_id=${tenantId}`, { headers: _headers() })
  return _handleRes(res)
}

export async function updateAccount(accountId, payload, tenantId) {
  const body = Object.assign({ tenant_id: tenantId }, payload || {})
  const res = await fetch(`${API_BASE_URL}/crm/accounts/${accountId}`, {
    method: 'PUT',
    headers: _headers(),
    body: JSON.stringify(body)
  })
  return _handleRes(res)
}

export async function deleteAccount(accountId, tenantId) {
  const res = await fetch(`${API_BASE_URL}/crm/accounts/${accountId}?tenant_id=${tenantId}`, {
    method: 'DELETE',
    headers: _headers()
  })
  return _handleRes(res)
}

export async function getAccountContacts(accountId, tenantId) {
  const res = await fetch(`${API_BASE_URL}/crm/accounts/${accountId}/contacts?tenant_id=${tenantId}`, {
    headers: _headers()
  })
  return _handleRes(res)
}

export async function getAccountActivities(accountId, tenantId) {
  const res = await fetch(`${API_BASE_URL}/crm/activities?tenant_id=${tenantId}&related_type=account&related_id=${accountId}`, {
    headers: _headers()
  })
  return _handleRes(res)
}

// ============================================================================
// DEALS API
// ============================================================================

export async function getDeals(tenantId, params = {}) {
  const clean = _sanitizeParams(params)
  const query = new URLSearchParams({ tenant_id: tenantId, ...clean }).toString()
  const res = await fetch(`${API_BASE_URL}/crm/deals?${query}`, { headers: _headers() })
  return _handleRes(res)
}

export async function getDeal(dealId, tenantId) {
  const res = await fetch(`${API_BASE_URL}/crm/deals/${dealId}?tenant_id=${tenantId}`, { headers: _headers() })
  return _handleRes(res)
}

export async function createDeal(payload) {
  const res = await fetch(`${API_BASE_URL}/crm/deals`, {
    method: 'POST',
    headers: _headers(),
    body: JSON.stringify(payload)
  })
  return _handleRes(res)
}

export async function updateDeal(dealId, payload, tenantId) {
  const res = await fetch(`${API_BASE_URL}/crm/deals/${dealId}?tenant_id=${tenantId}`, {
    method: 'PUT',
    headers: _headers(),
    body: JSON.stringify(payload)
  })
  return _handleRes(res)
}

export async function deleteDeal(dealId, tenantId) {
  const res = await fetch(`${API_BASE_URL}/crm/deals/${dealId}?tenant_id=${tenantId}`, {
    method: 'DELETE',
    headers: _headers()
  })
  return _handleRes(res)
}

export async function getDealActivities(dealId, tenantId) {
  const res = await fetch(`${API_BASE_URL}/crm/activities?tenant_id=${tenantId}&related_type=deal&related_id=${dealId}`, {
    headers: _headers()
  })
  return _handleRes(res)
}

export async function getAccountDeals(accountId, tenantId, params = {}) {
  const clean = _sanitizeParams(params)
  const query = new URLSearchParams({ tenant_id: tenantId, accountId, per_page: 200, ...clean }).toString()
  const res = await fetch(`${API_BASE_URL}/crm/deals?${query}`, { headers: _headers() })
  return _handleRes(res)
}

export async function getMeetings(tenantId, params = {}) {
  const clean = _sanitizeParams(params)
  const query = new URLSearchParams({ tenant_id: tenantId, ...clean }).toString()
  const res = await fetch(`${API_BASE_URL}/crm/meetings/list?${query}`, { headers: _headers() })
  return _handleRes(res)
}

// ============================================================================
// ACTIVITIES API
// ============================================================================

export async function getActivities(tenantId, params = {}) {
  const clean = _sanitizeParams(params)
  const query = new URLSearchParams({ tenant_id: tenantId, ...clean }).toString()
  const res = await fetch(`${API_BASE_URL}/crm/activities?${query}`, { headers: _headers() })
  return _handleRes(res)
}

// ============================================================================
// VISITS API
// ============================================================================

export async function getVisits(tenantId, params = {}) {
  const clean = _sanitizeParams(params)
  const query = new URLSearchParams({ tenant_id: tenantId, ...clean }).toString()
  const res = await fetch(`${API_BASE_URL}/crm/visits?${query}`, { headers: _headers() })
  return _handleRes(res)
}

export async function createVisit(payload) {
  const res = await fetch(`${API_BASE_URL}/crm/visits`, {
    method: 'POST',
    headers: _headers(),
    body: JSON.stringify(payload)
  })
  return _handleRes(res)
}

export async function patchVisit(visitId, tenantId, payload) {
  const res = await fetch(`${API_BASE_URL}/crm/visits/${visitId}?tenant_id=${tenantId}`, {
    method: 'PATCH',
    headers: _headers(),
    body: JSON.stringify(payload || {})
  })
  return _handleRes(res)
}

export async function addVisitNote(visitId, tenantId, text) {
  const res = await fetch(`${API_BASE_URL}/crm/visits/${visitId}/notes?tenant_id=${tenantId}`, {
    method: 'POST',
    headers: _headers(),
    body: JSON.stringify({ text })
  })
  return _handleRes(res)
}

export async function getVisitNotes(visitId, tenantId) {
  const res = await fetch(`${API_BASE_URL}/crm/visits/${visitId}/notes?tenant_id=${tenantId}`, { headers: _headers() })
  return _handleRes(res)
}

export async function deleteVisit(visitId, tenantId) {
  const res = await fetch(`${API_BASE_URL}/crm/visits/${visitId}?tenant_id=${tenantId}`, {
    method: 'DELETE',
    headers: _headers()
  })
  return _handleRes(res)
}

// Bulk Upload for Leads
export async function uploadLeadsBulkFile(formData, tenantId) {
  const token = localStorage.getItem('token') || ''
  const res = await fetch(`${API_BASE_URL}/crm/leads/bulk-upload-file?tenant_id=${tenantId}`, {
    method: 'POST',
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
      // Don't set Content-Type - browser will set it with boundary for multipart/form-data
    },
    body: formData
  })
  return _handleRes(res)
}

export async function processLeadsBulkUpload(payload, tenantId) {
  const res = await fetch(`${API_BASE_URL}/crm/leads/bulk-upload-process?tenant_id=${tenantId}`, {
    method: 'POST',
    headers: _headers(),
    body: JSON.stringify(payload)
  })
  return _handleRes(res)
}

export async function downloadLeadTemplate(tenantId) {
  const token = localStorage.getItem('token') || ''
  const res = await fetch(`${API_BASE_URL}/crm/leads/download-template?tenant_id=${tenantId}`, {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  })

  if (!res.ok) {
    throw new Error('Failed to download template')
  }

  // Download the file
  const blob = await res.blob()
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'lead_import_template.xlsx'
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
  document.body.removeChild(a)
}

export async function createMeeting(payload) {
  const res = await fetch(`${API_BASE_URL}/crm/meetings/create`, {
    method: 'POST',
    headers: _headers(),
    body: JSON.stringify(payload)
  })
  return _handleRes(res)
}

// Update a meeting
export async function updateMeeting(meetingId, payload) {
  const res = await fetch(`${API_BASE_URL}/crm/meetings/${meetingId}`, {
    method: 'PUT',
    headers: _headers(),
    body: JSON.stringify(payload)
  })
  return _handleRes(res)
}

// Delete a meeting
export async function deleteMeeting(meetingId, tenantId) {
  const token = localStorage.getItem('token') || '';
  const tid = tenantId || (typeof localStorage !== 'undefined' ? localStorage.getItem('tenant_id') : '') || '';
  const qs = tid ? `?tenant_id=${encodeURIComponent(tid)}` : '';
  const response = await fetch(`${API_BASE_URL}/crm/meetings/${meetingId}${qs}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Failed to delete meeting');
  }
  return { success: true };
}

export async function createLeadNote(leadId, tenantId, payload) {
  const res = await fetch(`${API_BASE_URL}/crm/leads/${leadId}/notes?tenant_id=${tenantId}`, {
    method: 'POST',
    headers: _headers(),
    body: JSON.stringify(payload)
  })
  return _handleRes(res)
}

export async function deleteLeadNote(noteId, tenantId) {
  const res = await fetch(`${API_BASE_URL}/crm/notes/${noteId}?tenant_id=${tenantId}`, {
    method: 'DELETE',
    headers: _headers()
  })
  return _handleRes(res)
}

export async function deleteLeadActivity(activityId, tenantId) {
  const res = await fetch(`${API_BASE_URL}/crm/activities/${activityId}?tenant_id=${tenantId}`, {
    method: 'DELETE',
    headers: _headers()
  })
  return _handleRes(res)
}

export async function logAccountActivity(accountId, payload) {
  const tenantId = payload.tenant_id
  const res = await fetch(`${API_BASE_URL}/crm/activities?tenant_id=${tenantId}`, {
    method: 'POST',
    headers: _headers(),
    body: JSON.stringify({ ...payload, related_type: 'account', related_id: accountId })
  })
  return _handleRes(res)
}

export async function deleteAccountActivity(activityId, tenantId) {
  const res = await fetch(`${API_BASE_URL}/crm/activities/${activityId}?tenant_id=${tenantId}`, {
    method: 'DELETE',
    headers: _headers()
  })
  return _handleRes(res)
}

export default {
  getLeads,
  getLead,
  createLead,
  updateLead,
  deleteLead,
  getLeadNotes, getLeadEmails, getLeadAttachments, getLeadCampaigns,
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCommunications,
  createCommunication,
  deleteCommunication,
  patchCommunication,
  getCommunicationNotes, addCommunicationNote,
  startWhatsAppText, startWhatsAppAudioCall, startWhatsAppVideoCall,
  createLeadNote,
  deleteLeadNote,
  deleteLeadActivity,
  getLeadActivities,
  logLeadActivity,
  logAccountActivity,
  deleteAccountActivity,
  getNotifications, getLeadNotifications,
  markNotificationRead, markAllNotificationsRead, dismissNotification, dismissAllNotifications, scanCrmNotifications,
  getModuleMetadata, getModuleRecords,
  bulkImportLeads, exportLeads, fetchLeads,
  // Bulk Upload
  uploadLeadsBulkFile, processLeadsBulkUpload, downloadLeadTemplate,
  // Contacts
  getContacts, getContact, createContact, updateContact, deleteContact, getContactActivities,
  // Accounts
  getAccounts, getAccount, createAccount, updateAccount, deleteAccount, getAccountContacts, getAccountActivities, getAccountDeals,
  // Deals
  getDeals, getDeal, createDeal, updateDeal, deleteDeal, getDealActivities,
  // Bulk operations
  bulkAssignLeads, bulkDeleteLeads, bulkUpdateLeads,
  // Conversion
  convertLead,
  // Activities
  getActivities,
  // Visits
  getVisits, createVisit, patchVisit, addVisitNote, getVisitNotes, deleteVisit,
  // Meetings
  deleteMeeting, getMeetings, createMeeting, updateMeeting,

  // Metadata
  getCRMMetadata, updateCRMMetadata,

  // Analytics
  getStats, getTeamPerformance
}

export async function bulkAssignLeads(payload) {
  // payload: { lead_ids: string[], assignedTo: string, tenant_id: string }
  const res = await fetch(`${API_BASE_URL}/crm/leads/bulk-assign`, {
    method: 'POST',
    headers: _headers(),
    body: JSON.stringify(payload)
  })
  return _handleRes(res)
}

export async function bulkDeleteLeads(payload) {
  // payload: { lead_ids: string[], tenant_id: string }
  const res = await fetch(`${API_BASE_URL}/crm/leads/bulk-delete`, {
    method: 'POST',
    headers: _headers(),
    body: JSON.stringify(payload)
  })
  return _handleRes(res)
}

export async function bulkUpdateLeads(payload) {
  // payload: { lead_ids: string[], updates: object, tenant_id: string }
  const res = await fetch(`${API_BASE_URL}/crm/leads/bulk-update`, {
    method: 'POST',
    headers: _headers(),
    body: JSON.stringify(payload)
  })
  return _handleRes(res)
}

export async function getStats(tenantId, params = {}) {
  const clean = _sanitizeParams(params)
  const query = new URLSearchParams({ tenant_id: tenantId, ...clean }).toString()
  const res = await fetch(`${API_BASE_URL}/crm/stats?${query}`, { headers: _headers() })
  return _handleRes(res)
}

export async function getTeamPerformance(tenantId, params = {}) {
  const clean = _sanitizeParams(params)
  const query = new URLSearchParams({ tenant_id: tenantId, ...clean }).toString()
  const res = await fetch(`${API_BASE_URL}/crm/performance/team?${query}`, { headers: _headers() })
  return _handleRes(res)
}

// ============================================================================
// ACQUISITION COSTS API
// ============================================================================

export async function saveAcquisitionCost(payload) {
  const res = await fetch(`${API_BASE_URL}/crm/acquisition-costs`, {
    method: 'POST',
    headers: _headers(),
    body: JSON.stringify(payload)
  })
  return _handleRes(res)
}

export async function getAcquisitionCosts(tenantId, leadId = null) {
  const params = { tenant_id: tenantId }
  if (leadId) params.lead_id = leadId
  const query = new URLSearchParams(params).toString()
  const res = await fetch(`${API_BASE_URL}/crm/acquisition-costs?${query}`, { headers: _headers() })
  return _handleRes(res)
}

export async function deleteAcquisitionCost(costId, tenantId) {
  const res = await fetch(`${API_BASE_URL}/crm/acquisition-costs/${costId}?tenant_id=${tenantId}`, {
    method: 'DELETE',
    headers: _headers()
  })
  return _handleRes(res)
}

export async function updateAcquisitionCost(costId, payload) {
  const res = await fetch(`${API_BASE_URL}/crm/acquisition-costs/${costId}`, {
    method: 'PUT',
    headers: _headers(),
    body: JSON.stringify(payload)
  })
  return _handleRes(res)
}


