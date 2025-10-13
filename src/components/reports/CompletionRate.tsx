import React from 'react';
import { BarChart3 } from 'lucide-react';
import { Stats } from '@/types';

interface CompletionRateProps {
  stats: Stats;
}

export default function CompletionRate({ stats }: CompletionRateProps) {
  const completionRate = Math.round((stats.completed / stats.totalTasks) * 100);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <BarChart3 size={20} className="text-purple-600" />
        Task Completion Rate
      </h3>
      <div className="space-y-4">
        <div className="text-center py-8">
          <div className="text-4xl font-bold text-purple-600 mb-2">
            {completionRate}%
          </div>
          <p className="text-gray-600">Tasks Completed</p>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div>
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
        </div>
      </div>
    </div>
  );
}