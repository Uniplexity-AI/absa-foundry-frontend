<template>
  <div class="absa-login">
    <!-- ── Left: Login Form ── -->
    <div class="absa-login__form-panel">
      <div class="absa-login__form-inner">
        <!-- Header -->
        <div class="absa-login__header">
          <div class="absa-pill-badge absa-pill-badge--login">
            <span class="absa-pill-badge__dot"></span>
            ACCESS_CONTROL_V2.1
          </div>

          <router-link to="/" class="absa-login__logo-link">
            <img src="/logo_red.png" alt="ABSA Intelligence Unit" class="absa-login__logo" />
          </router-link>

          <h2 class="absa-login__title">Welcome <span class="absa-login__title-accent">Back</span></h2>
          <p class="absa-login__subtitle">Authenticate to access system modules.</p>
        </div>

        <div class="absa-login__form-card">
          <!-- Google Sign-In -->
          <div class="absa-login__google-btn">
            <GoogleLogin
              :callback="handleGoogleLogin"
              @error="handleGoogleError"
              prompt
              theme="outline"
              size="large"
              shape="rectangular"
            />
          </div>

          <!-- Divider -->
          <div class="absa-login__divider">
            <span class="absa-login__divider-text">or continue with credentials</span>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="absa-alert absa-alert--error">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            <span>{{ errorMessage }}</span>
          </div>

          <!-- Success Message -->
          <div v-if="successMessage" class="absa-alert absa-alert--success">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <span>{{ successMessage }}</span>
          </div>

          <!-- Info Message -->
          <div v-if="hasIntendedRoute" class="absa-alert absa-alert--info">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            <div>
              <p class="absa-alert__title">MODULE_LOCKED</p>
              <p class="absa-alert__desc">Authentication required for access.</p>
            </div>
          </div>

          <form class="absa-login__form" @submit.prevent="handleSubmit">
            <!-- Email or Username -->
            <div class="absa-field" :class="{ 'absa-field--error': errors.email }">
              <label for="email" class="absa-field__label">Email or Username</label>
              <div class="absa-field__input-wrap">
                <Mail class="absa-field__icon" />
                <input
                  id="email"
                  v-model="formData.email"
                  type="text"
                  required
                  class="absa-field__input"
                  placeholder="Enter email or username"
                  autocomplete="username"
                />
              </div>
              <p v-if="errors.email" class="absa-field__error">{{ errors.email }}</p>
            </div>

            <!-- Password -->
            <div class="absa-field" :class="{ 'absa-field--error': errors.password }">
              <label for="password" class="absa-field__label">Access Key</label>
              <div class="absa-field__input-wrap">
                <Lock class="absa-field__icon" />
                <input
                  id="password"
                  v-model="formData.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="absa-field__input"
                  placeholder="••••••••••••"
                />
                <button type="button" class="absa-field__toggle" @click="showPassword = !showPassword">
                  <Eye v-if="!showPassword" class="absa-field__toggle-icon" />
                  <EyeOff v-else class="absa-field__toggle-icon" />
                </button>
              </div>
              <p v-if="errors.password" class="absa-field__error">{{ errors.password }}</p>
            </div>

            <!-- Forgot Password -->
            <div class="absa-login__forgot">
              <router-link to="/forgot-password" class="absa-login__forgot-link">
                Recover Password
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              </router-link>
            </div>

            <!-- Submit -->
            <button
              type="submit"
              :disabled="loading"
              class="absa-btn absa-btn--primary absa-btn--block"
            >
              <Loader2 v-if="loading" class="absa-btn__spinner" />
              {{ loading ? 'AUTHENTICATING...' : 'Initiate Session' }}
              <svg v-if="!loading" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </form>

          <div class="absa-login__footer-link">
            <p>New to the network?</p>
            <router-link to="/terms-acceptance" class="absa-login__create-link">
              Create Account
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Right: Brand Panel ── -->
    <div class="absa-login__brand-panel">
      <div class="absa-login__brand-bg">
        <img
          src="/logo_white.png"
          alt="Logo Background"
          class="absa-login__brand-watermark"
        />
        <div class="absa-login__brand-gradient-1"></div>
        <div class="absa-login__brand-gradient-2"></div>
        <div class="absa-login__brand-gradient-3"></div>
        <div class="absa-login__brand-grid"></div>
      </div>

      <div class="absa-login__brand-content">
        <div class="absa-login__brand-accent-line">
          <div class="absa-login__brand-status">
            <span class="absa-login__brand-dot"></span>
            NODE STATUS: ONLINE
          </div>
          <h2 class="absa-login__brand-title">
            Predictive Customer<br />
            <span class="absa-login__brand-title-highlight">Lifecycle Intelligence</span>
          </h2>
          <p class="absa-login__brand-quote">
            "Transform customer retention from reactive outreach to proactive AI precision."
          </p>
        </div>

        <div class="absa-login__brand-features">
          <div class="absa-login__brand-feature">
            <div class="absa-login__brand-check">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <span>AI-Driven Retention</span>
          </div>
          <div class="absa-login__brand-feature">
            <div class="absa-login__brand-check">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <span>Real-Time Risk Scoring</span>
          </div>
          <div class="absa-login__brand-feature">
            <div class="absa-login__brand-check">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <span>Bank-Grade Security</span>
          </div>
        </div>
      </div>

      <div class="absa-login__brand-footer">
        <div>01001011 01010101 01001100 01000001</div>
        <div>01010100 01000101 01000011 01001000</div>
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
import { login, API_BASE_URL } from '@/services/api'
import { GoogleLogin } from 'vue3-google-login'
import { decodeJWT } from '@/services/decodeJWT'

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
          router.push('/dashboard/home')
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

    const handleSubmit = async () => {
      if (!validateForm()) return

      loading.value = true
      errorMessage.value = ''
      successMessage.value = ''

      try {
        // POST /auth/login — API Gateway expects { username, password }
        const response = await login(formData.email, formData.password)

        // Standard response: { access_token, refresh_token, token_type, expires_in }
        // The login() function in services/api.js already stores token + refresh_token
        // Additional user metadata from the JWT or extended response:
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
        // Standardize error message for security and clarity
        errorMessage.value = 'Login failed. Invalid credentials.'
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
/* ════════════════════════════════════════════════════════
   ABSA Login Page — Maroon Design System
   References: absa-colors.css, patterns.css, pages.css
   ════════════════════════════════════════════════════════ */

/* ── Root Layout ── */
.absa-login {
  min-height: 100vh;
  display: flex;
  font-family: var(--absa-font-main, 'Montserrat', 'Inter', system-ui, sans-serif);
  background: var(--absa-white, #FFFFFF);
  overflow: hidden;
}

/* ── Left: Form Panel ── */
.absa-login__form-panel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
  background: var(--absa-white, #FFFFFF);
  border-right: 1px solid var(--absa-border-light, #E8E8EC);
}

.absa-login__form-panel::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.03;
  background-image: radial-gradient(var(--absa-maroon, #BE0F2C) 1px, transparent 1px);
  background-size: 24px 24px;
}

.absa-login__form-inner {
  width: 100%;
  max-width: 420px;
  padding: 32px 24px;
}

/* ── Header ── */
.absa-login__header {
  text-align: center;
  margin-bottom: 28px;
}

.absa-pill-badge--login {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--absa-maroon-soft, #FDE8EC);
  color: var(--absa-maroon, #BE0F2C);
  font-size: 0.675rem;
  font-weight: 800;
  padding: 4px 14px;
  border-radius: 20px;
  margin-bottom: 18px;
  letter-spacing: 0.04em;
  font-family: var(--absa-font-mono, 'Space Mono', monospace);
}

.absa-login__logo-link {
  display: block;
  margin-bottom: 18px;
}

.absa-login__logo {
  height: 44px;
  margin: 0 auto;
  object-fit: contain;
  transition: transform 0.2s ease;
}

.absa-login__logo-link:hover .absa-login__logo {
  transform: scale(1.05);
}

.absa-login__title {
  font-size: 1.75rem;
  font-weight: 900;
  color: var(--absa-text-primary, #111827);
  margin: 0 0 6px 0;
  letter-spacing: -0.02em;
}

.absa-login__title-accent {
  color: var(--absa-maroon, #BE0F2C);
}

.absa-login__subtitle {
  font-size: 0.825rem;
  color: var(--absa-text-muted, #9CA3AF);
  margin: 0;
  font-family: var(--absa-font-mono, 'Space Mono', monospace);
}

/* ── Form Card ── */
.absa-login__form-card {
  background: var(--absa-surface-card, #FFFFFF);
  border: var(--absa-border-card, 1px solid #E8E8EC);
  border-radius: var(--absa-radius-card, 12px);
  padding: 28px;
  box-shadow: var(--absa-shadow-card, 0 2px 8px rgba(0,0,0,0.06));
}

/* ── Google Button ── */
.absa-login__google-btn {
  display: flex;
  justify-content: center;
  margin-bottom: 22px;
}

.absa-login__google-btn :deep(> div) {
  display: flex !important;
  justify-content: center !important;
  width: 100% !important;
}

.absa-login__google-btn :deep(iframe) {
  margin-left: auto !important;
  margin-right: auto !important;
}

/* ── Divider ── */
.absa-login__divider {
  position: relative;
  text-align: center;
  margin-bottom: 22px;
}

.absa-login__divider::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  height: 1px;
  background: var(--absa-border-light, #E8E8EC);
}

.absa-login__divider-text {
  position: relative;
  display: inline-block;
  padding: 0 14px;
  background: var(--absa-surface-card, #FFFFFF);
  color: var(--absa-text-muted, #9CA3AF);
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-family: var(--absa-font-mono, 'Space Mono', monospace);
}

/* ── Alerts ── */
.absa-alert {
  padding: 12px 14px;
  font-size: 0.775rem;
  font-weight: 600;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 18px;
  border-radius: var(--absa-radius-sm, 6px);
  font-family: var(--absa-font-mono, 'Space Mono', monospace);
}

.absa-alert--error {
  background: var(--absa-critical-soft, #FEE2E2);
  color: var(--absa-critical, #DC2626);
  border-left: 3px solid var(--absa-critical, #DC2626);
}

.absa-alert--success {
  background: var(--absa-success-soft, #DCFCE7);
  color: var(--absa-success, #16A34A);
  border-left: 3px solid var(--absa-success, #16A34A);
}

.absa-alert--info {
  background: var(--absa-info-soft, #DBEAFE);
  color: var(--absa-info, #2563EB);
  border-left: 3px solid var(--absa-info, #2563EB);
}

.absa-alert__title {
  font-weight: 800;
  margin: 0 0 2px 0;
  font-size: 0.75rem;
}

.absa-alert__desc {
  margin: 0;
  opacity: 0.85;
  font-size: 0.7rem;
}

/* ── Form Fields ── */
.absa-login__form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.absa-field__label {
  display: block;
  font-size: 0.675rem;
  font-weight: 800;
  color: var(--absa-text-secondary, #4B5563);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: var(--absa-font-mono, 'Space Mono', monospace);
}

.absa-field__input-wrap {
  position: relative;
}

.absa-field__icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: var(--absa-text-muted, #9CA3AF);
  pointer-events: none;
  transition: color 0.15s;
}

.absa-field__input-wrap:focus-within .absa-field__icon {
  color: var(--absa-maroon, #BE0F2C);
}

.absa-field__input {
  width: 100%;
  padding: 11px 12px 11px 38px;
  background: var(--absa-surface-page, #F8F8FA);
  border: var(--absa-border-input, 1px solid #D9D9DF);
  font-size: 0.8rem;
  color: var(--absa-text-primary, #111827);
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
  font-family: var(--absa-font-mono, 'Space Mono', monospace);
  border-radius: var(--absa-radius-sm, 6px);
}

.absa-field__input::placeholder {
  color: var(--absa-text-muted, #9CA3AF);
}

.absa-field__input:focus {
  border-color: var(--absa-maroon, #BE0F2C);
  box-shadow: var(--absa-ring-focus, 0 0 0 3px rgba(190, 15, 44, 0.25));
  background: var(--absa-white, #FFFFFF);
}

.absa-field--error .absa-field__input {
  border-color: var(--absa-critical, #DC2626);
  background: var(--absa-critical-soft, #FEE2E2);
}

.absa-field__error {
  margin: 4px 0 0 0;
  font-size: 0.675rem;
  color: var(--absa-critical, #DC2626);
  font-family: var(--absa-font-mono, 'Space Mono', monospace);
}

/* ── Password Toggle ── */
.absa-field__toggle {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
}

.absa-field__toggle-icon {
  width: 16px;
  height: 16px;
  color: var(--absa-text-muted, #9CA3AF);
  transition: color 0.15s;
}

.absa-field__toggle:hover .absa-field__toggle-icon {
  color: var(--absa-maroon, #BE0F2C);
}

/* ── Forgot Password ── */
.absa-login__forgot {
  text-align: right;
}

.absa-login__forgot-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.725rem;
  font-weight: 700;
  color: var(--absa-text-secondary, #4B5563);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-family: var(--absa-font-mono, 'Space Mono', monospace);
  transition: color 0.15s;
}

.absa-login__forgot-link:hover {
  color: var(--absa-maroon, #BE0F2C);
}

/* ── Buttons ── */
.absa-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 800;
  font-size: 0.85rem;
  padding: 12px 24px;
  border: none;
  border-radius: var(--absa-radius-sm, 6px);
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
  font-family: var(--absa-font-main, 'Montserrat', system-ui, sans-serif);
  letter-spacing: 0.02em;
  text-decoration: none;
}

.absa-btn--primary {
  background: var(--absa-maroon-gradient, linear-gradient(135deg, #BE0F2C 0%, #8B0015 100%));
  color: var(--absa-text-inverse, #FFFFFF);
  box-shadow: 0 4px 14px rgba(190, 15, 44, 0.3);
}

.absa-btn--primary:hover {
  background: var(--absa-maroon-deep, #8B0015);
}

.absa-btn--primary:active {
  transform: scale(0.98);
}

.absa-btn--primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.absa-btn--block {
  width: 100%;
}

.absa-btn__spinner {
  animation: absa-spin 0.8s linear infinite;
  width: 16px;
  height: 16px;
}

@keyframes absa-spin {
  to { transform: rotate(360deg); }
}

/* ── Footer Link ── */
.absa-login__footer-link {
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid var(--absa-border-light, #E8E8EC);
  text-align: center;
}

.absa-login__footer-link p {
  font-size: 0.8rem;
  color: var(--absa-text-secondary, #4B5563);
  margin: 0 0 8px 0;
}

.absa-login__create-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  font-weight: 800;
  color: var(--absa-maroon, #BE0F2C);
  text-decoration: none;
  text-transform: uppercase;
  padding: 8px 18px;
  border: 1px solid var(--absa-maroon, #BE0F2C);
  border-radius: var(--absa-radius-sm, 6px);
  transition: background 0.15s, color 0.15s;
  font-family: var(--absa-font-mono, 'Space Mono', monospace);
  letter-spacing: 0.04em;
}

.absa-login__create-link:hover {
  background: var(--absa-maroon, #BE0F2C);
  color: var(--absa-text-inverse, #FFFFFF);
}

/* ════════════════════════════════════════════════════════
   Right: Brand Panel
   ════════════════════════════════════════════════════════ */

.absa-login__brand-panel {
  flex: 1;
  position: relative;
  overflow: hidden;
  display: none;
}

@media (min-width: 1024px) {
  .absa-login__brand-panel {
    display: flex;
    align-items: center;
  }
}

/* ── Brand Background ── */
.absa-login__brand-bg {
  position: absolute;
  inset: 0;
  background: var(--absa-maroon-deep, #8B0015);
}

.absa-login__brand-watermark {
  position: absolute;
  inset: 0;
  width: 120%;
  max-width: none;
  opacity: 0.08;
  filter: blur(2px);
  transform: translateX(20%);
  mix-blend-mode: overlay;
  object-fit: contain;
}

.absa-login__brand-gradient-1 {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 20% 30%, rgba(190, 15, 44, 0.5) 0%, transparent 50%);
}

.absa-login__brand-gradient-2 {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 80% 70%, rgba(190, 15, 44, 0.35) 0%, transparent 50%);
}

.absa-login__brand-gradient-3 {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #8B0015 0%, rgba(190, 15, 44, 0.25) 50%, #8B0015 100%);
}

.absa-login__brand-grid {
  position: absolute;
  inset: 0;
  opacity: 0.1;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
}

/* ── Brand Content ── */
.absa-login__brand-content {
  position: relative;
  z-index: 10;
  width: 100%;
  padding: 0 64px;
}

.absa-login__brand-accent-line {
  border-left: 4px solid var(--absa-maroon, #BE0F2C);
  padding-left: 32px;
  margin-bottom: 40px;
}

.absa-login__brand-status {
  font-family: var(--absa-font-mono, 'Space Mono', monospace);
  font-size: 0.675rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.25em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
}

.absa-login__brand-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--absa-success, #16A34A);
}

.absa-login__brand-title {
  font-size: 2.75rem;
  font-weight: 900;
  color: var(--absa-text-inverse, #FFFFFF);
  margin: 0 0 20px 0;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.absa-login__brand-title-highlight {
  background: linear-gradient(135deg, var(--absa-maroon-light, #E84D5B), var(--absa-white, #FFFFFF));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.absa-login__brand-quote {
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.6;
  font-style: italic;
  font-weight: 300;
  max-width: 420px;
  margin: 0;
}

/* ── Brand Features ── */
.absa-login__brand-features {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-left: 36px;
}

.absa-login__brand-feature {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--absa-font-mono, 'Space Mono', monospace);
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.15s;
}

.absa-login__brand-feature:hover {
  color: rgba(255, 255, 255, 0.95);
}

.absa-login__brand-check {
  width: 28px;
  height: 28px;
  border-radius: var(--absa-radius-sm, 6px);
  background: rgba(190, 15, 44, 0.35);
  border: 1px solid rgba(190, 15, 44, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--absa-white, #FFFFFF);
  flex-shrink: 0;
  transition: background 0.15s;
}

.absa-login__brand-feature:hover .absa-login__brand-check {
  background: var(--absa-maroon, #BE0F2C);
}

/* ── Brand Footer (Binary decoration) ── */
.absa-login__brand-footer {
  position: absolute;
  bottom: 28px;
  right: 28px;
  font-family: var(--absa-font-mono, 'Space Mono', monospace);
  font-size: 0.575rem;
  color: rgba(190, 15, 44, 0.18);
  text-align: right;
  pointer-events: none;
  user-select: none;
  z-index: 10;
}

/* ── Responsive ── */
@media (max-width: 1023px) {
  .absa-login__form-panel {
    border-right: none;
  }

  .absa-login__form-inner {
    padding: 24px 20px;
  }

  .absa-login__brand-panel {
    display: none;
  }
}
</style>