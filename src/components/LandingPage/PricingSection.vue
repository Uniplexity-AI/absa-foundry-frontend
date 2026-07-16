<template>
  <section id="pricing" class="py-24 bg-white relative overflow-hidden">
    <!-- Mesh Background -->
    <div class="absolute inset-0 z-0 pointer-events-none mesh-background"></div>

    <!-- Blueprint Shapes -->
    <div class="absolute top-20 right-0 w-64 h-64 border border-gray-200 rounded-full opacity-50 -mr-32 -mt-32 pointer-events-none"></div>
    <div class="absolute bottom-20 left-0 w-48 h-48 border border-gray-200 rounded-full opacity-50 -ml-24 -mb-24 pointer-events-none"></div>
    <div class="absolute top-1/2 left-10 w-4 h-4 border border-[#2F2E8B] rounded-full opacity-20 pointer-events-none"></div>
    <div class="absolute top-1/3 right-10 w-3 h-3 bg-[#2F2E8B] rounded-full opacity-10 pointer-events-none"></div>

    <div class="container mx-auto px-6 relative z-10">

      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <h2 class="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tight mb-4">
            CHOOSE A PLAN
          </h2>
          <div class="h-1 w-24 bg-[#2F2E8B] mb-4"></div>
          <p class="font-mono text-sm text-gray-500 uppercase tracking-widest">
            // PICK WHAT FITS YOUR TEAM
          </p>
        </div>

        <!-- Billing Cycle Toggle -->
        <div class="flex items-center gap-4 bg-white border border-gray-200 p-1.5 rounded-lg shadow-sm">
          <span class="text-[10px] font-mono font-bold text-gray-400 uppercase pl-2">BILLING //</span>
          <div class="flex">
            <button
              @click="cycle = 'monthly'"
              class="px-4 py-2 text-xs font-bold font-mono uppercase tracking-wider rounded-md transition-all duration-300"
              :class="cycle === 'monthly' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'"
            >MNTH</button>
            <button
              @click="cycle = 'quarterly'"
              class="px-4 py-2 text-xs font-bold font-mono uppercase tracking-wider rounded-md transition-all duration-300"
              :class="cycle === 'quarterly' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'"
            >QTR</button>
            <button
              @click="cycle = 'yearly'"
              class="px-4 py-2 text-xs font-bold font-mono uppercase tracking-wider rounded-md transition-all duration-300 relative"
              :class="cycle === 'yearly' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'"
            >
              YEAR
              <span v-if="cycle !== 'yearly'" class="absolute -top-2 -right-2 flex h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2F2E8B] opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-[#2F2E8B]"></span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Tiers Grid (driven by pricingConfig) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        <div
          v-for="(tier, index) in sortedTiers"
          :key="tier.id"
          class="group relative bg-white border hover:border-[#2F2E8B] transition-all duration-300 flex flex-col h-full overflow-hidden cursor-pointer"
          :class="tier.id === 'small' ? 'border-[#2F2E8B] bg-[#2F2E8B]/5 lg:-translate-y-2 shadow-xl' : 'border-gray-200 hover:shadow-lg'"
          @click="selectedTier = tier.id"
        >
          <!-- Tech Header -->
          <div class="p-5 border-b border-gray-100 bg-gray-50/50">
            <div class="flex justify-between items-start mb-4">
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <i class="fas fa-cube text-[#2F2E8B] text-xs"></i>
                  <span class="text-[10px] font-mono text-gray-400 uppercase">PLAN_{{ String(index + 1).padStart(2, '0') }}</span>
                </div>
                <h3 class="text-xl font-black text-gray-900 uppercase tracking-tight">{{ tier.label }}</h3>
              </div>
              <div v-if="tier.id === 'small'" class="px-2 py-1 bg-[#2F2E8B] text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">
                MOST CHOSEN
              </div>
            </div>

            <!-- Discount Badge -->
            <div class="flex items-baseline gap-2">
              <span class="text-3xl font-black text-gray-900 tracking-tighter">
                {{ tier.discountPercentage > 0 ? tier.discountPercentage + '% OFF' : 'START' }}
              </span>
            </div>
            <div class="mt-2 text-xs font-mono text-gray-400 uppercase">
              {{ cycleLabel }} · Up to {{ tier.maxUsers }} users · {{ tier.maxBranches }} branch{{ tier.maxBranches > 1 ? 'es' : '' }}
            </div>

            <!-- Cycle Saving Badge -->
            <div v-if="cycleDiscount > 0" class="mt-2 inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 border border-green-200 text-green-700 text-[10px] font-mono font-bold uppercase rounded">
              <i class="fas fa-tag text-[9px]"></i> +{{ cycleDiscount }}% savings
            </div>
          </div>

          <!-- Description (from pricingConfig) -->
          <div class="p-5 flex-1 bg-white">
            <p class="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide border-b border-gray-100 pb-2">
              What’s included
            </p>

            <!-- Tier description text -->
            <p class="text-xs text-gray-500 italic mb-4 leading-relaxed">{{ tier.description }}</p>

            <!-- KEY SPECS from tier data -->
            <ul class="space-y-2.5">
              <li
                v-for="(point, i) in tierPoints(tier)"
                :key="i"
                class="flex items-start gap-3 group/item"
              >
                <div class="mt-0.5 w-4 h-4 flex-shrink-0 flex items-center justify-center border border-gray-200 rounded-sm bg-gray-50 group-hover/item:border-[#2F2E8B]/30 group-hover/item:bg-[#2F2E8B]/5 transition-colors">
                  <i class="fas fa-check text-[9px] text-[#2F2E8B]"></i>
                </div>
                <span class="text-xs text-gray-600 font-medium group-hover/item:text-gray-900 transition-colors leading-relaxed">{{ point }}</span>
              </li>
            </ul>
          </div>

          <!-- Action Footer -->
          <div class="p-4 border-t border-gray-100 bg-gray-50/30 mt-auto">
            <router-link
              to="/pricing"
              class="w-full py-3 text-sm font-bold font-mono uppercase tracking-wider border-2 transition-all duration-300 flex items-center justify-center gap-3 group/btn relative overflow-hidden"
              :class="tier.id === 'small'
                ? 'bg-[#2F2E8B] border-[#2F2E8B] text-white hover:bg-[#1D226B] hover:border-[#1D226B]'
                : 'bg-white border-gray-200 text-gray-900 hover:border-gray-900 hover:bg-gray-50'"
            >
              <span class="relative z-10">Compare plan</span>
              <i class="fas fa-chevron-right text-xs relative z-10 group-hover/btn:translate-x-1 transition-transform"></i>
            </router-link>

            <!-- Tech Specs Footer -->
            <div class="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-gray-200/50">
              <div class="flex flex-col">
                <span class="text-[9px] font-mono text-gray-400 uppercase">PLAN ID</span>
                <span class="text-[10px] font-mono text-gray-700 font-bold">{{ tier.id.toUpperCase().slice(0,3) }}</span>
              </div>
              <div class="flex flex-col text-right">
                <span class="text-[9px] font-mono text-gray-400 uppercase">STATUS</span>
                <span class="text-[10px] font-mono text-green-600 font-bold">READY</span>
              </div>
            </div>
          </div>

          <!-- Hover Corner Accent -->
          <div class="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden">
            <div class="absolute top-0 right-0 w-0 h-0 border-t-[32px] border-l-[32px] border-t-[#2F2E8B]/0 border-l-transparent group-hover:border-t-[#2F2E8B]/20 transition-all duration-300"></div>
          </div>
        </div>
      </div>

      <!-- ── Module Showcase Strip ── -->
      <div class="mt-20">
        <div class="flex items-center gap-4 mb-8">
          <div class="h-px flex-1 bg-gray-200"></div>
          <span class="font-mono text-xs text-gray-400 uppercase tracking-widest">// ADD-ONS</span>
          <div class="h-px flex-1 bg-gray-200"></div>
        </div>

        <!-- Category Tabs -->
        <div class="flex flex-wrap gap-2 mb-8">
          <button
            v-for="cat in moduleCategories"
            :key="cat"
            @click="activeCategory = cat"
            class="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider border transition-all duration-200"
            :class="activeCategory === cat
              ? 'bg-[#2F2E8B] border-[#2F2E8B] text-white'
              : 'bg-white border-gray-200 text-gray-500 hover:border-[#2F2E8B] hover:text-[#2F2E8B]'"
          >
            {{ cat }}
          </button>
        </div>

        <!-- Module Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="mod in activeCategoryModules"
            :key="mod.id"
            class="group relative bg-white border border-gray-200 hover:border-[#2F2E8B] transition-all duration-300 p-5 hover:shadow-lg"
          >
            <!-- Module Header -->
            <div class="flex items-start justify-between mb-3">
              <div>
                <span class="text-[9px] font-mono text-gray-400 uppercase block mb-1">
                  {{ mod.isPerUnit ? 'PER UNIT' : mod.isConsultation ? 'QUOTE' : mod.included ? 'INCLUDED' : 'ADD-ON' }}
                </span>
                <h4 class="text-sm font-black text-gray-900 uppercase tracking-tight">{{ mod.name }}</h4>
              </div>
              <div class="flex-shrink-0 ml-3">
                <span
                  class="px-2 py-1 text-[10px] font-mono font-bold uppercase border"
                  :class="mod.included
                    ? 'bg-green-50 border-green-200 text-green-700'
                    : mod.isConsultation
                    ? 'bg-purple-50 border-purple-200 text-purple-700'
                    : 'bg-blue-50 border-blue-200 text-blue-700'"
                >
                  {{ mod.isConsultation ? 'QUOTE' : mod.included ? 'INCLUDED' : 'K' + mod.price + (mod.isPerUnit ? '/unit' : '/mo') }}
                </span>
              </div>
            </div>

            <!-- Description -->
            <p class="text-xs text-gray-500 leading-relaxed mb-4">{{ mod.description }}</p>

            <!-- Description Points -->
            <ul v-if="mod.descriptionPoints && mod.descriptionPoints.length" class="space-y-1.5 mb-4">
              <li
                v-for="(pt, i) in mod.descriptionPoints"
                :key="i"
                class="flex items-start gap-2 text-xs text-gray-600"
              >
                <span class="mt-0.5 text-[#2F2E8B] font-bold flex-shrink-0">›</span>
                <span>{{ pt }}</span>
              </li>
            </ul>

            <!-- Key Features Pills -->
            <div v-if="mod.keyFeatures && mod.keyFeatures.length" class="flex flex-wrap gap-1.5 pt-3 border-t border-gray-100">
              <span
                v-for="(kf, i) in mod.keyFeatures"
                :key="i"
                class="px-2 py-0.5 bg-gray-50 border border-gray-200 text-[10px] font-mono text-gray-600 group-hover:border-[#2F2E8B]/30 group-hover:text-[#2F2E8B] transition-colors"
              >
                {{ kf }}
              </span>
            </div>
          </div>
        </div>

        <!-- CTA to full pricing calculator -->
        <div class="mt-10 flex justify-center">
          <router-link
            to="/pricing"
            class="inline-flex items-center gap-3 px-8 py-4 bg-[#2F2E8B] text-white font-mono font-bold uppercase tracking-widest text-sm hover:bg-[#1D226B] transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            <span>See pricing</span>
            <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </router-link>
        </div>
      </div>

      <!-- Bottom Decorative Bar -->
      <div class="mt-16 border-t border-gray-200 py-4 flex justify-between items-center opacity-50">
        <span class="font-mono text-[10px] text-gray-400">SYS_VER_2.4.0</span>
        <div class="flex gap-1">
          <div class="w-1 h-1 bg-gray-300 rounded-full"></div>
          <div class="w-1 h-1 bg-gray-300 rounded-full"></div>
          <div class="w-1 h-1 bg-gray-300 rounded-full"></div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { pricingConfig } from '@/config/pricingConfig';

// ── Billing Cycle ──────────────────────────────────────────────────────────────
const cycle = ref('monthly');

const cycleDiscount = computed(() => {
  return pricingConfig.billingCycles[cycle.value]?.discountPercentage ?? 0;
});

const cycleLabel = computed(() => {
  const map = { monthly: 'MONTHLY', quarterly: 'QUARTERLY', yearly: 'ANNUAL' };
  return map[cycle.value] ?? 'MONTHLY';
});

// ── Tiers ──────────────────────────────────────────────────────────────────────
const tierOrder = ['micro', 'small', 'medium', 'enterprise'];

const sortedTiers = computed(() =>
  tierOrder.map(id => pricingConfig.tiers[id]).filter(Boolean)
);

const selectedTier = ref('small');

// Points to show in each tier card
function tierPoints(tier) {
  const base = [
    `Up to ${tier.maxUsers} system user${tier.maxUsers > 1 ? 's' : ''}`,
    `${tier.maxBranches} branch${tier.maxBranches > 1 ? 'es' : ''} included`,
  ];
  const map = {
    micro:      ['Full core module access', 'Basic reporting suite', 'Community support'],
    small:      ['Inventory & sales tools', 'Standard analytics', 'Priority email support'],
    medium:     ['Advanced reporting', 'Multi-department tools', 'Priority support'],
    enterprise: ['Full asset & module suite', 'Custom integrations', 'Dedicated account manager'],
  };
  return [...base, ...(map[tier.id] ?? [])];
}

// ── Modules ────────────────────────────────────────────────────────────────────
const moduleCategories = computed(() =>
  pricingConfig.modules.map(g => g.category)
);

const activeCategory = ref(pricingConfig.modules[0]?.category ?? '');

const activeCategoryModules = computed(() => {
  const group = pricingConfig.modules.find(g => g.category === activeCategory.value);
  return group?.items ?? [];
});
</script>

<style scoped>
.mesh-background {
  background-color: #ffffff;
  background-image:
    linear-gradient(#f3f4f6 1px, transparent 1px),
    linear-gradient(90deg, #f3f4f6 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: center center;
}

.font-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
</style>
