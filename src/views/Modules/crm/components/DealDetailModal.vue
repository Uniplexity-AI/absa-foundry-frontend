<template>
  <Teleport to="body">
    <div v-if="modelValue" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-2 md:p-4 backdrop-blur-sm">
      <div class="bg-white border border-gray-200 shadow-[0_0_50px_rgba(47,46,139,0.2)] max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col relative rounded-none">
        <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-[0.02]"></div>
        
        <!-- Header -->
        <div class="bg-white border-b border-gray-100 p-6 relative z-10">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-1 h-4 bg-[#2F2E8B]"></div>
                <span class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">DEAL_IDENTIFIER // DETAILS</span>
              </div>
              <h2 class="text-2xl font-black text-gray-900 uppercase tracking-tight font-mono">{{ deal?.name }}</h2>
              
              <div class="flex flex-wrap items-center gap-4 mt-6">
                <div :class="getStageBadgeClass(deal?.stage)" class="inline-block px-3 py-1 border text-[10px] font-mono font-black uppercase tracking-widest rounded-sm">
                  {{ formatStage(deal?.stage) }}
                </div>
                
                <div class="flex items-center gap-4">
                  <div class="bg-gray-50 border border-gray-100 p-3 rounded-sm min-w-[120px]">
                    <div class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">VAL_ESTIMATE</div>
                    <div class="text-xl font-black text-[#2F2E8B] font-mono tracking-tighter">{{ formatCurrency(deal?.amount) }}</div>
                  </div>
                  <div class="bg-gray-50 border border-gray-100 p-3 rounded-sm min-w-[100px]">
                    <div class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">PROBABILITY</div>
                    <div class="text-xl font-black text-[#2F2E8B] font-mono tracking-tighter">{{ deal?.probability }}%</div>
                  </div>
                  <div class="bg-[#2F2E8B] border border-[#2F2E8B] p-3 rounded-sm min-w-[120px]">
                    <div class="text-[8px] font-mono font-bold text-blue-200 uppercase tracking-widest mb-1">WEIGHTED_VAL</div>
                    <div class="text-xl font-black text-white font-mono tracking-tighter">{{ formatCurrency(((deal?.amount || 0) * (deal?.probability || 0)) / 100) }}</div>
                  </div>
                </div>
              </div>
            </div>
            <button @click="close" class="p-2 border border-gray-100 rounded-sm hover:bg-gray-50 text-gray-400 hover:text-gray-900 transition ml-4">
              <X :size="20" />
            </button>
          </div>
        </div>

        <!-- Tabs -->
        <div class="border-b border-gray-100 bg-gray-50/50 relative z-10">
          <div class="flex gap-1 px-6 overflow-x-auto custom-scrollbar">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="activeTab === tab.id ? 'bg-white text-[#2F2E8B] border-x border-t border-gray-100 -mb-px font-black shadow-none' : 'text-gray-400 hover:text-gray-600 font-bold'"
              class="px-6 py-3 transition text-[10px] font-mono uppercase tracking-widest flex items-center gap-2 whitespace-nowrap"
            >
              <component :is="tab.lucideIcon" :size="14" />
              {{ tab.label }}
            </button>
          </div>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto p-3 md:p-6 custom-scrollbar">
          <!-- Overview Tab -->
          <div v-if="activeTab === 'overview'" class="space-y-6 relative z-10">
            <!-- Deal Information -->
            <div class="bg-white border border-gray-100 p-6 relative overflow-hidden rounded-sm">
              <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-[0.01]"></div>
              <h3 class="text-[10px] font-mono font-black text-[#2F2E8B] mb-6 flex items-center gap-2 uppercase tracking-widest">
                <Info :size="14" />
                DEAL_CORE_INFORMATION
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1">Deal_Identity</label>
                  <p class="text-[11px] font-mono font-black text-gray-900 uppercase">{{ deal?.name }}</p>
                </div>
                <div>
                  <label class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1">Pipeline_Stage</label>
                  <p class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-tighter">{{ formatStage(deal?.stage) }}</p>
                </div>
                <div>
                  <label class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1">Value_Assessment</label>
                  <p class="text-[11px] font-mono font-black text-[#2F2E8B]">{{ formatCurrency(deal?.amount) }}</p>
                </div>
                <div>
                  <label class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1">Success_Probability</label>
                  <p class="text-[11px] font-mono font-black text-gray-900">{{ deal?.probability }}%</p>
                </div>
                <div v-if="deal?.expectedCloseDate">
                  <label class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1">Target_Close_Date</label>
                  <p class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-tighter">{{ formatDate(deal.expectedCloseDate) }}</p>
                </div>
                <div v-if="deal?.actualCloseDate">
                  <label class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1">Execution_Close_Date</label>
                  <p class="text-[11px] font-mono font-black text-green-600 uppercase tracking-tighter">{{ formatDate(deal.actualCloseDate) }}</p>
                </div>
              </div>
            </div>

            <!-- Associated Records -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Account -->
              <div v-if="deal?.accountName" class="bg-white border border-gray-100 p-6 rounded-sm">
                <h3 class="text-[10px] font-mono font-black text-[#2F2E8B] mb-4 flex items-center gap-2 uppercase tracking-widest">
                  <Building2 :size="14" />
                  ORGANIZATION_NODE
                </h3>
                <p class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-tight">{{ deal.accountName }}</p>
              </div>

              <!-- Contact -->
              <div v-if="deal?.contactName" class="bg-white border border-gray-100 p-6 rounded-sm">
                <h3 class="text-[10px] font-mono font-black text-[#2F2E8B] mb-4 flex items-center gap-2 uppercase tracking-widest">
                  <User :size="14" />
                  PRIMARY_CONTACT
                </h3>
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-gray-50 border border-gray-100 rounded-sm flex items-center justify-center text-[10px] font-mono font-black text-gray-400 uppercase">
                    {{ deal.contactName?.charAt(0) }}
                  </div>
                  <p class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-tight">{{ deal.contactName }}</p>
                </div>
              </div>
            </div>

            <!-- Description -->
            <div v-if="deal?.description" class="bg-white border border-gray-100 p-6 rounded-sm">
              <h3 class="text-[10px] font-mono font-black text-[#2F2E8B] mb-4 flex items-center gap-2 uppercase tracking-widest">
                <AlignLeft :size="14" />
                DEAL_NARRATIVE
              </h3>
              <p class="text-[10px] font-mono text-gray-600 leading-relaxed uppercase tracking-tight whitespace-pre-wrap">{{ deal.description }}</p>
            </div>

            <!-- Next Steps -->
            <div v-if="deal?.nextSteps" class="bg-blue-50/30 border border-blue-100 p-6 rounded-sm">
              <h3 class="text-[10px] font-mono font-black text-[#2F2E8B] mb-4 flex items-center gap-2 uppercase tracking-widest">
                <CheckSquare :size="14" />
                SYSTEM_NEXT_STEPS
              </h3>
              <p class="text-[10px] font-mono text-gray-700 leading-relaxed uppercase tracking-tight">{{ deal.nextSteps }}</p>
            </div>

            <!-- Metadata -->
            <div class="bg-gray-50/50 border border-gray-100 p-6 rounded-sm">
              <h3 class="text-[9px] font-mono font-black text-gray-400 mb-4 uppercase tracking-widest">SYSTEM_METADATA</h3>
              <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <span class="text-[8px] font-mono font-bold text-gray-400 uppercase block mb-1">Node_Created</span>
                  <span class="text-[9px] font-mono font-black text-gray-600 uppercase">{{ formatDate(deal?.createdAt) }}</span>
                </div>
                <div>
                  <span class="text-[8px] font-mono font-bold text-gray-400 uppercase block mb-1">State_Updated</span>
                  <span class="text-[9px] font-mono font-black text-gray-600 uppercase">{{ formatDate(deal?.updatedAt) }}</span>
                </div>
                <div>
                  <span class="text-[8px] font-mono font-bold text-gray-400 uppercase block mb-1">Assigned_Owner</span>
                  <span class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase">{{ deal?.owner || 'UNASSIGNED' }}</span>
                </div>
                <div>
                  <span class="text-[8px] font-mono font-bold text-gray-400 uppercase block mb-1">Object_ID</span>
                  <span class="text-[9px] font-mono text-gray-400 font-bold overflow-hidden whitespace-nowrap text-ellipsis block">{{ deal?.id }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Activities Tab -->
          <div v-if="activeTab === 'activities'" class="relative z-10">
            <div v-if="loadingActivities" class="flex justify-center py-12">
              <Loader2 class="animate-spin text-[#2F2E8B]" :size="32" />
            </div>
            <div v-else-if="activities.length > 0" class="space-y-4">
              <div v-for="activity in activities" :key="activity.id" class="flex gap-4 group">
                <div class="flex-shrink-0 relative">
                  <div class="absolute inset-0 bg-[#2F2E8B]/10 rounded-sm scale-0 transition-transform group-hover:scale-100"></div>
                  <div :class="getActivityColorClass(activity.type)" class="w-10 h-10 border border-transparent rounded-sm flex items-center justify-center relative z-10">
                    <component :is="getActivityLucideIcon(activity.type)" :size="16" class="text-white" />
                  </div>
                </div>
                <div class="flex-1 bg-white border border-gray-100 p-4 transition-all hover:border-gray-200 rounded-sm">
                  <div class="flex items-start justify-between">
                    <div>
                      <h4 class="text-[10px] font-mono font-black text-gray-900 uppercase tracking-widest">{{ activity.type }}</h4>
                      <p class="text-[10px] font-mono text-gray-500 mt-2 leading-relaxed tracking-tight uppercase">{{ activity.description }}</p>
                    </div>
                    <span class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">{{ formatDate(activity.createdAt) }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-16 bg-gray-50/50 rounded-sm border border-dashed border-gray-200">
              <History :size="32" class="text-gray-200 mx-auto mb-4" />
              <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">ZERO_ACTIVITIES_LOGGED</p>
            </div>
          </div>

          <!-- Related Tab -->
          <div v-if="activeTab === 'related'" class="relative z-10">
            <div class="text-center py-16 bg-gray-50/50 rounded-sm border border-dashed border-gray-200">
              <Link :size="32" class="text-gray-200 mx-auto mb-4" />
              <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">NO_RELATED_ENTITIES_DETECTED</p>
            </div>
          </div>

          <!-- Documents Tab -->
          <div v-if="activeTab === 'documents'" class="space-y-6">
            <LinkedDocumentsWidget
              recordType="deal"
              :recordId="deal.id"
              :recordName="deal.name"
            />
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="border-t border-gray-100 p-6 bg-white relative z-10">
          <div class="flex flex-col sm:flex-row justify-between gap-4">
            <button
              @click="handleDelete"
              class="px-6 py-2.5 border border-red-200 text-red-500 rounded-sm hover:bg-red-50 transition text-[9px] font-mono font-black uppercase tracking-widest flex items-center gap-2"
            >
              <Trash2 :size="14" />
              EXEC_DELETE_DEAL
            </button>
            <div class="flex gap-3">
              <button
                @click="close"
                class="px-6 py-2.5 border border-gray-100 text-gray-400 rounded-sm hover:bg-gray-50 transition text-[9px] font-mono font-black uppercase tracking-widest"
              >
                CLOSE
              </button>
              <button
                @click="handleEdit"
                class="px-8 py-2.5 bg-[#2F2E8B] text-white rounded-sm hover:bg-[#3D2F88] transition text-[9px] font-mono font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-blue-100"
              >
                <Edit :size="14" />
                MODIFY_DEAL_STATE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { 
  X, Info, Building2, User, AlignLeft, CheckSquare, 
  History, Link, Edit, Trash2, Eye, Calendar,
  Loader2, Mail, Phone, MessageSquare, Plus, FileText
} from 'lucide-vue-next';
import { ref, watch, onUnmounted } from 'vue';
import * as crmApi from '@/services/crm_api.js';
import { decodeJWT } from '@/services/decodeJWT.js';
import { useCurrency } from '@/composables/useCurrency';
import LinkedDocumentsWidget from './LinkedDocumentsWidget.vue';

const props = defineProps({
  modelValue: Boolean,
  deal: Object
});

const emit = defineEmits(['update:modelValue', 'edit', 'delete', 'refresh']);

const { getTenantId } = decodeJWT();
const { formatCurrency } = useCurrency();

const activeTab = ref('overview');
const activities = ref([]);
const loadingActivities = ref(false);

const tabs = [
  { id: 'overview', label: 'Overview', lucideIcon: Info },
  { id: 'activities', label: 'Activities', lucideIcon: History },
  { id: 'related', label: 'Related', lucideIcon: Link },
  { id: 'documents', label: 'Documents', lucideIcon: FileText }
];

watch(() => props.modelValue, (newVal) => {
  if (newVal && props.deal) {
    activeTab.value = 'overview';
  }
});

watch(activeTab, (newTab) => {
  if (newTab === 'activities' && activities.value.length === 0) {
    loadActivities();
  }
});

async function loadActivities() {
  if (!props.deal?.id) return;
  
  loadingActivities.value = true;
  try {
    const tenantId = getTenantId();
    activities.value = await crmApi.getDealActivities(props.deal.id, tenantId);
  } catch (error) {
    console.error('Failed to load activities:', error);
    activities.value = [];
  } finally {
    loadingActivities.value = false;
  }
}

function close() {
  emit('update:modelValue', false);
}

function handleEdit() {
  emit('edit', props.deal);
}

function handleDelete() {
  emit('delete', props.deal);
}

function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatStage(stage) {
  if (!stage) return '';
  return stage.replace(/-/g, ' ');
}

function getActivityLucideIcon(type) {
  const icons = {
    'created': Plus,
    'updated': Edit,
    'note': FileText,
    'email': Mail,
    'call': Phone,
    'meeting': Calendar
  };
  return icons[type?.toLowerCase()] || MessageSquare;
}

function getActivityColorClass(type) {
  const colors = {
    'created': 'bg-green-500 border-green-600',
    'updated': 'bg-blue-500 border-blue-600',
    'note': 'bg-yellow-500 border-yellow-600',
    'email': 'bg-purple-500 border-purple-600',
    'call': 'bg-orange-500 border-orange-600',
    'meeting': 'bg-pink-500 border-pink-600'
  };
  return colors[type?.toLowerCase()] || 'bg-gray-400 border-gray-500';
}

function getStageBadgeClass(stage) {
  return 'bg-gray-50 text-gray-400 border-gray-100';
}
</script>

<style scoped>
.dotted-pattern {
  background-image: radial-gradient(circle, #2F2E8B 1px, transparent 1px);
  background-size: 20px 20px;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #E5E7EB;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #D1D5DB;
}
</style>
