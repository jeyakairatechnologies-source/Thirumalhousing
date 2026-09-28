import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../services/api.js';
import './admin.css';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [counts, setCounts] = useState({
    projects: 0,
    lowStock: 0,
    enquiries: 0,
    customers: 4
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [projects, enquiries, customers] = await Promise.all([
          api.getProjects(),
          api.getEnquiries(),
          api.getCustomers()
        ]);
        const lowStock = (projects || []).filter(p => (p.availableUnits || 0) <= 5 && (p.availableUnits || 0) > 0).length;
        setCounts({
          projects: (projects || []).length,
          lowStock,
          enquiries: (enquiries || []).length,
          customers: (customers || []).length
        });
      } catch (err) {
        console.warn('Error fetching counts:', err);
      }
    };
    fetchCounts();
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    {
      id: 'nav-dashboard',
      label: 'Dashboard',
      path: '/admin',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      )
    },
    {
      id: 'nav-projects',
      label: 'Projects',
      path: '/admin/projects',
      badge: counts.projects,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      )
    },
    {
      id: 'nav-inventory',
      label: 'Inventory',
      path: '/admin/inventory',
      badge: counts.lowStock > 0 ? counts.lowStock : null,
      badgeStyle: { background: '#EF4444', color: '#fff' },
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      )
    },
    {
      id: 'nav-enquiries',
      label: 'Enquiries / Leads',
      path: '/admin/enquiries',
      badge: counts.enquiries,
      badgeStyle: { background: '#7C3AED', color: '#fff' },
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      )
    },
    {
      id: 'nav-customers',
      label: 'Customers',
      path: '/admin/customers',
      badge: counts.customers,
      badgeStyle: { background: '#0284C7', color: '#fff' },
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      id: 'nav-content',
      label: 'Site Content',
      path: '/admin/content',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      )
    },
    {
      id: 'nav-settings',
      label: 'Settings',
      path: '/admin/settings',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      )
    }
  ];

  const adminName = user?.name || 'Thirumal Admin';
  const avatarInitial = adminName.charAt(0).toUpperCase();

  return (
    <div className="admin-app-container">
      {/* Sidebar Mobile Overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'show' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* LEFT SIDEBAR (VDG FASHION STYLE) */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand-icon">TH</div>
          <div>
            <div className="sidebar-brand-name">Thirumal Housing</div>
            <div className="sidebar-brand-sub">Management Portal</div>
          </div>
        </div>

        <nav className="sidebar-menu" onClick={() => setSidebarOpen(false)}>
          {navItems.map((item) => {
            const isActive =
              item.path === '/admin'
                ? location.pathname === '/admin'
                : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.id}
                to={item.path}
                className={`sidebar-item ${isActive ? 'active' : ''}`}
                id={item.id}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge !== null && (
                  <span className="sidebar-badge" style={item.badgeStyle}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user-avatar">{avatarInitial}</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{adminName}</div>
            <div className="sidebar-user-role">Super Admin</div>
          </div>
        </div>
      </aside>

      {/* RIGHT MAIN CONTENT LAYOUT */}
      <div className="admin-layout-main">
        {/* Top Search & Profile Bar */}
        <header className="admin-top-header">
          <button
            id="admin-hamburger"
            className="admin-hamburger"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle Navigation"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>

          <div className="top-search-wrap">
            <svg
              className="top-search-icon"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              id="global-search-input"
              className="top-search-input"
              placeholder="Search for projects, enquiries, plots..."
              onChange={(e) => {
                // Dispatch global search event for child views if needed
                window.dispatchEvent(new CustomEvent('admin-global-search', { detail: e.target.value }));
              }}
            />
          </div>

          <div className="top-actions">
            <a href="/" target="_blank" rel="noopener noreferrer" className="btn-store-preview" title="View Public Website">
              <span>Customer Website</span> ↗
            </a>
            <div className="top-user-badge">
              <div className="top-avatar">{avatarInitial}</div>
              <div className="top-user-details">
                <div className="top-user-name">{adminName}</div>
                <div className="top-user-role">Super Admin</div>
              </div>
            </div>
            <button
              className="btn btn-outline"
              style={{ padding: '6px 12px', fontSize: '0.8rem' }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </header>

        {/* Main View Container */}
        <main className="admin-page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
