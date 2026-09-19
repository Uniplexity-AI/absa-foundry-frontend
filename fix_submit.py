import re
content = open('src/components/ingest/EditCustomerModal.vue', 'r', encoding='utf-8').read()

correct_submit = '''async function submit() {
  attempted.value = true
  if (submitting.value) return
  if (hasErrors.value) {
    notify('Fix the highlighted fields before adding the customer', 'error', { autoClose: 4000 })
    return
  }

  submitting.value = true
  serverErrors.value = []
  partialWarning.value = ''
  try {
    let addedMaster = false
    const result = await addCustomer(nonEmpty(master.value, masterFields.value), { dataset: MASTER, allowUpdate: true })
    addedMaster = result.rows_inserted === 1 || result.rows_updated === 1
    notify('Saved record for ' + customerId.value, 'success', { autoClose: 6000 })
    emit('added', { customerId: customerId.value, master: addedMaster, snapshot: false })
    emit('close')
  } catch (e) {
    const detail = e.data?.detail
    serverErrors.value = Array.isArray(detail)
      ? detail
      : [partialWarning.value || e.message || 'Could not add the customer']
    notify(e.message || 'Could not add the customer', 'error', { autoClose: 6000 })
  } finally {
    submitting.value = false
  }
}'''

content = re.sub(r'async function submit\(\) \{.*?\}\n\}', correct_submit, content, flags=re.DOTALL)
open('src/components/ingest/EditCustomerModal.vue', 'w', encoding='utf-8').write(content)
