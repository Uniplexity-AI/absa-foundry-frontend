import re

with open('src/views/Modules/settings/UserManagement.vue', 'r', encoding='utf-8') as f:
    content = f.read()

new_modal = '''    <!-- Role Details Modal (EDIT ROLE) -->
    <div v-if="selectedRole" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-md" @click.self="closeRoleDetails">
      <div class="bg-white border-t-4 border-absa-passion shadow-2xl w-full max-w-7xl max-h-[95vh] flex flex-col relative overflow-hidden">
        
        <!-- Header -->
        <div class="flex justify-between items-start p-6 border-b border-gray-100 bg-gray-50/50">
          <div>
            <div class="flex items-center gap-2">
              <div class="w-1 h-5 bg-absa-passion"></div>
              <h2 class="text-lg font-black text-gray-900 uppercase tracking-tight font-display">EDIT ROLE</h2>
            </div>
            <p class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mt-2">CONFIGURE MODULE ACCESS AND GRANULAR TOOL TOGGLES</p>
          </div>
          <div class="flex items-center gap-4">
            <span class="px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-mono font-bold uppercase tracking-widest rounded-sm">15 MODULES AVAILABLE</span>
            <button @click="closeRoleDetails" class="text-gray-400 hover:text-absa-passion transition-colors"><i class="fas fa-times text-lg"></i></button>
          </div>
        </div>

        <!-- Body -->
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
                <span class="text-[9px] font-mono font-bold text-absa-passion uppercase tracking-widest">15 ENABLED</span>
              </div>
              
              <div class="flex flex-col space-y-1">
                <!-- Procurement -->
                <button class="w-full flex items-center justify-between p-3 bg-white border border-gray-100 hover:border-absa-passion transition-colors group text-left">
                  <div class="flex items-center gap-3">
                    <i class="fas fa-truck-loading text-gray-400 group-hover:text-absa-passion text-xs w-4"></i>
                    <span class="text-[10px] font-black text-gray-700 group-hover:text-gray-900 uppercase tracking-wider">PROCUREMENT</span>
                  </div>
                  <span class="text-[9px] font-mono font-bold text-absa-passion bg-red-50 px-1.5 py-0.5">7/7</span>
                </button>
                
                <!-- Billing (Active) -->
                <button class="w-full flex items-center justify-between p-3 bg-red-50 border border-absa-passion transition-colors group text-left">
                  <div class="flex items-center gap-3">
                    <i class="fas fa-file-invoice-dollar text-absa-passion text-xs w-4"></i>
                    <span class="text-[10px] font-black text-absa-passion uppercase tracking-wider">BILLING</span>
                  </div>
                  <span class="text-[9px] font-mono font-bold text-white bg-absa-passion px-1.5 py-0.5">7/7</span>
                </button>

                <!-- Reports & Analytics -->
                <button class="w-full flex items-center justify-between p-3 bg-white border border-gray-100 hover:border-absa-passion transition-colors group text-left">
                  <div class="flex items-center gap-3">
                    <i class="fas fa-chart-pie text-gray-400 group-hover:text-absa-passion text-xs w-4"></i>
                    <span class="text-[10px] font-black text-gray-700 group-hover:text-gray-900 uppercase tracking-wider">REPORTS & ANALYTICS</span>
                  </div>
                  <span class="text-[9px] font-mono font-bold text-absa-passion bg-red-50 px-1.5 py-0.5">6/7</span>
                </button>
                
                <!-- Settings -->
                <button class="w-full flex items-center justify-between p-3 bg-white border border-gray-100 hover:border-absa-passion transition-colors group text-left">
                  <div class="flex items-center gap-3">
                    <i class="fas fa-cog text-gray-400 group-hover:text-absa-passion text-xs w-4"></i>
                    <span class="text-[10px] font-black text-gray-700 group-hover:text-gray-900 uppercase tracking-wider">SETTINGS</span>
                  </div>
                  <span class="text-[9px] font-mono font-bold text-absa-passion bg-red-50 px-1.5 py-0.5">6/7</span>
                </button>

                <!-- Expenses -->
                <button class="w-full flex items-center justify-between p-3 bg-white border border-gray-100 hover:border-absa-passion transition-colors group text-left">
                  <div class="flex items-center gap-3">
                    <i class="fas fa-receipt text-gray-400 group-hover:text-absa-passion text-xs w-4"></i>
                    <span class="text-[10px] font-black text-gray-700 group-hover:text-gray-900 uppercase tracking-wider">EXPENSES</span>
                  </div>
                  <span class="text-[9px] font-mono font-bold text-absa-passion bg-red-50 px-1.5 py-0.5">6/7</span>
                </button>
                
                <!-- HR Module -->
                <button class="w-full flex items-center justify-between p-3 bg-white border border-gray-100 hover:border-absa-passion transition-colors group text-left">
                  <div class="flex items-center gap-3">
                    <i class="fas fa-users-cog text-gray-400 group-hover:text-absa-passion text-xs w-4"></i>
                    <span class="text-[10px] font-black text-gray-700 group-hover:text-gray-900 uppercase tracking-wider">HR MODULE</span>
                  </div>
                  <span class="text-[9px] font-mono font-bold text-absa-passion bg-red-50 px-1.5 py-0.5">7/7</span>
                </button>
                
                <!-- CRM -->
                <button class="w-full flex items-center justify-between p-3 bg-white border border-gray-100 hover:border-absa-passion transition-colors group text-left">
                  <div class="flex items-center gap-3">
                    <i class="fas fa-address-book text-gray-400 group-hover:text-absa-passion text-xs w-4"></i>
                    <span class="text-[10px] font-black text-gray-700 group-hover:text-gray-900 uppercase tracking-wider">CRM</span>
                  </div>
                  <span class="text-[9px] font-mono font-bold text-absa-passion bg-red-50 px-1.5 py-0.5">7/7</span>
                </button>

                <!-- ZRA TAX -->
                <button class="w-full flex items-center justify-between p-3 bg-white border border-gray-100 hover:border-absa-passion transition-colors group text-left">
                  <div class="flex items-center gap-3">
                    <i class="fas fa-file-invoice text-gray-400 group-hover:text-absa-passion text-xs w-4"></i>
                    <span class="text-[10px] font-black text-gray-700 group-hover:text-gray-900 uppercase tracking-wider">ZRA TAX</span>
                  </div>
                  <span class="text-[9px] font-mono font-bold text-absa-passion bg-red-50 px-1.5 py-0.5">6/7</span>
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
                <label class="flex items-center gap-2 cursor-pointer group">
                  <div class="w-4 h-4 bg-absa-passion rounded-sm flex items-center justify-center text-white shadow-sm border border-absa-passion">
                    <i class="fas fa-check text-[10px]"></i>
                  </div>
                  <span class="text-[10px] font-black text-gray-700 group-hover:text-gray-900 uppercase tracking-wider">READ</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer group">
                  <div class="w-4 h-4 bg-absa-passion rounded-sm flex items-center justify-center text-white shadow-sm border border-absa-passion">
                    <i class="fas fa-check text-[10px]"></i>
                  </div>
                  <span class="text-[10px] font-black text-gray-700 group-hover:text-gray-900 uppercase tracking-wider">WRITE</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer group">
                  <div class="w-4 h-4 bg-absa-passion rounded-sm flex items-center justify-center text-white shadow-sm border border-absa-passion">
                    <i class="fas fa-check text-[10px]"></i>
                  </div>
                  <span class="text-[10px] font-black text-gray-700 group-hover:text-gray-900 uppercase tracking-wider">EDIT</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer group">
                  <div class="w-4 h-4 bg-absa-passion rounded-sm flex items-center justify-center text-white shadow-sm border border-absa-passion">
                    <i class="fas fa-check text-[10px]"></i>
                  </div>
                  <span class="text-[10px] font-black text-gray-700 group-hover:text-gray-900 uppercase tracking-wider">DELETE</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer group">
                  <div class="w-4 h-4 bg-absa-passion rounded-sm flex items-center justify-center text-white shadow-sm border border-absa-passion">
                    <i class="fas fa-check text-[10px]"></i>
                  </div>
                  <span class="text-[10px] font-black text-gray-700 group-hover:text-gray-900 uppercase tracking-wider">ASSIGN</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer group">
                  <div class="w-4 h-4 bg-absa-passion rounded-sm flex items-center justify-center text-white shadow-sm border border-absa-passion">
                    <i class="fas fa-check text-[10px]"></i>
                  </div>
                  <span class="text-[10px] font-black text-gray-700 group-hover:text-gray-900 uppercase tracking-wider">APPROVE</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer group">
                  <div class="w-4 h-4 bg-absa-passion rounded-sm flex items-center justify-center text-white shadow-sm border border-absa-passion">
                    <i class="fas fa-check text-[10px]"></i>
                  </div>
                  <span class="text-[10px] font-black text-gray-700 group-hover:text-gray-900 uppercase tracking-wider">EXPORT</span>
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
              <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">BILLING</span>
            </div>
            
            <div class="p-6 overflow-y-auto flex-1">
              <div class="bg-white border border-gray-100 p-6 shadow-sm rounded-sm">
                <div class="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                  <i class="fas fa-file-invoice-dollar text-gray-400 text-sm"></i>
                  <h3 class="text-xs font-black text-gray-900 uppercase tracking-wider">BILLING FEATURE ACCESS</h3>
                </div>
                
                <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  <!-- INVOICES -->
                  <label class="flex items-start gap-3 p-4 border border-gray-100 hover:border-absa-passion transition-colors cursor-pointer group rounded-sm">
                    <div class="w-4 h-4 mt-0.5 bg-absa-passion rounded-sm flex items-center justify-center text-white shadow-sm border border-absa-passion shrink-0">
                      <i class="fas fa-check text-[10px]"></i>
                    </div>
                    <div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-file-invoice text-absa-passion text-[10px]"></i>
                        <span class="text-[11px] font-black text-gray-900 uppercase tracking-wider">INVOICES</span>
                      </div>
                      <p class="text-[10px] font-mono text-gray-500 mt-1">Create, edit and manage tax invoices</p>
                    </div>
                  </label>
                  
                  <!-- QUOTATIONS -->
                  <label class="flex items-start gap-3 p-4 border border-gray-100 hover:border-absa-passion transition-colors cursor-pointer group rounded-sm">
                    <div class="w-4 h-4 mt-0.5 bg-absa-passion rounded-sm flex items-center justify-center text-white shadow-sm border border-absa-passion shrink-0">
                      <i class="fas fa-check text-[10px]"></i>
                    </div>
                    <div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-quote-right text-absa-passion text-[10px]"></i>
                        <span class="text-[11px] font-black text-gray-900 uppercase tracking-wider">QUOTATIONS</span>
                      </div>
                      <p class="text-[10px] font-mono text-gray-500 mt-1">Quotations, pricing proposals & conversion</p>
                    </div>
                  </label>

                  <!-- PROPOSALS -->
                  <label class="flex items-start gap-3 p-4 border border-gray-100 hover:border-absa-passion transition-colors cursor-pointer group rounded-sm">
                    <div class="w-4 h-4 mt-0.5 bg-absa-passion rounded-sm flex items-center justify-center text-white shadow-sm border border-absa-passion shrink-0">
                      <i class="fas fa-check text-[10px]"></i>
                    </div>
                    <div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-file-signature text-absa-passion text-[10px]"></i>
                        <span class="text-[11px] font-black text-gray-900 uppercase tracking-wider">PROPOSALS</span>
                      </div>
                      <p class="text-[10px] font-mono text-gray-500 mt-1">Client proposals & scope documents</p>
                    </div>
                  </label>

                  <!-- CONTRACTS -->
                  <label class="flex items-start gap-3 p-4 border border-gray-100 hover:border-absa-passion transition-colors cursor-pointer group rounded-sm">
                    <div class="w-4 h-4 mt-0.5 bg-absa-passion rounded-sm flex items-center justify-center text-white shadow-sm border border-absa-passion shrink-0">
                      <i class="fas fa-check text-[10px]"></i>
                    </div>
                    <div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-file-contract text-absa-passion text-[10px]"></i>
                        <span class="text-[11px] font-black text-gray-900 uppercase tracking-wider">CONTRACTS</span>
                      </div>
                      <p class="text-[10px] font-mono text-gray-500 mt-1">Contracts, terms & signatories</p>
                    </div>
                  </label>

                  <!-- RECURRING -->
                  <label class="flex items-start gap-3 p-4 border border-gray-100 hover:border-absa-passion transition-colors cursor-pointer group rounded-sm">
                    <div class="w-4 h-4 mt-0.5 bg-absa-passion rounded-sm flex items-center justify-center text-white shadow-sm border border-absa-passion shrink-0">
                      <i class="fas fa-check text-[10px]"></i>
                    </div>
                    <div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-sync-alt text-absa-passion text-[10px]"></i>
                        <span class="text-[11px] font-black text-gray-900 uppercase tracking-wider">RECURRING</span>
                      </div>
                      <p class="text-[10px] font-mono text-gray-500 mt-1">Recurring invoice schedules & templates</p>
                    </div>
                  </label>

                  <!-- BILLING REPORT -->
                  <label class="flex items-start gap-3 p-4 border border-gray-100 hover:border-absa-passion transition-colors cursor-pointer group rounded-sm">
                    <div class="w-4 h-4 mt-0.5 bg-absa-passion rounded-sm flex items-center justify-center text-white shadow-sm border border-absa-passion shrink-0">
                      <i class="fas fa-check text-[10px]"></i>
                    </div>
                    <div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-chart-bar text-absa-passion text-[10px]"></i>
                        <span class="text-[11px] font-black text-gray-900 uppercase tracking-wider">BILLING REPORT</span>
                      </div>
                      <p class="text-[10px] font-mono text-gray-500 mt-1">Billing summaries & revenue reporting</p>
                    </div>
                  </label>

                  <!-- REPORTS -->
                  <label class="flex items-start gap-3 p-4 border border-gray-100 hover:border-absa-passion transition-colors cursor-pointer group rounded-sm">
                    <div class="w-4 h-4 mt-0.5 bg-absa-passion rounded-sm flex items-center justify-center text-white shadow-sm border border-absa-passion shrink-0">
                      <i class="fas fa-check text-[10px]"></i>
                    </div>
                    <div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-chart-line text-absa-passion text-[10px]"></i>
                        <span class="text-[11px] font-black text-gray-900 uppercase tracking-wider">REPORTS</span>
                      </div>
                      <p class="text-[10px] font-mono text-gray-500 mt-1">Progress reports & document analytics</p>
                    </div>
                  </label>

                  <!-- RECEIPTS -->
                  <label class="flex items-start gap-3 p-4 border border-gray-100 hover:border-absa-passion transition-colors cursor-pointer group rounded-sm">
                    <div class="w-4 h-4 mt-0.5 bg-absa-passion rounded-sm flex items-center justify-center text-white shadow-sm border border-absa-passion shrink-0">
                      <i class="fas fa-check text-[10px]"></i>
                    </div>
                    <div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-receipt text-absa-passion text-[10px]"></i>
                        <span class="text-[11px] font-black text-gray-900 uppercase tracking-wider">RECEIPTS</span>
                      </div>
                      <p class="text-[10px] font-mono text-gray-500 mt-1">Issued receipts, POS sales & invoice conversions</p>
                    </div>
                  </label>

                  <!-- CREDIT/DEBIT NOTES -->
                  <label class="flex items-start gap-3 p-4 border border-gray-100 hover:border-absa-passion transition-colors cursor-pointer group rounded-sm">
                    <div class="w-4 h-4 mt-0.5 bg-absa-passion rounded-sm flex items-center justify-center text-white shadow-sm border border-absa-passion shrink-0">
                      <i class="fas fa-check text-[10px]"></i>
                    </div>
                    <div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-exchange-alt text-absa-passion text-[10px]"></i>
                        <span class="text-[11px] font-black text-gray-900 uppercase tracking-wider">CREDIT/DEBIT NOTES</span>
                      </div>
                      <p class="text-[10px] font-mono text-gray-500 mt-1">Adjustments, returns & cancellations</p>
                    </div>
                  </label>

                  <!-- BANK ACCOUNTS -->
                  <label class="flex items-start gap-3 p-4 border border-gray-100 hover:border-absa-passion transition-colors cursor-pointer group rounded-sm">
                    <div class="w-4 h-4 mt-0.5 bg-absa-passion rounded-sm flex items-center justify-center text-white shadow-sm border border-absa-passion shrink-0">
                      <i class="fas fa-check text-[10px]"></i>
                    </div>
                    <div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-university text-absa-passion text-[10px]"></i>
                        <span class="text-[11px] font-black text-gray-900 uppercase tracking-wider">BANK ACCOUNTS</span>
                      </div>
                      <p class="text-[10px] font-mono text-gray-500 mt-1">Company bank accounts for payments</p>
                    </div>
                  </label>

                  <!-- ALL DOCS -->
                  <label class="flex items-start gap-3 p-4 border border-gray-100 hover:border-absa-passion transition-colors cursor-pointer group rounded-sm">
                    <div class="w-4 h-4 mt-0.5 bg-absa-passion rounded-sm flex items-center justify-center text-white shadow-sm border border-absa-passion shrink-0">
                      <i class="fas fa-check text-[10px]"></i>
                    </div>
                    <div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-folder-open text-absa-passion text-[10px]"></i>
                        <span class="text-[11px] font-black text-gray-900 uppercase tracking-wider">ALL DOCS</span>
                      </div>
                      <p class="text-[10px] font-mono text-gray-500 mt-1">Unified document register across the module</p>
                    </div>
                  </label>
                  
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 shrink-0">
          <button @click="closeRoleDetails" class="px-5 py-2.5 bg-white border border-gray-200 text-gray-600 text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-colors">CANCEL</button>
          <button @click="closeRoleDetails" class="px-5 py-2.5 bg-absa-passion text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#b3002d] transition-colors shadow-md">UPDATE ROLE</button>
        </div>
      </div>
    </div>'''

start_marker = "<!-- Role Details Modal -->"
end_marker = "<!-- Create User Modal -->"

pattern = re.compile(rf"{re.escape(start_marker)}.*?{re.escape(end_marker)}", re.DOTALL)

if pattern.search(content):
    new_content = pattern.sub(new_modal + "\n\n    " + end_marker, content)
    with open('src/views/Modules/settings/UserManagement.vue', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Modal successfully replaced.")
else:
    print("Could not find the target section to replace.")
