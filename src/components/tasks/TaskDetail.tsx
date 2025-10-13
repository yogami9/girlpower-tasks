'use client';

import { useState } from 'react';
import { X, Paperclip, MessageSquare, Clock, User, Calendar } from 'lucide-react';
import { Task } from '@/types';
import { useTask } from '@/hooks/useTasks';

interface TaskDetailProps {
  taskId: string;
  onClose: () => void;
}

export default function TaskDetail({ taskId, onClose }: TaskDetailProps) {
  const { data: task, isLoading } = useTask(taskId);
  const [activeTab, setActiveTab] = useState<'details' | 'comments' | 'attachments'>('details');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{task.title}</h2>
            <p className="text-sm text-gray-600 mt-1">{task.program}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          {[
            { id: 'details', label: 'Details', icon: Clock },
            { id: 'comments', label: 'Comments', icon: MessageSquare },
            { id: 'attachments', label: 'Attachments', icon: Paperclip },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-purple-600 text-purple-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'details' && <TaskDetails task={task} />}
          {activeTab === 'comments' && <TaskComments taskId={taskId} />}
          {activeTab === 'attachments' && <TaskAttachments taskId={taskId} />}
        </div>
      </div>
    </div>
  );
}

function TaskDetails({ task }: { task: Task }) {
  return (
    <div className="space-y-6">
      {/* Status & Priority */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={task.status}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
          <select
            value={task.priority}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      {/* Assignee & Due Date */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User size={16} className="inline mr-1" />
            Assignee
          </label>
          <input
            type="text"
            value={task.assignee}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar size={16} className="inline mr-1" />
            Due Date
          </label>
          <input
            type="date"
            value={task.dueDate}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          rows={6}
          value={task.description || 'No description provided'}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 resize-none"
          placeholder="Add task description..."
        />
      </div>

      {/* Activity Log */}
      <div>
        <h3 className="font-semibold mb-3">Activity Log</h3>
        <div className="space-y-3">
          <div className="flex gap-3 pb-3 border-b">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold">
              W
            </div>
            <div>
              <p className="text-sm font-medium">Task created by Wycliff</p>
              <p className="text-xs text-gray-500">2 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskComments({ taskId }: { taskId: string }) {
  const [comment, setComment] = useState('');

  return (
    <div className="space-y-4">
      {/* Comment Input */}
      <div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 resize-none"
          placeholder="Write a comment..."
        />
        <div className="mt-2 flex justify-end">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
            Post Comment
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        <div className="flex gap-3 p-4 bg-gray-50 rounded-lg">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            SK
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium">Sarah K.</span>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
            <p className="text-sm text-gray-700">
              Great progress on this task! Let's aim to complete it by end of week.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskAttachments({ taskId }: { taskId: string }) {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Handle file upload
      console.log('Uploading files:', files);
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
        <Paperclip size={48} className="mx-auto text-gray-400 mb-3" />
        <p className="text-sm text-gray-600 mb-2">
          Drag and drop files here, or click to browse
        </p>
        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 cursor-pointer"
        >
          Choose Files
        </label>
      </div>

      {/* Attachments List */}
      <div className="space-y-2">
        <h3 className="font-semibold mb-3">Uploaded Files</h3>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <Paperclip size={20} className="text-gray-400" />
            <div>
              <p className="text-sm font-medium">workshop-materials.pdf</p>
              <p className="text-xs text-gray-500">2.4 MB • Uploaded 1 day ago</p>
            </div>
          </div>
          <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
            Download
          </button>
        </div>
      </div>
    </div>
  );
}