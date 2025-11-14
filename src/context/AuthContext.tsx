// src/context/AuthContext.tsx - Updated with Role-Based Access Control

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole, hasPermission, Permission } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (permission: keyof Permission) => boolean;
  isAdmin: boolean;
  isStaff: boolean;
  isVolunteer: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for development
const MOCK_USERS: Record<string, User> = {
  'admin@girlpower.org': {
    id: '1',
    name: 'Admin User',
    email: 'admin@girlpower.org',
    role: 'admin',
    department: 'Administration',
    createdAt: '2025-01-01',
  },
  'staff@girlpower.org': {
    id: '2',
    name: 'Sarah Kamau',
    email: 'staff@girlpower.org',
    role: 'staff',
    department: 'Programs',
    program: 'Ndoto',
    createdAt: '2025-01-15',
  },
  'volunteer@girlpower.org': {
    id: '3',
    name: 'Grace Omondi',
    email: 'volunteer@girlpower.org',
    role: 'volunteer',
    program: 'Dadas',
    createdAt: '2025-02-01',
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      if (typeof window !== 'undefined') {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const currentUser = JSON.parse(userStr);
          setUser(currentUser);
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    // Mock authentication - check against mock users
    const mockUser = MOCK_USERS[email];
    
    if (!mockUser) {
      throw new Error('Invalid credentials');
    }

    // In production, validate password against backend
    if (password.length < 6) {
      throw new Error('Invalid credentials');
    }

    // Set user and store in localStorage
    const userWithLogin = {
      ...mockUser,
      lastLogin: new Date().toISOString(),
    };

    setUser(userWithLogin);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(userWithLogin));
      localStorage.setItem('auth_token', `mock-token-${mockUser.id}-${Date.now()}`);
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.removeItem('auth_token');
    }
  };

  const checkPermission = (permission: keyof Permission): boolean => {
    return hasPermission(user, permission);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
        hasPermission: checkPermission,
        isAdmin: user?.role === 'admin',
        isStaff: user?.role === 'staff',
        isVolunteer: user?.role === 'volunteer',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};