import React from 'react';
import { Program } from '@/types';

interface ProgramCardProps {
  program: Program;
}

export default function ProgramCard({ program }: ProgramCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{program.name}</h3>
      <p className="text-gray-600 text-sm mb-4">{program.description}</p>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Progress</span>
          <span className="font-medium">{program.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full"
            style={{ width: `${program.progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="text-sm">
          <span className="text-gray-600">Tasks: </span>
          <span className="font-medium">{program.completedTasks}/{program.tasks}</span>
        </div>
        <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
          View Details →
        </button>
      </div>
    </div>
  );
}