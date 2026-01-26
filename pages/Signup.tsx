
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Rocket, ShieldCheck, ArrowRight, UserPlus } from 'lucide-react';
import { useAuth } from '../App';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    signup(name, email);
    navigate('/client-dashboard');
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
          <h2 className="text-3xl font-black text-navy tracking-tight">Client Onboarding</h2>
          <p className="text-navy/50 mt-2 font-medium">Kickstart your enterprise project today.</p>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] border border-navy/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-ice/5 rounded-bl-full"></div>
          
          <form onSubmit={handleSignup} className="space-y-6 relative z-10">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-navy/40 mb-2">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-5 py-3.5 bg-neutral-offwhite border-2 border-transparent rounded-xl focus:outline-none focus:border-ice focus:bg-white transition-soft font-bold"
                placeholder="Alex Mercer"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-navy/40 mb-2">Business Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3.5 bg-neutral-offwhite border-2 border-transparent rounded-xl focus:outline-none focus:border-ice focus:bg-white transition-soft font-bold"
                placeholder="alex@company.com"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-navy/40 mb-2">Password</label>
              <input 
                type="password" 
                className="w-full px-5 py-3.5 bg-neutral-offwhite border-2 border-transparent rounded-xl focus:outline-none focus:border-ice focus:bg-white transition-soft font-bold"
                placeholder="••••••••"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full py-5 bg-ice text-white rounded-xl font-black text-lg hover:bg-ice-dark transition-soft flex items-center justify-center group shadow-xl shadow-ice/20"
            >
              Initialize Account
              <UserPlus className="ml-3 w-5 h-5" />
            </button>
          </form>
          
          <div className="mt-10 pt-8 border-t border-navy/5 text-center">
            <p className="text-sm font-medium text-navy/50 mb-4">Already have an account? <Link to="/login" className="text-navy font-black hover:underline">Sign in</Link></p>
            <div className="flex items-center justify-center space-x-2 text-navy/30 text-[10px] font-black uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Secure Onboarding Protocol</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
