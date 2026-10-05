repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\components\crm\AllHistoryModal.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

import re

# Update defineEmits
content = content.replace("defineEmits(['close'])", "defineEmits(['close', 'edit', 'delete'])")

# Update loop div to add group class
content = content.replace('class="flex gap-3 relative"', 'class="flex gap-3 group relative"')

# Add edit/delete buttons
header_old = """
                  <div>
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="text-xs font-bold text-absa-enrich">{{ h.title }}</span>
                      <span class="text-[10px] text-gray-400">{{ fmtDate(h.at) }}</span>
                    </div>
                    <p class="text-[11px] text-gray-500 mt-0.5">{{ h.detail }}</p>
                    <span v-if="h.actor" class="text-[10px] text-gray-400 block uppercase tracking-wide mt-1">RM: {{ h.actor }}</span>
                  </div>
                </div>
"""
header_new = """
                  <div>
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="text-xs font-bold text-absa-enrich">{{ h.title }}</span>
                      <span class="text-[10px] text-gray-400">{{ fmtDate(h.at) }}</span>
                    </div>
                    <p class="text-[11px] text-gray-500 mt-0.5">{{ h.detail }}</p>
                    <span v-if="h.actor" class="text-[10px] text-gray-400 block uppercase tracking-wide mt-1">RM: {{ h.actor }}</span>
                  </div>
                  <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button @click="$emit('edit', h)" class="p-1 text-gray-400 hover:text-absa-passion transition-colors" title="Edit">
                      <span class="material-symbols-outlined text-[14px]">edit</span>
                    </button>
                    <button @click="$emit('delete', h)" class="p-1 text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                      <span class="material-symbols-outlined text-[14px]">delete</span>
                    </button>
                  </div>
                </div>
"""
content = content.replace(header_old.strip(), header_new.strip())

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done AllHistoryModal")
