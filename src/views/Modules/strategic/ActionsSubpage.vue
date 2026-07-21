<template>
  <div class="actions-subpage min-h-screen bg-[#F5F5F5] font-sans relative text-gray-900 overflow-x-hidden">
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
                <span class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">MODULE // ACTION_ENGINE</span>
              </div>
              <h1 class="text-3xl font-black text-gray-900 uppercase tracking-tight font-outfit">Strategic Consultant</h1>
              <p class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mt-1">REAL_TIME // STRATEGIC_ACTION_STREAM</p>
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
              class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-[10px] font-mono font-bold uppercase shadow-md transition-all flex items-center gap-2 rounded-none"
            >
              <i class="fas fa-upload"></i>
              <span>UPLOAD_DOCS</span>
            </button>

            <button 
              @click="triggerStrategicActionAgent"
              :disabled="isTriggeringAgent"
              class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 text-[10px] font-mono font-bold uppercase shadow-md transition-all flex items-center gap-2 rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i :class="isTriggeringAgent ? 'fas fa-spinner fa-spin' : 'fas fa-robot'"></i>
              <span>{{ isTriggeringAgent ? 'PROCESS_PLANNING...' : 'GENERATE_ACTION_PLAN' }}</span>
            </button>

            <button 
              class="bg-[#2F2E8B] hover:bg-[#1D226B] text-white px-4 py-2 text-[10px] font-mono font-bold uppercase shadow-md transition-all flex items-center gap-2 rounded-none"
            >
              <i class="fas fa-magic"></i>
              <span>AI_INTEL_REPORT</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Strategic Navigation -->
      <StrategicNavigation active-tab="actions" />

      <!-- Action Statistics -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div class="bg-white border border-gray-200 p-8 shadow-sm relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">STAT_CORE // TOTAL</div>
          
          <p class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest mb-2 relative z-10">Total Actions</p>
          <div class="flex items-end gap-3 relative z-10">
            <span class="text-4xl font-black font-outfit text-gray-900 tracking-tighter tabular-nums">{{ strategicGuidance.length }}</span>
            <span class="text-[10px] font-mono font-black text-gray-300 uppercase tracking-widest mb-1.5">UNITS</span>
          </div>
        </div>

        <div class="bg-white border border-gray-200 p-8 shadow-sm relative overflow-hidden group hover:border-red-500/20 transition-colors">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[8px] font-mono font-black text-red-400 uppercase tracking-widest z-20">STAT_CRITICAL // HIGH_PRIO</div>
          
          <p class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest mb-2 relative z-10">High Priority</p>
          <div class="flex items-end gap-3 relative z-10">
            <span class="text-4xl font-black font-outfit text-red-600 tracking-tighter tabular-nums">{{ highPriorityCount }}</span>
            <span class="text-[10px] font-mono font-black text-red-300 uppercase tracking-widest mb-1.5">ACTIONS</span>
          </div>
        </div>

        <div class="bg-white border border-gray-200 p-8 shadow-sm relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">STAT_TIME // AVG_HORIZON</div>
          
          <p class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest mb-2 relative z-10">Avg. Timeline</p>
          <div class="flex items-end gap-3 relative z-10">
            <span class="text-4xl font-black font-outfit text-gray-900 tracking-tighter tabular-nums">6-8</span>
            <span class="text-[10px] font-mono font-black text-gray-300 uppercase tracking-widest mb-1.5">WKS</span>
          </div>
        </div>

        <div class="bg-white border border-gray-200 p-8 shadow-sm relative overflow-hidden group hover:border-emerald-500/20 transition-colors">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[8px] font-mono font-black text-emerald-400 uppercase tracking-widest z-20">STAT_EXEC // COMPLETED</div>
          
          <p class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest mb-2 relative z-10">Executed Actions</p>
          <div class="flex items-end gap-3 relative z-10">
            <span class="text-4xl font-black font-outfit text-emerald-600 tracking-tighter tabular-nums">{{ executedActionsCount }}</span>
            <span class="text-[10px] font-mono font-black text-emerald-300 uppercase tracking-widest mb-1.5">DONE</span>
          </div>
        </div>
      </div>

      <!-- Strategic Guidance & Action Plans -->
      <div class="bg-white border border-gray-200 p-8 shadow-sm relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors">
        <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
        <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SYSTEM_INTEL // ACTION_REGISTRY</div>
        
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 relative z-10">
          <div>
            <h2 class="text-2xl font-black font-outfit text-gray-900 uppercase tracking-tight flex items-center gap-3">
              <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
              Strategic Guidance
            </h2>
            <p class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mt-1">AI_POWERED // RECOMMENDATION_STREAM</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <button 
              @click="openCreateActionModal"
              class="px-6 py-2 bg-gray-900 text-white text-[9px] font-mono font-black uppercase tracking-widest hover:bg-[#2F2E8B] transition-all shadow-lg flex items-center gap-2"
            >
              <i class="fas fa-plus"></i> NEW_ACTION_VECTOR
            </button>
            <div class="w-px h-8 bg-gray-200 mx-2"></div>
            <button 
              v-for="filter in priorityFilters" 
              :key="filter.value"
              @click="activePriorityFilter = filter.value"
              :class="[
                'px-4 py-2 text-[9px] font-mono font-black uppercase tracking-widest border transition-all',
                activePriorityFilter === filter.value 
                  ? 'bg-[#2F2E8B] text-white border-[#2F2E8B]' 
                  : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'
              ]"
            >
              {{ filter.label }}
            </button>
          </div>
        </div>

        <!-- Actionable Recommendations -->
        <div class="grid grid-cols-1 gap-6 relative z-10">
          <div 
            v-for="guidance in paginatedGuidance"  
            :key="guidance.id"
            class="bg-gray-50/50 border border-gray-100 p-8 hover:bg-white hover:border-[#2F2E8B]/20 transition-all group/card relative overflow-hidden"
          >
            <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
            
            <div class="flex flex-col lg:flex-row items-start justify-between gap-6 relative z-10">
              <div class="flex-1">
                <div class="flex items-center gap-4 mb-4">
                  <div class="p-3 bg-white border border-gray-100 text-[#2F2E8B]">
                    <i :class="['fas', guidance.icon, 'text-xl']"></i>
                  </div>
                  <div>
                    <div class="flex items-center gap-3 mb-1">
                      <h3 class="text-sm font-black font-outfit text-gray-900 uppercase tracking-tight">{{ guidance.title }}</h3>
                      <span :class="[
                        'px-2 py-0.5 text-[8px] font-mono font-black uppercase tracking-widest border',
                        guidance.priority === 'high' ? 'bg-red-50 text-red-700 border-red-100' :
                        guidance.priority === 'medium' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                        'bg-blue-50 text-blue-700 border-blue-100'
                      ]">
                        {{ guidance.priority }}_PRIORITY
                      </span>
                      <span v-if="guidance.status === 'completed'" class="px-2 py-0.5 text-[8px] font-mono font-black uppercase tracking-widest border bg-emerald-50 text-emerald-700 border-emerald-100 flex items-center gap-1">
                        <i class="fas fa-check-circle text-[8px]"></i>
                        PROTOCOL_EXECUTED
                      </span>
                    </div>
                    <p class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-tight leading-relaxed">{{ guidance.description }}</p>
                  </div>
                </div>

                <!-- Action Steps -->
                <div class="mt-8 space-y-6">
                  <div class="bg-white border border-gray-100 p-6 relative">
                    <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">STEP_PROTOCOL</div>
                    <h4 class="text-[10px] font-mono font-black text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <span class="w-1 h-3 bg-[#2F2E8B]"></span>
                      Implementation Protocol
                    </h4>
                    <div class="space-y-4">
                      <div 
                        v-for="(step, idx) in guidance.steps" 
                        :key="idx"
                        class="flex items-start gap-4 text-[10px] font-mono font-bold text-gray-600 uppercase tracking-tight leading-none group/step"
                      >
                        <span class="w-5 h-5 bg-gray-900 text-white flex items-center justify-center text-[9px] font-black shrink-0">
                          0{{ idx + 1 }}
                        </span>
                        <span class="pt-1.5">{{ step }}</span>
                      </div>
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="bg-white border border-gray-100 p-4 relative">
                      <p class="text-[8px] font-mono font-black text-gray-400 uppercase mb-1">EXPECTED_OUTCOME</p>
                      <p class="text-[10px] font-mono font-bold text-gray-900 uppercase leading-relaxed">{{ guidance.expected_outcome || guidance.expectedOutcome }}</p>
                    </div>
                    <div class="bg-white border border-gray-100 p-4 relative">
                      <p class="text-[8px] font-mono font-black text-gray-400 uppercase mb-1">TIME_WINDOW</p>
                      <p class="text-[10px] font-mono font-bold text-gray-900 uppercase leading-relaxed">{{ guidance.timeline }}</p>
                    </div>
                    <div class="bg-white border border-gray-100 p-4 relative">
                      <p class="text-[8px] font-mono font-black text-gray-400 uppercase mb-1">RESOURCES_REQUIRED</p>
                      <p class="text-[10px] font-mono font-bold text-gray-900 uppercase leading-relaxed">{{ guidance.resources }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-row lg:flex-col gap-2 w-full lg:w-48 shrink-0">
                <button 
                  @click="implementAction(guidance.id)"
                  class="flex-1 py-3 bg-[#2F2E8B] text-white text-[9px] font-mono font-black uppercase tracking-widest hover:bg-[#1D226B] transition-all shadow-xl rounded-none"
                >
                  EXECUTE_IMPLEMENTATION
                </button>
                <button 
                  @click="scheduleAction(guidance.id)"
                  class="flex-1 py-3 bg-white border border-gray-200 text-gray-900 text-[9px] font-mono font-black uppercase tracking-widest hover:border-[#2F2E8B] transition-all rounded-none"
                >
                  SCHEDULE_EVENT
                </button>
                <button 
                  @click="openEditActionModal(guidance)"
                  class="flex-1 py-3 bg-gray-50 border border-gray-200 text-gray-600 text-[9px] font-mono font-black uppercase tracking-widest hover:bg-gray-100 transition-all rounded-none"
                >
                  EDIT_NODE
                </button>
                <button 
                  @click="dismissAction(guidance.id)"
                  class="p-3 bg-gray-50 border border-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all rounded-none"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
            <!-- Pagination Controls -->
        <div v-if="filteredGuidance.length > itemsPerPage" class="flex justify-between items-center mt-8 border-t border-gray-100 pt-6 bg-white p-4">
          <button 
            @click="prevPage" 
            :disabled="currentPage === 1"
            class="px-6 py-3 border border-gray-200 text-[10px] font-mono font-black uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i class="fas fa-chevron-left"></i> PREV_PAGE
          </button>
          
          <span class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">
            PAGE {{ currentPage }} / {{ totalPages }}
          </span>
          
          <button 
            @click="nextPage" 
            :disabled="currentPage === totalPages"
            class="px-6 py-3 border border-gray-200 text-[10px] font-mono font-black uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            NEXT_PAGE <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredGuidance.length === 0" class="text-center py-24 border border-dashed border-gray-200 bg-gray-50/50">
          <p class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest mb-6">NULL_SET // NO_ACTIONS_FOUND</p>
          <button 
            @click="activePriorityFilter = 'all'"
            class="px-8 py-3 bg-[#2F2E8B] text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-[#1D226B] transition-all"
          >
            RESET_FILTER_VIEW
          </button>
        </div>
      </div>

      <!-- Implementation Schedule Modal -->
      <div v-if="showScheduleModal" class="fixed inset-0 bg-[#0A0A0A]/90 backdrop-blur-md z-[70] flex items-center justify-center p-4">
        <div class="bg-white border border-gray-200 shadow-2xl max-w-md w-full relative overflow-hidden group">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SYSTEM_SCHEDULER // TASK_DISPATCH</div>
          
          <div class="p-8 border-b border-gray-100 relative z-10">
            <h3 class="text-2xl font-black font-outfit text-gray-900 uppercase tracking-tight flex items-center gap-3">
              <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
              Schedule Action
            </h3>
          </div>

          <div class="p-8 space-y-6 relative z-10">
            <div class="space-y-1">
              <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Start_Date_Vector</label>
              <input v-model="scheduleForm.startDate" type="date" class="w-full bg-gray-50 border border-gray-100 px-4 py-3 text-[10px] font-mono font-bold uppercase focus:ring-1 focus:ring-[#2F2E8B] outline-none">
            </div>
            
            <div class="space-y-1">
              <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Assignee_Node</label>
              <select v-model="scheduleForm.assignee" class="w-full bg-gray-50 border border-gray-100 px-4 py-3 text-[10px] font-mono font-bold uppercase focus:ring-1 focus:ring-[#2F2E8B] outline-none rounded-none">
                <option value="Inventory Manager">Inventory Manager</option>
                <option value="Procurement Team">Procurement Team</option>
                <option value="Sales Team">Sales Team</option>
                <option value="Finance Team">Finance Team</option>
              </select>
            </div>

            <div class="space-y-1">
              <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Priority_Level</label>
              <select v-model="scheduleForm.priority" class="w-full bg-gray-50 border border-gray-100 px-4 py-3 text-[10px] font-mono font-bold uppercase focus:ring-1 focus:ring-[#2F2E8B] outline-none rounded-none">
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          <div class="p-8 bg-gray-50 flex gap-4 relative z-10">
            <button 
              @click="confirmSchedule"
              class="flex-1 py-4 bg-[#2F2E8B] text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-[#1D226B] transition-all shadow-xl"
            >
              CONFIRM_DISPATCH
            </button>
            <button 
              @click="showScheduleModal = false"
              class="px-8 py-4 bg-white border border-gray-200 text-gray-400 text-[10px] font-mono font-black uppercase tracking-widest hover:text-gray-900 transition-all"
            >
              TERMINATE
            </button>
          </div>
        </div>
      </div>

       <!-- Implementation Execution Modal -->
       <div v-if="showImplementationModal" class="fixed inset-0 bg-[#0A0A0A]/90 backdrop-blur-md z-[80] flex items-center justify-center p-4">
        <div class="bg-white border border-gray-200 shadow-2xl max-w-lg w-full relative overflow-hidden flex flex-col max-h-[90vh]">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="absolute top-0 right-0 bg-[#2F2E8B] px-3 py-1 text-[9px] font-mono font-black text-white uppercase tracking-widest z-20">EXECUTION_PROTOCOL // ACTIVE</div>
          
          <div class="p-8 border-b border-gray-100 relative z-10 shrink-0">
            <h3 class="text-2xl font-black font-outfit text-gray-900 uppercase tracking-tight flex items-center gap-3">
              <div class="w-1.5 h-6 bg-[#2F2E8B] animate-pulse"></div>
              Execute Implementation
            </h3>
            <p class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest mt-2">TRACKING_PROGRESS_VECTORS</p>
          </div>

          <div class="p-8 overflow-y-auto relative z-10">
            <!-- Progress Bar -->
            <div class="mb-8">
               <div class="flex items-center justify-between text-[10px] font-mono font-black uppercase text-gray-500 mb-2">
                 <span>Protocol_Completion</span>
                 <span>{{ implementationProgress }}%</span>
               </div>
               <div class="h-1.5 bg-gray-100 w-full overflow-hidden relative">
                   <div class="h-full bg-[#2F2E8B] transition-all duration-700 ease-out" :style="{ width: implementationProgress + '%' }"></div>
               </div>
            </div>

            <!-- Steps Checklist -->
             <div class="space-y-3">
              <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">SEQUENTIAL_TASKS</label>
              <div v-if="currentImplementationSteps.length === 0" class="text-center py-6 text-gray-400 italic text-xs">NO_STEPS_DEFINED</div>
              
              <div v-for="(step, idx) in currentImplementationSteps" :key="idx" 
                   class="flex items-start gap-3 p-4 border transition-all cursor-pointer group select-none"
                   :class="step.completed ? 'bg-[#2F2E8B]/5 border-[#2F2E8B]/30' : 'bg-white border-gray-100 hover:border-gray-300'"
                   @click="toggleStep(idx)">
                <div class="w-5 h-5 border flex items-center justify-center transition-all shrink-0 mt-0.5"
                     :class="step.completed ? 'bg-[#2F2E8B] border-[#2F2E8B]' : 'bg-gray-50 border-gray-200 group-hover:border-[#2F2E8B]'">
                     <i v-if="step.completed" class="fas fa-check text-white text-[10px]"></i>
                </div>
                <span class="text-[10px] font-mono font-bold uppercase leading-relaxed transition-colors" 
                      :class="step.completed ? 'text-[#2F2E8B]' : 'text-gray-600'">{{ step.text }}</span>
              </div>
            </div>
          </div>

          <div class="p-6 bg-gray-50 flex gap-4 relative z-10 border-t border-gray-100 shrink-0">
            <button 
              @click="finalizeImplementation"
              :disabled="implementationProgress < 100"
              class="flex-1 py-4 bg-[#2F2E8B] text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-[#1D226B] transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <i class="fas fa-check-circle"></i> VERIFY_&_COMPLETE
            </button>
            <button 
              @click="showImplementationModal = false"
              class="px-6 py-4 bg-white border border-gray-200 text-gray-400 text-[10px] font-mono font-black uppercase tracking-widest hover:text-gray-900 transition-all"
            >
              ABORT
            </button>
          </div>
        </div>
      </div>

       <!-- Action Modal (Create/Edit) -->
      <div v-if="showActionModal" class="fixed inset-0 bg-[#0A0A0A]/90 backdrop-blur-md z-[70] flex items-center justify-center p-4">
        <div class="bg-white border border-gray-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative group">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SYSTEM_ACTION // {{ editingActionId ? 'RECONFIGURE' : 'INITIALIZE' }}</div>
          
          <div class="p-8 border-b border-gray-100 relative z-10 bg-white sticky top-0">
            <h3 class="text-2xl font-black font-outfit text-gray-900 uppercase tracking-tight flex items-center gap-3">
              <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
              {{ editingActionId ? 'Edit Action Vector' : 'New Action Vector' }}
            </h3>
          </div>

          <div class="p-8 space-y-6 relative z-10">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-1">
                <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Protocol_Title</label>
                <input v-model="actionForm.title" type="text" placeholder="ENTER_TITLE..." class="w-full bg-gray-50 border border-gray-100 px-4 py-3 text-[10px] font-mono font-bold uppercase focus:ring-1 focus:ring-[#2F2E8B] outline-none">
              </div>
              <div class="space-y-1">
                 <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Priority_Level</label>
                 <select v-model="actionForm.priority" class="w-full bg-gray-50 border border-gray-100 px-4 py-3 text-[10px] font-mono font-bold uppercase focus:ring-1 focus:ring-[#2F2E8B] outline-none rounded-none">
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            <div class="space-y-1">
              <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Description_Vector</label>
              <textarea v-model="actionForm.description" rows="3" placeholder="DESCRIBE_ACTION_PARAMETERS..." class="w-full bg-gray-50 border border-gray-100 px-4 py-3 text-[10px] font-mono font-bold uppercase focus:ring-1 focus:ring-[#2F2E8B] outline-none"></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div class="space-y-1">
                <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Timeline_Window</label>
                <input v-model="actionForm.timeline" type="text" placeholder="E.G. 2_WEEKS" class="w-full bg-gray-50 border border-gray-100 px-4 py-3 text-[10px] font-mono font-bold uppercase focus:ring-1 focus:ring-[#2F2E8B] outline-none">
              </div>
               <div class="space-y-1">
                <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Resource_Allocation</label>
                <input v-model="actionForm.resources" type="text" placeholder="E.G. BUDGET_TEAM" class="w-full bg-gray-50 border border-gray-100 px-4 py-3 text-[10px] font-mono font-bold uppercase focus:ring-1 focus:ring-[#2F2E8B] outline-none">
              </div>
            </div>

            <div class="space-y-1">
              <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Expected_Outcome</label>
              <textarea v-model="actionForm.expectedOutcome" rows="2" placeholder="DEFINE_SUCCESS_METRICS..." class="w-full bg-gray-50 border border-gray-100 px-4 py-3 text-[10px] font-mono font-bold uppercase focus:ring-1 focus:ring-[#2F2E8B] outline-none"></textarea>
            </div>

            <div class="space-y-3">
               <div class="flex items-center justify-between">
                 <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Implementation_Steps</label>
                 <button @click="addStep" class="text-[9px] font-mono font-black text-[#2F2E8B] hover:underline uppercase">ADD_STEP_NODE</button>
               </div>
               <div v-for="(step, idx) in actionForm.steps" :key="idx" class="flex gap-2">
                 <span class="w-8 h-full flex items-center justify-center bg-gray-100 text-[9px] font-mono font-bold text-gray-500">{{ idx + 1 }}</span>
                 <input v-model="actionForm.steps[idx]" type="text" placeholder="STEP_DESCRIPTION..." class="flex-1 bg-gray-50 border border-gray-100 px-4 py-2 text-[10px] font-mono font-bold uppercase focus:ring-1 focus:ring-[#2F2E8B] outline-none">
                 <button @click="removeStep(idx)" class="w-8 hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"><i class="fas fa-times"></i></button>
               </div>
            </div>

            <!-- Notes & Attachments Section -->
            <div class="border-t border-gray-100 pt-8 mt-4">
              <h4 class="text-[10px] font-mono font-black text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                <div class="w-1 h-3 bg-[#2F2E8B]"></div>
                ADDITIONAL_CONTEXT // NOTES_&_FILES
              </h4>
              
              <div class="space-y-6">
                <!-- Notes -->
                <div class="group/field">
                  <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest mb-4 block group-focus-within/field:text-[#2F2E8B] transition-colors">STRATEGIC_NOTES</label>
                  <textarea 
                    v-model="actionForm.notes" 
                    rows="4" 
                    placeholder="ADD_INTERNAL_NOTES_OR_OBSERVATIONS..." 
                    class="w-full bg-gray-50 border border-gray-100 p-5 text-sm font-mono font-bold text-gray-900 uppercase focus:outline-none focus:border-[#2F2E8B] focus:bg-white transition-all resize-none"
                  ></textarea>
                </div>

                <!-- File Upload -->
                <div class="group/field">
                  <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest mb-4 block">ATTACHMENTS_VECTOR</label>
                  
                  <!-- File List -->
                  <div v-if="actionForm.attachments && actionForm.attachments.length > 0" class="space-y-3 mb-4">
                     <div v-for="(file, idx) in actionForm.attachments" :key="idx" class="flex items-center justify-between bg-gray-50 p-3 border border-gray-100">
                        <div class="flex items-center gap-3">
                          <i class="fas fa-file-alt text-[#2F2E8B] opacity-50"></i>
                          <span class="text-[10px] font-mono font-bold text-gray-700 uppercase">{{ file.name }}</span>
                        </div>
                        <button @click="removeAttachment(idx)" class="text-gray-400 hover:text-red-500 transition-colors">
                          <i class="fas fa-times"></i>
                        </button>
                     </div>
                  </div>

                  <!-- Drop Zone -->
                  <div 
                    @click="$refs.fileInput.click()"
                    class="border border-dashed border-gray-200 bg-gray-50/50 p-8 text-center cursor-pointer hover:border-[#2F2E8B] hover:bg-white transition-all group/upload"
                  >
                    <i class="fas fa-cloud-upload-alt text-2xl text-gray-300 mb-3 group-hover/upload:text-[#2F2E8B] transition-colors"></i>
                    <p class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest group-hover/upload:text-gray-900">CLICK_TO_UPLOAD_DOCUMENTS</p>
                    <p class="text-[8px] font-mono font-bold text-gray-300 uppercase tracking-widest mt-1">PDF_EXCEL_IMG_DOC</p>
                    <input ref="fileInput" type="file" multiple class="hidden" @change="handleFileUpload">
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div class="p-8 bg-gray-50 flex gap-4 relative z-10 border-t border-gray-100">
            <button 
              @click="saveAction"
              :disabled="isSavingAction"
              class="flex-1 py-4 bg-[#2F2E8B] text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-[#1D226B] transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <i :class="isSavingAction ? 'fas fa-spinner fa-spin' : 'fas fa-save'"></i>
              {{ isSavingAction ? 'SAVING...' : 'COMMIT_VECTOR' }}
            </button>
            <button 
              @click="showActionModal = false"
              class="px-8 py-4 bg-white border border-gray-200 text-gray-400 text-[10px] font-mono font-black uppercase tracking-widest hover:text-gray-900 transition-all"
            >
              ABORT
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>

import { computed, ref, onMounted } from 'vue'
import { workflowResult } from '@/composables/useStrategicWorkflow'
import { useRouter } from 'vue-router'
import axios from 'axios'
import API_BASE_URL from '@/services/api.js'
import { decodeJWT } from '@/services/decodeJWT.js'
import StrategicNavigation from './components/StrategicNavigation.vue'

const router = useRouter()
const isRefreshing = ref(false)
const activePriorityFilter = ref('all')
const showScheduleModal = ref(false)
const selectedActionId = ref(null)

// Loading states
const selectedLanguage = ref('en')
const isLoadingActions = ref(false)
const isSavingAction = ref(false)
const isTriggeringAgent = ref(false)

// Get tenant ID from JWT
const jwtHelper = decodeJWT()
const tenantId = ref(jwtHelper.getTenantId())

// Actions data from backend
const actionsData = ref([])

const priorityFilters = ref([
  { label: 'All Actions', value: 'all' },
  { label: 'High Priority', value: 'high' },
  { label: 'Medium Priority', value: 'medium' },
  { label: 'Low Priority', value: 'low' }
])

// Use backend data if available, otherwise fall back to workflowResult
const strategicGuidance = computed(() => {
  if (actionsData.value && actionsData.value.length > 0) {
    return actionsData.value
  }
  return workflowResult.value?.guidance || []
})

// Pagination
const currentPage = ref(1)
const itemsPerPage = 6

const filteredGuidance = computed(() => {
  if (activePriorityFilter.value === 'all') {
    return strategicGuidance.value
  }
  return strategicGuidance.value.filter(g => g.priority === activePriorityFilter.value)
})

const totalPages = computed(() => Math.ceil(filteredGuidance.value.length / itemsPerPage))

const paginatedGuidance = computed(() => {
  // Reset to page 1 if current page is out of bounds (caused by filtering)
  if (currentPage.value > totalPages.value && totalPages.value > 0) {
    currentPage.value = 1
  }
  
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredGuidance.value.slice(start, end)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const highPriorityCount = computed(() => {
  return strategicGuidance.value.filter(g => g.priority === 'high').length
})

const executedActionsCount = computed(() => {
  return strategicGuidance.value.filter(g => g.status === 'completed').length
})

// Fetch actions from backend
const fetchActions = async () => {
  if (!tenantId.value) {
    console.warn('No tenant ID found')
    return
  }
  
  isLoadingActions.value = true
  
  try {
    const response = await axios.get(`${API_BASE_URL}/actions`, {
      params: { tenant_id: tenantId.value }
    })
    actionsData.value = response.data || []
    console.log('Actions fetched:', actionsData.value)
  } catch (error) {
    console.error('Error fetching actions:', error)
    actionsData.value = []
  } finally {
    isLoadingActions.value = false
  }
}

// Create a new action
const createAction = async (actionData) => {
  if (!tenantId.value) {
    alert('Tenant ID not found. Please log in again.')
    return
  }
  
  isSavingAction.value = true
  
  try {
    const payload = {
      ...actionData,
      tenant_id: tenantId.value
    }
    
    await axios.post(`${API_BASE_URL}/actions`, payload)
    alert('Action created successfully!')
    await fetchActions()
    return true
  } catch (error) {
    console.error('Error creating action:', error)
    alert('Failed to create action: ' + (error.response?.data?.detail || error.message))
    return false
  } finally {
    isSavingAction.value = false
  }
}

// Update an action
const updateAction = async (actionId, actionData) => {
  if (!tenantId.value) {
    alert('Tenant ID not found. Please log in again.')
    return
  }
  
  isSavingAction.value = true
  
  try {
    const payload = {
      ...actionData,
      tenant_id: tenantId.value
    }
    
    await axios.put(`${API_BASE_URL}/actions/${actionId}`, payload)
    alert('Action updated successfully!')
    await fetchActions()
    return true
  } catch (error) {
    console.error('Error updating action:', error)
    alert('Failed to update action: ' + (error.response?.data?.detail || error.message))
    return false
  } finally {
    isSavingAction.value = false
  }
}

// Delete an action
const deleteAction = async (actionId) => {
  if (!tenantId.value) return
  
  isDeletingAction.value = true
  
  try {
    await axios.delete(`${API_BASE_URL}/actions/${actionId}`, {
      params: { tenant_id: tenantId.value }
    })
    alert('Action deleted successfully!')
    await fetchActions()
    return true
  } catch (error) {
    console.error('Error deleting action:', error)
    alert('Failed to delete action: ' + (error.response?.data?.detail || error.message))
    return false
  } finally {
    isDeletingAction.value = false
  }
}

// Mark action as completed
const markActionComplete = async (actionId) => {
  const action = actionsData.value.find(a => a.id === actionId)
  if (!action) return
  
  // Optimistic update
  const originalStatus = action.status
  action.status = 'completed'
  
  try {
     await axios.patch(`${API_BASE_URL}/actions/${actionId}/complete`, {}, {
        params: { tenant_id: tenantId.value }
     })
      await fetchActions()
      return true
  } catch (err) {
      console.error('Error completing action:', err)
      action.status = originalStatus // Revert
      alert('Failed to complete action')
      return false
  }
}

// Implementation Logic
const showImplementationModal = ref(false)
const currentImplementationSteps = ref([])
const activeImplementationId = ref(null)

const implementAction = (actionId) => {
    const action = actionsData.value.find(a => a.id === actionId) || workflowResult.value?.guidance?.find(g => g.id === actionId)
    if(!action) return
    
    activeImplementationId.value = actionId
    // Parse steps if they are simple strings
    // If they are objects with completed status, use that, else default to false
    currentImplementationSteps.value = (action.steps || []).map(s => {
        if (typeof s === 'string') {
             return { text: s, completed: false }
        }
        return s // Assume it matches structure if generic
    })
    
    showImplementationModal.value = true
}

const implementationProgress = computed(() => {
    if(currentImplementationSteps.value.length === 0) return 0
    const completed = currentImplementationSteps.value.filter(s => s.completed).length
    return Math.round((completed / currentImplementationSteps.value.length) * 100)
})

const toggleStep = (idx) => {
    currentImplementationSteps.value[idx].completed = !currentImplementationSteps.value[idx].completed
}

const finalizeImplementation = async () => {
    // Check if progress is 100%
    if (implementationProgress.value < 100) {
        if(!confirm('Not all steps are confirmed. Force completion?')) return
    }
    
    const success = await markActionComplete(activeImplementationId.value)
    if (success) {
        showImplementationModal.value = false
        // Show success with timestamp as requested
        alert(`Implementation Protocol Verified & Completed.\nTimestamp: ${new Date().toLocaleString()}`)
    }
}

// Trigger strategic action agent to generate action plan
const triggerStrategicActionAgent = async () => {
  if (!tenantId.value) {
    alert('Tenant ID not found. Please log in again.')
    return
  }
  
  isTriggeringAgent.value = true
  
  try {
    const payload = {
      tenant_id: tenantId.value,
      focus_area: 'Create action plan to make the business run strategically',
      thread_id: null
    }
    
    const response = await axios.post(`${API_BASE_URL}/strategic-action-agent/trigger`, payload)
    
    console.log('Strategic action agent triggered:', response.data)
    alert('Strategic action plan generated successfully! Refreshing actions...')
    
    // Refresh actions after generation
    await fetchActions()
    
    return true
  } catch (error) {
    console.error('Error triggering strategic action agent:', error)
    alert('Failed to generate action plan: ' + (error.response?.data?.detail || error.message))
    return false
  } finally {
    isTriggeringAgent.value = false
  }
}

// Fetch actions on component mount
onMounted(async () => {
  await fetchActions()
})

console.log('ActionsSubpage - strategicGuidance:', strategicGuidance.value)
console.log('ActionsSubpage - filteredGuidance:', filteredGuidance.value)
console.log('ActionsSubpage - highPriorityCount:', highPriorityCount.value)

// Schedule action
const scheduleForm = ref({
  startDate: '',
  assignee: 'Sales Team',
  priority: 'medium'
})

const scheduleAction = (actionId) => {
  selectedActionId.value = actionId
  const action = actionsData.value.find(a => a.id === actionId) || workflowResult.value?.guidance?.find(g => g.id === actionId)
  
  if (action) {
    scheduleForm.value.priority = action.priority || 'medium'
    scheduleForm.value.startDate = action.scheduledDate || ''
    scheduleForm.value.assignee = action.assignee || 'Sales Team'
  } else {
    scheduleForm.value = {
      startDate: '',
      assignee: 'Sales Team',
      priority: 'medium'
    }
  }
  showScheduleModal.value = true
}

const confirmSchedule = async () => {
  if (!selectedActionId.value) return
  
  try {
    const payload = {
      scheduled_date: scheduleForm.value.startDate,
      assignee: scheduleForm.value.assignee,
      priority: scheduleForm.value.priority,
      status: 'scheduled'
    }
    
    // Attempt to update backend if possible
    if (tenantId.value) {
       await updateAction(selectedActionId.value, payload)
    } else {
       // Mock update if no backend connection
       alert(`Action scheduled for ${scheduleForm.value.startDate} assigned to ${scheduleForm.value.assignee}`)
    }
    
    showScheduleModal.value = false
    selectedActionId.value = null
  } catch (e) {
    console.error('Schedule failed', e)
    alert('Failed to schedule action')
  }
}

const dismissAction = (actionId) => {
  if(confirm('Are you sure you want to delete this action?')) {
    deleteAction(actionId)
  }
}

// Action Modal Logic
const showActionModal = ref(false)
const editingActionId = ref(null)
const actionForm = ref({
  title: '',
  priority: 'medium',
  description: '',
  timeline: '',
  resources_needed: [], // Changed from string to array for tags
  dependencies: [],
  steps: [''], // Array of strings or objects {text: string, completed: boolean}
  expected_outcome: '',
  notes: '',
  attachments: []
})

const fileInput = ref(null)

const handleFileUpload = (event) => {
  const files = Array.from(event.target.files)
  if (!files.length) return
  
  // In a real app, you would upload these to a server and get a URL back.
  // For this demo/agent context, we will simulate storing file metadata.
  // If we had a file upload endpoint, we would use it here.
  
  const newAttachments = files.map(file => ({
    name: file.name,
    type: file.type,
    size: file.size,
    url: URL.createObjectURL(file), // Temporary local URL for preview if needed
    uploadedAt: new Date().toISOString()
  }))
  
  if (!actionForm.value.attachments) {
    actionForm.value.attachments = []
  }
  
  actionForm.value.attachments.push(...newAttachments)
  
  // Reset input
  if (fileInput.value) fileInput.value.value = ''
}

const removeAttachment = (index) => {
  if (actionForm.value.attachments) {
    actionForm.value.attachments.splice(index, 1)
  }
}

const openCreateActionModal = () => {
  editingActionId.value = null
  actionForm.value = {
    title: '',
    priority: 'medium',
    description: '',
    timeline: '',
    resources_needed: [],
    dependencies: [],
    steps: [''],
    expected_outcome: '',
    notes: '',
    attachments: []
  }
  showActionModal.value = true
}

const openEditActionModal = (action) => {
  editingActionId.value = action.id
  actionForm.value = {
    title: action.title,
    priority: action.priority,
    description: action.description,
    timeline: action.timeline || '',
    resources: action.resources || '', // Keep for now, will be mapped to resources_needed
    resources_needed: action.resources_needed || [],
    dependencies: action.dependencies || [],
    steps: action.steps ? [...action.steps] : [''],
    expected_outcome: action.expected_outcome || action.expectedOutcome || '',
    notes: action.notes || '',
    attachments: action.attachments || []
  }
  showActionModal.value = true
}

const addStep = () => {
  actionForm.value.steps.push('')
}

const removeStep = (index) => {
  actionForm.value.steps.splice(index, 1)
}

const saveAction = async () => {
  // Filter out empty steps
  const steps = actionForm.value.steps.filter(s => s.trim() !== '')
  
  const payload = {
    ...actionForm.value,
    steps: steps,
    expected_outcome: actionForm.value.expectedOutcome // Map camelCase to snake_case for backend
  }

  if (editingActionId.value) {
    await updateAction(editingActionId.value, payload)
  } else {
    // Generate a random ID for new actions if backend doesn't assign (simulated here, but normally backend does)
    // Actually createAction sends to backend
    await createAction(payload)
  }
  showActionModal.value = false
}



const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

</script>

<style scoped>
</style>
