import { i as computed, f as onMounted, r as ref, ae as currencyService } from './index-CJBj3n9Z.js';

/**
 * Currency Composable - Vue 3 composition API for currency management
 * Provides reactive currency formatting throughout the application
 */


const isInitialized = ref(false);
const currentSettings = ref({
  systemCurrency: 'ZMW',
  currencySymbol: 'K',
  decimalPlaces: 2,
  symbolPosition: 'before'
});

function useCurrency() {
  
  /**
   * Initialize currency service for the current tenant
   * ✅ ENHANCED: Multiple fallbacks prevent modal crashes
   */
  const initializeCurrency = async () => {
    try {
      // Always ensure currencyService initializes
      try {
        await currencyService.initialize();
        currentSettings.value = currencyService.getSettings();
      } catch (serviceError) {
        console.error('useCurrency: currencyService.initialize failed:', serviceError);
        // Use hardcoded defaults if service fails
        currentSettings.value = {
          systemCurrency: 'ZMW',
          currencySymbol: 'K',
          decimalPlaces: 2,
          symbolPosition: 'before'
        };
      }
      
      isInitialized.value = true;
      console.log('Currency service initialized');
    } catch (error) {
      console.error('useCurrency: Critical initialization error:', error);
      // Ensure we always mark as initialized even if everything fails
      isInitialized.value = true;
      currentSettings.value = {
        systemCurrency: 'ZMW',
        currencySymbol: 'K',
        decimalPlaces: 2,
        symbolPosition: 'before'
      };
    }
  };

  /**
   * Format currency amount
   * ✅ ENHANCED: Safe formatting with fallback
   * @param {number} amount - Amount to format
   * @param {Object} options - Formatting options
   * @returns {string} Formatted currency string
   */
  const formatCurrency = (amount, options = {}) => {
    try {
      return currencyService.format(amount, options);
    } catch (error) {
      console.warn('useCurrency: formatCurrency error, using fallback:', error);
      // Fallback formatting if service fails
      const numAmount = parseFloat(amount) || 0;
      const { currencySymbol, decimalPlaces, symbolPosition } = currentSettings.value;
      const formatted = numAmount.toFixed(decimalPlaces);
      return symbolPosition === 'before' 
        ? `${currencySymbol} ${formatted}`
        : `${formatted} ${currencySymbol}`;
    }
  };

  /**
   * Format currency in compact form (with K/M suffixes)
   * @param {number} amount - Amount to format
   * @returns {string} Compact formatted currency string
   */
  const formatCurrencyCompact = (amount) => {
    return currencyService.formatCompact(amount);
  };

  /**
   * Parse formatted currency string to number
   * @param {string} formattedAmount - Formatted currency string
   * @returns {number} Numeric value
   */
  const parseCurrency = (formattedAmount) => {
    return currencyService.parse(formattedAmount);
  };

  /**
   * Get current currency symbol
   * @returns {string} Currency symbol
   */
  const currencySymbol = computed(() => currentSettings.value.currencySymbol);

  /**
   * Get current currency code
   * @returns {string} Currency code
   */
  const currencyCode = computed(() => currentSettings.value.systemCurrency);

  /**
   * Update currency settings
   * @param {Object} newSettings - New currency settings
   */
  const updateCurrencySettings = (newSettings) => {
    // Update in-memory service and reactive state
    currencyService.updateSettings(newSettings);
    currentSettings.value = currencyService.getSettings();

    // Persist globally (survives logout) when there is no tenant-specific context
    try {
      // Try to detect tenant id quickly (same logic as initialize) - if none, save global
      const rawToken = localStorage.getItem('token') || localStorage.getItem('access_token') || localStorage.getItem('accessToken');
      let tenantId = null;
      if (rawToken) {
        try {
          const maybeDecoded = JSON.parse(atob(rawToken.split('.')[1]));
          tenantId = maybeDecoded?.tenant_id || null;
        } catch (e) {
          // ignore
        }
      }

      if (!tenantId) {
        // Persist as global selection
        if (typeof currencyService.saveGlobalSettings === 'function') {
          currencyService.saveGlobalSettings(newSettings);
        } else {
          // Fallback: write same payload format directly
          localStorage.setItem('currency_settings_global', JSON.stringify({
            system_currency: newSettings.systemCurrency || newSettings.system_currency || currentSettings.value.systemCurrency,
            currency_symbol: newSettings.currencySymbol || newSettings.currency_symbol || currentSettings.value.currencySymbol,
            decimal_places: parseInt(newSettings.decimalPlaces || newSettings.decimal_places || currentSettings.value.decimalPlaces),
            symbol_position: newSettings.symbolPosition || newSettings.symbol_position || currentSettings.value.symbolPosition
          }));
        }
      }
    } catch (e) {
      // ignore persistence errors
      console.warn('useCurrency: Failed to persist global currency settings', e);
    }
  };

  /**
   * Save currency settings
   * @param {Object} newSettings - New currency settings
   * @param {string} tenantId - Tenant ID
   */
  const saveCurrencySettings = async (newSettings, tenantId) => {
    if (tenantId) {
      await currencyService.saveSettings(newSettings, tenantId);
      currentSettings.value = currencyService.getSettings();
      return;
    }

    // No tenant - save global settings to localStorage
    if (typeof currencyService.saveGlobalSettings === 'function') {
      currencyService.saveGlobalSettings(newSettings);
    } else {
      localStorage.setItem('currency_settings_global', JSON.stringify({
        system_currency: newSettings.systemCurrency || newSettings.system_currency || currentSettings.value.systemCurrency,
        currency_symbol: newSettings.currencySymbol || newSettings.currency_symbol || currentSettings.value.currencySymbol,
        decimal_places: parseInt(newSettings.decimalPlaces || newSettings.decimal_places || currentSettings.value.decimalPlaces),
        symbol_position: newSettings.symbolPosition || newSettings.symbol_position || currentSettings.value.symbolPosition
      }));
    }

    // Ensure reactive state updated
    currentSettings.value = currencyService.getSettings();
  };

  // Auto-initialize on mount
  onMounted(() => {
    if (!isInitialized.value) {
      initializeCurrency();
    }
  });

  return {
    // State
    isInitialized,
    currentSettings,
    currencySymbol,
    currencyCode,
    
    // Methods
    initializeCurrency,
    formatCurrency,
    formatCurrencyCompact,
    parseCurrency,
    updateCurrencySettings,
    saveCurrencySettings
  };
}

export { useCurrency as u };
