<template>
  <div id="module-pipeline" class="space-y-6 relative">
    <!-- Add Custom Stage Modal -->
    <Teleport to="body">
      <div v-if="showAddStageModal" 
        class="fixed inset-0 bg-black/60 backdrop-blur-md flex items-start justify-center z-[99999] p-4 pt-10 overflow-y-auto" 
        @click.self="$emit('close-add-stage')">
        <div class="bg-white rounded-sm shadow-2xl max-w-md w-full border border-gray-200 relative overflow-hidden animate-modal-in flex flex-col my-auto md:my-10">
          <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>

          <!-- Header -->
          <div class="relative z-10 sticky top-0 bg-white border-b border-gray-200 p-4 rounded-t-sm">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-1 h-6 bg-[#2F2E8B]"></div>
                <div>
                  <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Config // Structure</span>
                  <h2 class="text-sm font-black text-gray-900 uppercase tracking-tight font-mono flex items-center gap-2">
                    <PlusSquare :size="14" class="text-[#2F2E8B]" />
                    Add_Stage
                  </h2>
                </div>
              </div>
              <button @click="$emit('close-add-stage')" class="p-1.5 border border-gray-200 rounded-sm hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition">
                <X :size="16" />
              </button>
            </div>
          </div>

          <!-- Form Body -->
          <div class="relative z-10 p-4">
            <form @submit.prevent="$emit('add-custom-stage')" class="space-y-4">
              <div class="space-y-1.5">
                <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Stage_Name *</label>
                <input 
                  v-model="newStageForm.name" 
                  type="text" 
                  required
                  placeholder="E.G. ON HOLD"
                  class="input-base" 
                  ref="addStageInputRef"
                />
              </div>
              <div class="space-y-1.5">
                <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Entity_Type</label>
                <select v-model="newStageForm.entity" class="input-base">
                  <option value="leads">Leads</option>
                  <option value="contacts">Contacts</option>
                  <option value="accounts">Accounts</option>
                  <option value="deals">Deals</option>
                </select>
                <p class="text-[9px] font-mono text-gray-400 uppercase tracking-tight">Record type restricted to this stage</p>
              </div>
              <div class="space-y-1.5">
                <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Position</label>
                <select v-model="newStageForm.insertAfter" class="input-base">
                  <option value="start">At the beginning</option>
                  <option value="end">At the end</option>
                  <option v-for="stage in allPipelineStages" :key="stage.id" :value="stage.id">
                    After {{ stage.name }}
                  </option>
                </select>
                <p class="text-[9px] font-mono text-gray-400 uppercase tracking-tight">Relative position in sequence</p>
              </div>

              <!-- Footer Actions -->
              <div class="flex justify-end gap-2 pt-4 border-t border-gray-100 mt-4">
                <button type="button" @click="$emit('close-add-stage')" class="px-5 py-2 border border-gray-200 text-gray-600 rounded-sm hover:bg-gray-50 transition text-[10px] font-mono font-bold uppercase tracking-wider">
                  Cancel
                </button>
                <button type="submit" class="px-5 py-2 bg-[#2F2E8B] text-white rounded-sm hover:bg-[#3D2F88] transition text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-2">
                  <Plus :size="12" /> Create_Stage
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Skeleton Loading State -->
    <div v-if="loading" class="space-y-4 w-full animate-pulse">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="h-5 w-40 bg-gray-200 rounded-sm"></div>
          <div class="h-5 w-24 bg-gray-100 rounded-sm"></div>
        </div>
        <div class="flex gap-2">
          <div class="h-8 w-24 bg-gray-200 rounded-sm"></div>
          <div class="h-8 w-24 bg-gray-100 rounded-sm"></div>
        </div>
      </div>
      <div class="flex gap-3 overflow-hidden">
        <div v-for="i in 6" :key="i" class="h-24 w-40 bg-gray-100 rounded-sm shrink-0"></div>
      </div>
      <div class="flex gap-4 overflow-hidden">
        <div v-for="col in 4" :key="col" class="w-80 space-y-2 shrink-0">
          <div class="h-8 w-full bg-gray-200 rounded-sm"></div>
          <div class="h-6 w-full bg-gray-100 rounded-sm"></div>
          <div v-for="card in 3" :key="card" class="h-28 w-full bg-gray-100 rounded-sm"></div>
        </div>
      </div>
    </div>

    <div v-else class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <div>
          <h3 class="text-sm font-black text-gray-900 uppercase tracking-widest font-mono">Sales Pipeline</h3>
          <div class="text-[10px] font-mono font-bold text-gray-700 uppercase tracking-wider">
            Total Value: <span class="font-black text-[#2F2E8B]">{{ formatCurrency(totalValue) }}</span>
          </div>
        </div>
        <button 
          @click="$emit('open-add-stage')"
          class="px-2 py-1 text-[9px] font-mono font-bold bg-[#2F2E8B] text-white hover:bg-[#3D2F88] transition flex items-center gap-1 rounded-sm uppercase tracking-widest"
          title="Add Custom Stage"
        >
          <Plus :size="10" />
          <span class="hidden sm:inline">Add Stage</span>
        </button>
        <button 
          @click="showKpis = !showKpis"
          class="flex items-center gap-1 px-2 py-1 text-[8px] font-mono font-bold uppercase tracking-widest transition border rounded-sm"
          :class="showKpis ? 'border-[#2F2E8B] text-[#2F2E8B] bg-indigo-50/50' : 'border-gray-200 text-gray-500 hover:border-[#2F2E8B]'"
          :title="showKpis ? 'Hide KPIs' : 'Show KPIs'"
        >
          <Eye v-if="showKpis" :size="10" />
          <EyeOff v-else :size="10" />
          <span class="hidden sm:inline">{{ showKpis ? 'Hide KPIs' : 'Show KPIs' }}</span>
        </button>
      </div>
      <!-- View Toggle for Mobile -->
      <button 
        @click="$emit('toggle-mobile-view')"
        class="lg:hidden px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-sm text-[9px] font-mono font-bold transition flex items-center gap-1.5 uppercase tracking-widest"
      >
        <i :class="mobileView ? 'fas fa-th' : 'fas fa-list'"></i>
        {{ mobileView ? 'Board View' : 'List View' }}
      </button>
    </div>

    <!-- Pipeline Stats (scrollable, compact) - toggleable -->
    <div v-if="showKpis" class="overflow-x-auto pb-2 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full">
      <div class="flex gap-2 min-w-max">
        <div v-for="stageId in ['new', 'contacted', 'proposal', 'negotiation', 'closed-won', 'closed-lost']" :key="stageId" 
             class="bg-white border border-gray-200 rounded-sm p-2.5 w-36 shrink-0 shadow-sm">
          <div class="flex items-center justify-between mb-1">
            <div class="text-[8px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest">{{ stageId.replace('-', ' ') }}</div>
            <span class="w-2 h-2 rounded-full bg-[#2F2E8B]"></span>
          </div>
          <div class="text-base font-black text-gray-900">{{ getLeadsByStageCount(stageId) }}</div>
          <div class="text-[8px] font-mono font-bold text-gray-700 uppercase tracking-wider mt-0.5">Value</div>
          <div class="text-[10px] font-black text-[#2F2E8B]">{{ formatCurrency(getStageValue(stageId)) }}</div>
        </div>
      </div>
    </div>

    <!-- Mobile List View -->
    <div v-if="mobileView" class="lg:hidden space-y-4">
      <div v-for="stage in allPipelineStages" :key="`mobile-${stage.id}`" class="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-200" :class="stage.bgClass">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full" :class="stage.dotClass"></div>
              <h4 class="font-bold text-gray-800">{{ stage.name }}</h4>
            </div>
            <div class="flex items-center gap-3">
              <button 
                v-if="stage.isCustom" 
                @click.stop="$emit('remove-custom-stage', stage.id)" 
                class="text-gray-400 hover:text-red-500 transition-colors"
              >
                <i class="fas fa-trash-alt text-xs"></i>
              </button>
              <span class="text-sm font-semibold text-gray-700">{{ getLeadsByStageCount(stage.id) }}</span>
              <span class="text-xs font-bold" :class="stage.textClass">{{ formatCurrency(getStageValue(stage.id)) }}</span>
            </div>
          </div>
        </div>
        <div class="p-3 space-y-2">
          <div v-if="getVisibleLeadsByStage(stage.id).length === 0" class="text-center py-6 text-gray-400 text-sm">
            <i class="fas fa-inbox text-2xl mb-2"></i>
            <p>No {{ stage.entity }} in this stage</p>
          </div>
          <div v-else v-for="record in getVisibleLeadsByStage(stage.id)" :key="`mobile-${record.id}`"
               @click="$emit('view-record', record, stage.entity)"
               class="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:bg-gray-100 transition cursor-pointer">
            <div class="flex items-start justify-between mb-2">
              <div class="flex-1 min-w-0">
                <h5 class="font-semibold text-sm text-gray-800 truncate">{{ getRecordTitle(record, stage.entity) }}</h5>
                <p class="text-xs text-gray-500 truncate">{{ getRecordSubtitle(record, stage.entity) }}</p>
              </div>
              <span :class="getEntityBadgeClass(stage.entity)" class="px-2 py-0.5 rounded text-[9px] font-bold uppercase ml-2 flex-shrink-0">
                {{ stage.entity.slice(0, -1) }}
              </span>
            </div>
            <div v-if="getRecordValue(record, stage.entity)" class="mb-2">
              <div class="text-base font-bold text-[#2F2E8B]">{{ formatCurrency(getRecordValue(record, stage.entity)) }}</div>
            </div>
            <div class="flex items-center gap-3 text-xs text-gray-600">
              <div class="flex items-center gap-1 flex-1 min-w-0">
                <i class="fas fa-envelope text-gray-400"></i>
                <span class="truncate">{{ record.email }}</span>
              </div>
              <div v-if="record.phone" class="flex items-center gap-1">
                <i class="fas fa-phone text-gray-400"></i>
                <span>{{ record.phone }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Draggable Kanban Board (Desktop) -->
    <div v-else class="overflow-x-auto pb-4 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-500">
      <div class="flex gap-4 min-w-max">
        <div 
          v-for="stage in allPipelineStages" 
          :key="stage.id"
          :data-stage-id="stage.id"
          class="w-64 bg-gray-50/50 rounded-sm p-2 flex-shrink-0 border border-gray-100"
          :class="stage.bgClass"
          @drop="$emit('drop', $event, stage.id)"
          @dragover.prevent
          @dragenter.prevent="$emit('drag-enter', $event, stage.id)"
          @dragleave="$emit('drag-leave', $event, stage.id)"
        >
          <!-- Stage Header -->
          <div class="flex items-center justify-between mb-2 pb-1.5 border-b" :class="stage.borderClass">
            <div class="flex items-center gap-1.5">
              <div class="w-2 h-2 rounded-full" :class="stage.dotClass"></div>
              <h4 class="font-black text-[10px] text-gray-900 uppercase tracking-widest font-mono">{{ stage.name }}</h4>
            </div>
            <div class="flex items-center gap-1.5">
              <button 
                v-if="stage.isCustom" 
                @click.stop="$emit('remove-custom-stage', stage.id)" 
                class="text-gray-400 hover:text-red-500 transition-colors p-0.5"
                title="Delete Custom Stage"
              >
                <i class="fas fa-trash-alt text-[9px]"></i>
              </button>
              <span class="bg-white border border-gray-200 text-gray-700 px-2 py-0.5 rounded-sm text-[9px] font-mono font-bold">
                {{ getLeadsByStageCount(stage.id) }}
              </span>
            </div>
          </div>

          <!-- Stage Value -->
          <div class="mb-2 px-1">
            <div class="text-[7px] font-mono font-bold text-gray-600 uppercase tracking-wider">Stage Value</div>
            <div class="text-[11px] font-black" :class="stage.textClass">
              {{ formatCurrency(getStageValue(stage.id)) }}
            </div>
          </div>

          <!-- Drop Zone -->
          <div 
            class="space-y-1 min-h-[250px] max-h-[60vh] overflow-y-auto transition-colors rounded-sm p-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full"
            :class="{ 'bg-blue-100 border-2 border-dashed border-blue-400': dragOverStage === stage.id }"
          >
            <!-- Lead/Contact/Account/Deal Cards -->
            <div 
              v-for="record in getVisibleLeadsByStage(stage.id)" 
              :key="`${record.entityType || 'lead'}-${record.id}`" 
              draggable="true"
              @dragstart="$emit('drag-start', $event, record)"
              @dragend="$emit('drag-end')"
              @click="$emit('view-record', record, stage.entity)"
              @touchstart="$emit('touch-start', $event, record)"
              @touchmove="$emit('touch-move')"
              @touchend="$emit('touch-end', $event, stage.id)"
              class="bg-white rounded-sm p-1.5 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-move group relative touch-manipulation active:opacity-50 active:scale-95"
              :class="[
                getRecordBorderClass(record, stage.entity),
                { 'opacity-50': draggingLead && draggingLead.id === record.id }
              ]"
            >
              <!-- Entity Type Badge -->
              <div class="absolute top-0.5 right-0.5">
                <span :class="getEntityBadgeClass(stage.entity)" class="px-1 py-0.5 rounded text-[7px] font-black uppercase">
                  {{ stage.entity.slice(0, -1) }}
                </span>
              </div>

              <!-- Card Header -->
              <div class="flex items-start justify-between pr-10">
                <div class="flex-1 min-w-0">
                  <div class="text-[10px] font-bold text-gray-900 truncate group-hover:text-[#2F2E8B] transition leading-tight">
                    {{ getRecordTitle(record, stage.entity) }}
                  </div>
                  <div class="text-[8px] font-bold text-gray-700 truncate">{{ getRecordSubtitle(record, stage.entity) }}</div>
                </div>
              </div>

              <!-- Card Value -->
              <div v-if="getRecordValue(record, stage.entity)" class="mt-0.5 pb-0.5 border-b border-gray-50">
                <div class="text-[11px] font-black text-[#2F2E8B]">{{ formatCurrency(getRecordValue(record, stage.entity)) }}</div>
                <div v-if="record.entityType === 'deal' && record.probability" class="text-[7px] font-bold text-gray-700">
                  {{ record.probability }}% • {{ formatCurrency(getRecordValue(record, stage.entity) * record.probability / 100) }}
                </div>
              </div>

              <!-- Card Details (Compact) -->
              <div class="space-y-0 mt-0.5 text-[8px]">
                <div class="flex items-center text-gray-800 font-bold truncate">
                  <i class="fas fa-envelope mr-1 text-gray-500 text-[7px]"></i>
                  <span class="truncate">{{ record.email }}</span>
                </div>
                <div v-if="record.phone" class="flex items-center text-gray-800 font-bold">
                  <i class="fas fa-phone mr-1 text-gray-500 text-[7px]"></i>
                  <span>{{ record.phone }}</span>
                </div>
              </div>

              <!-- Card Actions (Compact) -->
              <div class="flex items-center justify-between mt-1 pt-1 border-t border-gray-50">
                <span class="text-[7px] font-bold text-gray-600 truncate">
                  {{ formatDate(record.created_at || record.createdAt) }}
                </span>
                <div class="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button v-if="stage.entity === 'leads'" @click.stop="$emit('convert-record', record)" class="text-green-700 hover:text-green-900 p-0.5 hover:bg-green-50 rounded" title="Convert">
                    <i class="fas fa-exchange-alt text-[7px]"></i>
                  </button>
                  <button @click.stop="$emit('call-record', record)" class="text-blue-700 hover:text-blue-900 p-0.5 hover:bg-blue-50 rounded" title="Call">
                    <i class="fas fa-phone text-[7px]"></i>
                  </button>
                  <button @click.stop="$emit('whatsapp-record', record)" class="text-gray-700 hover:text-gray-900 p-0.5 hover:bg-gray-100 rounded" title="WhatsApp">
                    <i class="fab fa-whatsapp text-[7px]"></i>
                  </button>
                  <button @click.stop="$emit('email-record', record)" class="text-purple-700 hover:text-purple-900 p-0.5 hover:bg-purple-50 rounded" title="Email">
                    <i class="fas fa-envelope text-[7px]"></i>
                  </button>
                  <button @click.stop="$emit('edit-record', record, stage.entity)" class="text-orange-700 hover:text-orange-900 p-0.5 hover:bg-orange-50 rounded" title="Edit">
                    <i class="fas fa-edit text-[7px]"></i>
                  </button>
                </div>
              </div>

              <!-- Drag Handle Indicator -->
              <div class="absolute top-0.5 left-0.5 opacity-0 group-hover:opacity-30 transition-opacity">
                <i class="fas fa-grip-vertical text-gray-400 text-[7px]"></i>
              </div>
            </div>

            <!-- Empty State -->
            <div v-if="getVisibleLeadsByStage(stage.id).length === 0" class="text-center py-12 text-gray-400">
              <i class="fas fa-inbox text-4xl mb-2"></i>
              <div class="text-sm">No {{ stage.entity }} in this stage</div>
              <div class="text-xs mt-1">Drag {{ stage.entity }} here</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PlusSquare, X, Plus, Eye, EyeOff } from 'lucide-vue-next';

const props = defineProps({
  loading: Boolean,
  mobileView: Boolean,
  totalValue: Number,
  allPipelineStages: Array,
  newStageForm: Object,
  showAddStageModal: Boolean,
  dragOverStage: [String, Number],
  draggingLead: Object,
  getLeadsByStageCount: Function,
  getStageValue: Function,
  getVisibleLeadsByStage: Function,
  formatCurrency: Function,
  formatDate: Function,
  getRecordTitle: Function,
  getRecordSubtitle: Function,
  getEntityBadgeClass: Function,
  getRecordValue: Function,
  getRecordBorderClass: Function
});

const emit = defineEmits([
  'open-add-stage', 'close-add-stage', 'add-custom-stage', 'remove-custom-stage',
  'toggle-mobile-view', 'view-record', 'convert-record', 'call-record', 
  'whatsapp-record', 'email-record', 'edit-record', 'drop', 'drag-enter', 
  'drag-leave', 'drag-start', 'drag-end', 'touch-start', 'touch-move', 'touch-end'
]);

const addStageInputRef = ref(null);
const showKpis = ref(true);
import { watch, nextTick, ref } from 'vue';
watch(() => props.showAddStageModal, async (newVal) => {
  if (newVal) {
    await nextTick();
    if (addStageInputRef.value) addStageInputRef.value.focus();
  }
});

</script>

<style scoped>
.dotted-pattern {
  background-image: radial-gradient(#e5e7eb 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.4;
}

.input-base {
  @apply w-full px-3 py-1.5 text-[11px] font-mono border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] outline-none transition-all placeholder:text-gray-300 bg-white;
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
