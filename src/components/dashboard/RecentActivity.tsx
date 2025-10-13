import React from 'react';
import { Bell } from 'lucide-react';
import { Task } from '@/types';

interface RecentActivityProps {
  tasks: Task[];
}

export default function RecentActivity({ tasks }: RecentActivityProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Bell size={20} className="text-purple-600" />
        Recent Activity
      </h3>
      <div className="space-y-3">
        {tasks.slice(0, 4).map((task) => (
          <div key={task.id} className="flex items-center gap-3 pb-3 border-b border-gray-100 last:border-0">
            <div className={`w-2 h-2 rounded-full ${
              task.status === 'completed' ? 'bg-green-500' :
              task.status === 'overdue' ? 'bg-red-500' : 'bg-blue-500'
            }`} />
            <div className="flex-1">
              <p className="text-sm font-medium">{task.title}</p>
              <p className="text-xs text-gray-500">{task.assignee} • {task.dueDate}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}