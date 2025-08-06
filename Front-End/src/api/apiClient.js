// تحديد URL الباك إند حسب البيئة
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.bnbatiment.com/api';

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

    // Only log in development mode
    if (process.env.NODE_ENV === 'development') {
      console.log('apiClient: Making request to:', url);
    }

    try {
      const response = await fetch(url, config);
      
      // Only log response status in development mode
      if (process.env.NODE_ENV === 'development') {
        console.log('apiClient: Response status:', response.status);
      }
      
      if (!response.ok) {
        if (response.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          throw new Error('Unauthorized');
        }
        
        // Try to get detailed error information
        try {
          const errorData = await response.json();
          console.error('apiClient: Error response:', errorData);
          if (errorData.errors) {
            throw new Error(`Validation errors: ${JSON.stringify(errorData.errors)}`);
          } else if (errorData.message) {
            throw new Error(errorData.message);
          }
        } catch (parseError) {
          // If we can't parse the error response, fall back to status code
          console.error('apiClient: Could not parse error response:', parseError);
        }
        
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle different response types
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const jsonResponse = await response.json();
        // Only log response in development mode
        if (process.env.NODE_ENV === 'development') {
          console.log('apiClient: JSON response:', jsonResponse);
        }
        return jsonResponse;
      } else if (contentType && contentType.includes('text/csv')) {
        return await response.blob();
      } else {
        return await response.text();
      }
    } catch (error) {
      console.error('apiClient: API request failed:', error);
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

const apiClient = new ApiClient();
export default apiClient; 