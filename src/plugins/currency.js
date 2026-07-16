/**
 * Currency Plugin - Makes currency formatting available globally in Vue templates
 */

import currencyService from '@/services/currencyService.js';

export default {
  install(app) {
    // Global properties accessible in all components
    app.config.globalProperties.$formatCurrency = (amount, options = {}) => {
      return currencyService.format(amount, options);
    };

    app.config.globalProperties.$formatCurrencyCompact = (amount) => {
      return currencyService.formatCompact(amount);
    };

    app.config.globalProperties.$parseCurrency = (formattedAmount) => {
      return currencyService.parse(formattedAmount);
    };

    app.config.globalProperties.$getCurrencySymbol = () => {
      return currencyService.getSymbol();
    };

    app.config.globalProperties.$getCurrencyCode = () => {
      return currencyService.getCurrencyCode();
    };

    // Provide the currency service globally
    app.provide('currencyService', currencyService);
  }
};