'use client';

import React from 'react';
import { Menu, Bell, Search, Shield, Users, Heart } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface HeaderProps {
  onMenuClick: () => void;
  onNotificationClick: () => void;
}

export default function Header({ onMenuClick, onNotificationClick }: HeaderProps) {
  const { user, isAdmin, isStaff, isVolunteer } = useAuth();

  const getRoleIcon = () => {
    if (isAdmin) return <Shield size={16} className="text-purple-600" />;
    if (isStaff) return <Users size={16} className="text-blue-600" />;
    if (isVolunteer) return <Heart size={16} className="text-pink-600" />;
    return null;
  };

  const getRoleBadgeColor = () => {
    if (isAdmin) return 'bg-purple-100 text-purple-700 border-purple-200';
    if (isStaff) return 'bg-blue-100 text-blue-700 border-blue-200';
    if (isVolunteer) return 'bg-pink-100 text-pink-700 border-pink-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getAvatarColor = () => {
    if (isAdmin) return 'from-purple-600 to-purple-400';
    if (isStaff) return 'from-blue-600 to-blue-400';
    if (isVolunteer) return 'from-pink-600 to-pink-400';
    return 'from-gray-600 to-gray-400';
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu size={24} />
          </button>
          
          {/* Search Bar */}
          <div className="relative max-w-md w-full hidden md:block">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={
                isVolunteer 
                  ? "Search your tasks..." 
                  : "Search tasks, programs, or team members..."
              }
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button 
            onClick={onNotificationClick}
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </button>
          
          {/* User Profile with Role Badge */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <div className="text-sm font-medium text-gray-900">{user?.name || 'User'}</div>
              <div className={`text-xs px-2 py-0.5 rounded-full border flex items-center gap-1 justify-end mt-1 ${getRoleBadgeColor()}`}>
                {getRoleIcon()}
                <span className="font-semibold">
                  {isAdmin ? 'Admin' : isStaff ? 'Staff' : isVolunteer ? 'Volunteer' : 'User'}
                </span>
              </div>
            </div>
            <div className={`w-10 h-10 bg-gradient-to-br ${getAvatarColor()} rounded-full flex items-center justify-center text-white font-semibold shadow-lg cursor-pointer hover:scale-110 transition-transform`}>
              {user?.name?.charAt(0) || 'U'}
            </div>
          </div>
        </div>
      </div>

      {/* Role-specific quick info bar */}
      {user && (
        <div className={`border-t px-6 py-2 text-xs ${
          isAdmin ? 'bg-purple-50 text-purple-700' :
          isStaff ? 'bg-blue-50 text-blue-700' :
          'bg-pink-50 text-pink-700'
        }`}>
          <div className="flex items-center justify-between">
            <span className="font-medium">
              {isAdmin && '👑 Full System Access'}
              {isStaff && '📊 Staff Member - View & Report Access'}
              {isVolunteer && '💝 Volunteer - Manage Your Tasks'}
            </span>
            {user.program && (
              <span className="text-xs">
                Program: <strong>{user.program}</strong>
              </span>
            )}
          </div>
        </div>
      )}
    </header>
  );
}