<template>
  <aside class="fixed left-0 top-0 bottom-0 w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 gap-2 z-20 shadow-none">
    <!-- Documents -->
    <button
      @click="$emit('toggle-documents')"
      class="w-10 h-10 rounded-sm flex items-center justify-center transition-all"
      :class="documentsActive ? 'bg-[#2F2E8B] text-white' : 'text-gray-400 hover:text-[#2F2E8B] hover:bg-gray-50'"
      title="Documents"
    >
      <i class="fas fa-file-alt text-lg"></i>
    </button>

    <!-- Notes -->
    <button
      @click="$emit('toggle-notes')"
      class="w-10 h-10 rounded-sm flex items-center justify-center transition-all"
      :class="notesActive ? 'bg-[#2F2E8B] text-white' : 'text-gray-400 hover:text-[#2F2E8B] hover:bg-gray-50'"
      title="Notes"
    >
      <i class="fas fa-sticky-note text-lg"></i>
    </button>

    <!-- History -->
    <button
      @click="$emit('toggle-history')"
      class="w-10 h-10 rounded-sm flex items-center justify-center transition-all relative"
      :class="historyActive ? 'bg-[#2F2E8B] text-white' : 'text-gray-400 hover:text-[#2F2E8B] hover:bg-gray-50'"
      title="History"
    >
      <i class="fas fa-history text-lg"></i>
      <span v-if="historyCount > 0" class="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
        {{ historyCount }}
      </span>
    </button>

    <!-- Divider -->
    <div class="w-8 h-px bg-gray-200 my-2"></div>

    <!-- Theme -->
    <button
      @click="$emit('toggle-theme')"
      class="w-10 h-10 rounded-sm flex items-center justify-center text-gray-400 hover:text-[#2F2E8B] hover:bg-gray-50 transition-all"
      title="Theme"
    >
      <i class="fas fa-moon text-lg"></i>
    </button>

    <!-- Settings -->
    <button
      @click="$emit('open-settings')"
      class="w-10 h-10 rounded-sm flex items-center justify-center text-gray-400 hover:text-[#2F2E8B] hover:bg-gray-50 transition-all"
      title="Settings"
    >
      <i class="fas fa-cog text-lg"></i>
    </button>

    <!-- Profile -->
    <button
      @click="$emit('open-profile')"
      class="w-10 h-10 rounded-sm flex items-center justify-center text-gray-400 hover:text-[#2F2E8B] hover:bg-gray-50 transition-all mt-auto"
      title="Profile"
    >
      <i class="fas fa-user-circle text-lg"></i>
    </button>
  </aside>
</template>

<script setup>
defineProps({
  documentCount: { type: Number, default: 0 },
  noteCount: { type: Number, default: 0 },
  historyCount: { type: Number, default: 0 },
  documentsActive: { type: Boolean, default: false },
  notesActive: { type: Boolean, default: false },
  historyActive: { type: Boolean, default: false },
});

defineEmits([
  'toggle-documents',
  'toggle-notes',
  'toggle-history',
  'toggle-theme',
  'open-settings',
  'open-profile',
  'expand-sidebar',
]);
</script>
