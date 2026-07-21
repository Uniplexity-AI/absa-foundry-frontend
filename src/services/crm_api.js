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

export async function getLeads(params = {}) {
  const clean = _sanitizeParams(params)
  const query = new URLSearchParams(clean).toString()
  const res = await fetch(`${API_BASE_URL}/crm/leads?${query}`, { headers: _headers() })
  return _handleRes(res)
}

export async function getLead(leadId) {
  const res = await fetch(`${API_BASE_URL}/crm/leads/${leadId}`, { headers: _headers() })
  return _handleRes(res)
}

export async function getLeadNotes(leadId) {
  const res = await fetch(`${API_BASE_URL}/crm/leads/${leadId}/notes`, { headers: _headers() })
  return _handleRes(res)
}

export async function getLeadEmails(leadId) {
  const res = await fetch(`${API_BASE_URL}/crm/leads/${leadId}/emails`, { headers: _headers() })
  return _handleRes(res)
}

export async function getLeadAttachments(leadId) {
  const res = await fetch(`${API_BASE_URL}/crm/leads/${leadId}/attachments`, { headers: _headers() })
  return _handleRes(res)
}

export async function getLeadCampaigns(leadId) {
  const res = await fetch(`${API_BASE_URL}/crm/leads/${leadId}/campaigns`, { headers: _headers() })
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

export async function updateLead(leadId, payload) {
  const res = await fetch(`${API_BASE_URL}/crm/leads/${leadId}`, {
    method: 'PUT',
    headers: _headers(),
    body: JSON.stringify(payload)
  })
  return _handleRes(res)
}

export async function deleteLead(leadId) {
  const res = await fetch(`${API_BASE_URL}/crm/leads/${leadId}`, {
    method: 'DELETE',
    headers: _headers()
  })
  const data = await _handleRes(res)
  try {
    await logLeadActivity(leadId, { action: 'deleted', notes: '' })
  } catch (e) {
    console.warn('Failed to log lead deletion activity', e)
  }
  return data
}

// Customers
export async function getCustomers() {
  const res = await fetch(`${API_BASE_URL}/crm/customers`, { headers: _headers() })
  return _handleRes(res)
}
export async function createCustomer(payload) {
  const res = await fetch(`${API_BASE_URL}/crm/customers`, { method: 'POST', headers: _headers(), body: JSON.stringify(payload) })
  return _handleRes(res)
}
export async function updateCustomer(customerId, payload) {
  const res = await fetch(`${API_BASE_URL}/crm/customers/${customerId}`, { method: 'PUT', headers: _headers(), body: JSON.stringify(payload) })
  return _handleRes(res)
}
export async function deleteCustomer(customerId) {
  const res = await fetch(`${API_BASE_URL}/crm/customers/${customerId}`, { method: 'DELETE', headers: _headers() })
  return _handleRes(res)
}

// Accounts & Conversion helpers
export async function createAccount(payload) {
  const res = await fetch(`${API_BASE_URL}/crm/accounts`, { method: 'POST', headers: _headers(), body: JSON.stringify(payload) })
  return _handleRes(res)
}

export async function createContact(payload) {
  const res = await fetch(`${API_BASE_URL}/crm/contacts`, { method: 'POST', headers: _headers(), body: JSON.stringify(payload) })
  return _handleRes(res)
}

export async function convertLead(leadId, options = {}) {
  const payload = Object.assign({ leadId }, options || {})
  const res = await fetch(`${API_BASE_URL}/crm/leads/${leadId}/convert`, { method: 'POST', headers: _headers(), body: JSON.stringify(payload) })
  return _handleRes(res)
}

// Communications
export async function getCommunications(params = {}) {
  const clean = _sanitizeParams(params)
  const q = new URLSearchParams({ ...clean }).toString()
  const res = await fetch(`${API_BASE_URL}/crm/communications?${q}`, { headers: _headers() })
  return _handleRes(res)
}
export async function createCommunication(payload) {
  const res = await fetch(`${API_BASE_URL}/crm/communications`, { method: 'POST', headers: _headers(), body: JSON.stringify(payload) })
  const data = await _handleRes(res)
  try {
    if (payload.contactId) {
      // Log communication as activity for the contact (lead)
      await logLeadActivity(payload.contactId, { action: `communication:${payload.type}`, notes: payload.message || payload.subject || '' })
    }
  } catch (e) {
    console.warn('Failed to log communication activity', e)
  }
  return data
}

// Convenience WhatsApp helpers
export async function startWhatsAppText({ related_type, related_id, name, phone, text }) {
  const payload = { related_type, related_id, contactName: name, type: 'whatsapp', subtype: 'text', message: text || `WhatsApp message to ${name}`, phone }
  try { createCommunication(payload).catch(() => { }) } catch { }
  const waPhone = (phone || '').replace(/[^+0-9]/g, '').replace(/^\+/, '')
  const url = waPhone ? `https://wa.me/${encodeURIComponent(waPhone)}?text=${encodeURIComponent(text || '')}` : `https://web.whatsapp.com/send?text=${encodeURIComponent(text || '')}`
  window.open(url, '_blank')
}

export async function startWhatsAppAudioCall({ related_type, related_id, name, phone }) {
  const payload = { related_type, related_id, contactName: name, type: 'whatsapp', subtype: 'audio_call', message: `WhatsApp audio call to ${name}`, phone }
  try { createCommunication(payload).catch(() => { }) } catch { }
  // Open chat as a proxy to initiate the call within WhatsApp UI
  const waPhone = (phone || '').replace(/[^+0-9]/g, '').replace(/^\+/, '')
  const url = waPhone ? `https://wa.me/${encodeURIComponent(waPhone)}` : `https://web.whatsapp.com/`
  window.open(url, '_blank')
}

export async function startWhatsAppVideoCall({ related_type, related_id, name, phone }) {
  const payload = { related_type, related_id, contactName: name, type: 'whatsapp', subtype: 'video_call', message: `WhatsApp video call to ${name}`, phone }
  try { createCommunication(payload).catch(() => { }) } catch { }
  const waPhone = (phone || '').replace(/[^+0-9]/g, '').replace(/^\+/, '')
  const url = waPhone ? `https://wa.me/${encodeURIComponent(waPhone)}` : `https://web.whatsapp.com/`
  window.open(url, '_blank')
}
export async function deleteCommunication(commId) {
  const res = await fetch(`${API_BASE_URL}/crm/communications/${commId}`, { method: 'DELETE', headers: _headers() })
  return _handleRes(res)
}

export async function patchCommunication(commId, payload) {
  const res = await fetch(`${API_BASE_URL}/crm/communications/${commId}`, {
    method: 'PATCH',
    headers: _headers(),
    body: JSON.stringify(payload || {})
  })
  return _handleRes(res)
}

export async function getCommunicationNotes(commId) {
  const res = await fetch(`${API_BASE_URL}/crm/communications/${commId}/notes`, { headers: _headers() })
  return _handleRes(res)
}

export async function addCommunicationNote(commId, text) {
  const res = await fetch(`${API_BASE_URL}/crm/communications/${commId}/notes`, {
    method: 'POST', headers: _headers(), body: JSON.stringify({ text })
  })
  return _handleRes(res)
}

// Lead activities
export async function getLeadActivities(leadId) {
  const res = await fetch(`${API_BASE_URL}/crm/leads/${leadId}/activities`, { headers: _headers() })
  return _handleRes(res)
}

export async function logLeadActivity(leadId, payload) {
  const res = await fetch(`${API_BASE_URL}/crm/leads/${leadId}/activities`, { method: 'POST', headers: _headers(), body: JSON.stringify(payload) })
  return _handleRes(res)
}

// Notifications
export async function getNotifications(params = {}) {
  const clean = _sanitizeParams(params)
  const query = new URLSearchParams({ ...clean }).toString()
  const res = await fetch(`${API_BASE_URL}/notifications?${query}`, { headers: _headers() })
  return _handleRes(res)
}

export async function getLeadNotifications(leadId) {
  const res = await fetch(`${API_BASE_URL}/notifications?lead_id=${encodeURIComponent(leadId)}&category=crm`, { headers: _headers() })
  return _handleRes(res)
}

export async function markNotificationRead(notifId) {
  const res = await fetch(`${API_BASE_URL}/notifications/${notifId}/read`, {
    method: 'PUT', headers: _headers()
  })
  return _handleRes(res)
}

export async function markAllNotificationsRead() {
  const res = await fetch(`${API_BASE_URL}/notifications/mark-read`, {
    method: 'PUT', headers: _headers()
  })
  return _handleRes(res)
}

export async function dismissNotification(notifId) {
  const res = await fetch(`${API_BASE_URL}/notifications/${notifId}/dismiss`, {
    method: 'POST', headers: _headers()
  })
  return _handleRes(res)
}

export async function dismissAllNotifications() {
  const res = await fetch(`${API_BASE_URL}/notifications`, {
    method: 'DELETE', headers: _headers()
  })
  return _handleRes(res)
}

export async function scanCrmNotifications() {
  const res = await fetch(`${API_BASE_URL}/crm/notifications/scan`, {
    method: 'POST', headers: _headers()
  })
  return _handleRes(res)
}

// Module metadata & generic records API (for dynamic module UI)
export async function getModuleMetadata() {
  const res = await fetch(`${API_BASE_URL}/metadata/modules`, { headers: _headers() })
  return _handleRes(res)
}

export async function getModuleRecords(moduleName, params = {}) {
  const clean = _sanitizeParams(params)
  const query = new URLSearchParams({ module: moduleName, ...clean }).toString()
  const res = await fetch(`${API_BASE_URL}/records?${query}`, { headers: _headers() })
  return _handleRes(res)
}

// CRM Metadata (Pipeline Stages)
export async function getCRMMetadata() {
  const res = await fetch(`${API_BASE_URL}/crm/metadata`, { headers: _headers() })
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
export async function bulkImportLeads(leadsData) {
  const res = await fetch(`${API_BASE_URL}/crm/leads/import`, {
    method: 'POST',
    headers: _headers(),
    body: JSON.stringify(leadsData)
  })
  return _handleRes(res)
}

export async function exportLeads(limit = 10000) {
  const res = await fetch(`${API_BASE_URL}/crm/leads/export?limit=${limit}`, {
    headers: _headers()
  })
  return _handleRes(res)
}

export async function fetchLeads(params = {}) {
  return getLeads(params)
}

// ============================================================================
// CONTACTS API
// ============================================================================

export async function getContacts(params = {}) {
  const clean = _sanitizeParams(params)
  const query = new URLSearchParams({ ...clean }).toString()
  const res = await fetch(`${API_BASE_URL}/crm/contacts?${query}`, { headers: _headers() })
  return _handleRes(res)
}

export async function getContact(contactId) {
  const res = await fetch(`${API_BASE_URL}/crm/contacts/${contactId}`, { headers: _headers() })
  return _handleRes(res)
}

export async function updateContact(contactId, payload) {
  const body = Object.assign({}, payload || {})
  const res = await fetch(`${API_BASE_URL}/crm/contacts/${contactId}`, {
    method: 'PUT',
    headers: _headers(),
    body: JSON.stringify(body)
  })
  return _handleRes(res)
}

export async function deleteContact(contactId) {
  const res = await fetch(`${API_BASE_URL}/crm/contacts/${contactId}`, {
    method: 'DELETE',
    headers: _headers()
  })
  return _handleRes(res)
}

export async function getContactActivities(contactId) {
  const res = await fetch(`${API_BASE_URL}/crm/activities?related_type=contact&related_id=${contactId}`, {
    headers: _headers()
  })
  return _handleRes(res)
}

// ============================================================================
// ACCOUNTS API
// ============================================================================

export async function getAccounts(params = {}) {
  const clean = _sanitizeParams(params)
  const query = new URLSearchParams({ ...clean }).toString()
  const res = await fetch(`${API_BASE_URL}/crm/accounts?${query}`, { headers: _headers() })
  return _handleRes(res)
}

export async function getAccount(accountId) {
  const res = await fetch(`${API_BASE_URL}/crm/accounts/${accountId}`, { headers: _headers() })
  return _handleRes(res)
}

export async function updateAccount(accountId, payload) {
  const body = Object.assign({}, payload || {})
  const res = await fetch(`${API_BASE_URL}/crm/accounts/${accountId}`, {
    method: 'PUT',
    headers: _headers(),
    body: JSON.stringify(body)
  })
  return _handleRes(res)
}

export async function deleteAccount(accountId) {
  const res = await fetch(`${API_BASE_URL}/crm/accounts/${accountId}`, {
    method: 'DELETE',
    headers: _headers()
  })
  return _handleRes(res)
}

export async function getAccountContacts(accountId) {
  const res = await fetch(`${API_BASE_URL}/crm/accounts/${accountId}/contacts`, {
    headers: _headers()
  })
  return _handleRes(res)
}

export async function getAccountActivities(accountId) {
  const res = await fetch(`${API_BASE_URL}/crm/activities?related_type=account&related_id=${accountId}`, {
    headers: _headers()
  })
  return _handleRes(res)
}

// ============================================================================
// DEALS API
// ============================================================================

export async function getDeals(params = {}) {
  const clean = _sanitizeParams(params)
  const query = new URLSearchParams({ ...clean }).toString()
  const res = await fetch(`${API_BASE_URL}/crm/deals?${query}`, { headers: _headers() })
  return _handleRes(res)
}

export async function getDeal(dealId) {
  const res = await fetch(`${API_BASE_URL}/crm/deals/${dealId}`, { headers: _headers() })
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

export async function updateDeal(dealId, payload) {
  const res = await fetch(`${API_BASE_URL}/crm/deals/${dealId}`, {
    method: 'PUT',
    headers: _headers(),
    body: JSON.stringify(payload)
  })
  return _handleRes(res)
}

export async function deleteDeal(dealId) {
  const res = await fetch(`${API_BASE_URL}/crm/deals/${dealId}`, {
    method: 'DELETE',
    headers: _headers()
  })
  return _handleRes(res)
}

export async function getDealActivities(dealId) {
  const res = await fetch(`${API_BASE_URL}/crm/activities?related_type=deal&related_id=${dealId}`, {
    headers: _headers()
  })
  return _handleRes(res)
}

export async function getAccountDeals(accountId, params = {}) {
  const clean = _sanitizeParams(params)
  const query = new URLSearchParams({ accountId, per_page: 200, ...clean }).toString()
  const res = await fetch(`${API_BASE_URL}/crm/deals?${query}`, { headers: _headers() })
  return _handleRes(res)
}

export async function getMeetings(params = {}) {
  const clean = _sanitizeParams(params)
  const query = new URLSearchParams({ ...clean }).toString()
  const res = await fetch(`${API_BASE_URL}/crm/meetings/list?${query}`, { headers: _headers() })
  return _handleRes(res)
}

// ============================================================================
// ACTIVITIES API
// ============================================================================

export async function getActivities(params = {}) {
  const clean = _sanitizeParams(params)
  const query = new URLSearchParams({ ...clean }).toString()
  const res = await fetch(`${API_BASE_URL}/crm/activities?${query}`, { headers: _headers() })
  return _handleRes(res)
}

// ============================================================================
// VISITS API
// ============================================================================

export async function getVisits(params = {}) {
  const clean = _sanitizeParams(params)
  const query = new URLSearchParams({ ...clean }).toString()
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

export async function patchVisit(visitId, payload) {
  const res = await fetch(`${API_BASE_URL}/crm/visits/${visitId}`, {
    method: 'PATCH',
    headers: _headers(),
    body: JSON.stringify(payload || {})
  })
  return _handleRes(res)
}

export async function addVisitNote(visitId, text) {
  const res = await fetch(`${API_BASE_URL}/crm/visits/${visitId}/notes`, {
    method: 'POST',
    headers: _headers(),
    body: JSON.stringify({ text })
  })
  return _handleRes(res)
}

export async function getVisitNotes(visitId) {
  const res = await fetch(`${API_BASE_URL}/crm/visits/${visitId}/notes`, { headers: _headers() })
  return _handleRes(res)
}

export async function deleteVisit(visitId) {
  const res = await fetch(`${API_BASE_URL}/crm/visits/${visitId}`, {
    method: 'DELETE',
    headers: _headers()
  })
  return _handleRes(res)
}

// Bulk Upload for Leads
export async function uploadLeadsBulkFile(formData) {
  const token = localStorage.getItem('token') || ''
  const res = await fetch(`${API_BASE_URL}/crm/leads/bulk-upload-file`, {
    method: 'POST',
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
      // Don't set Content-Type - browser will set it with boundary for multipart/form-data
    },
    body: formData
  })
  return _handleRes(res)
}

export async function processLeadsBulkUpload(payload) {
  const res = await fetch(`${API_BASE_URL}/crm/leads/bulk-upload-process`, {
    method: 'POST',
    headers: _headers(),
    body: JSON.stringify(payload)
  })
  return _handleRes(res)
}

export async function downloadLeadTemplate() {
  const token = localStorage.getItem('token') || ''
  const res = await fetch(`${API_BASE_URL}/crm/leads/download-template`, {
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
export async function deleteMeeting(meetingId) {
  const token = localStorage.getItem('token') || '';
  const response = await fetch(`${API_BASE_URL}/crm/meetings/${meetingId}`, {
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

export async function createLeadNote(leadId, payload) {
  const res = await fetch(`${API_BASE_URL}/crm/leads/${leadId}/notes`, {
    method: 'POST',
    headers: _headers(),
    body: JSON.stringify(payload)
  })
  return _handleRes(res)
}

export async function deleteLeadNote(noteId) {
  const res = await fetch(`${API_BASE_URL}/crm/notes/${noteId}`, {
    method: 'DELETE',
    headers: _headers()
  })
  return _handleRes(res)
}

export async function deleteLeadActivity(activityId) {
  const res = await fetch(`${API_BASE_URL}/crm/activities/${activityId}`, {
    method: 'DELETE',
    headers: _headers()
  })
  return _handleRes(res)
}

export async function logAccountActivity(accountId, payload) {
  const res = await fetch(`${API_BASE_URL}/crm/activities`, {
    method: 'POST',
    headers: _headers(),
    body: JSON.stringify({ ...payload, related_type: 'account', related_id: accountId })
  })
  return _handleRes(res)
}

export async function deleteAccountActivity(activityId) {
  const res = await fetch(`${API_BASE_URL}/crm/activities/${activityId}`, {
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

export async function getStats(params = {}) {
  const clean = _sanitizeParams(params)
  const query = new URLSearchParams({ ...clean }).toString()
  const res = await fetch(`${API_BASE_URL}/crm/stats?${query}`, { headers: _headers() })
  return _handleRes(res)
}

export async function getTeamPerformance(params = {}) {
  const clean = _sanitizeParams(params)
  const query = new URLSearchParams({ ...clean }).toString()
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

export async function getAcquisitionCosts(leadId = null) {
  const params = {  }
  if (leadId) params.lead_id = leadId
  const query = new URLSearchParams(params).toString()
  const res = await fetch(`${API_BASE_URL}/crm/acquisition-costs?${query}`, { headers: _headers() })
  return _handleRes(res)
}

export async function deleteAcquisitionCost(costId) {
  const res = await fetch(`${API_BASE_URL}/crm/acquisition-costs/${costId}`, {
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


