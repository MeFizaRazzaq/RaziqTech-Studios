import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, DollarSign, Tag } from 'lucide-react';
import { MockDB } from '../db';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = MockDB.getProjects().find(p => p.id === id);
  const profiles = MockDB.getProfiles();

  if (!project) {
    return (
      <div className="pt-32 pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black mb-4">Project not found</h2>
          <p className="mb-8 text-navy/60">The project you are looking for may have been removed.</p>
          <Link to="/portfolio" className="inline-block px-6 py-3 bg-navy text-white rounded-2xl font-bold">Back to Projects</Link>
        </div>
      </div>
    );
  }

  const teamMembers = profiles.filter(p => project.teamIds.includes(p.userId));

  return (
    <div className="pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Link to="/portfolio" className="inline-flex items-center text-navy font-black hover:text-ice transition-soft"><ArrowLeft className="mr-3 w-4 h-4" /> Back to Projects</Link>
        </div>

        {/* Image Banner (separate) */}
        <div className="mb-12">
          <div className="rounded-[2rem] overflow-hidden relative shadow-xl">
            <img src={project.imageUrl} alt={project.title} className="w-full h-[420px] object-cover" />
            <div className="absolute top-6 left-6 px-4 py-2 bg-navy text-white rounded-xl text-xs font-black uppercase tracking-[0.2em]">
              {project.category} Logic
            </div>
          </div>
        </div>

        {/* Details Card (separate) */}
        <div className="bg-white rounded-[3rem] border border-navy/5 overflow-hidden flex flex-col hover-lift transition-soft card-shadow">
          <div className="p-12 lg:p-20 flex flex-col">
            <h1 className="text-4xl font-black text-navy mb-6 tracking-tight">{project.title}</h1>

            <div className="space-y-6 mb-8">
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-ice mb-3">Project Objective</h4>
                <p className="text-navy/60 font-medium leading-relaxed">{project.problem}</p>
              </div>

              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-ice mb-3">Description</h4>
                <p className="text-navy/60 font-medium leading-relaxed">{project.description}</p>
              </div>

              {project.solution && (
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-ice mb-3">Solution</h4>
                  <p className="text-navy/60 font-medium leading-relaxed">{project.solution}</p>
                </div>
              )}

              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-ice mb-3">Outcome</h4>
                <p className="text-navy font-black text-lg leading-relaxed">{project.outcome}</p>
              </div>

              <div className="flex items-start space-x-6">
                <div className="text-[10px] font-black text-navy/40 uppercase tracking-widest flex items-center space-x-2">
                  <Tag className="w-4 h-4" />
                  <span>Tech Stack</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((t, i) => (
                    <span key={i} className="px-4 py-2 bg-neutral-offwhite text-navy/70 text-[11px] font-black rounded-xl uppercase tracking-wider border border-navy/5">{t}</span>
                  ))}
                </div>
              </div>

            </div>

            <div className="pt-6 border-t border-navy/5 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {teamMembers.map(m => (
                  <Link key={m.id} to={`/team/${m.username}`} title={m.fullName} className="flex items-center space-x-3">
                    <img src={m.image} alt={m.fullName} className="w-12 h-12 rounded-full object-cover border-4 border-white" />
                    <div className="hidden sm:block">
                      <p className="font-black text-navy">{m.fullName}</p>
                      <p className="text-xs text-navy/40">{m.roleTitle}</p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="flex items-center space-x-4 text-[12px] font-black text-navy/40 uppercase tracking-widest">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4" />
                  <span>{project.progress}% progress</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-2 rounded-xl ${project.status === 'COMPLETED' ? 'bg-ice text-white' : 'bg-neutral-offwhite text-navy/70'}`}>{project.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
