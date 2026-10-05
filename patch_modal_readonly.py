repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\components\crm\EngagementModal.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

import re

# Add readonly prop
props_new = """
const props = defineProps({
  open: Boolean,
  customerId: String,
  customerName: String,
  existingEntry: Object,
  readonly: Boolean
})
"""
content = re.sub(r'const props = defineProps\(\{(.*?)\}\)', props_new.strip(), content, flags=re.DOTALL)

# Add :disabled="readonly" to all inputs/selects/textareas
content = content.replace('<select v-model="type"', '<select v-model="type" :disabled="readonly"')
content = content.replace('<select v-model="outcome"', '<select v-model="outcome" :disabled="readonly"')
content = content.replace('<select v-model="dormancyReason"', '<select v-model="dormancyReason" :disabled="readonly"')
content = content.replace('<input v-model="crossSell"', '<input v-model="crossSell" :disabled="readonly"')
content = content.replace('<select v-model="customerExperience"', '<select v-model="customerExperience" :disabled="readonly"')
content = content.replace('<input v-model="recommendation"', '<input v-model="recommendation" :disabled="readonly"')
content = content.replace('<input v-model="branchToVisit"', '<input v-model="branchToVisit" :disabled="readonly"')
content = content.replace('<input v-model="customerFeedback"', '<input v-model="customerFeedback" :disabled="readonly"')
content = content.replace('<textarea v-model="notes"', '<textarea v-model="notes" :disabled="readonly"')
content = content.replace('<input type="checkbox" id="ptf" v-model="isPromise"', '<input type="checkbox" id="ptf" v-model="isPromise" :disabled="readonly"')
content = content.replace('<input v-model="expectedAmount"', '<input v-model="expectedAmount" :disabled="readonly"')
content = content.replace('<input v-model="expectedDate"', '<input v-model="expectedDate" :disabled="readonly"')

# Update Title
title_target = '{{ existingEntry ? "Edit Engagement" : "Log Engagement" }}'
title_new = '{{ readonly ? "View Engagement" : (existingEntry ? "Edit Engagement" : "Log Engagement") }}'
content = content.replace(title_target, title_new)

# Update Footer Buttons (Hide save button if readonly)
button_target = '<button @click="submit"'
button_new = '<button v-if="!readonly" @click="submit"'
content = content.replace(button_target, button_new)

# Close button text
cancel_target = 'hover:text-gray-900 transition-colors">Cancel</button>'
cancel_new = 'hover:text-gray-900 transition-colors">{{ readonly ? "Close" : "Cancel" }}</button>'
content = content.replace(cancel_target, cancel_new)

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done modal readonly")
