import React from 'react';
import { Program } from '@/types';

interface PerformanceOverviewProps {
  programs: Program[];
}

export default function PerformanceOverview({ programs }: PerformanceOverviewProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Program Performance Overview</h3>
      <div className="space-y-4">
        {programs.map((program) => (
          <div key={program.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <h4 className="font-medium mb-2">{program.name}</h4>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: `${program.progress}%` }}
                />
              </div>
            </div>
            <div className="ml-4 text-right">
              <div className="text-2xl font-bold text-purple-600">{program.progress}%</div>
              <div className="text-sm text-gray-600">{program.completedTasks}/{program.tasks} tasks</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}