import React from 'react';
import { CheckSquare, Clock, Bell } from 'lucide-react';
import StatCard from './dashboard/StatCard';
import ProgramProgress from './dashboard/ProgramProgress';
import RecentActivity from './dashboard/RecentActivity';
import UpcomingDeadlines from './dashboard/UpcomingDeadlines';
import { stats, programs, tasks } from '@/data/mockData';

const statCards = [
  { label: 'Total Tasks', value: stats.totalTasks, icon: CheckSquare, color: 'bg-purple-500' },
  { label: 'Completed', value: stats.completed, icon: CheckSquare, color: 'bg-green-500' },
  { label: 'In Progress', value: stats.inProgress, icon: Clock, color: 'bg-blue-500' },
  { label: 'Overdue', value: stats.overdue, icon: Bell, color: 'bg-red-500' },
  { label: 'Pending', value: stats.pending, icon: Clock, color: 'bg-yellow-500' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgramProgress programs={programs} />
        <RecentActivity tasks={tasks} />
      </div>

      <UpcomingDeadlines tasks={tasks} />
    </div>
  );
}