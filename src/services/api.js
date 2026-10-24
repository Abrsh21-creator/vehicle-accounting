/**
 * API Service for Vehicle Accounting Dashboard
 * Handles all communication with the backend
 */

// Backend API URL - Update this after deploying to Render
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

/**
 * API Methods
 */
export const api = {
  // Health check
  health: async () => {
    return fetchAPI('/health');
  },

  // Shareholders
  getShareholders: async () => {
    return fetchAPI('/shareholders');
  },

  // Monthly Records
  getRecords: async (limit = 100, offset = 0) => {
    return fetchAPI(`/records?limit=${limit}&offset=${offset}`);
  },

  getRecord: async (id) => {
    return fetchAPI(`/records/${id}`);
  },

  createRecord: async (data) => {
    return fetchAPI('/records', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateRecord: async (id, data) => {
    return fetchAPI(`/records/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteRecord: async (id) => {
    return fetchAPI(`/records/${id}`, {
      method: 'DELETE',
    });
  },

  // Statistics
  getStatistics: async () => {
    return fetchAPI('/statistics');
  },
};

export default api;
