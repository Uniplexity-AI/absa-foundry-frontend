import { ref, computed, onMounted } from 'vue';
import { decodeJWT } from '@/api_services/decodeJWT.js';
import API_BASE_URL from '@/api_services/api.js';

export function useAuditReporting() {
  const { getTenantId } = decodeJWT();

  // State
  const auditLogs = ref([]);
  const reports = ref([]);
  const templates = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const generating = ref(false);
  const selectedReport = ref(null);
  const auditStats = ref({});

  // Filters
  const filters = ref({
    date_range: 'month',
    module: '',
    action_type: '',
    user: '',
    search: ''
  });

  const reportFilters = ref({
    type: '',
    status: '',
    date_range: 'month'
  });

  // Options
  const modules = ref([
    'Regulation Watcher',
    'Obligation Tracker',
    'Document Intelligence',
    'Risk Scoring',
    'Compliance Dashboard',
    'User Management',
    'System Settings'
  ]);

  const actionTypes = ref([
    'create',
    'update',
    'delete',
    'view',
    'download',
    'upload',
    'login',
    'logout',
    'export',
    'import'
  ]);

  const reportTypes = ref([
    {
      id: 'compliance_summary',
      name: 'Compliance Summary Report',
      description: 'Executive summary of overall compliance status',
      frequency: ['weekly', 'monthly', 'quarterly'],
      recipients: ['Management', 'Board', 'Regulators']
    },
    {
      id: 'zra_tax_report',
      name: 'ZRA Tax Compliance Report',
      description: 'Detailed tax compliance status for ZRA submission',
      frequency: ['monthly', 'quarterly', 'annually'],
      recipients: ['ZRA', 'Tax Department']
    },
    {
      id: 'ministry_mines_report',
      name: 'Ministry of Mines Report',
      description: 'Mining operations compliance and environmental status',
      frequency: ['quarterly', 'annually'],
      recipients: ['Ministry of Mines', 'Environmental Department']
    },
    {
      id: 'zema_environmental_report',
      name: 'ZEMA Environmental Report',
      description: 'Environmental compliance and monitoring report',
      frequency: ['monthly', 'quarterly'],
      recipients: ['ZEMA', 'Environmental Officer']
    },
    {
      id: 'risk_assessment_report',
      name: 'Risk Assessment Report',
      description: 'Comprehensive risk analysis and mitigation status',
      frequency: ['monthly', 'quarterly'],
      recipients: ['Management', 'Risk Committee']
    },
    {
      id: 'audit_trail_report',
      name: 'Audit Trail Report',
      description: 'System activity log and compliance tracking',
      frequency: ['weekly', 'monthly'],
      recipients: ['Audit Committee', 'Compliance Officer']
    },
    {
      id: 'investor_compliance_report',
      name: 'Investor Compliance Report',
      description: 'Compliance status for investor and stakeholder reporting',
      frequency: ['quarterly', 'annually'],
      recipients: ['Investors', 'Board of Directors']
    }
  ]);

  // New report form
  const newReport = ref({
    type: '',
    title: '',
    description: '',
    frequency: 'monthly',
    recipients: [],
    parameters: {},
    scheduled: false,
    next_generation: ''
  });

  // Report generation parameters
  const reportParameters = ref({
    date_from: '',
    date_to: '',
    include_charts: true,
    include_recommendations: true,
    format: 'pdf',
    language: 'english'
  });

  // Computed properties
  const filteredAuditLogs = computed(() => {
    let filtered = [...auditLogs.value];

    // Filter by module
    if (filters.value.module) {
      filtered = filtered.filter(log => log.module === filters.value.module);
    }

    // Filter by action type
    if (filters.value.action_type) {
      filtered = filtered.filter(log => log.action_type === filters.value.action_type);
    }

    // Filter by user
    if (filters.value.user) {
      filtered = filtered.filter(log => 
        log.user_name?.toLowerCase().includes(filters.value.user.toLowerCase()) ||
        log.user_email?.toLowerCase().includes(filters.value.user.toLowerCase())
      );
    }

    // Filter by search
    if (filters.value.search) {
      const searchTerm = filters.value.search.toLowerCase();
      filtered = filtered.filter(log => 
        log.description?.toLowerCase().includes(searchTerm) ||
        log.details?.toLowerCase().includes(searchTerm) ||
        log.ip_address?.includes(searchTerm)
      );
    }

    // Filter by date range
    if (filters.value.date_range !== 'all') {
      const now = new Date();
      let startDate;

      switch (filters.value.date_range) {
        case 'today':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        case 'week':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case 'quarter':
          startDate = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
          break;
        case 'year':
          startDate = new Date(now.getFullYear(), 0, 1);
          break;
      }

      if (startDate) {
        filtered = filtered.filter(log => new Date(log.timestamp) >= startDate);
      }
    }

    return filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  });

  const filteredReports = computed(() => {
    let filtered = [...reports.value];

    if (reportFilters.value.type) {
      filtered = filtered.filter(report => report.type === reportFilters.value.type);
    }

    if (reportFilters.value.status) {
      filtered = filtered.filter(report => report.status === reportFilters.value.status);
    }

    return filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  });

  const recentActivity = computed(() => {
    return auditLogs.value.slice(0, 10);
  });

  // Helper functions
  const extractErrorMessage = (errorData) => {
    if (typeof errorData === 'string') return errorData;
    if (errorData.detail) {
      if (typeof errorData.detail === 'string') return errorData.detail;
      if (Array.isArray(errorData.detail)) {
        return errorData.detail.map(err => err.msg || err).join(', ');
      }
    }
    return JSON.stringify(errorData);
  };

  const getActionIcon = (actionType) => {
    const iconMap = {
      create: 'fa-plus-circle text-green-600',
      update: 'fa-edit text-blue-600',
      delete: 'fa-trash text-red-600',
      view: 'fa-eye text-gray-600',
      download: 'fa-download text-purple-600',
      upload: 'fa-upload text-orange-600',
      login: 'fa-sign-in-alt text-green-600',
      logout: 'fa-sign-out-alt text-gray-600',
      export: 'fa-file-export text-blue-600',
      import: 'fa-file-import text-orange-600'
    };
    return iconMap[actionType] || 'fa-circle text-gray-400';
  };

  const getReportStatusColor = (status) => {
    const colorMap = {
      'completed': 'bg-green-100 text-green-800',
      'generating': 'bg-blue-100 text-blue-800',
      'scheduled': 'bg-yellow-100 text-yellow-800',
      'failed': 'bg-red-100 text-red-800',
      'draft': 'bg-gray-100 text-gray-800'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };

  // API Methods
  const fetchAuditLogs = async () => {
    loading.value = true;
    error.value = null;

    try {
      const url = new URL(`${API_BASE_URL}/compliance/audit-logs`);
      url.searchParams.append('tenant_id', getTenantId());

      if (filters.value.date_range) {
        url.searchParams.append('date_range', filters.value.date_range);
      }

      const response = await fetch(url);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(extractErrorMessage(errorData) || `HTTP ${response.status}`);
      }

      const data = await response.json();
      auditLogs.value = data.audit_logs || [];
      auditStats.value = data.stats || {};

    } catch (err) {
      console.error('Error fetching audit logs:', err);
      error.value = err.message;

      // Mock data for development
      auditLogs.value = [
        {
          id: 1,
          user_name: 'John Kabwe',
          user_email: 'j.kabwe@company.zm',
          action_type: 'create',
          module: 'Document Intelligence',
          description: 'Uploaded new mining license document',
          details: 'Mining License - Copper Mine Site A (mining_license_2024.pdf)',
          ip_address: '192.168.1.45',
          user_agent: 'Mozilla/5.0 Chrome/120.0',
          timestamp: '2024-12-29T14:30:00Z',
          status: 'success'
        },
        {
          id: 2,
          user_name: 'Sarah Mwanza',
          user_email: 's.mwanza@company.zm',
          action_type: 'update',
          module: 'Risk Scoring',
          description: 'Updated risk assessment status',
          details: 'Environmental Permit Expiration - Status changed from active to mitigating',
          ip_address: '192.168.1.67',
          user_agent: 'Mozilla/5.0 Firefox/119.0',
          timestamp: '2024-12-29T13:15:00Z',
          status: 'success'
        },
        {
          id: 3,
          user_name: 'David Phiri',
          user_email: 'd.phiri@company.zm',
          action_type: 'download',
          module: 'Audit & Reporting',
          description: 'Downloaded ZRA compliance report',
          details: 'ZRA Tax Compliance Report - December 2024 (PDF format)',
          ip_address: '192.168.1.23',
          user_agent: 'Mozilla/5.0 Safari/17.0',
          timestamp: '2024-12-29T11:45:00Z',
          status: 'success'
        },
        {
          id: 4,
          user_name: 'Grace Banda',
          user_email: 'g.banda@company.zm',
          action_type: 'view',
          module: 'Obligation Tracker',
          description: 'Viewed overdue obligations dashboard',
          details: 'Accessed overdue obligations list - 3 critical items found',
          ip_address: '192.168.1.89',
          user_agent: 'Mozilla/5.0 Chrome/120.0',
          timestamp: '2024-12-29T10:20:00Z',
          status: 'success'
        },
        {
          id: 5,
          user_name: 'System',
          user_email: 'system@company.zm',
          action_type: 'create',
          module: 'Regulation Watcher',
          description: 'Automated regulation scan completed',
          details: 'Found 2 new regulations from ZRA and 1 from ZEMA',
          ip_address: '127.0.0.1',
          user_agent: 'System/Automated',
          timestamp: '2024-12-29T09:00:00Z',
          status: 'success'
        }
      ];

      auditStats.value = {
        total_actions: 1247,
        unique_users: 15,
        failed_actions: 12,
        critical_actions: 89
      };
    } finally {
      loading.value = false;
    }
  };

  const fetchReports = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/compliance/reports?tenant_id=${getTenantId()}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(extractErrorMessage(errorData) || `HTTP ${response.status}`);
      }

      const data = await response.json();
      reports.value = data.reports || [];

    } catch (err) {
      console.error('Error fetching reports:', err);
      error.value = err.message;

      // Mock data
      reports.value = [
        {
          id: 1,
          type: 'compliance_summary',
          title: 'Monthly Compliance Summary - December 2024',
          description: 'Executive summary of compliance status for December 2024',
          status: 'completed',
          format: 'pdf',
          file_size: 2456789,
          recipients: ['Management', 'Board'],
          generated_by: 'John Kabwe',
          created_at: '2024-12-28T16:00:00Z',
          completed_at: '2024-12-28T16:15:00Z',
          download_url: '/reports/compliance_summary_dec2024.pdf'
        },
        {
          id: 2,
          type: 'zra_tax_report',
          title: 'ZRA Tax Compliance Report - Q4 2024',
          description: 'Quarterly tax compliance report for ZRA submission',
          status: 'completed',
          format: 'pdf',
          file_size: 1876543,
          recipients: ['ZRA', 'Tax Department'],
          generated_by: 'Sarah Mwanza',
          created_at: '2024-12-27T14:30:00Z',
          completed_at: '2024-12-27T15:00:00Z',
          download_url: '/reports/zra_tax_q4_2024.pdf'
        },
        {
          id: 3,
          type: 'risk_assessment_report',
          title: 'Risk Assessment Report - December 2024',
          description: 'Monthly risk analysis and mitigation status',
          status: 'generating',
          format: 'pdf',
          recipients: ['Management', 'Risk Committee'],
          generated_by: 'David Phiri',
          created_at: '2024-12-29T10:00:00Z',
          progress: 75
        },
        {
          id: 4,
          type: 'ministry_mines_report',
          title: 'Ministry of Mines Annual Report 2024',
          description: 'Annual mining operations and environmental compliance report',
          status: 'scheduled',
          format: 'pdf',
          recipients: ['Ministry of Mines'],
          scheduled_for: '2025-01-15T09:00:00Z',
          created_at: '2024-12-20T12:00:00Z'
        }
      ];
    }
  };

  const generateReport = async (reportType, parameters = {}) => {
    generating.value = true;
    error.value = null;

    try {
      const reportData = {
        tenant_id: getTenantId(),
        type: reportType,
        parameters: {
          ...reportParameters.value,
          ...parameters
        },
        title: newReport.value.title || `${reportType} - ${new Date().toLocaleDateString()}`,
        description: newReport.value.description || '',
        recipients: newReport.value.recipients || []
      };

      const response = await fetch(`${API_BASE_URL}/compliance/reports/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reportData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(extractErrorMessage(errorData) || `HTTP ${response.status}`);
      }

      const result = await response.json();
      
      // Add to reports list
      reports.value.unshift(result.report);
      
      // Reset form
      resetReportForm();

      return result;

    } catch (err) {
      console.error('Error generating report:', err);
      error.value = err.message;
    } finally {
      generating.value = false;
    }
  };

  const downloadReport = async (reportId, fileName) => {
    try {
      const response = await fetch(`${API_BASE_URL}/compliance/reports/${reportId}/download?tenant_id=${getTenantId()}`);
      
      if (!response.ok) {
        throw new Error(`Failed to download report: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    } catch (err) {
      console.error('Error downloading report:', err);
      error.value = err.message;
    }
  };

  const scheduleReport = async (reportData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/compliance/reports/schedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...reportData,
          tenant_id: getTenantId()
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(extractErrorMessage(errorData) || `HTTP ${response.status}`);
      }

      const result = await response.json();
      reports.value.unshift(result.scheduled_report);

      return result;

    } catch (err) {
      console.error('Error scheduling report:', err);
      error.value = err.message;
    }
  };

  const deleteReport = async (reportId) => {
    if (!confirm('Are you sure you want to delete this report?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/compliance/reports/${reportId}?tenant_id=${getTenantId()}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(extractErrorMessage(errorData) || `HTTP ${response.status}`);
      }

      reports.value = reports.value.filter(r => r.id !== reportId);

    } catch (err) {
      console.error('Error deleting report:', err);
      error.value = err.message;
    }
  };

  const exportAuditLogs = async (format = 'csv') => {
    try {
      const response = await fetch(`${API_BASE_URL}/compliance/audit-logs/export`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tenant_id: getTenantId(),
          format: format,
          filters: filters.value
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to export audit logs: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `audit_logs_${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    } catch (err) {
      console.error('Error exporting audit logs:', err);
      error.value = err.message;
    }
  };

  const resetReportForm = () => {
    newReport.value = {
      type: '',
      title: '',
      description: '',
      frequency: 'monthly',
      recipients: [],
      parameters: {},
      scheduled: false,
      next_generation: ''
    };
    
    reportParameters.value = {
      date_from: '',
      date_to: '',
      include_charts: true,
      include_recommendations: true,
      format: 'pdf',
      language: 'english'
    };
  };

  const selectReport = (report) => {
    selectedReport.value = report;
  };

  const clearSelection = () => {
    selectedReport.value = null;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Initialize
  onMounted(() => {
    fetchAuditLogs();
    fetchReports();
  });

  return {
    // State
    auditLogs,
    reports,
    templates,
    loading,
    error,
    generating,
    selectedReport,
    auditStats,

    // Filters and options
    filters,
    reportFilters,
    modules,
    actionTypes,
    reportTypes,

    // Forms
    newReport,
    reportParameters,

    // Computed
    filteredAuditLogs,
    filteredReports,
    recentActivity,

    // Methods
    fetchAuditLogs,
    fetchReports,
    generateReport,
    downloadReport,
    scheduleReport,
    deleteReport,
    exportAuditLogs,
    resetReportForm,
    selectReport,
    clearSelection,
    getActionIcon,
    getReportStatusColor,
    formatFileSize
  };
}