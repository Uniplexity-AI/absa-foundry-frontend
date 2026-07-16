<template>
  <div class="min-h-screen flex flex-col font-sans relative text-gray-900 bg-white">
    <!-- Viewport Mesh Background (Fixed) -->
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <!-- Header -->
    <header class="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-[100] shadow-sm">
      <div class="w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-2 h-8 bg-[#2F2E8B] rounded-none"></div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Inventory // Logistics</span>
            </div>
            <h1 class="text-xl font-black text-gray-900 uppercase tracking-tight font-outfit">Supplier Management</h1>
          </div>
        </div>
        
        <div class="flex items-center gap-4">
           <!-- User Badge -->
          <div class="hidden md:flex items-center gap-2 text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider border-l border-gray-200 pl-4">
            <i class="fas fa-user-circle"></i>
            {{ getUserEmail?.()?.split('@')[0] || 'Operator' }}
          </div>
        </div>
      </div>
      <!-- Sub Navigation -->
      <div class="border-t border-gray-100 bg-gray-50/50">
        <div class="w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <nav class="flex -mb-px space-x-1 overflow-x-auto">
            <button v-for="tab in navTabs" :key="tab.id" @click="currentSubView = tab.id"
              :class="[currentSubView === tab.id ? 'border-[#2F2E8B] text-[#2F2E8B] bg-white' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 bg-transparent',
                'whitespace-nowrap py-2.5 px-4 border-b-2 font-bold text-[10px] font-mono uppercase tracking-wider transition-all flex items-center gap-2']">
              <i :class="tab.icon"></i>
              <span class="hidden sm:inline">{{ tab.label }}</span>
            </button>
          </nav>
        </div>
      </div>
    </header>

    <main class="flex-1 w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-6 sm:pt-8 md:pt-12 pb-8 relative z-10 space-y-4 sm:space-y-6 overflow-x-hidden">
      
      <!-- Back Button & Actions -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <button @click="router.push('/dashboard/home')" class="text-gray-500 hover:text-[#2F2E8B] font-mono text-xs uppercase flex items-center font-bold tracking-wide transition-colors">
          <i class="fas fa-arrow-left mr-2"></i> Back to Home
        </button>

        <div class="flex gap-2">
            <button @click="router.push('/dashboard/expenses/fixed-costs')" 
                class="bg-gray-800 hover:bg-gray-900 text-white px-4 sm:px-6 py-2 rounded-none text-xs font-bold font-mono uppercase shadow-md transition-all flex items-center gap-2">
            <i class="fas fa-calendar-check"></i> Fixed Costs
            </button>
            <button @click="openSupplierModal" 
                class="bg-[#2F2E8B] hover:bg-[#1D226B] text-white px-4 sm:px-6 py-2 rounded-none text-xs font-bold font-mono uppercase shadow-md transition-all flex items-center gap-2">
            <i class="fas fa-plus"></i> Add Supplier
            </button>
            <button @click="openPurchaseModal" 
                    class="bg-white border border-[#2F2E8B] text-[#2F2E8B] hover:bg-gray-50 px-4 sm:px-6 py-2 rounded-none text-xs font-bold font-mono uppercase shadow-sm transition-all flex items-center gap-2">
            <i class="fas fa-file-invoice-dollar"></i> New Purchase
            </button>
        </div>
      </div>

      <!-- Error Message -->
      <transition enter-active-class="transition duration-300 ease-out" enter-from-class="transform -translate-y-2 opacity-0" enter-to-class="transform translate-y-0 opacity-100">
        <div v-if="error" class="bg-red-50 border-l-4 border-red-500 p-4 mb-4 flex items-center gap-3 shadow-sm rounded-none">
          <i class="fas fa-exclamation-triangle text-red-500"></i>
          <p class="text-xs font-mono font-bold text-red-700 uppercase tracking-tight">System Error: {{ error }}</p>
        </div>
      </transition>

      <!-- ===== OVERVIEW VIEW ===== -->
      <template v-if="currentSubView === 'overview'">
      
      <!-- Search & Filters -->
      <div class="flex flex-col sm:flex-row gap-3 mb-4">
        <div class="relative flex-1">
          <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by name, TPIN, phone, email..."
            class="w-full border border-gray-200 rounded-none p-2 pl-8 focus:ring-2 focus:ring-[#2F2E8B]/10 focus:border-[#2F2E8B] transition text-sm text-gray-900 placeholder-gray-300"
          />
        </div>
        <select v-model="filterType"
          class="border border-gray-200 rounded-none p-2 text-sm text-gray-900 bg-white">
          <option value="">All Types</option>
          <option value="local">Local</option>
          <option value="international">International</option>
        </select>
        <select v-model="filterCategory"
          class="border border-gray-200 rounded-none p-2 text-sm text-gray-900 bg-white">
          <option value="">All Categories</option>
          <option v-for="c in supplierCategories" :key="c" :value="c">{{ c }}</option>
        </select>
        <select v-model="filterSyncStatus"
          class="border border-gray-200 rounded-none p-2 text-sm text-gray-900 bg-white">
          <option value="">All Sync Status</option>
          <option value="gov-synced">Government Synced</option>
          <option value="manual">Manual Only</option>
          <option value="has-errors">Has Errors</option>
          <option value="pending">Needs Validation</option>
        </select>
      </div>

      <!-- Suppliers Grid -->
      <div class="mb-8">
        <div class="flex items-center gap-2 mb-4">
            <div class="w-1.5 h-4 bg-[#2F2E8B] rounded-none"></div>
            <h3 class="text-sm font-bold text-gray-900 uppercase tracking-tight">Suppliers Directory</h3>
        </div>

        <div v-if="isLoadingSuppliers" class="py-12 text-center">
            <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#2F2E8B] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status"></div>
            <div class="mt-2 text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Loading suppliers...</div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
             <div v-if="filteredSuppliers.length === 0" class="col-span-full py-12 text-center bg-white border border-dashed border-gray-200 rounded-none">
                <i class="fas fa-truck text-4xl text-gray-200 mb-3"></i>
                <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">No suppliers found</p>
            </div>

            <div v-else v-for="supplier in filteredSuppliers" :key="supplier.id || supplier._id" class="relative overflow-hidden bg-white border border-gray-100 p-5 rounded-none shadow-sm hover:border-[#2F2E8B]/30 transition-all group">
                <div class="absolute inset-0 dotted-pattern pointer-events-none group-hover:opacity-[0.04]"></div>
                
                <div class="relative z-10 flex justify-between items-start mb-4">
                    <div>
                        <div class="flex items-center gap-2">
                          <h4 class="text-sm font-black text-gray-900 uppercase font-outfit tracking-tight">{{ supplier.name }}</h4>
                          <GovernmentBadge v-if="supplier.isGovSynced" type="gov-synced" />
                          <GovernmentBadge v-else-if="supplier.autoCreated" type="auto-created" />
                        </div>
                        <span class="inline-block bg-gray-100 text-gray-600 text-[9px] font-mono font-bold px-2 py-0.5 rounded-none uppercase mt-1">
                            {{ supplier.type || 'N/A' }}
                        </span>
                    </div>
                     <div class="flex gap-2">
                        <button @click="editSupplier(supplier)" class="text-gray-400 hover:text-[#2F2E8B] transition-colors"><i class="fas fa-edit"></i></button>
                        <button @click="deleteSupplier(supplier.id || supplier._id)" class="text-gray-400 hover:text-red-500 transition-colors"><i class="fas fa-trash"></i></button>
                    </div>
                </div>

                <div class="relative z-10 space-y-2 mb-4">
                    <div class="flex items-center gap-2 text-[10px] font-mono text-gray-500">
                        <i class="fas fa-user w-4 text-center"></i>
                        <span class="uppercase">{{ supplier.contactPerson || 'N/A' }}</span>
                    </div>
                    <div class="flex items-center gap-2 text-[10px] font-mono text-gray-500">
                        <i class="fas fa-phone w-4 text-center"></i>
                        <span>{{ supplier.phone || supplier.contact || 'N/A' }}</span>
                    </div>
                     <div class="flex items-center gap-2 text-[10px] font-mono text-gray-500">
                        <i class="fas fa-envelope w-4 text-center"></i>
                        <span class="truncate">{{ supplier.email || 'N/A' }}</span>
                    </div>
                    <div class="flex items-center gap-2 text-[10px] font-mono text-gray-500">
                        <i class="fas fa-clock w-4 text-center"></i>
                        <span class="uppercase">{{ supplier.paymentTerms || 'net30' }} &middot; {{ supplier.paymentTermsDays || 30 }} days</span>
                    </div>
                </div>
                <div class="relative z-10 pt-3 border-t border-gray-100">
                    <button @click="openSupplierDetail(supplier)" class="w-full text-[10px] font-mono font-bold text-[#2F2E8B] uppercase tracking-wider hover:text-[#1D226B] transition-colors flex items-center justify-center gap-1">
                        <i class="fas fa-folder-open"></i> View Details
                    </button>
                </div>
            </div>
        </div>
      </div>

     <!-- Purchase Orders Section -->
      <div>
        <div class="flex items-center gap-2 mb-4">
            <div class="w-1.5 h-4 bg-[#2F2E8B] rounded-none"></div>
            <h3 class="text-sm font-bold text-gray-900 uppercase tracking-tight">Recent Purchase Orders</h3>
        </div>

        <div class="relative overflow-hidden bg-white border border-gray-100 rounded-none shadow-sm">
             <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-[0.02]"></div>
             
             <div v-if="isLoadingOrders" class="py-12 text-center relative z-10">
                 <div class="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-[#2F2E8B] border-r-transparent"></div>
                 <div class="mt-2 text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Loading orders...</div>
             </div>

            <div v-else-if="purchaseOrders.length > 0" class="relative z-10">
                 <!-- Desktop Table -->
                <div class="hidden md:block overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="border-b border-gray-100 bg-gray-50/50">
                                <th class="p-4 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider border-r border-gray-50 last:border-r-0">Order ID</th>
                                <th class="p-4 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider border-r border-gray-50 last:border-r-0">Supplier</th>
                                <th class="p-4 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider border-r border-gray-50 last:border-r-0">Date</th>
                                <th class="p-4 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider border-r border-gray-50 last:border-r-0">Status</th>
                                <th class="p-4 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider text-right border-r border-gray-50 last:border-r-0">Total</th>
                                <th class="p-4 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-50">
                            <tr v-for="order in purchaseOrders" :key="order.id || order._id" class="group hover:bg-gray-50/50 transition-colors">
                                <td class="p-4 text-xs font-mono font-bold text-[#2F2E8B] border-r border-gray-50 last:border-r-0">PO-{{ shortId(order.id || order._id) }}</td>
                                <td class="p-4 text-sm font-bold text-gray-700 uppercase border-r border-gray-50 last:border-r-0">{{ getSupplierName(order.supplier_id) }}</td>
                                <td class="p-4 text-xs font-mono text-gray-500 uppercase border-r border-gray-50 last:border-r-0">{{ formatDate(order.order_date) }}</td>
                                <td class="p-4 border-r border-gray-50 last:border-r-0">
                                     <select :value="order.status" @change="changeOrderStatus(order, $event.target.value)"
                                        :class="['px-2 py-1 text-[9px] font-mono font-bold uppercase rounded-none tracking-wide border-0 cursor-pointer appearance-none bg-transparent', 
                                        order.status === 'pending' || order.status === 'draft' ? 'bg-amber-100 text-amber-700' : 
                                        order.status === 'pending_approval' ? 'bg-orange-100 text-orange-700' :
                                        order.status === 'approved' ? 'bg-blue-100 text-blue-700' :
                                        order.status === 'sent' ? 'bg-indigo-100 text-indigo-700' :
                                        order.status === 'partially_received' ? 'bg-teal-100 text-teal-700' :
                                        order.status === 'received' || order.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 
                                        order.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600']">
                                        <option value="draft">Draft</option>
                                        <option value="pending_approval">Pending Approval</option>
                                        <option value="approved">Approved</option>
                                        <option value="sent">Sent</option>
                                        <option value="partially_received">Partially Received</option>
                                        <option value="received">Received</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </td>
                                <td class="p-4 text-sm font-black text-gray-900 text-right font-outfit border-r border-gray-50 last:border-r-0">{{ formatCurrency(order.total) }}</td>
                                <td class="p-4 text-right">
                                    <div class="flex items-center justify-end gap-3">
                                        <button @click="viewOrder(order)" class="text-gray-400 hover:text-[#2F2E8B] transition-colors" title="View / Edit">
                                            <i class="fas fa-pen text-xs"></i>
                                        </button>
                                        <button @click="viewOrder(order)" class="text-gray-400 hover:text-[#2F2E8B] transition-colors" title="Preview">
                                            <i class="fas fa-eye text-xs"></i>
                                        </button>
                                        <button v-if="order.status === 'draft' || order.status === 'pending' || order.status === 'cancelled'" @click="deleteOrder(order.id || order._id)" class="text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                                            <i class="fas fa-trash text-xs"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Mobile Cards -->
                <div class="md:hidden divide-y divide-gray-100">
                     <div v-for="order in purchaseOrders" :key="order.id || order._id" class="p-4">
                        <div class="flex justify-between items-start mb-2">
                            <div>
                                <div class="text-xs font-mono font-bold text-[#2F2E8B] mb-1">PO-{{ shortId(order.id || order._id) }}</div>
                                <div class="text-sm font-bold text-gray-900 uppercase">{{ getSupplierName(order.supplier_id) }}</div>
                            </div>
                            <div class="text-right">
                                <div class="text-lg font-black text-gray-900 font-outfit">{{ formatCurrency(order.total) }}</div>
                                <div class="text-[9px] font-mono text-gray-400 uppercase">{{ formatDate(order.order_date) }}</div>
                            </div>
                        </div>
                        <div class="flex justify-between items-center mt-3">
                             <select :value="order.status" @change="changeOrderStatus(order, $event.target.value)"
                                :class="['px-2 py-1 text-[9px] font-mono font-bold uppercase rounded-none tracking-wide border-0 cursor-pointer', 
                                    order.status === 'pending' || order.status === 'draft' ? 'bg-amber-100 text-amber-700' : 
                                    order.status === 'pending_approval' ? 'bg-orange-100 text-orange-700' :
                                    order.status === 'approved' ? 'bg-blue-100 text-blue-700' :
                                    order.status === 'sent' ? 'bg-indigo-100 text-indigo-700' :
                                    order.status === 'partially_received' ? 'bg-teal-100 text-teal-700' :
                                    order.status === 'received' || order.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                                    order.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600']">
                                <option value="draft">Draft</option>
                                <option value="pending_approval">Pending Approval</option>
                                <option value="approved">Approved</option>
                                <option value="sent">Sent</option>
                                <option value="partially_received">Partially Received</option>
                                <option value="received">Received</option>
                                <option value="cancelled">Cancelled</option>
                             </select>
                             <div class="flex gap-3">
                                <button @click="viewOrder(order)" class="text-gray-400 hover:text-[#2F2E8B]"><i class="fas fa-pen"></i></button>
                                <button @click="viewOrder(order)" class="text-gray-400 hover:text-[#2F2E8B]"><i class="fas fa-eye"></i></button>
                                <button v-if="order.status === 'pending' || order.status === 'cancelled'" @click="deleteOrder(order.id || order._id)" class="text-gray-400 hover:text-red-500"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                     </div>
                </div>
            </div>

            <div v-else class="py-12 text-center text-gray-400 z-10 relative">
                 <p class="text-[10px] font-mono font-bold uppercase tracking-widest">No purchase orders found</p>
            </div>
        </div>
      </div>
      </template>

      <!-- ===== SMART INVOICE DASHBOARD ===== -->
      <template v-if="currentSubView === 'smart-invoice'">
        <div class="flex items-center gap-2 mb-4">
          <div class="w-1.5 h-4 bg-[#2F2E8B] rounded-none"></div>
          <h3 class="text-sm font-bold text-gray-900 uppercase tracking-tight">Smart Invoice Dashboard</h3>
        </div>
        <SmartInvoiceDashboard
          @sync-now="onSyncNow"
          @refresh="onRefreshStatus"
          @view-history="currentSubView = 'audit-log'"
          @retry-failed="onRetryFailed"
        />
        <div class="mt-6">
          <PurchaseRegister @view-detail="onViewPurchaseDetail" />
        </div>
      </template>

      <!-- ===== SUPPLIER ANALYTICS ===== -->
      <template v-if="currentSubView === 'analytics'">
        <div class="flex items-center gap-2 mb-4">
          <div class="w-1.5 h-4 bg-[#2F2E8B] rounded-none"></div>
          <h3 class="text-sm font-bold text-gray-900 uppercase tracking-tight">Supplier Analytics</h3>
        </div>
        <SupplierAnalytics />
      </template>

      <!-- ===== RECONCILIATION ===== -->
      <template v-if="currentSubView === 'reconciliation'">
        <div class="flex items-center gap-2 mb-4">
          <div class="w-1.5 h-4 bg-[#2F2E8B] rounded-none"></div>
          <h3 class="text-sm font-bold text-gray-900 uppercase tracking-tight">Reconciliation Workspace</h3>
        </div>
        <ReconciliationTable />
      </template>

      <!-- ===== AUDIT LOG ===== -->
      <template v-if="currentSubView === 'audit-log'">
        <div class="flex items-center gap-2 mb-4">
          <div class="w-1.5 h-4 bg-[#2F2E8B] rounded-none"></div>
          <h3 class="text-sm font-bold text-gray-900 uppercase tracking-tight">Audit Log</h3>
        </div>
        <AuditTimeline />
      </template>

      <!-- ===== SYNC HISTORY ===== -->
      <template v-if="currentSubView === 'sync-history'">
        <div class="flex items-center gap-2 mb-4">
          <div class="w-1.5 h-4 bg-[#2F2E8B] rounded-none"></div>
          <h3 class="text-sm font-bold text-gray-900 uppercase tracking-tight">Synchronization History</h3>
        </div>
        <SyncHistory />
      </template>

      <!-- ===== SETTINGS ===== -->
      <template v-if="currentSubView === 'settings'">
        <div class="flex items-center gap-2 mb-4">
          <div class="w-1.5 h-4 bg-[#2F2E8B] rounded-none"></div>
          <h3 class="text-sm font-bold text-gray-900 uppercase tracking-tight">Supplier Settings</h3>
        </div>
        <div class="bg-white border border-gray-100 p-5 rounded-none shadow-sm">
          <p class="text-xs font-mono text-gray-500">Smart Invoice integration settings and VSDC configuration will be available here.</p>
        </div>
      </template>

    </main>

    <!-- Supplier Modal -->
    <div v-if="showSupplierModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeSupplierModal"></div>
      
      <div class="relative w-full max-w-4xl bg-white rounded-none shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-modal-in">
         <!-- Modal Header -->
        <div class="h-1.5 bg-[#2F2E8B]"></div>
        <div class="p-6 border-b border-gray-100 relative overflow-hidden flex justify-between items-center bg-gray-50/30">
          <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-[0.03]"></div>
          <div class="relative z-10 flex items-center gap-4">
            <div class="w-1.5 h-6 bg-[#2F2E8B] rounded-none"></div>
            <div>
              <span class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest leading-none">Management // Form</span>
              <h3 class="text-xl font-black text-gray-900 uppercase font-outfit tracking-tight">{{ editingSupplier ? 'Edit Supplier' : 'New Supplier' }}</h3>
            </div>
          </div>
          <button @click="closeSupplierModal" class="relative z-10 text-gray-400 hover:text-gray-600 transition-colors">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>

        <div class="p-6 overflow-y-auto custom-scrollbar flex-1 bg-white">
            <form @submit.prevent="handleSubmit" class="space-y-8">
                 <!-- Basic Info -->
                 <div>
                    <h4 class="text-xs font-mono font-bold text-[#2F2E8B] uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Basic Information</h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-1">
                            <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase">Company Name</label>
                            <input v-model="supplierForm.name" required type="text" 
                                class="w-full border border-gray-200 rounded-none p-2 focus:ring-2 focus:ring-[#2F2E8B]/10 focus:border-[#2F2E8B] transition text-sm text-gray-900 placeholder-gray-300" />
                        </div>
                        <div class="space-y-1">
                             <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase">Type</label>
                             <select v-model="supplierForm.type" required
                                class="w-full border border-gray-200 rounded-none p-2 focus:ring-2 focus:ring-[#2F2E8B]/10 focus:border-[#2F2E8B] transition text-sm text-gray-900">
                                <option value="local">Local</option>
                                <option value="foreign">Foreign</option>
                            </select>
                        </div>
                    </div>
                 </div>

                 <!-- Contact Info -->
                 <div>
                    <h4 class="text-xs font-mono font-bold text-[#2F2E8B] uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Contact Details</h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div class="space-y-1">
                            <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase">Contact Person</label>
                             <input v-model="supplierForm.contactPerson" required type="text" class="w-full border border-gray-200 rounded-none p-2 focus:ring-2 focus:ring-[#2F2E8B]/10 focus:border-[#2F2E8B] transition text-sm text-gray-900" />
                         </div>
                         <div class="space-y-1">
                            <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase">Phone</label>
                             <input v-model="supplierForm.phone" required type="tel" class="w-full border border-gray-200 rounded-none p-2 focus:ring-2 focus:ring-[#2F2E8B]/10 focus:border-[#2F2E8B] transition text-sm text-gray-900" />
                         </div>
                         <div class="space-y-1">
                            <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase">Email</label>
                             <input v-model="supplierForm.email" required type="email" class="w-full border border-gray-200 rounded-none p-2 focus:ring-2 focus:ring-[#2F2E8B]/10 focus:border-[#2F2E8B] transition text-sm text-gray-900" />
                         </div>
                         <div class="space-y-1">
                             <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase">Website</label>
                             <input v-model="supplierForm.website" type="url" class="w-full border border-gray-200 rounded-none p-2 focus:ring-2 focus:ring-[#2F2E8B]/10 focus:border-[#2F2E8B] transition text-sm text-gray-900" />
                         </div>
                    </div>
                 </div>

                 <!-- Location -->
                 <div>
                    <h4 class="text-xs font-mono font-bold text-[#2F2E8B] uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Location</h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-1">
                            <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase">Street Address</label>
                            <input v-model="supplierForm.address" required type="text" class="w-full border border-gray-200 rounded-none p-2 focus:ring-2 focus:ring-[#2F2E8B]/10 focus:border-[#2F2E8B] transition text-sm text-gray-900" />
                        </div>
                        <div class="space-y-1">
                            <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase">City</label>
                            <input v-model="supplierForm.city" required type="text" class="w-full border border-gray-200 rounded-none p-2 focus:ring-2 focus:ring-[#2F2E8B]/10 focus:border-[#2F2E8B] transition text-sm text-gray-900" />
                        </div>
                         <div class="space-y-1">
                            <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase">Country</label>
                            <input v-model="supplierForm.country" required type="text" class="w-full border border-gray-200 rounded-none p-2 focus:ring-2 focus:ring-[#2F2E8B]/10 focus:border-[#2F2E8B] transition text-sm text-gray-900" />
                        </div>
                        <div class="space-y-1">
                            <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase">Postal Code</label>
                            <input v-model="supplierForm.postalCode" type="text" class="w-full border border-gray-200 rounded-none p-2 focus:ring-2 focus:ring-[#2F2E8B]/10 focus:border-[#2F2E8B] transition text-sm text-gray-900" />
                        </div>
                    </div>
                </div>

                <!-- Notes -->
                <div>
                     <h4 class="text-xs font-mono font-bold text-[#2F2E8B] uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Payment Terms</h4>
                     <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div class="space-y-1">
                             <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase">Payment Terms</label>
                             <select v-model="supplierForm.paymentTerms" class="w-full border border-gray-200 rounded-none p-2 focus:ring-2 focus:ring-[#2F2E8B]/10 focus:border-[#2F2E8B] transition text-sm text-gray-900">
                                 <option value="prepaid">Prepaid</option>
                                 <option value="cod">Cash on Delivery</option>
                                 <option value="net15">Net 15</option>
                                 <option value="net30">Net 30</option>
                                 <option value="net45">Net 45</option>
                                 <option value="net60">Net 60</option>
                                 <option value="net90">Net 90</option>
                                 <option value="custom">Custom</option>
                             </select>
                         </div>
                         <div class="space-y-1">
                             <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase">Days</label>
                             <input v-model.number="supplierForm.paymentTermsDays" type="number" min="0" class="w-full border border-gray-200 rounded-none p-2 focus:ring-2 focus:ring-[#2F2E8B]/10 focus:border-[#2F2E8B] transition text-sm text-gray-900" />
                         </div>
                         <div class="space-y-1">
                             <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase">Payment Method</label>
                             <select v-model="supplierForm.paymentMethod" class="w-full border border-gray-200 rounded-none p-2 focus:ring-2 focus:ring-[#2F2E8B]/10 focus:border-[#2F2E8B] transition text-sm text-gray-900">
                                 <option value="">Select Method</option>
                                 <option value="bank_transfer">Bank Transfer</option>
                                 <option value="cheque">Cheque</option>
                                 <option value="cash">Cash</option>
                                 <option value="mobile_money">Mobile Money</option>
                                 <option value="credit_card">Credit Card</option>
                             </select>
                         </div>
                         <div class="space-y-1">
                             <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase">Credit Limit</label>
                             <input v-model.number="supplierForm.creditLimit" type="number" min="0" step="0.01" class="w-full border border-gray-200 rounded-none p-2 focus:ring-2 focus:ring-[#2F2E8B]/10 focus:border-[#2F2E8B] transition text-sm text-gray-900" />
                         </div>
                     </div>
                </div>

                <!-- Pricing Agreement -->
                <div>
                     <h4 class="text-xs font-mono font-bold text-[#2F2E8B] uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Pricing Agreement</h4>
                     <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div class="md:col-span-2 space-y-1">
                             <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase">Agreement Description</label>
                             <input v-model="supplierForm.pricingAgreement.description" type="text" class="w-full border border-gray-200 rounded-none p-2 focus:ring-2 focus:ring-[#2F2E8B]/10 focus:border-[#2F2E8B] transition text-sm text-gray-900" placeholder="e.g. Bulk discount on electronics" />
                         </div>
                         <div class="space-y-1">
                             <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase">Discount %</label>
                             <input v-model.number="supplierForm.pricingAgreement.discount_percent" type="number" min="0" max="100" step="0.1" class="w-full border border-gray-200 rounded-none p-2 focus:ring-2 focus:ring-[#2F2E8B]/10 focus:border-[#2F2E8B] transition text-sm text-gray-900" />
                         </div>
                         <div class="space-y-1">
                             <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase">Currency</label>
                             <input v-model="supplierForm.pricingAgreement.currency" type="text" class="w-full border border-gray-200 rounded-none p-2 focus:ring-2 focus:ring-[#2F2E8B]/10 focus:border-[#2F2E8B] transition text-sm text-gray-900" />
                         </div>
                         <div class="space-y-1">
                             <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase">Valid From</label>
                             <input v-model="supplierForm.pricingAgreement.valid_from" type="date" class="w-full border border-gray-200 rounded-none p-2 focus:ring-2 focus:ring-[#2F2E8B]/10 focus:border-[#2F2E8B] transition text-sm text-gray-900" />
                         </div>
                         <div class="space-y-1">
                             <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase">Valid To</label>
                             <input v-model="supplierForm.pricingAgreement.valid_to" type="date" class="w-full border border-gray-200 rounded-none p-2 focus:ring-2 focus:ring-[#2F2E8B]/10 focus:border-[#2F2E8B] transition text-sm text-gray-900" />
                         </div>
                         <div class="md:col-span-2 space-y-1">
                             <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase">Agreement Notes</label>
                             <textarea v-model="supplierForm.pricingAgreement.notes" rows="2" class="w-full border border-gray-200 rounded-none p-2 focus:ring-2 focus:ring-[#2F2E8B]/10 focus:border-[#2F2E8B] transition text-sm text-gray-900"></textarea>
                         </div>
                     </div>
                </div>

                <!-- Additional Notes -->
                <div>
                     <h4 class="text-xs font-mono font-bold text-[#2F2E8B] uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Additional</h4>
                     <div class="space-y-1">
                         <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase">Notes</label>
                         <textarea v-model="supplierForm.notes" rows="3" class="w-full border border-gray-200 rounded-none p-2 focus:ring-2 focus:ring-[#2F2E8B]/10 focus:border-[#2F2E8B] transition text-sm text-gray-900"></textarea>
                     </div>
                </div>

                <!-- Government Information (Collapsible) -->
                <div>
                  <button type="button" @click="showGovInfo = !showGovInfo"
                    class="w-full flex items-center justify-between text-xs font-mono font-bold text-[#2F2E8B] uppercase tracking-wider mb-4 border-b border-gray-100 pb-2 hover:text-[#1D226B] transition">
                    <span>Government Information (Smart Invoice)</span>
                    <i class="fas" :class="showGovInfo ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
                  </button>
                  <div v-if="showGovInfo" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div class="space-y-1">
                        <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase">
                          TPIN
                          <span v-if="tpinLookupLoading" class="ml-2 text-[#2F2E8B]"><i class="fas fa-spinner fa-spin"></i> Looking up...</span>
                        </label>
                        <div class="relative">
                          <input
                            v-model="supplierForm.tpin"
                            type="text"
                            @blur="onTpinBlur"
                            class="w-full border border-gray-200 rounded-none p-2 focus:ring-2 focus:ring-[#2F2E8B]/10 focus:border-[#2F2E8B] transition text-sm text-gray-900 placeholder-gray-300"
                            placeholder="e.g. 1000000000"
                          />
                          <div v-if="tpinValidationResult" class="absolute right-2 top-1/2 -translate-y-1/2">
                            <i v-if="tpinValidationResult.valid" class="fas fa-check-circle text-emerald-500"></i>
                            <i v-else class="fas fa-times-circle text-red-500"></i>
                          </div>
                        </div>
                        <div v-if="tpinValidationResult" class="flex items-center gap-2 mt-1">
                          <span
                            :class="[
                              'inline-block text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-none uppercase tracking-wider',
                              tpinValidationResult.valid
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-red-100 text-red-700'
                            ]"
                          >
                            {{ tpinValidationResult.valid ? 'Valid' : 'Invalid' }}
                          </span>
                          <span class="text-[9px] font-mono text-gray-400">{{ tpinValidationResult.message }}</span>
                        </div>
                      </div>
                      <div class="space-y-1">
                        <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase">Branch ID</label>
                        <input v-model="supplierForm.branchId" type="text" class="w-full border border-gray-200 rounded-none p-2 focus:ring-2 focus:ring-[#2F2E8B]/10 focus:border-[#2F2E8B] transition text-sm text-gray-900" placeholder="e.g. 000" />
                      </div>
                      <div class="space-y-1">
                        <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase">Government Source</label>
                        <select v-model="supplierForm.govSource" class="w-full border border-gray-200 rounded-none p-2 focus:ring-2 focus:ring-[#2F2E8B]/10 focus:border-[#2F2E8B] transition text-sm text-gray-900 bg-white">
                          <option value="">Manual Entry</option>
                          <option value="vsdc">VSDC Smart Invoice</option>
                          <option value="zra">ZRA Portal</option>
                        </select>
                      </div>
                      <div class="space-y-1">
                        <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase">Registration Status</label>
                        <select v-model="supplierForm.registrationStatus" class="w-full border border-gray-200 rounded-none p-2 focus:ring-2 focus:ring-[#2F2E8B]/10 focus:border-[#2F2E8B] transition text-sm text-gray-900 bg-white">
                          <option value="">Not Checked</option>
                          <option value="registered">Registered</option>
                          <option value="unregistered">Unregistered</option>
                          <option value="pending">Pending</option>
                        </select>
                      </div>
                      <div class="space-y-1">
                        <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase">Sync Source</label>
                        <select v-model="supplierForm.syncSource" class="w-full border border-gray-200 rounded-none p-2 focus:ring-2 focus:ring-[#2F2E8B]/10 focus:border-[#2F2E8B] transition text-sm text-gray-900 bg-white">
                          <option value="manual">Manual</option>
                          <option value="auto">Automatic (VSDC)</option>
                        </select>
                      </div>
                      <div class="space-y-1">
                        <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase">Auto Created</label>
                        <div class="flex items-center gap-3 pt-2">
                          <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" v-model="supplierForm.autoCreated" class="w-4 h-4 text-[#2F2E8B] border-gray-300 rounded-none focus:ring-[#2F2E8B]" />
                            <span class="text-xs font-mono text-gray-600">Auto-created from Smart Invoice</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                 <!-- Footer Actions -->
                 <div class="pt-6 border-t border-gray-100 flex justify-end gap-3">
                    <button type="button" @click="closeSupplierModal" class="px-6 py-2 border border-gray-200 text-gray-600 text-xs font-bold font-mono uppercase hover:bg-gray-50 transition">Cancel</button>
                    <button type="submit" :disabled="isSubmitting" class="px-6 py-2 bg-[#2F2E8B] text-white text-xs font-bold font-mono uppercase hover:bg-[#1D226B] transition shadow-md disabled:opacity-50">
                        {{ isSubmitting ? 'Saving...' : (editingSupplier ? 'Update Supplier' : 'Add Supplier') }}
                    </button>
                 </div>
            </form>
        </div>
      </div>
    </div>


    <!-- Purchase Modal -->
     <div v-if="showPurchaseModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closePurchaseModal"></div>
      
      <div class="relative w-full max-w-4xl bg-white rounded-none shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-modal-in">
        <!-- Modal Header -->
        <div class="h-1.5 bg-[#2F2E8B]"></div>
        <div class="p-6 border-b border-gray-100 relative overflow-hidden flex justify-between items-center bg-gray-50/30">
          <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-[0.03]"></div>
          <div class="relative z-10 flex items-center gap-4">
            <div class="w-1.5 h-6 bg-[#2F2E8B] rounded-none"></div>
            <div>
              <span class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest leading-none">Order // {{ editingOrder ? 'Review' : 'Creation' }}</span>
              <h3 class="text-xl font-black text-gray-900 uppercase font-outfit tracking-tight">{{ editingOrder ? 'Edit Order' : 'New Purchase Order' }}</h3>
            </div>
          </div>
          <button @click="closePurchaseModal" class="relative z-10 text-gray-400 hover:text-gray-600 transition-colors">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>

        <div class="p-6 overflow-y-auto custom-scrollbar flex-1 bg-white">
             <form @submit.prevent="handlePurchaseSubmit" class="space-y-8">
                <!-- Supplier Select -->
                <div>
                     <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase mb-2">Select Supplier</label>
                     <select v-model="purchaseForm.supplierId" required
                         class="w-full border border-gray-200 rounded-none p-2 focus:ring-2 focus:ring-[#2F2E8B]/10 focus:border-[#2F2E8B] transition text-sm text-gray-900">
                        <option value="">Choose a supplier</option>
                        <option v-for="supplier in suppliers" :key="supplier.id || supplier._id" :value="supplier.id || supplier._id">
                            {{ supplier.name }}
                        </option>
                    </select>
                    <div class="mt-2 text-[10px] font-mono font-bold uppercase tracking-wider" :class="loadingSupplierProducts ? 'text-[#2F2E8B]' : 'text-gray-400'">
                      <template v-if="purchaseForm.supplierId && loadingSupplierProducts">Loading supplier products...</template>
                      <template v-else-if="purchaseForm.supplierId && supplierProducts.length > 0">{{ supplierProducts.length }} linked products available for quick repurchase</template>
                      <template v-else-if="purchaseForm.supplierId">No linked products found for this supplier yet</template>
                    </div>
                </div>

                <!-- Items -->
                <div>
                    <div class="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
                         <h4 class="text-xs font-mono font-bold text-[#2F2E8B] uppercase tracking-wider">Order Items</h4>
                         <button type="button" @click="addOrderItem" class="text-[#2F2E8B] hover:text-[#1D226B] text-[10px] font-bold font-mono uppercase"><i class="fas fa-plus mr-1"></i> Add Item</button>
                    </div>
                
                    <div v-for="(item, index) in purchaseForm.items" :key="index" class="bg-gray-50 p-4 mb-4 border border-gray-100 relative group">
                        <button type="button" @click="removeOrderItem(index)" class="absolute top-2 right-2 text-gray-300 hover:text-red-500 transition-colors"><i class="fas fa-times"></i></button>
                        <div class="grid grid-cols-1 md:grid-cols-6 gap-4">
                            <div class="md:col-span-2 space-y-1">
                                <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase">Supplier Product</label>
                                <select
                                  v-model="item.selectedProductId"
                                  @change="onSupplierProductSelect(item)"
                                  :disabled="!purchaseForm.supplierId || supplierProducts.length === 0"
                                  class="w-full border border-gray-200 rounded-none p-1.5 text-sm disabled:bg-gray-100 disabled:text-gray-400"
                                >
                                  <option value="">Select product (optional)</option>
                                  <option v-for="product in supplierProducts" :key="product.id" :value="product.id">
                                    {{ product.name }}{{ product.sku ? ` [${product.sku}]` : '' }} (Stock: {{ product.stockQty }})
                                  </option>
                                </select>
                            </div>
                            <div class="md:col-span-2 space-y-1">
                                <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase">Description</label>
                                <input v-model="item.description" required type="text" class="w-full border border-gray-200 rounded-none p-1.5 text-sm" placeholder="Item name" />
                            </div>
                             <div class="space-y-1">
                                <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase">Qty</label>
                                <input v-model.number="item.quantity" required type="number" min="1" class="w-full border border-gray-200 rounded-none p-1.5 text-sm" />
                            </div>
                             <div class="space-y-1">
                                <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase">Unit Price</label>
                                <input v-model.number="item.unitPrice" required type="number" min="0" step="0.01" class="w-full border border-gray-200 rounded-none p-1.5 text-sm" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Totals -->
                <div class="flex justify-end pt-4 border-t border-gray-100">
                    <div class="w-64 space-y-2">
                         <div class="flex justify-between text-sm text-gray-600">
                            <span class="font-mono text-xs uppercase">Subtotal</span>
                            <span>{{ formatCurrency(calculateSubtotal) }}</span>
                        </div>
                        <div class="flex justify-between text-sm text-gray-600">
                             <span class="font-mono text-xs uppercase">VAT (16%)</span>
                            <span>{{ formatCurrency(calculateVAT) }}</span>
                        </div>
                         <div class="flex justify-between text-lg font-black text-[#2F2E8B] pt-2 border-t border-gray-200">
                             <span class="font-outfit uppercase">Total</span>
                            <span>{{ formatCurrency(calculateTotal) }}</span>
                        </div>
                    </div>
                </div>

                 <!-- Footer Actions -->
                 <div class="pt-6 border-t border-gray-100 flex justify-end gap-3">
                    <button type="button" @click="closePurchaseModal" class="px-6 py-2 border border-gray-200 text-gray-600 text-xs font-bold font-mono uppercase hover:bg-gray-50 transition">Cancel</button>
                    <button type="submit" :disabled="isSubmitting" class="px-6 py-2 bg-[#2F2E8B] text-white text-xs font-bold font-mono uppercase hover:bg-[#1D226B] transition shadow-md disabled:opacity-50">
                        {{ isSubmitting ? 'Saving...' : (editingOrder ? 'Update Order' : 'Create Order') }}
                    </button>
                 </div>
             </form>
        </div>
      </div>
    </div>

    <!-- Supplier Detail Modal -->
    <div v-if="showDetailModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeDetailModal"></div>
      
      <div class="relative w-full max-w-5xl bg-white rounded-none shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-modal-in">
        <div class="h-1.5 bg-[#2F2E8B]"></div>
        <div class="p-6 border-b border-gray-100 relative overflow-hidden flex justify-between items-center bg-gray-50/30">
          <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-[0.03]"></div>
          <div class="relative z-10 flex items-center gap-4">
            <div class="w-1.5 h-6 bg-[#2F2E8B] rounded-none"></div>
            <div>
              <span class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest leading-none">Supplier // Detail</span>
              <h3 class="text-xl font-black text-gray-900 uppercase font-outfit tracking-tight">{{ detailSupplier?.name }}</h3>
            </div>
          </div>
          <button @click="closeDetailModal" class="relative z-10 text-gray-400 hover:text-gray-600 transition-colors">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>

        <!-- Detail Tabs -->
        <div class="border-b border-gray-200 bg-white px-6">
          <nav class="-mb-px flex space-x-6 overflow-x-auto">
            <button v-for="tab in detailTabs" :key="tab.id" @click="detailActiveTab = tab.id"
              :class="[detailActiveTab === tab.id ? 'border-[#2F2E8B] text-[#2F2E8B]' : 'border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-300',
                'whitespace-nowrap py-3 px-1 border-b-2 font-bold text-[10px] font-mono uppercase tracking-wider transition-colors flex items-center gap-2']">
              <i :class="tab.icon"></i> {{ tab.name }}
            </button>
          </nav>
        </div>

        <div class="p-6 overflow-y-auto custom-scrollbar flex-1 bg-white">

          <!-- Overview Tab -->
          <div v-if="detailActiveTab === 'overview'" class="space-y-6">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="bg-gray-50 border border-gray-100 p-4">
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase mb-1">Type</div>
                <div class="text-sm font-bold text-gray-900 uppercase">{{ detailSupplier?.type }}</div>
              </div>
              <div class="bg-gray-50 border border-gray-100 p-4">
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase mb-1">Payment Terms</div>
                <div class="text-sm font-bold text-gray-900 uppercase">{{ detailSupplier?.paymentTerms }} &middot; {{ detailSupplier?.paymentTermsDays || 30 }}d</div>
              </div>
              <div class="bg-gray-50 border border-gray-100 p-4">
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase mb-1">Payment Method</div>
                <div class="text-sm font-bold text-gray-900 uppercase">{{ detailSupplier?.paymentMethod || '—' }}</div>
              </div>
              <div class="bg-gray-50 border border-gray-100 p-4">
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase mb-1">Credit Limit</div>
                <div class="text-sm font-bold text-gray-900">{{ formatCurrency(detailSupplier?.creditLimit || 0) }}</div>
              </div>
            </div>
            <div v-if="detailSupplier?.pricingAgreement?.description" class="bg-blue-50 border border-blue-100 p-4">
              <div class="text-[9px] font-mono font-bold text-blue-500 uppercase mb-2">Active Pricing Agreement</div>
              <div class="text-sm text-gray-800 font-bold">{{ detailSupplier.pricingAgreement.description }}</div>
              <div class="text-xs text-gray-500 mt-1 font-mono">
                {{ detailSupplier.pricingAgreement.discount_percent }}% discount
                <span v-if="detailSupplier.pricingAgreement.valid_from"> &middot; {{ detailSupplier.pricingAgreement.valid_from }} to {{ detailSupplier.pricingAgreement.valid_to }}</span>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono text-gray-500">
              <div><i class="fas fa-user w-4"></i> {{ detailSupplier?.contactPerson }}</div>
              <div><i class="fas fa-phone w-4"></i> {{ detailSupplier?.phone }}</div>
              <div><i class="fas fa-envelope w-4"></i> {{ detailSupplier?.email }}</div>
              <div><i class="fas fa-globe w-4"></i> {{ detailSupplier?.website || '—' }}</div>
              <div><i class="fas fa-map-marker-alt w-4"></i> {{ detailSupplier?.address }}, {{ detailSupplier?.city }}, {{ detailSupplier?.country }}</div>
              <div v-if="detailSupplier?.taxId"><i class="fas fa-id-card w-4"></i> Tax ID: {{ detailSupplier.taxId }}</div>
            </div>
          </div>

          <!-- Invoices Tab -->
          <div v-if="detailActiveTab === 'invoices'" class="space-y-4">
            <div class="flex justify-between items-center">
              <h4 class="text-xs font-mono font-bold text-gray-900 uppercase">Invoices</h4>
              <button @click="showInvoiceForm = !showInvoiceForm" class="text-[10px] font-mono font-bold text-[#2F2E8B] uppercase flex items-center gap-1 hover:text-[#1D226B]">
                <i class="fas fa-plus"></i> Add Invoice
              </button>
            </div>

            <!-- Add Invoice Form -->
            <div v-if="showInvoiceForm" class="bg-gray-50 border border-gray-200 p-4 space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="space-y-1">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase">Invoice Number</label>
                  <input v-model="invoiceForm.invoice_number" type="text" required class="w-full border border-gray-200 rounded-none p-2 text-sm" placeholder="INV-001" />
                </div>
                <div class="space-y-1">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase">Invoice Date</label>
                  <input v-model="invoiceForm.invoice_date" type="date" required class="w-full border border-gray-200 rounded-none p-2 text-sm" />
                </div>
                <div class="space-y-1">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase">Due Date</label>
                  <input v-model="invoiceForm.due_date" type="date" class="w-full border border-gray-200 rounded-none p-2 text-sm" />
                </div>
                <div class="space-y-1">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase">Amount</label>
                  <input v-model.number="invoiceForm.amount" type="number" min="0" step="0.01" required class="w-full border border-gray-200 rounded-none p-2 text-sm" />
                </div>
                <div class="space-y-1">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase">Status</label>
                  <select v-model="invoiceForm.status" class="w-full border border-gray-200 rounded-none p-2 text-sm">
                    <option value="unpaid">Unpaid</option>
                    <option value="partial">Partial</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
                <div class="space-y-1">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase">Notes</label>
                  <input v-model="invoiceForm.notes" type="text" class="w-full border border-gray-200 rounded-none p-2 text-sm" />
                </div>
              </div>
              <div class="flex justify-end gap-2">
                <button @click="showInvoiceForm = false" class="px-4 py-1.5 border border-gray-200 text-gray-600 text-[10px] font-bold font-mono uppercase">Cancel</button>
                <button @click="saveInvoice" :disabled="detailLoading" class="px-4 py-1.5 bg-[#2F2E8B] text-white text-[10px] font-bold font-mono uppercase disabled:opacity-50">Save</button>
              </div>
            </div>

            <!-- Invoices Table -->
            <div v-if="supplierInvoices.length > 0" class="border border-gray-100 overflow-hidden">
              <table class="w-full text-left">
                <thead>
                  <tr class="bg-gray-50 border-b border-gray-100">
                    <th class="p-3 text-[9px] font-mono font-bold text-gray-500 uppercase">Invoice #</th>
                    <th class="p-3 text-[9px] font-mono font-bold text-gray-500 uppercase">Date</th>
                    <th class="p-3 text-[9px] font-mono font-bold text-gray-500 uppercase">Due Date</th>
                    <th class="p-3 text-[9px] font-mono font-bold text-gray-500 uppercase text-right">Amount</th>
                    <th class="p-3 text-[9px] font-mono font-bold text-gray-500 uppercase">Status</th>
                    <th class="p-3 text-[9px] font-mono font-bold text-gray-500 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                  <tr v-for="inv in supplierInvoices" :key="inv.id" class="hover:bg-gray-50/50">
                    <td class="p-3 text-xs font-mono font-bold text-[#2F2E8B]">{{ inv.invoice_number }}</td>
                    <td class="p-3 text-xs font-mono text-gray-500">{{ inv.invoice_date }}</td>
                    <td class="p-3 text-xs font-mono text-gray-500">{{ inv.due_date || '—' }}</td>
                    <td class="p-3 text-sm font-bold text-gray-900 text-right">{{ formatCurrency(inv.amount) }}</td>
                    <td class="p-3">
                      <span :class="['px-2 py-0.5 text-[9px] font-mono font-bold uppercase',
                        inv.status === 'paid' ? 'bg-emerald-100 text-emerald-700' :
                        inv.status === 'overdue' ? 'bg-red-100 text-red-700' :
                        inv.status === 'partial' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600']">
                        {{ inv.status }}
                      </span>
                    </td>
                    <td class="p-3 text-right">
                      <button @click="deleteInvoice(inv.id)" class="text-gray-400 hover:text-red-500"><i class="fas fa-trash text-xs"></i></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else class="text-center py-8 text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
              <i class="fas fa-file-invoice text-2xl text-gray-200 mb-2 block"></i>
              No invoices recorded
            </div>
          </div>

          <!-- Goods Receipts Tab -->
          <div v-if="detailActiveTab === 'goods-receipts'" class="space-y-4">
            <div class="flex justify-between items-center">
              <h4 class="text-xs font-mono font-bold text-gray-900 uppercase">Goods Receipts</h4>
              <button @click="showReceiptForm = !showReceiptForm" class="text-[10px] font-mono font-bold text-[#2F2E8B] uppercase flex items-center gap-1 hover:text-[#1D226B]">
                <i class="fas fa-plus"></i> Record Receipt
              </button>
            </div>

            <!-- Add Receipt Form -->
            <div v-if="showReceiptForm" class="bg-gray-50 border border-gray-200 p-4 space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-1">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase">PO Reference</label>
                  <input v-model="receiptForm.purchase_order_id" type="text" class="w-full border border-gray-200 rounded-none p-2 text-sm" placeholder="Optional PO #" />
                </div>
                <div class="space-y-1">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase">Received By</label>
                  <input v-model="receiptForm.received_by" type="text" class="w-full border border-gray-200 rounded-none p-2 text-sm" />
                </div>
              </div>
              <!-- Receipt Items -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <label class="text-[9px] font-mono font-bold text-gray-400 uppercase">Items</label>
                  <button type="button" @click="addReceiptItem" class="text-[#2F2E8B] text-[9px] font-bold font-mono uppercase"><i class="fas fa-plus mr-1"></i>Add</button>
                </div>
                <div v-for="(item, idx) in receiptForm.items" :key="idx" class="grid grid-cols-4 gap-2 mb-2">
                  <input v-model="item.description" type="text" placeholder="Item" class="col-span-1 border border-gray-200 rounded-none p-1.5 text-sm" />
                  <input v-model.number="item.expected_qty" type="number" min="0" placeholder="Expected" class="border border-gray-200 rounded-none p-1.5 text-sm" />
                  <input v-model.number="item.received_qty" type="number" min="0" placeholder="Received" class="border border-gray-200 rounded-none p-1.5 text-sm" />
                  <div class="flex items-center gap-2">
                    <input v-model.number="item.unit_price" type="number" min="0" step="0.01" placeholder="Price" class="flex-1 border border-gray-200 rounded-none p-1.5 text-sm" />
                    <button v-if="receiptForm.items.length > 1" @click="receiptForm.items.splice(idx, 1)" class="text-gray-300 hover:text-red-500"><i class="fas fa-times"></i></button>
                  </div>
                </div>
              </div>
              <div class="space-y-1">
                <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase">Notes</label>
                <input v-model="receiptForm.notes" type="text" class="w-full border border-gray-200 rounded-none p-2 text-sm" />
              </div>
              <div class="flex justify-end gap-2">
                <button @click="showReceiptForm = false" class="px-4 py-1.5 border border-gray-200 text-gray-600 text-[10px] font-bold font-mono uppercase">Cancel</button>
                <button @click="saveGoodsReceipt" :disabled="detailLoading" class="px-4 py-1.5 bg-[#2F2E8B] text-white text-[10px] font-bold font-mono uppercase disabled:opacity-50">Save</button>
              </div>
            </div>

            <!-- Receipts List -->
            <div v-if="goodsReceipts.length > 0" class="space-y-3">
              <div v-for="r in goodsReceipts" :key="r.id" class="bg-white border border-gray-100 p-4">
                <div class="flex justify-between items-start mb-3">
                  <div>
                    <div class="text-xs font-mono font-bold text-[#2F2E8B]">GR-{{ r.id?.slice(-6) }}</div>
                    <div class="text-[9px] font-mono text-gray-400 mt-0.5">{{ formatDate(r.created_at) }} <span v-if="r.received_by">&middot; {{ r.received_by }}</span></div>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="px-2 py-0.5 text-[9px] font-mono font-bold uppercase bg-emerald-100 text-emerald-700">{{ r.status }}</span>
                    <button @click="deleteGoodsReceipt(r.id)" class="text-gray-400 hover:text-red-500"><i class="fas fa-trash text-xs"></i></button>
                  </div>
                </div>
                <table class="w-full text-left text-xs">
                  <thead>
                    <tr class="border-b border-gray-100">
                      <th class="pb-1 text-[9px] font-mono font-bold text-gray-400 uppercase">Item</th>
                      <th class="pb-1 text-[9px] font-mono font-bold text-gray-400 uppercase text-right">Expected</th>
                      <th class="pb-1 text-[9px] font-mono font-bold text-gray-400 uppercase text-right">Received</th>
                      <th class="pb-1 text-[9px] font-mono font-bold text-gray-400 uppercase text-right">Variance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, i) in r.items" :key="i" class="border-b border-gray-50">
                      <td class="py-1.5 font-mono text-gray-700">{{ item.description }}</td>
                      <td class="py-1.5 text-right font-mono text-gray-500">{{ item.expected_qty }}</td>
                      <td class="py-1.5 text-right font-mono text-gray-700 font-bold">{{ item.received_qty }}</td>
                      <td class="py-1.5 text-right font-mono font-bold" :class="item.received_qty - item.expected_qty < 0 ? 'text-red-600' : 'text-emerald-600'">
                        {{ item.received_qty - item.expected_qty }}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div v-if="r.notes" class="text-[10px] font-mono text-gray-400 mt-2 italic">{{ r.notes }}</div>
              </div>
            </div>
            <div v-else class="text-center py-8 text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
              <i class="fas fa-box-open text-2xl text-gray-200 mb-2 block"></i>
              No goods receipts recorded
            </div>
          </div>

          <!-- Quality Defects Tab -->
          <div v-if="detailActiveTab === 'defects'" class="space-y-4">
            <div class="flex justify-between items-center">
              <h4 class="text-xs font-mono font-bold text-gray-900 uppercase">Quality Defects</h4>
              <button @click="showDefectForm = !showDefectForm" class="text-[10px] font-mono font-bold text-[#2F2E8B] uppercase flex items-center gap-1 hover:text-[#1D226B]">
                <i class="fas fa-plus"></i> Report Defect
              </button>
            </div>

            <!-- Add Defect Form -->
            <div v-if="showDefectForm" class="bg-gray-50 border border-gray-200 p-4 space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-1">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase">Item Description</label>
                  <input v-model="defectForm.item_description" type="text" required class="w-full border border-gray-200 rounded-none p-2 text-sm" placeholder="Which item?" />
                </div>
                <div class="space-y-1">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase">Defect Type</label>
                  <select v-model="defectForm.defect_type" required class="w-full border border-gray-200 rounded-none p-2 text-sm">
                    <option value="damaged">Damaged</option>
                    <option value="wrong_item">Wrong Item</option>
                    <option value="quantity_mismatch">Quantity Mismatch</option>
                    <option value="expired">Expired</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div class="space-y-1">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase">Severity</label>
                  <select v-model="defectForm.severity" required class="w-full border border-gray-200 rounded-none p-2 text-sm">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
                <div class="space-y-1">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase">Qty Affected</label>
                  <input v-model.number="defectForm.quantity_affected" type="number" min="1" class="w-full border border-gray-200 rounded-none p-2 text-sm" />
                </div>
                <div class="md:col-span-2 space-y-1">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase">Description</label>
                  <textarea v-model="defectForm.description" rows="2" required class="w-full border border-gray-200 rounded-none p-2 text-sm" placeholder="Describe the defect..."></textarea>
                </div>
              </div>
              <div class="flex justify-end gap-2">
                <button @click="showDefectForm = false" class="px-4 py-1.5 border border-gray-200 text-gray-600 text-[10px] font-bold font-mono uppercase">Cancel</button>
                <button @click="saveDefect" :disabled="detailLoading" class="px-4 py-1.5 bg-[#2F2E8B] text-white text-[10px] font-bold font-mono uppercase disabled:opacity-50">Report</button>
              </div>
            </div>

            <!-- Defects List -->
            <div v-if="qualityDefects.length > 0" class="space-y-3">
              <div v-for="d in qualityDefects" :key="d.id" class="bg-white border border-gray-100 p-4">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <div class="text-sm font-bold text-gray-900">{{ d.item_description }}</div>
                    <div class="flex items-center gap-2 mt-1">
                      <span :class="['px-2 py-0.5 text-[9px] font-mono font-bold uppercase',
                        d.severity === 'critical' ? 'bg-red-100 text-red-700' :
                        d.severity === 'high' ? 'bg-orange-100 text-orange-700' :
                        d.severity === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600']">
                        {{ d.severity }}
                      </span>
                      <span class="text-[9px] font-mono font-bold uppercase bg-gray-100 text-gray-500 px-2 py-0.5">{{ d.defect_type?.replace('_', ' ') }}</span>
                      <span class="text-[9px] font-mono text-gray-400">Qty: {{ d.quantity_affected }}</span>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <select :value="d.status" @change="updateDefectStatus(d.id, $event.target.value)" class="text-[9px] font-mono font-bold uppercase border border-gray-200 rounded-none p-1">
                      <option value="open">Open</option>
                      <option value="investigating">Investigating</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                    <button @click="deleteDefect(d.id)" class="text-gray-400 hover:text-red-500"><i class="fas fa-trash text-xs"></i></button>
                  </div>
                </div>
                <p class="text-xs text-gray-600 font-mono">{{ d.description }}</p>
                <div v-if="d.resolution" class="mt-2 text-[10px] font-mono text-emerald-700 bg-emerald-50 p-2 border border-emerald-100">
                  <strong>Resolution:</strong> {{ d.resolution }}
                </div>
                <div class="text-[9px] font-mono text-gray-400 mt-2">{{ formatDate(d.created_at) }}</div>
              </div>
            </div>
            <div v-else class="text-center py-8 text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
              <i class="fas fa-bug text-2xl text-gray-200 mb-2 block"></i>
              No quality defects reported
            </div>
            </div>
          <!-- Smart Invoice Tab -->
          <div v-if="detailActiveTab === 'smart-invoice'" class="space-y-4">
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div class="bg-gray-50 border border-gray-100 p-4">
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase mb-1">Government TPIN</div>
                <div class="text-sm font-bold text-gray-900 font-mono">{{ detailSupplier?.tpin || '—' }}</div>
              </div>
              <div class="bg-gray-50 border border-gray-100 p-4">
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase mb-1">Branch ID</div>
                <div class="text-sm font-bold text-gray-900 font-mono">{{ detailSupplier?.branchId || '000' }}</div>
              </div>
              <div class="bg-gray-50 border border-gray-100 p-4">
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase mb-1">Registration Status</div>
                <div class="text-sm font-bold">
                  <GovernmentBadge :type="detailSupplier?.registrationStatus || 'registered'" />
                </div>
              </div>
              <div class="bg-gray-50 border border-gray-100 p-4">
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase mb-1">VAT Status</div>
                <span class="px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded-none bg-emerald-100 text-emerald-700">Active</span>
              </div>
              <div class="bg-gray-50 border border-gray-100 p-4">
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase mb-1">Excise</div>
                <span class="px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded-none bg-emerald-100 text-emerald-700">Registered</span>
              </div>
              <div class="bg-gray-50 border border-gray-100 p-4">
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase mb-1">Tourism Levy</div>
                <span class="px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded-none bg-gray-100 text-gray-600">Not Registered</span>
              </div>
              <div class="bg-gray-50 border border-gray-100 p-4">
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase mb-1">IPL Registration</div>
                <span class="px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded-none bg-emerald-100 text-emerald-700">Registered</span>
              </div>
              <div class="bg-gray-50 border border-gray-100 p-4">
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase mb-1">Last Validation</div>
                <div class="text-sm font-bold text-gray-900 font-mono">{{ detailSupplier?.lastValidation || '2026-07-05' }}</div>
              </div>
              <div class="bg-gray-50 border border-gray-100 p-4">
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase mb-1">Sync Status</div>
                <GovernmentBadge type="synced" />
              </div>
            </div>
          </div>

          <!-- Tax Profile Tab -->
          <div v-if="detailActiveTab === 'tax-profile'">
            <SupplierTaxProfile :supplier="detailSupplier" />
          </div>

          <!-- Purchase History Tab -->
          <div v-if="detailActiveTab === 'purchase-history'" class="space-y-4">
            <div class="text-center py-8 text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
              <i class="fas fa-history text-2xl text-gray-200 mb-2 block"></i>
              Purchase history will load from supplier invoices and smart invoice data.
            </div>
          </div>

          <!-- Performance Tab -->
          <div v-if="detailActiveTab === 'performance'" class="space-y-4">
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div class="bg-gray-50 border border-gray-100 p-4 text-center">
                <div class="text-lg font-black text-emerald-600 font-outfit">95%</div>
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase">Delivery Score</div>
              </div>
              <div class="bg-gray-50 border border-gray-100 p-4 text-center">
                <div class="text-lg font-black text-blue-600 font-outfit">92%</div>
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase">Quality Score</div>
              </div>
              <div class="bg-gray-50 border border-gray-100 p-4 text-center">
                <div class="text-lg font-black text-amber-600 font-outfit">4h</div>
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase">Response Time</div>
              </div>
              <div class="bg-gray-50 border border-gray-100 p-4 text-center">
                <div class="text-lg font-black text-emerald-600 font-outfit">Low</div>
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase">Risk Level</div>
              </div>
            </div>
          </div>

          <!-- Synchronization Tab -->
          <div v-if="detailActiveTab === 'sync'" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SyncStatusCard
                title="VSDC Sync"
                status="connected"
                icon="fas fa-cloud-upload-alt"
                last-sync="2026-07-06 14:32"
                :actions="[
                  { label: 'Sync Now', icon: 'fas fa-sync-alt', variant: 'primary', event: 'sync' },
                  { label: 'View History', icon: 'fas fa-history', variant: 'default', event: 'history' }
                ]"
                @action="$emit('sync-now')"
              />
              <SyncStatusCard
                title="TPIN Validation"
                status="connected"
                icon="fas fa-shield-alt"
                last-sync="2026-07-05"
              />
            </div>
          </div>

          <!-- Audit History Tab -->
          <div v-if="detailActiveTab === 'audit'" class="space-y-4">
            <div class="text-center py-8 text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
              <i class="fas fa-clipboard-list text-2xl text-gray-200 mb-2 block"></i>
              Audit history for this supplier will be available here.
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>
<script setup>
import { BackButton } from '@/components/ui'
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import API_BASE_URL from '@/api_services/api';
import { decodeJWT } from '@/api_services/decodeJWT.js';
import { useCurrency } from '@/composables/useCurrency';
import GovernmentBadge from './supplier/GovernmentBadge.vue';
import SyncStatusCard from './supplier/SyncStatusCard.vue';
import SmartInvoiceDashboard from './supplier/SmartInvoiceDashboard.vue';
import PurchaseRegister from './supplier/PurchaseRegister.vue';
import ReconciliationTable from './supplier/ReconciliationTable.vue';
import SupplierAnalytics from './supplier/SupplierAnalytics.vue';
import AuditTimeline from './supplier/AuditTimeline.vue';
import SyncHistory from './supplier/SyncHistory.vue';
import SupplierTaxProfile from './supplier/SupplierTaxProfile.vue';
import PayloadViewer from './supplier/PayloadViewer.vue';

const { formatCurrency, currencyCode } = useCurrency();
const router = useRouter();
const { getTenantId, getUserRole, getUserEmail } = decodeJWT();
const userRole = ref(getUserRole() || 'user'); // Fallback to 'user'

// Navigation
const navTabs = [
  { id: 'overview', label: 'Overview', icon: 'fas fa-th-large' },
  { id: 'smart-invoice', label: 'Smart Invoice', icon: 'fas fa-file-invoice' },
  { id: 'reconciliation', label: 'Reconciliation', icon: 'fas fa-clipboard-check' },
  { id: 'analytics', label: 'Analytics', icon: 'fas fa-chart-pie' },
  { id: 'audit-log', label: 'Audit Log', icon: 'fas fa-clipboard-list' },
  { id: 'sync-history', label: 'Sync History', icon: 'fas fa-history' },
  { id: 'settings', label: 'Settings', icon: 'fas fa-cogs' },
];

const currentSubView = ref('overview');
const searchQuery = ref('');
const filterType = ref('');
const filterCategory = ref('');
const filterSyncStatus = ref('');
const showGovInfo = ref(false);
const tpinLookupLoading = ref(false);
const tpinValidationResult = ref(null);

const suppliers = ref([]);
const purchaseOrders = ref([]);

// Helper functions
const formatDate = (date) => {
  if (!date) return 'N/A';
  const ts = (typeof date === 'string' && (date.endsWith('Z') || date.includes('+') || date.length === 10)) 
    ? date : (typeof date === 'string' ? `${date}Z` : date);
  const d = new Date(ts);
  if (isNaN(d.getTime())) return 'N/A';
  return d.toLocaleDateString('en-ZM', { year: 'numeric', month: 'short', day: 'numeric' });
};

const formatNumber = (number) => {
  if (!number) return '0.00';
  return Number(number).toFixed(2);
};

const shortId = (id) => {
  if (!id) return '—';
  const s = String(id);
  return s.length > 6 ? s.slice(-6).toUpperCase() : s.toUpperCase();
};

const getSupplierName = (supplierId) => {
  const supplier = suppliers.value.find(s => (s.id || s._id) === supplierId);
  return supplier ? supplier.name : 'Unknown Supplier';
};

const isLoadingSuppliers = ref(false);
const isLoadingOrders = ref(false);

const error = ref(null);

const showSupplierModal = ref(false);
const showPurchaseModal = ref(false);
const isSubmitting = ref(false);
const editingSupplier = ref(null);
const editingOrder = ref(null);

const supplierCategories = [
  'Electronics',
  'Food & Beverages',
  'Office Supplies',
  'Raw Materials',
  'Packaging',
  'Equipment',
  'Machinery',
  'Mining Equipment',
  'Office Furniture',
  'Personal Protective Equipment',
  'Safety Equipment',
  'Computers & Accessories',
  'Electrical Components',
  'Chemicals',
  'Textiles',
  'Construction Materials',
  'Medical Supplies',
  'IT Services',
  'Transportation',
  'Cleaning Supplies',
  'Other'
];

// Computed filtered suppliers
const filteredSuppliers = computed(() => {
  return suppliers.value.filter(supplier => {
    const q = searchQuery.value.toLowerCase();
    if (q) {
      const name = (supplier.name || '').toLowerCase();
      const tpin = (supplier.tpin || supplier.taxId || '').toLowerCase();
      const phone = (supplier.phone || supplier.contact || '').toLowerCase();
      const email = (supplier.email || '').toLowerCase();
      if (!name.includes(q) && !tpin.includes(q) && !phone.includes(q) && !email.includes(q)) return false;
    }
    if (filterType.value && supplier.type !== filterType.value) return false;
    if (filterCategory.value && (!supplier.categories || !supplier.categories.includes(filterCategory.value))) return false;
    if (filterSyncStatus.value === 'gov-synced' && !supplier.isGovSynced) return false;
    if (filterSyncStatus.value === 'manual' && supplier.isGovSynced) return false;
    if (filterSyncStatus.value === 'has-errors' && !supplier.hasErrors) return false;
    if (filterSyncStatus.value === 'pending' && supplier.validationStatus !== 'pending') return false;
    return true;
  });
});

const supplierForm = ref({
  name: '',
  type: 'local',
  contactPerson: '',
  phone: '',
  email: '',
  website: '',
  address: '',
  city: '',
  country: '',
  postalCode: '',
  categories: [],
  paymentTerms: 'net30',
  paymentTermsDays: 30,
  paymentMethod: '',
  creditLimit: 0,
  pricingAgreement: { description: '', discount_percent: 0, valid_from: '', valid_to: '', currency: 'ZMW', notes: '' },
  taxId: '',
  notes: '',
  // Government fields
  tpin: '',
  branchId: '',
  govSource: '',
  registrationStatus: '',
  syncSource: 'manual',
  autoCreated: false
});

const purchaseForm = ref({
  supplierId: '',
  items: [{ selectedProductId: '', description: '', quantity: 1, unitPrice: 0 }],
  deliveryDate: new Date('2025-08-23').toISOString().split('T')[0],
  paymentTerms: 'net30',
  notes: ''
});

const supplierProducts = ref([]);
const loadingSupplierProducts = ref(false);

const getSupplierById = (supplierId) => {
  return suppliers.value.find(s => String(s.id || s._id) === String(supplierId || '')) || null;
};

const normalizeSupplierProducts = (payload) => {
  const list = Array.isArray(payload)
    ? payload
    : (Array.isArray(payload?.products) ? payload.products : (payload?.data || []));
  return (list || []).map((p) => ({
    id: String(p.id || p._id || ''),
    name: p.name || p.description || '',
    sku: p.sku || '',
    stockQty: Number(p.stockQty || 0),
    buyingPrice: Number(p.buyingPrice || 0),
    sellingPrice: Number(p.sellingPrice || 0),
    price: Number(p.price || 0),
    supplier: p.supplier || ''
  })).filter((p) => p.id && p.name);
};

const fetchSupplierProducts = async (supplierId) => {
  supplierProducts.value = [];
  if (!supplierId) return;
  const tenantId = getTenantId();
  if (!tenantId) return;

  loadingSupplierProducts.value = true;
  try {
    const res = await fetch(`${API_BASE_URL}/suppliers/${supplierId}/products?tenant_id=${tenantId}`);
    if (res.ok) {
      supplierProducts.value = normalizeSupplierProducts(await res.json());
      return;
    }

    // Fallback for older backends: filter inventory client-side by supplier name.
    const supplier = getSupplierById(supplierId);
    const supplierName = (supplier?.name || '').trim().toLowerCase();
    const invRes = await fetch(`${API_BASE_URL}/inventory?tenant_id=${tenantId}`);
    if (!invRes.ok) throw new Error('Failed to fetch inventory');
    const inv = await invRes.json();
    const invList = Array.isArray(inv) ? inv : (inv.items || []);
    supplierProducts.value = normalizeSupplierProducts(invList.filter((it) => {
      const s = String(it?.supplier || '').trim();
      return s && (s === String(supplierId) || (supplierName && s.toLowerCase() === supplierName));
    }));
  } catch (e) {
    console.error('Error loading supplier products:', e);
    supplierProducts.value = [];
  } finally {
    loadingSupplierProducts.value = false;
  }
};

const onSupplierProductSelect = (item) => {
  if (!item?.selectedProductId) return;
  const product = supplierProducts.value.find((p) => p.id === String(item.selectedProductId));
  if (!product) return;

  item.description = product.name;
  if (!Number(item.unitPrice || 0)) {
    item.unitPrice = Number(product.buyingPrice || product.price || product.sellingPrice || 0);
  }
};

// Update the computed properties for more precise calculations
const calculateSubtotal = computed(() => {
  return Number(purchaseForm.value.items.reduce((total, item) => 
    total + (Number(item.quantity) * Number(item.unitPrice)), 0).toFixed(2));
});

const calculateVAT = computed(() => {
  // Ensure precise VAT calculation - 16%
  return Number((calculateSubtotal.value * 0.16).toFixed(2));
});

const calculateTotal = computed(() => {
  return Number((calculateSubtotal.value + calculateVAT.value).toFixed(2));
});

const fetchSuppliers = async () => {
  try {
    isLoadingSuppliers.value = true;
    error.value = null;
    const tenantId = getTenantId();

    if (!tenantId) {
      throw new Error('Tenant ID not found');
    }
    
    const response = await fetch(`${API_BASE_URL}/suppliers/?tenant_id=${tenantId}`);
    if (!response.ok) throw new Error('Failed to fetch suppliers');
    
    const data = await response.json();
    console.log('Received suppliers data:', data); // Debug log
    
    // Handle both array and object response formats
    suppliers.value = Array.isArray(data) ? data : 
                     Array.isArray(data.suppliers) ? data.suppliers : 
                     data.data || [];
                     
    console.log('Processed suppliers:', suppliers.value); // Debug log
  } catch (err) {
    console.error('Error fetching suppliers:', err);
    error.value = 'Failed to load suppliers';
  } finally {
    isLoadingSuppliers.value = false;
  }
};

const fetchPurchaseOrders = async () => {
  try {
    isLoadingOrders.value = true;
    error.value = null;
    const tenantId = getTenantId();

    if (!tenantId) {
      throw new Error('Tenant ID not found');
    }

    const response = await fetch(`${API_BASE_URL}/purchase-orders/?tenant_id=${tenantId}`);
    if (!response.ok) throw new Error('Failed to fetch purchase orders');
    
    const data = await response.json();
    console.log('Received purchase orders:', data); // Debug log
    
    // Handle different response formats
    purchaseOrders.value = Array.isArray(data) ? data : 
                          Array.isArray(data.orders) ? data.orders : 
                          data.data || [];
                          
    console.log('Processed purchase orders:', purchaseOrders.value); // Debug log
  } catch (err) {
    console.error('Error fetching purchase orders:', err);
    error.value = 'Failed to load purchase orders';
  } finally {
    isLoadingOrders.value = false;
  }
};

const handleSubmit = async () => {
  try {
    isSubmitting.value = true;
    const tenantId = getTenantId();

    if (!tenantId) {
      throw new Error('Tenant ID not found');
    }

    const url = editingSupplier.value 
      ? `${API_BASE_URL}/suppliers/${editingSupplier.value.id || editingSupplier.value._id}?tenant_id=${tenantId}`
      : `${API_BASE_URL}/suppliers/`;
    
    const response = await fetch(url, {
      method: editingSupplier.value ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingSupplier.value ? supplierForm.value : {
        tenant_id: tenantId,
        ...supplierForm.value
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Supplier update error details:', errorData);
      const detailMsg = typeof errorData.detail === 'object' ? JSON.stringify(errorData.detail) : (errorData.detail || 'Failed to save supplier');
      throw new Error(detailMsg);
    }
    
    await fetchSuppliers();
    closeSupplierModal();
  } catch (error) {
    console.error('Error saving supplier:', error);
    alert('Failed to save supplier: ' + error.message);
  } finally {
    isSubmitting.value = false;
  }
};

// Update the handlePurchaseSubmit function
const handlePurchaseSubmit = async () => {
  try {
    isSubmitting.value = true;
    const tenantId = getTenantId();

    if (!tenantId) {
      throw new Error('Tenant ID not found');
    }

    // Calculate totals with precision
    const subtotal = calculateSubtotal.value;
    const vat = calculateVAT.value;
    const total = calculateTotal.value;

    // Format items with precise calculations
    const formattedItems = purchaseForm.value.items.map(item => {
      const quantity = parseInt(item.quantity, 10);
      const unitPrice = Number(Number(item.unitPrice).toFixed(2));
      const itemTotal = Number((quantity * unitPrice).toFixed(2));

      return {
        description: item.description,
        quantity,
        unit_price: unitPrice, // Backend expects snake_case
        total: itemTotal,
        product_id: item.selectedProductId || ''
      };
    });

    const orderData = {
      tenant_id: tenantId,
      supplier_id: purchaseForm.value.supplierId,
      order_date: editingOrder.value ? editingOrder.value.order_date : new Date().toISOString().split('T')[0],
      delivery_date: purchaseForm.value.deliveryDate,
      payment_terms: purchaseForm.value.paymentTerms,
      notes: purchaseForm.value.notes || '',
      items: formattedItems,
      subtotal,
      vat,
      total,
      status: editingOrder.value ? editingOrder.value.status : 'pending',
      currency: (currencyCode && currencyCode.value) ? currencyCode.value : 'ZMW'
    };

    const url = editingOrder.value 
      ? `${API_BASE_URL}/purchase-orders/${editingOrder.value.id || editingOrder.value._id}?tenant_id=${tenantId}`
      : `${API_BASE_URL}/purchase-orders/?tenant_id=${tenantId}`;

    const response = await fetch(url, {
      method: editingOrder.value ? 'PUT' : 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server validation errors:', errorData);
      throw new Error(errorData.detail || 'Failed to save purchase order');
    }
    
    await fetchPurchaseOrders();
    closePurchaseModal();
    alert(editingOrder.value ? 'Purchase order updated successfully' : 'Purchase order created successfully');
  } catch (error) {
    console.error('Error saving purchase order:', error);
    alert(error.message || 'Failed to save purchase order. Please check your input and try again.');
  } finally {
    isSubmitting.value = false;
  }
};

const deleteSupplier = async (supplierId) => {
  if (!confirm('Are you sure you want to delete this supplier?')) return;
  
  try {
    const tenantId = getTenantId();
    if (!tenantId) throw new Error('Tenant ID not found');

    const response = await fetch(`${API_BASE_URL}/suppliers/${supplierId}?tenant_id=${tenantId}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Failed to delete supplier');
    
    await fetchSuppliers();
  } catch (error) {
    console.error('Error deleting supplier:', error);
    alert('Failed to delete supplier: ' + error.message);
  }
};

const closeSupplierModal = () => {
  showSupplierModal.value = false;
  editingSupplier.value = null;
  showGovInfo.value = false;
  supplierForm.value = {
    name: '',
    type: 'local',
    contactPerson: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    categories: [],
    paymentTerms: 'net30',
    paymentTermsDays: 30,
    paymentMethod: '',
    creditLimit: 0,
    pricingAgreement: { description: '', discount_percent: 0, valid_from: '', valid_to: '', currency: 'ZMW', notes: '' },
    taxId: '',
    notes: '',
    tpin: '',
    branchId: '',
    govSource: '',
    registrationStatus: '',
    syncSource: 'manual',
    autoCreated: false
  };
};

const closePurchaseModal = () => {
  showPurchaseModal.value = false;
  editingOrder.value = null;
  supplierProducts.value = [];
  purchaseForm.value = {
    supplierId: '',
    items: [{ selectedProductId: '', description: '', quantity: 1, unitPrice: 0 }],
    deliveryDate: new Date().toISOString().split('T')[0],
    paymentTerms: 'net30',
    notes: ''
  };
};

const openSupplierModal = () => {
  if (isSubmitting.value) return;
  showSupplierModal.value = true;
  tpinValidationResult.value = null;
};

// TPIN auto-lookup on blur
const onTpinBlur = async () => {
  const tpin = supplierForm.value.tpin?.trim();
  if (!tpin || tpin.length < 10) {
    tpinValidationResult.value = null;
    return;
  }
  tpinLookupLoading.value = true;
  tpinValidationResult.value = null;
  try {
    const tenantId = getTenantId();
    if (!tenantId) return;
    const res = await fetch(`${API_BASE_URL}/zra/vsdc/lookup-tpin?tenant_id=${tenantId}&tpin=${encodeURIComponent(tpin)}`);
    if (res.ok) {
      const data = await res.json();
      tpinValidationResult.value = { valid: data.valid, message: data.message };
      if (data.valid && data.branch_id) {
        supplierForm.value.branchId = data.branch_id;
      }
      if (data.valid) {
        supplierForm.value.registrationStatus = data.registration_status || 'registered';
        supplierForm.value.govSource = 'vsdc';
        supplierForm.value.syncSource = 'auto';
        if (data.taxpayer_name && !supplierForm.value.name) {
          supplierForm.value.name = data.taxpayer_name;
        }
      }
    } else {
      tpinValidationResult.value = { valid: false, message: 'Lookup failed — VSDC may not be configured' };
    }
  } catch (e) {
    console.warn('TPIN lookup error:', e);
    tpinValidationResult.value = { valid: false, message: 'Could not reach VSDC service' };
  } finally {
    tpinLookupLoading.value = false;
  }
};

const openPurchaseModal = () => {
  if (isSubmitting.value) return;
  showPurchaseModal.value = true;
};

const editSupplier = (supplier) => {
  editingSupplier.value = supplier;
  showGovInfo.value = !!(supplier.tpin || supplier.isGovSynced || supplier.autoCreated);
  supplierForm.value = {
    name: supplier.name || '',
    type: supplier.type || 'local',
    contactPerson: supplier.contactPerson || '',
    phone: supplier.phone || supplier.contact || '',
    email: supplier.email || '',
    website: supplier.website || '',
    address: supplier.address || '',
    city: supplier.city || '',
    country: supplier.country || '',
    postalCode: supplier.postalCode || '',
    categories: supplier.categories || [],
    paymentTerms: supplier.paymentTerms || 'net30',
    paymentTermsDays: supplier.paymentTermsDays || 30,
    paymentMethod: supplier.paymentMethod || '',
    creditLimit: supplier.creditLimit || 0,
    pricingAgreement: supplier.pricingAgreement || { description: '', discount_percent: 0, valid_from: '', valid_to: '', currency: 'ZMW', notes: '' },
    taxId: supplier.taxId || '',
    notes: supplier.notes || '',
    tpin: supplier.tpin || '',
    branchId: supplier.branchId || '',
    govSource: supplier.govSource || '',
    registrationStatus: supplier.registrationStatus || '',
    syncSource: supplier.syncSource || 'manual',
    autoCreated: supplier.autoCreated || false
  };
  showSupplierModal.value = true;
};

const addOrderItem = () => {
  purchaseForm.value.items.push({ selectedProductId: '', description: '', quantity: 1, unitPrice: 0 });
};

const removeOrderItem = (index) => {
  if (purchaseForm.value.items.length > 1) {
    purchaseForm.value.items.splice(index, 1);
  }
};

// Helper functions moved to top of script setup

const changeOrderStatus = async (order, newStatus) => {
  const orderId = order.id || order._id;
  const tenantId = getTenantId();
  if (!tenantId || !orderId) return;
  try {
    const res = await fetch(`${API_BASE_URL}/purchase-orders/${orderId}/status?tenant_id=${tenantId}&status=${encodeURIComponent(newStatus)}`, {
      method: 'PATCH',
    });
    if (!res.ok) throw new Error('Failed to update status');
    order.status = newStatus;
  } catch (e) {
    console.error('Error updating order status:', e);
    alert('Failed to update order status');
    await fetchPurchaseOrders();
  }
};

const viewOrder = (order) => {
  editingOrder.value = order;
  
  // Safely map items, handling both camelCase and snake_case
  const items = (order.items || []).map(item => ({
    selectedProductId: item.product_id || '',
    description: item.description || '',
    quantity: item.quantity || 1,
    unitPrice: item.unit_price !== undefined ? item.unit_price : (item.unitPrice || 0)
  }));

  // Populate form
  purchaseForm.value = {
    supplierId: order.supplier_id || '',
    deliveryDate: order.delivery_date ? (new Date(order.delivery_date).toISOString().split('T')[0]) : new Date().toISOString().split('T')[0],
    paymentTerms: order.payment_terms || 'net30',
    notes: order.notes || '',
    items: items.length > 0 ? items : [{ selectedProductId: '', description: '', quantity: 1, unitPrice: 0 }]
  };

  showPurchaseModal.value = true;
};

watch(() => purchaseForm.value.supplierId, async (newSupplierId, oldSupplierId) => {
  await fetchSupplierProducts(newSupplierId);
  if (oldSupplierId && newSupplierId !== oldSupplierId) {
    for (const item of purchaseForm.value.items || []) {
      item.selectedProductId = '';
    }
  }
});

const deleteOrder = async (orderId) => {
  if (!confirm('Are you sure you want to delete this order?')) return;
  
  try {
    const tenantId = getTenantId();
    if (!tenantId) throw new Error('Tenant ID not found');

    const response = await fetch(`${API_BASE_URL}/purchase-orders/${orderId}?tenant_id=${tenantId}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Failed to delete order');
    
    await fetchPurchaseOrders();
  } catch (error) {
    console.error('Error deleting order:', error);
    alert('Failed to delete order: ' + error.message);
  }
};

// Add this function to your script setup section, along with other helper functions
const getOrderStatusClass = (status) => {
  switch (status?.toLowerCase()) {
    case 'pending':
      return 'bg-[#FEF3C7] text-[#F59E0B]';
    case 'completed':
      return 'bg-[#D1FAE5] text-[#10B981]';
    case 'approved':
      return 'bg-[#E0F2FE] text-[#2F2E8B]';
    case 'cancelled':
      return 'bg-[#FEE2E2] text-[#DC2626]';
    case 'processing':
      return 'bg-[#EFF6FF] text-[#3B82F6]';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

onMounted(async () => {
  await Promise.all([
    fetchSuppliers(),
    fetchPurchaseOrders()
  ]);
});

// ====================== Supplier Detail View ======================
const showDetailModal = ref(false);
const detailSupplier = ref(null);
const detailActiveTab = ref('overview');
const detailLoading = ref(false);

const detailTabs = [
  { id: 'overview', name: 'Overview', icon: 'fas fa-info-circle' },
  { id: 'invoices', name: 'Invoices', icon: 'fas fa-file-invoice-dollar' },
  { id: 'goods-receipts', name: 'Goods Receipts', icon: 'fas fa-box-open' },
  { id: 'defects', name: 'Quality Defects', icon: 'fas fa-bug' },
  { id: 'smart-invoice', name: 'Smart Invoice', icon: 'fas fa-file-invoice' },
  { id: 'tax-profile', name: 'Tax Profile', icon: 'fas fa-shield-alt' },
  { id: 'purchase-history', name: 'Purchase History', icon: 'fas fa-history' },
  { id: 'performance', name: 'Performance', icon: 'fas fa-chart-line' },
  { id: 'sync', name: 'Synchronization', icon: 'fas fa-sync-alt' },
  { id: 'audit', name: 'Audit History', icon: 'fas fa-clipboard-list' },
];

// Sub-data
const supplierInvoices = ref([]);
const goodsReceipts = ref([]);
const qualityDefects = ref([]);

// Form toggles
const showInvoiceForm = ref(false);
const showReceiptForm = ref(false);
const showDefectForm = ref(false);

const invoiceForm = ref({ invoice_number: '', invoice_date: '', due_date: '', amount: 0, status: 'unpaid', notes: '' });
const receiptForm = ref({ purchase_order_id: '', received_by: '', items: [{ description: '', expected_qty: 0, received_qty: 0, unit_price: 0 }], notes: '' });
const defectForm = ref({ item_description: '', defect_type: 'damaged', severity: 'medium', quantity_affected: 1, description: '' });

const openSupplierDetail = async (supplier) => {
  detailSupplier.value = supplier;
  detailActiveTab.value = 'overview';
  showDetailModal.value = true;
  await loadDetailData(supplier);
};

const closeDetailModal = () => {
  showDetailModal.value = false;
  detailSupplier.value = null;
  supplierInvoices.value = [];
  goodsReceipts.value = [];
  qualityDefects.value = [];
  showInvoiceForm.value = false;
  showReceiptForm.value = false;
  showDefectForm.value = false;
};

const loadDetailData = async (supplier) => {
  const tenantId = getTenantId();
  const sid = supplier.id || supplier._id;
  if (!tenantId || !sid) return;
  detailLoading.value = true;
  try {
    const [invRes, grRes, dRes] = await Promise.all([
      fetch(`${API_BASE_URL}/suppliers/${sid}/invoices?tenant_id=${tenantId}`),
      fetch(`${API_BASE_URL}/suppliers/${sid}/goods-receipts?tenant_id=${tenantId}`),
      fetch(`${API_BASE_URL}/suppliers/${sid}/quality-defects?tenant_id=${tenantId}`),
    ]);
    if (invRes.ok) supplierInvoices.value = await invRes.json();
    if (grRes.ok) goodsReceipts.value = await grRes.json();
    if (dRes.ok) qualityDefects.value = await dRes.json();
  } catch (e) {
    console.error('Error loading supplier detail data:', e);
  } finally {
    detailLoading.value = false;
  }
};

// --- Invoices ---
const saveInvoice = async () => {
  const tenantId = getTenantId();
  const sid = detailSupplier.value?.id || detailSupplier.value?._id;
  if (!tenantId || !sid) return;
  detailLoading.value = true;
  try {
    const res = await fetch(`${API_BASE_URL}/suppliers/${sid}/invoices`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tenant_id: tenantId, supplier_id: sid, ...invoiceForm.value }),
    });
    if (!res.ok) throw new Error('Failed to save invoice');
    showInvoiceForm.value = false;
    invoiceForm.value = { invoice_number: '', invoice_date: '', due_date: '', amount: 0, status: 'unpaid', notes: '' };
    await loadDetailData(detailSupplier.value);
  } catch (e) {
    alert(e.message);
  } finally {
    detailLoading.value = false;
  }
};

const deleteInvoice = async (invoiceId) => {
  if (!confirm('Delete this invoice?')) return;
  const tenantId = getTenantId();
  const sid = detailSupplier.value?.id || detailSupplier.value?._id;
  try {
    await fetch(`${API_BASE_URL}/suppliers/${sid}/invoices/${invoiceId}?tenant_id=${tenantId}`, { method: 'DELETE' });
    await loadDetailData(detailSupplier.value);
  } catch (e) {
    alert('Failed to delete invoice');
  }
};

// --- Goods Receipts ---
const addReceiptItem = () => {
  receiptForm.value.items.push({ description: '', expected_qty: 0, received_qty: 0, unit_price: 0 });
};

const saveGoodsReceipt = async () => {
  const tenantId = getTenantId();
  const sid = detailSupplier.value?.id || detailSupplier.value?._id;
  if (!tenantId || !sid) return;
  detailLoading.value = true;
  try {
    const res = await fetch(`${API_BASE_URL}/suppliers/${sid}/goods-receipts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tenant_id: tenantId, supplier_id: sid, ...receiptForm.value }),
    });
    if (!res.ok) throw new Error('Failed to save goods receipt');
    showReceiptForm.value = false;
    receiptForm.value = { purchase_order_id: '', received_by: '', items: [{ description: '', expected_qty: 0, received_qty: 0, unit_price: 0 }], notes: '' };
    await loadDetailData(detailSupplier.value);
  } catch (e) {
    alert(e.message);
  } finally {
    detailLoading.value = false;
  }
};

const deleteGoodsReceipt = async (receiptId) => {
  if (!confirm('Delete this goods receipt?')) return;
  const tenantId = getTenantId();
  const sid = detailSupplier.value?.id || detailSupplier.value?._id;
  try {
    await fetch(`${API_BASE_URL}/suppliers/${sid}/goods-receipts/${receiptId}?tenant_id=${tenantId}`, { method: 'DELETE' });
    await loadDetailData(detailSupplier.value);
  } catch (e) {
    alert('Failed to delete goods receipt');
  }
};

// --- Quality Defects ---
const saveDefect = async () => {
  const tenantId = getTenantId();
  const sid = detailSupplier.value?.id || detailSupplier.value?._id;
  if (!tenantId || !sid) return;
  detailLoading.value = true;
  try {
    const res = await fetch(`${API_BASE_URL}/suppliers/${sid}/quality-defects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tenant_id: tenantId, supplier_id: sid, ...defectForm.value }),
    });
    if (!res.ok) throw new Error('Failed to report defect');
    showDefectForm.value = false;
    defectForm.value = { item_description: '', defect_type: 'damaged', severity: 'medium', quantity_affected: 1, description: '' };
    await loadDetailData(detailSupplier.value);
  } catch (e) {
    alert(e.message);
  } finally {
    detailLoading.value = false;
  }
};

const updateDefectStatus = async (defectId, newStatus) => {
  const tenantId = getTenantId();
  const sid = detailSupplier.value?.id || detailSupplier.value?._id;
  try {
    await fetch(`${API_BASE_URL}/suppliers/${sid}/quality-defects/${defectId}?tenant_id=${tenantId}&status=${newStatus}`, { method: 'PUT' });
    await loadDetailData(detailSupplier.value);
  } catch (e) {
    alert('Failed to update defect status');
  }
};

const deleteDefect = async (defectId) => {
  if (!confirm('Delete this defect report?')) return;
  const tenantId = getTenantId();
  const sid = detailSupplier.value?.id || detailSupplier.value?._id;
  try {
    await fetch(`${API_BASE_URL}/suppliers/${sid}/quality-defects/${defectId}?tenant_id=${tenantId}`, { method: 'DELETE' });
    await loadDetailData(detailSupplier.value);
  } catch (e) {
    alert('Failed to delete defect');
  }
};

// ====================== Smart Invoice Handlers ======================
const onSyncNow = async () => {
  const tenantId = getTenantId();
  if (!tenantId) return alert('Tenant ID not found');
  try {
    const res = await fetch(`${API_BASE_URL}/zra/vsdc/sync?tenant_id=${tenantId}`, { method: 'POST' });
    if (res.ok) {
      alert('Synchronization started successfully.');
    } else {
      const err = await res.json().catch(() => ({}));
      alert(err.detail || 'Synchronization failed. Please try again.');
    }
  } catch (e) {
    console.warn('Sync endpoint not available yet — backend integration pending.');
    // Mock response for frontend-only mode
    alert('Synchronization initiated. This is a mock response — backend VSDC integration pending.');
  }
};

const onRefreshStatus = async () => {
  const tenantId = getTenantId();
  if (!tenantId) return;
  console.log('Refreshing VSDC status...');
  // TODO: connect to GET /zra/vsdc/status when backend is ready
};

const onRetryFailed = async () => {
  const tenantId = getTenantId();
  if (!tenantId) return;
  console.log('Retrying failed syncs...');
  // TODO: connect to POST /zra/vsdc/retry when backend is ready
};

const onViewPurchaseDetail = (invoice) => {
  console.log('View purchase detail:', invoice);
  // TODO: open purchase detail modal
};
</script>

<style scoped>
/* Custom animations and scrollbars to match POS */
@keyframes modal-in {
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}
.animate-modal-in {
  animation: modal-in 0.2s cubic-bezier(0, 0, 0.2, 1) forwards;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #2F2E8B;
  border-radius: 0;
}
</style>