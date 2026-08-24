<template>
  <div class="min-h-screen flex flex-col font-sans relative text-gray-900">
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-none relative">
      <div class="px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        <div class="flex items-center gap-2 sm:gap-3">
          <button @click="$router.push('/dashboard/crm')" class="text-gray-500 hover:text-[#2F2E8B] transition p-1.5 sm:p-2">
            <i class="fas fa-arrow-left"></i>
          </button>
          <div class="w-1.5 sm:w-2 h-6 sm:h-8 bg-[#2F2E8B] rounded-sm"></div>
          <div>
            <div class="flex items-center gap-1 sm:gap-2">
              <span class="text-[8px] sm:text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">CRM //</span>
              <span class="text-[8px] sm:text-[10px] font-mono font-bold text-gray-900 uppercase tracking-widest">Leads</span>
            </div>
            <h1 class="text-lg sm:text-xl font-black text-gray-900 uppercase tracking-tight">Leads</h1>
          </div>
        </div>
        <div class="flex items-center gap-2 sm:gap-3">
          <div v-if="branches.length > 0" class="relative">
            <select v-model="selectedBranch" @change="onBranchChange"
              class="appearance-none bg-white border border-gray-300 text-gray-700 py-1.5 sm:py-2 pl-2 sm:pl-3 pr-6 sm:pr-8 rounded-sm text-[10px] sm:text-xs font-mono font-bold uppercase focus:outline-none focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent cursor-pointer hover:border-[#2F2E8B] transition max-w-[120px] sm:max-w-none truncate">
              <option value="">ALL</option>
              <option v-for="branch in branches" :key="branch._id" :value="branch._id">{{ branch.name.toUpperCase() }}</option>
            </select>
          </div>
          <span class="text-[9px] sm:text-xs font-mono font-bold text-[#2F2E8B] bg-blue-50/50 border border-blue-100 px-2 sm:px-3 py-1 sm:py-1.5 flex items-center gap-1 sm:gap-2 rounded-sm uppercase truncate max-w-[120px] sm:max-w-none">
            <i class="fas fa-user-circle"></i>
            <span class="hidden sm:inline">{{ getUserEmail() || 'USER' }}</span>
          </span>
        </div>
      </div>
    </header>

    <!-- CRM Section Navigation -->
    <nav class="bg-white border-b border-gray-100 sticky top-14 sm:top-16 z-20">
      <div class="px-3 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between overflow-x-auto">
          <div class="flex items-center gap-0">
            <router-link to="/dashboard/crm/leads"
              class="flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3 text-[8px] sm:text-[10px] font-mono font-black uppercase tracking-widest border-b-2 transition-colors whitespace-nowrap"
              :class="$route.path === '/dashboard/crm/leads' ? 'border-[#2F2E8B] text-[#2F2E8B]' : 'border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300'"
            >
              <i class="fas fa-user-plus text-[8px] sm:text-[10px]"></i> Leads
            </router-link>
            <router-link to="/dashboard/crm/pipeline"
              class="flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3 text-[8px] sm:text-[10px] font-mono font-black uppercase tracking-widest border-b-2 transition-colors whitespace-nowrap"
              :class="$route.path === '/dashboard/crm/pipeline' ? 'border-[#2F2E8B] text-[#2F2E8B]' : 'border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300'"
            >
              <i class="fas fa-project-diagram text-[8px] sm:text-[10px]"></i> Events Pipeline
            </router-link>
            <router-link to="/dashboard/crm/accounts"
              class="flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3 text-[8px] sm:text-[10px] font-mono font-black uppercase tracking-widest border-b-2 transition-colors whitespace-nowrap"
              :class="$route.path === '/dashboard/crm/accounts' ? 'border-[#2F2E8B] text-[#2F2E8B]' : 'border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300'"
            >
              <i class="fas fa-building text-[8px] sm:text-[10px]"></i> Accounts
            </router-link>
          </div>
          <!-- Active/Archived Toggle — only show on leads route -->
          <div v-if="$route.path.startsWith('/dashboard/crm/leads')" class="flex items-center gap-0 flex-shrink-0 ml-4">
            <button
              @click="leadsViewRef?.setViewState('active')"
              class="px-3 py-2 text-[9px] sm:text-[10px] font-mono font-black uppercase tracking-widest border-b-2 transition-colors"
              :class="leadsViewRef?.viewState?.value === 'active' || !leadsViewRef ? 'border-[#2F2E8B] text-[#2F2E8B]' : 'border-transparent text-gray-400 hover:text-gray-700'"
            >
              <i class="fas fa-users text-[8px] sm:text-[10px] mr-1"></i> Active Leads
            </button>
            <button
              @click="leadsViewRef?.setViewState('archived')"
              class="px-3 py-2 text-[9px] sm:text-[10px] font-mono font-black uppercase tracking-widest border-b-2 transition-colors"
              :class="leadsViewRef?.viewState?.value === 'archived' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-400 hover:text-gray-700'"
            >
              <i class="fas fa-archive text-[8px] sm:text-[10px] mr-1"></i> Archived
            </button>
          </div>
          
        </div>
      </div>
    </nav>

    <div class="flex-1 w-full relative z-10 pb-24 sm:pb-40">
      <div class="px-3 sm:px-6 lg:px-8">
        <LeadsView 
          ref="leadsViewRef"
          :users="tenantUsers"
          :branch-id="safeBranchId"
          @view="viewLead"
          @edit="editLead"
          @call="openCallDialog"
          @whatsapp="openWhatsAppDialog"
          @lead-changed="loadLeads"
          @add-lead="() => openLeadModal()"
          @bulk-upload="() => { showBulkUploadModal = true; }"
          @export-leads="(filters) => exportLeads(filters)"
        />
      </div>
    </div>

    <!-- Modals -->
    <Teleport to="body">
      <LeadDetailModal v-if="showDetailModal" v-model="showDetailModal" :lead="selectedLead" :users="tenantUsers" :pipeline-stages="allPipelineStages"
        @edit="editLead" @delete="deleteLead" @archive="handleArchiveLead"
        @call="(lead) => { showDetailModal = false; setTimeout(() => openCallDialog(lead), 150); }" @whatsapp="(lead) => { showDetailModal = false; setTimeout(() => openWhatsAppDialog(lead), 150); }" @email="emailLead" @convert="convertLead" />
    </Teleport>
    <Teleport to="body">
      <BulkUploadLeadsModal v-model="showBulkUploadModal" :branch-id="safeBranchId" @imported="handleBulkImportComplete" />
    </Teleport>
    <Teleport to="body">
      <LeadConversionModal v-model="showConversionModal" :lead="selectedLeadForConversion" @converted="handleLeadConverted" />
    </Teleport>
    <Teleport to="body">
      <DocumentUploadModal v-model="showDocumentUploadModal" :linkedEntity="documentUploadLinkedEntity" @uploaded="handleDocumentUploaded" />
    </Teleport>
    <!-- Lead Form Modal (Add/Edit) -->
    <Teleport to="body">
      <div v-if="showLeadModal" class="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 backdrop-blur-sm bg-black/40">
        <div class="bg-white shadow-[0_0_50px_rgba(47,46,139,0.2)] w-full max-w-5xl max-h-[95vh] sm:max-h-[92vh] overflow-hidden flex flex-col border border-gray-200 rounded-sm">
          <!-- Modal Header -->
          <div class="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5 border-b border-gray-100 bg-white/50 backdrop-blur-md sticky top-0 z-10">
            <div class="flex items-center gap-2 sm:gap-3">
              <div class="w-1 sm:w-1.5 h-5 sm:h-6 bg-[#2F2E8B]"></div>
              <div>
                <div class="text-[8px] sm:text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.2em] mb-0.5">Lead_Protocol // {{ leadModalTitle.split(' ')[0].toUpperCase() }}</div>
                <h3 class="text-base sm:text-xl font-black text-gray-900 uppercase tracking-tight font-outfit">{{ leadModalTitle }}</h3>
              </div>
            </div>
            <button @click="closeLeadModal" class="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-gray-100 bg-white text-gray-400 hover:text-red-500 hover:border-red-500 transition-all shadow-none">
              <X :size="18" />
            </button>
          </div>

          <!-- Modal Body (Scrollable) -->
          <div class="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar relative">
            <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-[0.03]"></div>
            
            <form @submit.prevent="submitLead" class="space-y-6 sm:space-y-8 relative z-10">

              <!-- ═══════════════════════════════════════════════ -->
              <!-- COMPACT QUICK-ADD (new leads, before expand) -->
              <!-- ═══════════════════════════════════════════════ -->
              <div v-if="!showExpandedLeadForm && !leadForm.id" class="space-y-3">

                <!-- Row 1: Name* + Phone* -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input v-model="leadForm.name" required type="text" placeholder="Full Name *"
                      class="w-full bg-gray-50 border border-gray-200 px-3 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none transition placeholder:text-gray-400" />
                  </div>
                  <div>
                    <input v-model="leadForm.phone" required type="tel" placeholder="Phone Number *"
                      class="w-full bg-gray-50 border border-gray-200 px-3 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none transition placeholder:text-gray-400" />
                  </div>
                </div>

                <!-- Row 2: Email (optional) -->
                <div>
                  <input v-model="leadForm.email" type="email" placeholder="Email (optional)"
                    class="w-full bg-gray-50 border border-gray-200 px-3 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none transition placeholder:text-gray-400" />
                </div>

                <!-- Row 3: Company (optional) -->
                <div>
                  <input v-model="leadForm.company" type="text" placeholder="Company (optional)"
                    class="w-full bg-gray-50 border border-gray-200 px-3 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none transition placeholder:text-gray-400" />
                </div>

                <!-- Row 4: Location -->
                <div class="flex flex-col sm:flex-row gap-2">
                  <div class="relative flex-1">
                    <MapPin :size="14" class="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input v-model="locationSearchQuery" type="text" placeholder="Search location..."
                      class="w-full bg-gray-50 border border-gray-200 pl-9 pr-3 py-2.5 text-sm focus:border-[#2F2E8B] outline-none transition placeholder:text-gray-400"
                      @keyup.enter="searchLocation" />
                  </div>
                  <div class="flex gap-1.5 shrink-0">
                    <button type="button" @click="searchLocation" :disabled="isSearchingLocation"
                      class="px-3 py-2.5 bg-[#2F2E8B] text-white text-xs font-semibold hover:bg-[#3D2F88] transition disabled:opacity-50 whitespace-nowrap">
                      <i :class="isSearchingLocation ? 'fas fa-spinner fa-spin' : 'fas fa-search'"></i>
                      <span class="ml-1 hidden sm:inline">Search</span>
                    </button>
                    <button type="button" @click="useCurrentLocation" :disabled="isLocatingDevice"
                      class="px-3 py-2.5 border border-gray-300 text-gray-600 text-xs font-semibold hover:bg-gray-50 transition disabled:opacity-50 whitespace-nowrap">
                      <i :class="isLocatingDevice ? 'fas fa-spinner fa-spin' : 'fas fa-crosshairs'"></i>
                      <span class="ml-1 hidden sm:inline">Current</span>
                    </button>
                  </div>
                </div>

                <!-- Location results -->
                <div v-if="locationSearchResults.length > 0" class="max-h-28 overflow-y-auto border border-gray-100 bg-gray-50">
                  <div v-for="(result, idx) in locationSearchResults" :key="idx" @click="selectSearchResult(result)"
                    class="p-2 hover:bg-[#2F2E8B]/5 cursor-pointer border-b border-gray-100 last:border-b-0 text-xs font-medium text-gray-700">
                    {{ result.display_name }}
                  </div>
                </div>

                <!-- Mini map -->
                <div id="lead-map" class="w-full h-36 sm:h-44 bg-gray-100 border border-gray-200 overflow-hidden rounded"></div>

                <!-- Hidden lat/lng bindings -->
                <input v-model.number="leadForm.location.lat" type="hidden" @blur="roundLocationCoordinates" />
                <input v-model.number="leadForm.location.lng" type="hidden" @blur="roundLocationCoordinates" />

                <!-- Camera Capture -->
                <div class="flex items-center gap-3">
                  <button type="button" @click="triggerCameraCapture"
                    class="px-4 py-2.5 bg-green-600 text-white text-xs font-semibold hover:bg-green-700 transition flex items-center gap-2 rounded-sm">
                    <i class="fas fa-camera"></i>
                    Take Picture
                  </button>
                  <span v-if="capturedPhotoPreview" class="text-xs text-green-600 font-medium flex items-center gap-2">
                    <img :src="capturedPhotoPreview" class="w-10 h-10 object-cover border border-green-200 rounded-sm" />
                    Photo captured
                    <button type="button" @click="clearCapturedPhoto" class="text-red-500 hover:text-red-700 ml-1">
                      <i class="fas fa-times"></i>
                    </button>
                  </span>
                  <input ref="cameraInputRef" type="file" accept="image/*" capture="environment" class="hidden" @change="onCameraCapture" />
                </div>

                <!-- Row 4: Notes -->
                <div>
                  <textarea v-model="leadForm.notes" rows="2"
                    class="w-full bg-gray-50 border border-gray-200 px-3 py-2.5 text-sm resize-none focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none transition placeholder:text-gray-400"
                    placeholder="Notes (optional)"></textarea>
                </div>

                <!-- Expand link -->
                <div class="text-center pt-1">
                  <button type="button" @click="showExpandedLeadForm = true"
                    class="text-xs text-gray-400 hover:text-[#2F2E8B] font-medium transition-colors inline-flex items-center gap-1">
                    <ChevronDown :size="12" />
                    More fields
                  </button>
                </div>
              </div>

              <!-- ═══════════════════════════════════════════════ -->
              <!-- FULL EXPANDED FORM (edit mode OR after expand) -->
              <!-- ═══════════════════════════════════════════════ -->
              <div v-else>
                <!-- Collapse button (only in expanded add mode, not edit) -->
                <div v-if="!leadForm.id" class="flex justify-end mb-2">
                  <button type="button" @click="showExpandedLeadForm = false"
                    class="px-3 py-1.5 text-[9px] font-mono font-bold text-gray-400 hover:text-[#2F2E8B] uppercase tracking-widest flex items-center gap-1 transition-colors">
                    <ChevronUp :size="12" />
                    Compact_View
                  </button>
                </div>

              <!-- Basic Information Section -->
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                <div class="lg:col-span-3">
                  <div class="flex items-center gap-2 mb-2">
                    <div class="w-1 h-4 bg-[#2F2E8B]"></div>
                    <h4 class="text-[10px] sm:text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest">Basic_Profile</h4>
                  </div>
                  <p class="text-[9px] sm:text-[10px] font-mono text-gray-400 leading-relaxed uppercase tracking-widest">
                    Essential identity parameters and organizational links for lead qualification.
                  </p>
                </div>
                
                <div class="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div class="space-y-1.5">
                    <label class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest ml-1">Identity_Name *</label>
                    <input v-model="leadForm.name" required type="text" placeholder="FULL_LEAD_NAME"
                      class="w-full bg-gray-50/50 border border-gray-200 px-4 py-3 text-[11px] font-mono font-bold uppercase tracking-widest focus:ring-4 focus:ring-[#2F2E8B]/10 focus:border-[#2F2E8B] outline-none transition-all placeholder:text-gray-300" />
                  </div>
                  <div class="space-y-1.5">
                    <label class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest ml-1">Phone_Contact *</label>
                    <input v-model="leadForm.phone" required type="tel" placeholder="+260 XXX XXX XXX"
                      class="w-full bg-gray-50/50 border border-gray-200 px-4 py-3 text-[11px] font-mono font-bold tracking-widest focus:ring-4 focus:ring-[#2F2E8B]/10 focus:border-[#2F2E8B] outline-none transition-all placeholder:text-gray-300" />
                  </div>
                  <div class="space-y-1.5">
                    <label class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest ml-1">Email_Address</label>
                    <input v-model="leadForm.email" type="email" placeholder="COMMUNICATIONS@ENDPOINT.COM"
                      class="w-full bg-gray-50/50 border border-gray-200 px-4 py-3 text-[11px] font-mono font-bold uppercase tracking-widest focus:ring-4 focus:ring-[#2F2E8B]/10 focus:border-[#2F2E8B] outline-none transition-all placeholder:text-gray-300" />
                  </div>
                  <div class="space-y-1.5">
                    <label class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest ml-1">TPIN / Tax_ID</label>
                    <input v-model="leadForm.tpin" type="text" placeholder="TAX_PIN_NUMBER"
                      class="w-full bg-gray-50/50 border border-gray-200 px-4 py-3 text-[11px] font-mono font-bold uppercase tracking-widest focus:ring-4 focus:ring-[#2F2E8B]/10 focus:border-[#2F2E8B] outline-none transition-all placeholder:text-gray-300" />
                  </div>
                  <div class="space-y-1.5">
                    <label class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest ml-1">Organization_Link</label>
                    <input v-model="leadForm.company" type="text" placeholder="BUSINESS_ENTITY_NAME"
                      class="w-full bg-gray-50/50 border border-gray-200 px-4 py-3 text-[11px] font-mono font-bold uppercase tracking-widest focus:ring-4 focus:ring-[#2F2E8B]/10 focus:border-[#2F2E8B] outline-none transition-all placeholder:text-gray-300" />
                  </div>
                  <div class="sm:col-span-2 space-y-1.5">
                    <label class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest ml-1">Executive_Role</label>
                    <input v-model="leadForm.position" type="text" placeholder="e.g., CEO, OPERATIONS_MANAGER, SALES_DIRECTOR"
                      class="w-full bg-gray-50/50 border border-gray-200 px-4 py-3 text-[11px] font-mono font-bold uppercase tracking-widest focus:ring-4 focus:ring-[#2F2E8B]/10 focus:border-[#2F2E8B] outline-none transition-all placeholder:text-gray-300" />
                  </div>
                </div>
              </div>

              <!-- Lead Details Section -->
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 pt-8 sm:pt-10 border-t border-dashed border-gray-100">
                <div class="lg:col-span-3">
                  <div class="flex items-center gap-2 mb-2">
                    <div class="w-1 h-4 bg-[#2F2E8B]"></div>
                    <h4 class="text-[10px] sm:text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest">Pipeline_Status</h4>
                  </div>
                  <p class="text-[10px] font-mono text-gray-400 leading-relaxed uppercase tracking-widest">
                    Strategic metrics for pipeline forecasting and prioritization.
                  </p>
                </div>
                
                <div class="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div class="space-y-1.5">
                    <label class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest ml-1">Priority_Rank</label>
                    <div class="relative">
                      <select v-model="leadForm.priority"
                        class="w-full appearance-none bg-gray-50/50 border border-gray-200 px-4 py-3 text-[11px] font-mono font-black uppercase tracking-widest focus:ring-4 focus:ring-[#2F2E8B]/10 focus:border-[#2F2E8B] outline-none transition-all cursor-pointer">
                        <option value="">SELECT_PRIORITY</option>
                        <option value="hot" class="text-red-500 font-black">// HOT_LEAD</option>
                        <option value="warm" class="text-orange-500 font-black">// WARM_LEAD</option>
                        <option value="cold" class="text-blue-500 font-black">// COLD_LEAD</option>
                      </select>
                      <Plus :size="12" class="absolute right-4 top-1/2 -translate-y-1/2 text-[#2F2E8B] pointer-events-none" />
                    </div>
                  </div>
                  <div class="space-y-1.5">
                    <label class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest ml-1">Current_Stage</label>
                    <div class="relative">
                      <select v-model="leadForm.stage" 
                        class="w-full appearance-none bg-gray-50/50 border border-gray-200 px-4 py-3 text-[11px] font-mono font-black uppercase tracking-widest focus:ring-4 focus:ring-[#2F2E8B]/10 focus:border-[#2F2E8B] outline-none transition-all cursor-pointer">
                        <option v-for="stage in allPipelineStages" :key="stage.id" :value="stage.id">{{ stage.name.toUpperCase() }}</option>
                      </select>
                      <Plus :size="12" class="absolute right-4 top-1/2 -translate-y-1/2 text-[#2F2E8B] pointer-events-none" />
                    </div>
                  </div>
                  <div class="space-y-1.5">
                    <label class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest ml-1">Projected_Valuation</label>
                    <input v-model.number="leadForm.value" type="number" min="0" step="0.01" placeholder="0.00"
                      class="w-full bg-gray-50/50 border border-gray-200 px-4 py-3 text-[11px] font-mono font-black tracking-widest focus:ring-4 focus:ring-[#2F2E8B]/10 focus:border-[#2F2E8B] outline-none transition-all" />
                  </div>
                  <div class="md:col-span-3 space-y-1.5">
                    <label class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest ml-1">Submission_Timestamp (Backdate_Override)</label>
                    <input v-model="leadForm.created_at" type="datetime-local"
                      class="w-full bg-gray-50/50 border border-gray-200 px-4 py-3 text-[11px] font-mono font-bold uppercase tracking-widest focus:ring-4 focus:ring-[#2F2E8B]/10 focus:border-[#2F2E8B] outline-none transition-all" />
                  </div>
                </div>
              </div>

              <!-- Location & Regional Parameters -->
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 pt-8 sm:pt-10 border-t border-dashed border-gray-100">
                <div class="lg:col-span-3">
                  <div class="flex items-center gap-2 mb-2">
                    <div class="w-1 h-4 bg-[#2F2E8B]"></div>
                    <h4 class="text-[10px] sm:text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest">Regional_Mapping</h4>
                  </div>
                  <p class="text-[10px] font-mono text-gray-400 leading-relaxed uppercase tracking-widest">
                    Geospatial positioning and digital presence endpoints.
                  </p>
                </div>
                
                <div class="lg:col-span-9 space-y-6">
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div class="space-y-1.5">
                      <label class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest ml-1">City_Zone</label>
                      <input v-model="leadForm.city" type="text" placeholder="LUSAKA, NYC, LONDON..." 
                        class="w-full bg-gray-50/50 border border-gray-200 px-4 py-3 text-[10px] font-mono font-bold uppercase tracking-widest focus:border-[#2F2E8B] outline-none transition-all" />
                    </div>
                    <div class="space-y-1.5">
                      <label class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest ml-1">Jurisdiction</label>
                      <input v-model="leadForm.country" type="text" placeholder="ZAMBIA, USA, UK..."
                        class="w-full bg-gray-50/50 border border-gray-200 px-4 py-3 text-[10px] font-mono font-bold uppercase tracking-widest focus:border-[#2F2E8B] outline-none transition-all" />
                    </div>
                    <div class="space-y-1.5">
                      <label class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest ml-1">Digital_Asset (URL)</label>
                      <div class="relative">
                        <Globe :size="12" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input v-model="leadForm.website" type="url" placeholder="WWW.DOMAIN.COM"
                          class="w-full bg-gray-50/50 border border-gray-200 pl-9 pr-4 py-3 text-[10px] font-mono font-bold uppercase tracking-widest focus:border-[#2F2E8B] outline-none transition-all" />
                      </div>
                    </div>
                  </div>

                  <!-- Professional Networks -->
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div class="space-y-1.5">
                      <label class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest ml-1">Linkedin_Vector</label>
                      <input v-model="leadForm.linkedin" type="url" placeholder="LINKEDIN.COM/IN/..."
                        class="w-full bg-gray-50/50 border border-gray-200 px-4 py-3 text-[10px] font-mono font-bold uppercase tracking-widest focus:border-[#2F2E8B] outline-none transition-all" />
                    </div>
                    <div class="space-y-1.5">
                      <label class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest ml-1">Network_Alias (X/FB)</label>
                      <input v-model="leadForm.twitter" type="text" placeholder="@USERNAME"
                        class="w-full bg-gray-50/50 border border-gray-200 px-4 py-3 text-[10px] font-mono font-bold uppercase tracking-widest focus:border-[#2F2E8B] outline-none transition-all" />
                    </div>
                    <div class="space-y-1.5">
                      <label class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest ml-1">Social_Endpoint</label>
                      <input v-model="leadForm.facebook" type="text" placeholder="FACEBOOK/INSTAGRAM..."
                        class="w-full bg-gray-50/50 border border-gray-200 px-4 py-3 text-[10px] font-mono font-bold uppercase tracking-widest focus:border-[#2F2E8B] outline-none transition-all" />
                    </div>
                  </div>

                  <!-- Business Location Interactive Matrix -->
                  <div class="space-y-3 pt-4">
                    <label class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest ml-1 flex items-center gap-2">
                       <MapPin :size="12" /> Geospatial_Interactive_Matrix
                    </label>
                    <div class="flex flex-col sm:flex-row gap-2">
                      <div class="relative flex-1">
                        <Search :size="13" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input v-model="locationSearchQuery" type="text" placeholder="SEARCH PLACE, ROAD, SUBURB, CITY..."
                          class="w-full bg-gray-50/50 border border-gray-200 pl-10 pr-4 py-3 text-[10px] font-mono font-bold uppercase tracking-widest focus:border-[#2F2E8B] outline-none transition-all"
                          @keyup.enter="searchLocation" />
                      </div>
                      <button type="button" @click="searchLocation"
                        class="px-6 py-3 bg-[#2F2E8B] text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                        :disabled="isSearchingLocation">
                        <i :class="isSearchingLocation ? 'fas fa-spinner fa-spin' : 'fas fa-search'"></i>
                        {{ isSearchingLocation ? 'PROCESSING...' : 'LOCATE_UNIT' }}
                      </button>
                      <button type="button" @click="useCurrentLocation"
                        class="px-6 py-3 border border-[#2F2E8B] text-[#2F2E8B] hover:bg-[#2F2E8B] hover:text-white text-[10px] font-mono font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                        :disabled="isLocatingDevice"
                        title="Use my current GPS location">
                        <i :class="isLocatingDevice ? 'fas fa-spinner fa-spin' : 'fas fa-crosshairs'"></i>
                        {{ isLocatingDevice ? 'LOCATING...' : 'USE_MY_LOCATION' }}
                      </button>
                    </div>

                    <div v-if="locationSearchResults.length > 0" class="max-h-40 overflow-y-auto border border-gray-100 bg-gray-50/50 scrollbar-thin">
                      <div v-for="(result, idx) in locationSearchResults" :key="idx" @click="selectSearchResult(result)"
                        class="p-3 hover:bg-[#2F2E8B]/5 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors">
                        <div class="text-[10px] font-mono font-black text-gray-800 uppercase tracking-tight">{{ result.display_name }}</div>
                      </div>
                    </div>

                    <div id="lead-map" class="w-full h-80 bg-gray-100 border border-gray-200 overflow-hidden shadow-inner grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"></div>
                    
                    <div class="flex gap-4">
                      <div class="flex-1 space-y-1">
                        <span class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest ml-1">Latitude_X</span>
                        <input v-model.number="leadForm.location.lat" type="number" step="0.00001" placeholder="0.00000"
                          @blur="roundLocationCoordinates" class="w-full bg-gray-50/50 border border-gray-200 px-4 py-2 text-[10px] font-mono font-black text-[#2F2E8B] tracking-widest focus:border-[#2F2E8B] outline-none" />
                      </div>
                      <div class="flex-1 space-y-1">
                        <span class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest ml-1">Longitude_Y</span>
                        <input v-model.number="leadForm.location.lng" type="number" step="0.00001" placeholder="0.00000"
                          @blur="roundLocationCoordinates" class="w-full bg-gray-50/50 border border-gray-200 px-4 py-2 text-[10px] font-mono font-black text-[#2F2E8B] tracking-widest focus:border-[#2F2E8B] outline-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Operational Information -->
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 pt-8 sm:pt-10 border-t border-dashed border-gray-100">
                <div class="lg:col-span-3">
                  <div class="flex items-center gap-2 mb-2">
                    <div class="w-1 h-4 bg-[#2F2E8B]"></div>
                    <h4 class="text-[10px] sm:text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest">Location_GeoData</h4>
                  </div>
                  <p class="text-[10px] font-mono text-gray-400 leading-relaxed uppercase tracking-widest">
                    Acquisition parameters and resource assignment.
                  </p>
                </div>
                
                <div class="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div class="space-y-1.5">
                    <label class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest ml-1">Acquisition_Source</label>
                    <div class="relative">
                      <input v-model="leadForm.source" type="text" list="lead-source-options"
                        placeholder="SELECT_OR_PROTO_INPUT..."
                        class="w-full bg-gray-50/50 border border-gray-200 px-4 py-3 text-[10px] font-mono font-bold uppercase tracking-widest focus:border-[#2F2E8B] outline-none transition-all" />
                      <datalist id="lead-source-options">
                        <option value="Website">WEBSITE_LINK</option>
                        <option value="WhatsApp">WHATSAPP_PROTOCOL</option>
                        <option value="Email">DIRECT_EMAIL</option>
                        <option value="Phone Call">TELE_COMM</option>
                        <option value="Referral">NETWORK_REFERRAL</option>
                        <option value="Event">STRATEGIC_EVENT</option>
                        <option value="Social Media">SOCIAL_NETWORK</option>
                        <option value="LinkedIn">LINKEDIN_PROFESSIONAL</option>
                        <option value="Partner">PARTNER_AFFILIATE</option>
                      </datalist>
                    </div>
                  </div>
                  <div class="space-y-1.5">
                    <label class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest ml-1">Resource_Assignment</label>
                    <div v-if="!canAssignCrm" class="px-4 py-3 bg-gray-50 border border-dashed border-gray-200 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                      Assignment locked to your scope
                    </div>
                    <div v-else class="relative">
                      <div class="relative">
                        <input v-model="assignToSearch" type="text" placeholder="INITIALIZE_USER_SEARCH..."
                          @focus="showAssignToDropdown = true"
                          class="w-full bg-gray-50/50 border border-gray-200 px-4 py-3 text-[10px] font-mono font-bold uppercase tracking-widest focus:border-[#2F2E8B] outline-none transition-all" />
                        <div v-if="showAssignToDropdown && filteredAssignToUsers.length > 0"
                          class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 shadow-2xl z-[60] max-h-64 overflow-y-auto scrollbar-thin">
                          <button v-for="user in filteredAssignToUsers" :key="user.email" type="button" @click="selectAssignTo(user)"
                            class="w-full text-left px-4 py-3 hover:bg-[#2F2E8B]/5 transition-colors flex items-center gap-3 border-b border-gray-50 last:border-b-0 group">
                            <div class="w-8 h-8 flex items-center justify-center bg-gray-50 border border-gray-100 text-[#2F2E8B] group-hover:bg-[#2F2E8B] group-hover:text-white transition-all text-xs font-mono font-black">
                              {{ getUserInitials(user.email) }}
                            </div>
                            <div class="flex-1 min-w-0">
                              <div class="text-[10px] font-mono font-black text-gray-900 truncate uppercase tracking-tight">{{ user.email }}</div>
                              <div class="text-[8px] font-mono text-gray-400 capitalize tracking-widest">{{ user.role || 'GUEST_USER' }}</div>
                            </div>
                          </button>
                        </div>
                      </div>
                      
                      <div v-if="leadForm.assignedTo" class="mt-3 p-3 bg-blue-50/50 border border-blue-100 flex items-center justify-between group animate-in slide-in-from-top-1 duration-300">
                        <div class="flex items-center gap-3">
                          <div class="w-8 h-8 flex items-center justify-center bg-[#2F2E8B] text-white text-[10px] font-mono font-black">
                            {{ getUserInitials(leadForm.assignedTo) }}
                          </div>
                          <div>
                            <div class="text-[10px] font-mono font-black text-[#2F2E8B] uppercase tracking-tight">{{ leadForm.assignedTo }}</div>
                            <div class="text-[8px] font-mono text-gray-400 uppercase tracking-widest">{{ getAssignedUserRole(leadForm.assignedTo) }}</div>
                          </div>
                        </div>
                        <button type="button" @click="leadForm.assignedTo = ''; assignToSearch = ''" class="text-gray-300 hover:text-red-500 transition-colors">
                          <X :size="14" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="sm:col-span-2 space-y-1.5">
                    <label class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest ml-1">Qualitative_Notes</label>
                    <textarea v-model="leadForm.notes" rows="4" 
                      class="w-full bg-gray-50/50 border border-gray-200 px-4 py-3 text-[10px] font-mono font-bold uppercase tracking-widest focus:border-[#2F2E8B] outline-none transition-all scrollbar-thin" 
                      placeholder="INITIALIZE_QUALITATIVE_SUMMARY..."></textarea>
                  </div>
                </div>
              </div>

              <!-- Historical Assets -->
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 pt-8 sm:pt-10 border-t border-dashed border-gray-100">
                <div class="lg:col-span-3">
                  <div class="flex items-center gap-2 mb-2">
                    <div class="w-1 h-4 bg-[#2F2E8B]"></div>
                    <h4 class="text-[10px] sm:text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest">Digital_Footprint</h4>
                  </div>
                  <p class="text-[10px] font-mono text-gray-400 leading-relaxed uppercase tracking-widest">
                    Linked documentation and historical repository.
                  </p>
                </div>
                <div class="lg:col-span-9">
                  <!-- EDIT MODE: full widget with view/download/unlink + attach -->
                  <LinkedDocumentsWidget
                    v-if="leadForm.id"
                    recordType="lead"
                    :recordId="leadForm.id"
                    :recordName="leadForm.name"
                  />

                  <!-- CREATE MODE: stage files locally, upload after lead is created -->
                  <div v-else class="space-y-3">
                    <div class="flex items-center justify-between mb-2">
                      <div class="flex items-center gap-2">
                        <div class="w-1 h-3 bg-[#2F2E8B]"></div>
                        <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">STAGED_ASSETS</h4>
                        <span class="text-[9px] font-mono font-black text-[#2F2E8B]">[{{ pendingLeadDocuments.length }}]</span>
                      </div>
                      <label class="px-3 py-1 bg-green-600 text-white text-[9px] font-mono font-black uppercase tracking-widest hover:bg-green-700 transition flex items-center gap-2 cursor-pointer">
                        <i class="fas fa-camera"></i>
                        PICTURE
                        <input type="file" accept="image/*" capture="environment" class="hidden" @change="onCameraCapture" />
                      </label>
                      <label class="px-3 py-1 bg-[#2F2E8B] text-white text-[9px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] transition flex items-center gap-2 cursor-pointer">
                        <Plus :size="10" />
                        ATTACH_NODE
                        <input type="file" multiple class="hidden" @change="onPendingDocsFileSelect" />
                      </label>
                    </div>

                    <div v-if="pendingLeadDocuments.length === 0" class="text-center py-10 bg-gray-50/50 border border-dashed border-gray-200">
                      <CloudUpload :size="24" class="text-gray-300 mx-auto mb-2" />
                      <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">NO_ASSETS_STAGED</p>
                      <p class="text-[9px] font-mono text-gray-300 uppercase tracking-widest">Files will upload after the lead is saved.</p>
                    </div>

                    <div v-else class="space-y-2">
                      <div
                        v-for="item in pendingLeadDocuments"
                        :key="item.id"
                        class="flex items-center justify-between gap-2 p-3 bg-white border border-gray-100 hover:border-[#2F2E8B]/30 transition"
                      >
                        <div class="flex items-center gap-3 flex-1 min-w-0">
                          <div class="w-8 h-8 bg-gray-50 border border-gray-100 flex items-center justify-center text-[#2F2E8B] flex-shrink-0">
                            <FileText :size="16" />
                          </div>
                          <div class="flex-1 min-w-0">
                            <input v-model="item.name" class="w-full text-[10px] font-mono font-black text-gray-900 uppercase tracking-tight bg-transparent border-0 border-b border-transparent hover:border-gray-200 focus:border-[#2F2E8B] outline-none px-0" />
                            <div class="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[8px] font-mono text-gray-400 mt-1 uppercase tracking-tighter">
                              <select v-model="item.category" class="font-black text-[#2F2E8B] bg-transparent border-0 outline-none cursor-pointer">
                                <option value="contract">CONTRACT</option>
                                <option value="invoice">INVOICE</option>
                                <option value="proposal">PROPOSAL</option>
                                <option value="quotation">QUOTATION</option>
                                <option value="presentation">PRESENTATION</option>
                                <option value="report">REPORT</option>
                                <option value="agreement">AGREEMENT</option>
                                <option value="id_document">ID_DOCUMENT</option>
                                <option value="other">OTHER</option>
                              </select>
                              <span class="text-gray-300">//</span>
                              <span>{{ formatPendingFileSize(item.file.size) }}</span>
                              <span class="text-gray-300">//</span>
                              <span class="text-amber-600 font-bold">PENDING_UPLOAD</span>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          @click="removePendingLeadDocument(item.id)"
                          class="p-1.5 text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition flex-shrink-0"
                          title="Remove"
                        >
                          <Trash2 :size="12" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
              <!-- END expanded form wrapper -->
            </form>
          </div>

          <!-- Modal Action Bar -->
          <div class="px-4 sm:px-8 py-4 sm:py-5 border-t border-gray-100 bg-gray-50/50 flex flex-wrap justify-end items-center gap-2 sm:gap-3 sticky bottom-0 z-10 backdrop-blur-md">
            <!-- Convert Lead (Edit mode only) -->
            <button v-if="leadForm.id" type="button" @click="convertLead({ ...leadForm })" :disabled="isSubmitting"
              class="mr-auto px-5 py-2.5 border border-emerald-500 text-emerald-600 hover:bg-emerald-50 text-[10px] font-mono font-black uppercase tracking-widest transition-all flex items-center gap-2 disabled:opacity-50">
              <RefreshCw :size="12" />
              CONVERT_TO_DEAL
            </button>
            <button type="button" @click="closeLeadModal" 
              class="px-6 py-2.5 border border-gray-200 text-gray-400 hover:text-gray-900 hover:bg-white text-[10px] font-mono font-black uppercase tracking-widest transition-all">
              PROTOCOL_ABORT
            </button>
            <button @click="submitLead" :disabled="isSubmitting" 
              class="px-8 py-2.5 bg-[#2F2E8B] text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] disabled:opacity-50 transition-all flex items-center gap-2 shadow-lg shadow-[#2F2E8B]/20">
              <Save v-if="!isSubmitting" :size="14" />
              <Loader2 v-else class="animate-spin" :size="14" />
              {{ isSubmitting ? 'PROCESSING_SAVE...' : (leadForm.id ? 'COMMIT_UPDATE' : 'INITIALIZE_LEAD') }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Call Lead Modal - Dark Blue Theme -->
    <Teleport to="body">
      <div v-if="showCallDialog" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center z-[100001] p-4 pt-[8vh]" @click.self="closeCallDialog">
        <div class="bg-white shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto flex flex-col animate-modal-in rounded-lg border border-[#2F2E8B]/20">
          <!-- Header -->
          <div class="bg-[#2F2E8B] px-4 py-2.5 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <div class="w-7 h-7 bg-[#3D3A9E] rounded-full flex items-center justify-center">
                <i class="fas fa-phone-alt text-white text-[11px]"></i>
              </div>
              <div>
                <span class="text-[10px] font-mono font-black text-blue-200 uppercase tracking-widest leading-none">Call // Session</span>
                <h3 class="text-[12px] font-black text-white uppercase tracking-tight">{{ callDialogLead?.name || 'Lead' }}</h3>
                <div class="text-[8px] font-mono text-blue-300 uppercase tracking-wider leading-none">{{ callDialogLead?.company || '' }}</div>
              </div>
            </div>
            <button @click="closeCallDialog" class="w-6 h-6 flex items-center justify-center text-blue-300 hover:text-white transition rounded-sm hover:bg-[#3D3A9E]">
              <i class="fas fa-times text-sm"></i>
            </button>
          </div>

          <div class="p-3.5 space-y-3">
            <!-- Phone Action -->
            <div class="bg-[#2F2E8B]/5 border border-[#2F2E8B]/20 p-3 flex items-center justify-between gap-3 rounded">
              <div>
                <div class="text-[8px] font-mono font-bold text-[#2F2E8B] uppercase tracking-widest">Phone Number</div>
                <div class="text-[13px] font-black text-gray-900 font-mono mt-0.5 break-all">{{ callDialogLead?.phone || 'No number on file' }}</div>
              </div>
              <a v-if="callDialogLead?.phone" :href="`tel:${callDialogLead.phone}`" class="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#2F2E8B] hover:bg-[#3D3A9E] text-white text-[9px] font-mono font-black uppercase tracking-widest transition-colors rounded">
                <i class="fas fa-phone text-[10px]"></i> Initiate Call
              </a>
            </div>

            <!-- Talking Points Checklist -->
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <h4 class="text-[9px] font-mono font-black text-gray-600 uppercase tracking-widest flex items-center gap-1">
                  <i class="fas fa-list-check text-[#2F2E8B] text-[10px]"></i> Talking Points
                </h4>
                <button type="button" @click="resetCallTalkingPoints" class="text-[8px] font-mono font-bold text-gray-400 hover:text-[#2F2E8B] uppercase tracking-wider">Reset</button>
              </div>
              <div class="space-y-1 max-h-36 overflow-y-auto custom-scrollbar pr-1">
                <label v-for="(point, idx) in callTalkingPoints" :key="idx" class="flex items-start gap-1.5 p-1.5 border border-gray-100 hover:border-[#2F2E8B]/30 hover:bg-[#2F2E8B]/5 cursor-pointer transition-colors rounded">
                  <input type="checkbox" v-model="point.done" class="mt-0.5 rounded-sm text-[#2F2E8B] focus:ring-[#2F2E8B] border-gray-300 w-3 h-3" />
                  <span class="text-[10px] text-gray-700 font-mono uppercase tracking-tight leading-snug" :class="{ 'line-through text-gray-400': point.done }">{{ point.text }}</span>
                </label>
              </div>
              <div class="flex gap-1.5 mt-1.5">
                <input v-model="newCallTalkingPoint" @keyup.enter="addCallTalkingPoint" type="text" placeholder="ADD CUSTOM TALKING POINT..." class="flex-1 border border-gray-200 focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] px-2 py-1.5 text-[10px] font-mono uppercase rounded-sm outline-none bg-gray-50" />
                <button type="button" @click="addCallTalkingPoint" class="px-2.5 py-1.5 bg-[#2F2E8B] hover:bg-[#3D3A9E] text-white text-[9px] font-mono font-black uppercase rounded-sm transition">
                  <i class="fas fa-plus text-[10px]"></i>
                </button>
              </div>
            </div>

            <!-- Call Outcome + Duration -->
            <div class="grid grid-cols-2 gap-2.5">
              <div>
                <label class="block text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1">Outcome</label>
                <select v-model="callOutcome" class="w-full border border-gray-200 focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] px-2 py-1.5 text-[10px] font-mono uppercase rounded-sm outline-none bg-gray-50">
                  <option value="connected">CONNECTED</option>
                  <option value="voicemail">VOICEMAIL</option>
                  <option value="no_answer">NO ANSWER</option>
                  <option value="busy">BUSY</option>
                  <option value="follow_up">FOLLOW-UP NEEDED</option>
                  <option value="not_interested">NOT INTERESTED</option>
                </select>
              </div>
              <div>
                <label class="block text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1">Duration (Min)</label>
                <input v-model.number="callDuration" type="number" min="0" step="0.5" placeholder="0" class="w-full border border-gray-200 focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] px-2 py-1.5 text-[10px] font-mono rounded-sm outline-none bg-gray-50" />
              </div>
            </div>

            <!-- Call Notes -->
            <div>
              <label class="block text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1 flex items-center gap-1">
                <i class="fas fa-pen text-[#2F2E8B] text-[10px]"></i> Call Notes
              </label>
              <textarea v-model="callNotes" rows="2" placeholder="WHAT WAS DISCUSSED, NEXT STEPS, OBJECTIONS..." class="w-full border border-gray-200 focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] px-2 py-1.5 text-[10px] font-mono rounded-sm outline-none bg-gray-50 resize-none"></textarea>
              <p class="text-[8px] font-mono text-gray-400 mt-0.5 uppercase tracking-wider flex items-center gap-1">
                <i class="fas fa-info-circle text-[#2F2E8B] text-[9px]"></i> Saved to lead profile and visible in activity log.
              </p>
            </div>
          </div>

          <div class="flex items-center justify-end gap-2 px-3.5 py-2.5 border-t border-gray-100 bg-gray-50/50">
            <button type="button" @click="closeCallDialog" class="px-3.5 py-1.5 border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 rounded-sm transition text-[9px] font-mono font-black uppercase tracking-widest">Cancel</button>
            <button type="button" @click="saveCallDialogNote" :disabled="!callDialogLead" class="px-4 py-1.5 bg-[#2F2E8B] hover:bg-[#3D3A9E] disabled:opacity-50 text-white rounded-sm transition text-[9px] font-mono font-black uppercase tracking-widest flex items-center justify-center gap-1.5">
              <i class="fas fa-save"></i>
              Save Note & Log Call
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- WhatsApp Modal - Dark Blue Theme -->
    <Teleport to="body">
      <div v-if="showWhatsAppDialog" class="fixed inset-0 z-[200] flex items-start justify-center pt-[20vh] bg-black/40 backdrop-blur-[2px]" @click.self="showWhatsAppDialog = false">
        <div class="bg-white shadow-2xl w-full max-w-sm rounded-lg border border-[#2F2E8B]/20 overflow-hidden animate-in zoom-in-95 duration-200">
          <div class="bg-[#2F2E8B] px-4 py-2.5 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-6 h-6 bg-[#3D3A9E] rounded-full flex items-center justify-center">
                <i class="fas fa-whatsapp text-white text-[12px]"></i>
              </div>
              <div>
                <span class="text-[11px] font-mono font-black text-white uppercase tracking-widest">WhatsApp // Message</span>
                <div class="text-[7px] font-mono font-bold text-blue-200 uppercase tracking-widest">{{ whatsAppDialogLead?.name || 'CONTACT' }} <span v-if="whatsAppDialogLead?.phone">· {{ whatsAppDialogLead.phone }}</span></div>
              </div>
            </div>
            <button @click="showWhatsAppDialog = false" class="w-5 h-5 flex items-center justify-center text-blue-300 hover:text-white rounded-sm hover:bg-[#3D3A9E] transition-colors">
              <i class="fas fa-times text-[11px]"></i>
            </button>
          </div>
          <div class="p-3.5 space-y-3">
            <div class="flex items-center gap-2 text-[10px] font-mono font-bold text-gray-600 uppercase tracking-widest bg-[#2F2E8B]/5 px-2.5 py-1.5 rounded-sm border border-[#2F2E8B]/10">
              <i class="fas fa-whatsapp text-[#2F2E8B] text-[11px]"></i>
              <span>Send to {{ whatsAppDialogLead?.phone || 'N/A' }}</span>
            </div>
            <textarea v-model="whatsAppMessage" rows="3" placeholder="Type your WhatsApp message..." class="w-full border border-gray-200 bg-gray-50 px-3 py-2 text-[11px] font-mono text-gray-700 outline-none focus:border-[#2F2E8B] focus:bg-[#2F2E8B]/5 resize-none rounded-sm transition-colors"></textarea>
            <div class="bg-[#2F2E8B]/5 border border-[#2F2E8B]/10 px-3 py-2 rounded">
              <p class="text-[8px] font-mono font-bold text-[#2F2E8B] uppercase tracking-widest flex items-center gap-1.5">
                <i class="fas fa-info-circle text-[9px]"></i> Message logged to lead activity.
              </p>
            </div>
          </div>
          <div class="px-3.5 py-2.5 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between gap-2">
            <a v-if="whatsAppDialogLead?.phone" :href="'https://wa.me/' + whatsAppDialogLead.phone.replace(/[^0-9]/g, '')" target="_blank" class="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-[9px] font-mono font-black uppercase tracking-widest transition-all flex items-center gap-1.5 rounded-sm shadow-none">
              <i class="fab fa-whatsapp text-[11px]"></i> Open WhatsApp
            </a>
            <div class="flex items-center gap-2">
              <button @click="showWhatsAppDialog = false" class="px-3 py-1.5 text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest hover:text-gray-700 transition-colors">Cancel</button>
              <button @click="proceedWithWhatsApp" class="px-4 py-1.5 bg-[#2F2E8B] hover:bg-[#3D3A9E] text-white text-[9px] font-mono font-black uppercase tracking-widest transition-all flex items-center gap-1.5 rounded-sm shadow-none">
                <i class="fas fa-save text-[10px]"></i> Save Text
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { BackButton } from '@/components/ui'
import { ref, onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { useCRMModule } from './composables/CRMModule.js';
import LeadsView from './components/LeadsView.vue';
import LeadDetailModal from './components/LeadDetailModal.vue';
import BulkUploadLeadsModal from './components/BulkUploadLeadsModal.vue';
import LeadConversionModal from './components/LeadConversionModal.vue';
import DocumentUploadModal from './components/DocumentUploadModal.vue';

import LinkedDocumentsWidget from './components/LinkedDocumentsWidget.vue';

import { useActivityTracker } from '@/config/useActivityTracker.js';
import { X, Search, MapPin, User, Save, Globe, Info, Plus, Loader2, Paperclip, FileText, Trash2, CloudUpload, RefreshCw, ChevronDown, ChevronUp, Phone } from 'lucide-vue-next';

// Call Session Dialog state
const showCallDialog = ref(false);
const callDialogLead = ref(null);
const callOutcome = ref('connected');
const callDuration = ref(0);
const callNotes = ref('');
const callTalkingPoints = ref([]);
const newCallTalkingPoint = ref('');
const DEFAULT_CALL_TALKING_POINTS = [
  'Confirm decision-maker & best time to talk',
  'Recap previous interaction / context',
  'Identify pain points & current situation',
  'Pitch tailored value proposition',
  'Discuss budget, timeline, authority',
  'Address objections',
  'Confirm next step (demo / proposal / follow-up date)'
];

function openCallDialog(lead) {
  callDialogLead.value = lead;
  callOutcome.value = 'connected';
  callDuration.value = 0;
  callNotes.value = '';
  callTalkingPoints.value = DEFAULT_CALL_TALKING_POINTS.map(t => ({ text: t, done: false }));
  newCallTalkingPoint.value = '';
  showCallDialog.value = true;
}

function closeCallDialog() {
  showCallDialog.value = false;
}

// ── WhatsApp Dialog ──
const showWhatsAppDialog = ref(false);
const whatsAppMessage = ref('');
const whatsAppDialogLead = ref(null);

function openWhatsAppDialog(lead) {
  whatsAppDialogLead.value = lead;
  whatsAppMessage.value = '';
  showWhatsAppDialog.value = true;
}

function proceedWithWhatsApp() {
  if (!whatsAppDialogLead.value) return;
  const msg = whatsAppMessage.value?.trim() || '';
  import('@/services/crm_api.js').then(crmApi => {
    crmApi.logLeadActivity(whatsAppDialogLead.value.id, {
      tenant_id: getTenantId(),
      action: 'WhatsApp',
      notes: 'WhatsApp message to ' + whatsAppDialogLead.value.name + (msg ? ' | Message: ' + msg : ''),
      timestamp: new Date().toISOString()
    }).catch(() => {});
  });
  showWhatsAppDialog.value = false;
}

function resetCallTalkingPoints() {
  callTalkingPoints.value.forEach(p => { p.done = false; });
}

function addCallTalkingPoint() {
  const t = (newCallTalkingPoint.value || '').trim();
  if (!t) return;
  callTalkingPoints.value.push({ text: t, done: false });
  newCallTalkingPoint.value = '';
}

function saveCallDialogNote() {
  if (!callDialogLead.value) return;
  const donePoints = callTalkingPoints.value.filter(p => p.done).map(p => p.text);
  const parts = [];
  if (donePoints.length) parts.push('TALKING POINTS: ' + donePoints.join(', '));
  if (callNotes.value?.trim()) parts.push('NOTES: ' + callNotes.value.trim());
  parts.push('OUTCOME: ' + callOutcome.value + ' | DURATION: ' + (callDuration.value || 0) + 'min');
  const notes = parts.join(' | ');
  import('@/services/crm_api.js').then(crmApi => {
    crmApi.logLeadActivity(callDialogLead.value.id, {
      tenant_id: getTenantId(),
      action: 'Phone Call',
      notes: 'Call session with ' + callDialogLead.value.name + (callDialogLead.value.phone ? ' (' + callDialogLead.value.phone + ')' : '') + ' | ' + notes,
      timestamp: new Date().toISOString()
    }).catch(() => {});
  });
  showCallDialog.value = false;
  callLead(callDialogLead.value);
}


const {
  branches, selectedBranch, safeBranchId, onBranchChange,getTenantId, getUserEmail, tenantUsers, activeTab,
  viewLead, editLead, callLead, whatsappLead, emailLead, loadLeads, openLeadModal,
  showBulkUploadModal, exportLeads, showDetailModal,
  selectedLead, showConversionModal, selectedLeadForConversion, convertLead,
  handleLeadConverted, handleBulkImportComplete, handleAddNote, handleAddActivity,
  openDocumentUploadForLead, handleDocumentUploaded, showDocumentUploadModal,
  documentUploadLinkedEntity, goToModule, deleteLead,
  showLeadModal, leadModalTitle, leadForm, closeLeadModal, submitLead, isSubmitting,
  assignToSearch, showAssignToDropdown, filteredAssignToUsers, selectAssignTo, canAssignCrm,
  getUserInitials, getAssignedUserRole,
  locationSearchQuery, searchLocation, isSearchingLocation, locationSearchResults,
  selectSearchResult, roundLocationCoordinates, allPipelineStages,
  useCurrentLocation, isLocatingDevice,
  pendingLeadDocuments, addPendingLeadDocument, removePendingLeadDocument,
  leads
} = useCRMModule();

// Quick-add mode: start compact (4 fields), expandable to full form
const showExpandedLeadForm = ref(false);
const leadsViewRef = ref(null);

// Camera capture for quick-add
const cameraInputRef = ref(null);
const capturedPhotoPreview = ref(null);

function triggerCameraCapture() {
  cameraInputRef.value?.click();
}

function clearCapturedPhoto() {
  capturedPhotoPreview.value = null;
}

// Reset expanded state when modal opens/closes
watch(showLeadModal, (val) => {
  if (!val) showExpandedLeadForm.value = false;
});

function onPendingDocsFileSelect(event) {
  const files = Array.from(event.target.files || []);
  files.forEach(file => addPendingLeadDocument(file, { name: file.name, category: 'other' }));
  event.target.value = '';
}

function onCameraCapture(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  addPendingLeadDocument(file, { name: 'CAMERA_' + Date.now(), category: 'photo' });
  // Show preview
  const reader = new FileReader();
  reader.onload = (e) => { capturedPhotoPreview.value = e.target.result; };
  reader.readAsDataURL(file);
  event.target.value = '';
}

function formatPendingFileSize(bytes) {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

useActivityTracker({
  userId: getUserEmail(),
  tenantId: getTenantId(),
  module: 'crm'
});

onMounted(() => {
  activeTab.value = 'leads';
  loadLeads().then(() => nextTick(autoOpenLeadFromQuery));
});

// ── Deep-link support: open a specific lead when the route has ?leadId=XXX ──
const route = useRoute();
async function autoOpenLeadFromQuery() {
  const leadId = route.query.leadId;
  if (!leadId) return;
  // Try in-memory list first
  let target = (leads.value || []).find(l => String(l.id) === String(leadId) || String(l._id) === String(leadId));
  if (!target) {
    try {
      const { getLead } = await import('@/services/crm_api.js');
      target = await getLead(leadId, getTenantId());
    } catch (e) {
      console.warn('CRMLeadsPage: failed to fetch lead by id', e);
    }
  }
  if (target) viewLead(target);
}
watch(() => route.query.leadId, () => { autoOpenLeadFromQuery(); });

async function handleArchiveLead(lead) {
  const tenantId = getTenantId();
  try {
    const { updateLead } = await import('@/services/crm_api.js');
    // Toggle archived state — spread full lead to satisfy required fields
    const newArchived = !lead.archived;
    await updateLead(lead.id, { ...lead, archived: newArchived, tenant_id: tenantId }, tenantId);
    showDetailModal.value = false;
    await loadLeads();
  } catch (err) {
    console.error('Archive/Restore failed', err);
  }
}
</script>
