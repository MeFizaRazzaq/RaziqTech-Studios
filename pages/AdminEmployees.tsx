
import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { Plus, Search, Edit2, Trash2, MoreVertical, Shield, User } from 'lucide-react';
import { MockDB } from '../db';
import { EmployeeProfile, UserRole } from '../types';

const AdminEmployees: React.FC = () => {
  const [profiles, setProfiles] = useState(MockDB.getProfiles());
  const users = MockDB.getUsers();

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this employee?')) {
      // In mock DB we'd filter, but here we just update local state for the demo
      setProfiles(profiles.filter(p => p.id !== id));
    }
  };

  return (
    <div className="pl-64 min-h-screen bg-slate-50">
      <AdminSidebar />
      <div className="p-10">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Employee Management</h1>
            <p className="text-slate-500">Add, edit, and manage company staff profiles.</p>
          </div>
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 flex items-center hover:bg-indigo-700">
            <Plus className="mr-2 w-5 h-5" />
            Add Employee
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by name, role, or skill..." 
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              />
            </div>
            <div className="flex space-x-2">
              <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
                <Shield className="w-5 h-5" />
              </button>
              <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-500">Employee</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-500">Role & Tech</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-500">Status</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {profiles.map((profile) => {
                const user = users.find(u => u.id === profile.userId);
                return (
                  <tr key={profile.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-6">
                      <div className="flex items-center space-x-4">
                        <img src={profile.image} className="w-12 h-12 rounded-full object-cover border border-slate-200" alt="" />
                        <div>
                          <p className="font-bold text-slate-900">{profile.fullName}</p>
                          <p className="text-xs text-slate-500">@{profile.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <p className="text-sm font-semibold text-slate-800 mb-2">{profile.roleTitle}</p>
                      <div className="flex flex-wrap gap-1">
                        {profile.skills.slice(0, 2).map((s, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded font-bold uppercase">
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${profile.chatEnabled ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                        <span className="text-xs font-medium text-slate-600">
                          {profile.chatEnabled ? 'Chat Active' : 'Offline'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(profile.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="p-6 bg-slate-50/50 border-t border-slate-100 text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Showing {profiles.length} of {profiles.length} staff members</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEmployees;
