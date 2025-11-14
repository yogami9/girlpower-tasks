// src/services/auth.ts - FIXED
import { apiService } from './api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

// FIX: Proper type for register data instead of any
interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: string;
}

// FIX: Proper type for profile data instead of any
interface ProfileUpdateData {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    // Mock authentication for demo
    if (email && password) {
      const mockToken = 'mock-jwt-token-' + Date.now();
      const mockUser: User = {
        id: '1',
        name: 'Admin User',
        email: email,
        role: 'Executive Director'
      };
      
      apiService.setToken(mockToken);
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(mockUser));
      }
      
      return { token: mockToken, user: mockUser };
    }
    throw new Error('Invalid credentials');
  },

  register: async (data: RegisterData): Promise<LoginResponse> => {
    return apiService.post('/auth/register', data);
  },

  logout: () => {
    apiService.clearToken();
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  },

  getCurrentUser: async (): Promise<User | null> => {
    if (typeof window === 'undefined') return null;
    
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },

  updateProfile: async (data: ProfileUpdateData): Promise<User> => {
    return apiService.put('/auth/profile', data);
  },
};

// src/services/tasks.ts - FIXED
import { Task } from '@/types';

// FIX: Proper type for filters instead of any
interface TaskFilters {
  program?: string;
  status?: string;
  priority?: string;
  assignee?: string;
  search?: string;
}

// FIX: Proper type for bulk update instead of any
interface BulkUpdateData {
  taskIds: string[];
  status?: string;
  priority?: string;
  assignee?: string;
}

// FIX: Proper type for comment instead of any
interface Comment {
  id: string;
  taskId: string;
  author: string;
  content: string;
  createdAt: string;
}

// FIX: Proper type for attachment instead of any
interface Attachment {
  id: string;
  taskId: string;
  name: string;
  url: string;
  size: number;
  uploadedAt: string;
}

export const taskService = {
  // Get all tasks
  getTasks: async (filters?: TaskFilters): Promise<Task[]> => {
    const params = new URLSearchParams(filters as Record<string, string>);
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
  bulkUpdateStatus: (data: BulkUpdateData): Promise<void> => {
    return apiService.post('/tasks/bulk-update', data);
  },

  // Task comments
  getComments: (taskId: string): Promise<Comment[]> => {
    return apiService.get(`/tasks/${taskId}/comments`);
  },

  addComment: (taskId: string, content: string): Promise<Comment> => {
    return apiService.post(`/tasks/${taskId}/comments`, { content });
  },

  // Task attachments
  uploadAttachment: (taskId: string, file: File): Promise<Attachment> => {
    return apiService.uploadFile(`/tasks/${taskId}/attachments`, file);
  },
};

// src/types/index.ts - FIXED (only the problematic line)
// Replace line 120 with proper typing:

// OLD LINE 120:
// [key: string]: any;

// NEW - Add this interface for dynamic properties if needed:
export interface DynamicProperties {
  [key: string]: string | number | boolean | undefined | null | string[] | number[];
}