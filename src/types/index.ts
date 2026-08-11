export type NavItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  name: string;
  url: string;
  src: string;
};

export type ProblemService = {
  icon: string;
  title: string;
  description: string;
};

export type ServiceCategory = {
  id: string;
  name: string;
  icon: string;
  phrase: string;
  services: string[];
  stack: string[];
  maxHeight: number;
};

export type DevProject = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  year: string;
  startDate: string;
  endDate?: string;
  status: "completed" | "in-progress" | "planned";
  category: string;
  clientType: "cliente" | "internal" | string;
  liveUrl: string;
  githubUrl?: string;
  technologies: string[];
  tags: string[];
  challenges: string[];
  learnings: string[];
  theme: {
    surface: string;
    accent: string;
    glow: string;
  };
  pages: string[];
  video?: {
    src: string;
    poster?: string;
  };
};

export type SkillCategoryKey = "frontend" | "backend" | "database" | "tools";

export type SkillCategory = {
  key: SkillCategoryKey;
  label: string;
};

export type Skill = {
  id: string;
  name: string;
  category: SkillCategoryKey;
  level: 1 | 2 | 3 | 4 | 5;
  icon: string;
};

export type ContactInfo = {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  linkedinDisplay: string;
  github: string;
  githubDisplay: string;
  fiverr: string;
  fiverrDisplay: string;
};

export type ContactPayload = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};
