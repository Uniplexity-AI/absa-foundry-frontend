<template>
  <div class="goals-subpage min-h-screen bg-[#F5F5F5] font-sans relative text-gray-900 overflow-x-hidden">
    <!-- Viewport Mesh Background (Fixed) -->
    <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <!-- Gradient Radial Accents -->
      <div class="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-[#2F2E8B]/[0.03] blur-[120px] rounded-full"></div>
      <div class="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-[#3D2F88]/[0.02] blur-[150px] rounded-full"></div>
    </div>

    <div class="max-w-[1700px] mx-auto px-8 py-12 relative z-10">
      
      <!-- Header with AI Status -->
      <div class="bg-white border border-gray-200 p-8 shadow-none relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors mb-8">
        <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
        <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SYSTEM_MODULE // STRATEGIC_GOALS_ENGINE</div>
        
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
          <div class="flex items-start gap-6">
            <div class="w-16 h-16 bg-gray-900 flex items-center justify-center shadow-2xl relative group-hover:bg-[#2F2E8B] transition-colors">
              <i class="fas fa-bullseye text-white text-2xl"></i>
              <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-[#2F2E8B] border-2 border-white"></div>
            </div>
            <div>
              <h1 class="text-4xl font-black font-outfit text-gray-900 uppercase tracking-tight mb-2">
                Goals & Objectives
              </h1>
              <div class="flex flex-wrap items-center gap-6 mt-4">
                <div class="flex items-center gap-3">
                  <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">AI_CONSULTANT_ACTIVE</span>
                </div>
                <div class="h-4 w-[1px] bg-gray-200"></div>
                <div class="flex items-center gap-2">
                  <i class="fas fa-database text-[10px] text-[#2F2E8B]"></i>
                  <span class="text-[10px] font-mono font-black text-gray-900 uppercase tracking-widest">3_DATA_VECTORS</span>
                </div>
                <div class="h-4 w-[1px] bg-gray-200"></div>
                <div class="flex items-center gap-2 text-gray-400">
                  <i class="fas fa-sync-alt text-[10px]"></i>
                  <span class="text-[10px] font-mono font-black uppercase tracking-widest">LAST_SYNC: {{ lastUpdated || '5_MIN_AGO' }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="flex flex-wrap gap-4">
            <div class="relative group/lang">
              <select 
                v-model="selectedLanguage"
                class="bg-white border border-gray-200 text-[10px] font-mono font-black uppercase tracking-widest px-6 py-3 pr-10 appearance-none focus:outline-none focus:border-[#2F2E8B] transition-all cursor-pointer"
              >
                <option value="en">ENGLISH_EN</option>
                <option value="bem">BEMBA_ZM</option>
                <option value="nya">NYANJA_ZM</option>
              </select>
              <i class="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 pointer-events-none group-hover/lang:text-gray-900 transition-colors"></i>
            </div>

            <button class="px-6 py-3 bg-white border border-gray-200 text-[10px] font-mono font-black uppercase tracking-widest hover:bg-gray-50 transition-all shadow-none">
              IMPORT_DATA
            </button>
            <button class="px-6 py-3 bg-gray-900 text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-[#2F2E8B] transition-all shadow-xl shadow-gray-200/50">
              GENERATE_STRATEGY_REPORT
            </button>
          </div>
        </div>
      </div>

      <!-- Strategic Navigation -->
      <StrategicNavigation active-tab="goals" />

      <!-- Strategic Foundation: Mission, Vision & Business Model -->
      <div class="bg-gray-900 p-8 border border-gray-800 shadow-2xl relative overflow-hidden mb-8">
        <div class="absolute inset-0 dotted-pattern opacity-[0.1] pointer-events-none"></div>
        <div class="absolute top-0 right-0 bg-white/5 border-b border-l border-white/10 px-3 py-1 text-[9px] font-mono font-black text-white/40 uppercase tracking-widest z-20">MODEL_CORE // STRATEGIC_FOUNDATION</div>
        
        <div class="flex items-start justify-between relative z-10 mb-12">
          <div class="space-y-8 flex-1 max-w-4xl">
            <h2 class="text-xl font-black font-outfit text-white uppercase tracking-tight flex items-center gap-3">
              <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
              Core Strategic Foundation
            </h2>
            
            <div class="grid grid-cols-1 gap-8">
              <div class="group/field">
                <label class="text-[9px] font-mono font-black text-white/40 uppercase tracking-widest mb-3 block">TARGET_MISSION</label>
                <p class="text-sm font-mono font-bold text-white uppercase leading-relaxed tracking-tight group-hover/field:text-[#2F2E8B] transition-colors">{{ mission || 'MISSION_NOT_DEFINED' }}</p>
              </div>
              
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div class="group/field">
                  <label class="text-[9px] font-mono font-black text-white/40 uppercase tracking-widest mb-3 block">FUTURE_VISION</label>
                  <p class="text-sm font-mono font-bold text-white uppercase leading-relaxed tracking-tight group-hover/field:text-[#3D2F88] transition-colors">{{ vision || 'VISION_NOT_DEFINED' }}</p>
                </div>
                <div class="group/field">
                  <label class="text-[9px] font-mono font-black text-white/40 uppercase tracking-widest mb-3 block">CORE_VALUES_VECTORS</label>
                  <p class="text-sm font-mono font-bold text-white uppercase leading-relaxed tracking-tight group-hover/field:text-[#2F2E8B] transition-colors">{{ coreValues || 'VALUES_NOT_INSTANTIATED' }}</p>
                </div>
              </div>

              <!-- New Section: Identity & Operations -->
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 border-t border-white/10">
                <div class="group/field">
                  <label class="text-[9px] font-mono font-black text-white/40 uppercase tracking-widest mb-3 block">WHO_WE_ARE</label>
                  <p class="text-xs font-mono font-bold text-white uppercase leading-relaxed tracking-tight group-hover/field:text-[#2F2E8B] transition-colors">{{ whoWeAre || 'IDENTITY_NOT_DEFINED' }}</p>
                </div>
                <div class="group/field">
                  <label class="text-[9px] font-mono font-black text-white/40 uppercase tracking-widest mb-3 block">WHAT_WE_DO</label>
                  <p class="text-xs font-mono font-bold text-white uppercase leading-relaxed tracking-tight group-hover/field:text-[#2F2E8B] transition-colors">{{ whatWeDo || 'OPERATIONS_NOT_DEFINED' }}</p>
                </div>
                <div class="group/field">
                  <label class="text-[9px] font-mono font-black text-white/40 uppercase tracking-widest mb-3 block">REGIONS_OF_OPERATION</label>
                  <p class="text-xs font-mono font-bold text-white uppercase leading-relaxed tracking-tight group-hover/field:text-[#2F2E8B] transition-colors">{{ regionsOfOperation || 'REGIONS_NOT_DEFINED' }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <button 
            @click="openEditMissionModal"
            class="px-6 py-3 bg-white/5 border border-white/10 text-[10px] font-mono font-black text-white uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <i class="fas fa-edit"></i> EDIT_FOUNDATION
          </button>
        </div>

        <!-- Strategic Fit & Coherence Indicators -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          <div class="bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all">
            <div class="flex items-center justify-between mb-4">
              <span class="text-[10px] font-mono font-black text-white/50 uppercase tracking-widest">STRATEGIC_FIT_INDEX</span>
              <div class="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white text-xs">
                <i class="fas fa-puzzle-piece"></i>
              </div>
            </div>
            <div class="text-3xl font-black font-outfit text-white mb-2">{{ strategicFitIndex.toFixed(2) }}</div>
            <div class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest">{{ strategicFitStatus }}</div>
          </div>

          <div class="bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all">
            <div class="flex items-center justify-between mb-4">
              <span class="text-[10px] font-mono font-black text-white/50 uppercase tracking-widest">INTERNAL_COHERENCE</span>
              <div class="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white text-xs">
                <i class="fas fa-sync-alt"></i>
              </div>
            </div>
            <div class="text-3xl font-black font-outfit text-white mb-2">{{ internalCoherence }}%</div>
            <div class="text-[9px] font-mono font-black text-[#3D2F88] uppercase tracking-widest">{{ coherenceStatus }}</div>
          </div>

          <div class="bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all">
            <div class="flex items-center justify-between mb-4">
              <span class="text-[10px] font-mono font-black text-white/50 uppercase tracking-widest">MODEL_SUSTAINABILITY</span>
              <div class="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white text-xs">
                <i class="fas fa-chart-line"></i>
              </div>
            </div>
            <div class="text-3xl font-black font-outfit text-white mb-2">{{ businessModelScore }}%</div>
            <div class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest">{{ businessModelStatus }}</div>
          </div>
        </div>
      </div>

      <!-- Goal Type Tabs -->
      <div class="flex gap-4 mb-8">
        <button
          v-for="type in goalTypes"
          :key="type.id"
          @click="selectedGoalType = type.id; currentPage = 1"
          :class="[
            'flex-1 py-4 border font-mono font-black text-[10px] uppercase tracking-widest transition-all relative overflow-hidden',
            selectedGoalType === type.id
              ? 'bg-gray-900 text-white border-gray-900 shadow-xl'
              : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200 hover:text-gray-600'
          ]"
        >
          <div v-if="selectedGoalType === type.id" class="absolute inset-0 dotted-pattern opacity-[0.2] pointer-events-none"></div>
          <span class="relative z-10 flex items-center justify-center gap-3">
            <i :class="type.icon"></i> {{ type.label }}_ARCHIVE
            <span class="text-[9px] opacity-40">[{{ goalCountByType(type.id) }}]</span>
          </span>
        </button>
      </div>

      <!-- Goal Statistics -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white border border-gray-200 p-6 shadow-none relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="flex items-center justify-between relative z-10">
            <div>
              <p class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mb-2">ACTIVE_GOAL_VECTORS</p>
              <p class="text-3xl font-black font-outfit text-gray-900">{{ activeGoalsDisplay.length }}</p>
            </div>
            <div class="w-12 h-12 bg-gray-50 flex items-center justify-center text-[#2F2E8B]">
              <i class="fas fa-bullseye text-xl"></i>
            </div>
          </div>
        </div>

        <div class="bg-white border border-gray-200 p-6 shadow-none relative overflow-hidden group hover:border-green-500/20 transition-colors">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="flex items-center justify-between relative z-10">
            <div>
              <p class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mb-2">AGGREGATE_PROGRESS</p>
              <p class="text-3xl font-black font-outfit text-green-600">{{ avgProgress }}%</p>
            </div>
            <div class="w-12 h-12 bg-gray-50 flex items-center justify-center text-green-600">
              <i class="fas fa-chart-line text-xl"></i>
            </div>
          </div>
        </div>

        <div class="bg-white border border-gray-200 p-6 shadow-none relative overflow-hidden group hover:border-[#3D2F88]/20 transition-colors">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="flex items-center justify-between relative z-10">
            <div>
              <p class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mb-2">MISSION_ALIGNMENT</p>
              <p class="text-3xl font-black font-outfit text-[#2F2E8B]">{{ avgAlignmentScore }}%</p>
            </div>
            <div class="w-12 h-12 bg-gray-50 flex items-center justify-center text-[#2F2E8B]">
              <i class="fas fa-compass text-xl"></i>
            </div>
          </div>
        </div>

        <div class="bg-white border border-gray-200 p-6 shadow-none relative overflow-hidden group hover:border-amber-500/20 transition-colors">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="flex items-center justify-between relative z-10">
            <div>
              <p class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mb-2">STRATEGIC_ACHIEVEMENTS</p>
              <p class="text-3xl font-black font-outfit text-amber-600">{{ totalBadges }}</p>
            </div>
            <div class="w-12 h-12 bg-gray-50 flex items-center justify-center text-amber-600">
              <i class="fas fa-trophy text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Active Goals Dashboard -->
      <div class="mb-12">
        <div class="flex justify-between items-center mb-8">
          <h3 class="text-2xl font-black font-outfit text-gray-900 uppercase tracking-tight flex items-center gap-3">
            <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
            {{ selectedGoalType }}_GOAL_VECTORS
          </h3>
          <button 
            @click="openCreateGoalModal"
            class="px-6 py-3 bg-gray-900 text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-[#2F2E8B] transition-all shadow-xl shadow-gray-200/50 flex items-center gap-2"
          >
            <i class="fas fa-plus"></i> NEW_GOAL_NODE
          </button>
        </div>

        <div v-if="filteredGoals.length === 0" class="bg-white border border-dashed border-gray-200 py-20 text-center group hover:border-[#2F2E8B]/30 transition-colors">
          <div class="w-16 h-16 bg-gray-50 flex items-center justify-center mx-auto mb-4 text-gray-300 group-hover:text-[#2F2E8B] transition-colors">
            <i class="fas fa-bullseye text-2xl"></i>
          </div>
          <p class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">ZERO_ACTIVE_NODES_DETECTED</p>
          <button @click="openCreateGoalModal" class="mt-4 text-[10px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest hover:underline">INITIALIZE_NODE</button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8" v-else>
          <div 
            v-for="goal in paginatedGoals"  
            :key="goal.id"
            class="bg-white border border-gray-200 p-8 shadow-none relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-all"
            :class="{ 'border-l-4 border-l-green-500': goal.progress >= 100 }"
          >
            <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
            <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">GOAL_ID // {{ goal.id.slice(0, 8) }}</div>
            
            <div class="flex items-start justify-between mb-8 relative z-10">
              <div class="flex items-center gap-6">
                <div class="w-14 h-14 bg-gray-900 flex items-center justify-center shadow-lg group-hover:bg-[#2F2E8B] transition-colors">
                  <i :class="'fas ' + goal.icon + ' text-white text-xl'"></i>
                </div>
                <div>
                  <h3 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight mb-1">{{ goal.title }}</h3>
                  <div class="flex items-center gap-3">
                    <span class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest">{{ goal.category }}</span>
                    <div class="w-1 h-1 rounded-full bg-gray-300"></div>
                    <span class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">{{ goal.type }}</span>
                  </div>
                </div>
              </div>
              
              <div class="flex items-center gap-4">
                <div class="flex flex-col items-end">
                  <span :class="[
                    'text-[9px] font-mono font-black px-2 py-1 uppercase tracking-widest mb-1 shadow-none',
                    goal.priority === 'high' ? 'bg-red-500 text-white' :
                    goal.priority === 'medium' ? 'bg-amber-500 text-white' :
                    'bg-[#2F2E8B] text-white'
                  ]">
                    REQ_PRIORITY: {{ goal.priority }}
                  </span>
                  <div class="flex items-center gap-1.5">
                    <i class="fas fa-compass text-[10px] text-[#2F2E8B]"></i>
                    <span class="text-[9px] font-mono font-black text-gray-900 uppercase tracking-widest">{{ goal.alignmentScore }}%_ALIGNMENT</span>
                  </div>
                </div>

                <div class="relative">
                  <button 
                    @click.stop="toggleGoalMenu(goal.id)"
                    class="w-10 h-10 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:border-gray-200 transition-all"
                  >
                    <i class="fas fa-ellipsis-h text-xs"></i>
                  </button>
                  <div 
                    v-if="openMenuGoalId === goal.id"
                    class="absolute right-0 mt-2 w-48 bg-gray-900 text-white shadow-2xl py-2 z-30 border border-white/10"
                  >
                    <button @click="editGoal(goal)" class="w-full px-6 py-3 text-left text-[9px] font-mono font-black uppercase tracking-widest hover:bg-[#2F2E8B] transition-colors flex items-center gap-3">
                      <i class="fas fa-edit"></i> RECONFIGURE_NODE
                    </button>
                    <div class="h-[1px] bg-white/5 mx-4 my-2"></div>
                    <button @click="confirmDeleteGoal(goal.id)" class="w-full px-6 py-3 text-left text-[9px] font-mono font-black uppercase tracking-widest text-red-400 hover:bg-red-500 hover:text-white transition-colors flex items-center gap-3">
                      <i class="fas fa-trash"></i> PURGE_NODE
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- SMART Goal Details -->
            <div class="grid grid-cols-2 gap-px bg-gray-100 border border-gray-100 mb-8 relative z-10">
              <div class="bg-gray-50/50 p-4 group/detail">
                <label class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mb-2 block">VECTOR_SPECIFIC</label>
                <p class="text-[11px] font-mono font-bold text-gray-900 uppercase leading-relaxed group-hover/detail:text-[#2F2E8B] transition-colors">{{ goal.specific }}</p>
              </div>
              <div class="bg-gray-50/50 p-4 group/detail border-l border-gray-100">
                <label class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mb-2 block">METRIC_MEASURABLE</label>
                <p class="text-[11px] font-mono font-bold text-gray-900 uppercase leading-relaxed group-hover/detail:text-[#3D2F88] transition-colors">{{ goal.measurable }}</p>
              </div>
              <div class="bg-gray-50/50 p-4 group/detail border-t border-gray-100">
                <label class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mb-2 block">GOAL_TARGET</label>
                <p class="text-[11px] font-mono font-bold text-gray-900 uppercase leading-relaxed group-hover/detail:text-[#2F2E8B] transition-colors">{{ goal.target }}</p>
              </div>
              <div class="bg-gray-50/50 p-4 group/detail border-t border-l border-gray-100">
                <label class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mb-2 block">TIME_DEADLINE</label>
                <p class="text-[11px] font-mono font-bold text-gray-900 uppercase leading-relaxed group-hover/detail:text-red-500 transition-colors">{{ goal.deadline }}</p>
              </div>
            </div>

            <!-- Progress Bar -->
            <div class="mb-8 relative z-10">
              <div class="flex items-center justify-between mb-3">
                <span class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">TRANSACTION_PROGRESS</span>
                <span class="text-2xl font-black font-outfit" :class="goal.progress >= 100 ? 'text-green-600' : 'text-gray-900'">
                  {{ goal.progress }}%
                </span>
              </div>
              <div class="h-1 bg-gray-100 relative overflow-hidden">
                <div 
                  class="absolute h-full transition-all duration-1000 shadow-[0_0_10px_rgba(47,46,139,0.3)]"
                  :class="goal.progress >= 100 ? 'bg-green-500' : 'bg-[#2F2E8B]'"
                  :style="{ width: `${Math.min(goal.progress, 100)}%` }"
                ></div>
              </div>
              <div class="flex items-center justify-between mt-3">
                <div class="flex items-center gap-2">
                  <span class="text-[8px] font-mono font-black text-gray-400 uppercase">CURR:</span>
                  <span class="text-[10px] font-mono font-bold text-gray-900 uppercase">{{ goal.current }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-[8px] font-mono font-black text-gray-400 uppercase">TGT:</span>
                  <span class="text-[10px] font-mono font-bold text-gray-900 uppercase">{{ goal.target }}</span>
                </div>
              </div>
            </div>

            <!-- Milestones -->
            <div class="mb-8 relative z-10">
              <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mb-4 block">MILESTONE_SYNCHRONIZATION</label>
              <div class="grid grid-cols-1 gap-2">
                <div 
                  v-for="(milestone, idx) in goal.milestones" 
                  :key="idx"
                  class="flex items-center gap-4 bg-gray-50/50 p-3 border border-gray-100 group/milestone hover:bg-white transition-all"
                >
                  <div :class="[
                    'w-6 h-6 flex items-center justify-center text-[10px] font-mono font-black transition-all',
                    milestone.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400 group-hover/milestone:bg-[#2F2E8B] group-hover/milestone:text-white'
                  ]">
                    <i v-if="milestone.completed" class="fas fa-check"></i>
                    <span v-else>{{ (idx + 1).toString().padStart(2, '0') }}</span>
                  </div>
                  <span :class="[
                    'text-[11px] font-mono font-bold uppercase tracking-tight',
                    milestone.completed ? 'text-gray-400 line-through' : 'text-gray-900'
                  ]">
                    {{ milestone.title }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Achievements & Badges -->
            <div v-if="goal.badges && goal.badges.length > 0" class="mb-8 relative z-10">
              <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mb-4 block">EARNED_ACHIEVEMENTS</label>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="badge in goal.badges" 
                  :key="badge"
                  class="px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 text-[9px] font-mono font-black uppercase tracking-widest flex items-center gap-2"
                >
                  <i class="fas fa-certificate text-[8px]"></i> {{ badge }}
                </span>
              </div>
            </div>

            <!-- Assigned Team (Visible Summary) -->
            <div v-if="goal.assigned_employees && goal.assigned_employees.length > 0" class="mb-6 relative z-10">
              <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mb-3 block">ASSIGNED_OPERATIVES</label>
              <div class="flex flex-wrap gap-3">
                <div 
                  v-for="agent in goal.assigned_employees" 
                  :key="agent.id"
                  class="flex items-center gap-2 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full group/agent hover:border-[#2F2E8B]/30 transition-all"
                >
                  <div class="w-5 h-5 rounded-full bg-[#2F2E8B] text-white flex items-center justify-center text-[7px] font-mono font-bold">
                    {{ getInitials(agent.name) }}
                  </div>
                  <span class="text-[9px] font-bold font-outfit text-gray-900 uppercase tracking-wide">{{ agent.name }}</span>
                  <button 
                    @click.stop="toggleAssignment(goal, agent)"
                    class="ml-1 text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <i class="fas fa-times text-[8px]"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Payroll Employees Dropdown -->
            <div class="mb-8 relative z-10">
              <button 
                @click="toggleEmployeeList(goal.id)"
                class="w-full flex items-center justify-between bg-gray-50/50 p-4 border border-gray-100 hover:bg-white hover:border-[#2F2E8B]/30 transition-all group/team"
              >
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-gray-200 flex items-center justify-center text-gray-400 group-hover/team:bg-[#2F2E8B] group-hover/team:text-white transition-colors">
                    <i class="fas fa-users text-xs"></i>
                  </div>
                  <span class="text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest group-hover/team:text-gray-900 transition-colors">
                    PERSONNEL_VECTOR // PAYROLL_DATA
                  </span>
                </div>
                <i :class="['fas fa-chevron-down text-gray-400 transition-transform duration-300', isEmployeeListOpen(goal.id) ? 'rotate-180' : '']"></i>
              </button>
              
              <div v-if="isEmployeeListOpen(goal.id)" class="border-x border-b border-gray-100 bg-white p-4">
                <div class="max-h-48 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                  <div v-if="payrollEmployees.length === 0" class="text-[10px] font-mono text-gray-400 text-center py-2">
                    NO_PERSONNEL_DATA_AVAILABLE
                  </div>
                  <div 
                    v-for="emp in payrollEmployees" 
                    :key="emp.id"
                    @click="toggleAssignment(goal, emp)"
                    class="flex items-center justify-between p-2 transition-colors border border-transparent cursor-pointer"
                    :class="isAssigned(goal, emp.id) ? 'bg-[#2F2E8B]/5 border-[#2F2E8B]/20' : 'hover:bg-gray-50 hover:border-gray-100'"
                  >
                    <div class="flex items-center gap-3">
                      <div 
                        class="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-mono font-bold transition-colors"
                        :class="isAssigned(goal, emp.id) ? 'bg-[#2F2E8B] text-white' : 'bg-gray-100 text-gray-500'"
                      >
                        <i v-if="isAssigned(goal, emp.id)" class="fas fa-check"></i>
                        <span v-else>{{ getInitials(emp.name) }}</span>
                      </div>
                      <div>
                        <p 
                          class="text-[10px] font-bold font-outfit uppercase transition-colors"
                          :class="isAssigned(goal, emp.id) ? 'text-[#2F2E8B]' : 'text-gray-900'"
                        >
                          {{ emp.name }}
                        </p>
                        <p class="text-[8px] font-mono text-gray-400">{{ emp.designation || 'OPERATIVE' }}</p>
                      </div>
                    </div>
                    <div class="text-[8px] font-mono text-[#2F2E8B] bg-[#2F2E8B]/5 px-2 py-0.5 rounded">
                      {{ emp.department || 'GENERAL' }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-4 relative z-10">
              <button 
                @click="updateGoalProgress(goal.id)"
                class="flex-1 bg-gray-900 text-white text-[10px] font-mono font-black uppercase tracking-widest py-4 hover:bg-[#2F2E8B] transition-all shadow-xl shadow-gray-200/50 flex items-center justify-center gap-3"
              >
                <i class="fas fa-sync-alt"></i> UPDATE_STATUS
              </button>
              <button 
                @click="viewGoalAnalytics(goal.id)"
                class="flex-1 bg-white border border-gray-200 text-gray-900 text-[10px] font-mono font-black uppercase tracking-widest py-4 hover:bg-gray-50 transition-all flex items-center justify-center gap-3"
              >
                <i class="fas fa-chart-bar"></i> ANALYTICS_VIEW
              </button>
              <button 
                @click="confirmDeleteGoal(goal.id)"
                class="px-6 bg-white border border-gray-200 text-red-500 text-[10px] font-mono font-black uppercase tracking-widest hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                title="DELETE_NODE"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Pagination Controls -->
        <div v-if="filteredGoals.length > itemsPerPage" class="flex justify-between items-center mt-8 border-t border-gray-100 pt-6">
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

      <!-- Smart Alerts & Nudges -->
      <div class="bg-white border border-gray-200 p-8 shadow-none relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors mb-8">
        <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
        <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SYSTEM_ALERTS // INTELLIGENT_NUDGES</div>
        
        <h3 class="text-2xl font-black font-outfit text-gray-900 uppercase tracking-tight flex items-center gap-3 mb-8">
          <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
          Smart Alerts & Nudges
        </h3>

        <div class="grid grid-cols-1 gap-6 relative z-10">
          <div 
            v-for="nudge in behavioralNudges" 
            :key="nudge.id"
            class="flex items-start gap-8 p-8 border border-gray-100 hover:border-gray-200 transition-all cursor-pointer relative overflow-hidden group/nudge"
            :class="[
              nudge.type === 'celebration' ? 'bg-green-50/30' :
              nudge.type === 'warning' ? 'bg-red-50/30' :
              nudge.type === 'encouragement' ? 'bg-[#2F2E8B]/[0.02]' :
              'bg-gray-50'
            ]"
            @click="handleNudgeAction(nudge.id)"
          >
            <div class="w-16 h-16 bg-white shadow-xl flex items-center justify-center shrink-0 border border-gray-100 transition-transform group-hover/nudge:scale-110">
              <i :class="[
                'fas text-2xl',
                nudge.icon,
                nudge.type === 'celebration' ? 'text-green-500' :
                nudge.type === 'warning' ? 'text-red-500' :
                'text-[#2F2E8B]'
              ]"></i>
            </div>
            
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <span class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest">{{ nudge.type }}_ALERT</span>
                <div class="w-1 h-1 rounded-full bg-gray-300"></div>
                <span class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">TIMESTAMP: {{ nudge.timestamp || 'JUST_NOW' }}</span>
              </div>
              <h4 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight mb-3">{{ nudge.title }}</h4>
              <p class="text-sm font-mono font-bold text-gray-500 uppercase leading-relaxed tracking-tight mb-6">{{ nudge.message }}</p>
              
              <!-- Root Cause Analysis -->
              <div v-if="nudge.rootCause" class="bg-gray-900 p-4 border border-white/5 mb-6">
                <label class="text-[8px] font-mono font-black text-white/40 uppercase tracking-widest mb-2 block">ROOT_CAUSE_ANALYSIS_V01</label>
                <p class="text-[10px] font-mono font-bold text-white uppercase leading-relaxed tracking-tight">{{ nudge.rootCause }}</p>
              </div>

              <!-- Recommended Actions -->
              <div v-if="nudge.actions && nudge.actions.length > 0">
                <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mb-4 block">RECOMMENDED_CORRECTIVE_ACTIONS</label>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div 
                    v-for="(action, aIdx) in nudge.actions" 
                    :key="aIdx"
                    class="bg-white border border-gray-100 p-4 flex items-center gap-4 hover:border-[#2F2E8B]/20 transition-colors group/action"
                  >
                    <div class="w-8 h-8 bg-gray-50 flex items-center justify-center text-[10px] font-mono font-black text-gray-400 group-hover/action:bg-[#2F2E8B] group-hover/action:text-white transition-colors">
                      {{ (aIdx + 1).toString().padStart(2, '0') }}
                    </div>
                    <span class="text-[11px] font-mono font-bold text-gray-900 uppercase tracking-tight">{{ action }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="w-10 h-10 bg-gray-900 text-white flex items-center justify-center hover:bg-[#2F2E8B] transition-colors shrink-0">
              <i class="fas fa-chevron-right text-xs"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Mission, Vision & Values Modal -->
      <div v-if="showMissionModal" class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click.self="showMissionModal = false">
        <div class="bg-white border border-gray-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          
          <div class="sticky top-0 bg-white border-b border-gray-100 p-8 flex items-center justify-between z-20">
            <div>
              <h3 class="text-2xl font-black font-outfit text-gray-900 uppercase tracking-tight mb-1">Foundational_Config</h3>
              <p class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">RECONFIGURING_STRATEGIC_CORE</p>
            </div>
            <button @click="showMissionModal = false" class="w-10 h-10 flex items-center justify-center bg-gray-50 text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <div class="p-8 space-y-10 relative z-10">
            <div class="group/field">
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest mb-4 block group-focus-within/field:text-[#2F2E8B] transition-colors">
                VECTOR_MISSION // CORE_PURPOSE
              </label>
              <textarea 
                v-model="tempMission" 
                rows="3" 
                placeholder="INPUT_MISSION_PARAMETERS..." 
                class="w-full bg-gray-50 border border-gray-100 p-5 text-sm font-mono font-bold text-gray-900 uppercase focus:outline-none focus:border-[#2F2E8B] focus:bg-white transition-all"
              ></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div class="group/field">
                <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest mb-4 block group-focus-within/field:text-[#2F2E8B] transition-colors">
                  VECTOR_VISION // FUTURE_STATE
                </label>
                <textarea 
                  v-model="tempVision" 
                  rows="3" 
                  placeholder="INPUT_VISION_PARAMETERS..." 
                  class="w-full bg-gray-50 border border-gray-100 p-5 text-sm font-mono font-bold text-gray-900 uppercase focus:outline-none focus:border-[#2F2E8B] focus:bg-white transition-all"
                ></textarea>
              </div>
              <div class="group/field">
                <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest mb-4 block group-focus-within/field:text-[#2F2E8B] transition-colors">
                  VECTOR_VALUES // GUIDING_PRINCIPLES
                </label>
                <textarea 
                  v-model="tempCoreValues" 
                  rows="3" 
                  placeholder="INPUT_VALUES_PARAMETERS..." 
                  class="w-full bg-gray-50 border border-gray-100 p-5 text-sm font-mono font-bold text-gray-900 uppercase focus:outline-none focus:border-[#2F2E8B] focus:bg-white transition-all"
                ></textarea>
              </div>
            </div>

            <div class="group/field">
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest mb-4 block group-focus-within/field:text-[#2F2E8B] transition-colors">
                MODEL_TYPE // OPERATIONAL_FRAMEWORK
              </label>
              <select 
                v-model="tempBusinessModel"
                class="w-full bg-gray-50 border border-gray-100 p-5 text-sm font-mono font-bold text-gray-900 uppercase focus:outline-none focus:border-[#2F2E8B] focus:bg-white transition-all appearance-none cursor-pointer"
              >
                <option value="">SELECT_MODEL_VECTOR</option>
                <option value="subscription">SUBSCRIPTION_SAAS</option>
                <option value="marketplace">MARKETPLACE_PLATFORM</option>
                <option value="retail">RETAIL_ECOMMERCE</option>
                <option value="manufacturing">MANUFACTURING_NODE</option>
                <option value="services">PROFESSIONAL_SERVICES</option>
                <option value="freemium">FREEMIUM_TIER</option>
                <option value="hybrid">HYBRID_INTEGRATION</option>
              </select>
            </div>

            <!-- New Fields Input -->
            <div class="space-y-6 pt-6 border-t border-gray-100">
               <div class="group/field">
                <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest mb-4 block group-focus-within/field:text-[#2F2E8B] transition-colors">
                  IDENTITY_VECTOR // WHO_WE_ARE
                </label>
                <textarea 
                  v-model="tempWhoWeAre" 
                  rows="2" 
                  placeholder="DEFINE_CORPORATE_IDENTITY..." 
                  class="w-full bg-gray-50 border border-gray-100 p-5 text-sm font-mono font-bold text-gray-900 uppercase focus:outline-none focus:border-[#2F2E8B] focus:bg-white transition-all"
                ></textarea>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div class="group/field">
                  <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest mb-4 block group-focus-within/field:text-[#2F2E8B] transition-colors">
                    OPERATIONS_VECTOR // WHAT_WE_DO
                  </label>
                  <textarea 
                    v-model="tempWhatWeDo" 
                    rows="2" 
                    placeholder="DEFINE_CORE_ACTIVITIES..." 
                    class="w-full bg-gray-50 border border-gray-100 p-5 text-sm font-mono font-bold text-gray-900 uppercase focus:outline-none focus:border-[#2F2E8B] focus:bg-white transition-all"
                  ></textarea>
                </div>
                <div class="group/field">
                  <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest mb-4 block group-focus-within/field:text-[#2F2E8B] transition-colors">
                    GEOGRAPHIC_SCOPE // REGIONS
                  </label>
                  <textarea 
                    v-model="tempRegionsOfOperation" 
                    rows="2" 
                    placeholder="DEFINE_OPERATIONAL_REGIONS..." 
                    class="w-full bg-gray-50 border border-gray-100 p-5 text-sm font-mono font-bold text-gray-900 uppercase focus:outline-none focus:border-[#2F2E8B] focus:bg-white transition-all"
                  ></textarea>
                </div>
              </div>
            </div>

            <div class="bg-gray-900 p-6 border border-white/5 relative overflow-hidden">
              <div class="absolute inset-0 dotted-pattern opacity-[0.1] pointer-events-none"></div>
              <p class="text-[10px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest mb-3 flex items-center gap-2">
                <i class="fas fa-brain"></i> AI_STRATEGIC_INTELLIGENCE_LAYER
              </p>
              <p class="text-[11px] font-mono font-bold text-white uppercase leading-relaxed tracking-tight">
                CLEAR_PARAMETERS_ENABLE_HIGHER_COHERENCE_DETECTION_AND_DATA_DRIVEN_ALIGNMENT_VECTORS.
              </p>
            </div>

            <div class="flex gap-4 pt-4">
              <button 
                @click="saveMissionVision"
                :disabled="isSavingMission"
                class="flex-1 px-8 py-5 bg-gray-900 text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-[#2F2E8B] transition-all shadow-xl shadow-gray-200/50 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                <i :class="isSavingMission ? 'fas fa-spinner fa-spin' : 'fas fa-save'"></i> 
                {{ isSavingMission ? 'SYNCHRONIZING...' : 'COMMIT_CHANGES' }}
              </button>
              <button 
                @click="showMissionModal = false"
                :disabled="isSavingMission"
                class="px-8 py-5 bg-white border border-gray-200 text-gray-900 text-[10px] font-mono font-black uppercase tracking-widest hover:bg-gray-50 transition-all disabled:opacity-50"
              >
                ABORT_OPERATION
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- New Goal Modal -->
      <div v-if="showGoalModal" class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click.self="showGoalModal = false">
        <div class="bg-white border border-gray-200 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          
          <div class="sticky top-0 bg-white border-b border-gray-100 p-8 flex items-center justify-between z-20">
            <div>
              <h3 class="text-2xl font-black font-outfit text-gray-900 uppercase tracking-tight mb-1">
                {{ newGoal.id ? 'Reconfigure' : 'Initialize' }}_Goal_Node
              </h3>
              <p class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">TYPE: {{ selectedGoalType }} // MODE: STRATEGIC_ALIGNMENT</p>
            </div>
            <button @click="showGoalModal = false" class="w-10 h-10 flex items-center justify-center bg-gray-50 text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <div class="p-8 space-y-10 relative z-10">
            <div class="group/field">
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest mb-4 block group-focus-within/field:text-[#2F2E8B] transition-colors">GOAL_IDENTIFIER // TITLE</label>
              <input v-model="newGoal.title" type="text" placeholder="INPUT_GOAL_TITLE..." class="w-full bg-gray-50 border border-gray-100 p-5 text-sm font-mono font-bold text-gray-900 uppercase focus:outline-none focus:border-[#2F2E8B] focus:bg-white transition-all">
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div class="group/field">
                <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest mb-4 block group-focus-within/field:text-[#2F2E8B] transition-colors">TAXONOMY_CATEGORY</label>
                <select v-model="newGoal.category" class="w-full bg-gray-50 border border-gray-100 p-5 text-sm font-mono font-bold text-gray-900 uppercase focus:outline-none focus:border-[#2F2E8B] focus:bg-white transition-all appearance-none cursor-pointer">
                  <option>REVENUE_GROWTH</option>
                  <option>OPERATIONS_EFFICIENCY</option>
                  <option>DIGITAL_TRANSFORMATION</option>
                  <option>CUSTOMER_SUCCESS</option>
                  <option>TALENT_DEVELOPMENT</option>
                  <option>COST_OPTIMIZATION</option>
                </select>
              </div>
              <div class="grid grid-cols-2 gap-6">
                <div class="group/field">
                  <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest mb-4 block group-focus-within/field:text-[#2F2E8B] transition-colors">PRIORITY_LEVEL</label>
                  <select v-model="newGoal.priority" class="w-full bg-gray-50 border border-gray-100 p-5 text-sm font-mono font-bold text-gray-900 uppercase focus:outline-none focus:border-[#2F2E8B] focus:bg-white transition-all appearance-none cursor-pointer">
                    <option value="high">HIGH_URGENCY</option>
                    <option value="medium">MEDIUM_STABILITY</option>
                    <option value="low">LOW_LATENCY</option>
                  </select>
                </div>
                <div class="group/field">
                  <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest mb-4 block group-focus-within/field:text-[#2F2E8B] transition-colors">TEMPORAL_DEADLINE</label>
                  <input v-model="newGoal.deadline" type="date" class="w-full bg-gray-50 border border-gray-100 p-5 text-sm font-mono font-bold text-gray-900 uppercase focus:outline-none focus:border-[#2F2E8B] focus:bg-white transition-all">
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div class="group/field">
                <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest mb-4 block group-focus-within/field:text-[#2F2E8B] transition-colors">SMART_SPECIFIC_VECTOR</label>
                <textarea v-model="newGoal.specific" rows="2" placeholder="DEFINE_SPECIFIC_PARAMETERS..." class="w-full bg-gray-50 border border-gray-100 p-5 text-sm font-mono font-bold text-gray-900 uppercase focus:outline-none focus:border-[#2F2E8B] focus:bg-white transition-all"></textarea>
              </div>
              <div class="group/field">
                <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest mb-4 block group-focus-within/field:text-[#2F2E8B] transition-colors">SMART_MEASURABLE_METRIC</label>
                <textarea v-model="newGoal.measurable" rows="2" placeholder="DEFINE_MEASUREMENT_METRIC..." class="w-full bg-gray-50 border border-gray-100 p-5 text-sm font-mono font-bold text-gray-900 uppercase focus:outline-none focus:border-[#2F2E8B] focus:bg-white transition-all"></textarea>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-10">
              <div class="group/field">
                <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest mb-4 block group-focus-within/field:text-[#2F2E8B] transition-colors">CURRENT_STATE_VALUE</label>
                <input v-model="newGoal.current" type="text" placeholder="BASE_VALUE..." class="w-full bg-gray-50 border border-gray-100 p-5 text-sm font-mono font-bold text-gray-900 uppercase focus:outline-none focus:border-[#2F2E8B] focus:bg-white transition-all">
              </div>
              <div class="group/field">
                <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest mb-4 block group-focus-within/field:text-[#2F2E8B] transition-colors">TARGET_STATE_VALUE</label>
                <input v-model="newGoal.target" type="text" placeholder="END_STATE_VALUE..." class="w-full bg-gray-50 border border-gray-100 p-5 text-sm font-mono font-bold text-gray-900 uppercase focus:outline-none focus:border-[#2F2E8B] focus:bg-white transition-all">
              </div>
            </div>

            <div class="bg-gray-900 p-6 border border-white/5 relative overflow-hidden">
              <div class="absolute inset-0 dotted-pattern opacity-[0.1] pointer-events-none"></div>
              <p class="text-[10px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest mb-3 flex items-center gap-2">
                <i class="fas fa-lightbulb"></i> AI_ALIGNMENT_DIAGNOSTICS
              </p>
              <p class="text-[11px] font-mono font-bold text-white uppercase leading-relaxed tracking-tight">
                NODE_ALIGNMENT_PROBABILITY: <span class="text-[#2F2E8B]">{{ calculateAlignment(newGoal) }}%</span>_MATCH_WITH_STRATEGIC_CORE.
              </p>
            </div>

            <div class="flex gap-4 pt-4">
              <button 
                @click="createGoal"
                :disabled="isSavingGoal"
                class="flex-1 px-8 py-5 bg-gray-900 text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-[#2F2E8B] transition-all shadow-xl shadow-gray-200/50 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                <i :class="isSavingGoal ? 'fas fa-spinner fa-spin' : (newGoal.id ? 'fas fa-save' : 'fas fa-plus')"></i>
                {{ isSavingGoal ? 'SAVING_NODE...' : (newGoal.id ? 'UPDATE_GOAL_VECTOR' : 'INITIALIZE_GOAL_VECTOR') }}
              </button>
              <button 
                @click="showGoalModal = false"
                :disabled="isSavingGoal"
                class="px-8 py-5 bg-white border border-gray-200 text-gray-900 text-[10px] font-mono font-black uppercase tracking-widest hover:bg-gray-50 transition-all disabled:opacity-50"
              >
                ABORT_OPERATION
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
// Calculate alignment score for a goal (simple example: checks if mission/vision keywords are present)
function calculateAlignment(goal) {
  // Example: count matching words between goal title/specific and mission/vision
  const missionText = (mission.value || '').toLowerCase()
  const visionText = (vision.value || '').toLowerCase()
  const goalText = ((goal.title || '') + ' ' + (goal.specific || '')).toLowerCase()
  let score = 0
  if (missionText && goalText && missionText.split(' ').some(word => goalText.includes(word))) score += 50
  if (visionText && goalText && visionText.split(' ').some(word => goalText.includes(word))) score += 50
  return score
}



import axios from 'axios'
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { workflowResult } from '@/composables/useStrategicWorkflow'
import { useRouter } from 'vue-router'
import API_BASE_URL from '@/services/api.js';
import { decodeJWT } from '@/services/decodeJWT.js';
import StrategicNavigation from './components/StrategicNavigation.vue'



const router = useRouter()
const showGoalModal = ref(false)
const showMissionModal = ref(false)
const selectedGoalType = ref('weekly')
const selectedLanguage = ref('en')
const openMenuGoalId = ref(null) // Track which goal's menu is open

// Loading states
const isLoadingGoals = ref(false)
const isSavingGoal = ref(false)
const isDeletingGoal = ref(false)
const isSavingMission = ref(false)

// Mission & Vision state
const mission = ref('')
const vision = ref('')
const coreValues = ref('')
const businessModel = ref('')
const tempMission = ref('')
const tempVision = ref('')
const tempCoreValues = ref('')
const tempBusinessModel = ref('')
const whoWeAre = ref('')
const whatWeDo = ref('')
const regionsOfOperation = ref('')
const tempWhoWeAre = ref('')
const tempWhatWeDo = ref('')
const tempRegionsOfOperation = ref('')

// Payroll Employees State
const payrollEmployees = ref([])
const openEmployeeLists = ref(new Set())

const toggleEmployeeList = (goalId) => {
  if (openEmployeeLists.value.has(goalId)) {
    openEmployeeLists.value.delete(goalId)
  } else {
    openEmployeeLists.value.add(goalId)
  }
}

const isEmployeeListOpen = (goalId) => openEmployeeLists.value.has(goalId)

const getInitials = (name) => {
  if (!name) return 'XX'
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
}

// Check if employee is assigned to goal
const isAssigned = (goal, empId) => {
  return (goal.assigned_employees || []).some(e => e.id === empId)
}

// Toggle employee assignment
const toggleAssignment = async (goal, emp) => {
  if (!goal || !emp) return

  let assigned = [...(goal.assigned_employees || [])]
  const index = assigned.findIndex(e => e.id === emp.id)
  
  if (index >= 0) {
    // Remove
    assigned.splice(index, 1)
  } else {
    // Add
    assigned.push({ 
      id: emp.id, 
      name: emp.name, 
      department: emp.department,
      designation: emp.designation 
    })
  }

  // Create updated goal object
  const updatedGoal = { ...goal, assigned_employees: assigned }

  // Optimistic update
  const goalIndex = activeGoals.value.findIndex(g => g.id === goal.id)
  if (goalIndex !== -1) {
    activeGoals.value[goalIndex] = updatedGoal
  }

  // Persist to backend
  try {
    await updateGoal(goal.id, updatedGoal)
  } catch (err) {
    console.error('Failed to update assignment', err)
    // Revert on failure
    if (goalIndex !== -1) {
      activeGoals.value[goalIndex] = goal
    }
    alert('Failed to update assignment')
  }
}

// Fetch employees from payroll module
const fetchEmployees = async () => {
  if (!tenantId.value) return
  try {
    const res = await axios.get(`${API_BASE_URL}/payroll/employees`, { 
      params: { 
        tenant_id: tenantId.value,
        limit: 100
      } 
    })
    payrollEmployees.value = res.data || []
  } catch (err) {
    console.error('Failed to fetch payroll employees:', err)
    payrollEmployees.value = []
  }
}

// Strategic Metrics
const strategicFitIndex = ref(0.62)
const internalCoherence = ref(75)
const businessModelScore = ref(82)
const varsFramework = ref(null)

// Computed properties for strategic indicators
const strategicFitStatus = computed(() => {
  const index = strategicFitIndex.value
  if (index >= 0.8) return 'Excellent Alignment'
  if (index >= 0.7) return 'Good Alignment'
  if (index >= 0.6) return 'Moderate - Action Needed'
  return 'Misalignment Risk'
})

const coherenceStatus = computed(() => {
  const score = internalCoherence.value
  if (score >= 85) return 'Highly Coherent'
  if (score >= 70) return 'Good Coherence'
  if (score >= 60) return 'Needs Improvement'
  return 'Critical Gaps'
})

const businessModelStatus = computed(() => {
  const score = businessModelScore.value
  if (score >= 85) return 'Highly Sustainable'
  if (score >= 70) return 'Sustainable'
  if (score >= 60) return 'At Risk'
  return 'Unsustainable'
})

const goalTypes = ref([
  { id: 'weekly', label: 'Weekly', icon: 'fas fa-calendar-week' },
  { id: 'quarterly', label: 'Quarterly', icon: 'fas fa-calendar' },
  { id: 'monthly', label: 'Monthly', icon: 'fas fa-calendar-alt' },
  { id: 'yearly', label: 'Yearly', icon: 'fas fa-calendar' }
])

// Goals state
const activeGoals = ref([])

const newGoal = ref({
  id: null, // For tracking if editing or creating
  title: '',
  category: 'Revenue Growth',
  priority: 'medium',
  deadline: '',
  specific: '',
  measurable: '',
  current: '',
  target: '',
  type: selectedGoalType.value,
})

const activeTab = ref('goals')


// Tenant context removed - API calls no longer require tenant_id
const tenantId = ref('default')

// Fetch mission & vision from backend
const fetchMissionVision = async () => {
  if (!tenantId.value) return
  try {
    const res = await axios.get(`${API_BASE_URL}/goals/mission-vision`, { params: { tenant_id: tenantId.value } })
    mission.value = res.data.mission || ''
    vision.value = res.data.vision || ''
    coreValues.value = res.data.core_values || ''
    businessModel.value = res.data.business_model || ''
    whoWeAre.value = res.data.who_we_are || ''
    whatWeDo.value = res.data.what_we_do || ''
    regionsOfOperation.value = res.data.regions_of_operation || ''
    
    tempMission.value = mission.value
    tempVision.value = vision.value
    tempCoreValues.value = coreValues.value
    tempBusinessModel.value = businessModel.value
    tempWhoWeAre.value = whoWeAre.value
    tempWhatWeDo.value = whatWeDo.value
    tempRegionsOfOperation.value = regionsOfOperation.value
    
    // Calculate strategic metrics based on data
    calculateStrategicMetrics()
  } catch (err) {
    mission.value = ''
    vision.value = ''
    coreValues.value = ''
    businessModel.value = ''
  }
}

// Open edit modal and populate with current values
const openEditMissionModal = () => {
  tempMission.value = mission.value
  tempVision.value = vision.value
  tempCoreValues.value = coreValues.value
  tempBusinessModel.value = businessModel.value
  tempWhoWeAre.value = whoWeAre.value
  tempWhatWeDo.value = whatWeDo.value
  tempRegionsOfOperation.value = regionsOfOperation.value
  showMissionModal.value = true
}

// Save mission & vision to backend
const saveMissionVision = async () => {
  if (!tenantId.value) {
    alert('Tenant ID not found. Please log in again.')
    return
  }
  
  isSavingMission.value = true
  
  try {
    const response = await axios.put(`${API_BASE_URL}/goals/mission-vision`, {
      tenant_id: tenantId.value,
      mission: tempMission.value,
      vision: tempVision.value,
      core_values: tempCoreValues.value,
      business_model: tempBusinessModel.value,
      who_we_are: tempWhoWeAre.value,
      what_we_do: tempWhatWeDo.value,
      regions_of_operation: tempRegionsOfOperation.value
    })
    
    // Update local state with saved values
    mission.value = tempMission.value
    vision.value = tempVision.value
    coreValues.value = tempCoreValues.value
    businessModel.value = tempBusinessModel.value
    whoWeAre.value = tempWhoWeAre.value
    whatWeDo.value = tempWhatWeDo.value
    regionsOfOperation.value = tempRegionsOfOperation.value
    
    showMissionModal.value = false
    
    // Show success message
    alert('Strategic foundation updated successfully!')
    
    // Optionally refresh data from backend
    await fetchMissionVision()
  } catch (err) {
    console.error('Error saving strategic foundation:', err)
    alert('Failed to save strategic foundation: ' + (err.response?.data?.detail || err.message))
  } finally {
    isSavingMission.value = false
  }
}

// Calculate strategic metrics from AI analysis
const calculateStrategicMetrics = () => {
  // This would typically call an AI endpoint
  // For now, we'll use mock calculations based on mission/vision presence
  if (mission.value && vision.value && coreValues.value) {
    strategicFitIndex.value = 0.75 + (Math.random() * 1.1)
    internalCoherence.value = 70 + Math.floor(Math.random() * 20)
    businessModelScore.value = 75 + Math.floor(Math.random() * 15)
  } else {
    strategicFitIndex.value = 0.40 + (Math.random() * 1.2)
    internalCoherence.value = 40 + Math.floor(Math.random() * 20)
    businessModelScore.value = 50 + Math.floor(Math.random() * 20)
  }
}

// Fetch all goals for tenant
const fetchGoals = async () => {
  if (!tenantId.value) return
  try {
    const res = await axios.get(`${API_BASE_URL}/goals`, { params: { tenant_id: tenantId.value } })
    activeGoals.value = res.data || []
  } catch (err) {
    activeGoals.value = []
  }
}

// Create or update a goal
const createGoal = async () => {
  if (!tenantId.value) {
    alert('Tenant ID not found. Please log in again.')
    return
  }
  
  isSavingGoal.value = true
  
  try {
    const payload = {
      ...newGoal.value,
      type: selectedGoalType.value,
      tenant_id: tenantId.value
    }
    
    // Check if we're editing (has id) or creating new
    if (newGoal.value.id) {
      // Update existing goal
      await axios.put(`${API_BASE_URL}/goals/${newGoal.value.id}`, payload)
      alert('Goal updated successfully!')
    } else {
      // Create new goal
      await axios.post(`${API_BASE_URL}/goals`, payload)
      alert('Goal created successfully!')
    }
    
    showGoalModal.value = false
    await fetchGoals()
  } catch (err) {
    console.error('Error saving goal:', err)
    alert('Failed to save goal: ' + (err.response?.data?.detail || err.message))
  } finally {
    isSavingGoal.value = false
  }
}

// Update a goal
const updateGoal = async (goalId, updatedGoal) => {
  if (!tenantId.value) return
  try {
    await axios.put(`${API_BASE_URL}/goals/${goalId}`, {
      ...updatedGoal,
      tenant_id: tenantId.value
    })
    await fetchGoals()
  } catch (err) {
    alert('Failed to update goal')
  }
}

// Toggle three-dot menu for a goal
const toggleGoalMenu = (goalId) => {
  if (openMenuGoalId.value === goalId) {
    openMenuGoalId.value = null
  } else {
    openMenuGoalId.value = goalId
  }
}

// Close menu when clicking outside
const closeGoalMenu = () => {
  openMenuGoalId.value = null
}

// Edit a goal - populate modal with existing data
const editGoal = (goal) => {
  Object.assign(newGoal.value, {
    id: goal.id,
    title: goal.title,
    category: goal.category,
    priority: goal.priority,
    deadline: goal.deadline,
    specific: goal.specific,
    measurable: goal.measurable,
    current: goal.current,
    target: goal.target,
    type: goal.type,
    progress: goal.progress,
    tenant_id: tenantId.value
  })
  showGoalModal.value = true
  closeGoalMenu()
}

// Confirm before deleting
const confirmDeleteGoal = (goalId) => {
  const goal = activeGoals.value.find(g => g.id === goalId)
  if (confirm(`Are you sure you want to delete "${goal?.title}"?`)) {
    deleteGoal(goalId)
  }
  closeGoalMenu()
}

// Delete a goal
const deleteGoal = async (goalId) => {
  if (!tenantId.value) return
  
  isDeletingGoal.value = true
  
  try {
    await axios.delete(`${API_BASE_URL}/goals/${goalId}`, { params: { tenant_id: tenantId.value } })
    await fetchGoals()
    alert('Goal deleted successfully!')
  } catch (err) {
    console.error('Error deleting goal:', err)
    alert('Failed to delete goal: ' + (err.response?.data?.detail || err.message))
  } finally {
    isDeletingGoal.value = false
  }
}

// Modal open helpers
const openCreateGoalModal = () => {
  Object.assign(newGoal.value, {
    id: null, // Clear id to indicate creating new goal
    title: '',
    category: 'Revenue Growth',
    priority: 'medium',
    deadline: '',
    specific: '',
    measurable: '',
    current: '',
    target: '',
    type: selectedGoalType.value,
    tenant_id: tenantId.value
  })
  showGoalModal.value = true
}

// Update goal progress
const updateGoalProgress = async (goalId) => {
  const goal = activeGoals.value.find(g => g.id === goalId)
  if (!goal) return
  
  const newProgress = prompt(`Update progress for "${goal.title}" (0-100):`, goal.progress)
  if (newProgress !== null) {
    const progress = Math.max(0, Math.min(100, parseInt(newProgress) || 0))
    await updateGoal(goalId, { ...goal, progress })
  }
}

// View goal analytics
const viewGoalAnalytics = (goalId) => {
  // TODO: Navigate to detailed analytics view
  alert(`Analytics for goal ${goalId} - Coming soon!`)
}

// Handle nudge action
const handleNudgeAction = (nudgeId) => {
  // TODO: Implement nudge action handling
  console.log('Nudge action:', nudgeId)
}

// --- Data Display (from workflowResult for dashboard) ---
const missionDisplay = computed(() => mission.value || workflowResult.value?.mission || '')
const visionDisplay = computed(() => vision.value || workflowResult.value?.vision || '')

function ensureArray(val) {
  return Array.isArray(val) ? val : []
}

const activeGoalsDisplay = computed(() => {
  if (Array.isArray(activeGoals.value) && activeGoals.value.length > 0) {
    return activeGoals.value
  }
  if (Array.isArray(workflowResult.value?.goals)) {
    return workflowResult.value.goals
  }
  return []
})

const filteredGoals = computed(() => {
  return ensureArray(activeGoalsDisplay.value).filter(g => g.type === selectedGoalType.value)
})

// Pagination
const currentPage = ref(1)
const itemsPerPage = 6

const totalPages = computed(() => Math.ceil(filteredGoals.value.length / itemsPerPage))

const paginatedGoals = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredGoals.value.slice(start, end)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const goalCountByType = (type) => {
  return ensureArray(activeGoalsDisplay.value).filter(g => g.type === type).length
}

const avgProgress = computed(() => {
  const goals = filteredGoals.value
  if (goals.length === 0) return 0
  const total = goals.reduce((sum, g) => sum + (g.progress || 0), 0)
  return Math.round(total / goals.length)
})

const avgAlignmentScore = computed(() => {
  const goals = activeGoalsDisplay.value
  if (goals.length === 0) return 0
  const total = goals.reduce((sum, g) => sum + (g.alignmentScore || 0), 0)
  return Math.round(total / goals.length)
})

const totalBadges = computed(() => {
  return activeGoalsDisplay.value.reduce((sum, goal) => sum + (goal.badges ? goal.badges.length : 0), 0)
})

const behavioralNudges = computed(() => workflowResult.value?.nudges || [])

// --- Lifecycle ---
onMounted(async () => {
  await fetchMissionVision()
  await fetchGoals()
  await fetchStrategicMetrics()
  await fetchEmployees()
  
  // Add click event listener to close menu when clicking outside
  document.addEventListener('click', closeGoalMenu)
})

// Cleanup event listener on component unmount
onUnmounted(() => {
  document.removeEventListener('click', closeGoalMenu)
})

// Fetch strategic metrics from backend
const fetchStrategicMetrics = async () => {
  if (!tenantId.value) return
  try {
    const res = await axios.get(`${API_BASE_URL}/goals/strategic-metrics`, { params: { tenant_id: tenantId.value } })
    
    // Update VARS framework
    if (res.data.varsFramework) {
      varsFramework.value = res.data.varsFramework
    }
    
    // Update strategic metrics
    if (res.data.strategicFitIndex !== undefined) {
      strategicFitIndex.value = res.data.strategicFitIndex
    }
    if (res.data.internalCoherence !== undefined) {
      internalCoherence.value = res.data.internalCoherence
    }
    if (res.data.businessModelScore !== undefined) {
      businessModelScore.value = res.data.businessModelScore
    }
  } catch (err) {
    console.error('Failed to fetch strategic metrics:', err)
  }
}

// Add console logs for debugging
console.log('GoalsSubpage - activeGoals:', activeGoalsDisplay.value)
console.log('GoalsSubpage - filteredGoals:', filteredGoals.value)
console.log('GoalsSubpage - avgProgress:', avgProgress.value)
console.log('GoalsSubpage - avgAlignmentScore:', avgAlignmentScore.value)
console.log('GoalsSubpage - totalBadges:', totalBadges.value)
</script>

<style scoped>
</style>
