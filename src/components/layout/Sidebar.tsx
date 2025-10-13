
'use client';

import React from 'react';
import { 
  LayoutDashboard, 
  FolderOpen, 
  CheckSquare, 
  FileText, 
  Users, 
  X, 
  BarChart3, 
  Calendar 
} from 'lucide-react';
import { ViewType } from '@/types';

interface SidebarProps {
  isOpen: boolean;
  currentView: ViewType;
  onClose: () => void;
  onViewChange: (view: ViewType) => void;
}

const menuItems = [
  { id: 'dashboard' as ViewType, icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'tasks' as ViewType, icon: CheckSquare, label: 'Tasks' },
  { id: 'programs' as ViewType, icon: FolderOpen, label: 'Programs' },
  { id: 'calendar' as ViewType, icon: Calendar, label: 'Calendar' },
  { id: 'analytics' as ViewType, icon: BarChart3, label: 'Analytics' },
  { id: 'reports' as ViewType, icon: FileText, label: 'Reports' },
];

export default function Sidebar({ isOpen, currentView, onClose, onViewChange }: SidebarProps) {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-gradient-to-b from-purple-800 to-purple-900 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-0'} overflow-hidden z-20`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">GirlPower</h1>
              <p className="text-sm text-purple-200 mt-1">Task Management</p>
            </div>
            <button onClick={onClose} className="lg:hidden hover:bg-purple-700 p-2 rounded-lg transition-colors">
              <X size={24} />
            </button>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onViewChange(item.id);
                  // Close sidebar on mobile after selection
                  if (window.innerWidth < 1024) {
                    onClose();
                  }
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  currentView === item.id 
                    ? 'bg-purple-700 shadow-lg scale-105' 
                    : 'hover:bg-purple-700/50 hover:scale-102'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Team Info Card */}
          <div className="mt-8 p-4 bg-purple-700/50 rounded-lg backdrop-blur-sm border border-purple-600">
            <div className="flex items-center gap-2 mb-3">
              <Users size={20} />
              <span className="font-semibold">Team Overview</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-purple-200">Active Members</span>
                <span className="font-bold">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-200">Active Tasks</span>
                <span className="font-bold">47</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-200">Completion Rate</span>
                <span className="font-bold text-green-400">68%</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6">
            <p className="text-xs text-purple-300 uppercase font-semibold mb-3">Quick Actions</p>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-purple-700/50 rounded-lg transition-colors">
                + New Task
              </button>
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-purple-700/50 rounded-lg transition-colors">
                + New Program
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-purple-700">
          <div className="text-xs text-purple-300">
            <p>© 2025 GirlPower</p>
            <p className="mt-1">Version 2.0.0</p>
          </div>
        </div>
      </div>
    </>
  );
}