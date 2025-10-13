
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface ApiError {
  message: string;
  status: number;
}

class ApiService {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('auth_token');
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getToken();
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      
      if (!response.ok) {
        const error: ApiError = {
          message: await response.text(),
          status: response.status,
        };
        throw error;
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Generic CRUD methods
  get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // File upload
  async uploadFile(endpoint: string, file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    const token = this.getToken();
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    if (!response.ok) throw new Error('Upload failed');
    return response.json();
  }
}

export const apiService = new ApiService();

// src/services/tasks.ts
import { apiService } from './api';
import { Task } from '@/types';

export const taskService = {
  // Get all tasks
  getTasks: async (filters?: {
    program?: string;
    status?: string;
    priority?: string;
  }): Promise<Task[]> => {
    const params = new URLSearchParams(filters as any);
    return apiService.get(`/tasks?${params}`);
  },

  // Get single task
  getTask: (id: string): Promise<Task> => {
    return apiService.get(`/tasks/${id}`);
  },

  // Create task
  createTask: (data: Partial<Task>): Promise<Task> => {
    return apiService.post('/tasks', data);
  },

  // Update task
  updateTask: (id: string, data: Partial<Task>): Promise<Task> => {
    return apiService.put(`/tasks/${id}`, data);
  },

  // Delete task
  deleteTask: (id: string): Promise<void> => {
    return apiService.delete(`/tasks/${id}`);
  },

  // Bulk operations
  bulkUpdateStatus: (taskIds: string[], status: string): Promise<void> => {
    return apiService.post('/tasks/bulk-update', { taskIds, status });
  },

  // Task comments
  getComments: (taskId: string): Promise<any[]> => {
    return apiService.get(`/tasks/${taskId}/comments`);
  },

  addComment: (taskId: string, content: string): Promise<any> => {
    return apiService.post(`/tasks/${taskId}/comments`, { content });
  },

  // Task attachments
  uploadAttachment: (taskId: string, file: File): Promise<any> => {
    return apiService.uploadFile(`/tasks/${taskId}/attachments`, file);
  },
};

// src/services/auth.ts
import { apiService } from './api';

export const authService = {
  login: async (email: string, password: string) => {
    const response = await apiService.post<{ token: string; user: any }>(
      '/auth/login',
      { email, password }
    );
    apiService.setToken(response.token);
    return response;
  },

  register: async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    return apiService.post('/auth/register', data);
  },

  logout: () => {
    apiService.clearToken();
  },

  getCurrentUser: async () => {
    return apiService.get('/auth/me');
  },

  updateProfile: async (data: any) => {
    return apiService.put('/auth/profile', data);
  },
};

// src/hooks/useTasks.ts - React Query integration
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '@/services/tasks';
import { Task } from '@/types';

export function useTasks(filters?: any) {
  return useQuery({
    queryKey: ['tasks', filters],
    queryFn: () => taskService.getTasks(filters),
  });
}

export function useTask(id: string) {
  return useQuery({
    queryKey: ['task', id],
    queryFn: () => taskService.getTask(id),
    enabled: !!id,
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<Task>) => taskService.createTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Task> }) =>
      taskService.updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => taskService.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}