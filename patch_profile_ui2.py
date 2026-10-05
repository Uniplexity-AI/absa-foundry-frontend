repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\views\CustomerProfile.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

import re

content = content.replace("getActionLog, getCustomerState, hydrateLogFromServer, recordAction", "getActionLog, getCustomerState, hydrateLogFromServer, recordAction, deleteAction, updateAction")

setup_addition = """
const engagementToEdit = ref(null)

function editEngagement(entry) {
  engagementToEdit.value = entry
  showEngagementModal.value = true
}

function handleEngagementUpdated(payload) {
  updateAction(engagementToEdit.value.id, {
    type: payload.type,
    detail: payload.notes || 'Engagement updated.',
    meta: payload
  })
  actionLog.value = getActionLog()
  engagementToEdit.value = null
  showEngagementModal.value = false
}

const engagementToDelete = ref(null)
const showDeleteEngagementDialog = ref(false)

function promptDeleteEngagement(entry) {
  engagementToDelete.value = entry
  showDeleteEngagementDialog.value = true
}

function confirmDeleteEngagement() {
  if (engagementToDelete.value) {
    deleteAction(engagementToDelete.value.id)
    actionLog.value = getActionLog()
  }
  showDeleteEngagementDialog.value = false
  engagementToDelete.value = null
}
"""
content = content.replace("const showEngagementModal = ref(false)", "const showEngagementModal = ref(false)\n" + setup_addition)

modal_replacement = """
    <EngagementModal
      :open="showEngagementModal"
      :customerId="customerId"
      :customerName="displayName"
      :existingEntry="engagementToEdit"
      @close="showEngagementModal = false; engagementToEdit = null"
      @logged="payload => engagementToEdit ? handleEngagementUpdated(payload) : handleEngagementLogged(payload)"
    />

    <ConfirmDialog
      :open="showDeleteEngagementDialog"
      title="Delete Engagement"
      message="Are you sure you want to delete this engagement log?"
      confirmText="DELETE"
      confirmColor="bg-absa-passion hover:bg-absa-power"
      @close="showDeleteEngagementDialog = false"
      @confirm="confirmDeleteEngagement"
    />
"""
content = re.sub(r'<EngagementModal[^>]*?@logged="handleEngagementLogged"\s*/>', modal_replacement.strip(), content, flags=re.DOTALL)

history_replacement = """
                <div v-for="h in filteredHistory" :key="h.id" class="flex gap-3 group relative">
                  <div class="flex flex-col items-center pt-1 shrink-0">
                    <div class="w-2 h-2 rounded-none" :style="{ background: tierColor('power') }"></div>
                    <div class="w-[1px] flex-1 bg-gray-200 mt-1"></div>
                  </div>
                  <div class="pb-1 min-w-0 flex-1">
                    <div class="flex items-start justify-between">
                      <div>
                        <div class="flex items-center gap-2 flex-wrap">
                          <span class="text-xs font-bold text-absa-enrich">{{ h.title }}</span>
                          <span class="text-[10px] text-gray-400">{{ fmtDate(h.at) }}</span>
                        </div>
                        <p class="text-[11px] text-gray-500 mt-0.5">{{ h.detail }}</p>
                        <span v-if="h.actor" class="text-[10px] text-gray-400 block uppercase tracking-wide mt-1">RM: {{ h.actor }}</span>
                      </div>
                      <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button @click="editEngagement(h)" class="p-1 text-gray-400 hover:text-absa-passion transition-colors" title="Edit">
                          <span class="material-symbols-outlined text-[14px]">edit</span>
                        </button>
                        <button @click="promptDeleteEngagement(h)" class="p-1 text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                          <span class="material-symbols-outlined text-[14px]">delete</span>
                        </button>
                      </div>
                    </div>
"""
content = re.sub(r'<div v-for="h in filteredHistory" :key="h\.id"[^>]*>.*?<div class="pb-1 min-w-0">.*?<span v-if="h\.actor"[^>]*>RM: \{\{ \s*h\.actor\s* \}\}</span>', history_replacement.strip(), content, flags=re.DOTALL)

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done frontend ui")
