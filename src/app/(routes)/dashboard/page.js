'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Icon from '@/components/ui/Icon';

export default function StudentDashboard() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1. Fetch user session and enquiries
  useEffect(() => {
    const t = localStorage.getItem('userToken');
    if (!t) {
      // If not logged in, redirect to register
      window.location.href = '/register';
      return;
    }
    setToken(t);

    try {
      const payload = JSON.parse(atob(t.split('.')[1]));
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        // Expired
        localStorage.removeItem('userToken');
        window.location.href = '/register';
        return;
      }
      setUser(payload);
      fetchStudentData(t);
    } catch (e) {
      localStorage.removeItem('userToken');
      window.location.href = '/register';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchStudentData = async (authToken) => {
    try {
      const res = await fetch('/api/student/enquiries', {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch');
      }
      setEnquiries(data.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load your dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    window.location.href = '/register';
  };

  // ── Rendering states ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{ paddingTop: '70px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const getGreeting = () => {
    const hrs = new Date().getHours();
    if (hrs < 12) return 'Good Morning';
    if (hrs < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const nameOrEmail = user?.username || 'Student';
  const displayName = nameOrEmail.includes('@') ? nameOrEmail.split('@')[0] : nameOrEmail;
  const initials = displayName.substring(0, 2).toUpperCase();

  return (
    <div style={{ paddingTop: '90px', minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <div className="container" style={{ padding: '24px' }}>
        
        {/* HEADER / WELCOME BANNER */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: 'linear-gradient(135deg, var(--primary-dim) 0%, rgba(37,99,235,0.05) 100%)',
            border: '1px solid rgba(37,99,235,0.2)',
            borderRadius: 'var(--radius-md)',
            padding: '32px',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{
              width: '64px', height: '64px',
              borderRadius: '50%',
              background: 'var(--primary)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '1.4rem'
            }}>
              {initials}
            </div>
            <div>
              <span style={{ fontSize: '0.85rem', color: '#93C5FD', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Student Dashboard
              </span>
              <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', margin: '4px 0 8px 0', textTransform: 'capitalize' }}>
                {getGreeting()}, {displayName}!
              </h1>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>
                Welcome to your dashboard at Shree Balaji Coaching Institute.
              </p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="btn-outline" 
            style={{ padding: '10px 20px', fontSize: '0.88rem' }}
          >
            Sign Out
          </button>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 320px',
          gap: '32px',
          alignItems: 'start'
        }} className="dashboard-grid">
          
          {/* LEFT SIDE: APPLICATIONS & COURSE PROGRESS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* STATS SECTION */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px'
            }}>
              {[
                { title: 'Applied Courses', value: enquiries.length, icon: 'school', color: '#3B82F6' },
                { title: 'Pending Demos', value: enquiries.filter(e => e.course.toLowerCase().includes('demo')).length, icon: 'calendar', color: '#10B981' },
                { title: 'Certificates Verifiable', value: 0, icon: 'graduation', color: '#8B5CF6' }
              ].map((stat, i) => (
                <div key={i} className="card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ padding: '10px', background: `${stat.color}15`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={stat.icon} color={stat.color} size={28} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.8rem', margin: 0, fontWeight: '700' }}>{stat.value}</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>{stat.title}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* MY APPLICATIONS LIST */}
            <section className="card" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.2rem', margin: 0 }}>My Enrolled / Applied Programs</h2>
                <Link href="/courses" className="btn-outline" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
                  + Explore More
                </Link>
              </div>

              {error && <div className="alert-error" style={{ marginBottom: '16px' }}>{error}</div>}

              {enquiries.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px 24px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px dashed var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                    <Icon name="rocket" color="var(--primary)" size={40} />
                  </div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '6px' }}>No active applications found</h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', maxWidth: '320px', margin: '0 auto 20px' }}>
                    You haven&apos;t booked a class or demo yet. Enroll in a course to kickstart your journey.
                  </p>
                  <Link href="/courses" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.88rem' }}>
                    Browse Courses
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {enquiries.map((app) => {
                    const isDemo = app.course.toLowerCase().includes('demo');
                    return (
                      <div 
                        key={app.id} 
                        style={{
                          background: 'var(--bg-surface)',
                          border: '1.5px solid var(--border)',
                          borderRadius: '12px',
                          padding: '20px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: '16px'
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                            <span className="badge badge-blue" style={{ background: isDemo ? 'rgba(16,185,129,0.1)' : 'rgba(37,99,235,0.1)', color: isDemo ? '#10B981' : '#3B82F6' }}>
                              {isDemo ? 'Demo Booking' : 'Internship & Course'}
                            </span>
                            <span style={{ fontSize: '0.78rem', color: 'var(--text-faint)' }}>
                              Applied: {new Date(app.submittedAt).toLocaleDateString()}
                            </span>
                          </div>
                          <h3 style={{ fontSize: '1.05rem', margin: '0 0 4px 0', color: '#F1F5F9' }}>
                            {app.course}
                          </h3>
                          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                            Location: {app.city} &bull; Email: {app.email}
                          </p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{
                            fontSize: '0.78rem',
                            fontWeight: '600',
                            padding: '6px 12px',
                            background: 'rgba(245,158,11,0.1)',
                            color: '#F59E0B',
                            borderRadius: '999px',
                            border: '1px solid rgba(245,158,11,0.2)'
                          }}>
                            Processing
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

          </div>

          {/* RIGHT SIDEBAR: LEARNING RESOURCES & HELPLINE */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* PREMIUM RESOURCES */}
            <section className="card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '16px', color: '#F1F5F9', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon name="target" size={16} color="var(--primary-light)" animate={false} /> Placement Prep Pack
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: '1.5' }}>
                Exclusive study documents and guides ready for download to kickstart your preparation.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { name: 'Interview Prep Sheet.pdf', size: '2.4 MB', icon: 'file' },
                  { name: 'Resume Template.docx', size: '1.1 MB', icon: 'file' },
                  { name: 'C / Python Guidebook.pdf', size: '4.8 MB', icon: 'school' }
                ].map((res, i) => (
                  <div 
                    key={i} 
                    style={{
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      padding: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                    onClick={() => alert(`Downloading ${res.name}...`)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Icon name={res.icon} color="var(--primary-light)" size={20} />
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#E2E8F0' }}>{res.name}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-faint)' }}>{res.size}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--primary-light)', fontWeight: '600' }}>Get</span>
                  </div>
                ))}
              </div>
            </section>

            {/* DIRECT SUPPORT HELPLINE */}
            <section className="card" style={{ 
              padding: '24px',
              background: 'linear-gradient(135deg, rgba(37,211,102,0.06) 0%, rgba(255,255,255,0) 100%)',
              border: '1px solid rgba(37,211,102,0.2)'
            }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '12px', color: '#F1F5F9', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon name="message" size={18} color="#25D366" animate={false} /> Counselor Support
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: '1.5' }}>
                Need help choosing a course, scheduling your classes, or getting internship guidance? Contact your advisor.
              </p>
              <a 
                href="https://wa.me/919876543210?text=Hi!%20I%20am%20logged%20in%20to%20my%20Shree%20Balaji%20Student%20Dashboard%20and%20need%20assistance."
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary" 
                style={{ 
                  background: '#25D366', 
                  border: 'none', 
                  width: '100%', 
                  textAlign: 'center', 
                  display: 'block',
                  padding: '12px'
                }}
              >
                Chat on WhatsApp
              </a>
            </section>

          </div>

        </div>

      </div>

      {/* Embedded Responsive Media Queries styling */}
      <style>{`
        @media (max-width: 900px) {
          .dashboard-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
