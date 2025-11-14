// src/services/tasks.ts - FIXED
import { apiService } from './api';
import { Task } from '@/types';

// Proper type definitions
interface TaskFilters {
  program?: string;
  status?: string;
  priority?: string;
  assignee?: string;
  search?: string;
}

interface Comment {
  id: string;
  taskId: string;
  author: string;
  content: string;
  timestamp: string;
}

interface Attachment {
  id: string;
  taskId: string;
  name: string;
  url: string;
  size: number;
  uploadedBy: string;
  uploadedAt: string;
}

interface BulkUpdateData {
  taskIds: string[];
  status: string;
}

export const taskService = {
  // Get all tasks
  getTasks: async (filters?: TaskFilters): Promise<Task[]> => {
    const params = new URLSearchParams(filters as Record<string, string>);
    return apiService.get(`/tasks?${params}`);
  },

  // Get single task
  getTask: (id: string): Promise<Task> => {
    return apiService.get(`/tasks/${id}`);
  },

  // Create task
  createTask: (data: Partial<Task>): Promise<Task> => {
    return apiService.post('/tasks', data);
  },

  // Update task
  updateTask: (id: string, data: Partial<Task>): Promise<Task> => {
    return apiService.put(`/tasks/${id}`, data);
  },

  // Delete task
  deleteTask: (id: string): Promise<void> => {
    return apiService.delete(`/tasks/${id}`);
  },

  // Bulk operations with proper typing
  bulkUpdateStatus: (data: BulkUpdateData): Promise<void> => {
    return apiService.post('/tasks/bulk-update', data);
  },

  // Task comments with proper typing
  getComments: (taskId: string): Promise<Comment[]> => {
    return apiService.get(`/tasks/${taskId}/comments`);
  },

  addComment: (taskId: string, content: string): Promise<Comment> => {
    return apiService.post(`/tasks/${taskId}/comments`, { content });
  },

  // Task attachments with proper typing
  uploadAttachment: (taskId: string, file: File): Promise<Attachment> => {
    return apiService.uploadFile(`/tasks/${taskId}/attachments`, file);
  },
};