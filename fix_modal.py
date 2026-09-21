import re

file_path = 'src/views/Modules/managers/BranchManagerDashboard.vue'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

modal_html = '''
    <CatalogUploadModal 
      :show="showUploadModal" 
      :type="uploadType"
      @close="showUploadModal = false" 
    />
    
    <AiCampaignModal'''

content = content.replace('<AiCampaignModal', modal_html, 1)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
