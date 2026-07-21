<template>
  <div class="w-full space-y-4">

    <!-- Skeleton Loading -->
    <div v-if="loading" class="space-y-4 w-full animate-pulse">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="h-4 w-40 bg-gray-200 rounded-sm"></div>
          <div class="h-3 w-36 bg-gray-100 rounded-sm"></div>
        </div>
        <div class="h-8 w-28 bg-gray-200 rounded-sm"></div>
      </div>
      <div class="flex gap-3">
        <div class="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div v-for="i in 4" :key="i" class="h-24 bg-gray-100 rounded-sm"></div>
        </div>
        <div class="w-72 space-y-2">
          <div class="h-10 bg-gray-100 rounded-sm"></div>
          <div class="h-8 bg-gray-100 rounded-sm"></div>
        </div>
      </div>
      <div class="flex gap-3">
        <div v-for="col in 3" :key="col" class="flex-1 space-y-2">
          <div class="h-6 bg-gray-200 rounded-sm"></div>
          <div v-for="r in 3" :key="r" class="h-16 bg-gray-100 rounded-sm"></div>
        </div>
      </div>
    </div>

    <!-- Title + Collapsible toggle -->
    <div class="bg-white border border-gray-200 rounded-sm overflow-hidden">
      <div
        class="px-3 sm:px-4 py-2 flex items-center justify-between bg-gray-50/50 cursor-pointer select-none"
        @click="isAccountsSectionVisible = !isAccountsSectionVisible"
      >
        <div class="flex items-center gap-2">
          <div class="w-1 h-4 bg-[#2F2E8B]"></div>
          <h3 class="text-[10px] font-black text-gray-900 uppercase tracking-widest font-mono">Account_Registry</h3>
        </div>
        <div class="flex items-center gap-2">
          <button @click.stop="openBulkUpload"
            class="px-3 py-1.5 border border-gray-200 text-gray-500 hover:text-[#2F2E8B] hover:border-[#2F2E8B] transition flex items-center gap-1.5 font-mono font-bold uppercase text-[8px] tracking-widest rounded-sm">
            <Download :size="10" /> Bulk Import
          </button>          <button @click.stop="handleExportAccounts"
            class="px-3 py-1.5 border border-gray-200 text-gray-500 hover:text-green-600 hover:border-green-500 transition flex items-center gap-1.5 font-mono font-bold uppercase text-[8px] tracking-widest rounded-sm">
            <Download :size="10" /> Export
          </button>
          <button @click.stop="toggleExcelEdit" :disabled="savingExcel"
            class="px-3 py-1.5 border transition flex items-center gap-1.5 font-mono font-bold uppercase text-[8px] tracking-widest rounded-sm"
            :class="isExcelEditing ? 'bg-green-600 text-white border-green-600 hover:bg-green-700 disabled:opacity-50' : 'border-gray-200 text-gray-500 hover:text-orange-600 hover:border-orange-500'">
            <Loader2 v-if="savingExcel" :size="10" class="animate-spin" />
            <FileSpreadsheet v-else :size="10" /> {{ savingExcel ? 'Saving...' : (isExcelEditing ? 'Save All' : 'Excel Edit') }}
          </button>
          <input ref="excelImportRef" type="file" accept=".xlsx,.xls" class="hidden" @change="onExcelImport" />          <button @click.stop="openCreateModal"
            class="px-3 py-1.5 bg-[#2F2E8B] text-white hover:bg-[#3D2F88] transition flex items-center gap-1.5 font-mono font-bold uppercase text-[8px] rounded-sm tracking-widest">
            <Plus :size="10" /> Add_Account
          </button>
          <button @click.stop="isAccountsSectionVisible = !isAccountsSectionVisible"
            class="flex items-center gap-1.5 px-2 py-1 rounded-sm text-[8px] font-mono font-bold uppercase tracking-widest transition border hover:bg-gray-100"
            :class="isAccountsSectionVisible ? 'text-gray-500 border-gray-200' : 'text-[#2F2E8B] border-indigo-200 bg-indigo-50/50'"
          >
            <Eye v-if="isAccountsSectionVisible" :size="12" />
            <EyeOff v-else :size="12" />
            {{ isAccountsSectionVisible ? 'Hide' : 'Show' }}
          </button>
        </div>
      </div>

      <div v-show="isAccountsSectionVisible" class="flex flex-col gap-3 p-3 sm:p-4 transition-all duration-300">
        <!-- KPIs + Filters side by side -->
        <div class="flex flex-col lg:flex-row gap-3">
          <!-- Left: KPI Cards (3 rows x 2 cols = 6 cards compact) -->
          <div class="lg:w-1/2 xl:w-2/5 space-y-2">
            <div class="flex items-center gap-1">
              <p class="text-[8px] font-mono font-bold text-gray-700 uppercase tracking-widest">
                Total: <span class="font-black text-[#2F2E8B]">{{ totalAccounts }}</span>
                <span v-if="totalAccounts > 0"> // {{ pageStart }}-{{ pageEnd }}</span>
              </p>
            </div>
            <div class="grid grid-cols-2 gap-1.5">
              <div class="relative overflow-hidden bg-gradient-to-br from-[#2F2E8B] to-[#1f1e6b] text-white rounded-sm shadow-sm">
                <div class="px-2.5 py-1.5">
                  <div class="flex items-center justify-between">
                    <span class="text-[7px] font-mono font-bold text-white/60 uppercase tracking-[0.15em]">Total</span>
                    <Building :size="9" class="text-white/40" />
                  </div>
                  <div class="text-base font-black tracking-tight mt-0.5">{{ stats.total }}</div>
                  <div class="text-[6px] font-mono text-white/50 uppercase tracking-widest">Active</div>
                </div>
              </div>
              <div class="relative overflow-hidden bg-white border border-gray-200 rounded-sm shadow-sm">
                <div class="px-2.5 py-1.5">
                  <div class="flex items-center justify-between">
                    <span class="text-[7px] font-mono font-bold text-gray-700 uppercase tracking-[0.15em]">Contacts</span>
                    <Users :size="9" class="text-purple-400" />
                  </div>
                  <div class="text-base font-black text-purple-700 tracking-tight mt-0.5">{{ stats.withContacts }}</div>
                  <div class="text-[6px] font-mono font-bold text-gray-500 uppercase tracking-widest">Linked</div>
                </div>
              </div>
              <div class="relative overflow-hidden bg-white border border-gray-200 rounded-sm shadow-sm">
                <div class="px-2.5 py-1.5">
                  <div class="flex items-center justify-between">
                    <span class="text-[7px] font-mono font-bold text-gray-700 uppercase tracking-[0.15em]">From Leads</span>
                    <ArrowRightLeft :size="9" class="text-emerald-400" />
                  </div>
                  <div class="text-base font-black text-emerald-700 tracking-tight mt-0.5">{{ stats.converted }}</div>
                  <div class="text-[6px] font-mono font-bold text-gray-500 uppercase tracking-widest">Converted</div>
                </div>
              </div>
              <div class="relative overflow-hidden bg-white border border-gray-200 rounded-sm shadow-sm">
                <div class="px-2.5 py-1.5">
                  <div class="flex items-center justify-between">
                    <span class="text-[7px] font-mono font-bold text-gray-700 uppercase tracking-[0.15em]">This Month</span>
                    <CalendarPlus :size="9" class="text-orange-400" />
                  </div>
                  <div class="text-base font-black text-orange-700 tracking-tight mt-0.5">{{ stats.thisMonth }}</div>
                  <div class="text-[6px] font-mono font-bold text-gray-500 uppercase tracking-widest">Recent</div>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-1.5">
              <div class="relative overflow-hidden bg-white border border-gray-200 rounded-sm shadow-sm">
                <div class="px-2.5 py-1.5">
                  <div class="flex items-center justify-between">
                    <span class="text-[7px] font-mono font-bold text-gray-700 uppercase tracking-[0.15em]">Deal Values</span>
                    <TrendingUp :size="9" class="text-blue-400" />
                  </div>
                  <div class="text-base font-black text-gray-900 tracking-tight mt-0.5">{{ formatMoney(kpiPipelineValue) }}</div>
                  <div class="text-[6px] font-mono font-bold text-gray-500 uppercase tracking-widest">Pipeline</div>
                </div>
              </div>
              <div class="relative overflow-hidden bg-white border border-gray-200 rounded-sm shadow-sm">
                <div class="px-2.5 py-1.5">
                  <div class="flex items-center justify-between">
                    <span class="text-[7px] font-mono font-bold text-gray-700 uppercase tracking-[0.15em]">Won Revenue</span>
                    <DollarSign :size="9" class="text-emerald-400" />
                  </div>
                  <div class="text-base font-black text-gray-900 tracking-tight mt-0.5">{{ formatMoney(kpiWonRevenue) }}</div>
                  <div class="text-[6px] font-mono font-bold text-gray-500 uppercase tracking-widest">Closed-Won</div>
                </div>
              </div>
              <div class="relative overflow-hidden bg-white border border-gray-200 rounded-sm shadow-sm">
                <div class="px-2.5 py-1.5">
                  <div class="flex items-center justify-between">
                    <span class="text-[7px] font-mono font-bold text-gray-700 uppercase tracking-[0.15em]">CAC</span>
                    <Target :size="9" class="text-purple-400" />
                  </div>
                  <div class="text-base font-black text-gray-900 tracking-tight mt-0.5">{{ formatMoney(kpiCAC) }}</div>
                  <div class="text-[6px] font-mono font-bold text-gray-500 uppercase tracking-widest">Avg/Won</div>
                </div>
              </div>
              <div class="relative overflow-hidden bg-white border border-gray-200 rounded-sm shadow-sm">
                <div class="px-2.5 py-1.5">
                  <div class="flex items-center justify-between">
                    <span class="text-[7px] font-mono font-bold text-gray-700 uppercase tracking-[0.15em]">Maintenance</span>
                    <AlertTriangle :size="9" class="text-red-300" />
                  </div>
                  <div class="text-base font-black text-gray-900 tracking-tight mt-0.5">{{ kpiMaintenance }}</div>
                  <div class="text-[6px] font-mono font-bold text-gray-500 uppercase tracking-widest">Cancelled</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Filters -->
          <div class="lg:w-1/2 xl:w-3/5">
            <div class="bg-white border border-gray-200 rounded-sm p-2.5 space-y-2">
              <div class="flex items-center gap-1.5">
                <div class="relative flex-1 min-w-0">
                  <Search :size="10" class="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input v-model="searchQuery" @input="debouncedSearch" type="text"
                    placeholder="SEARCH..."
                    class="w-full border border-gray-200 pl-7 pr-2 py-1.5 text-[8px] font-mono font-bold uppercase tracking-widest focus:ring-1 focus:ring-[#2F2E8B]/30 focus:border-[#2F2E8B] outline-none transition-all" />
                </div>
                <select v-model="industryFilter" @change="loadAccounts"
                  class="border border-gray-200 px-2 py-1.5 text-[7px] font-mono font-bold uppercase tracking-widest focus:ring-1 focus:ring-[#2F2E8B]/30 outline-none bg-white hover:bg-gray-50 transition-all">
                  <option value="">Industry</option>
                  <option value="technology">TECH</option>
                  <option value="healthcare">HEALTH</option>
                  <option value="finance">FINANCE</option>
                  <option value="retail">RETAIL</option>
                  <option value="manufacturing">MFG</option>
                  <option value="education">EDU</option>
                  <option value="other">OTHER</option>
                </select>
                <div class="flex items-center gap-0.5 shrink-0">
                  <button @click="viewMode = 'grid'"
                    :class="viewMode === 'grid' ? 'bg-[#2F2E8B] text-white border-[#2F2E8B]' : 'bg-white text-gray-400 border-gray-200 hover:border-[#2F2E8B]'"
                    class="w-6 h-6 border rounded-sm flex items-center justify-center transition">
                    <LayoutGrid :size="8" />
                  </button>
                  <button @click="viewMode = 'list'"
                    :class="viewMode === 'list' ? 'bg-[#2F2E8B] text-white border-[#2F2E8B]' : 'bg-white text-gray-400 border-gray-200 hover:border-[#2F2E8B]'"
                    class="w-6 h-6 border rounded-sm flex items-center justify-center transition">
                    <List :size="8" />
                  </button>
                </div>
              </div>
              <div class="flex items-center gap-1.5">
                <select v-model="statusFilter" @change="loadAccounts"
                  class="border border-gray-200 px-2 py-1.5 text-[7px] font-mono font-bold uppercase tracking-widest focus:ring-1 focus:ring-[#2F2E8B]/30 outline-none bg-white hover:bg-gray-50 transition-all">
                  <option value="">Status</option>
                  <option value="active">ACTIVE</option>
                  <option value="inactive">INACTIVE</option>
                  <option value="lead">FROM LEAD</option>
                </select>
                <select v-model="assigneeFilter" @change="loadAccounts"
                  class="border border-gray-200 px-2 py-1.5 text-[7px] font-mono font-bold uppercase tracking-widest focus:ring-1 focus:ring-[#2F2E8B]/30 outline-none bg-white hover:bg-gray-50 transition-all max-w-[90px]">
                  <option value="">Assignee</option>
                  <option v-for="user in users" :key="user.email" :value="user.email.toLowerCase()">
                    {{ (user.name || user.email.split('@')[0]).toUpperCase() }}
                  </option>
                </select>
                <input v-model="dateFromFilter" type="date" @change="loadAccounts"
                  class="border border-gray-200 px-2 py-1.5 text-[7px] font-mono font-bold focus:ring-1 focus:ring-[#2F2E8B]/30 outline-none bg-white w-[100px]" />
                <span class="text-[7px] font-mono text-gray-400">→</span>
                <input v-model="dateToFilter" type="date" @change="loadAccounts"
                  class="border border-gray-200 px-2 py-1.5 text-[7px] font-mono font-bold focus:ring-1 focus:ring-[#2F2E8B]/30 outline-none bg-white w-[100px]" />
                <button v-if="searchQuery || industryFilter || statusFilter || assigneeFilter || dateFromFilter || dateToFilter"
                  @click="resetFilters"
                  class="px-2 py-1.5 border border-gray-200 text-gray-500 hover:bg-indigo-50 hover:text-[#2F2E8B] hover:border-indigo-200 text-[7px] font-mono font-bold uppercase tracking-widest transition-all flex items-center gap-1 rounded-sm">
                  <Trash2 :size="8" /> Clear
                </button>
              </div>
              <!-- Per-page + Bulk actions -->
              <div class="flex items-center justify-between gap-2 pt-1.5 border-t border-gray-100">
                <div class="flex items-center gap-1">
                  <span class="text-[7px] font-mono font-bold text-gray-400 uppercase">Rows:</span>
                  <select v-model.number="perPage" @change="currentPage = 1; loadAccounts()" class="border border-gray-200 px-1 py-0.5 text-[7px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B] bg-white">
                    <option :value="10">10</option>
                    <option :value="25">25</option>
                    <option :value="50">50</option>
                    <option :value="100">100</option>
                    <option :value="10000">All</option>
                  </select>
                </div>
                <div v-if="selectedAccountIds.length > 0" class="flex items-center gap-1.5">
                  <span class="text-[7px] font-mono font-bold text-[#2F2E8B] uppercase tracking-widest">{{ selectedAccountIds.length }} sel</span>
                  <button @click="openBulkAssign" :disabled="bulkProcessing" class="px-2 py-1 border border-[#2F2E8B] text-[#2F2E8B] hover:bg-[#2F2E8B] hover:text-white transition flex items-center gap-1 font-mono font-bold uppercase text-[6px] tracking-widest rounded-sm">
                    <Users :size="8" /> Assign
                  </button>
                  <button @click="bulkDeleteAccounts" :disabled="bulkProcessing" class="px-2 py-1 border border-red-400 text-red-500 hover:bg-red-600 hover:text-white transition flex items-center gap-1 font-mono font-bold uppercase text-[6px] tracking-widest rounded-sm">
                    <Trash2 :size="8" /> Delete
                  </button>
                  <button @click="clearSelection" class="text-[6px] font-mono font-bold text-gray-400 hover:text-red-500 uppercase tracking-widest underline">Clear</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bulk Assign Modal -->
    <Teleport to="body">
      <div v-if="showBulkAssignModal" class="fixed inset-0 z-[500] flex items-center justify-center bg-black/60 backdrop-blur-sm" @click.self="showBulkAssignModal = false">
        <div class="bg-white w-full max-w-sm mx-4 border border-gray-200 shadow-2xl overflow-hidden">
          <div class="h-1.5 w-full bg-gradient-to-r from-[#2F2E8B] to-blue-500"></div>
          <div class="p-6">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 bg-[#2F2E8B]/10 border border-[#2F2E8B]/20 flex items-center justify-center">
                <Users :size="16" class="text-[#2F2E8B]" />
              </div>
              <div class="flex-1">
                <p class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-0.5">Bulk Assignment</p>
                <h3 class="text-sm font-semibold text-gray-900 mb-1">Assign {{ selectedAccountIds.length }} Account{{ selectedAccountIds.length !== 1 ? 's' : '' }}</h3>
                <p class="text-[10px] font-mono text-gray-500 mb-3">Select a team member to assign all selected accounts to.</p>
                <select v-model="bulkAssignTarget" class="w-full border border-gray-200 px-3 py-2.5 text-[10px] font-mono font-bold uppercase focus:outline-none focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]/20 bg-white transition-all">
                  <option value="">Choose assignee...</option>
                  <option v-for="user in users" :key="user.email" :value="user.email">{{ (user.name || user.email).toUpperCase() }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="px-6 pb-5 flex justify-end gap-3">
            <button @click="showBulkAssignModal = false" class="px-4 py-2 text-[9px] font-mono font-bold uppercase tracking-wider border border-gray-300 text-gray-700 hover:bg-gray-50 transition rounded-sm">Cancel</button>
            <button @click="confirmBulkAssign" :disabled="!bulkAssignTarget || bulkProcessing" class="px-5 py-2 text-[9px] font-mono font-bold uppercase tracking-wider bg-[#2F2E8B] text-white hover:bg-[#3D2F88] transition disabled:opacity-50 flex items-center gap-2 rounded-sm shadow-sm">
              <Loader2 v-if="bulkProcessing" :size="11" class="animate-spin" />
              <UserPlus v-else :size="12" />
              {{ bulkProcessing ? 'Assigning...' : 'Confirm Assign' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Empty State -->
    <div v-if="!loading && accounts.length === 0"
      class="bg-white border border-gray-200 rounded-sm p-12 text-center relative overflow-hidden">
      <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
      <div class="relative z-10">
        <Building :size="48" class="text-gray-200 mx-auto mb-4" />
        <p class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">No_Accounts_Found</p>
        <p class="text-xs text-gray-400 mt-2 mb-6">{{ searchQuery ? 'TRY_ADJUSTING_FILTERS' : 'REGISTRY_EMPTY' }}</p>
        <button v-if="!searchQuery" @click="openCreateModal"
          class="px-6 py-2 rounded-sm bg-[#2F2E8B] text-white text-[10px] font-mono font-bold uppercase tracking-wider hover:bg-[#3D2F88] transition flex items-center gap-2 mx-auto">
          <Plus :size="12" /> Add_First_Account
        </button>
      </div>
    </div>

    <!-- Grid View -->
    <div v-if="!loading && accounts.length > 0 && viewMode === 'grid'" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
      <div v-for="account in accounts" :key="account.id"
        @click="viewAccount(account)"
        class="bg-white border border-gray-200 rounded-sm hover:border-[#2F2E8B]/50 hover:shadow-sm transition cursor-pointer relative overflow-hidden group">

        <!-- Card Header -->
        <div class="p-2 border-b border-gray-100 flex items-center justify-between">
          <div class="flex items-center gap-2 min-w-0">
            <div class="w-6 h-6 flex-shrink-0 rounded-sm bg-[#2F2E8B]/10 border border-[#2F2E8B]/20 flex items-center justify-center text-[#2F2E8B] font-black text-[8px] font-mono">
              {{ getInitials(account.name) }}
            </div>
            <div class="min-w-0">
              <h4 class="font-bold text-[10px] text-gray-900 uppercase tracking-tight truncate">{{ account.name }}</h4>
              <p v-if="account.industry" class="text-[7px] font-mono font-bold text-gray-600 uppercase">{{ account.industry }}</p>
            </div>
          </div>
          <span v-if="account.isConverted" class="px-1 py-0.5 bg-yellow-50 text-yellow-700 text-[7px] font-mono font-bold border border-yellow-200 uppercase shrink-0">
            Converted
          </span>
        </div>

        <!-- Card Body -->
        <div class="p-2 space-y-0.5">
          <div v-if="account.phone" class="flex items-center gap-1.5 truncate text-[8px] font-mono font-bold text-gray-800">
            <Phone :size="8" class="text-[#2F2E8B] flex-shrink-0" />
            <span>{{ account.phone }}</span>
          </div>
          <div v-if="account.email" class="flex items-center gap-1.5 truncate text-[8px] font-mono font-bold text-gray-700">
            <Mail :size="8" class="text-[#2F2E8B] flex-shrink-0" />
            <span class="truncate">{{ account.email }}</span>
          </div>
          <div v-if="account.billingCity || account.billingCountry" class="flex items-center gap-1.5 truncate text-[8px] font-mono font-bold text-gray-700">
            <MapPin :size="8" class="text-[#2F2E8B] flex-shrink-0" />
            <span class="truncate">{{ formatLocation(account) }}</span>
          </div>
        </div>

        <!-- Card Footer -->
        <div class="px-2 py-1 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
          <div class="flex items-center gap-1 text-[7px] font-mono font-bold text-gray-600">
            <Users :size="7" />
            <span>{{ getAccountContactCount(account) }}</span>
            <span class="text-gray-300">|</span>
            <CalendarIcon :size="7" />
            <span>{{ formatDate(account.createdAt) }}</span>
          </div>
          <div class="flex items-center gap-0.5" @click.stop>
            <button @click.stop="viewAccount(account)"
              class="w-5 h-5 flex items-center justify-center bg-white border border-gray-200 rounded-sm hover:border-[#2F2E8B] text-gray-400 hover:text-[#2F2E8B] transition" title="View">
              <Eye :size="7" />
            </button>
            <button @click.stop="editAccount(account)"
              class="w-5 h-5 flex items-center justify-center bg-white border border-gray-200 rounded-sm hover:border-orange-500 text-gray-400 hover:text-orange-500 transition" title="Edit">
              <Pencil :size="7" />
            </button>
            <button @click.stop="deleteAccount(account)"
              class="w-5 h-5 flex items-center justify-center bg-white border border-gray-200 rounded-sm hover:border-red-500 text-gray-400 hover:text-red-500 transition" title="Delete">
              <Trash2 :size="7" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- List View (Leads-style table) -->
    <div v-if="!loading && accounts.length > 0 && viewMode !== 'grid'" class="bg-white border border-gray-200 rounded-sm overflow-hidden flex flex-col">
      <!-- Edit Mode Toolbar -->
      <div v-if="isExcelEditing" class="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-200 px-3 py-2 flex items-center justify-between gap-2">
        <div class="flex items-center gap-2 text-[10px] font-mono font-bold text-orange-700 uppercase tracking-widest">
          <FileSpreadsheet :size="14" class="text-orange-500" />
          <span>Spreadsheet Edit — <span class="text-orange-500">{{ Object.keys(excelChanges).length }}</span> rows</span>
        </div>
        <div class="flex items-center gap-1.5">
          <button @click="deleteSelectedExcelRows" class="px-2 py-1 border border-red-300 text-red-600 hover:bg-red-50 text-[8px] font-mono font-black uppercase tracking-widest rounded-sm transition flex items-center gap-1">
            <Trash2 :size="10" /> Delete
          </button>
          <button @click="showExtractDialog = true" class="px-2 py-1 border border-blue-300 text-blue-600 hover:bg-blue-50 text-[8px] font-mono font-black uppercase tracking-widest rounded-sm transition flex items-center gap-1">
            <FileSpreadsheet :size="10" /> Extract Rows
          </button>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-100 border-collapse">
          <thead class="bg-gray-50/50">
            <tr>
              <th class="pl-3 pr-1 py-2 text-left w-9">
                <div class="flex items-center justify-center">
                  <input type="checkbox" v-model="allSelected" class="rounded-sm border-gray-300 text-[#2F2E8B] focus:ring-[#2F2E8B] w-3 h-3 cursor-pointer" />
                </div>
              </th>
              <th class="px-2.5 py-2 text-left text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.15em]">Account</th>
              <th class="px-2.5 py-2 text-left text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.15em]">Industry</th>
              <th class="px-2.5 py-2 text-left text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.15em]">Phone</th>
              <th class="px-2.5 py-2 text-left text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.15em]">Location</th>
              <th class="px-2.5 py-2 text-left text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.15em]">Contacts</th>
              <th class="px-2.5 py-2 text-left text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.15em]">Assignee</th>
              <th class="px-2.5 py-2 text-left text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.15em]">Created</th>
              <th class="px-2.5 py-2 text-right text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.15em]">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-100">
            <tr v-for="account in accounts" :key="account.id || account._id"
              @click="isExcelEditing ? null : viewAccount(account)"
              class="hover:bg-gray-50/50 transition-colors group"
              :class="{ 'cursor-pointer': !isExcelEditing, 'bg-orange-50/20': isExcelEditing }">
              <td class="pl-3 pr-1 py-2 whitespace-nowrap">
                <div class="flex items-center justify-center">
                  <input type="checkbox" :checked="selectedAccountIds.includes(account.id)" @click.stop="toggleAccountSelection(account.id)" class="rounded-sm border-gray-300 text-[#2F2E8B] focus:ring-[#2F2E8B] w-3 h-3 cursor-pointer" />
                </div>
              </td>
              <td class="px-2.5 py-2 whitespace-nowrap" :class="{ 'py-3': isExcelEditing }">
                <div class="flex items-center gap-2">
                  <div class="flex-shrink-0 h-7 w-7">
                    <div class="h-7 w-7 rounded-sm bg-gray-50 border border-gray-100 flex items-center justify-center text-[#2F2E8B] font-mono font-black text-[11px]">
                      {{ getInitials(account.name) }}
                    </div>
                  </div>
                  <div>
                    <input v-if="isExcelEditing" :value="getExcelValue(account, 'name')" @input="setExcelValue(account, 'name', $event.target.value)" @click.stop
                      class="w-56 px-3 py-2 text-sm font-mono font-bold text-gray-900 uppercase border-2 border-orange-400 bg-orange-50 focus:outline-none focus:border-orange-600 focus:bg-white focus:shadow-md rounded-md" />
                    <div v-else class="text-[11px] font-mono font-bold text-gray-900 uppercase tracking-tight cursor-pointer hover:text-[#2F2E8B]">{{ account.name }}</div>
                    <div v-if="account.isConverted" class="text-[7px] font-mono font-bold text-yellow-700 uppercase">Converted from Lead</div>
                  </div>
                </div>
              </td>
              <td class="px-2.5 py-2 whitespace-nowrap" :class="{ 'py-3': isExcelEditing }">
                <input v-if="isExcelEditing" :value="getExcelValue(account, 'industry')" @input="setExcelValue(account, 'industry', $event.target.value)" @click.stop
                  class="w-40 px-3 py-2 text-sm font-mono font-bold text-gray-700 capitalize border-2 border-orange-400 bg-orange-50 focus:outline-none focus:border-orange-600 focus:bg-white focus:shadow-md rounded-md" />
                <span v-else class="text-[11px] font-mono font-bold text-gray-700 capitalize">{{ account.industry || '—' }}</span>
              </td>
              <td class="px-2.5 py-2 whitespace-nowrap" :class="{ 'py-3': isExcelEditing }">
                <input v-if="isExcelEditing" :value="getExcelValue(account, 'phone')" @input="setExcelValue(account, 'phone', $event.target.value)" @click.stop
                  class="w-44 px-3 py-2 text-sm font-mono font-bold text-gray-800 border-2 border-orange-400 bg-orange-50 focus:outline-none focus:border-orange-600 focus:bg-white focus:shadow-md rounded-md" />
                <span v-else class="text-[11px] font-mono font-bold text-gray-800">{{ account.phone || '—' }}</span>
              </td>
              <td class="px-2.5 py-2 whitespace-nowrap text-[11px] font-mono font-bold text-gray-700 truncate max-w-[140px]">{{ formatLocation(account) }}</td>
              <td class="px-2.5 py-2 whitespace-nowrap text-[11px] font-mono font-bold text-gray-700">{{ getAccountContactCount(account) }}</td>
              <td class="px-2.5 py-2 whitespace-nowrap" :class="{ 'py-3': isExcelEditing }">
                <div class="flex items-center gap-1">
                  <input v-if="isExcelEditing" :value="getExcelValue(account, 'assignedTo')" @input="setExcelValue(account, 'assignedTo', $event.target.value)" @click.stop
                    class="w-36 px-3 py-2 text-sm font-mono font-bold border-2 border-orange-400 bg-orange-50 focus:outline-none focus:border-orange-600 focus:bg-white focus:shadow-md rounded-md" placeholder="Email" />
                  <template v-else>
                    <div class="w-5 h-5 rounded-sm bg-gray-50 flex items-center justify-center text-[8px] font-mono font-black border border-gray-100 text-gray-400 shrink-0">
                      {{ account.assignedTo ? account.assignedTo.charAt(0).toUpperCase() : '?' }}
                    </div>
                    <span class="text-[10px] font-mono font-bold text-gray-600 uppercase tracking-tight truncate max-w-[80px] block">{{ account.assignedTo ? account.assignedTo.split('@')[0] : '—' }}</span>
                  </template>
                </div>
              </td>
              <td class="px-2.5 py-2 whitespace-nowrap text-[10px] font-mono font-bold text-gray-400 uppercase">{{ formatDate(account.createdAt) }}</td>
              <td class="px-2.5 py-2 whitespace-nowrap text-right">
                <div class="flex items-center justify-end gap-0.5" @click.stop>
                  <button @click.stop="viewAccount(account)"
                    class="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-[#2F2E8B] hover:border-[#2F2E8B] rounded-sm transition-all" title="View">
                    <Eye :size="10" />
                  </button>
                  <button @click.stop="editAccount(account)"
                    class="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-orange-500 hover:border-orange-500 rounded-sm transition-all" title="Edit">
                    <Pencil :size="10" />
                  </button>
                  <button @click.stop="deleteAccount(account)"
                    class="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-500 rounded-sm transition-all" title="Delete">
                    <Trash2 :size="10" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="accounts.length > 0 && totalPages > 1"
      class="flex items-center justify-between bg-white border border-gray-200 px-4 py-3">
      <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">
        {{ (currentPage - 1) * perPage + 1 }}–{{ Math.min(currentPage * perPage, totalAccounts) }} of {{ totalAccounts }}_Accounts
      </span>
      <div class="flex items-center gap-1">
        <button @click="goToPage(1)" :disabled="currentPage === 1"
          class="px-2 py-1.5 border border-gray-200 text-gray-400 hover:border-[#2F2E8B] hover:text-[#2F2E8B] disabled:opacity-30 disabled:cursor-not-allowed transition-all text-[9px] font-mono font-black">
          &laquo;
        </button>
        <button @click="previousPage" :disabled="currentPage === 1"
          class="px-3 py-1.5 border border-gray-200 text-gray-400 hover:border-[#2F2E8B] hover:text-[#2F2E8B] disabled:opacity-30 disabled:cursor-not-allowed transition-all text-[9px] font-mono font-black uppercase tracking-widest flex items-center gap-1">
          <ChevronLeft :size="10" /> Prev
        </button>
        <template v-for="p in visiblePages" :key="p">
          <span v-if="p === '...'" class="px-1 text-[9px] font-mono text-gray-300">…</span>
          <button v-else @click="goToPage(p)"
            class="w-7 h-7 border text-[9px] font-mono font-black transition-all"
            :class="p === currentPage ? 'bg-[#2F2E8B] border-[#2F2E8B] text-white' : 'border-gray-200 text-gray-400 hover:border-[#2F2E8B] hover:text-[#2F2E8B]'">
            {{ p }}
          </button>
        </template>
        <button @click="nextPage" :disabled="currentPage === totalPages"
          class="px-3 py-1.5 border border-gray-200 text-gray-400 hover:border-[#2F2E8B] hover:text-[#2F2E8B] disabled:opacity-30 disabled:cursor-not-allowed transition-all text-[9px] font-mono font-black uppercase tracking-widest flex items-center gap-1">
          Next <ChevronRight :size="10" />
        </button>
        <button @click="goToPage(totalPages)" :disabled="currentPage === totalPages"
          class="px-2 py-1.5 border border-gray-200 text-gray-400 hover:border-[#2F2E8B] hover:text-[#2F2E8B] disabled:opacity-30 disabled:cursor-not-allowed transition-all text-[9px] font-mono font-black">
          &raquo;
        </button>
      </div>
    </div>

    <!-- Account Detail Modal -->
    <AccountDetailModal v-model="showDetailModal" :account="selectedAccount" :users="users"
      @edit="handleEdit" @delete="handleDelete" @archive="handleArchive" @refresh="loadAccounts" />

    <!-- Account Form Modal -->
    <AccountFormModal v-model="showFormModal" :account="accountToEdit" :users="users" @saved="handleSaved" />

    <!-- Bulk Import Modal -->
    <BulkUploadAccountsModal v-model="showBulkUploadModal" :branch-id="safeBranchId" @imported="handleBulkImportComplete" />

    <!-- Delete Confirm Overlay -->
    <Teleport to="body">
      <div v-if="showDeleteConfirm"
        class="fixed inset-0 z-[500] flex items-center justify-center bg-black/60 backdrop-blur-sm"
        @click.self="closeDeleteConfirm">
        <div class="bg-white w-full max-w-md mx-4 border border-gray-200 shadow-2xl overflow-hidden">
          <div class="h-1.5 w-full bg-red-600"></div>
          <div class="p-6">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 bg-red-50 border border-red-200 flex items-center justify-center">
                <Trash2 :size="16" class="text-red-600" />
              </div>
              <div>
                <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Irreversible Action</p>
                <p class="text-sm font-semibold text-gray-800">Delete "{{ accountToDelete?.name || 'this account' }}"?</p>
                <p class="text-[10px] text-gray-400 mt-2 font-mono leading-relaxed">This action cannot be undone. Linked contacts and activity history remain referenced in CRM records.</p>
              </div>
            </div>
          </div>
          <div class="px-6 pb-5 flex justify-end gap-3">
            <button type="button" @click="closeDeleteConfirm" :disabled="deleteLoading"
              class="px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-wider border border-gray-300 text-gray-700 hover:bg-gray-50 transition disabled:opacity-50">
              Cancel
            </button>
            <button type="button" @click="confirmDelete" :disabled="deleteLoading"
              class="px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-wider bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50 flex items-center gap-2">
              <i v-if="deleteLoading" class="fas fa-spinner fa-spin text-xs"></i>
              {{ deleteLoading ? 'Deleting...' : 'Delete' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Extract Rows Modal -->
    <Teleport to="body">
      <div v-if="showExtractDialog" class="fixed inset-0 z-[500] flex items-center justify-center bg-black/60 backdrop-blur-sm" @click.self="showExtractDialog = false">
        <div class="bg-white w-full max-w-2xl mx-4 border border-blue-200 shadow-2xl overflow-hidden">
          <div class="h-1.5 w-full bg-blue-500"></div>
          <div class="p-5">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 bg-blue-50 border border-blue-200 flex items-center justify-center">
                <FileSpreadsheet :size="18" class="text-blue-500" />
              </div>
              <div>
                <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-0.5">Extract Rows</p>
                <p class="text-sm font-semibold text-gray-800">Paste tab-separated data to add new rows</p>
              </div>
            </div>
            <textarea v-model="extractText" rows="8" placeholder="Paste data here (tab-separated)&#10;Format: Name, Industry, Phone, Email, Assignee&#10;Example:&#10;Acme Corp	Technology	+260977...	info@acme.com	user@email.com&#10;Globex Inc	Finance	+260955...	ceo@globex.com	admin@email.com"
              class="w-full border border-gray-200 bg-gray-50 px-3 py-2.5 text-[12px] font-mono text-gray-700 outline-none focus:border-blue-500 focus:bg-blue-50/30 resize-none rounded-sm transition-colors"></textarea>
            <div class="flex justify-end gap-2 mt-4">
              <button @click="showExtractDialog = false" class="px-4 py-2 border border-gray-200 text-gray-500 hover:bg-gray-50 text-[10px] font-mono font-bold uppercase tracking-widest transition-all rounded-sm">Cancel</button>
              <button @click="processExtractRows" :disabled="!extractText.trim()" class="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white text-[10px] font-mono font-bold uppercase tracking-widest transition-all flex items-center gap-1.5 rounded-sm">
                <Plus :size="12" /> Add {{ extractRowCount }} Row{{ extractRowCount !== 1 ? 's' : '' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import * as crmApi from '@/api_services/crm_api';
import { decodeJWT } from '@/api_services/decodeJWT.js';
import { on as onCrmEvent } from '@/events/crmEvents.js';
import { emit as emitCrmEvent } from '@/events/crmEvents.js';
import { useUIStore } from '@/stores/ui.js';
import { useCurrency } from '@/composables/useCurrency';
import AccountDetailModal from './AccountDetailModal.vue';
import AccountFormModal from './AccountFormModal.vue';
import BulkUploadAccountsModal from './BulkUploadAccountsModal.vue';
import { useCRMModule } from '../functions/CRMModule.js';
const uiStore = useUIStore();
import {
  Building, Users, Plus, ArrowRightLeft, CalendarPlus, Search, LayoutGrid, List,
  Globe, Phone, Mail, MapPin, Pencil, Trash2, ChevronLeft, ChevronRight, Eye, EyeOff, Download,
  Calendar as CalendarIcon, TrendingUp, DollarSign, Target, AlertTriangle, UserPlus, Loader2,
  FileSpreadsheet
} from 'lucide-vue-next';

const props = defineProps({ users: { type: Array, default: () => [] } });
const { getTenantId, getUserEmail } = decodeJWT();
const { pipelineDeals, filteredMeetings } = useCRMModule();
const { formatCurrencyCompact, currencySymbol } = useCurrency();

// ── Financial KPIs ──
const formatMoney = (val) => {
  const amount = Number(val) || 0;
  if (!amount) return formatCurrencyCompact(0);
  return formatCurrencyCompact(amount) || `${currencySymbol.value || ''} ${amount.toLocaleString()}`.trim();
};
const kpiPipelineValue = computed(() =>
  (pipelineDeals.value || []).reduce((s, d) => s + (parseFloat(d.value) || 0), 0)
);
const kpiWonRevenue = computed(() =>
  (pipelineDeals.value || []).filter(d => (d.stage || '').includes('won')).reduce((s, d) => s + (parseFloat(d.value) || 0), 0)
);
const kpiCAC = computed(() => {
  const won = (pipelineDeals.value || []).filter(d => (d.stage || '').includes('won'));
  return won.length ? kpiWonRevenue.value / won.length : 0;
});
const kpiMaintenance = computed(() =>
  (filteredMeetings.value || []).filter(m => m.status === 'cancelled' || m.status === 'no_show').length
);

// State
const accounts = ref([]);
const loading = ref(false);
const isAccountsSectionVisible = ref(false);
const searchQuery = ref('');
const industryFilter = ref('');
const statusFilter = ref('');
const assigneeFilter = ref('');
const dateFromFilter = ref('');
const dateToFilter = ref('');
const viewMode = ref('list');
const currentPage = ref(1);
const perPage = ref(24);
const totalAccounts = ref(0);
const showDetailModal = ref(false);
const showFormModal = ref(false);
const showBulkUploadModal = ref(false);
const safeBranchId = computed(() => '');

// Selection & Bulk Actions
const selectedAccountIds = ref([]);
const showBulkAssignModal = ref(false);
const bulkAssignTarget = ref('');
const bulkProcessing = ref(false);

const allSelected = computed({
  get: () => accounts.value.length > 0 && selectedAccountIds.value.length === accounts.value.length,
  set: (val) => { selectedAccountIds.value = val ? accounts.value.map(a => a.id) : []; }
});

function toggleAccountSelection(id) {
  const idx = selectedAccountIds.value.indexOf(id);
  if (idx > -1) selectedAccountIds.value.splice(idx, 1);
  else selectedAccountIds.value.push(id);
}

function clearSelection() { selectedAccountIds.value = []; }

async function bulkDeleteAccounts() {
  if (selectedAccountIds.value.length === 0) return;
  if (!confirm(`Delete ${selectedAccountIds.value.length} account(s)? This cannot be undone.`)) return;
  bulkProcessing.value = true;
  const tenantId = getTenantId();
  let success = 0, failed = 0;
  for (const id of selectedAccountIds.value) {
    try { await crmApi.deleteAccount(id, tenantId); success++; }
    catch { failed++; }
  }
  clearSelection();
  bulkProcessing.value = false;
  await loadAccounts();
  emitCrmEvent('crm:accounts:changed');
  alert(`${success} account(s) deleted.${failed ? ' ' + failed + ' failed.' : ''}`);
}

function openBulkAssign() { showBulkAssignModal.value = true; }
async function confirmBulkAssign() {
  if (!bulkAssignTarget.value || selectedAccountIds.value.length === 0) return;
  bulkProcessing.value = true;
  const tenantId = getTenantId();
  if (!tenantId) { alert('Tenant ID not found. Please log out and log back in.'); bulkProcessing.value = false; return; }
  let success = 0, failed = 0;
  for (const id of selectedAccountIds.value) {
    try {
      const res = await crmApi.updateAccount(id, { assignedTo: bulkAssignTarget.value }, tenantId);
      if (res) success++;
      else failed++;
    } catch (e) {
      console.error(`[BulkAssign] Failed for account ${id}:`, e);
      failed++;
    }
  }
  showBulkAssignModal.value = false;
  bulkAssignTarget.value = '';
  clearSelection();
  bulkProcessing.value = false;
  await loadAccounts();
  emitCrmEvent('crm:accounts:changed');
  if (failed > 0) {
    alert(`${success} account(s) assigned successfully. ${failed} account(s) failed. Check permissions or try again.`);
  } else {
    alert(`Successfully assigned ${success} account(s).`);
  }
}
const showDeleteConfirm = ref(false);
const deleteLoading = ref(false);
const selectedAccount = ref(null);
const accountToEdit = ref(null);
const accountToDelete = ref(null);

// Computed
const totalPages = computed(() => Math.max(1, Math.ceil(totalAccounts.value / perPage.value)));
const pageStart = computed(() => {
  if (!totalAccounts.value) return 0;
  return (currentPage.value - 1) * perPage.value + 1;
});
const pageEnd = computed(() => Math.min(totalAccounts.value, currentPage.value * perPage.value));
const activeFilterCount = computed(() => [searchQuery.value, industryFilter.value].filter(Boolean).length);

const visiblePages = computed(() => {
  const total = totalPages.value;
  const cur = currentPage.value;
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [1];
  if (cur > 3) pages.push('...');
  for (let p = Math.max(2, cur - 1); p <= Math.min(total - 1, cur + 1); p++) pages.push(p);
  if (cur < total - 2) pages.push('...');
  pages.push(total);
  return pages;
});

// Contacts under an account = its associated leads (regardless of stage)
function getAccountContactCount(a) {
  if (!a) return 0;
  if (Array.isArray(a.associatedLeadIds)) return a.associatedLeadIds.length;
  if (Array.isArray(a.associated_lead_ids)) return a.associated_lead_ids.length;
  return Number(a.contactCount || 0);
}

const stats = computed(() => {
  const total = totalAccounts.value;
  const accountLeadCount = getAccountContactCount;
  // WITH_CONTACTS: accounts that have at least one linked lead (= contact)
  const withContacts = accounts.value.filter(a => accountLeadCount(a) > 0).length;
  // FROM_LEADS: accounts that originated from a lead conversion
  const converted = accounts.value.filter(a => a.isConverted || a.convertedFromLeadId || a.converted_from_lead_id || a.sourceLeadId || a.source_lead_id).length;
  const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const thisMonth = accounts.value.filter(a => {
    const ts = a.createdAt || a.created_at || a.createdOn || a.created_on;
    return ts && new Date(ts) >= startOfMonth;
  }).length;
  return { total, withContacts, converted, thisMonth };
});

// Methods
async function loadAccounts() {
  loading.value = true;
  try {
    const params = {
      page: currentPage.value,
      per_page: perPage.value,
      q: searchQuery.value || undefined,
      industry: industryFilter.value || undefined,
      status: statusFilter.value || undefined,
      assignedTo: assigneeFilter.value || undefined,
      created_from: dateFromFilter.value || undefined,
      created_to: dateToFilter.value || undefined
    };
    const response = await crmApi.getAccounts(getTenantId(), params);
    accounts.value = response.items || response || [];
    totalAccounts.value = response.total || accounts.value.length;
  } catch (error) {
    console.error('Failed to load accounts:', error);
    accounts.value = [];
    totalAccounts.value = 0;
  } finally {
    loading.value = false;
  }
}

let searchTimeout = null;
function debouncedSearch() {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => { currentPage.value = 1; loadAccounts(); }, 500);
}

function openCreateModal() { accountToEdit.value = null; showFormModal.value = true; }
function openBulkUpload() { showBulkUploadModal.value = true; }
function handleBulkImportComplete() { showBulkUploadModal.value = false; loadAccounts(); emitCrmEvent('crm:accounts:changed'); }
function viewAccount(account) { selectedAccount.value = account; showDetailModal.value = true; }
function editAccount(account) { accountToEdit.value = account; showFormModal.value = true; }
function deleteAccount(account) { accountToDelete.value = account; showDeleteConfirm.value = true; }
async function archiveAccount(account) {
  try {
    const tenantId = getTenantId();
    await crmApi.updateAccount(account.id, { ...account, archived: true }, tenantId);
    await loadAccounts();
    emitCrmEvent('crm:accounts:changed');
  } catch (err) {
    console.error('[AccountsView] Failed to archive account:', err);
  }
}
async function handleExportAccounts() {
  try {
    const params = {
      q: searchQuery.value || undefined,
      industry: industryFilter.value || undefined,
      status: statusFilter.value || undefined,
      assignedTo: assigneeFilter.value || undefined,
      created_from: dateFromFilter.value || undefined,
      created_to: dateToFilter.value || undefined,
      export: true
    };
    const response = await crmApi.getAccounts(getTenantId(), params);
    const data = response.items || response || [];
    if (!data.length) return;
    const csv = [
      ['Name', 'Industry', 'Phone', 'Email', 'Website', 'Location', 'Contacts', 'Assigned To', 'Created'],
      ...data.map(a => [
        a.name || '', a.industry || '', a.phone || '', a.email || '', a.website || '',
        [a.billingCity, a.billingCountry].filter(Boolean).join(', '),
        getAccountContactCount(a), a.assignedTo || '', a.createdAt || ''
      ])
    ].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url;
    a.download = `accounts_export_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click(); URL.revokeObjectURL(url);
  } catch (err) { console.error('Export failed:', err); }
}

function resetFilters() {
  searchQuery.value = '';
  industryFilter.value = '';
  statusFilter.value = '';
  assigneeFilter.value = '';
  dateFromFilter.value = '';
  dateToFilter.value = '';
  currentPage.value = 1;
  loadAccounts();
}

function closeDeleteConfirm() {
  showDeleteConfirm.value = false;
  accountToDelete.value = null;
}

async function confirmDelete() {
  const name = accountToDelete.value?.name || '';
  deleteLoading.value = true;
  try {
    await crmApi.deleteAccount(accountToDelete.value.id, getTenantId());
    closeDeleteConfirm();
    uiStore.showSuccessToast(`Account "${name}" deleted.`);
    await loadAccounts();
    emitCrmEvent('crm:accounts:changed');
  } catch (error) {
    console.error('Failed to delete account:', error);
    uiStore.showErrorToast(error.message || 'Failed to delete account.');
    closeDeleteConfirm();
  } finally {
    deleteLoading.value = false;
  }
}

function handleEdit(account) { showDetailModal.value = false; setTimeout(() => { accountToEdit.value = account; showFormModal.value = true; }, 100); }
function handleDelete(account) { showDetailModal.value = false; setTimeout(() => deleteAccount(account), 100); }
function handleArchive(account) { showDetailModal.value = false; setTimeout(() => archiveAccount(account), 100); }
async function handleSaved() { showFormModal.value = false; accountToEdit.value = null; await loadAccounts(); emitCrmEvent('crm:accounts:changed'); }
function nextPage() { if (currentPage.value < totalPages.value) { currentPage.value++; loadAccounts(); } }
function previousPage() { if (currentPage.value > 1) { currentPage.value--; loadAccounts(); } }
function goToPage(p) { if (typeof p === 'number' && p !== currentPage.value) { currentPage.value = p; loadAccounts(); } }

function getInitials(name) {
  if (!name) return '?';
  const parts = name.split(' ').filter(p => p.length > 0);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return name.substring(0, 2).toUpperCase();
}

function formatLocation(account) {
  const parts = [account.billingCity, account.billingCountry].filter(Boolean);
  return parts.length > 0 ? parts.join(', ') : '—';
}

function formatDate(dateString) {
  if (!dateString) return '—';
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function truncateUrl(url) {
  if (!url) return '';
  const cleaned = url.replace(/^https?:\/\/(www\.)?/, '');
  return cleaned.length > 30 ? cleaned.substring(0, 30) + '...' : cleaned;
}

let _unsubAccounts = null;
onMounted(() => {
  loadAccounts();
  _unsubAccounts = onCrmEvent('crm:accounts:changed', () => { currentPage.value = 1; loadAccounts(); });
});
onBeforeUnmount(() => { if (typeof _unsubAccounts === 'function') _unsubAccounts(); });

// ── Inline Excel Editing ──
const excelImportRef = ref(null);
const isExcelEditing = ref(false);
const excelChanges = ref({});
const savingExcel = ref(false);
const showExtractDialog = ref(false);
const extractText = ref('');

const extractRowCount = computed(() => {
  if (!extractText.value.trim()) return 0;
  return extractText.value.trim().split('\n').filter(l => l.trim()).length;
});

function getExcelValue(account, field) {
  const key = account.id || account._id;
  return excelChanges.value[key]?.[field] ?? '';
}

function setExcelValue(account, field, value) {
  const key = account.id || account._id;
  if (!excelChanges.value[key]) {
    excelChanges.value[key] = {};
  }
  excelChanges.value[key][field] = value;
}

function toggleExcelEdit() {
  if (savingExcel.value) return;
  if (isExcelEditing.value) {
    saveExcelChanges();
  } else {
    enterExcelEditMode();
  }
}

function enterExcelEditMode() {
  // Switch to table view so editable cells are visible
  if (viewMode.value !== 'list') viewMode.value = 'list';
  const changes = {};
  for (const acct of accounts.value) {
    const id = acct.id || acct._id;
    if (!id) continue;
    changes[id] = {
      name: acct.name || '',
      industry: acct.industry || '',
      phone: acct.phone || '',
      assignedTo: acct.assignedTo || ''
    };
  }
  excelChanges.value = changes;
  isExcelEditing.value = true;
}

function deleteSelectedExcelRows() {
  if (!selectedAccountIds.value.length) { alert('Select accounts to delete first using checkboxes.'); return; }
  if (!confirm(`Delete ${selectedAccountIds.value.length} selected account(s)?`)) return;
  const ids = [...selectedAccountIds.value];
  ids.forEach(id => { delete excelChanges.value[id]; });
  // Also remove from the accounts list locally
  accounts.value = accounts.value.filter(a => !ids.includes(a.id) && !ids.includes(a._id));
  selectedAccountIds.value = [];
}

function processExtractRows() {
  const text = extractText.value.trim();
  if (!text) return;
  const lines = text.split('\n').filter(l => l.trim());
  let added = 0;
  for (const line of lines) {
    const parts = line.split('\t');
    const name = (parts[0] || '').trim();
    if (!name) continue;
    const tempId = `new-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const newAccount = {
      id: tempId,
      name,
      industry: (parts[1] || '').trim(),
      phone: (parts[2] || '').trim(),
      email: (parts[3] || '').trim(),
      assignedTo: (parts[4] || '').trim()
    };
    accounts.value.unshift(newAccount);
    excelChanges.value[tempId] = {
      name: newAccount.name,
      industry: newAccount.industry,
      phone: newAccount.phone,
      assignedTo: newAccount.assignedTo
    };
    added++;
  }
  extractText.value = '';
  showExtractDialog.value = false;
}

async function saveExcelChanges() {
  savingExcel.value = true;
  const tenantId = getTenantId();
  let updated = 0;
  let failed = 0;
  const entries = Object.entries(excelChanges.value);
  if (!entries.length) { savingExcel.value = false; isExcelEditing.value = false; return; }
  for (const [id, changes] of entries) {
    try {
      const payload = {};
      if (changes.name !== undefined) payload.name = changes.name;
      if (changes.industry !== undefined) payload.industry = changes.industry;
      if (changes.phone !== undefined) payload.phone = changes.phone;
      if (changes.assignedTo !== undefined) payload.assignedTo = changes.assignedTo;
      if (id.startsWith('new-')) {
        const created = await crmApi.createAccount({ ...payload, tenant_id: tenantId }, tenantId);
        const newId = created?.id || created?._id;
        if (newId) {
          const fieldStr = Object.entries(changes).filter(([,v]) => v !== '').map(([k,v]) => `${k.toUpperCase()}: "${v}"`).join('; ');
          const createChanges = Object.entries(changes).filter(([,v]) => v !== '').map(([k,v]) => ({ field: k.toUpperCase(), oldValue: '', newValue: String(v) }));
          crmApi.logAccountActivity(newId, { tenant_id: tenantId, type: 'account:create', notes: 'Excel bulk create — ' + fieldStr, description: `Account created via Excel (${createChanges.length} field(s))`, metadata: { changes: createChanges }, performed_by: getUserEmail() || 'system' }).catch(() => {});
        }
      } else {
        await crmApi.updateAccount(id, payload, tenantId);
        // Log changes
        const original = accounts.value.find(a => (a.id || a._id) === id);
        const diffs = [];
        const structChanges = [];
        if (original) {
          if (changes.name !== (original.name || '')) { diffs.push(`NAME: "${original.name || ''}" → "${changes.name}"`); structChanges.push({ field: 'Name', oldValue: original.name || '', newValue: changes.name }); }
          if (changes.industry !== (original.industry || '')) { diffs.push(`INDUSTRY: "${original.industry || ''}" → "${changes.industry}"`); structChanges.push({ field: 'Industry', oldValue: original.industry || '', newValue: changes.industry }); }
          if (changes.phone !== (original.phone || '')) { diffs.push(`PHONE: "${original.phone || ''}" → "${changes.phone}"`); structChanges.push({ field: 'Phone', oldValue: original.phone || '', newValue: changes.phone }); }
          if (changes.assignedTo !== (original.assignedTo || '')) { diffs.push(`ASSIGNED_TO: "${original.assignedTo || ''}" → "${changes.assignedTo}"`); structChanges.push({ field: 'Assigned To', oldValue: original.assignedTo || '', newValue: changes.assignedTo }); }
        }
        if (diffs.length) {
          crmApi.logAccountActivity(id, { tenant_id: tenantId, type: 'account:update', notes: 'Excel bulk edit — ' + diffs.join('; '), description: `Excel edit — ${diffs.length} field(s) updated`, metadata: { changes: structChanges }, performed_by: getUserEmail() || 'system' }).catch(() => {});
        }
      }
      updated++;
    } catch (e) {
      console.warn(`[AccountsView] Failed to save account ${id}:`, e);
      failed++;
    }
  }
  isExcelEditing.value = false;
  excelChanges.value = {};
  savingExcel.value = false;
  if (failed > 0) alert(`Saved ${updated} of ${entries.length} accounts. ${failed} failed.`);
  if (updated > 0) {
    await loadAccounts();
    emitCrmEvent('crm:accounts:changed');
  }
}
</script>

<style scoped>
.dotted-pattern {
  background-image: radial-gradient(#2F2E8B 1.5px, transparent 1.5px);
  background-size: 20px 20px;
  opacity: 0.04;
}
@keyframes modal-in {
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}
.animate-modal-in { animation: modal-in 0.2s cubic-bezier(0, 0, 0.2, 1) forwards; }
</style>
