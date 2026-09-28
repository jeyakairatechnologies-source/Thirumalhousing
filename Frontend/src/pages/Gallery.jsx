import { useState, useEffect } from 'react';
import { Sparkles, X, Eye, Image as ImageIcon } from 'lucide-react';
import { api } from '../services/api.js';

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [activePhoto, setActivePhoto] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const data = await api.getGallery(category);
        setItems(data);
      } catch (err) {
        console.error('Failed to load gallery:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, [category]);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'layouts', label: 'Township Layouts' },
    { id: 'ongoing', label: 'Site Construction' },
    { id: 'completed', label: 'Completed Homes' },
    { id: 'amenities', label: 'Amenities & Parks' },
    { id: 'events', label: 'Customer Events' }
  ];

  return (
    <div>
      {/* Page Header */}
      <section
        style={{
          background: 'linear-gradient(rgba(6, 29, 21, 0.85), rgba(6, 29, 21, 0.9)), url("https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1800&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#ffffff',
          padding: '60px 0 50px',
          textAlign: 'center'
        }}
      >
        <div className="container">
          <span className="section-tag" style={{ background: 'rgba(197, 160, 89, 0.2)', color: 'var(--gold-300)', borderColor: 'var(--gold-500)' }}>
            Visual Showcase
          </span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', fontWeight: '800', color: '#ffffff', marginBottom: '12px' }}>
            Project & Development Gallery
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto' }}>
            High-resolution snapshots of our master layouts, wide asphalt roads, landscaped parks, and celebratory homeowner milestones.
          </p>
        </div>
      </section>

      {/* Gallery Showcase */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div className="container">
          {/* Category Filter Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '40px'
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`btn btn-sm ${category === cat.id ? 'btn-primary' : ''}`}
                style={{
                  backgroundColor: category === cat.id ? undefined : '#ffffff',
                  color: category === cat.id ? '#ffffff' : 'var(--text-main)',
                  border: '1px solid var(--border-light)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px' }}>
              <p>Loading gallery images...</p>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '24px'
              }}
            >
              {items.map((item) => (
                <div
                  key={item._id}
                  className="card"
                  onClick={() => setActivePhoto(item)}
                  style={{
                    cursor: 'pointer',
                    overflow: 'hidden',
                    position: 'relative',
                    height: '260px'
                  }}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />

                  {/* Gradient Overlay & Title */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(6, 29, 21, 0.85) 0%, rgba(0,0,0,0) 50%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: '20px',
                      color: '#ffffff'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span className="badge badge-ongoing" style={{ fontSize: '0.65rem' }}>
                        {item.category}
                      </span>
                    </div>
                    <h4 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: '600', lineHeight: 1.25 }}>
                      {item.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="modal-overlay" onClick={() => setActivePhoto(null)}>
          <div
            style={{
              maxWidth: '900px',
              width: '95%',
              backgroundColor: '#061d15',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-xl)',
              border: '2px solid var(--gold-500)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(0,0,0,0.6)',
                border: 'none',
                color: '#ffffff',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              <X size={20} />
            </button>

            <img
              src={activePhoto.imageUrl}
              alt={activePhoto.title}
              style={{ width: '100%', maxHeight: '65vh', objectFit: 'contain', backgroundColor: '#000000' }}
            />

            <div style={{ padding: '24px', color: '#ffffff' }}>
              <h3 style={{ color: '#ffffff', fontSize: '1.4rem', marginBottom: '6px' }}>{activePhoto.title}</h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem', margin: 0 }}>{activePhoto.description || 'Thirumal Housing high-standard execution.'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
