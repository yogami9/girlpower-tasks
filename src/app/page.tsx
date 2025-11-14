'use client';

import React, { useState } from 'react';
import { ViewType } from '@/types';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import Dashboard from '@/components/Dashboard';
import ProgramsView from '@/components/programs/ProgramsView';
import RoleBasedTasksView from '@/components/tasks/RoleBasedTasksView';
import ReportsView from '@/components/reports/ReportsView';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';
import CalendarView from '@/components/calendar/CalendarView';
import NotificationPanel from '@/components/notifications/NotificationPanel';
import AdminDashboard from '@/components/admin/AdminDashboard';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { tasks, programs } from '@/data/mockData';

function MainApp() {
  const { isAdmin, isStaff, hasPermission } = useAuth();
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        // Admin sees AdminDashboard, others see regular Dashboard
        return isAdmin ? <AdminDashboard /> : <Dashboard />;
      
      case 'programs':
        return <ProgramsView />;
      
      case 'tasks':
        return <RoleBasedTasksView initialTasks={tasks} programs={programs} />;
      
      case 'reports':
        // Only Admin and Staff can view reports
        if (hasPermission('canViewReports')) {
          return <ReportsView />;
        }
        return (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">Access Restricted</h3>
            <p className="text-yellow-700">You don&apos;t have permission to view reports. Please contact your administrator.</p>
          </div>
        );
      
      case 'analytics':
        // Only Admin and Staff can view analytics
        if (isAdmin || isStaff) {
          return <AnalyticsDashboard />;
        }
        return (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">Access Restricted</h3>
            <p className="text-yellow-700">You don&apos;t have permission to view analytics. Please contact your administrator.</p>
          </div>
        );
      
      case 'calendar':
        return <CalendarView tasks={tasks} />;
      
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar
        isOpen={sidebarOpen}
        currentView={currentView}
        onClose={() => setSidebarOpen(false)}
        onViewChange={setCurrentView}
      />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <Header 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onNotificationClick={() => setNotificationsOpen(true)}
        />
        <main className="p-6">
          {renderView()}
        </main>
      </div>

      <NotificationPanel
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />
    </div>
  );
}

export default function GirlPowerTaskSystem() {
  return (
    <ProtectedRoute>
      <MainApp />
    </ProtectedRoute>
  );
}