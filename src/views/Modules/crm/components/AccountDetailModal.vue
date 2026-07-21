
<template>
  <Teleport to="body">
    <div v-if="modelValue" class="fixed inset-0 z-[100] flex items-stretch sm:items-center justify-center p-0 sm:p-4 backdrop-blur-sm bg-black/40">
      <div class="bg-white shadow-[0_0_50px_rgba(47,46,139,0.2)] w-full max-w-6xl h-full sm:h-auto sm:max-h-[92vh] overflow-hidden flex flex-col border border-gray-200 rounded-none relative">
        <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-[0.02]"></div>
        
        <!-- Modal Header -->
        <div class="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6 border-b border-gray-100 bg-white/50 backdrop-blur-md sticky top-0 z-20">
          <div class="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <div class="w-1.5 h-8 bg-[#2F2E8B]"></div>
            <div class="flex-1 min-w-0 flex items-center gap-2 sm:gap-4">
              <div class="w-12 h-12 sm:w-16 sm:h-16 bg-gray-50 border border-gray-100 flex items-center justify-center text-lg sm:text-2xl font-mono font-black text-[#2F2E8B] shadow-inner shrink-0 uppercase tracking-tighter">
                {{ getInitials(account?.name) }}
              </div>
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.2em] truncate">Account_Node // Corporate_Registry</span>
                  <span v-if="account?.id" class="hidden sm:inline text-[8px] font-mono font-bold text-[#2F2E8B] bg-blue-50 px-1.5 py-0.5 uppercase tracking-widest border border-blue-100">ID:{{ account.id.substring(0, 8) }}</span>
                </div>
                <h3 class="text-lg sm:text-2xl font-black text-gray-900 uppercase tracking-tight font-outfit truncate">
                  {{ account?.name || 'NAMELESS_ACCOUNT' }}
                  <span v-if="account?.industry" class="text-gray-300 font-mono font-normal mx-2 hidden sm:inline">//</span>
                  <span v-if="account?.industry" class="hidden sm:inline text-gray-400 text-lg font-mono font-bold uppercase tracking-widest">{{ account.industry }}</span>
                </h3>
              </div>
            </div>
          </div>
          
          <div class="flex items-center gap-2">
            <div class="relative" @click.stop>
              <button @click="showExportMenu = !showExportMenu" class="w-10 h-10 flex items-center justify-center border border-gray-100 bg-white text-gray-400 hover:text-[#2F2E8B] hover:border-[#2F2E8B] transition-all shadow-sm group" title="Export Report">
                <Download :size="16" class="group-hover:scale-110 transition-transform" />
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
            <button @click="handleEdit" class="w-10 h-10 flex items-center justify-center border border-gray-100 bg-white text-gray-400 hover:text-orange-500 hover:border-orange-500 transition-all shadow-sm group" title="Modify State">
              <Edit :size="18" class="group-hover:scale-110 transition-transform" />
            </button>
            <button @click="close" class="w-10 h-10 flex items-center justify-center border border-gray-100 bg-white text-gray-400 hover:text-red-500 hover:border-red-500 transition-all shadow-sm group">
              <X :size="20" class="group-hover:rotate-90 transition-transform" />
            </button>
          </div>
        </div>

        <!-- Quick Action Ribbon -->
        <div class="bg-gray-50 border-b border-gray-100 px-4 sm:px-8 py-3 flex flex-wrap items-center gap-3 sm:gap-4 relative z-10">
          <div class="flex items-center gap-2 w-full sm:w-auto">
             <span class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest shrink-0">Protocol_Link:</span>
             <div class="flex flex-wrap gap-1">
               <a v-if="account?.website" :href="account.website" target="_blank" class="px-3 py-1.5 bg-blue-50 text-[#2F2E8B] border border-blue-100 text-[10px] font-mono font-black uppercase tracking-widest hover:bg-[#2F2E8B] hover:text-white transition-all flex items-center gap-2">
                 <Globe :size="12" /> ACCESS_WEBSITE
               </a>
               <button v-if="account?.phone" @click="openCallDialog(account?.phone, account?.name)" class="px-3 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-mono font-black uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all flex items-center gap-2">
                 <Phone :size="12" /> PRIMARY_COMM
               </button>
               <button v-if="account?.phone" @click="openWhatsAppDialog(account?.phone, account?.name)" class="px-3 py-1.5 bg-green-50 text-green-600 border border-green-100 text-[10px] font-mono font-black uppercase tracking-widest hover:bg-green-600 hover:text-white transition-all flex items-center gap-2">
                 <MessageSquare :size="12" /> WHATSAPP
               </button>
               <a v-if="account?.email" :href="'mailto:' + account.email" class="px-3 py-1.5 bg-indigo-50 text-indigo-600 border border-indigo-100 text-[10px] font-mono font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-2">
                 <Mail :size="12" /> TRANSMIT_DOCS
               </a>
             </div>
          </div>
          <div class="w-px h-6 bg-gray-200 mx-2 hidden sm:block"></div>
           <span v-if="account?.isConverted" class="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-100 px-3 py-1 text-[9px] font-mono font-black uppercase tracking-widest">
              <RefreshCw :size="10" /> CONVERTED_FROM_LEAD
           </span>
        </div>

        <!-- Tab Navigation -->
        <div class="px-3 sm:px-8 border-b border-gray-100 bg-white/50 backdrop-blur-md relative z-10">
          <div class="flex gap-4 sm:gap-8 overflow-x-auto whitespace-nowrap">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="activeTab === tab.id ? 'border-[#2F2E8B] text-[#2F2E8B] font-black' : 'border-transparent text-gray-400 hover:text-gray-600 font-bold'"
              class="py-4 border-b-2 text-[10px] font-mono uppercase tracking-[0.2em] transition-all flex items-center gap-2"
            >
               <component :is="tab.lucideIcon" :size="14" />
               {{ tab.label }}
            </button>
          </div>
        </div>

        <!-- Modal Body (Scrollable) -->
        <div class="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar relative">
          <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-[0.03]"></div>
          
          <!-- Tab Content -->
          <div class="relative z-10 space-y-12 animate-in fade-in duration-500">
            
            <!-- OVERVIEW TAB -->
            <div v-if="activeTab === 'overview'" class="space-y-12">
              <!-- Strategic Metrics -->
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div class="lg:col-span-3">
                  <div class="flex items-center gap-2 mb-2">
                    <div class="w-1 h-4 bg-[#2F2E8B]"></div>
                    <h4 class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest">Strategic_Assessment</h4>
                  </div>
                  <p class="text-[10px] font-mono text-gray-400 leading-relaxed uppercase tracking-widest">
                    High-level performance and valuation metrics.
                  </p>
                </div>
                
                <div class="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="bg-gray-50 border border-gray-100 p-6 relative overflow-hidden group">
                      <div class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1 group-hover:text-[#2F2E8B] transition-colors">Total_Deal_Value</div>
                      <div class="text-xl font-mono font-black text-[#2F2E8B] tracking-tighter">{{ formatCurrency(dealStats.totalValue) }}</div>
                    </div>
                    
                    <div class="bg-gray-50 border border-gray-100 p-6 relative overflow-hidden group">
                      <div class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1 group-hover:text-[#2F2E8B] transition-colors">Resource_Capacity</div>
                      <div class="text-xl font-mono font-black text-gray-900 uppercase tracking-tighter">{{ account?.employees || '0' }} EMPLOYEES</div>
                    </div>
                    
                    <div class="bg-[#2F2E8B] border border-[#2F2E8B] p-6 relative overflow-hidden group shadow-lg shadow-blue-100">
                      <div class="text-[8px] font-mono font-bold text-blue-300 uppercase tracking-widest mb-1">Operational_Stability</div>
                      <div class="text-xl font-mono font-black text-white uppercase tracking-widest">{{ account?.industry || 'N/A' }}</div>
                    </div>
                </div>
              </div>

              <!-- Profile Attributes -->
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-12 border-t border-dashed border-gray-100">
                <div class="lg:col-span-3">
                  <div class="flex items-center gap-2 mb-2">
                    <div class="w-1 h-4 bg-[#2F2E8B]"></div>
                    <h4 class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest">Entity_Attributes</h4>
                  </div>
                  <p class="text-[10px] font-mono text-gray-400 leading-relaxed uppercase tracking-widest">
                    Communication channels and regional positioning.
                  </p>
                </div>
                
                <div class="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  <div class="space-y-6">
                    <div class="group">
                      <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2 group-hover:text-[#2F2E8B] transition-colors">PRIMARY_DOMAIN</label>
                      <a v-if="account?.website" :href="account.website" target="_blank" class="text-[11px] font-mono font-black text-[#2F2E8B] uppercase border-b border-blue-50 hover:border-[#2F2E8B] transition-all flex items-center gap-2">
                        <Globe :size="12" /> {{ account.website }}
                      </a>
                      <span v-else class="text-[11px] font-mono font-black text-gray-300 uppercase tracking-widest">UNDEFINED</span>
                    </div>
                    
                    <div class="group">
                      <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2 group-hover:text-[#2F2E8B] transition-colors">COMM_CHANNEL_PHONE</label>
                      <a v-if="account?.phone" :href="'tel:' + account.phone" class="text-[11px] font-mono font-black text-gray-900 border-b border-gray-50 hover:border-emerald-500 transition-all flex items-center gap-2">
                        <Phone :size="12" class="text-emerald-500" /> {{ account.phone }}
                      </a>
                      <span v-else class="text-[11px] font-mono font-black text-gray-300 uppercase tracking-widest">NO_RECORD</span>
                    </div>
                  </div>

                  <div class="space-y-6">
                     <div class="group">
                      <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2 group-hover:text-[#2F2E8B] transition-colors">DISPATCH_POINT_MAIL</label>
                      <a v-if="account?.email" :href="'mailto:' + account.email" class="text-[11px] font-mono font-black text-gray-900 border-b border-gray-50 hover:border-blue-500 transition-all flex items-center gap-2">
                        <Mail :size="12" class="text-blue-400" /> {{ account.email }}
                      </a>
                       <span v-else class="text-[11px] font-mono font-black text-gray-300 uppercase tracking-widest">NO_RECORD</span>
                    </div>

                    <div class="group">
                      <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2 group-hover:text-[#2F2E8B] transition-colors">DIGITAL_PRESENCE</label>
                      <div class="flex flex-wrap gap-4 mt-2">
                        <a v-if="account?.linkedin" :href="account.linkedin" target="_blank" class="w-8 h-8 flex items-center justify-center bg-gray-50 border border-gray-100 text-gray-400 hover:text-blue-700 transition-all shadow-sm">
                          <Linkedin :size="14" />
                        </a>
                        <a v-if="account?.twitter" :href="account.twitter" target="_blank" class="w-8 h-8 flex items-center justify-center bg-gray-50 border border-gray-100 text-gray-400 hover:text-blue-400 transition-all shadow-sm">
                          <Twitter :size="14" />
                        </a>
                        <a v-if="account?.facebook" :href="account.facebook" target="_blank" class="w-8 h-8 flex items-center justify-center bg-gray-50 border border-gray-100 text-gray-400 hover:text-blue-600 transition-all shadow-sm">
                          <Facebook :size="14" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Geospatial Matrix (Addresses) -->
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-12 border-t border-dashed border-gray-100">
                 <div class="lg:col-span-3">
                  <div class="flex items-center gap-2 mb-2">
                    <div class="w-1 h-4 bg-[#2F2E8B]"></div>
                    <h4 class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest">Address_Matrix</h4>
                  </div>
                </div>
                <div class="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div v-if="hasBillingAddress" class="bg-gray-50 border border-gray-100 p-6 space-y-4">
                      <h5 class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest flex items-center gap-2">
                        <FileText :size="12" /> BILLING_DISPATCH_ENDPOINT
                      </h5>
                      <div class="text-[10px] font-mono font-black text-gray-600 space-y-1 uppercase tracking-tight">
                         <p v-if="account?.billingStreet">{{ account.billingStreet }}</p>
                         <p>{{ [account.billingCity, account.billingState, account.billingPostalCode].filter(Boolean).join(', ') }}</p>
                         <p v-if="account?.billingCountry" class="text-gray-400">{{ account.billingCountry }}</p>
                      </div>
                   </div>

                   <div v-if="hasShippingAddress" class="bg-gray-50 border border-gray-100 p-6 space-y-4">
                      <h5 class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest flex items-center gap-2">
                        <Truck :size="12" /> LOGISTICS_DELIVERY_NODE
                      </h5>
                      <div class="text-[10px] font-mono font-black text-gray-600 space-y-1 uppercase tracking-tight">
                         <p v-if="account?.shippingStreet">{{ account.shippingStreet }}</p>
                         <p>{{ [account.shippingCity, account.shippingState, account.shippingPostalCode].filter(Boolean).join(', ') }}</p>
                         <p v-if="account?.shippingCountry" class="text-gray-400">{{ account.shippingCountry }}</p>
                      </div>
                   </div>
                </div>
              </div>

              <!-- Narrative -->
              <div v-if="account?.description" class="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-12 border-t border-dashed border-gray-100">
                 <div class="lg:col-span-3">
                  <div class="flex items-center gap-2 mb-2">
                    <div class="w-1 h-4 bg-[#2F2E8B]"></div>
                    <h4 class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest">Qualitative_Summary</h4>
                  </div>
                </div>
                <div class="lg:col-span-9">
                   <div class="bg-gray-50/50 border border-gray-100 p-6 italic text-[11px] font-mono text-gray-600 whitespace-pre-wrap leading-relaxed uppercase tracking-tight">
                      {{ account.description }}
                   </div>
                </div>
              </div>

              <!-- CMA Tracker (Client Maintenance Cost) -->
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-12 border-t border-dashed border-gray-100">
                <div class="lg:col-span-3">
                  <div class="flex items-center gap-2 mb-2">
                    <div class="w-1 h-4 bg-[#2F2E8B]"></div>
                    <h4 class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest">CMA_Tracker</h4>
                  </div>
                  <p class="text-[10px] font-mono text-gray-400 leading-relaxed uppercase tracking-widest">Client Maintenance Cost for this account.</p>
                </div>
                <div class="lg:col-span-9">
                  <div class="bg-gray-50 border border-gray-100 p-6">
                    <!-- Current value + input row -->
                    <div class="flex items-end gap-4 mb-4">
                      <div class="text-left shrink-0">
                        <div class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Current CMA</div>
                        <div class="text-2xl font-mono font-black text-gray-900">{{ formatCurrency(localCac) }}</div>
                      </div>
                      <div class="flex-1">
                        <label class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1">New Value (ZMW)</label>
                        <input v-model.number="cacValue" type="number" min="0" step="0.01" placeholder="0.00" class="w-full border border-gray-200 bg-white px-4 py-3 text-xl font-mono font-black text-[#2F2E8B] focus:outline-none focus:border-[#2F2E8B] transition-colors tracking-tight" />
                      </div>
                      <button @click="saveCac" :disabled="savingCac || cacSaved || cacValue === null || cacValue === ''" class="px-6 py-3 text-[9px] font-mono font-black uppercase tracking-widest disabled:opacity-50 transition-all flex items-center gap-2 shadow-lg self-end" :class="cacSaved ? 'bg-emerald-600 text-white shadow-emerald-600/20' : 'bg-[#2F2E8B] text-white hover:bg-[#3D2F88] shadow-[#2F2E8B]/20'">
                        <Loader2 v-if="savingCac" :size="12" class="animate-spin" />
                        <CheckCircle2 v-else-if="cacSaved" :size="12" />
                        <Save v-else :size="12" />
                        {{ savingCac ? 'SAVING...' : cacSaved ? 'SAVED!' : 'UPDATE' }}
                      </button>
                    </div>
                    <!-- Quick-adjust preset buttons -->
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="text-[7px] font-mono font-bold text-gray-400 uppercase tracking-widest mr-1">Quick Adjust:</span>
                      <button @click="adjustCac(100)" class="px-3 py-1.5 text-[10px] font-mono font-black text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition rounded-sm uppercase tracking-wider">+100</button>
                      <button @click="adjustCac(500)" class="px-3 py-1.5 text-[10px] font-mono font-black text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition rounded-sm uppercase tracking-wider">+500</button>
                      <button @click="adjustCac(1000)" class="px-3 py-1.5 text-[10px] font-mono font-black text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition rounded-sm uppercase tracking-wider">+1,000</button>
                      <button @click="adjustCac(5000)" class="px-3 py-1.5 text-[10px] font-mono font-black text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition rounded-sm uppercase tracking-wider">+5,000</button>
                      <span class="w-px h-5 bg-gray-200 mx-1"></span>
                      <button @click="adjustCac(-100)" class="px-3 py-1.5 text-[10px] font-mono font-black text-red-700 bg-red-50 border border-red-200 hover:bg-red-100 transition rounded-sm uppercase tracking-wider">-100</button>
                      <button @click="adjustCac(-500)" class="px-3 py-1.5 text-[10px] font-mono font-black text-red-700 bg-red-50 border border-red-200 hover:bg-red-100 transition rounded-sm uppercase tracking-wider">-500</button>
                      <button @click="adjustCac(-1000)" class="px-3 py-1.5 text-[10px] font-mono font-black text-red-700 bg-red-50 border border-red-200 hover:bg-red-100 transition rounded-sm uppercase tracking-wider">-1,000</button>
                      <button @click="adjustCac(-5000)" class="px-3 py-1.5 text-[10px] font-mono font-black text-red-700 bg-red-50 border border-red-200 hover:bg-red-100 transition rounded-sm uppercase tracking-wider">-5,000</button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- System Metadata -->
              <div class="bg-gray-50/80 border border-gray-200 p-6 pt-8 mt-12 relative overflow-hidden">
                 <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-[0.02]"></div>
                 <h5 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Registry_Execution_Metadata</h5>
                 <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                   <div>
                     <span class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1">Entity_Initialize</span>
                     <span class="text-[9px] font-mono font-black text-gray-900 uppercase">{{ formatDate(account?.createdAt) }}</span>
                   </div>
                   <div>
                     <span class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1">Last_Update</span>
                     <span class="text-[9px] font-mono font-black text-gray-900 uppercase">{{ formatDate(account?.updatedAt) }}</span>
                   </div>
                   <div>
                     <span class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1">Registry_Owner</span>
                     <span class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase">{{ account?.owner || 'UNASSIGNED' }}</span>
                   </div>
                   <div>
                     <span class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1">Object_ID</span>
                     <span class="text-[9px] font-mono text-gray-400 font-bold truncate block">{{ account?.id }}</span>
                   </div>
                 </div>
              </div>
            </div>

            <!-- CONTACTS TAB -->
            <div v-if="activeTab === 'contacts'" class="space-y-6">
              <!-- Search + Add Bar -->
              <div class="flex items-center gap-2">
                <div class="relative flex-1">
                  <Search :size="12" class="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input v-model="contactSearchQuery" @input="debouncedContactSearch" type="text" placeholder="SEARCH CONTACTS OR LINK LEADS..." class="w-full border border-gray-200 pl-7 pr-3 py-2 text-[9px] font-mono font-bold uppercase tracking-widest focus:ring-1 focus:ring-[#2F2E8B]/30 focus:border-[#2F2E8B] outline-none transition-all" />
                </div>
                <button @click="showLinkLeadModal = true" class="px-3 py-2 bg-[#2F2E8B] text-white text-[8px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] transition flex items-center gap-1.5 rounded-sm">
                  <Plus :size="10" /> LINK LEAD
                </button>
              </div>

              <!-- Link Lead Modal -->
              <Teleport to="body">
                <div v-if="showLinkLeadModal" class="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 backdrop-blur-sm" @click.self="showLinkLeadModal = false">
                  <div class="bg-white w-full max-w-lg mx-4 border border-gray-200 shadow-2xl overflow-hidden max-h-[80vh] flex flex-col">
                    <div class="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                      <h3 class="text-[10px] font-mono font-black text-gray-900 uppercase tracking-widest">Link Lead as Contact</h3>
                      <button @click="showLinkLeadModal = false" class="text-gray-400 hover:text-gray-700"><X :size="16" /></button>
                    </div>
                    <div class="p-4 space-y-3 overflow-y-auto flex-1">
                      <div class="relative">
                        <Search :size="12" class="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        <input v-model="leadSearchQuery" @input="searchLeadsToLink" type="text" placeholder="Search leads by name, email, phone..." class="w-full border border-gray-200 pl-7 pr-3 py-2 text-[9px] font-mono font-bold uppercase focus:ring-1 focus:ring-[#2F2E8B]/30 focus:border-[#2F2E8B] outline-none" />
                      </div>
                      <div v-if="searchingLeads" class="flex justify-center py-8"><Loader2 class="animate-spin text-[#2F2E8B]" :size="20" /></div>
                      <div v-else-if="leadSearchResults.length > 0" class="space-y-1 max-h-60 overflow-y-auto">
                        <div v-for="lead in leadSearchResults" :key="lead.id" class="flex items-center justify-between gap-2 p-2.5 border border-gray-100 hover:border-[#2F2E8B]/30 hover:bg-[#2F2E8B]/5 transition cursor-pointer" @click="linkLeadAsContact(lead)">
                          <div class="flex items-center gap-3 min-w-0">
                            <div class="w-8 h-8 bg-[#2F2E8B]/10 border border-[#2F2E8B]/20 flex items-center justify-center text-[#2F2E8B] font-black text-[8px] font-mono">{{ getInitials(lead.name) }}</div>
                            <div class="min-w-0">
                              <p class="text-[9px] font-mono font-black text-gray-900 uppercase truncate">{{ lead.name }}</p>
                              <p class="text-[7px] font-mono text-gray-500 truncate">{{ lead.email || lead.phone || '—' }}</p>
                            </div>
                          </div>
                          <button class="px-2 py-1 bg-[#2F2E8B] text-white text-[7px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] transition rounded-sm whitespace-nowrap">LINK</button>
                        </div>
                      </div>
                      <div v-else-if="leadSearchQuery && !searchingLeads" class="text-center py-8 text-[9px] font-mono text-gray-400">No leads found matching your search.</div>
                      <div v-else class="text-center py-8 text-[9px] font-mono text-gray-400">Type a name, email, or phone to search leads.</div>
                    </div>
                    <div class="px-4 py-3 border-t border-gray-100 flex justify-end">
                      <button @click="showLinkLeadModal = false" class="px-4 py-2 border border-gray-200 text-gray-500 text-[8px] font-mono font-black uppercase tracking-widest hover:text-gray-700 transition">CLOSE</button>
                    </div>
                  </div>
                </div>
              </Teleport>

              <div v-if="loadingContacts" class="flex flex-col items-center justify-center py-24">
                <Loader2 class="animate-spin text-[#2F2E8B]" :size="32" />
                <span class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.2em] mt-4">Retrieving_Associated_Personnel...</span>
              </div>
              
              <template v-else-if="filteredContacts.length > 0">
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div v-for="contact in filteredContacts" :key="contact.id" class="bg-white border border-gray-100 p-6 flex items-center justify-between group hover:border-[#2F2E8B] transition-all hover:bg-gray-50/50">
                       <div class="flex items-center gap-4">
                          <div class="w-12 h-12 bg-[#2F2E8B] text-white flex items-center justify-center font-mono font-black text-lg group-hover:scale-110 transition-transform">
                             {{ getInitials(contact.firstName + ' ' + contact.lastName) }}
                          </div>
                          <div>
                             <h4 class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest">{{ contact.firstName }} {{ contact.lastName }}</h4>
                             <p class="text-[9px] font-mono text-gray-500 uppercase tracking-widest mt-0.5">{{ contact.title || 'MEMBER' }}</p>
                          </div>
                       </div>
                       <div class="flex gap-2">
                          <a v-if="contact.email" :href="'mailto:' + contact.email" class="w-8 h-8 flex items-center justify-center border border-gray-100 text-gray-300 hover:text-[#2F2E8B] hover:border-[#2F2E8B] transition-all">
                             <Mail :size="14" />
                          </a>
                          <button v-if="contact.phone" @click="openCallDialog(contact.phone, contact.firstName + ' ' + contact.lastName)" class="w-8 h-8 flex items-center justify-center border border-gray-100 text-gray-300 hover:text-emerald-500 hover:border-emerald-500 transition-all">
                             <Phone :size="14" />
                          </button>
                          <button v-if="contact.phone" @click="openWhatsAppDialog(contact.phone, contact.firstName + ' ' + contact.lastName)" class="w-8 h-8 flex items-center justify-center border border-gray-100 text-gray-300 hover:text-green-500 hover:border-green-500 transition-all">
                             <MessageSquare :size="14" />
                          </button>
                          <button @click="unlinkContact(contact)" class="w-8 h-8 flex items-center justify-center border border-gray-100 text-gray-300 hover:text-red-500 hover:border-red-500 transition-all" title="Unlink contact">
                             <Trash2 :size="12" />
                          </button>
                       </div>
                    </div>
                 </div>
              </template>
              
              <div v-else class="flex flex-col items-center justify-center py-24 bg-gray-50/50 border border-dashed border-gray-200">
                 <Users :size="32" class="text-gray-200 mb-4" />
                 <h5 class="text-[11px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]">ZERO_PERSONNEL_MAPPED</h5>
                 <p class="text-[9px] font-mono text-gray-300 uppercase tracking-widest mt-2 max-w-xs text-center leading-relaxed">Account registry contains no linked contact entities.</p>
              </div>
            </div>

            <!-- DEALS TAB -->
            <div v-if="activeTab === 'deals'" class="space-y-6">
              <!-- Deal Stats -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-[#2F2E8B] p-5 relative overflow-hidden">
                  <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-[0.05]"></div>
                  <div class="text-[8px] font-mono font-bold text-blue-300 uppercase tracking-widest mb-1 relative z-10">Total_Deals</div>
                  <div class="text-2xl font-mono font-black text-white relative z-10">{{ dealStats.total }}</div>
                </div>
                <div class="bg-gray-50 border border-gray-100 p-5">
                  <div class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Pipeline_Value</div>
                  <div class="text-xl font-mono font-black text-[#2F2E8B]">{{ formatCurrency(dealStats.totalValue) }}</div>
                </div>
                <div class="bg-gray-50 border border-gray-100 p-5">
                  <div class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Won_Value</div>
                  <div class="text-xl font-mono font-black text-emerald-600">{{ formatCurrency(dealStats.wonValue) }}</div>
                </div>
                <div class="bg-gray-50 border border-gray-100 p-5">
                  <div class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Win_Rate</div>
                  <div class="text-xl font-mono font-black text-gray-900">{{ dealStats.winRate }}%</div>
                </div>
              </div>

              <!-- Header + Add Button -->
              <div class="flex items-center justify-between">
                <div class="flex gap-1 flex-wrap">
                  <button @click="dealStageFilter = 'all'" :class="dealStageFilter === 'all' ? 'bg-[#2F2E8B] text-white border-[#2F2E8B]' : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300'" class="px-3 py-1.5 border text-[9px] font-mono font-black uppercase tracking-widest transition-all">ALL</button>
                  <button v-for="stage in stagesWithDeals" :key="stage" @click="dealStageFilter = stage" :class="dealStageFilter === stage ? 'bg-[#2F2E8B] text-white border-[#2F2E8B]' : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300'" class="px-3 py-1.5 border text-[9px] font-mono font-black uppercase tracking-widest transition-all">{{ stage.replace(' ', '_').toUpperCase() }}</button>
                  <button @click="dealStageFilter = 'archived'" :class="dealStageFilter === 'archived' ? 'bg-gray-700 text-white border-gray-700' : 'bg-white text-gray-300 border-gray-100 hover:border-gray-300'" class="px-3 py-1.5 border text-[9px] font-mono font-black uppercase tracking-widest transition-all">ARCHIVED</button>
                </div>
                <button @click="showDealForm = !showDealForm" :class="showDealForm ? 'bg-gray-100 text-gray-600' : 'bg-[#2F2E8B] text-white'" class="px-4 py-2 text-[9px] font-mono font-black uppercase tracking-widest transition-all flex items-center gap-2">
                  <Plus :size="12" /> {{ showDealForm ? 'CANCEL' : 'ADD_DEAL' }}
                </button>
              </div>

              <!-- Add Deal Form -->
              <div v-if="showDealForm" class="border border-dashed border-[#2F2E8B] bg-blue-50/30 p-6 space-y-4">
                <div class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-[0.2em] flex items-center gap-2">
                  <div class="w-1 h-4 bg-[#2F2E8B]"></div> NEW_DEAL_RECORD
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1">Deal_Name *</label>
                    <input v-model="newDeal.name" type="text" placeholder="OPPORTUNITY_TITLE" class="w-full border border-gray-200 bg-white px-3 py-2 text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest focus:outline-none focus:border-[#2F2E8B] transition-colors" />
                  </div>
                  <div>
                    <label class="text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1">Deal_Value (ZMW)</label>
                    <input v-model.number="newDeal.value" type="number" min="0" placeholder="0" class="w-full border border-gray-200 bg-white px-3 py-2 text-[11px] font-mono font-black text-gray-900 focus:outline-none focus:border-[#2F2E8B] transition-colors" />
                  </div>
                  <div>
                    <label class="text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1">Pipeline_Stage</label>
                    <select v-model="newDeal.stage" class="w-full border border-gray-200 bg-white px-3 py-2 text-[11px] font-mono font-black text-gray-900 uppercase focus:outline-none focus:border-[#2F2E8B] transition-colors">
                      <option v-for="s in PIPELINE_STAGES" :key="s" :value="s">{{ s }}</option>
                    </select>
                  </div>
                  <div>
                    <label class="text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1">Probability (%)</label>
                    <input v-model.number="newDeal.probability" type="number" min="0" max="100" placeholder="10" class="w-full border border-gray-200 bg-white px-3 py-2 text-[11px] font-mono font-black text-gray-900 focus:outline-none focus:border-[#2F2E8B] transition-colors" />
                  </div>
                  <div>
                    <label class="text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1">Expected_Close_Date</label>
                    <input v-model="newDeal.expectedCloseDate" type="date" class="w-full border border-gray-200 bg-white px-3 py-2 text-[11px] font-mono font-black text-gray-900 focus:outline-none focus:border-[#2F2E8B] transition-colors" />
                  </div>
                  <div>
                    <label class="text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1">Assigned_Rep(s)</label>
                    <div v-if="!canAssignCrm" class="px-3 py-2 bg-gray-50 border border-dashed border-gray-200 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                      Assignment locked to your scope
                    </div>
                    <div v-else class="relative">
                      <!-- Trigger / Tag display -->
                      <div
                        @click="showAssigneeDropdown = !showAssigneeDropdown"
                        class="w-full min-h-[38px] border border-gray-200 bg-white px-2 py-1.5 cursor-pointer flex flex-wrap gap-1 items-center hover:border-[#2F2E8B] transition-colors"
                        :class="showAssigneeDropdown ? 'border-[#2F2E8B]' : ''"
                      >
                        <template v-if="newDeal.assignedTo.length > 0">
                          <span
                            v-for="email in newDeal.assignedTo" :key="email"
                            class="inline-flex items-center gap-1 bg-blue-50 border border-blue-200 text-[#2F2E8B] px-1.5 py-0.5 text-[9px] font-mono font-black uppercase tracking-wide"
                          >
                            {{ email.split('@')[0].toUpperCase() }}
                            <button type="button" @click.stop="toggleAssignee(email)" class="hover:text-red-500 transition-colors">
                              <X :size="8" />
                            </button>
                          </span>
                        </template>
                        <span v-else class="text-[10px] font-mono text-gray-400 uppercase tracking-widest px-1">— SELECT_REPS —</span>
                        <ChevronDown :size="10" class="ml-auto text-gray-400 flex-shrink-0 transition-transform" :class="showAssigneeDropdown ? 'rotate-180' : ''" />
                      </div>
                      <!-- Dropdown -->
                      <div
                        v-if="showAssigneeDropdown"
                        class="absolute z-50 w-full bg-white border border-[#2F2E8B]/30 shadow-xl mt-0.5 max-h-48 overflow-y-auto"
                      >
                        <div class="p-2 border-b border-gray-100 sticky top-0 bg-white">
                          <input
                            v-model="assigneeSearch"
                            type="text"
                            placeholder="SEARCH_REPS..."
                            class="w-full border border-gray-200 px-2 py-1 text-[10px] font-mono font-black uppercase tracking-widest focus:outline-none focus:border-[#2F2E8B] transition-colors"
                            @click.stop
                          />
                        </div>
                        <div v-if="filteredAssigneeUsers.length === 0" class="px-3 py-4 text-[9px] font-mono text-gray-400 text-center uppercase tracking-widest">
                          NO_USERS_FOUND
                        </div>
                        <button
                          v-for="u in filteredAssigneeUsers" :key="u.email"
                          type="button"
                          @click.stop="toggleAssignee(u.email)"
                          class="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 last:border-0"
                        >
                          <div
                            class="w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-colors"
                            :class="newDeal.assignedTo.includes(u.email) ? 'bg-[#2F2E8B] border-[#2F2E8B]' : 'border-gray-300'"
                          >
                            <Check v-if="newDeal.assignedTo.includes(u.email)" :size="10" class="text-white" />
                          </div>
                          <div class="flex-1 min-w-0">
                            <div class="text-[10px] font-mono font-black uppercase tracking-tight truncate" :class="newDeal.assignedTo.includes(u.email) ? 'text-[#2F2E8B]' : 'text-gray-700'">
                              {{ u.email.split('@')[0] }}
                            </div>
                            <div class="text-[8px] font-mono text-gray-400 uppercase tracking-widest">{{ u.role || 'MEMBER' }}</div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label class="text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1">CMA (ZMW)</label>
                    <input v-model.number="newDeal.cac" type="number" min="0" placeholder="0" class="w-full border border-gray-200 bg-white px-3 py-2 text-[11px] font-mono font-black text-gray-900 focus:outline-none focus:border-[#2F2E8B] transition-colors" />
                  </div>
                  <div>
                    <label class="text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1">Next_Step</label>
                    <input v-model="newDeal.nextStep" type="text" placeholder="FOLLOW_UP_ACTION" class="w-full border border-gray-200 bg-white px-3 py-2 text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest focus:outline-none focus:border-[#2F2E8B] transition-colors" />
                  </div>
                  <div class="md:col-span-2">
                    <label class="text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1">Description</label>
                    <textarea v-model="newDeal.description" rows="3" placeholder="DEAL_CONTEXT_NOTES..." class="w-full border border-gray-200 bg-white px-3 py-2 text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest focus:outline-none focus:border-[#2F2E8B] transition-colors resize-none"></textarea>
                  </div>
                </div>
                <div class="flex justify-end gap-3 pt-2 border-t border-dashed border-blue-100">
                  <button @click="showDealForm = false" class="px-4 py-2 border border-gray-200 text-gray-400 text-[9px] font-mono font-black uppercase tracking-widest hover:text-gray-700 transition-all flex items-center gap-2">
                    <XCircle :size="12" /> CANCEL
                  </button>
                  <button @click="saveDeal" :disabled="savingDeal || !newDeal.name?.trim()" class="px-6 py-2 bg-[#2F2E8B] text-white text-[9px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg shadow-[#2F2E8B]/20">
                    <Loader2 v-if="savingDeal" :size="12" class="animate-spin" />
                    <Save v-else :size="12" />
                    {{ savingDeal ? 'SAVING...' : 'COMMIT_DEAL' }}
                  </button>
                </div>
              </div>

              <!-- Loading -->
              <div v-if="loadingDeals" class="flex flex-col items-center justify-center py-24">
                <Loader2 class="animate-spin text-[#2F2E8B]" :size="32" />
                <span class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.2em] mt-4">Loading_Pipeline_Data...</span>
              </div>

              <!-- Deal Cards -->
              <template v-else-if="filteredDeals.length > 0">
                <div class="space-y-3">
                  <div v-for="deal in pagedDeals" :key="deal.id" class="bg-white border border-gray-100 p-5 hover:border-[#2F2E8B]/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all group relative overflow-hidden">
                    <div :class="stageBarClass(deal.stage)" class="absolute left-0 top-0 bottom-0 w-1"></div>
                    <div class="pl-3">
                      <div class="flex items-start justify-between gap-4 mb-3">
                        <div class="flex-1 min-w-0">
                          <div class="flex items-center gap-2 mb-1 flex-wrap">
                            <span class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-tight truncate">{{ deal.name }}</span>
                            <span :class="stageBadgeClass(deal.stage)" class="px-2 py-0.5 border text-[8px] font-mono font-black uppercase tracking-widest shrink-0">{{ deal.stage }}</span>
                            <span v-if="deal.archived" class="px-2 py-0.5 bg-gray-100 text-gray-500 border border-gray-200 text-[8px] font-mono font-black uppercase tracking-widest">ARCHIVED</span>
                          </div>
                          <div class="flex items-center gap-4 text-[9px] font-mono text-gray-400 uppercase tracking-widest flex-wrap">
                            <template v-if="dealAssigneesDisplay(deal.assignedTo).length > 0">
                              <span v-for="rep in dealAssigneesDisplay(deal.assignedTo)" :key="rep" class="flex items-center gap-1 bg-blue-50 border border-blue-100 text-[#2F2E8B] px-1.5 py-0.5">
                                <Tag :size="9" /> {{ rep.split('@')[0].toUpperCase() }}
                              </span>
                            </template>
                            <span v-if="deal.expectedCloseDate" class="flex items-center gap-1"><Clock :size="10" /> {{ formatDate(deal.expectedCloseDate) }}</span>
                            <span v-if="deal.probability" class="flex items-center gap-1"><Target :size="10" /> {{ deal.probability }}%</span>
                            <span v-if="deal.cac" class="flex items-center gap-1"><DollarSign :size="10" /> CAC: {{ formatCurrency(deal.cac) }}</span>
                          </div>
                          <p v-if="deal.nextStep" class="text-[9px] font-mono text-[#2F2E8B] mt-2 flex items-center gap-1 uppercase tracking-wide">
                            <ChevronRight :size="11" /> {{ deal.nextStep }}
                          </p>
                        </div>
                        <div class="text-right shrink-0">
                          <div class="text-lg font-mono font-black text-[#2F2E8B] tracking-tight">{{ formatCurrency(deal.value) }}</div>
                        </div>
                      </div>
                      <div v-if="!deal.archived" class="flex items-center gap-2 flex-wrap pt-3 border-t border-dashed border-gray-100">
                        <span class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mr-1">ADVANCE_STAGE:</span>
                        <button v-for="stage in PIPELINE_STAGES.filter(s => s !== deal.stage)" :key="stage" @click="updateDealStage(deal, stage)" :class="stageBadgeClass(stage)" class="px-2 py-0.5 border text-[8px] font-mono font-black uppercase tracking-widest hover:opacity-80 transition-all">
                          {{ stage.replace(' ', '_') }}
                        </button>
                        <div class="flex-1"></div>
                        <button @click="startEditDeal(deal)" class="px-3 py-1 border border-[#2F2E8B]/30 text-[#2F2E8B] hover:bg-[#2F2E8B] hover:text-white text-[8px] font-mono font-black uppercase tracking-widest transition-all flex items-center gap-1">
                          <Edit :size="10" /> EDIT
                        </button>
                        <button @click="archiveDeal(deal)" class="px-3 py-1 border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 text-[8px] font-mono font-black uppercase tracking-widest transition-all flex items-center gap-1">
                          <Archive :size="10" /> ARCHIVE
                        </button>
                      </div>
                    </div>
                    <!-- Inline Edit Deal Form -->
                    <div v-if="editingDeal === deal.id" class="mt-3 p-3 border border-dashed border-[#2F2E8B]/30 bg-gray-50/50 space-y-2">
                      <div class="grid grid-cols-2 gap-2">
                        <div>
                          <label class="text-[8px] font-mono font-bold text-gray-400 uppercase block mb-0.5">Name</label>
                          <input v-model="editingDealData.name" type="text" class="w-full border border-gray-200 px-2 py-1.5 text-[10px] font-mono focus:outline-none focus:border-[#2F2E8B]" />
                        </div>
                        <div>
                          <label class="text-[8px] font-mono font-bold text-gray-400 uppercase block mb-0.5">Value</label>
                          <input v-model.number="editingDealData.value" type="number" class="w-full border border-gray-200 px-2 py-1.5 text-[10px] font-mono focus:outline-none focus:border-[#2F2E8B]" />
                        </div>
                        <div>
                          <label class="text-[8px] font-mono font-bold text-gray-400 uppercase block mb-0.5">Stage</label>
                          <select v-model="editingDealData.stage" class="w-full border border-gray-200 px-2 py-1.5 text-[10px] font-mono focus:outline-none focus:border-[#2F2E8B]">
                            <option v-for="s in PIPELINE_STAGES" :key="s" :value="s">{{ s }}</option>
                          </select>
                        </div>
                        <div>
                          <label class="text-[8px] font-mono font-bold text-gray-400 uppercase block mb-0.5">Probability</label>
                          <input v-model.number="editingDealData.probability" type="number" min="0" max="100" class="w-full border border-gray-200 px-2 py-1.5 text-[10px] font-mono focus:outline-none focus:border-[#2F2E8B]" />
                        </div>
                        <div>
                          <label class="text-[8px] font-mono font-bold text-gray-400 uppercase block mb-0.5">Close Date</label>
                          <input v-model="editingDealData.expectedCloseDate" type="date" class="w-full border border-gray-200 px-2 py-1.5 text-[10px] font-mono focus:outline-none focus:border-[#2F2E8B]" />
                        </div>
                        <div>
                          <label class="text-[8px] font-mono font-bold text-gray-400 uppercase block mb-0.5">Next Step</label>
                          <input v-model="editingDealData.nextStep" type="text" class="w-full border border-gray-200 px-2 py-1.5 text-[10px] font-mono focus:outline-none focus:border-[#2F2E8B]" />
                        </div>
                      </div>
                      <div>
                        <label class="text-[8px] font-mono font-bold text-gray-400 uppercase block mb-0.5">Description</label>
                        <textarea v-model="editingDealData.description" rows="2" class="w-full border border-gray-200 px-2 py-1.5 text-[10px] font-mono focus:outline-none focus:border-[#2F2E8B] resize-none"></textarea>
                      </div>
                      <div class="flex items-center gap-2">
                        <button @click="saveEditDeal(deal)" class="px-3 py-1.5 bg-[#2F2E8B] text-white text-[8px] font-mono font-bold uppercase tracking-widest hover:bg-[#1D226B] transition">Save</button>
                        <button @click="cancelEditDeal" class="px-3 py-1.5 border border-gray-200 text-gray-500 text-[8px] font-mono font-bold uppercase tracking-widest hover:text-red-500 transition">Cancel</button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Pagination -->
                <div v-if="dealTotalPages > 1" class="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                    Page_{{ dealPage }}_of_{{ dealTotalPages }} &nbsp;&bull;&nbsp; {{ filteredDeals.length }}_Records
                  </span>
                  <div class="flex items-center gap-1">
                    <button
                      @click="dealPage = 1"
                      :disabled="dealPage === 1"
                      class="px-2 py-1.5 border border-gray-200 text-gray-400 hover:border-[#2F2E8B] hover:text-[#2F2E8B] disabled:opacity-30 disabled:cursor-not-allowed transition-all text-[9px] font-mono font-black"
                    >&laquo;</button>
                    <button
                      @click="dealPage--"
                      :disabled="dealPage === 1"
                      class="px-3 py-1.5 border border-gray-200 text-gray-400 hover:border-[#2F2E8B] hover:text-[#2F2E8B] disabled:opacity-30 disabled:cursor-not-allowed transition-all text-[9px] font-mono font-black uppercase tracking-widest flex items-center gap-1"
                    ><ChevronLeft :size="10" /> Prev</button>
                    <button
                      v-for="p in dealTotalPages" :key="p"
                      @click="dealPage = p"
                      class="w-7 h-7 border text-[9px] font-mono font-black transition-all"
                      :class="p === dealPage ? 'bg-[#2F2E8B] border-[#2F2E8B] text-white' : 'border-gray-200 text-gray-400 hover:border-[#2F2E8B] hover:text-[#2F2E8B]'"
                    >{{ p }}</button>
                    <button
                      @click="dealPage++"
                      :disabled="dealPage === dealTotalPages"
                      class="px-3 py-1.5 border border-gray-200 text-gray-400 hover:border-[#2F2E8B] hover:text-[#2F2E8B] disabled:opacity-30 disabled:cursor-not-allowed transition-all text-[9px] font-mono font-black uppercase tracking-widest flex items-center gap-1"
                    >Next <ChevronRight :size="10" /></button>
                    <button
                      @click="dealPage = dealTotalPages"
                      :disabled="dealPage === dealTotalPages"
                      class="px-2 py-1.5 border border-gray-200 text-gray-400 hover:border-[#2F2E8B] hover:text-[#2F2E8B] disabled:opacity-30 disabled:cursor-not-allowed transition-all text-[9px] font-mono font-black"
                    >&raquo;</button>
                  </div>
                </div>
              </template>

              <div v-else class="flex flex-col items-center justify-center py-24 bg-gray-50/50 border border-dashed border-gray-200">
                <Briefcase :size="32" class="text-gray-200 mb-4" />
                <h5 class="text-[11px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]">ZERO_DEALS_IN_PIPELINE</h5>
                <p class="text-[9px] font-mono text-gray-300 uppercase tracking-widest mt-2 max-w-xs text-center leading-relaxed">No active deal records linked to this account.</p>
                <button @click="showDealForm = true" class="mt-6 px-6 py-2.5 bg-[#2F2E8B] text-white text-[9px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] transition-all flex items-center gap-2">
                  <Plus :size="12" /> INIT_FIRST_DEAL
                </button>
              </div>
            </div>

            <!-- NOTES TAB -->
            <div v-if="activeTab === 'notes'" class="space-y-6">
              <!-- Add Note -->
              <div class="bg-blue-50/30 border border-dashed border-[#2F2E8B]/30 p-6 space-y-4">
                <div class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-[0.2em] flex items-center gap-2">
                  <div class="w-1 h-4 bg-[#2F2E8B]"></div> APPEND_ACCOUNT_NOTE
                </div>
                <textarea v-model="newNoteText" rows="4" placeholder="ENTER_NOTE_TEXT..." class="w-full border border-gray-200 bg-white px-4 py-3 text-[11px] font-mono font-black text-gray-900 tracking-tight focus:outline-none focus:border-[#2F2E8B] transition-colors resize-none"></textarea>
                <div class="flex justify-end">
                  <button @click="addNote" :disabled="savingNote || !newNoteText.trim()" class="px-6 py-2.5 bg-[#2F2E8B] text-white text-[9px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg shadow-[#2F2E8B]/20">
                    <Loader2 v-if="savingNote" :size="12" class="animate-spin" />
                    <Save v-else :size="12" />
                    {{ savingNote ? 'WRITING...' : 'COMMIT_NOTE' }}
                  </button>
                </div>
              </div>

              <!-- Notes list -->
              <div v-if="accountNotes.length > 0" class="space-y-3">
                <div v-for="note in [...accountNotes].reverse()" :key="note.id" class="bg-white border border-gray-100 p-5 group hover:border-[#2F2E8B]/30 transition-all relative">
                  <div class="flex items-start justify-between gap-4">
                    <div class="flex-1 min-w-0">
                      <div class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Clock :size="10" /> {{ formatDate(note.createdAt) }}
                        <span v-if="note.updatedAt" class="text-amber-500">// EDITED {{ formatDate(note.updatedAt) }}</span>
                      </div>
                      <template v-if="editingNoteId === note.id">
                        <textarea v-model="editingNoteText" rows="4" class="w-full border border-[#2F2E8B] bg-white px-3 py-2 text-[11px] font-mono font-black text-gray-900 tracking-tight focus:outline-none resize-none"></textarea>
                        <div class="flex justify-end gap-2 mt-2">
                          <button @click="cancelEditNote" class="px-3 py-1.5 border border-gray-200 text-gray-500 text-[9px] font-mono font-black uppercase tracking-widest hover:text-gray-800 transition-all flex items-center gap-1.5">
                            <XCircle :size="10" /> CANCEL
                          </button>
                          <button @click="saveEditNote(note.id)" :disabled="!editingNoteText.trim()" class="px-3 py-1.5 bg-[#2F2E8B] text-white text-[9px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] disabled:opacity-50 transition-all flex items-center gap-1.5">
                            <Save :size="10" /> SAVE
                          </button>
                        </div>
                      </template>
                      <p v-else class="text-[11px] font-mono text-gray-700 leading-relaxed whitespace-pre-wrap">{{ note.text }}</p>
                    </div>
                    <div v-if="editingNoteId !== note.id" class="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button @click="startEditNote(note)" class="w-7 h-7 flex items-center justify-center border border-gray-100 text-gray-400 hover:text-[#2F2E8B] hover:border-[#2F2E8B] transition-all" title="Edit note">
                        <Edit :size="12" />
                      </button>
                      <button @click="deleteNote(note.id)" class="w-7 h-7 flex items-center justify-center border border-gray-100 text-gray-400 hover:text-red-500 hover:border-red-200 transition-all" title="Delete note">
                        <Trash2 :size="12" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else class="flex flex-col items-center justify-center py-24 bg-gray-50/50 border border-dashed border-gray-200">
                <StickyNote :size="32" class="text-gray-200 mb-4" />
                <h5 class="text-[11px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]">NO_NOTES_RECORDED</h5>
                <p class="text-[9px] font-mono text-gray-300 uppercase tracking-widest mt-2 max-w-xs text-center leading-relaxed">Add contextual notes to this account above.</p>
              </div>
            </div>
            <!-- MEETINGS TAB (with create form) -->
            <div v-if="activeTab === 'meetings'" class="space-y-6">
              <div class="flex items-center justify-between">
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-[0.2em]">{{ meetings.length }} MEETING_RECORD(S)</div>
                <button @click="showMeetingForm = !showMeetingForm" :class="showMeetingForm ? 'bg-gray-100 text-gray-600' : 'bg-[#2F2E8B] text-white'" class="px-4 py-2 text-[9px] font-mono font-black uppercase tracking-widest transition-all flex items-center gap-2">
                  <Plus :size="12" /> {{ showMeetingForm ? 'CANCEL' : 'SCHEDULE_MEETING' }}
                </button>
              </div>

              <!-- Meeting Form -->
              <div v-if="showMeetingForm" class="border border-dashed border-[#2F2E8B] bg-blue-50/30 p-6 space-y-4">
                <div class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-[0.2em] flex items-center gap-2">
                  <div class="w-1 h-4 bg-[#2F2E8B]"></div> {{ editingMeetingId ? 'EDIT_MEETING_RECORD' : 'NEW_MEETING_RECORD' }}
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="md:col-span-2">
                    <label class="text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1">Meeting Title *</label>
                    <input v-model="newMeeting.title" type="text" placeholder="MEETING_SUBJECT" class="w-full border border-gray-200 bg-white px-3 py-2 text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest focus:outline-none focus:border-[#2F2E8B] transition-colors" />
                  </div>
                  <div>
                    <label class="text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1">Meeting Type</label>
                    <select v-model="newMeeting.meeting_type" class="w-full border border-gray-200 bg-white px-3 py-2 text-[11px] font-mono font-black text-gray-900 uppercase focus:outline-none focus:border-[#2F2E8B] transition-colors">
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
                    <input v-model="newMeeting.location" type="text" placeholder="OFFICE / ZOOM_LINK" class="w-full border border-gray-200 bg-white px-3 py-2 text-[11px] font-mono font-black text-gray-900 tracking-widest focus:outline-none focus:border-[#2F2E8B] transition-colors" />
                  </div>
                  <div>
                    <label class="text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1">Start Date/Time *</label>
                    <input v-model="newMeeting.start_datetime" type="datetime-local" class="w-full border border-gray-200 bg-white px-3 py-2 text-[11px] font-mono font-black text-gray-900 focus:outline-none focus:border-[#2F2E8B] transition-colors" />
                  </div>
                  <div>
                    <label class="text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1">End Date/Time *</label>
                    <input v-model="newMeeting.end_datetime" type="datetime-local" class="w-full border border-gray-200 bg-white px-3 py-2 text-[11px] font-mono font-black text-gray-900 focus:outline-none focus:border-[#2F2E8B] transition-colors" />
                  </div>
                  <div class="md:col-span-2">
                    <label class="text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1">Agenda / Description</label>
                    <textarea v-model="newMeeting.agenda" rows="3" placeholder="MEETING_AGENDA_POINTS..." class="w-full border border-gray-200 bg-white px-3 py-2 text-[11px] font-mono font-black text-gray-900 tracking-tight focus:outline-none focus:border-[#2F2E8B] transition-colors resize-none"></textarea>
                  </div>
                </div>
                <div class="flex justify-end gap-3 pt-2 border-t border-dashed border-blue-100">
                  <button @click="showMeetingForm = false" class="px-4 py-2 border border-gray-200 text-gray-400 text-[9px] font-mono font-black uppercase tracking-widest hover:text-gray-700 transition-all flex items-center gap-2">
                    <XCircle :size="12" /> CANCEL
                  </button>
                  <button @click="saveMeeting" :disabled="savingMeeting || !newMeeting.title?.trim() || !newMeeting.start_datetime || !newMeeting.end_datetime" class="px-6 py-2 bg-[#2F2E8B] text-white text-[9px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg shadow-[#2F2E8B]/20">
                    <Loader2 v-if="savingMeeting" :size="12" class="animate-spin" />
                    <Save v-else :size="12" />
                    {{ savingMeeting ? 'SCHEDULING...' : (editingMeetingId ? 'SAVE_CHANGES' : 'COMMIT_MEETING') }}
                  </button>
                </div>
              </div>

              <div v-if="loadingMeetings" class="flex flex-col items-center justify-center py-24">
                <Loader2 class="animate-spin text-[#2F2E8B]" :size="32" />
                <span class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.2em] mt-4">Loading_Meeting_Records...</span>
              </div>

              <template v-else-if="meetings.length > 0">
                <div class="space-y-3">
                  <div v-for="meeting in meetings" :key="meeting.id" class="bg-white border border-gray-100 p-5 hover:border-[#2F2E8B]/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all group relative overflow-hidden">
                    <div class="absolute left-0 top-0 bottom-0 w-1" :class="meeting.status === 'completed' ? 'bg-emerald-500' : meeting.status === 'cancelled' ? 'bg-red-400' : 'bg-[#2F2E8B]'"></div>
                    <div class="pl-3 flex items-start justify-between gap-4">
                      <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 mb-1 flex-wrap">
                          <span class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-tight truncate">{{ meeting.title || meeting.subject || 'UNTITLED_MEETING' }}</span>
                          <span v-if="meeting.status" class="px-2 py-0.5 border text-[8px] font-mono font-black uppercase tracking-widest" :class="meeting.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : meeting.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-blue-50 text-[#2F2E8B] border-blue-100'">{{ meeting.status }}</span>
                          <span v-if="meeting.meeting_type" class="px-2 py-0.5 bg-gray-50 border border-gray-100 text-[8px] font-mono font-black text-gray-500 uppercase tracking-widest">{{ meeting.meeting_type?.replace('_', ' ') }}</span>
                        </div>
                        <div class="flex items-center gap-4 text-[9px] font-mono text-gray-400 uppercase tracking-widest flex-wrap mt-1">
                          <span v-if="meeting.start_datetime || meeting.start_time" class="flex items-center gap-1"><Clock :size="10" /> {{ formatDate(meeting.start_datetime || meeting.start_time) }}</span>
                          <span v-if="meeting.location" class="flex items-center gap-1"><MapPin :size="10" /> {{ meeting.location }}</span>
                          <span v-if="meeting.organizer_name" class="flex items-center gap-1"><Tag :size="10" /> {{ meeting.organizer_name }}</span>
                        </div>
                        <p v-if="meeting.agenda || meeting.description" class="text-[10px] font-mono text-gray-600 mt-2 leading-relaxed">{{ meeting.agenda || meeting.description }}</p>
                      </div>
                      <div v-if="meeting.status === 'completed'" class="shrink-0">
                        <CheckCircle2 :size="18" class="text-emerald-500" />
                      </div>
                      <div class="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button @click="editMeeting(meeting)" class="w-7 h-7 flex items-center justify-center border border-gray-100 text-gray-400 hover:text-[#2F2E8B] hover:border-[#2F2E8B] transition-all" title="Edit meeting">
                          <Edit :size="12" />
                        </button>
                        <button @click="deleteMeetingRecord(meeting)" class="w-7 h-7 flex items-center justify-center border border-gray-100 text-gray-400 hover:text-red-500 hover:border-red-200 transition-all" title="Delete meeting">
                          <Trash2 :size="12" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </template>

              <div v-else class="flex flex-col items-center justify-center py-24 bg-gray-50/50 border border-dashed border-gray-200">
                <CalendarCheck :size="32" class="text-gray-200 mb-4" />
                <h5 class="text-[11px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]">NO_MEETINGS_SCHEDULED</h5>
                <p class="text-[9px] font-mono text-gray-300 uppercase tracking-widest mt-2 max-w-xs text-center leading-relaxed">No meeting records linked to this account.</p>
                <button @click="showMeetingForm = true" class="mt-6 px-6 py-2.5 bg-[#2F2E8B] text-white text-[9px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] transition-all flex items-center gap-2">
                  <Plus :size="12" /> SCHEDULE_FIRST_MEETING
                </button>
              </div>
            </div>

            <!-- ACTIVITIES TAB -->
            <div v-if="activeTab === 'activities'" class="space-y-6">
              <div v-if="loadingActivities" class="flex flex-col items-center justify-center py-24">
                <Loader2 class="animate-spin text-[#2F2E8B]" :size="32" />
                <span class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.2em] mt-4">Retrieving_Audit_Log...</span>
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
                        <div :class="[getActivityColorClass(activity.type), 'w-[14px] h-[14px] rounded-full border-2 border-white shadow-sm flex items-center justify-center relative z-10']">
                          <component :is="getActivityLucideIcon(activity.type)" :size="7" class="text-white" />
                        </div>
                      </div>
                    </div>

                    <!-- Activity card -->
                    <div class="ml-[26px] bg-white border border-gray-100 rounded-md p-2.5 transition-all hover:border-[#2F2E8B]/20 hover:shadow-sm group relative">
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
                          <!-- Structured field changes -->
                          <div v-if="activity.metadata?.changes?.length" class="mt-2 space-y-1">
                            <div v-for="(chg, cIdx) in activity.metadata.changes" :key="cIdx"
                              class="flex items-center gap-2 text-[9px] font-mono border border-dashed border-gray-200 bg-white px-2 py-1.5 rounded-sm">
                              <span class="font-black text-[#2F2E8B] uppercase tracking-wider shrink-0 min-w-[80px]">{{ chg.field }}</span>
                              <span class="text-gray-400 line-through decoration-red-400/60 truncate max-w-[120px]" :title="chg.oldValue">"{{ chg.oldValue || '—' }}"</span>
                              <span class="text-gray-300 shrink-0">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="inline"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                              </span>
                              <span class="font-bold text-emerald-700 truncate max-w-[200px]" :title="chg.newValue">"{{ chg.newValue || '—' }}"</span>
                            </div>
                          </div>
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
                          <button @click="deleteActivity(activity.id)" class="w-6 h-6 flex items-center justify-center text-red-400 hover:text-white hover:bg-red-500 rounded transition-all" title="Delete activity">
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

            <!-- DOCUMENTS TAB -->
            <div v-if="activeTab === 'documents'" class="space-y-6">
              <LinkedDocumentsWidget
                recordType="account"
                :recordId="account.id"
                :recordName="account.name"
              />
            </div>

          </div>
        </div>

        <!-- Footer Control Bar -->
        <div class="px-4 py-2.5 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between gap-2 sticky bottom-0 z-20">
          <div class="flex items-center gap-2">
             <button @click="handleDelete" class="px-4 py-2 border border-red-200 text-red-500 hover:bg-red-50 text-[10px] font-mono font-black uppercase tracking-widest transition-all flex items-center gap-1.5">
               <Trash2 :size="13" /> DELETE
             </button>
             <button @click="$emit('archive', account); close()" class="px-4 py-2 border border-amber-200 text-amber-600 hover:bg-amber-50 text-[10px] font-mono font-black uppercase tracking-widest transition-all flex items-center gap-1.5">
               <Archive :size="13" /> ARCHIVE
             </button>
          </div>
          <div class="flex items-center gap-2">
             <button @click="close" class="px-5 py-2 border border-gray-100 text-gray-500 hover:text-gray-900 hover:bg-white text-[10px] font-mono font-black uppercase tracking-widest transition-all">
               CLOSE
             </button>
             <button @click="handleEdit" class="px-6 py-2 bg-[#2F2E8B] text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] transition-all flex items-center gap-1.5">
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
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 flex items-center justify-center rounded-full"
                :class="confirmDanger ? 'bg-red-50 border border-red-200' : 'bg-[#2F2E8B]/5 border border-[#2F2E8B]/20'">
                <Trash2 v-if="confirmDanger" :size="16" class="text-red-600" />
                <Info v-else :size="16" class="text-[#2F2E8B]" />
              </div>
              <div>
                <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">{{ confirmTitle }}</p>
                <p class="text-sm font-semibold text-gray-800">{{ confirmMessage }}</p>
              </div>
            </div>
            <div class="flex justify-end gap-2 mt-6">
              <button @click="cancelConfirm" class="px-4 py-2 border border-gray-200 text-gray-500 hover:bg-gray-50 text-[10px] font-mono font-bold uppercase tracking-widest transition-all">CANCEL</button>
              <button @click="executeConfirm" class="px-4 py-2 text-white text-[10px] font-mono font-bold uppercase tracking-widest transition-all flex items-center gap-1.5"
                :class="confirmDanger ? 'bg-red-600 hover:bg-red-700' : 'bg-[#2F2E8B] hover:bg-[#3D2F88]'">
                <Trash2 v-if="confirmDanger" :size="12" />
                {{ confirmDanger ? 'DELETE' : 'CONFIRM' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Call Dialog -->
    <Teleport to="body">
      <div v-if="showCallDialog" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center z-[100001] p-4 pt-[8vh]" @click.self="closeCallDialog">
        <div class="bg-white shadow-2xl w-full max-w-md border border-gray-200 overflow-hidden animate-in zoom-in-95 duration-200">
          <!-- Header -->
          <div class="bg-gradient-to-r from-emerald-600 to-emerald-700 px-4 py-3 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 bg-emerald-500/30 border border-emerald-400/30 flex items-center justify-center">
                <Phone :size="14" class="text-white" />
              </div>
              <div>
                <h3 class="text-[11px] font-black text-white uppercase tracking-tight">{{ callContactName || 'Account' }}</h3>
                <div class="text-[7px] font-mono text-emerald-200 uppercase tracking-wider leading-none">{{ customCallPhone || '—' }}</div>
              </div>
            </div>
            <button @click="closeCallDialog" class="w-6 h-6 flex items-center justify-center text-emerald-300 hover:text-white transition rounded hover:bg-emerald-600">
              <X :size="14" />
            </button>
          </div>

          <!-- Body -->
          <div class="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
            <!-- Phone Number + Initiate Button -->
            <div class="bg-emerald-50 border border-emerald-100 p-3 flex items-center justify-between gap-3">
              <div>
                <div class="text-[7px] font-mono font-bold text-emerald-700 uppercase tracking-widest">Phone Number</div>
                <div class="text-[12px] font-black text-gray-900 font-mono mt-0.5 break-all">{{ customCallPhone || 'No number on file' }}</div>
              </div>
              <a v-if="customCallPhone" :href="`tel:${customCallPhone}`" class="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[8px] font-mono font-black uppercase tracking-widest transition-colors">
                <Phone :size="10" /> Initiate Call
              </a>
            </div>

            <!-- Talking Points Checklist -->
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <h4 class="text-[8px] font-mono font-black text-gray-600 uppercase tracking-widest flex items-center gap-1">
                  <i class="fas fa-list-check text-emerald-600 text-[9px]"></i> Talking Points
                </h4>
                <button type="button" @click="resetCallTalkingPoints" class="text-[7px] font-mono font-bold text-gray-400 hover:text-emerald-600 uppercase tracking-wider">Reset</button>
              </div>
              <div class="space-y-1 max-h-28 overflow-y-auto pr-1">
                <label v-for="(point, idx) in callTalkingPoints" :key="idx" class="flex items-start gap-1.5 p-1.5 border border-gray-100 hover:border-emerald-300 hover:bg-emerald-50/30 cursor-pointer transition-colors">
                  <input type="checkbox" v-model="point.done" class="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 border-gray-300 w-3 h-3" />
                  <span class="text-[9px] text-gray-700 font-mono uppercase tracking-tight leading-snug" :class="{ 'line-through text-gray-400': point.done }">{{ point.text }}</span>
                </label>
              </div>
              <div class="flex gap-1.5 mt-1.5">
                <input v-model="callNewTalkingPoint" @keyup.enter="addCallTalkingPoint" type="text" placeholder="Add point..." class="flex-1 border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 px-2 py-1.5 text-[9px] font-mono uppercase outline-none bg-gray-50" />
                <button type="button" @click="addCallTalkingPoint" class="px-2 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[8px] font-mono font-black uppercase transition">
                  <i class="fas fa-plus text-[9px]"></i>
                </button>
              </div>
            </div>

            <!-- Call Outcome + Duration -->
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-[7px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1">Outcome</label>
                <select v-model="callOutcomeVal" class="w-full border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 px-2 py-1.5 text-[9px] font-mono uppercase outline-none bg-gray-50">
                  <option value="connected">CONNECTED</option>
                  <option value="voicemail">VOICEMAIL</option>
                  <option value="no_answer">NO ANSWER</option>
                  <option value="busy">BUSY</option>
                  <option value="follow_up">FOLLOW-UP NEEDED</option>
                  <option value="not_interested">NOT INTERESTED</option>
                </select>
              </div>
              <div>
                <label class="block text-[7px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1">Duration (Min)</label>
                <input v-model.number="callDurationVal" type="number" min="0" step="0.5" placeholder="0" class="w-full border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 px-2 py-1.5 text-[9px] font-mono outline-none bg-gray-50" />
              </div>
            </div>

            <!-- Call Notes -->
            <div>
              <label class="block text-[7px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1 flex items-center gap-1">
                <i class="fas fa-pen text-emerald-600 text-[9px]"></i> Call Notes
              </label>
              <textarea v-model="callNoteText" rows="2" placeholder="DISCUSSION, NEXT STEPS, OBJECTIONS..." class="w-full border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 px-2 py-1.5 text-[9px] font-mono outline-none bg-gray-50 resize-none"></textarea>
            </div>

            <div v-if="callErrorMsg" class="text-[9px] font-mono text-red-600 bg-red-50 border border-red-200 p-2">{{ callErrorMsg }}</div>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-end gap-2 px-4 py-3 border-t border-gray-100 bg-gray-50/50">
            <button type="button" @click="closeCallDialog" class="px-3 py-1.5 border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 transition text-[8px] font-mono font-black uppercase tracking-widest">Cancel</button>
            <button type="button" @click="saveAccountCallNote" :disabled="callSaving || !callNoteText.trim()" class="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white transition text-[8px] font-mono font-black uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Loader2 v-if="callSaving" :size="10" class="animate-spin" />
              <Save v-else :size="10" />
              {{ callSaving ? 'SAVING...' : 'Save Note & Log Call' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- WhatsApp Dialog -->
    <Teleport to="body">
      <div v-if="showWhatsAppDialog" class="fixed inset-0 z-[200] flex items-start justify-center pt-[20vh] bg-black/40 backdrop-blur-[2px]" @click.self="closeWhatsAppDialog">
        <div class="bg-white shadow-2xl w-full max-w-sm rounded-lg border border-green-200 overflow-hidden animate-in zoom-in-95 duration-200">
          <div class="bg-green-600 px-4 py-2.5 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-6 h-6 bg-green-700 rounded-full flex items-center justify-center">
                <MessageSquare :size="12" class="text-white" />
              </div>
              <span class="text-[11px] font-mono font-black text-white uppercase tracking-widest">WhatsApp // Message</span>
            </div>
            <button @click="closeWhatsAppDialog" class="w-5 h-5 flex items-center justify-center text-green-300 hover:text-white rounded hover:bg-green-700 transition-colors">
              <X :size="12" />
            </button>
          </div>
          <div class="p-3.5 space-y-3">
            <div class="flex items-center gap-2 text-[10px] font-mono font-bold text-gray-600 uppercase tracking-widest bg-green-50 px-2.5 py-1.5 rounded border border-green-100">
              <MessageSquare :size="11" class="text-green-600" />
              <span>{{ whatsAppContactName || 'CONTACT' }}</span>
              <span v-if="whatsAppPhoneNumber" class="text-green-600">· {{ whatsAppPhoneNumber }}</span>
            </div>
            <textarea v-model="whatsAppMessage" rows="3" placeholder="Type your WhatsApp message..." class="w-full border border-gray-200 bg-gray-50 px-3 py-2 text-[11px] font-mono text-gray-700 outline-none focus:border-green-500 focus:bg-green-50/30 resize-none rounded transition-colors"></textarea>
            <div class="bg-green-50 border border-green-100 px-3 py-2 rounded">
              <p class="text-[8px] font-mono font-bold text-green-700 uppercase tracking-widest flex items-center gap-1.5">
                <MessageSquare :size="10" /> Message logged to account activity.
              </p>
            </div>
          </div>
          <div class="px-3.5 py-2.5 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between gap-2">
            <a v-if="whatsAppPhoneNumber" :href="'https://wa.me/' + whatsAppPhoneNumber.replace(/[^0-9]/g, '')" target="_blank" class="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-[9px] font-mono font-black uppercase tracking-widest transition-all flex items-center gap-1.5 rounded shadow-sm">
              <MessageSquare :size="11" /> Open WhatsApp
            </a>
            <div class="flex items-center gap-2">
              <button @click="closeWhatsAppDialog" class="px-3 py-1.5 text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest hover:text-gray-700 transition-colors">Cancel</button>
              <button @click="proceedWithWhatsApp" class="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white text-[9px] font-mono font-black uppercase tracking-widest transition-all flex items-center gap-1.5 rounded shadow-sm">
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
  X, Edit, Trash2, Globe, Phone, Mail, RefreshCw, Info, Users, History, 
  FileText, Truck, Linkedin, Twitter, Facebook, Loader2, Plus, Briefcase,
  MapPin, AlignLeft, StickyNote, CalendarCheck, DollarSign, TrendingUp,
  CheckCircle2, AlertCircle, Archive, ChevronRight, Tag, Clock, Target,
  Save, XCircle, Video, MessageSquare, BarChart2,
  Search, Check, ChevronDown, ChevronLeft, UserPlus, Paperclip,
  GitCommitHorizontal, CalendarPlus, Download
} from 'lucide-vue-next';
import { ref, computed, watch, onMounted } from 'vue';
import * as crmApi from '@/services/crm_api.js';
import * as documentsApi from '@/services/documents_api.js';
import { decodeJWT } from '@/services/decodeJWT.js';
import { useRBAC } from '@/composables/useRBAC';
import LinkedDocumentsWidget from './LinkedDocumentsWidget.vue';

const props = defineProps({
  modelValue: Boolean,
  account: Object,
  users: { type: Array, default: () => [] }
});

const emit = defineEmits(['update:modelValue', 'edit', 'delete', 'archive', 'refresh']);

const { getTenantId } = decodeJWT();
const { getUserEmail } = decodeJWT();
const { canAssign, initializeRBAC } = useRBAC();
const canAssignCrm = computed(() => canAssign('crm'));
onMounted(() => { initializeRBAC().catch(() => {}); });

const activeTab = ref('overview');
const contacts = ref([]);
const activities = ref([]);
const loadingContacts = ref(false);
const loadingActivities = ref(false);
const contactSearchQuery = ref('');
const showLinkLeadModal = ref(false);
const leadSearchQuery = ref('');
const leadSearchResults = ref([]);
const searchingLeads = ref(false);
let contactSearchTimer = null;

const filteredContacts = computed(() => {
  const q = contactSearchQuery.value?.toLowerCase().trim();
  if (!q) return contacts.value;
  return contacts.value.filter(c => {
    const name = ((c.firstName || '') + ' ' + (c.lastName || '')).toLowerCase();
    const email = (c.email || '').toLowerCase();
    const phone = (c.phone || '');
    return name.includes(q) || email.includes(q) || phone.includes(q);
  });
});

function debouncedContactSearch() {
  clearTimeout(contactSearchTimer);
  contactSearchTimer = setTimeout(() => {}, 300);
}

// Deals state
const deals = ref([]);
const loadingDeals = ref(false);
const showDealForm = ref(false);
const savingDeal = ref(false);
const dealStageFilter = ref('all');
const dealPage = ref(1);
const DEALS_PER_PAGE = 12;
const newDeal = ref({
  name: '', value: 0, stage: 'Prospecting', probability: 10,
  expectedCloseDate: '', assignedTo: [], description: '',
  nextStep: '', status: 'active', cac: null
});
const showAssigneeDropdown = ref(false);
const assigneeSearch = ref('');
const filteredAssigneeUsers = computed(() => {
  if (!assigneeSearch.value) return props.users;
  const q = assigneeSearch.value.toLowerCase();
  return props.users.filter(u => u.email.toLowerCase().includes(q));
});
function toggleAssignee(email) {
  const idx = newDeal.value.assignedTo.indexOf(email);
  if (idx === -1) newDeal.value.assignedTo.push(email);
  else newDeal.value.assignedTo.splice(idx, 1);
}
function dealAssigneesDisplay(assignedTo) {
  if (!assignedTo) return [];
  if (Array.isArray(assignedTo)) return assignedTo;
  return assignedTo.split(',').map(s => s.trim()).filter(Boolean);
}

// Notes state
const accountNotes = ref([]);
const newNoteText = ref('');
const savingNote = ref(false);
const editingNoteId = ref(null);
const editingNoteText = ref('');

// Meetings state
const meetings = ref([]);
const loadingMeetings = ref(false);
const showMeetingForm = ref(false);
const savingMeeting = ref(false);
const editingMeetingId = ref(null);
const newMeeting = ref({
  title: '', description: '', meeting_type: 'call',
  start_datetime: '', end_datetime: '', location: '', agenda: ''
});



watch(showMeetingForm, (open) => {
  if (!open) editingMeetingId.value = null;
});

// CAC state
const cacValue = ref(null);
const savingCac = ref(false);
const cacSaved = ref(false);
const localCac = ref(0);

const tabs = [
  { id: 'overview', label: 'Overview', lucideIcon: Info },
  { id: 'contacts', label: 'Contacts', lucideIcon: Users },
  { id: 'deals', label: 'Deals', lucideIcon: Briefcase },
  { id: 'meetings', label: 'Meetings', lucideIcon: CalendarCheck },
  { id: 'notes', label: 'Notes', lucideIcon: StickyNote },
  { id: 'activities', label: 'Activities', lucideIcon: History },
  { id: 'documents', label: 'Documents', lucideIcon: FileText }
];

const hasBillingAddress = computed(() => {
  return props.account?.billingStreet || props.account?.billingCity || 
         props.account?.billingState || props.account?.billingPostalCode || 
         props.account?.billingCountry;
});

const hasShippingAddress = computed(() => {
  return props.account?.shippingStreet || props.account?.shippingCity || 
         props.account?.shippingState || props.account?.shippingPostalCode || 
         props.account?.shippingCountry;
});

const hasSocialMedia = computed(() => {
  return props.account?.linkedin || props.account?.twitter || props.account?.facebook;
});

watch(() => props.modelValue, (newVal) => {
  if (newVal && props.account) {
    activeTab.value = 'overview';
    contacts.value = [];
    activities.value = [];
    deals.value = [];
    meetings.value = [];
    accountNotes.value = Array.isArray(props.account?.account_notes) ? [...props.account.account_notes] : [];
    cacValue.value = props.account?.cac ?? null;
    localCac.value = props.account?.cac ?? 0;
    cacSaved.value = false;
    showDealForm.value = false;
    showMeetingForm.value = false;
    newNoteText.value = '';
  }
});

watch(() => props.account, (acc) => {
  if (acc) {
    accountNotes.value = Array.isArray(acc.account_notes) ? [...acc.account_notes] : [];
    cacValue.value = acc?.cac ?? null;
    localCac.value = acc?.cac ?? 0;
  }
});

watch(activeTab, (newTab) => {
  if (newTab === 'contacts' && contacts.value.length === 0) {
    loadContacts();
  } else if (newTab === 'activities' && activities.value.length === 0) {
    loadActivities();
  } else if (newTab === 'deals' && deals.value.length === 0) {
    loadDeals();
  } else if (newTab === 'meetings' && meetings.value.length === 0) {
    loadMeetings();
  }
});

async function loadContacts() {
  if (!props.account?.id) return;
  
  loadingContacts.value = true;
  try {
    const tenantId = getTenantId();

    // Associated leads now serve as the contacts under this account
    // (independent of the lead's pipeline stage).
    const associatedLeadIds = Array.isArray(props.account.associatedLeadIds)
      ? props.account.associatedLeadIds
      : [];
    let leadContacts = [];
    if (associatedLeadIds.length > 0) {
      try {
        const leadsData = await crmApi.getLeads(tenantId, { per_page: 1000 });
        const allLeads = leadsData?.items || [];
          leadContacts = allLeads
            .filter(l => associatedLeadIds.includes(l.id))
            .map(l => {
              const parts = (l.name || '').trim().split(/\s+/);
              const firstName = parts.shift() || '';
              const lastName = parts.join(' ');
              const lat = Number(l.location?.lat ?? l.latitude ?? l.lat);
              const lng = Number(l.location?.lng ?? l.longitude ?? l.lng);
              return {
                id: l.id,
                firstName,
                lastName,
                title: l.position || 'LEAD',
                email: l.email || '',
                phone: l.phone || '',
                company: l.company || '',
                address: l.address || l.location?.address || '',
                latitude: Number.isFinite(lat) ? lat : null,
                longitude: Number.isFinite(lng) ? lng : null,
                sourceType: 'lead'
              };
            });
      } catch (err) {
        console.warn('[AccountDetailModal] Failed to load associated leads as contacts', err);
      }
    }

    // Also include any explicitly linked contacts (legacy / direct links).
    let directContacts = [];
    try {
      const result = await crmApi.getAccountContacts(props.account.id, tenantId);
      directContacts = Array.isArray(result) ? result : [];
    } catch (err) {
      console.warn('[AccountDetailModal] Failed to load direct account contacts', err);
    }

    // Merge, dedupe by id, leads take precedence in display order.
    const seen = new Set();
    const merged = [];
    for (const c of [...leadContacts, ...directContacts]) {
      if (!c || !c.id || seen.has(c.id)) continue;
      seen.add(c.id);
      merged.push(c);
    }
    contacts.value = merged;
  } catch (error) {
    console.error('[AccountDetailModal] Failed to load contacts:', error);
    contacts.value = [];
  } finally {
    loadingContacts.value = false;
  }
}

async function searchLeadsToLink() {
  const q = leadSearchQuery.value.trim();
  if (!q || q.length < 2) { leadSearchResults.value = []; return; }
  searchingLeads.value = true;
  try {
    const tenantId = getTenantId();
    const res = await crmApi.getLeads(tenantId, { search: q, per_page: 20 });
    const items = Array.isArray(res) ? res : (res?.items || []);
    const existingIds = new Set(contacts.value.map(c => c.id));
    leadSearchResults.value = items.filter(l => !existingIds.has(l.id));
  } catch { leadSearchResults.value = []; }
  finally { searchingLeads.value = false; }
}

async function linkLeadAsContact(lead) {
  if (!props.account?.id || !lead?.id) return;
  try {
    const tenantId = getTenantId();
    await crmApi.updateLead(lead.id, { account_id: props.account.id, convertedAccountId: props.account.id, stage: 'closed-won' }, tenantId);
    await logActivity('contact:link', `Lead "${lead.name}" linked as contact to this account`);
    showLinkLeadModal.value = false;
    leadSearchQuery.value = '';
    leadSearchResults.value = [];
    await loadContacts();
    await loadActivities();
  } catch (err) {
    console.error('[AccountDetailModal] Failed to link lead:', err);
    alert('Failed to link lead as contact.');
  }
}

async function loadDeals() {
  if (!props.account?.id) return;
  loadingDeals.value = true;
  try {
    const tenantId = getTenantId();
    const result = await crmApi.getAccountDeals(props.account.id, tenantId);
    deals.value = Array.isArray(result) ? result : (result?.items || result?.deals || result?.data || []);
  } catch (error) {
    console.error('[AccountDetailModal] Failed to load deals:', error);
    deals.value = [];
  } finally {
    loadingDeals.value = false;
  }
}

async function saveDeal() {
  if (!newDeal.value.name?.trim()) return;
  savingDeal.value = true;
  try {
    const tenantId = getTenantId();
    const selfEmail = getUserEmail() || '';
    // Backend expects assignedTo as a string, not array
    let assignedToStr = '';
    if (canAssignCrm.value) {
      assignedToStr = Array.isArray(newDeal.value.assignedTo) ? newDeal.value.assignedTo[0] || '' : String(newDeal.value.assignedTo || '');
    } else {
      assignedToStr = selfEmail;
    }
    // Ensure numeric fields are numbers
    const payload = {
      name: newDeal.value.name.trim(),
      value: Number(newDeal.value.value) || 0,
      stage: newDeal.value.stage || 'Prospecting',
      probability: Number(newDeal.value.probability) || 0,
      expectedCloseDate: newDeal.value.expectedCloseDate || '',
      assignedTo: assignedToStr,
      description: newDeal.value.description || '',
      nextStep: newDeal.value.nextStep || '',
      status: newDeal.value.status || 'active',
      cac: newDeal.value.cac ? Number(newDeal.value.cac) : null,
      accountId: props.account.id,
      accountName: props.account.name,
      tenant_id: tenantId
    };
    await crmApi.createDeal(payload);
    newDeal.value = { name: '', value: 0, stage: 'Prospecting', probability: 10, expectedCloseDate: '', assignedTo: [], description: '', nextStep: '', status: 'active', cac: null };
    showAssigneeDropdown.value = false;
    assigneeSearch.value = '';
    showDealForm.value = false;
    await loadDeals();
  } catch (error) {
    console.error('[AccountDetailModal] Failed to save deal:', error);
  } finally {
    savingDeal.value = false;
  }
}

async function updateDealStage(deal, newStage) {
  try {
    const tenantId = getTenantId();
    await crmApi.updateDeal(deal.id, { ...deal, stage: newStage }, tenantId);
    const idx = deals.value.findIndex(d => d.id === deal.id);
    if (idx !== -1) deals.value[idx] = { ...deals.value[idx], stage: newStage };
  } catch (error) {
    console.error('[AccountDetailModal] Failed to update deal stage:', error);
  }
}

const editingDeal = ref(null);
const editingDealData = ref({});

function startEditDeal(deal) {
  editingDeal.value = deal.id;
  editingDealData.value = {
    name: deal.name || '',
    value: deal.value || 0,
    stage: deal.stage || 'Prospecting',
    probability: deal.probability || 10,
    expectedCloseDate: deal.expectedCloseDate || '',
    nextStep: deal.nextStep || '',
    description: deal.description || '',
    cac: deal.cac || null
  };
}

function cancelEditDeal() {
  editingDeal.value = null;
  editingDealData.value = {};
}

async function saveEditDeal(deal) {
  const tenantId = getTenantId();
  if (!tenantId || !editingDealData.value.name?.trim()) return;
  try {
    await crmApi.updateDeal(deal.id, { ...deal, ...editingDealData.value, tenant_id: tenantId }, tenantId);
    const idx = deals.value.findIndex(d => d.id === deal.id);
    if (idx !== -1) deals.value[idx] = { ...deals.value[idx], ...editingDealData.value };
    cancelEditDeal();
  } catch (e) {
    console.error('[AccountDetailModal] Failed to update deal:', e);
  }
}

async function archiveDeal(deal) {
  try {
    const tenantId = getTenantId();
    await crmApi.updateDeal(deal.id, { ...deal, archived: true, status: 'archived' }, tenantId);
    deals.value = deals.value.filter(d => d.id !== deal.id);
  } catch (error) {
    console.error('[AccountDetailModal] Failed to archive deal:', error);
  }
}

async function addNote() {
  if (!newNoteText.value?.trim()) return;
  savingNote.value = true;
  try {
    const tenantId = getTenantId();
    const noteText = newNoteText.value.trim();
    const note = { id: Date.now().toString(), text: noteText, createdAt: new Date().toISOString() };
    const updatedNotes = [...accountNotes.value, note];
    await crmApi.updateAccount(props.account.id, { ...props.account, account_notes: updatedNotes }, tenantId);
    accountNotes.value = updatedNotes;
    newNoteText.value = '';
    await logActivity('note:create', `Note added: "${noteText.substring(0, 500)}"`);
  } catch (error) {
    console.error('[AccountDetailModal] Failed to save note:', error);
  } finally {
    savingNote.value = false;
  }
}

async function deleteNote(noteId) {
  const ok = await showConfirmDialog('DELETE NOTE', 'Permanently delete this note? This cannot be undone.', true);
  if (!ok) return;
  try {
    const tenantId = getTenantId();
    const deletedNote = accountNotes.value.find(n => n.id === noteId);
    const updatedNotes = accountNotes.value.filter(n => n.id !== noteId);
    await crmApi.updateAccount(props.account.id, { ...props.account, account_notes: updatedNotes }, tenantId);
    accountNotes.value = updatedNotes;
    if (editingNoteId.value === noteId) {
      editingNoteId.value = null;
      editingNoteText.value = '';
    }
    await logActivity('note:delete', `Note deleted: "${(deletedNote?.text || '').substring(0, 500)}"`);
  } catch (error) {
    console.error('[AccountDetailModal] Failed to delete note:', error);
  }
}

function startEditNote(note) {
  editingNoteId.value = note.id;
  editingNoteText.value = note.text || '';
}

function cancelEditNote() {
  editingNoteId.value = null;
  editingNoteText.value = '';
}

async function saveEditNote(noteId) {
  if (!editingNoteText.value?.trim()) return;
  try {
    const tenantId = getTenantId();
    const updatedNotes = accountNotes.value.map(n => n.id === noteId
      ? { ...n, text: editingNoteText.value.trim(), updatedAt: new Date().toISOString() }
      : n);
    await crmApi.updateAccount(props.account.id, { ...props.account, account_notes: updatedNotes }, tenantId);
    accountNotes.value = updatedNotes;
    editingNoteId.value = null;
    editingNoteText.value = '';
  } catch (error) {
    console.error('[AccountDetailModal] Failed to update note:', error);
  }
}

async function loadMeetings() {
  if (!props.account?.id) return;
  loadingMeetings.value = true;
  try {
    const tenantId = getTenantId();
    const result = await crmApi.getMeetings(tenantId, { related_record_id: props.account.id, limit: 100 });
    meetings.value = Array.isArray(result) ? result : (result?.meetings || result?.data || []);
  } catch (error) {
    console.error('[AccountDetailModal] Failed to load meetings:', error);
    meetings.value = [];
  } finally {
    loadingMeetings.value = false;
  }
}

async function saveMeeting() {
  if (!newMeeting.value.title?.trim() || !newMeeting.value.start_datetime || !newMeeting.value.end_datetime) return;
  savingMeeting.value = true;
  try {
    const tenantId = getTenantId();
    const jwtUtils = decodeJWT();
    const organizerName = jwtUtils.getUserName?.() || jwtUtils.getUserEmail?.() || 'Account Manager';
    const organizerId = jwtUtils.getUserId?.() || jwtUtils.getUserEmail?.() || 'unknown';
    const payload = {
      tenant_id: tenantId,
      title: newMeeting.value.title.trim(),
      description: newMeeting.value.description || '',
      meeting_type: newMeeting.value.meeting_type || 'call',
      start_datetime: new Date(newMeeting.value.start_datetime).toISOString(),
      end_datetime: new Date(newMeeting.value.end_datetime).toISOString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
      location_type: newMeeting.value.location ? 'physical' : 'virtual',
      location: newMeeting.value.location || null,
      agenda: newMeeting.value.agenda || '',
      organizer_id: organizerId,
      organizer_name: organizerName,
      participants: [],
      related_records: [{ record_type: 'account', record_id: props.account.id, record_name: props.account.name }]
    };
    const isUpdate = !!editingMeetingId.value;
    if (editingMeetingId.value) {
      await crmApi.updateMeeting(editingMeetingId.value, payload);
    } else {
      await crmApi.createMeeting(payload);
    }
    const meetingTitle = newMeeting.value.title;
    newMeeting.value = { title: '', description: '', meeting_type: 'call', start_datetime: '', end_datetime: '', location: '', agenda: '' };
    editingMeetingId.value = null;
    showMeetingForm.value = false;
    await loadMeetings();
    await logActivity('meeting:create', `Meeting "${meetingTitle}" ${isUpdate ? 'updated' : 'created'}`);
  } catch (error) {
    console.error('[AccountDetailModal] Failed to save meeting:', error);
  } finally {
    savingMeeting.value = false;
  }
}

function editMeeting(meeting) {
  editingMeetingId.value = meeting.id;
  const toLocal = (iso) => iso ? new Date(iso).toISOString().slice(0, 16) : '';
  newMeeting.value = {
    title: meeting.title || '',
    description: meeting.description || '',
    meeting_type: meeting.meeting_type || 'call',
    start_datetime: toLocal(meeting.start_datetime || meeting.start_time),
    end_datetime: toLocal(meeting.end_datetime || meeting.end_time),
    location: meeting.location || '',
    agenda: meeting.agenda || ''
  };
  showMeetingForm.value = true;
}

async function deleteMeetingRecord(meeting) {
  if (!confirm(`Delete meeting "${meeting.title || 'this meeting'}"? This cannot be undone.`)) return;
  try {
    await crmApi.deleteMeeting(meeting.id);
    meetings.value = meetings.value.filter(m => m.id !== meeting.id);
    await logActivity('meeting:delete', `Meeting "${meeting.title || 'this record'}" deleted`);
  } catch (error) {
    console.error('[AccountDetailModal] Failed to delete meeting:', error);
  }
}


/** Add/subtract a preset amount from the current CMA and pre-fill the input */
function adjustCac(amount) {
  // If input is empty/null, start from current CMA
  const base = (cacValue.value !== null && cacValue.value !== undefined && cacValue.value !== '')
    ? parseFloat(cacValue.value)
    : (localCac.value || 0);
  const newVal = Math.max(0, base + amount);
  cacValue.value = newVal;
}

async function saveCac() {
  if (cacValue.value === null || cacValue.value === undefined || cacValue.value === '') return;
  savingCac.value = true;
  try {
    const tenantId = getTenantId();
    const oldCac = props.account?.cac || 0;
    const newCac = parseFloat(cacValue.value);
    await crmApi.updateAccount(props.account.id, { ...props.account, cac: newCac }, tenantId);
    localCac.value = newCac;
    cacSaved.value = true;
    await logActivity('cac:update', `CAC changed: ${formatCurrency(oldCac)} → ${formatCurrency(newCac)}`, [
      { field: 'CMA (CAC)', oldValue: formatCurrency(oldCac), newValue: formatCurrency(newCac) }
    ]);
    emit('refresh');
    setTimeout(() => { cacSaved.value = false; }, 2500);
  } catch (error) {
    console.error('[AccountDetailModal] Failed to save CAC:', error);
  } finally {
    savingCac.value = false;
  }
}

const PIPELINE_STAGES = ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];

const stageBadgeClass = (stage) => {
  const map = {
    'Prospecting': 'bg-gray-100 text-gray-600 border-gray-200',
    'Qualification': 'bg-blue-50 text-blue-700 border-blue-100',
    'Proposal': 'bg-indigo-50 text-indigo-700 border-indigo-100',
    'Negotiation': 'bg-amber-50 text-amber-700 border-amber-100',
    'Closed Won': 'bg-emerald-50 text-emerald-700 border-emerald-100',
    'Closed Lost': 'bg-red-50 text-red-700 border-red-100'
  };
  return map[stage] || 'bg-gray-100 text-gray-600 border-gray-200';
};

const stageBarClass = (stage) => {
  const map = {
    'Prospecting': 'bg-gray-400',
    'Qualification': 'bg-blue-500',
    'Proposal': 'bg-indigo-500',
    'Negotiation': 'bg-amber-500',
    'Closed Won': 'bg-emerald-500',
    'Closed Lost': 'bg-red-500'
  };
  return map[stage] || 'bg-gray-400';
};

const filteredDeals = computed(() => {
  if (dealStageFilter.value === 'all') return deals.value.filter(d => !d.archived);
  if (dealStageFilter.value === 'archived') return deals.value.filter(d => d.archived);
  return deals.value.filter(d => !d.archived && d.stage === dealStageFilter.value);
});

// Only show stages that have at least one deal
const stagesWithDeals = computed(() =>
  PIPELINE_STAGES.filter(stage => deals.value.some(d => d.stage === stage))
);

const dealTotalPages = computed(() => Math.max(1, Math.ceil(filteredDeals.value.length / DEALS_PER_PAGE)));

const pagedDeals = computed(() => {
  const start = (dealPage.value - 1) * DEALS_PER_PAGE;
  return filteredDeals.value.slice(start, start + DEALS_PER_PAGE);
});

watch(dealStageFilter, () => { dealPage.value = 1; });

const dealStats = computed(() => {
  const active = deals.value.filter(d => !d.archived);
  const won = active.filter(d => d.stage === 'Closed Won');
  const totalValue = active.reduce((sum, d) => sum + (parseFloat(d.value) || 0), 0);
  const wonValue = won.reduce((sum, d) => sum + (parseFloat(d.value) || 0), 0);
  return { total: active.length, totalValue, wonValue, winRate: active.length ? Math.round((won.length / active.length) * 100) : 0 };
});


async function loadActivities() {
  if (!props.account?.id) return;
  
  loadingActivities.value = true;
  try {
    const tenantId = getTenantId();
    const data = await crmApi.getAccountActivities(props.account.id, tenantId);
    activities.value = (Array.isArray(data) ? data : (data?.items || data?.data || [])).map(a => ({
      ...a,
      type: a.type || a.action || 'updated',
      actor: a.actor || a.metadata?.actor || 'system',
      createdAt: a.createdAt || a.timestamp
    }));
  } catch (error) {
    console.error('[AccountDetailModal] Failed to load activities:', error);
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
    await crmApi.deleteAccountActivity(activityId, getTenantId());
    activities.value = activities.value.filter(a => a.id !== activityId);
  } catch (err) {
    console.error('[AccountDetailModal] Failed to delete activity:', err);
  }
}

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

function close() {
  emit('update:modelValue', false);
}

function handleEdit() {
  emit('edit', props.account);
}

function handleDelete() {
  emit('delete', props.account);
}

// ── Export Report ──
const showExportMenu = ref(false);

async function exportReport(format) {
  showExportMenu.value = false;
  const a = props.account;
  if (!a) return;

  const tenantColor = '#2F2E8B';
  const now = new Date().toISOString().split('T')[0];
  const name = (a.name || 'UNKNOWN').trim();
  const safeName = name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '').toUpperCase();
  const reportTitle = `${safeName}_REPORT_${now}`;

  // ── Fetch related data ──
  let documents = [];
  const tenantId = getTenantId();
  // Load data for export (non-blocking — use whatever is available)
  if (!activities.value.length) { loadActivities().catch(() => {}); }
  if (!deals.value.length) { loadDeals().catch(() => {}); }
  if (!meetings.value.length) { loadMeetings().catch(() => {}); }
  try {
    const docsResp = await documentsApi.getDocuments(tenantId, { linked_to_type: 'account', linked_to_id: a.id });
    documents = docsResp.items || [];
  } catch (e) { /* ignore */ }

  // ── Account fields ──
  const accountFields = [
    { label: 'Account Name', value: a.name || 'N/A' },
    { label: 'Website', value: a.website || 'N/A' },
    { label: 'Industry', value: a.industry || 'N/A' },
    { label: 'Phone', value: a.phone || 'N/A' },
    { label: 'Email', value: a.email || 'N/A' },
    { label: 'Employees', value: a.numberOfEmployees || 'N/A' },
    { label: 'Annual Revenue', value: a.annualRevenue ? formatCurrency(a.annualRevenue) : 'N/A' },
    { label: 'Assigned To', value: a.assignedTo || 'N/A' },
    { label: 'Description', value: a.description || 'N/A' },
    { label: 'Billing Street', value: a.billingStreet || 'N/A' },
    { label: 'Billing City', value: a.billingCity || 'N/A' },
    { label: 'Billing State', value: a.billingState || 'N/A' },
    { label: 'Billing Postal Code', value: a.billingPostalCode || 'N/A' },
    { label: 'Billing Country', value: a.billingCountry || 'N/A' },
    { label: 'Shipping Street', value: a.shippingStreet || 'N/A' },
    { label: 'Shipping City', value: a.shippingCity || 'N/A' },
    { label: 'Shipping State', value: a.shippingState || 'N/A' },
    { label: 'Shipping Postal Code', value: a.shippingPostalCode || 'N/A' },
    { label: 'Shipping Country', value: a.shippingCountry || 'N/A' },
    { label: 'LinkedIn', value: a.linkedin || 'N/A' },
    { label: 'Twitter', value: a.twitter || 'N/A' },
    { label: 'Facebook', value: a.facebook || 'N/A' },
    { label: 'CMA (Client Maintenance Cost)', value: formatCurrency(a.cac || 0) },
    { label: 'Created', value: formatDate(a.createdAt || a.created_at) }
  ];

  // Contacts derived from linked leads
  const contactDetails = contacts.value.filter(c => c.sourceType === 'lead').map(c => ({
    name: `${c.firstName || ''} ${c.lastName || ''}`.trim() || 'N/A',
    email: c.email || '—',
    phone: c.phone || '—',
    title: c.title || '—'
  }));

  // Activities
  const activityDetails = (activities.value || []).map(a => ({
    type: (a.type || a.action || 'event').toUpperCase(),
    notes: a.notes || a.description || '—',
    date: formatDate(a.createdAt || a.timestamp),
    actor: (a.actor || 'system').split('@')[0]
  }));

  // Deals
  const dealDetails = (deals.value || []).map(d => ({
    name: d.name || '—',
    stage: d.stage || '—',
    value: formatCurrency(d.value || 0),
    status: d.status || 'active'
  }));

  // Meetings
  const meetingDetails = (meetings.value || []).map(m => ({
    title: m.title || '—',
    type: m.meeting_type || '—',
    location: m.location || '—',
    date: formatDate(m.start_datetime || m.start_time)
  }));

  // Notes
  const noteDetails = (accountNotes.value || []).map(n => ({
    text: n.text || '—',
    date: formatDate(n.createdAt)
  }));

  // Documents
  const docDetails = documents.map(d => ({
    name: d.name || 'N/A',
    category: (d.category || 'FILE').toUpperCase(),
    size: formatFileSize(d.file_size),
    date: formatDate(d.created_at)
  }));

  function toTitleCase(str) {
    if (!str) return '';
    return str.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
  }

  function formatFileSize(bytes) {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

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
      if (y > pageW - 30) { doc.addPage(); y = margin; }
      doc.setFillColor(245, 245, 255);
      doc.rect(margin, y, contentW, 6, 'F');
      doc.setTextColor(47, 46, 139);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text(title.toUpperCase(), margin + 2, y + 4.5);
      y += 9;
    }

    function jspdfCell(label, value) {
      if (y > pageW - 20) { doc.addPage(); y = margin; }
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
        if (y > pageW - 30) { doc.addPage(); y = margin; }
        const colCount = headers.length;
        const remaining = contentW - (opt?.colWidth0 || 40);
        const colW0 = opt?.colWidth0 || (colCount <= 2 ? 40 : Math.floor(contentW / colCount));
        const colStyles = {};
        colStyles[0] = { cellWidth: colW0, fontStyle: 'bold', textColor: [85,85,85] };
        if (colCount === 2) { colStyles[1] = { cellWidth: remaining }; }
        else if (opt?.colWidth1) {
          colStyles[1] = { cellWidth: opt.colWidth1 };
          const restW = contentW - colW0 - opt.colWidth1;
          const otherW = Math.floor(restW / (colCount - 2));
          for (let i = 2; i < colCount; i++) colStyles[i] = { cellWidth: Math.max(otherW, 15) };
        } else {
          const otherW = Math.floor(remaining / (colCount - 1));
          for (let i = 1; i < colCount; i++) colStyles[i] = { cellWidth: Math.max(otherW, 15) };
        }
        const result = autoTable(doc, { startY: y, head: [headers], body: data, margin: { left: margin, right: margin }, tableWidth: contentW, styles: { fontSize: 6.5, font: 'helvetica', cellPadding: { top: 1.5, bottom: 1.5, left: 2, right: 2 }, overflow: 'linebreak', minCellHeight: 5, valign: 'top' }, headStyles: { fillColor: [47, 46, 139], textColor: 255, fontStyle: 'bold', fontSize: 7, halign: 'left' }, columnStyles: colStyles });
        y = (result && result.lastFinalY) ? result.lastFinalY + 4 : y + 20;
      } catch (e) { console.warn('[PDF] autoTable error:', e); y += 20; }
    }

    doc.setFillColor(47, 46, 139); doc.rect(margin, y, contentW, 16, 'F');
    doc.setTextColor(255, 255, 255); doc.setFontSize(13); doc.setFont('helvetica', 'bold');
    doc.text('ACCOUNT REPORT — ' + name.toUpperCase(), margin + 3, y + 7);
    doc.setFontSize(7); doc.setFont('helvetica', 'normal'); doc.setTextColor(200, 210, 255);
    doc.text((a.industry || '') + '  |  Generated: ' + now + '  |  ID: ' + (a.id?.slice(0, 8) || '—'), margin + 3, y + 12.5);
    y += 20;

    jspdfSection('Account Profile');
    for (let i = 0; i < accountFields.length; i += 15) {
      const chunk = accountFields.slice(i, i + 15);
      if (i > 0) jspdfSection('Account Profile (continued)');
      chunk.forEach(f => jspdfCell(f.label, f.value));
    }
    jspdfSection('Contacts (' + contactDetails.length + ')');
    if (contactDetails.length) { jspdfTable(['Name','Email','Phone','Title'], contactDetails.map(c => [c.name, c.email, c.phone, c.title])); } else { doc.setFontSize(8); doc.setTextColor(150); doc.text('No contacts.', margin, y); y += 5; }
    jspdfSection('Deals (' + dealDetails.length + ')');
    if (dealDetails.length) { jspdfTable(['Name','Stage','Value','Status'], dealDetails.map(d => [d.name, d.stage, d.value, d.status])); } else { doc.setFontSize(8); doc.setTextColor(150); doc.text('No deals.', margin, y); y += 5; }
    jspdfSection('Activity Log (' + activityDetails.length + ')');
    if (activityDetails.length) { jspdfTable(['Activity','Notes','Date','Actor'], activityDetails.map(a => [a.type, a.notes, a.date, a.actor]), { colWidth0: 18, colWidth1: 100 }); } else { doc.setFontSize(8); doc.setTextColor(150); doc.text('No activities.', margin, y); y += 5; }
    jspdfSection('Account Notes (' + noteDetails.length + ')');
    if (noteDetails.length) { jspdfTable(['Note','Date'], noteDetails.map(n => [n.text, n.date]), { colWidth0: 150 }); } else { doc.setFontSize(8); doc.setTextColor(150); doc.text('No notes.', margin, y); y += 5; }
    jspdfSection('Meetings (' + meetingDetails.length + ')');
    if (meetingDetails.length) { jspdfTable(['Title','Type','Location','Date'], meetingDetails.map(m => [m.title, m.type, m.location, m.date])); } else { doc.setFontSize(8); doc.setTextColor(150); doc.text('No meetings.', margin, y); y += 5; }
    jspdfSection('Documents (' + docDetails.length + ')');
    if (docDetails.length) { jspdfTable(['Name','Category','Size','Date'], docDetails.map(d => [d.name, d.category, d.size, d.date])); } else { doc.setFontSize(8); doc.setTextColor(150); doc.text('No documents.', margin, y); y += 5; }
    doc.setFontSize(7); doc.setTextColor(180);
    doc.text('Uniplexity CRM — Account Report • ' + now + ' • Confidential', margin, doc.internal.pageSize.getHeight() - 10);
    doc.save(safeName + '_REPORT.pdf');

  // ═══════════════════════════════════════
  // DOCX
  // ═══════════════════════════════════════
  } else if (format === 'docx') {
    let html = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset="utf-8"><style>
      @page { size: A4 landscape; margin: 1.2cm; }
      body { font-family: 'Calibri', sans-serif; font-size: 10px; color: #2d2d2d; line-height: 1.5; }
      h1 { background: ${tenantColor}; color: #fff; padding: 12px 18px; font-size: 18px; font-weight: 600; }
      table { width: 100%; border-collapse: collapse; margin: 8px 0; table-layout: fixed; }
      th, td { border: 1px solid #c0c0c0; padding: 4px 7px; text-align: left; font-size: 9px; word-wrap: break-word; white-space: normal; }
      th { background: ${tenantColor}; color: #fff; font-weight: 600; font-size: 8.5px; }
      .section-title { font-weight: 700; font-size: 11px; margin: 14px 0 5px; padding: 4px 10px; background: #f0f0f0; border-left: 4px solid ${tenantColor}; color: ${tenantColor}; }
      .footer { text-align: center; font-size: 7px; color: #999; margin-top: 20px; }
      .subtitle { color: #888; font-size: 8.5px; }
    </style></head><body>
      <h1>Account Report — ${toTitleCase(a.name) || 'Unknown'}</h1>
      <p class="subtitle">${toTitleCase(a.industry) || ''} | Generated: ${now} | ID: ${a.id?.substring(0,8) || '—'}</p>
      <div class="section-title">Account Profile</div>
      <table>${accountFields.map(f => '<tr><td style="width:28%;background:#f5f5f5;font-weight:600;">' + f.label + '</td><td>' + f.value + '</td></tr>').join('')}</table>
      <div class="section-title">Contacts (' + contactDetails.length + ')</div>
      ${contactDetails.length ? '<table><tr><th>Name</th><th>Email</th><th>Phone</th><th>Title</th></tr>' + contactDetails.map(c => '<tr><td>' + c.name + '</td><td>' + c.email + '</td><td>' + c.phone + '</td><td>' + c.title + '</td></tr>').join('') + '</table>' : '<p class="subtitle">No contacts.</p>'}
      <div class="section-title">Deals (' + dealDetails.length + ')</div>
      ${dealDetails.length ? '<table><tr><th>Name</th><th>Stage</th><th>Value</th><th>Status</th></tr>' + dealDetails.map(d => '<tr><td>' + d.name + '</td><td>' + d.stage + '</td><td>' + d.value + '</td><td>' + d.status + '</td></tr>').join('') + '</table>' : '<p class="subtitle">No deals.</p>'}
      <div class="section-title">Activity Log (' + activityDetails.length + ')</div>
      ${activityDetails.length ? '<table><tr><th>Activity</th><th>Notes</th><th>Date</th><th>Actor</th></tr>' + activityDetails.map(a => '<tr><td>' + a.type + '</td><td>' + a.notes + '</td><td>' + a.date + '</td><td>' + a.actor + '</td></tr>').join('') + '</table>' : '<p class="subtitle">No activities recorded.</p>'}
      <div class="section-title">Account Notes (' + noteDetails.length + ')</div>
      ${noteDetails.length ? '<table><tr><th>Note</th><th>Date</th></tr>' + noteDetails.map(n => '<tr><td>' + n.text + '</td><td>' + n.date + '</td></tr>').join('') + '</table>' : '<p class="subtitle">No notes.</p>'}
      <div class="section-title">Meetings (' + meetingDetails.length + ')</div>
      ${meetingDetails.length ? '<table><tr><th>Title</th><th>Type</th><th>Location</th><th>Date</th></tr>' + meetingDetails.map(m => '<tr><td>' + m.title + '</td><td>' + m.type + '</td><td>' + m.location + '</td><td>' + m.date + '</td></tr>').join('') + '</table>' : '<p class="subtitle">No meetings.</p>'}
      <div class="section-title">Documents (' + docDetails.length + ')</div>
      ${docDetails.length ? '<table><tr><th>Name</th><th>Category</th><th>Size</th><th>Date</th></tr>' + docDetails.map(d => '<tr><td>' + d.name + '</td><td>' + d.category + '</td><td>' + d.size + '</td><td>' + d.date + '</td></tr>').join('') + '</table>' : '<p class="subtitle">No documents.</p>'}
      <div class="footer">Uniplexity CRM — Confidential</div>
    </body></html>`;
    const blob = new Blob([html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const docLink = document.createElement('a'); docLink.href = url;
    docLink.download = reportTitle + '.doc'; docLink.click(); URL.revokeObjectURL(url);

  // ═══════════════════════════════════════
  // CSV
  // ═══════════════════════════════════════
  } else {
    const csvRows = [];
    csvRows.push('ACCOUNT REPORT,' + (a.name || 'UNKNOWN') + ',Generated,' + now);
    csvRows.push(''); csvRows.push('ACCOUNT PROFILE'); csvRows.push('FIELD,VALUE');
    accountFields.forEach(f => csvRows.push('"' + f.label + '","' + f.value.replace(/"/g, '""') + '"'));
    csvRows.push(''); csvRows.push('CONTACTS,' + contactDetails.length); csvRows.push('Name,Email,Phone,Title');
    contactDetails.forEach(c => csvRows.push('"' + c.name + '","' + c.email + '","' + c.phone + '","' + c.title + '"'));
    csvRows.push(''); csvRows.push('DEALS,' + dealDetails.length); csvRows.push('Name,Stage,Value,Status');
    dealDetails.forEach(d => csvRows.push('"' + d.name + '","' + d.stage + '","' + d.value + '","' + d.status + '"'));
    csvRows.push(''); csvRows.push('ACTIVITY LOG,' + activityDetails.length); csvRows.push('Type,Notes,Date,Actor');
    activityDetails.forEach(at => csvRows.push('"' + at.type + '","' + at.notes.replace(/"/g, '""') + '","' + at.date + '","' + at.actor + '"'));
    csvRows.push(''); csvRows.push('ACCOUNT NOTES,' + noteDetails.length); csvRows.push('Note,Date');
    noteDetails.forEach(n => csvRows.push('"' + n.text.replace(/"/g, '""') + '","' + n.date + '"'));
    csvRows.push(''); csvRows.push('MEETINGS,' + meetingDetails.length); csvRows.push('Title,Type,Location,Date');
    meetingDetails.forEach(m => csvRows.push('"' + m.title + '","' + m.type + '","' + m.location + '","' + m.date + '"'));
    csvRows.push(''); csvRows.push('DOCUMENTS,' + docDetails.length); csvRows.push('Name,Category,Size,Date');
    docDetails.forEach(d => csvRows.push('"' + d.name + '","' + d.category + '","' + d.size + '","' + d.date + '"'));
    const csv = csvRows.join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const csvLink = document.createElement('a'); csvLink.href = url;
    csvLink.download = reportTitle + '.csv'; csvLink.click(); URL.revokeObjectURL(url);
  }
}

// ── Close export menu on outside click ──
onMounted(() => {
  document.addEventListener('click', () => { showExportMenu.value = false; });
});

const showWhatsAppDialog = ref(false);
const whatsAppPhoneNumber = ref('');
const whatsAppContactName = ref('');
const whatsAppMessage = ref('');

function openWhatsAppDialog(phone, name) {
  whatsAppPhoneNumber.value = phone || '';
  whatsAppContactName.value = name || '';
  whatsAppMessage.value = '';
  showWhatsAppDialog.value = true;
}

function closeWhatsAppDialog() {
  showWhatsAppDialog.value = false;
  whatsAppMessage.value = '';
}

async function proceedWithWhatsApp() {
  const msg = whatsAppMessage.value?.trim() || '';
  await logActivity('communication:whatsapp', `WhatsApp message to ${whatsAppContactName.value} at ${whatsAppPhoneNumber.value}${msg ? ' | Message: ' + msg : ''}`);
  closeWhatsAppDialog();
}

async function unlinkContact(contact) {
  if (!confirm(`Unlink "${contact.firstName} ${contact.lastName}" from this account?`)) return;
  try {
    const tenantId = getTenantId();
    if (contact.sourceType === 'lead' && contact.id) {
      await crmApi.updateLead(contact.id, { account_id: null, convertedAccountId: null }, tenantId);
    }
    await logActivity('contact:unlink', `Contact "${contact.firstName} ${contact.lastName}" unlinked from account`);
    await loadContacts();
    await loadActivities();
  } catch (err) {
    console.error('[AccountDetailModal] Failed to unlink contact:', err);
    alert('Failed to unlink contact.');
  }
}

// ── Call Dialog ──
const showCallDialog = ref(false);
const callPhoneNumber = ref('');
const customCallPhone = ref('');
const callContactName = ref('');
const callTalkingPoints = ref([]);
const callNewTalkingPoint = ref('');
const callOutcomeVal = ref('connected');
const callDurationVal = ref(0);
const callNoteText = ref('');
const callSaving = ref(false);
const callErrorMsg = ref('');

function openCallDialog(phone, name) {
  callPhoneNumber.value = phone || '';
  customCallPhone.value = phone || '';
  callContactName.value = name || '';
  resetCallTalkingPoints();
  callOutcomeVal.value = 'connected';
  callDurationVal.value = 0;
  callNoteText.value = '';
  callErrorMsg.value = '';
  showCallDialog.value = true;
}

function closeCallDialog() {
  showCallDialog.value = false;
}

function resetCallTalkingPoints() {
  callTalkingPoints.value = [
    { text: 'Confirm decision-maker & best time to talk', done: false },
    { text: 'Recap previous interaction / context', done: false },
    { text: 'Identify pain points & current situation', done: false },
    { text: 'Pitch tailored value proposition', done: false },
    { text: 'Discuss budget, timeline, authority', done: false },
    { text: 'Set next steps / follow-up date', done: false }
  ];
}

function addCallTalkingPoint() {
  const t = callNewTalkingPoint.value.trim();
  if (!t) return;
  callTalkingPoints.value.push({ text: t, done: false });
  callNewTalkingPoint.value = '';
}

async function saveAccountCallNote() {
  if (!callNoteText.value.trim()) { callErrorMsg.value = 'Please enter call notes.'; return; }
  callSaving.value = true;
  callErrorMsg.value = '';
  try {
    const donePoints = callTalkingPoints.value.filter(p => p.done).map(p => p.text);
    const summary = `Call to ${callContactName.value || 'Account'} at ${callPhoneNumber.value || '—'} | Outcome: ${callOutcomeVal.value} | Duration: ${callDurationVal.value || 0}min | Notes: ${callNoteText.value.trim()}${donePoints.length ? ' | Topics: ' + donePoints.join(', ') : ''}`;
    await logActivity('communication:call', summary);
    closeCallDialog();
    await loadActivities();
  } catch (e) {
    callErrorMsg.value = 'Failed to save call record.';
    console.error('[AccountDetailModal] Failed to save call:', e);
  } finally {
    callSaving.value = false;
  }
}

async function logActivity(action, notes = '', changes = []) {
  if (!props.account?.id) return;
  try {
    const metadata = {
      actor: getUserEmail() || 'system',
      actor_role: 'owner',
      timestamp: new Date().toISOString()
    };
    if (changes.length > 0) {
      metadata.changes = changes;
    }
    await crmApi.logAccountActivity(props.account.id, {
      type: action,
      notes: notes || '',
      description: notes || `Activity: ${action}`,
      metadata,
      tenant_id: getTenantId()
    });
    if (activeTab.value === 'activities') {
      await loadActivities();
    }
  } catch (err) {
    console.error('[AccountDetailModal] Failed to log activity:', err);
  }
}

function getInitials(name) {
  if (!name) return '?';
  const parts = name.split(' ').filter(p => p.length > 0);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).toUpperCase();
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-ZM', { style: 'currency', currency: 'ZMW' }).format(amount || 0);
}

function formatActivityType(type) {
  if (!type) return 'EVENT';
  return type
    .replace('communication:', '')
    .replace('account:', '')
    .replace('cac:', 'CMA ')
    .replace(':create', '')
    .replace(':update', '')
    .replace(':delete', '')
    .replace(/_/g, ' ')
    .toUpperCase()
    .trim();
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
    'meeting:delete': Trash2,
    'note:create': FileText,
    'note:delete': Trash2,
    'document:upload': Paperclip,
    'document:delete': Trash2,
    'cac:update': TrendingUp,
    'cac': TrendingUp,
    'account:create': Plus,
    'account:update': Edit,
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
    'appointment:create': 'bg-violet-500',
    'appointment:update': 'bg-violet-600',
    'visit:create': 'bg-orange-500',
    'meeting:create': 'bg-purple-500',
    'meeting:delete': 'bg-red-500',
    'note:create': 'bg-amber-500',
    'note:delete': 'bg-red-500',
    'document:upload': 'bg-pink-500',
    'document:delete': 'bg-red-500',
    'cac:update': 'bg-amber-500',
    'cac': 'bg-amber-500',
    'account:create': 'bg-emerald-500',
    'account:update': 'bg-blue-500',
    'WhatsApp': 'bg-green-500',
    'Phone Call': 'bg-emerald-600'
  };
  return colors[type?.toLowerCase()] || 'bg-gray-400';
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

