<template>
  <section class="absa-profile-settings">
    <div class="settings-shell">
      <nav class="settings-breadcrumb" aria-label="Breadcrumb">
        <router-link to="/dashboard/home">Home</router-link>
        <span aria-hidden="true">/</span>
        <span>Settings</span>
        <span aria-hidden="true">/</span>
        <strong>{{ activeTabLabel }}</strong>
      </nav>

      <div class="settings-layout">
        <aside class="settings-tabs" aria-label="Settings sections">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            type="button"
            class="settings-tab"
            :class="{ 'settings-tab--active': activeTab === tab.id }"
            :aria-controls="tab.sectionId"
            @click="goToSection(tab)"
          >
            <span class="settings-tab__icon" aria-hidden="true">
              <i :class="tab.icon"></i>
            </span>
            <span>{{ tab.label }}</span>
          </button>
        </aside>

        <div class="settings-content">
          <section id="personal-information" class="settings-card">
            <div class="settings-card__header">
              <div>
                <p class="eyebrow">Profile</p>
                <h1>Personal Information</h1>
              </div>
              <button type="button" class="btn btn--secondary" @click="isEditing = !isEditing">
                {{ isEditing ? 'Cancel editing' : 'Edit profile' }}
              </button>
            </div>

            <div class="profile-grid">
              <div class="avatar-panel">
                <div class="avatar-ring">
                  <div class="avatar">{{ userInitials }}</div>
                </div>
                <button type="button" class="avatar-action">Change photo</button>
              </div>

              <div class="form-grid">
                <label class="field">
                  <span>Full Name</span>
                  <input v-model="profile.fullName" :readonly="!isEditing" type="text" />
                </label>
                <label class="field">
                  <span>Email Address</span>
                  <input v-model="profile.email" :readonly="!isEditing" type="email" />
                </label>
                <label class="field">
                  <span>Department</span>
                  <select v-model="profile.department" :disabled="!isEditing">
                    <option>High-Risk Compliance</option>
                    <option>Relationship Banking</option>
                    <option>Credit Risk</option>
                    <option>Operations</option>
                  </select>
                </label>
                <label class="field">
                  <span>Role</span>
                  <select v-model="profile.role" :disabled="!isEditing">
                    <option>Senior KYC Analyst</option>
                    <option>Relationship Manager</option>
                    <option>Branch Manager</option>
                    <option>Administrator</option>
                  </select>
                </label>
                <label class="field">
                  <span>Employee ID</span>
                  <input v-model="profile.employeeId" :readonly="!isEditing" type="text" />
                </label>
                <label class="field">
                  <span>Locale / Timezone</span>
                  <select v-model="profile.timezone" :disabled="!isEditing">
                    <option>Lusaka, Zambia (GMT+2)</option>
                    <option>Johannesburg, South Africa (GMT+2)</option>
                    <option>London, United Kingdom (GMT+0)</option>
                  </select>
                </label>
              </div>
            </div>
          </section>

          <section id="security-authentication" class="settings-card">
            <div class="settings-card__header">
              <div>
                <p class="eyebrow">Access control</p>
                <h2>Security &amp; Authentication</h2>
              </div>
            </div>

            <div class="security-grid">
              <article class="mfa-card">
                <div class="mfa-card__top">
                  <div class="mfa-card__icon">
                    <i class="fas fa-shield-halved"></i>
                  </div>
                  <div>
                    <h3>Multi-factor authentication</h3>
                    <span>Enforced</span>
                  </div>
                </div>
                <p>MFA is enforced across your organization. Last updated on Oct 12, 2023.</p>
                <button type="button">Manage MFA policy</button>
              </article>

              <form class="password-panel" @submit.prevent="passwordQueued = true">
                <label class="field">
                  <span>Update Password</span>
                  <div class="password-input">
                    <input
                      v-model="newPassword"
                      :type="showPassword ? 'text' : 'password'"
                      autocomplete="new-password"
                      placeholder="Enter new password"
                    />
                    <button type="button" @click="showPassword = !showPassword" :aria-label="showPassword ? 'Hide password' : 'Show password'">
                      <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                    </button>
                  </div>
                </label>
                <button type="submit" class="btn btn--primary">Update Password</button>
                <p v-if="passwordQueued" class="inline-feedback">Password update queued for secure confirmation.</p>
              </form>
            </div>

            <div class="device-section">
              <h3>Authorized Devices</h3>
              <div class="device-table" role="table" aria-label="Authorized devices">
                <div class="device-row device-row--head" role="row">
                  <span>Device</span>
                  <span>Location</span>
                  <span>Last active</span>
                  <span>Action</span>
                </div>
                <div v-for="device in devices" :key="device.name" class="device-row" role="row">
                  <span>
                    <i :class="device.icon"></i>
                    {{ device.name }}
                  </span>
                  <span>{{ device.location }}</span>
                  <span>{{ device.lastActive }}</span>
                  <button type="button">Revoke</button>
                </div>
              </div>
            </div>
          </section>

          <section id="roles-permissions" class="settings-card">
            <div class="settings-card__header">
              <div>
                <p class="eyebrow">Permissions</p>
                <h2>Roles &amp; Access</h2>
              </div>
              <button type="button" class="btn btn--secondary" @click="roleDraftOpen = !roleDraftOpen">
                {{ roleDraftOpen ? 'Close editor' : 'Create role' }}
              </button>
            </div>

            <div class="roles-grid">
              <article v-for="role in roles" :key="role.id" class="role-card">
                <div class="role-card__top">
                  <div>
                    <h3>{{ role.name }}</h3>
                    <p>{{ role.description }}</p>
                  </div>
                  <span class="role-count">{{ role.users }} users</span>
                </div>
                <div class="permission-chips" :aria-label="`${role.name} permissions`">
                  <span v-for="permission in role.permissions" :key="permission">{{ permission }}</span>
                </div>
                <div class="role-card__actions">
                  <button type="button">Edit role</button>
                  <button type="button">Audit access</button>
                </div>
              </article>
            </div>

            <form v-if="roleDraftOpen" class="role-editor" @submit.prevent="roleDraftOpen = false">
              <label class="field">
                <span>Role name</span>
                <input v-model="roleDraft.name" type="text" placeholder="e.g. Compliance Reviewer" />
              </label>
              <label class="field">
                <span>Access level</span>
                <select v-model="roleDraft.level">
                  <option>Read only</option>
                  <option>Reviewer</option>
                  <option>Approver</option>
                  <option>Administrator</option>
                </select>
              </label>
              <button type="submit" class="btn btn--primary">Save Role Draft</button>
            </form>
          </section>

          <section id="notification-preferences" class="settings-card">
            <div class="settings-card__header">
              <div>
                <p class="eyebrow">Channels</p>
                <h2>Notification Preferences</h2>
              </div>
            </div>

            <div class="notification-list">
              <div v-for="item in notificationPreferences" :key="item.id" class="notification-row">
                <div>
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.description }}</p>
                </div>
                <div class="channel-toggles" :aria-label="`${item.title} channels`">
                  <label class="switch-field">
                    <span>Email</span>
                    <input v-model="item.email" type="checkbox" />
                    <span class="switch-control" aria-hidden="true"></span>
                  </label>
                  <label class="switch-field">
                    <span>Mobile</span>
                    <input v-model="item.mobile" type="checkbox" />
                    <span class="switch-control" aria-hidden="true"></span>
                  </label>
                </div>
              </div>
            </div>
          </section>

          <section id="integrations" class="settings-card">
            <div class="settings-card__header">
              <div>
                <p class="eyebrow">Connected systems</p>
                <h2>Integrations</h2>
              </div>
            </div>

            <div class="integrations-list">
              <article v-for="integration in integrations" :key="integration.id" class="integration-row">
                <div class="integration-row__icon">
                  <i :class="integration.icon"></i>
                </div>
                <div>
                  <h3>{{ integration.name }}</h3>
                  <p>{{ integration.description }}</p>
                </div>
                <div class="integration-row__status">
                  <span :class="['status-pill', integration.connected ? 'status-pill--connected' : 'status-pill--muted']">
                    {{ integration.connected ? 'Connected' : 'Available' }}
                  </span>
                  <button type="button" class="btn btn--secondary">
                    {{ integration.connected ? 'Manage' : 'Connect' }}
                  </button>
                </div>
              </article>
            </div>
          </section>

          <div class="save-panel">
            <button type="button" class="btn btn--primary btn--large" @click="saveSettings">
              Save Settings
            </button>
            <p v-if="savedAt">Saved locally at {{ savedAt }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { decodeJWT } from '@/services/decodeJWT.js'

const activeTab = ref('personal')
const isEditing = ref(false)
const newPassword = ref('')
const showPassword = ref(false)
const passwordQueued = ref(false)
const savedAt = ref('')

function getJwtValue(methodName, fallback) {
  try {
    return decodeJWT()?.[methodName]?.() || fallback
  } catch {
    return fallback
  }
}

const defaultEmail = getJwtValue('getUserEmail', 'sbwalya@uniplexity.ai')
const defaultRole = getJwtValue('getUserRole', 'Senior KYC Analyst')
const derivedName = defaultEmail.includes('@')
  ? defaultEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
  : 'Sarah Bwalya'

const profile = reactive({
  fullName: derivedName || 'Sarah Bwalya',
  email: defaultEmail,
  department: 'High-Risk Compliance',
  role: defaultRole === 'User' ? 'Senior KYC Analyst' : defaultRole,
  employeeId: 'UX-7742-KYC',
  timezone: 'Lusaka, Zambia (GMT+2)',
})

const userInitials = computed(() => {
  return profile.fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase())
    .join('') || 'SB'
})

const tabs = [
  { id: 'personal', label: 'Personal Information', icon: 'fas fa-user', sectionId: 'personal-information' },
  { id: 'security', label: 'Security & Authentication', icon: 'fas fa-lock', sectionId: 'security-authentication' },
  { id: 'roles', label: 'Roles', icon: 'fas fa-id-badge', sectionId: 'roles-permissions' },
  { id: 'notifications', label: 'Notifications', icon: 'fas fa-bell', sectionId: 'notification-preferences' },
  { id: 'integrations', label: 'Integrations', icon: 'fas fa-plug', sectionId: 'integrations' },
]

const activeTabLabel = computed(() => tabs.find(tab => tab.id === activeTab.value)?.label || 'Personal Information')

const devices = [
  { name: 'Chrome on Windows', location: 'Lusaka, Zambia (Current)', lastActive: 'Now', icon: 'fas fa-desktop' },
  { name: 'iPhone 15 Pro', location: 'Lusaka, Zambia', lastActive: '2h ago', icon: 'fas fa-mobile-screen' },
]

const roleDraftOpen = ref(false)
const roleDraft = reactive({
  name: '',
  level: 'Reviewer',
})

const roles = [
  {
    id: 'admin',
    name: 'Administrator',
    description: 'Full settings ownership, user management, and system configuration.',
    users: 2,
    permissions: ['All modules', 'Users', 'Billing', 'Audit logs'],
  },
  {
    id: 'kyc-analyst',
    name: 'KYC Analyst',
    description: 'Can review customers, update cases, and receive risk notifications.',
    users: 14,
    permissions: ['Cases', 'Documents', 'Risk signals'],
  },
  {
    id: 'approver',
    name: 'Compliance Approver',
    description: 'Can approve escalations, review exceptions, and revoke sessions.',
    users: 5,
    permissions: ['Approvals', 'Security', 'Reports'],
  },
]

const notificationPreferences = reactive([
  {
    id: 'case-alerts',
    title: 'Case alerts',
    description: 'New assignments, status changes, and SLA risk updates.',
    email: true,
    mobile: true,
  },
  {
    id: 'approval-requests',
    title: 'Approval requests',
    description: 'Reviews that require your decision or escalation.',
    email: true,
    mobile: true,
  },
  {
    id: 'risk-thresholds',
    title: 'Risk threshold changes',
    description: 'Material changes in KYC risk score, flags, or sanctions match confidence.',
    email: false,
    mobile: true,
  },
  {
    id: 'reports',
    title: 'Reports',
    description: 'Scheduled compliance, portfolio, and operational summary reports.',
    email: false,
    mobile: true,
  },
])

const integrations = [
  {
    id: 'core-banking',
    name: 'Core Banking',
    description: 'Sync customer profile, account, and branch context into KYC workflows.',
    connected: true,
    icon: 'fas fa-building-columns',
  },
  {
    id: 'email',
    name: 'Email Gateway',
    description: 'Send approval notices, case assignments, and scheduled reports.',
    connected: true,
    icon: 'fas fa-envelope',
  },
  {
    id: 'document-store',
    name: 'Document Store',
    description: 'Archive KYC files, verification documents, and audit attachments.',
    connected: false,
    icon: 'fas fa-folder-open',
  },
  {
    id: 'webhooks',
    name: 'Webhook Events',
    description: 'Publish case, risk, and approval events to downstream systems.',
    connected: false,
    icon: 'fas fa-code-branch',
  },
]

function goToSection(tab) {
  activeTab.value = tab.id
  requestAnimationFrame(() => {
    const target = document.getElementById(tab.sectionId)
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

function saveSettings() {
  savedAt.value = new Intl.DateTimeFormat('en-ZM', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date())
  isEditing.value = false
}
</script>

<style scoped>
.absa-profile-settings {
  min-height: 100%;
  color: var(--absa-text-primary, #111827);
}

.settings-shell {
  max-width: 972px;
  margin: 0 auto;
}

.settings-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  color: var(--absa-text-muted, #9ca3af);
  font-size: 0.78rem;
  font-weight: 700;
}

.settings-breadcrumb a {
  color: var(--absa-text-secondary, #4b5563);
  text-decoration: none;
}

.settings-breadcrumb strong {
  color: var(--absa-maroon, #be0f2c);
}

.settings-layout {
  display: grid;
  grid-template-columns: 256px minmax(0, 1fr);
  gap: 16px;
  align-items: start;
}

.settings-tabs {
  position: sticky;
  top: 88px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.settings-tab {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-height: 44px;
  padding: 0 16px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: var(--absa-text-secondary, #4b5563);
  font-size: 0.88rem;
  font-weight: 700;
  text-align: left;
  cursor: pointer;
  transition: background 160ms ease, color 160ms ease, transform 160ms ease;
}

.settings-tab:hover {
  background: var(--absa-surface-hover, #f3f4f6);
}

.settings-tab--active {
  background: var(--absa-maroon, #be0f2c);
  color: #fff;
  box-shadow: 0 10px 24px rgba(190, 15, 44, 0.18);
}

.settings-tab__icon {
  width: 20px;
  text-align: center;
}

.settings-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 700px;
}

.settings-card,
.save-panel {
  background: var(--absa-surface-card, #fff);
  border: 1px solid var(--absa-border-light, #e8e8ec);
  border-radius: 14px;
  box-shadow: 0 1px 2px rgba(17, 24, 39, 0.04);
}

.settings-card {
  padding: 25px;
  scroll-margin-top: 88px;
}

.settings-card__header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 32px;
}

.eyebrow {
  margin: 0 0 4px;
  color: var(--absa-maroon, #be0f2c);
  font-size: 0.68rem;
  font-weight: 900;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1,
h2 {
  margin-bottom: 0;
  color: var(--absa-text-primary, #111827);
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: -0.03em;
}

h3, h4 {
  margin-bottom: 0;
  color: var(--absa-text-primary, #111827);
  font-weight: 600;
}

.profile-grid {
  display: grid;
  grid-template-columns: 128px minmax(0, 1fr);
  gap: 48px;
}

.avatar-panel {
  text-align: center;
}

.avatar-ring {
  width: 128px;
  height: 128px;
  padding: 4px;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(190, 15, 44, 0.12), rgba(139, 0, 21, 0.28));
  box-shadow: 0 14px 32px rgba(17, 24, 39, 0.14);
}

.avatar {
  display: grid;
  width: 120px;
  height: 120px;
  place-items: center;
  border-radius: 999px;
  background: var(--absa-maroon-gradient, linear-gradient(135deg, #be0f2c 0%, #8b0015 100%));
  color: #fff;
  font-size: 2rem;
  font-weight: 900;
}

.avatar-action,
.mfa-card button,
.device-row button {
  border: 0;
  background: transparent;
  color: var(--absa-maroon, #be0f2c);
  cursor: pointer;
  font-weight: 800;
}

.avatar-action {
  margin-top: 16px;
  font-size: 0.78rem;
}

.form-grid,
.security-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 24px;
  row-gap: 24px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field span {
  color: var(--absa-text-secondary, #4b5563);
  font-size: 0.78rem;
  font-weight: 800;
}

.field input,
.field select {
  width: 100%;
  min-height: 42px;
  border: 1px solid var(--absa-divider, #d9d9df);
  border-radius: 9px;
  background: #fff;
  color: var(--absa-text-primary, #111827);
  font: inherit;
  font-size: 0.9rem;
  padding: 0 12px;
  outline: none;
  transition: border 160ms ease, box-shadow 160ms ease, background 160ms ease;
}

.field input[readonly],
.field select:disabled {
  background: #fafafa;
  color: #374151;
  opacity: 1;
}

.field input:focus,
.field select:focus {
  border-color: var(--absa-maroon, #be0f2c);
  box-shadow: var(--absa-ring-focus, 0 0 0 3px rgba(190, 15, 44, 0.25));
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  border-radius: 9px;
  padding: 0 18px;
  font-size: 0.8rem;
  font-weight: 900;
  cursor: pointer;
  transition: transform 160ms ease, background 160ms ease, border 160ms ease;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn--primary {
  border: 1px solid var(--absa-maroon, #be0f2c);
  background: var(--absa-maroon, #be0f2c);
  color: #fff;
}

.btn--secondary {
  border: 1px solid var(--absa-divider, #d9d9df);
  background: #fff;
  color: var(--absa-maroon, #be0f2c);
}

.btn--large {
  min-height: 52px;
  min-width: 232px;
  padding: 0 32px;
  border-radius: 14px;
  font-size: 1rem;
}

.security-grid {
  grid-template-columns: 309px 309px;
  gap: 32px;
}

.mfa-card {
  border: 1px solid var(--absa-border-light, #e8e8ec);
  border-radius: 14px;
  padding: 16px;
  background: linear-gradient(180deg, #fff 0%, #fff7f8 100%);
}

.mfa-card,
.password-panel {
  min-height: 158px;
}

.mfa-card__top {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 14px;
}

.mfa-card__icon {
  display: grid;
  width: 40px;
  height: 40px;
  place-items: center;
  border-radius: 12px;
  background: var(--absa-maroon-soft, #fde8ec);
  color: var(--absa-maroon, #be0f2c);
}

.mfa-card h3,
.notification-row h3 {
  margin-bottom: 2px;
  font-size: 0.88rem;
  font-weight: 600;
}

.mfa-card span {
  color: var(--absa-success, #16a34a);
  font-size: 0.75rem;
  font-weight: 900;
}

.mfa-card p,
.notification-row p,
.save-panel p {
  color: var(--absa-text-secondary, #4b5563);
  font-size: 0.82rem;
  line-height: 1.45;
}

.password-panel {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.password-input {
  position: relative;
}

.password-input input {
  padding-right: 44px;
}

.password-input button {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 34px;
  height: 34px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--absa-text-muted, #9ca3af);
  cursor: pointer;
}

.inline-feedback {
  margin-bottom: 0;
  color: var(--absa-success, #16a34a);
  font-size: 0.78rem;
  font-weight: 800;
}

.device-section {
  margin-top: 24px;
}

.device-section h3 {
  margin-bottom: 12px;
  color: var(--absa-text-secondary, #4b5563);
  font-size: 0.76rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.device-table {
  overflow: hidden;
  border: 1px solid var(--absa-border-light, #e8e8ec);
  border-radius: 12px;
}

.device-row {
  display: grid;
  grid-template-columns: 2fr 1.65fr 1fr 0.75fr;
  min-height: 44px;
  align-items: center;
  border-top: 1px solid var(--absa-border-light, #e8e8ec);
  color: var(--absa-text-secondary, #4b5563);
  font-size: 0.83rem;
}

.device-row:first-child {
  border-top: 0;
}

.device-row > * {
  padding: 0 12px;
}

.device-row span:first-child {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--absa-text-primary, #111827);
  font-weight: 800;
}

.device-row--head {
  min-height: 38px;
  background: #fafafa;
  color: var(--absa-text-muted, #9ca3af);
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.roles-grid {
  display: grid;
  gap: 12px;
}

.role-card {
  border: 1px solid var(--absa-border-light, #e8e8ec);
  border-radius: 14px;
  padding: 16px;
  background: #fff;
}

.role-card__top {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
}

.role-card h3,
.integration-row h3 {
  margin-bottom: 4px;
  color: var(--absa-text-primary, #111827);
  font-size: 0.92rem;
  font-weight: 600;
}

.role-card p,
.integration-row p {
  margin-bottom: 0;
  color: var(--absa-text-secondary, #4b5563);
  font-size: 0.82rem;
  line-height: 1.45;
}

.role-count {
  flex-shrink: 0;
  border-radius: 999px;
  background: var(--absa-maroon-soft, #fde8ec);
  color: var(--absa-maroon, #be0f2c);
  padding: 4px 10px;
  font-size: 0.7rem;
  font-weight: 900;
}

.permission-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.permission-chips span {
  border: 1px solid var(--absa-border-light, #e8e8ec);
  border-radius: 999px;
  background: #fafafa;
  color: var(--absa-text-secondary, #4b5563);
  padding: 5px 10px;
  font-size: 0.72rem;
  font-weight: 800;
}

.role-card__actions {
  display: flex;
  gap: 16px;
  margin-top: 14px;
}

.role-card__actions button {
  border: 0;
  background: transparent;
  color: var(--absa-maroon, #be0f2c);
  cursor: pointer;
  font-size: 0.78rem;
  font-weight: 900;
  padding: 0;
}

.role-editor {
  display: grid;
  grid-template-columns: 1fr 1fr max-content;
  gap: 14px;
  align-items: end;
  margin-top: 16px;
  border-top: 1px solid var(--absa-border-light, #e8e8ec);
  padding-top: 16px;
}

.notification-list {
  display: flex;
  flex-direction: column;
}

.notification-row {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: center;
  min-height: 79px;
  border-top: 1px solid var(--absa-border-light, #e8e8ec);
}

.notification-row:first-child {
  border-top: 0;
}

.notification-row p {
  margin-bottom: 0;
}

.channel-toggles {
  display: grid;
  grid-template-columns: 76px 84px;
  gap: 32px;
  flex-shrink: 0;
}

.switch-field {
  position: relative;
  display: grid;
  grid-template-columns: max-content 40px;
  align-items: center;
  gap: 8px;
  color: var(--absa-text-secondary, #4b5563);
  font-size: 0.72rem;
  font-weight: 900;
  cursor: pointer;
  user-select: none;
}

.switch-field input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

.switch-control {
  position: relative;
  width: 40px;
  height: 24px;
  border-radius: 999px;
  background: #e5e7eb;
  box-shadow: inset 0 0 0 1px rgba(17, 24, 39, 0.08);
  transition: background 160ms ease, box-shadow 160ms ease;
}

.switch-control::after {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  border-radius: 999px;
  background: #fff;
  box-shadow: 0 2px 5px rgba(17, 24, 39, 0.22);
  content: '';
  transition: transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.switch-field input:checked + .switch-control {
  background: var(--absa-maroon, #be0f2c);
  box-shadow: inset 0 0 0 1px rgba(190, 15, 44, 0.2);
}

.switch-field input:checked + .switch-control::after {
  transform: translateX(16px);
}

.switch-field input:focus-visible + .switch-control {
  box-shadow: var(--absa-ring-focus, 0 0 0 3px rgba(190, 15, 44, 0.25));
}

.integrations-list {
  display: grid;
  gap: 12px;
}

.integration-row {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr) auto;
  gap: 14px;
  align-items: center;
  border: 1px solid var(--absa-border-light, #e8e8ec);
  border-radius: 14px;
  padding: 14px;
  background: #fff;
}

.integration-row__icon {
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  border-radius: 12px;
  background: var(--absa-maroon-soft, #fde8ec);
  color: var(--absa-maroon, #be0f2c);
}

.integration-row__status {
  display: flex;
  align-items: center;
  gap: 10px;
}

.status-pill {
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 0.7rem;
  font-weight: 900;
}

.status-pill--connected {
  background: var(--absa-success-soft, #dcfce7);
  color: var(--absa-success, #16a34a);
}

.status-pill--muted {
  background: var(--absa-neutral-soft, #f3f4f6);
  color: var(--absa-neutral, #6b7280);
}

.save-panel {
  display: flex;
  align-items: center;
  gap: 18px;
  min-height: 100px;
  padding: 24px 0;
  border: 0;
  background: transparent;
  box-shadow: none;
}

.save-panel p {
  margin-bottom: 0;
  font-weight: 800;
}

@media (max-width: 980px) {
  .settings-layout {
    grid-template-columns: 1fr;
  }

  .settings-content {
    max-width: none;
  }

  .settings-tabs {
    position: static;
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 4px;
  }

  .settings-tab {
    width: auto;
    white-space: nowrap;
  }

  .security-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .role-editor,
  .integration-row {
    grid-template-columns: 1fr;
  }

  .integration-row__status {
    justify-content: space-between;
  }
}

@media (max-width: 760px) {
  .settings-card {
    padding: 18px;
  }

  .settings-card__header,
  .profile-grid,
  .notification-row,
  .save-panel {
    align-items: stretch;
    flex-direction: column;
  }

  .profile-grid,
  .form-grid,
  .security-grid {
    grid-template-columns: 1fr;
  }

  .avatar-panel {
    text-align: left;
  }

  .device-row {
    grid-template-columns: 1fr;
    gap: 6px;
    padding: 12px 0;
  }

  .device-row--head {
    display: none;
  }

  .channel-toggles {
    grid-template-columns: 1fr 1fr;
    justify-content: space-between;
  }

  .role-card__top,
  .role-card__actions,
  .integration-row__status {
    align-items: stretch;
    flex-direction: column;
  }
}
</style>
