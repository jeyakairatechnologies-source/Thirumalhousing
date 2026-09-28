import { useState, useEffect } from 'react';
import { Plus, Trash2, X, Image as ImageIcon } from 'lucide-react';
import { api } from '../services/api.js';

export default function AdminGallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    category: 'layouts',
    imageUrl: '',
    description: ''
  });
  const [msg, setMsg] = useState({ type: '', text: '' });

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await api.getGallery('all');
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id, title) => {
    if (window.confirm(`Delete "${title}" from gallery?`)) {
      try {
        await api.deleteGalleryItem(id);
        setItems(prev => prev.filter(i => i._id !== id));
        setMsg({ type: 'success', text: 'Photo removed from gallery.' });
      } catch (err) {
        setMsg({ type: 'error', text: err.message });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createGalleryItem(form);
      setMsg({ type: 'success', text: 'New photo added to gallery.' });
      setIsModalOpen(false);
      setForm({ title: '', category: 'layouts', imageUrl: '', description: '' });
      fetchItems();
    } catch (err) {
      setMsg({ type: 'error', text: err.message || 'Failed to add image.' });
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: 'var(--primary-900)', marginBottom: '4px' }}>
            Gallery Management
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            Upload site construction progress images, layout aerials, and handover ceremonies.
          </p>
        </div>

        <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
          <Plus size={16} /> Add Gallery Image
        </button>
      </div>

      {msg.text && (
        <div style={{ padding: '12px 16px', borderRadius: '6px', marginBottom: '20px', backgroundColor: msg.type === 'success' ? '#dcfce7' : '#fee2e2', color: msg.type === 'success' ? '#166534' : '#991b1b', fontSize: '0.9rem' }}>
          {msg.text}
        </div>
      )}

      {/* Grid of photos */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px'
        }}
      >
        {items.map((item) => (
          <div key={item._id} className="card" style={{ overflow: 'hidden' }}>
            <div style={{ height: '190px', position: 'relative' }}>
              <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                <span className="badge badge-ongoing" style={{ fontSize: '0.65rem' }}>{item.category}</span>
              </div>
            </div>
            <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--primary-900)' }}>{item.title}</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>{item.description || item.category}</p>
              </div>
              <button
                onClick={() => handleDelete(item._id, item.title)}
                style={{ background: '#fee2e2', border: '1px solid #fca5a5', color: '#b91c1c', padding: '6px', borderRadius: '6px', cursor: 'pointer' }}
                title="Delete Photo"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <div style={{ padding: '18px 24px', backgroundColor: 'var(--primary-800)', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', color: '#ffffff', fontSize: '1.25rem' }}>Add Gallery Photo</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px' }}>Photo Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Completed Avenue Blacktop Roads"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border-light)', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px' }}>Category *</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border-light)', fontSize: '0.9rem', outline: 'none' }}
                >
                  <option value="layouts">Township Layouts</option>
                  <option value="ongoing">Site Construction</option>
                  <option value="completed">Completed Homes</option>
                  <option value="amenities">Amenities & Parks</option>
                  <option value="events">Customer Events</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px' }}>
                  Image (Upload Photo or Paste URL - Optional)
                </label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/... or leave blank for default"
                    value={form.imageUrl}
                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    style={{ flexGrow: 1, padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border-light)', fontSize: '0.9rem', outline: 'none' }}
                  />
                  <label
                    className="btn btn-outline-gold btn-sm"
                    style={{ cursor: 'pointer', margin: 0, whiteSpace: 'nowrap' }}
                  >
                    Upload File
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (file) {
                          try {
                            const url = await api.uploadFile(file);
                            setForm(prev => ({ ...prev, imageUrl: url }));
                          } catch (err) {
                            alert('Upload failed: ' + err.message);
                          }
                        }
                      }}
                    />
                  </label>
                </div>
                {form.imageUrl && (
                  <div style={{ marginTop: '8px' }}>
                    <img src={form.imageUrl} alt="Preview" style={{ height: '60px', borderRadius: '4px', objectFit: 'cover' }} />
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px' }}>Description</label>
                <textarea
                  rows={2}
                  placeholder="Short description of this milestone..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border-light)', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-sm" style={{ backgroundColor: '#f1f5f9', border: 'none' }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Add to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
