import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaChevronRight,
  FaClock,
  FaStar,
  FaShieldAlt,
  FaRoad,
  FaTree,
  FaLightbulb,
  FaTint,
  FaUniversity,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaCrown
} from 'react-icons/fa';
import { api } from '../services/api.js';
import logo from '../assets/logo.png';

export default function Footer() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    api.getSettings().then(data => { if (data) setSettings(data); }).catch(() => {});
  }, []);

  const copyright = settings?.footerContent?.copyright || `© ${new Date().getFullYear()} Thirumal Housing. All Rights Reserved.`;

  return (
    <footer id="contact" style={{ backgroundColor: '#0a3233', color: '#ffffff', position: 'relative', overflow: 'hidden' }}>

      {/* Decorative background ambient glows */}
      <div style={{ position: 'absolute', top: '-80px', left: '-80px', width: '320px', height: '320px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(197,160,89,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '40px', right: '-60px', width: '260px', height: '260px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(197,160,89,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Gold top accent bar */}
      <div style={{ width: '100%', height: '4px', background: 'linear-gradient(90deg, transparent, #d6b46e 30%, #c5a059 70%, transparent)' }} />

      {/* Main footer content */}
      <div className="container" style={{ paddingTop: '64px', paddingBottom: '40px', position: 'relative', zIndex: 2, paddingLeft: '24px', paddingRight: '24px' }}>
        <div className="footer-grid">

          {/* Column 1: Brand */}
          <div>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <img src={logo} alt="Thirumal Housing Logo" style={{ height: '64px', objectFit: 'contain' }} />
            </div>

            <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: '1.8', marginBottom: '22px', maxWidth: '300px' }}>
              Building trust for over 15 years in Kovilpatti & Sivakasi. Your dream property, delivered with transparency, quality, and legal integrity.
            </p>

            {/* Rating badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              backgroundColor: 'rgba(197,160,89,0.12)', border: '1px solid rgba(197,160,89,0.3)',
              borderRadius: '999px', padding: '8px 16px', marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', gap: '3px', color: '#d6b46e' }}>
                {[1,2,3,4,5].map(s => <FaStar key={s} size={12} />)}
              </div>
              <span style={{ fontSize: '0.82rem', color: '#d6b46e', fontWeight: '700', marginLeft: '4px' }}>4.9 / 5 Rating</span>
            </div>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { icon: <FaFacebookF size={15}/>, color: '#1877f2', href: '#' },
                { icon: <FaInstagram size={15}/>, color: '#e1306c', href: '#' },
                { icon: <FaYoutube size={15}/>, color: '#ff0000', href: '#' },
                { icon: <FaWhatsapp size={16}/>, color: '#25d366', href: 'https://wa.me/918098500012' },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{
                    width: '38px', height: '38px', borderRadius: '10px',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#cbd5e1', transition: 'all 0.25s'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = s.color; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = s.color; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#cbd5e1'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.78rem', color: '#d6b46e', marginBottom: '22px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '20px', height: '2px', backgroundColor: '#d6b46e', borderRadius: '2px' }} />
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '11px', padding: 0 }}>
              {[
                { label: 'Home', href: '/#home', isInternal: false },
                { label: 'About Us', href: '/#about', isInternal: false },
                { label: 'Ongoing Projects', href: '/#ongoing', isInternal: false },
                { label: 'Upcoming Projects', href: '/#upcoming', isInternal: false },
                { label: 'Privacy Policy', href: '/privacy-policy', isInternal: true },
                { label: 'Terms & Conditions', href: '/terms-conditions', isInternal: true },
                { label: 'Contact Us', href: '/#contact', isInternal: false },
              ].map((link, i) => (
                <li key={i}>
                  {link.isInternal ? (
                    <Link to={link.href}
                      style={{ color: '#94a3b8', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', transition: 'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#d6b46e'; e.currentTarget.style.paddingLeft = '6px'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.paddingLeft = '0'; }}
                    >
                      <FaChevronRight size={11} style={{ color: '#d6b46e', flexShrink: 0 }} />
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href}
                      style={{ color: '#94a3b8', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', transition: 'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#d6b46e'; e.currentTarget.style.paddingLeft = '6px'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.paddingLeft = '0'; }}
                    >
                      <FaChevronRight size={11} style={{ color: '#d6b46e', flexShrink: 0 }} />
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>

            {/* DTCP Badge */}
            <div style={{
              marginTop: '24px', background: 'linear-gradient(135deg, rgba(197,160,89,0.15), rgba(197,160,89,0.05))',
              border: '1px solid rgba(197,160,89,0.35)', borderRadius: '10px', padding: '12px 14px',
              display: 'flex', alignItems: 'center', gap: '10px'
            }}>
              <FaShieldAlt size={20} color="#d6b46e" />
              <div>
                <div style={{ fontSize: '0.7rem', fontWeight: '800', letterSpacing: '0.08em', color: '#d6b46e' }}>DTCP & RERA APPROVED</div>
                <div style={{ fontSize: '0.62rem', color: '#94a3b8', marginTop: '2px' }}>TN/21/Layout/0246/2026</div>
              </div>
            </div>
          </div>

          {/* Column 3: Amenities */}
          <div>
            <h4 style={{ fontSize: '0.78rem', color: '#d6b46e', marginBottom: '22px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '20px', height: '2px', backgroundColor: '#d6b46e', borderRadius: '2px' }} />
              Amenities
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', padding: 0 }}>
              {[
                { icon: <FaRoad size={14} color="#d6b46e" />, label: 'Wide Black Top Roads' },
                { icon: <FaShieldAlt size={14} color="#d6b46e" />, label: '24×7 Security' },
                { icon: <FaTree size={14} color="#d6b46e" />, label: "Children's Park" },
                { icon: <FaLightbulb size={14} color="#d6b46e" />, label: 'Street Lights' },
                { icon: <FaTint size={14} color="#d6b46e" />, label: 'Water Supply' },
                { icon: <FaUniversity size={14} color="#d6b46e" />, label: 'Bank Loan Facility' },
              ].map((item, i) => (
                <li key={i} style={{ color: '#94a3b8', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ width: '20px', display: 'flex', justifyContent: 'center' }}>{item.icon}</span>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 style={{ fontSize: '0.78rem', color: '#d6b46e', marginBottom: '22px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '20px', height: '2px', backgroundColor: '#d6b46e', borderRadius: '2px' }} />
              Contact Us
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { icon: <FaPhoneAlt size={13}/>, text: '+91 80985 00012', href: 'tel:+918098500012' },
                { icon: <FaEnvelope size={13}/>, text: 'thirumalhousing2018@gmail.com', href: 'mailto:thirumalhousing2018@gmail.com' },
              ].map((item, i) => (
                <a key={i} href={item.href}
                  style={{ display: 'flex', gap: '12px', alignItems: 'center', color: '#94a3b8', fontSize: '0.88rem', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#d6b46e'}
                  onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
                >
                  <div style={{ width: '34px', height: '34px', borderRadius: '8px', backgroundColor: 'rgba(197,160,89,0.1)', border: '1px solid rgba(197,160,89,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d6b46e', flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  {item.text}
                </a>
              ))}

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', color: '#94a3b8', fontSize: '0.88rem' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '8px', backgroundColor: 'rgba(197,160,89,0.1)', border: '1px solid rgba(197,160,89,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d6b46e', flexShrink: 0, marginTop: '2px' }}>
                  <FaMapMarkerAlt size={13}/>
                </div>
                <span>Thirumal Nagar, Kovilpatti,<br/>Tamil Nadu – 628 501</span>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: '#94a3b8', fontSize: '0.88rem' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '8px', backgroundColor: 'rgba(197,160,89,0.1)', border: '1px solid rgba(197,160,89,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d6b46e', flexShrink: 0 }}>
                  <FaClock size={13}/>
                </div>
                <span>Mon – Sun: 9:00 AM – 8:00 PM</span>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/918098500012?text=Hello%20Thirumal%20Housing,%20I%20am%20interested%20in%20a%20property."
              target="_blank" rel="noopener noreferrer"
              style={{
                marginTop: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                backgroundColor: '#25d366', color: '#ffffff', borderRadius: '10px',
                padding: '12px 20px', fontWeight: '700', fontSize: '0.88rem',
                textDecoration: 'none', boxShadow: '0 4px 16px rgba(37,211,102,0.3)', transition: 'all 0.25s'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(37,211,102,0.45)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(37,211,102,0.3)'; }}
            >
              <FaWhatsapp size={18} /> Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(197,160,89,0.3) 30%, rgba(197,160,89,0.3) 70%, transparent)', margin: '48px 0 24px' }} />

        {/* Bottom Bar */}
        <div className="footer-bottom-container">
          <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>{copyright}</div>
          <div className="footer-bottom-links">
            <Link to="/privacy-policy" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#d6b46e'}
              onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
            >Privacy Policy</Link>
            <span style={{ color: 'rgba(197,160,89,0.3)' }}>|</span>
            <Link to="/terms-conditions" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#d6b46e'}
              onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
            >Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
