import { ref, computed, onMounted } from 'vue';
import { decodeJWT } from '@/api_services/decodeJWT.js';
import API_BASE_URL from '@/api_services/api.js';

export function useCompliance() {
  const { getTenantId, getToken } = decodeJWT();

  // State
  const loading = ref(false);
  const error = ref(null);
  const activeModal = ref(null);

  // Dashboard stats
  const dashboardStats = ref({
    activeObligations: 0,
    pendingActions: 0,
    highRiskItems: 0,
    complianceScore: 0
  });

  // Module stats
  const moduleStats = ref({
    newRegulations: 0,
    upcomingDeadlines: 0,
    documentsExpiring: 0,
    highRiskAlerts: 0,
    reportsGenerated: 0
  });

  // Recent alerts
  const recentAlerts = ref([]);

  // ─── VSDC / ZRA Smart Invoice state ─────────────────────────────────────
  const vsdcLoading = ref(false);
  const vsdcError = ref(null);
  const vsdcTestResult = ref(null);
  const vsdcConfig = ref({
    tpin: '',
    branchId: '000',
    baseUrl: '',
    deviceSerial: '',
    enabled: false,
    autoSync: true
  });
  const vsdcSyncStats = ref({
    total_syncs: 0,
    successful_syncs: 0,
    failed_syncs: 0,
    pending_count: 0,
    last_sync_at: null,
    connected: false
  });

  // Methods
  const openModule = (moduleName) => {
    activeModal.value = moduleName;
  };

  const closeModal = () => {
    activeModal.value = null;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-ZM', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const fetchDashboardStats = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(`${API_BASE_URL}/compliance/dashboard?tenant_id=${getTenantId()}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch dashboard stats: ${response.status}`);
      }

      const data = await response.json();
      dashboardStats.value = data.stats || dashboardStats.value;
      moduleStats.value = data.moduleStats || moduleStats.value;
      recentAlerts.value = data.recentAlerts || [];

    } catch (err) {
      console.error('Error fetching compliance dashboard:', err);
      error.value = err.message;
      
      // Fallback mock data
      dashboardStats.value = {
        activeObligations: 24,
        pendingActions: 7,
        highRiskItems: 3,
        complianceScore: 87
      };
      
      moduleStats.value = {
        newRegulations: 5,
        upcomingDeadlines: 12,
        documentsExpiring: 4,
        highRiskAlerts: 3,
        reportsGenerated: 18
      };

      recentAlerts.value = [
        {
          id: 1,
          title: 'NHIMA remittance overdue',
          description: 'Payment overdue by 2 days — penalty risk K5,000',
          severity: 'high',
          created_at: new Date().toISOString()
        },
        {
          id: 2,
          title: 'Environmental permit renewal due',
          description: 'Mining permit expires in 30 days',
          severity: 'medium',
          created_at: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 3,
          title: 'New ZRA tax regulation',
          description: 'Updated mineral royalty rates published',
          severity: 'low',
          created_at: new Date(Date.now() - 172800000).toISOString()
        }
      ];
    } finally {
      loading.value = false;
    }
  };

  // ─── VSDC Methods ────────────────────────────────────────────────────────
  const fetchVsdcConfig = async () => {
    vsdcLoading.value = true;
    vsdcError.value = null;
    try {
      const res = await fetch(`${API_BASE_URL}/zra/vsdc/config?tenant_id=${getTenantId()}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      if (res.ok) {
        const data = await res.json();
        vsdcConfig.value = { ...vsdcConfig.value, ...data };
      }
    } catch (err) {
      vsdcError.value = err.message;
      console.warn('Could not fetch VSDC config:', err);
    } finally {
      vsdcLoading.value = false;
    }
  };

  const saveVsdcConfig = async () => {
    vsdcLoading.value = true;
    vsdcError.value = null;
    try {
      const res = await fetch(`${API_BASE_URL}/zra/vsdc/config?tenant_id=${getTenantId()}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(vsdcConfig.value)
      });
      if (!res.ok) throw new Error('Failed to save VSDC config');
      const data = await res.json();
      vsdcConfig.value = { ...vsdcConfig.value, ...data };
      return true;
    } catch (err) {
      vsdcError.value = err.message;
      console.error('Error saving VSDC config:', err);
      return false;
    } finally {
      vsdcLoading.value = false;
    }
  };

  const testVsdcConnection = async () => {
    vsdcLoading.value = true;
    vsdcError.value = null;
    vsdcTestResult.value = null;
    try {
      const res = await fetch(`${API_BASE_URL}/zra/vsdc/validate-tpin?tenant_id=${getTenantId()}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      const data = await res.json();
      vsdcTestResult.value = { ok: res.ok, ...data };
      return res.ok;
    } catch (err) {
      vsdcTestResult.value = { ok: false, error: err.message };
      vsdcError.value = err.message;
      return false;
    } finally {
      vsdcLoading.value = false;
    }
  };

  const fetchVsdcSyncStats = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/zra/vsdc/sync-status?tenant_id=${getTenantId()}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      if (res.ok) {
        const data = await res.json();
        vsdcSyncStats.value = { ...vsdcSyncStats.value, ...data };
      }
    } catch (err) {
      console.warn('Could not fetch VSDC sync stats:', err);
    }
  };

  // Initialize
  onMounted(() => {
    fetchDashboardStats();
    fetchVsdcConfig();
    fetchVsdcSyncStats();
  });

  return {
    // State
    loading,
    error,
    activeModal,
    dashboardStats,
    moduleStats,
    recentAlerts,

    // VSDC State
    vsdcLoading,
    vsdcError,
    vsdcTestResult,
    vsdcConfig,
    vsdcSyncStats,

    // Methods
    openModule,
    closeModal,
    formatDate,
    fetchDashboardStats,

    // VSDC Methods
    fetchVsdcConfig,
    saveVsdcConfig,
    testVsdcConnection,
    fetchVsdcSyncStats
  };
}