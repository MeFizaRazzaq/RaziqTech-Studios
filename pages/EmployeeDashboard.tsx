
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Briefcase, 
  MessageSquare, 
  Edit3, 
  CheckCircle, 
  Clock, 
  LogOut, 
  Rocket, 
  ShieldCheck,
  Save,
  ArrowRight,
  ChevronRight,
  Circle,
  CheckCircle2,
  Calendar,
  Send,
  Mail,
  Inbox,
  Eye,
  EyeOff,
  Users as UsersIcon,
  X,
  MessageCircle,
  ListTodo,
  AlertCircle,
  Terminal,
  Building2,
  Bell
} from 'lucide-react';
import { useAuth } from '../App';
import { MockDB } from '../db';
import { Project, Milestone, Inquiry, Message, UserRole, InternalMessage } from '../types';

type DashboardTab = 'profile' | 'projects' | 'tasks' | 'messages';

const EmployeeDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<DashboardTab>('profile');
  const [activeRelayType, setActiveRelayType] = useState<'hq' | 'staff'>('hq');
  
  const [profiles, setProfiles] = useState(MockDB.getProfiles());
  const [projects, setProjects] = useState(MockDB.getProjects());
  const [staffMessages, setStaffMessages] = useState(MockDB.getStaffRelay());
  const [directMessages, setDirectMessages] = useState(user ? MockDB.getDirectAdminRelay(user.id) : []);
  const [openChatProjectId, setOpenChatProjectId] = useState<string | null>(null);
  
  const profile = profiles.find(p => p.userId === user?.id);
  const myProjects = projects.filter(p => p.teamIds.includes(user?.id || ''));
  
  // Profile Form State
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ bio: profile?.bio || '', skills: profile?.skills.join(', ') || '' });
  const [justSubmitted, setJustSubmitted] = useState(false);

  // Relay Chat State
  const [relayInput, setRelayInput] = useState('');
  const relayEndRef = useRef<HTMLDivElement>(null);

  // Project Chat State
  const [projectChatInput, setProjectChatInput] = useState('');
  const projectChatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleUpdate = () => {
      setProjects(MockDB.getProjects());
      setProfiles(MockDB.getProfiles());
      setStaffMessages(MockDB.getStaffRelay());
      if (user) setDirectMessages(MockDB.getDirectAdminRelay(user.id));
    };
    window.addEventListener('db-update', handleUpdate);
    return () => window.removeEventListener('db-update', handleUpdate);
  }, [user]);

  useEffect(() => {
    if (relayEndRef.current) relayEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [staffMessages, directMessages, activeRelayType, activeTab]);

  useEffect(() => {
    if (projectChatEndRef.current) projectChatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [openChatProjectId, projects]);

  // Mark unread logic
  useEffect(() => {
    if (activeTab === 'messages' && user) {
      if (activeRelayType === 'staff') MockDB.markStaffMessagesAsRead(user.id);
      else MockDB.markDirectAdminMessagesAsRead(user.id, user.id);
    }
  }, [activeTab, activeRelayType, staffMessages, directMessages, user]);

  const unreadMessagesCount = (user ? [
    ...staffMessages.filter(m => !m.readBy.includes(user.id)),
    ...directMessages.filter(m => !m.readBy.includes(user.id))
  ].length : 0);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    MockDB.requestProfileUpdate(profile.id, { bio: formData.bio, skills: formData.skills.split(',').map(s => s.trim()).filter(s => s !== '') });
    setIsEditing(false);
    setJustSubmitted(true);
    setTimeout(() => setJustSubmitted(false), 5000);
  };

  const toggleMilestoneStatus = (projectId: string, milestoneId: string) => {
    const proj = projects.find(p => p.id === projectId);
    if (!proj || !proj.milestones) return;
    const updatedMilestones = proj.milestones.map(m => m.id === milestoneId ? { ...m, isCompleted: !m.isCompleted } : m);
    MockDB.updateProject(projectId, { milestones: updatedMilestones });
  };

  const handleSendProjectMessage = (projectId: string) => {
    if (!projectChatInput.trim() || !user) return;
    MockDB.addProjectChatMessage(projectId, { senderId: user.id, senderName: user.name, senderRole: user.role, content: projectChatInput.trim(), isVisibleToClient: true });
    setProjectChatInput('');
  };

  const handleSendRelayMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!relayInput.trim() || !user) return;
    if (activeRelayType === 'staff') {
      MockDB.addStaffMessage({ senderId: user.id, senderName: user.name, content: relayInput.trim() });
    } else {
      MockDB.addDirectAdminMessage(user.id, { senderId: user.id, senderName: user.name, content: relayInput.trim() });
    }
    setRelayInput('');
  };

  const ProfileView = () => (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="bg-white p-12 rounded-[3rem] border border-navy/5 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-ice/5 rounded-bl-full"></div>
        <div className="flex items-center justify-between mb-10 relative z-10">
          <h3 className="text-2xl font-black text-navy">Personal Dossier</h3>
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="flex items-center space-x-2 text-ice font-black hover:underline uppercase text-xs tracking-widest">
              <Edit3 className="w-4 h-4" /> <span>Edit Bio</span>
            </button>
          ) : (
            <div className="flex space-x-4">
              <button onClick={() => setIsEditing(false)} className="text-navy/40 font-black uppercase text-xs tracking-widest">Cancel</button>
              <button onClick={handleUpdateProfile} className="flex items-center space-x-2 text-green-600 font-black hover:underline uppercase text-xs tracking-widest">
                <Save className="w-4 h-4" /> <span>Request Approval</span>
              </button>
            </div>
          )}
        </div>
        {isEditing ? (
          <form className="space-y-8 relative z-10">
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-navy/40">Bio</label>
              <textarea value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} rows={6} className="w-full px-6 py-4 bg-neutral-offwhite border-2 border-transparent rounded-2xl focus:border-ice transition-soft font-bold" />
            </div>
          </form>
        ) : (
          <div className="space-y-10 relative z-10">
            <div className="flex items-center space-x-8">
              <img src={profile?.image} className="w-24 h-24 rounded-3xl object-cover border-4 border-neutral-offwhite shadow-lg" alt="" />
              <div>
                <h4 className="text-2xl font-black text-navy">{profile?.fullName}</h4>
                <p className="text-ice font-black uppercase tracking-widest text-[10px]">{profile?.roleTitle}</p>
              </div>
            </div>
            <p className="text-navy/70 leading-relaxed font-medium">{profile?.bio}</p>
          </div>
        )}
      </div>
    </div>
  );

  const TasksView = () => {
    const allMilestones = myProjects.flatMap(p => (p.milestones || []).map(m => ({ ...m, projectTitle: p.title, projectId: p.id })));
    const sortedMilestones = [...allMilestones].sort((a, b) => new Date(a.deadline || '').getTime() - new Date(b.deadline || '').getTime());
    
    return (
      <div className="space-y-10 animate-in slide-in-from-bottom-8 duration-500">
        <div className="grid grid-cols-1 gap-6">
          {sortedMilestones.length === 0 ? (
            <div className="bg-white p-20 rounded-[3rem] text-center border-2 border-dashed border-navy/5">
              <ListTodo className="w-16 h-16 mx-auto mb-6 text-navy/10" />
              <p className="font-black text-navy/20 uppercase tracking-widest">No Technical Tasks Queued</p>
            </div>
          ) : (
            sortedMilestones.map(m => {
              const isUrgent = m.deadline && !m.isCompleted && (new Date(m.deadline).getTime() - Date.now() < 259200000);
              return (
                <div key={m.id} className={`bg-white p-8 rounded-[2.5rem] border border-navy/5 shadow-xl flex items-center justify-between group transition-soft hover-lift ${isUrgent ? 'border-l-8 border-l-red-500' : ''}`}>
                  <div className="flex items-center space-x-8">
                    <button onClick={() => toggleMilestoneStatus(m.projectId, m.id)} className={`transition-soft ${m.isCompleted ? 'text-green-500' : 'text-navy/10 hover:text-navy/30'}`}>
                      {m.isCompleted ? <CheckCircle2 className="w-10 h-10" /> : <Circle className="w-10 h-10" />}
                    </button>
                    <div>
                      <div className="flex items-center space-x-3 mb-1">
                        <span className="text-[10px] font-black text-ice uppercase tracking-widest">{m.projectTitle}</span>
                        {isUrgent && <span className="flex items-center text-[8px] font-black text-red-500 uppercase tracking-widest animate-pulse"><AlertCircle className="w-3 h-3 mr-1" /> Imminent Deadline</span>}
                      </div>
                      <h4 className={`text-xl font-black ${m.isCompleted ? 'text-navy/20 line-through' : 'text-navy'}`}>{m.title}</h4>
                      <p className="text-xs font-bold text-navy/40 mt-1 flex items-center">
                        <Calendar className="w-3 h-3 mr-1.5" /> Due: {new Date(m.deadline || '').toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${m.isCompleted ? 'bg-green-100 text-green-700' : 'bg-neutral-offwhite text-navy/40'}`}>
                      {m.isCompleted ? 'Verified' : 'Active'}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  };

  const MessagesView = () => {
    const currentMessages = activeRelayType === 'hq' ? directMessages : staffMessages;
    return (
      <div className="h-[calc(100vh-280px)] bg-white rounded-[3rem] border border-navy/5 shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-500">
        <div className="flex border-b border-navy/5 bg-neutral-offwhite/30">
          <button onClick={() => setActiveRelayType('hq')} className={`flex-1 p-6 flex items-center justify-center space-x-3 font-black text-xs uppercase tracking-widest transition-soft ${activeRelayType === 'hq' ? 'bg-white text-navy border-t-4 border-ice' : 'text-navy/30 hover:bg-white/50'}`}>
            <Building2 className="w-4 h-4" /> <span>Direct HQ Command</span>
          </button>
          <button onClick={() => setActiveRelayType('staff')} className={`flex-1 p-6 flex items-center justify-center space-x-3 font-black text-xs uppercase tracking-widest transition-soft ${activeRelayType === 'staff' ? 'bg-white text-navy border-t-4 border-ice' : 'text-navy/30 hover:bg-white/50'}`}>
            <UsersIcon className="w-4 h-4" /> <span>Engineering Floor</span>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-12 space-y-6 bg-neutral-offwhite/10">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center mb-10 opacity-30">
              <div className="inline-block px-4 py-1.5 bg-navy text-white text-[9px] font-black uppercase rounded-full">Secure {activeRelayType === 'hq' ? 'P2P' : 'Staff'} Buffer</div>
            </div>
            {currentMessages.length === 0 ? (
              <div className="text-center py-20 opacity-20">
                <Terminal className="w-16 h-16 mx-auto mb-4" />
                <p className="font-black text-sm uppercase tracking-[0.2em]">Silence on the wire</p>
              </div>
            ) : (
              currentMessages.map(msg => (
                <div key={msg.id} className={`flex flex-col ${msg.senderId === user?.id ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[85%] p-6 rounded-2xl shadow-sm ${msg.senderId === user?.id ? 'bg-navy text-white rounded-tr-none' : 'bg-white border border-navy/5 text-navy rounded-tl-none'}`}>
                    <div className="flex items-center justify-between mb-2 space-x-8">
                      <p className={`text-[9px] font-black uppercase tracking-widest ${msg.senderId === user?.id ? 'text-ice' : 'text-navy/30'}`}>{msg.senderName}</p>
                      <p className={`text-[8px] font-black uppercase ${msg.senderId === user?.id ? 'text-white/20' : 'text-navy/20'}`}>{new Date(msg.timestamp).toLocaleTimeString()}</p>
                    </div>
                    <p className="text-sm font-semibold leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))
            )}
            <div ref={relayEndRef} />
          </div>
        </div>

        <form onSubmit={handleSendRelayMessage} className="p-8 bg-white border-t border-navy/5">
          <div className="max-w-2xl mx-auto relative">
            <input 
              type="text" placeholder={`Transmit to ${activeRelayType === 'hq' ? 'Command Admin' : 'All Staff'}...`} 
              value={relayInput} onChange={(e) => setRelayInput(e.target.value)}
              className="w-full pl-6 pr-16 py-4 bg-neutral-offwhite border-2 border-transparent rounded-2xl focus:border-ice transition-soft font-bold text-sm"
            />
            <button disabled={!relayInput.trim()} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-ice hover:text-ice-dark transition-soft disabled:opacity-20"><Send className="w-6 h-6" /></button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-neutral-offwhite">
      <div className="w-72 bg-navy border-r border-white/5 flex flex-col fixed inset-y-0 z-50">
        <div className="p-10">
          <Link to="/" className="flex items-center space-x-3 mb-16">
            <div className="p-2 bg-ice rounded-xl shadow-lg shadow-ice/20"><Rocket className="w-6 h-6 text-white" /></div>
            <span className="text-2xl font-black text-white tracking-tighter">RaziqTech</span>
          </Link>
          <nav className="space-y-2">
            <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl font-bold text-sm transition-soft ${activeTab === 'profile' ? 'bg-white/10 text-white border-l-4 border-ice' : 'text-neutral-coolgray hover:text-white'}`}><User className="w-5 h-5" /> <span>Workspace</span></button>
            <button onClick={() => setActiveTab('projects')} className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl font-bold text-sm transition-soft ${activeTab === 'projects' ? 'bg-white/10 text-white border-l-4 border-ice' : 'text-neutral-coolgray hover:text-white'}`}><Briefcase className="w-5 h-5" /> <span>Missions</span></button>
            <button onClick={() => setActiveTab('tasks')} className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl font-bold text-sm transition-soft ${activeTab === 'tasks' ? 'bg-white/10 text-white border-l-4 border-ice' : 'text-neutral-coolgray hover:text-white'}`}><ListTodo className="w-5 h-5" /> <span>Task Queue</span></button>
            <button onClick={() => setActiveTab('messages')} className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-bold text-sm transition-soft ${activeTab === 'messages' ? 'bg-white/10 text-white border-l-4 border-ice' : 'text-neutral-coolgray hover:text-white'}`}>
              <div className="flex items-center space-x-4"><MessageSquare className="w-5 h-5" /> <span>Internal Relay</span></div>
              {unreadMessagesCount > 0 && <span className="bg-red-500 text-white text-[8px] font-black px-2 py-1 rounded-full animate-bounce">{unreadMessagesCount}</span>}
            </button>
          </nav>
        </div>
        <div className="mt-auto p-8 bg-navy-dark border-t border-white/5">
          <div className="flex items-center space-x-4 mb-8">
            <img src={profile?.image} className="w-10 h-10 rounded-xl object-cover border border-white/10" alt="" />
            <div className="overflow-hidden"><p className="text-white text-xs font-black truncate">{user?.name}</p></div>
          </div>
          <button onClick={logout} className="w-full flex items-center justify-center space-x-3 py-4 bg-white/5 text-white/60 rounded-2xl hover:text-red-400 border border-white/5 font-black text-sm"><LogOut className="w-5 h-5" /> <span>Offline</span></button>
        </div>
      </div>

      <div className="ml-72 flex-1 p-16">
        <div className="flex items-center justify-between mb-16">
          <div>
            <h1 className="text-4xl font-black text-navy tracking-tight uppercase">
              {activeTab === 'profile' && 'Engineer Console'}
              {activeTab === 'projects' && 'Operation Manifest'}
              {activeTab === 'tasks' && 'Mission Milestones'}
              {activeTab === 'messages' && 'Secure Internal Relay'}
            </h1>
            <p className="text-navy/50 font-bold">Authenticated L2 Node: {user?.name}</p>
          </div>
        </div>

        {activeTab === 'profile' && <ProfileView />}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 gap-12 pb-24 animate-in slide-in-from-right-8 duration-500">
            {myProjects.map(proj => (
              <div key={proj.id} className="bg-white rounded-[3rem] border border-navy/5 overflow-hidden shadow-xl">
                <div className="p-10 bg-navy text-white flex items-center justify-between">
                  <div><h3 className="text-3xl font-black tracking-tight">{proj.title}</h3><p className="text-ice text-xs font-black uppercase tracking-widest mt-1">{proj.category} Domain</p></div>
                  <div className="flex items-center space-x-8">
                    <button onClick={() => setOpenChatProjectId(proj.id)} className="flex items-center space-x-3 px-6 py-3 bg-ice text-white rounded-2xl font-black text-xs uppercase shadow-xl hover:bg-ice-dark transition-soft"><MessageCircle className="w-4 h-4" /> <span>Sync Client</span></button>
                    <div className="text-right"><div className="text-4xl font-black text-ice">{proj.progress}%</div></div>
                  </div>
                </div>
                <div className="p-10"><p className="text-navy/60 font-medium leading-relaxed">{proj.description}</p></div>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'tasks' && <TasksView />}
        {activeTab === 'messages' && <MessagesView />}

        {openChatProjectId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-navy/20 backdrop-blur-md">
            <div className="bg-white w-full max-w-4xl h-[80vh] rounded-[3rem] shadow-2xl border border-navy/5 relative flex flex-col overflow-hidden">
              <button onClick={() => setOpenChatProjectId(null)} className="absolute top-8 right-8 p-3 bg-neutral-offwhite rounded-2xl hover:bg-navy hover:text-white transition-soft z-20"><X className="w-6 h-6" /></button>
              <div className="p-10 border-b border-navy/5 bg-white relative z-10 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-navy text-ice rounded-2xl"><MessageCircle className="w-6 h-6" /></div>
                  <h2 className="text-2xl font-black text-navy tracking-tight">{projects.find(p => p.id === openChatProjectId)?.title} Client Relay</h2>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-12 space-y-6 bg-neutral-offwhite/10">
                {projects.find(p => p.id === openChatProjectId)?.chatMessages.map(msg => (
                  <div key={msg.id} className={`flex flex-col ${msg.senderId === user?.id ? 'items-end' : 'items-start'}`}>
                    <div className={`max-w-[80%] p-6 rounded-2xl shadow-sm ${msg.senderId === user?.id ? 'bg-navy text-white rounded-tr-none' : 'bg-white border border-navy/5 text-navy rounded-tl-none'}`}>
                      <p className="text-[9px] font-black uppercase tracking-widest opacity-50 mb-2">{msg.senderName}</p>
                      <p className="text-sm font-semibold">{msg.content}</p>
                    </div>
                  </div>
                ))}
                <div ref={projectChatEndRef} />
              </div>
              <div className="p-8 bg-white border-t border-navy/5">
                <div className="relative">
                  <input type="text" placeholder="Sync with client..." value={projectChatInput} onChange={(e) => setProjectChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendProjectMessage(openChatProjectId)} className="w-full px-6 py-4 bg-neutral-offwhite border-2 border-transparent rounded-2xl focus:border-ice transition-soft font-bold text-sm" />
                  <button onClick={() => handleSendProjectMessage(openChatProjectId)} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-ice hover:text-ice-dark transition-soft"><Send className="w-6 h-6" /></button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
