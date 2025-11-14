// src/hooks/useTasks.ts - FIXED with proper typing
import { taskService } from '@/services/tasks';
import { Task } from '@/types';

// NOTE: Also update src/components/tasks/TaskDetail.tsx line 9:
// Change: const { data: task, isLoading } = useTask(taskId);
// To ensure proper null checking before rendering

// Define proper filter type
interface TaskFilters {
  program?: string;
  status?: string;
  priority?: string;
  assignee?: string;
  search?: string;
}

interface UseTasksReturn {
  data: Task[];
  isLoading: boolean;
  error: Error | null;
  filters?: TaskFilters;
}

interface UseTaskReturn {
  data: Task | null;
  isLoading: boolean;
  error: Error | null;
  taskId: string;
}

interface UseMutationReturn<T, V> {
  mutate: (variables: V) => Promise<T>;
  isLoading: boolean;
}

export function useTasks(filters?: TaskFilters): UseTasksReturn {
  // Mock implementation - in production would use @tanstack/react-query
  return {
    data: [] as Task[],
    isLoading: false,
    error: null,
    filters,
  };
}

export function useTask(id: string): UseTaskReturn {
  // Mock implementation - properly typed to return Task | null
  return {
    data: null as Task | null,
    isLoading: false,
    error: null,
    taskId: id,
  };
}

export function useCreateTask(): UseMutationReturn<Task, Partial<Task>> {
  return {
    mutate: async (data: Partial<Task>) => {
      return taskService.createTask(data);
    },
    isLoading: false,
  };
}

export function useUpdateTask(): UseMutationReturn<Task, { id: string; data: Partial<Task> }> {
  return {
    mutate: async ({ id, data }: { id: string; data: Partial<Task> }) => {
      return taskService.updateTask(id, data);
    },
    isLoading: false,
  };
}

export function useDeleteTask(): UseMutationReturn<void, string> {
  return {
    mutate: async (taskId: string) => {
      return taskService.deleteTask(taskId);
    },
    isLoading: false,
  };
}