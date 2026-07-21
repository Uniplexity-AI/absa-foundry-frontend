<template>
  <div class="relative" ref="containerRef">
    <label v-if="label" class="block text-xs font-semibold text-gray-500 mb-1.5 ml-0.5">
      {{ label }}
    </label>
    
    <div 
      @click="toggleDropdown"
      class="w-full border border-gray-200 rounded-sm bg-white relative flex items-center min-h-[42px] transition-all hover:border-[#2F2E8B] cursor-pointer group"
      :class="{ 'ring-2 ring-[#2F2E8B]/20 border-[#2F2E8B]': isOpen }"
    >
      <Search class="text-gray-400 ml-3 shrink-0 group-hover:text-[#2F2E8B] transition-colors" :size="14" />
      
      <input
        ref="inputRef"
        type="text"
        v-model="searchQuery"
        @input="isOpen = true"
        @focus="isOpen = true"
        :placeholder="modelValue || placeholder"
        class="w-full px-3 py-2 bg-transparent focus:outline-none text-sm text-gray-700 placeholder-gray-400 cursor-pointer"
      />
      
      <div class="flex items-center gap-1 mr-2">
        <button 
          v-if="modelValue || searchQuery" 
          @click.stop="clearSelection" 
          type="button"
          class="text-gray-400 hover:text-red-500 p-1 transition-colors"
        >
          <X :size="14" />
        </button>
        <div class="text-gray-400 group-hover:text-[#2F2E8B] transition-colors mr-1">
          <ChevronDown :size="14" />
        </div>
      </div>
    </div>

    <!-- Dropdown -->
    <div 
      v-if="isOpen" 
      class="absolute z-[100] mt-1 w-full bg-white border border-gray-200 rounded-sm shadow-xl max-h-60 overflow-y-auto divide-y divide-gray-100 animate-dropdown-in pointer-events-auto"
    >
      <ul v-if="filteredOptions.length > 0" class="py-1">
          <li 
            v-for="option in filteredOptions" 
            :key="option"
            @click="selectOption(option)"
            class="px-4 py-2.5 hover:bg-gray-50 cursor-pointer flex items-center justify-between group transition-colors"
            :class="{'bg-[#2F2E8B]/5': modelValue === option}"
          >
            <span class="text-sm text-gray-700">
              {{ option }}
            </span>
            <Check v-if="modelValue === option" class="text-[#2F2E8B]" :size="14" />
          </li>
        </ul>
        <!-- Allow custom value if not in list -->
        <div 
          v-if="searchQuery && !filteredOptions.includes(searchQuery)" 
          @click="selectOption(searchQuery)"
          class="px-4 py-3 hover:bg-gray-50 cursor-pointer border-t border-gray-100 group transition-colors"
        >
          <div class="flex items-center gap-2">
            <Plus :size="14" class="text-[#2F2E8B]" />
            <span class="text-sm text-gray-700">
              Use "{{ searchQuery }}"
            </span>
          </div>
        </div>
        <div v-if="!filteredOptions.length && !searchQuery" class="px-4 py-4 text-sm text-gray-400 text-center">
          No options found
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { Search, X, ChevronDown, Check, Plus } from 'lucide-vue-next';

const props = defineProps({
  modelValue: { type: String, default: '' },
  options: { type: Array, default: () => [] },
  label: { type: String, default: '' },
  placeholder: { type: String, default: 'Select option...' }
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const searchQuery = ref('');
const containerRef = ref(null);
const inputRef = ref(null);
const dropdownStyle = ref({});

const filteredOptions = computed(() => {
  if (!searchQuery.value) return props.options;
  const query = searchQuery.value.toLowerCase();
  return props.options.filter(opt => opt.toLowerCase().includes(query));
});

function toggleDropdown() {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    updateDropdownPosition();
    nextTick(() => inputRef.value?.focus());
  }
}

function updateDropdownPosition() {
  if (containerRef.value) {
    const rect = containerRef.value.getBoundingClientRect();
    // For fixed position, we use viewport coordinates directly
    dropdownStyle.value = {
      top: `${rect.bottom + 4}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`
    };
  }
}

function selectOption(option) {
  emit('update:modelValue', option);
  isOpen.value = false;
  searchQuery.value = '';
}

function clearSelection() {
  emit('update:modelValue', '');
  searchQuery.value = '';
  isOpen.value = false;
}

function handleClickOutside(event) {
  if (containerRef.value && !containerRef.value.contains(event.target)) {
    isOpen.value = false;
    searchQuery.value = '';
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
  window.addEventListener('resize', updateDropdownPosition);
  window.addEventListener('scroll', updateDropdownPosition, true);
});

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside);
  window.removeEventListener('resize', updateDropdownPosition);
  window.removeEventListener('scroll', updateDropdownPosition, true);
});
</script>

<style scoped>
@keyframes dropdown-in {
  from { opacity: 0; transform: translateY(-4px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-dropdown-in {
  animation: dropdown-in 0.15s cubic-bezier(0, 0, 0.2, 1) forwards;
}

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #f1f1f1; }
::-webkit-scrollbar-thumb { background: #2F2E8B; }
</style>
