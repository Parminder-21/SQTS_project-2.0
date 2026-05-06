'use client';
import { useEffect, useState } from 'react';
import { trackAdminLogin } from '@/lib/analytics';

const inputStyle = {
  width: '100%', padding: '10px 14px',
  background: 'var(--bg-surface)',
  border: '1.5px solid var(--border)',
  color: 'var(--text)', borderRadius: 'var(--radius-sm)',
  fontSize: '0.9rem', outline: 'none',
  fontFamily: 'Inter, sans-serif',
};

export default function AdminDashboard() {
  const [token,     setToken]     = useState(null);
  const [courses,   setCourses]   = useState([]);
  const [editing,   setEditing]   = useState(null);
  const [editForm,  setEditForm]  = useState({ title: '', description: '', category: '' });
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState('');
  const [success,   setSuccess]   = useState('');

  useEffect(() => {
    const t = localStorage.getItem('adminToken');
    if (t) { setToken(t); fetchCourses(t); }
  }, []);

  const fetchCourses = async (t) => {
    try {
      const res  = await fetch('/api/courses', { headers: { Authorization: `Bearer ${t || token}` } });
      const data = await res.json();
      setCourses(Array.isArray(data) ? data : data.data || []);
    } catch { setError('Failed to load courses'); }
  };

  const handleLogin = async (e) => {
    e.preventDefault(); setLoading(true); setError('');
    try {
      const res  = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(loginForm) });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Login failed'); return; }
      localStorage.setItem('adminToken', data.token);
      setToken(data.token);
      setLoginForm({ username: '', password: '' });
      setSuccess('Logged in successfully.');
      trackAdminLogin(loginForm.username);
      fetchCourses(data.token);
    } catch { setError('Network error.'); }
    finally { setLoading(false); }
  };

  const handleLogout = async () => {
    try { await fetch('/api/auth/logout', { method: 'POST', headers: { Authorization: `Bearer ${token}` } }); } catch {}
    localStorage.removeItem('adminToken');
    setToken(null); setCourses([]); setSuccess('Logged out.');
  };

  const handleEdit = (c) => { setEditing(c.id); setEditForm({ title: c.title, description: c.description, category: c.category }); };

  const handleUpdate = async (e) => {
    e.preventDefault(); setError(''); setSuccess('');
    try {
      const res  = await fetch(`/api/courses/${editing}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(editForm) });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Update failed'); return; }
      setSuccess('Course updated.'); setEditing(null); fetchCourses(token);
    } catch { setError('Failed to update.'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this course? This cannot be undone.')) return;
    setError(''); setSuccess('');
    try {
      const res  = await fetch(`/api/courses/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Delete failed'); return; }
      setSuccess('Course deleted.'); fetchCourses(token);
    } catch { setError('Failed to delete.'); }
  };

  /* ── Login screen ── */
  if (!token) {
    return (
      <div style={{ paddingTop: '70px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 24px 60px' }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ width: '48px', height: '48px', background: 'var(--primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: '1.4rem' }}>🔐</div>
            <h1 style={{ fontSize: '1.8rem', marginBottom: '6px' }}>Admin Portal</h1>
            <p style={{ fontSize: '0.9rem' }}>Authorised personnel only</p>
          </div>

          <div className="card" style={{ padding: '36px' }}>
            {error && <div className="alert-error" style={{ marginBottom: '20px' }}>{error}</div>}

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: '600', color: '#CBD5E1' }}>Username</label>
                <input type="text" value={loginForm.username} onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}
                  style={inputStyle} placeholder="admin" required />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: '600', color: '#CBD5E1' }}>Password</label>
                <input type="password" value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                  style={inputStyle} placeholder="••••••••" required />
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '13px', marginTop: '4px' }} disabled={loading}>
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  /* ── Dashboard ── */
  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)', padding: '24px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '1.6rem', marginBottom: '2px' }}>Admin Dashboard</h1>
            <p style={{ fontSize: '0.85rem', margin: 0 }}>{courses.length} course{courses.length !== 1 ? 's' : ''} in database</p>
          </div>
          <button onClick={handleLogout} className="btn-outline" style={{ padding: '9px 20px', fontSize: '0.88rem' }}>
            Sign Out
          </button>
        </div>
      </div>

      <div className="container" style={{ padding: '36px 24px' }}>
        {error   && <div className="alert-error"   style={{ marginBottom: '20px' }}>{error}</div>}
        {success && <div className="alert-success" style={{ marginBottom: '20px' }}>{success}</div>}

        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '1.1rem', fontFamily: 'Inter, sans-serif', fontWeight: '700' }}>Manage Courses</h2>
            <span className="badge badge-blue">{courses.length} total</span>
          </div>

          {courses.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📭</div>
              <p>No courses found in the database.</p>
            </div>
          ) : (
            <div>
              {courses.map((course, idx) => (
                <div key={course.id} style={{ padding: '20px 24px', borderBottom: idx < courses.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  {editing === course.id ? (
                    /* Edit form */
                    <form onSubmit={handleUpdate} style={{ display: 'grid', gap: '12px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                          <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.8rem', fontWeight: '600', color: '#94A3B8' }}>Title</label>
                          <input type="text" value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} style={inputStyle} required />
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.8rem', fontWeight: '600', color: '#94A3B8' }}>Category</label>
                          <input type="text" value={editForm.category} onChange={e => setEditForm({ ...editForm, category: e.target.value })} style={inputStyle} required />
                        </div>
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.8rem', fontWeight: '600', color: '#94A3B8' }}>Description</label>
                        <textarea value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                          style={{ ...inputStyle, minHeight: '90px', resize: 'vertical' }} required />
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button type="submit" className="btn-primary" style={{ padding: '9px 20px', fontSize: '0.88rem' }}>Save Changes</button>
                        <button type="button" onClick={() => setEditing(null)} className="btn-outline" style={{ padding: '9px 20px', fontSize: '0.88rem' }}>Cancel</button>
                      </div>
                    </form>
                  ) : (
                    /* Course row */
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px', flexWrap: 'wrap' }}>
                          <h3 style={{ fontSize: '0.95rem', fontFamily: 'Inter, sans-serif', fontWeight: '700', color: '#F1F5F9' }}>{course.title}</h3>
                          <span className="badge badge-blue" style={{ fontSize: '0.7rem' }}>{course.category}</span>
                        </div>
                        <p style={{ fontSize: '0.83rem', lineHeight: '1.5', color: 'var(--text-muted)', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                          {course.description}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                        <button onClick={() => handleEdit(course)} style={{ padding: '7px 14px', background: 'var(--primary-dim)', color: 'var(--primary-light)', border: '1px solid var(--primary)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '0.82rem', fontWeight: '600' }}>
                          Edit
                        </button>
                        <button onClick={() => handleDelete(course.id)} style={{ padding: '7px 14px', background: 'rgba(239,68,68,0.1)', color: '#FCA5A5', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '0.82rem', fontWeight: '600' }}>
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
