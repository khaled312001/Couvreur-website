const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.bnbatiment.com/api';

export const submitQuoteRequest = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/quotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to submit quote request');
    }
    return await response.json();
  } catch (error) {
    console.error('Error submitting quote request:', error);
    throw error;
  }
};

export const fetchQuotes = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/admin/quotes`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch quotes');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return [];
  }
};

export const fetchQuoteById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/admin/quotes/${id}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Quote not found');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching quote:', error);
    return null;
  }
};

export const updateQuote = async (id, data) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/admin/quotes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update quote');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating quote:', error);
    throw error;
  }
};

export const deleteQuote = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/admin/quotes/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete quote');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting quote:', error);
    throw error;
  }
};

export const getQuotesByStatus = async (status) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/admin/quotes/status/${status}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch quotes by status');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching quotes by status:', error);
    return [];
  }
};

export const getQuotesByUrgency = async (urgency) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/admin/quotes/urgency/${urgency}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch quotes by urgency');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching quotes by urgency:', error);
    return [];
  }
};
