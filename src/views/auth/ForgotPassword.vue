<template>
  <div class="min-h-screen flex flex-col lg:flex-row bg-white font-sans overflow-hidden">
    
    <!-- Left: Recovery Form -->
    <div class="flex flex-col justify-center items-center w-full lg:w-5/12 relative z-10 bg-white border-r border-gray-200">
       <!-- Background Grid for Left Side -->
       <div class="absolute inset-0 pointer-events-none opacity-[0.03]" style="background-image: radial-gradient(#2F2E8B 1px, transparent 1px); background-size: 24px 24px;"></div>

      <div class="w-full max-w-md mx-auto px-6 py-8">
        
        <!-- Header -->
        <div class="text-center mb-10">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 text-[#2F2E8B] text-xs font-mono mb-6 rounded-sm">
             <i class="fas fa-key-skeleton"></i>
             <span>// RECOVERY_PROTOCOL_V1.4</span>
          </div>

          <router-link to="/" class="block mb-6 group">
            <img src="/logo_red.png" alt="ABSA Intelligence Unit" class="h-12 mx-auto object-contain transition-transform group-hover:scale-105" />
          </router-link>
          
          <h2 class="text-2xl font-bold text-gray-900 mb-2 tracking-tight">IDENTITY <span class="text-[#2F2E8B]">RECOVERY</span></h2>
          <p class="text-gray-500 text-sm font-mono">Initiate access restoration sequence.</p>
        </div>

        <div class="bg-white/80 backdrop-blur-sm p-1 rounded-none">
          
          <!-- Success Message -->
          <div v-if="emailSent" class="mb-8 p-5 bg-green-50 border-l-4 border-green-500 text-green-700 font-mono text-sm shadow-none">
            <p class="font-bold flex items-center gap-2 mb-2">
               <i class="fas fa-check-circle"></i> TRANSMISSION_SUCCESS
            </p>
            <p class="opacity-80 leading-relaxed mb-4">Reset instructions dispatched to your secure address. Check your inbox.</p>
             
             <!-- Display OTP for development testing -->
            <div v-if="otpCode" class="mt-4 p-3 bg-white/50 border border-green-100 rounded-sm">
              <p class="text-[10px] text-green-600 font-bold mb-1 uppercase tracking-wider">// DEV_BYPASS_KEY:</p>
              <code class="text-lg font-bold text-[#2F2E8B] tracking-widest">{{ otpCode }}</code>
            </div>

            <div class="mt-6">
              <router-link 
                :to="`/reset-password?email=${encodeURIComponent(email)}`"
                class="block w-full text-center bg-[#2F2E8B] text-white py-3 px-4 font-mono text-xs uppercase tracking-widest hover:bg-[#1a1955] transition-all"
              >
                GO_TO_RESET_TERMINAL <i class="fas fa-terminal ml-2"></i>
              </router-link>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-mono flex items-start shadow-none">
             <i class="fas fa-exclamation-triangle mt-1 mr-3"></i>
             <span>{{ error }}</span>
          </div>

          <form v-if="!emailSent" class="space-y-6" @submit.prevent="handleSubmit">
            <!-- Email -->
            <div class="group">
              <label for="email" class="block text-xs font-mono font-bold text-gray-500 mb-2 uppercase tracking-wider group-focus-within:text-[#2F2E8B] transition-colors">Registered_Email</label>
              <div class="relative">
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  required
                  class="block w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[#2F2E8B] focus:bg-white transition-all font-mono text-sm shadow-none"
                  :class="{ 'border-red-500 bg-red-50': error }"
                  placeholder="USER@DOMAIN.COM"
                />
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail class="h-4 w-4 text-gray-400 group-focus-within:text-[#2F2E8B] transition-colors" />
                </div>
                <!-- Tech corner accent -->
                <div class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#2F2E8B] opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
              </div>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="loading"
              class="w-full relative group overflow-hidden bg-[#2F2E8B] text-white py-3 px-4 font-mono text-sm uppercase tracking-wider hover:bg-[#1a1955] transition-all duration-300 disabled:opacity-70"
            >
              <div class="absolute inset-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer"></div>
              <span class="relative flex items-center justify-center gap-2">
                <Loader2 v-if="loading" class="animate-spin h-4 w-4" />
                {{ loading ? 'TRANSMITTING...' : 'SEND_RESET_CODE' }}
                <i v-if="!loading" class="fas fa-paper-plane group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
              </span>
            </button>
          </form>

          <div class="mt-10 pt-6 border-t border-gray-100 text-center">
            <p class="text-sm text-gray-600 mb-3">Identity remembered?</p>
            <router-link to="/login" class="inline-flex items-center gap-2 text-[#2F2E8B] font-mono text-sm font-bold uppercase hover:bg-blue-50 px-4 py-2 border border-transparent hover:border-blue-100 transition-all">
               <i class="fas fa-chevron-left text-[10px]"></i> BACK_TO_AUTH
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Right: Brand Section -->
    <div class="hidden lg:flex lg:w-7/12 relative overflow-hidden">
       <!-- Brand Background Mesh -->
       <div class="absolute inset-0 bg-[#0a0a2a]">
          <!-- Logo in background -->
          <div class="absolute inset-0 flex items-center justify-end overflow-hidden">
            <img 
              src="/logo_white.png"
              alt="Logo Background"
              class="w-[120%] max-w-none opacity-10 blur-sm translate-x-[20%] mix-blend-overlay grayscale"
            />
          </div>
          <!-- Multiple Gradient Layers for "Mesh" effect -->
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(47,46,139,0.4)_0%,transparent_50%)]"></div>
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(47,46,139,0.3)_0%,transparent_50%)]"></div>
          <div class="absolute inset-0 bg-gradient-to-br from-[#0a0a2a] via-[#2F2E8B]/20 to-[#0a0a2a]"></div>
          
          <!-- Tech Grid Overlay -->
          <div class="absolute inset-0 opacity-[0.15]" 
               style="background-image: 
                 linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
               background-size: 50px 50px;">
          </div>
       </div>

       <!-- Content -->
       <div class="relative z-10 w-full h-full flex flex-col justify-center px-20">
          <div class="border-l-4 border-blue-400 pl-10">
             <div class="text-blue-300 font-mono text-xs mb-6 tracking-[0.3em] uppercase flex items-center gap-3">
                <span class="w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-[0_0_8px_#60A5FA]"></span>
                RECOVERY_MODE: ENABLED
             </div>
             <h2 class="text-5xl xl:text-6xl font-bold text-white mb-8 leading-tight font-sans tracking-tight">
                Secure Password<br />
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white">Restoration Hub</span>
             </h2>
             <p class="text-blue-100/60 text-xl max-w-lg leading-relaxed font-light font-sans italic">
                 "Critical systems require verified identity and updated credentials. We're securing your return."
             </p>
          </div>
       </div>
       
       <!-- Decorative Binary -->
       <div class="absolute bottom-8 right-8 text-[#2F2E8B]/20 font-mono text-[10px] text-right pointer-events-none select-none">
          <div>RECOVERY_KEY_SEQUENCE_ACTIVE</div>
          <div>HASH_VERIFICATION_PENDING</div>
       </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Mail, Loader2 } from 'lucide-vue-next'
import { requestPasswordReset } from '@/services/auth_api'

const email = ref('')
const loading = ref(false)
const error = ref('')
const emailSent = ref(false)
const otpCode = ref('')

const validateEmail = () => {
  if (!email.value) {
    error.value = 'Email is required'
    return false
  }
  if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    error.value = 'Invalid email format'
    return false
  }
  return true
}

const handleSubmit = async () => {
  error.value = ''
  if (!validateEmail()) return

  loading.value = true
  try {
    const response = await requestPasswordReset(email.value)
    emailSent.value = true
    // Store OTP if it's returned (for development mode)
    if (response.otp) {
      otpCode.value = response.otp
    }
  } catch (err) {
    error.value = err.message || 'Failed to send reset instructions. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.animate-shimmer {
  animation: shimmer 3s infinite linear;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>
