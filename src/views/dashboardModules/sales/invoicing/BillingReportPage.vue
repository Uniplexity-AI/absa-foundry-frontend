<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <button
          @click="$router.push('/dashboard/invoicing')"
          class="text-gray-400 hover:text-[#2F2E8B] transition-colors"
        >
          <i class="fas fa-arrow-left text-lg"></i>
        </button>
        <div>
          <h1 class="text-xl font-black text-gray-900 tracking-tight">Billing Report</h1>
          <p class="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
            Revenue summary · invoices · quotations · recurring
          </p>
        </div>
      </div>
      <button
        @click="printReport"
        class="flex items-center gap-2 px-4 py-2 bg-[#2F2E8B] text-white text-[11px] font-mono font-bold uppercase tracking-widest hover:bg-[#26258a] transition-colors"
      >
        <i class="fas fa-print"></i> Print Report
      </button>
    </div>

    <div class="p-6 space-y-6">
      <!-- Date Range Selector -->
      <div class="flex flex-wrap items-center gap-2">
        <button
          v-for="r in dateRanges"
          :key="r.key"
          @click="setRange(r.key)"
          :class="[
            'px-4 py-2 text-[11px] font-mono font-bold uppercase tracking-widest border transition-all',
            selectedRange === r.key
              ? 'bg-[#2F2E8B] text-white border-[#2F2E8B]'
              : 'bg-white text-gray-600 border-gray-200 hover:border-[#2F2E8B]',
          ]"
        >
          {{ r.label }}
        </button>
        <template v-if="selectedRange === 'custom'">
          <input
            v-model="customStart"
            type="date"
            class="px-3 py-2 border border-gray-200 text-[11px] font-mono bg-white focus:outline-none focus:border-[#2F2E8B]"
          />
          <span class="text-gray-400 text-xs">to</span>
          <input
            v-model="customEnd"
            type="date"
            class="px-3 py-2 border border-gray-200 text-[11px] font-mono bg-white focus:outline-none focus:border-[#2F2E8B]"
          />
          <button
            @click="fetchReport"
            class="px-4 py-2 bg-[#2F2E8B] text-white text-[11px] font-mono font-bold uppercase tracking-widest hover:bg-[#26258a] transition-colors"
          >
            Apply
          </button>
        </template>
        <span
          v-if="loading"
          class="ml-2 text-[10px] font-mono text-gray-400 uppercase tracking-widest"
        >
          <i class="fas fa-circle-notch fa-spin mr-1"></i> Loading…
        </span>
      </div>

      <!-- KPI Cards (based on selection) -->
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div
          v-for="kpi in kpis"
          :key="kpi.label"
          class="bg-white border border-gray-200 p-5 shadow-sm relative overflow-hidden group hover:border-[#2F2E8B] transition-all"
        >
          <div class="absolute inset-0 opacity-5 pointer-events-none"
               style="background-image: radial-gradient(circle, #2F2E8B 1px, transparent 1px); background-size: 14px 14px;"></div>
          <div class="relative z-10">
            <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">{{ kpi.label }}</p>
            <p class="text-2xl font-black tracking-tighter" :class="kpi.color">
              {{ kpi.isCurrency ? formatCurrency(kpi.value) : kpi.value }}
            </p>
          </div>
          <div class="absolute bottom-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <i :class="['text-4xl', kpi.icon]"></i>
          </div>
        </div>
      </div>

      <!-- Document Selectors (3 columns) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Invoices -->
        <div class="bg-white border border-gray-200 shadow-sm">
          <div class="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <i class="fas fa-file-invoice text-[#2F2E8B]"></i>
              <h3 class="text-[11px] font-mono font-bold uppercase tracking-widest text-gray-700">
                Invoices <span class="text-gray-400">({{ invoices.length }})</span>
              </h3>
            </div>
            <button
              @click="toggleAll('invoice')"
              class="text-[10px] font-mono text-[#2F2E8B] hover:underline uppercase tracking-widest"
            >
              {{ allInvoicesSelected ? 'Deselect All' : 'Select All' }}
            </button>
          </div>
          <div class="max-h-72 overflow-y-auto divide-y divide-gray-50">
            <div
              v-if="invoices.length === 0"
              class="px-4 py-6 text-center text-[11px] font-mono text-gray-400 uppercase tracking-widest"
            >
              No invoices found
            </div>
            <label
              v-for="doc in invoices"
              :key="doc.id"
              class="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="checkbox"
                :value="doc.id"
                v-model="selectedIds"
                class="accent-[#2F2E8B] w-4 h-4 flex-shrink-0"
              />
              <div class="min-w-0 flex-1">
                <p class="text-[12px] font-bold text-gray-800 truncate">{{ doc.name }}</p>
                <p class="text-[10px] font-mono text-gray-400">{{ doc.number }} · {{ doc.date }}</p>
              </div>
              <span class="text-[11px] font-mono font-bold text-gray-700 flex-shrink-0">
                {{ formatCurrency(doc.total) }}
              </span>
            </label>
          </div>
        </div>

        <!-- Quotations -->
        <div class="bg-white border border-gray-200 shadow-sm">
          <div class="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <i class="fas fa-quote-left text-amber-500"></i>
              <h3 class="text-[11px] font-mono font-bold uppercase tracking-widest text-gray-700">
                Quotations <span class="text-gray-400">({{ quotations.length }})</span>
              </h3>
            </div>
            <button
              @click="toggleAll('quotation')"
              class="text-[10px] font-mono text-amber-600 hover:underline uppercase tracking-widest"
            >
              {{ allQuotationsSelected ? 'Deselect All' : 'Select All' }}
            </button>
          </div>
          <div class="max-h-72 overflow-y-auto divide-y divide-gray-50">
            <div
              v-if="quotations.length === 0"
              class="px-4 py-6 text-center text-[11px] font-mono text-gray-400 uppercase tracking-widest"
            >
              No quotations found
            </div>
            <label
              v-for="doc in quotations"
              :key="doc.id"
              class="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-amber-50 transition-colors"
            >
              <input
                type="checkbox"
                :value="doc.id"
                v-model="selectedIds"
                class="accent-amber-500 w-4 h-4 flex-shrink-0"
              />
              <div class="min-w-0 flex-1">
                <p class="text-[12px] font-bold text-gray-800 truncate">{{ doc.name }}</p>
                <p class="text-[10px] font-mono text-gray-400">{{ doc.number }} · {{ doc.date }}</p>
              </div>
              <span class="text-[11px] font-mono font-bold text-gray-700 flex-shrink-0">
                {{ formatCurrency(doc.total) }}
              </span>
            </label>
          </div>
        </div>

        <!-- Recurring -->
        <div class="bg-white border border-gray-200 shadow-sm">
          <div class="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <i class="fas fa-redo text-emerald-500"></i>
              <h3 class="text-[11px] font-mono font-bold uppercase tracking-widest text-gray-700">
                Recurring <span class="text-gray-400">({{ recurring.length }})</span>
              </h3>
            </div>
            <button
              @click="toggleAll('recurring')"
              class="text-[10px] font-mono text-emerald-600 hover:underline uppercase tracking-widest"
            >
              {{ allRecurringSelected ? 'Deselect All' : 'Select All' }}
            </button>
          </div>
          <div class="max-h-72 overflow-y-auto divide-y divide-gray-50">
            <div
              v-if="recurring.length === 0"
              class="px-4 py-6 text-center text-[11px] font-mono text-gray-400 uppercase tracking-widest"
            >
              No recurring invoices found
            </div>
            <label
              v-for="doc in recurring"
              :key="doc.id"
              class="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-emerald-50 transition-colors"
            >
              <input
                type="checkbox"
                :value="doc.id"
                v-model="selectedIds"
                class="accent-emerald-500 w-4 h-4 flex-shrink-0"
              />
              <div class="min-w-0 flex-1">
                <p class="text-[12px] font-bold text-gray-800 truncate">{{ doc.name }}</p>
                <p class="text-[10px] font-mono text-gray-400">{{ doc.number }} · {{ doc.date }}</p>
              </div>
              <span class="text-[11px] font-mono font-bold text-gray-700 flex-shrink-0">
                {{ formatCurrency(doc.total) }}
              </span>
            </label>
          </div>
        </div>
      </div>

      <!-- Selected Documents Table -->
      <div class="bg-white border border-gray-200 shadow-sm" id="billing-report-table">
        <div class="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
          <h3 class="text-[11px] font-mono font-bold uppercase tracking-widest text-gray-700">
            Selected Documents
            <span class="text-gray-400 font-normal">({{ selectedDocs.length }})</span>
          </h3>
          <span class="text-[11px] font-mono font-bold text-[#2F2E8B]">
            Total: {{ formatCurrency(selectedTotal) }}
          </span>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-[11px] font-mono">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-3 text-left font-bold text-gray-500 uppercase tracking-widest">Type</th>
                <th class="px-4 py-3 text-left font-bold text-gray-500 uppercase tracking-widest">Client</th>
                <th class="px-4 py-3 text-left font-bold text-gray-500 uppercase tracking-widest">Doc #</th>
                <th class="px-4 py-3 text-left font-bold text-gray-500 uppercase tracking-widest">Date</th>
                <th class="px-4 py-3 text-left font-bold text-gray-500 uppercase tracking-widest">Status</th>
                <th class="px-4 py-3 text-right font-bold text-gray-500 uppercase tracking-widest">Amount</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-if="selectedDocs.length === 0">
                <td colspan="6" class="px-4 py-8 text-center text-gray-400 uppercase tracking-widest">
                  Select documents above to see details
                </td>
              </tr>
              <tr
                v-for="doc in selectedDocs"
                :key="doc.id"
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="px-4 py-3">
                  <span
                    :class="[
                      'px-2 py-1 text-[10px] font-bold uppercase tracking-widest',
                      doc.type === 'invoice' ? 'bg-blue-50 text-blue-700' :
                      doc.type === 'quotation' ? 'bg-amber-50 text-amber-700' :
                      'bg-emerald-50 text-emerald-700',
                    ]"
                  >
                    {{ doc.type }}
                  </span>
                </td>
                <td class="px-4 py-3 font-bold text-gray-800">{{ doc.name }}</td>
                <td class="px-4 py-3 text-gray-500">{{ doc.number || '—' }}</td>
                <td class="px-4 py-3 text-gray-500">{{ doc.date || '—' }}</td>
                <td class="px-4 py-3">
                  <span
                    :class="[
                      'px-2 py-1 text-[10px] font-bold uppercase tracking-widest',
                      doc.status === 'paid' ? 'bg-green-50 text-green-700' :
                      doc.status === 'issued' || doc.status === 'sent' ? 'bg-blue-50 text-blue-700' :
                      doc.status === 'overdue' ? 'bg-red-50 text-red-700' :
                      'bg-gray-100 text-gray-500',
                    ]"
                  >
                    {{ doc.status }}
                  </span>
                </td>
                <td class="px-4 py-3 text-right font-bold text-gray-800">{{ formatCurrency(doc.total) }}</td>
              </tr>
            </tbody>
            <tfoot v-if="selectedDocs.length > 0" class="border-t-2 border-gray-200 bg-gray-50">
              <tr>
                <td colspan="5" class="px-4 py-3 font-bold text-gray-700 uppercase tracking-widest text-right">Grand Total</td>
                <td class="px-4 py-3 text-right font-black text-[#2F2E8B] text-base">{{ formatCurrency(selectedTotal) }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { BackButton } from '@/components/ui'
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { API_BASE_URL } from '@/api_services/api';
import { decodeJWT } from '@/api_services/decodeJWT.js';

const router = useRouter();

// ── Auth ─────────────────────────────────────────────────────────
const { getTenantId, getToken } = decodeJWT();
const getAuthHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ── State ─────────────────────────────────────────────────────────
const loading = ref(false);
const invoices = ref([]);
const quotations = ref([]);
const recurring = ref([]);
const selectedIds = ref([]);
const selectedRange = ref('today');
const customStart = ref('');
const customEnd = ref('');
const tenantDetails = ref({});

// ── Date Ranges ───────────────────────────────────────────────────
const dateRanges = [
  { key: 'today', label: 'Today' },
  { key: 'week', label: 'This Week' },
  { key: 'month', label: 'This Month' },
  { key: 'all', label: 'All Time' },
  { key: 'custom', label: 'Custom' },
];

function getDateParams(rangeKey) {
  const today = new Date();
  const fmt = (d) => d.toISOString().split('T')[0];

  if (rangeKey === 'today') {
    const s = fmt(today);
    return { start_date: s, end_date: s };
  }
  if (rangeKey === 'week') {
    const mon = new Date(today);
    mon.setDate(today.getDate() - today.getDay() + 1);
    return { start_date: fmt(mon), end_date: fmt(today) };
  }
  if (rangeKey === 'month') {
    const first = new Date(today.getFullYear(), today.getMonth(), 1);
    return { start_date: fmt(first), end_date: fmt(today) };
  }
  if (rangeKey === 'custom') {
    return { start_date: customStart.value || undefined, end_date: customEnd.value || undefined };
  }
  return {}; // all time
}

// ── Fetch ──────────────────────────────────────────────────────────
async function fetchReport() {
  const tenantId = getTenantId();
  if (!tenantId) return;
  loading.value = true;
  try {
    const params = new URLSearchParams({ tenant_id: tenantId });
    const dp = getDateParams(selectedRange.value);
    if (dp.start_date) params.set('start_date', dp.start_date);
    if (dp.end_date) params.set('end_date', dp.end_date);

    const res = await fetch(`${API_BASE_URL}/invoices/report?${params}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    invoices.value = data.invoices || [];
    quotations.value = data.quotations || [];
    recurring.value = data.recurring || [];

    // Auto-select all
    selectedIds.value = [
      ...invoices.value.map((d) => d.id),
      ...quotations.value.map((d) => d.id),
      ...recurring.value.map((d) => d.id),
    ];
  } catch (e) {
    console.error('Billing report fetch error:', e);
  } finally {
    loading.value = false;
  }
}

function setRange(key) {
  selectedRange.value = key;
  if (key !== 'custom') fetchReport();
}

// ── Select All helpers ────────────────────────────────────────────
const allInvoicesSelected = computed(() =>
  invoices.value.length > 0 && invoices.value.every((d) => selectedIds.value.includes(d.id))
);
const allQuotationsSelected = computed(() =>
  quotations.value.length > 0 && quotations.value.every((d) => selectedIds.value.includes(d.id))
);
const allRecurringSelected = computed(() =>
  recurring.value.length > 0 && recurring.value.every((d) => selectedIds.value.includes(d.id))
);

function toggleAll(type) {
  const map = { invoice: invoices, quotation: quotations, recurring: recurring };
  const list = map[type].value;
  const ids = list.map((d) => d.id);
  const allSelected = ids.every((id) => selectedIds.value.includes(id));
  if (allSelected) {
    selectedIds.value = selectedIds.value.filter((id) => !ids.includes(id));
  } else {
    const newSet = new Set([...selectedIds.value, ...ids]);
    selectedIds.value = [...newSet];
  }
}

// ── Computed selections ───────────────────────────────────────────
const allDocs = computed(() => [...invoices.value, ...quotations.value, ...recurring.value]);

const selectedDocs = computed(() =>
  allDocs.value.filter((d) => selectedIds.value.includes(d.id))
);

const selectedTotal = computed(() =>
  selectedDocs.value.reduce((s, d) => s + (d.total || 0), 0)
);

const selectedInvoiceTotal = computed(() =>
  selectedDocs.value.filter((d) => d.type === 'invoice').reduce((s, d) => s + (d.total || 0), 0)
);
const selectedQuotationTotal = computed(() =>
  selectedDocs.value.filter((d) => d.type === 'quotation').reduce((s, d) => s + (d.total || 0), 0)
);
const selectedRecurringTotal = computed(() =>
  selectedDocs.value.filter((d) => d.type === 'recurring').reduce((s, d) => s + (d.total || 0), 0)
);

// ── KPIs ──────────────────────────────────────────────────────────
const kpis = computed(() => [
  {
    label: 'Total Revenue',
    value: selectedTotal.value,
    isCurrency: true,
    color: 'text-[#2F2E8B]',
    icon: 'fas fa-coins',
  },
  {
    label: 'Invoice Revenue',
    value: selectedInvoiceTotal.value,
    isCurrency: true,
    color: 'text-blue-700',
    icon: 'fas fa-file-invoice',
  },
  {
    label: 'Quotation Revenue',
    value: selectedQuotationTotal.value,
    isCurrency: true,
    color: 'text-amber-600',
    icon: 'fas fa-quote-left',
  },
  {
    label: 'Recurring Revenue',
    value: selectedRecurringTotal.value,
    isCurrency: true,
    color: 'text-emerald-600',
    icon: 'fas fa-redo',
  },
  {
    label: 'Documents',
    value: selectedDocs.value.length,
    isCurrency: false,
    color: 'text-gray-800',
    icon: 'fas fa-folder-open',
  },
]);

// ── Currency formatter ────────────────────────────────────────────
function formatCurrency(val) {
  const num = parseFloat(val) || 0;
  return 'K ' + num.toLocaleString('en-ZM', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ── Tenant details ───────────────────────────────────────────────
async function fetchTenantDetails() {
  try {
    const tenantId = getTenantId();
    if (!tenantId) return;
    let data = null;
    try {
      const r = await fetch(`${API_BASE_URL}/tenant-details/details?tenant_id=${tenantId}`);
      if (r.ok) data = await r.json();
    } catch {}
    if (!data) {
      try {
        const r2 = await fetch(`${API_BASE_URL}/tenants/details?tenant_id=${tenantId}`);
        if (r2.ok) data = await r2.json();
      } catch {}
    }
    const t = data?.tenant ?? data ?? {};
    tenantDetails.value = t;
  } catch {}
}

// ── Print preview ────────────────────────────────────────────────
function printReport() {
  const t = tenantDetails.value;
  const companyName = t.company_name || t.companyName || t.businessName || t.name || 'Your Company';
  const companyAddress = [t.address || t.location, t.city, t.country].filter(Boolean).join(', ');
  const companyPhone = t.phone_number || t.phone || '';
  const companyTpin = t.tpin || '';
  const companyLogo = t.company_logo || t.logo || '';

  const dp = getDateParams(selectedRange.value);
  const rangeLabel = selectedRange.value === 'today' ? 'Today'
    : selectedRange.value === 'week' ? 'This Week'
    : selectedRange.value === 'month' ? 'This Month'
    : selectedRange.value === 'custom' ? `${dp.start_date || ''} to ${dp.end_date || ''}`
    : 'All Time';

  const typeColors = { invoice: '#2563EB', quotation: '#D97706', recurring: '#059669' };
  const statusColors = { paid: '#15803D', issued: '#2563EB', sent: '#2563EB', overdue: '#DC2626', draft: '#6B7280' };

  const rows = selectedDocs.value.map((d) => {
    const tc = typeColors[d.type] || '#6B7280';
    const sc = statusColors[d.status] || '#6B7280';
    return `
      <tr>
        <td><span style="background:${tc}18;color:${tc};padding:2px 8px;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.05em;font-family:monospace">${d.type}</span></td>
        <td style="font-weight:700">${d.name || '—'}</td>
        <td style="font-family:monospace">${d.number || '—'}</td>
        <td style="font-family:monospace">${d.date || '—'}</td>
        <td><span style="background:${sc}18;color:${sc};padding:2px 8px;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.05em;font-family:monospace">${d.status || 'draft'}</span></td>
        <td style="text-align:right;font-family:monospace;font-weight:700">${formatCurrency(d.total)}</td>
      </tr>`;
  }).join('');

  const invTotal = selectedInvoiceTotal.value;
  const quotTotal = selectedQuotationTotal.value;
  const recTotal = selectedRecurringTotal.value;
  const grandTotal = selectedTotal.value;
  const docCount = selectedDocs.value.length;

  const kpiBlock = [
    { label: 'Total Revenue', value: formatCurrency(grandTotal), color: '#2F2E8B' },
    { label: 'Invoice Revenue', value: formatCurrency(invTotal), color: '#2563EB' },
    { label: 'Quotation Revenue', value: formatCurrency(quotTotal), color: '#D97706' },
    { label: 'Recurring Revenue', value: formatCurrency(recTotal), color: '#059669' },
    { label: 'Documents', value: docCount, color: '#374151' },
  ].map(k => `
    <div style="flex:1;min-width:140px;border:1px solid #e5e7eb;padding:16px 20px;background:#fff">
      <div style="font-size:9px;font-family:monospace;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.1em;margin-bottom:6px">${k.label}</div>
      <div style="font-size:22px;font-weight:900;color:${k.color};letter-spacing:-0.03em">${k.value}</div>
    </div>`).join('');

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Billing Report – ${companyName}</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size:13px; color:#111827; background:#fff; }
    .page { max-width:960px; margin:0 auto; padding:48px 40px; }
    .accent-bar { height:5px; background:#2F2E8B; width:100%; margin-bottom:36px; }
    .header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:32px; }
    .company-name { font-size:24px; font-weight:900; color:#2F2E8B; text-transform:uppercase; letter-spacing:-0.02em; }
    .company-sub { font-size:10px; font-family:monospace; color:#9ca3af; text-transform:uppercase; letter-spacing:.1em; margin-top:4px; }
    .company-meta { font-size:11px; color:#6b7280; margin-top:2px; }
    .report-label { font-size:11px; font-family:monospace; color:#9ca3af; text-transform:uppercase; letter-spacing:.1em; margin-bottom:4px; }
    .report-title { font-size:28px; font-weight:900; color:#111827; letter-spacing:-0.03em; }
    .report-range { display:inline-block; margin-top:8px; padding:4px 14px; background:#2F2E8B18; color:#2F2E8B; font-size:11px; font-family:monospace; font-weight:700; text-transform:uppercase; letter-spacing:.05em; }
    .divider { border:none; border-top:1px solid #e5e7eb; margin:28px 0; }
    .kpi-row { display:flex; gap:12px; flex-wrap:wrap; margin-bottom:32px; }
    table { width:100%; border-collapse:collapse; }
    thead tr { background:#2F2E8B; color:#fff; }
    thead th { padding:10px 14px; font-size:10px; font-family:monospace; font-weight:800; text-transform:uppercase; letter-spacing:.08em; text-align:left; }
    thead th:last-child { text-align:right; }
    tbody tr { border-bottom:1px solid #f3f4f6; }
    tbody tr:hover { background:#f9fafb; }
    tbody td { padding:10px 14px; font-size:12px; vertical-align:middle; }
    tfoot tr { border-top:2px solid #e5e7eb; background:#f9fafb; }
    tfoot td { padding:12px 14px; font-size:13px; font-weight:900; }
    .grand-total-cell { text-align:right; color:#2F2E8B; font-size:18px; font-family:monospace; }
    .footer { margin-top:48px; text-align:center; font-size:9px; font-family:monospace; color:#d1d5db; text-transform:uppercase; letter-spacing:.15em; }
    @media print {
      body { -webkit-print-color-adjust:exact; print-color-adjust:exact; }
      .no-print { display:none !important; }
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="accent-bar"></div>
    <div class="header">
      <div>
        ${companyLogo ? `<img src="${companyLogo}" style="height:56px;object-fit:contain;margin-bottom:8px" alt="logo">` : ''}
        <div class="company-name">${companyName}</div>
        <div class="company-sub">Billing Report</div>
        ${companyAddress ? `<div class="company-meta">${companyAddress}</div>` : ''}
        ${companyPhone ? `<div class="company-meta">Tel: ${companyPhone}</div>` : ''}
        ${companyTpin ? `<div class="company-meta">TPIN: ${companyTpin}</div>` : ''}
      </div>
      <div style="text-align:right">
        <div class="report-label">Financial Report</div>
        <div class="report-title">Billing Summary</div>
        <div class="report-range">${rangeLabel}</div>
        <div style="font-size:11px;color:#9ca3af;margin-top:8px;font-family:monospace">Generated: ${new Date().toLocaleDateString('en-ZM', { day:'2-digit', month:'short', year:'numeric' })}</div>
      </div>
    </div>

    <hr class="divider">

    <div class="kpi-row">${kpiBlock}</div>

    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Client</th>
          <th>Doc #</th>
          <th>Date</th>
          <th>Status</th>
          <th style="text-align:right">Amount</th>
        </tr>
      </thead>
      <tbody>${rows || '<tr><td colspan="6" style="text-align:center;padding:32px;color:#9ca3af">No documents selected</td></tr>'}</tbody>
      <tfoot>
        <tr>
          <td colspan="5" style="text-align:right;font-size:11px;font-family:monospace;color:#6b7280;text-transform:uppercase;letter-spacing:.08em">Grand Total</td>
          <td class="grand-total-cell">${formatCurrency(grandTotal)}</td>
        </tr>
      </tfoot>
    </table>

    <div class="footer">Generated securely via ${companyName} · UB App Cloud Systems · ${new Date().toISOString().split('T')[0]}</div>
  </div>
  <div class="no-print" style="text-align:center;padding:24px;background:#f9fafb;border-top:1px solid #e5e7eb">
    <button onclick="window.print()" style="background:#2F2E8B;color:#fff;border:none;padding:12px 32px;font-size:12px;font-family:monospace;font-weight:800;text-transform:uppercase;letter-spacing:.08em;cursor:pointer">Print / Save as PDF</button>
    <button onclick="window.close()" style="margin-left:12px;background:#fff;color:#374151;border:1px solid #d1d5db;padding:12px 24px;font-size:12px;font-family:monospace;font-weight:700;text-transform:uppercase;letter-spacing:.08em;cursor:pointer">Close</button>
  </div>
</body>
</html>`;

  const w = window.open('', '_blank', 'width=1100,height=800');
  if (!w) { alert('Please allow pop-ups to preview the report.'); return; }
  w.document.write(html);
  w.document.close();
}

// ── Init ──────────────────────────────────────────────────────────
onMounted(() => { fetchTenantDetails(); fetchReport(); });
</script>

<style scoped>
@media print {
  button, input[type="date"] { display: none !important; }
}
</style>
