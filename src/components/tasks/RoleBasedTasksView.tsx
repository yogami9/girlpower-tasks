'use client';

import React, { useState } from 'react';
import { Plus, Search, Filter, Download, Edit, Trash2, Eye, Lock, AlertCircle } from 'lucide-react';
import { Task, TaskStatus, TaskPriority } from '@/types';
import { getStatusColor, getPriorityColor } from '@/utils/helpers';
import { useAuth } from '@/context/AuthContext';
import { canEditTask, canDeleteTask } from '@/types/auth';
import TaskForm from './TaskForm';
import { programs as allPrograms } from '@/data/mockData';

interface RoleBasedTasksViewProps {
  initialTasks: Task[];
  programs: { id: string; name: string }[];
}

interface ExtendedTask extends Task {
  createdBy: string;
}

export default function RoleBasedTasksView({ initialTasks, programs }: RoleBasedTasksViewProps) {
  const { user, hasPermission, isAdmin, isStaff, isVolunteer } = useAuth();
  const [tasks, setTasks] = useState<ExtendedTask[]>(
    initialTasks.map(t => ({ ...t, createdBy: t.assignee || user?.id || '1' }))
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProgram, setFilterProgram] = useState('');
  const [filterStatus, setFilterStatus] = useState<TaskStatus | ''>('');
  const [filterPriority, setFilterPriority] = useState<TaskPriority | ''>('');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<ExtendedTask | undefined>();

  // Filter tasks based on user role
  const getVisibleTasks = () => {
    let visibleTasks = tasks;

    // Volunteers only see their own tasks
    if (isVolunteer && user) {
      visibleTasks = tasks.filter(t => t.createdBy === user.id || t.assignee === user.name);
    }

    // Apply search and filters
    return visibleTasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.assignee.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesProgram = !filterProgram || task.program === filterProgram;
      const matchesStatus = !filterStatus || task.status === filterStatus;
      const matchesPriority = !filterPriority || task.priority === filterPriority;
      
      return matchesSearch && matchesProgram && matchesStatus && matchesPriority;
    });
  };

  const filteredTasks = getVisibleTasks();

  const handleCreateTask = (newTask: Partial<Task>) => {
    if (!user) return;

    const taskWithMetadata: ExtendedTask = {
      id: Date.now().toString(),
      title: newTask.title || '',
      status: newTask.status || 'pending',
      program: newTask.program || '',
      assignee: newTask.assignee || '',
      dueDate: newTask.dueDate || '',
      priority: newTask.priority || 'medium',
      description: newTask.description || '',
      createdBy: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTasks(prev => [...prev, taskWithMetadata]);
    setShowForm(false);
  };

  const handleUpdateTask = (updatedTask: Partial<Task>) => {
    setTasks(prev => prev.map(t => 
      t.id === updatedTask.id ? { ...t, ...updatedTask, updatedAt: new Date().toISOString() } : t
    ));
    setEditingTask(undefined);
    setShowForm(false);
  };

  const handleEditClick = (task: ExtendedTask) => {
    if (!canEditTask(user, task.createdBy)) {
      alert('You do not have permission to edit this task');
      return;
    }
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDeleteTask = (task: ExtendedTask) => {
    if (!canDeleteTask(user, task.createdBy)) {
      alert('You do not have permission to delete this task');
      return;
    }
    if (confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(t => t.id !== task.id));
    }
  };

  const handleExport = () => {
    if (!hasPermission('canExportData')) {
      alert('You do not have permission to export data');
      return;
    }
    const csv = [
      ['Title', 'Program', 'Assignee', 'Due Date', 'Status', 'Priority'],
      ...filteredTasks.map(t => [
        t.title, t.program, t.assignee, t.dueDate, t.status, t.priority
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tasks-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const getRoleDisplay = () => {
    if (!user?.role) return 'User';
    return user.role.charAt(0).toUpperCase() + user.role.slice(1);
  };

  return (
    <div className="space-y-6">
      {/* Header with Role Badge */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-gray-800">Tasks Management</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              isAdmin ? 'bg-purple-100 text-purple-700' :
              isStaff ? 'bg-blue-100 text-blue-700' :
              'bg-pink-100 text-pink-700'
            }`}>
              {getRoleDisplay()}
            </span>
          </div>
          <p className="text-gray-600">
            {isVolunteer && `Showing ${filteredTasks.length} of your tasks`}
            {isStaff && `Viewing all ${filteredTasks.length} tasks - you can edit your own`}
            {isAdmin && `Managing all ${filteredTasks.length} tasks - full access`}
          </p>
        </div>
        <div className="flex gap-2">
          {hasPermission('canExportData') && (
            <button
              onClick={handleExport}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download size={20} />
              Export
            </button>
          )}
          {hasPermission('canCreateTask') && (
            <button
              onClick={() => {
                setEditingTask(undefined);
                setShowForm(true);
              }}
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus size={20} />
              New Task
            </button>
          )}
        </div>
      </div>

      {/* Permissions Info Card */}
      <div className={`border rounded-lg p-4 ${
        isAdmin ? 'bg-purple-50 border-purple-200' :
        isStaff ? 'bg-blue-50 border-blue-200' :
        'bg-pink-50 border-pink-200'
      }`}>
        <h3 className={`font-semibold mb-2 ${
          isAdmin ? 'text-purple-900' :
          isStaff ? 'text-blue-900' :
          'text-pink-900'
        }`}>
          Your Permissions:
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
          <div className="flex items-center gap-2">
            {hasPermission('canCreateTask') ? '✅' : '❌'} Create Tasks
          </div>
          <div className="flex items-center gap-2">
            {hasPermission('canEditOwnTask') ? '✅' : '❌'} Edit Own Tasks
          </div>
          <div className="flex items-center gap-2">
            {hasPermission('canEditAnyTask') ? '✅' : '❌'} Edit Any Task
          </div>
          <div className="flex items-center gap-2">
            {hasPermission('canDeleteOwnTask') ? '✅' : '❌'} Delete Own Tasks
          </div>
          <div className="flex items-center gap-2">
            {hasPermission('canViewAllTasks') ? '✅' : '❌'} View All Tasks
          </div>
          <div className="flex items-center gap-2">
            {hasPermission('canExportData') ? '✅' : '❌'} Export Data
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={20} className="text-gray-600" />
          <h3 className="font-semibold">Filters</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <select
            value={filterProgram}
            onChange={(e) => setFilterProgram(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">All Programs</option>
            {programs.map(p => (
              <option key={p.id} value={p.name}>{p.name}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as TaskStatus | '')}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value as TaskPriority | '')}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    <AlertCircle className="mx-auto mb-2" size={48} />
                    {isVolunteer ? 'You have no tasks yet' : 'No tasks found matching your filters'}
                  </td>
                </tr>
              ) : (
                filteredTasks.map((task) => {
                  const canEdit = canEditTask(user, task.createdBy);
                  const canDelete = canDeleteTask(user, task.createdBy);

                  return (
                    <tr key={task.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{task.title}</div>
                        {task.createdBy === user?.id && (
                          <span className="text-xs text-purple-600 font-medium">Your task</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{task.program}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{task.assignee}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{task.dueDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded font-medium ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex gap-2">
                          <button
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="View details"
                          >
                            <Eye size={16} />
                          </button>
                          {canEdit ? (
                            <button
                              onClick={() => handleEditClick(task)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit task"
                            >
                              <Edit size={16} />
                            </button>
                          ) : (
                            <button
                              className="p-2 text-gray-300 cursor-not-allowed"
                              title="No permission to edit"
                              disabled
                            >
                              <Lock size={16} />
                            </button>
                          )}
                          {canDelete ? (
                            <button
                              onClick={() => handleDeleteTask(task)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete task"
                            >
                              <Trash2 size={16} />
                            </button>
                          ) : (
                            <button
                              className="p-2 text-gray-300 cursor-not-allowed"
                              title="No permission to delete"
                              disabled
                            >
                              <Lock size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-2xl font-bold text-purple-600">{filteredTasks.length}</div>
          <div className="text-sm text-gray-600">Total</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-2xl font-bold text-green-600">
            {filteredTasks.filter(t => t.status === 'completed').length}
          </div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-2xl font-bold text-blue-600">
            {filteredTasks.filter(t => t.status === 'in-progress').length}
          </div>
          <div className="text-sm text-gray-600">In Progress</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-2xl font-bold text-yellow-600">
            {filteredTasks.filter(t => t.status === 'pending').length}
          </div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-2xl font-bold text-red-600">
            {filteredTasks.filter(t => t.status === 'overdue').length}
          </div>
          <div className="text-sm text-gray-600">Overdue</div>
        </div>
      </div>

      {/* Task Form Modal */}
      {showForm && (
        <TaskForm
          onClose={() => {
            setShowForm(false);
            setEditingTask(undefined);
          }}
          onSave={editingTask ? handleUpdateTask : handleCreateTask}
          programs={programs}
          task={editingTask}
        />
      )}
    </div>
  );
}