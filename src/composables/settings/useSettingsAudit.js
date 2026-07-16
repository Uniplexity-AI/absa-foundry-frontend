import { ref, computed } from 'vue'
import { useSettingsBase } from './useSettingsBase'

export function useSettingsAudit() {
  const { getTenantId, API_BASE_URL } = useSettingsBase()

  const auditLogs = ref([])
  const auditTotal = ref(0)
  const auditPage = ref(1)
  const auditLimit = 50
  const isLoadingAudit = ref(false)
  const auditModuleFilter = ref('')
  const showAuditChart = ref(false)

  const AUDIT_SENSITIVE = ['expenses', 'loans', 'pos', 'invoices', 'cash-in']
  const FLAG_DELETE_THRESHOLD = 3
  const FLAG_UPDATE_THRESHOLD = 5

  const auditTotalPages = computed(() => Math.max(1, Math.ceil(auditTotal.value / auditLimit)))

  const auditIsFlagged = (log) =>
    AUDIT_SENSITIVE.includes(log.module) && (log.action === 'delete' || log.action === 'update')

  const auditFlags = computed(() => {
    const counts = {}
    for (const log of auditLogs.value) {
      const key = `${log.module}_${log.action}`
      counts[key] = (counts[key] || 0) + 1
    }
    const flags = []
    for (const mod of AUDIT_SENSITIVE) {
      const deletes = counts[`${mod}_delete`] || 0
      const updates = counts[`${mod}_update`] || 0
      if (deletes >= FLAG_DELETE_THRESHOLD) flags.push({ module: mod, action: 'delete', count: deletes, level: deletes >= 5 ? 'high' : 'medium' })
      if (updates >= FLAG_UPDATE_THRESHOLD) flags.push({ module: mod, action: 'update', count: updates, level: updates >= 10 ? 'high' : 'medium' })
    }
    return flags
  })

  const auditActionTotals = computed(() => {
    const t = { create: 0, update: 0, delete: 0, other: 0 }
    for (const log of auditLogs.value) {
      if (log.action === 'create') t.create++
      else if (log.action === 'update') t.update++
      else if (log.action === 'delete') t.delete++
      else t.other++
    }
    return t
  })

  const auditChartModules = computed(() => {
    const counts = {}
    for (const log of auditLogs.value) {
      if (!counts[log.module]) counts[log.module] = { create: 0, update: 0, delete: 0, other: 0 }
      if (['create', 'update', 'delete'].includes(log.action)) counts[log.module][log.action]++
      else counts[log.module].other++
    }
    const entries = Object.entries(counts).map(([mod, c]) => ({
      mod, ...c, total: c.create + c.update + c.delete + c.other,
      flagged: AUDIT_SENSITIVE.includes(mod) && c.delete >= FLAG_DELETE_THRESHOLD
    }))
    const max = Math.max(...entries.map(e => e.total), 1)
    return entries.sort((a, b) => b.total - a.total).map(e => ({ ...e, max }))
  })

  async function fetchAuditLogs() {
    isLoadingAudit.value = true
    try {
      const url = new URL(`${API_BASE_URL}/audit-logs/`)
      url.searchParams.set('tenant_id', getTenantId())
      url.searchParams.set('skip', String((auditPage.value - 1) * auditLimit))
      url.searchParams.set('limit', String(auditLimit))
      if (auditModuleFilter.value) url.searchParams.set('module', auditModuleFilter.value)
      const res = await fetch(url.toString(), { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      if (!res.ok) { const errBody = await res.text(); console.error('[Audit] GET /audit-logs/ failed:', res.status, errBody); return }
      const data = await res.json()
      if (data.status === 'success') { auditLogs.value = data.data; auditTotal.value = data.total }
      else console.error('[Audit] Unexpected response:', data)
    } catch (e) { console.error('[Audit] Failed to fetch audit logs:', e) }
    finally { isLoadingAudit.value = false }
  }

  const auditPrevPage = () => { if (auditPage.value > 1) { auditPage.value--; fetchAuditLogs() } }
  const auditNextPage = () => { if (auditPage.value < auditTotalPages.value) { auditPage.value++; fetchAuditLogs() } }

  return {
    auditLogs, auditTotal, auditPage, auditLimit, isLoadingAudit,
    auditModuleFilter, showAuditChart, auditTotalPages,
    AUDIT_SENSITIVE, FLAG_DELETE_THRESHOLD, FLAG_UPDATE_THRESHOLD,
    auditIsFlagged, auditFlags, auditActionTotals, auditChartModules,
    fetchAuditLogs, auditPrevPage, auditNextPage
  }
}
