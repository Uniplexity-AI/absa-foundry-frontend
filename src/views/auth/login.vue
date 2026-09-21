<template>
  <div class="absa-mesh min-h-screen px-6 py-10 text-absa-enrich lg:flex lg:items-center lg:justify-center">
    <main class="w-full max-w-md">
      <div class="mb-6 flex items-center gap-4 border-b border-gray-300 pb-5">
        <img alt="Absa" class="h-12 w-12 object-contain" src="/src/assets/absa-logo.png" />
        <div class="border-l-4 border-absa-passion pl-4">
          <p class="text-[10px] font-bold uppercase tracking-[0.18em] text-absa-passion">ABSA Intelligence Unit</p>
          <h1 class="mt-1 text-xl font-bold tracking-tight text-absa-enrich"></h1>
        </div>
      </div>

      <AbsaCard accent="passion" :hoverable="false" flat bordered rounded="sm" padding="lg">
          <div class="mb-7 border-b border-gray-200 pb-4">
            <h2 class="text-base font-bold text-absa-enrich">Sign in</h2>
            <p class="mt-1 text-xs leading-5 text-gray-500">Enter  Directory credentials to continue.</p>
          </div>
            <div class="mb-5 min-h-12" aria-live="polite">
              <div v-if="errorMessage" class="flex min-h-12 items-start gap-2 border border-red-900/20 border-l-4 border-l-red-900 bg-red-50 px-3 py-2.5 text-xs leading-5 text-red-900" role="alert">
                <span class="material-symbols-outlined mt-0.5 text-base" aria-hidden="true">error</span>
                <p class="font-semibold">{{ errorMessage }}</p>
              </div>

              <div v-else-if="successMessage" class="flex min-h-12 items-start gap-2 border border-green-600/20 border-l-4 border-l-green-600 bg-green-50 px-3 py-2.5 text-xs leading-5 text-green-700" role="status">
                <span class="material-symbols-outlined mt-0.5 text-base" aria-hidden="true">check_circle</span>
                <p class="font-semibold">{{ successMessage }}</p>
              </div>
            </div>

            <form class="space-y-5" @submit.prevent="handleSubmit">
          <div>
            <label class="mb-2 block text-sm font-semibold text-absa-enrich" for="username">Username</label>
            <input
              id="username"
              v-model="formData.email"
              type="text"
              required
              class="h-11 w-full rounded-sm border border-gray-300 bg-white px-3 text-sm text-absa-enrich placeholder:text-gray-400 transition-colors focus:border-absa-passion focus:outline-none focus:ring-2 focus:ring-absa-passion/15 focus:shadow-[inset_0_0_0_1px_var(--absa-passion)]"
              :class="{ 'border-red-900 focus:border-red-900 focus:ring-red-900/15 focus:shadow-none': errors.email }"
              placeholder="Enter AD Username"
              autocomplete="username"
              autofocus
            />
            <p v-if="errors.email" class="mt-1 text-xs font-semibold text-red-900">{{ errors.email }}</p>
          </div>

          <div>
            <label class="mb-2 block text-sm font-semibold text-absa-enrich" for="password">Password</label>
            <div class="relative">
              <input
                id="password"
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="h-11 w-full rounded-sm border border-gray-300 bg-white px-3 pr-11 text-sm text-absa-enrich placeholder:text-gray-400 transition-colors focus:border-absa-passion focus:outline-none focus:ring-2 focus:ring-absa-passion/15 focus:shadow-[inset_0_0_0_1px_var(--absa-passion)]"
                :class="{ 'border-red-900 focus:border-red-900 focus:ring-red-900/15 focus:shadow-none': errors.password }"
                placeholder="Enter AD Password"
                autocomplete="current-password"
                @keyup="checkCapsLock"
                @keydown="checkCapsLock"
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 transition-colors hover:text-absa-passion focus:outline-none focus:ring-2 focus:ring-inset focus:ring-absa-passion"
                @click="showPassword = !showPassword"
                :aria-label="passwordVisibilityLabel"
              >
                <span class="material-symbols-outlined text-[20px]" aria-hidden="true">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
              </button>
            </div>
            <div class="mt-1 min-h-5">
              <p v-if="capsLockOn" class="flex items-center gap-1 text-xs font-semibold text-amber-700"><span class="material-symbols-outlined text-sm" aria-hidden="true">keyboard_capslock</span> Caps Lock is on</p>
              <p v-else-if="errors.password" class="text-xs font-semibold text-red-900">{{ errors.password }}</p>
            </div>
          </div>

          <AbsaButton
            type="submit"
            :loading="loading"
            block
            size="lg"
          >
            <span>{{ loading ? 'Signing In...' : 'Sign In' }}</span>
          </AbsaButton>
            </form>
          </AbsaCard>

      <footer class="mt-5 flex items-start gap-2 border-t border-gray-300 pt-4 text-[11px] leading-5 text-gray-500">
        <span class="material-symbols-outlined mt-0.5 text-sm text-absa-passion" aria-hidden="true"></span>
        <p></p>
      </footer>
    </main>
  </div>
</template>

<script setup>
import { computed, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/services/api'
import { AbsaButton, AbsaCard } from '@/components/ui'
import { useAuthStore } from '@/stores/auth'

defineOptions({ name: 'LoginView' })

const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)
const showPassword = ref(false)
const capsLockOn = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const passwordVisibilityLabel = computed(() => (showPassword.value ? 'Hide password' : 'Show password'))

const formData = reactive({
  email: '',
  password: ''
})

const errors = reactive({
  email: '',
  password: ''
})

// ── Caps Lock Detection ──
const checkCapsLock = (e) => {
  if (typeof e?.getModifierState !== 'function') return
  capsLockOn.value = e.getModifierState('CapsLock')
}

// ── Form Validation ──
const validateForm = () => {
  let isValid = true
  errors.email = ''
  errors.password = ''

  if (!formData.email.trim()) {
    errors.email = 'Email or username is required'
    isValid = false
  }

  if (!formData.password) {
    errors.password = 'Password is required'
    isValid = false
  }

  return isValid
}

// ── Form Submit ──
const handleSubmit = async () => {
  if (!validateForm()) return

  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const response = await login(formData.email, formData.password)
    if (!response.access_token) throw new Error('No token received')

    // Populate the Pinia auth store — this also persists to localStorage
    authStore.setSession(response)

    // Drop legacy fork keys that this ABSA backend never issues
    localStorage.removeItem('company_name')
    localStorage.removeItem('tenant_id')
    localStorage.removeItem('active_subaccount_id')
    localStorage.removeItem('active_subaccount_email')
    localStorage.removeItem('active_subaccount_name')

    successMessage.value = 'Login successful!'

    // Role-based landing: ADMIN/RM → portfolio; DS → models; OPS → ETL
    const landingByRole = {
      DATA_SCIENTIST: '/dashboard/models',
      OPERATIONS: '/dashboard/etl-run-history'
    }
    const primaryRole = authStore.primaryRole || ''
    const defaultLanding = landingByRole[primaryRole] || '/dashboard/portfolio'

    setTimeout(() => {
      const intended = localStorage.getItem('intended_route')
      if (intended) {
        localStorage.removeItem('intended_route')
        router.push(intended)
        return
      }
      router.push(defaultLanding)
    }, 1000)
  } catch (error) {
    console.error('Login error:', error)
    errorMessage.value = 'Invalid username or password. Please verify your Active Directory credentials or contact IT Support.'
    errors.password = 'Invalid credentials'
  } finally {
    loading.value = false
  }
}

</script>
