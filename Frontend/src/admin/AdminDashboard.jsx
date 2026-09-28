import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api.js';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalEnquiries: 0,
    pendingEnquiries: 0,
    totalValuation: '₹0'
  });
  const [projects, setProjects] = useState([]);
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [salesTimeframe, setSalesTimeframe] = useState('year');
  const [catTimeframe, setCatTimeframe] = useState('year');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [projData, enqData] = await Promise.all([
          api.getProjects(),
          api.getEnquiries()
        ]);

        const projectList = projData || [];
        const enquiryList = enqData || [];

        // Compute total valuation
        const totalPlots = projectList.reduce((acc, p) => acc + (p.totalUnits || 0), 0);
        const avgPrice = projectList.reduce((acc, p) => acc + (p.price?.startingFrom || 20), 0) / (projectList.length || 1);
        const valuationCr = ((totalPlots * avgPrice) / 100).toFixed(1);

        const pending = enquiryList.filter(e => e.status === 'new' || e.status === 'pending').length;

        setStats({
          totalProjects: projectList.length,
          totalEnquiries: enquiryList.length,
          pendingEnquiries: pending,
          totalValuation: `₹${valuationCr} Cr`
        });

        setProjects(projectList);
        setRecentEnquiries(enquiryList.slice(0, 6));
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // Timeframe chart bar data simulator
  const getChartBars = () => {
    if (salesTimeframe === 'today') {
      return [
        { label: '9 AM', val: 15 },
        { label: '12 PM', val: 40 },
        { label: '3 PM', val: 75 },
        { label: '6 PM', val: 90 },
        { label: '9 PM', val: 30 }
      ];
    }
    if (salesTimeframe === 'week') {
      return [
        { label: 'Mon', val: 45 },
        { label: 'Tue', val: 60 },
        { label: 'Wed', val: 80 },
        { label: 'Thu', val: 55 },
        { label: 'Fri', val: 95 },
        { label: 'Sat', val: 100 },
        { label: 'Sun', val: 85 }
      ];
    }
    if (salesTimeframe === 'month') {
      return [
        { label: 'Week 1', val: 50 },
        { label: 'Week 2', val: 75 },
        { label: 'Week 3', val: 90 },
        { label: 'Week 4', val: 85 }
      ];
    }
    return [
      { label: 'Jan', val: 40 },
      { label: 'Feb', val: 55 },
      { label: 'Mar', val: 70 },
      { label: 'Apr', val: 65 },
      { label: 'May', val: 85 },
      { label: 'Jun', val: 90 },
      { label: 'Jul', val: 75 },
      { label: 'Aug', val: 95 },
      { label: 'Sep', val: 100 }
    ];
  };

  const chartBars = getChartBars();

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">Dashboard Overview</h2>
          <p className="page-subtitle">Real-time statistics from your properties inventory and customer enquiries</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link to="/admin/projects" className="btn btn-purple">
            + Add Project
          </Link>
        </div>
      </div>

      {/* KPI Metrics Grid (Matching Section 11 & Hisuvai) */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon-wrap">📦</div>
          <div>
            <div className="kpi-label">Total Projects</div>
            <div className="kpi-val" id="kpi-total-projects">{stats.totalProjects}</div>
          </div>
          <span
            className="badge"
            style={{
              marginLeft: 'auto',
              background: 'rgba(124,58,237,0.08)',
              color: 'var(--purple-accent)',
              fontSize: '0.75rem',
              fontWeight: 700
            }}
          >
            Active
          </span>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrap info">🛒</div>
          <div>
            <div className="kpi-label">Total Inquiries</div>
            <div className="kpi-val" id="kpi-total-orders">{stats.totalEnquiries}</div>
          </div>
          <span
            className="badge"
            style={{
              marginLeft: 'auto',
              background: 'rgba(22,163,74,0.1)',
              color: '#16A34A',
              fontSize: '0.75rem',
              fontWeight: 700
            }}
          >
            ↗ +14.2%
          </span>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrap warning">⏳</div>
          <div>
            <div className="kpi-label">Pending Inquiries</div>
            <div className="kpi-val" id="kpi-pending-orders">{stats.pendingEnquiries}</div>
          </div>
          <span
            className="badge"
            style={{
              marginLeft: 'auto',
              background: 'rgba(234,88,12,0.1)',
              color: '#EA580C',
              fontSize: '0.75rem',
              fontWeight: 700
            }}
          >
            Action Req
          </span>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrap success">💰</div>
          <div>
            <div className="kpi-label">Portfolio Valuation</div>
            <div className="kpi-val" id="kpi-total-revenue">{stats.totalValuation}</div>
          </div>
          <span
            className="badge"
            style={{
              marginLeft: 'auto',
              background: 'rgba(22,163,74,0.1)',
              color: '#16A34A',
              fontSize: '0.75rem',
              fontWeight: 700
            }}
          >
            ↗ +18.5%
          </span>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '20px',
          marginBottom: '28px'
        }}
      >
        {/* Chart 1: Lead Growth Overview */}
        <div className="settings-card" style={{ marginBottom: 0 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
              flexWrap: 'wrap',
              gap: '10px'
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>
                Customer Inquiry Trends
              </h3>
              <span style={{ fontSize: '0.8rem', color: '#16A34A', fontWeight: 600 }}>
                ↗ +18.5% increase vs last period
              </span>
            </div>
            <select
              value={salesTimeframe}
              onChange={(e) => setSalesTimeframe(e.target.value)}
              className="select-ctrl"
              style={{ width: 'auto', padding: '5px 12px', fontSize: '0.85rem', fontWeight: 600 }}
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>

          {/* Interactive Chart Canvas Simulation */}
          <div
            style={{
              height: '220px',
              width: '100%',
              display: 'flex',
              alignItems: 'flex-end',
              gap: '12px',
              padding: '16px 10px 0',
              borderBottom: '2px solid var(--border-color)'
            }}
          >
            {chartBars.map((bar, idx) => (
              <div
                key={idx}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '100%',
                  justifyContent: 'flex-end'
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: `${bar.val}%`,
                    background: 'linear-gradient(180deg, #8B5CF6 0%, #7C3AED 100%)',
                    borderRadius: '4px 4px 0 0',
                    transition: 'height 0.4s ease'
                  }}
                  title={`${bar.label}: ${bar.val}% activity`}
                />
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px', whiteSpace: 'nowrap' }}>
                  {bar.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Property Distribution & Land Status */}
        <div className="settings-card" style={{ marginBottom: 0 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
              flexWrap: 'wrap',
              gap: '10px'
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>
                Inventory by Category
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Distribution by project units & layouts
              </span>
            </div>
            <select
              value={catTimeframe}
              onChange={(e) => setCatTimeframe(e.target.value)}
              className="select-ctrl"
              style={{ width: 'auto', padding: '5px 12px', fontSize: '0.85rem', fontWeight: 600 }}
            >
              <option value="year">All Active</option>
              <option value="plots">Residential Plots</option>
              <option value="villas">Villas</option>
            </select>
          </div>

          <div style={{ padding: '10px 0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                <strong>Residential Plots (Kovilpatti / Sivakasi)</strong>
                <span style={{ color: 'var(--purple-accent)', fontWeight: 700 }}>65%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'var(--bg-surface-2)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '65%', height: '100%', background: '#7C3AED' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                <strong>Gated Community Villas & Clubhouses</strong>
                <span style={{ color: '#0284C7', fontWeight: 700 }}>25%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'var(--bg-surface-2)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '25%', height: '100%', background: '#0284C7' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                <strong>Commercial Highway Land & Farmland</strong>
                <span style={{ color: '#10B981', fontWeight: 700 }}>10%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'var(--bg-surface-2)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '10%', height: '100%', background: '#10B981' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Customer Inquiries Section */}
      <div className="table-wrapper">
        <div
          style={{
            padding: '16px 20px',
            background: 'var(--bg-surface-2)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <strong style={{ color: 'var(--text-primary)', fontSize: '0.85rem', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
            Recent Customer Inquiries & Leads
          </strong>
          <Link to="/admin/enquiries" className="btn btn-outline" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
            View All Inquiries
          </Link>
        </div>

        <table className="product-table">
          <thead>
            <tr>
              <th>Lead ID</th>
              <th>Customer</th>
              <th>Project &amp; Details</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Date</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  Loading recent activity...
                </td>
              </tr>
            ) : recentEnquiries.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No customer inquiries received yet.
                </td>
              </tr>
            ) : (
              recentEnquiries.map((enq, idx) => (
                <tr key={enq._id || idx}>
                  <td style={{ fontWeight: 700, color: 'var(--purple-accent)' }}>
                    #ENQ-{enq._id ? enq._id.slice(-4).toUpperCase() : idx + 101}
                  </td>
                  <td>
                    <strong>{enq.name}</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{enq.email || '-'}</div>
                  </td>
                  <td>
                    <strong>{enq.projectName || 'General Layout'}</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Source: {enq.source || 'Website'}</div>
                  </td>
                  <td style={{ fontWeight: 600 }}>{enq.phone}</td>
                  <td>
                    <span className={`badge status-${enq.status || 'pending'}`}>
                      {enq.status || 'NEW'}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {new Date(enq.createdAt || Date.now()).toLocaleDateString('en-GB')}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="action-btns" style={{ justifyContent: 'flex-end' }}>
                      <a
                        href={`tel:${enq.phone}`}
                        className="btn btn-outline btn-sm"
                        style={{ padding: '4px 8px' }}
                        title="Call Customer"
                      >
                        📞 Call
                      </a>
                      <a
                        href={`https://wa.me/91${enq.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(enq.name)},%20this%20is%20Thirumal%20Housing.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-purple btn-sm"
                        style={{ padding: '4px 8px' }}
                        title="WhatsApp Customer"
                      >
                        💬 Chat
                      </a>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
