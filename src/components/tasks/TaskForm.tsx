'use client';

import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Flag, FolderOpen, AlertCircle, FileText, Save } from 'lucide-react';
import { Task, TaskPriority, TaskStatus } from '@/types';
import { useAuth } from '@/context/AuthContext';

interface TaskFormProps {
  onClose: () => void;
  onSave: (task: Partial<Task>) => void;
  programs: { id: string; name: string }[];
  task?: Task;
}

export default function TaskForm({ onClose, onSave, programs, task }: TaskFormProps) {
  const { user } = useAuth();
  const isEditing = !!task;

  const [formData, setFormData] = useState({
    title: task?.title || '',
    program: task?.program || '',
    assignee: task?.assignee || user?.name || '',
    dueDate: task?.dueDate || '',
    priority: task?.priority || 'medium' as TaskPriority,
    status: task?.status || 'pending' as TaskStatus,
    description: task?.description || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-save draft to localStorage
  useEffect(() => {
    if (!isEditing && typeof window !== 'undefined') {
      const draftKey = 'task_draft';
      const savedDraft = localStorage.getItem(draftKey);
      if (savedDraft && !task) {
        try {
          const draft = JSON.parse(savedDraft);
          setFormData(draft);
        } catch (e) {
          console.error('Failed to load draft:', e);
        }
      }
    }
  }, [isEditing, task]);

  // Save draft on form change
  useEffect(() => {
    if (!isEditing && typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        localStorage.setItem('task_draft', JSON.stringify(formData));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [formData, isEditing]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must not exceed 100 characters';
    }

    if (!formData.program) {
      newErrors.program = 'Program is required';
    }

    if (!formData.assignee.trim()) {
      newErrors.assignee = 'Assignee is required';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    } else {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.dueDate = 'Due date cannot be in the past';
      }
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Description must not exceed 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      title: true,
      program: true,
      assignee: true,
      dueDate: true,
    });

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const taskData: Partial<Task> = {
        ...formData,
        id: task?.id,
      };

      await onSave(taskData);
      
      // Clear draft from localStorage on successful submit
      if (!isEditing && typeof window !== 'undefined') {
        localStorage.removeItem('task_draft');
      }
    } catch (error) {
      console.error('Failed to save task:', error);
      alert('Failed to save task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validate();
  };

  const handleCancel = () => {
    const hasChanges = 
      formData.title !== (task?.title || '') ||
      formData.program !== (task?.program || '') ||
      formData.assignee !== (task?.assignee || user?.name || '') ||
      formData.dueDate !== (task?.dueDate || '') ||
      formData.description !== (task?.description || '');

    if (hasChanges) {
      if (confirm('You have unsaved changes. Are you sure you want to cancel?')) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  const clearDraft = () => {
    if (confirm('Clear the saved draft?')) {
      localStorage.removeItem('task_draft');
      setFormData({
        title: '',
        program: '',
        assignee: user?.name || '',
        dueDate: '',
        priority: 'medium',
        status: 'pending',
        description: '',
      });
    }
  };

  const getMinDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {isEditing ? 'Edit Task' : 'Create New Task'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {isEditing ? 'Update task details' : 'Fill in the details to create a new task'}
            </p>
          </div>
          <button
            onClick={handleCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            type="button"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Task Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              onBlur={() => handleBlur('title')}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                touched.title && errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Ndoto Curriculum Training - Batch 5"
              maxLength={100}
            />
            <div className="flex justify-between items-center mt-1">
              {touched.title && errors.title ? (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.title}
                </p>
              ) : (
                <p className="text-xs text-gray-500">
                  Enter a clear, descriptive title
                </p>
              )}
              <span className="text-xs text-gray-400">
                {formData.title.length}/100
              </span>
            </div>
          </div>

          {/* Program and Assignee Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FolderOpen size={16} className="inline mr-1" />
                Program <span className="text-red-500">*</span>
              </label>
              <select
                name="program"
                value={formData.program}
                onChange={handleChange}
                onBlur={() => handleBlur('program')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                  touched.program && errors.program ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Program</option>
                {programs.map(p => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>
              {touched.program && errors.program && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.program}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User size={16} className="inline mr-1" />
                Assignee <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="assignee"
                value={formData.assignee}
                onChange={handleChange}
                onBlur={() => handleBlur('assignee')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                  touched.assignee && errors.assignee ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Assign to team member"
              />
              {touched.assignee && errors.assignee && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.assignee}
                </p>
              )}
            </div>
          </div>

          {/* Due Date and Priority Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar size={16} className="inline mr-1" />
                Due Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                onBlur={() => handleBlur('dueDate')}
                min={getMinDate()}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                  touched.dueDate && errors.dueDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {touched.dueDate && errors.dueDate && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.dueDate}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Flag size={16} className="inline mr-1" />
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
          </div>

          {/* Status (only show when editing) */}
          {isEditing && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText size={16} className="inline mr-1" />
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-colors ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Add detailed task description, objectives, and requirements..."
              maxLength={500}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.description ? (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.description}
                </p>
              ) : (
                <p className="text-xs text-gray-500">
                  Provide context and requirements
                </p>
              )}
              <span className="text-xs text-gray-400">
                {formData.description.length}/500
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={20} />
                  {isEditing ? 'Update Task' : 'Create Task'}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
            >
              Cancel
            </button>
            {!isEditing && typeof window !== 'undefined' && localStorage.getItem('task_draft') && (
              <button
                type="button"
                onClick={clearDraft}
                disabled={isSubmitting}
                className="px-6 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm disabled:opacity-50"
              >
                Clear Draft
              </button>
            )}
          </div>

          {/* Helper Text */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>💡 Tip:</strong> Your progress is automatically saved as a draft. You can come back later to complete the form.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}