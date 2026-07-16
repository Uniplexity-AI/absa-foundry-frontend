<template>
  <div class="min-h-screen flex flex-col font-sans relative text-gray-900">
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm relative">
      <div class="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <BackButton route="/dashboard/crm" variant="icon-only" />
          <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
          <div>
            <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Sales // CRM // Calls</span>
            <h1 class="text-lg font-black text-gray-900 uppercase tracking-tight">Call_Logs</h1>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-[10px] font-mono font-bold text-[#2F2E8B] bg-blue-50 border border-blue-100 px-3 py-1.5 flex items-center gap-2 rounded-sm uppercase tracking-wider">
            <UserCircle :size="14" /> {{ getUserEmail() || 'USER' }}
          </span>
        </div>
      </div>
    </header>

    <div class="flex-1 w-full relative z-10 pb-40">
      <div class="px-4 sm:px-6 lg:px-8 space-y-6 py-6 relative">

        <!-- Loading Overlay -->
        <div v-if="moduleLoading" class="absolute inset-0 z-20 bg-white/70 backdrop-blur-[1px] flex items-center justify-center">
          <div class="h-12 w-12 border-4 border-gray-100 border-t-[#2F2E8B] rounded-full animate-spin"></div>
        </div>

        <!-- Page Title Row + Search / Filter toolbar -->
        <div class="space-y-3 border-b border-gray-100 pb-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-1 h-4 bg-[#2F2E8B]"></div>
              <h3 class="text-xs font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
                <Phone :size="14" class="text-gray-400" /> Call_Records
              </h3>
              <span class="text-[9px] font-mono font-bold text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-sm">
                {{ displayedCalls.length }} / {{ allCalls.length }}
              </span>
            </div>
            <button @click="showAll = !showAll"
              class="text-[9px] font-mono font-bold uppercase tracking-wider border rounded-sm px-3 py-1.5 transition flex items-center gap-1"
              :class="showAll ? 'bg-[#2F2E8B] text-white border-[#2F2E8B]' : 'bg-white text-gray-500 border-gray-200 hover:border-[#2F2E8B] hover:text-[#2F2E8B]'">
              <List :size="10" /> {{ showAll ? 'Paginated' : 'Show_All' }}
            </button>
          </div>

          <div class="relative">
            <Search :size="13" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
            <input v-model="callSearch" placeholder="SEARCH_CONTACT, PHONE, OUTCOME..."
              class="w-full border border-gray-200 rounded-sm pl-9 pr-8 py-2 text-[10px] font-mono focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] outline-none transition" />
            <button v-if="callSearch" @click="callSearch = ''"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500">
              <X :size="12" />
            </button>
          </div>

          <div class="flex items-center gap-2 flex-wrap">
            <button v-for="f in ['all', 'connected', 'no-answer', 'voicemail', 'busy', 'failed']" :key="f"
              @click="callFilter = f; currentPage = 1"
              :class="callFilter === f ? 'bg-[#2F2E8B] text-white border-[#2F2E8B]' : 'bg-white text-gray-500 border-gray-200 hover:border-[#2F2E8B] hover:text-[#2F2E8B]'"
              class="px-3 py-1 rounded-sm border text-[9px] font-mono font-bold uppercase tracking-wider whitespace-nowrap transition">
              {{ f === 'all' ? 'All' : f }}
            </button>
          </div>
        </div>

        <!-- Call Logs Container -->
        <div class="bg-white border border-gray-200 rounded-sm shadow-sm relative overflow-hidden">
          <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
          <div class="p-4 md:p-6 space-y-2 relative z-10">

            <!-- Empty State -->
            <div v-if="displayedCalls.length === 0"
              class="text-center py-12 border-2 border-dashed border-gray-100 rounded-sm">
              <PhoneMissed :size="48" class="text-gray-200 mx-auto mb-4" />
              <p class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">No_Calls_Logged</p>
              <p class="text-xs text-gray-400 mt-2">TECHNICAL_LOGS_EMPTY</p>
            </div>

            <!-- Call Log Cards -->
            <div v-for="comm in displayedCalls" :key="comm.id"
              class="border border-gray-200 rounded-sm hover:border-[#2F2E8B]/40 transition bg-white relative overflow-hidden"
              :class="{
                'border-l-4 border-l-green-500': comm.outcome === 'connected',
                'border-l-4 border-l-red-400': comm.outcome === 'no-answer' || comm.outcome === 'failed',
                'border-l-4 border-l-yellow-400': comm.outcome === 'voicemail' || comm.outcome === 'busy',
                'border-l-4 border-l-[#2F2E8B]': !comm.outcome,
              }">

              <!-- Compact Main Row -->
              <div class="flex items-center gap-3 px-3 py-2.5">
                <!-- Icon -->
                <div class="w-7 h-7 flex-shrink-0 border rounded-sm flex items-center justify-center"
                  :class="{
                    'border-green-200 bg-green-50': comm.outcome === 'connected',
                    'border-red-200 bg-red-50': comm.outcome === 'no-answer' || comm.outcome === 'failed',
                    'border-yellow-200 bg-yellow-50': comm.outcome === 'voicemail' || comm.outcome === 'busy',
                    'border-gray-100 bg-gray-50': !comm.outcome,
                  }">
                  <PhoneCall :size="12"
                    :class="{
                      'text-green-600': comm.outcome === 'connected',
                      'text-red-500': comm.outcome === 'no-answer' || comm.outcome === 'failed',
                      'text-yellow-600': comm.outcome === 'voicemail' || comm.outcome === 'busy',
                      'text-[#2F2E8B]': !comm.outcome,
                    }" />
                </div>

                <!-- Contact Name -->
                <span class="font-bold text-gray-900 text-[11px] font-mono uppercase tracking-tight w-44 truncate flex-shrink-0">
                  {{ comm.contactName || 'UNKNOWN' }}
                </span>

                <!-- Metadata chips — all inline -->
                <div class="flex items-center gap-2 flex-1 flex-wrap min-w-0">
                  <span v-if="comm.phone" class="text-[10px] font-mono text-gray-400 truncate">{{ comm.phone }}</span>

                  <span v-if="comm.direction" class="flex items-center gap-0.5 text-[9px] font-mono font-bold uppercase"
                    :class="comm.direction === 'outbound' ? 'text-blue-500' : 'text-green-600'">
                    <ArrowUpRight v-if="comm.direction === 'outbound'" :size="9" />
                    <ArrowDownLeft v-else :size="9" />
                    {{ comm.direction }}
                  </span>

                  <span v-if="comm.outcome" class="px-1.5 py-0.5 rounded-sm text-[8px] font-mono font-bold uppercase border flex-shrink-0"
                    :class="{
                      'bg-green-50 text-green-700 border-green-200': comm.outcome === 'connected',
                      'bg-red-50 text-red-700 border-red-200': comm.outcome === 'no-answer' || comm.outcome === 'failed',
                      'bg-yellow-50 text-yellow-700 border-yellow-200': comm.outcome === 'voicemail' || comm.outcome === 'busy',
                    }">
                    {{ comm.outcome }}
                  </span>

                  <span v-if="comm.duration" class="text-[9px] font-mono text-gray-400 flex items-center gap-0.5 flex-shrink-0">
                    <Clock :size="9" /> {{ comm.duration }}s
                  </span>

                  <span class="text-[9px] font-mono text-gray-300 flex items-center gap-0.5 flex-shrink-0 ml-auto">
                    <CalendarIcon :size="9" /> {{ crmFormatDateTime(comm.created_at || comm.timestamp) }}
                  </span>
                </div>

                <!-- Notes Toggle -->
                <button @click="openNotes[comm.id] = !openNotes[comm.id]; openNotes[comm.id] && ensureCallNotesLoaded(comm)"
                  class="flex-shrink-0 flex items-center gap-1 text-[9px] font-mono font-bold uppercase text-gray-400 hover:text-[#2F2E8B] border border-gray-100 hover:border-[#2F2E8B]/40 px-2 py-1 rounded-sm transition">
                  <FileText :size="9" />
                  Notes
                  <ChevronDown :size="9" :class="openNotes[comm.id] ? 'rotate-180' : ''" class="transition-transform" />
                </button>

                <!-- Delete -->
                <button @click.stop="deleteCommunicationRecord(comm)"
                  class="flex-shrink-0 text-gray-300 hover:text-red-500 transition p-1 border border-transparent hover:border-red-200 rounded-sm">
                  <Trash2 :size="12" />
                </button>
              </div>

              <!-- Subject/Message row if present -->
              <div v-if="comm.message || comm.subject" class="px-3 pb-2 -mt-1">
                <span class="text-[9px] font-mono text-gray-400 italic">{{ comm.message || comm.subject }}</span>
              </div>

              <!-- Expandable Notes Panel -->
              <div v-if="openNotes[comm.id]" class="border-t border-gray-100 px-3 py-2.5 bg-gray-50/50">
                <div v-if="!callNotes[comm.id] || callNotes[comm.id].length === 0"
                  class="text-[9px] font-mono text-gray-400 italic mb-2">LOG_EMPTY: NO_NOTES_FOUND</div>

                <div v-for="n in (callNotes[comm.id] || [])" :key="n.id"
                  class="text-[10px] font-mono text-gray-700 border-l-2 border-[#2F2E8B]/20 pl-2 py-1 mb-1 flex items-start justify-between gap-2">
                  <span class="flex-1">{{ n.text }}</span>
                  <span class="text-[9px] text-gray-400 whitespace-nowrap">{{ crmFormatDateTime(n.created_at) }}</span>
                </div>

                <div class="flex gap-2 mt-2">
                  <input v-model="newCallNote[comm.id]"
                    @keyup.enter="submitCallNote(comm)"
                    placeholder="ENTER_NOTE_CMD..."
                    class="flex-1 border border-gray-200 rounded-sm px-2.5 py-1.5 text-[10px] font-mono focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] outline-none transition bg-white" />
                  <button @click="submitCallNote(comm)"
                    class="px-3 py-1.5 rounded-sm bg-[#2F2E8B] text-white hover:bg-[#3D2F88] text-[9px] font-mono font-bold uppercase tracking-wider transition flex items-center gap-1">
                    <Send :size="10" /> LOG
                  </button>
                </div>
              </div>
            </div>

            <!-- Pagination Controls -->
            <div v-if="!showAll && totalPages > 1" class="flex items-center justify-between pt-3 border-t border-gray-100 mt-2">
              <button @click="currentPage = Math.max(1, currentPage - 1)" :disabled="currentPage <= 1"
                class="flex items-center gap-1 px-3 py-1.5 text-[9px] font-mono font-bold uppercase rounded-sm border transition disabled:opacity-30"
                :class="currentPage > 1 ? 'border-gray-200 text-gray-600 hover:border-[#2F2E8B] hover:text-[#2F2E8B]' : 'border-gray-100 text-gray-300'">
                <ChevronLeft :size="10" /> Prev
              </button>

              <div class="flex items-center gap-1">
                <button v-for="p in totalPages" :key="p" @click="currentPage = p"
                  :class="p === currentPage ? 'bg-[#2F2E8B] text-white border-[#2F2E8B]' : 'bg-white text-gray-400 border-gray-200 hover:border-[#2F2E8B]'"
                  class="w-6 h-6 text-[9px] font-mono font-bold rounded-sm border transition">
                  {{ p }}
                </button>
              </div>

              <button @click="currentPage = Math.min(totalPages, currentPage + 1)" :disabled="currentPage >= totalPages"
                class="flex items-center gap-1 px-3 py-1.5 text-[9px] font-mono font-bold uppercase rounded-sm border transition disabled:opacity-30"
                :class="currentPage < totalPages ? 'border-gray-200 text-gray-600 hover:border-[#2F2E8B] hover:text-[#2F2E8B]' : 'border-gray-100 text-gray-300'">
                Next <ChevronRight :size="10" />
              </button>
            </div>

            <div v-if="showAll && allCalls.length > PAGE_SIZE" class="pt-2 text-center text-[9px] font-mono text-gray-400 uppercase tracking-widest">
              Showing all {{ allCalls.length }} records
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- Call Outcome Modal -->
    <Teleport to="body">
      <div v-if="showCallOutcomeModal" class="fixed inset-0 bg-black/60 backdrop-blur-md flex items-start justify-center z-[9999] p-4 pt-20">
        <div class="bg-white rounded-sm shadow-2xl w-full max-w-md border border-gray-200 relative overflow-hidden animate-modal-in">
          <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>

          <!-- Modal Header -->
          <div class="p-4 md:p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 relative z-10">
            <div class="flex items-center gap-3">
              <div class="w-1 h-5 bg-[#2F2E8B]"></div>
              <h3 class="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                <Phone :size="14" class="text-gray-400" /> Log_Call_Outcome
              </h3>
            </div>
            <button class="text-gray-400 hover:text-gray-600 transition" @click="cancelCallOutcome">
              <X :size="20" />
            </button>
          </div>

          <!-- Modal Body -->
          <div class="p-4 md:p-6 space-y-5 relative z-10">
            <!-- Duration -->
            <div class="p-3 bg-gray-50 border border-gray-200 rounded-sm flex items-center justify-between">
              <div class="flex items-center gap-2">
                <Clock :size="12" class="text-[#2F2E8B]" />
                <span class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">Call_Duration</span>
              </div>
              <span class="text-lg font-black text-[#2F2E8B] font-mono">{{ formatDuration(callTimerSeconds) }}</span>
            </div>

            <!-- Outcome Select -->
            <div>
              <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <div class="w-1 h-1 bg-[#2F2E8B]"></div> Call_Outcome
              </label>
              <select v-model="callOutcome" class="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-xs font-mono focus:ring-1 focus:ring-[#2F2E8B] outline-none transition bg-white">
                <option value="connected">CONNECTED // OBJECTIVES_MET</option>
                <option value="no-answer">NO_ANSWER // CLIENT_UNAVAILABLE</option>
                <option value="voicemail">VOICEMAIL // MESSAGE_LEFT</option>
                <option value="busy">BUSY // LINE_OCCUPIED</option>
                <option value="failed">FAILED // CONNECTION_ERROR</option>
              </select>
            </div>

            <!-- Summary -->
            <div>
              <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <div class="w-1 h-1 bg-[#2F2E8B]"></div> Call_Summary
              </label>
              <textarea v-model="callSummary" rows="3"
                class="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-xs font-mono focus:ring-1 focus:ring-[#2F2E8B] outline-none transition"
                placeholder="ADD_CALL_NOTES_HERE..."></textarea>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="p-4 md:p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 relative z-10">
            <button @click="cancelCallOutcome" class="px-6 py-2 rounded-sm border border-gray-200 text-gray-600 text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-white transition">_CANCEL</button>
            <button @click="saveCallOutcome" class="px-6 py-2 rounded-sm bg-[#2F2E8B] text-white text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-[#3D2F88] transition flex items-center gap-2">
              <Check :size="14" /> COMMIT_LOG
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { BackButton } from '@/components/ui'
import { onMounted, ref, computed, watch } from 'vue';
import { useCRMModule } from '../functions/CRMModule.js';
import {
  UserCircle, Phone, PhoneCall, PhoneMissed,
  ArrowUpRight, ArrowDownLeft, Clock, FileText, Send, Trash2,
  Check, X, Calendar as CalendarIcon, ChevronDown,
  ChevronLeft, ChevronRight, Search, List
} from 'lucide-vue-next';

const {
  getUserEmail, activeTab, moduleLoading, filteredCommunications, communicationFilter,
  callNotes, newCallNote, ensureCallNotesLoaded, submitCallNote, deleteCommunicationRecord,
  crmFormatDateTime, showCallOutcomeModal, callOutcome, callSummary, callTimerSeconds,
  cancelCallOutcome, saveCallOutcome, formatDuration, goToModule
} = useCRMModule();

// Per-card notes toggle state
const openNotes = ref({});

// Search / Filter / Pagination
const callSearch = ref('');
const callFilter = ref('all');
const currentPage = ref(1);
const showAll = ref(false);
const PAGE_SIZE = 15;

// All calls (raw, filtered only by type=call)
const allCalls = computed(() => {
  const q = callSearch.value.trim().toLowerCase();
  const base = (filteredCommunications.value || []).filter(c => c.type === 'call');
  const afterOutcome = callFilter.value === 'all' ? base : base.filter(c => c.outcome === callFilter.value);
  if (!q) return afterOutcome;
  return afterOutcome.filter(c =>
    (c.contactName || '').toLowerCase().includes(q) ||
    (c.phone || '').toLowerCase().includes(q) ||
    (c.outcome || '').toLowerCase().includes(q) ||
    (c.direction || '').toLowerCase().includes(q) ||
    (c.message || '').toLowerCase().includes(q)
  );
});

const totalPages = computed(() => Math.max(1, Math.ceil(allCalls.value.length / PAGE_SIZE)));

const displayedCalls = computed(() => {
  if (showAll.value) return allCalls.value;
  const start = (currentPage.value - 1) * PAGE_SIZE;
  return allCalls.value.slice(start, start + PAGE_SIZE);
});

// Reset page when filter/search changes
watch([callSearch, callFilter], () => { currentPage.value = 1; });

onMounted(() => {
  goToModule('calls');
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
.animate-modal-in {
  animation: modal-in 0.2s cubic-bezier(0, 0, 0.2, 1) forwards;
}

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #f1f1f1; }
::-webkit-scrollbar-thumb { background: #2F2E8B; border-radius: 0; }
::-webkit-scrollbar-thumb:hover { background: #3D2F88; }
</style>
