<template>
  <div class="min-h-screen flex flex-col font-sans relative text-gray-900">
    <!-- Mesh Background -->
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <!-- Header -->
    <header class="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <button @click="$router.push('/dashboard/finance')" class="text-gray-400 hover:text-[#2F2E8B] transition-colors mr-1" title="Back to Finance Dashboard">
            <i class="fas fa-arrow-left text-lg"></i>
          </button>
          <div class="w-2 h-8 bg-[#2F2E8B] rounded-none"></div>
          <div>
            <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Finance // Funding</span>
            <h1 class="text-xl font-black text-gray-900 uppercase tracking-tight">Loan & Funding Management</h1>
          </div>
        </div>
        <div class="flex items-center gap-2 font-mono">
          <button @click="openReportModal" class="bg-white border border-gray-300 hover:border-[#2F2E8B] text-gray-700 px-4 py-2 rounded-none text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2">
            <i class="fas fa-file-export"></i> Reports
          </button>
          <button @click="showLoanForm = true" class="bg-[#2F2E8B] hover:bg-[#24236e] text-white px-4 py-2 rounded-none text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2">
            <i class="fas fa-plus"></i> New Loan
          </button>
          <button @click="showGrantForm = true" class="bg-white border border-gray-300 hover:border-[#2F2E8B] text-gray-700 px-4 py-2 rounded-none text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2">
            <i class="fas fa-gift"></i> New Grant
          </button>
          <button @click="showCapitalForm = true" class="bg-white border border-gray-300 hover:border-[#2F2E8B] text-gray-700 px-4 py-2 rounded-none text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2">
            <i class="fas fa-coins"></i> New Capital
          </button>
          <button @click="showCreditForm = true" class="bg-white border border-gray-300 hover:border-[#2F2E8B] text-gray-700 px-4 py-2 rounded-none text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2">
            <i class="fas fa-credit-card"></i> Set Credit
          </button>
        </div>
      </div>
    </header>

    <main class="flex-1 max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-12 relative z-10 space-y-8">

      <!-- Filter Bar -->
      <div class="bg-white border border-gray-100 p-4 rounded-none shadow-sm space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-1 h-4 bg-[#2F2E8B]"></div>
            <span class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Filter & Search</span>
          </div>
          <button @click="clearFilters" class="text-[9px] font-mono font-bold text-gray-400 hover:text-[#2F2E8B] uppercase tracking-wider transition-colors">
            <i class="fas fa-times-circle mr-1"></i> Clear Filters
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mb-1 block">Search</label>
            <input v-model="searchQuery" type="text" placeholder="Search by name, source, code..." class="w-full rounded-none border border-gray-200 px-4 py-2 text-sm font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]" />
          </div>
          <div>
            <label class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mb-1 block">Status</label>
            <select v-model="statusFilter" class="w-full rounded-none border border-gray-200 px-4 py-2 text-sm font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]">
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="repaid">Repaid</option>
              <option value="overdue">Overdue</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div>
            <label class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mb-1 block">Time Frame</label>
            <select v-model="timeFrame" class="w-full rounded-none border border-gray-200 px-4 py-2 text-sm font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]">
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          <div>
            <label class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mb-1 block">Source / Contributor</label>
            <input v-model="sourceFilter" type="text" placeholder="Filter by source..." class="w-full rounded-none border border-gray-200 px-4 py-2 text-sm font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]" />
          </div>
        </div>
        <!-- Custom Date Range -->
        <div v-if="timeFrame === 'custom'" class="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100">
          <div>
            <label class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mb-1 block">Start Date</label>
            <input v-model="customStartDate" type="date" class="w-full rounded-none border border-gray-200 px-4 py-2 text-sm font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] uppercase" />
          </div>
          <div>
            <label class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mb-1 block">End Date</label>
            <input v-model="customEndDate" type="date" class="w-full rounded-none border border-gray-200 px-4 py-2 text-sm font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] uppercase" />
          </div>
        </div>
      </div>

      <!-- KPI Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Total Grants -->
        <div class="bg-white p-6 border border-gray-200 shadow-sm rounded-none relative overflow-hidden group hover:border-emerald-500 transition-all" :class="{ 'border-emerald-400 bg-emerald-50/30': hasActiveFilters }">
          <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-30"></div>
          <div class="relative z-10">
            <h3 class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Total_Grants</h3>
            <p class="text-3xl font-black text-emerald-600 tracking-tighter">{{ $formatCurrency(kpiGrants) }}</p>
            <p class="text-[9px] font-mono text-gray-400 uppercase mt-1">{{ kpiGrantsCount }} Grants {{ hasActiveFilters ? '(filtered)' : 'Received' }}</p>
          </div>
          <div class="absolute bottom-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <i class="fas fa-gift text-5xl"></i>
          </div>
        </div>
        <!-- Total Capital -->
        <div class="bg-white p-6 border border-gray-200 shadow-sm rounded-none relative overflow-hidden group hover:border-[#2F2E8B] transition-all" :class="{ 'border-amber-400 bg-amber-50/30': hasActiveFilters }">
          <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-30"></div>
          <div class="relative z-10">
            <h3 class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Total_Capital</h3>
            <p class="text-3xl font-black text-[#2F2E8B] tracking-tighter">{{ $formatCurrency(kpiCapital) }}</p>
            <p class="text-[9px] font-mono text-gray-400 uppercase mt-1">{{ kpiCapitalCount }} {{ hasActiveFilters ? '(filtered)' : 'Invested' }}</p>
          </div>
          <div class="absolute bottom-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <i class="fas fa-coins text-5xl"></i>
          </div>
        </div>
        <!-- Total Loans -->
        <div class="bg-white p-6 border border-gray-200 shadow-sm rounded-none relative overflow-hidden group hover:border-[#2F2E8B] transition-all" :class="{ 'border-[#2F2E8B]/40 bg-indigo-50/30': hasActiveFilters }">
          <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-30"></div>
          <div class="relative z-10">
            <h3 class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Total_Loans</h3>
            <p class="text-3xl font-black text-[#2F2E8B] tracking-tighter">{{ $formatCurrency(kpiLoans) }}</p>
            <p class="text-[9px] font-mono text-gray-400 uppercase mt-1">{{ kpiLoansCount }} {{ hasActiveFilters ? '(filtered)' : 'Outstanding' }}</p>
          </div>
          <div class="absolute bottom-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <i class="fas fa-money-bill-wave text-5xl"></i>
          </div>
        </div>
        <!-- Total Funding -->
        <div class="bg-white p-6 border border-gray-200 shadow-sm rounded-none relative overflow-hidden group hover:border-[#2F2E8B] transition-all" :class="{ 'border-gray-300 bg-gray-50/50': hasActiveFilters }">
          <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-30"></div>
          <div class="relative z-10">
            <h3 class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Total_Funding</h3>
            <p class="text-3xl font-black text-[#2F2E8B] tracking-tighter">{{ $formatCurrency(kpiFunding) }}</p>
            <p class="text-[9px] font-mono text-gray-400 uppercase mt-1">{{ kpiFundingCount }} {{ hasActiveFilters ? '(filtered)' : 'Grants + Capital' }}</p>
          </div>
          <div class="absolute bottom-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <i class="fas fa-hand-holding-usd text-5xl"></i>
          </div>
        </div>
      </div>

      <!-- Tab Switcher -->
      <div class="flex items-center gap-1 border-b border-gray-200">
        <button @click="activeTab = 'loans'" :class="activeTab === 'loans' ? 'border-[#2F2E8B] text-[#2F2E8B] bg-gray-50' : 'border-transparent text-gray-400 hover:text-gray-600'" class="px-6 py-3 border-b-2 text-[10px] font-mono font-bold uppercase tracking-widest transition-all">Active Loans</button>
        <button @click="activeTab = 'grants'" :class="activeTab === 'grants' ? 'border-emerald-500 text-emerald-600 bg-gray-50' : 'border-transparent text-gray-400 hover:text-gray-600'" class="px-6 py-3 border-b-2 text-[10px] font-mono font-bold uppercase tracking-widest transition-all">Grants (Investments)</button>
        <button @click="activeTab = 'capital'" :class="activeTab === 'capital' ? 'border-amber-500 text-amber-600 bg-gray-50' : 'border-transparent text-gray-400 hover:text-gray-600'" class="px-6 py-3 border-b-2 text-[10px] font-mono font-bold uppercase tracking-widest transition-all">Capital (Equity)</button>
      </div>

      <!-- Active Loans Table -->
      <div v-if="activeTab === 'loans'" class="bg-white border border-gray-200 shadow-sm rounded-none overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div class="p-4 border-b border-gray-200 bg-gray-50/50 flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="w-1 h-5 bg-[#2F2E8B] rounded-none"></div>
            <h4 class="text-xs font-black text-gray-900 uppercase tracking-tight">Active Loans</h4>
          </div>
          <div class="flex items-center gap-3">
            <button v-if="selectedLoanIds.length > 0" @click="bulkDeleteLoans" class="text-[9px] font-mono font-bold text-red-600 uppercase hover:underline">Delete Selected ({{ selectedLoanIds.length }})</button>
            <span class="text-[9px] font-mono font-bold text-gray-400 uppercase">{{ filteredLoans.length }} of {{ activeLoans.length }} Records</span>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="px-4 py-3 w-10">
                   <input type="checkbox" :checked="selectedLoanIds.length === filteredLoans.length && filteredLoans.length > 0" @change="toggleAllLoans" class="rounded-none border-gray-300 text-[#2F2E8B] focus:ring-[#2F2E8B]">
                </th>
                <th class="px-6 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Client</th>
                <th class="px-6 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Code</th>
                <th class="px-6 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                <th class="px-6 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Reason</th>
                <th class="px-6 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Paid</th>
                <th class="px-6 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Balance</th>
                <th class="px-6 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Interest</th>
                <th class="px-6 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Due_Date</th>
                <th class="px-6 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th class="px-6 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="loan in filteredLoans" :key="loan.id" class="hover:bg-gray-50 transition-colors">
                <td class="px-4 py-4">
                  <input type="checkbox" :checked="selectedLoanIds.includes(loan.id)" @change="toggleLoanSelection(loan.id)" class="rounded-none border-gray-300 text-[#2F2E8B] focus:ring-[#2F2E8B]">
                </td>
                <td class="px-6 py-4 text-xs font-mono font-bold text-gray-800 uppercase">{{ loan.name || 'N/A' }}</td>
                <td class="px-6 py-4 text-[10px] font-mono font-bold text-[#2F2E8B]">{{ loan.loan_code || 'LN-NEW' }}</td>
                <td class="px-6 py-4 text-xs font-mono font-bold text-gray-800">{{ $formatCurrency(loan.amount) }}</td>
                <td class="px-6 py-4 text-[10px] font-mono text-gray-500 max-w-[150px] truncate">{{ loan.reason || 'N/A' }}</td>
                <td class="px-6 py-4 text-xs font-mono font-bold text-emerald-600">{{ $formatCurrency(loan.paid_amount || 0) }}</td>
                <td class="px-6 py-4 text-xs font-mono font-bold" :class="getLoanBalance(loan) > 0 ? 'text-red-600' : 'text-emerald-600'">
                  {{ getLoanBalance(loan) > 0 ? $formatCurrency(getLoanBalance(loan)) : 'REPAID' }}
                </td>
                <td class="px-6 py-4 text-xs font-mono text-gray-600">{{ loan.interest }}%</td>
                <td class="px-6 py-4 text-xs font-mono text-gray-600">{{ formatDate(loan.dueDate) }}</td>
                <td class="px-6 py-4">
                  <span :class="getStatusClass(getLoanDisplayStatus(loan))" class="px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded-none border">{{ getLoanDisplayStatus(loan) }}</span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-4">
                    <button v-if="getLoanBalance(loan) > 0" @click="openRepaymentModal(loan)" title="Record Repayment" class="text-emerald-600 hover:text-emerald-700 transition-colors">
                      <i class="fas fa-hand-holding-usd text-sm"></i>
                    </button>
                    <button @click="openLoanPreview(loan)" title="Preview Details" class="text-gray-400 hover:text-gray-600 transition-colors">
                      <i class="fas fa-eye text-sm"></i>
                    </button>
                    <button @click="viewLoanDetails(loan)" title="Edit Loan" class="text-[#2F2E8B] hover:text-[#24236e] transition-colors">
                      <i class="fas fa-edit text-sm"></i>
                    </button>
                    <button @click="deleteLoan(loan)" title="Delete Loan" class="text-red-500 hover:text-red-700 transition-colors">
                      <i class="fas fa-trash-alt text-sm"></i>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="!filteredLoans.length">
                <td colspan="11" class="px-6 py-12 text-center text-[10px] font-mono text-gray-400 uppercase tracking-widest">No_Loans_Match_Filters</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Pagination -->
        <div class="p-4 border-t border-gray-100 bg-gray-50/30 flex justify-between items-center">
          <span class="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Page {{ loansPage }} of {{ loansPages }}</span>
          <div class="flex gap-2">
            <button @click="loansPage--; fetchLoans()" :disabled="loansPage === 1" class="px-3 py-1 border border-gray-300 text-[10px] font-mono font-bold uppercase tracking-widest disabled:opacity-30">Prev</button>
            <button @click="loansPage++; fetchLoans()" :disabled="loansPage === loansPages" class="px-3 py-1 border border-gray-300 text-[10px] font-mono font-bold uppercase tracking-widest disabled:opacity-30">Next</button>
          </div>
        </div>
      </div>

      <!-- Grants Table -->
      <div v-if="activeTab === 'grants'" class="bg-white border border-gray-200 shadow-sm rounded-none overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div class="p-4 border-b border-gray-200 bg-gray-50/50 flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="w-1 h-5 bg-emerald-500 rounded-none"></div>
            <h4 class="text-xs font-black text-gray-900 uppercase tracking-tight">Grants (Investments)</h4>
          </div>
          <div class="flex items-center gap-3">
            <button v-if="selectedGrantIds.length > 0" @click="bulkDeleteGrants" class="text-[9px] font-mono font-bold text-red-600 uppercase hover:underline">Delete Selected ({{ selectedGrantIds.length }})</button>
            <span class="text-[9px] font-mono font-bold text-gray-400 uppercase">{{ filteredGrants.length }} of {{ grants.length }} Records</span>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="px-4 py-3 w-10">
                   <input type="checkbox" :checked="selectedGrantIds.length === filteredGrants.length && filteredGrants.length > 0" @change="toggleAllGrants" class="rounded-none border-gray-300 text-emerald-600 focus:ring-emerald-500">
                </th>
                <th class="px-6 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Code</th>
                <th class="px-6 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                <th class="px-6 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Source</th>
                <th class="px-6 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Date_Received</th>
                <th class="px-6 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Reason</th>
                <th class="px-6 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th class="px-6 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="grant in filteredGrants" :key="grant.id" class="hover:bg-gray-50 transition-colors">
                <td class="px-4 py-4">
                  <input type="checkbox" :checked="selectedGrantIds.includes(grant.id)" @change="toggleGrantSelection(grant.id)" class="rounded-none border-gray-300 text-emerald-600 focus:ring-emerald-500">
                </td>
                <td class="px-6 py-4 text-[10px] font-mono font-bold text-emerald-600">{{ grant.grant_code || 'GR-NEW' }}</td>
                <td class="px-6 py-4 text-xs font-mono font-bold text-gray-800">{{ $formatCurrency(grant.amount) }}</td>
                <td class="px-6 py-4 text-xs font-mono font-bold text-gray-800 uppercase">{{ grant.source }}</td>
                <td class="px-6 py-4 text-xs font-mono text-gray-600">{{ formatDate(grant.dateReceived) }}</td>
                <td class="px-6 py-4 text-[10px] font-mono text-gray-500 max-w-[200px] truncate">{{ grant.reason || grant.purpose }}</td>
                <td class="px-6 py-4">
                  <span :class="getStatusClass(grant.status)" class="px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded-none border">{{ grant.status }}</span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-4">
                    <button @click="openGrantPreview(grant)" title="Preview Grant" class="text-gray-400 hover:text-gray-600 transition-colors">
                      <i class="fas fa-eye text-sm"></i>
                    </button>
                    <button @click="viewGrantDetails(grant)" title="Edit Grant" class="text-[#2F2E8B] hover:text-[#24236e] transition-colors">
                      <i class="fas fa-edit text-sm"></i>
                    </button>
                    <button @click="deleteGrant(grant)" title="Delete Grant" class="text-red-500 hover:text-red-700 transition-colors">
                      <i class="fas fa-trash-alt text-sm"></i>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="!filteredGrants.length">
                <td colspan="7" class="px-6 py-12 text-center text-[10px] font-mono text-gray-400 uppercase tracking-widest">No_Grants_Match_Filters</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Pagination -->
        <div class="p-4 border-t border-gray-100 bg-gray-50/30 flex justify-between items-center">
          <span class="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Page {{ grantsPage }} of {{ grantsPages }}</span>
          <div class="flex gap-2">
            <button @click="grantsPage--; fetchGrants()" :disabled="grantsPage === 1" class="px-3 py-1 border border-gray-300 text-[10px] font-mono font-bold uppercase tracking-widest disabled:opacity-30">Prev</button>
            <button @click="grantsPage++; fetchGrants()" :disabled="grantsPage === grantsPages" class="px-3 py-1 border border-gray-300 text-[10px] font-mono font-bold uppercase tracking-widest disabled:opacity-30">Next</button>
          </div>
        </div>
      </div>

      <!-- Capital Table -->
      <div v-if="activeTab === 'capital'" class="bg-white border border-gray-200 shadow-sm rounded-none overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div class="p-4 border-b border-gray-200 bg-gray-50/50 flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="w-1 h-5 bg-amber-500 rounded-none"></div>
            <h4 class="text-xs font-black text-gray-900 uppercase tracking-tight">Capital (Equity)</h4>
          </div>
          <div class="flex items-center gap-3">
            <button v-if="selectedCapitalIds.length > 0" @click="bulkDeleteCapital" class="text-[9px] font-mono font-bold text-red-600 uppercase hover:underline">Delete Selected ({{ selectedCapitalIds.length }})</button>
            <span class="text-[9px] font-mono font-bold text-gray-400 uppercase">{{ filteredCapital.length }} of {{ capitalContributions.length }} Records</span>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="px-4 py-3 w-10">
                   <input type="checkbox" :checked="selectedCapitalIds.length === filteredCapital.length && filteredCapital.length > 0" @change="toggleAllCapital" class="rounded-none border-gray-300 text-amber-600 focus:ring-amber-500">
                </th>
                <th class="px-6 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Code</th>
                <th class="px-6 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                <th class="px-6 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Contributor</th>
                <th class="px-6 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Date</th>
                <th class="px-6 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Equity_%</th>
                <th class="px-6 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Reason</th>
                <th class="px-6 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th class="px-6 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="capital in filteredCapital" :key="capital.id" class="hover:bg-gray-50 transition-colors">
                <td class="px-4 py-4">
                  <input type="checkbox" :checked="selectedCapitalIds.includes(capital.id)" @change="toggleCapitalSelection(capital.id)" class="rounded-none border-gray-300 text-amber-600 focus:ring-amber-500">
                </td>
                <td class="px-6 py-4 text-[10px] font-mono font-bold text-amber-600">{{ capital.capital_code || 'CAP-NEW' }}</td>
                <td class="px-6 py-4 text-xs font-mono font-bold text-gray-800">{{ $formatCurrency(capital.amount) }}</td>
                <td class="px-6 py-4 text-xs font-mono font-bold text-gray-800 uppercase">{{ capital.contributor }}</td>
                <td class="px-6 py-4 text-xs font-mono text-gray-600">{{ formatDate(capital.dateContributed) }}</td>
                <td class="px-6 py-4 text-xs font-mono text-gray-600">{{ capital.equityShare }}%</td>
                <td class="px-6 py-4 text-[10px] font-mono text-gray-500 max-w-[150px] truncate">{{ capital.reason || 'N/A' }}</td>
                <td class="px-6 py-4">
                  <span :class="getStatusClass(capital.status)" class="px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded-none border">{{ capital.status }}</span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-4">
                    <button @click="openCapitalPreview(capital)" title="Preview Capital" class="text-gray-400 hover:text-gray-600 transition-colors">
                      <i class="fas fa-eye text-sm"></i>
                    </button>
                    <button @click="viewCapitalDetails(capital)" title="Edit Capital" class="text-[#2F2E8B] hover:text-[#24236e] transition-colors">
                      <i class="fas fa-edit text-sm"></i>
                    </button>
                    <button @click="deleteCapital(capital)" title="Delete Capital" class="text-red-500 hover:text-red-700 transition-colors">
                      <i class="fas fa-trash-alt text-sm"></i>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="!filteredCapital.length">
                <td colspan="8" class="px-6 py-12 text-center text-[10px] font-mono text-gray-400 uppercase tracking-widest">No_Capital_Match_Filters</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Pagination -->
        <div class="p-4 border-t border-gray-100 bg-gray-50/30 flex justify-between items-center">
          <span class="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Page {{ capitalPage }} of {{ capitalPages }}</span>
          <div class="flex gap-2">
            <button @click="capitalPage--; fetchCapital()" :disabled="capitalPage === 1" class="px-3 py-1 border border-gray-300 text-[10px] font-mono font-bold uppercase tracking-widest disabled:opacity-30">Prev</button>
            <button @click="capitalPage++; fetchCapital()" :disabled="capitalPage === capitalPages" class="px-3 py-1 border border-gray-300 text-[10px] font-mono font-bold uppercase tracking-widest disabled:opacity-30">Next</button>
          </div>
        </div>
      </div>
    </main>

    <!-- ============ MODALS (Teleported, z-[10000]) ============ -->

    <!-- Credit Form Modal -->
    <Teleport to="body">
    <div v-if="showCreditForm" class="fixed inset-0 z-[10000] flex items-center justify-center p-4" @click.self="showCreditForm = false">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div class="relative w-full max-w-md bg-white rounded-none shadow-2xl overflow-hidden" @click.stop>
        <div class="h-1.5 bg-[#2F2E8B]"></div>
        <div class="p-6 border-b border-gray-100 flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="w-1 h-5 bg-[#2F2E8B]"></div>
            <div>
              <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Finance // Credit</span>
              <h3 class="text-lg font-black text-gray-900 uppercase tracking-tight">Set Available Credit</h3>
            </div>
          </div>
          <button @click="showCreditForm = false" class="text-gray-400 hover:text-gray-600"><i class="fas fa-times"></i></button>
        </div>
        <form @submit.prevent="setCredit" class="p-6 space-y-4">
          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Available Credit Amount</label>
            <input v-model="newCreditAmount" type="number" step="0.01" required class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none">
          </div>
          <div class="flex justify-end gap-2 pt-2">
            <button type="button" @click="showCreditForm = false" class="px-4 py-2 border border-gray-300 text-gray-600 rounded-none text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-gray-50">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-[#2F2E8B] text-white rounded-none text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-[#24236e]">Set Credit</button>
          </div>
        </form>
      </div>
    </div>
    </Teleport>

    <!-- Loan Form Modal -->
    <Teleport to="body">
    <div v-if="showLoanForm" class="fixed inset-0 z-[10000] flex items-center justify-center p-4" @click.self="showLoanForm = false">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div class="relative w-full max-w-2xl bg-white rounded-none shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto" @click.stop>
        <div class="h-1.5 bg-[#2F2E8B]"></div>
        <div class="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
          <div class="flex items-center gap-3">
            <div class="w-1 h-5 bg-[#2F2E8B]"></div>
            <div>
              <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Finance // New Loan</span>
              <h3 class="text-lg font-black text-gray-900 uppercase tracking-tight">Loan Application</h3>
            </div>
          </div>
          <button @click="showLoanForm = false" class="text-gray-400 hover:text-gray-600"><i class="fas fa-times"></i></button>
        </div>
        <form @submit.prevent="submitLoan" class="p-6 grid grid-cols-2 gap-4">
          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Client Name</label>
            <input v-model="newLoan.name" type="text" required class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none">
          </div>
          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Phone Number</label>
            <input v-model="newLoan.phone" type="tel" required class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none">
          </div>
          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Email</label>
            <input v-model="newLoan.email" type="email" required class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none">
          </div>
          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Location</label>
            <input v-model="newLoan.location" type="text" required class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none">
          </div>
          <div class="col-span-2">
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Reason / Purpose</label>
            <textarea v-model="newLoan.reason" rows="2" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none" placeholder="Reason for the loan..."></textarea>
          </div>
          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Loan Amount</label>
            <input v-model="newLoan.amount" type="number" step="0.01" required class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none">
          </div>
          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Interest Rate (%)</label>
            <input v-model="newLoan.interest" type="number" step="0.1" required class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none">
          </div>
          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Collateral</label>
            <input v-model="newLoan.collateral" type="text" required class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none">
          </div>
          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Due Date</label>
            <input v-model="newLoan.dueDate" type="date" required class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none">
          </div>
          <div class="col-span-2 flex justify-end gap-2 pt-4 border-t border-gray-100">
            <button type="button" @click="showLoanForm = false" class="px-4 py-2 border border-gray-300 text-gray-600 rounded-none text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-gray-50">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-[#2F2E8B] text-white rounded-none text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-[#24236e]">Submit</button>
          </div>
        </form>
      </div>
    </div>
    </Teleport>

    <!-- Loan Details Modal -->
    <Teleport to="body">
    <div v-if="showLoanDetailsModal" class="fixed inset-0 z-[10000] flex items-center justify-center p-4" @click.self="showLoanDetailsModal = false">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div class="relative w-full max-w-2xl bg-white rounded-none shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto" @click.stop>
        <div class="h-1.5 bg-[#2F2E8B]"></div>
        <div class="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
          <div class="flex items-center gap-3">
            <div class="w-1 h-5 bg-[#2F2E8B]"></div>
            <div>
              <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Finance // Edit Loan</span>
              <h3 class="text-lg font-black text-gray-900 uppercase tracking-tight">Loan Details</h3>
            </div>
          </div>
          <div class="px-6 py-2 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
            <span class="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Filed On: {{ formatDate(selectedLoan.created_at) }}</span>
            <span class="text-[9px] font-mono text-gray-400 uppercase tracking-widest">System ID: {{ selectedLoan.id }}</span>
          </div>
          <button @click="showLoanDetailsModal = false" class="text-gray-400 hover:text-gray-600 px-6"><i class="fas fa-times"></i></button>
        </div>
        <form @submit.prevent="updateLoan" class="p-6 grid grid-cols-2 gap-4">
          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Client Name</label>
            <input v-model="selectedLoan.name" type="text" required class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none">
          </div>
          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Phone Number</label>
            <input v-model="selectedLoan.phone" type="tel" required class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none">
          </div>
          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Email</label>
            <input v-model="selectedLoan.email" type="email" required class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none">
          </div>
          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Location</label>
            <input v-model="selectedLoan.location" type="text" required class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none">
          </div>
          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Loan Amount</label>
            <input v-model="selectedLoan.amount" type="number" step="0.01" required class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none">
          </div>
          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Interest Rate (%)</label>
            <input v-model="selectedLoan.interest" type="number" step="0.1" required class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none">
          </div>
          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Collateral</label>
            <input v-model="selectedLoan.collateral" type="text" required class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none">
          </div>
          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Due Date</label>
            <input v-model="selectedLoan.dueDate" type="date" required class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none">
          </div>
          <div class="col-span-2">
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Reason / Purpose</label>
            <textarea v-model="selectedLoan.reason" rows="2" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none"></textarea>
          </div>

          <!-- Repayment History Section -->
          <div v-if="selectedLoan.repayment_history && selectedLoan.repayment_history.length > 0" class="col-span-2 mt-4">
            <div class="flex items-center gap-2 mb-3">
              <div class="w-1 h-3 bg-emerald-500"></div>
              <h4 class="text-[10px] font-black text-gray-900 uppercase tracking-widest">Repayment History</h4>
            </div>
            <div class="border border-gray-100 overflow-hidden">
              <table class="w-full text-left">
                <thead class="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th class="px-4 py-2 text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">Date</th>
                    <th class="px-4 py-2 text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest text-right">Amount</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                  <tr v-for="entry in selectedLoan.repayment_history" :key="entry.id" class="hover:bg-gray-50">
                    <td class="px-4 py-2 text-[10px] font-mono text-gray-600">{{ formatDate(entry.date) }}</td>
                    <td class="px-4 py-2 text-[10px] font-mono font-bold text-emerald-600 text-right">{{ $formatCurrency(entry.amount) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="col-span-2 flex justify-end gap-2 pt-4 border-t border-gray-100">
            <button type="button" @click="showLoanDetailsModal = false" class="px-4 py-2 border border-gray-300 text-gray-600 rounded-none text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-gray-50">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-[#2F2E8B] text-white rounded-none text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-[#24236e]">Update</button>
          </div>
        </form>
      </div>
    </div>
    </Teleport>

    <!-- Repayment Modal -->
    <Teleport to="body">
    <div v-if="showRepaymentModal" class="fixed inset-0 z-[10000] flex items-center justify-center p-4" @click.self="showRepaymentModal = false">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div class="relative w-full max-w-md bg-white rounded-none shadow-2xl overflow-hidden" @click.stop>
        <div class="h-1.5 bg-emerald-500"></div>
        <div class="p-6 border-b border-gray-100 flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="w-1 h-5 bg-emerald-500"></div>
            <div>
              <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Finance // Repayment</span>
              <h3 class="text-lg font-black text-gray-900 uppercase tracking-tight">Record Repayment</h3>
            </div>
          </div>
          <button @click="showRepaymentModal = false" class="text-gray-400 hover:text-gray-600"><i class="fas fa-times"></i></button>
        </div>
        <div class="p-6 bg-gray-50 border-b border-gray-100">
          <div class="flex justify-between items-center mb-2">
            <span class="text-[10px] font-mono text-gray-400 uppercase">Client</span>
            <span class="text-xs font-mono font-bold uppercase">{{ selectedLoanForRepayment.name }}</span>
          </div>
          <div class="flex justify-between items-center mb-2">
            <span class="text-[10px] font-mono text-gray-400 uppercase">Total Loan</span>
            <span class="text-xs font-mono font-bold">{{ $formatCurrency(selectedLoanForRepayment.amount) }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-[10px] font-mono text-gray-400 uppercase">Remaining Balance</span>
            <span class="text-xs font-mono font-bold text-red-600">{{ $formatCurrency(getLoanBalance(selectedLoanForRepayment)) }}</span>
          </div>
        </div>
        <form @submit.prevent="submitRepayment" class="p-6 space-y-4">
          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Repayment Amount</label>
            <input v-model="repaymentForm.amount" type="number" step="0.01" :max="getLoanBalance(selectedLoanForRepayment)" required class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs font-mono focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none">
          </div>
          <div class="flex justify-end gap-2 pt-2">
            <button type="button" @click="showRepaymentModal = false" class="px-4 py-2 border border-gray-300 text-gray-600 rounded-none text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-gray-50">Cancel</button>
            <button type="submit" :disabled="getLoanBalance(selectedLoanForRepayment) <= 0" class="px-4 py-2 bg-emerald-600 text-white rounded-none text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed">Submit Repayment</button>
          </div>
        </form>
      </div>
    </div>
    </Teleport>

    <!-- Grant Form Modal -->
    <Teleport to="body">
    <div v-if="showGrantForm" class="fixed inset-0 z-[10000] flex items-center justify-center p-4" @click.self="showGrantForm = false">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div class="relative w-full max-w-md bg-white rounded-none shadow-2xl overflow-hidden" @click.stop>
        <div class="h-1.5 bg-emerald-500"></div>
        <div class="p-6 border-b border-gray-100 flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="w-1 h-5 bg-emerald-500"></div>
            <div>
              <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Finance // New Grant</span>
              <h3 class="text-lg font-black text-gray-900 uppercase tracking-tight">Grant Application</h3>
            </div>
          </div>
          <button @click="showGrantForm = false" class="text-gray-400 hover:text-gray-600"><i class="fas fa-times"></i></button>
        </div>
        <form @submit.prevent="submitGrant" class="p-6 space-y-4">
          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Grant Amount</label>
            <input v-model="newGrant.amount" type="number" step="0.01" required class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none">
          </div>
          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Source</label>
            <input v-model="newGrant.source" type="text" required class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none">
          </div>
          <div class="col-span-2">
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Reason / Purpose</label>
            <textarea v-model="newGrant.reason" rows="2" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none" placeholder="Reason for the grant..."></textarea>
          </div>
          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Date Received</label>
            <input v-model="newGrant.dateReceived" type="date" required class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none">
          </div>
          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Purpose</label>
            <textarea v-model="newGrant.purpose" required rows="3" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none resize-none"></textarea>
          </div>
          <div class="flex justify-end gap-2 pt-2">
            <button type="button" @click="showGrantForm = false" class="px-4 py-2 border border-gray-300 text-gray-600 rounded-none text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-gray-50">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-emerald-600 text-white rounded-none text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-emerald-700">Submit</button>
          </div>
        </form>
      </div>
    </div>
    </Teleport>

    <!-- Grant Details Modal -->
    <Teleport to="body">
    <div v-if="showGrantDetailsModal" class="fixed inset-0 z-[10000] flex items-center justify-center p-4" @click.self="showGrantDetailsModal = false">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div class="relative w-full max-w-md bg-white rounded-none shadow-2xl overflow-hidden" @click.stop>
        <div class="h-1.5 bg-emerald-500"></div>
        <div class="p-6 border-b border-gray-100 flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="w-1 h-5 bg-emerald-500"></div>
            <div>
              <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Finance // Edit Grant</span>
              <h3 class="text-lg font-black text-gray-900 uppercase tracking-tight">Grant Details</h3>
            </div>
          </div>
          <div class="px-6 py-2 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
            <span class="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Filed On: {{ formatDate(selectedGrant.created_at) }}</span>
            <span class="text-[9px] font-mono text-gray-400 uppercase tracking-widest">System ID: {{ selectedGrant.id }}</span>
          </div>
          <button @click="showGrantDetailsModal = false" class="text-gray-400 hover:text-gray-600 px-6"><i class="fas fa-times"></i></button>
        </div>
        <form @submit.prevent="updateGrant" class="p-6 space-y-4">
          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Grant Amount</label>
            <input v-model="selectedGrant.amount" type="number" step="0.01" required class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none">
          </div>
          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Source</label>
            <input v-model="selectedGrant.source" type="text" required class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none">
          </div>
          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Date Received</label>
            <input v-model="selectedGrant.dateReceived" type="date" required class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none">
          </div>
          <div class="col-span-2">
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Reason / Purpose</label>
            <textarea v-model="selectedGrant.reason" rows="2" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none"></textarea>
          </div>
          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Purpose</label>
            <textarea v-model="selectedGrant.purpose" required rows="3" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none resize-none"></textarea>
          </div>
          <div class="flex justify-end gap-2 pt-2">
            <button type="button" @click="showGrantDetailsModal = false" class="px-4 py-2 border border-gray-300 text-gray-600 rounded-none text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-gray-50">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-emerald-600 text-white rounded-none text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-emerald-700">Update</button>
          </div>
        </form>
      </div>
    </div>
    </Teleport>

    <!-- Capital Form Modal -->
    <Teleport to="body">
    <div v-if="showCapitalForm" class="fixed inset-0 z-[10000] flex items-center justify-center p-4" @click.self="showCapitalForm = false">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div class="relative w-full max-w-md bg-white rounded-none shadow-2xl overflow-hidden" @click.stop>
        <div class="h-1.5 bg-amber-500"></div>
        <div class="p-6 border-b border-gray-100 flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="w-1 h-5 bg-amber-500"></div>
            <div>
              <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Finance // New Capital</span>
              <h3 class="text-lg font-black text-gray-900 uppercase tracking-tight">Capital Contribution</h3>
            </div>
          </div>
          <button @click="showCapitalForm = false" class="text-gray-400 hover:text-gray-600"><i class="fas fa-times"></i></button>
        </div>
        <form @submit.prevent="submitCapital" class="p-6 space-y-4">
          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Capital Amount</label>
            <input v-model="newCapital.amount" type="number" step="0.01" required class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none">
          </div>
          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Contributor</label>
            <input v-model="newCapital.contributor" type="text" required class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none">
          </div>
          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Date Contributed</label>
            <input v-model="newCapital.dateContributed" type="date" required class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none">
          </div>
          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Equity Share (%)</label>
            <input v-model="newCapital.equityShare" type="number" step="0.1" required class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none">
          </div>
          <div class="col-span-2">
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Reason / Purpose</label>
            <textarea v-model="newCapital.reason" rows="2" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none" placeholder="Reason for the capital..."></textarea>
          </div>
          <div class="flex justify-end gap-2 pt-2">
            <button type="button" @click="showCapitalForm = false" class="px-4 py-2 border border-gray-300 text-gray-600 rounded-none text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-gray-50">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-amber-600 text-white rounded-none text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-amber-700">Submit</button>
          </div>
        </form>
      </div>
    </div>
    </Teleport>

    <!-- Capital Details Modal -->
    <Teleport to="body">
    <div v-if="showCapitalDetailsModal" class="fixed inset-0 z-[10000] flex items-center justify-center p-4" @click.self="showCapitalDetailsModal = false">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div class="relative w-full max-w-md bg-white rounded-none shadow-2xl overflow-hidden" @click.stop>
        <div class="h-1.5 bg-amber-500"></div>
        <div class="p-6 border-b border-gray-100 flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="w-1 h-5 bg-amber-500"></div>
            <div>
              <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Finance // Edit Capital</span>
              <h3 class="text-lg font-black text-gray-900 uppercase tracking-tight">Capital Details</h3>
            </div>
          </div>
          <div class="px-6 py-2 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
            <span class="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Filed On: {{ formatDate(selectedCapital.created_at) }}</span>
            <span class="text-[9px] font-mono text-gray-400 uppercase tracking-widest">System ID: {{ selectedCapital.id }}</span>
          </div>
          <button @click="showCapitalDetailsModal = false" class="text-gray-400 hover:text-gray-600 px-6"><i class="fas fa-times"></i></button>
        </div>
        <form @submit.prevent="updateCapital" class="p-6 space-y-4">
          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Capital Amount</label>
            <input v-model="selectedCapital.amount" type="number" step="0.01" required class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none">
          </div>
          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Contributor</label>
            <input v-model="selectedCapital.contributor" type="text" required class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none">
          </div>
          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Date Contributed</label>
            <input v-model="selectedCapital.dateContributed" type="date" required class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none">
          </div>
          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Equity Share (%)</label>
            <input v-model="selectedCapital.equityShare" type="number" step="0.1" required class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none">
          </div>
          <div class="flex justify-end gap-2 pt-2">
            <button type="button" @click="showCapitalDetailsModal = false" class="px-4 py-2 border border-gray-300 text-gray-600 rounded-none text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-gray-50">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-amber-600 text-white rounded-none text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-amber-700">Update</button>
          </div>
        </form>
      </div>
    </div>
    </Teleport>

    <!-- Loan Preview Modal -->
    <Teleport to="body">
    <div v-if="showLoanPreviewModal" class="fixed inset-0 z-[10000] flex items-center justify-center p-4" @click.self="showLoanPreviewModal = false">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div class="relative w-full max-w-lg bg-white rounded-none shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto" @click.stop>
        <div class="h-1.5 bg-[#2F2E8B]"></div>
        <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-white z-10">
          <div class="flex items-center gap-3">
            <div class="w-1 h-5 bg-[#2F2E8B]"></div>
            <div>
              <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Finance // Preview</span>
              <h3 class="text-lg font-black text-gray-900 uppercase tracking-tight">Loan Summary</h3>
            </div>
          </div>
          <button @click="showLoanPreviewModal = false" class="text-gray-400 hover:text-gray-600"><i class="fas fa-times"></i></button>
        </div>
        
        <div class="p-8 space-y-6">
          <div class="grid grid-cols-2 gap-8">
            <div>
              <label class="block text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Loan Code</label>
              <p class="text-sm font-black text-[#2F2E8B] font-mono">{{ selectedLoan.loan_code }}</p>
            </div>
            <div>
              <label class="block text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Status</label>
              <span :class="getStatusClass(getLoanDisplayStatus(selectedLoan))" class="px-2 py-0.5 text-[9px] font-mono font-bold uppercase border">{{ getLoanDisplayStatus(selectedLoan) }}</span>
            </div>
            <div class="col-span-2 border-t border-gray-50 pt-4">
              <label class="block text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Client Information</label>
              <p class="text-sm font-black text-gray-900 uppercase tracking-tight">{{ selectedLoan.name }}</p>
              <p class="text-xs font-mono text-gray-500">{{ selectedLoan.phone }} • {{ selectedLoan.email }}</p>
            </div>
            <div class="border-t border-gray-50 pt-4">
              <label class="block text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Total Loan</label>
              <p class="text-lg font-black text-gray-900">{{ $formatCurrency(selectedLoan.amount) }}</p>
            </div>
            <div class="border-t border-gray-50 pt-4">
              <label class="block text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Interest</label>
              <p class="text-lg font-black text-gray-900">{{ selectedLoan.interest }}%</p>
            </div>
            <div class="border-t border-gray-50 pt-4">
              <label class="block text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Amount Paid</label>
              <p class="text-lg font-black text-emerald-600">{{ $formatCurrency(selectedLoan.paid_amount || 0) }}</p>
            </div>
            <div class="border-t border-gray-50 pt-4">
              <label class="block text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Remaining Balance</label>
              <p class="text-lg font-black text-red-600">{{ $formatCurrency(getLoanBalance(selectedLoan)) }}</p>
            </div>
          </div>

          <div class="border-t border-gray-50 pt-4">
            <label class="block text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Reason / Purpose</label>
            <p class="text-xs text-gray-600 leading-relaxed">{{ selectedLoan.reason || 'No reason provided.' }}</p>
          </div>

          <!-- Repayment History in Preview -->
          <div v-if="selectedLoan.repayment_history && selectedLoan.repayment_history.length > 0" class="border-t border-gray-50 pt-4">
            <label class="block text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-3">Repayment History</label>
            <div class="space-y-2">
              <div v-for="entry in selectedLoan.repayment_history" :key="entry.id" class="flex justify-between items-center p-2 bg-gray-50/50 border border-gray-100">
                <span class="text-[10px] font-mono text-gray-500">{{ formatDate(entry.date) }}</span>
                <span class="text-[10px] font-mono font-black text-emerald-600">+ {{ $formatCurrency(entry.amount) }}</span>
              </div>
            </div>
          </div>

          <div class="pt-4 flex justify-between items-center text-[8px] font-mono text-gray-400 uppercase">
            <span>Filed On: {{ formatDate(selectedLoan.created_at) }}</span>
            <button @click="showLoanPreviewModal = false" class="px-4 py-2 bg-gray-900 text-white font-black hover:bg-black transition-colors uppercase tracking-widest">Close Preview</button>
          </div>
        </div>
      </div>
    </div>
    </Teleport>

    <!-- Grant Preview Modal -->
    <Teleport to="body">
    <div v-if="showGrantPreviewModal" class="fixed inset-0 z-[10000] flex items-center justify-center p-4" @click.self="showGrantPreviewModal = false">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div class="relative w-full max-w-md bg-white rounded-none shadow-2xl overflow-hidden" @click.stop>
        <div class="h-1.5 bg-emerald-500"></div>
        <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
          <div class="flex items-center gap-3">
            <div class="w-1 h-5 bg-emerald-500"></div>
            <div>
              <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Finance // Preview</span>
              <h3 class="text-lg font-black text-gray-900 uppercase tracking-tight">Grant Summary</h3>
            </div>
          </div>
          <button @click="showGrantPreviewModal = false" class="text-gray-400 hover:text-gray-600"><i class="fas fa-times"></i></button>
        </div>
        <div class="p-8 space-y-6">
          <div class="flex justify-between items-start">
            <div>
              <label class="block text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Grant Code</label>
              <p class="text-sm font-black text-emerald-600 font-mono">{{ selectedGrant.grant_code }}</p>
            </div>
            <div class="text-right">
              <label class="block text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Date Received</label>
              <p class="text-xs font-mono text-gray-900">{{ formatDate(selectedGrant.dateReceived) }}</p>
            </div>
          </div>
          <div>
            <label class="block text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Grant Amount</label>
            <p class="text-3xl font-black text-gray-900 tracking-tighter">{{ $formatCurrency(selectedGrant.amount) }}</p>
          </div>
          <div>
            <label class="block text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Source</label>
            <p class="text-sm font-black text-gray-900 uppercase tracking-tight">{{ selectedGrant.source }}</p>
          </div>
          <div>
            <label class="block text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Purpose / Reason</label>
            <p class="text-xs text-gray-600 leading-relaxed">{{ selectedGrant.reason || selectedGrant.purpose || 'No details provided.' }}</p>
          </div>
          <div class="pt-4 border-t border-gray-50 flex justify-between items-center text-[8px] font-mono text-gray-400 uppercase">
            <span>Filed On: {{ formatDate(selectedGrant.created_at) }}</span>
            <button @click="showGrantPreviewModal = false" class="px-4 py-2 bg-emerald-600 text-white font-black hover:bg-emerald-700 transition-colors uppercase tracking-widest">Close</button>
          </div>
        </div>
      </div>
    </div>
    </Teleport>

    <!-- Capital Preview Modal -->
    <Teleport to="body">
    <div v-if="showCapitalPreviewModal" class="fixed inset-0 z-[10000] flex items-center justify-center p-4" @click.self="showCapitalPreviewModal = false">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div class="relative w-full max-w-md bg-white rounded-none shadow-2xl overflow-hidden" @click.stop>
        <div class="h-1.5 bg-amber-500"></div>
        <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
          <div class="flex items-center gap-3">
            <div class="w-1 h-5 bg-amber-500"></div>
            <div>
              <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Finance // Preview</span>
              <h3 class="text-lg font-black text-gray-900 uppercase tracking-tight">Capital Summary</h3>
            </div>
          </div>
          <button @click="showCapitalPreviewModal = false" class="text-gray-400 hover:text-gray-600"><i class="fas fa-times"></i></button>
        </div>
        <div class="p-8 space-y-6">
          <div class="flex justify-between items-start">
            <div>
              <label class="block text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Capital Code</label>
              <p class="text-sm font-black text-amber-600 font-mono">{{ selectedCapital.capital_code }}</p>
            </div>
            <div class="text-right">
              <label class="block text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Equity Share</label>
              <p class="text-sm font-black text-gray-900">{{ selectedCapital.equityShare }}%</p>
            </div>
          </div>
          <div>
            <label class="block text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Contribution Amount</label>
            <p class="text-3xl font-black text-gray-900 tracking-tighter">{{ $formatCurrency(selectedCapital.amount) }}</p>
          </div>
          <div>
            <label class="block text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Contributor</label>
            <p class="text-sm font-black text-gray-900 uppercase tracking-tight">{{ selectedCapital.contributor }}</p>
          </div>
          <div>
            <label class="block text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Reason / Purpose</label>
            <p class="text-xs text-gray-600 leading-relaxed">{{ selectedCapital.reason || 'No details provided.' }}</p>
          </div>
          <div class="pt-4 border-t border-gray-50 flex justify-between items-center text-[8px] font-mono text-gray-400 uppercase">
            <span>Filed On: {{ formatDate(selectedCapital.created_at) }}</span>
            <button @click="showCapitalPreviewModal = false" class="px-4 py-2 bg-amber-500 text-white font-black hover:bg-amber-600 transition-colors uppercase tracking-widest">Close</button>
          </div>
        </div>
      </div>
    </div>
    </Teleport>

    <!-- Reports Modal -->
    <Teleport to="body">
    <div v-if="showReportModal" class="fixed inset-0 z-[10000] flex items-center justify-center p-4" @click.self="showReportModal = false">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div class="relative w-full max-w-lg bg-white rounded-none shadow-2xl overflow-hidden" @click.stop>
        <div class="h-1.5 bg-[#2F2E8B]"></div>
        <div class="p-6 border-b border-gray-100 flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="w-1 h-5 bg-[#2F2E8B]"></div>
            <div>
              <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Finance // Reports</span>
              <h3 class="text-lg font-black text-gray-900 uppercase tracking-tight">Generate Report</h3>
            </div>
          </div>
          <button @click="showReportModal = false" class="text-gray-400 hover:text-gray-600"><i class="fas fa-times"></i></button>
        </div>
        <div class="p-6 space-y-5">
          <!-- Report Scope -->
          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Report Scope</label>
            <div class="grid grid-cols-2 gap-2">
              <button @click="reportScope = 'current'" :class="reportScope === 'current' ? 'bg-[#2F2E8B] text-white border-[#2F2E8B]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#2F2E8B]'" class="px-3 py-2 border text-[9px] font-mono font-bold uppercase tracking-wider transition-all">
                {{ activeTab === 'loans' ? 'Loans' : activeTab === 'grants' ? 'Grants' : 'Capital' }} Only
              </button>
              <button @click="reportScope = 'combined'" :class="reportScope === 'combined' ? 'bg-[#2F2E8B] text-white border-[#2F2E8B]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#2F2E8B]'" class="px-3 py-2 border text-[9px] font-mono font-bold uppercase tracking-wider transition-all">
                Combined (All)
              </button>
              <button @click="reportScope = 'selected'" :class="reportScope === 'selected' ? 'bg-[#2F2E8B] text-white border-[#2F2E8B]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#2F2E8B]'" class="px-3 py-2 border text-[9px] font-mono font-bold uppercase tracking-wider transition-all col-span-2">
                Selected Only ({{ totalSelectedCount }} items)
              </button>
            </div>
          </div>

          <!-- Report Format -->
          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Format</label>
            <div class="flex gap-2">
              <button @click="reportFormat = 'pdf'" :class="reportFormat === 'pdf' ? 'bg-red-50 border-red-300 text-red-700' : 'bg-white border-gray-200 text-gray-500'" class="flex-1 px-3 py-2 border text-[9px] font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2">
                <i class="fas fa-file-pdf"></i> PDF
              </button>
              <button @click="reportFormat = 'excel'" :class="reportFormat === 'excel' ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'bg-white border-gray-200 text-gray-500'" class="flex-1 px-3 py-2 border text-[9px] font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2">
                <i class="fas fa-file-excel"></i> Excel
              </button>
            </div>
          </div>

          <!-- Preview Summary -->
          <div class="bg-gray-50 border border-gray-100 p-4 space-y-2">
            <p class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Report Preview</p>
            <div class="grid grid-cols-2 gap-2 text-xs font-mono">
              <span class="text-gray-400">Records:</span>
              <span class="font-bold text-right">{{ reportPreviewCount }}</span>
              <span class="text-gray-400">Total Amount:</span>
              <span class="font-bold text-right">{{ formatCurrency(reportPreviewTotal) }}</span>
              <span class="text-gray-400">Scope:</span>
              <span class="font-bold text-right uppercase">{{ reportScope }}</span>
              <span class="text-gray-400">Format:</span>
              <span class="font-bold text-right uppercase">{{ reportFormat }}</span>
            </div>
          </div>

          <div class="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <button @click="showReportModal = false" class="px-4 py-2 border border-gray-300 text-gray-600 rounded-none text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-gray-50">Cancel</button>
            <button @click="generateReport" :disabled="reportPreviewCount === 0" class="px-4 py-2 bg-[#2F2E8B] text-white rounded-none text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-[#24236e] disabled:opacity-50 disabled:cursor-not-allowed">
              <i class="fas fa-download mr-1"></i> Generate {{ reportFormat.toUpperCase() }}
            </button>
          </div>
        </div>
      </div>
    </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { formatDate } from '@/utils/formatting';
import API_BASE_URL from '@/api_services/api';
import { decodeJWT } from '@/api_services/decodeJWT.js';

// State
const activeTab = ref('loans'); // 'loans', 'grants', 'capital'
const creditScore = ref(85);
const availableCredit = ref(0);
const totalOutstandingLoans = ref(15000);
const totalGrants = ref(0);
const totalCapital = ref(0);

// Filter State
const searchQuery = ref('');
const statusFilter = ref('');
const timeFrame = ref('all');
const customStartDate = ref('');
const customEndDate = ref('');
const sourceFilter = ref('');

// Report State
const showReportModal = ref(false);
const reportScope = ref('current'); // 'current' | 'combined' | 'selected'
const reportFormat = ref('pdf'); // 'pdf' | 'excel'

// Pagination State
const loansPage = ref(1);
const loansPages = ref(1);
const grantsPage = ref(1);
const grantsPages = ref(1);
const capitalPage = ref(1);
const capitalPages = ref(1);
const limit = ref(10);

// Selection State
const selectedLoanIds = ref([]);
const selectedGrantIds = ref([]);
const selectedCapitalIds = ref([]);

const showLoanForm = ref(false);
const showGrantForm = ref(false);
const showCapitalForm = ref(false);
const showCreditForm = ref(false);
const showLoanDetailsModal = ref(false);
const showRepaymentModal = ref(false);
const showGrantDetailsModal = ref(false);
const showCapitalDetailsModal = ref(false);

const showLoanPreviewModal = ref(false);
const showGrantPreviewModal = ref(false);
const showCapitalPreviewModal = ref(false);

const activeLoans = ref([]);
const grants = ref([]);
const capitalContributions = ref([]);

const newLoan = ref({ name: '', phone: '', email: '', amount: 0, interest: 0, collateral: '', location: '', reason: '', dueDate: '' });
const repaymentForm = ref({ amount: 0 });
const newGrant = ref({ amount: 0, source: '', dateReceived: '', purpose: '', reason: '' });
const newCapital = ref({ amount: 0, contributor: '', dateContributed: '', equityShare: 0, reason: '' });

const selectedLoan = ref({});
const selectedLoanForRepayment = ref({});
const selectedGrant = ref({});
const selectedCapital = ref({});
const newCreditAmount = ref(0);

// Status styling
const getStatusClass = (status) => {
  if (!status) return 'bg-gray-50 text-gray-500 border-gray-200';
  const s = status.toLowerCase();
  const classes = {
    active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    overdue: 'bg-red-50 text-red-700 border-red-200',
    paid: 'bg-gray-50 text-gray-600 border-gray-200',
    repaid: 'bg-gray-50 text-gray-600 border-gray-200',
    approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    rejected: 'bg-red-50 text-red-700 border-red-200'
  };
  return classes[s] || 'bg-gray-50 text-gray-500 border-gray-200';
};

const getLoanBalance = (loan) => {
  const amount = Number(loan?.amount || 0);
  const paid = Number(loan?.paid_amount || 0);
  return Math.max(0, amount - paid);
};

const getLoanDisplayStatus = (loan) => {
  const balance = getLoanBalance(loan);
  if (balance <= 0) return 'Repaid';
  return loan?.status || 'Active';
};

// ---------- Generic filter helper ----------
const passesFilters = (item) => {
  // Status filter
  if (statusFilter.value) {
    const itemStatus = (item.status || '').toLowerCase();
    if (itemStatus !== statusFilter.value.toLowerCase()) return false;
  }
  // Search (name, source, code, contributor, reason)
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    const haystack = [
      item.name, item.source, item.contributor,
      item.loan_code, item.grant_code, item.capital_code,
      item.reason, item.purpose, item.phone, item.email,
      item.location
    ].filter(Boolean).join(' ').toLowerCase();
    if (!haystack.includes(q)) return false;
  }
  // Source/Contributor filter
  if (sourceFilter.value) {
    const sf = sourceFilter.value.toLowerCase();
    const src = (item.source || item.contributor || '').toLowerCase();
    if (!src.includes(sf)) return false;
  }
  // Time frame filter
  if (timeFrame.value !== 'all' && timeFrame.value !== 'custom') {
    const dateField = item.expense_date || item.dateReceived || item.dateContributed || item.dueDate || item.created_at;
    if (dateField) {
      const d = new Date(dateField);
      const now = new Date();
      if (timeFrame.value === 'today') return d.toDateString() === now.toDateString();
      if (timeFrame.value === 'week') return d >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      if (timeFrame.value === 'month') return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      if (timeFrame.value === 'year') return d.getFullYear() === now.getFullYear();
    }
  } else if (timeFrame.value === 'custom') {
    const dateField = item.expense_date || item.dateReceived || item.dateContributed || item.dueDate || item.created_at;
    if (dateField) {
      const d = new Date(dateField);
      if (customStartDate.value) {
        const start = new Date(customStartDate.value);
        start.setHours(0, 0, 0, 0);
        if (d < start) return false;
      }
      if (customEndDate.value) {
        const end = new Date(customEndDate.value);
        end.setHours(23, 59, 59, 999);
        if (d > end) return false;
      }
    }
  }
  return true;
};

// ---------- Filtered data per tab ----------
const filteredLoans = computed(() => activeLoans.value.filter(passesFilters));
const filteredGrants = computed(() => grants.value.filter(passesFilters));
const filteredCapital = computed(() => capitalContributions.value.filter(passesFilters));

// ---------- KPI values (use filtered data when filters active, otherwise full data) ----------
const hasActiveFilters = computed(() =>
  !!searchQuery.value || !!statusFilter.value || timeFrame.value !== 'all' || !!sourceFilter.value
);

const kpiGrants = computed(() => {
  const src = hasActiveFilters.value ? filteredGrants.value : grants.value;
  return src.reduce((sum, g) => sum + (Number(g.amount) || 0), 0);
});
const kpiGrantsCount = computed(() =>
  hasActiveFilters.value ? filteredGrants.value.length : grants.value.length
);

const kpiCapital = computed(() => {
  const src = hasActiveFilters.value ? filteredCapital.value : capitalContributions.value;
  return src.reduce((sum, c) => sum + (Number(c.amount) || 0), 0);
});
const kpiCapitalCount = computed(() =>
  hasActiveFilters.value ? filteredCapital.value.length : capitalContributions.value.length
);

const kpiLoans = computed(() => {
  const src = hasActiveFilters.value ? filteredLoans.value : activeLoans.value;
  return src.reduce((sum, l) => sum + getLoanBalance(l), 0);
});
const kpiLoansCount = computed(() =>
  hasActiveFilters.value ? filteredLoans.value.length : activeLoans.value.length
);

const kpiFunding = computed(() => kpiGrants.value + kpiCapital.value);
const kpiFundingCount = computed(() => kpiGrantsCount.value + kpiCapitalCount.value);

// ---------- Report helpers ----------
const formatCurrency = (n) => {
  const num = Number(n) || 0;
  return 'K ' + num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const totalSelectedCount = computed(() => {
  if (reportScope.value === 'current') {
    if (activeTab.value === 'loans') return filteredLoans.value.length;
    if (activeTab.value === 'grants') return filteredGrants.value.length;
    return filteredCapital.value.length;
  }
  if (reportScope.value === 'combined') {
    return filteredLoans.value.length + filteredGrants.value.length + filteredCapital.value.length;
  }
  // selected
  return selectedLoanIds.value.length + selectedGrantIds.value.length + selectedCapitalIds.value.length;
});

const getReportData = () => {
  if (reportScope.value === 'current') {
    if (activeTab.value === 'loans') return filteredLoans.value;
    if (activeTab.value === 'grants') return filteredGrants.value;
    return filteredCapital.value;
  }
  if (reportScope.value === 'combined') {
    return [
      ...filteredLoans.value.map(l => ({ ...l, _type: 'Loan' })),
      ...filteredGrants.value.map(g => ({ ...g, _type: 'Grant' })),
      ...filteredCapital.value.map(c => ({ ...c, _type: 'Capital' })),
    ];
  }
  // selected
  const selected = [];
  activeLoans.value.filter(l => selectedLoanIds.value.includes(l.id)).forEach(l => selected.push({ ...l, _type: 'Loan' }));
  grants.value.filter(g => selectedGrantIds.value.includes(g.id)).forEach(g => selected.push({ ...g, _type: 'Grant' }));
  capitalContributions.value.filter(c => selectedCapitalIds.value.includes(c.id)).forEach(c => selected.push({ ...c, _type: 'Capital' }));
  return selected;
};

const reportPreviewCount = computed(() => getReportData().length);

const reportPreviewTotal = computed(() =>
  getReportData().reduce((sum, item) => sum + (Number(item.amount) || 0), 0)
);

const clearFilters = () => {
  searchQuery.value = '';
  statusFilter.value = '';
  timeFrame.value = 'all';
  customStartDate.value = '';
  customEndDate.value = '';
  sourceFilter.value = '';
};

const openReportModal = () => {
  reportScope.value = 'current';
  reportFormat.value = 'pdf';
  showReportModal.value = true;
};

const generateReport = async () => {
  const data = getReportData();
  if (!data.length) return;

  try {
    if (reportFormat.value === 'excel') {
      const XLSX = await import('xlsx');
      const rows = data.map(item => ({
        Type: item._type || (activeTab.value === 'loans' ? 'Loan' : activeTab.value === 'grants' ? 'Grant' : 'Capital'),
        Code: item.loan_code || item.grant_code || item.capital_code || 'N/A',
        Name: item.name || item.source || item.contributor || 'N/A',
        Amount: Number(item.amount) || 0,
        Status: item.status || 'N/A',
        Date: item.dateReceived || item.dateContributed || item.dueDate || item.created_at || 'N/A',
        Reason: item.reason || item.purpose || '',
        Source: item.source || item.contributor || '',
        Interest: item.interest || '',
        Equity: item.equityShare || '',
      }));
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(rows);
      XLSX.utils.book_append_sheet(wb, ws, 'Funding Report');
      XLSX.writeFile(wb, `funding_report_${new Date().toISOString().slice(0,10)}.xlsx`);
    } else {
      // PDF
      const { default: jsPDF } = await import('jspdf');
      const { default: autoTable } = await import('jspdf-autotable');
      const doc = new jsPDF({ orientation: 'landscape' });
      doc.setFontSize(14);
      doc.text('Loan & Funding Report', 14, 20);
      doc.setFontSize(9);
      doc.text(`Generated: ${new Date().toLocaleString()}  |  Scope: ${reportScope.value}  |  Records: ${data.length}  |  Total: ${formatCurrency(reportPreviewTotal.value)}`, 14, 28);

      const headers = [['Type', 'Code', 'Name/Source', 'Amount', 'Status', 'Date', 'Reason']];
      const rows = data.map(item => [
        item._type || '—',
        item.loan_code || item.grant_code || item.capital_code || '—',
        item.name || item.source || item.contributor || '—',
        formatCurrency(item.amount),
        item.status || '—',
        item.dateReceived || item.dateContributed || item.dueDate || item.created_at || '—',
        (item.reason || item.purpose || '').slice(0, 60),
      ]);

      autoTable(doc, { head: headers, body: rows, startY: 34, styles: { fontSize: 7, cellPadding: 2 }, headStyles: { fillColor: [47, 46, 139] } });
      doc.save(`funding_report_${new Date().toISOString().slice(0,10)}.pdf`);
    }
    showReportModal.value = false;
  } catch (err) {
    console.error('Report generation failed:', err);
    alert('Failed to generate report. Ensure PDF/Excel libraries are available.');
  }
};

// Selection Helpers
const toggleLoanSelection = (id) => {
  const index = selectedLoanIds.value.indexOf(id);
  if (index > -1) selectedLoanIds.value.splice(index, 1);
  else selectedLoanIds.value.push(id);
};

const toggleAllLoans = () => {
  if (selectedLoanIds.value.length === filteredLoans.value.length) selectedLoanIds.value = [];
  else selectedLoanIds.value = filteredLoans.value.map(l => l.id);
};

const toggleGrantSelection = (id) => {
  const index = selectedGrantIds.value.indexOf(id);
  if (index > -1) selectedGrantIds.value.splice(index, 1);
  else selectedGrantIds.value.push(id);
};

const toggleAllGrants = () => {
  if (selectedGrantIds.value.length === filteredGrants.value.length) selectedGrantIds.value = [];
  else selectedGrantIds.value = filteredGrants.value.map(g => g.id);
};

const toggleCapitalSelection = (id) => {
  const index = selectedCapitalIds.value.indexOf(id);
  if (index > -1) selectedCapitalIds.value.splice(index, 1);
  else selectedCapitalIds.value.push(id);
};

const toggleAllCapital = () => {
  if (selectedCapitalIds.value.length === filteredCapital.value.length) selectedCapitalIds.value = [];
  else selectedCapitalIds.value = filteredCapital.value.map(c => c.id);
};

// Fetch data
const { getTenantId } = decodeJWT();

const fetchLoans = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/loans/loans?tenant_id=${getTenantId()}&page=${loansPage.value}&limit=${limit.value}`, {
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error(`Failed to fetch loans: ${response.statusText}`);
    const data = await response.json();
    activeLoans.value = data.loans;
    loansPages.value = data.pages;
    totalOutstandingLoans.value = data.grand_total_outstanding || 0;
  } catch (error) {
    console.error('Error fetching loans:', error);
  }
};

const fetchGrants = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/loans/loans/grants?tenant_id=${getTenantId()}&page=${grantsPage.value}&limit=${limit.value}`, {
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error(`Failed to fetch grants: ${response.statusText}`);
    const data = await response.json();
    grants.value = data.grants;
    grantsPages.value = data.pages;
    totalGrants.value = data.grand_total || 0;
  } catch (error) {
    console.error('Error fetching grants:', error);
  }
};

const fetchCapital = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/loans/loans/capital?tenant_id=${getTenantId()}&page=${capitalPage.value}&limit=${limit.value}`, {
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error(`Failed to fetch capital: ${response.statusText}`);
    const data = await response.json();
    capitalContributions.value = data.capital;
    capitalPages.value = data.pages;
    totalCapital.value = data.grand_total || 0;
  } catch (error) {
    console.error('Error fetching capital:', error);
  }
};

const bulkDeleteLoans = async () => {
  if (!selectedLoanIds.value.length) return;
  if (!confirm(`Delete ${selectedLoanIds.value.length} selected loans?`)) return;
  try {
    const response = await fetch(`${API_BASE_URL}/loans/loans/bulk-delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: selectedLoanIds.value, tenant_id: getTenantId() })
    });
    if (!response.ok) throw new Error('Bulk delete failed');
    selectedLoanIds.value = [];
    await fetchLoans();
  } catch (error) {
    console.error('Error bulk deleting loans:', error);
  }
};

const bulkDeleteGrants = async () => {
  if (!selectedGrantIds.value.length) return;
  if (!confirm(`Delete ${selectedGrantIds.value.length} selected grants?`)) return;
  try {
    const response = await fetch(`${API_BASE_URL}/loans/loans/grants/bulk-delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: selectedGrantIds.value, tenant_id: getTenantId() })
    });
    if (!response.ok) throw new Error('Bulk delete failed');
    selectedGrantIds.value = [];
    await fetchGrants();
  } catch (error) {
    console.error('Error bulk deleting grants:', error);
  }
};

const bulkDeleteCapital = async () => {
  if (!selectedCapitalIds.value.length) return;
  if (!confirm(`Delete ${selectedCapitalIds.value.length} selected capital contributions?`)) return;
  try {
    const response = await fetch(`${API_BASE_URL}/loans/loans/capital/bulk-delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: selectedCapitalIds.value, tenant_id: getTenantId() })
    });
    if (!response.ok) throw new Error('Bulk delete failed');
    selectedCapitalIds.value = [];
    await fetchCapital();
  } catch (error) {
    console.error('Error bulk deleting capital:', error);
  }
};

const fetchCredit = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/loans/loans/credit?tenant_id=${getTenantId()}`, {
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error(`Failed to fetch credit: ${response.statusText}`);
    const data = await response.json();
    availableCredit.value = data;
  } catch (error) {
    console.error('Error fetching credit:', error);
    availableCredit.value = 0;
  }
};



// Submit forms
const submitLoan = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/loans/loans?tenant_id=${getTenantId()}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newLoan.value,
        status: 'Active',
        tenant_id: getTenantId(),
        branch_id: localStorage.getItem('branch_id') || 'main'
      })
    });
    if (!response.ok) throw new Error(`Failed to submit loan: ${response.statusText}`);
    alert('Loan application submitted successfully!');
    showLoanForm.value = false;
    newLoan.value = { name: '', phone: '', email: '', amount: 0, interest: 0, collateral: '', location: '', reason: '', dueDate: '' };
    await Promise.all([fetchLoans(), fetchCredit()]);
  } catch (error) {
    console.error('Error submitting loan:', error);
    alert('Failed to submit loan. Please try again.');
  }
};

const submitGrant = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/loans/loans/grants?tenant_id=${getTenantId()}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newGrant.value,
        status: 'Approved',
        tenant_id: getTenantId(),
        branch_id: localStorage.getItem('branch_id') || 'main'
      })
    });
    if (!response.ok) throw new Error(`Failed to submit grant: ${response.statusText}`);
    alert('Grant application submitted successfully!');
    showGrantForm.value = false;
    newGrant.value = { amount: 0, source: '', dateReceived: '', purpose: '', reason: '' };
    await fetchGrants();
  } catch (error) {
    console.error('Error submitting grant:', error);
    alert('Failed to submit grant. Please try again.');
  }
};

const submitCapital = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/loans/loans/capital?tenant_id=${getTenantId()}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newCapital.value,
        status: 'Approved',
        tenant_id: getTenantId(),
        branch_id: localStorage.getItem('branch_id') || 'main'
      })
    });
    if (!response.ok) throw new Error(`Failed to submit capital: ${response.statusText}`);
    alert('Capital contribution submitted successfully!');
    showCapitalForm.value = false;
    newCapital.value = { amount: 0, contributor: '', dateContributed: '', equityShare: 0, reason: '' };
    await fetchCapital();
  } catch (error) {
    console.error('Error submitting capital:', error);
    alert('Failed to submit capital. Please try again.');
  }
};

const updateLoan = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/loans/loans/${selectedLoan.value.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...selectedLoan.value,
        tenant_id: getTenantId()
      })
    });
    if (!response.ok) throw new Error(`Failed to update loan: ${response.statusText}`);
    alert('Loan updated successfully!');
    showLoanDetailsModal.value = false;
    await Promise.all([fetchLoans(), fetchCredit()]);
  } catch (error) {
    console.error('Error updating loan:', error);
    alert('Failed to update loan. Please try again.');
  }
};

const updateGrant = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/loans/loans/grants/${selectedGrant.value.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...selectedGrant.value,
        tenant_id: getTenantId()
      })
    });
    if (!response.ok) throw new Error(`Failed to update grant: ${response.statusText}`);
    alert('Grant updated successfully!');
    showGrantDetailsModal.value = false;
    await fetchGrants();
  } catch (error) {
    console.error('Error updating grant:', error);
    alert('Failed to update grant. Please try again.');
  }
};

const updateCapital = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/loans/loans/capital/${selectedCapital.value.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...selectedCapital.value,
        tenant_id: getTenantId()
      })
    });
    if (!response.ok) throw new Error(`Failed to update capital: ${response.statusText}`);
    alert('Capital updated successfully!');
    showCapitalDetailsModal.value = false;
    await fetchCapital();
  } catch (error) {
    console.error('Error updating capital:', error);
    alert('Failed to update capital. Please try again.');
  }
};

const setCredit = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/loans/loans/credit?tenant_id=${getTenantId()}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tenant_id: getTenantId(),
        amount: newCreditAmount.value
      })
    });
    if (!response.ok) throw new Error(`Failed to set credit: ${response.statusText}`);
    alert('Available credit set successfully!');
    showCreditForm.value = false;
    newCreditAmount.value = 0;
    await fetchCredit();
  } catch (error) {
    console.error('Error setting credit:', error);
    alert('Failed to set credit. Please try again.');
  }
};

const openRepaymentModal = (loan) => {
  selectedLoanForRepayment.value = loan;
  repaymentForm.value.amount = getLoanBalance(loan);
  showRepaymentModal.value = true;
};

const openLoanPreview = (loan) => {
  selectedLoan.value = { ...loan };
  showLoanPreviewModal.value = true;
};

const openGrantPreview = (grant) => {
  selectedGrant.value = { ...grant };
  showGrantPreviewModal.value = true;
};

const openCapitalPreview = (capital) => {
  selectedCapital.value = { ...capital };
  showCapitalPreviewModal.value = true;
};

const submitRepayment = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/loans/loans/${selectedLoanForRepayment.value.id}/repay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tenant_id: getTenantId(),
        amount: repaymentForm.value.amount
      })
    });
    if (!response.ok) throw new Error(`Failed to submit repayment: ${response.statusText}`);
    const data = await response.json();
    alert('Repayment recorded successfully!');
    showRepaymentModal.value = false;

    // Update local view immediately
    selectedLoanForRepayment.value = {
      ...selectedLoanForRepayment.value,
      paid_amount: data.paid_amount,
      status: data.status
    };
    repaymentForm.value.amount = 0;

    await Promise.all([fetchLoans(), fetchCredit()]);
  } catch (error) {
    console.error('Error submitting repayment:', error);
    alert('Failed to submit repayment. Please try again.');
  }
};

// View details
const viewLoanDetails = (loan) => {
  selectedLoan.value = { ...loan };
  showLoanDetailsModal.value = true;
};

const deleteLoan = async (loan) => {
  if (!confirm(`Delete loan for "${loan.name || 'Unknown'}" - ${loan.amount}?`)) return;
  try {
    const response = await fetch(`${API_BASE_URL}/loans/loans/${loan.id}?tenant_id=${getTenantId()}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete loan');
    alert('Loan deleted successfully!');
    await Promise.all([fetchLoans(), fetchCredit()]);
  } catch (error) {
    console.error('Error deleting loan:', error);
    alert('Failed to delete loan. Please try again.');
  }
};

const viewGrantDetails = (grant) => {
  selectedGrant.value = { ...grant };
  showGrantDetailsModal.value = true;
};

const deleteGrant = async (grant) => {
  if (!confirm(`Delete grant from "${grant.source}" for ${grant.amount}?`)) return;
  try {
    const response = await fetch(`${API_BASE_URL}/loans/loans/grants/${grant.id}?tenant_id=${getTenantId()}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete grant');
    alert('Grant deleted successfully!');
    await fetchGrants();
  } catch (error) {
    console.error('Error deleting grant:', error);
    alert('Failed to delete grant. Please try again.');
  }
};

const viewCapitalDetails = (capital) => {
  selectedCapital.value = { ...capital };
  showCapitalDetailsModal.value = true;
};

const deleteCapital = async (capital) => {
  if (!confirm(`Delete capital from "${capital.contributor}" - ${capital.amount}?`)) return;
  try {
    const response = await fetch(`${API_BASE_URL}/loans/loans/capital/${capital.id}?tenant_id=${getTenantId()}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete capital');
    alert('Capital deleted successfully!');
    await fetchCapital();
  } catch (error) {
    console.error('Error deleting capital:', error);
    alert('Failed to delete capital. Please try again.');
  }
};

// Initialize
onMounted(async () => {
  await Promise.all([fetchLoans(), fetchGrants(), fetchCapital(), fetchCredit()]);
});
</script>

<style scoped>
.mesh-background {
  background:
    radial-gradient(at 0% 0%, rgba(47,46,139,0.06) 0%, transparent 50%),
    radial-gradient(at 100% 0%, rgba(47,46,139,0.04) 0%, transparent 50%),
    radial-gradient(at 100% 100%, rgba(47,46,139,0.06) 0%, transparent 50%),
    radial-gradient(at 0% 100%, rgba(47,46,139,0.04) 0%, transparent 50%);
}
.dotted-pattern {
  background-image: radial-gradient(circle, #2F2E8B 0.5px, transparent 0.5px);
  background-size: 12px 12px;
}
</style>
