<template>
  <div class="min-h-screen flex flex-col font-sans relative text-gray-900 bg-gray-50">
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <!-- Header -->
    <header class="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-[100] shadow-sm">
      <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <button @click="$router.push('/dashboard/invoicing')" class="text-gray-400 hover:text-[#2F2E8B] transition-colors mr-2">
            <i class="fas fa-arrow-left text-lg"></i>
          </button>
          <div class="w-2 h-8 bg-[#2F2E8B] rounded-none"></div>
          <div>
            <div class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <i class="fas fa-receipt text-[#2F2E8B]"></i>
              <span>Billing // Receipts</span>
            </div>
            <h1 class="text-xl font-black text-gray-900 uppercase tracking-tight font-display">Receipts</h1>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button @click="loadReceipts" :disabled="loading"
            class="hidden md:flex items-center gap-2 text-[10px] font-mono font-bold text-[#2F2E8B] hover:opacity-80 uppercase tracking-wider transition-all disabled:opacity-50 border border-[#2F2E8B]/20 px-3 py-1.5 hover:bg-[#2F2E8B]/5">
            <i class="fas fa-sync-alt" :class="{ 'animate-spin': loading }"></i> Refresh
          </button>
        </div>
      </div>
    </header>

    <main class="flex-1 max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-12 relative z-10 space-y-6">

      <!-- Filters -->
      <div class="bg-white border border-gray-100 p-4 rounded-none shadow-sm">
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div class="flex items-center gap-2">
            <div class="w-1 h-4 bg-[#2F2E8B]"></div>
            <span class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Filter</span>
          </div>
          <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <select v-model="rangeFilter" @change="loadReceipts"
              class="rounded-none border border-gray-200 px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-wider focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]">
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="all">All Time</option>
            </select>
            <input v-model="searchQuery" @input="debounceSearch" type="text" placeholder="Search receipt #, customer..."
              class="rounded-none border border-gray-200 px-4 py-2 text-[10px] font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] w-full sm:w-60">
          </div>
        </div>
        <!-- Source Filter Tabs -->
        <div class="flex gap-0 mt-3 border-t border-gray-100 pt-3">
          <button @click="sourceFilter = 'all'"
            :class="['px-3 py-1.5 text-[9px] font-mono font-bold uppercase tracking-widest transition-all',
              sourceFilter === 'all' ? 'bg-[#2F2E8B] text-white' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50']">
            All Receipts
          </button>
          <button @click="sourceFilter = 'pos_sale'"
            :class="['px-3 py-1.5 text-[9px] font-mono font-bold uppercase tracking-widest transition-all',
              sourceFilter === 'pos_sale' ? 'bg-emerald-500 text-white' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50']">
            POS Sales
          </button>
          <button @click="sourceFilter = 'invoice_conversion'"
            :class="['px-3 py-1.5 text-[9px] font-mono font-bold uppercase tracking-widest transition-all',
              sourceFilter === 'invoice_conversion' ? 'bg-indigo-500 text-white' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50']">
            From Invoices
          </button>
        </div>
      </div>

      <!-- Summary Cards -->
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div class="bg-white border border-gray-100 p-5 rounded-none shadow-sm">
          <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Total Receipts</p>
          <h4 class="text-2xl font-black text-[#2F2E8B] font-display mt-1">{{ receipts.length }}</h4>
        </div>
        <div class="bg-white border border-gray-100 p-5 rounded-none shadow-sm">
          <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Total Revenue</p>
          <h4 class="text-2xl font-black text-emerald-600 font-display mt-1">{{ formatCurrencyShort(totalRevenue) }}</h4>
        </div>
        <div class="bg-white border border-gray-100 p-5 rounded-none shadow-sm">
          <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Avg per Receipt</p>
          <h4 class="text-lg font-black text-gray-900 font-display mt-1">{{ formatCurrencyShort(averageReceipt) }}</h4>
        </div>
        <div class="bg-white border border-gray-100 p-5 rounded-none shadow-sm">
          <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">POS Sales</p>
          <h4 class="text-lg font-black text-emerald-600 font-display mt-1">{{ posCount }}</h4>
        </div>
        <div class="bg-white border border-gray-100 p-5 rounded-none shadow-sm">
          <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">From Invoices</p>
          <h4 class="text-lg font-black text-indigo-600 font-display mt-1">{{ invoiceCount }}</h4>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-20">
        <div class="h-12 w-12 border-4 border-gray-100 border-t-[#2F2E8B] rounded-full animate-spin shadow-lg mb-4"></div>
        <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest animate-pulse">Loading receipts...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="receipts.length === 0" class="bg-white border border-dashed border-gray-200 p-12 rounded-none shadow-sm text-center">
        <i class="fas fa-receipt text-4xl text-gray-300 mb-3"></i>
        <p class="text-sm font-bold text-gray-700">No receipts found.</p>
        <p class="text-xs text-gray-500 mt-1">Receipts are generated automatically from POS sales.</p>
      </div>

      <!-- Receipts Table -->
      <div v-else class="bg-white border border-gray-100 rounded-none shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full text-sm">
            <thead class="bg-gray-50">
              <tr class="text-left text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                <th class="px-4 py-3">Receipt #</th>
                <th class="px-4 py-3">Date</th>
                <th class="px-4 py-3">Customer</th>
                <th class="px-4 py-3">Source</th>
                <th class="px-4 py-3">Items</th>
                <th class="px-4 py-3">Payment Method</th>
                <th class="px-4 py-3">Total</th>
                <th class="px-4 py-3">Cashier</th>
                <th class="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in filteredReceipts" :key="r.id || r._id" class="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                <td class="px-4 py-3">
                  <span class="font-mono font-bold text-[#2F2E8B] text-xs">{{ r.receipt_number }}</span>
                </td>
                <td class="px-4 py-3 text-xs text-gray-600 font-mono">{{ formatDate(r.transaction_date || r.created_at) }}</td>
                <td class="px-4 py-3">
                  <span class="text-xs font-bold text-gray-900">{{ r.customer?.name || r.customer_name || 'Walk-in' }}</span>
                </td>
                <td class="px-4 py-3">
                  <span class="text-[9px] font-mono font-bold px-2 py-0.5 uppercase" :class="getSourceBadgeClass(r)">
                    {{ getSourceLabel(r) }}
                  </span>
                </td>
                <td class="px-4 py-3 text-xs text-gray-500">{{ r.items?.length || 0 }}</td>
                <td class="px-4 py-3">
                  <span class="text-[10px] font-mono font-bold uppercase" :class="getPaymentMethodClass(r.payment?.method)">
                    {{ r.payment?.method || '—' }}
                  </span>
                </td>
                <td class="px-4 py-3 font-mono font-black text-sm text-gray-900">{{ formatCurrencyShort(r.total) }}</td>
                <td class="px-4 py-3 text-xs text-gray-500">{{ r.cashier?.name || r.cashier_name || '—' }}</td>
                <td class="px-4 py-3 text-right">
                  <div class="flex items-center justify-end gap-1">
                    <button @click="viewReceipt(r)" class="p-1.5 text-gray-400 hover:text-[#2F2E8B] hover:bg-[#2F2E8B]/5 transition-colors" title="View">
                      <i class="fas fa-eye text-xs"></i>
                    </button>
                    <button @click="downloadReceiptPDF(r)" class="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors" title="Download PDF">
                      <i class="fas fa-file-pdf text-xs"></i>
                    </button>
                    <button @click="downloadReceiptExcel(r)" class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="Download Excel">
                      <i class="fas fa-file-excel text-xs"></i>
                    </button>
                    <button @click="voidReceipt(r)" class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Delete">
                      <i class="fas fa-trash-alt text-xs"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <!-- View Receipt Modal -->
    <Teleport to="body">
      <div v-if="showViewModal" class="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-4" @click.self="closeViewModal">
        <div class="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-none shadow-2xl">
          <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white">
            <h3 class="text-base font-black text-gray-900 uppercase tracking-tight font-display">
              Receipt {{ selectedReceipt?.receipt_number }}
            </h3>
            <button @click="closeViewModal" class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <div v-if="selectedReceipt" class="px-6 py-5 space-y-5">
            <!-- Receipt Header -->
            <div class="text-center border-b border-gray-100 pb-4">
              <h4 class="text-lg font-black text-gray-900 uppercase">RECEIPT</h4>
              <p class="text-[10px] font-mono text-gray-500">{{ selectedReceipt.receipt_number }}</p>
              <p class="text-[10px] font-mono text-gray-500">{{ formatDate(selectedReceipt.transaction_date || selectedReceipt.created_at) }}</p>
            </div>

            <!-- Customer -->
            <div class="bg-gray-50 p-3">
              <p class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">Customer</p>
              <p class="text-sm font-bold text-gray-900">{{ selectedReceipt.customer?.name || selectedReceipt.customer_name || 'Walk-in Customer' }}</p>
              <p v-if="selectedReceipt.customer?.phone" class="text-xs text-gray-500">{{ selectedReceipt.customer.phone }}</p>
            </div>

            <!-- Items -->
            <div>
              <p class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Items</p>
              <div class="divide-y divide-gray-100">
                <div v-for="(item, idx) in (selectedReceipt.items || [])" :key="idx" class="flex justify-between py-2">
                  <div class="flex-1">
                    <p class="text-xs font-bold text-gray-900">{{ item.name }}</p>
                    <p class="text-[10px] font-mono text-gray-500">{{ item.quantity }} × {{ formatCurrencyShort(item.price) }}</p>
                  </div>
                  <p class="text-xs font-mono font-black text-gray-900">{{ formatCurrencyShort(item.quantity * item.price) }}</p>
                </div>
              </div>
            </div>

            <!-- Totals -->
            <div class="border-t border-gray-200 pt-3 space-y-1">
              <div class="flex justify-between text-xs">
                <span class="text-gray-500">Subtotal</span>
                <span class="font-mono">{{ formatCurrencyShort(selectedReceipt.total - (selectedReceipt.tax?.vat || 0)) }}</span>
              </div>
              <div v-if="selectedReceipt.discount" class="flex justify-between text-xs">
                <span class="text-gray-500">Discount</span>
                <span class="font-mono text-red-500">-{{ formatCurrencyShort(selectedReceipt.discount.amount || 0) }}</span>
              </div>
              <div v-if="selectedReceipt.tax?.vat" class="flex justify-between text-xs">
                <span class="text-gray-500">VAT</span>
                <span class="font-mono">{{ formatCurrencyShort(selectedReceipt.tax.vat) }}</span>
              </div>
              <div class="flex justify-between text-sm font-black text-gray-900 border-t border-gray-200 pt-2">
                <span>TOTAL</span>
                <span class="font-mono">{{ formatCurrencyShort(selectedReceipt.total) }}</span>
              </div>
            </div>

            <!-- Payment -->
            <div class="bg-gray-50 p-3">
              <p class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">Payment</p>
              <p class="text-xs font-bold text-gray-900 uppercase">{{ selectedReceipt.payment?.method || '—' }}</p>
              <p v-if="selectedReceipt.payment?.cash_received" class="text-xs text-gray-500">
                Cash: {{ formatCurrencyShort(selectedReceipt.payment.cash_received) }} &nbsp;|&nbsp; Change: {{ formatCurrencyShort(selectedReceipt.payment.change) }}
              </p>
            </div>

            <!-- Cashier -->
            <div class="text-center text-[10px] font-mono text-gray-400">
              Served by: {{ selectedReceipt.cashier?.name || selectedReceipt.cashier_name || '—' }}
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { decodeJWT } from '@/api_services/decodeJWT.js';
import { useCurrency } from '@/composables/useCurrency.js';
import API_BASE_URL from '@/api_services/api';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const { getTenantId, getToken, getBranchId } = decodeJWT();
const { formatCurrency, currencySymbol, formatCurrencyCompact } = useCurrency();

const loading = ref(false);
const receipts = ref([]);
const rangeFilter = ref('month');
const searchQuery = ref('');
const sourceFilter = ref('all');
const showViewModal = ref(false);
const selectedReceipt = ref(null);
const tenantDetails = ref({});
const cachedCompanyDetails = ref({});

// Helpers
const formatNumber = (n) => Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const formatWithSymbol = (amount) => {
  const n = Number(amount) || 0;
  try {
    if (formatCurrency && typeof formatCurrency === 'function') return formatCurrency(n);
  } catch (e) { /* fallback */ }
  const sym = currencySymbol?.value || currencySymbol || 'K';
  return `${sym}${formatNumber(n)}`;
};
const formatCurrencyShort = (amount) => {
  if (!amount || isNaN(amount)) return formatWithSymbol(0);
  return formatWithSymbol(amount);
};

const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-ZM', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
};

const getPaymentMethodClass = (method) => {
  const s = (method || '').toLowerCase();
  const map = {
    cash: 'text-emerald-600',
    mobile: 'text-blue-600',
    momo: 'text-blue-600',
    card: 'text-purple-600',
    credit: 'text-amber-600',
    transfer: 'text-cyan-600',
    cheque: 'text-gray-600',
    invoice: 'text-[#2F2E8B]'
  };
  return map[s] || 'text-gray-600';
};

const getSourceBadgeClass = (r) => {
  const type = r.receipt_type || r.source || 'pos_sale';
  if (type === 'invoice_conversion') return 'bg-indigo-50 text-indigo-700 border border-indigo-200';
  return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
};

const getSourceLabel = (r) => {
  const type = r.receipt_type || r.source || 'pos_sale';
  if (type === 'invoice_conversion') return 'From Invoice';
  return 'POS Sale';
};

// Computed
const totalRevenue = computed(() => {
  return receipts.value.reduce((sum, r) => sum + (Number(r.total) || 0), 0);
});

const averageReceipt = computed(() => {
  if (receipts.value.length === 0) return 0;
  return totalRevenue.value / receipts.value.length;
});

const uniquePaymentMethods = computed(() => {
  const set = new Set();
  receipts.value.forEach(r => {
    if (r.payment?.method) set.add(String(r.payment.method));
  });
  return Array.from(set);
});

const posCount = computed(() => {
  if (sourceFilter.value !== 'all' && sourceFilter.value !== 'pos_sale') return '—';
  return receipts.value.filter(r => {
    const type = r.receipt_type || r.source || 'pos_sale';
    return type === 'pos_sale';
  }).length;
});

const invoiceCount = computed(() => {
  if (sourceFilter.value !== 'all' && sourceFilter.value !== 'invoice_conversion') return '—';
  return receipts.value.filter(r => {
    const type = r.receipt_type || r.source || 'pos_sale';
    return type === 'invoice_conversion';
  }).length;
});

const filteredReceipts = computed(() => {
  if (!searchQuery.value.trim()) return receipts.value;
  const q = searchQuery.value.toLowerCase();
  return receipts.value.filter(r => {
    const receiptNum = (r.receipt_number || '').toLowerCase();
    const customerName = (r.customer?.name || r.customer_name || '').toLowerCase();
    const cashierName = (r.cashier?.name || r.cashier_name || '').toLowerCase();
    return receiptNum.includes(q) || customerName.includes(q) || cashierName.includes(q);
  });
});

// Debounce search
let searchTimeout = null;
const debounceSearch = () => {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {}, 300);
};

// Load receipts from the combined receipts endpoint
const loadReceipts = async () => {
  loading.value = true;
  const tenantId = getTenantId();
  const branchId = getBranchId();

  try {
    const params = new URLSearchParams({ tenant_id: tenantId, range: rangeFilter.value });
    if (branchId) params.append('branch_id', branchId);
    if (sourceFilter.value !== 'all') params.append('source', sourceFilter.value);

    const res = await fetch(`${API_BASE_URL}/invoices/receipts?${params}`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });

    if (res.ok) {
      const data = await res.json();
      receipts.value = Array.isArray(data) ? data : (data.receipts || []);
    } else {
      console.error('Failed to load receipts');
      receipts.value = [];
    }
  } catch (err) {
    console.error('Error loading receipts:', err);
    receipts.value = [];
  } finally {
    loading.value = false;
  }
};

// View receipt
const viewReceipt = (r) => {
  selectedReceipt.value = r;
  showViewModal.value = true;
};

const closeViewModal = () => {
  showViewModal.value = false;
  selectedReceipt.value = null;
};

// Void receipt
const voidReceipt = async (r) => {
  if (!confirm(`Delete receipt ${r.receipt_number}? This action cannot be undone.`)) return;
  try {
    const tenantId = getTenantId();
    const receiptId = r.id || r._id;

    const res = await fetch(`${API_BASE_URL}/invoices/receipts/${receiptId}?tenant_id=${tenantId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });

    if (!res.ok) throw new Error('Failed to delete receipt');
    await loadReceipts();
  } catch (err) {
    console.error('Error deleting receipt:', err);
    alert(err.message || 'Failed to delete receipt');
  }
};

// Download Receipt PDF (matches invoice PDF style)
const loadImage = (url) => {
  return new Promise((resolve) => {
    if (!url) return resolve(null);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } catch { resolve(null); }
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
};

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : [47, 46, 139];
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
    if (tenant) {
      tenantDetails.value = tenant;
      cachedCompanyDetails.value = {
        companyName: tenant.company_name || tenant.companyName || tenant.businessName || tenant.business_name || tenant.trading_name || tenant.tradingName || tenant.name || '',
        companyEmail: tenant.email || tenant.owner_email || tenant.contact_email || '',
        companyPhone: tenant.phone_number || tenant.phone || tenant.contact_phone || '',
        companyTpin: tenant.tpin || tenant.TPIN || '',
        companyAddress: [tenant.address || tenant.location || '', tenant.city || '', tenant.country || ''].filter(Boolean).join(', ')
      };
    }
  } catch (err) { console.error('Failed to fetch tenant details:', err); }
};

const downloadReceiptPDF = async (r) => {
  try {
    const doc = new jsPDF();
    const primaryRGB = hexToRgb('#2F2E8B');
    const co = cachedCompanyDetails.value;

    // 1. Logo (if available)
    let headerY = 15;
    const logoUrl = tenantDetails.value.company_logo || tenantDetails.value.logo;
    if (logoUrl) {
      const base64Logo = await loadImage(logoUrl);
      if (base64Logo) {
        doc.addImage(base64Logo, 'PNG', 14, 15, 30, 30, undefined, 'FAST');
        headerY = 50;
      }
    }

    // 2. Company Info (Top Right)
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
    const coNameLines = doc.splitTextToSize((co.companyName || 'YOUR COMPANY').toUpperCase(), 90);
    coNameLines.forEach((line, i) => doc.text(line, 196, 20 + (i * 7), { align: 'right' }));

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100);
    let compY = 20 + (coNameLines.length * 7);
    if (co.companyAddress) {
      const addrLines = doc.splitTextToSize(co.companyAddress, 90);
      addrLines.forEach(line => { doc.text(line, 196, compY, { align: 'right' }); compY += 5; });
    }
    if (co.companyPhone) { doc.text(`Tel: ${co.companyPhone}`, 196, compY, { align: 'right' }); compY += 5; }
    if (co.companyEmail) { doc.text(`Email: ${co.companyEmail}`, 196, compY, { align: 'right' }); compY += 5; }
    if (co.companyTpin) { doc.text(`TPIN: ${co.companyTpin}`, 196, compY, { align: 'right' }); compY += 5; }

    // 3. Document Title
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
    doc.text('RECEIPT', 14, headerY + 10);

    doc.setDrawColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
    doc.setLineWidth(0.5);
    doc.line(14, headerY + 14, 196, headerY + 14);

    // 4. Receipt Info
    const infoY = headerY + 22;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(60);
    doc.text(`Receipt #:`, 14, infoY);
    doc.setFont('helvetica', 'normal');
    doc.text(r.receipt_number || '—', 55, infoY);

    doc.setFont('helvetica', 'bold');
    doc.text(`Date:`, 14, infoY + 7);
    doc.setFont('helvetica', 'normal');
    doc.text(formatDate(r.transaction_date || r.created_at), 55, infoY + 7);

    doc.setFont('helvetica', 'bold');
    doc.text(`Customer:`, 14, infoY + 14);
    doc.setFont('helvetica', 'normal');
    doc.text(r.customer?.name || r.customer_name || 'Walk-in', 55, infoY + 14);

    doc.setFont('helvetica', 'bold');
    doc.text(`Cashier:`, 14, infoY + 21);
    doc.setFont('helvetica', 'normal');
    doc.text(r.cashier?.name || r.cashier_name || '—', 55, infoY + 21);

    // 5. Items Table
    const items = (r.items || []).map((item, i) => [
      (i + 1).toString(),
      item.name || 'Item',
      String(item.quantity || 1),
      formatCurrencyShort(item.price || 0),
      formatCurrencyShort((item.quantity || 1) * (item.price || 0))
    ]);

    if (!items.length) {
      items.push(['1', r.receipt_number || 'Receipt', '1', formatCurrencyShort(r.total), formatCurrencyShort(r.total)]);
    }

    autoTable(doc, {
      startY: infoY + 28,
      head: [['#', 'Description', 'Qty', 'Price', 'Total']],
      body: items,
      theme: 'grid',
      headStyles: { fillColor: primaryRGB, fontSize: 8, fontStyle: 'bold' },
      bodyStyles: { fontSize: 8 },
      columnStyles: {
        0: { cellWidth: 10, halign: 'center' },
        1: { cellWidth: 80 },
        2: { cellWidth: 20, halign: 'center' },
        3: { cellWidth: 35, halign: 'right' },
        4: { cellWidth: 35, halign: 'right' }
      }
    });

    // 6. Totals
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
    doc.text(`Total: ${formatCurrencyShort(r.total)}`, 196, finalY, { align: 'right' });

    if (r.tax?.vat) {
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100);
      doc.text(`VAT: ${formatCurrencyShort(r.tax.vat)}`, 196, finalY + 7, { align: 'right' });
    }

    // 7. Footer
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(150);
    doc.text('Generated Securely via UB App Cloud Systems', 105, 280, { align: 'center' });

    doc.save(`Receipt_${r.receipt_number || 'unknown'}.pdf`);
  } catch (err) {
    console.error('PDF generation error:', err);
    alert('Failed to generate PDF. Check console for details.');
  }
};

// Download Receipt as Excel/CSV
const downloadReceiptExcel = (r) => {
  try {
    const items = r.items || [];
    let csv = 'Item,Quantity,Price,Total\n';
    items.forEach(item => {
      const qty = item.quantity || 1;
      const price = item.price || 0;
      csv += `"${item.name || 'Item'}",${qty},${price},${qty * price}\n`;
    });
    csv += `\nTotal,,,${r.total || 0}\n`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Receipt_${r.receipt_number || 'unknown'}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  } catch (err) {
    console.error('Excel download error:', err);
    alert('Failed to download Excel');
  }
};

watch(sourceFilter, () => loadReceipts());

onMounted(async () => {
  await fetchTenantDetails();
  await loadReceipts();
});
</script>

<style scoped>
.mesh-background {
  background-color: #ffffff;
  background-image: 
    linear-gradient(rgba(47, 46, 139, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(47, 46, 139, 0.03) 1px, transparent 1px);
  background-size: 30px 30px;
}
</style>
