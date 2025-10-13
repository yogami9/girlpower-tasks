// Task Management Types
export type TaskStatus = 'completed' | 'in-progress' | 'overdue' | 'pending';
export type TaskPriority = 'high' | 'medium' | 'low';
export type ViewType = 'dashboard' | 'programs' | 'tasks' | 'reports' | 'analytics' | 'calendar';
export type TimeframeType = 'weekly' | 'monthly' | 'quarterly' | 'yearly';

// GirlPower-Specific Program Categories
export type ProgramCategory = 
  | 'Education' 
  | 'Empowerment' 
  | 'Health' 
  | 'Advocacy' 
  | 'Service Delivery' 
  | 'Community Engagement';

// GirlPower Programs
export type GirlPowerProgram = 
  | 'Ndoto' 
  | 'Ndoto Champs' 
  | 'In-School Ndoto' 
  | 'Sports for Health' 
  | 'Dadas' 
  | 'AYP-SRHR Champions' 
  | 'Tiko';

// Triple Threat Focus Areas
export type TripleThreatArea = 
  | 'HIV & AIDS' 
  | 'Gender-Based Violence' 
  | 'Teenage Pregnancy';

// User Roles (from Organogram)
export type UserRole = 
  | 'Board Member'
  | 'Executive Director'
  | 'Head Administration'
  | 'Volunteers Lead'
  | 'HR Officer'
  | 'Head Programs'
  | 'M&E Officer'
  | 'Office Admin'
  | 'Finance Lead'
  | 'IT & Communication Lead'
  | 'Program Coordinator'
  | 'Field Officer'
  | 'Volunteer';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  program: GirlPowerProgram | string;
  assignee: string;
  dueDate: string;
  priority: TaskPriority;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  
  // GirlPower-specific fields
  targetAudience?: string;
  location?: string;
  beneficiaries?: number;
  partnership?: string;
}

export interface Program {
  id: string;
  name: GirlPowerProgram | string;
  description: string;
  progress: number;
  tasks: number;
  completedTasks: number;
  
  // GirlPower-specific fields
  category: ProgramCategory;
  subPrograms?: string[];
  targetAudience?: string;
  location?: string;
  partners?: string[];
  keyActivities?: string[];
  goal?: string;
  champions?: number;
  coverage?: string;
  frequency?: string;
  startDate?: string;
  endDate?: string;
  budget?: number;
  teamMembers?: string[];
}

export interface Stats {
  // General task stats
  totalTasks: number;
  completed: number;
  inProgress: number;
  overdue: number;
  pending: number;
  
  // GirlPower-specific metrics
  schoolsReached?: number;
  schoolsTarget?: number;
  championsTrained?: number;
  ndotoPeerEducators?: number;
  sanitaryTowelsDistributed?: number;
  
  // National context (from org document)
  womenExperiencedGBV?: number;
  womenWithoutSupport?: number;
  
  // Program reach
  adolescentsReached?: number;
  communitiesEngaged?: number;
  partnershipsActive?: number;
}

export interface StatCardData {
  label: string;
  value: number | string;
  icon: any;
  color: string;
  change?: number;
  target?: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  phone?: string;
  avatar?: string;
  tasksAssigned: number;
  tasksCompleted: number;
  program?: GirlPowerProgram;
  department?: 'Administration' | 'Programs' | 'Finance' | 'IT';
}

export interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
  program?: GirlPowerProgram;
}

export interface Comment {
  id: string;
  taskId: string;
  author: string;
  authorRole: UserRole;
  content: string;
  timestamp: string;
}

export interface Attachment {
  id: string;
  taskId: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedBy: string;
  uploadedAt: string;
}

// GirlPower Organization Structure
export interface OrganizationStructure {
  board: {
    name: string;
    members: number;
  };
  leadership: {
    executiveDirector: string;
    departments: {
      head?: string;
      support?: string[];
      programs?: GirlPowerProgram[];
    }[];
  };
}

// Focus Area (Triple Threat)
export interface FocusArea {
  name: TripleThreatArea | string;
  priority: TaskPriority;
  activities: string[];
  metrics?: {
    reached?: number;
    target?: number;
    casesHandled?: number;
  };
}

// Champion (for AYP-SRHR Champions program)
export interface Champion {
  id: string;
  name: string;
  subCounty: string;
  activitiesLed: number;
  peersReached: number;
  joinedDate: string;
}

// Ndoto Peer Educator
export interface PeerEducator {
  id: string;
  name: string;
  batch: number;
  peersEducated: number;
  graduationDate: string;
  status: 'active' | 'graduated';
}

// School (for In-School Ndoto tracking)
export interface School {
  id: string;
  name: string;
  subCounty: string;
  studentsReached: number;
  sessionsHeld: number;
  enrollmentDate: string;
  status: 'active' | 'completed' | 'planned';
}

// Product Distribution (for Dadas program)
export interface ProductDistribution {
  id: string;
  product: 'Reusable Sanitary Towels' | 'MHM Materials';
  quantity: number;
  location: string;
  beneficiaries: number;
  distributionDate: string;
  distributedBy: string;
}

// Partnership
export interface Partnership {
  id: string;
  partner: 'UNAIDS' | 'NSDCC' | 'Tiko Africa' | string;
  program: GirlPowerProgram;
  startDate: string;
  status: 'active' | 'completed' | 'planned';
  contribution?: string;
}

// Report Types
export type ReportType = 
  | 'Donor Impact Report'
  | 'Board Summary Report'
  | 'Program Performance Report'
  | 'Triple Threat Campaign Report'
  | 'School Reach Progress Report'
  | 'Champions Activity Report'
  | 'Product Distribution Report';