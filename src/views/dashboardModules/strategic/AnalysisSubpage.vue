<template>
  <div class="analysis-subpage min-h-screen bg-[#F5F5F5] font-sans relative text-gray-900 overflow-x-hidden">
    <!-- Viewport Mesh Background (Fixed) -->
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <div class="max-w-[1920px] mx-auto p-4 md:p-6 relative z-10">
      
      <!-- Header with AI Status -->
      <div class="bg-white/80 backdrop-blur-md border border-gray-200 p-6 mb-6 shadow-sm relative overflow-hidden">
        <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
          <div class="flex items-center gap-4">
            <div class="w-2 h-12 bg-[#2F2E8B]"></div>
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">MODULE // STRATEGIC_ANALYSIS</span>
              </div>
              <h1 class="text-3xl font-black text-gray-900 uppercase tracking-tight font-outfit">Analysis & Insights</h1>
              <p class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mt-1">CORE INTELLIGENCE // ANALYTICS_ENGINE_ACTIVE</p>
            </div>
          </div>
          
          <div class="flex flex-wrap gap-3">
            <select 
              v-model="selectedLanguage"
              class="bg-white border border-gray-200 px-4 py-2 text-[10px] font-mono font-bold uppercase focus:ring-1 focus:ring-[#2F2E8B] rounded-none shadow-sm"
            >
              <option value="en">🇬🇧 ENGLISH</option>
              <option value="bem">BEMBA</option>
              <option value="nya">NYANJA</option>
            </select>

            <button 
              @click="showUploadModal = true"
              class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-[10px] font-mono font-bold uppercase shadow-md transition-all flex items-center gap-2 rounded-none"
            >
              <i class="fas fa-upload"></i>
              <span>UPLOAD_DATA</span>
            </button>

            <button 
              class="bg-[#2F2E8B] hover:bg-[#1D226B] text-white px-4 py-2 text-[10px] font-mono font-bold uppercase shadow-md transition-all flex items-center gap-2 rounded-none"
            >
              <i class="fas fa-magic"></i>
              <span>AI_REPORT</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Strategic Navigation -->
      <StrategicNavigation active-tab="analysis" />

      <!-- AI-Powered Insights Section -->
      <div v-if="aiInsights.length > 0" class="mb-12">
        <div class="bg-white border border-gray-200 p-8 shadow-sm relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SYSTEM_OUTPUT // CORE_INSIGHTS</div>
          
          <div class="flex items-center justify-between mb-8 border-b border-gray-100 pb-4 relative z-10">
            <div class="flex items-center gap-3">
              <div class="w-1.5 h-6 bg-amber-500"></div>
              <h2 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight">AI-Powered Insights</h2>
            </div>
            <button 
              @click="refreshInsights"
              :disabled="refreshingInsights"
              class="text-gray-400 hover:text-[#2F2E8B] transition-colors"
              :class="{'animate-spin': refreshingInsights}"
            >
              <i class="fas fa-sync-alt text-lg"></i>
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            <div 
              v-for="insight in aiInsights" 
              :key="insight.id"
              class="bg-white border border-gray-100 p-6 hover:shadow-md transition-all cursor-pointer relative group border-l-4"
              :class="[
                insight.category === 'opportunity' ? 'border-l-emerald-500' :
                insight.category === 'risk' ? 'border-l-red-500' :
                insight.category === 'optimization' ? 'border-l-[#2F2E8B]' :
                'border-l-amber-500',
                expandedInsightId === insight.id ? 'col-span-1 md:col-span-2 lg:col-span-3' : ''
              ]"
              @click="toggleInsight(insight.id)"
            >
              <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
              <div class="relative z-10">
                <div class="flex items-center justify-between mb-4">
                  <i :class="[
                    'fas text-lg',
                    insight.category === 'opportunity' ? 'fa-chart-line text-emerald-600' :
                    insight.category === 'risk' ? 'fa-exclamation-triangle text-red-600' :
                    insight.category === 'optimization' ? 'fa-cogs text-[#2F2E8B]' :
                    'fa-info-circle text-amber-600'
                  ]"></i>
                  <div class="flex items-center gap-2">
                    <span v-if="expandedInsightId === insight.id" class="text-[8px] font-mono font-black text-blue-600 bg-blue-50 px-1.5 py-0.5 uppercase">DEEP_DIVE_ACTIVE</span>
                    <span class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">
                      ID_{{ insight.id.substring(0, 4) }}
                    </span>
                  </div>
                </div>
                <h4 class="font-black text-gray-900 text-xs mb-2 uppercase tracking-tight font-outfit line-clamp-1">{{ insight.title }}</h4>
                <div class="w-8 h-0.5 bg-gray-100 mb-3 group-hover:w-full transition-all duration-500"></div>
                <p class="text-[10px] text-gray-500 font-medium mb-6 leading-relaxed uppercase italic" :class="expandedInsightId === insight.id ? '' : 'line-clamp-2'">{{ insight.summary }}</p>
                
                <div v-if="expandedInsightId === insight.id" class="mb-6 p-4 bg-gray-50 border-l-2 border-gray-200 animate-in fade-in duration-500">
                  <h5 class="text-[8px] font-mono font-black text-gray-400 uppercase mb-2 tracking-widest">INTERNAL // EXTERNAL DATA MAPPING</h5>
                  <p class="text-[10px] text-gray-700 font-medium leading-relaxed whitespace-pre-wrap">{{ insight.details }}</p>
                </div>

                <div class="flex items-center justify-between pt-4 border-t border-gray-50 text-[10px] font-mono font-black uppercase">
                  <span class="text-gray-400">{{ insight.category }}_DELTA</span>
                  <div class="flex items-center gap-4">
                    <span class="text-[#2F2E8B]">{{ insight.impact }}_IMPACT</span>
                    <i class="fas" :class="expandedInsightId === insight.id ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
               


      <div class="mb-12">
        <div class="bg-white border border-gray-200 p-8 shadow-sm relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SYSTEM_AUDIT // STRATEGIC_MATRIX</div>
          
          <div class="flex items-center justify-between mb-8 border-b border-gray-100 pb-4 relative z-10">
            <div class="flex items-center gap-3">
              <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
              <h2 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight">Strategic Analysis & Insights</h2>
            </div>
            <button 
              @click="runDeepAnalysis"
              :disabled="aiProcessing"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-[9px] font-mono font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-md active:scale-95"
            >
              <i class="fas fa-brain" :class="{'animate-pulse': aiProcessing}"></i>
              <span>{{ aiProcessing ? 'RUNNING_DEEP_SCAN...' : 'TRIGGER_ANALYSIS_PROTOCOL' }}</span>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10">
            <!-- SWOT Analysis -->
            <div class="bg-white border border-gray-100 p-6 hover:shadow-md transition-all relative group">
              <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
              <div class="flex items-center justify-between mb-6">
                <h3 class="font-black text-gray-900 text-xs uppercase tracking-widest font-mono flex items-center gap-2">
                  <i class="fas fa-crosshairs text-[#2F2E8B]"></i>
                  SWOT_ANALYSIS
                </h3>
                <button 
                  @click="regenerateSWOT"
                  :disabled="aiProcessing"
                  class="text-gray-400 hover:text-[#2F2E8B] disabled:opacity-50 transition-colors"
                >
                  <i class="fas fa-redo text-xs" :class="{'animate-spin': aiProcessing}"></i>
                </button>
              </div>
             

            <div class="grid grid-cols-2 gap-4">
              <!-- Strengths -->
              <div class="bg-gray-50 p-4 border border-gray-100 border-l-4 border-l-emerald-500 relative">
                <div class="absolute top-0 right-0 p-1 text-[8px] font-mono font-black text-emerald-600/30 uppercase tracking-widest leading-none">POS // STRENGTHS</div>
                <h4 class="font-black text-emerald-900 text-[10px] mb-3 uppercase tracking-widest font-mono flex items-center gap-1">
                  <i class="fas fa-check-circle"></i>
                  STRENGTHS_{{ swot.strengths.length }}
                </h4>
                <div class="space-y-2">
                  <div 
                    v-for="(item, idx) in swot.strengths.slice(0, swotExpanded ? 10 : 3)" 
                    :key="idx"
                    class="text-[10px] font-mono font-bold text-emerald-700/80 uppercase leading-snug border-l border-emerald-100 pl-2"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>

              <!-- Weaknesses -->
              <div class="bg-gray-50 p-4 border border-gray-100 border-l-4 border-l-red-500 relative">
                <div class="absolute top-0 right-0 p-1 text-[8px] font-mono font-black text-red-600/30 uppercase tracking-widest leading-none">NEG // WEAKNESSES</div>
                <h4 class="font-black text-red-900 text-[10px] mb-3 uppercase tracking-widest font-mono flex items-center gap-1">
                  <i class="fas fa-times-circle"></i>
                  WEAKNESSES_{{ swot.weaknesses.length }}
                </h4>
                <div class="space-y-2">
                  <div 
                    v-for="(item, idx) in swot.weaknesses.slice(0, swotExpanded ? 10 : 3)" 
                    :key="idx"
                    class="text-[10px] font-mono font-bold text-red-700/80 uppercase leading-snug border-l border-red-100 pl-2"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4 mt-4">
              <!-- Opportunities -->
              <div class="bg-gray-50 p-4 border border-gray-100 border-l-4 border-l-blue-500 relative">
                <div class="absolute top-0 right-0 p-1 text-[8px] font-mono font-black text-blue-600/30 uppercase tracking-widest leading-none">EXT // OPPORTUNITIES</div>
                <h4 class="font-black text-blue-900 text-[10px] mb-3 uppercase tracking-widest font-mono flex items-center gap-1">
                  <i class="fas fa-lightbulb"></i>
                  OPPORTUNITIES_{{ swot.opportunities.length }}
                </h4>
                <div class="space-y-2">
                  <div 
                    v-for="(item, idx) in swot.opportunities.slice(0, swotExpanded ? 10 : 3)" 
                    :key="idx"
                    class="text-[10px] font-mono font-bold text-blue-700/80 uppercase leading-snug border-l border-blue-100 pl-2"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>

              <!-- Threats -->
              <div class="bg-gray-50 p-4 border border-gray-100 border-l-4 border-l-amber-500 relative">
                <div class="absolute top-0 right-0 p-1 text-[8px] font-mono font-black text-amber-600/30 uppercase tracking-widest leading-none">EXT // THREATS</div>
                <h4 class="font-black text-amber-900 text-[10px] mb-3 uppercase tracking-widest font-mono flex items-center gap-1">
                  <i class="fas fa-exclamation-triangle"></i>
                  THREATS_{{ swot.threats.length }}
                </h4>
                <div class="space-y-2">
                  <div 
                    v-for="(item, idx) in swot.threats.slice(0, swotExpanded ? 10 : 3)" 
                    :key="idx"
                    class="text-[10px] font-mono font-bold text-amber-700/80 uppercase leading-snug border-l border-amber-100 pl-2"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              class="w-full mt-6 py-2 border border-blue-100 bg-blue-50/50 text-[10px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest hover:bg-[#2F2E8B] hover:text-white transition-all shadow-sm flex items-center justify-center gap-2"
              @click="toggleSWOTExpansion"
            >
              <span>{{ swotExpanded ? 'COLLAPSE_SUMMARY' : 'EXPAND_FULL_MATRIX' }}</span>
              <i class="fas" :class="swotExpanded ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
            </button>
          </div>

          <!-- TOWS Actions -->
          <div class="bg-white border border-gray-100 p-6 hover:shadow-md transition-all relative group border-t-4 border-t-emerald-500">
            <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
            <div class="flex items-center justify-between mb-6 relative z-10">
              <h3 class="font-black text-gray-900 text-xs uppercase tracking-widest font-mono flex items-center gap-2">
                <i class="fas fa-rocket text-emerald-500"></i>
                TOWS_STRATEGIC_ACTIONS
              </h3>
               <button 
                  @click="generateTOWS"
                  :disabled="aiProcessing"
                  class="text-gray-400 hover:text-emerald-500 transition-colors"
                >
                  <i class="fas fa-magic text-xs" :class="{'animate-spin': aiProcessing}"></i>
                </button>
            </div>

            <div class="space-y-3 relative z-10">
               <div v-for="(strategy, type) in towsStrategies" :key="type" class="p-3 bg-gray-50 border border-gray-100">
                  <header class="flex items-center justify-between mb-2">
                    <span class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">{{ type }}_STRATEGY</span>
                    <span class="text-[7px] font-mono font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 uppercase tracking-tighter">ACTIVE</span>
                  </header>
                  <p class="text-[9px] font-mono font-bold text-gray-700 uppercase leading-tight">{{ strategy || 'PENDING_GENERATION_VIA_SWOT' }}</p>
               </div>
            </div>
            
             <button 
              class="w-full mt-6 py-2 border border-emerald-100 bg-emerald-50/50 text-[10px] font-mono font-black text-emerald-700 uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
            >
              IMPLEMENT_STRATEGY
            </button>
          </div>


            <!-- Peer Benchmarking -->
            <div class="bg-white border border-gray-100 p-6 hover:shadow-md transition-all relative group border-t-4 border-t-amber-500">
              <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
              <div class="flex items-center justify-between mb-6 relative z-10">
                <h3 class="font-black text-gray-900 text-xs uppercase tracking-widest font-mono flex items-center gap-2">
                  <i class="fas fa-chart-bar text-amber-500"></i>
                  PEER_BENCHMARKING
                </h3>
              </div>

              <div class="space-y-6 relative z-10">
                <div v-for="metric in benchmarks.slice(0, 4)" :key="metric.name">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">{{ metric.name.replace(' ', '_') }}</span>
                    <span 
                      class="text-[10px] font-mono font-black px-2 py-0.5"
                      :class="metric.performance >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'"
                    >
                      {{ metric.performance >= 0 ? '+' : '' }}{{ metric.performance }}%
                    </span>
                  </div>
                  <div class="relative h-1 bg-gray-100 overflow-hidden">
                    <div 
                      class="absolute h-full bg-[#2F2E8B] transition-all duration-700"
                      :style="{ width: `${85 + metric.performance}%` }"
                    ></div>
                  </div>
                  <p v-if="metric.detail" class="text-[8px] text-gray-400 mt-1 italic leading-none">{{ metric.detail }}</p>
                </div>
              </div>

               <button 
                @click="runDeepAnalysis"
                class="w-full mt-6 py-2 border border-amber-100 bg-amber-50/50 text-[10px] font-mono font-black text-amber-700 uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all shadow-sm"
              >
                ACCESS_MARKET_INTEL
              </button>
            </div>

            <!-- PESTLE Analysis -->
            <div class="bg-white border border-gray-100 p-6 hover:shadow-md transition-all relative group border-t-4 border-t-purple-500">
              <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
              <div class="flex items-center justify-between mb-6 relative z-10">
                <h3 class="font-black text-gray-900 text-xs uppercase tracking-widest font-mono flex items-center gap-2">
                  <i class="fas fa-globe-africa text-purple-500"></i>
                  PESTLE_ANALYSIS
                </h3>
              </div>
              
              <div class="grid grid-cols-1 gap-4 relative z-10">
                <div v-for="(data, factor) in pestle" :key="factor" class="p-3 bg-gray-50 border border-gray-100">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">{{ factor }}</span>
                    <span class="text-[9px] font-mono font-black text-purple-600">{{ data.score }}%</span>
                  </div>
                  <div class="h-1 w-full bg-gray-100 rounded-full overflow-hidden mb-2">
                    <div class="h-full bg-purple-500 transition-all duration-1000" :style="{ width: data.score + '%' }"></div>
                  </div>
                  <p class="text-[9px] text-gray-500 leading-tight italic">{{ data.detail }}</p>
                </div>
              </div>

               <button 
                @click="runDeepAnalysis"
                class="w-full mt-6 py-2 border border-purple-100 bg-purple-50/50 text-[10px] font-mono font-black text-purple-700 uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all shadow-sm"
              >
                SCAN_ENVIRONMENT
              </button>
            </div>

             <!-- Porter's Five Forces -->
            <div class="bg-white border border-gray-100 p-6 hover:shadow-md transition-all relative group border-t-4 border-t-red-500">
              <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
              <div class="flex items-center justify-between mb-6 relative z-10">
                <h3 class="font-black text-gray-900 text-xs uppercase tracking-widest font-mono flex items-center gap-2">
                  <i class="fas fa-shield-halved text-red-500"></i>
                  PORTER_5_FORCES
                </h3>
              </div>
              
              <div class="space-y-4 relative z-10">
                <div v-for="(data, force) in porters" :key="force" class="p-3 bg-gray-50 border border-gray-100">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">{{ force }}</span>
                    <div class="flex gap-1">
                      <div v-for="i in 5" :key="i" class="w-2 h-2" :class="i <= data.score ? 'bg-red-500' : 'bg-gray-100'"></div>
                    </div>
                  </div>
                  <p class="text-[9px] text-gray-500 leading-tight italic">{{ data.detail }}</p>
                </div>
              </div>

               <button 
                @click="runDeepAnalysis"
                class="w-full mt-6 py-2 border border-red-100 bg-red-50/50 text-[10px] font-mono font-black text-red-700 uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-sm"
              >
                ASSESS_COMPETITION
              </button>
            </div>
          </div>
        </div>
      </div>


      <!-- Analytical Reports & Documents Section -->
      <div class="mb-12">
        <div class="bg-white border border-gray-200 p-8 shadow-sm relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SYSTEM_REGISTRY // DOCUMENT_LIBRARY</div>
          
          <div class="flex items-center justify-between mb-8 border-b border-gray-100 pb-4 relative z-10">
            <div class="flex items-center gap-3">
              <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
              <h2 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight">Analytical Reports & Documents</h2>
            </div>
            <button 
              @click="showUploadModal = true" 
              class="text-[#2F2E8B] hover:text-[#1D226B] font-mono font-black text-[10px] uppercase tracking-widest flex items-center gap-2"
            >
              <i class="fas fa-plus"></i> NEW_INGESTION
            </button>
          </div>

          <div v-if="isLoadingHistory" class="text-center py-12 relative z-10">
            <i class="fas fa-spinner fa-spin text-2xl text-[#2F2E8B] mb-2 font-black"></i>
            <p class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">SYNCHRONIZING_REPOSITORY...</p>
          </div>

          <div v-else-if="uploadHistory.length === 0" class="text-center py-12 bg-gray-50 border border-dashed border-gray-200 relative z-10">
            <i class="fas fa-cloud-upload-alt text-4xl text-gray-200 mb-4"></i>
            <p class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest leading-none">NO_DATA_INGESTED // AWAITING_INPUT</p>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            <div 
              v-for="(upload, idx) in uploadHistory" 
              :key="idx"
              class="bg-white border border-gray-100 p-5 hover:shadow-md transition-all relative group border-t-2 border-t-[#2F2E8B]"
            >
              <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
              <div class="flex items-center justify-between mb-4 relative z-10">
                <div class="p-2 bg-gray-50 border border-gray-100">
                  <i class="fas fa-folder-open text-[#2F2E8B] text-sm"></i>
                </div>
                <button @click="deleteUpload(upload.id)" class="text-gray-400 hover:text-red-500 transition opacity-0 group-hover:opacity-100">
                  <i class="fas fa-trash-alt text-xs"></i>
                </button>
              </div>
              <h4 class="font-black text-gray-900 text-[10px] uppercase tracking-tight font-mono mb-2">AUDIT_{{ formatDate(upload.timestamp).replace(/ /g, '_').toUpperCase() }}</h4>
              <div class="space-y-2 mb-6">
                <div v-for="file in upload.files.slice(0, 2)" :key="file.name" class="flex items-center gap-2 text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">
                  <i :class="getFileIcon(file.name)" class="text-[#2F2E8B]/50"></i>
                  <span class="truncate">{{ file.name }}</span>
                </div>
                <span v-if="upload.files.length > 2" class="text-[8px] font-mono font-black text-[#2F2E8B] uppercase">+{{ upload.files.length - 2 }}_ADDITIONAL_RESOURCES</span>
              </div>
              <button class="w-full py-2 bg-[#2F2E8B] text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-[#1D226B] transition-all">
                ACCESS_REPORT
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Strategic Notes Section -->
      <div class="mb-12">
        <div class="bg-white border border-gray-200 p-8 shadow-sm relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SYSTEM_MEMORY // STRATEGIC_NOTES</div>
          
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-gray-100 pb-4 relative z-10">
            <div class="flex items-center gap-3">
              <div class="w-1.5 h-6 bg-purple-500"></div>
              <h2 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight">Strategic Notes</h2>
            </div>
            <div class="flex items-center gap-3 flex-1 max-w-md">
              <div class="relative flex-1">
                <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]"></i>
                <input 
                  v-model="noteSearch"
                  type="text" 
                  placeholder="QUERY_NOTES..." 
                  class="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-none text-[10px] font-mono font-bold uppercase focus:ring-1 focus:ring-[#2F2E8B] placeholder-gray-400"
                >
              </div>
              <button 
                @click="openNoteModal()"
                class="bg-[#2F2E8B] text-white px-6 py-2 text-[10px] font-mono font-black uppercase tracking-widest shadow-md hover:bg-[#1D226B] transition-all flex items-center gap-2 rounded-none"
              >
                <i class="fas fa-plus"></i>
                <span>NEW_NOTE</span>
              </button>
            </div>
          </div>

          <div v-if="isLoadingNotes" class="text-center py-12 relative z-10">
            <i class="fas fa-spinner fa-spin text-2xl text-[#2F2E8B] mb-2 font-black"></i>
            <p class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">RECOVERING_MEMORY_BLOCKS...</p>
          </div>

          <div v-else-if="filteredNotes.length === 0" class="text-center py-12 relative z-10">
            <div class="bg-gray-50 w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-gray-100">
              <i class="fas fa-note-sticky text-xl text-gray-300"></i>
            </div>
            <p class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">ZERO_NOTES_RECOVERED // MEMORY_EMPTY</p>
            <button @click="openNoteModal()" class="text-[#2F2E8B] text-[9px] font-mono font-black uppercase tracking-widest mt-4 hover:underline">INITIATE_FIRST_ENTRY</button>
          </div>

          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            <div 
              v-for="note in filteredNotes" 
              :key="note.id"
              class="bg-white border border-gray-100 p-5 hover:shadow-md transition-all cursor-pointer relative group flex flex-col min-h-[200px]"
              @click="openNoteModal(note)"
            >
              <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
              <div class="flex items-start justify-between mb-4 relative z-10">
                <h4 class="font-black text-gray-900 text-xs uppercase tracking-tight font-outfit pr-6 line-clamp-2">{{ note.title || 'Untitled_Entry' }}</h4>
                <button 
                  @click.stop="deleteNote(note.id)"
                  class="absolute top-0 right-0 text-gray-400 hover:text-red-500 transition opacity-0 group-hover:opacity-100 p-1"
                >
                  <i class="fas fa-trash-alt text-[10px]"></i>
                </button>
              </div>
              <p class="text-[10px] text-gray-500 leading-relaxed flex-1 italic mb-4 line-clamp-4">{{ note.content }}</p>
              <div class="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                <span class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">SYNC_DATE // {{ formatDate(note.updated_at || note.updatedAt).toUpperCase() }}</span>
                <div class="w-1.5 h-1.5 bg-[#2F2E8B]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>


    <!-- AI Assistant Floating Button -->
    <button 
      @click="showAIAssistant = true"
      class="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-[#2F2E8B] to-[#3D2F88] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 group"
    >
      <i class="fas fa-robot text-2xl"></i>
      <span class="absolute right-full mr-3 px-3 py-1 bg-white text-[#2F2E8B] text-xs font-bold rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Strategic AI Assistant
      </span>
    </button>

    <!-- AI Assistant Component -->
    <StrategicAnalysisAgent 
      :show="showAIAssistant" 
      :analysis-data="{ notes, uploadHistory, swot }"
      @close="showAIAssistant = false" 
    />

    <!-- Note Edit/Create Modal -->
    <div v-if="showNoteModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div class="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        <div :class="['p-6', noteForm.color]">
          <input 
            v-model="noteForm.title"
            type="text" 
            placeholder="Title" 
            class="w-full bg-transparent border-none text-xl font-bold p-0 mb-4 focus:ring-0 placeholder-gray-400"
          >
          <textarea 
            v-model="noteForm.content"
            placeholder="Take a note..." 
            class="w-full bg-transparent border-none p-0 focus:ring-0 text-gray-700 min-h-[200px] resize-none"
          ></textarea>
        </div>
        <div class="p-4 bg-white border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="color in colors" 
              :key="color.class"
              @click="noteForm.color = color.class"
              :class="[
                'w-6 h-6 rounded-full border border-gray-200 transition-all hover:scale-110',
                color.class,
                noteForm.color === color.class ? 'ring-2 ring-[#2F2E8B] ring-offset-2' : ''
              ]"
              :title="color.name"
            ></button>
          </div>
          <div class="flex items-center gap-3">
            <button 
              @click="showNoteModal = false"
              class="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button 
              @click="handleSaveNote"
              class="px-6 py-2 bg-[#2F2E8B] text-white rounded-lg font-bold shadow-md hover:bg-[#252579] transition active:scale-95 text-sm"
            >
              Save Note
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Document Upload Modal -->
    <div v-if="showUploadModal" class="fixed inset-0 bg-[#0A0A0A]/90 backdrop-blur-md z-[70] flex items-center justify-center p-4">
      <div class="bg-white border border-gray-200 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col relative">
        <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
        
        <div class="p-8 border-b border-gray-100 flex items-center justify-between relative z-10">
          <div class="flex items-center gap-4">
            <div class="w-1.5 h-8 bg-[#2F2E8B]"></div>
            <div>
              <span class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">INGESTION // RESOURCE_LOADER</span>
              <h3 class="text-2xl font-black font-outfit text-gray-900 uppercase tracking-tight">Analysis Document Upload</h3>
            </div>
          </div>
          <button @click="showUploadModal = false" class="text-gray-400 hover:text-[#2F2E8B] transition-colors">
            <i class="fas fa-times text-2xl"></i>
          </button>
        </div>

        <div class="p-8 overflow-y-auto relative z-10">
          <div class="flex gap-8 mb-8 border-b border-gray-100">
            <button 
              @click="uploadTab = 'upload'"
              :class="['pb-4 px-2 text-[10px] font-mono font-black uppercase tracking-widest transition-all border-b-2', uploadTab === 'upload' ? 'border-[#2F2E8B] text-[#2F2E8B]' : 'border-transparent text-gray-400']"
            >
              FILE_UPLOAD
            </button>
            <button 
              @click="uploadTab = 'history'"
              :class="['pb-4 px-2 text-[10px] font-mono font-black uppercase tracking-widest transition-all border-b-2', uploadTab === 'history' ? 'border-[#2F2E8B] text-[#2F2E8B]' : 'border-transparent text-gray-400']"
            >
              LOAD_HISTORY_{{ uploadHistory.length }}
            </button>
          </div>

          <div v-if="uploadTab === 'upload'" class="space-y-8">
            <div 
              @drop.prevent="handleFileDrop"
              @dragover.prevent="isDragging = true"
              @dragleave.prevent="isDragging = false"
              :class="['border border-dashed p-16 text-center transition-all cursor-pointer relative group', isDragging ? 'border-[#2F2E8B] bg-blue-50/50' : 'border-gray-200 hover:border-[#2F2E8B]']"
              @click="$refs.fileInput.click()"
            >
              <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
              <i class="fas fa-cloud-upload-alt text-6xl text-gray-100 mb-6 group-hover:text-[#2F2E8B]/20 transition-colors"></i>
              <p class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest mb-2">DRAG_DROP_OR_BROWSE</p>
              <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest italic">PDF, DOCX, XLSX, CSV // MAX_PAYLOAD_10MB</p>
              <input ref="fileInput" type="file" multiple class="hidden" @change="handleFileSelect">
            </div>

            <div v-if="selectedFiles.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              <div v-for="(file, idx) in selectedFiles" :key="idx" class="flex items-center justify-between bg-gray-50 p-4 border border-gray-100">
                <div class="flex items-center gap-4">
                  <i :class="getFileIcon(file.name)" class="text-lg opacity-60"></i>
                  <span class="text-[10px] font-mono font-bold text-gray-700 uppercase truncate max-w-[150px]">{{ file.name }}</span>
                </div>
                <button @click="removeFile(idx)" class="text-gray-400 hover:text-red-500 transition-colors"><i class="fas fa-times text-xs"></i></button>
              </div>
            </div>

            <div class="relative">
              <label class="absolute -top-2 left-4 bg-white px-2 text-[9px] font-mono font-black text-[#2F2E8B] uppercase">CONTEXT_METADATA</label>
              <textarea 
                v-model="documentSummary"
                placeholder="DESCRIBE_PAYLOAD_CONTENT..."
                class="w-full bg-gray-50 border border-gray-100 p-5 text-[10px] font-mono font-bold uppercase focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] min-h-[120px] resize-none placeholder-gray-300"
              ></textarea>
            </div>

            <div class="flex justify-end gap-4">
              <button 
                @click="showUploadModal = false" 
                class="px-8 py-3 text-[10px] font-mono font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors"
              >
                ABORT_MISSION
              </button>
              <button 
                @click="handleUpload"
                :disabled="selectedFiles.length === 0 || isUploading"
                class="bg-[#2F2E8B] text-white px-10 py-3 text-[10px] font-mono font-black uppercase tracking-widest shadow-xl disabled:opacity-50 transition-all flex items-center gap-3 hover:bg-[#1D226B]"
              >
                <i v-if="isUploading" class="fas fa-spinner fa-spin"></i>
                <span>{{ isUploading ? 'UPLOADING...' : 'EXECUTE_INGESTION' }}</span>
              </button>
            </div>
          </div>

            <div v-if="uploadTab === 'history'" class="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              <div v-if="uploadHistory.length === 0" class="text-center py-20 bg-gray-50 border border-dashed border-gray-100">
                <i class="fas fa-history text-4xl text-gray-100 mb-4 font-black"></i>
                <p class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">ZERO_OPERATIONAL_LOGS_DETECTED</p>
              </div>
              <div v-for="(upload, idx) in uploadHistory" :key="idx" class="bg-gray-50 p-6 border border-gray-100 relative group border-t-2 border-t-[#2F2E8B]/30 hover:border-t-[#2F2E8B] transition-all">
                <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
                <button @click="deleteUpload(upload.id)" class="absolute top-6 right-6 text-gray-300 hover:text-red-500 transition opacity-0 group-hover:opacity-100">
                  <i class="fas fa-trash-alt text-[10px]"></i>
                </button>
                <div class="flex items-center gap-3 text-[10px] font-mono font-black text-[#2F2E8B] mb-4 uppercase tracking-widest relative z-10">
                  <i class="fas fa-calendar-alt opacity-50"></i>
                  LOG_DATE // {{ formatDate(upload.timestamp).toUpperCase() }}
                </div>
                <div class="space-y-3 relative z-10">
                  <div v-for="file in upload.files" :key="file.name" class="text-[10px] font-mono font-bold text-gray-600 flex items-center gap-3 uppercase tracking-tight">
                    <i :class="getFileIcon(file.name)" class="opacity-40 text-sm"></i>
                    {{ file.name }}
                  </div>
                </div>
                <p v-if="upload.summary" class="mt-6 text-[10px] font-mono font-bold text-gray-400 italic uppercase tracking-widest border-l-2 border-gray-200 pl-4">"{{ upload.summary }}"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- SWOT Modal -->
    <div v-if="showSWOTModal" class="fixed inset-0 bg-[#0A0A0A]/90 backdrop-blur-md flex items-center justify-center z-[70] p-4">
      <div class="bg-white border border-gray-200 shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col relative">
        <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
        
        <div class="p-8 border-b border-gray-100 flex items-center justify-between relative z-10">
          <div class="flex items-center gap-4">
            <div class="w-1.5 h-8 bg-[#2F2E8B]"></div>
            <div>
              <span class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">MATRIX // FULL_SWOT_AUDIT</span>
              <h3 class="text-2xl font-black font-outfit text-gray-900 uppercase tracking-tight">Strategic SWOT Analysis</h3>
            </div>
          </div>
          <button 
            @click="showSWOTModal = false"
            class="text-gray-400 hover:text-[#2F2E8B] transition-colors"
          >
            <i class="fas fa-times text-2xl"></i>
          </button>
        </div>

        <div class="p-8 overflow-y-auto relative z-10">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Strengths -->
            <div class="bg-gray-50 p-6 border border-gray-100 border-l-4 border-l-emerald-500 relative">
              <div class="absolute top-0 right-0 p-2 text-[10px] font-mono font-black text-emerald-600/20 uppercase tracking-widest leading-none font-bold">INTERNAL // STRENGTHS</div>
              <h4 class="font-black text-emerald-900 text-xs mb-6 uppercase tracking-widest font-mono flex items-center gap-2">
                <i class="fas fa-check-circle"></i>
                STRENGTHS_MATURED
              </h4>
              <ul class="space-y-4">
                <li v-for="(item, idx) in swot.strengths" :key="idx" class="text-[11px] font-mono font-bold text-emerald-700/80 uppercase leading-relaxed flex items-start gap-3">
                  <span class="mt-1.5 w-1.5 h-1.5 bg-emerald-500"></span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>

            <!-- Weaknesses -->
            <div class="bg-gray-50 p-6 border border-gray-100 border-l-4 border-l-red-500 relative">
              <div class="absolute top-0 right-0 p-2 text-[10px] font-mono font-black text-red-600/20 uppercase tracking-widest leading-none font-bold">INTERNAL // WEAKNESSES</div>
              <h4 class="font-black text-red-900 text-xs mb-6 uppercase tracking-widest font-mono flex items-center gap-2">
                <i class="fas fa-times-circle"></i>
                WEAKNESSES_DETECTED
              </h4>
              <ul class="space-y-4">
                <li v-for="(item, idx) in swot.weaknesses" :key="idx" class="text-[11px] font-mono font-bold text-red-700/80 uppercase leading-relaxed flex items-start gap-3">
                  <span class="mt-1.5 w-1.5 h-1.5 bg-red-500"></span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>

            <!-- Opportunities -->
            <div class="bg-gray-50 p-6 border border-gray-100 border-l-4 border-l-blue-500 relative">
              <div class="absolute top-0 right-0 p-2 text-[10px] font-mono font-black text-blue-600/20 uppercase tracking-widest leading-none font-bold">EXTERNAL // OPPORTUNITIES</div>
              <h4 class="font-black text-blue-900 text-xs mb-6 uppercase tracking-widest font-mono flex items-center gap-2">
                <i class="fas fa-lightbulb"></i>
                OPPORTUNITIES_PROJECTED
              </h4>
              <ul class="space-y-4">
                <li v-for="(item, idx) in swot.opportunities" :key="idx" class="text-[11px] font-mono font-bold text-blue-700/80 uppercase leading-relaxed flex items-start gap-3">
                  <span class="mt-1.5 w-1.5 h-1.5 bg-blue-500"></span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>

            <!-- Threats -->
            <div class="bg-gray-50 p-6 border border-gray-100 border-l-4 border-l-amber-500 relative">
              <div class="absolute top-0 right-0 p-2 text-[10px] font-mono font-black text-amber-600/20 uppercase tracking-widest leading-none font-bold">EXTERNAL // THREATS</div>
              <h4 class="font-black text-amber-900 text-xs mb-6 uppercase tracking-widest font-mono flex items-center gap-2">
                <i class="fas fa-exclamation-triangle"></i>
                THREAT_VECTORS
              </h4>
              <ul class="space-y-4">
                <li v-for="(item, idx) in swot.threats" :key="idx" class="text-[11px] font-mono font-bold text-amber-700/80 uppercase leading-relaxed flex items-start gap-3">
                  <span class="mt-1.5 w-1.5 h-1.5 bg-amber-500"></span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="p-8 border-t border-gray-100 bg-gray-50/50 relative z-10">
          <button 
            @click="showSWOTModal = false"
            class="w-full py-4 bg-[#2F2E8B] text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-[#1D226B] transition-all shadow-xl"
          >
            TERMINATE_VIEW // RETURN_TO_SYSTEM
          </button>
        </div>
      </div>
    </div>

      </div>

</template>

<script setup>

import { computed, ref, onMounted, watch } from 'vue'
import { workflowResult } from '@/composables/useStrategicWorkflow'
import { useRouter } from 'vue-router'
import axios from 'axios'
import API_BASE_URL from '@/api_services/api'
import { decodeJWT } from '@/api_services/decodeJWT'
import StrategicAnalysisAgent from '@/views/components/StrategicAnalysisAgent.vue'
import StrategicNavigation from './components/StrategicNavigation.vue'

const router = useRouter()
const aiProcessing = ref(false)
const refreshingInsights = ref(false)
const showSWOTModal = ref(false)

const aiInsights = computed(() => workflowResult.value?.insights || [])
const swot = computed(() => workflowResult.value?.swot || { strengths: [], weaknesses: [], opportunities: [], threats: [] })
const benchmarks = computed(() => workflowResult.value?.benchmarks || [])
const peerCount = computed(() => workflowResult.value?.peerCount || 0)
const towsStrategies = computed(() => workflowResult.value?.tows || { 
  SO: 'PENDING_GENERATION_VIA_SWOT', 
  WO: 'PENDING_GENERATION_VIA_SWOT',
  ST: 'PENDING_GENERATION_VIA_SWOT',
  WT: 'PENDING_GENERATION_VIA_SWOT'
})

const pestle = computed(() => workflowResult.value?.pestle || {
  political: { score: 0, detail: 'PENDING_SCAN' },
  economic: { score: 0, detail: 'PENDING_SCAN' },
  social: { score: 0, detail: 'PENDING_SCAN' },
  tech: { score: 0, detail: 'PENDING_SCAN' },
  legal: { score: 0, detail: 'PENDING_SCAN' },
  enviro: { score: 0, detail: 'PENDING_SCAN' }
})

const porters = computed(() => workflowResult.value?.porters || {
  entry_threat: { score: 0, detail: 'PENDING_ASSESSMENT' },
  buyer_power: { score: 0, detail: 'PENDING_ASSESSMENT' },
  supplier_power: { score: 0, detail: 'PENDING_ASSESSMENT' },
  substitutes: { score: 0, detail: 'PENDING_ASSESSMENT' },
  rivalry: { score: 0, detail: 'PENDING_ASSESSMENT' }
})

const expandedInsightId = ref(null)
const swotExpanded = ref(false)

// Get tenant ID from JWT
const jwtHelper = decodeJWT()
const tenantId = ref(jwtHelper.getTenantId())

const isLoadingNotes = ref(false)
const isLoadingHistory = ref(false)

// AI Analysis Bot State
const showAIAssistant = ref(false)

// Strategic Notes State
const notes = ref([])
const showNoteModal = ref(false)
const editingNote = ref(null)
const noteForm = ref({ title: '', content: '', color: 'bg-white' })
const noteSearch = ref('')

const colors = [
  { name: 'White', class: 'bg-white' },
  { name: 'Red', class: 'bg-red-50' },
  { name: 'Orange', class: 'bg-orange-50' },
  { name: 'Yellow', class: 'bg-yellow-50' },
  { name: 'Green', class: 'bg-green-50' },
  { name: 'Teal', class: 'bg-teal-50' },
  { name: 'Blue', class: 'bg-blue-50' },
  { name: 'Purple', class: 'bg-purple-50' }
]

const filteredNotes = computed(() => {
  if (!noteSearch.value) return notes.value
  const query = noteSearch.value.toLowerCase()
  return notes.value.filter(n => 
    n.title.toLowerCase().includes(query) || 
    n.content.toLowerCase().includes(query)
  )
})

// Document Upload State
const showUploadModal = ref(false)
const uploadTab = ref('upload')
const isDragging = ref(false)
const isUploading = ref(false)
const selectedFiles = ref([])
const documentSummary = ref('')
const uploadHistory = ref([])
const fileInput = ref(null)

console.log('AnalysisSubpage - aiInsights:', aiInsights.value)
console.log('AnalysisSubpage - swot:', swot.value)
console.log('AnalysisSubpage - benchmarks:', benchmarks.value)
console.log('AnalysisSubpage - peerCount:', peerCount.value)

const activeTab = ref('analysis')
const selectedLanguage = ref('en')

const strategicFrameworks = [
  {
    name: 'SWOT',
    meaning: 'Our internal good/bad + outside good/bad',
    whyCare: 'Gives the full honest picture right now',
    icon: 'fa-crosshairs',
    color: 'border-l-amber-500'
  },
  {
    name: 'Peer Benchmarking',
    meaning: 'How we compare to rivals',
    whyCare: "Tells us if we're leading, average, or falling behind",
    icon: 'fa-users',
    color: 'border-l-blue-500'
  },
  {
    name: 'TOWS Actions',
    meaning: 'What we should actually do about the SWOT',
    whyCare: 'Turns talk into real moves & priorities',
    icon: 'fa-rocket',
    color: 'border-l-emerald-500'
  },
  {
    name: 'PESTLE',
    meaning: "Big world trends/forces we can't ignore",
    whyCare: 'Helps spot big changes coming before they hit',
    icon: 'fa-globe',
    color: 'border-l-purple-500'
  },
  {
    name: 'Porter\'s Five Forces',
    meaning: 'How tough & profitable our industry really is',
    whyCare: 'Shows if we can expect high profits or constant war',
    icon: 'fa-shield-halved',
    color: 'border-l-red-500'
  }
]

const toggleInsight = (id) => {
  expandedInsightId.value = expandedInsightId.value === id ? null : id
}

const toggleSWOTExpansion = () => {
  swotExpanded.value = !swotExpanded.value
}

const regenerateSWOT = () => {
  runDeepAnalysis()
}

const refreshInsights = () => {
  runDeepAnalysis()
}

const runDeepAnalysis = async () => {
  if (aiProcessing.value) return
  aiProcessing.value = true
  try {
    const payload = { 
      tenant_id: tenantId.value || jwtHelper.getTenantId() 
    }
    const response = await axios.post(`${API_BASE_URL}/strategic-analysis-agent/trigger`, payload)
    
    if (response.data.success) {
      // Merge new analysis data into the existing workflow result
      workflowResult.value = {
        ...workflowResult.value,
        ...response.data.data
      }
      localStorage.setItem('workflowResult', JSON.stringify(workflowResult.value))
      alert('Strategic Analysis deep-dive complete. All matrix cards have been updated with real-time data.')
    }
  } catch (error) {
    console.error('Deep Analysis failed:', error)
    alert('Strategic Protocol Failure: ' + (error.response?.data?.detail || error.message))
  } finally {
    aiProcessing.value = false
  }
}

const generateTOWS = async () => {
  if (aiProcessing.value) return
  aiProcessing.value = true
  try {
    const response = await axios.post(`${API_BASE_URL}/strategy/analysis/generate-tows`, {
      tenant_id: tenantId.value,
      swot: swot.value
    })
    
    workflowResult.value = {
      ...workflowResult.value,
      tows: response.data.tows
    }
    localStorage.setItem('workflowResult', JSON.stringify(workflowResult.value))
  } catch (error) {
    console.error('TOWS generation failed:', error)
    alert('Failed to map strategic actions.')
  } finally {
    aiProcessing.value = false
  }
}

// Notes Methods
const fetchNotes = async () => {
  if (!tenantId.value) return
  isLoadingNotes.value = true
  try {
    const response = await axios.get(`${API_BASE_URL}/strategy/analysis/notes`, {
      params: { tenant_id: tenantId.value }
    })
    notes.value = response.data
  } catch (error) {
    console.error('Error fetching notes:', error)
  } finally {
    isLoadingNotes.value = false
  }
}

const loadNotes = () => {
  fetchNotes()
}

const saveNotes = () => {
  // Logic handled in handleSaveNote
}

const openNoteModal = (note = null) => {
  if (note) {
    editingNote.value = note
    noteForm.value = { ...note }
  } else {
    editingNote.value = null
    noteForm.value = { title: '', content: '', color: 'bg-white' }
  }
  showNoteModal.value = true
}

const handleSaveNote = async () => {
  const hasTitle = noteForm.value.title && noteForm.value.title.trim()
  const hasContent = noteForm.value.content && noteForm.value.content.trim()
  
  if (!hasTitle && !hasContent) {
    alert('Please enter a title or some content for your note.')
    return
  }
  
  // Use current tenant ID
  const currentTenantId = tenantId.value || jwtHelper.getTenantId()
  if (!currentTenantId) {
    alert('Security context missing. Please log in again.')
    return
  }

  const payload = {
    tenant_id: currentTenantId,
    title: noteForm.value.title || '',
    content: noteForm.value.content || '',
    color: noteForm.value.color || 'bg-white'
  }
  
  console.log('DEBUG: Saving Strategic Note:', payload)
  
  try {
    let response
    if (editingNote.value) {
      response = await axios.put(`${API_BASE_URL}/strategy/analysis/notes/${editingNote.value.id}`, payload)
    } else {
      response = await axios.post(`${API_BASE_URL}/strategy/analysis/notes`, payload)
    }
    
    console.log('DEBUG: Note Save Response:', response.data)
    
    await fetchNotes()
    
    // Clear state & close
    editingNote.value = null
    noteForm.value = { title: '', content: '', color: 'bg-white' }
    showNoteModal.value = false
    
    alert('Note saved to system memory.')
  } catch (error) {
    console.error('Error saving note:', error)
    const errorMsg = error.response?.data?.detail || error.message
    alert('Failed to save note: ' + errorMsg)
  }
}

const deleteNote = async (id) => {
  if (confirm('Delete this note?') && tenantId.value) {
    try {
      await axios.delete(`${API_BASE_URL}/strategy/analysis/notes/${id}`, {
        params: { tenant_id: tenantId.value }
      })
      await fetchNotes()
    } catch (error) {
      console.error('Error deleting note:', error)
      alert('Failed to delete note.')
    }
  }
}

// Upload Methods
const fetchUploadHistory = async () => {
  if (!tenantId.value) return
  isLoadingHistory.value = true
  try {
    const response = await axios.get(`${API_BASE_URL}/strategy/analysis/documents`, {
      params: { tenant_id: tenantId.value }
    })
    uploadHistory.value = response.data
  } catch (error) {
    console.error('Error fetching upload history:', error)
  } finally {
    isLoadingHistory.value = false
  }
}

const loadUploadHistory = () => {
  fetchUploadHistory()
}

const saveUploadHistory = () => {
  // Handled in handleUpload
}

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  addFiles(files)
}

const handleFileDrop = (event) => {
  isDragging.value = false
  const files = Array.from(event.dataTransfer.files)
  addFiles(files)
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

const addFiles = (files) => {
  const maxSize = 10 * 1024 * 1024
  const validFiles = files.filter(file => {
    if (file.size > maxSize) {
      alert(`${file.name} is too large. Max 10MB.`)
      return false
    }
    return true
  })
  selectedFiles.value.push(...validFiles)
}

const removeFile = (index) => {
  selectedFiles.value.splice(index, 1)
}

const getFileIcon = (filename) => {
  const ext = filename.split('.').pop().toLowerCase()
  const iconMap = {
    pdf: 'fas fa-file-pdf text-red-500',
    doc: 'fas fa-file-word text-blue-500',
    docx: 'fas fa-file-word text-blue-500',
    xls: 'fas fa-file-excel text-green-500',
    xlsx: 'fas fa-file-excel text-green-500',
    csv: 'fas fa-file-csv text-green-600',
    txt: 'fas fa-file-alt text-gray-500'
  }
  return iconMap[ext] || 'fas fa-file text-gray-400'
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

const handleUpload = async () => {
  if (selectedFiles.value.length === 0 || !tenantId.value) return
  isUploading.value = true
  try {
    // In a real app, you would upload the files here.
    // We'll simulate file upload and store the metadata in the analysis_documents collection.
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const payload = {
      tenant_id: tenantId.value,
      files: selectedFiles.value.map(f => ({ name: f.name, size: f.size })),
      summary: documentSummary.value,
      timestamp: new Date().toISOString()
    }
    
    await axios.post(`${API_BASE_URL}/strategy/analysis/documents`, payload)
    await fetchUploadHistory()
    
    selectedFiles.value = []
    documentSummary.value = ''
    uploadTab.value = 'history'
    alert('Files upload record saved successfully!')
  } catch (error) {
    console.error('Error uploading:', error)
    alert('Upload failed.')
  } finally {
    isUploading.value = false
  }
}

const deleteUpload = async (id) => {
  if (confirm('Delete this upload record?') && tenantId.value) {
    try {
      await axios.delete(`${API_BASE_URL}/strategy/analysis/documents/${id}`, {
        params: { tenant_id: tenantId.value }
      })
      await fetchUploadHistory()
    } catch (error) {
      console.error('Error deleting record:', error)
      alert('Failed to delete record.')
    }
  }
}


onMounted(() => {
  loadNotes()
  loadUploadHistory()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
