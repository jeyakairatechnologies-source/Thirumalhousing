import { useState, useEffect } from 'react';
import { X, Send, Phone, CheckCircle2, MessageCircle, Building } from 'lucide-react';
import { api } from '../services/api.js';

export default function EnquiryModal({ isOpen, onClose, selectedProject = null, projects = [] }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    project: '',
    projectName: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedProject) {
      setFormData(prev => ({
        ...prev,
        project: selectedProject._id,
        projectName: selectedProject.name,
        message: prev.message || `Hi, I am interested in ${selectedProject.name}. Please share plot availability, brochure, and pricing details.`
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        project: '',
        projectName: '',
        message: 'Hi, I would like to schedule a site visit and know more about your DTCP approved projects.'
      }));
    }
    setSuccess(false);
    setError('');
  }, [selectedProject, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'project') {
      const found = projects.find(p => p._id === value || p.slug === value);
      setFormData(prev => ({
        ...prev,
        project: value,
        projectName: found ? found.name : ''
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setError('Please provide your name and valid phone number.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await api.submitEnquiry({
        ...formData,
        source: selectedProject ? 'project-page' : 'website'
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 3000);
    } catch (err) {
      setError(err.message || 'Failed to submit enquiry. Please call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const projText = formData.projectName ? ` regarding *${formData.projectName}*` : '';
    const text = encodeURIComponent(
      `Hello Thirumal Housing, my name is ${formData.name || 'Valued Customer'}. I am inquiring${projText}.\nPhone: ${formData.phone || 'N/A'}\nMessage: ${formData.message || 'Please send brochure & pricing.'}`
    );
    window.open(`https://wa.me/919840012345?text=${text}`, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div
          style={{
            background: 'linear-gradient(135deg, var(--primary-900) 0%, var(--primary-800) 100%)',
            padding: '20px 24px',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '2px solid var(--gold-500)',
            flexShrink: 0
          }}
        >
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', color: '#ffffff', fontSize: '1.35rem', marginBottom: '4px' }}>
              Enquire / Book Site Visit
            </h3>
            <p style={{ color: 'var(--gold-300)', fontSize: '0.82rem', margin: 0 }}>
              {selectedProject ? `Project: ${selectedProject.name}` : 'Thirumal Housing - Prime Locations'}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#ffffff',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-scrollable-body">
          {success ? (
            <div style={{ textAlign: 'center', padding: '30px 10px' }}>
              <CheckCircle2 size={54} style={{ color: 'var(--primary-600)', margin: '0 auto 16px' }} />
              <h4 style={{ fontSize: '1.3rem', color: 'var(--primary-900)', marginBottom: '8px' }}>
                Thank You, {formData.name}!
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                Your enquiry has been received. Our senior property advisor will get in touch with you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {error && (
                <div
                  style={{
                    backgroundColor: '#fee2e2',
                    color: '#991b1b',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.85rem'
                  }}
                >
                  {error}
                </div>
              )}

              {/* Project Select */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '6px', color: 'var(--text-main)' }}>
                  Interested Project
                </label>
                <select
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    backgroundColor: '#f8fafc',
                    fontSize: '0.92rem',
                    outline: 'none'
                  }}
                >
                  <option value="">-- General Property Enquiry --</option>
                  {projects.map(p => (
                    <option key={p._id} value={p._id}>
                      {p.name} ({p.location?.city} - ₹{p.price?.startingFrom} Lakhs)
                    </option>
                  ))}
                </select>
              </div>

              {/* Name & Phone in responsive grid */}
              <div className="modal-inputs-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '6px', color: 'var(--text-main)' }}>
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Arun Kumar"
                    value={formData.name}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-light)',
                      fontSize: '0.92rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '6px', color: 'var(--text-main)' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. 98400 12345"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-light)',
                      fontSize: '0.92rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '6px', color: 'var(--text-main)' }}>
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="e.g. yourname@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    fontSize: '0.92rem',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Message */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '6px', color: 'var(--text-main)' }}>
                  Your Requirement or Message
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '6px' }}>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '14px', fontSize: '0.95rem' }}
                >
                  <Send size={16} /> {submitting ? 'Submitting Details...' : 'Submit Enquiry'}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: '#e6f9f0',
                    color: '#0d6832',
                    border: '1px solid #8ce3b5',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  <MessageCircle size={18} /> Or Enquire via WhatsApp Instantly
                </button>
              </div>

              <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                🔒 Your privacy is safeguarded. Zero spam guaranteed.
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
