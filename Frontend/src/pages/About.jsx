import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, Users, CheckCircle2, HeartHandshake, Compass, Building, ArrowRight, Sparkles } from 'lucide-react';
import { api } from '../services/api.js';
import aboutImg from '../assets/about.png';

export default function About() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await api.getSettings();
        setSettings(data);
      } catch (err) {
        console.warn('Failed to load about data:', err);
      }
    };
    loadSettings();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section
        style={{
          background: `linear-gradient(rgba(6, 29, 21, 0.85), rgba(6, 29, 21, 0.9)), url("${settings?.banners?.[1]?.image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09'}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#ffffff',
          padding: '70px 0 60px',
          textAlign: 'center'
        }}
      >
        <div className="container" style={{ maxWidth: '800px' }}>
          <span className="section-tag" style={{ background: 'rgba(197, 160, 89, 0.2)', color: 'var(--gold-300)', borderColor: 'var(--gold-500)' }}>
            About Thirumal Housing
          </span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3.2rem', fontWeight: '800', color: '#ffffff', marginBottom: '16px' }}>
            {settings?.aboutContent?.title || '15 Years of Real Estate Leadership in Kovilpatti & Sivakasi'}
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.15rem', lineHeight: 1.6 }}>
            {settings?.aboutContent?.pageSubtitle || 'Delivering quality properties, valuable assets, and trusted investments that meet the highest aspirations of our customers.'}
          </p>
        </div>
      </section>

      {/* Story & Philosophy - Exactly matching User Narrative */}
      <section className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div
            style={{
              maxWidth: '800px',
              margin: '0 auto',
              textAlign: 'center'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                <Link to="/" className="btn btn-primary" style={{ padding: '8px 24px' }}>
                  ← Back to Home
                </Link>
              </div>
              <span className="section-tag" style={{ display: 'inline-block', margin: '0 auto 16px' }}>Who We Are</span>
              <h2 style={{ fontSize: '2.4rem', color: 'var(--primary-900)', marginBottom: '20px' }}>
                {settings?.aboutContent?.title || 'Built on Trust, Quality, Transparency & Customer Satisfaction'}
              </h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--primary-900)', fontWeight: '500', marginBottom: '18px' }}>
                {settings?.aboutContent?.text1 || 'For the past 15 years, we have been one of the leading real estate developers in Kovilpatti and its surrounding areas. We take pride in delivering quality properties and valuable assets that meet the aspirations of our customers.'}
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: '28px' }}>
                {settings?.aboutContent?.text2 || 'Our journey has been built on trust, quality, transparency, and customer satisfaction. The greatest testament to our success is that many of our customers continue to return to us for their next investments, placing their trust in us time and time again.'}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                <div style={{ padding: '18px', backgroundColor: 'var(--primary-50)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--primary-700)', textAlign: 'left' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary-800)', fontFamily: 'var(--font-heading)' }}>15+ Years</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>Proven Real Estate Leadership</div>
                </div>
                <div style={{ padding: '18px', backgroundColor: 'var(--gold-100)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--gold-600)', textAlign: 'left' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--gold-700)', fontFamily: 'var(--font-heading)' }}>100% Trust</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>Repeat & Referral Investors</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Link to="/projects" className="btn btn-outline-gold">
                  {settings?.aboutContent?.ctaText || 'View Our Projects'} <ArrowRight size={16} />
                </Link>
                <Link to="/contact" className="btn btn-outline-gold">Contact Our Team</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-surface-muted)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Four Pillars</span>
            <h2 className="section-title">Why Families & Investors Choose Us</h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px'
            }}
          >
            <div className="card" style={{ padding: '30px', borderTop: '4px solid var(--primary-700)' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '10px', color: 'var(--primary-900)' }}>✓ Trust & Legacy</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                Over a decade and a half of unwavering commitment to delivering genuine, uncompromised real estate assets.
              </p>
            </div>

            <div className="card" style={{ padding: '30px', borderTop: '4px solid var(--gold-500)' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '10px', color: 'var(--primary-900)' }}>✓ Unmatched Quality</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                40ft and 30ft asphalt roads, dedicated park facilities, children play areas, and sweet potable water networks.
              </p>
            </div>

            <div className="card" style={{ padding: '30px', borderTop: '4px solid var(--primary-800)' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '10px', color: 'var(--primary-900)' }}>✓ Complete Transparency</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                100% legal clarity, DTCP approved layouts, transparent pricing with no hidden charges, and immediate Patta transfers.
              </p>
            </div>

            <div className="card" style={{ padding: '30px', borderTop: '4px solid var(--gold-600)' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '10px', color: 'var(--primary-900)' }}>✓ Customer Satisfaction</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                Our customers repeatedly return to us for their second and third property investments because their assets steadily grow.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
