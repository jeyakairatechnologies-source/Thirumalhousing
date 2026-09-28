const API_BASE_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('thirumal_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export const api = {
  // Projects
  async getProjects(params = {}) {
    const query = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}/projects${query ? `?${query}` : ''}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch projects');
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('[API] Projects fetch failed, using fallback:', err.message);
      return [];
    }
  },

  async getProjectBySlug(slug) {
    try {
      const res = await fetch(`${API_BASE_URL}/projects/${slug}`);
      if (!res.ok) throw new Error('Project not found');
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('[API] Project detail fetch failed:', err.message);
      return null;
    }
  },

  async createProject(projectData) {
    const res = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(projectData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create project');
    return data.data;
  },

  async updateProject(id, projectData) {
    const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(projectData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update project');
    return data.data;
  },

  async deleteProject(id) {
    const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete project');
    return true;
  },

  // Enquiries (Leads)
  async submitEnquiry(enquiryData) {
    const res = await fetch(`${API_BASE_URL}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiryData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to submit enquiry');
    return data;
  },

  async getEnquiries(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE_URL}/enquiries${query ? `?${query}` : ''}`, {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch enquiries');
    return data.data;
  },

  async updateEnquiryStatus(id, status, notes) {
    const res = await fetch(`${API_BASE_URL}/enquiries/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status, notes })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update enquiry status');
    return data.data;
  },

  async deleteEnquiry(id) {
    const res = await fetch(`${API_BASE_URL}/enquiries/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete enquiry');
    return true;
  },

  async getDashboardStats() {
    const res = await fetch(`${API_BASE_URL}/enquiries/stats`, {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch dashboard stats');
    return data.data;
  },

  // Gallery
  async getGallery(category = 'all') {
    try {
      const url = `${API_BASE_URL}/gallery${category && category !== 'all' ? `?category=${category}` : ''}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch gallery');
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('[API] Gallery fetch failed:', err.message);
      return [];
    }
  },

  async createGalleryItem(item) {
    const res = await fetch(`${API_BASE_URL}/gallery`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(item)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to add gallery photo');
    return data.data;
  },

  async deleteGalleryItem(id) {
    const res = await fetch(`${API_BASE_URL}/gallery/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete gallery item');
    return true;
  },

  async uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    const token = localStorage.getItem('thirumal_admin_token');
    const res = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: formData
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Upload failed');
    return `http://localhost:5000${data.url}`;
  },

  // Settings
  async getSettings() {
    try {
      const res = await fetch(`${API_BASE_URL}/settings`);
      if (!res.ok) throw new Error('Failed to fetch settings');
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('[API] Settings fetch failed:', err.message);
      return null;
    }
  },

  async updateSettings(settingsData) {
    const res = await fetch(`${API_BASE_URL}/settings`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(settingsData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update settings');
    return data.data;
  },

  // Stock & Inventory
  async updateProjectStock(id, availableUnits) {
    return this.updateProject(id, { availableUnits: Number(availableUnits) });
  },

  // Customers & Homebuyer Database
  async getCustomers() {
    try {
      const enquiries = await this.getEnquiries();
      // Derive customer accounts with spend/budget analytics from enquiries + persistent mock data
      const defaultCustomers = [
        {
          _id: 'cust-01',
          name: 'Muruganandam S',
          email: 'murugan.kovilpatti@gmail.com',
          phone: '9842145678',
          city: 'Kovilpatti',
          address: '45, Main Bazaar Street, Kovilpatti - 628501',
          joinedDate: '12 Jan 2024',
          totalSpend: '₹22,00,000',
          ordersCount: 2,
          status: 'Active',
          orders: [
            { id: 'ORD-7821', project: 'Thirumal Nagar I Block', plotNo: 'Plot #14', amount: '₹14,00,000', status: 'Booked', date: '15 Feb 2024' },
            { id: 'ORD-8942', project: 'Sudarshan Garden', plotNo: 'Plot #08', amount: '₹8,00,000', status: 'Inquiry', date: '10 Aug 2024' }
          ]
        },
        {
          _id: 'cust-02',
          name: 'Dr. Kavitha Ramesh',
          email: 'kavitha.dr@gmail.com',
          phone: '9443567890',
          city: 'Sivakasi',
          address: '12/4, Medical Colony, Vilampatti Road, Sivakasi - 626123',
          joinedDate: '04 Mar 2024',
          totalSpend: '₹28,50,000',
          ordersCount: 1,
          status: 'Active',
          orders: [
            { id: 'ORD-9012', project: 'Indraprastha Gated Community', plotNo: 'Villa Plot #03 (East)', amount: '₹28,50,000', status: 'Booked', date: '22 Mar 2024' }
          ]
        },
        {
          _id: 'cust-03',
          name: 'Ganesan P',
          email: 'ganesan.fireworks@yahoo.com',
          phone: '9787123456',
          city: 'Sivakasi',
          address: '88, Enjar Main Road, Sivakasi - 626124',
          joinedDate: '28 Apr 2024',
          totalSpend: '₹18,00,000',
          ordersCount: 1,
          status: 'Active',
          orders: [
            { id: 'ORD-9240', project: 'Sudarshan Garden', plotNo: 'Plot #21', amount: '₹18,00,000', status: 'Site Visit Completed', date: '02 May 2024' }
          ]
        },
        {
          _id: 'cust-04',
          name: 'Senthil Kumar V',
          email: 'senthil.business@gmail.com',
          phone: '9843219876',
          city: 'Madurai / Sivakasi',
          address: 'Flat 3B, Sri Ram Nivas, Bypass Road, Madurai - 625016',
          joinedDate: '15 Jun 2024',
          totalSpend: '₹34,00,000',
          ordersCount: 2,
          status: 'Active',
          orders: [
            { id: 'ORD-9450', project: 'Indraprastha Project', plotNo: 'Corner Plot #12', amount: '₹34,00,000', status: 'Processing', date: '18 Jun 2024' }
          ]
        }
      ];

      // Merge dynamic enquiries as customer leads
      const existingPhones = new Set(defaultCustomers.map(c => c.phone));
      if (Array.isArray(enquiries)) {
        enquiries.forEach((enq, idx) => {
          if (!existingPhones.has(enq.phone)) {
            defaultCustomers.push({
              _id: `cust-enq-${enq._id || idx}`,
              name: enq.name,
              email: enq.email || 'customer@lead.com',
              phone: enq.phone,
              city: 'Tamil Nadu',
              address: enq.address || 'Address provided during enquiry',
              joinedDate: new Date(enq.createdAt || Date.now()).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
              totalSpend: '₹15,00,000',
              ordersCount: 1,
              status: enq.status === 'converted' ? 'Converted' : 'Lead',
              orders: [
                { id: `LEAD-${enq._id?.slice(-4) || idx}`, project: enq.projectName || 'General Layout', plotNo: 'General', amount: '₹15,00,000', status: enq.status, date: new Date().toLocaleDateString() }
              ]
            });
            existingPhones.add(enq.phone);
          }
        });
      }

      return defaultCustomers;
    } catch (err) {
      console.warn('[API] Customer fetch fallback:', err);
      return [];
    }
  },

  // Auth
  async login(email, password) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Invalid email or password');
    return data.data;
  },

  async getMe() {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch user profile');
    return data.data;
  }
};
