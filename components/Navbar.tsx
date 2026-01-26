
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket, ShieldCheck, LayoutDashboard, LogIn } from 'lucide-react';
import { useAuth } from '../App';
import { UserRole } from '../types';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const { user } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Team', path: '/team' },
    { name: 'Contact', path: '/contact' },
  ];

  const getDashboardPath = () => {
    if (!user) return '/login';
    if (user.role === UserRole.ADMIN) return '/admin';
    if (user.role === UserRole.EMPLOYEE) return '/employee-dashboard';
    return '/client-dashboard';
  };

  return (
    <nav className="fixed w-full z-50 glass border-b border-navy/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2.5 bg-navy rounded-xl group-hover:bg-ice transition-soft">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tight text-navy">RaziqTech</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-8 mr-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-semibold tracking-wide transition-soft hover:text-ice ${
                    pathname === link.path ? 'text-ice border-b-2 border-ice' : 'text-navy/70'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center space-x-4 border-l border-navy/10 pl-8">
              {user ? (
                <Link 
                  to={getDashboardPath()} 
                  className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-navy text-white text-xs font-black hover:bg-navy-light transition-soft shadow-lg hover-lift"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
              ) : (
                <Link 
                  to="/login" 
                  className="px-6 py-3 rounded-xl bg-ice text-white text-xs font-black uppercase tracking-widest hover:bg-ice-dark transition-soft shadow-xl shadow-ice/20 hover-lift"
                >
                  <span>Sign In</span>
                </Link>
              )}
              
              <Link to="/contact" className="px-6 py-3 rounded-xl bg-ice text-white text-xs font-black uppercase tracking-widest hover:bg-ice-dark transition-soft shadow-xl shadow-ice/20 hover-lift">
                Start a Project
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-navy hover:text-ice transition-soft"
            >
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-navy/5 py-8 px-6 space-y-6 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block text-xl font-black ${
                  pathname === link.path ? 'text-ice' : 'text-navy'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="pt-6 border-t border-navy/5 space-y-4">
            {user ? (
              <Link 
                to={getDashboardPath()} 
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center space-x-3 w-full py-4 bg-navy text-white rounded-2xl font-black shadow-lg"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Go to Dashboard</span>
              </Link>
            ) : (
              <Link 
                to="/login" 
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center space-x-3 w-full py-4 border-2 border-navy text-navy rounded-2xl font-black shadow-sm"
              >
                <LogIn className="w-5 h-5" />
                <span>Staff & Client Portal</span>
              </Link>
            )}
            <Link 
              to="/contact" 
              onClick={() => setIsOpen(false)}
              className="block w-full py-4 bg-ice text-white text-center rounded-2xl font-black shadow-lg shadow-ice/20"
            >
              Start a Project
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
