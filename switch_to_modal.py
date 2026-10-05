repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\views\Modules\crm\CRMTicketsPage.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

import re

# Add import for the new modal
content = content.replace(
    "import { ref } from 'vue'",
    "import { ref } from 'vue'\nimport FaqUploadModal from './FaqUploadModal.vue'"
)

# Replace the previous file upload logic inside CRMTicketsPage with just a ref for the modal
old_logic = """const faqFileInput = ref(null)
const isUploadingFaq = ref(false)

function handleFaqUpload(event) {
  const file = event.target.files[0]
  if (!file) return
  
  const validExts = ['.doc', '.docx', '.pdf', '.csv']
  const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase()
  if (!validExts.includes(ext)) {
    alert('Invalid file format. Please upload .doc, .docx, .pdf, or .csv')
    event.target.value = ''
    return
  }

  isUploadingFaq.value = true
  
  // Simulate bot training/upload delay
  setTimeout(() => {
    isUploadingFaq.value = false
    alert(`FAQ document "${file.name}" uploaded successfully!\n\nThe bot has processed the document and will use these FAQs for automated replies.`)
    event.target.value = ''
  }, 2000)
}"""

new_logic = """const showFaqUploadModal = ref(false)"""

content = content.replace(old_logic, new_logic)


# Replace the old button/input with a trigger for the modal
old_button = """          <!-- Bot FAQ Upload -->
          <input type="file" ref="faqFileInput" class="hidden" accept=".doc,.docx,.pdf,.csv" @change="handleFaqUpload" />
          <button @click="faqFileInput.click()" :disabled="isUploadingFaq" class="px-3 py-1.5 bg-gray-50 border border-gray-300 text-gray-700 text-[9px] font-mono font-bold uppercase rounded-none hover:border-absa-passion hover:text-absa-passion transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            <Upload :size="12" :class="isUploadingFaq ? 'animate-bounce text-absa-passion' : ''"/> 
            {{ isUploadingFaq ? 'Training Bot...' : 'Upload FAQs' }}
          </button>"""

new_button = """          <!-- Bot FAQ Upload Modal Trigger -->
          <button @click="showFaqUploadModal = true" class="px-3 py-1.5 bg-gray-50 border border-gray-300 text-gray-700 text-[9px] font-mono font-bold uppercase rounded-none hover:border-absa-passion hover:text-absa-passion transition flex items-center gap-2">
            <Upload :size="12" /> 
            Upload FAQs
          </button>"""

content = content.replace(old_button, new_button)

# Add the modal component to the template right at the end (before </template>)
content = content.replace("</template>", "  <FaqUploadModal :open=\"showFaqUploadModal\" @close=\"showFaqUploadModal = false\" />\n</template>")

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done switching to modal")
