<template>
  <Teleport to="body">
    <div v-if="modelValue"
      class="fixed inset-0 bg-black/60 backdrop-blur-md flex items-start justify-center z-[9999] p-4 pt-10 overflow-y-auto"
      @click.self="$emit('update:modelValue', false)">
    <div class="bg-white rounded-sm shadow-2xl max-w-5xl w-full border border-gray-200 relative overflow-hidden animate-modal-in flex flex-col my-auto md:my-10">
      <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>

      <!-- Header -->
      <div class="relative z-10 sticky top-0 bg-white border-b border-gray-200 text-gray-800 p-4 rounded-t-sm flex items-center justify-between">
        <div>
          <h3 class="text-lg md:text-2xl font-bold">{{ isEditing ? 'Edit Contact' : 'New Contact' }}</h3>
          <p class="text-xs md:text-sm opacity-90 mt-1">{{ isEditing ? 'Update contact information' : 'Add a new contact to your CRM' }}</p>
        </div>
        <button
          @click="$emit('update:modelValue', false)"
          class="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition flex-shrink-0"
        >
          <i class="fas fa-times text-lg md:text-xl"></i>
        </button>
        
      </div>

      <!-- Form Body -->
      <form @submit.prevent="saveContact" class="relative z-10 p-4 space-y-4 max-h-[75vh] overflow-y-auto">
        <!-- Basic Information -->
        <div class="space-y-3">
          <h4 class="text-base md:text-lg font-semibold text-gray-800 border-b pb-2">
            <i class="fas fa-user mr-2 text-[#2F2E8B]"></i>Basic Information
          </h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            <div class="md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div>
                <label class="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                  First Name <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.firstName"
                  type="text"
                  required
                  class="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
                  placeholder="John"
                />
              </div>
              
              <div>
                <label class="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                  Last Name <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.lastName"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
                  placeholder="Doe"
                />
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Email <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.email"
                type="email"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
                placeholder="john.doe@example.com"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                v-model="form.phone"
                type="tel"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
                placeholder="+260 XXX XXX XXX"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Mobile
              </label>
              <input
                v-model="form.mobile"
                type="tel"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
                placeholder="+260 XXX XXX XXX"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Birthday
              </label>
              <input
                v-model="form.birthday"
                type="date"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <!-- Professional Information -->
        <div class="space-y-4">
          <h4 class="text-lg font-semibold text-gray-800 border-b pb-2">
            <i class="fas fa-briefcase mr-2 text-[#2F2E8B]"></i>Professional Information
          </h4>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Account
              </label>
              <select
                v-model="form.accountId"
                @change="updateAccountName"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
              >
                <option value="">-- Select Account --</option>
                <option v-for="account in accounts" :key="account.id" :value="account.id">
                  {{ account.name }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <input
                v-model="form.title"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
                placeholder="e.g., Marketing Manager"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <input
                v-model="form.department"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
                placeholder="e.g., Sales, Marketing"
              />
            </div>

            <div class="md:col-span-2 lg:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Lead Source
              </label>
              <select
                v-model="form.leadSource"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
              >
                <option value="">-- Select Source --</option>
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Trade Show">Trade Show</option>
                <option value="Cold Call">Cold Call</option>
                <option value="Social Media">Social Media</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Address Information -->
        <div class="space-y-4">
          <h4 class="text-lg font-semibold text-gray-800 border-b pb-2">
            <i class="fas fa-map-marker-alt mr-2 text-[#2F2E8B]"></i>Mailing Address
          </h4>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Street
            </label>
            <input
              v-model="form.mailingStreet"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
              placeholder="123 Main Street"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                v-model="form.mailingCity"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
                placeholder="Lusaka"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                State/Province
              </label>
              <input
                v-model="form.mailingState"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
                placeholder="Lusaka Province"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Postal Code
              </label>
              <input
                v-model="form.mailingPostalCode"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
                placeholder="10101"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <input
              v-model="form.mailingCountry"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
              placeholder="Zambia"
            />
          </div>
        </div>

        <!-- Social Media -->
        <div class="space-y-4">
          <h4 class="text-lg font-semibold text-gray-800 border-b pb-2">
            <i class="fas fa-share-alt mr-2 text-[#2F2E8B]"></i>Social Media
          </h4>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                <i class="fab fa-linkedin text-blue-600 mr-1"></i>LinkedIn
              </label>
              <input
                v-model="form.linkedin"
                type="url"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
                placeholder="https://linkedin.com/in/..."
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                <i class="fab fa-twitter text-sky-500 mr-1"></i>Twitter
              </label>
              <input
                v-model="form.twitter"
                type="url"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
                placeholder="https://twitter.com/..."
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                <i class="fab fa-facebook text-blue-800 mr-1"></i>Facebook
              </label>
              <input
                v-model="form.facebook"
                type="url"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
                placeholder="https://facebook.com/..."
              />
            </div>
          </div>
        </div>

        <!-- Description -->
        <div class="space-y-4">
          <h4 class="text-lg font-semibold text-gray-800 border-b pb-2">
            <i class="fas fa-align-left mr-2 text-[#2F2E8B]"></i>Additional Information
          </h4>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              v-model="form.description"
              rows="4"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
              placeholder="Additional notes about this contact..."
            ></textarea>
          </div>

          <!-- Linked Documents Section (only show when editing existing contact) -->
          <div v-if="form.id" class="bg-white rounded-lg border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <i class="fas fa-file-alt text-[#2F2E8B]"></i>
              Documents
            </h3>
            <LinkedDocumentsWidget
              recordType="contact"
              :recordId="form.id"
              :recordName="form.name"
            />
          </div>

          <!-- Assignment Section -->
          <div v-if="canAssignCrm" class="space-y-2 mt-4">
            <UserSearchSelect
              v-model="form.assignedTo"
              :users="users"
              label="Assigned To"
            />
          </div>
          <div v-else class="space-y-2 mt-4 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">
            Assignment is locked to your scope.
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex flex-col md:flex-row gap-2 md:gap-3 justify-end pt-4 mt-6 border-t border-gray-100 bg-white sticky bottom-0 z-20">
          <button
            type="button"
            @click="$emit('update:modelValue', false)"
            class="px-4 md:px-6 py-2 text-sm md:text-base bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="saving"
            class="px-4 md:px-6 py-2 text-sm md:text-base bg-white border border-[#2F2E8B] text-[#2F2E8B] rounded-lg hover:bg-blue-50 transition disabled:opacity-50 font-medium"
          >
            <i class="fas fa-save mr-2"></i>{{ saving ? 'Saving...' : (isEditing ? 'Update' : 'Create') }} Contact
          </button>
        </div>
      </form>
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

const { getTenantId, getUserEmail } = decodeJWT();
const { canAssign, initializeRBAC } = useRBAC();
const currentUserEmail = getUserEmail();
const canAssignCrm = computed(() => canAssign('crm'));

const props = defineProps({
  modelValue: Boolean,
  contact: Object,
  accounts: Array,
  users: Array
});

const emit = defineEmits(['update:modelValue', 'saved']);

const saving = ref(false);
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  mobile: '',
  title: '',
  department: '',
  accountId: '',
  accountName: '',
  leadSource: '',
  birthday: '',
  description: '',
  mailingStreet: '',
  mailingCity: '',
  mailingState: '',
  mailingCountry: '',
  mailingPostalCode: '',
  linkedin: '',
  twitter: '',
  facebook: '',
  assignedTo: currentUserEmail
});

const isEditing = computed(() => !!props.contact?.id);

// Watch for contact changes (editing mode)
watch(() => props.contact, (newContact) => {
  if (newContact) {
    form.value = {
      firstName: newContact.firstName || '',
      lastName: newContact.lastName || '',
      email: newContact.email || '',
      phone: newContact.phone || '',
      mobile: newContact.mobile || '',
      title: newContact.title || '',
      department: newContact.department || '',
      accountId: newContact.accountId || '',
      accountName: newContact.accountName || '',
      leadSource: newContact.leadSource || '',
      birthday: newContact.birthday || '',
      description: newContact.description || '',
      mailingStreet: newContact.mailingStreet || '',
      mailingCity: newContact.mailingCity || '',
      mailingState: newContact.mailingState || '',
      mailingCountry: newContact.mailingCountry || '',
      mailingPostalCode: newContact.mailingPostalCode || '',
      linkedin: newContact.linkedin || '',
      twitter: newContact.twitter || '',
      facebook: newContact.facebook || '',
      assignedTo: newContact.assignedTo || newContact.owner || currentUserEmail
    };
  }
}, { immediate: true });

// Watch for modal close (reset form)
watch(() => props.modelValue, (newVal) => {
  if (!newVal && !props.contact) {
    resetForm();
  }
  if (newVal) {
    initializeRBAC().catch(() => {});
  }
});

watch(() => props.users, (newVal) => {
  console.log('ContactFormModal: users prop changed. New length:', newVal ? newVal.length : 'null');
}, { immediate: true });

function resetForm() {
  form.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    mobile: '',
    title: '',
    department: '',
    accountId: '',
    accountName: '',
    leadSource: '',
    birthday: '',
    description: '',
    mailingStreet: '',
    mailingCity: '',
    mailingState: '',
    mailingCountry: '',
    mailingPostalCode: '',
    linkedin: '',
    twitter: '',
    facebook: '',
    assignedTo: currentUserEmail
  };
}

function updateAccountName() {
  if (form.value.accountId && props.accounts) {
    const account = props.accounts.find(a => a.id === form.value.accountId);
    if (account) {
      form.value.accountName = account.name;
    }
  } else {
    form.value.accountName = '';
  }
}

async function saveContact() {
  saving.value = true;
  try {
    const payload = {
      ...form.value,
      assignedTo: canAssignCrm.value
        ? form.value.assignedTo
        : (isEditing.value ? (props.contact?.assignedTo || props.contact?.owner || currentUserEmail) : currentUserEmail),
      tenant_id: getTenantId()
    };

    if (isEditing.value) {
      await crmApi.updateContact(props.contact.id, payload, getTenantId());
    } else {
      await crmApi.createContact(payload, getTenantId());
    }

    emit('saved');
    emit('update:modelValue', false);
    resetForm();
  } catch (error) {
    console.error('Error saving contact:', error);
    alert('Failed to save contact: ' + error.message);
  } finally {
    saving.value = false;
  }
}

onMounted(() => {
  initializeRBAC().catch(() => {});
});
</script>

<style scoped>
input:focus, select:focus, textarea:focus {
  outline: none;
}
.dotted-pattern {
  background-image: radial-gradient(#2F2E8B 1.5px, transparent 1.5px);
  background-size: 20px 20px;
  opacity: 0.04;
}
@keyframes modal-in {
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}
.animate-modal-in { animation: modal-in 0.2s cubic-bezier(0, 0, 0.2, 1) forwards; }
</style>
