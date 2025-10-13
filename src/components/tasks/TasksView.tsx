import React from 'react';
import { Plus } from 'lucide-react';
import TasksTable from './TasksTable';
import { tasks, programs } from '@/data/mockData';

export default function TasksView() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Tasks</h2>
        <div className="flex gap-2">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
            <option>All Programs</option>
            {programs.map(p => <option key={p.id}>{p.name}</option>)}
          </select>
          <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
            <Plus size={20} />
            New Task
          </button>
        </div>
      </div>

      <TasksTable tasks={tasks} />
    </div>
  );
}