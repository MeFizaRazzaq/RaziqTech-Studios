
import { User, UserRole, EmployeeProfile, Project, Inquiry, ProfileUpdateEntry } from './types';

const STORAGE_KEY = 'raziqtech_db_v2';

interface DB {
  users: User[];
  profiles: EmployeeProfile[];
  pendingUpdates: ProfileUpdateEntry[];
  projects: Project[];
  inquiries: Inquiry[];
}

const initialDB: DB = {
  users: [
    { id: '1', email: 'admin@raziqtech.com', name: 'Alex Rivera', role: UserRole.ADMIN, avatar: 'https://picsum.photos/seed/admin/200', createdAt: new Date().toISOString() },
    { id: '2', email: 'jane@raziqtech.com', name: 'Jane Doe', role: UserRole.EMPLOYEE, avatar: 'https://picsum.photos/seed/jane/200', createdAt: new Date().toISOString() },
    { id: '3', email: 'sam@raziqtech.com', name: 'Sam Smith', role: UserRole.EMPLOYEE, avatar: 'https://picsum.photos/seed/sam/200', createdAt: new Date().toISOString() },
    { id: '4', email: 'client@enterprise.com', name: 'John Client', role: UserRole.CLIENT, avatar: 'https://picsum.photos/seed/client/200', createdAt: new Date().toISOString() },
  ],
  profiles: [
    {
      id: 'p1',
      userId: '2',
      username: 'janedoe',
      fullName: 'Jane Doe',
      roleTitle: 'Senior AI Engineer',
      bio: 'Pioneer in neural network optimization and computer vision.',
      skills: ['Python', 'PyTorch', 'Next.js', 'TensorFlow'],
      resumeUrl: '#',
      portfolioUrl: 'https://github.com/janedoe',
      githubUrl: 'https://github.com/janedoe',
      linkedinUrl: 'https://linkedin.com/in/janedoe',
      image: 'https://picsum.photos/seed/jane/400',
      chatEnabled: true,
      projects: ['proj1'],
      status: 'APPROVED'
    },
    {
      id: 'p2',
      userId: '3',
      username: 'samsmith',
      fullName: 'Sam Smith',
      roleTitle: 'Full Stack Architect',
      bio: 'Expert in building scalable distributed systems and mobile ecosystems.',
      skills: ['React Native', 'Node.js', 'AWS', 'PostgreSQL'],
      resumeUrl: '#',
      portfolioUrl: 'https://samsmith.dev',
      githubUrl: 'https://github.com/samsmith',
      linkedinUrl: 'https://linkedin.com/in/samsmith',
      image: 'https://picsum.photos/seed/sam/400',
      chatEnabled: true,
      projects: ['proj2'],
      status: 'APPROVED'
    }
  ],
  pendingUpdates: [],
  projects: [
    {
      id: 'proj1',
      title: 'EchoVision AI',
      category: 'AI',
      description: 'A real-time sentiment analysis engine for retail audio.',
      problem: 'Retailers lacked insights into customer satisfaction in physical stores.',
      solution: 'We deployed an edge-computing AI solution using localized sensors.',
      outcome: 'Reduced customer dissatisfaction by 40% through real-time staff alerts.',
      techStack: ['Python', 'FastAPI', 'Azure IoT', 'D3.js'],
      imageUrl: 'https://picsum.photos/seed/tech1/800/600',
      teamIds: ['2'],
      progress: 75,
      status: 'IN_DEVELOPMENT'
    },
    {
      id: 'proj2',
      title: 'PaySwift Mobile',
      category: 'Mobile',
      description: 'Cross-border payment platform for emerging markets.',
      problem: 'High fees and slow processing for international remittances.',
      solution: 'Blockchain-backed mobile app with instant settlement.',
      outcome: 'Processing $5M+ in monthly volume with sub-3 second latency.',
      techStack: ['React Native', 'Solidity', 'Go', 'Firebase'],
      imageUrl: 'https://picsum.photos/seed/tech2/800/600',
      teamIds: ['3', '2'],
      progress: 100,
      status: 'COMPLETED'
    }
  ],
  inquiries: [
    {
      id: 'inq1',
      clientId: '4',
      name: 'John Client',
      email: 'client@enterprise.com',
      projectType: 'Mobile Development',
      budget: '$50,000 - $100,000',
      message: 'Looking to build a neo-bank app for youth.',
      status: 'Read',
      createdAt: new Date().toISOString()
    }
  ]
};

const getDB = (): DB => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : initialDB;
};

const saveDB = (db: DB) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
};

export const MockDB = {
  getUsers: () => getDB().users,
  getProfiles: () => getDB().profiles,
  getProjects: () => getDB().projects,
  getInquiries: () => getDB().inquiries,
  getPendingUpdates: () => getDB().pendingUpdates,

  // Employee CRUD
  addEmployee: (user: Omit<User, 'id' | 'createdAt'>, profile: Omit<EmployeeProfile, 'id' | 'userId' | 'status'>) => {
    const db = getDB();
    const userId = Math.random().toString(36).substr(2, 9);
    const profileId = 'p' + Math.random().toString(36).substr(2, 9);
    
    const newUser: User = { ...user, id: userId, createdAt: new Date().toISOString() };
    const newProfile: EmployeeProfile = { ...profile, id: profileId, userId, status: 'APPROVED' };
    
    db.users.push(newUser);
    db.profiles.push(newProfile);
    saveDB(db);
    return { user: newUser, profile: newProfile };
  },

  updateEmployee: (profileId: string, updates: Partial<EmployeeProfile>, userUpdates: Partial<User>) => {
    const db = getDB();
    const profileIdx = db.profiles.findIndex(p => p.id === profileId);
    if (profileIdx === -1) return;

    const profile = db.profiles[profileIdx];
    db.profiles[profileIdx] = { ...profile, ...updates };

    const userIdx = db.users.findIndex(u => u.id === profile.userId);
    if (userIdx !== -1) {
      db.users[userIdx] = { ...db.users[userIdx], ...userUpdates };
    }

    saveDB(db);
  },

  deleteEmployee: (profileId: string) => {
    const db = getDB();
    const profile = db.profiles.find(p => p.id === profileId);
    if (!profile) return;

    db.profiles = db.profiles.filter(p => p.id !== profileId);
    db.users = db.users.filter(u => u.id !== profile.userId);
    saveDB(db);
  },

  // Project CRUD
  addProject: (proj: Omit<Project, 'id'>) => {
    const db = getDB();
    const newProj: Project = {
      ...proj,
      id: 'proj' + Math.random().toString(36).substr(2, 9)
    };
    db.projects.push(newProj);
    saveDB(db);
    return newProj;
  },

  updateProject: (id: string, updates: Partial<Project>) => {
    const db = getDB();
    const idx = db.projects.findIndex(p => p.id === id);
    if (idx !== -1) {
      db.projects[idx] = { ...db.projects[idx], ...updates };
      saveDB(db);
    }
  },

  deleteProject: (id: string) => {
    const db = getDB();
    db.projects = db.projects.filter(p => p.id !== id);
    saveDB(db);
  },

  // Other Existing Methods
  signupClient: (name: string, email: string) => {
    const db = getDB();
    if (db.users.find(u => u.email === email)) throw new Error("Email already exists");
    
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      role: UserRole.CLIENT,
      avatar: `https://picsum.photos/seed/${email}/200`,
      createdAt: new Date().toISOString()
    };
    db.users.push(newUser);
    saveDB(db);
    return newUser;
  },

  addInquiry: (inq: Omit<Inquiry, 'id' | 'status' | 'createdAt'>) => {
    const db = getDB();
    const newInq: Inquiry = {
      ...inq,
      id: Math.random().toString(36).substr(2, 9),
      status: 'New',
      createdAt: new Date().toISOString()
    };
    db.inquiries.unshift(newInq);
    saveDB(db);
    return newInq;
  },

  requestProfileUpdate: (employeeId: string, changes: Partial<EmployeeProfile>) => {
    const db = getDB();
    const newUpdate: ProfileUpdateEntry = {
      id: Math.random().toString(36).substr(2, 9),
      employeeId,
      changes,
      createdAt: new Date().toISOString()
    };
    db.pendingUpdates.push(newUpdate);
    
    const profileIdx = db.profiles.findIndex(p => p.id === employeeId);
    if (profileIdx > -1) {
      db.profiles[profileIdx].status = 'PENDING_APPROVAL';
    }
    
    saveDB(db);
    return newUpdate;
  },

  approveProfileUpdate: (updateId: string) => {
    const db = getDB();
    const updateIdx = db.pendingUpdates.findIndex(u => u.id === updateId);
    if (updateIdx === -1) return;

    const update = db.pendingUpdates[updateIdx];
    const profileIdx = db.profiles.findIndex(p => p.id === update.employeeId);
    
    if (profileIdx > -1) {
      db.profiles[profileIdx] = { 
        ...db.profiles[profileIdx], 
        ...update.changes, 
        status: 'APPROVED' 
      };
    }
    
    db.pendingUpdates.splice(updateIdx, 1);
    saveDB(db);
  },

  rejectProfileUpdate: (updateId: string) => {
    const db = getDB();
    const updateIdx = db.pendingUpdates.findIndex(u => u.id === updateId);
    if (updateIdx === -1) return;
    
    const update = db.pendingUpdates[updateIdx];
    const profileIdx = db.profiles.findIndex(p => p.id === update.employeeId);
    if (profileIdx > -1) {
      db.profiles[profileIdx].status = 'APPROVED';
    }
    
    db.pendingUpdates.splice(updateIdx, 1);
    saveDB(db);
  }
};
