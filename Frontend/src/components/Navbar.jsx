import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Phone,
  X,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { api } from '../services/api.js';
import logo from '../assets/logo.png';

export default function Navbar({ onOpenEnquiry }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [settings, setSettings] = useState(null);
  const location = useLocation();

  useEffect(() => {
    api.getSettings().then(data => { if (data) setSettings(data); }).catch(() => { });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 900,
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.98)' : '#ffffff',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.08)' : '0 1px 3px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s ease',
        borderBottom: '1px solid var(--border-light)'
      }}
    >
      {/* Top micro-bar with contact & approvals */}
      <div
        style={{
          background: 'linear-gradient(90deg, var(--primary-900) 0%, var(--primary-800) 100%)',
          color: '#ffffff',
          fontSize: '0.8rem',
          padding: '6px 0',
          borderBottom: '1px solid rgba(197, 160, 89, 0.3)'
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-300)' }}>
              <ShieldCheck size={14} /> {settings?.navbarContent?.topBarText || 'DTCP & RERA Approved Layouts'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <a
              href={`tel:${(settings?.phone || '+91 80985 00012').replace(/\s/g, '')}`}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ffffff', textDecoration: 'none' }}
            >
              <Phone size={13} style={{ color: 'var(--gold-400)' }} /> {settings?.phone || '+91 80985 00012'}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px', padding: '0 16px', position: 'relative' }}>
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', minWidth: 0, flexShrink: 1 }}>
          <img src={logo} alt="Thirumal Housing Logo" style={{ height: '54px', objectFit: 'contain' }} />
        </Link>

        {/* Right Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          {/* CTA Enquire Button - NEVER CUT OFF ON MOBILE */}
          <button
            onClick={() => onOpenEnquiry && onOpenEnquiry()}
            className="btn btn-gold btn-sm"
            style={{
              padding: '8px 15px',
              fontSize: '0.84rem',
              letterSpacing: '0.02em',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            <Sparkles size={14} /> Enquire Now
          </button>

          {/* Hamburger Menu Button - ON ALL VIEWS */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: menuOpen ? 'rgba(10, 50, 51, 0.08)' : 'transparent',
              border: '1.5px solid rgba(10, 50, 51, 0.18)',
              borderRadius: '8px',
              padding: '8px 10px',
              cursor: 'pointer',
              color: 'var(--primary-900)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              outline: 'none',
              flexShrink: 0
            }}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? (
              <X size={22} color="var(--primary-900)" />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '22px', alignItems: 'flex-end' }}>
                <span style={{ display: 'block', height: '2.5px', width: '100%', backgroundColor: 'var(--primary-900)', borderRadius: '2px' }}></span>
                <span style={{ display: 'block', height: '2.5px', width: '70%', backgroundColor: 'var(--primary-900)', borderRadius: '2px' }}></span>
              </div>
            )}
          </button>
        </div>
      </nav>

      {/* Menu Drawer - EXACT 5 ITEMS ONLY, NOTHING ON THE SIDE */}
      {menuOpen && (
        <div
          style={{
            backgroundColor: '#ffffff',
            borderTop: '1px solid var(--border-light)',
            borderBottom: '3px solid var(--gold-500)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.14)',
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 999,
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <div className="container" style={{ maxWidth: '420px', margin: '0 auto', padding: '24px 20px' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}
            >
              {[
                { label: 'Home', href: '/#home' },
                { label: 'About Us', href: '/#about' },
                { label: 'Ongoing', href: '/#ongoing' },
                { label: 'Upcoming', href: '/#upcoming' },
                { label: 'Contact', href: '/#contact' },
              ].map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    padding: '14px 20px',
                    borderRadius: '8px',
                    backgroundColor: '#f8fafa',
                    color: 'var(--primary-900)',
                    fontWeight: '700',
                    fontSize: '1.05rem',
                    textDecoration: 'none',
                    textAlign: 'center',
                    border: '1px solid #e2eded',
                    transition: 'all 0.2s ease',
                    display: 'block'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = '#0a3233';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderColor = '#0a3233';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = '#f8fafa';
                    e.currentTarget.style.color = 'var(--primary-900)';
                    e.currentTarget.style.borderColor = '#e2eded';
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
