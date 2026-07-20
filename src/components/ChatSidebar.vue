<template>
  <aside class="chat-sidebar">
    <div class="chat-sidebar__nav">
      <button
        class="chat-sidebar__btn"
        :class="{ 'chat-sidebar__btn--active': documentsActive }"
        @click="$emit('toggle-documents')"
        title="Documents"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        <span v-if="documentCount > 0" class="chat-sidebar__badge">{{ documentCount }}</span>
      </button>

      <button
        class="chat-sidebar__btn"
        :class="{ 'chat-sidebar__btn--active': notesActive }"
        @click="$emit('toggle-notes')"
        title="Notes"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        <span v-if="noteCount > 0" class="chat-sidebar__badge">{{ noteCount }}</span>
      </button>

      <button
        class="chat-sidebar__btn"
        :class="{ 'chat-sidebar__btn--active': historyActive }"
        @click="$emit('toggle-history')"
        title="History"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <span v-if="historyCount > 0" class="chat-sidebar__badge">{{ historyCount }}</span>
      </button>
    </div>

    <div class="chat-sidebar__bottom">
      <button class="chat-sidebar__btn" @click="$emit('toggle-theme')" title="Theme">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
      </button>
      <button class="chat-sidebar__btn" @click="$emit('open-settings')" title="Settings">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
      </button>
      <button class="chat-sidebar__btn" @click="$emit('open-profile')" title="Profile">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      </button>
    </div>
  </aside>
</template>

<script setup>
defineProps({
  documentCount: { type: Number, default: 0 },
  noteCount: { type: Number, default: 0 },
  historyCount: { type: Number, default: 0 },
  documentsActive: { type: Boolean, default: false },
  notesActive: { type: Boolean, default: false },
  historyActive: { type: Boolean, default: false }
})

defineEmits([
  'toggle-documents',
  'toggle-notes',
  'toggle-history',
  'toggle-theme',
  'open-settings',
  'open-profile',
  'expand-sidebar'
])
</script>

<style scoped>
.chat-sidebar {
  width: 56px;
  min-width: 56px;
  background: #FFFFFF;
  border-right: 1px solid #E8E8EC;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0;
  z-index: 20;
}

.chat-sidebar__nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding-top: 8px;
}

.chat-sidebar__bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding-bottom: 8px;
  border-top: 1px solid #F3F4F6;
  padding-top: 12px;
}

.chat-sidebar__btn {
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  border-radius: 8px;
  color: #6B7280;
  cursor: pointer;
  transition: all 150ms ease;
}

.chat-sidebar__btn:hover {
  background: #F3F4F6;
  color: #111827;
}

.chat-sidebar__btn--active {
  background: #FDE8EC;
  color: #BE0F2C;
}

.chat-sidebar__badge {
  position: absolute;
  top: 2px;
  right: 2px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  font-size: 0.6rem;
  font-weight: 800;
  background: #BE0F2C;
  color: #FFFFFF;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
