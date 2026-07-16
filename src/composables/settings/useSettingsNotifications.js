import { ref, computed, reactive } from 'vue'
import { toast } from 'vue3-toastify'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx'
import { useSettingsBase } from './useSettingsBase'

export function useSettingsNotifications() {
  const { getTenantId, API_BASE_URL, openSettingsConfirm,
    notificationsLoading: loading } = useSettingsBase()

  const notificationsLoading = loading
  const notifications = ref([])
  const autoSendEnabled = ref(false)
  const whatsAppNumber = ref('')
  const notificationEmail = ref('')
  const selectedCategory = ref('all')
  const filterEquipment = ref(false)
  const filterProduct = ref(false)
  const filterLeads = ref(false)
  const scheduleType = ref('immediate')
  const scheduleTime = ref('09:00')
  const scheduleDay = ref('1')
  const testSendResults = ref(null)
  const showTestResults = ref(false)
  const stockAlerts = ref([])
  const channelWhatsapp = ref(true)
  const channelEmail = ref(true)
  const notifSearch = ref('')
  const notifSeverity = ref('all')
  const collapsedNotifCategories = reactive({})
  const expandedNotifs = reactive({})
  const inventoryItems = ref([])
  const showItemSettingsPanel = ref(false)
  const selectedItem = ref(null)
  const selectedItemSettings = ref({ notify_low: true, notify_critical: true, notify_empty: true })
  const globalLowStockThreshold = ref(10)
  const globalCriticalStockThreshold = ref(5)

  const notificationCount = computed(() => notifications.value.length)

  const NOTIF_CATEGORY_META = {
    inventory: { label: 'Inventory', description: 'Stock, equipment & product alerts', icon: 'fas fa-boxes', headerBg: 'bg-blue-50', iconWrap: 'bg-blue-100 text-blue-700' },
    crm: { label: 'CRM', description: 'Leads, customers & follow-ups', icon: 'fas fa-users', headerBg: 'bg-purple-50', iconWrap: 'bg-purple-100 text-purple-700' },
    payments: { label: 'Payments', description: 'Invoices, receipts & due amounts', icon: 'fas fa-file-invoice-dollar', headerBg: 'bg-emerald-50', iconWrap: 'bg-emerald-100 text-emerald-700' },
    system: { label: 'System', description: 'Background jobs & integrations', icon: 'fas fa-cog', headerBg: 'bg-gray-50', iconWrap: 'bg-gray-100 text-gray-700' },
    general: { label: 'General', description: 'Uncategorised notifications', icon: 'fas fa-bell', headerBg: 'bg-gray-50', iconWrap: 'bg-gray-100 text-gray-700' },
  }

  function clearAdvancedFilters() {
    filterEquipment.value = false; filterProduct.value = false; filterLeads.value = false
  }

  function detectCategory(note) {
    const text = (note.title + ' ' + (note.message || '')).toLowerCase()
    if (text.includes('stock') || text.includes('inventory') || text.includes('item')) return 'inventory'
    if (text.includes('payment') || text.includes('invoice') || text.includes('receipt')) return 'payments'
    if (text.includes('customer') || text.includes('client')) return 'crm'
    return 'general'
  }

  function alertIsProduct(txt) {
    return txt.includes('stock') || txt.includes('level') || txt.includes('qty') || txt.includes('quant') || txt.includes('item') || txt.includes('product')
  }

  const groupedNotifications = computed(() => {
    const groups = {}
    const order = ['inventory', 'crm', 'payments', 'system', 'general']
    const hasFilter = filterEquipment.value || filterProduct.value || filterLeads.value
    notifications.value.forEach(note => {
      let cat = note.category || detectCategory(note) || 'general'
      cat = cat.toLowerCase()
      if (hasFilter) {
        const txt = (note.title + ' ' + (note.message || '') + ' ' + (note.details || '')).toLowerCase()
        let match = false
        if (filterEquipment.value && cat === 'inventory' && (txt.includes('machine') || txt.includes('repair') || txt.includes('equipment') || txt.includes('maintenance'))) match = true
        if (filterProduct.value && cat === 'inventory' && alertIsProduct(txt)) match = true
        if (filterLeads.value && cat === 'crm') match = true
        if (!match) return
      }
      if (!groups[cat]) groups[cat] = []
      groups[cat].push(note)
    })
    return Object.keys(groups).sort((a, b) => {
      const iA = order.indexOf(a), iB = order.indexOf(b)
      if (iA !== -1 && iB !== -1) return iA - iB
      if (iA !== -1) return -1; if (iB !== -1) return 1
      return a.localeCompare(b)
    }).reduce((o, k) => { o[k] = groups[k]; return o }, {})
  })

  const filteredGroupedNotifications = computed(() => {
    const q = (notifSearch.value || '').trim().toLowerCase()
    const sev = (notifSeverity.value || 'all').toLowerCase()
    const groups = groupedNotifications.value || {}
    const out = {}
    for (const [cat, items] of Object.entries(groups)) {
      const filtered = (items || []).filter(n => {
        if (sev !== 'all' && String(n.status || '').toLowerCase() !== sev) return false
        if (!q) return true
        const hay = `${n.title || ''} ${n.message || ''} ${n.details || ''} ${n.description || ''} ${n.source || ''}`.toLowerCase()
        return hay.includes(q)
      })
      if (filtered.length) out[cat] = filtered
    }
    return out
  })

  function getCategoryIcon(category) {
    if (!category) return 'fas fa-bell'
    switch (category.toLowerCase()) {
      case 'inventory': return 'fas fa-boxes'
      case 'crm': return 'fas fa-users'
      case 'payments': return 'fas fa-file-invoice-dollar'
      case 'system': return 'fas fa-cog'
      default: return 'fas fa-bell'
    }
  }

  function getNotifStatusClass(status) {
    if (!status) return 'bg-gray-100 text-gray-600'
    switch (status.toLowerCase()) {
      case 'critical': case 'empty': case 'expired': return 'bg-red-100 text-red-700'
      case 'warning': case 'low': case 'expiring': return 'bg-yellow-100 text-yellow-700'
      case 'success': return 'bg-green-100 text-green-700'
      case 'info': return 'bg-blue-100 text-blue-700'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  function getCategoryMeta(c) {
    const key = String(c || 'general').toLowerCase()
    return NOTIF_CATEGORY_META[key] || { label: key.charAt(0).toUpperCase() + key.slice(1), description: 'Notifications', icon: 'fas fa-bell', headerBg: 'bg-gray-50', iconWrap: 'bg-gray-100 text-gray-700' }
  }

  function getSeverityBorder(status) {
    switch (String(status || '').toLowerCase()) {
      case 'critical': case 'empty': case 'expired': return 'border-red-400'
      case 'warning': case 'low': case 'expiring': return 'border-amber-400'
      case 'success': return 'border-emerald-400'
      case 'info': return 'border-blue-400'
      default: return 'border-gray-200'
    }
  }

  function getSeverityDot(status) {
    switch (String(status || '').toLowerCase()) {
      case 'critical': case 'empty': case 'expired': return 'bg-red-500'
      case 'warning': case 'low': case 'expiring': return 'bg-amber-500'
      case 'success': return 'bg-emerald-500'
      case 'info': return 'bg-blue-500'
      default: return 'bg-gray-300'
    }
  }

  function countBySeverity(items, sev) {
    const s = String(sev).toLowerCase()
    return (items || []).filter(n => String(n.status || '').toLowerCase() === s).length
  }

  function toggleNotifCategory(category) { collapsedNotifCategories[category] = !collapsedNotifCategories[category] }
  function notifKey(notif) { return String(notif._id || notif.id || notif.title || notif.message || '') }
  function isNotifExpanded(notif) { return !!expandedNotifs[notifKey(notif)] }
  function toggleNotifExpanded(notif) { const k = notifKey(notif); expandedNotifs[k] = !expandedNotifs[k] }
  function getNotifDetailText(notif) { return notif.details || notif.description || notif.message || '' }
  function truncateText(str, n = 80) { if (!str) return ''; const s = String(str); return s.length > n ? s.slice(0, n).trim() + '…' : s }

  function formatNotifRelative(date) {
    if (!date) return '—'
    const d = new Date(date)
    if (isNaN(d.getTime())) return '—'
    const diff = Date.now() - d.getTime()
    const min = Math.floor(diff / 60000)
    if (min < 1) return 'just now'; if (min < 60) return `${min}m ago`
    const hr = Math.floor(min / 60); if (hr < 24) return `${hr}h ago`
    const day = Math.floor(hr / 24); if (day < 30) return `${day}d ago`
    const mo = Math.floor(day / 30); if (mo < 12) return `${mo}mo ago`
    return `${Math.floor(mo / 12)}y ago`
  }

  function formatDate(dateString) {
    if (!dateString) return '—'
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString
    return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date)
  }

  async function loadNotifications() {
    try {
      const tenantId = getTenantId()
      if (!tenantId) { notifications.value = []; return }
      let url = `${API_BASE_URL}/notifications?tenant_id=${tenantId}`
      if (selectedCategory.value && selectedCategory.value !== 'all') url += `&category=${encodeURIComponent(selectedCategory.value)}`
      const res = await fetch(url, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      if (!res.ok) { notifications.value = []; return }
      const data = await res.json().catch(() => [])
      notifications.value = Array.isArray(data) ? data : (data?.notifications || data?.items || [])
      try {
        if ((!notifications.value || notifications.value.length === 0)) {
          const sres = await fetch(`${API_BASE_URL}/reports/inventory/summary?tenant_id=${tenantId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          })
          if (sres.ok) {
            const summary = await sres.json().catch(() => null)
            if (summary) {
              const synth = []
              if (summary.lowStockCount && summary.lowStockCount > 0) synth.push({ _id: `synth-low-${tenantId}`, title: `${summary.lowStockCount} items low in stock`, message: `You have ${summary.lowStockCount} items below reorder threshold.`, status: 'Low', details: '' })
              if (summary.criticalStockCount && summary.criticalStockCount > 0) synth.push({ _id: `synth-critical-${tenantId}`, title: `${summary.criticalStockCount} items critically low`, message: `You have ${summary.criticalStockCount} items at or below critical stock levels.`, status: 'Critical', details: '' })
              if (summary.emptyStockCount && summary.emptyStockCount > 0) synth.push({ _id: `synth-empty-${tenantId}`, title: `${summary.emptyStockCount} items out of stock`, message: `You have ${summary.emptyStockCount} items out of stock.`, status: 'Empty', details: '' })
              if (synth.length) notifications.value = synth
            }
          }
        }
      } catch (e) { console.warn('Failed to fetch inventory summary for synthetic notifications', e) }
    } catch (err) { console.error('loadNotifications error', err); notifications.value = [] }
  }

  async function loadStockAlerts() {
    try {
      const tenantId = getTenantId()
      if (!tenantId) return
      const res = await fetch(`${API_BASE_URL}/notifications?tenant_id=${tenantId}&category=inventory`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      if (!res.ok) return
      const data = await res.json().catch(() => [])
      const items = Array.isArray(data) ? data : (data?.notifications || data?.items || [])
      if (selectedCategory.value === 'all') {
        const nonInventory = notifications.value.filter(n => (n.category || 'general') !== 'inventory')
        notifications.value = [...items, ...nonInventory]
      } else { notifications.value = items }
    } catch (err) { console.error('loadStockAlerts error', err) }
  }

  async function dismissNotification(id) {
    if (!id) return
    if (String(id).startsWith('synth-')) { notifications.value = notifications.value.filter(n => (n._id || n.id) !== id); return }
    try {
      const tenantId = getTenantId()
      if (!tenantId) return
      const res = await fetch(`${API_BASE_URL}/notifications/${id}?tenant_id=${tenantId}`, {
        method: 'DELETE', headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err?.detail || 'Failed to dismiss notification') }
      notifications.value = notifications.value.filter(n => (n._id || n.id) !== id)
    } catch (err) { console.error('dismissNotification error', err); toast.error('Failed to dismiss notification') }
  }

  function resolveNotification(id) {
    const note = notifications.value.find(n => (n._id || n.id) === id)
    if (!note) return
    const cat = (note.category || detectCategory(note)).toLowerCase()
    const txt = (note.title + ' ' + (note.message || '')).toLowerCase()
    let confirmMsg = "Has this issue been resolved?"
    if (cat === 'inventory') {
      if (txt.includes('stock') || txt.includes('low') || txt.includes('critical')) confirmMsg = "Action Verification: Have you officially RESTOCKED this item?\n\nClick OK only if the stock level has been updated."
      else confirmMsg = "Action Verification: Has the maintenance or equipment issue been resolved?"
    } else if (cat === 'crm') { confirmMsg = "Action Verification: Have you FOLLOWED UP with this lead/customer?\n\nClick OK to confirm follow-up." }
    openSettingsConfirm({ title: 'Resolve Notification', message: confirmMsg, variant: 'info', confirmLabel: 'Resolve', onConfirm: () => dismissNotification(id) })
  }

  async function dismissAllNotifications() {
    try {
      const tenantId = getTenantId()
      if (!tenantId) return toast.error('Tenant missing')
      const res = await fetch(`${API_BASE_URL}/notifications?tenant_id=${tenantId}`, {
        method: 'DELETE', headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      if (!res.ok) throw new Error('Failed to dismiss all')
      const payload = await res.json().catch(() => ({}))
      notifications.value = []
      toast.success(`Dismissed ${payload.count || 0} notifications`)
    } catch (err) { console.error('dismissAllNotifications error', err); toast.error('Failed to dismiss all notifications') }
  }

  async function saveNotificationSettings() {
    try {
      notificationsLoading.value = true
      const tenantId = getTenantId()
      if (!tenantId) return toast.error('Tenant missing')
      const channels = []
      if (channelWhatsapp.value) channels.push('whatsapp')
      if (channelEmail.value) channels.push('email')
      const schedule = { type: scheduleType.value, time: scheduleTime.value, day: scheduleDay.value }
      const url = `${API_BASE_URL}/notifications/settings?tenant_id=${tenantId}&auto_send=${autoSendEnabled.value}&whatsapp=${encodeURIComponent(whatsAppNumber.value || '')}&email=${encodeURIComponent(notificationEmail.value || '')}&channels=${encodeURIComponent(channels.join(','))}&schedule_type=${encodeURIComponent(schedule.type)}&schedule_time=${encodeURIComponent(schedule.time)}&schedule_day=${encodeURIComponent(schedule.day)}`
      const res = await fetch(url, { method: 'PUT', headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err?.detail || 'Failed to save settings') }
      toast.success('Notification settings saved')
      await loadNotifications()
    } catch (err) { console.error('saveNotificationSettings error', err); toast.error('Failed to save notification settings') }
    finally { notificationsLoading.value = false }
  }

  async function sendTest(method = null) {
    try {
      const tenantId = getTenantId()
      if (!tenantId) return toast.error('Tenant missing')
      let url = `${API_BASE_URL}/notifications/send-test?tenant_id=${tenantId}`
      if (method) url += `&method=${encodeURIComponent(method)}`
      const channels = []
      if (channelWhatsapp.value) channels.push('whatsapp')
      if (channelEmail.value) channels.push('email')
      if (channels.length) url += `&channels=${encodeURIComponent(channels.join(','))}`
      const res = await fetch(url, { method: 'POST', headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.detail || 'Failed to send test notification') }
      const payload = await res.json()
      testSendResults.value = payload.results || {}
      showTestResults.value = true
    } catch (err) { console.error('sendTest error', err); toast.error('Failed to send test notification: ' + (err.message || err)) }
  }

  async function fetchInventoryForSettings() {
    try {
      const tenantId = getTenantId()
      const res = await fetch(`${API_BASE_URL}/inventory/?tenant_id=${tenantId}`)
      if (!res.ok) throw new Error('Failed to fetch inventory')
      const data = await res.json()
      inventoryItems.value = Array.isArray(data) ? data : (data.items || data.data || [])
    } catch (err) { console.error('Error fetching inventory for item settings:', err); inventoryItems.value = [] }
  }

  function openItemSettingsPanel() {
    showItemSettingsPanel.value = true
    if (!inventoryItems.value || inventoryItems.value.length === 0) fetchInventoryForSettings()
  }

  async function openItemSettings(item) {
    selectedItem.value = item
    try {
      const tenantId = getTenantId()
      const res = await fetch(`${API_BASE_URL}/notifications/settings/items?tenant_id=${tenantId}&item_id=${item._id || item.id}`)
      if (!res.ok) throw new Error('Failed to fetch item settings')
      const data = await res.json()
      selectedItemSettings.value = { notify_low: data.notify_low !== undefined ? data.notify_low : true, notify_critical: data.notify_critical !== undefined ? data.notify_critical : true, notify_empty: data.notify_empty !== undefined ? data.notify_empty : true }
    } catch (err) { console.error('Error fetching item settings:', err); selectedItemSettings.value = { notify_low: true, notify_critical: true, notify_empty: true } }
  }

  async function saveItemSettings() {
    if (!selectedItem.value) return
    try {
      const tenantId = getTenantId()
      const itemId = selectedItem.value._id || selectedItem.value.id
      const url = `${API_BASE_URL}/notifications/settings/item/${itemId}?tenant_id=${tenantId}&notify_low=${selectedItemSettings.value.notify_low}&notify_critical=${selectedItemSettings.value.notify_critical}&notify_empty=${selectedItemSettings.value.notify_empty}`
      const res = await fetch(url, { method: 'PUT' })
      if (!res.ok) throw new Error('Failed to save item settings')
      await res.json()
      toast.success('Item notification settings saved')
      selectedItem.value = null
      showItemSettingsPanel.value = false
      await loadNotifications()
    } catch (err) { console.error('Error saving item settings:', err); toast.error('Failed to save item settings') }
  }

  async function fetchGlobalStockSettings() {
    try {
      const tenantId = getTenantId()
      const response = await fetch(`${API_BASE_URL}/inventory/stock-settings?tenant_id=${tenantId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      if (!response.ok) throw new Error('Failed to fetch global stock settings')
      const data = await response.json()
      globalLowStockThreshold.value = data.lowStockThreshold ?? 10
      globalCriticalStockThreshold.value = data.criticalStockThreshold ?? 5
    } catch (error) { console.error('Error fetching global stock settings:', error) }
  }

  async function saveGlobalStockSettings() {
    try {
      const tenantId = getTenantId()
      const url = `${API_BASE_URL}/inventory/stock-settings?tenant_id=${tenantId}&lowStockThreshold=${globalLowStockThreshold.value}&criticalStockThreshold=${globalCriticalStockThreshold.value}`
      const response = await fetch(url, { method: 'PUT', headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      if (!response.ok) throw new Error('Failed to save global stock settings')
      toast.success('Global stock level settings saved!')
    } catch (error) { console.error('Error saving global stock settings:', error); toast.error('Failed to save global stock level settings') }
  }

  function exportNotificationsExcel() {
    const wb = XLSX.utils.book_new()
    const allData = []
    for (const [category, items] of Object.entries(groupedNotifications.value)) {
      items.forEach(n => { allData.push({ Category: category.charAt(0).toUpperCase() + category.slice(1), Message: n.title || n.message, Details: n.details || '', Date: n.date || n.created_at || '-', Status: n.status || 'Info' }) })
    }
    const ws = XLSX.utils.json_to_sheet(allData)
    ws['!cols'] = Object.keys(allData[0] || {}).map(k => ({ wch: 20 }))
    XLSX.utils.book_append_sheet(wb, ws, 'Notifications')
    XLSX.writeFile(wb, 'notifications_report.xlsx')
  }

  function exportNotificationsPDF() {
    const doc = new jsPDF()
    const allData = []
    for (const [category, items] of Object.entries(groupedNotifications.value)) {
      items.forEach(n => { allData.push([category.charAt(0).toUpperCase() + category.slice(1), n.title || n.message || '', n.details || '', n.date || n.created_at || '-', n.status || 'Info']) })
    }
    doc.setFontSize(18); doc.setFont(undefined, 'bold'); doc.text('Notifications Report', 14, 20)
    doc.setFontSize(10); doc.setFont(undefined, 'normal'); doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 28)
    autoTable(doc, { head: [['Category', 'Message', 'Details', 'Date', 'Status']], body: allData, startY: 35, styles: { fontSize: 9, cellPadding: 3 }, headStyles: { fillColor: [30, 64, 175], textColor: 255, fontStyle: 'bold' }, alternateRowStyles: { fillColor: [245, 245, 245] }, columnStyles: { 0: { cellWidth: 25 }, 1: { cellWidth: 60 }, 2: { cellWidth: 50 }, 3: { cellWidth: 30 }, 4: { cellWidth: 20 } }, margin: { top: 35, left: 14, right: 14 } })
    doc.save('notifications_report.pdf')
  }

  return {
    notifications, autoSendEnabled, whatsAppNumber, notificationEmail,
    selectedCategory, filterEquipment, filterProduct, filterLeads,
    scheduleType, scheduleTime, scheduleDay, testSendResults, showTestResults,
    stockAlerts, channelWhatsapp, channelEmail, notificationsLoading,
    notifSearch, notifSeverity, collapsedNotifCategories, expandedNotifs,
    notificationCount,
    inventoryItems, showItemSettingsPanel, selectedItem, selectedItemSettings,
    globalLowStockThreshold, globalCriticalStockThreshold,
    groupedNotifications, filteredGroupedNotifications,
    clearAdvancedFilters,
    getCategoryIcon, getNotifStatusClass, getCategoryMeta,
    getSeverityBorder, getSeverityDot, countBySeverity,
    toggleNotifCategory, notifKey, isNotifExpanded, toggleNotifExpanded,
    getNotifDetailText, truncateText, formatNotifRelative, formatDate,
    loadNotifications, loadStockAlerts, dismissNotification,
    resolveNotification, dismissAllNotifications,
    saveNotificationSettings, sendTest,
    fetchInventoryForSettings, openItemSettingsPanel, openItemSettings, saveItemSettings,
    fetchGlobalStockSettings, saveGlobalStockSettings,
    exportNotificationsExcel, exportNotificationsPDF,
  }
}
