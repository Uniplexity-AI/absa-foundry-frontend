<template>
  <input
    type="checkbox"
    :checked="modelValue"
    :indeterminate="indeterminate"
    @change="$emit('update:modelValue', $event.target.checked)"
    class="rounded-sm border-gray-300 text-[var(--brand-primary)] focus:ring-[var(--brand-primary)] cursor-pointer"
  />
</template>

<script setup>
defineProps({
  modelValue: { type: Boolean, default: false },
  indeterminate: { type: Boolean, default: false }
})
defineEmits(['update:modelValue'])
</script>
