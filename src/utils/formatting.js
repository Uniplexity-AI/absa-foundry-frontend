/**
 * Format a number with commas and optional decimal places
 * @param {number} value - The number to format
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted number
 */
export const formatNumber = (value, decimals = 2) => {
  if (!value && value !== 0) return '';
  
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
};

/**
 * Format a date string or timestamp
 * @param {string|number|Date} date - Date to format
 * @param {string} locale - Locale for formatting (default: 'en-US')
 * @returns {string} Formatted date
 */
export const formatDate = (date, locale = 'en-US') => {
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
export const formatCurrency = (amount, currency = 'ZMW') => {
  if (!amount && amount !== 0) return '';
  
  return new Intl.NumberFormat('en-ZM', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2
  }).format(amount);
};

/**
 * Format percentage
 * @param {number} value - Value to format as percentage
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} Formatted percentage
 */
export const formatPercentage = (value, decimals = 1) => {
  if (!value && value !== 0) return '';
  
  return `${formatNumber(value, decimals)}%`;
};