import { useState, useEffect } from 'react';
import { api } from '../services/api.js';

export default function AdminContent() {
  const [activeTab, setActiveTab] = useState('home');
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState('');
  const [saving, setSaving] = useState(false);

  const TABS = ['home', 'banners', 'about', 'ongoing', 'ongoing', 'whyUs', 'cta', 'contact', 'footer', 'navbar'];

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await api.getSettings();
        if (data) setSettings(data);
      } catch (err) {
        console.warn('Error fetching settings:', err);
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const handleChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (parent, field, value) => {
    setSettings(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }));
  };

  const handleDeepChange = (parent, child, field, value) => {
    setSettings(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [child]: { ...(prev[parent]?.[child] || {}), [field]: value }
      }
    }));
  };

  const handleBannerChange = (index, field, value) => {
    const newBanners = [...(settings.banners || [])];
    newBanners[index] = { ...newBanners[index], [field]: value };
    setSettings({ ...settings, banners: newBanners });
  };

  const handleQuickLinkChange = (index, field, value) => {
    const links = [...(settings?.footerContent?.quickLinks || [])];
    links[index] = { ...links[index], [field]: value };
    handleNestedChange('footerContent', 'quickLinks', links);
  };

  const handleFileUpload = async (parent, field, file, index = null) => {
    if (!file) return;
    try {
      const url = await api.uploadFile(file);
      if (parent === 'banners') {
        handleBannerChange(index, 'image', url);
      } else {
        handleNestedChange(parent, field, url);
      }
      showToast('Image uploaded successfully');
    } catch (err) {
      alert('Upload failed: ' + err.message);
    }
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      await api.updateSettings(settings);
      showToast('Content saved successfully!');
    } catch (err) {
      showToast(`Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ padding: '40px' }}>Loading...</div>;
  if (!settings) return <div style={{ padding: '40px', color: 'red' }}>Failed to load settings.</div>;

  return (
    <div>
      {/* Toast */}
      {toastMsg && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 999,
          backgroundColor: '#1a1a2e', color: '#fff',
          padding: '12px 20px', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          fontSize: '0.9rem', fontWeight: 600
        }}>
          {toastMsg}
        </div>
      )}

      {/* Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">Site Content</h2>
          <p className="page-subtitle">Manage all customer-visible website text, images, and settings</p>
        </div>
        <button onClick={handleSave} className="btn btn-primary" disabled={saving}>
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      {/* Tab Bar */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', borderBottom: '2px solid var(--border-light)', flexWrap: 'wrap' }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 16px', border: 'none', background: 'none',
              fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer',
              textTransform: 'capitalize',
              color: activeTab === tab ? 'var(--primary-700)' : 'var(--text-muted)',
              borderBottom: activeTab === tab ? '3px solid var(--primary-600)' : '3px solid transparent',
              marginBottom: '-2px'
            }}
          >
            {tab === 'whyUs' ? 'Why Us' : tab === 'cta' ? 'CTA Section' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="card" style={{ padding: '28px' }}>

        {/* ── HOME TAB ─────────────────────────────── */}
        {activeTab === 'home' && settings.homeContent && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-900)', marginBottom: '4px' }}>Home Page — Hero Section</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: 0 }}>These fields control the text on the main hero area of the home page.</p>

            <div className="form-group">
              <label>Hero Title (Main Headline)</label>
              <input type="text" className="form-control" value={settings.homeContent.heroTitle || ''}
                onChange={e => handleNestedChange('homeContent', 'heroTitle', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Hero Subtitle</label>
              <input type="text" className="form-control" value={settings.homeContent.heroSubtitle || ''}
                onChange={e => handleNestedChange('homeContent', 'heroSubtitle', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Hero Description</label>
              <textarea className="form-control" rows="2" value={settings.homeContent.heroDescription || ''}
                onChange={e => handleNestedChange('homeContent', 'heroDescription', e.target.value)} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label>Primary CTA Button Text</label>
                <input type="text" className="form-control" value={settings.homeContent.ctaText || ''}
                  onChange={e => handleNestedChange('homeContent', 'ctaText', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Primary CTA Link</label>
                <input type="text" className="form-control" placeholder="/projects" value={settings.homeContent.ctaLink || ''}
                  onChange={e => handleNestedChange('homeContent', 'ctaLink', e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label>Secondary CTA Button Text</label>
              <input type="text" className="form-control" value={settings.homeContent.ctaSecondaryText || ''}
                onChange={e => handleNestedChange('homeContent', 'ctaSecondaryText', e.target.value)} />
            </div>

            <h4 style={{ marginTop: '8px', color: 'var(--primary-900)' }}>Statistics / Counters</h4>
            {(settings.homeContent.stats || []).map((stat, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Value #{i + 1}</label>
                  <input type="text" className="form-control" value={stat.value || ''}
                    onChange={e => {
                      const stats = [...settings.homeContent.stats];
                      stats[i] = { ...stats[i], value: e.target.value };
                      handleNestedChange('homeContent', 'stats', stats);
                    }} />
                </div>
                <div className="form-group">
                  <label>Label #{i + 1}</label>
                  <input type="text" className="form-control" value={stat.label || ''}
                    onChange={e => {
                      const stats = [...settings.homeContent.stats];
                      stats[i] = { ...stats[i], label: e.target.value };
                      handleNestedChange('homeContent', 'stats', stats);
                    }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── BANNERS TAB ──────────────────────────── */}
        {activeTab === 'banners' && (
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-900)', marginBottom: '8px' }}>Hero Banners / Background Images</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '0.88rem' }}>Manage the hero slider images (Recommended: 1500 × 500 px). The first banner also serves as the hero background.</p>

            {(settings.banners || []).map((b, idx) => (
              <div key={idx} style={{ marginBottom: '30px', paddingBottom: '24px', borderBottom: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                  <img src={b.image} alt={`Slot ${idx + 1}`} style={{ width: '220px', height: '90px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border-light)' }} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ fontWeight: 700, color: 'var(--primary-900)' }}>Banner Slot {idx + 1}</div>
                    <input type="file" accept="image/*"
                      onChange={e => handleFileUpload('banners', 'image', e.target.files[0], idx)} />
                    <div className="form-group" style={{ margin: 0 }}>
                      <label>Banner Title / Caption</label>
                      <input type="text" className="form-control" placeholder="Banner Title" value={b.title || ''}
                        onChange={e => handleBannerChange(idx, 'title', e.target.value)} />
                    </div>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label>Or paste image URL</label>
                      <input type="text" className="form-control" placeholder="https://..." value={b.image || ''}
                        onChange={e => handleBannerChange(idx, 'image', e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── ABOUT TAB ───────────────────────────── */}
        {activeTab === 'about' && settings.aboutContent && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-900)' }}>About Page & About Section</h3>

            <div className="form-group">
              <label>Page Title (H1)</label>
              <input type="text" className="form-control" value={settings.aboutContent.pageTitle || ''}
                onChange={e => handleNestedChange('aboutContent', 'pageTitle', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Page Subtitle</label>
              <textarea className="form-control" rows="2" value={settings.aboutContent.pageSubtitle || ''}
                onChange={e => handleNestedChange('aboutContent', 'pageSubtitle', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Section Title ("Who We Are" heading)</label>
              <input type="text" className="form-control" value={settings.aboutContent.title || ''}
                onChange={e => handleNestedChange('aboutContent', 'title', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Paragraph 1</label>
              <textarea className="form-control" rows="4" value={settings.aboutContent.text1 || ''}
                onChange={e => handleNestedChange('aboutContent', 'text1', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Paragraph 2</label>
              <textarea className="form-control" rows="4" value={settings.aboutContent.text2 || ''}
                onChange={e => handleNestedChange('aboutContent', 'text2', e.target.value)} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label>Vision</label>
                <textarea className="form-control" rows="3" value={settings.aboutContent.vision || ''}
                  onChange={e => handleNestedChange('aboutContent', 'vision', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Mission</label>
                <textarea className="form-control" rows="3" value={settings.aboutContent.mission || ''}
                  onChange={e => handleNestedChange('aboutContent', 'mission', e.target.value)} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label>CTA Button Text</label>
                <input type="text" className="form-control" value={settings.aboutContent.ctaText || ''}
                  onChange={e => handleNestedChange('aboutContent', 'ctaText', e.target.value)} />
              </div>
              <div className="form-group">
                <label>CTA Link</label>
                <input type="text" className="form-control" value={settings.aboutContent.ctaLink || ''}
                  onChange={e => handleNestedChange('aboutContent', 'ctaLink', e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label>About Image</label>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <img src={settings.aboutContent.image} alt="About" style={{ width: '250px', borderRadius: '8px', border: '1px solid var(--border-light)' }} />
                <div>
                  <input type="file" accept="image/*"
                    onChange={e => handleFileUpload('aboutContent', 'image', e.target.files[0])} />
                  <div className="form-group" style={{ marginTop: '10px' }}>
                    <label>Or paste URL</label>
                    <input type="text" className="form-control" value={settings.aboutContent.image || ''}
                      onChange={e => handleNestedChange('aboutContent', 'image', e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── ONGOING TAB ─────────────────────────── */}
        {activeTab === 'ongoing' && settings.ongoingContent && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-900)' }}>Ongoing Projects Section</h3>
            <div className="form-group">
              <label>Section Tag (small badge text)</label>
              <input type="text" className="form-control" value={settings.ongoingContent.tag || ''}
                onChange={e => handleNestedChange('ongoingContent', 'tag', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Section Title</label>
              <input type="text" className="form-control" value={settings.ongoingContent.title || ''}
                onChange={e => handleNestedChange('ongoingContent', 'title', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Section Subtitle</label>
              <textarea className="form-control" rows="3" value={settings.ongoingContent.subtitle || ''}
                onChange={e => handleNestedChange('ongoingContent', 'subtitle', e.target.value)} />
            </div>
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" checked={settings.ongoingContent.visible !== false}
                  onChange={e => handleNestedChange('ongoingContent', 'visible', e.target.checked)} />
                Show this section on the home page
              </label>
            </div>
          </div>
        )}

        {/* ── ongoing TAB ────────────────────────── */}
        {activeTab === 'ongoing' && settings.ongoingContent && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-900)' }}>ongoing Projects Section</h3>
            <div className="form-group">
              <label>Section Tag</label>
              <input type="text" className="form-control" value={settings.ongoingContent.tag || ''}
                onChange={e => handleNestedChange('ongoingContent', 'tag', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Section Title</label>
              <input type="text" className="form-control" value={settings.ongoingContent.title || ''}
                onChange={e => handleNestedChange('ongoingContent', 'title', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Section Subtitle</label>
              <textarea className="form-control" rows="3" value={settings.ongoingContent.subtitle || ''}
                onChange={e => handleNestedChange('ongoingContent', 'subtitle', e.target.value)} />
            </div>
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" checked={settings.ongoingContent.visible !== false}
                  onChange={e => handleNestedChange('ongoingContent', 'visible', e.target.checked)} />
                Show this section on the home page
              </label>
            </div>
          </div>
        )}

        {/* ── WHY US TAB ──────────────────────────── */}
        {activeTab === 'whyUs' && settings.whyUsContent && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-900)' }}>Why Choose Us Section</h3>
            <div className="form-group">
              <label>Section Tag</label>
              <input type="text" className="form-control" value={settings.whyUsContent.tag || ''}
                onChange={e => handleNestedChange('whyUsContent', 'tag', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Section Title</label>
              <input type="text" className="form-control" value={settings.whyUsContent.title || ''}
                onChange={e => handleNestedChange('whyUsContent', 'title', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Section Subtitle</label>
              <textarea className="form-control" rows="3" value={settings.whyUsContent.subtitle || ''}
                onChange={e => handleNestedChange('whyUsContent', 'subtitle', e.target.value)} />
            </div>
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" checked={settings.whyUsContent.visible !== false}
                  onChange={e => handleNestedChange('whyUsContent', 'visible', e.target.checked)} />
                Show this section on the home page
              </label>
            </div>
          </div>
        )}

        {/* ── CTA TAB ─────────────────────────────── */}
        {activeTab === 'cta' && settings.ctaContent && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-900)' }}>Call-to-Action Section</h3>
            <div className="form-group">
              <label>Section Tag</label>
              <input type="text" className="form-control" value={settings.ctaContent.tag || ''}
                onChange={e => handleNestedChange('ctaContent', 'tag', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Section Title</label>
              <input type="text" className="form-control" value={settings.ctaContent.title || ''}
                onChange={e => handleNestedChange('ctaContent', 'title', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Section Subtitle</label>
              <textarea className="form-control" rows="3" value={settings.ctaContent.subtitle || ''}
                onChange={e => handleNestedChange('ctaContent', 'subtitle', e.target.value)} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label>CTA Button Text</label>
                <input type="text" className="form-control" value={settings.ctaContent.ctaText || ''}
                  onChange={e => handleNestedChange('ctaContent', 'ctaText', e.target.value)} />
              </div>
              <div className="form-group">
                <label>CTA Button Link</label>
                <input type="text" className="form-control" value={settings.ctaContent.ctaLink || ''}
                  onChange={e => handleNestedChange('ctaContent', 'ctaLink', e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" checked={settings.ctaContent.visible !== false}
                  onChange={e => handleNestedChange('ctaContent', 'visible', e.target.checked)} />
                Show this section on the home page
              </label>
            </div>
          </div>
        )}

        {/* ── CONTACT TAB ─────────────────────────── */}
        {activeTab === 'contact' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-900)' }}>Contact Page Content</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: 0 }}>
              Contact details (phone, email, address) are managed in <strong>Admin → Settings</strong>. This tab controls the Contact page text.
            </p>

            <div className="form-group">
              <label>Page Title</label>
              <input type="text" className="form-control"
                value={settings.contactContent?.pageTitle || ''}
                onChange={e => handleNestedChange('contactContent', 'pageTitle', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Page Subtitle</label>
              <textarea className="form-control" rows="2"
                value={settings.contactContent?.pageSubtitle || ''}
                onChange={e => handleNestedChange('contactContent', 'pageSubtitle', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Site Visit Banner Title</label>
              <input type="text" className="form-control"
                value={settings.contactContent?.bannerTitle || ''}
                onChange={e => handleNestedChange('contactContent', 'bannerTitle', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Site Visit Banner Text</label>
              <textarea className="form-control" rows="3"
                value={settings.contactContent?.siteVisitBanner || ''}
                onChange={e => handleNestedChange('contactContent', 'siteVisitBanner', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Google Maps Embed URL</label>
              <input type="text" className="form-control" placeholder="https://www.google.com/maps/embed?..."
                value={settings.mapEmbed || ''}
                onChange={e => handleChange('mapEmbed', e.target.value)} />
              <small style={{ color: 'var(--text-muted)' }}>Go to Google Maps → Share → Embed a map → copy the src URL</small>
            </div>
          </div>
        )}

        {/* ── FOOTER TAB ──────────────────────────── */}
        {activeTab === 'footer' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-900)' }}>Footer Content</h3>

            <div className="form-group">
              <label>Company Description (shown in footer)</label>
              <textarea className="form-control" rows="3"
                value={settings.footerContent?.description || ''}
                onChange={e => handleNestedChange('footerContent', 'description', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Copyright Text</label>
              <input type="text" className="form-control"
                value={settings.footerContent?.copyright || ''}
                onChange={e => handleNestedChange('footerContent', 'copyright', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Legal Disclaimer</label>
              <textarea className="form-control" rows="3"
                value={settings.footerContent?.disclaimer || ''}
                onChange={e => handleNestedChange('footerContent', 'disclaimer', e.target.value)} />
            </div>

            <h4 style={{ color: 'var(--primary-900)', marginBottom: '4px' }}>Quick Navigation Links</h4>
            {(settings.footerContent?.quickLinks || []).map((link, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr auto', gap: '10px', alignItems: 'end' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label>Label {i + 1}</label>
                  <input type="text" className="form-control" value={link.label || ''}
                    onChange={e => handleQuickLinkChange(i, 'label', e.target.value)} />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label>URL {i + 1}</label>
                  <input type="text" className="form-control" value={link.url || ''}
                    onChange={e => handleQuickLinkChange(i, 'url', e.target.value)} />
                </div>
                <button
                  style={{ padding: '8px 12px', background: '#fee2e2', color: '#991b1b', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                  onClick={() => {
                    const links = [...(settings.footerContent?.quickLinks || [])];
                    links.splice(i, 1);
                    handleNestedChange('footerContent', 'quickLinks', links);
                  }}
                >✕</button>
              </div>
            ))}
            <button
              className="btn btn-outline-primary"
              style={{ alignSelf: 'flex-start' }}
              onClick={() => {
                const links = [...(settings.footerContent?.quickLinks || []), { label: 'New Link', url: '/' }];
                handleNestedChange('footerContent', 'quickLinks', links);
              }}
            >+ Add Link</button>
          </div>
        )}

        {/* ── NAVBAR TAB ──────────────────────────── */}
        {activeTab === 'navbar' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-900)' }}>Header / Navbar Settings</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: 0 }}>
              Company name, phone, and tagline in the navbar come from <strong>Admin → Settings → Company Details</strong>.
            </p>

            <div className="form-group">
              <label>Top Bar Text (announcement/trust text)</label>
              <input type="text" className="form-control"
                value={settings.navbarContent?.topBarText || ''}
                onChange={e => handleNestedChange('navbarContent', 'topBarText', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Enquire Now Button Text</label>
              <input type="text" className="form-control"
                value={settings.navbarContent?.ctaText || ''}
                onChange={e => handleNestedChange('navbarContent', 'ctaText', e.target.value)} />
            </div>
            <div style={{ padding: '16px', backgroundColor: 'var(--primary-50)', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
              <strong style={{ color: 'var(--primary-900)', display: 'block', marginBottom: '8px' }}>ℹ️ Tip</strong>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0 }}>
                To change the logo, phone number, company name, or tagline shown in the header, go to <strong>Admin → Settings</strong>.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
