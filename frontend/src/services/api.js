/**
 * MarksVeda Frontend API Services
 * Centralized service layer for all HTTP communications with backend APIs.
 */

export const api = {
  /**
   * Fetch active elite pre-verified tutors spotlight pool
   * @param {AbortSignal} [signal] - Optional signal to abort fetch
   */
  async fetchTutorPool(signal) {
    const res = await fetch('/api/requests/tutorpool', { signal });
    if (!res.ok) throw new Error('Failed to fetch tutor spotlight pool');
    return res.json();
  },

  /**
   * Submit tuition inquiry form
   * @param {Object} formData - Form input fields
   */
  async submitTuitionInquiry(formData) {
    const res = await fetch('/api/requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Failed to submit enquiry');
    return data.data;
  },

  /**
   * Retrieve parent's live booking status timeline via phone number
   * @param {string} phone - User tracking phone number
   */
  async trackRequest(phone) {
    const res = await fetch(`/api/requests/track?phone=${encodeURIComponent(phone)}`);
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Failed to retrieve booking status');
    return data.data;
  },

  /**
   * Get all student lead requests (Coordinator Dashboard)
   */
  async fetchRequests() {
    const res = await fetch('/api/requests');
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Failed to fetch requests');
    return data.data;
  },

  /**
   * Assign elite tutor to a specific student inquiry (Coordinator Dashboard)
   * @param {string} reqId - Request database ID
   * @param {Object} tutor - Assigned tutor profile
   */
  async assignTutor(reqId, tutor) {
    const res = await fetch(`/api/requests/${reqId}/assign`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tutor,
        status: 'Assigned & Learning',
        demoDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
        demoTime: '05:00 PM'
      })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Failed to assign tutor');
    return data;
  },

  /**
   * Adjust pipeline status of an inquiry (Coordinator Dashboard)
   * @param {string} reqId - Request database ID
   * @param {string} status - New pipeline status
   */
  async updateRequestStatus(reqId, status) {
    const res = await fetch(`/api/requests/${reqId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Failed to update status');
    return data;
  },

  /**
   * Delete a student lead requirement permanently (Coordinator Dashboard)
   * @param {string} reqId - Request database ID
   */
  async deleteRequest(reqId) {
    const res = await fetch(`/api/requests/${reqId}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Failed to delete inquiry');
    return data;
  }
};
