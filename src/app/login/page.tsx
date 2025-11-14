// src/app/login/page.tsx - Enhanced with Role Information

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn, Mail, Lock, AlertCircle, Shield, Users, Heart } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const DEMO_ACCOUNTS = [
  {
    email: 'admin@girlpower.org',
    password: 'admin123',
    role: 'Admin',
    description: 'Full access to all features',
    icon: Shield,
    color: 'purple',
  },
  {
    email: 'staff@girlpower.org',
    password: 'staff123',
    role: 'Staff Member',
    description: 'Create & manage own tasks, view reports',
    icon: Users,
    color: 'blue',
  },
  {
    email: 'volunteer@girlpower.org',
    password: 'volunteer123',
    role: 'Volunteer',
    description: 'Create & view own tasks',
    icon: Heart,
    color: 'pink',
  },
];

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDemo, setShowDemo] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      router.push('/');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Invalid credentials';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (email: string, password: string) => {
    setFormData({ email, password });
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      router.push('/');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-900 px-4 py-8">
      <div className="max-w-6xl w-full">
        {/* Logo/Branding */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">GirlPower</h1>
          <p className="text-purple-200 text-lg">Task Management System</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to your account to continue</p>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-purple-600 focus:ring-purple-500" />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <button type="button" className="text-sm text-purple-600 hover:text-purple-700">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 font-medium disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn size={20} />
                    Sign In
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setShowDemo(!showDemo)}
                className="text-purple-600 hover:text-purple-700 font-medium text-sm"
              >
                {showDemo ? 'Hide' : 'Show'} Demo Accounts
              </button>
            </div>
          </div>

          {/* Demo Accounts Card */}
          {showDemo && (
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Try Demo Accounts</h3>
              <p className="text-sm text-gray-600 mb-6">
                Click any card below to login with that role
              </p>

              <div className="space-y-4">
                {DEMO_ACCOUNTS.map((account) => {
                  const IconComponent = account.icon;
                  return (
                    <button
                      key={account.email}
                      onClick={() => handleDemoLogin(account.email, account.password)}
                      disabled={loading}
                      className={`w-full p-4 rounded-lg border-2 transition-all hover:scale-102 hover:shadow-lg disabled:opacity-50 ${
                        account.color === 'purple' ? 'border-purple-200 hover:border-purple-400 bg-purple-50' :
                        account.color === 'blue' ? 'border-blue-200 hover:border-blue-400 bg-blue-50' :
                        'border-pink-200 hover:border-pink-400 bg-pink-50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          account.color === 'purple' ? 'bg-purple-600' :
                          account.color === 'blue' ? 'bg-blue-600' :
                          'bg-pink-600'
                        }`}>
                          <IconComponent className="text-white" size={24} />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-semibold text-gray-900">{account.role}</div>
                          <div className="text-sm text-gray-600 mt-1">{account.description}</div>
                          <div className="text-xs text-gray-500 mt-2">
                            {account.email}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs text-yellow-800">
                  <strong>Note:</strong> These are demo accounts for testing. Password is the role name + 123 (e.g., admin123)
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-purple-200 text-sm">
          <p>© 2025 GirlPower. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}