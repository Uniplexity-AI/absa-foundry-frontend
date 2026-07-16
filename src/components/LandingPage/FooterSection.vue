<template>
  <footer class="relative bg-white text-gray-600 overflow-hidden border-t border-gray-100">
    <!-- Mesh Background -->
    <div class="absolute inset-0 bg-white"></div>
    <div class="absolute inset-0 z-0 pointer-events-none mesh-background"></div>

    <div class="relative z-10">
      <!-- Main Footer Content -->
      <div class="container mx-auto px-6 py-16">
        <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          
          <!-- Company Info -->
          <div class="lg:col-span-1">
            <div class="flex items-center space-x-3 mb-6">
              <img src="/uniplexity_logo.png" alt="Uniplexity Logo" class="h-10 w-auto object-contain" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));" />
              <div>
                <h3 class="text-xl font-black font-mono tracking-tighter text-gray-900 uppercase">UNIPLEXITY</h3>
                <p class="text-[#2F2E8B] text-[10px] font-mono font-bold uppercase tracking-widest">Business software</p>
              </div>
            </div>
            <p class="text-gray-500 text-sm font-mono leading-relaxed mb-6 border-l-2 border-[#2F2E8B]/20 pl-4">
              Simple software for sales, stock, invoicing, reporting, and team management.
            </p>
            
            <!-- Social Media Links (Tech Style) -->
            <div class="flex space-x-2">
              <a href="#" class="w-8 h-8 flex items-center justify-center border border-gray-200 bg-white hover:bg-[#2F2E8B] hover:border-[#2F2E8B] hover:text-white transition-all duration-300 group">
                <i class="fab fa-facebook-f text-xs text-gray-400 group-hover:text-white"></i>
              </a>
              <a href="#" class="w-8 h-8 flex items-center justify-center border border-gray-200 bg-white hover:bg-[#2F2E8B] hover:border-[#2F2E8B] hover:text-white transition-all duration-300 group">
                <i class="fab fa-twitter text-xs text-gray-400 group-hover:text-white"></i>
              </a>
              <a href="#" class="w-8 h-8 flex items-center justify-center border border-gray-200 bg-white hover:bg-[#2F2E8B] hover:border-[#2F2E8B] hover:text-white transition-all duration-300 group">
                <i class="fab fa-linkedin-in text-xs text-gray-400 group-hover:text-white"></i>
              </a>
              <a href="#" class="w-8 h-8 flex items-center justify-center border border-gray-200 bg-white hover:bg-[#2F2E8B] hover:border-[#2F2E8B] hover:text-white transition-all duration-300 group">
                <i class="fab fa-instagram text-xs text-gray-400 group-hover:text-white"></i>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="text-sm font-black font-mono mb-6 text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-2">
              Quick links
            </h4>
            <ul class="space-y-2">
              <li>
                <router-link to="/" class="text-xs font-mono text-gray-500 hover:text-[#2F2E8B] transition-colors duration-300 flex items-center group uppercase tracking-tight">
                  <span class="w-1.5 h-1.5 bg-gray-200 group-hover:bg-[#2F2E8B] mr-3 transition-colors"></span>
                  Home
                </router-link>
              </li>
              <li>
                <a href="#features" class="text-xs font-mono text-gray-500 hover:text-[#2F2E8B] transition-colors duration-300 flex items-center group uppercase tracking-tight">
                  <span class="w-1.5 h-1.5 bg-gray-200 group-hover:bg-[#2F2E8B] mr-3 transition-colors"></span>
                  Features
                </a>
              </li>
              <li>
                <router-link to="/pricing" class="text-xs font-mono text-gray-500 hover:text-[#2F2E8B] transition-colors duration-300 flex items-center group uppercase tracking-tight">
                   <span class="w-1.5 h-1.5 bg-gray-200 group-hover:bg-[#2F2E8B] mr-3 transition-colors"></span>
                  Pricing
                </router-link>
              </li>
              <li>
                <router-link to="/contact" class="text-xs font-mono text-gray-500 hover:text-[#2F2E8B] transition-colors duration-300 flex items-center group uppercase tracking-tight">
                   <span class="w-1.5 h-1.5 bg-gray-200 group-hover:bg-[#2F2E8B] mr-3 transition-colors"></span>
                  Contact Us
                </router-link>
              </li>
               <li>
                <router-link to="/help" class="text-xs font-mono text-gray-500 hover:text-[#2F2E8B] transition-colors duration-300 flex items-center group uppercase tracking-tight">
                   <span class="w-1.5 h-1.5 bg-gray-200 group-hover:bg-[#2F2E8B] mr-3 transition-colors"></span>
                  Help Center
                </router-link>
              </li>
            </ul>
          </div>

          <!-- Services -->
          <div>
            <h4 class="text-sm font-black font-mono mb-6 text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-2">
              What we offer
            </h4>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-xs font-mono text-gray-500 hover:text-[#2F2E8B] transition-colors duration-300 flex items-center group uppercase tracking-tight">
                   <span class="w-1.5 h-1.5 bg-gray-200 group-hover:bg-[#2F2E8B] mr-3 transition-colors"></span>
                  Reports and insights
                </a>
              </li>
              <li>
                <a href="#" class="text-xs font-mono text-gray-500 hover:text-[#2F2E8B] transition-colors duration-300 flex items-center group uppercase tracking-tight">
                   <span class="w-1.5 h-1.5 bg-gray-200 group-hover:bg-[#2F2E8B] mr-3 transition-colors"></span>
                  Stock management
                </a>
              </li>
              <li>
                <a href="#" class="text-xs font-mono text-gray-500 hover:text-[#2F2E8B] transition-colors duration-300 flex items-center group uppercase tracking-tight">
                   <span class="w-1.5 h-1.5 bg-gray-200 group-hover:bg-[#2F2E8B] mr-3 transition-colors"></span>
                  Point of sale
                </a>
              </li>
              <li>
                <a href="#" class="text-xs font-mono text-gray-500 hover:text-[#2F2E8B] transition-colors duration-300 flex items-center group uppercase tracking-tight">
                   <span class="w-1.5 h-1.5 bg-gray-200 group-hover:bg-[#2F2E8B] mr-3 transition-colors"></span>
                  AI help
                </a>
              </li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div>
            <h4 class="text-sm font-black font-mono mb-6 text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-2">
              Contact
            </h4>
            <div class="space-y-4">
              <!-- Phone -->
              <div class="flex items-center space-x-3 group">
                <div class="w-8 h-8 bg-white border border-gray-200 flex items-center justify-center group-hover:border-[#2F2E8B] transition-all duration-300">
                  <i class="fas fa-phone text-[#2F2E8B] text-xs"></i>
                </div>
                <div>
                  <p class="text-[9px] font-mono text-gray-400 uppercase">Phone</p>
                  <a href="tel:+260970397095" class="text-xs font-bold font-mono text-gray-700 hover:text-[#2F2E8B] transition-colors">
                    +260 970 397 095
                  </a>
                </div>
              </div>

              <!-- WhatsApp -->
              <div class="flex items-center space-x-3 group">
                <div class="w-8 h-8 bg-white border border-gray-200 flex items-center justify-center group-hover:border-[#2F2E8B] transition-all duration-300">
                  <i class="fab fa-whatsapp text-[#2F2E8B] text-xs"></i>
                </div>
                <div>
                  <p class="text-[9px] font-mono text-gray-400 uppercase">WhatsApp</p>
                  <a href="https://wa.me/260970397095" class="text-xs font-bold font-mono text-gray-700 hover:text-[#2F2E8B] transition-colors">
                    Quick Support
                  </a>
                </div>
              </div>

              <!-- Email -->
              <div class="flex items-center space-x-3 group">
                 <div class="w-8 h-8 bg-white border border-gray-200 flex items-center justify-center group-hover:border-[#2F2E8B] transition-all duration-300">
                  <i class="fas fa-envelope text-[#2F2E8B] text-xs"></i>
                </div>
                <div>
                  <p class="text-[9px] font-mono text-gray-400 uppercase">Email</p>
                  <a href="mailto:support@uniplexity.com" class="text-xs font-bold font-mono text-gray-700 hover:text-[#2F2E8B] transition-colors">
                    support@uniplexity.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-200 bg-gray-50/50">
        <div class="container mx-auto px-6 py-4">
          <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs font-mono">
            <!-- Copyright -->
            <div class="text-center md:text-left">
              <p class="text-gray-400">
                <span class="text-[#2F2E8B] font-bold">{{ new Date().getFullYear() }}</span> · UB App
              </p>
            </div>

            <!-- Legal Links -->
            <div class="flex flex-wrap justify-center space-x-6">
              <router-link to="/about" class="text-gray-400 hover:text-[#2F2E8B] uppercase transition-colors">
                [ABOUT]
              </router-link>
              <router-link to="/privacy" class="text-gray-400 hover:text-[#2F2E8B] uppercase transition-colors">
                [PRIVACY]
              </router-link>
              <router-link to="/terms" class="text-gray-400 hover:text-[#2F2E8B] uppercase transition-colors">
                [TERMS]
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup></script>

<style scoped>
/* Mesh Background Pattern */
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

