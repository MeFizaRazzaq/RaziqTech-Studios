
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Code, Zap, Smartphone, Layers } from 'lucide-react';
import { MockDB } from '../db';

const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Web' | 'Mobile' | 'AI'>('All');
  const projects = MockDB.getProjects();
  const filteredProjects = activeFilter === 'All' ? projects : projects.filter(p => p.category === activeFilter);
  const profiles = MockDB.getProfiles();

  return (
    <div className="pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h1 className="text-5xl lg:text-7xl font-black text-navy mb-10 tracking-tighter">Case Portfolio</h1>
          <p className="text-xl text-navy/60 max-w-2xl mx-auto mb-16 font-medium">A selection of technical success stories across our core disciplines.</p>
          
          <div className="flex justify-center flex-wrap gap-4">
            {['All', 'Web', 'Mobile', 'AI'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter as any)}
                className={`px-8 py-3 rounded-2xl font-black transition-soft text-sm uppercase tracking-widest ${
                  activeFilter === filter 
                    ? 'bg-navy text-white shadow-2xl' 
                    : 'bg-white text-navy/50 border-2 border-navy/5 hover:border-ice hover:text-ice'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-24">
          {filteredProjects.map((proj) => {
            const teamMembers = profiles.filter(p => proj.teamIds.includes(p.userId));
            return (
              <div key={proj.id} className="bg-white rounded-[3rem] border border-navy/5 overflow-hidden flex flex-col lg:flex-row hover-lift transition-soft card-shadow">
                <div className="lg:w-1/2 relative min-h-[400px]">
                  <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover" />
                  <div className="absolute top-10 left-10 px-5 py-2 bg-navy text-white rounded-xl text-xs font-black uppercase tracking-[0.2em]">
                    {proj.category} Logic
                  </div>
                </div>
                
                <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center">
                  <h2 className="text-4xl font-black text-navy mb-8 tracking-tight">{proj.title}</h2>
                  
                  <div className="space-y-8 mb-12">
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-widest text-ice mb-3">Project Objective</h4>
                      <p className="text-navy/60 font-medium leading-relaxed">{proj.problem}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-widest text-ice mb-3">Technical Outcome</h4>
                      <p className="text-navy font-black text-lg leading-relaxed">{proj.outcome}</p>
                    </div>
                  </div>

                  <div className="pt-10 border-t border-navy/5 flex flex-col sm:flex-row items-center justify-between gap-8">
                    <div className="flex -space-x-4">
                      {teamMembers.map((member) => (
                        <Link key={member.id} to={`/team/${member.username}`} title={member.fullName}>
                          <img 
                            src={member.image} 
                            alt={member.fullName} 
                            className="w-14 h-14 rounded-full border-4 border-white object-cover hover:-translate-y-2 transition-soft" 
                          />
                        </Link>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-2">
                      {proj.techStack.slice(0, 3).map((tech, i) => (
                        <span key={i} className="px-4 py-2 bg-neutral-offwhite text-navy/70 text-[11px] font-black rounded-xl uppercase tracking-wider border border-navy/5">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <button className="flex items-center text-navy font-black hover:text-ice transition-soft text-lg group">
                      Full Detail <ArrowUpRight className="ml-2 w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-soft" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
