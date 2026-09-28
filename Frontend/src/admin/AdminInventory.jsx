import { useState, useEffect } from 'react';
import { api } from '../services/api.js';

export default function AdminInventory() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockStatusFilter, setStockStatusFilter] = useState('all');

  // Stock Edit Modal
  const [stockModalOpen, setStockModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newStockVal, setNewStockVal] = useState(0);
  const [submittingStock, setSubmittingStock] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const loadAdminInventory = async () => {
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
    loadAdminInventory();
  }, []);

  // Filter logic
  useEffect(() => {
    let result = [...projects];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.location?.city?.toLowerCase().includes(q) ||
          p.location?.district?.toLowerCase().includes(q)
      );
    }

    if (categoryFilter !== 'all') {
      result = result.filter((p) => {
        if (categoryFilter === 'plots') return p.name?.toLowerCase().includes('nagar') || p.name?.toLowerCase().includes('garden');
        if (categoryFilter === 'villas') return p.name?.toLowerCase().includes('indraprastha');
        return true;
      });
    }

    if (stockStatusFilter !== 'all') {
      if (stockStatusFilter === 'instock') {
        result = result.filter((p) => (p.availableUnits || 0) > 15);
      } else if (stockStatusFilter === 'lowstock') {
        result = result.filter((p) => (p.availableUnits || 0) > 0 && (p.availableUnits || 0) <= 15);
      } else if (stockStatusFilter === 'outofstock') {
        result = result.filter((p) => (p.availableUnits || 0) === 0);
      }
    }

    setFilteredProjects(result);
  }, [projects, search, categoryFilter, stockStatusFilter]);

  // KPIs
  const totalPlots = projects.reduce((acc, p) => acc + (p.totalUnits || 0), 0);
  const availablePlots = projects.reduce((acc, p) => acc + (p.availableUnits || 0), 0);
  const outOfStockCount = projects.filter((p) => (p.availableUnits || 0) === 0).length;
  const lowStockCount = projects.filter((p) => (p.availableUnits || 0) > 0 && (p.availableUnits || 0) <= 15).length;
  const totalValuationCr = (
    projects.reduce((acc, p) => acc + (p.availableUnits || 0) * (p.price?.startingFrom || 20), 0) / 100
  ).toFixed(2);

  const openStockModal = (project) => {
    setSelectedProject(project);
    setNewStockVal(project.availableUnits || 0);
    setStockModalOpen(true);
  };

  const handleStockSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProject) return;
    setSubmittingStock(true);
    try {
      await api.updateProjectStock(selectedProject._id, newStockVal);
      setProjects((prev) =>
        prev.map((p) => (p._id === selectedProject._id ? { ...p, availableUnits: Number(newStockVal) } : p))
      );
      showToast(`Stock updated for ${selectedProject.name}`);
      setStockModalOpen(false);
    } catch (err) {
      showToast(`Error: ${err.message}`);
    } finally {
      setSubmittingStock(false);
    }
  };

  return (
    <div>
      {/* Toast Alert */}
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

      {/* Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">Inventory Control Centre</h2>
          <p className="page-subtitle">Monitor plot stock status, record availability adjustments, and review inventory valuation.</p>
        </div>
        <button className="btn btn-outline" onClick={loadAdminInventory}>
          🔄 Refresh Inventory
        </button>
      </div>

      {/* Inventory KPI Cards (Matching Hisuvai) */}
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))' }}>
        <div className="kpi-card">
          <div className="kpi-icon-wrap" style={{ background: 'rgba(124,58,237,0.12)', color: '#7C3AED' }}>
            📦
          </div>
          <div>
            <div className="kpi-label">TOTAL PLOTS</div>
            <div className="kpi-val" id="inv-kpi-total">{totalPlots}</div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrap" style={{ background: 'rgba(16,185,129,0.12)', color: '#10B981' }}>
            💰
          </div>
          <div>
            <div className="kpi-label">STOCK VALUATION</div>
            <div className="kpi-val" id="inv-kpi-valuation">₹{totalValuationCr} Cr</div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrap" style={{ background: 'rgba(239,68,68,0.12)', color: '#EF4444' }}>
            🚫
          </div>
          <div>
            <div className="kpi-label">OUT OF STOCK</div>
            <div className="kpi-val" id="inv-kpi-outofstock">{outOfStockCount}</div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrap" style={{ background: 'rgba(245,158,11,0.12)', color: '#F59E0B' }}>
            ⚠️
          </div>
          <div>
            <div className="kpi-label">LOW STOCK ALERT</div>
            <div className="kpi-val" id="inv-kpi-lowstock">{lowStockCount}</div>
          </div>
        </div>
      </div>

      {/* Inventory Controls Bar */}
      <div className="controls-bar">
        <div className="search-input-wrap">
          <svg className="search-icon" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search inventory by project name, locality..."
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
            <option value="villas">Villas &amp; Gated Communities</option>
          </select>

          <select
            className="select-ctrl"
            value={stockStatusFilter}
            onChange={(e) => setStockStatusFilter(e.target.value)}
          >
            <option value="all">All Stock Status</option>
            <option value="instock">In Stock (&gt;15)</option>
            <option value="lowstock">Low Stock (1 - 15)</option>
            <option value="outofstock">Out of Stock (0)</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="table-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th>PROPERTY / PROJECT NAME</th>
              <th>CATEGORY &amp; LOCALITY</th>
              <th>PRICE</th>
              <th>STOCK LEVEL STATUS</th>
              <th style={{ textAlign: 'center' }}>QUICK ADJUST</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  Loading inventory records from database...
                </td>
              </tr>
            ) : filteredProjects.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No inventory records found matching your filter criteria.
                </td>
              </tr>
            ) : (
              filteredProjects.map((project) => {
                const avail = project.availableUnits || 0;
                const total = project.totalUnits || 1;
                const pct = Math.round((avail / total) * 100);

                return (
                  <tr key={project._id}>
                    <td>
                      <div className="prod-title-cell">
                        <strong>{project.name}</strong>
                        <span>{project.approvalType || 'DTCP Layout'}</span>
                      </div>
                    </td>
                    <td>
                      <strong style={{ fontSize: '0.85rem' }}>{project.location?.city}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {project.location?.district}
                      </div>
                    </td>
                    <td>
                      <strong style={{ color: 'var(--purple-accent)' }}>
                        ₹{project.price?.startingFrom} Lakhs
                      </strong>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ flex: 1, minWidth: '100px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '2px' }}>
                            <span><strong>{avail}</strong> / {total} plots</span>
                            <span style={{ color: avail === 0 ? '#EF4444' : avail <= 15 ? '#F59E0B' : '#10B981', fontWeight: 700 }}>
                              {pct}%
                            </span>
                          </div>
                          <div style={{ width: '100%', height: '6px', background: 'var(--bg-surface-2)', borderRadius: '3px', overflow: 'hidden' }}>
                            <div
                              style={{
                                width: `${pct}%`,
                                height: '100%',
                                background: avail === 0 ? '#EF4444' : avail <= 15 ? '#F59E0B' : '#10B981'
                              }}
                            />
                          </div>
                        </div>
                        <span
                          className={`badge ${avail === 0 ? 'outofstock' : avail <= 15 ? 'status-pending' : 'available'}`}
                          style={{ minWidth: '85px', textAlign: 'center' }}
                        >
                          {avail === 0 ? 'Sold Out' : avail <= 15 ? 'Low Stock' : 'In Stock'}
                        </span>
                      </div>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        type="button"
                        className="btn btn-purple btn-sm"
                        onClick={() => openStockModal(project)}
                      >
                        ⚡ Adjust Units
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Stock Edit Modal (Matching Hisuvai) */}
      {stockModalOpen && selectedProject && (
        <div className="modal-overlay" onClick={() => setStockModalOpen(false)}>
          <div className="modal-box" style={{ maxWidth: '420px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Edit Stock Level</h3>
              <button type="button" className="modal-close-btn" onClick={() => setStockModalOpen(false)}>
                ✕
              </button>
            </div>
            <form onSubmit={handleStockSubmit} style={{ padding: '24px' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Update available inventory plots for <strong style={{ color: 'var(--text-primary)' }}>{selectedProject.name}</strong>:
              </p>
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label className="form-label" htmlFor="stock-modal-input">
                  Available Plots Quantity (Units)
                </label>
                <input
                  type="number"
                  id="stock-modal-input"
                  className="form-control"
                  min="0"
                  max={selectedProject.totalUnits || 500}
                  step="1"
                  required
                  style={{ fontSize: '1.1rem', fontWeight: 700 }}
                  value={newStockVal}
                  onChange={(e) => setNewStockVal(Number(e.target.value))}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" className="btn btn-outline" onClick={() => setStockModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" disabled={submittingStock} className="btn btn-purple">
                  {submittingStock ? 'Updating...' : 'Update Stock'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
