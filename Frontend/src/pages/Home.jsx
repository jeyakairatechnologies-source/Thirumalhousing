import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  MapPin,
  ArrowRight,
  Compass,
  Award,
  Search,
} from 'lucide-react';
import { api } from '../services/api.js';
import { FaGoogle, FaStar } from 'react-icons/fa';
import aboutVideo from '../assets/i_need_this_image_convect_to.mp4';
import imagePng from '../assets/image.png';
import upcoming1 from '../assets/upcoming1.jpg';
import ongoing1 from '../assets/ongoing1.jpg';
import ongoing2 from '../assets/ongoing2.jpg';

export default function Home({ onOpenEnquiry }) {
  const [projects, setProjects] = useState([]);
  const [settings, setSettings] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [projData, settsData] = await Promise.all([
          api.getProjects(),
          api.getSettings()
        ]);
        setProjects(projData || []);
        setSettings(settsData);
      } catch (err) {
        console.error('Failed to load home data:', err);
      }
    };
    loadData();
  }, []);

  const ongoingProjects = projects.filter(p => p.status === 'ongoing');

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    if (query.includes('kovilpatti') || query.includes('sivakasi')) {
      document.getElementById('ongoing')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      document.getElementById('upcoming')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* ===================================================================
          1. HERO SECTION
          =================================================================== */}
      <section
        id="home"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '80px',
          paddingBottom: '60px',
          overflow: 'hidden'
        }}
      >
        <video
          src={aboutVideo}
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0
          }}
        />

        {/* Dark overlay to make text pop out */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1
        }}></div>

        <div className="container hero-content-container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', width: '100%', maxWidth: '700px' }}>

          {/* Badge */}
          <div className="hero-badge" style={{
            display: 'inline-block',
            padding: '8px 24px',
            borderRadius: '999px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            fontWeight: '600',
            fontSize: '0.9rem',
            marginBottom: '24px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            Trusted by 50,000+ Home Seekers
          </div>

          {/* Headings */}
          <h1 className="hero-title" style={{
            color: 'white',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '800',
            lineHeight: 1.1,
            marginBottom: '20px',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            Find Your Dream Home
          </h1>
          <p className="hero-subtitle" style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '1.2rem',
            maxWidth: '600px',
            margin: '0 auto 40px',
            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
          }}>
            Discover perfect flats, apartments, and houses across the UK with verified listings
          </p>
          
          <button 
            className="mobile-get-started-btn"
            onClick={() => document.getElementById('ongoing')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Started
          </button>

          {/* Search Card */}
          <div className="hero-search-card" style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '30px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            textAlign: 'left'
          }}>
            {/* Toggle Buy Only */}
            <div className="hero-buy-toggle" style={{
              display: 'flex',
              backgroundColor: '#f1f5f9',
              borderRadius: '12px',
              padding: '6px',
              marginBottom: '24px'
            }}>
              <button className="hero-buy-btn" style={{
                flex: 1,
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: 'white',
                border: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                color: '#0f172a',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}>Buy</button>
            </div>

            {/* Search Input Row */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '30px'
            }}>
              <div className="hero-search-input-wrap" style={{
                flex: '1 1 250px',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '0 16px'
              }}>
                <Search size={20} color="#94a3b8" />
                <input
                  type="text"
                  className="hero-search-input"
                  placeholder="Search for city, postcode or area..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  style={{
                    border: 'none',
                    outline: 'none',
                    padding: '16px',
                    width: '100%',
                    fontSize: '1rem',
                    color: '#334155'
                  }}
                />
              </div>
              <button 
                onClick={handleSearch}
                className="hero-search-btn"
                style={{
                background: '#0c2f23',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '16px 32px',
                fontWeight: '600',
                fontSize: '1.1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 8px 20px rgba(12, 47, 35, 0.3)',
                transition: 'all 0.3s ease',
                flex: '0 0 auto'
              }}>
                <Search size={20} />
                Search
              </button>
            </div>

            {/* Stats Row */}
            <div className="hero-stats-row" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 'clamp(20px, 5vw, 60px)',
              borderTop: '1px solid #f1f5f9',
              paddingTop: '20px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div className="hero-stat-number" style={{ color: '#0f172a', fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: '800' }}>
                  50K<span style={{ color: '#ef4444' }}>+</span>
                </div>
                <div className="hero-stat-text" style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: '500' }}>Properties</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div className="hero-stat-number" style={{ color: '#0f172a', fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: '800' }}>
                  98<span style={{ color: '#ef4444' }}>%</span>
                </div>
                <div className="hero-stat-text" style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: '500' }}>Satisfaction</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div className="hero-stat-number" style={{ color: '#0f172a', fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: '800' }}>
                  24<span style={{ color: '#ef4444' }}>h</span>
                </div>
                <div className="hero-stat-text" style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: '500' }}>Response</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          2. ABOUT THIRUMAL HOUSING SECTION
          =================================================================== */}
      <section id="about" className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '60px',
              alignItems: 'center'
            }}
          >
            {/* Image Composition */}
            <div className="about-image-container" style={{ position: 'relative', textAlign: 'center' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={imagePng}
                  alt="Thirumal Housing"
                  style={{
                    width: '100%',
                    maxWidth: '580px',
                    maxHeight: '660px',
                    objectFit: 'contain',
                    display: 'block',
                    margin: '0 auto',
                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.18))'
                  }}
                />
              </div>
            </div>

            {/* Narrative */}
            <div>
              <span className="section-tag">About Thirumal Housing</span>

              <p style={{ fontSize: '1.08rem', lineHeight: '1.75', color: 'var(--primary-900)', fontWeight: '500', marginBottom: '16px' }}>
                For the past 15 years, we have been one of the leading real estate developers in Kovilpatti and its surrounding areas. We take pride in delivering quality properties and valuable assets that meet the aspirations of our customers.
              </p>
              <p style={{ fontSize: '1rem', lineHeight: '1.75', color: 'var(--text-muted)', marginBottom: '26px' }}>
                Our journey has been built on trust, quality, transparency, and customer satisfaction. The greatest testament to our success is that many of our customers continue to return to us for their next investments, placing their trust in us time and time again.
              </p>

              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--primary-900)', marginBottom: '16px' }}>Below are some of our key projects:</h3>
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--primary-700)', marginBottom: '4px' }}>THIRUMAL NAGAR</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>The Thirumal Nagar project, which we developed in 2018 near the new Kovilpatti Bus Stand, has now grown into one of the most prominent locations in Kovilpatti, with more than <strong>200 houses</strong>, along with <strong>Dora Park</strong> and the renowned <strong>Veeralakshmi Narasimhar Temple</strong>.</p>
              </div>
              <div style={{ marginBottom: '32px' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--primary-700)', marginBottom: '4px' }}>VENKADESHWARA GARDEN</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>The Venkateswara Garden project, which we launched in <strong>2011</strong>, was a highly successful project. Today, it has developed into a prominent location in the town, with more than <strong>300 houses</strong>.</p>
              </div>

              <Link to="/about" className="btn btn-primary">
                Read Company Profile <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          3. ONGOING PROJECTS SECTION
          =================================================================== */}
      <section id="ongoing" className="section-padding" style={{ backgroundColor: '#ffffff', position: 'relative', padding: '80px 0' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="section-header" style={{ marginBottom: '60px' }}>
            <span className="section-tag">
              {settings?.ongoingContent?.tag || 'ONGOING'}
            </span>
            <h2 className="section-title" style={{ color: '#0a3233', fontSize: '3rem', fontWeight: '800', marginBottom: '16px', textTransform: 'uppercase' }}>
              {settings?.ongoingContent?.title || 'Ongoing Projects'}
            </h2>
            <p className="section-subtitle" style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
              {settings?.ongoingContent?.subtitle || 'Thoughtfully planned addresses for your next chapter.'}
            </p>
            <div style={{ width: '40px', height: '3px', backgroundColor: '#c5a059', margin: '20px auto 0' }}></div>
          </div>

          {/* Ongoing Project Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', maxWidth: '1000px', margin: '0 auto' }}>
            {[
              {
                img: ongoing1,
                name: 'THIRUMAL NAGAR – I BLOCK',
                location: 'Kovilpatti',
                desc: 'We are newly introducing I Block in Thirumal Nagar, featuring approximately 160 plots, situated amidst hundreds of houses. The renowned Veeralakshmi Narasimhar Temple is located in our town. Dora Park is also a popular gathering place for hundreds of people and Edustar KRA, and numerous educational institutions are located nearby.',
                features: [],
                badge: 'ONGOING'
              },
              {
                img: ongoing2,
                name: 'Sudarshan Garden',
                location: 'ENJAR Road, Sivakasi',
                desc: 'A residential plot development currently available for sale on Inna Road in Sivakasi, is already growing into a well-established residential community with more than 25 houses.',
                features: ['40-foot and 30-foot-wide roads', 'Beautiful and well-maintained park facilities', 'Developed residential area with 25+ houses', 'Very close to schools and colleges', 'Ideal location for family and future investment'],
                badge: 'ONGOING'
              }
            ].map((proj, idx) => (
              <div key={idx} style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.10)', background: '#fff', border: '1px solid #e2eded', transition: 'transform 0.3s, box-shadow 0.3s', display: 'flex', flexDirection: 'column' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.16)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.10)'; }}
              >
                {/* Image */}
                <div style={{ position: 'relative', overflow: 'hidden', height: '220px', flexShrink: 0, cursor: 'pointer' }} onClick={() => setSelectedProject(proj)}>
                  <img src={proj.img} alt={proj.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  {/* ONGOING Badge */}
                  <span style={{ position: 'absolute', top: '14px', right: '14px', backgroundColor: '#22c55e', color: '#fff', fontSize: '0.72rem', fontWeight: '800', padding: '4px 12px', borderRadius: '999px', letterSpacing: '0.05em', textTransform: 'uppercase', boxShadow: '0 2px 8px rgba(34,197,94,0.4)' }}>{proj.badge}</span>
                </div>
                {/* Info */}
                <div style={{ padding: '20px 22px 22px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0a3233', marginBottom: '6px' }}>{proj.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '0.88rem', marginBottom: '16px' }}>
                    <MapPin size={14} style={{ color: '#0a3233' }} />
                    <span>{proj.location}</span>
                  </div>

                  <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: '1.6', marginBottom: '16px', flexGrow: proj.features.length === 0 ? 1 : 0 }}>
                    {proj.desc}
                  </p>

                  {proj.features.length > 0 && (
                    <div style={{ marginBottom: '20px', flexGrow: 1 }}>
                      <strong style={{ fontSize: '0.9rem', color: '#0a3233', display: 'block', marginBottom: '8px' }}>Key Features:</strong>
                      <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '0.9rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '6px', lineHeight: '1.5' }}>
                        {proj.features.map((f, i) => <li key={i}>{f}</li>)}
                      </ul>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
                    <button
                      onClick={() => setSelectedProject(proj)}
                      style={{ flex: 1, backgroundColor: 'transparent', color: '#0a3233', border: '2px solid #0a3233', borderRadius: '8px', padding: '10px', fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer', transition: 'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#0a3233'; e.currentTarget.style.color = '#fff'; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#0a3233'; }}
                    >
                      View
                    </button>
                    <button
                      onClick={() => onOpenEnquiry && onOpenEnquiry()}
                      style={{ flex: 2, backgroundColor: '#0a3233', color: '#ffffff', border: '2px solid #0a3233', borderRadius: '8px', padding: '10px', fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer', transition: 'background 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#c5a059'; e.currentTarget.style.borderColor = '#c5a059'; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#0a3233'; e.currentTarget.style.borderColor = '#0a3233'; }}
                    >
                      Book Site Visit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          4. UPCOMING PROJECTS SECTION
          =================================================================== */}
      <section id="upcoming" className="section-padding" style={{ backgroundColor: '#ffffff', position: 'relative' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="section-header">
            <span className="section-tag" style={{ background: 'var(--status-upcoming-bg)', color: 'var(--status-upcoming-text)', border: '1px solid var(--status-upcoming-text)', boxShadow: '0 0 10px rgba(234, 179, 8, 0.4)' }}>
              {settings?.upcomingContent?.tag || 'Coming Soon'}
            </span>
            <h2 className="section-title" style={{ textTransform: 'uppercase' }}>{settings?.upcomingContent?.title || 'UPCOMING PROJECTS'}</h2>
            <p className="section-subtitle">
              {settings?.upcomingContent?.subtitle || 'Pre-launch master layouts with high expected appreciation. Register your interest early to secure the lowest inaugural pricing.'}
            </p>
          </div>

          {/* Static Upcoming Project Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', maxWidth: '600px', margin: '0 auto' }}>
            {[
              {
                img: upcoming1,
                name: 'Indraprastha',
                location: 'Vilampatti, Sivakasi',
                desc: 'We are currently developing Indraprastha project at Vilampatti, Sivakasi, a world class pure gated community project featuring a clubhouse and swimming pool along with a well planned and premium residential environment. This prestigious project is being developed with a focus on providing a comfortable and modern lifestyle for families. Indraprastha project will be launched very soon.'
              }
            ].map((proj, idx) => (
              <div key={idx} style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.10)', background: '#fff', border: '1px solid #e9f0f0', transition: 'transform 0.3s, box-shadow 0.3s', display: 'flex', flexDirection: 'column' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.16)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.10)'; }}
              >
                {/* Image */}
                <div style={{ position: 'relative', overflow: 'hidden', height: '260px', flexShrink: 0, cursor: 'pointer' }} onClick={() => setSelectedProject({...proj, badge: 'Coming Soon'})}>
                  <img src={proj.img} alt={proj.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  {/* Coming Soon Badge */}
                  <span style={{ position: 'absolute', top: '14px', right: '14px', backgroundColor: '#eab308', color: '#1a0a00', fontSize: '0.72rem', fontWeight: '800', padding: '4px 12px', borderRadius: '999px', letterSpacing: '0.05em', textTransform: 'uppercase', boxShadow: '0 2px 8px rgba(234,179,8,0.4)' }}>Coming Soon</span>
                </div>
                {/* Info */}
                <div style={{ padding: '20px 22px 22px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0a3233', marginBottom: '6px' }}>{proj.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '0.88rem', marginBottom: '16px' }}>
                    <MapPin size={14} style={{ color: '#0a3233' }} />
                    <span>{proj.location}</span>
                  </div>
                  <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: '1.7', marginBottom: '16px', flexGrow: 1 }}>
                    {proj.desc}
                  </p>
                  <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
                    <button
                      onClick={() => setSelectedProject({...proj, badge: 'Coming Soon'})}
                      style={{ flex: 1, backgroundColor: 'transparent', color: '#0a3233', border: '2px solid #0a3233', borderRadius: '8px', padding: '10px', fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer', transition: 'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#0a3233'; e.currentTarget.style.color = '#fff'; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#0a3233'; }}
                    >
                      View
                    </button>
                    <button
                      onClick={() => onOpenEnquiry && onOpenEnquiry()}
                      style={{ flex: 2, backgroundColor: '#0a3233', color: '#ffffff', border: '2px solid #0a3233', borderRadius: '8px', padding: '10px', fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer', transition: 'background 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#c5a059'; e.currentTarget.style.borderColor = '#c5a059'; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#0a3233'; e.currentTarget.style.borderColor = '#0a3233'; }}
                    >
                      Register Interest
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>


          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/projects?status=ongoing" className="btn btn-outline-gold">
              Explore Pre-Launch Opportunities <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================================================================
          5. WHY THIRUMAL HOUSING SECTION
          =================================================================== */}
      <section
        className="section-padding"
        style={{
          backgroundColor: '#ffffff',
          color: '#0a3233'
        }}
      >
        <div className="container">
          <div className="section-header">
            <span
              className="section-tag"
            >
              {settings?.whyUsContent?.tag || 'The Thirumal Advantage'}
            </span>
            <h2 className="section-title" style={{ color: '#0a3233' }}>
              {settings?.whyUsContent?.title || 'WHY THIRUMAL HOUSING'}
            </h2>
            <p className="section-subtitle" style={{ color: 'var(--text-muted)' }}>
              {settings?.whyUsContent?.subtitle || "We don't just sell plots; we build thriving, legally pristine residential neighborhoods where you can build your family's legacy."}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px'
            }}
          >
            {/* Pillar 1 */}
            <div
              style={{
                backgroundColor: '#f8fafa',
                border: '1px solid #e2eded',
                borderRadius: 'var(--radius-lg)',
                padding: '32px 24px',
                textAlign: 'center',
                transition: 'all 0.3s'
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(10, 50, 51, 0.1)',
                  color: '#0a3233',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}
              >
                <Award size={30} />
              </div>
              <h3 style={{ fontSize: '1.3rem', color: '#0a3233', marginBottom: '12px' }}>✓ Unmatched Quality</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Heavy-duty blacktop roads, underground conduits, high-yield borewells, and solid perimeter compound walls built to last generations.
              </p>
            </div>

            {/* Pillar 2 */}
            <div
              style={{
                backgroundColor: '#f8fafa',
                border: '1px solid #e2eded',
                borderRadius: 'var(--radius-lg)',
                padding: '32px 24px',
                textAlign: 'center',
                transition: 'all 0.3s'
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(10, 50, 51, 0.1)',
                  color: '#0a3233',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}
              >
                <MapPin size={30} />
              </div>
              <h3 style={{ fontSize: '1.3rem', color: '#0a3233', marginBottom: '12px' }}>✓ Prime Locations</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Strategic positioning near arterial highways (GST, OMR, ORR), ongoing metro stations, top engineering colleges, and SEZ IT corridors.
              </p>
            </div>

            {/* Pillar 3 */}
            <div
              style={{
                backgroundColor: '#f8fafa',
                border: '1px solid #e2eded',
                borderRadius: 'var(--radius-lg)',
                padding: '32px 24px',
                textAlign: 'center',
                transition: 'all 0.3s'
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(10, 50, 51, 0.1)',
                  color: '#0a3233',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}
              >
                <ShieldCheck size={30} />
              </div>
              <h3 style={{ fontSize: '1.3rem', color: '#0a3233', marginBottom: '12px' }}>✓ Trusted Title Deeds</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                30-year parent document scrutiny by leading High Court advocates. Zero legal disputes and immediate Patta transfer guaranteed.
              </p>
            </div>

            {/* Pillar 4 */}
            <div
              style={{
                backgroundColor: '#f8fafa',
                border: '1px solid #e2eded',
                borderRadius: 'var(--radius-lg)',
                padding: '32px 24px',
                textAlign: 'center',
                transition: 'all 0.3s'
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(10, 50, 51, 0.1)',
                  color: '#0a3233',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}
              >
                <Compass size={30} />
              </div>
              <h3 style={{ fontSize: '1.3rem', color: '#0a3233', marginBottom: '12px' }}>✓ Transparent Process</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                No hidden costs. Comprehensive documentation, prompt bank loan approvals with nationalized banks, and hassle-free registration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          GOOGLE REVIEWS SECTION
          =================================================================== */}
      <section style={{ padding: '60px 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0a3233', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              <span style={{ color: '#ea4335' }}>G</span>
              <span style={{ color: '#ea4335' }}>o</span>
              <span style={{ color: '#fbbc05' }}>o</span>
              <span style={{ color: '#4285f4' }}>g</span>
              <span style={{ color: '#34a853' }}>l</span>
              <span style={{ color: '#ea4335' }}>e</span>
              <span style={{ color: '#0a3233', marginLeft: '4px' }}>Reviews</span>
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0a3233' }}>4.9</span>
              <div style={{ display: 'flex', color: '#fbbc05', gap: '2px' }}>
                <FaStar size={15} />
                <FaStar size={15} />
                <FaStar size={15} />
                <FaStar size={15} />
                <FaStar size={15} />
              </div>
              <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Based on 150+ reviews</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {[
              { name: 'Karthik Raja', text: 'Bought a plot in Thirumal Nagar. The documentation was crystal clear and the team was very supportive throughout the registration process.', rating: 5, date: '2 months ago' },
              { name: 'Srinivasan M', text: 'One of the most trusted real estate developers in Kovilpatti. Amenities provided are exactly as promised.', rating: 5, date: '4 months ago' },
              { name: 'Priya Dharshini', text: 'Very happy with our investment in Venkateshwara Garden. The area has developed rapidly.', rating: 5, date: '6 months ago' }
            ].map((review, i) => (
              <div key={i} style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#0a3233', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '1.2rem' }}>
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: '700', color: '#0a3233', fontSize: '0.95rem' }}>{review.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{review.date}</div>
                    </div>
                  </div>
                  <FaGoogle style={{ color: '#4285f4', fontSize: '1.2rem' }} />
                </div>
                <div style={{ display: 'flex', color: '#fbbc05', fontSize: '0.8rem', gap: '2px', marginBottom: '12px' }}>
                  {[...Array(review.rating)].map((_, j) => <FaStar key={j} size={13} />)}
                </div>
                <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.6' }}>"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Details Modal */}
      {selectedProject && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            cursor: 'zoom-out'
          }}
          onClick={() => setSelectedProject(null)}
        >
          <div 
            style={{
              backgroundColor: '#fff',
              borderRadius: '16px',
              maxWidth: '900px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'default',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ position: 'relative', width: '100%', height: '350px', flexShrink: 0 }}>
              <img
                src={selectedProject.img}
                alt={selectedProject.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <button
                style={{
                  position: 'absolute',
                  top: '16px', right: '16px',
                  background: 'rgba(0,0,0,0.5)',
                  border: 'none',
                  color: 'white',
                  width: '40px', height: '40px',
                  borderRadius: '50%',
                  fontSize: '24px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.8)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
                onClick={() => setSelectedProject(null)}
              >
                &times;
              </button>
            </div>
            
            <div style={{ padding: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '12px' }}>
                <h3 style={{ fontSize: '2rem', fontWeight: '800', color: '#0a3233', margin: 0 }}>{selectedProject.name}</h3>
                {selectedProject.badge && (
                  <span style={{ backgroundColor: selectedProject.badge === 'ONGOING' ? '#22c55e' : '#eab308', color: selectedProject.badge === 'ONGOING' ? '#fff' : '#1a0a00', fontSize: '0.85rem', fontWeight: '800', padding: '6px 16px', borderRadius: '999px', textTransform: 'uppercase' }}>
                    {selectedProject.badge}
                  </span>
                )}
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '1.1rem', marginBottom: '24px' }}>
                <MapPin size={18} style={{ color: '#0a3233' }} />
                <span>{selectedProject.location}</span>
              </div>
              
              <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: '1.8', marginBottom: '24px' }}>
                {selectedProject.desc}
              </p>
              
              {selectedProject.features && selectedProject.features.length > 0 && (
                <div style={{ marginBottom: '30px' }}>
                  <strong style={{ fontSize: '1.1rem', color: '#0a3233', display: 'block', marginBottom: '12px' }}>Key Features:</strong>
                  <ul style={{ paddingLeft: '24px', margin: 0, fontSize: '1rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '8px', lineHeight: '1.6' }}>
                    {selectedProject.features.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </div>
              )}
              
              <button
                onClick={() => {
                  setSelectedProject(null);
                  if (onOpenEnquiry) onOpenEnquiry();
                }}
                style={{ width: '100%', backgroundColor: '#0a3233', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '16px', fontWeight: '700', fontSize: '1.1rem', cursor: 'pointer', transition: 'background 0.2s', marginTop: '10px' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#c5a059'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0a3233'}
              >
                {selectedProject.badge === 'ONGOING' ? 'Book Site Visit' : 'Register Interest'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
