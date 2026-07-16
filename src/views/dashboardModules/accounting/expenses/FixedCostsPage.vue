<template>
  <div class="min-h-screen flex flex-col font-sans relative text-gray-900 bg-gray-50">
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <header class="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-[100] shadow-sm">
      <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <button @click="$router.push('/dashboard/expenses')" class="text-gray-400 hover:text-[#2F2E8B] transition-colors mr-2">
            <i class="fas fa-arrow-left text-lg"></i>
          </button>
          <div class="w-1.5 h-8 bg-[#2F2E8B] rounded-none"></div>
          <div>
            <div class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <i class="fas fa-calendar-check text-[#2F2E8B]"></i>
              <span>Accounting // Expenses // Fixed Costs</span>
            </div>
            <h1 class="text-xl font-black text-gray-900 uppercase tracking-tight font-display">Fixed Costs</h1>
          </div>
        </div>
        
        <div class="flex items-center gap-3">
          <button @click="fetchData" :disabled="loading" class="hidden md:flex items-center gap-2 text-[10px] font-mono font-bold text-[#2F2E8B] hover:text-[#1D226B] uppercase tracking-wider transition-all disabled:opacity-50 border border-blue-200 px-3 py-1.5 hover:bg-blue-50">
            <i class="fas fa-sync-alt" :class="{ 'animate-spin': loading }"></i> Sync
          </button>
          <button @click="toggleReportPanel" class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-none text-[10px] font-bold font-mono uppercase shadow-md transition-all flex items-center gap-2">
            <i class="fas fa-file-export"></i> Export Reports
          </button>
          <button @click="openModal()" class="bg-[#2F2E8B] hover:bg-[#1D226B] text-white px-4 py-2 rounded-none text-[10px] font-bold font-mono uppercase shadow-md transition-all flex items-center gap-2">
            <i class="fas fa-plus"></i> Add Fixed Cost
          </button>
        </div>
      </div>
    </header>

    <main class="flex-1 max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-12 relative z-10 space-y-6">
      <div v-if="loading" class="flex flex-col items-center justify-center py-20">
        <div class="h-12 w-12 border-4 border-gray-100 border-t-[#2F2E8B] rounded-full animate-spin shadow-lg mb-4"></div>
        <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest animate-pulse">Loading Fixed Costs...</p>
      </div>

      <div v-else class="space-y-6">
        <!-- KPI Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-white border border-gray-100 shadow-sm p-5 flex flex-col relative overflow-hidden group hover:border-[#2F2E8B]/30 transition-colors">
            <div class="absolute top-0 right-0 w-16 h-16 bg-[#2F2E8B]/5 rounded-bl-3xl -mr-2 -mt-2"></div>
            <div class="flex items-center gap-3 mb-3 relative z-10">
              <div class="w-9 h-9 bg-[#2F2E8B]/10 flex items-center justify-center">
                <i class="fas fa-money-bill-wave text-[#2F2E8B] text-sm"></i>
              </div>
              <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Monthly Costs</span>
            </div>
            <div class="text-2xl font-black text-gray-900 tracking-tight relative z-10">{{ formatCurrency(totalMonthlyEquivalent) }}</div>
            <div class="text-[9px] font-mono text-gray-400 mt-1 relative z-10">Normalised monthly equivalent</div>
          </div>

          <div class="bg-white border border-gray-100 shadow-sm p-5 flex flex-col relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
            <div class="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-bl-3xl -mr-2 -mt-2"></div>
            <div class="flex items-center gap-3 mb-3 relative z-10">
              <div class="w-9 h-9 bg-emerald-500/10 flex items-center justify-center">
                <i class="fas fa-layer-group text-emerald-600 text-sm"></i>
              </div>
              <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Configurations</span>
            </div>
            <div class="text-2xl font-black text-gray-900 tracking-tight relative z-10">{{ fixedCosts.length }}</div>
            <div class="text-[9px] font-mono text-gray-400 mt-1 relative z-10">Active recurring costs</div>
          </div>

          <div class="bg-white border border-gray-100 shadow-sm p-5 flex flex-col relative overflow-hidden group hover:border-amber-500/30 transition-colors">
            <div class="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-bl-3xl -mr-2 -mt-2"></div>
            <div class="flex items-center gap-3 mb-3 relative z-10">
              <div class="w-9 h-9 bg-amber-500/10 flex items-center justify-center">
                <i class="fas fa-calendar-day text-amber-600 text-sm"></i>
              </div>
              <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">This Month Due</span>
            </div>
            <div class="text-2xl font-black text-gray-900 tracking-tight relative z-10">{{ formatCurrency(monthlyReportTotal) }}</div>
            <div class="text-[9px] font-mono text-gray-400 mt-1 relative z-10">{{ thisMonthFilteredCosts.length }} item{{ thisMonthFilteredCosts.length !== 1 ? 's' : '' }} due {{ currentMonthName }}</div>
          </div>

          <div class="bg-white border border-gray-100 shadow-sm p-5 flex flex-col relative overflow-hidden group hover:border-purple-500/30 transition-colors">
            <div class="absolute top-0 right-0 w-16 h-16 bg-purple-500/5 rounded-bl-3xl -mr-2 -mt-2"></div>
            <div class="flex items-center gap-3 mb-3 relative z-10">
              <div class="w-9 h-9 bg-purple-500/10 flex items-center justify-center">
                <i class="fas fa-tag text-purple-600 text-sm"></i>
              </div>
              <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Top Category</span>
            </div>
            <div class="text-lg font-black text-gray-900 tracking-tight relative z-10 truncate">{{ topCategoryName }}</div>
            <div class="text-[9px] font-mono text-gray-400 mt-1 relative z-10">{{ formatCurrency(topCategoryAmount) }}</div>
          </div>
        </div>

        <div class="bg-white border border-gray-100 rounded-none overflow-hidden relative shadow-sm">
          <div class="absolute inset-0 bg-dotted-pattern pointer-events-none opacity-5"></div>
          <div class="px-6 py-4 border-b border-gray-50 flex justify-between items-center relative z-10">
            <h3 class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
              <span class="w-2 h-2 bg-[#2F2E8B]"></span> RECURRING_CONFIGURATIONS
            </h3>
          </div>
          
          <div class="overflow-x-auto relative z-10">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-50/50">
                  <th class="px-6 py-3 text-left text-[10px] font-mono font-black text-gray-500 uppercase tracking-wider border-b border-gray-100">Name</th>
                  <th class="px-6 py-3 text-left text-[10px] font-mono font-black text-gray-500 uppercase tracking-wider border-b border-gray-100">Category</th>
                  <th class="px-6 py-3 text-right text-[10px] font-mono font-black text-gray-500 uppercase tracking-wider border-b border-gray-100">Amount</th>
                  <th class="px-6 py-3 text-center text-[10px] font-mono font-black text-gray-500 uppercase tracking-wider border-b border-gray-100">Frequency</th>
                  <th class="px-6 py-3 text-center text-[10px] font-mono font-black text-gray-500 uppercase tracking-wider border-b border-gray-100">Next Occurrence</th>
                  <th class="px-6 py-3 text-center text-[10px] font-mono font-black text-gray-500 uppercase tracking-wider border-b border-gray-100">Auto Add</th>
                  <th class="px-6 py-3 text-right text-[10px] font-mono font-black text-gray-500 uppercase tracking-wider border-b border-gray-100">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="cost in fixedCosts" :key="cost.id" class="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group relative z-10">
                  <td class="px-6 py-4">
                    <div class="text-sm font-bold text-gray-900">{{ cost.name }}</div>
                    <div v-if="cost.description" class="text-[10px] font-mono text-gray-400 mt-1 truncate max-w-xs">{{ cost.description }}</div>
                    <div v-if="cost.supplier_id" class="text-[10px] font-mono text-indigo-500 mt-1">Supplier: {{ getSupplierName(cost.supplier_id) }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <span class="inline-flex items-center px-2 py-0.5 rounded-none text-[9px] font-mono font-bold uppercase tracking-wider bg-gray-100 text-gray-700 border border-gray-200">
                      {{ cost.category }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-right">
                    <div class="text-sm font-black text-[#2F2E8B]">{{ formatCurrency(cost.amount) }}</div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span class="text-[10px] font-mono font-bold uppercase tracking-widest" :class="{
                      'text-blue-600': cost.frequency === 'monthly',
                      'text-green-600': cost.frequency === 'weekly',
                      'text-amber-600': cost.frequency === 'daily',
                      'text-purple-600': cost.frequency === 'yearly'
                    }">{{ cost.frequency }}</span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <div class="text-xs font-mono text-gray-600">{{ formatDate(cost.next_occurrence) }}</div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <i v-if="cost.auto_add" class="fas fa-check-circle text-green-500"></i>
                    <i v-else class="fas fa-times-circle text-gray-300"></i>
                  </td>
                  <td class="px-6 py-4 text-right">
                    <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button @click="openModal(cost)" class="p-1.5 text-[#2F2E8B] hover:bg-gray-100 border border-transparent hover:border-gray-200 transition-colors" title="Edit">
                        <i class="fas fa-edit text-xs"></i>
                      </button>
                      <button @click="confirmDelete(cost)" class="p-1.5 text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors" title="Delete">
                        <i class="fas fa-trash-alt text-xs"></i>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="fixedCosts.length === 0" class="relative z-10">
                  <td colspan="7" class="px-6 py-12 text-center">
                    <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i class="fas fa-calendar-check text-gray-400 text-lg"></i>
                    </div>
                    <p class="text-sm font-bold text-gray-900 mb-1">No Fixed Costs Found</p>
                    <p class="text-xs text-gray-500 mb-4">You haven't set up any recurring expenses yet.</p>
                    <button @click="openModal()" class="text-[10px] font-mono font-bold text-[#2F2E8B] uppercase tracking-widest hover:underline">
                      Create First Fixed Cost
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

    <!-- Add/Edit Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[200] flex justify-end">
        <div class="bg-white w-full max-w-md h-full flex flex-col shadow-2xl animate-slide-in-right relative">
          <div class="absolute inset-0 bg-dotted-pattern pointer-events-none opacity-5"></div>
          
          <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/80 relative z-10">
            <h3 class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
              <span class="w-2 h-2" :class="editingCost ? 'bg-amber-500' : 'bg-blue-600'"></span>
              {{ editingCost ? 'EDIT_FIXED_COST' : 'NEW_FIXED_COST' }}
            </h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-900 transition-colors">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="flex-1 overflow-y-auto p-6 relative z-10">
            <form @submit.prevent="saveFixedCost" class="space-y-5">
              <div>
                <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1.5">Cost Name *</label>
                <input v-model="form.name" type="text" required class="w-full border-gray-200 rounded-none text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-2 border" placeholder="e.g. Monthly Rent" />
              </div>
              
              <div>
                <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1.5">Amount *</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span class="text-gray-500 text-sm">K</span>
                  </div>
                  <input v-model.number="form.amount" type="number" step="0.01" required min="0" class="w-full border-gray-200 rounded-none text-sm pl-8 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-2 border" placeholder="0.00" />
                </div>
              </div>
              
              <div>
                <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1.5">Category *</label>
                <select v-model="form.category" required class="w-full border-gray-200 rounded-none text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-2 border bg-white">
                  <option value="" disabled>Select Category</option>
                  <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                </select>
              </div>

              <div>
                <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1.5">Frequency *</label>
                <select v-model="form.frequency" required class="w-full border-gray-200 rounded-none text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-2 border bg-white">
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              <div>
                <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1.5">Next Occurrence *</label>
                <input v-model="form.next_occurrence" type="date" required class="w-full border-gray-200 rounded-none text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-2 border" />
              </div>

              <div class="flex items-center gap-2">
                <input v-model="form.auto_add" type="checkbox" id="auto_add" class="rounded-none text-blue-600 focus:ring-blue-500 border-gray-300" />
                <label for="auto_add" class="text-sm text-gray-700">Automatically add to expenses ledger</label>
              </div>

              <div>
                <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1.5">Supplier (Optional)</label>
                <select v-model="form.supplier_id" class="w-full border-gray-200 rounded-none text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-2 border bg-white">
                  <option :value="null">No Supplier</option>
                  <option v-for="sup in suppliers" :key="sup.id" :value="sup.id">{{ sup.name }}</option>
                </select>
              </div>

              <div>
                <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1.5">Description</label>
                <textarea v-model="form.description" rows="3" class="w-full border-gray-200 rounded-none text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-2 border resize-none" placeholder="Additional details..."></textarea>
              </div>
            </form>
          </div>
          
          <div class="p-6 border-t border-gray-100 bg-gray-50/80 flex justify-end gap-3 relative z-10">
            <button @click="closeModal" type="button" class="px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-none text-[10px] font-mono font-bold uppercase tracking-wider transition-colors">
              Cancel
            </button>
            <button @click="saveFixedCost" :disabled="saving" class="px-4 py-2 bg-[#2F2E8B] text-white rounded-none text-[10px] font-mono font-bold uppercase tracking-wider hover:bg-[#1D226B] transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2">
              <i v-if="saving" class="fas fa-circle-notch fa-spin"></i>
              {{ editingCost ? 'Update' : 'Create' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Export Reports Panel -->
    <Teleport to="body">
      <div v-if="showReportPanel" class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[200] flex justify-end">
        <div class="bg-white w-full max-w-lg h-full flex flex-col shadow-2xl animate-slide-in-right relative">
          <div class="absolute inset-0 bg-dotted-pattern pointer-events-none opacity-5"></div>
          
          <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-emerald-50/80 relative z-10">
            <h3 class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
              <span class="w-2 h-2 bg-emerald-600"></span>
              THIS_MONTH_FIXED_COSTS_REPORT
            </h3>
            <button @click="showReportPanel = false" class="text-gray-400 hover:text-gray-900 transition-colors">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="flex-1 overflow-y-auto p-6 relative z-10 space-y-6">
            <!-- Report Summary -->
            <div class="bg-emerald-50/50 border border-emerald-200 p-4">
              <div class="text-[9px] font-mono font-bold text-emerald-700 uppercase tracking-widest mb-2">Report Period</div>
              <div class="text-sm font-bold text-gray-900">{{ currentMonthName }} {{ currentYear }}</div>
              <div class="text-[10px] font-mono text-gray-500 mt-1">Generated: {{ generatedDate }}</div>
            </div>

            <!-- Summary Cards -->
            <div class="grid grid-cols-2 gap-3">
              <div class="bg-white border border-gray-100 p-3">
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider">Total Costs</div>
                <div class="text-lg font-black text-[#2F2E8B] mt-0.5">{{ formatCurrency(monthlyReportTotal) }}</div>
              </div>
              <div class="bg-white border border-gray-100 p-3">
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider">Cost Items</div>
                <div class="text-lg font-black text-gray-900 mt-0.5">{{ thisMonthFilteredCosts.length }}</div>
              </div>
            </div>

            <!-- Category Breakdown -->
            <div>
              <h4 class="text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                <i class="fas fa-chart-pie text-emerald-600"></i> Breakdown by Category
              </h4>
              <div class="space-y-2">
                <div v-for="(total, cat) in monthlyTotalsByCategory" :key="cat" class="flex items-center justify-between bg-white border border-gray-50 px-3 py-2">
                  <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: categoryColor(cat) }"></span>
                    <span class="text-xs font-bold text-gray-700">{{ cat }}</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="text-[9px] font-mono text-gray-400">{{ monthlyCountsByCategory[cat] || 0 }} items</span>
                    <span class="text-sm font-black text-gray-900">{{ formatCurrency(total) }}</span>
                  </div>
                </div>
                <div v-if="Object.keys(monthlyTotalsByCategory).length === 0" class="text-center py-6 text-xs text-gray-400 font-mono">
                  No fixed costs due this month
                </div>
              </div>
            </div>

            <!-- Detailed List -->
            <div>
              <h4 class="text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                <i class="fas fa-list-ul text-emerald-600"></i> Cost Items Due This Month
              </h4>
              <div class="space-y-1.5">
                <div v-for="cost in thisMonthFilteredCosts" :key="cost.id" class="flex items-center justify-between bg-white border border-gray-50 px-3 py-2 hover:bg-gray-50/50 transition-colors">
                  <div>
                    <div class="text-xs font-bold text-gray-900">{{ cost.name }}</div>
                    <div class="text-[9px] font-mono text-gray-400">{{ cost.category }} · {{ cost.frequency }}</div>
                  </div>
                  <div class="text-sm font-black text-[#2F2E8B]">{{ formatCurrency(cost.amount) }}</div>
                </div>
                <div v-if="thisMonthFilteredCosts.length === 0" class="text-center py-6 text-xs text-gray-400 font-mono">
                  No fixed costs are due this month
                </div>
              </div>
            </div>
          </div>
          
          <div class="p-6 border-t border-gray-100 bg-gray-50/80 flex flex-col gap-3 relative z-10">
            <div class="flex justify-between gap-3">
              <button @click="showReportPanel = false" type="button" class="px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-none text-[10px] font-mono font-bold uppercase tracking-wider transition-colors">
                Close
              </button>
              <div class="flex gap-2">
                <button @click="exportMonthlyReportCSV" class="px-3 py-2 bg-white border border-emerald-300 text-emerald-700 rounded-none text-[9px] font-mono font-bold uppercase tracking-wider hover:bg-emerald-50 transition-colors flex items-center gap-1.5" title="Export as CSV">
                  <i class="fas fa-file-csv"></i> CSV
                </button>
                <button @click="exportMonthlyReportPDF" class="px-3 py-2 bg-white border border-red-300 text-red-700 rounded-none text-[9px] font-mono font-bold uppercase tracking-wider hover:bg-red-50 transition-colors flex items-center gap-1.5" title="Export as PDF">
                  <i class="fas fa-file-pdf"></i> PDF
                </button>
                <button @click="exportMonthlyReportDOCX" class="px-3 py-2 bg-white border border-blue-300 text-blue-700 rounded-none text-[9px] font-mono font-bold uppercase tracking-wider hover:bg-blue-50 transition-colors flex items-center gap-1.5" title="Export as DOCX">
                  <i class="fas fa-file-word"></i> DOCX
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { BackButton } from '@/components/ui'
import { ref, onMounted, computed } from 'vue';
import { API_BASE_URL } from '@/api_services/api';
import { decodeJWT } from '@/api_services/decodeJWT';
import { jsPDF } from 'jspdf';
import { applyPlugin } from 'jspdf-autotable';
import { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun, WidthType, AlignmentType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';
import { usePreferences } from '@/config/usePreferences.js';

applyPlugin(jsPDF);

const brandStore = usePreferences();
const brandPrefs = brandStore.preferences;
const tenantDetails = ref({});

const hexToRgb = (hex) => {
  if (!hex) return [47, 46, 139];
  const h = hex.replace('#', '');
  if (h.length === 3) return [parseInt(h[0]+h[0],16), parseInt(h[1]+h[1],16), parseInt(h[2]+h[2],16)];
  return [parseInt(h.substring(0,2),16), parseInt(h.substring(2,4),16), parseInt(h.substring(4,6),16)];
};

const loadImage = (url) => {
  return new Promise((resolve) => {
    if (!url) return resolve(null);
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
};

const { getTenantId, getToken } = decodeJWT();

const loading = ref(true);
const saving = ref(false);
const showModal = ref(false);
const fixedCosts = ref([]);
const suppliers = ref([]);
const editingCost = ref(null);

const categories = [
  'Rent', 'Utilities', 'Salaries', 'Insurance', 'Software Subscriptions',
  'Internet & Phone', 'Cleaning Services', 'Maintenance', 'Marketing', 'Other'
];

const form = ref({
  name: '',
  amount: '',
  category: '',
  frequency: 'monthly',
  next_occurrence: '',
  auto_add: true,
  supplier_id: null,
  description: ''
});

const formatCurrency = (val) => {
  return new Intl.NumberFormat('en-ZM', { style: 'currency', currency: 'ZMW' }).format(val || 0);
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const getSupplierName = (id) => {
  const sup = suppliers.value.find(s => s.id === id);
  return sup ? sup.name : 'Unknown';
};

const fetchTenantDetails = async () => {
  try {
    const tenantId = getTenantId();
    if (!tenantId) return;
    let data = null;
    try {
      const res = await fetch(`${API_BASE_URL}/tenant-details/details?tenant_id=${tenantId}`);
      if (res.ok) data = await res.json();
    } catch {}
    if (!data) {
      try {
        const res2 = await fetch(`${API_BASE_URL}/tenants/details?tenant_id=${tenantId}`);
        if (res2.ok) data = await res2.json();
      } catch {}
    }
    const tenant = data?.tenant ?? data ?? null;
    if (tenant) tenantDetails.value = tenant;
  } catch (err) { console.error('Failed to fetch tenant details:', err); }
};

const fetchData = async () => {
  loading.value = true;
  try {
    const tenantId = getTenantId();
    const token = getToken();
    const headers = { 'Authorization': `Bearer ${token}` };

    const [costsRes, suppRes] = await Promise.all([
      fetch(`${API_BASE_URL}/expenses/fixed?tenant_id=${tenantId}`, { headers }),
      fetch(`${API_BASE_URL}/suppliers/?tenant_id=${tenantId}`, { headers })
    ]);

    if (costsRes.ok) fixedCosts.value = await costsRes.json();
    if (suppRes.ok) suppliers.value = await suppRes.json();
  } catch (err) {
    console.error('Error fetching data:', err);
    alert('Failed to load fixed costs data.');
  } finally {
    loading.value = false;
  }
};

const openModal = (cost = null) => {
  if (cost) {
    editingCost.value = cost;
    form.value = {
      name: cost.name,
      amount: cost.amount,
      category: cost.category,
      frequency: cost.frequency,
      next_occurrence: cost.next_occurrence.split('T')[0],
      auto_add: cost.auto_add,
      supplier_id: cost.supplier_id,
      description: cost.description || ''
    };
  } else {
    editingCost.value = null;
    form.value = {
      name: '',
      amount: '',
      category: '',
      frequency: 'monthly',
      next_occurrence: new Date().toISOString().split('T')[0],
      auto_add: true,
      supplier_id: null,
      description: ''
    };
  }
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  editingCost.value = null;
};

const saveFixedCost = async () => {
  if (!form.value.name || !form.value.amount || !form.value.category || !form.value.next_occurrence) {
    alert("Please fill all required fields");
    return;
  }
  
  saving.value = true;
  try {
    const tenantId = getTenantId();
    const url = editingCost.value 
      ? `${API_BASE_URL}/expenses/fixed/${editingCost.value.id}?tenant_id=${tenantId}`
      : `${API_BASE_URL}/expenses/fixed?tenant_id=${tenantId}`;
      
    const method = editingCost.value ? 'PUT' : 'POST';
    
    const response = await fetch(url, {
      method,
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    });
    
    if (!response.ok) throw new Error('Failed to save fixed cost');
    
    await fetchData();
    closeModal();
  } catch (err) {
    console.error('Save error:', err);
    alert('Error saving fixed cost.');
  } finally {
    saving.value = false;
  }
};

const confirmDelete = async (cost) => {
  if (!confirm(`Are you sure you want to delete the fixed cost "${cost.name}"?`)) return;
  
  try {
    const tenantId = getTenantId();
    const response = await fetch(`${API_BASE_URL}/expenses/fixed/${cost.id}?tenant_id=${tenantId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    
    if (!response.ok) throw new Error('Failed to delete');
    await fetchData();
  } catch (err) {
    console.error('Delete error:', err);
    alert('Failed to delete fixed cost.');
  }
};

// ═══════════════════════════════════════════════════════════
//  MONTHLY EXPORT REPORTS
// ═══════════════════════════════════════════════════════════

const showReportPanel = ref(false);

const currentMonthName = computed(() => {
  return new Date().toLocaleDateString('en-GB', { month: 'long' });
});

const currentYear = computed(() => {
  return new Date().getFullYear();
});

const generatedDate = computed(() => {
  return new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
});

const thisMonthFilteredCosts = computed(() => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYearVal = now.getFullYear();
  
  return fixedCosts.value.filter(cost => {
    if (!cost.next_occurrence) return false;
    const date = new Date(cost.next_occurrence);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYearVal;
  });
});

const monthlyReportTotal = computed(() => {
  return thisMonthFilteredCosts.value.reduce((sum, c) => sum + (c.amount || 0), 0);
});

const monthlyTotalsByCategory = computed(() => {
  const totals = {};
  thisMonthFilteredCosts.value.forEach(cost => {
    const cat = cost.category || 'Uncategorized';
    totals[cat] = (totals[cat] || 0) + (cost.amount || 0);
  });
  return totals;
});

const monthlyCountsByCategory = computed(() => {
  const counts = {};
  thisMonthFilteredCosts.value.forEach(cost => {
    const cat = cost.category || 'Uncategorized';
    counts[cat] = (counts[cat] || 0) + 1;
  });
  return counts;
});

// ═══════════════════════════════════════════════════════════
//  KPI COMPUTED PROPERTIES
// ═══════════════════════════════════════════════════════════

const totalMonthlyEquivalent = computed(() => {
  return fixedCosts.value.reduce((sum, c) => {
    const amount = c.amount || 0;
    switch (c.frequency) {
      case 'daily': return sum + amount * 30;
      case 'weekly': return sum + amount * 4.33;
      case 'yearly': return sum + amount / 12;
      default: return sum + amount; // monthly
    }
  }, 0);
});

const allCategoryTotals = computed(() => {
  const totals = {};
  fixedCosts.value.forEach(cost => {
    // Normalise to monthly for fair comparison
    const amount = cost.amount || 0;
    let monthlyAmount = amount;
    switch (cost.frequency) {
      case 'daily': monthlyAmount = amount * 30; break;
      case 'weekly': monthlyAmount = amount * 4.33; break;
      case 'yearly': monthlyAmount = amount / 12; break;
    }
    const cat = cost.category || 'Uncategorized';
    totals[cat] = (totals[cat] || 0) + monthlyAmount;
  });
  return totals;
});

const topCategoryName = computed(() => {
  const entries = Object.entries(allCategoryTotals.value);
  if (entries.length === 0) return '—';
  return entries.reduce((a, b) => (b[1] > a[1] ? b : a))[0];
});

const topCategoryAmount = computed(() => {
  const entries = Object.entries(allCategoryTotals.value);
  if (entries.length === 0) return 0;
  return entries.reduce((a, b) => (b[1] > a[1] ? b : a))[1];
});

const categoryColors = [
  '#2F2E8B', '#059669', '#d97706', '#dc2626', '#7c3aed',
  '#0891b2', '#be185d', '#4f46e5', '#65a30d', '#ea580c'
];

const categoryColor = (cat) => {
  const cats = Object.keys(monthlyTotalsByCategory.value);
  const idx = cats.indexOf(cat);
  return categoryColors[idx % categoryColors.length];
};

const toggleReportPanel = () => {
  showReportPanel.value = !showReportPanel.value;
};

const exportMonthlyReportCSV = () => {
  const rows = thisMonthFilteredCosts.value.map(c => ({
    Name: c.name || '',
    Category: c.category || '',
    Frequency: c.frequency || '',
    'Next Occurrence': (c.next_occurrence || '').slice(0, 10),
    Amount: c.amount || 0,
  }));

  // Add category breakdown section
  let csv = `FIXED COSTS REPORT - ${currentMonthName.value} ${currentYear.value}\n`;
  csv += `Generated: ${generatedDate.value}\n`;
  csv += `Total Costs: ${formatCurrency(monthlyReportTotal.value)}\n`;
  csv += `Total Items: ${thisMonthFilteredCosts.value.length}\n\n`;

  csv += 'CATEGORY BREAKDOWN\n';
  csv += 'Category,Count,Total\n';
  for (const [cat, total] of Object.entries(monthlyTotalsByCategory.value)) {
    csv += `"${cat}",${monthlyCountsByCategory.value[cat] || 0},${total}\n`;
  }

  csv += '\nDETAILED ITEMS\n';
  csv += 'Name,Category,Frequency,Next Occurrence,Amount\n';
  for (const r of rows) {
    csv += [
      `"${(r.Name || '').replace(/"/g, '""')}"`,
      `"${(r.Category || '').replace(/"/g, '""')}"`,
      r.Frequency,
      r['Next Occurrence'],
      r.Amount,
    ].join(',') + '\n';
  }

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fixed_costs_report_${currentMonthName.value.toLowerCase()}_${currentYear.value}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

const exportMonthlyReportPDF = async () => {
  const doc = new jsPDF();
  const primaryRGB = hexToRgb(brandPrefs.primaryColor || '#2F2E8B');
  const reportNum = `FCR-${currentMonthName.value.substring(0,3).toUpperCase()}-${String(currentYear.value).slice(-2)}`;

  // ═══ 1. HEADER & LOGO ═══
  let headerY = 15;
  const logoUrl = brandPrefs.companyLogo || tenantDetails.value.company_logo;
  if (logoUrl) {
    const base64Logo = await loadImage(logoUrl);
    if (base64Logo) {
      doc.addImage(base64Logo, 'PNG', 14, 15, 28, 28, undefined, 'FAST');
      headerY = 48;
    }
  }

  // ═══ 2. COMPANY INFO (Top Right) ═══
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
  const companyName = (brandPrefs.companyName || tenantDetails.value.company_name || 'YOUR COMPANY').toUpperCase();
  const compLines = doc.splitTextToSize(companyName, 90);
  compLines.forEach((line, i) => doc.text(line, 196, 20 + (i * 7), { align: 'right' }));

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100);
  let compY = 20 + (compLines.length * 7);
  const compAddr = tenantDetails.value.address || '';
  const compCity = tenantDetails.value.city || '';
  const compCountry = tenantDetails.value.country || '';
  if (compAddr) { doc.text(compAddr, 196, compY, { align: 'right' }); compY += 5; }
  if (compCity || compCountry) { doc.text(`${compCity}${compCity && compCountry ? ', ' : ''}${compCountry}`, 196, compY, { align: 'right' }); compY += 5; }
  if (tenantDetails.value.phone_number) { doc.text(`Tel: ${tenantDetails.value.phone_number}`, 196, compY, { align: 'right' }); compY += 5; }
  if (tenantDetails.value.tpin) { doc.text(`TPIN: ${tenantDetails.value.tpin}`, 196, compY, { align: 'right' }); compY += 5; }

  // ═══ 3. DOCUMENT TITLE ═══
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
  doc.text('FIXED COSTS REPORT', 14, headerY + 8);

  doc.setDrawColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
  doc.setLineWidth(1);
  doc.line(14, headerY + 12, 85, headerY + 12);

  // ═══ 4. REPORT METADATA ═══
  const metaY = headerY + 20;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0);
  doc.text('REPORT NO:', 14, metaY);
  doc.setFont('helvetica', 'normal');
  doc.text(reportNum, 45, metaY);

  doc.setFont('helvetica', 'bold');
  doc.text('PERIOD:', 14, metaY + 6);
  doc.setFont('helvetica', 'normal');
  doc.text(`${currentMonthName.value} ${currentYear.value}`, 45, metaY + 6);

  doc.setFont('helvetica', 'bold');
  doc.text('GENERATED:', 14, metaY + 12);
  doc.setFont('helvetica', 'normal');
  doc.text(generatedDate.value, 45, metaY + 12);

  doc.setFont('helvetica', 'bold');
  doc.text('TOTAL ITEMS:', 14, metaY + 18);
  doc.setFont('helvetica', 'normal');
  doc.text(`${thisMonthFilteredCosts.value.length}`, 45, metaY + 18);

  // ═══ 5. REPORT INFO (Right Side) ═══
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
  doc.text('REPORT SUMMARY', 120, metaY);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100);
  let summaryY = metaY + 8;
  doc.text('This report details all recurring fixed costs', 120, summaryY); summaryY += 5;
  doc.text('scheduled for the current month. It includes', 120, summaryY); summaryY += 5;
  doc.text('a category breakdown and itemised listing', 120, summaryY); summaryY += 5;
  doc.text('for review and financial planning purposes.', 120, summaryY);

  // ═══ 6. CATEGORY BREAKDOWN TABLE ═══
  const tableStartY = Math.max(metaY + 30, summaryY + 14);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
  doc.text('CATEGORY BREAKDOWN', 14, tableStartY);

  const catRows = Object.entries(monthlyTotalsByCategory.value).map(([cat, total]) => [
    cat,
    String(monthlyCountsByCategory.value[cat] || 0),
    formatCurrency(total),
  ]);

  doc.autoTable({
    startY: tableStartY + 4,
    head: [['Category', 'Items', 'Total Amount']],
    body: catRows.length > 0 ? catRows : [['—', '—', '—']],
    theme: 'grid',
    headStyles: { fillColor: primaryRGB, textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 9, cellPadding: 4 },
    bodyStyles: { fontSize: 9, cellPadding: { top: 3, right: 4, bottom: 3, left: 4 }, textColor: [50, 50, 50] },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { cellWidth: 30, halign: 'center' },
      2: { cellWidth: 45, halign: 'right' },
    },
    alternateRowStyles: { fillColor: [250, 250, 250] },
    margin: { left: 14, right: 14 },
  });

  // ═══ 7. DETAILED ITEMS TABLE ═══
  let detailStartY = (doc.lastAutoTable?.finalY || tableStartY + 30) + 10;

  if (detailStartY + 20 > 275) { doc.addPage(); detailStartY = 20; }

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
  doc.text('DETAILED FIXED COSTS', 14, detailStartY);

  const detailRows = thisMonthFilteredCosts.value.map(c => [
    c.name || '',
    c.category || '',
    c.frequency || '',
    (c.next_occurrence || '').slice(0, 10),
    formatCurrency(c.amount || 0),
  ]);

  doc.autoTable({
    startY: detailStartY + 4,
    head: [['Name', 'Category', 'Frequency', 'Next Occurrence', 'Amount']],
    body: detailRows.length > 0 ? detailRows : [['—', '—', '—', '—', '—']],
    theme: 'grid',
    headStyles: { fillColor: primaryRGB, textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 8, cellPadding: 4 },
    bodyStyles: { fontSize: 8, cellPadding: { top: 3, right: 4, bottom: 3, left: 4 }, overflow: 'linebreak', textColor: [50, 50, 50] },
    columnStyles: {
      0: { cellWidth: 'auto', overflow: 'linebreak' },
      1: { cellWidth: 32 },
      2: { cellWidth: 28, halign: 'center' },
      3: { cellWidth: 32, halign: 'center' },
      4: { cellWidth: 35, halign: 'right' },
    },
    alternateRowStyles: { fillColor: [250, 250, 250] },
    showHead: 'everyPage',
    margin: { left: 14, right: 14 },
    pageBreak: 'auto',
  });

  // ═══ 8. TOTALS ═══
  let finalY = (doc.lastAutoTable?.finalY || detailStartY + 20) + 4;
  if (finalY + 40 > 275) { doc.addPage(); finalY = 20; }

  doc.setDrawColor(220);
  doc.setLineWidth(0.5);
  doc.line(120, finalY + 4, 196, finalY + 4);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100);
  doc.text('Grand Total:', 110, finalY + 12);

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
  doc.text(formatCurrency(monthlyReportTotal.value), 196, finalY + 12, { align: 'right' });

  // ═══ 9. PAGE FOOTER ═══
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.setFont('helvetica', 'normal');
    doc.text(`Page ${i} of ${pageCount}`, 196, 285, { align: 'right' });
    doc.text(`Generated on ${new Date().toLocaleString()}`, 14, 285);
    doc.setDrawColor(230);
    doc.line(14, 280, 196, 280);
  }

  doc.save(`Fixed_Costs_Report_${currentMonthName.value}_${currentYear.value}.pdf`);
};

const exportMonthlyReportDOCX = async () => {
  const border = { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' };
  const headerCell = (text, width) => new TableCell({
    children: [new Paragraph({ children: [new TextRun({ text, bold: true, size: 18, color: 'FFFFFF', font: 'Helvetica' })], alignment: AlignmentType.CENTER })],
    width: { size: width, type: WidthType.PERCENTAGE },
    shading: { fill: '2F2E8B' },
    borders: { top: border, bottom: border, left: border, right: border },
  });

  const dataCell = (text, width, align = AlignmentType.LEFT) => new TableCell({
    children: [new Paragraph({ children: [new TextRun({ text: String(text), size: 16, font: 'Helvetica' })], alignment: align })],
    width: { size: width, type: WidthType.PERCENTAGE },
    borders: { top: border, bottom: border, left: border, right: border },
  });

  // Category breakdown table
  const catRows = [
    new TableRow({ children: [headerCell('Category', 50), headerCell('Count', 25), headerCell('Total', 25)] }),
  ];
  for (const [cat, total] of Object.entries(monthlyTotalsByCategory.value)) {
    catRows.push(new TableRow({ children: [
      dataCell(cat, 50),
      dataCell(String(monthlyCountsByCategory.value[cat] || 0), 25, AlignmentType.CENTER),
      dataCell(formatCurrency(total), 25, AlignmentType.RIGHT),
    ]}));
  }
  if (catRows.length === 1) {
    catRows.push(new TableRow({ children: [dataCell('No data', 100, AlignmentType.CENTER)] }));
  }

  // Detailed items table
  const detailRows = [
    new TableRow({ children: [
      headerCell('Name', 30), headerCell('Category', 20), headerCell('Frequency', 15), headerCell('Next Occurrence', 18), headerCell('Amount', 17),
    ]}),
  ];
  for (const c of thisMonthFilteredCosts.value) {
    detailRows.push(new TableRow({ children: [
      dataCell(c.name || '', 30),
      dataCell(c.category || '', 20),
      dataCell(c.frequency || '', 15, AlignmentType.CENTER),
      dataCell((c.next_occurrence || '').slice(0, 10), 18, AlignmentType.CENTER),
      dataCell(formatCurrency(c.amount || 0), 17, AlignmentType.RIGHT),
    ]}));
  }
  if (detailRows.length === 1) {
    detailRows.push(new TableRow({ children: [dataCell('No items due this month', 100, AlignmentType.CENTER)] }));
  }

  const company = (brandPrefs.companyName || tenantDetails.value.company_name || 'YOUR COMPANY').toUpperCase();
  const reportNum = `FCR-${currentMonthName.value.substring(0,3).toUpperCase()}-${String(currentYear.value).slice(-2)}`;

  const doc = new Document({
    sections: [{
      children: [
        new Paragraph({ children: [new TextRun({ text: company, bold: true, size: 26, color: '2F2E8B', font: 'Helvetica' })], spacing: { after: 60 } }),
        new Paragraph({ children: [new TextRun({ text: tenantDetails.value.address || '', size: 18, color: '666666', font: 'Helvetica' })], spacing: { after: 40 } }),
        new Paragraph({ children: [new TextRun({ text: `Tel: ${tenantDetails.value.phone_number || '—'}  |  TPIN: ${tenantDetails.value.tpin || '—'}`, size: 18, color: '666666', font: 'Helvetica' })], spacing: { after: 400 } }),
        new Paragraph({ children: [new TextRun({ text: 'FIXED COSTS REPORT', bold: true, size: 32, color: '2F2E8B', font: 'Helvetica' })], spacing: { after: 200 } }),
        new Paragraph({ children: [new TextRun({ text: `Report No: ${reportNum}  |  Period: ${currentMonthName.value} ${currentYear.value}  |  Generated: ${generatedDate.value}  |  Items: ${thisMonthFilteredCosts.value.length}`, size: 18, color: '999999', font: 'Helvetica' })], spacing: { after: 500 } }),
        new Paragraph({ children: [new TextRun({ text: 'CATEGORY BREAKDOWN', bold: true, size: 22, color: '2F2E8B', font: 'Helvetica' })], spacing: { after: 150 } }),
        new Table({ rows: catRows, width: { size: 100, type: WidthType.PERCENTAGE } }),
        new Paragraph({ children: [], spacing: { after: 500 } }),
        new Paragraph({ children: [new TextRun({ text: 'DETAILED FIXED COSTS', bold: true, size: 22, color: '2F2E8B', font: 'Helvetica' })], spacing: { after: 150 } }),
        new Table({ rows: detailRows, width: { size: 100, type: WidthType.PERCENTAGE } }),
        new Paragraph({ children: [], spacing: { after: 500 } }),
        new Paragraph({ children: [new TextRun({ text: `Grand Total: ${formatCurrency(monthlyReportTotal.value)}`, bold: true, size: 24, color: '2F2E8B', font: 'Helvetica' })], alignment: AlignmentType.RIGHT, spacing: { after: 300 } }),
        new Paragraph({ children: [new TextRun({ text: `Generated on ${new Date().toLocaleString()}  |  Page 1 of 1`, size: 16, color: 'AAAAAA', font: 'Helvetica' })], alignment: AlignmentType.CENTER }),
      ],
    }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `fixed_costs_report_${currentMonthName.value.toLowerCase()}_${currentYear.value}.docx`);
};

onMounted(async () => {
  await Promise.all([fetchData(), fetchTenantDetails(), brandStore.fetchPreferences?.() || Promise.resolve()]);
});
</script>

<style scoped>
.mesh-background { background-color: #fff; background-image: linear-gradient(rgba(47, 46, 139, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(47, 46, 139, 0.03) 1px, transparent 1px); background-size: 30px 30px; }
.bg-dotted-pattern {
  background-image: radial-gradient(circle, #2F2E8B 1px, transparent 1px);
  background-size: 16px 16px;
}
.animate-slide-in-right {
  animation: slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
@keyframes slideInRight {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
</style>