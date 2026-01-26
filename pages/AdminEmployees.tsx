
import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { Plus, Search, Edit2, Trash2, Shield, User as UserIcon, X, Save, Rocket } from 'lucide-react';
import { MockDB } from '../db';
import { EmployeeProfile, UserRole, User } from '../types';

const AdminEmployees: React.FC = () => {
  const [profiles, setProfiles] = useState(MockDB.getProfiles());
  const users = MockDB.getUsers();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<{ profile: EmployeeProfile, user: User } | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    roleTitle: '',
    bio: '',
    skills: '',
    image: '',
    portfolioUrl: '',
    resumeUrl: ''
  });

  const openModal = (emp?: { profile: EmployeeProfile, user: User }) => {
    if (emp) {
      setEditingEmployee(emp);
      setFormData({
        name: emp.user.name,
        email: emp.user.email,
        username: emp.profile.username,
        roleTitle: emp.profile.roleTitle,
        bio: emp.profile.bio,
        skills: emp.profile.skills.join(', '),
        image: emp.profile.image,
        portfolioUrl: emp.profile.portfolioUrl,
        resumeUrl: emp.profile.resumeUrl
      });
    } else {
      setEditingEmployee(null);
      setFormData({
        name: '',
        email: '',
        username: '',
        roleTitle: '',
        bio: '',
        skills: '',
        image: 'https://picsum.photos/seed/new/400',
        portfolioUrl: '',
        resumeUrl: '#'
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s !== '');

    if (editingEmployee) {
      MockDB.updateEmployee(
        editingEmployee.profile.id,
        {
          fullName: formData.name,
          username: formData.username,
          roleTitle: formData.roleTitle,
          bio: formData.bio,
          skills: skillsArray,
          image: formData.image,
          portfolioUrl: formData.portfolioUrl,
          resumeUrl: formData.resumeUrl
        },
        {
          name: formData.name,
          email: formData.email
        }
      );
    } else {
      MockDB.addEmployee(
        {
          name: formData.name,
          email: formData.email,
          role: UserRole.EMPLOYEE,
          avatar: formData.image
        },
        {
          username: formData.username,
          fullName: formData.name,
          roleTitle: formData.roleTitle,
          bio: formData.bio,
          skills: skillsArray,
          image: formData.image,
          portfolioUrl: formData.portfolioUrl,
          resumeUrl: formData.resumeUrl,
          chatEnabled: true,
          projects: []
        }
      );
    }

    setProfiles(MockDB.getProfiles());
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (confirm('Permanently remove this engineer from the manifest?')) {
      MockDB.deleteEmployee(id);
      setProfiles(MockDB.getProfiles());
    }
  };

  return (
    <div className="pl-72 min-h-screen bg-neutral-offwhite">
      <AdminSidebar />
      <div className="p-16">
        <div className="flex items-center justify-between mb-16">
          <div>
            <h1 className="text-4xl font-black text-navy tracking-tight">Engineer Manifest</h1>
            <p className="text-navy/50 font-bold">Registry of all active technical lead accounts.</p>
          </div>
          <button 
            onClick={() => openModal()}
            className="px-8 py-4 bg-ice text-white rounded-2xl font-black shadow-xl shadow-ice/20 flex items-center hover:bg-ice-dark transition-soft hover-lift"
          >
            <Plus className="mr-3 w-5 h-5" />
            Provision New Account
          </button>
        </div>

        <div className="bg-white rounded-[3rem] border border-navy/5 shadow-2xl overflow-hidden">
          <div className="p-8 border-b border-navy/5 flex items-center justify-between bg-neutral-offwhite/30">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy/30" />
              <input 
                type="text" 
                placeholder="Search registry by identifier..." 
                className="w-full pl-12 pr-6 py-3 bg-white border border-navy/10 rounded-xl focus:outline-none focus:border-ice transition-soft font-bold text-sm"
              />
            </div>
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-navy/5">
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-navy/40">Technical Lead</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-navy/40">Role & Stack</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-navy/40">Infrastucture</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-navy/40 text-right">Direct Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/5">
              {profiles.map((profile) => {
                const user = users.find(u => u.id === profile.userId)!;
                return (
                  <tr key={profile.id} className="hover:bg-neutral-offwhite/50 transition-soft group">
                    <td className="px-10 py-8">
                      <div className="flex items-center space-x-6">
                        <img src={profile.image} className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md" alt="" />
                        <div>
                          <p className="font-black text-navy text-lg">{profile.fullName}</p>
                          <p className="text-xs text-navy/40 font-bold">@{profile.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <p className="text-sm font-black text-navy mb-3">{profile.roleTitle}</p>
                      <div className="flex flex-wrap gap-2">
                        {profile.skills.slice(0, 3).map((s, idx) => (
                          <span key={idx} className="px-2 py-1 bg-ice/10 text-ice text-[9px] rounded-lg font-black uppercase tracking-widest">
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${profile.chatEnabled ? 'bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.5)]' : 'bg-navy/10'}`}></div>
                        <span className="text-xs font-black text-navy/60 uppercase tracking-widest">
                          {profile.chatEnabled ? 'Relay Active' : 'Offline'}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <div className="flex items-center justify-end space-x-3">
                        <button 
                          onClick={() => openModal({ profile, user })}
                          className="p-3 bg-neutral-offwhite text-navy rounded-xl hover:bg-navy hover:text-white transition-soft"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(profile.id)}
                          className="p-3 bg-neutral-offwhite text-navy rounded-xl hover:bg-red-500 hover:text-white transition-soft"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Provisioning Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-navy/20 backdrop-blur-md">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl border border-navy/5 relative p-12">
            <button 
              onClick={closeModal}
              className="absolute top-10 right-10 p-3 bg-neutral-offwhite rounded-2xl hover:bg-navy hover:text-white transition-soft"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center space-x-4 mb-12">
              <div className="p-3 bg-navy text-ice rounded-2xl">
                <Rocket className="w-8 h-8" />
              </div>
              <h2 className="text-4xl font-black text-navy tracking-tight">
                {editingEmployee ? 'Update Authorization' : 'New Engineer Onboarding'}
              </h2>
            </div>

            <form onSubmit={handleSave} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-navy/40">Full Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-6 py-4 bg-neutral-offwhite border-2 border-transparent rounded-2xl focus:outline-none focus:border-ice focus:bg-white transition-soft font-bold"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-navy/40">Business Email</label>
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-6 py-4 bg-neutral-offwhite border-2 border-transparent rounded-2xl focus:outline-none focus:border-ice focus:bg-white transition-soft font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-navy/40">System Username</label>
                  <input 
                    required
                    type="text" 
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    className="w-full px-6 py-4 bg-neutral-offwhite border-2 border-transparent rounded-2xl focus:outline-none focus:border-ice focus:bg-white transition-soft font-bold"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-navy/40">Role Designation</label>
                  <input 
                    required
                    type="text" 
                    value={formData.roleTitle}
                    placeholder="e.g. Lead Systems Architect"
                    onChange={(e) => setFormData({...formData, roleTitle: e.target.value})}
                    className="w-full px-6 py-4 bg-neutral-offwhite border-2 border-transparent rounded-2xl focus:outline-none focus:border-ice focus:bg-white transition-soft font-bold"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-navy/40">Professional Dossier (Bio)</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  className="w-full px-6 py-4 bg-neutral-offwhite border-2 border-transparent rounded-2xl focus:outline-none focus:border-ice focus:bg-white transition-soft font-bold"
                ></textarea>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-navy/40">Skillset (Comma Separated)</label>
                <input 
                  required
                  type="text" 
                  value={formData.skills}
                  placeholder="Next.js, Kubernetes, Rust"
                  onChange={(e) => setFormData({...formData, skills: e.target.value})}
                  className="w-full px-6 py-4 bg-neutral-offwhite border-2 border-transparent rounded-2xl focus:outline-none focus:border-ice focus:bg-white transition-soft font-bold"
                />
              </div>

              <div className="pt-10 border-t border-navy/5">
                <button 
                  type="submit" 
                  className="w-full py-6 bg-navy text-white rounded-2xl font-black text-xl shadow-2xl hover:bg-navy-light transition-soft flex items-center justify-center space-x-4"
                >
                  <Save className="w-6 h-6" />
                  <span>{editingEmployee ? 'Commit Authorization Updates' : 'Authorize New Engineer Account'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEmployees;
