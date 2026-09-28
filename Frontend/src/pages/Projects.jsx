import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, Sparkles, Building2 } from 'lucide-react';
import { api } from '../services/api.js';
import ProjectCard from '../components/ProjectCard.jsx';

export default function Projects({ onOpenEnquiry }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [activeTab, setActiveTab] = useState(searchParams.get('status') || 'all');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    const urlStatus = searchParams.get('status');
    if (urlStatus) {
      setActiveTab(urlStatus);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const data = await api.getProjects();
        setProjects(data);
      } catch (err) {
        console.error('Failed to load projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'all') {
      searchParams.delete('status');
    } else {
      searchParams.set('status', tab);
    }
    setSearchParams(searchParams);
  };

  // Filter and sort
  const filteredProjects = projects
    .filter((p) => {
      if (activeTab !== 'all' && p.status?.toLowerCase() !== activeTab.toLowerCase()) {
        return false;
      }
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesCity = p.location?.city?.toLowerCase().includes(q);
        const matchesDistrict = p.location?.district?.toLowerCase().includes(q);
        const matchesAddress = p.location?.address?.toLowerCase().includes(q);
        if (!matchesName && !matchesCity && !matchesDistrict && !matchesAddress) {
          return false;
        }
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') {
        return (a.price?.startingFrom || 0) - (b.price?.startingFrom || 0);
      }
      if (sortBy === 'price-high') {
        return (b.price?.startingFrom || 0) - (a.price?.startingFrom || 0);
      }
      if (sortBy === 'featured') {
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  return (
    <div>
      <div style={{ height: '90px', backgroundColor: 'var(--bg-main)', position: 'relative' }}>
        <div className="container" style={{ position: 'absolute', bottom: '20px', left: '0', right: '0', display: 'flex', justifyContent: 'center' }}>
          <Link to="/" className="btn btn-primary" style={{ padding: '8px 24px', backgroundColor: '#0a3233', color: '#fff', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold' }}>
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Filter and Content Area */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div className="container">
          {/* Controls Bar */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              padding: '20px 24px',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid var(--border-light)',
              marginBottom: '36px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {/* Filter Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <button
                onClick={() => handleTabChange('all')}
                className={`btn btn-sm ${activeTab === 'all' ? 'btn-primary' : ''}`}
                style={{
                  backgroundColor: activeTab === 'all' ? undefined : '#f1f5f9',
                  color: activeTab === 'all' ? '#ffffff' : 'var(--text-main)',
                  border: 'none',
                  padding: '10px 20px',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}
              >
                All Projects ({projects.length})
              </button>

              <button
                onClick={() => handleTabChange('ongoing')}
                className={`btn btn-sm ${activeTab === 'ongoing' ? 'btn-primary' : ''}`}
                style={{
                  backgroundColor: activeTab === 'ongoing' ? undefined : '#f1f5f9',
                  color: activeTab === 'ongoing' ? '#ffffff' : 'var(--status-ongoing-text)',
                  border: 'none',
                  padding: '10px 20px',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}
              >
                Ongoing ({projects.filter(p => p.status === 'ongoing').length})
              </button>

              <button
                onClick={() => handleTabChange('upcoming')}
                className={`btn btn-sm ${activeTab === 'upcoming' ? 'btn-primary' : ''}`}
                style={{
                  backgroundColor: activeTab === 'upcoming' ? undefined : '#f1f5f9',
                  color: activeTab === 'upcoming' ? '#ffffff' : 'var(--status-upcoming-text)',
                  border: 'none',
                  padding: '10px 20px',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}
              >
                Upcoming ({projects.filter(p => p.status === 'upcoming').length})
              </button>
            </div>
          </div>

          {/* Projects Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <Building2 size={40} style={{ color: 'var(--primary-600)', margin: '0 auto 16px', animation: 'spin 2s linear infinite' }} />
              <p style={{ color: 'var(--text-muted)' }}>Loading projects...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                backgroundColor: '#ffffff',
                padding: '60px 20px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-light)'
              }}
            >
              <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-900)', marginBottom: '8px' }}>
                No Projects Found
              </h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                No projects match your current filters. Try changing search keywords or status tab.
              </p>
              <button onClick={() => { setActiveTab('all'); setSearchTerm(''); }} className="btn btn-outline-gold btn-sm">
                Reset Filters
              </button>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '30px'
              }}
            >
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  onEnquire={onOpenEnquiry}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
