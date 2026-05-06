'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
const stagger = { visible: { transition: { staggerChildren: 0.15 } } };

/* ── Auth hook ──────────────────────────────────────────────────────────────── */
function useAuth() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const check = () => {
      const token = localStorage.getItem('userToken') || localStorage.getItem('adminToken');
      if (!token) { setLoggedIn(false); return; }
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp && payload.exp * 1000 < Date.now()) {
          localStorage.removeItem('userToken');
          localStorage.removeItem('adminToken');
          setLoggedIn(false);
        } else {
          setLoggedIn(true);
        }
      } catch { setLoggedIn(false); }
    };
    check();
    window.addEventListener('storage', check);
    return () => window.removeEventListener('storage', check);
  }, []);

  return loggedIn;
}

/* ── Countdown Timer ────────────────────────────────────────────────────────── */
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date('2026-06-15T10:00:00');
    const tick = () => {
      const diff = target - new Date();
      if (diff <= 0) return;
      setTimeLeft({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
      {Object.entries(timeLeft).map(([unit, val]) => (
        <div key={unit} className="countdown-box">
          <div className="countdown-number">{String(val).padStart(2, '0')}</div>
          <div className="countdown-label">{unit}</div>
        </div>
      ))}
    </div>
  );
}

const STATS = [
  { number: '500+',   label: 'Students Placed'  },
  { number: '92%',    label: 'Placement Rate'    },
  { number: '₹8 LPA', label: 'Avg. Package'     },
  { number: '12',     label: 'Industry Courses'  },
];

const CATEGORY_COLORS = {
  'Data Science':            '#3B82F6',
  'Web Development':         '#06B6D4',
  'Digital Marketing':       '#8B5CF6',
  'Artificial Intelligence': '#10B981',
  default:                   '#3B82F6',
};
const catColor = c => CATEGORY_COLORS[c] || CATEGORY_COLORS.default;

/* ── Main Page ──────────────────────────────────────────────────────────────── */
export default function Home() {
  const [courses, setCourses] = useState([]);
  const loggedIn = useAuth();

  useEffect(() => {
    fetch('/api/courses?limit=3')
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(d => setCourses(Array.isArray(d) ? d : d.data || []))
      .catch(() => {});
  }, []);

  /* Auth-aware CTA: if logged in, go to courses; otherwise go to register */
  const primaryCta = loggedIn
    ? { href: '/courses', label: 'Browse Courses' }
    : { href: '/register', label: 'Enroll Now' };

  return (
    <div style={{ paddingTop: '70px' }}>

      {/* ── HERO ── */}
      <section className="hero-bg" style={{ padding: '100px 0 80px', position: 'relative' }}>
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={stagger}
            style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>

            <motion.div variants={fadeUp}>
              <span className="badge badge-blue" style={{ marginBottom: '24px', display: 'inline-flex' }}>
                🎓 Next Batch — June 15, 2026
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} style={{ fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', marginBottom: '20px', color: '#F1F5F9' }}>
              Launch Your <span className="text-gradient">Tech Career</span> with Confidence
            </motion.h1>

            <motion.p variants={fadeUp} style={{ fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '560px', margin: '0 auto 36px' }}>
              Industry-focused programs in Data Science, Web Development, AI, and Digital Marketing — with guaranteed placement support.
            </motion.p>

            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '56px' }}>
              <Link href="/courses" className="btn-primary" style={{ padding: '13px 32px', fontSize: '1rem' }}>
                Explore Programs
              </Link>
              <Link href={primaryCta.href} className="btn-outline" style={{ padding: '13px 32px', fontSize: '1rem' }}>
                {primaryCta.label}
              </Link>
            </motion.div>

            <motion.div variants={fadeUp}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                ⏳ Upcoming Workshop — Limited Seats
              </p>
              <CountdownTimer />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '40px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '24px' }}>
            {STATS.map(({ number, label }) => (
              <div key={label} className="stat-card">
                <div className="stat-number text-gradient">{number}</div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED COURSES ── */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span className="badge badge-cyan" style={{ marginBottom: '16px', display: 'inline-flex' }}>Our Programs</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginBottom: '12px' }}>
                Featured <span className="text-gradient">Courses</span>
              </h2>
              <p style={{ maxWidth: '500px', margin: '0 auto' }}>
                Hands-on curriculum built with industry experts to make you job-ready from day one.
              </p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
              {courses.length === 0
                ? [1, 2, 3].map(i => (
                    <div key={i} className="card" style={{ padding: '28px', minHeight: '220px', opacity: 0.4 }}>
                      <div style={{ height: '20px', background: 'var(--bg-surface)', borderRadius: '4px', marginBottom: '12px', width: '60%' }} />
                      <div style={{ height: '14px', background: 'var(--bg-surface)', borderRadius: '4px', marginBottom: '8px' }} />
                      <div style={{ height: '14px', background: 'var(--bg-surface)', borderRadius: '4px', width: '80%' }} />
                    </div>
                  ))
                : courses.map(course => {
                    const color = catColor(course.category);
                    return (
                      <motion.div key={course.id} variants={fadeUp} className="card"
                        style={{ padding: '28px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: color, borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }} />
                        <span className="badge" style={{ background: `${color}20`, color, marginBottom: '16px', alignSelf: 'flex-start' }}>
                          {course.category}
                        </span>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '10px', fontFamily: 'Inter, sans-serif', fontWeight: '600' }}>{course.title}</h3>
                        <p style={{ fontSize: '0.9rem', lineHeight: '1.6', flexGrow: 1, marginBottom: '24px' }}>
                          {course.description?.slice(0, 120)}{course.description?.length > 120 ? '…' : ''}
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>⏱ {course.duration}</span>
                          <Link href={`/courses/${course.id}`} style={{ color, textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}>
                            View Details →
                          </Link>
                        </div>
                      </motion.div>
                    );
                  })
              }
            </div>

            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginTop: '40px' }}>
              <Link href="/courses" className="btn-outline">View All Programs</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── WHY SQTS ── */}
      <section style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)', padding: '80px 0' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', marginBottom: '12px' }}>
                Why Choose <span className="text-gradient">SQTS?</span>
              </h2>
              <p style={{ maxWidth: '480px', margin: '0 auto' }}>
                We don't just teach — we place. Our outcomes speak for themselves.
              </p>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
              {[
                { icon: '🎯', title: 'Job-Focused Curriculum',  desc: 'Every module is designed around real industry requirements and current hiring trends.' },
                { icon: '🏆', title: 'Expert Instructors',       desc: 'Learn from professionals with 10+ years of industry experience at top tech companies.' },
                { icon: '🤝', title: 'Placement Guarantee',      desc: 'Dedicated placement cell with 200+ hiring partners across India and abroad.' },
                { icon: '📜', title: 'Industry Certification',   desc: 'Earn certificates recognised by leading companies and institutions.' },
              ].map(({ icon, title, desc }) => (
                <motion.div key={title} variants={fadeUp} className="card" style={{ padding: '28px' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '14px' }}>{icon}</div>
                  <h4 style={{ marginBottom: '8px', fontSize: '1rem' }}>{title}</h4>
                  <p style={{ fontSize: '0.88rem', lineHeight: '1.6' }}>{desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{
              background: 'linear-gradient(135deg, var(--primary) 0%, #1D4ED8 100%)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(40px, 6vw, 64px)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />

            <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', color: '#fff', marginBottom: '16px', position: 'relative' }}>
              {loggedIn ? 'Continue Your Learning Journey' : 'Ready to Start Your Journey?'}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '480px', margin: '0 auto 32px', position: 'relative' }}>
              {loggedIn
                ? 'Explore all our programs and find your next course.'
                : 'Join 500+ students who transformed their careers with SQTS. Next batch starts June 15.'}
            </p>

            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
              {loggedIn ? (
                <Link href="/courses" style={{
                  background: '#fff', color: 'var(--primary)',
                  padding: '13px 32px', borderRadius: 'var(--radius-md)',
                  fontWeight: '700', textDecoration: 'none', fontSize: '1rem',
                }}>
                  Browse All Courses
                </Link>
              ) : (
                <>
                  <Link href="/register" style={{
                    background: '#fff', color: 'var(--primary)',
                    padding: '13px 32px', borderRadius: 'var(--radius-md)',
                    fontWeight: '700', textDecoration: 'none', fontSize: '1rem',
                  }}>
                    Enroll Now
                  </Link>
                  <Link href="/courses" style={{
                    background: 'rgba(255,255,255,0.15)', color: '#fff',
                    padding: '13px 32px', borderRadius: 'var(--radius-md)',
                    fontWeight: '600', textDecoration: 'none', fontSize: '1rem',
                    border: '1.5px solid rgba(255,255,255,0.3)',
                  }}>
                    Browse Courses
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
