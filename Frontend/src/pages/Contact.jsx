import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api.js';

export default function Contact() {
  const [settings, setSettings] = useState(null);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState({ submitting: false, success: false, error: '' });

  useEffect(() => {
    api.getSettings().then(data => { if (data) setSettings(data); }).catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      setStatus({ submitting: false, success: false, error: 'Please enter name and phone number.' });
      return;
    }
    setStatus({ submitting: true, success: false, error: '' });
    try {
      await api.submitEnquiry({
        name: form.name, phone: form.phone, email: form.email,
        message: form.message, source: 'website'
      });
      setStatus({ submitting: false, success: true, error: '' });
      setForm({ name: '', phone: '', email: '', message: '' });
    } catch (err) {
      setStatus({ submitting: false, success: false, error: err.message || 'Submission failed' });
    }
  };

  const phone          = settings?.phone        || '+91 98400 12345';
  const altPhone       = settings?.altPhone     || '+91 98400 67890';
  const whatsapp       = settings?.whatsappNumber || '919840012345';
  const email          = settings?.email        || 'thirumalhousing2018@gmail.com';
  const address        = settings?.address      || 'Thirumal Housing, Main Road, Kovilpatti & Sivakasi, Tamil Nadu';
  const officeHours    = settings?.officeHours  || 'Monday - Saturday: 9:00 AM - 7:00 PM | Sunday: 10:00 AM - 5:00 PM';
  const mapEmbed       = settings?.mapEmbed     || '';
  const pageTitle      = settings?.contactContent?.pageTitle    || 'Contact Thirumal Housing';
  const pageSubtitle   = settings?.contactContent?.pageSubtitle || 'Have a question about pricing or want to book a complimentary weekend site visit? We are here to guide you.';
  const bannerTitle    = settings?.contactContent?.bannerTitle  || 'Complimentary Site Visit Car';
  const siteVisitText  = settings?.contactContent?.siteVisitBanner || 'We provide free doorstep pickup and drop across Chennai for prospective families visiting our sites.';

  return (
    <div>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(rgba(6, 29, 21, 0.85), rgba(6, 29, 21, 0.9)), url("https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1800&q=80")',
          backgroundSize: 'cover', backgroundPosition: 'center',
          color: '#ffffff', padding: '60px 0 50px', textAlign: 'center'
        }}
      >
        <div className="container">
          <span className="section-tag" style={{ background: 'rgba(197, 160, 89, 0.2)', color: 'var(--gold-300)', borderColor: 'var(--gold-500)' }}>
            Get in Touch
          </span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', fontWeight: '800', color: '#ffffff', marginBottom: '12px' }}>
            {pageTitle}
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto' }}>
            {pageSubtitle}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'start' }}>

            {/* Contact Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="card" style={{ padding: '30px' }}>
                <h2 style={{ fontSize: '1.6rem', color: 'var(--primary-900)', marginBottom: '20px' }}>
                  Head Office & Sales Center
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--primary-50)', color: 'var(--primary-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <MapPin size={20} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', color: 'var(--primary-900)', marginBottom: '4px' }}>Office Address:</strong>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', margin: 0 }}>{address}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--gold-100)', color: 'var(--gold-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Phone size={20} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', color: 'var(--primary-900)', marginBottom: '4px' }}>Direct Phone Lines:</strong>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <a href={`tel:${phone.replace(/\s/g, '')}`} style={{ color: 'var(--primary-800)', fontWeight: '600', fontSize: '0.95rem' }}>
                          {phone} (Sales & Site Visits)
                        </a>
                        <a href={`tel:${altPhone.replace(/\s/g, '')}`} style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                          {altPhone} (Customer Care)
                        </a>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#e6f9f0', color: '#0d6832', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <MessageCircle size={20} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', color: 'var(--primary-900)', marginBottom: '4px' }}>WhatsApp Desk:</strong>
                      <a
                        href={`https://wa.me/${whatsapp}?text=Hello%20Thirumal%20Housing,%20I%20would%20like%20to%20connect%20with%20a%20sales%20representative.`}
                        target="_blank" rel="noopener noreferrer"
                        style={{ color: '#0d6832', fontWeight: '600', fontSize: '0.95rem' }}
                      >
                        +{whatsapp} (Instant Chat & Brochure)
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--primary-50)', color: 'var(--primary-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Mail size={20} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', color: 'var(--primary-900)', marginBottom: '4px' }}>Email Address:</strong>
                      <a href={`mailto:${email}`} style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>{email}</a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--primary-50)', color: 'var(--primary-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Clock size={20} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', color: 'var(--primary-900)', marginBottom: '4px' }}>Working Hours:</strong>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
                        {officeHours.split('|').map((line, i) => (
                          <span key={i}>{line.trim()}{i < officeHours.split('|').length - 1 && <br />}</span>
                        ))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Site Visit Banner */}
              <div style={{ backgroundColor: 'var(--primary-900)', color: '#ffffff', borderRadius: 'var(--radius-lg)', padding: '24px', border: '2px solid var(--gold-500)' }}>
                <h3 style={{ color: 'var(--gold-400)', fontSize: '1.25rem', marginBottom: '8px' }}>{bannerTitle}</h3>
                <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{siteVisitText}</p>
              </div>

              {/* Map Embed */}
              {mapEmbed && (
                <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-light)' }}>
                  <iframe
                    src={mapEmbed}
                    width="100%" height="250" style={{ border: 0, display: 'block' }}
                    allowFullScreen="" loading="lazy"
                    title="Office Location"
                  />
                </div>
              )}
            </div>

            {/* Contact Form */}
            <div className="card" style={{ padding: '36px' }}>
              <h2 style={{ fontSize: '1.8rem', color: 'var(--primary-900)', marginBottom: '8px' }}>Send Us a Message</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px' }}>
                Fill in the form below and our customer relationship manager will reach out within 30 minutes.
              </p>

              {status.success ? (
                <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                  <CheckCircle2 size={50} style={{ color: 'var(--primary-600)', margin: '0 auto 16px' }} />
                  <h3 style={{ color: 'var(--primary-900)', marginBottom: '8px' }}>Message Received!</h3>
                  <p style={{ color: 'var(--text-muted)' }}>Thank you for reaching out. We will call you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {status.error && (
                    <div style={{ padding: '10px 14px', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '6px', fontSize: '0.85rem' }}>
                      {status.error}
                    </div>
                  )}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '6px' }}>Your Full Name *</label>
                    <input type="text" required placeholder="e.g. Arun Kumar" value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.92rem', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '6px' }}>Phone Number *</label>
                    <input type="tel" required placeholder="e.g. 98400 12345" value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.92rem', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '6px' }}>Email Address</label>
                    <input type="email" placeholder="e.g. yourname@mail.com" value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.92rem', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '6px' }}>Your Message or Property Preferences</label>
                    <textarea rows={4} placeholder="Share your preferred location, budget, or preferred time for a call..." value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.92rem', outline: 'none' }} />
                  </div>
                  <button type="submit" disabled={status.submitting} className="btn btn-primary btn-lg" style={{ marginTop: '8px' }}>
                    <Send size={18} /> {status.submitting ? 'Sending...' : 'SEND INQUIRY'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
