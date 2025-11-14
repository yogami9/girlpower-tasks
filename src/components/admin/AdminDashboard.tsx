// src/components/admin/AdminDashboard.tsx - Admin Overview

'use client';

import React, { useState } from 'react';
import { Users, CheckSquare, TrendingUp, AlertCircle, Shield, UserCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface UserActivity {
  id: string;
  name: string;
  role: 'admin' | 'staff' | 'volunteer';
  email: string;
  tasksCreated: number;
  tasksCompleted: number;
  lastActive: string;
  status: 'active' | 'inactive';
  program?: string;
}

const MOCK_USER_ACTIVITIES: UserActivity[] = [
  {
    id: '1',
    name: 'Admin User',
    role: 'admin',
    email: 'admin@girlpower.org',
    tasksCreated: 15,
    tasksCompleted: 12,
    lastActive: '2 hours ago',
    status: 'active',
  },
  {
    id: '2',
    name: 'Sarah Kamau',
    role: 'staff',
    email: 'staff@girlpower.org',
    tasksCreated: 23,
    tasksCompleted: 18,
    lastActive: '5 hours ago',
    status: 'active',
    program: 'Ndoto',
  },
  {
    id: '3',
    name: 'Grace Omondi',
    role: 'volunteer',
    email: 'volunteer@girlpower.org',
    tasksCreated: 8,
    tasksCompleted: 6,
    lastActive: '1 day ago',
    status: 'active',
    program: 'Dadas',
  },
  {
    id: '4',
    name: 'Mary Nafula',
    role: 'staff',
    email: 'mary@girlpower.org',
    tasksCreated: 31,
    tasksCompleted: 28,
    lastActive: '3 hours ago',
    status: 'active',
    program: 'AYP-SRHR Champions',
  },
  {
    id: '5',
    name: 'Jane Mueni',
    role: 'volunteer',
    email: 'jane@girlpower.org',
    tasksCreated: 12,
    tasksCompleted: 9,
    lastActive: '2 days ago',
    status: 'inactive',
    program: 'Ndoto Champs',
  },
];

export default function AdminDashboard() {
  const { isAdmin } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'all' | 'admin' | 'staff' | 'volunteer'>('all');
  const [users] = useState<UserActivity[]>(MOCK_USER_ACTIVITIES);

  if (!isAdmin) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <AlertCircle className="mx-auto text-red-600 mb-3" size={48} />
        <h3 className="text-lg font-semibold text-red-900 mb-2">Access Denied</h3>
        <p className="text-red-700">You do not have permission to view this page.</p>
      </div>
    );
  }

  const filteredUsers = selectedRole === 'all' 
    ? users 
    : users.filter(u => u.role === selectedRole);

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    staff: users.filter(u => u.role === 'staff').length,
    volunteers: users.filter(u => u.role === 'volunteer').length,
    totalTasksCreated: users.reduce((sum, u) => sum + u.tasksCreated, 0),
    totalTasksCompleted: users.reduce((sum, u) => sum + u.tasksCompleted, 0),
  };

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Shield size={32} />
          <h2 className="text-3xl font-bold">Admin Dashboard</h2>
        </div>
        <p className="text-purple-100">Monitor all users and their task progress</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center">
              <Users className="text-white" size={24} />
            </div>
            <span className="text-sm text-green-600 font-medium">+{stats.activeUsers} Active</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">{stats.totalUsers}</div>
          <div className="text-sm text-gray-600">Total Users</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-500 w-12 h-12 rounded-lg flex items-center justify-center">
              <UserCheck className="text-white" size={24} />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800">{stats.staff}</div>
          <div className="text-sm text-gray-600">Staff Members</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-pink-500 w-12 h-12 rounded-lg flex items-center justify-center">
              <Users className="text-white" size={24} />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800">{stats.volunteers}</div>
          <div className="text-sm text-gray-600">Volunteers</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center">
              <CheckSquare className="text-white" size={24} />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {Math.round((stats.totalTasksCompleted / stats.totalTasksCreated) * 100)}%
          </div>
          <div className="text-sm text-gray-600">Completion Rate</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex gap-2">
          {(['all', 'admin', 'staff', 'volunteer'] as const).map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                selectedRole === role
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {role === 'all' ? 'All Users' : `${role}s`}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tasks Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tasks Completed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Success Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => {
                const successRate = Math.round((user.tasksCompleted / user.tasksCreated) * 100);
                return (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                        user.role === 'staff' ? 'bg-blue-100 text-blue-700' :
                        'bg-pink-100 text-pink-700'
                      }`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {user.program || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="text-sm font-medium text-gray-900">{user.tasksCreated}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="text-sm font-medium text-green-600">{user.tasksCompleted}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              successRate >= 75 ? 'bg-green-500' :
                              successRate >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${successRate}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-700 w-10">
                          {successRate}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {user.lastActive}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="text-purple-600" size={20} />
            Top Performers
          </h3>
          <div className="space-y-3">
            {users
              .sort((a, b) => b.tasksCompleted - a.tasksCompleted)
              .slice(0, 5)
              .map((user, idx) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      idx === 0 ? 'bg-yellow-400 text-yellow-900' :
                      idx === 1 ? 'bg-gray-300 text-gray-700' :
                      idx === 2 ? 'bg-orange-300 text-orange-900' :
                      'bg-gray-200 text-gray-600'
                    }`}>
                      {idx + 1}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.role}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">{user.tasksCompleted}</div>
                    <div className="text-xs text-gray-500">completed</div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 pb-3 border-b">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">Sarah Kamau completed a task</p>
                <p className="text-xs text-gray-500">Ndoto Curriculum Training - 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 pb-3 border-b">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">Grace Omondi created a new task</p>
                <p className="text-xs text-gray-500">Sanitary Towel Distribution - 5 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 pb-3 border-b">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">Mary Nafula updated task status</p>
                <p className="text-xs text-gray-500">AYP Champions Report - 1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}