
export enum UserRole {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
  CLIENT = 'CLIENT'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
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
  status: 'APPROVED' | 'PENDING_APPROVAL';
}

export interface ProfileUpdateEntry {
  id: string;
  employeeId: string;
  changes: Partial<Omit<EmployeeProfile, 'id' | 'userId' | 'status'>>;
  createdAt: string;
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
  progress: number; // 0-100
  status: 'IN_PLANNING' | 'IN_DEVELOPMENT' | 'STAGING' | 'COMPLETED';
}

export interface Inquiry {
  id: string;
  clientId?: string; // Link to client user if logged in
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  status: 'New' | 'Read' | 'Archived' | 'Converted';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
