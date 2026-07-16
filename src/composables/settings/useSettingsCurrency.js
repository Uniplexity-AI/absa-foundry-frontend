import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import currencyService from '@/services/currencyService.js'
import { useCurrency } from '@/composables/useCurrency.js'
import { useSettingsBase } from './useSettingsBase'

export function useSettingsCurrency() {
  const { getTenantId, API_BASE_URL, currencyLoading } = useSettingsBase()

  const currencySettings = ref({
    systemCurrency: 'ZMW', decimalPlaces: '2', symbolPosition: 'before'
  })
  const currencySuccess = ref(false)
  const currencyError = ref('')

  const currencySymbols = {
    ZMW: 'K', ZAR: 'R', NGN: '₦', KES: 'KSh', UGX: 'USh', TZS: 'TSh',
    BWP: 'P', GHS: '₵', ETB: 'Br', MAD: 'MAD', USD: '$', EUR: '€',
    GBP: '£', JPY: '¥', CNY: '¥', CAD: 'C$', AUD: 'A$', CHF: 'Fr', INR: '₹'
  }

  const { initializeCurrency, updateCurrencySettings, saveCurrencySettings: composableSaveCurrencySettings } = useCurrency()

  function formatCurrencyPreview(amount) {
    const symbol = currencySymbols[currencySettings.value.systemCurrency] || currencySettings.value.systemCurrency
    const decimals = parseInt(currencySettings.value.decimalPlaces)
    const formattedAmount = decimals === 0
      ? Math.round(amount).toLocaleString()
      : amount.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return currencySettings.value.symbolPosition === 'before'
      ? `${symbol} ${formattedAmount}` : `${formattedAmount} ${symbol}`
  }

  function updateCurrency() {
    currencySuccess.value = false
    currencyError.value = ''
    const symbol = currencySymbols[currencySettings.value.systemCurrency]
    if (symbol) currencySettings.value.currencySymbol = symbol
  }

  async function saveCurrencySettings() {
    currencyLoading.value = true
    currencySuccess.value = false
    currencyError.value = ''
    try {
      const tenantId = getTenantId()
      if (!tenantId) throw new Error('Missing tenant ID')
      await composableSaveCurrencySettings({
        systemCurrency: currencySettings.value.systemCurrency,
        currencySymbol: currencySettings.value.currencySymbol,
        decimalPlaces: Number(currencySettings.value.decimalPlaces),
        symbolPosition: currencySettings.value.symbolPosition
      }, tenantId)
      updateCurrencySettings({
        systemCurrency: currencySettings.value.systemCurrency,
        currencySymbol: currencySettings.value.currencySymbol,
        decimalPlaces: Number(currencySettings.value.decimalPlaces),
        symbolPosition: currencySettings.value.symbolPosition
      })
      currencySuccess.value = true
      setTimeout(() => { currencySuccess.value = false }, 3000)
    } catch (error) {
      console.error('Error saving currency settings:', error)
      currencyError.value = 'Failed to save currency settings. Please try again.'
      setTimeout(() => { currencyError.value = '' }, 5000)
    } finally { currencyLoading.value = false }
  }

  async function loadCurrencySettings() {
    try {
      const tenantId = getTenantId()
      if (!tenantId) return
      try { await initializeCurrency() }
      catch (e) { console.warn('initializeCurrency failed in loadCurrencySettings:', e) }
      const cs = (currencyService.getCurrentSettings && typeof currencyService.getCurrentSettings === 'function')
        ? currencyService.getCurrentSettings() : null
      if (cs) {
        currencySettings.value = {
          systemCurrency: cs.systemCurrency || 'ZMW',
          decimalPlaces: String(cs.decimalPlaces ?? 2),
          symbolPosition: cs.symbolPosition || 'before',
          currencySymbol: cs.currencySymbol || undefined
        }
      }
    } catch (error) { console.error('Error loading currency settings:', error) }
  }

  return {
    currencySettings, currencySuccess, currencyError, currencyLoading,
    currencySymbols, formatCurrencyPreview, updateCurrency,
    saveCurrencySettings, loadCurrencySettings
  }
}
