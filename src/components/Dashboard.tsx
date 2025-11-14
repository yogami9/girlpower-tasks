'use client';

import React from 'react';
import { CheckSquare, Clock, Bell, Users, Target } from 'lucide-react';
import StatCard from './dashboard/StatCard';
import ProgramProgress from './dashboard/ProgramProgress';
import RecentActivity from './dashboard/RecentActivity';
import UpcomingDeadlines from './dashboard/UpcomingDeadlines';
import { programs, tasks } from '@/data/mockData';
import { useAuth } from '@/context/AuthContext';

export default function Dashboard() {
  const { user, isAdmin, isStaff, isVolunteer } = useAuth();

  // Filter tasks based on role
  const getVisibleTasks = () => {
    if (isAdmin || isStaff) {
      return tasks; // See all tasks
    }
    if (isVolunteer && user) {
      // Only see own tasks
      return tasks.filter(t => t.assignee === user.name);
    }
    return [];
  };

  const visibleTasks = getVisibleTasks();

  // Calculate stats based on visible tasks
  const roleBasedStats = {
    totalTasks: visibleTasks.length,
    completed: visibleTasks.filter(t => t.status === 'completed').length,
    inProgress: visibleTasks.filter(t => t.status === 'in-progress').length,
    overdue: visibleTasks.filter(t => t.status === 'overdue').length,
    pending: visibleTasks.filter(t => t.status === 'pending').length,
  };

  const statCards = [
    { 
      label: isVolunteer ? 'My Tasks' : 'Total Tasks', 
      value: roleBasedStats.totalTasks, 
      icon: CheckSquare, 
      color: 'bg-purple-500' 
    },
    { 
      label: 'Completed', 
      value: roleBasedStats.completed, 
      icon: CheckSquare, 
      color: 'bg-green-500' 
    },
    { 
      label: 'In Progress', 
      value: roleBasedStats.inProgress, 
      icon: Clock, 
      color: 'bg-blue-500' 
    },
    { 
      label: 'Overdue', 
      value: roleBasedStats.overdue, 
      icon: Bell, 
      color: 'bg-red-500' 
    },
    { 
      label: 'Pending', 
      value: roleBasedStats.pending, 
      icon: Clock, 
      color: 'bg-yellow-500' 
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Message with Role Info */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Welcome back, {user?.name || 'User'}!
            </h2>
            <p className="text-gray-600 mt-1">
              {isAdmin && "You have full access to all system features."}
              {isStaff && "You can manage tasks and view reports."}
              {isVolunteer && "Here's an overview of your assigned tasks."}
            </p>
          </div>
          <div className={`px-4 py-2 rounded-full font-semibold ${
            isAdmin ? 'bg-purple-100 text-purple-700' :
            isStaff ? 'bg-blue-100 text-blue-700' :
            'bg-pink-100 text-pink-700'
          }`}>
            {user?.role.charAt(0).toUpperCase()}{user?.role.slice(1)}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* Additional Stats for Admin/Staff */}
      {(isAdmin || isStaff) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-purple-500 w-12 h-12 rounded-lg flex items-center justify-center">
                <Users className="text-white" size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">24</div>
                <div className="text-sm text-gray-600">Active Team Members</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center">
                <Target className="text-white" size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">7</div>
                <div className="text-sm text-gray-600">Active Programs</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center">
                <CheckSquare className="text-white" size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">68%</div>
                <div className="text-sm text-gray-600">Completion Rate</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Program Progress - Show to all roles */}
        <ProgramProgress programs={programs} />

        {/* Recent Activity - Filtered by role */}
        <RecentActivity tasks={visibleTasks} />
      </div>

      {/* Upcoming Deadlines - Filtered by role */}
      <UpcomingDeadlines tasks={visibleTasks} />

      {/* Volunteer-Specific Tips */}
      {isVolunteer && (
        <div className="bg-pink-50 border border-pink-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-pink-900 mb-2">📌 Tips for Volunteers</h3>
          <ul className="space-y-2 text-sm text-pink-800">
            <li>✓ You can create and edit your own tasks</li>
            <li>✓ Check the Calendar view to see your upcoming deadlines</li>
            <li>✓ Update task status as you make progress</li>
            <li>✓ Contact your supervisor if you need help with any task</li>
          </ul>
        </div>
      )}

      {/* Staff-Specific Info */}
      {isStaff && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">📊 Staff Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-semibold text-blue-900 mb-1">Your Permissions:</div>
              <ul className="space-y-1 text-blue-700">
                <li>✓ View all tasks</li>
                <li>✓ Manage your tasks</li>
                <li>✓ Generate reports</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-blue-900 mb-1">Quick Actions:</div>
              <ul className="space-y-1 text-blue-700">
                <li>→ Create new task</li>
                <li>→ View analytics</li>
                <li>→ Check reports</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-blue-900 mb-1">Your Program:</div>
              <div className="text-blue-700">{user?.program || 'General'}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}