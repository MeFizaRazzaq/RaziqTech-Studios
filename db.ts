
import { User, UserRole, EmployeeProfile, Project, Inquiry, ProfileUpdateEntry, Message, ProjectChatMessage, InternalMessage } from './types';

const STORAGE_KEY = 'raziqtech_db_v3';

interface DB {
  users: User[];
  profiles: EmployeeProfile[];
  pendingUpdates: ProfileUpdateEntry[];
  projects: Project[];
  inquiries: Inquiry[];
  staffRelay: InternalMessage[]; // Shared group chat for engineers + admin
  directAdminRelays: Record<string, InternalMessage[]>; // Key: userId (engineer), Value: private messages with admin
}

const initialDB: DB = {
  users: [
    { id: '1', email: 'admin@raziqtech.com', name: 'Hamza Asif Baig', role: UserRole.ADMIN, avatar: 'https://picsum.photos/seed/admin/200', createdAt: new Date().toISOString() },
    { id: '2', email: 'jane@raziqtech.com', name: 'Hamza Asif Baig', role: UserRole.EMPLOYEE, avatar: 'https://picsum.photos/seed/jane/200', createdAt: new Date().toISOString() },
    { id: '3', email: 'sam@raziqtech.com', name: 'Sam Smith', role: UserRole.EMPLOYEE, avatar: 'https://picsum.photos/seed/sam/200', createdAt: new Date().toISOString() },
    { id: '4', email: 'client@enterprise.com', name: 'John Client', role: UserRole.CLIENT, avatar: 'https://picsum.photos/seed/client/200', createdAt: new Date().toISOString() },
  ],
  
  profiles: [
    {
      id: 'E-1',
      userId: '1',
      username: 'hamza-asif',
      fullName: 'Hamza Asif Baig',
      roleTitle: 'Software Engineer',
      bio: 'Pioneer in neural network optimization and computer vision.',
      skills: ['Full-Stack', 'Flutter', 'Computer Vision', 'Rest APIs'],
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
      title: 'Clever catch- Intelligent surveillance system',
      category: 'Web',
      description: 'Built a real-time AI-powered surveillance system for retail theft prevention using YOLOv8 and a custom suspicion scoring algorithm.  −  Developed a desktop admin app (Electron + React) for live CCTV monitoring, alerts, and rolebased access.  −  Set up a React Native mobile app (login page) to prepare for real-time alert notifications to store employees.  −  Integrated PostgreSQL + Flask APIs for secure user management, event logging, and low-latency  video streaming (<300 ms).',
      problem: 'Retailers lacked insights into customer satisfaction in physical stores.',
      solution: 'We deployed an edge-computing AI solution using localized sensors.',
      outcome: 'Reduced customer dissatisfaction by 40% through real-time staff alerts.',
      techStack: ['React.js', 'Python', 'Tailwind', 'PostgreSQL', 'Electron', 'React Native', 'YOLOv8', 'Flask'], // React Native was missing before:
      imageUrl: 'https://picsum.photos/seed/tech1/800/600',
      teamIds: ['2'],
      progress: 100,
      status: 'COMPLETED',
      clientChatEnabled: false,
      chatMessages: [
        { id: 'm1', senderId: '2', senderName: 'Jane Doe', senderRole: UserRole.EMPLOYEE, content: 'Initial edge compute sensors deployed.', timestamp: new Date(Date.now() - 1000000).toISOString(), isVisibleToClient: true }
      ]
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
      status: 'COMPLETED',
      clientChatEnabled: true,
      chatMessages: [
        { id: 'm2', senderId: '3', senderName: 'Sam Smith', senderRole: UserRole.EMPLOYEE, content: 'Solidity contracts audited.', timestamp: new Date(Date.now() - 500000).toISOString(), isVisibleToClient: true }
      ],
      milestones: [
        { id: 'ms1', title: 'Beta Sandbox API Release', isCompleted: false, deadline: new Date(Date.now() + 172800000).toISOString(), assignedEngineerId: '3' },
        { id: 'ms2', title: 'Security Audit v1.0', isCompleted: false, deadline: new Date(Date.now() + 432000000).toISOString(), assignedEngineerId: '2' }
      ]
    }
  ],
  inquiries: [],
  staffRelay: [
    { id: 'sr1', senderId: '1', senderName: 'Alex Rivera', content: 'Welcome to the engineering floor. Use this channel for public dev sync.', timestamp: new Date(Date.now() - 86400000).toISOString(), readBy: ['1', '2', '3'] }
  ],
  directAdminRelays: {
    '2': [
      { id: 'da1', senderId: '1', senderName: 'Alex Rivera', content: 'Jane, check the EchoVision neural weights again.', timestamp: new Date(Date.now() - 3600000).toISOString(), readBy: ['1'] }
    ]
  }
};

// Static DB in memory - localStorage disabled
let staticDB: DB = { ...initialDB };

const getDB = (): DB => {
  // localStorage is disabled - returning static in-memory DB
  // const stored = localStorage.getItem(STORAGE_KEY);
  // return stored ? JSON.parse(stored) : initialDB;
  return staticDB;
};

const saveDB = (db: DB) => {
  // localStorage is disabled - changes not persisted
  // localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  staticDB = db;
};

export const MockDB = {
  getUsers: () => getDB().users,
  getProfiles: () => getDB().profiles,
  getProjects: () => getDB().projects,
  getInquiries: () => getDB().inquiries,
  getPendingUpdates: () => getDB().pendingUpdates,
  getStaffRelay: () => getDB().staffRelay,
  getDirectAdminRelay: (userId: string) => getDB().directAdminRelays[userId] || [],

  // Internal Messaging Methods
  addStaffMessage: (msg: Omit<InternalMessage, 'id' | 'timestamp' | 'readBy'>) => {
    const db = getDB();
    const newMsg: InternalMessage = {
      ...msg,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      readBy: [msg.senderId]
    };
    db.staffRelay.push(newMsg);
    saveDB(db);
    window.dispatchEvent(new CustomEvent('db-update'));
  },

  addDirectAdminMessage: (engineerId: string, msg: Omit<InternalMessage, 'id' | 'timestamp' | 'readBy'>) => {
    const db = getDB();
    if (!db.directAdminRelays[engineerId]) db.directAdminRelays[engineerId] = [];
    
    const newMsg: InternalMessage = {
      ...msg,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      readBy: [msg.senderId]
    };
    db.directAdminRelays[engineerId].push(newMsg);
    saveDB(db);
    window.dispatchEvent(new CustomEvent('db-update'));
  },

  markStaffMessagesAsRead: (userId: string) => {
    const db = getDB();
    db.staffRelay = db.staffRelay.map(m => {
      if (!m.readBy.includes(userId)) return { ...m, readBy: [...m.readBy, userId] };
      return m;
    });
    saveDB(db);
  },

  markDirectAdminMessagesAsRead: (engineerId: string, userId: string) => {
    const db = getDB();
    if (!db.directAdminRelays[engineerId]) return;
    db.directAdminRelays[engineerId] = db.directAdminRelays[engineerId].map(m => {
      if (!m.readBy.includes(userId)) return { ...m, readBy: [...m.readBy, userId] };
      return m;
    });
    saveDB(db);
  },

  // Project CRUD
  addProject: (proj: Omit<Project, 'id' | 'chatMessages'>) => {
    const db = getDB();
    const newProj: Project = { ...proj, id: 'proj' + Math.random().toString(36).substr(2, 9), chatMessages: [] };
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
      window.dispatchEvent(new CustomEvent('db-update'));
    }
  },

  // Added deleteProject method to fix error in AdminProjects.tsx
  deleteProject: (id: string) => {
    const db = getDB();
    db.projects = db.projects.filter(p => p.id !== id);
    saveDB(db);
    window.dispatchEvent(new CustomEvent('db-update'));
  },

  addProjectChatMessage: (projectId: string, msg: Omit<ProjectChatMessage, 'id' | 'timestamp'>) => {
    const db = getDB();
    const idx = db.projects.findIndex(p => p.id === projectId);
    if (idx === -1) return;

    const newMsg: ProjectChatMessage = { ...msg, id: Math.random().toString(36).substr(2, 9), timestamp: new Date().toISOString() };
    if (!db.projects[idx].chatMessages) db.projects[idx].chatMessages = [];
    db.projects[idx].chatMessages.push(newMsg);
    saveDB(db);
    window.dispatchEvent(new CustomEvent('db-update'));
  },

  toggleProjectClientChat: (projectId: string, enabled: boolean) => {
    const db = getDB();
    const idx = db.projects.findIndex(p => p.id === projectId);
    if (idx === -1) return;
    db.projects[idx].clientChatEnabled = enabled;
    saveDB(db);
    window.dispatchEvent(new CustomEvent('db-update'));
  },

  // Other Existing Methods (Stripped for brevity but assumed functional)
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
    const profile = db.profiles.find(p => p.id === profileId);
    if (!profile) return;
    Object.assign(profile, updates);
    const user = db.users.find(u => u.id === profile.userId);
    if (user) Object.assign(user, userUpdates);
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

  requestProfileUpdate: (employeeId: string, changes: Partial<EmployeeProfile>) => {
    const db = getDB();
    db.pendingUpdates.push({ id: Math.random().toString(36).substr(2, 9), employeeId, changes, createdAt: new Date().toISOString() });
    const profile = db.profiles.find(p => p.id === employeeId);
    if (profile) profile.status = 'PENDING_APPROVAL';
    saveDB(db);
  },

  approveProfileUpdate: (updateId: string) => {
    const db = getDB();
    const updateIdx = db.pendingUpdates.findIndex(u => u.id === updateId);
    if (updateIdx === -1) return;
    const update = db.pendingUpdates[updateIdx];
    const profile = db.profiles.find(p => p.id === update.employeeId);
    if (profile) { Object.assign(profile, update.changes); profile.status = 'APPROVED'; }
    db.pendingUpdates.splice(updateIdx, 1);
    saveDB(db);
  },

  rejectProfileUpdate: (updateId: string) => {
    const db = getDB();
    const update = db.pendingUpdates.find(u => u.id === updateId);
    if (update) {
      const profile = db.profiles.find(p => p.id === update.employeeId);
      if (profile) profile.status = 'APPROVED';
      db.pendingUpdates = db.pendingUpdates.filter(u => u.id !== updateId);
      saveDB(db);
    }
  },

  addInquiry: (inq: any) => {
    const db = getDB();
    db.inquiries.push({ ...inq, id: Math.random().toString(36).substr(2, 9), status: 'New', createdAt: new Date().toISOString(), thread: [] });
    saveDB(db);
  },

  updateInquiryStatus: (id: string, status: any) => {
    const db = getDB();
    const inq = db.inquiries.find(i => i.id === id);
    if (inq) inq.status = status;
    saveDB(db);
  },

  addReplyToInquiry: (inquiryId: string, msg: any) => {
    const db = getDB();
    const inq = db.inquiries.find(i => i.id === inquiryId);
    if (inq) {
      inq.thread.push({ ...msg, id: Math.random().toString(36).substr(2, 9), timestamp: new Date().toISOString() });
      inq.status = 'Replied';
      saveDB(db);
      window.dispatchEvent(new CustomEvent('db-update'));
    }
  },

  signupClient: (name: string, email: string) => {
    const db = getDB();
    const newUser: User = { id: Math.random().toString(36).substr(2, 9), email, name, role: UserRole.CLIENT, avatar: 'https://picsum.photos/seed/client/200', createdAt: new Date().toISOString() };
    db.users.push(newUser);
    saveDB(db);
    return newUser;
  }
};
