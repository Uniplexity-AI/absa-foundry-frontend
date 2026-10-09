/**
 * Currency Service - Global currency formatting and management
 * Provides consistent currency formatting throughout the application
 */
import axios from 'axios';
import API_BASE_URL from '@/services/api';

class CurrencyService {
  constructor() {
    this.settings = {
      systemCurrency: 'ZMW',
      currencySymbol: 'K',
      decimalPlaces: 2,
      symbolPosition: 'before'
    };
    this.initialized = false;
    this.API_BASE_URL = API_BASE_URL ;

    // Currency symbol mapping
    this.currencySymbols = {
      ZMW: 'K',
      ZAR: 'R',
      NGN: '₦',
      KES: 'KSh',
      UGX: 'USh',
      TZS: 'TSh',
      BWP: 'P',
      GHS: '₵',
      ETB: 'Br',
      MAD: 'MAD',
      USD: '$',
      EUR: '€',
      GBP: '£',
      JPY: '¥',
      CNY: '¥',
      CAD: 'C$',
      AUD: 'A$',
      CHF: 'Fr',
      INR: '₹'
    };
  }

  async initialize(tenantId) {
    try {
      // Try to load from localStorage first
      const globalKey = 'currency_settings_global';
      const storedGlobal = localStorage.getItem(globalKey);
      if (storedGlobal) {
        try {
          const parsedGlobal = JSON.parse(storedGlobal);
          this.updateSettings(parsedGlobal);
          this.initialized = true;
          return;
        } catch (e) {
          localStorage.removeItem(globalKey);
        }
      }

      // Try to load from backend
      try {
                const token = localStorage.getItem('token');
        const response = await fetch(`${this.API_BASE_URL}/currency/currency-settings`, {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });
        if (response.ok) {
          const result = await response.json();
          if (result.currency_settings) {
            this.updateSettings(result.currency_settings);
            this.initialized = true;
            return;
          }
        }
      } catch (e) {
        // Backend unavailable, continue with defaults
      }

      // Fallback to localStorage
      const stored = localStorage.getItem('currency_settings');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          this.updateSettings(parsed);
        } catch (e) {
          localStorage.removeItem('currency_settings');
        }
      }

      this.initialized = true;
    } catch (error) {
      console.error('CurrencyService: Error initializing:', error);
      this.initialized = true; // Use defaults
    }
  }

  updateSettings(newSettings) {
    if (!newSettings || typeof newSettings !== 'object') return;

    const currency = newSettings.system_currency || newSettings.systemCurrency || 'ZMW';

    this.settings = {
      systemCurrency: currency,
      currencySymbol: newSettings.currency_symbol || newSettings.currencySymbol || this.currencySymbols[currency] || 'K',
      decimalPlaces: parseInt(newSettings.decimal_places || newSettings.decimalPlaces || 2),
      symbolPosition: newSettings.symbol_position || newSettings.symbolPosition || 'before'
    };
  }

  format(amount, options = {}) {
    const settings = { ...this.settings, ...options };
    const numAmount = parseFloat(amount) || 0;

    let formattedAmount;
    if (settings.decimalPlaces === 0) {
      formattedAmount = Math.round(numAmount).toLocaleString();
    } else {
      formattedAmount = numAmount.toFixed(settings.decimalPlaces).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    if (settings.symbolPosition === 'before') {
      return `${settings.currencySymbol} ${formattedAmount}`;
    }
    return `${formattedAmount} ${settings.currencySymbol}`;
  }

  formatCompact(amount) {
    const numAmount = parseFloat(amount) || 0;
    if (numAmount >= 1000000) return this.format(numAmount / 1000000, { decimalPlaces: 1 }) + 'M';
    if (numAmount >= 1000) return this.format(numAmount / 1000, { decimalPlaces: 1 }) + 'K';
    return this.format(numAmount);
  }

  getSettings() {
    return { ...this.settings };
  }

  getSymbol() {
    return this.settings.currencySymbol;
  }

  getCurrencyCode() {
    return this.settings.systemCurrency;
  }

  getCurrentSettings() {
    return { ...this.settings };
  }

  async saveSettings(newSettings, tenantId) {
    const payload = {
      system_currency: newSettings.systemCurrency || newSettings.system_currency,
      currency_symbol: newSettings.currencySymbol || newSettings.currency_symbol || this.currencySymbols[newSettings.systemCurrency || newSettings.system_currency],
      decimal_places: parseInt(newSettings.decimalPlaces || newSettings.decimal_places || this.settings.decimalPlaces),
      symbol_position: newSettings.symbolPosition || newSettings.symbol_position || this.settings.symbolPosition
    };

    // Save to backend when tenantId provided
    if (tenantId) {
      const response = await fetch(`${this.API_BASE_URL}/currency/currency-settings?tenant_id=${tenantId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Update local settings and persist tenant-specific backup if tenantId present
    this.updateSettings(payload);
    if (tenantId) {
      localStorage.setItem(`currency_settings_${tenantId}`, JSON.stringify(payload));
    }

    return { saved: true };
  }

  saveGlobalSettings(newSettings) {
    const payload = {
      system_currency: newSettings.systemCurrency || newSettings.system_currency || this.settings.systemCurrency,
      currency_symbol: newSettings.currencySymbol || newSettings.currency_symbol || this.currencySymbols[newSettings.systemCurrency] || this.settings.currencySymbol,
      decimal_places: parseInt(newSettings.decimalPlaces || newSettings.decimal_places || this.settings.decimalPlaces),
      symbol_position: newSettings.symbolPosition || newSettings.symbol_position || this.settings.symbolPosition
    };

    this.updateSettings(payload);
    localStorage.setItem('currency_settings_global', JSON.stringify(payload));
    return { saved: true };
  }

  parse(formattedCurrency) {
    if (!formattedCurrency) return 0;
    let numericString = String(formattedCurrency)
      .replace(this.settings.currencySymbol, '')
      .replace(/\s/g, '')
      .replace(/,/g, '');
    return parseFloat(numericString) || 0;
  }

  isInitialized() {
    return this.initialized;
  }
}

const currencyService = new CurrencyService();

export default currencyService;

export const formatCurrency = (amount, options) => currencyService.format(amount, options);
export const formatCurrencyCompact = (amount) => currencyService.formatCompact(amount);
export const parseCurrency = (formattedAmount) => currencyService.parse(formattedAmount);
export const getCurrencySymbol = () => currencyService.getSymbol();
export const getCurrencyCode = () => currencyService.getCurrencyCode();