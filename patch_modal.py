repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\components\crm\EngagementModal.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

import re

# Update props
props_replacement = """
const props = defineProps({
  open: Boolean,
  customerId: String,
  customerName: String,
  existingEntry: Object
})
"""
content = re.sub(r'const props = defineProps\(\{(.*?)\}\)', props_replacement.strip(), content, flags=re.DOTALL)

# Add watch to pre-fill
watch_addition = """
import { ref, watch } from 'vue'

watch(() => props.open, (newOpen) => {
  if (newOpen) {
    if (props.existingEntry) {
      const e = props.existingEntry
      type.value = e.type || 'Call'
      notes.value = e.meta?.notes || e.detail || ''
      outcome.value = e.meta?.outcome || ''
      dormancyReason.value = e.meta?.dormancy_reason || ''
      crossSell.value = e.meta?.cross_sell_details || ''
      recommendation.value = e.meta?.recommendation || ''
      customerExperience.value = e.meta?.customer_experience || ''
      branchToVisit.value = e.meta?.branch_to_visit || ''
      customerFeedback.value = e.meta?.customer_feedback || ''
      isPromise.value = !!e.meta?.isPromise
      expectedAmount.value = e.meta?.expectedAmount || ''
      expectedDate.value = e.meta?.expectedDate || ''
    } else {
      type.value = 'Call'
      notes.value = ''
      outcome.value = ''
      dormancyReason.value = ''
      crossSell.value = ''
      recommendation.value = ''
      customerExperience.value = ''
      branchToVisit.value = ''
      customerFeedback.value = ''
      isPromise.value = false
      expectedAmount.value = ''
      expectedDate.value = ''
    }
  }
})
"""
content = content.replace("import { ref } from 'vue'", watch_addition.strip())

# Update template header
content = content.replace("Log Engagement – {{ customerName || customerId }}", "{{ existingEntry ? 'Edit Engagement' : 'Log Engagement' }} – {{ customerName || customerId }}")
content = content.replace("{{ loading ? 'Saving...' : 'Save Engagement' }}", "{{ loading ? 'Saving...' : (existingEntry ? 'Update Engagement' : 'Save Engagement') }}")

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done modal")
