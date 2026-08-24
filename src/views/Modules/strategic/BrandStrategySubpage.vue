<template>
  <div class="brand-strategy-subpage min-h-screen bg-[#F5F5F5] font-sans relative text-gray-900 overflow-x-hidden">
    <!-- Viewport Mesh Background (Fixed) -->
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <div class="max-w-[1920px] mx-auto p-4 md:p-6 relative z-10">

      <!-- Header -->
      <div class="bg-white/80 backdrop-blur-md border border-gray-200 p-6 mb-6 shadow-none relative overflow-hidden">
        <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
          <div class="flex items-center gap-4">
            <div class="w-2 h-12 bg-[#2F2E8B]"></div>
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">MODULE // BRAND_STRATEGY_ENGINE</span>
              </div>
              <h1 class="text-3xl font-black text-gray-900 uppercase tracking-tight font-outfit">Brand Strategy</h1>
              <p class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mt-1">IDENTITY // ARCHITECTURE // MARKET_POSITION</p>
            </div>
          </div>

          <div class="flex flex-wrap gap-3">
            <button
              @click="saveBrandStrategy"
              :disabled="isSaving"
              class="bg-[#2F2E8B] hover:bg-[#1D226B] text-white px-6 py-2 text-[10px] font-mono font-bold uppercase shadow-md transition-all flex items-center gap-2 rounded-none disabled:opacity-50"
            >
              <i :class="['fas', isSaving ? 'fa-spinner fa-spin' : 'fa-save']"></i>
              <span>{{ isSaving ? 'SAVING...' : 'SAVE_ALL' }}</span>
            </button>
            <button
              @click="showDocUpload = true"
              class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-[10px] font-mono font-bold uppercase shadow-md transition-all flex items-center gap-2 rounded-none"
            >
              <i class="fas fa-upload"></i>
              <span>UPLOAD_DOC</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Strategic Navigation -->
      <StrategicNavigation active-tab="brand" />

      <!-- Success/Error Banner -->
      <div v-if="statusMessage" :class="['border p-4 mb-6 text-[10px] font-mono font-black uppercase tracking-widest flex items-center gap-3', statusMessage.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700']">
        <i :class="['fas', statusMessage.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle']"></i>
        {{ statusMessage.text }}
        <button @click="statusMessage = null" class="ml-auto text-gray-400 hover:text-gray-600"><i class="fas fa-times"></i></button>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex items-center justify-center py-24">
        <div class="text-center">
          <div class="w-12 h-12 border-2 border-[#2F2E8B] border-t-transparent animate-spin mb-4 mx-auto"></div>
          <p class="text-[10px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest">LOADING_BRAND_DATA...</p>
        </div>
      </div>

      <div v-else>
        <!-- 01 - Brand Foundation -->
        <div class="bg-white border border-gray-200 p-8 shadow-none relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors mb-6">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SEC_01 // BRAND_FOUNDATION</div>

          <h2 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight mb-8 relative z-10 flex items-center gap-3">
            <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
            Brand Foundation
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <div>
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Mission Statement</label>
              <textarea v-model="brandData.brand_foundation.mission" rows="3" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="What is your brand's mission?"></textarea>
            </div>
            <div>
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Vision Statement</label>
              <textarea v-model="brandData.brand_foundation.vision" rows="3" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="What is your brand's vision?"></textarea>
            </div>
            <div>
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Core Values</label>
              <textarea v-model="brandData.brand_foundation.core_values" rows="3" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="List core values (e.g. Innovation, Integrity, Excellence)"></textarea>
            </div>
            <div>
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Brand Promise</label>
              <textarea v-model="brandData.brand_foundation.brand_promise" rows="3" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="What promise does your brand make?"></textarea>
            </div>
            <div class="md:col-span-2">
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Brand Story</label>
              <textarea v-model="brandData.brand_foundation.brand_story" rows="4" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="Tell your brand's origin story..."></textarea>
            </div>
            <div>
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Tagline / Slogan</label>
              <input v-model="brandData.brand_foundation.tagline" type="text" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="Your brand tagline">
            </div>
          </div>
        </div>

        <!-- 02 - Problem Statement -->
        <div class="bg-white border border-gray-200 p-8 shadow-none relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors mb-6">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SEC_02 // PROBLEM_STATEMENT</div>

          <h2 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight mb-8 relative z-10 flex items-center gap-3">
            <div class="w-1.5 h-6 bg-red-500"></div>
            Problem Statement
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <div class="md:col-span-2">
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">The Problem</label>
              <textarea v-model="brandData.problem_statement.problem" rows="3" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="What problem does your brand solve?"></textarea>
            </div>
            <div>
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Impact of the Problem</label>
              <textarea v-model="brandData.problem_statement.impact" rows="3" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="How does this problem affect your target audience?"></textarea>
            </div>
            <div>
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Current Solutions in Market</label>
              <textarea v-model="brandData.problem_statement.current_solutions" rows="3" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="What solutions currently exist?"></textarea>
            </div>
            <div>
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Our Solution</label>
              <textarea v-model="brandData.problem_statement.our_solution" rows="3" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="How does your brand solve this?"></textarea>
            </div>
            <div>
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Unique Value Proposition</label>
              <textarea v-model="brandData.problem_statement.unique_value" rows="3" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="What makes your solution unique?"></textarea>
            </div>
          </div>
        </div>

        <!-- 03 - Brand Architecture -->
        <div class="bg-white border border-gray-200 p-8 shadow-none relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors mb-6">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SEC_03 // BRAND_ARCHITECTURE</div>

          <h2 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight mb-8 relative z-10 flex items-center gap-3">
            <div class="w-1.5 h-6 bg-blue-600"></div>
            Brand Architecture
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <div>
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Brand Type</label>
              <select v-model="brandData.brand_architecture.brand_type" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30">
                <option value="">Select brand type...</option>
                <option value="Branded House">Branded House</option>
                <option value="House of Brands">House of Brands</option>
                <option value="Endorsed Brands">Endorsed Brands</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Parent Brand</label>
              <input v-model="brandData.brand_architecture.parent_brand" type="text" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="Parent brand name">
            </div>
            <div>
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Sub-Brands</label>
              <textarea v-model="brandData.brand_architecture.sub_brands" rows="3" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="List sub-brands (one per line)"></textarea>
            </div>
            <div>
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Brand Hierarchy</label>
              <textarea v-model="brandData.brand_architecture.brand_hierarchy" rows="3" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="Describe your brand hierarchy"></textarea>
            </div>
            <div class="md:col-span-2">
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Brand Relationships</label>
              <textarea v-model="brandData.brand_architecture.brand_relationships" rows="3" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="How do your brands relate to each other?"></textarea>
            </div>
          </div>
        </div>

        <!-- 04 - Product Strategy -->
        <div class="bg-white border border-gray-200 p-8 shadow-none relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors mb-6">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SEC_04 // PRODUCT_STRATEGY</div>

          <h2 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight mb-8 relative z-10 flex items-center gap-3">
            <div class="w-1.5 h-6 bg-amber-500"></div>
            Product Strategy
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <div>
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Product Lines</label>
              <textarea v-model="brandData.product_strategy.product_lines" rows="3" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="List your product lines"></textarea>
            </div>
            <div>
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Pricing Strategy</label>
              <textarea v-model="brandData.product_strategy.pricing_strategy" rows="3" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="Describe your pricing approach"></textarea>
            </div>
            <div>
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Distribution Channels</label>
              <textarea v-model="brandData.product_strategy.distribution_channels" rows="3" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="How do you distribute products?"></textarea>
            </div>
            <div>
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Competitive Advantage</label>
              <textarea v-model="brandData.product_strategy.competitive_advantage" rows="3" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="What's your competitive edge?"></textarea>
            </div>
            <div class="md:col-span-2">
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Product Lifecycle</label>
              <textarea v-model="brandData.product_strategy.product_lifecycle" rows="3" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="Describe your product lifecycle stages"></textarea>
            </div>
          </div>
        </div>

        <!-- 05 - Brand Personality -->
        <div class="bg-white border border-gray-200 p-8 shadow-none relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors mb-6">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SEC_05 // BRAND_PERSONALITY</div>

          <h2 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight mb-8 relative z-10 flex items-center gap-3">
            <div class="w-1.5 h-6 bg-purple-500"></div>
            Brand Personality
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <div>
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Personality Traits</label>
              <textarea v-model="brandData.brand_personality.personality_traits" rows="3" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="e.g. Bold, Innovative, Trustworthy, Friendly"></textarea>
            </div>
            <div>
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Tone of Voice</label>
              <textarea v-model="brandData.brand_personality.tone_of_voice" rows="3" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="How does your brand sound?"></textarea>
            </div>
            <div>
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Communication Style</label>
              <textarea v-model="brandData.brand_personality.communication_style" rows="3" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="Formal, casual, technical, etc."></textarea>
            </div>
            <div>
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Brand Archetypes</label>
              <select v-model="brandData.brand_personality.brand_archetypes" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30">
                <option value="">Select archetype...</option>
                <option value="The Hero">The Hero</option>
                <option value="The Creator">The Creator</option>
                <option value="The Sage">The Sage</option>
                <option value="The Explorer">The Explorer</option>
                <option value="The Ruler">The Ruler</option>
                <option value="The Magician">The Magician</option>
                <option value="The Lover">The Lover</option>
                <option value="The Caregiver">The Caregiver</option>
                <option value="The Jester">The Jester</option>
                <option value="The Everyman">The Everyman</option>
                <option value="The Rebel">The Rebel</option>
                <option value="The Innocent">The Innocent</option>
              </select>
            </div>
            <div class="md:col-span-2">
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Emotional Attributes</label>
              <textarea v-model="brandData.brand_personality.emotional_attributes" rows="3" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="What emotions should your brand evoke?"></textarea>
            </div>
          </div>
        </div>

        <!-- 06 - Brand Identity -->
        <div class="bg-white border border-gray-200 p-8 shadow-none relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors mb-6">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SEC_06 // BRAND_IDENTITY</div>

          <h2 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight mb-8 relative z-10 flex items-center gap-3">
            <div class="w-1.5 h-6 bg-pink-500"></div>
            Brand Identity
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <div>
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Logo Description</label>
              <textarea v-model="brandData.brand_identity.logo_description" rows="3" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="Describe your logo and its meaning"></textarea>
            </div>
            <div>
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Color Palette</label>
              <textarea v-model="brandData.brand_identity.color_palette" rows="3" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="Primary: #2F2E8B, Secondary: #... etc."></textarea>
            </div>
            <div>
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Typography</label>
              <textarea v-model="brandData.brand_identity.typography" rows="3" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="Heading: Outfit, Body: Inter, etc."></textarea>
            </div>
            <div>
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Visual Style</label>
              <textarea v-model="brandData.brand_identity.visual_style" rows="3" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="Minimalist, bold, playful, corporate..."></textarea>
            </div>
            <div class="md:col-span-2">
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Imagery Guidelines</label>
              <textarea v-model="brandData.brand_identity.imagery_guidelines" rows="3" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="Photography style, illustration guidelines, icon usage..."></textarea>
            </div>
          </div>
        </div>

        <!-- 07 - Brand Menu -->
        <div class="bg-white border border-gray-200 p-8 shadow-none relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors mb-6">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SEC_07 // BRAND_MENU</div>

          <h2 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight mb-8 relative z-10 flex items-center gap-3">
            <div class="w-1.5 h-6 bg-teal-500"></div>
            Brand Menu
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <div>
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Products & Services</label>
              <textarea v-model="brandData.brand_menu.products_services" rows="3" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="Complete list of products and services"></textarea>
            </div>
            <div>
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Flagship Offerings</label>
              <textarea v-model="brandData.brand_menu.flagship_offerings" rows="3" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="Key flagship products or services"></textarea>
            </div>
            <div>
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Service Categories</label>
              <textarea v-model="brandData.brand_menu.service_categories" rows="3" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="How are your services categorized?"></textarea>
            </div>
            <div>
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Pricing Tiers</label>
              <textarea v-model="brandData.brand_menu.pricing_tiers" rows="3" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="Basic, Pro, Enterprise, etc."></textarea>
            </div>
            <div class="md:col-span-2">
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Bundle Packages</label>
              <textarea v-model="brandData.brand_menu.bundle_packages" rows="3" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="Any bundled product/service packages?"></textarea>
            </div>
          </div>
        </div>

        <!-- 08 - Target Market -->
        <div class="bg-white border border-gray-200 p-8 shadow-none relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors mb-6">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SEC_08 // TARGET_MARKET</div>

          <h2 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight mb-8 relative z-10 flex items-center gap-3">
            <div class="w-1.5 h-6 bg-orange-500"></div>
            Target Market
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <div class="md:col-span-2">
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Primary Audience</label>
              <textarea v-model="brandData.target_market.primary_audience" rows="3" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="Who is your primary target audience?"></textarea>
            </div>
            <div>
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Demographics</label>
              <textarea v-model="brandData.target_market.demographics" rows="3" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="Age, gender, income, education, occupation..."></textarea>
            </div>
            <div>
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Psychographics</label>
              <textarea v-model="brandData.target_market.psychographics" rows="3" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="Interests, values, attitudes, lifestyle..."></textarea>
            </div>
            <div>
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Geographic Focus</label>
              <textarea v-model="brandData.target_market.geographic_focus" rows="3" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="Regions, countries, cities..."></textarea>
            </div>
            <div>
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Market Size</label>
              <textarea v-model="brandData.target_market.market_size" rows="3" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="TAM, SAM, SOM estimates..."></textarea>
            </div>
            <div class="md:col-span-2">
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Customer Personas</label>
              <textarea v-model="brandData.target_market.customer_personas" rows="4" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="Describe your ideal customer personas..."></textarea>
            </div>
          </div>
        </div>

        <!-- 09 - Brand Data & Analysis -->
        <div class="bg-white border border-gray-200 p-8 shadow-none relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors mb-6">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SEC_09 // BRAND_ANALYSIS</div>

          <h2 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight mb-8 relative z-10 flex items-center gap-3">
            <div class="w-1.5 h-6 bg-gray-900"></div>
            Brand Data & Analysis
          </h2>

          <div class="relative z-10">
            <!-- SWOT Grid -->
            <h3 class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest mb-4">SWOT Analysis</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div class="bg-emerald-50 border border-emerald-100 p-4">
                <label class="text-[10px] font-mono font-black text-emerald-600 uppercase tracking-widest block mb-2">Strengths</label>
                <textarea v-model="brandData.brand_analysis.swot_strengths" rows="3" class="w-full bg-white border border-emerald-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-emerald-300" placeholder="Internal strengths of the brand"></textarea>
              </div>
              <div class="bg-red-50 border border-red-100 p-4">
                <label class="text-[10px] font-mono font-black text-red-600 uppercase tracking-widest block mb-2">Weaknesses</label>
                <textarea v-model="brandData.brand_analysis.swot_weaknesses" rows="3" class="w-full bg-white border border-red-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-red-300" placeholder="Internal weaknesses to address"></textarea>
              </div>
              <div class="bg-blue-50 border border-blue-100 p-4">
                <label class="text-[10px] font-mono font-black text-blue-600 uppercase tracking-widest block mb-2">Opportunities</label>
                <textarea v-model="brandData.brand_analysis.swot_opportunities" rows="3" class="w-full bg-white border border-blue-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-blue-300" placeholder="External opportunities to leverage"></textarea>
              </div>
              <div class="bg-amber-50 border border-amber-100 p-4">
                <label class="text-[10px] font-mono font-black text-amber-600 uppercase tracking-widest block mb-2">Threats</label>
                <textarea v-model="brandData.brand_analysis.swot_threats" rows="3" class="w-full bg-white border border-amber-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-amber-300" placeholder="External threats to monitor"></textarea>
              </div>
            </div>

            <!-- Market & Digital -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Competitive Landscape</label>
                <textarea v-model="brandData.brand_analysis.competitive_landscape" rows="3" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="Key competitors and their positions"></textarea>
              </div>
              <div>
                <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Market Positioning</label>
                <textarea v-model="brandData.brand_analysis.market_positioning" rows="3" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="Where does your brand sit in the market?"></textarea>
              </div>
              <div>
                <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Brand Equity Score</label>
                <input v-model="brandData.brand_analysis.brand_equity_score" type="text" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="e.g. 78/100">
              </div>
              <div>
                <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Website URL</label>
                <input v-model="brandData.brand_analysis.website_url" type="url" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="https://yourbrand.com">
              </div>
              <div class="md:col-span-2">
                <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Social Media Links</label>
                <textarea v-model="brandData.brand_analysis.social_media_links" rows="2" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="Facebook, Instagram, LinkedIn, Twitter URLs (one per line)"></textarea>
              </div>
            </div>
          </div>
        </div>

        <!-- 10 - Brand Documents -->
        <div class="bg-white border border-gray-200 p-8 shadow-none relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors mb-6">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SEC_10 // BRAND_DOCUMENTS</div>

          <div class="flex items-center justify-between mb-8 relative z-10">
            <h2 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight flex items-center gap-3">
              <div class="w-1.5 h-6 bg-indigo-500"></div>
              Brand Documents
            </h2>
            <button
              @click="showDocUpload = true"
              class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-[10px] font-mono font-bold uppercase shadow-md transition-all flex items-center gap-2 rounded-none"
            >
              <i class="fas fa-plus"></i>
              <span>ADD_DOCUMENT</span>
            </button>
          </div>

          <div v-if="brandDocuments.length === 0" class="py-12 text-center bg-gray-50 border border-dashed border-gray-200 relative z-10">
            <i class="fas fa-file-alt text-gray-300 text-3xl mb-4"></i>
            <p class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">No documents uploaded yet. Upload brand guides, strategy docs, and marketing materials.</p>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
            <div v-for="doc in brandDocuments" :key="doc.id" class="p-6 bg-gray-50 border border-gray-100 hover:bg-white hover:border-[#2F2E8B]/20 transition-all group/doc">
              <div class="flex items-start justify-between mb-3">
                <div class="flex items-center gap-3">
                  <i :class="['text-xl', getDocIcon(doc.doc_type)]"></i>
                  <div>
                    <p class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-tight">{{ doc.name }}</p>
                    <p class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-1">{{ doc.doc_type.replace('_', ' ') }}</p>
                  </div>
                </div>
              </div>
              <p v-if="doc.description" class="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-tight mb-4">{{ doc.description }}</p>
              <div class="flex items-center justify-between pt-3 border-t border-gray-100">
                <span class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">{{ doc.file_name }}</span>
                <div class="flex gap-3">
                  <button @click="downloadDocument(doc)" class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest hover:underline">DOWNLOAD</button>
                  <button @click="deleteDocument(doc.id)" class="text-[9px] font-mono font-black text-red-500 uppercase tracking-widest hover:underline">DELETE</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Document Upload Modal -->
    <div v-if="showDocUpload" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showDocUpload = false"></div>
      <div class="bg-white border border-gray-200 w-full max-w-lg relative z-10 shadow-2xl p-8">
        <h2 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight mb-6">Upload Brand Document</h2>
        <div class="space-y-6">
          <div>
            <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Document Name</label>
            <input v-model="newDoc.name" type="text" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="e.g. Brand Guidelines 2025">
          </div>
          <div>
            <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Document Type</label>
            <select v-model="newDoc.doc_type" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30">
              <option value="brand_guide">Brand Guide</option>
              <option value="brand_strategy">Brand Strategy</option>
              <option value="marketing">Marketing Material</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Description</label>
            <textarea v-model="newDoc.description" rows="2" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="Brief description..."></textarea>
          </div>
          <div>
            <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">File</label>
            <input type="file" ref="fileInput" @change="handleFileSelect" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" accept=".pdf,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg,.svg">
          </div>
        </div>
        <div class="mt-8 flex justify-end gap-3">
          <button @click="showDocUpload = false" class="px-6 py-2 text-[10px] font-mono font-black text-gray-400 uppercase hover:text-gray-600">Cancel</button>
          <button @click="uploadDocument" :disabled="isUploading || !newDoc.name || !selectedFile" class="bg-[#2F2E8B] text-white px-8 py-2 text-[10px] font-mono font-black uppercase shadow-lg hover:bg-[#1D226B] transition-all disabled:opacity-50">
            {{ isUploading ? 'UPLOADING...' : 'UPLOAD_DOC' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import API_BASE_URL from '@/services/api.js'
import { decodeJWT } from '@/services/decodeJWT.js'
import StrategicNavigation from './components/StrategicNavigation.vue'

const router = useRouter()
const { getTenantId } = decodeJWT()
const tenantId = getTenantId()

const isLoading = ref(false)
const isSaving = ref(false)
const isUploading = ref(false)
const statusMessage = ref(null)
const showDocUpload = ref(false)
const selectedFile = ref(null)
const fileInput = ref(null)

const brandDocuments = ref([])

const newDoc = reactive({
  name: '',
  doc_type: 'brand_guide',
  description: ''
})

const getDefaultBrandData = () => ({
  brand_foundation: { mission: '', vision: '', core_values: '', brand_promise: '', brand_story: '', tagline: '' },
  problem_statement: { problem: '', impact: '', current_solutions: '', our_solution: '', unique_value: '' },
  brand_architecture: { brand_type: '', parent_brand: '', sub_brands: '', brand_hierarchy: '', brand_relationships: '' },
  product_strategy: { product_lines: '', pricing_strategy: '', distribution_channels: '', competitive_advantage: '', product_lifecycle: '' },
  brand_personality: { personality_traits: '', tone_of_voice: '', communication_style: '', brand_archetypes: '', emotional_attributes: '' },
  brand_identity: { logo_description: '', color_palette: '', typography: '', visual_style: '', imagery_guidelines: '' },
  brand_menu: { products_services: '', flagship_offerings: '', service_categories: '', pricing_tiers: '', bundle_packages: '' },
  target_market: { primary_audience: '', demographics: '', psychographics: '', geographic_focus: '', market_size: '', customer_personas: '' },
  brand_analysis: { swot_strengths: '', swot_weaknesses: '', swot_opportunities: '', swot_threats: '', competitive_landscape: '', market_positioning: '', brand_equity_score: '', website_url: '', social_media_links: '' }
})

const brandData = reactive(getDefaultBrandData())

const mergeData = (target, source) => {
  for (const key of Object.keys(target)) {
    if (source[key] && typeof target[key] === 'object' && typeof source[key] === 'object') {
      for (const subKey of Object.keys(target[key])) {
        if (source[key][subKey] !== undefined) {
          target[key][subKey] = source[key][subKey]
        }
      }
    }
  }
}

const fetchBrandData = async () => {
  isLoading.value = true
  try {
    const [strategyRes, docsRes] = await Promise.all([
      axios.get(`${API_BASE_URL}/strategy/brand?tenant_id=${tenantId}`),
      axios.get(`${API_BASE_URL}/strategy/brand/documents?tenant_id=${tenantId}`)
    ])
    if (strategyRes.data) {
      mergeData(brandData, strategyRes.data)
    }
    brandDocuments.value = docsRes.data || []
  } catch (error) {
    console.error('Error fetching brand data:', error)
  } finally {
    isLoading.value = false
  }
}

const saveBrandStrategy = async () => {
  isSaving.value = true
  statusMessage.value = null
  try {
    await axios.put(`${API_BASE_URL}/strategy/brand?tenant_id=${tenantId}`, {
      tenant_id: tenantId,
      ...brandData
    })
    statusMessage.value = { type: 'success', text: 'Brand strategy saved successfully.' }
    setTimeout(() => { statusMessage.value = null }, 4000)
  } catch (error) {
    console.error('Error saving brand strategy:', error)
    statusMessage.value = { type: 'error', text: 'Failed to save brand strategy. Please try again.' }
  } finally {
    isSaving.value = false
  }
}

const handleFileSelect = (event) => {
  selectedFile.value = event.target.files[0] || null
}

const uploadDocument = async () => {
  if (!newDoc.name || !selectedFile.value) return
  isUploading.value = true
  try {
    const formData = new FormData()
    formData.append('tenant_id', tenantId)
    formData.append('name', newDoc.name)
    formData.append('doc_type', newDoc.doc_type)
    formData.append('description', newDoc.description)
    formData.append('file', selectedFile.value)

    await axios.post(`${API_BASE_URL}/strategy/brand/documents`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    showDocUpload.value = false
    newDoc.name = ''
    newDoc.doc_type = 'brand_guide'
    newDoc.description = ''
    selectedFile.value = null
    statusMessage.value = { type: 'success', text: 'Document uploaded successfully.' }
    setTimeout(() => { statusMessage.value = null }, 4000)

    // Refresh docs
    const docsRes = await axios.get(`${API_BASE_URL}/strategy/brand/documents?tenant_id=${tenantId}`)
    brandDocuments.value = docsRes.data || []
  } catch (error) {
    console.error('Error uploading document:', error)
    statusMessage.value = { type: 'error', text: 'Failed to upload document. Max size 10MB.' }
  } finally {
    isUploading.value = false
  }
}

const downloadDocument = async (doc) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/strategy/brand/documents/${doc.id}/download?tenant_id=${tenantId}`)
    const byteCharacters = atob(res.data.file_data)
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray], { type: res.data.file_type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = res.data.file_name
    a.click()
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error downloading document:', error)
    statusMessage.value = { type: 'error', text: 'Failed to download document.' }
  }
}

const deleteDocument = async (docId) => {
  if (!confirm('Are you sure you want to delete this document?')) return
  try {
    await axios.delete(`${API_BASE_URL}/strategy/brand/documents/${docId}?tenant_id=${tenantId}`)
    brandDocuments.value = brandDocuments.value.filter(d => d.id !== docId)
    statusMessage.value = { type: 'success', text: 'Document deleted.' }
    setTimeout(() => { statusMessage.value = null }, 3000)
  } catch (error) {
    console.error('Error deleting document:', error)
    statusMessage.value = { type: 'error', text: 'Failed to delete document.' }
  }
}

const getDocIcon = (docType) => {
  const icons = {
    brand_guide: 'fas fa-book text-[#2F2E8B]',
    brand_strategy: 'fas fa-chess text-purple-500',
    marketing: 'fas fa-bullhorn text-emerald-500',
    other: 'fas fa-file-alt text-gray-400'
  }
  return icons[docType] || icons.other
}

onMounted(() => {
  fetchBrandData()
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
