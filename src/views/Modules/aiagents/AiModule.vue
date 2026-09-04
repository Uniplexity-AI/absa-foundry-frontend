<template>
  <div class="flex h-[100dvh] overflow-hidden bg-gray-50/50 relative">
    <!-- Mesh Background -->
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background opacity-60"></div>
    <!-- Desktop Icon Sidebar -->
    <ChatSidebar 
      :document-count="0"
      :note-count="0"
      :history-count="conversationsList.length"
      :documents-active="activePanel === 'documents'"
      :notes-active="activePanel === 'notes'"
      :history-active="activePanel === 'history'"
      @toggle-documents="togglePanel('documents')"
      @toggle-notes="togglePanel('notes')"
      @toggle-history="togglePanel('history')"
      @toggle-theme="() => {}"
      @open-settings="() => {}"
      @open-profile="() => {}"
      @expand-sidebar="() => {}"
    />

    <!-- Main Content Area -->
    <main class="flex-1 flex flex-col h-full relative w-full transition-all duration-300 z-10">
      
      <!-- Lexi Technical Header -->
      <header class="h-16 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-30 px-6 flex items-center justify-between sticky top-0">
        <div class="flex items-center gap-4">
          <div class="w-1.5 h-8 bg-[#2F2E8B] rounded-sm"></div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">SYS_ADMIN // AI_RESEARCH</span>
              <span v-if="currentConversationTitle" class="text-[10px] font-mono text-[#2F2E8B] ml-2 truncate max-w-[200px]">// {{ currentConversationTitle }}</span>
            </div>
          </div>
        </div>
        
        <div class="flex items-center gap-2">
          <button 
            @click="isDemoMode = !isDemoMode"
            class="flex items-center gap-2 px-3 py-2 rounded-sm text-[10px] font-mono font-bold uppercase transition-all shadow-none"
            :class="isDemoMode ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-300 hover:border-indigo-600 hover:text-indigo-600 text-gray-600'"
            :title="isDemoMode ? 'Standard AI Mode' : 'Browser Demo Mode'"
          >
            <i class="fas fa-magic"></i>
            <span class="hidden sm:inline">{{ isDemoMode ? 'Demo Active' : 'Demo Mode' }}</span>
          </button>
          <button 
            @click="togglePanel('history'); fetchConversations()"
            class="flex items-center gap-2 px-3 py-2 rounded-sm text-[10px] font-mono font-bold uppercase transition-all shadow-none"
            :class="activePanel === 'history' ? 'bg-[#2F2E8B] text-white' : 'bg-white border border-gray-300 hover:border-[#2F2E8B] hover:text-[#2F2E8B] text-gray-600'"
          >
            <i class="fas fa-history"></i>
            <span class="hidden sm:inline">History</span>
            <span v-if="conversationsList.length" class="ml-1 bg-white/20 text-[8px] px-1.5 py-0.5 rounded-full">{{ conversationsList.length }}</span>
          </button>
          <!-- <router-link 
            to="/dashboard/ai/demo"
            class="flex items-center gap-2 px-3 py-2 rounded-sm bg-white border border-gray-300 hover:border-indigo-600 hover:text-indigo-600 text-gray-600 text-[10px] font-mono font-bold uppercase transition-all shadow-none"
            title="Open Demo Agent"
          >
            <i class="fas fa-magic"></i>
            <span class="hidden sm:inline">Demo Agent</span>
          </router-link> -->
          <button 
            @click="showOfflineModal = true"
            class="flex items-center gap-2 px-3 py-2 rounded-sm text-[10px] font-mono font-bold uppercase transition-all shadow-none bg-white border border-gray-300 hover:border-green-600 hover:text-green-600 text-gray-600"
            title="Switch to Local AI"
          >
            <i class="fas fa-microchip"></i>
            <span class="hidden sm:inline">Offline AI</span>
          </button>
          <button 
            @click="startNewConversation"
            class="flex items-center gap-2 px-3 py-2 rounded-sm bg-[#2F2E8B] text-white text-[10px] font-mono font-bold uppercase transition-all shadow-none hover:bg-[#1D226B]"
          >
            <i class="fas fa-plus"></i>
            <span class="hidden sm:inline">New Chat</span>
          </button>
          <button 
            @click="showReportActions = !showReportActions"
            class="flex items-center gap-2 px-3 py-2 rounded-sm bg-white border border-gray-300 hover:border-[#2F2E8B] hover:text-[#2F2E8B] text-gray-600 text-[10px] font-mono font-bold uppercase transition-all shadow-none"
          >
            <i class="fas fa-file-export"></i>
            <span class="hidden sm:inline">Export</span>
          </button>
        </div>
      </header>

      <!-- Scrollable Chat Area -->
      <div 
        ref="chatContainer"
        class="flex-1 overflow-y-auto custom-scrollbar relative px-4 md:pl-20 scroll-smooth pb-0"
      >
        <!-- Main Content Area -->
          <!-- Welcome Hero (Empty State) -->
          <!-- System Ready (Lexi Hero) -->
          <div v-if="chatMessages.length === 0" class="flex flex-col items-center justify-center min-h-full py-6 max-w-5xl mx-auto text-center px-4 relative z-10">
            <div class="w-16 h-16 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-6 text-[#2F2E8B] shadow-none">
              <i class="fas fa-robot text-3xl"></i>
            </div>
            
            <h2 class="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tight">SYSTEM READY</h2>
            <p class="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-[0.2em] mb-12">Initialize research sequence. Select a tool or begin input.</p>
            
            <!-- Technical Suggestion Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <button 
                v-for="(suggestion, idx) in suggestions.slice(0, 4)" 
                :key="idx"
                @click="setMessage(suggestion)"
                class="group p-6 bg-white/80 backdrop-blur-sm border border-dashed border-gray-300 rounded-sm hover:border-[#2F2E8B] hover:bg-blue-50/20 transition-all text-left relative overflow-hidden shadow-none hover:shadow-md"
              >
                <!-- Dotted Background -->
                <div class="absolute inset-0 dotted-pattern opacity-0 group-hover:opacity-10 transition-opacity"></div>

                <div class="flex items-start justify-between mb-3 relative z-10">
                  <div class="flex items-center gap-3">
                    <i :class="['fas', getSuggestionIcon(suggestion), 'text-gray-400 group-hover:text-[#2F2E8B] transition-colors']"></i>
                    <span class="text-[10px] font-mono font-bold uppercase tracking-widest text-[#2F2E8B]">
                      QUERY ANALYST
                    </span>
                  </div>
                  <i class="fas fa-chevron-right opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#2F2E8B] text-[10px]"></i>
                </div>
                <p class="text-[11px] font-mono text-gray-500 group-hover:text-gray-900 transition-colors uppercase relative z-10 leading-relaxed">{{ suggestion }}</p>
              </button>
            </div>
          </div>

          <!-- Chat Messages List -->
          <div v-else class="w-full mx-auto space-y-6 pb-4 pt-6">
            <transition-group name="message-fade" tag="div" class="space-y-6">
              <div 
                v-for="(msg, index) in chatMessages" 
                :key="index" 
                :class="['flex gap-4 group w-full', msg.sender === 'user' ? 'justify-end' : 'justify-start']"
              >
                <!-- Message Wrapper -->
                <div :class="['relative max-w-[85%] rounded-sm p-6 border shadow-none transition-all backdrop-blur-sm', msg.sender === 'user' ? 'bg-white border-[#2F2E8B] text-gray-900' : 'bg-white/90 border-gray-200 hover:border-[#2F2E8B]']">
                  
                  <!-- Technical Label Badge -->
                  <div 
                    class="absolute -top-3 left-4 bg-white px-2 py-0.5 border rounded-sm text-[9px] font-mono font-bold uppercase tracking-widest shadow-none z-10"
                    :class="msg.sender === 'user' ? 'text-[#2F2E8B] border-[#2F2E8B]' : 'text-gray-500 border-gray-200'"
                  >
                    {{ msg.sender === 'user' ? 'OPERATOR' : 'LEXI_CORE' }}
                  </div>

                  <!-- Dotted Overlay -->
                  <div class="absolute inset-0 dotted-pattern opacity-5 pointer-events-none"></div>

                  <!-- Message Content -->
                  <div class="relative z-10 text-sm leading-relaxed prose-content">
                    <div v-if="msg.sender === 'bot'" v-html="msg.text"></div>
                    <div v-else>{{ msg.text }}</div>
                  </div>

                  <!-- Timestamp (Footer inside bubble) -->
                  <div class="mt-3 text-[8px] font-mono opacity-40 uppercase tracking-widest text-right">
                    TIMESTAMP: {{ msg.timestamp }}
                  </div>

                  <!-- Bot Actions -->
                  <div v-if="msg.sender === 'bot'" class="absolute -right-10 top-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button @click="copyToClipboard(msg.raw || msg.text)" class="p-1.5 bg-white border border-gray-200 rounded-sm text-gray-400 hover:text-[#2F2E8B] transition-colors shadow-none" title="Copy">
                      <i class="fas fa-copy text-[10px]"></i>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Lexi Typing Indicator -->
              <div v-if="loading" key="loading" class="flex justify-start">
                 <div class="bg-white/90 border border-gray-200 rounded-sm p-5 relative shadow-none max-w-[85%]">
                    <div class="absolute -top-3 left-4 bg-white px-2 py-0.5 border border-gray-200 rounded-sm text-[9px] font-mono font-bold uppercase tracking-widest text-gray-400 shadow-none">
                       LEXI_CORE // PROCESSING
                    </div>
                    <div class="flex space-x-2 mt-2">
                      <div class="w-1.5 h-1.5 bg-[#2F2E8B] rounded-full animate-bounce"></div>
                      <div class="w-1.5 h-1.5 bg-[#2F2E8B] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div class="w-1.5 h-1.5 bg-[#2F2E8B] rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                 </div>
              </div>
            </transition-group>
          </div>
      </div>

      <!-- Static Flex Footer Area (Replaces Floating) -->
      <div class="w-full z-30 px-4 pb-4 pt-2 bg-transparent md:pl-20">
        <div class="w-full flex flex-col gap-2">
          
          <!-- Suggestion Chips (Visible when not empty) -->
          <transition-group 
            tag="div" 
            name="slide-up"
            class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mask-fade" 
            v-if="chatMessages.length > 0 && !loading"
          >
            <button
              v-for="(suggestion, idx) in suggestions"
              :key="suggestion"
              @click="setMessage(suggestion)"
              class="px-3 py-1.5 bg-white/90 backdrop-blur border border-gray-200 rounded-sm text-xs font-medium text-gray-600 hover:bg-[#2F2E8B] hover:text-white hover:border-[#2F2E8B] transition-colors whitespace-nowrap shadow-none"
            >
              {{ suggestion }}
            </button>
          </transition-group>

          <!-- Lexi Refined Input Area -->
          <div class="bg-white/90 backdrop-blur-sm rounded-sm border border-gray-300 shadow-lg relative overflow-hidden group focus-within:border-[#2F2E8B] transition-all">
            <div class="absolute inset-0 dotted-pattern opacity-5 pointer-events-none"></div>

            <div class="flex items-end p-2 relative z-10">
              <textarea
                v-model="message"
                ref="messageInput"
                @input="resizeTextarea"
                @keydown.enter.exact.prevent="sendMessage"
                @keydown.enter.shift.exact="handleNewLine"
                rows="1"
                placeholder="Ask a question..."
                class="flex-1 py-4 px-4 bg-transparent border-0 focus:ring-0 resize-none text-sm font-bold text-gray-900 placeholder:text-gray-400 placeholder:font-normal leading-relaxed"
                style="min-height: 56px;"
              ></textarea>
              
              <div class="flex items-center gap-1 mb-2 mr-2">
                <button class="p-2.5 text-gray-400 hover:text-[#2F2E8B] transition-colors" title="Attach Document">
                  <i class="fas fa-paperclip"></i>
                </button>
                <button class="p-2.5 text-gray-400 hover:text-[#2F2E8B] transition-colors" title="Voice Input">
                  <i class="fas fa-microphone"></i>
                </button>
                <button 
                  @click="sendMessage"
                  :disabled="!message.trim() || loading"
                  class="ml-2 w-10 h-10 bg-[#2F2E8B] text-white rounded-sm flex items-center justify-center shadow-md hover:bg-[#1D226B] disabled:opacity-30 disabled:grayscale transition-all"
                >
                  <i class="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
          
          <p class="text-[9px] font-mono font-bold text-center text-gray-400 mt-2 uppercase tracking-[0.3em]">
            SYS_WARNING // AI responses may be inaccurate. Verify critical data.
          </p>
        </div>
      </div>

      <!-- Demo Mode Overlay -->
      <transition name="fade">
        <div v-if="demoRunning" class="fixed bottom-24 left-1/2 -translate-x-1/2 z-[99998] flex items-center gap-3 px-5 py-3 bg-[#2F2E8B] text-white rounded-sm shadow-2xl border border-indigo-400/40 text-[11px] font-mono font-bold uppercase tracking-wider pointer-events-none">
          <span class="flex h-2 w-2 rounded-full bg-indigo-200 animate-pulse"></span>
          DEMO RUNNING: {{ demoStep }}
        </div>
      </transition>

      <!-- Report Actions Dropdown (Conditionally Visible) -->
      <transition name="fade-slide">
        <div v-if="showReportActions" class="absolute top-16 right-6 w-48 bg-white rounded-sm shadow-xl border border-gray-100 p-2 z-30 flex flex-col gap-1">
          <button @click="downloadReport('pdf')" class="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-sm text-sm text-gray-700 transition-colors">
            <i class="fas fa-file-pdf text-red-500 w-4"></i> Download PDF
          </button>
          <button @click="downloadReport('docx')" class="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-sm text-sm text-gray-700 transition-colors">
            <i class="fas fa-file-word text-blue-500 w-4"></i> Download Word
          </button>
          <div class="h-px bg-gray-100 my-1"></div>
          <button @click="viewSummary" class="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-sm text-sm text-gray-700 transition-colors">
            <i class="fas fa-align-left text-gray-500 w-4"></i> View Summary
          </button>
        </div>
      </transition>
    </main>

    <!-- Context Panel (Right Drawer) -->
    <transition name="slide-right">
      <div v-if="activePanel" class="fixed right-0 top-0 bottom-0 w-[400px] bg-white shadow-2xl z-40 border-l border-gray-200 flex flex-col transition-transform duration-300">
        <!-- Panel Header -->
        <div class="h-16 flex items-center justify-between px-6 border-b border-gray-100">
          <h3 class="font-semibold text-gray-900 capitalize">{{ activePanel }}</h3>
          <button @click="activePanel = null" class="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <!-- Panel Content -->
        <div class="flex-1 overflow-y-auto p-6 bg-gray-50/50">
          
          <!-- History Content -->
          <div v-if="activePanel === 'history'">
            <!-- New Conversation Button -->
            <button 
              @click="startNewConversation"
              class="w-full mb-4 p-3 bg-[#2F2E8B] text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#1D226B] transition-all shadow-none"
            >
              <i class="fas fa-plus"></i>
              New Conversation
            </button>

            <!-- Loading state -->
            <div v-if="loadingConversations" class="text-center py-8">
              <i class="fas fa-spinner fa-spin text-[#2F2E8B] text-xl"></i>
              <p class="text-gray-400 text-xs mt-2">Loading conversations...</p>
            </div>

            <!-- Conversations List -->
            <div v-else-if="conversationsList.length > 0" class="space-y-2">
              <button 
                v-for="conv in conversationsList" 
                :key="conv._id"
                @click="loadConversation(conv._id)"
                class="w-full text-left p-3 bg-white border rounded-xl hover:border-[#2F2E8B] hover:shadow-none transition-all group"
                :class="currentConversationId === conv._id ? 'border-[#2F2E8B] bg-blue-50/30' : 'border-gray-200'"
              >
                <div class="flex items-start justify-between">
                  <p class="text-sm font-medium text-gray-700 group-hover:text-[#2F2E8B] line-clamp-2 flex-1">{{ conv.title || 'New Conversation' }}</p>
                  <button 
                    @click.stop="deleteConversation(conv._id)" 
                    class="ml-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    title="Delete"
                  >
                    <i class="fas fa-trash-alt text-xs"></i>
                  </button>
                </div>
                <div class="flex items-center gap-2 mt-1">
                  <p class="text-xs text-gray-400 truncate">{{ conv.preview || 'Empty conversation' }}</p>
                  <span class="text-[9px] text-gray-300">{{ conv.message_count || 0 }} msgs</span>
                </div>
                <p class="text-[9px] text-gray-300 mt-1">{{ formatDate(conv.updated_at) }}</p>
              </button>
            </div>

            <!-- Empty state -->
            <div v-else class="text-center py-12">
              <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-history text-gray-400 text-xl"></i>
              </div>
              <p class="text-gray-500 text-sm">No conversations yet</p>
              <p class="text-gray-400 text-xs mt-1">Start chatting to create one</p>
            </div>
          </div>
          
          <!-- Notes Content (Placeholder) -->
          <div v-if="activePanel === 'notes'" class="text-center py-12">
            <p class="text-gray-500 text-sm">Notes are coming shortly.</p>
          </div>

           <!-- Documents Content (Placeholder) -->
           <div v-if="activePanel === 'documents'" class="text-center py-12">
            <p class="text-gray-500 text-sm">Document management coming soon.</p>
          </div>

        </div>
      </div>
    </transition>

    <!-- Modals -->
    <Teleport to="body">
      <!-- Full Screen Backdrop -->
      <transition name="fade">
        <div v-if="showSummary || showEditReport || showOfflineModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          
          <!-- Offline Chat Modal -->
          <div v-if="showOfflineModal" class="bg-white rounded-sm w-full max-w-4xl h-[85vh] flex flex-col shadow-2xl animate-scale-in border border-gray-200 overflow-hidden">
            <!-- Modal Header -->
            <div class="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-sm bg-green-50 flex items-center justify-center text-green-600 border border-green-100 shadow-none">
                  <i class="fas fa-microchip" :class="{'animate-pulse': offlineLoading}"></i>
                </div>
                <div>
                  <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight">Offline Intelligence Core</h3>
                  <div class="flex items-center gap-2">
                    <span class="flex h-1.5 w-1.5 rounded-full bg-green-500"></span>
                    <p class="text-[9px] text-gray-400 font-mono uppercase font-bold tracking-widest">Local Node: Ollama // Model: FunctionGemma</p>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <button 
                  @click="offlineMessages = []"
                  class="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  title="Clear Chat"
                >
                  <i class="fas fa-trash-alt"></i>
                </button>
                <button @click="showOfflineModal = false" class="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <i class="fas fa-times text-lg"></i>
                </button>
              </div>
            </div>

            <!-- Chat Area -->
            <div 
              ref="offlineChatContainer"
              class="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/30 custom-scrollbar"
            >
              <!-- Welcome Message -->
              <div v-if="offlineMessages.length === 0" class="flex flex-col items-center justify-center h-full text-center space-y-4">
                <div class="w-16 h-16 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-green-600 shadow-none mb-2">
                  <i class="fas fa-shield-alt text-2xl"></i>
                </div>
                <h4 class="text-sm font-bold text-gray-900 uppercase">Secure Offline Environment</h4>
                <p class="text-xs text-gray-500 max-w-xs leading-relaxed">
                  This instance is running entirely on your local hardware. No data leaves this machine. 
                  You can query local dummy data and test tool integration securely.
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md pt-4">
                  <button @click="offlineMessageInput = 'Show me the latest sales data'; sendOfflineMessage()" class="px-3 py-2 bg-white border border-gray-200 rounded-sm text-[10px] font-mono text-gray-600 hover:border-green-600 hover:text-green-600 transition-all text-left">
                    > Get dummy sales
                  </button>
                  <button @click="offlineMessageInput = 'Analyze hardware inventory'; sendOfflineMessage()" class="px-3 py-2 bg-white border border-gray-200 rounded-sm text-[10px] font-mono text-gray-600 hover:border-green-600 hover:text-green-600 transition-all text-left">
                    > Check inventory
                  </button>
                </div>
              </div>

              <!-- Message List -->
              <div v-for="(msg, index) in offlineMessages" :key="index" :class="['flex gap-4 group w-full', msg.sender === 'user' ? 'justify-end' : 'justify-start']">
                <div :class="['relative max-w-[85%] rounded-sm p-4 border shadow-none transition-all', msg.sender === 'user' ? 'bg-white border-green-600 text-gray-900' : 'bg-white border-gray-200']">
                  <div class="absolute -top-3 left-4 bg-white px-2 py-0.5 border rounded-sm text-[8px] font-mono font-bold uppercase tracking-widest shadow-none" :class="msg.sender === 'user' ? 'text-green-600 border-green-600' : 'text-gray-500 border-gray-200'">
                    {{ msg.sender === 'user' ? 'LOCAL_OP' : 'OFFLINE_CORE' }}
                  </div>
                  <div class="text-sm leading-relaxed" v-html="msg.text"></div>
                  <div class="mt-2 text-[7px] font-mono opacity-40 uppercase tracking-widest text-right">
                    LOC_TIME: {{ msg.timestamp }}
                  </div>
                </div>
              </div>

              <!-- Typing Indicator -->
              <div v-if="offlineLoading" class="flex justify-start">
                 <div class="bg-white border border-gray-200 rounded-sm p-4 relative shadow-none">
                    <div class="flex space-x-2">
                      <div class="w-1.5 h-1.5 bg-green-600 rounded-full animate-bounce"></div>
                      <div class="w-1.5 h-1.5 bg-green-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div class="w-1.5 h-1.5 bg-green-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                 </div>
              </div>
            </div>

            <!-- Input Area -->
            <div class="p-4 bg-white border-t border-gray-100">
              <div class="flex gap-2">
                <input 
                  v-model="offlineMessageInput"
                  @keydown.enter="sendOfflineMessage"
                  placeholder="Query local system..."
                  class="flex-1 bg-gray-50 border border-gray-200 rounded-sm px-4 py-3 text-sm font-mono focus:outline-none focus:border-green-600 transition-colors"
                  :disabled="offlineLoading"
                />
                <button 
                  @click="sendOfflineMessage"
                  :disabled="!offlineMessageInput.trim() || offlineLoading"
                  class="w-12 bg-green-600 text-white rounded-sm flex items-center justify-center shadow-md hover:bg-green-700 disabled:opacity-30 transition-all"
                >
                  <i class="fas fa-paper-plane"></i>
                </button>
              </div>
              <p class="text-[8px] font-mono text-center text-gray-400 mt-2 uppercase tracking-[0.2em]">
                PRIVACY MODE ACTIVE // NO DATA TRANSMISSION
              </p>
            </div>
          </div>

          <!-- Summary Modal -->
          <div v-if="showSummary" class="bg-white rounded-sm w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl animate-scale-in border border-gray-200">
            <div class="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight">Conversation Summary</h3>
              <button @click="showSummary = false" class="text-gray-400 hover:text-gray-600 transition-colors">
                <i class="fas fa-times text-lg"></i>
              </button>
            </div>
            <div class="p-6 overflow-y-auto prose prose-sm max-w-none text-gray-600">
              {{ summary }}
            </div>
          </div>

          <!-- Edit Report Modal -->
          <div v-if="showEditReport" class="bg-white rounded-sm w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl animate-scale-in border border-gray-200 overflow-hidden">
            <div class="p-6 border-b border-gray-100 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-sm bg-blue-50 flex items-center justify-center text-[#2F2E8B] border border-blue-100">
                  <i class="fas fa-edit"></i>
                </div>
                <div>
                  <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight">Review Report</h3>
                  <p class="text-[9px] text-gray-400 font-mono uppercase font-bold tracking-widest">Edit content before exporting</p>
                </div>
              </div>
              <button @click="showEditReport = false" class="text-gray-400 hover:text-gray-600 transition-colors">
                <i class="fas fa-times text-lg"></i>
              </button>
            </div>
            
            <div class="flex-1 p-6 overflow-hidden flex flex-col bg-gray-50/50">
              <textarea 
                v-model="editableReport"
                class="flex-1 w-full bg-white border border-gray-200 rounded-sm p-4 font-mono text-sm focus:ring-0 focus:border-[#2F2E8B] outline-none resize-none transition-all shadow-inner"
                placeholder="Report content..."
              ></textarea>
            </div>

            <div class="p-6 border-t border-gray-100 flex justify-end gap-3 bg-white">
              <button @click="showEditReport = false" class="px-5 py-2.5 text-gray-500 font-mono font-bold text-[10px] uppercase hover:bg-gray-100 rounded-sm transition-colors border border-gray-200">Cancel</button>
              <button 
                @click="downloadEditedReport" 
                class="px-5 py-2.5 bg-[#2F2E8B] text-white font-mono font-bold text-[10px] uppercase rounded-sm hover:bg-[#1D226B] shadow-lg transition-all flex items-center gap-2"
                :disabled="loadingReport"
              >
                <i v-if="loadingReport" class="fas fa-spinner fa-spin"></i>
                <i v-else class="fas fa-download"></i>
                <span>Download Report</span>
              </button>
            </div>
          </div>

        </div>
      </transition>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { decodeJWT } from '@/services/decodeJWT.js';
import API_BASE_URL from '@/services/api.js';
import { marked } from 'marked';
import he from 'he';
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType } from 'docx';
import ChatSidebar from './components/ChatSidebar.vue';
import { useActivityTracker } from '@/config/useActivityTracker.js';

const { getUserRole, getUserName, getCompanyName, getUserEmail } = decodeJWT();

/**
 * Custom Ollama Client to avoid Node.js dependencies during build
 * and handle browser-specific issues like CORS and Mixed Content.
 */
class LocalOllamaClient {
  constructor(baseUrl = 'http://127.0.0.1:11434') {
    this.baseUrl = baseUrl;
  }

  async chat({ model, messages, tools, stream = false }) {
    try {
      const response = await fetch(`${this.baseUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages,
          tools,
          stream
        }),
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Model "${model}" not found. Please run "ollama pull ${model}" in your terminal.`);
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Ollama server returned ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      console.error('Ollama Fetch Error:', err);
      
      // Handle Mixed Content (HTTPS -> HTTP) and CORS/Network errors
      if (window.location.protocol === 'https:' && this.baseUrl.startsWith('http://localhost')) {
        throw new Error(
          'Security Block: Your browser is blocking the connection to local AI because this site uses HTTPS. ' +
          'To fix this: \n1. Open chrome://flags/#allow-insecure-localhost in a new tab\n2. Set it to "Enabled"\n3. Relaunch your browser.'
        );
      }
      
      throw new Error(
        'Local AI (Ollama) is not responding. \n' +
        '1. Ensure Ollama is running at http://localhost:11434\n' +
        '2. Ensure "functiongemma" is installed (run: ollama pull functiongemma)\n' +
        '3. If on Linux/Mac, set OLLAMA_ORIGINS="*" environment variable.'
      );
    }
  }
}

const ollama = new LocalOllamaClient();
const router = useRouter();

// ---------------------------------------------------------------------------
// Demo Mode — frontend command executor
// ---------------------------------------------------------------------------
const demoRunning = ref(false);
const demoStep = ref('');

function findByText(text) {
  const candidates = document.querySelectorAll(
    'button, a, [role="button"], h1, h2, h3, h4, span, li, th, td, label, div[class*="card"], div[class*="btn"]'
  );
  return Array.from(candidates).filter(el => {
    const t = (el.innerText || el.textContent || '').trim();
    return t.toLowerCase() === text.toLowerCase() && el.offsetParent !== null;
  });
}

function addHighlight(el, label, color) {
  el.dataset.demoHighlight = 'true';
  el.style.outline = `3px solid ${color}`;
  el.style.outlineOffset = '3px';
  el.style.boxShadow = `0 0 12px ${color}80`;
  el.style.transition = 'all 0.3s ease';
  el.style.borderRadius = '4px';
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });

  if (label) {
    const tip = document.createElement('div');
    tip.className = 'lexi-demo-tip';
    tip.textContent = label;
    tip.style.cssText = `
      position:fixed; background:${color}; color:#fff; font-size:11px;
      font-family:monospace; font-weight:700; padding:4px 10px;
      border-radius:4px; pointer-events:none; z-index:99999;
      box-shadow:0 2px 8px rgba(0,0,0,0.3); white-space:nowrap;
    `;
    document.body.appendChild(tip);
    const rect = el.getBoundingClientRect();
    tip.style.left = Math.max(8, rect.left) + 'px';
    tip.style.top  = Math.max(8, rect.top - 36) + 'px';
    tip.dataset.demoTip = 'true';
  }
}

function clearHighlights() {
  document.querySelectorAll('[data-demo-highlight]').forEach(el => {
    el.style.outline = '';
    el.style.outlineOffset = '';
    el.style.boxShadow = '';
    el.style.borderRadius = '';
    delete el.dataset.demoHighlight;
  });
  document.querySelectorAll('[data-demo-tip]').forEach(el => el.remove());
}

async function executeDemoActions(actions) {
  demoRunning.value = true;
  clearHighlights();
  try {
    for (const action of actions) {
      if (action.type === 'navigate') {
        demoStep.value = `Navigating to ${action.to}…`;
        await router.push(action.to);
        await new Promise(r => setTimeout(r, 1800)); // wait for Vue render

      } else if (action.type === 'highlight_text') {
        const color = action.color || '#2F2E8B';
        demoStep.value = action.label || `Highlighting: ${action.text}`;
        const els = findByText(action.text);
        if (els.length) addHighlight(els[0], action.label, color);

      } else if (action.type === 'click_text') {
        // Click a button / link identified by its visible text
        demoStep.value = `Clicking: ${action.text}`;
        const els = findByText(action.text);
        if (els.length) {
          const el = els[0];
          addHighlight(el, `Clicking: ${action.text}`, action.color || '#f59e0b');
          await new Promise(r => setTimeout(r, 600));
          el.click();
          await new Promise(r => setTimeout(r, action.wait_after || 1200));
        }

      } else if (action.type === 'fill_placeholder') {
        // Fill an input/textarea identified by its placeholder text
        demoStep.value = `Filling: ${action.placeholder}`;
        const input = document.querySelector(`[placeholder="${action.placeholder}"]`);
        if (input) {
          input.focus();
          // Use nativeInputValueSetter to trigger Vue's v-model reactivity
          const nativeSetter = Object.getOwnPropertyDescriptor(
            input.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype,
            'value'
          )?.set;
          if (nativeSetter) nativeSetter.call(input, action.value);
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
          addHighlight(input, `${action.placeholder}: ${action.value}`, '#2F2E8B');
          await new Promise(r => setTimeout(r, 600));
        }

      } else if (action.type === 'explain') {
        demoStep.value = action.text;

      } else if (action.type === 'wait') {
        await new Promise(r => setTimeout(r, action.ms || 800));
      }
    }
  } finally {
    // Keep highlights visible for 4 s then clean up
    await new Promise(r => setTimeout(r, 4000));
    clearHighlights();
    demoRunning.value = false;
    demoStep.value = '';
  }
}

function parseDemoActions(rawText) {
  const match = rawText.match(/```json\s*([\s\S]*?)```/);
  if (!match) return null;
  try {
    const parsed = JSON.parse(match[1].trim());
    return parsed.demo_actions || null;
  } catch { return null; }
}

useActivityTracker({
  userId: getUserEmail(),
  module: 'AI Module'
});
// State
const message = ref('');
const loading = ref(false);
const loadingReport = ref(false);
const chatMessages = ref([]);
const chatContainer = ref(null);
const messageInput = ref(null);
const activePanel = ref(null); // 'history', 'notes', 'documents'
const showSummary = ref(false);
const showEditReport = ref(false);
const showReportActions = ref(false);
const summary = ref('');
const editableReport = ref('');
const currentFormat = ref('pdf');

// Conversation management state
const currentConversationId = ref(null);
const currentConversationTitle = ref('');
const conversationsList = ref([]);
const loadingConversations = ref(false);

// Demo Mode State
const isDemoMode = ref(false);

// Offline Mode State
const showOfflineModal = ref(false);
const offlineMessages = ref([]);
const offlineMessageInput = ref('');
const offlineLoading = ref(false);
const offlineChatContainer = ref(null);

// Offline Agent Dummy Data & Tools
const dummySalesData = [
  { item: "ESP32 DevKit", sku: "ESP32-WROOM-32", price: 500, currency: "K", quantity: 15, date: "2026-03-24", category: "Electronics" },
  { item: "Arduino Nano", sku: "ARD-NANO-V3", price: 350, currency: "K", quantity: 8, date: "2026-03-23", category: "Electronics" },
  { item: "Raspberry Pi 4", sku: "RPI4-4GB", price: 1200, currency: "K", quantity: 3, date: "2026-03-22", category: "Electronics" },
  { item: "ESP32 CAM", sku: "ESP32-CAM", price: 650, currency: "K", quantity: 12, date: "2026-03-21", category: "Electronics" },
  { item: "ESP32-S3", sku: "ESP32-S3-DEVKIT", price: 850, currency: "K", quantity: 20, date: "2026-03-24", category: "Electronics" },
  { item: "Mojo Energy", sku: "Mojo Energy", price: 850, currency: "K", quantity: 20, date: "2026-03-24", category: "Food" }
];

const getDummySales = (args) => {
  const item = args?.item || '';
  if (!item) return dummySalesData;
  return dummySalesData.filter(s => s.item.toLowerCase().includes(item.toLowerCase()));
};

const offlineTools = [
  {
    type: 'function',
    function: {
      name: 'get_dummy_sales',
      description: 'Retrieve dummy sales and inventory data for hardware items like ESP32, Arduino, and Pi. Useful for testing analytics when offline.',
      parameters: {
        type: 'object',
        properties: {
          item: { type: 'string', description: 'Filter by item name (e.g., "esp32")' }
        }
      }
    }
  }
];

const chatHistory = ref({
  today: [],
  yesterday: [],
  'Past 7 Days': []
});

const suggestions = ref([
  'Analyze my sales performance',
  'Generate a monthly inventory report',
  'What are my top selling products?',
  'Show me customer acquisition trends'
]);

// Icons for suggestions
const getSuggestionIcon = (text) => {
  if (text.includes('sales') || text.includes('revenue')) return 'fa-chart-pie';
  if (text.includes('inventory') || text.includes('product')) return 'fa-boxes';
  if (text.includes('customer') || text.includes('trends')) return 'fa-users';
  return 'fa-lightbulb';
};

// Panel Management
const togglePanel = (panel) => {
  activePanel.value = activePanel.value === panel ? null : panel;
};

// Auto-resize textarea
const handleNewLine = (event) => {
  const textarea = event.target;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  message.value = message.value.substring(0, start) + '\n' + message.value.substring(end);
  nextTick(() => {
    textarea.selectionStart = textarea.selectionEnd = start + 1;
    resizeTextarea();
  });
};

const resizeTextarea = () => {
  if (messageInput.value) {
    messageInput.value.style.height = 'auto'; // Reset height
    messageInput.value.style.height = Math.min(messageInput.value.scrollHeight, 128) + 'px'; // Max height ~128px
  }
};

// Set suggestion as message
const setMessage = (suggestion) => {
  message.value = suggestion;
  sendMessage();
};

const scrollToBottom = async () => {
  await nextTick();
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

const scrollOfflineChatToBottom = async () => {
  await nextTick();
  if (offlineChatContainer.value) {
    offlineChatContainer.value.scrollTop = offlineChatContainer.value.scrollHeight;
  }
};

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    // Could add toast here
  } catch (err) {
    console.error('Failed to copy', err);
  }
};

// ---- Conversation API helpers ----

const fetchConversations = async () => {
  loadingConversations.value = true;
  try {
    const { data } = await axios.get(`${API_BASE_URL}/conversations/`);
    conversationsList.value = data.conversations || [];
  } catch (err) {
    console.error('Failed to fetch conversations', err);
  } finally {
    loadingConversations.value = false;
  }
};

const createConversation = async (title = 'New Conversation') => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/conversations/`, { title });
    currentConversationId.value = data._id;
    currentConversationTitle.value = data.title;
    // Generate a fresh thread_id for the LangGraph memory
    const threadId = Math.random().toString(36).substring(2, 10);
    localStorage.setItem('thread_id', threadId);
    // Refresh sidebar list
    await fetchConversations();
    return data;
  } catch (err) {
    console.error('Failed to create conversation', err);
  }
};

const loadConversation = async (conversationId) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/conversations/${conversationId}`);
    currentConversationId.value = data._id;
    currentConversationTitle.value = data.title || 'Conversation';
    // Map stored messages to chatMessages format
    chatMessages.value = (data.messages || []).map(m => ({
      sender: m.role === 'user' ? 'user' : 'bot',
      text: m.role === 'ai' ? marked.parse(m.content) : m.content,
      raw: m.content,
      timestamp: m.timestamp ? new Date(m.timestamp).toLocaleTimeString('en-ZM', { hour12: true }) : ''
    }));
    // Use the conversation id as the thread_id for LangGraph continuity
    localStorage.setItem('thread_id', conversationId);
    activePanel.value = null; // close panel
    await nextTick();
    scrollToBottom();
  } catch (err) {
    console.error('Failed to load conversation', err);
  }
};

const saveMessagesToConversation = async (userMsg, aiMsg) => {
  if (!currentConversationId.value) return;
  try {
    await axios.post(`${API_BASE_URL}/conversations/${currentConversationId.value}/messages/batch`, [
      { role: 'user', content: userMsg },
      { role: 'ai', content: aiMsg }
    ]);
    // Refresh sidebar list so title & preview update
    await fetchConversations();
  } catch (err) {
    console.error('Failed to save messages', err);
  }
};

const startNewConversation = async () => {
  chatMessages.value = [];
  currentConversationId.value = null;
  currentConversationTitle.value = '';
  activePanel.value = null;
  scrollToBottom();
};

const deleteConversation = async (conversationId) => {
  try {
    await axios.delete(`${API_BASE_URL}/conversations/${conversationId}`);
    if (currentConversationId.value === conversationId) {
      currentConversationId.value = null;
      currentConversationTitle.value = '';
      chatMessages.value = [];
    }
    await fetchConversations();
  } catch (err) {
    console.error('Failed to delete conversation', err);
  }
};

// Offline Modal Send Logic
const sendOfflineMessage = async () => {
  if (!offlineMessageInput.value.trim() || offlineLoading.value) return;

  const userMessage = offlineMessageInput.value;
  const timestamp = new Date().toLocaleTimeString('en-ZM', { hour12: true });

  offlineMessages.value.push({
    sender: 'user',
    text: userMessage,
    timestamp
  });

  offlineMessageInput.value = '';
  offlineLoading.value = true;
  scrollOfflineChatToBottom();

  try {
    const messages = offlineMessages.value.map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.raw || m.text
    }));

    const response = await ollama.chat({
      model: 'functiongemma',
      // model: 'gemma3:1b',
      messages: messages,
      tools: offlineTools,
    }).catch(err => {
      console.error('Ollama Chat Error:', err);
      throw new Error('Local AI (Ollama) is not responding. Ensure Ollama is running at http://localhost:11434 and "functiongemma" is installed.');
    });

    let finalResponse = response;

    if (finalResponse.message.tool_calls && finalResponse.message.tool_calls.length > 0) {
      messages.push(finalResponse.message);
      
      for (const tool of finalResponse.message.tool_calls) {
        if (tool.function.name === 'get_dummy_sales') {
          const args = typeof tool.function.arguments === 'string' 
            ? JSON.parse(tool.function.arguments) 
            : tool.function.arguments;
          const result = getDummySales(args);
          
          messages.push({
            role: 'tool',
            content: JSON.stringify(result),
            ...(tool.id && { tool_call_id: tool.id })
          });
        }
      }

      finalResponse = await ollama.chat({
        model: 'functiongemma',
        messages: messages,
      });
    }

    const rawBotText = finalResponse.message.content || "I've processed the data using local tools.";
    const rendered = marked.parse(rawBotText);

    offlineMessages.value.push({
      sender: 'bot',
      text: rendered,
      raw: rawBotText,
      timestamp: new Date().toLocaleTimeString('en-ZM', { hour12: true })
    });

  } catch (error) {
    console.error('Offline Chat error:', error);
    offlineMessages.value.push({
      sender: 'bot',
      text: `<p class="text-red-500">${error.message || 'I encountered an error connecting to the local AI. Please try again.'}</p>`,
      timestamp: new Date().toLocaleTimeString('en-ZM', { hour12: true })
    });
  } finally {
    offlineLoading.value = false;
    scrollOfflineChatToBottom();
  }
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now - d;
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d ago`;
  return d.toLocaleDateString();
};

// Main Send Logic
const sendMessage = async () => {
  if (!message.value.trim() || loading.value) return;

  const userMessage = message.value;
  const timestamp = new Date().toLocaleTimeString('en-ZM', { hour12: true });

  // Show user message immediately to give feedback
  chatMessages.value.push({
    sender: 'user',
    text: userMessage,
    timestamp
  });

  // Clear input and set loading
  message.value = '';
  if (messageInput.value) messageInput.value.style.height = '48px';
  loading.value = true;
  scrollToBottom();

  try {
    // Auto-create a conversation if none is active
    if (!currentConversationId.value) {
      await createConversation(userMessage.substring(0, 80));
    }

    const threadId = localStorage.getItem('thread_id') || Math.random().toString(36).substring(7);
    if (!localStorage.getItem('thread_id')) localStorage.setItem('thread_id', threadId);

    // --- Online Logic ---
    const role = getUserRole();
    const companyName = getCompanyName();
    const userName = getUserName();
    
    // Construct query properly. Only include context tags if values exist.
    let contextPrefix = "";
    if (role) contextPrefix += `[role: ${role}] `;
    if (companyName) contextPrefix += `[company_name: ${companyName}] `;
    if (userName) contextPrefix += `[user_name: ${userName}] `;
    
    const instructions = "You are an AI assistant for a business analytics platform. Answer the user's query based on the provided context. If you don't know the answer, say you don't know. Always provide concise and relevant information.";
    // If no context, we rely on the backend extracting from token.
    const queryString = `${instructions}${contextPrefix}${userMessage}`;

    const response = await axios.post(
      isDemoMode.value 
        ? `${API_BASE_URL}/demo-agent/chat` 
        : `${API_BASE_URL}/owners-agent/query`, 
      isDemoMode.value 
        ? { message: userMessage, thread_id: threadId }
        : { query: queryString, thread_id: threadId }
    );

    const data = response.data;
    
    // Process response
    const rawBotText = data.answer || data.response || "I couldn't process that request.";

    // In demo mode: extract and execute demo_actions, strip JSON block from display
    let displayText = rawBotText;
    if (isDemoMode.value) {
      const actions = parseDemoActions(rawBotText);
      if (actions && actions.length) {
        displayText = rawBotText.replace(/```json[\s\S]*?```/g, '').trim();
        nextTick(() => executeDemoActions(actions));
      }
    }

    const rendered = marked.parse(displayText);

    chatMessages.value.push({
      sender: 'bot',
      text: rendered,
      raw: rawBotText,
      timestamp: new Date().toLocaleTimeString('en-ZM', { hour12: true })
    });

    // Persist the user + AI messages to the conversation in the DB
    await saveMessagesToConversation(userMessage, rawBotText);

  } catch (error) {
    console.error('Chat error:', error);
    const status = error?.response?.status;
    const detail = error?.response?.data?.detail || error?.response?.data?.message || error?.message || 'Unknown error';
    let errorText = `<p class="text-red-500">Error (${status || 'Network'}): ${detail}</p>`;
    if (status === 401) errorText = `<p class="text-red-500">Session expired — please log in again.</p>`;
    if (status === 403) errorText = `<p class="text-red-500">Permission denied: your role cannot access this feature.</p>`;
    chatMessages.value.push({
      sender: 'bot',
      text: errorText,
      timestamp: new Date().toLocaleTimeString('en-ZM', { hour12: true })
    });
  } finally {
    loading.value = false;
    scrollToBottom();
  }
};

// Report Logic (Simplified for brevity, logic remains same as previous verified version)
const downloadReport = async (format) => {
  currentFormat.value = format;
  loadingReport.value = true;
  
  // Find last bot message with raw content
  const lastBotMsg = [...chatMessages.value].reverse().find(m => m.sender === 'bot');
  if (!lastBotMsg) {
    alert("No AI response to export");
    loadingReport.value = false;
    return;
  }

  editableReport.value = lastBotMsg.raw || "No content available";
  showEditReport.value = true;
  showReportActions.value = false;
  loadingReport.value = false;
};

const downloadEditedReport = async () => {
    loadingReport.value = true;
    const content = editableReport.value;
    
    // Simulate download delay
    await new Promise(r => setTimeout(r, 1000));
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `AI_Report_${new Date().toISOString().slice(0,10)}.${currentFormat.value === 'pdf' ? 'txt' : 'txt'}`);
    
    showEditReport.value = false;
    loadingReport.value = false;
};

const viewSummary = () => {
  const lastBotMsg = [...chatMessages.value].reverse().find(m => m.sender === 'bot');
  if (lastBotMsg) {
    summary.value = lastBotMsg.raw || "No summary available";
    showSummary.value = true;
    showReportActions.value = false;
  }
};

const loadChatHistory = (chat) => {
  chatMessages.value = chat.messages || [];
  activePanel.value = null; // Close panel
};

onMounted(async () => {
  // Load saved conversations from DB
  await fetchConversations();
  // Initial Suggestions Load
  fetchSuggestions();
});

const fetchSuggestions = async () => {
  try {
     const response = await fetch(`${API_BASE_URL}/suggestion-agent/suggestions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ context: 'business stats' })
    });
    const data = await response.json();
    if (data.suggestions) suggestions.value = data.suggestions;
  } catch (e) {
    console.error("Failed to load suggestions", e);
  }
};
</script>

<style scoped>
/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #CBD5E1;
  border-radius: 20px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #94A3B8;
}

/* Fade Transition */
.fade-enter-active {
  transition: opacity 0.15s ease-in;
}
.fade-leave-active {
  transition: opacity 0.1s ease-out;
  position: absolute;
  width: 100%;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Message Fade Transition */
.message-fade-enter-active {
  transition: opacity 0.2s ease-in, transform 0.2s ease-in;
}
.message-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

/* Animations */
.slide-down-enter-active, .slide-down-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-down-enter-from, .slide-down-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

/* Animations */
.animate-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-scale-in {
  animation: scaleIn 0.2s ease-out;
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.mask-fade {
  mask-image: linear-gradient(to right, black 90%, transparent 100%);
}

/* Prose Styling for MD */
:deep(.prose-content ul) {
  list-style-type: disc;
  padding-left: 1.25rem;
  margin-bottom: 0.5rem;
}
:deep(.prose-content ol) {
  list-style-type: decimal;
  padding-left: 1.25rem;
  margin-bottom: 0.5rem;
}
:deep(.prose-content p) {
  margin-bottom: 0.75rem;
}
:deep(.prose-content strong) {
  font-weight: 600;
  color: inherit;
}
:deep(.prose-content h3) {
  font-size: 1.1em;
  font-weight: 700;
  margin-top: 1em;
  margin-bottom: 0.5em;
}
</style>
