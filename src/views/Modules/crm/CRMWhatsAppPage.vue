<template>
  <div class="min-h-screen flex flex-col font-sans relative text-gray-900 overflow-hidden">
    <!-- Premium Mesh Background -->
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background opacity-[0.4]"></div>

    <!-- Header -->
    <header class="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-[100] shadow-none">
      <div class="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <button @click="$router.push('/dashboard/crm')" class="text-gray-400 hover:text-[#2F2E8B] transition-colors mr-2">
            <i class="fas fa-arrow-left text-lg"></i>
          </button>
          <div class="w-2 h-8 bg-[#2F2E8B] rounded-none"></div>
          <div>
            <div class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <i class="fab fa-whatsapp text-[#2F2E8B]"></i>
              <span>CRM // WHATSAPP</span>
            </div>
            <h1 class="text-xl font-black text-gray-900 uppercase tracking-tight font-display">Communications</h1>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-[10px] font-mono font-bold text-[#2F2E8B] bg-blue-50/50 border border-blue-100 px-3 py-1.5 flex items-center gap-2 rounded-none uppercase">
            <i class="fas fa-user-circle"></i>{{ getUserEmail() || 'USER' }}
          </span>
        </div>
      </div>
    </header>

    <main class="flex-1 w-full px-4 sm:px-6 lg:px-8 pt-8 pb-40 relative z-10">
      <!-- Loading Overlay -->
      <div v-if="moduleLoading" class="absolute inset-0 z-50 bg-white/70 backdrop-blur-[2px] flex flex-col items-center justify-center">
        <div class="w-16 h-16 border-t-2 border-[#2F2E8B] rounded-full animate-spin mb-4"></div>
        <div class="text-[10px] font-mono font-bold text-[#2F2E8B] uppercase tracking-[0.2em] animate-pulse">Syncing Encrypted Logs...</div>
      </div>

      <!-- Controls & Title -->
      <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
        <div>
          <h3 class="text-2xl font-black text-gray-900 font-display flex items-center gap-3 uppercase tracking-tight">
            <i class="fab fa-whatsapp text-[#25D366]"></i>
            WhatsApp Streams
          </h3>
          <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-1">
            End-to-end trace documentation // system_ref: wa_matrix_v1
          </p>
        </div>

        <div class="flex flex-wrap gap-3">
          <div class="flex flex-col gap-1">
            <label class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest px-1">Source Filter</label>
            <select v-model="communicationFilter" class="bg-white border border-gray-200 text-gray-900 font-bold font-mono text-[11px] rounded-none px-4 py-2.5 focus:border-[#2F2E8B] focus:ring-0 uppercase transition-all shadow-none w-44">
              <option value="">ALL COMM // TRACE</option>
              <option value="email">EMAIL LOGS</option>
              <option value="call">VOICE RECORDS</option>
              <option value="whatsapp">WHATSAPP DATA</option>
              <option value="meeting">MEETING LOGS</option>
            </select>
          </div>

          <div v-if="communicationFilter === 'whatsapp'" class="flex flex-col gap-1 animate-scale-in">
            <label class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest px-1">Subtype Scan</label>
            <select v-model="whatsappSubtypeFilter" class="bg-white border border-[#2F2E8B] text-[#2F2E8B] font-bold font-mono text-[11px] rounded-none px-4 py-2.5 focus:ring-0 uppercase transition-all shadow-none w-44">
              <option value="">FULL SCAN</option>
              <option value="text">TEXT PARSING</option>
              <option value="audio_call">VOICE COMM</option>
              <option value="video_call">VIDEO TRACE</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Communications List -->
      <div class="flex-1 min-h-0 relative">
        <div 
          ref="scrollContainer"
          class="absolute inset-0 overflow-y-auto custom-scrollbar px-1"
        >
          <div class="space-y-4 pb-12">
            <div v-if="!filteredCommunications || filteredCommunications.length === 0" class="bg-white border border-gray-100 p-20 text-center relative overflow-hidden">
              <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
              <div class="relative z-10">
                <i class="fab fa-whatsapp text-gray-100 text-8xl mb-6"></i>
                <h4 class="text-xl font-black text-gray-300 font-display uppercase tracking-tight">V0 LOGS // EMPTY</h4>
                <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-2">No encrypted communication fragments detected in current matrix.</p>
              </div>
            </div>

            <div 
              v-for="comm in whatsappChronological" 
              :key="comm.id" 
              class="bg-white border border-gray-100 hover:border-[#2F2E8B] transition-all duration-300 group relative shadow-none hover:shadow-md"
            >
              <div class="absolute top-0 left-0 w-1 h-full bg-[#2F2E8B] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div class="p-6">
                <!-- Item Header -->
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 border-b border-gray-50 pb-4">
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-gray-50 border border-gray-100 flex items-center justify-center text-[#2F2E8B] group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                      <i :class="getCommunicationIcon(comm.type)" class="text-xl"></i>
                    </div>
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="text-[10px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest">TRACE_SENDER //</span>
                        <span class="text-sm font-black text-gray-900 font-display uppercase tracking-tight">{{ comm.contactName }}</span>
                      </div>
                      <div class="flex items-center gap-2 mt-0.5">
                        <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">ENTITY //</span>
                        <span class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">{{ comm.company || 'UNKNOWN_ORG' }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col items-end text-right">
                    <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">RECORDED //</span>
                    <span class="text-[11px] font-mono font-bold text-gray-900 border border-gray-100 bg-gray-50 px-2 py-1 uppercase">{{ crmFormatDateTime(comm.timestamp || comm.created_at) }}</span>
                  </div>
                </div>

                <!-- Content -->
                <div class="relative py-4 px-6 bg-gray-50/50 border-l border-gray-200 mb-6 font-mono text-[12px] leading-relaxed text-gray-800">
                  <div class="absolute top-2 right-2 text-[8px] font-mono font-bold text-gray-300 uppercase select-none">DATA_FRAGMENT</div>
                  {{ comm.subject || comm.message }}
                </div>

                <!-- Meta & Actions -->
                <div class="flex flex-wrap items-center justify-between gap-4">
                  <div class="flex items-center gap-3">
                    <span class="text-[9px] font-mono font-bold text-white bg-[#2F2E8B] px-3 py-1 uppercase tracking-widest">{{ comm.type }}</span>
                    <span v-if="comm.type === 'whatsapp' && comm.subtype" class="text-[9px] font-mono font-bold text-[#2F2E8B] border border-blue-100 bg-blue-50/50 px-3 py-1 uppercase tracking-widest">{{ comm.subtype }}</span>
                    <span class="text-[9px] font-mono font-bold text-gray-400 border border-gray-100 px-3 py-1 uppercase tracking-widest">STATUS // {{ comm.status }}</span>
                  </div>

                  <div class="flex items-center gap-2">
                    <button 
                      @click="replyToCommunication(comm)" 
                      class="px-4 py-2 border border-[#2F2E8B] text-[#2F2E8B] text-[9px] font-mono font-bold uppercase tracking-widest hover:bg-blue-50 transition-all flex items-center gap-2"
                    >
                      <i class="fas fa-reply"></i>
                      EXECUTE_REPLY
                    </button>
                    <button 
                      @click.stop="deleteCommunicationRecord(comm)" 
                      class="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>

                <!-- WhatsApp Notes Section -->
                <div v-if="comm.type === 'whatsapp'" class="mt-8 border-t border-dashed border-gray-100 pt-6">
                  <div class="flex items-center gap-2 mb-4">
                    <div class="w-1 h-4 bg-gray-200"></div>
                    <h5 class="text-[10px] font-mono font-black text-gray-900 uppercase tracking-[0.2em]">APPENDED_NOTES</h5>
                  </div>

                  <div class="space-y-3 mb-6">
                    <div v-if="!callNotes[comm.id] || callNotes[comm.id].length === 0" class="bg-gray-50/50 p-4 border border-gray-100 text-center rounded-none">
                      <p class="text-[10px] font-mono font-bold text-gray-300 uppercase tracking-widest">No metadata notes attached to this trace.</p>
                    </div>
                    <div 
                      v-for="n in (callNotes[comm.id] || [])" 
                      :key="n.id" 
                      class="bg-white border-l-2 border-[#2F2E8B] p-4 shadow-none group/note relative"
                    >
                      <div class="flex items-start justify-between gap-4">
                        <div class="text-[11px] font-mono text-gray-700 leading-relaxed">{{ n.text }}</div>
                        <div class="text-[9px] font-mono font-bold text-gray-400 bg-gray-50 px-2 py-0.5 uppercase flex-shrink-0">{{ crmFormatDateTime(n.created_at) }}</div>
                      </div>
                    </div>
                  </div>

                  <div class="flex gap-2">
                    <input 
                      v-model="newCallNote[comm.id]" 
                      @focus="ensureCallNotesLoaded(comm)" 
                      @keyup.enter="submitCallNote(comm)" 
                      placeholder="INPUT TRACE METADATA..." 
                      class="flex-1 bg-gray-50/50 border border-gray-200 focus:border-[#2F2E8B] focus:ring-0 px-4 py-3 text-[11px] font-mono font-bold uppercase tracking-widest transition-all rounded-none" 
                    />
                    <button 
                      @click="submitCallNote(comm)" 
                      class="bg-[#2F2E8B] text-white px-6 py-3 text-[10px] font-mono font-bold uppercase tracking-widest hover:opacity-90 shadow-md transition-all rounded-none flex-shrink-0"
                    >
                      APPEND
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { BackButton } from '@/components/ui'
import { onMounted, computed, ref, watch, nextTick } from 'vue';
import { useCRMModule } from './composables/CRMModule.js';

const {
  getUserEmail, activeTab, moduleLoading, filteredCommunications, communicationFilter,
  whatsappSubtypeFilter, getCommunicationBorderClass, getCommunicationIcon,
  replyToCommunication, deleteCommunicationRecord, callNotes, newCallNote,
  ensureCallNotesLoaded, submitCallNote, crmFormatDateTime, goToModule
} = useCRMModule();

const scrollContainer = ref(null);

// Chronological sort: oldest first at top, newest at bottom
const whatsappChronological = computed(() => {
  if (!filteredCommunications.value) return [];
  // Backend returns newest first, we reverse for "scroll from top to bottom" chat feel
  return [...filteredCommunications.value].reverse();
});

const scrollToBottom = () => {
  nextTick(() => {
    if (scrollContainer.value) {
      scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
    }
  });
};

// Auto-scroll to bottom when communications change
watch(whatsappChronological, () => {
  scrollToBottom();
}, { deep: true });

onMounted(async () => {
  await goToModule('whatsapp');
  scrollToBottom();
});
</script>

<style scoped>
@keyframes scale-in {
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}

.animate-scale-in {
  animation: scale-in 0.2s ease-out;
}

.mesh-background {
  background-color: #ffffff;
  background-image: 
      linear-gradient(rgba(47, 46, 139, 0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(47, 46, 139, 0.08) 1px, transparent 1px);
  background-size: 40px 40px;
}

.dotted-pattern {
  background-image: radial-gradient(rgba(47, 46, 139, 0.2) 1px, transparent 1px);
  background-size: 12px 12px;
}

/* Custom scrollbar for premium feel */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #f8fafc;
}
::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border: 2px solid #f8fafc;
}
::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}

select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%232F2E8B'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
}
</style>
