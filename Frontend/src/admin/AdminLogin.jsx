import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import './admin.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@thirumalhousing.com');
  const [password, setPassword] = useState('Admin@123');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMsg, setForgotMsg] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@thirumalhousing.com');
    setPassword('Admin@123');
  };

  const handleForgotPassword = () => {
    if (!forgotEmail) {
      setForgotMsg('Please enter your registered admin email.');
      return;
    }
    setForgotMsg(`Password reset instructions sent to ${forgotEmail}`);
    setTimeout(() => {
      setShowForgot(false);
      setForgotMsg('');
      setForgotEmail('');
    }, 3000);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo-badge">
            <span>✦</span> Thirumal Housing Admin Portal <span>✦</span>
          </div>
          <h1 className="auth-title">Admin Login</h1>
          <p className="auth-subtitle">Sign in to access real estate CRM and management dashboard</p>
        </div>

        {error && (
          <div
            style={{
              padding: '12px 14px',
              backgroundColor: '#fee2e2',
              border: '1px solid #fca5a5',
              borderRadius: '8px',
              color: '#991b1b',
              fontSize: '0.85rem',
              marginBottom: '18px',
              fontWeight: '500'
            }}
          >
            {error}
          </div>
        )}

        {/* Demo Quick Fill helper */}
        <div className="auth-quick-creds">
          <div>
            <strong>Demo:</strong> admin@thirumalhousing.com / Admin@123
          </div>
          <button type="button" className="btn-fill-creds" onClick={handleFillDemo}>
            Fill Demo
          </button>
        </div>

        <form onSubmit={handleAdminLogin}>
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label className="form-label" htmlFor="login-email">Email Address</label>
            <input
              type="email"
              id="login-email"
              className="form-control"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group" style={{ marginBottom: '18px' }}>
            <label className="form-label" htmlFor="login-password">Password</label>
            <input
              type="password"
              id="login-password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn btn-purple"
            style={{ width: '100%', marginTop: '8px', padding: '12px' }}
          >
            {submitting ? 'Authenticating...' : 'Log In to Dashboard'}
          </button>

          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <button
              type="button"
              onClick={() => setShowForgot(!showForgot)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--purple-accent)',
                fontSize: '0.875rem',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              🔑 Forgot Password?
            </button>
          </div>
        </form>

        {/* Forgot Password Panel */}
        {showForgot && (
          <div
            style={{
              marginTop: '18px',
              padding: '16px',
              background: 'rgba(124, 58, 237, 0.07)',
              borderRadius: '10px',
              border: '1px solid rgba(124, 58, 237, 0.18)'
            }}
          >
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
              📧 Enter your registered admin email to receive a password reset link.
            </p>
            <input
              type="email"
              className="form-control"
              placeholder="admin@thirumalhousing.com"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              style={{ marginBottom: '10px' }}
            />
            <button
              type="button"
              onClick={handleForgotPassword}
              className="btn btn-purple"
              style={{ width: '100%', fontSize: '0.88rem' }}
            >
              Send Reset Link
            </button>
            {forgotMsg && (
              <div style={{ marginTop: '10px', fontSize: '0.85rem', textAlign: 'center', color: 'var(--success)', fontWeight: '600' }}>
                {forgotMsg}
              </div>
            )}
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <button
                type="button"
                onClick={() => setShowForgot(false)}
                style={{ background: 'none', border: 'none', fontSize: '0.82rem', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                ← Back to Login
              </button>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '24px', borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', fontSize: '0.84rem', textDecoration: 'none' }}>
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
