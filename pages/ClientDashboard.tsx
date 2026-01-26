
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  MessageCircle, 
  Settings, 
  LogOut, 
  Rocket, 
  Activity, 
  CheckCircle,
  FileText,
  Clock,
  ArrowRight,
  Send,
  Users as UsersIcon,
  MessageSquare,
  Circle,
  CheckCircle2,
  Calendar,
  X
} from 'lucide-react';
import { useAuth } from '../App';
import { MockDB } from '../db';
import { Project, Milestone } from '../types';

const ClientDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [projects, setProjects] = useState(MockDB.getProjects());
  const inquiries = MockDB.getInquiries().filter(i => i.clientId === user?.id || i.email === user?.email);
  
  const activeProjects = projects.filter(p => p.status !== 'COMPLETED');
  
  const [openChatProjectId, setOpenChatProjectId] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleUpdate = () => {
        setProjects(MockDB.getProjects());
    };
    window.addEventListener('db-update', handleUpdate);
    return () => window.removeEventListener('db-update', handleUpdate);
  }, []);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [openChatProjectId, projects]);

  const handleSendProjectMessage = (projectId: string) => {
    if (!chatInput.trim() || !user) return;

    MockDB.addProjectChatMessage(projectId, {
      senderId: user.id,
      senderName: user.name,
      senderRole: user.role,
      content: chatInput.trim(),
      isVisibleToClient: true
    });

    setChatInput('');
  };

  return (
    <div className="flex min-h-screen bg-neutral-offwhite">
      {/* Sidebar */}
      <div className="w-72 bg-navy border-r border-white/5 flex flex-col fixed inset-y-0">
        <div className="p-10">
          <Link to="/" className="flex items-center space-x-3 mb-16">
            <div className="p-2 bg-ice rounded-xl shadow-lg shadow-ice/20">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black text-white tracking-tighter">RaziqTech</span>
          </Link>
          <nav className="space-y-2">
            <button className="w-full flex items-center space-x-4 px-6 py-4 bg-white/10 text-white rounded-2xl font-bold text-sm border-l-4 border-ice">
              <Activity className="w-5 h-5 text-ice" />
              <span>Project Hub</span>
            </button>
            <button className="w-full flex items-center space-x-4 px-6 py-4 text-neutral-coolgray hover:text-white transition-soft font-bold text-sm">
              <MessageCircle className="w-5 h-5" />
              <span>Messages</span>
            </button>
            <button className="w-full flex items-center space-x-4 px-6 py-4 text-neutral-coolgray hover:text-white transition-soft font-bold text-sm">
              <FileText className="w-5 h-5" />
              <span>Invoices & Billing</span>
            </button>
            <button className="w-full flex items-center space-x-4 px-6 py-4 text-neutral-coolgray hover:text-white transition-soft font-bold text-sm">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </nav>
        </div>
        <div className="mt-auto p-8 border-t border-white/5 bg-navy-dark">
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center space-x-3 py-4 bg-white/5 text-white/60 rounded-2xl hover:bg-red-500/10 hover:text-red-400 transition-soft border border-white/5 font-black text-sm"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-72 flex-1 p-16">
        <div className="flex items-center justify-between mb-16">
          <div>
            <h1 className="text-4xl font-black text-navy tracking-tight">Client Headquarters</h1>
            <p className="text-navy/50 font-bold">Managing account for {user?.name}</p>
          </div>
          <Link to="/contact" className="bg-ice text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl shadow-ice/20 hover:bg-ice-dark transition-soft hover-lift">
            Propose New Project
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Active Projects Hub */}
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-white p-12 rounded-[3rem] border border-navy/5 shadow-xl overflow-hidden">
              <div className="flex items-center justify-between mb-12">
                <h3 className="text-2xl font-black text-navy">Execution Pipeline</h3>
                <span className="px-4 py-2 bg-navy text-ice rounded-xl text-[10px] font-black uppercase tracking-widest">
                  {activeProjects.length} Active Workstreams
                </span>
              </div>
              
              <div className="space-y-16">
                {activeProjects.map(proj => (
                  <div key={proj.id} className="space-y-8 group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div className="w-16 h-16 bg-neutral-offwhite rounded-2xl overflow-hidden">
                          <img src={proj.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-soft" alt="" />
                        </div>
                        <div>
                          <h4 className="text-xl font-black text-navy">{proj.title}</h4>
                          <p className="text-xs font-black text-navy/40 uppercase tracking-widest">{proj.category} Domain</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        {proj.clientChatEnabled && (
                          <button 
                            onClick={() => setOpenChatProjectId(proj.id)}
                            className="flex items-center space-x-2 px-4 py-2 bg-ice text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-ice/20 hover:bg-ice-dark transition-soft hover-lift"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>Conversation</span>
                          </button>
                        )}
                        <div className="text-right">
                          <p className="text-2xl font-black text-ice">{proj.progress}%</p>
                          <p className="text-[10px] font-black text-navy/30 uppercase tracking-[0.2em]">{proj.status}</p>
                        </div>
                      </div>
                    </div>
                    <div className="h-3 bg-neutral-offwhite rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-ice transition-all duration-1000 ease-out" 
                        style={{ width: `${proj.progress}%` }}
                      ></div>
                    </div>

                    {/* Milestones for Client */}
                    <div className="bg-neutral-offwhite/30 rounded-2xl p-6">
                        <h5 className="text-[9px] font-black text-navy/40 uppercase tracking-widest mb-4">Milestone Tracker</h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {proj.milestones?.map(m => (
                                <div key={m.id} className="flex items-center space-x-3 text-xs bg-white p-3 rounded-xl border border-navy/5 shadow-sm">
                                    {m.isCompleted ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Circle className="w-4 h-4 text-navy/10" />}
                                    <span className={`font-bold ${m.isCompleted ? 'text-navy/40' : 'text-navy'}`}>{m.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-12 rounded-[3rem] border border-navy/5 shadow-xl">
              <h3 className="text-2xl font-black text-navy mb-10">Inquiry History</h3>
              <div className="divide-y divide-navy/5">
                {inquiries.map(inq => (
                  <div key={inq.id} className="py-8 flex items-center justify-between">
                    <div>
                      <p className="text-lg font-black text-navy">{inq.projectType}</p>
                      <p className="text-sm text-navy/40 font-bold">Submitted on {new Date(inq.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                      inq.status === 'Converted' ? 'bg-green-100 text-green-700' : 'bg-neutral-offwhite text-navy/40'
                    }`}>
                      {inq.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Account Overview Sidebar */}
          <div className="space-y-10">
            <div className="bg-white p-10 rounded-[3rem] border border-navy/5 shadow-xl">
              <div className="flex items-center space-x-5 mb-10">
                <img src={user?.avatar} className="w-16 h-16 rounded-2xl object-cover border-4 border-neutral-offwhite shadow-sm" alt="" />
                <div>
                  <h4 className="font-black text-navy">{user?.name}</h4>
                  <p className="text-[10px] font-black text-ice uppercase tracking-widest">Verified Partner</p>
                </div>
              </div>
              <div className="space-y-6">
                <button className="w-full py-4 bg-neutral-offwhite hover:bg-navy/5 text-navy/60 hover:text-navy rounded-2xl transition-soft font-black text-xs uppercase tracking-widest border border-transparent hover:border-navy/5">
                  Update Profile
                </button>
                <button className="w-full py-4 bg-neutral-offwhite hover:bg-navy/5 text-navy/60 hover:text-navy rounded-2xl transition-soft font-black text-xs uppercase tracking-widest border border-transparent hover:border-navy/5">
                  Communication Preferences
                </button>
              </div>
            </div>

            <div className="bg-ice p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-xl font-black mb-4">Dedicated Liaison</h4>
                <p className="text-white/70 text-sm font-medium leading-relaxed mb-8">Your account manager Alex is available for any urgent strategic consultations.</p>
                <button className="w-full py-4 bg-navy text-white rounded-2xl font-black flex items-center justify-center hover:bg-navy-light transition-soft shadow-xl">
                  Message Alex
                  <ArrowRight className="ml-3 w-5 h-5" />
                </button>
              </div>
              <CheckCircle className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5" />
            </div>
          </div>
        </div>

        {/* Project Chat Modal for Client */}
        {openChatProjectId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-navy/20 backdrop-blur-md">
            <div className="bg-white w-full max-w-4xl h-[80vh] rounded-[3rem] shadow-2xl border border-navy/5 relative flex flex-col overflow-hidden">
              <button 
                onClick={() => setOpenChatProjectId(null)}
                className="absolute top-8 right-8 p-3 bg-neutral-offwhite rounded-2xl hover:bg-navy hover:text-white transition-soft z-20"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-10 border-b border-navy/5 bg-white relative z-10 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-ice text-white rounded-2xl shadow-lg shadow-ice/20">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-navy tracking-tight">
                      {projects.find(p => p.id === openChatProjectId)?.title} Relay
                    </h2>
                    <p className="text-xs font-bold text-navy/40 uppercase tracking-widest">Active Partner Engineering Sync</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-12 space-y-6 bg-neutral-offwhite/10">
                {projects.find(p => p.id === openChatProjectId)?.chatMessages?.filter(m => m.isVisibleToClient).length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-12 opacity-20">
                    <UsersIcon className="w-16 h-16 mb-4" />
                    <p className="font-black text-xl uppercase tracking-widest">Awaiting synchronization</p>
                  </div>
                ) : (
                  projects.find(p => p.id === openChatProjectId)?.chatMessages.filter(m => m.isVisibleToClient).map(msg => (
                    <div key={msg.id} className={`flex flex-col ${msg.senderId === user?.id ? 'items-end' : 'items-start'}`}>
                      <div className={`max-w-[80%] p-6 rounded-2xl shadow-sm ${msg.senderId === user?.id ? 'bg-navy text-white rounded-tr-none' : 'bg-white border border-navy/5 text-navy rounded-tl-none'}`}>
                        <div className="flex items-center justify-between mb-2 space-x-8">
                          <p className={`text-[9px] font-black uppercase tracking-widest ${msg.senderId === user?.id ? 'text-ice' : 'text-navy/30'}`}>
                            {msg.senderName} • {msg.senderRole}
                          </p>
                          <p className={`text-[8px] font-black uppercase ${msg.senderId === user?.id ? 'text-white/30' : 'text-navy/20'}`}>
                            {new Date(msg.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                        <p className="text-sm font-semibold leading-relaxed">{msg.content}</p>
                      </div>
                    </div>
                  ))
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="p-8 bg-white border-t border-navy/5">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Communicate with project leads..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendProjectMessage(openChatProjectId)}
                    className="w-full pl-6 pr-16 py-4 bg-neutral-offwhite border-2 border-transparent rounded-2xl focus:outline-none focus:border-ice focus:bg-white transition-soft font-bold text-sm"
                  />
                  <button 
                    onClick={() => handleSendProjectMessage(openChatProjectId)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-ice hover:text-ice-dark transition-soft"
                  >
                    <Send className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
