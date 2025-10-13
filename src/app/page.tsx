// src/app/page.tsx - Updated with new features
'use client';

import React, { useState } from 'react';
import { ViewType } from '@/types';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import Dashboard from '@/components/Dashboard';
import ProgramsView from '@/components/programs/ProgramsView';
import EnhancedTasksView from '@/components/tasks/EnhancedTasksView';
import ReportsView from '@/components/reports/ReportsView';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';
import CalendarView from '@/components/calendar/CalendarView';
import NotificationPanel from '@/components/notifications/NotificationPanel';
import { tasks, programs } from '@/data/mockData';

export default function GirlPowerTaskSystem() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'programs':
        return <ProgramsView />;
      case 'tasks':
        return <EnhancedTasksView initialTasks={tasks} programs={programs} />;
      case 'reports':
        return <ReportsView />;
      case 'analytics':
        return <AnalyticsDashboard />;
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