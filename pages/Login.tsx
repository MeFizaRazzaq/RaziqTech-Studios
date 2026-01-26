
import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Rocket, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../App';

const Login: React.FC = () => {
  const [email, setEmail] = useState('admin@raziqtech.com');
  const { login, isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to="/admin" />;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="p-2 bg-indigo-600 rounded-lg">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">RaziqTech</span>
          </Link>
          <h2 className="text-3xl font-bold text-slate-900">Staff Access</h2>
          <p className="text-slate-600 mt-2">Manage RaziqTech operations and teams.</p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                placeholder="admin@raziqtech.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <input 
                type="password" 
                defaultValue="password"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded text-indigo-600" defaultChecked />
                <span className="text-slate-600">Remember me</span>
              </label>
              <span className="text-indigo-600 font-bold hover:underline cursor-pointer">Forgot password?</span>
            </div>
            <button 
              type="submit" 
              className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center group shadow-lg"
            >
              Sign In
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
          
          <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-center space-x-2 text-slate-500 text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>Secure internal access portal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
