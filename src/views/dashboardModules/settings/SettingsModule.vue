<template>
  <div class="settings-design-system min-h-screen flex flex-col font-sans relative text-gray-900 dark:bg-black dark:text-gray-100">
    <!-- Mesh Background -->
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <!-- Header -->
    <header class="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 sticky top-0 z-30 shadow-sm relative blur-scoped">
      <div class="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-2 h-8 bg-[#2F2E8B] rounded-sm" style="background-color: var(--brand-primary)"></div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-mono font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest">Admin // Module</span>
            </div>
            <h1 class="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Settings Configuration</h1>
          </div>
        </div>

        <div class="flex items-center gap-3">
           <button 
             @click="resetActiveTab" 
             class="border border-gray-300 dark:border-zinc-700 hover:border-gray-400 text-gray-600 dark:text-zinc-400 px-4 py-2 rounded-sm text-xs font-bold font-mono uppercase transition-all flex items-center gap-2 bg-white dark:bg-zinc-800"
           >
             <i class="fas fa-undo"></i> Reset
           </button>

           <button 
             @click="saveActiveTab" 
             class="bg-[#2F2E8B] hover:bg-[#1D226B] text-white px-6 py-2 rounded-sm text-xs font-bold font-mono uppercase shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
             style="background-color: var(--brand-primary)"
             :disabled="isUIPreferencesLoading || notificationsLoading || currencyLoading || telegramLoading"
           >
             <i class="fas" :class="isUIPreferencesLoading || notificationsLoading || currencyLoading || telegramLoading ? 'fa-spinner fa-spin' : 'fa-save'"></i>
             {{ isUIPreferencesLoading || notificationsLoading || currencyLoading || telegramLoading ? 'PROCESSING...' : 'SAVE_CHANGES' }}
           </button>
        </div>
      </div>
    </header>

    <div class="flex-1 w-full relative z-10 pt-0 pb-12 blur-scoped">
      <!-- Settings Navigation -->
      <div class="border-b border-gray-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm sticky top-16 z-20 mb-3 blur-scoped">
        <div class="px-4 sm:px-6 lg:px-8">
          <nav class="-mb-px flex space-x-8 overflow-x-auto custom-scrollbar" aria-label="Tabs">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                activeTab === tab.id
                  ? 'border-[#2F2E8B] text-[#2F2E8B]'
                  : 'border-transparent text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-bold text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-2'
              ]"
              :style="activeTab === tab.id ? { color: 'var(--brand-primary)', borderColor: 'var(--brand-primary)' } : {}"
            >
              {{ tab.name }}
              <span v-if="tab.id === 'notifications' && notificationCount > 0" class="bg-red-500 text-white text-[9px] rounded-full px-1.5 py-0.5 ml-1">{{ notificationCount }}</span>
            </button>
          </nav>
        </div>
      </div>

    <!-- Profile Settings -->
    <div v-if="activeTab === 'profile'" class="px-4 sm:px-6 lg:px-8 space-y-6">
      
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
           <i class="fas fa-sliders-h text-gray-400 text-xs"></i> Main Settings
        </h3>
        <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">V.2.5.0</span>
      </div>

      <!-- Identity & Branding Card -->
      <div class="bg-white dark:bg-zinc-900 p-6 border border-gray-200 dark:border-zinc-800 shadow-sm relative group hover:border-[#2F2E8B] transition-colors rounded-sm">
        <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
        
        <h4 class="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight mb-6 flex items-center gap-2">
          <i class="fas fa-fingerprint text-gray-400 text-xs"></i> Identity & Branding
        </h4>

        <div class="flex flex-col md:flex-row gap-8 items-start">
          <!-- Logo Section -->
          <div class="w-full md:w-auto flex flex-col items-center gap-4">
            <div class="w-32 h-32 bg-gray-50 border border-gray-200 rounded-sm flex items-center justify-center p-2 relative group-hover:border-blue-200 transition-colors">
              <img 
                v-if="profile.companyLogo" 
                :src="profile.companyLogo" 
                alt="Company Logo" 
                class="w-full h-full object-contain"
              />
              <i v-else class="fas fa-cube text-3xl text-gray-300"></i>
            </div>
            <div class="flex flex-col gap-2 w-full">
              <input 
                ref="logoFileInput"
                type="file" 
                accept="image/*" 
                @change="handleLogoUpload"
                class="hidden"
              />
              <button 
                type="button"
                @click="$refs.logoFileInput.click()"
                class="w-full bg-white border border-gray-300 hover:border-[#2F2E8B] text-gray-600 hover:text-[#2F2E8B] px-4 py-2 rounded-sm text-[10px] font-bold font-mono uppercase transition-colors"
                title="Upload New Logo"
              >
                Upload Logo
              </button>
              <button 
                v-if="profile.companyLogo"
                type="button"
                @click="removeCompanyLogo"
                class="text-[10px] text-red-500 hover:text-red-700 font-mono font-bold uppercase underline decoration-dashed"
              >
                Remove Logo
              </button>
            </div>
          </div>

          <!-- Business Fields -->
          <form @submit.prevent="updateProfile" class="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div class="md:col-span-2">
               <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Company Name *</label>
               <input 
                  v-model="profile.company_name"
                  type="text"
                  required
                  class="w-full border-gray-300 rounded-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] font-bold text-gray-900 text-sm placeholder-gray-300"
                  placeholder="ENTER COMPANY NAME"
               />
            </div>

            <div class="md:col-span-2">
               <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Primary Brand Color *</label>
               <div class="flex items-center gap-3 bg-gray-50 p-3 border border-gray-200 rounded-sm">
                  <input 
                    v-model="uiPreferencesForm.brandColors.primary"
                    type="color"
                    class="w-12 h-10 p-0.5 border border-gray-300 rounded-sm cursor-pointer bg-white"
                  />
                  <div class="flex-1">
                    <input 
                      v-model="uiPreferencesForm.brandColors.primary"
                      type="text"
                      class="w-full border-gray-300 rounded-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] font-mono text-xs text-gray-900 uppercase"
                      placeholder="#HEXCOLOR"
                    />
                    <p class="text-[9px] text-gray-400 mt-1 uppercase font-mono">This color will be applied across your dashboard</p>
                  </div>
               </div>
            </div>

            <div>
               <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Contact Email</label>
               <input 
                  v-model="profile.email"
                  type="email"
                  disabled
                  class="w-full bg-gray-50 border-gray-200 rounded-sm text-gray-500 text-sm font-mono cursor-not-allowed"
               />
            </div>

            <div>
               <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Phone Number *</label>
               <input 
                  v-model="profile.phone_number"
                  type="text"
                  required
                  class="w-full border-gray-300 rounded-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] font-mono text-sm placeholder-gray-300"
                  placeholder="+260..."
               />
            </div>

            <div>
              <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Organization Type *</label>
              <select 
                v-model="profile.business_type"
                required
                class="w-full border-gray-300 rounded-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] font-mono text-sm bg-white"
              >
                <option value="" disabled>SELECT TYPE</option>
                <option value="PLC">PUBLIC_LTD_CO (PLC)</option>
                <option value="LTD">PRIVATE_LTD_CO (LTD)</option>
                <option value="SOLE">SOLE_PROPRIETORSHIP</option>
                <option value="PARTNERSHIP">PARTNERSHIP</option>
                <option value="OTHER">OTHER_ENTITY</option>
              </select>
            </div>

             <div>
               <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Tax ID (TPIN)</label>
               <input 
                  v-model="profile.tpin"
                  type="text"
                  class="w-full border-gray-300 rounded-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] font-mono text-sm placeholder-gray-300"
                  placeholder="EX: 1001..."
               />
            </div>

            <div class="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
               <div class="md:col-span-3">
                  <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Address *</label>
                  <input 
                    v-model="profile.address"
                    type="text"
                    required
                    class="w-full border-gray-300 rounded-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] font-mono text-sm placeholder-gray-300"
                    placeholder="HQ LOCATION"
                  />
               </div>
               <div>
                  <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">CITY *</label>
                  <input 
                    v-model="profile.city"
                    type="text"
                    required
                    class="w-full border-gray-300 rounded-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] font-mono text-sm"
                    placeholder="LUSAKA"
                  />
               </div>
               <div>
                  <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">COUNTRY *</label>
                  <input 
                    v-model="profile.country"
                    type="text"
                    required
                    class="w-full border-gray-300 rounded-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] font-mono text-sm"
                    placeholder="ZAMBIA"
                  />
               </div>
            </div>

          </form> 
        </div>
      </div>

      <!-- Security Section -->
      <div class="grid grid-cols-1 gap-6">
         <!-- Security -->
         <div class="bg-white dark:bg-zinc-900 p-6 border border-gray-200 dark:border-zinc-800 shadow-sm relative group hover:border-[#2F2E8B] transition-colors rounded-sm h-full flex flex-col">
            <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
             <h4 class="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight mb-6 flex items-center gap-2">
              <i class="fas fa-shield-alt text-gray-400 text-xs"></i> Change Password
            </h4>
            <div class="space-y-4 flex-1">
               <div class="relative">
                  <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">New Password</label>
                  <input 
                    v-model="profile.newPassword"
                   :type="profileNewPasswordType"
                    autocomplete="new-password"
                    class="w-full border-gray-300 rounded-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] font-mono text-sm pr-10"
                  />
                   <button 
                    type="button" 
                    @click="showProfilePassword = !showProfilePassword"
                    class="absolute right-3 top-7 text-gray-400 hover:text-gray-600"
                  >
                    <i :class="showProfilePassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
               </div>
               <div class="relative">
                  <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Confirm Password</label>
                  <input 
                    v-model="profile.confirmPassword"
                   :type="profileConfirmPasswordType"
                    autocomplete="new-password"
                    class="w-full border-gray-300 rounded-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] font-mono text-sm pr-10"
                  />
                  <button 
                    type="button" 
                    @click="showProfileConfirmPassword = !showProfileConfirmPassword"
                    class="absolute right-3 top-7 text-gray-400 hover:text-gray-600"
                  >
                    <i :class="showProfileConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
               </div>
            </div>
         </div>
      </div>

      <!-- Main Actions -->
      <div class="flex justify-end pt-4 pb-12">
        <button 
           @click="updateProfile"
           class="bg-[#2F2E8B] hover:bg-[#1D226B] text-white px-8 py-3 rounded-sm text-xs font-bold font-mono uppercase shadow-lg hover:shadow-xl transition-all flex items-center gap-3"
        >
          <i class="fas fa-check-double"></i> Save All Settings
        </button>
      </div>

    </div>

    <!-- Email Configuration -->
    <div v-if="activeTab === 'email'" class="px-4 sm:px-6 lg:px-8 space-y-6">
      
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
           <i class="fas fa-server text-gray-400 text-xs"></i> Email Settings
        </h3>
        <button 
          v-if="emailConfigurations.length > 0"
          @click="openNewEmailConfig"
          class="bg-[#2F2E8B] hover:bg-[#1D226B] text-white px-4 py-2 rounded-sm text-[10px] font-bold font-mono uppercase shadow-sm transition-colors flex items-center gap-2"
        >
          <i class="fas fa-plus"></i> New Server
        </button>
      </div>

      <!-- No Configuration State -->
      <div v-if="emailConfigurations.length === 0 && !showEmailConfigForm" class="text-center py-12 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-sm relative group">
        <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
        <div class="w-16 h-16 bg-gray-50 border border-gray-200 rounded-sm flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-envelope-open-text text-3xl text-gray-300"></i>
        </div>
        <h4 class="text-sm font-bold font-mono text-gray-900 mb-2 uppercase tracking-wide">No Email Configurations Found</h4>
        <p class="text-[10px] font-mono text-gray-500 mb-6 max-w-sm mx-auto uppercase">Connect an email server to send emails from the system</p>
        <button 
          @click="openNewEmailConfig"
          class="bg-[#2F2E8B] hover:bg-[#1D226B] text-white px-6 py-2 rounded-sm text-[10px] font-bold font-mono uppercase shadow-sm transition-colors items-center gap-2"
        >
          <i class="fas fa-plus mr-2"></i> Add Email Server
        </button>
      </div>

      <!-- Email Configuration Form -->
      <div v-if="showEmailConfigForm" class="mb-6 border border-gray-200 dark:border-zinc-800 rounded-sm p-6 bg-white dark:bg-zinc-900 shadow-sm relative">
        <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
        <div class="flex justify-between items-center mb-6">
          <h4 class="text-xs font-black text-gray-900 uppercase tracking-wide flex items-center gap-2 relative z-10">
             <i class="fas fa-edit text-gray-400"></i> {{ editingEmailConfig ? 'Edit Email Server' : 'New Email Server' }}
          </h4>
          <button @click="cancelEmailConfig" class="text-gray-400 hover:text-gray-600 transition-colors relative z-10">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <form @submit.prevent="saveEmailConfig" class="space-y-4 relative z-10">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Configuration Name -->
            <div class="md:col-span-2">
              <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">
                Configuration Name *
              </label>
              <input 
                v-model="emailConfigForm.name"
                type="text"
                required
                class="w-full border-gray-300 rounded-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] font-mono text-sm placeholder-gray-300"
                placeholder="E.G. PRIMARY_RELAY"
              />
            </div>

            <!-- SMTP Host -->
            <div>
              <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">
                Mail Server (Host) *
              </label>
              <input 
                v-model="emailConfigForm.smtp_host"
                type="text"
                required
                class="w-full border-gray-300 rounded-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] font-mono text-sm placeholder-gray-300"
                placeholder="smtp.provider.com"
              />
            </div>

            <!-- SMTP Port -->
            <div>
              <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">
                Port *
              </label>
              <input 
                v-model.number="emailConfigForm.smtp_port"
                type="number"
                required
                class="w-full border-gray-300 rounded-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] font-mono text-sm placeholder-gray-300"
                placeholder="587"
              />
            </div>

            <!-- SMTP Username -->
            <div>
              <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">
                Email / Username *
              </label>
              <input 
                v-model="emailConfigForm.smtp_username"
                type="email"
                required
                class="w-full border-gray-300 rounded-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] font-mono text-sm placeholder-gray-300"
                placeholder="user@domain.com"
              />
            </div>

            <!-- SMTP Password -->
            <div>
              <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">
                Password / App Key *
              </label>
              <div class="relative">
                <input 
                  v-model="emailConfigForm.smtp_password"
                  :type="showEmailPassword ? 'text' : 'password'"
                  required
                  class="w-full border-gray-300 rounded-sm px-3 py-2 pr-10 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] font-mono text-sm placeholder-gray-300"
                  placeholder="ΓÇóΓÇóΓÇóΓÇóΓÇóΓÇóΓÇóΓÇó"
                />
                <button 
                  type="button"
                  @click="showEmailPassword = !showEmailPassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <i :class="showEmailPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
            </div>

            <!-- From Name -->
            <div>
              <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">
                From Name *
              </label>
              <input 
                v-model="emailConfigForm.from_name"
                type="text"
                required
                class="w-full border-gray-300 rounded-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] font-mono text-sm placeholder-gray-300"
                placeholder="Company Name"
              />
            </div>

            <!-- From Email -->
            <div>
              <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">
                From Email *
              </label>
              <input 
                v-model="emailConfigForm.from_email"
                type="email"
                required
                class="w-full border-gray-300 rounded-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] font-mono text-sm placeholder-gray-300"
                placeholder="noreply@domain.com"
              />
            </div>

            <!-- Encryption & Status -->
             <div class="md:col-span-2 flex flex-wrap gap-6 pt-2">
                 <!-- Use TLS -->
                <div class="flex items-center">
                  <input 
                    v-model="emailConfigForm.use_tls"
                    type="checkbox"
                    id="use_tls"
                    class="w-4 h-4 text-[#2F2E8B] border-gray-300 rounded-sm focus:ring-[#2F2E8B]"
                  />
                  <label for="use_tls" class="ml-2 text-[10px] font-bold font-mono uppercase text-gray-700 select-none">
                    Use TLS
                  </label>
                </div>

                <!-- Use SSL -->
                <div class="flex items-center">
                  <input 
                    v-model="emailConfigForm.use_ssl"
                    type="checkbox"
                    id="use_ssl"
                    class="w-4 h-4 text-[#2F2E8B] border-gray-300 rounded-sm focus:ring-[#2F2E8B]"
                  />
                  <label for="use_ssl" class="ml-2 text-[10px] font-bold font-mono uppercase text-gray-700 select-none">
                    Use SSL
                  </label>
                </div>

                <!-- Is Active -->
                <div class="flex items-center">
                  <input 
                    v-model="emailConfigForm.is_active"
                    type="checkbox"
                    id="is_active"
                    class="w-4 h-4 text-[#2F2E8B] border-gray-300 rounded-sm focus:ring-[#2F2E8B]"
                  />
                  <label for="is_active" class="ml-2 text-[10px] font-bold font-mono uppercase text-gray-700 select-none">
                    Set as Primary
                  </label>
                </div>
            </div>
          </div>

          <!-- ── Notification Frequency Configuration ── -->
          <div class="md:col-span-2 border-t border-gray-100 pt-4 mt-2">
            <div class="flex items-center gap-2 mb-3">
              <i class="fas fa-clock text-gray-400 text-xs"></i>
              <span class="text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest">Automated Notification Frequency</span>
            </div>
            <p class="text-[9px] font-mono text-gray-400 mb-3">Configure how often the system sends automated emails for each notification type.</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div v-for="nt in NOTIFICATION_TYPES" :key="nt.key" class="border border-gray-100 rounded-sm p-3 bg-gray-50/30">
                <div class="flex items-center justify-between mb-2">
                  <label class="flex items-center gap-2 text-[10px] font-mono font-bold text-gray-700 uppercase select-none cursor-pointer">
                    <input
                      type="checkbox"
                      :checked="emailConfigForm.notif_enabled?.[nt.key] !== false"
                      @change="toggleNotifType(nt.key)"
                      class="w-3.5 h-3.5 text-[#2F2E8B] border-gray-300 rounded-sm focus:ring-[#2F2E8B]"
                    />
                    <i :class="nt.icon" class="text-[11px] text-[#2F2E8B]"></i>
                    {{ nt.label }}
                  </label>
                </div>
                <div class="flex items-center gap-2">
                  <i class="fas fa-sync-alt text-[8px] text-gray-300"></i>
                  <select
                    v-model="emailConfigForm.notif_frequencies[nt.key]"
                    class="w-full text-[9px] font-mono border border-gray-200 rounded-sm px-2 py-1.5 bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]/20 outline-none"
                  >
                    <option value="off">Off</option>
                    <option value="realtime">Real-time</option>
                    <option value="hourly">Every Hour</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Info Box -->
          <div class="bg-blue-50/50 border border-blue-100 rounded-sm p-3 mt-4">
            <div class="flex items-start gap-3">
              <i class="fas fa-info-circle text-[#2F2E8B] mt-0.5 text-xs"></i>
              <div class="text-[10px] font-mono text-[#2F2E8B]">
                <p class="font-bold mb-1 uppercase">GMAIL_PROVIDER_NOTE:</p>
                <ul class="list-disc ml-4 space-y-0.5 opacity-80">
                  <li>REQUIRES_2FA_ENABLED</li>
                  <li>REQUIRES_APP_SPECIFIC_PASSWORD</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-gray-100 border-dashed">
            <button 
              type="button"
              @click="testEmailConfig"
              :disabled="savingEmailConfig"
              class="px-4 py-2 border border-gray-300 text-gray-600 rounded-sm hover:border-[#2F2E8B] hover:text-[#2F2E8B] disabled:opacity-50 transition-colors text-[10px] font-bold font-mono uppercase"
            >
              <i class="fas fa-flask mr-1"></i> Test Connection
            </button>
            <button 
              type="button"
              @click="cancelEmailConfig"
              class="px-4 py-2 border border-gray-300 text-gray-600 rounded-sm hover:bg-gray-50 transition-colors text-[10px] font-bold font-mono uppercase"
            >
              Cancel
            </button>
            <button 
              type="submit"
              :disabled="savingEmailConfig"
              class="px-6 py-2 bg-[#2F2E8B] text-white rounded-sm hover:bg-[#1D226B] disabled:opacity-50 transition-colors shadow-sm text-[10px] font-bold font-mono uppercase"
            >
              <i class="fas fa-save mr-2"></i>
              {{ savingEmailConfig ? 'SAVING...' : 'Save Server' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Email Configurations List -->
      <div v-if="emailConfigurations.length > 0 && !showEmailConfigForm" class="grid grid-cols-1 gap-4">
        <div 
          v-for="config in emailConfigurations" 
          :key="config.id"
           class="bg-white dark:bg-zinc-900 border text-gray-900 dark:text-white p-4 rounded-sm relative group hover:border-[#2F2E8B] transition-colors"
          :class="config.is_active ? 'border-[#2F2E8B] ring-1 ring-[#2F2E8B] bg-blue-50/5' : 'border-gray-200 dark:border-zinc-800'"
        >
           <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>

          <div class="flex items-start justify-between relative z-10">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h4 class="text-sm font-bold font-mono uppercase text-gray-900">{{ config.name }}</h4>
                <span 
                  v-if="config.is_active" 
                  class="px-2 py-0.5 bg-green-100/50 text-green-700 border border-green-200 text-[9px] font-bold font-mono rounded-sm uppercase tracking-wide"
                >
                  ACTIVE
                </span>
                <span 
                  v-else 
                  class="px-2 py-0.5 bg-gray-100 text-gray-500 border border-gray-200 text-[9px] font-bold font-mono rounded-sm uppercase tracking-wide"
                >
                  INACTIVE
                </span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[10px] font-mono text-gray-500">
                <div class="flex items-center gap-2">
                    <i class="fas fa-server w-3 text-gray-300"></i>
                    <span>{{ config.smtp_host }}:{{ config.smtp_port }}</span>
                </div>
                <div class="flex items-center gap-2">
                    <i class="fas fa-user w-3 text-gray-300"></i>
                    <span>{{ config.smtp_username }}</span>
                </div>
                <div class="flex items-center gap-2 sm:col-span-2">
                    <i class="fas fa-paper-plane w-3 text-gray-300"></i>
                    <span>{{ config.from_name }} &lt;{{ config.from_email }}&gt;</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-1">
              <button 
                @click="editEmailConfig(config)"
                class="p-2 text-gray-400 hover:text-[#2F2E8B] transition-colors"
                title="Edit"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button 
                @click="testSavedEmailConfig(config)"
                class="p-2 text-gray-400 hover:text-green-600 transition-colors"
                title="Send Test Email"
              >
                <i class="fas fa-paper-plane"></i>
              </button>
              <button 
                @click="deleteEmailConfig(config.id)"
                class="p-2 text-gray-400 hover:text-red-600 transition-colors"
                title="Delete"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Module Subscriptions & Calculator -->
    <div v-if="activeTab === 'modules'" class="px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in pb-24">
      
      <!-- Live Subscription KPIs Row -->
      <div v-if="subscriptionDetails.length > 0" class="grid grid-cols-2 lg:grid-cols-6 gap-3">
        <div v-for="kpi in activeSubscriptionKPIs" :key="kpi.label" 
          class="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 p-3 rounded-sm shadow-sm relative overflow-hidden group hover:border-[#2F2E8B] transition-all"
        >
           <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-20"></div>
           <div class="flex items-start justify-between relative z-10">
              <div>
                <span class="block text-[8px] font-mono font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest leading-none mb-1">{{ kpi.label }}</span>
                <span class="text-sm font-black text-gray-900 dark:text-white tracking-tight leading-none" :class="kpi.color">{{ kpi.value }}</span>
              </div>
              <i :class="[kpi.icon, kpi.color]" class="text-[10px] opacity-40 group-hover:scale-110 transition-transform"></i>
           </div>
        </div>
      </div>

      <!-- Subscription Overview Section (Top Priority) -->
      <div v-if="subscriptionDetails.length > 0" class="space-y-4">
        <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
           <i class="fas fa-receipt text-gray-400 text-xs"></i> Active Subscriptions & Branch Usage
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
           <div 
             v-for="sub in subscriptionDetails" 
             :key="sub.id" 
             class="bg-white dark:bg-zinc-900 border-2 border-gray-100 dark:border-zinc-800 p-4 rounded-sm relative overflow-hidden group hover:border-[#2F2E8B] transition-all shadow-sm"
           >
              <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-30"></div>
              <div class="flex items-center justify-between mb-3 relative z-10">
                 <span class="text-[9px] font-mono font-bold text-[#2F2E8B] uppercase tracking-wider bg-blue-50 px-2 py-0.5 border border-blue-100">{{ sub.module_id }}</span>
                 <div class="flex items-center gap-1">
                   <div class="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                   <span class="text-[8px] font-mono font-bold text-gray-400 uppercase">ACTIVE</span>
                 </div>
              </div>
              <h5 class="text-xs font-black text-gray-900 uppercase mb-3 relative z-10 flex items-center gap-2">
                <i class="fas fa-store-alt text-gray-300 text-[10px]"></i>
                Branch: {{ sub.branch_name || 'MAIN' }}
              </h5>
              <div class="space-y-2 relative z-10 pt-2 border-t border-gray-50">
                 <div class="flex justify-between items-center text-[9px] font-mono uppercase">
                    <span class="text-gray-400">Due Date:</span>
                    <span class="text-gray-900 font-bold" :class="getDaysLeft(sub.due_date).includes('Expired') ? 'text-red-600' : 'text-blue-600'">
                      {{ formatDate(sub.due_date) }}
                    </span>
                 </div>
                 <div class="flex justify-between items-center text-[9px] font-mono uppercase">
                    <span class="text-gray-400">Amount Paid:</span>
                    <span class="text-gray-900 font-bold">{{ config.baseCurrency }}{{ (sub.paid_amount || 0).toLocaleString() }}</span>
                 </div>
                 <div class="flex justify-between items-center text-[9px] font-mono uppercase pt-1 border-t border-dashed border-gray-100 mt-1">
                    <span class="text-gray-400">Disk Consumption:</span>
                    <span class="text-gray-900 font-bold text-blue-600">{{ sub.storage_used || '0.00' }} MB</span>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <!-- ΓòÉΓòÉΓòÉ Manage My Modules ΓòÉΓòÉΓòÉ -->
      <div class="space-y-6 pt-4 border-t border-gray-100">
        <div>
          <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
            <i class="fas fa-puzzle-piece text-gray-400 text-xs"></i> Manage My Modules
          </h3>
          <p class="text-[10px] font-mono text-gray-500 uppercase mt-1">Subscribe or unsubscribe from modules. Free modules take effect immediately.</p>
        </div>

        <!-- Active Modules -->
        <div v-if="activeModulesList.length > 0">
          <h4 class="text-xs font-black text-gray-900 uppercase tracking-wide border-b border-gray-100 pb-2 mb-4 flex items-center gap-2">
            <div class="w-1.5 h-1.5 rounded-full bg-green-500"></div> Active Modules ({{ activeModulesList.length }})
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div v-for="mod in activeModulesList" :key="mod.id"
              class="bg-white border border-gray-200 p-4 rounded-sm relative overflow-hidden group hover:border-red-200 transition-all shadow-sm"
            >
              <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-20"></div>
              <div class="flex items-start justify-between gap-3 relative z-10">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-1">
                    <i :class="mod.icon" class="text-[10px] text-gray-400"></i>
                    <span class="text-xs font-black text-gray-900 uppercase tracking-tight">{{ mod.title }}</span>
                  </div>
                  <p class="text-[9px] font-mono text-gray-500 leading-tight">{{ mod.desc }}</p>
                  <div class="flex items-center gap-2 mt-2">
                    <span v-if="mod.free" class="text-[8px] font-mono font-bold bg-green-100 text-green-700 px-1.5 py-0.5 uppercase rounded-sm">Free</span>
                    <span v-else class="text-[8px] font-mono font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 uppercase rounded-sm">Paid</span>
                    <span v-if="getModuleSubscriptionInfo(mod.id)?.due_date" class="text-[8px] font-mono text-gray-400 flex items-center gap-1">
                      <i class="far fa-clock"></i> {{ getDaysLeft(getModuleSubscriptionInfo(mod.id).due_date) }} left
                    </span>
                  </div>
                </div>
                <button
                  @click="handleUnsubscribeModule(mod.id)"
                  :disabled="unsubscribingModules[mod.id]"
                  class="shrink-0 border border-red-200 text-red-600 hover:bg-red-600 hover:text-white text-[9px] font-bold uppercase px-3 py-1.5 rounded-sm transition-colors disabled:opacity-50"
                >
                  <span v-if="!unsubscribingModules[mod.id]">Unsubscribe</span>
                  <span v-else><i class="fas fa-spinner animate-spin"></i></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Available Modules (not subscribed) -->
        <div v-if="inactiveModulesList.length > 0">
          <h4 class="text-xs font-black text-gray-900 uppercase tracking-wide border-b border-gray-100 pb-2 mb-4 flex items-center gap-2">
            <div class="w-1.5 h-1.5 rounded-full bg-gray-300"></div> Available Modules ({{ inactiveModulesList.length }})
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div v-for="mod in inactiveModulesList" :key="mod.id"
              class="bg-white border border-gray-200 p-4 rounded-sm relative overflow-hidden group hover:border-[#2F2E8B] transition-all shadow-sm"
            >
              <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-20"></div>
              <div class="flex items-start justify-between gap-3 relative z-10">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-1">
                    <i :class="mod.icon" class="text-[10px] text-gray-400"></i>
                    <span class="text-xs font-black text-gray-900 uppercase tracking-tight">{{ mod.title }}</span>
                  </div>
                  <p class="text-[9px] font-mono text-gray-500 leading-tight">{{ mod.desc }}</p>
                  <div class="flex items-center gap-2 mt-2">
                    <span v-if="mod.free" class="text-[8px] font-mono font-bold bg-green-100 text-green-700 px-1.5 py-0.5 uppercase rounded-sm">Free</span>
                    <span v-else class="text-[8px] font-mono font-bold bg-gray-100 text-gray-600 px-1.5 py-0.5 uppercase rounded-sm">{{ config.baseCurrency }}{{ mod.price || 0 }} / MO</span>
                    <span v-if="pendingModules.includes(mod.id)" class="text-[8px] font-mono font-bold bg-yellow-100 text-yellow-700 px-1.5 py-0.5 uppercase rounded-sm animate-pulse">Pending</span>
                  </div>
                  <!-- Duration selector for paid modules -->
                  <div v-if="!mod.free && !pendingModules.includes(mod.id)" class="mt-3">
                    <label class="block text-[8px] font-mono font-bold text-gray-400 uppercase mb-1 tracking-wider">Duration</label>
                    <select
                      v-model="modulePaymentPlans[mod.id]"
                      class="w-full text-[10px] font-mono border border-gray-200 rounded-sm px-2 py-1.5 bg-white text-gray-700 focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]/20 outline-none"
                    >
                      <option value="monthly">1 Month</option>
                      <option value="2months">2 Months</option>
                      <option value="quarterly">3 Months (Quarterly)</option>
                      <option value="6months">6 Months</option>
                      <option value="yearly">12 Months (Yearly)</option>
                    </select>
                    <p v-if="modulePaymentPlans[mod.id] && modulePaymentPlans[mod.id] !== 'monthly'" class="text-[8px] font-mono text-[#2F2E8B] mt-1">
                      Total: {{ config.baseCurrency }}{{ getModulePlanTotal(mod, modulePaymentPlans[mod.id]) }}
                    </p>
                  </div>
                </div>
                <div class="shrink-0 flex flex-col gap-1">
                  <button v-if="!pendingModules.includes(mod.id)"
                    @click="handleSubscribeModule(mod)"
                    :disabled="subscribingModules[mod.id]"
                    class="border border-[#2F2E8B] text-[#2F2E8B] hover:bg-[#2F2E8B] hover:text-white text-[9px] font-bold uppercase px-3 py-1.5 rounded-sm transition-colors disabled:opacity-50"
                  >
                    <span v-if="!subscribingModules[mod.id]">{{ mod.free ? 'Activate' : 'Subscribe' }}</span>
                    <span v-else><i class="fas fa-spinner animate-spin"></i></span>
                  </button>
                  <button v-else
                    @click="cancelPendingRequest(mod.id)"
                    class="border border-yellow-300 text-yellow-700 hover:bg-yellow-600 hover:text-white text-[9px] font-bold uppercase px-3 py-1.5 rounded-sm transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section Header -->
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pt-4 border-t border-gray-100">
        <div>
          <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
             <i class="fas fa-layer-group text-gray-400 text-xs"></i> Plan Configuration
          </h3>
          <p class="text-[10px] font-mono text-gray-500 uppercase mt-1">Configure your business tier and subscribed modules.</p>
        </div>
      </div>

      <!-- Step 1: Business Tier Selection -->
      <div class="space-y-4">
         <h4 class="text-xs font-black text-gray-900 uppercase tracking-wide border-b border-gray-100 pb-2">1. Select Business Scale</h4>
         <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           <div 
             v-for="(tier, key, index) in config.tiers" 
             :key="key"
             @click="selectTier(key)"
             class="group relative bg-white dark:bg-zinc-900 border cursor-pointer hover:border-[#2F2E8B] transition-all duration-300 flex flex-col h-full overflow-hidden hover:shadow-md hover:-translate-y-0.5 rounded-sm"
             :class="selectedTierId === key ? 'border-[#2F2E8B] shadow-md ring-1 ring-[#2F2E8B]' : 'border-gray-200 dark:border-zinc-800'"
           >
              <!-- Tech Header -->
             <div class="p-4 border-b border-gray-100 bg-gray-50/50 relative">
                <div v-if="selectedTierId === key" class="absolute top-0 right-0 p-2">
                  <div class="w-4 h-4 bg-[#2F2E8B] text-white flex items-center justify-center rounded-sm">
                     <i class="fas fa-check text-[10px]"></i>
                  </div>
                </div>

                <div v-if="ownerSubscription && ownerSubscription.tier === key" class="absolute top-2 left-2">
                  <span class="bg-green-600 text-white text-[8px] font-mono font-black uppercase px-2 py-0.5 rounded-sm">Current Plan</span>
                </div>

                <div v-if="isTierCapacityExceeded(key)" class="absolute bottom-0 left-0 right-0 bg-orange-50 border-t border-orange-200 z-20 flex items-center gap-1 px-3 py-1">
                   <i class="fas fa-info-circle text-orange-400 text-[9px]"></i>
                   <span class="text-[8px] font-mono text-orange-600 uppercase">Usage exceeds this plan's storage</span>
                </div>
                
                <div class="flex items-center gap-2 mb-1">
                    <div class="w-1 h-3 bg-[#2F2E8B]"></div>
                    <span class="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Option {{ index + 1 }}</span>
                </div>
                
                <h3 class="text-base font-black text-gray-900 uppercase tracking-tight mb-2">{{ tier.label }}</h3>
                
                <div class="flex items-baseline gap-1">
                   <span class="text-xl font-black text-gray-900 tracking-tighter">{{ formatDiscount(tier.discountPercentage) }}</span>
                </div>
             </div>

             <!-- Body -->
             <div class="p-4 relative flex-1">
               <div v-if="selectedTierId === key" class="absolute inset-0 dotted-pattern pointer-events-none opacity-50"></div>
               <p class="text-[10px] font-mono text-gray-500 mb-4 relative z-10 min-h-[2.5em]">{{ tier.description }}</p>
               
               <ul class="space-y-2 relative z-10">
                  <li class="flex items-start gap-2">
                    <span class="font-mono text-[#2F2E8B] text-[10px] font-bold">[+]</span>
                    <span class="text-[10px] text-gray-600 font-bold uppercase">Max {{ tier.maxUsers }} Users</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="font-mono text-[#2F2E8B] text-[10px] font-bold">ΓÇó</span>
                    <span class="text-[10px] text-gray-600 font-bold uppercase">Max {{ tier.maxBranches }} Branch</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="font-mono text-[#2F2E8B] text-[10px] font-bold">ΓÇó</span>
                    <span class="text-[10px] text-gray-600 font-bold uppercase">{{ formatStorage(tier.baseStorageMB) }} Storage</span>
                  </li>
               </ul>
             </div>
           </div>
         </div>
      </div>

      <!-- Step 2: Config & Modules -->
      <div v-if="selectedTierId" class="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
        
        <!-- Left Column: Settings & Modules -->
        <div class="lg:col-span-8 space-y-6">
          
          <!-- Configuration Card -->
          <div class="bg-white dark:bg-zinc-900 rounded-sm shadow-sm border border-gray-200 dark:border-zinc-800 p-6 relative group overflow-hidden">
             <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
             <div class="absolute top-0 left-0 w-1 h-full bg-[#2F2E8B]"></div>
             
            <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight mb-6 relative z-10 flex items-center gap-2">
              <i class="fas fa-sliders-h text-gray-400 text-xs"></i> 2. Usage Configuration
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              
              <!-- Billing Duration -->
              <div>
                <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-2 tracking-wider">Duration (Months)</label>
                <div class="flex items-center">
                   <button @click="decrementMonths" class="w-8 h-8 border border-gray-200 bg-gray-50 text-gray-600 hover:bg-[#2F2E8B] hover:text-white transition-colors font-bold rounded-l-sm">-</button>
                   <input type="number" v-model.number="customMonths" min="1" class="block w-full text-center border-y border-gray-200 h-8 text-xs font-mono focus:ring-0 z-0">
                   <button @click="incrementMonths" class="w-8 h-8 border border-gray-200 bg-gray-50 text-gray-600 hover:bg-[#2F2E8B] hover:text-white transition-colors font-bold rounded-r-sm">+</button>
                </div>
                 <div class="mt-2 text-right">
                     <span class="text-[9px] font-mono uppercase bg-gray-100 px-2 py-0.5 rounded-sm text-gray-500 tracking-wide" 
                        :class="activeCycle.discountPercentage > 0 ? 'bg-green-100 text-green-700 font-bold' : ''">
                        {{ activeCycle.label }} Rate ({{ activeCycle.discountPercentage }}% Off)
                     </span>
                 </div>
              </div>

              <!-- Number of Users -->
              <div>
                <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-2 tracking-wider">Number of Users</label>
                <div class="flex items-center">
                   <button @click="decrementUsers" class="w-8 h-8 border border-gray-200 bg-gray-50 text-gray-600 hover:bg-[#2F2E8B] hover:text-white transition-colors font-bold rounded-l-sm">-</button>
                   <input type="number" v-model.number="customUsers" min="1" class="block w-full text-center border-y border-gray-200 h-8 text-xs font-mono focus:ring-0 z-0">
                   <button @click="incrementUsers" class="w-8 h-8 border border-gray-200 bg-gray-50 text-gray-600 hover:bg-[#2F2E8B] hover:text-white transition-colors font-bold rounded-r-sm">+</button>
                </div>
              </div>
              
              <!-- Number of Branches -->
              <div>
                <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-2 tracking-wider">Number of Branches</label>
                 <div class="flex items-center">
                   <button @click="decrementBranches" class="w-8 h-8 border border-gray-200 bg-gray-50 text-gray-600 hover:bg-[#2F2E8B] hover:text-white transition-colors font-bold rounded-l-sm">-</button>
                   <input type="number" v-model.number="customBranches" min="1" class="block w-full text-center border-y border-gray-200 h-8 text-xs font-mono focus:ring-0 z-0">
                   <button @click="incrementBranches" class="w-8 h-8 border border-gray-200 bg-gray-50 text-gray-600 hover:bg-[#2F2E8B] hover:text-white transition-colors font-bold rounded-r-sm">+</button>
                </div>
              </div>

              <!-- Extra Storage Selection -->
              <div class="md:col-span-3 border-t border-gray-100 pt-6 mt-2">
                <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-3 tracking-wider">Add Extra Storage Space</label>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                   <button 
                     v-for="opt in config.surcharges.storageOptions" 
                     :key="opt.id"
                     @click="selectedStorageId = (selectedStorageId === opt.id ? null : opt.id)"
                     class="flex flex-col items-center justify-center p-3 border rounded-sm transition-all relative overflow-hidden group"
                     :class="selectedStorageId === opt.id ? 'border-[#2F2E8B] bg-blue-50/20 ring-1 ring-[#2F2E8B]' : 'border-gray-200 bg-gray-50/30 hover:border-blue-200'"
                   >
                      <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-30"></div>
                      <span class="text-xs font-black text-gray-900 mb-1 z-10">{{ opt.label }}</span>
                      <span class="text-[9px] font-mono font-bold text-[#2F2E8B] z-10">{{ config.baseCurrency }}{{ opt.price.toLocaleString() }} / MO</span>
                      <div v-if="selectedStorageId === opt.id" class="absolute top-1 right-1">
                         <i class="fas fa-check-circle text-[#2F2E8B] text-[10px]"></i>
                      </div>
                   </button>
                </div>
              </div>

            </div>
          </div>

          <!-- Modules Selection -->
          <div>
            <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-2">
               <i class="fas fa-cubes text-gray-400 text-xs"></i> 3. Select Modules
            </h3>
            <div v-for="(category, idx) in config.modules" :key="idx" class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 overflow-hidden rounded-sm mb-4 relative">
               <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-40"></div>
               <div class="bg-gray-50/50 px-6 py-3 border-b border-gray-100 flex items-center gap-3 relative z-10">
                 <div class="w-1 h-3 bg-[#2F2E8B]"></div>
                 <h3 class="text-xs font-black text-gray-900 uppercase tracking-widest">{{ category.category }}</h3>
               </div>
                <div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                 <template v-for="module in category.items" :key="module.id">
                  <div 
                     v-if="(module.id !== 'custom_dev' || selectedTierId === 'enterprise') && !module.adminOnly"
                     class="relative flex items-start p-3 border transition-all cursor-pointer group hover:shadow-sm rounded-sm"
                     :class="[
                       isModuleSelected(module.id) ? 'border-[#2F2E8B] bg-blue-50/10' : 'border-gray-200 hover:border-blue-200 bg-white',
                       pendingModules.includes(module.id) ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
                     ]"
                     @click="!pendingModules.includes(module.id) && toggleModuleSelection(module.id, module)"
                  >
                    <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-50"></div>
                    <div class="flex-1 min-w-0 relative z-10">
                      <div class="flex items-center justify-between mb-1">
                        <label class="font-bold text-xs text-gray-900 select-none cursor-pointer uppercase tracking-tight">
                          {{ module.name }}
                        </label>
                        <span v-if="module.included" class="inline-flex items-center px-1.5 py-0.5 text-[9px] font-mono font-bold bg-green-100 text-green-800 uppercase rounded-sm">
                          Included
                        </span>
                        <span v-else-if="
                          (selectedModuleIds.has('hrmodule') && ['payroll', 'project-management', 'ub_recruiter'].includes(module.id)) ||
                          (selectedModuleIds.has('finance') && ['expenses', 'reports'].includes(module.id)) ||
                          (selectedModuleIds.has('inventory') && module.id === 'supplier') ||
                          (selectedModuleIds.has('ai') && module.id === 'image-capture')
                        " class="inline-flex items-center px-1.5 py-0.5 text-[9px] font-mono font-bold bg-blue-100 text-blue-800 uppercase rounded-sm">
                          Included in Bundle
                        </span>
                        <span v-else-if="pendingModules.includes(module.id)" class="inline-flex items-center px-1.5 py-0.5 text-[9px] font-mono font-bold bg-yellow-100 text-yellow-800 uppercase rounded-sm animate-pulse">
                          Pending Approval
                        </span>
                        <span v-else-if="isModuleSubscribed(module.id)" class="inline-flex flex-col items-end gap-1">
                          <span class="inline-flex items-center px-1.5 py-0.5 text-[9px] font-mono font-bold bg-blue-100 text-blue-800 uppercase rounded-sm">
                            Subscribed
                          </span>
                          <span v-if="getModuleSubscriptionInfo(module.id)?.due_date" class="text-[8px] font-mono text-gray-500 flex items-center gap-1">
                             <i class="far fa-clock"></i> {{ getDaysLeft(getModuleSubscriptionInfo(module.id).due_date) }} left
                          </span>
                        </span>
                        <span v-else-if="module.isConsultation" class="inline-flex items-center px-1.5 py-0.5 text-[9px] font-mono font-bold bg-purple-100 text-purple-800 uppercase rounded-sm">
                          Billed Later
                        </span>
                        <span v-else class="text-xs font-bold text-[#2F2E8B] font-mono">
                           {{ config.baseCurrency }}{{ calculateModulePrice(module).toLocaleString() }}
                           <span v-if="module.isPerUnit" class="text-[9px] text-gray-400 uppercase">/ UNIT</span>
                           <span v-else class="text-[9px] text-gray-400 uppercase">/ MO</span>
                        </span>
                      </div>
                      <p v-if="module.description" class="text-[10px] text-gray-500 font-mono leading-tight">{{ module.description }}</p>

                      <!-- Description Points & Key Features (expandable) -->
                      <div v-if="module.descriptionPoints?.length || module.keyFeatures?.length" class="mt-2" @click.stop>
                        <button 
                          @click.stop="toggleModuleDetails(module.id)" 
                          class="text-[9px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
                          :class="expandedModuleDetails.has(module.id) ? 'text-[#2F2E8B]' : 'text-gray-400 hover:text-[#2F2E8B]'"
                        >
                          <i class="fas fa-chevron-right text-[7px] transition-transform duration-200" :style="{ transform: expandedModuleDetails.has(module.id) ? 'rotate(90deg)' : '' }"></i>
                          {{ expandedModuleDetails.has(module.id) ? 'Hide Details' : 'View Details' }}
                        </button>
                        
                        <div v-if="expandedModuleDetails.has(module.id)" class="mt-2 space-y-2.5 animate-fade-in">
                          <!-- Description Points -->
                          <div v-if="module.descriptionPoints?.length">
                            <span class="block text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">What's Included</span>
                            <ul class="space-y-1">
                              <li v-for="(point, dpIdx) in module.descriptionPoints" :key="'dp-'+dpIdx" class="flex items-start gap-1.5 text-[9px] text-gray-600 font-mono leading-tight">
                                <i class="fas fa-circle text-[3px] text-[#2F2E8B] mt-[5px] shrink-0"></i>
                                <span>{{ point }}</span>
                              </li>
                            </ul>
                          </div>
                          
                          <!-- Key Features -->
                          <div v-if="module.keyFeatures?.length">
                            <span class="block text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Key Features</span>
                            <div class="flex flex-wrap gap-1">
                              <span 
                                v-for="(feat, kfIdx) in module.keyFeatures" 
                                :key="'kf-'+kfIdx" 
                                class="inline-flex items-center gap-1 px-1.5 py-0.5 text-[8px] font-mono font-bold bg-gray-100 text-gray-600 rounded-sm border border-gray-200"
                              >
                                <i class="fas fa-check text-[6px] text-[#2F2E8B]"></i>
                                {{ feat }}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Special Input for UB Recruiter -->
                      <div v-if="module.id === 'ub_recruiter' && isModuleSelected(module.id)" class="mt-2 animate-fade-in" @click.stop>
                        <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase mb-1">Est. Applicants / Month</label>
                        <input 
                          type="number" 
                          v-model.number="moduleInputs.ub_recruiter" 
                          class="block w-full py-1 px-2 text-xs border-gray-300 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] border font-mono rounded-sm"
                        >
                      </div>

                    </div>
                    <div class="ml-3 flex items-center h-5">
                      <div class="w-4 h-4 border flex items-center justify-center transition-colors rounded-sm"
                         :class="isModuleSelected(module.id) || module.included ? 'bg-[#2F2E8B] border-[#2F2E8B]' : 'bg-white border-gray-300'"
                      >
                          <i v-if="isModuleSelected(module.id) || module.included" class="fas fa-check text-white text-[9px]"></i>
                       </div>
                     </div>
                  </div>
                 </template>
                </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Quote Summary (Sticky) -->
        <div class="lg:col-span-4">
          <div class="sticky top-24 space-y-6">
            <div class="bg-white dark:bg-zinc-900 border border-[#2F2E8B] shadow-lg overflow-hidden relative rounded-sm">
               <div class="absolute top-0 right-0 w-16 h-16 bg-[#2F2E8B]/5 -mr-8 -mt-8"></div>
               <!-- Dotted pattern on summary -->
                <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-20"></div>

              <div class="bg-[#2F2E8B] px-6 py-4 text-white relative z-10">
                 <h2 class="text-sm font-black uppercase tracking-widest">Estimated cost</h2>
                 <p class="text-blue-200 text-[9px] font-mono uppercase">Live Calculation</p>
              </div>
               <div class="p-6 space-y-4 relative z-10 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm">
                
                <!-- Breakdown -->
                <div class="space-y-3 text-[10px] font-mono">
                  <div class="flex justify-between text-gray-500 uppercase">
                    <span>Active Tier</span>
                    <span class="font-bold text-[#2F2E8B]">{{ config.tiers[selectedTierId].label }}</span>
                  </div>
                  
                  <div class="flex justify-between text-gray-500 uppercase">
                     <span>Modules Selected</span>
                     <span class="font-bold text-gray-900">{{ selectedModulesCount }}</span>
                  </div>

                  <div class="border-t border-gray-100 pt-2 mt-2"></div>
                  
                  <div class="flex justify-between text-gray-800 font-bold uppercase">
                    <span>Subtotal</span>
                    <span>{{ config.baseCurrency }}{{ totals.modulesCost.toLocaleString() }}</span>
                  </div>
                  
                  <div v-if="totals.extraUserCost > 0" class="flex justify-between text-orange-600">
                    <span>Extra Users ({{ totals.extraUsers }})</span>
                    <span>+{{ config.baseCurrency }}{{ totals.extraUserCost.toLocaleString() }}</span>
                  </div>

                  <div v-if="totals.extraBranchCost > 0" class="flex justify-between text-orange-600">
                    <span>Extra Branches ({{ totals.extraBranches }})</span>
                    <span>+{{ config.baseCurrency }}{{ totals.extraBranchCost.toLocaleString() }}</span>
                  </div>

                  <div v-if="totals.storageCost > 0" class="flex justify-between text-orange-600">
                    <span v-if="config.surcharges.storageOptions.find(o => o.id === selectedStorageId)">
                       Extra Storage ({{ config.surcharges.storageOptions.find(o => o.id === selectedStorageId).label }})
                    </span>
                    <span v-else>Extra Storage</span>
                    <span>+{{ config.baseCurrency }}{{ totals.storageCost.toLocaleString() }}</span>
                  </div>

                  <div v-if="totals.discountAmount > 0" class="flex justify-between text-green-600 font-bold">
                    <span>{{ activeCycle.label }} DISC.</span>
                    <span>-{{ config.baseCurrency }}{{ totals.discountAmount.toLocaleString() }}</span>
                  </div>

                </div>

                <!-- Grand Total -->
                <div class="border-t-2 border-dashed border-gray-200 pt-4 mt-4">
                   <div class="flex justify-between items-baseline">
                     <span class="text-gray-500 font-bold text-[10px] uppercase">TOTAL / {{ customMonths }} MO</span>
                     <span class="text-2xl font-black text-gray-900 tracking-tighter">{{ config.baseCurrency }}{{ totals.grandTotal.toLocaleString() }}</span>
                   </div>
                   <p class="text-[9px] text-gray-400 text-center mt-2 font-mono uppercase">Excludes VAT</p>
                </div>

                <div class="pt-4">
                  <button class="w-full bg-[#2F2E8B] text-white font-bold py-3 text-xs font-mono uppercase tracking-wider hover:bg-[#3D2F88] transition shadow-md group relative overflow-hidden rounded-sm"
                    @click="handleUpgradeSubscription"
                  >
                     <span class="relative z-10">Update Subscription</span>
                  </button>
                </div>
                
                <!-- Terms -->
                   <div class="text-[9px] text-gray-500 text-center font-mono">
                      <p>
                         Changes will be submitted for admin approval.
                      </p>
                   </div>
              </div>
            </div>
            
          </div>
        </div>

      </div>
      
      <!-- No Tier Selected State -->
      <div v-else class="text-center py-12 border border-dashed border-gray-200 rounded-sm bg-gray-50">
        <i class="fas fa-arrow-up text-gray-300 text-xl mb-2 animate-bounce"></i>
        <p class="text-xs font-mono text-gray-400 uppercase">Select a Business Size above to configure your plan</p>
      </div>

    </div>

    <!-- AI Agent Settings Section -->
    <div v-if="activeTab === 'ai-agents'" class="px-4 sm:px-6 lg:px-8 space-y-6">
      
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
           <i class="fas fa-robot text-gray-400 text-xs"></i> AI Agents
        </h3>
        <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">NODE_STATUS: ONLINE</span>
      </div>

      <div class="bg-white dark:bg-zinc-900 border p-6 rounded-sm relative group transition-colors border-gray-200 dark:border-zinc-800">
         <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
         
         <div class="relative z-10">
            <h4 class="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight mb-6 flex items-center gap-2">
              <i class="fas fa-microchip text-gray-400 text-xs"></i> Agent Settings
            </h4>

            <div v-for="agent in aiAgents" :key="agent.id" class="mb-6 last:mb-0 border-b border-gray-100 last:border-0 pb-6 last:pb-0 border-dashed">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-8 h-8 rounded-sm bg-blue-50 flex items-center justify-center text-[#2F2E8B] border border-blue-100">
                  <i class="fas fa-robot"></i>
                </div>
                <div>
                   <h4 class="font-bold font-mono text-xs uppercase text-[#2F2E8B]">{{ agent.displayName }}</h4>
                   <p class="text-[9px] font-mono text-gray-400 uppercase">ID: {{ agent.id }}</p>
                </div>
              </div>
              
              <form @submit.prevent="() => saveAgentSettings(agent)">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div class="space-y-1">
                    <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Schedule</label>
                    <input 
                      v-model="agent.settings.schedule" 
                      type="text" 
                      class="w-full border border-gray-300 rounded-sm px-3 py-2 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] transition-colors text-xs font-mono placeholder-gray-300" 
                      placeholder="0 9 * * 1"
                    />
                  </div>
                  
                  <div class="space-y-1">
                    <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Send Reports Via</label>
                    <select 
                      v-model="agent.settings.delivery_method" 
                      class="w-full border border-gray-300 rounded-sm px-3 py-2 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] transition-colors text-xs font-mono bg-white"
                    >
                      <option value="email">EMAIL_ONLY</option>
                      <option value="sms">SMS_ONLY</option>
                      <option value="both">DUAL_CHANNEL</option>
                    </select>
                  </div>
                  
                  <div class="flex items-end">
                    <button 
                      type="submit" 
                      class="w-full md:w-auto bg-[#2F2E8B] text-white px-6 py-2 rounded-sm hover:bg-[#1D226B] transition-colors flex items-center justify-center gap-2 shadow-sm text-[10px] font-bold font-mono uppercase"
                    >
                      <i class="fas fa-save"></i> Save Agent Settings
                    </button>
                  </div>
                </div>
                <div v-if="agent.success" class="mt-3 bg-green-50 text-green-700 px-3 py-2 rounded-sm text-[10px] font-mono flex items-center border border-green-100 uppercase">
                  <i class="fas fa-check-circle mr-2"></i> UPDATE_SUCCESSFUL
                </div>
                <div v-if="agent.error" class="mt-3 bg-red-50 text-red-700 px-3 py-2 rounded-sm text-[10px] font-mono flex items-center border border-red-100 uppercase">
                  <i class="fas fa-exclamation-circle mr-2"></i> ERR: {{ agent.error }}
                </div>
              </form>
            </div>
         </div>
      </div>
    </div>

    <!-- Add/Edit Goal Modal -->
    <div v-if="showAddGoalModal || showEditGoalModal" class="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[9999] p-4">
      <div class="bg-white rounded-sm max-w-2xl w-full max-h-screen overflow-y-auto">
        <div class="flex items-center justify-between p-6 border-b">
          <h2 class="text-xl font-semibold text-[#1F2937]">
            {{ showEditGoalModal ? 'Edit Goal' : 'Add New Goal' }}
          </h2>
          <button @click="closeGoalModal" class="text-[#6B7280] hover:text-[#374151]">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>
        <div class="p-6">
          <form @submit.prevent="saveGoal" class="space-y-6">
            <!-- Goal Title -->
            <div>
              <label class="block text-sm font-medium text-[#374151] mb-2">Goal Title</label>
              <input 
                v-model="goalForm.title"
                type="text"
                required
                class="w-full border border-[#E0E0E0] rounded-sm px-3 py-2 focus:ring-2 focus:ring-[#2F2E8B] focus:border-[#2F2E8B]"
                placeholder="e.g., Increase Monthly Revenue"
              />
            </div>

            <!-- Goal Description -->
            <div>
              <label class="block text-sm font-medium text-[#374151] mb-2">Description</label>
              <textarea 
                v-model="goalForm.description"
                rows="3"
                class="w-full border border-[#E0E0E0] rounded-sm px-3 py-2 focus:ring-2 focus:ring-[#2F2E8B] focus:border-[#2F2E8B]"
                placeholder="Describe your goal and what success looks like..."
              ></textarea>
            </div>

            <!-- Goal Category and Priority -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-[#374151] mb-2">Category</label>
                <select 
                  v-model="goalForm.category"
                  class="w-full border border-[#E0E0E0] rounded-sm px-3 py-2 focus:ring-2 focus:ring-[#2F2E8B] focus:border-[#2F2E8B]"
                >
                  <option value="revenue">Revenue</option>
                  <option value="sales">Sales</option>
                  <option value="customers">Customers</option>
                  <option value="inventory">Inventory</option>
                  <option value="expenses">Expenses</option>
                  <option value="delivery">Delivery Tickets</option>
                  <option value="efficiency">Efficiency</option>
                  <option value="growth">Growth</option>
                  <option value="quality">Quality</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-[#374151] mb-2">Priority</label>
                <select 
                  v-model="goalForm.priority"
                  class="w-full border border-[#E0E0E0] rounded-sm px-3 py-2 focus:ring-2 focus:ring-[#2F2E8B] focus:border-[#2F2E8B]"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            <!-- Target Values -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-[#374151] mb-2">Current Value</label>
                <input 
                  v-model.number="goalForm.currentValue"
                  type="number"
                  step="0.01"
                  class="w-full border border-[#E0E0E0] rounded-sm px-3 py-2 focus:ring-2 focus:ring-[#2F2E8B] focus:border-[#2F2E8B]"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-[#374151] mb-2">Target Value</label>
                <input 
                  v-model.number="goalForm.targetValue"
                  type="number"
                  step="0.01"
                  required
                  class="w-full border border-[#E0E0E0] rounded-sm px-3 py-2 focus:ring-2 focus:ring-[#2F2E8B] focus:border-[#2F2E8B]"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-[#374151] mb-2">Unit</label>
                <input 
                  v-model="goalForm.unit"
                  type="text"
                  class="w-full border border-[#E0E0E0] rounded-sm px-3 py-2 focus:ring-2 focus:ring-[#2F2E8B] focus:border-[#2F2E8B]"
                  placeholder="e.g., ZMW, units, %"
                />
              </div>
            </div>

            <!-- Deadline -->
            <div>
              <label class="block text-sm font-medium text-[#374151] mb-2">Deadline</label>
              <input 
                v-model="goalForm.deadline"
                type="date"
                required
                class="w-full border border-[#E0E0E0] rounded-sm px-3 py-2 focus:ring-2 focus:ring-[#2F2E8B] focus:border-[#2F2E8B]"
              />
            </div>

            <!-- Data Source Configuration -->
            <div>
              <label class="block text-sm font-medium text-[#374151] mb-2">Data Source</label>
              <select 
                v-model="goalForm.dataSource"
                class="w-full border border-[#E0E0E0] rounded-sm px-3 py-2 focus:ring-2 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] mb-3"
              >
                <option value="manual">Manual Updates</option>
                <option value="pos">POS Sales Data</option>
                <option value="inventory">Inventory Data</option>
                <option value="expenses">Expenses Data</option>
                <option value="delivery">Delivery Tickets</option>
                <option value="kpi">KPI Dashboard</option>
                <option value="crm">CRM Data</option>
              </select>
              <p class="text-xs text-[#6B7280]">Choose how this goal's progress will be tracked automatically</p>
            </div>

            <!-- AI Configuration -->
            <div class="border border-[#E0E0E0] rounded-sm p-4">
              <h4 class="font-medium text-[#374151] mb-3 flex items-center">
                <i class="fas fa-brain text-purple-600 mr-2"></i>
                AI Configuration
              </h4>
              <div class="space-y-3">
                <label class="flex items-center">
                  <input 
                    v-model="goalForm.aiInsightsEnabled"
                    type="checkbox"
                    class="mr-2"
                  />
                  <span class="text-sm">Enable AI-powered insights and recommendations</span>
                </label>
                <label class="flex items-center">
                  <input 
                    v-model="goalForm.aiAlertsEnabled"
                    type="checkbox"
                    class="mr-2"
                  />
                  <span class="text-sm">Send AI alerts for goal progress changes</span>
                </label>
                <label class="flex items-center">
                  <input 
                    v-model="goalForm.aiPredictionsEnabled"
                    type="checkbox"
                    class="mr-2"
                  />
                  <span class="text-sm">Generate AI predictions for goal achievement</span>
                </label>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-end space-x-3 pt-4 border-t">
              <button 
                type="button"
                @click="closeGoalModal"
                class="px-4 py-2 border border-[#E0E0E0] rounded-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                type="submit"
                class="px-6 py-2 bg-[#2F2E8B] text-white rounded-sm hover:bg-[#3D2F88]"
              >
                {{ showEditGoalModal ? 'Update Goal' : 'Create Goal' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Notifications -->
    <!-- Integrations (Telegram Bot) -->
    <div v-if="activeTab === 'integrations'" class="px-4 sm:px-6 lg:px-8 space-y-6">
      
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
          <i class="fab fa-telegram-plane text-[#0088cc] text-xs"></i> Telegram Bot Integration
        </h3>
        <span class="text-[10px] font-mono font-bold uppercase tracking-widest"
          :class="telegramConfig.is_running ? 'text-green-500' : 'text-gray-400'"
        >
          {{ telegramConfig.is_running ? 'BOT_ONLINE' : 'BOT_OFFLINE' }}
        </span>
      </div>

      <!-- Setup Instructions -->
      <div class="bg-blue-50 border border-blue-100 rounded-sm p-4">
        <h4 class="text-xs font-bold text-blue-800 uppercase mb-2 flex items-center gap-2">
          <i class="fas fa-info-circle"></i> How to set up your Telegram Bot
        </h4>
        <ol class="text-xs text-blue-700 space-y-1 list-decimal list-inside font-mono">
          <li>Open Telegram and search for <strong>@BotFather</strong></li>
          <li>Send <code>/newbot</code> and follow the prompts to create your bot</li>
          <li>Copy the <strong>API token</strong> BotFather gives you</li>
          <li>Paste the token below and click <strong>Save &amp; Enable</strong></li>
          <li>Your customers can now chat with your bot to query sales, inventory, expenses and more!</li>
        </ol>
      </div>

      <!-- Bot Configuration Card -->
      <div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-sm p-6 relative group transition-colors">
        <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
        
        <div class="relative z-10 space-y-5">
          <h4 class="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <i class="fas fa-cog text-gray-400 text-xs"></i> Bot Configuration
          </h4>

          <!-- Bot Name -->
          <div class="space-y-1">
            <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase">Bot Display Name</label>
            <input 
              v-model="telegramConfig.bot_name" 
              type="text" 
              class="w-full border border-gray-300 rounded-sm px-3 py-2 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] transition-colors text-xs font-mono placeholder-gray-300" 
              placeholder="e.g. My Business Assistant"
            />
          </div>

          <!-- Bot Token -->
          <div class="space-y-1">
            <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase">Bot API Token</label>
            <div class="flex gap-2">
              <div class="flex-1 relative">
                <input 
                  v-model="telegramConfig.bot_token" 
                  :type="showTokenField ? 'text' : 'password'"
                  class="w-full border border-gray-300 rounded-sm px-3 py-2 pr-10 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] transition-colors text-xs font-mono placeholder-gray-300" 
                  placeholder="Paste your Telegram bot token from @BotFather"
                />
                <button 
                  type="button" 
                  @click="showTokenField = !showTokenField"
                  class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <i :class="showTokenField ? 'fas fa-eye-slash' : 'fas fa-eye'" class="text-xs"></i>
                </button>
              </div>
            </div>
            <p class="text-[9px] text-gray-400 font-mono">Your token is stored securely and never shared.</p>
          </div>

          <!-- Enable Toggle -->
          <div class="flex items-center gap-3">
            <label class="relative inline-flex items-center cursor-pointer">
              <input v-model="telegramConfig.enabled" type="checkbox" class="sr-only peer" />
              <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0088cc]"></div>
            </label>
            <span class="text-xs font-mono font-bold uppercase" :class="telegramConfig.enabled ? 'text-[#0088cc]' : 'text-gray-400'">
              {{ telegramConfig.enabled ? 'ENABLED' : 'DISABLED' }}
            </span>
          </div>

          <!-- Save Button -->
          <div class="flex items-center gap-3">
            <button 
              @click="saveTelegramConfig"
              :disabled="telegramLoading || !telegramConfig.bot_token"
              class="bg-[#0088cc] text-white px-6 py-2 rounded-sm hover:bg-[#006fa5] transition-colors flex items-center gap-2 shadow-sm text-[10px] font-bold font-mono uppercase disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i class="fas fa-save" v-if="!telegramLoading"></i>
              <i class="fas fa-spinner fa-spin" v-else></i>
              Save &amp; Enable Bot
            </button>
            <button 
              v-if="telegramConfig.is_running"
              @click="disableTelegramBot"
              :disabled="telegramLoading"
              class="bg-red-500 text-white px-6 py-2 rounded-sm hover:bg-red-600 transition-colors flex items-center gap-2 shadow-sm text-[10px] font-bold font-mono uppercase disabled:opacity-50"
            >
              <i class="fas fa-stop"></i> Stop Bot
            </button>
          </div>

          <!-- Status Messages -->
          <div v-if="telegramSuccess" class="bg-green-50 text-green-700 px-3 py-2 rounded-sm text-[10px] font-mono flex items-center border border-green-100 uppercase">
            <i class="fas fa-check-circle mr-2"></i> TELEGRAM_BOT_CONFIGURED_SUCCESSFULLY
          </div>
          <div v-if="telegramError" class="bg-red-50 text-red-700 px-3 py-2 rounded-sm text-[10px] font-mono flex items-center border border-red-100 uppercase">
            <i class="fas fa-exclamation-circle mr-2"></i> {{ telegramError }}
          </div>
        </div>
      </div>

      <!-- Bot Status Card -->
      <div v-if="telegramConfig.bot_token" class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-sm p-6 relative group transition-colors">
        <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
        <div class="relative z-10">
          <h4 class="text-sm font-black text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-2">
            <i class="fas fa-signal text-gray-400 text-xs"></i> Bot Status
          </h4>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="bg-gray-50 border border-gray-100 rounded-sm p-3 text-center">
              <div class="text-[10px] font-mono text-gray-400 uppercase mb-1">Status</div>
              <div class="flex items-center justify-center gap-2">
                <span class="w-2 h-2 rounded-full" :class="telegramConfig.is_running ? 'bg-green-500 animate-pulse' : 'bg-gray-300'"></span>
                <span class="text-xs font-bold font-mono" :class="telegramConfig.is_running ? 'text-green-600' : 'text-gray-500'">
                  {{ telegramConfig.is_running ? 'RUNNING' : 'STOPPED' }}
                </span>
              </div>
            </div>
            <div class="bg-gray-50 border border-gray-100 rounded-sm p-3 text-center">
              <div class="text-[10px] font-mono text-gray-400 uppercase mb-1">Bot Name</div>
              <span class="text-xs font-bold font-mono text-gray-700">{{ telegramConfig.bot_name || 'ΓÇö' }}</span>
            </div>
            <div class="bg-gray-50 border border-gray-100 rounded-sm p-3 text-center">
              <div class="text-[10px] font-mono text-gray-400 uppercase mb-1">Conversations</div>
              <span class="text-xs font-bold font-mono text-gray-700">{{ telegramConversations.length }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Conversations List -->
      <div v-if="telegramConfig.bot_token" class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-sm p-6 relative group transition-colors">
        <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-4">
            <h4 class="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
              <i class="fas fa-comments text-gray-400 text-xs"></i> Telegram Conversations
            </h4>
            <button @click="loadTelegramConversations" class="text-[10px] font-mono text-[#0088cc] hover:underline flex items-center gap-1">
              <i class="fas fa-sync-alt" :class="{'fa-spin': telegramConversationsLoading}"></i> Refresh
            </button>
          </div>

          <div v-if="telegramConversationsLoading" class="text-center py-8">
            <i class="fas fa-spinner fa-spin text-gray-300 text-lg"></i>
          </div>

          <div v-else-if="telegramConversations.length === 0" class="text-center py-8 border border-dashed border-gray-200 rounded-sm bg-gray-50">
            <i class="fab fa-telegram-plane text-gray-300 text-xl mb-2"></i>
            <p class="text-[10px] font-mono text-gray-400 uppercase">No conversations yet. Users will appear here once they message your bot.</p>
          </div>

          <div v-else class="space-y-2">
            <div 
              v-for="convo in telegramConversations" 
              :key="convo._id"
              class="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded-sm hover:bg-gray-100 transition-colors"
            >
              <div class="w-8 h-8 rounded-full bg-[#0088cc] flex items-center justify-center text-white text-xs font-bold">
                {{ (convo.username || '?')[0].toUpperCase() }}
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2">
                  <span class="text-xs font-bold font-mono text-gray-800">{{ convo.username || 'Unknown User' }}</span>
                  <span class="text-[9px] font-mono text-gray-400">{{ convo.message_count }} msgs</span>
                </div>
                <p class="text-[10px] text-gray-500 font-mono truncate">{{ convo.last_message || 'No messages' }}</p>
              </div>
              <span class="text-[9px] font-mono text-gray-400 whitespace-nowrap">{{ convo.updated_at ? new Date(convo.updated_at).toLocaleDateString() : '' }}</span>
            </div>
          </div>
        </div>
      </div>

    </div>

    <section v-if="activeTab === 'notifications'" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-sm p-6 relative group shadow-sm mb-8">
      <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
      <h3 class="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#1F2937] dark:text-white">Notifications</h3>
      
      <!-- Controls Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div class="flex items-center space-x-3">
             <!-- Refresh Link -->
             <button @click.prevent="loadNotifications" class="text-sm text-[#2F2E8B] hover:text-[#3D2F88] flex items-center gap-1">
                <i class="fas fa-sync-alt"></i> Refresh
             </button>
             <div class="h-4 w-px bg-gray-300 mx-2"></div>
             <!-- Item Settings Link -->
             <button @click="openItemSettingsPanel" class="text-sm text-[#2F2E8B] hover:text-[#3D2F88]">
                Configure Stock Alerts
             </button>
        </div>
        
        <div class="flex gap-2">
            <button @click="exportNotificationsPDF" class="px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 text-sm flex items-center gap-2">
                <i class="fas fa-file-pdf"></i> PDF
            </button>
             <button @click="exportNotificationsExcel" class="px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 text-sm flex items-center gap-2">
                <i class="fas fa-file-excel"></i> Excel
            </button>
            <button @click="dismissAllNotifications" class="px-3 py-1.5 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm">
                Dismiss All
            </button>
        </div>
      </div>

      
      <!-- Advanced Filters -->
      <div class="mb-6 bg-gray-50 p-4 rounded-sm flex flex-wrap gap-4 items-center border border-gray-200">
         <span class="text-sm font-semibold text-gray-700 flex items-center"><i class="fas fa-filter mr-2 text-[#2F2E8B]"></i> Advanced Filter:</span>
         
         <label class="inline-flex items-center text-sm cursor-pointer hover:bg-white px-3 py-1.5 rounded transition-colors border border-transparent hover:border-gray-300">
           <input type="checkbox" v-model="filterEquipment" class="form-checkbox text-[#2F2E8B] rounded mr-2 h-4 w-4" /> 
           <span class="text-gray-700 select-none">Equipment (Inventory)</span>
         </label>
         
         <label class="inline-flex items-center text-sm cursor-pointer hover:bg-white px-3 py-1.5 rounded transition-colors border border-transparent hover:border-gray-300">
           <input type="checkbox" v-model="filterProduct" class="form-checkbox text-[#2F2E8B] rounded mr-2 h-4 w-4" /> 
           <span class="text-gray-700 select-none">Product (Inventory)</span>
         </label>
         
         <label class="inline-flex items-center text-sm cursor-pointer hover:bg-white px-3 py-1.5 rounded transition-colors border border-transparent hover:border-gray-300">
           <input type="checkbox" v-model="filterLeads" class="form-checkbox text-[#2F2E8B] rounded mr-2 h-4 w-4" /> 
           <span class="text-gray-700 select-none">Leads (CRM)</span>
         </label>
         
         <div class="ml-auto">
             <button v-if="filterEquipment || filterProduct || filterLeads" @click="clearAdvancedFilters" class="text-xs font-medium text-red-600 hover:text-red-800 flex items-center bg-red-50 px-3 py-1.5 rounded border border-red-100 transition-colors">
                 <i class="fas fa-times mr-1"></i> Clear Filters
             </button>
         </div>
      </div>

<!-- Settings & Configuration Panel (Collapsible) -->
      <details class="mb-6 border rounded-sm bg-gray-50 group">
        <summary class="p-4 cursor-pointer font-medium text-gray-700 flex justify-between items-center list-none">
            <span>Notification Configuration</span>
            <span class="group-open:rotate-180 transition-transform"><i class="fas fa-chevron-down"></i></span>
        </summary>
        <div class="p-4 pt-0 border-t border-gray-200">
             <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                  <input v-model="whatsAppNumber" type="text" class="form-input w-full" placeholder="+260..." />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input v-model="notificationEmail" type="email" class="form-input w-full" placeholder="alerts@example.com" />
                </div>
             </div>
             
             <div class="mt-4 space-y-3">
                <div class="flex items-center gap-2">
                    <input type="checkbox" v-model="autoSendEnabled" id="autoSwitch" class="rounded text-[#2F2E8B] focus:ring-[#2F2E8B]" />
                    <label for="autoSwitch" class="text-sm text-gray-700 font-medium">Auto-send Low/Critical Alerts</label>
                </div>
                <div class="flex flex-wrap gap-4 pl-6">
                    <label class="flex items-center gap-2 text-sm text-gray-600">
                        <input type="checkbox" v-model="channelWhatsapp" class="rounded text-[#2F2E8B]" /> WhatsApp
                    </label>
                    <label class="flex items-center gap-2 text-sm text-gray-600">
                        <input type="checkbox" v-model="channelEmail" class="rounded text-[#2F2E8B]" /> Email
                    </label>
                </div>
             </div>
             
             <div class="mt-4 flex justify-end gap-3 border-t pt-4">
                <button @click="sendTest()" class="text-sm text-[#2F2E8B] hover:underline">Send Test Alert</button>
                <button @click="saveNotificationSettings" class="bg-[#2F2E8B] text-white px-4 py-2 rounded hover:bg-[#3D2F88] text-sm">Save Configuration</button>
             </div>
        </div>
      </details>

      <!-- Notifications Table View -->
      <div v-if="notificationCount === 0" class="text-center py-12 bg-gray-50 rounded-sm border border-dashed border-gray-300">
        <i class="fas fa-bell-slash text-gray-300 text-4xl mb-3"></i>
        <p class="text-gray-500">No active notifications.</p>
      </div>

      <div v-else class="space-y-4">
        <!-- Quick toolbar: search + severity chips -->
        <div class="flex flex-col sm:flex-row gap-2 sm:items-center bg-gray-50 border border-gray-200 rounded-sm p-3">
          <div class="relative flex-1">
            <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
            <input
              v-model="notifSearch"
              type="text"
              placeholder="SEARCH MESSAGE OR DETAILS..."
              class="w-full pl-8 pr-3 py-1.5 border border-gray-200 rounded-sm text-xs font-mono uppercase tracking-wider focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] bg-white"
            />
          </div>
          <div class="flex items-center gap-1.5">
            <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mr-1">Severity</span>
            <button
              v-for="sev in ['all', 'critical', 'warning', 'info', 'success']"
              :key="sev"
              @click="notifSeverity = sev"
              :class="['px-2.5 py-1 text-[9px] font-mono font-black uppercase tracking-widest rounded-sm border transition-colors',
                       notifSeverity === sev
                         ? 'bg-[#2F2E8B] text-white border-[#2F2E8B]'
                         : 'bg-white text-gray-500 border-gray-200 hover:border-[#2F2E8B] hover:text-[#2F2E8B]']"
            >{{ sev }}</button>
          </div>
        </div>

        <!-- Category groups -->
        <div v-for="(items, category) in filteredGroupedNotifications" :key="category"
             class="bg-white rounded-sm border border-gray-200 overflow-hidden shadow-sm">
          <!-- Category header (sticky inside scroll, color-themed) -->
          <button
            type="button"
            @click="toggleNotifCategory(category)"
            class="w-full px-4 py-3 border-b border-gray-200 flex justify-between items-center transition-colors"
            :class="getCategoryMeta(category).headerBg + ' hover:brightness-95'"
          >
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 flex items-center justify-center rounded-sm" :class="getCategoryMeta(category).iconWrap">
                <i :class="getCategoryMeta(category).icon" class="text-sm"></i>
              </div>
              <div class="text-left">
                <h4 class="text-sm font-black text-gray-900 uppercase tracking-wide flex items-center gap-2">
                  {{ getCategoryMeta(category).label }}
                  <span class="bg-white border border-gray-200 text-gray-600 text-[10px] font-mono px-2 py-0.5 rounded-sm">{{ items.length }}</span>
                </h4>
                <p class="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{{ getCategoryMeta(category).description }}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span v-if="countBySeverity(items, 'critical')" class="text-[9px] font-mono font-black px-1.5 py-0.5 bg-red-100 text-red-700 uppercase">{{ countBySeverity(items, 'critical') }} CRIT</span>
              <span v-if="countBySeverity(items, 'warning')" class="text-[9px] font-mono font-black px-1.5 py-0.5 bg-amber-100 text-amber-700 uppercase">{{ countBySeverity(items, 'warning') }} WARN</span>
              <i class="fas fa-chevron-down text-gray-400 text-xs transition-transform"
                 :class="{ 'rotate-180': !collapsedNotifCategories[category] }"></i>
            </div>
          </button>

          <!-- Scrollable list of notifications -->
          <div v-if="!collapsedNotifCategories[category]"
               class="max-h-[28rem] overflow-y-auto custom-scrollbar divide-y divide-gray-100">
            <div v-for="notif in items" :key="notif._id || notif.id"
                 class="px-4 py-3 hover:bg-gray-50 transition-colors flex items-start gap-3 border-l-4"
                 :class="getSeverityBorder(notif.status)">
              <!-- Severity dot -->
              <div class="flex-shrink-0 mt-1">
                <span class="w-2 h-2 rounded-full block" :class="getSeverityDot(notif.status)"></span>
              </div>

              <!-- Body -->
              <div class="flex-1 min-w-0">
                <div class="flex flex-wrap items-center gap-2 mb-1">
                  <span :class="getNotifStatusClass(notif.status)"
                        class="px-1.5 py-0.5 rounded-sm text-[9px] font-mono font-black uppercase tracking-widest">
                    {{ notif.status || 'info' }}
                  </span>
                  <h5 class="text-sm font-bold text-gray-900 truncate" :title="notif.title || notif.message">
                    {{ notif.title || (notif.message ? truncateText(notif.message, 80) : 'Notification') }}
                  </h5>
                </div>

                <div class="text-xs text-gray-600 leading-relaxed">
                  <p v-if="!isNotifExpanded(notif)" class="line-clamp-2">
                    {{ getNotifDetailText(notif) || 'ΓÇö' }}
                  </p>
                  <p v-else class="whitespace-pre-wrap break-words max-h-64 overflow-y-auto custom-scrollbar pr-2">
                    {{ getNotifDetailText(notif) || 'ΓÇö' }}
                  </p>
                  <button
                    v-if="(getNotifDetailText(notif) || '').length > 120"
                    @click="toggleNotifExpanded(notif)"
                    class="mt-1 text-[10px] font-mono font-bold text-[#2F2E8B] hover:underline uppercase tracking-widest"
                  >
                    <i :class="['fas', isNotifExpanded(notif) ? 'fa-chevron-up' : 'fa-chevron-down', 'mr-1 text-[8px]']"></i>
                    {{ isNotifExpanded(notif) ? 'Show Less' : 'Show More' }}
                  </button>
                </div>

                <div class="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                  <span><i class="far fa-clock mr-1"></i>{{ formatNotifRelative(notif.date || notif.created_at) }}</span>
                  <span v-if="notif.date || notif.created_at">┬╖ {{ formatDate(notif.date || notif.created_at) }}</span>
                  <span v-if="notif.source"><i class="fas fa-tag mr-1"></i>{{ notif.source }}</span>
                </div>
              </div>

              <!-- Action -->
              <div class="flex-shrink-0">
                <button @click="resolveNotification(notif._id || notif.id)"
                        class="text-green-700 hover:text-white hover:bg-green-600 font-medium text-[10px] font-mono uppercase tracking-widest border border-green-200 bg-green-50 px-2 py-1 rounded-sm transition-colors"
                        title="Mark as Resolved / Dismiss">
                  <i class="fas fa-check mr-1"></i> Resolve
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Filter empty state -->
        <div v-if="Object.keys(filteredGroupedNotifications).length === 0"
             class="text-center py-10 bg-gray-50 rounded-sm border border-dashed border-gray-300">
          <i class="fas fa-filter text-gray-300 text-3xl mb-2"></i>
          <p class="text-[10px] font-mono text-gray-500 uppercase tracking-widest">No notifications match the current filters</p>
        </div>
      </div>

       <!-- Hidden Item Settings Modal (preserved but triggered properly) -->
       <div v-if="showItemSettingsPanel" class="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[9999] p-4">
         <div class="bg-white rounded-sm w-full max-w-2xl p-4 shadow-xl">
           <div class="flex items-center justify-between mb-4 border-b pb-2">
             <h3 class="font-semibold text-lg">Stock Notification Settings</h3>
             <button @click="showItemSettingsPanel = false" class="text-gray-500 hover:text-gray-700"><i class="fas fa-times"></i></button>
           </div>
           <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div class="border p-3 rounded">
               <h4 class="font-medium mb-2 text-gray-700">Inventory Items</h4>
               <div class="max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                 <ul class="space-y-2">
                   <li v-for="item in inventoryItems" :key="item._id || item.id" class="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer border border-transparent hover:border-gray-200" @click="openItemSettings(item)">
                     <div>
                       <div class="font-medium text-sm">{{ item.name || item.title || item.sku }}</div>
                       <div class="text-xs text-gray-500">Qty: {{ item.qty_on_hand ?? item.quantity ?? 0 }}</div>
                     </div>
                     <i class="fas fa-chevron-right text-gray-300 text-xs"></i>
                   </li>
                 </ul>
               </div>
             </div>
             <div class="border p-3 rounded bg-gray-50">
               <h4 class="font-medium mb-2 text-gray-700">Settings: {{ selectedItem ? (selectedItem.name || selectedItem.sku) : 'None Selected' }}</h4>
               <div v-if="!selectedItem" class="text-sm text-gray-500 italic py-8 text-center">Select an item from the list to configure alerts.</div>
               <div v-else>
                 <div class="space-y-3">
                    <label class="flex items-center p-2 bg-white rounded border border-gray-200 cursor-pointer">
                        <input type="checkbox" v-model="selectedItemSettings.notify_low" class="mr-3 text-[#2F2E8B] rounded" /> 
                        <span class="text-sm">Alert when <strong>Low Stock</strong></span>
                    </label>
                     <label class="flex items-center p-2 bg-white rounded border border-gray-200 cursor-pointer">
                        <input type="checkbox" v-model="selectedItemSettings.notify_critical" class="mr-3 text-[#2F2E8B] rounded" /> 
                        <span class="text-sm">Alert when <strong>Critical</strong></span>
                    </label>
                     <label class="flex items-center p-2 bg-white rounded border border-gray-200 cursor-pointer">
                        <input type="checkbox" v-model="selectedItemSettings.notify_empty" class="mr-3 text-[#2F2E8B] rounded" /> 
                        <span class="text-sm">Alert when <strong>Out of Stock</strong></span>
                    </label>
                 </div>
                 <div class="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-200">
                   <button @click="selectedItem = null" class="px-3 py-1.5 border border-gray-300 rounded text-sm hover:bg-white">Cancel</button>
                   <button @click="saveItemSettings" class="px-4 py-1.5 bg-[#2F2E8B] text-white rounded text-sm hover:bg-[#3D2F88]">Save Changes</button>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
</section>

    <!-- ==================== ROLES & PERMISSIONS ==================== -->
    <div v-if="activeTab === 'roles'" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-sm p-6 relative group shadow-sm mb-8">
      <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6">
        <div>
          <h3 class="text-base sm:text-lg font-semibold text-[#1F2937] dark:text-white">Roles & Permissions</h3>
          <p class="text-sm text-[#6B7280] dark:text-zinc-400">Manage user roles and their granular permissions</p>
        </div>
        <button 
          @click="openRoleModal()"
          class="w-full sm:w-auto bg-[#2F2E8B] text-white px-4 py-2 rounded-sm hover:bg-[#3D2F88] flex items-center justify-center gap-2"
        >
          <i class="fas fa-plus"></i> Create Role
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="rbacLoading" class="flex items-center justify-center py-8">
        <i class="fas fa-spinner fa-spin text-2xl text-[#2F2E8B]"></i>
      </div>

      <!-- Success Message -->
      <div v-if="rbacSuccess" class="mb-6 bg-[#ECFDF5] border border-[#10B981] text-[#065F46] px-4 py-3 rounded-sm flex items-center">
        <i class="fas fa-check-circle mr-2"></i>
        {{ rbacFeedbackMessage }}
      </div>

      <!-- Roles List -->
      <div v-else class="space-y-4">
        <div 
          v-for="role in visibleTenantRoles" 
          :key="role.id"
          class="border border-[#E0E0E0] rounded-sm p-4 hover:border-[#2F2E8B] transition-colors"
        >
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <h4 class="font-semibold text-[#1F2937]">{{ role.name }}</h4>
                <span v-if="role.isSystem" class="px-2 py-0.5 text-xs bg-[#E0E0E0] text-[#6B7280] rounded-full">System</span>
              </div>
              <p class="text-sm text-[#6B7280] mb-2">{{ role.description }}</p>
              <div class="flex flex-wrap gap-1">
                <span 
                  v-for="entity in availablePermissions.filter(e => role.permissions[e.id]?.length > 0).slice(0, 5)" 
                  :key="entity.id"
                  class="px-2 py-0.5 text-xs bg-[#E0F2FE] text-[#2F2E8B] rounded-full"
                >
                  {{ entity.name }}
                </span>
                <span 
                  v-if="availablePermissions.filter(e => role.permissions[e.id]?.length > 0).length > 5"
                  class="px-2 py-0.5 text-xs bg-[#F3F4F6] text-[#6B7280] rounded-full"
                >
                  +{{ availablePermissions.filter(e => role.permissions[e.id]?.length > 0).length - 5 }} more
                </span>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <button 
                @click="openRoleModal(role)"
                class="p-2 text-[#2F2E8B] hover:bg-[#E0F2FE] rounded-sm"
                title="Edit Role"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button 
                v-if="role.id !== 'owner' && !role.isSystem"
                @click="handleDeleteRole(role.id)"
                class="p-2 text-[#DC2626] hover:bg-red-50 rounded-sm"
                title="Delete Role"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Role Modal - Teleported to body like POS modal -->
    <Teleport to="body">
      <div v-if="showRoleModal" class="fixed inset-0 z-[9999] flex items-center justify-center p-4">
             <!-- Backdrop -->
             <div class="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity" @click="closeRoleModal"></div>
             
             <!-- Modal Content -->
             <div class="bg-white rounded-none shadow-2xl w-full max-w-5xl max-h-[85vh] overflow-hidden flex flex-col relative z-10 animate-fade-in-up pointer-events-auto">
              <!-- Top Accent Bar -->
              <div class="h-1.5 w-full bg-[#2F2E8B] shrink-0"></div>
              
              <!-- Dotted Pattern Overlay -->
              <div class="absolute inset-0 dotted-pattern opacity-[0.02] pointer-events-none"></div>
              
              <div class="p-4 border-b border-[#E0E0E0] flex justify-between items-center bg-gray-50/50 relative z-20">
            <div class="flex items-center gap-3">
               <div class="w-1.5 h-6 bg-[#2F2E8B] rounded-sm"></div>
               <h3 class="text-xs font-black text-gray-900 uppercase tracking-widest font-mono">
                 {{ editingRole ? 'Edit Role' : 'Create New Role' }}
               </h3>
            </div>
            <button @click="closeRoleModal" class="text-gray-400 hover:text-[#2F2E8B] transition-colors">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
          
          <div class="p-6 overflow-y-auto flex-1 bg-white custom-scrollbar relative z-10 min-h-0">
            <!-- Errors -->
            <div v-if="roleFormErrors.length > 0" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-sm">
              <p v-for="err in roleFormErrors" :key="err" class="text-xs font-mono font-bold text-red-600 uppercase">{{ err }}</p>
            </div>

            <!-- Role Basic Info -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-b border-gray-100 pb-8">
              <div>
                <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Role Name *</label>
                <input 
                  v-model="roleForm.name"
                  type="text"
                  :disabled="editingRole?.id === 'owner'"
                  class="w-full border border-gray-300 rounded-sm px-3 py-2 focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] font-bold text-gray-900 placeholder-gray-300 text-sm"
                  placeholder="E.G. BRANCH MANAGER"
                />
              </div>
              <div>
                <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Description</label>
                <input 
                  v-model="roleForm.description"
                  type="text"
                  class="w-full border border-gray-300 rounded-sm px-3 py-2 focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] text-gray-900 placeholder-gray-300 text-sm"
                  placeholder="Brief description of this role"
                />
              </div>
            </div>

            <!-- Permissions Matrix -->
            <div>
              <div class="mb-4 flex items-center justify-between">
                <div>
                   <h4 class="font-black text-gray-900 uppercase tracking-wide text-sm">Permissions</h4>
                   <p class="text-[10px] text-gray-400 font-mono mt-1 uppercase">Configure access for subscribed modules</p>
                </div>
                <div class="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-sm uppercase">
                   {{ availablePermissions.length }} Modules Enabled
                </div>
              </div>
              
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                 <div v-for="entity in availablePermissions" :key="entity.id" 
                   class="border rounded-sm transition-colors group flex flex-col self-start"
                   :class="getEntityPermissionsSelected(entity.id) > 0 
                     ? 'border-[#2F2E8B] bg-blue-50/10' 
                     : 'border-gray-200 hover:border-[#2F2E8B]'"
                 >
                    <div class="p-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                       <div class="flex items-center gap-3">
                          <div class="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-[#2F2E8B] rounded-sm shadow-sm relative"
                               :class="getEntityPermissionsSelected(entity.id) > 0 ? '!bg-[#2F2E8B] !border-[#2F2E8B]' : ''"
                          >
                             <i :class="[entity.icon, getEntityPermissionsSelected(entity.id) > 0 ? 'text-white' : '']" class="text-xs"></i>
                             <!-- Tick badge on icon when some perms selected -->
                             <i v-if="getEntityPermissionsSelected(entity.id) > 0" 
                                class="fas fa-check-circle text-white absolute -top-1.5 -right-1.5 text-[9px] drop-shadow-sm">
                             </i>
                          </div>
                          <span class="font-bold text-xs text-gray-800 uppercase tracking-wide">{{ entity.name }}</span>
                          <!-- Permission count badge -->
                          <span v-if="getEntityPermissionsSelected(entity.id) > 0" 
                                class="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-sm bg-[#2F2E8B]/10 text-[#2F2E8B] border border-[#2F2E8B]/20">
                            {{ getEntityPermissionsSelected(entity.id) }}/{{ getPermissionsForEntity(entity.id).length }}
                          </span>
                       </div>
                       <div class="flex items-center gap-1">
                          <button
                             v-if="hasAddon(entity.id)"
                             @click="toggleAddon(entity.id)"
                             :title="isAddonOpen(entity.id) ? 'Hide advanced settings' : 'Show advanced settings'"
                             class="text-[9px] font-mono font-bold uppercase text-gray-500 hover:text-[#2F2E8B] hover:bg-white hover:shadow-sm border border-transparent hover:border-blue-100 px-2 py-1 rounded-sm transition-all flex items-center gap-1"
                          >
                             <i class="fas fa-sliders-h text-[9px]"></i>
                             <span>{{ entity.id === 'pos' ? 'POS Access' : 'Scope' }}</span>
                             <i class="fas text-[8px]" :class="isAddonOpen(entity.id) ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
                          </button>
                          <button
                             @click="toggleAllEntityPermissions(entity.id)"
                             class="text-[9px] font-mono font-bold uppercase text-[#2F2E8B] hover:bg-white hover:shadow-sm border border-transparent hover:border-blue-100 px-2 py-1 rounded-sm transition-all"
                           >
                               {{ roleForm.permissions[entity.id]?.length === getPermissionsForEntity(entity.id).length ? 'Deselect All' : 'Select All' }}
                           </button>
                       </div>
                    </div>
                    
                    <div class="p-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
                          <label v-for="perm in getPermissionsForEntity(entity.id)" :key="perm" class="flex items-center gap-2 cursor-pointer p-1.5 rounded-sm hover:bg-gray-50 transition-colors select-none">
                          <div class="relative flex items-center justify-center w-4 h-4">
                             <!-- Hidden actual checkbox -->
                             <input 
                               type="checkbox"
                               :checked="hasEntityPermission(entity.id, perm)"
                               @change="togglePermission(entity.id, perm)"
                               class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                             />
                             <!-- Custom visual checkbox -->
                             <div class="w-4 h-4 border border-gray-300 rounded-sm bg-white transition-colors flex items-center justify-center"
                                  :class="hasEntityPermission(entity.id, perm) ? '!bg-[#2F2E8B] !border-[#2F2E8B]' : ''"
                             >
                                <i class="fas fa-check text-white text-[8px] transform scale-0 transition-transform duration-200"
                                   :class="hasEntityPermission(entity.id, perm) ? 'scale-100' : ''"
                                ></i>
                             </div>
                          </div>
                          <span class="text-[10px] font-bold text-gray-500 uppercase tracking-wide pt-0.5" :class="hasEntityPermission(entity.id, perm) ? 'text-[#2F2E8B]' : ''">{{ perm }}</span>
                       </label>
                    </div>

                    <!-- ΓöÇΓöÇ POS Feature Addons (shown only for POS entity) ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ -->
                    <template v-if="entity.id === 'pos'">
                      <div v-show="isAddonOpen('pos')" class="px-3 pb-3 pt-3 border-t border-dashed border-gray-200 bg-indigo-50/30">
                        <div class="flex items-center justify-between mb-2.5">
                          <p class="text-[9px] font-mono font-bold text-indigo-500 uppercase tracking-widest">
                            <i class="fas fa-puzzle-piece mr-1"></i> POS Feature Access
                          </p>
                          <span class="text-[8px] font-mono text-gray-400 uppercase">Controls toolbar visibility per role</span>
                        </div>
                        <div class="grid grid-cols-2 gap-2">
                          <label
                            v-for="feat in POS_ADDON_FEATURES"
                            :key="feat.key"
                            class="flex items-start gap-2 cursor-pointer p-2 rounded-sm hover:bg-white hover:shadow-sm transition-all select-none border border-transparent hover:border-indigo-100 bg-white/60"
                          >
                            <div class="relative flex items-center justify-center w-4 h-4 mt-0.5 flex-shrink-0">
                              <input
                                type="checkbox"
                                :checked="getPosAddon(feat.key)"
                                @change="togglePosAddon(feat.key)"
                                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                              />
                              <div
                                class="w-4 h-4 border rounded-sm transition-colors flex items-center justify-center"
                                :class="getPosAddon(feat.key) ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-gray-300'"
                              >
                                <i
                                  class="fas fa-check text-white text-[8px] transition-transform duration-150"
                                  :class="getPosAddon(feat.key) ? 'scale-100' : 'scale-0 opacity-0'"
                                ></i>
                              </div>
                            </div>
                            <div>
                              <span
                                class="text-[10px] font-bold uppercase tracking-wide block"
                                :class="getPosAddon(feat.key) ? 'text-indigo-700' : 'text-gray-500'"
                              >
                                <i :class="[feat.icon, 'mr-0.5 text-[9px]']"></i>{{ feat.label }}
                              </span>
                              <span class="text-[9px] font-mono text-gray-400 leading-tight">{{ feat.desc }}</span>
                            </div>
                          </label>
                        </div>
                      </div>
                    </template>
                    <!-- ΓöÇΓöÇ End POS Feature Addons ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ -->

                    <!-- ΓöÇΓöÇ Asset Manager Scope Addons (Module 9.1 Access Control) ΓöÇΓöÇΓöÇ -->
                    <template v-if="entity.id === 'assets-manager'">
                      <div v-show="isAddonOpen('assets-manager')" class="px-3 pb-3 pt-3 border-t border-dashed border-gray-200 bg-indigo-50/30">
                        <div class="flex items-center justify-between mb-2.5">
                          <p class="text-[9px] font-mono font-bold text-indigo-500 uppercase tracking-widest">
                            <i class="fas fa-shield-alt mr-1"></i> Asset-Level Access Scope
                          </p>
                          <span class="text-[8px] font-mono text-gray-400 uppercase">Restrict visibility by dept / location / category</span>
                        </div>
                        <div class="space-y-2">
                          <div v-for="field in ASSET_SCOPE_FIELDS" :key="field.key" class="bg-white/60 p-2 border border-transparent hover:border-indigo-100 rounded-sm">
                            <label class="block text-[9px] font-mono font-bold text-indigo-700 uppercase tracking-wide mb-1">
                              <i :class="[field.icon, 'mr-1 text-[9px]']"></i>{{ field.label }}
                            </label>
                            <input
                              :value="(roleForm.assetScope?.[field.key] || []).join(', ')"
                              @input="setAssetScope(field.key, $event.target.value)"
                              type="text"
                              :placeholder="field.placeholder"
                              class="w-full border border-gray-200 rounded-sm px-2 py-1.5 text-[10px] font-mono text-gray-700 focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B]"
                            />
                            <p class="text-[8px] font-mono text-gray-400 mt-0.5">{{ field.desc }}</p>
                          </div>
                          <p class="text-[8px] font-mono text-gray-400 italic px-1">Leave blank to allow all values. Comma-separated for multiple.</p>
                        </div>
                      </div>
                    </template>
                    <!-- ΓöÇΓöÇ End Asset Manager Scope Addons ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ -->

                 </div>
              </div>
              
              <!-- Fallback if no permissions -->
              <div v-if="availablePermissions.length === 0" class="text-center py-12 border-2 border-dashed border-gray-200 rounded-sm">
                 <i class="fas fa-layer-group text-gray-300 text-3xl mb-3"></i>
                 <p class="text-gray-500 font-medium">No subscribed modules found.</p>
                 <p class="text-xs text-gray-400 mt-1">Please subscribe to modules to configure permissions.</p>
              </div>

            </div>
          </div>
          
          <div class="p-4 border-t border-[#E0E0E0] flex justify-end gap-3">
            <button 
              @click="closeRoleModal"
              class="px-4 py-2 border border-[#E0E0E0] rounded-sm hover:bg-[#F9FAFB]"
            >
              Cancel
            </button>
            <button 
              @click="saveRole"
              :disabled="rbacLoading || (editingRole && !isRoleDirty)"
              class="px-4 py-2 bg-[#2F2E8B] text-white rounded-sm hover:bg-[#3D2F88] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ rbacLoading ? 'Saving...' : (editingRole ? 'Update Role' : 'Create Role') }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- ΓöÇΓöÇ AUDIT LOG TAB ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ -->
    <div v-if="activeTab === 'audit'" class="px-4 sm:px-6 lg:px-8 pb-12 space-y-4">

      <!-- ΓöÇΓöÇ FLAGGED ACTIVITIES ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ -->
      <div v-if="auditFlags.length > 0" class="border rounded-sm overflow-hidden"
           :class="auditFlags.some(f => f.level === 'high') ? 'border-red-300 bg-red-50' : 'border-amber-300 bg-amber-50'">
        <div class="px-4 py-2 flex items-center gap-2 border-b"
             :class="auditFlags.some(f => f.level === 'high') ? 'border-red-200 bg-red-100' : 'border-amber-200 bg-amber-100'">
          <i class="fas fa-exclamation-triangle text-xs" :class="auditFlags.some(f => f.level === 'high') ? 'text-red-600' : 'text-amber-600'"></i>
          <span class="text-[10px] font-mono font-black uppercase tracking-widest" :class="auditFlags.some(f => f.level === 'high') ? 'text-red-700' : 'text-amber-700'">Flagged Activity Detected</span>
          <span class="ml-auto text-[8px] font-mono" :class="auditFlags.some(f => f.level === 'high') ? 'text-red-500' : 'text-amber-500'">{{ auditFlags.length }} alert(s)</span>
        </div>
        <div class="p-3 flex flex-wrap gap-2">
          <div v-for="flag in auditFlags" :key="flag.module + flag.action"
               class="flex items-center gap-2 px-3 py-1.5 rounded border text-[9px] font-mono font-bold uppercase tracking-wide"
               :class="flag.level === 'high'
                 ? 'bg-red-100 border-red-300 text-red-800'
                 : 'bg-amber-100 border-amber-300 text-amber-800'">
            <i :class="flag.action === 'delete' ? 'fas fa-trash-alt' : 'fas fa-pen'" class="text-[9px]"></i>
            <span>{{ flag.count }}├ù {{ flag.action }} on <strong>{{ flag.module }}</strong></span>
            <span class="px-1 py-0.5 rounded text-[7px]"
                  :class="flag.level === 'high' ? 'bg-red-200 text-red-700' : 'bg-amber-200 text-amber-700'">
              {{ flag.level }}
            </span>
          </div>
        </div>
      </div>

      <!-- ΓöÇΓöÇ MAIN CARD ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ -->
      <div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-sm overflow-hidden">

        <!-- Header -->
        <div class="bg-[#2F2E8B] px-4 py-2.5 flex items-center justify-between flex-wrap gap-2">
          <div class="flex items-center gap-2">
            <i class="fas fa-clipboard-list text-white/70 text-[11px]"></i>
            <span class="text-[10px] font-mono font-black text-white uppercase tracking-widest">Activity Audit Log</span>
            <span class="text-[8px] font-mono text-white/50 ml-1">{{ auditTotal }} events</span>
          </div>
          <div class="flex items-center gap-2 flex-wrap">
            <!-- Module filter -->
            <select v-model="auditModuleFilter" class="text-[9px] font-mono bg-white/10 border border-white/20 text-white rounded-sm px-2 py-1 outline-none">
              <option value="" class="text-gray-900 bg-white">All Modules</option>
              <option value="settings" class="text-gray-900 bg-white">Settings</option>
              <option value="pos" class="text-gray-900 bg-white">POS / Sales</option>
              <option value="cash-in" class="text-gray-900 bg-white">Cash In</option>
              <option value="inventory" class="text-gray-900 bg-white">Inventory</option>
              <option value="expenses" class="text-gray-900 bg-white">Expenses</option>
              <option value="invoices" class="text-gray-900 bg-white">Billing / Invoices</option>
              <option value="hr" class="text-gray-900 bg-white">HR</option>
              <option value="crm" class="text-gray-900 bg-white">CRM</option>
              <option value="loans" class="text-gray-900 bg-white">Loans</option>
              <option value="assets" class="text-gray-900 bg-white">Assets</option>
            </select>
            <!-- Chart toggle -->
            <button @click="showAuditChart = !showAuditChart"
                    class="text-[9px] font-mono font-bold uppercase tracking-wide px-2 py-1 rounded-sm border transition-colors flex items-center gap-1"
                    :class="showAuditChart ? 'bg-white text-[#2F2E8B] border-white' : 'border-white/30 text-white/70 hover:text-white hover:border-white'">
              <i :class="showAuditChart ? 'fas fa-table' : 'fas fa-chart-bar'" class="text-[9px]"></i>
              {{ showAuditChart ? 'Table' : 'Chart' }}
            </button>
            <button @click="fetchAuditLogs" class="text-[9px] font-mono font-bold uppercase text-white/70 hover:text-white transition-colors flex items-center gap-1">
              <i class="fas fa-sync-alt text-[9px]" :class="{'fa-spin': isLoadingAudit}"></i> Refresh
            </button>
          </div>
        </div>

        <!-- ΓöÇΓöÇ CHART VIEW ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ -->
        <div v-if="showAuditChart" class="p-5 border-b border-gray-100">
          <div v-if="isLoadingAudit" class="flex items-center justify-center py-10 text-gray-400">
            <i class="fas fa-spinner fa-spin text-xl"></i>
          </div>
          <div v-else-if="auditChartModules.length === 0" class="text-center py-10 text-gray-400 text-[9px] font-mono uppercase tracking-widest">No data to chart</div>
          <div v-else class="space-y-5">
            <!-- Summary pills -->
            <div class="flex flex-wrap gap-2 mb-4">
              <div class="flex items-center gap-1.5 px-2.5 py-1 rounded border border-emerald-200 bg-emerald-50">
                <span class="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                <span class="text-[9px] font-mono font-bold text-emerald-700 uppercase">{{ auditActionTotals.create }} Created</span>
              </div>
              <div class="flex items-center gap-1.5 px-2.5 py-1 rounded border border-amber-200 bg-amber-50">
                <span class="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
                <span class="text-[9px] font-mono font-bold text-amber-700 uppercase">{{ auditActionTotals.update }} Updated</span>
              </div>
              <div class="flex items-center gap-1.5 px-2.5 py-1 rounded border border-red-200 bg-red-50">
                <span class="w-2 h-2 rounded-full bg-red-500 inline-block"></span>
                <span class="text-[9px] font-mono font-bold text-red-700 uppercase">{{ auditActionTotals.delete }} Deleted</span>
              </div>
              <div class="flex items-center gap-1.5 px-2.5 py-1 rounded border border-gray-200 bg-gray-50">
                <span class="w-2 h-2 rounded-full bg-gray-400 inline-block"></span>
                <span class="text-[9px] font-mono font-bold text-gray-600 uppercase">{{ auditActionTotals.other }} Other</span>
              </div>
            </div>
            <!-- Per-module bars -->
            <div class="space-y-3">
              <p class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mb-2">Activity by Module</p>
              <div v-for="row in auditChartModules" :key="row.mod" class="space-y-0.5">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-[9px] font-mono font-bold uppercase tracking-wide text-gray-700">{{ row.mod }}</span>
                  <span class="text-[8px] font-mono text-gray-400">{{ row.total }} events</span>
                </div>
                <!-- Stacked bar -->
                <div class="h-5 w-full bg-gray-100 rounded-sm overflow-hidden flex">
                  <div v-if="row.create" :style="{ width: (row.create / row.max * 100) + '%' }" class="h-full bg-emerald-500 transition-all" :title="`${row.create} creates`"></div>
                  <div v-if="row.update" :style="{ width: (row.update / row.max * 100) + '%' }" class="h-full bg-amber-400 transition-all" :title="`${row.update} updates`"></div>
                  <div v-if="row.delete" :style="{ width: (row.delete / row.max * 100) + '%' }" class="h-full transition-all" :class="row.flagged ? 'bg-red-600 animate-pulse' : 'bg-red-500'" :title="`${row.delete} deletes`"></div>
                  <div v-if="row.other" :style="{ width: (row.other / row.max * 100) + '%' }" class="h-full bg-gray-400 transition-all" :title="`${row.other} other`"></div>
                </div>
                <div class="flex gap-3 mt-0.5">
                  <span v-if="row.create" class="text-[7px] font-mono text-emerald-600">+{{ row.create }} create</span>
                  <span v-if="row.update" class="text-[7px] font-mono text-amber-600">Γ£Å {{ row.update }} update</span>
                  <span v-if="row.delete" class="text-[7px] font-mono text-red-600" :class="row.flagged ? 'font-black' : ''">≡ƒùæ {{ row.delete }} delete{{ row.flagged ? ' ΓÜá' : '' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ΓöÇΓöÇ TABLE VIEW ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ -->
        <div v-else class="overflow-x-auto">
          <table class="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-100">
                <th class="py-2.5 px-4 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Timestamp</th>
                <th class="py-2.5 px-4 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">User</th>
                <th class="py-2.5 px-4 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Role</th>
                <th class="py-2.5 px-4 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Action</th>
                <th class="py-2.5 px-4 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Module</th>
                <th class="py-2.5 px-4 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Details</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-if="isLoadingAudit">
                <td colspan="6" class="py-12 text-center text-gray-400">
                  <i class="fas fa-spinner fa-spin text-xl block mb-2"></i>
                  <span class="text-[9px] font-mono uppercase tracking-widest">Loading audit logΓÇª</span>
                </td>
              </tr>
              <tr v-else-if="auditLogs.length === 0">
                <td colspan="6" class="py-12 text-center text-gray-400">
                  <i class="fas fa-inbox text-2xl block mb-2 opacity-40"></i>
                  <span class="text-[9px] font-mono uppercase tracking-widest">No audit events found</span>
                </td>
              </tr>
              <tr v-for="log in auditLogs" :key="log._id"
                  class="transition-colors"
                  :class="auditIsFlagged(log) ? 'bg-red-50 hover:bg-red-100 border-l-2 border-red-400' : 'hover:bg-gray-50'">
                <td class="py-3 px-4 text-[9px] font-mono text-gray-400 whitespace-nowrap">{{ formatDate(log.timestamp) }}</td>
                <td class="py-3 px-4">
                  <p class="text-xs font-mono font-black text-gray-900 leading-none">{{ log.user_name || log.user_email }}</p>
                  <p class="text-[9px] font-mono text-gray-400 mt-0.5">{{ log.user_email }}</p>
                </td>
                <td class="py-3 px-4">
                  <span class="text-[8px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded border border-[#2F2E8B]/20 bg-[#2F2E8B]/5 text-[#2F2E8B]">{{ log.role || 'ΓÇö' }}</span>
                </td>
                <td class="py-3 px-4">
                  <span class="inline-flex items-center gap-1 text-[8px] font-mono font-black uppercase tracking-widest px-2 py-0.5 rounded border"
                    :class="{
                      'bg-emerald-50 text-emerald-700 border-emerald-200': log.action === 'create',
                      'bg-amber-50 text-amber-700 border-amber-200':       log.action === 'update',
                      'bg-red-100 text-red-700 border-red-300':            log.action === 'delete',
                      'bg-blue-50 text-blue-700 border-blue-200':          log.action === 'login',
                      'bg-purple-50 text-purple-700 border-purple-200':    log.action === 'export',
                      'bg-gray-100 text-gray-500 border-gray-200':         !['create','update','delete','login','export'].includes(log.action)
                    }">
                    <i :class="{
                      'fas fa-plus':        log.action === 'create',
                      'fas fa-pen':         log.action === 'update',
                      'fas fa-trash-alt':   log.action === 'delete',
                      'fas fa-sign-in-alt': log.action === 'login',
                      'fas fa-file-export': log.action === 'export',
                      'fas fa-bolt':        !['create','update','delete','login','export'].includes(log.action)
                    }" class="text-[8px]"></i>
                    {{ log.action }}
                  </span>
                </td>
                <td class="py-3 px-4">
                  <span class="text-[9px] font-mono font-bold text-gray-600 uppercase">{{ log.module }}</span>
                  <i v-if="auditIsFlagged(log)" class="fas fa-flag text-red-500 text-[8px] ml-1" title="Flagged: sensitive action on this module"></i>
                </td>
                <td class="py-3 px-4 text-[9px] font-mono text-gray-500 max-w-[200px] truncate" :title="JSON.stringify(log.details)">{{ JSON.stringify(log.details) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="border-t border-gray-100 px-4 py-2.5 flex items-center justify-between bg-gray-50">
          <span class="text-[9px] font-mono text-gray-400">{{ auditTotal }} total events ┬╖ page {{ auditPage }} of {{ auditTotalPages || 1 }}</span>
          <div class="flex items-center gap-1 text-[9px] font-mono text-gray-500">
            <button @click="auditPrevPage" :disabled="auditPage === 1" class="w-5 h-5 rounded-sm hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center">
              <i class="fas fa-chevron-left text-[9px]"></i>
            </button>
            <span class="uppercase px-1">{{ auditPage }} / {{ auditTotalPages || 1 }}</span>
            <button @click="auditNextPage" :disabled="auditPage >= auditTotalPages" class="w-5 h-5 rounded-sm hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center">
              <i class="fas fa-chevron-right text-[9px]"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== ASSOCIATED ORGANIZATIONS ==================== -->
    <div v-if="activeTab === 'organizations'" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-sm p-4 sm:p-6 relative group shadow-sm mb-4">
      <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6">
        <div>
          <h3 class="text-base sm:text-lg font-semibold text-[#1F2937] dark:text-white">Associated Organizations</h3>
          <p class="text-sm text-[#6B7280] dark:text-zinc-400">Manage investors, banks, and funding organizations</p>
        </div>
        <button 
          @click="openOrgModal()"
          class="w-full sm:w-auto bg-[#2F2E8B] text-white px-4 py-2 rounded-sm hover:bg-[#3D2F88] flex items-center justify-center gap-2"
        >
          <i class="fas fa-plus"></i> Add Organization
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="rbacLoading" class="flex items-center justify-center py-8">
        <i class="fas fa-spinner fa-spin text-2xl text-[#2F2E8B]"></i>
      </div>

      <!-- Success Message -->
      <div v-if="rbacSuccess" class="mb-6 bg-[#ECFDF5] border border-[#10B981] text-[#065F46] px-4 py-3 rounded-sm flex items-center">
        <i class="fas fa-check-circle mr-2"></i>
        {{ rbacFeedbackMessage }}
      </div>

      <!-- Empty State -->
      <div v-else-if="tenantOrganizations.length === 0" class="text-center py-6">
        <i class="fas fa-building text-3xl text-[#E0E0E0] mb-2"></i>
        <p class="text-[#6B7280] text-sm">No associated organizations yet</p>
        <button @click="openOrgModal()" class="mt-2 text-[#2F2E8B] hover:underline text-sm">
          Add your first organization
        </button>
      </div>

      <!-- Organizations Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          v-for="org in tenantOrganizations" 
          :key="org.id"
          class="border border-[#E0E0E0] rounded-sm p-4 hover:border-[#2F2E8B] transition-colors"
        >
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-[#E0F2FE] rounded-sm flex items-center justify-center">
                <i :class="getOrgTypeInfo(org.type).icon" class="text-[#1E40AF]"></i>
              </div>
              <div>
                <h4 class="font-semibold text-[#1F2937]">{{ org.name }}</h4>
                <span class="text-xs text-[#6B7280]">{{ getOrgTypeInfo(org.type).name }}</span>
              </div>
            </div>
            <span 
              :class="org.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'"
              class="px-2 py-0.5 text-xs rounded-full"
            >
              {{ org.isActive ? 'Active' : 'Inactive' }}
            </span>
          </div>
          
          <div class="space-y-2 text-sm mb-4">
            <div class="flex items-center gap-2 text-[#6B7280]">
              <i class="fas fa-shield-alt w-4"></i>
              <span>{{ getAccessScopeInfo(org.accessScope).name }}</span>
            </div>
            <div v-if="org.contactEmail" class="flex items-center gap-2 text-[#6B7280]">
              <i class="fas fa-envelope w-4"></i>
              <span>{{ org.contactEmail }}</span>
            </div>
          </div>
          
          <div class="flex gap-2">
            <button 
              @click="openOrgModal(org)"
              class="flex-1 px-3 py-1.5 border border-[#E0E0E0] rounded-sm hover:bg-[#F9FAFB] text-sm"
            >
              <i class="fas fa-edit mr-1"></i> Edit
            </button>
            <button 
              @click="handleDeleteOrg(org.id)"
              class="px-3 py-1.5 border border-red-200 text-red-600 rounded-sm hover:bg-red-50 text-sm"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Organization Modal -->
      <div v-if="showOrgModal" class="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[9999] p-4">
        <div class="bg-white rounded-sm shadow-xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
          <div class="p-4 border-b border-[#E0E0E0] flex justify-between items-center">
            <h3 class="text-lg font-semibold text-[#1F2937]">
              {{ editingOrg ? 'Edit Organization' : 'Add Organization' }}
            </h3>
            <button @click="closeOrgModal" class="text-[#6B7280] hover:text-[#1F2937]">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
          
          <div class="p-4 overflow-y-auto flex-1 space-y-4">
            <div>
              <label class="block text-sm font-medium text-[#4B5563] mb-1">Organization Name *</label>
              <input 
                v-model="orgForm.name"
                type="text"
                class="w-full border border-[#E0E0E0] rounded-sm px-3 py-2 focus:ring-2 focus:ring-[#2F2E8B]"
                placeholder="e.g., First National Bank"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-[#4B5563] mb-1">Organization Type</label>
              <select 
                v-model="orgForm.type"
                class="w-full border border-[#E0E0E0] rounded-sm px-3 py-2 focus:ring-2 focus:ring-[#2F2E8B]"
              >
                <option v-for="t in ORGANIZATION_TYPES" :key="t.id" :value="t.id">
                  {{ t.name }}
                </option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-[#4B5563] mb-1">Access Scope</label>
              <select 
                v-model="orgForm.accessScope"
                class="w-full border border-[#E0E0E0] rounded-sm px-3 py-2 focus:ring-2 focus:ring-[#2F2E8B]"
              >
                <option v-for="s in ACCESS_SCOPES" :key="s.id" :value="s.id">
                  {{ s.name }} - {{ s.description }}
                </option>
              </select>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-[#4B5563] mb-1">Contact Email</label>
                <input 
                  v-model="orgForm.contactEmail"
                  type="email"
                  class="w-full border border-[#E0E0E0] rounded-sm px-3 py-2 focus:ring-2 focus:ring-[#2F2E8B]"
                  placeholder="contact@org.com"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-[#4B5563] mb-1">Contact Phone</label>
                <input 
                  v-model="orgForm.contactPhone"
                  type="text"
                  class="w-full border border-[#E0E0E0] rounded-sm px-3 py-2 focus:ring-2 focus:ring-[#2F2E8B]"
                  placeholder="+260 XXX XXX XXX"
                />
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-[#4B5563] mb-1">Notes</label>
              <textarea 
                v-model="orgForm.notes"
                rows="3"
                class="w-full border border-[#E0E0E0] rounded-sm px-3 py-2 focus:ring-2 focus:ring-[#2F2E8B]"
                placeholder="Additional notes about this organization..."
              ></textarea>
            </div>
            
            <div class="flex items-center gap-2">
              <input 
                type="checkbox"
                v-model="orgForm.isActive"
                id="orgActive"
                class="w-4 h-4 text-[#2F2E8B] rounded focus:ring-[#2F2E8B]"
              />
              <label for="orgActive" class="text-sm text-[#4B5563]">Organization is active</label>
            </div>
          </div>
          
          <div class="p-4 border-t border-[#E0E0E0] flex justify-end gap-3">
            <button 
              @click="closeOrgModal"
              class="px-4 py-2 border border-[#E0E0E0] rounded-sm hover:bg-[#F9FAFB]"
            >
              Cancel
            </button>
            <button 
              @click="saveOrganization"
              :disabled="rbacLoading"
              class="px-4 py-2 bg-[#2F2E8B] text-white rounded-sm hover:bg-[#3D2F88] disabled:opacity-50"
            >
              {{ rbacLoading ? 'Saving...' : (editingOrg ? 'Update' : 'Add Organization') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== BRANDING & UI PERSONALIZATION ==================== -->
    <div v-if="activeTab === 'branding'" class="px-4 sm:px-6 lg:px-8 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-sm p-4 sm:p-6 relative group shadow-sm mb-4">
      <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-[0.05]"></div>
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-8">
        <div>
          <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Branding & UI Preferences</h3>
          <p class="text-sm text-gray-500 dark:text-zinc-500 mt-1">Customize your dashboard appearance and branding</p>
        </div>
        <button 
          @click="resetUIPreferences"
          class="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-zinc-300 flex items-center gap-2 px-3 py-1.5 rounded-sm hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
        >
          <i class="fas fa-undo"></i> Reset to Defaults
        </button>
      </div>

      <div class="space-y-8">
        <!-- Theme Mode -->
        <div class="border-b border-gray-100 dark:border-zinc-800 pb-8">
          <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">Display Mode</h4>
          <div class="flex flex-wrap gap-4">
            <button 
              v-for="mode in THEME_MODES" 
              :key="mode.id"
              @click="previewThemeMode(mode.id)"
              :class="[
                'theme-mode-option flex items-center gap-3 px-5 py-3 border transition-all',
                uiPreferencesForm.themeMode === mode.id 
                  ? 'theme-mode-option-active border-[#2F2E8B] bg-white dark:bg-zinc-900 text-[#2F2E8B] dark:text-blue-400' 
                  : 'border-gray-200 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700 text-gray-600 dark:text-zinc-400'
              ]"
              :style="uiPreferencesForm.themeMode === mode.id ? { borderColor: 'var(--brand-primary)' } : {}"
            >
              <i :class="mode.icon" class="text-lg"></i>
              <span class="font-medium">{{ mode.name }}</span>
            </button>
          </div>
        </div>

        <!-- Visual Style -->
        <div class="border-b border-gray-100 dark:border-zinc-800 pb-8">
          <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">Visual Style</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
            <button
              v-for="style in UI_VISUAL_STYLE_OPTIONS"
              :key="style.id"
              type="button"
              :data-style="style.id"
              @click="applyVisualStylePreset(style.id)"
              :class="[
                'visual-style-card',
                uiPreferencesForm.visualStyle === style.id ? 'visual-style-card-active' : ''
              ]"
            >
              <span class="visual-style-sample" :data-style="style.id">
                <span class="visual-style-sample-panel">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
                <span class="visual-style-sample-button"></span>
              </span>
              <span class="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                <i :class="style.icon" class="text-xs text-[#2F2E8B]"></i>
                {{ style.name }}
              </span>
              <span class="text-xs text-gray-500 dark:text-zinc-500 leading-snug text-left">{{ style.description }}</span>
            </button>
          </div>
        </div>

        <!-- Brand Colors -->
        <div class="border-b border-gray-100 dark:border-zinc-800 pb-8">
          <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">Brand Colors</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="(value, key) in uiPreferencesForm.brandColors" :key="key" class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-zinc-400 capitalize">{{ key }} Color</label>
              <div class="flex items-center gap-3">
                <div class="relative w-12 h-12 flex-shrink-0">
                  <input 
                    type="color"
                    :value="value"
                    @input="updateBrandColor(key, $event.target.value)"
                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div class="w-full h-full rounded-sm border border-gray-200 dark:border-zinc-800 shadow-sm" :style="{ backgroundColor: value }"></div>
                </div>
                <input 
                  type="text"
                  :value="value"
                  @input="updateBrandColor(key, $event.target.value)"
                  class="flex-1 border border-gray-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 rounded-sm px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent uppercase"
                  placeholder="#000000"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Typography -->
        <div class="border-b border-gray-100 dark:border-zinc-800 pb-8">
          <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">Typography</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-zinc-400 mb-2">Font Family</label>
              <select 
                v-model="uiPreferencesForm.fontFamily"
                class="w-full border border-gray-300 dark:border-zinc-700 rounded-sm px-3 py-2.5 focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent bg-white dark:bg-zinc-800 dark:text-zinc-200"
              >
                <option v-for="font in FONT_FAMILIES" :key="font.id" :value="font.id">
                  {{ font.name }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-zinc-400 mb-2">Base Font Size</label>
              <select 
                v-model="uiPreferencesForm.fontSize"
                class="w-full border border-gray-300 dark:border-zinc-700 rounded-sm px-3 py-2.5 focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent bg-white dark:bg-zinc-800 dark:text-zinc-200"
              >
                <option v-for="size in FONT_SIZES" :key="size.id" :value="size.id">
                  {{ size.name }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- UI Components -->
        <div class="border-b border-gray-100 dark:border-zinc-800 pb-8">
          <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">Components</h4>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="space-y-5">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-zinc-400 mb-2">Card Shape</label>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    v-for="option in UI_CARD_RADIUS_OPTIONS"
                    :key="option.id"
                    type="button"
                    @click="uiPreferencesForm.cardRadius = option.id; applyUIPreferences(uiPreferencesForm)"
                    :class="[
                      'ui-choice-btn',
                      uiPreferencesForm.cardRadius === option.id ? 'ui-choice-btn-active' : ''
                    ]"
                  >
                    {{ option.name }}
                  </button>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-zinc-400 mb-2">Card Elevation</label>
                <div class="grid grid-cols-3 gap-2">
                  <button
                    v-for="option in UI_CARD_ELEVATION_OPTIONS"
                    :key="option.id"
                    type="button"
                    @click="uiPreferencesForm.cardElevation = option.id; applyUIPreferences(uiPreferencesForm)"
                    :class="[
                      'ui-choice-btn',
                      uiPreferencesForm.cardElevation === option.id ? 'ui-choice-btn-active' : ''
                    ]"
                  >
                    {{ option.name }}
                  </button>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-zinc-400 mb-2">Pattern Visibility</label>
                <div class="grid grid-cols-3 gap-2">
                  <button
                    v-for="option in UI_PATTERN_OPTIONS"
                    :key="option.id"
                    type="button"
                    @click="uiPreferencesForm.patternIntensity = option.id; applyUIPreferences(uiPreferencesForm)"
                    :class="[
                      'ui-choice-btn',
                      uiPreferencesForm.patternIntensity === option.id ? 'ui-choice-btn-active' : ''
                    ]"
                  >
                    {{ option.name }}
                  </button>
                </div>
              </div>
            </div>

            <div class="space-y-5">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-zinc-400 mb-2">Button Shape</label>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    v-for="option in UI_BUTTON_RADIUS_OPTIONS"
                    :key="option.id"
                    type="button"
                    @click="uiPreferencesForm.buttonRadius = option.id; applyUIPreferences(uiPreferencesForm)"
                    :class="[
                      'ui-choice-btn',
                      uiPreferencesForm.buttonRadius === option.id ? 'ui-choice-btn-active' : ''
                    ]"
                  >
                    {{ option.name }}
                  </button>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-zinc-400 mb-2">Button Style</label>
                <div class="grid grid-cols-3 gap-2">
                  <button
                    v-for="option in UI_BUTTON_STYLE_OPTIONS"
                    :key="option.id"
                    type="button"
                    @click="uiPreferencesForm.buttonStyle = option.id; applyUIPreferences(uiPreferencesForm)"
                    :class="[
                      'ui-choice-btn',
                      uiPreferencesForm.buttonStyle === option.id ? 'ui-choice-btn-active' : ''
                    ]"
                  >
                    {{ option.name }}
                  </button>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-zinc-400 mb-2">Input Shape</label>
                <div class="grid grid-cols-3 gap-2">
                  <button
                    v-for="option in UI_INPUT_RADIUS_OPTIONS"
                    :key="option.id"
                    type="button"
                    @click="uiPreferencesForm.inputRadius = option.id; applyUIPreferences(uiPreferencesForm)"
                    :class="[
                      'ui-choice-btn',
                      uiPreferencesForm.inputRadius === option.id ? 'ui-choice-btn-active' : ''
                    ]"
                  >
                    {{ option.name }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="ui-preview-card md:col-span-2">
              <div class="dotted-pattern absolute inset-0 pointer-events-none"></div>
              <div class="relative z-10">
                <span class="text-xs font-semibold text-gray-500 dark:text-zinc-400">{{ selectedVisualStyleName }} Preview</span>
                <h5 class="mt-1 text-base font-semibold text-gray-900 dark:text-white">Buttons, cards, inputs</h5>
                <p class="mt-1 text-sm text-gray-500 dark:text-zinc-400">These controls update the dashboard design variables.</p>
                <div class="mt-4 flex flex-wrap gap-3">
                  <button type="button" class="ui-preview-primary">Primary action</button>
                  <button type="button" class="ui-preview-secondary">Secondary</button>
                </div>
              </div>
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-zinc-400">Input Preview</label>
              <input class="ui-preview-input" value="Sample field" readonly />
              <span class="block text-xs text-gray-500 dark:text-zinc-500">Saved with your UI preferences.</span>
            </div>
          </div>
        </div>

        <!-- Additional Options -->
        <div class="pb-4">
          <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">Interface Options</h4>
          <div class="space-y-4">
            <label class="flex items-start gap-3 cursor-pointer p-3 border border-gray-200 dark:border-zinc-800 rounded-sm hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
              <input 
                type="checkbox"
                v-model="uiPreferencesForm.compactMode"
                @change="applyUIPreferences(uiPreferencesForm)"
                class="mt-1 w-4 h-4 text-[#2F2E8B] border-gray-300 dark:border-zinc-700 rounded focus:ring-[#2F2E8B] dark:bg-zinc-800"
              />
              <div>
                <span class="block font-medium text-gray-900 dark:text-white">Compact Mode</span>
                <p class="text-xs text-gray-500 dark:text-zinc-500 mt-0.5">Reduce spacing and padding for a denser, information-rich layout</p>
              </div>
            </label>
            <label class="flex items-start gap-3 cursor-pointer p-3 border border-gray-200 dark:border-zinc-800 rounded-sm hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
              <input 
                type="checkbox"
                v-model="uiPreferencesForm.showAnimations"
                @change="applyUIPreferences(uiPreferencesForm)"
                class="mt-1 w-4 h-4 text-[#2F2E8B] border-gray-300 dark:border-zinc-700 rounded focus:ring-[#2F2E8B] dark:bg-zinc-800"
              />
              <div>
                <span class="block font-medium text-gray-900 dark:text-white">Show Animations</span>
                <p class="text-xs text-gray-500 dark:text-zinc-500 mt-0.5">Enable smooth transitions and interface animations for better UX</p>
              </div>
            </label>
          </div>
        </div>

        <!-- Save Button -->
        <div class="flex justify-end pt-4 border-t border-gray-100 dark:border-zinc-800">
          <button 
            @click="saveUIPreferences"
            :disabled="isUIPreferencesLoading"
            class="px-6 py-2.5 bg-[#2F2E8B] text-white rounded-sm hover:bg-[#3D2F88] disabled:opacity-50 shadow-sm font-medium transition-colors"
            :style="{ backgroundColor: 'var(--brand-primary)' }"
          >
            <i class="fas fa-save mr-2"></i>
            {{ isUIPreferencesLoading ? 'Saving...' : 'Save Preferences' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Currency Settings -->
    <div v-if="activeTab === 'currency'" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-sm p-4 sm:p-6 relative group shadow-sm mb-4">
      <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
      <h3 class="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white">Currency Settings</h3>
      
      <div class="space-y-8">
        <!-- System Currency Section -->
        <div class="border-b border-gray-100 pb-8">
          <h4 class="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">System Currency</h4>
          <p class="text-sm text-gray-500 mb-4 bg-gray-50 p-3 rounded-sm border border-gray-100">
            Set the default currency for your business operations. This will be used for all financial transactions, reports, and pricing.
          </p>
          
          <div class="max-w-md">
            <label class="block text-sm font-medium text-gray-700 mb-2">Select Currency</label>
            <select 
              v-model="currencySettings.systemCurrency"
              @change="updateCurrency"
              class="w-full border border-gray-300 rounded-sm px-3 py-2.5 focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent outline-none transition-shadow bg-white"
            >
              <optgroup label="African Currencies">
                <option value="ZMW">ZMW - Zambian Kwacha (K)</option>
                <option value="ZAR">ZAR - South African Rand (R)</option>
                <option value="NGN">NGN - Nigerian Naira (Γéª)</option>
                <option value="KES">KES - Kenyan Shilling (KSh)</option>
                <option value="UGX">UGX - Ugandan Shilling (USh)</option>
                <option value="TZS">TZS - Tanzanian Shilling (TSh)</option>
                <option value="BWP">BWP - Botswana Pula (P)</option>
                <option value="GHS">GHS - Ghanaian Cedi (Γé╡)</option>
                <option value="ETB">ETB - Ethiopian Birr (Br)</option>
                <option value="MAD">MAD - Moroccan Dirham (MAD)</option>
              </optgroup>
              <optgroup label="Major International Currencies">
                <option value="USD">USD - US Dollar ($)</option>
                <option value="EUR">EUR - Euro (Γé¼)</option>
                <option value="GBP">GBP - British Pound (┬ú)</option>
                <option value="JPY">JPY - Japanese Yen (┬Ñ)</option>
                <option value="CNY">CNY - Chinese Yuan (┬Ñ)</option>
                <option value="CAD">CAD - Canadian Dollar (C$)</option>
                <option value="AUD">AUD - Australian Dollar (A$)</option>
                <option value="CHF">CHF - Swiss Franc (Fr)</option>
                <option value="INR">INR - Indian Rupee (Γé╣)</option>
              </optgroup>
            </select>
          </div>
        </div>

        <!-- Currency Format Settings -->
        <div class="border-b border-gray-100 pb-8">
          <h4 class="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Display Format</h4>
          <p class="text-sm text-gray-500 mb-4">
            Configure how currency amounts are displayed throughout the system.
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Decimal Places</label>
              <select 
                v-model="currencySettings.decimalPlaces"
                @change="updateCurrency"
                class="w-full border border-gray-300 rounded-sm px-3 py-2.5 focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent outline-none bg-white"
              >
                <option value="0">0 (K 1000)</option>
                <option value="2">2 (K 1000.00)</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Symbol Position</label>
              <select 
                v-model="currencySettings.symbolPosition"
                @change="updateCurrency"
                class="w-full border border-gray-300 rounded-sm px-3 py-2.5 focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent outline-none bg-white"
              >
                <option value="before">Before amount (K 1000)</option>
                <option value="after">After amount (1000 K)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Preview Section -->
        <div class="bg-gray-50 rounded-sm p-5 border border-gray-100">
          <h4 class="text-sm font-semibold text-gray-900 mb-4">Preview</h4>
          <div class="space-y-3 text-sm">
            <div class="flex justify-between items-center p-2 bg-white rounded border border-gray-100">
              <span class="text-gray-500">Sample Price:</span>
              <span class="font-bold text-[#2F2E8B]">{{ formatCurrencyPreview(1250.50) }}</span>
            </div>
            <div class="flex justify-between items-center p-2 bg-white rounded border border-gray-100">
              <span class="text-gray-500">Large Amount:</span>
              <span class="font-bold text-[#2F2E8B]">{{ formatCurrencyPreview(125000) }}</span>
            </div>
            <div class="flex justify-between items-center p-2 bg-white rounded border border-gray-100">
              <span class="text-gray-500">Small Amount:</span>
              <span class="font-bold text-[#2F2E8B]">{{ formatCurrencyPreview(5.25) }}</span>
            </div>
          </div>
        </div>

        <!-- Save Button -->
        <div class="flex justify-end pt-4">
          <button 
            @click="saveCurrencySettings"
            :disabled="currencyLoading"
            class="bg-[#2F2E8B] text-white px-8 py-2.5 rounded-sm hover:bg-[#3D2F88] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm font-medium"
          >
            <i v-if="currencyLoading" class="fas fa-spinner fa-spin mr-2"></i>
            {{ currencyLoading ? 'Saving...' : 'Save Currency Settings' }}
          </button>
        </div>

        <!-- Success/Error Messages -->
        <div v-if="currencySuccess" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-sm flex items-center shadow-sm">
          <i class="fas fa-check-circle mr-2 text-lg"></i>
          Currency settings saved successfully!
        </div>
        
        <div v-if="currencyError" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm flex items-center shadow-sm">
          <i class="fas fa-exclamation-circle mr-2 text-lg"></i>
          {{ currencyError }}
        </div>
      </div>
    </div>

    <!-- Test Email Prompt - Teleported to body -->
    <Teleport to="body">
      <div v-if="showTestEmailPrompt" style="position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:1rem;">
        <div style="position:absolute;inset:0;background-color:rgba(0,0,0,0.6);" @click="closeTestEmailPrompt"></div>
        <div style="position:relative;background:white;border:1px solid #e5e7eb;box-shadow:0 20px 25px -5px rgba(0,0,0,0.1);width:100%;max-width:26rem;overflow:hidden;">
          <div style="height:0.375rem;width:100%;background-color:#2F2E8B;"></div>
          <div style="padding:1rem 1.5rem;border-bottom:1px solid #e5e7eb;display:flex;justify-content:space-between;align-items:center;background:#f9fafb;">
            <div style="display:flex;gap:0.75rem;align-items:center;">
              <div style="width:0.375rem;height:1.5rem;background-color:#2F2E8B;"></div>
              <h3 style="font-size:0.75rem;font-weight:900;color:#111827;text-transform:uppercase;letter-spacing:0.15em;font-family:monospace;margin:0;">Send Test Email</h3>
            </div>
            <button @click="closeTestEmailPrompt" style="color:#9ca3af;cursor:pointer;border:none;background:transparent;font-size:1.25rem;line-height:1;">&times;</button>
          </div>
          <div style="padding:1.5rem;overflow-y:auto;max-height:70vh;">
            <p style="font-size:0.875rem;color:#4b5563;margin-bottom:1rem;">Send the SMTP test message to this address.</p>
            <div>
              <label style="display:block;font-size:0.625rem;font-family:monospace;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.25rem;">Test recipient email</label>
              <input
                v-model="testEmailRecipient"
                type="email"
                style="width:100%;border:1px solid #d1d5db;padding:0.5rem 0.75rem;font-size:0.875rem;font-family:monospace;outline:none;box-sizing:border-box;"
                placeholder="name@example.com"
              />
              <p style="margin-top:0.5rem;font-size:0.625rem;font-family:monospace;color:#9ca3af;text-transform:uppercase;letter-spacing:0.1em;">We'll send a delivery test to this inbox.</p>
            </div>
          </div>
          <div style="padding:0.75rem 1.5rem;border-top:1px solid #e5e7eb;display:flex;justify-content:flex-end;gap:0.75rem;">
            <button @click="closeTestEmailPrompt" style="padding:0.5rem 1rem;border:1px solid #d1d5db;background:white;color:#374151;font-size:0.625rem;font-weight:700;font-family:monospace;text-transform:uppercase;cursor:pointer;">Cancel</button>
            <button
              :disabled="testEmailSending || !isValidTestEmailRecipient"
              @click="confirmTestEmailPrompt"
              style="padding:0.5rem 1rem;background:#2F2E8B;color:white;border:none;font-size:0.625rem;font-weight:700;font-family:monospace;text-transform:uppercase;cursor:pointer;display:flex;align-items:center;gap:0.5rem;opacity:1;"
              :style="(testEmailSending || !isValidTestEmailRecipient) ? 'opacity:0.5;cursor:not-allowed;' : ''"
            >
              {{ testEmailSending ? 'Sending...' : 'Send Test Email' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    </div>

    <!-- Global Confirm Dialog - Teleported directly to body -->
    <Teleport to="body">
      <div v-if="!!settingsConfirmState" style="position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:1rem;">
        <!-- Backdrop -->
        <div style="position:absolute;inset:0;background-color:rgba(0,0,0,0.6);" @click="closeSettingsConfirm"></div>
        <!-- Dialog Box -->
        <div style="position:relative;background:white;border:1px solid #e5e7eb;box-shadow:0 20px 25px -5px rgba(0,0,0,0.1);width:100%;max-width:26rem;overflow:hidden;">
          <div style="height:0.375rem;width:100%;background-color:#DC2626;"></div>
          <div style="padding:1.5rem;">
            <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem;">
              <div style="width:2.5rem;height:2.5rem;background:#FEE2E2;border:1px solid #FECACA;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <i class="fas fa-trash" style="color:#DC2626;font-size:0.875rem;"></i>
              </div>
              <h3 style="font-size:0.75rem;font-weight:900;text-transform:uppercase;letter-spacing:0.15em;font-family:monospace;color:#111827;">
                {{ settingsConfirmState?.title || 'Confirm' }}
              </h3>
            </div>
            <p style="font-size:0.875rem;color:#4B5563;line-height:1.5;margin-bottom:1.5rem;">
              {{ settingsConfirmState?.message || '' }}
            </p>
            <div style="display:flex;justify-content:flex-end;gap:0.75rem;">
              <button
                @click="closeSettingsConfirm"
                style="padding:0.5rem 1rem;border:1px solid #D1D5DB;color:#374151;font-size:0.625rem;font-weight:700;font-family:monospace;text-transform:uppercase;letter-spacing:0.1em;cursor:pointer;background:white;"
              >
                Cancel
              </button>
              <button
                @click="handleSettingsConfirm"
                style="padding:0.5rem 1rem;background:#DC2626;color:white;border:none;font-size:0.625rem;font-weight:700;font-family:monospace;text-transform:uppercase;letter-spacing:0.1em;cursor:pointer;display:flex;align-items:center;gap:0.5rem;"
              >
                <i class="fas fa-trash" style="font-size:0.625rem;"></i>
                {{ settingsConfirmState?.confirmLabel || 'Confirm' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>


  </div>
</template>
<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, Teleport } from 'vue';
import { useRoute } from 'vue-router';
import { Modal } from '@/components/ui';

import {
  useSettingsBase,
  useSettingsProfile,
  useSettingsModules,
  useSettingsEmail, NOTIFICATION_TYPES,
  useSettingsNotifications,
  useSettingsAiAgents,
  useSettingsIntegrations,
  useSettingsRoles,
  useSettingsOrganizations,
  useSettingsBranding,
  useSettingsCurrency,
  useSettingsAudit,
  useSettingsGoals
} from '@/composables/settings'

const route = useRoute()

// â”€â”€ Shared Base â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const base = useSettingsBase()
const {
  getTenantId, getUserRole, getUserEmail, tenantId, userRole, userEmail,
  formatCurrency, formatCurrencyCompact, currencyCode,
  settingsConfirmState, openSettingsConfirm, closeSettingsConfirm, handleSettingsConfirm,
  brandPrefs, saveBrandPrefs, logAudit,
  hasPermission, initializeRBAC, isAdmin, isSuperAdmin,
  createRole, updateRole,
  dashboardStore, authStore, pricingStore, fetchModules,
  DEFAULT_ROLES, PERMISSION_ENTITIES, PERMISSION_TYPES, ALL_PERMISSIONS,
  getPermissionsForEntity, ORGANIZATION_TYPES, ACCESS_SCOPES,
  FONT_FAMILIES, FONT_SIZES, THEME_MODES,
  UI_CARD_RADIUS_OPTIONS, UI_BUTTON_RADIUS_OPTIONS, UI_INPUT_RADIUS_OPTIONS,
  UI_BUTTON_STYLE_OPTIONS, UI_CARD_ELEVATION_OPTIONS, UI_PATTERN_OPTIONS,
  UI_VISUAL_STYLE_OPTIONS, UI_VISUAL_STYLE_PRESETS,
  DEFAULT_BRAND_COLORS, DEFAULT_UI_PREFERENCES, ORIGINAL_UI_PREFERENCES,
  uiPreferencesForm, isUIPreferencesLoading,
  ALL_POS_ADDONS, activeSubscriptionKPIs,
  activeTab, tabs,
  selectedTierId, customMonths, customUsers, customBranches,
  selectedModuleIds, moduleInputs, expandedModuleDetails,
  selectedStorageId, showCalculatorSuccess,
  config, totals, selectedModulesCount, activeCycle,
  toggleModuleDetails, isModuleSelected, calculateModulePrice, formatDiscount, formatStorage,
  isTierCapacityExceeded, toggleModuleSelection,
  handleUpgradeSubscription, selectTier,
  incrementUsers, decrementUsers, incrementBranches, decrementBranches,
  incrementMonths, decrementMonths,
  availablePermissions,
  isInitializing, fetchOwnerSubscription, ownerSubscription,
  applyUIPreferences,
} = base

// â”€â”€ Profile â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const profileModule = useSettingsProfile()
const {
  profile, fetchTenantDetailsForSettings, updateProfile,
  handleLogoUpload, removeCompanyLogo,
  showProfilePassword, showProfileConfirmPassword,
  isPressingProfilePassword, isPressingProfileConfirm,
  profileNewPasswordType, profileConfirmPasswordType
} = profileModule

// â”€â”€ Modules / Subscription â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const modulesModule = useSettingsModules()
const {
  availableModules, allModuleCards,
  subscribedModules, pendingModules, subscriptionDetails,
  enrichedSubscriptions, subscriptionTotals, // NOTE: confirm these are exported from useSettingsModules
  modulePaymentPlans, moduleSubscriptionDetails,
  branchesCount, storageUsage,
  unsubscribingModules, subscribingModules,
  filteredModules, activeModulesList, inactiveModulesList,
  fetchSubscribedModules, fetchOwnerRequests, fetchSubscriptionDetails,
  fetchBranches, fetchStorageUsage,
  getPaymentPlanLabel, getModulePlanTotal, getModulePaymentPlan,
  getModuleDueDate, isModuleDueSoon, formatDueDate, getModuleSubscriptionInfo,
  addPending, removePending, isModulePending, isModuleSubscribed,
  upgradeModule, requestModule, cancelPendingRequest,
  handleUnsubscribeModule, handleSubscribeModule,
  savePaymentPlansCache
} = modulesModule

// â”€â”€ Email â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const emailModule = useSettingsEmail()
const {
  emailConfigurations, showEmailConfigForm, editingEmailConfig,
  savingEmailConfig, showEmailPassword, emailConfigForm,
  showTestEmailPrompt, testEmailRecipient, pendingTestEmailConfigId,
  testEmailSending, isValidTestEmailRecipient,
  openNewEmailConfig, cancelEmailConfig, saveEmailConfig,
  editEmailConfig, deleteEmailConfig, testEmailConfig,
  testSavedEmailConfig,
  closeTestEmailPrompt, confirmTestEmailPrompt, loadEmailConfigurations,
  toggleNotifType,
} = emailModule

// â”€â”€ Notifications â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const notifModule = useSettingsNotifications()
const {
  notifications, autoSendEnabled, whatsAppNumber, notificationEmail,
  selectedCategory, filterEquipment, filterProduct, filterLeads,
  scheduleType, scheduleTime, scheduleDay, testSendResults, showTestResults,
  stockAlerts, channelWhatsapp, channelEmail,
  notifSearch, notifSeverity, collapsedNotifCategories, expandedNotifs,
  notificationCount,
  inventoryItems, showItemSettingsPanel, selectedItem, selectedItemSettings,
  globalLowStockThreshold, globalCriticalStockThreshold,
  groupedNotifications, filteredGroupedNotifications,
  clearAdvancedFilters,
  getCategoryIcon, getNotifStatusClass, getCategoryMeta,
  getSeverityBorder, getSeverityDot, countBySeverity,
  toggleNotifCategory, notifKey, isNotifExpanded, toggleNotifExpanded,
  getNotifDetailText, truncateText, formatNotifRelative, formatDate,
  loadNotifications, loadStockAlerts, dismissNotification,
  resolveNotification, dismissAllNotifications,
  saveNotificationSettings, sendTest,
  fetchInventoryForSettings, openItemSettingsPanel, openItemSettings, saveItemSettings,
  fetchGlobalStockSettings, saveGlobalStockSettings,
  exportNotificationsExcel, exportNotificationsPDF,
} = notifModule

// â”€â”€ AI Agents â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const aiModule = useSettingsAiAgents()
const { aiAgents, saveAgentSettings } = aiModule

// â”€â”€ Integrations (Telegram) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const integModule = useSettingsIntegrations()
const {
  telegramConfig, telegramSuccess, telegramError,
  telegramConversations, telegramConversationsLoading, showTokenField,
  loadTelegramConfig, saveTelegramConfig, disableTelegramBot, loadTelegramConversations
} = integModule

// â”€â”€ Roles â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const rolesModule = useSettingsRoles()
const {
  visibleTenantRoles: visibleTenantRolesBase, tenantRoles,
  showRoleModal, editingRole, roleForm, roleFormErrors,
  rbacSuccess: rbacRoleSuccess, rbacFeedbackMessage: rbacRoleFeedback,
  rbacLoading, // NOTE: confirm this is exported from useSettingsRoles (or move to useSettingsBase)
  originalRoleForm,
  expandedAddons,
  ENTITIES_WITH_ADDONS, POS_ADDON_FEATURES, ASSET_SCOPE_FIELDS,
  ADMIN_ONLY_ROLE_IDS, ADMIN_ONLY_ROLE_NAMES,
  isRoleDirty,
  getPosAddon, togglePosAddon, syncPosPermsToLocalStorage,
  hasAddon, toggleAddon, isAddonOpen,
  openRoleModal, closeRoleModal,
  togglePermission, toggleAllEntityPermissions, hasEntityPermission,
  setAssetScope,
  saveRole: saveRoleBase,
  handleDeleteRole
} = rolesModule


// Helper: count selected permissions per entity
function getEntityPermissionsSelected(entityId) {
  const perms = roleForm.value?.permissions?.[entityId]
  return Array.isArray(perms) ? perms.length : 0
}


// â”€â”€ Organizations â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const orgModule = useSettingsOrganizations()
const {
  showOrgModal, editingOrg, orgForm, tenantOrganizations,
  rbacSuccess: rbacOrgSuccess, rbacFeedbackMessage: rbacOrgFeedback,
  openOrgModal, closeOrgModal, saveOrganization, handleDeleteOrg,
  getOrgTypeInfo, getAccessScopeInfo
} = orgModule

// Roles + Organizations share the same success banner in the template
const rbacSuccess = computed(() => !!(rbacRoleSuccess.value || rbacOrgSuccess.value))
const rbacFeedbackMessage = computed(() => rbacRoleFeedback.value || rbacOrgFeedback.value)

// â”€â”€ Branding â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const brandingModule = useSettingsBranding()
const {
  showColorPicker, selectedVisualStyleName,
  resetUIPreferences, updateBrandColor, previewThemeMode,
  applyVisualStylePreset, saveUIPreferences
} = brandingModule

// â”€â”€ Currency â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const currencyModule = useSettingsCurrency()
const {
  currencySettings, currencySuccess, currencyError, currencyLoading,
  currencySymbols, formatCurrencyPreview, updateCurrency,
  saveCurrencySettings, loadCurrencySettings
} = currencyModule

// â”€â”€ Audit â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const auditModule = useSettingsAudit()
const {
  auditLogs, auditTotal, auditPage, auditLimit, isLoadingAudit,
  auditModuleFilter, showAuditChart, auditTotalPages,
  AUDIT_SENSITIVE, FLAG_DELETE_THRESHOLD, FLAG_UPDATE_THRESHOLD,
  auditIsFlagged, auditFlags, auditActionTotals, auditChartModules,
  fetchAuditLogs, auditPrevPage, auditNextPage
} = auditModule

// â”€â”€ Goals â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const goalsModule = useSettingsGoals()
const {
  companyGoals, showAddGoalModal, showEditGoalModal, activeGoalMenu, editingGoal, goalForm,
  activeGoalsCount, achievedGoalsCount, aiInsightsCount,
  toggleGoalActions, closeGoalModal, editGoal, saveGoal, deleteGoal,
  duplicateGoal, generateAIInsights, getSmartRecommendation,
  getGoalStatusClass, getGoalPriorityClass, getProgressBarClass,
  getRiskLevelClass, getDaysLeft
} = goalsModule

// â”€â”€ Header "Save/Processing" flags â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const notificationsLoading = ref(false)
const telegramLoading = ref(false)

// â”€â”€ Healthcare sub-module feature add-ons (not covered by useSettingsRoles) â”€
const HEALTHCARE_ADDON_FEATURES = [
  { group: 'Core Clinical', features: [
    { key: 'patient_registration', label: 'Patient Registration', icon: 'fas fa-user-plus', desc: 'Register and search patients' },
    { key: 'patient_demographics', label: 'Patient Demographics', icon: 'fas fa-id-card', desc: 'View/edit patient info' },
    { key: 'patient_clinical', label: 'Clinical Records', icon: 'fas fa-notes-medical', desc: 'View full clinical records' },
    { key: 'appointments', label: 'Appointments', icon: 'fas fa-calendar-check', desc: 'Book, reschedule, cancel' },
    { key: 'queue', label: 'Queue Management', icon: 'fas fa-list-ol', desc: 'Manage queues, call patients' },
    { key: 'triage', label: 'Triage & Vitals', icon: 'fas fa-heartbeat', desc: 'Record vitals, triage assess' },
  ]},
  { group: 'Clinical Practice', features: [
    { key: 'clinical_emr', label: 'EMR / SOAP Notes', icon: 'fas fa-file-medical-alt', desc: 'Encounter documentation' },
    { key: 'diagnosis', label: 'Diagnosis (ICD)', icon: 'fas fa-diagnoses', desc: 'ICD coding, problem list' },
    { key: 'prescriptions', label: 'Prescriptions', icon: 'fas fa-prescription', desc: 'Standard medication Rx' },
    { key: 'prescriptions_controlled', label: 'Controlled Drugs', icon: 'fas fa-prescription-bottle', desc: 'Restricted drug Rx' },
    { key: 'procedures', label: 'Procedures', icon: 'fas fa-procedures', desc: 'Order and document procedures' },
  ]},
  { group: 'Diagnostic Services', features: [
    { key: 'lab_orders', label: 'Lab Orders', icon: 'fas fa-flask', desc: 'Place and manage lab orders' },
    { key: 'lab_results', label: 'Lab Results Entry', icon: 'fas fa-vial', desc: 'Enter lab test results' },
    { key: 'lab_verify', label: 'Lab Verification', icon: 'fas fa-check-double', desc: 'Verify and sign-off results' },
    { key: 'lab_config', label: 'Lab Configuration', icon: 'fas fa-cogs', desc: 'Test catalog, analyzers, QC' },
    { key: 'radiology_orders', label: 'Radiology Orders', icon: 'fas fa-x-ray', desc: 'Place imaging orders' },
    { key: 'radiology_reporting', label: 'Radiology Reports', icon: 'fas fa-file-signature', desc: 'Create and sign reports' },
    { key: 'radiology_images', label: 'Image Viewing', icon: 'fas fa-images', desc: 'View DICOM images' },
    { key: 'radiology_config', label: 'Radiology Config', icon: 'fas fa-sliders-h', desc: 'Modality setup, protocols' },
  ]},
  { group: 'Inpatient Services', features: [
    { key: 'admissions', label: 'Admissions / ADT', icon: 'fas fa-bed', desc: 'Admit, transfer, discharge' },
    { key: 'bed_management', label: 'Bed Management', icon: 'fas fa-procedures', desc: 'Bed board, assignment' },
    { key: 'nursing_notes', label: 'Nursing Notes', icon: 'fas fa-clipboard-list', desc: 'Nursing documentation' },
    { key: 'nursing_mar', label: 'Med Admin (MAR)', icon: 'fas fa-pills', desc: 'Medication administration record' },
    { key: 'nursing_care_plans', label: 'Care Plans', icon: 'fas fa-clipboard-check', desc: 'NANDA/NOC/NIC plans' },
    { key: 'theatre', label: 'Theatre / OR', icon: 'fas fa-syringe', desc: 'Scheduling, checklist, op notes' },
    { key: 'discharge', label: 'Discharge', icon: 'fas fa-sign-out-alt', desc: 'Discharge summary, follow-up' },
  ]},
  { group: 'Financial & Admin', features: [
    { key: 'insurance', label: 'Insurance Mgmt', icon: 'fas fa-shield-alt', desc: 'Providers, eligibility, pre-auth' },
    { key: 'claims', label: 'Insurance Claims', icon: 'fas fa-file-invoice-dollar', desc: 'Claim generation, submission' },
    { key: 'billing', label: 'Billing & Charges', icon: 'fas fa-receipt', desc: 'Charge viewing and billing' },
    { key: 'documents', label: 'Document Mgmt', icon: 'fas fa-folder-open', desc: 'Upload, view, search docs' },
    { key: 'dms_admin', label: 'DMS Admin', icon: 'fas fa-archive', desc: 'Retention, archival, sharing' },
  ]},
  { group: 'Reporting & Compliance', features: [
    { key: 'reports_clinical', label: 'Clinical Reports', icon: 'fas fa-chart-bar', desc: 'Encounter, diagnosis, Rx reports' },
    { key: 'reports_operational', label: 'Operational Reports', icon: 'fas fa-chart-line', desc: 'Queue, TAT, bed occupancy' },
    { key: 'reports_financial', label: 'Financial Reports', icon: 'fas fa-chart-pie', desc: 'Revenue, claims, billing' },
    { key: 'reports_regulatory', label: 'Regulatory Reports', icon: 'fas fa-gavel', desc: 'MOH, notifiable diseases' },
    { key: 'audit_logs', label: 'Audit Logs', icon: 'fas fa-search', desc: 'Clinical audit trails' },
  ]},
];
const ALL_HEALTHCARE_ADDONS = HEALTHCARE_ADDON_FEATURES.flatMap(g => g.features.map(f => f.key));

function getHealthAddon(featureKey) {
  const addons = roleForm.value.permissions?.['healthcare_addons'];
  if (!Array.isArray(addons)) return false;
  return addons.includes(featureKey);
}

function toggleHealthAddon(featureKey) {
  const current = Array.isArray(roleForm.value.permissions?.['healthcare_addons'])
    ? [...roleForm.value.permissions['healthcare_addons']]
    : [...ALL_HEALTHCARE_ADDONS];
  const idx = current.indexOf(featureKey);
  if (idx >= 0) current.splice(idx, 1);
  else current.push(featureKey);
  roleForm.value = {
    ...roleForm.value,
    permissions: { ...roleForm.value.permissions, healthcare_addons: current }
  };
}

function syncHealthPermsToLocalStorage() {
  try {
    const translated = {};
    for (const role of tenantRoles.value) {
      const rId = (role.id || '').toLowerCase();
      if (!rId) continue;
      const perms = role.permissions || {};

      if (rId === 'owner' || rId === 'admin' || rId === 'super_admin') {
        const full = {};
        ALL_HEALTHCARE_ADDONS.forEach(k => { full[k.replace(/_([a-z])/g, (_, c) => c.toUpperCase())] = true; });
        translated[rId] = full;
        continue;
      }

      const result = {};
      for (const snakeKey of ALL_HEALTHCARE_ADDONS) {
        const camelKey = snakeKey.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
        const addons = perms.healthcare_addons;
        if (Array.isArray(addons)) {
          result[camelKey] = addons.includes(snakeKey);
          continue;
        }
        const entityPerms = perms[snakeKey];
        result[camelKey] = Array.isArray(entityPerms) && entityPerms.length > 0;
      }
      translated[rId] = result;
    }
    if (Object.keys(translated).length > 0) {
      localStorage.setItem('healthcare_role_perms', JSON.stringify(translated));
    }
  } catch (e) {
    console.warn('[Settings] Failed to sync healthcare perms to localStorage:', e);
  }
}

// Hide healthcare-specific roles unless the healthcare module is subscribed
const HEALTHCARE_ROLE_IDS = new Set([
  'healthcare_admin', 'medical_director', 'consultant', 'medical_officer',
  'resident', 'nurse_manager', 'registered_nurse', 'enrolled_nurse',
  'lab_manager', 'lab_scientist', 'lab_technician', 'phlebotomist',
  'radiology_manager', 'radiologist', 'radiographer',
  'pharmacy_manager', 'pharmacist', 'pharmacy_technician',
  'receptionist', 'billing_clerk', 'insurance_officer',
  'health_records_officer', 'quality_officer', 'patient'
]);

const visibleTenantRoles = computed(() => {
  const hasHealthcare = subscribedModules.value.some(m => m.id === 'healthcare');
  return (visibleTenantRolesBase.value || []).filter(r => {
    const id = String(r?.id || '').toLowerCase().trim();
    if (!hasHealthcare && HEALTHCARE_ROLE_IDS.has(id)) return false;
    return true;
  });
});

// Save role, then push POS + Healthcare addon caches to localStorage so the
// POS and Healthcare modules immediately reflect the new permissions.
async function saveRole() {
  await saveRoleBase(createRole, updateRole);
  syncPosPermsToLocalStorage();
  syncHealthPermsToLocalStorage();
}

// â”€â”€ Modal blur (dims the page behind any open modal/dialog) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const isAnyModalOpen = computed(() => {
  return showRoleModal.value || showOrgModal.value ||
    showAddGoalModal.value || showEditGoalModal.value ||
    showItemSettingsPanel.value || !!settingsConfirmState.value ||
    showTestEmailPrompt.value
})

watch(isAnyModalOpen, (isOpen) => {
  if (isOpen) document.body.classList.add('scoped-modal-open')
  else document.body.classList.remove('scoped-modal-open')
}, { immediate: true })

onBeforeUnmount(() => {
  document.body.classList.remove('scoped-modal-open')
})

// â”€â”€ Auto-select a pricing tier based on saved subscription / business type â”€
function autoSelectTier() {
  if (selectedTierId.value) return
  const sub = ownerSubscription.value
  if (sub && sub.tier && config.value?.tiers?.[sub.tier]) {
    selectTier(sub.tier)
    return
  }
  if (profile.value?.business_type) {
    const type = profile.value.business_type.toLowerCase()
    if (type.includes('micro') || type.includes('informal')) selectTier('micro')
    else if (type.includes('small') || type.includes('start')) selectTier('small')
    else if (type.includes('medium') || type.includes('grow')) selectTier('medium')
    else if (type.includes('enter') || type.includes('large') || type.includes('corp')) selectTier('enterprise')
  }
}

// â”€â”€ Header Save / Reset actions â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function saveActiveTab() {
  switch (activeTab.value) {
    case 'branding':
      saveUIPreferences()
      logAudit('update', 'settings', { resource_type: 'branding' })
      break
    case 'currency':
      saveCurrencySettings()
      logAudit('update', 'settings', { resource_type: 'currency' })
      break
    case 'notifications':
      saveNotificationSettings()
      logAudit('update', 'settings', { resource_type: 'notifications' })
      break
    case 'integrations':
      saveTelegramConfig()
      logAudit('update', 'settings', { resource_type: 'integrations' })
      break
    default:
      break
  }
}

function resetActiveTab() {
  openSettingsConfirm({
    title: 'Discard Unsaved Changes',
    message: 'Are you sure you want to discard unsaved changes in this section?',
    detail: 'Current edits in the active tab will be lost.',
    variant: 'warning',
    confirmLabel: 'Discard',
    onConfirm: () => {
      switch (activeTab.value) {
        case 'branding':
          uiPreferencesForm.value = { ...DEFAULT_UI_PREFERENCES }
          break
        case 'notifications':
          loadNotifications()
          break
        case 'integrations':
          loadTelegramConfig()
          break
        default:
          break
      }
    },
  })
}

// â”€â”€ Lifecycle â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
onMounted(async () => {
  isInitializing.value = true

  try {
    // 1. Handle tab query parameter
    const tabParam = route.query.tab
    const validTabs = ['profile', 'branding', 'currency', 'notifications', 'roles', 'organizations', 'modules', 'goals', 'ai-agents', 'integrations']
    if (tabParam && validTabs.includes(tabParam)) activeTab.value = tabParam

    // 2. Initialize core services & configs
    if (!pricingStore.config) await pricingStore.fetchConfig()
    await fetchGlobalStockSettings()
    await loadCurrencySettings()

    // 3. Fetch domain data
    await fetchSubscribedModules()
    await fetchOwnerRequests()
    await fetchSubscriptionDetails()
    await fetchOwnerSubscription()
    await fetchTenantDetailsForSettings()
    await fetchBranches()
    await fetchStorageUsage()
    await loadNotifications()
    try { await loadStockAlerts() } catch (e) { console.warn('loadStockAlerts initial error', e) }

    // 4. Auto-select tier once data is in, and keep re-checking as data settles
    autoSelectTier()
    watch([profile, config], () => {
      if (!selectedTierId.value) autoSelectTier()
    }, { deep: true })

    // 5. Telegram + Email + RBAC
    await loadTelegramConfig()
    watch(activeTab, (newTab) => {
      if (newTab === 'integrations') { loadTelegramConfig(); loadTelegramConversations() }
      if (newTab === 'audit') fetchAuditLogs()
    })

    await loadEmailConfigurations()
    await initializeRBAC()

    // 6. Final sync of selected module ids for the calculator
    selectedModuleIds.clear()
    subscribedModules.value.forEach(m => selectedModuleIds.add(m.id))
  } catch (err) {
    console.error('[Settings] Error during initialization:', err)
  } finally {
    isInitializing.value = false
  }
})

watch(auditModuleFilter, () => { auditPage.value = 1; fetchAuditLogs() })
</script>

<style scoped>
/* ── UI Choice Buttons (Components Section) ──────────────────── */
.ui-choice-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 12px;
  font-size: 11px;
  font-weight: 700;
  font-family: monospace;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 1px solid #e5e7eb;
  border-radius: 2px;
  background-color: #f9fafb;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.15s ease;
  position: relative;
  user-select: none;
  white-space: nowrap;
}

.ui-choice-btn:hover {
  border-color: #9ca3af;
  background-color: #f3f4f6;
  color: #374151;
}

.ui-choice-btn-active {
  border-color: #2F2E8B;
  background-color: #2F2E8B;
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(47, 46, 139, 0.25);
}

.ui-choice-btn-active:hover {
  background-color: #3D2F88;
  border-color: #3D2F88;
  color: #ffffff;
}

.ui-choice-btn-active::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  background-color: #ffffff;
  border-radius: 50%;
  flex-shrink: 0;
}

/* Dark mode overrides */
.dark .ui-choice-btn {
  border-color: #3f3f46;
  background-color: #27272a;
  color: #a1a1aa;
}

.dark .ui-choice-btn:hover {
  border-color: #52525b;
  background-color: #3f3f46;
  color: #d4d4d8;
}

.dark .ui-choice-btn-active {
  border-color: #2F2E8B;
  background-color: #2F2E8B;
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(47, 46, 139, 0.4);
}

.dark .ui-choice-btn-active:hover {
  background-color: #3D2F88;
  border-color: #3D2F88;
}

/* ── Visual Style Cards ──────────────────────────────────────── */
.visual-style-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 2px;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  text-align: left;
  width: 100%;
}

.visual-style-card:hover {
  border-color: #9ca3af;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.visual-style-card-active {
  border-color: #2F2E8B;
  box-shadow: 0 4px 16px rgba(47, 46, 139, 0.18);
  background-color: #ffffff;
}

.visual-style-card-active:hover {
  border-color: #2F2E8B;
  box-shadow: 0 4px 16px rgba(47, 46, 139, 0.25);
}

/* ── Visual Style Sample Thumbnail ──────────────────────────── */
.visual-style-sample {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 52px;
  padding: 10px 12px;
  border-radius: 1px;
  background-color: #f9fafb;
  border: 1px solid #f3f4f6;
  position: relative;
}

.visual-style-sample-panel {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.visual-style-sample-panel span {
  display: block;
  height: 4px;
  border-radius: 1px;
  background-color: #d1d5db;
}

.visual-style-sample-panel span:nth-child(1) { width: 70%; }
.visual-style-sample-panel span:nth-child(2) { width: 50%; }
.visual-style-sample-panel span:nth-child(3) { width: 60%; }

.visual-style-sample-button {
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 1px;
  background-color: #2F2E8B;
  flex-shrink: 0;
}

/* Per-style sample overrides */
.visual-style-sample[data-style="material"] {
  background-color: #f5f3ff;
  border-color: #ede9fe;
}
.visual-style-sample[data-style="material"] .visual-style-sample-panel span {
  height: 5px;
  border-radius: 2px;
  background-color: #a78bfa;
}
.visual-style-sample[data-style="material"] .visual-style-sample-button {
  border-radius: 2px;
  box-shadow: 0 2px 6px rgba(47, 46, 139, 0.25);
}

.visual-style-sample[data-style="minimalism"] {
  background-color: #ffffff;
  border-color: #e5e7eb;
}
.visual-style-sample[data-style="minimalism"] .visual-style-sample-panel span {
  height: 3px;
  background-color: #9ca3af;
}
.visual-style-sample[data-style="minimalism"] .visual-style-sample-button {
  background-color: #6b7280;
  width: 16px;
  height: 16px;
}

.visual-style-sample[data-style="glassmorphism"] {
  background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%);
  backdrop-filter: blur(4px);
  border-color: rgba(255,255,255,0.3);
}
.visual-style-sample[data-style="glassmorphism"] .visual-style-sample-panel span {
  background-color: rgba(167, 139, 250, 0.6);
}
.visual-style-sample[data-style="glassmorphism"] .visual-style-sample-button {
  background-color: rgba(47, 46, 139, 0.7);
  backdrop-filter: blur(2px);
}

.visual-style-sample[data-style="skeuomorphism"] {
  background: linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%);
  border-color: #d1d5db;
  box-shadow: inset 0 1px 0 #ffffff, 0 1px 3px rgba(0,0,0,0.06);
}
.visual-style-sample[data-style="skeuomorphism"] .visual-style-sample-panel span {
  height: 5px;
  border-radius: 1px;
  background: linear-gradient(90deg, #9ca3af 0%, #d1d5db 100%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.5);
}
.visual-style-sample[data-style="skeuomorphism"] .visual-style-sample-button {
  background: linear-gradient(180deg, #2F2E8B 0%, #1D226B 100%);
  box-shadow: 0 1px 2px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2);
  border-radius: 1px;
}

/* ── Theme Mode Options ──────────────────────────────────────── */
.theme-mode-option {
  border-radius: 2px;
  transition: all 0.15s ease;
  cursor: pointer;
}

.theme-mode-option-active {
  box-shadow: 0 2px 8px rgba(47, 46, 139, 0.2);
}

/* ── UI Preview Card ─────────────────────────────────────────── */
.ui-preview-card {
  position: relative;
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 2px;
  background-color: #ffffff;
  overflow: hidden;
}

.dark .ui-preview-card {
  border-color: #3f3f46;
  background-color: #18181b;
}

.ui-preview-primary {
  display: inline-flex;
  align-items: center;
  padding: 8px 20px;
  background-color: #2F2E8B;
  color: #ffffff;
  border: none;
  border-radius: 2px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.ui-preview-primary:hover {
  background-color: #3D2F88;
}

.ui-preview-secondary {
  display: inline-flex;
  align-items: center;
  padding: 8px 20px;
  background-color: transparent;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 2px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.ui-preview-secondary:hover {
  border-color: #9ca3af;
  background-color: #f9fafb;
}

.dark .ui-preview-secondary {
  color: #d4d4d8;
  border-color: #3f3f46;
}

.dark .ui-preview-secondary:hover {
  border-color: #52525b;
  background-color: #27272a;
}

.ui-preview-input {
  display: block;
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 2px;
  font-size: 13px;
  color: #6b7280;
  background-color: #f9fafb;
  cursor: default;
}

.dark .ui-preview-input {
  border-color: #3f3f46;
  background-color: #27272a;
  color: #a1a1aa;
}

/* Dark mode overrides */
.dark .visual-style-card {
  border-color: #3f3f46;
  background-color: #18181b;
}

.dark .visual-style-card:hover {
  border-color: #52525b;
}

.dark .visual-style-card-active {
  border-color: #2F2E8B;
  box-shadow: 0 4px 16px rgba(47, 46, 139, 0.3);
}

.dark .visual-style-sample {
  background-color: #27272a;
  border-color: #3f3f46;
}

.dark .visual-style-sample .visual-style-sample-panel span {
  background-color: #52525b;
}

.dark .visual-style-sample .visual-style-sample-button {
  background-color: #6366f1;
}

.dark .visual-style-sample[data-style="material"] {
  background-color: #1e1b4b;
  border-color: #312e81;
}
.dark .visual-style-sample[data-style="material"] .visual-style-sample-panel span {
  background-color: #6366f1;
}

.dark .visual-style-sample[data-style="minimalism"] {
  background-color: #09090b;
  border-color: #27272a;
}
.dark .visual-style-sample[data-style="minimalism"] .visual-style-sample-panel span {
  background-color: #3f3f46;
}
.dark .visual-style-sample[data-style="minimalism"] .visual-style-sample-button {
  background-color: #52525b;
}

.dark .visual-style-sample[data-style="glassmorphism"] {
  background: linear-gradient(135deg, rgba(39,39,42,0.4) 0%, rgba(24,24,27,0.1) 100%);
  border-color: rgba(63,63,70,0.5);
}
.dark .visual-style-sample[data-style="glassmorphism"] .visual-style-sample-panel span {
  background-color: rgba(99,102,241,0.5);
}

.dark .visual-style-sample[data-style="skeuomorphism"] {
  background: linear-gradient(180deg, #27272a 0%, #18181b 100%);
  border-color: #3f3f46;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.05), 0 1px 3px rgba(0,0,0,0.3);
}
.dark .visual-style-sample[data-style="skeuomorphism"] .visual-style-sample-panel span {
  background: linear-gradient(90deg, #52525b 0%, #3f3f46 100%);
}
</style>