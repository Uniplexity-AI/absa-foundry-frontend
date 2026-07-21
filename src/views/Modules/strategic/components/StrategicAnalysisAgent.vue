<template>
  <Transition name="fade">
    <div v-if="show" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-end">
      <div 
        class="bg-white w-full max-w-md h-full flex flex-col shadow-2xl transform transition-transform duration-300"
        :class="show ? 'translate-x-0' : 'translate-x-full'"
      >
        <!-- Header -->
        <div class="bg-gradient-to-r from-[#2F2E8B] to-[#3D2F88] p-6 text-white flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="bg-white/20 p-2 rounded-lg">
              <i class="fas fa-robot text-xl"></i>
            </div>
            <div>
              <h3 class="font-bold">Strategic AI Assistant</h3>
              <p class="text-xs text-white/70">Analysis & Document Intelligence</p>
            </div>
          </div>
          <button @click="$emit('close')" class="hover:text-white/70 transition">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>

        <!-- Chat Area -->
        <div class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50" ref="chatContainer">
          <div v-if="messages.length === 0" class="flex flex-col items-center justify-center h-full text-center p-8">
            <div class="bg-blue-100 p-4 rounded-full mb-4">
              <i class="fas fa-brain text-4xl text-[#2F2E8B]"></i>
            </div>
            <h4 class="font-bold text-gray-800 mb-2">How can I help you today?</h4>
            <p class="text-sm text-gray-500 max-w-[240px]">
              I can analyze your strategic notes, summarize uploaded reports, or help with SWOT analysis.
            </p>
          </div>

          <div 
            v-for="(msg, idx) in messages" 
            :key="idx"
            :class="[
              'flex w-full',
              msg.type === 'user' ? 'justify-end' : 'justify-start'
            ]"
          >
            <div 
              :class="[
                'max-w-[85%] p-3 rounded-2xl text-sm shadow-sm',
                msg.type === 'user' 
                  ? 'bg-[#2F2E8B] text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
              ]"
            >
              <div v-html="formatMessage(msg.content)"></div>
              <p class="text-[10px] mt-1 opacity-50">{{ msg.time }}</p>
            </div>
          </div>

          <div v-if="isTyping" class="flex justify-start">
            <div class="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm">
              <div class="flex gap-1">
                <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="p-4 bg-white border-t border-gray-100">
          <div class="flex items-center gap-2 bg-gray-100 p-2 rounded-xl focus-within:ring-2 focus-within:ring-[#2F2E8B]/20 transition-all">
            <textarea 
              v-model="userInput"
              @keydown.enter.prevent="sendMessage"
              placeholder="Ask about your strategy..."
              class="flex-1 bg-transparent border-none focus:ring-0 text-sm resize-none py-2 px-2"
              rows="1"
            ></textarea>
            <button 
              @click="sendMessage"
              :disabled="!userInput.trim() || isTyping"
              class="bg-[#2F2E8B] text-white w-10 h-10 rounded-lg flex items-center justify-center hover:bg-[#252579] disabled:opacity-50 transition shadow-md"
            >
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
          <div class="flex gap-2 mt-3">
            <button 
              v-for="suggestion in suggestions" 
              :key="suggestion"
              @click="userInput = suggestion; sendMessage()"
              class="text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded-full transition"
            >
              {{ suggestion }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue'

const props = defineProps({
  show: Boolean,
  analysisData: Object
})

const emit = defineEmits(['close'])

const userInput = ref('')
const isTyping = ref(false)
const chatContainer = ref(null)
const messages = ref([])

const suggestions = [
  'Summarize recent notes',
  'Analyze SWOT threats',
  'Check document status'
]

const scrollToBottom = async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

const sendMessage = async () => {
  if (!userInput.value.trim() || isTyping.value) return

  const userMsg = userInput.value
  messages.value.push({
    type: 'user',
    content: userMsg,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  })
  userInput.value = ''
  await scrollToBottom()

  // Simulate AI response
  isTyping.value = true
  setTimeout(() => {
    let aiResponse = "I've analyzed your request. Based on the current strategic data, I recommend focusing on the identified growth opportunities in the SME sector."
    
    if (userMsg.toLowerCase().includes('note')) {
      aiResponse = "I see your recent strategic notes. You've mentioned cost optimization several times - this aligns with the current market pressure on SME margins."
    } else if (userMsg.toLowerCase().includes('swot')) {
      aiResponse = "Your SWOT analysis shows strong internal capabilities but highlights volatile exchange rates as a major threat. Would you like me to suggest mitigation strategies?"
    }

    messages.value.push({
      type: 'ai',
      content: aiResponse,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    })
    isTyping.value = false
    scrollToBottom()
  }, 1500)
}

const formatMessage = (content) => {
  return content.replace(/\n/g, '<br>')
}

watch(() => props.show, (newVal) => {
  if (newVal) scrollToBottom()
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

textarea::-webkit-scrollbar {
  display: none;
}
</style>
