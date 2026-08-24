<template>
  <div class="funding-subpage min-h-screen bg-[#F5F5F5] font-sans relative text-gray-900 overflow-x-hidden">
    <!-- Viewport Mesh Background (Fixed) -->
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <div class="max-w-[1920px] mx-auto p-4 md:p-6 relative z-10">
      
      <!-- Header with AI Status -->
      <div class="bg-white/80 backdrop-blur-md border border-gray-200 p-6 mb-6 shadow-none relative overflow-hidden">
        <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
          <div class="flex items-center gap-4">
            <div class="w-2 h-12 bg-[#2F2E8B]"></div>
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">MODULE // FUNDING_OPTIMIZER</span>
              </div>
              <h1 class="text-3xl font-black text-gray-900 uppercase tracking-tight font-outfit">AI Strategic Consultant</h1>
              <p class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mt-1">REAL_TIME // FUNDABILITY_INTEL_STREAM</p>
            </div>
          </div>
          
          <div class="flex flex-wrap gap-3">
            <select 
              v-model="selectedLanguage"
              class="bg-white border border-gray-200 px-4 py-2 text-[10px] font-mono font-bold uppercase focus:ring-1 focus:ring-[#2F2E8B] rounded-none shadow-none"
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
              class="bg-[#2F2E8B] hover:bg-[#1D226B] text-white px-4 py-2 text-[10px] font-mono font-bold uppercase shadow-md transition-all flex items-center gap-2 rounded-none"
            >
              <i class="fas fa-magic"></i>
              <span>AI_CREDIT_REPORT</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Strategic Navigation -->
      <StrategicNavigation active-tab="funding" />

      <!-- Business Credit Score Dashboard -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        
        <!-- Credit Score Card -->
        <div class="bg-white border border-gray-200 p-8 shadow-none relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SYSTEM_AUDIT // CREDIT_CORE</div>
          
          <div class="text-center mb-8 relative z-10">
            <p class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest mb-6">Business Credit Score</p>
            <div class="relative inline-block">
              <svg class="w-40 h-40 transform -rotate-90">
                <circle 
                  cx="80" 
                  cy="80" 
                  r="72" 
                  stroke="#F7F7F7" 
                  stroke-width="1" 
                  stroke-dasharray="4 4"
                  fill="none"
                />
                <circle 
                  cx="80" 
                  cy="80" 
                  r="72" 
                  :stroke="getCreditScoreHex(creditScore.score)" 
                  stroke-width="8" 
                  fill="none"
                  stroke-linecap="butt"
                  :stroke-dasharray="`${(creditScore.score / 1000) * 452.39} 452.39`"
                  class="transition-all duration-1000"
                />
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-5xl font-black font-outfit tabular-nums tracking-tighter" :style="{ color: getCreditScoreHex(creditScore.score) }">
                  {{ creditScore.score }}
                </span>
                <span class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mt-1">OF_1000_MAX</span>
              </div>
            </div>
            <div class="mt-8 flex justify-center">
              <span :class="[
                'px-6 py-2 text-[10px] font-mono font-black uppercase tracking-widest border-2',
                creditScore.rating === 'Excellent' ? 'bg-emerald-50 text-emerald-800 border-emerald-500/20' :
                creditScore.rating === 'Good' ? 'bg-blue-50 text-blue-800 border-blue-500/20' :
                creditScore.rating === 'Fair' ? 'bg-amber-50 text-amber-800 border-amber-500/20' :
                'bg-red-50 text-red-800 border-red-500/20'
              ]">
                {{ creditScore.rating }}_RATING
              </span>
            </div>
          </div>

          <!-- Recent Change -->
          <div class="border-t border-gray-100 pt-6 relative z-10">
            <div class="flex items-center justify-between mb-4">
              <span class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">30_DAY_DELTA</span>
              <span :class="[
                'text-[11px] font-mono font-black uppercase tabular-nums',
                creditScore.change >= 0 ? 'text-emerald-600' : 'text-red-600'
              ]">
                {{ creditScore.change >= 0 ? '+' : '-' }}{{ Math.abs(creditScore.change) }} // POINTS
              </span>
            </div>
            <div class="bg-gray-50 border border-gray-100 p-4 relative overflow-hidden">
              <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
              <p class="text-[10px] font-mono font-bold text-gray-600 uppercase tracking-tight leading-relaxed relative z-10">
                <i class="fas fa-info-circle text-[#2F2E8B] mr-2"></i>
                {{ creditScore.changeReason }}
              </p>
            </div>
          </div>
        </div>

        <!-- Score Breakdown -->
        <div class="bg-white border border-gray-200 p-8 shadow-none relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SYSTEM_METRICS // CORE_WEIGHTS</div>
          
          <h3 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight mb-8 relative z-10 flex items-center gap-3">
            <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
            Score Components
          </h3>
          
          <div class="space-y-6 relative z-10">
            <div v-for="component in creditScore.components" :key="component.name" class="group/comp">
              <div class="flex items-center justify-between mb-2">
                <span class="text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest group-hover/comp:text-[#2F2E8B] transition-colors">{{ component.name }}</span>
                <span class="text-[10px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest tabular-nums">{{ component.score }} / {{ component.max }}</span>
              </div>
              <div class="h-1.5 bg-gray-50 border border-gray-100 relative overflow-hidden">
                <div 
                  class="absolute h-full bg-[#2F2E8B] transition-all duration-700"
                  :style="{ width: `${(component.score / component.max) * 100}%` }"
                ></div>
                <div class="absolute inset-0 bg-white/10 [mask-image:linear-gradient(to_right,white,transparent)]"></div>
              </div>
              <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-tight mt-2 opacity-0 group-hover/comp:opacity-100 transition-opacity">
                {{ component.description }}
              </p>
            </div>
          </div>
        </div>

        <!-- Explainable AI Insights -->
        <div class="bg-white border border-gray-200 p-8 shadow-none relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">AI_LOGIC // ATTRIBUTION_ANALYSIS</div>
          
          <h3 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight mb-8 relative z-10 flex items-center gap-3">
            <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
            Why This Score?
          </h3>

          <div class="space-y-4 relative z-10">
            <div 
              v-for="explanation in creditScore.explanations" 
              :key="explanation.id"
              class="group/exp relative"
            >
              <div class="flex items-start gap-4 p-4 border border-gray-100 hover:border-[#2F2E8B]/20 bg-gray-50/50 transition-all">
                <div :class="['p-2 text-[10px] font-mono font-black border', explanation.impact >= 0 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200']">
                  {{ explanation.impact >= 0 ? '+' : '-' }}{{ Math.abs(explanation.impact) }}
                </div>
                <div class="flex-1">
                  <p class="text-[10px] font-mono font-bold text-gray-600 uppercase tracking-tight leading-relaxed">
                    {{ explanation.reason }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8 pt-6 border-t border-gray-100 relative z-10">
            <button 
              @click="showRoadmapModal = true"
              class="w-full py-4 bg-[#2F2E8B] text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-[#1D226B] transition-all shadow-xl"
            >
              ACCESS_FUNDABILITY_ROADMAP
            </button>
          </div>
        </div>
      </div>

      <!-- Matched Funding Opportunities -->
      <div class="mb-12">
        <div class="bg-white border border-gray-200 p-8 shadow-none relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SYSTEM_MATCH // FUNDING_FLUX</div>
          
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-gray-100 pb-4 relative z-10">
            <div class="flex items-center gap-3">
              <div class="w-1.5 h-6 bg-emerald-500"></div>
              <h2 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight">Matched Funding Opportunities</h2>
            </div>
            <p class="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-1 border border-emerald-100">{{ matchedFunders.length }} MATCHES_FOUND // OPTIMAL_SYNC</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            <div 
              v-for="funder in matchedFunders" 
              :key="funder.id"
              class="bg-white border border-gray-100 p-6 hover:shadow-md transition-all cursor-pointer relative group flex flex-col border-t-2"
              :class="funder.featured ? 'border-t-[#2F2E8B] bg-gray-50/30' : 'border-t-gray-200'"
              @click="applyToFunder(funder.id)"
            >
              <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
              <div class="flex items-start justify-between mb-6 relative z-10">
                <div class="flex items-center gap-4">
                  <div class="p-3 bg-white border border-gray-100 shadow-none">
                    <i :class="['fas text-xl', funder.icon, 'text-[#2F2E8B]']"></i>
                  </div>
                  <div>
                    <h4 class="font-black text-gray-900 text-sm uppercase tracking-tight font-outfit">{{ funder.name }}</h4>
                    <span class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">{{ funder.type }}</span>
                  </div>
                </div>
                <div v-if="funder.featured" class="bg-[#2F2E8B] px-2 py-0.5 text-[7px] font-mono font-black text-white uppercase tracking-widest">FEATURED</div>
              </div>

              <div class="grid grid-cols-2 gap-4 mb-6 relative z-10">
                <div class="bg-white border border-gray-50 p-3">
                  <span class="text-[7px] font-mono font-black text-gray-400 uppercase block mb-1">LOAN_CAP</span>
                  <span class="text-[11px] font-mono font-black text-[#2F2E8B] uppercase tracking-tighter">{{ funder.loanRange }}</span>
                </div>
                <div class="bg-white border border-gray-50 p-3">
                  <span class="text-[7px] font-mono font-black text-gray-400 uppercase block mb-1">INT_RATE</span>
                  <span class="text-[11px] font-mono font-black text-emerald-600 uppercase tracking-tighter">{{ funder.interestRate }}</span>
                </div>
              </div>

              <div class="flex items-center justify-between mb-6 relative z-10 bg-gray-50 p-3 border border-gray-100">
                <div class="text-left">
                  <span class="text-[7px] font-mono font-black text-gray-400 uppercase block">APPROVAL_ETA</span>
                  <span class="text-[10px] font-mono font-black text-gray-700 uppercase">{{ funder.approvalTime }}</span>
                </div>
                <div class="text-right">
                  <span class="text-[7px] font-mono font-black text-gray-400 uppercase block">MATCH_INDEX</span>
                  <span class="text-[11px] font-mono font-black text-emerald-600">{{ funder.matchScore }}%</span>
                </div>
              </div>

              <div class="bg-white/50 border border-gray-50 p-4 mb-6 relative z-10">
                <p class="text-[8px] font-mono font-black text-gray-300 uppercase tracking-widest mb-3">SYNC_RATIONALE</p>
                <div class="space-y-2">
                  <div 
                    v-for="criteria in funder.matchReasons" 
                    :key="criteria"
                    class="flex items-start gap-2 text-[9px] font-mono font-bold text-gray-500 uppercase tracking-tight leading-none"
                  >
                    <span class="w-1 h-1 bg-emerald-500 mt-1"></span>
                    <span>{{ criteria }}</span>
                  </div>
                </div>
              </div>

              <button 
                class="w-full py-3 border border-[#2F2E8B]/20 text-[#2F2E8B] text-[10px] font-mono font-black uppercase tracking-widest hover:bg-[#2F2E8B] hover:text-white transition-all relative z-10 mt-auto"
              >
                EXECUTE_APPLICATION // SYMBOLIC_SYNC
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Strategic Investment Requirements -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <div class="bg-white border border-gray-200 p-8 shadow-none relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SYSTEM_REQS // INVEST_GATE</div>
          
          <h3 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight mb-8 relative z-10 flex items-center gap-3">
            <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
            Strategic Investment Requirements
          </h3>

          <div class="space-y-4 relative z-10">
            <div class="flex items-center justify-between p-5 border border-gray-100 bg-gray-50">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 bg-white border border-gray-100 flex items-center justify-center">
                  <i class="fas fa-file-invoice text-emerald-600"></i>
                </div>
                <div>
                  <p class="text-[10px] font-mono font-black text-gray-900 uppercase tracking-tight">Compliance Status</p>
                  <p class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-1">REGULATORY_TAX_SYNC</p>
                </div>
              </div>
              <span class="px-3 py-1 bg-emerald-500 text-white text-[9px] font-mono font-black uppercase tracking-widest">VERIFIED</span>
            </div>
            
            <div class="flex items-center justify-between p-5 border border-gray-100 bg-gray-50">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 bg-white border border-gray-100 flex items-center justify-center">
                  <i class="fas fa-chart-line text-blue-600"></i>
                </div>
                <div>
                  <p class="text-[10px] font-mono font-black text-gray-900 uppercase tracking-tight">Financial Health</p>
                  <p class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-1">CASHFLOW_ALPHA_INDEX</p>
                </div>
              </div>
              <span class="px-3 py-1 bg-blue-500 text-white text-[9px] font-mono font-black uppercase tracking-widest">HEALTHY</span>
            </div>
          </div>
        </div>

        <div class="bg-white border border-gray-200 p-8 shadow-none relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SYSTEM_MODAL // LENDING_NODE</div>
          
          <h3 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight mb-8 relative z-10 flex items-center gap-3">
            <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
            Uniplexity AI Lending Gateway
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
            <button 
              class="group p-6 border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-[#2F2E8B]/30 hover:shadow-xl transition-all text-left relative overflow-hidden"
              @click="showFundingModal = true"
            >
              <div class="absolute top-0 right-0 p-1 text-[7px] font-mono font-black text-gray-300 uppercase tracking-widest">INTERNAL_LEND</div>
              <div class="w-12 h-12 bg-[#2F2E8B] flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform">
                <i class="fas fa-university text-white text-xl"></i>
              </div>
              <p class="text-[10px] font-mono font-black text-gray-900 uppercase tracking-tight mb-2">SME_LOAN_APPLICATION</p>
              <p class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest leading-relaxed">Direct internal funding for scale-up projects.</p>
            </button>

            <button 
              class="group p-6 border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-purple-500/30 hover:shadow-xl transition-all text-left relative overflow-hidden"
            >
              <div class="absolute top-0 right-0 p-1 text-[7px] font-mono font-black text-gray-300 uppercase tracking-widest">PARTNER_VC</div>
              <div class="w-12 h-12 bg-purple-600 flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform">
                <i class="fas fa-users-cog text-white text-xl"></i>
              </div>
              <p class="text-[10px] font-mono font-black text-gray-900 uppercase tracking-tight mb-2">PARTNER_INVEST_SYNC</p>
              <p class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest leading-relaxed">Access external venture capital & credit lines.</p>
            </button>
          </div>
        </div>
      </div>

      <!-- Funding Application Modal -->
      <div v-if="showFundingModal" class="fixed inset-0 bg-[#0A0A0A]/90 backdrop-blur-md z-[70] flex items-center justify-center p-4">
        <div class="bg-white border border-gray-200 shadow-2xl max-w-2xl w-full relative overflow-hidden group">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SYSTEM_FORM // LENDING_APPLICATION</div>
          
          <div class="p-8 border-b border-gray-100 relative z-10">
            <h3 class="text-2xl font-black font-outfit text-gray-900 uppercase tracking-tight flex items-center gap-3">
              <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
              Apply for Funding
            </h3>
          </div>

          <div class="p-8 space-y-8 relative z-10 max-h-[70vh] overflow-y-auto">
            <div class="space-y-4">
              <label class="block text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Funding amount needed</label>
              <input type="text" placeholder="K 50,000" class="w-full bg-gray-50 border border-gray-100 px-6 py-4 text-xl font-black font-outfit focus:bg-white focus:border-[#2F2E8B]/30 outline-none transition-all tabular-nums">
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <label class="block text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Purpose of funding</label>
                <select class="w-full bg-gray-50 border border-gray-100 px-4 py-3 text-[10px] font-mono font-black uppercase tracking-widest focus:bg-white focus:border-[#2F2E8B]/30 outline-none transition-all">
                  <option>Working Capital</option>
                  <option>Inventory Purchase</option>
                  <option>Equipment/Assets</option>
                  <option>Business Expansion</option>
                  <option>Marketing Campaign</option>
                </select>
              </div>
              <div class="space-y-4">
                <label class="block text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Repayment period</label>
                <select class="w-full bg-gray-50 border border-gray-100 px-4 py-3 text-[10px] font-mono font-black uppercase tracking-widest focus:bg-white focus:border-[#2F2E8B]/30 outline-none transition-all">
                  <option>3 months</option>
                  <option>6 months</option>
                  <option>12 months</option>
                  <option>24 months</option>
                </select>
              </div>
            </div>

            <div class="space-y-4">
              <label class="block text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Business description</label>
              <textarea rows="4" placeholder="BRIEFLY DESCRIBE YOUR BUSINESS AND HOW THE FUNDING WILL BE USED..." class="w-full bg-gray-50 border border-gray-100 px-6 py-4 text-[10px] font-mono font-bold uppercase tracking-widest focus:bg-white focus:border-[#2F2E8B]/30 outline-none transition-all"></textarea>
            </div>

            <div class="bg-[#2F2E8B]/5 border border-[#2F2E8B]/10 p-6 relative overflow-hidden">
              <div class="absolute inset-0 dotted-pattern opacity-[0.1] pointer-events-none"></div>
              <p class="text-[10px] font-mono font-bold text-[#2F2E8B] uppercase tracking-tight leading-relaxed relative z-10">
                <i class="fas fa-info-circle mr-2"></i>
                BASED ON AI AUDIT: HIGH APPROVAL PROBABILITY FOR FUNDING RANGE [K50,000 - K500,000].
              </p>
            </div>
          </div>

          <div class="p-8 bg-gray-50 flex gap-4 relative z-10">
            <button 
              @click="submitFundingApplication"
              class="flex-1 py-4 bg-[#2F2E8B] text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-[#1D226B] transition-all shadow-xl"
            >
              EXECUTE_APPLICATION
            </button>
            <button 
              @click="showFundingModal = false"
              class="px-8 py-4 bg-white border border-gray-200 text-gray-400 text-[10px] font-mono font-black uppercase tracking-widest hover:text-gray-900 transition-all"
            >
              TERMINATE
            </button>
          </div>
        </div>
      </div>

      <!-- Fundability Roadmap Modal -->
      <div v-if="showRoadmapModal" class="fixed inset-0 bg-[#0A0A0A]/90 backdrop-blur-md z-[70] flex items-center justify-center p-4">
        <div class="bg-white border border-gray-200 shadow-2xl max-w-3xl w-full relative overflow-hidden group">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SYSTEM_ROADMAP // CREDIT_OPTIMIZATION</div>
          
          <div class="p-8 border-b border-gray-100 relative z-10">
            <h3 class="text-2xl font-black font-outfit text-gray-900 uppercase tracking-tight flex items-center gap-3">
              <div class="w-1.5 h-6 bg-emerald-500"></div>
              Fundability Roadmap
            </h3>
          </div>

          <div class="p-8 space-y-8 relative z-10 max-h-[70vh] overflow-y-auto">
            <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Follow these recommendations to optimize credit score and funding eligibility:</p>
            
            <div class="space-y-6">
              <!-- Quick Wins -->
              <div class="border border-gray-100 bg-gray-50 p-6 relative">
                <div class="absolute top-0 right-0 bg-emerald-500 px-3 py-1 text-[8px] font-mono font-black text-white uppercase tracking-widest">IMMEDIATE_IMPACT</div>
                <h4 class="text-[10px] font-mono font-black text-gray-900 uppercase tracking-widest mb-4">Quick Wins</h4>
                <div class="space-y-3">
                  <div class="flex items-start gap-3 text-[10px] font-mono font-bold text-gray-600 uppercase tracking-tight leading-none bg-white p-3 border border-gray-100">
                    <span class="w-1.5 h-1.5 bg-emerald-500 mt-0.5"></span>
                    <span>Complete missing financial records for Aug 2025 // <span class="text-emerald-600">+25 PTS</span></span>
                  </div>
                  <div class="flex items-start gap-3 text-[10px] font-mono font-bold text-gray-600 uppercase tracking-tight leading-none bg-white p-3 border border-gray-100">
                    <span class="w-1.5 h-1.5 bg-emerald-500 mt-0.5"></span>
                    <span>Set up automated payment reminders // <span class="text-emerald-600">+15 PTS</span></span>
                  </div>
                </div>
              </div>
              
              <!-- Medium Term -->
              <div class="border border-gray-100 bg-gray-50 p-6 relative">
                <div class="absolute top-0 right-0 bg-amber-500 px-3 py-1 text-[8px] font-mono font-black text-white uppercase tracking-widest">1-3_MONTH_WINDOW</div>
                <h4 class="text-[10px] font-mono font-black text-gray-900 uppercase tracking-widest mb-4">Medium-Term Goals</h4>
                <div class="space-y-3">
                  <div class="flex items-start gap-3 text-[10px] font-mono font-bold text-gray-600 uppercase tracking-tight leading-none bg-white p-3 border border-gray-100">
                    <span class="w-1.5 h-1.5 bg-amber-500 mt-0.5"></span>
                    <span>Optimize profit margin to 22% target // <span class="text-emerald-600">+30 PTS</span></span>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-[#2F2E8B] p-8 relative overflow-hidden group/target">
              <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
              <h4 class="text-[10px] font-mono font-black text-white/50 uppercase tracking-widest mb-4 relative z-10">Potential Score Improvement</h4>
              <div class="flex items-end justify-between relative z-10">
                <div>
                  <p class="text-[10px] font-mono font-black text-white uppercase tracking-widest mb-1">Target_Equilibrium</p>
                  <span class="text-5xl font-black font-outfit text-white tracking-tighter tabular-nums">920</span>
                </div>
                <div class="text-right">
                  <span class="text-[9px] font-mono font-black text-white/50 uppercase block mb-1">DELTA_INDEX</span>
                  <span class="text-2xl font-black font-outfit text-emerald-400 tracking-tighter">+155 // PTS</span>
                </div>
              </div>
            </div>
          </div>

          <div class="p-8 bg-gray-50 flex gap-4 relative z-10">
            <button 
              @click="showRoadmapModal = false"
              class="w-full py-4 bg-[#2F2E8B] text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-[#1D226B] transition-all shadow-xl"
            >
              CLOSE_ROADMAP // SESSION_TERMINATE
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
// Add missing methods for credit score color
const getCreditScoreHex = (score) => {
  if (score >= 800) return '#10B981' // green
  if (score >= 650) return '#3B82F6' // blue
  if (score >= 500) return '#F59E0B' // yellow
  return '#EF4444' // red
}

import { computed, ref } from 'vue'
import { workflowResult } from '@/composables/useStrategicWorkflow'
import { useRouter } from 'vue-router'
import StrategicNavigation from './components/StrategicNavigation.vue'

const router = useRouter()
const isRefreshing = ref(false)
const showFundingModal = ref(false)
const showRoadmapModal = ref(false)

const creditScore = computed(() => workflowResult.value?.creditScore || workflowResult.value?.credit_score || { score: 0, rating: '', change: 0, changeReason: '', components: [], explanations: [] })
const matchedFunders = computed(() => workflowResult.value?.matchedFunders || workflowResult.value?.matched_funders || [])
const fintechPartners = computed(() => workflowResult.value?.fintechPartners || workflowResult.value?.fintech_partners || [])

// Debug: log data to verify
console.log('FundingSubpage - creditScore:', creditScore.value)
console.log('FundingSubpage - matchedFunders:', matchedFunders.value)
console.log('FundingSubpage - fintechPartners:', fintechPartners.value)
const activeTab = ref('funding')
const selectedLanguage = ref('en')
</script>

<style scoped>
</style>
