<template>
  <div v-if="modelValue" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between p-6 border-b">
        <h3 class="text-xl font-bold text-gray-800">Send Message</h3>
        <button @click="$emit('update:modelValue', false)" class="text-gray-500 hover:text-gray-700 transition">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>
      <form @submit.prevent="$emit('send', localForm)" class="p-6 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Contact *</label>
            <select v-model="localForm.contactId" required class="w-full rounded-lg border-gray-300 shadow-none focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]">
              <option value="">Select Contact</option>
              <option v-for="lead in leads" :key="lead.id" :value="lead.id">{{ lead.name }} ({{ lead.company }})</option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Type *</label>
            <select v-model="localForm.type" required class="w-full rounded-lg border-gray-300 shadow-none focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]">
              <option value="email">Email</option>
              <option value="call">Phone Call</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="meeting">Meeting</option>
            </select>
          </div>
        </div>
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Subject</label>
          <input v-model="localForm.subject" type="text" class="w-full rounded-lg border-gray-300 shadow-none focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]" />
        </div>
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Message *</label>
          <textarea v-model="localForm.message" required rows="6" class="w-full rounded-lg border-gray-300 shadow-none focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]" placeholder="Type your message here..."></textarea>
        </div>
        <div class="flex justify-end gap-3">
          <button type="button" @click="$emit('update:modelValue', false)" class="px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
          <button type="submit" :disabled="loading" class="px-4 py-2 bg-[#2F2E8B] text-white rounded-lg hover:bg-[#3D2F88] disabled:opacity-50">
            {{ loading ? 'Sending...' : 'Send Message' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  leads: { type: Array, default: () => [] },
  form: { type: Object, default: () => ({ contactId: '', type: 'email', subject: '', message: '' }) },
  loading: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'send'])

const localForm = reactive({ ...props.form })

watch(() => props.form, (val) => {
  Object.assign(localForm, val || {})
})
</script>
