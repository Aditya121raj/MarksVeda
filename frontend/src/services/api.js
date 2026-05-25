/**
 * MarksVeda Frontend API Services
 * Centralized service layer for all HTTP communications with backend APIs.
 */

const API_URL = import.meta.env.VITE_API_URL || 'https://marksveda.onrender.com';
export const api = {
  async fetchTutorPool(signal) {
    const res = await fetch(`${API_URL}/api/requests/tutorpool`, { signal });

    if (!res.ok) {
      throw new Error('Failed to fetch tutor spotlight pool');
    }

    return res.json();
  },

  async submitTuitionInquiry(formData) {
    const res = await fetch(`${API_URL}/api/requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to submit enquiry');
    }

    return data.data;
  },

  async trackRequest(phone) {
    const res = await fetch(
      `${API_URL}/api/requests/track?phone=${encodeURIComponent(phone)}`
    );

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to retrieve booking status');
    }

    return data.data;
  },

  async fetchRequests() {
    const res = await fetch(`${API_URL}/api/requests`);

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch requests');
    }

    return data.data;
  },

  async assignTutor(reqId, tutor) {
    const res = await fetch(
      `${API_URL}/api/requests/${reqId}/assign`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tutor,
          status: 'Assigned & Learning',
          demoDate: new Date(Date.now() + 86400000)
            .toISOString()
            .split('T')[0],
          demoTime: '05:00 PM'
        })
      }
    );

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to assign tutor');
    }

    return data;
  },

  async updateRequestStatus(reqId, status) {
    const res = await fetch(
      `${API_URL}/api/requests/${reqId}/status`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      }
    );

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to update status');
    }

    return data;
  },

  async deleteRequest(reqId) {
    const res = await fetch(
      `${API_URL}/api/requests/${reqId}`,
      {
        method: 'DELETE'
      }
    );

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to delete inquiry');
    }

    return data;
  }
};
