import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import { useSettingsBase } from './useSettingsBase'

export function useSettingsOrganizations() {
  const { openSettingsConfirm, ORGANIZATION_TYPES, ACCESS_SCOPES } = useSettingsBase()

  const showOrgModal = ref(false)
  const editingOrg = ref(null)
  const orgForm = ref({ name: '', type: '', scope: '', parent_id: null })
  const tenantOrganizations = ref([])
  const rbacSuccess = ref(false)
  const rbacFeedbackMessage = ref('')

  function openOrgModal(org = null) {
    if (org) { editingOrg.value = org; orgForm.value = JSON.parse(JSON.stringify(org)) }
    else { editingOrg.value = null; orgForm.value = { name: '', type: '', scope: '', parent_id: null } }
    showOrgModal.value = true
  }

  function closeOrgModal() {
    showOrgModal.value = false; editingOrg.value = null
    orgForm.value = { name: '', type: '', scope: '', parent_id: null }
  }

  async function saveOrganization(addOrganization, updateOrganization) {
    if (!orgForm.value.name?.trim()) return toast.warning('Organization name is required')
    try {
      if (editingOrg.value) { await updateOrganization(editingOrg.value.id, orgForm.value); rbacFeedbackMessage.value = 'Organization updated successfully' }
      else { await addOrganization(orgForm.value); rbacFeedbackMessage.value = 'Organization added successfully' }
      rbacSuccess.value = true; setTimeout(() => { rbacSuccess.value = false }, 3000); closeOrgModal()
    } catch (err) { toast.error(err.message) }
  }

  async function handleDeleteOrg(orgId, removeOrganization) {
    const org = tenantOrganizations.value.find(o => o.id === orgId)
    openSettingsConfirm({
      title: 'Remove Organization', message: `Are you sure you want to remove "${org?.name}"?`,
      variant: 'danger', confirmLabel: 'Remove',
      onConfirm: async () => {
        try { await removeOrganization(orgId); rbacFeedbackMessage.value = 'Organization removed successfully'; rbacSuccess.value = true; setTimeout(() => { rbacSuccess.value = false }, 3000) }
        catch (err) { toast.error(err.message) }
      }
    })
  }

  function getOrgTypeInfo(typeId) {
    return ORGANIZATION_TYPES.find(t => t.id === typeId) || { name: typeId, icon: 'fas fa-building' }
  }

  function getAccessScopeInfo(scopeId) {
    return ACCESS_SCOPES.find(s => s.id === scopeId) || { name: scopeId, description: '' }
  }

  return {
    showOrgModal, editingOrg, orgForm, tenantOrganizations,
    rbacSuccess, rbacFeedbackMessage,
    openOrgModal, closeOrgModal, saveOrganization, handleDeleteOrg,
    getOrgTypeInfo, getAccessScopeInfo
  }
}
