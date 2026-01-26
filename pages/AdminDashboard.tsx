
import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  CheckCircle,
  Eye,
  ArrowUpRight,
  Rocket,
  Activity,
  XCircle,
  Clock,
  Printer,
  FileText,
  BarChart3
} from 'lucide-react';
import { MockDB } from '../db';

const AdminDashboard: React.FC = () => {
  const inquiries = MockDB.getInquiries();
  const projects = MockDB.getProjects();
  const employees = MockDB.getProfiles();
  const [pendingUpdates, setPendingUpdates] = useState(MockDB.getPendingUpdates());

  const stats = [
    { name: 'Lead Engineers', value: employees.length, icon: <Users className="w-6 h-6" />, color: 'bg-ice' },
    { name: 'New Inquiries', value: inquiries.filter(i => i.status === 'New').length, icon: <MessageSquare className="w-6 h-6" />, color: 'bg-navy' },
    { name: 'Active Case Studies', value: projects.length, icon: <TrendingUp className="w-6 h-6" />, color: 'bg-ice' },
    { name: 'Conversion Rate', value: '24%', icon: <Activity className="w-6 h-6" />, color: 'bg-navy' },
  ];

  const handleApprove = (id: string) => {
    MockDB.approveProfileUpdate(id);
    setPendingUpdates(MockDB.getPendingUpdates());
  };

  const handleReject = (id: string) => {
    MockDB.rejectProfileUpdate(id);
    setPendingUpdates(MockDB.getPendingUpdates());
  };

  const handleGenerateReport = () => {
    window.print();
  };

  return (
    <div className="pl-72 min-h-screen bg-neutral-offwhite">
      <div className="no-print">
        <AdminSidebar />
      </div>

      {/* Print-Only Report Header */}
      <div className="print-only mb-12 border-b-4 border-navy pb-8">
        <div className="flex justify-between items-end">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-navy rounded-xl">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-navy tracking-tight">RaziqTech Studios</h1>
              <p className="text-navy/40 font-bold uppercase tracking-widest text-xs">Intelligence Manifest & Performance Report</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-black text-navy">Generated: {new Date().toLocaleString()}</p>
            <p className="text-navy/40 text-xs font-bold uppercase">System Auth: Root Admin</p>
          </div>
        </div>
      </div>

      <div className="p-16">
        {/* Dashboard Actions */}
        <div className="flex items-center justify-between mb-16 no-print">
          <div>
            <h1 className="text-4xl font-black text-navy tracking-tight">System Overview</h1>
            <p className="text-navy/50 font-bold">Authenticated as Root Administrator</p>
          </div>
          <div className="flex space-x-5">
            <div className="bg-white px-6 py-3 rounded-2xl border border-navy/5 text-sm font-black text-navy flex items-center shadow-sm">
              <Clock className="w-4 h-4 mr-2 text-ice" />
              Session: 04:22:10
            </div>
            <button 
              onClick={handleGenerateReport}
              className="bg-ice text-white px-6 py-3 rounded-2xl font-black text-sm shadow-xl shadow-ice/20 hover:bg-ice-dark transition-soft flex items-center"
            >
              <Printer className="w-4 h-4 mr-2" />
              Generate Report
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white p-10 rounded-[2.5rem] border border-navy/5 shadow-xl flex items-center justify-between hover-lift transition-soft group">
              <div>
                <p className="text-navy/40 text-[10px] font-black uppercase tracking-[0.2em] mb-3">{stat.name}</p>
                <p className="text-4xl font-black text-navy">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-4 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-soft no-print`}>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {/* Profile Update Approvals - Hidden during print unless needed, but usually we hide pending actions in a formal report */}
            {pendingUpdates.length > 0 && (
              <div className="bg-white rounded-[3rem] border border-navy/5 overflow-hidden shadow-xl border-t-8 border-t-amber-400 no-print">
                <div className="p-10 border-b border-navy/5 flex items-center justify-between">
                  <div>
                    <h3 className="font-black text-2xl text-navy">Pending Profile Approvals</h3>
                    <p className="text-navy/40 text-sm font-bold">Action required for employee manifest updates.</p>
                  </div>
                  <Clock className="w-8 h-8 text-amber-400" />
                </div>
                <div className="divide-y divide-navy/5">
                  {pendingUpdates.map((update) => {
                    const employee = employees.find(e => e.id === update.employeeId);
                    return (
                      <div key={update.id} className="p-10 hover:bg-neutral-offwhite/50 transition-soft">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center space-x-6">
                            <img src={employee?.image} className="w-14 h-14 rounded-2xl object-cover" alt="" />
                            <div>
                              <p className="text-lg font-black text-navy">{employee?.fullName}</p>
                              <p className="text-sm text-navy/40 font-bold">Requested on {new Date(update.createdAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="flex space-x-3">
                            <button 
                              onClick={() => handleReject(update.id)}
                              className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-soft"
                            >
                              <XCircle className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => handleApprove(update.id)}
                              className="px-6 py-3 bg-green-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-green-700 transition-soft flex items-center space-x-2"
                            >
                              <CheckCircle className="w-4 h-4" />
                              <span>Authorize</span>
                            </button>
                          </div>
                        </div>
                        <div className="bg-neutral-offwhite p-6 rounded-2xl text-sm italic text-navy/60 border border-navy/5">
                          "{update.changes.bio?.substring(0, 150)}..."
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Recent Inquiries / Priority Leads - Styled for Print */}
            <div className="bg-white rounded-[3rem] border border-navy/5 overflow-hidden shadow-xl">
              <div className="p-10 border-b border-navy/5 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="w-6 h-6 text-ice print-only" />
                  <h3 className="font-black text-2xl text-navy">Priority Lead Manifest</h3>
                </div>
                <button className="text-ice text-sm font-black hover:underline no-print">View CRM</button>
              </div>
              <div className="divide-y divide-navy/5">
                {inquiries.slice(0, 8).map((inq) => (
                  <div key={inq.id} className="p-10 hover:bg-neutral-offwhite/50 transition-soft flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="w-14 h-14 bg-navy text-white rounded-2xl flex items-center justify-center font-black text-xl no-print">
                        {inq.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-lg font-black text-navy">{inq.name}</p>
                        <p className="text-sm text-navy/50 font-bold">{inq.projectType} — {inq.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-ice mb-2">{inq.budget}</p>
                      <span className="px-3 py-1 bg-ice/10 text-ice text-[10px] font-black uppercase tracking-widest rounded-lg">
                        {inq.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Print-only Project Roadmap */}
            <div className="print-only bg-white rounded-2xl border border-navy/5 overflow-hidden mt-10">
              <div className="p-10 border-b border-navy/5">
                <h3 className="font-black text-2xl text-navy">Active Project Roadmap</h3>
              </div>
              <div className="p-10">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-navy/10">
                      <th className="py-4 text-[10px] font-black uppercase tracking-widest">Project Identifier</th>
                      <th className="py-4 text-[10px] font-black uppercase tracking-widest text-center">Velocity</th>
                      <th className="py-4 text-[10px] font-black uppercase tracking-widest text-right">Technical Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy/5">
                    {projects.map(proj => (
                      <tr key={proj.id}>
                        <td className="py-4 font-bold text-navy">{proj.title}</td>
                        <td className="py-4 text-center font-black text-ice">{proj.progress}%</td>
                        <td className="py-4 text-right text-xs font-black uppercase tracking-tighter text-navy/40">{proj.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar / Health - Hidden during print to focus on primary lists */}
          <div className="space-y-10 no-print">
            <div className="bg-white p-10 rounded-[3rem] border border-navy/5 shadow-xl">
              <h3 className="font-black text-xl text-navy mb-8">Infrastructure Load</h3>
              <div className="space-y-8 font-bold">
                <div className="space-y-3">
                  <div className="flex justify-between text-xs uppercase tracking-widest text-navy/40">
                    <span>API Performance</span>
                    <span className="text-navy">99.4ms</span>
                  </div>
                  <div className="h-2.5 bg-neutral-offwhite rounded-full overflow-hidden">
                    <div className="h-full bg-ice w-[92%]"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs uppercase tracking-widest text-navy/40">
                    <span>DB Indexing</span>
                    <span className="text-navy">Healthy</span>
                  </div>
                  <div className="h-2.5 bg-neutral-offwhite rounded-full overflow-hidden">
                    <div className="h-full bg-navy w-[45%]"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-navy p-10 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10">
                <h3 className="text-2xl font-black mb-4">Engineering Docs</h3>
                <p className="text-white/50 font-medium mb-10 leading-relaxed">Internal API documentation and component library guidelines are updated weekly.</p>
                <button className="w-full py-4 bg-ice text-white rounded-2xl font-black flex items-center justify-center hover:bg-ice-dark transition-soft shadow-xl shadow-ice/20">
                  Open Repository <ArrowUpRight className="ml-3 w-5 h-5" />
                </button>
              </div>
              <Rocket className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5 -rotate-12" />
            </div>
          </div>
        </div>

        {/* Print Footer */}
        <div className="print-only mt-24 text-center text-navy/20 text-[10px] font-black uppercase tracking-[0.5em]">
          End of Document — RaziqTech Internal Proprietary Data
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
