<template>
  <div v-if="modelValue" class="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md flex items-center justify-center z-[100000] p-4">
    <div class="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border-2 border-[#2F2E8B]">
      <div class="flex items-center justify-between p-6 border-b">
        <h3 class="text-xl font-bold text-gray-800">Import Leads</h3>
        <button @click="$emit('update:modelValue', false)" class="text-gray-500 hover:text-gray-700 transition">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>
      <div class="p-6">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue'])
</script>
