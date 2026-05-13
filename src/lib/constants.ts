import type { Project, TimelineMilestone, MotivationCard, Activity } from './types';

export const PERSONAL_INFO = {
  name: 'Van Za',
  fullName: 'Van Za Aimar',
  title: 'Data Engineer & Full-Stack Developer',
  location: 'Cirebon, Indonesia',
  email: 'officialvanza.id@gmail.com',
  linkedin: 'https://linkedin.com/in/vanzaaimarrochman',
  github: 'https://github.com/Jakesinakal',
  resume: '/resume.pdf',
  bio: [
    'I started as a nuclear engineer, building rigorous foundations in complex systems and mathematics. That foundation led me to discover my true passion: building data systems and software products that solve real problems at scale.',
    'Today I specialize in designing scalable data pipelines, architecting ETL/ELT workflows, and building full-stack applications that make data actionable. I care deeply about performance, reliability, and code that future engineers will actually enjoy reading.',
    'When I\'m not engineering pipelines or debugging APIs, you\'ll find me exploring system design challenges, tinkering with side projects, or thinking about how data and product can work better together.',
  ],
} as const;

export const JOURNEY: TimelineMilestone[] = [
  {
    id: '1',
    period: '2020 – 2021',
    title: 'Nuclear Engineering Foundation',
    description:
      'Earned a degree in Nuclear Engineering, building rigorous foundations in mathematics, thermodynamics, and complex systems. Developed deep problem-solving skills applied to safety-critical environments.',
    icon: 'atom',
  },
  {
    id: '2',
    period: '2021 – 2022',
    title: 'Pivot to Data Engineering',
    description:
      'Discovered the intersection of engineering rigor and data. Mastered Python and SQL, built first ETL pipelines, and realized data infrastructure is where complex systems meet real business impact.',
    icon: 'database',
  },
  {
    id: '3',
    period: '2022 – 2023',
    title: 'Full-Stack Development',
    description:
      'Expanded into web development — backend APIs with FastAPI and Node.js, frontend with React. Started building end-to-end products, from database schema to deployed UI.',
    icon: 'code',
  },
  {
    id: '4',
    period: '2023 – 2024',
    title: 'Systems & Architecture',
    description:
      'Leveled up to distributed systems design, performance optimization at scale, and technical leadership. Focused on building systems that don\'t just work — but scale gracefully.',
    icon: 'server',
  },
  {
    id: '5',
    period: '2024 – Present',
    title: 'Building Products',
    description:
      'Combining data engineering and full-stack skills to build meaningful products. Focused on the intersection of great data infrastructure and great user experience.',
    icon: 'rocket',
  },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Real-Time Data Pipeline Platform',
    description:
      'End-to-end streaming platform processing millions of events per day using Kafka, Spark Streaming, and BigQuery. Reduced data latency from hours to seconds.',
    tags: ['Python', 'Apache Kafka', 'Spark', 'BigQuery', 'Airflow'],
    github: 'https://github.com/your-username/data-pipeline',
    metric: '10M+ events/day',
    color: 'bg-cyan-500/10',
  },
  {
    id: '2',
    title: 'Analytics Dashboard',
    description:
      'Full-stack analytics platform with a React frontend and FastAPI backend. Custom data visualization components with real-time WebSocket updates.',
    tags: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'WebSockets'],
    github: 'https://github.com/your-username/analytics-dashboard',
    demo: 'https://demo.example.com',
    metric: '50% faster insights',
    color: 'bg-violet-500/10',
  },
  {
    id: '3',
    title: 'dbt Transformation Framework',
    description:
      'Enterprise-scale dbt project with 200+ models, custom macros, and automated data quality testing. Standardized modeling practices across multiple engineering teams.',
    tags: ['dbt', 'SQL', 'BigQuery', 'Python', 'CI/CD'],
    github: 'https://github.com/your-username/dbt-framework',
    metric: '200+ models',
    color: 'bg-emerald-500/10',
  },
  {
    id: '4',
    title: 'API Gateway & Auth Service',
    description:
      'Microservices API gateway with JWT authentication, rate limiting, and request routing. Built with Node.js, deployed on Kubernetes with auto-scaling.',
    tags: ['Node.js', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis'],
    github: 'https://github.com/your-username/api-gateway',
    metric: '99.9% uptime',
    color: 'bg-orange-500/10',
  },
];


export const MOTIVATION_CARDS: MotivationCard[] = [
  {
    id: 'turning',
    label: 'Turning Points',
    content:
      'My thesis on autonomous robots taught me how to code. However, robotics didn\’t really interest me. It was data infrastructure that unexpectedly caught my interest. That shift led me into the world of data.',
    rotation: '-rotate-1',
  },
  {
    id: 'drives',
    label: "What Drives Me",
    content:
      'Building robust, end-to-end data infrastructure that scales with complexity. That\'s what I\'m here to do.',
    rotation: 'rotate-1',
  },
];

export const ACTIVITIES: Activity[] = [
  {
    id: '1',
    title: 'Open Source Contributions',
    category: 'Development',
    description:
      'Actively contributing to open source data engineering tools — submitting PRs to Apache ecosystem projects and dbt community packages.',
    icon: 'code',
    accent: 'cyan',
    image: '/images/activities/skripsi.jpg',
  },
  {
    id: '2',
    title: 'Technical Writing',
    category: 'Content Creation',
    description:
      'Publishing in-depth articles on data engineering patterns, pipeline architecture, and SQL optimization on personal blog and Medium.',
    icon: 'pencil',
    accent: 'violet',
  },
  {
    id: '3',
    title: 'Data Competitions',
    category: 'Learning',
    description:
      'Participating in Kaggle and analytics competitions to sharpen ML intuition and explore new approaches to real-world datasets.',
    icon: 'trophy',
    accent: 'amber',
  },
  {
    id: '4',
    title: 'Mentoring Junior Devs',
    category: 'Community',
    description:
      'Mentoring engineers transitioning into data roles through online communities, code reviews, and one-on-one sessions.',
    icon: 'users',
    accent: 'emerald',
  },
  {
    id: '5',
    title: 'Weekend Side Projects',
    category: 'Building',
    description:
      'Exploring new tech stacks by building weekend projects — from real-time dashboards to personal automation pipelines.',
    icon: 'rocket',
    accent: 'rose',
  },
];

export const NAV_LINKS = [
  { label: 'HOME', href: '#hero' },
  { label: 'ACTIVITIES', href: '#activities' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'ABOUT', href: '#about' },
  { label: 'FIND ME', href: '#contact' },
];
