'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INTERNSHIP_DOMAINS, INTERNSHIP_FEATURES } from '@/data/trust';

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const DURATION_OPTIONS = ['1 Month', '2 Months', '3 Months'];

export default function InternshipSection() {
  const [activeDuration, setActiveDuration] = useState('2 Months');
  const [expanded, setExpanded] = useState(false);
  const visibleDomains = expanded ? INTERNSHIP_DOMAINS : INTERNSHIP_DOMAINS.slice(0, 8);

  return (
    <section id="internship" style={{ padding: '90px 0', background: 'var(--bg-surface)', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
        >
          {/* Header */}
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="badge badge-cyan" style={{ marginBottom: '16px', display: 'inline-flex' }}>
              🚀 Internship Program
            </span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.7rem)', marginBottom: '14px' }}>
              Learn. Build.{' '}
              <span className="text-gradient">Get Certified.</span>
            </h2>
            <p style={{ maxWidth: '520px', margin: '0 auto', fontSize: '1rem', color: 'var(--text-muted)' }}>
              Our internship program is designed to bridge the gap between learning and real employment — with live projects, mentors, and a verified certificate.
            </p>
          </motion.div>

          {/* Program Features */}
          <motion.div variants={fadeUp} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px',
            marginBottom: '60px',
          }}>
            {INTERNSHIP_FEATURES.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="card"
                style={{ padding: '20px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}
              >
                <div style={{
                  width: '42px', height: '42px', flexShrink: 0,
                  background: 'var(--accent-dim)',
                  borderRadius: '10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.15rem',
                }}>
                  {icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '0.92rem', color: '#F1F5F9', marginBottom: '4px' }}>{title}</h4>
                  <p style={{ fontSize: '0.82rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>{desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Duration selector + Domains */}
          <motion.div variants={fadeUp}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#F1F5F9' }}>Available Internship Domains</h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                {DURATION_OPTIONS.map(d => (
                  <button
                    key={d}
                    onClick={() => setActiveDuration(d)}
                    style={{
                      padding: '6px 16px',
                      borderRadius: '999px',
                      border: '1.5px solid',
                      borderColor: activeDuration === d ? 'var(--accent)' : 'var(--border)',
                      background: activeDuration === d ? 'var(--accent-dim)' : 'transparent',
                      color: activeDuration === d ? '#67E8F9' : 'var(--text-muted)',
                      fontSize: '0.8rem', fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '12px',
              marginBottom: '20px',
            }}>
              <AnimatePresence mode="popLayout">
                {visibleDomains.map(({ domain, icon, color, openings }) => (
                  <motion.div
                    key={domain}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      padding: '14px 16px',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      transition: 'border-color 0.2s ease',
                      cursor: 'default',
                    }}
                    whileHover={{ borderColor: `${color}50` }}
                  >
                    <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{icon}</span>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#E2E8F0', lineHeight: '1.3' }}>{domain}</div>
                      <div style={{ fontSize: '0.72rem', color, marginTop: '2px', fontWeight: '600' }}>
                        {openings} openings · {activeDuration}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => setExpanded(v => !v)}
                style={{
                  background: 'none', border: 'none',
                  color: 'var(--accent)', fontSize: '0.85rem',
                  fontWeight: '600', cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                {expanded ? '↑ Show fewer domains' : `+ Show all ${INTERNSHIP_DOMAINS.length} domains`}
              </button>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp} style={{
            marginTop: '52px',
            padding: '32px 36px',
            background: 'linear-gradient(135deg, rgba(37,99,235,0.12), rgba(6,182,212,0.08))',
            border: '1px solid rgba(37,99,235,0.25)',
            borderRadius: 'var(--radius-xl)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: '24px', flexWrap: 'wrap',
          }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: '#F1F5F9', marginBottom: '6px' }}>
                Ready to kick-start your career?
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Applications open for the June 2025 batch. Limited seats per domain.
              </p>
            </div>
            <a href="/register" className="btn-primary" style={{ flexShrink: 0 }}>
              Apply for Internship →
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
