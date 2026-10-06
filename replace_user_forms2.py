import re

with open('src/views/Modules/settings/UserManagement.vue', 'r', encoding='utf-8') as f:
    content = f.read()

edit_branch_select_html = '''
              <div>
                <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1">Role</label>
                <select v-model="editForm.role" required class="w-full h-9 px-3 border border-gray-200 text-xs focus:outline-none focus:border-absa-passion transition-colors bg-white">
                  <option value="" disabled>Select Role</option>
                  <option v-for="r in roles" :key="r.role_id" :value="r.role_name">{{ r.role_name }}</option>
                </select>
              </div>
              <div>
                <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1">Branch</label>
                <select v-model="editForm.branch_code" required class="w-full h-9 px-3 border border-gray-200 text-xs focus:outline-none focus:border-absa-passion transition-colors bg-white">
                  <option value="" disabled>Select Branch</option>
                  <option v-for="b in branches" :key="b.branch_code" :value="b.branch_code">{{ b.name }}</option>
                </select>
              </div>
'''

content = re.sub(
    r'(<form @submit\.prevent="handleEditUser".*?<div>\s*<label[^>]*>Role</label>\s*<select v-model="editForm\.role".*?</select>\s*</div>)',
    r'<form @submit.prevent="handleEditUser" class="space-y-4">\n' + edit_branch_select_html,
    content,
    flags=re.DOTALL
)

with open('src/views/Modules/settings/UserManagement.vue', 'w', encoding='utf-8') as f:
    f.write(content)

