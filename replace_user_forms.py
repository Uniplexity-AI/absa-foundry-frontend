import re

with open('src/views/Modules/settings/UserManagement.vue', 'r', encoding='utf-8') as f:
    content = f.read()

# Update createForm ref
content = content.replace(
    "const createForm = ref({ username: '', email: '', display_name: '', password: '', role: '' })",
    "const createForm = ref({ username: '', email: '', display_name: '', password: '', role: '', branch_code: '' })"
)

# Update editForm ref
content = content.replace(
    "const editForm = ref({ user_id: null, role: '' })",
    "const editForm = ref({ user_id: null, role: '', branch_code: '' })"
)

# Update handleCreateUser to pass branch_code
content = content.replace(
    "roles: [createForm.value.role]",
    "roles: [createForm.value.role], branch_code: createForm.value.branch_code"
)

# Update reset of createForm
content = content.replace(
    "createForm.value = { username: '', email: '', display_name: '', password: '', role: '' }",
    "createForm.value = { username: '', email: '', display_name: '', password: '', role: '', branch_code: '' }"
)

# Update openEditUser
content = content.replace(
    "editForm.value = { user_id: u.user_id, role: (u.roles || [])[0] || '' }",
    "editForm.value = { user_id: u.user_id, role: (u.roles || [])[0] || '', branch_code: u.branch_code || '' }"
)

# Update handleEditUser to pass branch_code
content = content.replace(
    "roles: [editForm.value.role]",
    "roles: [editForm.value.role], branch_code: editForm.value.branch_code"
)

# Add branch_code select to Create User form
branch_select_html = '''
              <div>
                <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1">Role</label>
                <select v-model="createForm.role" required class="w-full h-9 px-3 border border-gray-200 text-xs focus:outline-none focus:border-absa-passion transition-colors bg-white">
                  <option value="" disabled>Select Role</option>
                  <option v-for="r in roles" :key="r.role_id" :value="r.role_name">{{ r.role_name }}</option>
                </select>
              </div>
              <div>
                <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1">Branch</label>
                <select v-model="createForm.branch_code" required class="w-full h-9 px-3 border border-gray-200 text-xs focus:outline-none focus:border-absa-passion transition-colors bg-white">
                  <option value="" disabled>Select Branch</option>
                  <option v-for="b in branches" :key="b.branch_code" :value="b.branch_code">{{ b.name }}</option>
                </select>
              </div>
'''
content = re.sub(
    r'(<div>\s*<label class="block text-\[9px\].*?Role</label>.*?</div>)',
    branch_select_html,
    content,
    count=1,
    flags=re.DOTALL
)

# Add branch_code select to Edit User form
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
    r'(<!-- Edit User Modal -->.*?<div>\s*<label class="block text-\[9px\].*?Role</label>.*?</div>)',
    r'\1',  # Need to properly replace in Edit form... Wait, let's just do it carefully.
    content,
    flags=re.DOTALL
)

with open('src/views/Modules/settings/UserManagement.vue', 'w', encoding='utf-8') as f:
    f.write(content)

