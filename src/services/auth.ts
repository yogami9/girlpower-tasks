// src/services/auth.ts - FIXED Type Mismatch
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

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: string;
}

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