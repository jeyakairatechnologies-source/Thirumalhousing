import { useState, useEffect } from 'react';
import { Sparkles, Calendar, CheckCircle2, Phone, MessageCircle, Send, Building } from 'lucide-react';
import { api } from '../services/api.js';

export default function Enquiry() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    project: '',
    date: '',
    timeSlot: 'morning',
    message: ''
  });
  const [status, setStatus] = useState({ submitting: false, success: false, error: '' });

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.getProjects();
        setProjects(data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      setStatus({ submitting: false, success: false, error: 'Name and phone are required.' });
      return;
    }

    setStatus({ submitting: true, success: false, error: '' });
    try {
      const selectedProj = projects.find(p => p._id === form.project);
      await api.submitEnquiry({
        name: form.name,
        phone: form.phone,
        email: form.email,
        project: form.project || null,
        projectName: selectedProj ? selectedProj.name : '',
        message: `[Site Visit Request] Date: ${form.date || 'Flexible'} | Preferred Time: ${form.timeSlot}. Notes: ${form.message}`,
        source: 'website'
      });
      setStatus({ submitting: false, success: true, error: '' });
    } catch (err) {
      setStatus({ submitting: false, success: false, error: err.message || 'Error booking visit' });
    }
  };

  return (
    <div>
      <section
        style={{
          background: 'linear-gradient(rgba(6, 29, 21, 0.85), rgba(6, 29, 21, 0.9)), url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#ffffff',
          padding: '60px 0 50px',
          textAlign: 'center'
        }}
      >
        <div className="container" style={{ maxWidth: '750px' }}>
          <span className="section-tag" style={{ background: 'rgba(197, 160, 89, 0.2)', color: 'var(--gold-300)', borderColor: 'var(--gold-500)' }}>
            Complimentary Guided Visits
          </span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', fontWeight: '800', color: '#ffffff', marginBottom: '12px' }}>
            Book Your Free Site Visit
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem' }}>
            Visit our prime DTCP layouts with our property advisors. Free doorstep pickup & drop available on weekends.
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <div className="card" style={{ padding: '40px' }}>
            {status.success ? (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <CheckCircle2 size={54} style={{ color: 'var(--primary-600)', margin: '0 auto 16px' }} />
                <h3 style={{ color: 'var(--primary-900)', fontSize: '1.6rem', marginBottom: '8px' }}>
                  Site Visit Scheduled!
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '24px' }}>
                  Thank you, <strong>{form.name}</strong>. Our site coordination manager will call you at <strong>{form.phone}</strong> to confirm the pickup timing and location.
                </p>
                <a
                  href={`https://wa.me/919840012345?text=${encodeURIComponent(`Hello Thirumal Housing, I just requested a site visit for ${form.name} (${form.phone}).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold"
                >
                  <MessageCircle size={18} /> Ping Us on WhatsApp for Live Updates
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {status.error && (
                  <div style={{ padding: '10px 14px', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '6px', fontSize: '0.85rem' }}>
                    {status.error}
                  </div>
                )}

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' }}>
                    Select Township Project
                  </label>
                  <select
                    value={form.project}
                    onChange={(e) => setForm({ ...form, project: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.92rem', outline: 'none' }}
                  >
                    <option value="">-- Let our expert recommend the best project --</option>
                    {projects.map(p => (
                      <option key={p._id} value={p._id}>
                        {p.name} ({p.location?.city} - From ₹{p.price?.startingFrom} Lakhs)
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' }}>
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Arun Kumar"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.92rem', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98400 12345"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.92rem', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' }}>
                      Preferred Visit Date
                    </label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.92rem', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' }}>
                      Preferred Time Slot
                    </label>
                    <select
                      value={form.timeSlot}
                      onChange={(e) => setForm({ ...form, timeSlot: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.92rem', outline: 'none' }}
                    >
                      <option value="morning">Morning (9:30 AM – 12:00 PM)</option>
                      <option value="afternoon">Afternoon (1:00 PM – 3:30 PM)</option>
                      <option value="evening">Evening (4:00 PM – 6:30 PM)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' }}>
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. yourname@mail.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.92rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' }}>
                    Additional Requests / Pickup Location
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Please arrange cab pickup from Tambaram Railway Station..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.92rem', outline: 'none' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status.submitting}
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', marginTop: '10px' }}
                >
                  <Send size={18} /> {status.submitting ? 'Scheduling Visit...' : 'CONFIRM SITE VISIT REQUEST'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
