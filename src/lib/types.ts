export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  metric?: string;
  color: string;
}

export interface TimelineMilestone {
  id: string;
  period: string;
  title: string;
  description: string;
  icon: 'atom' | 'database' | 'code' | 'server' | 'rocket';
}

export interface MotivationCard {
  id: string;
  label: string;
  content: string;
  rotation: string;
}

export interface Activity {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: 'code' | 'pencil' | 'trophy' | 'users' | 'rocket';
  accent: 'cyan' | 'violet' | 'amber' | 'emerald' | 'rose';
}
