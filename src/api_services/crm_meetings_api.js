/**
 * CRM Meetings API Service
 * Frontend API functions for meeting management
 */

import API_BASE_URL from './api';

/**
 * Create a new meeting
 * @param {Object} meetingData - Meeting data
 * @returns {Promise<Object>} Created meeting
 */
export async function createMeeting(meetingData) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/crm/meetings/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(meetingData)
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Create meeting error details:', JSON.stringify(error, null, 2));
      throw new Error(JSON.stringify(error.detail) || 'Failed to create meeting');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating meeting:', error);
    throw error;
  }
}

/**
 * List meetings with filters
 * @param {Object} filters - Filter parameters
 * @returns {Promise<Object>} List of meetings
 */
export async function getMeetings(filters = {}) {
  try {
    const token = localStorage.getItem('token');

    // Build query params
    const params = new URLSearchParams();
    if (filters.tenant_id) params.append('tenant_id', filters.tenant_id);
    if (filters.status) params.append('status', filters.status);
    if (filters.meeting_type) params.append('meeting_type', filters.meeting_type);
    if (filters.start_date) params.append('start_date', filters.start_date);
    if (filters.end_date) params.append('end_date', filters.end_date);
    if (filters.organizer_id) params.append('organizer_id', filters.organizer_id);
    if (filters.related_record_id) params.append('related_record_id', filters.related_record_id);
    if (filters.limit) params.append('limit', filters.limit);
    if (filters.skip) params.append('skip', filters.skip);

    const response = await fetch(`${API_BASE_URL}/crm/meetings/list?${params.toString()}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch meetings');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching meetings:', error);
    throw error;
  }
}

/**
 * Get meeting by ID
 * @param {string} meetingId - Meeting ID
 * @returns {Promise<Object>} Meeting details
 */
export async function getMeetingById(meetingId) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/crm/meetings/${meetingId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to fetch meeting');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching meeting:', error);
    throw error;
  }
}

/**
 * Update meeting
 * @param {string} meetingId - Meeting ID
 * @param {Object} updateData - Update data
 * @returns {Promise<Object>} Updated meeting
 */
export async function updateMeeting(meetingId, updateData) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/crm/meetings/${meetingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updateData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to update meeting');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating meeting:', error);
    throw error;
  }
}

/**
 * Delete meeting
 * @param {string} meetingId - Meeting ID
 * @param {string} tenantId - Tenant ID
 * @returns {Promise<Object>} Success response
 */
export async function deleteMeeting(meetingId, tenantId) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/crm/meetings/${meetingId}?tenant_id=${tenantId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to delete meeting');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting meeting:', error);
    throw error;
  }
}

/**
 * Mark meeting as completed
 * @param {string} meetingId - Meeting ID
 * @param {string} outcome - Meeting outcome
 * @returns {Promise<Object>} Updated meeting
 */
export async function completeMeeting(meetingId, outcome = null) {
  try {
    const token = localStorage.getItem('token');
    const url = outcome
      ? `${API_BASE_URL}/crm/meetings/${meetingId}/complete?outcome=${encodeURIComponent(outcome)}`
      : `${API_BASE_URL}/crm/meetings/${meetingId}/complete`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to complete meeting');
    }

    return await response.json();
  } catch (error) {
    console.error('Error completing meeting:', error);
    throw error;
  }
}

/**
 * Cancel meeting
 * @param {string} meetingId - Meeting ID
 * @param {string} reason - Cancellation reason
 * @returns {Promise<Object>} Updated meeting
 */
export async function cancelMeeting(meetingId, reason = null) {
  try {
    const token = localStorage.getItem('token');
    const url = reason
      ? `${API_BASE_URL}/crm/meetings/${meetingId}/cancel?reason=${encodeURIComponent(reason)}`
      : `${API_BASE_URL}/crm/meetings/${meetingId}/cancel`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to cancel meeting');
    }

    return await response.json();
  } catch (error) {
    console.error('Error cancelling meeting:', error);
    throw error;
  }
}

/**
 * Add note to meeting
 * @param {string} meetingId - Meeting ID
 * @param {Object} noteData - Note data (author_id, author_name, content)
 * @returns {Promise<Object>} Added note
 */
export async function addMeetingNote(meetingId, noteData) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/crm/meetings/${meetingId}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(noteData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to add note');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding meeting note:', error);
    throw error;
  }
}

/**
 * Get meeting statistics
 * @param {string} tenantId - Tenant ID
 * @returns {Promise<Object>} Meeting statistics
 */
export async function getMeetingStats(tenantId) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/crm/meetings/stats/${tenantId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch meeting statistics');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching meeting stats:', error);
    throw error;
  }
}

/**
 * Get upcoming meetings
 * @param {string} tenantId - Tenant ID
 * @param {number} limit - Number of meetings to return
 * @returns {Promise<Object>} Upcoming meetings
 */
export async function getUpcomingMeetings(tenantId, limit = 10) {
  try {
    const now = new Date().toISOString();
    return await getMeetings({
      tenant_id: tenantId,
      status: 'scheduled',
      start_date: now,
      limit: limit
    });
  } catch (error) {
    console.error('Error fetching upcoming meetings:', error);
    throw error;
  }
}

/**
 * Get today's meetings
 * @param {string} tenantId - Tenant ID
 * @returns {Promise<Object>} Today's meetings
 */
export async function getTodaysMeetings(tenantId) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return await getMeetings({
      tenant_id: tenantId,
      start_date: today.toISOString(),
      end_date: tomorrow.toISOString()
    });
  } catch (error) {
    console.error('Error fetching today\'s meetings:', error);
    throw error;
  }
}
