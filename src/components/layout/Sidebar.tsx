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
  Calendar,
  Shield,
  LogOut
} from 'lucide-react';
import { ViewType } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  currentView: ViewType;
  onClose: () => void;
  onViewChange: (view: ViewType) => void;
}

interface MenuItem {
  id: ViewType;
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  roles: ('admin' | 'staff' | 'volunteer')[];
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['admin', 'staff', 'volunteer'] },
  { id: 'tasks', icon: CheckSquare, label: 'Tasks', roles: ['admin', 'staff', 'volunteer'] },
  { id: 'programs', icon: FolderOpen, label: 'Programs', roles: ['admin', 'staff', 'volunteer'] },
  { id: 'calendar', icon: Calendar, label: 'Calendar', roles: ['admin', 'staff', 'volunteer'] },
  { id: 'analytics', icon: BarChart3, label: 'Analytics', roles: ['admin', 'staff'] },
  { id: 'reports', icon: FileText, label: 'Reports', roles: ['admin', 'staff'] },
];

export default function Sidebar({ isOpen, currentView, onClose, onViewChange }: SidebarProps) {
  const { user, logout, isAdmin, isStaff, isVolunteer } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  // Filter menu items based on user role
  const visibleMenuItems = menuItems.filter(item => {
    if (!user) return false;
    return item.roles.includes(user.role);
  });

  const getRoleBadge = () => {
    if (isAdmin) return { color: 'bg-purple-700', label: 'Admin' };
    if (isStaff) return { color: 'bg-blue-700', label: 'Staff' };
    if (isVolunteer) return { color: 'bg-pink-700', label: 'Volunteer' };
    return { color: 'bg-gray-700', label: 'User' };
  };

  const roleBadge = getRoleBadge();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar with custom scrollbar styling */}
      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(168, 85, 247, 0.5) transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          margin: 8px 0;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.5);
          border-radius: 20px;
          transition: background 0.3s ease;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.8);
        }

        .scroll-gradient-top {
          background: linear-gradient(to bottom, rgb(107, 33, 168) 0%, transparent 100%);
          pointer-events: none;
        }

        .scroll-gradient-bottom {
          background: linear-gradient(to top, rgb(88, 28, 135) 0%, transparent 100%);
          pointer-events: none;
        }
      `}</style>
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-gradient-to-b from-purple-800 to-purple-900 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-0'} overflow-hidden z-20 shadow-2xl`}>
        <div className="flex flex-col h-full">
          {/* Header - Fixed */}
          <div className="p-6 pb-4 flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold">GirlPower</h1>
                <p className="text-sm text-purple-200 mt-1">Task Management</p>
              </div>
              <button 
                onClick={onClose} 
                className="lg:hidden hover:bg-purple-700 p-2 rounded-lg transition-all duration-200 hover:rotate-90"
              >
                <X size={24} />
              </button>
            </div>

            {/* User Info with Role Badge */}
            {user && (
              <div className="bg-purple-700/50 rounded-lg p-3 backdrop-blur-sm border border-purple-600 hover:bg-purple-700/60 transition-all duration-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{user.name}</div>
                    <div className="text-xs text-purple-200 truncate">{user.email}</div>
                  </div>
                </div>
                <div className={`${roleBadge.color} text-xs font-semibold px-2 py-1 rounded-full text-center shadow-sm`}>
                  {roleBadge.label}
                </div>
              </div>
            )}
          </div>

          {/* Scrollable Content Area with Gradient Overlays */}
          <div className="flex-1 relative overflow-hidden">
            {/* Top Gradient Fade */}
            <div className="absolute top-0 left-0 right-0 h-8 scroll-gradient-top z-10" />
            
            {/* Scrollable Navigation */}
            <div className="h-full overflow-y-auto custom-scrollbar px-6 py-2">
              <nav className="space-y-1 pb-4">
                {visibleMenuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onViewChange(item.id);
                      if (window.innerWidth < 1024) {
                        onClose();
                      }
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      currentView === item.id 
                        ? 'bg-purple-700 shadow-lg scale-[1.02] translate-x-1' 
                        : 'hover:bg-purple-700/50 hover:translate-x-1'
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>

              {/* Team Info Card */}
              <div className="mb-4 p-4 bg-purple-700/50 rounded-lg backdrop-blur-sm border border-purple-600 hover:bg-purple-700/60 transition-all duration-200">
                <div className="flex items-center gap-2 mb-3">
                  <Users size={20} />
                  <span className="font-semibold">Your Access</span>
                </div>
                <div className="space-y-2 text-sm">
                  {isAdmin && (
                    <>
                      <div className="flex items-center gap-2">
                        <Shield size={14} className="text-green-400" />
                        <span>Full System Access</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-200">Manage Users</span>
                        <span className="font-bold text-green-400">✓</span>
                      </div>
                    </>
                  )}
                  {isStaff && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-purple-200">View All Tasks</span>
                        <span className="font-bold text-green-400">✓</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-200">Generate Reports</span>
                        <span className="font-bold text-green-400">✓</span>
                      </div>
                    </>
                  )}
                  {isVolunteer && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-purple-200">Create Tasks</span>
                        <span className="font-bold text-green-400">✓</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-200">View Own Tasks</span>
                        <span className="font-bold text-green-400">✓</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-8 scroll-gradient-bottom z-10" />
          </div>

          {/* Footer Section - Fixed */}
          <div className="p-6 pt-4 flex-shrink-0 border-t border-purple-700/50">
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition-all duration-200 mb-4 shadow-lg hover:shadow-xl hover:scale-[1.02]"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>

            {/* Footer Info */}
            <div className="text-xs text-purple-300 text-center">
              <p>© 2025 GirlPower</p>
              <p className="mt-1">Version 2.0.0</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}