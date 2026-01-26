
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ExternalLink, FileText, MessageCircle, Github, Linkedin, Briefcase, Zap, User, ArrowLeft, Globe } from 'lucide-react';
import { MockDB } from '../db';

const EmployeeProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const profile = MockDB.getProfiles().find(p => p.username === username);
  const projects = MockDB.getProjects().filter(p => profile?.projects.includes(p.id));

  if (!profile) return <Navigate to="/team" />;

  return (
    <div className="pt-32 pb-32 bg-neutral-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/team" className="inline-flex items-center text-navy/40 hover:text-ice font-black text-xs uppercase tracking-widest mb-12 transition-soft group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-soft" />
          Back to Cohort
        </Link>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Sidebar Info */}
          <div className="lg:w-1/3 w-full sticky top-32">
            <div className="bg-white p-10 rounded-[3rem] border border-navy/5 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-ice/5 rounded-bl-full -z-0"></div>
              
              <div className="relative z-10">
                <div className="w-full aspect-square rounded-[2.5rem] overflow-hidden mb-10 shadow-2xl border-4 border-neutral-offwhite">
                  <img src={profile.image} alt={profile.fullName} className="w-full h-full object-cover" />
                </div>
                
                <div className="mb-10 text-center lg:text-left">
                  <h1 className="text-4xl font-black text-navy mb-2 tracking-tight">{profile.fullName}</h1>
                  <p className="text-ice font-black uppercase tracking-widest text-xs">{profile.roleTitle}</p>
                </div>

                <div className="space-y-4">
                  {profile.resumeUrl && (
                    <a href={profile.resumeUrl} className="flex items-center justify-between p-5 bg-neutral-offwhite rounded-2xl hover:bg-ice/10 hover:text-ice transition-soft group border border-transparent hover:border-ice/20">
                      <div className="flex items-center space-x-4">
                        <FileText className="w-5 h-5" />
                        <span className="font-black text-sm">Review Resume (PDF)</span>
                      </div>
                      <ExternalLink className="w-4 h-4 opacity-40" />
                    </a>
                  )}
                  {profile.portfolioUrl && (
                    <a href={profile.portfolioUrl} target="_blank" className="flex items-center justify-between p-5 bg-neutral-offwhite rounded-2xl hover:bg-navy/10 hover:text-navy transition-soft group border border-transparent hover:border-navy/20">
                      <div className="flex items-center space-x-4">
                        <Globe className="w-5 h-5" />
                        <span className="font-black text-sm">Portfolio Website</span>
                      </div>
                      <ExternalLink className="w-4 h-4 opacity-40" />
                    </a>
                  )}
                  {profile.githubUrl && (
                    <a href={profile.githubUrl} target="_blank" className="flex items-center justify-between p-5 bg-neutral-offwhite rounded-2xl hover:bg-navy/10 hover:text-navy transition-soft group border border-transparent hover:border-navy/20">
                      <div className="flex items-center space-x-4">
                        <Github className="w-5 h-5" />
                        <span className="font-black text-sm">GitHub Profile</span>
                      </div>
                      <ExternalLink className="w-4 h-4 opacity-40" />
                    </a>
                  )}
                  {profile.linkedinUrl && (
                    <a href={profile.linkedinUrl} target="_blank" className="flex items-center justify-between p-5 bg-neutral-offwhite rounded-2xl hover:bg-blue-500/10 hover:text-blue-600 transition-soft group border border-transparent hover:border-blue-500/20">
                      <div className="flex items-center space-x-4">
                        <Linkedin className="w-5 h-5" />
                        <span className="font-black text-sm">LinkedIn Profile</span>
                      </div>
                      <ExternalLink className="w-4 h-4 opacity-40" />
                    </a>
                  )}
                  
                  {profile.chatEnabled && (
                    <button className="w-full flex items-center justify-center space-x-3 py-6 bg-ice text-white rounded-2xl font-black shadow-xl shadow-ice/20 hover:bg-ice-dark transition-soft hover-lift mt-6">
                      <MessageCircle className="w-5 h-5" />
                      <span>Initiate Direct Chat</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-2/3 space-y-16">
            <section>
              <div className="flex items-center space-x-4 mb-8">
                <div className="p-3 bg-navy text-ice rounded-xl">
                  <User className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-black text-navy tracking-tight">Professional Dossier</h2>
              </div>
              <div className="bg-white p-12 rounded-[3rem] border border-navy/5 card-shadow leading-relaxed text-navy/70 text-lg font-medium">
                {profile.bio}
              </div>
            </section>

            <section>
              <div className="flex items-center space-x-4 mb-8">
                <div className="p-3 bg-navy text-ice rounded-xl">
                  <Zap className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-black text-navy tracking-tight">Core Competencies</h2>
              </div>
              <div className="flex flex-wrap gap-4">
                {profile.skills.map((skill, i) => (
                  <div key={i} className="px-8 py-4 bg-white border-2 border-navy/5 rounded-2xl font-black text-navy shadow-sm hover:border-ice hover:text-ice transition-soft cursor-default">
                    {skill}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center space-x-4 mb-8">
                <div className="p-3 bg-navy text-ice rounded-xl">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-black text-navy tracking-tight">Project Contributions</h2>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {projects.map(proj => (
                  <Link key={proj.id} to="/portfolio" className="group block p-8 bg-white rounded-[2.5rem] border border-navy/5 hover:border-ice transition-soft card-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden hidden sm:block">
                          <img src={proj.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-soft" />
                        </div>
                        <div>
                          <h4 className="text-2xl font-black text-navy mb-1 group-hover:text-ice transition-soft">{proj.title}</h4>
                          <p className="text-navy/40 text-xs font-black uppercase tracking-widest">{proj.category} Systems Engineering</p>
                        </div>
                      </div>
                      <div className="px-4 py-2 bg-ice/10 text-ice rounded-xl text-[10px] font-black uppercase tracking-widest border border-ice/20">
                        Lead Role
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfilePage;
