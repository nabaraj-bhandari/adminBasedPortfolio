// Type definitions for the portfolio application

export interface PersonalInfo {
  _id?: string;
  full_name: string;
  title: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  resume_url: string;
  profile_picture?: string;
  github: string;
  linkedin: string;
  twitter: string;
  website: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Project {
  _id?: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo: string;
  date: Date;
  featured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Skill {
  _id?: string;
  name: string;
  level: number;
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AdditionalCompetency {
  _id?: string;
  name: string;
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BlogPost {
  _id?: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  tags: string[];
  date: Date;
  read_time: string;
  published: boolean;
  pdfs?: Array<{
    title: string;
    url: string;
    downloadCount?: number;
  }>;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ContactMessage {
  _id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  replied: boolean;
  priority: "low" | "medium" | "high";
  createdAt?: Date;
  updatedAt?: Date;
}

// Database operations return types
export interface DatabaseOperations {
  // Personal Info
  getPersonalInfo(): Promise<PersonalInfo | null>;
  updatePersonalInfo(data: Partial<PersonalInfo>): Promise<PersonalInfo | null>;

  // Projects
  getProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | null>;
  createProject(
    data: Omit<Project, "_id" | "createdAt" | "updatedAt">
  ): Promise<Project | null>;
  updateProject(id: string, data: Partial<Project>): Promise<Project | null>;
  deleteProject(id: string): Promise<boolean>;

  // Skills
  getSkills(): Promise<Skill[]>;
  createSkill(
    data: Omit<Skill, "_id" | "createdAt" | "updatedAt">
  ): Promise<Skill | null>;
  updateSkill(id: string, data: Partial<Skill>): Promise<Skill | null>;
  deleteSkill(id: string): Promise<boolean>;

  // Additional Competencies
  getAdditionalCompetencies(): Promise<AdditionalCompetency[]>;
  createAdditionalCompetency(
    data: Omit<AdditionalCompetency, "_id" | "createdAt" | "updatedAt">
  ): Promise<AdditionalCompetency | null>;
  updateAdditionalCompetency(
    id: string,
    data: Partial<AdditionalCompetency>
  ): Promise<AdditionalCompetency | null>;
  deleteAdditionalCompetency(id: string): Promise<boolean>;

  // Blog Posts
  getBlogPosts(): Promise<BlogPost[]>;
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | null>;
  createBlogPost(
    data: Omit<BlogPost, "_id" | "createdAt" | "updatedAt">
  ): Promise<BlogPost | null>;
  updateBlogPost(id: string, data: Partial<BlogPost>): Promise<BlogPost | null>;
  deleteBlogPost(id: string): Promise<boolean>;
}
