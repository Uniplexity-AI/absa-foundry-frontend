<template>
  <div class="min-h-screen flex flex-col lg:flex-row bg-white font-sans overflow-hidden">
    
    <!-- Left: Reset Form -->
    <div class="flex flex-col justify-center items-center w-full lg:w-5/12 relative z-10 bg-white border-r border-gray-200">
       <!-- Background Grid for Left Side -->
       <div class="absolute inset-0 pointer-events-none opacity-[0.03]" style="background-image: radial-gradient(#2F2E8B 1px, transparent 1px); background-size: 24px 24px;"></div>

      <div class="w-full max-w-md mx-auto px-6 py-8">
        
        <!-- Header -->
        <div class="text-center mb-10">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 text-[#2F2E8B] text-xs font-mono mb-6 rounded-sm">
             <i class="fas fa-sync-alt"></i>
             <span>// RESET_SEQUENCE_V2.0</span>
          </div>

          <router-link to="/" class="block mb-6 group">
            <img src="/logo_red.png" alt="ABSA Intelligence Unit" class="h-12 mx-auto object-contain transition-transform group-hover:scale-105" />
          </router-link>
          
          <h2 class="text-2xl font-bold text-gray-900 mb-2 tracking-tight">CREDENTIAL <span class="text-[#2F2E8B]">UPDATE</span></h2>
          <p class="text-gray-500 text-sm font-mono">Execute password synchronization protocol.</p>
        </div>

        <div class="bg-white/80 backdrop-blur-sm p-1 rounded-none">
          
          <!-- Inline success message -->
          <div v-if="showSuccess" class="mb-8 p-5 bg-green-50 border-l-4 border-green-500 text-green-700 font-mono text-sm shadow-none animate-pulse">
            <p class="font-bold flex items-center gap-2 mb-2">
               <i class="fas fa-check-circle"></i> RESET_SUCCESS
            </p>
            <p class="opacity-80 leading-relaxed">System initialized with new credentials. Redirecting to auth terminal...</p>
          </div>

          <!-- Form -->
          <form v-if="!showSuccess" @submit.prevent="handleSubmit" class="space-y-5" novalidate>
            <!-- Email Input -->
            <div class="group">
              <label for="email" class="block text-xs font-mono font-bold text-gray-500 mb-1 uppercase tracking-wider group-focus-within:text-[#2F2E8B] transition-colors">Target_Identity</label>
              <div class="relative">
                <input
                  id="email"
                  type="email"
                  v-model="form.email"
                  required
                  class="block w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[#2F2E8B] focus:bg-white transition-all font-mono text-sm shadow-none"
                  :class="{ 'border-red-500 bg-red-50': errors.email }"
                  placeholder="USER@DOMAIN.COM"
                />
                <!-- Tech corner accent -->
                <div class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#2F2E8B] opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
              </div>
              <p v-if="errors.email" class="mt-1 text-xs text-red-500 font-mono tracking-tighter">{{ errors.email }}</p>
            </div>

            <!-- OTP Input -->
            <div class="group">
              <label for="otp" class="block text-xs font-mono font-bold text-gray-500 mb-1 uppercase tracking-wider group-focus-within:text-[#2F2E8B] transition-colors">Verification_Key</label>
              <div class="relative">
                <input
                  id="otp"
                  type="text"
                  v-model="form.otp"
                  required
                  class="block w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[#2F2E8B] focus:bg-white transition-all font-mono text-sm shadow-none"
                  :class="{ 'border-red-500 bg-red-50': errors.otp }"
                  placeholder="000000"
                />
                <div class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#2F2E8B] opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
              </div>
              <p v-if="errors.otp" class="mt-1 text-xs text-red-500 font-mono tracking-tighter">{{ errors.otp }}</p>
            </div>

            <!-- New Password Input -->
            <div class="group">
              <label for="password" class="block text-xs font-mono font-bold text-gray-500 mb-1 uppercase tracking-wider group-focus-within:text-[#2F2E8B] transition-colors">New_Secret</label>
              <div class="relative">
                <input
                  id="password"
                  :type="showPassword ? 'text' : 'password'"
                  v-model="form.password"
                  required
                  class="block w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[#2F2E8B] focus:bg-white transition-all font-mono text-sm shadow-none"
                  :class="{ 'border-red-500 bg-red-50': errors.password }"
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#2F2E8B] transition-colors"
                >
                  <Eye v-if="!showPassword" class="w-4 h-4" />
                  <EyeOff v-else class="w-4 h-4" />
                </button>
                <div class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#2F2E8B] opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
              </div>
              <p v-if="errors.password" class="mt-1 text-xs text-red-500 font-mono tracking-tighter">{{ errors.password }}</p>
            </div>

            <!-- Confirm Password Input -->
            <div class="group">
              <label for="confirmPassword" class="block text-xs font-mono font-bold text-gray-500 mb-1 uppercase tracking-wider group-focus-within:text-[#2F2E8B] transition-colors">Verify_Secret</label>
              <div class="relative">
                <input
                  id="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  v-model="form.confirmPassword"
                  required
                  class="block w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[#2F2E8B] focus:bg-white transition-all font-mono text-sm shadow-none"
                  :class="{ 'border-red-500 bg-red-50': errors.confirmPassword }"
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#2F2E8B] transition-colors"
                >
                  <Eye v-if="!showConfirmPassword" class="w-4 h-4" />
                  <EyeOff v-else class="w-4 h-4" />
                </button>
                 <div class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#2F2E8B] opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
              </div>
              <p v-if="errors.confirmPassword" class="mt-1 text-xs text-red-500 font-mono tracking-tighter">{{ errors.confirmPassword }}</p>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-4 pt-4">
              <button
                type="button"
                @click="router.push('/login')"
                class="flex-1 py-3 px-4 border border-gray-200 text-gray-600 font-mono text-xs uppercase tracking-widest hover:bg-gray-50 hover:text-[#2F2E8B] hover:border-[#2F2E8B] transition-all"
                :disabled="isLoading"
              >
                CANCEL
              </button>
              <button
                type="submit"
                class="flex-1 relative group overflow-hidden bg-[#2F2E8B] text-white py-3 px-4 font-mono text-xs uppercase tracking-widest hover:bg-[#1a1955] transition-all duration-300 disabled:opacity-70"
                :disabled="isLoading"
              >
                 <div class="absolute inset-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer"></div>
                 <span class="relative flex items-center justify-center gap-2">
                    <Loader2 v-if="isLoading" class="animate-spin h-3 w-3" />
                    {{ isLoading ? 'UPDATING...' : 'FINALIZE_RESET' }}
                 </span>
              </button>
            </div>
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
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(47,46,139,0.4)_0%,transparent_50%)]"></div>
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(47,46,139,0.3)_0%,transparent_50%)]"></div>
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
                SECURITY_CLEARANCE: REQUIRED
             </div>
             <h2 class="text-5xl xl:text-6xl font-bold text-white mb-8 leading-tight font-sans tracking-tight">
                Reset Secret<br />
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white">To Continue Securely</span>
             </h2>
             <p class="text-blue-100/60 text-xl max-w-lg leading-relaxed font-light font-sans italic">
                 "Updated credentials ensure the integrity of your business network. Follow the sequence to restoration."
             </p>
          </div>
       </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { resetPassword } from '@/services/auth_api';
import { Loader2, Eye, EyeOff } from 'lucide-vue-next';

const form = ref({
  email: '',
  otp: '',
  password: '',
  confirmPassword: ''
});
const errors = ref({
  email: null,
  otp: null,
  password: null,
  confirmPassword: null
});
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isLoading = ref(false);
const showSuccess = ref(false);

const router = useRouter();
const route = useRoute();

// Pre-fill email if passed as query parameter
onMounted(() => {
  if (route.query.email) {
    form.value.email = route.query.email;
  }
});

function validatePassword() {
  errors.value.email = null;
  errors.value.otp = null;
  errors.value.password = null;
  errors.value.confirmPassword = null;

  if (!form.value.email) {
    errors.value.email = 'Email is required';
    return false;
  }

  if (!/^\S+@\S+\.\S+$/.test(form.value.email)) {
    errors.value.email = 'Invalid email format';
    return false;
  }

  if (!form.value.otp) {
    errors.value.otp = 'Reset code is required';
    return false;
  }

  if (form.value.otp.length !== 6 || !/^\d{6}$/.test(form.value.otp)) {
    errors.value.otp = 'Reset code must be 6 digits';
    return false;
  }

  if (form.value.password.length < 8) {
    errors.value.password = 'Password must be at least 8 characters long';
    return false;
  }

  if (form.value.password !== form.value.confirmPassword) {
    errors.value.confirmPassword = 'Passwords do not match';
    return false;
  }

  return true;
}

async function handleSubmit() {
  if (isLoading.value) return;

  if (!validatePassword()) return;

  isLoading.value = true;

  try {
    await resetPassword(form.value.email, form.value.otp, form.value.password);
    showSuccess.value = true;
    // Redirect to login after a short delay so the user sees confirmation
    setTimeout(() => router.push('/login'), 2500);
  } catch (error) {
    errors.value.password = error.message || 'Failed to reset password. Please try again.';
  } finally {
    isLoading.value = false;
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
