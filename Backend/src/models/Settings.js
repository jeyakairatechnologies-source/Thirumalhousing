import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    // ── Company / Global ──────────────────────────────────────────────────
    companyName: { type: String, default: 'Thirumal Housing' },
    tagline: { type: String, default: 'Leading Real Estate Developers in Kovilpatti & Sivakasi' },
    phone: { type: String, default: '+91 98400 12345' },
    altPhone: { type: String, default: '+91 98400 67890' },
    whatsappNumber: { type: String, default: '919840012345' },
    email: { type: String, default: 'sales@thirumalhousing.com' },
    address: { type: String, default: 'Thirumal Housing, Main Road, Kovilpatti & Sivakasi, Tamil Nadu' },
    officeHours: { type: String, default: 'Monday - Saturday: 9:00 AM - 7:00 PM | Sunday: 10:00 AM - 5:00 PM' },
    reraNumber: { type: String, default: 'TN/RERA/KOV/2023' },
    dtcpNumber: { type: String, default: 'DTCP/KOVILPATTI/2022' },
    proprietor: { type: String, default: 'Er. M. Thirumal Mahalingam B.E., M.I.E.' },
    aboutSummary: { type: String, default: 'For the past 15 years, we have been one of the leading real estate developers in Kovilpatti and its surrounding areas.' },
    logo: { type: String, default: '' },
    favicon: { type: String, default: '' },
    mapEmbed: { type: String, default: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3937.5!2d77.8687!3d9.1726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1620000000000' },

    // ── Social Links ──────────────────────────────────────────────────────
    socialLinks: {
      facebook: { type: String, default: 'https://facebook.com/thirumalhousing' },
      instagram: { type: String, default: 'https://instagram.com/thirumalhousing' },
      youtube: { type: String, default: 'https://youtube.com/@thirumalhousing' },
      twitter: { type: String, default: 'https://twitter.com/thirumalhousing' }
    },

    // ── Hero Banners ──────────────────────────────────────────────────────
    banners: {
      type: Array,
      default: [
        { slot: 1, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1500&h=500&q=80', title: 'DTCP & RERA Approved Residential Plots in Prime Locations' },
        { slot: 2, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1500&h=500&q=80', title: 'Grand Gated Communities with World-Class Infrastructure' },
        { slot: 3, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1500&h=500&q=80', title: 'Spot Booking Discounts & Immediate Free Registration' }
      ]
    },

    // ── Navbar / Header ───────────────────────────────────────────────────
    navbarContent: {
      topBarText: { type: String, default: 'DTCP & RERA Approved Layouts • Direct Developer Plots in Kovilpatti & Sivakasi' },
      ctaText: { type: String, default: 'Enquire Now' }
    },

    // ── Hero Section ──────────────────────────────────────────────────────
    heroSection: {
      height: { type: String, default: '100vh' }
    },

    // ── Home Page Content ─────────────────────────────────────────────────
    homeContent: {
      heroTitle: { type: String, default: 'BUILD YOUR DREAM HOME' },
      heroSubtitle: { type: String, default: 'Quality Homes | Prime Locations | 100% Clear Titles' },
      heroDescription: { type: String, default: 'Trusted real estate developers in Kovilpatti & Sivakasi for over 15 years.' },
      ctaText: { type: String, default: 'VIEW PROJECTS' },
      ctaLink: { type: String, default: '/projects' },
      ctaSecondaryText: { type: String, default: 'Enquire Now' },
      stats: {
        type: Array,
        default: [
          { value: '15+', label: 'Years of Real Estate Trust' },
          { value: '1,500+', label: 'Happy Families Settled' },
          { value: '100%', label: 'DTCP / RERA Approved' },
          { value: '6+', label: 'Prime Township Projects' }
        ]
      }
    },

    // ── About Content ─────────────────────────────────────────────────────
    aboutContent: {
      pageTitle: { type: String, default: '15 Years of Real Estate Leadership in Kovilpatti & Sivakasi' },
      pageSubtitle: { type: String, default: 'Delivering quality properties, valuable assets, and trusted investments that meet the highest aspirations of our customers.' },
      image: { type: String, default: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80' },
      title: { type: String, default: '15 Years of Trust & Excellence in Kovilpatti & Sivakasi' },
      text1: { type: String, default: 'For the past 15 years, we have been one of the leading real estate developers in Kovilpatti and its surrounding areas. We take pride in delivering quality properties and valuable assets that meet the aspirations of our customers.' },
      text2: { type: String, default: 'Our journey has been built on trust, quality, transparency, and customer satisfaction. The greatest testament to our success is that many of our customers continue to return to us for their next investments, placing their trust in us time and time again.' },
      vision: { type: String, default: 'To be the most trusted real estate brand in Tamil Nadu, known for delivering 100% legal, quality layouts.' },
      mission: { type: String, default: 'Providing affordable, DTCP-approved residential plots with transparent pricing and hassle-free documentation.' },
      features: {
        type: Array,
        default: ['100% DTCP Approved', 'Bank Loan Up to 80%', 'Immediate Patta Transfer', '24/7 Gated Security']
      },
      ctaText: { type: String, default: 'View Our Projects' },
      ctaLink: { type: String, default: '/projects' }
    },

    // ── Sections: Ongoing / ongoing / WhyUs / CTA ────────────────────────
    ongoingContent: {
      tag: { type: String, default: 'Active Developments' },
      title: { type: String, default: 'ONGOING PROJECTS' },
      subtitle: { type: String, default: "Ready-to-construct plots and luxury villas. Book now with attractive bank loan offers." },
      visible: { type: Boolean, default: true }
    },
    ongoingContent: {
      tag: { type: String, default: 'Coming Soon' },
      title: { type: String, default: 'ongoing PROJECTS' },
      subtitle: { type: String, default: 'Pre-launch master layouts with high expected appreciation.' },
      visible: { type: Boolean, default: true }
    },
    whyUsContent: {
      tag: { type: String, default: 'The Thirumal Advantage' },
      title: { type: String, default: 'WHY THIRUMAL HOUSING' },
      subtitle: { type: String, default: "We don't just sell plots; we build thriving, legally pristine residential neighborhoods." },
      visible: { type: Boolean, default: true }
    },
    ctaContent: {
      tag: { type: String, default: 'Ready to Begin?' },
      title: { type: String, default: 'Find Your Perfect Property' },
      subtitle: { type: String, default: 'Connect with our certified property advisors today for complimentary site visits and exclusive spot booking discounts.' },
      ctaText: { type: String, default: 'CONTACT US' },
      ctaLink: { type: String, default: '/contact' },
      visible: { type: Boolean, default: true }
    },

    // ── Contact Page ──────────────────────────────────────────────────────
    contactContent: {
      pageTitle: { type: String, default: 'Contact Thirumal Housing' },
      pageSubtitle: { type: String, default: 'Have a question about pricing or want to book a complimentary weekend site visit? We are here to guide you.' },
      siteVisitBanner: { type: String, default: 'We provide free doorstep pickup and drop across Chennai for prospective families visiting our sites.' },
      bannerTitle: { type: String, default: 'Complimentary Site Visit Car' }
    },

    // ── Footer ────────────────────────────────────────────────────────────
    footerContent: {
      description: { type: String, default: 'For over 15 years, Thirumal Housing has been the trusted leader for DTCP approved residential layouts, gated communities, and luxury plots across Kovilpatti, Sivakasi, and surrounding regions.' },
      copyright: { type: String, default: '© 2024 Thirumal Housing Promoters & Developers. All rights reserved.' },
      disclaimer: { type: String, default: 'All layouts developed and promoted by Thirumal Housing strictly comply with Tamil Nadu Town and Country Planning (DTCP) and Tamil Nadu Real Estate Regulatory Authority (TNRERA) guidelines.' },
      quickLinks: {
        type: Array,
        default: [
          { label: 'Home', url: '/' },
          { label: 'About Thirumal Housing', url: '/about' },
          { label: 'All Projects', url: '/projects' },
          { label: 'Project Gallery', url: '/gallery' },
          { label: 'Contact Us', url: '/contact' },
          { label: 'Book a Site Visit', url: '/enquiry' }
        ]
      }
    },

    // ── Misc ──────────────────────────────────────────────────────────────
    specialOffers: {
      type: Array,
      default: [
        { id: 1, title: 'Spot Booking Gold Coin Offer', tag: 'Limited Period', discount: 'Free 4g Gold Coin', desc: 'Book your dream plot today with 10% advance and receive an assured 916 gold coin.' },
        { id: 2, title: 'Immediate Registration Benefit', tag: 'Fast Track', discount: '100% Free Registration', desc: 'We cover complete DTCP documentation and patta transfer costs on select projects.' }
      ]
    }
  },
  { timestamps: true }
);

const Settings = mongoose.models.Settings || mongoose.model('Settings', settingsSchema);
export default Settings;
