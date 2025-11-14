// Mock implementation for now (would use React Query in production)
import { taskService } from '@/services/tasks';
import { Task } from '@/types';

export function useTasks(filters?: any) {
  // Mock implementation - in production would use @tanstack/react-query
  return {
    data: [],
    isLoading: false,
    error: null,
  };
}

export function useTask(id: string) {
  // Mock implementation
  return {
    data: null,
    isLoading: false,
    error: null,
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
    mutate: async (id: string) => {
      return taskService.deleteTask(id);
    },
    isLoading: false,
  };
}