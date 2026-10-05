import re

filepath = 'src/views/Modules/crm/CRMTicketsPage.vue'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace button
btn_pattern = r'(<button [^>]*?@click="showFaqUploadModal = true"[^>]*?>.*?Upload FAQs\s*</button>)'

if 'View FAQs' not in content:
    new_btn = """<button @click="showFaqViewModal = true" class="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-[9px] font-mono font-bold uppercase rounded-none hover:border-absa-passion hover:text-absa-passion transition flex items-center gap-2">
            <span class="material-symbols-outlined text-[12px]">visibility</span>
            View FAQs
          </button>
          \\1"""
    content = re.sub(btn_pattern, new_btn, content, flags=re.DOTALL)

# Replace modal
modal_pattern = r'(<FaqUploadModal v-if="showFaqUploadModal" @close="showFaqUploadModal = false" />)'
if '<FaqViewModal' not in content:
    new_modal = """\\1
  <FaqViewModal v-if="showFaqViewModal" @close="showFaqViewModal = false" />"""
    content = re.sub(modal_pattern, new_modal, content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Python replace done.")
