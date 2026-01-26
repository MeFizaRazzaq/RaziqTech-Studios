
import React, { useState } from 'react';
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
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../App';
import { MockDB } from '../db';

const EmployeeDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const profile = MockDB.getProfiles().find(p => p.userId === user?.id);
  const projects = MockDB.getProjects().filter(p => profile?.projects.includes(p.id));
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    bio: profile?.bio || '',
    skills: profile?.skills.join(', ') || ''
  });
  const [justSubmitted, setJustSubmitted] = useState(false);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    
    MockDB.requestProfileUpdate(profile.id, {
      bio: formData.bio,
      skills: formData.skills.split(',').map(s => s.trim()).filter(s => s !== '')
    });
    
    setIsEditing(false);
    setJustSubmitted(true);
    setTimeout(() => setJustSubmitted(false), 5000);
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
              <User className="w-5 h-5 text-ice" />
              <span>My Profile</span>
            </button>
            <button className="w-full flex items-center space-x-4 px-6 py-4 text-neutral-coolgray hover:text-white transition-soft font-bold text-sm">
              <Briefcase className="w-5 h-5" />
              <span>Assigned Projects</span>
            </button>
            <button className="w-full flex items-center space-x-4 px-6 py-4 text-neutral-coolgray hover:text-white transition-soft font-bold text-sm">
              <MessageSquare className="w-5 h-5" />
              <span>Message Center</span>
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
            <h1 className="text-4xl font-black text-navy tracking-tight">Engineer Workspace</h1>
            <p className="text-navy/50 font-bold">Welcome back, {user?.name}</p>
          </div>
          {profile?.status === 'PENDING_APPROVAL' && (
            <div className="bg-amber-100 text-amber-700 px-6 py-3 rounded-2xl flex items-center space-x-3 border border-amber-200 animate-pulse">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-black uppercase tracking-widest">Changes Pending Admin Approval</span>
            </div>
          )}
          {justSubmitted && (
            <div className="bg-green-100 text-green-700 px-6 py-3 rounded-2xl flex items-center space-x-3 border border-green-200">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-black uppercase tracking-widest">Update Request Submitted</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Profile Card */}
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-white p-12 rounded-[3rem] border border-navy/5 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-ice/5 rounded-bl-full"></div>
              
              <div className="flex items-center justify-between mb-10 relative z-10">
                <h3 className="text-2xl font-black text-navy">Personal Dossier</h3>
                {!isEditing ? (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 text-ice font-black hover:underline uppercase text-xs tracking-widest"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit Bio</span>
                  </button>
                ) : (
                  <div className="flex space-x-4">
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="text-navy/40 font-black uppercase text-xs tracking-widest"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleUpdate}
                      className="flex items-center space-x-2 text-green-600 font-black hover:underline uppercase text-xs tracking-widest"
                    >
                      <Save className="w-4 h-4" />
                      <span>Request Approval</span>
                    </button>
                  </div>
                )}
              </div>

              {isEditing ? (
                <form className="space-y-8 relative z-10">
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-navy/40">Professional Bio</label>
                    <textarea 
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      rows={6}
                      className="w-full px-6 py-4 bg-neutral-offwhite border-2 border-transparent rounded-2xl focus:outline-none focus:border-ice focus:bg-white transition-soft font-bold"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-navy/40">Technical Skills (Comma separated)</label>
                    <input 
                      type="text"
                      value={formData.skills}
                      onChange={(e) => setFormData({...formData, skills: e.target.value})}
                      className="w-full px-6 py-4 bg-neutral-offwhite border-2 border-transparent rounded-2xl focus:outline-none focus:border-ice focus:bg-white transition-soft font-bold"
                    />
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
                  <div className="space-y-8">
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-navy/30 mb-4">Biography</p>
                      <p className="text-navy/70 leading-relaxed font-medium">{profile?.bio}</p>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-navy/30 mb-4">Skill Manifest</p>
                      <div className="flex flex-wrap gap-2">
                        {profile?.skills.map((s, i) => (
                          <span key={i} className="px-4 py-2 bg-neutral-offwhite text-navy font-bold text-xs rounded-xl border border-navy/5">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white p-12 rounded-[3rem] border border-navy/5 shadow-xl">
              <h3 className="text-2xl font-black text-navy mb-10">Active Missions</h3>
              <div className="space-y-6">
                {projects.map(proj => (
                  <div key={proj.id} className="p-8 bg-neutral-offwhite/50 border border-navy/5 rounded-[2rem] flex items-center justify-between group">
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 bg-navy text-ice rounded-2xl flex items-center justify-center font-black">
                        {proj.progress}%
                      </div>
                      <div>
                        <h4 className="text-xl font-black text-navy">{proj.title}</h4>
                        <p className="text-xs font-black text-navy/40 uppercase tracking-widest">{proj.status}</p>
                      </div>
                    </div>
                    <button className="p-3 bg-white text-navy rounded-xl border border-navy/5 hover:border-ice hover:text-ice transition-soft shadow-sm group-hover:translate-x-1">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats / Notification Column */}
          <div className="space-y-10">
             <div className="bg-navy p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="text-xl font-black mb-6">Internal Broadcast</h4>
                  <div className="space-y-6">
                    <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
                      <p className="text-ice text-[10px] font-black uppercase tracking-widest mb-2">Announcement</p>
                      <p className="text-sm font-medium text-white/70 leading-relaxed">Quarterly engineering review starts next Monday. Sync all repositories.</p>
                    </div>
                    <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
                      <p className="text-ice text-[10px] font-black uppercase tracking-widest mb-2">Infrastructure</p>
                      <p className="text-sm font-medium text-white/70 leading-relaxed">AWS Staging region migration complete. Update your .env configs.</p>
                    </div>
                  </div>
                </div>
                <ShieldCheck className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5" />
             </div>

             <div className="bg-white p-10 rounded-[3rem] border border-navy/5 shadow-xl">
                <h4 className="text-xl font-black text-navy mb-8">Personal Performance</h4>
                <div className="space-y-8 font-bold">
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs uppercase tracking-widest text-navy/40">
                      <span>Commit Velocity</span>
                      <span className="text-navy">High</span>
                    </div>
                    <div className="h-2 bg-neutral-offwhite rounded-full overflow-hidden">
                      <div className="h-full bg-ice w-[85%]"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs uppercase tracking-widest text-navy/40">
                      <span>Peer Review Score</span>
                      <span className="text-navy">4.9/5</span>
                    </div>
                    <div className="h-2 bg-neutral-offwhite rounded-full overflow-hidden">
                      <div className="h-full bg-navy w-[95%]"></div>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
