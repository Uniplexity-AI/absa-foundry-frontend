repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\views\CustomerProfile.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

import re

# 1. Update Tabs Header
tabs_old = """
                <button
                  class="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-none transition-all"
                  :class="activeTab === 'nok' ? 'text-absa-passion border-b-2 border-absa-passion' : 'text-gray-500 hover:text-gray-700'"
                  @click="activeTab = 'nok'"
                >
                  Next of Kin
                </button>
              <div class="ml-auto flex items-center gap-2">
"""
tabs_new = """
                <button
                  class="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-none transition-all"
                  :class="activeTab === 'nok' ? 'text-absa-passion border-b-2 border-absa-passion' : 'text-gray-500 hover:text-gray-700'"
                  @click="activeTab = 'nok'"
                >
                  Next of Kin
                </button>
                <button
                  class="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-none transition-all"
                  :class="activeTab === 'performance' ? 'text-absa-passion border-b-2 border-absa-passion' : 'text-gray-500 hover:text-gray-700'"
                  @click="activeTab = 'performance'"
                >
                  Performance
                </button>
              <div class="ml-auto flex items-center gap-2">
"""
content = content.replace(tabs_old.strip(), tabs_new.strip())

# 2. Extract PostEngagementPerformance from interactions tab
component_tag = """
            <PostEngagementPerformance 
              v-if="filteredHistory.length" 
              :customerId="customerId" 
              :engagementDate="filteredHistory[0].at" 
            />
"""
# It might have different whitespace, so let's use regex
content = re.sub(r'\s*<PostEngagementPerformance[^>]*/>', '', content)

# 3. Add Performance tab at the end of the sections
nok_tab_end = """
            <p v-else class="text-xs text-gray-500">No Next of Kin data available.</p>
          </div>
"""
performance_tab = """
            <p v-else class="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">No Next of Kin data available.</p>
          </div>

          <!-- Performance Tab -->
          <div v-if="activeTab === 'performance'" class="flex-1 pt-4">
            <PostEngagementPerformance 
              v-if="filteredHistory.length" 
              :customerId="customerId" 
              :engagementDate="filteredHistory[0].at" 
            />
            <div v-else class="text-center py-8">
              <span class="material-symbols-outlined text-4xl text-gray-300 mb-2">monitoring</span>
              <p class="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">No engagements logged yet</p>
            </div>
          </div>
"""
content = content.replace(nok_tab_end.strip(), performance_tab.strip())

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done moving tab")
