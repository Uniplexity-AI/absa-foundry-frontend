import { ref, reactive, watch } from 'vue';
import { decodeJWT } from '@/services/decodeJWT.js';
import API_BASE_URL from '@/services/api';
import { DEV_BYPASS } from '@/config/devFlags.js';

// Global reactive state to be shared across components
const preferences = reactive({
    primaryColor: '#2F2E8B',
    secondaryColor: '#7C3AED',
    tertiaryColor: '#F0F9FF',
    fontFamily: 'font-sans', // Default tailwind font class
    quotationNotes: '',
    companyName: '',
    companyLogo: '',
    isLoaded: false
});

export function usePreferences() {
    const isLoading = ref(false);
    const error = ref(null);

    const applyBranding = () => {
        const root = document.documentElement;
        root.style.setProperty('--brand-primary', preferences.primaryColor);
        root.style.setProperty('--brand-secondary', preferences.secondaryColor);
        root.style.setProperty('--brand-tertiary', preferences.tertiaryColor);

        // Apply font family if needed, though usually handled by classes
        // root.style.setProperty('--brand-font', preferences.fontFamily);

        console.log('[usePreferences] Branding applied to CSS variables');
    };

    const fetchPreferences = async () => {
        isLoading.value = true;
        try {
            // Try local storage first for speed
            const cached = localStorage.getItem('ub_prefs');
            if (cached) {
                const parsed = JSON.parse(cached);
                Object.assign(preferences, parsed);
                applyBranding();
            }

            if (DEV_BYPASS) {
                preferences.isLoaded = true;
                return;
            }

            const res = await fetch(`${API_BASE_URL}/preferences/`);
            if (res.ok) {
                const data = await res.json();
                if (data.preferences) {
                    Object.assign(preferences, data.preferences);
                    localStorage.setItem('ub_prefs', JSON.stringify(data.preferences));
                    applyBranding();
                }
            }
            preferences.isLoaded = true;
        } catch (err) {
            console.error('[usePreferences] Failed to fetch preferences:', err);
            error.value = err.message;
        } finally {
            isLoading.value = false;
        }
    };

    const savePreferences = async (newPrefs) => {
        isLoading.value = true;
        try {
            if (DEV_BYPASS) {
                Object.assign(preferences, newPrefs, { isLoaded: true });
                localStorage.setItem('ub_prefs', JSON.stringify(preferences));
                applyBranding();
                return { success: true };
            }

            const res = await fetch(`${API_BASE_URL}/preferences/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ preferences: newPrefs })
            });

            if (res.ok) {
                const data = await res.json();
                Object.assign(preferences, data.preferences);
                localStorage.setItem('ub_prefs', JSON.stringify(data.preferences));
                applyBranding();
                return { success: true };
            } else {
                const txt = await res.text();
                throw new Error(txt || 'Failed to save');
            }
        } catch (err) {
            console.error('[usePreferences] Save failed:', err);
            return { success: false, error: err.message };
        } finally {
            isLoading.value = false;
        }
    };

    return {
        preferences,
        isLoading,
        error,
        fetchPreferences,
        savePreferences,
        applyBranding
    };
}
