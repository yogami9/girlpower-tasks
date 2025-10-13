import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Program } from '@/types';

interface ProgramProgressProps {
  programs: Program[];
}

export default function ProgramProgress({ programs }: ProgramProgressProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <TrendingUp size={20} className="text-purple-600" />
        Program Progress
      </h3>
      <div className="space-y-4">
        {programs.slice(0, 3).map((program) => (
          <div key={program.id}>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">{program.name}</span>
              <span className="text-gray-600">{program.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all"
                style={{ width: `${program.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}