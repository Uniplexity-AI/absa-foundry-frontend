<template>
  <!-- Navigation -->
    <nav class="landing-navbar">
      <div class="floating-shell mesh-background">
      <div class="navbar-content">

        <div class="navbar-logo-group logo-animate">
          <img src="/uniplexity_logo.png" alt="Uniplexity Logo" class="logo-3d" />
        </div>
        <!-- Enhanced Menu Button with Hamburger Animation -->
        <button
          id="menu-btn"
          @click="toggleMenu"
          class="flex items-center justify-center w-14 h-14 bg-white rounded-none border-2 border-gray-100 transition-all duration-400 hover:bg-gray-50 hover:scale-110 hover:shadow-lg hover:border-gray-200 transform-gpu block md:hidden focus:outline-none focus:ring-3 focus:ring-blue-100 active:scale-105"
          aria-label="Toggle Main Menu"
        >
          <div class="hamburger-icon relative w-6 h-6 flex items-center justify-center">
            <span 
              :class="menuOpen ? 'rotate-45 translate-y-0' : 'translate-y-[-8px]'"
              class="absolute w-5 h-0.5 bg-gray-700 rounded-full transition-all duration-300 shadow-sm"
            ></span>
            <span 
              :class="menuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'"
              class="absolute w-5 h-0.5 bg-gray-700 rounded-full transition-all duration-300 shadow-sm"
            ></span>
            <span 
              :class="menuOpen ? '-rotate-45 translate-y-0' : 'translate-y-[8px]'"
              class="absolute w-5 h-0.5 bg-gray-700 rounded-full transition-all duration-300 shadow-sm"
            ></span>
          </div>
        </button>
        <!-- Menu Links -->
        <div
          id="menu"
          :class="[
            'navbar-links-group',
            { 'mobile-nav': menuOpen && isMobile, 'desktop-nav': !isMobile, 'mesh-background': isMobile }
          ]"
        >
            <!-- Install App CTA -->
            <button @click="handleInstallClick" class="nav-link nav-link-animate flex items-center justify-center gap-2 text-gray-600 hover:text-[#2F2E8B]">
              <i class="fas fa-download text-lg"></i>
              <span class="font-medium">Install App</span>
            </button>

          <router-link to="/pricing" class="nav-link nav-link-animate text-gray-600 hover:text-[#2F2E8B]">Pricing</router-link>

          <!-- Services Dropdown -->
          <div class="relative dropdown-container" @mouseenter="!isMobile && (showServicesDropdown = true)" @mouseleave="!isMobile && (showServicesDropdown = false)">
            <button 
              @click="toggleDropdown('services')"
              class="nav-link nav-link-animate flex items-center group text-gray-600 hover:text-[#2F2E8B]"
            >
              Services
              <i :class="['fas fa-chevron-down ml-1 text-sm transition-transform duration-200', showServicesDropdown ? 'rotate-180' : '']"></i>
            </button>
            <div 
              v-show="showServicesDropdown" 
              class="dropdown-menu absolute top-full left-0 mt-3 w-72 bg-white rounded-xl shadow-xl border border-gray-100 py-3 z-50 overflow-hidden max-h-96 overflow-y-auto"
            >
              <div class="absolute top-0 left-0 w-full h-1 bg-[#2F2E8B]"></div>
              
              <!-- AI Help -->
              <a href="#" @click.prevent="goToService('/dashboard/ai','ai')" class="dropdown-item group flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-200">
                <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
                  <i class="fas fa-robot text-[#2F2E8B]"></i>
                </div>
                <div>
                  <div class="font-medium text-gray-900">AI help</div>
                  <div class="text-xs text-gray-500 font-light">Get answers and suggestions faster</div>
                </div>
              </a>
              
              <!-- Point of Sale -->
              <a href="#" @click.prevent="goToService('/dashboard/pos','pos')" class="dropdown-item group flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-200">
                <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
                  <i class="fas fa-cash-register text-[#2F2E8B]"></i>
                </div>
                <div>
                  <div class="font-medium text-gray-900">Point of sale</div>
                  <div class="text-xs text-gray-500 font-light">Process sales at the counter</div>
                </div>
              </a>
              
              <!-- Stock Management -->
              <a href="#" @click.prevent="goToService('/dashboard/inventory','inventory')" class="dropdown-item group flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-200">
                <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
                  <i class="fas fa-boxes text-[#2F2E8B]"></i>
                </div>
                <div>
                  <div class="font-medium text-gray-900">Stock management</div>
                  <div class="text-xs text-gray-500 font-light">Track what you have on hand</div>
                </div>
              </a>
              
              <!-- Supplier Management -->
              <a href="#" @click.prevent="goToService('/dashboard/suppliers','suppliers')" class="dropdown-item group flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-200">
                <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
                  <i class="fas fa-truck text-[#2F2E8B]"></i>
                </div>
                <div>
                  <div class="font-medium text-gray-900">Supplier Management</div>
                  <div class="text-xs text-gray-500 font-light">Keep supplier details in one place</div>
                </div>
              </a>
              
              <!-- Tax Filing -->
              <a href="#" @click.prevent="goToService('/dashboard/zra','zra')" class="dropdown-item group flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-200">
                <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
                  <i class="fas fa-receipt text-[#2F2E8B]"></i>
                </div>
                <div>
                  <div class="font-medium text-gray-900">Tax filing</div>
                  <div class="text-xs text-gray-500 font-light">Prepare reports for tax submission</div>
                </div>
              </a>
              
              <!-- Invoicing -->
              <a href="#" @click.prevent="goToService('/dashboard/invoicing','invoicing')" class="dropdown-item group flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-200">
                <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
                  <i class="fas fa-file-invoice text-[#2F2E8B]"></i>
                </div>
                <div>
                  <div class="font-medium text-gray-900">Invoicing</div>
                  <div class="text-xs text-gray-500 font-light">Create and send invoices</div>
                </div>
              </a>
              
              <!-- Reports & Analytics -->
              <a href="#" @click.prevent="goToService('/dashboard/reports','reports')" class="dropdown-item group flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-200">
                <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
                  <i class="fas fa-chart-bar text-[#2F2E8B]"></i>
                </div>
                <div>
                  <div class="font-medium text-gray-900">Reports & Analytics</div>
                  <div class="text-xs text-gray-500 font-light">See how your business is performing</div>
                </div>
              </a>
              
              <!-- User Management -->
              <a href="#" @click.prevent="goToService('/dashboard/users','users')" class="dropdown-item group flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-200">
                <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
                  <i class="fas fa-users text-[#2F2E8B]"></i>
                </div>
                <div>
                  <div class="font-medium text-gray-900">Team members</div>
                  <div class="text-xs text-gray-500 font-light">Manage users and permissions</div>
                </div>
              </a>
              
              <!-- Settings -->
              <a href="#" @click.prevent="goToService('/dashboard/settings','settings')" class="dropdown-item group flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-200">
                <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
                  <i class="fas fa-cog text-[#2F2E8B]"></i>
                </div>
                <div>
                  <div class="font-medium text-gray-900">Settings</div>
                  <div class="text-xs text-gray-500 font-light">Adjust your account and brand details</div>
                </div>
              </a>
              
              <!-- All Locations -->
              <a href="#" @click.prevent="goToService('/dashboard/allshops','allshops')" class="dropdown-item group flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-200">
                <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
                  <i class="fas fa-store text-[#2F2E8B]"></i>
                </div>
                <div>
                  <div class="font-medium text-gray-900">All locations</div>
                  <div class="text-xs text-gray-500 font-light">View and manage every branch</div>
                </div>
              </a>
              
              <!-- Expenses -->
              <a href="#" @click.prevent="goToService('/dashboard/expenses','expenses')" class="dropdown-item group flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-200">
                <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
                  <i class="fas fa-money-bill-wave text-[#2F2E8B]"></i>
                </div>
                <div>
                  <div class="font-medium text-gray-900">Expenses</div>
                  <div class="text-xs text-gray-500 font-light">Track what your business spends</div>
                </div>
              </a>
              
              <!-- Delivery Notes -->
              <a href="#" @click.prevent="goToService('/dashboard/delivery-tickets','delivery-tickets')" class="dropdown-item group flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-200">
                <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
                  <i class="fas fa-truck-loading text-[#2F2E8B]"></i>
                </div>
                <div>
                  <div class="font-medium text-gray-900">Delivery notes</div>
                  <div class="text-xs text-gray-500 font-light">Record outgoing deliveries</div>
                </div>
              </a>
              
              <!-- Loan Tracking -->
              <a href="#" @click.prevent="goToService('/dashboard/loans','loans')" class="dropdown-item group flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-200">
                <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
                  <i class="fas fa-hand-holding-usd text-[#2F2E8B]"></i>
                </div>
                <div>
                  <div class="font-medium text-gray-900">Loan Tracking</div>
                  <div class="text-xs text-gray-500 font-light">Track loans and repayments</div>
                </div>
              </a>
              
              <!-- Image Capture -->
              <a href="#" @click.prevent="goToService('/dashboard/image-capture','image-capture')" class="dropdown-item group flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-200">
                <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
                  <i class="fas fa-camera text-[#2F2E8B]"></i>
                </div>
                <div>
                  <div class="font-medium text-gray-900">Image capture</div>
                  <div class="text-xs text-gray-500 font-light">Store documents and photos</div>
                </div>
              </a>
              
              <!-- HR Tools -->
              <a href="#" @click.prevent="goToService('/hrmodule','hrmodule')" class="dropdown-item group flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-200">
                <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
                  <i class="fas fa-user-tie text-[#2F2E8B]"></i>
                </div>
                <div>
                  <div class="font-medium text-gray-900">HR tools</div>
                  <div class="text-xs text-gray-500 font-light">Manage hiring and staff records</div>
                </div>
              </a>
              
              <!-- Payroll Module -->
              <a href="#" @click.prevent="goToService('/dashboard/payroll','payroll')" class="dropdown-item group flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-200">
                <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
                  <i class="fas fa-money-check-alt text-[#2F2E8B]"></i>
                </div>
                <div>
                  <div class="font-medium text-gray-900">Payroll Module</div>
                  <div class="text-xs text-gray-500 font-light">Employee payroll management</div>
                </div>
              </a>
              
              <!-- CRM Module -->
              <a href="#" @click.prevent="goToService('/dashboard/crm','crm')" class="dropdown-item group flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-200">
                <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
                  <i class="fas fa-address-book text-[#2F2E8B]"></i>
                </div>
                <div>
                  <div class="font-medium text-gray-900">CRM Module</div>
                  <div class="text-xs text-gray-500 font-light">Customer relationship management</div>
                </div>
              </a>
              
              <!-- Mining Module -->
              <a href="#" @click.prevent="goToService('/dashboard/mining','mining')" class="dropdown-item group flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-200">
                <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
                  <i class="fas fa-mountain text-[#2F2E8B]"></i>
                </div>
                <div>
                  <div class="font-medium text-gray-900">Mining Module</div>
                  <div class="text-xs text-gray-500 font-light">Mining operations management</div>
                </div>
              </a>

              <!-- DaaS -->
              <a href="#daas" @click.prevent="scrollToSection('daas')" class="dropdown-item group flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-200">
                <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
                  <i class="fas fa-database text-[#2F2E8B]"></i>
                </div>
                <div>
                  <div class="font-medium text-gray-900">Data-as-a-Service (DaaS)</div>
                  <div class="text-xs text-gray-500 font-light">Unified data from paper, IoT, systems</div>
                </div>
              </a>
            </div>
          </div>
          
          
          <!-- Company Dropdown -->
          <div class="relative dropdown-container" @mouseenter="!isMobile && openDropdown('company')" @mouseleave="!isMobile && closeDropdown('company')">
            <button 
              @click="toggleDropdown('company')"
              class="nav-link nav-link-animate flex items-center group text-gray-600 hover:text-[#2F2E8B]"
            >
              Company
              <i :class="['fas fa-chevron-down ml-1 text-sm transition-transform duration-200', showCompanyDropdown ? 'rotate-180' : '']"></i>
            </button>
            <div 
              v-show="showCompanyDropdown" 
              class="dropdown-menu absolute top-full left-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-3 z-50 overflow-hidden"
              @mouseenter="openDropdown('company')"
              @mouseleave="closeDropdown('company')"
            >
              <div class="absolute top-0 left-0 w-full h-1 bg-[#2F2E8B]"></div>
              <router-link to="/about" @click="showCompanyDropdown = false" class="dropdown-item group flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-200">
                <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
                  <i class="fas fa-info-circle text-[#2F2E8B]"></i>
                </div>
                <div>
                  <div class="font-medium text-gray-900">About Us</div>
                  <div class="text-xs text-gray-500 font-light">Learn our story</div>
                </div>
              </router-link>
              <router-link to="/contact" @click="showCompanyDropdown = false" class="dropdown-item group flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-200">
                <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
                  <i class="fas fa-envelope text-[#2F2E8B]"></i>
                </div>
                <div>
                  <div class="font-medium text-gray-900">Contact</div>
                  <div class="text-xs text-gray-500 font-light">Get in touch</div>
                </div>
              </router-link>
            </div>
          </div>

          <!-- Support Dropdown -->
          <div class="relative dropdown-container" @mouseenter="!isMobile && openDropdown('support')" @mouseleave="!isMobile && closeDropdown('support')">
            <button 
              @click="toggleDropdown('support')"
              class="nav-link nav-link-animate flex items-center group text-gray-600 hover:text-[#2F2E8B]"
            >
              Support
              <i :class="['fas fa-chevron-down ml-1 text-sm transition-transform duration-200', showSupportDropdown ? 'rotate-180' : '']"></i>
            </button>
            <div 
              v-show="showSupportDropdown" 
              class="dropdown-menu absolute top-full left-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-3 z-50 overflow-hidden"
              @mouseenter="openDropdown('support')"
              @mouseleave="closeDropdown('support')"
            >
              <div class="absolute top-0 left-0 w-full h-1 bg-[#2F2E8B]"></div>
              <router-link to="/help" @click="showSupportDropdown = false" class="dropdown-item group flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-200">
                <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
                  <i class="fas fa-question-circle text-[#2F2E8B]"></i>
                </div>
                <div>
                  <div class="font-medium text-gray-900">Help Center</div>
                  <div class="text-xs text-gray-500 font-light">Find answers</div>
                </div>
              </router-link>
              <a href="#" @click="scrollToFAQ" class="dropdown-item group flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-200">
                <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
                  <i class="fas fa-comments text-[#2F2E8B]"></i>
                </div>
                <div>
                  <div class="font-medium text-gray-900">FAQ</div>
                  <div class="text-xs text-gray-500 font-light">Common questions</div>
                </div>
              </a>
              <router-link to="/contact" @click="showSupportDropdown = false" class="dropdown-item group flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-200">
                <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
                  <i class="fas fa-headset text-[#2F2E8B]"></i>
                </div>
                <div>
                  <div class="font-medium text-gray-900">Contact Support</div>
                  <div class="text-xs text-gray-500 font-light">Direct assistance</div>
                </div>
              </router-link>
            </div>
          </div>


          <!-- Authentication Section -->
          <div v-if="isAuthenticated" class="relative">
            <button
              @click="toggleUserDropdown"
              class="flex items-center space-x-2 text-gray-600 hover:text-[#2F2E8B] transition-colors"
              aria-label="User menu"
            >
              <div class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <i class="fas fa-user text-sm text-[#2F2E8B]"></i>
              </div>
              <span class="hidden md:block font-medium">{{ user?.name || 'User' }}</span>
              <i :class="['fas fa-chevron-down text-sm transition-transform duration-200', showUserDropdown ? 'rotate-180' : '']"></i>
            </button>

            <!-- User Dropdown -->
            <div
              v-show="showUserDropdown"
              class="absolute top-full right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-3 z-50"
            >
              <div class="absolute top-0 left-0 w-full h-1 bg-[#2F2E8B]"></div>

              <div class="px-4 py-3 border-b border-gray-100">
                <div class="font-medium text-gray-900">{{ user?.name || 'User' }}</div>
                <div class="text-sm text-gray-500 font-light">{{ user?.email }}</div>
                <div class="text-xs text-gray-400 mt-1 font-light">Role: {{ userRole }}</div>
              </div>

              <router-link
                to="/dashboard"
                @click="showUserDropdown = false"
                class="dropdown-item group flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-200"
              >
                <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
                  <i class="fas fa-tachometer-alt text-[#2F2E8B]"></i>
                </div>
                <div>
                  <div class="font-medium text-gray-900">Dashboard</div>
                  <div class="text-xs text-gray-500 font-light">Manage your modules</div>
                </div>
              </router-link>

              <router-link
                to="/dashboard/settings?tab=profile"
                @click="showUserDropdown = false"
                class="dropdown-item group flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-200"
              >
                <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
                  <i class="fas fa-user-cog text-[#2F2E8B]"></i>
                </div>
                <div>
                  <div class="font-medium text-gray-900">Profile Settings</div>
                  <div class="text-xs text-gray-500 font-light">Update your information</div>
                </div>
              </router-link>

              <div class="border-t border-gray-100 mt-2 pt-2">
                <button
                  @click="handleLogout"
                  class="w-full dropdown-item group flex items-center px-4 py-3 text-red-600 hover:bg-red-50 transition-all duration-200"
                >
                  <div class="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-red-100 transition-colors">
                  <i class="fas fa-sign-out-alt text-red-600"></i>
                </div>
                <div>
                  <div class="font-medium text-red-700">Sign Out</div>
                  <div class="text-xs text-red-500 font-light">End your session</div>
                </div>
                </button>
              </div>
            </div>
          </div>
          <template v-else>
            <router-link to="/login" class="signin-link text-black hover:text-[#2F2E8B] font-bold text-lg mr-4 transition-colors z-50 relative">Sign In</router-link>
            <router-link to="/pricing" class="cta-primary bg-[#2F2E8B] text-white px-5 py-2.5 rounded-sm hover:bg-[#1D226B] shadow-md hover:shadow-lg transition-all">
              <span>Get Started</span>
              <i class="fas fa-arrow-right ml-2"></i>
            </router-link>
          </template>
        </div>
      </div>
      </div>
    </nav>

    <!-- PWA Install Instructions Modal (Tech Grid Design) -->
    <Teleport to="body">
    <div v-if="showInstallModal" class="fixed inset-0 z-[12000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div class="relative w-full max-w-sm bg-white border-2 border-[#2F2E8B] shadow-2xl overflow-hidden animate-scale-in">
        <!-- Tech Corners -->
        <div class="absolute top-0 left-0 w-2 h-2 bg-[#2F2E8B]"></div>
        <div class="absolute top-0 right-0 w-2 h-2 bg-[#2F2E8B]"></div>
        <div class="absolute bottom-0 left-0 w-2 h-2 bg-[#2F2E8B]"></div>
        <div class="absolute bottom-0 right-0 w-2 h-2 bg-[#2F2E8B]"></div>
        
        <!-- Mesh Background -->
        <div class="absolute inset-0 mesh-background opacity-20 pointer-events-none"></div>

        <div class="relative p-6 z-10">
          <button @click="showInstallModal = false" class="absolute top-4 right-4 text-gray-400 hover:text-[#2F2E8B] transition-colors">
            <i class="fas fa-times text-xl"></i>
          </button>
          
          <div class="text-center mb-6">
            <div class="w-16 h-16 bg-blue-50 border border-[#2F2E8B] flex items-center justify-center mx-auto mb-4 relative">
               <!-- Tech deco inside icon -->
               <div class="absolute top-1 left-1 w-1 h-1 bg-[#2F2E8B]"></div>
               <div class="absolute bottom-1 right-1 w-1 h-1 bg-[#2F2E8B]"></div>
               <i class="fas fa-download text-2xl text-[#2F2E8B]"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2 font-mono tracking-tight">SYSTEM_INSTALL</h3>
            <p class="text-gray-500 text-sm">Initialize local app module for optimal performance.</p>
          </div>

          <div v-if="isIOS" class="space-y-4 text-left bg-gray-50 p-4 border border-gray-200 relative">
             <div class="flex items-start gap-3">
                <span class="flex-shrink-0 w-6 h-6 bg-[#2F2E8B] text-white flex items-center justify-center font-bold text-xs font-mono rounded-none">1</span>
                <p class="text-sm text-gray-700 font-medium">Tap <span class="font-bold text-[#2F2E8B]">Share</span> <i class="fas fa-share-square mx-1"></i> in browser bar.</p>
             </div>
             <div class="flex items-start gap-3">
                <span class="flex-shrink-0 w-6 h-6 bg-[#2F2E8B] text-white flex items-center justify-center font-bold text-xs font-mono rounded-none">2</span>
                <p class="text-sm text-gray-700 font-medium">Select <span class="font-bold text-[#2F2E8B]">"Add to Home Screen"</span> <i class="fas fa-plus-square mx-1"></i>.</p>
             </div>
          </div>
          
          <div v-else class="space-y-4 text-left bg-gray-50 p-4 border border-gray-200 relative">
             <div class="flex items-start gap-3">
                <span class="flex-shrink-0 w-6 h-6 bg-[#2F2E8B] text-white flex items-center justify-center font-bold text-xs font-mono rounded-none">1</span>
                <p class="text-sm text-gray-700 font-medium">Open browser menu <i class="fas fa-ellipsis-v mx-1"></i>.</p>
             </div>
             <div class="flex items-start gap-3">
                <span class="flex-shrink-0 w-6 h-6 bg-[#2F2E8B] text-white flex items-center justify-center font-bold text-xs font-mono rounded-none">2</span>
                <p class="text-sm text-gray-700 font-medium">Tap <span class="font-bold text-[#2F2E8B]">"Install App"</span>.</p>
             </div>
          </div>

          <button @click="showInstallModal = false" class="w-full mt-6 bg-[#2F2E8B] text-white font-bold py-3 hover:bg-[#1D226B] transition-colors shadow-lg border-b-4 border-[#1D226B] active:border-b-0 active:translate-y-1 font-mono uppercase tracking-wider text-sm">
            Acknowledge
          </button>
        </div>
      </div>
    </div>
    </Teleport>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUIStore } from '@/stores/ui'

const router = useRouter()
const authStore = useAuthStore()
const uiStore = useUIStore()

const menuOpen = ref(false)
const isMobile = ref(false)
const showCompanyDropdown = ref(false)
const showServicesDropdown = ref(false)
const showSupportDropdown = ref(false)
const showUserDropdown = ref(false)
// PWA install
const deferredPrompt = ref(null)
const showInstallHint = ref(false)
const canInstallPWA = computed(() => !!deferredPrompt.value)

// Computed properties from auth store
const user = computed(() => authStore.user)
const isAuthenticated = computed(() => authStore.isAuthenticated)
const userRole = computed(() => authStore.userRole)

const toggleMenu = () => {
  console.log('toggleMenu', menuOpen.value)
  menuOpen.value = !menuOpen.value
  // Close all dropdowns when closing menu
  if (!menuOpen.value) {
    showServicesDropdown.value = false
    showCompanyDropdown.value = false
    showSupportDropdown.value = false
    showUserDropdown.value = false
  }
}

const toggleDropdown = (name) => {
  console.log('toggleDropdown', name)
  if (name === 'services') {
    showServicesDropdown.value = !showServicesDropdown.value
    showCompanyDropdown.value = false
    showSupportDropdown.value = false
  } else if (name === 'company') {
    showCompanyDropdown.value = !showCompanyDropdown.value
    showServicesDropdown.value = false
    showSupportDropdown.value = false
  } else if (name === 'support') {
    showSupportDropdown.value = !showSupportDropdown.value
    showServicesDropdown.value = false
    showCompanyDropdown.value = false
  }
}

// Timeout logic for dropdowns to handle gap
const dropdownTimers = {};

const openDropdown = (name) => {
  console.log('openDropdown', name)
  if (dropdownTimers[name]) {
    clearTimeout(dropdownTimers[name]);
    delete dropdownTimers[name];
  }
  
  if (name === 'services') showServicesDropdown.value = true;
  if (name === 'company') showCompanyDropdown.value = true;
  if (name === 'support') showSupportDropdown.value = true;
  if (name === 'user') showUserDropdown.value = true;
  
  // Optional: Close others immediate? Maybe not needed for hover
};

const closeDropdown = (name) => {
  console.log('closeDropdown', name)
  dropdownTimers[name] = setTimeout(() => {
    if (name === 'services') showServicesDropdown.value = false;
    if (name === 'company') showCompanyDropdown.value = false;
    if (name === 'support') showSupportDropdown.value = false;
    if (name === 'user') showUserDropdown.value = false;
    delete dropdownTimers[name];
  }, 300); // 300ms delay to bridge the gap
};

// Navigate to a protected service/module with smart authentication flow
const goToService = async (routePath, moduleKey) => {
  console.log('goToService', routePath, moduleKey)
  showServicesDropdown.value = false
  
  // Check if user is authenticated
  if (isAuthenticated.value) {
    // User is logged in - check subscription
    const subscribed = authStore?.user?.modules?.includes?.(moduleKey) || 
                      authStore?.user?.permissions?.includes?.(moduleKey) || 
                      false
    
    if (subscribed || !moduleKey) {
      // Has access - navigate to module
      router.push(routePath)
    } else {
      // Logged in but not subscribed - show message and scroll to pricing
      uiStore.showErrorToast('You are not subscribed to this module. Please subscribe to access.')
      // Smoothly scroll to the pricing section on the landing page without changing hash
      scrollToSection('pricing')
    }
  } else {
    // User not logged in - save intended destination and go to login
    localStorage.setItem('intended_route', routePath)
    if (moduleKey) {
      localStorage.setItem('intended_module', moduleKey)
    }
    
    // Show helpful message
    uiStore.showInfoToast('Please sign in to access this module')
    await router.push('/login')
  }
}

const scrollToSection = (sectionId) => {
  console.log('scrollToSection', sectionId)
  // If we're not on the home page, navigate to home first
  if (router.currentRoute.value.path !== '/') {
    router.push('/').then(() => {
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    })
  } else {
    // Already on home page, just scroll
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Close mobile menu if open
  if (menuOpen.value) {
    menuOpen.value = false
  }
}

const scrollToFAQ = (event) => {
  console.log('scrollToFAQ')
  event.preventDefault()

  // Navigate to help page with FAQ anchor
  router.push('/help').then(() => {
    // Wait for navigation to complete, then scroll to FAQ
    setTimeout(() => {
      const faqElement = document.getElementById('faq')
      if (faqElement) {
        faqElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  })

  // Close dropdowns
  showSupportDropdown.value = false
}

const scrollToServices = (event) => {
  console.log('scrollToServices')
  event.preventDefault()
  
  // Scroll to the modules/services section on the landing page
  scrollToSection('modules')
  
  // Close the services dropdown
  showServicesDropdown.value = false
}

const handleLogout = async () => {
  console.log('handleLogout')
  try {
    authStore.logout()
    showUserDropdown.value = false
    uiStore.showSuccessToast('Logged out successfully')
    await router.push('/login')
  } catch (error) {
    uiStore.showErrorToast('Error logging out')
  }
}

const toggleUserDropdown = () => {
  showUserDropdown.value = !showUserDropdown.value
}

function checkMobile() {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)

  // Simple fade in animation for logo
  const logo = document.querySelector('.logo-animate')
  if (logo) {
    logo.style.opacity = '0'
    logo.style.transform = 'translateY(-10px)'
    setTimeout(() => {
      logo.style.transition = 'all 0.5s ease'
      logo.style.opacity = '1'
      logo.style.transform = 'translateY(0)'
    }, 100)
  }

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    const menu = document.getElementById('menu')
    const btn = document.getElementById('menu-btn')
    if (
      menuOpen.value &&
      menu &&
      btn &&
      !menu.contains(e.target) &&
      !btn.contains(e.target)
    ) {
      menuOpen.value = false;
    }
  });

  // Handle PWA beforeinstallprompt event - Global Listener
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar on mobile
    e.preventDefault()
    deferredPrompt.value = e
    window.deferredPrompt = e // Backup to global
    console.log('📲 Install Prompt Captured')
  })

  // Show hint a few seconds after page load if not dismissed
  const dismissed = localStorage.getItem('install_prompt_dismissed') === '1'
  setTimeout(() => {
    if (!dismissed) {
      // Don't auto-show hint anymore as per user request
      // showInstallHint.value = true 
    }
  }, 6000)

  // When installed, clean up
  window.addEventListener('appinstalled', () => {
    uiStore.showSuccessToast('App installed successfully')
    deferredPrompt.value = null
    localStorage.setItem('install_prompt_dismissed', '1')
    showInstallHint.value = false
  })
});

// Simple menu animation on mobile
watch(menuOpen, (open) => {
  if (isMobile.value) {
    nextTick(() => {
      const menu = document.getElementById('menu');
      if (open && menu) {
        menu.style.opacity = '0';
        menu.style.transform = 'translateY(-10px)';
        setTimeout(() => {
          menu.style.transition = 'all 0.3s ease';
          menu.style.opacity = '1';
          menu.style.transform = 'translateY(0)';
        }, 50);
      }
    });
  }
});

const showInstallModal = ref(false)
const isIOS = ref(false)

// Install handlers
const handleInstallClick = async () => {
  console.log('🔘 Install button clicked')
  
  // Check if app is already installed (PWA mode)
  if (window.matchMedia('(display-mode: standalone)').matches || 
      window.navigator.standalone === true) {
    uiStore.showInfoToast('App is already installed!')
    return
  }

  // Check for iOS
  isIOS.value = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
  const isAndroid = /Android/.test(navigator.userAgent)
  
  // Check global deferred prompt
  const promptEvent = deferredPrompt.value || window.deferredPrompt;
  
  if (promptEvent) {
    // We have a native prompt, use it
    try {
      if (typeof promptEvent.prompt === 'function') {
        await promptEvent.prompt()
        const choice = await promptEvent.userChoice
        if (choice.outcome === 'accepted') {
          uiStore.showSuccessToast('Installing app...')
        }
      }
      deferredPrompt.value = null
      window.deferredPrompt = null
    } catch (err) {
      console.error('Install error:', err)
      // Fallback to modal if prompt fails
      showInstallModal.value = true
    }
  } else {
    // No native prompt available. 
    // This happens if:
    // 1. App is already installed (but not detected via specific media query)
    // 2. User dismissed prompt heavily (browser cooldown)
    // 3. Browser doesn't support PWA (e.g. Firefox desktop, Safari desktop)
    // We show the modal with manual instructions.
    console.warn('⚠️ No deferred prompt found. Showing manual install modal.')
    showInstallModal.value = true
  }
}

const confirmInstall = () => handleInstallClick()

const dismissInstall = () => {
  localStorage.setItem('install_prompt_dismissed', '1')
  showInstallHint.value = false
}
</script>

<style scoped>

.landing-navbar {
  background: transparent;
  padding: 0.75rem 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 11000;
  pointer-events: none; /* Let clicks pass through, children will re-enable */
}

/* Floating white rounded bar - PRESERVED */
.floating-shell {
  pointer-events: auto; /* Re-enable clicks for the actual bar */
  max-width: 1200px;
  margin: 0 auto;
  /* background: rgba(255, 255, 255, 0.95); Removed for mesh background */
  backdrop-filter: blur(12px);
  border-radius: 4px; /* Tech square */
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  padding: 0.35rem 0.25rem;
  position: relative;
  z-index: 11001; /* Above mobile menu */
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 1.5rem;
  height: 100%;
  flex-wrap: nowrap;
}

.navbar-logo-group {
  display: flex;
  align-items: center;
}

.logo-3d {
  height: 50px;
  width: auto;
  margin-right: 0.5rem;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  transition: transform 0.3s ease;
}

.logo-3d:hover {
  transform: scale(1.05);
}

.navbar-links-group {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
  opacity: 1;
  visibility: visible;
}

.nav-link {
  color: #4B5563;
  font-size: 0.85rem; /* Crisper tech size */
  font-family: 'JetBrains Mono', 'Fira Code', monospace; /* Tech font */
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px; /* Tech square */
  transition: all 0.2s ease;
  position: relative;
}

.nav-link:hover {
  color: #2F2E8B;
  background-color: #F3F4F6;
  border-radius: 4px;
}

.nav-link i {
  font-size: 0.8em;
}

/* TECH DROPDOWN DESIGN */
.dropdown-container {
  position: relative;
}

.dropdown-menu {
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  background: #ffffff;
  border: 1px solid #E5E7EB;
  border-top: 3px solid #2F2E8B; /* Tech accent top */
  box-shadow: 
    0 20px 40px -5px rgba(0, 0, 0, 0.1), 
    0 10px 20px -5px rgba(0, 0, 0, 0.04);
  padding: 0.5rem 0;
  border-radius: 0 0 4px 4px; /* Slight rounding only at bottom */
  z-index: 100;
}

/* Fix dropdown gap issue */
.dropdown-menu::before {
  content: '';
  position: absolute;
  top: -20px;
  left: 0;
  width: 100%;
  height: 20px;
  background: transparent;
}

.dropdown-container:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.25rem;
  color: #4B5563;
  transition: all 0.2s ease;
  border-left: 2px solid transparent;
  margin: 2px 0;
}

.dropdown-item:hover {
  background-color: #F8FAFC;
  border-left-color: #2F2E8B; /* Tech indicator */
  color: #2F2E8B;
}

.dropdown-item .w-8 {
  background: #F3F4F6;
  border-radius: 4px; /* Square icons */
  font-size: 0.9rem;
  transition: all 0.2s;
  border: 1px solid #E5E7EB;
}

.dropdown-item:hover .w-8 {
  background: #2F2E8B;
  border-color: #2F2E8B;
}

.dropdown-item:hover .w-8 i {
  color: white !important;
}

.dropdown-item .font-medium {
  font-family: 'JetBrains Mono', 'Fira Code', monospace; /* Tech font */
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 700;
}

.dropdown-item .text-xs {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: #9CA3AF;
}

@media (max-width: 767px) {
  .navbar-content {
    padding: 0 1rem;
  }
  
  .navbar-links-group {
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin: 0 1rem;
    right: 0;
    margin: 0 1rem;
    /* background: rgba(255, 255, 255, 0.98); Removed for mesh background */
    padding: 2rem 1.5rem;
    padding: 2rem 1.5rem;
    gap: 1.25rem;
    display: none;
    border-radius: 4px; /* Tech square */
    box-shadow: 
      0 10px 40px rgba(0, 0, 0, 0.1),
      0 4px 10px rgba(0, 0, 0, 0.05);
    border: 1px solid #e5e7eb;
    border-top: 3px solid #2F2E8B;
    transform-origin: top center;
    animation: mobileMenuSlide 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 1000;
    align-items: flex-start; /* Left align items */
    pointer-events: auto !important; /* Fix hit testing for absolutely positioned child of pointer-events: none */
  }

  /* Mobile Auth Styling */
  .signin-link {
    width: 100%;
    text-align: left;
    padding: 0.75rem 0.5rem; /* Match alignment */
    margin-right: 0 !important;
    display: flex;
    align-items: center;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.9rem;
    text-transform: uppercase;
    color: #4B5563 !important;
    font-weight: 700;
    border-bottom: 1px solid #f3f4f6;
  }
  
  .signin-link:hover {
    color: #2F2E8B !important;
    padding-left: 1rem;
    background: #f8fafc;
  }

  .cta-primary {
    width: 100%;
    border-radius: 4px !important; /* Tech square */
    font-family: 'JetBrains Mono', monospace;
    text-transform: uppercase;
    font-size: 0.9rem;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.5rem;
    box-shadow: none !important;
  }

  /* Tech Font & Deep Blue - MAINTAINED */
  .nav-link {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.9rem;
    font-weight: 700;
    padding: 1rem 1.5rem;
    border-radius: 4px; /* Tech square */
    text-align: left;
    width: 100%;
    min-height: 3rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: transparent;
    border: 1px solid transparent;
    border-bottom: 1px solid #f3f4f6;
    color: #4B5563;
    text-transform: uppercase;
    text-shadow: none;
    letter-spacing: 0.5px;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
    box-shadow: none;
  }

  .nav-link:hover {
    background: #f8fafc;
    color: #2F2E8B;
    transform: none;
    box-shadow: none;
    border-color: #e5e7eb;
    border-left: 3px solid #2F2E8B;
    padding-left: 1.2rem; /* Compensate for border */
  }
  
  .nav-link i {
      font-size: 0.9em;
  }

  .dropdown-menu {
      position: static;
      opacity: 1;
      visibility: visible;
      transform: none;
      box-shadow: none;
      border: none;
      border-left: 3px solid #2F2E8B;
      background: transparent;
      margin-left: 0.5rem;
      padding-left: 1rem;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      width: 100%;
  }

  .dropdown-item {
      padding: 0.75rem 0;
      color: #2F2E8B;
      width: 100%;
      justify-content: flex-start;
  }

  .dropdown-item .font-medium {
     font-size: 0.9rem;
     color: #2F2E8B; /* Enforce Deep Blue */
     font-family: 'JetBrains Mono', monospace;
  }
  
  .desktop-nav {
    display: none !important;
  }

  .mobile-nav {
    display: flex !important;
  }
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Restored Animations & Desktop Styles */
.desktop-nav {
  display: flex !important;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes mobileMenuSlide {
  0% { opacity: 0; transform: translateY(-25px) scale(0.9) rotateX(-10deg); filter: blur(8px); }
  100% { opacity: 1; transform: translateY(0) scale(1) rotateX(0deg); filter: blur(0px); }
}

@keyframes buttonPress {
  0% { transform: scale(1); }
  50% { transform: scale(0.97); }
  100% { transform: scale(1); }
}

@keyframes menuItemSlide {
  0% { opacity: 0; transform: translateX(-40px); filter: blur(4px); }
  100% { opacity: 1; transform: translateX(0); filter: blur(0px); }
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
