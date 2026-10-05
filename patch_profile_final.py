repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\views\CustomerProfile.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

target = """    <EngagementModal
      :open="showEngagementModal"
      :customerId="customerId"
      :customerName="displayName"
      :existingEntry="engagementToEdit"
      :readonly="isModalReadonly"
      @close="showEngagementModal = false; engagementToEdit = null; "
      @logged="payload => engagementToEdit ? handleEngagementUpdated(payload) : handleEngagementLogged(payload)"
    />"""

replacement = """    <EngagementModal
      :open="showEngagementModal"
      :customerId="customerId"
      :customerName="displayName"
      :existingEntry="engagementToEdit"
      @close="showEngagementModal = false; engagementToEdit = null;"
      @logged="payload => engagementToEdit ? handleEngagementUpdated(payload) : handleEngagementLogged(payload)"
    />

    <ViewEngagementModal
      :open="showViewModal"
      :entry="engagementToView"
      :customerId="customerId"
      :customerName="displayName"
      @close="showViewModal = false; engagementToView = null;"
    />"""

content = content.replace(target, replacement)
content = content.replace("const isModalReadonly = ref(false)\n", "")

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done final modal insert")
