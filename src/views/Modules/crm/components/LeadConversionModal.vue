<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[10001] p-2 md:p-4 font-mono"
      @click.self="$emit('update:modelValue', false)"
    >
      <div class="bg-white border border-gray-200 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
      <!-- Header -->
      <div class="sticky top-0 bg-[#2F2E8B] border-b border-white/20 p-4 md:p-6 flex items-center justify-between z-10 flex-shrink-0">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <div class="w-1.5 h-5 bg-white/40"></div>
            <h3 class="text-sm md:text-base font-black uppercase tracking-widest text-white">Convert Lead</h3>
          </div>
          <p class="text-xs text-blue-200 uppercase tracking-wider truncate pl-3.5">{{ lead?.name }} → Contact / Account / Deal</p>
        </div>
        <button
          @click="$emit('update:modelValue', false)"
          class="w-9 h-9 flex items-center justify-center border border-white/30 bg-white/10 text-white hover:bg-white/20 transition flex-shrink-0"
        >
          <X :size="16" />
        </button>
      </div>

      <!-- Body -->
      <div class="p-3 md:p-6 space-y-4 md:space-y-6 flex-1 overflow-y-auto custom-scrollbar">
        <!-- Lead Information Summary -->
        <div class="border border-dashed border-[#2F2E8B]/40 bg-[#2F2E8B]/[0.04] p-3 md:p-4">
          <h4 class="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#2F2E8B] mb-3">
            <Info :size="13" /> Lead Information
          </h4>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            <div>
              <div class="text-gray-400 uppercase tracking-wider mb-0.5">Name</div>
              <div class="font-semibold text-gray-800 truncate">{{ lead?.name || '—' }}</div>
            </div>
            <div>
              <div class="text-gray-400 uppercase tracking-wider mb-0.5">Email</div>
              <div class="font-semibold text-gray-800 truncate">{{ lead?.email || '—' }}</div>
            </div>
            <div>
              <div class="text-gray-400 uppercase tracking-wider mb-0.5">Phone</div>
              <div class="font-semibold text-gray-800">{{ lead?.phone || '—' }}</div>
            </div>
            <div>
              <div class="text-gray-400 uppercase tracking-wider mb-0.5">Company</div>
              <div class="font-semibold text-gray-800 truncate">{{ lead?.company || '—' }}</div>
            </div>
          </div>
        </div>

        <!-- Step Indicator -->
        <div class="flex items-center overflow-x-auto pb-1">
          <template v-for="(stepItem, idx) in steps" :key="idx">
            <div class="flex items-center gap-1.5 flex-shrink-0">
              <div
                class="flex items-center justify-center w-7 h-7 text-xs font-bold uppercase tracking-wider border-2 transition-all"
                :class="step === idx
                  ? 'bg-[#2F2E8B] border-[#2F2E8B] text-white'
                  : step > idx
                    ? 'bg-[#2F2E8B]/10 border-[#2F2E8B]/40 text-[#2F2E8B]'
                    : 'bg-white border-gray-300 text-gray-400'"
              >
                <Check v-if="step > idx" :size="12" />
                <span v-else>{{ idx + 1 }}</span>
              </div>
              <span
                class="text-xs uppercase tracking-widest"
                :class="step === idx ? 'text-[#2F2E8B] font-bold' : step > idx ? 'text-[#2F2E8B]/60' : 'text-gray-400'"
              >{{ stepItem }}</span>
            </div>
            <div v-if="idx < steps.length - 1" class="flex-1 min-w-[20px] h-px mx-2"
              :class="step > idx ? 'bg-[#2F2E8B]/40' : 'bg-gray-200'"></div>
          </template>
        </div>

        <!-- Step 1: Contact -->
        <div v-if="step === 0" class="space-y-3 md:space-y-4">
          <h4 class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-700 border-b border-dashed border-gray-200 pb-2">
            <User :size="13" class="text-[#2F2E8B]" /> Create Contact
          </h4>

          <div class="flex flex-wrap gap-2 mb-3">
            <label
              v-for="opt in [['create','Create New'],['existing','Link Existing'],['skip','Skip']]"
              :key="opt[0]"
              class="flex items-center gap-1.5 px-3 py-1.5 border text-xs uppercase tracking-wider cursor-pointer transition-all"
              :class="contactOption === opt[0] ? 'border-[#2F2E8B] bg-[#2F2E8B] text-white' : 'border-gray-300 text-gray-500 hover:border-[#2F2E8B]'"
            >
              <input type="radio" v-model="contactOption" :value="opt[0]" class="hidden" />
              {{ opt[1] }}
            </label>
          </div>

          <!-- Create New Contact Form -->
          <div v-if="contactOption === 'create'" class="space-y-3 border border-dashed border-gray-200 p-3 md:p-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs uppercase tracking-wider text-gray-500 mb-1">First Name <span class="text-red-500">*</span></label>
                <input v-model="contactData.firstName" type="text"
                  class="w-full px-3 py-2 text-xs border border-gray-300 bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none transition"
                  placeholder="First name" />
              </div>
              <div>
                <label class="block text-xs uppercase tracking-wider text-gray-500 mb-1">Last Name <span class="text-red-500">*</span></label>
                <input v-model="contactData.lastName" type="text"
                  class="w-full px-3 py-2 text-xs border border-gray-300 bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none transition"
                  placeholder="Last name" />
              </div>
            </div>
            <div>
              <label class="block text-xs uppercase tracking-wider text-gray-500 mb-1">Email <span class="text-red-500">*</span></label>
              <input v-model="contactData.email" type="email"
                class="w-full px-3 py-2 text-xs border border-gray-300 bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none transition"
                placeholder="contact@email.com" />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs uppercase tracking-wider text-gray-500 mb-1">Phone</label>
                <input v-model="contactData.phone" type="text"
                  class="w-full px-3 py-2 text-xs border border-gray-300 bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none transition"
                  placeholder="+260 XXX XXX XXX" />
              </div>
              <div>
                <label class="block text-xs uppercase tracking-wider text-gray-500 mb-1">Job Title</label>
                <input v-model="contactData.title" type="text"
                  class="w-full px-3 py-2 text-xs border border-gray-300 bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none transition"
                  placeholder="e.g., Marketing Manager" />
              </div>
            </div>
          </div>

          <!-- Link to Existing Contact -->
          <div v-if="contactOption === 'existing'" class="border border-dashed border-gray-200 p-3 md:p-4">
            <label class="block text-xs uppercase tracking-wider text-gray-500 mb-2">Search Contacts</label>
            <div class="relative">
              <Search :size="13" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input v-model="contactSearch" @input="searchContacts" type="text"
                class="w-full pl-8 pr-3 py-2 text-xs border border-gray-300 bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none transition"
                placeholder="Search by name or email..." />
            </div>
            <div v-if="searchedContacts.length > 0" class="mt-2 space-y-1 max-h-44 overflow-y-auto custom-scrollbar">
              <div v-for="contact in searchedContacts" :key="contact.id"
                @click="selectContact(contact)"
                class="px-3 py-2 border cursor-pointer transition text-xs"
                :class="selectedContactId === contact.id ? 'border-[#2F2E8B] bg-[#2F2E8B]/5 text-[#2F2E8B]' : 'border-gray-200 bg-white hover:border-[#2F2E8B]/40'">
                <div class="font-semibold uppercase tracking-wide">{{ contact.firstName }} {{ contact.lastName }}</div>
                <div class="text-gray-400 truncate">{{ contact.email }}</div>
              </div>
            </div>
          </div>

          <!-- Skip Notice -->
          <div v-if="contactOption === 'skip'" class="text-xs text-gray-400 uppercase tracking-wider border border-dashed border-gray-200 p-3">
            No contact will be created for this lead.
          </div>
        </div>

        <!-- Step 2: Account -->
        <div v-if="step === 1" class="space-y-3 md:space-y-4">
          <h4 class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-700 border-b border-dashed border-gray-200 pb-2">
            <Building2 :size="13" class="text-[#2F2E8B]" /> Create Account
          </h4>

          <div class="flex flex-wrap gap-2 mb-3">
            <label
              v-for="opt in [['create','Create New'],['existing','Link Existing'],['skip','Skip']]"
              :key="opt[0]"
              class="flex items-center gap-1.5 px-3 py-1.5 border text-xs uppercase tracking-wider cursor-pointer transition-all"
              :class="accountOption === opt[0] ? 'border-[#2F2E8B] bg-[#2F2E8B] text-white' : 'border-gray-300 text-gray-500 hover:border-[#2F2E8B]'"
            >
              <input type="radio" v-model="accountOption" :value="opt[0]" class="hidden" />
              {{ opt[1] }}
            </label>
          </div>

          <!-- Create New Account Form -->
          <div v-if="accountOption === 'create'" class="space-y-3 border border-dashed border-gray-200 p-3 md:p-4">
            <div>
              <label class="block text-xs uppercase tracking-wider text-gray-500 mb-1">Account Name <span class="text-red-500">*</span></label>
              <input v-model="accountData.name" type="text"
                class="w-full px-3 py-2 text-xs border border-gray-300 bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none transition"
                placeholder="Company name" />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs uppercase tracking-wider text-gray-500 mb-1">Website</label>
                <input v-model="accountData.website" type="text"
                  class="w-full px-3 py-2 text-xs border border-gray-300 bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none transition"
                  placeholder="https://company.com" />
              </div>
              <div>
                <label class="block text-xs uppercase tracking-wider text-gray-500 mb-1">Phone</label>
                <input v-model="accountData.phone" type="text"
                  class="w-full px-3 py-2 text-xs border border-gray-300 bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none transition"
                  placeholder="+260 XXX XXX XXX" />
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs uppercase tracking-wider text-gray-500 mb-1">Industry</label>
                <input v-model="accountData.industry" type="text"
                  class="w-full px-3 py-2 text-xs border border-gray-300 bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none transition"
                  placeholder="e.g., Technology, Finance" />
              </div>
              <div>
                <label class="block text-xs uppercase tracking-wider text-gray-500 mb-1">Type</label>
                <select v-model="accountData.type"
                  class="w-full px-3 py-2 text-xs border border-gray-300 bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none transition">
                  <option value="Customer">Customer</option>
                  <option value="Prospect">Prospect</option>
                  <option value="Partner">Partner</option>
                  <option value="Competitor">Competitor</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Link to Existing Account -->
          <div v-if="accountOption === 'existing'" class="border border-dashed border-gray-200 p-3 md:p-4">
            <label class="block text-xs uppercase tracking-wider text-gray-500 mb-2">Search Accounts</label>
            <div class="relative">
              <Search :size="13" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input v-model="accountSearch" @input="searchAccounts" type="text"
                class="w-full pl-8 pr-3 py-2 text-xs border border-gray-300 bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none transition"
                placeholder="Search by company name..." />
            </div>
            <div v-if="searchedAccounts.length > 0" class="mt-2 space-y-1 max-h-44 overflow-y-auto custom-scrollbar">
              <div v-for="account in searchedAccounts" :key="account.id"
                @click="selectAccount(account)"
                class="px-3 py-2 border cursor-pointer transition text-xs"
                :class="selectedAccountId === account.id ? 'border-[#2F2E8B] bg-[#2F2E8B]/5 text-[#2F2E8B]' : 'border-gray-200 bg-white hover:border-[#2F2E8B]/40'">
                <div class="font-semibold uppercase tracking-wide">{{ account.name }}</div>
                <div class="text-gray-400">{{ account.industry || 'No industry' }}</div>
              </div>
            </div>
          </div>

          <!-- Skip Notice -->
          <div v-if="accountOption === 'skip'" class="text-xs text-gray-400 uppercase tracking-wider border border-dashed border-gray-200 p-3">
            No account will be created for this lead.
          </div>
        </div>

        <!-- Step 3: Deal -->
        <div v-if="step === 2" class="space-y-3 md:space-y-4">
          <h4 class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-700 border-b border-dashed border-gray-200 pb-2">
            <Handshake :size="13" class="text-[#2F2E8B]" /> Edit Deal <span class="text-[10px] text-emerald-600 font-bold ml-auto">Auto-created</span>
          </h4>

          <!-- Deal Edit Form - always shown -->
          <div class="space-y-3 border border-gray-200 p-3 md:p-4">
            <div>
              <label class="block text-xs uppercase tracking-wider text-gray-500 mb-1">Deal Name</label>
              <input v-model="dealData.name" type="text"
                class="w-full px-3 py-2 text-xs border border-gray-300 bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none transition"
                :placeholder="`${lead?.name || 'Converted'} Deal`" />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs uppercase tracking-wider text-gray-500 mb-1">Value (ZMW)</label>
                <input v-model.number="dealData.value" type="number"
                  class="w-full px-3 py-2 text-xs border border-gray-300 bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none transition"
                  placeholder="0.00" />
              </div>
              <div>
                <label class="block text-xs uppercase tracking-wider text-gray-500 mb-1">Stage</label>
                <select v-model="dealData.stage"
                  class="w-full px-3 py-2 text-xs border border-gray-300 bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none transition">
                  <option value="Negotiation">Negotiation</option>
                  <option value="Closed Won">Closed Won</option>
                  <option value="Closed Lost">Closed Lost</option>
                </select>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs uppercase tracking-wider text-gray-500 mb-1">Probability (%)</label>
                <input v-model.number="dealData.probability" type="number" min="0" max="100"
                  class="w-full px-3 py-2 text-xs border border-gray-300 bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none transition"
                  placeholder="100" />
              </div>
              <div>
                <label class="block text-xs uppercase tracking-wider text-gray-500 mb-1">Close Date</label>
                <input v-model="dealData.expectedCloseDate" type="date"
                  class="w-full px-3 py-2 text-xs border border-gray-300 bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none transition" />
              </div>
            </div>
            <div>
              <label class="block text-xs uppercase tracking-wider text-gray-500 mb-1">Description</label>
              <textarea v-model="dealData.description" rows="3"
                class="w-full px-3 py-2 text-xs border border-gray-300 bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none transition resize-none"
                :placeholder="`Auto-created from lead: ${lead?.name || 'Converted Lead'}`"></textarea>
            </div>
          </div>
        </div>

        <!-- Step 4: Review & Confirm -->
        <div v-if="step === 3" class="space-y-3">
          <h4 class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-700 border-b border-dashed border-gray-200 pb-2">
            <CheckCircle2 :size="13" class="text-emerald-600" /> Review & Confirm
          </h4>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <!-- Contact Summary -->
            <div class="border border-dashed border-gray-200 p-3">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-1.5">
                  <User :size="11" class="text-[#2F2E8B]" />
                  <span class="text-xs font-bold uppercase tracking-widest text-[#2F2E8B]">Contact</span>
                </div>
                <button @click="step = 0" class="text-[8px] font-mono font-bold text-[#2F2E8B] hover:underline uppercase tracking-widest">Edit</button>
              </div>
              <div v-if="contactOption === 'create'" class="space-y-1 text-xs">
                <div><span class="text-gray-400 uppercase tracking-wider">Name</span><br /><span class="font-semibold">{{ contactData.firstName }} {{ contactData.lastName }}</span></div>
                <div><span class="text-gray-400 uppercase tracking-wider">Email</span><br /><span class="font-semibold truncate block">{{ contactData.email }}</span></div>
                <div v-if="contactData.phone"><span class="text-gray-400 uppercase tracking-wider">Phone</span><br /><span class="font-semibold">{{ contactData.phone }}</span></div>
              </div>
              <div v-else-if="contactOption === 'existing'" class="text-xs">
                <span class="text-gray-400 uppercase tracking-wider">Linking ID</span><br />
                <span class="font-semibold font-mono text-[#2F2E8B]">{{ selectedContactId || '—' }}</span>
              </div>
              <div v-else class="text-xs text-gray-400 uppercase tracking-wider">Skipped</div>
            </div>

            <!-- Account Summary -->
            <div class="border border-dashed border-gray-200 p-3">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-1.5">
                  <Building2 :size="11" class="text-[#2F2E8B]" />
                  <span class="text-xs font-bold uppercase tracking-widest text-[#2F2E8B]">Account</span>
                </div>
                <button @click="step = 1" class="text-[8px] font-mono font-bold text-[#2F2E8B] hover:underline uppercase tracking-widest">Edit</button>
              </div>
              <div v-if="accountOption === 'create'" class="space-y-1 text-xs">
                <div><span class="text-gray-400 uppercase tracking-wider">Name</span><br /><span class="font-semibold truncate block">{{ accountData.name }}</span></div>
                <div v-if="accountData.website"><span class="text-gray-400 uppercase tracking-wider">Website</span><br /><span class="font-semibold truncate block">{{ accountData.website }}</span></div>
                <div v-if="accountData.industry"><span class="text-gray-400 uppercase tracking-wider">Industry</span><br /><span class="font-semibold">{{ accountData.industry }}</span></div>
              </div>
              <div v-else-if="accountOption === 'existing'" class="text-xs">
                <span class="text-gray-400 uppercase tracking-wider">Linking ID</span><br />
                <span class="font-semibold font-mono text-[#2F2E8B]">{{ selectedAccountId || '—' }}</span>
              </div>
              <div v-else class="text-xs text-gray-400 uppercase tracking-wider">Skipped</div>
            </div>

            <!-- Deal Summary -->
            <div class="border border-dashed border-gray-200 p-3">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-1.5">
                  <Handshake :size="11" class="text-[#2F2E8B]" />
                  <span class="text-xs font-bold uppercase tracking-widest text-[#2F2E8B]">Deal</span>
                </div>
                <button @click="step = 2" class="text-[8px] font-mono font-bold text-[#2F2E8B] hover:underline uppercase tracking-widest">Edit</button>
              </div>
              <div class="space-y-1 text-xs">
                <div><span class="text-gray-400 uppercase tracking-wider">Name</span><br /><span class="font-semibold truncate block">{{ dealData.name }}</span></div>
                <div><span class="text-gray-400 uppercase tracking-wider">Value</span><br /><span class="font-semibold">{{ formatCurrency(dealData.value || 0) }}</span></div>
                <div><span class="text-gray-400 uppercase tracking-wider">Stage</span><br /><span class="font-semibold">{{ dealData.stage }}</span></div>
              </div>
            </div>
          </div>

          <!-- Confirm message -->
          <div class="border border-gray-200 p-3 text-xs uppercase tracking-wider text-gray-700 font-bold">
            This will convert the lead to an account. A contact and deal will be auto-created under the account. Continue?
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="sticky bottom-0 bg-gray-50 px-4 md:px-6 py-3 md:py-4 flex justify-between items-center border-t border-gray-200 gap-2 flex-shrink-0">
        <button v-if="step > 0" @click="step--"
          class="flex items-center gap-1.5 px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-widest border border-gray-200 bg-white text-gray-500 hover:text-gray-700 hover:border-gray-300 transition">
          <ArrowLeft :size="12" /> Back
        </button>
        <div v-else></div>

        <div class="flex gap-2 md:gap-3">
          <button @click="$emit('update:modelValue', false)"
            class="px-5 py-2 text-[10px] font-mono font-bold uppercase tracking-widest border border-gray-200 bg-white text-gray-500 hover:text-red-500 hover:border-red-200 transition">
            Cancel
          </button>
          <button v-if="step < 3" @click="nextStep"
            class="flex items-center gap-1.5 px-5 py-2 text-[10px] font-mono font-bold uppercase tracking-widest bg-[#2F2E8B] text-white hover:bg-[#1D226B] transition shadow-lg shadow-[#2F2E8B]/20">
            Next <ArrowRight :size="12" />
          </button>
          <button v-else @click="convertLead" :disabled="loading"
            class="flex items-center gap-1.5 px-5 py-2 text-[10px] font-mono font-bold uppercase tracking-widest bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-lg shadow-emerald-600/20 disabled:opacity-50 disabled:cursor-not-allowed">
            <Check :size="12" /> {{ loading ? 'Converting...' : 'Convert Lead' }}
          </button>
        </div>
      </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { X, User, Building2, Handshake, CheckCircle2, Info, ArrowLeft, ArrowRight, Check, Search } from 'lucide-vue-next';
import { emit as emitCrmEvent } from '@/events/crmEvents.js';
import * as crmApi from '@/api_services/crm_api.js';
import { decodeJWT } from '@/api_services/decodeJWT.js';
import { useCurrency } from '@/composables/useCurrency';

const { getTenantId } = decodeJWT();
const { formatCurrency, currencySymbol } = useCurrency();

const props = defineProps({
  modelValue: Boolean,
  lead: Object
});

const emit = defineEmits(['update:modelValue', 'converted']);

const steps = ['Contact', 'Account', 'Deal', 'Review'];
const step = ref(0);
const loading = ref(false);

// Contact fields
const contactOption = ref('create');
const contactData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  title: ''
});
const contactSearch = ref('');
const searchedContacts = ref([]);
const selectedContactId = ref(null);

// Account fields
const accountOption = ref('create');
const accountData = ref({
  name: '',
  website: '',
  phone: '',
  industry: '',
  type: 'Prospect'
});
const accountSearch = ref('');
const searchedAccounts = ref([]);
const selectedAccountId = ref(null);

// Deal fields
const dealOption = ref('skip');
const dealData = ref({
  name: '',
  value: 0,
  stage: 'Negotiation',
  probability: 50,
  expectedCloseDate: '',
  description: ''
});

// Initialize data from lead when modal opens
watch(() => props.modelValue, (newVal) => {
  if (newVal && props.lead) {
    initializeFromLead();
  }
});

watch(() => props.lead, (newLead) => {
  if (newLead && props.modelValue) {
    initializeFromLead();
  }
});

function initializeFromLead() {
  const lead = props.lead;
  if (!lead) return;

  // Split lead name
  const nameParts = (lead.name || '').split(' ');
  contactData.value = {
    firstName: nameParts[0] || '',
    lastName: nameParts.slice(1).join(' ') || '',
    email: lead.email || '',
    phone: lead.phone || '',
    title: ''
  };

  accountData.value = {
    name: lead.company || '',
    website: lead.website || '',
    phone: lead.phone || '',
    industry: lead.industry || '',
    type: 'Prospect'
  };

  dealData.value = {
    name: `${lead.company || 'Opportunity'} - ${lead.name || 'Deal'}`,
    value: lead.value || 0,
    stage: 'Negotiation',
    probability: 50,
    expectedCloseDate: '',
    description: lead.notes || ''
  };

  // Reset step and options
  step.value = 0;
  contactOption.value = 'create';
  accountOption.value = 'create';
  dealOption.value = 'skip';
}

function nextStep() {
  if (step.value < 3) {
    step.value++;
  }
}

async function searchContacts() {
  if (contactSearch.value.length < 2) {
    searchedContacts.value = [];
    return;
  }
  try {
    const result = await crmApi.getContacts(getTenantId(), { q: contactSearch.value, per_page: 10 });
    searchedContacts.value = result.items || [];
  } catch (error) {
    console.error('Error searching contacts:', error);
    searchedContacts.value = [];
  }
}

function selectContact(contact) {
  selectedContactId.value = contact.id;
}

async function searchAccounts() {
  if (accountSearch.value.length < 2) {
    searchedAccounts.value = [];
    return;
  }
  try {
    const result = await crmApi.getAccounts(getTenantId(), { q: accountSearch.value, per_page: 10 });
    searchedAccounts.value = result.items || [];
  } catch (error) {
    console.error('Error searching accounts:', error);
    searchedAccounts.value = [];
  }
}

function selectAccount(account) {
  selectedAccountId.value = account.id;
}

async function convertLead() {
  if (!props.lead) return;

  // Validation
  if (contactOption.value === 'create' && (!contactData.value.firstName || !contactData.value.lastName || !contactData.value.email)) {
    alert('Please fill in required contact fields (First Name, Last Name, Email)');
    return;
  }
  if (accountOption.value === 'create' && !accountData.value.name) {
    alert('Please fill in required account field (Name)');
    return;
  }

  loading.value = true;
  try {
    const tenantId = getTenantId();
    const conversionPayload = {
      createContact: accountOption.value !== 'skip' ? true : (contactOption.value !== 'skip'),
      contactId: contactOption.value === 'existing' ? selectedContactId.value : null,
      contactData: contactOption.value === 'create' ? contactData.value : null,
      createAccount: accountOption.value !== 'skip',
      accountId: accountOption.value === 'existing' ? selectedAccountId.value : null,
      accountData: accountOption.value === 'create' ? accountData.value : null,
      createDeal: true, // Always create a deal when converting to account
      dealData: {
        name: (dealOption.value === 'create' && dealData.value.name) ? dealData.value.name : `${props.lead?.name || 'Converted'} Deal`,
        value: (dealOption.value === 'create' && dealData.value?.value) ? dealData.value.value : Number(props.lead?.value || 0),
        amount: (dealOption.value === 'create' && dealData.value?.value) ? dealData.value.value : Number(props.lead?.value || 0),
        stage: (dealOption.value === 'create' && dealData.value?.stage) ? dealData.value.stage : 'closed-won',
        probability: (dealOption.value === 'create' && dealData.value?.probability) ? dealData.value.probability : 100,
        expectedCloseDate: dealData.value?.expectedCloseDate || new Date().toISOString().split('T')[0],
        description: dealData.value?.description || `Auto-created from lead: ${props.lead?.name || 'Converted Lead'}`
      },
      // Keep lead visible in Lead Management with updated status
      convertedStatus: 'contacted'
    };

    // API expects: convertLead(leadId, tenantId, options)
    const result = await crmApi.convertLead(props.lead.id, tenantId, conversionPayload);

    // Ask the user whether to archive the converted lead. We do not auto-archive —
    // the lead stays visible on the Active leads page unless the user opts in.
    const created = [];
    if (conversionPayload.createAccount || conversionPayload.accountId) {
      created.push('Contact');
      created.push('Account');
      created.push('Deal');
    }
    const summary = created.length ? created.join(', ') : 'records';
    const wantsArchive = window.confirm(
      `Lead converted successfully (${summary}).\n\n` +
      `Do you want to archive "${props.lead.name || 'this lead'}" so it is removed from the active leads list?\n\n` +
      `Click OK to archive, or Cancel to keep it active.`
    );
    if (wantsArchive) {
      try {
        await crmApi.updateLead(
          props.lead.id,
          { ...props.lead, archived: true, tenant_id: tenantId },
          tenantId
        );
      } catch (archiveErr) {
        console.warn('Lead converted but failed to archive:', archiveErr);
      }
    }

    // Broadcast changes for all possibly affected entities
    emitCrmEvent('crm:leads:changed');
    if (conversionPayload.createAccount || conversionPayload.accountId) {
      emitCrmEvent('crm:contacts:changed');
      emitCrmEvent('crm:accounts:changed');
      emitCrmEvent('crm:deals:changed');
    }
    emit('converted', result);
    emit('update:modelValue', false);
  } catch (error) {
    console.error('Conversion error:', error);
    alert('Failed to convert lead: ' + (error.message || 'Unknown error'));
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
input:focus, select:focus, textarea:focus {
  outline: none;
}

/* Custom Select Styling - Show chevron on right without overlapping text */
select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%232F2E8B' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px;
  padding-right: 32px;
  cursor: pointer;
}
</style>
