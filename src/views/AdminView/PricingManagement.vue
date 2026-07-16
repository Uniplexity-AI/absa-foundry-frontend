
<template>
  <div class="min-h-screen flex flex-col font-sans relative text-gray-900">
    
    <!-- Mesh Background -->
    <!-- Mesh Background (Fixed to viewport to prevent cutoff on scroll) -->
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>
    
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-2 h-8 bg-[#2F2E8B] rounded-sm"></div>
          <div>
              <div class="flex items-center gap-2">
                 <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">SYS_ADMIN // MODULE</span>
              </div>
              <h1 class="text-xl font-black text-gray-900 uppercase tracking-tight">Pricing Configuration</h1>
          </div>
        </div>
        
        <div class="flex items-center gap-3">
           <span v-if="pricingStore.loading" class="text-xs font-mono text-gray-500 animate-pulse uppercase">SYNCING_DATA...</span>
           
           <button 
             @click="refreshData" 
             :disabled="pricingStore.loading"
             class="border border-gray-300 hover:border-gray-400 text-gray-600 px-4 py-2 rounded-sm text-xs font-bold font-mono uppercase transition-all flex items-center gap-2 bg-white"
           >
             <i class="fas fa-undo"></i> Reset
           </button>

           <button 
             @click="saveChanges" 
             :disabled="pricingStore.loading"
             class="bg-[#2F2E8B] hover:bg-[#1D226B] text-white px-6 py-2 rounded-sm text-xs font-bold font-mono uppercase shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
           >
             <i class="fas fa-save"></i>
             SAVE_CHANGES
           </button>
        </div>
      </div>
    </header>

    <main class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-40 relative z-10">
      
      <div v-if="pricingStore.loading && !localConfig" class="flex items-center justify-center h-64">
         <div class="flex flex-col items-center gap-4">
             <div class="w-12 h-12 border-4 border-[#2F2E8B] border-t-transparent rounded-full animate-spin"></div>
             <span class="text-xs font-mono text-gray-400 uppercase tracking-widest">LOADING_SYSTEM_CONFIG...</span>
         </div>
      </div>

      <div v-else-if="localConfig" class="space-y-8">
        
        <!-- Tabs -->
        <div class="border-b border-gray-200 bg-white/50 backdrop-blur-sm sticky top-16 z-20 -mx-4 px-4 sm:mx-0 sm:px-0">
          <nav class="-mb-px flex space-x-8 overflow-x-auto scrollbar-hide" aria-label="Tabs">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="currentTab = tab.id"
              :class="[
                currentTab === tab.id
                  ? 'border-[#2F2E8B] text-[#2F2E8B]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-bold text-xs font-mono uppercase tracking-wider transition-colors'
              ]"
            >
              {{ tab.name }}
            </button>
          </nav>
        </div>

        <!-- Global Settings Tab -->
        <div v-if="currentTab === 'global'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
           <!-- General Config -->
           <div class="bg-white p-6 border border-gray-200 shadow-sm relative group hover:border-blue-300 transition-colors rounded-sm">
              <div class="absolute top-0 left-0 w-1 h-full bg-[#2F2E8B] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight mb-6 flex items-center gap-2">
                 <i class="fas fa-sliders-h text-gray-400 text-xs"></i> General Configuration
              </h3>
              <div class="space-y-5">
                 <div>
                    <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Base Currency Symbol</label>
                    <input type="text" v-model="localConfig.baseCurrency" class="w-full border-gray-300 rounded-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] font-mono text-sm font-bold bg-gray-50">
                 </div>
                 <div>
                    <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Trial Period (Days)</label>
                    <input type="number" v-model.number="localConfig.trialPeriodDays" class="w-full border-gray-300 rounded-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] font-mono text-sm font-bold bg-gray-50">
                 </div>
              </div>
           </div>

           <!-- Currency Configuration -->
           <div class="bg-white p-6 border border-gray-200 shadow-sm relative group hover:border-blue-300 transition-colors rounded-sm">
              <div class="absolute top-0 left-0 w-1 h-full bg-[#2F2E8B] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight mb-6 flex items-center gap-2">
                 <i class="fas fa-dollar-sign text-gray-400 text-xs"></i> Currency Options
              </h3>
              <div class="space-y-5">
                 <div v-for="(cur, ck) in (localConfig.currencies || defaultCurrencies)" :key="ck" class="bg-gray-50 p-3 rounded-sm border border-gray-100">
                    <div class="flex items-center gap-2 mb-2">
                       <span class="text-[10px] font-mono font-bold text-gray-400 uppercase">{{ ck }}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                       <div>
                          <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase mb-1">Symbol</label>
                          <input type="text" v-model="cur.symbol" class="w-full border-gray-300 rounded-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] font-mono text-sm font-bold bg-white">
                       </div>
                       <div>
                          <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase mb-1">Label</label>
                          <input type="text" v-model="cur.label" class="w-full border-gray-300 rounded-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] font-mono text-sm bg-white">
                       </div>
                    </div>
                    <div class="mt-2">
                       <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase mb-1">Exchange Rate (to base K)</label>
                       <input type="number" v-model.number="cur.rate" step="0.01" class="w-full border-gray-300 rounded-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] font-mono text-sm font-bold bg-white">
                    </div>
                    <div v-if="ck !== 'zmw'" class="mt-2 text-[10px] font-mono font-bold text-[#2F2E8B] bg-blue-50 px-2 py-1 rounded-sm">
                      {{ cur.symbol }}1 = K{{ cur.rate }}
                    </div>
                 </div>
              </div>
           </div>
           
           <!-- Limits -->
           <div class="bg-white p-6 border border-gray-200 shadow-sm relative group hover:border-blue-300 transition-colors rounded-sm">
              <div class="absolute top-0 left-0 w-1 h-full bg-[#2F2E8B] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight mb-6 flex items-center gap-2">
                 <i class="fas fa-building text-gray-400 text-xs"></i> Enterprise Base Limits
              </h3>
              <div class="space-y-5">
                 <div>
                    <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Base Included Users</label>
                    <input type="number" v-model.number="localConfig.enterpriseBaseUsers" class="w-full border-gray-300 rounded-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] font-mono text-sm font-bold bg-gray-50">
                 </div>
                 <div>
                    <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Base Included Branches</label>
                    <input type="number" v-model.number="localConfig.enterpriseBaseBranches" class="w-full border-gray-300 rounded-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] font-mono text-sm font-bold bg-gray-50">
                 </div>
              </div>
           </div>

           <!-- Surcharges -->
           <div class="bg-white p-6 border border-gray-200 shadow-sm relative group hover:border-blue-300 transition-colors rounded-sm">
              <div class="absolute top-0 left-0 w-1 h-full bg-[#2F2E8B] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight mb-6 flex items-center gap-2">
                 <i class="fas fa-percentage text-gray-400 text-xs"></i> Capacity Surcharges
              </h3>
              <div class="space-y-5">
                 <div>
                    <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Extra User Cost (% of Base)</label>
                    <input type="number" v-model.number="localConfig.surcharges.extraUserPercentage" class="w-full border-gray-300 rounded-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] font-mono text-sm font-bold bg-gray-50">
                 </div>
                 <div>
                    <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Extra Branch Cost (% of Base)</label>
                    <input type="number" v-model.number="localConfig.surcharges.extraBranchPercentage" class="w-full border-gray-300 rounded-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] font-mono text-sm font-bold bg-gray-50">
                 </div>
              </div>
           </div>
        </div>

        <!-- Tiers Tab -->
        <div v-if="currentTab === 'tiers'" class="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
           <div v-for="(tier, key) in localConfig.tiers" :key="key" class="bg-white p-6 border border-gray-200 shadow-sm relative group hover:shadow-lg transition-all rounded-sm hover:border-[#2F2E8B]">
              <!-- Key Label -->
              <div class="absolute top-0 right-0 bg-gray-100 px-3 py-1 text-[10px] font-mono font-bold text-gray-500 uppercase rounded-bl-sm">
                 ID: {{ key }}
              </div>
              
              <div class="mb-6 mt-2">
                 <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Tier Label</label>
                 <input type="text" v-model="tier.label" class="w-full border-gray-300 rounded-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] font-black text-lg uppercase tracking-tight text-gray-900">
              </div>    
              
              <div class="mb-6">
                 <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Description</label>
                 <textarea v-model="tier.description" rows="2" class="w-full border-gray-300 rounded-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] text-sm text-gray-600 font-mono"></textarea>
              </div>

              <div class="grid grid-cols-4 gap-4 bg-gray-50 p-4 border border-gray-100 rounded-sm">
                 <div>
                    <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Max Users</label>
                    <input type="number" v-model.number="tier.maxUsers" class="w-full border-gray-300 rounded-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] font-mono text-sm font-bold text-center">
                 </div>
                 <div>
                    <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Max Branches</label>
                    <input type="number" v-model.number="tier.maxBranches" class="w-full border-gray-300 rounded-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] font-mono text-sm font-bold text-center">
                 </div>
                 <div>
                    <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Storage (MB)</label>
                    <input type="number" v-model.number="tier.baseStorageMB" class="w-full border-gray-300 rounded-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] font-mono text-sm font-bold text-center">
                 </div>
                 <div>
                    <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Discount %</label>
                    <input type="number" v-model.number="tier.discountPercentage" class="w-full border-gray-300 rounded-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] font-mono text-sm font-bold text-center">
                 </div>
              </div>

              <!-- Allowed Modules -->
              <div class="mt-4">
                 <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-2">
                    <i class="fas fa-lock mr-1"></i> Allowed Modules (empty = all)
                 </label>
                 <div class="flex flex-wrap gap-1.5">
                    <span 
                       v-for="mod in getAllModuleIds()" 
                       :key="mod"
                       @click="toggleTierModule(tier, mod)"
                       class="px-2 py-1 text-[9px] font-mono font-bold cursor-pointer rounded-sm border transition-colors select-none"
                       :class="tierAllowedModules(tier).includes(mod) ? 'bg-[#2F2E8B] text-white border-[#2F2E8B]' : 'bg-white text-gray-400 border-gray-200 hover:border-gray-400'"
                    >{{ mod }}</span>
                 </div>
              </div>

           </div>
        </div>

        <!-- Modules Tab -->
        <div v-if="currentTab === 'modules'" class="space-y-8 animate-fade-in">
           <div v-for="(category, catIdx) in localConfig.modules" :key="catIdx" class="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden hover:border-gray-300 transition-colors">
              <div class="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center group">
                 <div class="flex items-center gap-3 w-full">
                    <div class="w-1.5 h-1.5 bg-[#2F2E8B] rounded-sm"></div>
                    <input type="text" v-model="category.category" class="bg-transparent border-none p-0 font-black text-gray-900 uppercase tracking-tight focus:ring-0 w-full text-base" />
                 </div>
                 <button @click="removeCategory(catIdx)" class="text-gray-300 hover:text-red-600 transition-colors px-2"><i class="fas fa-trash-alt"></i></button>
              </div>
              
              <div class="p-6 grid grid-cols-1 gap-4">
                 <div v-for="(module, modIdx) in category.items" :key="module.id" class="flex flex-col md:flex-row gap-6 p-5 border border-dashed border-gray-200 rounded-sm hover:border-[#2F2E8B]/50 hover:bg-blue-50/20 transition-all bg-white">
                    
                    <div class="flex-1 space-y-4">
                       <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
                          <!-- ID (Read only mostly, but editable if needed) -->
                           <div class="md:col-span-2">
                             <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase mb-1">ID</label>
                             <input type="text" v-model="module.id" disabled class="w-full bg-gray-50 border-gray-200 rounded-sm px-2 py-1 text-xs font-mono text-gray-500 cursor-not-allowed">
                          </div>

                          <div class="md:col-span-7">
                             <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase mb-1">Module Name</label>
                             <input type="text" v-model="module.name" class="w-full border-gray-300 rounded-sm px-2 py-1 text-sm font-bold text-gray-900 focus:ring-[#2F2E8B] focus:border-[#2F2E8B]">
                          </div>
                          
                          <div class="md:col-span-2">
                             <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase mb-1">Price</label>
                             <div class="relative">
                                <span class="absolute left-2 top-1.5 text-gray-400 text-xs font-mono font-bold">{{ localConfig.baseCurrency }}</span>
                                <input type="number" v-model.number="module.price" class="w-full border-gray-300 rounded-sm pl-6 py-1 text-sm font-bold font-mono focus:ring-[#2F2E8B] focus:border-[#2F2E8B]">
                             </div>
                          </div>
                          
                          <div class="md:col-span-1 flex items-end justify-end pb-1">
                              <button @click="removeModule(category, modIdx)" class="text-gray-300 hover:text-red-500 transition-colors"><i class="fas fa-times"></i></button>
                          </div>
                       </div>
                       
                       <div>
                          <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase mb-1">Description</label>
                          <input type="text" v-model="module.description" class="w-full border-gray-300 rounded-sm px-2 py-1 text-xs font-mono focus:ring-[#2F2E8B] focus:border-[#2F2E8B]" placeholder="Optional description">
                       </div>

                       <!-- Description Points -->
                       <div>
                          <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase mb-1.5">
                             <i class="fas fa-list-ul mr-1 text-[8px]"></i> Description Points
                          </label>
                          <div class="space-y-1.5">
                             <div v-for="(point, pIdx) in module.descriptionPoints" :key="'dp-'+pIdx" class="flex items-center gap-2">
                                <span class="text-gray-300 text-[10px] font-mono w-4 text-right shrink-0">{{ pIdx + 1 }}.</span>
                                <input type="text" v-model="module.descriptionPoints[pIdx]" class="flex-1 border-gray-200 rounded-sm px-2 py-1 text-xs font-mono focus:ring-[#2F2E8B] focus:border-[#2F2E8B] bg-gray-50/50" placeholder="Description point">
                                <button @click="module.descriptionPoints.splice(pIdx, 1)" class="text-gray-300 hover:text-red-500 transition-colors text-xs shrink-0"><i class="fas fa-times"></i></button>
                             </div>
                             <button @click="if(!module.descriptionPoints) module.descriptionPoints = []; module.descriptionPoints.push('')" class="text-[10px] font-mono font-bold text-gray-400 hover:text-[#2F2E8B] transition-colors flex items-center gap-1 mt-1">
                                <i class="fas fa-plus text-[8px]"></i> ADD POINT
                             </button>
                          </div>
                       </div>

                       <!-- Key Features -->
                       <div>
                          <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase mb-1.5">
                             <i class="fas fa-star mr-1 text-[8px]"></i> Key Features
                          </label>
                          <div class="space-y-1.5">
                             <div v-for="(feat, fIdx) in module.keyFeatures" :key="'kf-'+fIdx" class="flex items-center gap-2">
                                <span class="text-[#2F2E8B] text-[10px] shrink-0"><i class="fas fa-check"></i></span>
                                <input type="text" v-model="module.keyFeatures[fIdx]" class="flex-1 border-gray-200 rounded-sm px-2 py-1 text-xs font-mono focus:ring-[#2F2E8B] focus:border-[#2F2E8B] bg-gray-50/50" placeholder="Key feature">
                                <button @click="module.keyFeatures.splice(fIdx, 1)" class="text-gray-300 hover:text-red-500 transition-colors text-xs shrink-0"><i class="fas fa-times"></i></button>
                             </div>
                             <button @click="if(!module.keyFeatures) module.keyFeatures = []; module.keyFeatures.push('')" class="text-[10px] font-mono font-bold text-gray-400 hover:text-[#2F2E8B] transition-colors flex items-center gap-1 mt-1">
                                <i class="fas fa-plus text-[8px]"></i> ADD FEATURE
                             </button>
                          </div>
                       </div>
                    </div>

                    <!-- Toggles -->
                    <div class="w-full md:w-48 flex flex-col gap-3 justify-center border-l pl-6 border-gray-100">
                       <label class="flex items-center space-x-3 cursor-pointer group">
                          <input type="checkbox" v-model="module.included" class="rounded-sm text-[#2F2E8B] focus:ring-[#2F2E8B] border-gray-300 h-4 w-4">
                          <span class="text-[10px] font-bold text-gray-600 uppercase group-hover:text-[#2F2E8B] transition-colors">Included Free</span>
                       </label>
                       
                       <label class="flex items-center space-x-3 cursor-pointer group">
                          <input type="checkbox" v-model="module.isConsultation" class="rounded-sm text-[#2F2E8B] focus:ring-[#2F2E8B] border-gray-300 h-4 w-4">
                          <span class="text-[10px] font-bold text-gray-600 uppercase group-hover:text-[#2F2E8B] transition-colors">Consultation</span>
                       </label>

                       <label class="flex items-center space-x-3 cursor-pointer group">
                          <input type="checkbox" v-model="module.isPerUnit" class="rounded-sm text-[#2F2E8B] focus:ring-[#2F2E8B] border-gray-300 h-4 w-4">
                          <span class="text-[10px] font-bold text-gray-600 uppercase group-hover:text-[#2F2E8B] transition-colors">Per Unit</span>
                       </label>
                    </div>

                 </div>
                 
                 <!-- Add Module Button -->
                 <button @click="addModule(category)" class="w-full py-3 border-2 border-dashed border-gray-200 rounded-sm text-gray-400 hover:border-[#2F2E8B] hover:text-[#2F2E8B] transition-all text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2">
                    <i class="fas fa-plus"></i> Add Module to {{ category.category }}
                 </button>
              </div>
           </div>
        </div>

        <!-- Billing Cycles Tab -->
        <div v-if="currentTab === 'cycles'" class="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
           <div v-for="(cycle, key) in localConfig.billingCycles" :key="key" class="bg-white p-6 border border-gray-200 shadow-sm rounded-sm hover:border-[#2F2E8B] group transition-all">
              <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight mb-6">{{ key }} Cycle</h3>
              
              <div class="space-y-4">
                 <div>
                    <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Display Label</label>
                    <input type="text" v-model="cycle.label" class="w-full border-gray-300 rounded-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] font-bold">
                 </div>
                 
                 <div>
                     <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Discount (% Off)</label>
                    <input type="number" v-model.number="cycle.discountPercentage" class="w-full border-gray-300 rounded-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] font-mono font-bold text-lg">
                 </div>
              </div>
           </div>
        </div>

      </div>
    </main>

  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { usePricingStore } from '@/stores/pricingStore';

const pricingStore = usePricingStore();
const localConfig = ref(null);
const currentTab = ref('global');

const tabs = [
  { id: 'global', name: 'Global Settings' },
  { id: 'tiers', name: 'Plan Tiers' },
  { id: 'modules', name: 'Modules & Add-ons' },
  { id: 'cycles', name: 'Billing Cycles' }
];

// Default currencies fallback for display when backend data is missing
const defaultCurrencies = {
  zmw: { symbol: 'K', label: 'ZMW (Kwacha)', rate: 1 },
  usd: { symbol: '$', label: 'USD (Dollar)', rate: 20 },
};

// Ensure currencies and tier fields exist on the loaded config
const ensureConfigDefaults = (cfg) => {
  if (!cfg) return cfg;
  // Ensure currencies
  if (!cfg.currencies || Object.keys(cfg.currencies).length === 0) {
    cfg.currencies = JSON.parse(JSON.stringify(defaultCurrencies));
  }
  // Ensure baseCurrencyLabel
  if (!cfg.baseCurrencyLabel) {
    cfg.baseCurrencyLabel = 'ZMW (Kwacha)';
  }
  // Ensure each tier has allowedModules and baseStorageMB
  if (cfg.tiers) {
    Object.values(cfg.tiers).forEach(tier => {
      if (!tier.allowedModules) tier.allowedModules = [];
      if (tier.baseStorageMB === undefined) tier.baseStorageMB = 1024;
    });
  }
  return cfg;
};

onMounted(async () => {
   await pricingStore.fetchConfig();
   // Deep copy to allow editing without immediate state mutation/issues
   if (pricingStore.config) {
     localConfig.value = ensureConfigDefaults(JSON.parse(JSON.stringify(pricingStore.config)));
   }
});

const refreshData = async () => {
   if (confirm('Are you sure you want to discard unsaved changes?')) {
     await pricingStore.fetchConfig();
     if (pricingStore.config) {
       localConfig.value = ensureConfigDefaults(JSON.parse(JSON.stringify(pricingStore.config)));
     }
   }
};

const saveChanges = async () => {
   if (!localConfig.value) return;
   
   try {
     const success = await pricingStore.updateConfig(localConfig.value);
     if (success) {
       // alert('Configuration saved successfully!'); // Optional: replaced with toast if avail, or just status
     }
   } catch (e) {
     alert('Failed to save configuration.');
     console.error(e);
   }
};

const addModule = (category) => {
  const newModule = {
    id: `new_module_${Date.now()}`,
    name: 'New Module',
    price: 0,
    description: '',
    descriptionPoints: [],
    keyFeatures: [],
    included: false,
    isConsultation: false,
    isPerUnit: false
  };
  category.items.push(newModule);
};

const removeModule = (category, index) => {
  if (confirm('Are you sure you want to delete this module?')) {
    category.items.splice(index, 1);
  }
};

const removeCategory = (index) => {
  if (confirm('Are you sure you want to delete this entire category and all its modules?')) {
    localConfig.value.modules.splice(index, 1);
  }
};

// Helper: get all module IDs for allowedModules tag editor
const getAllModuleIds = () => {
  if (!localConfig.value?.modules) return [];
  const ids = [];
  localConfig.value.modules.forEach(cat => {
    cat.items.forEach(mod => ids.push(mod.id));
  });
  return ids;
};

// Helper: get allowedModules array for a tier (ensure it exists)
const tierAllowedModules = (tier) => {
  if (!tier.allowedModules) tier.allowedModules = [];
  return tier.allowedModules;
};

// Helper: toggle a module ID in a tier's allowedModules
const toggleTierModule = (tier, modId) => {
  if (!tier.allowedModules) tier.allowedModules = [];
  const idx = tier.allowedModules.indexOf(modId);
  if (idx >= 0) {
    tier.allowedModules.splice(idx, 1);
  } else {
    tier.allowedModules.push(modId);
  }
};

</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Mesh Background Pattern */
.mesh-background {
  background-color: #ffffff;
  background-image: 
    linear-gradient(#f3f4f6 1px, transparent 1px),
    linear-gradient(90deg, #f3f4f6 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: center center;
}

</style>
