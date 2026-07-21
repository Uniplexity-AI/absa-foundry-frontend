<template>
  <div class="min-h-screen flex flex-col font-sans relative text-gray-900">
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm relative text-gray-800 blur-scoped">
      <div class="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <BackButton route="/dashboard/crm" variant="icon-only" />
          <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
          <div>
            <div class="flex items-center gap-1.5">
              <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">CRM</span>
              <span class="text-[10px] font-mono font-bold text-gray-300">//</span>
              <span class="text-[10px] font-mono font-bold text-gray-900 uppercase tracking-widest">Emails</span>
            </div>
            <h1 class="text-lg font-black text-gray-900 uppercase tracking-tight">Email_Center</h1>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-[10px] font-mono font-bold text-[#2F2E8B] bg-blue-50 border border-blue-100 px-3 py-1.5 flex items-center gap-2 rounded-none uppercase tracking-wider">
            <UserCircle :size="14" /> {{ getUserEmail() || 'USER' }}
          </span>
        </div>
      </div>
    </header>

    <div class="flex-1 w-full relative z-10 pb-40 blur-scoped">
      <div class="px-4 sm:px-6 lg:px-8 py-6 relative space-y-6">
        <div v-if="moduleLoading" class="absolute inset-0 z-20 bg-white/70 backdrop-blur-[1px] flex items-center justify-center">
          <div class="flex items-center gap-3 text-[#2F2E8B]">
            <Loader2 class="animate-spin" :size="24" />
            <span class="font-mono font-black uppercase text-sm tracking-widest">Loading_Emails...</span>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-1 h-4 bg-[#2F2E8B]"></div>
            <h3 class="text-[10px] font-black text-gray-900 uppercase tracking-widest font-mono">Communications_Hub</h3>
          </div>
          <button @click="openNewEmail" class="px-4 py-2 bg-[#2F2E8B] text-white hover:bg-[#3D2F88] transition flex items-center gap-2 font-mono font-bold uppercase text-[9px] rounded-none tracking-widest">
            <Plus :size="12" /> Compose_Message
          </button>
        </div>

        <!-- Email Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="bg-white border border-gray-200 hover:border-[#2F2E8B] transition-all duration-300 relative overflow-hidden group p-4 rounded-none">
            <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-[0.03]"></div>
            <div class="flex justify-between items-start mb-2 relative z-10">
              <div class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-[0.2em]">Sent_Today</div>
              <Send :size="14" class="text-blue-500" />
            </div>
            <div class="text-2xl font-black text-[#2F2E8B] tracking-tighter relative z-10">{{ emailStats.sentToday }}</div>
          </div>
          
          <div class="bg-white border border-gray-200 hover:border-green-500 transition-all duration-300 relative overflow-hidden group p-4 rounded-none">
            <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-[0.03]"></div>
            <div class="flex justify-between items-start mb-2 relative z-10">
              <div class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-[0.2em]">Open_Rate</div>
              <MailOpen :size="14" class="text-green-500" />
            </div>
            <div class="text-2xl font-black text-green-600 tracking-tighter relative z-10">{{ emailStats.openRate }}%</div>
          </div>

          <div class="bg-white border border-gray-200 hover:border-purple-500 transition-all duration-300 relative overflow-hidden group p-4 rounded-none">
            <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-[0.03]"></div>
            <div class="flex justify-between items-start mb-2 relative z-10">
              <div class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-[0.2em]">Click_Rate</div>
              <MousePointerClick :size="14" class="text-purple-500" />
            </div>
            <div class="text-2xl font-black text-purple-600 tracking-tighter relative z-10">{{ emailStats.clickRate }}%</div>
          </div>

          <div class="bg-white border border-gray-200 hover:border-orange-500 transition-all duration-300 relative overflow-hidden group p-4 rounded-none">
             <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-[0.03]"></div>
             <div class="flex justify-between items-start mb-2 relative z-10">
              <div class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-[0.2em]">Scheduled</div>
              <Clock :size="14" class="text-orange-500" />
             </div>
             <div class="text-2xl font-black text-orange-600 tracking-tighter relative z-10">{{ emailStats.scheduled }}</div>
          </div>
        </div>

        <!-- Email List -->
        <div class="bg-white border border-gray-200 rounded-none relative overflow-hidden flex flex-col h-[600px]">
          <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-[0.01]"></div>
          
          <div class="border-b border-gray-100 bg-gray-50/50 relative z-10 flex border-t-0">
             <button v-for="folder in ['inbox', 'sent', 'scheduled', 'drafts']" :key="folder" @click="emailListFilter = folder"
                class="px-6 py-4 transition-all text-[10px] font-mono uppercase tracking-[0.2em] flex items-center gap-2 whitespace-nowrap border-b-2"
                :class="emailListFilter === folder ? 'border-[#2F2E8B] text-[#2F2E8B] font-black bg-white shadow-sm' : 'border-transparent text-gray-400 hover:text-gray-600 font-bold'">
                <Inbox v-if="folder === 'inbox'" :size="14" />
                <Send v-if="folder === 'sent'" :size="14" />
                <Clock v-if="folder === 'scheduled'" :size="14" />
                <FileText v-if="folder === 'drafts'" :size="14" />
                {{ folder }}_[{{ emails.filter(e => e.folder === folder).length }}]
             </button>
          </div>

          <div class="flex-1 overflow-y-auto custom-scrollbar relative z-10">
            <div v-if="filteredEmails.length === 0" class="flex flex-col items-center justify-center h-full py-16">
              <div class="w-16 h-16 bg-gray-50 border border-gray-100 rounded-none flex items-center justify-center mb-4">
                <Inbox :size="24" class="text-gray-300" />
              </div>
              <h3 class="text-[11px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]">EMPTY_DIRECTORY</h3>
              <p class="text-[9px] font-mono text-gray-400 uppercase tracking-widest mt-2">No emails in {{ emailListFilter }}</p>
            </div>
            
            <div v-else class="divide-y divide-gray-100">
              <div v-for="email in filteredEmails" :key="email.id" @click="openEmailDetail(email)" 
                   class="p-4 hover:bg-gray-50 cursor-pointer transition-colors group">
                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 bg-gray-100 border border-gray-200 flex items-center justify-center text-[#2F2E8B] font-mono font-black text-sm uppercase flex-shrink-0 group-hover:bg-[#2F2E8B] group-hover:text-white transition-colors">
                    {{ getInitials(emailListFilter === 'sent' ? email.to : (email.from || email.to)) }}
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between mb-1">
                      <div class="text-[11px] font-mono font-black text-gray-900 uppercase truncate">
                        {{ emailListFilter === 'sent' ? email.to : (email.from || email.to) }}
                      </div>
                      <div class="text-[9px] font-mono text-gray-400 uppercase tracking-widest">{{ formatEmailDate(email.timestamp) }}</div>
                    </div>
                    <div class="text-[10px] font-mono font-bold text-gray-700 truncate uppercase mt-0.5">{{ email.subject || 'NO_SUBJECT' }}</div>
                    <div class="text-[10px] font-mono text-gray-500 truncate mt-1 tracking-tight">{{ email.preview }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Email Modal (Teleported to root) -->
    <Teleport to="#modal-target" v-if="showEmailModal">
      <CRMEmailModal />
    </Teleport>
  </div>
</template>

<script setup>
import { BackButton } from '@/components/ui'
import { onMounted } from 'vue';
import { useCRMModule } from './composables/CRMModule.js';
import CRMEmailModal from './components/CRMEmailModal.vue';
import { 
  UserCircle, Loader2, Plus, Send, MailOpen, 
  MousePointerClick, Clock, Inbox, FileText
} from 'lucide-vue-next';

const {
  getUserEmail, getInitials, activeTab, moduleLoading, emailStats, emails, emailListFilter,
  filteredEmails, openNewEmail, openEmailDetail, formatEmailDate, loadEmails, loadEmailStats,
  showEmailModal
} = useCRMModule();

onMounted(() => {
  activeTab.value = 'emails';
  loadEmails();
  loadEmailStats();
});
</script>

<style scoped>
.dotted-pattern {
  background-image: radial-gradient(circle, #2F2E8B 1px, transparent 1px);
  background-size: 20px 20px;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #E5E7EB;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #2F2E8B;
}
</style>
