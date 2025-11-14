// src/services/auth.ts
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

  register: async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
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

  updateProfile: async (data: any) => {
    return apiService.put('/auth/profile', data);
  },
};