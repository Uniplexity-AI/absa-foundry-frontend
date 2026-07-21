<template>
  <div class="environmental-subpage min-h-screen bg-[#F5F5F5] font-sans relative text-gray-900 overflow-x-hidden">
    <!-- Viewport Mesh Background (Fixed) -->
    <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <!-- Gradient Radial Accents -->
      <div class="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-[#2F2E8B]/[0.03] blur-[120px] rounded-full"></div>
      <div class="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-[#3D2F88]/[0.02] blur-[150px] rounded-full"></div>
      
      <!-- Subtle Grid Pattern -->
      <div class="absolute inset-0 opacity-[0.015]" 
           style="background-image: radial-gradient(#2F2E8B 0.5px, transparent 0.5px); background-size: 24px 24px;">
      </div>
    </div>

    <div class="max-w-[1600px] mx-auto p-6 md:p-8 relative z-10">
      
      <!-- Technical Header -->
      <div class="bg-white border border-gray-200 p-8 shadow-sm relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors mb-8">
        <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
        <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SYSTEM_MODULE // ENVIRONMENTAL_SCAN</div>
        
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
          <div class="flex gap-6 items-start">
            <div class="w-16 h-16 bg-[#2F2E8B] text-white flex items-center justify-center text-3xl shadow-xl relative overflow-hidden shrink-0">
              <div class="absolute inset-0 dotted-pattern opacity-[0.2] pointer-events-none"></div>
              <i class="fas fa-globe-americas"></i>
            </div>
            <div>
              <div class="flex items-center gap-3 mb-2">
                <h1 class="text-3xl font-black font-outfit text-gray-900 uppercase tracking-tight">AI Environmental Analysis</h1>
                <div class="px-2 py-0.5 bg-emerald-600 text-white text-[8px] font-mono font-black uppercase tracking-widest">LIVE_FEED_SYNC</div>
              </div>
              <p class="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">DYNAMIC MACRO, INDUSTRY & REGULATORY INTELLIGENCE</p>
              <div class="flex flex-wrap gap-6">
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 bg-[#2F2E8B]"></span>
                  <span class="text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest">SATELLITE_LINK: <span class="text-emerald-600">ACTIVE</span></span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 bg-[#2F2E8B]"></span>
                  <span class="text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest">CORRELATION_VECTORS: <span class="text-emerald-600">OPTIMIZED</span></span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 bg-[#2F2E8B]"></span>
                  <span class="text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest">LAST_SYNC: <span class="text-gray-900">{{ lastUpdated }}</span></span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="flex flex-wrap gap-3 w-full lg:w-auto">
            <div class="bg-gray-50 border border-gray-100 flex items-center px-4 py-2 group/select hover:border-[#2F2E8B]/30 transition-colors">
              <span class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mr-3">GEO_CLUSTER:</span>
              <select 
                v-model="selectedRegion"
                class="bg-transparent text-[10px] font-mono font-black text-gray-900 uppercase outline-none cursor-pointer"
              >
                <option value="all">ALL_REGIONS</option>
                <option value="lusaka">LUSAKA_CORE</option>
                <option value="copperbelt">COPPERBELT_CLUSTER</option>
                <option value="southern">SOUTHERN_NODE</option>
              </select>
            </div>

            <button 
              @click="refreshAnalysis"
              :disabled="isRefreshing || isLoadingAnalysis"
              class="px-6 py-3 bg-[#2F2E8B] text-white text-[10px] font-mono font-black uppercase tracking-widest flex items-center gap-3 transition-all hover:bg-[#3D2F88] disabled:opacity-50"
            >
              <i :class="isRefreshing || isLoadingAnalysis ? 'fas fa-spinner fa-spin' : 'fas fa-sync-alt'"></i>
              {{ isRefreshing ? 'REFRESHING_ANALYSIS...' : 'RE-SYNC_ENVIRONMENT' }}
            </button>

            <button 
              @click="showIntelligenceModal = true"
              class="px-6 py-3 bg-gray-900 text-white text-[10px] font-mono font-black uppercase tracking-widest flex items-center gap-3 transition-all hover:bg-black shadow-xl"
            >
              <i class="fas fa-brain"></i>
              AI_INTELLIGENCE_LAYER
            </button>

            <button 
              class="w-12 h-12 bg-white border border-gray-100 flex items-center justify-center text-gray-900 hover:border-gray-900 transition-all"
            >
              <i class="fas fa-download"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Strategic Navigation -->
      <StrategicNavigation active-tab="environmental" />

      <!-- AI Executive Summary Banner (New) -->
      <div v-if="executiveSummary" class="bg-gray-900 border border-gray-800 p-8 mb-8 relative overflow-hidden group shadow-2xl">
        <div class="absolute inset-0 dotted-pattern opacity-[0.1] pointer-events-none"></div>
        <div class="absolute top-0 right-0 bg-gray-800 border-b border-l border-gray-700 px-3 py-1 text-[9px] font-mono font-black text-white/40 uppercase tracking-widest z-20">INTELLIGENCE_LAYER // EXECUTIVE_SUMMARY</div>
        
        <div class="flex items-start gap-8 relative z-10">
          <div class="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center text-2xl text-[#2F2E8B] shrink-0">
            <i class="fas fa-brain"></i>
          </div>
          <div>
            <h3 class="text-xl font-black font-outfit text-white uppercase tracking-tight mb-4 flex items-center gap-3">
              Strategic Intelligence Briefing
              <span class="px-2 py-0.5 bg-[#2F2E8B] text-white text-[8px] font-mono font-black uppercase tracking-widest">AI_GENERATED</span>
            </h3>
            <div class="text-[12px] font-mono font-medium text-white/80 uppercase tracking-tight leading-relaxed whitespace-pre-line border-l-2 border-[#2F2E8B] pl-6 py-2 bg-white/5">
              {{ executiveSummary }}
            </div>
            <div class="mt-6 flex items-center gap-6">
              <span class="text-[8px] font-mono font-black text-white/30 uppercase tracking-widest">SOURCE: WEB_INTELLIGENCE_AGENT</span>
              <span class="text-[8px] font-mono font-black text-white/30 uppercase tracking-widest">CONFIDENCE: 92.4%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Strategic Alert Banner -->
      <div v-if="criticalAlert" class="bg-red-600 p-6 mb-8 relative overflow-hidden shadow-2xl">
        <div class="absolute inset-0 dotted-pattern opacity-[0.1] pointer-events-none"></div>
        <div class="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div class="flex items-center gap-6">
            <div class="w-16 h-16 bg-white/10 flex items-center justify-center text-2xl text-white">
              <i class="fas fa-exclamation-triangle"></i>
            </div>
            <div>
              <div class="flex items-center gap-3 mb-1">
                <h3 class="text-lg font-black font-outfit text-white uppercase tracking-tight">Environmental Anomaly Detected</h3>
                <span class="px-2 py-0.5 bg-white text-red-600 text-[8px] font-mono font-black uppercase tracking-widest">CRITICAL_RISK</span>
              </div>
              <p class="text-[11px] font-mono font-bold text-white/80 uppercase tracking-tight">{{ criticalAlert.message }}</p>
            </div>
          </div>
          <div class="flex gap-3 shrink-0">
            <button class="px-6 py-3 bg-white text-red-600 text-[10px] font-mono font-black uppercase tracking-widest hover:bg-gray-100 transition-all">
              ANALYZE_VECTORS
            </button>
            <button @click="criticalAlert = null" class="w-12 h-12 bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- PESTEL Analysis Dashboard -->
      <div class="bg-white border border-gray-200 p-8 shadow-sm relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors mb-8">
        <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
        <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">DATA_STRUCTURE // PESTEL_SCAN</div>
        
        <div v-if="isLoadingAnalysis" class="absolute inset-0 bg-white/90 backdrop-blur-md z-[30] flex items-center justify-center">
          <div class="text-center">
            <div class="w-12 h-12 border-2 border-[#2F2E8B] border-t-transparent animate-spin mb-4 mx-auto"></div>
            <p class="text-[10px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest">SCANNING_ENVIRONMENTAL_VECTORS...</p>
          </div>
        </div>
        
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 relative z-10">
          <h3 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight flex items-center gap-3">
            <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
            PESTEL Environmental Scan
          </h3>
          <div class="flex items-center gap-2">
            <span class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mr-3">ENGINE_STATUS:</span>
            <span class="px-3 py-1 bg-emerald-600 text-white text-[10px] font-mono font-black uppercase tracking-widest">LIVE_REALTIME</span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          <!-- Political -->
          <div class="bg-gray-50/50 border border-gray-100 p-8 hover:bg-white transition-all relative group/pestel">
            <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
            <div class="flex items-center justify-between mb-8">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-[#2F2E8B] text-white flex items-center justify-center text-xl shadow-xl">
                  <i class="fas fa-landmark"></i>
                </div>
                <div>
                  <h4 class="text-sm font-black font-outfit text-gray-900 uppercase tracking-tight">Political</h4>
                  <p class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mt-1">FRAMEWORK_STABILITY</p>
                </div>
              </div>
              <span :class="[
                'px-2 py-1 text-[9px] font-mono font-black uppercase tracking-widest border',
                pestelData.political.risk === 'low' ? 'border-emerald-600 text-emerald-600 bg-emerald-50' :
                pestelData.political.risk === 'medium' ? 'border-amber-600 text-amber-600 bg-amber-50' :
                'border-red-600 text-red-600 bg-red-50'
              ]">
                RISK: {{ (pestelData.political.risk || '').toUpperCase() }}
              </span>
            </div>
            
            <div class="space-y-6">
              <div class="flex justify-between items-center bg-white border border-gray-100 p-4 relative overflow-hidden">
                <span class="text-[8px] font-mono font-black text-gray-400 uppercase">STABILITY_INDEX</span>
                <span class="text-[11px] font-mono font-black text-[#2F2E8B] tracking-widest">{{ pestelData.political.stability }}/10.0</span>
              </div>
              
              <div class="bg-gray-900 p-4 relative overflow-hidden shadow-xl group-hover/pestel:scale-[1.02] transition-transform">
                <div class="absolute inset-0 dotted-pattern opacity-[0.1] pointer-events-none"></div>
                <p class="text-[8px] font-mono font-black text-white/50 uppercase mb-2">INTELLIGENCE_INSIGHT:</p>
                <p class="text-[10px] font-mono font-bold text-white uppercase tracking-tight leading-relaxed">{{ pestelData.political.insight }}</p>
              </div>

              <div class="space-y-4 pt-6 border-t border-gray-100">
                <p class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mb-1">KEY_VECTORS:</p>
                <ul class="space-y-3">
                  <li v-for="factor in pestelData.political.factors" :key="factor" class="flex items-start gap-3 group/item">
                    <div class="w-1.5 h-1.5 bg-[#2F2E8B] mt-1 shrink-0 transition-transform group-hover/item:scale-125"></div>
                    <span class="text-[9px] font-mono font-bold text-gray-600 uppercase tracking-tight leading-relaxed">{{ factor }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Economic -->
          <div class="bg-gray-50/50 border border-gray-100 p-8 hover:bg-white transition-all relative group/pestel">
            <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
            <div class="flex items-center justify-between mb-8">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-[#3D2F88] text-white flex items-center justify-center text-xl shadow-xl">
                  <i class="fas fa-chart-line"></i>
                </div>
                <div>
                  <h4 class="text-sm font-black font-outfit text-gray-900 uppercase tracking-tight">Economic</h4>
                  <p class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mt-1">MACRO_INDICATORS</p>
                </div>
              </div>
              <span :class="[
                'px-2 py-1 text-[9px] font-mono font-black uppercase tracking-widest border',
                pestelData.economic.outlook === 'positive' ? 'border-emerald-600 text-emerald-600 bg-emerald-50' :
                pestelData.economic.outlook === 'neutral' ? 'border-amber-600 text-amber-600 bg-amber-50' :
                'border-red-600 text-red-600 bg-red-50'
              ]">
                OUTLOOK: {{ (pestelData.economic.outlook || '').toUpperCase() }}
              </span>
            </div>
            
            <div class="space-y-6">
              <div class="flex justify-between items-center bg-white border border-gray-100 p-4 relative overflow-hidden">
                <span class="text-[8px] font-mono font-black text-gray-400 uppercase">GROWTH_FORECAST</span>
                <span class="text-[11px] font-mono font-black text-[#3D2F88] tracking-widest">{{ pestelData.economic.growth }}%</span>
              </div>
              
              <div class="bg-gray-900 p-4 relative overflow-hidden shadow-xl group-hover/pestel:scale-[1.02] transition-transform">
                <div class="absolute inset-0 dotted-pattern opacity-[0.1] pointer-events-none"></div>
                <p class="text-[8px] font-mono font-black text-white/50 uppercase mb-2">INTELLIGENCE_INSIGHT:</p>
                <p class="text-[10px] font-mono font-bold text-white uppercase tracking-tight leading-relaxed">{{ pestelData.economic.insight }}</p>
              </div>

              <div class="space-y-4 pt-6 border-t border-gray-100">
                <p class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mb-1">MACRO_STRINGS:</p>
                <ul class="space-y-3">
                  <li v-for="indicator in pestelData.economic.indicators" :key="indicator" class="flex items-start gap-3 group/item">
                    <div class="w-1.5 h-1.5 bg-[#3D2F88] mt-1 shrink-0 transition-transform group-hover/item:scale-125"></div>
                    <span class="text-[9px] font-mono font-bold text-gray-600 uppercase tracking-tight leading-relaxed">{{ indicator }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Social -->
          <div class="bg-gray-50/50 border border-gray-100 p-8 hover:bg-white transition-all relative group/pestel">
            <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
            <div class="flex items-center justify-between mb-8">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-[#2F2E8B] text-white flex items-center justify-center text-xl shadow-xl">
                  <i class="fas fa-users"></i>
                </div>
                <div>
                  <h4 class="text-sm font-black font-outfit text-gray-900 uppercase tracking-tight">Social</h4>
                  <p class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mt-1">DEMOGRAPHIC_VECTORS</p>
                </div>
              </div>
              <span class="px-2 py-1 text-[9px] font-mono font-black uppercase tracking-widest border border-blue-600 text-blue-600 bg-blue-50">
                SENTIMENT: {{ (pestelData.social.sentiment || '').toUpperCase() }}
              </span>
            </div>
            
            <div class="space-y-6">
              <div class="flex justify-between items-center bg-white border border-gray-100 p-4 relative overflow-hidden">
                <span class="text-[8px] font-mono font-black text-gray-400 uppercase">SENTIMENT_SCORE</span>
                <span class="text-[11px] font-mono font-black text-[#2F2E8B] tracking-widest">{{ pestelData.social.score }}/100</span>
              </div>
              
              <div class="bg-gray-900 p-4 relative overflow-hidden shadow-xl group-hover/pestel:scale-[1.02] transition-transform">
                <div class="absolute inset-0 dotted-pattern opacity-[0.1] pointer-events-none"></div>
                <p class="text-[8px] font-mono font-black text-white/50 uppercase mb-2">INTELLIGENCE_INSIGHT:</p>
                <p class="text-[10px] font-mono font-bold text-white uppercase tracking-tight leading-relaxed">{{ pestelData.social.insight }}</p>
              </div>

              <div class="space-y-4 pt-6 border-t border-gray-100">
                <p class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mb-1">CULTURAL_VECTORS:</p>
                <ul class="space-y-3">
                  <li v-for="trend in pestelData.social.trends" :key="trend" class="flex items-start gap-3 group/item">
                    <div class="w-1.5 h-1.5 bg-[#2F2E8B] mt-1 shrink-0 transition-transform group-hover/item:scale-125"></div>
                    <span class="text-[9px] font-mono font-bold text-gray-600 uppercase tracking-tight leading-relaxed">{{ trend }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Technological -->
          <div class="bg-gray-50/50 border border-gray-100 p-8 hover:bg-white transition-all relative group/pestel">
            <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
            <div class="flex items-center justify-between mb-8">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-[#3D2F88] text-white flex items-center justify-center text-xl shadow-xl">
                  <i class="fas fa-microchip"></i>
                </div>
                <div>
                  <h4 class="text-sm font-black font-outfit text-gray-900 uppercase tracking-tight">Technological</h4>
                  <p class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mt-1">INNOVATION_INDEX</p>
                </div>
              </div>
              <span class="px-2 py-1 text-[9px] font-mono font-black uppercase tracking-widest border border-purple-600 text-purple-600 bg-purple-50">
                READINESS: {{ (pestelData.technological.readiness || '').toUpperCase() }}
              </span>
            </div>
            
            <div class="space-y-6">
              <div class="flex justify-between items-center bg-white border border-gray-100 p-4 relative overflow-hidden">
                <span class="text-[8px] font-mono font-black text-gray-400 uppercase">DIGITAL_MATURITY</span>
                <span class="text-[11px] font-mono font-black text-[#3D2F88] tracking-widest">{{ pestelData.technological.maturity }}%</span>
              </div>
              
              <div class="bg-gray-900 p-4 relative overflow-hidden shadow-xl group-hover/pestel:scale-[1.02] transition-transform">
                <div class="absolute inset-0 dotted-pattern opacity-[0.1] pointer-events-none"></div>
                <p class="text-[8px] font-mono font-black text-white/50 uppercase mb-2">INTELLIGENCE_INSIGHT:</p>
                <p class="text-[10px] font-mono font-bold text-white uppercase tracking-tight leading-relaxed">{{ pestelData.technological.insight }}</p>
              </div>

              <div class="space-y-4 pt-6 border-t border-gray-100">
                <p class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mb-1">TECH_STACK:</p>
                <ul class="space-y-3">
                  <li v-for="tech in pestelData.technological.technologies" :key="tech" class="flex items-start gap-3 group/item">
                    <div class="w-1.5 h-1.5 bg-[#3D2F88] mt-1 shrink-0 transition-transform group-hover/item:scale-125"></div>
                    <span class="text-[9px] font-mono font-bold text-gray-600 uppercase tracking-tight leading-relaxed">{{ tech }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Environmental -->
          <div class="bg-gray-50/50 border border-gray-100 p-8 hover:bg-white transition-all relative group/pestel">
            <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
            <div class="flex items-center justify-between mb-8">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-[#2F2E8B] text-white flex items-center justify-center text-xl shadow-xl">
                  <i class="fas fa-leaf"></i>
                </div>
                <div>
                  <h4 class="text-sm font-black font-outfit text-gray-900 uppercase tracking-tight">Environmental</h4>
                  <p class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mt-1">ECOLOGICAL_IMPACT</p>
                </div>
              </div>
              <span :class="[
                'px-2 py-1 text-[9px] font-mono font-black uppercase tracking-widest border',
                pestelData.environmental.impact === 'low' ? 'border-emerald-600 text-emerald-600 bg-emerald-50' :
                pestelData.environmental.impact === 'medium' ? 'border-amber-600 text-amber-600 bg-amber-50' :
                'border-red-600 text-red-600 bg-red-50'
              ]">
                IMPACT: {{ (pestelData.environmental.impact || '').toUpperCase() }}
              </span>
            </div>
            
            <div class="space-y-6">
              <div class="flex justify-between items-center bg-white border border-gray-100 p-4 relative overflow-hidden">
                <span class="text-[8px] font-mono font-black text-gray-400 uppercase">CLIMATE_RISK</span>
                <span class="text-[11px] font-mono font-black text-[#2F2E8B] tracking-widest">{{ pestelData.environmental.climateRisk }}/10.0</span>
              </div>
              
              <div class="bg-gray-900 p-4 relative overflow-hidden shadow-xl group-hover/pestel:scale-[1.02] transition-transform">
                <div class="absolute inset-0 dotted-pattern opacity-[0.1] pointer-events-none"></div>
                <p class="text-[8px] font-mono font-black text-white/50 uppercase mb-2">INTELLIGENCE_INSIGHT:</p>
                <p class="text-[10px] font-mono font-bold text-white uppercase tracking-tight leading-relaxed">{{ pestelData.environmental.insight }}</p>
              </div>

              <div class="space-y-4 pt-6 border-t border-gray-100">
                <p class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mb-1">ECOLOGICAL_FACTORS:</p>
                <ul class="space-y-3">
                  <li v-for="concern in pestelData.environmental.concerns" :key="concern" class="flex items-start gap-3 group/item">
                    <div class="w-1.5 h-1.5 bg-[#2F2E8B] mt-1 shrink-0 transition-transform group-hover/item:scale-125"></div>
                    <span class="text-[9px] font-mono font-bold text-gray-600 uppercase tracking-tight leading-relaxed">{{ concern }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Legal -->
          <div class="bg-gray-50/50 border border-gray-100 p-8 hover:bg-white transition-all relative group/pestel">
            <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
            <div class="flex items-center justify-between mb-8">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-[#3D2F88] text-white flex items-center justify-center text-xl shadow-xl">
                  <i class="fas fa-gavel"></i>
                </div>
                <div>
                  <h4 class="text-sm font-black font-outfit text-gray-900 uppercase tracking-tight">Legal</h4>
                  <p class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mt-1">REGULATORY_FRAMEWORK</p>
                </div>
              </div>
              <span :class="[
                'px-2 py-1 text-[9px] font-mono font-black uppercase tracking-widest border',
                pestelData.legal.compliance === 'high' ? 'border-emerald-600 text-emerald-600 bg-emerald-50' :
                pestelData.legal.compliance === 'medium' ? 'border-amber-600 text-amber-600 bg-amber-50' :
                'border-red-600 text-red-600 bg-red-50'
              ]">
                COMPLIANCE: {{ (pestelData.legal.compliance || '').toUpperCase() }}
              </span>
            </div>
            
            <div class="space-y-6">
              <div class="flex justify-between items-center bg-white border border-gray-100 p-4 relative overflow-hidden">
                <span class="text-[8px] font-mono font-black text-gray-400 uppercase">REGULATORY_BURDEN</span>
                <span class="text-[11px] font-mono font-black text-[#3D2F88] tracking-widest">{{ pestelData.legal.burden }}/10.0</span>
              </div>
              
              <div class="bg-gray-900 p-4 relative overflow-hidden shadow-xl group-hover/pestel:scale-[1.02] transition-transform">
                <div class="absolute inset-0 dotted-pattern opacity-[0.1] pointer-events-none"></div>
                <p class="text-[8px] font-mono font-black text-white/50 uppercase mb-2">INTELLIGENCE_INSIGHT:</p>
                <p class="text-[10px] font-mono font-bold text-white uppercase tracking-tight leading-relaxed">{{ pestelData.legal.insight }}</p>
              </div>

              <div class="space-y-4 pt-6 border-t border-gray-100">
                <p class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mb-1">REGULATORY_SHIFTS:</p>
                <ul class="space-y-3">
                  <li v-for="change in pestelData.legal.changes" :key="change" class="flex items-start gap-3 group/item">
                    <div class="w-1.5 h-1.5 bg-[#3D2F88] mt-1 shrink-0 transition-transform group-hover/item:scale-125"></div>
                    <span class="text-[9px] font-mono font-bold text-gray-600 uppercase tracking-tight leading-relaxed">{{ change }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Porter's Five Forces Analysis -->
      <div class="bg-white border border-gray-200 p-8 shadow-sm relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors mb-8">
        <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
        <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">MODEL_VECTORS // PORTER_5_FORCES</div>
        
        <div v-if="isLoadingAnalysis" class="absolute inset-0 bg-white/90 backdrop-blur-md z-[30] flex items-center justify-center">
          <div class="text-center">
            <div class="w-12 h-12 border-2 border-[#2F2E8B] border-t-transparent animate-spin mb-4 mx-auto"></div>
            <p class="text-[10px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest">CALCULATING_COMPETITIVE_FORCES...</p>
          </div>
        </div>

        <div class="flex items-center justify-between mb-12 relative z-10">
          <h3 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight flex items-center gap-3">
            <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
            Porter's Five Forces - Dynamic Analysis
          </h3>
          <span class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">
            LAST_ENGINE_CALC: <span class="text-gray-900">{{ fiveForcesUpdated }}</span>
          </span>
        </div>

        <!-- Five Forces Diagram - Redesigned Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 relative z-10">
          <!-- Supplier Power -->
          <div class="bg-gray-50/50 border border-gray-100 p-8 hover:bg-white transition-all relative group/force">
            <div class="flex items-center justify-between mb-8">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-[#2F2E8B] text-white flex items-center justify-center text-xl shadow-xl">
                  <i class="fas fa-truck"></i>
                </div>
                <h4 class="text-sm font-black font-outfit text-gray-900 uppercase tracking-tight">Supplier Power</h4>
              </div>
              <div class="text-right">
                <div class="text-2xl font-black font-mono text-[#2F2E8B]">{{ fiveForces.supplierPower.score }}/10</div>
                <div :class="[
                  'text-[9px] font-mono font-black uppercase tracking-widest',
                  fiveForces.supplierPower.trend === 'up' ? 'text-red-600' :
                  fiveForces.supplierPower.trend === 'down' ? 'text-emerald-600' :
                  'text-gray-400'
                ]">
                  {{ fiveForces.supplierPower.trend === 'up' ? '↑' : fiveForces.supplierPower.trend === 'down' ? '↓' : '→' }}
                  {{ fiveForces.supplierPower.change }}%
                </div>
              </div>
            </div>
            <div class="bg-gray-900 p-4 relative overflow-hidden shadow-xl mb-6">
              <div class="absolute inset-0 dotted-pattern opacity-[0.1] pointer-events-none"></div>
              <p class="text-[10px] font-mono font-bold text-white uppercase tracking-tight leading-relaxed">{{ fiveForces.supplierPower.insight }}</p>
            </div>
          </div>

          <!-- Competitive Rivalry -->
          <div class="bg-gray-50/50 border border-gray-100 p-8 hover:bg-white transition-all relative group/force">
            <div class="flex items-center justify-between mb-8">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-[#3D2F88] text-white flex items-center justify-center text-xl shadow-xl">
                  <i class="fas fa-fire"></i>
                </div>
                <h4 class="text-sm font-black font-outfit text-gray-900 uppercase tracking-tight">Competitive Rivalry</h4>
              </div>
              <div class="text-right">
                <div class="text-2xl font-black font-mono text-[#3D2F88]">{{ fiveForces.rivalry.score }}/10</div>
                <div :class="[
                  'text-[9px] font-mono font-black uppercase tracking-widest',
                  fiveForces.rivalry.trend === 'up' ? 'text-red-600' :
                  fiveForces.rivalry.trend === 'down' ? 'text-emerald-600' :
                  'text-gray-400'
                ]">
                  {{ fiveForces.rivalry.trend === 'up' ? '↑' : fiveForces.rivalry.trend === 'down' ? '↓' : '→' }}
                  {{ fiveForces.rivalry.change }}%
                </div>
              </div>
            </div>
            <div class="bg-gray-900 p-4 relative overflow-hidden shadow-xl mb-6">
              <div class="absolute inset-0 dotted-pattern opacity-[0.1] pointer-events-none"></div>
              <p class="text-[10px] font-mono font-bold text-white uppercase tracking-tight leading-relaxed">{{ fiveForces.rivalry.insight }}</p>
            </div>
          </div>

          <!-- Threat of Substitutes -->
          <div class="bg-gray-50/50 border border-gray-100 p-8 hover:bg-white transition-all relative group/force">
            <div class="flex items-center justify-between mb-8">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-[#2F2E8B] text-white flex items-center justify-center text-xl shadow-xl">
                  <i class="fas fa-exchange-alt"></i>
                </div>
                <h4 class="text-sm font-black font-outfit text-gray-900 uppercase tracking-tight">Threat of Substitutes</h4>
              </div>
              <div class="text-right">
                <div class="text-2xl font-black font-mono text-[#2F2E8B]">{{ fiveForces.substitutes.score }}/10</div>
                <div :class="[
                  'text-[9px] font-mono font-black uppercase tracking-widest',
                  fiveForces.substitutes.trend === 'up' ? 'text-red-600' :
                  fiveForces.substitutes.trend === 'down' ? 'text-emerald-600' :
                  'text-gray-400'
                ]">
                  {{ fiveForces.substitutes.trend === 'up' ? '↑' : fiveForces.substitutes.trend === 'down' ? '↓' : '→' }}
                  {{ fiveForces.substitutes.change }}%
                </div>
              </div>
            </div>
            <div class="bg-gray-900 p-4 relative overflow-hidden shadow-xl mb-6">
              <div class="absolute inset-0 dotted-pattern opacity-[0.1] pointer-events-none"></div>
              <p class="text-[10px] font-mono font-bold text-white uppercase tracking-tight leading-relaxed">{{ fiveForces.substitutes.insight }}</p>
            </div>
          </div>

          <!-- Buyer Power -->
          <div class="bg-gray-50/50 border border-gray-100 p-8 hover:bg-white transition-all relative group/force">
            <div class="flex items-center justify-between mb-8">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-[#3D2F88] text-white flex items-center justify-center text-xl shadow-xl">
                  <i class="fas fa-shopping-bag"></i>
                </div>
                <h4 class="text-sm font-black font-outfit text-gray-900 uppercase tracking-tight">Buyer Power</h4>
              </div>
              <div class="text-right">
                <div class="text-2xl font-black font-mono text-[#3D2F88]">{{ fiveForces.buyerPower.score }}/10</div>
                <div :class="[
                  'text-[9px] font-mono font-black uppercase tracking-widest',
                  fiveForces.buyerPower.trend === 'up' ? 'text-red-600' :
                  fiveForces.buyerPower.trend === 'down' ? 'text-emerald-600' :
                  'text-gray-400'
                ]">
                  {{ fiveForces.buyerPower.trend === 'up' ? '↑' : fiveForces.buyerPower.trend === 'down' ? '↓' : '→' }}
                  {{ fiveForces.buyerPower.change }}%
                </div>
              </div>
            </div>
            <div class="bg-gray-900 p-4 relative overflow-hidden shadow-xl mb-6">
              <div class="absolute inset-0 dotted-pattern opacity-[0.1] pointer-events-none"></div>
              <p class="text-[10px] font-mono font-bold text-white uppercase tracking-tight leading-relaxed">{{ fiveForces.buyerPower.insight }}</p>
            </div>
          </div>

          <!-- Threat of New Entrants -->
          <div class="bg-gray-50/50 border border-gray-100 p-8 hover:bg-white transition-all relative group/force">
            <div class="flex items-center justify-between mb-8">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-[#2F2E8B] text-white flex items-center justify-center text-xl shadow-xl">
                  <i class="fas fa-door-open"></i>
                </div>
                <h4 class="text-sm font-black font-outfit text-gray-900 uppercase tracking-tight">New Entrants</h4>
              </div>
              <div class="text-right">
                <div class="text-2xl font-black font-mono text-[#2F2E8B]">{{ fiveForces.newEntrants.score }}/10</div>
                <div :class="[
                  'text-[9px] font-mono font-black uppercase tracking-widest',
                  fiveForces.newEntrants.trend === 'up' ? 'text-red-600' :
                  fiveForces.newEntrants.trend === 'down' ? 'text-emerald-600' :
                  'text-gray-400'
                ]">
                  {{ fiveForces.newEntrants.trend === 'up' ? '↑' : fiveForces.newEntrants.trend === 'down' ? '↓' : '→' }}
                  {{ fiveForces.newEntrants.change }}%
                </div>
              </div>
            </div>
            <div class="bg-gray-900 p-4 relative overflow-hidden shadow-xl mb-6">
              <div class="absolute inset-0 dotted-pattern opacity-[0.1] pointer-events-none"></div>
              <p class="text-[10px] font-mono font-bold text-white uppercase tracking-tight leading-relaxed">{{ fiveForces.newEntrants.insight }}</p>
            </div>
          </div>
        </div>

        <!-- AI Strategic Recommendation -->
        <div class="bg-gray-900 p-8 relative overflow-hidden shadow-2xl group/recommendation">
          <div class="absolute inset-0 dotted-pattern opacity-[0.1] pointer-events-none"></div>
          <div class="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div class="flex items-center gap-6">
              <div class="w-16 h-16 bg-white/10 flex items-center justify-center text-2xl text-white">
                <i class="fas fa-robot"></i>
              </div>
              <div>
                <h3 class="text-lg font-black font-outfit text-white uppercase tracking-tight mb-2">AI Strategic Assessment</h3>
                <p class="text-[11px] font-mono font-bold text-white/70 uppercase leading-relaxed max-w-2xl">{{ fiveForces.aiRecommendation }}</p>
              </div>
            </div>
            <div class="flex gap-3 shrink-0">
              <button class="px-6 py-3 bg-white text-gray-900 text-[10px] font-mono font-black uppercase tracking-widest hover:bg-gray-100 transition-all">
                VIEW_FULL_REPORT
              </button>
              <button class="px-6 py-3 bg-white/10 text-white border border-white/20 text-[10px] font-mono font-black uppercase tracking-widest hover:bg-white/20 transition-all">
                GENERATE_STRATEGY
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Entry Barriers & Market Structure -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 relative z-10">
        <!-- Entry Barriers -->
        <div class="bg-white border border-gray-200 p-8 shadow-sm relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SYSTEM_SHIELD // ENTRY_BARRIERS</div>
          
          <h3 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight flex items-center gap-3 mb-10 relative z-10">
            <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
            Market Entry Barriers
          </h3>

          <div class="space-y-6 relative z-10">
            <div v-for="barrier in entryBarriers" :key="barrier.region" class="bg-gray-50/50 border border-gray-100 p-6 hover:bg-white transition-all relative group/barrier">
              <div class="flex items-center justify-between mb-6">
                <h4 class="text-sm font-black font-outfit text-gray-900 uppercase tracking-tight">{{ barrier.region }}</h4>
                <span :class="[
                  'px-2 py-1 text-[9px] font-mono font-black uppercase tracking-widest border',
                  barrier.level === 'low' ? 'border-emerald-600 text-emerald-600 bg-emerald-50' :
                  barrier.level === 'medium' ? 'border-amber-600 text-amber-600 bg-amber-50' :
                  'border-red-600 text-red-600 bg-red-50'
                ]">
                  {{ barrier.level.toUpperCase() }}
                </span>
              </div>
              
              <div class="space-y-4">
                <div class="space-y-2">
                  <div class="flex justify-between text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">
                    <span>CAPITAL_REQ</span>
                    <span class="text-gray-900">{{ barrier.capital }}%</span>
                  </div>
                  <div class="h-1.5 bg-gray-100 relative overflow-hidden">
                    <div class="absolute inset-y-0 left-0 bg-[#2F2E8B] transition-all" :style="{ width: `${barrier.capital}%` }"></div>
                  </div>
                </div>

                <div class="space-y-2">
                  <div class="flex justify-between text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">
                    <span>INFRASTRUCTURE</span>
                    <span class="text-gray-900">{{ barrier.infrastructure }}%</span>
                  </div>
                  <div class="h-1.5 bg-gray-100 relative overflow-hidden">
                    <div class="absolute inset-y-0 left-0 bg-[#3D2F88] transition-all" :style="{ width: `${barrier.infrastructure}%` }"></div>
                  </div>
                </div>

                <div class="space-y-2">
                  <div class="flex justify-between text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">
                    <span>REGULATORY</span>
                    <span class="text-gray-900">{{ barrier.regulatory }}%</span>
                  </div>
                  <div class="h-1.5 bg-gray-100 relative overflow-hidden">
                    <div class="absolute inset-y-0 left-0 bg-[#2F2E8B] transition-all" :style="{ width: `${barrier.regulatory}%` }"></div>
                  </div>
                </div>
              </div>

              <div class="mt-6 bg-gray-900 p-3 relative overflow-hidden group-hover/barrier:translate-x-1 transition-transform">
                <div class="absolute inset-0 dotted-pattern opacity-[0.1] pointer-events-none"></div>
                <p class="text-[9px] font-mono font-bold text-white uppercase tracking-tight leading-relaxed">{{ barrier.insight }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Structure-Conduct-Performance -->
        <div class="bg-white border border-gray-200 p-8 shadow-sm relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">MODEL_VECTORS // SCP_FRAMEWORK</div>
          
          <h3 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight flex items-center gap-3 mb-10 relative z-10">
            <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
            SCP Model Assessment
          </h3>

          <div class="space-y-6 relative z-10">
            <!-- Market Structure -->
            <div class="bg-gray-50 p-6 border border-gray-100">
              <h4 class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <span class="w-2 h-2 bg-[#2F2E8B]"></span>
                Market Structure
              </h4>
              <div class="grid grid-cols-2 gap-6">
                <div class="space-y-1">
                  <span class="text-[8px] font-mono font-black text-gray-400 uppercase">CONCENTRATION</span>
                  <div class="text-[11px] font-mono font-black text-gray-900 uppercase">{{ scpModel.structure.concentration }}</div>
                </div>
                <div class="space-y-1">
                  <span class="text-[8px] font-mono font-black text-gray-400 uppercase">FORMALIZATION</span>
                  <div class="text-[11px] font-mono font-black text-[#2F2E8B]">{{ scpModel.structure.formalization }}%</div>
                </div>
                <div class="space-y-1">
                  <span class="text-[8px] font-mono font-black text-gray-400 uppercase">MARKET_SIZE</span>
                  <div class="text-[11px] font-mono font-black text-gray-900 uppercase">{{ scpModel.structure.marketSize }}</div>
                </div>
                <div class="space-y-1">
                  <span class="text-[8px] font-mono font-black text-gray-400 uppercase">GROWTH_RATE</span>
                  <div class="text-[11px] font-mono font-black text-emerald-600">+{{ scpModel.structure.growth }}%</div>
                </div>
              </div>
            </div>

            <!-- Market Conduct -->
            <div class="bg-gray-50 p-6 border border-gray-100">
              <h4 class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <span class="w-2 h-2 bg-[#3D2F88]"></span>
                Market Conduct
              </h4>
              <div class="space-y-4">
                <div class="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span class="text-[9px] font-mono font-black text-gray-400 uppercase">PRICING_STRATEGY</span>
                  <span class="text-[10px] font-mono font-black text-gray-900 uppercase tracking-tight">{{ scpModel.conduct.pricing }}</span>
                </div>
                <div class="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span class="text-[9px] font-mono font-black text-gray-400 uppercase">COMPETITION_TYPE</span>
                  <span class="text-[10px] font-mono font-black text-gray-900 uppercase tracking-tight">{{ scpModel.conduct.competition }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-[9px] font-mono font-black text-gray-400 uppercase">INNOVATION_LVL</span>
                  <span class="text-[10px] font-mono font-black text-[#3D2F88] uppercase tracking-tight">{{ scpModel.conduct.innovation }}</span>
                </div>
              </div>
            </div>

            <!-- Market Performance -->
            <div class="bg-gray-50 p-6 border border-gray-100">
              <h4 class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <span class="w-2 h-2 bg-[#2F2E8B]"></span>
                Market Performance
              </h4>
              <div class="grid grid-cols-2 gap-6">
                <div class="p-4 bg-white border border-gray-100">
                  <span class="text-[8px] font-mono font-black text-gray-400 uppercase">EFFICIENCY</span>
                  <div class="text-lg font-black font-mono text-gray-900">{{ scpModel.performance.efficiency }}%</div>
                </div>
                <div class="p-4 bg-white border border-gray-100">
                  <span class="text-[8px] font-mono font-black text-gray-400 uppercase">PROFITABILITY</span>
                  <div class="text-lg font-black font-mono text-gray-900">{{ scpModel.performance.profitability }}%</div>
                </div>
              </div>
            </div>

            <div class="bg-gray-900 p-6 relative overflow-hidden shadow-2xl">
              <div class="absolute inset-0 dotted-pattern opacity-[0.1] pointer-events-none"></div>
              <p class="text-[9px] font-mono font-black text-white/50 uppercase mb-2">AI_INTELLIGENCE_LAYER:</p>
              <p class="text-[11px] font-mono font-bold text-white uppercase tracking-tight leading-relaxed">{{ scpModel.aiInsight }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Pivotal Forces & Dynamic Industry Analysis -->
      <div class="bg-white border border-gray-200 p-8 shadow-sm relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors mb-8">
        <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
        <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SYSTEM_SIGNALS // PIVOTAL_FORCES</div>
        
        <div class="flex items-center justify-between mb-12 relative z-10">
          <h3 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight flex items-center gap-3">
            <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
            Pivotal Forces Detection
          </h3>
          <span class="text-[9px] font-mono font-black text-red-600 uppercase tracking-widest border border-red-100 bg-red-50 px-3 py-1">
            {{ pivotalForces.length }} ACTIVE_FORCE_SIGNALS
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 relative z-10">
          <div 
            v-for="force in pivotalForces" 
            :key="force.id"
            class="bg-gray-50/50 border border-gray-100 p-8 hover:bg-white transition-all relative group/force"
            :class="force.urgency === 'critical' ? 'border-red-200' : ''"
          >
            <div class="flex items-start justify-between mb-8">
              <div class="flex items-center gap-4">
                <div :class="[
                  'w-12 h-12 flex items-center justify-center text-xl shadow-xl',
                  force.urgency === 'critical' ? 'bg-red-600 text-white' : 'bg-[#2F2E8B] text-white'
                ]">
                  <i :class="['fas', force.icon]"></i>
                </div>
                <h4 class="text-sm font-black font-outfit text-gray-900 uppercase tracking-tight">{{ force.title }}</h4>
              </div>
              <span :class="[
                'text-[9px] font-mono font-black uppercase tracking-widest px-2 py-1 border',
                force.urgency === 'critical' ? 'border-red-600 text-red-600 bg-red-50' :
                force.urgency === 'high' ? 'border-amber-600 text-amber-600 bg-amber-50' :
                'border-blue-600 text-blue-600 bg-blue-50'
              ]">
                {{ force.urgency.toUpperCase() }}
              </span>
            </div>

            <div class="bg-gray-900 p-4 relative overflow-hidden shadow-xl mb-8">
              <div class="absolute inset-0 dotted-pattern opacity-[0.1] pointer-events-none"></div>
              <p class="text-[10px] font-mono font-bold text-white uppercase tracking-tight leading-relaxed">{{ force.description }}</p>
            </div>

            <div class="space-y-6">
              <div class="space-y-2">
                <div class="flex justify-between text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">
                  <span>IMPACT_VEC</span>
                  <span class="text-gray-900 font-black">{{ force.impact }}%</span>
                </div>
                <div class="h-1 bg-gray-100 relative overflow-hidden">
                  <div class="absolute inset-y-0 left-0 bg-[#2F2E8B] transition-all" :style="{ width: `${force.impact}%` }"></div>
                </div>
              </div>

              <div class="space-y-2">
                <div class="flex justify-between text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">
                  <span>PROBABILITY</span>
                  <span class="text-gray-900 font-black">{{ force.probability }}%</span>
                </div>
                <div class="h-1 bg-gray-100 relative overflow-hidden">
                  <div class="absolute inset-y-0 left-0 bg-[#3D2F88] transition-all" :style="{ width: `${force.probability}%` }"></div>
                </div>
              </div>

              <div class="mt-8 border-t border-gray-100 pt-6">
                <div class="flex items-start gap-3">
                  <div class="w-8 h-8 bg-[#2F2E8B]/5 flex items-center justify-center text-[#2F2E8B] text-xs">
                    <i class="fas fa-robot"></i>
                  </div>
                  <p class="text-[9px] font-mono font-black text-gray-900 uppercase leading-relaxed">
                    <span class="text-[#2F2E8B]">RECO_AI:</span> {{ force.recommendation }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Cross-Domain Correlation Matrix -->
        <div class="bg-gray-900 p-8 relative overflow-hidden shadow-2xl">
          <div class="absolute inset-0 dotted-pattern opacity-[0.1] pointer-events-none"></div>
          <h4 class="text-[10px] font-mono font-black text-white/50 uppercase tracking-widest mb-8 flex items-center gap-3">
            <span class="w-4 h-[1px] bg-white/30"></span>
            Cross-Domain Correlation Analysis Matrix
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            <div v-for="correlation in correlations" :key="correlation.id" class="bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all">
              <div class="flex items-center justify-between mb-4">
                <span class="text-[10px] font-mono font-black text-white uppercase tracking-widest">{{ correlation.factors }}</span>
                <span class="text-[14px] font-mono font-black text-[#2F2E8B] bg-white px-2 py-1">r={{ correlation.coefficient }}</span>
              </div>
              <p class="text-[9px] font-mono font-bold text-white/60 uppercase leading-relaxed">{{ correlation.insight }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- AI Intelligence Modal -->
      <div v-if="showIntelligenceModal" class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click.self="showIntelligenceModal = false">
        <div class="bg-white border border-gray-200 shadow-2xl max-w-2xl w-full relative overflow-hidden">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          
          <div class="p-8 border-b border-gray-100 flex items-center justify-between relative z-10">
            <h3 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight flex items-center gap-4">
              <div class="w-10 h-10 bg-gray-900 flex items-center justify-center text-white">
                <i class="fas fa-brain"></i>
              </div>
              Environmental Intelligence Agent
            </h3>
            <button @click="showIntelligenceModal = false" class="w-10 h-10 flex items-center justify-center border border-gray-100 hover:bg-gray-50 transition-colors">
              <i class="fas fa-times text-gray-400"></i>
            </button>
          </div>

          <div class="p-8 space-y-8 relative z-10 max-h-[70vh] overflow-y-auto">
            <div class="bg-gray-900 p-6 relative overflow-hidden">
              <div class="absolute inset-0 dotted-pattern opacity-[0.1] pointer-events-none"></div>
              <p class="text-[10px] font-mono font-bold text-white uppercase tracking-tight leading-relaxed">
                SYSTEM_ACCESS // Launching comprehensive environmental intelligence analysis. ENGINE_TASKS: [REAL_TIME_WEB_SEARCH, INTERNAL_DATA_CORRELATION, PESTEL_MODELING, PORTER_5_FORCES_MAPPING].
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- Industry Selector -->
              <div class="space-y-4">
                <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">INDUSTRY_SECTOR</label>
                <div class="relative group">
                  <select 
                    v-model="intelligenceConfig.industry"
                    class="w-full h-12 px-4 bg-gray-50 border transition-all appearance-none focus:outline-none focus:ring-1 focus:ring-[#2F2E8B] text-[11px] font-mono font-black uppercase"
                    :class="intelligenceConfig.industry ? 'border-[#2F2E8B] text-[#2F2E8B] bg-[#2F2E8B]/5' : 'border-gray-200 text-gray-900'"
                  >
                    <option value="">SELECT_TARGET...</option>
                    <option value="retail">RETAIL_CONSUMER</option>
                    <option value="technology">TECH_SOFTWARE</option>
                    <option value="manufacturing">MANUFACTURING</option>
                    <option value="agriculture">AGRICULTURE</option>
                    <option value="healthcare">HEALTHCARE</option>
                    <option value="education">EDUCATION</option>
                    <option value="hospitality">HOSPITALITY</option>
                    <option value="construction">CONSTRUCTION</option>
                    <option value="financial">FINANCIAL_SERVICES</option>
                    <option value="transportation">LOGISTICS</option>
                    <option value="energy">ENERGY_UTILITIES</option>
                    <option value="telecommunications">TELECOM</option>
                    <option value="media">ENTERTAINMENT</option>
                    <option value="professional">PROFESSIONAL</option>
                    <option value="government">GOVERNMENT</option>
                    <option value="artificail intelligence">AI_SECTOR</option>
                    <option value="other">OTHER</option>
                  </select>
                  <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors"
                       :class="intelligenceConfig.industry ? 'text-[#2F2E8B]' : 'text-gray-400'">
                    <i class="fas fa-chevron-down text-[10px]"></i>
                  </div>
                </div>
              </div>

              <!-- Region -->
              <div class="space-y-4">
                <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">TARGET_REGION</label>
                <input 
                  v-model="intelligenceConfig.region"
                  type="text"
                  readonly
                  class="w-full h-12 px-4 bg-gray-100 border border-gray-200 text-[11px] font-mono font-black text-gray-400 cursor-not-allowed"
                >
              </div>
            </div>

            <!-- Focus Areas -->
            <div class="space-y-4">
              <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">FOCUS_MODELS_SELECTION [{{ intelligenceConfig.focus_areas.length }}]</label>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                <label 
                  v-for="area in availableFocusAreas" 
                  :key="area.value"
                  class="flex items-center gap-4 p-5 border transition-all cursor-pointer group relative overflow-hidden"
                  :class="intelligenceConfig.focus_areas.includes(area.value) 
                    ? 'bg-[#2F2E8B]/10 border-[#2F2E8B] shadow-inner' 
                    : 'bg-gray-50 border-gray-100 hover:border-[#2F2E8B]/30 hover:bg-white'"
                >
                  <input 
                    type="checkbox" 
                    :value="area.value" 
                    v-model="intelligenceConfig.focus_areas"
                    class="hidden"
                  >
                  <!-- Custom Checkbox -->
                  <div class="w-5 h-5 border flex items-center justify-center transition-all duration-300"
                       :class="intelligenceConfig.focus_areas.includes(area.value) 
                         ? 'bg-[#2F2E8B] border-[#2F2E8B] scale-110 shadow-lg' 
                         : 'bg-white border-gray-300 group-hover:border-[#2F2E8B]'">
                    <i v-if="intelligenceConfig.focus_areas.includes(area.value)" class="fas fa-check text-[10px] text-white"></i>
                  </div>
                  
                  <div class="flex flex-col gap-0.5">
                    <span class="text-[10px] font-mono font-black uppercase tracking-tight transition-colors"
                          :class="intelligenceConfig.focus_areas.includes(area.value) ? 'text-[#2F2E8B]' : 'text-gray-900'">
                      {{ area.label }}
                    </span>
                    <span v-if="intelligenceConfig.focus_areas.includes(area.value)" class="text-[7px] font-mono font-black text-[#2F2E8B] uppercase tracking-tighter opacity-70">
                      SELECTED_FOR_ANALYSIS
                    </span>
                  </div>

                  <!-- Subtle background indicator -->
                  <div v-if="intelligenceConfig.focus_areas.includes(area.value)" class="absolute top-0 right-0 p-1">
                    <div class="w-1.5 h-1.5 bg-[#2F2E8B]"></div>
                  </div>
                </label>
              </div>
            </div>

            <!-- Analysis Pipeline -->
            <div class="bg-gray-50 border border-gray-100 p-6 space-y-4">
              <h4 class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest flex items-center gap-2">
                <i class="fas fa-project-diagram"></i>
                ANALYSIS_PIPELINE
              </h4>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-6">
                <div class="flex items-center gap-2 text-[8px] font-mono font-black text-gray-400 uppercase">
                  <span class="w-1 h-1 bg-[#2F2E8B]"></span> WEB_SEARCH_VECTORS
                </div>
                <div class="flex items-center gap-2 text-[8px] font-mono font-black text-gray-400 uppercase">
                  <span class="w-1 h-1 bg-[#2F2E8B]"></span> PESTEL_MAPPING
                </div>
                <div class="flex items-center gap-2 text-[8px] font-mono font-black text-gray-400 uppercase">
                  <span class="w-1 h-1 bg-[#2F2E8B]"></span> PORTER_FORCES
                </div>
                <div class="flex items-center gap-2 text-[8px] font-mono font-black text-gray-400 uppercase">
                  <span class="w-1 h-1 bg-[#2F2E8B]"></span> CORRELATION_ENGINE
                </div>
                <div class="flex items-center gap-2 text-[8px] font-mono font-black text-gray-400 uppercase">
                  <span class="w-1 h-1 bg-[#2F2E8B]"></span> RECO_GENERATION
                </div>
              </div>
            </div>
          </div>

          <div class="p-8 border-t border-gray-100 flex gap-4 relative z-10">
            <button 
              @click="triggerIntelligenceAgent"
              :disabled="isTriggeringIntelligence || !intelligenceConfig.industry || intelligenceConfig.focus_areas.length === 0"
              class="flex-1 h-14 bg-gray-900 hover:bg-[#2F2E8B] text-white text-[11px] font-mono font-black uppercase tracking-widest transition-all disabled:opacity-30 disabled:grayscale"
            >
              <span v-if="isTriggeringIntelligence" class="flex items-center justify-center gap-3">
                <i class="fas fa-spinner fa-spin"></i>
                PROCESSING_AGENT...
              </span>
              <span v-else>INITIALIZE_ANALYSIS</span>
            </button>
            <button 
              @click="showIntelligenceModal = false"
              :disabled="isTriggeringIntelligence"
              class="px-8 h-14 border border-gray-200 text-[11px] font-mono font-black uppercase tracking-widest hover:bg-gray-50 transition-all text-gray-900"
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import API_BASE_URL from '@/api_services/api'
import { decodeJWT } from '@/api_services/decodeJWT'
import StrategicNavigation from './components/StrategicNavigation.vue'

const router = useRouter()
const selectedRegion = ref('all')
const lastUpdated = ref('2 min ago')
const fiveForcesUpdated = ref('5 min ago')

// Get tenant ID from JWT
const jwtHelper = decodeJWT()
const tenantId = ref(jwtHelper.getTenantId())

// Loading states
const isLoadingAnalysis = ref(false)
const isRefreshing = ref(false)
const isTriggeringIntelligence = ref(false)

// Modal state
const showIntelligenceModal = ref(false)

// Intelligence configuration
const intelligenceConfig = ref({
  industry: '',
  focus_areas: [],
  region: selectedRegion.value
})

// Available focus areas
const availableFocusAreas = ref([
  { value: 'market_trends', label: 'Market Trends' },
  { value: 'competition', label: 'Competition Analysis' },
  { value: 'regulatory', label: 'Regulatory Changes' },
  { value: 'technology', label: 'Technology Disruption' },
  { value: 'consumer_behavior', label: 'Consumer Behavior' },
  { value: 'pricing', label: 'Pricing Strategies' },
  { value: 'supply_chain', label: 'Supply Chain' },
  { value: 'innovation', label: 'Innovation Trends' },
  { value: 'sustainability', label: 'Sustainability' },
  { value: 'digital_transformation', label: 'Digital Transformation' },
  { value: 'economic_indicators', label: 'Economic Indicators' },
  { value: 'political_stability', label: 'Political Stability' },
  { value: 'social_trends', label: 'Social Trends' },
  { value: 'infrastructure', label: 'Infrastructure' },
  { value: 'talent_market', label: 'Talent & Labor Market' },
  { value: 'financial_landscape', label: 'Financial Landscape' },
  { value: 'trade_agreements', label: 'Trade Agreements' },
  { value: 'climate_impact', label: 'Climate Impact' },
  { value: 'urbanization', label: 'Urbanization' },
  { value: 'investment_trends', label: 'Investment Trends' }
])

// Critical Alert
const criticalAlert = ref(null)

// AI Executive Summary
const executiveSummary = ref(null)

// Navigation
const activeTab = ref('environmental')

// PESTEL Data
const pestelData = ref({
  political: {
    risk: '',
    stability: 0,
    insight: '',
    factors: []
  },
  economic: {
    outlook: '',
    growth: 0,
    insight: '',
    indicators: []
  },
  social: {
    sentiment: '',
    score: 0,
    insight: '',
    trends: []
  },
  technological: {
    readiness: '',
    maturity: 0,
    insight: '',
    technologies: []
  },
  environmental: {
    impact: '',
    climateRisk: 0,
    insight: '',
    concerns: []
  },
  legal: {
    compliance: '',
    burden: 0,
    insight: '',
    changes: []
  }
})

// Five Forces Data
const fiveForces = ref({
  supplierPower: {
    score: 0,
    trend: '',
    change: 0,
    insight: ''
  },
  buyerPower: {
    score: 0,
    trend: '',
    change: 0,
    insight: ''
  },
  rivalry: {
    score: 0,
    trend: '',
    change: 0,
    insight: ''
  },
  substitutes: {
    score: 0,
    trend: '',
    change: 0,
    insight: ''
  },
  newEntrants: {
    score: 0,
    trend: '',
    change: 0,
    insight: ''
  },
  aiRecommendation: ''
})

// Entry Barriers by Region
const entryBarriers = ref([])

// Structure-Conduct-Performance Model
const scpModel = ref({
  structure: {
    concentration: '',
    formalization: 0,
    marketSize: '',
    growth: 0
  },
  conduct: {
    pricing: '',
    competition: '',
    innovation: ''
  },
  performance: {
    efficiency: 0,
    profitability: 0,
    welfare: 0,
    innovationOutput: ''
  },
  aiInsight: ''
})

// Pivotal Forces
const pivotalForces = ref([])

// Cross-Domain Correlations
const correlations = ref([])

// Fetch complete environmental analysis from backend
const fetchEnvironmentalAnalysis = async () => {
  if (!tenantId.value) {
    console.warn('No tenant ID found')
    return
  }
  
  isLoadingAnalysis.value = true
  
  try {
    const response = await axios.get(`${API_BASE_URL}/strategy/environmental/analysis`, {
      params: { 
        tenant_id: tenantId.value,
        region: selectedRegion.value
      }
    })
    
    const data = response.data
    
    // Update Executive Summary
    if (data.executive_summary) {
      executiveSummary.value = data.executive_summary
    } else {
      executiveSummary.value = null
    }
    
    // Update PESTEL data
    if (data.pestel) {
      pestelData.value = {
        political: {
          risk: data.pestel.political.risk,
          stability: data.pestel.political.score,
          insight: data.pestel.political.insight,
          factors: data.pestel.political.factors
        },
        economic: {
          outlook: data.pestel.economic.risk === 'low' ? 'positive' : (data.pestel.economic.risk === 'high' ? 'negative' : 'neutral'),
          growth: data.pestel.economic.score,
          insight: data.pestel.economic.insight,
          indicators: data.pestel.economic.factors
        },
        social: {
          sentiment: data.pestel.social.risk === 'low' ? 'Positive' : (data.pestel.social.risk === 'high' ? 'Negative' : 'Neutral'),
          score: data.pestel.social.score * 10, // Convert 0-10 to 0-100
          insight: data.pestel.social.insight,
          trends: data.pestel.social.factors
        },
        technological: {
          readiness: data.pestel.technological.risk === 'low' ? 'High' : (data.pestel.technological.risk === 'high' ? 'Low' : 'Medium-High'),
          maturity: data.pestel.technological.score * 10, // Convert 0-10 to 0-100
          insight: data.pestel.technological.insight,
          technologies: data.pestel.technological.factors
        },
        environmental: {
          impact: data.pestel.environmental.risk,
          climateRisk: data.pestel.environmental.score,
          insight: data.pestel.environmental.insight,
          concerns: data.pestel.environmental.factors
        },
        legal: {
          compliance: data.pestel.legal.risk === 'low' ? 'high' : (data.pestel.legal.risk === 'high' ? 'low' : 'medium'),
          burden: data.pestel.legal.score,
          insight: data.pestel.legal.insight,
          changes: data.pestel.legal.factors
        }
      }
    }
    
    // Update Five Forces data
    if (data.five_forces) {
      fiveForces.value = {
        supplierPower: {
          score: data.five_forces.supplier_power.score,
          trend: data.five_forces.supplier_power.trend,
          change: Math.abs(data.five_forces.supplier_power.change),
          insight: data.five_forces.supplier_power.insight
        },
        buyerPower: {
          score: data.five_forces.buyer_power.score,
          trend: data.five_forces.buyer_power.trend,
          change: Math.abs(data.five_forces.buyer_power.change),
          insight: data.five_forces.buyer_power.insight
        },
        rivalry: {
          score: data.five_forces.rivalry.score,
          trend: data.five_forces.rivalry.trend,
          change: Math.abs(data.five_forces.rivalry.change),
          insight: data.five_forces.rivalry.insight
        },
        substitutes: {
          score: data.five_forces.substitutes.score,
          trend: data.five_forces.substitutes.trend,
          change: Math.abs(data.five_forces.substitutes.change),
          insight: data.five_forces.substitutes.insight
        },
        newEntrants: {
          score: data.five_forces.new_entrants.score,
          trend: data.five_forces.new_entrants.trend,
          change: Math.abs(data.five_forces.new_entrants.change),
          insight: data.five_forces.new_entrants.insight
        },
        aiRecommendation: data.five_forces.ai_recommendation
      }
    }
    
    // Update Entry Barriers
    if (data.entry_barriers) {
      entryBarriers.value = data.entry_barriers.map(barrier => ({
        region: barrier.region,
        level: barrier.level,
        capital: barrier.capital,
        infrastructure: barrier.infrastructure,
        regulatory: barrier.regulatory,
        insight: barrier.insight
      }))
    }
    
    // Update SCP Model
    if (data.scp_model) {
      scpModel.value = {
        structure: {
          concentration: data.scp_model.structure.concentration,
          formalization: data.scp_model.structure.formalization,
          marketSize: data.scp_model.structure.market_size,
          growth: data.scp_model.structure.growth
        },
        conduct: {
          pricing: data.scp_model.conduct.pricing,
          competition: data.scp_model.conduct.competition,
          innovation: data.scp_model.conduct.innovation
        },
        performance: {
          efficiency: data.scp_model.performance.efficiency,
          profitability: data.scp_model.performance.profitability,
          welfare: data.scp_model.performance.welfare,
          innovationOutput: data.scp_model.performance.innovation_output
        },
        aiInsight: data.scp_model.ai_insight
      }
    }
    
    // Update Pivotal Forces
    if (data.pivotal_forces) {
      pivotalForces.value = data.pivotal_forces
    }
    
    // Update Correlations
    if (data.correlations) {
      correlations.value = data.correlations
    }
    
    // Update Critical Alert
    if (data.critical_alerts && data.critical_alerts.length > 0) {
      criticalAlert.value = {
        message: data.critical_alerts[0].message
      }
    }
    
    // Update timestamps
    lastUpdated.value = 'Just now'
    fiveForcesUpdated.value = 'Just now'
    
    console.log('Environmental analysis fetched:', data)
  } catch (error) {
    console.error('Error fetching environmental analysis:', error)
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
    await axios.post(`${API_BASE_URL}/strategy/environmental/refresh`, null, {
      params: { tenant_id: tenantId.value }
    })
    
    // Fetch updated data
    await fetchEnvironmentalAnalysis()
    
    alert('Environmental analysis refreshed successfully!')
  } catch (error) {
    console.error('Failed to refresh analysis:', error)
    alert('Failed to refresh analysis: ' + (error.response?.data?.detail || error.message))
  } finally {
    isRefreshing.value = false
  }
}

// Trigger Environmental Intelligence Agent
const triggerIntelligenceAgent = async () => {
  if (!tenantId.value) {
    alert('Tenant ID not found. Please log in again.')
    return
  }
  
  if (!intelligenceConfig.value.industry) {
    alert('Please select an industry sector.')
    return
  }
  
  if (intelligenceConfig.value.focus_areas.length === 0) {
    alert('Please select at least one focus area.')
    return
  }
  
  isTriggeringIntelligence.value = true
  
  try {
    const payload = {
      tenant_id: tenantId.value,
      region: intelligenceConfig.value.region || selectedRegion.value,
      industry: intelligenceConfig.value.industry,
      focus_areas: intelligenceConfig.value.focus_areas
    }
    
    console.log('Triggering intelligence agent with payload:', payload)
    
    const response = await axios.post(
      `${API_BASE_URL}/environmental-intelligence-agent/trigger`,
      payload
    )
    
    console.log('Intelligence agent triggered:', response.data)
    
    // Close modal
    showIntelligenceModal.value = false
    
    // Show success message
    alert('Environmental intelligence analysis initiated successfully! Results will be available shortly.')
    
    // Refresh data after a delay to get new results
    setTimeout(async () => {
      await fetchEnvironmentalAnalysis()
    }, 5000)
    
    // Reset form
    intelligenceConfig.value = {
      industry: '',
      focus_areas: [],
      region: selectedRegion.value
    }
    
    return true
  } catch (error) {
    console.error('Error triggering intelligence agent:', error)
    alert('Failed to trigger intelligence analysis: ' + (error.response?.data?.detail || error.message))
    return false
  } finally {
    isTriggeringIntelligence.value = false
  }
}

onMounted(async () => {
  // Fetch environmental data from backend
  await fetchEnvironmentalAnalysis()
})

// Watch for region changes and refetch data
watch(selectedRegion, async (newRegion) => {
  intelligenceConfig.value.region = newRegion
  await fetchEnvironmentalAnalysis()
})
</script>

<style scoped>
/* Add any custom styles here */
</style>
