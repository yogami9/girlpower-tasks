import { Task, Program, Stats } from '@/types';

// Real GirlPower Organization Tasks
export const tasks: Task[] = [
  { 
    id: '1', 
    title: 'Ndoto Curriculum Training - Batch 5', 
    status: 'in-progress', 
    program: 'Ndoto', 
    assignee: 'Sarah K.', 
    dueDate: '2025-10-20', 
    priority: 'high',
    description: '3-month sexuality education training for 30 adolescents'
  },
  { 
    id: '2', 
    title: 'Sanitary Towel Distribution - Tongaren', 
    status: 'pending', 
    program: 'Dadas', 
    assignee: 'Mary N.', 
    dueDate: '2025-10-18', 
    priority: 'high',
    description: 'Distribute reusable sanitary towels to 150 girls in Tongaren schools'
  },
  { 
    id: '3', 
    title: 'AYP Champions Quarterly Report', 
    status: 'overdue', 
    program: 'AYP-SRHR Champions', 
    assignee: 'Jane M.', 
    dueDate: '2025-10-10', 
    priority: 'high',
    description: 'Compile advocacy activities from 35 champions across Bungoma County'
  },
  { 
    id: '4', 
    title: 'Sports for Health Tournament Planning', 
    status: 'in-progress', 
    program: 'Sports for Health', 
    assignee: 'Grace O.', 
    dueDate: '2025-11-15', 
    priority: 'medium',
    description: 'Plan annual tournament addressing triple threat issues in Tongaren'
  },
  { 
    id: '5', 
    title: 'In-School Ndoto Sessions - Week 3', 
    status: 'completed', 
    program: 'In-School Ndoto', 
    assignee: 'Peter W.', 
    dueDate: '2025-10-08', 
    priority: 'medium',
    description: 'Deliver Ndoto curriculum to students aged 14-19 in partner schools'
  },
  { 
    id: '6', 
    title: 'Ndoto Champs Soap Making Workshop', 
    status: 'pending', 
    program: 'Ndoto Champs', 
    assignee: 'Lucy A.', 
    dueDate: '2025-10-22', 
    priority: 'medium',
    description: 'Economic empowerment training for teenage mothers and GBV survivors'
  },
  { 
    id: '7', 
    title: 'Tiko Africa Partnership Meeting', 
    status: 'pending', 
    program: 'Tiko', 
    assignee: 'Executive Director', 
    dueDate: '2025-10-25', 
    priority: 'high',
    description: 'Review SRHR service access support in 6 sub-counties'
  },
  { 
    id: '8', 
    title: 'Menstrual Health Education - Community Session', 
    status: 'in-progress', 
    program: 'Dadas', 
    assignee: 'Faith N.', 
    dueDate: '2025-10-17', 
    priority: 'medium',
    description: 'MHM training for men, boys, and community members'
  },
  { 
    id: '9', 
    title: 'Triple Threat Campaign Materials', 
    status: 'pending', 
    program: 'Ndoto', 
    assignee: 'Communications Lead', 
    dueDate: '2025-10-28', 
    priority: 'low',
    description: 'Design materials on HIV/AIDS, GBV, and teenage pregnancy'
  },
  { 
    id: '10', 
    title: 'School Reach Progress Report - Q4', 
    status: 'pending', 
    program: 'In-School Ndoto', 
    assignee: 'M&E Officer', 
    dueDate: '2025-12-15', 
    priority: 'high',
    description: 'Track progress toward 200 schools target by December 2025'
  },
];

// Real GirlPower Programs
export const programs: Program[] = [
  { 
    id: '1', 
    name: 'Ndoto', 
    description: 'Age-appropriate sexuality education through Ndoto curriculum focusing on reproductive health, rights, and triple threat issues', 
    progress: 65, 
    tasks: 24, 
    completedTasks: 16,
    category: 'Education',
    subPrograms: ['Ndoto Champs', 'In-School Ndoto', 'Sports for Health'],
    targetAudience: 'Adolescents (14-19 years)',
    keyActivities: [
      '3-month training sessions',
      'Peer education programs',
      'Triple threat campaigns',
      'Ndoto curriculum delivery'
    ]
  },
  { 
    id: '2', 
    name: 'Ndoto Champs', 
    description: 'Supporting teenage mothers, GBV survivors, and young women living with HIV through education and economic empowerment', 
    progress: 72, 
    tasks: 15, 
    completedTasks: 11,
    category: 'Empowerment',
    targetAudience: 'Out-of-school girls under 24',
    location: 'Tongaren sub-county',
    keyActivities: [
      'Comprehensive sexuality education',
      'Soap making & entrepreneurship',
      'Social support services',
      'School re-entry support'
    ]
  },
  { 
    id: '3', 
    name: 'In-School Ndoto', 
    description: 'Engaging schools in rural Bungoma County with accurate sex education and peer mentorship', 
    progress: 45, 
    tasks: 30, 
    completedTasks: 14,
    category: 'Education',
    targetAudience: 'Students aged 14-19',
    goal: '200 schools by December 2025',
    keyActivities: [
      'Ndoto curriculum sessions',
      'Peer-to-peer mentorship',
      'Teacher training programs',
      'Triple threat awareness'
    ]
  },
  { 
    id: '4', 
    name: 'Sports for Health', 
    description: 'Annual community tournament using sports to address critical health issues in Tongaren', 
    progress: 30, 
    tasks: 12, 
    completedTasks: 4,
    category: 'Community Engagement',
    location: 'Tongaren sub-county',
    frequency: 'Annual during holidays',
    keyActivities: [
      'Triple threat awareness',
      'Reproductive health checks',
      'Safe sex commodities distribution',
      'Community mobilization'
    ]
  },
  { 
    id: '5', 
    name: 'Dadas', 
    description: 'Menstrual health education and reusable sanitary towel provision for adolescent girls', 
    progress: 80, 
    tasks: 18, 
    completedTasks: 14,
    category: 'Health',
    targetAudience: 'Adolescent girls and young women',
    keyActivities: [
      'MHM education for all genders',
      'Reusable sanitary towel production',
      'School-based distribution',
      'Community awareness sessions'
    ]
  },
  { 
    id: '6', 
    name: 'AYP-SRHR Champions', 
    description: '35 trained champions promoting peer-to-peer SRHR engagement across all Bungoma sub-counties', 
    progress: 88, 
    tasks: 10, 
    completedTasks: 9,
    category: 'Advocacy',
    partners: ['UNAIDS', 'NSDCC'],
    coverage: 'All Bungoma sub-counties',
    champions: 35,
    keyActivities: [
      'Peer-to-peer advocacy',
      'SRHR conversations',
      'HIV/AIDS awareness',
      'GBV prevention',
      'Teenage pregnancy prevention'
    ]
  },
  { 
    id: '7', 
    name: 'Tiko', 
    description: 'Partnership program supporting adolescent girls to access SRHR services and products', 
    progress: 55, 
    tasks: 20, 
    completedTasks: 11,
    category: 'Service Delivery',
    partner: 'Tiko Africa',
    coverage: 'Tongaren, Kimilili, Webuye East, Mt. Elgon, Ndalu, Mbakalo',
    keyActivities: [
      'SRHR service facilitation',
      'Product access support',
      'Service navigation',
      'Youth-friendly services promotion'
    ]
  },
];

// Real GirlPower Statistics
export const stats: Stats = {
  totalTasks: 57,
  completed: 28,
  inProgress: 18,
  overdue: 5,
  pending: 6,
  
  // GirlPower-specific metrics
  schoolsReached: 45,
  schoolsTarget: 200,
  championsTrained: 35,
  ndotoPeerEducators: 127,
  sanitaryTowelsDistributed: 3450,
  
  // National context
  womenExperiencedGBV: 9300000,
  womenWithoutSupport: 8000000,
  
  // Program reach
  adolescentsReached: 2850,
  communitiesEngaged: 15,
  partnershipsActive: 3,
};

// Team Structure from Organogram
export const teamStructure = {
  board: {
    name: 'Board of Directors',
    members: 5
  },
  leadership: {
    executiveDirector: 'Executive Director',
    departments: [
      {
        head: 'Head Administration, Volunteers Lead & HR Officer',
        programs: ['Ndoto', 'Dadas', 'Tiko', 'AYP-Champions']
      },
      {
        head: 'Head Programs and M&E',
        programs: ['All Programs Monitoring']
      },
      {
        support: ['Office Admin', 'Finance Lead', 'IT & Communication Lead']
      }
    ]
  }
};

// Key Focus Areas (Triple Threat)
export const focusAreas = [
  {
    name: 'HIV & AIDS',
    priority: 'high',
    activities: ['Prevention education', 'Testing support', 'Living positively programs']
  },
  {
    name: 'Gender-Based Violence',
    priority: 'high',
    activities: ['Prevention programs', 'Survivor support', 'Community awareness']
  },
  {
    name: 'Teenage Pregnancy',
    priority: 'high',
    activities: ['Comprehensive sex education', 'Family planning', 'School continuation support']
  },
  {
    name: 'Menstrual Health',
    priority: 'high',
    activities: ['MHM education', 'Product provision', 'Stigma reduction']
  },
  {
    name: 'Sexual Reproductive Health Rights',
    priority: 'high',
    activities: ['Rights education', 'Service access', 'Youth empowerment']
  }
];