// API configuration
const API_BASE_URL = 'http://localhost:5000/api/v1';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
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
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Review API methods
  async getAllReviews(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/reviews${queryString ? `?${queryString}` : ''}`;
    const response = await this.request(endpoint);
    return response.data;
  }

  async getReviewById(id) {
    const response = await this.request(`/reviews/${id}`);
    return response.data;
  }

  async createReview(reviewData) {
    const response = await this.request('/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
    return response.data;
  }

  async updateReview(id, reviewData) {
    const response = await this.request(`/reviews/${id}`, {
      method: 'PUT',
      body: JSON.stringify(reviewData),
    });
    return response.data;
  }

  async deleteReview(id) {
    const response = await this.request(`/reviews/${id}`, {
      method: 'DELETE',
    });
    return response;
  }

  async getReviewStats() {
    const response = await this.request('/reviews/stats');
    return response.data;
  }

  // Health check
  async healthCheck() {
    try {
      const response = await fetch(`http://localhost:5000/health`);
      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      return { success: false, error: error.message };
    }
  }
}

// Create a singleton instance
const apiService = new ApiService();
export default apiService;
