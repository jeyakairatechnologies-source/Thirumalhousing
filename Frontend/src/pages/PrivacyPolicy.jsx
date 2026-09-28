import { Link } from 'react-router-dom';
import { FaShieldAlt, FaArrowLeft, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

export default function PrivacyPolicy() {
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
            <FaShieldAlt size={26} />
          </div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: '800', marginBottom: '12px', color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
            Privacy Policy
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
            Last Updated: March 2026 | Thirumal Housing Promoters & Developers
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container" style={{ maxWidth: '860px', margin: '0 auto', padding: '50px 20px 80px', lineHeight: '1.8' }}>
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#0a3233', marginBottom: '14px' }}>
            1. Introduction
          </h2>
          <p style={{ color: '#475569', fontSize: '0.96rem' }}>
            At <strong>Thirumal Housing</strong>, we are committed to respecting your privacy and protecting any personal information you share with us. This Privacy Policy explains how we collect, use, store, and safeguard your details when you visit our website, submit property enquiry forms, or interact with our sales representatives.
          </p>
        </section>

        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#0a3233', marginBottom: '14px' }}>
            2. Information We Collect
          </h2>
          <p style={{ color: '#475569', fontSize: '0.96rem', marginBottom: '12px' }}>
            When you interact with our website or contact our team, we may collect the following information:
          </p>
          <ul style={{ paddingLeft: '24px', color: '#475569', fontSize: '0.96rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><strong>Personal Contact Information:</strong> Name, phone number, email address, and preferred contact timings.</li>
            <li><strong>Property Preferences:</strong> Desired budget range, plot dimensions, preferred layout locations (e.g., Kovilpatti, Sivakasi), and financing requirements.</li>
            <li><strong>Site Visit Details:</strong> Scheduled date, time, and companion count for accompanied site visits.</li>
            <li><strong>Technical Usage Data:</strong> IP address, device type, browser type, and anonymous site browsing analytics to improve user experience.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#0a3233', marginBottom: '14px' }}>
            3. How We Use Your Information
          </h2>
          <p style={{ color: '#475569', fontSize: '0.96rem', marginBottom: '12px' }}>
            We use your information strictly for legitimate real estate business purposes, including:
          </p>
          <ul style={{ paddingLeft: '24px', color: '#475569', fontSize: '0.96rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>Responding to your property enquiries and providing detailed plot brochures and layout maps.</li>
            <li>Arranging and coordinating personalized site visits to our ongoing and upcoming projects.</li>
            <li>Assisting with bank loan eligibility checks and document processing with our partner nationalized banks.</li>
            <li>Sending milestone project updates, pre-launch offers, and registration notifications.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#0a3233', marginBottom: '14px' }}>
            4. Information Sharing & Non-Disclosure
          </h2>
          <p style={{ color: '#475569', fontSize: '0.96rem' }}>
            We strictly respect your privacy. <strong>We do not sell, rent, or trade your personal information to third-party telemarketers or external advertising companies.</strong> We only share information with trusted third parties (such as legal advocates for parent document verification or bank loan sanction officers) with your explicit consent.
          </p>
        </section>

        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#0a3233', marginBottom: '14px' }}>
            5. Data Security
          </h2>
          <p style={{ color: '#475569', fontSize: '0.96rem' }}>
            We implement strict technical and organizational security measures to protect your personal details against unauthorized access, loss, or misuse. All website submissions are transmitted securely via SSL/TLS encryption.
          </p>
        </section>

        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#0a3233', marginBottom: '14px' }}>
            6. Contact Us Regarding Your Privacy
          </h2>
          <p style={{ color: '#475569', fontSize: '0.96rem', marginBottom: '16px' }}>
            If you have questions, feedback, or would like to request deletion of your contact records from our database, please contact our administrative desk:
          </p>
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
              Thirumal Nagar, Near New Bus Stand, Kovilpatti, Tamil Nadu – 628 501
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
