import { initialProjects, initialEnquiries, initialGallery, initialSettings } from './initialData.js';
import bcrypt from 'bcryptjs';

// In-memory data store with stateful operations
class MockStore {
  constructor() {
    this.projects = [...initialProjects];
    this.enquiries = [...initialEnquiries];
    this.gallery = [...initialGallery];
    this.settings = { ...initialSettings };
    this.users = [
      {
        _id: 'user-admin-01',
        name: 'Thirumal Admin',
        email: process.env.ADMIN_EMAIL || 'admin@thirumalhousing.com',
        // default password: Admin@123
        passwordHash: bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'Admin@123', 10),
        role: 'admin',
        createdAt: new Date().toISOString()
      }
    ];
  }

  // Projects
  getProjects(filter = {}) {
    let result = [...this.projects];
    if (filter.status && filter.status !== 'all') {
      result = result.filter(p => p.status.toLowerCase() === filter.status.toLowerCase());
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.location.city.toLowerCase().includes(q) ||
        p.location.district.toLowerCase().includes(q)
      );
    }
    if (filter.isFeatured) {
      result = result.filter(p => p.isFeatured === true);
    }
    return result;
  }

  getProjectBySlug(slug) {
    return this.projects.find(p => p.slug === slug);
  }

  getProjectById(id) {
    return this.projects.find(p => p._id === id);
  }

  createProject(data) {
    const newProject = {
      _id: 'proj-' + Date.now(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.projects.unshift(newProject);
    return newProject;
  }

  updateProject(id, data) {
    const index = this.projects.findIndex(p => p._id === id || p.slug === id);
    if (index === -1) return null;
    this.projects[index] = {
      ...this.projects[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    return this.projects[index];
  }

  deleteProject(id) {
    const initialLen = this.projects.length;
    this.projects = this.projects.filter(p => p._id !== id && p.slug !== id);
    return this.projects.length < initialLen;
  }

  // Enquiries
  getEnquiries(filter = {}) {
    let result = [...this.enquiries];
    if (filter.status && filter.status !== 'all') {
      result = result.filter(e => e.status === filter.status);
    }
    return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  createEnquiry(data) {
    const newEnquiry = {
      _id: 'enq-' + Date.now(),
      status: 'new',
      notes: '',
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.enquiries.unshift(newEnquiry);
    return newEnquiry;
  }

  updateEnquiry(id, data) {
    const index = this.enquiries.findIndex(e => e._id === id);
    if (index === -1) return null;
    this.enquiries[index] = {
      ...this.enquiries[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    return this.enquiries[index];
  }

  deleteEnquiry(id) {
    const initialLen = this.enquiries.length;
    this.enquiries = this.enquiries.filter(e => e._id !== id);
    return this.enquiries.length < initialLen;
  }

  // Gallery
  getGallery(category) {
    if (!category || category === 'all') return this.gallery;
    return this.gallery.filter(g => g.category === category);
  }

  createGalleryItem(data) {
    const item = {
      _id: 'gal-' + Date.now(),
      ...data,
      createdAt: new Date().toISOString()
    };
    this.gallery.unshift(item);
    return item;
  }

  deleteGalleryItem(id) {
    const initialLen = this.gallery.length;
    this.gallery = this.gallery.filter(g => g._id !== id);
    return this.gallery.length < initialLen;
  }

  // Settings
  getSettings() {
    return this.settings;
  }

  updateSettings(data) {
    this.settings = { ...this.settings, ...data };
    return this.settings;
  }

  // Users
  getUserByEmail(email) {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  getUserById(id) {
    return this.users.find(u => u._id === id);
  }
}

export const mockStore = new MockStore();
