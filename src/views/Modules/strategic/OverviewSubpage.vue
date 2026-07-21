<template>
  <div class="overview-subpage min-h-screen bg-[#F5F5F5] font-sans relative text-gray-900 overflow-x-hidden">
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
                <span class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">MODULE // STRATEGIC_INTELLIGENCE</span>
              </div>
              <h1 class="text-3xl font-black text-gray-900 uppercase tracking-tight font-outfit">AI Strategic Consultant</h1>
              <p class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mt-1">REAL-TIME BUSINESS INTELLIGENCE // GUIDANCE_ENABLED</p>
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

            <button 
              class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 text-[10px] font-mono font-bold uppercase shadow-md transition-all flex items-center gap-2 rounded-none"
              @click="handleRunWorkflow"
              :disabled="workflowLoading"
            >
              <i class="fas" :class="workflowLoading ? 'fa-spinner fa-spin' : 'fa-play'"></i>
              <span>{{ workflowLoading ? 'ANALYZING...' : 'RUN_WORKFLOW' }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Strategic Navigation -->
      <StrategicNavigation active-tab="overview" />

      <!-- Loading State Overlay -->
      <div v-if="workflowLoading" class="bg-blue-50/80 border border-blue-200 p-8 mb-6 text-center animate-pulse">
        <i class="fas fa-satellite-dish fa-spin text-3xl text-[#2F2E8B] mb-4"></i>
        <h3 class="text-xl font-black font-outfit text-gray-900 uppercase">AI SYSTEM ACTIVATED</h3>
        <p class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mt-2">
          ANALYZING_DATAPOINTS // GENERATING_STRATEGIC_MATRIX...
        </p>
      </div>

       <!-- Empty State (Not Initialized) -->
      <div v-else-if="!hasInitializedData" class="bg-gray-50 border border-gray-200 p-12 mb-6 text-center">
        <div class="mb-6">
           <div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
             <i class="fas fa-robot text-2xl text-gray-400"></i>
           </div>
           <h3 class="text-2xl font-black font-outfit text-gray-900 uppercase mb-2">System Standby</h3>
           <p class="text-gray-500 max-w-md mx-auto mb-6">
             The Strategic AI Consultant has not been initialized for this session. Run the workflow to generate real-time insights based on your business data.
           </p>
           <button 
              @click="handleRunWorkflow"
              class="bg-[#2F2E8B] text-white px-6 py-3 text-xs font-mono font-black uppercase tracking-widest hover:bg-[#1D226B] transition-all shadow-lg"
            >
              INITIALIZE_AI_ANALYSIS
            </button>
        </div>
      </div>

      <!-- Overall Health Score -->
      <div v-else class="bg-white border border-gray-200 p-8 mb-6 shadow-sm relative overflow-hidden group hover:border-[#2F2E8B]/30 transition-colors">
        <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
        <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SYSTEM_AUDIT // HEALTH_INDEX</div>
        <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest mb-2">OVERALL BUSINESS HEALTH</p>
            <div class="flex items-center gap-6">
              <h3 class="text-7xl font-black font-outfit text-gray-900 tracking-tighter">{{ businessHealth.overall }}<span class="text-3xl text-gray-300">/100</span></h3>
              <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                  <div :class="[
                    'w-3 h-3 rounded-none',
                    businessHealth.overall >= 80 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' :
                    businessHealth.overall >= 60 ? 'bg-amber-500' :
                    'bg-red-500'
                  ]"></div>
                  <span :class="[
                    'text-lg font-black font-outfit uppercase tracking-tight',
                    businessHealth.overall >= 80 ? 'text-emerald-600' :
                    businessHealth.overall >= 60 ? 'text-amber-600' :
                    'text-red-600'
                  ]">
                    {{ businessHealth.overall >= 80 ? 'EXCELLENT' : businessHealth.overall >= 60 ? 'GOOD' : 'CRITICAL' }}
                  </span>
                </div>
                <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                  {{ businessHealth.trend >= 0 ? 'STATUS_IMPROVING' : 'STATUS_DECLINING' }} // {{ Math.abs(businessHealth.trend) }}% DELTA
                </p>
              </div>
            </div>
          </div>
          <div class="text-right border-l-2 border-gray-100 pl-8">
            <p class="text-[9px] font-mono font-black text-gray-300 mb-3 uppercase tracking-widest">AI_ANALYSIS_MODELS:</p>
            <div class="flex flex-col gap-2 text-[10px] font-mono font-bold text-gray-600 uppercase">
              <span class="flex items-center justify-end gap-2"><i class="fas fa-database text-[#2F2E8B]"></i> {{ aiAnalysis.dataPoints }}</span>
              <span class="flex items-center justify-end gap-2"><i class="fas fa-plug text-[#2F2E8B]"></i> {{ aiAnalysis.activeConnections }}</span>
              <span class="flex items-center justify-end gap-2"><i class="fas fa-clock text-[#2F2E8B]"></i> {{ aiAnalysis.lastUpdated }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 4 Quadrants - Health Scorecard -->
      <div v-if="hasInitializedData" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div 
          v-for="quadrant in businessHealth.quadrants" 
          :key="quadrant.name"
          class="bg-white border p-6 shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden group border-l-4"
          :class="[
            quadrant.score >= 80 ? 'border-l-emerald-500' :
            quadrant.score >= 60 ? 'border-l-amber-500' : 'border-l-red-500'
          ]"
          @click="navigateToSection(quadrant.name)"
        >
          <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-2 py-0.5 text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">
            QUAD_{{ quadrant.name.split(' ')[0].toUpperCase() }}
          </div>
          
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-4">
              <i :class="['fas text-xl', quadrant.icon, 'text-gray-400 group-hover:text-[#2F2E8B] transition-colors']"></i>
              <span class="text-2xl font-black font-outfit text-gray-900 shadow-sm">
                {{ quadrant.score }}<span class="text-[10px] text-gray-300">/100</span>
              </span>
            </div>
            <h4 class="font-black text-gray-900 text-xs mb-1 uppercase tracking-tight font-outfit">{{ quadrant.name }}</h4>
            <div class="w-8 h-0.5 bg-gray-100 mb-2 group-hover:w-full transition-all duration-500"></div>
            <p class="text-[10px] text-gray-500 font-medium mb-4 leading-relaxed line-clamp-2 uppercase">{{ quadrant.description }}</p>
            
            <div class="flex items-center justify-between pt-2 border-t border-gray-50 text-[9px] font-mono font-black uppercase">
              <span class="text-gray-400">{{ quadrant.metrics }}_METRICS</span>
              <span :class="[quadrant.trend >= 0 ? 'text-emerald-600' : 'text-red-600']">
                {{ quadrant.trend >= 0 ? '+' : '' }}{{ quadrant.trend }}%_DELTA
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Strategic Action Metrics -->
      <div v-if="hasInitializedData" class="mb-12">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
          <h3 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight">Strategic Action Results</h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <!-- KPI 1 -->
          <div class="bg-white border-l-4 border-l-[#2F2E8B] p-5 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
            <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
            <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-2 py-0.5 text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">METRIC // PRIORITY_HIGH</div>
            <div class="relative z-10">
               <i class="fas fa-exclamation-circle text-gray-400 mb-2 group-hover:text-[#2F2E8B] transition-colors"></i>
               <h3 class="text-3xl font-black font-outfit text-gray-900">{{ strategicMetrics.highPriority.toString().padStart(2, '0') }}</h3>
               <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-1">HIGH_PRIORITY_TASKS</p>
            </div>
          </div>

          <!-- KPI 2 -->
          <div class="bg-white border-l-4 border-l-amber-500 p-5 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
            <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
            <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-2 py-0.5 text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">METRIC // PRIORITY_MED</div>
            <div class="relative z-10">
               <i class="fas fa-clock text-gray-400 mb-2 group-hover:text-amber-500 transition-colors"></i>
               <h3 class="text-3xl font-black font-outfit text-gray-900">{{ strategicMetrics.mediumPriority.toString().padStart(2, '0') }}</h3>
               <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-1">MEDIUM_PRIORITY_TASKS</p>
            </div>
          </div>

          <!-- KPI 3 -->
          <div class="bg-white border-l-4 border-l-emerald-500 p-5 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
            <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
            <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-2 py-0.5 text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">METRIC // PROJECTED_ROI</div>
            <div class="relative z-10">
               <i class="fas fa-chart-line text-gray-400 mb-2 group-hover:text-emerald-500 transition-colors"></i>
               <h3 class="text-3xl font-black font-outfit text-gray-900">{{ strategicMetrics.projectedRoi }}</h3>
               <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-1">EXPECTED_RETURNS_ZMW</p>
            </div>
          </div>

          <!-- KPI 4 -->
          <div class="bg-white border-l-4 border-l-purple-500 p-5 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
            <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
            <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-2 py-0.5 text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">METRIC // IMPLEMENTATION</div>
            <div class="relative z-10">
               <i class="fas fa-calendar-alt text-gray-400 mb-2 group-hover:text-purple-500 transition-colors"></i>
               <h3 class="text-3xl font-black font-outfit text-gray-900">{{ strategicMetrics.timeline }}</h3>
               <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-1">AVG_DELIVERY_TIMELINE</p>
            </div>
          </div>
        </div>
      </div>

        <!-- Goals & Achievements Metrics -->
        <div v-if="hasInitializedData" class="mb-12">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-1.5 h-6 bg-emerald-500"></div>
            <h3 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight">Goals & Achievements</h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <!-- KPI 1 -->
            <div class="bg-white border-l-4 border-l-emerald-500 p-5 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
              <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
              <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-2 py-0.5 text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">METRIC // ACTIVE_GOALS</div>
              <div class="relative z-10">
                 <i class="fas fa-bullseye text-gray-400 mb-2 group-hover:text-emerald-500 transition-colors"></i>
                 <h3 class="text-3xl font-black font-outfit text-gray-900">{{ goalsMetrics.active.toString().padStart(2, '0') }}</h3>
                 <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-1">OBJECTIVES_IN_PROGRESS</p>
              </div>
            </div>

            <!-- KPI 2 -->
            <div class="bg-white border-l-4 border-l-blue-500 p-5 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
              <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
              <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-2 py-0.5 text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">METRIC // AVG_PROGRESS</div>
              <div class="relative z-10">
                 <i class="fas fa-chart-line text-gray-400 mb-2 group-hover:text-blue-500 transition-colors"></i>
                 <h3 class="text-3xl font-black font-outfit text-gray-900">{{ goalsMetrics.avgProgress }}%</h3>
                 <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-1">AGGREGATE_COMPLETION_RATE</p>
              </div>
            </div>

            <!-- KPI 3 -->
            <div class="bg-white border-l-4 border-l-amber-500 p-5 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
              <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
              <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-2 py-0.5 text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">METRIC // QUARTERLY_COMP</div>
              <div class="relative z-10">
                 <i class="fas fa-check-circle text-gray-400 mb-2 group-hover:text-amber-500 transition-colors"></i>
                 <h3 class="text-3xl font-black font-outfit text-gray-900">{{ goalsMetrics.completed.toString().padStart(2, '0') }}</h3>
                 <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-1">COMPLETED_THIS_QUARTER</p>
              </div>
            </div>

            <!-- KPI 4 -->
            <div class="bg-white border-l-4 border-l-indigo-500 p-5 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
              <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
              <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-2 py-0.5 text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">METRIC // ACHIEVEMENTS</div>
              <div class="relative z-10">
                 <i class="fas fa-trophy text-gray-400 mb-2 group-hover:text-indigo-500 transition-colors"></i>
                 <h3 class="text-3xl font-black font-outfit text-gray-900">{{ goalsMetrics.achievements.toString().padStart(2, '0') }}</h3>
                 <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-1">TOTAL_BADGES_EARNED</p>
              </div>
            </div>
          </div>
        </div>
        </div>

        <!-- Predictions Metrics -->
        <div v-if="hasInitializedData" class="mb-12">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-1.5 h-6 bg-blue-500"></div>
            <h3 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight">AI Predictions & Outcomes</h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <!-- KPI 1 -->
            <div class="bg-white border-l-4 border-l-blue-500 p-5 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
              <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
              <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-2 py-0.5 text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">PREDICT // REVENUE_FC</div>
              <div class="relative z-10">
                 <i class="fas fa-chart-line text-gray-400 mb-2 group-hover:text-blue-500 transition-colors"></i>
                 <h3 class="text-3xl font-black font-outfit text-gray-900">{{ predictionMetrics.revenue }}</h3>
                 <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-1">FORECASTED_REVENUE_GROWTH</p>
              </div>
            </div>

            <!-- KPI 2 -->
            <div class="bg-white border-l-4 border-l-emerald-500 p-5 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
              <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
              <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-2 py-0.5 text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">PREDICT // MARKET_EXP</div>
              <div class="relative z-10">
                 <i class="fas fa-rocket text-gray-400 mb-2 group-hover:text-emerald-500 transition-colors"></i>
                 <h3 class="text-3xl font-black font-outfit text-gray-900">{{ predictionMetrics.market }}</h3>
                 <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-1">EXPANSION_OPTIMIZATION_POTENTIAL</p>
              </div>
            </div>

            <!-- KPI 3 -->
            <div class="bg-white border-l-4 border-l-red-500 p-5 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
              <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
              <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-2 py-0.5 text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">PREDICT // CHURN_RISK</div>
              <div class="relative z-10">
                 <i class="fas fa-user-slash text-gray-400 mb-2 group-hover:text-red-500 transition-colors"></i>
                 <h3 class="text-3xl font-black font-outfit text-gray-900">{{ predictionMetrics.churn }}</h3>
                 <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-1">PROJECTED_CHURN_REDUCTION</p>
              </div>
            </div>

            <!-- KPI 4 -->
            <div class="bg-white border-l-4 border-l-amber-500 p-5 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
              <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
              <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-2 py-0.5 text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">PREDICT // CONFIDENCE</div>
              <div class="relative z-10">
                 <i class="fas fa-shield-alt text-gray-400 mb-2 group-hover:text-amber-500 transition-colors"></i>
                 <h3 class="text-3xl font-black font-outfit text-gray-900">{{ predictionMetrics.confidence }}%</h3>
                 <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-1">MODEL_ACCURACY_PROBABILITY</p>
              </div>
            </div>
          </div>
        </div>

      <!-- Peer Benchmarking -->
      <div v-if="hasInitializedData" class="bg-white border border-gray-200 p-8 shadow-sm relative overflow-hidden group hover:border-[#2F2E8B]/30 transition-colors">
        <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
        <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">BENCHMARK // COMPETITIVE_INDEX</div>
        
        <div class="relative z-10 flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
          <div class="flex items-center gap-3">
            <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
            <h3 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight">Peer Benchmarking</h3>
          </div>
          <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">VS // 127_INDUSTRY_PEERS</span>
        </div>

        <div class="relative z-10 space-y-6">
          <div v-for="metric in benchmarks" :key="metric.name" class="group/item">
            <div class="flex items-center justify-between mb-2">
              <span class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-tight">{{ metric.name.replace(' ', '_') }}</span>
              <div class="flex items-center gap-6">
                <span class="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">SELF: <strong class="text-gray-900">{{ metric.value }}{{ metric.name.includes('Rate') || metric.name.includes('Margin') ? '%' : '' }}</strong></span>
                <span class="text-[9px] font-mono font-bold text-gray-300 uppercase tracking-widest">AVG: {{ metric.average }}{{ metric.name.includes('Rate') || metric.name.includes('Margin') ? '%' : '' }}</span>
                <span :class="[
                  'text-[10px] font-mono font-black px-2 py-0.5 rounded-none',
                  metric.performance >= 0 ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'
                ]">
                  {{ metric.performance >= 0 ? '+' : '' }}{{ metric.performance.toFixed(1) }}%
                </span>
              </div>
            </div>
            <div class="relative h-1 bg-gray-100 rounded-none overflow-hidden">
              <div 
                class="absolute h-full bg-[#2F2E8B] transition-all duration-1000 ease-out"
                :style="{ width: `${(metric.value / metric.max) * 100}%` }"
              ></div>
              <div 
                class="absolute h-full w-0.5 bg-amber-500 z-10 shadow-[0_0_5px_rgba(245,158,11,0.5)]"
                :style="{ left: `${(metric.average / metric.max) * 100}%` }"
              ></div>
            </div>
          </div>
        </div>

        <div class="relative z-10 mt-8 bg-gray-50 border border-gray-100 p-4 rounded-none border-l-4 border-l-[#2F2E8B]">
          <p class="text-[10px] font-mono font-bold text-gray-600 leading-relaxed uppercase">
            <span class="text-[#2F2E8B] font-black">AI_INSIGHT //</span> {{ peerInsight }}
          </p>
        </div>
      </div>

    

    <!-- Department File Upload Modal -->
    <div v-if="showUploadModal" class="fixed inset-0 z-50 overflow-y-auto font-sans">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <!-- Background overlay -->
        <div class="fixed inset-0 transition-opacity bg-gray-900/40 backdrop-blur-sm" @click="showUploadModal = false"></div>

        <!-- Modal Panel -->
        <div class="inline-block w-full max-w-5xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl border border-gray-200 rounded-none relative">
          <div class="absolute inset-0 dotted-pattern opacity-[0.02] pointer-events-none"></div>
          
          <!-- Modal Header -->
          <div class="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between relative z-10">
            <div class="flex items-center gap-3">
              <div class="w-1.5 h-8 bg-[#2F2E8B]"></div>
              <div>
                <h3 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight">Department File Upload</h3>
                <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">SYSTEM_INPUT // DATA_INGESTION_MODULE</p>
              </div>
            </div>
            <button @click="showUploadModal = false" class="text-gray-400 hover:text-[#2F2E8B] transition-colors">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>

          <!-- Modal Body with Tabs -->
          <div class="p-6 relative z-10">
            <div class="flex gap-2 mb-8 border-b border-gray-100">
              <button 
                @click="uploadTab = 'upload'"
                :class="[
                  'px-6 py-3 font-mono font-black text-[10px] uppercase tracking-widest transition-all border-b-2',
                  uploadTab === 'upload' 
                    ? 'border-[#2F2E8B] text-[#2F2E8B] bg-blue-50/50' 
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                ]"
              >
                <i class="fas fa-cloud-upload-alt mr-2"></i>
                UPLOAD_NEW_DATA
              </button>
              <button 
                @click="uploadTab = 'history'"
                :class="[
                  'px-6 py-3 font-mono font-black text-[10px] uppercase tracking-widest transition-all border-b-2',
                  uploadTab === 'history' 
                    ? 'border-[#2F2E8B] text-[#2F2E8B] bg-blue-50/50' 
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                ]"
              >
                <i class="fas fa-history mr-2"></i>
                INGESTION_HISTORY
                <span v-if="uploadHistory.length > 0" class="ml-2 px-2 py-0.5 bg-[#2F2E8B] text-white text-[8px]">{{ uploadHistory.length }}</span>
              </button>
            </div>

            <!-- Upload Tab -->
            <div v-if="uploadTab === 'upload'" class="space-y-6">
              <!-- Department Selection -->
              <div>
                <label class="block text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest mb-2">
                  <i class="fas fa-building mr-2 text-[#2F2E8B]"></i>
                  DATA_ORIGIN // SELECT_DEPARTMENT
                </label>
                <select 
                  v-model="selectedDepartment"
                  class="w-full border border-gray-200 rounded-none px-4 py-3 text-[11px] font-mono font-bold uppercase focus:ring-1 focus:ring-[#2F2E8B] shadow-sm appearance-none bg-white"
                >
                  <option value="">SELECT_DEPARTMENT...</option>
                  <option value="sales">SALES & MARKETING</option>
                  <option value="finance">FINANCE & ACCOUNTING</option>
                  <option value="hr">HUMAN RESOURCES</option>
                  <option value="operations">OPERATIONS</option>
                  <option value="it">IT & TECHNOLOGY</option>
                  <option value="legal">LEGAL & COMPLIANCE</option>
                  <option value="customer">CUSTOMER SERVICE</option>
                  <option value="product">PRODUCT DEVELOPMENT</option>
                </select>
              </div>

              <!-- File Upload Area -->
              <div>
                <label class="block text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest mb-2">
                  <i class="fas fa-file-upload mr-2 text-[#2F2E8B]"></i>
                  FILE_TRANSFER // SYSTEM_INBOUND
                </label>
                <div 
                  @drop.prevent="handleFileDrop"
                  @dragover.prevent="isDragging = true"
                  @dragleave.prevent="isDragging = false"
                  :class="[
                    'border-2 border-dashed p-10 text-center transition-all cursor-pointer rounded-none relative overflow-hidden',
                    isDragging ? 'border-[#2F2E8B] bg-blue-50/50' : 'border-gray-200 hover:border-[#2F2E8B]/50 hover:bg-gray-50'
                  ]"
                  @click="$refs.fileInput.click()"
                >
                  <i class="fas fa-cloud-upload-alt text-5xl text-gray-400 mb-3"></i>
                  <p class="text-gray-600 font-medium mb-1">Drop files here or click to browse</p>
                  <p class="text-sm text-gray-500">Supports PDF, DOCX, XLSX, CSV, TXT (Max 10MB per file)</p>
                  <input 
                    ref="fileInput"
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt"
                    @change="handleFileSelect"
                    class="hidden"
                  >
                </div>
              </div>

              <!-- Selected Files List -->
              <div v-if="selectedFiles.length > 0" class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  <i class="fas fa-list mr-2 text-[#2F2E8B]"></i>
                  Selected Files ({{ selectedFiles.length }})
                </label>
                <div class="max-h-60 overflow-y-auto space-y-2">
                  <div 
                    v-for="(file, index) in selectedFiles" 
                    :key="index"
                    class="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3"
                  >
                    <div class="flex items-center gap-3 flex-1">
                      <i :class="getFileIcon(file.name)" class="text-2xl text-[#2F2E8B]"></i>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate">{{ file.name }}</p>
                        <p class="text-xs text-gray-500">{{ formatFileSize(file.size) }}</p>
                      </div>
                    </div>
                    <button 
                      @click="removeFile(index)"
                      class="text-red-500 hover:text-red-700 transition ml-2"
                    >
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Document Summary Input -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  <i class="fas fa-align-left mr-2 text-[#2F2E8B]"></i>
                  Document Summary (Optional)
                </label>
                <textarea 
                  v-model="documentSummary"
                  rows="3"
                  placeholder="Provide a brief summary of these documents (purpose, key information, etc.)"
                  class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] resize-none"
                ></textarea>
              </div>

              <!-- Upload Button -->
              <div class="flex items-center justify-end gap-3 pt-4 border-t">
                <button 
                  @click="showUploadModal = false"
                  class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button 
                  @click="handleUpload"
                  :disabled="!selectedDepartment || selectedFiles.length === 0 || isUploading"
                  class="px-6 py-2 bg-gradient-to-r from-[#2F2E8B] to-[#3D2F88] text-white rounded-lg hover:from-[#252579] hover:to-[#2F2E8B] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <i :class="isUploading ? 'fas fa-spinner fa-spin' : 'fas fa-upload'"></i>
                  <span>{{ isUploading ? 'Uploading...' : 'Upload Files' }}</span>
                </button>
              </div>
            </div>

            <!-- History Tab -->
            <div v-if="uploadTab === 'history'" class="space-y-4">
              <div v-if="uploadHistory.length === 0" class="text-center py-12">
                <i class="fas fa-folder-open text-6xl text-gray-300 mb-4"></i>
                <p class="text-gray-500 font-medium">No upload history yet</p>
                <p class="text-sm text-gray-400">Upload files to see them here</p>
              </div>

              <div v-else class="space-y-3">
                <div 
                  v-for="(upload, index) in uploadHistory" 
                  :key="index"
                  class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                >
                  <div class="flex items-start justify-between mb-3">
                    <div class="flex items-start gap-3 flex-1">
                      <div class="bg-gradient-to-br from-[#2F2E8B] to-[#3D2F88] p-2 rounded-lg">
                        <i class="fas fa-folder text-white"></i>
                      </div>
                      <div class="flex-1">
                        <div class="flex items-center gap-2 mb-1">
                          <span class="text-sm font-bold text-gray-900">{{ getDepartmentName(upload.department) }}</span>
                          <span class="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                            {{ upload.files.length }} file{{ upload.files.length !== 1 ? 's' : '' }}
                          </span>
                        </div>
                        <p class="text-xs text-gray-500">
                          <i class="fas fa-clock mr-1"></i>
                          {{ formatDate(upload.timestamp) }}
                        </p>
                      </div>
                    </div>
                    <button 
                      @click="deleteUpload(index)"
                      class="text-red-500 hover:text-red-700 transition"
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>

                  <!-- Files in this upload -->
                  <div class="space-y-1.5 mb-3">
                    <div 
                      v-for="(file, fileIndex) in upload.files" 
                      :key="fileIndex"
                      class="flex items-center gap-2 text-sm bg-gray-50 rounded px-3 py-1.5"
                    >
                      <i :class="getFileIcon(file.name)" class="text-[#2F2E8B]"></i>
                      <span class="text-gray-700 flex-1 truncate">{{ file.name }}</span>
                      <span class="text-xs text-gray-500">{{ formatFileSize(file.size) }}</span>
                    </div>
                  </div>

                  <!-- Summary -->
                  <div v-if="upload.summary" class="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p class="text-xs font-medium text-blue-900 mb-1">
                      <i class="fas fa-info-circle mr-1"></i>
                      Summary
                    </p>
                    <p class="text-xs text-blue-800">{{ upload.summary }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, toRaw, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import API_BASE_URL from '@/services/api.js'
import { workflowLoading, runStrategicWorkflow, workflowResult, fetchSavedOverview } from '@/composables/useStrategicWorkflow'
import { decodeJWT } from '@/services/decodeJWT.js'
import StrategicNavigation from './components/StrategicNavigation.vue'
import { useActivityTracker } from '@/config/useActivityTracker.js';

const { getTenantId } = decodeJWT();
const { getUserEmail } = decodeJWT();
// Use Activity Tracker
useActivityTracker({
  userId: getUserEmail(),
  tenantId: getTenantId(),
  module: 'hr-dashboard'
});

const router = useRouter()
const activeTab = ref('overview')

// State
const isRefreshing = ref(false)
const hasInitializedData = ref(false)

// AI Analysis / Meta Data
const aiAnalysis = ref({
  dataPoints: '0',
  activeConnections: '0',
  lastUpdated: 'Calculating...'
})

// Business Health Data
const businessHealth = ref({
  overall: 0,
  trend: 0,
  quadrants: [
    {
      name: 'Financial Health',
      icon: 'fa-coins',
      score: 0,
      description: 'Revenue, profit margins, cash flow',
      metrics: 0,
      trend: 0
    },
    {
      name: 'Operational Efficiency',
      icon: 'fa-cogs',
      score: 0,
      description: 'Inventory turnover, productivity',
      metrics: 0,
      trend: 0
    },
    {
      name: 'Customer Satisfaction',
      icon: 'fa-smile',
      score: 0,
      description: 'Retention, NPS, repeat purchases',
      metrics: 0,
      trend: 0
    },
    {
      name: 'Growth Potential',
      icon: 'fa-chart-line',
      score: 0,
      description: 'Market expansion, innovation',
      metrics: 0,
      trend: 0
    }
  ]
})

// Metrics State
const strategicMetrics = ref({
  highPriority: 0,
  mediumPriority: 0,
  projectedRoi: '0',
  timeline: '0-0WK'
})

const goalsMetrics = ref({
  active: 0,
  avgProgress: 0,
  completed: 0,
  achievements: 0
})

const predictionMetrics = ref({
  revenue: '0%',
  market: 'Medium',
  churn: '0%',
  confidence: 0
})

// Add missing reactive properties for template bindings
const selectedLanguage = ref('en')
// Benchmarks
const benchmarks = ref([])
const peerInsight = ref("Loading peer comparison analysis...")

// File Upload Modal State
const showUploadModal = ref(false)
const uploadTab = ref('upload')
const selectedDepartment = ref('')
const selectedFiles = ref([])
const documentSummary = ref('')
const isDragging = ref(false)
const isUploading = ref(false)
const uploadHistory = ref([])
const fileInput = ref(null)

const tenantId = ref('') 
const uploadedData = ref(null)

const fetchUploadHistory = async () => {
    if (!tenantId.value) return
    try {
        const response = await axios.get(`${API_BASE_URL}/strategy/analysis/documents`, {
            params: { tenant_id: tenantId.value }
        })
        uploadHistory.value = response.data
    } catch (error) {
        console.error('Error fetching upload history:', error)
    }
}

const loadUploadHistory = () => {
    const jwtHelper = decodeJWT();
    const jwtTenantId = jwtHelper.getTenantId();
    if(jwtTenantId) {
       tenantId.value = jwtTenantId
       fetchUploadHistory()
    }
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

const addFiles = (files) => {
  const maxSize = 10 * 1024 * 1024 // 10MB
  const validFiles = files.filter(file => {
    if (file.size > maxSize) {
      alert(`${file.name} is too large. Maximum file size is 10MB.`)
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

const getDepartmentName = (dept) => {
  const names = {
    sales: 'Sales & Marketing',
    finance: 'Finance & Accounting',
    hr: 'Human Resources',
    operations: 'Operations',
    it: 'IT & Technology',
    legal: 'Legal & Compliance',
    customer: 'Customer Service',
    product: 'Product Development'
  }
  return names[dept] || dept
}

const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
  if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`
  
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined 
  })
}

const handleUpload = async () => {
  if (!selectedDepartment.value || selectedFiles.value.length === 0 || !tenantId.value) return

  isUploading.value = true

  try {
    // 1. Simulate delay or actually upload binary file if supported
    await new Promise(resolve => setTimeout(resolve, 1500))

    // 2. Send metadata to backend
    const payload = {
        tenant_id: tenantId.value,
        department: selectedDepartment.value, 
        files: selectedFiles.value.map(f => ({ name: f.name, size: f.size })),
        summary: documentSummary.value,
        timestamp: new Date().toISOString()
    }
    
    await axios.post(`${API_BASE_URL}/strategy/analysis/documents`, payload)
    
    // 3. Refresh list
    await fetchUploadHistory()

    // Reset form
    selectedFiles.value = []
    documentSummary.value = ''
    selectedDepartment.value = ''
    
    // Switch to history tab
    uploadTab.value = 'history'
    alert('Files uploaded successfully!')
  } catch (error) {
    console.error('Upload error:', error)
    alert('Failed to upload files. Please try again.')
  } finally {
    isUploading.value = false
  }
}

const deleteUpload = async (id) => {
  let recordId = id
  if (typeof id === 'number' && uploadHistory.value[id]) {
      recordId = uploadHistory.value[id]._id || uploadHistory.value[id].id
  }

  if (confirm('Are you sure you want to delete this upload record?')) {
      try {
          await axios.delete(`${API_BASE_URL}/strategy/analysis/documents/${recordId}`, {
              params: { tenant_id: tenantId.value }
          })
          await fetchUploadHistory()
      } catch (error) {
          console.error('Error deleting upload:', error)
          // Fallback if local only
          if (typeof id === 'number') {
             uploadHistory.value.splice(id, 1)
          }
      }
  }
}

const handleRunWorkflow = () => {
  if(tenantId.value){
     runStrategicWorkflow(tenantId.value, uploadedData.value);
  }
}

const parseWorkflowData = (data) => {
  if(!data) {
     hasInitializedData.value = false;
     return;
  }
  
  hasInitializedData.value = true;

  // 0. AI Meta Data
  if (data.knowledgeStats) {
      aiAnalysis.value.dataPoints = (data.knowledgeStats.entities || 0).toLocaleString() + '_POINTS'
      aiAnalysis.value.activeConnections = (data.knowledgeStats.relationships || 0).toString().padStart(2, '0') + '_ACTIVE_CONN'
      aiAnalysis.value.lastUpdated = 'JUST_NOW'
  }

  // 1. Business Health – use real financial data when available
  if (data.creditScore) {
    businessHealth.value.overall = data.creditScore.score || 0
    businessHealth.value.trend = data.creditScore.change || 0
  }

  const fin = data.financialSummary || {}
  const baseScore = data.creditScore?.score || 0

  // Financial Health: based on net margin (0-100 scale)
  const netMargin = fin.netMargin || 0
  const financialScore = netMargin > 0
    ? Math.min(100, Math.round(netMargin * 2))  // 50% margin = 100
    : Math.max(0, Math.round(50 + netMargin))   // negative margins drop below 50
  businessHealth.value.quadrants[0].score = financialScore || baseScore
  businessHealth.value.quadrants[0].metrics = fin.revenue ? `K${Number(fin.revenue).toLocaleString()}` : 0
  businessHealth.value.quadrants[0].trend = fin.salesGrowth || 0

  // Operational Efficiency: based on inventory turnover & gross margin
  const invTurnover = fin.inventoryTurnover || 0
  const grossMargin = fin.grossMargin || 0
  const operationalScore = Math.min(100, Math.round((grossMargin * 1.5 + invTurnover * 5) / 2))
  businessHealth.value.quadrants[1].score = operationalScore || Math.max(0, baseScore - 5)
  businessHealth.value.quadrants[1].metrics = data.inventorySummary?.totalItems || 0
  businessHealth.value.quadrants[1].trend = invTurnover

  // Customer Satisfaction: proxy from invoice count & sales data
  const salesSummary = data.salesSummary || {}
  const invCount = data.invoiceCount || 0
  const customerScore = Math.min(100, Math.round(
    (invCount > 0 ? 40 : 0) +
    (salesSummary.total_sales > 0 ? 30 : 0) +
    (baseScore > 60 ? 30 : baseScore > 30 ? 15 : 0)
  ))
  businessHealth.value.quadrants[2].score = customerScore || Math.min(100, baseScore + 2)
  businessHealth.value.quadrants[2].metrics = invCount

  // Growth Potential: based on sales growth & net profit
  const salesGrowth = fin.salesGrowth || 0
  const growthScore = salesGrowth > 0
    ? Math.min(100, Math.round(50 + salesGrowth))
    : Math.max(0, Math.round(50 + salesGrowth))
  businessHealth.value.quadrants[3].score = growthScore || baseScore
  businessHealth.value.quadrants[3].trend = salesGrowth

  // Recalculate overall as weighted average of quadrants
  const qScores = businessHealth.value.quadrants.map(q => q.score)
  const avgQuadrant = Math.round(qScores.reduce((s, v) => s + v, 0) / qScores.length)
  if (avgQuadrant > 0) {
    businessHealth.value.overall = avgQuadrant
  }

  // 2. Strategic Metrics
  if (data.guidance) {
    strategicMetrics.value.highPriority = data.guidance.filter(a => a.priority === 'high').length
    strategicMetrics.value.mediumPriority = data.guidance.filter(a => a.priority === 'medium').length
    // Extract ROI/Timeline if present in description or separate fields
    // Assuming simple mapping for now
    strategicMetrics.value.timeline = '2-4WK'
    // projectedRoi
    const oppRevenue = (data.scenarios || [])
      .filter(s => s.revenueImpact > 0)
      .reduce((sum, s) => sum + s.revenueImpact, 0)
    strategicMetrics.value.projectedRoi = oppRevenue ? `+${Math.round(oppRevenue)}%` : 'TBD'
  }

  // 3. Goals
  if (data.goals) {
    goalsMetrics.value.active = data.goals.filter(g => (g.progress || 0) < 100).length
    const totalProg = data.goals.reduce((sum, g) => sum + (g.progress || 0), 0)
    goalsMetrics.value.avgProgress = data.goals.length ? Math.round(totalProg / data.goals.length) : 0
    goalsMetrics.value.completed = data.goals.filter(g => (g.progress || 0) >= 100).length
    goalsMetrics.value.achievements = data.goals.reduce((sum, g) => sum + (g.badges ? g.badges.length : 0), 0)
  }

  // 4. Predictions
  if (data.predictionCards) {
    predictionMetrics.value.revenue = data.predictionCards.revenueGrowth || '+0%'
    predictionMetrics.value.market = data.predictionCards.market || 'Medium'
    predictionMetrics.value.churn = data.predictionCards.churn || '0%'
    predictionMetrics.value.confidence = data.predictionCards.confidence || 0
  } else if (data.predictions && data.predictions.length > 0) {
    const p = data.predictions[0]
    predictionMetrics.value.revenue = p.change || '+0%'
    predictionMetrics.value.confidence = p.confidence || 0
  }

  // Also populate from financialSummary as fallback
  if (data.financialSummary && predictionMetrics.value.revenue === '0%') {
    const sg = data.financialSummary.salesGrowth || 0
    predictionMetrics.value.revenue = `${sg >= 0 ? '+' : ''}${sg}%`
  }
  
  // 5. Benchmarks & Insight
  if(data.benchmarks){
    benchmarks.value = data.benchmarks
  }
  
  if(data.legacy_insights && data.legacy_insights.recommendation) {
     peerInsight.value = data.legacy_insights.recommendation
  } else if (data.recommendation) {
     peerInsight.value = data.recommendation
  }
}

watch(workflowResult, (newVal) => {
  const rawVal = toRaw(newVal);
  console.log('Strategic Workflow Updated:', rawVal);
  parseWorkflowData(rawVal);
}, { immediate: true })

onMounted(async () => {
  loadUploadHistory()
  
  // If we already have cached data, use it immediately
  if (workflowResult.value) {
    parseWorkflowData(workflowResult.value)
  } else {
    // No cached data — try to fetch from DB
    const jwtHelper = decodeJWT()
    const tid = jwtHelper.getTenantId()
    if (tid) {
      tenantId.value = tid
      console.log('[OverviewSubpage] No cached data, fetching from DB for', tid)
      const dbData = await fetchSavedOverview(tid)
      if (dbData) {
        console.log('[OverviewSubpage] Loaded overview from DB')
        parseWorkflowData(dbData)
      }
    }
  }
})
</script>
