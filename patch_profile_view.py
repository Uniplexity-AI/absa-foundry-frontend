repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\views\CustomerProfile.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

import re

# Import the new component
content = content.replace("import EngagementModal from '@/components/crm/EngagementModal.vue'", 
                          "import EngagementModal from '@/components/crm/EngagementModal.vue'\nimport ViewEngagementModal from '@/components/crm/ViewEngagementModal.vue'")

# Add showViewModal state
state_old = """
const showEngagementModal = ref(false)
const isModalReadonly = ref(false)

const engagementToEdit = ref(null)
"""
state_new = """
const showEngagementModal = ref(false)
const showViewModal = ref(false)

const engagementToEdit = ref(null)
const engagementToView = ref(null)
"""
content = content.replace(state_old.strip(), state_new.strip())

# Update viewEngagement method
view_old = """
function viewEngagement(entry) {
  engagementToEdit.value = entry
  isModalReadonly.value = true
  showEngagementModal.value = true
}
"""
view_new = """
function viewEngagement(entry) {
  engagementToView.value = entry
  showViewModal.value = true
}
"""
content = content.replace(view_old.strip(), view_new.strip())

# Update editEngagement method
edit_old = """
function editEngagement(entry) {
  engagementToEdit.value = entry
  isModalReadonly.value = false
  showEngagementModal.value = true
}
"""
edit_new = """
function editEngagement(entry) {
  engagementToEdit.value = entry
  showEngagementModal.value = true
}
"""
content = content.replace(edit_old.strip(), edit_new.strip())

# Clean up EngagementModal button calls (e.g., Log Engagement button)
# Some might have `isModalReadonly = false`. Let's just remove that string globally.
content = content.replace('isModalReadonly = false; ', '')
content = content.replace('isModalReadonly = false', '')

# Remove readonly prop from EngagementModal invocation
# Old: 
#      <EngagementModal
#        :open="showEngagementModal"
#        :customerId="customerId"
#        :customerName="displayName"
#        :existingEntry="engagementToEdit"
#        :readonly="isModalReadonly"
#        @close="showEngagementModal = false; engagementToEdit = null; isModalReadonly = false"
#        @logged="payload => engagementToEdit ? handleEngagementUpdated(payload) : handleEngagementLogged(payload)"
#      />
modal_regex = r'<EngagementModal[^>]*:readonly="isModalReadonly"[^>]*/>'
modal_replacement = """
    <EngagementModal
      :open="showEngagementModal"
      :customerId="customerId"
      :customerName="displayName"
      :existingEntry="engagementToEdit"
      @close="showEngagementModal = false; engagementToEdit = null"
      @logged="payload => engagementToEdit ? handleEngagementUpdated(payload) : handleEngagementLogged(payload)"
    />
    
    <ViewEngagementModal
      :open="showViewModal"
      :entry="engagementToView"
      :customerId="customerId"
      :customerName="displayName"
      @close="showViewModal = false; engagementToView = null"
    />
"""
content = re.sub(modal_regex, modal_replacement.strip(), content, flags=re.DOTALL)

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done profile update")
