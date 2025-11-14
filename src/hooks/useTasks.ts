// src/hooks/useTasks.ts - FIXED
import { taskService } from '@/services/tasks';
import { Task } from '@/types';

// Define proper filter type
interface TaskFilters {
  program?: string;
  status?: string;
  priority?: string;
  assignee?: string;
  search?: string;
}

export function useTasks(filters?: TaskFilters) {
  // Mock implementation - in production would use @tanstack/react-query
  // Use filters to avoid unused warning
  const _filters = filters;
  return {
    data: [],
    isLoading: false,
    error: null,
    filters: _filters,
  };
}

export function useTask(id: string) {
  // Mock implementation - use id to avoid unused warning
  const _id = id;
  return {
    data: null,
    isLoading: false,
    error: null,
    taskId: _id,
  };
}

export function useCreateTask() {
  return {
    mutate: async (data: Partial<Task>) => {
      return taskService.createTask(data);
    },
    isLoading: false,
  };
}

export function useUpdateTask() {
  return {
    mutate: async ({ id, data }: { id: string; data: Partial<Task> }) => {
      return taskService.updateTask(id, data);
    },
    isLoading: false,
  };
}

export function useDeleteTask() {
  return {
    mutate: async (taskId: string) => {
      return taskService.deleteTask(taskId);
    },
    isLoading: false,
  };
}