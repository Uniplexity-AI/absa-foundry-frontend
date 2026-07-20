<template>
  <div class="min-h-screen flex flex-col lg:flex-row bg-white font-sans overflow-hidden">
    
    <!-- Left: Login Form -->
    <div class="flex flex-col justify-center items-center w-full lg:w-5/12 relative z-10 bg-white border-r border-gray-200">
       <!-- Background Grid for Left Side -->
       <div class="absolute inset-0 pointer-events-none opacity-[0.03]" style="background-image: radial-gradient(#2F2E8B 1px, transparent 1px); background-size: 24px 24px;"></div>

      <div class="w-full max-w-md mx-auto px-6 py-8">
        
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 text-[#2F2E8B] text-xs font-mono mb-6 rounded-sm">
             <i class="fas fa-shield-alt"></i>
             <span>// ACCESS_CONTROL_V2.1</span>
          </div>

          <router-link to="/" class="block mb-6 group">
             <img src="/logo_red.png" alt="ABSA Intelligence Unit" class="h-12 mx-auto object-contain transition-transform group-hover:scale-105" />
          </router-link>

          <h2 class="text-2xl font-bold text-gray-900 mb-2 tracking-tight">WELCOME <span class="text-[#2F2E8B]">BACK</span></h2>
          <p class="text-gray-500 text-sm font-mono">Authenticate to access system modules.</p>
        </div>

        <div class="bg-white/80 backdrop-blur-sm p-1 rounded-none">
            <!-- Google Sign-In Button -->
            <div class="mb-6 w-full flex justify-center tech-google-btn-container">
              <GoogleLogin 
                :callback="handleGoogleLogin"
                @error="handleGoogleError"
                prompt
                theme="outline"
                size="large"
                shape="rectangular"
              />
            </div>

          <!-- Tech Divider -->
          <div class="relative mb-8 text-center flex items-center justify-center gap-4">
              <div class="h-px bg-gray-200 w-full relative">
                  <div class="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-[#2F2E8B]"></div>
              </div>
              <span class="text-xs font-mono text-gray-400 uppercase whitespace-nowrap">OR_CONTINUE_WITH_EMAIL</span>
              <div class="h-px bg-gray-200 w-full relative">
                  <div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-[#2F2E8B]"></div>
              </div>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-mono flex items-start">
             <i class="fas fa-exclamation-triangle mt-1 mr-3"></i>
             <span>{{ errorMessage }}</span>
          </div>

          <!-- Success Message -->
          <div v-if="successMessage" class="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 text-sm font-mono flex items-start">
             <i class="fas fa-check-circle mt-1 mr-3"></i>
             <span>{{ successMessage }}</span>
          </div>

          <!-- Info Message -->
          <div v-if="hasIntendedRoute" class="mb-6 p-4 bg-blue-50 border-l-4 border-[#2F2E8B] text-[#2F2E8B] text-sm font-mono">
            <p class="font-bold flex items-center gap-2 mb-1">
               <i class="fas fa-info-circle"></i> MODULE_LOCKED
            </p>
            <p class="opacity-80">Authentication required for access.</p>
          </div>

          <form class="space-y-5" @submit.prevent="handleSubmit">
            <!-- Email -->
            <div class="group">
              <label for="email" class="block text-xs font-mono font-bold text-gray-500 mb-1 uppercase tracking-wider group-focus-within:text-[#2F2E8B] transition-colors">Email_Address</label>
              <div class="relative">
                <input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  required
                  class="block w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[#2F2E8B] focus:bg-white transition-all font-mono text-sm"
                  :class="{ 'border-red-500 bg-red-50': errors.email }"
                  placeholder="USER@DOMAIN.COM"
                />
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail class="h-4 w-4 text-gray-400 group-focus-within:text-[#2F2E8B] transition-colors" />
                </div>
                <!-- Tech corner accent -->
                <div class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#2F2E8B] opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
              </div>
              <p v-if="errors.email" class="mt-1 text-xs text-red-600 font-mono">{{ errors.email }}</p>
            </div>
            
            <!-- Password -->
            <div class="group">
              <label for="password" class="block text-xs font-mono font-bold text-gray-500 mb-1 uppercase tracking-wider group-focus-within:text-[#2F2E8B] transition-colors">Access_Key</label>
              <div class="relative">
                <input
                  id="password"
                  v-model="formData.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="block w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[#2F2E8B] focus:bg-white transition-all font-mono text-sm"
                  :class="{ 'border-red-500 bg-red-50': errors.password }"
                  placeholder="••••••••••••"
                />
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock class="h-4 w-4 text-gray-400 group-focus-within:text-[#2F2E8B] transition-colors" />
                </div>
                <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <Eye v-if="!showPassword" class="h-4 w-4 text-gray-400 hover:text-[#2F2E8B] transition-colors" />
                  <EyeOff v-else class="h-4 w-4 text-gray-400 hover:text-[#2F2E8B] transition-colors" />
                </button>
                 <!-- Tech corner accent -->
                <div class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#2F2E8B] opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
              </div>
              <p v-if="errors.password" class="mt-1 text-xs text-red-600 font-mono">{{ errors.password }}</p>
            </div>

            <!-- Forgot password -->
            <div class="flex justify-end">
              <router-link to="/forgot-password" class="text-xs font-mono text-gray-500 hover:text-[#2F2E8B] uppercase tracking-wide flex items-center gap-1 group">
                 RECOVER_PASSWORD <i class="fas fa-chevron-right text-[10px] group-hover:translate-x-0.5 transition-transform"></i>
              </router-link>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="loading"
              class="w-full relative group overflow-hidden bg-[#2F2E8B] text-white py-3 px-4 font-mono text-sm uppercase tracking-wider hover:bg-[#1a1955] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <div class="absolute inset-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer"></div>
              <span class="relative flex items-center justify-center gap-2">
                <Loader2 v-if="loading" class="animate-spin h-4 w-4" />
                {{ loading ? 'AUTHENTICATING...' : 'INITIATE_SESSION' }}
                <i v-if="!loading" class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </span>
            </button>
          </form>

          <div class="mt-8 pt-6 border-t border-gray-100 text-center">
            <p class="text-sm text-gray-600 mb-2">New to the network?</p>
            <router-link to="/terms-acceptance" class="inline-flex items-center gap-2 text-[#2F2E8B] font-mono text-sm font-bold uppercase hover:bg-blue-50 px-4 py-2 border border-transparent hover:border-blue-100 transition-all rounded-sm">
               <span>CREATE_ACCOUNT</span>
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
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(47,46,139,0.4)_0%,transparent_50%)]"></div>
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(47,46,139,0.3)_0%,transparent_50%)]"></div>
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
          <div class="border-l-4 border-[#2F2E8B] pl-10">
             <div class="text-blue-300 font-mono text-xs mb-6 tracking-[0.3em] uppercase flex items-center gap-3">
                <span class="w-2 h-2 bg-blue-400 rounded-full"></span>
                NODE_STATUS: ONLINE
             </div>
             <h2 class="text-5xl xl:text-6xl font-bold text-white mb-8 leading-tight font-sans tracking-tight">
                Unified Business<br />
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">Intelligence Grid</span>
             </h2>
             <p class="text-blue-100/60 text-xl max-w-lg leading-relaxed font-light font-sans italic">
                 "Seamlessly integrate POS, Inventory, and HR modules into a single logical command center."
             </p>
          </div>

          <!-- Feature Ticks -->
          <div class="space-y-4 pl-8">
             <div class="flex items-center gap-4 text-blue-200/80 font-mono text-sm group">
                <div class="w-8 h-8 rounded-sm bg-[#2F2E8B]/30 border border-[#2F2E8B]/50 flex items-center justify-center group-hover:bg-[#2F2E8B] transition-colors">
                   <i class="fas fa-check text-xs"></i>
                </div>
                <span>Simplicity</span>
             </div>
             <div class="flex items-center gap-4 text-blue-200/80 font-mono text-sm group">
               <div class="w-8 h-8 rounded-sm bg-[#2F2E8B]/30 border border-[#2F2E8B]/50 flex items-center justify-center group-hover:bg-[#2F2E8B] transition-colors">
                   <i class="fas fa-check text-xs"></i>
                </div>
                <span>Productivity</span>
             </div>
             <div class="flex items-center gap-4 text-blue-200/80 font-mono text-sm group">
                <div class="w-8 h-8 rounded-sm bg-[#2F2E8B]/30 border border-[#2F2E8B]/50 flex items-center justify-center group-hover:bg-[#2F2E8B] transition-colors">
                   <i class="fas fa-check text-xs"></i>
                </div>
                <span>Data-Driven Decisions</span>
             </div>
          </div>
       </div>

       <!-- Decorative Code/Data overlay (Optional purely visual) -->
       <div class="absolute bottom-8 right-8 text-[#2F2E8B]/20 font-mono text-[10px] text-right pointer-events-none select-none">
          <div>01001011 01010101 01001100 01000001</div>
          <div>01010100 01000101 01000011 01001000</div>
          <div>SESSION_ID: {{ Math.random().toString(36).substring(7).toUpperCase() }}</div>
       </div>
    </div>
  </div>
</template>

<script>
// Keep existing script exactly as is, just wrapped in defineComponent
import { defineComponent, reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import router from '@/router'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Loader2
} from 'lucide-vue-next'

import axios from 'axios'
import { login, API_BASE_URL, MICRO_FINANCE_URL } from '@/api_services/api'
import { GoogleLogin } from 'vue3-google-login'
import { decodeJWT } from '@/api_services/decodeJWT'

export default defineComponent({
  name: 'Login',
  components: {
    Mail,
    Lock,
    Eye,
    EyeOff,
    LogIn,
    Loader2,
    GoogleLogin
  },
  setup() {
    const loading = ref(false)
    const showPassword = ref(false)
    const errorMessage = ref('')
    const successMessage = ref('')
    
    // Check if user is trying to access a specific module
    const hasIntendedRoute = computed(() => {
      return !!localStorage.getItem('intended_route')
    })

    const formData = reactive({
      email: '',
      password: ''
    })

    const errors = reactive({
      email: '',
      password: ''
    })

    const handleGoogleError = (err) => {
      console.error('Google Login Error:', err)
      errorMessage.value = 'Google Login failed. Please try again or check your popup settings.'
    }

    const handleGoogleLogin = async (response) => {
      loading.value = true
      errorMessage.value = ''
      successMessage.value = ''
      
      try {
        console.log('Google response:', response)
        
        if (!response.credential) {
          throw new Error('No credential received from Google')
        }

        const result = await axios.post(`${API_BASE_URL}/auth/google-signin`, {
          id_token: response.credential 
        })

        const data = result.data
        console.log('Backend response:', data)
        
        localStorage.setItem('token', data.access_token)
        localStorage.setItem('user_id', data.user_id)
        localStorage.setItem('tenant_id', data.tenant_id)
        localStorage.setItem('email', data.email)
        localStorage.setItem('userName', data.name)
        localStorage.setItem('role', data.role)
        localStorage.setItem('company_name', data.company_name)

        if (data.role === 'sub_account') {
          localStorage.setItem('active_subaccount_id', data.user_id)
          localStorage.setItem('active_subaccount_email', data.email)
          localStorage.setItem('active_subaccount_name', data.name)
        }
        
        await fetchAndStoreBranches(data.tenant_id)
        
        successMessage.value = data.message || 'Login successful!'
        
        setTimeout(() => {
          const intended = localStorage.getItem('intended_route')
          if (intended) {
            localStorage.removeItem('intended_route')
            router.push(intended)
            return
          }
          switch (data.role?.toLowerCase()) {
            case 'cashier':
            case 'attendant':
            case 'manager':
            case 'admin':
            case 'owner':
              router.push('/dashboard/home')
              break
            case 'sub_account':
              router.push('/dashboard/crm')
              break
            case 'supervisor':
              router.push('/supervisor/dashboard')
              break
            case 'client':
              window.location.href = `${MICRO_FINANCE_URL}/client/dashboard?tenant_id=${data.tenant_id}&token=${data.access_token}`;
              break
            default:
              router.push('/')
          }
        }, 1000)

      } catch (error) {
        console.error('Google sign-in error:', error)
        // Standardize error message to avoid exposing backend details
        errorMessage.value = 'Google sign-in failed. Please try again.'
      } finally {
        loading.value = false
      }
    }

    const validateForm = () => {
      let isValid = true
      errors.email = ''
      errors.password = ''

      if (!formData.email) {
        errors.email = 'Email is required'
        isValid = false
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        errors.email = 'Invalid email format'
        isValid = false
      }

      if (!formData.password) {
        errors.password = 'Password is required'
        isValid = false
      }

      return isValid
    }

    const handleSubmit = async () => {
      if (!validateForm()) return

      loading.value = true
      errorMessage.value = ''
      successMessage.value = ''

      try {
        const response = await login(formData.email, formData.password)

        localStorage.setItem('user_id', response.user_id)
        localStorage.setItem('token', response.access_token)
        localStorage.setItem('role', response.role)
        localStorage.setItem('email', response.email)
        localStorage.setItem('company_name', response.company_name)
        localStorage.setItem('tenant_id', response.tenant_id)
        
        if (response.role === 'sub_account') {
          localStorage.setItem('active_subaccount_id', response.user_id)
          localStorage.setItem('active_subaccount_email', response.email)
          localStorage.setItem('active_subaccount_name', response.name)
        }

        await fetchAndStoreBranches(response.tenant_id)

        successMessage.value = 'Login successful!'

        setTimeout(() => {
          const intended = localStorage.getItem('intended_route')
          if (intended) {
            localStorage.removeItem('intended_route')
            router.push(intended)
            return
          }
          switch (response.role?.toLowerCase()) {
            case 'cashier':
              router.push('/dashboard/home')
              break
            case 'attendant':
              router.push('/dashboard/home')
              break
            case 'manager':
              router.push('/dashboard/home')
              break
            case 'admin':
              router.push('/dashboard/home')
              break
            case 'owner':
              router.push('/dashboard/home')
              break
            case 'sub_account':
              router.push('/dashboard/crm')
              break
            case 'supervisor':
              router.push('/supervisor/dashboard')
              break
            case 'client':
              window.location.href = `${MICRO_FINANCE_URL}/client/dashboard?tenant_id=${response.tenant_id}&token=${response.access_token}`;
              break

            default:
              router.push('/')
          }
        }, 1000)
      } catch (error) {
        console.error('Login error:', error)
        // Standardize error message for security and clarity
        errorMessage.value = 'Login failed. Invalid email or password.'
        errors.password = 'Invalid credentials'
      } finally {
        loading.value = false
      }
    }

    const fetchAndStoreBranches = async (tenantId) => {
      const { setBranches } = decodeJWT()
      try {
        const res = await fetch(`${API_BASE_URL}/subaccounts/branches/list?tenant_id=${tenantId}`)
        if (res.ok) {
          const data = await res.json()
          const branchList = Array.isArray(data) ? data : []
          setBranches(branchList)
          console.log('Branches loaded:', branchList.length)
        }
      } catch (e) {
        console.warn('Failed to fetch branches during login:', e)
        setBranches([])
      }
    }

    return {
      formData,
      errors,
      loading,
      showPassword,
      errorMessage,
      successMessage,
      hasIntendedRoute,
      handleSubmit,
      handleGoogleLogin,
      handleGoogleError
    }
  }
})
</script>

<style scoped>
.animate-shimmer {
  animation: shimmer 3s infinite linear;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Professional Alignment for Google Login */
.tech-google-btn-container :deep(> div) {
  display: flex !important;
  justify-content: center !important;
  width: 100% !important;
}

.tech-google-btn-container :deep(iframe) {
  margin-left: auto !important;
  margin-right: auto !important;
}
</style>