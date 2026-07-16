<template>
  <div class="min-h-screen flex flex-col font-inter relative text-gray-900 bg-white">
    <!-- Premium Font Imports -->
    <component is="style">
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800;900&display=swap');
    </component>

    <!-- Mesh Background -->
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background opacity-40"></div>

    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-2 h-8 bg-[#2F2E8B] rounded-sm"></div>
          <div>
              <div class="flex items-center gap-2">
                 <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">SYS_ADMIN // REVENUE</span>
              </div>
              <h1 class="text-2xl font-black text-gray-900 uppercase tracking-tighter font-outfit">Revenue Overview</h1>
          </div>
        </div>
        
        <div class="flex items-center gap-3">
           <button 
             @click="fetchAllData" 
             class="bg-[#2F2E8B] hover:bg-[#1D226B] text-white px-4 py-2 rounded-sm text-xs font-bold font-mono uppercase shadow-md transition-all flex items-center gap-2 active:scale-95"
           >
             <i class="fas fa-sync-alt" :class="{'animate-spin': loading}"></i>
             REFRESH_DATA
           </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-40 relative z-10">
      
      <!-- Filter Section -->
      <div class="mb-8 flex flex-wrap items-center gap-6 bg-white p-4 border border-gray-200 shadow-sm rounded-sm animate-fade-in">
         <div class="flex items-center gap-3">
           <label class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Billing Cycle:</label>
           <select v-model="filterCycle" class="border-gray-200 rounded-sm shadow-sm focus:border-[#2F2E8B] focus:ring-[#2F2E8B] text-xs font-bold text-gray-700 bg-gray-50 py-1 pl-2 pr-8">
             <option value="">ALL_CYCLES</option>
             <option value="monthly">MONTHLY</option>
             <option value="yearly">YEARLY</option>
           </select>
         </div>

         <div class="flex items-center gap-3">
           <label class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Payment Status:</label>
           <select v-model="filterStatus" class="border-gray-200 rounded-sm shadow-sm focus:border-[#2F2E8B] focus:ring-[#2F2E8B] text-xs font-bold text-gray-700 bg-gray-50 py-1 pl-2 pr-8">
             <option value="">ALL_STATUSES</option>
             <option value="paid">PAID</option>
             <option value="pending">PENDING</option>
           </select>
         </div>

         <div class="ml-auto">
            <button 
              @click="exportToExcel"
              class="text-[10px] font-mono font-bold text-[#2F2E8B] uppercase tracking-widest flex items-center gap-1 hover:underline active:scale-95 transition-all"
            >
              <i class="fas fa-file-export"></i> EXPORT_EXCEL
            </button>
         </div>
      </div>

      <!-- Top Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 animate-fade-in-up">
        <!-- Expected Revenue Card -->
        <div class="kpi-card group border-l-4 border-l-[#2F2E8B]">
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-2 py-0.5 text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest rounded-bl-sm z-20">STAT_01</div>
          <div class="kpi-pattern"></div>
          <div class="flex justify-between items-start mb-6 relative z-10">
            <div class="kpi-icon-wrapper text-[#2F2E8B] bg-blue-50">
              <i class="fas fa-file-invoice text-lg"></i>
            </div>
          </div>
          <div class="relative z-10">
            <h3 class="kpi-value">K{{ formatPrice(summary.totalExpected) }}</h3>
            <p class="kpi-label">Expected Revenue</p>
          </div>
        </div>

        <!-- Paid Card -->
        <div class="kpi-card group border-l-4 border-l-green-500">
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-2 py-0.5 text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest rounded-bl-sm z-20">STAT_02</div>
          <div class="kpi-pattern"></div>
          <div class="flex justify-between items-start mb-6 relative z-10">
            <div class="kpi-icon-wrapper text-green-600 bg-green-50">
              <i class="fas fa-check-circle text-lg"></i>
            </div>
          </div>
          <div class="relative z-10">
            <h3 class="kpi-value font-outfit">K{{ formatPrice(summary.totalPaid) }}</h3>
            <p class="kpi-label text-green-600/80">Actually Paid</p>
          </div>
        </div>

        <!-- Pending Card -->
        <div class="kpi-card group border-l-4 border-l-orange-500">
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-2 py-0.5 text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest rounded-bl-sm z-20">STAT_03</div>
          <div class="kpi-pattern"></div>
          <div class="flex justify-between items-start mb-6 relative z-10">
            <div class="kpi-icon-wrapper text-orange-500 bg-orange-50">
              <i class="fas fa-clock text-lg"></i>
            </div>
          </div>
          <div class="relative z-10">
            <h3 class="kpi-value font-outfit">K{{ formatPrice(summary.totalPending) }}</h3>
            <p class="kpi-label text-orange-600/80">Pending (Due)</p>
          </div>
        </div>

        <!-- Discounts Card -->
        <div class="kpi-card group border-l-4 border-l-purple-600">
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-2 py-0.5 text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest rounded-bl-sm z-20">STAT_04</div>
          <div class="kpi-pattern"></div>
          <div class="flex justify-between items-start mb-6 relative z-10">
            <div class="kpi-icon-wrapper text-purple-600 bg-purple-50">
              <i class="fas fa-tags text-lg"></i>
            </div>
          </div>
          <div class="relative z-10">
            <h3 class="kpi-value font-outfit">K{{ formatPrice(summary.totalDiscounts) }}</h3>
            <p class="kpi-label text-purple-600/80">Discounts Given</p>
          </div>
        </div>
      </div>

      <!-- Tenant Revenue Table -->
      <div class="bg-white p-6 border border-gray-200 shadow-sm rounded-sm mb-8 animate-fade-in delay-75">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xs font-black text-gray-900 uppercase tracking-widest font-outfit flex items-center gap-2">
             <i class="fas fa-list-ul text-gray-400 text-xs"></i> Tenant Revenue Breakdown
          </h3>
          <div class="flex items-center gap-2">
            <span class="text-[10px] font-mono font-bold text-gray-400 uppercase">Tenants: {{ tenantRevenues.length }}</span>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-100 border border-gray-100">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">Tenant</th>
                <th class="px-4 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">Tier / Cycle</th>
                <th class="px-4 py-3 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">Duration (months)</th>
                <th class="px-4 py-3 text-right text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">Base Cost</th>
                <th class="px-4 py-3 text-right text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">Discounts</th>
                <th class="px-4 py-3 text-right text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">Final Price</th>
                <th class="px-4 py-3 text-right text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">Paid</th>
                <th class="px-4 py-3 text-right text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">Pending</th>
                <th class="px-4 py-3 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">Status</th>
                <th class="px-4 py-3 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-100">
              <tr v-if="loading" class="animate-pulse">
                <td colspan="10" class="px-6 py-8 text-center text-xs font-mono text-gray-400 uppercase">Loading Financial Data...</td>
              </tr>
              <tr v-else-if="tenantRevenues.length === 0">
                 <td colspan="10" class="px-6 py-8 text-center text-xs font-mono text-gray-400 uppercase">
                    // NO_TENANT_REVENUE_DATA_FOUND
                 </td>
              </tr>
              <tr v-for="tenant in tenantRevenues" :key="tenant.tenant_id" class="hover:bg-gray-50 transition-colors">
                <td class="px-4 py-4 whitespace-nowrap">
                  <div class="text-xs font-bold text-gray-900 uppercase">{{ tenant.business_name }}</div>
                  <div class="text-[9px] font-mono text-gray-400">{{ tenant.tenant_id }}</div>
                </td>
                <td class="px-4 py-4 whitespace-nowrap">
                  <span class="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-sm mr-1" 
                    :class="getTierBadgeClass(tenant.tier)">
                    {{ tenant.tier }}
                  </span>
                  <span class="text-[9px] font-mono font-bold text-gray-500 uppercase">{{ tenant.billing_cycle }}</span>
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-center text-xs font-mono text-gray-600">
                  {{ tenant.duration_months || (tenant.billing_cycle === 'yearly' ? 12 : (tenant.billing_cycle === 'monthly' ? 1 : '—')) }}
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-right text-xs font-mono text-gray-500">
                  K{{ formatPrice(tenant.base_cost) }}
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-right text-xs font-mono text-purple-600">
                  -K{{ formatPrice(tenant.discount_amount) }}
                  <span class="text-[9px] opacity-70">({{ tenant.discount_percent }}%)</span>
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-right text-xs font-mono font-bold text-gray-900">
                  K{{ formatPrice(tenant.final_cost) }}
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-right text-xs font-mono text-green-600">
                  K{{ formatPrice(tenant.total_paid) }}
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-right text-xs font-mono text-orange-600 font-bold">
                  K{{ formatPrice(tenant.outstanding) }}
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-center">
                  <span :class="tenant.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'"
                    class="text-[9px] font-bold px-2 py-1 rounded-sm uppercase font-mono">
                    {{ tenant.status }}
                  </span>
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-center">
                  <button @click="openPaymentModal(tenant)" class="text-[#2F2E8B] hover:text-[#1D226B] transition-colors p-1" title="Record Payment">
                    <i class="fas fa-cash-register"></i>
                  </button>
                  <button @click="openEditModal(tenant)" class="text-orange-600 hover:text-orange-800 transition-colors p-1 ml-2" title="Edit Subscription">
                    <i class="fas fa-edit"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Subscription Expectations Summary -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in delay-150">
         <div class="bg-white p-6 border border-gray-200 shadow-sm rounded-sm">
            <h4 class="text-[10px] font-black text-gray-900 uppercase tracking-widest font-outfit mb-6 flex items-center gap-2">
              <i class="fas fa-bullseye text-[#2F2E8B]"></i> Monthly Expectations
            </h4>
            <div class="space-y-4">
               <div class="flex justify-between items-center text-xs">
                 <span class="text-gray-500 font-mono">Gross Volume:</span>
                 <span class="font-bold">K{{ formatPrice(summary.totalGross) }}</span>
               </div>
               <div class="flex justify-between items-center text-xs">
                 <span class="text-gray-500 font-mono">Discount Impact:</span>
                 <span class="text-purple-600 font-bold">-K{{ formatPrice(summary.totalDiscounts) }}</span>
               </div>
               <div class="h-px bg-gray-100"></div>
               <div class="flex justify-between items-center text-sm">
                 <span class="text-gray-900 font-black uppercase tracking-tighter">Net Expected:</span>
                 <span class="font-black text-[#2F2E8B]">K{{ formatPrice(summary.totalExpected) }}</span>
               </div>
            </div>
         </div>

         <div class="bg-white p-6 border border-gray-200 shadow-sm rounded-sm overflow-hidden relative">
            <div class="absolute inset-0 dot-pattern opacity-30"></div>
            <h4 class="text-[10px] font-black text-gray-900 uppercase tracking-widest font-outfit mb-6 flex items-center gap-2 relative z-10">
              <i class="fas fa-chart-pie text-green-600"></i> Collection Progress
            </h4>
            <div class="relative pt-1 z-10">
              <div class="flex mb-2 items-center justify-between">
                <div>
                  <span class="text-[10px] font-mono font-bold inline-block py-1 px-2 uppercase rounded-sm text-green-600 bg-green-50">
                    Collection Rate
                  </span>
                </div>
                <div class="text-right">
                  <span class="text-[10px] font-mono font-bold inline-block text-green-600">
                    {{ calculateCollectionRate }}%
                  </span>
                </div>
              </div>
              <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-100">
                <div :style="`width: ${calculateCollectionRate}%`" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
              </div>
              <p class="text-[9px] text-gray-400 font-mono text-center">CURRENT_LIQUIDITY_VS_OUTSTANDING</p>
            </div>
         </div>
      </div>

      <!-- Payments Timeline Section -->
      <div class="bg-white p-6 border border-gray-200 shadow-sm rounded-sm mt-8 animate-fade-in delay-200">
        <div class="flex flex-wrap items-center justify-between mb-6 gap-4">
          <h3 class="text-xs font-black text-gray-900 uppercase tracking-widest font-outfit flex items-center gap-2">
            <i class="fas fa-money-bill-wave text-green-600 text-xs"></i> Payments Timeline
          </h3>
          <div class="flex flex-wrap items-center gap-3">
            <!-- Preset period buttons -->
            <div class="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-sm p-0.5">
              <button @click="setPaymentPeriod('weekly')"
                class="px-3 py-1.5 text-[9px] font-mono font-bold uppercase tracking-wider transition-colors rounded-sm"
                :class="paymentPeriod === 'weekly' ? 'bg-[#2F2E8B] text-white' : 'text-gray-500 hover:text-gray-800'">
                Weekly
              </button>
              <button @click="setPaymentPeriod('monthly')"
                class="px-3 py-1.5 text-[9px] font-mono font-bold uppercase tracking-wider transition-colors rounded-sm"
                :class="paymentPeriod === 'monthly' ? 'bg-[#2F2E8B] text-white' : 'text-gray-500 hover:text-gray-800'">
                Monthly
              </button>
              <button @click="setPaymentPeriod('custom')"
                class="px-3 py-1.5 text-[9px] font-mono font-bold uppercase tracking-wider transition-colors rounded-sm"
                :class="paymentPeriod === 'custom' ? 'bg-[#2F2E8B] text-white' : 'text-gray-500 hover:text-gray-800'">
                Custom
              </button>
            </div>
            <!-- Custom date inputs -->
            <div v-if="paymentPeriod === 'custom'" class="flex items-center gap-2">
              <input type="date" v-model="customStart" class="border-gray-200 rounded-sm text-xs font-mono py-1 px-2 focus:border-[#2F2E8B] focus:ring-[#2F2E8B]" />
              <span class="text-[9px] font-mono text-gray-400">to</span>
              <input type="date" v-model="customEnd" class="border-gray-200 rounded-sm text-xs font-mono py-1 px-2 focus:border-[#2F2E8B] focus:ring-[#2F2E8B]" />
              <button @click="fetchPayments"
                class="bg-[#2F2E8B] text-white px-3 py-1.5 rounded-sm text-[9px] font-mono font-bold uppercase hover:bg-[#1D226B] transition-colors">
                Apply
              </button>
            </div>
          </div>
        </div>

        <!-- Payment Summary Bar -->
        <div class="flex flex-wrap items-center gap-6 mb-6 p-3 bg-gray-50 border border-gray-100 rounded-sm">
          <div class="flex items-center gap-2">
            <span class="text-[10px] font-mono font-bold text-gray-400 uppercase">Period:</span>
            <span class="text-[10px] font-mono font-bold text-gray-700">{{ paymentsSummary.periodStart }} — {{ paymentsSummary.periodEnd }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-[10px] font-mono font-bold text-gray-400 uppercase">Total Paid:</span>
            <span class="text-sm font-black text-green-600 font-outfit">K{{ formatPrice(paymentsSummary.totalAmount) }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-[10px] font-mono font-bold text-gray-400 uppercase">Transactions:</span>
            <span class="text-[10px] font-mono font-bold text-[#2F2E8B]">{{ paymentsSummary.count }}</span>
          </div>
        </div>

        <!-- Payments Table -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-100 border border-gray-100">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">Tenant</th>
                <th class="px-4 py-3 text-right text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">Amount</th>
                <th class="px-4 py-3 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">Date</th>
                <th class="px-4 py-3 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">Method</th>
                <th class="px-4 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">Reference</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-100">
              <tr v-if="paymentsLoading" class="animate-pulse">
                <td colspan="5" class="px-6 py-8 text-center text-xs font-mono text-gray-400 uppercase">Loading_Payment_Records...</td>
              </tr>
              <tr v-else-if="paymentRecords.length === 0">
                <td colspan="5" class="px-6 py-8 text-center text-xs font-mono text-gray-400 uppercase">
                  // NO_PAYMENTS_FOUND_FOR_PERIOD
                </td>
              </tr>
              <tr v-for="p in paymentRecords" :key="p.payment_reference + p.payment_date" class="hover:bg-gray-50 transition-colors">
                <td class="px-4 py-3 whitespace-nowrap">
                  <div class="text-xs font-bold text-gray-900 uppercase">{{ p.business_name }}</div>
                  <div class="text-[9px] font-mono text-gray-400">{{ p.tenant_id }}</div>
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-right text-xs font-mono font-bold text-green-600">
                  {{ p.currency }}{{ formatPrice(p.amount) }}
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-center text-xs font-mono text-gray-600">
                  {{ formatDate(p.payment_date) }}
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-center">
                  <span class="text-[9px] font-mono font-bold px-2 py-0.5 rounded-sm uppercase"
                    :class="getMethodBadge(p.payment_method)">
                    {{ p.payment_method }}
                  </span>
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-xs font-mono text-gray-500">
                  {{ p.payment_reference }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </main>

    <!-- Payment Recording Modal (teleported to body for full overlay/blur) -->
    <Teleport to="body">
      <div v-if="showPaymentModal" class="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-md" @click="showPaymentModal = false"></div>
        <div class="relative bg-white border-2 border-[#2F2E8B] shadow-2xl rounded-sm w-full max-w-md z-[10000] overflow-hidden transform transition-all animate-fade-in-up">
          <div class="bg-[#2F2E8B] p-4 flex justify-between items-center">
            <h3 class="text-white text-xs font-black uppercase tracking-widest font-mono flex items-center gap-2">
              <i class="fas fa-cash-register"></i> Record_Tenant_Payment
            </h3>
            <button @click="showPaymentModal = false" class="text-white/70 hover:text-white">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="p-6 space-y-4">
            <div class="bg-gray-50 p-3 rounded-sm border border-gray-100">
              <p class="text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Tenant_Target</p>
              <p class="text-sm font-black text-gray-900 uppercase">{{ targetTenant.business_name }}</p>
              <p class="text-[10px] font-mono text-gray-500">{{ targetTenant.tenant_id }}</p>
            </div>
            
            <div>
              <label class="text-[10px] font-mono font-bold text-gray-400 uppercase block mb-1">Payment_Amount (K)</label>
              <input v-model="paymentForm.amount" type="number" class="w-full border-gray-200 rounded-sm font-mono text-sm focus:border-[#2F2E8B] focus:ring-[#2F2E8B]" placeholder="0.00">
            </div>

            <div>
              <label class="text-[10px] font-mono font-bold text-gray-400 uppercase block mb-1">Reference_# / ID</label>
              <input v-model="paymentForm.reference" type="text" class="w-full border-gray-200 rounded-sm font-mono text-xs focus:border-[#2F2E8B] focus:ring-[#2F2E8B]" placeholder="INV-2024-XXX">
            </div>

            <div class="flex gap-4">
              <div class="flex-1">
                <label class="text-[10px] font-mono font-bold text-gray-400 uppercase block mb-1">Method</label>
                <select v-model="paymentForm.method" class="w-full border-gray-200 rounded-sm text-xs font-mono py-2">
                  <option value="manual">Manual Transfer</option>
                  <option value="bank">Bank Deposit</option>
                  <option value="cash">Cash</option>
                  <option value="mobile_money">Mobile Money</option>
                </select>
              </div>
            </div>

            <button 
              @click="recordPayment"
              :disabled="submittingPayment"
              class="w-full bg-green-600 hover:bg-green-700 text-white font-mono font-black py-3 rounded-sm uppercase text-xs shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <i v-if="submittingPayment" class="fas fa-spinner fa-spin"></i>
              {{ submittingPayment ? 'Processing_Transaction...' : 'Sync_Payment_Record' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Edit Subscription Modal (teleported to body for full overlay/blur) -->
    <Teleport to="body">
      <div v-if="showEditModal" class="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-md" @click="showEditModal = false"></div>
        <div class="relative bg-white border-2 border-[#2F2E8B] shadow-2xl rounded-sm w-full max-w-md z-[10000] overflow-hidden transform transition-all animate-fade-in-up">
          <div class="bg-[#2F2E8B] p-4 flex justify-between items-center">
            <h3 class="text-white text-xs font-black uppercase tracking-widest font-mono flex items-center gap-2">
              <i class="fas fa-edit"></i> Edit_Subscription_Plan
            </h3>
            <button @click="showEditModal = false" class="text-white/70 hover:text-white">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="p-6 space-y-4">
            <div class="bg-gray-50 p-3 rounded-sm border border-gray-100">
              <p class="text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Target_Tenant</p>
              <p class="text-sm font-black text-gray-900 uppercase">{{ targetTenant.business_name }}</p>
              <p class="text-[10px] font-mono text-gray-500">{{ targetTenant.tenant_id }}</p>
            </div>
            
            <div>
              <label class="text-[10px] font-mono font-bold text-gray-400 uppercase block mb-1">Subscription_Tier</label>
              <select v-model="editForm.tier" class="w-full border-gray-200 rounded-sm text-xs font-mono py-2">
                <option value="enterprise">Enterprise</option>
                <option value="medium">Medium</option>
                <option value="small">Small</option>
                <option value="micro">Micro</option>
              </select>
            </div>

            <div>
              <label class="text-[10px] font-mono font-bold text-gray-400 uppercase block mb-2 tracking-wider">Billing Duration (Months)</label>
              <div class="flex items-center">
                <button @click="decrementMonths" class="w-10 h-10 border border-gray-200 bg-gray-50 text-gray-600 hover:bg-[#2F2E8B] hover:text-white transition-colors font-bold rounded-l-sm">-</button>
                <input type="number" v-model.number="editForm.months" min="1" class="block w-full text-center border-y border-gray-200 h-10 text-sm font-mono focus:ring-0 z-0">
                <button @click="incrementMonths" class="w-10 h-10 border border-gray-200 bg-gray-50 text-gray-600 hover:bg-[#2F2E8B] hover:text-white transition-colors font-bold rounded-r-sm">+</button>
              </div>
              <div class="mt-2 text-right">
                <span class="text-[10px] font-mono uppercase bg-gray-100 px-2 py-1 rounded-sm text-gray-500 tracking-wide"
                  :class="editForm.months >= 12 ? 'bg-green-100 text-green-700 font-bold' : ''">
                  {{ editForm.months >= 12 ? 'Yearly Rate (15% Off)' : 'Monthly Rate (0% Off)' }}
                </span>
              </div>
            </div>

            <button 
              @click="updateSubscription"
              :disabled="submittingEdit"
              class="w-full bg-[#2F2E8B] hover:bg-[#1D226B] text-white font-mono font-black py-3 rounded-sm uppercase text-xs shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <i v-if="submittingEdit" class="fas fa-spinner fa-spin"></i>
              {{ submittingEdit ? 'Updating_Plan...' : 'Save_Subscription_Changes' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import * as XLSX from 'xlsx';
import API_BASE_URL, { authFetch } from '@/api_services/api';

// State
const loading = ref(false);
const filterCycle = ref('');
const filterStatus = ref('');
const tenantRevenues = ref([]);
const summary = ref({
  totalExpected: 0,
  totalPaid: 0,
  totalPending: 0,
  totalDiscounts: 0,
  totalGross: 0,
  activeTenants: 0
});

// Modal State
const showPaymentModal = ref(false);
const submittingPayment = ref(false);
const targetTenant = ref({});
const paymentForm = ref({
  amount: 0,
  reference: '',
  method: 'manual'
});

// Payments Timeline State
const paymentPeriod = ref('monthly');
const customStart = ref('');
const customEnd = ref('');
const paymentRecords = ref([]);
const paymentsLoading = ref(false);
const paymentsSummary = ref({
  totalAmount: 0,
  count: 0,
  periodStart: '',
  periodEnd: ''
});

// Utils
const formatPrice = (val) => {
  return Number(val || 0).toLocaleString('en-ZM', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const getTierBadgeClass = (tier) => {
  const tiers = {
    enterprise: 'bg-gray-100 text-gray-800',
    medium: 'bg-purple-100 text-purple-800',
    small: 'bg-blue-100 text-blue-800',
    micro: 'bg-green-100 text-green-800'
  };
  return tiers[tier?.toLowerCase()] || 'bg-gray-100 text-gray-400';
};

const calculateCollectionRate = computed(() => {
  if (summary.value.totalExpected === 0) return 0;
  return Math.round((summary.value.totalPaid / summary.value.totalExpected) * 100);
});

// API Calls
const fetchOverview = async () => {
  try {
    let url = `${API_BASE_URL}/admin/revenue/overview`;
    if (filterCycle.value) url += `?cycle=${filterCycle.value}`;
    
    const resp = await authFetch(url);
    if (!resp.ok) throw new Error('Overview fetch failed');
    const data = await resp.json();
    summary.value = {
      totalExpected: data.total_expected || 0,
      totalPaid: data.total_paid || 0,
      totalPending: data.total_pending || 0,
      totalDiscounts: data.total_discounts || 0,
      totalGross: (data.total_expected || 0) + (data.total_discounts || 0),
      activeTenants: data.active_tenants || 0
    };
  } catch (err) {
    console.error('Overview Error:', err);
  }
};

const fetchTenantBreakdown = async () => {
  try {
    let url = `${API_BASE_URL}/admin/revenue/tenants`;
    const params = [];
    if (filterCycle.value) params.push(`cycle=${filterCycle.value}`);
    if (filterStatus.value) params.push(`status=${filterStatus.value}`);
    
    if (params.length) url += `?${params.join('&')}`;
    
    const resp = await authFetch(url);
    if (!resp.ok) throw new Error('Breakdown fetch failed');
    const data = await resp.json();
    tenantRevenues.value = data.tenants || [];
  } catch (err) {
    console.error('Breakdown Error:', err);
    tenantRevenues.value = [];
  }
};

const fetchAllData = async () => {
  loading.value = true;
  await Promise.all([fetchOverview(), fetchTenantBreakdown(), fetchPayments()]);
  loading.value = false;
};

// Payment Logic
const openPaymentModal = (tenant) => {
  targetTenant.value = tenant;
  paymentForm.value = {
    amount: tenant.outstanding,
    reference: `SYNC-${Date.now()}`,
    method: 'manual'
  };
  showPaymentModal.value = true;
};

const recordPayment = async () => {
  if (!paymentForm.value.amount || paymentForm.value.amount <= 0) {
    return alert('Please enter a valid amount');
  }

  submittingPayment.value = true;
  try {
    const resp = await authFetch(`${API_BASE_URL}/admin/revenue/payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tenant_id: targetTenant.value.tenant_id,
        amount: parseFloat(paymentForm.value.amount),
        payment_reference: paymentForm.value.reference,
        payment_method: paymentForm.value.method
      })
    });

    if (!resp.ok) throw new Error('Payment sync failed');
    
    await fetchAllData();
    showPaymentModal.value = false;
    alert('Payment synchronized successfully!');
  } catch (err) {
    console.error('Payment Error:', err);
    alert('Failed to record payment: ' + err.message);
  } finally {
    submittingPayment.value = false;
  }
};

// Edit Subscription Logic
const showEditModal = ref(false);
const submittingEdit = ref(false);
const editForm = ref({
  tier: '',
  billing_cycle: '',
  months: 1
});

const openEditModal = (tenant) => {
  targetTenant.value = tenant;
  editForm.value = {
    tier: tenant.tier?.toLowerCase() || 'enterprise',
    billing_cycle: tenant.billing_cycle?.toLowerCase() || 'monthly',
    months: tenant.duration_months || (tenant.billing_cycle?.toLowerCase() === 'yearly' ? 12 : 1)
  };
  showEditModal.value = true;
};

const updateSubscription = async () => {
  submittingEdit.value = true;
  try {
    // Map duration to cycle to stay compatible with backend API
    const derivedCycle = editForm.value.months >= 12 ? 'yearly' : 'monthly';
    const resp = await authFetch(`${API_BASE_URL}/admin/revenue/subscription`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tenant_id: targetTenant.value.tenant_id,
        tier: editForm.value.tier,
        billing_cycle: derivedCycle,
        duration_months: Number(editForm.value.months || 0)
      })
    });

    if (!resp.ok) throw new Error('Subscription update failed');
    
    await fetchAllData();
    showEditModal.value = false;
    alert('Subscription Plan Updated Successfully!');
  } catch (err) {
    console.error('Update Error:', err);
    alert('Failed to update subscription: ' + err.message);
  } finally {
    submittingEdit.value = false;
  }
};

const decrementMonths = () => {
  if (editForm.value.months > 1) {
    editForm.value.months -= 1;
  }
};

const incrementMonths = () => {
  editForm.value.months += 1;
};

// Payments Timeline Logic
const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-ZM', { year: 'numeric', month: 'short', day: 'numeric' });
};

const getMethodBadge = (method) => {
  const map = {
    bank: 'bg-blue-100 text-blue-700',
    cash: 'bg-green-100 text-green-700',
    mobile_money: 'bg-yellow-100 text-yellow-700',
    manual: 'bg-gray-100 text-gray-600'
  };
  return map[method] || 'bg-gray-100 text-gray-500';
};

const fetchPayments = async () => {
  paymentsLoading.value = true;
  try {
    let url = `${API_BASE_URL}/admin/revenue/payments`;
    const params = [];
    if (paymentPeriod.value === 'custom' && customStart.value && customEnd.value) {
      params.push(`start_date=${customStart.value}`);
      params.push(`end_date=${customEnd.value}`);
    } else if (paymentPeriod.value !== 'custom') {
      params.push(`period=${paymentPeriod.value}`);
    }
    if (params.length) url += `?${params.join('&')}`;

    const resp = await authFetch(url);
    if (!resp.ok) throw new Error('Payments fetch failed');
    const data = await resp.json();

    paymentRecords.value = data.payments || [];
    paymentsSummary.value = {
      totalAmount: data.total_amount || 0,
      count: data.payment_count || 0,
      periodStart: data.period_start ? formatDate(data.period_start) : '—',
      periodEnd: data.period_end ? formatDate(data.period_end) : '—'
    };
  } catch (err) {
    console.error('Payments Error:', err);
    paymentRecords.value = [];
  } finally {
    paymentsLoading.value = false;
  }
};

const setPaymentPeriod = (val) => {
  paymentPeriod.value = val;
  if (val !== 'custom') {
    fetchPayments();
  }
};

// Export Logic
const exportToExcel = () => {
  if (tenantRevenues.value.length === 0) {
    return alert('No data available to export');
  }

  // Map data for clean excel output
  const data = tenantRevenues.value.map(t => ({
    'Business Name': (t.business_name || 'N/A').toUpperCase(),
    'Tenant ID': t.tenant_id,
    'Subscription Tier': (t.tier || 'N/A').toUpperCase(),
    'Billing Cycle': (t.billing_cycle || 'N/A').toUpperCase(),
    'Duration (Months)': t.duration_months || 0,
    'Base Cost (K)': t.base_cost || 0,
    'Discount (K)': t.discount_amount || 0,
    'Discount (%)': t.discount_percent || 0,
    'Final Price (K)': t.final_cost || 0,
    'Total Paid (K)': t.total_paid || 0,
    'Outstanding (K)': t.outstanding || 0,
    'Payment Status': (t.status || 'PENDING').toUpperCase()
  }));

  // Create sheet and workbook
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  // Simple formatting: set column widths
  const wscols = [
    { wch: 25 }, // Business Name
    { wch: 15 }, // Tenant ID
    { wch: 15 }, // Tier
    { wch: 12 }, // Cycle
    { wch: 15 }, // Duration
    { wch: 12 }, // Base Cost
    { wch: 12 }, // Discount
    { wch: 12 }, // Discount %
    { wch: 12 }, // Final Price
    { wch: 12 }, // Paid
    { wch: 12 }, // Outstanding
    { wch: 12 }  // Status
  ];
  worksheet['!cols'] = wscols;

  XLSX.utils.book_append_sheet(workbook, worksheet, "Revenue_Breakdown");

  // Generate filename with date
  const dateStr = new Date().toISOString().split('T')[0];
  const filename = `SYS_ADMIN_REVENUE_REPORT_${dateStr}.xlsx`;

  XLSX.writeFile(workbook, filename);
};

// Watchers
watch([filterCycle, filterStatus], fetchAllData);

onMounted(fetchAllData);
</script>

<style scoped>
 .mesh-background {
  background-color: transparent;
  background-image: 
    linear-gradient(#e5e7eb 1px, transparent 1px),
    linear-gradient(90deg, #e5e7eb 1px, transparent 1px);
  background-size: 30px 30px;
}

.kpi-pattern {
  @apply absolute inset-0 pointer-events-none transition-opacity duration-300;
  background-image: radial-gradient(#e5e7eb 1px, transparent 1px);
  background-size: 20px 20px;
}

.font-inter { font-family: 'Inter', sans-serif; }
.font-outfit { font-family: 'Outfit', sans-serif; }
</style>
