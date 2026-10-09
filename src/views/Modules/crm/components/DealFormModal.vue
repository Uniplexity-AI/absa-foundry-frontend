<template>
  <Teleport to="body">
    <div v-if="modelValue"
      class="fixed inset-0 bg-black/60 backdrop-blur-md flex items-start justify-center z-[9999] p-4 pt-10 overflow-y-auto"
      @click.self="close">
      <div class="bg-white rounded-sm shadow-2xl max-w-5xl w-full border border-gray-200 relative overflow-hidden animate-modal-in flex flex-col my-auto md:my-10">
        
        <!-- Header -->
        <div class="relative z-10 sticky top-0 bg-white border-b border-gray-200 p-4 rounded-t-sm">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-1 h-6 bg-[#2F2E8B]"></div>
              <div>
                <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">CRM // Deals // Form</span>
                <h2 class="text-sm font-black text-gray-900 uppercase tracking-tight font-mono flex items-center gap-2">
                  <Handshake :size="14" class="text-[#2F2E8B]" />
                  {{ isEditMode ? 'Edit_Deal' : 'New_Deal' }}
                </h2>
              </div>
            </div>
            <button @click="close" class="p-1.5 border border-gray-200 rounded-sm hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition">
              <X :size="16" />
            </button>
          </div>
        </div>

        <!-- Form Body -->
        <div class="relative z-10 flex-1 overflow-y-auto p-4 max-h-[75vh]">
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <!-- Basic Information -->
            <section class="bg-white rounded-sm border border-gray-200 relative overflow-hidden">
                            <div class="relative z-10 border-b border-gray-100 px-4 py-3 flex items-center gap-2">
                <div class="w-1 h-4 bg-[#2F2E8B]"></div>
                <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Info :size="10" class="text-[#2F2E8B]" /> Basic_Information
                </span>
              </div>
              <div class="relative z-10 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="md:col-span-3 space-y-1.5">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Deal_Name *</label>
                  <input v-model="form.name" required type="text" class="input-base" placeholder="e.g. Enterprise Software License" />
                </div>
                <div class="space-y-1.5">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Amount *</label>
                  <input v-model.number="form.amount" required type="number" min="0" step="0.01" class="input-base" placeholder="0.00" />
                </div>
                <div class="space-y-1.5">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Stage *</label>
                  <select v-model="form.stage" required class="input-base">
                    <option value="">Select Stage</option>
                    <option value="negotiation">Negotiation</option>
                    <option value="closed-won">Closed Won</option>
                    <option value="closed-lost">Closed Lost</option>
                  </select>
                </div>
                <div class="space-y-1.5">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Probability (%) *</label>
                  <input v-model.number="form.probability" required type="number" min="0" max="100" class="input-base" placeholder="50" />
                </div>
                <div class="space-y-1.5">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Expected_Close_Date</label>
                  <input v-model="form.expectedCloseDate" type="date" class="input-base" />
                </div>
              </div>
            </section>

            <!-- Associated Records -->
            <section class="bg-white rounded-sm border border-gray-200 relative overflow-hidden">
                            <div class="relative z-10 border-b border-gray-100 px-4 py-3 flex items-center gap-2">
                <div class="w-1 h-4 bg-[#2F2E8B]"></div>
                <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Link :size="10" class="text-[#2F2E8B]" /> Associated_Records
                </span>
              </div>
              <div class="relative z-10 p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-1.5">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Account</label>
                  <select v-model="form.accountId" @change="onAccountChange" class="input-base">
                    <option value="">Select Account</option>
                    <option v-for="account in accounts" :key="account.id || account._id" :value="account.id || account._id">
                      {{ account.name }}
                    </option>
                  </select>
                </div>
                <div class="space-y-1.5">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Contact</label>
                  <select v-model="form.contactId" class="input-base">
                    <option value="">Select Contact</option>
                    <option v-for="contact in filteredContacts" :key="contact.id || contact._id" :value="contact.id || contact._id">
                      {{ contact.firstName }} {{ contact.lastName }}
                    </option>
                  </select>
                </div>
              </div>
            </section>

            <!-- Assignment Section -->
            <section class="bg-white rounded-sm border border-gray-200 relative overflow-hidden">
                            <div class="relative z-10 border-b border-gray-100 px-4 py-3 flex items-center gap-2">
                <div class="w-1 h-4 bg-[#2F2E8B]"></div>
                <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <UserCheck :size="10" class="text-[#2F2E8B]" /> Assignment
                </span>
              </div>
              <div v-if="canAssignCrm" class="relative z-10 p-4">
                <UserSearchSelect v-model="form.assignedTo" :users="users" label="" />
              </div>
              <div v-else class="relative z-10 p-4 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">
                Assignment is locked to your scope.
              </div>
            </section>

            <!-- Description & Next Steps -->
            <section class="bg-white rounded-sm border border-gray-200 relative overflow-hidden">
                            <div class="relative z-10 border-b border-gray-100 px-4 py-3 flex items-center gap-2">
                <div class="w-1 h-4 bg-[#2F2E8B]"></div>
                <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <AlignLeft :size="10" class="text-[#2F2E8B]" /> Details_&amp;_Next_Steps
                </span>
              </div>
              <div class="relative z-10 p-4 space-y-4">
                <div class="space-y-1.5">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Description</label>
                  <textarea v-model="form.description" rows="3" class="input-base" placeholder="Describe the deal opportunity..."></textarea>
                </div>
                <div class="space-y-1.5">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Next_Steps</label>
                  <textarea v-model="form.nextStep" rows="2" class="input-base" placeholder="What are the next actions?"></textarea>
                </div>
              </div>
            </section>

            <!-- Weighted Value Display -->
            <section class="bg-gray-50 rounded-sm border border-gray-200 relative overflow-hidden">
                            <div class="relative z-10 p-4">
                <div class="flex items-center gap-2 mb-2">
                  <Calculator :size="14" class="text-gray-400" />
                  <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Weighted_Value</span>
                </div>
                <div class="text-2xl font-black tracking-tight text-gray-900">{{ formatCurrency((form.amount || 0) * (form.probability || 0) / 100) }}
                </div>
                <div class="text-[10px] text-gray-500 font-mono mt-1">
                  {{ formatCurrency(form.amount || 0) }} × {{ form.probability || 0 }}%
                </div>
              </div>
            </section>

            <!-- Documents -->
            <section v-if="form.id" class="bg-white rounded-sm border border-gray-200 relative overflow-hidden">
                            <div class="relative z-10 border-b border-gray-100 px-4 py-3 flex items-center gap-2">
                <div class="w-1 h-4 bg-[#2F2E8B]"></div>
                <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <FileText :size="10" class="text-[#2F2E8B]" /> Documents
                </span>
              </div>
              <div class="relative z-10 p-4">
                <LinkedDocumentsWidget recordType="deal" :recordId="form.id" :recordName="form.name" />
              </div>
            </section>
          </form>
        </div>

        <!-- Footer Actions -->
        <div class="relative z-10 border-t border-gray-200 p-4 bg-white sticky bottom-0">
          <div class="flex flex-col sm:flex-row justify-end gap-2">
            <button
              type="button"
              @click="close"
              class="px-5 py-2 border border-gray-200 text-gray-600 rounded-sm hover:bg-gray-50 transition text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-2"
            >
              <X :size="12" /> Cancel
            </button>
            <button
              type="button"
              @click="handleSubmit"
              :disabled="saving"
              class="px-5 py-2 bg-[#2F2E8B] text-white rounded-sm hover:bg-[#3D2F88] transition text-[10px] font-mono font-bold uppercase tracking-wider disabled:opacity-60 flex items-center justify-center gap-2 min-w-[140px]"
            >
              <Loader2 v-if="saving" :size="12" class="animate-spin" />
              <Save v-else :size="12" />
              {{ saving ? 'Saving…' : (isEditMode ? 'Update_Deal' : 'Create_Deal') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import * as crmApi from '@/services/crm_api.js';
import { decodeJWT } from '@/services/decodeJWT.js';
import { useCurrency } from '@/composables/useCurrency';
import { useRBAC } from '@/composables/useRBAC';
import LinkedDocumentsWidget from './LinkedDocumentsWidget.vue';
import UserSearchSelect from './UserSearchSelect.vue';
import { 
  X, Save, Loader2, Handshake, Info, Link, 
  UserCheck, AlignLeft, Calculator, FileText 
} from 'lucide-vue-next';

const props = defineProps({
  modelValue: Boolean,
  deal: Object,
  users: Array
});

const emit = defineEmits(['update:modelValue', 'saved']);

const { getTenantId, getUserEmail } = decodeJWT();
const { formatCurrency } = useCurrency();
const { canAssign, initializeRBAC } = useRBAC();
const currentUserEmail = getUserEmail();
const canAssignCrm = computed(() => canAssign('crm'));

const saving = ref(false);
const accounts = ref([]);
const contacts = ref([]);

const form = ref({
  name: '',
  amount: null,
  stage: '',
  probability: 50,
  expectedCloseDate: '',
  accountId: '',
  contactId: '',
  description: '',
  nextStep: '',
  assignedTo: currentUserEmail
});

const isEditMode = computed(() => !!props.deal?.id);

const filteredContacts = computed(() => {
  if (!form.value.accountId) {
    return contacts.value;
  }
  return contacts.value.filter(c => {
    const contactAccountId = c.accountId || c.account_id;
    return contactAccountId === form.value.accountId;
  });
});

watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    initializeRBAC().catch(() => {});
    if (props.deal) {
      form.value = {
        id: props.deal.id,
        name: props.deal.name || '',
        amount: props.deal.value || props.deal.amount || null,
        stage: props.deal.stage || '',
        probability: props.deal.probability || 50,
        expectedCloseDate: props.deal.expectedCloseDate || '',
        accountId: props.deal.accountId || '',
        contactId: props.deal.contactId || '',
        description: props.deal.description || '',
        nextStep: props.deal.nextStep || '',
        assignedTo: props.deal.assignedTo || props.deal.owner || currentUserEmail
      };
    } else {
      resetForm();
    }
    loadAccounts();
    loadContacts();
  }
});

function resetForm() {
  form.value = {
    name: '',
    amount: null,
    stage: '',
    probability: 50,
    expectedCloseDate: '',
    accountId: '',
    contactId: '',
    description: '',
    nextStep: '',
    assignedTo: currentUserEmail
  };
}

async function loadAccounts() {
  try {
    const tenantId = String(getTenantId() || '');
    if (!tenantId) throw new Error('Missing tenant ID');
    const response = await crmApi.getAccounts(tenantId, { per_page: 1000 });
    accounts.value = response.items || response || [];
  } catch (error) {
    console.error('Failed to load accounts:', error);
    accounts.value = [];
  }
}

async function loadContacts() {
  try {
    const tenantId = String(getTenantId() || '');
    if (!tenantId) throw new Error('Missing tenant ID');
    const response = await crmApi.getContacts(tenantId, { per_page: 1000 });
    contacts.value = response.items || response || [];
  } catch (error) {
    console.error('Failed to load contacts:', error);
    contacts.value = [];
  }
}

function onAccountChange() {
  if (form.value.contactId) {
    const contact = contacts.value.find(c => (c.id || c._id) === form.value.contactId);
    if (contact) {
      const contactAccountId = contact.accountId || contact.account_id;
      if (contactAccountId !== form.value.accountId) {
        form.value.contactId = '';
      }
    }
  }
}

async function handleSubmit() {
  if (!form.value.name || !form.value.amount || !form.value.stage) {
    alert('Please fill in all required fields');
    return;
  }

  if (form.value.probability < 0 || form.value.probability > 100) {
    alert('Probability must be between 0 and 100');
    return;
  }

  saving.value = true;
  try {
    const tenantId = String(getTenantId() || '');
    if (!tenantId) throw new Error('Missing tenant ID');
    const payload = {
      name: form.value.name,
      value: form.value.amount,
      stage: form.value.stage,
      probability: form.value.probability,
      expectedCloseDate: form.value.expectedCloseDate,
      accountId: form.value.accountId,
      contactId: form.value.contactId,
      description: form.value.description,
      nextStep: form.value.nextStep,
      assignedTo: canAssignCrm.value
        ? form.value.assignedTo
        : (isEditMode.value ? (props.deal?.assignedTo || props.deal?.owner || currentUserEmail) : currentUserEmail),
      tenant_id: tenantId
    };
    if (isEditMode.value) {
      await crmApi.updateDeal(props.deal.id, payload);
    } else {
      await crmApi.createDeal(payload);
    }

    emit('saved');
    emit('update:modelValue', false);
  } catch (error) {
    console.error('Failed to save deal:', error);
    alert('Failed to save deal. Please try again.');
  } finally {
    saving.value = false;
  }
}


function close() {
  if (!saving.value) {
    emit('update:modelValue', false);
  }
}

onMounted(() => {
  if (props.modelValue) {
    loadAccounts();
    loadContacts();
  }
});
</script>

<style scoped>
.input-base {
  @apply w-full rounded-sm border border-gray-200 bg-white text-xs font-mono text-gray-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2F2E8B]/30 focus:border-[#2F2E8B] transition placeholder-gray-300;
}

.dotted-pattern {
  background-image: radial-gradient(#2F2E8B 1.5px, transparent 1.5px);
  background-size: 20px 20px;
  opacity: 0.04;
}

@keyframes modal-in {
  from { opacity: 0; transform: scale(0.97) translateY(-8px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
.animate-modal-in {
  animation: modal-in 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #f1f1f1; }
::-webkit-scrollbar-thumb { background: #2F2E8B; border-radius: 0; }
::-webkit-scrollbar-thumb:hover { background: #3D2F88; }
</style>
