import API_BASE_URL from './api';
import { decodeJWT } from './decodeJWT';

const { getTenantId } = decodeJWT();

/**
 * Send a notification to the UB Home Page and configured external channels (Email/WhatsApp)
 * 
 * @param {Object} notification - Notification details
 * @param {string} notification.title - Short title for the notification
 * @param {string} notification.message - Primary message body
 * @param {string} [notification.details] - Optional extra details
 * @param {string} [notification.category] - Optional category (e.g., 'crm', 'inventory', 'hr')
 * @param {string} [notification.recipient_email] - Optional direct recipient email (overrides tenant settings if provided)
 * @param {string[]} [notification.channels] - Optional specific channels to use (e.g., ['email', 'whatsapp'])
 * @returns {Promise<Object>} The API response
 */
export async function sendNotification(notification) {
    const tenantId = getTenantId();
    if (!tenantId) {
        throw new Error('No tenant ID found. User must be logged in.');
    }

    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/notifications?tenant_id=${tenantId}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                title: notification.title,
                message: notification.message,
                details: notification.details || '',
                category: notification.category || 'general',
                recipient_email: notification.recipient_email,
                recipient_whatsapp: notification.recipient_whatsapp,
                channels: notification.channels,
                auto_send: notification.auto_send,
                metadata: notification.metadata || {}
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to send notification');
        }

        return await response.json();
    } catch (error) {
        console.error('Notification Error:', error);
        throw error;
    }
}

export default {
    sendNotification
};
