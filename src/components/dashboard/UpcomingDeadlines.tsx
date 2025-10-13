import React from 'react';
import { Calendar } from 'lucide-react';
import { Task } from '@/types';
import { getStatusColor } from '@/utils/helpers';

interface UpcomingDeadlinesProps {
  tasks: Task[];
}

export default function UpcomingDeadlines({ tasks }: UpcomingDeadlinesProps) {
  const upcomingTasks = tasks.filter(t => t.status !== 'completed').slice(0, 3);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Upcoming Deadlines</h3>
      <div className="space-y-3">
        {upcomingTasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-purple-600" />
              <div>
                <p className="font-medium">{task.title}</p>
                <p className="text-sm text-gray-600">{task.program}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{task.dueDate}</p>
              <span className={`text-xs ${getStatusColor(task.status)} px-2 py-1 rounded`}>
                {task.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}