
import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { Mail, Calendar, DollarSign, Tag, Archive, Check } from 'lucide-react';
import { MockDB } from '../db';

const AdminInquiries: React.FC = () => {
  const [inquiries, setInquiries] = useState(MockDB.getInquiries());

  const toggleStatus = (id: string) => {
    setInquiries(inquiries.map(i => 
      i.id === id ? { ...i, status: i.status === 'New' ? 'Read' : 'Archived' } : i
    ));
  };

  return (
    <div className="pl-64 min-h-screen bg-slate-50">
      <AdminSidebar />
      <div className="p-10">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Inbound Inquiries</h1>
            <p className="text-slate-500">Review and process potential project leads.</p>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
              Export CSV
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {inquiries.length === 0 ? (
            <div className="bg-white p-20 rounded-3xl border border-slate-200 text-center">
              <p className="text-slate-400 font-bold uppercase tracking-widest">No pending inquiries</p>
            </div>
          ) : (
            inquiries.map((inq) => (
              <div key={inq.id} className={`bg-white rounded-3xl border ${inq.status === 'New' ? 'border-indigo-200 shadow-lg shadow-indigo-100/20' : 'border-slate-200'} p-8 transition-all`}>
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-start space-x-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shrink-0 ${inq.status === 'New' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      {inq.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="text-xl font-bold text-slate-900">{inq.name}</h3>
                        {inq.status === 'New' && (
                          <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-black uppercase rounded">Action Required</span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                        <span className="flex items-center"><Mail className="w-4 h-4 mr-1.5" /> {inq.email}</span>
                        <span className="flex items-center"><Tag className="w-4 h-4 mr-1.5" /> {inq.projectType}</span>
                        <span className="flex items-center"><DollarSign className="w-4 h-4 mr-1.5" /> {inq.budget}</span>
                        <span className="flex items-center"><Calendar className="w-4 h-4 mr-1.5" /> {new Date(inq.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => toggleStatus(inq.id)}
                      className="px-4 py-2 bg-slate-100 hover:bg-green-100 hover:text-green-700 text-slate-600 rounded-xl text-sm font-bold transition-all flex items-center"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Mark Read
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-900">
                      <Archive className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-slate-100">
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Project Requirements:</p>
                  <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl">{inq.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminInquiries;
