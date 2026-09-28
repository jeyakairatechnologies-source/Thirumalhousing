import { useState, useEffect } from 'react';
import { api } from '../services/api.js';

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Detail Modal
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [submittingNote, setSubmittingNote] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const loadAdminEnquiries = async () => {
    setLoading(true);
    try {
      const data = await api.getEnquiries();
      setEnquiries(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminEnquiries();
  }, []);

  // Filter logic
  useEffect(() => {
    let result = [...enquiries];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.name?.toLowerCase().includes(q) ||
          e.phone?.includes(q) ||
          e.projectName?.toLowerCase().includes(q) ||
          e.email?.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter((e) => (e.status || 'new').toLowerCase() === statusFilter.toLowerCase());
    }

    setFilteredEnquiries(result);
  }, [enquiries, search, statusFilter]);

  // KPIs
  const totalEnquiries = enquiries.length;
  const pendingCount = enquiries.filter((e) => e.status === 'new' || e.status === 'pending').length;
  const inProgressCount = enquiries.filter((e) => e.status === 'contacted' || e.status === 'interested').length;
  const convertedCount = enquiries.filter((e) => e.status === 'converted').length;

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.updateEnquiryStatus(id, newStatus);
      setEnquiries((prev) =>
        prev.map((e) => (e._id === id ? { ...e, status: newStatus } : e))
      );
      showToast(`Status updated to ${newStatus.toUpperCase()}`);
    } catch (err) {
      showToast(`Error: ${err.message}`);
    }
  };

  const handleOpenDetail = (enq) => {
    setSelectedEnquiry(enq);
    setNoteText(enq.notes || '');
  };

  const handleSaveNotes = async (e) => {
    e.preventDefault();
    if (!selectedEnquiry) return;
    setSubmittingNote(true);
    try {
      await api.updateEnquiryStatus(selectedEnquiry._id, selectedEnquiry.status, noteText);
      setEnquiries((prev) =>
        prev.map((item) => (item._id === selectedEnquiry._id ? { ...item, notes: noteText } : item))
      );
      setSelectedEnquiry(null);
      showToast('CRM notes updated successfully.');
    } catch (err) {
      showToast(`Error: ${err.message}`);
    } finally {
      setSubmittingNote(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to remove enquiry from ${name}?`)) {
      try {
        await api.deleteEnquiry(id);
        setEnquiries((prev) => prev.filter((e) => e._id !== id));
        showToast('Enquiry removed.');
      } catch (err) {
        showToast(`Error: ${err.message}`);
      }
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
          <h2 className="page-title">Customer Enquiries &amp; Leads</h2>
          <p className="page-subtitle">Track, follow up, and manage prospective homebuyers across the sales pipeline</p>
        </div>
        <button className="btn btn-outline" onClick={loadAdminEnquiries}>
          🔄 Refresh Enquiries
        </button>
      </div>

      {/* Lead KPIs (Matching Hisuvai) */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon-wrap info">📦</div>
          <div>
            <div className="kpi-label">Total Inquiries</div>
            <div className="kpi-val">{totalEnquiries}</div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrap warning">⌛</div>
          <div>
            <div className="kpi-label">Pending Callback</div>
            <div className="kpi-val">{pendingCount}</div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrap info">🚚</div>
          <div>
            <div className="kpi-label">Site Visits / Active</div>
            <div className="kpi-val">{inProgressCount}</div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrap success">💰</div>
          <div>
            <div className="kpi-label">Converted / Booked</div>
            <div className="kpi-val">{convertedCount}</div>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="controls-bar">
        <div className="search-input-wrap">
          <svg className="search-icon" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search by customer name, phone, project, locality..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filters-group">
          <select
            className="select-ctrl"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Inquiry Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="interested">Interested</option>
            <option value="converted">Converted</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="table-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th>Inquiry ID</th>
              <th>Customer Name &amp; Contact</th>
              <th>Project of Interest</th>
              <th>Message / Requirement</th>
              <th>Pipeline Status</th>
              <th>Follow-up Notes</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  Loading customer inquiries...
                </td>
              </tr>
            ) : filteredEnquiries.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No customer inquiries found matching your filter criteria.
                </td>
              </tr>
            ) : (
              filteredEnquiries.map((item, idx) => {
                const cleanPhone = (item.phone || '').replace(/[^0-9]/g, '');
                return (
                  <tr key={item._id || idx}>
                    <td style={{ fontWeight: 700, color: 'var(--purple-accent)' }}>
                      #ENQ-{item._id ? item._id.slice(-4).toUpperCase() : idx + 101}
                    </td>
                    <td>
                      <strong style={{ fontSize: '0.92rem' }}>{item.name}</strong>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                        📞 {item.phone}
                      </div>
                      {item.email && (
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          {item.email}
                        </div>
                      )}
                    </td>
                    <td>
                      <strong>{item.projectName || 'General Inquiry'}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Source: {item.source || 'Website'}
                      </div>
                    </td>
                    <td style={{ maxWidth: '200px' }}>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={item.message}>
                        {item.message || 'Customer requested callback.'}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {new Date(item.createdAt || Date.now()).toLocaleDateString('en-GB')}
                      </div>
                    </td>
                    <td>
                      <select
                        className="select-ctrl"
                        style={{ padding: '5px 10px', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase' }}
                        value={item.status || 'new'}
                        onChange={(e) => handleStatusChange(item._id, e.target.value)}
                      >
                        <option value="new">NEW</option>
                        <option value="contacted">CONTACTED</option>
                        <option value="interested">INTERESTED</option>
                        <option value="converted">CONVERTED</option>
                        <option value="closed">CLOSED</option>
                      </select>
                    </td>
                    <td style={{ maxWidth: '160px' }}>
                      <span
                        onClick={() => handleOpenDetail(item)}
                        style={{
                          fontSize: '0.8rem',
                          color: item.notes ? 'var(--text-primary)' : 'var(--purple-accent)',
                          cursor: 'pointer',
                          textDecoration: 'underline dotted',
                          display: 'block',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                        title="Click to view/edit notes"
                      >
                        {item.notes || '+ Add notes...'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="action-btns" style={{ justifyContent: 'flex-end' }}>
                        <a
                          href={`tel:${cleanPhone}`}
                          className="btn btn-outline btn-sm"
                          style={{ padding: '5px 8px' }}
                          title="Call Customer"
                        >
                          📞
                        </a>
                        <a
                          href={`https://wa.me/91${cleanPhone}?text=Hello%20${encodeURIComponent(item.name)},%20this%20is%20Thirumal%20Housing%20following%20up%20on%20your%20property%20enquiry.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-purple btn-sm"
                          style={{ padding: '5px 8px' }}
                          title="WhatsApp Customer"
                        >
                          💬
                        </a>
                        <button
                          type="button"
                          className="btn btn-outline btn-sm"
                          style={{ padding: '5px 8px' }}
                          onClick={() => handleOpenDetail(item)}
                          title="View Details"
                        >
                          👁️
                        </button>
                        <button
                          type="button"
                          className="btn btn-crimson btn-sm"
                          style={{ padding: '5px 8px' }}
                          onClick={() => handleDelete(item._id, item.name)}
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Modal: View Enquiry Details & Follow-up Notes (Matching Hisuvai) */}
      {selectedEnquiry && (
        <div className="modal-overlay" onClick={() => setSelectedEnquiry(null)}>
          <div className="modal-box" style={{ maxWidth: '650px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 className="modal-title">Inquiry Details</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Received: {new Date(selectedEnquiry.createdAt || Date.now()).toLocaleString()}
                </span>
              </div>
              <button type="button" className="modal-close-btn" onClick={() => setSelectedEnquiry(null)}>
                ✕
              </button>
            </div>

            <div style={{ padding: '24px' }}>
              {/* Customer Details Card */}
              <div style={{ background: 'var(--bg-surface-2)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '10px', color: 'var(--text-primary)' }}>
                  Customer Information
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.88rem' }}>
                  <div><strong>Name:</strong> {selectedEnquiry.name}</div>
                  <div><strong>Phone:</strong> {selectedEnquiry.phone}</div>
                  <div><strong>Email:</strong> {selectedEnquiry.email || 'N/A'}</div>
                  <div><strong>Status:</strong> <span className="badge cat">{selectedEnquiry.status?.toUpperCase() || 'NEW'}</span></div>
                  <div style={{ gridColumn: '1 / -1' }}><strong>Project:</strong> {selectedEnquiry.projectName || 'General Inquiry'}</div>
                </div>
              </div>

              {/* Customer Initial Requirement Message */}
              <div style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '14px', marginBottom: '16px' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Customer Message:
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', margin: 0 }}>
                  {selectedEnquiry.message || 'No specific requirement text provided.'}
                </p>
              </div>

              {/* CRM Follow-up Notes Form */}
              <form onSubmit={handleSaveNotes}>
                <div className="form-group" style={{ marginBottom: '18px' }}>
                  <label className="form-label" htmlFor="crm-notes-input">
                    Executive Follow-up Notes &amp; Site Visit Log:
                  </label>
                  <textarea
                    id="crm-notes-input"
                    rows={4}
                    className="form-control"
                    placeholder="e.g. Called customer at 11am; interested in 1200 sqft East facing plot; site visit scheduled for Saturday with family..."
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <button type="button" className="btn btn-outline" onClick={() => setSelectedEnquiry(null)}>
                    Close
                  </button>
                  <button type="submit" disabled={submittingNote} className="btn btn-purple">
                    {submittingNote ? 'Saving...' : 'Save Notes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
