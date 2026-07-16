<template>
  <div class="min-h-screen bg-white p-4 sm:p-6 lg:p-8 relative">
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>
    <div class="relative z-10 max-w-7xl mx-auto">
      <!-- Header Card -->
      <div class="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-gray-200 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 py-4 mb-8">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div class="flex items-center gap-4">
            <div class="w-1.5 h-12 bg-[#2F2E8B]"></div>
            <div>
              <h1 class="text-2xl sm:text-3xl font-black text-gray-900 uppercase tracking-tight font-display">
                Bank & Virtual Ledger
              </h1>
              <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-1">Real Money Storage vs Analytical Tracking</p>
            </div>
          </div>
            <div class="flex items-center gap-3">
            <div class="flex items-center gap-2 mr-4">
                <i class="fas fa-store text-gray-400 text-xs"></i>
                <select v-model="selectedBranchId" @change="refreshData" class="bg-white border border-gray-200 px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-widest outline-none hover:border-[#2F2E8B] transition-colors">
                    <option value="">All Branches</option>
                  <option v-for="b in branchOptions" :key="b.id" :value="b.id">{{ b.name }}</option>
                </select>
            </div>
            <button 
              @click="openFlowMap"
              class="px-6 py-3 rounded-none text-[10px] font-mono font-bold uppercase tracking-widest bg-gray-900 text-white hover:bg-gray-700 transition-all duration-300 flex items-center gap-2 shadow-sm"
            >
              <i class="fas fa-project-diagram"></i> Flow Map
            </button>
            <button 
              @click="showSyncModal = true"
              class="px-6 py-3 rounded-none text-[10px] font-mono font-bold uppercase tracking-widest bg-emerald-600 text-white hover:bg-emerald-700 transition-all duration-300 flex items-center gap-2 shadow-sm"
            >
              <i class="fas fa-sync"></i> Sync from Modules
            </button>
            <button 
              @click="showExportModal = true"
              class="px-6 py-3 rounded-none text-[10px] font-mono font-bold uppercase tracking-widest bg-amber-600 text-white hover:bg-amber-700 transition-all duration-300 flex items-center gap-2 shadow-sm"
            >
              <i class="fas fa-download"></i> Export Report
            </button>
            <button 
              @click="refreshData"
              class="px-6 py-3 rounded-none text-[10px] font-mono font-bold uppercase tracking-widest bg-white text-gray-500 border border-gray-200 hover:border-[#2F2E8B] hover:text-[#2F2E8B] transition-all duration-300 flex items-center gap-2"
            >
              <i class="fas fa-sync-alt" :class="{ 'animate-spin': loading }"></i> Refresh
            </button>
            <button 
              @click="showAddTransactionModal = true"
              class="px-6 py-3 rounded-none text-[10px] font-mono font-bold uppercase tracking-widest bg-[#2F2E8B] text-white hover:bg-[#1D226B] transition-all duration-300 flex items-center gap-2 shadow-sm"
            >
              <i class="fas fa-plus"></i> New Transaction
            </button>
          </div>
        </div>
      </div>

      <!-- Module Integration Sync Modal -->
      <div v-if="showSyncModal" class="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div class="bg-white w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col border border-gray-200 shadow-2xl">
          <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h3 class="text-xl font-black text-gray-900 uppercase tracking-tight font-display">Module Data Interconnection</h3>
            <div class="flex items-center gap-3">
                <label class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Filter by Branch</label>
                <select v-model="syncBranchId" @change="fetchModuleData" class="bg-white border border-gray-200 p-2 text-[10px] font-mono font-bold uppercase outline-none">
                    <option value="">All Branches</option>
                  <option v-for="b in branchOptions" :key="b.id" :value="b.id">{{ b.name }}</option>
                </select>
                <button @click="showSyncModal = false" class="text-gray-400 hover:text-gray-900 ml-4"><i class="fas fa-times"></i></button>
            </div>
          </div>
          
          <div class="p-6 overflow-y-auto flex-1">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <button v-for="mod in ['Sales', 'Invoices', 'Expenses', 'Loans', 'Payroll']" :key="mod" 
                @click="selectedSyncModule = mod.toLowerCase(); fetchModuleData()"
                :class="selectedSyncModule === mod.toLowerCase() ? 'bg-[#2F2E8B] text-white' : 'bg-white text-gray-500 border border-gray-200'"
                class="p-4 flex flex-col items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest transition-all"
              >
                <i :class="getModuleIcon(mod)" class="text-lg"></i>
                {{ mod }}
              </button>
            </div>

            <div v-if="syncData.length > 0">
              <div class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-4">Pending Interconnection (Select to Post to Ledger)</div>
              <div class="space-y-2">
                <div v-for="item in syncData" :key="item.id" class="p-4 bg-white border border-gray-100 flex justify-between items-center hover:border-[#2F2E8B] transition-all">
                  <div class="flex items-center gap-4">
                    <input type="checkbox" :value="item.id" v-model="selectedSyncItems" class="accent-[#2F2E8B]">
                    <div>
                      <div class="text-xs font-bold text-gray-800 uppercase tracking-tight">{{ item.description || item.name || 'No Description' }}</div>
                      <div class="text-[9px] font-mono text-gray-400 uppercase tracking-widest">{{ formatDate(item.date) }} | {{ item.reference || item.id }}</div>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="text-sm font-black text-[#2F2E8B] font-display">{{ $formatCurrency(item.amount) }}</div>
                    <div class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">{{ item.type }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else-if="selectedSyncModule && !loadingSync" class="text-center py-12">
              <div class="text-gray-400 font-mono text-xs uppercase tracking-widest">No unposted data found in {{ selectedSyncModule }} module.</div>
            </div>
            <div v-if="loadingSync" class="text-center py-12">
              <i class="fas fa-spinner animate-spin text-2xl text-[#2F2E8B]"></i>
            </div>
          </div>

          <div class="p-6 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
            <div class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
              Selected: {{ selectedSyncItems.length }} items | Total: {{ $formatCurrency(selectedSyncTotal) }}
            </div>
            <div class="flex gap-3">
              <button @click="showSyncModal = false" class="px-6 py-3 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500">Cancel</button>
              <button @click="postBatchTransactions" :disabled="selectedSyncItems.length === 0" class="px-8 py-3 bg-emerald-600 text-white text-[10px] font-mono font-bold uppercase tracking-widest disabled:opacity-50">Post to Ledger</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Accounts (Real Money Layer) -->
      <section class="mb-12">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <i class="fas fa-university text-[#2F2E8B] text-xl"></i>
            <h2 class="text-xl font-black text-gray-900 uppercase tracking-tight font-display">Main Accounts (Real Money)</h2>
          </div>
          <button @click="showAddMainAccountModal = true" class="text-[10px] font-mono font-bold text-[#2F2E8B] uppercase tracking-widest hover:underline">
            + Add Main Account
          </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="account in mainAccounts" :key="account.id" @click="openAccountDetail(account)" class="relative bg-white border border-gray-200 p-6 overflow-hidden group hover:shadow-lg hover:border-[#2F2E8B] transition-all duration-300 cursor-pointer">
            <div class="absolute inset-0 dotted-pattern opacity-[0.15] pointer-events-none"></div>
            <div class="relative z-10">
              <div class="flex justify-between items-start mb-4">
                <span class="px-2 py-0.5 bg-gray-50 border border-gray-100 text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">{{ account.type }}</span>
                <i class="fas fa-arrow-right text-gray-300 group-hover:text-[#2F2E8B] transition-colors"></i>
              </div>
              <h3 class="text-lg font-bold text-gray-800 uppercase tracking-tight mb-1">{{ account.name }}</h3>
              <div class="text-2xl font-black text-[#2F2E8B] font-display">{{ $formatCurrency(account.balance) }}</div>
              <div v-if="account.source_info" class="mt-2 inline-flex items-center gap-1.5 text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest bg-gray-50 border border-gray-100 px-2 py-1">
                <i class="fas fa-link"></i> {{ account.source_info.type }}
              </div>
              <div class="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                <span class="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Available Balance</span>
                <span class="text-[9px] font-mono font-bold text-[#2F2E8B] uppercase tracking-widest group-hover:underline">Open →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Virtual Accounts (Tracking Layer) -->
      <section>
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <i class="fas fa-layer-group text-[#2F2E8B] text-xl"></i>
            <h2 class="text-xl font-black text-gray-900 uppercase tracking-tight font-display">Virtual Accounts (Tracking Layer)</h2>
          </div>
          <button @click="showAddVirtualAccountModal = true" class="text-[10px] font-mono font-bold text-[#2F2E8B] uppercase tracking-widest hover:underline">
            + Create Virtual Ledger
          </button>
        </div>

        <div class="bg-white border border-gray-200 rounded-none overflow-hidden">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-200">
                <th class="px-6 py-4 text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Account Name</th>
                <th class="px-6 py-4 text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Category</th>
                <th class="px-6 py-4 text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest text-right">Balance</th>
                <th class="px-6 py-4 text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="va in virtualAccounts" :key="va.id" class="hover:bg-gray-50 transition-colors group">
                <td class="px-6 py-4 text-xs font-bold text-gray-800 uppercase tracking-tight">{{ va.name }}</td>
                <td class="px-6 py-4">
                  <span class="px-2 py-0.5 bg-gray-50 border border-gray-100 text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">{{ va.category }}</span>
                </td>
                <td class="px-6 py-4 text-right">
                  <span :class="va.balance >= 0 ? 'text-[#2F2E8B]' : 'text-red-500'" class="text-xs font-black font-display">
                    {{ $formatCurrency(va.balance) }}
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <button @click.stop="openVaDetail(va)" class="text-[9px] font-mono font-bold text-gray-400 hover:text-[#2F2E8B] uppercase tracking-widest">View Details</button>
                </td>
              </tr>
              <tr v-if="virtualAccounts.length === 0">
                <td colspan="4" class="px-6 py-12 text-center text-gray-400 font-mono text-xs uppercase tracking-widest">
                  No virtual accounts found. Create one to start tracking.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- All Financial Activity Feed -->
      <section class="mt-12 mb-8">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <i class="fas fa-stream text-[#2F2E8B] text-xl"></i>
            <h2 class="text-xl font-black text-gray-900 uppercase tracking-tight font-display">Financial Activity</h2>
            <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest bg-gray-50 border border-gray-100 px-2 py-1">{{ activityFeed.length }} records</span>
          </div>
          <div class="flex items-center gap-2">
            <button v-for="f in ['all', 'sales', 'invoices', 'expenses', 'capital', 'grants', 'loans']" :key="f"
              @click="feedFilter = f"
              :class="feedFilter === f ? 'bg-[#2F2E8B] text-white' : 'bg-white text-gray-500 border border-gray-200 hover:border-[#2F2E8B]'"
              class="px-3 py-1.5 text-[9px] font-mono font-bold uppercase tracking-widest capitalize transition-all"
            >{{ f }}</button>
          </div>
        </div>

        <div class="bg-white border border-gray-200 overflow-hidden">
          <div v-if="loadingFeed" class="flex items-center justify-center py-16 text-gray-400">
            <i class="fas fa-spinner animate-spin text-2xl mr-3"></i>
            <span class="font-mono text-xs uppercase tracking-widest">Loading activity...</span>
          </div>
          <div v-else-if="filteredFeed.length === 0" class="flex flex-col items-center justify-center py-16 text-gray-400">
            <i class="fas fa-inbox text-4xl mb-3 opacity-30"></i>
            <p class="font-mono text-xs uppercase tracking-widest">No financial activity found</p>
          </div>
          <div v-else class="divide-y divide-gray-100 max-h-[560px] overflow-y-auto">
            <div v-for="item in filteredFeed" :key="item._feedId"
              class="flex justify-between items-center px-6 py-4 hover:bg-gray-50 transition-colors">
              <div class="flex items-center gap-4">
                <div :class="item._module === 'expenses' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-600'"
                  class="w-9 h-9 flex items-center justify-center text-xs shrink-0">
                  <i :class="item._module === 'expenses' ? 'fas fa-arrow-up' : item._module === 'invoices' ? 'fas fa-file-invoice-dollar' : 'fas fa-shopping-cart'"></i>
                </div>
                <div>
                  <div class="text-xs font-bold text-gray-800 uppercase tracking-tight">{{ item.description || 'No Description' }}</div>
                  <div class="flex items-center gap-2 mt-0.5">
                    <span :class="item._module === 'expenses' ? 'bg-red-50 text-red-400 border-red-100' : 'bg-green-50 text-green-600 border-green-100'"
                      class="border px-1.5 py-0.5 text-[8px] font-mono font-bold uppercase tracking-widest">{{ item._module }}</span>
                    <span class="text-[9px] font-mono text-gray-400 uppercase">{{ formatDate(item.date) }}</span>
                    <span v-if="item.reference" class="text-[9px] font-mono text-gray-300 uppercase">· {{ item.reference }}</span>
                  </div>
                </div>
              </div>
              <div class="text-right shrink-0 ml-4">
                <div :class="item._module === 'expenses' ? 'text-red-500' : 'text-[#2F2E8B]'"
                  class="text-sm font-black font-display">
                  {{ item._module === 'expenses' ? '-' : '+' }}{{ $formatCurrency(item.amount) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Modals (Simplified for brevity) -->
      <!-- Add Transaction Modal -->
      <div v-if="showAddTransactionModal" class="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div class="bg-white w-full max-w-2xl p-8 border border-gray-200">
          <h3 class="text-2xl font-black text-gray-900 uppercase tracking-tight font-display mb-6">New Ledger Transaction</h3>
          <form @submit.prevent="submitTransaction">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Description</label>
                <input v-model="newTx.description" type="text" class="w-full border-b border-gray-200 py-2 focus:border-[#2F2E8B] outline-none text-sm uppercase tracking-tight" required placeholder="e.g. Sales Deposit">
              </div>
              <div>
                <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Reference / ID</label>
                <input v-model="newTx.reference" type="text" class="w-full border-b border-gray-200 py-2 focus:border-[#2F2E8B] outline-none text-sm uppercase tracking-tight" placeholder="Optional">
              </div>
            </div>

            <div class="space-y-4 mb-8">
              <div v-for="(line, index) in newTx.lines" :key="index" class="p-4 bg-gray-50 border border-gray-100 relative">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Main Account</label>
                    <select v-model="line.account_id" class="w-full bg-white border border-gray-200 p-2 text-xs uppercase" required>
                      <option v-for="acc in mainAccounts" :key="acc.id" :value="acc.id">{{ acc.name }}</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Debit (+)</label>
                    <input v-model.number="line.debit" type="number" step="0.01" class="w-full bg-white border border-gray-200 p-2 text-xs font-bold" @input="line.credit = 0">
                  </div>
                  <div>
                    <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Credit (-)</label>
                    <input v-model.number="line.credit" type="number" step="0.01" class="w-full bg-white border border-gray-200 p-2 text-xs font-bold" @input="line.debit = 0">
                  </div>
                </div>
                <div class="mt-3">
                    <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Link to Virtual Accounts (Tags)</label>
                    <div class="flex flex-wrap gap-2">
                        <label v-for="va in virtualAccounts" :key="va.id" class="flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 cursor-pointer hover:border-[#2F2E8B]">
                            <input type="checkbox" :value="va.id" v-model="line.tags" class="rounded-none accent-[#2F2E8B]">
                            <span class="text-[9px] font-mono font-bold uppercase">{{ va.name }}</span>
                        </label>
                    </div>
                </div>
              </div>
            </div>

            <div class="flex justify-between items-center">
              <div class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                Balance: <span :class="isTxBalanced ? 'text-green-500' : 'text-red-500'">{{ txBalanceStatus }}</span>
              </div>
              <div class="flex gap-3">
                <button type="button" @click="showAddTransactionModal = false" class="px-6 py-3 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500">Cancel</button>
                <button type="submit" :disabled="!isTxBalanced" class="px-8 py-3 bg-[#2F2E8B] text-white text-[10px] font-mono font-bold uppercase tracking-widest disabled:opacity-50">Post Transaction</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <!-- Add Main Account Modal -->
      <div v-if="showAddMainAccountModal" class="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div class="bg-white w-full max-w-md p-8 border border-gray-200">
          <h3 class="text-2xl font-black text-gray-900 uppercase tracking-tight font-display mb-6">Add Main Account</h3>
          <form @submit.prevent="createMainAccount">
            <div class="space-y-4 mb-8">
              <div>
                <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Account Name</label>
                <input v-model="newMainAccount.name" type="text" class="w-full border-b border-gray-200 py-2 focus:border-[#2F2E8B] outline-none text-sm uppercase" required placeholder="e.g. Corporate Bank Account">
              </div>
              <div>
                <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Assign to Branch</label>
                <select v-model="newMainAccount.branch_id" class="w-full bg-white border border-gray-200 p-2 text-xs uppercase" required>
                  <option value="" disabled>Select Branch</option>
                  <option v-for="b in branchOptions" :key="b.id" :value="b.id">{{ b.name }}</option>
                </select>
              </div>
              <div>
                <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Account Type</label>
                <select v-model="newMainAccount.type" class="w-full bg-white border border-gray-200 p-2 text-xs uppercase" required>
                  <option value="Bank Accounts">Bank Accounts</option>
                  <option value="Mobile Money">Mobile Money</option>
                  <option value="Cash on Hand">Cash on Hand</option>
                </select>
              </div>
              <div>
                <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Opening Balance Source</label>
                <select v-model="openingBalanceSource" @change="handleSourceChange" class="w-full bg-white border border-gray-200 p-2 text-xs uppercase mb-3">
                  <option value="manual">Manual Entry</option>
                  <option value="loan">From Loan</option>
                  <option value="capital">From Capital</option>
                  <option value="grant">From Grant</option>
                </select>
                
                <div v-if="openingBalanceSource !== 'manual'">
                    <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Select {{ openingBalanceSource }}</label>
                    <select v-model="selectedSourceItem" @change="updateBalanceFromSource" class="w-full bg-white border border-gray-200 p-2 text-xs uppercase mb-3">
                        <option value="">Select Item</option>
                        <option v-for="item in sourceItems" :key="item.id" :value="item">{{ item.label }} - {{ $formatCurrency(item.amount) }}</option>
                    </select>
                </div>
                
                <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Opening Balance</label>
                <input v-model.number="newMainAccount.balance" type="number" step="0.01" class="w-full border-b border-gray-200 py-2 focus:border-[#2F2E8B] outline-none text-sm" required :readonly="openingBalanceSource !== 'manual'">
              </div>
            </div>
            <div class="flex justify-end gap-3">
              <button type="button" @click="showAddMainAccountModal = false" class="px-6 py-3 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500">Cancel</button>
              <button type="submit" class="px-8 py-3 bg-[#2F2E8B] text-white text-[10px] font-mono font-bold uppercase tracking-widest">Create Account</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Add Virtual Account Modal -->
      <div v-if="showAddVirtualAccountModal" class="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div class="bg-white w-full max-w-md p-8 border border-gray-200">
          <h3 class="text-2xl font-black text-gray-900 uppercase tracking-tight font-display mb-6">Create Virtual Ledger</h3>
          <form @submit.prevent="createVirtualAccount">
            <div class="space-y-4 mb-8">
              <div>
                <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Ledger Name</label>
                <input v-model="newVirtualAccount.name" type="text" class="w-full border-b border-gray-200 py-2 focus:border-[#2F2E8B] outline-none text-sm uppercase" required placeholder="e.g. Lusaka Branch">
              </div>
              <div>
                <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Assign to Branch</label>
                <select v-model="newVirtualAccount.branch_id" class="w-full bg-white border border-gray-200 p-2 text-xs uppercase" required>
                  <option value="" disabled>Select Branch</option>
                  <option v-for="b in branchOptions" :key="b.id" :value="b.id">{{ b.name }}</option>
                </select>
              </div>
              <div>
                <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Category</label>
                <select v-model="newVirtualAccount.category" class="w-full bg-white border border-gray-200 p-2 text-xs uppercase" required>
                  <option v-for="cat in ['Branch', 'Invoice', 'Customer', 'Supplier', 'Project', 'Loan', 'Capital', 'Grant', 'Department']" :key="cat" :value="cat">{{ cat }}</option>
                </select>
              </div>
            </div>
            <div class="flex justify-end gap-3">
              <button type="button" @click="showAddVirtualAccountModal = false" class="px-6 py-3 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500">Cancel</button>
              <button type="submit" class="px-8 py-3 bg-[#2F2E8B] text-white text-[10px] font-mono font-bold uppercase tracking-widest">Create Ledger</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Export Report Modal -->
      <div v-if="showExportModal" class="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div class="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-2xl">
          <div class="sticky top-0 bg-white p-6 border-b border-gray-100 flex justify-between items-center z-10">
            <h3 class="text-xl font-black text-gray-900 uppercase tracking-tight">Export Financial Report</h3>
            <button @click="showExportModal = false" class="text-gray-400 hover:text-gray-900"><i class="fas fa-times text-lg"></i></button>
          </div>
          <div class="p-6 space-y-5">
            <!-- Time Frame -->
            <div>
              <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Time Frame</label>
              <div class="flex gap-3">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="radio" v-model="exportTimeFrame" value="full" class="accent-[#2F2E8B]">
                  <span class="text-sm font-mono">Full History</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="radio" v-model="exportTimeFrame" value="custom" class="accent-[#2F2E8B]">
                  <span class="text-sm font-mono">Custom Range</span>
                </label>
              </div>
            </div>
            <div v-if="exportTimeFrame === 'custom'" class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Start Date</label>
                <input v-model="exportStartDate" type="date" class="w-full border border-gray-200 p-2 text-sm">
              </div>
              <div>
                <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">End Date</label>
                <input v-model="exportEndDate" type="date" class="w-full border border-gray-200 p-2 text-sm">
              </div>
            </div>

            <!-- Account Selection -->
            <div>
              <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Accounts</label>
              <div class="flex gap-3 mb-2">
                <button @click="selectAllAccounts" class="text-[9px] font-mono font-bold text-[#2F2E8B] uppercase hover:underline">Select All</button>
                <button @click="deselectAllAccounts" class="text-[9px] font-mono font-bold text-gray-400 uppercase hover:underline">Deselect All</button>
              </div>
              <div class="flex flex-wrap gap-2">
                <label v-for="acc in mainAccounts" :key="acc.id" class="flex items-center gap-2 px-3 py-1.5 bg-white border cursor-pointer hover:border-[#2F2E8B] transition-colors" :class="exportSelectedAccounts.includes(acc.id) ? 'border-[#2F2E8B] bg-[#2F2E8B]/5' : 'border-gray-200'">
                  <input type="checkbox" :value="acc.id" v-model="exportSelectedAccounts" class="accent-[#2F2E8B] rounded-none">
                  <span class="text-[10px] font-mono font-bold uppercase">{{ acc.name }}</span>
                  <span class="text-[9px] font-mono text-gray-400">{{ $formatCurrency(acc.balance) }}</span>
                </label>
              </div>
            </div>

            <!-- Summary Preview -->
            <div class="bg-gray-50 p-4 border border-gray-100 space-y-2">
              <p class="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">Report Summary Preview</p>
              <div class="grid grid-cols-2 gap-2 text-xs font-mono">
                <span class="text-gray-500">Total Records:</span><span class="font-bold">{{ effectiveExportData.length }}</span>
                <span class="text-green-600">Revenue (Sales/Invoices):</span><span class="font-bold text-green-600">{{ $formatCurrency(revenueIncome) }}</span>
                <span v-if="capitalIncome > 0" class="text-blue-600">Capital:</span><span v-if="capitalIncome > 0" class="font-bold text-blue-600">{{ $formatCurrency(capitalIncome) }}</span>
                <span v-if="grantsIncome > 0" class="text-purple-600">Grants:</span><span v-if="grantsIncome > 0" class="font-bold text-purple-600">{{ $formatCurrency(grantsIncome) }}</span>
                <span v-if="loansIncome > 0" class="text-indigo-600">Loans:</span><span v-if="loansIncome > 0" class="font-bold text-indigo-600">{{ $formatCurrency(loansIncome) }}</span>
                <span class="text-green-600 font-bold">Total Income:</span><span class="font-bold text-green-600">{{ $formatCurrency(totalIncome) }}</span>
                <span class="text-red-500">Total Expenses:</span><span class="font-bold text-red-500">{{ $formatCurrency(totalExpenses) }}</span>
                <span class="text-[#2F2E8B]">Net Balance:</span><span class="font-bold text-[#2F2E8B]">{{ $formatCurrency(totalIncome - totalExpenses) }}</span>
              </div>
              <div v-if="selectedAccountBalances.length" class="mt-2 pt-2 border-t border-gray-200">
                <p class="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1">Selected Bank Balances</p>
                <div v-for="acc in selectedAccountBalances" :key="acc.id" class="flex justify-between text-xs font-mono">
                  <span>{{ acc.name }}</span><span class="font-bold">{{ $formatCurrency(acc.balance) }}</span>
                </div>
                <div class="flex justify-between text-xs font-mono mt-1 pt-1 border-t border-gray-100">
                  <span class="text-gray-400">Total Account Balance</span><span class="font-bold text-gray-600">{{ $formatCurrency(totalSelectedBalance) }}</span>
                </div>
                <div class="flex justify-between text-[10px] font-mono mt-1">
                  <span class="text-gray-400">vs Net from Transactions</span>
                  <span :class="(totalIncome - totalExpenses) === totalSelectedBalance ? 'text-green-600' : 'text-amber-600'" class="font-bold">
                    {{ $formatCurrency(totalIncome - totalExpenses) }}
                    <span v-if="(totalIncome - totalExpenses) !== totalSelectedBalance" class="text-[8px]">(Diff: {{ $formatCurrency(totalSelectedBalance - (totalIncome - totalExpenses)) }})</span>
                  </span>
                </div>
              </div>
            </div>

            <!-- Data Preview Table -->
            <div v-if="exportPreview.length > 0" class="border border-gray-200 max-h-48 overflow-y-auto">
              <table class="w-full text-left text-[10px] font-mono">
                <thead class="bg-gray-50 sticky top-0">
                  <tr>
                    <th class="px-3 py-2 text-gray-400 uppercase">Date</th>
                    <th class="px-3 py-2 text-gray-400 uppercase">Module</th>
                    <th class="px-3 py-2 text-gray-400 uppercase">Description</th>
                    <th class="px-3 py-2 text-gray-400 uppercase text-right">Amount</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr v-for="(item, i) in exportPreview" :key="i" class="hover:bg-gray-50">
                    <td class="px-3 py-1.5">{{ formatDate(item.date) }}</td>
                    <td class="px-3 py-1.5 uppercase text-gray-500">{{ item._module }}</td>
                    <td class="px-3 py-1.5 max-w-[200px] truncate">{{ item.description }}</td>
                    <td class="px-3 py-1.5 text-right" :class="item._module === 'expenses' ? 'text-red-500' : 'text-green-600'">
                      {{ item._module === 'expenses' ? '-' : '+' }}{{ $formatCurrency(item.amount) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="flex gap-3 pt-2 flex-wrap">
              <button @click="showExportModal = false" class="border border-gray-200 text-gray-500 py-3 px-4 text-[10px] font-mono font-bold uppercase">Cancel</button>
              <button @click="exportCSV" :disabled="effectiveExportData.length === 0"
                class="bg-green-600 hover:bg-green-700 text-white py-3 px-4 text-[10px] font-mono font-bold uppercase disabled:opacity-50 flex items-center gap-2">
                <i class="fas fa-file-csv"></i> CSV
              </button>
              <button @click="exportPDF" :disabled="effectiveExportData.length === 0"
                class="bg-red-600 hover:bg-red-700 text-white py-3 px-4 text-[10px] font-mono font-bold uppercase disabled:opacity-50 flex items-center gap-2">
                <i class="fas fa-file-pdf"></i> PDF
              </button>
              <button @click="exportDOCX" :disabled="effectiveExportData.length === 0"
                class="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 text-[10px] font-mono font-bold uppercase disabled:opacity-50 flex items-center gap-2">
                <i class="fas fa-file-word"></i> DOCX
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Account Detail Drawer -->
      <div v-if="showAccountDetail && selectedAccount" class="fixed inset-0 z-[300] flex justify-end">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="showAccountDetail = false"></div>
        <div class="relative w-full max-w-2xl bg-white shadow-2xl flex flex-col h-full overflow-hidden">

          <!-- Drawer Header -->
          <div class="p-6 bg-[#2F2E8B] text-white shrink-0">
            <div class="flex justify-between items-start mb-3">
              <div>
                <p class="text-[9px] font-mono font-bold uppercase tracking-widest text-white/60">{{ selectedAccount.type }}</p>
                <h2 class="text-xl font-black uppercase tracking-tight mt-0.5">{{ selectedAccount.name }}</h2>
              </div>
              <button @click="showAccountDetail = false" class="text-white/60 hover:text-white text-xl w-8 h-8 flex items-center justify-center">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="flex items-end justify-between">
              <div class="text-3xl font-black font-display">{{ $formatCurrency(selectedAccount.balance) }}</div>
              <button @click="deleteAccount" class="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-red-600 text-white text-[9px] font-mono font-bold uppercase tracking-widest transition-colors border border-white/20">
                <i class="fas fa-trash-alt text-[10px]"></i> Delete Account
              </button>
            </div>
            <div v-if="selectedAccount.source_info" class="mt-3 inline-flex items-center gap-2 bg-white/15 px-3 py-1.5 text-[9px] font-mono font-bold uppercase tracking-widest">
              <i class="fas fa-link text-white/60"></i>
              From {{ selectedAccount.source_info.type }}: {{ selectedAccount.source_info.label }} · {{ $formatCurrency(selectedAccount.source_info.amount) }}
            </div>
          </div>

          <!-- Tabs -->
          <div class="border-b border-gray-200 flex shrink-0 overflow-x-auto">
            <button @click="switchDetailTab('transactions')" :class="detailTab === 'transactions' ? 'border-b-2 border-[#2F2E8B] text-[#2F2E8B]' : 'text-gray-400 hover:text-gray-600'" class="px-6 py-3 text-[10px] font-mono font-bold uppercase tracking-widest whitespace-nowrap transition-colors">
              <i class="fas fa-list mr-1"></i> Transactions
            </button>
            <button @click="switchDetailTab('link-cash')" :class="detailTab === 'link-cash' ? 'border-b-2 border-[#2F2E8B] text-[#2F2E8B]' : 'text-gray-400 hover:text-gray-600'" class="px-6 py-3 text-[10px] font-mono font-bold uppercase tracking-widest whitespace-nowrap transition-colors">
              <i class="fas fa-plus-circle mr-1"></i> Link Cash In
            </button>
            <button @click="switchDetailTab('link-expenses')" :class="detailTab === 'link-expenses' ? 'border-b-2 border-[#2F2E8B] text-[#2F2E8B]' : 'text-gray-400 hover:text-gray-600'" class="px-6 py-3 text-[10px] font-mono font-bold uppercase tracking-widest whitespace-nowrap transition-colors">
              <i class="fas fa-minus-circle mr-1"></i> Link Expenses
            </button>
            <button @click="switchDetailTab('add-funds')" :class="detailTab === 'add-funds' ? 'border-b-2 border-emerald-600 text-emerald-600' : 'text-gray-400 hover:text-gray-600'" class="px-6 py-3 text-[10px] font-mono font-bold uppercase tracking-widest whitespace-nowrap transition-colors">
              <i class="fas fa-coins mr-1"></i> Add Funds
            </button>
          </div>

          <!-- Tab Content -->
          <div class="flex-1 overflow-y-auto">

            <!-- Transactions -->
            <div v-if="detailTab === 'transactions'" class="p-6">
              <div v-if="loadingDetailData" class="flex items-center justify-center py-16 text-gray-400">
                <i class="fas fa-spinner animate-spin text-2xl"></i>
              </div>
              <div v-else-if="accountTransactions.length === 0" class="flex flex-col items-center justify-center py-16 text-gray-400">
                <i class="fas fa-receipt text-4xl mb-3 opacity-30"></i>
                <p class="font-mono text-xs uppercase tracking-widest">No transactions yet</p>
                <p class="font-mono text-[10px] text-gray-300 uppercase tracking-widest mt-1">Link cash or expenses using the tabs above</p>
              </div>
              <div v-else class="space-y-2">
                <!-- Summary bar -->
                <div class="grid grid-cols-3 gap-3 mb-4">
                  <div class="bg-green-50 border border-green-100 rounded px-4 py-3">
                    <div class="text-[8px] font-mono font-bold uppercase tracking-widest text-green-500 mb-1">Total Income</div>
                    <div class="text-sm font-black font-display text-green-600">{{ $formatCurrency(txTotalIncome) }}</div>
                    <div class="text-[8px] font-mono text-green-400 mt-0.5">{{ accountTransactions.filter(t => t.net > 0).length }} entries</div>
                  </div>
                  <div class="bg-red-50 border border-red-100 rounded px-4 py-3">
                    <div class="text-[8px] font-mono font-bold uppercase tracking-widest text-red-400 mb-1">Total Expenses</div>
                    <div class="text-sm font-black font-display text-red-500">{{ $formatCurrency(txTotalExpenses) }}</div>
                    <div class="text-[8px] font-mono text-red-400 mt-0.5">{{ accountTransactions.filter(t => t.net < 0).length }} entries</div>
                  </div>
                  <div class="rounded px-4 py-3 border" :class="txTotalIncome - txTotalExpenses >= 0 ? 'bg-indigo-50 border-indigo-100' : 'bg-orange-50 border-orange-100'">
                    <div class="text-[8px] font-mono font-bold uppercase tracking-widest mb-1" :class="txTotalIncome - txTotalExpenses >= 0 ? 'text-indigo-400' : 'text-orange-400'">Net</div>
                    <div class="text-sm font-black font-display" :class="txTotalIncome - txTotalExpenses >= 0 ? 'text-[#2F2E8B]' : 'text-orange-500'">
                      {{ txTotalIncome - txTotalExpenses >= 0 ? '+' : '' }}{{ $formatCurrency(txTotalIncome - txTotalExpenses) }}
                    </div>
                    <div class="text-[8px] font-mono text-gray-400 mt-0.5">{{ accountTransactions.length }} total</div>
                  </div>
                </div>
                <div v-for="tx in accountTransactions" :key="tx.id" class="flex justify-between items-center px-4 py-3 bg-white border border-gray-100 hover:border-gray-200 transition-all group">
                  <div class="flex items-center gap-3 min-w-0">
                    <div :class="tx.net >= 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'" class="w-8 h-8 shrink-0 rounded flex items-center justify-center text-xs">
                      <i :class="tx.net >= 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down'"></i>
                    </div>
                    <div class="min-w-0">
                      <div class="text-xs font-bold text-gray-800 uppercase tracking-tight truncate">{{ tx.description }}</div>
                      <div class="flex items-center gap-2 mt-0.5 flex-wrap">
                        <span v-if="tx.source_module" class="text-[8px] font-mono font-bold px-1.5 py-0.5 uppercase tracking-widest"
                          :class="tx.source_module === 'expenses' || tx.source_module === 'payroll' ? 'bg-red-50 text-red-400' : 'bg-green-50 text-green-600'">
                          {{ tx.source_module }}
                        </span>
                        <span class="text-[9px] font-mono text-gray-400 uppercase">{{ formatDate(tx.date) }}</span>
                        <span v-if="tx.reference" class="text-[9px] font-mono text-gray-300 uppercase">#{{ tx.reference }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center gap-4 shrink-0 ml-3">
                    <div class="text-right">
                      <div :class="tx.net >= 0 ? 'text-[#2F2E8B]' : 'text-red-500'" class="text-sm font-black font-display">
                        {{ tx.net >= 0 ? '+' : '' }}{{ $formatCurrency(tx.net) }}
                      </div>
                      <div v-if="tx.running_balance !== undefined" class="text-[8px] font-mono text-gray-400 uppercase">
                        Bal: {{ $formatCurrency(tx.running_balance) }}
                      </div>
                    </div>
                    <button
                      @click="removeTransaction(tx)"
                      :disabled="removingTxId === tx.id"
                      class="opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 rounded disabled:opacity-40"
                      title="Remove from account"
                    >
                      <i :class="removingTxId === tx.id ? 'fas fa-spinner animate-spin text-[9px]' : 'fas fa-times text-[9px]'"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Link Cash In (Sales / Invoices) -->
            <div v-if="detailTab === 'link-cash'" class="p-6">
              <div class="flex gap-2 mb-6">
                <button v-for="mod in ['sales', 'invoices']" :key="mod"
                  @click="detailLinkModule = mod; fetchDetailModuleData()"
                  :class="detailLinkModule === mod ? 'bg-[#2F2E8B] text-white' : 'bg-white border border-gray-200 text-gray-500 hover:border-[#2F2E8B]'"
                  class="px-5 py-2.5 text-[10px] font-mono font-bold uppercase tracking-widest capitalize transition-all"
                >{{ mod }}</button>
              </div>
              <div v-if="loadingDetailData" class="flex items-center justify-center py-16 text-gray-400">
                <i class="fas fa-spinner animate-spin text-2xl"></i>
              </div>
              <div v-else-if="detailLinkData.length === 0" class="flex flex-col items-center justify-center py-16 text-gray-400">
                <i class="fas fa-check-circle text-4xl mb-3 opacity-30"></i>
                <p class="font-mono text-xs uppercase tracking-widest">All {{ detailLinkModule }} already linked</p>
              </div>
              <div v-else class="space-y-2">
                <div class="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 mb-2">
                  <input type="checkbox" class="accent-[#2F2E8B]"
                    :checked="selectedDetailItems.length === detailLinkData.length"
                    @change="selectedDetailItems = selectedDetailItems.length === detailLinkData.length ? [] : detailLinkData.map(i => i.id)">
                  <span class="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">Select All</span>
                </div>
                <div v-for="item in detailLinkData" :key="item.id" class="flex justify-between items-center p-4 bg-white border border-gray-100 hover:border-[#2F2E8B] transition-all cursor-pointer" @click="selectedDetailItems.includes(item.id) ? selectedDetailItems = selectedDetailItems.filter(x => x !== item.id) : selectedDetailItems.push(item.id)">
                  <div class="flex items-center gap-3">
                    <input type="checkbox" :value="item.id" v-model="selectedDetailItems" class="accent-[#2F2E8B]" @click.stop>
                    <div>
                      <div class="text-xs font-bold text-gray-800 uppercase tracking-tight">{{ item.name || 'Unknown' }}</div>
                      <div class="flex items-center gap-2 mt-0.5">
                        <span v-if="item.description" class="text-[9px] font-mono text-gray-500 uppercase">{{ item.description }}</span>
                        <span v-if="item.reference && item.reference !== item.description" class="text-[9px] font-mono text-[#2F2E8B] uppercase">#{{ item.reference }}</span>
                        <span class="text-[9px] font-mono text-gray-400 uppercase">· {{ formatDate(item.date) }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="text-sm font-black text-[#2F2E8B] font-display">{{ $formatCurrency(item.amount) }}</div>
                    <div class="text-[8px] font-mono text-gray-400 uppercase">{{ item.type }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Link Expenses -->
            <div v-if="detailTab === 'link-expenses'" class="p-6">
              <div class="flex gap-2 mb-6">
                <button v-for="mod in ['expenses', 'payroll']" :key="mod"
                  @click="detailLinkModule = mod; fetchDetailModuleData()"
                  :class="detailLinkModule === mod ? 'bg-[#2F2E8B] text-white' : 'bg-white border border-gray-200 text-gray-500 hover:border-[#2F2E8B]'"
                  class="px-5 py-2.5 text-[10px] font-mono font-bold uppercase tracking-widest capitalize transition-all"
                >{{ mod }}</button>
              </div>
              <div v-if="loadingDetailData" class="flex items-center justify-center py-16 text-gray-400">
                <i class="fas fa-spinner animate-spin text-2xl"></i>
              </div>
              <div v-else-if="detailLinkData.length === 0" class="flex flex-col items-center justify-center py-16 text-gray-400">
                <i class="fas fa-check-circle text-4xl mb-3 opacity-30"></i>
                <p class="font-mono text-xs uppercase tracking-widest">All {{ detailLinkModule }} already linked</p>
              </div>
              <div v-else class="space-y-2">
                <div class="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 mb-2">
                  <input type="checkbox" class="accent-[#2F2E8B]"
                    :checked="selectedDetailItems.length === detailLinkData.length"
                    @change="selectedDetailItems = selectedDetailItems.length === detailLinkData.length ? [] : detailLinkData.map(i => i.id)">
                  <span class="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">Select All</span>
                </div>
                <div v-for="item in detailLinkData" :key="item.id" class="flex justify-between items-center p-4 bg-white border border-gray-100 hover:border-red-100 transition-all cursor-pointer" @click="selectedDetailItems.includes(item.id) ? selectedDetailItems = selectedDetailItems.filter(x => x !== item.id) : selectedDetailItems.push(item.id)">
                  <div class="flex items-center gap-3">
                    <input type="checkbox" :value="item.id" v-model="selectedDetailItems" class="accent-red-500" @click.stop>
                    <div>
                      <div class="text-xs font-bold text-gray-800 uppercase tracking-tight">{{ item.name || 'Expense' }}</div>
                      <div class="flex items-center gap-2 mt-0.5">
                        <span v-if="item.description" class="text-[9px] font-mono text-gray-500 uppercase">{{ item.description }}</span>
                        <span v-if="item.reference" class="text-[9px] font-mono text-red-400 uppercase">{{ item.reference }}</span>
                        <span class="text-[9px] font-mono text-gray-400 uppercase">· {{ formatDate(item.date) }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="text-sm font-black text-red-500 font-display">-{{ $formatCurrency(item.amount) }}</div>
                    <div class="text-[8px] font-mono text-gray-400 uppercase">{{ item.type }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Add Funds (Loans / Grants / Capital) -->
            <div v-if="detailTab === 'add-funds'" class="p-6">
              <div class="mb-4 p-3 bg-emerald-50 border border-emerald-100 text-[9px] font-mono font-bold text-emerald-700 uppercase tracking-widest">
                <i class="fas fa-info-circle mr-1"></i> Select a source to credit funds into {{ selectedAccount?.name }}
              </div>
              <div class="flex gap-2 mb-6">
                <button v-for="mod in ['loans', 'grants', 'capital']" :key="mod"
                  @click="detailLinkModule = mod; fetchDetailModuleData()"
                  :class="detailLinkModule === mod ? 'bg-emerald-600 text-white' : 'bg-white border border-gray-200 text-gray-500 hover:border-emerald-500'"
                  class="px-5 py-2.5 text-[10px] font-mono font-bold uppercase tracking-widest capitalize transition-all"
                >{{ mod }}</button>
              </div>
              <div v-if="loadingDetailData" class="flex items-center justify-center py-16 text-gray-400">
                <i class="fas fa-spinner animate-spin text-2xl"></i>
              </div>
              <div v-else-if="detailLinkData.length === 0" class="flex flex-col items-center justify-center py-16 text-gray-400">
                <i class="fas fa-check-circle text-4xl mb-3 opacity-30"></i>
                <p class="font-mono text-xs uppercase tracking-widest">No unlinked {{ detailLinkModule }} found</p>
              </div>
              <div v-else class="space-y-2">
                <div class="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 mb-2">
                  <input type="checkbox" class="accent-emerald-600"
                    :checked="selectedDetailItems.length === detailLinkData.length"
                    @change="selectedDetailItems = selectedDetailItems.length === detailLinkData.length ? [] : detailLinkData.map(i => i.id)">
                  <span class="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">Select All</span>
                </div>
                <div v-for="item in detailLinkData" :key="item.id" class="flex justify-between items-center p-4 bg-white border border-gray-100 hover:border-emerald-300 transition-all cursor-pointer" @click="selectedDetailItems.includes(item.id) ? selectedDetailItems = selectedDetailItems.filter(x => x !== item.id) : selectedDetailItems.push(item.id)">
                  <div class="flex items-center gap-3">
                    <input type="checkbox" :value="item.id" v-model="selectedDetailItems" class="accent-emerald-600" @click.stop>
                    <div>
                      <div class="text-xs font-bold text-gray-800 uppercase tracking-tight">{{ item.name || item.description }}</div>
                      <div class="text-[9px] font-mono text-gray-400 uppercase mt-0.5">{{ item.description && item.description !== item.name ? item.description + ' · ' : '' }}{{ formatDate(item.date) }}<span v-if="item.reference"> · {{ item.reference }}</span></div>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="text-sm font-black text-emerald-600 font-display">+{{ $formatCurrency(item.amount) }}</div>
                    <div class="text-[8px] font-mono text-gray-400 uppercase">{{ item.type }}</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- Drawer Footer (for link tabs) -->
          <div v-if="detailTab !== 'transactions'" class="border-t border-gray-100 bg-gray-50 shrink-0">
            <!-- Progress bar (visible while linking) -->
            <div v-if="isLinking" class="w-full h-1 bg-gray-200">
              <div
                class="h-1 transition-all duration-500"
                :class="detailTab === 'link-expenses' ? 'bg-red-500' : detailTab === 'add-funds' ? 'bg-emerald-500' : 'bg-[#2F2E8B]'"
                :style="{ width: linkProgress.total ? (linkProgress.done / linkProgress.total * 100) + '%' : '60%' }"
              ></div>
            </div>
            <div class="p-5 flex justify-between items-center">
              <div class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                <span v-if="isLinking" class="flex items-center gap-2">
                  <i class="fas fa-spinner animate-spin text-[#2F2E8B]"></i>
                  Linking {{ linkProgress.done }}/{{ linkProgress.total }}…
                </span>
                <span v-else>
                  {{ selectedDetailItems.length }} selected
                  <span v-if="selectedDetailItems.length > 0" :class="detailTab === 'link-expenses' ? 'ml-2 text-red-500' : 'ml-2 text-emerald-600'">
                    · {{ $formatCurrency(detailLinkData.filter(i => selectedDetailItems.includes(i.id)).reduce((s,i) => s + i.amount, 0)) }}
                  </span>
                </span>
              </div>
              <button
                @click="linkItemsToAccount"
                :disabled="selectedDetailItems.length === 0 || isLinking"
                :class="detailTab === 'link-expenses' ? 'bg-red-600 hover:bg-red-700' : detailTab === 'add-funds' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-[#2F2E8B] hover:bg-[#1D226B]'"
                class="px-8 py-3 text-white text-[10px] font-mono font-bold uppercase tracking-widest transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <i :class="isLinking ? 'fas fa-spinner animate-spin' : 'fas fa-link'"></i>
                <span>{{ isLinking ? 'Linking…' : (detailTab === 'add-funds' ? 'Credit to ' + selectedAccount.name : 'Link to ' + selectedAccount.name) }}</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>

  <!-- Virtual Account Detail Drawer -->
  <div v-if="showVaDetail && selectedVa" class="fixed inset-0 z-[300] flex justify-end">
    <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="showVaDetail = false"></div>
    <div class="relative w-full max-w-xl bg-white shadow-2xl flex flex-col h-full overflow-hidden">

      <!-- VA Drawer Header -->
      <div class="p-6 bg-gray-900 text-white shrink-0">
        <div class="flex justify-between items-start mb-3">
          <div>
            <p class="text-[9px] font-mono font-bold uppercase tracking-widest text-white/50">Virtual Ledger</p>
            <h2 class="text-xl font-black uppercase tracking-tight mt-0.5">{{ selectedVa.name }}</h2>
          </div>
          <button @click="showVaDetail = false" class="text-white/60 hover:text-white text-xl w-8 h-8 flex items-center justify-center">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="flex items-end justify-between">
          <div>
            <div class="text-3xl font-black font-display" :class="selectedVa.balance >= 0 ? 'text-white' : 'text-red-400'">{{ $formatCurrency(selectedVa.balance) }}</div>
            <div class="text-[9px] font-mono text-white/40 uppercase tracking-widest mt-1">Balance</div>
          </div>
          <span class="px-3 py-1.5 bg-white/10 border border-white/20 text-[9px] font-mono font-bold uppercase tracking-widest">{{ selectedVa.category }}</span>
        </div>
      </div>

      <!-- VA Transactions -->
      <div class="flex-1 overflow-y-auto">
        <div class="px-6 pt-5 pb-2">
          <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Ledger Transactions</p>
        </div>
        <div v-if="loadingVaDetail" class="flex items-center justify-center py-16 text-gray-400">
          <i class="fas fa-spinner animate-spin text-2xl"></i>
        </div>
        <div v-else-if="vaTxList.length === 0" class="flex flex-col items-center justify-center py-16 text-gray-400">
          <i class="fas fa-layer-group text-4xl mb-3 opacity-20"></i>
          <p class="font-mono text-xs uppercase tracking-widest">No transactions yet</p>
          <p class="font-mono text-[10px] text-gray-300 uppercase tracking-widest mt-1">Transactions posted to this ledger will appear here</p>
        </div>
        <div v-else class="divide-y divide-gray-100 px-6">
          <div v-for="tx in vaTxList" :key="tx.id || tx._id" class="flex justify-between items-center py-4">
            <div class="flex items-center gap-3">
              <div :class="(tx.debit || 0) > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'"
                class="w-8 h-8 flex items-center justify-center text-xs shrink-0">
                <i :class="(tx.debit || 0) > 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down'"></i>
              </div>
              <div>
                <div class="text-xs font-bold text-gray-800 uppercase tracking-tight">{{ tx.description || tx.reference || 'Transaction' }}</div>
                <div class="text-[9px] font-mono text-gray-400 uppercase mt-0.5">{{ formatDate(tx.date || tx.created_at) }}<span v-if="tx.reference"> · {{ tx.reference }}</span></div>
              </div>
            </div>
            <div class="text-right shrink-0 ml-4">
              <div :class="(tx.debit || 0) > 0 ? 'text-[#2F2E8B]' : 'text-red-500'" class="text-sm font-black font-display">
                {{ (tx.debit || 0) > 0 ? '+' : '-' }}{{ $formatCurrency((tx.debit || 0) > 0 ? tx.debit : tx.credit) }}
              </div>
              <div class="text-[8px] font-mono text-gray-400 uppercase">{{ tx.type || 'Ledger' }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- VA Footer -->
      <div class="p-5 border-t border-gray-100 bg-gray-50 shrink-0 flex justify-between items-center">
        <div class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
          {{ vaTxList.length }} transaction{{ vaTxList.length !== 1 ? 's' : '' }}
        </div>
        <button @click="showVaDetail = false" class="px-6 py-2.5 bg-gray-900 text-white text-[10px] font-mono font-bold uppercase tracking-widest">
          Close
        </button>
      </div>

    </div>
  </div>

  <!-- Money Flow Map (Teleported to body) -->
  <Teleport to="body">
    <div v-if="showFlowMap" class="fixed inset-0 z-[600] flex flex-col" style="background:#0a0a0f">

      <!-- Top Bar -->
      <div class="flex items-center justify-between px-8 py-4 border-b shrink-0" style="background:#111118;border-color:#1f2937">
        <div class="flex items-center gap-4">
          <i class="fas fa-project-diagram text-[#4F4EDB] text-xl"></i>
          <div>
            <h2 class="text-sm font-black text-white uppercase tracking-widest">Money Flow Map</h2>
            <p class="text-[9px] font-mono text-gray-500 uppercase tracking-widest mt-0.5">How funds move across your business</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <!-- Legend -->
          <div class="flex items-center gap-5 mr-4">
            <div class="flex items-center gap-2">
              <svg width="28" height="8"><line x1="0" y1="4" x2="22" y2="4" stroke="#10b981" stroke-width="2" marker-end="url(#lm-g)"/><defs><marker id="lm-g" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3z" fill="#10b981"/></marker></defs></svg>
              <span class="text-[9px] font-mono text-gray-400 uppercase">Inflow</span>
            </div>
            <div class="flex items-center gap-2">
              <svg width="28" height="8"><line x1="0" y1="4" x2="22" y2="4" stroke="#ef4444" stroke-width="2" marker-end="url(#lm-r)"/><defs><marker id="lm-r" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3z" fill="#ef4444"/></marker></defs></svg>
              <span class="text-[9px] font-mono text-gray-400 uppercase">Outflow</span>
            </div>
            <div class="flex items-center gap-2">
              <svg width="28" height="8"><line x1="0" y1="4" x2="22" y2="4" stroke="#6366f1" stroke-width="2" stroke-dasharray="4,2" marker-end="url(#lm-b)"/><defs><marker id="lm-b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3z" fill="#6366f1"/></marker></defs></svg>
              <span class="text-[9px] font-mono text-gray-400 uppercase">Ledger Tag</span>
            </div>
          </div>
          <button @click="fetchFlowMap" class="px-4 py-2 text-[9px] font-mono font-bold uppercase tracking-widest text-gray-300 border border-gray-700 hover:border-gray-500 transition-colors">
            <i class="fas fa-sync mr-1" :class="loadingFlowMap && 'animate-spin'"></i> Refresh
          </button>
          <button @click="showFlowMap = false" class="px-4 py-2 text-[9px] font-mono font-bold uppercase tracking-widest text-gray-300 border border-gray-700 hover:bg-red-600 hover:border-red-600 transition-colors">
            <i class="fas fa-times mr-1"></i> Close
          </button>
        </div>
      </div>

      <!-- Column Headers -->
      <div class="flex shrink-0 px-0" style="background:#0d0d16">
        <div v-for="col in flowColumnDefs" :key="col.label"
          :style="{ width: col.w + 'px', marginLeft: col.ml + 'px' }"
          class="py-2 text-center text-[8px] font-mono font-bold uppercase tracking-widest"
          :class="col.color">
          {{ col.label }}
        </div>
      </div>

      <!-- SVG Canvas -->
      <div class="flex-1 overflow-auto">
        <div v-if="loadingFlowMap" class="flex items-center justify-center h-full text-gray-600">
          <i class="fas fa-spinner animate-spin text-4xl"></i>
        </div>
        <div v-else-if="!flowNodes.length" class="flex flex-col items-center justify-center h-full text-gray-600 gap-3">
          <i class="fas fa-project-diagram text-4xl opacity-30"></i>
          <p class="font-mono text-xs uppercase tracking-widest">No flow data yet. Link modules to accounts first.</p>
        </div>
        <svg v-else :width="flowSvgW" :height="flowSvgH" class="block">
          <defs>
            <marker id="fm-green" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3z" fill="#10b981"/>
            </marker>
            <marker id="fm-red" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3z" fill="#ef4444"/>
            </marker>
            <marker id="fm-indigo" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3z" fill="#6366f1"/>
            </marker>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          <!-- Column guide lines -->
          <line v-for="gx in flowGuideLines" :key="gx"
            :x1="gx" y1="10" :x2="gx" :y2="flowSvgH - 10"
            stroke="#1a1a2e" stroke-width="1"/>

          <!-- Edges -->
          <g v-for="(edge, ei) in flowEdgeData" :key="ei">
            <path
              :d="edge.d"
              fill="none"
              :stroke="edge.color"
              :stroke-width="Math.max(1.5, Math.min(5, 1.5 + edge.amount / 50000))"
              :stroke-dasharray="edge.type === 'transfer' ? '6,3' : 'none'"
              :marker-end="'url(#fm-' + edge.marker + ')'"
              opacity="0.75"
            />
            <text v-if="edge.amount > 0"
              :x="edge.lx" :y="edge.ly"
              text-anchor="middle"
              fill="#4b5563"
              font-size="10"
              font-family="monospace"
            >{{ fmtAmt(edge.amount) }}</text>
          </g>

          <!-- Nodes -->
          <g v-for="node in flowNodes" :key="node.id"
            @mouseenter="flowHover = node.id"
            @mouseleave="flowHover = null"
            style="cursor:default">

            <!-- Glow on hover -->
            <rect v-if="flowHover === node.id"
              :x="node.x - 3" :y="node.y - 3"
              :width="node.w + 6" :height="node.h + 6"
              rx="6" :fill="node.glowColor" opacity="0.18" filter="url(#glow)"/>

            <!-- Card -->
            <rect :x="node.x" :y="node.y" :width="node.w" :height="node.h"
              rx="4"
              :fill="node.fill"
              :stroke="flowHover === node.id ? '#fff' : node.stroke"
              stroke-width="1.5"/>

            <!-- Left accent bar -->
            <rect :x="node.x" :y="node.y" width="4" :height="node.h" rx="2" :fill="node.accent"/>

            <!-- Label -->
            <text
              :x="node.x + node.w / 2 + 2"
              :y="node.y + 19"
              text-anchor="middle"
              fill="#f3f4f6"
              font-size="11"
              font-weight="700"
              font-family="monospace"
              letter-spacing="0.5"
            >{{ node.label.length > 17 ? node.label.slice(0, 15) + '…' : node.label }}</text>

            <!-- Amount -->
            <text
              :x="node.x + node.w / 2 + 2"
              :y="node.y + 36"
              text-anchor="middle"
              :fill="node.amtColor"
              font-size="11"
              font-weight="700"
              font-family="monospace"
            >{{ fmtAmt(node.balance ?? node.amount ?? 0) }}</text>

            <!-- Count badge (for modules) -->
            <g v-if="node.count">
              <rect :x="node.x + node.w - 26" :y="node.y + 4" width="22" height="14" rx="7" :fill="node.accent" opacity="0.3"/>
              <text :x="node.x + node.w - 15" :y="node.y + 15" text-anchor="middle" fill="#d1d5db" font-size="9" font-family="monospace">{{ node.count }}</text>
            </g>
          </g>
        </svg>
      </div>

    </div>
  </Teleport>

</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import axios from 'axios';
import { API_BASE_URL } from '@/api_services/api';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { decodeJWT } from '@/api_services/decodeJWT';

const { getTenantId, getToken } = decodeJWT();
const loading = ref(false);
const tenantId = getTenantId();

// Dynamic sources for opening balance
const openingBalanceSource = ref('manual');
const sourceItems = ref([]);
const selectedSourceItem = ref(null);

const mainAccounts = ref([]);
const virtualAccounts = ref([]);
const branches = ref([]);
const selectedBranchId = ref('');
const syncBranchId = ref('');

const normalizeBranches = (list) => {
  const seen = new Set(['main']);
  const normalized = [{ id: 'main', name: 'Main Branch' }];
  if (!Array.isArray(list)) return normalized;
  for (const b of list) {
    const type = String(b?.type || '').toLowerCase();
    if (type && type !== 'branch') continue;
    const id = b?._id || b?.id || b?.branch_id;
    const name = b?.name || b?.branch_name || b?.title;
    if (!id || !name) continue;
    const key = String(id);
    if (seen.has(key)) continue;
    seen.add(key);
    normalized.push({ id: key, name: String(name).trim() });
  }
  const rest = normalized.slice(1).sort((a, b) => a.name.localeCompare(b.name));
  return [normalized[0], ...rest];
};

const branchOptions = computed(() => normalizeBranches(branches.value));

const showAddTransactionModal = ref(false);
const showAddMainAccountModal = ref(false);
const showAddVirtualAccountModal = ref(false);

// Export
const showExportModal = ref(false);
const exportTimeFrame = ref('full');
const exportStartDate = ref('');
const exportEndDate = ref('');
const exportSelectedAccounts = ref([]);
const accountExportData = ref([]);
const loadingExportAccounts = ref(false);

// Auto-select all accounts when modal opens
watch(showExportModal, (val) => {
  if (val) {
    exportSelectedAccounts.value = mainAccounts.value.map(a => a.id);
    loadAccountExportData();
  }
});

// Reload when selected accounts change
watch(exportSelectedAccounts, () => {
  if (showExportModal.value) loadAccountExportData();
}, { deep: true });

const loadAccountExportData = async () => {
  accountExportData.value = [];
  if (!exportSelectedAccounts.value.length) return;

  loadingExportAccounts.value = true;
  try {
    const combined = [];

    // Fetch account-specific transactions only — module data is for the global view
    const txResults = await Promise.allSettled(
      exportSelectedAccounts.value.map(id =>
        axios.get(`${API_BASE_URL}/ledger/main-accounts/${id}/transactions?tenant_id=${tenantId}`)
      )
    );
    for (const result of txResults) {
      if (result.status === 'fulfilled' && Array.isArray(result.value.data)) {
        for (const tx of result.value.data) {
          const net = Number(tx.net || 0);
          const mod = (tx.source_module || '').toLowerCase();
          const isExpense = mod === 'expenses' || mod === 'payroll' || (net < 0 && !mod);
          const moduleName = mod && ['sales', 'invoices', 'expenses', 'payroll', 'capital', 'grants', 'loans'].includes(mod)
            ? mod : (isExpense ? 'expenses' : 'sales');
          combined.push({ ...tx, _module: moduleName, _feedId: `tx-${tx.id}`, amount: Math.abs(net), date: tx.date || tx.created_at, description: tx.description || tx.reference || 'Transaction', source_module: tx.source_module, source_id: tx.source_id });
        }
      }
    }

    // Add account source entries (capital/grants/loans)
    for (const acc of selectedAccountBalances.value) {
      if (acc.source_info && acc.source_info.amount) {
        combined.push({ _module: acc.source_info.type || 'capital', _feedId: `source-${acc.id}`, amount: Number(acc.source_info.amount || 0), date: acc.created_at || new Date().toISOString().split('T')[0], description: `${acc.name} — Initial ${acc.source_info.type}: ${acc.source_info.label || ''}`, source_module: acc.source_info.type, source_id: `source-${acc.id}` });
      }
    }

    const seen = new Set();
    const deduped = [];
    for (const item of combined) {
      const key = `${item.source_module || ''}_${item.source_id || item._feedId}`;
      if (key === '_') { deduped.push(item); continue; }
      if (!seen.has(key)) { seen.add(key); deduped.push(item); }
    }
    deduped.sort((a, b) => { const da = a.date ? new Date(a.date).getTime() : 0; const db = b.date ? new Date(b.date).getTime() : 0; return db - da; });
    accountExportData.value = deduped;
  } catch (e) {
    console.error('Failed to load account export data', e);
  } finally {
    loadingExportAccounts.value = false;
  }
};

const selectedAccountBalances = computed(() =>
  mainAccounts.value.filter(a => exportSelectedAccounts.value.includes(a.id))
);
const totalSelectedBalance = computed(() =>
  selectedAccountBalances.value.reduce((s, a) => s + Number(a.balance || 0), 0)
);

// Export data: use account-specific data if accounts are selected, otherwise use activity feed
const parseDateValue = (val) => {
  if (!val) return 0;
  let raw = typeof val === 'string' ? val : (val.$date || String(val));
  // Date-only strings (YYYY-MM-DD) should be treated as local, not UTC
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    raw = raw + 'T00:00:00';
  }
  const d = new Date(raw).getTime();
  return isNaN(d) ? 0 : d;
};

const effectiveExportData = computed(() => {
  let data = exportSelectedAccounts.value.length > 0 ? accountExportData.value : activityFeed.value;
  if (exportTimeFrame.value === 'custom' && exportStartDate.value && exportEndDate.value) {
    const start = new Date(exportStartDate.value + 'T00:00:00').getTime();
    const end = new Date(exportEndDate.value + 'T23:59:59.999').getTime();
    data = data.filter(i => {
      if (!i.date) return true; // include items without dates
      const d = parseDateValue(i.date);
      return d === 0 || (d >= start && d <= end); // include if date missing or in range
    });
  }
  return data;
});

const exportPreview = computed(() => effectiveExportData.value.slice(0, 10));
const showSyncModal = ref(false);
const selectedSyncModule = ref('');
const syncData = ref([]);
const selectedSyncItems = ref([]);
const loadingSync = ref(false);

// Account detail drawer
const showAccountDetail = ref(false);
const selectedAccount = ref(null);
const detailTab = ref('transactions');
const accountTransactions = ref([]);
const detailLinkModule = ref('sales');
const detailLinkData = ref([]);
const selectedDetailItems = ref([]);
const loadingDetailData = ref(false);

// Virtual account detail drawer
const showVaDetail = ref(false);
const selectedVa = ref(null);
const vaTxList = ref([]);
const loadingVaDetail = ref(false);

const openVaDetail = async (va) => {
  selectedVa.value = va;
  showVaDetail.value = true;
  vaTxList.value = [];
  loadingVaDetail.value = true;
  try {
    const res = await axios.get(`${API_BASE_URL}/ledger/virtual-accounts/${va.id}/transactions?tenant_id=${tenantId}`);
    vaTxList.value = Array.isArray(res.data) ? res.data : [];
  } catch (e) {
    vaTxList.value = [];
  } finally {
    loadingVaDetail.value = false;
  }
};

const newMainAccount = ref({
  name: '',
  type: 'Bank Accounts',
  balance: 0,
  currency: 'ZMW',
  branch_id: ''
});

const newVirtualAccount = ref({
  name: '',
  category: 'Branch',
  balance: 0,
  branch_id: ''
});

const newTx = ref({
  description: '',
  reference: '',
  lines: [
    { account_id: '', debit: 0, credit: 0, tags: [] },
    { account_id: '', debit: 0, credit: 0, tags: [] }
  ]
});

const isTxBalanced = computed(() => {
  const debit = newTx.value.lines.reduce((s, l) => s + (l.debit || 0), 0);
  const credit = newTx.value.lines.reduce((s, l) => s + (l.credit || 0), 0);
  return Math.abs(debit - credit) < 0.001 && debit > 0;
});

const txBalanceStatus = computed(() => {
  const debit = newTx.value.lines.reduce((s, l) => s + (l.debit || 0), 0);
  const credit = newTx.value.lines.reduce((s, l) => s + (l.credit || 0), 0);
  if (debit === 0 && credit === 0) return 'Enter values';
  if (Math.abs(debit - credit) < 0.001) return 'Balanced';
  return `Unbalanced (${(debit - credit).toFixed(2)})`;
});

const selectedSyncTotal = computed(() => {
  return syncData.value
    .filter(i => selectedSyncItems.value.includes(i.id))
    .reduce((s, i) => s + (i.amount || 0), 0);
});

const txTotalIncome = computed(() =>
  accountTransactions.value
    .filter(tx => tx.net > 0)
    .reduce((s, tx) => s + tx.net, 0)
);

const txTotalExpenses = computed(() =>
  accountTransactions.value
    .filter(tx => tx.net < 0)
    .reduce((s, tx) => s + Math.abs(tx.net), 0)
);

const getModuleIcon = (mod) => {
  const icons = {
    'Sales': 'fas fa-chart-line',
    'Invoices': 'fas fa-file-invoice',
    'Expenses': 'fas fa-receipt',
    'Loans': 'fas fa-hand-holding-usd',
    'Payroll': 'fas fa-users'
  };
  return icons[mod] || 'fas fa-cube';
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString();
};

const fetchModuleData = async () => {
  if (!selectedSyncModule.value) return;
  loadingSync.value = true;
  syncData.value = [];
  selectedSyncItems.value = [];
  try {
    const branchQuery = syncBranchId.value ? `&branch_id=${syncBranchId.value}` : '';
    const res = await axios.get(`${API_BASE_URL}/ledger/module-data?tenant_id=${tenantId}&module=${selectedSyncModule.value}${branchQuery}`);
    syncData.value = res.data;
  } catch (error) {
    console.error(`Failed to fetch data from ${selectedSyncModule.value}`, error);
  } finally {
    loadingSync.value = false;
  }
};

const fetchBranches = async () => {
  try {
    // Always fetch live branches for this tenant to avoid stale local values.
    const token = getToken ? getToken() : localStorage.getItem('token');
    const res = await axios.get(`${API_BASE_URL}/subaccounts/branches/list?tenant_id=${tenantId}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    if (Array.isArray(res.data)) {
      branches.value = normalizeBranches(res.data);
    } else {
      branches.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch branches", error);
    branches.value = [];
  }
};

const postBatchTransactions = async () => {
  try {
    const itemsToPost = syncData.value.filter(i => selectedSyncItems.value.includes(i.id));
    await axios.post(`${API_BASE_URL}/ledger/batch-post?tenant_id=${tenantId}`, {
        module: selectedSyncModule.value,
        items: itemsToPost
    });
    alert("Transactions posted to ledger successfully");
    showSyncModal.value = false;
    refreshData();
  } catch (error) {
    alert("Failed to post batch transactions");
  }
};

const refreshData = async () => {
  loading.value = true;
  try {
    const branchQuery = selectedBranchId.value ? `&branch_id=${selectedBranchId.value}` : '';
    const [mainRes, virtualRes] = await Promise.all([
      axios.get(`${API_BASE_URL}/ledger/main-accounts?tenant_id=${tenantId}${branchQuery}`),
      axios.get(`${API_BASE_URL}/ledger/virtual-accounts?tenant_id=${tenantId}${branchQuery}`)
    ]);
    mainAccounts.value = mainRes.data;
    virtualAccounts.value = virtualRes.data;
  } catch (error) {
    console.error("Failed to load financial data", error);
  } finally {
    loading.value = false;
  }
  fetchActivityFeed();
};

// Activity Feed
const activityFeed = ref([]);
const loadingFeed = ref(false);
const feedFilter = ref('all');

const filteredFeed = computed(() => {
  if (feedFilter.value === 'all') return activityFeed.value;
  return activityFeed.value.filter(i => i._module === feedFilter.value);
});

// Export computed
const totalIncome = computed(() =>
  effectiveExportData.value.filter(i => i._module !== 'expenses').reduce((s, i) => s + (Number(i.amount) || 0), 0)
);
const totalExpenses = computed(() =>
  effectiveExportData.value.filter(i => i._module === 'expenses').reduce((s, i) => s + (Number(i.amount) || 0), 0)
);
const revenueIncome = computed(() =>
  effectiveExportData.value.filter(i => i._module === 'sales' || i._module === 'invoices').reduce((s, i) => s + (Number(i.amount) || 0), 0)
);
const capitalIncome = computed(() =>
  effectiveExportData.value.filter(i => i._module === 'capital').reduce((s, i) => s + (Number(i.amount) || 0), 0)
);
const grantsIncome = computed(() =>
  effectiveExportData.value.filter(i => i._module === 'grants').reduce((s, i) => s + (Number(i.amount) || 0), 0)
);
const loansIncome = computed(() =>
  effectiveExportData.value.filter(i => i._module === 'loans').reduce((s, i) => s + (Number(i.amount) || 0), 0)
);

const exportCSV = () => {
  const rows = [['Date', 'Module', 'Source', 'Description', 'Reference', 'Amount', 'Type']];
  for (const item of effectiveExportData.value) {
    rows.push([
      item.date || '',
      item._module || '',
      item.source_module || '',
      `"${(item.description || '').replace(/"/g, '""')}"`,
      item.reference || '',
      Number(item.amount || 0).toFixed(2),
      item._module === 'expenses' ? 'Expense' : 'Income'
    ]);
  }
  // Summary rows
  rows.push([]);
  rows.push(['SUMMARY', '', '', '', '', '']);
  rows.push(['Revenue (Sales/Invoices)', '', '', '', revenueIncome.value.toFixed(2), '']);
  if (capitalIncome.value > 0) rows.push(['Capital', '', '', '', capitalIncome.value.toFixed(2), '']);
  if (grantsIncome.value > 0) rows.push(['Grants', '', '', '', grantsIncome.value.toFixed(2), '']);
  if (loansIncome.value > 0) rows.push(['Loans', '', '', '', loansIncome.value.toFixed(2), '']);
  rows.push(['Total Income', '', '', '', totalIncome.value.toFixed(2), '']);
  rows.push(['Total Expenses', '', '', '', totalExpenses.value.toFixed(2), '']);
  rows.push(['Net Balance', '', '', '', (totalIncome.value - totalExpenses.value).toFixed(2), '']);
  
  // Bank balances
  if (mainAccounts.value.length) {
    rows.push([]);
    rows.push(['BANK BALANCES', '', '', '', '', '']);
    for (const acc of mainAccounts.value) {
      rows.push([acc.name, acc.type || '', '', '', Number(acc.balance || 0).toFixed(2), '']);
    }
  }

  const csv = rows.map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `financial_report_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showExportModal.value = false;
};

const selectAllAccounts = () => {
  exportSelectedAccounts.value = mainAccounts.value.map(a => a.id);
};
const deselectAllAccounts = () => {
  exportSelectedAccounts.value = [];
};

const formatCurrencyText = (amount) => {
  return `K ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const generateExportHeading = () => {
  const lines = [];
  lines.push(`FINANCIAL REPORT — ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`);
  if (exportTimeFrame.value === 'custom') {
    lines.push(`Period: ${exportStartDate.value} to ${exportEndDate.value}`);
  } else {
    lines.push('Period: Full History');
  }
  lines.push('');
  lines.push(`Total Records: ${effectiveExportData.value.length}`);
  lines.push(`Revenue (Sales/Invoices): K ${revenueIncome.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`);
  if (capitalIncome.value > 0) lines.push(`Capital: K ${capitalIncome.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`);
  if (grantsIncome.value > 0) lines.push(`Grants: K ${grantsIncome.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`);
  if (loansIncome.value > 0) lines.push(`Loans: K ${loansIncome.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`);
  lines.push(`Total Income: K ${totalIncome.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`);
  lines.push(`Total Expenses: K ${totalExpenses.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`);
  lines.push(`Net Balance: K ${(totalIncome.value - totalExpenses.value).toLocaleString('en-US', { minimumFractionDigits: 2 })}`);
  if (selectedAccountBalances.value.length) {
    lines.push('');
    lines.push('BANK BALANCES:');
    for (const acc of selectedAccountBalances.value) {
      lines.push(`  ${acc.name}: K ${Number(acc.balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}`);
    }
  }
  return lines;
};

const exportPDF = () => {
  const doc = new jsPDF();
  const primaryRGB = [47, 46, 139];
  let y = 15;

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
  doc.text('FINANCIAL REPORT', 15, y); y += 10;

  // Period & Summary
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80);
  const heading = generateExportHeading();
  for (const line of heading) { doc.text(line, 15, y); y += 5; }
  y += 5;

  // Table
  autoTable(doc, {
    startY: y,
    head: [['Date', 'Module', 'Description', 'Amount']],
    body: effectiveExportData.value.map(item => [
      item.date || '',
      item._module || '',
      (item.description || '').substring(0, 45),
      `${item._module === 'expenses' ? '-' : '+'}${formatCurrencyText(Number(item.amount || 0))}`
    ]),
    styles: { fontSize: 7, cellPadding: 2 },
    headStyles: { fillColor: [47, 46, 139], textColor: 255 },
    alternateRowStyles: { fillColor: [245, 245, 250] }
  });

  doc.save(`financial_report_${new Date().toISOString().split('T')[0]}.pdf`);
  showExportModal.value = false;
};

const exportDOCX = () => {
  const heading = generateExportHeading();
  let html = `<html><head><meta charset="UTF-8"><style>
    body { font-family: monospace; font-size: 11px; }
    table { border-collapse: collapse; width: 100%; margin-top: 10px; }
    th { background: #2F2E8B; color: white; padding: 6px; text-align: left; }
    td { padding: 4px 6px; border-bottom: 1px solid #eee; }
    .income { color: #16a34a; } .expense { color: #dc2626; }
    h2 { color: #2F2E8B; }
  </style></head><body>
  <h2>FINANCIAL REPORT</h2>`;
  for (const line of heading) { html += `<p>${line}</p>`; }
  html += `<table><tr><th>Date</th><th>Module</th><th>Description</th><th>Amount</th></tr>`;
  for (const item of effectiveExportData.value) {
    html += `<tr>
      <td>${item.date || ''}</td><td>${item._module || ''}</td>
      <td>${item.description || ''}</td>
      <td class="${item._module === 'expenses' ? 'expense' : 'income'}">${item._module === 'expenses' ? '-' : '+'}K ${Number(item.amount || 0).toFixed(2)}</td>
    </tr>`;
  }
  html += `</table></body></html>`;
  const blob = new Blob([html], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `financial_report_${new Date().toISOString().split('T')[0]}.doc`;
  a.click();
  URL.revokeObjectURL(url);
  showExportModal.value = false;
};

const fetchActivityFeed = async () => {
  loadingFeed.value = true;
  activityFeed.value = [];
  try {
    const [salesRes, invoicesRes, expensesRes, capitalRes, grantsRes, loansRes] = await Promise.allSettled([
      axios.get(`${API_BASE_URL}/ledger/module-data?tenant_id=${tenantId}&module=sales`),
      axios.get(`${API_BASE_URL}/ledger/module-data?tenant_id=${tenantId}&module=invoices`),
      axios.get(`${API_BASE_URL}/ledger/module-data?tenant_id=${tenantId}&module=expenses`),
      axios.get(`${API_BASE_URL}/ledger/module-data?tenant_id=${tenantId}&module=capital`),
      axios.get(`${API_BASE_URL}/ledger/module-data?tenant_id=${tenantId}&module=grants`),
      axios.get(`${API_BASE_URL}/ledger/module-data?tenant_id=${tenantId}&module=loans`)
    ]);
    const combined = [];
    const modules = [
      { name: 'sales', result: salesRes },
      { name: 'invoices', result: invoicesRes },
      { name: 'expenses', result: expensesRes },
      { name: 'capital', result: capitalRes },
      { name: 'grants', result: grantsRes },
      { name: 'loans', result: loansRes }
    ];
    for (const { name: mod, result } of modules) {
      if (result.status === 'fulfilled' && Array.isArray(result.value.data)) {
        for (const item of result.value.data) {
          combined.push({ ...item, _module: mod, _feedId: `${mod}-${item.id}` });
        }
      }
    }
    combined.sort((a, b) => {
      const da = a.date ? new Date(a.date).getTime() : 0;
      const db = b.date ? new Date(b.date).getTime() : 0;
      return db - da;
    });
    activityFeed.value = combined;
  } catch (e) {
    console.error('Failed to fetch activity feed', e);
  } finally {
    loadingFeed.value = false;
  }
};

const submitTransaction = async () => {
  try {
    await axios.post(`${API_BASE_URL}/ledger/transactions?tenant_id=${tenantId}`, newTx.value);
    alert("Transaction posted successfully");
    showAddTransactionModal.value = false;
    refreshData();
    // Reset form
    newTx.value = {
      description: '',
      reference: '',
      lines: [
        { account_id: '', debit: 0, credit: 0, tags: [] },
        { account_id: '', debit: 0, credit: 0, tags: [] }
      ]
    };
  } catch (error) {
    alert("Failed to post transaction");
  }
};

const createMainAccount = async () => {
  try {
    const payload = {
      ...newMainAccount.value,
      source_info: openingBalanceSource.value !== 'manual' && selectedSourceItem.value
        ? {
            type: openingBalanceSource.value,
            label: selectedSourceItem.value.label,
            amount: selectedSourceItem.value.amount,
            id: selectedSourceItem.value.id
          }
        : null
    };
    await axios.post(`${API_BASE_URL}/ledger/main-accounts?tenant_id=${tenantId}`, payload);
    showAddMainAccountModal.value = false;
    openingBalanceSource.value = 'manual';
    selectedSourceItem.value = null;
    refreshData();
    newMainAccount.value = { name: '', type: 'Bank Accounts', balance: 0, currency: 'ZMW', branch_id: '' };
  } catch (error) {
    alert("Failed to create main account");
  }
};

const createVirtualAccount = async () => {
  try {
    await axios.post(`${API_BASE_URL}/ledger/virtual-accounts?tenant_id=${tenantId}`, newVirtualAccount.value);
    alert("Virtual ledger created successfully");
    showAddVirtualAccountModal.value = false;
    refreshData();
    newVirtualAccount.value = { name: '', category: 'Branch', balance: 0 };
  } catch (error) {
    alert("Failed to create virtual ledger");
  }
};

const handleSourceChange = async () => {
    sourceItems.value = [];
    selectedSourceItem.value = null;
    newMainAccount.value.balance = 0;
    
    if (openingBalanceSource.value === 'manual') return;
    
    try {
        let endpoint = '';
        if (openingBalanceSource.value === 'loan') endpoint = '/loans';
        else if (openingBalanceSource.value === 'grant') endpoint = '/loans/grants';
        else if (openingBalanceSource.value === 'capital') endpoint = '/loans/capital';
        
        // Fetch source items and already-used IDs in parallel
        const moduleMap = { loan: 'loans', grant: 'grants', capital: 'capital' };
        const moduleName = moduleMap[openingBalanceSource.value] || openingBalanceSource.value;

        const [sourceRes, usedRes] = await Promise.allSettled([
            axios.get(`${API_BASE_URL}${endpoint}?tenant_id=${tenantId}`),
            axios.get(`${API_BASE_URL}/ledger/module-data?tenant_id=${tenantId}&module=${moduleName}`)
        ]);

        const data = sourceRes.status === 'fulfilled'
            ? (sourceRes.value.data.loans || sourceRes.value.data.grants || sourceRes.value.data.capital || sourceRes.value.data)
            : [];

        // IDs still available (not yet linked to any account)
        const availableIds = new Set(
            usedRes.status === 'fulfilled' && Array.isArray(usedRes.value.data)
                ? usedRes.value.data.map(i => i.id)
                : (Array.isArray(data) ? data.map(i => String(i.id || i._id)) : [])
        );

        sourceItems.value = (Array.isArray(data) ? data : [])
            .filter(item => availableIds.has(String(item.id || item._id)))
            .map(item => ({
                id: item.id || item._id,
                amount: item.amount,
                label: item.source || item.contributor || item.name || item.loan_code || 'Unnamed Source'
            }));
    } catch (error) {
        alert("Failed to fetch source items");
    }
};

const updateBalanceFromSource = () => {
    if (selectedSourceItem.value) {
        newMainAccount.value.balance = selectedSourceItem.value.amount;
    } else {
        newMainAccount.value.balance = 0;
    }
};

const openAccountDetail = async (account) => {
  selectedAccount.value = account;
  detailTab.value = 'transactions';
  detailLinkData.value = [];
  selectedDetailItems.value = [];
  accountTransactions.value = [];
  showAccountDetail.value = true;
  await fetchAccountTransactions(account.id);
};

const fetchAccountTransactions = async (accountId) => {
  loadingDetailData.value = true;
  try {
    const res = await axios.get(`${API_BASE_URL}/ledger/main-accounts/${accountId}/transactions?tenant_id=${tenantId}`);
    accountTransactions.value = res.data;
  } catch (e) {
    accountTransactions.value = [];
  } finally {
    loadingDetailData.value = false;
  }
};

const fetchDetailModuleData = async () => {
  if (!detailLinkModule.value || !selectedAccount.value) return;
  loadingDetailData.value = true;
  detailLinkData.value = [];
  selectedDetailItems.value = [];
  try {
    const res = await axios.get(`${API_BASE_URL}/ledger/module-data?tenant_id=${tenantId}&module=${detailLinkModule.value}`);
    // Sort latest first client-side as a safety net
    const items = Array.isArray(res.data) ? res.data : [];
    items.sort((a, b) => {
      const da = a.date ? new Date(a.date).getTime() : 0;
      const db = b.date ? new Date(b.date).getTime() : 0;
      return db - da;
    });
    detailLinkData.value = items;
  } catch (e) {
    detailLinkData.value = [];
  } finally {
    loadingDetailData.value = false;
  }
};

const switchDetailTab = async (tab) => {
  detailTab.value = tab;
  selectedDetailItems.value = [];
  if (tab === 'transactions') {
    await fetchAccountTransactions(selectedAccount.value.id);
  } else if (tab === 'link-cash') {
    detailLinkModule.value = 'sales';
    await fetchDetailModuleData();
  } else if (tab === 'link-expenses') {
    detailLinkModule.value = 'expenses';
    await fetchDetailModuleData();
  } else if (tab === 'add-funds') {
    detailLinkModule.value = 'loans';
    await fetchDetailModuleData();
  }
};

const deleteAccount = async () => {
  if (!selectedAccount.value) return;
  const confirmed = confirm(
    `Are you sure you want to delete "${selectedAccount.value.name}"?\n\nThis will permanently remove the account. Linked transaction records will remain in the ledger history.`
  );
  if (!confirmed) return;
  try {
    await axios.delete(`${API_BASE_URL}/ledger/main-accounts/${selectedAccount.value.id}?tenant_id=${tenantId}`);
    showAccountDetail.value = false;
    selectedAccount.value = null;
    await refreshData();
  } catch (e) {
    alert('Failed to delete account.');
  }
};

const isLinking = ref(false);
const linkProgress = ref({ done: 0, total: 0 });
const removingTxId = ref(null);

const removeTransaction = async (tx) => {
  if (!confirm(`Remove "${tx.description || 'this transaction'}" from ${selectedAccount.value?.name}?\n\nThis reverses the balance effect and frees the record to be re-linked.`)) return;
  removingTxId.value = tx.id;
  try {
    await axios.delete(
      `${API_BASE_URL}/ledger/main-accounts/${selectedAccount.value.id}/transactions/${tx.id}?tenant_id=${tenantId}`
    );
    await fetchAccountTransactions(selectedAccount.value.id);
    await refreshData();
    const updated = mainAccounts.value.find(a => a.id === selectedAccount.value.id);
    if (updated) selectedAccount.value = updated;
  } catch (e) {
    alert('Failed to remove transaction.');
  } finally {
    removingTxId.value = null;
  }
};


const linkItemsToAccount = async () => {
  if (!selectedDetailItems.value.length || !selectedAccount.value || isLinking.value) return;
  const items = detailLinkData.value.filter(i => selectedDetailItems.value.includes(i.id));
  const total = items.length;
  isLinking.value = true;
  linkProgress.value = { done: 0, total };
  try {
    // Post all at once; the backend already deduplicates via ledger_sync_registry.
    // We send the full list and track progress by simulating per-item increments.
    const res = await axios.post(
      `${API_BASE_URL}/ledger/main-accounts/${selectedAccount.value.id}/link-module?tenant_id=${tenantId}`,
      { module: detailLinkModule.value, items }
    );
    linkProgress.value.done = total;
    // Small visual pause so the user sees 100% before it clears
    await new Promise(r => setTimeout(r, 600));
    selectedDetailItems.value = [];
    await fetchDetailModuleData();
    await fetchAccountTransactions(selectedAccount.value.id);
    await refreshData();
    const updated = mainAccounts.value.find(a => a.id === selectedAccount.value.id);
    if (updated) selectedAccount.value = updated;
  } catch (e) {
    alert('Failed to link items. Some may already be linked to another account.');
  } finally {
    isLinking.value = false;
    linkProgress.value = { done: 0, total: 0 };
  }
};

onMounted(() => {
  refreshData();
  fetchBranches();
  fetchActivityFeed();
});

// ── Flow Map ─────────────────────────────────────────────────────────────────
const showFlowMap = ref(false);
const loadingFlowMap = ref(false);
const flowRawData = ref({ nodes: [], edges: [] });
const flowHover = ref(null);

// Column definitions (for header labels + guide lines)
const flowColumnDefs = [
  { label: 'Funding Sources', color: 'text-emerald-600', w: 200, ml: 40 },
  { label: 'Revenue',         color: 'text-blue-500',    w: 200, ml: 60 },
  { label: 'Main Accounts',   color: 'text-purple-400',  w: 200, ml: 60 },
  { label: 'Virtual Ledgers', color: 'text-indigo-400',  w: 200, ml: 60 },
  { label: 'Outflows',        color: 'text-red-500',     w: 200, ml: 60 },
];

const NODE_W = 170;
const NODE_H = 52;
const COL_X  = [40, 250, 480, 710, 930];  // x start per column
const ROW_GAP = 24;
const PAD_TOP = 40;

const flowGuideLines = COL_X.map(x => x + NODE_W / 2);
const flowSvgW = computed(() => 1140);

const flowNodes = computed(() => {
  const raw = flowRawData.value.nodes || [];
  // Assign to columns
  const cols = [[], [], [], [], []];
  for (const n of raw) {
    if (n.type === 'module') {
      if (['loans', 'grants', 'capital'].includes(n.subtype)) cols[0].push(n);
      else if (['sales', 'invoices'].includes(n.subtype))     cols[1].push(n);
      else if (['expenses', 'payroll'].includes(n.subtype))   cols[4].push(n);
    } else if (n.type === 'main_account')    cols[2].push(n);
    else if (n.type === 'virtual_account')   cols[3].push(n);
  }

  const result = [];
  cols.forEach((col, ci) => {
    const totalH = col.length * (NODE_H + ROW_GAP) - ROW_GAP;
    const startY = PAD_TOP + Math.max(0, (flowSvgH.value - PAD_TOP * 2 - totalH) / 2);
    col.forEach((n, ri) => {
      const subtypeColors = {
        source:  { fill: '#0d2a1a', stroke: '#065f46', accent: '#10b981', glowColor: '#10b981', amtColor: '#34d399' },
        revenue: { fill: '#0d1f3a', stroke: '#1e40af', accent: '#3b82f6', glowColor: '#3b82f6', amtColor: '#60a5fa' },
        outflow: { fill: '#2a0d0d', stroke: '#7f1d1d', accent: '#ef4444', glowColor: '#ef4444', amtColor: '#f87171' },
      };
      const accountColors = { fill: '#13102e', stroke: '#3730a3', accent: '#818cf8', glowColor: '#818cf8', amtColor: '#a5b4fc' };
      const vaColors      = { fill: '#0f1a2e', stroke: '#1e3a5f', accent: '#6366f1', glowColor: '#6366f1', amtColor: '#818cf8' };

      let colors;
      if (n.type === 'module') colors = subtypeColors[n.subtype] || subtypeColors.source;
      else if (n.type === 'main_account')  colors = accountColors;
      else colors = vaColors;

      result.push({
        ...n,
        x: COL_X[ci],
        y: startY + ri * (NODE_H + ROW_GAP),
        w: NODE_W,
        h: NODE_H,
        label: n.label.toUpperCase(),
        ...colors,
      });
    });
  });
  return result;
});

const flowSvgH = computed(() => {
  const cols = [0, 0, 0, 0, 0];
  for (const n of (flowRawData.value.nodes || [])) {
    let ci = 2;
    if (n.type === 'module') {
      if (['loans','grants','capital'].includes(n.subtype)) ci = 0;
      else if (['sales','invoices'].includes(n.subtype)) ci = 1;
      else if (['expenses','payroll'].includes(n.subtype)) ci = 4;
    } else if (n.type === 'virtual_account') ci = 3;
    cols[ci]++;
  }
  const maxRows = Math.max(...cols, 3);
  return PAD_TOP * 2 + maxRows * (NODE_H + ROW_GAP);
});

const flowEdgeData = computed(() => {
  const nodeMap = Object.fromEntries(flowNodes.value.map(n => [n.id, n]));
  return (flowRawData.value.edges || []).map((e, i) => {
    const from = nodeMap[e.from];
    const to   = nodeMap[e.to];
    if (!from || !to) return null;
    const x1 = from.x + from.w;
    const y1 = from.y + from.h / 2;
    const x2 = to.x;
    const y2 = to.y + to.h / 2;
    const cx = (x1 + x2) / 2;
    const color  = e.type === 'inflow' ? '#10b981' : e.type === 'outflow' ? '#ef4444' : '#6366f1';
    const marker = e.type === 'inflow' ? 'green' : e.type === 'outflow' ? 'red' : 'indigo';
    return {
      d: `M ${x1} ${y1} C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`,
      lx: cx,
      ly: (y1 + y2) / 2 - 8,
      amount: e.amount || 0,
      type: e.type,
      color,
      marker,
    };
  }).filter(Boolean);
});

const fmtAmt = (v) => {
  if (!v) return 'K 0';
  if (v >= 1_000_000) return `K ${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000)     return `K ${(v / 1_000).toFixed(1)}K`;
  return `K ${Number(v).toFixed(0)}`;
};

const fetchFlowMap = async () => {
  loadingFlowMap.value = true;
  try {
    const res = await axios.get(`${API_BASE_URL}/ledger/flow-map?tenant_id=${tenantId}`);
    flowRawData.value = res.data;
  } catch (e) {
    console.error('Flow map fetch failed', e);
  } finally {
    loadingFlowMap.value = false;
  }
};

const openFlowMap = async () => {
  showFlowMap.value = true;
  if (!flowRawData.value.nodes.length) await fetchFlowMap();
};
</script>

<style scoped>
.mesh-background {
  background-image: 
    radial-gradient(at 0% 0%, rgba(47, 46, 139, 0.03) 0, transparent 50%),
    radial-gradient(at 100% 0%, rgba(47, 46, 139, 0.03) 0, transparent 50%);
}

.dotted-pattern {
  background-image: radial-gradient(#2F2E8B 1px, transparent 1px);
  background-size: 20px 20px;
}

.font-display {
  font-family: 'Inter', sans-serif;
}
</style>
