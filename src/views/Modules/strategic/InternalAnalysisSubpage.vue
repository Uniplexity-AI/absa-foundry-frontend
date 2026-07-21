<template>
  <div class="internal-analysis-subpage min-h-screen bg-[#F5F5F5] font-sans relative text-gray-900 overflow-x-hidden">
    <!-- Viewport Mesh Background (Fixed) -->
    <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <!-- Gradient Radial Accents -->
      <div class="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-[#2F2E8B]/[0.03] blur-[120px] rounded-full"></div>
      <div class="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-[#3D2F88]/[0.02] blur-[150px] rounded-full"></div>
    </div>

    <div class="max-w-[1700px] mx-auto px-8 py-12 relative z-10">
      
      <!-- Header with Competitive Advantage Score -->
      <div class="bg-white border border-gray-200 p-8 shadow-sm relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors mb-8">
        <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
        <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SYSTEM_MODULE // INTERNAL_CAPABILITIES_ENGINE</div>
        
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
          <div class="flex items-start gap-6">
            <div class="w-16 h-16 bg-gray-900 flex items-center justify-center shadow-2xl relative group-hover:bg-[#2F2E8B] transition-colors">
              <i class="fas fa-chess-knight text-white text-2xl"></i>
              <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-[#2F2E8B] border-2 border-white"></div>
            </div>
            <div>
              <h1 class="text-4xl font-black font-outfit text-gray-900 uppercase tracking-tight mb-2">
                Internal Analysis
              </h1>
              <div class="flex flex-wrap items-center gap-6 mt-4">
                <div class="flex items-center gap-3">
                  <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">VRIO_FRAMEWORK_ACTIVE</span>
                </div>
                <div class="h-4 w-[1px] bg-gray-200"></div>
                <div class="flex items-center gap-2">
                  <i class="fas fa-link text-[10px] text-[#2F2E8B]"></i>
                  <span class="text-[10px] font-mono font-black text-gray-900 uppercase tracking-widest">VALUE_CHAIN_MAPPED</span>
                </div>
                <div class="h-4 w-[1px] bg-gray-200"></div>
                <div class="flex items-center gap-2 text-gray-400">
                  <i class="fas fa-shield-alt text-[10px]"></i>
                  <span class="text-[10px] font-mono font-black uppercase tracking-widest">{{ isolatingMechanisms.length }} ISOLATING_MECHANISMS</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="flex flex-wrap items-center gap-6">
            <div class="bg-gray-50 border border-gray-100 p-6 flex items-center gap-8 shadow-sm">
              <div class="text-center">
                <p class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mb-1">ADVANTAGE_INDEX</p>
                <div class="text-3xl font-black font-mono text-gray-900">{{ Number(competitiveAdvantageIndex).toFixed(2) }}</div>
              </div>
              <div class="w-[1px] h-10 bg-gray-200"></div>
              <div>
                <span :class="[
                  'px-3 py-1 text-[9px] font-mono font-black uppercase tracking-widest block mb-1',
                  advantageLevel === 'Strong' ? 'bg-green-100 text-green-700' :
                  advantageLevel === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                ]">
                  {{ advantageLevel }}_ADVENTAGE
                </span>
                <p class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">INDUSTRY_AVG: 0.65</p>
              </div>
            </div>

            <div class="flex gap-4">
              <button
                @click="showAgentModal = true"
                class="px-6 py-3 bg-gray-900 text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-[#2F2E8B] transition-all shadow-xl shadow-gray-200/50 flex items-center gap-3"
              >
                <i class="fas fa-brain"></i>
                RUN_AI_DIAGNOSTIC
              </button>
              
              <button
                @click="refreshAnalysis"
                :disabled="isRefreshing"
                class="w-12 h-12 bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all disabled:opacity-50"
              >
                <i :class="['fas fa-sync-alt text-xs', { 'fa-spin': isRefreshing }]"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Strategic Navigation -->
      <StrategicNavigation active-tab="internal" />

      <!-- AI Executive Summary Banner -->
      <div v-if="executiveSummary" class="bg-gray-900 border border-gray-800 p-8 mb-8 relative overflow-hidden group shadow-2xl">
        <div class="absolute inset-0 dotted-pattern opacity-[0.1] pointer-events-none"></div>
        <div class="absolute top-0 right-0 bg-gray-800 border-b border-l border-gray-700 px-3 py-1 text-[9px] font-mono font-black text-white/40 uppercase tracking-widest z-20">INTELLIGENCE_LAYER // CAPABILITY_SUMMARY</div>
        
        <div class="flex items-start gap-8 relative z-10">
          <div class="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center text-2xl text-[#2F2E8B] shrink-0">
            <i class="fas fa-microchip"></i>
          </div>
          <div>
            <h3 class="text-xl font-black font-outfit text-white uppercase tracking-tight mb-4 flex items-center gap-3">
              Internal Capabilities Intelligence
              <span class="px-2 py-0.5 bg-[#2F2E8B] text-white text-[8px] font-mono font-black uppercase tracking-widest">AI_ANALYZED</span>
            </h3>
            <div class="text-[12px] font-mono font-medium text-white/80 uppercase tracking-tight leading-relaxed whitespace-pre-line border-l-2 border-[#2F2E8B] pl-6 py-2 bg-white/5">
              {{ executiveSummary }}
            </div>
            <div class="mt-6 flex items-center gap-6">
              <span class="text-[8px] font-mono font-black text-white/30 uppercase tracking-widest">SOURCE: INTERNAL_DIAGNOSTIC_AGENT</span>
              <span class="text-[8px] font-mono font-black text-white/30 uppercase tracking-widest">RELIABILITY: HIGH_VRIO</span>
            </div>
          </div>
        </div>
      </div>

      <!-- VRIO Framework Dashboard -->
      <div class="bg-white border border-gray-200 p-8 shadow-sm relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors mb-8">
        <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
        <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">MODEL_VRIO // CAPABILITY_DIAGNOSTICS</div>
        
        <!-- Loading Overlay -->
        <div v-if="isLoadingAnalysis" class="absolute inset-0 bg-white/80 backdrop-blur-sm z-30 flex items-center justify-center shadow-inner">
          <div class="text-center">
            <div class="relative w-16 h-16 mx-auto mb-4">
              <div class="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
              <div class="absolute inset-0 border-4 border-t-[#2F2E8B] rounded-full animate-spin"></div>
            </div>
            <p class="text-[10px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest">LOADING_STRATEGIC_NODES...</p>
          </div>
        </div>
        
        <div class="flex items-center justify-between mb-10">
          <h3 class="text-2xl font-black font-outfit text-gray-900 uppercase tracking-tight flex items-center gap-3">
            <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
            VRIO Framework Analysis
          </h3>
          <span class="text-[10px] font-mono font-black text-[#2F2E8B] border border-[#2F2E8B]/20 px-4 py-2 bg-[#2F2E8B]/[0.02] uppercase tracking-widest">
            {{ vrioCapabilities.length }}_CAPABILITIES_SYNCHRONIZED
          </span>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div 
            v-for="capability in vrioCapabilities" 
            :key="capability.id"
            class="bg-gray-50 border border-gray-100 p-8 relative overflow-hidden group/capability hover:bg-white hover:border-[#2F2E8B]/30 transition-all shadow-sm"
          >
            <div class="absolute top-0 right-0 bg-gray-100 border-b border-l border-gray-200 px-3 py-1 text-[8px] font-mono font-black text-gray-300 uppercase tracking-widest z-20 group-hover/capability:bg-[#2F2E8B]/5 group-hover/capability:text-[#2F2E8B]/40 transition-colors">CAPABILITY_ID: {{ capability.id }}</div>
            
            <div class="flex items-start justify-between mb-8">
              <div class="flex items-center gap-5">
                <div class="w-14 h-14 bg-white shadow-xl flex items-center justify-center border border-gray-100 group-hover/capability:scale-110 transition-transform">
                  <i :class="['fas', capability.icon, 'text-xl text-[#2F2E8B]']"></i>
                </div>
                <div>
                  <h4 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight mb-1">{{ capability.name }}</h4>
                  <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-tight">{{ capability.description }}</p>
                </div>
              </div>
              <div class="text-right">
                <div class="text-xs font-mono font-black text-gray-400 uppercase tracking-widest mb-1">VRIO_INDEX</div>
                <div class="text-4xl font-black font-mono text-[#2F2E8B]">{{ capability.vrioScore }}</div>
              </div>
            </div>

            <!-- VRIO Dimensions (Bit-Style) -->
            <div class="grid grid-cols-4 gap-4 mb-8">
              <div v-for="dim in [
                { key: 'valuable', label: 'V' },
                { key: 'rare', label: 'R' },
                { key: 'inimitable', label: 'I' },
                { key: 'organized', label: 'O' }
              ]" :key="dim.key" class="text-center group/dim">
                <div :class="[
                  'w-full h-8 border flex items-center justify-center text-[10px] font-mono font-black transition-all mb-2',
                  capability[dim.key] ? 'bg-gray-900 border-gray-900 text-white' : 'bg-white border-gray-100 text-gray-200'
                ]">
                  {{ dim.label }}
                </div>
                <p class="text-[8px] font-mono font-black uppercase tracking-widest" :class="capability[dim.key] ? 'text-gray-900' : 'text-gray-300'">
                  {{ dim.key }}
                </p>
              </div>
            </div>

            <!-- Competitive Implication -->
            <div class="bg-gray-900 p-4 border border-white/5 mb-6 relative overflow-hidden group/impl">
              <div class="absolute inset-0 dotted-pattern opacity-[0.2] pointer-events-none"></div>
              <div class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest mb-2 flex items-center gap-2">
                <i class="fas fa-microchip"></i> STRATEGIC_IMPLICATION_VECTOR
              </div>
              <p class="text-[11px] font-mono font-bold text-white uppercase leading-relaxed tracking-tight">{{ capability.implication }}</p>
            </div>

            <!-- Metrics -->
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-white border border-gray-100 p-4 flex items-center justify-between">
                <span class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">IMPACT_FACTOR</span>
                <strong class="text-[10px] font-mono font-black text-[#2F2E8B] uppercase">{{ capability.impact }}</strong>
              </div>
              <div class="bg-white border border-gray-100 p-4 flex items-center justify-between">
                <span class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">LIMIT_RISK</span>
                <strong :class="[
                  'text-[10px] font-mono font-black uppercase',
                  capability.imitationRisk === 'Low' ? 'text-green-600' :
                  capability.imitationRisk === 'Medium' ? 'text-yellow-600' :
                  'text-red-600'
                ]">{{ capability.imitationRisk }}</strong>
              </div>
            </div>
          </div>
        </div>

        <!-- Strategic Recommendation -->
        <div class="bg-gray-900 p-8 border border-white/5 relative overflow-hidden">
          <div class="absolute inset-0 dotted-pattern opacity-[0.1] pointer-events-none"></div>
          <div class="flex items-start gap-8 relative z-10">
            <div class="w-12 h-12 bg-white flex items-center justify-center shrink-0">
              <i class="fas fa-brain text-xl text-[#2F2E8B]"></i>
            </div>
            <div>
              <p class="text-[10px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest mb-2">AI_STRATEGIC_PRIORITY_PROTOCOL</p>
              <p class="text-lg font-mono font-bold text-white uppercase leading-tight tracking-tight">{{ vrioRecommendation }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Value Chain Analysis -->
      <div class="bg-white border border-gray-200 p-8 shadow-sm relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors mb-8 text-gray-900">
        <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
        <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">MODEL_VCA // VALUE_GEN_FLOW</div>
        
        <!-- Loading Overlay -->
        <div v-if="isLoadingAnalysis" class="absolute inset-0 bg-white/80 backdrop-blur-sm z-30 flex items-center justify-center">
          <div class="text-center">
            <div class="relative w-16 h-16 mx-auto mb-4">
              <div class="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
              <div class="absolute inset-0 border-4 border-t-[#2F2E8B] rounded-full animate-spin"></div>
            </div>
            <p class="text-[10px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest">MAPPING_VALUE_STREAMS...</p>
          </div>
        </div>
        
        <div class="flex items-center justify-between mb-10">
          <h3 class="text-2xl font-black font-outfit text-gray-900 uppercase tracking-tight flex items-center gap-3">
            <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
            Value Chain Analysis
          </h3>
        </div>

        <!-- Primary Activities -->
        <div class="mb-12">
          <div class="flex items-center gap-4 mb-6">
            <div class="px-4 py-2 bg-gray-900 text-white text-[10px] font-mono font-black uppercase tracking-widest">PRIMARY_ACTIVITIES</div>
            <div class="flex-1 h-[1px] bg-gray-200"></div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div 
              v-for="activity in valueChain.primary" 
              :key="activity.id"
              class="bg-gray-50 border border-gray-100 p-6 relative overflow-hidden group/activity hover:bg-white hover:border-[#2F2E8B]/30 transition-all shadow-sm"
            >
              <div class="flex items-center gap-3 mb-6">
                <div class="w-10 h-10 bg-white border border-gray-100 flex items-center justify-center">
                  <i :class="['fas', activity.icon, 'text-sm text-[#2F2E8B]']"></i>
                </div>
                <h5 class="text-xs font-black font-outfit text-gray-900 uppercase tracking-tight">{{ activity.name }}</h5>
              </div>
              <div class="space-y-4">
                <div class="flex justify-between items-end mb-2">
                  <span class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">VALUE_SCORE</span>
                  <strong class="text-base font-black font-mono text-[#2F2E8B]">{{ activity.valueScore }}.0</strong>
                </div>
                <!-- Progress Vector -->
                <div class="relative h-1 bg-gray-100 overflow-hidden">
                  <div class="absolute top-0 left-0 h-full bg-[#2F2E8B] transition-all duration-1000" :style="{ width: `${activity.valueScore * 10}%` }"></div>
                  <!-- Tick marks -->
                  <div class="absolute inset-0 flex justify-between px-0.5">
                    <div v-for="i in 10" :key="i" class="w-0.5 h-full bg-white/20"></div>
                  </div>
                </div>
                
                <p class="text-[10px] font-mono font-bold text-gray-500 leading-relaxed uppercase">{{ activity.insight }}</p>
                
                <div v-if="activity.advantage" class="bg-gray-900 p-3 border border-white/5 relative">
                  <div class="absolute inset-0 dotted-pattern opacity-[0.1] pointer-events-none"></div>
                  <p class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest mb-1">CORE_ADVANTAGE</p>
                  <p class="text-[10px] font-mono font-bold text-white uppercase">{{ activity.advantage }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Support Activities -->
        <div>
          <div class="flex items-center gap-4 mb-6">
            <div class="px-4 py-2 bg-gray-100 border border-gray-200 text-gray-400 text-[10px] font-mono font-black uppercase tracking-widest">SUPPORT_ACTIVITIES</div>
            <div class="flex-1 h-[1px] bg-gray-200"></div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div 
              v-for="activity in valueChain.support" 
              :key="activity.id"
              class="bg-gray-50 border border-gray-100 p-6 relative overflow-hidden group/support hover:bg-white hover:border-[#3D2F88]/30 transition-all shadow-sm"
            >
              <div class="flex items-center gap-3 mb-6">
                <div class="w-10 h-10 bg-white border border-gray-100 flex items-center justify-center">
                  <i :class="['fas', activity.icon, 'text-sm text-[#3D2F88]']"></i>
                </div>
                <h5 class="text-xs font-black font-outfit text-gray-900 uppercase tracking-tight">{{ activity.name }}</h5>
              </div>
              <div class="space-y-4">
                <div class="flex justify-between items-end mb-2">
                  <span class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">EFFICIENCY_SCORE</span>
                  <strong class="text-base font-black font-mono text-[#3D2F88]">{{ activity.valueScore }}.0</strong>
                </div>
                <div class="relative h-1 bg-gray-100 overflow-hidden">
                  <div class="absolute top-0 left-0 h-full bg-[#3D2F88] transition-all duration-1000" :style="{ width: `${activity.valueScore * 10}%` }"></div>
                </div>
                <p class="text-[10px] font-mono font-bold text-gray-500 leading-relaxed uppercase">{{ activity.insight }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Isolating Mechanisms -->
      <div class="bg-white border border-gray-200 p-8 shadow-sm relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors mb-8 text-gray-900">
        <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
        <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">MODEL_MOATS // DEFENSE_MECHANISMS</div>
        
        <!-- Loading Overlay -->
        <div v-if="isLoadingAnalysis" class="absolute inset-0 bg-white/80 backdrop-blur-sm z-30 flex items-center justify-center">
          <div class="text-center">
            <div class="relative w-16 h-16 mx-auto mb-4">
              <div class="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
              <div class="absolute inset-0 border-4 border-t-[#2F2E8B] rounded-full animate-spin"></div>
            </div>
            <p class="text-[10px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest">SCANNING_DEFENSE_PROTCOLS...</p>
          </div>
        </div>
        
        <div class="flex items-center justify-between mb-10">
          <h3 class="text-2xl font-black font-outfit text-gray-900 uppercase tracking-tight flex items-center gap-3">
            <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
            Isolating Mechanisms
          </h3>
          <span class="text-[10px] font-mono font-black text-green-600 border border-green-200 px-4 py-2 bg-green-50 uppercase tracking-widest">
            {{ isolatingMechanisms.length }}_ACTIVE_DEFENSES
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            v-for="mechanism in isolatingMechanisms" 
            :key="mechanism.id"
            class="bg-gray-50 border border-gray-100 p-8 relative overflow-hidden group/mechanism hover:bg-white hover:border-[#2F2E8B]/30 transition-all shadow-sm"
          >
            <div class="absolute top-0 right-0 bg-gray-100 border-b border-l border-gray-200 px-3 py-1 text-[8px] font-mono font-black text-gray-300 uppercase tracking-widest z-20">DEFENSE_CLASS: {{ mechanism.type }}</div>
            
            <div class="flex items-start justify-between mb-8">
              <div class="flex items-center gap-5">
                <div :class="[
                  'w-14 h-14 bg-white shadow-xl flex items-center justify-center border border-gray-100 group-hover/mechanism:scale-110 transition-transform',
                  mechanism.strength === 'Strong' ? 'border-green-100' :
                  mechanism.strength === 'Moderate' ? 'border-blue-100' :
                  'border-yellow-100'
                ]">
                  <i :class="[
                    'fas', mechanism.icon, 'text-xl',
                    mechanism.strength === 'Strong' ? 'text-green-600' :
                    mechanism.strength === 'Moderate' ? 'text-blue-600' :
                    'text-yellow-600'
                  ]"></i>
                </div>
                <div>
                  <h4 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight mb-1">{{ mechanism.name }}</h4>
                  <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-tight">STRENGTH_INDEX: {{ mechanism.strength }}</p>
                </div>
              </div>
            </div>

            <p class="text-[11px] font-mono font-bold text-gray-600 uppercase leading-relaxed mb-6">{{ mechanism.description }}</p>

            <div class="grid grid-cols-2 gap-6 mb-6">
              <div>
                <div class="flex justify-between items-end mb-2">
                  <span class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">DURABILITY</span>
                  <strong class="text-sm font-black font-mono text-[#2F2E8B]">{{ mechanism.durability }}%</strong>
                </div>
                <div class="h-1 bg-gray-100 overflow-hidden">
                  <div class="h-full bg-[#2F2E8B]" :style="{ width: `${mechanism.durability}%` }"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between items-end mb-2">
                  <span class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">IMITATION_COST</span>
                  <strong class="text-sm font-black font-mono text-[#2F2E8B]">{{ mechanism.imitationCost }}</strong>
                </div>
                <div class="h-1 bg-gray-100 overflow-hidden">
                  <div class="h-full bg-gray-900" style="width: 100%"></div>
                </div>
              </div>
            </div>

            <div class="bg-gray-900 p-4 border border-white/5 relative overflow-hidden group/impl">
              <div class="absolute inset-0 dotted-pattern opacity-[0.2] pointer-events-none"></div>
              <div class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest mb-2 flex items-center gap-2">
                <i class="fas fa-search"></i> EVIDENCE_LOG
              </div>
              <p class="text-[10px] font-mono font-bold text-white uppercase tracking-tight">{{ mechanism.evidence }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Value Network Analysis -->
      <div class="bg-white border border-gray-200 p-8 shadow-sm relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors mb-8 text-gray-900">
        <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
        <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">MODEL_NETWORK // NODE_TOPOLOGY</div>
        
        <!-- Loading Overlay -->
        <div v-if="isLoadingAnalysis" class="absolute inset-0 bg-white/80 backdrop-blur-sm z-30 flex items-center justify-center">
          <div class="text-center">
            <div class="relative w-16 h-16 mx-auto mb-4">
              <div class="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
              <div class="absolute inset-0 border-4 border-t-[#2F2E8B] rounded-full animate-spin"></div>
            </div>
            <p class="text-[10px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest">ANALYZING_NODE_CONNECTIONS...</p>
          </div>
        </div>
        
        <div class="flex items-center justify-between mb-10">
          <h3 class="text-2xl font-black font-outfit text-gray-900 uppercase tracking-tight flex items-center gap-3">
            <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
            Value Network Analysis
          </h3>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Suppliers -->
          <div class="bg-gray-50 border border-gray-100 p-8 relative group/supplier hover:bg-white hover:border-[#2F2E8B]/30 transition-all shadow-sm overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-[#2F2E8B]/20"></div>
            <h4 class="text-base font-black font-outfit text-gray-900 uppercase tracking-tight mb-8 flex items-center gap-4">
              <i class="fas fa-truck text-[#2F2E8B]"></i>
              SUPPLIER_NETWORK
            </h4>
            <div class="space-y-6">
              <div class="flex justify-between items-end border-b border-gray-100 pb-2">
                <span class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">RELIABILITY_SCORE</span>
                <strong class="text-lg font-black font-mono text-[#2F2E8B]">{{ valueNetwork.suppliers.reliability }}.0</strong>
              </div>
              <div class="flex justify-between items-end border-b border-gray-100 pb-2">
                <span class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">COST_EFFICIENCY</span>
                <strong class="text-lg font-black font-mono text-[#2F2E8B]">{{ valueNetwork.suppliers.costEfficiency }}%</strong>
              </div>
              <div class="flex justify-between items-end border-b border-gray-100 pb-2">
                <span class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">PARTNER_STRENGTH</span>
                <strong class="text-lg font-black font-mono text-[#2F2E8B] uppercase">{{ valueNetwork.suppliers.partnershipStrength }}</strong>
              </div>
              <div class="bg-gray-900 p-4 border border-white/5 relative overflow-hidden">
                <div class="absolute inset-0 dotted-pattern opacity-[0.2] pointer-events-none"></div>
                <p class="text-[10px] font-mono font-bold text-white uppercase tracking-tight leading-relaxed">{{ valueNetwork.suppliers.insight }}</p>
              </div>
            </div>
          </div>

          <!-- Partners -->
          <div class="bg-gray-50 border border-gray-100 p-8 relative group/partner hover:bg-white hover:border-[#3D2F88]/30 transition-all shadow-sm overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-[#3D2F88]/20"></div>
            <h4 class="text-base font-black font-outfit text-gray-900 uppercase tracking-tight mb-8 flex items-center gap-4">
              <i class="fas fa-handshake text-[#3D2F88]"></i>
              STRATEGIC_PARTNERS
            </h4>
            <div class="space-y-6">
              <div class="flex justify-between items-end border-b border-gray-100 pb-2">
                <span class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">COLLAB_SCORE</span>
                <strong class="text-lg font-black font-mono text-[#3D2F88]">{{ valueNetwork.partners.collaboration }}.0</strong>
              </div>
              <div class="flex justify-between items-end border-b border-gray-100 pb-2">
                <span class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">CO_CREATION_VAL</span>
                <strong class="text-lg font-black font-mono text-[#3D2F88]">{{ valueNetwork.partners.valueCoCreation }}%</strong>
              </div>
              <div class="flex justify-between items-end border-b border-gray-100 pb-2">
                <span class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">NETWORK_EFFECTS</span>
                <strong class="text-lg font-black font-mono text-[#3D2F88] uppercase">{{ valueNetwork.partners.networkEffects }}</strong>
              </div>
              <div class="bg-gray-900 p-4 border border-white/5 relative overflow-hidden">
                <div class="absolute inset-0 dotted-pattern opacity-[0.2] pointer-events-none"></div>
                <p class="text-[10px] font-mono font-bold text-white uppercase tracking-tight leading-relaxed">{{ valueNetwork.partners.insight }}</p>
              </div>
            </div>
          </div>

          <!-- Customers -->
          <div class="bg-gray-50 border border-gray-100 p-8 relative group/customer hover:bg-white hover:border-[#2F2E8B]/30 transition-all shadow-sm overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-[#2F2E8B]/20"></div>
            <h4 class="text-base font-black font-outfit text-gray-900 uppercase tracking-tight mb-8 flex items-center gap-4">
              <i class="fas fa-users text-[#2F2E8B]"></i>
              CUSTOMER_NETWORK
            </h4>
            <div class="space-y-6">
              <div class="flex justify-between items-end border-b border-gray-100 pb-2">
                <span class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">LOYALTY_SCORE</span>
                <strong class="text-lg font-black font-mono text-[#2F2E8B]">{{ valueNetwork.customers.loyalty }}.0</strong>
              </div>
              <div class="flex justify-between items-end border-b border-gray-100 pb-2">
                <span class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">LIFETIME_VAL</span>
                <strong class="text-lg font-black font-mono text-[#2F2E8B]">K{{ valueNetwork.customers.lifetimeValue }}</strong>
              </div>
              <div class="flex justify-between items-end border-b border-gray-100 pb-2">
                <span class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">REFERRAL_RATE</span>
                <strong class="text-lg font-black font-mono text-[#2F2E8B]">{{ valueNetwork.customers.referralRate }}%</strong>
              </div>
              <div class="bg-gray-900 p-4 border border-white/5 relative overflow-hidden">
                <div class="absolute inset-0 dotted-pattern opacity-[0.2] pointer-events-none"></div>
                <p class="text-[10px] font-mono font-bold text-white uppercase tracking-tight leading-relaxed">{{ valueNetwork.customers.insight }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Network Recommendation -->
        <div class="mt-8 bg-gray-900 p-6 border border-white/5 relative overflow-hidden">
          <div class="absolute inset-0 dotted-pattern opacity-[0.1] pointer-events-none"></div>
          <div class="flex items-start gap-6 relative z-10">
            <i class="fas fa-lightbulb text-white text-xl mt-1"></i>
            <div>
              <p class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest mb-1">NETWORK_STRATEGY_PROTOCOL</p>
              <p class="text-[11px] font-mono font-bold text-white uppercase tracking-tight leading-relaxed">{{ valueNetwork.recommendation }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Resources & Capabilities Matrix -->
      <div class="bg-white border border-gray-200 p-8 shadow-sm relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors mb-8 text-gray-900">
        <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
        <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">MODEL_RESOURCES // CAPABILITY_STRETCH</div>
        
        <!-- Loading Overlay -->
        <div v-if="isLoadingAnalysis" class="absolute inset-0 bg-white/80 backdrop-blur-sm z-30 flex items-center justify-center">
          <div class="text-center">
            <div class="relative w-16 h-16 mx-auto mb-4">
              <div class="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
              <div class="absolute inset-0 border-4 border-t-[#2F2E8B] rounded-full animate-spin"></div>
            </div>
            <p class="text-[10px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest">ENUMERATING_SYSTEM_RESOURCES...</p>
          </div>
        </div>
        
        <div class="flex items-center justify-between mb-10">
          <h3 class="text-2xl font-black font-outfit text-gray-900 uppercase tracking-tight flex items-center gap-3">
            <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
            Resources & Capabilities
          </h3>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Tangible Resources -->
          <div>
            <div class="flex items-center gap-4 mb-8">
              <div class="px-4 py-2 bg-gray-900 text-white text-[10px] font-mono font-black uppercase tracking-widest flex items-center gap-3">
                <i class="fas fa-cube"></i> TANGIBLE_NODES
              </div>
              <div class="flex-1 h-[1px] bg-gray-200"></div>
            </div>
            <div class="space-y-4">
              <div 
                v-for="resource in resources.tangible" 
                :key="resource.id"
                class="bg-gray-50 border border-gray-100 p-6 relative group/resource hover:bg-white hover:border-[#2F2E8B]/30 transition-all shadow-sm"
              >
                <div class="flex justify-between items-start mb-6">
                  <div>
                    <h5 class="text-base font-black font-outfit text-gray-900 uppercase tracking-tight mb-1">{{ resource.name }}</h5>
                    <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-tight leading-relaxed">{{ resource.description }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mb-1">SCORE</p>
                    <span class="text-2xl font-black font-mono text-[#2F2E8B]">{{ resource.score }}.0</span>
                  </div>
                </div>
                <!-- Resource Vector -->
                <div class="flex items-center gap-2">
                  <div class="flex-1 h-1 bg-gray-100 overflow-hidden relative">
                    <div class="absolute top-0 left-0 h-full bg-[#2F2E8B] transition-all duration-1000" :style="{ width: `${resource.score * 10}%` }"></div>
                  </div>
                  <span class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">V_{{ resource.score * 10 }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Intangible Resources -->
          <div>
            <div class="flex items-center gap-4 mb-8">
              <div class="px-4 py-2 bg-gray-100 border border-gray-200 text-gray-400 text-[10px] font-mono font-black uppercase tracking-widest flex items-center gap-3">
                <i class="fas fa-brain"></i> INTANGIBLE_NODES
              </div>
              <div class="flex-1 h-[1px] bg-gray-200"></div>
            </div>
            <div class="space-y-4">
              <div 
                v-for="resource in resources.intangible" 
                :key="resource.id"
                class="bg-gray-50 border border-gray-100 p-6 relative group/resource hover:bg-white hover:border-[#3D2F88]/30 transition-all shadow-sm"
              >
                <div class="flex justify-between items-start mb-6">
                  <div>
                    <h5 class="text-base font-black font-outfit text-gray-900 uppercase tracking-tight mb-1">{{ resource.name }}</h5>
                    <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-tight leading-relaxed">{{ resource.description }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mb-1">SCORE</p>
                    <span class="text-2xl font-black font-mono text-[#3D2F88]">{{ resource.score }}.0</span>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <div class="flex-1 h-1 bg-gray-100 overflow-hidden relative">
                    <div class="absolute top-0 left-0 h-full bg-[#3D2F88] transition-all duration-1000" :style="{ width: `${resource.score * 10}%` }"></div>
                  </div>
                  <span class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">V_{{ resource.score * 10 }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- AI Internal Analysis Agent Modal -->
    <div 
      v-if="showAgentModal" 
      class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8"
      @click.self="showAgentModal = false"
    >
      <div class="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
        <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
        
        <!-- Modal Header -->
        <div class="sticky top-0 bg-gray-900 text-white p-8 border-b border-white/10 z-20">
          <div class="absolute inset-0 dotted-pattern opacity-[0.1] pointer-events-none"></div>
          <div class="flex items-center justify-between relative z-10">
            <div>
              <div class="text-[10px] font-mono font-black text-[#2F2E8B] uppercase tracking-[0.2em] mb-2">SYSTEM_DIAGNOSTIC_V01</div>
              <h2 class="text-3xl font-black font-outfit uppercase tracking-tight flex items-center gap-4">
                <i class="fas fa-brain text-[#2F2E8B]"></i>
                Internal Analysis Engine
              </h2>
            </div>
            <button 
              @click="showAgentModal = false"
              class="w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors group"
            >
              <i class="fas fa-times text-white group-hover:rotate-90 transition-transform"></i>
            </button>
          </div>
        </div>

        <!-- Modal Content -->
        <div class="p-8 space-y-12 relative z-10 text-gray-900">
          <!-- Analysis Depth -->
          <div>
            <div class="flex items-center gap-4 mb-6">
              <div class="px-4 py-2 bg-gray-900 text-white text-[10px] font-mono font-black uppercase tracking-widest">1.0_ANALYSIS_DEPTH</div>
              <div class="flex-1 h-[1px] bg-gray-100"></div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button
                v-for="option in analysisDepthOptions"
                :key="option.value"
                @click="agentConfig.analysis_depth = option.value"
                :class="[
                  'p-6 border-2 font-mono font-black text-[10px] uppercase tracking-widest transition-all text-left relative overflow-hidden group/opt',
                  agentConfig.analysis_depth === option.value
                    ? 'border-gray-900 bg-gray-900 text-white'
                    : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200'
                ]"
              >
                <div class="relative z-10">{{ option.label }}</div>
                <div v-if="agentConfig.analysis_depth === option.value" class="absolute inset-0 dotted-pattern opacity-[0.2]"></div>
              </button>
            </div>
          </div>

          <!-- Focus Areas -->
          <div>
            <div class="flex items-center gap-4 mb-6">
              <div class="px-4 py-2 bg-gray-900 text-white text-[10px] font-mono font-black uppercase tracking-widest">2.0_FOCUS_AREAS</div>
              <div class="flex-1 h-[1px] bg-gray-100"></div>
              <span class="text-[10px] font-mono font-black text-[#2F2E8B] uppercase">({{ agentConfig.focus_areas.length }}_SELECTED)</span>
            </div>
            <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <label
                v-for="area in focusAreaOptions"
                :key="area.value"
                class="flex items-start gap-4 p-5 border cursor-pointer transition-all hover:bg-gray-50 relative group/focus"
                :class="[
                  agentConfig.focus_areas.includes(area.value)
                    ? 'border-gray-900 bg-[#2F2E8B]/[0.02]'
                    : 'border-gray-100 bg-white'
                ]"
              >
                <div class="relative w-5 h-5 mt-1 shrink-0">
                  <input
                    type="checkbox"
                    :checked="agentConfig.focus_areas.includes(area.value)"
                    @change="toggleFocusArea(area.value)"
                    class="peer appearance-none w-full h-full border border-gray-200 checked:bg-gray-900 checked:border-gray-900 transition-all cursor-pointer"
                  />
                  <i v-if="agentConfig.focus_areas.includes(area.value)" class="fas fa-check absolute inset-0 flex items-center justify-center text-[10px] text-white pointer-events-none"></i>
                </div>
                <span class="text-[10px] font-mono font-black uppercase tracking-tight" :class="agentConfig.focus_areas.includes(area.value) ? 'text-gray-900' : 'text-gray-400'">{{ area.label }}</span>
              </label>
            </div>
          </div>

          <!-- Time Period -->
          <div>
            <div class="flex items-center gap-4 mb-6">
              <div class="px-4 py-2 bg-gray-900 text-white text-[10px] font-mono font-black uppercase tracking-widest">3.0_TIME_PERIOD</div>
              <div class="flex-1 h-[1px] bg-gray-100"></div>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
              <button
                v-for="period in timePeriodOptions"
                :key="period.value"
                @click="agentConfig.time_period = period.value"
                :class="[
                  'p-4 border font-mono font-black text-[10px] uppercase tracking-widest transition-all text-center',
                  agentConfig.time_period === period.value
                    ? 'border-gray-900 bg-gray-900 text-white shadow-xl shadow-gray-200'
                    : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200'
                ]"
              >
                {{ period.label }}
              </button>
            </div>
          </div>

          <!-- Info Box -->
          <div class="bg-gray-50 border border-gray-200 p-8 relative overflow-hidden">
            <div class="absolute inset-x-0 top-0 h-1 bg-[#2F2E8B]"></div>
            <div class="flex gap-8 relative z-10">
              <div class="w-12 h-12 bg-white flex items-center justify-center border border-gray-100 shrink-0">
                <i class="fas fa-terminal text-[#2F2E8B]"></i>
              </div>
              <div class="flex-1">
                <p class="text-[10px] font-mono font-black text-gray-900 uppercase tracking-widest mb-4">DIAGNOSTIC_EXECUTION_STEPS:</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div v-for="step in [
                    'Analyze performance vectors',
                    'Review KPI node congruence',
                    'Execute VRIO capability scan',
                    'Map value chain harmonics',
                    'Audit resource stratification',
                    'Calculate efficiency delta'
                  ]" :key="step" class="flex items-center gap-3">
                    <div class="w-1 h-1 bg-[#2F2E8B]"></div>
                    <span class="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">{{ step }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="sticky bottom-0 bg-gray-50 p-8 border-t border-gray-200 z-20 flex justify-end gap-6">
            <button
              @click="showAgentModal = false"
              class="px-8 py-4 border border-gray-200 text-gray-400 text-[10px] font-mono font-black uppercase tracking-widest hover:bg-white hover:text-gray-900 transition-all"
            >
              ABORT_OPERATION
            </button>
            <button
              @click="triggerInternalAnalysisAgent"
              :disabled="isTriggeringAgent || agentConfig.focus_areas.length === 0"
              :class="[
                'px-12 py-4 text-[10px] font-mono font-black uppercase tracking-widest transition-all flex items-center gap-4',
                isTriggeringAgent || agentConfig.focus_areas.length === 0
                  ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                  : 'bg-gray-900 text-white hover:bg-[#2F2E8B] shadow-2xl shadow-gray-300'
              ]"
            >
              <i :class="['fas', isTriggeringAgent ? 'fa-spinner fa-spin' : 'fa-rocket']"></i>
              {{ isTriggeringAgent ? 'EXECUTING_ANALYSIS...' : 'START_DIAGNOSTIC' }}
            </button>
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
const lastUpdated = ref('3 min ago')

// Tenant context removed
const tenantId = ref('default')

// Loading states
const isLoadingAnalysis = ref(false)
const isRefreshing = ref(false)
const isTriggeringAgent = ref(false)

// Internal Analysis Agent Modal
const showAgentModal = ref(false)
const agentConfig = ref({
  analysis_depth: 'comprehensive',
  focus_areas: [],
  time_period: 12
})

const analysisDepthOptions = [
  { value: 'quick', label: 'Quick Overview' },
  { value: 'standard', label: 'Standard Analysis' },
  { value: 'comprehensive', label: 'Comprehensive Analysis' },
  { value: 'deep_dive', label: 'Deep Dive' }
]

const focusAreaOptions = [
  { value: 'sales_performance', label: 'Sales Performance' },
  { value: 'expense_analysis', label: 'Expense Analysis' },
  { value: 'kpi_review', label: 'KPI Performance Review' },
  { value: 'vrio_assessment', label: 'VRIO Capability Assessment' },
  { value: 'value_chain', label: 'Value Chain Analysis' },
  { value: 'resource_audit', label: 'Resource Audit' },
  { value: 'efficiency_metrics', label: 'Efficiency Metrics' },
  { value: 'competitive_position', label: 'Competitive Position' },
  { value: 'cost_structure', label: 'Cost Structure Analysis' },
  { value: 'profitability', label: 'Profitability Analysis' },
  { value: 'operational_excellence', label: 'Operational Excellence' },
  { value: 'innovation_capacity', label: 'Innovation Capacity' }
]

const timePeriodOptions = [
  { value: 3, label: 'Last 3 Months' },
  { value: 6, label: 'Last 6 Months' },
  { value: 12, label: 'Last 12 Months' },
  { value: 24, label: 'Last 24 Months' },
  { value: 36, label: 'Last 36 Months' }
]

const toggleFocusArea = (area) => {
  const index = agentConfig.value.focus_areas.indexOf(area)
  if (index > -1) {
    agentConfig.value.focus_areas.splice(index, 1)
  } else {
    agentConfig.value.focus_areas.push(area)
  }
}

const triggerInternalAnalysisAgent = async () => {
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
      analysis_depth: agentConfig.value.analysis_depth,
      focus_areas: agentConfig.value.focus_areas,
      time_period: agentConfig.value.time_period
    }
    
    const response = await axios.post(
      `${API_BASE_URL}/internal-analysis-agent/trigger`,
      payload
    )
    
    console.log('Internal analysis agent triggered:', response.data)
    
    // Close modal
    showAgentModal.value = false
    
    // Refresh data to get new analysis
    await fetchInternalAnalysis()
    
    alert('Internal analysis agent triggered successfully! Analysis complete.')
  } catch (error) {
    console.error('Failed to trigger internal analysis agent:', error)
    alert('Failed to trigger agent: ' + (error.response?.data?.detail || error.message))
  } finally {
    isTriggeringAgent.value = false
  }
}

// Navigation
const activeTab = ref('internal')

// Competitive Advantage Index
const competitiveAdvantageIndex = ref(0)
const advantageLevel = computed(() => {
  if (competitiveAdvantageIndex.value >= 0.75) return 'Strong'
  if (competitiveAdvantageIndex.value >= 0.60) return 'Moderate'
  return 'Weak'
})

// VRIO Framework Data
const vrioCapabilities = ref([])
const vrioRecommendation = ref('')
const executiveSummary = ref('')

// Value Chain Data
const valueChain = ref({
  primary: [],
  support: []
})

// Isolating Mechanisms
const isolatingMechanisms = ref([])

// Value Network
const valueNetwork = ref({
  suppliers: {},
  partners: {},
  customers: {},
  recommendation: ''
})

// Resources
const resources = ref({
  tangible: [],
  intangible: []
})

// Fetch internal analysis from backend
const fetchInternalAnalysis = async () => {
  if (!tenantId.value) {
    console.warn('No tenant ID found')
    return
  }
  
  isLoadingAnalysis.value = true
  
  try {
    const response = await axios.get(`${API_BASE_URL}/strategy/internal-analysis/analysis`, {
      params: { tenant_id: tenantId.value }
    })
    
    const data = response.data
    
    // Update Competitive Advantage
    if (data.competitive_advantage) {
      competitiveAdvantageIndex.value = data.competitive_advantage.index
    }
    
    // Update VRIO Capabilities
    if (data.vrio_capabilities) {
      vrioCapabilities.value = data.vrio_capabilities.map(cap => ({
        id: cap.id,
        name: cap.name,
        description: cap.description,
        icon: cap.icon,
        valuable: cap.valuable,
        rare: cap.rare,
        inimitable: cap.inimitable,
        organized: cap.organized,
        vrioScore: cap.vrio_score,
        implication: cap.implication,
        impact: cap.impact,
        imitationRisk: cap.imitation_risk
      }))
    }
    
    // Update VRIO Recommendation
    if (data.vrio_recommendation) {
      vrioRecommendation.value = data.vrio_recommendation
    }

    // Update Executive Summary
    if (data.executive_summary) {
      executiveSummary.value = data.executive_summary
    }
    
    // Update Value Chain
    if (data.value_chain) {
      valueChain.value = {
        primary: data.value_chain.primary.map(activity => ({
          id: activity.id,
          name: activity.name,
          icon: activity.icon,
          valueScore: activity.value_score,
          insight: activity.insight,
          advantage: activity.advantage
        })),
        support: data.value_chain.support.map(activity => ({
          id: activity.id,
          name: activity.name,
          icon: activity.icon,
          valueScore: activity.value_score,
          insight: activity.insight
        }))
      }
    }
    
    // Update Isolating Mechanisms
    if (data.isolating_mechanisms) {
      isolatingMechanisms.value = data.isolating_mechanisms.map(mech => ({
        id: mech.id,
        name: mech.name,
        type: mech.type,
        icon: mech.icon,
        strength: mech.strength,
        description: mech.description,
        durability: mech.durability,
        imitationCost: mech.imitation_cost,
        evidence: mech.evidence
      }))
    }
    
    // Update Value Network
    if (data.value_network) {
      valueNetwork.value = {
        suppliers: {
          reliability: data.value_network.suppliers.reliability,
          costEfficiency: data.value_network.suppliers.cost_efficiency,
          partnershipStrength: data.value_network.suppliers.partnership_strength,
          insight: data.value_network.suppliers.insight
        },
        partners: {
          collaboration: data.value_network.partners.collaboration,
          valueCoCreation: data.value_network.partners.value_co_creation,
          networkEffects: data.value_network.partners.network_effects,
          insight: data.value_network.partners.insight
        },
        customers: {
          loyalty: data.value_network.customers.loyalty,
          lifetimeValue: data.value_network.customers.lifetime_value,
          referralRate: data.value_network.customers.referral_rate,
          insight: data.value_network.customers.insight
        },
        recommendation: data.value_network.recommendation
      }
    }
    
    // Update Resources
    if (data.resources) {
      resources.value = {
        tangible: data.resources.tangible || [],
        intangible: data.resources.intangible || []
      }
    }
    
    // Update timestamp
    lastUpdated.value = 'Just now'
    
    console.log('Internal analysis fetched:', data)
  } catch (error) {
    console.error('Error fetching internal analysis:', error)
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
    await axios.post(`${API_BASE_URL}/strategy/internal-analysis/refresh`, null, {
      params: { tenant_id: tenantId.value }
    })
    
    // Fetch updated data
    await fetchInternalAnalysis()
    
    alert('Internal analysis refreshed successfully!')
  } catch (error) {
    console.error('Failed to refresh analysis:', error)
    alert('Failed to refresh analysis: ' + (error.response?.data?.detail || error.message))
  } finally {
    isRefreshing.value = false
  }
}

onMounted(async () => {
  // Fetch internal analysis data from backend
  await fetchInternalAnalysis()
})
</script>

<style scoped>
/* Add any custom styles here */
</style>
