<template>
  <div class="positioning-subpage min-h-screen bg-[#F5F5F5] font-sans relative text-gray-900 overflow-x-hidden">
    <!-- Viewport Mesh Background (Fixed) -->
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <div class="max-w-[1920px] mx-auto p-4 md:p-6 relative z-10">
      
      <!-- Header with Strategic Position -->
      <div class="bg-white/80 backdrop-blur-md border border-gray-200 p-8 shadow-sm relative overflow-hidden mb-6">
        <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div class="flex-1">
            <div class="flex items-center gap-4">
              <div class="w-2 h-16 bg-[#2F2E8B]"></div>
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">MODULE // POSITIONING_ENGINE</span>
                </div>
                <h1 class="text-4xl font-black text-gray-900 uppercase tracking-tight font-outfit">Strategic Positioning</h1>
                <p class="text-[11px] font-mono font-bold text-[#2F2E8B] uppercase tracking-widest mt-1">DYNAMIC_CAPABILITIES // RENEWAL_PROTOCOL</p>
              </div>
            </div>
          </div>
          
          <div class="flex flex-col lg:flex-row items-center gap-4">
            <div class="bg-[#2F2E8B] p-8 relative overflow-hidden w-full lg:w-80 shadow-2xl">
              <div class="absolute inset-0 dotted-pattern opacity-[0.1] pointer-events-none"></div>
              <p class="text-[10px] font-mono font-black text-white/50 uppercase tracking-widest mb-2">RECOMMENDED_POSITION</p>
              <div class="text-3xl font-black font-outfit text-white uppercase tracking-tighter mb-4">{{ recommendedPosition || 'LOADING...' }}</div>
              <div class="flex items-center gap-3">
                <span :class="[
                  'px-3 py-1 text-[9px] font-mono font-black uppercase tracking-widest border',
                  positioningStrength === 'Strong' ? 'bg-emerald-500 text-white border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]' :
                  positioningStrength === 'Moderate' ? 'bg-amber-500 text-white border-amber-400' :
                  'bg-red-500 text-white border-red-400'
                ]">
                  {{ positioningStrength }}_SYNC
                </span>
                <span class="text-[9px] font-mono font-bold text-white/50 uppercase tracking-widest">{{ lastUpdated }}</span>
              </div>
            </div>
            
            <div class="flex gap-2 w-full lg:w-auto">
              <button
                @click="showAgentModal = true"
                class="flex-1 px-6 py-4 bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-mono font-black uppercase tracking-widest transition-all shadow-xl rounded-none"
              >
                AI_POSITION_AGENT
              </button>
              <button
                @click="refreshAnalysis"
                :disabled="isRefreshing"
                class="px-6 py-4 bg-white border border-gray-200 text-gray-900 text-[10px] font-mono font-black uppercase tracking-widest hover:border-[#2F2E8B] transition-all disabled:opacity-50 rounded-none"
              >
                <i :class="['fas fa-sync-alt mr-2', { 'fa-spin': isRefreshing }]"></i>
                REFRESH_CORE
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Strategic Navigation -->
      <StrategicNavigation active-tab="positioning" />

      <!-- AI Executive Summary Banner -->
      <div v-if="executiveSummary" class="bg-gray-900 border border-gray-800 p-8 mb-8 relative overflow-hidden group shadow-2xl">
        <div class="absolute inset-0 dotted-pattern opacity-[0.1] pointer-events-none"></div>
        <div class="absolute top-0 right-0 bg-gray-800 border-b border-l border-gray-700 px-3 py-1 text-[9px] font-mono font-black text-white/40 uppercase tracking-widest z-20">INTELLIGENCE_LAYER // POSITIONING_SUMMARY</div>
        
        <div class="flex items-start gap-8 relative z-10">
          <div class="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center text-2xl text-[#2F2E8B] shrink-0">
            <i class="fas fa-chess-queen"></i>
          </div>
          <div>
            <h3 class="text-xl font-black font-outfit text-white uppercase tracking-tight mb-4 flex items-center gap-3">
              Strategic Positioning Intelligence
              <span class="px-2 py-0.5 bg-[#2F2E8B] text-white text-[8px] font-mono font-black uppercase tracking-widest">AI_ANALYZED</span>
            </h3>
            <div class="text-[12px] font-mono font-medium text-white/80 uppercase tracking-tight leading-relaxed whitespace-pre-line border-l-2 border-[#2F2E8B] pl-6 py-2 bg-white/5">
              {{ executiveSummary }}
            </div>
            <div class="mt-6 flex items-center gap-6">
              <span class="text-[8px] font-mono font-black text-white/30 uppercase tracking-widest">SOURCE: STRATEGIC_POSITIONING_AGENT</span>
              <span class="text-[8px] font-mono font-black text-white/30 uppercase tracking-widest">MODE: COMPETITIVE_INTEL</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Strategic Positioning Matrix -->
      <div class="bg-white border border-gray-200 p-8 shadow-sm relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors mb-6">
        <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
        <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SYSTEM_MODEL // PORTER_GENERIC_MATRIX</div>
        
        <div v-if="isLoadingAnalysis" class="absolute inset-0 bg-white/90 backdrop-blur-md z-[30] flex items-center justify-center">
          <div class="text-center">
            <div class="w-12 h-12 border-2 border-[#2F2E8B] border-t-transparent animate-spin mb-4 mx-auto"></div>
            <p class="text-[10px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest">LOADING_STRATEGIC_POSTURE...</p>
          </div>
        </div>

        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 relative z-10">
          <h3 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight flex items-center gap-3">
            <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
            Competitive Posture Matrix
          </h3>
          <div class="px-4 py-2 bg-gray-50 border border-gray-100">
            <span class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mr-3">AI_SUGGESTED_VECTOR:</span>
            <span class="text-[10px] font-mono font-black text-[#2F2E8B] uppercase">{{ recommendedPosition }}</span>
          </div>
        </div>

        <!-- 2x2 Matrix Visualization -->
        <div class="relative bg-gray-50 border border-gray-100 p-12 overflow-hidden mb-6">
          <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
          
          <!-- Axes Labels -->
          <div class="absolute top-1/2 left-4 transform -translate-y-1/2 -rotate-90 text-[10px] font-mono font-black text-gray-300 uppercase tracking-widest">COMPETITIVE_ADVANTAGE // ALPHA_BETA</div>
          <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-[10px] font-mono font-black text-gray-300 uppercase tracking-widest">STRATEGIC_SCOPE // MARKET_HORIZON</div>

          <div class="grid grid-cols-2 gap-8 relative z-10">
            <!-- Cost Leadership (Broad) -->
            <div 
              @click="selectPosition('Cost Leadership')"
              :class="[
                'relative bg-white border p-8 cursor-pointer transition-all group/cell',
                currentPosition === 'Cost Leadership' ? 'border-[#2F2E8B] shadow-2xl scale-[1.02] z-20' : 'border-gray-100 hover:border-gray-200'
              ]"
            >
              <div class="absolute top-0 right-0 p-2 opacity-10 group-hover/cell:opacity-20 transition-opacity">
                <i class="fas fa-dollar-sign text-4xl"></i>
              </div>
              <div class="flex items-center justify-between mb-6">
                <div>
                  <h4 class="text-xs font-black font-outfit text-gray-900 uppercase tracking-tight">Cost Leadership</h4>
                  <p class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mt-0.5">BROAD_MARKET_POSTURE</p>
                </div>
                <div v-if="currentPosition === 'Cost Leadership'" class="w-6 h-6 bg-[#2F2E8B] flex items-center justify-center text-white text-[10px]">
                  <i class="fas fa-check"></i>
                </div>
              </div>
              <p class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-tight leading-relaxed mb-8">Lowest cost producer serving entire market structure</p>
              <div class="space-y-4 pt-6 border-t border-gray-50">
                <div class="flex items-center justify-between">
                  <span class="text-[8px] font-mono font-black text-gray-400 uppercase">EFFICIENCY_INDEX</span>
                  <span class="text-[10px] font-mono font-black text-emerald-600">{{ strategies.costLeadership.efficiency }}%</span>
                </div>
                <div class="relative h-1 bg-gray-50">
                  <div class="absolute left-0 top-0 h-full bg-emerald-500" :style="{ width: strategies.costLeadership.efficiency + '%' }"></div>
                </div>
              </div>
            </div>

            <!-- Differentiation (Broad) -->
            <div 
              @click="selectPosition('Differentiation')"
              :class="[
                'relative bg-white border p-8 cursor-pointer transition-all group/cell',
                currentPosition === 'Differentiation' ? 'border-[#2F2E8B] shadow-2xl scale-[1.02] z-20' : 'border-gray-100 hover:border-gray-200'
              ]"
            >
              <div class="absolute top-0 right-0 p-2 opacity-10 group-hover/cell:opacity-20 transition-opacity">
                <i class="fas fa-star text-4xl"></i>
              </div>
              <div class="flex items-center justify-between mb-6">
                <div>
                  <h4 class="text-xs font-black font-outfit text-gray-900 uppercase tracking-tight">Differentiation</h4>
                  <p class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mt-0.5">BROAD_MARKET_POSTURE</p>
                </div>
                <div v-if="currentPosition === 'Differentiation'" class="w-6 h-6 bg-[#2F2E8B] flex items-center justify-center text-white text-[10px]">
                  <i class="fas fa-check"></i>
                </div>
              </div>
              <p class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-tight leading-relaxed mb-8">Unique value proposition across systemic market channels</p>
              <div class="space-y-4 pt-6 border-t border-gray-50">
                <div class="flex items-center justify-between">
                  <span class="text-[8px] font-mono font-black text-gray-400 uppercase">UNIQUENESS_VAL</span>
                  <span class="text-[10px] font-mono font-black text-indigo-600">{{ strategies.differentiation.uniqueness }}%</span>
                </div>
                <div class="relative h-1 bg-gray-50">
                  <div class="absolute left-0 top-0 h-full bg-indigo-500" :style="{ width: strategies.differentiation.uniqueness + '%' }"></div>
                </div>
              </div>
            </div>

            <!-- Cost Focus (Narrow) -->
            <div 
              @click="selectPosition('Cost Focus')"
              :class="[
                'relative bg-white border p-8 cursor-pointer transition-all group/cell',
                currentPosition === 'Cost Focus' ? 'border-[#2F2E8B] shadow-2xl scale-[1.02] z-20' : 'border-gray-100 hover:border-gray-200'
              ]"
            >
              <div class="absolute top-0 right-0 p-2 opacity-10 group-hover/cell:opacity-20 transition-opacity">
                <i class="fas fa-bullseye text-4xl"></i>
              </div>
              <div class="flex items-center justify-between mb-6">
                <div>
                  <h4 class="text-xs font-black font-outfit text-gray-900 uppercase tracking-tight">Cost Focus</h4>
                  <p class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mt-0.5">NARROW_NICHE_POSTURE</p>
                </div>
                <div v-if="currentPosition === 'Cost Focus'" class="w-6 h-6 bg-[#2F2E8B] flex items-center justify-center text-white text-[10px]">
                  <i class="fas fa-check"></i>
                </div>
              </div>
              <p class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-tight leading-relaxed mb-8">Lowest cost operation within critical market segments</p>
              <div class="space-y-4 pt-6 border-t border-gray-50">
                <div class="flex items-center justify-between">
                  <span class="text-[8px] font-mono font-black text-gray-400 uppercase">NICHE_CORE_EFF</span>
                  <span class="text-[10px] font-mono font-black text-emerald-600">{{ strategies.costFocus.efficiency }}%</span>
                </div>
                <div class="relative h-1 bg-gray-50">
                  <div class="absolute left-0 top-0 h-full bg-emerald-500" :style="{ width: strategies.costFocus.efficiency + '%' }"></div>
                </div>
              </div>
            </div>

            <!-- Differentiation Focus (Narrow) -->
            <div 
              @click="selectPosition('Differentiation Focus')"
              :class="[
                'relative bg-white border p-8 cursor-pointer transition-all group/cell',
                currentPosition === 'Differentiation Focus' ? 'border-[#2F2E8B] shadow-2xl scale-[1.02] z-20' : 'border-gray-100 hover:border-gray-200'
              ]"
            >
              <div class="absolute top-0 right-0 p-2 opacity-10 group-hover/cell:opacity-20 transition-opacity">
                <i class="fas fa-gem text-4xl"></i>
              </div>
              <div class="flex items-center justify-between mb-6">
                <div>
                  <h4 class="text-xs font-black font-outfit text-gray-900 uppercase tracking-tight">Diff. Focus</h4>
                  <p class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mt-0.5">NARROW_NICHE_POSTURE</p>
                </div>
                <div v-if="currentPosition === 'Differentiation Focus'" class="w-6 h-6 bg-[#2F2E8B] flex items-center justify-center text-white text-[10px]">
                  <i class="fas fa-check"></i>
                </div>
              </div>
              <p class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-tight leading-relaxed mb-8">Premium value proposition for specialized market vectors</p>
              <div class="space-y-4 pt-6 border-t border-gray-50">
                <div class="flex items-center justify-between">
                  <span class="text-[8px] font-mono font-black text-gray-400 uppercase">VAL_DENSITY</span>
                  <span class="text-[10px] font-mono font-black text-indigo-600">{{ strategies.differentiationFocus.uniqueness }}%</span>
                </div>
                <div class="relative h-1 bg-gray-50">
                  <div class="absolute left-0 top-0 h-full bg-indigo-500" :style="{ width: strategies.differentiationFocus.uniqueness + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Stuck in the Middle Warning -->
        <div v-if="stuckInMiddle" class="bg-red-50 border border-red-200 p-8 relative overflow-hidden mb-6">
          <div class="absolute top-0 right-0 bg-red-100 border-b border-l border-red-200 px-3 py-1 text-[9px] font-mono font-black text-red-600 uppercase tracking-widest z-20">CRITICAL_WARNING // STUCK_IN_MIDDLE</div>
          <div class="flex items-start gap-6 relative z-10">
            <div class="w-12 h-12 bg-red-600 text-white flex items-center justify-center shrink-0">
              <i class="fas fa-exclamation-triangle text-xl"></i>
            </div>
            <div>
              <h4 class="text-sm font-black font-outfit text-red-900 uppercase tracking-tight mb-2">Systemic Competitive Disadvantage</h4>
              <p class="text-[10px] font-mono font-bold text-red-700 uppercase leading-relaxed mb-4">{{ stuckInMiddleReason }}</p>
              <div class="p-4 bg-white border border-red-100 flex items-center gap-3">
                <span class="text-[8px] font-mono font-black text-red-400 uppercase">RECOVERY_VECTOR:</span>
                <span class="text-[10px] font-mono font-black text-red-900 uppercase">{{ stuckInMiddleAction }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- AI Strategy Recommendation -->
        <div class="bg-[#2F2E8B] p-8 relative overflow-hidden">
          <div class="absolute inset-0 dotted-pattern opacity-[0.1] pointer-events-none"></div>
          <div class="flex items-start gap-6 relative z-10">
            <div class="w-12 h-12 bg-white/20 text-white flex items-center justify-center shrink-0">
              <i class="fas fa-robot text-xl"></i>
            </div>
            <div class="flex-1">
              <p class="text-[10px] font-mono font-black text-white/50 uppercase tracking-widest mb-2">AI_STRATEGIC_RECOMMENDATION</p>
              <p class="text-[11px] font-mono font-bold text-white uppercase leading-relaxed tracking-tight">{{ aiRecommendation }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Scope Strategy Analysis -->
      <div class="bg-white border border-gray-200 p-8 shadow-sm relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors mb-6">
        <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
        <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SYSTEM_SCOPE // MARKET_PENETRATION</div>
        
        <div v-if="isLoadingAnalysis" class="absolute inset-0 bg-white/90 backdrop-blur-md z-[30] flex items-center justify-center">
          <div class="text-center">
            <div class="w-12 h-12 border-2 border-[#2F2E8B] border-t-transparent animate-spin mb-4 mx-auto"></div>
            <p class="text-[10px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest">LOADING_SCOPE_DYNAMICS...</p>
          </div>
        </div>

        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 relative z-10">
          <h3 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight flex items-center gap-3">
            <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
            Strategic Scope Analysis
          </h3>
          <div class="px-4 py-2 bg-gray-50 border border-gray-100">
            <span class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mr-3">CORE_MARKET_HORIZON:</span>
            <span class="text-[10px] font-mono font-black text-[#2F2E8B] uppercase tracking-tight">{{ scopeAnalysis.current.regions }}</span>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 relative z-10">
          <!-- Current Scope -->
          <div class="bg-gray-50/50 border border-gray-100 p-8 hover:bg-white hover:border-[#2F2E8B]/20 transition-all relative group/card">
            <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
            <h4 class="text-[10px] font-mono font-black text-gray-900 uppercase tracking-widest mb-8 border-b border-gray-100 pb-4">CURRENT_SCOPE_VECTOR</h4>
            <div class="space-y-6">
              <div class="flex flex-col gap-1">
                <span class="text-[8px] font-mono font-black text-gray-400 uppercase">REGIONAL_DEPLOYMENT</span>
                <span class="text-[11px] font-mono font-black text-gray-900 uppercase">{{ scopeAnalysis.current.regions }}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-[8px] font-mono font-black text-gray-400 uppercase">PRODUCT_LINES_COUNT</span>
                <span class="text-[11px] font-mono font-black text-gray-900 uppercase">{{ scopeAnalysis.current.productLines }}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-[8px] font-mono font-black text-gray-400 uppercase">CELLULAR_SEGMENTS</span>
                <span class="text-[11px] font-mono font-black text-gray-900 uppercase">{{ scopeAnalysis.current.segments }}</span>
              </div>
              <div class="pt-6 border-t border-gray-100">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-[8px] font-mono font-black text-gray-400 uppercase">SATURATION_COEFFICIENT</span>
                  <span class="text-[10px] font-mono font-black text-[#2F2E8B]">{{ scopeAnalysis.current.coverage }}%</span>
                </div>
                <div class="relative h-1 bg-gray-100">
                  <div class="absolute left-0 top-0 h-full bg-[#2F2E8B]" :style="{ width: scopeAnalysis.current.coverage + '%' }"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Expansion Opportunities -->
          <div class="bg-emerald-50/10 border border-emerald-100 p-8 hover:bg-emerald-50/20 hover:border-emerald-500/20 transition-all relative group/card">
            <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
            <h4 class="text-[10px] font-mono font-black text-emerald-900 uppercase tracking-widest mb-8 border-b border-emerald-100 pb-4 flex items-center gap-2">
              <i class="fas fa-arrow-up text-emerald-500"></i>
              EXPANSION_VECTORS
            </h4>
            <div class="space-y-4">
              <div 
                v-for="opportunity in scopeAnalysis.expansion" 
                :key="opportunity.id"
                class="bg-white border border-emerald-100 p-4 group/opp hover:border-emerald-300 transition-colors"
              >
                <div class="flex items-start justify-between mb-2">
                  <span class="text-[10px] font-mono font-black text-emerald-900 uppercase tracking-tight">{{ opportunity.name }}</span>
                  <span class="text-[8px] font-mono font-black bg-emerald-500 text-white px-1.5 py-0.5">ROI: {{ opportunity.roi }}%</span>
                </div>
                <p class="text-[9px] font-mono font-bold text-emerald-700/70 uppercase leading-relaxed">{{ opportunity.rationale }}</p>
              </div>
            </div>
          </div>

          <!-- Overextension Risks -->
          <div class="bg-red-50/10 border border-red-100 p-8 hover:bg-red-50/20 hover:border-red-500/20 transition-all relative group/card">
            <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
            <h4 class="text-[10px] font-mono font-black text-red-900 uppercase tracking-widest mb-8 border-b border-red-100 pb-4 flex items-center gap-2">
              <i class="fas fa-exclamation-circle text-red-500"></i>
              RISK_VECTORS
            </h4>
            <div class="space-y-4">
              <div 
                v-for="risk in scopeAnalysis.risks" 
                :key="risk.id"
                class="bg-white border border-red-100 p-4 group/risk hover:border-red-300 transition-colors"
              >
                <div class="flex items-start justify-between mb-2">
                  <span class="text-[10px] font-mono font-black text-red-900 uppercase tracking-tight">{{ risk.name }}</span>
                  <span class="text-[8px] font-mono font-black bg-red-500 text-white px-1.5 py-0.5">{{ risk.severity }}_CRIT</span>
                </div>
                <p class="text-[9px] font-mono font-bold text-red-700/70 uppercase leading-relaxed">{{ risk.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Scope Recommendation -->
        <div class="bg-gray-900 p-8 relative overflow-hidden">
          <div class="absolute inset-0 dotted-pattern opacity-[0.1] pointer-events-none"></div>
          <div class="flex items-start gap-6 relative z-10">
            <div class="w-12 h-12 bg-white text-gray-900 flex items-center justify-center shrink-0">
              <i class="fas fa-lightbulb text-xl"></i>
            </div>
            <div class="flex-1">
              <p class="text-[10px] font-mono font-black text-white/50 uppercase tracking-widest mb-2">SCOPE_VECTOR_RECOMMENDATION</p>
              <p class="text-[11px] font-mono font-bold text-white uppercase leading-relaxed tracking-tight">{{ scopeAnalysis.recommendation }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Strategic Renewal Alerts -->
      <div class="bg-white border border-gray-200 p-8 shadow-sm relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors mb-6">
        <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
        <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SYSTEM_RENEWAL // ADAPTIVE_FLOW</div>
        
        <div v-if="isLoadingAnalysis" class="absolute inset-0 bg-white/90 backdrop-blur-md z-[30] flex items-center justify-center">
          <div class="text-center">
            <div class="w-12 h-12 border-2 border-[#2F2E8B] border-t-transparent animate-spin mb-4 mx-auto"></div>
            <p class="text-[10px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest">CALIBRATING_RENEWAL_VECTORS...</p>
          </div>
        </div>

        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 relative z-10">
          <h3 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight flex items-center gap-3">
            <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
            Strategic Renewal Alerts
          </h3>
          <div class="flex items-center gap-2">
            <span class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mr-3">ACTIVE_ALERTS:</span>
            <span class="px-3 py-1 bg-red-600 text-white text-[10px] font-mono font-black uppercase tracking-widest">
              {{ renewalAlerts.length }}_ALERTS
            </span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <div 
            v-for="alert in renewalAlerts" 
            :key="alert.id"
            class="bg-gray-50/50 border border-gray-100 p-8 hover:bg-white transition-all relative overflow-hidden group/alert"
            :class="[
              alert.urgency === 'High' ? 'hover:border-red-500/20 shadow-red-500/5' :
              alert.urgency === 'Medium' ? 'hover:border-amber-500/20 shadow-amber-500/5' :
              'hover:border-blue-500/20 shadow-blue-500/5'
            ]"
          >
            <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
            
            <div class="flex items-start justify-between mb-8">
              <div class="flex items-center gap-4">
                <div :class="[
                  'w-12 h-12 flex items-center justify-center text-xl shadow-xl',
                  alert.urgency === 'High' ? 'bg-red-600 text-white' :
                  alert.urgency === 'Medium' ? 'bg-amber-600 text-white' :
                  'bg-blue-600 text-white'
                ]">
                  <i :class="['fas', alert.icon]"></i>
                </div>
                <div>
                  <h4 class="text-sm font-black font-outfit text-gray-900 uppercase tracking-tight">{{ alert.title }}</h4>
                  <p class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mt-1">{{ alert.category }}</p>
                </div>
              </div>
              <span :class="[
                'px-2 py-0.5 text-[8px] font-mono font-black uppercase tracking-widest border',
                alert.urgency === 'High' ? 'bg-red-50 text-red-700 border-red-100' :
                alert.urgency === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                'bg-blue-50 text-blue-700 border-blue-100'
              ]">
                {{ alert.urgency }}_URGENCY
              </span>
            </div>

            <p class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-tight leading-relaxed mb-8">{{ alert.description }}</p>

            <div class="grid grid-cols-1 gap-4">
              <div class="bg-white border border-gray-100 p-4 relative overflow-hidden">
                <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-50 px-2 py-0.5 text-[7px] font-mono font-black text-gray-300 uppercase tracking-widest">TRIGGER_ID</div>
                <p class="text-[8px] font-mono font-black text-[#2F2E8B] uppercase mb-1">AI_DETECTED_TRIGGER:</p>
                <p class="text-[9px] font-mono font-bold text-gray-600 uppercase tracking-tight leading-relaxed">{{ alert.trigger }}</p>
              </div>

              <div class="bg-gray-900 p-4 relative overflow-hidden shadow-xl">
                <div class="absolute inset-0 dotted-pattern opacity-[0.1] pointer-events-none"></div>
                <p class="text-[8px] font-mono font-black text-white/50 uppercase mb-1">RECOMMENDED_ACTION:</p>
                <p class="text-[9px] font-mono font-bold text-white uppercase tracking-tight leading-relaxed">{{ alert.action }}</p>
              </div>
            </div>

            <div class="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              <div class="flex items-center gap-2 text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">
                <i class="fas fa-clock"></i>
                <span>T-DETECTED: {{ alert.detected }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">IMPACT_COEFF:</span>
                <span class="text-[10px] font-mono font-black text-[#2F2E8B]">{{ Number(alert.impact).toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3P Dynamic Capabilities Framework -->
      <div class="bg-white border border-gray-200 p-8 shadow-sm relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors mb-6">
        <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
        <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SYSTEM_CAPABILITY // 3P_FRAMEWORK</div>
        
        <div v-if="isLoadingAnalysis" class="absolute inset-0 bg-white/90 backdrop-blur-md z-[30] flex items-center justify-center">
          <div class="text-center">
            <div class="w-12 h-12 border-2 border-[#2F2E8B] border-t-transparent animate-spin mb-4 mx-auto"></div>
            <p class="text-[10px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest">ANALYZING_DYNAMIC_VECTORS...</p>
          </div>
        </div>

        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 relative z-10">
          <h3 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight flex items-center gap-3">
            <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
            3P Dynamic Capabilities Framework
          </h3>
          <div class="flex items-center gap-2">
            <span class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mr-3">FRAMEWORK_SYNC_STATUS:</span>
            <span class="px-3 py-1 bg-emerald-600 text-white text-[10px] font-mono font-black uppercase tracking-widest">ACTIVE_OPTIMIZED</span>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
          <!-- Perceive -->
          <div class="bg-gray-50/50 border border-gray-100 p-8 hover:bg-white transition-all relative group/capability">
            <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
            <div class="flex items-center gap-4 mb-8">
              <div class="w-12 h-12 bg-[#2F2E8B] text-white flex items-center justify-center text-xl shadow-xl">
                <i class="fas fa-eye"></i>
              </div>
              <div>
                <h4 class="text-sm font-black font-outfit text-gray-900 uppercase tracking-tight">Perceive</h4>
                <p class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mt-1">MARKET_SENSING_ENGINE</p>
              </div>
            </div>
            
            <div class="space-y-6">
              <div class="bg-white border border-gray-100 p-4 relative overflow-hidden">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-[8px] font-mono font-black text-gray-400 uppercase">SENSING_VECTOR</span>
                  <span class="text-[10px] font-mono font-black text-[#2F2E8B]">{{ Number(dynamicCapabilities.perceive.sensingScore).toFixed(2) }}/10</span>
                </div>
                <div class="relative h-1 bg-gray-50">
                  <div class="absolute left-0 top-0 h-full bg-[#2F2E8B]" :style="{ width: (dynamicCapabilities.perceive.sensingScore * 10) + '%' }"></div>
                </div>
              </div>

              <div class="space-y-3">
                <p class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mb-1">SIGNAL_STREAM:</p>
                <div 
                  v-for="signal in dynamicCapabilities.perceive.signals" 
                  :key="signal.id"
                  class="bg-white border border-gray-100 p-3 flex flex-col gap-2"
                >
                  <div class="flex items-center gap-2">
                    <i :class="['fas', signal.icon, 'text-[10px] text-[#2F2E8B]']"></i>
                    <span class="text-[9px] font-mono font-black text-gray-900 uppercase tracking-tight">{{ signal.name }}</span>
                  </div>
                  <p class="text-[8px] font-mono font-bold text-gray-500 uppercase leading-relaxed">{{ signal.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Pivot -->
          <div class="bg-gray-50/50 border border-gray-100 p-8 hover:bg-white transition-all relative group/capability">
            <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
            <div class="flex items-center gap-4 mb-8">
              <div class="w-12 h-12 bg-[#2F2E8B] text-white flex items-center justify-center text-xl shadow-xl">
                <i class="fas fa-random"></i>
              </div>
              <div>
                <h4 class="text-sm font-black font-outfit text-gray-900 uppercase tracking-tight">Pivot</h4>
                <p class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mt-1">STRATEGIC_AGILITY_NODE</p>
              </div>
            </div>
            
            <div class="space-y-6">
              <div class="bg-white border border-gray-100 p-4 relative overflow-hidden">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-[8px] font-mono font-black text-gray-400 uppercase">AGILITY_COEFF</span>
                  <span class="text-[10px] font-mono font-black text-amber-600">{{ Number(dynamicCapabilities.pivot.agilityScore).toFixed(2) }}/10</span>
                </div>
                <div class="relative h-1 bg-gray-50">
                  <div class="absolute left-0 top-0 h-full bg-amber-500" :style="{ width: (dynamicCapabilities.pivot.agilityScore * 10) + '%' }"></div>
                </div>
              </div>

              <div class="space-y-3">
                <p class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mb-1">ADAPTATION_VECTORS:</p>
                <div 
                  v-for="pivot in dynamicCapabilities.pivot.recommendations" 
                  :key="pivot.id"
                  class="bg-white border border-gray-100 p-3 flex flex-col gap-2"
                >
                  <div class="flex items-center justify-between">
                    <span class="text-[9px] font-mono font-black text-gray-900 uppercase tracking-tight">{{ pivot.name }}</span>
                    <span class="text-[8px] font-mono font-black bg-amber-500 text-white px-1.5 py-0.5">{{ pivot.priority }}_PRIO</span>
                  </div>
                  <p class="text-[8px] font-mono font-bold text-gray-500 uppercase leading-relaxed">{{ pivot.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Perform -->
          <div class="bg-gray-50/50 border border-gray-100 p-8 hover:bg-white transition-all relative group/capability">
            <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
            <div class="flex items-center gap-4 mb-8">
              <div class="w-12 h-12 bg-[#2F2E8B] text-white flex items-center justify-center text-xl shadow-xl">
                <i class="fas fa-bolt"></i>
              </div>
              <div>
                <h4 class="text-sm font-black font-outfit text-gray-900 uppercase tracking-tight">Perform</h4>
                <p class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mt-1">EXECUTION_INTEL_STREAM</p>
              </div>
            </div>
            
            <div class="space-y-6">
              <div class="bg-white border border-gray-100 p-4 relative overflow-hidden">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-[8px] font-mono font-black text-gray-400 uppercase">EXECUTION_SYNC</span>
                  <span class="text-[10px] font-mono font-black text-emerald-600">{{ Number(dynamicCapabilities.perform.executionScore).toFixed(2) }}/10</span>
                </div>
                <div class="relative h-1 bg-gray-50">
                  <div class="absolute left-0 top-0 h-full bg-emerald-500" :style="{ width: (dynamicCapabilities.perform.executionScore * 10) + '%' }"></div>
                </div>
              </div>

              <div class="space-y-3">
                <p class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mb-1">PERFORMANCE_KPI_STREAM:</p>
                <div 
                  v-for="kpi in dynamicCapabilities.perform.kpis" 
                  :key="kpi.id"
                  class="bg-white border border-gray-100 p-3 flex flex-col gap-2"
                >
                  <div class="flex items-center justify-between">
                    <span class="text-[9px] font-mono font-black text-gray-900 uppercase tracking-tight">{{ kpi.name }}</span>
                    <span :class="[
                      'text-[9px] font-mono font-black',
                      kpi.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                    ]">
                      <i :class="['fas', kpi.trend === 'up' ? 'fa-caret-up' : 'fa-caret-down']"></i>
                      {{ kpi.value }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- AI Capability Insight -->
        <div class="bg-[#2F2E8B] p-8 relative overflow-hidden mt-8">
          <div class="absolute inset-0 dotted-pattern opacity-[0.1] pointer-events-none"></div>
          <div class="flex items-start gap-6 relative z-10">
            <div class="w-12 h-12 bg-white/20 text-white flex items-center justify-center shrink-0">
              <i class="fas fa-brain text-xl"></i>
            </div>
            <div class="flex-1">
              <p class="text-[10px] font-mono font-black text-white/50 uppercase tracking-widest mb-2">DYNAMIC_CAPABILITIES_INSIGHT</p>
              <p class="text-[11px] font-mono font-bold text-white uppercase leading-relaxed tracking-tight">{{ dynamicCapabilities.insight }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- AI Positioning Agent Modal -->
    <div 
      v-if="showAgentModal" 
      class="fixed inset-0 bg-gray-900/40 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-hidden"
      @click.self="showAgentModal = false"
    >
      <div class="bg-white border border-gray-200 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col relative">
        <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
        
        <!-- Modal Header -->
        <div class="bg-[#2F2E8B] p-8 relative overflow-hidden shrink-0">
          <div class="absolute inset-0 dotted-pattern opacity-[0.1] pointer-events-none"></div>
          <div class="absolute top-0 right-0 bg-white/10 border-b border-l border-white/10 px-3 py-1 text-[9px] font-mono font-black text-white/40 uppercase tracking-widest z-20">SYSTEM_AGENT // STRATEGIVE_POSTURE</div>
          
          <div class="flex items-center justify-between relative z-10">
            <div>
              <h2 class="text-2xl font-black font-outfit text-white uppercase tracking-tight flex items-center gap-4">
                <i class="fas fa-brain"></i>
                AI Positioning Agent
              </h2>
              <p class="text-white/50 text-[10px] font-mono font-black uppercase tracking-widest mt-2">CONFIGURING_COMPREHENSIVE_MARKET_INTELLIGENCE</p>
            </div>
            <button 
              @click="showAgentModal = false"
              class="w-10 h-10 bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>

        <!-- Modal Content -->
        <div class="p-8 space-y-8 overflow-y-auto relative z-10 border-b border-gray-100">
          <!-- Region -->
          <div class="space-y-3">
            <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <i class="fas fa-map-marker-alt text-[#2F2E8B]"></i>
              GEOGRAPHIC_DEPLOYMENT_REGION
            </label>
            <input
              v-model="agentConfig.region"
              type="text"
              placeholder="e.g., Zambia, Southern Africa, etc."
              class="w-full bg-gray-50 border border-gray-100 p-4 text-[11px] font-mono font-bold text-gray-900 uppercase focus:bg-white focus:border-[#2F2E8B] outline-none transition-all placeholder:text-gray-300"
            />
          </div>

          <!-- Industry -->
          <div class="space-y-3">
            <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <i class="fas fa-industry text-[#2F2E8B]"></i>
              SECTOR_CLASSIFICATION <span class="text-red-500 font-black">*</span>
            </label>
            <select
              v-model="agentConfig.industry"
              class="w-full bg-gray-50 border border-gray-100 p-4 text-[11px] font-mono font-bold text-gray-900 uppercase focus:bg-white focus:border-[#2F2E8B] outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="" class="text-gray-400">SELECT_SECTOR...</option>
              <option v-for="industry in industryOptions" :key="industry" :value="industry">
                {{ industry }}
              </option>
            </select>
          </div>

          <!-- Focus Areas -->
          <div class="space-y-3">
            <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <i class="fas fa-bullseye text-[#2F2E8B]"></i>
              CRITICAL_ANALYSIS_VECTORS <span class="text-red-500 font-black">*</span>
              <span class="text-[8px] font-mono font-black bg-gray-100 text-[#2F2E8B] px-1.5 py-0.5 ml-2">
                {{ agentConfig.focus_areas.length }}_SELECTED
              </span>
            </label>
            <div class="grid grid-cols-2 gap-4">
              <div
                v-for="area in focusAreaOptions"
                :key="area.value"
                @click="toggleFocusArea(area.value)"
                class="flex items-center gap-4 p-4 border cursor-pointer transition-all group/opt"
                :class="[
                  agentConfig.focus_areas.includes(area.value)
                    ? 'border-[#2F2E8B] bg-[#2F2E8B]/5'
                    : 'border-gray-100 bg-gray-50/50 hover:border-gray-200'
                ]"
              >
                <div class="w-5 h-5 border flex items-center justify-center shrink-0 transition-colors"
                  :class="[
                    agentConfig.focus_areas.includes(area.value)
                      ? 'bg-[#2F2E8B] border-[#2F2E8B] text-white'
                      : 'border-gray-200 bg-white group-hover/opt:border-gray-300'
                  ]"
                >
                  <i v-if="agentConfig.focus_areas.includes(area.value)" class="fas fa-check text-[10px]"></i>
                </div>
                <span class="text-[10px] font-mono font-black text-gray-900 uppercase tracking-tight">{{ area.label }}</span>
              </div>
            </div>
          </div>

          <!-- Info Box -->
          <div class="bg-gray-900 p-8 relative overflow-hidden">
            <div class="absolute inset-0 dotted-pattern opacity-[0.1] pointer-events-none"></div>
            <div class="flex gap-6 relative z-10">
              <div class="w-12 h-12 bg-white/10 flex items-center justify-center shrink-0">
                <i class="fas fa-info-circle text-white text-xl"></i>
              </div>
              <div class="flex-1">
                <p class="text-[10px] font-mono font-black text-white/50 uppercase tracking-widest mb-4">AGENT_PROTOCOL_OPERATIONS:</p>
                <div class="grid grid-cols-2 gap-x-8 gap-y-4">
                  <div v-for="(item, idx) in [
                    'Real-time Competitive Intel', 'Internal Metric Analysis',
                    'Porter Framework Mapping', 'Strategic Renewal Detection',
                    '3P Capability Assessment', 'Stuck-in-Middle Detection',
                    'Value Proposition Review', 'Actionable Recommendations'
                  ]" :key="idx" class="flex items-center gap-3">
                    <div class="w-1 h-1 bg-[#2F2E8B]"></div>
                    <span class="text-[9px] font-mono font-bold text-white/80 uppercase tracking-tight">{{ item }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="p-8 bg-gray-50 shrink-0 relative overflow-hidden">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="flex gap-4 justify-end relative z-10">
            <button
              @click="showAgentModal = false"
              class="px-8 py-3 bg-white border border-gray-200 text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 hover:border-gray-900 transition-all"
            >
              TERMINATE
            </button>
            <button
              @click="triggerPositioningAgent"
              :disabled="isTriggeringAgent || !agentConfig.industry || agentConfig.focus_areas.length === 0"
              class="px-8 py-3 flex items-center gap-3 transition-all relative overflow-hidden group/btn"
              :class="[
                isTriggeringAgent || !agentConfig.industry || agentConfig.focus_areas.length === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#2F2E8B] text-white hover:shadow-2xl hover:scale-[1.02]'
              ]"
            >
              <div v-if="!isTriggeringAgent" class="absolute inset-0 dotted-pattern opacity-[0.1] pointer-events-none"></div>
              <i :class="['fas', isTriggeringAgent ? 'fa-spinner fa-spin' : 'fa-rocket', 'text-[10px]']"></i>
              <span class="text-[10px] font-mono font-black uppercase tracking-widest">
                {{ isTriggeringAgent ? 'EXECUTING_ANALYSIS...' : 'INITIALIZE_AGENT_DEPLOYMENT' }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import API_BASE_URL from '@/services/api.js'
import { decodeJWT } from '@/services/decodeJWT.js'
import StrategicNavigation from './components/StrategicNavigation.vue'

const router = useRouter()
const lastUpdated = ref('5 min ago')

// Tenant context removed
const tenantId = ref('default')

// Loading states
const isLoadingAnalysis = ref(false)
const isRefreshing = ref(false)
const isTriggeringAgent = ref(false)

// Positioning Agent Modal
const showAgentModal = ref(false)
const agentConfig = ref({
  region: 'Zambia',
  industry: '',
  focus_areas: []
})

const industryOptions = [
  'Retail & Consumer Goods',
  'Technology & Software',
  'Manufacturing & Industrial',
  'Agriculture & Food Production',
  'Healthcare & Pharmaceuticals',
  'Financial Services & Banking',
  'Transportation & Logistics',
  'Energy & Mining',
  'Telecommunications',
  'Real Estate & Construction',
  'Hospitality & Tourism',
  'Education & Training',
  'Professional Services',
  'Entertainment & Media',
  'Other'
]

const focusAreaOptions = [
  { value: 'competitive_intelligence', label: 'Competitive Intelligence' },
  { value: 'market_trends', label: 'Market Trends & Analysis' },
  { value: 'cost_position', label: 'Cost Position Analysis' },
  { value: 'differentiation_factors', label: 'Differentiation Factors' },
  { value: 'scope_strategy', label: 'Scope Strategy Review' },
  { value: 'renewal_detection', label: 'Strategic Renewal Detection' },
  { value: 'dynamic_capabilities', label: 'Dynamic Capabilities Assessment' },
  { value: 'stuck_in_middle', label: 'Stuck-in-Middle Detection' },
  { value: 'pricing_strategy', label: 'Pricing Strategy' },
  { value: 'value_proposition', label: 'Value Proposition' },
  { value: 'customer_segments', label: 'Customer Segmentation' },
  { value: 'channel_strategy', label: 'Channel Strategy' }
]

const toggleFocusArea = (area) => {
  const index = agentConfig.value.focus_areas.indexOf(area)
  if (index > -1) {
    agentConfig.value.focus_areas.splice(index, 1)
  } else {
    agentConfig.value.focus_areas.push(area)
  }
}

const triggerPositioningAgent = async () => {
  if (!agentConfig.value.industry) {
    alert('Please select an industry')
    return
  }
  
  if (agentConfig.value.focus_areas.length === 0) {
    alert('Please select at least one focus area')
    return
  }
  
  if (!tenantId.value) {
    alert('Tenant ID not found. Please log in again.')
    return
  }
  
  isTriggeringAgent.value = true
  
  try {
    const payload = {
      tenant_id: tenantId.value,
      region: agentConfig.value.region,
      industry: agentConfig.value.industry,
      focus_areas: agentConfig.value.focus_areas
    }
    
    const response = await axios.post(
      `${API_BASE_URL}/positioning-agent/trigger`,
      payload
    )
    
    console.log('Positioning agent triggered:', response.data)
    
    // Close modal
    showAgentModal.value = false
    
    // Refresh data to get new analysis
    await fetchPositioningAnalysis()
    
    alert('Positioning agent triggered successfully! Analysis complete.')
  } catch (error) {
    console.error('Failed to trigger positioning agent:', error)
    alert('Failed to trigger agent: ' + (error.response?.data?.detail || error.message))
  } finally {
    isTriggeringAgent.value = false
  }
}

// Navigation
const activeTab = ref('positioning')

// Strategic Positioning
const currentPosition = ref('')
const recommendedPosition = ref('')
const positionRationale = ref('')
const positioningScore = ref(0)
const positioningStrength = computed(() => {
  if (positioningScore.value >= 75) return 'Strong'
  if (positioningScore.value >= 60) return 'Moderate'
  return 'Weak'
})

// Strategy Data
const strategies = ref({
  costLeadership: {
    efficiency: 0,
    costAdvantage: 0,
    marketShare: 0
  },
  differentiation: {
    uniqueness: 0,
    sentiment: 0,
    premiumMargin: 0
  },
  costFocus: {
    efficiency: 0,
    penetration: 0
  },
  differentiationFocus: {
    uniqueness: 0,
    loyalty: 0
  }
})

// Stuck in the Middle Detection
const stuckInMiddle = ref(false)
const stuckInMiddleReason = ref('')
const stuckInMiddleAction = ref('')

// AI Recommendation
const aiRecommendation = ref('')
const executiveSummary = ref('')

// Scope Analysis
const scopeAnalysis = ref({
  current: {
    regions: 0,
    productLines: 0,
    segments: 0,
    coverage: 0
  },
  expansion: [],
  risks: [],
  recommendation: ''
})

// Strategic Renewal Alerts
const renewalAlerts = ref([])

// 3P Dynamic Capabilities
const dynamicCapabilities = ref({
  perceive: {
    sensingScore: 0,
    signals: []
  },
  pivot: {
    agilityScore: 0,
    recommendations: []
  },
  perform: {
    executionScore: 0,
    kpis: []
  },
  insight: ''
})

// Methods
const selectPosition = (position) => {
  currentPosition.value = position
  console.log(`Selected position: ${position}`)
}

// Fetch positioning analysis from backend
const fetchPositioningAnalysis = async () => {
  if (!tenantId.value) {
    console.warn('No tenant ID found')
    return
  }
  
  isLoadingAnalysis.value = true
  
  try {
    const response = await axios.get(`${API_BASE_URL}/strategy/positioning/analysis`, {
      params: { tenant_id: tenantId.value }
    })
    
    const data = response.data
    
    // Update strategic positioning
    currentPosition.value = data.current_position || ''
    recommendedPosition.value = data.recommended_position || ''
    positionRationale.value = data.position_rationale || ''
    positioningScore.value = data.positioning_score || 0
    
    // Update strategies
    if (data.strategies) {
      strategies.value = {
        costLeadership: {
          efficiency: data.strategies.cost_leadership?.efficiency || 0,
          costAdvantage: data.strategies.cost_leadership?.cost_advantage || 0,
          marketShare: data.strategies.cost_leadership?.market_share || 0
        },
        differentiation: {
          uniqueness: data.strategies.differentiation?.uniqueness || 0,
          sentiment: data.strategies.differentiation?.sentiment || 0,
          premiumMargin: data.strategies.differentiation?.premium_margin || 0
        },
        costFocus: {
          efficiency: data.strategies.cost_focus?.efficiency || 0,
          penetration: data.strategies.cost_focus?.penetration || 0
        },
        differentiationFocus: {
          uniqueness: data.strategies.differentiation_focus?.uniqueness || 0,
          loyalty: data.strategies.differentiation_focus?.loyalty || 0
        }
      }
    }
    
    // Update stuck in middle
    if (data.stuck_in_middle) {
      stuckInMiddle.value = data.stuck_in_middle.stuck || false
      stuckInMiddleReason.value = data.stuck_in_middle.reason || ''
      stuckInMiddleAction.value = data.stuck_in_middle.action || ''
    }
    
    // Update AI recommendation
    aiRecommendation.value = data.ai_recommendation || ''

    // Update Executive Summary
    executiveSummary.value = data.executive_summary || ''
    
    // Update scope analysis
    if (data.scope_analysis) {
      scopeAnalysis.value = {
        current: data.scope_analysis.current || {
          regions: 0,
          productLines: 0,
          segments: 0,
          coverage: 0
        },
        expansion: data.scope_analysis.expansion || [],
        risks: data.scope_analysis.risks || [],
        recommendation: data.scope_analysis.recommendation || ''
      }
    }
    
    // Update renewal alerts
    if (data.renewal_alerts) {
      renewalAlerts.value = data.renewal_alerts
    }
    
    // Update dynamic capabilities
    if (data.dynamic_capabilities) {
      dynamicCapabilities.value = {
        perceive: {
          sensingScore: data.dynamic_capabilities.perceive?.sensing_score || 0,
          signals: data.dynamic_capabilities.perceive?.signals || []
        },
        pivot: {
          agilityScore: data.dynamic_capabilities.pivot?.agility_score || 0,
          recommendations: data.dynamic_capabilities.pivot?.recommendations || []
        },
        perform: {
          executionScore: data.dynamic_capabilities.perform?.execution_score || 0,
          kpis: data.dynamic_capabilities.perform?.kpis || []
        },
        insight: data.dynamic_capabilities.insight || ''
      }
    }
    
    // Update timestamp
    lastUpdated.value = 'Just now'
    
    console.log('Positioning analysis fetched:', data)
  } catch (error) {
    console.error('Error fetching positioning analysis:', error)
    // Keep existing data on error
  } finally {
    isLoadingAnalysis.value = false
  }
}

// API Integration
const refreshAnalysis = async () => {
  if (!tenantId.value) {
    alert('Tenant ID not found. Please log in again.')
    return
  }
  
  isRefreshing.value = true
  
  try {
    // Call refresh endpoint
    await axios.post(`${API_BASE_URL}/strategy/positioning/refresh`, {
      tenant_id: tenantId.value
    })
    
    // Fetch updated data
    await fetchPositioningAnalysis()
    
    alert('Positioning analysis refreshed successfully!')
  } catch (error) {
    console.error('Failed to refresh analysis:', error)
    alert('Failed to refresh analysis: ' + (error.response?.data?.detail || error.message))
  } finally {
    isRefreshing.value = false
  }
}

onMounted(async () => {
  // Fetch positioning data from backend
  await fetchPositioningAnalysis()
})
</script>

<style scoped>
/* Add any custom styles here */
</style>
