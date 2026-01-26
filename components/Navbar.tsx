
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket, ShieldCheck } from 'lucide-react';
import { useAuth } from '../App';

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
          <div className="hidden md:flex items-center space-x-10">
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
            
            {user?.role === 'ADMIN' ? (
              <Link to="/admin" className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-navy text-white text-sm font-bold hover:bg-navy-light transition-soft">
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Portal</span>
              </Link>
            ) : (
              <Link to="/contact" className="px-6 py-3 rounded-xl bg-ice text-white text-sm font-extrabold hover:bg-ice-dark transition-soft shadow-lg shadow-ice/20">
                Start a Project
              </Link>
            )}
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
        <div className="md:hidden bg-white border-t border-navy/5 py-6 px-4 space-y-4 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block text-lg font-bold ${
                pathname === link.path ? 'text-ice' : 'text-navy'
              }`}
            >
              {link.name}
            </Link>
          ))}
          {!user && (
            <Link 
              to="/contact" 
              onClick={() => setIsOpen(false)}
              className="block w-full py-4 bg-ice text-white text-center rounded-xl font-bold"
            >
              Get Started
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
