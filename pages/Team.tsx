
import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, FileText, UserCircle, ArrowRight } from 'lucide-react';
import { MockDB } from '../db';

const Team: React.FC = () => {
  const profiles = MockDB.getProfiles();

  return (
    <div className="pt-32 pb-32 bg-neutral-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-24">
          <h1 className="text-5xl lg:text-5xl font-black text-navy mb-8 tracking-tighter">The Engineering Cohort</h1>
          <p className="text-xl text-navy/60 font-medium leading-relaxed">
            A specialized assembly of senior engineers, architects, and AI researchers dedicated to shipping world-class infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {profiles.map((profile) => (
            <div key={profile.id} className="bg-white rounded-[2.5rem] border border-navy/5 overflow-hidden hover-lift transition-soft card-shadow group">
              <div className="h-72 overflow-hidden relative">
                <img 
                  src={profile.image} 
                  alt={profile.fullName} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-soft duration-700" 
                />
                <div className="absolute top-6 right-6 bg-navy/90 backdrop-blur px-4 py-1.5 rounded-xl text-[10px] font-black text-ice uppercase tracking-[0.2em] shadow-xl">
                  {profile.roleTitle}
                </div>
              </div>
              <div className="p-10">
                <h3 className="text-3xl font-black text-navy mb-3 tracking-tight">{profile.fullName}</h3>
                <p className="text-navy/60 text-sm mb-8 font-medium line-clamp-2 leading-relaxed">{profile.bio}</p>
                
                <div className="flex flex-wrap gap-2 mb-10">
                  {profile.skills.slice(0, 3).map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-ice/10 text-ice text-[10px] font-black uppercase tracking-widest rounded-lg">
                      {skill}
                    </span>
                  ))}
                  {profile.skills.length > 3 && (
                    <span className="text-navy/30 text-[10px] font-black uppercase pt-1.5">+{profile.skills.length - 3}</span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Link 
                    to={`/team/${profile.username}`} 
                    className="flex items-center justify-center space-x-2 px-4 py-4 bg-ice text-white rounded-2xl text-xs font-black hover:bg-ice-dark transition-soft shadow-lg shadow-ice/20"
                  >
                    <UserCircle className="w-4 h-4" />
                    <span>View Profile</span>
                  </Link>
                  <a 
                    href={profile.portfolioUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 px-4 py-4 bg-navy text-white rounded-2xl text-xs font-black hover:bg-navy-light transition-soft shadow-lg"
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
