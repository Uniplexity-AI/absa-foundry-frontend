<template>
  <div class="w-full space-y-6 relative">
    <!-- Skeleton Loading State -->
    <div v-if="loading" class="space-y-4 w-full animate-pulse">
      <!-- Skeleton: Active/Archived Toggle -->
      <div class="flex items-center gap-3 pb-4 border-b border-gray-100">
        <div class="h-4 w-28 bg-gray-200 rounded-sm"></div>
        <div class="h-4 w-20 bg-gray-100 rounded-sm"></div>
      </div>

      <!-- Skeleton: Lead_Management header bar -->
      <div class="bg-white border border-gray-200 rounded-sm overflow-hidden">
        <div class="px-3 sm:px-4 py-2 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-1 h-4 bg-gray-200"></div>
            <div class="h-4 w-36 bg-gray-200 rounded-sm"></div>
          </div>
          <div class="h-5 w-14 bg-gray-200 rounded-sm"></div>
        </div>
        <div class="p-3 sm:p-4 space-y-3">
          <!-- Skeleton: subtitle + actions row -->
          <div class="flex justify-between items-center">
            <div class="h-3 w-56 bg-gray-200 rounded-sm"></div>
            <div class="flex gap-2">
              <div class="h-8 w-24 bg-gray-200 rounded-sm"></div>
              <div class="h-8 w-24 bg-gray-100 rounded-sm"></div>
              <div class="h-8 w-20 bg-gray-100 rounded-sm"></div>
            </div>
          </div>
          <!-- Skeleton: 4 stat cards -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div v-for="i in 4" :key="i" class="h-20 bg-gray-100 rounded-sm"></div>
          </div>
          <!-- Skeleton: Auto-Assign -->
          <div class="h-12 bg-gray-100 border border-dashed border-gray-200 rounded-sm"></div>
          <!-- Skeleton: Filters -->
          <div class="h-10 bg-gray-100 border border-gray-200 rounded-sm"></div>
        </div>
      </div>

      <!-- Skeleton: Table rows -->
      <div class="bg-white border border-gray-200 rounded-sm overflow-hidden">
        <div class="p-2 border-b border-gray-100 bg-gray-50/50">
          <div class="flex gap-4">
            <div v-for="i in 8" :key="i" class="h-3 bg-gray-200 rounded-sm" :class="i === 1 ? 'w-8' : i === 2 ? 'w-32' : i === 3 ? 'w-24' : i === 4 ? 'w-28' : i === 5 ? 'w-10' : i === 6 ? 'w-14' : i === 7 ? 'w-20' : 'w-16'"></div>
          </div>
        </div>
        <div class="divide-y divide-gray-100">
          <div v-for="row in 6" :key="row" class="p-3 flex items-center gap-4">
            <div class="w-5 h-5 bg-gray-100 rounded-sm shrink-0"></div>
            <div class="w-7 h-7 bg-gray-100 rounded-sm shrink-0"></div>
            <div class="flex-1 space-y-1.5">
              <div class="h-3 w-40 bg-gray-200 rounded-sm"></div>
              <div class="h-2.5 w-24 bg-gray-100 rounded-sm"></div>
            </div>
            <div class="h-3 w-28 bg-gray-200 rounded-sm"></div>
            <div class="h-3 w-32 bg-gray-100 rounded-sm"></div>
            <div class="h-5 w-10 bg-gray-100 rounded-sm"></div>
            <div class="h-5 w-14 bg-gray-100 rounded-sm"></div>
            <div class="h-3 w-20 bg-gray-100 rounded-sm"></div>
            <div class="h-3 w-14 bg-gray-100 rounded-sm"></div>
            <div class="flex gap-1">
              <div v-for="a in 4" :key="a" class="w-6 h-6 bg-gray-100 rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Archived banner (only shown when viewState is archived) -->
    <div v-if="viewState === 'archived'" class="text-[9px] font-mono font-bold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 uppercase tracking-widest">
      Viewing Archived Leads — Restore or Permanently Delete
    </div>
    
    <!-- Header with Title and Quick Stats -->
    <div class="bg-white border border-gray-200 rounded-sm overflow-hidden">
      <div
        class="px-3 sm:px-4 py-2 flex items-center justify-between bg-gray-50/50 cursor-pointer select-none"
        @click="isStatsVisible = !isStatsVisible"
      >
        <div class="flex items-center gap-2">
          <div class="w-1 h-4 bg-[#2F2E8B]"></div>
          <h3 class="text-[10px] font-black text-gray-900 uppercase tracking-widest font-mono">Lead_Management</h3>
        </div>
        <button
          class="flex items-center gap-1.5 px-2 py-1 rounded-sm text-[8px] font-mono font-bold uppercase tracking-widest transition border hover:bg-gray-100"
          :class="isStatsVisible ? 'text-gray-500 border-gray-200' : 'text-[#2F2E8B] border-indigo-200 bg-indigo-50/50'"
        >
          <svg
            class="w-3 h-3 transition-transform duration-300"
            :class="isStatsVisible ? 'rotate-0' : '-rotate-90'"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
          </svg>
          {{ isStatsVisible ? 'Hide' : 'Show' }}
        </button>
      </div>

      <div v-show="isStatsVisible" class="flex flex-col gap-3 p-3 sm:p-4 transition-all duration-300">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p class="text-[9px] font-mono text-gray-400 uppercase tracking-widest">
              Total_Records: <span class="text-[#2F2E8B] font-black">{{ totalLeads }}</span> // Range: {{ pageStart }}-{{ pageEnd }}
              <span v-if="filteredLeadsCount < totalLeads" class="text-[#2F2E8B]">
                // Filtered_Count: {{ filteredLeadsCount }}
              </span>
            </p>
          </div>

          <!-- Lead Actions -->
          <div class="flex items-center gap-1.5 flex-wrap">
            <button
              v-if="viewState === 'active'"
              @click="handleAddLead" 
              class="px-3 py-2 bg-[#2F2E8B] text-white hover:bg-[#3D2F88] transition flex items-center gap-1.5 font-mono font-bold uppercase text-[8px] sm:text-[9px] rounded-sm tracking-widest"
            >
              <Plus :size="12" />
              <span class="hidden sm:inline">Add_Lead</span>
            </button>
            <button 
              @click="handleBulkUpload" 
              class="px-3 py-2 bg-white border border-gray-200 text-gray-600 hover:text-[#2F2E8B] hover:border-[#2F2E8B] transition flex items-center gap-1.5 font-mono font-bold uppercase text-[8px] sm:text-[9px] rounded-sm tracking-widest"
              title="Simple CSV Upload"
            >
              <Upload :size="12" />
              <span class="hidden sm:inline">Bulk_Upload</span>
            </button>
            <button 
              @click="handleExportLeads" 
              class="px-3 py-2 bg-white border border-gray-200 text-gray-600 hover:text-[#2F2E8B] hover:border-[#2F2E8B] transition flex items-center gap-1.5 font-mono font-bold uppercase text-[8px] sm:text-[9px] rounded-sm tracking-widest"
            >
              <Download :size="12" />
              <span class="hidden sm:inline">Export</span>
            </button>
            <button 
              @click="toggleExcelEdit"
              class="px-3 py-2 border transition flex items-center gap-1.5 font-mono font-bold uppercase text-[8px] sm:text-[9px] rounded-sm tracking-widest"
              :class="isExcelEditing ? 'bg-green-600 text-white border-green-600 hover:bg-green-700' : 'bg-white border-gray-200 text-gray-600 hover:text-orange-600 hover:border-orange-500'"
              :disabled="savingExcel"
            >
              <Loader2 v-if="savingExcel" :size="12" class="animate-spin" />
              <FileSpreadsheet v-else :size="12" />
              <span class="hidden sm:inline">{{ savingExcel ? 'Saving...' : (isExcelEditing ? 'Save All' : 'Excel Edit') }}</span>
            </button>
          </div>
        </div>

        <!-- KPIs (left) + Filters (right) side by side -->
        <div class="flex flex-col lg:flex-row gap-3">
          <!-- Left Column: KPI cards + Auto-Assign -->
          <div class="flex flex-col gap-2 lg:w-1/2 xl:w-2/5">
            <div class="grid grid-cols-2 gap-2">
              <!-- Total -->
              <div class="relative overflow-hidden bg-gradient-to-br from-[#2F2E8B] to-[#1f1e6b] text-white rounded-sm group transition-all shadow-sm">
                <div class="absolute inset-0 dotted-pattern opacity-[0.08] pointer-events-none"></div>
                <div class="relative z-10 px-3 py-2">
                  <div class="flex items-center justify-between mb-0.5">
                    <span class="text-[7px] font-mono font-bold text-white/60 uppercase tracking-[0.2em]">Total_Leads</span>
                    <Users :size="10" class="text-white/40" />
                  </div>
                  <div class="text-lg font-black tracking-tight">{{ totalLeads }}</div>
                  <div class="text-[7px] font-mono text-white/50 uppercase tracking-widest">{{ viewState === 'archived' ? 'Archived_Scope' : 'Active_Scope' }}</div>
                </div>
              </div>

              <!-- Hot -->
              <div class="relative overflow-hidden bg-white border border-gray-200 rounded-sm group hover:border-red-400 transition-all shadow-sm">
                <div class="absolute inset-0 dotted-pattern opacity-[0.04] pointer-events-none"></div>
                <div class="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-red-50 to-transparent rounded-bl-full pointer-events-none"></div>
                <div class="relative z-10 px-3 py-2">
                  <div class="flex items-center justify-between mb-0.5">
                    <span class="text-[7px] font-mono font-bold text-gray-400 uppercase tracking-[0.2em]">Hot_Leads</span>
                    <Flame :size="10" class="text-red-400" />
                  </div>
                  <div class="text-lg font-black text-red-600 tracking-tight">{{ leadStats.hot }}</div>
                  <div class="text-[7px] font-mono text-gray-300 uppercase tracking-widest">High_Intent</div>
                </div>
              </div>

              <!-- Warm -->
              <div class="relative overflow-hidden bg-white border border-gray-200 rounded-sm group hover:border-orange-400 transition-all shadow-sm">
                <div class="absolute inset-0 dotted-pattern opacity-[0.04] pointer-events-none"></div>
                <div class="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-orange-50 to-transparent rounded-bl-full pointer-events-none"></div>
                <div class="relative z-10 px-3 py-2">
                  <div class="flex items-center justify-between mb-0.5">
                    <span class="text-[7px] font-mono font-bold text-gray-400 uppercase tracking-[0.2em]">Warm_Leads</span>
                    <Sun :size="10" class="text-orange-400" />
                  </div>
                  <div class="text-lg font-black text-orange-600 tracking-tight">{{ leadStats.warm }}</div>
                  <div class="text-[7px] font-mono text-gray-300 uppercase tracking-widest">Engaged</div>
                </div>
              </div>

              <!-- Cold -->
              <div class="relative overflow-hidden bg-white border border-gray-200 rounded-sm group hover:border-blue-400 transition-all shadow-sm">
                <div class="absolute inset-0 dotted-pattern opacity-[0.04] pointer-events-none"></div>
                <div class="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full pointer-events-none"></div>
                <div class="relative z-10 px-3 py-2">
                  <div class="flex items-center justify-between mb-0.5">
                    <span class="text-[7px] font-mono font-bold text-gray-400 uppercase tracking-[0.2em]">Cold_Leads</span>
                    <Snowflake :size="10" class="text-blue-400" />
                  </div>
                  <div class="text-lg font-black text-blue-600 tracking-tight">{{ leadStats.cold }}</div>
                  <div class="text-[7px] font-mono text-gray-300 uppercase tracking-widest">Dormant</div>
                </div>
              </div>
            </div>

            <!-- Auto-Assign Feature Card -->
            <div
              class="relative overflow-hidden bg-white border border-dashed border-gray-300 cursor-pointer hover:border-[#2F2E8B] hover:shadow-sm transition-all group"
              @click="showAutoAssignModal = true"
            >
              <div class="absolute inset-0 dotted-pattern opacity-[0.04] pointer-events-none"></div>
              <div class="relative z-10 flex items-center gap-4 px-4 py-3">
                <div class="w-9 h-9 border border-gray-200 flex items-center justify-center shrink-0 group-hover:border-[#2F2E8B] transition-colors">
                  <Zap :size="16" class="text-gray-300 group-hover:text-[#2F2E8B] transition-colors" />
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-gray-900">Auto-Assign</h3>
                  <p class="text-[7px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                    Distribute Unassigned Leads &bull; Escalate Stale &bull; Round-Robin
                  </p>
                </div>
                <div class="text-[8px] font-mono font-black text-amber-500 uppercase tracking-widest flex items-center gap-1.5 shrink-0">
                  {{ leadStats.unassigned }} Stale
                  <Zap :size="8" class="fill-amber-500 text-amber-500" />
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Filters -->
          <div class="lg:w-1/2 xl:w-3/5">
            <div class="bg-white border border-gray-200 rounded-sm p-3 space-y-3">
      <!-- Mobile Filter Toggle -->
      <button 
        @click="showFilters = !showFilters"
        class="lg:hidden w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 transition rounded-sm"
      >
        <span class="flex items-center gap-2 font-mono font-bold text-gray-700 text-[10px] uppercase tracking-widest">
          <Filter :size="12" />
          Quick_Filters
          <span v-if="hasAnyFilters" class="bg-[#2F2E8B] text-white px-2 py-0.5 text-[9px] font-black">
            {{ activeFiltersCount }}
          </span>
        </span>
        <ChevronUp v-if="showFilters" :size="14" />
        <ChevronDown v-else :size="14" />
      </button>
      
      <div class="flex flex-wrap gap-1.5 sm:gap-2 items-center" :class="{'hidden lg:flex': !showFilters}">
        <!-- Search -->
        <div class="relative w-full sm:flex-1 sm:min-w-[200px]">
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" :size="14" />
          <input
            v-model="searchTerm"
            placeholder="SEARCH_LEADS..."
            class="border border-gray-200 rounded-sm pl-10 pr-8 py-2 text-[10px] w-full focus:ring-2 focus:ring-[#2F2E8B]/30 focus:border-[#2F2E8B] font-mono font-bold uppercase tracking-widest outline-none transition-all"
          />
          <button 
            v-if="searchTerm"
            @click="searchTerm = ''"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X :size="14" />
          </button>
        </div>

        <!-- Quick Filters: Priority (Custom Dropdown with Icons) -->
        <div class="relative">
          <button
            @click="priorityDropdownOpen = !priorityDropdownOpen"
            class="border border-gray-200 rounded-sm px-2 sm:px-3 py-2 pr-7 sm:pr-8 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-widest focus:ring-2 focus:ring-[#2F2E8B]/30 bg-white hover:bg-gray-50 transition-all flex items-center gap-1.5 sm:gap-2 text-left relative min-w-[120px] sm:min-w-[140px]"
          >
            <template v-if="leadQuickFilter === 'hot'">
              <Flame :size="14" class="text-red-500" />
              <span class="hidden sm:inline">Priority: Hot</span>
              <span class="sm:hidden">Hot</span>
            </template>
            <template v-else-if="leadQuickFilter === 'warm'">
              <Sun :size="14" class="text-orange-500" />
              <span class="hidden sm:inline">Priority: Warm</span>
              <span class="sm:hidden">Warm</span>
            </template>
            <template v-else-if="leadQuickFilter === 'cold'">
              <Snowflake :size="14" class="text-blue-500" />
              <span class="hidden sm:inline">Priority: Cold</span>
              <span class="sm:hidden">Cold</span>
            </template>
            <template v-else>
              <span>All Priorities</span>
            </template>
            <ChevronDown class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" :size="14" />
          </button>
          
          <!-- Dropdown Menu -->
          <div
            v-if="priorityDropdownOpen"
            class="absolute z-50 mt-1 w-full bg-white border rounded-lg shadow-lg py-1"
          >
            <button
              v-for="option in priorityOptions"
              :key="option.value"
              @click="selectPriority(option.value)"
              class="w-full px-3 py-2 text-sm text-left hover:bg-gray-100 flex items-center gap-2 transition-colors"
              :class="{ 'bg-gray-50': leadQuickFilter === option.value }"
            >
              <Flame v-if="option.icon === 'Flame'" :size="16" :class="option.color" />
              <Sun v-else-if="option.icon === 'Sun'" :size="16" :class="option.color" />
              <Snowflake v-else-if="option.icon === 'Snowflake'" :size="16" :class="option.color" />
              <span class="w-4" v-else></span>
              <span>{{ option.label }}</span>
            </button>
          </div>
        </div>

        <!-- Quick Filters: Activity -->
        <select 
          v-model="touchFilter" 
          @change="page = 1; loadLeads()"
          class="border border-gray-200 rounded-sm px-3 py-2 pr-8 text-[10px] font-mono font-bold uppercase tracking-widest focus:ring-2 focus:ring-[#2F2E8B]/30 outline-none bg-white hover:bg-gray-50 transition-all"
        >
          <option value="">Activity Status</option>
          <option value="touched">Touched</option>
          <option value="untouched">Untouched</option>
        </select>

        <!-- Stage Filter (dynamic) -->
        <select 
          v-model="stageFilter" 
          @change="page = 1; loadLeads()"
          class="border border-gray-200 rounded-sm px-3 py-2 pr-8 text-[10px] font-mono font-bold uppercase tracking-widest focus:ring-2 focus:ring-[#2F2E8B]/30 outline-none bg-white hover:bg-gray-50 transition-all capitalize"
        >
          <option value="">All Stages</option>
          <option v-for="s in availableStages" :key="s" :value="s">{{ s.replace('-', ' ') }}</option>
        </select>

        <!-- Date Range Filter -->
        <div class="flex items-center gap-1 border border-gray-200 rounded-sm bg-white hover:bg-gray-50 transition-all px-2 py-1">
          <CalendarIcon :size="12" class="text-gray-400" />
          <input
            v-model="dateFromFilter"
            @change="page = 1; loadLeads()"
            type="date"
            class="text-[10px] font-mono font-bold uppercase tracking-widest outline-none bg-transparent w-[110px]"
            :title="'Created from'"
          />
          <span class="text-gray-300 text-[10px] font-mono">→</span>
          <input
            v-model="dateToFilter"
            @change="page = 1; loadLeads()"
            type="date"
            class="text-[10px] font-mono font-bold uppercase tracking-widest outline-none bg-transparent w-[110px]"
            :title="'Created to'"
          />
        </div>

        <!-- Assignee Filter -->
        <select 
          v-model="assigneeFilter" 
          @change="page = 1; loadLeads()"
          class="border border-gray-200 rounded-sm px-3 py-2 pr-8 text-[10px] font-mono font-bold uppercase tracking-widest focus:ring-2 focus:ring-[#2F2E8B]/30 outline-none bg-white hover:bg-gray-50 transition-all"
        >
          <option value="">Assignee: All</option>
          <option v-for="u in users" :key="u.email" :value="u.email">{{ u.email.toUpperCase() }}</option>
        </select>

        <!-- Source Filter -->
        <select 
          v-model="sourceFilter" 
          @change="page = 1; loadLeads()"
          class="border border-gray-200 rounded-sm px-3 py-2 pr-8 text-[10px] font-mono font-bold uppercase tracking-widest focus:ring-2 focus:ring-[#2F2E8B]/30 outline-none bg-white hover:bg-gray-50 transition-all"
        >
          <option value="">Source: All</option>
          <option value="website">Website</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
          <option value="referral">Referral</option>
          <option value="event">Event</option>
          <option value="social">Social Media</option>
          <option value="bulk_image_capture">AI Image Capture</option>
        </select>

        <!-- Group/Category Filter -->
        <select
          v-model="groupFilter"
          @change="page = 1; loadLeads()"
          class="border border-gray-200 rounded-sm px-3 py-2 pr-8 text-[10px] font-mono font-bold uppercase tracking-widest focus:ring-2 focus:ring-[#2F2E8B]/30 outline-none bg-white hover:bg-gray-50 transition-all"
        >
          <option value="">All Groups</option>
          <option value="vip">VIP</option>
          <option value="prospect">Prospect</option>
          <option value="nurture">Nurture</option>
          <option value="inbound">Inbound</option>
          <option value="outbound">Outbound</option>
          <option value="partner">Partner</option>
          <option value="enterprise">Enterprise</option>
          <option value="smb">SMB</option>
        </select>

        <!-- Tag Filter -->
        <div class="relative">
          <input
            v-model="tagFilter"
            @keydown.enter="page = 1; loadLeads()"
            type="text"
            placeholder="Filter by tag..."
            class="border border-gray-200 rounded-sm pl-3 pr-8 py-2 text-[10px] font-mono font-bold uppercase tracking-widest focus:ring-2 focus:ring-[#2F2E8B]/30 outline-none bg-white hover:bg-gray-50 transition-all w-36"
          />
          <Tag :size="10" class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300" />
        </div>

        <!-- Clear All Filters -->
        <button 
          v-if="hasAnyFilters"
          @click="clearAllFilters" 
          class="px-4 py-2 border border-red-200 text-red-600 rounded-sm text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-red-50 transition-all flex items-center gap-2"
        >
          <XCircle :size="12" />
          Clear_All
        </button>
      </div>

      <!-- Active Filters Display -->
      <div v-if="hasAnyFilters" class="flex flex-wrap gap-1.5 sm:gap-2 items-center pt-2 sm:pt-3 border-t border-gray-100">
        <span class="text-[8px] sm:text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Filters:</span>
        
        <div class="flex flex-wrap gap-1 sm:gap-1.5">
          <span v-if="searchTerm" class="inline-flex items-center gap-2 bg-blue-50 text-[#2F2E8B] border border-blue-100 px-2 py-1 rounded-sm text-[9px] font-mono font-bold uppercase tracking-widest">
            Search: {{ searchTerm }}
            <button @click="searchTerm = ''" class="hover:text-red-500">
              <X :size="10" />
            </button>
          </span>
          
          <span v-if="leadQuickFilter" class="inline-flex items-center gap-2 bg-purple-50 text-purple-700 border border-purple-100 px-2 py-1 rounded-sm text-[9px] font-mono font-bold uppercase tracking-widest">
            Priority: {{ leadQuickFilter }}
            <button @click="leadQuickFilter = ''" class="hover:text-red-500">
              <X :size="10" />
            </button>
          </span>

          <span v-if="touchFilter" class="inline-flex items-center gap-2 bg-blue-50 text-blue-700 border border-blue-100 px-2 py-1 rounded-sm text-[9px] font-mono font-bold uppercase tracking-widest">
            Status: {{ touchFilter }}
            <button @click="touchFilter = ''" class="hover:text-red-500">
              <X :size="10" />
            </button>
          </span>

          <span v-if="stageFilter" class="inline-flex items-center gap-2 bg-green-50 text-green-700 border border-green-100 px-2 py-1 rounded-sm text-[9px] font-mono font-bold uppercase tracking-widest">
            Stage: {{ stageFilter }}
            <button @click="stageFilter = ''" class="hover:text-red-500">
              <X :size="10" />
            </button>
          </span>

          <span v-if="sourceFilter" class="inline-flex items-center gap-2 bg-orange-50 text-orange-700 border border-orange-100 px-2 py-1 rounded-sm text-[9px] font-mono font-bold uppercase tracking-widest">
            Source: {{ sourceFilter }}
            <button @click="sourceFilter = ''" class="hover:text-red-500">
              <X :size="10" />
            </button>
          </span>

          <span v-if="assigneeFilter" class="inline-flex items-center gap-2 bg-gray-50 text-gray-700 border border-gray-100 px-2 py-1 rounded-sm text-[9px] font-mono font-bold uppercase tracking-widest">
            Owner: {{ assigneeFilter }}
            <button @click="assigneeFilter = ''" class="hover:text-red-500">
              <X :size="10" />
            </button>
          </span>
          <span v-if="groupFilter" class="inline-flex items-center gap-2 bg-violet-50 text-violet-700 border border-violet-100 px-2 py-1 rounded-sm text-[9px] font-mono font-bold uppercase tracking-widest">
            Group: {{ groupFilter }}
            <button @click="groupFilter = ''; loadLeads()" class="hover:text-red-500"><X :size="10" /></button>
          </span>
          <span v-if="tagFilter" class="inline-flex items-center gap-2 bg-pink-50 text-pink-700 border border-pink-100 px-2 py-1 rounded-sm text-[9px] font-mono font-bold uppercase tracking-widest">
            Tag: {{ tagFilter }}
            <button @click="tagFilter = ''; loadLeads()" class="hover:text-red-500"><X :size="10" /></button>
          </span>
          <span v-if="dateFromFilter || dateToFilter" class="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-1 rounded-sm text-[9px] font-mono font-bold uppercase tracking-widest">
            <CalendarIcon :size="10" />
            {{ dateFromFilter || '…' }} → {{ dateToFilter || '…' }}
            <button @click="dateFromFilter = ''; dateToFilter = ''; loadLeads()" class="hover:text-red-500"><X :size="10" /></button>
          </span>
        </div>
      </div>
    </div>
          </div>
          <!-- /Right Column: Filters -->
        </div>
        <!-- /KPIs + Filters row -->
      </div>
      <!-- /isStatsVisible panel -->
    </div>
    <!-- /Header with Title and Quick Stats -->

    <!-- Bulk Actions and View Toggle -->
    <div class="flex flex-col sm:flex-row sm:flex-wrap justify-between items-start sm:items-center gap-3">
      <!-- Bulk Actions -->
      <div class="flex flex-wrap gap-2 sm:gap-4 items-center w-full sm:w-auto">
        <div class="flex items-center gap-2 group cursor-pointer" @click="toggleSelectAllManual">
          <input 
            type="checkbox" 
            v-model="selectAll"
            @click.stop
            @change="toggleSelectAll"
            class="rounded-sm border-gray-300 text-[#2F2E8B] focus:ring-[#2F2E8B] w-4 h-4 cursor-pointer"
          />
          <span class="text-[9px] sm:text-[10px] font-mono font-bold text-gray-600 uppercase tracking-widest group-hover:text-gray-900">
            Select_All
            <span v-if="selectedLeads.length > 0" class="text-[#2F2E8B]">
              ({{ selectedLeads.length }})
            </span>
          </span>
        </div>
        
        <!-- Bulk Action Buttons -->
        <div v-if="selectedLeads.length > 0" class="flex gap-1.5 sm:gap-2 flex-wrap items-center">
          <!-- Assign To Dropdown with Search -->
          <div class="relative" ref="assignDropdownRef">
            <button 
              @click="showAssignDropdown = !showAssignDropdown" 
              class="px-3 py-1.5 bg-[#2F2E8B] text-white text-[9px] font-mono font-bold uppercase tracking-widest hover:bg-[#3D2F88] transition flex items-center gap-2 rounded-sm"
            >
              <UserPlus :size="12" />
              Assign_To
              <ChevronDown :size="10" :class="{'rotate-180': showAssignDropdown}" class="transition-transform" />
            </button>
            
            <!-- Dropdown Menu -->
            <div v-if="showAssignDropdown" class="absolute top-full left-0 mt-1 bg-white border border-gray-200 shadow-2xl z-50 w-64 rounded-sm divide-y divide-gray-100 overflow-hidden">
              <div class="p-2 bg-gray-50/50">
                <div class="relative">
                  <Search class="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" :size="10" />
                  <input 
                    v-model="userSearchQuery"
                    type="text" 
                    placeholder="SEARCH_USERS..."
                    class="w-full pl-7 pr-3 py-1.5 border border-gray-200 text-[10px] focus:ring-2 focus:ring-[#2F2E8B]/30 focus:border-[#2F2E8B] outline-none font-mono font-bold uppercase tracking-widest rounded-sm"
                    @click.stop
                  />
                </div>
              </div>
              <div class="max-h-60 overflow-y-auto">
                  <div v-if="filteredTenantUsers.length === 0" class="px-4 py-3 text-[10px] font-mono text-gray-400 text-center uppercase tracking-widest">
                    NO_RECORDS
                  </div>
                  <button
                    v-for="user in filteredTenantUsers"
                    :key="user.email"
                    @click="assignLeadsToUser(user.email)"
                    class="w-full text-left px-4 py-2.5 hover:bg-gray-50 transition flex items-center gap-3 group"
                  >
                    <div class="w-7 h-7 rounded-sm bg-blue-50 border border-blue-100 text-[#2F2E8B] flex items-center justify-center text-[10px] font-mono font-black group-hover:bg-[#2F2E8B] group-hover:text-white transition-colors">
                      {{ getUserInitials(user.email) }}
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="text-[10px] font-mono font-bold text-gray-900 truncate uppercase tracking-tight">{{ user.email.split('@')[0] }}</div>
                      <div class="text-[8px] font-mono text-gray-400 uppercase tracking-[0.2em] mt-0.5">{{ user.role || 'MEMBER' }}</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <button @click="changeBulkStage" class="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-[9px] font-mono font-bold uppercase tracking-widest hover:border-green-500 hover:text-green-600 transition flex items-center gap-2 rounded-sm">
              <RefreshCw :size="12" />
              Stage
            </button>

            <template v-if="viewState === 'active'">
              <button @click="bulkArchive" class="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-[9px] font-mono font-bold uppercase tracking-widest hover:border-amber-500 hover:text-amber-600 transition flex items-center gap-2 rounded-sm">
                <Archive :size="12" />
                Archive
              </button>
            </template>
            <template v-else>
              <button @click="bulkRestore" class="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-[9px] font-mono font-bold uppercase tracking-widest hover:border-green-500 hover:text-green-600 transition flex items-center gap-2 rounded-sm">
                <ArchiveRestore :size="12" />
                Restore
              </button>
            </template>

            <button @click="bulkDelete" class="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-[9px] font-mono font-bold uppercase tracking-widest hover:border-red-500 hover:text-red-600 transition flex items-center gap-2 rounded-sm">
              <Trash2 :size="12" />
              {{ viewState === 'archived' ? 'Delete Permanently' : 'Delete' }}
            </button>
          </div>
        </div>

      <!-- View Toggle and Per Page -->
      <div class="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-end">
        <!-- Per Page Selector -->
        <div class="flex items-center gap-1.5 sm:gap-3">
          <label class="text-[8px] sm:text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest hidden xs:inline">SHOW:</label>
          <select 
            v-model.number="perPage" 
            @change="page = 1; loadLeads()"
            class="border border-gray-200 rounded-sm px-1.5 sm:px-2 py-1.5 sm:py-1 text-[9px] sm:text-[10px] focus:ring-2 focus:ring-[#2F2E8B]/30 outline-none font-mono font-black text-[#2F2E8B] bg-white transition-all cursor-pointer"
          >
            <option :value="10">10</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
            <option :value="100">100</option>
            <option :value="10000">ALL</option>
          </select>
        </div>
        
        <!-- View Toggle -->
        <div class="flex items-center gap-1 bg-gray-50 border border-gray-200 p-1 rounded-sm">
          <button 
            @click="viewMode = 'table'" 
            :class="viewMode === 'table' ? 'bg-[#2F2E8B] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'"
            class="p-1.5 rounded-sm transition-all"
          >
            <LayoutList :size="14" />
          </button>
          <button 
            @click="viewMode = 'card'" 
            :class="viewMode === 'card' ? 'bg-[#2F2E8B] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'"
            class="p-1.5 rounded-sm transition-all"
          >
            <LayoutGrid :size="14" />
          </button>
        </div>
      </div>
    </div>
    <!-- /Bulk Actions and View Toggle -->

    <!-- Lead Table View -->
    <div v-if="viewMode === 'table'" class="bg-white border border-gray-200 rounded-sm overflow-hidden flex flex-col">
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
                  <input 
                    type="checkbox" 
                    v-model="selectAll"
                    @change="toggleSelectAll"
                    class="rounded-sm border-gray-300 text-[#2F2E8B] focus:ring-[#2F2E8B] w-3 h-3"
                  />
                </div>
              </th>
              <th class="px-2.5 py-2 text-left text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.15em] cursor-pointer hover:text-[#2F2E8B] transition-colors" @click="sortBy('name')">
                <div class="flex items-center gap-1.5">
                  <span>Lead_Identity</span>
                  <ArrowUpDown v-if="sortField !== 'name'" :size="9" />
                  <ArrowUp v-else-if="sortDirection === 'asc'" :size="9" class="text-[#2F2E8B]" />
                  <ArrowDown v-else :size="9" class="text-[#2F2E8B]" />
                </div>
              </th>
              <th class="px-2.5 py-2 text-left text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.15em] cursor-pointer hover:text-[#2F2E8B] transition-colors" @click="sortBy('company')">
                <div class="flex items-center gap-1.5">
                  <span>Organization</span>
                  <ArrowUpDown v-if="sortField !== 'company'" :size="9" />
                  <ArrowUp v-else-if="sortDirection === 'asc'" :size="9" class="text-[#2F2E8B]" />
                  <ArrowDown v-else :size="9" class="text-[#2F2E8B]" />
                </div>
              </th>
              <th class="px-2.5 py-2 text-left text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.15em]">Contact</th>
              <th class="px-2.5 py-2 text-left text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.15em]">Prio</th>
              <th class="px-2.5 py-2 text-left text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.15em]">Stage</th>
              <th class="px-2.5 py-2 text-left text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.15em] cursor-pointer hover:text-[#2F2E8B] transition-colors" @click="sortBy('value')">
                <div class="flex items-center gap-1.5">
                  <span>Valuation</span>
                  <ArrowUpDown v-if="sortField !== 'value'" :size="9" />
                  <ArrowUp v-else-if="sortDirection === 'asc'" :size="9" class="text-[#2F2E8B]" />
                  <ArrowDown v-else :size="9" class="text-[#2F2E8B]" />
                </div>
              </th>
              <th class="px-2.5 py-2 text-left text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.15em]">Assignee</th>
              <th class="px-2.5 py-2 text-left text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.15em]">Date</th>
              <th class="px-2.5 py-2 text-left text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.15em]">Tags</th>
              <th class="px-2.5 py-2 text-right text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.15em]">Actions</th>
            </tr>
          </thead>
        <tbody class="bg-white divide-y divide-gray-100">
          <tr v-for="lead in leads" :key="lead.id" class="hover:bg-gray-50/50 transition-colors group" :class="{ 'bg-blue-50/30': selectedLeads.includes(lead.id), 'bg-orange-50/20': isExcelEditing }">
            <td class="pl-3 pr-1 py-2 whitespace-nowrap">
              <div class="flex items-center justify-center">
                <input 
                  type="checkbox" 
                  :value="lead.id"
                  v-model="selectedLeads"
                  class="rounded-sm border-gray-300 text-[#2F2E8B] focus:ring-[#2F2E8B] w-3 h-3 cursor-pointer"
                />
              </div>
            </td>
            <td class="px-2.5 py-2 whitespace-nowrap">
              <div class="flex items-center gap-2" @click.stop>
                <div class="flex-shrink-0 h-7 w-7">
                  <div class="h-7 w-7 rounded-sm bg-gray-50 border border-gray-100 flex items-center justify-center text-[#2F2E8B] font-mono font-black text-[11px]">
                    {{ getInitialsName(lead.name) }}
                  </div>
                </div>
                <div>
                  <input v-if="isExcelEditing" :value="getExcelVal(lead, 'name')" @input="setExcelVal(lead, 'name', $event.target.value)" @click.stop
                    class="w-56 px-3 py-2 text-sm font-mono font-bold text-gray-900 uppercase border-2 border-orange-400 bg-orange-50 focus:outline-none focus:border-orange-600 focus:bg-white focus:shadow-md rounded-md" />
                  <div v-else class="text-[11px] font-mono font-bold text-gray-900 cursor-pointer hover:text-[#2F2E8B] uppercase tracking-tight" @click="$emit('view', lead)">
                    {{ lead.name }}
                  </div>
                  <div class="text-[8px] font-mono text-gray-400 uppercase tracking-widest">ID:{{ (lead.id || lead._id || '').substring(0, 8) }}</div>
                </div>
              </div>
            </td>
            <td class="px-2.5 py-2 whitespace-nowrap">
              <input v-if="isExcelEditing" :value="getExcelVal(lead, 'company')" @input="setExcelVal(lead, 'company', $event.target.value)" @click.stop
                class="w-40 px-3 py-2 text-sm font-mono font-bold text-gray-600 uppercase border-2 border-orange-400 bg-orange-50 focus:outline-none focus:border-orange-600 focus:bg-white focus:shadow-md rounded-md" />
              <span v-else class="text-[11px] font-mono font-bold text-gray-600 uppercase tracking-tight">{{ lead.company || 'N/A' }}</span>
            </td>
            <td class="px-2.5 py-2 whitespace-nowrap">
              <div class="flex flex-col gap-1.5" @click.stop>
                <input v-if="isExcelEditing" :value="getExcelVal(lead, 'email')" @input="setExcelVal(lead, 'email', $event.target.value)" @click.stop
                  class="w-48 px-3 py-2 text-sm font-mono font-bold border-2 border-orange-400 bg-orange-50 focus:outline-none focus:border-orange-600 focus:bg-white focus:shadow-md rounded-md" placeholder="Email" />
                <a v-else :href="'mailto:' + lead.email" class="text-[10px] font-mono font-bold text-[#2F2E8B] hover:underline uppercase tracking-tight truncate max-w-[140px] block">{{ lead.email }}</a>
                <input v-if="isExcelEditing" :value="getExcelVal(lead, 'phone')" @input="setExcelVal(lead, 'phone', $event.target.value)" @click.stop
                  class="w-48 px-3 py-2 text-sm font-mono border-2 border-orange-400 bg-orange-50 focus:outline-none focus:border-orange-600 focus:bg-white focus:shadow-md rounded-md" placeholder="Phone" />
                <div v-else class="text-[9px] font-mono text-gray-400">{{ lead.phone || 'NO_PH_REC' }}</div>
              </div>
            </td>
            <td class="px-2.5 py-2 whitespace-nowrap">
              <input v-if="isExcelEditing" :value="getExcelVal(lead, 'priority')" @input="setExcelVal(lead, 'priority', $event.target.value)" @click.stop
                class="w-28 px-3 py-2 text-sm font-mono font-black uppercase border-2 border-orange-400 bg-orange-50 focus:outline-none focus:border-orange-600 focus:bg-white focus:shadow-md rounded-md" />
              <span v-else :class="getPriorityBadgeClass(lead.priority)" class="px-1.5 py-0.5 rounded-sm text-[9px] font-mono font-black uppercase tracking-widest border">
                {{ lead.priority || 'NONE' }}
              </span>
            </td>
            <td class="px-2.5 py-2 whitespace-nowrap">
              <input v-if="isExcelEditing" :value="getExcelVal(lead, 'stage')" @input="setExcelVal(lead, 'stage', $event.target.value)" @click.stop
                class="w-32 px-3 py-2 text-sm font-mono font-black uppercase border-2 border-orange-400 bg-orange-50 focus:outline-none focus:border-orange-600 focus:bg-white focus:shadow-md rounded-md" />
              <span v-else class="px-1.5 py-0.5 rounded-sm text-[9px] font-mono font-black uppercase tracking-widest border" :class="getStageBadgeClass(lead.stage)">
                {{ lead.stage }}
              </span>
            </td>
            <td class="px-2.5 py-2 whitespace-nowrap">
              <input v-if="isExcelEditing" :value="getExcelVal(lead, 'value')" @input="setExcelVal(lead, 'value', $event.target.value)" @click.stop
                class="w-28 px-3 py-2 text-sm font-mono font-black border-2 border-orange-400 bg-orange-50 focus:outline-none focus:border-orange-600 focus:bg-white focus:shadow-md rounded-md" />
              <span v-else class="text-[11px] font-mono font-black text-[#2F2E8B] uppercase tracking-tighter">{{ formatCurrency(lead.value || 0) }}</span>
            </td>
            <td class="px-2.5 py-2">
              <div v-if="lead.assignedTo || lead.owner" class="flex items-center gap-1" @click.stop>
                <input v-if="isExcelEditing" :value="getExcelVal(lead, 'assignedTo')" @input="setExcelVal(lead, 'assignedTo', $event.target.value)" @click.stop
                  class="w-36 px-3 py-2 text-sm font-mono font-bold border-2 border-orange-400 bg-orange-50 focus:outline-none focus:border-orange-600 focus:bg-white focus:shadow-md rounded-md" placeholder="Email" />
                <template v-else>
                  <div class="w-5 h-5 rounded-sm bg-gray-50 flex items-center justify-center text-[8px] font-mono font-black border border-gray-100 text-gray-400 shrink-0">
                    {{ getUserInitials(lead.assignedTo || lead.owner) }}
                  </div>
                  <span class="text-[10px] font-mono font-bold text-gray-600 uppercase tracking-tight truncate max-w-[80px] block">{{ (lead.assignedTo || lead.owner).split('@')[0] }}</span>
                </template>
              </div>
              <span v-else class="text-[8px] font-mono font-bold text-gray-300 uppercase tracking-widest">UNASSIGNED</span>
            </td>
            <td class="px-2.5 py-2 whitespace-nowrap text-[10px] font-mono font-bold text-gray-400 uppercase">
              {{ formatDate(lead.created_at) }}
            </td>
            <td class="px-2.5 py-2 whitespace-nowrap">
              <div class="flex flex-wrap gap-1">
                <span v-for="tag in (lead.tags || []).slice(0, 2)" :key="tag"
                  class="px-1.5 py-0.5 bg-pink-50 text-pink-600 border border-pink-100 text-[9px] font-mono font-bold uppercase tracking-widest">
                  {{ tag }}
                </span>
                <span v-if="(lead.tags || []).length > 2" class="px-1.5 py-0.5 bg-gray-50 text-gray-400 border border-gray-100 text-[9px] font-mono font-bold uppercase tracking-widest">+{{ lead.tags.length - 2 }}</span>
                <span v-if="lead.group" class="px-1.5 py-0.5 bg-violet-50 text-violet-600 border border-violet-100 text-[9px] font-mono font-bold uppercase tracking-widest">{{ lead.group }}</span>
              </div>
            </td>
            <td class="px-2.5 py-2 whitespace-nowrap text-right">
              <div class="flex items-center justify-end gap-0.5">
                <button @click="$emit('view', lead)" class="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-[#2F2E8B] hover:border-[#2F2E8B] rounded-sm transition-all" title="View">
                  <Eye :size="10" />
                </button>
                <button v-if="viewState === 'active'" @click="$emit('edit', lead)" class="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-orange-500 hover:border-orange-500 rounded-sm transition-all" title="Edit">
                  <Edit :size="10" />
                </button>
                <button @click="$emit('call', lead)" class="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-green-500 hover:border-green-500 rounded-sm transition-all" title="Call">
                  <Phone :size="10" />
                </button>
                <button v-if="viewState === 'active'" @click="handleArchive(lead)" class="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-amber-500 hover:border-amber-500 rounded-sm transition-all" title="Archive">
                  <Archive :size="10" />
                </button>
                <button v-else @click="handleRestore(lead)" class="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-green-500 hover:border-green-500 rounded-sm transition-all" title="Restore">
                  <ArchiveRestore :size="10" />
                </button>
                <button @click="handleDelete(lead)" class="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-500 rounded-sm transition-all" :title="viewState === 'archived' ? 'Delete Permanently' : 'Delete'">
                  <Trash2 :size="10" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else-if="viewMode === 'card'" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3">
      <div 
        v-for="lead in leads" 
        :key="lead.id"
        class="bg-white border rounded-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden flex flex-col group"
        :class="[
          getLeadPriorityClass(lead.priority),
          { 'ring-1 ring-[#2F2E8B] border-[#2F2E8B]': isSelected(lead) }
        ]"
        @click="$emit('view', lead)"
      >
        <div class="absolute inset-0 dotted-pattern opacity-[0.02] pointer-events-none"></div>

        <!-- Selection Checkbox -->
        <div class="absolute top-2 left-2 z-10">
          <input 
            type="checkbox" 
            :checked="isSelected(lead)"
            @change="toggleSelect(lead, undefined, $event)"
            @click.stop
            class="rounded-sm border-gray-300 text-[#2F2E8B] focus:ring-[#2F2E8B] w-3 h-3 cursor-pointer"
          />
        </div>

        <!-- Card Header Area -->
        <div class="p-2 border-b border-gray-50 bg-gray-50/30">
          <div class="flex items-start justify-between gap-2">
            <div class="flex-1 min-w-0 ml-5">
              <h4 class="text-[10px] font-mono font-black text-gray-900 truncate uppercase tracking-tight group-hover:text-[#2F2E8B]">
                {{ lead.name }}
              </h4>
              <p class="text-[8px] font-mono font-bold text-gray-700 truncate uppercase tracking-widest">
                {{ lead.company || 'NO_ORGANIZATION' }}
              </p>
            </div>
            <div :class="getPriorityBadgeClass(lead.priority)" class="px-1 py-0.5 rounded-sm text-[7px] font-mono font-black uppercase tracking-widest border border-current bg-opacity-10 shrink-0">
              {{ lead.priority || 'N/A' }}
            </div>
          </div>
        </div>

        <!-- Card Body -->
        <div class="p-2 space-y-1.5 flex-1">
          <div class="flex items-end justify-between border-b border-dashed border-gray-100 pb-1.5">
            <span class="text-[7px] font-mono font-bold text-gray-600 uppercase tracking-widest">VALUATION</span>
            <span class="text-sm font-mono font-black text-[#2F2E8B] tracking-tighter">{{ formatCurrency(lead.value || 0) }}</span>
          </div>

          <div class="space-y-0.5">
            <div class="flex items-center gap-1.5 text-[8px] font-mono font-bold text-gray-800 uppercase tracking-tight group/info">
              <Mail :size="9" class="text-gray-500 group-hover/info:text-[#2F2E8B] transition-colors shrink-0" />
              <span class="truncate">{{ lead.email }}</span>
            </div>
            <div class="flex items-center gap-1.5 text-[8px] font-mono font-bold text-gray-800 uppercase tracking-tight group/info">
              <Phone :size="9" class="text-gray-500 group-hover/info:text-green-500 transition-colors shrink-0" />
              <span>{{ lead.phone || 'N/A' }}</span>
            </div>
          </div>

          <div class="flex items-center justify-between pt-0.5">
            <span class="text-[7px] font-mono font-bold text-gray-600 uppercase tracking-[0.2em]">STAGE:</span>
            <span class="px-1.5 py-0.5 rounded-sm text-[7px] font-mono font-black uppercase tracking-widest border" :class="getStageBadgeClass(lead.stage)">
              {{ lead.stage }}
            </span>
          </div>
        </div>

        <!-- Card Footer Actions -->
        <div class="px-1.5 py-1 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between gap-1">
          <div class="flex flex-wrap gap-0.5">
            <span v-for="tag in (lead.tags || []).slice(0, 2)" :key="tag"
              class="px-1 py-0.5 bg-pink-50 text-pink-600 border border-pink-100 text-[7px] font-mono font-bold uppercase tracking-widest">
              {{ tag }}
            </span>
          </div>
          <div class="flex items-center gap-0.5">
            <button @click.stop="$emit('call', lead)" class="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-green-500 hover:border-green-500 rounded-sm transition-all" title="Call">
              <Phone :size="10" />
            </button>
            <button v-if="viewState === 'active'" @click.stop="handleArchive(lead)" class="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-amber-500 hover:border-amber-500 rounded-sm transition-all" title="Archive">
              <Archive :size="10" />
            </button>
            <button v-else @click.stop="handleRestore(lead)" class="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-green-500 hover:border-green-500 rounded-sm transition-all" title="Restore">
              <ArchiveRestore :size="10" />
            </button>
            <button @click.stop="handleDelete(lead)" class="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-500 rounded-sm transition-all" title="Delete">
              <Trash2 :size="10" />
            </button>
            <div class="w-px h-3 bg-gray-200 mx-0.5"></div>
            <button @click.stop="$emit('view', lead)" class="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-[#2F2E8B] hover:border-[#2F2E8B] rounded-sm transition-all" title="View Profile">
              <Eye :size="10" />
            </button>
            <button @click.stop="$emit('view', lead)" class="px-1.5 py-1 bg-[#2F2E8B] text-white text-[7px] font-mono font-black uppercase tracking-widest rounded-sm hover:bg-[#3D2F88] transition-all">
              REVIEW
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!loading && leads.length === 0" class="bg-white border border-gray-100 text-center py-24 rounded-sm relative overflow-hidden">
      <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
      <div class="relative z-10 flex flex-col items-center">
        <div class="w-16 h-16 bg-gray-50 border border-gray-100 rounded-sm flex items-center justify-center mb-4">
          <Inbox :size="32" class="text-gray-200" />
        </div>
        <h4 class="text-[12px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]">NO_RECORDS_DETECTED</h4>
        <p class="text-[10px] font-mono text-gray-300 mt-2 uppercase tracking-widest max-w-xs leading-relaxed">Adjust filters or initialize search protocol to locate specific lead entities.</p>
        <button @click="clearAllFilters" class="mt-6 px-4 py-2 border border-gray-200 text-[10px] font-mono font-bold uppercase tracking-widest hover:border-[#2F2E8B] hover:text-[#2F2E8B] transition-all rounded-sm">RESET_FILTERS</button>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100">
      <div class="text-[8px] sm:text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest text-center sm:text-left">
        <span class="hidden sm:inline">Displaying </span><span class="text-[#2F2E8B] font-black">{{ pageStart }}-{{ pageEnd }}</span> // <span class="text-[#2F2E8B] font-black">{{ totalLeads }}</span>
      </div>
      <div class="flex items-center gap-2 sm:gap-4">
        <button 
          @click="page > 1 && (page--, loadLeads())" 
          :disabled="page === 1" 
          class="px-3 sm:px-4 py-2 border border-gray-200 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-widest hover:border-[#2F2E8B] hover:text-[#2F2E8B] disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-400 transition-all rounded-sm flex items-center gap-1 sm:gap-2 group"
        >
          <ChevronLeft :size="12" class="group-hover:-translate-x-1 transition-transform" />
          <span class="hidden sm:inline">PREVIOUS</span>
        </button>
        <div class="flex items-center gap-1 sm:gap-2">
          <span class="text-[9px] sm:text-[10px] font-mono font-black text-[#2F2E8B] uppercase">{{ page }}</span>
          <span class="text-[8px] font-mono text-gray-300">/</span>
          <span class="text-[9px] sm:text-[10px] font-mono font-bold text-gray-400 uppercase">{{ totalPages }}</span>
        </div>
        <button 
          @click="page < totalPages && (page++, loadLeads())" 
          :disabled="page === totalPages" 
          class="px-3 sm:px-4 py-2 border border-gray-200 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-widest hover:border-[#2F2E8B] hover:text-[#2F2E8B] disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-400 transition-all rounded-sm flex items-center gap-1 sm:gap-2 group"
        >
          <span class="hidden sm:inline">NEXT</span>
          <ChevronRight :size="12" class="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>

    <!-- Auto-Assign Confirm Modal -->
    <Teleport to="body">
      <div
        v-if="showAutoAssignModal"
        class="fixed inset-0 z-[500] flex items-center justify-center bg-black/60 backdrop-blur-sm"
        @click.self="showAutoAssignModal = false"
      >
        <div class="bg-white w-full max-w-md mx-4 border border-gray-200 shadow-2xl overflow-hidden">
          <div class="h-1.5 w-full bg-[#2F2E8B]"></div>
          <div class="p-6">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 bg-blue-50 border border-blue-200 flex items-center justify-center">
                <Zap :size="16" class="text-[#2F2E8B]" />
              </div>
              <div>
                <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Auto-Assign · Round-Robin</p>
                <p class="text-sm font-semibold text-gray-800">Distribute {{ leadStats.unassigned }} unassigned lead(s)?</p>
                <p class="text-[10px] text-gray-400 mt-2 font-mono leading-relaxed">
                  Leads will be distributed evenly across <strong>{{ props.users.filter(u => u.email).length }}</strong> team member(s) using round-robin. Existing assignments are not affected.
                </p>
              </div>
            </div>
          </div>
          <div class="px-6 pb-5 flex justify-end gap-3">
            <button type="button" @click="showAutoAssignModal = false" :disabled="autoAssignLoading"
              class="px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-wider border border-gray-300 text-gray-700 hover:bg-gray-50 transition disabled:opacity-50">
              Cancel
            </button>
            <button type="button" @click="runAutoAssign" :disabled="autoAssignLoading || leadStats.unassigned === 0"
              class="px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-wider bg-[#2F2E8B] text-white hover:bg-[#3D2F88] transition disabled:opacity-50 flex items-center gap-2">
              <i v-if="autoAssignLoading" class="fas fa-spinner fa-spin text-xs"></i>
              <Zap v-else :size="11" />
              {{ autoAssignLoading ? 'Assigning...' : 'Run Auto-Assign' }}
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
                <p class="text-sm font-semibold text-gray-800">Paste tab-separated data to add new leads</p>
              </div>
            </div>
            <textarea v-model="extractText" rows="8" placeholder="Paste data here (tab-separated)&#10;Format: Name, Email, Phone, Company, Position, Stage, Priority, Source, City, Country, Assignee&#10;Example:&#10;John Doe	john@email.com	+260977...	Acme Corp	CEO	New	hot	Website	Lusaka	Zambia	user@email.com"
              class="w-full border border-gray-200 bg-gray-50 px-3 py-2.5 text-[12px] font-mono text-gray-700 outline-none focus:border-blue-500 focus:bg-blue-50/30 resize-none rounded-sm transition-colors"></textarea>
            <div class="flex justify-end gap-2 mt-4">
              <button @click="showExtractDialog = false" class="px-4 py-2 border border-gray-200 text-gray-500 hover:bg-gray-50 text-[10px] font-mono font-bold uppercase tracking-widest transition-all rounded-sm">Cancel</button>
              <button @click="processExtractRows" :disabled="!extractText.trim()" class="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white text-[10px] font-mono font-bold uppercase tracking-widest transition-all flex items-center gap-1.5 rounded-sm">
                <Plus :size="12" /> Add {{ extractRowCount }} Lead{{ extractRowCount !== 1 ? 's' : '' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { useBulkSelect } from '@/composables/useBulkSelect';
import { useRoute } from 'vue-router';
import { BackButton, BulkActionsBar, SelectAllCheckbox } from '@/components/ui'
import { useCurrency } from '@/composables/useCurrency';
import * as crmApi from '@/services/crm_api.js';
import { decodeJWT } from '@/services/decodeJWT.js';
import { on as onCrmEvent } from '@/events/crmEvents.js';
import { useUIStore } from '@/stores/ui';
import { 
  Flame, Sun, Snowflake, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, 
  Search, X, Plus, Import, Upload, Filter, XCircle, 
  UserPlus, RefreshCw, Trash2, Download, LayoutList, LayoutGrid, 
  ArrowUpDown, ArrowUp, ArrowDown, Mail, Phone, Eye, Edit, Inbox,
  Archive, ArchiveRestore, Tag, Users, Calendar as CalendarIcon, Zap,
  FileSpreadsheet, Loader2
} from 'lucide-vue-next';

console.log('[LeadsView] Component setup running');

const { formatCurrency } = useCurrency();
const { getTenantId } = decodeJWT();
const uiStore = useUIStore();
const route = useRoute();

defineOptions({
  name: 'LeadsView'
});

const props = defineProps({
  users: {
    type: Array,
    default: () => []
  },
  branchId: {
    type: String,
    default: undefined
  }
});

const emit = defineEmits(['call', 'whatsapp', 'email', 'view', 'edit', 'leadChanged', 'add-lead', 'bulk-upload', 'export-leads', 'bulk-export']);

// Button handlers - use emit() from defineEmits (not $emit) for reliable event emission
function handleAddLead() {
  console.log('[LeadsView] ADD LEAD button clicked, emitting add-lead');
  emit('add-lead');
}
function handleBulkUpload() {
  console.log('[LeadsView] BULK UPLOAD button clicked, emitting bulk-upload');
  emit('bulk-upload');
}
function handleExportLeads() {
  console.log('[LeadsView] EXPORT LEADS button clicked, emitting export-leads');
  // Pass current filter state so the export respects active filters
  const activeFilters = {};
  if (searchTerm.value) activeFilters.q = searchTerm.value;
  if (leadQuickFilter.value) activeFilters.priority = leadQuickFilter.value;
  if (touchFilter.value) activeFilters.touched = touchFilter.value;
  if (stageFilter.value && stageFilter.value !== 'all') activeFilters.stage = stageFilter.value;
  if (sourceFilter.value) activeFilters.source = sourceFilter.value;
  if (assigneeFilter.value) activeFilters.assignedTo = assigneeFilter.value;
  if (groupFilter.value) activeFilters.group = groupFilter.value;
  if (tagFilter.value) activeFilters.tag = tagFilter.value;
  if (dateFromFilter.value) activeFilters.created_from = dateFromFilter.value;
  if (dateToFilter.value) activeFilters.created_to = dateToFilter.value;
  if (viewState.value === 'archived') activeFilters.archived = true;
  emit('export-leads', activeFilters);
}

// State
const leads = ref([]);
const totalLeads = ref(0);
const leadStats = ref({ hot: 0, warm: 0, cold: 0 });
const loading = ref(false);
const isStatsVisible = ref(true);
const page = ref(1);
const perPage = ref(25);
const searchTerm = ref('');
const leadQuickFilter = ref('');
const touchFilter = ref('');
const stageFilter = ref('all');
const assigneeFilter = ref('');
const sourceFilter = ref('');
const groupFilter = ref('');
const tagFilter = ref('');
const dateFromFilter = ref('');
const dateToFilter = ref('');
const availableStages = ref([]);
const viewState = ref('active'); // 'active' | 'archived'
const sortField = ref('created_at');
const sortDirection = ref('desc');
const viewMode = ref('table');
// Selection state (via useBulkSelect)
const showFilters = ref(false);
const priorityDropdownOpen = ref(false);
const showAssignDropdown = ref(false);
const userSearchQuery = ref('');
const showAutoAssignModal = ref(false);
const autoAssignLoading = ref(false);

const priorityOptions = [
  { value: '', label: 'All Priorities', icon: null },
  { value: 'hot', label: 'Hot', icon: 'Flame', color: 'text-red-500' },
  { value: 'warm', label: 'Warm', icon: 'Sun', color: 'text-orange-500' },
  { value: 'cold', label: 'Cold', icon: 'Snowflake', color: 'text-blue-500' }
];

const {
  selectedIds, selectionCount, hasSelection, isSelected, isAllPageSelected,
  toggleSelect, toggleSelectAll, clearSelection, getSelectedItems
} = useBulkSelect();

// Checkbox model refs for template binding
const selectAll = ref(false);
const selectedLeads = ref([]);

// Computed
const totalPages = computed(() => Math.max(1, Math.ceil(totalLeads.value / perPage.value)));
const pageStart = computed(() => totalLeads.value ? (page.value - 1) * perPage.value + 1 : 0);
const pageEnd = computed(() => Math.min(totalLeads.value, page.value * perPage.value));
const filteredLeadsCount = computed(() => leads.value.length);

const hasAnyFilters = computed(() => !!(searchTerm.value || leadQuickFilter.value || touchFilter.value || stageFilter.value !== 'all' || sourceFilter.value || assigneeFilter.value || groupFilter.value || tagFilter.value || dateFromFilter.value || dateToFilter.value));
const activeFiltersCount = computed(() => {
  let count = 0;
  if (searchTerm.value) count++;
  if (leadQuickFilter.value) count++;
  if (touchFilter.value) count++;
  if (stageFilter.value !== 'all') count++;
  if (sourceFilter.value) count++;
  if (assigneeFilter.value) count++;
  if (groupFilter.value) count++;
  if (tagFilter.value) count++;
  if (dateFromFilter.value) count++;
  if (dateToFilter.value) count++;
  return count;
});

const filteredTenantUsers = computed(() => {
  if (!userSearchQuery.value) return props.users;
  const q = userSearchQuery.value.toLowerCase();
  return props.users.filter(u => u.email.toLowerCase().includes(q));
});

// Methods
async function loadLeads() {
  const tenantId = getTenantId();
  if (!tenantId) return;

  loading.value = true;
  try {
    const params = {
      q: searchTerm.value.trim() || undefined,
      page: page.value,
      per_page: perPage.value,
      priority: leadQuickFilter.value || undefined,
      touched: touchFilter.value || undefined,
      stage: stageFilter.value === 'all' ? undefined : stageFilter.value,
      source: sourceFilter.value || undefined,
      assignedTo: assigneeFilter.value || undefined,
      group: groupFilter.value || undefined,
      tag: tagFilter.value || undefined,
      archived: viewState.value === 'archived' ? true : undefined,
      created_from: dateFromFilter.value || undefined,
      created_to: dateToFilter.value || undefined,
      sort_by: sortField.value,
      sort_order: sortDirection.value,
      branch_id: props.branchId
    };

    const resp = await crmApi.getLeads(tenantId, params);
    const items = Array.isArray(resp) ? resp : (resp?.items || []);
    leads.value = items;
    totalLeads.value = typeof resp?.total === 'number' ? resp.total : items.length;
    clearSelection();
    selectAll.value = false;
    // Refresh accurate KPI stats across the full filtered scope (not just current page)
    loadLeadStats();
  } catch (err) {
    console.error('Failed to load leads', err);
    leads.value = [];
    totalLeads.value = 0;
  } finally {
    loading.value = false;
  }
}

async function loadLeadStats() {
  const tenantId = getTenantId();
  if (!tenantId) return;
  try {
    // Same filter scope as the table, but ignore priority + pagination so the
    // Hot/Warm/Cold tiles reflect ALL leads matching the current view (active or archived).
    const statsParams = {
      q: searchTerm.value.trim() || undefined,
      touched: touchFilter.value || undefined,
      stage: stageFilter.value === 'all' ? undefined : stageFilter.value,
      source: sourceFilter.value || undefined,
      assignedTo: assigneeFilter.value || undefined,
      group: groupFilter.value || undefined,
      tag: tagFilter.value || undefined,
      archived: viewState.value === 'archived' ? true : undefined,
      created_from: dateFromFilter.value || undefined,
      created_to: dateToFilter.value || undefined,
      branch_id: props.branchId,
      per_page: 10000,
      page: 1
    };
    const resp = await crmApi.getLeads(tenantId, statsParams);
    const items = Array.isArray(resp) ? resp : (resp?.items || []);
    const counts = { hot: 0, warm: 0, cold: 0, unassigned: 0 };
    const stageSet = new Set();
    for (const l of items) {
      const p = (l.priority || '').toLowerCase();
      if (p === 'hot') counts.hot++;
      else if (p === 'warm') counts.warm++;
      else if (p === 'cold') counts.cold++;
      if (!l.assignedTo && !l.owner) counts.unassigned++;
      const s = (l.stage || '').toString().toLowerCase().trim();
      if (s) stageSet.add(s);
    }
    leadStats.value = counts;
    // Merge defaults with stages observed in data so the Stage filter stays accurate
    const defaults = ['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'closed-won', 'closed-lost'];
    const merged = Array.from(new Set([...defaults, ...stageSet]));
    availableStages.value = merged;
  } catch (err) {
    console.error('Failed to load lead stats', err);
    leadStats.value = { hot: 0, warm: 0, cold: 0, unassigned: 0 };
  }
}

async function runAutoAssign() {
  const tenantId = getTenantId();
  if (!tenantId) return;
  const assignableUsers = props.users.filter(u => u.email);
  if (assignableUsers.length === 0) {
    uiStore.showWarningToast('No users available for auto-assignment.');
    return;
  }
  autoAssignLoading.value = true;
  try {
    const resp = await crmApi.getLeads(tenantId, { per_page: 10000, page: 1 });
    const items = Array.isArray(resp) ? resp : (resp?.items || []);
    const unassigned = items.filter(l => !l.assignedTo && !l.owner);
    if (unassigned.length === 0) {
      uiStore.showInfoToast('No unassigned leads found.');
      showAutoAssignModal.value = false;
      return;
    }
    // Build round-robin batches: user[i % n] gets lead[i]
    const batches = {};
    unassigned.forEach((lead, i) => {
      const user = assignableUsers[i % assignableUsers.length];
      if (!batches[user.email]) batches[user.email] = [];
      batches[user.email].push(lead.id || lead._id);
    });
    for (const [email, leadIds] of Object.entries(batches)) {
      await crmApi.bulkAssignLeads({ lead_ids: leadIds, assignedTo: email, tenant_id: tenantId });
    }
    uiStore.showSuccessToast(`${unassigned.length} lead(s) distributed to ${assignableUsers.length} user(s).`);
    showAutoAssignModal.value = false;
    await loadLeads();
  } catch (err) {
    uiStore.showErrorToast(err.message || 'Auto-assign failed.');
  } finally {
    autoAssignLoading.value = false;
  }
}

function getInitialsName(name) {
  if (!name) return '?';
  const parts = name.split(' ');
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.substring(0, 2).toUpperCase();
}

function getPriorityBadgeClass(p) {
  if (!p) return 'bg-gray-100 text-gray-600';
  const val = p.toLowerCase();
  if (val === 'hot') return 'bg-red-100 text-red-700';
  if (val === 'warm') return 'bg-orange-100 text-orange-700';
  if (val === 'cold') return 'bg-blue-100 text-blue-700';
  return 'bg-gray-100 text-gray-600';
}

function getStageBadgeClass(s) {
  const val = (s || '').toLowerCase();
  if (val === 'new') return 'bg-blue-100 text-blue-700';
  if (val === 'contacted') return 'bg-indigo-100 text-indigo-700';
  return 'bg-gray-100 text-gray-600';
}

function getLeadPriorityClass(p) {
  if (!p) return 'border-gray-100';
  const val = p.toLowerCase();
  if (val === 'hot') return 'border-red-100';
  if (val === 'warm') return 'border-orange-100';
  if (val === 'cold') return 'border-blue-100';
  return 'border-gray-100';
}

function sortBy(field) {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortField.value = field;
    sortDirection.value = 'asc';
  }
  loadLeads();
}



function toggleSelectAllManual() {
  selectAll.value = !selectAll.value;
  toggleSelectAll();
}

function selectPriority(val) {
  leadQuickFilter.value = val;
  priorityDropdownOpen.value = false;
  page.value = 1;
  loadLeads();
}

function clearAllFilters() {
  searchTerm.value = '';
  leadQuickFilter.value = '';
  touchFilter.value = '';
  stageFilter.value = 'all';
  sourceFilter.value = '';
  assigneeFilter.value = '';
  groupFilter.value = '';
  tagFilter.value = '';
  dateFromFilter.value = '';
  dateToFilter.value = '';
  page.value = 1;
  loadLeads();
}

async function handleDelete(lead) {
  const msg = viewState.value === 'archived'
    ? `Permanently delete "${lead.name}"? This cannot be undone.`
    : `Archive "${lead.name}" first, or delete permanently?`;
  if (!confirm(msg)) return;
  try {
    await crmApi.deleteLead(lead.id, getTenantId());
    loadLeads();
    emit('leadChanged');
  } catch (err) {
    alert('Delete failed: ' + err.message);
  }
}

async function handleArchive(lead) {
  try {
    await crmApi.updateLead(lead.id, { ...lead, archived: true, tenant_id: getTenantId() }, getTenantId());
    loadLeads();
    emit('leadChanged');
  } catch (err) {
    leads.value = leads.value.filter(l => l.id !== lead.id);
    emit('leadChanged');
  }
}

async function handleRestore(lead) {
  try {
    await crmApi.updateLead(lead.id, { ...lead, archived: false, tenant_id: getTenantId() }, getTenantId());
    loadLeads();
    emit('leadChanged');
  } catch (err) {
    leads.value = leads.value.filter(l => l.id !== lead.id);
    emit('leadChanged');
  }
}

function setViewState(state) {
  viewState.value = state;
  page.value = 1;
  clearSelection();
  loadLeads();
}

function getLeadsByPriorityCount(priority) {
  // Simple local count for view
  return leads.value.filter(l => (l.priority || '').toLowerCase() === priority).length;
}

function getUserInitials(email) {
  return email ? email.substring(0, 2).toUpperCase() : '?';
}

async function assignLeadsToUser(email) {
  if (selectionCount.value === 0) return;
  loading.value = true;
  try {
    await crmApi.bulkAssignLeads({
      lead_ids: [...selectedIds.value],
      assignedTo: email,
      tenant_id: getTenantId()
    });
    showAssignDropdown.value = false;
    alert(`Assigned ${selectionCount.value} leads to ${email}`);
    await loadLeads();
    emit('leadChanged');
  } catch (err) {
    alert('Assignment failed: ' + err.message);
  } finally {
    loading.value = false;
  }
}

async function bulkDelete() {
  if (selectionCount.value === 0) return;
  const label = viewState.value === 'archived' ? 'permanently delete' : 'delete';
  if (!confirm(`Are you sure you want to ${label} ${selectionCount.value} leads?`)) return;
  loading.value = true;
  try {
    await crmApi.bulkDeleteLeads({
      lead_ids: [...selectedIds.value],
      tenant_id: getTenantId()
    });
    alert(`Deleted ${selectionCount.value} leads`);
    clearSelection();
    await loadLeads();
    emit('leadChanged');
  } catch (err) {
    alert('Bulk delete failed: ' + err.message);
  } finally {
    loading.value = false;
  }
}

async function bulkArchive() {
  if (selectionCount.value === 0) return;
  loading.value = true;
  try {
    const tenantId = getTenantId();
    await Promise.all([...selectedIds.value].map(id => {
      const lead = leads.value.find(l => l.id === id);
      return crmApi.updateLead(id, { ...lead, archived: true, tenant_id: tenantId }, tenantId);
    }));
    clearSelection();
    await loadLeads();
    emit('leadChanged');
  } catch (err) {
    leads.value = leads.value.filter(l => !selectedIds.value.has(l.id));
    clearSelection();
    emit('leadChanged');
  } finally {
    loading.value = false;
  }
}

async function bulkRestore() {
  if (selectionCount.value === 0) return;
  loading.value = true;
  try {
    const tenantId = getTenantId();
    await Promise.all([...selectedIds.value].map(id => {
      const lead = leads.value.find(l => l.id === id);
      return crmApi.updateLead(id, { ...lead, archived: false, tenant_id: tenantId }, tenantId);
    }));
    clearSelection();
    await loadLeads();
    emit('leadChanged');
  } catch (err) {
    leads.value = leads.value.filter(l => !selectedIds.value.has(l.id));
    clearSelection();
    emit('leadChanged');
  } finally {
    loading.value = false;
  }
}

async function changeBulkStage() {
  const stage = prompt('Enter new stage (new/contacted):');
  if (!stage || !['new', 'contacted'].includes(stage.toLowerCase())) {
     if (stage) alert('Invalid stage. Use new or contacted.');
     return;
  }
  loading.value = true;
  try {
    await crmApi.bulkUpdateLeads({
      lead_ids: [...selectedIds.value],
      updates: { stage: stage.toLowerCase() },
      tenant_id: getTenantId()
    });
    alert(`Updated ${selectionCount.value} leads to ${stage}`);
    clearSelection();
    await loadLeads();
    emit('leadChanged');
  } catch (err) {
    alert('Bulk update failed: ' + err.message);
  } finally {
    loading.value = false;
  }
}

function formatDate(date) {
  if (!date) return '-';
  return new Date(date).toLocaleDateString();
}

// Watchers
let searchTimeout;
watch(searchTerm, () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    page.value = 1;
    loadLeads();
  }, 500);
});

watch(() => props.branchId, () => {
  page.value = 1;
  loadLeads();
});

// Lifecycle
let _unsubLeadsChanged = null;
onMounted(() => {
  if (route.query.source) {
    sourceFilter.value = route.query.source;
    showFilters.value = true;
  }
  loadLeads();
  _unsubLeadsChanged = onCrmEvent('crm:leads:changed', () => { page.value = 1; loadLeads(); });
});
onBeforeUnmount(() => { if (typeof _unsubLeadsChanged === 'function') _unsubLeadsChanged(); });

// ── Inline Excel Editing ──
const isExcelEditing = ref(false);
const excelChanges = ref({});
const savingExcel = ref(false);
const showExtractDialog = ref(false);
const extractText = ref('');

const extractRowCount = computed(() => {
  if (!extractText.value.trim()) return 0;
  return extractText.value.trim().split('\n').filter(l => l.trim()).length;
});

function getExcelVal(lead, field) {
  const key = lead.id || lead._id;
  return excelChanges.value[key]?.[field] ?? '';
}

function setExcelVal(lead, field, value) {
  const key = lead.id || lead._id;
  if (!excelChanges.value[key]) excelChanges.value[key] = {};
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
  if (viewMode.value !== 'table') viewMode.value = 'table';
  const changes = {};
  for (const lead of leads.value) {
    const key = lead.id || lead._id;
    if (!key) continue;
    changes[key] = {
      name: lead.name || '',
      email: lead.email || '',
      company: lead.company || '',
      phone: lead.phone || '',
      position: lead.position || '',
      priority: lead.priority || '',
      stage: lead.stage || '',
      source: lead.source || '',
      city: lead.city || '',
      country: lead.country || '',
      website: lead.website || '',
      linkedin: lead.linkedin || '',
      twitter: lead.twitter || '',
      facebook: lead.facebook || '',
      instagram: lead.instagram || '',
      tpin: lead.tpin || '',
      cac: lead.cac ?? '',
      value: lead.value ?? '',
      assignedTo: lead.assignedTo || ''
    };
  }
  excelChanges.value = changes;
  isExcelEditing.value = true;
}

function deleteSelectedExcelRows() {
  if (!selectedLeads.value.length) { alert('Select leads to delete first using checkboxes.'); return; }
  if (!confirm(`Delete ${selectedLeads.value.length} selected lead(s)?`)) return;
  const ids = [...selectedLeads.value];
  ids.forEach(id => { delete excelChanges.value[id]; });
  leads.value = leads.value.filter(l => !ids.includes(l.id) && !ids.includes(l._id));
  selectedLeads.value = [];
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
    const newLead = {
      id: tempId,
      name,
      email: (parts[1] || '').trim(),
      phone: (parts[2] || '').trim(),
      company: (parts[3] || '').trim(),
      position: (parts[4] || '').trim(),
      stage: (parts[5] || '').trim(),
      priority: (parts[6] || '').trim(),
      source: (parts[7] || '').trim(),
      city: (parts[8] || '').trim(),
      country: (parts[9] || '').trim(),
      assignedTo: (parts[10] || '').trim()
    };
    leads.value.unshift(newLead);
    excelChanges.value[tempId] = {
      name: newLead.name,
      email: newLead.email,
      company: newLead.company,
      phone: newLead.phone,
      position: newLead.position || '',
      priority: newLead.priority,
      stage: newLead.stage,
      source: newLead.source || '',
      city: newLead.city || '',
      country: newLead.country || '',
      website: '',
      linkedin: '',
      twitter: '',
      facebook: '',
      instagram: '',
      tpin: '',
      cac: '',
      value: '',
      assignedTo: newLead.assignedTo
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
      if (changes.email !== undefined) payload.email = changes.email;
      if (changes.company !== undefined) payload.company = changes.company;
      if (changes.phone !== undefined) payload.phone = changes.phone;
      if (changes.position !== undefined) payload.position = changes.position;
      if (changes.priority !== undefined) payload.priority = changes.priority;
      if (changes.stage !== undefined) payload.stage = changes.stage;
      if (changes.source !== undefined) payload.source = changes.source;
      if (changes.city !== undefined) payload.city = changes.city;
      if (changes.country !== undefined) payload.country = changes.country;
      if (changes.website !== undefined) payload.website = changes.website;
      if (changes.linkedin !== undefined) payload.linkedin = changes.linkedin;
      if (changes.twitter !== undefined) payload.twitter = changes.twitter;
      if (changes.facebook !== undefined) payload.facebook = changes.facebook;
      if (changes.instagram !== undefined) payload.instagram = changes.instagram;
      if (changes.tpin !== undefined) payload.tpin = changes.tpin;
      if (changes.cac !== undefined) payload.cac = Number(changes.cac) || 0;
      if (changes.value !== '') payload.value = Number(changes.value) || 0;
      if (changes.assignedTo !== undefined) payload.assignedTo = changes.assignedTo;
      payload.tenant_id = tenantId;
      if (id.startsWith('new-')) {
        const created = await crmApi.createLead(payload);
        // Log creation
        if (created && (created.id || created._id)) {
          const newId = created.id || created._id;
          const fieldStr = Object.entries(changes).filter(([,v]) => v !== '').map(([k,v]) => `${k.toUpperCase()}: "${v}"`).join('; ');
          crmApi.logLeadActivity(newId, { tenant_id: tenantId, action: 'created', notes: 'Excel bulk create — ' + fieldStr }).catch(e => console.warn('[LeadsView] Log activity failed:', e));
        }
      } else {
        await crmApi.updateLead(id, payload, tenantId);
        // Log changes compared to original
        const original = leads.value.find(l => (l.id || l._id) === id);
        const diffs = [];
        if (original) {
          if (changes.name !== (original.name || '')) diffs.push(`NAME: "${original.name || ''}" → "${changes.name}"`);
          if (changes.email !== (original.email || '')) diffs.push(`EMAIL: "${original.email || ''}" → "${changes.email}"`);
          if (changes.company !== (original.company || '')) diffs.push(`COMPANY: "${original.company || ''}" → "${changes.company}"`);
          if (changes.phone !== (original.phone || '')) diffs.push(`PHONE: "${original.phone || ''}" → "${changes.phone}"`);
          if (changes.position !== (original.position || '')) diffs.push(`POSITION: "${original.position || ''}" → "${changes.position}"`);
          if (changes.priority !== (original.priority || '')) diffs.push(`PRIORITY: "${original.priority || ''}" → "${changes.priority}"`);
          if (changes.stage !== (original.stage || '')) diffs.push(`STAGE: "${original.stage || ''}" → "${changes.stage}"`);
          if (changes.source !== (original.source || '')) diffs.push(`SOURCE: "${original.source || ''}" → "${changes.source}"`);
          if (changes.city !== (original.city || '')) diffs.push(`CITY: "${original.city || ''}" → "${changes.city}"`);
          if (changes.country !== (original.country || '')) diffs.push(`COUNTRY: "${original.country || ''}" → "${changes.country}"`);
          if (changes.website !== (original.website || '')) diffs.push(`WEBSITE: "${original.website || ''}" → "${changes.website}"`);
          if (changes.linkedin !== (original.linkedin || '')) diffs.push(`LINKEDIN: "${original.linkedin || ''}" → "${changes.linkedin}"`);
          if (changes.twitter !== (original.twitter || '')) diffs.push(`TWITTER: "${original.twitter || ''}" → "${changes.twitter}"`);
          if (changes.facebook !== (original.facebook || '')) diffs.push(`FACEBOOK: "${original.facebook || ''}" → "${changes.facebook}"`);
          if (changes.instagram !== (original.instagram || '')) diffs.push(`INSTAGRAM: "${original.instagram || ''}" → "${changes.instagram}"`);
          if (changes.tpin !== (original.tpin || '')) diffs.push(`TPIN: "${original.tpin || ''}" → "${changes.tpin}"`);
          if (changes.cac !== (original.cac ?? '')) diffs.push(`CAC: "${original.cac ?? ''}" → "${changes.cac}"`);
          if (changes.assignedTo !== (original.assignedTo || '')) diffs.push(`ASSIGNED_TO: "${original.assignedTo || ''}" → "${changes.assignedTo}"`);
        }
        if (diffs.length) {
          crmApi.logLeadActivity(id, { tenant_id: tenantId, action: 'updated', notes: 'Excel bulk edit — ' + diffs.join('; ') }).catch(e => console.warn('[LeadsView] Log activity failed:', e));
        }
      }
      updated++;
    } catch (e) {
      console.warn(`[LeadsView] Failed to save lead ${id}:`, e);
      failed++;
    }
  }
  isExcelEditing.value = false;
  excelChanges.value = {};
  savingExcel.value = false;
  if (failed > 0) alert(`Saved ${updated} of ${entries.length} leads. ${failed} failed.`);
  if (updated > 0) {
    await loadLeads();
    emit('leadChanged');
  }
}

defineExpose({
  loadLeads,
  viewState,
  setViewState
});
</script>