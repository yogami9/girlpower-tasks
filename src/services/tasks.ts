import { apiService } from './api';
import { Task } from '@/types';

export const taskService = {
  // Get all tasks
  getTasks: async (filters?: {
    program?: string;
    status?: string;
    priority?: string;
  }): Promise<Task[]> => {
    const params = new URLSearchParams(filters as any);
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

  // Bulk operations
  bulkUpdateStatus: (taskIds: string[], status: string): Promise<void> => {
    return apiService.post('/tasks/bulk-update', { taskIds, status });
  },

  // Task comments
  getComments: (taskId: string): Promise<any[]> => {
    return apiService.get(`/tasks/${taskId}/comments`);
  },

  addComment: (taskId: string, content: string): Promise<any> => {
    return apiService.post(`/tasks/${taskId}/comments`, { content });
  },

  // Task attachments
  uploadAttachment: (taskId: string, file: File): Promise<any> => {
    return apiService.uploadFile(`/tasks/${taskId}/attachments`, file);
  },
};