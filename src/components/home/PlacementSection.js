'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PLACEMENTS } from '@/data/trust';

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const COMPANY_COLOR = {
  Infosys:       '#0052CC',
  TCS:           '#1A1A2E',
  Wipro:         '#341F97',
  Capgemini:     '#0070AD',
  'HCL Technologies': '#C8102E',
  'Freelance / Agency': '#059669',
};

function PackagePill({ pkg }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      fontSize: '0.72rem', fontWeight: '700',
      background: 'rgba(16,185,129,0.12)',
      color: '#6EE7B7',
      border: '1px solid rgba(16,185,129,0.25)',
      padding: '3px 10px', borderRadius: '999px',
      whiteSpace: 'nowrap',
    }}>
      ↑ {pkg}
    </span>
  );
}

function PlacementCard({ card, index }) {
  const { name, initials, course, company, role, package: pkg, outcome, batch, color } = card;
  const companyBg = COMPANY_COLOR[company] || color;
  const companyInitials = company.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <motion.div
      variants={fadeUp}
      className="card"
      style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}
      whileHover={{ borderColor: `${color}40` }}
    >
      {/* Top row: avatar + name + package */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
        <div style={{
          width: '48px', height: '48px', flexShrink: 0,
          background: `${color}20`,
          border: `2px solid ${color}40`,
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: '800', fontSize: '0.9rem', color,
          fontFamily: 'Inter, sans-serif',
        }}>
          {initials}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <h4 style={{ fontSize: '0.95rem', color: '#F1F5F9', fontFamily: 'Inter, sans-serif' }}>{name}</h4>
            <PackagePill pkg={pkg} />
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>{role}</p>
        </div>
      </div>

      {/* Course tag */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{
          fontSize: '0.72rem', padding: '2px 10px',
          background: `${color}15`, color,
          border: `1px solid ${color}30`,
          borderRadius: '999px', fontWeight: '600',
        }}>
          {course}
        </span>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-faint)' }}>Batch {batch}</span>
      </div>

      {/* Outcome line */}
      <p style={{
        fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: '1.65',
        paddingLeft: '12px', borderLeft: `3px solid ${color}50`,
        fontStyle: 'italic',
      }}>
        {outcome}
      </p>

      {/* Company row */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        paddingTop: '12px', borderTop: '1px solid var(--border)',
      }}>
        <div style={{
          width: '26px', height: '26px',
          background: companyBg,
          borderRadius: '6px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.55rem', fontWeight: '800', color: '#fff', flexShrink: 0,
        }}>
          {companyInitials}
        </div>
        <span style={{ fontSize: '0.83rem', color: '#CBD5E1', fontWeight: '600' }}>{company}</span>
        <span style={{ marginLeft: 'auto', fontSize: '0.72rem', color: 'var(--text-faint)' }}>✓ Verified</span>
      </div>
    </motion.div>
  );
}

export default function PlacementSection() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? PLACEMENTS : PLACEMENTS.slice(0, 3);

  return (
    <section id="placements" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)', padding: '90px 0' }}>
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {/* Header */}
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="badge badge-green" style={{ marginBottom: '16px', display: 'inline-flex' }}>
              🎯 Placement Success
            </span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.7rem)', marginBottom: '14px' }}>
              Our Students Are{' '}
              <span className="text-gradient">Getting Hired</span>
            </h2>
            <p style={{ maxWidth: '500px', margin: '0 auto', fontSize: '1rem', color: 'var(--text-muted)' }}>
              Real students. Real companies. Real packages. Here&apos;s a snapshot of recent success stories.
            </p>

            {/* Stats strip */}
            <div style={{
              display: 'flex', justifyContent: 'center', gap: '40px', marginTop: '32px',
              flexWrap: 'wrap',
            }}>
              {[
                { val: '92%', label: 'Placement Rate' },
                { val: '₹7.2 LPA', label: 'Avg. Package' },
                { val: '200+', label: 'Hiring Partners' },
                { val: '3 Weeks', label: 'Avg. Time to Offer' },
              ].map(({ val, label }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '1.5rem', fontWeight: '800', color: '#F1F5F9',
                    fontFamily: 'Playfair Display, serif',
                  }}>{val}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '2px' }}>{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Cards grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
          }}>
            <AnimatePresence>
              {visible.map((card, i) => (
                <PlacementCard key={card.id} card={card} index={i} />
              ))}
            </AnimatePresence>
          </div>

          {/* View all toggle */}
          {PLACEMENTS.length > 3 && (
            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginTop: '32px' }}>
              <button
                onClick={() => setShowAll(v => !v)}
                className="btn-outline"
                style={{ minWidth: '180px' }}
              >
                {showAll ? '↑ Show Less' : `View All ${PLACEMENTS.length} Stories →`}
              </button>
            </motion.div>
          )}

          <motion.p
            variants={fadeUp}
            style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-faint)', marginTop: '20px' }}
          >
            * Sample data. Real student stories will replace this once verified and consented.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
