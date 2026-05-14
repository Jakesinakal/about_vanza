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
    slug: 'story',
    title: 'My Robotic Thesis Journey',
    category: 'Story',
    description:
      'Sabar Masih Mikir',
    icon: 'code',
    accent: 'cyan',
    image: '/images/activities/skripsi.jpg',
  },
  {
    id: '2',
    slug: 'cikande',
    title: 'One-Month Journey of Radiation Decontamination in Cikande',
    category: 'Story',
    description:
      'One month. Hazmat suits. A national radiation crisis. Here\'s what Cikande taught me about the professional world that no university ever could.',
    icon: 'pencil',
    accent: 'cyan',
    image: '/images/activities/cikande.jpg',
    sections: [
      {
        heading: 'The Late Call That Changed Everything',
        body: 'As a fresh graduate searching for my first foothold in the professional world, I was met with shocking news: the discovery of radiation-exposed shrimp. This wasn\'t just a regular environmental issue; it was a disaster on a national scale.\n\nInitially, I was just a spectator. However, fate had other plans. In the second month of the decontamination project, I received an unexpected invitation to join the team. Despite being late to the game, I didn\'t think twice. I stepped into Cikande, heading into a project that would forever change my perspective on the working world.',
      },
      {
        heading: 'Field Reality: Hazmat Suits, Blistering Sun, and Campus Theories',
        body: 'My first day on site felt like entering another dimension. If anyone asks how much of my college knowledge was applicable here, to be honest, it was probably only about 10–20%. However, the problem-solving mindset forged during my university years became my absolute greatest weapon.\n\nThe first three days were a massive culture shock and a grueling physical test. It was my first time wearing a full hazmat suit under the scorching Cikande sun. It was incredibly sweltering, sweat poured endlessly, and dehydration became the ultimate enemy.\n\nDuring this adaptation phase, I chose to observe. I paid close attention to the seniors\' workflows, mentally noting every detail so I could quickly catch up to their rhythm and become a reliable part of a solid team.',
      },
      {
        heading: 'The Rhythm of Decontamination: From Pebbles to Midnight Mapping',
        body: 'Once I found my rhythm, my confidence grew. I started to speak up and share my ideas. Our daily tasks were highly specific and required immense precision.\n\nWe cleared radiation-exposed soil, rocks, and trash — the majority of the waste consisted of pebbles and stones mixed with dirt. The collected waste had to be precisely labeled and safely transported to a specialized storage facility. Documentation was our lifeline; the movement of the waste was strictly monitored every single day without exception. At the end of an exhausting day, we still sat down together for daily mapping, strategizing which areas needed to be decontaminated the next day.\n\nThe most intense moment occurred a week before the deadline set by the Ministry of Environment and Forestry (KLHK). We had to work at maximum speed, often pulling overtime until midnight. Under this immense time pressure, we truly learned what it meant to work efficiently.',
      },
      {
        heading: 'Lessons Behind a National Disaster',
        body: 'The professional world turned out to be vastly different from university life. Yet, there is one crucial common thread between the two: Communication.\n\nIn this project, I learned to set my ego aside. Collaborating in the field demands extra patience and mutual understanding. What made this experience so invaluable was the opportunity to interact with various key stakeholders — from the affected local residents and experts from KBRN (Chemical, Biological, Radiological, and Nuclear defense) and NUBIKA, to representatives from KLHK.\n\nThere was a profound sense of pride in playing a role in resolving this national crisis alongside them.',
      },
      {
        heading: 'Epilogue: A New Perspective',
        body: 'One month flew by. As I took off my hazmat suit for the last time, the view of every site in front of me was vastly different from when we first started. They were no longer "dangerous" zones, but lands that were now safe enough for the local community to use once again.',
      },
    ],
    quote: 'Cikande gave me much more than just my first work experience. It gave me a brand-new perspective on the professional world that I had never even imagined before. Leaving this project, I know one thing for sure: I am more than ready to face whatever challenges my next career journey holds.',
  },
  {
    id: '3',
    slug: 'soon',
    title: 'Mentoring Junior Devs',
    category: 'Coming Soon',
    description:
      'Mentoring engineers transitioning into data roles through online communities, code reviews, and one-on-one sessions.',
    icon: 'users',
    accent: 'emerald',
    comingSoon: true,
    video: '/images/activities/panahan.mp4',
  },
  {
    id: '4',
    slug: 'story',
    title: 'Experience From Nuclear to Oil n Gas Reliability',
    category: 'Story',
    description:
      'Sabar Masih Mikir',
    icon: 'rocket',
    accent: 'cyan',
    image: '/images/activities/pertamina.jpg',
  },
];

export const NAV_LINKS = [
  { label: 'HOME', href: '#hero' },
  { label: 'ACTIVITIES', href: '#activities' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'ABOUT', href: '#about' },
  { label: 'FIND ME', href: '#contact' },
];
