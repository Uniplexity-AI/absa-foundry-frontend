import axios from 'axios';

import { API_BASE_URL } from './api';

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Get all documents with filters
 */
export async function getDocuments(tenantId, params = {}) {
  const response = await apiClient.get('/documents/', {
    params: {
      tenant_id: tenantId,
      ...params
    }
  });
  return response.data;
}

/**
 * Get a specific document
 */
export async function getDocument(documentId, tenantId) {
  const response = await apiClient.get(`/documents/${documentId}`, {
    params: { tenant_id: tenantId }
  });
  return response.data;
}

/**
 * Upload a new document
 */
export async function uploadDocument(documentData, tenantId) {
  // Create a new config that removes the default Content-Type header
  // This allows the browser to set the correct multipart/form-data with boundary
  const response = await apiClient.post('/documents/', documentData, {
    params: { tenant_id: tenantId },
    transformRequest: [(data, headers) => {
      delete headers['Content-Type'];
      return data;
    }]
  });
  return response.data;
}

/**
 * Update document metadata
 */
export async function updateDocument(documentId, updateData, tenantId) {
  const response = await apiClient.put(`/documents/${documentId}`, updateData, {
    params: { tenant_id: tenantId }
  });
  return response.data;
}

/**
 * Delete a document
 */
export async function deleteDocument(documentId, tenantId) {
  const response = await apiClient.delete(`/documents/${documentId}`, {
    params: { tenant_id: tenantId }
  });
  return response.data;
}

/**
 * Share document
 */
export async function shareDocument(documentId, shareData, tenantId) {
  const response = await apiClient.post(`/documents/${documentId}/share`, shareData, {
    params: { tenant_id: tenantId }
  });
  return response.data;
}

/**
 * Track document download
 */
export async function trackDownload(documentId, tenantId) {
  const response = await apiClient.post(`/documents/${documentId}/download`, {}, {
    params: { tenant_id: tenantId }
  });
  return response.data;
}

/**
 * Create new version of document
 */
export async function createNewVersion(documentId, versionData, tenantId) {
  const response = await apiClient.post(`/documents/${documentId}/version`, versionData, {
    params: { tenant_id: tenantId }
  });
  return response.data;
}

/**
 * Get all versions of a document
 */
export async function getDocumentVersions(documentId, tenantId) {
  const response = await apiClient.get(`/documents/${documentId}/versions`, {
    params: { tenant_id: tenantId }
  });
  return response.data;
}

/**
 * Get list of folders
 */
export async function getFolders(tenantId) {
  const response = await apiClient.get('/documents/folders/list', {
    params: { tenant_id: tenantId }
  });
  return response.data?.folders || [];
}

/**
 * Get document statistics
 */
export async function getDocumentStats(tenantId) {
  const response = await apiClient.get('/documents/stats', {
    params: { tenant_id: tenantId }
  });
  return response.data;
}

/**
 * Create invoice/quote document reference (no file upload)
 */
export async function createInvoiceReference(referenceData, tenantId) {
  const response = await apiClient.post('/documents/invoice-reference', referenceData, {
    params: { tenant_id: tenantId }
  });
  return response.data;
}

/**
 * Download invoice PDF via document reference
 */
export async function downloadInvoicePdf(documentId, tenantId) {
  const response = await apiClient.get(`/documents/${documentId}/download-invoice-pdf`, {
    params: { tenant_id: tenantId }
  });
  return response.data;
}

/**
 * Upload file to server (actual file upload)
 */
export async function uploadFile(file, tenantId, onUploadProgress) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('tenant_id', tenantId);

  const response = await apiClient.post('/documents/upload-file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: (progressEvent) => {
      if (onUploadProgress) {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onUploadProgress(percentCompleted);
      }
    }
  });
  return response.data;
}
