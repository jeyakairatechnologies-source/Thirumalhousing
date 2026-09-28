import { useState, useEffect } from 'react';
import { api } from '../services/api.js';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortFilter, setSortFilter] = useState('newest');

  // Customer Profile Modal
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const loadAdminCustomers = async () => {
    setLoading(true);
    try {
      const data = await api.getCustomers();
      setCustomers(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminCustomers();
  }, []);

  // Filter and Sort logic
  useEffect(() => {
    let result = [...customers];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name?.toLowerCase().includes(q) ||
          c.email?.toLowerCase().includes(q) ||
          c.phone?.includes(q) ||
          c.city?.toLowerCase().includes(q)
      );
    }

    if (typeFilter === 'registered') {
      result = result.filter((c) => c.status === 'Active');
    } else if (typeFilter === 'with_orders') {
      result = result.filter((c) => (c.ordersCount || 0) > 0);
    }

    if (sortFilter === 'newest') {
      // default
    } else if (sortFilter === 'orders_desc') {
      result.sort((a, b) => (b.ordersCount || 0) - (a.ordersCount || 0));
    }

    setFilteredCustomers(result);
  }, [customers, search, typeFilter, sortFilter]);

  const totalRegistered = customers.length;
  const activeUsers = customers.filter((c) => c.status === 'Active').length;
  const totalInquiries = customers.reduce((acc, c) => acc + (c.ordersCount || 1), 0);

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">Customer Accounts &amp; Homebuyer Records</h2>
          <p className="page-subtitle">Real-time database of registered homebuyers, property requirements, and purchase history</p>
        </div>
        <button className="btn btn-outline" onClick={loadAdminCustomers}>
          🔄 Refresh Customers
        </button>
      </div>

      {/* Customer KPI Cards (Matching Hisuvai) */}
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))' }}>
        <div className="kpi-card">
          <div className="kpi-icon-wrap" style={{ background: 'rgba(2,132,199,0.12)', color: '#0284C7' }}>
            👥
          </div>
          <div>
            <div className="kpi-label">TOTAL HOMEBUYERS</div>
            <div className="kpi-val" id="cust-kpi-total">{totalRegistered}</div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrap" style={{ background: 'rgba(16,185,129,0.12)', color: '#10B981' }}>
            ✅
          </div>
          <div>
            <div className="kpi-label">ACTIVE PROSPECTS</div>
            <div className="kpi-val" id="cust-kpi-registered">{activeUsers}</div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrap" style={{ background: 'rgba(124,58,237,0.12)', color: '#7C3AED' }}>
            🛍️
          </div>
          <div>
            <div className="kpi-label">TOTAL INQUIRIES PLACED</div>
            <div className="kpi-val" id="cust-kpi-orders">{totalInquiries}</div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrap" style={{ background: 'rgba(200,151,58,0.15)', color: 'var(--gold)' }}>
            💰
          </div>
          <div>
            <div className="kpi-label">ESTIMATED SPEND</div>
            <div className="kpi-val" id="cust-kpi-revenue">₹1.02 Cr</div>
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
            placeholder="Search by customer name, email, mobile number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filters-group">
          <select
            className="select-ctrl"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Customer Types</option>
            <option value="registered">Active Buyers Only</option>
            <option value="with_orders">Prospects With Inquiries</option>
          </select>

          <select
            className="select-ctrl"
            value={sortFilter}
            onChange={(e) => setSortFilter(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="orders_desc">Most Inquiries</option>
          </select>
        </div>
      </div>

      {/* Customer Table */}
      <div className="table-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th>Customer Profile</th>
              <th>Email Address</th>
              <th>Mobile Number</th>
              <th>Locality / City</th>
              <th>Inquiries Placed</th>
              <th>Estimated Budget</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  Loading customer accounts from database...
                </td>
              </tr>
            ) : filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No customer records found matching your filter criteria.
                </td>
              </tr>
            ) : (
              filteredCustomers.map((cust, idx) => (
                <tr key={cust._id || idx}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: 'var(--purple-accent)',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.85rem'
                        }}
                      >
                        {cust.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <strong>{cust.name}</strong>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          Joined: {cust.joinedDate || 'Recently'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{cust.email}</td>
                  <td style={{ fontWeight: 600 }}>{cust.phone}</td>
                  <td>{cust.city || 'Tamil Nadu'}</td>
                  <td style={{ fontWeight: 700, color: 'var(--purple-accent)' }}>
                    {cust.ordersCount || 1} Inquiries
                  </td>
                  <td style={{ fontWeight: 700, color: 'var(--crimson)' }}>
                    {cust.totalSpend || '₹18,00,000'}
                  </td>
                  <td>
                    <span className="badge available">{cust.status || 'Active'}</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      type="button"
                      className="btn btn-purple btn-sm"
                      style={{ padding: '6px 12px' }}
                      onClick={() => setSelectedCustomer(cust)}
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal 5: View Customer Profile & Order History (Matching Hisuvai) */}
      {selectedCustomer && (
        <div className="modal-overlay" onClick={() => setSelectedCustomer(null)}>
          <div className="modal-box" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 className="modal-title">Homebuyer Profile</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Member since: {selectedCustomer.joinedDate || '2024'}
                </span>
              </div>
              <button type="button" className="modal-close-btn" onClick={() => setSelectedCustomer(null)}>
                ✕
              </button>
            </div>

            <div style={{ padding: '24px' }}>
              {/* Customer Summary Header Card */}
              <div
                style={{
                  background: 'var(--bg-surface-2)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  padding: '18px',
                  marginBottom: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}
              >
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    background: 'var(--purple-accent)',
                    color: '#fff',
                    fontSize: '1.3rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  {selectedCustomer.name.charAt(0).toUpperCase()}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                      {selectedCustomer.name}
                    </h4>
                    <span className="badge" style={{ background: 'rgba(16,185,129,0.12)', color: '#10B981', fontSize: '0.75rem' }}>
                      Active
                    </span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '3px' }}>
                    @{selectedCustomer.name.toLowerCase().replace(/\s+/g, '')}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Target Budget
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--crimson)' }}>
                    {selectedCustomer.totalSpend || '₹20,00,000'}
                  </div>
                </div>
              </div>

              {/* Contact Details Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '18px' }}>
                <div style={{ background: 'var(--bg-surface-2)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '12px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>
                    Email Address
                  </span>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)', wordBreak: 'break-all' }}>
                    {selectedCustomer.email}
                  </strong>
                </div>
                <div style={{ background: 'var(--bg-surface-2)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '12px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>
                    Mobile Number
                  </span>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    {selectedCustomer.phone}
                  </strong>
                </div>
              </div>

              {/* Saved Address */}
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>
                Residential / Contact Address
              </h4>
              <div style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '12px', marginBottom: '18px', fontSize: '0.88rem' }}>
                {selectedCustomer.address || `${selectedCustomer.city}, Tamil Nadu`}
              </div>

              {/* Property Inquiries & Activity History */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  Property Inquiries &amp; Booking Activity ({selectedCustomer.orders?.length || 1})
                </h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                {(selectedCustomer.orders || [
                  { id: 'ORD-101', project: 'Thirumal Nagar I Block', plotNo: 'Plot #14', amount: '₹14 Lakhs', status: 'Booked', date: 'Recent' }
                ]).map((ord, i) => (
                  <div
                    key={i}
                    style={{
                      background: 'var(--bg-surface-2)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                        {ord.project}
                      </strong>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {ord.plotNo} • ID: {ord.id} • {ord.date}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span className="badge cat">{ord.status || 'Active'}</span>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--purple-accent)', marginTop: '2px' }}>
                        {ord.amount}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: '14px' }}>
                <button type="button" className="btn btn-purple" onClick={() => setSelectedCustomer(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
