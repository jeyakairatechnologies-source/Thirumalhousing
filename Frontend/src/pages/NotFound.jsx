import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 20px',
        backgroundColor: 'var(--bg-main)'
      }}
    >
      <div className="card" style={{ maxWidth: '500px', padding: '50px 30px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '5rem', color: 'var(--gold-600)', lineHeight: 1 }}>
          404
        </h1>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--primary-900)', margin: '16px 0 10px' }}>
          Page Not Found
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '28px', fontSize: '0.98rem' }}>
          The page or property link you requested could not be located. It may have been relocated or updated.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <Link to="/" className="btn btn-primary">
            <Home size={16} /> Return to Home
          </Link>
          <Link to="/projects" className="btn btn-outline-gold">
            Browse Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
