repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\views\Modules\crm\CRMTicketsPage.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add Upload icon import
content = content.replace(
    "CheckCircle, AlertTriangle, Clock, MessageSquare, Phone",
    "CheckCircle, AlertTriangle, Clock, MessageSquare, Phone, Upload"
)

# Insert scripts
script_insertion = """const showNewCaseModal = ref(false)

const faqFileInput = ref(null)
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
}
"""
content = content.replace("const showNewCaseModal = ref(false)", script_insertion)

# Insert button in template
header_buttons_old = """        <div class="flex gap-2">
          <button class="px-3 py-1.5 bg-transparent border border-gray-300 text-gray-600 text-[9px] font-mono font-bold uppercase rounded-none hover:border-absa-passion hover:text-absa-passion transition flex items-center gap-2"><Filter :size="12"/> Filter</button>
          <button @click="showNewCaseModal = true" class="px-3 py-1.5 bg-transparent text-absa-passion border border-absa-passion hover:bg-absa-passion/10 text-[9px] font-mono font-bold uppercase rounded-none transition flex items-center gap-2"><Plus :size="12"/> New Case</button>
        </div>"""

header_buttons_new = """        <div class="flex gap-2">
          <button class="px-3 py-1.5 bg-transparent border border-gray-300 text-gray-600 text-[9px] font-mono font-bold uppercase rounded-none hover:border-absa-passion hover:text-absa-passion transition flex items-center gap-2"><Filter :size="12"/> Filter</button>
          
          <!-- Bot FAQ Upload -->
          <input type="file" ref="faqFileInput" class="hidden" accept=".doc,.docx,.pdf,.csv" @change="handleFaqUpload" />
          <button @click="faqFileInput.click()" :disabled="isUploadingFaq" class="px-3 py-1.5 bg-gray-50 border border-gray-300 text-gray-700 text-[9px] font-mono font-bold uppercase rounded-none hover:border-absa-passion hover:text-absa-passion transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            <Upload :size="12" :class="isUploadingFaq ? 'animate-bounce text-absa-passion' : ''"/> 
            {{ isUploadingFaq ? 'Training Bot...' : 'Upload FAQs' }}
          </button>

          <button @click="showNewCaseModal = true" class="px-3 py-1.5 bg-transparent text-absa-passion border border-absa-passion hover:bg-absa-passion/10 text-[9px] font-mono font-bold uppercase rounded-none transition flex items-center gap-2"><Plus :size="12"/> New Case</button>
        </div>"""

content = content.replace(header_buttons_old, header_buttons_new)

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done adding FAQ upload")
