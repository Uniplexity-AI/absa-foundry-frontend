import re

with open('src/views/Modules/settings/UserManagement.vue', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove font-display from KPIs
content = content.replace('text-3xl font-black font-display text-gray-900 uppercase tracking-tight leading-none mb-1', 'text-3xl font-black text-gray-900 uppercase tracking-tight leading-none mb-1')

# CARDS VIEW FIXES

# Email font
content = content.replace('text-[10px] font-mono font-bold text-gray-400 truncate mt-0.5 lowercase', 'text-[9px] font-bold text-gray-500 truncate mt-0.5')

# Role tag font
content = content.replace('bg-white border-b border-l border-gray-200 text-[9px] font-mono font-black text-gray-500 uppercase tracking-wider group-hover:bg-absa-passion group-hover:text-white group-hover:border-absa-passion transition-colors z-20', 'bg-white border-b border-l border-gray-200 text-[9px] font-black text-gray-500 uppercase tracking-wider group-hover:bg-absa-passion group-hover:text-white group-hover:border-absa-passion transition-colors z-20')

# Dept, Branch, Status Labels font (the gray text on the left)
content = content.replace('text-gray-400 font-mono uppercase tracking-widest text-[9px] font-bold', 'text-gray-400 uppercase tracking-widest text-[9px] font-bold')

# Dept Value color
content = content.replace('px-1.5 py-0.5 bg-blue-50/70 border border-blue-200 text-blue-800 text-[8px] font-mono font-bold uppercase truncate max-w-[60%]', 'px-1.5 py-0.5 bg-gray-50 border border-gray-200 text-gray-700 text-[8px] font-bold uppercase truncate max-w-[60%]')

# Disable / Enable Buttons
# Disable was: class="u.is_active ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-600 hover:bg-green-700'"
content = content.replace("'bg-orange-500 hover:bg-orange-600' : 'bg-green-600 hover:bg-green-700'", "'bg-absa-passion hover:bg-[#b3002d] text-white' : 'bg-gray-800 hover:bg-gray-900 text-white'")

# Status Text (active/offline)
# Was: <span :class="u.is_active ? 'text-green-600' : 'text-gray-400'" class="flex items-center gap-1.5 uppercase font-mono font-bold text-[10px]">
#   <span class="w-1.5 h-1.5 rounded-full" :class="u.is_active ? 'bg-green-500 animate-pulse' : 'bg-gray-300'"></span>
content = content.replace(
    '''<span :class="u.is_active ? 'text-green-600' : 'text-gray-400'" class="flex items-center gap-1.5 uppercase font-mono font-bold text-[10px]">
                  <span class="w-1.5 h-1.5 rounded-full" :class="u.is_active ? 'bg-green-500 animate-pulse' : 'bg-gray-300'"></span>''',
    '''<span :class="u.is_active ? 'text-gray-900' : 'text-gray-400'" class="flex items-center gap-1.5 uppercase font-bold text-[9px] tracking-wider">
                  <span class="w-1.5 h-1.5 rounded-full" :class="u.is_active ? 'bg-absa-passion' : 'bg-gray-300'"></span>'''
)

# And in list view? The list view also has green statuses:
# <span :class="u.is_active ? 'text-green-600 bg-green-50 border-green-200' : 'text-gray-500 bg-gray-50 border-gray-200'"
content = content.replace("'text-green-600 bg-green-50 border-green-200'", "'text-gray-900 bg-gray-100 border-gray-200'")
# <span class="w-1.5 h-1.5 rounded-full" :class="u.is_active ? 'bg-green-500 animate-pulse' : 'bg-gray-300'"></span>
# Wait, this might match the list view as well if it's the exact same string? Let's be careful.
content = content.replace(
    '''<span class="w-1.5 h-1.5 rounded-full" :class="u.is_active ? 'bg-green-500 animate-pulse' : 'bg-gray-300'"></span>''',
    '''<span class="w-1.5 h-1.5 rounded-full" :class="u.is_active ? 'bg-absa-passion' : 'bg-gray-300'"></span>'''
)


with open('src/views/Modules/settings/UserManagement.vue', 'w', encoding='utf-8') as f:
    f.write(content)
