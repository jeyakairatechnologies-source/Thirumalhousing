import { useState, useEffect } from 'react';
import { api } from '../services/api.js';

export default function AdminBanners() {
  const defaultBanners = [
    {
      slot: 1,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1500&h=500&q=80',
      title: 'DTCP & RERA Approved Residential Plots in Prime Locations',
      badge: 'DEFAULT / ACTIVE'
    },
    {
      slot: 2,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1500&h=500&q=80',
      title: 'Grand Gated Communities with Clubhouse & Swimming Pool',
      badge: 'SLOT 2'
    },
    {
      slot: 3,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1500&h=500&q=80',
      title: 'Spot Booking Discounts & Immediate Free Registration',
      badge: 'SLOT 3'
    }
  ];

  const [banners, setBanners] = useState(defaultBanners);
  const [loading, setLoading] = useState(true);
  const [savingSlot, setSavingSlot] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  useEffect(() => {
    const loadBanners = async () => {
      try {
        const settings = await api.getSettings();
        if (settings && Array.isArray(settings.banners) && settings.banners.length > 0) {
          const merged = defaultBanners.map((d, i) => ({
            ...d,
            ...(settings.banners[i] || {})
          }));
          setBanners(merged);
        }
      } catch (err) {
        console.warn('Error fetching banners:', err);
      } finally {
        setLoading(false);
      }
    };
    loadBanners();
  }, []);

  const handleInputChange = (slotIndex, field, value) => {
    setBanners((prev) =>
      prev.map((b, idx) => (idx === slotIndex ? { ...b, [field]: value } : b))
    );
  };

  const handleFileUpload = async (slotIndex, file) => {
    if (!file) return;
    try {
      const url = await api.uploadFile(file);
      handleInputChange(slotIndex, 'image', url);
      showToast(`Image uploaded for Slot ${slotIndex + 1}`);
    } catch (err) {
      alert('Upload failed: ' + err.message);
    }
  };

  const handleSaveSlot = async (e, slotIndex) => {
    e.preventDefault();
    setSavingSlot(slotIndex + 1);
    try {
      const settings = (await api.getSettings()) || {};
      const updatedBanners = [...banners];
      await api.updateSettings({ ...settings, banners: updatedBanners });
      showToast(`Slot ${slotIndex + 1} saved successfully!`);
    } catch (err) {
      showToast(`Error: ${err.message}`);
    } finally {
      setSavingSlot(null);
    }
  };

  return (
    <div>
      {/* Toast Alert */}
      {toastMsg && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 999,
            backgroundColor: 'var(--text-primary)',
            color: '#fff',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: 'var(--shadow-lg)',
            fontSize: '0.9rem',
            fontWeight: 600
          }}
        >
          {toastMsg}
        </div>
      )}

      {/* Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">Index Banners</h2>
          <p className="page-subtitle">Manage desktop and mobile hero banners on the storefront homepage</p>
        </div>
      </div>

      {/* Banner Preview Cards (Slot 1, 2, 3 - Matching Hisuvai) */}
      <div className="banner-preview-grid">
        {banners.map((b, idx) => (
          <div key={idx} className="banner-card">
            <div className="banner-card-header">
              <span className="banner-card-title">Desktop Banner {idx + 1}</span>
              <span className="banner-card-badge">{b.badge || `SLOT ${idx + 1}`}</span>
            </div>
            <div className="banner-card-preview">
              <img src={b.image} alt={`Desktop Banner ${idx + 1}`} />
            </div>
            <div className="banner-card-footer">
              Size: 1500 * 500 px
            </div>
          </div>
        ))}
      </div>

      {/* Upload Custom Banners Section (Matching Hisuvai) */}
      <div className="banner-uploader-card">
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '18px' }}>
          Upload Custom Desktop Banners
        </h3>

        {banners.map((b, idx) => (
          <form
            key={idx}
            className="banner-upload-row"
            onSubmit={(e) => handleSaveSlot(e, idx)}
          >
            <span className="banner-upload-slot">Slot {idx + 1}</span>

            <div className="banner-thumb-mini">
              <img src={b.image} alt={`Thumb ${idx + 1}`} />
            </div>

            <div className="banner-form-inputs">
              <input
                type="file"
                className="form-control"
                style={{ padding: '6px 10px', maxWidth: '200px' }}
                accept="image/*"
                onChange={(e) => handleFileUpload(idx, e.target.files[0])}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Banner Headline (e.g. DTCP Approved Residential Plots)"
                value={b.title || ''}
                onChange={(e) => handleInputChange(idx, 'title', e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={savingSlot === idx + 1}
              className="btn btn-purple"
              style={{ padding: '8px 16px' }}
            >
              {savingSlot === idx + 1 ? 'Saving...' : `Save Slot ${idx + 1}`}
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}
