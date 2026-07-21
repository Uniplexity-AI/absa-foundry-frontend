/**
 * CRM Email API Service
 * Handles sending, scheduling, and tracking emails from CRM
 */

import API_BASE_URL from './api';

/**
 * Send an email from CRM
 * @param {Object} emailData - Email data including recipients, subject, body, etc.
 * @returns {Promise<Object>} Response with email ID and status
 */
export async function sendCRMEmail(emailData) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/crm/emails/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to send email');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

/**
 * Schedule an email for later delivery
 * @param {Object} emailData - Email data with scheduled_time
 * @returns {Promise<Object>} Response with email ID and status
 */
export async function scheduleEmail(emailData) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/crm/emails/schedule`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to schedule email');
    }

    return await response.json();
  } catch (error) {
    console.error('Error scheduling email:', error);
    throw error;
  }
}

/**
 * Get list of emails
 * @param {string} tenantId - Tenant ID
 * @param {string} folder - Email folder (inbox, sent, scheduled, drafts)
 * @param {string} linkedRecordId - Optional: Filter by linked CRM record
 * @param {number} limit - Number of emails to fetch
 * @param {number} skip - Number of emails to skip
 * @returns {Promise<Object>} List of emails and total count
 */
export async function getCRMEmails(folder = 'all', linkedRecordId = null, limit = 50, skip = 0) {
  try {
    const token = localStorage.getItem('token');
    let url = `${API_BASE_URL}/crm/emails/list?folder=${folder}&limit=${limit}&skip=${skip}`;

    if (linkedRecordId) {
      url += `&linked_record_id=${linkedRecordId}`;
    }

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch emails');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching emails:', error);
    throw error;
  }
}

/**
 * Get email statistics
 * @param {string} tenantId - Tenant ID
 * @param {string} userEmail - Optional: Filter by user email
 * @returns {Promise<Object>} Email statistics
 */
export async function getEmailStats(userEmail = null) {
  try {
    const token = localStorage.getItem('token');
    let url = `${API_BASE_URL}/crm/emails/stats`;

    if (userEmail) {
      url += `&user_email=${userEmail}`;
    }

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch email stats');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching email stats:', error);
    throw error;
  }
}

/**
 * Track email action (open, click, bounce, reply)
 * @param {Object} trackingData - Tracking data
 * @returns {Promise<Object>} Success status
 */
export async function trackEmailAction(trackingData) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/crm/emails/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(trackingData)
    });

    if (!response.ok) {
      throw new Error('Failed to track email action');
    }

    return await response.json();
  } catch (error) {
    console.error('Error tracking email action:', error);
    throw error;
  }
}

/**
 * Get email detail
 * @param {string} emailId - Email ID
 * @returns {Promise<Object>} Email details
 */
export async function getEmailDetail(emailId) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/crm/emails/${emailId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch email detail');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching email detail:', error);
    throw error;
  }
}

/**
 * Get email configurations for tenant
 * @param {string} tenantId - Tenant ID
 * @returns {Promise<Array>} List of email configurations
 */
export async function getEmailConfigurations(tenantId) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/email-configurations/?tenant_id=${tenantId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch email configurations');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching email configurations:', error);
    throw error;
  }
}

/**
 * Create or update email configuration
 * Uses POST for new, PUT for existing (when configData.id is set)
 * @param {Object} configData - Email configuration data
 * @returns {Promise<Object>} Created/updated configuration
 */
export async function saveEmailConfiguration(configData) {
  try {
    const token = localStorage.getItem('token');
    const configId = configData.id || configData._id;
    const isUpdate = !!configId;

    // For updates, strip id/_id from the body so only the EmailConfigurationUpdate fields are sent
    const body = isUpdate ? { ...configData } : configData;
    if (isUpdate) {
      delete body.id;
      delete body._id;
    }

    const url = isUpdate
      ? `${API_BASE_URL}/email-configurations/${configId}`
      : `${API_BASE_URL}/email-configurations/`;

    const response = await fetch(url, {
      method: isUpdate ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to save email configuration');
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving email configuration:', error);
    throw error;
  }
}

/**
 * Delete email configuration
 * @param {string} configId - Configuration ID to delete
 * @returns {Promise<Object>} Deletion result
 */
export async function deleteEmailConfiguration(configId) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/email-configurations/${configId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to delete email configuration');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting email configuration:', error);
    throw error;
  }
}

/**
 * Test email configuration
 * @param {string} configId - Configuration ID
 * @param {string} testEmail - Test email address
 * @returns {Promise<Object>} Test result
 */
export async function testEmailConfiguration(configId, testEmail) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/email-configurations/${configId}/test`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        test_email: testEmail
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Test failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error testing email configuration:', error);
    throw error;
  }
}
