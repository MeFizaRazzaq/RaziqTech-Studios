
import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { Plus, Search, Layers, ExternalLink, Trash2, X, Save, Briefcase, TrendingUp } from 'lucide-react';
import { MockDB } from '../db';
import { Project } from '../types';

const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState(MockDB.getProjects());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form State
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
    status: 'IN_DEVELOPMENT' as any
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
        status: proj.status
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
        status: 'IN_PLANNING'
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const techArray = formData.techStack.split(',').map(s => s.trim()).filter(s => s !== '');

    const projectData = {
      title: formData.title,
      category: formData.category,
      description: formData.description,
      problem: formData.problem,
      solution: formData.solution,
      outcome: formData.outcome,
      techStack: techArray,
      imageUrl: formData.imageUrl,
      progress: Number(formData.progress),
      status: formData.status,
      teamIds: editingProject?.teamIds || []
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
                  {proj.teamIds.length} Engineer Leads
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
                {editingProject ? 'Configure Case Study' : 'Initiate New Success Story'}
              </h2>
            </div>

            <form onSubmit={handleSave} className="space-y-10">
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

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-navy/40">Short Meta Description</label>
                <input 
                  required
                  type="text" 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-6 py-4 bg-neutral-offwhite border-2 border-transparent rounded-2xl focus:outline-none focus:border-ice focus:bg-white transition-soft font-bold"
                />
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
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-navy/40">Completion Velocity (%)</label>
                    <input 
                      required
                      type="range"
                      min="0"
                      max="100"
                      value={formData.progress}
                      onChange={(e) => setFormData({...formData, progress: Number(e.target.value)})}
                      className="w-full h-12 accent-ice cursor-pointer"
                    />
                  </div>
              </div>

              <div className="pt-10 border-t border-navy/5">
                <button 
                  type="submit" 
                  className="w-full py-6 bg-navy text-white rounded-2xl font-black text-xl shadow-2xl hover:bg-navy-light transition-soft flex items-center justify-center space-x-4"
                >
                  <TrendingUp className="w-6 h-6 text-ice" />
                  <span>{editingProject ? 'Commit Case Study Updates' : 'Publish to Public Portfolio'}</span>
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
