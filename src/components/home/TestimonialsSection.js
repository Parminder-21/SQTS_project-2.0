'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS, VIDEO_TESTIMONIALS } from '@/data/trust';

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const FILTER_TABS = [
  { label: 'All', value: 'all' },
  { label: '🎓 Students', value: 'student' },
  { label: '👨‍👩‍👧 Parents', value: 'parent' },
];

function Stars({ count }) {
  return (
    <div style={{ display: 'flex', gap: '2px', marginBottom: '14px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: '#F59E0B', fontSize: '0.9rem' }}>★</span>
      ))}
    </div>
  );
}

function TestimonialCard({ t }) {
  const { name, role, batch, type, rating, text, initials, color, course } = t;
  const typeLabel = type === 'parent' ? '👨‍👩‍👧 Parent' : '🎓 Student';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3 }}
      className="card"
      style={{ padding: '28px', display: 'flex', flexDirection: 'column' }}
      whileHover={{ borderColor: `${color}40` }}
    >
      <Stars count={rating} />

      <p style={{
        fontSize: '0.88rem', lineHeight: '1.8', flexGrow: 1,
        color: '#CBD5E1', marginBottom: '24px',
        fontStyle: 'italic',
      }}>
        &quot;{text}&quot;
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
        <div style={{
          width: '42px', height: '42px', flexShrink: 0,
          background: `${color}20`,
          border: `1.5px solid ${color}50`,
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: '800', fontSize: '0.82rem', color,
        }}>
          {initials}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#F1F5F9' }}>{name}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{role} · Batch {batch}</div>
        </div>
        <span style={{
          fontSize: '0.68rem', padding: '2px 8px',
          background: type === 'parent' ? 'rgba(16,185,129,0.12)' : 'var(--primary-dim)',
          color: type === 'parent' ? '#6EE7B7' : '#93C5FD',
          borderRadius: '999px', fontWeight: '600',
          border: `1px solid ${type === 'parent' ? 'rgba(16,185,129,0.25)' : 'rgba(37,99,235,0.3)'}`,
          whiteSpace: 'nowrap',
        }}>
          {typeLabel}
        </span>
      </div>
    </motion.div>
  );
}

function VideoTestimonialSlot({ slot }) {
  const { name, role, duration } = slot;
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Video placeholder */}
      <div style={{
        aspectRatio: '16/9',
        background: 'linear-gradient(135deg, #0D1B2A 0%, #162B45 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '12px',
        position: 'relative',
        borderBottom: '1px solid var(--border)',
      }}>
        {/* Play button */}
        <div style={{
          width: '56px', height: '56px',
          background: 'rgba(37,99,235,0.85)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(4px)',
          boxShadow: '0 4px 20px rgba(37,99,235,0.4)',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
        }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <span style={{ fontSize: '1.2rem', marginLeft: '4px' }}>▶</span>
        </div>
        <div style={{
          fontSize: '0.72rem', color: 'var(--text-faint)', fontWeight: '600',
          textTransform: 'uppercase', letterSpacing: '0.08em',
        }}>
          Video Coming Soon
        </div>
        {/* Duration badge */}
        <div style={{
          position: 'absolute', bottom: '10px', right: '10px',
          fontSize: '0.7rem', padding: '2px 8px',
          background: 'rgba(0,0,0,0.65)',
          color: '#fff', borderRadius: '4px', fontWeight: '600',
        }}>
          {duration}
        </div>
      </div>
      {/* Meta */}
      <div style={{ padding: '14px 16px' }}>
        <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#F1F5F9' }}>{name}</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{role}</div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const [activeTab, setActiveTab] = useState('all');

  const filtered = activeTab === 'all'
    ? TESTIMONIALS
    : TESTIMONIALS.filter(t => t.type === activeTab);

  return (
    <section id="testimonials" style={{ padding: '90px 0', background: 'var(--bg-surface)', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {/* Header */}
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="badge badge-cyan" style={{ marginBottom: '16px', display: 'inline-flex' }}>
              💬 Testimonials
            </span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.7rem)', marginBottom: '14px' }}>
              Voices That{' '}
              <span className="text-gradient">Mean Everything</span>
            </h2>
            <p style={{ maxWidth: '480px', margin: '0 auto', fontSize: '1rem', color: 'var(--text-muted)' }}>
              Don&apos;t take our word for it — hear from students, parents, and professionals who&apos;ve been through our programs.
            </p>
          </motion.div>

          {/* Filter tabs */}
          <motion.div variants={fadeUp} style={{
            display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '36px',
          }}>
            {FILTER_TABS.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setActiveTab(value)}
                style={{
                  padding: '7px 20px',
                  borderRadius: '999px',
                  border: '1.5px solid',
                  borderColor: activeTab === value ? 'var(--accent)' : 'var(--border)',
                  background: activeTab === value ? 'var(--accent-dim)' : 'transparent',
                  color: activeTab === value ? '#67E8F9' : 'var(--text-muted)',
                  fontSize: '0.82rem', fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {label}
              </button>
            ))}
          </motion.div>

          {/* Text testimonials */}
          <motion.div
            layout
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px',
              marginBottom: '60px',
            }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map(t => (
                <TestimonialCard key={t.id} t={t} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Video testimonials */}
          <motion.div variants={fadeUp}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
              <h3 style={{ fontSize: '1rem', color: '#94A3B8', fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap' }}>
                🎬 Video Testimonials
              </h3>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '20px',
            }}>
              {VIDEO_TESTIMONIALS.map(slot => (
                <VideoTestimonialSlot key={slot.id} slot={slot} />
              ))}
            </div>

            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-faint)', marginTop: '16px' }}>
              * Video recordings are being collected. Placeholder slots shown.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
