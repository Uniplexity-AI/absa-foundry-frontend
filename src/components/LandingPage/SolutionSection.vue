<template>
  <section id="solutions" class="py-24 bg-white relative overflow-hidden">
    <!-- Mesh Background & Shapes -->
    <div class="absolute inset-0 z-0 pointer-events-none mesh-background"></div>
    
    <!-- Blueprint Shapes -->
    <div class="absolute top-20 left-0 w-64 h-64 border border-gray-100 rounded-full opacity-50 -ml-32 -mt-32 pointer-events-none"></div>
    <div class="absolute bottom-40 right-10 w-32 h-32 border border-[#2F2E8B]/10 rotate-45 pointer-events-none"></div>

    <div class="container mx-auto px-6 relative z-10">
      
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2 class="text-2xl md:text-4xl font-black text-gray-900 uppercase tracking-tight mb-4">
            WHAT YOU CAN DO
          </h2>
          <div class="h-1 w-24 bg-[#2F2E8B] mb-4"></div>
          <p class="font-mono text-xs sm:text-sm text-gray-500 uppercase tracking-widest max-w-2xl">
            // SIMPLE TOOLS FOR DAILY WORK
          </p>
        </div>

        <!-- Quick Filter / Stats -->
        <div class="flex gap-4"> 
           <div class="bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg text-right">
                <div class="text-[10px] font-mono text-gray-400 uppercase">TOOLS</div>
              <div class="text-lg sm:text-xl font-black text-gray-900 leading-none">16</div>
           </div>
           <div class="bg-blue-50 border border-blue-100 px-4 py-2 rounded-lg text-right hidden sm:block">
                <div class="text-[10px] font-mono text-[#2F2E8B] uppercase">STATUS</div>
                <div class="text-lg sm:text-xl font-black text-[#2F2E8B] leading-none">READY</div>
           </div>
        </div>
      </div>

      <!-- Compact Solutions Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <div
          v-for="(solution, index) in solutions"
          :key="index"
          @click="handleModuleAction(solution)"
          class="group cursor-pointer bg-white border border-gray-200 hover:border-[#2F2E8B] hover:shadow-lg hover:-translate-y-1 transition-all duration-200 p-5 rounded-sm relative overflow-hidden flex flex-col h-full"
        >
          <!-- Tech Header -->
          <div class="flex justify-between items-start mb-3">
             <div class="w-10 h-10 bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-[#2F2E8B] group-hover:border-[#2F2E8B] transition-colors duration-300">
                <i :class="solution.icon" class="text-gray-500 group-hover:text-white text-lg transition-colors duration-300"></i>
             </div>
             <div class="flex flex-col items-end">
                 <span class="text-[9px] font-mono text-gray-300 uppercase">OPTION {{ String(index + 1).padStart(2, '0') }}</span>
                 <span v-if="solution.comingSoon" class="text-[9px] font-mono font-bold text-orange-500 bg-orange-50 px-1 border border-orange-100 uppercase mt-1">COMING SOON</span>
                 <span v-else class="text-[9px] font-mono font-bold text-green-600 bg-green-50 px-1 border border-green-100 uppercase mt-1">AVAILABLE</span>
             </div>
          </div>
          
          <!-- Title & Desc -->
          <h3 class="font-bold text-gray-900 uppercase tracking-tight text-sm mb-2 group-hover:text-[#2F2E8B] transition-colors">
            {{ solution.title }}
          </h3>
          <p class="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-4 font-mono">
            {{ solution.shortDescription }}
          </p>
          
          <!-- Footer Action -->
          <div class="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center group/btn">
             <span class="text-[10px] font-mono text-gray-400 group-hover:text-[#2F2E8B] uppercase transition-colors">
               Learn more
             </span>
             <!-- Plus Icon triggers modal explicitly -->
             <button 
                @click.stop="openSolutionModal(solution)"
                class="w-6 h-6 flex items-center justify-center rounded-full hover:bg-[#2F2E8B] hover:text-white transition-colors"
                title="View Details"
             >
                <i class="fas fa-plus text-[10px] text-gray-400 group-hover:text-white transition-colors"></i>
             </button>
          </div>

          <!-- Hover Corner Accent -->
          <div class="absolute top-0 right-0 w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-gray-100 group-hover:border-t-[#2F2E8B] transition-colors"></div>
        </div>
      </div>
    </div>

    <!-- Landscape Solution Detail Modal -->
    <div
      v-if="selectedSolution"
      @click="closeSolutionModal"
      class="fixed inset-0 bg-[#0f172a]/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
    >
      <div
        @click.stop
        class="bg-white rounded-sm w-full max-w-6xl h-auto max-h-[90vh] shadow-2xl animate-scaleIn relative border border-gray-200 flex flex-col lg:flex-row overflow-hidden"
      >
        <!-- Top Bar (Mobile Only) -->
        <div class="lg:hidden h-1 bg-[#2F2E8B]"></div>

        <!-- Left Panel: Visuals & Branding (35%) -->
        <div class="relative w-full lg:w-[35%] h-48 lg:h-auto bg-gray-900 overflow-hidden shrink-0 group">
             <!-- Background Image -->
             <img 
                :src="selectedSolution.image" 
                :alt="selectedSolution.title" 
                class="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-110" 
                @error="handleModalImageError" 
             />
             
             <!-- Overlays -->
             <div class="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/50 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#0f172a]/50 lg:to-[#0f172a]"></div>
             <div class="absolute inset-0 bg-[#2F2E8B]/20 mix-blend-color"></div>
             <div class="absolute inset-0 pointer-events-none bg-[url('/assets/scanlines.png')] opacity-10"></div>
             
             <!-- Content Overlay -->
             <div class="absolute inset-0 p-6 flex flex-col justify-end lg:justify-between z-10">
                 <!-- Icon (Desktop Top Left) -->
                 <div class="hidden lg:flex w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center rounded-sm">
                    <i :class="selectedSolution.icon" class="text-white text-2xl"></i>
                 </div>

                 <!-- Title Block (Mobile Bottom) -->
                 <div>
                    <div class="flex items-center gap-2 mb-2 lg:hidden">
                        <div class="w-8 h-8 bg-[#2F2E8B] flex items-center justify-center rounded-sm">
                            <i :class="selectedSolution.icon" class="text-white text-sm"></i>
                        </div>
                        <span class="text-[10px] font-mono text-blue-200 uppercase tracking-widest bg-blue-900/50 px-2 py-1 rounded">
                          Details
                        </span>
                    </div>
                    <h2 class="text-2xl lg:text-3xl font-black text-white uppercase tracking-tight leading-none mb-2 drop-shadow-lg">
                        {{ selectedSolution.title }}
                    </h2>
                    <p class="text-xs lg:text-sm font-mono text-gray-300 line-clamp-2">
                        {{ selectedSolution.shortDescription }}
                    </p>
                 </div>
             </div>
        </div>

        <!-- Right Panel: Data & Actions (65%) -->
        <div class="flex-1 w-full bg-white flex flex-col overflow-hidden relative">
            <!-- Modal Mesh Header Background -->
            <div class="absolute top-0 left-0 right-0 h-20 pointer-events-none mesh-background z-0 opacity-50"></div>

            <!-- Header (Desktop Only) -->
            <div class="hidden lg:flex items-center justify-between p-6 border-b border-gray-100 relative z-10 bg-white/90 backdrop-blur-sm">
                 <div>
                     <div class="flex items-center gap-3 mb-1">
                        <span class="text-[10px] font-mono text-[#2F2E8B] uppercase bg-blue-50 px-2 py-0.5 border border-blue-100 rounded-full">
                          Product details
                        </span>
                        <span v-if="selectedSolution.comingSoon" class="text-[10px] font-mono text-orange-500 uppercase bg-orange-50 px-2 py-0.5 border border-orange-100 rounded-full">
                          Coming soon
                        </span>
                        <span v-else class="text-[10px] font-mono text-green-600 uppercase bg-green-50 px-2 py-0.5 border border-green-100 rounded-full">
                          Available now
                        </span>
                     </div>
                 </div>
                 <button 
                    @click="closeSolutionModal" 
                    class="w-8 h-8 flex items-center justify-center border border-gray-200 hover:bg-red-50 hover:border-red-200 hover:text-red-500 rounded-sm transition-colors"
                 >
                    <i class="fas fa-times"></i>
                 </button>
            </div>

            <!-- Close Button (Mobile Floating) -->
            <button 
                @click="closeSolutionModal" 
                class="lg:hidden absolute top-4 right-4 z-50 w-8 h-8 bg-black/50 text-white backdrop-blur flex items-center justify-center rounded-full"
            >
                <i class="fas fa-times"></i>
            </button>

            <!-- Scrollable Content -->
            <div class="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
                 
                 <!-- Features Section -->
                 <div>
                    <h3 class="font-bold text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                        <i class="fas fa-terminal text-[#2F2E8B] text-sm"></i>
                        <span>Key features</span>
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div v-for="(point, i) in selectedSolution.points" :key="i" class="flex items-start gap-3 group/item">
                            <span class="text-gray-300 font-mono text-xs mt-1 group-hover/item:text-[#2F2E8B] transition-colors">>></span>
                            <span class="text-sm text-gray-700 font-medium group-hover/item:text-gray-900 transition-colors">{{ point }}</span>
                        </div>
                    </div>
                 </div>

                 <!-- Metrics Section -->
                 <div v-if="selectedSolution.benefits">
                    <h3 class="font-bold text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                        <i class="fas fa-chart-network text-[#2F2E8B] text-sm"></i>
                        <span>Benefits</span>
                    </h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div v-for="(benefit, i) in selectedSolution.benefits" :key="i" class="p-3 border border-gray-200 bg-gray-50/50 hover:bg-white hover:border-[#2F2E8B] hover:shadow-md transition-all duration-300 rounded-sm group">
                            <div class="flex items-center gap-3 mb-1">
                                <div class="w-8 h-8 bg-white border border-gray-200 flex items-center justify-center rounded-sm shrink-0 group-hover:border-[#2F2E8B]/30">
                                    <i :class="benefit.icon" class="text-gray-400 group-hover:text-[#2F2E8B] text-xs transition-colors"></i>
                                </div>
                                <div>
                                    <h4 class="font-bold text-gray-900 uppercase text-[10px] tracking-wider">{{ benefit.title }}</h4>
                                    <p class="text-[10px] text-gray-500 font-mono leading-tight">{{ benefit.description }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>

            <!-- Footer Actions -->
            <div class="p-6 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div class="hidden sm:block text-[10px] font-mono text-gray-400">
                    // AUTH_LEVEL: PUBLIC
                </div>
                
                <div class="flex w-full sm:w-auto gap-3">
                      <button 
                        @click="closeSolutionModal"
                        class="flex-1 sm:flex-none px-6 py-3 border border-gray-200 text-gray-600 font-mono text-xs uppercase font-bold tracking-wide hover:bg-white hover:text-gray-900 hover:border-gray-300 transition-colors"
                      >
                        Close
                    </button>
                    <button
                      @click="handleModuleAction(selectedSolution)"
                      class="flex-1 sm:flex-none px-8 py-3 bg-[#2F2E8B] text-white font-mono text-xs uppercase font-bold tracking-wide hover:bg-[#1D226B] hover:shadow-lg hover:shadow-blue-900/20 transition-all flex items-center justify-center gap-2 group"
                    >
                       <span>Open</span>
                      <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                    </button>
                </div>
            </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useUIStore } from '@/stores/ui';

const router = useRouter();
const authStore = useAuthStore();
const uiStore = useUIStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
const selectedSolution = ref(null);

const openSolutionModal = (solution) => {
  selectedSolution.value = solution;
  document.body.style.overflow = 'hidden';
};

const closeSolutionModal = () => {
  selectedSolution.value = null;
  document.body.style.overflow = 'auto';
};

const handleModalImageError = (e) => {
  e.target.src = '/images/designimages/istockphoto-1403779832-612x612.jpg';
};

const solutionRouteMap = {
  'Uniplexity DaaS': { path: '/dashboard/ai', key: 'ai' },
  'POS Operations': { path: '/dashboard/pos', key: 'pos' },
  'Inventory Management': { path: '/dashboard/inventory', key: 'inventory' },
  'Supplier Management': { path: '/dashboard/suppliers', key: 'supplier' },
  'ZRA Tax Module': { path: '/dashboard/zra', key: 'taxes' },
  'Invoicing & Billing': { path: '/dashboard/invoicing', key: 'invoicing' },
  'AI Agent Module': { path: '/dashboard/ai', key: 'ai' },
  'Reports & Analytics': { path: '/dashboard/reports', key: 'reports' },
  'User Management': { path: '/dashboard/users', key: 'users' },
  'Expense Tracking': { path: '/dashboard/expenses', key: 'expenses' },
  'Delivery Management': { path: '/dashboard/delivery-tickets', key: 'delivery-tickets' },
  'Loan Tracking': { path: '/dashboard/loans', key: 'loans' },
  'HR Module': { path: '/hrmodule', key: 'hrmodule' },
  'CRM Module': { path: '/dashboard/crm', key: 'crm' },
  'Payroll Management': { path: '/dashboard/payroll', key: 'payroll' },
};

const handleModuleAction = async (solution) => {
  // If modal is open, we can close it, or let the navigation happen
  // If coming soon
  if (solution.comingSoon) {
    uiStore.showWarningToast('This module is currently in development (DEV_MODE). Stay tuned!')
    // Ensure modal is open to show details if not already
    if (!selectedSolution.value) {
        openSolutionModal(solution);
    }
    return
  }

  const mapping = solutionRouteMap[solution.title];
  if (!mapping) {
    // If no mapping, just open details
    if (!selectedSolution.value) {
        openSolutionModal(solution);
    }
    return;
  }

  const { path, key } = mapping;
  if (isAuthenticated.value) {
    const subscribed = authStore?.user?.modules?.includes?.(key) || 
                      authStore?.user?.permissions?.includes?.(key) || 
                      false;
    
    // Auto-close modal if open
    closeSolutionModal();

    if (subscribed) {
      router.push(path);
    } else {
      uiStore.showErrorToast('ACCESS_DENIED: Subscription required for this module.');
      // Navigate to pricing or similar if needed, or just show error
      const el = document.getElementById('pricing');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } else {
    // Auto-close modal if open
    closeSolutionModal();
    
    localStorage.setItem('intended_route', path);
    localStorage.setItem('intended_module', key);
    uiStore.showInfoToast('AUTHENTICATION_REQUIRED: Please sign in to access.');
    await router.push('/login');
  }
};

const solutions = [
  {
    title: 'Uniplexity DaaS',
    icon: 'fas fa-database',
    image: './assets/daas.jpeg',
    shortDescription: 'Data-as-a-Service for real-time intelligence.',
    points: ['Ingest data from enterprise systems', 'Cleanse and map schemas', 'Real-time AI insights', 'Secure APIs'],
    benefits: [
      { icon: 'fas fa-brain', title: 'AI Insights', description: 'Agentic AI learns and surfaces decisions.' },
      { icon: 'fas fa-cloud', title: 'Unified Data', description: 'Break down silos across systems.' }
    ]
  },
  {
    title: 'MindGPT COMS',
    icon: 'fas fa-universal-access',
    image: './assets/mindgpt.jpg',
    shortDescription: 'Inclusive AI interaction via thoughts/gestures.',
    comingSoon: true,
    points: ['Non-verbal interaction', 'Facial sensors for control', 'Integrated product scanning'],
    benefits: [
      { icon: 'fas fa-heart', title: 'Inclusive', description: 'For users who cant type or talk.' },
      { icon: 'fas fa-shield-alt', title: 'Secure', description: 'Designed for privacy.' }
    ]
  },
  {
    title: 'POS Operations',
    icon: 'fas fa-cash-register',
    image: './assets/POS1.jpeg',
    shortDescription: 'Seamless transactions and management.',
    points: ['Fast checkout', 'Role-based access', 'Real-time sales', 'Multi-payment support'],
    benefits: [
      { icon: 'fas fa-chart-line', title: 'More Sales', description: 'Faster transactions.' },
      { icon: 'fas fa-mobile-alt', title: 'Mobile', description: 'Access from anywhere.' }
    ]
  },
  {
    title: 'Inventory Management',
    icon: 'fas fa-boxes',
    image: './assets/Inventory.jpeg',
    shortDescription: 'Real-time stock monitoring & alerts.',
    points: ['Stock tracking', 'Barcode scanning', 'Auto reorder', 'Batch tracking'],
    benefits: [
      { icon: 'fas fa-clipboard-check', title: 'Stock Levels', description: 'Never run out.' },
      { icon: 'fas fa-money-bill-wave', title: 'Cost Savings', description: 'Optimize levels.' }
    ]
  },
  {
    title: 'Supplier Management',
    icon: 'fas fa-truck',
    image: './assets/Supplier.jpeg',
    shortDescription: 'Supplier tracking and order management.',
    points: ['Supplier database', 'Purchase orders', 'Performance analytics', 'Delivery tracking'],
    benefits: [
      { icon: 'fas fa-handshake', title: 'Relations', description: 'Better supplier tracking.' },
      { icon: 'fas fa-shipping-fast', title: 'Speed', description: 'Faster delivery.' }
    ]
  },
  {
    title: 'ZRA Tax Module',
    icon: 'fas fa-receipt',
    image: './assets/zra.jpeg',
    shortDescription: 'Automated ZRA compliance reporting.',
    points: ['VAT automation', 'Tax settings', 'Audit trails', 'Compliance reporting'],
    benefits: [
      { icon: 'fas fa-shield-alt', title: 'Compliant', description: 'ZRA regulations met.' },
      { icon: 'fas fa-clock', title: 'Efficiency', description: 'Save prep time.' }
    ]
  },
  {
    title: 'Invoicing & Billing',
    icon: 'fas fa-file-invoice',
    image: './assets/invoice.jpeg',
    shortDescription: 'Professional invoices & tracking.',
    points: ['Custom invoices', 'Online payments', 'AR management', 'Multi-currency'],
    benefits: [
      { icon: 'fas fa-money-check-alt', title: 'Payments', description: 'Get paid faster.' },
      { icon: 'fas fa-globe', title: 'Global', description: 'Multi-currency support.' }
    ]
  },
  {
    title: 'AI Agent Module',
    icon: 'fas fa-robot',
    image: './assets/AI1.jpeg',
    shortDescription: 'AI-powered business insights.',
    points: ['Sales automation', 'Forecasting', 'Smart reports', 'Inventory suggestions'],
    benefits: [
      { icon: 'fas fa-brain', title: 'Smart Decisions', description: 'Data-driven insights.' },
      { icon: 'fas fa-crystal-ball', title: 'Predict', description: 'Market trend analysis.' }
    ]
  },
  {
    title: 'Reports & Analytics',
    icon: 'fas fa-chart-bar',
    image: './assets/reports.jpeg',
    shortDescription: 'Real-time dashboards & KPIs.',
    points: ['Financial reports', 'Real-time KPIs', 'Custom builder', 'Data export'],
    benefits: [
      { icon: 'fas fa-eye', title: 'Visibility', description: 'Full performance view.' },
      { icon: 'fas fa-download', title: 'Export', description: 'Multiple formats.' }
    ]
  },
  {
    title: 'User Management',
    icon: 'fas fa-users',
    image: './assets/shops.jpeg',
    shortDescription: 'Role-based access & monitoring.',
    points: ['Role management', 'Access control', 'Audit logs', 'Secure onboarding'],
    benefits: [
      { icon: 'fas fa-lock', title: 'Security', description: 'Controlled access.' },
      { icon: 'fas fa-user-shield', title: 'Logs', description: 'Activity tracking.' }
    ]
  },
  {
    title: 'CRM Module',
    icon: 'fas fa-address-book',
    image: './assets/crm.jpeg',
    shortDescription: 'Lead tracking & customer relations.',
    points: ['Customer tracking', 'Sales pipeline', 'Marketing auto', 'History logs'],
    benefits: [
      { icon: 'fas fa-heart', title: 'Loyalty', description: 'Better relationships.' },
      { icon: 'fas fa-funnel-dollar', title: 'Pipeline', description: 'Track conversion.' }
    ]
  },
  {
    title: 'Payroll Management',
    icon: 'fas fa-money-check-alt',
    image: './assets/payroll.jpeg',
    shortDescription: 'Automated payroll & compliance.',
    points: ['Auto payroll', 'Time tracking', 'Tax deductions', 'Payslips'],
    benefits: [
      { icon: 'fas fa-clock', title: 'Time', description: 'Reduce processing hours.' },
      { icon: 'fas fa-balance-scale', title: 'Compliant', description: 'Labor adherence.' }
    ]
  },
  {
    title: 'Expense Tracking',
    icon: 'fas fa-money-bill-wave',
    image: './assets/expenses.jpeg',
    shortDescription: 'Expense recording & receipts.',
    points: ['Expense log', 'Receipt capture', 'Categories', 'Analysis'],
    benefits: [
      { icon: 'fas fa-camera', title: 'Digital', description: 'Store receipts.' },
      { icon: 'fas fa-chart-line', title: 'Analyze', description: 'Optimize spend.' }
    ]
  },
  {
    title: 'Delivery Management',
    icon: 'fas fa-truck-loading',
    image: './assets/delivery.jpeg',
    shortDescription: 'Route optimization & tracking.',
    points: ['Ticket management', 'Route optimization', 'Driver tracking', 'Notifications'],
    benefits: [
      { icon: 'fas fa-route', title: 'Routes', description: 'Save fuel/time.' },
      { icon: 'fas fa-star', title: 'Service', description: 'Happy customers.' }
    ]
  },
  {
    title: 'Loan Tracking',
    icon: 'fas fa-hand-holding-usd',
    image: './assets/loans.jpeg',
    shortDescription: 'Loan & payment management.',
    points: ['Loan management', 'Payment tracking', 'Interest calc', 'Reports'],
    benefits: [
      { icon: 'fas fa-calendar-check', title: 'Reminders', description: 'Never miss payment.' },
      { icon: 'fas fa-chart-pie', title: 'Insights', description: 'Debt structure.' }
    ]
  },
  {
    title: 'HR Module',
    icon: 'fas fa-user-tie',
    image: './assets/hr.jpeg',
    shortDescription: 'Recruitment & parsing.',
    points: ['Resume parsing', 'Interview scheduling', 'Candidate scoring', 'Workflows'],
    benefits: [
      { icon: 'fas fa-search', title: 'Talent', description: 'Find best fits.' },
      { icon: 'fas fa-trophy', title: 'Scoring', description: 'Data-driven hires.' }
    ]
  },
  {
    title: 'Microfinance Module',
    icon: 'fas fa-university',
    image: './assets/loans.jpeg',
    shortDescription: 'Financial services & scoring.',
    points: ['Loan workflows', 'Digital wallet', 'Credit scoring', 'Investor portals'],
    benefits: [
      { icon: 'fas fa-coins', title: 'Inclusion', description: 'Accessible services.' },
      { icon: 'fas fa-shield-alt', title: 'Risk', description: 'Minimize defaults.' }
    ]
  },
  {
    title: 'Assets Manager',
    icon: 'fas fa-hard-hat',
    image: './assets/daas.jpeg',
    shortDescription: 'Fleet & property management.',
    points: ['Fleet tracking', 'Real estate', 'Machinery tracking', 'Depreciation'],
    benefits: [
      { icon: 'fas fa-car', title: 'Fleet', description: 'Optimize usage.' },
      { icon: 'fas fa-building', title: 'Property', description: 'Manage tenants.' }
    ]
  }
];

onUnmounted(() => {
  document.body.style.overflow = 'auto';
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

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

.animate-scaleIn {
  animation: scaleIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>
