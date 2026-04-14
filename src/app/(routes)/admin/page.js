'use client';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', category: '' });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const res = await fetch('/api/courses');
    const data = await res.json();
    setCourses(data);
  };

  const handleEdit = (course) => {
    setEditing(course.id);
    setEditForm({ title: course.title, description: course.description, category: course.category });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`/api/courses/${editing}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm)
    });
    setEditing(null);
    fetchCourses();
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this course?')) {
      await fetch(`/api/courses/${id}`, { method: 'DELETE' });
      fetchCourses();
    }
  };

  return (
    <div className="container" style={{ paddingTop: '150px', minHeight: '100vh' }}>
      <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '40px' }}>Admin Dashboard</h1>
      
      <div className="glass-panel" style={{ padding: '30px' }}>
        <h2 style={{ marginBottom: '20px' }}>Manage Courses</h2>
        
        <div style={{ display: 'grid', gap: '20px' }}>
          {courses.map(course => (
            <div key={course.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' }}>
              {editing === course.id ? (
                <form onSubmit={handleUpdate} style={{ display: 'grid', gap: '15px' }}>
                  <input 
                    type="text" 
                    value={editForm.title} 
                    onChange={e => setEditForm({...editForm, title: e.target.value})} 
                    style={{ padding: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid #333', color: 'white', borderRadius: '5px' }}
                  />
                  <input 
                    type="text" 
                    value={editForm.category} 
                    onChange={e => setEditForm({...editForm, category: e.target.value})} 
                    style={{ padding: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid #333', color: 'white', borderRadius: '5px' }}
                  />
                  <textarea 
                    value={editForm.description} 
                    onChange={e => setEditForm({...editForm, description: e.target.value})} 
                    style={{ padding: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid #333', color: 'white', borderRadius: '5px', minHeight: '100px' }}
                  />
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" className="btn-primary" style={{ padding: '8px 20px' }}>Save Changes</button>
                    <button type="button" onClick={() => setEditing(null)} style={{ padding: '8px 20px', background: 'transparent', color: 'white', border: '1px solid #555', borderRadius: '30px' }}>Cancel</button>
                  </div>
                </form>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{course.title}</h3>
                    <p style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>{course.description}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => handleEdit(course)} style={{ padding: '8px 15px', background: 'rgba(99,102,241,0.2)', color: '#6366f1', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => handleDelete(course.id)} style={{ padding: '8px 15px', background: 'rgba(236,72,153,0.2)', color: '#ec4899', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
