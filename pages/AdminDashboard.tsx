
import React from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  CheckCircle,
  Eye,
  ArrowUpRight,
  Rocket,
  Activity
} from 'lucide-react';
import { MockDB } from '../db';

const AdminDashboard: React.FC = () => {
  const inquiries = MockDB.getInquiries();
  const projects = MockDB.getProjects();
  const employees = MockDB.getProfiles();

  const stats = [
    { name: 'Lead Engineers', value: employees.length, icon: <Users className="w-6 h-6" />, color: 'bg-ice' },
    { name: 'New Inquiries', value: inquiries.filter(i => i.status === 'New').length, icon: <MessageSquare className="w-6 h-6" />, color: 'bg-navy' },
    { name: 'Active Case Studies', value: projects.length, icon: <TrendingUp className="w-6 h-6" />, color: 'bg-ice' },
    { name: 'Conversion Rate', value: '24%', icon: <Activity className="w-6 h-6" />, color: 'bg-navy' },
  ];

  return (
    <div className="pl-72 min-h-screen bg-neutral-offwhite">
      <AdminSidebar />
      <div className="p-16">
        <div className="flex items-center justify-between mb-16">
          <div>
            <h1 className="text-4xl font-black text-navy tracking-tight">System Overview</h1>
            <p className="text-navy/50 font-bold">Authenticated as Root Administrator</p>
          </div>
          <div className="flex space-x-5">
            <div className="bg-white px-6 py-3 rounded-2xl border border-navy/5 text-sm font-black text-navy flex items-center shadow-sm">
              Session: 04:22:10
            </div>
            <button className="bg-ice text-white px-6 py-3 rounded-2xl font-black text-sm shadow-xl shadow-ice/20 hover:bg-ice-dark transition-soft">
              Generate Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white p-10 rounded-[2.5rem] border border-navy/5 shadow-xl flex items-center justify-between hover-lift transition-soft group">
              <div>
                <p className="text-navy/40 text-[10px] font-black uppercase tracking-[0.2em] mb-3">{stat.name}</p>
                <p className="text-4xl font-black text-navy">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-4 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-soft`}>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Recent Inquiries */}
          <div className="lg:col-span-2 bg-white rounded-[3rem] border border-navy/5 overflow-hidden shadow-xl">
            <div className="p-10 border-b border-navy/5 flex items-center justify-between">
              <h3 className="font-black text-2xl text-navy">Priority Leads</h3>
              <button className="text-ice text-sm font-black hover:underline">View CRM</button>
            </div>
            <div className="divide-y divide-navy/5">
              {inquiries.slice(0, 5).map((inq) => (
                <div key={inq.id} className="p-10 hover:bg-neutral-offwhite/50 transition-soft flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="w-14 h-14 bg-navy text-white rounded-2xl flex items-center justify-center font-black text-xl">
                      {inq.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-lg font-black text-navy">{inq.name}</p>
                      <p className="text-sm text-navy/50 font-bold">{inq.projectType}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-ice mb-2">{inq.budget}</p>
                    <span className="px-3 py-1 bg-ice/10 text-ice text-[10px] font-black uppercase tracking-widest rounded-lg">Verification Pending</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions & Health */}
          <div className="space-y-10">
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
      </div>
    </div>
  );
};

export default AdminDashboard;
