import os

path = r'src/views/Modules/managers/BranchManagerDashboard.vue'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

products_template = """      <template v-else-if="activeTab === 'products'">
        <div class="mb-6 px-4 py-3 bg-white border border-gray-300 rounded-sm flex items-start gap-3">
          <span class="material-symbols-outlined text-[16px] text-gray-400 mt-0.5 flex-shrink-0">info</span>
          <p class="text-xs text-gray-600">
            Upload and manage the bank's product catalog. These products are referenced by the Decision Intelligence engine during NBA (Next Best Action) evaluation.
          </p>
        </div>
        
        <div class="rounded-sm border border-gray-300 overflow-hidden mb-6">
          <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 class="text-sm font-bold text-absa-enrich">Products Catalog</h2>
              <p class="text-[11px] text-gray-500 mt-0.5">Active retail products available for cross-sell recommendations</p>
            </div>
            <button @click="uploadType = 'product'; showUploadModal = true" class="px-4 py-2 bg-absa-passion text-white rounded-sm text-sm font-semibold hover:bg-absa-power flex items-center gap-2 shadow-none">
              <span class="material-symbols-outlined text-[16px]">add</span>New Product
            </button>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  <th class="px-5 py-3 w-1/4">Product Name</th>
                  <th class="px-4 py-3 w-1/2">Description</th>
                  <th class="px-4 py-3 text-center">Target Segment</th>
                  <th class="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 text-sm">
                <tr v-for="p in activeProducts" :key="p.id" class="hover:bg-gray-50 transition-colors">
                  <td class="px-5 py-3">
                    <p class="font-semibold text-absa-enrich text-xs">{{ p.name }}</p>
                  </td>
                  <td class="px-4 py-3">
                    <p class="text-xs text-gray-600 line-clamp-2" :title="p.description">{{ p.description }}</p>
                  </td>
                  <td class="px-4 py-3 text-center">
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-600">
                      {{ p.segment }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-right">
                    <div class="flex items-center justify-end gap-2">
                      <button @click="campaignToView = p" class="p-1 text-gray-400 hover:text-absa-energy transition-colors" title="View">
                        <span class="material-symbols-outlined text-[16px]">visibility</span>
                      </button>
                      <button @click="campaignToEdit = p; uploadType = 'product'; showUploadModal = true" class="p-1 text-gray-400 hover:text-absa-enrich transition-colors" title="Edit">
                        <span class="material-symbols-outlined text-[16px]">edit</span>
                      </button>
                      <button @click="deleteProduct(p.id)" class="p-1 text-gray-400 hover:text-absa-passion transition-colors" title="Delete">
                        <span class="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="activeProducts.length === 0">
                  <td colspan="4" class="px-5 py-8 text-center text-gray-500 text-sm font-semibold">
                    No products found. Click "New Product" to upload your catalog.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>

"""

content = content.replace(
    '      <template v-else-if="activeTab === \'cases\'">',
    products_template + '      <template v-else-if="activeTab === \'cases\'">'
)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Added products template')
