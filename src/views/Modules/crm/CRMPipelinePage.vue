<template>
  <div class="min-h-screen flex flex-col font-sans relative text-gray-900">
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <!-- Header -->
    <header class="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-[100] shadow-sm">
      <div class="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <button @click="$router.push('/dashboard/crm')" class="text-gray-500 hover:text-[#2F2E8B] transition p-2">
            <i class="fas fa-arrow-left"></i>
          </button>
          <div class="w-2 h-8 bg-[#2F2E8B] rounded-none"></div>
          <div>
            <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">CRM // Pipeline</span>
            <h1 class="text-xl font-black text-gray-900 uppercase tracking-tight font-outfit">Events Pipeline</h1>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <!-- Branch Selector -->
          <div class="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-none">
            <i class="fas fa-store text-[10px] text-gray-400"></i>
            <select 
              v-if="branches.length > 0"
              v-model="selectedBranch" 
              @change="onBranchChange"
              class="text-[10px] font-bold font-mono uppercase bg-transparent border-none focus:ring-0 cursor-pointer p-0"
            >
              <option value="">ALL DIVISIONS</option>
              <option v-for="branch in branches" :key="branch._id" :value="branch._id">{{ branch.name.toUpperCase() }}</option>
            </select>
          </div>

          <!-- User Badge -->
          <div class="hidden md:flex items-center gap-2 text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider border-l border-gray-200 pl-4">
            <i class="fas fa-user-circle"></i>
            {{ getUserEmail()?.split('@')[0] || 'OPERATOR' }}
          </div>
        </div>
      </div>
    </header>

    <!-- CRM Section Navigation -->
    <nav class="bg-white border-b border-gray-100 sticky top-16 z-[99]">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-0">
          <router-link to="/dashboard/crm/leads"
            class="flex items-center gap-2 px-5 py-3 text-[10px] font-mono font-black uppercase tracking-widest border-b-2 transition-colors"
            :class="$route.path === '/dashboard/crm/leads' ? 'border-[#2F2E8B] text-[#2F2E8B]' : 'border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300'"
          >
            <i class="fas fa-user-plus text-[10px]"></i> Leads
          </router-link>
          <router-link to="/dashboard/crm/pipeline"
            class="flex items-center gap-2 px-5 py-3 text-[10px] font-mono font-black uppercase tracking-widest border-b-2 transition-colors"
            :class="$route.path === '/dashboard/crm/pipeline' ? 'border-[#2F2E8B] text-[#2F2E8B]' : 'border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300'"
          >
            <i class="fas fa-project-diagram text-[10px]"></i> Events Pipeline
          </router-link>
          <router-link to="/dashboard/crm/accounts"
            class="flex items-center gap-2 px-5 py-3 text-[10px] font-mono font-black uppercase tracking-widest border-b-2 transition-colors"
            :class="$route.path === '/dashboard/crm/accounts' ? 'border-[#2F2E8B] text-[#2F2E8B]' : 'border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300'"
          >
            <i class="fas fa-building text-[10px]"></i> Accounts
          </router-link>
        </div>
      </div>
    </nav>

    <div class="flex-1 w-full relative z-10 pb-40">
      <div id="module-pipeline" class="space-y-6 relative p-4 sm:p-6 lg:p-8">
        <!-- Skeleton Loading -->
        <div v-if="moduleLoading" class="space-y-4 w-full animate-pulse">
          <div class="flex items-center justify-between pb-6 border-b border-gray-100">
            <div class="flex gap-4 items-center">
              <div class="h-10 w-32 bg-gray-200 rounded-sm"></div>
              <div class="h-8 w-24 bg-gray-100 rounded-sm"></div>
              <div class="h-8 w-24 bg-gray-100 rounded-sm"></div>
            </div>
            <div class="flex gap-3">
              <div class="h-8 w-56 bg-gray-200 rounded-sm"></div>
              <div class="h-8 w-36 bg-gray-100 rounded-sm"></div>
            </div>
          </div>
          <div class="flex gap-3 overflow-hidden">
            <div v-for="i in 7" :key="i" class="h-28 w-44 bg-gray-100 rounded-sm shrink-0"></div>
          </div>
          <div class="flex gap-3 overflow-hidden">
            <div v-for="col in 4" :key="col" class="w-60 space-y-2 shrink-0">
              <div class="h-16 w-full bg-gray-200 rounded-sm"></div>
              <div v-for="card in 3" :key="card" class="h-24 w-full bg-gray-100 rounded-sm"></div>
            </div>
          </div>
        </div>

        <div v-else class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-100 pb-6">
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full sm:w-auto">
            <div class="flex items-center gap-4">
              <button @click="openAddStageModal" class="px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-[#2F2E8B] transition flex items-center gap-2 text-[10px] font-mono font-black uppercase tracking-widest" title="Add Custom Stage">
                <i class="fas fa-plus"></i><span class="hidden sm:inline">Add Stage</span>
              </button>
              <!-- Pipeline Settings -->
              <div class="relative" @click.stop>
                <button @click="showPipelineSettings = !showPipelineSettings" class="px-3 py-2 border border-gray-200 text-gray-500 hover:border-[#2F2E8B] hover:text-[#2F2E8B] text-[10px] font-mono font-black uppercase tracking-widest transition flex items-center gap-1.5" title="Pipeline Settings">
                  <i class="fas fa-sliders-h"></i>
                  <span class="hidden sm:inline">Settings</span>
                </button>
                <div v-if="showPipelineSettings" class="absolute right-0 top-full mt-1 bg-white border border-gray-100 shadow-lg z-[99999] min-w-[200px] rounded-sm py-1">
                  <label class="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 cursor-pointer">
                    <input type="checkbox" v-model="showStageAmounts" class="accent-[#2F2E8B] w-3 h-3" />
                    <span class="text-[9px] font-mono font-bold text-gray-700 uppercase tracking-widest">Show Amounts</span>
                  </label>
                  <div class="px-3 py-1.5 border-t border-gray-50 border-b border-gray-50 mt-1">
                    <span class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Stage Visibility</span>
                  </div>
                  <div class="max-h-40 overflow-y-auto">
                    <label v-for="stg in allPipelineStages" :key="stg.id" class="flex items-center gap-2 px-3 py-1 hover:bg-gray-50 cursor-pointer">
                      <input type="checkbox" :checked="!hiddenStageIds.includes(stg.id)" @change="toggleStageVisibility(stg.id)" class="accent-[#2F2E8B] w-3 h-3" />
                      <span class="text-[9px] font-mono font-bold text-gray-700 uppercase tracking-widest">{{ stg.name }}</span>
                      <span class="text-[7px] font-mono text-gray-400 uppercase ml-auto">{{ stg.entity }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Search Bar -->
            <div class="relative w-full sm:w-64">
              <input 
                v-model="pipelineSearchQuery" 
                type="text" 
                placeholder="SEARCH LEADS, COMPANIES..." 
                class="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-none text-xs font-mono placeholder-gray-400 focus:border-[#2F2E8B] focus:ring-0 transition uppercase"
              >
              <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
              <button v-if="pipelineSearchQuery" @click="pipelineSearchQuery = ''" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <i class="fas fa-times text-xs"></i>
              </button>
            </div>

            <!-- Assigned User Filter -->
            <div class="relative flex items-center">
              <i class="fas fa-user-tag absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
              <select
                v-model="pipelineAssignedFilter"
                class="pl-9 pr-8 py-2 bg-white border border-gray-200 rounded-none text-[10px] font-mono font-bold uppercase tracking-widest text-gray-600 focus:border-[#2F2E8B] focus:ring-0 transition cursor-pointer min-w-[160px]"
              >
                <option value="">ALL REPS</option>
                <option v-for="user in tenantUsers" :key="user.email" :value="user.email.toLowerCase()">
                  {{ (user.name || user.email.split('@')[0]).toUpperCase() }}
                </option>
              </select>
              <button v-if="pipelineAssignedFilter" @click="pipelineAssignedFilter = ''" class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2F2E8B]" title="Clear filter">
                <i class="fas fa-times text-xs"></i>
              </button>
            </div>
          </div>
          <button @click="pipelineMobileView = !pipelineMobileView" class="lg:hidden px-4 py-2 bg-gray-100 hover:bg-gray-200 text-xs font-mono font-bold uppercase transition flex items-center gap-2">
            <i :class="pipelineMobileView ? 'fas fa-th' : 'fas fa-list'"></i>
            {{ pipelineMobileView ? 'Board' : 'List' }}
          </button>
        </div>

        <!-- Kanban Board (Desktop) -->
        <div v-if="!pipelineMobileView" class="relative">
          <!-- Scroll Arrows -->
          <button @click="scrollKanban(-1)" class="hidden sm:flex absolute -left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 items-center justify-center bg-white border border-gray-200 shadow-md hover:border-[#2F2E8B] hover:text-[#2F2E8B] text-gray-500 transition-colors rounded-full" title="Scroll left">
            <i class="fas fa-chevron-left text-xs"></i>
          </button>
          <button @click="scrollKanban(1)" class="hidden sm:flex absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 items-center justify-center bg-white border border-gray-200 shadow-md hover:border-[#2F2E8B] hover:text-[#2F2E8B] text-gray-500 transition-colors rounded-full" title="Scroll right">
            <i class="fas fa-chevron-right text-xs"></i>
          </button>
          <!-- Top scrollbar (visible, above columns) -->
          <div ref="kanbanTopScrollRef" class="overflow-x-scroll mb-2 py-0.5 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-track]:rounded-sm [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full" style="scrollbar-width: auto; scrollbar-color: #9ca3af #f3f4f6; min-height: 20px;" @scroll="onTopScroll">
            <div :style="{ width: kanbanInnerWidth || (activePipelineStages.length * 14) + 'rem', height: '5px' }"></div>
          </div>
          <div ref="kanbanScrollRef" id="kanban-scroll-container" class="w-full overflow-x-auto overflow-y-hidden" style="scrollbar-width: none; -ms-overflow-style: none;" @scroll="onKanbanScroll">
            <div ref="kanbanInnerRef" class="grid gap-3" :style="{ gridTemplateColumns: `repeat(${activePipelineStages.length}, minmax(12rem, 1fr))`, minWidth: activePipelineStages.length > 4 ? `${activePipelineStages.length * 14}rem` : '100%' }">
              <div v-for="stage in activePipelineStages" :key="stage.id" :data-stage-id="stage.id" class="bg-gray-50/50 rounded-none overflow-hidden border border-gray-200/50 min-w-0"
                @drop="onDrop($event, stage.id)" @dragover.prevent @dragenter.prevent="onDragEnter($event, stage.id)" @dragleave="onDragLeave($event, stage.id)">
              
              <!-- Column Header -->
              <div class="p-2 border-b-2 bg-white relative overflow-hidden group" :class="stage.borderClass">
                 <div class="relative z-10 flex justify-between items-start">
                    <div>
                        <div class="flex items-center gap-1.5">
                          <!-- Editable stage name -->
                          <template v-if="editingStageId === stage.id">
                            <input v-model="editingStageName" @keyup.enter="saveStageRename(stage)" @blur="saveStageRename(stage)" @keyup.escape="editingStageId = null"
                              class="w-24 border border-[#2F2E8B] px-1 py-0.5 text-[10px] font-mono font-black uppercase tracking-widest outline-none bg-white" ref="stageRenameInput" />
                          </template>
                          <template v-else>
                            <h4 class="font-black text-[10px] text-gray-900 uppercase tracking-widest font-mono">{{ stage.name }}</h4>
                            <button @click.stop="startStageRename(stage)" class="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-[#2F2E8B] transition-all" title="Rename stage">
                              <i class="fas fa-pen text-[8px]"></i>
                            </button>
                          </template>
                          <span v-if="accountConversionStages.includes(stage.id)" class="px-1 py-0.5 bg-green-100 text-green-700 text-[7px] font-mono font-black uppercase tracking-widest border border-green-200" title="Leads dropped here auto-convert to Accounts">ACCT</span>
                        </div>
                        <div class="flex items-center gap-1.5 mt-0.5">
                           <span class="bg-[#2F2E8B] text-white px-1.5 py-0.5 text-[8px] font-mono font-bold">{{ kpiLeadsByStage(stage.id).length }}</span>
                           <span v-if="showStageAmounts" class="text-[8px] font-mono font-bold text-gray-700">{{ formatCurrency(kpiStageValue(stage.id)) }}</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-1">
                      <button @click.stop="moveStage(stage, -1)" :disabled="isFirstVisibleStage(stage)" class="text-gray-300 hover:text-[#2F2E8B] disabled:opacity-20 transition-colors" title="Move left">
                        <i class="fas fa-chevron-left text-[8px]"></i>
                      </button>
                      <button @click.stop="moveStage(stage, 1)" :disabled="isLastVisibleStage(stage)" class="text-gray-300 hover:text-[#2F2E8B] disabled:opacity-20 transition-colors" title="Move right">
                        <i class="fas fa-chevron-right text-[8px]"></i>
                      </button>
                      <button @click.stop="openAddForStage(stage)"
                        class="w-6 h-6 flex items-center justify-center bg-[#2F2E8B] text-white hover:bg-[#3D2F88] rounded-sm transition-all text-[9px] font-bold"
                        :title="stage.id === 'closed-won' ? 'Add Account' : 'Add Lead'">
                        <i class="fas fa-plus text-[8px]"></i>
                      </button>
                      <button @click.stop="accountConversionStages.includes(stage.id) ? accountConversionStages.splice(accountConversionStages.indexOf(stage.id), 1) : accountConversionStages.push(stage.id)"
                        :class="accountConversionStages.includes(stage.id) ? 'text-green-500 hover:text-gray-400' : 'text-gray-300 hover:text-green-500'"
                        class="transition-colors" :title="accountConversionStages.includes(stage.id) ? 'Disable auto-convert to account' : 'Enable auto-convert to account for this stage'">
                        <i class="fas fa-building text-[9px]"></i>
                      </button>
                      <button v-if="stage.isCustom || !stage.entity || stage.id !== 'new'" @click.stop="removeCustomStage(stage.id)" class="text-gray-300 hover:text-red-500 transition-colors" title="Delete Stage"><i class="fas fa-trash-alt text-[9px]"></i></button>
                    </div>
                 </div>
              </div>

              <!-- Draggable Area -->
              <div class="p-1.5 space-y-1.5 min-h-[350px] max-h-[calc(100vh-280px)] overflow-y-auto custom-scrollbar transition-colors" :class="{ 'bg-blue-50/50 border-2 border-dashed border-[#2F2E8B]/20': dragOverStage === stage.id }">
                <div v-for="record in getVisibleLeadsByStage(stage.id)" :key="`${record.entityType || 'lead'}-${record.id}`" draggable="true"
                  @dragstart="onDragStart($event, record)" @dragend="onDragEnd"
                  @click="(record.entityType || (stage.entity || '').slice(0, -1)) === 'lead' ? editLead(record) : ((record.entityType || (stage.entity || '').slice(0, -1)) === 'account' ? openAccountProfile(record) : viewRecord(record, (record.entityType || (stage.entity || '').slice(0, -1)) + 's'))"
                  class="bg-white rounded-sm p-2 shadow-sm border border-gray-100 hover:border-[#2F2E8B] transition-all cursor-move group relative"
                  :class="[
                    { 'opacity-50 dashed-border': draggingLead && draggingLead.id === record.id && dragState?.status === 'dragging' },
                    { 'opacity-70 border-2 border-blue-400 animate-pulse': dragState?.status === 'updating' && dragState?.record?.id === record.id },
                    { 'border-2 border-green-400 bg-green-50': dragState?.status === 'success' && dragState?.record?.id === record.id },
                    { 'border-2 border-red-400 bg-red-50': dragState?.status === 'error' && dragState?.record?.id === record.id }
                  ]">
                  
                  <!-- Entity Type Label -->
                  <div class="mb-1 flex items-center gap-1 flex-wrap">
                     <span class="text-[7px] font-mono font-black uppercase tracking-widest px-1 py-0.5 bg-gray-50 text-gray-700 border border-gray-100">
                        {{ record.entityType || stage.entity.slice(0, -1) }} {{ record.priority ? '// ' + record.priority : '' }}
                     </span>
                     <span v-if="record.previousStage && record.previousStage !== record.stage"
                       class="text-[7px] font-mono font-black uppercase tracking-widest px-1 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-0.5">
                       <i class="fas fa-arrow-right text-[6px]"></i>
                       {{ getStageName(record.previousStage) }}
                     </span>
                  </div>

                  <div class="flex items-start justify-between mb-1">
                    <div class="flex-1 min-w-0">
                      <div class="font-bold text-[10px] text-gray-900 truncate uppercase tracking-tight">{{ getRecordTitle(record, (record.entityType ? record.entityType + 's' : stage.entity)) }}</div>
                      <div class="text-[8px] font-bold text-gray-700 font-mono truncate uppercase">{{ getRecordSubtitle(record, (record.entityType ? record.entityType + 's' : stage.entity)) }}</div>
                    </div>
                  </div>
                  
                  <div class="pt-1 border-t border-gray-50 flex flex-wrap justify-between items-center gap-1">
                     <div v-if="showStageAmounts && getRecordValue(record, (record.entityType ? record.entityType + 's' : stage.entity))" class="text-[10px] font-black text-[#2F2E8B] font-mono">{{ formatCurrency(getRecordValue(record, (record.entityType ? record.entityType + 's' : stage.entity))) }}</div>
                     <div v-else-if="showStageAmounts" class="text-[8px] font-bold text-gray-500 font-mono">NO VALUE</div>
                     
                     <div class="flex items-center gap-1">
                       <button v-if="(record.entityType || (stage.entity || '').slice(0, -1)) === 'lead'" @click.stop="openLeadProfile(record)" class="w-6 h-6 flex items-center justify-center bg-blue-50 text-[#2F2E8B] hover:bg-[#2F2E8B] hover:text-white border border-blue-200 hover:border-[#2F2E8B] transition-colors rounded-sm" title="View Lead Profile">
                         <i class="fas fa-user text-[8px]"></i>
                       </button>
                       <button v-if="(record.entityType || (stage.entity || '').slice(0, -1)) === 'account'" @click.stop="openAccountProfile(record)" class="w-6 h-6 flex items-center justify-center bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 hover:border-emerald-600 transition-colors rounded-sm" title="View Account Profile">
                         <i class="fas fa-building text-[8px]"></i>
                       </button>
                       <button v-if="record.phone" @click.stop="openCallModal(record, (record.entityType ? record.entityType + 's' : stage.entity))" class="w-6 h-6 flex items-center justify-center bg-green-50 text-green-600 hover:bg-green-600 hover:text-white border border-green-200 hover:border-green-600 transition-colors rounded-sm" :title="`Call ${record.phone}`">
                         <i class="fas fa-phone text-[8px]"></i>
                       </button>
                       <button @click.stop="deletePipelineRecord(record, (record.entityType ? record.entityType + 's' : stage.entity))" class="w-6 h-6 flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-600 hover:text-white border border-red-200 hover:border-red-600 transition-colors rounded-sm" title="Delete">
                         <i class="fas fa-trash-alt text-[8px]"></i>
                       </button>
                       <div class="text-[8px] font-black text-[#2F2E8B] font-mono tracking-widest">EDIT</div>
                     </div>
                  </div>
                </div>
                
                <div v-if="getVisibleLeadsByStage(stage.id).length === 0" class="flex flex-col items-center justify-center py-8 opacity-40">
                  <div class="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">Empty Stage</div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>

        <!-- Mobile List View -->
        <div v-else class="space-y-4">
          <div v-for="stage in activePipelineStages" :key="`mobile-${stage.id}`" class="bg-white rounded-none border border-gray-200 overflow-hidden">
            <div class="px-4 py-3 border-b border-gray-200 bg-gray-50/50">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <h4 class="font-black text-sm text-gray-900 uppercase font-outfit">{{ stage.name }}</h4>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-xs font-mono font-bold text-gray-500">{{ kpiLeadsByStage(stage.id).length }} ITEMS</span>
                  <span v-if="showStageAmounts" class="text-xs font-mono font-black text-[#2F2E8B]">{{ formatCurrency(kpiStageValue(stage.id)) }}</span>
                </div>
              </div>
            </div>
            <div class="p-3 space-y-2">
              <div v-if="getVisibleLeadsByStage(stage.id).length === 0" class="text-center py-6 text-gray-400 text-sm">
                <p class="text-[10px] font-mono font-bold uppercase">No items</p>
              </div>
              <div v-else v-for="record in getVisibleLeadsByStage(stage.id)" :key="`mobile-${record.id}`" @click="(record.entityType || (stage.entity || '').slice(0, -1)) === 'lead' ? editLead(record) : ((record.entityType || (stage.entity || '').slice(0, -1)) === 'account' ? openAccountProfile(record) : viewRecord(record, (record.entityType || (stage.entity || '').slice(0, -1)) + 's'))"
                class="bg-white rounded-none p-3 border border-gray-100 hover:border-[#2F2E8B] transition cursor-pointer group">
                <div class="flex items-start justify-between mb-2">
                  <div class="flex-1 min-w-0">
                    <h5 class="font-bold text-xs text-gray-900 truncate uppercase">{{ getRecordTitle(record, (record.entityType ? record.entityType + 's' : stage.entity)) }}</h5>
                    <p class="text-[10px] text-gray-500 truncate font-mono">{{ getRecordSubtitle(record, (record.entityType ? record.entityType + 's' : stage.entity)) }}</p>                    <!-- Stage moved-from indicator (mobile) -->
                    <span v-if="record.previousStage && record.previousStage !== record.stage"
                      class="inline-flex items-center gap-1 mt-1 text-[8px] font-mono font-black uppercase tracking-widest px-1.5 py-0.5 bg-amber-50 text-amber-600 border border-amber-200">
                      <i class="fas fa-arrow-right text-[7px]"></i>
                      {{ getStageName(record.previousStage) }} → {{ getStageName(record.stage) }}
                    </span>                  </div>
                  <div class="flex items-center gap-1 ml-2">
                    <button v-if="(record.entityType || (stage.entity || '').slice(0, -1)) === 'lead'" @click.stop="openLeadProfile(record)" class="w-7 h-7 flex items-center justify-center bg-blue-50 text-[#2F2E8B] hover:bg-[#2F2E8B] hover:text-white border border-blue-200 transition-colors" title="View Lead Profile">
                      <i class="fas fa-user text-[10px]"></i>
                    </button>
                    <button v-if="(record.entityType || (stage.entity || '').slice(0, -1)) === 'account'" @click.stop="openAccountProfile(record)" class="w-7 h-7 flex items-center justify-center bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 transition-colors" title="View Account Profile">
                      <i class="fas fa-building text-[10px]"></i>
                    </button>
                    <button v-if="record.phone" @click.stop="openCallModal(record, (record.entityType ? record.entityType + 's' : stage.entity))" class="w-7 h-7 flex items-center justify-center bg-green-50 text-green-600 hover:bg-green-600 hover:text-white border border-green-200 transition-colors" :title="`Call ${record.phone}`">
                      <i class="fas fa-phone text-[10px]"></i>
                    </button>
                    <button @click.stop="deletePipelineRecord(record, (record.entityType ? record.entityType + 's' : stage.entity))" class="w-7 h-7 flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-600 hover:text-white border border-red-200 transition-colors" title="Delete">
                      <i class="fas fa-trash-alt text-[10px]"></i>
                    </button>
                  </div>
                </div>
                <div v-if="showStageAmounts && getRecordValue(record, stage.entity)" class="text-sm font-black text-[#2F2E8B] font-mono mb-2">{{ formatCurrency(getRecordValue(record, stage.entity)) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lead Form Modal (Add/Edit) -->
    <Teleport to="body">
      <div v-if="showLeadModal" class="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 backdrop-blur-sm bg-black/40">
        <div class="bg-white shadow-2xl w-full max-w-5xl max-h-[95vh] sm:max-h-[92vh] overflow-hidden flex flex-col border border-gray-200">
          <!-- Modal Header -->
          <div class="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5 border-b border-white/20 bg-[#2F2E8B] sticky top-0 z-10">
            <div class="flex items-center gap-2 sm:gap-3">
              <div class="w-1 sm:w-1.5 h-5 sm:h-6 bg-white/40"></div>
              <div>
                <div class="text-[8px] sm:text-[10px] font-mono font-black text-blue-200 uppercase tracking-[0.2em] mb-0.5">Lead_Protocol // {{ leadModalTitle.split(' ')[0].toUpperCase() }}</div>
                <h3 class="text-base sm:text-xl font-black text-white uppercase tracking-tight">{{ leadModalTitle }}</h3>
              </div>
            </div>
            <button @click="closeLeadModal" class="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-white/30 bg-white/10 text-white hover:bg-white/20 transition-all">
              <X :size="18" />
            </button>
          </div>

          <!-- Modal Body (Scrollable) -->
          <div class="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar relative">
            <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-[0.03]"></div>
            
            <form @submit.prevent="submitLead" class="space-y-6 sm:space-y-8 relative z-10">

              <!-- COMPACT QUICK-ADD (new leads, before expand) -->
              <div v-if="!showExpandedLeadForm && !leadForm.id" class="space-y-3">
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
                <div>
                  <input v-model="leadForm.email" type="email" placeholder="Email (optional)"
                    class="w-full bg-gray-50 border border-gray-200 px-3 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none transition placeholder:text-gray-400" />
                </div>
                <div>
                  <input v-model="leadForm.company" type="text" placeholder="Company (optional)"
                    class="w-full bg-gray-50 border border-gray-200 px-3 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none transition placeholder:text-gray-400" />
                </div>
                <!-- Location -->
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
                <div v-if="locationSearchResults.length > 0" class="max-h-28 overflow-y-auto border border-gray-100 bg-gray-50">
                  <div v-for="(result, idx) in locationSearchResults" :key="idx" @click="selectSearchResult(result)"
                    class="p-2 hover:bg-[#2F2E8B]/5 cursor-pointer border-b border-gray-100 last:border-b-0 text-xs font-medium text-gray-700">
                    {{ result.display_name }}
                  </div>
                </div>
                <div id="lead-map" class="w-full h-36 sm:h-44 bg-gray-100 border border-gray-200 overflow-hidden rounded"></div>
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

                <div>
                  <textarea v-model="leadForm.notes" rows="2"
                    class="w-full bg-gray-50 border border-gray-200 px-3 py-2.5 text-sm resize-none focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none transition placeholder:text-gray-400"
                    placeholder="Notes (optional)"></textarea>
                </div>
                <div class="text-center pt-1">
                  <button type="button" @click="showExpandedLeadForm = true"
                    class="text-xs text-gray-400 hover:text-[#2F2E8B] font-medium transition-colors inline-flex items-center gap-1">
                    <ChevronDown :size="12" />
                    More fields
                  </button>
                </div>
              </div>

              <!-- FULL EXPANDED FORM (edit mode OR after expand) -->
              <div v-else>
                <div v-if="!leadForm.id" class="flex justify-end mb-2">
                  <button type="button" @click="showExpandedLeadForm = false"
                    class="px-3 py-1.5 text-[9px] font-mono font-bold text-gray-400 hover:text-[#2F2E8B] uppercase tracking-widest flex items-center gap-1 transition-colors">
                    <ChevronUp :size="12" />
                    Compact_View
                  </button>
                </div>

              <!-- Basic Information -->
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                <div class="lg:col-span-12">
                  <h4 class="text-[11px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest border-b border-gray-100 pb-2">Basic Information</h4>
                </div>
                <div class="lg:col-span-4 space-y-2">
                  <label class="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">Full_Designation *</label>
                  <input v-model="leadForm.name" required type="text" class="w-full border border-gray-200 px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none" />
                </div>
                <div class="lg:col-span-4 space-y-2">
                  <label class="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">COMM_ENDPOINT_MAIL *</label>
                  <input v-model="leadForm.email" required type="email" class="w-full border border-gray-200 px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none" />
                </div>
                <div class="lg:col-span-4 space-y-2">
                  <label class="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">COMM_ENDPOINT_PHONE</label>
                  <input v-model="leadForm.phone" type="tel" class="w-full border border-gray-200 px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none" />
                </div>
                <div class="lg:col-span-3 space-y-2">
                  <label class="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">Tax_ID (TPIN)</label>
                  <input v-model="leadForm.tpin" type="text" class="w-full border border-gray-200 px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none" />
                </div>
                <div class="lg:col-span-3 space-y-2">
                  <label class="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">Organization</label>
                  <input v-model="leadForm.company" type="text" class="w-full border border-gray-200 px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none" />
                </div>
                <div class="lg:col-span-3 space-y-2">
                  <label class="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">Executive_Position</label>
                  <input v-model="leadForm.position" type="text" placeholder="E.G. CEO, MANAGER" class="w-full border border-gray-200 px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none" />
                </div>
                <div class="lg:col-span-3 space-y-2">
                  <label class="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">Lead_Source</label>
                  <input v-model="leadForm.source" type="text" list="lead-source-options" placeholder="SELECT OR TYPE..." class="w-full border border-gray-200 px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none" />
                  <datalist id="lead-source-options">
                    <option value="Website"></option><option value="WhatsApp"></option><option value="Email"></option>
                    <option value="Phone Call"></option><option value="Referral"></option><option value="Event"></option>
                    <option value="Social Media"></option><option value="Direct Mail"></option><option value="Advertisement"></option>
                    <option value="Trade Show"></option><option value="Partner"></option><option value="Cold Call"></option>
                    <option value="LinkedIn"></option><option value="Facebook"></option><option value="Instagram"></option>
                    <option value="Twitter"></option><option value="Google Search"></option><option value="Other"></option>
                  </datalist>
                </div>
              </div>

              <!-- Pipeline_Status -->
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                <div class="lg:col-span-12">
                  <h4 class="text-[11px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest border-b border-gray-100 pb-2">Pipeline_Status</h4>
                </div>
                <div class="lg:col-span-4 space-y-2">
                  <label class="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">Priority_Rank</label>
                  <select v-model="leadForm.priority" class="w-full border border-gray-200 px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none">
                    <option value="">SET_PRIORITY</option><option value="hot">HOT</option><option value="warm">WARM</option><option value="cold">COLD</option>
                  </select>
                </div>
                <div class="lg:col-span-4 space-y-2">
                  <label class="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">Pipeline_Stage</label>
                  <select v-model="leadForm.stage" class="w-full border border-gray-200 px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none">
                    <option v-for="stage in allPipelineStages" :key="stage.id" :value="stage.id">{{ stage.name.toUpperCase() }}</option>
                  </select>
                </div>
                <div class="lg:col-span-4 space-y-2">
                  <label class="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">Projected_Value</label>
                  <input v-model.number="leadForm.value" type="number" min="0" step="0.01" class="w-full border border-gray-200 px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none" />
                </div>
              </div>

              <!-- Regional_Mapping -->
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                <div class="lg:col-span-12">
                  <h4 class="text-[11px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest border-b border-gray-100 pb-2">Regional_Mapping</h4>
                </div>
                <div class="lg:col-span-4 space-y-2">
                  <label class="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">City / District</label>
                  <input v-model="leadForm.city" type="text" class="w-full border border-gray-200 px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none" />
                </div>
                <div class="lg:col-span-4 space-y-2">
                  <label class="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">Country / Region</label>
                  <input v-model="leadForm.country" type="text" class="w-full border border-gray-200 px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none" />
                </div>
                <div class="lg:col-span-4 space-y-2">
                  <label class="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">Website</label>
                  <input v-model="leadForm.website" type="url" class="w-full border border-gray-200 px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none" />
                </div>
              </div>

              <!-- Operational Information (Assignee) -->
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                <div class="lg:col-span-12">
                  <h4 class="text-[11px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest border-b border-gray-100 pb-2">Operational_Information</h4>
                </div>
                <div class="lg:col-span-6 space-y-2">
                  <label class="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">Resource_Assignment</label>
                  <div v-if="!canAssignCrm" class="px-3 py-2 bg-gray-50 border border-dashed border-gray-200 text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Assignment locked</div>
                  <div v-else class="relative">
                    <input v-model="assignToSearch" type="text" placeholder="SEARCH OPERATORS..." @focus="showAssignToDropdown = true" class="w-full border border-gray-200 px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none" />
                    <div v-if="showAssignToDropdown && filteredAssignToUsers?.length > 0" class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 shadow-xl z-[100001] max-h-60 overflow-y-auto">
                      <button v-for="user in filteredAssignToUsers" :key="user.email" type="button" @click="selectAssignTo(user)" class="w-full text-left px-4 py-2 hover:bg-gray-50 transition flex items-center gap-3 border-b border-gray-50 last:border-0">
                        <div class="w-6 h-6 bg-gray-200 flex items-center justify-center text-[10px] font-bold font-mono">{{ getUserInitials(user.email) }}</div>
                        <div class="flex-1 min-w-0">
                          <div class="text-[10px] font-bold font-mono uppercase text-gray-900 truncate">{{ user.email }}</div>
                          <div class="text-[9px] font-mono text-gray-400 uppercase tracking-wider">{{ user.role || 'User' }}</div>
                        </div>
                      </button>
                    </div>
                    <div v-if="leadForm.assignedTo" class="mt-2 flex items-center gap-2">
                      <span class="text-[9px] font-mono font-bold text-gray-500 uppercase">Assigned:</span>
                      <span class="text-[10px] font-mono font-bold text-[#2F2E8B] uppercase">{{ leadForm.assignedTo }}</span>
                      <button type="button" @click="leadForm.assignedTo = ''; assignToSearch = ''" class="text-red-500 hover:text-red-700"><i class="fas fa-times"></i></button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Digital_Footprint -->
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                <div class="lg:col-span-12">
                  <h4 class="text-[11px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest border-b border-gray-100 pb-2">Digital_Footprint</h4>
                </div>
                <div class="lg:col-span-4 space-y-2">
                  <label class="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">LinkedIn</label>
                  <input v-model="leadForm.linkedin" type="url" class="w-full border border-gray-200 px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none" />
                </div>
                <div class="lg:col-span-4 space-y-2">
                  <label class="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">Twitter (X)</label>
                  <input v-model="leadForm.twitter" type="text" class="w-full border border-gray-200 px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none" />
                </div>
                <div class="lg:col-span-4 space-y-2">
                  <label class="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">Facebook / Instagram</label>
                  <input v-model="leadForm.facebook" type="text" class="w-full border border-gray-200 px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none" />
                </div>
              </div>

              <!-- Staged Assets -->
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                <div class="lg:col-span-12">
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
                  <div v-if="pendingLeadDocuments.length === 0" class="text-center py-8 bg-gray-50/50 border border-dashed border-gray-200">
                    <CloudUpload :size="22" class="text-gray-300 mx-auto mb-2" />
                    <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">NO_ASSETS_STAGED</p>
                    <p class="text-[9px] font-mono text-gray-300 uppercase tracking-widest">Files will upload after the lead is saved.</p>
                  </div>
                  <div v-else class="space-y-1.5">
                    <div v-for="item in pendingLeadDocuments" :key="item.id" class="flex items-center justify-between gap-2 p-2.5 bg-white border border-gray-100 hover:border-[#2F2E8B]/30 transition">
                      <div class="flex items-center gap-2 flex-1 min-w-0">
                        <FileText :size="14" class="text-[#2F2E8B] shrink-0" />
                        <span class="text-[10px] font-mono font-black text-gray-900 uppercase truncate">{{ item.name }}</span>
                      </div>
                      <button @click="removePendingLeadDocument(item.id)" class="text-gray-300 hover:text-red-500 transition shrink-0">
                        <X :size="12" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Notes -->
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                <div class="lg:col-span-12">
                  <h4 class="text-[11px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest border-b border-gray-100 pb-2">Qualitative_Summary</h4>
                </div>
                <div class="lg:col-span-12">
                  <textarea v-model="leadForm.notes" rows="3" class="w-full border border-gray-200 px-3 py-2 text-sm font-mono resize-none focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none" placeholder="NOTES / CONTEXT..."></textarea>
                </div>
              </div>
              </div>
            </form>
          </div>

          <!-- Modal Action Bar -->
          <div class="px-4 sm:px-8 py-4 sm:py-5 border-t border-gray-100 bg-gray-50/50 flex flex-wrap justify-end items-center gap-2 sm:gap-3 sticky bottom-0 z-10 backdrop-blur-md">
            <button type="button" @click="closeLeadModal" class="px-6 py-2.5 border border-gray-200 text-gray-400 hover:text-gray-900 hover:bg-white text-[10px] font-mono font-black uppercase tracking-widest transition-all">
              PROTOCOL_ABORT
            </button>
            <button @click="submitLead" :disabled="isSubmitting" class="px-8 py-2.5 bg-[#2F2E8B] text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] disabled:opacity-50 transition-all flex items-center gap-2 shadow-lg shadow-[#2F2E8B]/20">
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
      <div v-if="showCallModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center z-[100001] p-4 pt-[8vh]" @click.self="closeCallModal">
        <div class="bg-white shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto flex flex-col animate-modal-in rounded-lg border border-[#2F2E8B]/20">
          <!-- Header -->
          <div class="bg-[#2F2E8B] px-4 py-2.5 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <div class="w-7 h-7 bg-[#3D3A9E] rounded-full flex items-center justify-center">
                <i class="fas fa-phone-alt text-white text-[11px]"></i>
              </div>
              <div>
                <span class="text-[10px] font-mono font-black text-blue-200 uppercase tracking-widest leading-none">Call // Session</span>
                <h3 class="text-[12px] font-black text-white uppercase tracking-tight">{{ callContext.name || 'Lead' }}</h3>
                <div class="text-[8px] font-mono text-blue-300 uppercase tracking-wider leading-none">{{ callContext.company || callContext.subtitle || '\u2014' }}</div>
              </div>
            </div>
            <button @click="closeCallModal" class="w-6 h-6 flex items-center justify-center text-blue-300 hover:text-white transition rounded hover:bg-[#3D3A9E]">
              <i class="fas fa-times text-sm"></i>
            </button>
          </div>

          <div class="p-3.5 space-y-3">
            <!-- Phone Action -->
            <div class="bg-[#2F2E8B]/5 border border-[#2F2E8B]/20 p-3 flex items-center justify-between gap-3 rounded">
              <div>
                <div class="text-[8px] font-mono font-bold text-[#2F2E8B] uppercase tracking-widest">Phone Number</div>
                <div class="text-[13px] font-black text-gray-900 font-mono mt-0.5 break-all">{{ callContext.phone || 'No number on file' }}</div>
              </div>
              <a v-if="callContext.phone" :href="`tel:${callContext.phone}`" class="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#2F2E8B] hover:bg-[#3D3A9E] text-white text-[9px] font-mono font-black uppercase tracking-widest transition-colors rounded">
                <i class="fas fa-phone text-[10px]"></i> Initiate Call
              </a>
            </div>

            <!-- Talking Points Checklist -->
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <h4 class="text-[9px] font-mono font-black text-gray-600 uppercase tracking-widest flex items-center gap-1">
                  <i class="fas fa-list-check text-[#2F2E8B] text-[10px]"></i> Talking Points
                </h4>
                <button type="button" @click="resetTalkingPoints" class="text-[8px] font-mono font-bold text-gray-400 hover:text-[#2F2E8B] uppercase tracking-wider">Reset</button>
              </div>
              <div class="space-y-1 max-h-36 overflow-y-auto custom-scrollbar pr-1">
                <label v-for="(point, idx) in talkingPoints" :key="idx" class="flex items-start gap-1.5 p-1.5 border border-gray-100 hover:border-[#2F2E8B]/30 hover:bg-[#2F2E8B]/5 cursor-pointer transition-colors rounded">
                  <input type="checkbox" v-model="point.done" class="mt-0.5 rounded text-[#2F2E8B] focus:ring-[#2F2E8B] border-gray-300 w-3 h-3" />
                  <span class="text-[10px] text-gray-700 font-mono uppercase tracking-tight leading-snug" :class="{ 'line-through text-gray-400': point.done }">{{ point.text }}</span>
                </label>
              </div>
              <div class="flex gap-1.5 mt-1.5">
                <input v-model="newTalkingPoint" @keyup.enter="addTalkingPoint" type="text" placeholder="ADD CUSTOM TALKING POINT..." class="flex-1 border border-gray-200 focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] px-2 py-1.5 text-[10px] font-mono uppercase rounded outline-none bg-gray-50" />
                <button type="button" @click="addTalkingPoint" class="px-2.5 py-1.5 bg-[#2F2E8B] hover:bg-[#3D3A9E] text-white text-[9px] font-mono font-black uppercase rounded transition">
                  <i class="fas fa-plus text-[10px]"></i>
                </button>
              </div>
            </div>

            <!-- Call Outcome + Duration -->
            <div class="grid grid-cols-2 gap-2.5">
              <div>
                <label class="block text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1">Outcome</label>
                <select v-model="callOutcome" class="w-full border border-gray-200 focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] px-2 py-1.5 text-[10px] font-mono uppercase rounded outline-none bg-gray-50">
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
                <input v-model.number="callDurationMin" type="number" min="0" step="0.5" placeholder="0" class="w-full border border-gray-200 focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] px-2 py-1.5 text-[10px] font-mono rounded outline-none bg-gray-50" />
              </div>
            </div>

            <!-- Call Notes -->
            <div>
              <label class="block text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1 flex items-center gap-1">
                <i class="fas fa-pen text-[#2F2E8B] text-[10px]"></i> Call Notes
              </label>
              <textarea v-model="callNote" rows="2" placeholder="WHAT WAS DISCUSSED, NEXT STEPS, OBJECTIONS..." class="w-full border border-gray-200 focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] px-2 py-1.5 text-[10px] font-mono rounded outline-none bg-gray-50 resize-none"></textarea>
              <p class="text-[8px] font-mono text-gray-400 mt-0.5 uppercase tracking-wider flex items-center gap-1">
                <i class="fas fa-info-circle text-[#2F2E8B] text-[9px]"></i> Saved to lead profile and visible in activity log.
              </p>
            </div>

            <div v-if="callError" class="text-[10px] font-mono text-red-600 bg-red-50 border border-red-200 p-2 rounded">{{ callError }}</div>
          </div>

          <div class="flex items-center justify-end gap-2 px-3.5 py-2.5 border-t border-gray-100 bg-gray-50/50">
            <button type="button" @click="closeCallModal" class="px-3.5 py-1.5 border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 rounded transition text-[9px] font-mono font-black uppercase tracking-widest">Cancel</button>
            <button type="button" @click="saveCallNote" :disabled="savingCall || !callNote.trim()" class="px-4 py-1.5 bg-[#2F2E8B] hover:bg-[#3D3A9E] disabled:opacity-50 text-white rounded transition text-[9px] font-mono font-black uppercase tracking-widest flex items-center justify-center gap-1.5">
              <i :class="savingCall ? 'fas fa-spinner fa-spin' : 'fas fa-save'"></i>
              {{ savingCall ? 'SAVING...' : 'Save Note & Log Call' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Lead Profile Modal -->
    <Teleport to="body">
      <LeadDetailModal
        v-if="showLeadProfileModal"
        v-model="showLeadProfileModal"
        :lead="selectedLeadForProfile"
        :users="tenantUsers"
        :pipeline-stages="allPipelineStages"
        @edit="(l) => { showLeadProfileModal = false; editLead(l); }"
        @call="(l) => openCallModal(l, 'leads')"
        @whatsapp="() => { /* handled internally by LeadDetailModal */ }"
        @email="() => {}"
        @delete="(l) => { deletePipelineRecord(l, 'leads'); showLeadProfileModal = false; }"
        @archive="() => { showLeadProfileModal = false; fetchPipelineData(); }"
        @convert="(lead) => { showLeadProfileModal = false; selectedLeadForConversion = lead; showConversionModal = true; }"
      />
    </Teleport>

    <!-- Lead Conversion Modal -->
    <LeadConversionModal v-if="showConversionModal" v-model="showConversionModal" :lead="selectedLeadForConversion" @converted="handleLeadConverted" />

    <!-- Account Profile Modal (used for Closed Won column and other account stages) -->
    <Teleport to="body">
      <AccountDetailModal
        v-if="showAccountProfileModal"
        v-model="showAccountProfileModal"
        :account="selectedAccountForProfile"
        :users="tenantUsers"
        @refresh="fetchPipelineData"
        @delete="() => { showAccountProfileModal = false; fetchPipelineData(); }"
      />
    </Teleport>

    <!-- Account Form Modal (for adding accounts from Closed Won stage) -->
    <AccountFormModal
      v-if="showAccountFormModal"
      v-model="showAccountFormModal"
      :account="editingAccount"
      :users="tenantUsers"
      @saved="fetchPipelineData"
    />

    <!-- Add Stage Modal (Teleported) -->
    <Teleport to="body">
      <div v-if="showAddStageModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[99999] p-4" @click.self="closeAddStageModal">
        <div class="bg-white rounded-none shadow-2xl w-full max-w-md border border-gray-100 flex flex-col overflow-hidden animate-modal-in">
          <div class="h-1.5 bg-[#2F2E8B]"></div>
          <div class="flex items-center justify-between p-6 border-b border-gray-100 relative overflow-hidden">
             <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-50"></div>
             <div class="relative z-10">
                <span class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest leading-none">Config // Structure</span>
                <h3 class="text-xl font-black text-gray-900 uppercase font-outfit tracking-tight">Add Stage</h3>
             </div>
            <button @click="closeAddStageModal" class="relative z-10 text-gray-400 hover:text-gray-600 transition"><i class="fas fa-times text-xl"></i></button>
          </div>
          <form @submit.prevent="addCustomStage" class="p-6 space-y-4">
            <div class="space-y-2">
              <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">Stage Name *</label>
              <input v-model="newStageForm.name" type="text" required placeholder="E.G. ON HOLD" class="w-full rounded-none border-gray-300 shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] text-sm font-mono font-bold uppercase" ref="addStageInputRef" />
            </div>
            <div class="space-y-2">
              <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">Position</label>
              <select v-model="newStageForm.insertAfter" class="w-full rounded-none border-gray-300 shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] text-sm font-mono font-bold uppercase">
                <option value="start">START (FIRST)</option>
                <option value="end">END (LAST)</option>
                <option v-for="stage in allPipelineStages" :key="stage.id" :value="stage.id">AFTER -> {{ stage.name }}</option>
              </select>
            </div>
            <div class="flex justify-end gap-3 pt-4 border-t border-gray-50 mt-4">
              <button type="button" @click="closeAddStageModal" class="px-6 py-2.5 border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 transition text-[10px] font-mono font-black uppercase tracking-widest">Cancel</button>
              <button type="submit" class="px-6 py-2.5 bg-[#2F2E8B] text-white hover:bg-[#1D226B] text-[10px] font-mono font-black uppercase tracking-widest"><i class="fas fa-plus mr-2"></i>Create Stage</button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>

  <!-- Pipeline Confirm Dialog -->
  <Teleport to="body">
    <div v-if="pipelineConfirm.show" class="fixed inset-0 z-[99999] flex items-center justify-center p-4 backdrop-blur-sm bg-black/50" @click.self="pipelineConfirm.onCancel">
      <div class="bg-white shadow-2xl w-full max-w-sm border border-gray-200 overflow-hidden">
        <div class="px-5 py-4 border-b" :class="pipelineConfirm.type === 'danger' ? 'border-red-200 bg-red-50' : pipelineConfirm.type === 'warning' ? 'border-amber-200 bg-amber-50' : 'border-gray-100 bg-gray-50'">
          <h3 class="text-sm font-black uppercase tracking-tight" :class="pipelineConfirm.type === 'danger' ? 'text-red-700' : pipelineConfirm.type === 'warning' ? 'text-amber-700' : 'text-gray-900'">{{ pipelineConfirm.title }}</h3>
        </div>
        <div class="p-5">
          <p class="text-xs font-mono text-gray-600 uppercase tracking-wide leading-relaxed">{{ pipelineConfirm.message }}</p>
          <div class="flex items-center gap-2 mt-5">
            <button v-if="pipelineConfirm.showCancel" @click="pipelineConfirm.onCancel" class="flex-1 px-4 py-2 border border-gray-200 text-gray-500 bg-white hover:bg-gray-50 text-[10px] font-mono font-bold uppercase tracking-widest transition">Cancel</button>
            <button @click="pipelineConfirm.onConfirm" class="flex-1 px-4 py-2 text-white text-[10px] font-mono font-bold uppercase tracking-widest transition" :class="pipelineConfirm.type === 'danger' ? 'bg-red-600 hover:bg-red-700' : pipelineConfirm.type === 'warning' ? 'bg-amber-600 hover:bg-amber-700' : 'bg-[#2F2E8B] hover:bg-[#1D226B]'">
              {{ pipelineConfirm.showCancel ? 'Confirm' : 'OK' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { BackButton } from '@/components/ui'
import { onMounted, onBeforeUnmount, ref, computed, watch, nextTick, reactive } from 'vue';
import { useCRMModule } from './functions/CRMModule.js';
import LinkedDocumentsWidget from './components/LinkedDocumentsWidget.vue';
import LeadDetailModal from './components/LeadDetailModal.vue';
import LeadConversionModal from './components/LeadConversionModal.vue';
import AccountDetailModal from './components/AccountDetailModal.vue';
import AccountFormModal from './components/AccountFormModal.vue';
import * as crmApi from '@/api_services/crm_api.js';
import { ChevronDown, ChevronUp, X, Save, Loader2, MapPin, Plus, FileText, CloudUpload } from 'lucide-vue-next';

const {
  branches, selectedBranch, onBranchChange, getUserEmail, formatCurrency, capitalize,
  activeTab, moduleLoading, pipelineMobileView, pipelineSearchQuery, pipelineAssignedFilter, accountConversionStages,
  allPipelineStages, kpiTotalPipelineValue,
  kpiLeadsByStage, kpiStageValue, getVisibleLeadsByStage, getRecordTitle, getRecordSubtitle,
  getRecordValue, getRecordBorderClass, getEntityBadgeClass, viewRecord,
  showAddStageModal, newStageForm, openAddStageModal, closeAddStageModal, addCustomStage, removeCustomStage,
  customPipelineStages, getTenantId,
  draggingLead, dragOverStage, dragState, onDragStart, onDragEnd, onDrop, onDragEnter, onDragLeave,
  fetchPipelineData, tenantUsers,
  showLeadModal, leadModalTitle, leadForm, closeLeadModal, submitLead, isSubmitting,
  showAccountFormModal, editingAccount,
  assignToSearch, showAssignToDropdown, filteredAssignToUsers, selectAssignTo, canAssignCrm,
  getUserInitials, getAssignedUserRole,
  locationSearchQuery, searchLocation, isSearchingLocation, locationSearchResults,
  selectSearchResult, roundLocationCoordinates, editLead,
  deleteLead, getStageName,
  useCurrentLocation, isLocatingDevice, initLeadMap,
  pendingLeadDocuments, addPendingLeadDocument, removePendingLeadDocument,
  visiblePipelineStages, hiddenStageIds, showStageAmounts,
  handleLeadConverted, showConversionModal, selectedLeadForConversion, convertLead,
  pipelineConfirm
} = useCRMModule();

const showPipelineSettings = ref(false);
const showExpandedLeadForm = ref(false);

// Camera capture for quick-add
const cameraInputRef = ref(null);
const capturedPhotoPreview = ref(null);

function triggerCameraCapture() {
  cameraInputRef.value?.click();
}

function clearCapturedPhoto() {
  capturedPhotoPreview.value = null;
}

// Only show stages that have records, except 'new' and custom stages which are always shown
const activePipelineStages = computed(() =>
  visiblePipelineStages.value.filter(stage =>
    stage.id === 'new' || stage.isCustom || kpiLeadsByStage(stage.id).length > 0
  )
);

function toggleStageVisibility(stageId) {
  const idx = hiddenStageIds.value.indexOf(stageId);
  if (idx > -1) hiddenStageIds.value.splice(idx, 1);
  else hiddenStageIds.value.push(stageId);
}

// ── Stage Rename ──
const editingStageId = ref(null);
const editingStageName = ref('');
const stageRenameInput = ref(null);

function startStageRename(stage) {
  editingStageId.value = stage.id;
  editingStageName.value = stage.name;
  nextTick(() => {
    if (stageRenameInput.value) stageRenameInput.value.focus();
  });
}

function saveStageRename(stage) {
  const newName = editingStageName.value?.trim();
  if (!newName || newName === stage.name) { editingStageId.value = null; return; }
  // Check if it's a custom stage
  const idx = customPipelineStages.value.findIndex(s => s.id === stage.id);
  if (idx > -1) {
    customPipelineStages.value[idx].name = newName;
  } else {
    // Default stage — save as override in customPipelineStages
    customPipelineStages.value.push({ ...stage, name: newName, isCustom: true });
  }
  import('@/api_services/crm_api.js').then(crmApi => {
    crmApi.updateCRMMetadata({ tenant_id: getTenantId(), pipeline_stages: customPipelineStages.value }).catch(() => {});
  });
  editingStageId.value = null;
}

// ── Stage Reposition ──
function isFirstVisibleStage(stage) {
  const vis = activePipelineStages.value;
  return vis.length < 2 || vis[0].id === stage.id;
}

function isLastVisibleStage(stage) {
  const vis = activePipelineStages.value;
  return vis.length < 2 || vis[vis.length - 1].id === stage.id;
}

function moveStage(stage, direction) {
  // Work with the full combined list for reorder
  const allStages = [...allPipelineStages.value];
  const fromIdx = allStages.findIndex(s => s.id === stage.id);
  if (fromIdx < 0) return;
  const toIdx = fromIdx + direction;
  if (toIdx < 0 || toIdx >= allStages.length) return;

  const targetStage = allStages[toIdx];
  // Swap order values
  const temp = stage.order;
  stage.order = targetStage.order;
  targetStage.order = temp;

  // Ensure both stages are in customPipelineStages for persistence
  [stage, targetStage].forEach(s => {
    if (!customPipelineStages.value.find(cs => cs.id === s.id)) {
      customPipelineStages.value.push({ ...s, isCustom: true });
    }
  });

  import('@/api_services/crm_api.js').then(crmApi => {
    crmApi.updateCRMMetadata({ tenant_id: getTenantId(), pipeline_stages: customPipelineStages.value }).catch(() => {});
  });
}

function closePipelineSettings() {
  showPipelineSettings.value = false;
}

onMounted(() => {
  document.addEventListener('click', closePipelineSettings);
  // Sync top scrollbar width after render
  nextTick(() => {
    if (kanbanTopScrollRef.value && kanbanInnerRef.value) {
      kanbanTopScrollRef.value.scrollLeft = 0;
    }
  });
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

function openAddForStage(stage) {
  if (stage.id === 'closed-won') {
    editingAccount.value = null;
    showAccountFormModal.value = true;
  } else {
    leadForm.value = { stage: stage.name, name: '', phone: '', email: '', company: '', notes: '', location: { lat: null, lng: null }, priority: '', source: '' };
    showExpandedLeadForm.value = false;
    leadModalTitle.value = `Add Lead // ${stage.name}`;
    showLeadModal.value = true;
    nextTick(() => { initLeadMap(); });
  }
}

async function deletePipelineRecord(record, entityType) {
  if (entityType === 'leads') {
    await deleteLead(record);
    fetchPipelineData();
  }
}

// ===== Lead Profile Modal =====
const selectedLeadForProfile = ref(null);
const showLeadProfileModal = ref(false);
function openLeadProfile(record) {
  selectedLeadForProfile.value = record;
  showLeadProfileModal.value = true;
}

// ===== Account Profile Modal (Closed Won column) =====
const selectedAccountForProfile = ref(null);
const showAccountProfileModal = ref(false);
function openAccountProfile(record) {
  selectedAccountForProfile.value = record;
  showAccountProfileModal.value = true;
}

// Horizontal scroll for kanban board
const kanbanScrollRef = ref(null);
const kanbanInnerRef = ref(null);
const kanbanTopScrollRef = ref(null);

// Use the same minWidth calculation as the grid for the top scrollbar spacer
const kanbanInnerWidth = computed(() => {
  const count = activePipelineStages.length;
  if (count <= 4) return 0; // no overflow when 4 or fewer columns
  // Match grid minWidth: count * 14rem, converted to px (1rem = 16px base)
  return count * 14 * 16;
});

function onKanbanScroll() {
  if (kanbanTopScrollRef.value) {
    kanbanTopScrollRef.value.scrollLeft = kanbanScrollRef.value?.scrollLeft || 0;
  }
}

function onTopScroll() {
  if (kanbanScrollRef.value) {
    kanbanScrollRef.value.scrollLeft = kanbanTopScrollRef.value?.scrollLeft || 0;
  }
}

function scrollKanban(direction) {
  const container = kanbanScrollRef.value;
  if (!container) return;
  const scrollAmount = container.clientWidth * 0.6;
  container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
  // Sync the top scrollbar
  if (kanbanTopScrollRef.value) {
    kanbanTopScrollRef.value.scrollLeft = container.scrollLeft;
  }
}


// ===== Call Modal State =====
const DEFAULT_TALKING_POINTS = [
  'Confirm decision-maker & best time to talk',
  'Recap previous interaction / context',
  'Identify pain points & current situation',
  'Pitch tailored value proposition',
  'Discuss budget, timeline, authority',
  'Address objections',
  'Confirm next step (demo / proposal / follow-up date)'
];

const showCallModal = ref(false);
const callContext = reactive({ id: '', name: '', phone: '', company: '', subtitle: '', entity: 'leads' });
const talkingPoints = ref([]);
const newTalkingPoint = ref('');
const callOutcome = ref('connected');
const callDurationMin = ref(0);
const callNote = ref('');
const callError = ref('');
const savingCall = ref(false);

function openCallModal(record, entity) {
  callContext.id = record.id;
  callContext.name = getRecordTitle(record, entity);
  callContext.phone = record.phone || '';
  callContext.company = record.company || '';
  callContext.subtitle = getRecordSubtitle(record, entity);
  callContext.entity = entity;
  talkingPoints.value = DEFAULT_TALKING_POINTS.map(t => ({ text: t, done: false }));
  newTalkingPoint.value = '';
  callOutcome.value = 'connected';
  callDurationMin.value = 0;
  callNote.value = '';
  callError.value = '';
  savingCall.value = false;
  showCallModal.value = true;
}

function closeCallModal() { showCallModal.value = false; }

function resetTalkingPoints() {
  talkingPoints.value.forEach(p => { p.done = false; });
}

function addTalkingPoint() {
  const t = (newTalkingPoint.value || '').trim();
  if (!t) return;
  talkingPoints.value.push({ text: t, done: false });
  newTalkingPoint.value = '';
}

function _getTenantId() {
  try {
    const token = localStorage.getItem('token');
    if (!token) return '';
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload?.tenant_id || '';
  } catch { return ''; }
}

async function saveCallNote() {
  if (callContext.entity !== 'leads') {
    callError.value = 'Notes from pipeline call modal currently support leads only.';
    return;
  }
  const note = (callNote.value || '').trim();
  if (!note) { callError.value = 'Please add a note before saving.'; return; }
  const tenantId = _getTenantId();
  if (!tenantId || !callContext.id) { callError.value = 'Missing tenant or lead context.'; return; }
  savingCall.value = true; callError.value = '';
  try {
    const completed = talkingPoints.value.filter(p => p.done).map(p => `\u2022 ${p.text}`).join('\n');
    const composed = [
      `[CALL // ${callOutcome.value.toUpperCase()}${callDurationMin.value ? ` // ${callDurationMin.value} MIN` : ''}]`,
      note,
      completed ? `\nCovered:\n${completed}` : ''
    ].filter(Boolean).join('\n');
    await crmApi.createLeadNote(callContext.id, tenantId, { note: composed });
    try {
      await crmApi.logLeadActivity(callContext.id, {
        tenant_id: tenantId,
        action: 'Phone Call',
        notes: `${callOutcome.value} \u2014 ${note.substring(0, 200)}`,
        timestamp: new Date().toISOString()
      });
    } catch (e) { /* non-blocking */ }
    closeCallModal();
  } catch (err) {
    console.error('Failed to save call note', err);
    callError.value = err?.message || 'Failed to save note. Please try again.';
  } finally {
    savingCall.value = false;
  }
}

onMounted(() => {
  activeTab.value = 'pipeline';
  fetchPipelineData();
});
const addStageInputRef = ref(null);
watch(showAddStageModal, async (newVal) => {
  if (newVal) {
    await nextTick();
    if (addStageInputRef.value) addStageInputRef.value.focus();
  }
});
</script>

<style scoped>
/* Top mirror scrollbar — grey, sits above the stage headers */
.pipeline-hscroll-top {
  scrollbar-width: auto;
  scrollbar-color: #9ca3af #f3f4f6;
}
.pipeline-hscroll-top::-webkit-scrollbar {
  height: 10px;
  -webkit-appearance: none;
}
.pipeline-hscroll-top::-webkit-scrollbar-track {
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
}
.pipeline-hscroll-top::-webkit-scrollbar-thumb {
  background: #9ca3af;
  border: 2px solid #f3f4f6;
  border-radius: 0;
}
.pipeline-hscroll-top::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
.pipeline-hscroll-spacer {
  height: 1px;
}
/* Hide the bottom (native) scrollbar on the kanban itself */
.pipeline-hscroll-hidden {
  scrollbar-width: none;
}
.pipeline-hscroll-hidden::-webkit-scrollbar {
  height: 0;
  width: 0;
  display: none;
}
#kanban-scroll-container {
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}
#kanban-scroll-container::-webkit-scrollbar {
  display: none !important;
  height: 0 !important;
  width: 0 !important;
}
</style>

