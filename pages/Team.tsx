
import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, FileText, UserCircle } from 'lucide-react';
import { MockDB } from '../db';

const Team: React.FC = () => {
  const profiles = MockDB.getProfiles();

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Meet the Architects</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">A world-class team of engineers, designers, and innovators dedicated to excellence.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {profiles.map((profile) => (
            <div key={profile.id} className="bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-indigo-100 transition-all group">
              <div className="h-64 overflow-hidden relative">
                <img src={profile.image} alt={profile.fullName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-indigo-600 shadow-sm">
                  {profile.roleTitle}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{profile.fullName}</h3>
                <p className="text-slate-600 text-sm mb-6 line-clamp-2">{profile.bio}</p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {profile.skills.slice(0, 3).map((skill, i) => (
                    <span key={i} className="px-2 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider rounded">
                      {skill}
                    </span>
                  ))}
                  {profile.skills.length > 3 && (
                    <span className="text-slate-400 text-[10px] font-bold uppercase pt-1">+{profile.skills.length - 3} more</span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Link 
                    to={`/team/${profile.username}`} 
                    className="flex items-center justify-center space-x-2 px-4 py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all"
                  >
                    <UserCircle className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                  <a 
                    href={profile.portfolioUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 px-4 py-3 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:border-indigo-600 hover:text-indigo-600 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Portfolio</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
