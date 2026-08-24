<template>
  <Teleport to="body">
    <div v-if="modelValue" class="fixed inset-0 z-[100] flex items-stretch sm:items-center justify-center p-0 sm:p-4 backdrop-blur-sm bg-black/40">
      <div class="bg-white shadow-[0_0_50px_rgba(47,46,139,0.2)] w-full max-w-6xl h-full sm:h-auto sm:max-h-[92vh] overflow-hidden flex flex-col border border-gray-200 rounded-none relative">
        <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-[0.02]"></div>
        
        <!-- Modal Header -->
        <div class="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 bg-white/50 sticky top-0 z-20">
          <div class="flex items-center gap-2 flex-1 min-w-0">
            <div class="w-1 h-5 bg-[#2F2E8B] shrink-0"></div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <span class="text-[11px] font-mono font-black text-gray-500 uppercase tracking-[0.15em]">Lead_Entity // Details</span>
                <span v-if="lead?.id" class="text-[9px] font-mono font-bold text-[#2F2E8B] bg-blue-50 px-1.5 py-0.5 uppercase tracking-widest border border-blue-100">ID:{{ lead.id.substring(0, 8) }}</span>
              </div>
              <h3 class="text-base font-black text-gray-900 uppercase tracking-tight truncate">
                {{ lead?.name || 'NAMELESS_LEAD' }}
                <span v-if="lead?.company" class="text-gray-500 text-[12px] font-mono font-bold ml-1">// {{ lead.company }}</span>
              </h3>
            </div>
          </div>
          <div class="flex items-center gap-1.5 shrink-0">
            <div class="relative" @click.stop>
              <button @click="showExportMenu = !showExportMenu" class="w-8 h-8 flex items-center justify-center border border-gray-100 bg-white text-gray-400 hover:text-[#2F2E8B] hover:border-[#2F2E8B] transition-all" title="Export Report">
                <i class="fas fa-download text-[12px]"></i>
              </button>
              <div v-if="showExportMenu" class="absolute right-0 top-full mt-1 bg-white border border-gray-100 shadow-lg z-50 min-w-[140px] rounded">
                <button @click="exportReport('pdf')" class="w-full px-3 py-2 text-[9px] font-mono font-bold text-gray-700 hover:bg-[#2F2E8B]/5 hover:text-[#2F2E8B] uppercase tracking-widest text-left flex items-center gap-2 border-b border-gray-50">
                  <i class="fas fa-file-pdf text-red-500 text-[10px] w-4"></i> PDF
                </button>
                <button @click="exportReport('docx')" class="w-full px-3 py-2 text-[9px] font-mono font-bold text-gray-700 hover:bg-[#2F2E8B]/5 hover:text-[#2F2E8B] uppercase tracking-widest text-left flex items-center gap-2 border-b border-gray-50">
                  <i class="fas fa-file-word text-blue-500 text-[10px] w-4"></i> DOCX
                </button>
                <button @click="exportReport('xlsx')" class="w-full px-3 py-2 text-[9px] font-mono font-bold text-gray-700 hover:bg-[#2F2E8B]/5 hover:text-[#2F2E8B] uppercase tracking-widest text-left flex items-center gap-2">
                  <i class="fas fa-file-excel text-green-600 text-[10px] w-4"></i> XLSX
                </button>
              </div>
            </div>
            <button @click="$emit('edit', lead)" class="w-8 h-8 flex items-center justify-center border border-gray-100 bg-white text-gray-400 hover:text-orange-500 hover:border-orange-500 transition-all" title="Edit">
              <Edit :size="14" />
            </button>
            <button @click="$emit('update:modelValue', false)" class="w-8 h-8 flex items-center justify-center border border-gray-100 bg-white text-gray-400 hover:text-red-500 hover:border-red-500 transition-all">
              <X :size="16" />
            </button>
          </div>
        </div>

        <!-- Quick Action Ribbon -->
        <div class="bg-gray-50 border-b border-gray-100 px-4 py-2.5 flex flex-wrap items-center gap-2 relative z-10">
          <div v-if="lead?.archived" class="w-full text-[10px] font-mono font-black text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 uppercase tracking-widest flex items-center gap-1.5">Archived — Restore to re-activate.</div>
          <div class="flex items-center gap-2 flex-wrap">
             <button @click="_origCall(lead)" class="px-4 py-2 bg-emerald-600 text-white border border-emerald-600 text-[9px] font-mono font-black uppercase tracking-widest hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20 transition-all flex items-center gap-2 relative overflow-hidden group">
               <span class="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
               <Phone :size="14" class="relative z-10" />
               <span class="relative z-10">CALL</span>
             </button>
             <button @click="_origWhatsapp(lead)" class="px-4 py-2 bg-green-600 text-white border border-green-600 text-[9px] font-mono font-black uppercase tracking-widest hover:bg-green-700 hover:shadow-lg hover:shadow-green-600/20 transition-all flex items-center gap-2 relative overflow-hidden group">
               <span class="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
               <MessageSquare :size="14" class="relative z-10" />
               <span class="relative z-10">WHATSAPP</span>
             </button>
             <button @click="_origEmail(lead)" class="px-4 py-2 bg-[#2F2E8B] text-white border border-[#2F2E8B] text-[9px] font-mono font-black uppercase tracking-widest hover:bg-[#1D226B] hover:shadow-lg hover:shadow-[#2F2E8B]/20 transition-all flex items-center gap-2 relative overflow-hidden group">
               <span class="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
               <Mail :size="14" class="relative z-10" />
               <span class="relative z-10">MAIL</span>
             </button>
             <button v-if="lead?.archived" @click="$emit('archive', lead); $emit('update:modelValue', false)" class="px-4 py-2 bg-amber-500 text-white border border-amber-500 text-[9px] font-mono font-black uppercase tracking-widest hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-500/20 transition-all flex items-center gap-2 relative overflow-hidden group">
               <span class="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
               <ArchiveRestore :size="14" class="relative z-10" />
               <span class="relative z-10">RESTORE</span>
             </button>
             <button v-else @click="_origConvert(lead)" class="px-4 py-2 bg-[#2F2E8B] text-white border border-[#2F2E8B] text-[9px] font-mono font-black uppercase tracking-widest hover:bg-[#1D226B] hover:shadow-lg hover:shadow-[#2F2E8B]/20 transition-all flex items-center gap-2 relative overflow-hidden group">
               <span class="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
               <RefreshCw :size="14" class="relative z-10" />
               <span class="relative z-10">CONVERT</span>
             </button>
          </div>
        </div>

        <!-- Tab Navigation -->
        <div class="px-4 border-b border-gray-100 bg-white/50 relative z-10">
          <div class="flex gap-5 overflow-x-auto whitespace-nowrap">
            <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
              :class="activeTab === tab.id ? 'border-[#2F2E8B] text-[#2F2E8B] font-black' : 'border-transparent text-gray-400 hover:text-gray-600 font-bold'"
              class="py-3 border-b-2 text-[11px] font-mono uppercase tracking-[0.15em] transition-all flex items-center gap-1.5">
               <component :is="tab.icon" :size="14" /> {{ tab.label }}
            </button>
          </div>
        </div>

        <!-- Modal Body (Scrollable) -->
        <div class="flex-1 overflow-y-auto p-4 sm:p-5 custom-scrollbar relative">
          <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-[0.03]"></div>
          
          <!-- Tab Content -->
          <div class="relative z-10 space-y-3 animate-in fade-in duration-500">
            
            <!-- OVERVIEW TAB -->
            <div v-if="activeTab === 'overview'" class="space-y-2.5">

              <!-- Time Tracker Bar -->
              <div class="bg-white border border-gray-100 p-3.5 relative overflow-hidden">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-3">
                    <span class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">Lead Age</span>
                    <span class="text-[13px] font-mono font-black text-[#2F2E8B] uppercase">{{ leadAgeDays }} day{{ leadAgeDays !== 1 ? 's' : '' }}</span>
                    <span class="text-[8px] font-mono text-gray-400">since {{ formatDate(lead?.created_at) }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">Stage</span>
                    <span class="text-[11px] font-mono font-black text-[#2F2E8B] uppercase">{{ formatStage(lead?.stage) }}</span>
                  </div>
                </div>
                <!-- Stage Progress Bar -->
                <div class="relative">
                  <div class="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-[#2F2E8B] to-blue-400 rounded-full transition-all duration-500" :style="{ width: stageProgressPct + '%' }"></div>
                  </div>
                  <!-- Stage dots -->
                  <div class="flex justify-between mt-1.5">
                    <div v-for="(stg, stgIdx) in stageList" :key="stgIdx" class="flex flex-col items-center" :style="{ width: (100 / stageList.length) + '%' }">
                      <div class="w-3.5 h-3.5 rounded-full border-2 mb-1 transition-colors" 
                        :class="getStageDotClass(stgIdx)"></div>
                      <span class="text-[8px] font-mono font-bold text-gray-500 uppercase tracking-wider text-center leading-tight">{{ stg.label }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Strategic Parameters -->
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-2">
                <div class="lg:col-span-12">
                  <h4 class="text-[10px] font-mono font-black text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                    <span class="w-1 h-3 bg-[#2F2E8B]"></span> Strategic_Parameters
                  </h4>
                </div>
                <div class="lg:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-1.5">
                  <div class="bg-gray-50 border border-gray-100 p-2">
                    <div class="text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-0.5">Priority</div>
                    <div :class="getPriorityColor(lead?.priority)" class="text-sm font-mono font-black uppercase tracking-tighter">{{ lead?.priority || 'NONE' }}</div>
                  </div>
                  <div class="bg-gray-50 border border-gray-100 p-2">
                    <div class="text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-0.5">Stage</div>
                    <div class="text-sm font-mono font-black text-gray-900 uppercase tracking-tighter">{{ formatStage(lead?.stage) }}</div>
                  </div>
                  <div class="bg-[#2F2E8B] border border-[#2F2E8B] p-2">
                    <div class="text-[8px] font-mono font-bold text-blue-200 uppercase tracking-widest mb-0.5">Valuation</div>
                    <div class="text-sm font-mono font-black text-white tracking-tighter">{{ formatCurrency(lead?.value || 0) }}</div>
                  </div>
                  <div class="bg-gray-50 border border-gray-100 p-2">
                    <div class="text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-0.5">Source</div>
                    <div class="text-sm font-mono font-black text-gray-900 uppercase tracking-tighter truncate">{{ lead?.source || 'N/A' }}</div>
                  </div>
                </div>

                <!-- CAC -->
                <div class="lg:col-span-12 bg-[#2F2E8B]/5 border border-[#2F2E8B]/20 p-2">
                  <div class="flex items-center justify-between gap-2">
                    <span class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-wider">CAC <span v-if="cacSaved"><CheckCircle2 :size="10" class="inline text-[#2F2E8B]" /></span></span>
                    <div class="flex items-center gap-1.5">
                      <span class="text-[10px] font-mono font-black text-[#2F2E8B]">{{ currencySymbol }}</span>
                      <input v-model.number="localCac" type="number" min="0" step="0.01"
                        @blur="saveCac" @keyup.enter="saveCac"
                        class="w-20 bg-white border border-[#2F2E8B]/30 focus:border-[#2F2E8B] outline-none px-1.5 py-1 text-xs font-mono font-black text-gray-900 text-right" placeholder="0" />
                      <button @click="saveCac" :disabled="savingCac"
                        class="px-2 py-1 bg-[#2F2E8B] hover:bg-[#3D3A9E] text-white text-[9px] font-mono font-black uppercase tracking-widest transition-all disabled:opacity-50">
                        {{ savingCac ? '...' : cacSaved ? 'SAVED' : 'UPDATE' }}
                      </button>
                    </div>
                  </div>
                  <!-- Accumulative adjustment row -->
                  <div class="flex items-center justify-end gap-1.5 mt-1.5 pt-1.5 border-t border-[#2F2E8B]/10">
                    <span class="text-[7px] font-mono font-bold text-gray-400 uppercase tracking-widest mr-1">Adjust:</span>
                    <span class="text-[8px] font-mono font-black text-[#2F2E8B]">{{ currencySymbol }}</span>
                    <input v-model.number="cacAdjustAmount" type="number" min="0" step="0.01" class="w-16 bg-white border border-gray-200 focus:border-[#2F2E8B] outline-none px-1 py-0.5 text-[10px] font-mono font-black text-gray-900 text-right" placeholder="0" />
                    <button @click="applyCacAdjust('subtract')" class="px-2 py-0.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-[8px] font-mono font-black uppercase tracking-widest transition-all rounded">− Subtract</button>
                    <button @click="applyCacAdjust('add')" class="px-2 py-0.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200 text-[8px] font-mono font-black uppercase tracking-widest transition-all rounded">+ Add</button>
                  </div>
                </div>
              </div>

              <!-- Profile Attributes -->
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-2 pt-2 border-t border-dashed border-gray-100">
                <div class="lg:col-span-12">
                  <h4 class="text-[10px] font-mono font-black text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                    <span class="w-1 h-3 bg-[#2F2E8B]"></span> Attributes
                  </h4>
                </div>
                <div class="lg:col-span-12 grid grid-cols-2 gap-3">
                  <div>
                    <label class="text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-0.5">Email</label>
                    <a :href="'mailto:' + lead?.email" class="text-[11px] font-mono font-black text-[#2F2E8B] uppercase flex items-center gap-1">
                      <Mail :size="10" /> {{ lead?.email || 'UNDEFINED' }}
                    </a>
                  </div>
                  <div>
                    <label class="text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-0.5">Phone</label>
                    <a :href="'tel:' + lead?.phone" class="text-[11px] font-mono font-black text-gray-900 uppercase flex items-center gap-1">
                      <Phone :size="10" class="text-[#2F2E8B]" /> {{ lead?.phone || 'NO_RECORD' }}
                    </a>
                  </div>
                  <div v-if="lead?.position">
                    <label class="text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-0.5">Position</label>
                    <p class="text-[11px] font-mono font-black text-gray-900 uppercase flex items-center gap-1">
                      <Briefcase :size="10" /> {{ lead.position }}
                    </p>
                  </div>
                  <div>
                    <label class="text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-0.5">Location</label>
                    <p class="text-[11px] font-mono font-black text-gray-900 uppercase flex items-center gap-1">
                      <MapPin :size="10" class="text-[#2F2E8B]" /> {{ lead?.city ? lead.city + ',' : '' }} {{ lead?.country || 'GLOBAL' }}
                    </p>
                  </div>
                  <div class="col-span-2">
                    <label class="text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-0.5">Links</label>
                    <div class="flex flex-wrap gap-1.5">
                      <a v-if="lead?.website" :href="lead.website" target="_blank" class="w-7 h-7 flex items-center justify-center bg-gray-50 border border-gray-100 text-gray-400 hover:text-[#2F2E8B] hover:border-[#2F2E8B] transition-all"><Globe :size="12" /></a>
                      <a v-if="lead?.linkedin" :href="lead.linkedin" target="_blank" class="w-7 h-7 flex items-center justify-center bg-gray-50 border border-gray-100 text-gray-400 hover:text-[#2F2E8B] hover:border-[#2F2E8B] transition-all"><Linkedin :size="12" /></a>
                      <a v-if="lead?.twitter" :href="'https://twitter.com/' + lead.twitter.replace('@', '')" target="_blank" class="w-7 h-7 flex items-center justify-center bg-gray-50 border border-gray-100 text-gray-400 hover:text-[#2F2E8B] hover:border-[#2F2E8B] transition-all"><Twitter :size="12" /></a>
                      <a v-if="lead?.facebook" :href="lead.facebook" target="_blank" class="w-7 h-7 flex items-center justify-center bg-gray-50 border border-gray-100 text-gray-400 hover:text-[#2F2E8B] hover:border-[#2F2E8B] transition-all"><Facebook :size="12" /></a>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Geospatial Map (shown when coordinates exist) -->
              <div v-if="lead?.location?.lat && lead?.location?.lng" class="pt-2">
                <h4 class="text-[10px] font-mono font-black text-gray-900 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                  <span class="w-1 h-3 bg-[#2F2E8B]"></span> Location_Map
                </h4>
                <div class="bg-gray-100 border border-gray-200 h-36 w-full overflow-hidden relative">
                  <div id="lead-preview-map" class="w-full h-full"></div>
                </div>
              </div>

              <!-- Narrative / Notes -->
              <div v-if="lead?.notes" class="pt-2 border-t border-dashed border-gray-100">
                <h4 class="text-[10px] font-mono font-black text-gray-900 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                  <span class="w-1 h-3 bg-[#2F2E8B]"></span> Notes
                </h4>
                <div class="bg-gray-50/50 border border-gray-100 p-2.5">
                  <p class="text-[11px] font-mono text-gray-800 leading-relaxed uppercase tracking-tight whitespace-pre-line">{{ lead.notes }}</p>
                </div>
              </div>

              <!-- System Metadata -->
              <div class="bg-gray-50/80 border border-gray-200 p-3 mt-3 relative overflow-hidden">
                 <h5 class="text-[9px] font-mono font-black text-gray-500 uppercase tracking-wider mb-2">Metadata</h5>
                 <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                   <div>
                     <span class="text-[7px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-0.5">Created</span>
                     <span class="text-[10px] font-mono font-black text-gray-900 uppercase">{{ formatDate(lead?.created_at) }}</span>
                   </div>
                   <div>
                     <span class="text-[7px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-0.5">Updated</span>
                     <span class="text-[10px] font-mono font-black text-gray-900 uppercase">{{ formatDate(lead?.updatedAt) }}</span>
                   </div>
                   <div>
                     <span class="text-[7px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-0.5">Assignee</span>
                     <div class="flex items-center gap-1" v-if="lead?.assignedTo">
                       <div class="w-4 h-4 bg-[#2F2E8B] text-white text-[7px] font-mono font-black flex items-center justify-center">{{ getUserInitials(lead.assignedTo) }}</div>
                       <span class="text-[10px] font-mono font-black text-[#2F2E8B] uppercase">{{ lead.assignedTo.split('@')[0] }}</span>
                     </div>
                     <span v-else class="text-[10px] font-mono font-black text-gray-400 uppercase">UNASSIGNED</span>
                   </div>
                   <div>
                     <span class="text-[7px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-0.5">Owner</span>
                     <span class="text-[10px] font-mono font-black text-gray-900 uppercase">{{ lead?.owner?.split('@')[0] || 'SYSTEM' }}</span>
                   </div>
                 </div>
              </div>
            </div>

            <!-- ACTIVITIES TAB — Git-style threaded tree -->
            <div v-if="activeTab === 'activities'" class="relative">
              <!-- Loading state -->
              <div v-if="loadingActivities" class="flex flex-col items-center justify-center py-24">
                <Loader2 class="animate-spin text-[#2F2E8B]" :size="32" />
                <span class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.2em] mt-4">Retreiving_Interaction_Log...</span>
              </div>
              
              <template v-else-if="activities.length > 0">
                <div class="relative pl-10">
                  <!-- Main timeline rail -->
                  <div class="absolute left-[19px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-[#2F2E8B] via-blue-400 to-gray-200 rounded-full opacity-20"></div>
                  
                  <div v-for="(activity, aIdx) in activities" :key="activity.id" class="relative pb-3 last:pb-1">
                    <!-- Branch line (horizontal connector) -->
                    <div class="absolute left-[19px] top-[18px] w-[14px] h-[2px] rounded-r-full"
                      :class="aIdx === 0 ? 'bg-[#2F2E8B]/30' : 'bg-gray-200'"></div>
                    
                    <!-- Commit node dot -->
                    <div class="absolute left-[13px] top-[11px] z-20">
                      <div class="relative">
                        <!-- Outer ring glow -->
                        <div class="absolute inset-0 rounded-full animate-ping opacity-15"
                          :class="getActivityColorClass(activity.type)" 
                          v-if="aIdx === 0"></div>
                        <!-- Inner dot with icon -->
                        <div :class="[getActivityColorClass(activity.type), 'w-[14px] h-[14px] rounded-full border-2 border-white shadow-none flex items-center justify-center relative z-10']">
                          <component :is="getActivityLucideIcon(activity.type)" :size="7" class="text-white" />
                        </div>
                      </div>
                    </div>

                    <!-- Activity card -->
                    <div class="ml-[26px] bg-white border border-gray-100 rounded-md p-2.5 transition-all hover:border-[#2F2E8B]/20 hover:shadow-none group relative">
                      <div class="flex items-start justify-between gap-2">
                        <div class="flex-1 min-w-0">
                          <!-- Activity badge + timestamp -->
                          <div class="flex items-center gap-1.5 mb-0.5 flex-wrap">
                            <span :class="[getActivityColorClass(activity.type)?.replace('bg-', 'text-'), 'text-[11px] font-mono font-black uppercase tracking-widest']">
                              {{ formatActivityType(activity.type || activity.action || 'event') }}
                            </span>
                            <span class="w-0.5 h-0.5 bg-gray-300 rounded-full"></span>
                            <span class="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">
                              <Clock :size="9" class="inline -mt-0.5 mr-0.5" />
                              {{ formatDate(activity.createdAt || activity.timestamp) }}
                            </span>
                            <span class="w-0.5 h-0.5 bg-gray-300 rounded-full"></span>
                            <span class="inline-flex items-center gap-1 text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                              <Users :size="8" class="text-gray-300" />
                              {{ (activity.actor || 'system').split('@')[0] }}
                            </span>
                          </div>
                          <!-- Notes / description -->
                          <p class="text-[12px] font-mono text-gray-700 leading-snug tracking-tight uppercase font-bold">
                            {{ activity.notes || activity.description || 'NO_DETAILS_RECORDED' }}
                          </p>
                          <!-- Extra metadata if available -->
                          <div v-if="activity.lead_id || activity.related_record_id || activity.duration || activity.outcome" class="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1.5 text-[7px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                            <span v-if="activity.lead_id">Lead: {{ activity.lead_id?.substring(0, 8) }}</span>
                            <span v-if="activity.related_record_id">Related: {{ activity.related_record_id?.substring(0, 8) }}</span>
                            <span v-if="activity.duration">{{ activity.duration }}</span>
                            <span v-if="activity.outcome" class="text-green-600">{{ activity.outcome }}</span>
                          </div>
                        </div>
                        <!-- Action buttons -->
                        <div class="flex items-center gap-1 shrink-0">
                          <button @click="deleteActivity(activity.id)" class="w-6 h-6 flex items-center justify-center text-red-400 hover:text-white hover:bg-red-500 rounded-sm transition-all" title="Delete activity">
                            <Trash2 :size="11" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- End of timeline marker -->
                  <div class="relative pl-[26px] pt-1 pb-2">
                    <div class="flex items-center gap-2 text-[8px] font-mono font-bold text-gray-300 uppercase tracking-[0.3em]">
                      <span class="w-4 h-[2px] bg-gray-200 rounded-full"></span>
                      END_OF_LOG
                    </div>
                  </div>
                </div>
              </template>
              
              <!-- Empty state -->
              <div v-else class="flex flex-col items-center justify-center py-24 bg-gray-50/50 border border-dashed border-gray-200 rounded-lg">
                 <GitCommitHorizontal :size="36" class="text-gray-200 mb-4" />
                 <h5 class="text-[11px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]">ZERO_ACTIVITY_DETECTED</h5>
                 <p class="text-[9px] font-mono text-gray-300 uppercase tracking-widest mt-2 max-w-xs text-center leading-relaxed">System interaction logs are currently empty. Initialize communications to populate this stream.</p>
              </div>
            </div>

            <!-- CONTACTS TAB -->
            <div v-if="activeTab === 'contacts'" class="space-y-6">
              <div class="flex items-center justify-between mb-2">
                <div>
                  <h4 class="text-[10px] font-mono font-black uppercase tracking-widest text-gray-700">Lead Persons</h4>
                  <p class="text-[9px] font-mono text-gray-400 mt-0.5 uppercase tracking-widest">Multiple leads associated with this lead entity</p>
                </div>
                <button @click="showContactForm = !showContactForm" class="px-3 py-1.5 bg-[#2F2E8B] text-white text-[9px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] transition flex items-center gap-1.5">
                  <Plus :size="11" /> Add Lead
                </button>
              </div>

              <!-- Add Contact Form -->
              <div v-if="showContactForm" class="border border-[#2F2E8B]/20 bg-blue-50/30 p-5 space-y-3">
                <div class="grid grid-cols-2 gap-3">
                  <input v-model="newContact.name" type="text" placeholder="Full Name *" class="border border-gray-200 px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-widest outline-none focus:border-[#2F2E8B]" />
                  <input v-model="newContact.position" type="text" placeholder="Position / Role" class="border border-gray-200 px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-widest outline-none focus:border-[#2F2E8B]" />
                  <input v-model="newContact.phone" type="text" placeholder="Phone" class="border border-gray-200 px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-widest outline-none focus:border-[#2F2E8B]" />
                  <input v-model="newContact.email" type="email" placeholder="Email" class="border border-gray-200 px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-widest outline-none focus:border-[#2F2E8B]" />
                  <input v-model="newContact.company" type="text" placeholder="Company / Org" class="border border-gray-200 px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-widest outline-none focus:border-[#2F2E8B] col-span-2" />
                </div>
                <div class="flex gap-2 justify-end">
                  <button @click="showContactForm = false" class="px-3 py-1.5 border border-gray-200 text-gray-500 text-[9px] font-mono font-bold uppercase tracking-widest hover:bg-gray-50">Cancel</button>
                  <button @click="addContact" class="px-4 py-1.5 bg-[#2F2E8B] text-white text-[9px] font-mono font-bold uppercase tracking-widest hover:bg-[#3D2F88]">Save Lead</button>
                </div>
              </div>

              <!-- Contacts List -->
              <div v-if="contacts.length > 0" class="space-y-2">
                <div v-for="contact in contacts" :key="contact.id" class="flex items-start gap-4 bg-white border border-gray-100 p-4 hover:border-[#2F2E8B]/30 transition group">
                  <div class="w-10 h-10 bg-[#2F2E8B]/5 border border-[#2F2E8B]/10 flex items-center justify-center flex-shrink-0">
                    <Users :size="18" class="text-[#2F2E8B]/40" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                      <span class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest">{{ contact.name }}</span>
                      <span v-if="contact.position" class="text-[8px] font-mono font-bold text-[#2F2E8B] bg-blue-50 border border-blue-100 px-1.5 py-0.5 uppercase tracking-widest">{{ contact.position }}</span>
                    </div>
                    <div class="flex flex-wrap gap-3 text-[9px] font-mono text-gray-500">
                      <span v-if="contact.company" class="flex items-center gap-1"><Briefcase :size="10" /> {{ contact.company }}</span>
                      <span v-if="contact.phone" class="flex items-center gap-1"><Phone :size="10" /> {{ contact.phone }}</span>
                      <span v-if="contact.email" class="flex items-center gap-1"><Mail :size="10" /> {{ contact.email }}</span>
                    </div>
                  </div>
                  <button @click="removeContact(contact.id)" class="w-7 h-7 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all">
                    <Trash2 :size="12" />
                  </button>
                </div>
              </div>
              <div v-else-if="!showContactForm" class="flex flex-col items-center justify-center py-16 bg-gray-50/50 border border-dashed border-gray-200">
                <Users :size="28" class="text-gray-200 mb-3" />
                <h5 class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]">No Contacts Added</h5>
                <p class="text-[9px] font-mono text-gray-300 uppercase tracking-widest mt-1">Add contact persons for this lead above.</p>
              </div>
            </div>





            <!-- MEETINGS TAB -->
            <div v-if="activeTab === 'meetings'" class="space-y-6">
              <div class="flex items-center justify-between">
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-[0.2em]">{{ meetings.length }} MEETING_RECORD(S)</div>
                <button @click="showMeetingForm = !showMeetingForm" :class="showMeetingForm ? 'bg-gray-100 text-gray-600' : 'bg-[#2F2E8B] text-white'" class="px-4 py-2 text-[9px] font-mono font-black uppercase tracking-widest transition-all flex items-center gap-2">
                  <Plus :size="12" /> {{ showMeetingForm ? 'CANCEL' : 'SCHEDULE_MEETING' }}
                </button>
              </div>

              <!-- Meeting Form -->
              <div v-if="showMeetingForm" class="border border-[#2F2E8B]/20 bg-white shadow-none relative overflow-hidden">
                <div class="absolute inset-0 dotted-pattern opacity-[0.02] pointer-events-none"></div>
                <div class="relative z-10">
                  <!-- Form header -->
                  <div class="bg-gradient-to-r from-[#2F2E8B] to-[#3D2F88] px-5 py-3 flex items-center gap-3">
                    <div class="w-8 h-8 bg-white/10 border border-white/20 flex items-center justify-center">
                      <Calendar :size="14" class="text-white" />
                    </div>
                    <div>
                      <h4 class="text-[10px] font-mono font-black text-white uppercase tracking-[0.2em]">{{ editingMeetingId ? 'EDIT_MEETING_RECORD' : 'NEW_MEETING_RECORD' }}</h4>
                      <p class="text-[7px] font-mono font-bold text-white/50 uppercase tracking-widest mt-0.5">Schedule a meeting with this lead</p>
                    </div>
                  </div>
                  
                  <div class="p-5 space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div class="md:col-span-2">
                        <label class="text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1">Meeting Title *</label>
                        <input v-model="newMeeting.title" type="text" placeholder="MEETING_SUBJECT" class="w-full border border-gray-200 bg-white px-3 py-2.5 text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest focus:outline-none focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]/20 transition-all" />
                      </div>
                      <div>
                        <label class="text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1">Meeting Type</label>
                        <select v-model="newMeeting.meeting_type" class="w-full border border-gray-200 bg-white px-3 py-2.5 text-[11px] font-mono font-black text-gray-900 uppercase focus:outline-none focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]/20 transition-all">
                          <option value="call">Call</option>
                          <option value="demo">Demo</option>
                          <option value="presentation">Presentation</option>
                          <option value="follow_up">Follow-up</option>
                          <option value="in_person">In Person</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label class="text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1">Location / Link</label>
                        <input v-model="newMeeting.location" type="text" placeholder="OFFICE / ZOOM_LINK" class="w-full border border-gray-200 bg-white px-3 py-2.5 text-[11px] font-mono font-black text-gray-900 tracking-widest focus:outline-none focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]/20 transition-all" />
                      </div>
                      <div>
                        <label class="text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1">Start Date/Time *</label>
                        <input v-model="newMeeting.start_datetime" type="datetime-local" class="w-full border border-gray-200 bg-white px-3 py-2.5 text-[11px] font-mono font-black text-gray-900 focus:outline-none focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]/20 transition-all" />
                      </div>
                      <div>
                        <label class="text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1">End Date/Time *</label>
                        <input v-model="newMeeting.end_datetime" type="datetime-local" class="w-full border border-gray-200 bg-white px-3 py-2.5 text-[11px] font-mono font-black text-gray-900 focus:outline-none focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]/20 transition-all" />
                      </div>
                      <div class="md:col-span-2">
                        <label class="text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1">Agenda / Description</label>
                        <textarea v-model="newMeeting.agenda" rows="3" placeholder="MEETING_AGENDA_POINTS..." class="w-full border border-gray-200 bg-white px-3 py-2.5 text-[11px] font-mono font-black text-gray-900 tracking-tight focus:outline-none focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]/20 transition-all resize-none"></textarea>
                      </div>
                    </div>

                    <!-- In-Person Location Section -->
                    <div v-if="newMeeting.meeting_type === 'in_person'" class="border border-green-200 bg-green-50/30 p-4 space-y-4">
                      <div class="flex items-center gap-2">
                        <MapPin :size="14" class="text-green-600" />
                        <span class="text-[9px] font-mono font-black text-green-700 uppercase tracking-widest">Location & Distance</span>
                      </div>

                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <!-- LEFT: Your Location (Meeting Point) -->
                        <div class="bg-white border border-[#2F2E8B]/20 p-3 space-y-2">
                          <div class="flex items-center gap-1.5 pb-1 border-b border-gray-100">
                            <Navigation :size="11" class="text-[#2F2E8B]" />
                            <span class="text-[8px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest">Your Location</span>
                            <span v-if="newMeeting.lat" class="ml-auto text-[7px] font-mono font-bold text-green-600 bg-green-50 px-1 py-0.5 border border-green-200">SET</span>
                          </div>

                          <!-- Search your location -->
                          <div class="relative">
                            <input v-model="meetingLocationSearch" @keyup.enter="searchMeetingLocation" type="text" placeholder="Search address or place..." class="w-full border border-gray-200 bg-white px-2.5 py-1.5 text-[9px] font-mono focus:outline-none focus:border-[#2F2E8B]" />
                            <button @click="searchMeetingLocation" class="absolute right-0.5 top-0.5 px-2 py-1 text-[7px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest hover:bg-gray-100">GO</button>
                          </div>
                          <div v-if="meetingLocationResults.length > 0" class="border border-gray-200 bg-white max-h-28 overflow-y-auto -mt-1">
                            <button v-for="r in meetingLocationResults" :key="r.label" @click="selectMeetingLocation(r)" class="w-full text-left px-2.5 py-1.5 text-[8px] font-mono text-gray-700 hover:bg-[#2F2E8B]/5 hover:text-[#2F2E8B] border-b border-gray-50 truncate">
                              {{ r.label }}
                            </button>
                          </div>

                          <div class="flex gap-1.5">
                            <button @click="useCurrentLocation" :disabled="isLocatingDevice" class="flex-1 px-2 py-1.5 border border-green-600 text-green-600 hover:bg-green-600 hover:text-white text-[7px] font-mono font-black uppercase tracking-widest transition-all flex items-center justify-center gap-1">
                              <Loader2 v-if="isLocatingDevice" :size="9" class="animate-spin" />
                              <Navigation v-else :size="9" />
                              {{ isLocatingDevice ? '...' : 'CURRENT' }}
                            </button>
                            <button @click="showManualLocation = !showManualLocation" class="px-2 py-1.5 border border-gray-300 text-gray-500 hover:border-[#2F2E8B] hover:text-[#2F2E8B] text-[7px] font-mono font-black uppercase tracking-widest transition-all">MANUAL</button>
                          </div>

                          <!-- Manual input -->
                          <div v-if="showManualLocation" class="space-y-1.5">
                            <div class="grid grid-cols-2 gap-1.5">
                              <input v-model="meetingManualLat" type="number" step="any" placeholder="Lat" class="border border-gray-200 px-2 py-1 text-[8px] font-mono focus:outline-none focus:border-[#2F2E8B]" />
                              <input v-model="meetingManualLng" type="number" step="any" placeholder="Lng" class="border border-gray-200 px-2 py-1 text-[8px] font-mono focus:outline-none focus:border-[#2F2E8B]" />
                            </div>
                            <button @click="applyManualLocation" class="w-full px-2 py-1 bg-[#2F2E8B] text-white text-[7px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] transition-all">APPLY</button>
                          </div>

                          <!-- Selected location display -->
                          <div v-if="newMeeting.lat" class="bg-green-50 border border-green-200 px-2 py-1.5">
                            <p class="text-[7px] font-mono font-bold text-green-800 truncate">{{ newMeeting.location_name || `${newMeeting.lat.toFixed(4)}, ${newMeeting.lng.toFixed(4)}` }}</p>
                            <p class="text-[6px] font-mono text-green-600">{{ newMeeting.lat.toFixed(6) }}, {{ newMeeting.lng.toFixed(6) }}</p>
                          </div>
                          <div v-else class="bg-gray-50 border border-dashed border-gray-200 px-2 py-3 text-center">
                            <p class="text-[7px] font-mono font-bold text-gray-400 uppercase tracking-widest">No location set</p>
                          </div>
                        </div>

                        <!-- RIGHT: Lead's Location -->
                        <div class="bg-white border border-amber-200/60 p-3 space-y-2">
                          <div class="flex items-center gap-1.5 pb-1 border-b border-gray-100">
                            <MapPin :size="11" class="text-amber-600" />
                            <span class="text-[8px] font-mono font-black text-amber-700 uppercase tracking-widest">Lead's Location</span>
                            <span v-if="leadLocationSet" class="ml-auto text-[7px] font-mono font-bold text-green-600 bg-green-50 px-1 py-0.5 border border-green-200">KNOWN</span>
                            <span v-else class="ml-auto text-[7px] font-mono font-bold text-amber-600 bg-amber-50 px-1 py-0.5 border border-amber-200">UNSET</span>
                          </div>

                          <!-- Lead's existing location -->
                          <div v-if="leadLocationSet" class="flex items-start gap-2">
                            <MapPin :size="10" class="text-amber-500 mt-0.5 shrink-0" />
                            <div class="flex-1 min-w-0">
                              <p class="text-[8px] font-mono font-bold text-gray-800 uppercase">{{ props.lead.city || '' }}, {{ props.lead.country || '' }}</p>
                              <p class="text-[6px] font-mono text-gray-500">{{ props.lead.location.lat.toFixed(6) }}, {{ props.lead.location.lng.toFixed(6) }}</p>
                            </div>
                          </div>
                          <div v-else class="bg-amber-50 border border-dashed border-amber-200 px-2 py-2">
                            <p class="text-[7px] font-mono font-bold text-amber-600 uppercase tracking-widest mb-1.5">No lead location</p>
                            <div class="flex gap-1.5">
                              <input v-model="leadManualCity" type="text" placeholder="City / Area" class="flex-1 border border-gray-200 px-2 py-1 text-[8px] font-mono focus:outline-none focus:border-[#2F2E8B]" />
                              <button @click="saveLeadLocation" class="px-2 py-1 bg-amber-500 text-white text-[7px] font-mono font-black uppercase tracking-widest hover:bg-amber-600 transition-all">SAVE</button>
                            </div>
                            <p class="text-[6px] font-mono text-gray-400 mt-1">Or search address below to set lead's location</p>
                          </div>

                          <!-- Search to set lead location -->
                          <div class="relative">
                            <input v-model="leadLocationSearch" @keyup.enter="searchLeadLocation" type="text" placeholder="Search lead address..." class="w-full border border-gray-200 bg-white px-2.5 py-1.5 text-[8px] font-mono focus:outline-none focus:border-amber-500" />
                            <button @click="searchLeadLocation" class="absolute right-0.5 top-0.5 px-2 py-1 text-[7px] font-mono font-black text-amber-600 uppercase tracking-widest hover:bg-gray-100">GO</button>
                          </div>
                          <div v-if="leadLocationResults.length > 0" class="border border-gray-200 bg-white max-h-28 overflow-y-auto -mt-1">
                            <button v-for="r in leadLocationResults" :key="r.label" @click="selectLeadLocation(r)" class="w-full text-left px-2.5 py-1.5 text-[8px] font-mono text-gray-700 hover:bg-amber-50 hover:text-amber-700 border-b border-gray-50 truncate">
                              {{ r.label }}
                            </button>
                          </div>
                        </div>
                      </div>

                      <!-- Distance between the two locations -->
                      <div v-if="newMeeting.lat && leadLocationSet" class="bg-white border border-gray-200 px-4 py-3 flex items-center justify-between">
                        <div class="flex items-center gap-2">
                          <Navigation :size="14" class="text-[#2F2E8B]" />
                          <span class="text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest">Distance</span>
                        </div>
                        <div class="text-right">
                          <span class="text-[16px] font-mono font-black text-[#2F2E8B]">{{ meetingDistance !== null ? (meetingDistance < 1 ? (meetingDistance * 1000).toFixed(0) + ' m' : meetingDistance.toFixed(2) + ' km') : '—' }}</span>
                        </div>
                        <button v-if="newMeeting.lat" @click="openDirections" class="px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 text-[8px] font-mono font-black uppercase tracking-widest transition-all flex items-center gap-1.5">
                          <Navigation :size="10" /> DIRECTIONS
                        </button>
                      </div>
                      <div v-else class="bg-gray-50 border border-dashed border-gray-200 px-4 py-2 text-center">
                        <p class="text-[7px] font-mono font-bold text-gray-400 uppercase tracking-widest">Set both locations to calculate distance</p>
                      </div>
                    </div>

                    <div v-if="meetingError" class="border border-red-200 bg-red-50 text-red-700 px-3 py-2 text-[10px] font-mono uppercase tracking-wider whitespace-pre-wrap">
                      {{ meetingError }}
                    </div>
                    <div class="flex justify-end gap-3 pt-2 border-t border-gray-100">
                      <button @click="cancelMeetingForm" class="px-4 py-2 border border-gray-200 text-gray-400 text-[9px] font-mono font-black uppercase tracking-widest hover:text-gray-700 hover:border-gray-300 transition-all flex items-center gap-2">
                        <XCircle :size="12" /> CANCEL
                      </button>
                      <button @click="saveMeeting" :disabled="savingMeeting || !newMeeting.title?.trim() || !newMeeting.start_datetime || !newMeeting.end_datetime" class="px-6 py-2 bg-[#2F2E8B] text-white text-[9px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg shadow-[#2F2E8B]/20">
                        <Loader2 v-if="savingMeeting" :size="12" class="animate-spin" />
                        <Save v-else :size="12" />
                        {{ savingMeeting ? 'SAVING...' : (editingMeetingId ? 'SAVE_CHANGES' : 'COMMIT_MEETING') }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Loading -->
              <div v-if="loadingMeetings" class="flex flex-col items-center justify-center py-24">
                <Loader2 class="animate-spin text-[#2F2E8B]" :size="32" />
                <span class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.2em] mt-4">Loading_Meeting_Records...</span>
              </div>

              <!-- Meetings list (Grid) -->
              <template v-else-if="meetings.length > 0">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div v-for="meeting in meetings" :key="meeting.id" class="bg-white border border-gray-200 hover:border-[#2F2E8B]/30 transition-all group relative overflow-hidden">
                    <div class="p-3 space-y-2">
                      <!-- Header: title + type badge -->
                      <div class="flex items-start justify-between gap-2">
                        <div class="flex-1 min-w-0">
                          <h4 class="text-[10px] font-mono font-black text-gray-900 uppercase tracking-tight truncate">{{ meeting.title || 'MEETING_RECORD' }}</h4>
                          <span class="inline-block mt-0.5 px-1.5 py-0.5 bg-blue-50 border border-blue-100 text-[7px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest">{{ meeting.meeting_type?.replace('_', ' ') || 'call' }}</span>
                        </div>
                        <div class="flex items-center gap-0.5 shrink-0">
                          <button @click="editMeeting(meeting)" class="w-6 h-6 flex items-center justify-center border border-gray-200 bg-white text-gray-500 hover:text-[#2F2E8B] hover:border-[#2F2E8B] transition-all rounded-sm" title="Edit"><Edit :size="10" /></button>
                          <button @click="deleteMeetingRecord(meeting)" class="w-6 h-6 flex items-center justify-center border border-gray-200 bg-white text-gray-500 hover:text-red-500 hover:border-red-200 transition-all rounded-sm" title="Delete"><Trash2 :size="10" /></button>
                        </div>
                      </div>

                      <!-- Details grid (2 cols) -->
                      <div class="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[8px] font-mono">
                        <!-- Date/Time -->
                        <div class="col-span-2 flex items-center gap-1.5 text-gray-500">
                          <Clock :size="9" class="text-gray-400 shrink-0" />
                          <span class="font-bold text-gray-700 uppercase tracking-widest">{{ formatDate(meeting.start_datetime || meeting.start_time) }}</span>
                          <span v-if="meeting.end_datetime || meeting.end_time" class="text-gray-400">→ {{ formatDate(meeting.end_datetime || meeting.end_time) }}</span>
                        </div>

                        <!-- Location -->
                        <div v-if="meeting.location" class="col-span-2 flex items-start gap-1.5 text-gray-500">
                          <MapPin :size="9" class="text-amber-500 mt-0.5 shrink-0" />
                          <span class="text-gray-700 leading-tight">{{ meeting.location }}</span>
                        </div>

                        <!-- Coordinates + Distance -->
                        <div v-if="meeting.lat && meeting.lng" class="col-span-2 flex items-center gap-1.5 text-gray-400">
                          <Navigation :size="8" class="text-green-500 shrink-0" />
                          <span>{{ meeting.lat.toFixed(4) }}, {{ meeting.lng.toFixed(4) }}</span>
                          <span class="ml-auto text-[9px] font-black text-[#2F2E8B]">{{ formatMeetingDistance(meeting) }}</span>
                          <a :href="'https://www.google.com/maps/dir/?api=1&destination=' + meeting.lat + ',' + meeting.lng" target="_blank" class="ml-1 px-1.5 py-0.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white text-[6px] font-mono font-black uppercase tracking-widest transition-all rounded-sm">DIR</a>
                        </div>
                        <!-- Distance only (when meeting has no coords but lead has location - show for in-person) -->
                        <div v-else-if="meeting.meeting_type === 'in_person' && props.lead?.location?.lat" class="col-span-2 flex items-center gap-1.5 text-gray-400">
                          <MapPin :size="8" class="text-green-500 shrink-0" />
                          <span class="text-gray-500">Meeting at lead's location</span>
                          <span class="ml-auto text-[9px] font-black text-[#2F2E8B]">{{ meeting.distance_km != null ? (meeting.distance_km < 1 ? (meeting.distance_km * 1000).toFixed(0) + 'm' : meeting.distance_km.toFixed(2) + 'km') : '0m' }}</span>
                        </div>

                        <!-- Agenda -->
                        <div v-if="meeting.agenda || meeting.description" class="col-span-2 border-t border-gray-50 pt-1.5 mt-0.5">
                          <p class="text-[7px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-0.5">Agenda</p>
                          <p class="text-[8px] font-mono text-gray-600 leading-relaxed">{{ meeting.agenda || meeting.description }}</p>
                        </div>

                        <!-- Organizer -->
                        <div v-if="meeting.organizer_name" class="col-span-2 flex items-center gap-1 text-gray-400">
                          <Users :size="8" class="shrink-0" />
                          <span class="text-[7px] uppercase tracking-widest">{{ meeting.organizer_name }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>

              <div v-else class="flex flex-col items-center justify-center py-24 bg-gray-50/50 border border-dashed border-gray-200">
                <CalendarCheck :size="32" class="text-gray-200 mb-4" />
                <h5 class="text-[11px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]">NO_MEETINGS_SCHEDULED</h5>
                <p class="text-[9px] font-mono text-gray-300 uppercase tracking-widest mt-2 max-w-xs text-center leading-relaxed">No meeting records linked to this lead yet.</p>
                <button @click="showMeetingForm = true" class="mt-6 px-6 py-2.5 bg-[#2F2E8B] text-white text-[9px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] transition-all flex items-center gap-2">
                  <Plus :size="12" /> SCHEDULE_FIRST_MEETING
                </button>
              </div>
            </div>

            <!-- ASSETS TAB -->
            <div v-if="activeTab === 'assets'" class="space-y-6">
              <LinkedDocumentsWidget 
                recordType="lead" 
                :recordId="lead.id" 
                :recordName="lead.name" 
                @document-attached="handleDocumentAttached"
                @document-deleted="handleDocumentDeleted"
              />
            </div>

            <!-- NOTES TAB -->
            <div v-if="activeTab === 'notes'" class="space-y-4">
              <div class="border border-[#2F2E8B]/20 bg-blue-50/20 p-4">
                <h4 class="text-[9px] font-mono font-black uppercase tracking-widest text-gray-600 mb-3">Add Note</h4>
                <textarea
                  v-model="newNoteText"
                  rows="3"
                  placeholder="Type a note about this lead..."
                  class="w-full border border-gray-200 px-3 py-2.5 text-[11px] font-mono text-gray-700 outline-none focus:border-[#2F2E8B] resize-none bg-white"
                ></textarea>
                <div class="flex justify-end mt-2">
                  <button @click="stageNote" class="px-4 py-1.5 bg-[#2F2E8B] text-white text-[9px] font-mono font-bold uppercase tracking-widest hover:bg-[#3D2F88] transition flex items-center gap-1.5">
                    <Plus :size="11" /> Stage Note
                  </button>
                </div>
                <!-- Staged notes -->
                <div v-if="stagedNotes.length > 0" class="mt-3 pt-3 border-t border-dashed border-[#2F2E8B]/20">
                  <p class="text-[8px] font-mono font-bold text-amber-600 uppercase tracking-widest mb-2">Pending Notes ({{ stagedNotes.length }})</p>
                  <div v-for="(sn, si) in stagedNotes" :key="si" class="flex items-center justify-between gap-2 bg-amber-50 border border-amber-200 px-3 py-2 mb-1">
                    <p class="text-[10px] font-mono text-gray-700 truncate flex-1">{{ sn }}</p>
                    <button @click="stagedNotes.splice(si, 1)" class="text-red-400 hover:text-red-600 shrink-0"><X :size="10" /></button>
                  </div>
                </div>
              </div>

              <div v-if="loadingNotes" class="flex justify-center py-8">
                <Loader2 class="animate-spin text-gray-300" :size="20" />
              </div>
              <div v-else-if="notes.length > 0" class="space-y-2">
                <div v-for="note in notes" :key="note.id" class="bg-white border border-gray-100 p-4 hover:border-gray-200 transition group">
                  <div class="flex items-start justify-between gap-3">
                    <div class="flex-1">
                      <p class="text-[11px] font-mono text-gray-700 leading-relaxed">{{ note.note || note.text }}</p>
                      <div class="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span class="text-[8px] font-mono text-gray-300 uppercase tracking-widest">
                          {{ formatDate(note.created_at || note.createdAt) }}
                        </span>
                        <span class="text-[7px] font-mono font-bold text-gray-300 uppercase tracking-widest" v-if="note.created_by || note.author">
                          by {{ (note.created_by || note.author)?.split('@')[0] || note.created_by || note.author }}
                        </span>
                      </div>
                    </div>
                    <button @click="deleteNote(note.id)" class="w-6 h-6 flex items-center justify-center text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0">
                      <Trash2 :size="11" />
                    </button>
                  </div>
                </div>
              </div>
              <div v-else class="flex flex-col items-center justify-center py-16 bg-gray-50/50 border border-dashed border-gray-200">
                <StickyNote :size="28" class="text-gray-200 mb-3" />
                <h5 class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]">No Notes Yet</h5>
                <p class="text-[9px] font-mono text-gray-300 uppercase tracking-widest mt-1">Add your first note above.</p>
              </div>
            </div>

          </div>
        </div>

        <!-- Footer Control Bar -->
        <div class="px-4 py-2.5 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between gap-2 sticky bottom-0 z-20">
          <div class="flex items-center gap-2">
             <button @click="$emit('delete', lead)" class="px-4 py-2 border border-red-200 text-red-500 hover:bg-red-50 text-[10px] font-mono font-black uppercase tracking-widest transition-all flex items-center gap-1.5">
               <Trash2 :size="13" /> DELETE
             </button>
             <button @click="$emit('archive', lead); $emit('update:modelValue', false)" class="px-4 py-2 border border-amber-200 text-amber-600 hover:bg-amber-50 text-[10px] font-mono font-black uppercase tracking-widest transition-all flex items-center gap-1.5">
               <Archive :size="13" /> ARCHIVE
             </button>
          </div>
          <div class="flex items-center gap-2">
             <button @click="$emit('update:modelValue', false)" class="px-5 py-2 border border-gray-100 text-gray-500 hover:text-gray-900 hover:bg-white text-[10px] font-mono font-black uppercase tracking-widest transition-all">
               CLOSE
             </button>
             <button v-if="hasStagedChanges" @click="commitStagedChanges" :disabled="savingStaged" class="px-6 py-2 bg-green-600 text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-green-700 transition-all flex items-center gap-1.5 disabled:opacity-50">
               <Save :size="14" /> {{ savingStaged ? 'SAVING...' : 'SAVE CHANGES' }}
             </button>
             <button @click="$emit('edit', lead)" class="px-6 py-2 bg-[#2F2E8B] text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] transition-all flex items-center gap-1.5">
               <Edit :size="14" /> EDIT
             </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirm Dialog -->
    <Teleport to="body">
      <div v-if="showConfirm" class="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 backdrop-blur-sm" @click.self="cancelConfirm">
        <div class="bg-white w-full max-w-md mx-4 border border-gray-200 shadow-2xl overflow-hidden">
          <div class="h-1.5 w-full" :class="confirmDanger ? 'bg-red-600' : 'bg-[#2F2E8B]'"></div>
          <div class="p-6">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center"
                :class="confirmDanger ? 'bg-red-50 border border-red-200' : 'bg-[#2F2E8B]/5 border border-[#2F2E8B]/20'">
                <Trash2 v-if="confirmDanger" :size="16" class="text-red-600" />
                <AlertTriangle v-else :size="16" class="text-[#2F2E8B]" />
              </div>
              <div>
                <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">{{ confirmTitle }}</p>
                <p class="text-sm font-semibold text-gray-800">{{ confirmMessage }}</p>
              </div>
            </div>
          </div>
          <div class="px-6 pb-5 flex justify-end gap-3">
            <button @click="cancelConfirm" class="px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-wider border border-gray-300 text-gray-700 hover:bg-gray-50 transition">
              CANCEL
            </button>
            <button @click="executeConfirm" class="px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-wider text-white transition flex items-center gap-2"
              :class="confirmDanger ? 'bg-red-600 hover:bg-red-700' : 'bg-[#2F2E8B] hover:bg-[#3D2F88]'">
              <Trash2 :size="12" /> DELETE
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- WhatsApp Dialog -->
    <Teleport to="body">
      <div v-if="showWhatsAppDialog" class="fixed inset-0 z-[200] flex items-start justify-center pt-[20vh] bg-black/40 backdrop-blur-[2px]" @click.self="showWhatsAppDialog = false">
        <div class="bg-white shadow-2xl w-full max-w-sm rounded-lg border border-[#2F2E8B]/20 overflow-hidden animate-in zoom-in-95 duration-200">
          <div class="bg-[#2F2E8B] px-4 py-2.5 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-6 h-6 bg-[#3D3A9E] rounded-full flex items-center justify-center">
                <MessageSquare :size="12" class="text-white" />
              </div>
              <span class="text-[11px] font-mono font-black text-white uppercase tracking-widest">WhatsApp // Message</span>
            </div>
            <button @click="showWhatsAppDialog = false" class="w-5 h-5 flex items-center justify-center text-blue-300 hover:text-white rounded-sm hover:bg-[#3D3A9E] transition-colors">
              <X :size="12" />
            </button>
          </div>
          <div class="p-3.5 space-y-3">
            <div class="flex items-center gap-2 text-[10px] font-mono font-bold text-gray-600 uppercase tracking-widest bg-[#2F2E8B]/5 px-2.5 py-1.5 rounded-sm border border-[#2F2E8B]/10">
              <MessageSquare :size="11" class="text-[#2F2E8B]" />
              <span>{{ lead?.name || 'CONTACT' }}</span>
              <span v-if="lead?.phone" class="text-[#2F2E8B]">· {{ lead.phone }}</span>
            </div>
            <textarea v-model="whatsAppMessage" rows="3" placeholder="Type your WhatsApp message..." class="w-full border border-gray-200 bg-gray-50 px-3 py-2 text-[11px] font-mono text-gray-700 outline-none focus:border-[#2F2E8B] focus:bg-[#2F2E8B]/5 resize-none rounded-sm transition-colors"></textarea>
            <div class="bg-[#2F2E8B]/5 border border-[#2F2E8B]/10 px-3 py-2 rounded">
              <p class="text-[8px] font-mono font-bold text-[#2F2E8B] uppercase tracking-widest flex items-center gap-1.5">
                <MessageSquare :size="10" /> Message logged to lead activity.
              </p>
            </div>
          </div>
          <div class="px-3.5 py-2.5 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between gap-2">
            <a v-if="lead?.phone" :href="'https://wa.me/' + lead.phone.replace(/[^0-9]/g, '')" target="_blank" class="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-[9px] font-mono font-black uppercase tracking-widest transition-all flex items-center gap-1.5 rounded-sm shadow-none">
              <MessageSquare :size="11" /> Open WhatsApp
            </a>
            <div class="flex items-center gap-2">
              <button @click="showWhatsAppDialog = false" class="px-3 py-1.5 text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest hover:text-gray-700 transition-colors">Cancel</button>
              <button @click="proceedWithWhatsApp" class="px-4 py-1.5 bg-[#2F2E8B] hover:bg-[#3D3A9E] text-white text-[9px] font-mono font-black uppercase tracking-widest transition-all flex items-center gap-1.5 rounded-sm shadow-none">
                <MessageSquare :size="11" /> Save Text
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </Teleport>
</template>

<script setup>
import { 
  X, Phone, MessageSquare, Mail, RefreshCw, Info, History, FileText, Target,
  Flame, Sun, Snowflake, Edit, Trash2, Globe, Linkedin, Twitter, Facebook,
  Briefcase, MapPin, Loader2, Link, Plus, Calendar, Users, StickyNote, Archive, ArchiveRestore,
  CheckCircle2, DollarSign, Navigation, CalendarCheck, Clock, Save, XCircle, ChevronRight,
  UserPlus, CalendarPlus, Video, UserMinus, GitCommitHorizontal, ArrowUpRight,
  Paperclip, AlertTriangle
} from 'lucide-vue-next';
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import { useCurrency } from '@/composables/useCurrency';
import * as crmApi from '@/services/crm_api.js';
import * as documentsApi from '@/services/documents_api.js';
import { decodeJWT } from '@/services/decodeJWT.js';
import { usePreferences } from '@/config/usePreferences';
import { useRBAC } from '@/composables/useRBAC';
import LinkedDocumentsWidget from './LinkedDocumentsWidget.vue';

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  lead: { type: Object, default: null },
  users: { type: Array, default: () => [] },
  pipelineStages: { type: Array, default: () => [] }
});

const emit = defineEmits(['update:modelValue', 'edit', 'call', 'whatsapp', 'email', 'convert', 'delete', 'archive']);

const { formatCurrency, currencySymbol } = useCurrency();
const { getTenantId, getUserEmail, getUserName, getUserId } = decodeJWT();
const { preferences: brandPrefs } = usePreferences();
const { canAssign, initializeRBAC } = useRBAC();
const canAssignCrm = computed(() => canAssign('crm'));

// ── Confirm Dialog ──
const showConfirm = ref(false);
const confirmTitle = ref('');
const confirmMessage = ref('');
const confirmDanger = ref(true);
let confirmCallback = null;

function showConfirmDialog(title, message, danger = true) {
  return new Promise((resolve) => {
    confirmTitle.value = title;
    confirmMessage.value = message;
    confirmDanger.value = danger;
    confirmCallback = resolve;
    showConfirm.value = true;
  });
}

function executeConfirm() {
  showConfirm.value = false;
  if (confirmCallback) confirmCallback(true);
  confirmCallback = null;
}

function cancelConfirm() {
  showConfirm.value = false;
  if (confirmCallback) confirmCallback(false);
  confirmCallback = null;
}
onMounted(() => { initializeRBAC().catch(() => {}); });

const activeTab = ref('overview');
const activities = ref([]);
const loadingActivities = ref(false);

// CAC (Customer Acquisition Cost) state
const localCac = ref(props.lead?.cac ?? 0);
const savingCac = ref(false);
const cacSaved = ref(false);
const editingCac = ref(false);

// Notes tab state
const notes = ref([]);
const loadingNotes = ref(false);
const newNoteText = ref('');

// Staged changes (for Save button)
const stagedNotes = ref([]);
const stagedDocuments = ref([]);
const savingStaged = ref(false);
const cameraInputRef = ref(null);
const hasStagedChanges = computed(() => stagedNotes.value.length > 0 || stagedDocuments.value.length > 0);

function stageNote() {
  const text = newNoteText.value.trim();
  if (!text) return;
  stagedNotes.value.push(text);
  newNoteText.value = '';
}

function stageFileSelect(event) {
  const files = Array.from(event.target.files || []);
  files.forEach(file => {
    stagedDocuments.value.push({ file, name: file.name, category: 'other' });
  });
  event.target.value = '';
}

function stageCameraCapture(event) {
  const file = event?.target?.files?.[0];
  if (!file) return;
  stagedDocuments.value.push({ file, name: 'CAMERA_' + Date.now(), category: 'photo' });
  if (event?.target) event.target.value = '';
}

function stageCameraClick() {
  cameraInputRef.value?.click();
}

async function commitStagedChanges() {
  if (!props.lead?.id) return;
  savingStaged.value = true;
  const tenantId = getTenantId();
  try {
    // Save all staged notes
    for (const text of stagedNotes.value) {
      await crmApi.createLeadNote(props.lead.id, tenantId, { note: text, title: '' });
      await logActivity('note:create', `Note added: "${text.substring(0, 80)}"`);
    }
    stagedNotes.value = [];
    await loadNotes();
    
    // Upload all staged documents
    for (const sd of stagedDocuments.value) {
      const formData = new FormData();
      formData.append('file', sd.file);
      formData.append('name', sd.name);
      formData.append('category', sd.category || 'other');
      formData.append('linked_to_type', 'lead');
      formData.append('linked_to_id', props.lead.id);
      await documentsApi.uploadDocument(formData, tenantId);
      await logActivity('document:upload', `Document "${sd.name}" uploaded and linked to lead`);
    }
    stagedDocuments.value = [];
    
    await loadActivities();
  } catch (err) {
    console.error('[LeadDetailModal] Failed to commit staged changes:', err);
    alert('Failed to save some changes. Please try again.');
  } finally {
    savingStaged.value = false;
  }
}

async function loadNotes() {
  if (!props.lead?.id) return;
  loadingNotes.value = true;
  try {
    notes.value = await crmApi.getLeadNotes(props.lead.id, getTenantId());
  } catch (err) {
    console.error('[LeadDetailModal] Failed to load notes:', err);
    notes.value = [];
  } finally {
    loadingNotes.value = false;
  }
}

watch(() => props.lead, (l) => {
  localCac.value = l?.cac ?? 0;
  cacSaved.value = false;
  if (l?.id) {
    loadActivities();
    loadNotes();
  }
}, { immediate: true });

// Reload activities whenever the activities tab is selected
watch(activeTab, (tab) => {
  if (tab === 'activities' && props.lead?.id) loadActivities();
  if (tab === 'notes' && props.lead?.id) loadNotes();
});

async function saveCac() {
  if (!props.lead?.id) return;
  const oldCac = props.lead.cac ?? 0;
  const newCac = Number(localCac.value) || 0;
  if (newCac === oldCac) return;
  savingCac.value = true;
  cacSaved.value = false;
  try {
    await crmApi.updateLead(props.lead.id, leadPayload({ cac: newCac }), getTenantId());
    props.lead.cac = newCac;
    cacSaved.value = true;
    await logActivity('cac:update', `CAC changed: ${formatCurrency(oldCac)} → ${formatCurrency(newCac)}`);
    setTimeout(() => { cacSaved.value = false; }, 2000);
  } catch (error) {
    console.error('[LeadDetailModal] Failed to save CAC:', error);
    localCac.value = props.lead.cac ?? 0;
  } finally {
    savingCac.value = false;
  }
}

const cacAdjustAmount = ref(0);

function applyCacAdjust(mode) {
  const amount = Number(cacAdjustAmount.value) || 0;
  if (amount <= 0) { alert('Enter a valid positive amount.'); return; }
  const current = Number(localCac.value) || 0;
  localCac.value = mode === 'add' ? current + amount : Math.max(0, current - amount);
  cacAdjustAmount.value = 0;
  saveCac();
}

// Helper: build full payload with required fields for PUT endpoint
function leadPayload(extra) {
  return { ...props.lead, tenant_id: getTenantId(), ...extra };
}

// ── Document Upload Callback ──
async function handleDocumentAttached() {
  await logActivity('document:upload', 'Document uploaded and linked to lead');
}

async function handleDocumentDeleted(docName) {
  await logActivity('document:delete', `Document "${docName}" deleted from lead`);
}

// ── Activity Logging ──
async function logActivity(action, notes = '') {
  if (!props.lead?.id) return;
  try {
    await crmApi.logLeadActivity(props.lead.id, {
      action,
      notes: notes || `Activity: ${action}`,
      actor: getUserEmail() || 'system',
      actor_role: 'owner',
      tenant_id: getTenantId(),
      timestamp: new Date().toISOString()
    });
    if (activeTab.value === 'activities') {
      await loadActivities();
    }
  } catch (err) {
    console.error('[LeadDetailModal] Failed to log activity:', err);
  }
}

// Wrap the original emit to auto-log activity
const _origCall = (lead) => {
  const now = new Date().toISOString();
  logActivity('communication:call', `Call initiated to ${lead?.name || 'lead'} | Phone: ${lead?.phone || '—'} | Time: ${formatDate(now)}`);
  emit('call', lead);
};

// ── WhatsApp Dialog ──
const showWhatsAppDialog = ref(false);
const whatsAppMessage = ref('');

function proceedWithWhatsApp() {
  const msg = whatsAppMessage.value?.trim() || '';
  logActivity('communication:whatsapp', `WhatsApp message to ${props.lead?.name}${msg ? ' | Message: ' + msg : ''}`);
  emit('whatsapp', props.lead);
  showWhatsAppDialog.value = false;
  whatsAppMessage.value = '';
}

// ── Time Tracker ──
const showExportMenu = ref(false);
// Dynamic stage list from pipeline stages prop (falls back to defaults)
const stageList = computed(() => {
  if (props.pipelineStages?.length) {
    return props.pipelineStages.map(s => ({ key: s.id, label: (s.name || s.id).toUpperCase(), order: s.order || 0 }))
      .sort((a, b) => a.order - b.order);
  }
  // Fallback defaults
  return [
    { key: 'new', label: 'NEW' },
    { key: 'contacted', label: 'CONTACTED' },
    { key: 'qualified', label: 'QUALIFIED' },
    { key: 'proposal', label: 'PROPOSAL' },
    { key: 'negotiation', label: 'NEGOTIATION' },
    { key: 'closed-won', label: 'WON' },
    { key: 'closed-lost', label: 'LOST' }
  ];
});

const leadAgeDays = computed(() => {
  if (!props.lead?.created_at) return 0;
  const created = new Date(props.lead.created_at);
  const now = new Date();
  return Math.max(0, Math.floor((now - created) / (1000 * 60 * 60 * 24)));
});

const currentStageIdx = computed(() => {
  const stage = (props.lead?.stage || 'new').toLowerCase().replace(/\s+/g, '-');
  const list = stageList.value;
  const idx = list.findIndex(s => s.key === stage || s.key.toLowerCase() === stage);
  return idx >= 0 ? idx : 0;
});

const stageProgressPct = computed(() => {
  const list = stageList.value;
  if (currentStageIdx.value >= list.length - 1) return 100;
  // Progress is based on non-terminal stages (exclude closed-lost if it's last)
  const progressStages = list.filter(s => s.key !== 'closed-lost');
  const currentInProgress = progressStages.findIndex(s => s.key === list[currentStageIdx.value]?.key);
  if (currentInProgress < 0) return 0;
  return Math.round((currentInProgress / Math.max(progressStages.length - 1, 1)) * 100);
});

function getStageDotClass(idx) {
  if (idx < currentStageIdx.value) return 'bg-[#2F2E8B] border-[#2F2E8B]';
  if (idx === currentStageIdx.value) return 'bg-white border-[#2F2E8B] ring-2 ring-[#2F2E8B]/30';
  return 'bg-white border-gray-300';
}

// ── Export Report ──
async function exportReport(format) {
  showExportMenu.value = false;
  const l = props.lead;
  if (!l) return;

  // Ensure activities and meetings are loaded before export
  if (!activities.value.length) await loadActivities();
  if (!meetings.value.length) loadMeetings().catch(() => {});
  
  const tenantColor = '#2F2E8B';
  const now = new Date().toISOString().split('T')[0];
  const leadName = (l.name || 'UNKNOWN').trim();
  const safeName = leadName.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '').toUpperCase();
  const reportTitle = `${safeName}_REPORT_${now}`;

  // ── Fetch documents for export ──
  let documents = [];
  try {
    const tenantId = getTenantId();
    const docsResp = await documentsApi.getDocuments(tenantId, {
      linked_to_type: 'lead',
      linked_to_id: l.id
    });
    documents = docsResp.items || [];
  } catch (e) { /* ignore */ }
  
  // ── Consolidated data sections ──
  
  // 1) All lead fields as key-value pairs
  const leadFields = [
    { label: 'Full Name', value: l.name || 'N/A' },
    { label: 'Email Address', value: l.email || 'N/A' },
    { label: 'Phone Contact', value: l.phone || 'N/A' },
    { label: 'Company / Organization', value: l.company || 'N/A' },
    { label: 'Position / Role', value: l.position || 'N/A' },
    { label: 'Priority Level', value: (l.priority || 'N/A').toUpperCase() },
    { label: 'Current Stage', value: formatStage(l.stage) },
    { label: 'Acquisition Source', value: l.source || 'N/A' },
    { label: 'Projected Valuation', value: formatCurrency(l.value || 0) },
    { label: 'Client Maintenance Cost (CAC)', value: formatCurrency(l.cac || 0) },
    { label: 'Lead Age', value: `${leadAgeDays.value} day(s)` },
    { label: 'City / Zone', value: l.city || 'N/A' },
    { label: 'Country / Jurisdiction', value: l.country || 'N/A' },
    { label: 'Street Address', value: l.address || 'N/A' },
    { label: 'Area / District', value: l.areaName || 'N/A' },
    { label: 'Assigned To', value: l.assignedTo || 'N/A' },
    { label: 'TPIN / Tax ID', value: l.tpin || 'N/A' },
    { label: 'Website / Digital Asset', value: l.website || 'N/A' },
    { label: 'LinkedIn Profile', value: l.linkedin || 'N/A' },
    { label: 'Twitter / X', value: l.twitter || 'N/A' },
    { label: 'Facebook', value: l.facebook || 'N/A' },
    { label: 'Instagram', value: l.instagram || 'N/A' },
    { label: 'Tags', value: (l.tags || []).join(', ') || 'N/A' },
    { label: 'Notes', value: l.notes || 'N/A' },
    { label: 'Created On', value: formatDate(l.created_at) },
    { label: 'Last Updated', value: formatDate(l.updatedAt) }
  ];
  
  // 2) Conversion info (inline)
  const conversionInfo = l.isConverted
    ? `YES — Converted on ${formatDate(l.convertedDate)} | Contact: ${l.convertedContactId || 'N/A'} | Account: ${l.convertedAccountId || 'N/A'}`
    : 'NO';
  
  // 3) Stage timeline (inline string)
  const stageTimelineStr = stageList.value.map((s, i) => {
    const isCurrent = s.key === (l.stage || 'new').toLowerCase().replace(/\s+/g, '-');
    const isCompleted = i < currentStageIdx.value;
    const status = isCurrent ? '◉ CURRENT' : isCompleted ? '✓ COMPLETED' : '○ PENDING';
    return `${s.label} [${status}]`;
  }).join(' → ');
  
  // 4) Activities — detailed list
  const activityDetails = (activities.value || []).map(a => ({
    type: (a.type || a.action || 'event').toUpperCase(),
    notes: a.notes || a.description || '—',
    date: formatDate(a.createdAt || a.timestamp),
    actor: (a.actor || 'system').split('@')[0]
  }));
  
  // 5) Communications
  const commDetails = (activities.value || []).filter(a => {
    const t = (a.type || a.action || '').toLowerCase();
    return t.includes('call') || t.includes('whatsapp') || t.includes('email') || t.includes('communication');
  }).map(a => ({
    type: (a.type || a.action || '').replace('communication:', '').toUpperCase(),
    notes: a.notes || '—',
    date: formatDate(a.createdAt || a.timestamp),
    actor: (a.actor || '').split('@')[0] || '—'
  }));
  
  // 6) Documents
  const docDetails = documents.map(d => ({
    name: d.name || 'N/A',
    category: (d.category || 'FILE').toUpperCase(),
    size: formatFileSize(d.file_size),
    date: formatDate(d.created_at)
  }));
  
  // 7) Meetings
  const meetingDetails = (meetings.value || []).map(m => {
    const locStr = m.lat && m.lng ? `${m.location_name || ''} (${m.lat.toFixed(4)}, ${m.lng.toFixed(4)})` : (m.location || '—');
    let distStr = '—';
    if (m.distance_km != null) {
      distStr = m.distance_km < 1 ? (m.distance_km * 1000).toFixed(0) + ' m' : m.distance_km.toFixed(2) + ' km';
    }
    return { title: m.title || '—', type: m.meeting_type || '—', location: locStr, distance: distStr, date: formatDate(m.start_datetime || m.start_time) };
  });
  
  // ═══════════════════════════════════════
  // PDF (jsPDF)
  // ═══════════════════════════════════════
  if (format === 'pdf') {
    const { jsPDF } = await import('jspdf');
    const autoTable = (await import('jspdf-autotable')).default;
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth();
    const margin = 14;
    const contentW = pageW - margin * 2;
    let y = margin;
    
    function jspdfSection(title) {
      doc.setFillColor(245, 245, 255);
      doc.rect(margin, y, contentW, 6, 'F');
      doc.setTextColor(47, 46, 139);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text(title.toUpperCase(), margin + 2, y + 4.5);
      y += 9;
    }
    
    function jspdfCell(label, value) {
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(85, 85, 85);
      doc.text(String(label || ''), margin, y);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 51, 51);
      const valStr = String(value || '—');
      const maxW = contentW - 55;
      const lines = doc.splitTextToSize(valStr, maxW);
      doc.text(lines, margin + 50, y);
      y += Math.max(lines.length * 4, 4.5);
    }
    
    function jspdfTable(headers, data, opt) {
      try {
        const colCount = headers.length;
        const remaining = contentW - (opt?.colWidth0 || 50);
        const colW0 = opt?.colWidth0 || (colCount <= 2 ? 50 : Math.floor(contentW / colCount));
        const colStyles = {};
        colStyles[0] = { cellWidth: colW0, fontStyle: 'bold', textColor: [85,85,85] };
        if (colCount === 2) {
          colStyles[1] = { cellWidth: remaining };
        } else if (opt?.colWidth1) {
          colStyles[1] = { cellWidth: opt.colWidth1 };
          const restW = contentW - colW0 - opt.colWidth1;
          const otherW = Math.floor(restW / (colCount - 2));
          for (let i = 2; i < colCount; i++) colStyles[i] = { cellWidth: Math.max(otherW, 15) };
        } else {
          const otherW = Math.floor(remaining / (colCount - 1));
          for (let i = 1; i < colCount; i++) colStyles[i] = { cellWidth: Math.max(otherW, 15) };
        }
        const result = autoTable(doc, {
          startY: y,
          head: [headers],
          body: data,
          margin: { left: margin, right: margin },
          tableWidth: contentW,
          styles: { fontSize: 6.5, font: 'helvetica', cellPadding: { top: 1.5, bottom: 1.5, left: 2, right: 2 }, overflow: 'linebreak', minCellHeight: 5, valign: 'top' },
          headStyles: { fillColor: [47, 46, 139], textColor: 255, fontStyle: 'bold', fontSize: 7, halign: 'left' },
          columnStyles: colStyles,
          didParseCell: (cellData) => {
            if (cellData.section === 'body' && cellData.column.index === 1) {
              cellData.cell.styles.fontSize = 6;
            }
          }
        });
        y = (result && result.lastFinalY) ? result.lastFinalY + 4 : y + 20;
      } catch (e) {
        console.warn('[PDF] autoTable error:', e);
        y += 20;
      }
    }
    
    // Header
    doc.setFillColor(47, 46, 139);
    doc.rect(margin, y, contentW, 16, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('LEAD REPORT — ' + leadName.toUpperCase(), margin + 3, y + 7);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(200, 210, 255);
    doc.text((l.company || '') + '  |  Generated: ' + now + '  |  Age: ' + leadAgeDays.value + ' day(s)  |  ID: ' + (l.id?.slice(0, 8) || '—'), margin + 3, y + 12.5);
    y += 20;
    
    // Lead Timeline
    jspdfSection('Lead Timeline & Progress');
    jspdfCell('Lead Age', 'Since ' + formatDate(l.created_at) + ' — ' + leadAgeDays.value + ' day(s)');
    jspdfCell('Current Stage', formatStage(l.stage) + ' (' + stageProgressPct.value + '% complete)');
    jspdfCell('Progress', stageTimelineStr);
    
    // Lead Information — comprehensive field list
    jspdfSection('Lead Profile');
    const chunkSize = 18;
    for (let i = 0; i < leadFields.length; i += chunkSize) {
      const chunk = leadFields.slice(i, i + chunkSize);
      if (i > 0) { doc.addPage(); y = margin; jspdfSection('Lead Profile (continued)'); }
      chunk.forEach(f => jspdfCell(f.label, f.value));
    }
    
    // Timeline
    if (y > pageW - 45) { doc.addPage(); y = margin; }
    jspdfSection('Stage Timeline & Progress');
    jspdfCell('Lead Age', `Since ${formatDate(l.created_at)} — ${leadAgeDays.value} day(s)`);
    jspdfCell('Current Stage', `${formatStage(l.stage)} (${stageProgressPct.value}% complete)`);
    jspdfCell('Progress', stageTimelineStr);
    
    // Conversion
    if (y > pageW - 40) { doc.addPage(); y = margin; }
    jspdfSection('Conversion Status');
    jspdfCell('Converted', conversionInfo);
    
    // Activities
    if (y > pageW - 40) { doc.addPage(); y = margin; }
    jspdfSection('Activity Log (${activityDetails.length})');
    if (activityDetails.length) {
      jspdfTable(['Activity', 'Notes', 'Date', 'Actor'], activityDetails.map(a => [a.type, a.notes, a.date, a.actor]), { colWidth0: 18, colWidth1: 100 });
    } else {
      doc.setFontSize(8); doc.setTextColor(150); doc.text('No activities recorded.', margin, y);
    }
    
    // Communications
    if (y > pageW - 40) { doc.addPage(); y = margin; }
    jspdfSection('Communications (${commDetails.length})');
    if (commDetails.length) {
      jspdfTable(['Type', 'Details', 'Date', 'Actor'], commDetails.map(c => [c.type, c.notes, c.date, c.actor]), { colWidth0: 18, colWidth1: 100 });
    } else {
      doc.setFontSize(8); doc.setTextColor(150); doc.text('No communications recorded.', margin, y);
    }
    
    // Documents
    if (y > pageW - 40) { doc.addPage(); y = margin; }
    jspdfSection('Linked Documents (${docDetails.length})');
    if (docDetails.length) {
      jspdfTable(['Name', 'Category', 'Size', 'Date'], docDetails.map(d => [d.name, d.category, d.size, d.date]), { colWidth0: 55 });
    } else {
      doc.setFontSize(8); doc.setTextColor(150); doc.text('No documents linked.', margin, y);
    }
    
    // Meetings
    if (y > pageW - 40) { doc.addPage(); y = margin; }
    jspdfSection('Meetings (${meetingDetails.length})');
    if (meetingDetails.length) {
      jspdfTable(['Title', 'Type', 'Location', 'Distance', 'Date'], meetingDetails.map(m => [m.title, m.type, m.location, m.distance, m.date]), { colWidth0: 45 });
    } else {
      doc.setFontSize(8); doc.setTextColor(150); doc.text('No meetings recorded.', margin, y);
    }
    
    // CAC Summary
    if (y > pageW - 40) { doc.addPage(); y = margin; }
    jspdfSection('CAC Summary');
    jspdfTable(['Metric', 'Value'], [
      ['Customer Acquisition Cost', formatCurrency(l.cac || 0)],
      ['Lead Valuation', formatCurrency(l.value || 0)],
      ['ROI', l.cac && l.cac > 0 ? ((l.value || 0) / l.cac * 100).toFixed(1) + '%' : 'N/A']
    ]);
    
    // Footer
    doc.setFontSize(7);
    doc.setTextColor(180);
    doc.setFont('helvetica', 'normal');
    doc.text('Uniplexity CRM — Lead Report • ' + now + ' • Confidential', margin, doc.internal.pageSize.getHeight() - 10);
    
    doc.save(safeName + '_REPORT.pdf');
  
  // ═══════════════════════════════════════
  // DOCX
  // ═══════════════════════════════════════
  } else if (format === 'docx') {
    let html = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset="utf-8"><style>
      @page { size: A4 landscape; margin: 1.2cm; }
      body { font-family: 'Calibri', 'Segoe UI', 'Arial', sans-serif; font-size: 10px; color: #2d2d2d; line-height: 1.5; }
      h1 { background: ${tenantColor}; color: #fff; padding: 12px 18px; font-size: 18px; font-family: 'Calibri', 'Segoe UI', sans-serif; font-weight: 600; letter-spacing: 0.5px; }
      table { width: 100%; border-collapse: collapse; margin: 8px 0; table-layout: fixed; }
      th, td { border: 1px solid #c0c0c0; padding: 4px 7px; text-align: left; font-size: 9px; font-family: 'Calibri', 'Segoe UI', sans-serif; word-wrap: break-word; overflow-wrap: break-word; white-space: normal; }
      th { background: ${tenantColor}; color: #fff; font-weight: 600; font-size: 8.5px; letter-spacing: 0.3px; }
      td { color: #333; }
      .section-title { font-weight: 700; font-size: 11px; margin: 14px 0 5px; padding: 4px 10px; background: #f0f0f0; border-left: 4px solid ${tenantColor}; font-family: 'Calibri', 'Segoe UI', sans-serif; color: ${tenantColor}; }
      .footer { text-align: center; font-size: 7px; color: #999; margin-top: 20px; font-family: 'Calibri', 'Segoe UI', sans-serif; }
      .subtitle { color: #888; font-size: 8.5px; font-family: 'Calibri', 'Segoe UI', sans-serif; }
    </style></head><body>
      <h1>Lead Report — ${toTitleCase(l.name) || 'Unknown'}</h1>
      <p class="subtitle">${toTitleCase(l.company) || ''} | Generated: ${now} | Lead ID: ${l.id?.substring(0,8) || '—'} | Age: ${leadAgeDays.value} Day(s)</p>
      
      <div class="section-title">Lead Profile</div>
      <table>${leadFields.map(f => `<tr><td style="width:28%;background:#f5f5f5;font-weight:600;">${f.label}</td><td>${f.value}</td></tr>`).join('')}</table>
      
      <div class="section-title">Stage Timeline & Progress</div>
      <table>
        <tr><td style="width:28%;background:#f5f5f5;font-weight:600;">Lead Age</td><td>Since ${formatDate(l.created_at)} — ${leadAgeDays.value} Day(s)</td></tr>
        <tr><td style="background:#f5f5f5;font-weight:600;">Current Stage</td><td>${formatStage(l.stage)} (${stageProgressPct.value}% Complete)</td></tr>
        <tr><td style="background:#f5f5f5;font-weight:600;">Progress</td><td>${stageTimelineStr}</td></tr>
      </table>
      
      <div class="section-title">Conversion Status</div>
      <table><tr><td style="width:28%;background:#f5f5f5;font-weight:600;">Converted</td><td>${conversionInfo}</td></tr></table>
      
      <div class="section-title">Activity Log (${activityDetails.length})</div>
      ${activityDetails.length ? '<table><tr><th>Activity</th><th>Notes</th><th>Date</th><th>Actor</th></tr>' + activityDetails.map(a => `<tr><td>${a.type}</td><td>${a.notes}</td><td>${a.date}</td><td>${a.actor}</td></tr>`).join('') + '</table>' : '<p class="subtitle">No activities recorded.</p>'}
      
      <div class="section-title">Communications (${commDetails.length})</div>
      ${commDetails.length ? '<table><tr><th>Type</th><th>Details</th><th>Date</th><th>Actor</th></tr>' + commDetails.map(c => `<tr><td>${c.type}</td><td>${c.notes}</td><td>${c.date}</td><td>${c.actor}</td></tr>`).join('') + '</table>' : '<p class="subtitle">No communications recorded.</p>'}
      
      <div class="section-title">Linked Documents (${docDetails.length})</div>
      ${docDetails.length ? '<table><tr><th>Name</th><th>Category</th><th>Size</th><th>Date</th></tr>' + docDetails.map(d => `<tr><td>${d.name}</td><td>${d.category}</td><td>${d.size}</td><td>${d.date}</td></tr>`).join('') + '</table>' : '<p class="subtitle">No documents linked.</p>'}
      
      <div class="section-title">Meetings (${meetingDetails.length})</div>
      ${meetingDetails.length ? '<table><tr><th>Title</th><th>Type</th><th>Location</th><th>Distance</th><th>Date</th></tr>' + meetingDetails.map(m => `<tr><td>${m.title}</td><td>${m.type}</td><td>${m.location}</td><td>${m.distance}</td><td>${m.date}</td></tr>`).join('') + '</table>' : '<p class="subtitle">No meetings recorded.</p>'}
      
      <div class="section-title">CAC Summary</div>
      <table>
        <tr><td style="width:28%;background:#f5f5f5;font-weight:600;">Customer Acquisition Cost</td><td>${formatCurrency(l.cac || 0)}</td></tr>
        <tr><td style="background:#f5f5f5;font-weight:600;">Lead Valuation</td><td>${formatCurrency(l.value || 0)}</td></tr>
        <tr><td style="background:#f5f5f5;font-weight:600;">ROI</td><td>${l.cac && l.cac > 0 ? ((l.value || 0) / l.cac * 100).toFixed(1) + '%' : 'N/A'}</td></tr>
      </table>
      
      <div class="footer">Uniplexity CRM — Confidential</div>
    </body></html>`;
    
    const blob = new Blob([html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = reportTitle + '.doc';
    a.click();
    URL.revokeObjectURL(url);
  
  // ═══════════════════════════════════════
  // XLSX (CSV)
  // ═══════════════════════════════════════
  } else if (format === 'xlsx') {
    const csvRows = [];
    csvRows.push('LEAD REPORT,' + (l.name || 'UNKNOWN') + ',Generated,' + now + ',Age,' + leadAgeDays.value + ' day(s)');
    csvRows.push('');
    csvRows.push('LEAD PROFILE');
    csvRows.push('FIELD,VALUE');
    leadFields.forEach(f => csvRows.push('"' + f.label + '","' + f.value.replace(/"/g, '""') + '"'));
    csvRows.push('');
    csvRows.push('STAGE TIMELINE');
    csvRows.push('"' + stageTimelineStr.replace(/"/g, '""') + '"');
    csvRows.push('');
    csvRows.push('CONVERSION STATUS');
    csvRows.push('"' + conversionInfo.replace(/"/g, '""') + '"');
    csvRows.push('');
    csvRows.push('ACTIVITY LOG,' + activityDetails.length + ' entries');
    csvRows.push('Type,Notes,Date,Actor');
    activityDetails.forEach(a => csvRows.push('"' + a.type + '","' + a.notes.replace(/"/g, '""') + '","' + a.date + '","' + a.actor + '"'));
    csvRows.push('');
    csvRows.push('COMMUNICATIONS,' + commDetails.length + ' entries');
    csvRows.push('Type,Details,Date,Actor');
    commDetails.forEach(c => csvRows.push('"' + c.type + '","' + c.notes.replace(/"/g, '""') + '","' + c.date + '","' + c.actor + '"'));
    csvRows.push('');
    csvRows.push('LINKED DOCUMENTS,' + docDetails.length + ' entries');
    csvRows.push('Name,Category,Size,Date');
    docDetails.forEach(d => csvRows.push('"' + d.name + '","' + d.category + '","' + d.size + '","' + d.date + '"'));
    csvRows.push('');
    csvRows.push('MEETINGS,' + meetingDetails.length + ' entries');
    csvRows.push('Title,Type,Location,Distance,Date');
    meetingDetails.forEach(m => csvRows.push('"' + m.title + '","' + m.type + '","' + m.location + '","' + m.distance + '","' + m.date + '"'));
    csvRows.push('');
    csvRows.push('CAC SUMMARY');
    csvRows.push('"Customer Acquisition Cost","' + formatCurrency(l.cac || 0) + '"');
    csvRows.push('"Lead Valuation","' + formatCurrency(l.value || 0) + '"');
    csvRows.push('"ROI","' + (l.cac && l.cac > 0 ? ((l.value || 0) / l.cac * 100).toFixed(1) + '%' : 'N/A') + '"');
    
    const csv = csvRows.join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = reportTitle + '.csv';
    a.click();
    URL.revokeObjectURL(url);
  }
}

// ── Close export menu on outside click ──
onMounted(() => {
  document.addEventListener('click', () => { showExportMenu.value = false; });
});
const _origWhatsapp = (lead) => { showWhatsAppDialog.value = true; };
const _origEmail = (lead) => { logActivity('communication:email', `Email sent to ${lead?.email || lead?.name}`); emit('email', lead); };
const _origConvert = (lead) => { logActivity('convert', `Lead converted to account`); emit('convert', lead); };
const _origArchive = (lead) => { logActivity('updated', `Lead archived`); emit('archive', lead); };

// Contacts tab state
const newContact = ref({ name: '', phone: '', email: '', position: '', company: '' });
const showContactForm = ref(false);
const contacts = computed(() => props.lead?.contacts || []);

async function addContact() {
  if (!newContact.value.name) return;
  const contactName = newContact.value.name;
  const updated = [...contacts.value, { ...newContact.value, id: Date.now() }];
  try {
    await crmApi.updateLead(props.lead.id, leadPayload({ contacts: updated }), getTenantId());
    props.lead.contacts = updated;
  } catch {
    if (!props.lead.contacts) props.lead.contacts = [];
    props.lead.contacts.push({ ...newContact.value, id: Date.now() });
  }
  newContact.value = { name: '', phone: '', email: '', position: '', company: '' };
  showContactForm.value = false;
  await logActivity('contact:create', `Contact "${contactName}" added`);
}

async function removeContact(contactId) {
  const ok = await showConfirmDialog('REMOVE CONTACT', 'Remove this contact from the lead? This cannot be undone.', true);
  if (!ok) return;
  const updated = contacts.value.filter(c => c.id !== contactId);
  try {
    await crmApi.updateLead(props.lead.id, leadPayload({ contacts: updated }), getTenantId());
    props.lead.contacts = updated;
  } catch {
    props.lead.contacts = updated;
  }
}

async function addNote() {
  const text = newNoteText.value.trim();
  if (!text) return;
  try {
    await crmApi.createLeadNote(props.lead.id, getTenantId(), { note: text, title: '' });
    newNoteText.value = '';
    await loadNotes();
    await logActivity('note:create', `Note added: "${text.substring(0, 80)}"`);
    await loadActivities();
  } catch (err) {
    console.error('[LeadDetailModal] Failed to save note:', err);
  }
}

async function deleteNote(noteId) {
  const ok = await showConfirmDialog('DELETE NOTE', 'Permanently delete this note? This cannot be undone.', true);
  if (!ok) return;
  try {
    await crmApi.deleteLeadNote(noteId, getTenantId());
    notes.value = notes.value.filter(n => n.id !== noteId);
    await logActivity('note:delete', `Note deleted`);
  } catch (err) {
    console.error('[LeadDetailModal] Failed to delete note:', err);
  }
}

const tabs = [
  { id: 'overview', label: 'Overview', icon: Info },
  { id: 'contacts', label: 'Leads', icon: Users },
  { id: 'meetings', label: 'Meetings', icon: CalendarCheck },
  { id: 'activities', label: 'Activity', icon: History },
  { id: 'assets', label: 'Documents', icon: FileText },
  { id: 'notes', label: 'Notes', icon: StickyNote }
];

// Map logic
let leadMap = null;
let leadMarker = null;

function initLeadMap() {
  if (!props.lead?.location?.lat || !props.lead?.location?.lng) return;
  
  const containerId = 'lead-preview-map';
  const container = document.getElementById(containerId);
  if (!container) return;
  
  if (leadMap) {
    leadMap.remove();
    leadMap = null;
  }
  
  const lat = props.lead.location.lat;
  const lng = props.lead.location.lng;
  
  // Use Leaflet if available globaly (assuming it's loaded as per project standard)
  if (typeof L !== 'undefined') {
    leadMap = L.map(containerId, {
      zoomControl: false,
      attributionControl: false
    }).setView([lat, lng], 15);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(leadMap);
    
    let icon;
    const logo = brandPrefs.companyLogo;
    if (logo) {
      icon = L.divIcon({
        className: 'crm-logo-marker',
        html: `<div style="width:40px;height:40px;border-radius:50%;border:3px solid #2F2E8B;background:#fff;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;"><img src="${logo}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" onerror="this.style.display='none'"/></div><div style="width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:10px solid #2F2E8B;margin:-2px auto 0;"></div>`,
        iconSize: [40, 52],
        iconAnchor: [20, 52],
        popupAnchor: [0, -52]
      });
    } else {
      icon = L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41]
      });
    }
    
    leadMarker = L.marker([lat, lng], { icon }).addTo(leadMap);
    
    // Grayscale logic handled via CSS
  }
}

watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    activeTab.value = 'overview';
    if (props.lead?.id) {
       loadActivities();
       nextTick(() => {
         initLeadMap();
       });
    }
  }
});

watch(activeTab, (newTab) => {
  if (newTab === 'overview') {
     nextTick(() => {
       initLeadMap();
     });
  } else if (newTab === 'meetings') {
    if (typeof meetings !== 'undefined' && meetings.value && meetings.value.length === 0 && typeof loadingMeetings !== 'undefined' && !loadingMeetings.value) {
      loadMeetings();
    }
  }
});

async function loadActivities() {
  if (!props.lead?.id) return;
  
  loadingActivities.value = true;
  try {
    const tenantId = getTenantId();
    const data = await crmApi.getLeadActivities(props.lead.id, tenantId);
    // Normalize: backend stores 'action', frontend expects 'type'
    activities.value = (data || []).map(a => ({ ...a, type: a.type || a.action || 'updated' }));
  } catch (error) {
    console.error('[LeadDetailModal] Failed to load activities:', error);
    activities.value = [];
  } finally {
    loadingActivities.value = false;
  }
}

async function deleteActivity(activityId) {
  if (!activityId) return;
  const ok = await showConfirmDialog('DELETE ACTIVITY', 'Permanently delete this activity record? This cannot be undone.', true);
  if (!ok) return;
  try {
    await crmApi.deleteLeadActivity(activityId, getTenantId());
    activities.value = activities.value.filter(a => a.id !== activityId);
  } catch (err) {
    console.error('[LeadDetailModal] Failed to delete activity:', err);
  }
}

function formatDate(dateString) {
  if (!dateString) return 'N/A';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).toUpperCase();
  } catch { return 'N/A'; }
}

function formatFileSize(bytes) {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function formatStage(stage) {
  if (!stage) return 'NEW';
  return stage.replace(/_/g, ' ').toUpperCase();
}

function toTitleCase(str) {
  if (!str) return 'N/A';
  return String(str).replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function formatActivityType(type) {
  if (!type) return 'EVENT';
  return type
    .replace('communication:', '')
    .replace(':create', '')
    .replace(':update', '')
    .replace(':delete', '')
    .replace(/_/g, ' ')
    .toUpperCase();
}

function getPriorityColor(priority) {
  if (priority === 'hot') return 'text-red-600';
  if (priority === 'warm') return 'text-orange-600';
  if (priority === 'cold') return 'text-blue-600';
  return 'text-gray-400';
}

function getUserInitials(email) {
  if (!email) return 'SY';
  return email.charAt(0).toUpperCase() + (email.split('@')[0].charAt(1) || '').toUpperCase();
}

function getAssignedUserRole(email) {
  const user = props.users.find(u => u.email === email);
  return user?.role || 'MEMBER';
}

function getActivityLucideIcon(type) {
  if (!type) return Info;
  const icons = {
    'created': Plus,
    'updated': Edit,
    'deleted': Trash2,
    'communication:email': Mail,
    'communication:call': Phone,
    'communication:whatsapp': MessageSquare,
    'note': FileText,
    'convert': RefreshCw,
    'contact:create': UserPlus,
    'appointment:create': CalendarPlus,
    'appointment:update': CalendarCheck,
    'visit:create': MapPin,
    'meeting:create': Video,
    'note:create': FileText,
    'document:upload': Paperclip,
    'WhatsApp': MessageSquare,
    'Phone Call': Phone
  };
  return icons[type?.toLowerCase()] || Info;
}

function getActivityColorClass(type) {
  if (!type) return 'bg-gray-400';
  const colors = {
    'created': 'bg-emerald-500',
    'updated': 'bg-blue-500',
    'deleted': 'bg-red-500',
    'communication:email': 'bg-indigo-500',
    'communication:call': 'bg-emerald-600',
    'communication:whatsapp': 'bg-green-500',
    'note': 'bg-amber-500',
    'convert': 'bg-purple-600',
    'contact:create': 'bg-cyan-500',
    'appointment:create': 'bg-orange-500',
    'appointment:update': 'bg-orange-600',
    'visit:create': 'bg-rose-500',
    'meeting:create': 'bg-violet-500',
    'note:create': 'bg-amber-500',
    'document:upload': 'bg-sky-500',
    'WhatsApp': 'bg-green-500',
    'Phone Call': 'bg-emerald-600'
  };
  return colors[type?.toLowerCase()] || 'bg-gray-400';
}

// =========================
// MEETINGS
// =========================
const meetings = ref([]);
const loadingMeetings = ref(false);
const showMeetingForm = ref(false);
const editingMeetingId = ref(null);
const savingMeeting = ref(false);
const meetingError = ref('');
const emptyMeeting = () => ({
  title: '',
  meeting_type: 'call',
  location: '',
  start_datetime: '',
  end_datetime: '',
  agenda: '',
  lat: null,
  lng: null,
  location_name: ''
});
const newMeeting = ref(emptyMeeting());

// Meeting location state
const meetingLocationSearch = ref('');
const meetingLocationResults = ref([]);
const isSearchingLocation = ref(false);
const isLocatingDevice = ref(false);
const meetingDistance = ref(null);
const meetingManualLat = ref(null);
const meetingManualLng = ref(null);
const showManualLocation = ref(false);

// Lead location state
const leadLocationSearch = ref('');
const leadLocationResults = ref([]);
const leadManualCity = ref('');
const leadLocationSet = computed(() => !!(props.lead?.location?.lat && props.lead?.location?.lng));

async function loadMeetings() {
  if (!props.lead?.id) return;
  loadingMeetings.value = true;
  try {
    const res = await crmApi.getMeetings(getTenantId(), { related_record_id: props.lead.id, limit: 100 });
    meetings.value = Array.isArray(res) ? res : (res?.items || res?.data || []);
  } catch (error) {
    console.error('[LeadDetailModal] Failed to load meetings:', error);
    meetings.value = [];
  } finally {
    loadingMeetings.value = false;
  }
}

function cancelMeetingForm() {
  showMeetingForm.value = false;
  editingMeetingId.value = null;
  newMeeting.value = emptyMeeting();
  meetingError.value = '';
  meetingDistance.value = null;
  meetingLocationSearch.value = '';
  meetingLocationResults.value = [];
  showManualLocation.value = false;
  meetingManualLat.value = null;
  meetingManualLng.value = null;
}

function searchMeetingLocation() {
  const q = meetingLocationSearch.value.trim();
  if (!q) return;
  isSearchingLocation.value = true;
  if (!window.google || !window.google.maps || !window.google.maps.places) {
    // Fallback: use a simple geocode via OpenStreetMap Nominatim
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=5`)
      .then(r => r.json())
      .then(data => {
        meetingLocationResults.value = data.map(d => ({
          label: d.display_name,
          lat: parseFloat(d.lat),
          lng: parseFloat(d.lon)
        }));
      })
      .catch(() => { meetingLocationResults.value = []; })
      .finally(() => { isSearchingLocation.value = false; });
  } else {
    // Use Google Places
    const service = new google.maps.places.AutocompleteService();
    service.getPlacePredictions({ input: q, types: ['geocode'] }, (predictions, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
        meetingLocationResults.value = predictions.map(p => ({ label: p.description, placeId: p.place_id, lat: null, lng: null }));
      } else {
        meetingLocationResults.value = [];
      }
      isSearchingLocation.value = false;
    });
  }
}

function selectMeetingLocation(result) {
  newMeeting.value.location_name = result.label;
  if (result.lat && result.lng) {
    newMeeting.value.lat = result.lat;
    newMeeting.value.lng = result.lng;
  } else if (result.placeId && window.google?.maps?.places) {
    const placesService = new google.maps.places.PlacesService(document.createElement('div'));
    placesService.getDetails({ placeId: result.placeId }, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && place?.geometry?.location) {
        newMeeting.value.lat = place.geometry.location.lat();
        newMeeting.value.lng = place.geometry.location.lng();
      }
    });
  }
  newMeeting.value.location = result.label;
  meetingLocationResults.value = [];
  meetingLocationSearch.value = '';
  calcMeetingDistance();
}

function calcMeetingDistance() {
  const mLat = newMeeting.value.lat;
  const mLng = newMeeting.value.lng;
  const leadLoc = props.lead?.location;
  if (!mLat || !mLng || !leadLoc?.lat || !leadLoc?.lng) {
    meetingDistance.value = null;
    return;
  }
  const R = 6371;
  const dLat = (leadLoc.lat - mLat) * Math.PI / 180;
  const dLng = (leadLoc.lng - mLng) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(mLat * Math.PI / 180) * Math.cos(leadLoc.lat * Math.PI / 180) * Math.sin(dLng/2)**2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  meetingDistance.value = R * c;
}

function calcMeetingDistanceStatic(meeting) {
  const leadLoc = props.lead?.location;
  if (!meeting.lat || !meeting.lng || !leadLoc?.lat || !leadLoc?.lng) return '';
  const R = 6371;
  const dLat = (leadLoc.lat - meeting.lat) * Math.PI / 180;
  const dLng = (leadLoc.lng - meeting.lng) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(meeting.lat * Math.PI / 180) * Math.cos(leadLoc.lat * Math.PI / 180) * Math.sin(dLng/2)**2;
  const d = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return d < 1 ? (d * 1000).toFixed(0) + 'm' : d.toFixed(2) + 'km';
}

function formatMeetingDistance(meeting) {
  // Use saved backend distance if available
  if (meeting.distance_km != null) {
    const d = meeting.distance_km;
    return d < 1 ? (d * 1000).toFixed(0) + 'm' : d.toFixed(2) + 'km';
  }
  // Fallback to frontend calculation
  return calcMeetingDistanceStatic(meeting);
}

function useCurrentLocation() {
  if (!navigator.geolocation) { alert('Geolocation is not supported by your browser.'); return; }
  isLocatingDevice.value = true;
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      newMeeting.value.lat = pos.coords.latitude;
      newMeeting.value.lng = pos.coords.longitude;
      newMeeting.value.location_name = `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`;
      newMeeting.value.location = `CURRENT_LOCATION (${newMeeting.value.location_name})`;
      isLocatingDevice.value = false;
      calcMeetingDistance();
    },
    () => { isLocatingDevice.value = false; alert('Could not get current location. Please enable location access.'); },
    { enableHighAccuracy: true, timeout: 10000 }
  );
}

function useLeadLocation() {
  const loc = props.lead?.location;
  if (!loc?.lat || !loc?.lng) return;
  newMeeting.value.lat = loc.lat;
  newMeeting.value.lng = loc.lng;
  newMeeting.value.location_name = `${props.lead.city || ''} ${props.lead.country || ''}`.trim() || `${loc.lat.toFixed(4)}, ${loc.lng.toFixed(4)}`;
  newMeeting.value.location = newMeeting.value.location_name;
  calcMeetingDistance();
}

function applyManualLocation() {
  const lat = parseFloat(meetingManualLat.value);
  const lng = parseFloat(meetingManualLng.value);
  if (isNaN(lat) || isNaN(lng)) { alert('Enter valid latitude and longitude values.'); return; }
  newMeeting.value.lat = lat;
  newMeeting.value.lng = lng;
  newMeeting.value.location_name = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  newMeeting.value.location = `MANUAL (${newMeeting.value.location_name})`;
  showManualLocation.value = false;
  calcMeetingDistance();
}

function openDirections() {
  const mLat = newMeeting.value.lat;
  const mLng = newMeeting.value.lng;
  if (!mLat || !mLng) return;
  const url = `https://www.google.com/maps/dir/?api=1&destination=${mLat},${mLng}`;
  window.open(url, '_blank');
}

function searchLeadLocation() {
  const q = leadLocationSearch.value.trim();
  if (!q) return;
  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=5`)
    .then(r => r.json())
    .then(data => {
      leadLocationResults.value = data.map(d => ({
        label: d.display_name,
        lat: parseFloat(d.lat),
        lng: parseFloat(d.lon)
      }));
    })
    .catch(() => { leadLocationResults.value = []; });
}

function selectLeadLocation(result) {
  if (!props.lead?.id) return;
  const tenantId = getTenantId();
  if (!tenantId) return;
  // Save the location to the lead via API
  const updatePayload = {
    location: { lat: result.lat, lng: result.lng },
    city: result.label.split(',')[0]?.trim() || '',
    country: result.label.split(',').pop()?.trim() || ''
  };
  crmApi.updateLead(props.lead.id, updatePayload, tenantId).then(() => {
    if (props.lead) {
      props.lead.location = updatePayload.location;
      props.lead.city = updatePayload.city;
      props.lead.country = updatePayload.country;
    }
    leadLocationResults.value = [];
    leadLocationSearch.value = '';
    calcMeetingDistance();
  }).catch(() => alert('Failed to save lead location.'));
}

async function saveLeadLocation() {
  const city = leadManualCity.value.trim();
  if (!city) return;
  if (!props.lead?.id) return;
  const tenantId = getTenantId();
  if (!tenantId) return;
  // Geocode the city name
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}&limit=1`);
    const data = await res.json();
    if (data.length > 0) {
      const loc = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      await crmApi.updateLead(props.lead.id, { location: loc, city }, tenantId);
      if (props.lead) {
        props.lead.location = loc;
        props.lead.city = city;
      }
      leadManualCity.value = '';
      calcMeetingDistance();
    } else {
      alert('Could not find that location. Try a more specific name.');
    }
  } catch { alert('Failed to geocode location.'); }
}

function toDatetimeLocal(dateStr) {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '';
    const pad = (n) => String(n).padStart(2, '0');
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + 'T' + pad(d.getHours()) + ':' + pad(d.getMinutes());
  } catch { return ''; }
}

function editMeeting(meeting) {
  editingMeetingId.value = meeting.id;
  newMeeting.value = {
    title: meeting.title || '',
    meeting_type: meeting.meeting_type || 'call',
    location: meeting.location || '',
    start_datetime: toDatetimeLocal(meeting.start_datetime || meeting.start_time),
    end_datetime: toDatetimeLocal(meeting.end_datetime || meeting.end_time),
    agenda: meeting.agenda || meeting.description || '',
    lat: meeting.lat || null,
    lng: meeting.lng || null,
    location_name: meeting.location_name || ''
  };
  showMeetingForm.value = true;
}

async function saveMeeting() {
  meetingError.value = '';
  if (!props.lead?.id) {
    meetingError.value = 'Cannot create meeting: lead ID is missing. Please reopen this lead and try again.';
    return;
  }
  if (!newMeeting.value.title?.trim()) {
    meetingError.value = 'Meeting title is required.';
    return;
  }
  if (!newMeeting.value.start_datetime || !newMeeting.value.end_datetime) {
    meetingError.value = 'Start and end date/time are required.';
    return;
  }
  const startDt = new Date(newMeeting.value.start_datetime);
  const endDt = new Date(newMeeting.value.end_datetime);
  if (isNaN(startDt.getTime()) || isNaN(endDt.getTime())) {
    meetingError.value = 'Invalid start or end date/time.';
    return;
  }
  if (endDt <= startDt) {
    meetingError.value = 'End date/time must be after start date/time.';
    return;
  }
  const tenantId = getTenantId();
  if (!tenantId) {
    meetingError.value = 'Tenant ID is missing. Please log out and log back in.';
    return;
  }
  const organizerEmail = getUserEmail() || '';
  const organizerUserId = getUserId() || organizerEmail;
  if (!organizerUserId) {
    meetingError.value = 'Cannot determine the current user. Please log out and log back in.';
    return;
  }
  savingMeeting.value = true;
  try {
    // Calculate distance between meeting location and lead location
    let distanceKm = null;
    if (newMeeting.value.lat && newMeeting.value.lng && props.lead?.location?.lat && props.lead?.location?.lng) {
      const mLat = newMeeting.value.lat;
      const mLng = newMeeting.value.lng;
      const lLat = props.lead.location.lat;
      const lLng = props.lead.location.lng;
      const R = 6371;
      const dLat = (lLat - mLat) * Math.PI / 180;
      const dLng = (lLng - mLng) * Math.PI / 180;
      const a = Math.sin(dLat/2)**2 + Math.cos(mLat * Math.PI / 180) * Math.cos(lLat * Math.PI / 180) * Math.sin(dLng/2)**2;
      distanceKm = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    }

    const payload = {
      tenant_id: tenantId,
      title: newMeeting.value.title.trim(),
      meeting_type: newMeeting.value.meeting_type || 'call',
      location_type: newMeeting.value.meeting_type === 'in_person' ? 'physical' : ((newMeeting.value.location || '').match(/^https?:\/\//i) ? 'virtual' : (newMeeting.value.location ? 'physical' : 'virtual')),
      location: newMeeting.value.location || '',
      lat: newMeeting.value.lat,
      lng: newMeeting.value.lng,
      location_name: newMeeting.value.location_name || '',
      distance_km: distanceKm,
      start_datetime: startDt.toISOString(),
      end_datetime: endDt.toISOString(),
      agenda: newMeeting.value.agenda || '',
      organizer_id: String(organizerUserId),
      organizer_name: getUserName() || organizerEmail || 'Unknown',
      created_by: organizerEmail || String(organizerUserId),
      participants: organizerEmail ? [{
        user_id: String(organizerUserId),
        name: getUserName() || organizerEmail,
        email: organizerEmail,
        type: 'internal'
      }] : [],
      related_records: [{
        record_type: 'lead',
        record_id: String(props.lead.id),
        record_name: props.lead.name || ''
      }]
    };
    const meetingTitle = newMeeting.value.title;
    const isUpdate = !!editingMeetingId.value;
    if (editingMeetingId.value) {
      await crmApi.updateMeeting(editingMeetingId.value, payload);
    } else {
      await crmApi.createMeeting(payload);
    }
    cancelMeetingForm();
    await loadMeetings();
    const isPhysical = newMeeting.value.meeting_type === 'in_person';
    const locNote = isPhysical && newMeeting.value.lat ? ` at ${newMeeting.value.location_name || ''} (${newMeeting.value.lat?.toFixed(4)}, ${newMeeting.value.lng?.toFixed(4)})` : '';
    const distNote = distanceKm !== null ? ` | Distance: ${distanceKm < 1 ? (distanceKm * 1000).toFixed(0) + 'm' : distanceKm.toFixed(2) + 'km'}` : '';
    await logActivity('meeting:create', `Meeting "${meetingTitle}" ${isUpdate ? 'updated' : 'created'}${locNote}${distNote}`);
    await loadActivities();
  } catch (error) {
    console.error('[LeadDetailModal] Failed to save meeting:', error);
    const apiMsg = error?.message || error?.data?.detail || error?.data?.message || '';
    meetingError.value = apiMsg
      ? `Failed to save meeting: ${apiMsg}`
      : 'Failed to save meeting. Please check your connection and try again.';
  } finally {
    savingMeeting.value = false;
  }
}

async function deleteMeetingRecord(meeting) {
  if (!meeting?.id) return;
  const ok = await showConfirmDialog('DELETE MEETING', `Permanently delete meeting "${meeting.title || 'this record'}"? This cannot be undone.`, true);
  if (!ok) return;
  try {
    await crmApi.deleteMeeting(meeting.id, getTenantId());
    meetings.value = meetings.value.filter(m => m.id !== meeting.id);
  } catch (error) {
    console.error('[LeadDetailModal] Failed to delete meeting:', error);
    const apiMsg = error?.message || error?.data?.detail || error?.data?.message || '';
    alert(apiMsg ? `Failed to delete meeting: ${apiMsg}` : 'Failed to delete meeting. Please try again.');
  }
}
</script>

<style scoped>
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

.dotted-pattern {
  background-image: radial-gradient(#2F2E8B 1px, transparent 1px);
  background-size: 20px 20px;
}

.font-outfit {
  font-family: 'Outfit', sans-serif;
}
</style>
