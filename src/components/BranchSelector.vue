<template>
  <div class="branch-selector">
    <div class="relative">
      <select 
        v-model="selectedBranch"
        @change="handleBranchChange"
        class="appearance-none bg-white border border-gray-300 rounded-lg pl-10 pr-8 py-2 text-sm focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent outline-none cursor-pointer hover:border-gray-400 transition"
        :class="sizeClass"
      >
        <option value="">All Branches</option>
        <option value="main">Main Account</option>
        <option v-for="branch in branches" :key="branch._id" :value="branch._id">
          {{ branch.name }}
        </option>
      </select>
      <div class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <i class="fas fa-store text-[#059669]"></i>
      </div>
      <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <i class="fas fa-chevron-down text-gray-400 text-xs"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { decodeJWT } from '@/api_services/decodeJWT';
import API_BASE_URL from '@/api_services/api';

const props = defineProps({
  size: {
    type: String,
    default: 'md', // sm, md, lg
    validator: (val) => ['sm', 'md', 'lg'].includes(val)
  },
  modelValue: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue', 'change']);

const { getTenantId, getBranches, setBranches, getSelectedBranch, setSelectedBranch } = decodeJWT();

const branches = ref([]);
const selectedBranch = ref('');

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm': return 'text-xs py-1';
    case 'lg': return 'text-base py-3';
    default: return 'text-sm py-2';
  }
});

// Fetch branches from API or localStorage
async function fetchBranches() {
  // First try localStorage
  const storedBranches = getBranches();
  if (storedBranches && storedBranches.length > 0) {
    branches.value = storedBranches;
  }
  
  // Then fetch fresh data
  try {
    const res = await fetch(`${API_BASE_URL}/subaccounts/branches/list?tenant_id=${getTenantId()}`);
    if (res.ok) {
      const data = await res.json();
      const branchList = Array.isArray(data) ? data : [];
      branches.value = branchList;
      setBranches(branchList);
    }
  } catch (e) {
    console.warn('Failed to fetch branches:', e);
  }
}

function handleBranchChange() {
  setSelectedBranch(selectedBranch.value);
  emit('update:modelValue', selectedBranch.value);
  emit('change', selectedBranch.value);
}

// Watch for external v-model changes
watch(() => props.modelValue, (newVal) => {
  selectedBranch.value = newVal;
});

onMounted(() => {
  // Initialize from props or localStorage
  selectedBranch.value = props.modelValue || getSelectedBranch();
  fetchBranches();
});
</script>

<style scoped>
.branch-selector select {
  min-width: 160px;
}
</style>
