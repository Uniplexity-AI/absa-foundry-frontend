<template>
  <div class="min-h-screen flex flex-col font-sans relative text-gray-900 bg-gray-50">
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <!-- Header -->
    <header class="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-[100] shadow-sm">
      <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <button @click="$router.push('/dashboard/invoicing')" class="text-gray-400 hover:text-brand transition-colors mr-2">
            <i class="fas fa-arrow-left text-lg"></i>
          </button>
          <div class="w-2 h-8 bg-brand rounded-none"></div>
          <div>
            <div class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <i class="fas fa-redo text-brand"></i>
              <span>Invoice Management // Recurring</span>
            </div>
            <h1 class="text-xl font-black text-gray-900 uppercase tracking-tight font-display">Recurring Invoices</h1>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <!-- Upcoming reminder badge -->
          <div v-if="upcomingCount > 0" class="hidden md:flex items-center gap-2 border border-amber-300 bg-amber-50 text-amber-700 px-3 py-1.5 text-[10px] font-mono font-bold uppercase">
            <i class="fas fa-bell animate-pulse"></i>
            {{ upcomingCount }} due in {{ reminderDays }}d
          </div>
          <button @click="refreshData" :disabled="loading" class="hidden md:flex items-center gap-2 text-[10px] font-mono font-bold text-brand hover:opacity-80 uppercase tracking-wider transition-all disabled:opacity-50 border border-brand/20 px-3 py-1.5 hover:bg-brand/5">
            <i class="fas fa-sync-alt" :class="{ 'animate-spin': loading }"></i> Refresh
          </button>
          <button @click="openCreateModal()" class="bg-brand hover:opacity-90 text-white px-4 py-2 rounded-none text-[10px] font-bold font-mono uppercase shadow-md transition-all flex items-center gap-2">
            <i class="fas fa-plus"></i> New Recurring
          </button>
        </div>
      </div>
    </header>

    <main class="flex-1 max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-12 relative z-10 space-y-6">

      <!-- Loading -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-20">
        <div class="h-12 w-12 border-4 border-gray-100 border-t-brand rounded-full animate-spin shadow-lg mb-4"></div>
        <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest animate-pulse">Loading Recurring Invoices...</p>
      </div>

      <div v-else class="space-y-6">
        <!-- Summary Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-white border border-gray-100 p-5 rounded-none shadow-sm">
            <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Total Templates</p>
            <h4 class="text-2xl font-black text-gray-900 font-display mt-1">{{ recurringList.length }}</h4>
          </div>
          <div class="bg-white border border-gray-100 p-5 rounded-none shadow-sm">
            <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Active</p>
            <h4 class="text-2xl font-black text-brand font-display mt-1">{{ activeCount }}</h4>
          </div>
          <div class="bg-white border border-gray-100 p-5 rounded-none shadow-sm">
            <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Total Generated</p>
            <h4 class="text-2xl font-black text-gray-900 font-display mt-1">{{ totalGenerated }}</h4>
          </div>
          <div class="bg-amber-50 border border-amber-200 p-5 rounded-none shadow-sm">
            <p class="text-[9px] font-mono font-bold text-amber-600 uppercase tracking-widest">Upcoming ({{ reminderDays }}d)</p>
            <h4 class="text-2xl font-black text-amber-700 font-display mt-1">{{ upcomingCount }}</h4>
          </div>
          <div class="bg-red-50 border border-red-200 p-5 rounded-none shadow-sm">
            <p class="text-[9px] font-mono font-bold text-red-600 uppercase tracking-widest">Overdue</p>
            <h4 class="text-2xl font-black text-red-700 font-display mt-1">{{ overdueCount }}</h4>
          </div>
        </div>

        <!-- Upcoming Reminders Banner -->
        <div v-if="upcomingList.length > 0" class="bg-amber-50 border border-amber-300 p-4 rounded-none">
          <div class="flex items-center gap-2 mb-3">
            <i class="fas fa-bell text-amber-600"></i>
            <span class="text-[10px] font-mono font-black text-amber-700 uppercase tracking-widest">Upcoming Due Dates</span>
            <select v-model="reminderDays" @change="loadUpcoming" class="ml-auto border border-amber-300 rounded-none px-2 py-1 text-[10px] font-mono font-bold uppercase bg-white text-amber-700 focus:ring-amber-400">
              <option :value="3">3 days</option>
              <option :value="7">7 days</option>
              <option :value="14">14 days</option>
              <option :value="30">30 days</option>
            </select>
          </div>
          <div class="flex flex-wrap gap-3">
            <div v-for="rec in upcomingList" :key="rec.id"
              class="bg-white border border-amber-200 px-4 py-3 flex items-center gap-3 cursor-pointer hover:border-amber-400 transition-colors"
              @click="openDetailDrawer(rec)">
              <i class="fas fa-calendar-alt text-amber-500"></i>
              <div>
                <p class="text-[10px] font-mono font-black text-gray-900 uppercase">{{ rec.clientName || 'Unknown Client' }}</p>
                <p class="text-[9px] font-mono text-amber-600 font-bold">Due: {{ formatDate(rec.next_issue_date) }} &bull; {{ capitalize(rec.frequency) }}</p>
              </div>
              <button @click.stop="generateInstance(rec)" :disabled="generatingId === rec.id"
                class="ml-2 bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 text-[9px] font-mono font-bold uppercase transition-colors disabled:opacity-50">
                <i :class="generatingId === rec.id ? 'fas fa-spinner fa-spin' : 'fas fa-bolt'"></i>
                {{ generatingId === rec.id ? '...' : 'Issue Now' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Overdue Banner -->
        <div v-if="overdueList.length > 0" class="bg-red-50 border border-red-300 p-4 rounded-none">
          <div class="flex items-center gap-2 mb-3">
            <i class="fas fa-exclamation-triangle text-red-600"></i>
            <span class="text-[10px] font-mono font-black text-red-700 uppercase tracking-widest">Overdue & Unsettled</span>
          </div>
          <div class="flex flex-wrap gap-3">
            <div v-for="inst in overdueList" :key="inst.id"
              class="bg-white border border-red-200 px-4 py-3 flex items-center gap-3 hover:border-red-400 transition-colors">
              <i class="fas fa-exclamation-circle text-red-500"></i>
              <div>
                <p class="text-[10px] font-mono font-black text-gray-900 uppercase">{{ inst.clientName || 'Unknown Client' }}</p>
                <p class="text-[8px] font-mono text-gray-400">{{ inst.invoice_number }}</p>
                <p class="text-[9px] font-mono text-red-600 font-bold">Due: {{ formatDate(inst.due_date) }} &bull; {{ inst.status }}</p>
              </div>
              <span class="text-[10px] font-mono font-black text-red-700 ml-auto">{{ formatWithSymbol(inst.total) }}</span>
              <button @click="markInstancePaid(inst)" :disabled="saving"
                class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-[9px] font-mono font-bold uppercase transition-colors disabled:opacity-50 whitespace-nowrap">
                Mark Paid
              </button>
            </div>
          </div>
        </div>

        <!-- Filter Row -->
        <div class="bg-white border border-gray-100 p-4 rounded-none shadow-sm flex flex-col sm:flex-row gap-3">
          <input v-model="searchQuery" type="text" placeholder="Search by client name..."
            class="flex-1 rounded-none border border-gray-200 px-4 py-2.5 text-sm focus:border-brand focus:ring-1 focus:ring-brand font-mono">
          <select v-model="filterStatus" class="rounded-none border border-gray-200 px-4 py-2.5 text-sm focus:border-brand focus:ring-1 focus:ring-brand font-mono">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <select v-model="filterFreq" class="rounded-none border border-gray-200 px-4 py-2.5 text-sm focus:border-brand focus:ring-1 focus:ring-brand font-mono">
            <option value="all">All Frequencies</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <!-- Recurring Invoice Cards -->
        <div v-if="filteredList.length === 0" class="text-center py-16 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
          <i class="fas fa-redo text-4xl text-gray-200 mb-4 block"></i>
          NO_RECURRING_INVOICES_FOUND
          <br>
          <button @click="openCreateModal()" class="mt-4 bg-brand text-white px-4 py-2 text-[10px] font-mono font-bold uppercase">
            <i class="fas fa-plus mr-1"></i> Create First Recurring Invoice
          </button>
        </div>

        <div v-else class="space-y-4">
          <div v-for="rec in filteredList" :key="rec.id"
            class="bg-white border border-gray-100 hover:border-brand/30 rounded-none shadow-sm transition-all">

            <!-- Template Header -->
            <div class="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <!-- Status dot -->
              <div class="flex-shrink-0">
                <div :class="rec.is_active ? 'bg-emerald-500' : 'bg-gray-300'" class="w-3 h-3 rounded-full mt-1"></div>
              </div>

              <!-- Info -->
              <div class="flex-1 min-w-0">
                <div class="flex flex-wrap items-center gap-2 mb-1">
                  <span class="text-sm font-black text-gray-900 uppercase">{{ rec.clientName || 'Unnamed Client' }}</span>
                  <span class="text-[8px] font-mono font-black px-2 py-0.5 border uppercase"
                    :class="rec.is_active ? 'border-emerald-400 text-emerald-700 bg-emerald-50' : 'border-gray-300 text-gray-500 bg-gray-50'">
                    {{ rec.is_active ? 'Active' : 'Inactive' }}
                  </span>
                  <span class="text-[8px] font-mono font-black px-2 py-0.5 border border-brand/30 text-brand bg-brand/5 uppercase">
                    {{ capitalize(rec.frequency) }}<span v-if="rec.interval > 1"> × {{ rec.interval }}</span>
                  </span>
                </div>
                <div class="flex flex-wrap gap-4 text-[10px] font-mono text-gray-500">
                  <span><i class="fas fa-calendar-check mr-1 text-brand"></i>Next: <strong class="text-gray-800">{{ formatDate(rec.next_issue_date) }}</strong></span>
                  <span v-if="rec.end_date"><i class="fas fa-calendar-times mr-1 text-red-400"></i>Ends: {{ formatDate(rec.end_date) }}</span>
                  <span><i class="fas fa-copy mr-1"></i>{{ rec.total_generated || 0 }} issued</span>
                  <span v-if="rec.total"><i class="fas fa-coins mr-1"></i>{{ formatWithSymbol(rec.total) }} / cycle</span>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex items-center gap-2 flex-shrink-0">
                <button @click="generateInstance(rec)" :disabled="!rec.is_active || generatingId === rec.id"
                  class="text-[9px] font-mono font-bold uppercase px-3 py-1.5 border transition-colors"
                  :class="rec.is_active ? 'border-brand text-brand hover:bg-brand hover:text-white' : 'border-gray-200 text-gray-400 cursor-not-allowed'">
                  <i :class="generatingId === rec.id ? 'fas fa-spinner fa-spin' : 'fas fa-bolt'"></i>
                  {{ generatingId === rec.id ? 'Generating...' : 'Issue Next' }}
                </button>
                <button @click="openDetailDrawer(rec)" class="p-2 text-gray-400 hover:text-brand hover:bg-brand/5 transition-colors" title="View History">
                  <i class="fas fa-history text-xs"></i>
                </button>
                <button @click="openEditModal(rec)" class="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-colors" title="Edit Schedule">
                  <i class="fas fa-edit text-xs"></i>
                </button>
                <button @click="toggleActive(rec)" class="p-2 transition-colors"
                  :class="rec.is_active ? 'text-gray-400 hover:text-emerald-600 hover:bg-emerald-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'"
                  :title="rec.is_active ? 'Pause' : 'Resume'">
                  <i :class="rec.is_active ? 'fas fa-pause text-xs' : 'fas fa-play text-xs'"></i>
                </button>
                <button @click="confirmDelete(rec)" class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Delete">
                  <i class="fas fa-trash text-xs"></i>
                </button>
              </div>
            </div>

            <!-- Version History (collapsible) -->
            <div v-if="expandedIds.has(rec.id)" class="border-t border-gray-100 bg-gray-50/50">
              <div class="p-4">
                <p class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mb-3">Version History</p>
                <div v-if="(instancesMap[rec.id] || []).length === 0" class="text-[10px] font-mono text-gray-400 uppercase">
                  No instances generated yet
                </div>
                <div v-else class="overflow-x-auto">
                  <table class="w-full text-left border-collapse">
                    <thead>
                      <tr class="border-b border-gray-200">
                        <th class="py-2 px-3 text-[8px] font-mono font-black text-gray-400 uppercase">Version</th>
                        <th class="py-2 px-3 text-[8px] font-mono font-black text-gray-400 uppercase">Invoice #</th>
                        <th class="py-2 px-3 text-[8px] font-mono font-black text-gray-400 uppercase">Issue Date</th>
                        <th class="py-2 px-3 text-[8px] font-mono font-black text-gray-400 uppercase">Due Date</th>
                        <th class="py-2 px-3 text-[8px] font-mono font-black text-gray-400 uppercase text-right">Amount</th>
                        <th class="py-2 px-3 text-[8px] font-mono font-black text-gray-400 uppercase text-right">Status</th>
                        <th class="py-2 px-3 text-[8px] font-mono font-black text-gray-400 uppercase text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                      <tr v-for="inst in (instancesMap[rec.id] || [])" :key="inst.id" class="hover:bg-white transition-colors">
                        <td class="py-2.5 px-3 text-[10px] font-mono font-bold text-brand">#{{ inst.version }}</td>
                        <td class="py-2.5 px-3 text-[10px] font-mono text-gray-700 uppercase">{{ inst.invoice_number }}</td>
                        <td class="py-2.5 px-3 text-[10px] font-mono text-gray-500">{{ formatDate(inst.issue_date) }}</td>
                        <td class="py-2.5 px-3 text-[10px] font-mono text-gray-500">{{ formatDate(inst.due_date) }}</td>
                        <td class="py-2.5 px-3 text-[10px] font-mono font-black text-gray-900 text-right">{{ formatWithSymbol(inst.total) }}</td>
                        <td class="py-2.5 px-3 text-right">
                          <span :class="getStatusClass(inst.status)" class="text-[8px] font-mono font-black px-2 py-0.5 border uppercase">{{ inst.status }}</span>
                        </td>
                        <td class="py-2.5 px-3 text-right">
                          <select :value="inst.status" @change="updateInstanceStatus(rec.id, inst.id, $event.target.value)"
                            class="text-[9px] font-mono border border-gray-200 rounded-none px-2 py-1 focus:border-brand focus:ring-1 focus:ring-brand">
                            <option value="draft">Draft</option>
                            <option value="sent">Sent</option>
                            <option value="paid">Paid</option>
                            <option value="pending">Pending</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- Expand/Collapse History Toggle -->
            <button @click="toggleExpand(rec)" class="w-full border-t border-gray-100 py-2 text-[9px] font-mono font-bold text-gray-400 hover:text-brand hover:bg-brand/5 transition-colors uppercase tracking-wider flex items-center justify-center gap-2">
              <i :class="expandedIds.has(rec.id) ? 'fas fa-chevron-up' : 'fas fa-chevron-down'" class="text-[8px]"></i>
              {{ expandedIds.has(rec.id) ? 'Hide History' : `View History (${rec.total_generated || 0} copies)` }}
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- ─────────────── Create / Edit Modal ─────────────── -->
    <Teleport to="body">
      <div v-if="showModal" @click.self="closeModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] p-4">
        <div @click.stop class="bg-white rounded-none shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
          <div class="h-1.5 w-full bg-brand"></div>
          <div class="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
            <h3 class="text-lg font-black text-gray-900 font-display uppercase">
              {{ editingRec ? 'Edit Recurring Invoice' : 'New Recurring Invoice' }}
            </h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600 text-xl"><i class="fas fa-times"></i></button>
          </div>
          <form @submit.prevent="saveRecurring" class="p-6 space-y-5">

            <!-- Schedule Section -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-calendar-alt text-brand"></i> Recurrence Schedule
              </h4>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Frequency *</label>
                  <select v-model="formData.frequency" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Every (interval)</label>
                  <input v-model.number="formData.interval" type="number" min="1" max="12"
                    class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                  <p class="text-[9px] font-mono text-gray-400 mt-1">e.g. 2 = every 2 {{ formData.frequency }}s</p>
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Start Date *</label>
                  <input v-model="formData.start_date" required type="date"
                    class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">End Date <span class="text-gray-400 font-normal">(optional)</span></label>
                  <input v-model="formData.end_date" type="date"
                    class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                  <p class="text-[9px] font-mono text-gray-400 mt-1">Leave blank for open-ended</p>
                </div>
              </div>
            </div>

            <!-- Client Section -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-user-tie text-brand"></i> Client Information
              </h4>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Client Name *</label>
                  <input v-model="formData.clientName" required type="text"
                    class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Client Email *</label>
                  <input v-model="formData.clientEmail" required type="email"
                    class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Client Phone</label>
                  <input v-model="formData.clientPhone" type="tel"
                    class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Client TPIN</label>
                  <input v-model="formData.clientTpin" type="text"
                    class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                </div>
                <div class="col-span-2">
                  <label class="block text-xs font-bold text-gray-700 mb-1">Client Address</label>
                  <textarea v-model="formData.clientAddress" rows="2"
                    class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand"></textarea>
                </div>
              </div>
            </div>

            <!-- Invoice base number -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-file-invoice text-brand"></i> Invoice Details
              </h4>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Invoice Number Prefix</label>
                  <input v-model="formData.invoiceNumber" type="text" placeholder="e.g. INV-2025"
                    class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm font-mono focus:border-brand focus:ring-1 focus:ring-brand">
                  <p class="text-[9px] font-mono text-gray-400 mt-1">Generated as PREFIX-R001, PREFIX-R002...</p>
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Tax Type</label>
                  <select v-model="formData.taxType"
                    class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                    <option value="none">No Tax</option>
                    <option value="turnover">Turnover Tax (4%)</option>
                    <option value="vat16">VAT (16%)</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Line Items -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-list text-brand"></i> Line Items
              </h4>
              <div class="space-y-2">
                <div v-for="(item, idx) in formData.items" :key="idx" class="flex gap-2 items-start">
                  <input v-model="item.description" placeholder="Description"
                    class="flex-1 border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                  <input v-model.number="item.quantity" type="number" min="1" placeholder="Qty"
                    class="w-20 border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                  <input v-model.number="item.unitPrice" type="number" step="0.01" min="0" placeholder="Unit Price"
                    class="w-32 border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                  <div class="w-28">
                    <input :value="formatNumber((item.quantity || 0) * (item.unitPrice || 0))" disabled
                      class="w-full border border-gray-200 bg-gray-50 rounded-none px-3 py-2 text-sm font-mono text-gray-600">
                  </div>
                  <button @click="removeItem(idx)" type="button" class="p-2 text-red-500 hover:bg-red-50">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>
              <button @click="addItem" type="button"
                class="mt-2 text-[10px] font-mono font-bold text-brand hover:opacity-80 uppercase tracking-wider flex items-center gap-2">
                <i class="fas fa-plus-circle"></i> Add Item
              </button>
            </div>

            <!-- Discount -->
            <div class="flex justify-end">
              <div class="w-80 p-4 bg-gray-50 border border-gray-200 space-y-2">
                <div class="flex justify-between">
                  <span class="text-xs font-mono text-gray-600">Subtotal:</span>
                  <span class="text-xs font-mono font-bold">{{ formatWithSymbol(calcSubtotal) }}</span>
                </div>
                <div class="flex items-center justify-between gap-2">
                  <span class="text-xs font-mono text-gray-600">Discount:</span>
                  <div class="flex">
                    <input v-model.number="formData.discount" type="number" min="0" step="0.01"
                      class="w-16 border border-gray-300 rounded-none px-2 py-1 text-xs font-mono text-center focus:border-brand">
                    <select v-model="formData.discountType"
                      class="border border-gray-300 border-l-0 rounded-none px-1 py-1 text-xs font-mono focus:border-brand">
                      <option value="percentage">%</option>
                      <option value="fixed">Fixed</option>
                    </select>
                  </div>
                </div>
                <div v-if="formData.taxType !== 'none'" class="flex justify-between">
                  <span class="text-xs font-mono text-gray-600">Tax:</span>
                  <span class="text-xs font-mono font-bold">+{{ formatWithSymbol(calcTax) }}</span>
                </div>
                <div class="flex justify-between border-t-2 border-gray-900 pt-2">
                  <span class="text-sm font-mono font-black uppercase">Total / cycle:</span>
                  <span class="text-xl font-mono font-black text-brand">{{ formatWithSymbol(calcTotal) }}</span>
                </div>
              </div>
            </div>

            <!-- Notes -->
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1">Notes / Terms</label>
              <textarea v-model="formData.notes" rows="3"
                class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand"></textarea>
            </div>

            <!-- Actions -->
            <div class="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <button @click="closeModal" type="button"
                class="border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-none text-[10px] font-bold font-mono uppercase">
                Cancel
              </button>
              <button type="submit" :disabled="saving"
                class="bg-brand hover:opacity-90 text-white px-5 py-2.5 rounded-none text-[10px] font-bold font-mono uppercase flex items-center gap-2 disabled:opacity-50">
                <i class="fas" :class="saving ? 'fa-spinner fa-spin' : 'fa-save'"></i>
                {{ saving ? 'Saving...' : (editingRec ? 'Update Schedule' : 'Create Recurring Invoice') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- Delete Confirm Modal -->
    <Teleport to="body">
      <div v-if="deleteTarget" @click.self="deleteTarget = null" class="fixed inset-0 bg-black/50 flex items-center justify-center z-[10001] p-4">
        <div @click.stop class="bg-white rounded-none shadow-2xl max-w-sm w-full p-6 space-y-4">
          <h3 class="text-base font-black text-gray-900 uppercase">Delete Recurring Invoice?</h3>
          <p class="text-sm text-gray-600">Client: <strong>{{ deleteTarget.clientName }}</strong></p>
          <label class="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input type="checkbox" v-model="deleteInstances" class="rounded-sm border-gray-300 text-red-600 focus:ring-red-500">
            Also delete all {{ deleteTarget.total_generated || 0 }} generated copies
          </label>
          <div class="flex gap-3">
            <button @click="deleteTarget = null" class="flex-1 border border-gray-300 text-gray-700 py-2 text-xs font-mono font-bold uppercase hover:bg-gray-50">Cancel</button>
            <button @click="executeDelete" :disabled="deleting"
              class="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 text-xs font-mono font-bold uppercase disabled:opacity-50 flex items-center justify-center gap-2">
              <i :class="deleting ? 'fas fa-spinner fa-spin' : 'fas fa-trash'"></i>
              {{ deleting ? 'Deleting...' : 'Delete' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { BackButton } from '@/components/ui'
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { decodeJWT } from '@/api_services/decodeJWT.js';
import API_BASE_URL from '@/api_services/api';
import { useCurrency } from '@/composables/useCurrency.js';

const router = useRouter();
const { getTenantId, getToken } = decodeJWT();
const { formatCurrency, currencySymbol } = useCurrency();

// ── helpers ──────────────────────────────────────────────────────────────────
const formatNumber = (n) => Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const formatWithSymbol = (amount) => {
  const n = Number(amount) || 0;
  try { return formatCurrency ? formatCurrency(n) : `${currencySymbol.value || 'K'}${formatNumber(n)}`; }
  catch { return `${currencySymbol.value || 'K'}${formatNumber(n)}`; }
};
const formatDate = (d) => {
  if (!d) return '—';
  try { return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }); }
  catch { return d; }
};
const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

const getStatusClass = (status) => {
  const map = {
    draft: 'bg-gray-100 text-gray-600 border-gray-300',
    sent: 'bg-blue-50 text-blue-700 border-blue-300',
    paid: 'bg-emerald-50 text-emerald-700 border-emerald-300',
    pending: 'bg-amber-50 text-amber-700 border-amber-300',
    cancelled: 'bg-red-50 text-red-700 border-red-300',
  };
  return map[status] || 'bg-gray-100 text-gray-600 border-gray-300';
};

// ── state ─────────────────────────────────────────────────────────────────────
const loading = ref(false);
const saving = ref(false);
const deleting = ref(false);
const generatingId = ref(null);
const recurringList = ref([]);
const instancesMap = ref({});   // { [recurringId]: instance[] }
const expandedIds = ref(new Set());
const searchQuery = ref('');
const filterStatus = ref('all');
const filterFreq = ref('all');
const reminderDays = ref(7);
const upcomingList = ref([]);
const overdueList = ref([]);
const showModal = ref(false);
const editingRec = ref(null);
const deleteTarget = ref(null);
const deleteInstances = ref(false);

const emptyForm = () => ({
  frequency: 'monthly',
  interval: 1,
  start_date: new Date().toISOString().split('T')[0],
  end_date: '',
  clientName: '',
  clientEmail: '',
  clientPhone: '',
  clientAddress: '',
  clientTpin: '',
  invoiceNumber: '',
  taxType: 'none',
  discount: 0,
  discountType: 'percentage',
  notes: '',
  items: [{ description: '', quantity: 1, unitPrice: 0 }],
});

const formData = ref(emptyForm());

// ── computed ──────────────────────────────────────────────────────────────────
const activeCount = computed(() => recurringList.value.filter(r => r.is_active).length);
const totalGenerated = computed(() => recurringList.value.reduce((s, r) => s + (r.total_generated || 0), 0));
const upcomingCount = computed(() => upcomingList.value.length);
const overdueCount = computed(() => overdueList.value.length);

const filteredList = computed(() => {
  let list = [...recurringList.value];
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    list = list.filter(r => (r.clientName || '').toLowerCase().includes(q));
  }
  if (filterStatus.value !== 'all') {
    list = list.filter(r => filterStatus.value === 'active' ? r.is_active : !r.is_active);
  }
  if (filterFreq.value !== 'all') {
    list = list.filter(r => r.frequency === filterFreq.value);
  }
  return list;
});

const calcSubtotal = computed(() =>
  formData.value.items.reduce((s, it) => s + (it.quantity || 0) * (it.unitPrice || 0), 0)
);
const calcTax = computed(() => {
  const rates = { turnover: 0.04, vat16: 0.16, none: 0 };
  return calcSubtotal.value * (rates[formData.value.taxType] || 0);
});
const calcDiscount = computed(() => {
  const d = formData.value.discount || 0;
  return formData.value.discountType === 'percentage'
    ? calcSubtotal.value * (d / 100)
    : d;
});
const calcTotal = computed(() => calcSubtotal.value + calcTax.value - calcDiscount.value);

// ── API ────────────────────────────────────────────────────────────────────────
const tenantId = getTenantId();
const token = getToken();
const headers = () => ({ Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' });

async function loadData() {
  loading.value = true;
  try {
    const r = await fetch(`${API_BASE_URL}/recurring-invoices/?tenant_id=${tenantId}`, { headers: headers() });
    if (!r.ok) throw new Error(await r.text());
    const data = await r.json();
    recurringList.value = data.data || [];
  } catch (e) {
    console.error('Failed to load recurring invoices', e);
  } finally {
    loading.value = false;
  }
}

async function loadUpcoming() {
  try {
    const r = await fetch(`${API_BASE_URL}/recurring-invoices/upcoming?tenant_id=${tenantId}&days_ahead=${reminderDays.value}`, { headers: headers() });
    if (!r.ok) return;
    const data = await r.json();
    upcomingList.value = data.data || [];
  } catch (e) {
    console.error('Failed to load upcoming', e);
  }
}

async function loadOverdue() {
  try {
    const r = await fetch(`${API_BASE_URL}/recurring-invoices/overdue?tenant_id=${tenantId}`, { headers: headers() });
    if (!r.ok) return;
    const data = await r.json();
    overdueList.value = data.data || [];
  } catch (e) {
    console.error('Failed to load overdue', e);
  }
}

async function loadInstances(recId) {
  try {
    const r = await fetch(`${API_BASE_URL}/recurring-invoices/${recId}/instances?tenant_id=${tenantId}`, { headers: headers() });
    if (!r.ok) return;
    const data = await r.json();
    instancesMap.value = { ...instancesMap.value, [recId]: data.data || [] };
  } catch (e) {
    console.error('Failed to load instances', e);
  }
}

function refreshData() {
  loadData();
  loadUpcoming();
  loadOverdue();
}

onMounted(() => {
  loadData();
  loadUpcoming();
  loadOverdue();
});

// ── UI interactions ────────────────────────────────────────────────────────────
function toggleExpand(rec) {
  const next = new Set(expandedIds.value);
  if (next.has(rec.id)) {
    next.delete(rec.id);
  } else {
    next.add(rec.id);
    if (!instancesMap.value[rec.id]) loadInstances(rec.id);
  }
  expandedIds.value = next;
}

function openCreateModal(baseInvoice = null) {
  editingRec.value = null;
  formData.value = emptyForm();
  if (baseInvoice) {
    // Pre-fill from a normal invoice
    formData.value.clientName = baseInvoice.clientName || baseInvoice.client_name || '';
    formData.value.clientEmail = baseInvoice.clientEmail || baseInvoice.client_email || '';
    formData.value.clientPhone = baseInvoice.clientPhone || baseInvoice.client_phone || '';
    formData.value.clientAddress = baseInvoice.clientAddress || baseInvoice.client_address || '';
    formData.value.clientTpin = baseInvoice.clientTpin || baseInvoice.client_tpin || '';
    formData.value.invoiceNumber = baseInvoice.invoiceNumber || baseInvoice.invoice_number || '';
    formData.value.taxType = baseInvoice.taxType || baseInvoice.tax_type || 'none';
    formData.value.discount = baseInvoice.discount || 0;
    formData.value.discountType = baseInvoice.discountType || baseInvoice.discount_type || 'percentage';
    formData.value.notes = baseInvoice.notes || '';
    formData.value.items = (baseInvoice.items || []).map(it => ({
      description: it.description || '',
      quantity: it.quantity || it.qty || 1,
      unitPrice: it.unitPrice || it.unit_price || it.price || 0,
    }));
  }
  showModal.value = true;
}

function openEditModal(rec) {
  editingRec.value = rec;
  formData.value = {
    frequency: rec.frequency || 'monthly',
    interval: rec.interval || 1,
    start_date: rec.start_date || new Date().toISOString().split('T')[0],
    end_date: rec.end_date || '',
    clientName: rec.clientName || '',
    clientEmail: rec.clientEmail || '',
    clientPhone: rec.clientPhone || '',
    clientAddress: rec.clientAddress || '',
    clientTpin: rec.clientTpin || '',
    invoiceNumber: rec.invoiceNumber || '',
    taxType: rec.taxType || 'none',
    discount: rec.discount || 0,
    discountType: rec.discountType || 'percentage',
    notes: rec.notes || '',
    items: (rec.items || []).map(it => ({
      description: it.description || '',
      quantity: it.quantity || 1,
      unitPrice: it.unitPrice || 0,
    })),
  };
  showModal.value = true;
}

function openDetailDrawer(rec) {
  const next = new Set(expandedIds.value);
  next.add(rec.id);
  expandedIds.value = next;
  if (!instancesMap.value[rec.id]) loadInstances(rec.id);
  // Scroll to card
  setTimeout(() => {
    const el = document.getElementById(`rec-card-${rec.id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

function closeModal() {
  showModal.value = false;
  editingRec.value = null;
}

function addItem() {
  formData.value.items.push({ description: '', quantity: 1, unitPrice: 0 });
}
function removeItem(idx) {
  formData.value.items.splice(idx, 1);
}

async function saveRecurring() {
  saving.value = true;
  try {
    const payload = {
      ...formData.value,
      end_date: formData.value.end_date || null,
      subtotal: calcSubtotal.value,
      vat: calcTax.value,
      total: calcTotal.value,
    };

    let url, method;
    if (editingRec.value) {
      url = `${API_BASE_URL}/recurring-invoices/${editingRec.value.id}?tenant_id=${tenantId}`;
      method = 'PUT';
    } else {
      url = `${API_BASE_URL}/recurring-invoices/?tenant_id=${tenantId}`;
      method = 'POST';
    }

    const r = await fetch(url, { method, headers: headers(), body: JSON.stringify(payload) });
    if (!r.ok) {
      const err = await r.json().catch(() => ({}));
      throw new Error(err?.detail || 'Save failed');
    }
    closeModal();
    await loadData();
    await loadUpcoming();
  } catch (e) {
    alert(e.message || 'Failed to save recurring invoice');
  } finally {
    saving.value = false;
  }
}

async function generateInstance(rec) {
  generatingId.value = rec.id;
  try {
    const r = await fetch(`${API_BASE_URL}/recurring-invoices/${rec.id}/generate?tenant_id=${tenantId}`, {
      method: 'POST',
      headers: headers(),
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data?.detail || 'Generation failed');
    // refresh data
    await loadData();
    await loadUpcoming();
    // refresh instances if expanded
    if (expandedIds.value.has(rec.id)) await loadInstances(rec.id);
  } catch (e) {
    alert(e.message || 'Failed to generate invoice instance');
  } finally {
    generatingId.value = null;
  }
}

async function toggleActive(rec) {
  try {
    const r = await fetch(`${API_BASE_URL}/recurring-invoices/${rec.id}?tenant_id=${tenantId}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify({ is_active: !rec.is_active }),
    });
    if (!r.ok) throw new Error('Update failed');
    const idx = recurringList.value.findIndex(x => x.id === rec.id);
    if (idx !== -1) recurringList.value[idx].is_active = !rec.is_active;
  } catch (e) {
    alert(e.message || 'Failed to update status');
  }
}

async function updateInstanceStatus(recId, instanceId, newStatus) {
  try {
    const r = await fetch(
      `${API_BASE_URL}/recurring-invoices/${recId}/instances/${instanceId}?tenant_id=${tenantId}`,
      { method: 'PATCH', headers: headers(), body: JSON.stringify({ status: newStatus }) }
    );
    if (!r.ok) throw new Error('Status update failed');
    // update local cache
    if (instancesMap.value[recId]) {
      const inst = instancesMap.value[recId].find(i => i.id === instanceId);
      if (inst) inst.status = newStatus;
    }
    // refresh overdue list in case something was marked paid/cancelled
    loadOverdue();
  } catch (e) {
    alert(e.message || 'Failed to update instance status');
  }
}

async function markInstancePaid(inst) {
  const recId = inst.recurring_invoice_id;
  if (!recId) {
    alert('Cannot find parent recurring invoice');
    return;
  }
  await updateInstanceStatus(recId, inst.id, 'paid');
}

function confirmDelete(rec) {
  deleteTarget.value = rec;
  deleteInstances.value = false;
}

async function executeDelete() {
  if (!deleteTarget.value) return;
  deleting.value = true;
  try {
    const url = `${API_BASE_URL}/recurring-invoices/${deleteTarget.value.id}?tenant_id=${tenantId}&delete_instances=${deleteInstances.value}`;
    const r = await fetch(url, { method: 'DELETE', headers: headers() });
    if (!r.ok) throw new Error('Delete failed');
    recurringList.value = recurringList.value.filter(x => x.id !== deleteTarget.value.id);
    delete instancesMap.value[deleteTarget.value.id];
    deleteTarget.value = null;
    await loadUpcoming();
  } catch (e) {
    alert(e.message || 'Failed to delete');
  } finally {
    deleting.value = false;
  }
}
</script>
