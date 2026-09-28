import { Link } from 'react-router-dom';
import { MapPin, CheckCircle2, ArrowRight, Sparkles, Layers } from 'lucide-react';

export default function ProjectCard({ project, onEnquire, isSimplified = false }) {
  if (!project) return null;

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'ongoing':
        return <span style={{
          backgroundColor: '#e5c98d',
          color: '#825900',
          padding: '6px 14px',
          borderRadius: '4px',
          fontSize: '0.75rem',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>ONGOING</span>;
      case 'ongoing':
        return (
          <span className="badge badge-ongoing" style={{
            boxShadow: '0 0 15px rgba(234, 179, 8, 0.6)',
            border: '1px solid var(--status-ongoing-text)',
            animation: 'pulse 2s infinite'
          }}>
            <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} />
            ongoing Launch
          </span>
        );
      case 'completed':
        return <span className="badge badge-completed">100% Completed</span>;
      default:
        return <span className="badge badge-ongoing">{status}</span>;
    }
  };

  if (isSimplified) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Link to={`/project/${project.slug}`} style={{ display: 'block', width: '100%', position: 'relative' }}>
          <div
            style={{
              position: 'relative',
              height: '340px',
              width: '100%',
              borderRadius: '30px',
              overflow: 'hidden',
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
            }}
          >
            <img
              src={project.mainImage || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80'}
              alt={project.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            />
            {/* Status Badge Top Right */}
            <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 2 }}>
              {getStatusBadge(project.status)}
            </div>
          </div>
        </Link>
        <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '6px', color: '#e5c98d', fontSize: '1rem', fontWeight: '700', letterSpacing: '0.05em' }}>
          <MapPin size={18} />
          <span style={{ textTransform: 'uppercase' }}>
            {project.location?.city || project.location?.address}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="card project-card-hover"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        transform: project.status === 'ongoing' ? 'translateY(-4px)' : 'none',
        boxShadow: project.status === 'ongoing' ? '0 15px 35px rgba(234, 179, 8, 0.15)' : 'var(--shadow-md)',
        transition: 'all 0.3s ease'
      }}
    >
      {/* Card Image Container */}
      <div
        style={{
          position: 'relative',
          height: '280px',
          overflow: 'hidden',
          backgroundColor: '#e2e8f0',
          borderBottom: project.status === 'ongoing' ? '4px solid var(--status-ongoing-text)' : 'none'
        }}
      >
        <Link to={`/project/${project.slug}`} style={{ display: 'block', height: '100%' }}>
          <img
            src={project.mainImage || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80'}
            alt={project.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </Link>

        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(10, 22, 18, 0.75) 0%, rgba(0,0,0,0) 50%)',
            pointerEvents: 'none'
          }}
        />

        {/* Status Badge Top Left */}
        <div style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 2 }}>
          {getStatusBadge(project.status)}
        </div>

        {/* Approval Badge Top Right */}
        <div
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            backgroundColor: 'rgba(255, 255, 255, 0.94)',
            backdropFilter: 'blur(4px)',
            color: 'var(--primary-800)',
            fontSize: '0.72rem',
            fontWeight: '700',
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--gold-400)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
          }}
        >
          <Sparkles size={12} style={{ color: 'var(--gold-600)' }} />
          {project.approvalType || 'DTCP Approved'}
        </div>


      </div>

      {/* Card Body */}
      <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {/* Title */}
        <h3
          style={{
            fontSize: '1.35rem',
            fontWeight: '700',
            color: 'var(--primary-900)',
            marginBottom: '8px',
            lineHeight: 1.25
          }}
        >
          <Link
            to={`/project/${project.slug}`}
            style={{ color: 'inherit', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-600)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--primary-900)')}
          >
            {project.name}
          </Link>
        </h3>

        {/* Location */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            marginBottom: '16px'
          }}
        >
          <MapPin size={15} style={{ color: 'var(--gold-600)', flexShrink: 0 }} />
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {project.location?.city ? `${project.location.city}, ${project.location.district}` : project.location?.address}
          </span>
        </div>

        {/* Stats Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
            backgroundColor: 'var(--bg-surface-muted)',
            padding: '10px 12px',
            borderRadius: 'var(--radius-md)',
            marginBottom: '16px',
            border: '1px solid var(--border-light)',
            textAlign: 'center'
          }}
        >
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Total Area</div>
            <div style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--primary-900)' }}>
              {project.totalArea || 'N/A'}
            </div>
          </div>
          <div style={{ borderLeft: '1px solid var(--border-light)', borderRight: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Total Plots</div>
            <div style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--primary-900)' }}>
              {project.totalUnits || 0}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Available</div>
            <div style={{ fontSize: '0.88rem', fontWeight: '700', color: project.availableUnits > 0 ? 'var(--status-ongoing-text)' : '#ef4444' }}>
              {project.availableUnits > 0 ? `${project.availableUnits} Plots` : 'Sold Out'}
            </div>
          </div>
        </div>

        {/* Key Highlights Checklist (top 3) */}
        {project.highlights && project.highlights.length > 0 && (
          <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '6px', flexGrow: 1 }}>
            {project.highlights.slice(0, 3).map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.82rem',
                  color: 'var(--text-main)'
                }}
              >
                <CheckCircle2 size={14} style={{ color: 'var(--primary-600)', flexShrink: 0 }} />
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: 'auto' }}>
          <Link
            to={`/project/${project.slug}`}
            className="btn btn-outline-gold btn-sm"
            style={{ fontWeight: '600' }}
          >
            View Details
          </Link>

          <button
            type="button"
            onClick={() => onEnquire && onEnquire(project)}
            className="btn btn-primary btn-sm"
            style={{ fontWeight: '600' }}
          >
            Enquire Now
          </button>
        </div>
      </div>
    </div>
  );
}

