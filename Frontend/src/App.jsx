import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { api } from './services/api.js';

// Public Components & Pages
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import EnquiryModal from './components/EnquiryModal.jsx';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Projects from './pages/Projects.jsx';
import ProjectDetails from './pages/ProjectDetails.jsx';

import Contact from './pages/Contact.jsx';
import Enquiry from './pages/Enquiry.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import TermsConditions from './pages/TermsConditions.jsx';
import NotFound from './pages/NotFound.jsx';

// Admin Suite
import AdminLayout from './admin/AdminLayout.jsx';
import AdminLogin from './admin/AdminLogin.jsx';
import AdminDashboard from './admin/AdminDashboard.jsx';
import AdminProjects from './admin/AdminProjects.jsx';
import AdminEnquiries from './admin/AdminEnquiries.jsx';
import AdminGallery from './admin/AdminGallery.jsx';
import AdminContent from './admin/AdminContent.jsx';
import AdminSettings from './admin/AdminSettings.jsx';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Protected Route for Admin
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Checking authorization...</p>
      </div>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

// Public Layout Wrapper
function PublicLayout({ onOpenEnquiry }) {
  return (
    <>
      <Navbar onOpenEnquiry={onOpenEnquiry} />
      <div style={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Home onOpenEnquiry={onOpenEnquiry} />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects onOpenEnquiry={onOpenEnquiry} />} />
          <Route path="/project/:slug" element={<ProjectDetails onOpenEnquiry={onOpenEnquiry} />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/enquiry" element={<Enquiry />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

function MainApp() {
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectsList, setProjectsList] = useState([]);

  useEffect(() => {
    api.getProjects().then(data => {
      if (data) setProjectsList(data);
    });
  }, []);

  const handleOpenEnquiry = (project = null) => {
    setSelectedProject(project);
    setEnquiryModalOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ScrollToTop />
      <Routes>
        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Suite */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="enquiries" element={<AdminEnquiries />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="content" element={<AdminContent />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* All Public Routes */}
        <Route path="/*" element={<PublicLayout onOpenEnquiry={handleOpenEnquiry} />} />
      </Routes>

      {/* Global High-Converting Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        selectedProject={selectedProject}
        projects={projectsList}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MainApp />
      </BrowserRouter>
    </AuthProvider>
  );
}
