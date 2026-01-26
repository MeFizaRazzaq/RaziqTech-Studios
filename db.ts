
import { User, UserRole, EmployeeProfile, Project, Inquiry } from './types';

const STORAGE_KEY = 'raziqtech_db';

interface DB {
  users: User[];
  profiles: EmployeeProfile[];
  projects: Project[];
  inquiries: Inquiry[];
}

const initialDB: DB = {
  users: [
    { id: '1', email: 'admin@raziqtech.com', name: 'Alex Rivera', role: UserRole.ADMIN, avatar: 'https://picsum.photos/seed/admin/200' },
    { id: '2', email: 'jane@raziqtech.com', name: 'Jane Doe', role: UserRole.EMPLOYEE, avatar: 'https://picsum.photos/seed/jane/200' },
    { id: '3', email: 'sam@raziqtech.com', name: 'Sam Smith', role: UserRole.EMPLOYEE, avatar: 'https://picsum.photos/seed/sam/200' },
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
      image: 'https://picsum.photos/seed/jane/400',
      chatEnabled: true,
      projects: ['proj1']
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
      image: 'https://picsum.photos/seed/sam/400',
      chatEnabled: true,
      projects: ['proj2']
    }
  ],
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
      teamIds: ['2']
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
      teamIds: ['3']
    }
  ],
  inquiries: [
    {
      id: 'inq1',
      name: 'Sarah Jenkins',
      email: 'sarah@fintech-inc.com',
      projectType: 'Mobile Development',
      budget: '$50,000 - $100,000',
      message: 'Looking to build a neo-bank app for youth.',
      status: 'New',
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

  updateProfile: (profile: EmployeeProfile) => {
    const db = getDB();
    const idx = db.profiles.findIndex(p => p.id === profile.id);
    if (idx > -1) {
      db.profiles[idx] = profile;
      saveDB(db);
    }
  },

  addEmployee: (user: Omit<User, 'id'>, profile: Omit<EmployeeProfile, 'id' | 'userId'>) => {
    const db = getDB();
    const userId = Math.random().toString(36).substr(2, 9);
    const profileId = 'p' + Math.random().toString(36).substr(2, 9);
    
    const newUser: User = { ...user, id: userId };
    const newProfile: EmployeeProfile = { ...profile, id: profileId, userId };
    
    db.users.push(newUser);
    db.profiles.push(newProfile);
    saveDB(db);
    return { user: newUser, profile: newProfile };
  },

  deleteProject: (id: string) => {
    const db = getDB();
    db.projects = db.projects.filter(p => p.id !== id);
    saveDB(db);
  },

  addProject: (project: Omit<Project, 'id'>) => {
    const db = getDB();
    const newProject: Project = { ...project, id: 'proj' + Math.random().toString(36).substr(2, 9) };
    db.projects.push(newProject);
    saveDB(db);
    return newProject;
  }
};
