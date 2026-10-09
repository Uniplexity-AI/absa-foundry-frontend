import re

with open('src/views/Modules/settings/UserManagement.vue', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the 4 KPIs
# Users KPI
kpi1_old = '''<div class="bg-white border border-gray-200 p-6 relative group overflow-hidden dot-pattern">
          <div class="absolute top-0 right-0 bg-white border-b border-l border-gray-200 px-2 py-0.5 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest z-20">Users</div>
          <div class="flex justify-between items-start mb-6 relative z-10">
            <div class="text-gray-400"><i class="fas fa-users text-lg"></i></div>
          </div>
          <div class="relative z-10">
            <h3 class="text-2xl font-black text-gray-900 tracking-tight leading-none mb-1">{{ users.length || 0 }}</h3>
            <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Registered Users</p>
          </div>
        </div>'''
kpi1_new = '''<div class="bg-white border border-gray-200 shadow-sm p-4 relative group hover:border-absa-passion transition cursor-pointer">
          <div class="flex items-center justify-between mb-3">
            <div class="text-gray-400"><i class="fas fa-users text-[18px]"></i></div>
            <span class="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Users</span>
          </div>
          <h5 class="text-xs font-medium text-gray-500 mb-1">Registered Users</h5>
          <p class="text-2xl font-black text-absa-passion tracking-tight">{{ users.length || 0 }}</p>
        </div>'''

# Branches KPI
kpi2_old = '''<div class="bg-white border border-gray-200 p-6 relative group overflow-hidden dot-pattern">
          <div class="absolute top-0 right-0 bg-white border-b border-l border-gray-200 px-2 py-0.5 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest z-20">Branches</div>
          <div class="flex justify-between items-start mb-6 relative z-10">
            <div class="text-gray-400"><i class="fas fa-store text-lg"></i></div>
          </div>
          <div class="relative z-10">
            <h3 class="text-2xl font-black text-gray-900 tracking-tight leading-none mb-1">{{ activeBranches || 0 }}</h3>
            <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Active Branches</p>
          </div>
        </div>'''
kpi2_new = '''<div class="bg-white border border-gray-200 shadow-sm p-4 relative group hover:border-absa-passion transition cursor-pointer">
          <div class="flex items-center justify-between mb-3">
            <div class="text-gray-400"><i class="fas fa-store text-[18px]"></i></div>
            <span class="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Branches</span>
          </div>
          <h5 class="text-xs font-medium text-gray-500 mb-1">Active Branches</h5>
          <p class="text-2xl font-black text-absa-passion tracking-tight">{{ activeBranches || 0 }}</p>
        </div>'''

# Active KPI
kpi3_old = '''<div class="bg-white border border-gray-200 p-6 relative group overflow-hidden dot-pattern flex flex-col justify-between">
          <div class="absolute top-0 right-0 bg-white border-b border-l border-gray-200 px-2 py-0.5 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest z-20">Active</div>
          <div>
            <div class="flex justify-between items-start mb-6 relative z-10">
              <div class="text-gray-400"><i class="fas fa-user-check text-lg"></i></div>
            </div>
            <div class="relative z-10">
              <h3 class="text-2xl font-black text-gray-900 tracking-tight leading-none mb-1">{{ activeUsersCount || 0 }}</h3>
              <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-4">Active Accounts</p>
            </div>
          </div>
          <div class="relative z-10 border-t border-gray-100 pt-3 mt-auto">
             <p class="text-[8px] font-mono text-gray-400 uppercase tracking-wider mt-0.5">Currently Enabled Users</p>
          </div>
        </div>'''
kpi3_new = '''<div class="bg-white border border-gray-200 shadow-sm p-4 relative group hover:border-absa-passion transition cursor-pointer">
          <div class="flex items-center justify-between mb-3">
            <div class="text-gray-400"><i class="fas fa-user-check text-[18px]"></i></div>
            <span class="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Active</span>
          </div>
          <h5 class="text-xs font-medium text-gray-500 mb-1">Active Accounts</h5>
          <p class="text-2xl font-black text-absa-passion tracking-tight">{{ activeUsersCount || 0 }}</p>
        </div>'''

# Filtered KPI
kpi4_old = '''<div class="bg-white border border-gray-200 p-6 relative group overflow-hidden dot-pattern">
          <div class="absolute top-0 right-0 bg-white border-b border-l border-gray-200 px-2 py-0.5 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest z-20">Filtered</div>
          <div class="flex justify-between items-start mb-6 relative z-10">
            <div class="text-gray-400"><i class="fas fa-database text-lg"></i></div>
          </div>
          <div class="relative z-10">
            <h3 class="text-2xl font-black text-gray-900 tracking-tight leading-none mb-1">{{ filteredUsers.length || 0 }}</h3>
            <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Filtered Context</p>
          </div>
        </div>'''
kpi4_new = '''<div class="bg-white border border-gray-200 shadow-sm p-4 relative group hover:border-absa-passion transition cursor-pointer">
          <div class="flex items-center justify-between mb-3">
            <div class="text-gray-400"><i class="fas fa-database text-[18px]"></i></div>
            <span class="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Filtered</span>
          </div>
          <h5 class="text-xs font-medium text-gray-500 mb-1">Filtered Context</h5>
          <p class="text-2xl font-black text-absa-passion tracking-tight">{{ filteredUsers.length || 0 }}</p>
        </div>'''

content = content.replace(kpi1_old, kpi1_new)
content = content.replace(kpi2_old, kpi2_new)
content = content.replace(kpi3_old, kpi3_new)
content = content.replace(kpi4_old, kpi4_new)

with open('src/views/Modules/settings/UserManagement.vue', 'w', encoding='utf-8') as f:
    f.write(content)
