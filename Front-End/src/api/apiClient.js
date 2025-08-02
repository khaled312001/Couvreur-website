const API_BASE_URL = 'http://localhost:8000/api';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getAuthHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        if (response.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          throw new Error('Unauthorized');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle different response types
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const jsonResponse = await response.json();
        return jsonResponse;
      } else if (contentType && contentType.includes('text/csv')) {
        return await response.blob();
      } else {
        return await response.text();
      }
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // GET request
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return this.request(url, { method: 'GET' });
  }

  // POST request
  async post(endpoint, data = {}) {
    const isFormData = data instanceof FormData;
    const headers = isFormData ? {} : this.getAuthHeaders();
    
    return this.request(endpoint, {
      method: 'POST',
      body: isFormData ? data : JSON.stringify(data),
      headers,
    });
  }

  // PUT request
  async put(endpoint, data = {}) {
    const isFormData = data instanceof FormData;
    const headers = isFormData ? {} : this.getAuthHeaders();
    
    console.log('PUT request - isFormData:', isFormData);
    console.log('PUT request - data type:', typeof data);
    console.log('PUT request - headers:', headers);
    
    return this.request(endpoint, {
      method: 'PUT',
      body: isFormData ? data : JSON.stringify(data),
      headers,
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // PATCH request
  async patch(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }
}

export const apiClient = new ApiClient(); 