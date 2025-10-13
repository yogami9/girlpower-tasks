// GirlPower Organization Kenya - Complete Information

export const organization = {
  name: 'GirlPower Organization Kenya',
  shortName: 'GirlPower',
  location: {
    county: 'Bungoma County',
    country: 'Kenya',
    headquarters: 'Bungoma, Kenya'
  },
  
  contact: {
    website: 'www.girlpowerkenya.org',
    email: 'info@girlpowerkenya.org',
    socialMedia: {
      instagram: 'https://instagram.com/girlpowerkenya?igshid=MjEwN2IyYWYwYw==',
      facebook: 'https://www.facebook.com/GirlPowerWorldwideEmpowerment?mibextid=D4KYlr',
      twitter: 'https://twitter.com/girlpow71900718/status/1614905104091545601?s=46&t=MegYvfEkcbA5ycwYxwCslw',
      linktree: 'https://linktr.ee/girlpowerorganization'
    }
  },

  mission: 'Lead an adolescent girls and young women Centered Advocacy and Response mechanisms to address their wellbeing through Local Innovative Approaches',
  
  vision: 'A healthy and empowered adolescent girl and young woman',
  
  goal: 'Nurture a healthy, Empowered and futuristic adolescent girl and young woman',

  targetAudience: 'Adolescent girls and young women in rural Bungoma County communities',

  problemStatement: [
    'Inadequate access to Menstrual Hygiene Information and products for Adolescent Girls & Young women in Rural communities',
    'Leading cases of sexual gender based violence among teenage girls and Teenage pregnancies and New HIV infections',
    'Lack of Information on sex and sexual reproductive health among adolescent girls and young people in rural communities'
  ],

  coreAreas: [
    'Menstrual Health and Hygiene Management',
    'HIV & AIDS',
    'Gender-Based Violence Prevention',
    'Unplanned Pregnancy Prevention',
    'Sexual Reproductive Health and Rights'
  ],

  nationalContext: {
    womenExperiencedGBV: 9300000,
    womenWithoutSupport: 8000000,
    description: '9.3M women experienced GBV, 8M have not received any form of support'
  },

  organizationalStructure: {
    board: {
      name: 'Board of Directors',
      members: 5
    },
    executiveLeadership: {
      executiveDirector: 'Executive Director'
    },
    departments: [
      {
        name: 'Administration & HR',
        head: 'Head Administration, Volunteers Lead & Human Resource Officer',
        responsibilities: ['Staff management', 'Volunteer coordination', 'HR operations']
      },
      {
        name: 'Programs & M&E',
        head: 'Head Programs and Monitoring and Evaluation',
        responsibilities: ['Program implementation', 'Impact measurement', 'Reporting']
      },
      {
        name: 'Support Services',
        positions: [
          'Office Admin',
          'Finance Lead',
          'IT & Communication Lead'
        ]
      }
    ],
    programs: ['Ndoto', 'Dadas', 'Tiko', 'AYP-Champions']
  },

  keyPrograms: {
    ndoto: {
      name: 'Ndoto',
      description: 'Education and empowerment initiative targeting adolescents in rural areas',
      curriculum: 'Age-appropriate sexuality education (Ndoto Curriculum)',
      duration: '3 months training + 3 months peer education',
      topics: [
        'Human reproductive body',
        'Adolescence',
        'Sexual reproductive health and rights',
        'Gender equality and equity',
        'Human rights',
        'Gender based violence and harmful practices',
        'Pregnancy and childbirth',
        'Menstrual hygiene',
        'HIV and AIDS',
        'Power dynamics'
      ],
      graduation: 'End triple threat campaign ceremony',
      outcome: 'Ndoto peer educators in community'
    },

    ndotoChamps: {
      name: 'Ndoto Champs',
      target: 'Teenage mothers, GBV survivors, or those living with HIV',
      ageRange: 'Below 24 years',
      status: 'Out of school',
      location: 'Tongaren sub-county',
      services: [
        'Comprehensive sexual education',
        'Social support',
        'School re-entry facilitation',
        'Stigma reduction',
        'Skill development (soap making)',
        'Economic empowerment',
        'Market linkages'
      ],
      goal: 'Become peer mentors leading advocacy among adolescents and young people out of school'
    },

    inSchoolNdoto: {
      name: 'In-School Ndoto',
      target: 'Adolescent boys and girls aged 14-19 years',
      location: 'Schools in rural communities in Bungoma county',
      approach: 'Ndoto curriculum delivery + peer mentorship',
      teacherComponent: 'Training on addressing triple threat in schools',
      goal: 'Reach 200 schools by December 2025',
      currentReach: 45
    },

    sportsForHealth: {
      name: 'Sports for Health Tournament',
      description: 'Community-driven program using sports to address health issues',
      location: 'Tongaren sub-county',
      frequency: 'Once per year during holidays',
      activities: [
        'Triple threat awareness campaigns',
        'Reproductive health checks for participants',
        'Distribution of safe sex commodities'
      ]
    },

    dadas: {
      name: 'Dadas',
      focus: 'Menstrual health education and product provision',
      target: 'Adolescent girls and young women',
      approach: 'Community education including men and boys',
      products: 'Reusable sanitary towels',
      distribution: 'Schools and community centers',
      components: [
        'Comprehensive MHM training',
        'Production of reusable sanitary towels',
        'Educational materials distribution',
        'Male engagement in MHM'
      ]
    },

    aypChampions: {
      name: 'AYP – SRHR Champions Bungoma County',
      champions: 35,
      coverage: 'All sub-counties in Bungoma County',
      partners: ['UNAIDS', 'National Syndemic Disease Control Council (NSDCC)'],
      goal: 'Promote peer-to-peer engagement in SRHR conversations',
      focus: ['HIV/AIDS', 'Gender based violence', 'Teenage pregnancies'],
      activities: 'Series of advocacy activities in their subcounties'
    },

    tiko: {
      name: 'Tiko',
      partner: 'Tiko Africa',
      coverage: [
        'Tongaren',
        'Kimilili',
        'Webuye East',
        'Mt. Elgon',
        'Ndalu',
        'Mbakalo'
      ],
      role: 'Support adolescent girls to access sexual reproductive health services and products'
    }
  },

  metrics: {
    goals: {
      schoolsTarget: 200,
      targetDate: 'December 2025'
    },
    current: {
      schoolsReached: 45,
      championsTrained: 35,
      subCountiesCovered: 9,
      programsActive: 7
    }
  },

  brandColors: {
    primary: '#9333ea',      // Purple
    secondary: '#ec4899',    // Pink
    accent: '#8b5cf6',       // Light Purple
    success: '#10b981',      // Green
    warning: '#f59e0b',      // Orange
    danger: '#ef4444'        // Red
  }
};

export const subCounties = [
  'Tongaren',
  'Kimilili',
  'Webuye East',
  'Mt. Elgon',
  'Ndalu',
  'Mbakalo',
  'Bumula',
  'Kanduyi',
  'Sirisia'
];

export const tripleThreat = {
  name: 'Triple Threat',
  components: [
    {
      threat: 'HIV & AIDS',
      focus: ['Prevention', 'Testing', 'Living positively', 'Stigma reduction'],
      color: '#ef4444'
    },
    {
      threat: 'Gender-Based Violence',
      focus: ['Prevention', 'Survivor support', 'Community awareness', 'Reporting mechanisms'],
      color: '#f59e0b'
    },
    {
      threat: 'Teenage Pregnancy',
      focus: ['Comprehensive sex education', 'Family planning', 'School continuation', 'Life skills'],
      color: '#8b5cf6'
    }
  ]
};