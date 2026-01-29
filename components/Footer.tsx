
import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Mail } from 'lucide-react';
import logoUrl from '../src/Logo/Logo.svg';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy text-neutral-coolgray pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-3 mb-8">
              <img src={logoUrl} alt="PentaCode" className="w-8 h-8 object-contain" />
              <span className="text-3xl font-black text-white tracking-tighter">PentaCode</span>
            </div>
            <p className="text-neutral-coolgray leading-relaxed mb-8 font-medium">
              Architecting high-performance digital ecosystems for global enterprises. Web, Mobile, and AI solutions driven by precision.
            </p>
            <div className="flex space-x-5">
              <Twitter className="w-6 h-6 hover:text-ice cursor-pointer transition-soft" />
              <Linkedin className="w-6 h-6 hover:text-ice cursor-pointer transition-soft" />
              <Github className="w-6 h-6 hover:text-ice cursor-pointer transition-soft" />
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-8">Specializations</h4>
            <ul className="space-y-4 font-medium">
              <li><Link to="/services" className="hover:text-ice transition-soft">Web Engineering</Link></li>
              <li><Link to="/services" className="hover:text-ice transition-soft">Mobile Development</Link></li>
              <li><Link to="/services" className="hover:text-ice transition-soft">AI & Machine Learning</Link></li>
              <li><Link to="/services" className="hover:text-ice transition-soft">Cloud Strategy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-8">Organization</h4>
            <ul className="space-y-4 font-medium">
              {/* <li><Link to="/team" className="hover:text-ice transition-soft">Our Team</Link></li> */}
              <li><Link to="/portfolio" className="hover:text-ice transition-soft">Projects</Link></li>
              <li><Link to="/contact" className="hover:text-ice transition-soft">Partnership</Link></li>
              {/* <li><Link to="/login" className="hover:text-ice transition-soft">Staff Portal</Link></li> */}
            </ul>
          </div>

          {/* <div>
            <h4 className="text-white font-bold text-lg mb-8">Newsletter</h4>
            <p className="text-neutral-coolgray text-sm mb-6 font-medium">Get the latest technical briefs from our engineering team.</p>
            <div className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Work email" 
                className="bg-navy-light border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-ice transition-soft"
              />
              <button className="bg-ice text-white rounded-xl px-5 py-3 font-bold hover:bg-ice-dark transition-soft">
                Subscribe
              </button>
            </div>
          </div> */}
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center text-sm font-semibold">
          <p>© 2026 PentaCode Limited Inc. Engineering Excellence Worldwide.</p>
          <div className="flex space-x-10 mt-6 md:mt-0">
            <span className="hover:text-white cursor-pointer transition-soft">Privacy</span>
            <span className="hover:text-white cursor-pointer transition-soft">Terms</span>
            <span className="hover:text-white cursor-pointer transition-soft">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
