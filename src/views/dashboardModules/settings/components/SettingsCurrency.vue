<template>
  <div class="absa-stab">
    <div class="absa-stab__header">
      <div class="absa-stab__icon absa-stab__icon--maroon">
        <i class="fas fa-coins"></i>
      </div>
      <div>
        <h2 class="absa-stab__title">Currency Settings</h2>
        <p class="absa-stab__subtitle">Configure your Currency preferences and options.</p>
      </div>
    </div>

    <div class="absa-stab__grid">
      <div class="absa-stab__card absa-metric-bg">
        <div class="absa-stab__card-header">
          <h3 class="absa-stab__card-title">Currency Configuration</h3>
          <span class="absa-stab__card-badge">SETTINGS</span>
        </div>
        <div class="absa-stab__card-body absa-dots">
          <div class="absa-stab__empty-icon">
            <i class="fas fa-coins text-3xl"></i>
          </div>
          <p class="absa-stab__empty-text">Currency configuration panel</p>
          <p class="absa-stab__empty-desc">Content is being migrated from the legacy SettingsModule. This section will be populated with the full Currency settings interface.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSettingsBase } from '@/composables/settings/useSettingsBase'
const base = useSettingsBase()
</script>

<style scoped>
.absa-stab { padding: 0; }
.absa-stab__header { display: flex; align-items: center; gap: 14px; margin-bottom: 24px; }
.absa-stab__icon { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0; }
.absa-stab__icon--maroon { background: #FDE8EC; color: #BE0F2C; }
.absa-stab__title { font-size: 1.25rem; font-weight: 900; color: #111827; margin: 0 0 2px 0; letter-spacing: -0.02em; }
.absa-stab__subtitle { font-size: 0.75rem; color: #9CA3AF; margin: 0; font-family: 'Space Mono', monospace; }
.absa-stab__grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
.absa-stab__card { padding: 0; overflow: hidden; }
.absa-stab__card-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid #F3F4F6; }
.absa-stab__card-title { font-size: 0.8rem; font-weight: 800; color: #111827; margin: 0; }
.absa-stab__card-badge { font-family: 'Space Mono', monospace; font-size: 0.55rem; font-weight: 800; color: #BE0F2C; background: #FDE8EC; padding: 3px 10px; border-radius: 999px; letter-spacing: 0.06em; }
.absa-stab__card-body { padding: 48px 24px; text-align: center; }
.absa-stab__empty-icon { color: #D1D5DB; margin-bottom: 12px; }
.absa-stab__empty-text { font-family: 'Space Mono', monospace; font-size: 0.75rem; font-weight: 800; color: #6B7280; letter-spacing: 0.06em; text-transform: uppercase; margin: 0 0 8px 0; }
.absa-stab__empty-desc { font-size: 0.75rem; color: #9CA3AF; max-width: 420px; margin: 0 auto; line-height: 1.5; }
</style>
