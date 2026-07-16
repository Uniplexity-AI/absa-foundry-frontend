import { ref, computed, onMounted } from 'vue';
import { decodeJWT } from '@/api_services/decodeJWT.js';
import API_BASE_URL from '@/api_services/api.js';

export function useDocumentIntelligence() {
  const { getTenantId } = decodeJWT();

  // State
  const documents = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const uploading = ref(false);
  const analyzing = ref(false);
  const selectedDocument = ref(null);
  const analysisResults = ref(null);

  // Filters
  const filters = ref({
    document_type: '',
    status: '',
    expiry_range: 'all',
    search: ''
  });

  // Document types
  const documentTypes = ref([
    'Mining License',
    'Environmental Permit',
    'Blasting License',
    'Water Use Permit',
    'Tax Certificate',
    'Insurance Policy',
    'Employment Contract',
    'Health & Safety Certificate',
    'Export License',
    'Import License',
    'Workers Compensation',
    'NHIMA Certificate',
    'Other'
  ]);

  // Status options
  const statusOptions = ref([
    'active',
    'expiring',
    'expired',
    'pending_renewal',
    'under_review'
  ]);

  // File upload
  const uploadFile = ref(null);
  const uploadMetadata = ref({
    document_type: '',
    title: '',
    description: '',
    issuing_authority: '',
    reference_number: ''
  });

  // Computed properties
  const expiringDocuments = computed(() => {
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    
    return documents.value.filter(doc => {
      if (!doc.expiry_date) return false;
      const expiryDate = new Date(doc.expiry_date);
      return expiryDate >= now && expiryDate <= thirtyDaysFromNow;
    });
  });

  const expiredDocuments = computed(() => {
    const now = new Date();
    return documents.value.filter(doc => {
      if (!doc.expiry_date) return false;
      const expiryDate = new Date(doc.expiry_date);
      return expiryDate < now;
    });
  });

  const filteredDocuments = computed(() => {
    let filtered = [...documents.value];

    // Filter by document type
    if (filters.value.document_type) {
      filtered = filtered.filter(doc => doc.document_type === filters.value.document_type);
    }

    // Filter by status
    if (filters.value.status) {
      filtered = filtered.filter(doc => doc.status === filters.value.status);
    }

    // Filter by expiry range
    if (filters.value.expiry_range !== 'all') {
      const now = new Date();
      filtered = filtered.filter(doc => {
        if (!doc.expiry_date) return false;
        const expiryDate = new Date(doc.expiry_date);
        
        switch (filters.value.expiry_range) {
          case 'expired':
            return expiryDate < now;
          case 'expiring_30':
            const thirtyDays = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
            return expiryDate >= now && expiryDate <= thirtyDays;
          case 'expiring_90':
            const ninetyDays = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
            return expiryDate >= now && expiryDate <= ninetyDays;
          case 'active':
            return expiryDate > now;
          default:
            return true;
        }
      });
    }

    // Filter by search
    if (filters.value.search) {
      const searchTerm = filters.value.search.toLowerCase();
      filtered = filtered.filter(doc => 
        doc.title?.toLowerCase().includes(searchTerm) ||
        doc.description?.toLowerCase().includes(searchTerm) ||
        doc.reference_number?.toLowerCase().includes(searchTerm) ||
        doc.issuing_authority?.toLowerCase().includes(searchTerm)
      );
    }

    return filtered;
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

  const getDocumentStatus = (document) => {
    if (!document.expiry_date) return 'active';
    
    const now = new Date();
    const expiryDate = new Date(document.expiry_date);
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    if (expiryDate < now) return 'expired';
    if (expiryDate <= thirtyDaysFromNow) return 'expiring';
    return 'active';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // API Methods
  const fetchDocuments = async () => {
    loading.value = true;
    error.value = null;

    try {
      const url = new URL(`${API_BASE_URL}/compliance/documents`);
      url.searchParams.append('tenant_id', getTenantId());

      const response = await fetch(url);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(extractErrorMessage(errorData) || `HTTP ${response.status}`);
      }

      const data = await response.json();
      documents.value = (data.documents || []).map(doc => ({
        ...doc,
        status: getDocumentStatus(doc)
      }));

    } catch (err) {
      console.error('Error fetching documents:', err);
      error.value = err.message;

      // Mock data for development
      documents.value = [
        {
          id: 1,
          title: 'Mining License - Copper Mine Site A',
          document_type: 'Mining License',
          description: 'Primary mining license for copper extraction operations',
          file_name: 'mining_license_2024.pdf',
          file_size: 2457600,
          file_type: 'application/pdf',
          reference_number: 'ML/2024/001',
          issuing_authority: 'Ministry of Mines',
          issue_date: '2024-01-15',
          expiry_date: '2025-01-15',
          renewal_required: true,
          conditions: [
            'Environmental compliance monitoring required quarterly',
            'Safety inspections every 6 months',
            'Community liaison reports monthly'
          ],
          penalties: 'Non-compliance penalty up to K500,000',
          ai_analysis: {
            confidence_score: 0.95,
            key_dates_extracted: ['2025-01-15'],
            obligations_identified: 3,
            risk_level: 'medium'
          },
          created_at: '2024-01-15T10:00:00Z',
          updated_at: '2024-01-15T10:00:00Z'
        },
        {
          id: 2,
          title: 'Environmental Impact Permit',
          document_type: 'Environmental Permit',
          description: 'Environmental clearance for mining operations',
          file_name: 'environmental_permit_2024.pdf',
          file_size: 1843200,
          file_type: 'application/pdf',
          reference_number: 'EIA/2024/ZEMA/001',
          issuing_authority: 'ZEMA',
          issue_date: '2024-02-01',
          expiry_date: '2025-01-05',
          renewal_required: true,
          conditions: [
            'Water quality monitoring monthly',
            'Air quality assessments quarterly',
            'Biodiversity impact reports annually'
          ],
          penalties: 'Operations suspension and fines up to K1,000,000',
          ai_analysis: {
            confidence_score: 0.92,
            key_dates_extracted: ['2025-01-05'],
            obligations_identified: 5,
            risk_level: 'high'
          },
          created_at: '2024-02-01T14:30:00Z',
          updated_at: '2024-02-01T14:30:00Z'
        },
        {
          id: 3,
          title: 'Workers Compensation Insurance',
          document_type: 'Insurance Policy',
          description: 'Comprehensive workers compensation coverage',
          file_name: 'workers_comp_2024.pdf',
          file_size: 1024000,
          file_type: 'application/pdf',
          reference_number: 'WC/INS/2024/789',
          issuing_authority: 'Industrial Insurance Company',
          issue_date: '2024-01-01',
          expiry_date: '2024-12-31',
          renewal_required: true,
          conditions: [
            'Premium payments quarterly',
            'Incident reporting within 24 hours',
            'Safety training records maintenance'
          ],
          penalties: 'Loss of coverage and legal liability',
          ai_analysis: {
            confidence_score: 0.88,
            key_dates_extracted: ['2024-12-31'],
            obligations_identified: 4,
            risk_level: 'high'
          },
          created_at: '2024-01-01T09:00:00Z',
          updated_at: '2024-01-01T09:00:00Z'
        }
      ].map(doc => ({
        ...doc,
        status: getDocumentStatus(doc)
      }));
    } finally {
      loading.value = false;
    }
  };

  const uploadDocument = async () => {
    if (!uploadFile.value || !uploadMetadata.value.document_type) {
      error.value = 'Please select a file and document type';
      return;
    }

    uploading.value = true;
    error.value = null;

    try {
      const formData = new FormData();
      formData.append('file', uploadFile.value);
      formData.append('tenant_id', getTenantId());
      formData.append('document_type', uploadMetadata.value.document_type);
      formData.append('title', uploadMetadata.value.title || uploadFile.value.name);
      formData.append('description', uploadMetadata.value.description || '');
      formData.append('issuing_authority', uploadMetadata.value.issuing_authority || '');
      formData.append('reference_number', uploadMetadata.value.reference_number || '');

      const response = await fetch(`${API_BASE_URL}/compliance/documents/upload`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(extractErrorMessage(errorData) || `HTTP ${response.status}`);
      }

      const uploadedDocument = await response.json();
      
      // Add to documents list with computed status
      const documentWithStatus = {
        ...uploadedDocument,
        status: getDocumentStatus(uploadedDocument)
      };
      documents.value.unshift(documentWithStatus);

      // Reset form
      resetUploadForm();

      // Trigger AI analysis
      if (uploadedDocument.id) {
        await analyzeDocument(uploadedDocument.id);
      }

    } catch (err) {
      console.error('Error uploading document:', err);
      error.value = err.message;
    } finally {
      uploading.value = false;
    }
  };

  const analyzeDocument = async (documentId) => {
    analyzing.value = true;
    error.value = null;

    try {
      const response = await fetch(`${API_BASE_URL}/compliance/documents/${documentId}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tenant_id: getTenantId()
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(extractErrorMessage(errorData) || `HTTP ${response.status}`);
      }

      const analysis = await response.json();
      analysisResults.value = analysis;

      // Update document with analysis results
      const docIndex = documents.value.findIndex(doc => doc.id === documentId);
      if (docIndex !== -1) {
        documents.value[docIndex] = {
          ...documents.value[docIndex],
          ...analysis.document_updates,
          ai_analysis: analysis.ai_analysis,
          status: getDocumentStatus({
            ...documents.value[docIndex],
            ...analysis.document_updates
          })
        };
      }

    } catch (err) {
      console.error('Error analyzing document:', err);
      error.value = err.message;
    } finally {
      analyzing.value = false;
    }
  };

  const deleteDocument = async (documentId) => {
    if (!confirm('Are you sure you want to delete this document?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/compliance/documents/${documentId}?tenant_id=${getTenantId()}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(extractErrorMessage(errorData) || `HTTP ${response.status}`);
      }

      // Remove from local list
      documents.value = documents.value.filter(doc => doc.id !== documentId);

    } catch (err) {
      console.error('Error deleting document:', err);
      error.value = err.message;
    }
  };

  const downloadDocument = async (documentId, fileName) => {
    try {
      const response = await fetch(`${API_BASE_URL}/compliance/documents/${documentId}/download?tenant_id=${getTenantId()}`);
      
      if (!response.ok) {
        throw new Error(`Failed to download document: ${response.status}`);
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
      console.error('Error downloading document:', err);
      error.value = err.message;
    }
  };

  const resetUploadForm = () => {
    uploadFile.value = null;
    uploadMetadata.value = {
      document_type: '',
      title: '',
      description: '',
      issuing_authority: '',
      reference_number: ''
    };
  };

  const selectDocument = (document) => {
    selectedDocument.value = document;
  };

  const clearSelection = () => {
    selectedDocument.value = null;
    analysisResults.value = null;
  };

  // Initialize
  onMounted(() => {
    fetchDocuments();
  });

  return {
    // State
    documents,
    loading,
    error,
    uploading,
    analyzing,
    selectedDocument,
    analysisResults,

    // Filters and options
    filters,
    documentTypes,
    statusOptions,

    // Upload
    uploadFile,
    uploadMetadata,

    // Computed
    expiringDocuments,
    expiredDocuments,
    filteredDocuments,

    // Methods
    fetchDocuments,
    uploadDocument,
    analyzeDocument,
    deleteDocument,
    downloadDocument,
    resetUploadForm,
    selectDocument,
    clearSelection,
    getDocumentStatus,
    formatFileSize
  };
}