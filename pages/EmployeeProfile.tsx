
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ExternalLink, FileText, MessageCircle, Github, Linkedin, Briefcase, Zap } from 'lucide-react';
import { MockDB } from '../db';

const EmployeeProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const profile = MockDB.getProfiles().find(p => p.username === username);
  const projects = MockDB.getProjects().filter(p => profile?.projects.includes(p.id));

  if (!profile) return <Navigate to="/team" />;

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Info */}
          <div className="lg:w-1/3">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm sticky top-24">
              <div className="w-48 h-48 rounded-2xl overflow-hidden mx-auto mb-6 shadow-xl">
                <img src={profile.image} alt={profile.fullName} className="w-full h-full object-cover" />
              </div>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900">{profile.fullName}</h1>
                <p className="text-indigo-600 font-semibold">{profile.roleTitle}</p>
              </div>

              <div className="space-y-4">
                <a href={profile.resumeUrl} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors group">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-slate-500 group-hover:text-indigo-600" />
                    <span className="font-semibold text-slate-700">Download CV</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </a>
                <a href={profile.portfolioUrl} target="_blank" className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors group">
                  <div className="flex items-center space-x-3">
                    <Github className="w-5 h-5 text-slate-500 group-hover:text-indigo-600" />
                    <span className="font-semibold text-slate-700">GitHub Profile</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </a>
                {profile.chatEnabled && (
                  <button className="w-full flex items-center justify-center space-x-2 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
                    <MessageCircle className="w-5 h-5" />
                    <span>Direct Message</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-2/3 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <UserCircle className="w-6 h-6 mr-2 text-indigo-600" />
                Biography
              </h2>
              <div className="bg-white p-8 rounded-3xl border border-slate-100 leading-relaxed text-slate-600">
                {profile.bio}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <Zap className="w-6 h-6 mr-2 text-indigo-600" />
                Technical Skills
              </h2>
              <div className="flex flex-wrap gap-3">
                {profile.skills.map((skill, i) => (
                  <div key={i} className="px-6 py-3 bg-white border border-slate-100 rounded-2xl font-bold text-slate-700 shadow-sm hover:border-indigo-200 transition-colors">
                    {skill}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <Briefcase className="w-6 h-6 mr-2 text-indigo-600" />
                Key Project Highlights
              </h2>
              <div className="space-y-6">
                {projects.map(proj => (
                  <Link key={proj.id} to="/portfolio" className="block p-6 bg-white rounded-3xl border border-slate-100 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xl font-bold text-slate-900 mb-1">{proj.title}</h4>
                        <p className="text-slate-500 text-sm">{proj.category} Solution</p>
                      </div>
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold">Featured</span>
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

const UserCircle: React.FC<{className?: string}> = ({className}) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

export default EmployeeProfilePage;
