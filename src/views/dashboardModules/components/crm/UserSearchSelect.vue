<template>
  <div class="relative" ref="containerRef">
    <label v-if="label" class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-0.5">
      {{ label }}
    </label>
    
    <div 
      @click="toggleDropdown"
      class="w-full border border-gray-200 rounded-sm bg-white relative flex items-center min-h-[38px] transition-all hover:border-[#2F2E8B] cursor-pointer group"
      :class="{ 'ring-2 ring-[#2F2E8B]/30 border-[#2F2E8B]': isOpen }"
    >
      <Search class="text-gray-300 ml-3 shrink-0" :size="12" />
      
      <input
        ref="inputRef"
        type="text"
        v-model="searchQuery"
        @input="isOpen = true"
        @focus="isOpen = true"
        :placeholder="selectedUser ? (selectedUser.full_name || selectedUser.name || selectedUser.email).toUpperCase() : 'SEARCH_USER...'"
        class="w-full px-3 py-2 bg-transparent focus:outline-none text-[10px] font-mono font-bold text-gray-800 placeholder-gray-300 uppercase tracking-wider cursor-pointer"
      />
      
      <!-- Clear/Selection Action -->
      <div class="flex items-center gap-1 mr-2">
        <button 
          v-if="modelValue || searchQuery" 
          @click.stop="clearSelection" 
          type="button"
          class="text-gray-300 hover:text-red-500 p-1 transition-colors"
          title="Clear selection"
        >
          <X :size="12" />
        </button>
        <div class="text-gray-300 group-hover:text-gray-400 transition-colors mr-1">
          <ChevronDown :size="12" />
        </div>
      </div>
    </div>

    <!-- Dropdown Menu -->
    <Teleport to="#modal-target">
      <div 
        ref="dropdownRef"
        v-if="isOpen" 
        class="fixed z-[999999] bg-white border border-gray-200 rounded-sm shadow-2xl max-h-60 overflow-y-auto divide-y divide-gray-100 animate-dropdown-in pointer-events-auto"
        :style="dropdownStyle"
      >
        <ul v-if="filteredUsers.length > 0" class="py-0">
          <li 
            v-for="user in filteredUsers" 
            :key="user.email"
            @click="selectUser(user)"
            class="px-3 py-2.5 hover:bg-gray-50 cursor-pointer flex items-center justify-between group transition-colors"
            :class="{'bg-blue-50/50': modelValue === user.email}"
          >
              <div class="flex flex-col min-w-0">
                <span class="text-[11px] font-mono font-black text-gray-800 truncate block uppercase tracking-tight">
                  {{ user.full_name || user.name || user.email.split('@')[0] }}
                </span>
                <span class="text-[9px] font-mono text-gray-400 truncate block uppercase tracking-widest mt-0.5">
                  {{ user.email }}
                </span>
              </div>
            
            <Check v-if="modelValue === user.email" class="text-[#2F2E8B]" :size="12" />
          </li>
        </ul>
        <div v-else class="px-4 py-3 text-[10px] font-mono text-gray-400 text-center uppercase tracking-widest">
          NO_RECORDS_FOUND
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue';
import { Search, X, ChevronDown, Check } from 'lucide-vue-next';

const props = defineProps({
  modelValue: { type: String, default: '' },
  users: { type: Array, default: () => [] },
  label: { type: String, default: '' }
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const searchQuery = ref('');
const containerRef = ref(null);
const dropdownRef = ref(null);
const inputRef = ref(null);
const dropdownStyle = ref({});

// Get currently selected full user object
const selectedUser = computed(() => {
  if (!props.users || !Array.isArray(props.users)) return null;
  return props.users.find(u => u && u.email === props.modelValue);
});

// Filter users based on search
const filteredUsers = computed(() => {
  if (!props.users || !Array.isArray(props.users)) return [];
  if (!searchQuery.value) return props.users;
  const query = searchQuery.value.toLowerCase();
  return props.users.filter(user =>
    user && (
      (user.full_name && user.full_name.toLowerCase().includes(query)) ||
      (user.name && user.name.toLowerCase().includes(query)) ||
      (user.email && user.email.toLowerCase().includes(query)) ||
      (user.role && user.role.toLowerCase().includes(query))
    )
  );
});

function toggleDropdown() {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    updateDropdownPosition();
    nextTick(() => inputRef.value?.focus());
  }
}

function updateDropdownPosition() {
  if (!containerRef.value) return;
  const rect = containerRef.value.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const dropdownHeight = 240;
  const gap = 4;

  // Space available below and above in the viewport
  const spaceBelow = viewportHeight - rect.bottom;
  const spaceAbove = rect.top;

  if (spaceAbove >= dropdownHeight && spaceBelow < dropdownHeight) {
    // Flip UP: anchor bottom of dropdown to top of trigger
    const bottomPx = viewportHeight - rect.top + gap;
    dropdownStyle.value = {
      top: 'auto',
      bottom: `${Math.max(bottomPx, gap)}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`
    };
  } else {
    // Open DOWN: anchor top of dropdown to bottom of trigger, clamped inside viewport
    const topPx = Math.min(rect.bottom + gap, viewportHeight - dropdownHeight - gap);
    dropdownStyle.value = {
      top: `${Math.max(topPx, gap)}px`,
      bottom: 'auto',
      left: `${rect.left}px`,
      width: `${rect.width}px`
    };
  }
}

// Handle selection
function selectUser(user) {
  emit('update:modelValue', user.email);
  isOpen.value = false;
  searchQuery.value = ''; 
}

function clearSelection() {
  emit('update:modelValue', '');
  searchQuery.value = '';
  isOpen.value = false;
}

function handleClickOutside(event) {
  const inContainer = containerRef.value && containerRef.value.contains(event.target);
  const inDropdown = dropdownRef.value && dropdownRef.value.contains(event.target);
  if (!inContainer && !inDropdown) {
    isOpen.value = false;
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

// Reset search on close
watch(isOpen, (newVal) => {
  if (!newVal) searchQuery.value = '';
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
