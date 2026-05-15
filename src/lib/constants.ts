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
      'How I went from a dead-end Lego robot to building an autonomous mapping machine from scratch — a thesis journey about persistence, mentorship, and 7.5 cm of accuracy.',
    icon: 'code',
    accent: 'cyan',
    image: '/images/activities/skripsi.jpg',
    sections: [
      {
        heading: 'Finding a Real Problem',
        body: 'I and my friend Azis were searching for a thesis topic when we both agreed we wanted to work on something that would solve real problems—ideally as part of an existing research project. Our search led us to meet Dr. Kristedjo Kurnianto, a researcher at BRIN Serpong. He shared a compelling problem: there was an abandoned building in the BRIN complex that was exposed to contamination. Before the building could be decontaminated, it needed to be mapped out. This sparked our idea: why not use an autonomous robot to map such a dangerous space?',
      },
      {
        heading: 'Hope in a Lego Robot',
        body: 'With our thesis topic finalized, we selected Dr. Agus Arif as our university advisor. So we had two mentors: Dr. Kristedjo from BRIN and Dr. Agus from campus. After our initial discussions about the research approach, they entrusted me and Azis with executing the project.\n\nDuring our visit to BRIN Serpong, we were lent a Lego Mindstorms NXT robot. Armed with basic programming knowledge, we continuously learned to develop the autonomous robot while experimenting with its capabilities. However, after spending almost two months on it, we reached a difficult conclusion: the Lego robot\'s system was too closed off and too old to be freely modified for our contamination mapping mission.',
      },
      {
        heading: 'Arguing for a "Meaningful Failure"',
        body: 'Recognizing this obstacle, we approached our campus advisor to ask permission to design a new robot from scratch to better suit our needs. Initially, our request was rejected. His reasoning: research doesn\'t always have to succeed; if we failed with the Lego robot, we could simply document that failure in our thesis.\n\nBut I disagreed. To me, forcing ourselves to use an inadequate Lego robot wouldn\'t just result in failure—the lessons learned would be hollow. I wanted our failure, if it came, to be genuinely mine, born from my own efforts, not from the inherent limitations of a tool unsuitable for mapping. Eventually, our advisor found a middle ground: we would consult with Dr. Dwi Joko, a professor who deeply understood robotics in our department. If he approved, our advisor would too. When we met with Dr. Dwi and explained our situation, he agreed with our plan to build the robot from scratch and even offered to guide me and Azis.',
      },
      {
        heading: 'Reverse Engineering and Dividing Roles',
        body: 'We started researching how to design a robot. But here was where the real challenge emerged: neither I nor Azis had any background in robotics. I had to think creatively about how someone without expertise could build a robot. The answer was reverse engineering.\n\nI found an open-source reference from someone who had documented how to build an autonomous mapping robot. I dissected how it worked and customized it to fit our needs. We then divided the tasks: I focused on completing the robot\'s design and technical aspects, while Azis developed the radiation detection system that would work alongside the mapping functionality.',
      },
      {
        heading: 'Building from Scratch',
        body: 'Even with tutorials and open-source references, redesigning the system to achieve our specific goals was far from simple. I had to ask more experienced robotics friends multiple times to verify design details. Eventually, I managed to complete my own version of the design.',
        image: '/images/activities/skripsi-components.jpg',
      },
      {
        heading: 'The Robot Comes Alive',
        body: 'We began purchasing components and, with help from a friend, assembled the robot hardware fully. It took about three months before the robot could finally run. Of course, reality wasn\'t smooth sailing from day one—many adjustments were needed to match our expectations. But for me, these were minor obstacles compared to the much larger hurdles we\'d already overcome.',
        image: '/images/activities/skripsi-robot.jpg',
      },
      {
        heading: 'Testing in the Lobby',
        body: 'Finally, our robot was ready for testing. We conducted data collection in the lobby of the Nuclear Engineering and Physics Department Building. We chose the lobby intentionally; when facing the actual contaminated building, mapping would naturally begin from the front area, typically a lobby.\n\nDuring this test, I focused on the accuracy of the robot\'s position relative to the map it generated. The results were remarkably encouraging: the robot successfully mapped the entire lobby. Moreover, its accuracy was excellent—with an average deviation of only 7.5 centimeters from the origin point.',
        video: '/images/activities/skripsi-demo.mp4',
      },
      {
        heading: 'Lessons Behind the Thesis',
        body: 'Looking back on this thesis journey, I feel deeply satisfied. Although we got stuck early on with the aging Lego robot—or to be honest, perhaps because I hadn\'t yet mastered it—I\'m genuinely grateful we found a solution quickly rather than dragging things out in confusion.\n\nThis journey gave me a new perspective: no single discipline can stand alone to achieve great goals. Cross-disciplinary collaboration and teamwork are essential. We shouldn\'t dismiss other fields or assume our own field is superior. For me, this has been one of the most extraordinary experiences I\'ve had so far.',
      },
    ],
    quote: 'This project taught me that innovation often comes not from having all the answers upfront, but from persistence, collaboration, and the willingness to ask for help when needed.',
  },
  {
    id: '2',
    slug: 'cikande',
    title: 'Journey of Radiation Decontamination in Cikande',
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
    slug: 'pertamina',
    title: 'Experience From Nuclear to Oil n Gas Reliability',
    category: 'Story',
    description:
      'Three months inside Pertamina RU VI Balongan\'s refinery — where nuclear control theory unexpectedly became the bridge into oil & gas reliability engineering.',
    icon: 'rocket',
    accent: 'cyan',
    image: '/images/activities/pertamina.jpg',
    imagePosition: 'center 32%',
    imageScale: 0.93,
    sections: [
      {
        heading: 'Finding Common Ground',
        body: 'Arriving at Pertamina RU VI Balongan as a Nuclear Engineering student felt incredibly exciting, though I was also aware that my background was somewhat different. Initially, my mentor in the Reliability division seemed puzzled and felt my background didn\'t quite align with the division\'s focus. But after discussing and exploring further, we discovered our connection point: Control Engineering. It turned out that the systems control knowledge I learned on campus became the perfect bridge for understanding how reliability works in a refinery. From this moment of alignment, my learning journey truly began.',
      },
      {
        heading: 'From Schematics to the Shop Floor',
        body: 'My first month was largely spent in the office. I immersed myself in piles of documents, familiarized myself with various instruments, learned to read Piping and Instrumentation Diagrams (P&ID), and studied the logic of Distributed Control System (DCS) and PID controllers. Then came the day I was invited to step directly into the refinery. It was exhilarating to see the physical equipment that I had only viewed in schematic diagrams. The experience became even more complete when I visited the Central Control Room (CCR). There, I directly witnessed how engineers set up the processes and was shown the rows of servers that serve as the brain behind the refinery\'s control computers.',
      },
      {
        heading: 'The Assignment That Made It Click',
        body: 'As part of my assignment, I was given a challenging exercise: analyzing a cascade control loop system in one of the P&IDs. This system regulated eight pipes that needed to maintain equal flow rates. My main task was to write a report on how the control valve operates to achieve balanced flow across all eight pipes. Successfully completing this analysis gave me a unique sense of accomplishment.',
      },
    ],
    quote: 'These three months of internship flew by, but they were incredibly memorable because I experienced so much that was new to me. My hope is that one day I\'ll have the opportunity to return, hopefully for a longer period so I can deepen my learning.',
  },
  {
    id: '4',
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
];

export const NAV_LINKS = [
  { label: 'HOME', href: '#hero' },
  { label: 'ACTIVITIES', href: '#activities' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'ABOUT', href: '#about' },
  { label: 'FIND ME', href: '#contact' },
];
