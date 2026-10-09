import re

with open('src/views/Modules/settings/UserManagement.vue', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add the reactive state and data structures
script_addition = '''
const activeModalModule = ref('crm')

const actualModules = [
  {
    id: 'crm',
    name: 'CRM & SALES',
    icon: 'fas fa-address-book',
    features: [
      { id: 'workspace', name: 'WORKSPACE', desc: 'Omnichannel workspace & communication', icon: 'fas fa-headset' },
      { id: 'calendar', name: 'CALENDAR', desc: 'Manage meetings and activities', icon: 'fas fa-calendar-alt' },
      { id: 'analytics', name: 'CRM ANALYTICS', desc: 'Sales and performance dashboards', icon: 'fas fa-chart-line' },
      { id: 'tickets', name: 'TICKETS', desc: 'Customer support ticketing', icon: 'fas fa-ticket-alt' },
      { id: 'leads', name: 'LEADS', desc: 'Lead generation and tracking', icon: 'fas fa-magnet' },
      { id: 'pipeline', name: 'PIPELINE', desc: 'Sales pipeline management', icon: 'fas fa-funnel-dollar' },
      { id: 'contacts', name: 'CONTACTS', desc: 'Customer contact directory', icon: 'fas fa-address-card' },
      { id: 'accounts', name: 'ACCOUNTS', desc: 'Corporate and retail accounts', icon: 'fas fa-building' },
      { id: 'deals', name: 'DEALS', desc: 'Active deal tracking', icon: 'fas fa-handshake' },
      { id: 'documents', name: 'DOCUMENTS', desc: 'Customer documents and files', icon: 'fas fa-folder-open' },
      { id: 'meetings', name: 'MEETINGS', desc: 'Meeting scheduling', icon: 'fas fa-users' },
      { id: 'emails', name: 'EMAILS', desc: 'Email campaigns and tracking', icon: 'fas fa-envelope' },
      { id: 'calls', name: 'CALLS', desc: 'Call logging and dialer', icon: 'fas fa-phone' },
      { id: 'visits', name: 'VISITS', desc: 'Field visits and check-ins', icon: 'fas fa-map-marker-alt' },
      { id: 'whatsapp', name: 'WHATSAPP', desc: 'WhatsApp messaging integration', icon: 'fab fa-whatsapp' },
      { id: 'acquisition', name: 'ACQUISITION', desc: 'Customer acquisition channels', icon: 'fas fa-bullseye' },
      { id: 'promise', name: 'PROMISE TO FUND', desc: 'Funding commitment tracking', icon: 'fas fa-money-check-alt' }
    ]
  },
  {
    id: 'etl',
    name: 'DATA PIPELINE',
    icon: 'fas fa-network-wired',
    features: [
      { id: 'pipeline', name: 'ETL PIPELINE', desc: 'Main data integration pipeline', icon: 'fas fa-project-diagram' },
      { id: 'history', name: 'ETL RUN HISTORY', desc: 'Logs and execution history', icon: 'fas fa-history' },
      { id: 'batch', name: 'BATCH EXECUTION', desc: 'Detailed batch execution metrics', icon: 'fas fa-tasks' },
      { id: 'config', name: 'ETL CONFIG MANAGER', desc: 'Pipeline settings and configurations', icon: 'fas fa-cogs' }
    ]
  },
  {
    id: 'ai',
    name: 'INTELLIGENCE & AI',
    icon: 'fas fa-brain',
    features: [
      { id: 'cv', name: 'CUSTOMER VALUE', desc: 'Lifetime value & profitability', icon: 'fas fa-gem' },
      { id: 'forecast', name: 'BALANCE FORECAST', desc: 'Predictive account balances', icon: 'fas fa-chart-area' },
      { id: 'outcomes', name: 'BUSINESS OUTCOMES', desc: 'Goal tracking and projections', icon: 'fas fa-bullseye' },
      { id: 'lifecycle', name: 'LIFECYCLE', desc: 'Customer journey prediction', icon: 'fas fa-recycle' },
      { id: 'models', name: 'MODEL PERFORMANCE', desc: 'AI model monitoring and drift', icon: 'fas fa-robot' }
    ]
  },
  {
    id: 'ops',
    name: 'OPERATIONS',
    icon: 'fas fa-briefcase',
    features: [
      { id: 'branch', name: 'BRANCH MANAGER', desc: 'Branch-level performance dashboard', icon: 'fas fa-store' },
      { id: 'portfolio', name: 'PORTFOLIO OVERVIEW', desc: 'Global portfolio metrics', icon: 'fas fa-globe' },
      { id: 'customer', name: 'CUSTOMER DETAIL', desc: 'Deep dive customer view', icon: 'fas fa-user-circle' },
      { id: 'my', name: 'MY CUSTOMERS', desc: 'Assigned customer list', icon: 'fas fa-users' }
    ]
  },
  {
    id: 'settings',
    name: 'SETTINGS & ADMIN',
    icon: 'fas fa-sliders-h',
    features: [
      { id: 'global', name: 'GLOBAL SETTINGS', desc: 'System-wide configurations', icon: 'fas fa-cog' },
      { id: 'users', name: 'USER MANAGEMENT', desc: 'Roles, permissions and users', icon: 'fas fa-users-cog' },
      { id: 'subaccounts', name: 'SUB ACCOUNTS', desc: 'Manage sub-entities', icon: 'fas fa-sitemap' },
      { id: 'profile', name: 'MY PROFILE', desc: 'Personal settings and security', icon: 'fas fa-user-shield' }
    ]
  }
]

const activeModuleData = computed(() => {
  return actualModules.find(m => m.id === activeModalModule.value) || actualModules[0]
})
'''

# Find the end of the script variables
script_pattern = re.compile(r"(const roleForm = ref\(\{ role_name: '', description: '' \}\))")
content = script_pattern.sub(r"\1\n" + script_addition, content)

# 2. Update the HTML modal body
new_body = '''        <!-- Body -->
        <div class="flex-1 overflow-hidden flex flex-col md:flex-row">
          
          <!-- Left Column (Modules & Main Permissions) -->
          <div class="w-full md:w-80 flex flex-col border-r border-gray-100 bg-gray-50/30 shrink-0 h-[60vh] md:h-auto overflow-y-auto">
            
            <!-- Modules Section -->
            <div class="p-5 flex-1">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2 text-absa-passion">
                  <i class="fas fa-th-large text-xs"></i>
                  <span class="text-[10px] font-black uppercase tracking-widest text-gray-900">MODULES</span>
                </div>
                <span class="text-[9px] font-mono font-bold text-absa-passion uppercase tracking-widest">{{ actualModules.length }} ENABLED</span>
              </div>
              
              <div class="flex flex-col space-y-1">
                <button 
                  v-for="mod in actualModules" 
                  :key="mod.id"
                  @click="activeModalModule = mod.id"
                  :class="['w-full flex items-center justify-between p-3 transition-colors group text-left border', activeModalModule === mod.id ? 'bg-red-50 border-absa-passion' : 'bg-white border-gray-100 hover:border-absa-passion']"
                >
                  <div class="flex items-center gap-3">
                    <i :class="[mod.icon, 'text-xs w-4', activeModalModule === mod.id ? 'text-absa-passion' : 'text-gray-400 group-hover:text-absa-passion']"></i>
                    <span :class="['text-[10px] font-black uppercase tracking-wider', activeModalModule === mod.id ? 'text-absa-passion' : 'text-gray-700 group-hover:text-gray-900']">{{ mod.name }}</span>
                  </div>
                  <span :class="['text-[9px] font-mono font-bold px-1.5 py-0.5', activeModalModule === mod.id ? 'text-white bg-absa-passion' : 'text-absa-passion bg-red-50']">{{ mod.features.length }}/{{ mod.features.length }}</span>
                </button>
              </div>
            </div>

            <!-- Main Permissions Grid -->
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
            </div>
          </div>
          
          <!-- Right Column (Feature Access) -->
          <div class="flex-1 bg-gray-50/50 flex flex-col h-[60vh] md:h-auto overflow-hidden">
            <div class="flex justify-between items-center p-5 border-b border-gray-100 bg-white shrink-0">
              <div class="flex items-center gap-2 text-absa-passion">
                <i class="fas fa-puzzle-piece text-xs"></i>
                <span class="text-[10px] font-black uppercase tracking-widest text-gray-900">FEATURE ACCESS</span>
              </div>
              <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">{{ activeModuleData.name }}</span>
            </div>
            
            <div class="p-6 overflow-y-auto flex-1">
              <div class="bg-white border border-gray-100 p-6 shadow-sm rounded-sm">
                <div class="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                  <i :class="[activeModuleData.icon, 'text-gray-400 text-sm']"></i>
                  <h3 class="text-xs font-black text-gray-900 uppercase tracking-wider">{{ activeModuleData.name }} FEATURE ACCESS</h3>
                </div>
                
                <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  <label v-for="feat in activeModuleData.features" :key="feat.id" class="flex items-start gap-3 p-4 border border-gray-100 hover:border-absa-passion transition-colors cursor-pointer group rounded-sm">
                    <div class="w-4 h-4 mt-0.5 bg-absa-passion rounded-sm flex items-center justify-center text-white shadow-sm border border-absa-passion shrink-0">
                      <i class="fas fa-check text-[10px]"></i>
                    </div>
                    <div>
                      <div class="flex items-center gap-2">
                        <i :class="[feat.icon, 'text-absa-passion text-[10px]']"></i>
                        <span class="text-[11px] font-black text-gray-900 uppercase tracking-wider">{{ feat.name }}</span>
                      </div>
                      <p class="text-[10px] font-mono text-gray-500 mt-1">{{ feat.desc }}</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>'''

body_pattern = re.compile(r"<!-- Body -->.*?</div>\s*<!-- Footer -->", re.DOTALL)
content = body_pattern.sub(new_body + "\n\n        <!-- Footer -->", content)

header_pattern = re.compile(r"15 MODULES AVAILABLE")
content = header_pattern.sub("{{ actualModules.length }} MODULES AVAILABLE", content)

with open('src/views/Modules/settings/UserManagement.vue', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated modules and interactive state.")
