repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\views\Modules\crm\FaqUploadModal.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

import re

# Add axios import
if "import axios" not in content:
    content = content.replace(
        "import { ref } from 'vue'",
        "import { ref } from 'vue'\nimport axios from 'axios'"
    )

# Replace handleFileUpload logic
old_logic = """  isUploading.value = true
  
  setTimeout(() => {
    isUploading.value = false
    alert(`FAQ document "${file.name}" uploaded successfully!\\n\\nThe bot has processed the document and will use these FAQs for automated replies.`)
    emit('uploaded')
    emit('close')
  }, 2000)"""

new_logic = """  isUploading.value = true
  
  const formData = new FormData()
  formData.append('file', file)
  
  axios.post('http://localhost:8080/api/v1/crm/faqs/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  .then(response => {
    isUploading.value = false
    const msg = response.data.message || `FAQ document "${file.name}" uploaded successfully!`
    alert(msg + '\\n\\nThe bot has processed the document and will use these FAQs for automated replies.')
    event.target.value = ''
    emit('uploaded')
    emit('close')
  })
  .catch(error => {
    isUploading.value = false
    console.error('Upload failed:', error)
    alert('Failed to upload FAQ document. Make sure the backend is running.')
    event.target.value = ''
  })"""

content = content.replace(old_logic, new_logic)

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done wiring frontend")
