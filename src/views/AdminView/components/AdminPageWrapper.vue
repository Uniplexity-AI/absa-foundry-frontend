<template>
  <div class="admin-page-wrapper">
    <!-- Header Section -->
    <div class="admin-header mb-6 sm:mb-8">
      <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div class="admin-header-content">
          <div class="flex items-center gap-3 sm:gap-4 mb-2">
            <div v-if="icon" class="admin-icon-wrapper">
              <i :class="icon" class="text-xl sm:text-2xl"></i>
            </div>
            <div>
              <h1 class="admin-title">{{ title }}</h1>
              <p v-if="subtitle" class="admin-subtitle">{{ subtitle }}</p>
            </div>
          </div>
        </div>
        <div v-if="$slots.actions" class="admin-header-actions">
          <slot name="actions" />
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <div class="admin-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  }
});
</script>

<style scoped>
/* Admin Page Wrapper - Consistent spacing and styling */
.admin-page-wrapper {
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
}

/* Header Styling - Matches dashboard modules */
.admin-header {
  background: var(--ui-card-surface);
  border-radius: var(--ui-card-radius);
  padding: 1.5rem;
  box-shadow: var(--ui-card-shadow);
  border: 1px solid var(--ui-surface-outline);
  max-width: 100%;
  box-sizing: border-box;
}

.admin-icon-wrapper {
  background: var(--brand-primary);
  padding: 0.75rem;
  border-radius: 0.75rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 3rem;
  min-height: 3rem;
}

.admin-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.2;
}

.admin-subtitle {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.admin-header-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
}

/* Content Area */
.admin-content {
  min-height: 200px;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .admin-header {
    padding: 1rem;
    border-radius: var(--ui-card-radius);
  }

  .admin-title {
    font-size: 1.25rem;
  }

  .admin-icon-wrapper {
    min-width: 2.5rem;
    min-height: 2.5rem;
    padding: 0.625rem;
  }
}

@media (max-width: 768px) {
  .admin-header-actions {
    width: 100%;
  }
}

/* Utility classes for admin pages */
:deep(.admin-card) {
  background: var(--ui-card-surface);
  border-radius: var(--ui-card-radius);
  padding: 1.5rem;
  box-shadow: var(--ui-card-shadow);
  border: 1px solid var(--ui-surface-outline);
  margin-bottom: 1.5rem;
  max-width: 100%;
  box-sizing: border-box;
}

:deep(.admin-section-title) {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
}

:deep(.admin-grid) {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  max-width: 100%;
}

@media (max-width: 640px) {
  :deep(.admin-grid) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
}

/* Button styles matching dashboard modules */
:deep(.btn-primary) {
  background: var(--brand-primary);
  color: white;
  padding: 0.625rem 1.25rem;
  border-radius: var(--ui-button-radius);
  font-weight: 500;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

:deep(.btn-primary:hover) {
  background: var(--brand-primary-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(47, 46, 139, 0.2);
}

:deep(.btn-primary:disabled) {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

:deep(.btn-secondary) {
  background: var(--ui-card-surface);
  color: var(--brand-primary);
  padding: 0.625rem 1.25rem;
  border-radius: var(--ui-button-radius);
  font-weight: 500;
  transition: all 0.2s;
  border: 1px solid var(--brand-primary);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

:deep(.btn-secondary:hover) {
  background: var(--brand-soft);
}

:deep(.btn-outline) {
  background: var(--color-background-muted);
  color: var(--color-text-primary);
  padding: 0.625rem 1.25rem;
  border-radius: var(--ui-button-radius);
  font-weight: 500;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

:deep(.btn-outline:hover) {
  background: color-mix(in srgb, var(--brand-primary) 8%, var(--color-background-muted));
}

/* Loading spinner */
:deep(.spinner) {
  width: 3rem;
  height: 3rem;
  border: 3px solid var(--color-background-muted);
  border-top-color: var(--brand-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Alert/Message boxes */
:deep(.alert-success) {
  background: #ECFDF5;
  border: 1px solid #6EE7B7;
  color: #047857;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

:deep(.alert-error) {
  background: #FEF2F2;
  border: 1px solid #FCA5A5;
  color: #DC2626;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

:deep(.alert-info) {
  background: #EFF6FF;
  border: 1px solid #93C5FD;
  color: #1D4ED8;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}
</style>
