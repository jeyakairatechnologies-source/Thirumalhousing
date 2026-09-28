import { Link } from 'react-router-dom';
import { FaFileContract, FaArrowLeft, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

export default function TermsConditions() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: '#1e293b' }}>
      {/* Header Banner */}
      <div style={{
        backgroundColor: '#0a3233',
        color: '#ffffff',
        padding: '60px 20px 48px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Link to="/" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#d6b46e',
            fontSize: '0.9rem',
            fontWeight: '600',
            marginBottom: '20px',
            textDecoration: 'none'
          }}>
            <FaArrowLeft size={13} /> Back to Home
          </Link>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'rgba(214, 180, 110, 0.15)',
            color: '#d6b46e',
            marginBottom: '16px'
          }}>
            <FaFileContract size={26} />
          </div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: '800', marginBottom: '12px', color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
            Terms & Conditions
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
            Effective Date: March 2026 | Thirumal Housing Promoters & Developers
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container" style={{ maxWidth: '860px', margin: '0 auto', padding: '50px 20px 80px', lineHeight: '1.8' }}>
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#0a3233', marginBottom: '14px' }}>
            1. Acceptance of Terms
          </h2>
          <p style={{ color: '#475569', fontSize: '0.96rem' }}>
            Welcome to the official website of <strong>Thirumal Housing</strong>. By accessing or browsing this website, scheduling property visits, or registering your interest in any plot development, you acknowledge that you have read, understood, and agree to be bound by the following terms and conditions.
          </p>
        </section>

        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#0a3233', marginBottom: '14px' }}>
            2. Property Listings & Availability
          </h2>
          <p style={{ color: '#475569', fontSize: '0.96rem', marginBottom: '12px' }}>
            All plots, layout plans, and specifications displayed on this website are subject to availability and confirmation:
          </p>
          <ul style={{ paddingLeft: '24px', color: '#475569', fontSize: '0.96rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>Plot availability is updated periodically; however, plots are allocated on a first-come, first-served basis upon advance token receipt.</li>
            <li>Renderings, artist impressions, and landscaping visuals are representational illustrations intended to convey overall project aesthetics.</li>
            <li>Official dimensions, road widths, and survey boundaries are as specified in approved government layout blueprints and physical boundary stones.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#0a3233', marginBottom: '14px' }}>
            3. Approvals & Legal Transparency
          </h2>
          <p style={{ color: '#475569', fontSize: '0.96rem' }}>
            Thirumal Housing prides itself on strict legal adherence. All developed layouts strictly adhere to DTCP / local planning authority approvals. Original parent documents, encumbrance certificates (EC), legal opinion reports, and layout approval orders are available for prospective buyers' review at our sales office.
          </p>
        </section>

        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#0a3233', marginBottom: '14px' }}>
            4. Booking & Payment Policies
          </h2>
          <p style={{ color: '#475569', fontSize: '0.96rem', marginBottom: '12px' }}>
            Booking agreements and financial commitments follow standardized protocols:
          </p>
          <ul style={{ paddingLeft: '24px', color: '#475569', fontSize: '0.96rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>Booking confirmations require execution of a formal Sale Agreement accompanied by valid KYC documentation.</li>
            <li>Payments should only be made via bank transfer, cheque, or authorized demand draft drawn in favor of Thirumal Housing accounts.</li>
            <li>Our team coordinates with nationalized banks to assist prospective buyers with seamless loan sanctioning.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#0a3233', marginBottom: '14px' }}>
            5. Intellectual Property
          </h2>
          <p style={{ color: '#475569', fontSize: '0.96rem' }}>
            All logos, brand names, visual renders, layout master plans, and website content are the exclusive intellectual property of Thirumal Housing. Any reproduction, distribution, or commercial exploitation without written consent is strictly prohibited.
          </p>
        </section>

        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#0a3233', marginBottom: '14px' }}>
            6. Jurisdiction
          </h2>
          <p style={{ color: '#475569', fontSize: '0.96rem' }}>
            Any disputes or legal inquiries arising in connection with website usage or property transactions shall be governed under the laws of India and subject exclusively to the courts of Kovilpatti / Thoothukudi / Virudhunagar district jurisdiction.
          </p>
        </section>

        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#0a3233', marginBottom: '14px' }}>
            7. Contact for Inquiries
          </h2>
          <div style={{
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#0a3233', fontWeight: '600' }}>
              <FaPhoneAlt color="#d6b46e" /> +91 80985 00012
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#0a3233', fontWeight: '600' }}>
              <FaEnvelope color="#d6b46e" /> info@thirumalhousing.com
            </div>
            <div style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '4px' }}>
              Thirumal Housing Corporate Desk, Kovilpatti, Tamil Nadu – 628 501
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
