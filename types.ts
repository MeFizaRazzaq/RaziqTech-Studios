
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

export interface Milestone {
  id: string;
  title: string;
  isCompleted: boolean;
  deadline?: string;
  assignedEngineerId?: string; // User ID
}

export interface Message {
  id: string;
  senderName: string;
  senderEmail: string;
  content: string;
  timestamp: string;
  isAdmin: boolean;
}

export interface ProjectChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  content: string;
  timestamp: string;
  isVisibleToClient: boolean;
}

export interface InternalMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  readBy: string[]; // User IDs who have seen the message
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
  linkedinUrl?: string;
  githubUrl?: string;
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
  teamIds: string[]; // User IDs of assigned engineers
  progress: number; // 0-100
  status: 'IN_PLANNING' | 'IN_DEVELOPMENT' | 'STAGING' | 'COMPLETED';
  milestones?: Milestone[];
  clientChatEnabled: boolean; // Toggle to include client in conversation
  chatMessages: ProjectChatMessage[];
}

export interface Inquiry {
  id: string;
  clientId?: string; // Link to client user if logged in
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  status: 'New' | 'Read' | 'Archived' | 'Converted' | 'Replied';
  createdAt: string;
  thread?: Message[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
