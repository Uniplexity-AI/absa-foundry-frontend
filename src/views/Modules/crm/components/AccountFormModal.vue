<template>
  <Teleport to="body">
    <div v-if="modelValue" 
      class="fixed inset-0 bg-black/60 backdrop-blur-md flex items-start justify-center z-[9999] p-4 pt-10 overflow-y-auto" 
      @click.self="close">
      <div class="bg-white rounded-sm shadow-2xl max-w-5xl w-full border border-gray-200 relative overflow-hidden animate-modal-in flex flex-col my-auto md:my-10">
        <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>

        <!-- Header -->
        <div class="relative z-10 sticky top-0 bg-white border-b border-gray-200 p-4 rounded-t-sm">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-1 h-6 bg-[#2F2E8B]"></div>
              <div>
                <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">CRM // Accounts // Form</span>
                <h2 class="text-sm font-black text-gray-900 uppercase tracking-tight font-mono flex items-center gap-2">
                  <Building2 :size="14" class="text-[#2F2E8B]" />
                  {{ isEditMode ? 'Edit_Account' : 'New_Account' }}
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
            <!-- Company Information -->
            <section class="bg-white rounded-sm border border-gray-200 relative overflow-hidden">
              <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
              <div class="relative z-10 border-b border-gray-100 px-4 py-3 flex items-center gap-2">
                <div class="w-1 h-4 bg-[#2F2E8B]"></div>
                <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Info :size="10" class="text-[#2F2E8B]" /> Company_Information
                </span>
              </div>
              <div class="relative z-10 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="md:col-span-3 space-y-1.5">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Account_Name *</label>
                  <input v-model="form.name" required type="text" class="input-base" placeholder="Acme Corporation" />
                </div>
                
                <div class="space-y-1.5">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Website</label>
                  <input v-model="form.website" type="url" class="input-base" placeholder="https://example.com" />
                </div>

                <div class="space-y-1.5">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Industry</label>
                  <select v-model="form.industry" class="input-base">
                    <option value="">Select Industry</option>
                    <option value="technology">Technology</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="finance">Finance</option>
                    <option value="retail">Retail</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="education">Education</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div class="space-y-1.5">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Phone</label>
                  <input v-model="form.phone" type="tel" class="input-base" placeholder="+1 (555) 123-4567" />
                </div>

                <div class="space-y-1.5">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Email</label>
                  <input v-model="form.email" type="email" class="input-base" placeholder="contact@company.com" />
                </div>

                <div class="space-y-1.5">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Employees</label>
                  <input v-model.number="form.numberOfEmployees" type="number" min="1" class="input-base" placeholder="100" />
                </div>

                <div class="space-y-1.5">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Annual_Revenue</label>
                  <input v-model.number="form.annualRevenue" type="number" min="0" step="1000" class="input-base" placeholder="1000000" />
                </div>
              </div>
            </section>

            <!-- Assignment Section -->
            <section class="bg-white rounded-sm border border-gray-200 relative overflow-hidden">
              <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
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

            <!-- CRM Association Section -->
            <section class="bg-white rounded-sm border border-gray-200 relative" :class="showLeadDropdown ? 'z-30' : 'z-10'">
              <div class="absolute inset-0 dotted-pattern pointer-events-none rounded-sm overflow-hidden"></div>
              <div class="relative z-10 border-b border-gray-100 px-4 py-3 flex items-center gap-2">
                <div class="w-1 h-4 bg-[#2F2E8B]"></div>
                <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <LinkIcon :size="10" class="text-[#2F2E8B]" /> Associate_with_Leads
                </span>
              </div>
              <div class="relative z-10 p-4 space-y-4">
                <!-- Leads Association -->
                <div class="space-y-1.5">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Leads</label>
                  <p class="text-[9px] font-mono text-gray-400 leading-relaxed">
                    Linked leads become the contacts displayed under this account, regardless of pipeline stage.
                  </p>
                  <div class="relative">
                    <div class="relative">
                      <input v-model="leadSearchQuery" @input="searchLeads" @focus="openLeadDropdown" type="text" class="input-base pr-10" placeholder="Search leads by name or company..." />
                      <Search :size="14" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                    <!-- Dropdown Results -->
                    <div v-if="showLeadDropdown && filteredLeads.length > 0" class="absolute z-[9999] w-full mt-1 bg-white border border-gray-200 rounded-sm shadow-xl max-h-48 overflow-y-auto">
                      <div v-for="lead in filteredLeads" :key="lead.id" @click="addLead(lead)" class="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0">
                        <div class="text-[11px] font-bold text-gray-900 font-mono">{{ lead.name }}</div>
                        <div class="text-[9px] text-gray-500 font-mono">{{ lead.company }}</div>
                      </div>
                    </div>
                  </div>
                  <!-- Selected Leads -->
                  <div v-if="selectedLeads.length > 0" class="flex flex-wrap gap-1.5 mt-2">
                    <div v-for="lead in selectedLeads" :key="lead.id" class="inline-flex items-center gap-2 px-2 py-1 bg-[#2F2E8B]/5 border border-[#2F2E8B]/10 text-[#2F2E8B] rounded-sm text-[10px] font-mono">
                      <span>{{ lead.name }}</span>
                      <button type="button" @click="removeLead(lead.id)" class="hover:text-red-500"><X :size="10" /></button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Billing Address -->
            <section class="bg-white rounded-sm border border-gray-200 relative overflow-hidden">
              <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
              <div class="relative z-10 border-b border-gray-100 px-4 py-3 flex items-center gap-2">
                <div class="w-1 h-4 bg-[#2F2E8B]"></div>
                <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <MapPin :size="10" class="text-[#2F2E8B]" /> Billing_Address
                </span>
              </div>
              <div class="relative z-10 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="md:col-span-3 space-y-1.5">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Street</label>
                  <input v-model="form.billingStreet" type="text" class="input-base" placeholder="123 Main Street" />
                </div>
                <div class="space-y-1.5">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">City</label>
                  <input v-model="form.billingCity" type="text" class="input-base" placeholder="New York" />
                </div>
                <div class="space-y-1.5">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">State/Province</label>
                  <input v-model="form.billingState" type="text" class="input-base" placeholder="NY" />
                </div>
                <div class="space-y-1.5">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Postal_Code</label>
                  <input v-model="form.billingPostalCode" type="text" class="input-base" placeholder="10001" />
                </div>
                <div class="space-y-1.5">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Country</label>
                  <input v-model="form.billingCountry" type="text" class="input-base" placeholder="United States" />
                </div>
              </div>
            </section>

            <!-- Shipping Address -->
            <section class="bg-white rounded-sm border border-gray-200 relative overflow-hidden">
              <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
              <div class="relative z-10 border-b border-gray-100 px-4 py-3 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="w-1 h-4 bg-[#2F2E8B]"></div>
                  <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Truck :size="10" class="text-[#2F2E8B]" /> Shipping_Address
                  </span>
                </div>
                <button type="button" @click="copyBillingToShipping" class="text-[9px] font-mono font-bold text-[#2F2E8B] uppercase tracking-widest flex items-center gap-1 hover:underline">
                  <Copy :size="10" /> Same_as_Billing
                </button>
              </div>
              <div class="relative z-10 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="md:col-span-3 space-y-1.5">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Street</label>
                  <input v-model="form.shippingStreet" type="text" class="input-base" placeholder="123 Main Street" />
                </div>
                <div class="space-y-1.5">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">City</label>
                  <input v-model="form.shippingCity" type="text" class="input-base" placeholder="New York" />
                </div>
                <div class="space-y-1.5">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">State/Province</label>
                  <input v-model="form.shippingState" type="text" class="input-base" placeholder="NY" />
                </div>
                <div class="space-y-1.5">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Postal_Code</label>
                  <input v-model="form.shippingPostalCode" type="text" class="input-base" placeholder="10001" />
                </div>
                <div class="space-y-1.5">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Country</label>
                  <input v-model="form.shippingCountry" type="text" class="input-base" placeholder="United States" />
                </div>
              </div>
            </section>

            <!-- Social Media -->
            <section class="bg-white rounded-sm border border-gray-200 relative overflow-hidden">
              <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
              <div class="relative z-10 border-b border-gray-100 px-4 py-3 flex items-center gap-2">
                <div class="w-1 h-4 bg-[#2F2E8B]"></div>
                <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Share2 :size="10" class="text-[#2F2E8B]" /> Social_Media
                </span>
              </div>
              <div class="relative z-10 p-4 space-y-4">
                <div class="space-y-1.5">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Linkedin :size="10" class="text-blue-600" /> LinkedIn
                  </label>
                  <input v-model="form.linkedin" type="url" class="input-base" placeholder="https://linkedin.com/company/..." />
                </div>
                <div class="space-y-1.5">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Twitter :size="10" class="text-sky-500" /> Twitter
                  </label>
                  <input v-model="form.twitter" type="url" class="input-base" placeholder="https://twitter.com/..." />
                </div>
                <div class="space-y-1.5">
                  <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Facebook :size="10" class="text-blue-700" /> Facebook
                  </label>
                  <input v-model="form.facebook" type="url" class="input-base" placeholder="https://facebook.com/..." />
                </div>
              </div>
            </section>

            <!-- Description -->
            <section class="bg-white rounded-sm border border-gray-200 relative overflow-hidden">
              <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
              <div class="relative z-10 border-b border-gray-100 px-4 py-3 flex items-center gap-2">
                <div class="w-1 h-4 bg-[#2F2E8B]"></div>
                <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <AlignLeft :size="10" class="text-[#2F2E8B]" /> Description
                </span>
              </div>
              <div class="relative z-10 p-4">
                <textarea v-model="form.description" rows="4" class="input-base" placeholder="Additional notes about this account..."></textarea>
              </div>
            </section>

            <!-- Linked Documents -->
            <section v-if="form.id" class="bg-white rounded-sm border border-gray-200 relative overflow-hidden">
              <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
              <div class="relative z-10 border-b border-gray-100 px-4 py-3 flex items-center gap-2">
                <div class="w-1 h-4 bg-[#2F2E8B]"></div>
                <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <FileText :size="10" class="text-[#2F2E8B]" /> Documents
                </span>
              </div>
              <div class="relative z-10 p-4">
                <LinkedDocumentsWidget recordType="account" :recordId="form.id" :recordName="form.name" />
              </div>
            </section>
          </form>
        </div>

        <!-- Footer Actions -->
        <div class="relative z-10 border-t border-gray-200 p-4 bg-white sticky bottom-0">
          <div class="flex flex-col sm:flex-row justify-end gap-2">
            <button type="button" @click="close" class="px-5 py-2 border border-gray-200 text-gray-600 rounded-sm hover:bg-gray-50 transition text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-2">
              <X :size="12" /> Cancel
            </button>
            <button type="button" @click="handleSubmit" :disabled="saving" class="px-5 py-2 bg-[#2F2E8B] text-white rounded-sm hover:bg-[#3D2F88] transition text-[10px] font-mono font-bold uppercase tracking-wider disabled:opacity-60 flex items-center justify-center gap-2 min-w-[140px]">
              <Loader2 v-if="saving" :size="12" class="animate-spin" />
              <Save v-else :size="12" />
              {{ saving ? 'Saving…' : (isEditMode ? 'Update_Account' : 'Create_Account') }}
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
import { useRBAC } from '@/composables/useRBAC';
import LinkedDocumentsWidget from './LinkedDocumentsWidget.vue';
import UserSearchSelect from './UserSearchSelect.vue';
import { 
  X, Save, Loader2, Building2, Info, UserCheck, 
  Link as LinkIcon, Search, MapPin, Truck, Copy, 
  Share2, Linkedin, Twitter, Facebook, AlignLeft, FileText 
} from 'lucide-vue-next';

const props = defineProps({
  modelValue: Boolean,
  account: Object,
  users: Array
});

const emit = defineEmits(['update:modelValue', 'saved']);

const { getTenantId, getUserEmail } = decodeJWT();
const { canAssign, initializeRBAC } = useRBAC();
const currentUserEmail = getUserEmail();
const canAssignCrm = computed(() => canAssign('crm'));

const saving = ref(false);

const form = ref({
  name: '',
  website: '',
  industry: '',
  phone: '',
  email: '',
  numberOfEmployees: null,
  annualRevenue: null,
  billingStreet: '',
  billingCity: '',
  billingState: '',
  billingPostalCode: '',
  billingCountry: '',
  shippingStreet: '',
  shippingCity: '',
  shippingState: '',
  shippingPostalCode: '',
  shippingCountry: '',
  linkedin: '',
  twitter: '',
  facebook: '',
  description: '',
  assignedTo: currentUserEmail
});

// CRM Association Data
const leadSearchQuery = ref('');
const contactSearchQuery = ref('');
const dealSearchQuery = ref('');

const showLeadDropdown = ref(false);
const showContactDropdown = ref(false);
const showDealDropdown = ref(false);

const selectedLeads = ref([]);
const selectedContacts = ref([]);
const selectedDeals = ref([]);

const availableLeads = ref([]);
const availableContacts = ref([]);
const availableDeals = ref([]);

const filteredLeads = ref([]);
const filteredContacts = ref([]);
const filteredDeals = ref([]);

const isEditMode = computed(() => !!props.account?.id);

watch(() => props.modelValue, async (newVal) => {
  if (newVal) {
    await loadCRMEntities();
    
    if (props.account) {
      form.value = {
        id: props.account.id,
        name: props.account.name || '',
        website: props.account.website || '',
        industry: props.account.industry || '',
        phone: props.account.phone || '',
        email: props.account.email || '',
        numberOfEmployees: props.account.numberOfEmployees || null,
        annualRevenue: props.account.annualRevenue || null,
        billingStreet: props.account.billingStreet || '',
        billingCity: props.account.billingCity || '',
        billingState: props.account.billingState || '',
        billingPostalCode: props.account.billingPostalCode || '',
        billingCountry: props.account.billingCountry || '',
        shippingStreet: props.account.shippingStreet || '',
        shippingCity: props.account.shippingCity || '',
        shippingState: props.account.shippingState || '',
        shippingPostalCode: props.account.shippingPostalCode || '',
        shippingCountry: props.account.shippingCountry || '',
        linkedin: props.account.linkedin || '',
        twitter: props.account.twitter || '',
        facebook: props.account.facebook || '',
        description: props.account.description || '',
        assignedTo: props.account.assignedTo || props.account.owner || currentUserEmail
      };
      
      if (props.account.associatedLeadIds && props.account.associatedLeadIds.length > 0) {
        selectedLeads.value = availableLeads.value.filter(lead => 
          props.account.associatedLeadIds.includes(lead.id)
        );
      }
      if (props.account.associatedContactIds && props.account.associatedContactIds.length > 0) {
        selectedContacts.value = availableContacts.value.filter(contact => 
          props.account.associatedContactIds.includes(contact.id)
        );
      }
      if (props.account.associatedDealIds && props.account.associatedDealIds.length > 0) {
        selectedDeals.value = availableDeals.value.filter(deal => 
          props.account.associatedDealIds.includes(deal.id)
        );
      }
    } else {
      resetForm();
    }
  }
});

function resetForm() {
  form.value = {
    name: '',
    website: '',
    industry: '',
    phone: '',
    email: '',
    numberOfEmployees: null,
    annualRevenue: null,
    billingStreet: '',
    billingCity: '',
    billingState: '',
    billingPostalCode: '',
    billingCountry: '',
    shippingStreet: '',
    shippingCity: '',
    shippingState: '',
    shippingPostalCode: '',
    shippingCountry: '',
    linkedin: '',
    twitter: '',
    facebook: '',
    description: '',
    assignedTo: currentUserEmail
  };
  
  selectedLeads.value = [];
  selectedContacts.value = [];
  selectedDeals.value = [];
  leadSearchQuery.value = '';
  contactSearchQuery.value = '';
  dealSearchQuery.value = '';
}

function copyBillingToShipping() {
  form.value.shippingStreet = form.value.billingStreet;
  form.value.shippingCity = form.value.billingCity;
  form.value.shippingState = form.value.billingState;
  form.value.shippingPostalCode = form.value.billingPostalCode;
  form.value.shippingCountry = form.value.billingCountry;
}

// CRM Association Functions
async function loadCRMEntities() {
  const tenantId = getTenantId();
  try {
    const leadsData = await crmApi.getLeads(tenantId, { per_page: 1000 });
    availableLeads.value = leadsData.items || [];
    const contactsData = await crmApi.getContacts(tenantId, { per_page: 1000 });
    availableContacts.value = contactsData.items || [];
    const dealsData = await crmApi.getDeals(tenantId, { per_page: 1000 });
    availableDeals.value = dealsData.items || [];
  } catch (error) {
    console.error('Failed to load CRM entities:', error);
  }
}

function searchLeads() {
  const query = leadSearchQuery.value.toLowerCase();
  // No query -> surface all available leads (minus already selected ones)
  if (!query) {
    filteredLeads.value = availableLeads.value
      .filter(lead => !selectedLeads.value.some(s => s.id === lead.id))
      .slice(0, 50);
    showLeadDropdown.value = filteredLeads.value.length > 0;
    return;
  }
  filteredLeads.value = availableLeads.value.filter(lead => {
    const isAlreadySelected = selectedLeads.value.some(s => s.id === lead.id);
    if (isAlreadySelected) return false;
    return (lead.name?.toLowerCase().includes(query) || lead.company?.toLowerCase().includes(query) || lead.email?.toLowerCase().includes(query));
  }).slice(0, 50);
}

function openLeadDropdown() {
  showLeadDropdown.value = true;
  searchLeads();
}

function searchContacts() {
  const query = contactSearchQuery.value.toLowerCase();
  if (!query) { filteredContacts.value = []; showContactDropdown.value = false; return; }
  filteredContacts.value = availableContacts.value.filter(contact => {
    const isAlreadySelected = selectedContacts.value.some(s => s.id === contact.id);
    if (isAlreadySelected) return false;
    const fullName = `${contact.firstName || ''} ${contact.lastName || ''}`.toLowerCase();
    return (fullName.includes(query) || contact.email?.toLowerCase().includes(query));
  }).slice(0, 10);
}

function searchDeals() {
  const query = dealSearchQuery.value.toLowerCase();
  if (!query) { filteredDeals.value = []; showDealDropdown.value = false; return; }
  filteredDeals.value = availableDeals.value.filter(deal => {
    const isAlreadySelected = selectedDeals.value.some(s => s.id === deal.id);
    if (isAlreadySelected) return false;
    return deal.name?.toLowerCase().includes(query);
  }).slice(0, 10);
}

function addLead(lead) {
  if (!selectedLeads.value.some(s => s.id === lead.id)) { selectedLeads.value.push(lead); }
  leadSearchQuery.value = ''; filteredLeads.value = []; showLeadDropdown.value = false;
}

function addContact(contact) {
  if (!selectedContacts.value.some(s => s.id === contact.id)) { selectedContacts.value.push(contact); }
  contactSearchQuery.value = ''; filteredContacts.value = []; showContactDropdown.value = false;
}

function addDeal(deal) {
  if (!selectedDeals.value.some(s => s.id === deal.id)) { selectedDeals.value.push(deal); }
  dealSearchQuery.value = ''; filteredDeals.value = []; showDealDropdown.value = false;
}

function removeLead(leadId) { selectedLeads.value = selectedLeads.value.filter(l => l.id !== leadId); }
function removeContact(contactId) { selectedContacts.value = selectedContacts.value.filter(c => c.id !== contactId); }
function removeDeal(dealId) { selectedDeals.value = selectedDeals.value.filter(d => d.id !== dealId); }

onMounted(() => {
  initializeRBAC().catch(() => {});
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.relative')) {
      showLeadDropdown.value = false;
      showContactDropdown.value = false;
      showDealDropdown.value = false;
    }
  });
});

async function handleSubmit() {
  if (!form.value.name) { alert('Account name is required'); return; }
  saving.value = true;
  try {
    const tenantId = getTenantId();
    const accountData = {
      ...form.value,
      assignedTo: canAssignCrm.value
        ? form.value.assignedTo
        : (isEditMode.value ? (props.account?.assignedTo || props.account?.owner || currentUserEmail) : currentUserEmail),
      associatedLeadIds: selectedLeads.value.map(l => l.id),
      // Contacts shown under an account are derived from associated leads;
      // explicit contact/deal associations are no longer captured here.
      associatedContactIds: [],
      associatedDealIds: []
    };
    if (isEditMode.value) {
      await crmApi.updateAccount(props.account.id, accountData, tenantId);
      // Field-level change tracking
      const changes = [];
      const fields = [
        { key: 'name', label: 'Name' },
        { key: 'website', label: 'Website' },
        { key: 'industry', label: 'Industry' },
        { key: 'phone', label: 'Phone' },
        { key: 'email', label: 'Email' },
        { key: 'numberOfEmployees', label: 'Employees' },
        { key: 'annualRevenue', label: 'Annual Revenue' },
        { key: 'billingStreet', label: 'Billing Street' },
        { key: 'billingCity', label: 'Billing City' },
        { key: 'billingState', label: 'Billing State' },
        { key: 'billingPostalCode', label: 'Billing Postal Code' },
        { key: 'billingCountry', label: 'Billing Country' },
        { key: 'shippingStreet', label: 'Shipping Street' },
        { key: 'shippingCity', label: 'Shipping City' },
        { key: 'shippingState', label: 'Shipping State' },
        { key: 'shippingPostalCode', label: 'Shipping Postal Code' },
        { key: 'shippingCountry', label: 'Shipping Country' },
        { key: 'linkedin', label: 'LinkedIn' },
        { key: 'twitter', label: 'Twitter' },
        { key: 'facebook', label: 'Facebook' },
        { key: 'description', label: 'Description' },
        { key: 'assignedTo', label: 'Assigned To' }
      ];
      const structuredChanges = [];
      for (const { key, label } of fields) {
        const oldVal = props.account[key] ?? '';
        const newVal = form.value[key] ?? '';
        if (String(oldVal) !== String(newVal)) {
          changes.push(`${label}: "${oldVal}" → "${newVal}"`);
          structuredChanges.push({ field: label, oldValue: String(oldVal), newValue: String(newVal) });
        }
      }
      if (changes.length > 0) {
        // Check if linked leads changed
        const oldLeadIds = (props.account.associatedLeadIds || []).sort().join(',');
        const newLeadIds = selectedLeads.value.map(l => l.id).sort().join(',');
        if (oldLeadIds !== newLeadIds) {
          changes.push(`Linked Leads: ${selectedLeads.value.map(l => l.name).join(', ') || 'none'}`);
          structuredChanges.push({ field: 'Linked Leads', oldValue: oldLeadIds || 'none', newValue: newLeadIds || 'none' });
        }
        crmApi.logAccountActivity(props.account.id, {
          tenant_id: tenantId,
          type: 'account:update',
          notes: `Account fields updated: ${changes.join(', ')}`,
          description: `${changes.length} field(s) updated`,
          metadata: { changes: structuredChanges },
          performed_by: currentUserEmail
        }).catch(e => console.warn('[AccountFormModal] Log activity failed:', e));
      }
    } else {
      const created = await crmApi.createAccount(accountData, tenantId);
      const newId = created?.id || created?._id || created?.result?.id;
      if (newId) {
        // Log creation with all populated fields
        const createdFields = [];
        const structuredChanges = [];
        const createFieldMap = [
          { key: 'name', label: 'Name' },
          { key: 'website', label: 'Website' },
          { key: 'industry', label: 'Industry' },
          { key: 'phone', label: 'Phone' },
          { key: 'email', label: 'Email' },
          { key: 'numberOfEmployees', label: 'Employees' },
          { key: 'annualRevenue', label: 'Annual Revenue' },
          { key: 'billingStreet', label: 'Billing Street' },
          { key: 'billingCity', label: 'Billing City' },
          { key: 'billingState', label: 'Billing State' },
          { key: 'billingPostalCode', label: 'Billing Postal Code' },
          { key: 'billingCountry', label: 'Billing Country' },
          { key: 'shippingStreet', label: 'Shipping Street' },
          { key: 'shippingCity', label: 'Shipping City' },
          { key: 'shippingState', label: 'Shipping State' },
          { key: 'shippingPostalCode', label: 'Shipping Postal Code' },
          { key: 'shippingCountry', label: 'Shipping Country' },
          { key: 'linkedin', label: 'LinkedIn' },
          { key: 'twitter', label: 'Twitter' },
          { key: 'facebook', label: 'Facebook' },
          { key: 'description', label: 'Description' },
          { key: 'assignedTo', label: 'Assigned To' }
        ];
        createFieldMap.forEach(({ key, label }) => {
          const val = form.value[key];
          if (val != null && val !== '') {
            createdFields.push(`${label}: "${val}"`);
            structuredChanges.push({ field: label, oldValue: '', newValue: String(val) });
          }
        });
        if (selectedLeads.value.length) {
          createdFields.push(`Linked Leads: ${selectedLeads.value.map(l => l.name).join(', ')}`);
          structuredChanges.push({ field: 'Linked Leads', oldValue: '', newValue: selectedLeads.value.map(l => l.name).join(', ') });
        }
        crmApi.logAccountActivity(newId, {
          tenant_id: tenantId,
          type: 'account:create',
          notes: `Account created — ${createdFields.join('; ')}`,
          description: `Account created with ${structuredChanges.length} field(s)`,
          metadata: { changes: structuredChanges },
          performed_by: currentUserEmail
        }).catch(e => console.warn('[AccountFormModal] Log activity failed:', e));
      }
    }
    emit('saved');
    emit('update:modelValue', false);
  } catch (error) {
    console.error('Failed to save account:', error);
    alert('Failed to save account. Please try again.');
  } finally {
    saving.value = false;
  }
}

function close() {
  if (!saving.value) {
    emit('update:modelValue', false);
  }
}
</script>

<style scoped>
.dotted-pattern {
  background-image: radial-gradient(#e5e7eb 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.4;
}

.input-base {
  @apply w-full px-3 py-1.5 text-[11px] font-mono border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] outline-none transition-all placeholder:text-gray-300;
}

@keyframes modal-in {
  from { opacity: 0; transform: scale(0.98) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.animate-modal-in {
  animation: modal-in 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Custom Scrollbar for Tech Look */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}
</style>
