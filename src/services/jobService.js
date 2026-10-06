import api from './api';

const DEFAULT_JOBS = [
  {
    id: 'job-1',
    title: 'Senior Full Stack Engineer',
    company: 'Apex Cloud Solutions',
    location: 'San Francisco, CA (Hybrid)',
    type: 'Full-time',
    salary: '$145,000 - $185,000',
    postedDate: '2 days ago',
    requiredSkills: ['React', 'JavaScript', 'Spring Boot', 'Java', 'MongoDB', 'REST API', 'Docker'],
    description: 'We are seeking an experienced Full Stack Engineer to lead the architecture and implementation of our next-generation cloud services. You will design scalable microservices and intuitive React frontends.',
    fullDescription: 'As a Senior Full Stack Engineer at Apex Cloud Solutions, you will:\n• Design, develop, and maintain cloud-native microservices using Java Spring Boot and MongoDB.\n• Build elegant, responsive user interfaces using React.js and modern state management.\n• Optimize high-volume REST APIs and implement robust CI/CD deployment pipelines.\n• Collaborate closely with product managers and UX designers.',
  },
  {
    id: 'job-2',
    title: 'Frontend React Developer',
    company: 'PixelCraft Technologies',
    location: 'Remote',
    type: 'Full-time',
    salary: '$110,000 - $140,000',
    postedDate: 'Just now',
    requiredSkills: ['React', 'JavaScript', 'Tailwind CSS', 'TypeScript', 'REST API', 'Git'],
    description: 'Join our dynamic product team to build responsive, performant user interfaces for our real-time collaboration workspace tool.',
    fullDescription: 'Looking for a passionate Frontend Developer skilled in React, Tailwind CSS, and modern web application development. You will create pixel-perfect UI components, consume backend REST endpoints, and ensure cross-browser responsiveness.',
  },
  {
    id: 'job-3',
    title: 'Java Backend Engineer',
    company: 'FinVantage Systems',
    location: 'New York, NY (On-site)',
    type: 'Full-time',
    salary: '$130,000 - $160,000',
    postedDate: '3 days ago',
    requiredSkills: ['Java', 'Spring Boot', 'Microservices', 'PostgreSQL', 'Docker', 'AWS', 'Kafka'],
    description: 'Scale our high-frequency financial transaction processing platform using Spring Boot, Kafka, and distributed data architectures.',
    fullDescription: 'Key responsibilities include designing resilient microservices in Java / Spring Boot, writing high-throughput database queries, ensuring strict data security compliance, and managing AWS infrastructure.',
  },
  {
    id: 'job-4',
    title: 'AI / Full Stack Software Engineer',
    company: 'NeuralFlow Labs',
    location: 'Austin, TX (Hybrid)',
    type: 'Full-time',
    salary: '$150,000 - $190,000',
    postedDate: '1 week ago',
    requiredSkills: ['React', 'Python', 'Spring Boot', 'MongoDB', 'REST API', 'Machine Learning'],
    description: 'Help develop AI-infused workflow automation tools combining modern React frontends with scalable AI inference backend pipelines.',
    fullDescription: 'NeuralFlow is hiring a full-stack engineer to integrate Large Language Model features into business productivity software. Experience with React, modern backend frameworks, and vector search is a plus.',
  },
];

export const jobService = {
  /**
   * Fetch all job postings
   */
  async getAllJobs() {
    try {
      const response = await api.get('/jobs');
      if (Array.isArray(response.data) && response.data.length > 0) {
        return response.data;
      }
      return DEFAULT_JOBS;
    } catch (err) {
      console.warn('Backend unavailable, loading default jobs:', err.message);
      return DEFAULT_JOBS;
    }
  },

  /**
   * Get job by ID
   */
  async getJobById(id) {
    try {
      const response = await api.get(`/jobs/${id}`);
      return response.data;
    } catch (err) {
      console.warn(`Backend unavailable, loading default job ${id}:`, err.message);
      return DEFAULT_JOBS.find((j) => j.id === id) || DEFAULT_JOBS[0];
    }
  },
};

export default jobService;
