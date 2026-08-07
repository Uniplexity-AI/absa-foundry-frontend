<template>
  <div class="login">
    <!-- Background: gradient + grid pattern -->
    <div class="login__bg"></div>
    <div class="login__pattern"></div>

    <!-- Main Content -->
    <main class="login__canvas">
      <!-- Header -->
      <header class="login__header">
        <div class="login__logo-wrap">
          <img
            alt="Absa Logo"
            class="login__logo"
            src="/src/assets/absa-logo.png"
          />
        </div>
        <h1 class="login__title">Customer Lifecycle Prediction System</h1>
        <p class="login__subtitle">Enterprise Decision Intelligence Platform</p>
        <p class="login__overline">Internal Operations Platform</p>
      </header>

      <!-- Auth Card -->
      <div class="login__card">
        <!-- Error Message Banner -->
        <div v-if="errorMessage" class="login__error-banner">
          <svg class="login__error-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#ffffff" stroke-width="2"/>
            <line x1="15" y1="9" x2="9" y2="15" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="9" y1="9" x2="15" y2="15" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
          </svg>
          <p class="login__error-text">{{ errorMessage }}</p>
        </div>

        <!-- Success Message Banner -->
        <div v-if="successMessage" class="login__success-banner">
          <svg class="login__success-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#ffffff" stroke-width="2"/>
            <polyline points="8 12 11 15 17 9" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p class="login__success-text">{{ successMessage }}</p>
        </div>

        <!-- Form -->
        <form class="login__form" @submit.prevent="handleSubmit">
          <!-- Username -->
          <div class="login__field">
            <label class="login__label" for="username">Username</label>
            <input
              id="username"
              v-model="formData.email"
              type="text"
              required
              class="login__input"
              :class="{ 'login__input--error': errors.email }"
              placeholder="Enter AD Username"
              autocomplete="username"
              autofocus
            />
            <p v-if="errors.email" class="login__field-error">{{ errors.email }}</p>
          </div>

          <!-- Password -->
          <div class="login__field">
            <label class="login__label" for="password">Password</label>
            <div class="login__password-wrap">
              <input
                id="password"
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="login__input"
                :class="{ 'login__input--error': errors.password }"
                placeholder="Enter AD Password"
                autocomplete="current-password"
                @keyup="checkCapsLock"
                @keydown="checkCapsLock"
              />
              <button
                type="button"
                class="login__toggle-vis"
                @click="showPassword = !showPassword"
                aria-label="Toggle password visibility"
              >
                <!-- Eye on (visible) -->
                <svg v-if="!showPassword" class="login__toggle-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                </svg>
                <!-- Eye off (hidden) -->
                <svg v-else class="login__toggle-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
            <!-- Caps Lock Warning -->
            <p v-if="capsLockOn" class="login__caps-warn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" stroke-width="2"/>
                <path d="M6 10l6-4 6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="12" y1="10" x2="12" y2="18" stroke="currentColor" stroke-width="2"/>
                <line x1="8" y1="18" x2="16" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              Caps Lock is ON
            </p>
            <p v-if="errors.password" class="login__field-error">{{ errors.password }}</p>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="loading"
            class="login__submit"
          >
            <svg v-if="loading" class="login__spinner" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" stroke-width="2.5"/>
              <path d="M12 2a10 10 0 0 1 10 10" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
            <span>{{ loading ? 'Signing In...' : 'Sign In' }}</span>
          </button>
        </form>
      </div>

      <!-- Security Warning -->
      <p class="login__security">Unauthorised access is prohibited and monitored.</p>
    </main>

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { login, API_BASE_URL } from '@/services/api'
import { decodeJWT } from '@/services/decodeJWT'

const router = useRouter()
const loading = ref(false)
const showPassword = ref(false)
const capsLockOn = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

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
    const token = response.access_token || localStorage.getItem('token')
    if (!token) throw new Error('No token received')

    let claims
    try {
      claims = JSON.parse(atob(token.split('.')[1]))
    } catch {
      throw new Error('Invalid token format')
    }

    if (!claims.sub && !claims.user_id && !claims.username) {
      localStorage.removeItem('token')
      localStorage.removeItem('refresh_token')
      throw new Error('Invalid credentials')
    }

    if (claims.role && !response.role) response.role = claims.role
    if (claims.email && !response.email) response.email = claims.email
    if (claims.sub && !response.user_id) response.user_id = claims.sub
    if (claims.username && !response.name) response.name = claims.username
    if (claims.company_name && !response.company_name) response.company_name = claims.company_name
    if (claims.tenant_id && !response.tenant_id) response.tenant_id = claims.tenant_id

    if (response.user_id) localStorage.setItem('user_id', response.user_id)
    if (response.role) localStorage.setItem('role', response.role)
    if (response.email) localStorage.setItem('email', response.email)
    if (response.company_name) localStorage.setItem('company_name', response.company_name)
    if (response.tenant_id) localStorage.setItem('tenant_id', response.tenant_id)
    if (response.name) localStorage.setItem('userName', response.name)

    if (response.role === 'sub_account') {
      localStorage.setItem('active_subaccount_id', response.user_id)
      localStorage.setItem('active_subaccount_email', response.email)
      localStorage.setItem('active_subaccount_name', response.name)
    }

    if (response.tenant_id) {
      await fetchAndStoreBranches(response.tenant_id)
    }

    successMessage.value = 'Login successful!'

    setTimeout(() => {
      const intended = localStorage.getItem('intended_route')
      if (intended) {
        localStorage.removeItem('intended_route')
        router.push(intended)
        return
      }
      router.push('/dashboard/home')
    }, 1000)
  } catch (error) {
    console.error('Login error:', error)
    errorMessage.value = 'Invalid username or password. Please verify your Active Directory credentials or contact IT Support.'
    errors.password = 'Invalid credentials'
  } finally {
    loading.value = false
  }
}

// ── Branches ──
const fetchAndStoreBranches = async (tenantId) => {
  const { setBranches } = decodeJWT()
  try {
    const res = await fetch(`${API_BASE_URL}/subaccounts/branches/list?tenant_id=${tenantId}`)
    if (res.ok) {
      const data = await res.json()
      const branchList = Array.isArray(data) ? data : []
      setBranches(branchList)
    }
  } catch (e) {
    console.warn('Failed to fetch branches during login:', e)
    setBranches([])
  }
}
</script>

<style scoped>
/* ═══════════════════════════════════════════════════════
   Absa Enterprise Core V3 — Login Page
   Token reference (from spec):
     surface:        #fff8f7    surface-container-low: #faf2f1
     surface-container-highest: #e9e1e0
     surface-container-lowest:  #ffffff
     on-surface:     #1e1b1b    on-surface-variant: #5d3f3f
     outline:        #926e6e    outline-variant: #e7bcbc
     primary:        #ae0029    primary-container: #dc0037 (Passion)
     secondary:      #b90734    (Power)
     error:          #ba1a1a    on-error: #ffffff
     inverse-surface:#332f2f    inverse-on-surface: #f7efee
   ═══════════════════════════════════════════════════════ */

.login {
  --_bg:      #fff8f7;
  --_scl:     #faf2f1;   /* surface-container-low */
  --_sch:     #e9e1e0;   /* surface-container-highest */
  --_sc:      #ffffff;   /* surface-container-lowest (card bg) */
  --_pri:     #ae0029;   /* primary */
  --_pric:    #dc0037;   /* primary-container (Passion) */
  --_sec:     #b90734;   /* secondary (Power) */
  --_ons:     #1e1b1b;   /* on-surface (Enrich) */
  --_onsv:    #5d3f3f;   /* on-surface-variant */
  --_out:     #926e6e;   /* outline */
  --_outv:    #e7bcbc;   /* outline-variant */
  --_err:     #ba1a1a;   /* error */
  --_onerr:   #ffffff;   /* on-error */
  --_invsf:   #332f2f;   /* inverse-surface */
  --_invons:  #f7efee;   /* inverse-on-surface */
  --_font:    'Source Sans 3', ui-sans-serif, system-ui, -apple-system, sans-serif;
  --_sp-xs:   4px;
  --_sp-sm:   8px;
  --_sp-md:   16px;
  --_sp-lg:   24px;
  --_sp-xl:   32px;
  --_sp-2xl:  40px;
  --_r-sm:    4px;
  --_r-md:    8px;
  --_r-lg:    12px;

  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--_font);
  color: var(--_ons);
  overflow: hidden;
}

/* ── Background Gradient ── */
.login__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  background: linear-gradient(to bottom right, var(--_scl), var(--_sch));
}

/* ── Grid Pattern ── */
.login__pattern {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(30,27,27,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(30,27,27,0.03) 1px, transparent 1px);
  background-size: 32px 32px;
}

/* ── Canvas ── */
.login__canvas {
  position: relative;
  z-index: 10;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 480px;
  padding: var(--_sp-lg);
}

/* ── Header ── */
.login__header {
  text-align: center;
  margin-bottom: var(--_sp-2xl);
  width: 100%;
}

.login__logo-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: var(--_sp-lg);
}

.login__logo {
  width: 80px;
  height: 80px;
  object-fit: contain;
  background: #ffffff;
  border-radius: 50%;
  padding: 4px;
  box-shadow: 0 1px 3px rgba(30,27,27,0.08);
}

/* headline-lg-mobile / headline-lg */
.login__title {
  font-family: var(--_font);
  font-size: 28px;
  font-weight: 700;
  line-height: 36px;
  color: var(--_ons);
  margin: 0 0 var(--_sp-xs);
  letter-spacing: -0.01em;
}
@media (min-width: 768px) {
  .login__title {
    font-size: 32px;
    line-height: 40px;
  }
}

/* body-lg */
.login__subtitle {
  font-family: var(--_font);
  font-size: 18px;
  font-weight: 400;
  line-height: 28px;
  color: var(--_onsv);
  margin: 0 0 var(--_sp-xs);
}

/* label-md */
.login__overline {
  font-family: var(--_font);
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: var(--_onsv);
}

/* ── Card ── */
.login__card {
  width: 100%;
  background: var(--_scl);              /* surface-container-low */
  border: 1px solid rgba(231,188,188,0.3);
  border-radius: var(--_r-lg);          /* 12px */
  box-shadow: 0px 4px 20px rgba(30,27,27,0.05);
  padding: var(--_sp-xl);
  margin-bottom: var(--_sp-lg);
}

/* ── Error Banner ── */
.login__error-banner {
  display: flex;
  align-items: flex-start;
  gap: var(--_sp-sm);
  background: var(--_err);
  border-left: 4px solid #ffffff;
  padding: 10px;
  border-radius: 0 var(--_r-sm) var(--_r-sm) 0;
  margin-bottom: var(--_sp-lg);
}

.login__error-icon {
  flex-shrink: 0;
  margin-top: 1px;
}

.login__error-text {
  font-family: var(--_font);
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  color: var(--_onerr);
  margin: 0;
}

/* ── Success Banner ── */
.login__success-banner {
  display: flex;
  align-items: flex-start;
  gap: var(--_sp-sm);
  background: #0f9d58;
  border-radius: var(--_r-sm);
  padding: 10px;
  margin-bottom: var(--_sp-lg);
}

.login__success-icon {
  flex-shrink: 0;
  margin-top: 1px;
}

.login__success-text {
  font-family: var(--_font);
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  color: #ffffff;
  margin: 0;
}

/* ── Form ── */
.login__form {
  display: flex;
  flex-direction: column;
  gap: var(--_sp-lg);
}

/* ── Field ── */
.login__field {
  display: flex;
  flex-direction: column;
  gap: var(--_sp-sm);
  position: relative;
}

/* label-md */
.login__label {
  font-family: var(--_font);
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: var(--_ons);
}

/* Input — 1px Enrich 20% border, 4px radius */
.login__input {
  width: 100%;
  height: 42px;
  padding: 0 12px;
  font-family: var(--_font);
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: var(--_ons);
  background: #ffffff;
  border: 1px solid rgba(30,27,27,0.2);
  border-radius: var(--_r-sm);
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.login__input::placeholder {
  color: var(--_out);
  opacity: 0.7;
}

.login__input:focus {
  border-color: var(--_pric);
  border-width: 2px;
  padding: 0 11px;                      /* compensate for 2px border */
  box-shadow: 0 0 0 1px var(--_pric);
}

.login__input--error {
  border-color: var(--_err);
}

.login__input--error:focus {
  border-color: var(--_err);
  box-shadow: 0 0 0 1px var(--_err);
}

/* ── Password wrapper ── */
.login__password-wrap {
  position: relative;
}

.login__password-wrap .login__input {
  padding-right: 42px;
}

.login__password-wrap .login__input:focus {
  padding-right: 41px;
}

/* Toggle visibility — secondary (Power) color */
.login__toggle-vis {
  position: absolute;
  inset: 0 0 0 auto;
  display: flex;
  align-items: center;
  padding-right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--_sec);
  transition: color 0.15s ease;
}

.login__toggle-vis:hover {
  color: var(--_pri);
}

.login__toggle-icon {
  display: block;
}

/* ── Caps Lock Warning ── */
.login__caps-warn {
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: var(--_font);
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  color: var(--_err);
  margin: 0;
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 2px;
}

/* ── Field Error ── */
.login__field-error {
  font-family: var(--_font);
  font-size: 12px;
  font-weight: 600;
  color: var(--_err);
  margin: -4px 0 0;
}

/* ── Submit Button (Primary: Passion bg, Serene text, 4px radius) ── */
.login__submit {
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--_sp-sm);
  background: var(--_pric);
  color: #ffffff;
  font-family: var(--_font);
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.01em;
  border: none;
  border-radius: var(--_r-sm);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.login__submit:hover {
  background: var(--_sec);              /* Passion → Power */
}

.login__submit:focus-visible {
  outline: 2px solid var(--_pric);
  outline-offset: 2px;
}

.login__submit:disabled {
  opacity: 0.9;
  cursor: not-allowed;
}

.login__spinner {
  animation: loginSpin 1s linear infinite;
}

/* ── Security Warning ── */
.login__security {
  text-align: center;
  font-family: var(--_font);
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: var(--_onsv);
  margin: 0;
  padding: 0 var(--_sp-md);
}

/* ═══ Animations ═══ */
@keyframes loginSpin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
</style>
