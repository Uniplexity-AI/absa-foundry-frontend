<template>
  <div class="min-h-screen flex flex-col font-sans relative text-gray-900 dark:text-white">
    
    <!-- Mesh Background -->
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>
    
    <!-- Header -->
    <header class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-[100] shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-2 h-8 bg-[#2F2E8B] rounded-sm"></div>
          <div>
              <div class="flex items-center gap-2">
                 <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">User // Profile</span>
              </div>
              <h1 class="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Profile Management</h1>
          </div>
        </div>
        
        <div class="flex items-center gap-3">
           <button 
             v-if="activeTab === 'profile' && isOwner && selectedCardId"
             @click="importFromProfile"
             class="border border-gray-300 hover:border-[#2F2E8B] hover:text-[#2F2E8B] text-gray-600 px-4 py-2 rounded-sm text-xs font-bold font-mono uppercase transition-all flex items-center gap-2 bg-white dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
           >
             <i class="fas fa-file-import"></i> Import Profile
           </button>

           <button 
             v-if="activeTab === 'profile' && isOwner"
             @click="saveChanges" 
             :disabled="loading"
             class="bg-[#2F2E8B] hover:bg-[#1D226B] text-white px-6 py-2 rounded-sm text-xs font-bold font-mono uppercase shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
           >
             <i class="fas fa-save"></i>
             {{ loading ? 'Saving...' : 'Save Changes' }}
           </button>
        </div>
      </div>

      <!-- Slide Tab Navbar -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="flex gap-0 -mb-px overflow-x-auto scrollbar-hide">
          <button
            v-for="tab in visibleTabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="relative px-5 py-3 text-[11px] font-mono font-bold uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-2 border-b-2"
            :class="activeTab === tab.id 
              ? 'border-[#2F2E8B] text-[#2F2E8B] dark:text-blue-400 dark:border-blue-400' 
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:border-gray-300'"
          >
            <i :class="tab.icon" class="text-xs"></i>
            {{ tab.label }}
            <span v-if="tab.badge" class="ml-1 bg-[#2F2E8B] text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold leading-none">{{ tab.badge }}</span>
          </button>
        </nav>
      </div>
    </header>

    <main class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-40 relative z-10">

      <!-- ==================== TAB: Profile & Cards (Owner editable, sub-account read-only) ==================== -->
      <div v-if="activeTab === 'profile'" class="animate-fade-in-up">

        <!-- User Info Summary (Sub-account view) -->
        <div v-if="!isOwner" class="mb-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-sm p-6 shadow-sm">
          <div class="flex items-center gap-5">
            <div class="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden border-2 border-[#2F2E8B]">
              <img v-if="myAccount.profilePhotoUrl || editForm.profilePhotoUrl" :src="myAccount.profilePhotoUrl || editForm.profilePhotoUrl" class="w-full h-full object-cover" />
              <i v-else class="fas fa-user text-2xl text-gray-400"></i>
            </div>
            <div>
              <h2 class="text-lg font-black text-gray-900 dark:text-white uppercase">{{ myAccount.name || editForm.businessName || 'User' }}</h2>
              <div class="flex items-center gap-3 mt-1">
                <span class="text-[10px] font-mono font-bold text-[#2F2E8B] bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-sm uppercase">{{ myAccount.role || 'Staff' }}</span>
                <span class="text-[10px] font-mono text-gray-400">{{ myAccount.email }}</span>
              </div>
              <div v-if="myAccount.branch_id" class="text-[10px] font-mono text-gray-400 mt-1">
                <i class="fas fa-map-marker-alt mr-1"></i> Branch: {{ myAccount.branch_id }}
              </div>
            </div>
          </div>
        </div>

        <!-- Read-only notice for sub-accounts -->
        <div v-if="!isOwner" class="mb-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-sm px-4 py-3 flex items-center gap-3">
          <i class="fas fa-info-circle text-amber-500"></i>
          <span class="text-xs font-mono text-amber-700 dark:text-amber-400">You are viewing your profile in read-only mode. Contact your account owner to make changes.</span>
        </div>

        <!-- Business Card Gallery (Owner only) -->
        <div v-if="isOwner" class="space-y-6 mb-12">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
               <i class="fas fa-id-card text-gray-400 text-xs"></i> Business Cards
            </h3>
            <button 
              @click="createNewCard"
              class="text-[10px] font-mono font-bold text-[#2F2E8B] hover:text-[#1D226B] uppercase tracking-wider flex items-center gap-2"
            >
              <i class="fas fa-plus"></i> Create New Card
            </button>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <!-- Main Profile Card -->
            <div 
              @click="selectCard(null)"
              class="cursor-pointer border bg-white dark:bg-gray-800 p-5 transition-all relative group h-40 flex flex-col justify-between rounded-sm hover:shadow-lg overflow-hidden"
              :class="selectedCardId === null ? 'border-[#2F2E8B] ring-1 ring-[#2F2E8B]' : 'border-gray-200 dark:border-gray-700 hover:border-[#2F2E8B]'"
            >
              <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
              <div class="absolute top-0 right-0 w-4 h-4 bg-gray-50 dark:bg-gray-700 border-l border-b border-gray-200 dark:border-gray-600 rounded-bl-sm flex items-center justify-center p-0.5 z-10" v-if="selectedCardId === null">
                  <div class="w-1.5 h-1.5 bg-[#2F2E8B] rounded-full"></div>
              </div>
              <div class="flex items-center gap-4 relative z-10">
                <div class="w-10 h-10 flex items-center justify-center text-[#2F2E8B]">
                  <i class="fas fa-user-shield text-xl"></i>
                </div>
                <div>
                  <p class="font-bold text-gray-900 dark:text-white text-sm font-mono uppercase tracking-tight">Main Profile</p>
                  <p class="text-[10px] text-gray-500 font-mono uppercase">Primary Info</p>
                </div>
              </div>
              <div class="mt-2 text-[10px] text-gray-400 font-mono relative z-10">
                STATUS: <span class="text-green-600 font-bold">ACTIVE</span>
              </div>
            </div>

            <!-- Dynamic Business Cards -->
            <div 
              v-for="card in businessCards" 
              :key="card.id"
              @click="selectCard(card)"
              class="cursor-pointer border bg-white dark:bg-gray-800 p-5 transition-all relative group h-40 flex flex-col justify-between rounded-sm hover:shadow-lg overflow-hidden"
              :class="selectedCardId === card.id ? 'border-[#2F2E8B] ring-1 ring-[#2F2E8B]' : 'border-gray-200 dark:border-gray-700 hover:border-[#2F2E8B]'"
            >
              <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
              <div class="absolute top-0 right-0 w-4 h-4 bg-gray-50 dark:bg-gray-700 border-l border-b border-gray-200 dark:border-gray-600 rounded-bl-sm flex items-center justify-center p-0.5 z-10" v-if="selectedCardId === card.id">
                  <div class="w-1.5 h-1.5 bg-[#2F2E8B] rounded-full"></div>
              </div>
               <div class="flex items-center gap-4 relative z-10">
                <div class="w-10 h-10 flex items-center justify-center font-bold text-xl" :style="{ color: card.cardColor || '#2F2E8B' }">
                  <i class="fas fa-id-card"></i>
                </div>
                <div class="overflow-hidden">
                  <p class="font-bold text-gray-900 dark:text-white text-sm font-mono uppercase tracking-tight truncate" :title="card.cardName">{{ card.cardName || 'Untitled Card' }}</p>
                  <p class="text-[10px] text-gray-500 font-mono uppercase truncate">{{ card.jobTitle || 'Secondary Info' }}</p>
                </div>
              </div>
              <div class="flex items-center justify-between mt-auto pt-4 border-t border-dashed border-gray-100 dark:border-gray-700 relative z-10">
                 <span class="text-[9px] font-mono text-gray-400 font-bold">ID: ...{{ card.id.slice(-6) }}</span>
                 <button 
                  @click.stop="deleteCard(card.id)"
                  class="text-gray-300 hover:text-red-600 transition-colors"
                  title="Delete Card"
                >
                  <i class="fas fa-trash-alt text-xs"></i>
                </button>
              </div>
            </div>

            <!-- Add New Card -->
            <div 
              @click="createNewCard"
              class="border border-dashed border-gray-300 dark:border-gray-600 rounded-sm p-4 h-40 flex flex-col items-center justify-center cursor-pointer hover:border-[#2F2E8B] hover:bg-blue-50/10 transition group bg-gray-50/50 dark:bg-gray-800/50"
            >
              <div class="w-10 h-10 rounded-sm bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 group-hover:border-[#2F2E8B] flex items-center justify-center text-gray-400 transition-colors mb-3">
                <i class="fas fa-plus group-hover:text-[#2F2E8B]"></i>
              </div>
              <p class="text-[10px] font-bold font-mono text-gray-500 uppercase group-hover:text-[#2F2E8B] tracking-wider">Add Card</p>
            </div>
          </div>
        </div>

        <!-- Active Editor / Viewer Section -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <!-- Left Column -->
          <div class="lg:col-span-2 space-y-6">
            
            <!-- Card Name Input (Owner + Business Cards only) -->
            <div v-if="isOwner && selectedCardId" class="bg-gray-50 dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-sm flex items-center gap-4">
              <div class="p-2 bg-white dark:bg-gray-700 rounded-sm border border-gray-200 dark:border-gray-600 shadow-sm">
                 <i class="fas fa-tag text-[#2F2E8B]"></i>
              </div>
              <div class="flex-1">
                <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Card Reference Name</label>
                <input 
                  v-model="editForm.cardName" 
                  type="text" 
                  class="w-full bg-transparent border-0 border-b border-gray-300 dark:border-gray-600 focus:border-[#2F2E8B] focus:ring-0 px-0 py-1 font-mono font-bold text-gray-900 dark:text-white placeholder-gray-400 text-sm"
                  placeholder="e.g. MARKETING_CONF_2026"
                />
              </div>
            </div>
            
            <!-- Business Information Card -->
            <div class="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 shadow-sm relative group hover:border-blue-300 transition-colors rounded-sm">
              <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
              
              <h3 class="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight mb-6 flex items-center gap-2">
                <i class="fas fa-briefcase text-gray-400 text-xs"></i> Information
              </h3>

              <div class="space-y-6">
                 <div>
                  <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Full Name / Business Name</label>
                  <input
                    v-model="editForm.businessName"
                    type="text"
                    :disabled="!isOwner"
                    class="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] font-bold text-gray-900 dark:text-white text-sm disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:cursor-not-allowed"
                    placeholder="e.g. John Doe / Acme Corp"
                  />
                </div>

                 <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Job Title</label>
                    <input
                      v-model="editForm.jobTitle"
                      type="text"
                      :disabled="!isOwner"
                      class="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] font-mono text-sm disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:cursor-not-allowed"
                      placeholder="e.g. CTO"
                    />
                  </div>
                  <div>
                    <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Company Name</label>
                    <input
                      v-model="editForm.companyName"
                      type="text"
                      :disabled="!isOwner"
                      class="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] font-mono text-sm disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:cursor-not-allowed"
                      placeholder="Company Name"
                    />
                  </div>
                 </div>

                <!-- Template Selector (Owner only) -->
                <div v-if="isOwner">
                   <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-2">Design Template</label>
                   <div class="grid grid-cols-3 gap-3">
                     <button 
                      v-for="template in cardTemplates" 
                      :key="template.id"
                      @click="editForm.templateId = template.id"
                      class="border rounded-sm p-3 flex flex-col items-center justify-center gap-2 transition hover:border-[#2F2E8B] hover:bg-blue-50/20"
                      :class="editForm.templateId === template.id ? 'border-[#2F2E8B] bg-blue-50/20 ring-1 ring-[#2F2E8B]' : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700'"
                     >
                       <i :class="[template.icon, editForm.templateId === template.id ? 'text-[#2F2E8B]' : 'text-gray-400', 'text-lg']"></i>
                       <span class="text-[10px] font-mono font-bold uppercase" :class="editForm.templateId === template.id ? 'text-[#2F2E8B]' : 'text-gray-500'">{{ template.name }}</span>
                     </button>
                   </div>
                </div>

                <!-- Theme Selector (Owner only) -->
                <div v-if="isOwner">
                   <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-2">Accent Theme</label>
                   <div class="flex flex-wrap gap-3">
                     <button 
                      v-for="color in themeColors" 
                      :key="color.value"
                      @click="editForm.cardColor = color.value"
                      class="w-8 h-8 rounded-sm border transition-transform hover:scale-105 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-[#2F2E8B]"
                      :class="editForm.cardColor === color.value ? 'border-gray-900 shadow-sm ring-1 ring-gray-900' : 'border-gray-200 dark:border-gray-600'"
                      :style="{ backgroundColor: color.value }"
                      :title="color.name"
                     ></button>
                   </div>
                </div>
              </div>
            </div>

            <!-- Contact Details -->
            <div class="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 shadow-sm relative group hover:border-blue-300 transition-colors rounded-sm">
              <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
              
              <h3 class="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight mb-6 flex items-center gap-2">
                <i class="fas fa-address-book text-gray-400 text-xs"></i> Contact Details
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Email Address</label>
                  <div class="relative">
                    <span class="absolute left-3 top-2.5 text-gray-400 text-xs"><i class="fas fa-envelope"></i></span>
                    <input v-model="editForm.email" type="email" :disabled="!isOwner" class="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-sm pl-9 pr-4 py-2 font-mono text-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:cursor-not-allowed" />
                  </div>
                </div>
                <div>
                  <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Phone Number</label>
                  <div class="relative">
                    <span class="absolute left-3 top-2.5 text-gray-400 text-xs"><i class="fas fa-phone"></i></span>
                    <input v-model="editForm.phone" type="tel" :disabled="!isOwner" class="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-sm pl-9 pr-4 py-2 font-mono text-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:cursor-not-allowed" />
                  </div>
                </div>
                <div class="md:col-span-2">
                  <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Physical Address</label>
                  <div class="relative">
                     <span class="absolute left-3 top-2.5 text-gray-400 text-xs"><i class="fas fa-map-marker-alt"></i></span>
                    <input v-model="editForm.address" type="text" :disabled="!isOwner" class="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-sm pl-9 pr-4 py-2 font-mono text-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:cursor-not-allowed" />
                  </div>
                </div>
                <div class="md:col-span-2">
                  <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Website link</label>
                   <div class="relative">
                     <span class="absolute left-3 top-2.5 text-gray-400 text-xs"><i class="fas fa-globe"></i></span>
                    <input v-model="editForm.website" type="url" :disabled="!isOwner" class="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-sm pl-9 pr-4 py-2 font-mono text-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B] disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:cursor-not-allowed" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Social Media (Owner only) -->
            <div v-if="isOwner" class="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 shadow-sm relative group hover:border-blue-300 transition-colors rounded-sm">
               <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
               
               <h3 class="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight mb-6 flex items-center gap-2">
                <i class="fas fa-share-alt text-gray-400 text-xs"></i> Social Media
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div v-for="(platform, key) in socialPlatforms" :key="key" class="relative">
                    <span :class="[platform.icon, platform.color, 'absolute left-3 top-2.5 text-xs']"></span>
                    <input 
                      v-model="editForm[key]" 
                      type="text" 
                      :placeholder="platform.label" 
                      class="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-sm pl-9 pr-4 py-2 font-mono text-xs focus:ring-[#2F2E8B] focus:border-[#2F2E8B]" 
                    />
                 </div>
              </div>
            </div>

            <!-- File Uploads (Owner only) -->
            <div v-if="isOwner" class="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 shadow-sm relative group hover:border-blue-300 transition-colors rounded-sm">
               <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
               
               <h3 class="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight mb-6 flex items-center gap-2">
                <i class="fas fa-cloud-upload-alt text-gray-400 text-xs"></i> Assets & Files
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div>
                    <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-2">Profile Photo</label>
                    <div class="flex flex-col gap-3">
                      <div class="w-full aspect-square bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-sm flex items-center justify-center overflow-hidden">
                        <img v-if="editForm.profilePhotoUrl" :src="editForm.profilePhotoUrl" class="w-full h-full object-cover" />
                        <i v-else class="fas fa-user-circle text-4xl text-gray-300"></i>
                      </div>
                      <label class="cursor-pointer bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:border-[#2F2E8B] text-gray-600 dark:text-gray-300 text-[10px] font-bold py-1.5 px-3 rounded-sm text-center uppercase transition-colors">
                        Upload
                        <input type="file" accept="image/*" @change="handleProfilePhotoUpload" class="hidden" />
                      </label>
                    </div>
                 </div>
                 <div>
                    <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-2">Brand Logo</label>
                    <div class="flex flex-col gap-3">
                      <div class="w-full aspect-square bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-sm flex items-center justify-center overflow-hidden p-2">
                        <img v-if="editForm.logoUrl" :src="editForm.logoUrl" class="w-full h-full object-contain" />
                        <i v-else class="fas fa-image text-3xl text-gray-300"></i>
                      </div>
                      <label class="cursor-pointer bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:border-[#2F2E8B] text-gray-600 dark:text-gray-300 text-[10px] font-bold py-1.5 px-3 rounded-sm text-center uppercase transition-colors">
                        Upload
                        <input type="file" accept="image/*" @change="handleLogoUpload" class="hidden" />
                      </label>
                    </div>
                 </div>
                 <div>
                    <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-2">Curriculum Vitae</label>
                     <div class="flex flex-col gap-3 h-full">
                        <div class="flex-1 bg-gray-50 dark:bg-gray-700 border border-dashed border-gray-200 dark:border-gray-600 rounded-sm flex flex-col items-center justify-center p-4 text-center">
                           <i class="fas fa-file-pdf text-2xl text-gray-300 mb-2"></i>
                           <span class="text-[9px] text-gray-400">PDF Format Only</span>
                        </div>
                        <div class="flex flex-col gap-2">
                          <label class="cursor-pointer bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:border-[#2F2E8B] text-gray-600 dark:text-gray-300 text-[10px] font-bold py-1.5 px-3 rounded-sm text-center uppercase transition-colors">
                            Select File
                            <input type="file" accept="application/pdf" @change="handleCVUpload" class="hidden" />
                          </label>
                          <a v-if="editForm.cvUrl" :href="editForm.cvUrl" target="_blank" class="text-[10px] text-[#2F2E8B] hover:underline flex items-center justify-center gap-1 font-mono font-bold">
                            View File <i class="fas fa-external-link-alt"></i>
                          </a>
                        </div>
                     </div>
                 </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Preview & QR -->
          <div class="lg:col-span-1 space-y-6">
            <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm rounded-sm overflow-hidden sticky top-24">
              <div class="bg-gray-50 dark:bg-gray-900 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h4 class="font-black text-gray-900 dark:text-white uppercase tracking-tight text-xs flex items-center gap-2">
                  <i class="fas fa-eye text-gray-400"></i> Preview
                </h4>
                <span class="text-[9px] font-mono font-bold text-green-600 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-sm uppercase border border-green-100 dark:border-green-800 cursor-default animate-pulse">Auto-Sync</span>
              </div>
              
              <div class="p-6 flex flex-col items-center gap-6 bg-gray-50/30 dark:bg-gray-900/30">
                
                <!-- Business Card Component -->
                <div 
                  class="w-full aspect-[1.75/1] rounded-sm shadow-xl relative overflow-hidden business-card p-5 transition-all duration-300"
                  :class="{
                    'bg-white text-gray-800': editForm.templateId === 'classic',
                    'bg-gray-900 text-white': editForm.templateId === 'elegant',
                    'text-white': editForm.templateId === 'modern'
                  }"
                  :style="editForm.templateId === 'modern' ? { backgroundColor: editForm.cardColor || '#4B5EAA' } : {}"
                >
                   <div v-if="editForm.templateId !== 'classic'" class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                   
                   <!-- MODERN -->
                   <div v-if="editForm.templateId === 'modern'" class="flex justify-between h-full relative z-10 text-white">
                     <div class="flex flex-col justify-between items-start h-full">
                        <div v-if="editForm.profilePhotoUrl" class="w-12 h-12 rounded-full overflow-hidden mb-2 shadow-sm flex-shrink-0 bg-white/10 backdrop-blur-sm border border-white/20">
                          <img :src="editForm.profilePhotoUrl" class="w-full h-full object-cover" />
                        </div>
                        <div class="drop-shadow-sm space-y-2">
                           <div>
                             <h3 class="font-bold text-lg leading-tight">{{ editForm.businessName || 'NAME' }}</h3>
                             <p class="text-[10px] opacity-90 font-mono font-bold tracking-wider uppercase">{{ editForm.jobTitle || 'TITLE' }}</p>
                             <p class="text-[9px] opacity-70">{{ editForm.companyName }}</p>
                           </div>
                           <div class="text-[8px] space-y-0.5 opacity-90 font-mono">
                             <div v-if="editForm.phone" class="flex items-center gap-1.5"><i class="fas fa-phone text-[6px]"></i> {{ editForm.phone }}</div>
                             <div v-if="editForm.email" class="flex items-center gap-1.5"><i class="fas fa-envelope text-[6px]"></i> {{ editForm.email }}</div>
                             <div v-if="editForm.website" class="flex items-center gap-1.5"><i class="fas fa-globe text-[6px]"></i> {{ editForm.website }}</div>
                           </div>
                        </div>
                     </div>
                     <div class="flex flex-col items-end justify-between h-full">
                        <div v-if="qrUrl" class="bg-white p-0.5 rounded-sm shadow-sm"><img :src="qrUrl" class="w-10 h-10" /></div>
                        <div v-if="editForm.logoUrl" class="w-8 h-8 flex items-center justify-center"><img :src="editForm.logoUrl" class="w-full h-full object-contain filter drop-shadow-sm" /></div>
                     </div>
                   </div>

                   <!-- CLASSIC -->
                   <div v-else-if="editForm.templateId === 'classic'" class="flex flex-col justify-between h-full relative z-10 text-gray-800 p-1">
                      <div class="flex justify-between items-start">
                         <div class="h-6 flex items-center"><img v-if="editForm.logoUrl" :src="editForm.logoUrl" class="h-full w-auto object-contain max-w-[80px]" /></div>
                         <div v-if="qrUrl" class="bg-white p-0.5 border border-gray-100"><img :src="qrUrl" class="w-12 h-12" /></div>
                      </div>
                      <div class="flex items-center gap-3 mt-1 mb-auto">
                         <div v-if="editForm.profilePhotoUrl" class="w-14 h-14 rounded-full overflow-hidden border-[2px] flex-shrink-0 p-0.5 bg-white shadow-sm" :style="{ borderColor: editForm.cardColor || '#4B5EAA' }">
                            <img :src="editForm.profilePhotoUrl" class="w-full h-full object-cover rounded-full" />
                         </div>
                         <div>
                            <h3 class="font-bold text-lg leading-none text-gray-900">{{ editForm.businessName || 'NAME' }}</h3>
                            <p class="text-[9px] font-bold font-mono uppercase tracking-wider mt-1" :style="{ color: editForm.cardColor || '#4B5EAA' }">{{ editForm.jobTitle || 'TITLE' }}</p>
                            <p class="text-[8px] text-gray-500 leading-tight uppercase tracking-wide mt-0.5">{{ editForm.companyName }}</p>
                         </div>
                      </div>
                      <div class="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[7px] text-gray-600 border-t pt-2 font-mono" :style="{ borderColor: (editForm.cardColor || '#4B5EAA') + '40' }">
                         <div v-if="editForm.phone" class="flex items-center gap-1.5 truncate"><i class="fas fa-phone" :style="{ color: editForm.cardColor || '#4B5EAA' }"></i> {{ editForm.phone }}</div>
                         <div v-if="editForm.email" class="flex items-center gap-1.5 truncate"><i class="fas fa-envelope" :style="{ color: editForm.cardColor || '#4B5EAA' }"></i> {{ editForm.email }}</div>
                         <div v-if="editForm.website" class="col-span-2 flex items-center gap-1.5 truncate"><i class="fas fa-globe" :style="{ color: editForm.cardColor || '#4B5EAA' }"></i> {{ editForm.website }}</div>
                      </div>
                   </div>

                   <!-- ELEGANT -->
                   <div v-else-if="editForm.templateId === 'elegant'" class="flex flex-col h-full relative z-10 text-center items-center justify-center p-2">
                      <div class="absolute top-0 inset-x-8 h-[1px]" :style="{ background: `linear-gradient(90deg, transparent, ${editForm.cardColor || '#d4af37'}, transparent)` }"></div>
                      <div class="absolute bottom-0 inset-x-8 h-[1px]" :style="{ background: `linear-gradient(90deg, transparent, ${editForm.cardColor || '#d4af37'}, transparent)` }"></div>
                      <div class="flex flex-col items-center w-full max-w-[90%]">
                         <div class="flex items-center justify-center gap-4 mb-2 w-full">
                            <div v-if="qrUrl" class="w-10 h-10 bg-white/5 p-0.5 rounded-sm opacity-60 border border-white/10"><img :src="qrUrl" class="w-full h-full" /></div>
                            <div v-if="editForm.profilePhotoUrl" class="w-14 h-14 rounded-full overflow-hidden border border-white/20 shadow-2xl relative z-10 p-0.5 bg-black/40"><img :src="editForm.profilePhotoUrl" class="w-full h-full object-cover rounded-full" /></div>
                            <div v-if="editForm.logoUrl" class="w-8 h-8 opacity-70 flex items-center justify-center"><img :src="editForm.logoUrl" class="max-w-full max-h-full object-contain grayscale invert" /></div>
                            <div v-else class="w-8"></div>
                         </div>
                         <h3 class="font-serif text-xl font-bold bg-clip-text text-transparent mb-0.5" :style="{ backgroundImage: `linear-gradient(to right, #fff, ${editForm.cardColor || '#d4af37'}, #fff)` }">{{ editForm.businessName || 'NAME' }}</h3>
                         <p class="text-[8px] uppercase tracking-[0.25em] font-light mb-0.5 opacity-80" :style="{ color: editForm.cardColor || '#d4af37' }">{{ editForm.jobTitle || 'TITLE' }}</p>
                         <div class="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[7px] text-gray-400 font-light mt-2 border-t border-white/5 pt-1.5 w-full font-mono">
                            <span v-if="editForm.phone">{{ editForm.phone }}</span>
                            <span v-if="editForm.email">{{ editForm.email }}</span>
                         </div>
                      </div>
                   </div>
                </div>
                 
                <div class="flex items-center gap-2 mt-4 w-full">
                   <button @click="downloadVCard" class="flex-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-[#2F2E8B] hover:text-[#2F2E8B] text-gray-600 dark:text-gray-300 text-[10px] font-bold font-mono uppercase tracking-wider py-2 rounded-sm flex items-center justify-center gap-1 transition-all">
                    <i class="fas fa-address-card"></i> Export_vCard
                  </button>
                  <button @click="downloadBusinessCard" class="flex-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-[#2F2E8B] hover:text-[#2F2E8B] text-gray-600 dark:text-gray-300 text-[10px] font-bold font-mono uppercase tracking-wider py-2 rounded-sm flex items-center justify-center gap-1 transition-all">
                    <i class="fas fa-image"></i> Export_PNG
                  </button>
                </div>

                <div class="w-full h-px bg-gray-200 dark:bg-gray-700 my-2"></div>

                <div class="text-center w-full">
                  <div class="bg-white dark:bg-gray-700 border-2 border-gray-100 dark:border-gray-600 rounded-sm p-3 inline-block shadow-sm mb-3">
                     <img v-if="qrUrl" :src="qrUrl" alt="QR Code" class="w-32 h-32" />
                     <div v-else class="w-32 h-32 bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-300 text-[10px] font-mono animate-pulse uppercase">Generating...</div>
                  </div>
                  <p class="text-[10px] text-gray-400 font-mono uppercase">Scan To Save Contact</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ==================== TAB: My Modules ==================== -->
      <div v-if="activeTab === 'modules'" class="animate-fade-in-up">
        <div class="mb-6">
          <h2 class="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <i class="fas fa-cubes text-gray-400 text-xs"></i> Subscribed Modules
          </h2>
          <p class="text-[10px] font-mono text-gray-400 mt-1">Modules currently active on your account</p>
        </div>

        <div v-if="subscribedModules.length === 0" class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-sm p-12 text-center">
          <i class="fas fa-box-open text-4xl text-gray-300 mb-4"></i>
          <p class="text-sm font-mono text-gray-500">No modules subscribed yet</p>
          <p class="text-[10px] font-mono text-gray-400 mt-1">Contact your account owner to subscribe to modules</p>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            v-for="mod in subscribedModuleDetails" 
            :key="mod.id"
            class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-sm p-5 relative overflow-hidden group hover:border-[#2F2E8B] transition-colors"
          >
            <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
            <div class="relative z-10">
              <div class="flex items-center justify-between mb-3">
                <div class="w-10 h-10 rounded-sm bg-[#2F2E8B]/10 dark:bg-[#2F2E8B]/20 flex items-center justify-center">
                  <i :class="mod.icon || 'fas fa-cube'" class="text-[#2F2E8B] text-sm"></i>
                </div>
                <span class="text-[9px] font-mono font-bold px-2 py-0.5 rounded-sm uppercase"
                  :class="mod.included ? 'bg-green-50 dark:bg-green-900/30 text-green-600 border border-green-200 dark:border-green-800' : 'bg-blue-50 dark:bg-blue-900/30 text-[#2F2E8B] border border-blue-200 dark:border-blue-800'"
                >{{ mod.included ? 'Free' : 'Subscribed' }}</span>
              </div>
              <h4 class="text-sm font-bold text-gray-900 dark:text-white uppercase font-mono tracking-tight">{{ mod.name || mod.id }}</h4>
              <p v-if="mod.description" class="text-[10px] text-gray-500 mt-1 line-clamp-2">{{ mod.description }}</p>
              <div v-if="mod.price && !mod.included" class="mt-3 text-[10px] font-mono text-gray-400">
                <span class="text-[#2F2E8B] font-bold">K{{ mod.price }}</span>/month
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ==================== TAB: Employment Details ==================== -->
      <div v-if="activeTab === 'employment'" class="animate-fade-in-up">
        <div class="mb-6">
          <h2 class="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <i class="fas fa-id-badge text-gray-400 text-xs"></i> Employment Details
          </h2>
          <p class="text-[10px] font-mono text-gray-400 mt-1">Your HR and employment information</p>
        </div>

        <div v-if="!employment" class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-sm p-12 text-center">
          <i class="fas fa-user-tie text-4xl text-gray-300 mb-4"></i>
          <p class="text-sm font-mono text-gray-500">No employment record found</p>
          <p class="text-[10px] font-mono text-gray-400 mt-1">Your employer has not added your HR record yet</p>
        </div>

        <div v-else class="space-y-6">
          <!-- Personal & Role Info -->
          <div class="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 shadow-sm rounded-sm">
            <h3 class="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight mb-6 flex items-center gap-2">
              <i class="fas fa-user text-gray-400 text-xs"></i> Employee Information
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="field in employeeInfoFields" :key="field.key">
                <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">{{ field.label }}</label>
                <div class="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-sm px-3 py-2 font-mono text-sm text-gray-900 dark:text-white">
                  {{ formatEmployeeField(field.key, employment[field.key]) || '—' }}
                </div>
              </div>
            </div>
          </div>

          <!-- Compensation -->
          <div v-if="employment.basicPay || employment.hourly_rate" class="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 shadow-sm rounded-sm">
            <h3 class="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight mb-6 flex items-center gap-2">
              <i class="fas fa-money-bill-wave text-gray-400 text-xs"></i> Compensation
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div v-if="employment.basicPay">
                <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Basic Pay</label>
                <div class="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-sm px-3 py-2 font-mono text-sm font-bold text-[#2F2E8B]">K{{ Number(employment.basicPay).toLocaleString() }}</div>
              </div>
              <div v-if="employment.hourly_rate">
                <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Hourly Rate</label>
                <div class="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-sm px-3 py-2 font-mono text-sm font-bold text-[#2F2E8B]">K{{ Number(employment.hourly_rate).toLocaleString() }}</div>
              </div>
              <div v-if="employment.napsaNo">
                <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">NAPSA No.</label>
                <div class="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-sm px-3 py-2 font-mono text-sm text-gray-900 dark:text-white">{{ employment.napsaNo }}</div>
              </div>
              <div v-if="employment.nhimaNo">
                <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">NHIMA No.</label>
                <div class="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-sm px-3 py-2 font-mono text-sm text-gray-900 dark:text-white">{{ employment.nhimaNo }}</div>
              </div>
            </div>
          </div>

          <!-- Skills & Qualifications -->
          <div v-if="employment.skills?.length || employment.qualifications?.length || employment.certifications?.length" class="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 shadow-sm rounded-sm">
            <h3 class="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight mb-6 flex items-center gap-2">
              <i class="fas fa-award text-gray-400 text-xs"></i> Skills & Qualifications
            </h3>
            <div class="space-y-4">
              <div v-if="employment.skills?.length">
                <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-2">Skills</label>
                <div class="flex flex-wrap gap-2">
                  <span v-for="skill in employment.skills" :key="skill" class="bg-[#2F2E8B]/10 text-[#2F2E8B] text-[10px] font-mono font-bold px-2 py-1 rounded-sm">{{ skill }}</span>
                </div>
              </div>
              <div v-if="employment.qualifications?.length">
                <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-2">Qualifications</label>
                <div class="flex flex-wrap gap-2">
                  <span v-for="q in employment.qualifications" :key="q" class="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-mono font-bold px-2 py-1 rounded-sm">{{ q }}</span>
                </div>
              </div>
              <div v-if="employment.certifications?.length">
                <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-2">Certifications</label>
                <div class="flex flex-wrap gap-2">
                  <span v-for="c in employment.certifications" :key="c" class="bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[10px] font-mono font-bold px-2 py-1 rounded-sm">{{ c }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ==================== TAB: Security (Password) ==================== -->
      <div v-if="activeTab === 'security'" class="animate-fade-in-up">
        <div class="max-w-lg">
          <div class="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 shadow-sm rounded-sm">
            <h3 class="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight mb-6 flex items-center gap-2">
              <i class="fas fa-lock text-gray-400 text-xs"></i> Change Password
            </h3>

            <div class="space-y-4">
              <div>
                <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Current Password</label>
                <div class="relative">
                  <span class="absolute left-3 top-2.5 text-gray-400 text-xs"><i class="fas fa-key"></i></span>
                  <input v-model="passwordForm.currentPassword" :type="showCurrentPassword ? 'text' : 'password'" class="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-sm pl-9 pr-10 py-2 font-mono text-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B]" placeholder="Enter current password" />
                  <button @click="showCurrentPassword = !showCurrentPassword" type="button" class="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                    <i :class="showCurrentPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="text-xs"></i>
                  </button>
                </div>
              </div>
              <div>
                <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">New Password</label>
                <div class="relative">
                  <span class="absolute left-3 top-2.5 text-gray-400 text-xs"><i class="fas fa-lock"></i></span>
                  <input v-model="passwordForm.newPassword" :type="showNewPassword ? 'text' : 'password'" class="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-sm pl-9 pr-10 py-2 font-mono text-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B]" placeholder="Enter new password (min 6 chars)" />
                  <button @click="showNewPassword = !showNewPassword" type="button" class="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                    <i :class="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="text-xs"></i>
                  </button>
                </div>
              </div>
              <div>
                <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Confirm New Password</label>
                <div class="relative">
                  <span class="absolute left-3 top-2.5 text-gray-400 text-xs"><i class="fas fa-lock"></i></span>
                  <input v-model="passwordForm.confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" class="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-sm pl-9 pr-10 py-2 font-mono text-sm focus:ring-[#2F2E8B] focus:border-[#2F2E8B]" placeholder="Confirm new password" />
                  <button @click="showConfirmPassword = !showConfirmPassword" type="button" class="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                    <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="text-xs"></i>
                  </button>
                </div>
              </div>

              <div v-if="passwordMessage" class="text-xs font-mono font-bold px-3 py-2 rounded-sm" :class="passwordError ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-600 border border-green-200'">
                <i :class="passwordError ? 'fas fa-exclamation-circle' : 'fas fa-check-circle'" class="mr-1"></i>
                {{ passwordMessage }}
              </div>

              <button @click="changePassword" :disabled="passwordLoading" class="bg-[#2F2E8B] hover:bg-[#1D226B] text-white px-5 py-2 rounded-sm text-xs font-bold font-mono uppercase shadow-md transition-all flex items-center gap-2 disabled:opacity-50">
                <i class="fas fa-key"></i>
                {{ passwordLoading ? 'Updating...' : 'Update Password' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ==================== TAB: Company Documents (Owner Only) ==================== -->
      <div v-if="activeTab === 'documents'" class="animate-fade-in-up">
        <div class="mb-6">
          <h2 class="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <i class="fas fa-file-contract text-gray-400 text-xs"></i> Company Documents
          </h2>
          <p class="text-[10px] font-mono text-gray-400 mt-1">Upload regulatory and compliance documents (PDF, DOC, PNG, JPG — max 15MB)</p>
        </div>

        <div class="space-y-5">
          <div v-for="docType in companyDocTypes" :key="docType.key" class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-sm p-5 shadow-sm">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-sm bg-[#2F2E8B]/10 flex items-center justify-center">
                  <i :class="docType.icon" class="text-[#2F2E8B] text-xs"></i>
                </div>
                <div>
                  <span class="text-xs font-bold font-mono text-gray-700 dark:text-gray-200 uppercase">{{ docType.label }}</span>
                  <span class="text-[9px] font-mono text-gray-400 ml-2">({{ getDocsForType(docType.key).length }} file{{ getDocsForType(docType.key).length !== 1 ? 's' : '' }})</span>
                </div>
              </div>
              <label class="cursor-pointer bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:border-[#2F2E8B] text-gray-600 dark:text-gray-300 text-[10px] font-bold py-1.5 px-3 rounded-sm uppercase transition-colors flex items-center gap-1">
                <i class="fas fa-upload"></i> Upload
                <input type="file" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" @change="handleCompanyDocUpload($event, docType.key)" class="hidden" />
              </label>
            </div>
            
            <div v-if="getDocsForType(docType.key).length" class="space-y-2">
              <div v-for="doc in getDocsForType(docType.key)" :key="doc.id" class="flex items-center justify-between bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-sm px-3 py-2">
                <div class="flex items-center gap-2 overflow-hidden">
                  <i class="fas fa-file text-gray-400 text-xs flex-shrink-0"></i>
                  <span class="text-[10px] font-mono text-gray-700 dark:text-gray-300 truncate">{{ doc.filename }}</span>
                  <span class="text-[9px] text-gray-400 font-mono flex-shrink-0">{{ doc.uploaded_at ? new Date(doc.uploaded_at).toLocaleDateString() : '' }}</span>
                </div>
                <div class="flex items-center gap-2 flex-shrink-0">
                  <a :href="`${API_BASE_URL}${doc.file_url}`" target="_blank" class="text-[#2F2E8B] hover:text-[#1D226B] text-xs" title="View/Download"><i class="fas fa-external-link-alt"></i></a>
                  <button @click="deleteCompanyDoc(doc.id)" class="text-gray-300 hover:text-red-600 text-xs transition-colors" title="Delete"><i class="fas fa-trash-alt"></i></button>
                </div>
              </div>
            </div>
            <div v-else class="text-[10px] font-mono text-gray-400 italic">No files uploaded</div>
          </div>
        </div>

        <div v-if="docUploadLoading" class="mt-4 flex items-center gap-2 text-[10px] font-mono text-[#2F2E8B]">
          <i class="fas fa-spinner fa-spin"></i> Uploading document...
        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { decodeJWT } from '@/api_services/decodeJWT';
import API_BASE_URL from '@/api_services/api';
import html2canvas from 'html2canvas';

const { getTenantId, getUserRole, getUserEmail, getUserName } = decodeJWT();

const authHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});
const authJsonHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json'
});

// ==================== TABS ====================
const activeTab = ref('profile');
const isOwner = computed(() => getUserRole() === 'owner');

const allTabs = [
  { id: 'profile', label: 'Profile & Cards', icon: 'fas fa-user' },
  { id: 'modules', label: 'My Modules', icon: 'fas fa-cubes' },
  { id: 'employment', label: 'Employment', icon: 'fas fa-id-badge' },
  { id: 'security', label: 'Security', icon: 'fas fa-lock' },
  { id: 'documents', label: 'Company Docs', icon: 'fas fa-file-contract', ownerOnly: true },
];

const visibleTabs = computed(() => {
  return allTabs.filter(t => !t.ownerOnly || isOwner.value).map(t => ({
    ...t,
    badge: t.id === 'modules' ? subscribedModules.value.length || null : null
  }));
});

// ==================== STATE ====================
const loading = ref(false);
const mainProfile = ref({});
const businessCards = ref([]);
const selectedCardId = ref(null);
const myAccount = ref({});
const subscribedModules = ref([]);
const allModules = ref([]);
const employment = ref(null);

// Password visibility state
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

const editForm = ref({
  businessName: '',
  email: '',
  address: '',
  phone: '',
  cvUrl: '',
  logoUrl: '',
  profilePhotoUrl: '',
  cardColor: '#4B5EAA',
  jobTitle: '',
  companyName: '',
  facebook: '',
  linkedin: '',
  instagram: '',
  tiktok: '',
  youtube: '',
  twitter: '',
  whatsapp: '',
  website: '',
  cardName: '',
  templateId: 'modern'
});

const qrUrl = ref('');

// ==================== CONSTANTS ====================
const cardTemplates = [
  { id: 'modern', name: 'Modern Clean', icon: 'fas fa-id-card' },
  { id: 'classic', name: 'Classic Pro', icon: 'fas fa-address-card' },
  { id: 'elegant', name: 'Dark Elegant', icon: 'fas fa-award' },
];

const themeColors = [
  { name: 'Professional Indigo', value: '#4B5EAA' },
  { name: 'Classic White', value: '#FFFFFF' },
  { name: 'Nature Green', value: '#2E7D32' },
  { name: 'Corporate Red', value: '#B71C1C' },
  { name: 'Ocean Blue', value: '#1E88E5' },
  { name: 'Earth Brown', value: '#6D4C41' },
  { name: 'Royal Purple', value: '#7B1FA2' },
  { name: 'Vibrant Orange', value: '#E65100' },
  { name: 'Modern Black', value: '#424242' },
  { name: 'Teal Professional', value: '#00695C' }
];

const socialPlatforms = {
  facebook: { label: 'Facebook', icon: 'fab fa-facebook', color: 'text-blue-600' },
  linkedin: { label: 'LinkedIn', icon: 'fab fa-linkedin', color: 'text-blue-700' },
  instagram: { label: 'Instagram', icon: 'fab fa-instagram', color: 'text-pink-600' },
  twitter: { label: 'Twitter / X', icon: 'fab fa-x-twitter', color: 'text-black' },
  whatsapp: { label: 'WhatsApp', icon: 'fab fa-whatsapp', color: 'text-green-500' },
  youtube: { label: 'YouTube', icon: 'fab fa-youtube', color: 'text-red-600' },
  tiktok: { label: 'TikTok', icon: 'fab fa-tiktok', color: 'text-black' }
};

const moduleIconMap = {
  'pos': 'fas fa-cash-register',
  'inventory': 'fas fa-boxes',
  'supplier': 'fas fa-truck',
  'finance-dashboard': 'fas fa-chart-line',
  'reports': 'fas fa-file-alt',
  'crm': 'fas fa-users',
  'hr': 'fas fa-user-tie',
  'copilot': 'fas fa-robot',
  'image-capture': 'fas fa-camera',
  'strategic-management': 'fas fa-chess-king',
  'taxes': 'fas fa-calculator',
  'invoicing': 'fas fa-file-invoice',
  'assets': 'fas fa-building',
  'hotel': 'fas fa-hotel',
  'microfinance': 'fas fa-piggy-bank',
  'education': 'fas fa-graduation-cap',
};

// Employment detail fields
const employeeInfoFields = [
  { key: 'empNo', label: 'Employee No.' },
  { key: 'name', label: 'Full Name' },
  { key: 'email', label: 'Email' },
  { key: 'nrc', label: 'NRC' },
  { key: 'tpin', label: 'TPIN' },
  { key: 'department', label: 'Department' },
  { key: 'designation', label: 'Designation' },
  { key: 'status', label: 'Status' },
  { key: 'appointmentDate', label: 'Appointment Date' },
  { key: 'nextAppraisalDate', label: 'Next Appraisal' },
];

const formatEmployeeField = (key, value) => {
  if (!value) return '';
  if (key === 'appointmentDate' || key === 'nextAppraisalDate') {
    try { return new Date(value).toLocaleDateString(); } catch { return value; }
  }
  return value;
};

// ==================== MODULES COMPUTED ====================
const subscribedModuleDetails = computed(() => {
  return subscribedModules.value.map(modId => {
    const found = allModules.value.find(m => m.id === modId);
    return {
      id: modId,
      name: found?.name || modId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      description: found?.description || '',
      price: found?.price || 0,
      included: found?.included || false,
      icon: moduleIconMap[modId] || 'fas fa-cube',
    };
  });
});

// ==================== PROFILE METHODS ====================

const getEmptyProfile = () => ({
  businessName: '',
  email: '',
  address: '',
  phone: '',
  cvUrl: '',
  logoUrl: '',
  profilePhotoUrl: '',
  cardColor: '#4B5EAA',
  jobTitle: '',
  companyName: '',
  facebook: '',
  linkedin: '',
  instagram: '',
  tiktok: '',
  youtube: '',
  twitter: '',
  whatsapp: '',
  website: '',
  cardName: 'New Business Card',
  templateId: 'modern'
});

const fetchProfile = async () => {
  loading.value = true;
  try {
    const response = await fetch(`${API_BASE_URL}/profile?tenant_id=${getTenantId()}`, {
      headers: authHeaders()
    });
    if (response.ok) {
      const data = await response.json();
      mainProfile.value = { ...data };
      if (selectedCardId.value === null) {
        editForm.value = JSON.parse(JSON.stringify(mainProfile.value));
        if (!editForm.value.cardColor) editForm.value.cardColor = '#4B5EAA';
      }
    }
  } catch (err) {
    console.error('Error fetching profile:', err);
  } finally {
    loading.value = false;
  }
};

const fetchMyProfile = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/profile/me`, {
      headers: authHeaders()
    });
    if (res.ok) {
      const data = await res.json();
      myAccount.value = data.account || {};
      subscribedModules.value = data.subscribed_modules || [];
      employment.value = data.employment || null;
    }
  } catch (err) {
    console.error('Error fetching my profile:', err);
  }
};

const fetchAllModules = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/modules-manager/available`, {
      headers: authHeaders()
    });
    if (res.ok) {
      const data = await res.json();
      allModules.value = data.modules || [];
    }
  } catch (err) {
    console.error('Error fetching modules:', err);
  }
};

const fetchBusinessCards = async () => {
  try {
     const response = await fetch(`${API_BASE_URL}/business-cards?tenant_id=${getTenantId()}`, {
       headers: authHeaders()
     });
     if (response.ok) {
       businessCards.value = await response.json();
     }
  } catch(err) {
    console.error('Error fetching business cards:', err);
  }
};

const selectCard = (card) => {
  if (!card) {
    selectedCardId.value = null;
    editForm.value = JSON.parse(JSON.stringify(mainProfile.value));
    if (!editForm.value.cardColor) editForm.value.cardColor = '#4B5EAA';
  } else {
    selectedCardId.value = card.id;
    editForm.value = JSON.parse(JSON.stringify(card));
  }
};

const createNewCard = () => {
  const newCard = getEmptyProfile();
  newCard.id = 'new';
  selectedCardId.value = 'new';
  editForm.value = newCard;
};

const importFromProfile = () => {
  const currentCardName = editForm.value.cardName;
  const currentId = editForm.value.id;
  const currentColor = editForm.value.cardColor;
  editForm.value = { 
    ...JSON.parse(JSON.stringify(mainProfile.value)),
    cardName: currentCardName,
    id: currentId,
    cardColor: currentColor
  };
};

const saveChanges = async () => {
  loading.value = true;
  try {
    if (selectedCardId.value === null) {
      const response = await fetch(`${API_BASE_URL}/profile/update`, {
        method: 'PUT',
        headers: authJsonHeaders(),
        body: JSON.stringify({ tenant_id: getTenantId(), ...editForm.value })
      });
      if (!response.ok) throw new Error('Failed to update profile');
      mainProfile.value = { ...editForm.value };
    } else {
      let response;
      if (selectedCardId.value === 'new') {
        response = await fetch(`${API_BASE_URL}/business-cards`, {
          method: 'POST',
          headers: authJsonHeaders(),
          body: JSON.stringify({ tenant_id: getTenantId(), ...editForm.value })
        });
      } else {
        response = await fetch(`${API_BASE_URL}/business-cards/${selectedCardId.value}`, {
          method: 'PUT',
          headers: authJsonHeaders(),
          body: JSON.stringify({ tenant_id: getTenantId(), ...editForm.value })
        });
      }
      if (!response.ok) throw new Error('Failed to save card');
      const savedCard = await response.json();
      if (selectedCardId.value === 'new') {
        selectedCardId.value = savedCard.id;
      }
      await fetchBusinessCards();
    }
    generateQRCode();
  } catch (err) {
    console.error('Error updating:', err);
    alert('Failed to save changes');
  } finally {
    loading.value = false;
  }
};

const deleteCard = async (cardId) => {
  if (!confirm('Are you sure you want to delete this business card?')) return;
  try {
    const response = await fetch(`${API_BASE_URL}/business-cards/${cardId}?tenant_id=${getTenantId()}`, {
      method: 'DELETE',
      headers: authHeaders()
    });
    if (response.ok) {
       await fetchBusinessCards();
       if (selectedCardId.value === cardId) selectCard(null);
    }
  } catch(err) {
    console.error('Error deleting card:', err);
  }
};

const handleFileUpload = async (endpoint, formData, key) => {
  try {
    const res = await fetch(`${API_BASE_URL}/profile/${endpoint}`, {
      method: 'POST',
      headers: authHeaders(),
      body: formData
    });
    if (res.ok) {
      const data = await res.json();
      editForm.value[key] = `${API_BASE_URL}${data[key]}`;
    }
  } catch (err) {
    console.error(`Error uploading ${key}:`, err);
  }
};

const handleProfilePhotoUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const fd = new FormData();
  fd.append('profile_photo', file);
  fd.append('tenant_id', getTenantId());
  handleFileUpload('upload-profile-photo', fd, 'profilePhotoUrl');
};

const handleLogoUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const fd = new FormData();
  fd.append('logo', file);
  fd.append('tenant_id', getTenantId());
  handleFileUpload('upload-logo', fd, 'logoUrl');
};

const handleCVUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const fd = new FormData();
  fd.append('cv', file);
  fd.append('tenant_id', getTenantId());
  handleFileUpload('upload-cv', fd, 'cvUrl');
};

const generateQRCode = () => {
  const vCardData = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${editForm.value.businessName || 'Business Contact'}`,
    editForm.value.jobTitle ? `TITLE:${editForm.value.jobTitle}` : '',
    editForm.value.companyName ? `ORG:${editForm.value.companyName}` : '',
    editForm.value.email ? `EMAIL:${editForm.value.email}` : '',
    editForm.value.phone ? `TEL;TYPE=cell:${editForm.value.phone}` : '',
    editForm.value.address ? `ADR;TYPE=work:${editForm.value.address}` : '',
    editForm.value.website ? `URL:${editForm.value.website}` : '',
    'END:VCARD'
  ].filter(Boolean).join('\n');
  qrUrl.value = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(vCardData)}`;
};

const downloadVCard = () => {
  const vCardData = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${editForm.value.businessName || 'Contact'}`,
    `TITLE:${editForm.value.jobTitle || ''}`,
    `ORG:${editForm.value.companyName || ''}`,
    `EMAIL:${editForm.value.email || ''}`,
    `TEL:${editForm.value.phone || ''}`,
    `URL:${editForm.value.website || ''}`,
    'END:VCARD'
  ].join('\n');
  const blob = new Blob([vCardData], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${editForm.value.businessName || 'contact'}.vcf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const downloadBusinessCard = async () => {
  const cardElement = document.querySelector('.business-card');
  if (!cardElement) return;
  try {
    const canvas = await html2canvas(cardElement, { scale: 3, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = imgData;
    a.download = `${editForm.value.businessName || 'business_card'}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (err) {
    console.error('Error generating card image:', err);
  }
};

// ==================== PASSWORD CHANGE ====================
const passwordForm = ref({ currentPassword: '', newPassword: '', confirmPassword: '' });
const passwordLoading = ref(false);
const passwordMessage = ref('');
const passwordError = ref(false);

const changePassword = async () => {
  passwordMessage.value = '';
  passwordError.value = false;
  
  if (!passwordForm.value.currentPassword || !passwordForm.value.newPassword) {
    passwordMessage.value = 'Please fill in all fields';
    passwordError.value = true;
    return;
  }
  if (passwordForm.value.newPassword.length < 6) {
    passwordMessage.value = 'New password must be at least 6 characters';
    passwordError.value = true;
    return;
  }
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    passwordMessage.value = 'Passwords do not match';
    passwordError.value = true;
    return;
  }
  
  passwordLoading.value = true;
  try {
    const res = await fetch(`${API_BASE_URL}/tenant-details/change-password?tenant_id=${getTenantId()}`, {
      method: 'PUT',
      headers: authJsonHeaders(),
      body: JSON.stringify({
        current_password: passwordForm.value.currentPassword,
        new_password: passwordForm.value.newPassword
      })
    });
    const data = await res.json();
    if (res.ok) {
      passwordMessage.value = 'Password updated successfully';
      passwordError.value = false;
      passwordForm.value = { currentPassword: '', newPassword: '', confirmPassword: '' };
    } else {
      passwordMessage.value = data.detail || 'Failed to change password';
      passwordError.value = true;
    }
  } catch (err) {
    passwordMessage.value = 'Error changing password';
    passwordError.value = true;
  } finally {
    passwordLoading.value = false;
  }
};

// ==================== COMPANY DOCUMENTS (Owner Only) ====================
const companyDocs = ref([]);
const docUploadLoading = ref(false);

const companyDocTypes = [
  { key: 'pacra', label: 'PACRA', icon: 'fas fa-building' },
  { key: 'zra', label: 'ZRA', icon: 'fas fa-file-invoice' },
  { key: 'nhima', label: 'NHIMA', icon: 'fas fa-heartbeat' },
  { key: 'napsa', label: 'NAPSA', icon: 'fas fa-piggy-bank' },
  { key: 'workers_compensation', label: 'Workers Compensation', icon: 'fas fa-hard-hat' },
  { key: 'other', label: 'Other Documents', icon: 'fas fa-folder-open' },
];

const fetchCompanyDocs = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/company-docs?tenant_id=${getTenantId()}`, {
      headers: authHeaders()
    });
    if (res.ok) {
      companyDocs.value = await res.json();
    }
  } catch (err) {
    console.error('Error fetching company docs:', err);
  }
};

const getDocsForType = (docType) => {
  return companyDocs.value.filter(d => d.doc_type === docType);
};

const handleCompanyDocUpload = async (e, docType) => {
  const file = e.target.files[0];
  if (!file) return;
  docUploadLoading.value = true;
  try {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('tenant_id', getTenantId());
    fd.append('doc_type', docType);
    fd.append('doc_label', file.name);
    const res = await fetch(`${API_BASE_URL}/company-docs/upload`, {
      method: 'POST',
      headers: authHeaders(),
      body: fd
    });
    if (res.ok) {
      await fetchCompanyDocs();
    } else {
      const err = await res.json();
      alert(err.detail || 'Upload failed');
    }
  } catch (err) {
    console.error('Error uploading company doc:', err);
  } finally {
    docUploadLoading.value = false;
    e.target.value = '';
  }
};

const deleteCompanyDoc = async (docId) => {
  if (!confirm('Delete this document?')) return;
  try {
    const res = await fetch(`${API_BASE_URL}/company-docs/${docId}?tenant_id=${getTenantId()}`, {
      method: 'DELETE',
      headers: authHeaders()
    });
    if (res.ok) {
      await fetchCompanyDocs();
    }
  } catch (err) {
    console.error('Error deleting company doc:', err);
  }
};

// ==================== LIFECYCLE ====================
onMounted(() => {
  fetchProfile();
  fetchMyProfile();
  fetchAllModules();
  if (isOwner.value) {
    fetchBusinessCards();
    fetchCompanyDocs();
  }
});

watch(
  () => editForm.value, 
  () => generateQRCode(),
  { deep: true }
);
</script>

<style scoped>
.business-card {
  transition: all 0.3s ease;
}
/* Ensure white text is legible on light backgrounds if user chooses white theme */
.business-card[style*="background-color: rgb(255, 255, 255)"],
.business-card[style*="background-color: #FFFFFF"],
.business-card[style*="background-color: #ffffff"] {
  color: #1f2937 !important; /* gray-800 */
}
.business-card[style*="background-color: rgb(255, 255, 255)"] .text-white,
.business-card[style*="background-color: #FFFFFF"] .text-white,
.business-card[style*="background-color: #ffffff"] .text-white {
  color: #374151 !important; /* gray-700 */
}
.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out forwards;
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>