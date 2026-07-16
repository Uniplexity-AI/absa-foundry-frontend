import { ref, computed, reactive } from 'vue'
import { toast } from 'vue3-toastify'
import { decodeJWT } from '@/api_services/decodeJWT'
import API_BASE_URL from '@/api_services/api'

/**
 * Approval Workflow Composable
 *
 * Manages multi-level approval for sensitive settings changes.
 * Specifically guards Role & Permission operations in the Settings module.
 *
 * Levels:
 *   0 = Auto-approved (direct save)
 *   1 = Requires 1 approver at Level 1+
 *   2 = Requires 1 approver at Level 2+
 *   3 = Requires 2 approvers at Level 3+ (quorum)
 */

export function useSettingsApprovals() {
  const { getTenantId, getUserEmail, getUserRole } = decodeJWT()

  // ── State ─────────────────────────────────────────────────
  const isLoading = ref(false)
  const error = ref(null)

  // Pending approvals (for approvers)
  const pendingApprovals = ref([])
  const pendingApprovalsCount = computed(() => pendingApprovals.value.length)

  // My submitted requests
  const myRequests = ref([])
  const myPendingCount = computed(() =>
    myRequests.value.filter(r => r.status === 'pending').length
  )

  // Currently submitting an approval request
  const isSubmitting = ref(false)
  const submitResult = ref(null)

  // Show approval modal
  const showApprovalModal = ref(false)
  const approvalModalData = ref(null) // { setting_group, change_type, proposed_value, current_value, metadata }

  // ── Default Approval Levels by Setting Group ──────────────
  const SETTING_LEVELS = {
    roles_permissions: 2,
    identity: 1,
    email_config: 1,
    integrations: 1,
    organizations: 1,
    pricing: 1,
    currency: 1,
    branding: 0,
    notifications: 0,
    ai_agents: 0,
  }

  function getRequiredLevel(settingGroup) {
    return SETTING_LEVELS[settingGroup] ?? 0
  }

  function getLevelLabel(level) {
    const labels = {
      0: 'Auto-Approved',
      1: 'Manager Approval',
      2: 'Director Approval',
      3: 'Executive Approval',
    }
    return labels[level] || `Level ${level} Approval`
  }

  function getLevelBadgeClass(level) {
    const classes = {
      0: 'bg-green-100 text-green-700 border-green-200',
      1: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      2: 'bg-orange-100 text-orange-700 border-orange-200',
      3: 'bg-red-100 text-red-700 border-red-200',
    }
    return classes[level] || 'bg-gray-100 text-gray-700 border-gray-200'
  }

  function getStatusBadgeClass(status) {
    const classes = {
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      approved: 'bg-green-100 text-green-700 border-green-200',
      rejected: 'bg-red-100 text-red-700 border-red-200',
      changes_requested: 'bg-blue-100 text-blue-700 border-blue-200',
      withdrawn: 'bg-gray-100 text-gray-500 border-gray-200',
      auto_approved: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    }
    return classes[status] || 'bg-gray-100 text-gray-500 border-gray-200'
  }

  // ── API Calls ─────────────────────────────────────────────

  async function fetchPendingApprovals() {
    const tenantId = getTenantId()
    const email = getUserEmail()
    if (!tenantId || !email) return

    isLoading.value = true
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(
        `${API_BASE_URL}/approvals/pending?tenant_id=${tenantId}&approver_email=${encodeURIComponent(email)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (res.ok) {
        const data = await res.json()
        pendingApprovals.value = data.approvals || []
      }
    } catch (e) {
      console.warn('Failed to fetch pending approvals:', e)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchMyRequests() {
    const tenantId = getTenantId()
    const email = getUserEmail()
    if (!tenantId || !email) return

    isLoading.value = true
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(
        `${API_BASE_URL}/approvals/my-requests?tenant_id=${tenantId}&requester_email=${encodeURIComponent(email)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (res.ok) {
        const data = await res.json()
        myRequests.value = data.requests || []
      }
    } catch (e) {
      console.warn('Failed to fetch my requests:', e)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Submit a settings change for approval.
   * Returns { status: 'auto_approved' | 'pending', approval_id }
   */
  async function submitForApproval({
    settingGroup,
    settingPath = null,
    currentValue = null,
    proposedValue = null,
    changeType = 'update',
    justification = '',
    metadata = {},
  }) {
    const tenantId = getTenantId()
    const email = getUserEmail()
    const name = email // fallback
    const role = getUserRole()

    if (!tenantId || !email) {
      throw new Error('Authentication required')
    }

    isSubmitting.value = true
    error.value = null

    try {
      const token = localStorage.getItem('token')
      const params = new URLSearchParams({
        tenant_id: tenantId,
        requester_email: email,
        requester_name: name,
        requester_role: role,
      })

      const res = await fetch(
        `${API_BASE_URL}/approvals/submit?${params}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            setting_group: settingGroup,
            setting_path: settingPath,
            current_value: currentValue,
            proposed_value: proposedValue,
            change_type: changeType,
            justification,
            metadata,
          }),
        }
      )

      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.detail || 'Failed to submit for approval')
      }

      const result = await res.json()
      submitResult.value = result
      return result
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      isSubmitting.value = false
    }
  }

  /**
   * Approve or reject a pending request
   */
  async function decideApproval(approvalId, decision, comment = '') {
    const tenantId = getTenantId()
    const email = getUserEmail()

    if (!tenantId || !email) throw new Error('Authentication required')

    isLoading.value = true
    try {
      const token = localStorage.getItem('token')
      const params = new URLSearchParams({
        tenant_id: tenantId,
        approver_email: email,
        approver_name: email,
      })

      const res = await fetch(
        `${API_BASE_URL}/approvals/${approvalId}/decide?${params}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ decision, comment }),
        }
      )

      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.detail || 'Failed to process decision')
      }

      const result = await res.json()
      // Refresh pending approvals
      await fetchPendingApprovals()
      return result
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Withdraw a pending request (by requester)
   */
  async function withdrawRequest(approvalId) {
    const tenantId = getTenantId()
    const email = getUserEmail()

    if (!tenantId || !email) throw new Error('Authentication required')

    isLoading.value = true
    try {
      const token = localStorage.getItem('token')
      const params = new URLSearchParams({
        tenant_id: tenantId,
        requester_email: email,
      })

      const res = await fetch(
        `${API_BASE_URL}/approvals/${approvalId}/withdraw?${params}`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.detail || 'Failed to withdraw')
      }

      await fetchMyRequests()
      return await res.json()
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Check if there's a pending approval for a given setting group
   */
  async function checkHasPending(settingGroup) {
    const tenantId = getTenantId()
    if (!tenantId) return false

    try {
      const token = localStorage.getItem('token')
      const res = await fetch(
        `${API_BASE_URL}/approvals/check/${settingGroup}?tenant_id=${tenantId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (res.ok) {
        const data = await res.json()
        return data.has_pending || false
      }
    } catch (e) {
      console.warn('Failed to check pending:', e)
    }
    return false
  }

  // ── Role-specific guard wrappers ──────────────────────────

  /**
   * Wraps a role mutation (create/update/delete) with approval flow.
   * If Level 0, executes immediately. Otherwise, submits for approval.
   *
   * @param {Function} executeFn - The actual mutation function to call if auto-approved
   * @param {Object} options
   * @param {string} options.changeType - 'create' | 'update' | 'delete'
   * @param {Object} options.proposedValue - The role data being saved
   * @param {Object} options.currentValue - The current role data (for updates)
   * @param {string} options.justification - Reason for the change
   * @param {Object} options.metadata - { roleId, roleName }
   * @returns {Promise<{status, approvalId}>}
   */
  async function guardedRoleMutation(executeFn, options = {}) {
    const {
      changeType = 'update',
      proposedValue = null,
      currentValue = null,
      justification = '',
      metadata = {},
    } = options

    const level = getRequiredLevel('roles_permissions')

    // Level 0: execute immediately, no modal needed
    if (level === 0) {
      await executeFn()
      toast.success('Role saved successfully (auto-approved)')
      return { status: 'auto_approved', executed: true }
    }

    // Level 1+: open the approval confirmation modal first
    // Store the pending action; the modal's "Submit" button will trigger the API call
    approvalModalData.value = {
      settingGroup: 'roles_permissions',
      changeType,
      proposedValue,
      currentValue,
      justification,
      metadata,
      roleName: metadata?.roleName || '',
      // Store the executeFn so the modal can call it if auto-approved
      _executeFn: executeFn,
    }
    showApprovalModal.value = true

    // The caller will receive this — modal handles the rest
    return { status: 'pending_modal', executed: false }
  }

  /**
   * Called when the user confirms submission in the approval modal.
   * Performs the actual API call and executes the change if auto-approved.
   */
  async function confirmApprovalSubmit() {
    const data = approvalModalData.value
    if (!data) return

    isSubmitting.value = true
    try {
      const result = await submitForApproval({
        settingGroup: data.settingGroup,
        settingPath: `roles.${data.changeType}`,
        currentValue: data.currentValue,
        proposedValue: data.proposedValue,
        changeType: data.changeType,
        justification: data.justification,
        metadata: data.metadata,
      })

      if (result.status === 'auto_approved') {
        await data._executeFn?.()
        toast.success('Role saved successfully (auto-approved)')
      } else {
        const level = getRequiredLevel('roles_permissions')
        toast.info(`Role change submitted for ${getLevelLabel(level)}. Awaiting approval.`, {
          autoClose: 5000,
        })
        // Refresh my requests after submitting
        await fetchMyRequests()
      }

      closeApprovalSubmitModal()
      return result
    } catch (e) {
      error.value = e.message
      toast.error(e.message || 'Failed to submit for approval')
      throw e
    } finally {
      isSubmitting.value = false
    }
  }

  // ── Modal helpers ─────────────────────────────────────────

  function openApprovalSubmitModal(data) {
    approvalModalData.value = data
    showApprovalModal.value = true
  }

  function closeApprovalSubmitModal() {
    showApprovalModal.value = false
    approvalModalData.value = null
  }

  // ── Format helpers ────────────────────────────────────────

  function formatDate(dateStr) {
    if (!dateStr) return '—'
    try {
      return new Date(dateStr).toLocaleDateString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      })
    } catch {
      return dateStr
    }
  }

  function formatRelative(dateStr) {
    if (!dateStr) return '—'
    try {
      const diff = Date.now() - new Date(dateStr).getTime()
      const mins = Math.floor(diff / 60000)
      if (mins < 1) return 'Just now'
      if (mins < 60) return `${mins}m ago`
      const hours = Math.floor(mins / 60)
      if (hours < 24) return `${hours}h ago`
      const days = Math.floor(hours / 24)
      return `${days}d ago`
    } catch {
      return dateStr
    }
  }

  return {
    // State
    isLoading,
    error,
    pendingApprovals,
    pendingApprovalsCount,
    myRequests,
    myPendingCount,
    isSubmitting,
    submitResult,
    showApprovalModal,
    approvalModalData,

    // Constants
    SETTING_LEVELS,

    // Helpers
    getRequiredLevel,
    getLevelLabel,
    getLevelBadgeClass,
    getStatusBadgeClass,
    formatDate,
    formatRelative,

    // API
    fetchPendingApprovals,
    fetchMyRequests,
    submitForApproval,
    decideApproval,
    withdrawRequest,
    checkHasPending,

    // Guards
    guardedRoleMutation,
    confirmApprovalSubmit,

    // Modal
    openApprovalSubmitModal,
    closeApprovalSubmitModal,
  }
}
