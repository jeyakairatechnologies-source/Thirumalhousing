import { useState, useEffect } from 'react';
import { api } from '../services/api.js';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortFilter, setSortFilter] = useState('newest');

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const initialForm = {
    name: '',
    tag: 'DTCP & RERA Approved',
    category: 'plots',
    status: 'ongoing',
    location: {
      address: '',
      city: 'Kovilpatti',
      district: 'Thoothukudi',
      state: 'Tamil Nadu'
    },
    description: '',
    shortDesc: 'Premium Residential Plots with World-Class Infrastructure',
    price: {
      startingFrom: 18,
      originalPrice: 22,
      priceUnit: 'Lakhs'
    },
    totalArea: '10 Acres',
    totalUnits: 120,
    availableUnits: 45,
    approvalType: 'DTCP Approved Layout',
    rating: 4.9,
    mainImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    highlights: 'DTCP Approved, 40ft Black Top Roads, Sweet Groundwater, 24/7 Security',
    amenities: 'Black Top Roads, Street Lights, Gated Compound Wall, Park, Overhead Water Tank',
    isFeatured: true
  };

  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await api.getProjects();
      setProjects(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Filter and sort logic
  useEffect(() => {
    let result = [...projects];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.approvalType?.toLowerCase().includes(q) ||
          p.location?.city?.toLowerCase().includes(q) ||
          p.location?.district?.toLowerCase().includes(q)
      );
    }

    if (categoryFilter !== 'all') {
      result = result.filter((p) => {
        if (categoryFilter === 'plots') return p.name?.toLowerCase().includes('nagar') || p.name?.toLowerCase().includes('garden') || p.totalUnits > 0;
        if (categoryFilter === 'villas') return p.name?.toLowerCase().includes('indraprastha') || p.name?.toLowerCase().includes('villa');
        if (categoryFilter === 'commercial') return p.approvalType?.toLowerCase().includes('commercial');
        return true;
      });
    }

    if (statusFilter !== 'all') {
      if (statusFilter === 'available') {
        result = result.filter((p) => (p.availableUnits || 0) > 0 && p.status !== 'completed');
      } else if (statusFilter === 'outofstock') {
        result = result.filter((p) => (p.availableUnits || 0) === 0 || p.status === 'completed');
      }
    }

    if (sortFilter === 'newest') {
      result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    } else if (sortFilter === 'low-high') {
      result.sort((a, b) => (a.price?.startingFrom || 0) - (b.price?.startingFrom || 0));
    } else if (sortFilter === 'high-low') {
      result.sort((a, b) => (b.price?.startingFrom || 0) - (a.price?.startingFrom || 0));
    }

    setFilteredProjects(result);
  }, [projects, search, categoryFilter, statusFilter, sortFilter]);

  const handleOpenAdd = () => {
    setEditingProject(null);
    setForm(initialForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project) => {
    setEditingProject(project);
    setForm({
      name: project.name || '',
      tag: project.approvalType || 'DTCP Approved',
      category: 'plots',
      status: project.status || 'ongoing',
      location: {
        address: project.location?.address || '',
        city: project.location?.city || 'Kovilpatti',
        district: project.location?.district || 'Thoothukudi',
        state: project.location?.state || 'Tamil Nadu'
      },
      description: project.description || '',
      shortDesc: project.shortDesc || 'Premium residential plots with clear legal title',
      price: {
        startingFrom: project.price?.startingFrom || 20,
        originalPrice: project.price?.originalPrice || (project.price?.startingFrom ? project.price.startingFrom + 4 : 24),
        priceUnit: project.price?.priceUnit || 'Lakhs'
      },
      totalArea: project.totalArea || '10 Acres',
      totalUnits: project.totalUnits || 100,
      availableUnits: project.availableUnits || 40,
      approvalType: project.approvalType || 'DTCP Approved',
      rating: project.rating || 4.9,
      mainImage: project.mainImage || '',
      highlights: (project.highlights || []).join(', '),
      amenities: (project.amenities || []).join(', '),
      isFeatured: Boolean(project.isFeatured)
    });
    setIsModalOpen(true);
  };

  const handleDeletePrompt = (project) => {
    setProjectToDelete(project);
    setDeleteModalOpen(true);
  };

  const executeDelete = async () => {
    if (!projectToDelete) return;
    try {
      await api.deleteProject(projectToDelete._id);
      showToast(`Project "${projectToDelete.name}" deleted successfully.`);
      setDeleteModalOpen(false);
      setProjectToDelete(null);
      fetchProjects();
    } catch (err) {
      showToast(`Error: ${err.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      ...form,
      highlights: typeof form.highlights === 'string' ? form.highlights.split(',').map((s) => s.trim()).filter(Boolean) : form.highlights,
      amenities: typeof form.amenities === 'string' ? form.amenities.split(',').map((s) => s.trim()).filter(Boolean) : form.amenities,
      images: [form.mainImage]
    };

    try {
      if (editingProject) {
        await api.updateProject(editingProject._id, payload);
        showToast('Project updated successfully.');
      } else {
        await api.createProject(payload);
        showToast('New project created successfully.');
      }
      setIsModalOpen(false);
      fetchProjects();
    } catch (err) {
      showToast(`Error: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Toast alert */}
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

      {/* Page Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">Projects Inventory</h2>
          <p className="page-subtitle">Add, edit, manage stock, and delete property projects</p>
        </div>
        <button className="btn btn-purple" onClick={handleOpenAdd}>
          + Add New Project
        </button>
      </div>

      {/* Control Bar (Matching Hisuvai) */}
      <div className="controls-bar">
        <div className="search-input-wrap">
          <svg className="search-icon" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search by project name, approval, locality..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filters-group">
          <select
            className="select-ctrl"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="plots">Residential Plots</option>
            <option value="villas">Gated Community Villas</option>
            <option value="commercial">Commercial Land</option>
          </select>

          <select
            className="select-ctrl"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Availability</option>
            <option value="available">In Stock &amp; Active</option>
            <option value="outofstock">Sold Out / Completed</option>
          </select>

          <select
            className="select-ctrl"
            value={sortFilter}
            onChange={(e) => setSortFilter(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product / Project Table */}
      <div className="table-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Project &amp; Tag</th>
              <th>Location</th>
              <th>Price</th>
              <th>Units / Plots</th>
              <th>Status</th>
              <th>Featured</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  Loading projects from database...
                </td>
              </tr>
            ) : filteredProjects.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No projects found matching your filter criteria.
                </td>
              </tr>
            ) : (
              filteredProjects.map((project) => (
                <tr key={project._id}>
                  <td>
                    <div className="prod-thumb-cell">
                      <img src={project.mainImage} alt={project.name} />
                    </div>
                  </td>
                  <td>
                    <div className="prod-title-cell">
                      <strong>{project.name}</strong>
                      <span className="badge cat">{project.approvalType || 'DTCP Approved'}</span>
                    </div>
                  </td>
                  <td>
                    <strong style={{ fontSize: '0.85rem' }}>{project.location?.city || 'Tamil Nadu'}</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {project.location?.district}
                    </div>
                  </td>
                  <td>
                    <strong style={{ color: 'var(--purple-accent)', fontSize: '0.95rem' }}>
                      ₹{project.price?.startingFrom} L
                    </strong>
                    {project.price?.originalPrice && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                        ₹{project.price.originalPrice} L
                      </div>
                    )}
                  </td>
                  <td>
                    <strong>{project.availableUnits}</strong> / {project.totalUnits} Plots
                  </td>
                  <td>
                    <span
                      className={`badge ${(project.availableUnits || 0) === 0
                          ? 'outofstock'
                          : project.status === 'completed'
                            ? 'status-completed'
                            : 'available'
                        }`}
                    >
                      {(project.availableUnits || 0) === 0 ? 'Sold Out' : project.status || 'Active'}
                    </span>
                  </td>
                  <td>
                    {project.isFeatured ? (
                      <span className="badge featured">★ Featured</span>
                    ) : (
                      <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>Standard</span>
                    )}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="action-btns" style={{ justifyContent: 'flex-end' }}>
                      <a
                        href={`/project/${project.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline btn-sm"
                        style={{ padding: '6px 10px' }}
                        title="View Live Page"
                      >
                        👁️
                      </a>
                      <button
                        type="button"
                        className="btn btn-purple btn-sm"
                        style={{ padding: '6px 10px' }}
                        onClick={() => handleOpenEdit(project)}
                        title="Edit Project"
                      >
                        ✏️
                      </button>
                      <button
                        type="button"
                        className="btn btn-crimson btn-sm"
                        style={{ padding: '6px 10px' }}
                        onClick={() => handleDeletePrompt(project)}
                        title="Delete Project"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal 1: Add / Edit Project */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                {editingProject ? `Edit Project: ${editingProject.name}` : 'Add New Project'}
              </h3>
              <button type="button" className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    Project Name <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. Thirumal Nagar – I Block"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category / Type <span className="req">*</span></label>
                  <select
                    className="form-control"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                  >
                    <option value="plots">Residential Plots</option>
                    <option value="villas">Gated Community Villas</option>
                    <option value="commercial">Commercial Land</option>
                    <option value="farmland">Managed Farmland</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Tag / Badge</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. DTCP & RERA Approved, Clubhouse"
                    value={form.tag}
                    onChange={(e) => setForm({ ...form, tag: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Project Status <span className="req">*</span></label>
                  <select
                    className="form-control"
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                  >
                    <option value="ongoing">Ongoing (Booking Open)</option>
                    <option value="ongoing">ongoing (Pre-Launch)</option>
                    <option value="completed">Completed (100% Sold Out)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Selling Price (₹ Lakhs) <span className="req">*</span></label>
                  <input
                    type="number"
                    required
                    min="1"
                    className="form-control"
                    placeholder="18"
                    value={form.price.startingFrom}
                    onChange={(e) =>
                      setForm({ ...form, price: { ...form.price, startingFrom: Number(e.target.value) } })
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Original / Market Price (₹ Lakhs)</label>
                  <input
                    type="number"
                    min="1"
                    className="form-control"
                    placeholder="22"
                    value={form.price.originalPrice}
                    onChange={(e) =>
                      setForm({ ...form, price: { ...form.price, originalPrice: Number(e.target.value) } })
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Available Units / Plots <span className="req">*</span></label>
                  <input
                    type="number"
                    required
                    min="0"
                    className="form-control"
                    placeholder="45"
                    value={form.availableUnits}
                    onChange={(e) => setForm({ ...form, availableUnits: Number(e.target.value) })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Total Units in Layout <span className="req">*</span></label>
                  <input
                    type="number"
                    required
                    min="1"
                    className="form-control"
                    placeholder="120"
                    value={form.totalUnits}
                    onChange={(e) => setForm({ ...form, totalUnits: Number(e.target.value) })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">City / Locality <span className="req">*</span></label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. Kovilpatti or Sivakasi"
                    value={form.location.city}
                    onChange={(e) =>
                      setForm({ ...form, location: { ...form.location, city: e.target.value } })
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">District <span className="req">*</span></label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. Thoothukudi or Virudhunagar"
                    value={form.location.district}
                    onChange={(e) =>
                      setForm({ ...form, location: { ...form.location, district: e.target.value } })
                    }
                  />
                </div>

                <div className="form-group full">
                  <label className="form-label">Full Address / Landmark</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Near Dora Park / Vilampatti Main Road..."
                    value={form.location.address}
                    onChange={(e) =>
                      setForm({ ...form, location: { ...form.location, address: e.target.value } })
                    }
                  />
                </div>

                <div className="form-group full">
                  <label className="form-label">Main Image URL or Upload</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="https://images.unsplash.com/..."
                      value={form.mainImage}
                      onChange={(e) => setForm({ ...form, mainImage: e.target.value })}
                    />
                    <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer', margin: 0, whiteSpace: 'nowrap' }}>
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          if (file) {
                            try {
                              const url = await api.uploadFile(file);
                              setForm((prev) => ({ ...prev, mainImage: url }));
                            } catch (err) {
                              alert('Upload failed: ' + err.message);
                            }
                          }
                        }}
                      />
                    </label>
                  </div>
                  {form.mainImage && (
                    <div style={{ marginTop: '8px' }}>
                      <img
                        src={form.mainImage}
                        alt="Preview"
                        style={{ height: '70px', borderRadius: '6px', objectFit: 'cover' }}
                      />
                    </div>
                  )}
                </div>

                <div className="form-group full">
                  <label className="form-label">Short Tagline Summary</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. DTCP Approved Plots with 40ft Roads & Sweet Water"
                    value={form.shortDesc}
                    onChange={(e) => setForm({ ...form, shortDesc: e.target.value })}
                  />
                </div>

                <div className="form-group full">
                  <label className="form-label">Full Description <span className="req">*</span></label>
                  <textarea
                    rows={3}
                    required
                    className="form-control"
                    placeholder="Comprehensive description of layout amenities, strategic advantages, and investment potential..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                  />
                </div>

                <div className="form-group full">
                  <label className="form-label">Key Highlights (Comma separated)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="DTCP Approved, 40ft Tar Roads, 24/7 Security"
                    value={form.highlights}
                    onChange={(e) => setForm({ ...form, highlights: e.target.value })}
                  />
                </div>

                <div className="form-group full">
                  <label className="form-label">Amenities (Comma separated)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Park, Street Lights, Water Tank, Clubhouse"
                    value={form.amenities}
                    onChange={(e) => setForm({ ...form, amenities: e.target.value })}
                  />
                </div>

                <div className="form-group full" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    id="form-is-featured"
                    checked={form.isFeatured}
                    onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                  />
                  <label htmlFor="form-is-featured" style={{ fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
                    Feature this project on the homepage
                  </label>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '12px',
                  borderTop: '1px solid var(--border-color)',
                  padding: '16px 24px'
                }}
              >
                <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="btn btn-purple">
                  {submitting ? 'Saving...' : editingProject ? 'Update Project' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Delete Confirmation (Matching Hisuvai) */}
      {deleteModalOpen && projectToDelete && (
        <div className="modal-overlay" onClick={() => setDeleteModalOpen(false)}>
          <div className="modal-box" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title" style={{ color: 'var(--danger)' }}>
                Delete Item
              </h3>
              <button type="button" className="modal-close-btn" onClick={() => setDeleteModalOpen(false)}>
                ✕
              </button>
            </div>
            <div style={{ padding: '24px' }}>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '24px' }}>
                Are you sure you want to delete <strong style={{ color: 'var(--danger)' }}>{projectToDelete.name}</strong>?
                This action will remove the property from public listings.
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" className="btn btn-outline" onClick={() => setDeleteModalOpen(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-crimson" onClick={executeDelete}>
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
