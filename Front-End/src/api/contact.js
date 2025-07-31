const API_BASE_URL = 'http://localhost:8000/api';

export const submitContactForm = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to submit contact form');
    }
    return await response.json();
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};

export const fetchContactMessages = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/admin/contact`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch contact messages');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return [];
  }
};

export const fetchContactMessageById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/admin/contact/${id}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Contact message not found');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching contact message:', error);
    return null;
  }
};

export const updateContactMessage = async (id, data) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/admin/contact/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update contact message');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating contact message:', error);
    throw error;
  }
};

export const deleteContactMessage = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/admin/contact/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete contact message');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting contact message:', error);
    throw error;
  }
};

export const getContactMessagesByStatus = async (status) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/admin/contact/status/${status}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch contact messages by status');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching contact messages by status:', error);
    return [];
  }
};

export const getUnreadContactMessages = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/admin/contact/unread`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch unread contact messages');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching unread contact messages:', error);
    return [];
  }
}; 