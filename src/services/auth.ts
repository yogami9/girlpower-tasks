import { apiService } from './api';

export const authService = {
  login: async (email: string, password: string) => {
    // Mock authentication for demo
    // In production, this would call your actual API
    if (email && password) {
      const mockToken = 'mock-jwt-token-' + Date.now();
      const mockUser = {
        id: '1',
        name: 'Admin User',
        email: email,
        role: 'Executive Director'
      };
      
      apiService.setToken(mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      return { token: mockToken, user: mockUser };
    }
    throw new Error('Invalid credentials');
  },

  register: async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    // Mock registration
    return apiService.post('/auth/register', data);
  },

  logout: () => {
    apiService.clearToken();
    localStorage.removeItem('user');
  },

  getCurrentUser: async () => {
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