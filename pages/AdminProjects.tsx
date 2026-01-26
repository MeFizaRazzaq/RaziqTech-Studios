
import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { Plus, Search, Layers, Calendar, ExternalLink, Trash2 } from 'lucide-react';
import { MockDB } from '../db';

const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState(MockDB.getProjects());

  const deleteProj = (id: string) => {
    if(confirm('Delete this case study?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  return (
    <div className="pl-64 min-h-screen bg-slate-50">
      <AdminSidebar />
      <div className="p-10">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Portfolio Management</h1>
            <p className="text-slate-500">Manage public-facing case studies and project success stories.</p>
          </div>
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 flex items-center hover:bg-indigo-700">
            <Plus className="mr-2 w-5 h-5" />
            Add Project
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((proj) => (
            <div key={proj.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all flex flex-col">
              <div className="h-48 relative">
                <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur rounded-lg text-[10px] font-black uppercase tracking-widest text-indigo-600">
                  {proj.category}
                </div>
              </div>
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-slate-900 leading-tight">{proj.title}</h3>
                  <button onClick={() => deleteProj(proj.id)} className="text-slate-400 hover:text-red-500 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-slate-500 text-sm mb-6 line-clamp-3">{proj.description}</p>
                <div className="flex flex-wrap gap-1 mb-6">
                  {proj.techStack.map((tech, i) => (
                    <span key={i} className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                <span className="text-xs font-bold text-slate-400 flex items-center">
                  <Layers className="w-3 h-3 mr-1" />
                  {proj.teamIds.length} Members
                </span>
                <button className="text-indigo-600 text-xs font-bold hover:underline flex items-center">
                  Edit Details <ExternalLink className="ml-1 w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
          
          <button className="border-2 border-dashed border-slate-300 rounded-3xl flex flex-col items-center justify-center p-10 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-all">
              <Plus className="w-6 h-6" />
            </div>
            <p className="font-bold text-slate-600 group-hover:text-indigo-700">Add New Case Study</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProjects;
