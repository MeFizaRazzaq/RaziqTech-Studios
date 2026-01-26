
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { User, UserRole, AuthState } from './types';
import { MockDB } from './db';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingChat from './components/FloatingChat';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Team from './pages/Team';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import EmployeeProfilePage from './pages/EmployeeProfile';
import Login from './pages/Login';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import AdminEmployees from './pages/AdminEmployees';
import AdminProjects from './pages/AdminProjects';
import AdminInquiries from './pages/AdminInquiries';

// Auth Context
interface AuthContextType extends AuthState {
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('raziqtech_session');
    if (saved) {
      const userData = JSON.parse(saved);
      const found = MockDB.getUsers().find(u => u.email === userData.email);
      if (found) setUser(found);
    }
  }, []);

  const login = (email: string) => {
    const found = MockDB.getUsers().find(u => u.email === email);
    if (found) {
      setUser(found);
      localStorage.setItem('raziqtech_session', JSON.stringify({ email }));
    } else {
      alert('Invalid credentials (Try admin@raziqtech.com)');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('raziqtech_session');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Route Guards
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRole?: UserRole }> = ({ children, allowedRole }) => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRole && user?.role !== allowedRole) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/services" element={<Layout><Services /></Layout>} />
            <Route path="/team" element={<Layout><Team /></Layout>} />
            <Route path="/team/:username" element={<Layout><EmployeeProfilePage /></Layout>} />
            <Route path="/portfolio" element={<Layout><Portfolio /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/login" element={<Login />} />

            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute allowedRole={UserRole.ADMIN}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/employees" element={
              <ProtectedRoute allowedRole={UserRole.ADMIN}>
                <AdminEmployees />
              </ProtectedRoute>
            } />
            <Route path="/admin/projects" element={
              <ProtectedRoute allowedRole={UserRole.ADMIN}>
                <AdminProjects />
              </ProtectedRoute>
            } />
            <Route path="/admin/inquiries" element={
              <ProtectedRoute allowedRole={UserRole.ADMIN}>
                <AdminInquiries />
              </ProtectedRoute>
            } />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const isAdminPath = pathname.startsWith('/admin');

  return (
    <>
      {!isAdminPath && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!isAdminPath && <Footer />}
      {!isAdminPath && <FloatingChat />}
    </>
  );
};

export default App;
