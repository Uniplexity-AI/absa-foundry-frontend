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
              <i class="fas fa-university text-[#2F2E8B]"></i>
              <span>Billing // Bank Accounts</span>
            </div>
            <h1 class="text-xl font-black text-gray-900 uppercase tracking-tight font-display">Bank Accounts</h1>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button @click="loadAccounts" :disabled="loading"
            class="hidden md:flex items-center gap-2 text-[10px] font-mono font-bold text-[#2F2E8B] hover:opacity-80 uppercase tracking-wider transition-all disabled:opacity-50 border border-[#2F2E8B]/20 px-3 py-1.5 hover:bg-[#2F2E8B]/5">
            <i class="fas fa-sync-alt" :class="{ 'animate-spin': loading }"></i> Refresh
          </button>
          <button @click="openCreateModal"
            class="bg-[#2F2E8B] hover:opacity-90 text-white px-4 py-2 rounded-none text-[10px] font-bold font-mono uppercase shadow-md transition-all flex items-center gap-2">
            <i class="fas fa-plus"></i> New Bank Account
          </button>
        </div>
      </div>
    </header>

    <main class="flex-1 max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-12 relative z-10 space-y-6">

      <!-- Intro / explanation -->
      <div class="bg-white border border-gray-100 p-5 rounded-none shadow-sm">
        <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">About</p>
        <p class="text-sm text-gray-700">
          Manage the bank and mobile-money accounts your business uses to receive payments. The accounts saved here will be
          available as a dropdown on Invoices and Quotations so you can fill the payment details with a single click.
        </p>
      </div>

      <!-- Summary -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div class="bg-white border border-gray-100 p-5 rounded-none shadow-sm">
          <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Total Accounts</p>
          <h4 class="text-2xl font-black text-[#2F2E8B] font-display mt-1">{{ accounts.length }}</h4>
        </div>
        <div class="bg-white border border-gray-100 p-5 rounded-none shadow-sm">
          <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Default Account</p>
          <h4 class="text-sm font-black text-[#2F2E8B] font-display mt-1 truncate">
            {{ defaultAccount ? (defaultAccount.label || defaultAccount.bank_name || defaultAccount.account_number) : '—' }}
          </h4>
        </div>
        <div class="bg-white border border-gray-100 p-5 rounded-none shadow-sm">
          <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Currencies</p>
          <h4 class="text-sm font-black text-gray-900 font-display mt-1">{{ uniqueCurrencies.join(', ') || '—' }}</h4>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-20">
        <div class="h-12 w-12 border-4 border-gray-100 border-t-[#2F2E8B] rounded-full animate-spin shadow-lg mb-4"></div>
        <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest animate-pulse">Loading accounts...</p>
      </div>

      <!-- Empty -->
      <div v-else-if="accounts.length === 0" class="bg-white border border-dashed border-gray-200 p-12 rounded-none shadow-sm text-center">
        <i class="fas fa-university text-4xl text-gray-300 mb-3"></i>
        <p class="text-sm font-bold text-gray-700">No bank accounts yet.</p>
        <p class="text-xs text-gray-500 mt-1">Add your first account to use it on invoices and quotations.</p>
        <button @click="openCreateModal"
          class="mt-4 bg-[#2F2E8B] hover:opacity-90 text-white px-4 py-2 rounded-none text-[10px] font-bold font-mono uppercase shadow-md inline-flex items-center gap-2">
          <i class="fas fa-plus"></i> Add Bank Account
        </button>
      </div>

      <!-- Table -->
      <div v-else class="bg-white border border-gray-100 rounded-none shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full text-sm">
            <thead class="bg-gray-50">
              <tr class="text-left text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                <th class="px-4 py-3">Label / Bank</th>
                <th class="px-4 py-3">Account Name</th>
                <th class="px-4 py-3">Account #</th>
                <th class="px-4 py-3">Mobile Money</th>
                <th class="px-4 py-3">Currency</th>
                <th class="px-4 py-3">Default</th>
                <th class="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="acc in accounts" :key="acc.id" class="border-t border-gray-100 hover:bg-gray-50">
                <td class="px-4 py-3">
                  <div class="font-bold text-gray-900">{{ acc.label || acc.bank_name || '(Unnamed)' }}</div>
                  <div v-if="acc.label && acc.bank_name" class="text-xs text-gray-500">{{ acc.bank_name }}</div>
                  <div v-if="acc.branch" class="text-[10px] text-gray-400 font-mono">{{ acc.branch }}</div>
                </td>
                <td class="px-4 py-3 text-gray-700">{{ acc.account_name || '—' }}</td>
                <td class="px-4 py-3 font-mono text-gray-700">{{ acc.account_number || '—' }}</td>
                <td class="px-4 py-3 font-mono text-gray-700">
                  <div v-if="acc.momo_number">{{ acc.momo_number }}</div>
                  <div v-if="acc.momo_provider" class="text-[10px] text-gray-400">{{ acc.momo_provider }}</div>
                  <div v-if="!acc.momo_number">—</div>
                </td>
                <td class="px-4 py-3 font-mono text-gray-700">{{ acc.currency || '—' }}</td>
                <td class="px-4 py-3">
                  <span v-if="acc.is_default" class="inline-flex items-center gap-1 bg-[#2F2E8B]/10 text-[#2F2E8B] px-2 py-0.5 text-[10px] font-mono font-bold uppercase">
                    <i class="fas fa-star"></i> Default
                  </span>
                  <button v-else @click="markDefault(acc)"
                    class="text-[10px] font-mono font-bold text-gray-400 hover:text-[#2F2E8B] uppercase border border-gray-200 hover:border-[#2F2E8B] px-2 py-1 transition-colors">Set Default</button>
                </td>
                <td class="px-4 py-3 text-right">
                  <div class="flex items-center justify-end gap-1">
                    <button v-if="!acc.is_default" @click="markDefault(acc)" class="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-colors" title="Set as default">
                      <i class="fas fa-star text-xs"></i>
                    </button>
                    <button @click="openEditModal(acc)" class="p-1.5 text-gray-400 hover:text-[#2F2E8B] hover:bg-[#2F2E8B]/5 transition-colors" title="Edit">
                      <i class="fas fa-edit text-xs"></i>
                    </button>
                    <button @click="confirmDelete(acc)" class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Delete">
                      <i class="fas fa-trash text-xs"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <!-- Create / Edit Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-4" @click.self="closeModal">
        <div class="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-none shadow-2xl">
          <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white">
            <h3 class="text-base font-black text-gray-900 uppercase tracking-tight font-display">
              {{ editingId ? 'Edit Bank Account' : 'New Bank Account' }}
            </h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <form @submit.prevent="saveAccount" class="px-6 py-5 space-y-5">
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-tag text-brand"></i> Basic
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="sm:col-span-2">
                  <label class="block text-xs font-bold text-gray-700 mb-1">Label <span class="text-gray-400 font-normal">(shown in dropdown)</span></label>
                  <input v-model="form.label" type="text" placeholder="e.g. ABC Bank — USD Operating"
                    class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Currency</label>
                  <input v-model="form.currency" type="text" placeholder="ZMW"
                    class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand uppercase">
                </div>
                <div class="flex items-center gap-2 pt-6">
                  <input id="is_default" v-model="form.is_default" type="checkbox" class="rounded-none text-brand focus:ring-brand">
                  <label for="is_default" class="text-xs font-bold text-gray-700">Set as default</label>
                </div>
              </div>
            </div>

            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-university text-brand"></i> Bank
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Bank Name</label>
                  <input v-model="form.bank_name" type="text"
                    class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Account Name</label>
                  <input v-model="form.account_name" type="text" placeholder="Account holder name"
                    class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Account Number</label>
                  <input v-model="form.account_number" type="text"
                    class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Branch</label>
                  <input v-model="form.branch" type="text"
                    class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Swift Code</label>
                  <input v-model="form.swift_code" type="text" placeholder="e.g. ZANAZMLX"
                    class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Bank Code</label>
                  <input v-model="form.bank_code" type="text"
                    class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Sort Code</label>
                  <input v-model="form.sort_code" type="text" placeholder="e.g. 12-34-56"
                    class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                </div>
                <div class="sm:col-span-2">
                  <label class="block text-xs font-bold text-gray-700 mb-1">IBAN</label>
                  <input v-model="form.iban" type="text"
                    class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                </div>
              </div>
            </div>

            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-mobile-alt text-brand"></i> Mobile Money (Optional)
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Mobile Money Number</label>
                  <input v-model="form.momo_number" type="text"
                    class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Provider</label>
                  <select v-model="form.momo_provider"
                    class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                    <option value="">—</option>
                    <option value="MTN">MTN</option>
                    <option value="Airtel">Airtel</option>
                    <option value="Zamtel">Zamtel</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1">Notes</label>
              <textarea v-model="form.notes" rows="2"
                class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand"></textarea>
            </div>

            <div class="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
              <button type="button" @click="closeModal"
                class="px-4 py-2 text-[10px] font-mono font-bold uppercase text-gray-700 border border-gray-200 hover:border-[#2F2E8B] hover:text-[#2F2E8B] transition-colors">Cancel</button>
              <button type="submit" :disabled="saving"
                class="bg-[#2F2E8B] hover:opacity-90 disabled:opacity-50 text-white px-4 py-2 rounded-none text-[10px] font-bold font-mono uppercase shadow-md inline-flex items-center gap-2">
                <i class="fas" :class="saving ? 'fa-spinner fa-spin' : 'fa-save'"></i>
                {{ editingId ? 'Save Changes' : 'Create Account' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { BackButton } from '@/components/ui'
import { ref, computed, onMounted } from 'vue';
import { decodeJWT } from '@/api_services/decodeJWT.js';
import {
  listBankAccounts,
  createBankAccount,
  updateBankAccount,
  deleteBankAccount,
  setDefaultBankAccount,
} from '@/api_services/bank_accounts_api.js';

const { getTenantId } = decodeJWT();

const loading = ref(false);
const saving = ref(false);
const accounts = ref([]);
const showModal = ref(false);
const editingId = ref(null);

const emptyForm = () => ({
  label: '',
  bank_name: '',
  account_name: '',
  account_number: '',
  branch: '',
  bank_code: '',
  sort_code: '',
  swift_code: '',
  iban: '',
  currency: 'ZMW',
  momo_number: '',
  momo_provider: '',
  notes: '',
  is_default: false,
});

const form = ref(emptyForm());

const defaultAccount = computed(() => accounts.value.find((a) => a.is_default) || null);
const uniqueCurrencies = computed(() => {
  const set = new Set();
  accounts.value.forEach((a) => { if (a.currency) set.add(String(a.currency).toUpperCase()); });
  return Array.from(set);
});

async function loadAccounts() {
  loading.value = true;
  try {
    const tenantId = getTenantId();
    const data = await listBankAccounts(tenantId);
    accounts.value = data.bank_accounts || [];
  } catch (err) {
    console.error('Failed to load bank accounts', err);
    alert('Failed to load bank accounts');
  } finally {
    loading.value = false;
  }
}

function openCreateModal() {
  editingId.value = null;
  form.value = emptyForm();
  showModal.value = true;
}

function openEditModal(acc) {
  editingId.value = acc.id;
  form.value = { ...emptyForm(), ...acc };
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  editingId.value = null;
  form.value = emptyForm();
}

async function saveAccount() {
  saving.value = true;
  try {
    const tenantId = getTenantId();
    const payload = { ...form.value };
    if (payload.currency) payload.currency = String(payload.currency).toUpperCase();
    if (editingId.value) {
      await updateBankAccount(tenantId, editingId.value, payload);
    } else {
      await createBankAccount(tenantId, payload);
    }
    closeModal();
    await loadAccounts();
  } catch (err) {
    console.error('Failed to save bank account', err);
    alert(err?.response?.data?.detail || 'Failed to save bank account');
  } finally {
    saving.value = false;
  }
}

async function markDefault(acc) {
  try {
    await setDefaultBankAccount(getTenantId(), acc.id);
    await loadAccounts();
  } catch (err) {
    console.error('Failed to set default', err);
    alert('Failed to set default');
  }
}

async function confirmDelete(acc) {
  if (!confirm(`Delete bank account "${acc.label || acc.bank_name || acc.account_number}"?`)) return;
  try {
    await deleteBankAccount(getTenantId(), acc.id);
    await loadAccounts();
  } catch (err) {
    console.error('Failed to delete', err);
    alert('Failed to delete bank account');
  }
}

onMounted(loadAccounts);
</script>
