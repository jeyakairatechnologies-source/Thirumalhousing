export const initialProjects = [
  {
    _id: 'proj-001',
    name: 'Thirumal Nagar – I Block',
    slug: 'thirumal-nagar-i-block-kovilpatti',
    status: 'ongoing',
    location: {
      address: 'Near Veeralakshmi Narasimhar Temple & Dora Park',
      city: 'Kovilpatti',
      district: 'Thoothukudi',
      state: 'Tamil Nadu',
      latitude: 9.1726,
      longitude: 77.8687
    },
    description: 'We are newly introducing I Block in Thirumal Nagar, featuring approximately 160 plots, situated amidst hundreds of houses. The renowned Veeralakshmi Narasimhar Temple is located in the area. Dora Park is also a popular gathering place for hundreds of people. Edustar, KRA, and Unnamalai educational institutions are located nearby.',
    price: {
      startingFrom: 18,
      priceUnit: 'Lakhs'
    },
    totalArea: '8.5 Acres',
    totalUnits: 160,
    availableUnits: 68,
    approvalType: 'DTCP & RERA Approved',
    highlights: [
      'Newly Introduced I Block with ~160 Premium Plots',
      'Situated amidst hundreds of established residential houses',
      'Near the renowned Veeralakshmi Narasimhar Temple',
      'Walking distance to Dora Park community gathering center',
      'Close to Edustar, KRA, and Unnamalai Educational Institutions',
      '100% Clear Title with Immediate Patta & Bank Loan Assistance'
    ],
    amenities: [
      'Wide Black Top Tar Roads',
      'Solar Street Lighting & 24/7 Electricity',
      'Abundant Sweet Potable Groundwater',
      'Gated Community with Boundary Walls',
      'Proximity to Dora Park & Recreation Spaces',
      'Storm Water Drainage System'
    ],
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    floorPlans: [
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80'
    ],
    brochure: '/brochures/thirumal-nagar-i-block.pdf',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3937.5!2d77.8687!3d9.1726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1620000000000',
    isFeatured: true,
    createdAt: new Date(Date.now() - 10 * 24 * 3600 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'proj-002',
    name: 'Sudarshan Garden',
    slug: 'sudarshan-garden-enjar-road-sivakasi',
    status: 'ongoing',
    location: {
      address: 'Enjar Road, Near Reputed Schools & Colleges',
      city: 'Sivakasi',
      district: 'Virudhunagar',
      state: 'Tamil Nadu',
      latitude: 9.4533,
      longitude: 77.7946
    },
    description: 'Sudarshan Garden, a residential plot development currently available for sale on Enjar Road in Sivakasi, is already growing into a well-established residential community with more than 25 houses.',
    price: {
      startingFrom: 15,
      priceUnit: 'Lakhs'
    },
    totalArea: '6.2 Acres',
    totalUnits: 95,
    availableUnits: 34,
    approvalType: 'DTCP Approved Layout',
    highlights: [
      '40-foot and 30-foot-wide well-planned roads',
      'Beautiful and well-maintained park facilities',
      'Developed residential area with more than 25 houses already built',
      'Very close to top reputed schools and colleges in Sivakasi',
      'An ideal location for peaceful family living and high future appreciation'
    ],
    amenities: [
      '40-foot & 30-foot Wide Tar Roads',
      'Beautiful Park & Landscaped Children Play Area',
      'Sweet Groundwater Connection & Borewell Supply',
      'Street Lights & Electric Line Connections',
      'Gated Entrance Arch'
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    floorPlans: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80'
    ],
    brochure: '/brochures/sudarshan-garden-sivakasi.pdf',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3935.0!2d77.7946!3d9.4533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1620000000001',
    isFeatured: true,
    createdAt: new Date(Date.now() - 15 * 24 * 3600 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'proj-003',
    name: 'INDRAPRASTHA',
    slug: 'indraprastha-vilampatti-sivakasi',
    status: 'ongoing',
    location: {
      address: 'Vilampatti, Near Sivakasi Main Hub',
      city: 'Vilampatti, Sivakasi',
      district: 'Virudhunagar',
      state: 'Tamil Nadu',
      latitude: 9.4712,
      longitude: 77.8123
    },
    description: 'We are currently developing the Indraprastha Project at Vilampatti, Sivakasi — a world-class pure gated community featuring a Clubhouse and Swimming Pool, along with a well-planned and premium residential environment. This prestigious project is being developed with a focus on providing a comfortable and modern lifestyle for families. Indraprastha Project will be launched very soon.',
    price: {
      startingFrom: 22,
      priceUnit: 'Lakhs'
    },
    totalArea: '12 Acres',
    totalUnits: 180,
    availableUnits: 180,
    approvalType: 'Premium DTCP & RERA Proposed Gated Community',
    highlights: [
      'World-class Pure Gated Community in Vilampatti, Sivakasi',
      'Exclusive Resident Clubhouse with Indoor Recreational Facilities',
      'Luxury Swimming Pool & Kids Splash Zone',
      'Well-planned and premium residential living environment',
      'Engineered for comfortable, elevated and modern lifestyle for families',
      'Exclusive Pre-Launch Early Bird Registration Open'
    ],
    amenities: [
      'Clubhouse with Indoor Games & Gym',
      'Modern Swimming Pool',
      'Grand Royal Arch Entrance with 24/7 Security Cabin',
      'Underground Electrical Cables & Drainage System',
      '40ft & 33ft Wide Asphalt Roads with Solar Streetlights',
      'Landscaped Theme Gardens & Jogging Track'
    ],
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    floorPlans: [
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80'
    ],
    brochure: '/brochures/indraprastha-sivakasi.pdf',
    mapUrl: '',
    isFeatured: true,
    createdAt: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'proj-004',
    name: 'Thirumal Nagar – Phase I & II',
    slug: 'thirumal-nagar-phase-1-kovilpatti',
    status: 'completed',
    location: {
      address: 'Main Town Corridor, Kovilpatti',
      city: 'Kovilpatti',
      district: 'Thoothukudi',
      state: 'Tamil Nadu',
      latitude: 9.175,
      longitude: 77.865
    },
    description: 'A 100% delivered landmark residential layout with over 200 happy families who have already constructed and occupied their dream homes in Kovilpatti.',
    price: {
      startingFrom: 16,
      priceUnit: 'Lakhs'
    },
    totalArea: '10 Acres',
    totalUnits: 200,
    availableUnits: 0,
    approvalType: 'DTCP Approved Layout',
    highlights: [
      '100% Sold Out with 120+ Houses Fully Constructed',
      'Thriving community living with immediate neighbor connect',
      'Highest value appreciation in Kovilpatti region',
      'Clear legal title and energized utility connections'
    ],
    amenities: [
      'Black Top Tar Roads',
      'Operational Streetlights',
      'Overhead Potable Water Supply',
      'Children Play Area'
    ],
    images: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
    floorPlans: [],
    brochure: '',
    mapUrl: '',
    isFeatured: false,
    createdAt: new Date(Date.now() - 150 * 24 * 3600 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const initialEnquiries = [
  {
    _id: 'enq-001',
    name: 'Muruganandam S',
    phone: '9842145678',
    email: 'murugan.kovilpatti@gmail.com',
    project: 'proj-001',
    projectName: 'Thirumal Nagar – I Block',
    message: 'Interested in booking a 1200 sq.ft plot in Thirumal Nagar I Block near Dora Park. Need site visit on Saturday.',
    source: 'project-page',
    status: 'new',
    notes: 'Called customer, scheduled site visit for Saturday 11 AM.',
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString()
  },
  {
    _id: 'enq-002',
    name: 'Ganesan P',
    phone: '9787123456',
    email: 'ganesan.fireworks@yahoo.com',
    project: 'proj-002',
    projectName: 'Sudarshan Garden',
    message: 'Looking for 30ft road plot on Enjar Road Sivakasi. Please share price details.',
    source: 'website',
    status: 'contacted',
    notes: 'Sent brochure & price sheet over WhatsApp.',
    createdAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 3600 * 1000).toISOString()
  },
  {
    _id: 'enq-003',
    name: 'Dr. Kavitha Ramesh',
    phone: '9443567890',
    email: 'kavitha.dr@gmail.com',
    project: 'proj-003',
    projectName: 'INDRAPRASTHA',
    message: 'Interested in pre-launch booking in Indraprastha Vilampatti gated community with clubhouse.',
    source: 'website',
    status: 'interested',
    notes: 'Site visit completed. Customer interested in East facing corner plot.',
    createdAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString()
  }
];

export const initialGallery = [
  {
    _id: 'gal-001',
    title: 'Thirumal Nagar I Block - Kovilpatti',
    category: 'layouts',
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    description: 'Newly introduced I Block layout amidst thriving residential area.'
  },
  {
    _id: 'gal-002',
    title: 'Sudarshan Garden - Enjar Road Sivakasi',
    category: 'ongoing',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    description: '40-foot & 30-foot roads with 25+ houses already constructed.'
  },
  {
    _id: 'gal-003',
    title: 'Indraprastha Gated Community - Vilampatti Sivakasi',
    category: 'ongoing',
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    description: 'ongoing pure gated community with Clubhouse and Swimming Pool.'
  },
  {
    _id: 'gal-004',
    title: 'Park & Green Avenue Walkways',
    category: 'amenities',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: 'Well-maintained park facilities in our developments.'
  }
];

export const initialSettings = {
  companyName: 'Thirumal Housing',
  tagline: 'Leading Real Estate Developers in Kovilpatti & Sivakasi',
  phone: '+91 98400 12345',
  altPhone: '+91 98400 67890',
  whatsappNumber: '919840012345',
  email: 'sales@thirumalhousing.com',
  address: 'Thirumal Housing, Main Road, Kovilpatti & Sivakasi, Tamil Nadu',
  officeHours: 'Monday - Saturday: 9:00 AM - 7:00 PM | Sunday: 10:00 AM - 5:00 PM',
  reraNumber: 'TN/RERA/KOV/2023',
  dtcpNumber: 'DTCP/KOVILPATTI/2022',
  proprietor: 'Er. M. Thirumal Mahalingam B.E., M.I.E.',
  aboutSummary: 'For the past 15 years, we have been one of the leading real estate developers in Kovilpatti and its surrounding areas.',
  logo: '',
  favicon: '',
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3937.5!2d77.8687!3d9.1726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1620000000000',
  socialLinks: {
    facebook: 'https://facebook.com/thirumalhousing',
    instagram: 'https://instagram.com/thirumalhousing',
    youtube: 'https://youtube.com/@thirumalhousing',
    twitter: 'https://twitter.com/thirumalhousing'
  },
  banners: [
    { slot: 1, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1500&h=500&q=80', title: 'DTCP & RERA Approved Residential Plots in Prime Locations' },
    { slot: 2, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1500&h=500&q=80', title: 'Grand Gated Communities with World-Class Infrastructure' },
    { slot: 3, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1500&h=500&q=80', title: 'Spot Booking Discounts & Immediate Free Registration' }
  ],
  navbarContent: {
    topBarText: 'DTCP & RERA Approved Layouts • Direct Developer Plots in Kovilpatti & Sivakasi',
    ctaText: 'Enquire Now'
  },
  heroSection: {
    height: '100vh'
  },
  homeContent: {
    heroTitle: 'BUILD YOUR DREAM HOME',
    heroSubtitle: 'Quality Homes | Prime Locations | 100% Clear Titles',
    heroDescription: 'Trusted real estate developers in Kovilpatti & Sivakasi for over 15 years.',
    ctaText: 'VIEW PROJECTS',
    ctaLink: '/projects',
    ctaSecondaryText: 'Enquire Now',
    stats: [
      { value: '15+', label: 'Years of Real Estate Trust' },
      { value: '1,500+', label: 'Happy Families Settled' },
      { value: '100%', label: 'DTCP / RERA Approved' },
      { value: '6+', label: 'Prime Township Projects' }
    ]
  },
  aboutContent: {
    pageTitle: '15 Years of Real Estate Leadership in Kovilpatti & Sivakasi',
    pageSubtitle: 'Delivering quality properties, valuable assets, and trusted investments that meet the highest aspirations of our customers.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80',
    title: '15 Years of Trust & Excellence in Kovilpatti & Sivakasi',
    text1: 'For the past 15 years, we have been one of the leading real estate developers in Kovilpatti and its surrounding areas. We take pride in delivering quality properties and valuable assets that meet the aspirations of our customers.',
    text2: 'Our journey has been built on trust, quality, transparency, and customer satisfaction. The greatest testament to our success is that many of our customers continue to return to us for their next investments, placing their trust in us time and time again.',
    vision: 'To be the most trusted real estate brand in Tamil Nadu, known for delivering 100% legal, quality layouts.',
    mission: 'Providing affordable, DTCP-approved residential plots with transparent pricing and hassle-free documentation.',
    features: ['100% DTCP Approved', 'Bank Loan Up to 80%', 'Immediate Patta Transfer', '24/7 Gated Security'],
    ctaText: 'View Our Projects',
    ctaLink: '/projects'
  },
  ongoingContent: {
    tag: 'Active Developments',
    title: 'ONGOING PROJECTS',
    subtitle: "Ready-to-construct plots and luxury villas. Book now with attractive bank loan offers.",
    visible: true
  },
  ongoingContent: {
    tag: 'Coming Soon',
    title: 'ongoing PROJECTS',
    subtitle: 'Pre-launch master layouts with high expected appreciation.',
    visible: true
  },
  whyUsContent: {
    tag: 'The Thirumal Advantage',
    title: 'WHY THIRUMAL HOUSING',
    subtitle: "We don't just sell plots; we build thriving, legally pristine residential neighborhoods.",
    visible: true
  },
  ctaContent: {
    tag: 'Ready to Begin?',
    title: 'Find Your Perfect Property',
    subtitle: 'Connect with our certified property advisors today for complimentary site visits and exclusive spot booking discounts.',
    ctaText: 'CONTACT US',
    ctaLink: '/contact',
    visible: true
  },
  contactContent: {
    pageTitle: 'Contact Thirumal Housing',
    pageSubtitle: 'Have a question about pricing or want to book a complimentary weekend site visit? We are here to guide you.',
    siteVisitBanner: 'We provide free doorstep pickup and drop across Chennai for prospective families visiting our sites.',
    bannerTitle: 'Complimentary Site Visit Car'
  },
  footerContent: {
    description: 'For over 15 years, Thirumal Housing has been the trusted leader for DTCP approved residential layouts, gated communities, and luxury plots across Kovilpatti, Sivakasi, and surrounding regions.',
    copyright: '© 2024 Thirumal Housing Promoters & Developers. All rights reserved.',
    disclaimer: 'All layouts developed and promoted by Thirumal Housing strictly comply with Tamil Nadu Town and Country Planning (DTCP) and TNRERA guidelines.',
    quickLinks: [
      { label: 'Home', url: '/' },
      { label: 'About Thirumal Housing', url: '/about' },
      { label: 'All Projects', url: '/projects' },
      { label: 'Project Gallery', url: '/gallery' },
      { label: 'Contact Us', url: '/contact' },
      { label: 'Book a Site Visit', url: '/enquiry' }
    ]
  }
};
