
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Rocket,
  ChevronRight,
  Bell
} from 'lucide-react';
import { useAuth } from '../App';
import { MockDB } from '../db';

const AdminSidebar: React.FC = () => {
  const { pathname } = useLocation();
  const { logout, user } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const calculateUnread = () => {
      if (!user) return;
      const staff = MockDB.getStaffRelay().filter(m => !m.readBy.includes(user.id)).length;
      // Admin should check all direct relays for unread (complex for mock, but let's count staff relay for now)
      setUnreadCount(staff);
    };
    calculateUnread();
    window.addEventListener('db-update', calculateUnread);
    return () => window.removeEventListener('db-update', calculateUnread);
  }, [user]);

  const menuItems = [
    { name: 'Analytics', icon: <LayoutDashboard className="w-5 h-5" />, path: '/admin' },
    { name: 'Engineers', icon: <Users className="w-5 h-5" />, path: '/admin/employees' },
    { name: 'Projects', icon: <Briefcase className="w-5 h-5" />, path: '/admin/projects' },
    { name: 'Leads', icon: <MessageSquare className="w-5 h-5" />, path: '/admin/inquiries' },
    { name: 'System Settings', icon: <Settings className="w-5 h-5" />, path: '/admin/settings' },
  ];

  return (
    <div className="w-72 h-screen fixed left-0 top-0 bg-navy border-r border-white/5 flex flex-col z-50">
      <div className="p-10">
        <Link to="/" className="flex items-center space-x-3 mb-16">
          <div className="p-2 bg-ice rounded-xl shadow-lg shadow-ice/20">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black text-white tracking-tighter">RaziqTech</span>
        </Link>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center justify-between px-6 py-4 rounded-2xl transition-soft group font-bold text-sm ${
                  isActive 
                    ? 'bg-white/10 text-white border-l-4 border-ice' 
                    : 'text-neutral-coolgray hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={isActive ? 'text-ice' : 'text-neutral-coolgray group-hover:text-ice transition-soft'}>
                    {item.icon}
                  </div>
                  <span>{item.name}</span>
                </div>
                {item.name === 'Leads' && unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-[8px] font-black px-2 py-1 rounded-full">{unreadCount}</span>
                )}
                {isActive && <ChevronRight className="w-4 h-4 text-ice" />}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-8 border-t border-white/5 bg-navy-dark">
        <div className="flex items-center space-x-4 mb-8">
          <img src={user?.avatar} className="w-12 h-12 rounded-2xl object-cover border-2 border-ice/20" alt="" />
          <div className="overflow-hidden">
            <p className="text-white font-black truncate">{user?.name}</p>
            <p className="text-ice text-[10px] font-black uppercase tracking-widest">Admin Control</p>
          </div>
        </div>
        <button 
          onClick={logout}
          className="w-full flex items-center justify-center space-x-3 py-4 bg-white/5 text-white/60 rounded-2xl hover:bg-red-500/10 hover:text-red-400 transition-soft border border-white/5 font-black text-sm"
        >
          <LogOut className="w-5 h-5" />
          <span>Exit Portal</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
