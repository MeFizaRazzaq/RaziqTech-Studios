
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
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
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import EmployeeProfilePage from './pages/EmployeeProfile';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Dashboards
import AdminDashboard from './pages/AdminDashboard';
import AdminEmployees from './pages/AdminEmployees';
import AdminProjects from './pages/AdminProjects';
import AdminInquiries from './pages/AdminInquiries';
import EmployeeDashboard from './pages/EmployeeDashboard';
import ClientDashboard from './pages/ClientDashboard';

// Auth Context
interface AuthContextType extends AuthState {
  // Corrected return type from void to User | null to match implementation
  login: (email: string) => User | null;
  logout: () => void;
  signup: (name: string, email: string) => void;
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
      return found;
    } else {
      alert('Invalid credentials. Try: admin@raziqtech.com, jane@raziqtech.com, or client@enterprise.com');
      return null;
    }
  };

  const signup = (name: string, email: string) => {
    try {
      const newUser = MockDB.signupClient(name, email);
      setUser(newUser);
      localStorage.setItem('raziqtech_session', JSON.stringify({ email }));
    } catch (e: any) {
      alert(e.message);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('raziqtech_session');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

// Route Guards
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles: UserRole[] }> = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user!.role)) {
    // Redirect based on role
    if (user!.role === UserRole.ADMIN) return <Navigate to="/admin" />;
    if (user!.role === UserRole.EMPLOYEE) return <Navigate to="/employee-dashboard" />;
    if (user!.role === UserRole.CLIENT) return <Navigate to="/client-dashboard" />;
    return <Navigate to="/" />;
  }
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
  console.log('App component rendering...');
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
            <Route path="/portfolio/:id" element={<Layout><ProjectDetail /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/employees" element={
              <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
                <AdminEmployees />
              </ProtectedRoute>
            } />
            <Route path="/admin/projects" element={
              <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
                <AdminProjects />
              </ProtectedRoute>
            } />
            <Route path="/admin/inquiries" element={
              <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
                <AdminInquiries />
              </ProtectedRoute>
            } />

            {/* Employee Routes */}
            <Route path="/employee-dashboard" element={
              <ProtectedRoute allowedRoles={[UserRole.EMPLOYEE]}>
                <EmployeeDashboard />
              </ProtectedRoute>
            } />

            {/* Client Routes */}
            <Route path="/client-dashboard" element={
              <ProtectedRoute allowedRoles={[UserRole.CLIENT]}>
                <ClientDashboard />
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
  const isDashboard = pathname.startsWith('/admin') || pathname === '/employee-dashboard' || pathname === '/client-dashboard';

  return (
    <>
      {!isDashboard && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!isDashboard && <Footer />}
      {!isDashboard && <FloatingChat />}
    </>
  );
};

export default App;
