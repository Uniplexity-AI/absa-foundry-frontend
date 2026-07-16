<template>
  <div class="w-full space-y-5">

    <!-- Header + Actions Row -->
    <div class="flex items-center justify-between border-b border-gray-100 pb-4">
      <div class="flex items-center gap-2">
        <div class="w-1 h-4 bg-[#2F2E8B]"></div>
        <h3 class="text-xs font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
          <Users :size="14" class="text-gray-400" /> Contact_Directory
        </h3>
        <span class="text-[9px] font-mono font-bold text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-sm">
          {{ contacts.length }} / {{ totalContacts }}
        </span>
      </div>
      <button @click="showCreateModal = true"
        class="px-4 py-2 rounded-sm bg-[#2F2E8B] text-white text-[10px] font-mono font-bold uppercase tracking-wider hover:bg-[#3D2F88] transition flex items-center gap-2">
        <Plus :size="12" /> New_Contact
      </button>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="bg-white border border-gray-200 rounded-sm p-4 relative overflow-hidden hover:border-[#2F2E8B]/40 transition">
        <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-3">
            <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">TOTAL</span>
            <div class="p-1 border border-blue-100 rounded-sm"><Users :size="12" class="text-[#2F2E8B]" /></div>
          </div>
          <div class="text-2xl font-black text-gray-900 font-mono">{{ totalContacts }}</div>
        </div>
      </div>
      <div class="bg-white border border-gray-200 rounded-sm p-4 relative overflow-hidden hover:border-[#2F2E8B]/40 transition">
        <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-3">
            <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">WITH_ACCOUNTS</span>
            <div class="p-1 border border-purple-100 rounded-sm"><Building :size="12" class="text-purple-500" /></div>
          </div>
          <div class="text-2xl font-black text-gray-900 font-mono">{{ contactsWithAccounts }}</div>
        </div>
      </div>
      <div class="bg-white border border-gray-200 rounded-sm p-4 relative overflow-hidden hover:border-[#2F2E8B]/40 transition">
        <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-3">
            <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">CONVERTED</span>
            <div class="p-1 border border-green-100 rounded-sm"><ArrowRightLeft :size="12" class="text-green-500" /></div>
          </div>
          <div class="text-2xl font-black text-gray-900 font-mono">{{ convertedContacts }}</div>
        </div>
      </div>
      <div class="bg-white border border-gray-200 rounded-sm p-4 relative overflow-hidden hover:border-[#2F2E8B]/40 transition">
        <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-3">
            <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">THIS_MONTH</span>
            <div class="p-1 border border-orange-100 rounded-sm"><CalendarDays :size="12" class="text-orange-500" /></div>
          </div>
          <div class="text-2xl font-black text-gray-900 font-mono">{{ contactsThisMonth }}</div>
        </div>
      </div>
    </div>

    <!-- Search + Filters Bar -->
    <div class="bg-white border border-gray-200 rounded-sm p-3 space-y-3 relative overflow-hidden">
      <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
      <div class="relative z-10 flex flex-col md:flex-row gap-3">
        <!-- Search -->
        <div class="relative flex-1">
          <Search :size="13" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
          <input v-model="searchQuery" @input="debouncedSearch" type="text"
            placeholder="SEARCH_CONTACT, EMAIL, PHONE..."
            class="w-full border border-gray-200 rounded-sm pl-9 pr-4 py-2 text-[10px] font-mono focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] outline-none transition" />
        </div>

        <!-- Account Filter -->
        <select v-model="filters.accountId" @change="loadContacts"
          class="border border-gray-200 rounded-sm px-3 py-2 text-[10px] font-mono focus:ring-1 focus:ring-[#2F2E8B] outline-none transition bg-white min-w-[160px]">
          <option value="">ALL_ACCOUNTS</option>
          <option v-for="account in accounts" :key="account.id" :value="account.id">
            {{ account.name.toUpperCase() }}
          </option>
        </select>

        <!-- View Toggle -->
        <div class="flex items-center gap-1">
          <button @click="viewMode = 'grid'"
            :class="viewMode === 'grid' ? 'bg-[#2F2E8B] text-white border-[#2F2E8B]' : 'bg-white text-gray-500 border-gray-200 hover:border-[#2F2E8B]'"
            class="w-8 h-8 border rounded-sm flex items-center justify-center transition">
            <LayoutGrid :size="12" />
          </button>
          <button @click="viewMode = 'list'"
            :class="viewMode === 'list' ? 'bg-[#2F2E8B] text-white border-[#2F2E8B]' : 'bg-white text-gray-500 border-gray-200 hover:border-[#2F2E8B]'"
            class="w-8 h-8 border rounded-sm flex items-center justify-center transition">
            <List :size="12" />
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-16">
      <div class="h-10 w-10 border-4 border-gray-100 border-t-[#2F2E8B] rounded-full animate-spin"></div>
    </div>

    <!-- Empty State -->
    <div v-else-if="contacts.length === 0"
      class="bg-white border border-gray-200 rounded-sm p-12 text-center relative overflow-hidden">
      <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
      <div class="relative z-10">
        <BookUser :size="48" class="text-gray-200 mx-auto mb-4" />
        <p class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">No_Contacts_Found</p>
        <p class="text-xs text-gray-400 mt-2 mb-6">DIRECTORY_EMPTY // NO_RECORDS</p>
        <button @click="showCreateModal = true"
          class="px-6 py-2 rounded-sm bg-[#2F2E8B] text-white text-[10px] font-mono font-bold uppercase tracking-wider hover:bg-[#3D2F88] transition flex items-center gap-2 mx-auto">
          <Plus :size="12" /> Create_Contact
        </button>
      </div>
    </div>

    <!-- Grid View -->
    <div v-else-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      <div v-for="contact in contacts" :key="contact.id"
        @click="viewContact(contact)"
        class="bg-white border border-gray-200 rounded-sm hover:border-[#2F2E8B]/50 hover:shadow-sm transition cursor-pointer p-4 relative overflow-hidden group">
        <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>

        <div class="relative z-10">
          <!-- Avatar + Name Row -->
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-3">
              <!-- Avatar -->
              <div class="w-9 h-9 rounded-sm bg-[#2F2E8B]/10 border border-[#2F2E8B]/20 flex items-center justify-center text-[#2F2E8B] font-black text-xs font-mono flex-shrink-0">
                {{ getInitials(contact) }}
              </div>
              <div class="min-w-0">
                <h4 class="font-black text-gray-900 text-[11px] font-mono uppercase tracking-tight truncate">
                  <template v-if="contact.firstName || contact.lastName">{{ contact.firstName }} {{ contact.lastName }}</template>
                  <template v-else>{{ contact.name }}</template>
                </h4>
                <p v-if="contact.title" class="text-[9px] font-mono text-gray-400 uppercase tracking-tighter truncate">{{ contact.title }}</p>
              </div>
            </div>
            <!-- Quick Actions -->
            <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition" @click.stop>
              <button @click="callContact(contact)" title="Call"
                class="w-6 h-6 flex items-center justify-center border border-gray-200 rounded-sm hover:border-green-400 hover:bg-green-50 text-gray-400 hover:text-green-600 transition">
                <Phone :size="10" />
              </button>
              <button @click="whatsappContact(contact)" title="WhatsApp"
                class="w-6 h-6 flex items-center justify-center border border-gray-200 rounded-sm hover:border-green-400 hover:bg-green-50 text-gray-400 hover:text-green-600 transition">
                <MessageCircle :size="10" />
              </button>
              <button @click="editContact(contact)"
                class="w-6 h-6 flex items-center justify-center border border-gray-200 rounded-sm hover:border-[#2F2E8B] hover:bg-blue-50 text-gray-400 hover:text-[#2F2E8B] transition">
                <Pencil :size="10" />
              </button>
              <button @click="confirmDelete(contact)"
                class="w-6 h-6 flex items-center justify-center border border-gray-200 rounded-sm hover:border-red-400 hover:bg-red-50 text-gray-400 hover:text-red-500 transition">
                <Trash2 :size="10" />
              </button>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="space-y-1 text-[10px] font-mono text-gray-500 mb-3">
            <div v-if="contact.accountName" class="flex items-center gap-2 truncate">
              <Building :size="9" class="text-[#2F2E8B] flex-shrink-0" /><span class="truncate">{{ contact.accountName }}</span>
            </div>
            <div v-if="contact.email" class="flex items-center gap-2 truncate">
              <Mail :size="9" class="text-[#2F2E8B] flex-shrink-0" /><span class="truncate">{{ contact.email }}</span>
            </div>
            <div v-if="contact.phone" class="flex items-center gap-2">
              <Phone :size="9" class="text-[#2F2E8B] flex-shrink-0" /><span>{{ contact.phone }}</span>
            </div>
            <div v-if="contact.mailingCity || contact.mailingCountry" class="flex items-center gap-2 truncate">
              <MapPin :size="9" class="text-[#2F2E8B] flex-shrink-0" /><span class="truncate">{{ [contact.mailingCity, contact.mailingCountry].filter(Boolean).join(', ') }}</span>
            </div>
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-1">
            <span v-if="contact.convertedFromLeadId" class="px-1.5 py-0.5 bg-[#2F2E8B]/10 text-[#2F2E8B] text-[8px] font-mono font-bold rounded-sm border border-[#2F2E8B]/20 uppercase">
              Converted
            </span>
            <span v-else-if="contact.entityType === 'lead'" class="px-1.5 py-0.5 bg-blue-50 text-blue-700 text-[8px] font-mono font-bold rounded-sm border border-blue-200 uppercase">
              Lead
            </span>
            <span v-if="contact.leadSource" class="px-1.5 py-0.5 bg-gray-100 text-gray-500 text-[8px] font-mono font-bold rounded-sm border border-gray-200 uppercase">
              {{ contact.leadSource }}
            </span>
          </div>

          <!-- Assigned To -->
          <div v-if="contact.assignedTo" class="flex items-center gap-1.5 pt-2 border-t border-gray-100 mt-2">
            <UserCircle :size="9" class="text-gray-300 flex-shrink-0" />
            <span class="text-[9px] font-mono text-gray-400 truncate">{{ contact.assignedTo }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- List View -->
    <div v-else class="bg-white border border-gray-200 rounded-sm overflow-hidden relative">
      <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
      <div class="overflow-x-auto relative z-10">
        <table class="w-full">
          <thead class="border-b border-gray-100 bg-gray-50/70">
            <tr>
              <th class="px-4 py-2.5 text-left text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Contact</th>
              <th class="px-4 py-2.5 text-left text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Account</th>
              <th class="px-4 py-2.5 text-left text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Email</th>
              <th class="px-4 py-2.5 text-left text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Phone</th>
              <th class="px-4 py-2.5 text-left text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Location</th>
              <th class="px-4 py-2.5 text-left text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Assigned</th>
              <th class="px-4 py-2.5 text-right text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="contact in contacts" :key="contact.id"
              @click="viewContact(contact)"
              class="hover:bg-gray-50/70 cursor-pointer transition group">
              <td class="px-4 py-3">
                <div class="flex items-center gap-2.5">
                  <div class="w-7 h-7 rounded-sm bg-[#2F2E8B]/10 border border-[#2F2E8B]/20 flex items-center justify-center text-[#2F2E8B] font-black text-[9px] font-mono flex-shrink-0">
                    {{ getInitials(contact) }}
                  </div>
                  <div>
                    <div class="text-[11px] font-mono font-bold text-gray-900 uppercase tracking-tight">
                      <template v-if="contact.firstName || contact.lastName">{{ contact.firstName }} {{ contact.lastName }}</template>
                      <template v-else>{{ contact.name }}</template>
                      <span v-if="contact.entityType === 'lead'" class="ml-1.5 px-1 py-0.5 bg-blue-50 text-blue-700 text-[8px] font-mono font-bold rounded-sm border border-blue-200">LEAD</span>
                    </div>
                    <div v-if="contact.title" class="text-[9px] font-mono text-gray-400">{{ contact.title }}</div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 text-[10px] font-mono text-gray-500">{{ contact.accountName || '—' }}</td>
              <td class="px-4 py-3 text-[10px] font-mono text-gray-500 max-w-[160px] truncate">{{ contact.email || '—' }}</td>
              <td class="px-4 py-3 text-[10px] font-mono text-gray-500">{{ contact.phone || '—' }}</td>
              <td class="px-4 py-3 text-[10px] font-mono text-gray-500">{{ [contact.mailingCity, contact.mailingCountry].filter(Boolean).join(', ') || '—' }}</td>
              <td class="px-4 py-3 text-[10px] font-mono text-gray-500 max-w-[120px] truncate">{{ contact.assignedTo || '—' }}</td>
              <td class="px-4 py-3">
                <div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition" @click.stop>
                  <button @click="callContact(contact)" title="Call"
                    class="w-6 h-6 flex items-center justify-center border border-transparent rounded-sm hover:border-green-300 hover:bg-green-50 text-gray-300 hover:text-green-600 transition">
                    <Phone :size="10" />
                  </button>
                  <button @click="whatsappContact(contact)" title="WhatsApp"
                    class="w-6 h-6 flex items-center justify-center border border-transparent rounded-sm hover:border-green-300 hover:bg-green-50 text-gray-300 hover:text-green-600 transition">
                    <MessageCircle :size="10" />
                  </button>
                  <button @click="editContact(contact)"
                    class="w-6 h-6 flex items-center justify-center border border-transparent rounded-sm hover:border-[#2F2E8B] hover:bg-blue-50 text-gray-300 hover:text-[#2F2E8B] transition">
                    <Pencil :size="10" />
                  </button>
                  <button @click="confirmDelete(contact)"
                    class="w-6 h-6 flex items-center justify-center border border-transparent rounded-sm hover:border-red-300 hover:bg-red-50 text-gray-300 hover:text-red-500 transition">
                    <Trash2 :size="10" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="contacts.length > 0 && totalPages > 1"
      class="flex items-center justify-between bg-white border border-gray-200 rounded-sm px-4 py-3">
      <span class="text-[9px] font-mono text-gray-400 uppercase tracking-wider">
        {{ (currentPage - 1) * perPage + 1 }}–{{ Math.min(currentPage * perPage, totalContacts) }} of {{ totalContacts }}
      </span>
      <div class="flex items-center gap-1">
        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
          class="w-7 h-7 flex items-center justify-center border rounded-sm text-[9px] font-mono font-bold transition disabled:opacity-30"
          :class="currentPage > 1 ? 'border-gray-200 text-gray-600 hover:border-[#2F2E8B] hover:text-[#2F2E8B]' : 'border-gray-100 text-gray-300'">
          <ChevronLeft :size="10" />
        </button>
        <button v-for="page in visiblePages" :key="page" @click="changePage(page)"
          :class="page === currentPage ? 'bg-[#2F2E8B] text-white border-[#2F2E8B]' : 'bg-white text-gray-400 border-gray-200 hover:border-[#2F2E8B]'"
          class="w-7 h-7 flex items-center justify-center border rounded-sm text-[9px] font-mono font-bold transition">
          {{ page }}
        </button>
        <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
          class="w-7 h-7 flex items-center justify-center border rounded-sm text-[9px] font-mono font-bold transition disabled:opacity-30"
          :class="currentPage < totalPages ? 'border-gray-200 text-gray-600 hover:border-[#2F2E8B] hover:text-[#2F2E8B]' : 'border-gray-100 text-gray-300'">
          <ChevronRight :size="10" />
        </button>
      </div>
    </div>

    <!-- Contact Detail Modal -->
    <ContactDetailModal v-model="showDetailModal" :contact="selectedContact"
      @edit="editContact" @delete="confirmDelete" @refresh="loadContacts" @viewAccount="handleViewAccount" />

    <!-- Contact Form Modal -->
    <ContactFormModal v-model="showFormModal" :contact="editingContact" :accounts="accounts" :users="users" @saved="handleContactSaved" />

    <!-- Create Contact Modal -->
    <ContactFormModal v-model="showCreateModal" :accounts="accounts" :users="users" @saved="handleContactSaved" />

    <!-- Delete Confirmation Modal -->
    <Teleport to="body">
      <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black/60 backdrop-blur-md flex items-start justify-center z-[9999] p-4 pt-24"
        @click.self="showDeleteConfirm = false">
        <div class="bg-white rounded-sm shadow-2xl w-full max-w-md border border-gray-200 relative overflow-hidden animate-modal-in">
          <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
          <div class="p-5 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50 relative z-10">
            <div class="w-1 h-5 bg-red-500"></div>
            <h3 class="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
              <AlertTriangle :size="14" class="text-red-500" /> Delete_Contact
            </h3>
          </div>
          <div class="p-5 relative z-10">
            <p class="text-[11px] font-mono text-gray-600">
              Confirm deletion of
              <span class="font-bold text-gray-900 uppercase">{{ contactToDelete?.firstName }} {{ contactToDelete?.lastName || contactToDelete?.name }}</span>?
              This action <span class="text-red-600 font-bold">cannot be undone</span>.
            </p>
          </div>
          <div class="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 relative z-10">
            <button @click="showDeleteConfirm = false"
              class="px-5 py-2 rounded-sm border border-gray-200 text-gray-600 text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-white transition">
              _CANCEL
            </button>
            <button @click="deleteContact" :disabled="deleting"
              class="px-5 py-2 rounded-sm bg-red-600 text-white text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-red-700 transition disabled:opacity-50 flex items-center gap-2">
              <Trash2 :size="12" /> {{ deleting ? 'DELETING...' : 'CONFIRM_DELETE' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { emit as emitCrmEvent, on as onCrmEvent } from '@/events/crmEvents.js';
import * as crmApi from '@/api_services/crm_api.js';
import { decodeJWT } from '@/api_services/decodeJWT.js';
import ContactDetailModal from './ContactDetailModal.vue';
import ContactFormModal from './ContactFormModal.vue';
import {
  Users, Plus, Building, ArrowRightLeft, CalendarDays, Search, LayoutGrid, List,
  Phone, MessageCircle, Pencil, Trash2, Mail, MapPin, UserCircle, BookUser,
  ChevronLeft, ChevronRight, AlertTriangle
} from 'lucide-vue-next';

const props = defineProps({
  users: { type: Array, default: () => [] }
});

const emit = defineEmits(['call', 'whatsapp']);
const { getTenantId } = decodeJWT();

// State
const contacts = ref([]);
const accounts = ref([]);
const loading = ref(false);
const searchQuery = ref('');
const viewMode = ref('grid');
const currentPage = ref(1);
const perPage = ref(12);
const totalContacts = ref(0);
const filters = ref({ accountId: '', assignedTo: '' });

// Modals
const showDetailModal = ref(false);
const showFormModal = ref(false);
const showCreateModal = ref(false);
const showDeleteConfirm = ref(false);
const selectedContact = ref(null);
const editingContact = ref(null);
const contactToDelete = ref(null);
const deleting = ref(false);

// Stats
const contactsWithAccounts = computed(() => contacts.value.filter(c => c.accountId).length);
const convertedContacts = computed(() => contacts.value.filter(c => c.convertedFromLeadId).length);
const contactsThisMonth = computed(() => {
  const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  return contacts.value.filter(c => c.created_at && new Date(c.created_at) >= startOfMonth).length;
});

// Pagination
const totalPages = computed(() => Math.ceil(totalContacts.value / perPage.value));
const visiblePages = computed(() => {
  const pages = [];
  const start = Math.max(1, currentPage.value - 2);
  const end = Math.min(totalPages.value, currentPage.value + 2);
  for (let i = start; i <= end; i++) pages.push(i);
  return pages;
});

// Methods
async function loadContacts() {
  loading.value = true;
  try {
    const params = { page: currentPage.value, per_page: perPage.value, q: searchQuery.value || undefined, accountId: filters.value.accountId || undefined };
    const contactResult = await crmApi.getContacts(getTenantId(), params);
    const contactedLeadsResult = await crmApi.getLeads(getTenantId(), { ...params, stage: 'contacted' });
    const combinedItems = [
      ...(contactResult.items || []).map(c => ({ ...c, entityType: 'contact' })),
      ...(contactedLeadsResult.items || []).map(l => ({ ...l, entityType: 'lead' }))
    ];
    const seenIds = new Set();
    contacts.value = combinedItems.filter(item => {
      const uid = `${item.entityType}-${item.id}`;
      if (seenIds.has(uid)) return false;
      seenIds.add(uid);
      return true;
    });
    totalContacts.value = (contactResult.total || 0) + (contactedLeadsResult.total || 0);
  } catch (error) {
    console.error('Error loading contacts:', error);
  } finally {
    loading.value = false;
  }
}

async function loadAccounts() {
  try {
    const result = await crmApi.getAccounts(getTenantId(), { per_page: 1000 });
    accounts.value = result.items || [];
  } catch (error) {
    console.error('Error loading accounts:', error);
  }
}

function getInitials(contact) {
  if (typeof contact === 'string') return contact.substring(0, 2).toUpperCase();
  if (contact.entityType === 'lead' || (!contact.firstName && !contact.lastName && contact.name)) return (contact.name?.[0] || '?').toUpperCase();
  const first = contact.firstName?.[0] || '';
  const last = contact.lastName?.[0] || '';
  return (first + last).toUpperCase() || '?';
}

function callContact(contact) { emit('call', contact); }
function whatsappContact(contact) { emit('whatsapp', contact); }
function viewContact(contact) { selectedContact.value = contact; showDetailModal.value = true; }
function editContact(contact) { editingContact.value = contact; showFormModal.value = true; }
function confirmDelete(contact) { contactToDelete.value = contact; showDeleteConfirm.value = true; }

async function deleteContact() {
  if (!contactToDelete.value) return;
  deleting.value = true;
  try {
    if (contactToDelete.value.entityType === 'lead') await crmApi.deleteLead(contactToDelete.value.id, getTenantId());
    else await crmApi.deleteContact(contactToDelete.value.id, getTenantId());
    showDeleteConfirm.value = false;
    contactToDelete.value = null;
    await loadContacts();
    emitCrmEvent('crm:contacts:changed');
  } catch (error) {
    console.error('Error deleting:', error);
  } finally {
    deleting.value = false;
  }
}

function handleContactSaved() {
  showFormModal.value = false;
  showCreateModal.value = false;
  editingContact.value = null;
  loadContacts();
  emitCrmEvent('crm:contacts:changed');
}

function changePage(page) {
  if (page >= 1 && page <= totalPages.value) { currentPage.value = page; loadContacts(); }
}

let searchTimeout;
function debouncedSearch() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => { currentPage.value = 1; loadContacts(); }, 500);
}

function handleViewAccount(accountId) { emitCrmEvent('crm:viewAccount', { accountId }); }

onMounted(() => {
  loadContacts();
  loadAccounts();
  const unwatchContacts = onCrmEvent('crm:contacts:changed', () => loadContacts());
  return () => unwatchContacts();
});
</script>

<style scoped>
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
