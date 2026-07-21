<template>
  <div class="min-h-screen flex flex-col font-sans relative text-gray-900">
    
    <!-- Mesh Background -->
    <!-- Mesh Background (Fixed to viewport to prevent cutoff on scroll) -->
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-2 h-8 bg-[#2F2E8B] rounded-sm"></div>
          <div>
              <div class="flex items-center gap-2">
                 <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">SYS_ADMIN // CONFIG</span>
              </div>
              <h1 class="text-xl font-black text-gray-900 uppercase tracking-tight">Email Manager</h1>
          </div>
        </div>
        
        <div class="flex items-center gap-3">
           <button 
             @click="loadEmailConfigurations" 
             :disabled="loading"
             class="border border-gray-300 hover:border-gray-400 text-gray-600 px-3 py-1.5 rounded-sm text-xs font-bold font-mono uppercase transition-all flex items-center gap-2 bg-white"
           >
             <i class="fas fa-sync-alt" :class="{ 'animate-spin': loading }"></i> Refresh
           </button>

           <div class="h-6 w-px bg-gray-200 mx-1"></div>

           <button 
             @click="createWelcomeTemplate"
             class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-sm text-xs font-bold font-mono uppercase transition-all flex items-center gap-2"
           >
             <i class="fas fa-magic text-[#2F2E8B]"></i> Welcome Tpl
           </button>

           <button 
             @click="showCreateModal = true" 
             class="bg-[#2F2E8B] hover:bg-[#1D226B] text-white px-4 py-1.5 rounded-sm text-xs font-bold font-mono uppercase shadow-md transition-all flex items-center gap-2"
           >
             <i class="fas fa-plus"></i>
             New Template
           </button>
        </div>
      </div>
    </header>

    <main class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-40 relative z-10">
      
      <!-- Notifications -->
      <div v-if="notification.show" :class="[
        'mb-6 p-4 border rounded-sm text-xs font-bold uppercase flex items-center gap-2 animate-fade-in shadow-sm',
        notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'
      ]">
         <i :class="notification.icon"></i> {{ notification.message }}
         <button @click="notification.show = false" class="ml-auto hover:opacity-75"><i class="fas fa-times"></i></button>
      </div>

      <!-- Loading State -->
      <div v-if="loading && emailConfigurations.length === 0" class="flex flex-col items-center justify-center py-20">
         <div class="w-12 h-12 border-4 border-[#2F2E8B] border-t-transparent rounded-full animate-spin mb-4"></div>
         <span class="text-xs font-mono text-gray-400 uppercase tracking-widest">LOADING_CONFIGS...</span>
      </div>

      <!-- Grid -->
      <div v-else-if="emailConfigurations.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
        <div
          v-for="config in emailConfigurations"
          :key="config.id"
          class="bg-white border border-gray-200 shadow-sm rounded-sm p-6 hover:border-[#2F2E8B] hover:shadow-md transition-all group flex flex-col h-full relative"
          :class="{ 'opacity-60 grayscale': !config.is_active }"
        >
          <!-- Header -->
          <div class="flex justify-between items-start mb-4">
            <div>
               <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight truncate mb-1" :title="config.template_name">{{ config.template_name }}</h3>
               <div class="flex items-center gap-2">
                  <span class="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[9px] font-bold uppercase rounded-sm border border-gray-200">
                    {{ config.template_type }}
                  </span>
                  <span 
                    :class="[
                      'px-1.5 py-0.5 text-[9px] font-bold uppercase rounded-sm border',
                      config.is_active ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'
                    ]"
                  >
                    {{ config.is_active ? 'Active' : 'Inactive' }}
                  </span>
               </div>
            </div>
            <div class="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-sm text-gray-400">
               <i class="fas fa-envelope"></i>
            </div>
          </div>

          <!-- Details -->
          <div class="space-y-3 mb-6 flex-1 bg-gray-50/50 p-3 rounded-sm border border-gray-100/50">
             <div class="flex flex-col">
                <span class="text-[9px] font-mono font-bold text-gray-400 uppercase">Subject</span>
                <span class="text-xs font-medium text-gray-700 truncate" :title="config.subject">{{ config.subject }}</span>
             </div>
             <div class="flex flex-col">
                <span class="text-[9px] font-mono font-bold text-gray-400 uppercase">Sender</span>
                <span class="text-xs font-medium text-gray-700 truncate">{{ config.sender_email }}</span>
             </div>
             <div class="flex flex-col">
                <span class="text-[9px] font-mono font-bold text-gray-400 uppercase">SMTP Host</span>
                <span class="text-xs font-mono text-gray-500 truncate">{{ config.smtp_host }}:{{ config.smtp_port }}</span>
             </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-2 mt-auto pt-4 border-t border-gray-100">
            <button 
              @click="editConfiguration(config)"
              class="flex-1 py-1.5 border border-gray-200 text-gray-600 rounded-sm text-[10px] font-bold uppercase hover:bg-gray-50 transition-colors"
            >
              Edit
            </button>
            <button 
              @click="testConfiguration(config)"
              class="flex-1 py-1.5 border border-gray-200 text-[#2F2E8B] rounded-sm text-[10px] font-bold uppercase hover:bg-blue-50 hover:border-blue-200 transition-colors disabled:opacity-50"
              :disabled="testing === config.id"
            >
              {{ testing === config.id ? 'Sending...' : 'Test Send' }}
            </button>
            <button 
              @click="deleteConfiguration(config)"
              class="w-8 h-8 flex items-center justify-center border border-gray-200 text-red-400 rounded-sm hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <i class="fas fa-trash-alt text-xs"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20 border-2 border-dashed border-gray-200 rounded-sm bg-gray-50/50">
         <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
            <i class="fas fa-envelope-open-text text-2xl"></i>
         </div>
         <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight mb-2">No Configurations</h3>
         <p class="text-xs text-gray-500 font-mono mb-6 max-w-xs mx-auto">Create your first email template to get started.</p>
         <button 
           @click="showCreateModal = true" 
           class="bg-[#2F2E8B] hover:bg-[#1D226B] text-white px-5 py-2 rounded-sm text-xs font-bold font-mono uppercase shadow-md transition-all"
         >
           Create Template
         </button>
      </div>
    </main>

    <!-- Create/Edit Modal -->
    <Teleport to="body">
      <div v-if="showCreateModal || showEditModal" class="absolute inset-0 z-[100] flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeModal"></div>
        
        <!-- Content -->
        <div class="bg-white border border-gray-200 shadow-2xl w-full max-w-4xl flex flex-col max-h-[90vh] rounded-sm relative z-10 animate-scale-in">
           <div class="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
             <div class="flex items-center gap-3">
                <div class="w-1 h-6 bg-[#2F2E8B]"></div>
                <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight">{{ isEditing ? 'Edit Configuration' : 'New Configuration' }}</h3>
             </div>
             <button @click="closeModal" class="text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-sm transition-colors"><i class="fas fa-times"></i></button>
           </div>
           
           <div class="p-6 overflow-y-auto custom-scrollbar flex-1">
             <form @submit.prevent="saveConfiguration" class="space-y-8">
               
               <!-- Basic Info -->
               <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Left Col -->
                  <div class="space-y-4">
                     <h4 class="text-[10px] font-black text-gray-400 uppercase border-b border-gray-100 pb-2 mb-4">Meta Data</h4>
                     <div>
                        <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Template Name *</label>
                        <input v-model="formData.template_name" type="text" required class="w-full border-gray-300 rounded-sm px-3 py-2 text-sm font-bold text-gray-900 focus:ring-[#2F2E8B] focus:border-[#2F2E8B]" placeholder="e.g. welcome_v1">
                     </div>
                     <div>
                        <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Type *</label>
                        <select v-model="formData.template_type" required class="w-full border-gray-300 rounded-sm px-3 py-2 text-sm font-mono font-bold text-gray-900 focus:ring-[#2F2E8B] focus:border-[#2F2E8B]">
                           <option value="">Select Type...</option>
                           <option value="welcome">Welcome</option>
                           <option value="password_reset">Password Reset</option>
                           <option value="email_verification">Email Verification</option>
                           <option value="account_activation">Account Activation</option>
                        </select>
                     </div>
                     
                     <div class="pt-2">
                       <label class="flex items-center space-x-3 cursor-pointer group bg-gray-50 p-3 rounded-sm border border-gray-100">
                          <input type="checkbox" v-model="formData.is_active" class="rounded-sm text-[#2F2E8B] focus:ring-[#2F2E8B] border-gray-300 h-4 w-4">
                          <span class="text-[10px] font-bold text-gray-600 uppercase group-hover:text-[#2F2E8B] transition-colors">Template Active</span>
                       </label>
                     </div>
                  </div>

                  <!-- Right Col -->
                  <div class="space-y-4">
                     <h4 class="text-[10px] font-black text-gray-400 uppercase border-b border-gray-100 pb-2 mb-4">Sender Details</h4>
                     <div>
                        <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Sender Name *</label>
                        <input v-model="formData.sender_name" type="text" required class="w-full border-gray-300 rounded-sm px-3 py-2 text-sm font-medium text-gray-900 focus:ring-[#2F2E8B] focus:border-[#2F2E8B]" placeholder="e.g. Support Team">
                     </div>
                     <div>
                        <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Sender Email *</label>
                        <input v-model="formData.sender_email" type="email" required class="w-full border-gray-300 rounded-sm px-3 py-2 text-sm font-mono text-gray-900 focus:ring-[#2F2E8B] focus:border-[#2F2E8B]" placeholder="noreply@example.com">
                     </div>
                  </div>
               </div>

               <!-- SMTP Config -->
               <div class="bg-gray-50 p-4 border border-gray-100 rounded-sm">
                  <h4 class="text-[10px] font-black text-gray-400 uppercase mb-4 flex items-center gap-2"><i class="fas fa-server"></i> SMTP Configuration</h4>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Host *</label>
                        <input v-model="formData.smtp_host" type="text" required class="w-full border-gray-300 rounded-sm px-3 py-2 text-xs font-mono focus:ring-[#2F2E8B] focus:border-[#2F2E8B]" placeholder="smtp.gmail.com">
                     </div>
                     <div>
                        <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Port *</label>
                        <input v-model.number="formData.smtp_port" type="number" required class="w-full border-gray-300 rounded-sm px-3 py-2 text-xs font-mono focus:ring-[#2F2E8B] focus:border-[#2F2E8B]" placeholder="587">
                     </div>
                     <div>
                        <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Username *</label>
                        <input v-model="formData.smtp_username" type="text" required class="w-full border-gray-300 rounded-sm px-3 py-2 text-xs font-mono focus:ring-[#2F2E8B] focus:border-[#2F2E8B]">
                     </div>
                     <div>
                        <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Password</label>
                        <input v-model="formData.smtp_password" type="password" :placeholder="isEditing ? 'Leave blank to keep current' : 'Required'" class="w-full border-gray-300 rounded-sm px-3 py-2 text-xs font-mono focus:ring-[#2F2E8B] focus:border-[#2F2E8B]">
                     </div>
                     <div class="md:col-span-2 pt-2">
                        <label class="flex items-center space-x-2 cursor-pointer">
                          <input type="checkbox" v-model="formData.smtp_use_tls" class="rounded-sm text-[#2F2E8B] focus:ring-[#2F2E8B] border-gray-300 h-3 w-3">
                          <span class="text-[10px] font-bold text-gray-500 uppercase">Use TLS/STARTTLS</span>
                       </label>
                     </div>
                  </div>
               </div>

               <!-- Content -->
               <div>
                  <h4 class="text-[10px] font-black text-gray-400 uppercase border-b border-gray-100 pb-2 mb-4">Email Content</h4>
                  
                  <div class="mb-4">
                     <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Subject Line *</label>
                     <input v-model="formData.subject" type="text" required class="w-full border-gray-300 rounded-sm px-3 py-2 text-sm font-medium text-gray-900 focus:ring-[#2F2E8B] focus:border-[#2F2E8B]">
                  </div>

                  <div class="mb-2">
                     <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-2">Variables (Click to Insert)</label>
                     <div class="flex flex-wrap gap-2 mb-2">
                        <span 
                          v-for="v in formData.available_variables" 
                          :key="v" 
                          @click="insertVariable(v)"
                          class="px-2 py-1 bg-blue-50 text-[#2F2E8B] border border-blue-100 rounded-sm text-[10px] font-mono font-bold uppercase cursor-pointer hover:bg-blue-100 transition-colors"
                          v-text="'{{' + v + '}}'"
                        >
                        </span>
                     </div>
                  </div>

                  <div class="mb-4">
                     <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">HTML Content *</label>
                     <textarea ref="htmlTemplate" v-model="formData.html_template" required rows="12" class="w-full border-gray-300 rounded-sm p-3 text-xs font-mono text-gray-700 focus:ring-[#2F2E8B] focus:border-[#2F2E8B]" placeholder="<html>...</html>"></textarea>
                  </div>

                  <div>
                     <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Text Content (Optional)</label>
                     <textarea v-model="formData.text_template" rows="6" class="w-full border-gray-300 rounded-sm p-3 text-xs font-mono text-gray-700 focus:ring-[#2F2E8B] focus:border-[#2F2E8B]" placeholder="Plain text version..."></textarea>
                  </div>
               </div>

             </form>
           </div>
           
           <div class="p-4 border-t border-gray-100 flex gap-3 bg-gray-50">
              <button type="button" @click="closeModal" class="flex-1 py-2 border border-gray-300 text-gray-600 rounded-sm text-xs font-bold uppercase hover:bg-white transition-colors">Cancel</button>
              <button 
                type="button" 
                @click="saveConfiguration" 
                :disabled="saving" 
                class="flex-1 py-2 bg-[#2F2E8B] text-white rounded-sm text-xs font-bold uppercase hover:bg-[#1D226B] shadow-md transition-all disabled:opacity-50"
              >
                 <span v-if="saving"><i class="fas fa-spinner animate-spin"></i> Saving...</span>
                 <span v-else>{{ isEditing ? 'Update Config' : 'Create Config' }}</span>
              </button>
           </div>
        </div>
      </div>
    </Teleport>

    <!-- Test Email Modal -->
    <Teleport to="body">
       <div v-if="showTestModal" class="absolute inset-0 z-[110] flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showTestModal = false"></div>
          <div class="bg-white border border-gray-200 shadow-2xl w-full max-w-sm rounded-sm relative z-10 p-6 animate-scale-in">
             <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-2">
                <i class="fas fa-paper-plane text-[#2F2E8B]"></i> Send Test Email
             </h3>
             <p class="text-xs text-gray-500 mb-4">Send a test email to verify configuration.</p>
             
             <div class="mb-6">
                <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Recipient Email</label>
                <input v-model="testEmail" type="email" class="w-full border-gray-300 rounded-sm px-3 py-2 text-sm font-mono focus:ring-[#2F2E8B] focus:border-[#2F2E8B]" placeholder="test@example.com">
             </div>

             <div class="flex gap-3">
                <button @click="showTestModal = false" class="flex-1 py-2 border border-gray-300 text-gray-600 rounded-sm text-xs font-bold uppercase hover:bg-gray-50">Cancel</button>
                <button 
                  @click="sendTestEmail" 
                  :disabled="testing"
                  class="flex-1 py-2 bg-[#2F2E8B] text-white rounded-sm text-xs font-bold uppercase hover:bg-[#1D226B] shadow-md transition-all disabled:opacity-50"
                >
                   {{ testing ? 'Sending...' : 'Send Test' }}
                </button>
             </div>
          </div>
       </div>
    </Teleport>

    <ConfirmDialog
      :open="showDeleteConfirm"
      title="Delete Email Configuration"
      :message="`Are you sure you want to delete ${configToDelete?.template_name || 'this configuration'}?`"
      detail="This removes the template and its SMTP configuration from the tenant."
      variant="danger"
      confirm-label="Delete"
      cancel-label="Cancel"
      @confirm="confirmDeleteConfiguration"
      @cancel="closeDeleteConfirm"
      @close="closeDeleteConfirm"
    />

  </div>
</template>

<script>
import axios from 'axios'
import { API_BASE_URL } from '@/services/api'
import { ConfirmDialog } from '@/components/ui/index.js'

export default {
  name: 'EmailManagement',
  components: {
    ConfirmDialog
  },
  data() {
    return {
      emailConfigurations: [],
      loading: false,
      saving: false,
      testing: null,
      showCreateModal: false,
      showEditModal: false,
      showTestModal: false,
      showDeleteConfirm: false,
      isEditing: false,
      currentConfig: null,
      configToDelete: null,
      testEmail: '',
      newVariable: '',
      formData: {
        template_name: '',
        template_type: '',
        sender_name: '',
        sender_email: '',
        subject: '',
        html_template: '',
        text_template: '',
        smtp_host: '',
        smtp_port: 587,
        smtp_use_tls: true,
        smtp_username: '',
        smtp_password: '',
        available_variables: ['user_name', 'user_email', 'dashboard_url', 'registration_date', 'company_name', 'support_email', 'website_url'],
        is_active: true
      },
      notification: {
        show: false,
        type: 'success',
        message: '',
        icon: 'fas fa-check-circle'
      }
    }
  },
  created() {
    this.loadEmailConfigurations()
  },
  methods: {
    async loadEmailConfigurations() {
      this.loading = true
      try {
        const headers = {}
        if (this.$store && this.$store.getters && this.$store.getters.getToken) {
          headers['Authorization'] = `Bearer ${this.$store.getters.getToken}`
        }
        
        const response = await axios.get(`${API_BASE_URL}/email-management/`, { headers })
        this.emailConfigurations = response.data || []
      } catch (error) {
        console.error('Error loading email configurations:', error)
        this.showNotification('error', 'Error loading email configurations', 'fas fa-exclamation-circle')
      } finally {
        this.loading = false
      }
    },

    createWelcomeTemplate() {
      this.isEditing = false
      this.currentConfig = null
      this.formData = {
      template_name: 'welcome_email',
      template_type: 'welcome',
      sender_name: 'Uniplexity Team',
      sender_email: 'noreply@uniplexity.com',
      subject: 'Welcome to {{company_name}}! 🎉',
      html_template: `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to {{company_name}}</title>
    <style>
      body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
      .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
      .header { text-align: center; padding: 20px 0; border-bottom: 2px solid #2F2E8B; }
      .logo { font-size: 32px; font-weight: bold; color: #2F2E8B; }
      .content { padding: 30px 0; }
      .welcome-text { font-size: 24px; color: #2F2E8B; margin-bottom: 20px; }
      .cta-button { display: inline-block; background-color: #2F2E8B; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
      .footer { border-top: 1px solid #eee; padding-top: 20px; text-align: center; color: #666; font-size: 12px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="logo">{{company_name}}</div>
      </div>
        
      <div class="content">
        <h1 class="welcome-text">Welcome, {{user_name}}! 🎉</h1>
            
        <p>We are thrilled to have you join our platform! Your account has been successfully created and you are now ready to explore all the amazing features we have to offer.</p>
            
        <p><strong>Your Account Details:</strong></p>
        <ul>
          <li><strong>Email:</strong> {{user_email}}</li>
          <li><strong>Registration Date:</strong> {{registration_date}}</li>
        </ul>
            
        <p>Get started by accessing your dashboard:</p>
        <a href="{{dashboard_url}}" class="cta-button">Access Your Dashboard</a>
            
        <p>If you have any questions or need assistance, our support team is here to help. Simply reply to this email or contact us through your dashboard.</p>
            
        <p>Welcome aboard!</p>
        <p><strong>The {{company_name}} Team</strong></p>
      </div>
        
      <div class="footer">
        <p>This is an automated message. Please do not reply to this email.</p>
        <p>&copy; 2024 {{company_name}}. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>`,
      text_template: `Welcome to {{company_name}}, {{user_name}}!

  We're thrilled to have you join our platform! Your account has been successfully created and you're now ready to explore all the amazing features we have to offer.

  Your Account Details:
  - Email: {{user_email}}
  - Registration Date: {{registration_date}}

  Get started by accessing your dashboard: {{dashboard_url}}

  If you have any questions or need assistance, our support team is here to help.

  Welcome aboard!
  The {{company_name}} Team

  ---
  This is an automated message. Please do not reply to this email.
  © 2024 {{company_name}}. All rights reserved.`,
      smtp_host: 'smtp.hostinger.com',
      smtp_port: 587,
      smtp_use_tls: true,
      smtp_username: 'noreply@uniplexity.com',
      smtp_password: '',
      available_variables: ['user_name', 'user_email', 'dashboard_url', 'registration_date', 'company_name', 'support_email', 'website_url'],
      is_active: true
      }
      this.showCreateModal = true
    },

    async createDefaultWelcomeTemplate() {
      // Logic for createDefaultWelcomeTemplate (kept for compatibility)
      this.createWelcomeTemplate(); 
    },

    editConfiguration(config) {
      this.currentConfig = config
      this.isEditing = true
      this.formData = {
        ...config,
        smtp_password: '', // Don't pre-fill password
        available_variables: config.available_variables || ['user_name', 'user_email', 'dashboard_url', 'registration_date', 'company_name', 'support_email', 'website_url']
      }
      this.showEditModal = true
    },

    async saveConfiguration() {
      this.saving = true
      try {
        const url = this.isEditing 
          ? `${API_BASE_URL}/email-management/${this.currentConfig.id}`
          : `${API_BASE_URL}/email-management/`
        
        const method = this.isEditing ? 'put' : 'post'
        
        const headers = {}
        if (this.$store && this.$store.getters && this.$store.getters.getToken) {
          headers['Authorization'] = `Bearer ${this.$store.getters.getToken}`
        }
        
        const response = await axios[method](url, this.formData, { headers })
        
        if (response.data.success) {
          this.showNotification('success', `Email configuration ${this.isEditing ? 'updated' : 'created'} successfully!`)
          this.closeModal()
          this.loadEmailConfigurations()
        } else {
          this.showNotification('error', response.data.error || 'Failed to save configuration', 'fas fa-exclamation-circle')
        }
      } catch (error) {
        console.error('Error saving configuration:', error)
        this.showNotification('error', 'Error saving configuration', 'fas fa-exclamation-circle')
      } finally {
        this.saving = false
      }
    },

    async deleteConfiguration(config) {
      this.configToDelete = config
      this.showDeleteConfirm = true
    },

    closeDeleteConfirm() {
      this.showDeleteConfirm = false
      this.configToDelete = null
    },

    async confirmDeleteConfiguration() {
      if (!this.configToDelete) return

      try {
        const headers = {}
        if (this.$store && this.$store.getters && this.$store.getters.getToken) {
          headers['Authorization'] = `Bearer ${this.$store.getters.getToken}`
        }
        
        const response = await axios.delete(`${API_BASE_URL}/email-management/${this.configToDelete.id}`, { headers })
        
        if (response.data.success) {
          this.showNotification('success', 'Email configuration deleted successfully!')
          this.loadEmailConfigurations()
        } else {
          this.showNotification('error', response.data.error || 'Failed to delete configuration', 'fas fa-exclamation-circle')
        }
      } catch (error) {
        console.error('Error deleting configuration:', error)
        this.showNotification('error', 'Error deleting configuration', 'fas fa-exclamation-circle')
      } finally {
        this.closeDeleteConfirm()
      }
    },

    testConfiguration(config) {
      this.currentConfig = config
      this.testEmail = ''
      this.showTestModal = true
    },

    async sendTestEmail() {
      if (!this.testEmail) {
        this.showNotification('error', 'Please enter a test email address', 'fas fa-exclamation-circle')
        return
      }

      this.testing = this.currentConfig.id
      try {
        const headers = {}
        if (this.$store && this.$store.getters && this.$store.getters.getToken) {
          headers['Authorization'] = `Bearer ${this.$store.getters.getToken}`
        }
        
        const response = await axios.post(`${API_BASE_URL}/email-management/${this.currentConfig.id}/test`, {
          test_email: this.testEmail
        }, { headers })
        
        if (response.data.success) {
          this.showNotification('success', 'Test email sent successfully!')
          this.showTestModal = false
        } else {
          this.showNotification('error', response.data.error || 'Failed to send test email', 'fas fa-exclamation-circle')
        }
      } catch (error) {
        console.error('Error sending test email:', error)
        this.showNotification('error', 'Error sending test email', 'fas fa-exclamation-circle')
      } finally {
        this.testing = null
      }
    },

    closeModal() {
      this.showCreateModal = false
      this.showEditModal = false
      this.isEditing = false
      this.currentConfig = null
      this.resetForm()
    },

    resetForm() {
      this.formData = {
        template_name: '',
        template_type: '',
        sender_name: '',
        sender_email: '',
        subject: '',
        html_template: '',
        text_template: '',
        smtp_host: '',
        smtp_port: 587,
        smtp_use_tls: true,
        smtp_username: '',
        smtp_password: '',
        available_variables: ['user_name', 'user_email', 'dashboard_url', 'registration_date', 'company_name', 'support_email', 'website_url'],
        is_active: true
      }
    },

    insertVariable(variable) {
      const template = `{{${variable}}}`
      if (this.$refs.htmlTemplate) {
        const textarea = this.$refs.htmlTemplate
        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const text = textarea.value
        
        textarea.value = text.substring(0, start) + template + text.substring(end)
        this.formData.html_template = textarea.value
        
        // Move cursor after inserted text
        this.$nextTick(() => {
          textarea.selectionStart = textarea.selectionEnd = start + template.length
          textarea.focus()
        })
      }
    },

    showNotification(type, message, icon = null) {
      this.notification = {
        show: true,
        type,
        message,
        icon: icon || (type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle')
      }
      
      setTimeout(() => {
        this.notification.show = false
      }, 5000)
    }
  }
}
</script>

<style scoped>
/* Mesh Background Pattern */
.mesh-background {
  background-color: #ffffff;
  background-image: 
    linear-gradient(#f3f4f6 1px, transparent 1px),
    linear-gradient(90deg, #f3f4f6 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: center center;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #c1c1c1; 
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8; 
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}

@keyframes scale-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-scale-in {
  animation: scale-in 0.2s ease-out forwards;
}
</style>