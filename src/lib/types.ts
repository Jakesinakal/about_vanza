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

export interface ActivitySection {
  heading: string;
  body: string;
  image?: string;
  video?: string;
}

export interface Activity {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  icon: 'code' | 'pencil' | 'trophy' | 'users' | 'rocket';
  accent: 'cyan' | 'violet' | 'amber' | 'emerald' | 'rose';
  image?: string;       // path relative to /public, e.g. '/images/activities/open-source.jpg'
  imagePosition?: string; // CSS backgroundPosition / objectPosition, e.g. 'center 20%'
  imageScale?: number;    // zoom-out factor for detail page hero (e.g. 0.93 = 7% out); default 1
  video?: string;       // path relative to /public, e.g. '/images/activities/clip.mp4'
  comingSoon?: boolean;
  sections?: ActivitySection[];
  quote?: string;
}
