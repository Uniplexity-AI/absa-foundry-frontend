import { ref, computed, watch, nextTick } from 'vue'
import { gsap } from 'gsap'
import { useSettingsBase } from './useSettingsBase'

export function useSettingsBranding() {
  const {
    uiPreferencesForm, tenantUIPreferences,
    DEFAULT_UI_PREFERENCES, DEFAULT_BRAND_COLORS, ORIGINAL_UI_PREFERENCES,
    UI_VISUAL_STYLE_OPTIONS, UI_VISUAL_STYLE_PRESETS,
    brandPrefs, isUIPreferencesLoading,
    updateUIPreferences, applyUIPreferences, saveBrandPrefs,
    openSettingsConfirm, toast,
    profile, FONT_FAMILIES, FONT_SIZES, THEME_MODES,
    UI_CARD_RADIUS_OPTIONS, UI_BUTTON_RADIUS_OPTIONS, UI_INPUT_RADIUS_OPTIONS,
    UI_BUTTON_STYLE_OPTIONS, UI_CARD_ELEVATION_OPTIONS, UI_PATTERN_OPTIONS,
    UI_VISUAL_STYLE_OPTIONS: styleOptions, logAudit
  } = useSettingsBase()

  const showColorPicker = ref(null)

  const selectedVisualStyleName = computed(() =>
    uiPreferencesForm.value.visualStyle === 'original'
      ? 'Original UI'
      : (UI_VISUAL_STYLE_OPTIONS.find(style => style.id === uiPreferencesForm.value.visualStyle)?.name || 'Material Design')
  )

  // Sync global brand prefs to local form on load
  watch(
    () => [brandPrefs.isLoaded, tenantUIPreferences.value],
    ([loaded, rbacPrefs]) => {
      if (loaded || rbacPrefs) {
        const mergedPrefs = { ...DEFAULT_UI_PREFERENCES, ...brandPrefs, ...tenantUIPreferences.value }
        uiPreferencesForm.value = { ...mergedPrefs }
        if (mergedPrefs.brandColors) {
          uiPreferencesForm.value.brandColors = { ...DEFAULT_BRAND_COLORS, ...mergedPrefs.brandColors }
        }
      }
    },
    { immediate: true, deep: true }
  )

  // Watch for typography changes to live preview
  watch(() => uiPreferencesForm.value.fontFamily, () => applyUIPreferences(uiPreferencesForm.value))
  watch(() => uiPreferencesForm.value.fontSize, () => applyUIPreferences(uiPreferencesForm.value))

  function resetUIPreferences() {
    openSettingsConfirm({
      title: 'Reset UI Preferences',
      message: 'Reset all UI preferences to the original dashboard UI?',
      detail: 'This will clear the selected design-system preset and restore the pre-customization palette, shapes, typography, and layout treatment.',
      variant: 'warning', confirmLabel: 'Reset',
      onConfirm: () => {
        uiPreferencesForm.value = {
          ...ORIGINAL_UI_PREFERENCES, brandColors: { ...ORIGINAL_UI_PREFERENCES.brandColors },
          customFontFamilies: [...ORIGINAL_UI_PREFERENCES.customFontFamilies]
        }
        applyUIPreferences(uiPreferencesForm.value)
      }
    })
  }

  function updateBrandColor(colorKey, value) {
    uiPreferencesForm.value.brandColors[colorKey] = value
    applyUIPreferences(uiPreferencesForm.value)
  }

  function previewThemeMode(mode) {
    uiPreferencesForm.value.themeMode = mode
    applyUIPreferences(uiPreferencesForm.value)
  }

  async function applyVisualStylePreset(styleId) {
    const preset = UI_VISUAL_STYLE_PRESETS[styleId]
    if (!preset) return
    uiPreferencesForm.value = {
      ...uiPreferencesForm.value,
      ...Object.fromEntries(Object.entries(preset).filter(([key]) => key !== 'tokens')),
      visualStyle: styleId
    }
    try { await updateUIPreferences(uiPreferencesForm.value) }
    catch (err) { applyUIPreferences(uiPreferencesForm.value) }
    if (uiPreferencesForm.value.showAnimations !== false) {
      nextTick(() => {
        const targets = document.querySelectorAll('.settings-design-system .visual-style-card-active, .settings-design-system .ui-preview-card, .settings-design-system .settings-tab-panel')
        if (!targets.length) return
        gsap.fromTo(targets, { opacity: 0.9, y: 6 }, { opacity: 1, y: 0, duration: 0.24, ease: 'power2.out', stagger: 0.025 })
      })
    }
  }

  async function saveUIPreferences() {
    try {
      isUIPreferencesLoading.value = true
      await updateUIPreferences(uiPreferencesForm.value)
      const brandingToSave = {
        primaryColor: uiPreferencesForm.value.brandColors.primary,
        secondaryColor: uiPreferencesForm.value.brandColors.secondary,
        tertiaryColor: uiPreferencesForm.value.brandColors.accent || uiPreferencesForm.value.brandColors.tertiary,
        fontFamily: uiPreferencesForm.value.fontFamily,
        quotationNotes: brandPrefs.quotationNotes,
        companyName: profile.value?.company_name,
        companyLogo: profile.value?.companyLogo
      }
      const brandSaveResult = await saveBrandPrefs(brandingToSave)
      if (!brandSaveResult?.success) throw new Error(brandSaveResult?.error || 'Failed to save branding preferences')
      toast.success('System preferences and branding saved successfully')
    } catch (err) {
      console.error('[Settings] Save UI failed:', err)
      toast.error('Failed to save preferences: ' + (err.message || 'Unknown error'))
    } finally { isUIPreferencesLoading.value = false }
  }

  return {
    showColorPicker, selectedVisualStyleName,
    resetUIPreferences, updateBrandColor, previewThemeMode,
    applyVisualStylePreset, saveUIPreferences
  }
}
