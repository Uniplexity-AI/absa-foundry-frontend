repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\views\CustomerProfile.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

import re

# 1. Update Imports
content = content.replace("import ViewEngagementModal from '@/components/crm/ViewEngagementModal.vue'", 
                          "import AllHistoryModal from '@/components/crm/AllHistoryModal.vue'")

# 2. Update state variables and methods
content = content.replace("const showViewModal = ref(false)", "const showAllHistoryModal = ref(false)")
content = re.sub(r'function viewEngagement\(entry\) \{[^}]*\}', '', content)
content = content.replace("const engagementToView = ref(null)", "")

# 3. Modify filteredHistory (let's say limit to 3 items on the dashboard view)
filter_old = """
const filteredHistory = computed(() =>
  historyFilter.value ? historyEntries.value.filter((h) => h.title === historyFilter.value) : historyEntries.value
)
"""
filter_new = """
const filteredHistory = computed(() => {
  return historyEntries.value.slice(0, 3)
})
"""
content = content.replace(filter_old.strip(), filter_new.strip())

# 4. Replace Select Dropdown with View All Button
dropdown_old = """
            <div class="flex items-center justify-between mb-4">
              <select v-model="historyFilter" class="border border-gray-200 rounded-none px-2 py-1 text-[10px] font-mono font-bold uppercase text-gray-600 bg-white outline-none focus:border-absa-passion ml-auto">
                <option value="">All</option>
                <option v-for="t in historyTypes" :key="t" :value="t">{{ t }}</option>
              </select>
            </div>
"""
dropdown_new = """
            <div class="flex items-center justify-end mb-4">
              <button @click="showAllHistoryModal = true" class="border border-gray-200 rounded-none px-3 py-1.5 text-[10px] font-mono font-bold uppercase text-gray-600 bg-white outline-none hover:border-absa-passion hover:text-absa-passion transition-colors">
                View All
              </button>
            </div>
"""
content = content.replace(dropdown_old.strip(), dropdown_new.strip())

# 5. Remove Eye button from the loop
eye_btn = """
                        <button @click="viewEngagement(h)" class="p-1 text-gray-400 hover:text-absa-passion transition-colors" title="View Details">
                          <span class="material-symbols-outlined text-[14px]">visibility</span>
                        </button>
"""
content = content.replace(eye_btn.strip(), '')

# 6. Replace ViewEngagementModal with AllHistoryModal
modal_old = """
    <ViewEngagementModal
      :open="showViewModal"
      :entry="engagementToView"
      :customerId="customerId"
      :customerName="displayName"
      @close="showViewModal = false; engagementToView = null;"
    />
"""
modal_new = """
    <AllHistoryModal
      :open="showAllHistoryModal"
      :history="historyEntries"
      :customerId="customerId"
      :customerName="displayName"
      @close="showAllHistoryModal = false"
    />
"""
content = re.sub(r'<ViewEngagementModal[^>]*/>', modal_new.strip(), content, flags=re.DOTALL)

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done profile view all")
