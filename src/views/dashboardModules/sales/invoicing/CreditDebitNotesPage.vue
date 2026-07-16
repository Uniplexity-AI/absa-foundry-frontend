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
              <i class="fas fa-exchange-alt text-[#2F2E8B]"></i>
              <span>Billing // Credit &amp; Debit Notes</span>
            </div>
            <h1 class="text-xl font-black text-gray-900 uppercase tracking-tight font-display">Credit / Debit Notes</h1>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button @click="loadNotes" :disabled="loading"
            class="hidden md:flex items-center gap-2 text-[10px] font-mono font-bold text-[#2F2E8B] hover:opacity-80 uppercase tracking-wider transition-all disabled:opacity-50 border border-[#2F2E8B]/20 px-3 py-1.5 hover:bg-[#2F2E8B]/5">
            <i class="fas fa-sync-alt" :class="{ 'animate-spin': loading }"></i> Refresh
          </button>
        </div>
      </div>
    </header>

    <main class="flex-1 max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-12 relative z-10 space-y-6">

      <!-- Explanation Banner -->
      <div class="bg-white border border-gray-100 p-5 rounded-none shadow-sm">
        <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Standard Accounting</p>
        <p class="text-sm text-gray-700">
          <strong>Credit Notes</strong> reduce the value of an invoice (cancellation, return, or discount).
          <strong>Debit Notes</strong> increase the value of an invoice (correction, additional charges).
          Both adjust the original document without deleting it.
        </p>
      </div>

      <!-- Summary Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-white border border-gray-100 p-5 rounded-none shadow-sm">
          <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Credit Notes</p>
          <h4 class="text-2xl font-black text-amber-600 font-display mt-1">{{ creditNotes.length }}</h4>
        </div>
        <div class="bg-white border border-gray-100 p-5 rounded-none shadow-sm">
          <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Credit Total</p>
          <h4 class="text-lg font-black text-amber-600 font-display mt-1">{{ formatCurrencyShort(totalCreditAmount) }}</h4>
        </div>
        <div class="bg-white border border-gray-100 p-5 rounded-none shadow-sm">
          <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Debit Notes</p>
          <h4 class="text-2xl font-black text-blue-600 font-display mt-1">{{ debitNotes.length }}</h4>
        </div>
        <div class="bg-white border border-gray-100 p-5 rounded-none shadow-sm">
          <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Debit Total</p>
          <h4 class="text-lg font-black text-blue-600 font-display mt-1">{{ formatCurrencyShort(totalDebitAmount) }}</h4>
        </div>
      </div>

      <!-- Tab Bar -->
      <div class="flex gap-0 border-b border-gray-200">
        <button @click="activeTab = 'credit'"
          :class="['px-6 py-3 text-[10px] font-mono font-black uppercase tracking-widest transition-all border-t-2',
            activeTab === 'credit'
              ? 'border-t-amber-500 bg-white text-amber-700 border-l border-r border-gray-200 -mb-px'
              : 'border-t-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50']">
          <i class="fas fa-minus-circle mr-1.5"></i> Credit Notes
        </button>
        <button @click="activeTab = 'debit'"
          :class="['px-6 py-3 text-[10px] font-mono font-black uppercase tracking-widest transition-all border-t-2',
            activeTab === 'debit'
              ? 'border-t-blue-500 bg-white text-blue-700 border-l border-r border-gray-200 -mb-px'
              : 'border-t-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50']">
          <i class="fas fa-plus-circle mr-1.5"></i> Debit Notes
        </button>
        <button @click="activeTab = 'create'"
          :class="['px-6 py-3 text-[10px] font-mono font-black uppercase tracking-widest transition-all border-t-2',
            activeTab === 'create'
              ? 'border-t-purple-500 bg-white text-purple-700 border-l border-r border-gray-200 -mb-px'
              : 'border-t-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50']">
          <i class="fas fa-plus mr-1.5"></i> New Note
        </button>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-20">
        <div class="h-12 w-12 border-4 border-gray-100 border-t-[#2F2E8B] rounded-full animate-spin shadow-lg mb-4"></div>
        <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest animate-pulse">Loading Notes...</p>
      </div>

      <!-- ==================== CREDIT NOTES TAB ==================== -->
      <div v-else-if="activeTab === 'credit'" class="space-y-4">
        <div v-if="creditNotes.length === 0" class="bg-white border border-dashed border-gray-200 p-12 rounded-none shadow-sm text-center">
          <i class="fas fa-minus-circle text-4xl text-gray-300 mb-3"></i>
          <p class="text-sm font-bold text-gray-700">No credit notes found.</p>
          <p class="text-xs text-gray-500 mt-1">Switch to the "New Note" tab to create one.</p>
        </div>
        <div v-else class="bg-white border border-gray-100 rounded-none shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full text-sm">
              <thead class="bg-gray-50">
                <tr class="text-left text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                  <th class="px-4 py-3">Note #</th>
                  <th class="px-4 py-3">Date</th>
                  <th class="px-4 py-3">Linked Invoice</th>
                  <th class="px-4 py-3">Client</th>
                  <th class="px-4 py-3">Reason</th>
                  <th class="px-4 py-3 text-right">Amount</th>
                  <th class="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="note in creditNotes" :key="note.id || note._id" class="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                  <td class="px-4 py-3">
                    <span class="font-mono font-bold text-amber-600 text-xs">#{{ note.note_number || note.id?.slice(-6) || '—' }}</span>
                  </td>
                  <td class="px-4 py-3 text-xs text-gray-600 font-mono">{{ formatDate(note.date || note.created_at) }}</td>
                  <td class="px-4 py-3">
                    <a v-if="note.referenced_doc_id" @click.stop="openReferencedDoc(note)" class="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#2F2E8B] hover:underline cursor-pointer">
                      <i class="fas fa-file-invoice text-[10px]"></i>
                      #{{ note.referenced_doc_number || note.referencedDocNumber || note.referenced_doc_id?.slice(-6) }}
                    </a>
                    <span v-else class="text-xs text-gray-400 font-mono">—</span>
                  </td>
                  <td class="px-4 py-3 text-xs font-bold text-gray-900">{{ note.client || note.clientName || 'Unknown' }}</td>
                  <td class="px-4 py-3 text-xs text-gray-500 max-w-[160px] truncate">{{ note.reason || note.description || '—' }}</td>
                  <td class="px-4 py-3 text-right font-mono font-black text-sm text-amber-600">{{ formatCurrencyShort(note.amount || note.total || 0) }}</td>
                  <td class="px-4 py-3 text-right">
                    <button @click="voidNote(note)" class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Void Note">
                      <i class="fas fa-ban text-xs"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ==================== DEBIT NOTES TAB ==================== -->
      <div v-else-if="activeTab === 'debit'" class="space-y-4">
        <div v-if="debitNotes.length === 0" class="bg-white border border-dashed border-gray-200 p-12 rounded-none shadow-sm text-center">
          <i class="fas fa-plus-circle text-4xl text-gray-300 mb-3"></i>
          <p class="text-sm font-bold text-gray-700">No debit notes found.</p>
          <p class="text-xs text-gray-500 mt-1">Switch to the "New Note" tab to create one.</p>
        </div>
        <div v-else class="bg-white border border-gray-100 rounded-none shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full text-sm">
              <thead class="bg-gray-50">
                <tr class="text-left text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                  <th class="px-4 py-3">Note #</th>
                  <th class="px-4 py-3">Date</th>
                  <th class="px-4 py-3">Linked Invoice</th>
                  <th class="px-4 py-3">Client</th>
                  <th class="px-4 py-3">Reason</th>
                  <th class="px-4 py-3 text-right">Amount</th>
                  <th class="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="note in debitNotes" :key="note.id || note._id" class="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                  <td class="px-4 py-3">
                    <span class="font-mono font-bold text-blue-600 text-xs">#{{ note.note_number || note.id?.slice(-6) || '—' }}</span>
                  </td>
                  <td class="px-4 py-3 text-xs text-gray-600 font-mono">{{ formatDate(note.date || note.created_at) }}</td>
                  <td class="px-4 py-3">
                    <a v-if="note.referenced_doc_id" @click.stop="openReferencedDoc(note)" class="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#2F2E8B] hover:underline cursor-pointer">
                      <i class="fas fa-file-invoice text-[10px]"></i>
                      #{{ note.referenced_doc_number || note.referencedDocNumber || note.referenced_doc_id?.slice(-6) }}
                    </a>
                    <span v-else class="text-xs text-gray-400 font-mono">—</span>
                  </td>
                  <td class="px-4 py-3 text-xs font-bold text-gray-900">{{ note.client || note.clientName || 'Unknown' }}</td>
                  <td class="px-4 py-3 text-xs text-gray-500 max-w-[160px] truncate">{{ note.reason || note.description || '—' }}</td>
                  <td class="px-4 py-3 text-right font-mono font-black text-sm text-blue-600">{{ formatCurrencyShort(note.amount || note.total || 0) }}</td>
                  <td class="px-4 py-3 text-right">
                    <button @click="voidNote(note)" class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Void Note">
                      <i class="fas fa-ban text-xs"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ==================== CREATE NOTE TAB ==================== -->
      <div v-else-if="activeTab === 'create'" class="bg-white border border-gray-100 p-6 rounded-none shadow-sm">
        <div class="max-w-2xl mx-auto space-y-6">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-1.5 h-5 bg-purple-500 rounded-none"></div>
            <span class="text-[11px] font-mono font-black text-gray-400 uppercase tracking-widest">Create a New Note</span>
          </div>

          <!-- Pre-filled from dashboard action -->
          <div v-if="prefillDocId" class="bg-purple-50 border border-purple-200 p-4 rounded-none text-[10px] font-mono">
            <p class="font-bold text-purple-800">
              <i class="fas fa-info-circle mr-1"></i>
              Creating {{ noteForm.type === 'credit' ? 'Credit' : 'Debit' }} Note for
              <span class="uppercase">{{ prefillDocType }}</span> #{{ prefillDocNumber || prefillDocId?.slice(-6) }}
            </p>
          </div>

          <form @submit.prevent="submitNote" class="space-y-5">
            <!-- Note Type -->
            <div>
              <label class="block text-[10px] font-mono font-bold text-gray-700 uppercase tracking-wider mb-2">Note Type</label>
              <div class="flex gap-3">
                <button type="button" @click="noteForm.type = 'credit'"
                  :class="['px-5 py-2.5 text-[10px] font-mono font-bold uppercase tracking-wider border transition-all',
                    noteForm.type === 'credit'
                      ? 'bg-amber-50 border-amber-400 text-amber-700'
                      : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300']">
                  <i class="fas fa-minus-circle mr-1"></i> Credit Note (Reduce)
                </button>
                <button type="button" @click="noteForm.type = 'debit'"
                  :class="['px-5 py-2.5 text-[10px] font-mono font-bold uppercase tracking-wider border transition-all',
                    noteForm.type === 'debit'
                      ? 'bg-blue-50 border-blue-400 text-blue-700'
                      : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300']">
                  <i class="fas fa-plus-circle mr-1"></i> Debit Note (Increase)
                </button>
              </div>
            </div>

            <!-- Amount -->
            <div>
              <label class="block text-[10px] font-mono font-bold text-gray-700 uppercase tracking-wider mb-2">Amount (ZMW)</label>
              <input v-model="noteForm.amount" type="number" step="0.01" min="0" required
                class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]"
                placeholder="0.00">
            </div>

            <!-- Reason -->
            <div>
              <label class="block text-[10px] font-mono font-bold text-gray-700 uppercase tracking-wider mb-2">Reason / Description</label>
              <textarea v-model="noteForm.reason" rows="3"
                class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]"
                placeholder="e.g. Return of damaged goods / Price correction"></textarea>
            </div>

            <!-- Submit -->
            <div class="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
              <button type="button" @click="activeTab = 'credit'"
                class="px-4 py-2 text-[10px] font-mono font-bold uppercase text-gray-700 border border-gray-200 hover:border-[#2F2E8B] hover:text-[#2F2E8B] transition-colors">Cancel</button>
              <button type="submit" :disabled="saving"
                class="bg-purple-600 hover:opacity-90 disabled:opacity-50 text-white px-4 py-2 rounded-none text-[10px] font-bold font-mono uppercase shadow-md inline-flex items-center gap-2">
                <i class="fas" :class="saving ? 'fa-spinner fa-spin' : 'fa-save'"></i>
                {{ saving ? 'Saving...' : 'Create Note' }}
              </button>
            </div>
          </form>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { decodeJWT } from '@/api_services/decodeJWT.js';
import API_BASE_URL from '@/api_services/api';
import { useCurrency } from '@/composables/useCurrency.js';

const route = useRoute();
const router = useRouter();
const { getTenantId, getToken, getBranchId } = decodeJWT();
const { formatCurrency, currencySymbol } = useCurrency();

// State
const loading = ref(false);
const saving = ref(false);
const activeTab = ref('credit');
const creditNotes = ref([]);
const debitNotes = ref([]);

// Prefill from query params (routed from dashboard dropdown)
const prefillDocId = ref('');
const prefillDocType = ref('');
const prefillDocNumber = ref('');

// Create form
const noteForm = ref({
  type: 'credit',
  amount: '',
  reason: ''
});

// Computed
const totalCreditAmount = computed(() =>
  creditNotes.value.reduce((s, n) => s + (Number(n.amount) || Number(n.total) || 0), 0)
);
const totalDebitAmount = computed(() =>
  debitNotes.value.reduce((s, n) => s + (Number(n.amount) || Number(n.total) || 0), 0)
);

// Helpers
const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleDateString('en-ZM', {
    year: 'numeric', month: 'short', day: 'numeric'
  });
};

const formatCurrencyShort = (amount) => {
  const n = Number(amount) || 0;
  try {
    if (formatCurrency && typeof formatCurrency === 'function') return formatCurrency(n);
  } catch (e) { /* fallback */ }
  const sym = currencySymbol?.value || currencySymbol || 'K';
  return `${sym}${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// Load notes from backend
const loadNotes = async () => {
  loading.value = true;
  const tenantId = getTenantId();
  const branchId = getBranchId();

  try {
    const params = new URLSearchParams({ tenant_id: tenantId });
    if (branchId) params.append('branch_id', branchId);

    const res = await fetch(`${API_BASE_URL}/invoices/credit-debit-notes?${params}`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });

    if (res.ok) {
      const data = await res.json();
      console.log('📥 loadNotes response:', data);
      creditNotes.value = data.credit_notes || [];
      debitNotes.value = data.debit_notes || [];
      console.log(`📥 credit: ${creditNotes.value.length}, debit: ${debitNotes.value.length}`);
    } else {
      const errText = await res.text().catch(() => 'Unknown error');
      console.error('Failed to load credit/debit notes:', res.status, errText);
      creditNotes.value = [];
      debitNotes.value = [];
      debitNotes.value = [];
    }
  } catch (err) {
    console.error('Error loading notes:', err);
    creditNotes.value = [];
    debitNotes.value = [];
  } finally {
    loading.value = false;
  }
};

// Submit new note
const submitNote = async () => {
  console.log('🔄 submitNote called', JSON.stringify({
    type: noteForm.value.type,
    amount: noteForm.value.amount,
    reason: noteForm.value.reason,
    prefillDocId: prefillDocId.value,
  }));
  saving.value = true;
  const tenantId = getTenantId();

  try {
    const branchId = getBranchId();

    const payload = {
      tenant_id: tenantId,
      branch_id: branchId || undefined,
      type: noteForm.value.type,
      amount: Number(noteForm.value.amount),
      reason: noteForm.value.reason,
      referenced_doc_id: prefillDocId.value || undefined,
      referenced_doc_type: prefillDocType.value || undefined,
      referenced_doc_number: prefillDocNumber.value || undefined,
    };

    console.log('📤 Sending POST to', `${API_BASE_URL}/invoices/credit-debit-notes`);
    const res = await fetch(`${API_BASE_URL}/invoices/credit-debit-notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(payload)
    });
    console.log('📥 POST response status:', res.status, res.statusText);

    if (res.ok) {
      // Get the created note from the response
      const responseText = await res.text();
      console.log('📥 POST raw body:', responseText);

      let createdNote;
      try {
        createdNote = JSON.parse(responseText);
      } catch (e) {
        console.error('❌ Failed to parse POST response:', e);
        alert('Server returned invalid JSON');
        saving.value = false;
        return;
      }

      console.log('✅ Note created:', createdNote);

      // Save the created note type BEFORE resetting form
      const createdType = createdNote.type || noteForm.value.type;

      // Add the new note directly to the local list so it shows immediately
      if (createdType === 'credit') {
        creditNotes.value.unshift(createdNote);
        console.log('📌 Added to creditNotes, length now:', creditNotes.value.length);
      } else {
        debitNotes.value.unshift(createdNote);
        console.log('📌 Added to debitNotes, length now:', debitNotes.value.length);
      }

      // Reset form
      noteForm.value = { type: 'credit', amount: '', reason: '' };
      prefillDocId.value = '';
      prefillDocType.value = '';
      prefillDocNumber.value = '';

      // Switch to the correct tab
      console.log('📌 Switching tab to:', createdType);
      activeTab.value = createdType;

      // Force Vue to update by triggering reactivity
      await nextTick();

      // Refresh from backend in background
      loadNotes();
    } else {
      let errMsg = 'Failed to create note';
      try {
        const errData = await res.json();
        const detail = errData.detail;
        if (Array.isArray(detail)) {
          errMsg = detail.map(d => d.msg || d.message || JSON.stringify(d)).join('; ');
        } else if (typeof detail === 'string') {
          errMsg = detail;
        }
      } catch (_) {
        errMsg = `HTTP ${res.status} — ${res.statusText}`;
      }
      console.error('❌ POST failed:', errMsg);
      alert(errMsg);
    }
  } catch (err) {
    console.error('❌ Network/JS error creating note:', err);
    alert('Failed to create note — backend endpoint may not be implemented yet.');
  } finally {
    saving.value = false;
  }
};

// Void a note
const voidNote = async (note) => {
  if (!confirm('Void this note? This will mark it as cancelled.')) return;
  const tenantId = getTenantId();
  const noteId = note.id || note._id;

  try {
    const res = await fetch(`${API_BASE_URL}/invoices/credit-debit-notes/${noteId}?tenant_id=${tenantId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    if (res.ok) {
      await loadNotes();
    } else {
      alert('Failed to void note');
    }
  } catch (err) {
    console.error('Error voiding note:', err);
    alert('Failed to void note');
  }
};

// Open linked invoice in the invoices page
const openReferencedDoc = (note) => {
  const docId = note.referenced_doc_id || note.referencedDocId;
  const docType = note.referenced_doc_type || note.referencedDocType || 'invoice';
  if (docId) {
    const routeMap = {
      'invoice': '/dashboard/invoicing/invoices',
      'quotation': '/dashboard/invoicing/quotations',
      'proposal': '/dashboard/invoicing/proposals',
      'contract': '/dashboard/invoicing/contracts',
      'receipt': '/dashboard/invoicing/receipts'
    };
    const path = routeMap[docType?.toLowerCase()] || '/dashboard/invoicing/invoices';
    router.push({ path, query: { action: 'view', docId, docType } });
  }
};

// Initialize from query params (routed from dashboard modal)
onMounted(async () => {
  // Check if we were routed here with an action
  if (route.query.action === 'create-credit') {
    activeTab.value = 'create';
    noteForm.value.type = 'credit';
    prefillDocId.value = route.query.docId || '';
    prefillDocType.value = route.query.docType || 'invoice';
    prefillDocNumber.value = route.query.docNumber || '';
  } else if (route.query.action === 'create-debit') {
    activeTab.value = 'create';
    noteForm.value.type = 'debit';
    prefillDocId.value = route.query.docId || '';
    prefillDocType.value = route.query.docType || 'invoice';
    prefillDocNumber.value = route.query.docNumber || '';
  }

  await loadNotes();
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
