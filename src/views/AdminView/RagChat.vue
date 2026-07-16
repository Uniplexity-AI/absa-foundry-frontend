<template>
  <div class="min-h-screen flex flex-col font-sans relative text-gray-900">
    
    <!-- Mesh Background -->
    <!-- Mesh Background (Fixed to viewport to prevent cutoff on scroll) -->
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm relative h-16 flex-shrink-0">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-2 h-8 bg-[#2F2E8B] rounded-sm"></div>
          <div>
              <div class="flex items-center gap-2">
                 <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">SYS_ADMIN // AI_RESEARCH</span>
              </div>
              <h1 class="text-xl font-black text-gray-900 uppercase tracking-tight">Lexi Assistant</h1>
          </div>
        </div>
        
        <!-- Tool Toggles -->
        <div class="flex items-center h-full space-x-6">
           <button 
             @click="toggleFeature('search')"
             :class="[
               activeFeature === 'search' ? 'border-[#2F2E8B] text-[#2F2E8B]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
               'h-full flex items-center gap-2 border-b-2 font-bold text-xs font-mono uppercase tracking-wider transition-colors px-1'
             ]"
           >
             <i class="fas fa-search"></i> Search
           </button>
           <button 
             @click="toggleFeature('tools')"
             :class="[
               activeFeature === 'tools' ? 'border-[#2F2E8B] text-[#2F2E8B]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
               'h-full flex items-center gap-2 border-b-2 font-bold text-xs font-mono uppercase tracking-wider transition-colors px-1'
             ]"
           >
             <i class="fas fa-tools"></i> Tools
           </button>
           <button 
             @click="toggleFeature('analytics')"
             :class="[
               activeFeature === 'analytics' ? 'border-[#2F2E8B] text-[#2F2E8B]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
               'h-full flex items-center gap-2 border-b-2 font-bold text-xs font-mono uppercase tracking-wider transition-colors px-1'
             ]"
           >
             <i class="fas fa-chart-line"></i> Analytics
           </button>
        </div>
        
        <div class="flex items-center gap-3 border-l border-gray-200 pl-6 ml-6">
           <button 
             @click="isSidebarCollapsed = !isSidebarCollapsed"
             class="text-gray-400 hover:text-[#2F2E8B] transition-colors"
             title="Toggle Sidebar"
           >
             <i class="fas" :class="isSidebarCollapsed ? 'fa-columns' : 'fa-expand-alt'"></i>
           </button>
        </div>
      </div>
    </header>

    <div class="flex-1 flex overflow-hidden relative z-10 w-full max-w-7xl mx-auto">
      
      <!-- Statistics / Search / Tools Panels (Overlay or Embedded) -->
      <!-- We render these as a slide-down panel if active -->
      <div v-if="activeFeature" class="absolute top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg animate-slide-down max-h-[50vh] overflow-y-auto">
          
          <!-- Search Panel -->
          <div v-if="activeFeature === 'search'" class="max-w-4xl mx-auto p-6">
             <div class="relative mb-6">
                <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input 
                  v-model="searchQuery" 
                  type="text" 
                  placeholder="Search knowledge base metadata..." 
                  class="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] font-mono text-sm"
                  ref="searchInputRef"
                >
             </div>
             
             <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="file in filteredFiles" :key="file.name" class="p-4 border border-gray-100 rounded-sm hover:border-[#2F2E8B] hover:bg-blue-50/10 cursor-pointer transition-colors flex items-center gap-3">
                   <div class="w-10 h-10 bg-gray-100 rounded-sm flex items-center justify-center text-gray-400">
                      <i class="fas fa-file-alt"></i>
                   </div>
                   <div class="overflow-hidden">
                      <p class="text-xs font-bold text-gray-900 truncate">{{ file.name }}</p>
                      <p class="text-[10px] font-mono text-gray-400">{{ formatDate(file.uploaded_at) }}</p>
                   </div>
                   <button class="ml-auto text-[#2F2E8B] text-xs font-bold uppercase" @click="askAboutFile(file)">Analyze</button>
                </div>
                <div v-if="filteredFiles.length === 0" class="col-span-2 text-center py-8 text-gray-400 font-mono text-xs uppercase">
                   No documents found matching "{{ searchQuery }}"
                </div>
             </div>
          </div>

          <!-- Tools Panel -->
          <div v-if="activeFeature === 'tools'" class="max-w-4xl mx-auto p-6">
             <h3 class="text-xs font-bold text-gray-400 uppercase mb-4 tracking-widest font-mono">Quick Actions</h3>
             <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button @click="runTool('summarize')" class="p-4 border border-gray-200 rounded-sm hover:border-[#2F2E8B] hover:bg-blue-50/20 text-left group transition-all">
                   <div class="w-8 h-8 rounded-full bg-blue-50 text-[#2F2E8B] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <i class="fas fa-compress-alt"></i>
                   </div>
                   <span class="block text-xs font-bold text-gray-900 uppercase">Summarize</span>
                   <span class="text-[10px] text-gray-500">Create executive brief</span>
                </button>
                <button @click="runTool('extract')" class="p-4 border border-gray-200 rounded-sm hover:border-[#2F2E8B] hover:bg-blue-50/20 text-left group transition-all">
                   <div class="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <i class="fas fa-list-ul"></i>
                   </div>
                   <span class="block text-xs font-bold text-gray-900 uppercase">Extract Data</span>
                   <span class="text-[10px] text-gray-500">Pull key entities</span>
                </button>
                <button @click="runTool('simplify')" class="p-4 border border-gray-200 rounded-sm hover:border-[#2F2E8B] hover:bg-blue-50/20 text-left group transition-all">
                   <div class="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <i class="fas fa-child"></i>
                   </div>
                   <span class="block text-xs font-bold text-gray-900 uppercase">Simplify</span>
                   <span class="text-[10px] text-gray-500">Explain like I'm 5</span>
                </button>
                 <button @click="runTool('sentiment')" class="p-4 border border-gray-200 rounded-sm hover:border-[#2F2E8B] hover:bg-blue-50/20 text-left group transition-all">
                   <div class="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <i class="fas fa-heart"></i>
                   </div>
                   <span class="block text-xs font-bold text-gray-900 uppercase">Sentiment</span>
                   <span class="text-[10px] text-gray-500">Analyze tone</span>
                </button>
             </div>
          </div>

          <!-- Analytics Panel -->
          <div v-if="activeFeature === 'analytics'" class="max-w-4xl mx-auto p-6">
             <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-gray-50 p-6 rounded-sm border border-gray-200">
                   <h4 class="text-[10px] font-mono font-bold text-gray-400 uppercase mb-2">Total Tokens</h4>
                   <p class="text-3xl font-black text-gray-900">142,593</p>
                   <div class="mt-2 text-xs text-green-600 font-bold flex items-center gap-1">
                      <i class="fas fa-arrow-up"></i> 12% vs last week
                   </div>
                </div>
                <div class="bg-gray-50 p-6 rounded-sm border border-gray-200">
                   <h4 class="text-[10px] font-mono font-bold text-gray-400 uppercase mb-2">Knowledge Density</h4>
                   <p class="text-3xl font-black text-gray-900">98.2%</p>
                   <div class="mt-2 text-xs text-gray-500 font-mono">
                      Vector Match Rate
                   </div>
                </div>
                <div class="bg-gray-50 p-6 rounded-sm border border-gray-200">
                   <h4 class="text-[10px] font-mono font-bold text-gray-400 uppercase mb-2">Est. Cost</h4>
                   <p class="text-3xl font-black text-gray-900">$4.20</p>
                   <div class="mt-2 text-xs text-gray-500 font-mono">
                      Current Billing Cycle
                   </div>
                </div>
             </div>
          </div>
          
          <button @click="activeFeature = null" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
             <i class="fas fa-times"></i>
          </button>
      </div>

      <!-- Desktop Sidebar -->
      <aside 
        class="bg-white/80 backdrop-blur-sm border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out relative z-20"
        :class="isSidebarCollapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-72 opacity-100'"
      >
        <!-- Document Stats -->
         <div class="p-4 space-y-4">
            <div class="bg-white dot-pattern p-4 border border-gray-200 shadow-sm relative group hover:border-[#2F2E8B] transition-colors rounded-sm cursor-pointer" @click="activeFeature = 'search'">
              <div class="absolute top-0 left-0 w-1 h-full bg-[#2F2E8B] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h3 class="text-[10px] font-mono font-bold text-gray-400 uppercase mb-2">Knowledge Base</h3>
              <div class="flex items-center justify-between">
                 <span class="text-2xl font-black text-gray-900">{{ uploadedFiles.length }}</span>
                 <i class="fas fa-file-pdf text-gray-300 group-hover:text-[#2F2E8B] transition-colors"></i>
              </div>
              <p class="text-[10px] font-mono text-gray-500 mt-1">Active Documents</p>
            </div>

            <div class="bg-white dot-pattern p-4 border border-gray-200 shadow-sm relative group hover:border-[#2F2E8B] transition-colors rounded-sm cursor-pointer" @click="toggleNotesModal">
              <div class="absolute top-0 left-0 w-1 h-full bg-[#2F2E8B] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h3 class="text-[10px] font-mono font-bold text-gray-400 uppercase mb-2">Research Notes</h3>
              <div class="flex items-center justify-between">
                 <span class="text-2xl font-black text-gray-900">{{ savedNotes.length }}</span>
                 <i class="fas fa-sticky-note text-gray-300 group-hover:text-[#2F2E8B] transition-colors"></i>
              </div>
              <p class="text-[10px] font-mono text-gray-500 mt-1">Captured Insights</p>
            </div>

            <div class="bg-white dot-pattern p-4 border border-gray-200 shadow-sm relative group hover:border-[#2F2E8B] transition-colors rounded-sm cursor-pointer">
              <div class="absolute top-0 left-0 w-1 h-full bg-[#2F2E8B] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h3 class="text-[10px] font-mono font-bold text-gray-400 uppercase mb-2">History</h3>
              <div class="flex items-center justify-between">
                 <span class="text-2xl font-black text-gray-900">{{ messages.length }}</span>
                 <i class="fas fa-history text-gray-300 group-hover:text-[#2F2E8B] transition-colors"></i>
              </div>
              <p class="text-[10px] font-mono text-gray-500 mt-1">Messages</p>
            </div>
         </div>

         <div class="mt-auto p-4 border-t border-gray-200">
            <button 
                @click="showSettings = true"
                class="w-full py-3 border border-gray-300 hover:border-gray-400 hover:text-[#2F2E8B] text-gray-600 rounded-sm text-xs font-bold font-mono uppercase transition-all flex items-center justify-center gap-2 bg-white"
            >
               <i class="fas fa-cog"></i> Configurations
            </button>
         </div>
      </aside>

      <!-- Main Chat Area -->
      <main class="flex-1 flex flex-col relative bg-transparent min-w-0">
        
        <!-- Messages -->
        <div ref="chatContainer" class="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 scrollbar-thin">
           
           <div v-if="!messages.length" class="h-full flex flex-col items-center justify-center -mt-10">
              <div class="w-20 h-20 bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center mb-6 text-[#2F2E8B]">
                 <i class="fas fa-robot text-4xl"></i>
              </div>
              <h2 class="text-2xl font-black text-gray-900 uppercase tracking-tight mb-2">System Ready</h2>
              <p class="text-sm font-mono text-gray-500 mb-8 text-center max-w-md">Initialize research sequence. Select a tool or begin input.</p>
              
              <!-- Quick Starters -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                 <button @click="$refs.pdfInput.click()" class="bg-white p-5 border border-dashed border-gray-300 rounded-sm hover:border-[#2F2E8B] hover:bg-blue-50/20 transition-all text-left group">
                    <div class="flex items-center gap-3 mb-2">
                       <i class="fas fa-file-pdf text-gray-400 group-hover:text-[#2F2E8B]"></i>
                       <span class="text-xs font-bold font-mono uppercase text-gray-700">Ingest Document</span>
                    </div>
                    <p class="text-[10px] text-gray-500">Upload PDF for vector analysis.</p>
                 </button>
                 <button @click="toggleFeature('tools')" class="bg-white p-5 border border-dashed border-gray-300 rounded-sm hover:border-[#2F2E8B] hover:bg-blue-50/20 transition-all text-left group">
                    <div class="flex items-center gap-3 mb-2">
                       <i class="fas fa-terminal text-gray-400 group-hover:text-[#2F2E8B]"></i>
                       <span class="text-xs font-bold font-mono uppercase text-gray-700">Run Tools</span>
                    </div>
                    <p class="text-[10px] text-gray-500">Execute analysis pipelines.</p>
                 </button>
              </div>
           </div>

           <!-- Message List -->
           <template v-else>
              <div v-for="(msg, index) in messages" :key="index" :class="{'flex justify-end': msg.type === 'user', 'flex justify-start': msg.type === 'bot' || msg.type === 'system'}">
                 
                 <!-- System Message -->
                 <div v-if="msg.type === 'system'" class="w-full flex justify-center my-4">
                    <div class="bg-blue-50 border border-blue-100 px-4 py-2 rounded-sm text-xs text-blue-800 font-mono">
                       <i class="fas fa-info-circle mr-2"></i> <span v-html="formatMarkdown(msg.text)"></span>
                    </div>
                 </div>

                 <!-- Chat Message -->
                 <div v-else :class="[
                   'max-w-[85%] rounded-sm p-6 relative border shadow-sm transition-all group',
                   msg.type === 'user' ? 'bg-[#2F2E8B] border-[#2F2E8B] text-white' : 'bg-white border-gray-200 hover:border-[#2F2E8B]',
                   msg.isError ? 'border-red-300 bg-red-50' : ''
                 ]">
                    <!-- Label -->
                    <div class="absolute -top-3 left-4 bg-white px-2 py-0.5 border rounded-sm text-[9px] font-mono font-bold uppercase tracking-widest shadow-sm"
                         :class="msg.type === 'user' ? 'text-[#2F2E8B] border-[#2F2E8B]' : 'text-gray-500 border-gray-200'">
                       {{ msg.type === 'user' ? 'OPERATOR' : 'LEXI_CORE' }}
                    </div>

                    <!-- PDF Attachment in User Msg -->
                    <div v-if="msg.pdfInfo" class="mb-4 bg-white/10 border border-white/20 p-3 rounded-sm flex items-center gap-3">
                       <i class="fas fa-file-pdf text-white"></i>
                       <span class="text-xs font-mono font-bold uppercase">{{ msg.pdfInfo.fileName }}</span>
                    </div>

                    <!-- Bot Content -->
                    <div class="prose prose-sm max-w-none" 
                         :class="msg.type === 'user' ? 'prose-invert' : ''"
                         v-html="formatMarkdown(msg.text)">
                    </div>

                    <!-- Context/Source (Bot Only) -->
                    <div v-if="msg.fullContext" class="mt-4 pt-4 border-t border-gray-100">
                       <button 
                         @click="toggleSource(index)"
                         class="text-[10px] font-mono font-bold uppercase text-gray-400 hover:text-[#2F2E8B] flex items-center gap-2"
                       >
                         <i class="fas" :class="expandedSources.has(index) ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
                         {{ expandedSources.has(index) ? 'Hide Source Context' : 'View Source Context' }}
                       </button>
                       <div v-if="expandedSources.has(index)" class="mt-2 text-xs font-mono text-gray-500 bg-gray-50 p-3 rounded-sm border border-gray-100 whitespace-pre-wrap">
                          {{ msg.fullContext }}
                       </div>
                    </div>

                 </div>

              </div>
              
              <!-- Typing Indicator -->
              <div v-if="isTyping" class="flex justify-start">
                   <div class="bg-white border border-gray-200 rounded-sm p-4 relative shadow-sm max-w-[85%]">
                      <div class="absolute -top-3 left-4 bg-white px-2 py-0.5 border border-gray-200 rounded-sm text-[9px] font-mono font-bold uppercase tracking-widest text-gray-400 shadow-sm">
                         LEXI_CORE // PROCESSING
                      </div>
                      <div class="flex space-x-2 mt-2">
                        <div class="w-2 h-2 bg-[#2F2E8B] rounded-full animate-bounce"></div>
                        <div class="w-2 h-2 bg-[#2F2E8B] rounded-full animate-bounce delay-75"></div>
                        <div class="w-2 h-2 bg-[#2F2E8B] rounded-full animate-bounce delay-150"></div>
                      </div>
                   </div>
              </div>
           </template>

        </div>

        <!-- Input Area -->
        <div class="bg-white border-t border-gray-200 p-6 z-20">
           <!-- Attachments -->
           <div v-if="selectedPdf || attachedNotes.length > 0" class="mb-4 flex flex-wrap gap-2">
              <div v-if="selectedPdf" class="bg-blue-50 border border-blue-200 text-[#2F2E8B] px-3 py-1.5 rounded-sm text-xs font-bold font-mono uppercase flex items-center gap-2">
                 <i class="fas fa-file-pdf"></i> {{ selectedPdf.name }}
                 <button @click="removePdf" class="hover:text-red-500"><i class="fas fa-times"></i></button>
              </div>
              <div v-for="note in attachedNotes" :key="note.id" class="bg-yellow-50 border border-yellow-200 text-yellow-800 px-3 py-1.5 rounded-sm text-xs font-bold font-mono uppercase flex items-center gap-2">
                 <i class="fas fa-sticky-note"></i> Note
                 <button @click="attachedNotes = attachedNotes.filter(n => n.id !== note.id)" class="hover:text-red-500"><i class="fas fa-times"></i></button>
              </div>
           </div>

           <form @submit.prevent="sendMessage" class="relative">
              <input 
                 v-model="question"
                 type="text" 
                 class="w-full bg-gray-50 border-gray-300 rounded-sm pl-4 pr-32 py-4 shadow-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] text-sm font-bold text-gray-900 placeholder:text-gray-400 placeholder:font-normal transition-all"
                 :placeholder="getInputPlaceholder()"
                 :disabled="isTyping || processingPdf"
                 ref="mainInput"
              >
              
              <div class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                 <button type="button" @click="$refs.pdfInput.click()" class="p-2 text-gray-400 hover:text-[#2F2E8B] transition-colors" title="Upload PDF">
                     <i class="fas" :class="processingPdf ? 'fa-spinner animate-spin' : 'fa-paperclip'"></i>
                 </button>
                 <button type="button" @click="toggleAudioRecording" class="p-2 transition-colors" :class="isRecording ? 'text-red-500 animate-pulse' : 'text-gray-400 hover:text-[#2F2E8B]'" title="Voice Input">
                    <i class="fas fa-microphone"></i>
                 </button>
                 <button 
                   type="submit" 
                   :disabled="(!question && !selectedPdf && attachedNotes.length === 0) || isTyping"
                   class="bg-[#2F2E8B] hover:bg-[#1D226B] text-white w-8 h-8 rounded-sm flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                    <i class="fas fa-arrow-right"></i>
                 </button>
              </div>
           </form>
           
           <!-- Hidden Inputs -->
           <input ref="pdfInput" type="file" accept=".pdf" @change="handlePdfUpload" class="hidden">
        </div>

      </main>

    </div>

    <!-- SETTINGS MODAL -->
    <Teleport to="body">
       <div v-if="showSettings" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div class="bg-white w-full max-w-md rounded-sm shadow-2xl overflow-hidden p-6 border border-gray-200">
             <div class="flex justify-between items-center mb-6">
                <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight">System Configuration</h3>
                <button @click="showSettings = false" class="text-gray-400 hover:text-gray-600"><i class="fas fa-times"></i></button>
             </div>
             
             <div class="space-y-6">
                <div>
                   <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-2">Target Knowledge Base</label>
                   <select v-model="dbName" class="w-full border-gray-300 rounded-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] text-sm font-bold bg-gray-50">
                      <option value="mwilalawyer">MWILA_LAWYER_DB</option>
                      <option value="landing-page-kb">LANDING_PAGE_KB</option>
                      <option value="chipocourts">CHIPO_COURTS</option>
                      <option value="kondwani-mining">KONDWANI_MINING</option>
                   </select>
                   <p class="text-[10px] text-gray-400 mt-1 font-mono">Select the vector index for retrieval operations.</p>
                </div>

                <div>
                   <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-2">System Tone</label>
                   <div class="flex gap-2">
                      <button v-for="mode in ['Strict', 'Creative', 'Debug']" :key="mode" class="flex-1 py-2 border border-gray-200 rounded-sm text-xs font-bold hover:border-[#2F2E8B] hover:text-[#2F2E8B] transition-colors uppercase">
                         {{ mode }}
                      </button>
                   </div>
                </div>
             </div>

             <div class="mt-8 flex justify-end">
                <button @click="saveSettings" class="bg-[#2F2E8B] text-white px-6 py-2 rounded-sm text-xs font-bold uppercase shadow-md hover:bg-[#1D226B]">
                   <i class="fas fa-save mr-2"></i> Save Configuration
                </button>
             </div>
          </div>
       </div>
    </Teleport>

    <!-- NOTES MODAL (Preserved) -->
    <Teleport to="body">
       <div v-if="showNotesModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div class="bg-white w-full max-w-lg rounded-sm shadow-2xl overflow-hidden animate-fade-in">
             <div class="bg-gray-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight">Research Notes</h3>
                <button @click="closeNotesModal" class="text-gray-400 hover:text-gray-600"><i class="fas fa-times"></i></button>
             </div>
             <div class="p-6">
                <!-- Note Input -->
                <div class="mb-6 space-y-3">
                   <textarea v-model="newNoteContent" rows="3" class="w-full border-gray-300 rounded-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] text-sm" placeholder="Capture a thought..."></textarea>
                   <button @click="addNote" class="w-full bg-gray-900 text-white py-2 rounded-sm text-xs font-bold uppercase hover:bg-black transition-colors">
                      <i class="fas fa-plus mr-2"></i> Add Note
                   </button>
                </div>
                
                <!-- List -->
                <div class="space-y-3 max-h-64 overflow-y-auto">
                   <div v-for="note in notes" :key="note.id" class="p-3 border border-gray-200 rounded-sm flex justify-between items-start group hover:border-gray-300">
                      <p class="text-xs text-gray-600 line-clamp-2">{{ note.content }}</p>
                      <button @click="deleteNote(note.id)" class="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><i class="fas fa-trash-alt"></i></button>
                   </div>
                </div>
             </div>
             <div class="bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end">
                <button @click="attachSelectedNotes" class="bg-[#2F2E8B] text-white px-4 py-2 rounded-sm text-xs font-bold uppercase shadow-md hover:bg-[#1D226B]">
                   Attach All & Close
                </button>
             </div>
          </div>
       </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, computed } from 'vue'
import axios from 'axios'
import API_BASE_URL from '@/api_services/api'

// Core State
const question = ref('')
const messages = ref([])
const chatContainer = ref(null)
const isSidebarCollapsed = ref(false)
const isTyping = ref(false)
const processingPdf = ref(false)

// Config State
const dbName = ref('mwilalawyer') 
const showSettings = ref(false)
const activeFeature = ref(null) // 'search', 'tools', 'analytics'

// Data
const uploadedFiles = ref([])
const savedNotes = ref([])
const notes = ref([])
const attachedNotes = ref([])

// Refs
const pdfInput = ref(null)
const mainInput = ref(null) // For focusing
const selectedPdf = ref(null)
const expandedSources = ref(new Set())
const showNotesModal = ref(false)
const newNoteContent = ref('')

// Search Feature
const searchQuery = ref('')
const filteredFiles = computed(() => {
   if(!searchQuery.value) return uploadedFiles.value
   return uploadedFiles.value.filter(f => f.name.toLowerCase().includes(searchQuery.value.toLowerCase())) // Client-side search for speed
})

// Methods
const toggleFeature = (feature) => {
   if(activeFeature.value === feature) activeFeature.value = null
   else activeFeature.value = feature
}

const toggleSource = (index) => {
    if (expandedSources.value.has(index)) expandedSources.value.delete(index)
    else expandedSources.value.add(index)
}

// Settings
const saveSettings = async () => {
    showSettings.value = false
    messages.value = [] // Clear chat on DB switch
    await fetchHistory()
    messages.value.push({type: 'system', text: `Switched active Knowledge Base to: **${dbName.value}**`})
}

// Search Logic
const askAboutFile = (file) => {
    activeFeature.value = null
    question.value = `Analyze the document "${file.name}" and provide a summary.`
    sendMessage()
}

// Tools Logic
const runTool = (tool) => {
    activeFeature.value = null
    const prefixes = {
        'summarize': 'Provide a comprehensive summary of the last relevant context.',
        'extract': 'Extract all key entities (dates, names, values) from the text.',
        'simplify': 'Explain the previous answer in simple 5-year-old terms.',
        'sentiment': 'Analyze the sentiment and tone of the context.'
    }
    question.value = prefixes[tool] || ''
    sendMessage()
}

// Notes Logic
const openNotesModal = () => showNotesModal.value = true
const closeNotesModal = () => showNotesModal.value = false
const addNote = () => {
   if(!newNoteContent.value.trim()) return
   const n = { id: Date.now(), content: newNoteContent.value, createdAt: new Date() }
   notes.value.unshift(n)
   savedNotes.value.unshift(n)
   newNoteContent.value = ''
   // Store logic if needed
}
const deleteNote = (id) => {
   notes.value = notes.value.filter(n => n.id !== id)
   savedNotes.value = savedNotes.value.filter(n => n.id !== id)
}
const attachSelectedNotes = () => {
   attachedNotes.value = [...notes.value]
   closeNotesModal()
}

// Data Fetching
const fetchHistory = async () => {
    try {
        const historyRes = await axios.get(`${API_BASE_URL}/rag/history?db_name=${dbName.value}`)
        uploadedFiles.value = historyRes.data.items || []
    } catch (e) {
        console.error("Failed to fetch stats", e)
    }
}

const formatDate = (dateStr) => {
    if(!dateStr) return ''
    return new Date(dateStr).toLocaleDateString()
}

// PDF Logic
const handlePdfUpload = async (e) => {
   const file = e.target.files[0]
   if(!file) return
   
   processingPdf.value = true
   selectedPdf.value = file
   
   try {
       const formData = new FormData()
       formData.append('file', file)
       formData.append('db_name', dbName.value)
       
       await axios.post(`${API_BASE_URL}/rag/upload`, formData, {
           headers: { 'Content-Type': 'multipart/form-data' }
       })
       
       uploadedFiles.value.push({name: file.name, uploaded_at: new Date()})
       
       messages.value.push({
           type: 'system',
           text: `Document **${file.name}** has been ingested and indexed. You can now chat about it.`
       })
       
   } catch (error) {
       console.error("Upload error:", error)
       alert('Failed to upload PDF. ' + (error.response?.data?.detail || error.message))
       selectedPdf.value = null
   } finally {
       processingPdf.value = false
       if(pdfInput.value) pdfInput.value.value = ''
   }
}

const removePdf = () => {
   selectedPdf.value = null
}

const getInputPlaceholder = () => {
    if (selectedPdf.value) return "Ask about this document..."
    return "Ask Lexi a question..."
}

// Audio (Mock)
const isRecording = ref(false)
const toggleAudioRecording = () => isRecording.value = !isRecording.value

// Chat Logic
const sendMessage = async () => {
  if(!question.value.trim() && !selectedPdf.value && attachedNotes.length === 0) return
  
  const text = question.value
  const msg = { 
      type: 'user', 
      text, 
      pdfInfo: selectedPdf.value ? { fileName: selectedPdf.value.name } : null 
  }
  
  messages.value.push(msg)
  question.value = ''
  isTyping.value = true
  
  try {
      const payload = {
          db_name: dbName.value,
          question: text,
          history: messages.value.slice(-5).map(m => ({ role: m.type, content: m.text }))
      }
      
      const response = await axios.post(`${API_BASE_URL}/rag/chat`, payload)
      
      const botMsg = {
          type: 'bot',
          text: response.data.answer || "No response generated.",
          context: response.data.context ? `Sources used:\n${response.data.sources.join(', ')}` : null,
          fullContext: response.data.context
      }
      
      messages.value.push(botMsg)
      
  } catch (error) {
      console.error("Chat error:", error)
      messages.value.push({
          type: 'bot',
          text: `**System Error**: Failed to communicate with RAG Core.\n\nDetails: ${error.response?.data?.detail || error.message}.`,
          isError: true
      })
  } finally {
      isTyping.value = false
      await nextTick()
      if(chatContainer.value) chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

const formatMarkdown = (text) => {
   if (!text) return ''
   return text
     .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
     .replace(/\n/g, '<br>')
     .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-2 rounded text-xs overflow-x-auto"><code>$1</code></pre>')
}

const searchInputRef = ref(null)
watch(activeFeature, async (newVal) => {
  if (newVal === 'search') {
    await nextTick()
    if (searchInputRef.value) searchInputRef.value.focus()
  }
})

onMounted(() => {
    fetchHistory()
})

</script>

<style scoped>
.mesh-background {
  background-color: #ffffff;
  background-image: 
    linear-gradient(#f3f4f6 1px, transparent 1px),
    linear-gradient(90deg, #f3f4f6 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: center center;
}

.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #CBD5E1;
  border-radius: 3px;
}
.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #94A3B8;
}

.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
}

.animate-slide-down {
  animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.dot-pattern {
  background-image: radial-gradient(#e5e7eb 1px, transparent 1px);
  background-size: 20px 20px;
}
</style>