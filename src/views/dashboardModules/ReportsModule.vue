<template>
  <div class="bg-white min-w-0 flex flex-col gap-6 w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 relative">
    <!-- Mesh Background -->
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <!-- Header Section -->
    <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
      <div class="flex items-center gap-3">
        <div class="w-2 h-8 bg-[#2F2E8B] rounded-none"></div>
        <div>
          <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Business Intelligence</span>
          <h2 class="text-xl font-black text-gray-900 uppercase tracking-tight font-outfit">Reports & Analytics</h2>
        </div>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <!-- Date Range Selector -->
        <div class="flex items-center gap-1 bg-gray-100 p-0.5 border border-gray-200">
          <select 
            v-model="reportRange" 
            class="bg-transparent border-none text-gray-700 py-1.5 px-2 text-[10px] font-bold font-mono uppercase focus:ring-0 cursor-pointer hover:bg-white transition-colors"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="month">Monthly</option>
            <option value="custom">Custom</option>
          </select>
          
          <div v-if="reportRange === 'custom'" class="flex items-center gap-1 px-2 border-l border-gray-300">
            <div class="flex items-center gap-1">
              <input 
                type="date" 
                v-model="customStartDate" 
                class="bg-transparent border-none text-[10px] font-mono text-gray-600 focus:ring-0 p-0"
                placeholder="Start"
              />
              <input 
                type="time" 
                v-model="customStartTime" 
                class="bg-transparent border-none text-[10px] font-mono text-gray-600 focus:ring-0 p-0 w-[80px]"
              />
            </div>
            <span class="text-gray-400 text-[10px] font-mono">to</span>
            <div class="flex items-center gap-1">
              <input 
                type="date" 
                v-model="customEndDate" 
                class="bg-transparent border-none text-[10px] font-mono text-gray-600 focus:ring-0 p-0"
                placeholder="End"
              />
              <input 
                type="time" 
                v-model="customEndTime" 
                class="bg-transparent border-none text-[10px] font-mono text-gray-600 focus:ring-0 p-0 w-[80px]"
              />
            </div>
          </div>
        </div>

        <!-- Branch Selector -->
         <div class="relative min-w-[160px]" v-if="branches && branches.length > 0">
           <select 
             v-model="selectedBranch" 
             class="appearance-none w-full bg-white border border-gray-200 text-gray-700 py-1.5 px-3 pr-7 leading-tight focus:outline-none focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] transition-all text-[10px] font-bold font-mono uppercase cursor-pointer"
           >
             <option v-for="branch in branches" :key="branch._id" :value="branch">
               {{ branch.name || branch.location || 'Branch' }}
             </option>
           </select>
           <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
             <i class="fas fa-chevron-down text-[8px]"></i>
           </div>
         </div>

        <button @click="showFinancialReportsModal = true" 
                class="bg-[#2F2E8B] hover:bg-[#1D226B] text-white font-bold px-4 py-1.5 text-[10px] font-mono uppercase tracking-wide transition-colors shadow-sm">
          <i class="fas fa-file-invoice-dollar mr-1"></i> Financial Reports
        </button>
        <button @click="showReportModal = true" 
                class="bg-gray-800 hover:bg-gray-700 text-white font-bold px-4 py-1.5 text-[10px] font-mono uppercase tracking-wide transition-colors shadow-sm">
          <i class="fas fa-plus mr-1"></i> Export Report
        </button>
      </div>
    </div>

  <!-- Reports Summary Cards -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
  <div class="bg-white border border-gray-100 p-5 shadow-sm relative overflow-hidden">
        <div class="absolute top-0 left-0 w-1 h-full bg-[#2F2E8B]"></div>
        <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Total Sales</div>
  <div class="text-2xl font-black text-gray-900 font-outfit">{{ formatWithSymbol(totalSales) }}</div>
        <div class="flex items-center mt-2 text-[10px] font-mono font-bold">
          <i :class="[
            salesTrend >= 0 ? 'fas fa-arrow-up text-emerald-500' : 'fas fa-arrow-down text-red-500',
            'mr-1'
          ]"></i>
          <span :class="salesTrend >= 0 ? 'text-emerald-600' : 'text-red-600'">
            {{ Math.abs(salesTrend) }}% vs last month
          </span>
        </div>
      </div>

  <div class="bg-white border border-gray-100 p-5 shadow-sm relative overflow-hidden">
        <div class="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
        <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Net Profit</div>
  <div class="text-2xl font-black text-gray-900 font-outfit">{{ formatWithSymbol(netProfit) }}</div>
        <div class="flex items-center mt-2 text-[10px] font-mono font-bold">
          <i :class="[
            profitTrend >= 0 ? 'fas fa-arrow-up text-emerald-500' : 'fas fa-arrow-down text-red-500',
            'mr-1'
          ]"></i>
          <span :class="profitTrend >= 0 ? 'text-emerald-600' : 'text-red-600'">
            {{ Math.abs(profitTrend) }}% vs last month
          </span>
        </div>
      </div>

      <div class="bg-white border border-gray-100 p-5 shadow-sm relative overflow-hidden">
        <div class="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
        <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Current Inventory Value</div>
  <div class="text-2xl font-black text-gray-900 font-outfit">{{ formatWithSymbol(inventoryValue) }}</div>
        <div class="text-[10px] font-mono font-bold text-gray-400 mt-2">{{ inventoryItems }} items in stock</div>
      </div>

      <!-- Invoice Total Amount Card -->
      <div class="bg-white border border-gray-100 p-5 shadow-sm relative overflow-hidden">
        <div class="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
        <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Invoice Total</div>
        <div class="text-2xl font-black text-gray-900 font-outfit">{{ formatWithSymbol(invoicesSummary?.totalAmount || 0) }}</div>
        <div class="text-[10px] font-mono font-bold text-gray-400 mt-2">{{ invoicesSummary?.count || 0 }} invoice(s)</div>
      </div>
    </div>

    <!-- Report Types Tabs -->
  <div class="flex bg-gray-100 p-0.5 border border-gray-200 overflow-x-auto relative z-10 w-fit">
      <button 
        v-for="tab in reportTabs" 
        :key="tab.id"
        :class="[
          'px-4 py-1.5 text-[10px] font-bold font-mono uppercase tracking-wide flex items-center gap-1.5 transition-all whitespace-nowrap',
          currentTab === tab.id 
            ? 'bg-white text-[#2F2E8B] shadow-sm' 
            : 'text-gray-400 hover:text-gray-600'
        ]"
        @click="currentTab = tab.id"
      >
        <i :class="tab.icon" class="text-[9px]"></i> {{ tab.name }}
  </button>
    </div>

    <!-- Report Content -->
    <div class="mt-6 relative z-10">
      <!-- Financial Statements -->
      <div v-if="currentTab === 'financial'" class="space-y-8">
        <div class="bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div class="p-4 border-b border-gray-100 flex items-center gap-3">
            <div class="w-1.5 h-4 bg-[#2F2E8B] rounded-none"></div>
            <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight font-outfit">Income Statement</h3>
          </div>
          <div class="p-6">
            <div class="overflow-x-auto">
              <table class="min-w-full responsive-table">
              <thead>
                <tr class="text-left border-b border-gray-100">
                  <th class="pb-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider">Item</th>
                  <th class="pb-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider text-right">Amount</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr class="hover:bg-gray-50/50 transition-colors">
                  <td class="py-3 px-4 text-xs font-mono text-gray-700" data-label="Item">Revenue</td>
                  <td class="py-3 px-4 text-xs font-mono text-gray-900 font-bold text-right" data-label="Amount">{{ formatWithSymbol(financials.revenue) }}</td>
                </tr>
                <tr class="hover:bg-gray-50/50 transition-colors">
                  <td class="py-3 px-4 text-xs font-mono text-gray-700" data-label="Item">VAT</td>
                  <td class="py-3 px-4 text-xs font-mono font-bold text-right text-red-500" data-label="Amount">{{ formatNegative(financials.vat) }}</td>
                </tr>
                <tr class="bg-[#2F2E8B]/5">
                  <td class="py-3 px-4 text-xs font-mono font-black text-gray-900 uppercase" data-label="Item">Gross Profit</td>
                  <td class="py-3 px-4 text-xs font-mono font-black text-[#2F2E8B] text-right" data-label="Amount">{{ formatWithSymbol(financials.grossProfit) }}</td>
                </tr>
                <tr class="hover:bg-gray-50/50 transition-colors">
                  <td colspan="2" class="py-3 px-4">
                    <div class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider mb-2">Expenses Breakdown</div>
                    <div class="space-y-1.5 pl-4 border-l-2 border-gray-100">
                      <div v-for="(amount, category) in financials.expenseBreakdown" 
                           :key="category" 
                           class="flex justify-between text-xs font-mono">
                        <span class="text-gray-500" data-label="Category">{{ category }}</span>
                        <span class="text-red-500 font-bold" data-label="Amount">{{ formatNegative(amount) }}</span>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr class="hover:bg-gray-50/50 transition-colors">
                  <td class="py-3 px-4 text-xs font-mono text-gray-700" data-label="Item">Total Expenses</td>
                  <td class="py-3 px-4 text-xs font-mono font-bold text-right text-red-500" data-label="Amount">{{ formatNegative(financials.expenses) }}</td>
                </tr>
                <!-- Payroll row -->
                <tr class="hover:bg-gray-50/50 transition-colors">
                  <td class="py-3 px-4 text-xs font-mono text-gray-700" data-label="Item">Payroll (Net)</td>
                  <td class="py-3 px-4 text-xs font-mono font-bold text-right text-red-500" data-label="Amount">{{ formatNegative(payroll.totalPayroll) }}</td>
                </tr>
                <tr class="bg-[#2F2E8B]/5">
                  <td class="py-3 px-4 text-xs font-mono font-black text-gray-900 uppercase" data-label="Item">Net Profit</td>
                  <td class="py-3 px-4 text-xs font-mono font-black text-right" data-label="Amount"
                      :class="(financials.netProfit - payroll.totalPayroll) >= 0 ? 'text-emerald-600' : 'text-red-500'">
                    {{ formatWithSymbol(financials.netProfit - payroll.totalPayroll) }}
                  </td>
                </tr>
              </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- Financial Ratios Section -->
        <div class="bg-white border border-gray-100 shadow-sm overflow-hidden mt-6">
          <div class="p-4 border-b border-gray-100 flex items-center gap-3">
            <div class="w-1.5 h-4 bg-emerald-500 rounded-none"></div>
            <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight font-outfit">Financial Ratios</h3>
          </div>
          <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-gray-50 border border-gray-100 p-4">
              <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Net Worth</div>
              <div class="text-xl font-black text-gray-900 font-outfit">{{ formatWithSymbol(netWorth) }}</div>
            </div>
            <div class="bg-gray-50 border border-gray-100 p-4">
              <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Total Equity & Liabilities</div>
              <div class="text-xl font-black text-gray-900 font-outfit">{{ formatWithSymbol(totalEquityAndLiabilities) }}</div>
            </div>
            <div class="bg-gray-50 border border-gray-100 p-4">
              <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Debt to Equity Ratio</div>
              <div class="text-xl font-black text-gray-900 font-outfit">{{ formatNumber(debtToEquityRatio) }}</div>
            </div>
            <div class="bg-gray-50 border border-gray-100 p-4">
              <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Payroll (Net)</div>
              <div class="text-xl font-black text-gray-900 font-outfit">{{ formatWithSymbol(payroll.totalPayroll) }}</div>
              <div class="text-sm text-gray-400">Headcount: {{ payroll.headcount }}</div>
            </div>
          </div>
        </div>
        <!-- Tax Summary Section -->
        <div class="bg-white border border-gray-100 shadow-sm overflow-hidden mt-6">
          <div class="p-4 border-b border-gray-100 flex items-center gap-3">
            <div class="w-1.5 h-4 bg-amber-500 rounded-none"></div>
            <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight font-outfit">Tax Summary</h3>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div class="bg-gray-50 border border-gray-100 p-4">
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Total Tax Paid</div>
                <div class="text-xl font-black text-gray-900 font-outfit">{{ formatWithSymbol(taxSummary.totalTaxPaid) }}</div>
              </div>
              <div class="bg-gray-50 border border-gray-100 p-4">
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Estimated Obligation</div>
                <div class="text-xl font-black text-amber-600 font-outfit">{{ formatWithSymbol(taxSummary.estimatedTax) }}</div>
              </div>
              <div class="bg-gray-50 border border-gray-100 p-4 text-red-600">
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Outstanding Audit</div>
                <div class="text-xl font-black font-outfit">{{ formatWithSymbol(taxSummary.outstandingTax) }}</div>
              </div>
              <div class="bg-gray-50 border border-gray-100 p-4">
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Audit Sales</div>
                <div class="text-xl font-black text-[#2F2E8B] font-outfit">{{ formatWithSymbol(taxSummary.auditSales) }}</div>
              </div>
              <div class="bg-gray-50 border border-gray-100 p-4">
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Next Due Date</div>
                <div class="text-xl font-black text-gray-900 font-outfit">
                  {{ taxSummary.nextDueDate ? formatDate(taxSummary.nextDueDate) : 'N/A' }}
                </div>
              </div>
              <div class="bg-gray-50 border border-gray-100 p-4">
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Compliance Score</div>
                <div class="text-xl font-black text-emerald-600 font-outfit">{{ taxSummary.complianceScore }}%</div>
              </div>
            </div>
            <!-- Tax Payment History -->
              <div class="mt-6">
              <h4 class="text-sm font-black text-gray-900 uppercase tracking-tight font-outfit mb-4">Recent Tax Payments</h4>
                <div class="overflow-x-auto">
                  <table class="min-w-full responsive-table divide-y divide-gray-50">
                  <thead>
                    <tr class="border-b border-gray-100">
                      <th class="px-4 py-2 text-left text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider">Period</th>
                      <th class="px-4 py-2 text-right text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                      <th class="px-4 py-2 text-center text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider">Status</th>
                      <th class="px-4 py-2 text-right text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider">Payment Date</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-50">
                        <tr v-if="taxHistory.length === 0">
                          <td colspan="4" class="px-4 py-4 text-center text-gray-400" data-label="Info">
                            No tax payment history available
                          </td>
                        </tr>
                        <tr v-for="payment in taxHistory" 
                            :key="payment.id" 
                            class="hover:bg-gray-50/50 transition-colors">
                          <td class="px-4 py-2 text-xs font-mono text-gray-600" data-label="Period">{{ formatPeriod(payment.tax_period) }}</td>
                          <td class="px-4 py-2 text-xs font-mono text-gray-700 font-bold text-right" data-label="Amount">{{ formatWithSymbol(payment.amount) }}</td>
                          <td class="px-4 py-2 text-center" data-label="Status">
                            <span :class="{
                              'px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider': true,
                              'bg-[#6B6A9E] text-[#FFFFFF]': payment.status === 'paid',
                              'bg-[#F4F4F4] text-gray-500': payment.status === 'pending',
                              'bg-[#F2F2F2] text-gray-800': payment.status === 'overdue'
                            }">
                              {{ payment.status }}
                            </span>
                          </td>
                          <td class="px-4 py-2 text-right text-gray-400" data-label="Payment Date">
                            {{ formatDate(payment.payment_date) }}
                          </td>
                        </tr>
                  </tbody>
                  </table>
                </div>
            </div>
          </div>
        </div>
        <!-- Equity Section -->
        <div class="bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div class="p-4 border-b border-gray-100 flex items-center gap-3">
            <div class="w-1.5 h-4 bg-purple-500 rounded-none"></div>
            <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight font-outfit">Equity & Capital</h3>
          </div>
          <div class="p-6">
            <div class="overflow-x-auto">
              <table class="min-w-full responsive-table">
              <thead>
                <tr class="text-left border-b border-gray-100">
                  <th class="pb-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider">Item</th>
                  <th class="pb-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider text-right">Amount</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr class="hover:bg-gray-50/50 transition-colors">
                  <td class="py-3 px-4 text-xs font-mono text-gray-700" data-label="Item">Capital Contributions</td>
                  <td class="py-3 px-4 text-xs font-mono text-gray-900 font-bold text-right" data-label="Amount">{{ formatWithSymbol(equity.capitalContributions) }}</td>
                </tr>
                <tr class="hover:bg-gray-50/50 transition-colors">
                  <td class="py-3 px-4 text-xs font-mono text-gray-700" data-label="Item">Grants</td>
                  <td class="py-3 px-4 text-xs font-mono text-gray-900 font-bold text-right" data-label="Amount">{{ formatWithSymbol(equity.grants) }}</td>
                </tr>
                <tr class="hover:bg-gray-50/50 transition-colors">
                  <td class="py-3 px-4 text-xs font-mono text-gray-700" data-label="Item">Retained Earnings</td>
                  <td class="py-3 px-4 text-xs font-mono text-gray-900 font-bold text-right" data-label="Amount">{{ formatWithSymbol(equity.retainedEarnings) }}</td>
                </tr>
                <tr class="hover:bg-gray-50/50 transition-colors">
                  <td class="py-3 px-4 text-xs font-mono text-red-500" data-label="Item">Dividends Paid</td>
                  <td class="py-3 px-4 text-xs font-mono text-red-500 font-bold text-right" data-label="Amount">{{ formatNegative(equity.dividendsPaid) }}</td>
                </tr>
                <tr class="bg-[#2F2E8B]/5">
                  <td class="py-3 px-4 text-xs font-mono font-black text-gray-900 uppercase" data-label="Item">Total Equity</td>
                  <td class="py-3 px-4 text-xs font-mono font-black text-[#2F2E8B] text-right" data-label="Amount">{{ formatWithSymbol(equity.total) }}</td>
                </tr>
              </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- Liabilities Section -->
        <div class="bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div class="p-4 border-b border-gray-100 flex items-center gap-3">
            <div class="w-1.5 h-4 bg-red-500 rounded-none"></div>
            <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight font-outfit">Liabilities</h3>
          </div>
          <div class="p-6">
            <div class="overflow-x-auto">
              <table class="min-w-full responsive-table">
              <thead>
                <tr class="text-left border-b border-gray-100">
                  <th class="pb-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider">Item</th>
                  <th class="pb-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider text-right">Amount</th>
                  <th class="pb-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider text-right">Due Date</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr class="hover:bg-gray-50/50 transition-colors">
                  <td class="py-3 px-4 text-xs font-mono text-gray-700" data-label="Item">Outstanding Loans</td>
                  <td class="py-3 px-4 text-xs font-mono text-gray-900 font-bold text-right" data-label="Amount">{{ formatWithSymbol(liabilities.loans) }}</td>
                  <td class="py-3 px-4 text-xs font-mono text-gray-500 text-right" data-label="Due Date">{{ formatDate(liabilities.loansDueDate) }}</td>
                </tr>
                <tr class="hover:bg-gray-50/50 transition-colors">
                  <td class="py-3 px-4 text-xs font-mono text-gray-700" data-label="Item">Tax Payable</td>
                  <td class="py-3 px-4 text-xs font-mono text-gray-900 font-bold text-right" data-label="Amount">{{ formatWithSymbol(liabilities.taxPayable) }}</td>
                  <td class="py-3 px-4 text-xs font-mono text-gray-500 text-right" data-label="Due Date">{{ formatDate(liabilities.taxDueDate) }}</td>
                </tr>
                <tr class="hover:bg-gray-50/50 transition-colors">
                  <td class="py-3 px-4 text-xs font-mono text-gray-700" data-label="Item">Other Liabilities</td>
                  <td class="py-3 px-4 text-xs font-mono text-gray-900 font-bold text-right" data-label="Amount">{{ formatWithSymbol(liabilities.other) }}</td>
                  <td class="py-3 px-4 text-xs font-mono text-gray-500 text-right" data-label="Due Date">—</td>
                </tr>
                <tr class="bg-red-50/50">
                  <td class="py-3 px-4 text-xs font-mono font-black text-gray-900 uppercase" data-label="Item">Total Liabilities</td>
                  <td class="py-3 px-4 text-xs font-mono font-black text-red-600 text-right" data-label="Amount">{{ formatWithSymbol(liabilities.total) }}</td>
                  <td class="py-3 px-4 text-xs font-mono text-gray-500 text-right" data-label="Due Date">—</td>
                </tr>
              </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- Dividend Distribution Section -->
        <div class="bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div class="p-4 border-b border-gray-100 flex items-center gap-3">
            <div class="w-1.5 h-4 bg-[#2F2E8B] rounded-none"></div>
            <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight font-outfit">Dividend Distribution</h3>
          </div>
          <div class="p-6">
            <div class="overflow-x-auto">
              <table class="min-w-full responsive-table">
              <thead>
                <tr class="text-left border-b border-gray-100">
                  <th class="pb-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider">Period</th>
                  <th class="pb-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider text-right">Amount</th>
                  <th class="pb-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider text-right">Distribution Date</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr v-for="dividend in dividends" :key="dividend.id" class="hover:bg-gray-50/50 transition-colors">
                  <td class="py-3 px-4 text-xs font-mono text-gray-700" data-label="Period">{{ dividend.period }}</td>
                  <td class="py-3 px-4 text-xs font-mono text-gray-900 font-bold text-right" data-label="Amount">{{ formatWithSymbol(dividend.amount) }}</td>
                  <td class="py-3 px-4 text-xs font-mono text-gray-500 text-right" data-label="Distribution Date">{{ formatDate(dividend.distributionDate) }}</td>
                </tr>
              </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- Sales Analysis -->
      <div v-if="currentTab === 'sales'" class="space-y-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          <!-- Sales & Profit Trend Chart -->
          <div class="bg-white border border-gray-100 shadow-sm p-5 w-full">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xs font-black text-gray-900 uppercase tracking-tight font-outfit">Sales & Profit Trend</h3>
              <div class="flex gap-4">
                <div class="flex items-center gap-2">
                  <div class="w-2.5 h-2.5 bg-[#2F2E8B]"></div>
                  <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Sales</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-2.5 h-2.5 bg-indigo-400"></div>
                  <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Profit</span>
                </div>
              </div>
            </div>
            <div class="h-64 bg-gray-50/50  p-4 w-full border border-gray-50">
              <canvas ref="salesProfitChart" class="w-full"></canvas>
            </div>
          </div>

          <!-- Weekly Transactions -->
          <div class="bg-white border border-gray-100 shadow-sm p-5 w-full">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xs font-black text-gray-900 uppercase tracking-tight font-outfit">Weekly Transactions</h3>
              <div class="px-3 py-1 bg-gray-50 text-gray-500 text-[9px] font-mono font-bold uppercase tracking-widest border border-gray-100">
                This Week
              </div>
            </div>
            <div class="h-64 bg-gray-50/50  p-4 w-full border border-gray-50">
              <canvas ref="weeklyTransactionsChart" class="w-full"></canvas>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Payroll summary card -->
          <div class="bg-white border border-gray-100 p-5 shadow-sm relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-[#2F2E8B]"></div>
            <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Payroll (Net)</div>
            <div class="text-xl font-black text-gray-900 font-outfit">{{ formatWithSymbol(payroll.totalPayroll) }}</div>
            <div class="text-[10px] font-mono font-bold text-gray-400 mt-2">Headcount: {{ payroll.headcount }}</div>
          </div>
          <div v-for="metric in salesMetrics" :key="metric.name"
               class="bg-white border border-gray-100 p-5 shadow-sm relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-gray-300"></div>
            <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">{{ metric.name }}</div>
            <div class="text-xl font-black text-gray-900 font-outfit">{{ metric.value }}</div>
          </div>
        </div>
      </div>
      <!-- Balance Sheet -->
      <div v-if="currentTab === 'balance'" class="space-y-8">
        <div class="bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div class="p-4 border-b border-gray-100 flex items-center gap-3">
            <div class="w-1.5 h-4 bg-[#2F2E8B] rounded-none"></div>
            <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight font-outfit">Assets</h3>
          </div>
          <div class="p-6">
            <!-- Table on medium+ screens -->
            <div class="hidden md:block">
              <div class="overflow-x-auto">
                <table class="min-w-full responsive-table">
                  <thead>
                    <tr class="text-left border-b border-gray-100">
                      <th class="pb-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider">Asset</th>
                      <th class="pb-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider text-right">Value</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-50">
                    <tr v-for="asset in balanceSheet.assets" :key="asset.name" class="hover:bg-gray-50/50 transition-colors">
                      <td class="py-3 px-4 text-xs font-mono text-gray-700" data-label="Asset">{{ asset.name }}</td>
                      <td class="py-3 px-4 text-xs font-mono text-gray-900 font-bold text-right" data-label="Value">{{ formatWithSymbol(asset.value) }}</td>
                    </tr>
                    <tr class="bg-[#2F2E8B]/5">
                      <td class="py-3 px-4 text-xs font-mono font-black text-gray-900 uppercase" data-label="Asset">Total Assets</td>
                      <td class="py-3 px-4 text-xs font-mono font-black text-[#2F2E8B] text-right" data-label="Value">{{ formatWithSymbol(balanceSheet.totalAssets) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Stacked cards on small screens -->
            <div class="block md:hidden space-y-4">
              <div v-for="asset in balanceSheet.assets" :key="'card-'+asset.name" class="bg-gray-50 border border-gray-100 p-4">
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Asset</div>
                <div class="text-sm font-bold font-outfit text-gray-800">{{ asset.name }}</div>
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-2">Value</div>
                <div class="text-lg font-black text-[#2F2E8B] font-outfit">{{ formatWithSymbol(asset.value) }}</div>
              </div>
              <div class="bg-[#2F2E8B]/5 border border-gray-100 p-4">
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Total Assets</div>
                <div class="text-lg font-black text-[#2F2E8B] font-outfit">{{ formatWithSymbol(balanceSheet.totalAssets) }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div class="p-4 border-b border-gray-100 flex items-center gap-3">
            <div class="w-1.5 h-4 bg-red-500 rounded-none"></div>
            <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight font-outfit">Liabilities</h3>
          </div>
          <div class="p-6">
            <!-- Table on medium+ screens -->
            <div class="hidden md:block">
              <div class="overflow-x-auto">
                <table class="min-w-full responsive-table">
                  <thead>
                    <tr class="text-left border-b border-gray-100">
                      <th class="pb-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider">Liability</th>
                      <th class="pb-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider text-right">Value</th>
                      <th class="pb-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider text-right">Due Date</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-50">
                    <tr v-for="liability in balanceSheet.liabilities" :key="liability.name" class="hover:bg-gray-50/50 transition-colors">
                      <td class="py-3 px-4 text-xs font-mono text-gray-700" data-label="Liability">{{ liability.name }}</td>
                      <td class="py-3 px-4 text-xs font-mono text-gray-900 font-bold text-right" data-label="Value">{{ formatWithSymbol(liability.value) }}</td>
                      <td class="py-3 px-4 text-xs font-mono text-gray-500 text-right" data-label="Due Date">{{ formatDate(liability.dueDate || liability.loansDueDate || liabilities.loansDueDate) }}</td>
                    </tr>
                    <!-- Payroll payable shown as a short-term liability -->
                    <tr class="hover:bg-gray-50/50 transition-colors">
                      <td class="py-3 px-4 text-xs font-mono text-gray-700" data-label="Liability">Payroll Payable</td>
                      <td class="py-3 px-4 text-xs font-mono text-gray-900 font-bold text-right" data-label="Value">{{ formatWithSymbol(payroll.totalPayroll) }}</td>
                      <td class="py-3 px-4 text-xs font-mono text-gray-500 text-right" data-label="Due Date">—</td>
                    </tr>
                    <tr class="bg-red-50/50">
                      <td class="py-3 px-4 text-xs font-mono font-black text-gray-900 uppercase" data-label="Liability">Total Liabilities</td>
                      <td class="py-3 px-4 text-xs font-mono font-black text-red-600 text-right" data-label="Value">{{ formatWithSymbol(balanceSheet.totalLiabilities + payroll.totalPayroll) }}</td>
                      <td class="py-3 px-4 text-xs font-mono text-gray-500 text-right" data-label="Due Date">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Stacked cards on small screens -->
            <div class="block md:hidden space-y-4">
              <div v-for="liability in balanceSheet.liabilities" :key="'liab-'+liability.name" class="bg-gray-50 border border-gray-100 p-4">
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Liability</div>
                <div class="text-sm font-bold font-outfit text-gray-800">{{ liability.name }}</div>
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-2">Amount</div>
                <div class="text-lg font-black text-[#2F2E8B] font-outfit">{{ formatWithSymbol(liability.value) }}</div>
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-1">Due Date</div>
                <div class="text-xs font-mono text-gray-500">{{ formatDate(liability.dueDate || liability.loansDueDate || liabilities.loansDueDate) }}</div>
              </div>
              <div class="bg-[#2F2E8B]/5 border border-gray-100 p-4">
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Total Liabilities</div>
                <div class="text-lg font-black text-[#2F2E8B] font-outfit">{{ formatWithSymbol(balanceSheet.totalLiabilities) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Inventory Report + Delivery Note Analysis side-by-side on md+ -->
      <div v-if="currentTab === 'inventory'" class="space-y-8">
        <div class="md:flex md:space-x-6">
          <!-- Inventory card (flex-1) -->
          <div class="flex-1 bg-white border border-gray-100 shadow-sm overflow-hidden mb-4 md:mb-0">
            <div class="p-4 border-b border-gray-100 flex items-center gap-3">
              <div class="w-1.5 h-4 bg-amber-500 rounded-none"></div>
              <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight font-outfit">Inventory Report</h3>
            </div>
            <div class="p-6">
              <div class="overflow-x-auto">
                <table class="min-w-full responsive-table">
                  <thead>
                    <tr class="text-left border-b border-gray-100">
                      <th class="pb-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider">Item</th>
                      <th class="pb-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider text-right">Quantity</th>
                      <th class="pb-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider text-right">Value</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-50">
                    <tr v-for="item in inventoryItemsList" :key="item.name" class="hover:bg-gray-50/50 transition-colors">
                      <td class="py-3 px-4 text-xs font-mono text-gray-700" data-label="Item">{{ item.name }}</td>
                      <td class="py-3 px-4 text-xs font-mono text-gray-900 font-bold text-right" data-label="Quantity">{{ item.quantity }}</td>
                      <td class="py-3 px-4 text-xs font-mono text-gray-900 font-bold text-right" data-label="Value">{{ formatWithSymbol(item.value) }}</td>
                    </tr>
                    <tr class="bg-amber-50/50">
                      <td class="py-3 px-4 text-xs font-mono font-black text-gray-900 uppercase" data-label="Item">Total</td>
                      <td class="py-3 px-4 text-xs font-mono font-black text-gray-900 text-right" data-label="Quantity">{{ inventoryItems }}</td>
                      <td class="py-3 px-4 text-xs font-mono font-black text-[#2F2E8B] text-right" data-label="Value">{{ formatWithSymbol(inventoryValue) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- (Delivery Note Analysis moved to its own tab/section) -->
        </div>
      </div>
    </div>

    <!-- Financial Reports Modal -->
    <div v-if="showFinancialReportsModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" style="z-index: 10000;">
      <div class="bg-white shadow-sm w-full max-w-5xl max-h-[90vh] flex flex-col border border-gray-100">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-5 border-b border-gray-100 flex-shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-1.5 h-5 bg-[#2F2E8B]"></div>
            <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight font-outfit">Financial Reports</h3>
          </div>
          <button @click="closeFinancialReportsModal" 
                  class="text-gray-400 hover:text-gray-600 transition">
            <i class="fas fa-times text-lg"></i>
          </button>
        </div>

        <!-- Modal Body - Scrollable -->
        <div class="flex-1 overflow-y-auto p-6">
          <!-- Step 1: Report Type Selection -->
          <div v-if="financialReportStep === 1" class="space-y-6">
            <div>
              <h4 class="text-sm font-black text-gray-900 uppercase tracking-tight font-outfit mb-4">Select Report Type</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <!-- Cash Flow Statement -->
                <div 
                  @click="selectFinancialReportType('cashflow')"
                  :class="[
                    'border p-5 cursor-pointer transition-all',
                    selectedFinancialReportType === 'cashflow' 
                      ? 'border-[#2F2E8B] bg-gray-50' 
                      : 'border-gray-100 hover:border-[#2F2E8B]'
                  ]"
                >
                  <div class="flex items-center justify-center mb-3">
                    <i class="fas fa-money-bill-wave text-2xl text-[#2F2E8B]"></i>
                  </div>
                  <h5 class="text-center text-[10px] font-mono font-bold text-gray-800 uppercase tracking-wider mb-1">Cash Flow Statement</h5>
                  <p class="text-[9px] font-mono text-gray-400 text-center">Track cash inflows and outflows from operating, investing, and financing activities</p>
                </div>

                <!-- Balance Sheet -->
                <div 
                  @click="selectFinancialReportType('balance')"
                  :class="[
                    'border p-5 cursor-pointer transition-all',
                    selectedFinancialReportType === 'balance' 
                      ? 'border-[#2F2E8B] bg-gray-50' 
                      : 'border-gray-100 hover:border-[#2F2E8B]'
                  ]"
                >
                  <div class="flex items-center justify-center mb-3">
                    <i class="fas fa-balance-scale text-2xl text-[#059669]"></i>
                  </div>
                  <h5 class="text-center text-[10px] font-mono font-bold text-gray-800 uppercase tracking-wider mb-1">Balance Sheet</h5>
                  <p class="text-[9px] font-mono text-gray-400 text-center">View assets, liabilities, and equity at a specific point in time</p>
                </div>

                <!-- Profit & Loss Statement -->
                <div 
                  @click="selectFinancialReportType('profitloss')"
                  :class="[
                    'border p-5 cursor-pointer transition-all',
                    selectedFinancialReportType === 'profitloss' 
                      ? 'border-[#2F2E8B] bg-gray-50' 
                      : 'border-gray-100 hover:border-[#2F2E8B]'
                  ]"
                >
                  <div class="flex items-center justify-center mb-3">
                    <i class="fas fa-chart-line text-2xl text-[#DC2626]"></i>
                  </div>
                  <h5 class="text-center text-[10px] font-mono font-bold text-gray-800 uppercase tracking-wider mb-1">Profit & Loss Statement</h5>
                  <p class="text-[9px] font-mono text-gray-400 text-center">Analyze revenues, costs, and expenses over a period</p>
                </div>

                <!-- Statement of Changes in Equity -->
                <div 
                  @click="selectFinancialReportType('equity')"
                  :class="[
                    'border p-5 cursor-pointer transition-all',
                    selectedFinancialReportType === 'equity' 
                      ? 'border-[#2F2E8B] bg-gray-50' 
                      : 'border-gray-100 hover:border-[#2F2E8B]'
                  ]"
                >
                  <div class="flex items-center justify-center mb-3">
                    <i class="fas fa-exchange-alt text-2xl text-[#F59E0B]"></i>
                  </div>
                  <h5 class="text-center text-[10px] font-mono font-bold text-gray-800 uppercase tracking-wider mb-1">Changes in Equity</h5>
                  <p class="text-[9px] font-mono text-gray-400 text-center">Track how owners' equity changed over time</p>
                </div>
              </div>
            </div>

            <!-- Date Range Selection -->
            <div v-if="selectedFinancialReportType" class="bg-gray-50  p-6">
              <h4 class="text-sm font-black text-gray-900 uppercase tracking-tight font-outfit mb-4">Select Date Range</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider mb-2">Start Date</label>
                  <input 
                    type="date" 
                    v-model="financialReportData.startDate"
                    class="w-full  border-gray-200 shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]"
                  />
                </div>
                <div>
                  <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider mb-2">End Date</label>
                  <input 
                    type="date" 
                    v-model="financialReportData.endDate"
                    class="w-full  border-gray-200 shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Step 2: Customize Line Items -->
          <div v-if="financialReportStep === 2" class="space-y-6">
            <div class="flex items-center justify-between mb-4">
              <h4 class="text-sm font-black text-gray-900 uppercase tracking-tight font-outfit">Customize {{ getReportTypeName() }}</h4>
              <button 
                @click="loadIndustryTemplate"
                class="text-[#2F2E8B] hover:text-[#3D2F88] font-mono text-xs font-bold flex items-center gap-2 uppercase tracking-wide"
              >
                <i class="fas fa-magic"></i> Load Industry Template
              </button>
            </div>

            <!-- Industry Template Selector -->
            <div v-if="showIndustryTemplates" class="bg-gray-50  p-4 mb-4">
              <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider mb-2">Select Industry Template</label>
              <select 
                v-model="selectedIndustryTemplate"
                @change="applyIndustryTemplate"
                class="w-full  border-gray-200 shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]"
              >
                <option value="">Custom (Blank)</option>
                <option value="retail">Retail Business</option>
                <option value="service">Service Provider</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="restaurant">Restaurant/Food Service</option>
                <option value="tech">Technology/SaaS</option>
                <option value="construction">Construction</option>
                <option value="healthcare">Healthcare</option>
              </select>
            </div>

            <!-- Tax Configuration (for P&L) -->
            <div v-if="selectedFinancialReportType === 'profitloss'" class="bg-gray-50  p-6">
              <h4 class="text-sm font-black text-gray-900 uppercase tracking-tight font-outfit mb-4">Tax Configuration</h4>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <!-- VAT Rate -->
                <div>
                  <label class="flex items-center gap-2 text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider mb-2">
                    <input 
                      type="checkbox" 
                      v-model="financialReportData.taxSettings.enableVAT"
                      class="rounded border-gray-200"
                    />
                    Enable VAT
                  </label>
                  <div v-if="financialReportData.taxSettings.enableVAT" class="flex items-center gap-2">
                    <input 
                      type="number" 
                      v-model.number="financialReportData.taxSettings.vatRate"
                      min="0"
                      max="100"
                      step="0.1"
                      class="w-20  border-gray-200 shadow-sm focus:border-[#2F2E8B] text-sm"
                    />
                    <span class="text-sm text-gray-400">% (Default: 16%)</span>
                  </div>
                </div>

                <!-- Turnover Tax -->
                <div>
                  <label class="flex items-center gap-2 text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider mb-2">
                    <input 
                      type="checkbox" 
                      v-model="financialReportData.taxSettings.enableTurnover"
                      class="rounded border-gray-200"
                    />
                    Enable Turnover Tax
                  </label>
                  <div v-if="financialReportData.taxSettings.enableTurnover" class="space-y-1">
                    <div class="flex items-center gap-2">
                      <input 
                        type="number" 
                        v-model.number="financialReportData.taxSettings.turnoverRate"
                        min="0"
                        max="100"
                        step="0.1"
                        class="w-20  border-gray-200 shadow-sm focus:border-[#2F2E8B] text-sm"
                      />
                      <span class="text-sm text-gray-400">%</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="text-xs text-gray-400">Threshold:</span>
                      <input 
                        type="number" 
                        v-model.number="financialReportData.taxSettings.turnoverThreshold"
                        min="0"
                        step="100"
                        class="w-28  border-gray-200 shadow-sm focus:border-[#2F2E8B] text-sm"
                      />
                    </div>
                    <p class="text-xs text-gray-400">5% for sales above 12,000</p>
                  </div>
                </div>

                <!-- Income Tax -->
                <div>
                  <label class="flex items-center gap-2 text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider mb-2">
                    <input 
                      type="checkbox" 
                      v-model="financialReportData.taxSettings.enableIncomeTax"
                      class="rounded border-gray-200"
                    />
                    Enable Income Tax
                  </label>
                  <div v-if="financialReportData.taxSettings.enableIncomeTax" class="flex items-center gap-2">
                    <input 
                      type="number" 
                      v-model.number="financialReportData.taxSettings.incomeTaxRate"
                      min="0"
                      max="100"
                      step="0.1"
                      class="w-20  border-gray-200 shadow-sm focus:border-[#2F2E8B] text-sm"
                    />
                    <span class="text-sm text-gray-400">% (Default: 35%)</span>
                  </div>
                </div>
              </div>

              <div class="bg-blue-50 border border-blue-200  p-3 text-sm text-blue-800">
                <i class="fas fa-info-circle mr-2"></i>
                <strong>Tax Calculation:</strong> Taxes will be automatically calculated and added to your report based on revenue and profit figures.
              </div>
            </div>

            <!-- Line Items Editor -->
            <div class="bg-white border-2 border-gray-200  overflow-hidden">
              <div class="bg-gray-50 px-6 py-3 border-b border-gray-200">
                <div class="grid grid-cols-12 gap-4 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                  <div class="col-span-5">Line Item</div>
                  <div class="col-span-3">Category</div>
                  <div class="col-span-3">Amount</div>
                  <div class="col-span-1 text-center">Actions</div>
                </div>
              </div>
              
              <div class="max-h-96 overflow-y-auto">
                <div 
                  v-for="(item, index) in financialReportData.lineItems" 
                  :key="index"
                  class="px-6 py-4 border-b border-gray-200 hover:bg-gray-50"
                >
                  <div class="grid grid-cols-12 gap-4 items-center">
                    <div class="col-span-5">
                      <input 
                        type="text" 
                        v-model="item.name"
                        placeholder="e.g., Sales Revenue"
                        class="w-full  border-gray-200 shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] text-sm"
                      />
                    </div>
                    <div class="col-span-3">
                      <select 
                        v-model="item.category"
                        class="w-full  border-gray-200 shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] text-sm"
                      >
                        <option v-for="cat in getAvailableCategories()" :key="cat" :value="cat">{{ cat }}</option>
                      </select>
                    </div>
                    <div class="col-span-3">
                      <input 
                        type="number" 
                        v-model.number="item.amount"
                        placeholder="0.00"
                        step="0.01"
                        class="w-full  border-gray-200 shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] text-sm"
                      />
                    </div>
                    <div class="col-span-1 text-center">
                      <button 
                        @click="removeLineItem(index)"
                        class="text-[#DC2626] hover:text-[#B91C1C] transition"
                        title="Remove"
                      >
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <button 
                  @click="addLineItem"
                  class="text-[#2F2E8B] hover:text-[#1F1E6B] font-mono text-xs font-bold flex items-center gap-2 uppercase tracking-wide"
                >
                  <i class="fas fa-plus-circle"></i> Add Line Item
                </button>
              </div>
            </div>

            <!-- Calculated Totals Preview -->
            <div class="bg-gray-50 border border-gray-100 p-6">
              <h5 class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-4">Preview Totals</h5>
              <div class="space-y-2">
                <div v-for="total in calculateReportTotals()" :key="total.label" class="flex justify-between">
                  <span :class="total.bold ? 'font-bold' : 'text-gray-400'">{{ total.label }}</span>
                  <span :class="[total.bold ? 'font-bold text-lg' : '', total.color || '']">
                    {{ formatCurrency(total.amount) }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3: Review & Download -->
          <div v-if="financialReportStep === 3" class="space-y-6">
            <div class="text-center mb-6">
              <i class="fas fa-check-circle text-5xl text-[#059669] mb-4"></i>
              <h4 class="text-sm font-black text-gray-900 uppercase tracking-tight font-outfit mb-2">Report Preview</h4>
              <p class="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Review your report before downloading</p>
            </div>

            <!-- Report Preview -->
            <div class="bg-white border-2 border-gray-200 p-8 max-h-[500px] overflow-y-auto">
              <div class="text-center mb-6">
                <h3 class="text-lg font-black text-gray-900 uppercase tracking-tight font-outfit mb-2">{{ getReportTypeName() }}</h3>
                <p class="text-xs font-mono text-gray-400">{{ financialReportData.companyName || tenantDetails?.companyName || 'Company Name' }}</p>
                <p class="text-[10px] font-mono text-gray-400">
                  Period: {{ formatDate(financialReportData.startDate) }} to {{ formatDate(financialReportData.endDate) }}
                </p>
              </div>

              <!-- Report Content -->
              <div v-if="selectedFinancialReportType === 'cashflow'" class="space-y-6">
                <div v-for="section in groupLineItemsByCategory()" :key="section.category">
                  <h5 class="text-xs font-black text-gray-900 uppercase tracking-tight font-outfit mb-3 pb-2 border-b border-gray-200">
                    {{ section.category }}
                  </h5>
                  <div class="space-y-2 ml-4">
                    <div v-for="item in section.items" :key="item.name" class="flex justify-between text-sm">
                      <span class="text-gray-500">{{ item.name }}</span>
                      <span class="font-mono font-bold">{{ formatCurrency(item.amount) }}</span>
                    </div>
                    <div class="flex justify-between text-xs font-black text-gray-900 uppercase pt-2 border-t border-gray-200 font-mono">
                      <span>{{ section.category }} Total</span>
                      <span>{{ formatCurrency(section.total) }}</span>
                    </div>
                  </div>
                </div>

                <div class="bg-gray-50  p-4 mt-6">
                  <div class="flex justify-between text-xs font-black text-gray-900 uppercase tracking-tight font-outfit">
                    <span>Net Cash Flow</span>
                    <span :class="calculateNetTotal() >= 0 ? 'text-[#059669]' : 'text-[#DC2626]'">
                      {{ formatCurrency(calculateNetTotal()) }}
                    </span>
                  </div>
                </div>
              </div>

              <div v-else-if="selectedFinancialReportType === 'balance'" class="space-y-6">
                <div v-for="section in groupLineItemsByCategory()" :key="section.category">
                  <h5 class="text-xs font-black text-gray-900 uppercase tracking-tight font-outfit mb-3 pb-2 border-b border-gray-200">
                    {{ section.category }}
                  </h5>
                  <div class="space-y-2 ml-4">
                    <div v-for="item in section.items" :key="item.name" class="flex justify-between text-sm">
                      <span class="text-gray-500">{{ item.name }}</span>
                      <span class="font-mono font-bold">{{ formatCurrency(item.amount) }}</span>
                    </div>
                    <div class="flex justify-between text-xs font-black text-gray-900 uppercase pt-2 border-t border-gray-200 font-mono">
                      <span>Total {{ section.category }}</span>
                      <span>{{ formatCurrency(section.total) }}</span>
                    </div>
                  </div>
                </div>

                <div class="bg-gray-50  p-4 mt-6">
                  <div v-for="(total, index) in calculateReportTotals()" :key="index" :class="[
                    'flex justify-between py-1',
                    total.bold ? 'font-bold text-gray-800' : 'text-gray-400',
                    total.label.includes('TOTAL ASSETS') || total.label.includes('TOTAL LIABILITIES + EQUITY') ? 'text-lg pt-3 border-t-2 border-[#1F2937]' : '',
                    total.label === '' ? 'h-2' : ''
                  ]">
                    <span>{{ total.label }}</span>
                    <span :class="total.color || ''">{{ total.label ? formatCurrency(total.amount) : '' }}</span>
                  </div>
                </div>
              </div>

              <div v-else-if="selectedFinancialReportType === 'profitloss'" class="space-y-6">
                <div v-for="section in groupLineItemsByCategory()" :key="section.category">
                  <h5 class="text-xs font-black text-gray-900 uppercase tracking-tight font-outfit mb-3 pb-2 border-b border-gray-200">
                    {{ section.category }}
                  </h5>
                  <div class="space-y-2 ml-4">
                    <div v-for="item in section.items" :key="item.name" class="flex justify-between text-sm">
                      <span class="text-gray-500">{{ item.name }}</span>
                      <span class="font-mono font-bold">{{ formatCurrency(item.amount) }}</span>
                    </div>
                    <div class="flex justify-between text-xs font-black text-gray-900 uppercase pt-2 border-t border-gray-200 font-mono">
                      <span>Total {{ section.category }}</span>
                      <span>{{ formatCurrency(section.total) }}</span>
                    </div>
                  </div>
                </div>

                <!-- Comprehensive Totals with Taxes -->
                <div class="bg-gray-50  p-4 mt-6">
                  <div v-for="(total, index) in calculateReportTotals()" :key="index" :class="[
                    'flex justify-between py-1',
                    total.bold ? 'font-bold text-gray-800' : 'text-gray-400',
                    total.label.includes('NET INCOME') ? 'text-lg pt-3 border-t-2 border-[#1F2937]' : '',
                    total.label === '' ? 'h-2' : ''
                  ]">
                    <span>{{ total.label }}</span>
                    <span :class="total.color || ''">{{ total.label ? formatCurrency(total.amount) : '' }}</span>
                  </div>
                </div>
              </div>

              <!-- Equity Statement Preview -->
              <div v-else-if="selectedFinancialReportType === 'equity'" class="space-y-6">
                <div v-for="section in groupLineItemsByCategory()" :key="section.category">
                  <h5 class="text-xs font-black text-gray-900 uppercase tracking-tight font-outfit mb-3 pb-2 border-b border-gray-200">
                    {{ section.category }}
                  </h5>
                  <div class="space-y-2 ml-4">
                    <div v-for="item in section.items" :key="item.name" class="flex justify-between text-sm">
                      <span class="text-gray-500">{{ item.name }}</span>
                      <span class="font-mono font-bold">{{ formatCurrency(item.amount) }}</span>
                    </div>
                  </div>
                </div>

                <div class="bg-gray-50  p-4 mt-6">
                  <div v-for="(total, index) in calculateReportTotals()" :key="index" :class="[
                    'flex justify-between',
                    total.bold ? 'font-bold text-gray-800' : 'text-gray-400',
                    index === 0 ? '' : 'mt-2'
                  ]">
                    <span>{{ total.label }}</span>
                    <span :class="total.color || ''">{{ total.label ? formatCurrency(total.amount) : '' }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Edit Button -->
            <div class="flex justify-center">
              <button 
                @click="financialReportStep = 2"
                class="text-[#2F2E8B] hover:text-[#1F1E6B] font-mono text-xs font-bold flex items-center gap-2 uppercase tracking-wide"
              >
                <i class="fas fa-edit"></i> Edit Report
              </button>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="border-t border-gray-100 p-6 flex items-center justify-between flex-shrink-0">
          <button 
            v-if="financialReportStep > 1"
            @click="financialReportStep--"
            class="px-6 py-2 border border-gray-200 text-gray-500 hover:bg-gray-50 transition font-mono text-sm"
          >
            <i class="fas fa-arrow-left mr-2"></i> Back
          </button>
          <div v-else></div>

          <div class="flex items-center gap-3">
            <button 
              v-if="financialReportStep === 3"
              @click="downloadFinancialReport('docx')"
              class="px-6 py-2 bg-[#2B579A] text-white hover:bg-[#1e3a6d] transition flex items-center gap-2 font-mono text-sm"
            >
              <i class="fas fa-file-word"></i> Download Word
            </button>
            <button 
              v-if="financialReportStep === 3"
              @click="downloadFinancialReport('excel')"
              class="px-6 py-2 bg-[#059669] text-white hover:bg-[#047857] transition flex items-center gap-2 font-mono text-sm"
            >
              <i class="fas fa-file-excel"></i> Download Excel
            </button>
            <button 
              v-if="financialReportStep < 3"
              @click="nextFinancialReportStep"
              :disabled="!canProceedToNextStep()"
              class="px-6 py-2 bg-[#2F2E8B] text-white hover:bg-[#1F1E6B] transition disabled:opacity-50 disabled:cursor-not-allowed font-mono text-sm"
            >
              {{ financialReportStep === 2 ? 'Preview' : 'Next' }} <i class="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- New Report Modal -->
    <div v-if="showReportModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" style="z-index: 10000;">
      <div class="bg-white shadow-sm max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-gray-100">
        <div class="flex items-center justify-between p-5 border-b border-gray-100 shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-1.5 h-5 bg-[#2F2E8B]"></div>
            <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight font-outfit">Generate New Report</h3>
          </div>
          <button @click="showReportModal = false" 
                  class="text-gray-400 hover:text-gray-600 transition">
            <i class="fas fa-times text-lg"></i>
          </button>
        </div>

        <div class="p-6 space-y-6 overflow-y-auto flex-grow custom-scrollbar">
          <div class="flex items-center gap-4 mb-2" v-if="newReport.logo">
             <div class="w-16 h-16  border border-gray-100 flex items-center justify-center overflow-hidden bg-gray-50">
                <img :src="newReport.logo" alt="Logo" class="w-full h-full object-contain" />
             </div>
             <div>
                <p class="text-xs text-gray-400">Company Logo detected</p>
                <p class="text-xs font-mono text-gray-500">Will be featured on report header</p>
             </div>
          </div>
          <div class="space-y-2">
            <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">Report Type</label>
            <select v-model="newReport.type" 
                    class="w-full  border-gray-100 shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]">
              <option value="financial">Financial Statement</option>
              <option value="income">Income Statement</option>
              <option value="sales">Sales Report</option>
              <option value="balance">Balance Sheet</option>
              <option value="inventory">Inventory Report</option>
              <option value="hotel">Hotel Report</option>
              <option value="full">Full Report (All)</option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">Company Name</label>
            <input v-model="newReport.companyName" 
                   type="text" 
                   placeholder="Enter company name"
                   class="w-full  border-gray-100 shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]">
          </div>
          <div class="space-y-2">
            <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">Company Address</label>
            <textarea v-model="newReport.companyAddress" 
                      placeholder="Enter company address"
                      class="w-full  border-gray-100 shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]"></textarea>
          </div>
          <div class="space-y-2">
            <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">Report Title</label>
            <input v-model="newReport.reportTitle" 
                   type="text" 
                   placeholder="Enter report title"
                   class="w-full  border-gray-100 shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]">
          </div>
          <div class="space-y-2">
            <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">Date Range</label>
            <div class="grid grid-cols-1 gap-3">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <select v-model="rangePreset" class="w-full  border-gray-100 shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]">
                  <option value="daily">Daily (Today)</option>
                  <option value="weekly">Weekly (This Week)</option>
                  <option value="monthly">Monthly (This Month)</option>
                  <option value="quarterly">Quarterly (This Quarter)</option>
                  <option value="yearly">Yearly (This Year)</option>
                  <option value="custom">Custom Range</option>
                </select>
                <div class="flex gap-1">
                  <input type="date" v-model="newReport.startDate" 
                         class="flex-1  border-gray-100 shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]"
                         :disabled="rangePreset !== 'custom'">
                  <input type="time" v-model="newReport.startTime" 
                         class="w-[90px]  border-gray-100 shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]"
                         :disabled="rangePreset !== 'custom'">
                </div>
                <div class="flex gap-1">
                  <input type="date" v-model="newReport.endDate" 
                         class="flex-1  border-gray-100 shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]"
                         :disabled="rangePreset !== 'custom'">
                  <input type="time" v-model="newReport.endTime" 
                         class="w-[90px]  border-gray-100 shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]"
                         :disabled="rangePreset !== 'custom'">
                </div>
              </div>
              <p class="text-xs text-gray-400">Choose a preset or switch to Custom Range to select specific dates and times.</p>
            </div>
          </div>
        </div>

        <div class="p-5 border-t border-gray-100 shrink-0 bg-gray-50/50">
          <div class="flex justify-between items-center gap-3 flex-wrap">
            <div class="text-[9px] font-mono text-gray-400 max-w-xs uppercase tracking-wider">Review your report details before downloading. Mathematical formulas render via MathJax.</div>
            <div class="flex gap-2 ml-auto">
              <button @click="openPreview()" 
                      :disabled="loading || !newReport.startDate || !newReport.endDate || !newReport.companyName || !newReport.reportTitle"
                      class="px-5 py-2 bg-gray-100 text-gray-600 font-mono text-sm hover:bg-gray-200 transition disabled:opacity-50">
                <i class="fas fa-eye mr-2"></i> Preview
              </button>
              <button @click="downloadPdfClient" 
                      :disabled="loading || !newReport.startDate || !newReport.endDate || !newReport.companyName || !newReport.reportTitle"
                      class="bg-[#2F2E8B] text-white font-mono text-sm px-6 py-2 
                             disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1F1E6B] transition">
                <i class="fas fa-file-pdf mr-2"></i> Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Report Preview Modal -->
    <div v-if="showPreview" class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" style="z-index: 10001;">
      <div class="bg-white shadow-sm max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-gray-100">
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
          <div>
            <div class="flex items-center gap-3">
              <div class="w-1.5 h-5 bg-[#2F2E8B]"></div>
              <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight font-outfit">Professional Report Preview</h3>
            </div>
            <p class="text-[9px] font-mono text-gray-400 mt-1 ml-5 uppercase tracking-wider">Verified analytical output for {{ newReport.companyName }}</p>
          </div>
          <button @click="showPreview = false" class="text-gray-400 hover:text-gray-600 transition p-2">
            <i class="fas fa-times text-lg"></i>
          </button>
        </div>
        <div class="p-8 overflow-y-auto flex-grow bg-gray-50/30">
          <div class="bg-white p-10 shadow-sm border border-gray-100 max-w-4xl mx-auto">
            <div ref="previewContainer" v-html="previewHtml"></div>
          </div>
        </div>
        <div class="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-white">
          <div class="hidden md:flex items-center gap-4 text-[9px] font-mono text-gray-400 uppercase tracking-wider">
            <span><i class="fas fa-shield-alt mr-1"></i> Secure Generation</span>
            <span><i class="fas fa-calculator mr-1"></i> MathJax Active</span>
          </div>
          <div class="flex gap-2 ml-auto">
            <button @click="downloadHtmlPreview" class="px-5 py-2 bg-gray-100 text-gray-600 font-mono text-sm hover:bg-gray-200 transition flex items-center gap-2">
               <i class="fas fa-code"></i> HTML
            </button>
            <button @click="downloadDocx" class="px-5 py-2 bg-gray-100 text-gray-600 font-mono text-sm hover:bg-gray-200 transition flex items-center gap-2">
               <i class="fas fa-file-word text-blue-600"></i> DOCX
            </button>
            <button @click="downloadPdfClient" class="px-6 py-2 bg-[#2F2E8B] text-white font-mono text-sm hover:bg-[#1F1E6B] transition flex items-center gap-2">
               <i class="fas fa-file-pdf"></i> Download Official PDF
            </button>
          </div>
        </div>
      </div>
    </div>
      <!-- Delivery Notes main section (own tab) -->
      <div v-if="currentTab === 'delivery'" class="space-y-8 relative z-10">
        <div class="bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div class="p-4 border-b border-gray-100 flex items-center gap-3">
            <div class="w-1.5 h-4 bg-[#2F2E8B] rounded-none"></div>
            <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight font-outfit">Delivery Note Analysis</h3>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div class="bg-white border border-gray-100 p-5 shadow-sm relative overflow-hidden">
                <div class="absolute top-0 left-0 w-1 h-full bg-[#2F2E8B]"></div>
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Total Tickets</div>
                <div class="text-xl font-black text-gray-900 font-outfit">{{ deliverySummary.totalTickets }}</div>
              </div>
              <div class="bg-white border border-gray-100 p-5 shadow-sm relative overflow-hidden">
                <div class="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Total Quantity</div>
                <div class="text-xl font-black text-gray-900 font-outfit">{{ deliverySummary.totalQuantity }}</div>
              </div>
              <div class="bg-white border border-gray-100 p-5 shadow-sm relative overflow-hidden">
                <div class="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Net Sales</div>
                <div class="text-xl font-black text-gray-900 font-outfit">{{ formatWithSymbol(deliverySummary.netSales || 0) }}</div>
              </div>
              <div class="bg-white border border-gray-100 p-5 shadow-sm relative overflow-hidden">
                <div class="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Stock Count Loss</div>
                <div class="text-xl font-black text-red-600 font-outfit">{{ formatWithSymbol(deliverySummary.varianceLoss || 0) }}</div>
              </div>
            </div>

            <div class="mt-6 overflow-x-auto">
              <!-- Filters -->
              <!-- Enhanced Filters -->
              <div class="mb-8 bg-gray-50  p-5 border border-gray-100 shadow-sm">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-xs font-black text-gray-900 uppercase tracking-tight font-outfit flex items-center gap-2">
                    <i class="fas fa-filter text-[#2F2E8B]"></i> Filter Delivery Notes
                  </h3>
                  <button @click="clearDeliveryFilters" class="text-xs text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1">
                    <i class="fas fa-times-circle"></i> Clear Filters
                  </button>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div class="space-y-1">
                    <label class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Status</label>
                    <div class="relative">
                      <select v-model="deliveryFilter.status" class="w-full pl-3 pr-8 py-2 bg-white border border-gray-200  text-sm focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent outline-none appearance-none cursor-pointer">
                        <option value="">All Statuses</option>
                        <option v-for="s in deliveryStatusOptions" :key="s" :value="s">{{ s }}</option>
                      </select>
                      <i class="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none"></i>
                    </div>
                  </div>

                  <div class="space-y-1">
                    <label class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Technician</label>
                    <div class="relative">
                      <select v-model="deliveryFilter.technician" class="w-full pl-3 pr-8 py-2 bg-white border border-gray-200  text-sm focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent outline-none appearance-none cursor-pointer">
                        <option value="">All Technicians</option>
                        <option v-for="t in deliveryTechnicianOptions" :key="t" :value="t">{{ t }}</option>
                      </select>
                      <i class="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none"></i>
                    </div>
                  </div>

                  <div class="space-y-1">
                    <label class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Address</label>
                    <div class="relative">
                      <select v-model="deliveryFilter.deliveryAddress" class="w-full pl-3 pr-8 py-2 bg-white border border-gray-200  text-sm focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent outline-none appearance-none cursor-pointer">
                        <option value="">All Locations</option>
                        <option v-for="a in deliveryAddressOptions" :key="a.address" :value="a.address">{{ a.address }} ({{ a.count }})</option>
                      </select>
                      <i class="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none"></i>
                    </div>
                  </div>

                  <div class="space-y-1">
                    <label class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Date Range</label>
                    <div class="flex items-center gap-2">
                       <input type="date" v-model="deliveryFilter.startDate" class="w-full px-3 py-2 bg-white border border-gray-200  text-sm focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent outline-none" placeholder="Start" />
                    </div>
                  </div>
                  
                  <div class="space-y-1">
                    <label class="text-xs font-semibold text-gray-500 uppercase tracking-wide opacity-0">Action</label>
                    <div class="flex items-center gap-2">
                       <input type="date" v-model="deliveryFilter.endDate" class="w-full px-3 py-2 bg-white border border-gray-200  text-sm focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent outline-none" placeholder="End" />
                       <button @click="applyDeliveryFilters" class="px-4 py-2 bg-[#2F2E8B] text-white font-mono text-xs hover:bg-[#1e1d6b] transition-colors shadow-sm">
                         Apply
                       </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Stock status quick counts -->
              <div class="mb-6 flex flex-wrap gap-4 items-center bg-white p-4 border border-gray-100 shadow-sm">
                <div class="flex items-center gap-3 px-4 py-2 bg-orange-50 border border-orange-100">
                  <div class="p-2 bg-orange-100 text-orange-600">
                    <i class="fas fa-exclamation-triangle"></i>
                  </div>
                  <div>
                    <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Low Stock</div>
                    <div class="text-lg font-black text-gray-900 font-outfit">{{ persistedInventorySummary.lowStockCount != null ? persistedInventorySummary.lowStockCount : (deliverySummary.lowStock || []).length }}</div>
                  </div>
                </div>

                <div class="flex items-center gap-3 px-4 py-2 bg-red-50 border border-red-100">
                  <div class="p-2 bg-red-100 text-red-600">
                    <i class="fas fa-skull-crossbones"></i>
                  </div>
                  <div>
                    <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Critical</div>
                    <div class="text-lg font-black text-gray-900 font-outfit">{{ persistedInventorySummary.criticalStockCount != null ? persistedInventorySummary.criticalStockCount : (deliverySummary.criticalStock || []).length }}</div>
                  </div>
                </div>

                <div class="flex items-center gap-3 px-4 py-2 bg-gray-50 border border-gray-200">
                  <div class="p-2 bg-gray-200 text-gray-600">
                    <i class="fas fa-box-open"></i>
                  </div>
                  <div>
                    <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Empty</div>
                    <div class="text-lg font-black text-gray-900 font-outfit">{{ persistedInventorySummary.emptyStockCount != null ? persistedInventorySummary.emptyStockCount : (deliverySummary.emptyStock || []).length }}</div>
                  </div>
                </div>
                
                <button @click="showLowStockDetails = !showLowStockDetails" class="ml-auto px-4 py-2 font-mono text-xs text-[#2F2E8B] bg-indigo-50 hover:bg-indigo-100 transition-colors border border-indigo-100 flex items-center gap-2">
                  <i :class="showLowStockDetails ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  {{ showLowStockDetails ? 'Hide Details' : 'View Details' }}
                </button>
              </div>

              <div v-if="showLowStockDetails" class="mb-8 animate-fadeIn">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <!-- Low Stock Section -->
                  <div class="bg-white  shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[400px]">
                    <div class="bg-white px-4 py-3 border-b border-gray-100 flex justify-between items-center shrink-0">
                      <h4 class="text-[10px] font-mono font-bold text-orange-600 flex items-center gap-2 uppercase tracking-wider">
                        <i class="fas fa-exclamation-triangle"></i> Low Stock
                      </h4>
                      <button @click="downloadStockReportExcel('low')" class="text-orange-600 hover:text-orange-800 p-1.5  transition-colors" title="Download Excel">
                        <i class="fas fa-file-excel"></i>
                      </button>
                    </div>
                    <div class="overflow-y-auto flex-grow custom-scrollbar">
                      <table class="min-w-full divide-y divide-gray-100">
                        <thead class="bg-white sticky top-0 shadow-sm z-10">
                          <tr>
                             <th class="px-4 py-2 text-left text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest bg-white">Item</th>
                             <th class="px-4 py-2 text-left text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest bg-white">Desc</th>
                             <th class="px-4 py-2 text-right text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest bg-white">Qty</th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-50 bg-white">
                           <tr v-for="item in (deliverySummary.lowStock || [])" :key="item.sku" class="hover:bg-gray-50/30 transition-colors">
                             <td class="px-4 py-2 text-xs font-mono font-bold text-gray-800 break-words">{{ item.name }}</td>
                             <td class="px-4 py-2 text-xs text-gray-600 break-words">{{ item.description || '-' }}</td>
                             <td class="px-4 py-2 text-xs text-orange-600 font-bold text-right">{{ item.quantity }}</td>
                           </tr>
                           <tr v-if="!(deliverySummary.lowStock || []).length">
                             <td colspan="3" class="px-4 py-8 text-center text-gray-400 text-xs italic">No low stock items</td>
                           </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <!-- Critical Stock Section -->
                  <div class="bg-white  shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[400px]">
                    <div class="bg-white px-4 py-3 border-b border-gray-100 flex justify-between items-center shrink-0">
                      <h4 class="text-[10px] font-mono font-bold text-red-600 flex items-center gap-2 uppercase tracking-wider">
                        <i class="fas fa-skull-crossbones"></i> Critical Stock
                      </h4>
                      <button @click="downloadStockReportExcel('critical')" class="text-red-600 hover:text-red-800 p-1.5  transition-colors" title="Download Excel">
                        <i class="fas fa-file-excel"></i>
                      </button>
                    </div>
                    <div class="overflow-y-auto flex-grow custom-scrollbar">
                      <table class="min-w-full divide-y divide-gray-100">
                        <thead class="bg-white sticky top-0 shadow-sm z-10">
                          <tr>
                             <th class="px-4 py-2 text-left text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest bg-white text-red-600">Item</th>
                             <th class="px-4 py-2 text-left text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest bg-white text-red-600">Desc</th>
                             <th class="px-4 py-2 text-right text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest bg-white text-red-600">Qty</th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-50 bg-white">
                           <tr v-for="item in (deliverySummary.criticalStock || [])" :key="item.sku" class="hover:bg-gray-50/30 transition-colors">
                             <td class="px-4 py-2 text-xs font-mono font-bold text-gray-800 break-words">{{ item.name }}</td>
                             <td class="px-4 py-2 text-xs text-gray-600 break-words">{{ item.description || '-' }}</td>
                             <td class="px-4 py-2 text-xs text-red-600 font-bold text-right">{{ item.quantity }}</td>
                           </tr>
                           <tr v-if="!(deliverySummary.criticalStock || []).length">
                             <td colspan="3" class="px-4 py-8 text-center text-gray-400 text-xs italic">No critical stock items</td>
                           </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <!-- Empty Stock Section -->
                  <div class="bg-white  shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[400px]">
                    <div class="bg-white px-4 py-3 border-b border-gray-100 flex justify-between items-center shrink-0">
                      <h4 class="text-[10px] font-mono font-bold text-gray-600 flex items-center gap-2 uppercase tracking-wider">
                        <i class="fas fa-box-open"></i> Empty Stock
                      </h4>
                      <button @click="downloadStockReportExcel('empty')" class="text-gray-600 hover:text-gray-800 p-1.5  transition-colors" title="Download Excel">
                        <i class="fas fa-file-excel"></i>
                      </button>
                    </div>
                    <div class="overflow-y-auto flex-grow custom-scrollbar">
                      <table class="min-w-full divide-y divide-gray-100">
                        <thead class="bg-white sticky top-0 shadow-sm z-10">
                          <tr>
                             <th class="px-4 py-2 text-left text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest bg-white">Item</th>
                             <th class="px-4 py-2 text-left text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest bg-white">Desc</th>
                             <th class="px-4 py-2 text-right text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest bg-white">Qty</th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-50 bg-white">
                           <tr v-for="item in (deliverySummary.emptyStock || [])" :key="item.sku" class="hover:bg-gray-50/30 transition-colors">
                             <td class="px-4 py-2 text-xs font-mono font-bold text-gray-800 break-words">{{ item.name }}</td>
                             <td class="px-4 py-2 text-xs text-gray-600 break-words">{{ item.description || '-' }}</td>
                             <td class="px-4 py-2 text-xs text-gray-500 font-bold text-right">{{ item.quantity }}</td>
                           </tr>
                           <tr v-if="!(deliverySummary.emptyStock || []).length">
                             <td colspan="3" class="px-4 py-8 text-center text-gray-400 text-xs italic">No empty stock items</td>
                           </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
                <div class="bg-white  shadow-sm border border-gray-200 overflow-hidden">
                  <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight font-outfit">Delivery Tickets</h3>
                    <div class="flex gap-2">
                       <button @click="downloadDeliveryTicketsPDF" class="px-3 py-1.5 bg-red-600 text-white hover:bg-red-700 font-mono text-xs flex items-center gap-2 transition-colors shadow-sm">
                           <i class="fas fa-file-pdf"></i> PDF
                       </button>
                       <button @click="downloadDeliveryTicketsExcel" class="px-3 py-1.5 bg-green-600 text-white hover:bg-green-700 font-mono text-xs flex items-center gap-2 transition-colors shadow-sm">
                           <i class="fas fa-file-excel"></i> Excel
                       </button>
                    </div>
                  </div>
                  <div class="overflow-x-auto">
                    <table class="min-w-full responsive-table">
                <thead>
                  <tr class="text-left border-b border-gray-100">
                    <th class="pb-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider">Client</th>
                    <th class="pb-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider text-right">Qty</th>
                    <th class="pb-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider text-right">Cost (ticket total)</th>
                    <!-- <th class="pb-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider text-right">Buying Price</th> -->

                    <th class="pb-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider text-right">Delivery Date</th>
                    <th class="pb-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider text-right">Status</th>
                    <th class="pb-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider text-left pl-4">Technician</th>
                    <th class="pb-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider text-left">Delivery Address</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                  <tr v-for="(d, idx) in deliveryTickets" :key="d.deliveryNoteNumber || idx" class="hover:bg-gray-50/50 transition-colors">
                    <td class="py-4 text-gray-800" data-label="Client">{{ d.clientName || d.customerName || '—' }}</td>
                    <td class="py-4 text-gray-800 text-right" data-label="Qty">{{ d.quantity }}</td>
                    <td class="py-4 text-gray-800 text-right" data-label="Cost">{{ formatWithSymbol(getTicketTotal(d)) }}</td>
                    <!-- <td class="py-4 text-gray-800 text-right" data-label="Buying Price">{{ formatWithSymbol(d.equipmentBuyingPrice || 0) }}</td> -->

                    <td class="py-4 text-gray-800 text-right" data-label="Delivery Date">{{ formatDate(d.deliveryDate) }}</td>
                    <td class="py-4 text-gray-800 text-right" data-label="Status">{{ d.status || '—' }}</td>
                    <td class="py-4 text-gray-800 text-left pl-4" data-label="Technician">{{ d.technicianName || d.assignedTo || '—' }}</td>
                    <td class="py-4 text-gray-800 text-left" data-label="Delivery Address">{{ d.deliveryAddress || d.address || '—' }}</td>
                  </tr>
                  <tr v-if="deliveryTickets.length === 0">
                    <td class="py-6 text-center text-sm text-gray-500" colspan="9">No delivery notes available</td>
                  </tr>
                </tbody>
              </table>
              </div>
            </div>
            </div>

            <div class="mt-4 flex justify-end">
              <div class="flex items-center gap-2">
                <button @click="previewPrev" class="px-3 py-1 bg-gray-100 font-mono text-xs hover:bg-gray-200 transition">Prev</button>
                <span class="text-[10px] font-mono text-gray-500">Page {{ deliveryPage + 1 }} / {{ Math.max(1, Math.ceil(deliveryTotalCount / deliveryPageSize)) }}</span>
                <button @click="previewNext" class="px-3 py-1 bg-gray-100 font-mono text-xs hover:bg-gray-200 transition">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Hotel Report main section (own tab) -->
      <div v-if="currentTab === 'hotels'" class="space-y-8 relative z-10">
        <div class="bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div class="p-4 border-b border-gray-100 flex items-center gap-3">
            <div class="w-1.5 h-4 bg-[#2F2E8B] rounded-none"></div>
            <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight font-outfit">Hotel Sales Report</h3>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div class="bg-white border border-gray-100 p-5 shadow-sm relative overflow-hidden">
                <div class="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Total Hotel Revenue</div>
                <div class="text-xl font-black text-gray-900 font-outfit">{{ formatWithSymbol(hotelSales.total) }}</div>
              </div>
              <div class="bg-white border border-gray-100 p-5 shadow-sm relative overflow-hidden">
                <div class="absolute top-0 left-0 w-1 h-full bg-[#2F2E8B]"></div>
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Room Revenue</div>
                <div class="text-xl font-black text-gray-900 font-outfit">{{ formatWithSymbol(hotelSales.room_rev) }}</div>
              </div>
              <div class="bg-white border border-gray-100 p-5 shadow-sm relative overflow-hidden">
                <div class="absolute top-0 left-0 w-1 h-full bg-violet-500"></div>
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Conference Revenue</div>
                <div class="text-xl font-black text-gray-900 font-outfit">{{ formatWithSymbol(hotelSales.conf_rev) }}</div>
              </div>
              <div class="bg-white border border-gray-100 p-5 shadow-sm relative overflow-hidden">
                <div class="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Service Revenue</div>
                <div class="text-xl font-black text-gray-900 font-outfit">{{ formatWithSymbol(hotelSales.serv_rev) }}</div>
              </div>
            </div>

            <!-- New Charts Row (Synced from Hotel MFE) -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <!-- Daily Revenue Summary -->
              <div class="bg-white  shadow-sm border border-gray-200 p-6">
                <h4 class="text-sm font-black text-gray-900 uppercase tracking-tight font-outfit mb-4">Daily Sales Summary</h4>
                <div class="overflow-y-auto max-h-64">
                  <table class="w-full text-sm text-left">
                    <thead class="sticky top-0 bg-white border-b border-gray-100">
                      <tr>
                        <th class="py-2 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider">Date</th>
                        <th class="py-2 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="day in hotelSales.daily_revenue.slice().reverse()" :key="day.date" class="border-b last:border-0 hover:bg-gray-50">
                        <td class="py-2 text-gray-600">{{ formatDate(day.date) }}</td>
                        <td class="py-2 text-right font-semibold text-[#2F2E8B]">{{ formatWithSymbol(day.amount) }}</td>
                      </tr>
                      <tr v-if="hotelSales.daily_revenue.length === 0">
                        <td colspan="2" class="py-10 text-center text-gray-500 italic">No daily summary records</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Revenue by Category (MFE Pie Chart) -->
              <div class="bg-white  shadow-sm border border-gray-200 p-6">
                <h4 class="text-sm font-black text-gray-900 uppercase tracking-tight font-outfit mb-4">Revenue by Category</h4>
                <div class="flex flex-col sm:flex-row items-center justify-around h-full gap-4">
                  <div class="relative w-40 h-40">
                    <svg viewBox="0 0 100 100" class="w-full h-full transform -rotate-90">
                      <!-- Room Pct -->
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#2F2E8B" stroke-width="12"
                              :stroke-dasharray="`${hotelSales.room_pct * 2.51} 251`" />
                      <!-- Conf Pct -->
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#8B5CF6" stroke-width="12"
                              :stroke-dasharray="`${hotelSales.conf_pct * 2.51} 251`"
                              :stroke-dashoffset="`${-hotelSales.room_pct * 2.51}`" />
                      <!-- Serv Pct -->
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#F97316" stroke-width="12"
                              :stroke-dasharray="`${hotelSales.serv_pct * 2.51} 251`"
                              :stroke-dashoffset="`${-(hotelSales.room_pct + hotelSales.conf_pct) * 2.51}`" />
                    </svg>
                    <div class="absolute inset-0 flex items-center justify-center flex-col transform rotate-0">
                      <span class="text-xs text-gray-400">Total</span>
                      <span class="font-bold text-sm">{{ formatWithSymbol(hotelSales.total) }}</span>
                    </div>
                  </div>
                  <div class="space-y-2">
                    <div class="flex items-center gap-3">
                      <div class="w-3 h-3 rounded bg-[#2F2E8B]"></div>
                      <span class="text-sm text-gray-500">Rooms ({{ hotelSales.room_pct }}%)</span>
                    </div>
                    <div class="flex items-center gap-3">
                      <div class="w-3 h-3 rounded bg-[#8B5CF6]"></div>
                      <span class="text-sm text-gray-500">Conf. ({{ hotelSales.conf_pct }}%)</span>
                    </div>
                    <div class="flex items-center gap-3">
                      <div class="w-3 h-3 rounded bg-[#F97316]"></div>
                      <span class="text-sm text-gray-500">Services ({{ hotelSales.serv_pct }}%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-8">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-1.5 h-4 bg-[#2F2E8B]"></div>
                <h4 class="text-xs font-black text-gray-900 uppercase tracking-tight font-outfit">Recent Hotel Transactions</h4>
              </div>
              <div class="bg-white  shadow-sm border border-gray-200 overflow-hidden">
                <div class="overflow-x-auto">
                  <table class="min-w-full responsive-table">
                    <thead>
                      <tr class="text-left border-b border-gray-100">
                        <th class="pb-3 px-4 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider">Receipt #</th>
                        <th class="pb-3 px-4 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider">Customer</th>
                        <th class="pb-3 px-4 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider">Type</th>
                        <th class="pb-3 px-4 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider text-right">Amount</th>
                        <th class="pb-3 px-4 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50">
                      <tr v-for="t in hotelSales.transactions" :key="t.id" class="hover:bg-gray-50/50 transition-colors">
                        <td class="py-4 px-4 text-gray-400 font-mono text-xs" data-label="Receipt #">
                          {{ t.receipt_number || (t.id && t.id.length > 12 ? t.id.substring(0,8) + '...' : t.id) }}
                        </td>
                        <td class="py-4 px-4 text-gray-500" data-label="Customer">{{ t.customer || '—' }}</td>
                        <td class="py-4 px-4 pr-10" data-label="Type">
                          <span class="px-3 py-1 text-xs font-semibold rounded bg-gray-50 text-[#64748b] border border-gray-100" style="letter-spacing: 0.025em;">
                            {{ t.category || 'Sale' }}
                          </span>
                        </td>
                        <td class="py-4 px-4 text-gray-800 text-right font-mono font-bold" data-label="Amount">{{ formatWithSymbol(t.amount) }}</td>
                        <td class="py-4 px-4 text-[#111827] font-bold" data-label="Date">{{ formatDate(t.date) }}</td>
                      </tr>
                      <tr v-if="hotelSales.transactions.length === 0">
                        <td class="py-10 text-center text-sm text-gray-500" colspan="5">No hotel transactions available in this period</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <!-- Delivery Notes Modal (single-root template) -->
    <div v-if="showDeliveryModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" style="z-index: 10000;">
      <div class="bg-white shadow-sm max-w-4xl w-full mx-4 border border-gray-100">
        <div class="flex items-center justify-between p-4 border-b border-gray-100">
          <div class="flex items-center gap-3">
            <div class="w-1.5 h-5 bg-[#2F2E8B]"></div>
            <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight font-outfit">Delivery Notes ({{ deliverySummary.totalTickets }})</h3>
          </div>
          <button @click="showDeliveryModal = false" class="text-gray-400 hover:text-gray-600 transition"><i class="fas fa-times"></i></button>
        </div>
        <div class="p-4">
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead>
                <tr class="text-left border-b border-gray-100">
                  <th class="py-2 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider">Client</th>
                  <th class="py-2 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider">Qty</th>
                  <th class="py-2 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider">Cost</th>
                  <!-- <th class="py-2 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider">Buying Price</th> -->

                  <th class="py-2 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider">Delivery Date</th>
                  <th class="py-2 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider">Status</th>
                  <th class="py-2 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider">Technician</th>
                  <th class="py-2 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider">Delivery Address</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(d, idx) in deliveryTickets" :key="d.deliveryNoteNumber || idx" class="hover:bg-gray-50/50 transition-colors">
                  <td class="py-3 text-sm text-gray-800">{{ d.clientName || d.customerName || '—' }}</td>
                  <td class="py-3 text-sm text-gray-800">{{ d.quantity }}</td>
                  <td class="py-3 text-sm text-gray-800">{{ formatWithSymbol(getTicketTotal(d)) }}</td>
                  <!-- <td class="py-3 text-sm text-gray-800">{{ formatWithSymbol(d.equipmentBuyingPrice || 0) }}</td> -->

                  <td class="py-3 text-sm text-gray-800">{{ formatDate(d.deliveryDate) }}</td>
                  <td class="py-3 text-sm text-gray-800">{{ d.status || '—' }}</td>
                  <td class="py-3 text-sm text-gray-800">{{ d.technicianName || d.assignedTo || '—' }}</td>
                  <td class="py-3 text-sm text-gray-800">{{ d.deliveryAddress || d.address || '—' }}</td>
                </tr>
                <tr v-if="deliveryTickets.length === 0">
                  <td class="py-6 text-center text-sm text-gray-500" colspan="8">No delivery notes available</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="p-4 border-t text-right">
            <div class="text-sm text-gray-700">Grand Total (all tickets): <span class="font-semibold">{{ formatWithSymbol(grandTotalAllDeliveryTickets) }}</span></div>
          </div>
        </div>
        <div class="flex justify-end p-4 border-t border-gray-100">
          <div class="flex items-center gap-3">
            <button @click="goToPreviousDeliveryPage" class="px-3 py-1 bg-gray-100 font-mono text-sm hover:bg-gray-200 transition">Prev</button>
            <span class="text-[10px] font-mono text-gray-500">Page {{ deliveryPage + 1 }} / {{ Math.max(1, Math.ceil(deliveryTotalCount / deliveryPageSize)) }}</span>
            <button @click="goToNextDeliveryPage" class="px-3 py-1 bg-gray-100 font-mono text-sm hover:bg-gray-200 transition">Next</button>
            <button @click="showDeliveryModal = false" class="px-4 py-2 bg-[#2F2E8B] text-white font-mono text-sm hover:bg-[#1F1E6B] transition">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from 'vue';
import { useReportsModule } from './functions/ReportsModule';

const{
   // State
    branches,
    selectedBranch,
    loading,
    showReportModal,
    currentTab,
    salesChart,
    salesProfitChart,
    weeklyTransactionsChart,
    totalSales,
    totalSalesInitialized,
    reportRange,
    customStartDate,
    customEndDate,
    customStartTime,
    customEndTime,
    monthlySales,
    netProfit,
    inventoryValue,
    inventoryItems,
    inventoryItemsList,
    deliveryTickets,
    deliverySummary,
    showDeliveryModal,
    deliveryFilter,
    showLowStockDetails,
    deliveryTechnicianOptions,
    deliveryStatusOptions,
    deliveryAddressOptions,
    deliveryPage,
    deliveryPageSize,
    deliveryTotalCount,
    backendNetProfit,
    persistedInventorySummary,
    payroll,
    salesTrend,
    profitTrend,
    financials,
    balanceSheet,
    equity,
    liabilities,
    dividends,
    salesMetrics,
    salesChartData,
    taxSummary,
    taxHistory,
    reportTabs,
    newReport,
    notifications,
  invoicesSummary,
    invoices,

    // Stock Pagination
    lowStockPage,
    criticalStockPage,
    emptyStockPage,
    stockPageSize,
    paginatedLowStock,
    paginatedCriticalStock,
    paginatedEmptyStock,
    totalLowStockPages,
    totalCriticalStockPages,
    totalEmptyStockPages,
    nextLowStockPage,
    prevLowStockPage,
    nextCriticalStockPage,
    prevCriticalStockPage,
    nextEmptyStockPage,
    prevEmptyStockPage,
    downloadStockReportExcel,
    downloadDeliveryTicketsExcel,
    downloadDeliveryTicketsPDF,
    
    // Computed
    grandTotalAllDeliveryTickets,
    deliveryProfitAdjustment,
    unreadCount,
    totalEquity,
    totalLiabilities,
    totalEquityAndLiabilities,
    netWorth,
    debtToEquityRatio,
    
    // Methods
    setAuthoritativeTotalSales,
    updateDisplayedNetProfit,
    fetchInventorySummary,
    fetchDeliveryFilterOptions,
    formatNumber,
    formatWithSymbol,
    getTicketTotal,
    formatNegative,
    formatDate,
    formatPeriod,
    fetchFinancialData,
    fetchTaxData,
    fetchInventoryData,
    fetchTopKPIs,
    fetchPayrollData,
    fetchDeliveryTickets,
    clearDeliveryFilters,
    previewPrev,
    previewNext,
    applyDeliveryFilters,
    fetchNotifications,
    markNotificationRead,
    dismissNotification,
    fetchSalesChartData,
    fetchExpensesData,
    fetchMonthlySalesData,
    initSalesChart,
    generateReport,
    goToPreviousDeliveryPage,
    goToNextDeliveryPage,
  fetchInvoices,
  buildReportPreviewHtml,
  hotelSales,
  fetchHotelSales,
    
    // Currency composable
    initializeCurrency,
    formatCurrency,
    formatCurrencyCompact,
    currencySymbol,
    currencyCode,
    currentSettings


} = useReportsModule();

// Tenant details for company name
const tenantDetails = ref({
  companyName: localStorage.getItem('companyName') || 'Your Company'
});

// ===== FINANCIAL REPORTS STATE =====
const showFinancialReportsModal = ref(false);
const financialReportStep = ref(1); // 1: Select type, 2: Customize, 3: Preview
const selectedFinancialReportType = ref('');
const showIndustryTemplates = ref(false);
const selectedIndustryTemplate = ref('');

const financialReportData = ref({
  startDate: '',
  endDate: '',
  companyName: '',
  lineItems: [],
  taxSettings: {
    enableVAT: false,
    vatRate: 16,
    enableTurnover: false,
    turnoverRate: 5,
    turnoverThreshold: 12000,
    enableIncomeTax: false,
    incomeTaxRate: 35
  }
});

// ===== FINANCIAL REPORTS METHODS =====
function selectFinancialReportType(type) {
  selectedFinancialReportType.value = type;
  // Set default date range to current year
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  financialReportData.value.startDate = toDateInputValue(startOfYear);
  financialReportData.value.endDate = toDateInputValue(today);
}

function getReportTypeName() {
  const names = {
    'cashflow': 'Cash Flow Statement',
    'balance': 'Balance Sheet',
    'profitloss': 'Income Statement (Profit & Loss)',
    'equity': 'Statement of Changes in Equity',
    'hotel': 'Hotel Sales Report'
  };
  return names[selectedFinancialReportType.value] || 'Financial Report';
}

function getHotelCategoryBadge(cat) {
  if (!cat) return 'bg-gray-100 text-gray-700';
  const c = cat.toLowerCase();
  const badges = {
    'room': 'bg-blue-100 text-blue-700',
    'accommodation': 'bg-blue-100 text-blue-700',
    'conference': 'bg-purple-100 text-purple-700',
    'service': 'bg-orange-100 text-orange-700',
    'restaurant': 'bg-orange-100 text-orange-700',
    'checkout': 'bg-green-100 text-green-700'
  };
  return badges[c] || 'bg-gray-100 text-gray-700';
}

function getAvailableCategories() {
  const categories = {
    'cashflow': [
      'Operating Activities', 
      'Investing Activities', 
      'Financing Activities'
    ],
    'balance': [
      'Current Assets',
      'Non-Current Assets',
      'Current Liabilities',
      'Long-Term Liabilities',
      'Equity'
    ],
    'profitloss': [
      'Revenue',
      'Cost of Goods Sold',
      'Operating Expenses',
      'Other Income',
      'Other Expenses',
      'Taxes'
    ],
    'equity': [
      'Opening Balance',
      'Capital Contributions',
      'Net Income',
      'Dividends/Withdrawals',
      'Other Changes'
    ]
  };
  return categories[selectedFinancialReportType.value] || [];
}

function loadIndustryTemplate() {
  showIndustryTemplates.value = !showIndustryTemplates.value;
}

function applyIndustryTemplate() {
  const template = selectedIndustryTemplate.value;
  if (!template) {
    financialReportData.value.lineItems = [];
    return;
  }

  const templates = {
    retail: {
      cashflow: [
        { name: 'Cash Receipts from Customers', category: 'Operating Activities', amount: 0 },
        { name: 'Cash Paid to Suppliers', category: 'Operating Activities', amount: 0 },
        { name: 'Salaries and Wages Paid', category: 'Operating Activities', amount: 0 },
        { name: 'Rent Paid', category: 'Operating Activities', amount: 0 },
        { name: 'Interest Paid', category: 'Operating Activities', amount: 0 },
        { name: 'Purchase of Equipment', category: 'Investing Activities', amount: 0 },
        { name: 'Sale of Assets', category: 'Investing Activities', amount: 0 },
        { name: 'Loan Proceeds', category: 'Financing Activities', amount: 0 },
        { name: 'Loan Repayments', category: 'Financing Activities', amount: 0 },
        { name: 'Dividends Paid', category: 'Financing Activities', amount: 0 }
      ],
      balance: [
        { name: 'Cash and Bank', category: 'Current Assets', amount: 0 },
        { name: 'Accounts Receivable', category: 'Current Assets', amount: 0 },
        { name: 'Inventory', category: 'Current Assets', amount: 0 },
        { name: 'Prepaid Expenses', category: 'Current Assets', amount: 0 },
        { name: 'Property and Equipment', category: 'Non-Current Assets', amount: 0 },
        { name: 'Accumulated Depreciation', category: 'Non-Current Assets', amount: 0 },
        { name: 'Accounts Payable', category: 'Current Liabilities', amount: 0 },
        { name: 'Short-term Loans', category: 'Current Liabilities', amount: 0 },
        { name: 'Accrued Expenses', category: 'Current Liabilities', amount: 0 },
        { name: 'Long-term Bank Loan', category: 'Long-Term Liabilities', amount: 0 },
        { name: 'Mortgage Payable', category: 'Long-Term Liabilities', amount: 0 },
        { name: 'Share Capital', category: 'Equity', amount: 0 },
        { name: 'Retained Earnings', category: 'Equity', amount: 0 }
      ],
      profitloss: [
        { name: 'Sales Revenue', category: 'Revenue', amount: 0 },
        { name: 'Service Revenue', category: 'Revenue', amount: 0 },
        { name: 'Cost of Goods Sold', category: 'Cost of Goods Sold', amount: 0 },
        { name: 'Salaries and Wages', category: 'Operating Expenses', amount: 0 },
        { name: 'Rent Expense', category: 'Operating Expenses', amount: 0 },
        { name: 'Utilities', category: 'Operating Expenses', amount: 0 },
        { name: 'Marketing and Advertising', category: 'Operating Expenses', amount: 0 },
        { name: 'Depreciation', category: 'Operating Expenses', amount: 0 },
        { name: 'Insurance', category: 'Operating Expenses', amount: 0 },
        { name: 'Interest Income', category: 'Other Income', amount: 0 },
        { name: 'Interest Expense', category: 'Other Expenses', amount: 0 }
      ],
      equity: [
        { name: 'Beginning Balance', category: 'Opening Balance', amount: 0 },
        { name: 'Additional Capital Investment', category: 'Capital Contributions', amount: 0 },
        { name: 'Net Profit for the Year', category: 'Net Income', amount: 0 },
        { name: 'Dividends Declared', category: 'Dividends/Withdrawals', amount: 0 }
      ]
    },
    service: {
      profitloss: [
        { name: 'Service Revenue', category: 'Revenue', amount: 0 },
        { name: 'Consulting Fees', category: 'Revenue', amount: 0 },
        { name: 'Direct Labor', category: 'Cost of Goods Sold', amount: 0 },
        { name: 'Subcontractor Costs', category: 'Cost of Goods Sold', amount: 0 },
        { name: 'Employee Salaries', category: 'Operating Expenses', amount: 0 },
        { name: 'Office Rent', category: 'Operating Expenses', amount: 0 },
        { name: 'Professional Fees', category: 'Operating Expenses', amount: 0 },
        { name: 'Software Subscriptions', category: 'Operating Expenses', amount: 0 },
        { name: 'Marketing', category: 'Operating Expenses', amount: 0 },
        { name: 'Travel and Entertainment', category: 'Operating Expenses', amount: 0 }
      ]
    },
    manufacturing: {
      profitloss: [
        { name: 'Product Sales', category: 'Revenue', amount: 0 },
        { name: 'Raw Materials', category: 'Cost of Goods Sold', amount: 0 },
        { name: 'Direct Labor', category: 'Cost of Goods Sold', amount: 0 },
        { name: 'Manufacturing Overhead', category: 'Cost of Goods Sold', amount: 0 },
        { name: 'Factory Utilities', category: 'Cost of Goods Sold', amount: 0 },
        { name: 'Factory Rent', category: 'Operating Expenses', amount: 0 },
        { name: 'Administrative Salaries', category: 'Operating Expenses', amount: 0 },
        { name: 'Depreciation - Equipment', category: 'Operating Expenses', amount: 0 },
        { name: 'Quality Control', category: 'Operating Expenses', amount: 0 }
      ]
    },
    restaurant: {
      profitloss: [
        { name: 'Food Sales', category: 'Revenue', amount: 0 },
        { name: 'Beverage Sales', category: 'Revenue', amount: 0 },
        { name: 'Food Costs', category: 'Cost of Goods Sold', amount: 0 },
        { name: 'Beverage Costs', category: 'Cost of Goods Sold', amount: 0 },
        { name: 'Kitchen Staff Wages', category: 'Operating Expenses', amount: 0 },
        { name: 'Front of House Wages', category: 'Operating Expenses', amount: 0 },
        { name: 'Rent', category: 'Operating Expenses', amount: 0 },
        { name: 'Utilities', category: 'Operating Expenses', amount: 0 },
        { name: 'Marketing', category: 'Operating Expenses', amount: 0 },
        { name: 'Equipment Maintenance', category: 'Operating Expenses', amount: 0 }
      ]
    },
    tech: {
      profitloss: [
        { name: 'Subscription Revenue', category: 'Revenue', amount: 0 },
        { name: 'License Fees', category: 'Revenue', amount: 0 },
        { name: 'Professional Services', category: 'Revenue', amount: 0 },
        { name: 'Cloud Infrastructure', category: 'Cost of Goods Sold', amount: 0 },
        { name: 'Third-party APIs', category: 'Cost of Goods Sold', amount: 0 },
        { name: 'Software Development Salaries', category: 'Operating Expenses', amount: 0 },
        { name: 'Sales and Marketing', category: 'Operating Expenses', amount: 0 },
        { name: 'Customer Support', category: 'Operating Expenses', amount: 0 },
        { name: 'Research & Development', category: 'Operating Expenses', amount: 0 },
        { name: 'Office Expenses', category: 'Operating Expenses', amount: 0 }
      ]
    },
    construction: {
      profitloss: [
        { name: 'Contract Revenue', category: 'Revenue', amount: 0 },
        { name: 'Materials', category: 'Cost of Goods Sold', amount: 0 },
        { name: 'Subcontractors', category: 'Cost of Goods Sold', amount: 0 },
        { name: 'Direct Labor', category: 'Cost of Goods Sold', amount: 0 },
        { name: 'Equipment Rental', category: 'Operating Expenses', amount: 0 },
        { name: 'Insurance', category: 'Operating Expenses', amount: 0 },
        { name: 'Permits and Licenses', category: 'Operating Expenses', amount: 0 },
        { name: 'Administrative Staff', category: 'Operating Expenses', amount: 0 },
        { name: 'Vehicle Maintenance', category: 'Operating Expenses', amount: 0 }
      ]
    },
    healthcare: {
      profitloss: [
        { name: 'Patient Services Revenue', category: 'Revenue', amount: 0 },
        { name: 'Insurance Reimbursements', category: 'Revenue', amount: 0 },
        { name: 'Medical Supplies', category: 'Cost of Goods Sold', amount: 0 },
        { name: 'Pharmaceuticals', category: 'Cost of Goods Sold', amount: 0 },
        { name: 'Medical Staff Salaries', category: 'Operating Expenses', amount: 0 },
        { name: 'Support Staff Salaries', category: 'Operating Expenses', amount: 0 },
        { name: 'Facility Costs', category: 'Operating Expenses', amount: 0 },
        { name: 'Equipment Maintenance', category: 'Operating Expenses', amount: 0 },
        { name: 'Medical Malpractice Insurance', category: 'Operating Expenses', amount: 0 }
      ]
    }
  };

  const industryTemplates = templates[template];
  if (industryTemplates && industryTemplates[selectedFinancialReportType.value]) {
    financialReportData.value.lineItems = JSON.parse(JSON.stringify(industryTemplates[selectedFinancialReportType.value]));
  } else {
    // Fallback to generic template
    addLineItem();
  }
}

function addLineItem() {
  const categories = getAvailableCategories();
  financialReportData.value.lineItems.push({
    name: '',
    category: categories[0] || '',
    amount: 0
  });
}

function removeLineItem(index) {
  financialReportData.value.lineItems.splice(index, 1);
}

function groupLineItemsByCategory() {
  const grouped = {};
  financialReportData.value.lineItems.forEach(item => {
    if (!grouped[item.category]) {
      grouped[item.category] = {
        category: item.category,
        items: [],
        total: 0
      };
    }
    grouped[item.category].items.push(item);
    grouped[item.category].total += Number(item.amount) || 0;
  });
  return Object.values(grouped);
}

function calculateReportTotals() {
  const totals = [];
  const grouped = groupLineItemsByCategory();
  
  if (selectedFinancialReportType.value === 'cashflow') {
    grouped.forEach(section => {
      totals.push({ label: section.category, amount: section.total, bold: true });
    });
    totals.push({ 
      label: 'Net Cash Flow', 
      amount: calculateNetTotal(), 
      bold: true, 
      color: calculateNetTotal() >= 0 ? 'text-[#059669]' : 'text-[#DC2626]'
    });
  } else if (selectedFinancialReportType.value === 'balance') {
    const currentAssets = calculateCategoryTotal('Current Assets');
    const nonCurrentAssets = calculateCategoryTotal('Non-Current Assets');
    const totalAssets = currentAssets + nonCurrentAssets;
    
    const currentLiabilities = calculateCategoryTotal('Current Liabilities');
    const longTermLiabilities = calculateCategoryTotal('Long-Term Liabilities');
    const totalLiabilities = currentLiabilities + longTermLiabilities;
    
    const equity = calculateCategoryTotal('Equity');
    
    totals.push({ label: 'Total Current Assets', amount: currentAssets, bold: false });
    totals.push({ label: 'Total Non-Current Assets', amount: nonCurrentAssets, bold: false });
    totals.push({ label: 'TOTAL ASSETS', amount: totalAssets, bold: true });
    totals.push({ label: '', amount: 0, bold: false });
    totals.push({ label: 'Total Current Liabilities', amount: currentLiabilities, bold: false });
    totals.push({ label: 'Total Long-Term Liabilities', amount: longTermLiabilities, bold: false });
    totals.push({ label: 'Total Liabilities', amount: totalLiabilities, bold: true });
    totals.push({ label: 'Total Equity', amount: equity, bold: true });
    totals.push({ label: '', amount: 0, bold: false });
    totals.push({ label: 'TOTAL LIABILITIES + EQUITY', amount: totalLiabilities + equity, bold: true });
    totals.push({ 
      label: 'Balance Check', 
      amount: totalAssets - (totalLiabilities + equity), 
      bold: true,
      color: Math.abs(totalAssets - (totalLiabilities + equity)) < 0.01 ? 'text-[#059669]' : 'text-[#DC2626]'
    });
  } else if (selectedFinancialReportType.value === 'profitloss') {
    const revenue = calculateCategoryTotal('Revenue');
    const cogs = calculateCategoryTotal('Cost of Goods Sold');
    const grossProfit = revenue - cogs;
    const operatingExpenses = calculateCategoryTotal('Operating Expenses');
    const operatingIncome = grossProfit - operatingExpenses;
    const otherIncome = calculateCategoryTotal('Other Income');
    const otherExpenses = calculateCategoryTotal('Other Expenses');
    const profitBeforeTax = operatingIncome + otherIncome - otherExpenses;
    
    totals.push({ label: 'Total Revenue', amount: revenue, bold: true });
    totals.push({ label: 'Less: Cost of Goods Sold', amount: cogs, bold: false });
    totals.push({ label: 'Gross Profit', amount: grossProfit, bold: true });
    totals.push({ label: '', amount: 0, bold: false });
    totals.push({ label: 'Less: Operating Expenses', amount: operatingExpenses, bold: false });
    totals.push({ label: 'Operating Income (EBIT)', amount: operatingIncome, bold: true });
    totals.push({ label: '', amount: 0, bold: false });
    totals.push({ label: 'Add: Other Income', amount: otherIncome, bold: false });
    totals.push({ label: 'Less: Other Expenses', amount: otherExpenses, bold: false });
    totals.push({ label: 'Profit Before Tax', amount: profitBeforeTax, bold: true });
    
    // Calculate taxes
    let totalTaxes = 0;
    const taxBreakdown = [];
    
    // VAT (on revenue)
    if (financialReportData.value.taxSettings.enableVAT && revenue > 0) {
      const vat = revenue * (financialReportData.value.taxSettings.vatRate / 100);
      totalTaxes += vat;
      taxBreakdown.push({ label: `VAT (${financialReportData.value.taxSettings.vatRate}%)`, amount: vat });
    }
    
    // Turnover Tax (on revenue if above threshold)
    if (financialReportData.value.taxSettings.enableTurnover && 
        revenue > financialReportData.value.taxSettings.turnoverThreshold) {
      const turnoverTax = revenue * (financialReportData.value.taxSettings.turnoverRate / 100);
      totalTaxes += turnoverTax;
      taxBreakdown.push({ label: `Turnover Tax (${financialReportData.value.taxSettings.turnoverRate}%)`, amount: turnoverTax });
    }
    
    // Income Tax (on profit)
    if (financialReportData.value.taxSettings.enableIncomeTax && profitBeforeTax > 0) {
      const incomeTax = profitBeforeTax * (financialReportData.value.taxSettings.incomeTaxRate / 100);
      totalTaxes += incomeTax;
      taxBreakdown.push({ label: `Income Tax (${financialReportData.value.taxSettings.incomeTaxRate}%)`, amount: incomeTax });
    }
    
    // Add tax breakdown
    if (taxBreakdown.length > 0) {
      totals.push({ label: '', amount: 0, bold: false });
      totals.push({ label: 'Less: Taxes', amount: 0, bold: true });
      taxBreakdown.forEach(tax => {
        totals.push({ label: `  ${tax.label}`, amount: tax.amount, bold: false });
      });
      totals.push({ label: 'Total Taxes', amount: totalTaxes, bold: true });
    }
    
    const netIncome = profitBeforeTax - totalTaxes;
    totals.push({ label: '', amount: 0, bold: false });
    totals.push({ 
      label: 'NET INCOME', 
      amount: netIncome, 
      bold: true,
      color: netIncome >= 0 ? 'text-[#059669]' : 'text-[#DC2626]'
    });
  } else if (selectedFinancialReportType.value === 'equity') {
    const openingBalance = calculateCategoryTotal('Opening Balance');
    const capitalContributions = calculateCategoryTotal('Capital Contributions');
    const netIncome = calculateCategoryTotal('Net Income');
    const dividends = calculateCategoryTotal('Dividends/Withdrawals');
    const otherChanges = calculateCategoryTotal('Other Changes');
    const closingBalance = openingBalance + capitalContributions + netIncome - dividends + otherChanges;
    
    totals.push({ label: 'Opening Equity Balance', amount: openingBalance, bold: true });
    totals.push({ label: 'Add: Capital Contributions', amount: capitalContributions, bold: false });
    totals.push({ label: 'Add: Net Income', amount: netIncome, bold: false });
    totals.push({ label: 'Less: Dividends/Withdrawals', amount: dividends, bold: false });
    totals.push({ label: 'Add/Less: Other Changes', amount: otherChanges, bold: false });
    totals.push({ label: '', amount: 0, bold: false });
    totals.push({ 
      label: 'Closing Equity Balance', 
      amount: closingBalance, 
      bold: true,
      color: 'text-[#2F2E8B]'
    });
  }
  
  return totals;
}

function calculateCategoryTotal(category) {
  return financialReportData.value.lineItems
    .filter(item => item.category === category)
    .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
}

function calculateNetTotal() {
  if (selectedFinancialReportType.value === 'cashflow') {
    return financialReportData.value.lineItems.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  } else if (selectedFinancialReportType.value === 'balance') {
    // For balance sheet, check if balanced
    const assets = calculateCategoryTotal('Assets');
    const liabilities = calculateCategoryTotal('Liabilities');
    const equity = calculateCategoryTotal('Equity');
    return assets - (liabilities + equity);
  } else if (selectedFinancialReportType.value === 'profitloss') {
    const revenue = calculateCategoryTotal('Revenue') + calculateCategoryTotal('Other Income');
    const expenses = calculateCategoryTotal('Cost of Goods Sold') + 
                    calculateCategoryTotal('Operating Expenses') + 
                    calculateCategoryTotal('Other Expenses');
    return revenue - expenses;
  }
  return 0;
}

function calculateGrossProfit() {
  const revenue = calculateCategoryTotal('Revenue');
  const cogs = calculateCategoryTotal('Cost of Goods Sold');
  return revenue - cogs;
}

function canProceedToNextStep() {
  if (financialReportStep.value === 1) {
    return selectedFinancialReportType.value && 
           financialReportData.value.startDate && 
           financialReportData.value.endDate;
  }
  if (financialReportStep.value === 2) {
    return financialReportData.value.lineItems.length > 0 &&
           financialReportData.value.lineItems.some(item => item.name && item.amount);
  }
  return true;
}

function nextFinancialReportStep() {
  if (!canProceedToNextStep()) return;
  
  if (financialReportStep.value === 1) {
    // Initialize with at least one line item if empty
    if (financialReportData.value.lineItems.length === 0) {
      addLineItem();
    }
  }
  
  financialReportStep.value++;
}

function closeFinancialReportsModal() {
  showFinancialReportsModal.value = false;
  // Reset state
  setTimeout(() => {
    financialReportStep.value = 1;
    selectedFinancialReportType.value = '';
    showIndustryTemplates.value = false;
    selectedIndustryTemplate.value = '';
    financialReportData.value = {
      startDate: '',
      endDate: '',
      companyName: '',
      lineItems: [],
      taxSettings: {
        enableVAT: false,
        vatRate: 16,
        enableTurnover: false,
        turnoverRate: 5,
        turnoverThreshold: 12000,
        enableIncomeTax: false,
        incomeTaxRate: 35
      }
    };
  }, 300);
}

async function downloadFinancialReport(format) {
  try {
    if (format === 'docx') {
      await downloadFinancialReportDOCX();
    } else if (format === 'excel') {
      await downloadFinancialReportExcel();
    }
  } catch (error) {
    console.error('Error downloading financial report:', error);
    alert('Failed to download report. Please try again.');
  }
}

async function downloadFinancialReportDOCX() {
  try {
    // Import required libraries
    const { Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun, HeadingLevel, AlignmentType, WidthType, BorderStyle } = await import('docx');
    
    const grouped = groupLineItemsByCategory();
    const totals = calculateReportTotals();
    
    const children = [];
    
    // Title
    children.push(
      new Paragraph({
        text: getReportTypeName(),
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 }
      })
    );
    
    // Company name
    children.push(
      new Paragraph({
        text: financialReportData.value.companyName || tenantDetails.value?.companyName || 'Company Name',
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 }
      })
    );
    
    // Date range
    children.push(
      new Paragraph({
        text: `Period: ${formatDate(financialReportData.value.startDate)} to ${formatDate(financialReportData.value.endDate)}`,
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 }
      })
    );
    
    // Add each category section
    grouped.forEach(section => {
      // Section heading
      children.push(
        new Paragraph({
          text: section.category,
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 200 }
        })
      );
      
      // Create table for line items
      const tableRows = [];
      
      // Add line items
      section.items.forEach(item => {
        tableRows.push(
          new TableRow({
            children: [
              new TableCell({
                children: [new Paragraph({ text: item.name })],
                width: { size: 70, type: WidthType.PERCENTAGE }
              }),
              new TableCell({
                children: [new Paragraph({ 
                  text: formatCurrency(item.amount),
                  alignment: AlignmentType.RIGHT
                })],
                width: { size: 30, type: WidthType.PERCENTAGE }
              })
            ]
          })
        );
      });
      
      // Add category total
      tableRows.push(
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({ 
                text: `Total ${section.category}`,
                bold: true
              })],
              width: { size: 70, type: WidthType.PERCENTAGE },
              shading: { fill: "F3F4F6" }
            }),
            new TableCell({
              children: [new Paragraph({ 
                text: formatCurrency(section.total),
                alignment: AlignmentType.RIGHT,
                bold: true
              })],
              width: { size: 30, type: WidthType.PERCENTAGE },
              shading: { fill: "F3F4F6" }
            })
          ]
        })
      );
      
      children.push(
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: tableRows,
          borders: {
            top: { style: BorderStyle.SINGLE, size: 1 },
            bottom: { style: BorderStyle.SINGLE, size: 1 },
            left: { style: BorderStyle.SINGLE, size: 1 },
            right: { style: BorderStyle.SINGLE, size: 1 },
            insideHorizontal: { style: BorderStyle.SINGLE, size: 1 },
            insideVertical: { style: BorderStyle.SINGLE, size: 1 }
          }
        })
      );
    });
    
    // Add final totals section
    children.push(
      new Paragraph({
        text: '',
        spacing: { before: 400 }
      })
    );
    
    children.push(
      new Paragraph({
        text: 'Summary',
        heading: HeadingLevel.HEADING_2,
        spacing: { after: 200 }
      })
    );
    
    // Create totals table
    const totalsRows = totals.map(total => {
      const isBold = total.bold;
      const isColored = total.color;
      
      return new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ 
              text: total.label,
              bold: isBold
            })],
            width: { size: 70, type: WidthType.PERCENTAGE },
            shading: isBold ? { fill: "F9FAFB" } : undefined
          }),
          new TableCell({
            children: [new Paragraph({ 
              text: formatCurrency(total.amount),
              alignment: AlignmentType.RIGHT,
              bold: isBold
            })],
            width: { size: 30, type: WidthType.PERCENTAGE },
            shading: isBold ? { fill: "F9FAFB" } : undefined
          })
        ]
      });
    });
    
    children.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: totalsRows,
        borders: {
          top: { style: BorderStyle.SINGLE, size: 1 },
          bottom: { style: BorderStyle.SINGLE, size: 1 },
          left: { style: BorderStyle.SINGLE, size: 1 },
          right: { style: BorderStyle.SINGLE, size: 1 },
          insideHorizontal: { style: BorderStyle.SINGLE, size: 1 },
          insideVertical: { style: BorderStyle.SINGLE, size: 1 }
        }
      })
    );
    
    // Add footer note
    children.push(
      new Paragraph({
        text: `Generated on ${new Date().toLocaleDateString()}`,
        alignment: AlignmentType.CENTER,
        spacing: { before: 400 }
      })
    );
    
    // Create document
    const doc = new Document({
      sections: [{
        properties: {},
        children: children
      }]
    });
    
    // Generate and download
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${getReportTypeName().replace(/\s+/g, '_')}_${financialReportData.value.startDate}_to_${financialReportData.value.endDate}.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
  } catch (error) {
    console.error('DOCX export failed:', error);
    throw error;
  }
}

async function downloadFinancialReportExcel() {
  try {
    const XLSX = await import('xlsx');
    
    const grouped = groupLineItemsByCategory();
    const totals = calculateReportTotals();
    
    // Prepare data for Excel
    const worksheetData = [];
    
    // Header section
    worksheetData.push([getReportTypeName()]);
    worksheetData.push([financialReportData.value.companyName || tenantDetails.value?.companyName || 'Company Name']);
    worksheetData.push([`Period: ${formatDate(financialReportData.value.startDate)} to ${formatDate(financialReportData.value.endDate)}`]);
    worksheetData.push([]);
    worksheetData.push([]);
    
    // Add each category section
    grouped.forEach(section => {
      // Category header
      worksheetData.push([section.category, '']);
      worksheetData.push(['Line Item', 'Amount']);
      
      // Line items
      section.items.forEach(item => {
        worksheetData.push([item.name, Number(item.amount) || 0]);
      });
      
      // Category total
      worksheetData.push([`Total ${section.category}`, section.total]);
      worksheetData.push([]);
    });
    
    // Summary section
    worksheetData.push([]);
    worksheetData.push(['SUMMARY', '']);
    worksheetData.push([]);
    
    totals.forEach(total => {
      worksheetData.push([total.label, total.amount]);
    });
    
    // Footer
    worksheetData.push([]);
    worksheetData.push([`Generated on ${new Date().toLocaleDateString()}`]);
    
    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(worksheetData);
    
    // Set column widths
    ws['!cols'] = [
      { wch: 40 },  // Line Item column
      { wch: 18 }   // Amount column
    ];
    
    // Style the header rows (merge cells for title)
    if (!ws['!merges']) ws['!merges'] = [];
    ws['!merges'].push({ s: { r: 0, c: 0 }, e: { r: 0, c: 1 } });
    ws['!merges'].push({ s: { r: 1, c: 0 }, e: { r: 1, c: 1 } });
    ws['!merges'].push({ s: { r: 2, c: 0 }, e: { r: 2, c: 1 } });
    
    // Apply number formatting to amount cells
    const range = XLSX.utils.decode_range(ws['!ref']);
    for (let row = 0; row <= range.e.r; row++) {
      const cell = ws[XLSX.utils.encode_cell({ r: row, c: 1 })];
      if (cell && typeof cell.v === 'number') {
        cell.z = '#,##0.00';
      }
    }
    
    XLSX.utils.book_append_sheet(wb, ws, getReportTypeName().substring(0, 30));
    
    // Download
    XLSX.writeFile(wb, `${getReportTypeName().replace(/\s+/g, '_')}_${financialReportData.value.startDate}_to_${financialReportData.value.endDate}.xlsx`);
  } catch (error) {
    console.error('Excel export failed:', error);
    throw error;
  }
}

function buildFinancialReportHTML() {
  const grouped = groupLineItemsByCategory();
  
  let html = `
    <div style="font-family: 'Inter', sans-serif; padding: 20px;">
      <div style="text-center; margin-bottom: 30px;">
        <h1 style="margin: 0; font-size: 24px; color: #1F2937;">${getReportTypeName()}</h1>
        <p style="margin: 5px 0; color: #6B7280;">${financialReportData.value.companyName || 'Company Name'}</p>
        <p style="margin: 5px 0; font-size: 14px; color: #9CA3AF;">
          Period: ${formatDate(financialReportData.value.startDate)} to ${formatDate(financialReportData.value.endDate)}
        </p>
      </div>
  `;
  
  grouped.forEach(section => {
    html += `
      <div style="margin-bottom: 20px;">
        <h3 style="color: #1F2937; border-bottom: 2px solid #E5E7EB; padding-bottom: 5px; margin-bottom: 10px;">
          ${section.category}
        </h3>
        <table style="width: 100%; border-collapse: collapse; margin-left: 20px;">
    `;
    
    section.items.forEach(item => {
      html += `
        <tr>
          <td style="padding: 5px 0; color: #4B5563;">${item.name}</td>
          <td style="padding: 5px 0; text-align: right; font-weight: 500;">${formatCurrency(item.amount)}</td>
        </tr>
      `;
    });
    
    html += `
          <tr style="border-top: 1px solid #E5E7EB;">
            <td style="padding: 8px 0; font-weight: bold; color: #1F2937;">Total ${section.category}</td>
            <td style="padding: 8px 0; text-align: right; font-weight: bold;">${formatCurrency(section.total)}</td>
          </tr>
        </table>
      </div>
    `;
  });
  
  // Final totals
  html += `
    <div style="background-color: #F9FAFB; padding: 15px; border-radius: 8px; margin-top: 30px;">
  `;
  
  const totals = calculateReportTotals();
  totals.forEach(total => {
    const color = total.color ? (total.color.includes('059669') ? '#059669' : '#DC2626') : '#1F2937';
    html += `
      <div style="display: flex; justify-between; padding: 5px 0; ${total.bold ? 'font-weight: bold; font-size: 18px;' : ''}">
        <span style="color: ${color};">${total.label}</span>
        <span style="color: ${color};">${formatCurrency(total.amount)}</span>
      </div>
    `;
  });
  
  html += `
    </div>
    </div>
  `;
  
  return html;
}

// Date range presets for the Generate Report modal
// Options: daily (today), weekly (this week), monthly (this month), quarterly (this quarter), yearly (this year), custom range
const rangePreset = ref('monthly');

function toDateInputValue(date) {
  // Convert to local YYYY-MM-DD suitable for <input type="date">
  const tzOffset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - tzOffset * 60000);
  return local.toISOString().split('T')[0];
}

function getQuarterStartEnd(d) {
  const month = d.getMonth(); // 0-11
  const qStartMonth = Math.floor(month / 3) * 3; // 0,3,6,9
  const start = new Date(d.getFullYear(), qStartMonth, 1);
  const end = new Date(d.getFullYear(), qStartMonth + 3, 0); // last day of quarter
  return { start, end };
}

function getWeekStartEnd(d) {
  // Monday as start of week
  const day = d.getDay(); // 0 = Sun, 1 = Mon ... 6 = Sat
  const diffToMon = day === 0 ? -6 : 1 - day;
  const start = new Date(d);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() + diffToMon);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return { start, end };
}

function computePresetDates(preset) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  if (preset === 'daily') {
    return { start: now, end: now };
  }
  if (preset === 'weekly') {
    return getWeekStartEnd(now);
  }
  if (preset === 'monthly') {
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return { start, end };
  }
  if (preset === 'quarterly') {
    return getQuarterStartEnd(now);
  }
  if (preset === 'yearly') {
    const start = new Date(now.getFullYear(), 0, 1);
    const end = new Date(now.getFullYear(), 12, 0);
    return { start, end };
  }
  // custom
  return { start: null, end: null };
}

watch(rangePreset, (p) => {
  const { start, end } = computePresetDates(p);
  if (start && end) {
    newReport.value.startDate = toDateInputValue(start);
    newReport.value.endDate = toDateInputValue(end);
  } else {
    // Custom range: do not override any manually-entered dates
    if (!newReport.value.startDate) newReport.value.startDate = '';
    if (!newReport.value.endDate) newReport.value.endDate = '';
  }
}, { immediate: true });

// Preview logic
const showPreview = ref(false);
const previewHtml = ref('');
const previewContainer = ref(null);

function openPreview() {
  previewHtml.value = buildReportPreviewHtml();
  showPreview.value = true;
  // Ask MathJax to typeset after DOM updates
  nextTick(() => {
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise();
    }
  });
}

async function downloadDocx() {
  try {
    const docx = await import('docx');
    const { Document, Packer, Paragraph, HeadingLevel, Table, TableRow, TableCell, WidthType, AlignmentType, TextRun, BorderStyle } = docx;

    const title = new Paragraph({ 
      text: newReport.value.reportTitle || 'Report', 
      heading: HeadingLevel.TITLE, 
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 } 
    });
    
    const subtitle = new Paragraph({ 
      children: [
        new TextRun({
          text: newReport.value.companyName || '',
          bold: true,
          size: 32, // 16pt
        })
      ],
      alignment: AlignmentType.CENTER
    });

    const addressLines = (newReport.value.companyAddress || '').split('\n').map(line => new Paragraph({
      text: line,
      alignment: AlignmentType.CENTER
    }));

    const daterange = new Paragraph({ 
      text: `Period: ${formatDate(newReport.value.startDate)} – ${formatDate(newReport.value.endDate)}`, 
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 400 } 
    });

    const makeTable = (headers, rows) => new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          tableHeader: true,
          children: headers.map(h => new TableCell({ 
            children: [new Paragraph({ text: h, bold: true })],
            shading: { fill: "F9FAFB" }
          }))
        }),
        ...rows.map(r => new TableRow({ children: r.map(c => new TableCell({ children: [new Paragraph(String(c))] })) }))
      ],
      borders: { top: { style: BorderStyle.SINGLE, size: 1, color: 'E5E7EB' }, bottom: { style: BorderStyle.SINGLE, size: 1, color: 'E5E7EB' }, left: { style: BorderStyle.SINGLE, size: 1, color: 'E5E7EB' }, right: { style: BorderStyle.SINGLE, size: 1, color: 'E5E7EB' }, insideH: { style: BorderStyle.SINGLE, size: 1, color: 'F3F4F6' }, insideV: { style: BorderStyle.SINGLE, size: 1, color: 'F3F4F6' } }
    });

    const sections = [
      title,
      subtitle,
      ...addressLines,
      daterange
    ];

  if (newReport.value.type === 'financial') {
      sections.push(new Paragraph({ text: 'Income Statement', heading: HeadingLevel.HEADING_2 }));
      sections.push(makeTable(['Item', `Amount (${currencyCode.value || 'ZMW'})`], [
        ['Revenue', formatWithSymbol(financials.value.revenue)],
        ['VAT', `-${formatWithSymbol(financials.value.vat)}`],
        ['Gross Profit', formatWithSymbol(financials.value.grossProfit)],
        ['Total Expenses', `-${formatWithSymbol(financials.value.expenses)}`],
        ['Net Profit', formatWithSymbol(financials.value.netProfit)]
      ]));

      sections.push(new Paragraph({ text: 'Financial Ratios', heading: HeadingLevel.HEADING_2 }));
      sections.push(makeTable(['Metric', 'Value'], [
        ['Net Worth', formatWithSymbol(netWorth.value)],
        ['Total Equity & Liabilities', formatWithSymbol(totalEquityAndLiabilities.value)],
        ['Debt to Equity Ratio', formatNumber(debtToEquityRatio.value)]
      ]));

      sections.push(new Paragraph({ text: 'Tax Summary', heading: HeadingLevel.HEADING_2 }));
      sections.push(makeTable(['Metric', 'Value'], [
        ['Total Tax Paid', formatWithSymbol(taxSummary.value.totalTaxPaid)],
        ['Outstanding Tax', formatWithSymbol(taxSummary.value.outstandingTax)],
        ['Next Due Date', formatDate(taxSummary.value.nextDueDate)],
        ['Compliance Score', `${taxSummary.value.complianceScore}%`]
      ]));

      sections.push(new Paragraph({ text: 'Recent Tax Payments', heading: HeadingLevel.HEADING_3 }));
      const taxRows = (taxHistory.value || []).map(p => [
        formatPeriod(p.tax_period),
        formatWithSymbol(p.amount),
        p.status,
        formatDate(p.payment_date)
      ]);
      sections.push(makeTable(['Period', 'Amount', 'Status', 'Payment Date'], taxRows.length ? taxRows : [['No tax payment history available', '', '', '']]));

      sections.push(new Paragraph({ text: 'Recent Invoices / Proposals', heading: HeadingLevel.HEADING_3 }));
  const invRows = (invoices.value || []).map(inv => [inv.title || '', formatWithSymbol(inv.amount)]);
      const invTable = makeTable(['Title', `Amount (${currencyCode.value || 'ZMW'})`], invRows.length ? invRows : [['No invoices available', '']]);
      sections.push(invTable);
  sections.push(new Paragraph({ text: `Total Invoices: ${formatWithSymbol((invoicesSummary.value?.totalAmount) || 0)}`, spacing: { after: 200 } }));

      sections.push(new Paragraph({ text: 'Equity & Capital', heading: HeadingLevel.HEADING_2 }));
      sections.push(makeTable(['Item', `Amount (${currencyCode.value || 'ZMW'})`], [
        ['Capital Contributions', formatWithSymbol(equity.value.capitalContributions)],
        ['Grants', formatWithSymbol(equity.value.grants)],
        ['Retained Earnings', formatWithSymbol(equity.value.retainedEarnings)],
        ['Dividends Paid', `-${formatWithSymbol(equity.value.dividendsPaid)}`],
        ['Total Equity', formatWithSymbol(equity.value.total)]
      ]));

      sections.push(new Paragraph({ text: 'Liabilities', heading: HeadingLevel.HEADING_2 }));
      sections.push(makeTable(['Item', `Amount (${currencyCode.value || 'ZMW'})`, 'Due Date'], [
        ['Outstanding Loans', formatWithSymbol(liabilities.value.loans), formatDate(liabilities.value.loansDueDate)],
        ['Tax Payable', formatWithSymbol(liabilities.value.taxPayable), formatDate(liabilities.value.taxDueDate)],
        ['Other Liabilities', formatWithSymbol(liabilities.value.other), '-'],
        ['Total Liabilities', formatWithSymbol(liabilities.value.total), '-']
      ]));
    } else if (newReport.value.type === 'income') {
      // Income Statement only
      sections.push(new Paragraph({ text: 'Income Statement', heading: HeadingLevel.HEADING_2 }));
      sections.push(makeTable(['Item', `Amount (${currencyCode.value || 'ZMW'})`], [
        ['Revenue', formatWithSymbol(financials.value.revenue)],
        ['VAT', `-${formatWithSymbol(financials.value.vat)}`],
        ['Gross Profit', formatWithSymbol(financials.value.grossProfit)],
        ['Total Expenses', `-${formatWithSymbol(financials.value.expenses)}`],
        ['Net Profit', formatWithSymbol(financials.value.netProfit)]
      ]));
    } else if (newReport.value.type === 'sales') {
      sections.push(new Paragraph({ text: 'Sales Metrics', heading: HeadingLevel.HEADING_2 }));
      sections.push(makeTable(['Metric', 'Value'], (salesMetrics.value || []).map(m => [m.name, m.value])));

      sections.push(new Paragraph({ text: 'Monthly Sales Comparison', heading: HeadingLevel.HEADING_2 }));
      const ds = (salesChartData.value?.datasets) || [];
      const revenue = ds[0]?.data || [0,0];
      const expenses = ds[1]?.data || [0,0];
      const net = ds[2]?.data || [0,0];
      sections.push(makeTable(['Period', 'Revenue', 'Expenses', 'Net Profit'], [
        ['Previous Month', formatWithSymbol(revenue[0]||0), formatWithSymbol(expenses[0]||0), formatWithSymbol(net[0]||0)],
        ['Current Month', formatWithSymbol(revenue[1]||0), formatWithSymbol(expenses[1]||0), formatWithSymbol(net[1]||0)]
      ]));
    } else if (newReport.value.type === 'balance') {
      sections.push(new Paragraph({ text: 'Assets', heading: HeadingLevel.HEADING_2 }));
      sections.push(makeTable(['Asset', `Value (${currencyCode.value || 'ZMW'})`], (balanceSheet.value.assets || []).map(a => [a.name, formatWithSymbol(a.value)]).concat([
        ['Total Assets', formatWithSymbol(balanceSheet.value.totalAssets)]
      ])));

      sections.push(new Paragraph({ text: 'Liabilities', heading: HeadingLevel.HEADING_2 }));
      sections.push(makeTable(['Liability', `Value (${currencyCode.value || 'ZMW'})`], (balanceSheet.value.liabilities || []).map(l => [l.name, formatWithSymbol(l.value)]).concat([
        ['Total Liabilities', formatWithSymbol(balanceSheet.value.totalLiabilities)]
      ])));
    } else if (newReport.value.type === 'inventory') {
      sections.push(new Paragraph({ text: 'Inventory Report', heading: HeadingLevel.HEADING_2 }));
      sections.push(makeTable(['Item', 'Quantity', `Value (${currencyCode.value || 'ZMW'})`], (inventoryItemsList.value || []).map(i => [i.name, String(i.quantity), formatWithSymbol(i.value)]).concat([
        ['Total', String(inventoryItems.value), formatWithSymbol(inventoryValue.value)]
      ])));
    } else if (newReport.value.type === 'full') {
      // Compose all sections except delivery notes
      // 1) Financial summary
      sections.push(new Paragraph({ text: 'Income Statement', heading: HeadingLevel.HEADING_2 }));
      sections.push(makeTable(['Item', `Amount (${currencyCode.value || 'ZMW'})`], [
        ['Revenue', formatWithSymbol(financials.value.revenue)],
        ['VAT', `-${formatWithSymbol(financials.value.vat)}`],
        ['Gross Profit', formatWithSymbol(financials.value.grossProfit)],
        ['Total Expenses', `-${formatWithSymbol(financials.value.expenses)}`],
        ['Net Profit', formatWithSymbol(financials.value.netProfit)]
      ]));
      sections.push(new Paragraph({ text: 'Financial Ratios', heading: HeadingLevel.HEADING_2 }));
      sections.push(makeTable(['Metric', 'Value'], [
        ['Net Worth', formatWithSymbol(netWorth.value)],
        ['Total Equity & Liabilities', formatWithSymbol(totalEquityAndLiabilities.value)],
        ['Debt to Equity Ratio', formatNumber(debtToEquityRatio.value)]
      ]));
      sections.push(new Paragraph({ text: 'Tax Summary', heading: HeadingLevel.HEADING_2 }));
      sections.push(makeTable(['Metric', 'Value'], [
        ['Total Tax Paid', formatWithSymbol(taxSummary.value.totalTaxPaid)],
        ['Outstanding Tax', formatWithSymbol(taxSummary.value.outstandingTax)],
        ['Next Due Date', formatDate(taxSummary.value.nextDueDate)],
        ['Compliance Score', `${taxSummary.value.complianceScore}%`]
      ]));
      // 2) Invoices
      sections.push(new Paragraph({ text: 'Recent Invoices / Proposals', heading: HeadingLevel.HEADING_3 }));
      const invRowsFull = (invoices.value || []).map(inv => [inv.title || '', formatWithSymbol(inv.amount)]);
      sections.push(makeTable(['Title', `Amount (${currencyCode.value || 'ZMW'})`], invRowsFull.length ? invRowsFull : [['No invoices available', '']]));
      sections.push(new Paragraph({ text: `Total Invoices: ${formatWithSymbol((invoicesSummary.value?.totalAmount) || 0)}`, spacing: { after: 200 } }));
      // 3) Equity & Liabilities
      sections.push(new Paragraph({ text: 'Equity & Capital', heading: HeadingLevel.HEADING_2 }));
      sections.push(makeTable(['Item', `Amount (${currencyCode.value || 'ZMW'})`], [
        ['Capital Contributions', formatWithSymbol(equity.value.capitalContributions)],
        ['Grants', formatWithSymbol(equity.value.grants)],
        ['Retained Earnings', formatWithSymbol(equity.value.retainedEarnings)],
        ['Dividends Paid', `-${formatWithSymbol(equity.value.dividendsPaid)}`],
        ['Total Equity', formatWithSymbol(equity.value.total)]
      ]));
      sections.push(new Paragraph({ text: 'Liabilities', heading: HeadingLevel.HEADING_2 }));
      sections.push(makeTable(['Item', `Amount (${currencyCode.value || 'ZMW'})`, 'Due Date'], [
        ['Outstanding Loans', formatWithSymbol(liabilities.value.loans), formatDate(liabilities.value.loansDueDate)],
        ['Tax Payable', formatWithSymbol(liabilities.value.taxPayable), formatDate(liabilities.value.taxDueDate)],
        ['Other Liabilities', formatWithSymbol(liabilities.value.other), '-'],
        ['Total Liabilities', formatWithSymbol(liabilities.value.total), '-']
      ]));
      // 4) Sales
      sections.push(new Paragraph({ text: 'Sales Metrics', heading: HeadingLevel.HEADING_2 }));
      sections.push(makeTable(['Metric', 'Value'], (salesMetrics.value || []).map(m => [m.name, m.value])));
      const dsFull = (salesChartData.value?.datasets) || [];
      const revenueFull = dsFull[0]?.data || [0,0];
      const expensesFull = dsFull[1]?.data || [0,0];
      const netFull = dsFull[2]?.data || [0,0];
      sections.push(new Paragraph({ text: 'Monthly Sales Comparison', heading: HeadingLevel.HEADING_2 }));
      sections.push(makeTable(['Period', 'Revenue', 'Expenses', 'Net Profit'], [
        ['Previous Month', formatWithSymbol(revenueFull[0]||0), formatWithSymbol(expensesFull[0]||0), formatWithSymbol(netFull[0]||0)],
        ['Current Month', formatWithSymbol(revenueFull[1]||0), formatWithSymbol(expensesFull[1]||0), formatWithSymbol(netFull[1]||0)]
      ]));
      // 5) Balance
      sections.push(new Paragraph({ text: 'Assets', heading: HeadingLevel.HEADING_2 }));
      sections.push(makeTable(['Asset', `Value (${currencyCode.value || 'ZMW'})`], (balanceSheet.value.assets || []).map(a => [a.name, formatWithSymbol(a.value)]).concat([
        ['Total Assets', formatWithSymbol(balanceSheet.value.totalAssets)]
      ])));
      sections.push(new Paragraph({ text: 'Liabilities', heading: HeadingLevel.HEADING_2 }));
      sections.push(makeTable(['Liability', `Value (${currencyCode.value || 'ZMW'})`], (balanceSheet.value.liabilities || []).map(l => [l.name, formatWithSymbol(l.value)]).concat([
        ['Total Liabilities', formatWithSymbol(balanceSheet.value.totalLiabilities)]
      ])));
      // 6) Inventory
      sections.push(new Paragraph({ text: 'Inventory Report', heading: HeadingLevel.HEADING_2 }));
      sections.push(makeTable(['Item', 'Quantity', `Value (${currencyCode.value || 'ZMW'})`], (inventoryItemsList.value || []).map(i => [i.name, String(i.quantity), formatWithSymbol(i.value)]).concat([
        ['Total', String(inventoryItems.value), formatWithSymbol(inventoryValue.value)]
      ])));
      // 7) Hotel Sales
      sections.push(new Paragraph({ text: 'Hotel Sales Summary', heading: HeadingLevel.HEADING_2 }));
      sections.push(makeTable(['Metric', 'Value'], [
        ['Total Hotel Revenue', formatWithSymbol(hotelSales.value.total)],
        ['Room Revenue', formatWithSymbol(hotelSales.value.room_rev)],
        ['Conference Revenue', formatWithSymbol(hotelSales.value.conf_rev)],
        ['Service Revenue', formatWithSymbol(hotelSales.value.serv_rev)]
      ]));
    } else if (newReport.value.type === 'hotel') {
      sections.push(new Paragraph({ text: 'Hotel Sales Report', heading: HeadingLevel.HEADING_2 }));
      sections.push(makeTable(['Metric', 'Value', 'Percentage'], [
        ['Room Revenue', formatWithSymbol(hotelSales.value.room_rev), `${hotelSales.value.room_pct}%`],
        ['Conference Revenue', formatWithSymbol(hotelSales.value.conf_rev), `${hotelSales.value.conf_pct}%`],
        ['Service Revenue', formatWithSymbol(hotelSales.value.serv_rev), `${hotelSales.value.serv_pct}%`],
        ['Total Hotel Revenue', formatWithSymbol(hotelSales.value.total), '100%']
      ]));

      sections.push(new Paragraph({ text: 'Daily Summary (Last 10 Days)', heading: HeadingLevel.HEADING_3 }));
      const dailyRows = (hotelSales.value.daily_revenue || []).slice(-10).map(d => [formatDate(d.date), formatWithSymbol(d.amount)]);
      sections.push(makeTable(['Date', 'Amount'], dailyRows.length ? dailyRows : [['No daily data available', '']]));

      sections.push(new Paragraph({ text: 'Recent Hotel Transactions', heading: HeadingLevel.HEADING_3 }));
      const hotelTransRows = (hotelSales.value.transactions || []).filter(t => t.type !== 'summary').map(t => [
        t.receipt_number || (t.id ? t.id.substring(0,12) : '—'),
        t.customer || '-',
        t.category || 'room',
        formatWithSymbol(t.amount),
        formatDate(t.date)
      ]);
      sections.push(makeTable(['Receipt #', 'Customer', 'Type', 'Amount', 'Date'], hotelTransRows.length ? hotelTransRows : [['No hotel transactions available', '', '', '', '']]));
    }

    const doc = new Document({ sections: [{ properties: {}, children: sections }] });
    const blob = await Packer.toBlob(doc);
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${(newReport.value.reportTitle || 'report').replace(/\s+/g,'_')}.docx`;
    document.body.appendChild(a); a.click(); a.remove();
  } catch (e) {
    console.error('DOCX export failed:', e);
    alert('DOCX export failed.');
  }
}

async function downloadPdfClient() {
  const filename = `${(newReport.value.reportTitle || 'report').replace(/\s+/g,'_')}.pdf`;
  let tempDiv = null;
  try {
    // Resolve a target element that has actual rendered content.
    let targetEl = previewContainer?.value;
    const needsTemp = !targetEl || !targetEl.innerHTML || !targetEl.offsetHeight;
    if (needsTemp) {
      const body = buildReportPreviewHtml();
      tempDiv = document.createElement('div');
      // Render offscreen but visible to layout engine (NOT display:none — html2canvas needs real layout)
      tempDiv.style.position = 'fixed';
      tempDiv.style.left = '-10000px';
      tempDiv.style.top = '0';
      tempDiv.style.width = '800px';
      tempDiv.style.background = '#ffffff';
      tempDiv.style.padding = '24px';
      tempDiv.style.zIndex = '-1';
      tempDiv.innerHTML = body;
      document.body.appendChild(tempDiv);
      targetEl = tempDiv;
    }

    // Typeset MathJax if available so equations render
    if (window.MathJax && window.MathJax.typesetPromise) {
      try { await window.MathJax.typesetPromise([targetEl]); } catch (_) { /* non-fatal */ }
    }
    // Allow layout/fonts to settle
    await new Promise(r => setTimeout(r, 120));

    const [{ default: html2canvas }, jspdfMod] = await Promise.all([
      import('html2canvas'),
      import('jspdf'),
    ]);
    const jsPDF = jspdfMod.jsPDF || jspdfMod.default;

    const canvas = await html2canvas(targetEl, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: targetEl.scrollWidth,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const imgWidth = pageWidth - margin * 2;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = margin;
    pdf.addImage(imgData, 'JPEG', margin, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= (pageHeight - margin * 2);

    while (heightLeft > 0) {
      position = margin - (imgHeight - heightLeft);
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', margin, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= (pageHeight - margin * 2);
    }

    pdf.save(filename);
  } catch (e) {
    console.error('Client PDF export failed:', e);
    alert(`PDF export failed: ${e?.message || e}`);
  } finally {
    if (tempDiv && tempDiv.parentNode) tempDiv.parentNode.removeChild(tempDiv);
  }
}
function downloadHtmlPreview() {
  try {
    const body = buildReportPreviewHtml();
    const open = '<scr' + 'ipt>';
    const close = '</scr' + 'ipt>';
    const mathjax = `\n${open}window.MathJax={tex:{inlineMath:[["$","$"],["\\(","\\)"]]},svg:{fontCache:'global'}};${close}\n<scr` + `ipt src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js" async></scr` + `ipt>`;
    const html = `<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8"/>\n<meta name="viewport" content="width=device-width, initial-scale=1"/>\n<title>${(newReport.value.reportTitle || 'Report Preview').replace(/</g,'&lt;')}</title>${mathjax}\n</head>\n<body>${body}</body>\n</html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${(newReport.value.reportTitle || 'report').replace(/\s+/g,'_')}.html`;
    document.body.appendChild(a); a.click(); a.remove();
  } catch (e) {
    console.error('HTML export failed:', e);
    alert('HTML export failed.');
  }
}


onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<style src="./css/ReportsModule.css" scoped></style>
<style src="./css/PosModule.css" scoped></style>