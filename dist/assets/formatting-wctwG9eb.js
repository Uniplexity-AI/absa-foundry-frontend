/**
 * Format a number with commas and optional decimal places
 * @param {number} value - The number to format
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted number
 */

/**
 * Format a date string or timestamp
 * @param {string|number|Date} date - Date to format
 * @param {string} locale - Locale for formatting (default: 'en-US')
 * @returns {string} Formatted date
 */
const formatDate = (date, locale = 'en-US') => {
  if (!date) return '';
  
  const dateObj = new Date(date);
  
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(dateObj);
};

/**
 * Format currency amount
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: 'ZMW')
 * @returns {string} Formatted currency amount
 */
const formatCurrency = (amount, currency = 'ZMW') => {
  if (!amount && amount !== 0) return '';
  
  return new Intl.NumberFormat('en-ZM', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2
  }).format(amount);
};

export { formatDate as a, formatCurrency as f };
