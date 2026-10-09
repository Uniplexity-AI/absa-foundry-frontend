import re

with open('src/views/Modules/settings/UserManagement.vue', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update actualModules ID to match entities
content = content.replace("id: 'etl',", "id: 'etl-pipeline',")
content = content.replace("id: 'ai',", "id: 'intelligence',")
content = content.replace("id: 'ops',", "id: 'operations',")

# 2. Add permissions object if missing to selectedRole
# Add toggleFeature method
toggle_script = '''
  const toggleFeature = (modId, featId) => {
    if (!selectedRole.value) return
    if (!selectedRole.value.permissions) selectedRole.value.permissions = {}
    if (!selectedRole.value.permissions[modId]) selectedRole.value.permissions[modId] = []
    
    const arr = selectedRole.value.permissions[modId]
    const idx = arr.indexOf(featId)
    if (idx === -1) {
      arr.push(featId)
    } else {
      arr.splice(idx, 1)
    }
  }
  
  const hasFeature = (modId, featId) => {
    if (!selectedRole.value || !selectedRole.value.permissions) return false
    return (selectedRole.value.permissions[modId] || []).includes(featId)
  }
'''
content = content.replace("const activeModalModule = ref('crm')", "const activeModalModule = ref('crm')\n" + toggle_script)

# 3. Update the modal HTML to bind toggles
old_label = '''<label v-for="feat in activeModuleData.features" :key="feat.id" class="flex items-start gap-3 p-4 border border-gray-100 hover:border-absa-passion transition-colors cursor-pointer group rounded-sm">
                      <div class="w-4 h-4 mt-0.5 bg-absa-passion rounded-sm flex items-center justify-center text-white shadow-sm border border-absa-passion shrink-0">
                        <i class="fas fa-check text-[10px]"></i>
                      </div>'''
new_label = '''<label v-for="feat in activeModuleData.features" :key="feat.id" @click.prevent="toggleFeature(activeModuleData.id, feat.id)" class="flex items-start gap-3 p-4 border transition-colors cursor-pointer group rounded-sm" :class="hasFeature(activeModuleData.id, feat.id) ? 'border-absa-passion bg-red-50/10' : 'border-gray-100 hover:border-absa-passion'">
                      <div class="w-4 h-4 mt-0.5 rounded-sm flex items-center justify-center text-white shadow-sm border shrink-0 transition-colors" :class="hasFeature(activeModuleData.id, feat.id) ? 'bg-absa-passion border-absa-passion' : 'bg-white border-gray-300 group-hover:border-absa-passion'">
                        <i v-if="hasFeature(activeModuleData.id, feat.id)" class="fas fa-check text-[10px]"></i>
                      </div>'''
content = content.replace(old_label, new_label)

# 4. Initialize selectedRole.permissions when opening the modal
# Currently selectedRole is set somewhere. Let's find "selectedRole.value = "
init_patch = '''selectedRole.value = { 
        ...role, 
        permissions: role.permissions ? JSON.parse(JSON.stringify(role.permissions)) : {
          'crm': ['workspace', 'customers', 'tickets', 'analytics', 'calendar'],
          'etl-pipeline': ['pipeline', 'history', 'config'],
          'intelligence': ['cv', 'lifecycle', 'forecast', 'outcomes', 'models'],
          'operations': ['portfolio', 'branch'],
          'settings': ['settings', 'users']
        }
      }'''
content = re.sub(r'selectedRole\.value\s*=\s*role', init_patch, content)

with open('src/views/Modules/settings/UserManagement.vue', 'w', encoding='utf-8') as f:
    f.write(content)
