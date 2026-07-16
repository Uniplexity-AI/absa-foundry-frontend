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
            <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Sales // CRM // Visits</span>
            <h1 class="text-lg font-black text-gray-900 uppercase tracking-tight">Visit_Logs</h1>
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
        <div v-if="moduleLoading" class="absolute inset-0 z-20 bg-white/70 backdrop-blur-[1px] flex items-center justify-center">
          <div class="h-12 w-12 border-4 border-gray-100 border-t-[#2F2E8B] rounded-full animate-spin"></div>
        </div>

        <div class="flex items-center justify-between border-b border-gray-100 pb-4">
          <div class="flex items-center gap-2">
            <div class="w-1 h-4 bg-[#2F2E8B]"></div>
            <h3 class="text-xs font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
              <MapPin :size="14" class="text-gray-400" /> Planned_Visits
            </h3>
          </div>
          <button @click="openVisitModal" class="px-4 py-2 rounded-sm bg-[#2F2E8B] text-white text-[10px] font-mono font-bold uppercase tracking-wider hover:bg-[#3D2F88] transition flex items-center gap-2">
            <Plus :size="14" /> Schedule_Visit
          </button>
        </div>

        <div class="bg-white border border-gray-200 rounded-sm shadow-sm relative overflow-hidden">
          <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
          <div class="p-4 md:p-6 space-y-4 relative z-10">
            <div v-if="!visits.length" class="text-center py-12 border-2 border-dashed border-gray-100 rounded-sm">
              <MapPin :size="48" class="text-gray-200 mx-auto mb-4" />
              <p class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">No_Visits_Scheduled</p>
              <p class="text-xs text-gray-400 mt-2">TECHNICAL_LOGS_EMPTY</p>
            </div>

            <div v-for="v in visits" :key="v.id" class="border border-gray-200 rounded-sm p-4 md:p-5 hover:border-[#2F2E8B]/50 hover:shadow-sm transition bg-white group relative overflow-hidden" :class="{
              'border-l-4 border-l-green-500': v.status === 'completed',
              'border-l-4 border-l-blue-500': v.status === 'in-progress',
              'border-l-4 border-l-gray-300': v.status === 'planned',
              'border-l-4 border-l-red-500': v.status === 'canceled'
            }">
              <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-3">
                    <h4 class="font-bold text-gray-900 text-sm font-mono uppercase tracking-tight">{{ v.title || 'VISIT_LOG' }}</h4>
                    <span class="px-2 py-0.5 rounded-sm text-[9px] font-mono font-bold uppercase border" :class="{
                      'bg-green-50 text-green-700 border-green-200': v.status === 'completed',
                      'bg-blue-50 text-blue-700 border-blue-200': v.status === 'in-progress',
                      'bg-gray-50 text-gray-600 border-gray-200': v.status === 'planned',
                      'bg-red-50 text-red-700 border-red-200': v.status === 'canceled'
                    }">{{ v.status }}</span>
                  </div>
                  <div class="space-y-2 text-[11px] font-mono text-gray-600">
                    <div class="flex items-center gap-2"><div class="w-1.5 h-1.5 bg-[#2F2E8B]"></div> <span class="text-gray-400 font-bold uppercase tracking-tighter">LEAD:</span> <span class="text-gray-900">{{ getLeadNameById(v.leadId) }}</span></div>
                    <div v-if="v.address" class="flex items-center gap-2"><MapPin :size="12" class="text-[#2F2E8B]" /> <span>{{ v.address }}</span></div>
                    <div v-if="v.scheduled_at" class="flex items-center gap-2"><Calendar :size="12" class="text-[#2F2E8B]" /> <span>{{ crmFormatDateTime(v.scheduled_at) }}</span></div>
                    <div v-if="v.distance" class="flex items-center gap-2"><Navigation :size="12" class="text-[#2F2E8B]" /> <span>DIST: {{ (v.distance / 1000).toFixed(2) }} KM • DUR: {{ formatVisitDuration(v.estimated_duration) }}</span></div>
                  </div>
                </div>
                <div class="flex flex-col gap-2 ml-4">
                  <a v-if="v.location && (v.location.lat || v.location.lng)" :href="getMapsLink(v.location)" target="_blank" class="px-3 py-1.5 text-[9px] font-mono font-bold uppercase rounded-sm border border-blue-600 text-blue-600 hover:bg-blue-50 transition flex items-center justify-center gap-2 whitespace-nowrap"><Navigation :size="12" /> Directions</a>
                  <button v-if="v.status !== 'completed'" @click="openVisitModal(v)" class="px-3 py-1.5 text-[9px] font-mono font-bold uppercase rounded-sm border border-[#2F2E8B] text-[#2F2E8B] hover:bg-[#2F2E8B]/5 transition flex items-center justify-center gap-2 whitespace-nowrap"><Pencil :size="12" /> Edit</button>
                  <button v-if="v.status === 'planned'" @click="checkInVisit(v)" class="px-3 py-1.5 text-[9px] font-mono font-bold uppercase rounded-sm bg-green-600 text-white hover:bg-green-700 transition flex items-center justify-center gap-2 whitespace-nowrap"><LogIn :size="12" /> Check_In</button>
                  <button v-if="v.status === 'in-progress'" @click="showCheckOutModal(v)" class="px-3 py-1.5 text-[9px] font-mono font-bold uppercase rounded-sm bg-orange-600 text-white hover:bg-orange-700 transition flex items-center justify-center gap-2 whitespace-nowrap"><LogOut :size="12" /> Check_Out</button>
                  <button v-if="v.status !== 'completed' && v.status !== 'in-progress'" @click="markVisitCompleted(v)" class="px-3 py-1.5 text-[9px] font-mono font-bold uppercase rounded-sm bg-[#2F2E8B] text-white hover:bg-[#3D2F88] transition flex items-center justify-center gap-2 whitespace-nowrap"><Check :size="12" /> Complete</button>
                  <button @click="deleteVisit(v.id)" class="px-3 py-1.5 text-[9px] font-mono font-bold uppercase rounded-sm border border-red-600 text-red-600 hover:bg-red-50 transition flex items-center justify-center gap-2 whitespace-nowrap"><Trash2 :size="12" /> Delete</button>
                </div>
              </div>

              <!-- Timeline -->
              <div v-if="v.check_in_time || v.check_out_time" class="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-sm">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-[10px] font-mono">
                  <div v-if="v.check_in_time" class="flex items-center gap-2 border-r border-gray-200 pr-2">
                    <LogIn :size="14" class="text-green-600" />
                    <div><div class="text-gray-400 font-bold uppercase">CHECKED_IN</div><div class="text-gray-900 font-bold">{{ crmFormatDateTime(v.check_in_time) }}</div></div>
                  </div>
                  <div v-if="v.check_out_time" class="flex items-center gap-2 border-r border-gray-200 pr-2">
                    <LogOut :size="14" class="text-orange-600" />
                    <div><div class="text-gray-400 font-bold uppercase">CHECKED_OUT</div><div class="text-gray-900 font-bold">{{ crmFormatDateTime(v.check_out_time) }}</div></div>
                  </div>
                  <div v-if="v.actual_duration" class="flex items-center gap-2">
                    <Timer :size="14" class="text-blue-600" />
                    <div><div class="text-gray-400 font-bold uppercase">TOTAL_DUR</div><div class="text-gray-900 font-bold">{{ formatVisitDuration(v.actual_duration) }}</div></div>
                  </div>
                </div>
              </div>

              <!-- Visit Outcome -->
              <div v-if="v.visit_outcome" class="mb-4 p-3 bg-white border border-gray-200 rounded-sm">
                <div class="flex items-start gap-3">
                  <div class="p-1.5 border border-gray-100 rounded-sm">
                    <component :is="v.visit_outcome === 'successful' ? CheckCircle2 : (v.visit_outcome === 'no_show' ? UserMinus : (v.visit_outcome === 'rescheduled' ? CalendarClock : Info))" 
                      :size="14" 
                      :class="{ 'text-green-600': v.visit_outcome === 'successful', 'text-red-600': v.visit_outcome === 'no_show', 'text-yellow-600': v.visit_outcome === 'rescheduled', 'text-gray-600': v.visit_outcome === 'other' }" 
                    />
                  </div>
                  <div class="flex-1">
                    <div class="font-mono font-bold text-gray-900 text-[10px] uppercase tracking-wider">{{ v.visit_outcome.replace('_', ' ') }}</div>
                    <div v-if="v.outcome_notes" class="text-[11px] text-gray-600 mt-1 font-mono">{{ v.outcome_notes }}</div>
                    <div v-if="v.follow_up_required" class="text-[9px] font-mono font-bold text-orange-600 mt-2 flex items-center gap-1 uppercase tracking-tighter">
                      <AlertTriangle :size="10" /> FOLLOW_UP_REQUIRED{{ v.follow_up_date ? ` :: BY ${crmFormatDate(v.follow_up_date)}` : '' }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Notes Section -->
              <div class="mt-4 pt-4 border-t border-gray-100">
                <div class="flex items-center justify-between mb-3">
                  <div class="text-[10px] font-mono font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
                    <FileText :size="14" class="text-[#2F2E8B]" /> Visit_Notes
                  </div>
                  <button @click="ensureVisitNotesLoaded(v)" class="text-[9px] font-mono font-bold text-[#2F2E8B] hover:underline uppercase tracking-tighter flex items-center gap-1">
                    <RefreshCw :size="10" /> RE_SYNC
                  </button>
                </div>
                
                <div v-if="!visitNotes[v.id] || visitNotes[v.id].length === 0" class="text-[10px] font-mono text-gray-400 italic mb-2 tracking-tighter">LOG_EMPTY: NO_NOTES_FOUND</div>
                
                <div v-for="n in (visitNotes[v.id] || [])" :key="n.id" class="text-[11px] font-mono text-gray-700 border-l border-gray-200 pl-3 py-2 mb-2 bg-gray-50/50 rounded-r-sm">
                  <div class="flex items-start justify-between">
                    <div class="flex-1">{{ n.text }}</div>
                    <div class="text-[9px] text-gray-400 ml-2 font-bold">{{ crmFormatDateTime(n.created_at) }}</div>
                  </div>
                </div>
                
                <div class="mt-4 flex gap-2">
                  <input v-model="newVisitNote[v.id]" @focus="ensureVisitNotesLoaded(v)" @keyup.enter="submitVisitNote(v)" placeholder="ENTER_NOTE_CMD..." class="flex-1 border border-gray-200 rounded-sm px-3 py-2 text-[11px] font-mono focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] outline-none transition" />
                  <button @click="submitVisitNote(v)" class="px-4 py-2 rounded-sm bg-[#2F2E8B] text-white hover:bg-[#3D2F88] text-[10px] font-mono font-bold uppercase tracking-wider transition flex items-center gap-2">
                    <Send :size="12" /> LOG
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
            </div>
          </div>
        </div>

        <!-- New Visit Modal -->
        <Teleport to="body">
          <div v-if="showVisitModal" class="fixed inset-0 bg-black/60 backdrop-blur-md flex items-start justify-center z-[9999] p-4 pt-20 overflow-y-auto">
            <div class="bg-white rounded-sm shadow-2xl w-full max-w-2xl border border-gray-200 relative overflow-hidden animate-modal-in">
              <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
              <div class="p-4 md:p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 relative z-10">
                <div class="flex items-center gap-3">
                  <div class="w-1 h-5 bg-[#2F2E8B]"></div>
                  <h3 class="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2"><MapPin :size="14" class="text-gray-400" /> {{ editingVisit ? 'Edit_Visit' : 'Schedule_New_Visit' }}</h3>
                </div>
                <button class="text-gray-400 hover:text-gray-600 transition" @click="closeVisitModal"><X :size="20" /></button>
              </div>
              <div class="p-4 md:p-6 space-y-6 max-h-[70vh] overflow-y-auto relative z-10">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="relative">
                    <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <div class="w-1 h-1 bg-[#2F2E8B]"></div> Target_Lead
                    </label>
                    <div class="relative">
                      <input 
                        v-model="leadSearchQuery" 
                        @focus="showLeadDropdown = true" 
                        placeholder="_SEARCH_OR_SELECT_LEAD" 
                        class="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-xs font-mono focus:ring-1 focus:ring-[#2F2E8B] outline-none transition bg-white"
                      />
                      <div v-if="showLeadDropdown" class="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-sm shadow-xl max-h-60 overflow-y-auto">
                        <div 
                          v-for="ld in filteredLeads" 
                          :key="ld.id" 
                          @click="selectLead(ld)"
                          class="px-4 py-2.5 text-[10px] font-mono cursor-pointer hover:bg-gray-50 border-b border-gray-50 last:border-0"
                        >
                          <span class="font-bold text-gray-900">{{ ld.name.toUpperCase() }}</span>
                          <span class="text-gray-400 ml-2">// {{ ld.company.toUpperCase() }}</span>
                        </div>
                        <div v-if="filteredLeads.length === 0" class="px-4 py-2.5 text-[10px] font-mono text-gray-400 italic">
                          NO_RESULTS_FOUND
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <div class="w-1 h-1 bg-[#2F2E8B]"></div> Visit_Header
                    </label>
                    <input v-model="visitForm.title" class="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-xs font-mono focus:ring-1 focus:ring-[#2F2E8B] outline-none transition" placeholder="E.G. SITE_VISIT_01" />
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div v-if="!visitForm.location">
                    <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <div class="w-1 h-1 bg-[#2F2E8B]"></div> Target_Address
                    </label>
                    <input v-model="visitForm.destinationAddress" class="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-xs font-mono focus:ring-1 focus:ring-[#2F2E8B] outline-none transition" placeholder="ENTER_LOCATION_DATA..." />
                  </div>
                  <div :class="visitForm.location ? 'md:col-span-2' : ''">
                    <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <div class="w-1 h-1 bg-[#2F2E8B]"></div> Schedule_Timestamp
                    </label>
                    <input v-model="visitForm.scheduled_at" type="datetime-local" class="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-xs font-mono focus:ring-1 focus:ring-[#2F2E8B] outline-none transition" />
                  </div>
                </div>
                <div>
                  <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <div class="w-1 h-1 bg-[#2F2E8B]"></div> Internal_Context
                  </label>
                  <textarea v-model="visitForm.description" class="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-xs font-mono focus:ring-1 focus:ring-[#2F2E8B] outline-none transition" rows="4" placeholder="ADD_TECHNICAL_NOTES_HERE..."></textarea>
                </div>
              </div>
              <div class="p-4 md:p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 relative z-10">
                <button @click="closeVisitModal" class="px-6 py-2 rounded-sm border border-gray-200 text-gray-600 text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-white transition">_CANCEL</button>
                <button @click="createVisit" :disabled="!visitForm.leadId || !visitForm.title" class="px-6 py-2 rounded-sm bg-[#2F2E8B] text-white text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-[#3D2F88] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                  <Check :size="14" /> {{ editingVisit ? 'UPDATE_VISIT' : 'COMMIT_VISIT' }}
                </button>
              </div>
            </div>
          </div>
        </Teleport>

        <!-- Check-Out Modal -->
        <Teleport to="body">
          <div v-if="showCheckOutModalFlag" class="fixed inset-0 bg-black/60 backdrop-blur-md flex items-start justify-center z-[9999] p-4 pt-20">
            <div class="bg-white rounded-sm shadow-2xl w-full max-w-lg border border-gray-200 relative overflow-hidden animate-modal-in">
               <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
              <div class="p-4 md:p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 relative z-10">
                <div class="flex items-center gap-3">
                  <div class="w-1 h-5 bg-orange-600"></div>
                  <h3 class="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2"><LogOut :size="14" class="text-orange-600" /> Technical_Check_Out</h3>
                </div>
                <button class="text-gray-400 hover:text-gray-600 transition" @click="closeCheckOutModal"><X :size="20" /></button>
              </div>
              <div class="p-4 md:p-6 space-y-5 relative z-10">
                <div v-if="currentVisitForCheckOut" class="p-3 bg-gray-50 border border-gray-200 rounded-sm">
                  <div class="text-[10px] font-mono">
                    <div class="font-bold text-gray-900 uppercase mb-1">{{ currentVisitForCheckOut.title }}</div>
                    <div class="text-gray-500 uppercase flex items-center gap-2">LEAD_ENTITITY: {{ getLeadNameById(currentVisitForCheckOut.leadId) }}</div>
                  </div>
                </div>
                <div>
                  <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <div class="w-1 h-1 bg-orange-600"></div> Performance_Outcome
                  </label>
                  <select v-model="checkOutForm.visit_outcome" class="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-xs font-mono focus:ring-1 focus:ring-orange-600 outline-none transition bg-white">
                    <option value="">_SELECT_OUTCOME</option>
                    <option value="successful">SUCCESSFUL // OBJECTIVES_MET</option>
                    <option value="no_show">NO_SHOW // CLIENT_ABSENT</option>
                    <option value="rescheduled">RESCHEDULED // TARGET_DATE_CHANGED</option>
                    <option value="other">OTHER // MISC_LOG</option>
                  </select>
                </div>
                <div>
                  <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <div class="w-1 h-1 bg-orange-600"></div> Outcome_Summary
                  </label>
                  <textarea v-model="checkOutForm.outcome_notes" class="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-xs font-mono focus:ring-1 focus:ring-orange-600 outline-none transition" rows="3" placeholder="ENTER_TECHNICAL_SUMMARY..."></textarea>
                </div>
                <div class="flex items-center gap-3">
                  <input type="checkbox" v-model="checkOutForm.follow_up_required" id="followUpRequired" class="w-4 h-4 text-orange-600 border-gray-300 rounded-sm focus:ring-orange-500" />
                  <label for="followUpRequired" class="text-[10px] font-mono font-bold text-gray-700 uppercase tracking-wider">Follow_Up_Required</label>
                </div>
                <div v-if="checkOutForm.follow_up_required">
                  <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <div class="w-1 h-1 bg-orange-600"></div> Target_Follow_Up_Date
                  </label>
                  <input v-model="checkOutForm.follow_up_date" type="date" class="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-xs font-mono focus:ring-1 focus:ring-orange-600 outline-none transition" />
                </div>
              </div>
              <div class="p-4 md:p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 relative z-10">
                <button @click="closeCheckOutModal" class="px-6 py-2 rounded-sm border border-gray-200 text-gray-600 text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-white transition">_CANCEL</button>
                <button @click="confirmCheckOut" :disabled="!checkOutForm.visit_outcome || checkingOut" class="px-6 py-2 rounded-sm bg-orange-600 text-white text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                  <component :is="checkingOut ? 'Loader2' : 'Check'" :size="14" :class="{ 'animate-spin': checkingOut }" /> {{ checkingOut ? 'PROCESSING...' : 'COMMIT_OUTCOME' }}
                </button>
              </div>
            </div>
          </div>
        </Teleport>
      
  
  
</template>

<script setup>
import { BackButton } from '@/components/ui'
import { onMounted, ref, computed } from 'vue';
import { useCRMModule } from '../functions/CRMModule.js';
import { 
  UserCircle, MapPin, Plus, Navigation, LogIn, LogOut, 
  Check, Trash2, Pencil, Calendar, Timer, CheckCircle2, UserMinus, 
  CalendarClock, Info, FileText, RefreshCw, Send, AlertTriangle, X, Loader2
} from 'lucide-vue-next';

const {
  getUserEmail, activeTab, moduleLoading, visits, visitNotes, newVisitNote,
  showVisitModal, editingVisit, visitForm, openVisitModal, closeVisitModal, createVisit,
  onLeadSelect, leads, getLeadNameById, getMapsLink, formatVisitDuration,
  crmFormatDateTime, crmFormatDate, ensureVisitNotesLoaded, submitVisitNote,
  checkInVisit, showCheckOutModal, showCheckOutModalFlag, currentVisitForCheckOut,
  checkOutForm, checkingOut, closeCheckOutModal, confirmCheckOut,
  markVisitCompleted, deleteVisit, loadVisits, goToModule
} = useCRMModule();

const leadSearchQuery = ref('');
const showLeadDropdown = ref(false);

const filteredLeads = computed(() => {
  if (!leadSearchQuery.value) return leads.value;
  const q = leadSearchQuery.value.toLowerCase();
  return leads.value.filter(ld => 
    ld.name.toLowerCase().includes(q) || 
    (ld.company && ld.company.toLowerCase().includes(q))
  );
});

const selectLead = (ld) => {
  visitForm.value.leadId = ld.id;
  leadSearchQuery.value = `${ld.name.toUpperCase()} // ${ld.company.toUpperCase()}`;
  showLeadDropdown.value = false;
  onLeadSelect();
};

onMounted(() => {
  goToModule('visits');
});
</script>

<style scoped>
.dotted-pattern {
  background-image: radial-gradient(#2F2E8B 1.5px, transparent 1.5px);
  background-size: 20px 20px;
  opacity: 0.05;
}

/* Technical scrollbar */
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #2F2E8B;
  border-radius: 0px;
}
::-webkit-scrollbar-thumb:hover {
  background: #3D2F88;
}

@keyframes modal-in {
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}

.animate-modal-in {
  animation: modal-in 0.2s cubic-bezier(0, 0, 0.2, 1) forwards;
}
</style>
