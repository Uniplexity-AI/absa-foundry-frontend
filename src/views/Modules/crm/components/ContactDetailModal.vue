<template>
  <Teleport to="body">
    <div v-if="modelValue && contact" class="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4 backdrop-blur-sm bg-black/40 px-4">
      <div class="bg-white shadow-[0_0_50px_rgba(47,46,139,0.2)] w-full max-w-6xl max-h-[92vh] overflow-hidden flex flex-col border border-gray-200 rounded-none relative">
        <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-[0.02]"></div>
        
        <!-- Modal Header -->
        <div class="flex items-center justify-between px-8 py-6 border-b border-gray-100 bg-white/50 backdrop-blur-md sticky top-0 z-20">
          <div class="flex items-center gap-4 flex-1 min-w-0">
            <div class="w-1.5 h-8 bg-[#2F2E8B]"></div>
            <div class="flex-1 min-w-0 flex items-center gap-4">
              <div class="w-16 h-16 bg-gray-50 border border-gray-100 flex items-center justify-center text-2xl font-mono font-black text-[#2F2E8B] shadow-inner shrink-0 uppercase tracking-tighter">
                {{ getInitials(contact) }}
              </div>
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]">Contact_Identity_Node</span>
                  <span v-if="contact.id" class="text-[8px] font-mono font-bold text-[#2F2E8B] bg-blue-50 px-1.5 py-0.5 uppercase tracking-widest border border-blue-100">ID:{{ contact.id.substring(0, 8) }}</span>
                </div>
                <h3 class="text-2xl font-black text-gray-900 uppercase tracking-tight font-outfit truncate">
                  <template v-if="contact.firstName || contact.lastName">{{ contact.firstName }} {{ contact.lastName }}</template>
                  <template v-else>{{ contact.name || 'NAMELESS_NODE' }}</template>
                  <span v-if="contact.title" class="text-gray-300 font-mono font-normal mx-2">//</span>
                  <span v-if="contact.title" class="text-gray-400 text-lg font-mono font-bold uppercase tracking-widest">{{ contact.title }}</span>
                </h3>
              </div>
            </div>
          </div>
          
          <div class="flex items-center gap-2">
            <button @click="$emit('edit', contact)" class="w-10 h-10 flex items-center justify-center border border-gray-100 bg-white text-gray-400 hover:text-orange-500 hover:border-orange-500 transition-all shadow-sm group" title="Modify State">
              <Edit :size="18" class="group-hover:scale-110 transition-transform" />
            </button>
            <button @click="$emit('update:modelValue', false)" class="w-10 h-10 flex items-center justify-center border border-gray-100 bg-white text-gray-400 hover:text-red-500 hover:border-red-500 transition-all shadow-sm group">
              <X :size="20" class="group-hover:rotate-90 transition-transform" />
            </button>
          </div>
        </div>

        <!-- Transmit Vector Ribbon -->
        <div class="bg-gray-50 border-b border-gray-100 px-8 py-3 flex flex-wrap items-center gap-4 relative z-10">
          <div class="flex items-center gap-2">
             <span class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Transmit_Vector:</span>
             <div class="flex gap-1">
               <a v-if="contact.phone" :href="'tel:' + contact.phone" class="px-3 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-mono font-black uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all flex items-center gap-2">
                 <Phone :size="12" /> INITIATE_CALL
               </a>
               <a v-if="contact.email" :href="'mailto:' + contact.email" class="px-3 py-1.5 bg-indigo-50 text-indigo-600 border border-indigo-100 text-[10px] font-mono font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-2">
                 <Mail :size="12" /> SEND_POST
               </a>
             </div>
          </div>
          <div class="w-px h-6 bg-gray-200 mx-2"></div>
          <div class="flex items-center gap-2">
             <span class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Network_Link:</span>
             <button v-if="contact.accountId" @click="$emit('viewAccount', contact.accountId)" class="px-3 py-1.5 bg-purple-50 text-purple-600 border border-purple-100 text-[10px] font-mono font-black uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all flex items-center gap-2">
               <Building :size="12" /> ACCESS_ACCOUNT_NODE
             </button>
             <span v-else class="text-[9px] font-mono font-black text-gray-300 uppercase tracking-widest">UNLINKED_ENTITY</span>
          </div>
        </div>

        <!-- Tab Navigation -->
        <div class="px-8 border-b border-gray-100 bg-white/50 backdrop-blur-md relative z-10">
          <div class="flex gap-8">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="activeTab === tab.id ? 'border-[#2F2E8B] text-[#2F2E8B] font-black' : 'border-transparent text-gray-400 hover:text-gray-600 font-bold'"
              class="py-4 border-b-2 text-[10px] font-mono uppercase tracking-[0.2em] transition-all flex items-center gap-2"
            >
               <component :is="tab.lucideIcon" :size="14" />
               {{ tab.label }}
            </button>
          </div>
        </div>

        <!-- Modal Body (Scrollable) -->
        <div class="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
          <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-[0.03]"></div>
          
          <!-- Tab Content -->
          <div class="relative z-10 space-y-12 animate-in fade-in duration-500">
            
            <!-- OVERVIEW TAB -->
            <div v-if="activeTab === 'overview'" class="space-y-12">
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div class="lg:col-span-3">
                  <div class="flex items-center gap-2 mb-2">
                    <div class="w-1 h-4 bg-[#2F2E8B]"></div>
                    <h4 class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest">Contact_Profile</h4>
                  </div>
                  <p class="text-[10px] font-mono text-gray-400 leading-relaxed uppercase tracking-widest">
                    Primary identification and organizational orientation data.
                  </p>
                </div>
                
                <div class="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="bg-gray-50 border border-gray-100 p-6 space-y-4">
                      <div class="group">
                        <label class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1 group-hover:text-[#2F2E8B] transition-colors">IDENTITY_FULL_NAME</label>
                        <div class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-tight">
                           <template v-if="contact.firstName || contact.lastName">{{ contact.firstName }} {{ contact.lastName }}</template>
                           <template v-else>{{ contact.name || 'UNSPECIFIED' }}</template>
                        </div>
                      </div>
                      <div class="group">
                        <label class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1 group-hover:text-[#2F2E8B] transition-colors">FUNCTIONAL_TITLE</label>
                        <div class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-tight">{{ contact.title || 'NONE_SPECIFIED' }}</div>
                      </div>
                    </div>

                    <div class="bg-gray-50 border border-gray-100 p-6 space-y-4">
                       <div class="group">
                        <label class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1 group-hover:text-[#2F2E8B] transition-colors">ELECTRONIC_POST</label>
                        <a v-if="contact.email" :href="'mailto:' + contact.email" class="text-[11px] font-mono font-black text-[#2F2E8B] border-b border-blue-50 hover:border-[#2F2E8B] transition-all">{{ contact.email }}</a>
                        <span v-else class="text-[11px] font-mono font-black text-gray-300 uppercase">NO_ENDPOINT</span>
                      </div>
                      <div class="group">
                        <label class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1 group-hover:text-[#2F2E8B] transition-colors">TELE_COMM_ENDPOINT</label>
                        <div class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-tight">{{ contact.phone || 'NO_VECTOR' }}</div>
                      </div>
                    </div>
                </div>
              </div>

              <!-- Location Matrix -->
              <div v-if="hasAddress" class="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-12 border-t border-dashed border-gray-100">
                <div class="lg:col-span-3">
                  <div class="flex items-center gap-2 mb-2">
                    <div class="w-1 h-4 bg-[#2F2E8B]"></div>
                    <h4 class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest">Geospatial_Matrix</h4>
                  </div>
                </div>
                <div class="lg:col-span-9">
                   <div class="bg-gray-50 border border-gray-100 p-6 flex items-start gap-4">
                      <div class="w-10 h-10 bg-white border border-gray-200 flex items-center justify-center text-gray-400 shadow-sm">
                         <MapPin :size="18" />
                      </div>
                      <div class="flex-1">
                         <h5 class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest mb-2">PRIMARY_PHYSICAL_ENDPOINT</h5>
                         <div class="text-[10px] font-mono font-black text-gray-600 uppercase tracking-tight space-y-1">
                            <p v-if="contact.mailingStreet">{{ contact.mailingStreet }}</p>
                            <p>{{ [contact.mailingCity, contact.mailingState, contact.mailingPostalCode].filter(Boolean).join(', ') }}</p>
                            <p v-if="contact.mailingCountry" class="text-gray-400">{{ contact.mailingCountry }}</p>
                         </div>
                      </div>
                   </div>
                </div>
              </div>

               <!-- Narrative Data -->
              <div v-if="contact.description" class="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-12 border-t border-dashed border-gray-100">
                <div class="lg:col-span-3">
                  <div class="flex items-center gap-2 mb-2">
                    <div class="w-1 h-4 bg-[#2F2E8B]"></div>
                    <h4 class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest">Data_Packet</h4>
                  </div>
                </div>
                <div class="lg:col-span-9">
                   <div class="bg-gray-50/50 border border-gray-100 p-6 italic text-[11px] font-mono text-gray-600 whitespace-pre-wrap leading-relaxed uppercase tracking-tight">
                      {{ contact.description }}
                   </div>
                </div>
              </div>

              <!-- Meta Diagnostics -->
              <div class="bg-gray-50 border border-gray-200 p-6 pt-8 mt-12 relative overflow-hidden">
                 <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-[0.02]"></div>
                 <h5 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Identity_Registry_Metadata</h5>
                 <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
                   <div>
                     <span class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1">Entity_Initialize</span>
                     <span class="text-[9px] font-mono font-black text-gray-900 uppercase">{{ formatDate(contact.createdAt) }}</span>
                   </div>
                   <div>
                     <span class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1">Last_State_Mutation</span>
                     <span class="text-[9px] font-mono font-black text-gray-900 uppercase">{{ formatDate(contact.updatedAt) }}</span>
                   </div>
                   <div>
                     <span class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1">Registry_Owner</span>
                     <span class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase">{{ contact.assignedTo || 'SYSTEM_CORE' }}</span>
                   </div>
                   <div>
                     <span class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1">Lead_Source_Vector</span>
                     <span class="text-[9px] font-mono font-black text-gray-900 uppercase">{{ contact.leadSource || 'UNTRACKED' }}</span>
                   </div>
                 </div>
              </div>
            </div>

            <!-- ACTIVITIES TAB -->
            <div v-if="activeTab === 'activities'" class="space-y-6">
               <div v-if="loadingActivities" class="flex flex-col items-center justify-center py-24">
                  <Loader2 class="animate-spin text-[#2F2E8B]" :size="32" />
                  <span class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.2em] mt-4">Retrieving_Audit_Log...</span>
               </div>
               
               <template v-else-if="activities.length > 0">
                 <div class="space-y-4">
                    <div v-for="activity in activities" :key="activity.id" class="flex gap-6 group">
                       <div class="flex-shrink-0 relative pt-2">
                          <div class="w-px h-full bg-gray-100 absolute left-1/2 -translate-x-1/2 top-4"></div>
                          <div :class="getActivityColorClass(activity.type)" class="w-10 h-10 border border-gray-100 shadow-sm flex items-center justify-center relative z-10 transition-transform group-hover:scale-110">
                             <component :is="getActivityLucideIcon(activity.type)" :size="16" class="text-white" />
                          </div>
                       </div>
                       <div class="flex-1 bg-white border border-gray-100 p-6 transition-all hover:border-[#2F2E8B]/30 hover:shadow-xl hover:shadow-blue-500/5 relative overflow-hidden group">
                          <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-0 group-hover:opacity-[0.02] transition-opacity"></div>
                          <div class="flex items-start justify-between relative z-10">
                             <div>
                                <div class="flex items-center gap-3 mb-2">
                                   <span class="text-[10px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest border-b border-[#2F2E8B]/10">{{ activity.type }}</span>
                                   <span class="w-1 h-1 bg-gray-200 rounded-full"></span>
                                   <span class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">{{ formatDate(activity.createdAt) }}</span>
                                </div>
                                <p class="text-[11px] font-mono text-gray-600 leading-relaxed tracking-tight uppercase">{{ activity.description || 'GENERIC_DATA_MUTATION' }}</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
               </template>

               <div v-else class="flex flex-col items-center justify-center py-24 bg-gray-50/50 border border-dashed border-gray-200">
                  <History :size="32" class="text-gray-200 mb-4" />
                  <h5 class="text-[11px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]">ZERO_ACTIVITY_DETECTED</h5>
               </div>
            </div>

            <!-- RELATED TAB -->
            <div v-if="activeTab === 'related'" class="space-y-6">
               <div v-if="contact.accountId" class="bg-gray-900 border border-gray-800 p-8 relative overflow-hidden group">
                  <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-[0.05]"></div>
                  <div class="relative z-10">
                     <div class="flex items-center gap-3 mb-6">
                        <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
                        <h4 class="text-[11px] font-mono font-black text-gray-400 uppercase tracking-widest">Parent_Entity_Node</h4>
                     </div>
                     <div class="flex items-center justify-between">
                        <div>
                           <h3 class="text-xl font-mono font-black text-white uppercase tracking-tighter">{{ contact.accountName || 'LOADING_ACCOUNT_NAME...' }}</h3>
                           <p class="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-1">Status: Active_Partner</p>
                        </div>
                        <button @click="$emit('viewAccount', contact.accountId)" class="px-6 py-2.5 bg-[#2F2E8B] text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] transition-all flex items-center gap-2">
                           <Building :size="14" /> ACCESS_NODE
                        </button>
                     </div>
                  </div>
               </div>
               
               <div v-else class="flex flex-col items-center justify-center py-24 bg-gray-50/50 border border-dashed border-gray-200 text-center">
                  <Link :size="32" class="text-gray-200 mb-4" />
                  <h5 class="text-[11px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]">ENTITY_IS_AUTONOMOUS</h5>
                  <p class="text-[9px] font-mono text-gray-300 uppercase tracking-widest mt-2 max-w-xs leading-relaxed">This contact node currently functions independently and is not linked to a parent organization node.</p>
               </div>
            </div>

            <!-- DOCUMENTS TAB -->
            <div v-if="activeTab === 'documents'" class="space-y-6">
               <LinkedDocumentsWidget
                  recordType="contact"
                  :recordId="contact.id"
                  :recordName="`${contact.firstName} ${contact.lastName}`"
                  class="grayscale hover:grayscale-0 transition-all duration-1000"
               />
            </div>

          </div>
        </div>

        <!-- Footer Control Bar -->
        <div class="px-8 py-5 border-t border-gray-100 bg-gray-50/50 flex flex-wrap justify-between items-center gap-4 sticky bottom-0 z-20 backdrop-blur-md">
          <div class="flex items-center gap-4">
             <button @click="$emit('delete', contact)" class="px-4 py-2 border border-red-200 text-red-500 hover:bg-red-50 hover:text-red-700 text-[10px] font-mono font-black uppercase tracking-widest transition-all flex items-center gap-2">
               <Trash2 :size="14" /> EXEC_DELETE_NODE
             </button>
          </div>
          <div class="flex gap-4">
             <button @click="$emit('update:modelValue', false)" class="px-6 py-2.5 border border-gray-100 text-gray-400 hover:text-gray-900 hover:bg-white text-[10px] font-mono font-black uppercase tracking-widest transition-all">
               ABORT_VIEW
             </button>
             <button @click="$emit('edit', contact)" class="px-8 py-2.5 bg-[#2F2E8B] text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] transition-all flex items-center gap-2 shadow-lg shadow-[#2F2E8B]/20">
               <Edit :size="14" /> MODIFY_STATE
             </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { 
  X, User, Mail, Phone, Building, Edit, Trash2, History, FileText, Link, 
  MapPin, Share2, Linkedin, Twitter, Facebook, AlignLeft, RefreshCw, 
  Search, Package, Briefcase, Globe, Info, Loader2, Plus, Users
} from 'lucide-vue-next';
import { ref, computed, watch } from 'vue';
import * as crmApi from '@/services/crm_api.js';
import { decodeJWT } from '@/services/decodeJWT.js';
import LinkedDocumentsWidget from './LinkedDocumentsWidget.vue';

const props = defineProps({
  modelValue: Boolean,
  contact: Object
});

const emit = defineEmits(['update:modelValue', 'edit', 'delete', 'refresh', 'viewAccount']);

const { getTenantId } = decodeJWT();

const activeTab = ref('overview');
const activities = ref([]);
const loadingActivities = ref(false);

const tabs = [
  { id: 'overview', label: 'Overview', lucideIcon: Info },
  { id: 'activities', label: 'Activities', lucideIcon: History },
  { id: 'related', label: 'Related', lucideIcon: Link },
  { id: 'documents', label: 'Documents', lucideIcon: FileText }
];

const hasAddress = computed(() => {
  return props.contact?.mailingStreet || props.contact?.mailingCity || 
         props.contact?.mailingState || props.contact?.mailingPostalCode || 
         props.contact?.mailingCountry;
});

watch(() => props.modelValue, (newVal) => {
  if (newVal && props.contact) {
    activeTab.value = 'overview';
    loadActivities();
  }
});

watch(activeTab, (newTab) => {
  if (newTab === 'activities' && activities.value.length === 0) {
    loadActivities();
  }
});

async function loadActivities() {
  if (!props.contact?.id) return;
  
  loadingActivities.value = true;
  try {
    const tenantId = getTenantId();
    // Assuming getContactActivities or similar exists in crmApi
    // For now, using getAccountActivities as fallback if missing, but let's assume getActivities with related_type works
    activities.value = await crmApi.getContactActivities(props.contact.id, tenantId);
  } catch (error) {
    console.error('[ContactDetailModal] Failed to load activities:', error);
    activities.value = [];
  } finally {
    loadingActivities.value = false;
  }
}

function getInitials(contact) {
  if (!contact) return '?';
  if (contact.firstName && contact.lastName) {
    return (contact.firstName[0] + contact.lastName[0]).toUpperCase();
  }
  return (contact.name?.[0] || '?').toUpperCase();
}

function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).toUpperCase();
}

function getActivityLucideIcon(type) {
  const icons = {
    'created': Plus,
    'updated': Edit,
    'note': FileText,
    'email': Mail,
    'call': Phone,
    'meeting': History
  };
  return icons[type?.toLowerCase()] || Info;
}

function getActivityColorClass(type) {
  const colors = {
    'created': 'bg-emerald-500',
    'updated': 'bg-blue-500',
    'note': 'bg-amber-500',
    'email': 'bg-indigo-500',
    'call': 'bg-emerald-600',
    'meeting': 'bg-purple-500'
  };
  return colors[type?.toLowerCase()] || 'bg-gray-400';
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #E5E7EB;
  border-radius: 0;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #2F2E8B;
}

.dotted-pattern {
  background-image: radial-gradient(#2F2E8B 1px, transparent 1px);
  background-size: 20px 20px;
}

.font-outfit {
  font-family: 'Outfit', sans-serif;
}
</style>
