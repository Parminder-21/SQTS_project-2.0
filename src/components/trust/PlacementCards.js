'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PLACEMENTS } from '@/data/trust';

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function PlacementCards({ limit = 6 }) {
  const shown = PLACEMENTS.slice(0, limit);

  return (
    <section style={{ padding: '80px 0' }}>
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
        >
          {/* Header */}
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="badge badge-blue" style={{ marginBottom: '14px', display: 'inline-flex' }}>
              Placement Success
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginBottom: '12px' }}>
              Our Students Are{' '}
              <span className="text-gradient">Getting Hired</span>
            </h2>
            <p style={{ maxWidth: '500px', margin: '0 auto', fontSize: '1rem' }}>
              Real placements, real companies, real packages. Here&apos;s a glimpse of our recent success stories.
            </p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-faint)', marginTop: '8px' }}>
              * Sample data — real student stories will be added soon.
            </p>
          </motion.div>

          {/* Cards grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
          }}>
            {shown.map(p => (
              <motion.div
                key={p.id}
                variants={fadeUp}
                className="card"
                style={{ padding: '24px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}
              >
                {/* Avatar */}
                <div style={{
                  width: '48px', height: '48px', flexShrink: 0,
                  background: `${p.color}20`,
                  border: `2px solid ${p.color}40`,
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: '700', fontSize: '0.9rem',
                  color: p.color,
                  fontFamily: 'Inter, sans-serif',
                }}>
                  {p.initials}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Name + package */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '4px' }}>
                    <h4 style={{ fontSize: '0.95rem', color: '#F1F5F9', fontFamily: 'Inter, sans-serif', fontWeight: '700' }}>
                      {p.name}
                    </h4>
                    <span style={{
                      fontSize: '0.72rem', fontWeight: '700',
                      background: 'rgba(16,185,129,0.12)',
                      color: '#6EE7B7',
                      border: '1px solid rgba(16,185,129,0.25)',
                      padding: '2px 8px', borderRadius: '999px',
                      whiteSpace: 'nowrap', flexShrink: 0,
                    }}>
                      {p.package}
                    </span>
                  </div>

                  {/* Role */}
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    {p.role}
                  </p>

                  {/* Company + course */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: '0.78rem', fontWeight: '700',
                      color: p.color,
                      background: `${p.color}14`,
                      border: `1px solid ${p.color}30`,
                      padding: '2px 8px', borderRadius: '999px',
                    }}>
                      {p.company}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-faint)' }}>
                      via {p.course}
                    </span>
                  </div>

                  {/* Outcome */}
                  <p style={{
                    fontSize: '0.8rem', lineHeight: '1.55',
                    color: 'var(--text-muted)',
                    fontStyle: 'italic',
                    borderLeft: `2px solid ${p.color}40`,
                    paddingLeft: '10px',
                    margin: 0,
                  }}>
                    &quot;{p.outcome}&quot;
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/alumni" className="btn-outline">
              View All Alumni Stories
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
