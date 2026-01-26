
import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { 
  Plus, 
  Search, 
  Layers, 
  ExternalLink, 
  Trash2, 
  X, 
  Save, 
  Briefcase, 
  TrendingUp, 
  UserPlus, 
  CheckCircle2, 
  Circle,
  Flag,
  Calendar,
  User as UserIcon,
  Edit3
} from 'lucide-react';
import { MockDB } from '../db';
import { Project, EmployeeProfile, Milestone } from '../types';

const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState(MockDB.getProjects());
  const [profiles, setProfiles] = useState(MockDB.getProfiles());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Milestone Form State
  const [isMilestoneFormOpen, setIsMilestoneFormOpen] = useState(false);
  const [editingMilestoneId, setEditingMilestoneId] = useState<string | null>(null);
  const [milestoneFormData, setMilestoneFormData] = useState({
    title: '',
    deadline: '',
    assignedEngineerId: ''
  });

  // Project Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Web' as 'Web' | 'Mobile' | 'AI',
    description: '',
    problem: '',
    solution: '',
    outcome: '',
    techStack: '',
    imageUrl: '',
    progress: 0,
    status: 'IN_DEVELOPMENT' as any,
    teamIds: [] as string[],
    milestones: [] as Milestone[]
  });

  const openModal = (proj?: Project) => {
    if (proj) {
      setEditingProject(proj);
      setFormData({
        title: proj.title,
        category: proj.category,
        description: proj.description,
        problem: proj.problem,
        solution: proj.solution,
        outcome: proj.outcome,
        techStack: proj.techStack.join(', '),
        imageUrl: proj.imageUrl,
        progress: proj.progress,
        status: proj.status,
        teamIds: proj.teamIds || [],
        milestones: proj.milestones || []
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        category: 'Web',
        description: '',
        problem: '',
        solution: '',
        outcome: '',
        techStack: '',
        imageUrl: 'https://picsum.photos/seed/project/800/600',
        progress: 0,
        status: 'IN_PLANNING',
        teamIds: [],
        milestones: []
      });
    }
    setIsModalOpen(true);
    setIsMilestoneFormOpen(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const techArray = formData.techStack.split(',').map(s => s.trim()).filter(s => s !== '');

    // Calculate progress based on milestones if they exist
    let calculatedProgress = formData.progress;
    if (formData.milestones.length > 0) {
      const completed = formData.milestones.filter(m => m.isCompleted).length;
      calculatedProgress = Math.round((completed / formData.milestones.length) * 100);
    }

    const projectData = {
      title: formData.title,
      category: formData.category,
      description: formData.description,
      problem: formData.problem,
      solution: formData.solution,
      outcome: formData.outcome,
      techStack: techArray,
      imageUrl: formData.imageUrl,
      progress: calculatedProgress,
      status: formData.status,
      teamIds: formData.teamIds,
      milestones: formData.milestones
    };

    if (editingProject) {
      MockDB.updateProject(editingProject.id, projectData);
    } else {
      MockDB.addProject(projectData);
    }

    setProjects(MockDB.getProjects());
    setIsModalOpen(false);
  };

  const deleteProj = (id: string) => {
    if (confirm('Permanently decommission this case study?')) {
      MockDB.deleteProject(id);
      setProjects(MockDB.getProjects());
    }
  };

  const toggleEngineer = (userId: string) => {
    setFormData(prev => ({
      ...prev,
      teamIds: prev.teamIds.includes(userId) 
        ? prev.teamIds.filter(id => id !== userId)
        : [...prev.teamIds, userId]
    }));
  };

  // Milestone Actions
  const openMilestoneForm = (milestone?: Milestone) => {
    if (milestone) {
      setEditingMilestoneId(milestone.id);
      setMilestoneFormData({
        title: milestone.title,
        deadline: milestone.deadline || '',
        assignedEngineerId: milestone.assignedEngineerId || ''
      });
    } else {
      setEditingMilestoneId(null);
      setMilestoneFormData({
        title: '',
        deadline: '',
        assignedEngineerId: formData.teamIds[0] || ''
      });
    }
    setIsMilestoneFormOpen(true);
  };

  const saveMilestone = () => {
    if (!milestoneFormData.title) return;

    if (editingMilestoneId) {
      setFormData(prev => ({
        ...prev,
        milestones: prev.milestones.map(m => 
          m.id === editingMilestoneId 
            ? { ...m, ...milestoneFormData } 
            : m
        )
      }));
    } else {
      const newMilestone: Milestone = {
        id: Math.random().toString(36).substr(2, 9),
        title: milestoneFormData.title,
        isCompleted: false,
        deadline: milestoneFormData.deadline,
        assignedEngineerId: milestoneFormData.assignedEngineerId
      };
      setFormData(prev => ({
        ...prev,
        milestones: [...prev.milestones, newMilestone]
      }));
    }
    setIsMilestoneFormOpen(false);
  };

  const toggleMilestone = (id: string) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.map(m => 
        m.id === id ? { ...m, isCompleted: !m.isCompleted } : m
      )
    }));
  };

  const removeMilestone = (id: string) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.filter(m => m.id !== id)
    }));
  };

  return (
    <div className="pl-72 min-h-screen bg-neutral-offwhite">
      <AdminSidebar />
      <div className="p-16">
        <div className="flex items-center justify-between mb-16">
          <div>
            <h1 className="text-4xl font-black text-navy tracking-tight">Portfolio Management</h1>
            <p className="text-navy/50 font-bold">Public catalog of engineering excellence and technical success.</p>
          </div>
          <button 
            onClick={() => openModal()}
            className="px-8 py-4 bg-ice text-white rounded-2xl font-black shadow-xl shadow-ice/20 flex items-center hover:bg-ice-dark transition-soft hover-lift"
          >
            <Plus className="mr-3 w-5 h-5" />
            Publish New Case Study
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {projects.map((proj) => (
            <div key={proj.id} className="bg-white rounded-[3rem] border border-navy/5 overflow-hidden shadow-2xl hover-lift transition-soft group flex flex-col">
              <div className="h-64 relative overflow-hidden">
                <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover group-hover:scale-110 transition-soft duration-700" />
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-navy/90 backdrop-blur rounded-xl text-[10px] font-black uppercase tracking-widest text-ice shadow-xl">
                  {proj.category}
                </div>
                <div className="absolute bottom-6 right-6 px-4 py-1.5 bg-ice text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl">
                  {proj.progress}% Complete
                </div>
              </div>
              <div className="p-10 flex-grow">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-black text-navy leading-tight">{proj.title}</h3>
                  <button onClick={() => deleteProj(proj.id)} className="p-2 text-navy/20 hover:text-red-500 transition-soft">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-navy/60 text-sm mb-8 line-clamp-2 font-medium leading-relaxed">{proj.description}</p>
                <div className="flex flex-wrap gap-2 mb-10">
                  {proj.techStack.slice(0, 3).map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-neutral-offwhite text-navy/40 text-[9px] font-black uppercase tracking-widest rounded-lg border border-navy/5">
                      {tech}
                    </span>
                  ))}
                  {proj.techStack.length > 3 && <span className="text-[9px] font-black text-navy/20 pt-1.5">+{proj.techStack.length - 3} MORE</span>}
                </div>
              </div>
              <div className="p-8 border-t border-navy/5 flex items-center justify-between bg-neutral-offwhite/30">
                <span className="text-[10px] font-black text-navy/40 uppercase tracking-widest flex items-center">
                  <Layers className="w-4 h-4 mr-2" />
                  {proj.teamIds?.length || 0} Leads Assigned
                </span>
                <button 
                  onClick={() => openModal(proj)}
                  className="text-ice text-xs font-black hover:underline uppercase tracking-widest flex items-center"
                >
                  Configure <ExternalLink className="ml-2 w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          
          <button 
            onClick={() => openModal()}
            className="border-4 border-dashed border-navy/5 rounded-[3rem] flex flex-col items-center justify-center p-12 hover:border-ice/30 hover:bg-ice/5 transition-soft group"
          >
            <div className="w-20 h-20 bg-neutral-offwhite rounded-[2rem] flex items-center justify-center mb-6 group-hover:bg-ice group-hover:text-white transition-soft shadow-sm group-hover:shadow-xl group-hover:shadow-ice/20">
              <Plus className="w-8 h-8" />
            </div>
            <p className="text-lg font-black text-navy/40 group-hover:text-ice transition-soft">Initiate Case Study</p>
          </button>
        </div>
      </div>

      {/* Case Study Configuration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-navy/20 backdrop-blur-md">
          <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl border border-navy/5 relative p-12">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-10 right-10 p-3 bg-neutral-offwhite rounded-2xl hover:bg-navy hover:text-white transition-soft"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center space-x-4 mb-12">
              <div className="p-3 bg-navy text-ice rounded-2xl">
                <Briefcase className="w-8 h-8" />
              </div>
              <h2 className="text-4xl font-black text-navy tracking-tight">
                {editingProject ? 'Configure Project Ecosystem' : 'Initiate New Success Story'}
              </h2>
            </div>

            <form onSubmit={handleSave} className="space-y-12">
              {/* Basic Details Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-navy/40">Project Title</label>
                  <input 
                    required
                    type="text" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-6 py-4 bg-neutral-offwhite border-2 border-transparent rounded-2xl focus:outline-none focus:border-ice focus:bg-white transition-soft font-bold"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-navy/40">Technology Domain</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                    className="w-full px-6 py-4 bg-neutral-offwhite border-2 border-transparent rounded-2xl focus:outline-none focus:border-ice focus:bg-white transition-soft font-bold appearance-none"
                  >
                    <option value="Web">Web Engineering</option>
                    <option value="Mobile">Mobile Ecosystems</option>
                    <option value="AI">AI / Machine Learning</option>
                  </select>
                </div>
              </div>

              {/* Engineer Assignment Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-navy/40">Assign Engineering Leads</label>
                  <span className="text-[10px] font-black text-ice uppercase tracking-widest">{formData.teamIds.length} Assigned</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {profiles.map((profile) => {
                    const isSelected = formData.teamIds.includes(profile.userId);
                    return (
                      <button
                        key={profile.id}
                        type="button"
                        onClick={() => toggleEngineer(profile.userId)}
                        className={`p-4 rounded-2xl border-2 flex items-center space-x-3 transition-soft text-left ${
                          isSelected 
                            ? 'border-ice bg-ice/5 shadow-lg shadow-ice/5' 
                            : 'border-navy/5 bg-neutral-offwhite hover:border-navy/20'
                        }`}
                      >
                        <img src={profile.image} className="w-8 h-8 rounded-lg object-cover" alt="" />
                        <div className="overflow-hidden">
                          <p className={`text-[10px] font-black truncate ${isSelected ? 'text-ice' : 'text-navy'}`}>{profile.fullName}</p>
                          <p className="text-[8px] font-bold text-navy/40 truncate">{profile.roleTitle}</p>
                        </div>
                        {isSelected && <UserPlus className="w-3 h-3 text-ice shrink-0 ml-auto" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Milestone Management Section (Enhanced) */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-navy/40">Project Milestones (Optional)</label>
                  {!isMilestoneFormOpen && (
                    <button 
                      type="button" 
                      onClick={() => openMilestoneForm()}
                      className="px-4 py-2 bg-ice text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-ice-dark transition-soft flex items-center"
                    >
                      <Plus className="w-3 h-3 mr-1" /> Add Milestone
                    </button>
                  )}
                </div>

                {isMilestoneFormOpen && (
                  <div className="p-8 bg-neutral-offwhite rounded-[2rem] border-2 border-ice/20 space-y-6 animate-in slide-in-from-top-4 duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-black text-navy uppercase tracking-widest">
                        {editingMilestoneId ? 'Modify Milestone' : 'Define New Milestone'}
                      </h4>
                      <button type="button" onClick={() => setIsMilestoneFormOpen(false)}><X className="w-4 h-4 text-navy/40" /></button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase text-navy/40">Milestone Goal</label>
                        <input 
                          type="text" 
                          value={milestoneFormData.title}
                          onChange={(e) => setMilestoneFormData({...milestoneFormData, title: e.target.value})}
                          placeholder="e.g. Prototype Deployment"
                          className="w-full px-5 py-3 bg-white border border-navy/10 rounded-xl focus:outline-none focus:border-ice font-bold text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase text-navy/40">Target Deadline</label>
                        <input 
                          type="date" 
                          value={milestoneFormData.deadline}
                          onChange={(e) => setMilestoneFormData({...milestoneFormData, deadline: e.target.value})}
                          className="w-full px-5 py-3 bg-white border border-navy/10 rounded-xl focus:outline-none focus:border-ice font-bold text-sm"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase text-navy/40">Assign Strategic Lead</label>
                      <select 
                        value={milestoneFormData.assignedEngineerId}
                        onChange={(e) => setMilestoneFormData({...milestoneFormData, assignedEngineerId: e.target.value})}
                        className="w-full px-5 py-3 bg-white border border-navy/10 rounded-xl focus:outline-none focus:border-ice font-bold text-sm appearance-none"
                      >
                        <option value="">Select an engineer...</option>
                        {profiles.filter(p => formData.teamIds.includes(p.userId)).map(p => (
                          <option key={p.userId} value={p.userId}>{p.fullName} - {p.roleTitle}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button 
                        type="button" 
                        onClick={() => setIsMilestoneFormOpen(false)}
                        className="px-6 py-3 text-navy/40 font-black uppercase text-[10px] tracking-widest"
                      >
                        Discard
                      </button>
                      <button 
                        type="button" 
                        onClick={saveMilestone}
                        className="px-8 py-3 bg-navy text-white rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl"
                      >
                        {editingMilestoneId ? 'Commit Update' : 'Initialize Milestone'}
                      </button>
                    </div>
                  </div>
                )}

                {formData.milestones.length === 0 && !isMilestoneFormOpen ? (
                  <div className="p-8 border-2 border-dashed border-navy/5 rounded-3xl text-center">
                    <p className="text-[10px] font-black text-navy/20 uppercase tracking-[0.2em]">No milestones defined. Progress will be manual.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {formData.milestones.map((milestone) => {
                      const engineer = profiles.find(p => p.userId === milestone.assignedEngineerId);
                      return (
                        <div key={milestone.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-neutral-offwhite rounded-[2rem] group border border-transparent hover:border-navy/5 transition-soft">
                          <div className="flex items-center space-x-5 mb-4 sm:mb-0">
                            <button 
                              type="button" 
                              onClick={() => toggleMilestone(milestone.id)}
                              className={`transition-soft shrink-0 ${milestone.isCompleted ? 'text-green-500' : 'text-navy/20 hover:text-navy/40'}`}
                            >
                              {milestone.isCompleted ? <CheckCircle2 className="w-8 h-8" /> : <Circle className="w-8 h-8" />}
                            </button>
                            <div>
                              <p className={`font-black text-lg ${milestone.isCompleted ? 'text-navy/30 line-through' : 'text-navy'}`}>
                                {milestone.title}
                              </p>
                              <div className="flex items-center space-x-4 mt-1">
                                {milestone.deadline && (
                                  <span className="flex items-center text-[9px] font-black text-navy/40 uppercase tracking-widest">
                                    <Calendar className="w-3 h-3 mr-1.5" /> Due {new Date(milestone.deadline).toLocaleDateString()}
                                  </span>
                                )}
                                {engineer && (
                                  <span className="flex items-center text-[9px] font-black text-ice uppercase tracking-widest">
                                    <UserIcon className="w-3 h-3 mr-1.5" /> Lead: {engineer.fullName}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-soft">
                            <button 
                              type="button" 
                              onClick={() => openMilestoneForm(milestone)}
                              className="p-3 bg-white text-navy/40 hover:text-ice rounded-xl shadow-sm border border-navy/5 transition-soft"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button 
                              type="button" 
                              onClick={() => removeMilestone(milestone.id)}
                              className="p-3 bg-white text-navy/40 hover:text-red-500 rounded-xl shadow-sm border border-navy/5 transition-soft"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-navy/40">Problem Statement</label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.problem}
                    onChange={(e) => setFormData({...formData, problem: e.target.value})}
                    className="w-full px-6 py-4 bg-neutral-offwhite border-2 border-transparent rounded-2xl focus:outline-none focus:border-ice focus:bg-white transition-soft font-bold text-sm"
                  ></textarea>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-navy/40">Technical Solution</label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.solution}
                    onChange={(e) => setFormData({...formData, solution: e.target.value})}
                    className="w-full px-6 py-4 bg-neutral-offwhite border-2 border-transparent rounded-2xl focus:outline-none focus:border-ice focus:bg-white transition-soft font-bold text-sm"
                  ></textarea>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-navy/40">Project Outcome</label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.outcome}
                    onChange={(e) => setFormData({...formData, outcome: e.target.value})}
                    className="w-full px-6 py-4 bg-neutral-offwhite border-2 border-transparent rounded-2xl focus:outline-none focus:border-ice focus:bg-white transition-soft font-bold text-sm"
                  ></textarea>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-navy/40">Tech Stack (CSV)</label>
                    <input 
                      required
                      type="text" 
                      value={formData.techStack}
                      placeholder="React, AWS, Node.js"
                      onChange={(e) => setFormData({...formData, techStack: e.target.value})}
                      className="w-full px-6 py-4 bg-neutral-offwhite border-2 border-transparent rounded-2xl focus:outline-none focus:border-ice focus:bg-white transition-soft font-bold"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-navy/40">System Status</label>
                    <select 
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                      className="w-full px-6 py-4 bg-neutral-offwhite border-2 border-transparent rounded-2xl focus:outline-none focus:border-ice focus:bg-white transition-soft font-bold appearance-none"
                    >
                      <option value="IN_PLANNING">In Planning</option>
                      <option value="IN_DEVELOPMENT">Development Alpha</option>
                      <option value="STAGING">Staging Beta</option>
                      <option value="COMPLETED">Production Deployed</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-navy/40">
                      {formData.milestones.length > 0 ? 'Project Velocity (Auto-calculated)' : 'Completion Velocity (%)'}
                    </label>
                    {formData.milestones.length > 0 ? (
                      <div className="w-full px-6 py-4 bg-neutral-offwhite border-2 border-transparent rounded-2xl font-black text-ice flex items-center">
                        <Flag className="w-4 h-4 mr-3" />
                        {Math.round((formData.milestones.filter(m => m.isCompleted).length / formData.milestones.length) * 100)}% Complete
                      </div>
                    ) : (
                      <input 
                        required
                        type="range"
                        min="0"
                        max="100"
                        value={formData.progress}
                        onChange={(e) => setFormData({...formData, progress: Number(e.target.value)})}
                        className="w-full h-12 accent-ice cursor-pointer"
                      />
                    )}
                  </div>
              </div>

              <div className="pt-10 border-t border-navy/5">
                <button 
                  type="submit" 
                  className="w-full py-6 bg-navy text-white rounded-2xl font-black text-xl shadow-2xl hover:bg-navy-light transition-soft flex items-center justify-center space-x-4"
                >
                  <TrendingUp className="w-6 h-6 text-ice" />
                  <span>{editingProject ? 'Commit Project Ecosystem Updates' : 'Publish to Public Portfolio'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
