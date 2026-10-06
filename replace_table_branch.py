import re

with open('src/views/Modules/settings/UserManagement.vue', 'r', encoding='utf-8') as f:
    content = f.read()

# Add Branch to table header
content = content.replace(
    '<th class="px-4 py-3 text-[9px] font-black text-gray-500 uppercase tracking-widest">Roles</th>',
    '<th class="px-4 py-3 text-[9px] font-black text-gray-500 uppercase tracking-widest">Roles</th>\n                  <th class="px-4 py-3 text-[9px] font-black text-gray-500 uppercase tracking-widest">Branch</th>'
)

# Add Branch to table row
content = content.replace(
    '<span class="inline-flex items-center gap-1 px-2 py-1 bg-gray-50 text-gray-600 border border-gray-200 text-[9px] font-black uppercase tracking-widest">{{ (u.roles || []).join(\', \') || \'USER\' }}</span>\n                  </td>',
    '<span class="inline-flex items-center gap-1 px-2 py-1 bg-gray-50 text-gray-600 border border-gray-200 text-[9px] font-black uppercase tracking-widest">{{ (u.roles || []).join(\', \') || \'USER\' }}</span>\n                  </td>\n                  <td class="px-4 py-3">\n                    <span class="text-[11px] font-bold text-gray-700 uppercase">{{ getBranchName(u.branch_code) }}</span>\n                  </td>'
)

with open('src/views/Modules/settings/UserManagement.vue', 'w', encoding='utf-8') as f:
    f.write(content)

