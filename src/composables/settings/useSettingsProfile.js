import { ref, computed } from 'vue'
import { toast } from 'vue3-toastify'
import { useSettingsBase } from './useSettingsBase'

export function useSettingsProfile() {
  const {
    getTenantId, API_BASE_URL, isUIPreferencesLoading,
    saveBrandPrefs, brandPrefs, uiPreferencesForm,
    tenantId
  } = useSettingsBase()

  const profile = ref({
    company_name: '', businessName: '', email: '', phone_number: '',
    business_type: '', tpin: '', address: '', city: '', country: '',
    companyLogo: '', newPassword: '', confirmPassword: ''
  })

  const showProfilePassword = ref(false)
  const showProfileConfirmPassword = ref(false)
  const isPressingProfilePassword = ref(false)
  const isPressingProfileConfirm = ref(false)

  const profileNewPasswordType = computed(() =>
    (showProfilePassword.value || isPressingProfilePassword.value) ? 'text' : 'password')
  const profileConfirmPasswordType = computed(() =>
    (showProfileConfirmPassword.value || isPressingProfileConfirm.value) ? 'text' : 'password')

  function normalizeTenantToProfile(tenant) {
    if (!tenant) return {}
    return {
      company_name: tenant.company_name || tenant.companyName || tenant.businessName || tenant.business_name || tenant.trading_name || tenant.tradingName || tenant.name || '',
      businessName: tenant.company_name || tenant.companyName || tenant.businessName || tenant.business_name || tenant.trading_name || tenant.tradingName || tenant.name || '',
      email: tenant.email || tenant.owner_email || tenant.contact_email || '',
      phone_number: tenant.phone_number || tenant.phone || tenant.contact_phone || '',
      business_type: tenant.business_type || tenant.industry || '',
      tpin: tenant.tpin || tenant.TPIN || '',
      address: tenant.address || tenant.location || tenant.street || '',
      city: tenant.city || '',
      country: tenant.country || '',
      companyLogo: tenant.company_logo || tenant.logo || ''
    }
  }

  async function fetchTenantDetailsForSettings() {
    try {
      const tid = getTenantId()
      if (!tid) throw new Error('Missing tenant id')
      let data = null
      try {
        const u = new URL(`${API_BASE_URL}/tenant-details/details`)
        u.searchParams.append('tenant_id', tid)
        const res = await fetch(u, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        if (res.ok) data = await res.json()
      } catch {}
      if (!data) {
        const u2 = new URL(`${API_BASE_URL}/tenants/details`)
        u2.searchParams.append('tenant_id', tid)
        const res2 = await fetch(u2, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        if (res2.ok) data = await res2.json()
      }
      const tenantObj = data?.tenant ?? data ?? null
      if (!tenantObj) throw new Error('Tenant details not found')
      profile.value = { ...profile.value, ...normalizeTenantToProfile(tenantObj) }
    } catch (e) {
      console.error('Failed to fetch tenant details for settings:', e)
    }
  }

  async function handleLogoUpload(event) {
    const file = event.target.files[0]
    if (!file) return
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
    if (!allowedTypes.includes(file.type)) return toast.warning('Please select a valid image file (PNG, JPG, GIF)')
    if (file.size > 2 * 1024 * 1024) return toast.warning('File size must be less than 2MB')
    try {
      const tid = getTenantId()
      if (!tid) return toast.error('Missing tenant ID')
      const reader = new FileReader()
      reader.onload = (e) => { profile.value.companyLogo = e.target.result }
      reader.readAsDataURL(file)
      const formData = new FormData()
      formData.append('file', file)
      const uploadUrl = new URL(`${API_BASE_URL}/tenant-details/upload-logo`)
      uploadUrl.searchParams.append('tenant_id', tid)
      const response = await fetch(uploadUrl, {
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: formData
      })
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || 'Failed to upload logo')
      }
      toast.success('Company logo uploaded successfully!')
    } catch (error) {
      console.error('Error uploading logo:', error)
      toast.error(`Failed to upload logo: ${error.message}`)
      profile.value.companyLogo = ''
    }
  }

  async function removeCompanyLogo() {
    try {
      const tid = getTenantId()
      if (!tid) return toast.error('Missing tenant ID')
      const payload = { tenant_id: tid, company_logo: null }
      const updateUrl = new URL(`${API_BASE_URL}/tenant-details/update`)
      updateUrl.searchParams.append('tenant_id', tid)
      const response = await fetch(updateUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify(payload)
      })
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || 'Failed to remove logo')
      }
      profile.value.companyLogo = ''
      toast.success('Company logo removed successfully!')
    } catch (error) {
      console.error('Error removing logo:', error)
      toast.error(`Failed to remove logo: ${error.message}`)
    }
  }

  async function updateProfile() {
    try {
      isUIPreferencesLoading.value = true
      const tid = getTenantId()
      if (!tid) return toast.error('Missing tenant ID')
      const payload = {
        tenant_id: tid,
        company_name: profile.value.company_name,
        owner_email: profile.value.email,
        phone_number: profile.value.phone_number,
        business_type: profile.value.business_type,
        tpin: profile.value.tpin,
        address: profile.value.address,
        city: profile.value.city,
        country: profile.value.country,
        company_logo: profile.value.companyLogo
      }
      let success = false, lastErr = null
      for (const ep of [{ url: `${API_BASE_URL}/tenant-details/update`, method: 'PUT' }]) {
        try {
          const u = new URL(ep.url)
          u.searchParams.append('tenant_id', tid)
          const res = await fetch(u, {
            method: ep.method,
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
            body: JSON.stringify(payload)
          })
          if (res.ok) { success = true; break }
          const errTxt = await res.text().catch(() => '')
          lastErr = new Error(`${ep.method} ${u.pathname} -> ${res.status} ${errTxt}`)
        } catch (e) { lastErr = e }
        if (success) break
      }
      if (!success) throw lastErr || new Error('Failed to update profile')
      try {
        await saveBrandPrefs({
          primaryColor: uiPreferencesForm.value?.brandColors?.primary,
          secondaryColor: uiPreferencesForm.value?.brandColors?.secondary,
          tertiaryColor: uiPreferencesForm.value?.brandColors?.accent,
          fontFamily: uiPreferencesForm.value?.fontFamily,
          quotationNotes: brandPrefs.quotationNotes,
          companyName: profile.value.company_name,
          companyLogo: profile.value.companyLogo
        })
      } catch (brandErr) {
        console.warn('Profile updated but branding preferences sync failed:', brandErr)
      }
      toast.success('Profile and branding updated successfully')
      await fetchTenantDetailsForSettings()
    } catch (e) {
      console.error('Update profile failed:', e)
      toast.error(e.message || 'Failed to update profile')
    } finally {
      isUIPreferencesLoading.value = false
    }
  }

  return {
    profile, fetchTenantDetailsForSettings, updateProfile,
    handleLogoUpload, removeCompanyLogo,
    showProfilePassword, showProfileConfirmPassword,
    isPressingProfilePassword, isPressingProfileConfirm,
    profileNewPasswordType, profileConfirmPasswordType
  }
}
