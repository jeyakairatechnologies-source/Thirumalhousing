import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  CheckCircle2,
  Phone,
  MessageCircle,
  Download,
  Share2,
  Calendar,
  Sparkles,
  ShieldCheck,
  Building,
  Layers,
  Send,
  ArrowLeft,
  Eye
} from 'lucide-react';
import { api } from '../services/api.js';

export default function ProjectDetails({ onOpenEnquiry }) {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Enquiry form state inside project page
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [enquiryStatus, setEnquiryStatus] = useState({ submitting: false, success: false, error: '' });

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const data = await api.getProjectBySlug(slug);
        setProject(data);
        if (data) {
          setEnquiryForm(prev => ({
            ...prev,
            message: `Hi, I am interested in ${data.name}. Please share the detailed master plan, price sheet, and plot availability.`
          }));
        }
      } catch (err) {
        console.error('Failed to load project details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    if (!enquiryForm.name || !enquiryForm.phone) {
      setEnquiryStatus({ submitting: false, success: false, error: 'Please enter your name and phone number.' });
      return;
    }

    setEnquiryStatus({ submitting: true, success: false, error: '' });
    try {
      await api.submitEnquiry({
        name: enquiryForm.name,
        phone: enquiryForm.phone,
        email: enquiryForm.email,
        project: project._id,
        projectName: project.name,
        message: enquiryForm.message,
        source: 'project-page'
      });
      setEnquiryStatus({ submitting: false, success: true, error: '' });
    } catch (err) {
      setEnquiryStatus({ submitting: false, success: false, error: err.message || 'Submission failed' });
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'ongoing':
        return <span className="badge badge-ongoing">Ongoing Project</span>;
      case 'ongoing':
        return <span className="badge badge-ongoing">ongoing Launch</span>;
      case 'completed':
        return <span className="badge badge-completed">100% Completed</span>;
      default:
        return <span className="badge badge-ongoing">{status}</span>;
    }
  };

  if (loading) {
    return (
      <div className="section-padding container" style={{ textAlign: 'center' }}>
        <p>Loading project details...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="section-padding container" style={{ textAlign: 'center' }}>
        <h2 style={{ marginBottom: '16px' }}>Project Not Found</h2>
        <p style={{ marginBottom: '24px' }}>The project you are looking for does not exist or has been updated.</p>
        <Link to="/projects" className="btn btn-primary">
          Back to Projects
        </Link>
      </div>
    );
  }

  const allImages = [
    project.mainImage,
    ...(project.images || []).filter(img => img !== project.mainImage)
  ].filter(Boolean);

  return (
    <div style={{ backgroundColor: '#f4ebd0', paddingBottom: '80px', minHeight: '100vh' }}>
      {/* Navigation Breadcrumb Removed */}

      {/* ===================================================================
          HERO SECTION (Matching Specification Section 5)
          =================================================================== */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '60px 0'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            alignItems: 'center'
          }}>
            {/* Left side: Image */}
            <div style={{
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
            }}>
              <img
                src={allImages[activeImageIndex] || project.mainImage}
                alt={project.name}
                style={{
                  width: '100%',
                  height: '600px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>

            {/* Right side: Content */}
            <div style={{ paddingRight: '40px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#8b2e35',
                fontSize: '0.9rem',
                fontWeight: '700',
                letterSpacing: '0.1em',
                marginBottom: '16px',
                textTransform: 'uppercase'
              }}>
                <MapPin size={18} />
                <span>{project.location?.city || project.location?.district || project.location?.address}</span>
              </div>

              <h1 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '4rem',
                fontWeight: '800',
                color: '#1b4d4f',
                lineHeight: 1.1,
                marginBottom: '32px'
              }}>
                {project.name}
              </h1>

              <div style={{
                fontSize: '1.1rem',
                color: '#346c6d',
                lineHeight: 1.8,
                marginBottom: '40px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                <p>{project.description || `${project.name} introduces approximately ${project.totalUnits || 100} residential plots in a well-connected neighbourhood, surrounded by established homes and convenient access to the town.`}</p>
                <p>{project.highlights?.[0] || 'The project is located near prominent temples, parks, and leading educational institutions, making it a comfortable choice for family living and future investment.'}</p>
              </div>

              {/* Features List */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                borderTop: '1px solid #d4cbb8',
                borderBottom: '1px solid #d4cbb8',
                padding: '24px 0',
                marginBottom: '40px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#8b2e35', fontWeight: '600' }}>
                  <Layers size={20} />
                  <span>Planned residential community</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#8b2e35', fontWeight: '600' }}>
                  <MapPin size={20} />
                  <span>Convenient town access</span>
                </div>
              </div>

              {/* Back Button */}
              <Link
                to="/projects"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  backgroundColor: '#1b4d4f',
                  color: '#ffffff',
                  padding: '14px 28px',
                  borderRadius: '4px',
                  fontWeight: '600',
                  fontSize: '1rem',
                  textDecoration: 'none',
                  transition: 'background-color 0.2s'
                }}
              >
                <ArrowLeft size={20} />
                Back to projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
