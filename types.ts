
export enum UserRole {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface EmployeeProfile {
  id: string;
  userId: string;
  username: string;
  fullName: string;
  roleTitle: string;
  bio: string;
  skills: string[];
  resumeUrl: string;
  portfolioUrl: string;
  image: string;
  chatEnabled: boolean;
  projects: string[]; // Project IDs
}

export interface Project {
  id: string;
  title: string;
  category: 'Web' | 'Mobile' | 'AI';
  description: string;
  problem: string;
  solution: string;
  outcome: string;
  techStack: string[];
  imageUrl: string;
  teamIds: string[]; // User IDs
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  status: 'New' | 'Read' | 'Archived';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
