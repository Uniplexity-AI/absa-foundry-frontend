import re

with open('src/views/Modules/settings/UserManagement.vue', 'r', encoding='utf-8') as f:
    content = f.read()

pattern = re.compile(r'<label v-for="feat in activeModuleData\.features" :key="feat\.id" class="flex items-start gap-3 p-4 border border-gray-100 hover:border-absa-passion transition-colors cursor-pointer group rounded-sm">\s*<div class="w-4 h-4 mt-0\.5 bg-absa-passion rounded-sm flex items-center justify-center text-white shadow-sm border border-absa-passion shrink-0">\s*<i class="fas fa-check text-\[10px\]"></i>\s*</div>')

new_html = '''<label v-for="feat in activeModuleData.features" :key="feat.id" @click.prevent="toggleFeature(activeModuleData.id, feat.id)" class="flex items-start gap-3 p-4 border transition-colors cursor-pointer group rounded-sm" :class="hasFeature(activeModuleData.id, feat.id) ? 'border-absa-passion bg-red-50/10' : 'border-gray-100 hover:border-absa-passion'">
                      <div class="w-4 h-4 mt-0.5 rounded-sm flex items-center justify-center text-white shadow-sm border shrink-0 transition-colors" :class="hasFeature(activeModuleData.id, feat.id) ? 'bg-absa-passion border-absa-passion' : 'bg-white border-gray-300 group-hover:border-absa-passion'">
                        <i v-if="hasFeature(activeModuleData.id, feat.id)" class="fas fa-check text-[10px]"></i>
                      </div>'''

content = pattern.sub(new_html, content)

with open('src/views/Modules/settings/UserManagement.vue', 'w', encoding='utf-8') as f:
    f.write(content)
