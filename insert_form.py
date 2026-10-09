import re

with open('src/views/Modules/settings/UserManagement.vue', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to find the end of the Header div
header_pattern = re.compile(r"(<!-- Header -->.*?</div>\s*)(<!-- Body -->)", re.DOTALL)

role_form_block = '''        <!-- Role Basic Info Form -->
        <div class="p-6 border-b border-gray-100 bg-white flex flex-col md:flex-row gap-6 shrink-0">
          <div class="flex-1">
            <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-2">ROLE NAME <span class="text-absa-passion">*</span></label>
            <input type="text" v-model="selectedRole.role_name" class="w-full bg-gray-50/50 border border-gray-100 p-3 text-xs font-black text-gray-900 focus:bg-white focus:border-absa-passion focus:ring-0 outline-none transition-colors" />
          </div>
          <div class="flex-[2]">
            <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-2">DESCRIPTION</label>
            <input type="text" v-model="selectedRole.description" class="w-full bg-gray-50/50 border border-gray-100 p-3 text-xs font-mono text-gray-700 focus:bg-white focus:border-absa-passion focus:ring-0 outline-none transition-colors" />
          </div>
        </div>

        '''

if header_pattern.search(content):
    content = header_pattern.sub(r"\1" + role_form_block + r"\2", content)
    with open('src/views/Modules/settings/UserManagement.vue', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Injected Role Name and Description fields.")
else:
    print("Could not find Header or Body markers.")
