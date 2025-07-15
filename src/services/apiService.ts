import type { Review, NewReview } from '../types/review';

// API configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://studentspark-backend.onrender.com/api/v1'  // Update this with your actual Render backend URL
  : 'http://localhost:5000/api/v1';

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
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
  async getAllReviews(params: Record<string, any> = {}): Promise<Review[]> {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/reviews${queryString ? `?${queryString}` : ''}`;
    const response = await this.request(endpoint);
    return response.data;
  }

  async getReviewById(id: string): Promise<Review | null> {
    try {
      const response = await this.request(`/reviews/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching review by ID:', error);
      return null;
    }
  }

  async createReview(reviewData: NewReview): Promise<Review> {
    const response = await this.request('/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
    return response.data;
  }

  async updateReview(id: string, reviewData: Partial<NewReview>): Promise<Review> {
    const response = await this.request(`/reviews/${id}`, {
      method: 'PUT',
      body: JSON.stringify(reviewData),
    });
    return response.data;
  }

  async deleteReview(id: string): Promise<void> {
    await this.request(`/reviews/${id}`, {
      method: 'DELETE',
    });
  }

  async getReviewStats(): Promise<any> {
    const response = await this.request('/reviews/stats');
    return response.data;
  }

  // Health check
  async healthCheck(): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${process.env.NODE_ENV === 'production' ? 'https://studentspark-backend.onrender.com' : 'http://localhost:5000'}/health`);
      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      return { success: false, error: (error as Error).message };
    }
  }
}

// Create a singleton instance
const apiService = new ApiService();
export default apiService;
