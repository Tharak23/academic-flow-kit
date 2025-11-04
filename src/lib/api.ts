import { config } from '@/config';

/**
 * API Client for communicating with the backend
 * Automatically includes Clerk authentication token
 */
class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = config.apiUrl;
  }

  /**
   * Get authentication token from Clerk
   */
  private async getAuthToken(): Promise<string | null> {
    try {
      // Get token from localStorage (stored by Clerk)
      const clerkSession = localStorage.getItem('__clerk_session');
      if (clerkSession) {
        return clerkSession;
      }
      
      // Try to get from window.__clerk if available
      if (typeof window !== 'undefined' && (window as any).__clerk) {
        const session = await (window as any).__clerk.session?.getToken();
        return session || null;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  }

  /**
   * Make an authenticated request
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = await this.getAuthToken();
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // GET request
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  // POST request
  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT request
  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PATCH request
  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // Auth endpoints
  auth = {
    getCurrentUser: () => this.get('/auth/me'),
    updateMetadata: (data: any) => this.patch('/auth/me', data),
    verifyToken: () => this.get('/auth/verify'),
  };

  // Projects endpoints
  projects = {
    getAll: (params?: { myProjects?: boolean }) => {
      const query = params?.myProjects ? '?myProjects=true' : '';
      return this.get(`/projects${query}`);
    },
    getById: (id: string) => this.get(`/projects/${id}`),
    create: (data: any) => this.post('/projects', data),
    update: (id: string, data: any) => this.put(`/projects/${id}`, data),
    delete: (id: string) => this.delete(`/projects/${id}`),
  };

  // Tasks endpoints
  tasks = {
    getAll: (params?: { projectId?: string; myTasks?: boolean }) => {
      const queryParams = new URLSearchParams();
      if (params?.projectId) queryParams.set('projectId', params.projectId);
      if (params?.myTasks) queryParams.set('myTasks', 'true');
      const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
      return this.get(`/tasks${query}`);
    },
    getById: (id: string) => this.get(`/tasks/${id}`),
    create: (data: any) => this.post('/tasks', data),
    update: (id: string, data: any) => this.put(`/tasks/${id}`, data),
    delete: (id: string) => this.delete(`/tasks/${id}`),
  };

  // Messages endpoints
  messages = {
    getAll: () => this.get('/messages'),
    getConversation: (otherUserId: string) => 
      this.get(`/messages/conversation/${otherUserId}`),
    send: (data: { receiverId: string; content: string }) => 
      this.post('/messages', data),
    markAsRead: (id: string) => this.patch(`/messages/${id}/read`, {}),
    delete: (id: string) => this.delete(`/messages/${id}`),
  };

  // Profile endpoints
  profile = {
    get: () => this.get('/profile'),
    update: (data: any) => this.put('/profile', data),
    getUser: (userId: string) => this.get(`/profile/${userId}`),
  };
}

// Export singleton instance
export const api = new ApiClient();

