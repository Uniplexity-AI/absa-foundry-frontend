import re

file_path = 'src/views/Modules/managers/BranchManagerDashboard.vue'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add the Products Tab definition
content = re.sub(
    r"({ id: 'campaigns',[^}]+},)",
    r"\1\n  { id: 'products',     label: 'Products Catalog', icon: 'inventory' },",
    content
)

# 2. Add the Products Tab markup before the Cases tab markup
products_markup = '''
      <!-- TAB: PRODUCTS CATALOG -->
      <template v-else-if="activeTab === 'products'">
        <div class="rounded-sm border border-gray-300 overflow-hidden mb-6">
          <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center bg-white">
            <div>
              <h2 class="text-sm font-bold text-absa-enrich">Active Products Catalog</h2>
              <p class="text-[11px] text-gray-500 mt-0.5">Approved banking products for AI recommendation</p>
            </div>
            <button @click="showUploadModal = true; uploadType = 'product'" class="px-4 py-2 bg-absa-passion text-white rounded-sm text-sm font-semibold hover:bg-absa-power flex items-center gap-2 shadow-none">
              <span class="material-symbols-outlined text-[16px]">add</span>New Product
            </button>
          </div>
          <div class="p-6 text-center text-gray-500">
            <span class="material-symbols-outlined text-4xl mb-2 text-gray-300">inventory_2</span>
            <p class="text-sm">Products uploaded here are automatically retrieved by the NBA AI engine.</p>
          </div>
        </div>
      </template>

      <!-- TAB: ALL CASES -->'''
content = content.replace("<!-- TAB: ALL CASES -->", products_markup)

# 3. Modify "New Campaign" button
old_btn = '''<button class="px-4 py-2 bg-absa-passion text-white rounded-sm text-sm font-semibold hover:bg-absa-power flex items-center gap-2 shadow-none">
              <span class="material-symbols-outlined text-[16px]">add</span>New Campaign
            </button>'''
new_btn = '''<button @click="showUploadModal = true; uploadType = 'campaign'" class="px-4 py-2 bg-absa-passion text-white rounded-sm text-sm font-semibold hover:bg-absa-power flex items-center gap-2 shadow-none">
              <span class="material-symbols-outlined text-[16px]">add</span>New Campaign
            </button>'''
content = content.replace(old_btn, new_btn)

# 4. Add the component to the bottom of the template
modal_markup = '''    </template>
  </div>

  <!-- AI Modal -->
  <AiCampaignModal
'''
modal_replacement = '''    </template>
  </div>

  <CatalogUploadModal 
    :show="showUploadModal" 
    :type="uploadType"
    @close="showUploadModal = false" 
  />

  <!-- AI Modal -->
  <AiCampaignModal
'''
content = content.replace(modal_markup, modal_replacement)

# 5. Add reactive state and imports
content = content.replace("import AiCampaignModal from '@/components/intelligence/AiCampaignModal.vue'", 
                          "import AiCampaignModal from '@/components/intelligence/AiCampaignModal.vue'\\nimport CatalogUploadModal from '@/components/managers/CatalogUploadModal.vue'")

content = content.replace("const showCampaignModal = ref(false)", 
                          "const showCampaignModal = ref(false)\\nconst showUploadModal = ref(false)\\nconst uploadType = ref('campaign')")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated successfully')
