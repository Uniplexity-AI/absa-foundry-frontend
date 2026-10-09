with open("src/views/Modules/settings/UserManagement.vue", "r", encoding="utf-8") as f:
    content = f.read()

import re

old_grid = """            <!-- Main Permissions Grid -->
              <div class="p-5 border-t border-gray-100 bg-white shrink-0">
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center gap-2">
                    <i class="fas fa-shield-alt text-gray-400 text-xs"></i>
                    <span class="text-[10px] font-black uppercase tracking-widest text-gray-900">MAIN PERMISSIONS</span>
                  </div>
                  <button class="text-[9px] font-mono font-bold text-gray-500 hover:text-absa-passion uppercase tracking-widest transition-colors">DESELECT ALL</button>
                </div>
                
                <div class="grid grid-cols-2 gap-y-3 gap-x-4">
                  <label v-for="perm in ['READ', 'WRITE', 'EDIT', 'DELETE', 'ASSIGN', 'APPROVE', 'EXPORT']" :key="perm" class="flex items-center gap-2 cursor-pointer group">
                    <div class="w-4 h-4 bg-absa-passion rounded-sm flex items-center justify-center text-white shadow-sm border border-absa-passion">
                      <i class="fas fa-check text-[10px]"></i>
                    </div>
                    <span class="text-[10px] font-black text-gray-700 group-hover:text-gray-900 uppercase tracking-wider">{{ perm }}</span>
                  </label>
                </div>
              </div>"""

new_grid = """            <!-- Main Permissions Grid -->
              <div class="p-5 border-t border-gray-100 bg-white shrink-0">
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center gap-2">
                    <i class="fas fa-shield-alt text-gray-400 text-xs"></i>
                    <span class="text-[10px] font-black uppercase tracking-widest text-gray-900">MAIN PERMISSIONS</span>
                  </div>
                  <button @click.prevent="deselectAllMain(activeModalModule)" class="text-[9px] font-mono font-bold text-gray-500 hover:text-absa-passion uppercase tracking-widest transition-colors">DESELECT ALL</button>
                </div>
                
                <div class="grid grid-cols-2 gap-y-3 gap-x-4">
                  <label v-for="perm in ['READ', 'WRITE', 'EDIT', 'DELETE', 'ASSIGN', 'APPROVE', 'EXPORT']" :key="perm" @click.prevent="toggleFeature(activeModalModule, perm.toLowerCase())" class="flex items-center gap-2 cursor-pointer group">
                    <div class="w-4 h-4 rounded-sm flex items-center justify-center shadow-sm border transition-colors" :class="hasFeature(activeModalModule, perm.toLowerCase()) ? 'bg-absa-passion border-absa-passion text-white' : 'bg-white border-gray-300 group-hover:border-absa-passion text-transparent'">
                      <i class="fas fa-check text-[10px]"></i>
                    </div>
                    <span class="text-[10px] font-black text-gray-700 group-hover:text-gray-900 uppercase tracking-wider">{{ perm }}</span>
                  </label>
                </div>
              </div>"""

content = content.replace(old_grid, new_grid)

with open("src/views/Modules/settings/UserManagement.vue", "w", encoding="utf-8") as f:
    f.write(content)
