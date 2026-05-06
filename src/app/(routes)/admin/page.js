'use client';

import { useEffect, useState } from 'react';
import { trackAdminLogin } from '@/lib/analytics';

export default function AdminDashboard() {
  const [token, setToken] = useState(null);
  const [courses, setCourses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', category: '' });
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken');

    if (storedToken) {
      setToken(storedToken);
      fetchCourses(storedToken);
    }
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/courses');
      const data = await res.json();
      const courseList = Array.isArray(data) ? data : data.data || [];
      setCourses(courseList);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
      setError('Failed to load courses');
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      localStorage.setItem('adminToken', data.token);
      setToken(data.token);
      setLoginForm({ username: '', password: '' });
      setSuccess('Login successful!');
      trackAdminLogin(loginForm.username);
      fetchCourses();
    } catch (err) {
      setError('An error occurred during login');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('adminToken');
      setToken(null);
      setCourses([]);
      setSuccess('Logged out successfully');
    }
  };

  const handleEdit = (course) => {
    setEditing(course.id);
    setEditForm({
      title: course.title,
      description: course.description,
      category: course.category
    });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`/api/courses/${editing}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Update failed');
        return;
      }

      setSuccess('Course updated successfully');
      setEditing(null);
      fetchCourses();
    } catch (err) {
      setError('Failed to update course');
      console.error('Update error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    setError('');
    setSuccess('');

    try {
      const res = await fetch(`/api/courses/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Delete failed');
        return;
      }

      setSuccess('Course deleted successfully');
      fetchCourses();
    } catch (err) {
      setError('Failed to delete course');
      console.error('Delete error:', err);
    }
  };

  if (!token) {
    return (
      <div className="container" style={{ paddingTop: '150px', minHeight: '100vh' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '40px', textAlign: 'center' }}>
            Admin Login
          </h1>

          <div className="glass-panel" style={{ padding: '40px' }}>
            {error && (
              <div style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: '#fca5a5', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} style={{ display: 'grid', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Username</label>
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(event) => setLoginForm({ ...loginForm, username: event.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(0,0,0,0.5)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: 'white',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                  placeholder="admin"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Password</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(0,0,0,0.5)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: 'white',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                  placeholder="Password"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ padding: '12px', fontSize: '1rem', width: '100%' }}
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <p style={{ textAlign: 'center', color: '#a1a1aa', marginTop: '20px', fontSize: '0.9rem' }}>
              Demo: username: <strong>admin</strong>, password: <strong>admin123</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '150px', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 className="text-gradient" style={{ fontSize: '3rem' }}>Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: '10px 20px',
            background: 'transparent',
            color: '#ec4899',
            border: '1px solid #ec4899',
            borderRadius: '30px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Logout
        </button>
      </div>

      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: '#fca5a5', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{ background: 'rgba(34, 197, 94, 0.2)', border: '1px solid #22c55e', color: '#86efac', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
          {success}
        </div>
      )}

      <div className="glass-panel" style={{ padding: '30px' }}>
        <h2 style={{ marginBottom: '20px' }}>Manage Courses ({courses.length})</h2>

        <div style={{ display: 'grid', gap: '20px' }}>
          {courses.length === 0 ? (
            <p style={{ color: '#a1a1aa', textAlign: 'center', padding: '40px' }}>No courses found</p>
          ) : (
            courses.map((course) => (
              <div key={course.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' }}>
                {editing === course.id ? (
                  <form onSubmit={handleUpdate} style={{ display: 'grid', gap: '15px' }}>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(event) => setEditForm({ ...editForm, title: event.target.value })}
                      style={{ padding: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid #333', color: 'white', borderRadius: '5px' }}
                      required
                    />
                    <input
                      type="text"
                      value={editForm.category}
                      onChange={(event) => setEditForm({ ...editForm, category: event.target.value })}
                      style={{ padding: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid #333', color: 'white', borderRadius: '5px' }}
                      required
                    />
                    <textarea
                      value={editForm.description}
                      onChange={(event) => setEditForm({ ...editForm, description: event.target.value })}
                      style={{ padding: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid #333', color: 'white', borderRadius: '5px', minHeight: '100px' }}
                      required
                    />
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button type="submit" className="btn-primary" style={{ padding: '8px 20px' }}>Save Changes</button>
                      <button type="button" onClick={() => setEditing(null)} style={{ padding: '8px 20px', background: 'transparent', color: 'white', border: '1px solid #555', borderRadius: '30px' }}>Cancel</button>
                    </div>
                  </form>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{course.title}</h3>
                      <p style={{ color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '10px' }}>{course.description}</p>
                      <span style={{ background: 'rgba(255,255,255,0.1)', padding: '3px 10px', borderRadius: '5px', fontSize: '0.8rem', color: '#a5b4fc' }}>
                        {course.category}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        onClick={() => handleEdit(course)}
                        style={{
                          padding: '8px 16px',
                          background: 'rgba(99, 102, 241, 0.2)',
                          color: '#a5b4fc',
                          border: '1px solid #4f46e5',
                          borderRadius: '5px',
                          cursor: 'pointer'
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(course.id)}
                        style={{
                          padding: '8px 16px',
                          background: 'rgba(239, 68, 68, 0.2)',
                          color: '#fca5a5',
                          border: '1px solid #ef4444',
                          borderRadius: '5px',
                          cursor: 'pointer'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
