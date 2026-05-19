'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
const stagger = { visible: { transition: { staggerChildren: 0.14 } } };

const OFFERINGS = [
  'School Coaching',
  'Programming',
  'Web Development',
  'AI Tools',
  'Internships',
  'Placement Training',
];

function CountdownTimer() {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const target = new Date('2026-06-15T10:00:00');
    const tick = () => {
      const diff = target - new Date();
      if (diff <= 0) return;
      setT({
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
    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
      {Object.entries(t).map(([unit, val]) => (
        <div key={unit} className="countdown-box" style={{ minWidth: '64px' }}>
          <div className="countdown-number">{String(val).padStart(2, '0')}</div>
          <div className="countdown-label">{unit}</div>
        </div>
      ))}
    </div>
  );
}

export default function HeroSection({ loggedIn }) {
  return (
    <section className="hero-bg" style={{ padding: '96px 0 80px', position: 'relative' }}>
      <div className="container">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}
        >
          {/* Eyebrow badge */}
          <motion.div variants={fadeUp}>
            <span className="badge badge-blue" style={{ marginBottom: '24px', display: 'inline-flex' }}>
              Next Batch Starting — June 15, 2026
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', marginBottom: '20px', color: '#F1F5F9', lineHeight: 1.15 }}
          >
            Your Career Starts Here —{' '}
            <span className="text-gradient">Learn, Build & Get Placed</span>
          </motion.h1>

          {/* Offering tags */}
          <motion.div
            variants={fadeUp}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}
          >
            {OFFERINGS.map(o => (
              <span key={o} style={{
                fontSize: '0.78rem', fontWeight: '600',
                background: 'rgba(37,99,235,0.12)',
                border: '1px solid rgba(37,99,235,0.25)',
                color: '#93C5FD',
                padding: '4px 12px',
                borderRadius: '999px',
                letterSpacing: '0.02em',
              }}>{o}</span>
            ))}
          </motion.div>

          {/* Subheading */}
          <motion.p
            variants={fadeUp}
            style={{ fontSize: '1.05rem', lineHeight: '1.8', maxWidth: '580px', margin: '0 auto 36px', color: 'var(--text-muted)' }}
          >
            From school coaching to job-ready tech skills — Shree Balaji Coaching Institute offers practical, mentor-led programs with real projects and dedicated placement support.
          </motion.p>

          {/* 3 CTAs */}
          <motion.div
            variants={fadeUp}
            style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '56px' }}
          >
            <Link href="/courses" className="btn-primary" style={{ padding: '13px 28px', fontSize: '0.95rem' }}>
              Explore Courses
            </Link>
            <Link href="/register?type=internship" className="btn-outline" style={{ padding: '12px 28px', fontSize: '0.95rem' }}>
              Apply for Internship
            </Link>
            <Link href="/register?type=demo" style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '12px 28px', fontSize: '0.95rem',
              background: 'rgba(16,185,129,0.12)',
              border: '1.5px solid rgba(16,185,129,0.35)',
              color: '#6EE7B7',
              borderRadius: 'var(--radius-md)',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}>
              Free Demo Class
            </Link>
          </motion.div>

          {/* Countdown */}
          <motion.div variants={fadeUp}>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-faint)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Limited seats — batch closes in
            </p>
            <CountdownTimer />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
