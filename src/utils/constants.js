export const STORAGE_KEYS = {
  AUTH_TOKEN: 'resumai_auth_token',
  AUTH_USER: 'resumai_auth_user',
  ACTIVE_RESUME: 'resumai_active_resume',
  ACTIVE_TEMPLATE: 'resumai_active_template',
};

export const RESUME_TEMPLATES = {
  MODERN: 'modern',
  MINIMALIST: 'minimalist',
  EXECUTIVE: 'executive',
};

export const TEMPLATE_OPTIONS = [
  {
    id: RESUME_TEMPLATES.MODERN,
    name: 'Modern Tech',
    description: 'Clean, contemporary layout tailored for software engineers & tech professionals.',
    badge: 'Popular',
    accentColor: '#026bc9',
  },
  {
    id: RESUME_TEMPLATES.MINIMALIST,
    name: 'Minimalist ATS',
    description: 'High readability, single-column design optimized for ATS scanner compliance.',
    badge: 'ATS-Friendly',
    accentColor: '#1e293b',
  },
  {
    id: RESUME_TEMPLATES.EXECUTIVE,
    name: 'Executive Classic',
    description: 'Sophisticated typography and structured sections for senior & leadership roles.',
    badge: 'Corporate',
    accentColor: '#475569',
  },
];

export const INITIAL_RESUME_STATE = {
  title: 'My Professional Resume',
  template: RESUME_TEMPLATES.MODERN,
  personalInfo: {
    fullName: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 019-2834',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexmorgan',
    github: 'github.com/alexmorgan',
  },
  summary: 'Results-driven Full Stack Software Engineer with 4+ years of experience building high-scale distributed web applications using React, Node.js, Spring Boot, and cloud technologies. Proven track record in improving system performance and leading agile teams.',
  education: [
    {
      id: 'edu-1',
      institution: 'University of California, Berkeley',
      degree: 'B.S. in Computer Science',
      startYear: '2016',
      endYear: '2020',
      description: 'Graduated with Magna Cum Laude. Relevant Coursework: Data Structures, Algorithms, Distributed Systems, Database Management.',
    },
  ],
  experience: [
    {
      id: 'exp-1',
      company: 'TechFlow Systems',
      role: 'Senior Full Stack Engineer',
      startDate: 'Jan 2022',
      endDate: 'Present',
      description: '• Architected and developed core SaaS microservices with Spring Boot and React, serving over 250k daily active users.\n• Optimized database queries and Redis caching, cutting P99 API latency by 42%.\n• Mentored 5 junior and mid-level engineers and drove CI/CD automation adoption.',
    },
    {
      id: 'exp-2',
      company: 'NovaCore Solutions',
      role: 'Frontend Developer',
      startDate: 'Jul 2020',
      endDate: 'Dec 2021',
      description: '• Built responsive component libraries with React, Tailwind CSS, and REST API integrations.\n• Collaborated with UX designers to revamp onboarding flow, improving user conversion by 28%.\n• Implemented unit and integration test suites achieving 88% code coverage.',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'CloudScale Monitoring Dashboard',
      technologies: 'React, Tailwind CSS, Spring Boot, WebSocket, Docker',
      description: 'Built a real-time cluster health monitoring dashboard with live metrics visualization and alert notifications.',
      link: 'https://github.com/alexmorgan/cloudscale',
    },
    {
      id: 'proj-2',
      title: 'AI Smart Document Analyzer',
      technologies: 'Node.js, React, OpenAI API, MongoDB',
      description: 'Developed an automated document summarization and keyword extraction pipeline processing 10k+ pages monthly.',
      link: 'https://github.com/alexmorgan/doc-analyzer',
    },
  ],
  skills: [
    'React.js',
    'JavaScript (ES6+)',
    'Java',
    'Spring Boot',
    'MongoDB',
    'REST APIs',
    'Tailwind CSS',
    'Docker',
    'Git',
    'PostgreSQL',
    'Node.js',
    'Microservices',
  ],
};
