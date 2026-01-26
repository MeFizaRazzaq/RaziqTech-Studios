
import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { Rocket, ShieldCheck, ArrowRight, User as UserIcon } from 'lucide-react';
import { useAuth } from '../App';
import { UserRole } from '../types';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    if (user?.role === UserRole.ADMIN) return <Navigate to="/admin" />;
    if (user?.role === UserRole.EMPLOYEE) return <Navigate to="/employee-dashboard" />;
    if (user?.role === UserRole.CLIENT) return <Navigate to="/client-dashboard" />;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const loggedInUser = login(email);
    if (loggedInUser) {
      if (loggedInUser.role === UserRole.ADMIN) navigate('/admin');
      else if (loggedInUser.role === UserRole.EMPLOYEE) navigate('/employee-dashboard');
      else if (loggedInUser.role === UserRole.CLIENT) navigate('/client-dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-offwhite p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6 group">
            <div className="p-2 bg-navy rounded-lg group-hover:bg-ice transition-soft">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tight text-navy">RaziqTech</span>
          </Link>
          <h2 className="text-3xl font-black text-navy tracking-tight">Portal Access</h2>
          <p className="text-navy/50 mt-2 font-medium">Log in to manage your RaziqTech experience.</p>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] border border-navy/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-ice/5 rounded-bl-full"></div>
          
          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-navy/40 mb-2">Work Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3.5 bg-neutral-offwhite border-2 border-transparent rounded-xl focus:outline-none focus:border-ice focus:bg-white transition-soft font-bold"
                placeholder="email@raziqtech.com"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-navy/40 mb-2">Password</label>
              <input 
                type="password" 
                defaultValue="password"
                className="w-full px-5 py-3.5 bg-neutral-offwhite border-2 border-transparent rounded-xl focus:outline-none focus:border-ice focus:bg-white transition-soft font-bold"
                placeholder="••••••••"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full py-5 bg-navy text-white rounded-xl font-black text-lg hover:bg-navy-light transition-soft flex items-center justify-center group shadow-xl"
            >
              Sign In
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-soft" />
            </button>
          </form>
          
          <div className="mt-10 pt-8 border-t border-navy/5 text-center">
            <p className="text-sm font-medium text-navy/50 mb-4">New client? <Link to="/signup" className="text-ice font-black hover:underline">Create a workspace</Link></p>
            <div className="flex items-center justify-center space-x-2 text-navy/30 text-[10px] font-black uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Encrypted Authentication Session</span>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3">
          {[
            { label: 'Admin', email: 'admin@raziqtech.com' },
            { label: 'Engineer', email: 'jane@raziqtech.com' },
            { label: 'Client', email: 'client@enterprise.com' }
          ].map(test => (
            <button 
              key={test.label}
              onClick={() => setEmail(test.email)}
              className="px-3 py-2 bg-white/50 border border-navy/5 rounded-lg text-[10px] font-black uppercase text-navy/40 hover:bg-ice/10 hover:text-ice transition-soft"
            >
              {test.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;
