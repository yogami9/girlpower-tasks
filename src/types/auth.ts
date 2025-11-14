// src/types/auth.ts - User Authentication & Authorization Types

export type UserRole = 'admin' | 'staff' | 'volunteer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  department?: string;
  program?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface Permission {
  canCreateTask: boolean;
  canEditOwnTask: boolean;
  canEditAnyTask: boolean;
  canDeleteOwnTask: boolean;
  canDeleteAnyTask: boolean;
  canViewAllTasks: boolean;
  canViewOwnTasks: boolean;
  canManageUsers: boolean;
  canViewReports: boolean;
  canExportData: boolean;
  canManagePrograms: boolean;
}

// Role-based permissions
export const ROLE_PERMISSIONS: Record<UserRole, Permission> = {
  admin: {
    canCreateTask: true,
    canEditOwnTask: true,
    canEditAnyTask: true,
    canDeleteOwnTask: true,
    canDeleteAnyTask: true,
    canViewAllTasks: true,
    canViewOwnTasks: true,
    canManageUsers: true,
    canViewReports: true,
    canExportData: true,
    canManagePrograms: true,
  },
  staff: {
    canCreateTask: true,
    canEditOwnTask: true,
    canEditAnyTask: false,
    canDeleteOwnTask: true,
    canDeleteAnyTask: false,
    canViewAllTasks: true,
    canViewOwnTasks: true,
    canManageUsers: false,
    canViewReports: true,
    canExportData: false,
    canManagePrograms: false,
  },
  volunteer: {
    canCreateTask: true,
    canEditOwnTask: true,
    canEditAnyTask: false,
    canDeleteOwnTask: false,
    canDeleteAnyTask: false,
    canViewAllTasks: false,
    canViewOwnTasks: true,
    canManageUsers: false,
    canViewReports: false,
    canExportData: false,
    canManagePrograms: false,
  },
};

// Helper function to check permissions
export function hasPermission(
  user: User | null,
  permission: keyof Permission
): boolean {
  if (!user) return false;
  return ROLE_PERMISSIONS[user.role][permission];
}

// Helper function to check if user can edit a task
export function canEditTask(user: User | null, taskOwnerId: string): boolean {
  if (!user) return false;
  const permissions = ROLE_PERMISSIONS[user.role];
  
  if (permissions.canEditAnyTask) return true;
  if (permissions.canEditOwnTask && user.id === taskOwnerId) return true;
  
  return false;
}

// Helper function to check if user can delete a task
export function canDeleteTask(user: User | null, taskOwnerId: string): boolean {
  if (!user) return false;
  const permissions = ROLE_PERMISSIONS[user.role];
  
  if (permissions.canDeleteAnyTask) return true;
  if (permissions.canDeleteOwnTask && user.id === taskOwnerId) return true;
  
  return false;
}