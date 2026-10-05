repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\views\CustomerProfile.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

import re

target = """    <AllHistoryModal
      :open="showAllHistoryModal"
      :history="historyEntries"
      :customerId="customerId"
      :customerName="displayName"
      @close="showAllHistoryModal = false"
    />"""

replacement = """    <AllHistoryModal
      :open="showAllHistoryModal"
      :history="historyEntries"
      :customerId="customerId"
      :customerName="displayName"
      @close="showAllHistoryModal = false"
      @edit="h => { showAllHistoryModal = false; editEngagement(h); }"
      @delete="h => { showAllHistoryModal = false; promptDeleteEngagement(h); }"
    />"""

content = content.replace(target, replacement)

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done CustomerProfile link")
