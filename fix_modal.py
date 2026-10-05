import re

filepath = 'src/views/Modules/crm/CRMTicketsPage.vue'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace modal
modal_pattern = r'(<FaqUploadModal :open="showFaqUploadModal" @close="showFaqUploadModal = false" />)'
if '<FaqViewModal' not in content:
    new_modal = """\\1
  <FaqViewModal v-if="showFaqViewModal" @close="showFaqViewModal = false" />"""
    content = re.sub(modal_pattern, new_modal, content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Python replace done.")
