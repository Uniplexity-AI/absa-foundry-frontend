<template>
  <div class="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-6 shadow-2xl">
    <div class="bg-white shadow-[0_0_50px_rgba(47,46,139,0.2)] w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden border border-gray-200 rounded-none relative">
      <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-[0.02]"></div>
      
      <!-- Header -->
      <header class="flex items-center justify-between p-6 border-b border-gray-100 bg-white/50 backdrop-blur-md relative z-10 sticky top-0">
        <div class="flex items-center gap-3">
          <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
          <div>
            <span class="text-[10px] font-mono font-black text-gray-400 tracking-[0.2em] uppercase block mb-0.5">Email_Center // Compose</span>
            <h2 class="text-xl font-black text-gray-900 tracking-tight uppercase font-outfit">New_Message_Transmission</h2>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <button 
            @click="closeEmailModal" 
            class="w-10 h-10 flex items-center justify-center border border-gray-100 bg-white text-gray-400 hover:text-red-500 hover:border-red-500 transition-all shadow-none group"
          >
            <X :size="18" class="group-hover:rotate-90 transition-transform" />
          </button>
        </div>
      </header>

      <!-- Main Content -->
      <div class="flex-1 overflow-y-auto p-6 custom-scrollbar bg-white relative z-10">
        <form @submit.prevent="submitEmail" class="space-y-6">
          
          <!-- Recipients Row -->
          <div class="space-y-4">
            <!-- To -->
            <div class="flex items-start gap-4">
              <label class="w-20 text-[10px] font-mono font-black text-gray-400 pt-3 text-right uppercase tracking-widest">Routing_To</label>
              <div class="flex-1">
                <input 
                  type="text" 
                  v-model="recipientInput" 
                  @keydown.enter.prevent="addRecipient"
                  placeholder="ENTER_EMAIL_AND_PRESS_ENTER..." 
                  class="w-full bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] rounded-none p-3 text-[10px] font-mono uppercase tracking-widest transition-all"
                />
                <div v-if="emailForm.recipients && emailForm.recipients.length > 0" class="flex flex-wrap gap-2 mt-3">
                  <span 
                    v-for="(rec, index) in emailForm.recipients" 
                    :key="index"
                    class="inline-flex items-center gap-2 bg-blue-50 text-[#2F2E8B] text-[9px] font-mono font-black px-3 py-1.5 border border-blue-100 tracking-widest uppercase"
                  >
                    {{ rec.email }}
                    <button type="button" @click="removeRecipient(index)" class="hover:text-red-500"><X :size="12" /></button>
                  </span>
                </div>
              </div>
              <div class="flex items-center gap-2 pt-2">
                <button type="button" @click="showCc = !showCc" class="text-[9px] font-mono font-black text-gray-400 hover:text-[#2F2E8B] uppercase tracking-widest border border-gray-100 px-2 py-1 bg-gray-50 transition-colors">Cc</button>
                <button type="button" @click="showBcc = !showBcc" class="text-[9px] font-mono font-black text-gray-400 hover:text-[#2F2E8B] uppercase tracking-widest border border-gray-100 px-2 py-1 bg-gray-50 transition-colors">Bcc</button>
              </div>
            </div>

            <!-- Cc -->
            <div v-if="showCc" class="flex items-start gap-4">
              <label class="w-20 text-[10px] font-mono font-black text-gray-400 pt-3 text-right uppercase tracking-widest">Route_Cc</label>
              <div class="flex-1">
                <input 
                  type="text" 
                  v-model="emailForm.cc" 
                  placeholder="CC_RECIPIENTS..." 
                  class="w-full bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] rounded-none p-3 text-[10px] font-mono uppercase tracking-widest transition-all"
                />
              </div>
              <div class="w-[68px]"></div>
            </div>

            <!-- Bcc -->
            <div v-if="showBcc" class="flex items-start gap-4">
              <label class="w-20 text-[10px] font-mono font-black text-gray-400 pt-3 text-right uppercase tracking-widest">Route_Bcc</label>
              <div class="flex-1">
                <input 
                  type="text" 
                  v-model="emailForm.bcc" 
                  placeholder="BCC_RECIPIENTS..." 
                  class="w-full bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] rounded-none p-3 text-[10px] font-mono uppercase tracking-widest transition-all"
                />
              </div>
              <div class="w-[68px]"></div>
            </div>

            <!-- Subject -->
            <div class="flex items-start gap-4 border-t border-dashed border-gray-100 pt-4">
              <label class="w-20 text-[10px] font-mono font-black text-gray-400 pt-3 text-right uppercase tracking-widest">Subject</label>
              <div class="flex-1">
                <input 
                  type="text" 
                  v-model="emailForm.subject" 
                  placeholder="TRANSMISSION_SUBJECT..." 
                  class="w-full bg-transparent border-b-2 border-transparent hover:border-gray-100 focus:border-[#2F2E8B] focus:ring-0 rounded-none p-2 text-sm font-mono font-bold text-gray-900 transition-all placeholder-gray-300 focus:outline-none"
                />
              </div>
              <div class="w-[68px]"></div>
            </div>
          </div>

          <!-- Message Body -->
          <div class="border border-gray-200 rounded-none overflow-hidden flex flex-col h-72">
            <div class="bg-gray-50 p-2 border-b border-gray-200 flex items-center gap-2">
              <button type="button" class="p-2 text-gray-400 hover:text-[#2F2E8B] hover:bg-white rounded-none border border-transparent hover:border-gray-200 shadow-none transition"><Bold :size="14" /></button>
              <button type="button" class="p-2 text-gray-400 hover:text-[#2F2E8B] hover:bg-white rounded-none border border-transparent hover:border-gray-200 shadow-none transition"><Italic :size="14" /></button>
              <button type="button" class="p-2 text-gray-400 hover:text-[#2F2E8B] hover:bg-white rounded-none border border-transparent hover:border-gray-200 shadow-none transition"><List :size="14" /></button>
              <div class="w-px h-6 bg-gray-200 mx-2"></div>
              <button type="button" class="px-3 py-2 text-gray-400 hover:text-[#2F2E8B] hover:bg-white rounded-none border border-transparent hover:border-gray-200 shadow-none transition flex items-center gap-2 text-[9px] font-mono font-black uppercase tracking-widest">
                <Paperclip :size="12" /> ATTACH_PAYLOAD
              </button>
            </div>
            <textarea 
              v-model="emailForm.body" 
              class="flex-1 w-full bg-white border-0 focus:ring-0 p-6 text-[11px] font-mono leading-relaxed text-gray-800 resize-none custom-scrollbar focus:outline-none"
              placeholder="BEGIN_MESSAGE_BODY_HERE..."
            ></textarea>
          </div>

        </form>
      </div>

      <!-- Footer Actions -->
      <footer class="p-6 bg-gray-50/80 border-t border-gray-100 backdrop-blur-md flex items-center justify-between relative z-10">
        <label class="flex items-center gap-3 cursor-pointer group">
          <div class="relative flex items-center justify-center w-4 h-4 border border-gray-300 bg-white group-hover:border-[#2F2E8B] transition-colors">
            <input type="checkbox" v-model="emailForm.usePersonalEmail" class="opacity-0 absolute inset-0 cursor-pointer" />
            <div v-if="emailForm.usePersonalEmail" class="w-2 h-2 bg-[#2F2E8B]"></div>
          </div>
          <span class="text-[9px] font-mono font-black text-gray-400 group-hover:text-[#2F2E8B] tracking-widest uppercase transition-colors">ROUTE_VIA_PERSONAL_NODE</span>
        </label>
        
        <div class="flex items-center gap-4">
          <button 
            type="button"
            @click="closeEmailModal" 
            class="px-6 py-2.5 bg-white border border-gray-200 text-gray-400 hover:text-gray-900 rounded-none text-[10px] font-mono font-black uppercase tracking-widest hover:border-gray-300 transition-all shadow-none"
          >
            ABORT
          </button>
          <div class="flex items-center shadow-lg shadow-[#2F2E8B]/20 rounded-none overflow-hidden">
            <button 
              type="button"
              @click="submitEmail" 
              :disabled="sending"
              class="px-8 py-2.5 bg-[#2F2E8B] text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] transition-all disabled:opacity-50 flex items-center gap-3 border-r border-white/10"
            >
              <template v-if="sending">
                <Loader2 :size="14" class="animate-spin" />
                TRANSMITTING...
              </template>
              <template v-else>
                EXEC_TRANSMIT
              </template>
            </button>
            <button 
              type="button"
              class="px-3 py-2.5 bg-[#2F2E8B] text-white hover:bg-[#3D2F88] transition-all flex items-center justify-center disabled:opacity-50"
              :disabled="sending"
            >
              <ChevronDown :size="14" />
            </button>
          </div>
        </div>
      </footer>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { X, Paperclip, Bold, Italic, List, ChevronDown, Loader2 } from 'lucide-vue-next';
import { useCRMModule } from '../composables/CRMModule.js';

const {
  emailForm, showCc, showBcc, showLinkRecord, showTemplates, closeEmailModal, sendEmail
} = useCRMModule();

const recipientInput = ref('');
const sending = ref(false);

const addRecipient = () => {
  const email = recipientInput.value.trim();
  if (email && email.includes('@')) {
    if (!emailForm.value.recipients) emailForm.value.recipients = [];
    if (!emailForm.value.recipients.some(r => r.email === email)) {
      emailForm.value.recipients.push({ email });
    }
    recipientInput.value = '';
  }
};

const removeRecipient = (index) => {
  emailForm.value.recipients.splice(index, 1);
};

const submitEmail = async () => {
  if (emailForm.value.recipients.length === 0 && !recipientInput.value) {
    alert("Please add at least one recipient.");
    return;
  }
  if (recipientInput.value) {
    addRecipient();
  }
  
  sending.value = true;
  try {
    await sendEmail();
  } catch (error) {
    console.error('Failed to send email:', error);
  } finally {
    sending.value = false;
  }
};
</script>

<style scoped>
.dotted-pattern {
  background-image: radial-gradient(circle, #2F2E8B 1px, transparent 1px);
  background-size: 20px 20px;
}

.font-outfit {
  font-family: 'Outfit', sans-serif;
}

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
</style>
