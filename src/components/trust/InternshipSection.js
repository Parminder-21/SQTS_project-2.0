'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { INTERNSHIP_DOMAINS, INTERNSHIP_FEATURES } from '@/data/trust';

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function InternshipSection() {
  return (
    <section style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)', padding: '80px 0' }}>
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {/* Header */}
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="badge badge-green" style={{ marginBottom: '14px', display: 'inline-flex' }}>
              Internship Programs
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginBottom: '12px' }}>
              50+ Domains.{' '}
              <span className="text-gradient">Real Work Experience.</span>
            </h2>
            <p style={{ maxWidth: '520px', margin: '0 auto', fontSize: '1rem' }}>
              Not a dummy project — a real internship with a mentor, live work, and a certificate that matters.
            </p>
          </motion.div>

          {/* Features grid */}
          <motion.div
            variants={fadeUp}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '16px',
              marginBottom: '48px',
            }}
          >
            {INTERNSHIP_FEATURES.map(({ icon, title, desc }) => (
              <div
                key={title}
                style={{
                  display: 'flex',
                  gap: '14px',
                  padding: '18px 20px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <div style={{
                  width: '38px', height: '38px', flexShrink: 0,
                  background: 'rgba(16,185,129,0.12)',
                  borderRadius: '10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.1rem',
                }}>
                  {icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '4px', color: '#F1F5F9' }}>{title}</h4>
                  <p style={{ fontSize: '0.8rem', lineHeight: '1.55', margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Domains */}
          <motion.div variants={fadeUp} style={{ marginBottom: '40px' }}>
            <h3 style={{
              fontSize: '1rem', fontFamily: 'Inter, sans-serif', fontWeight: '700',
              color: '#F1F5F9', marginBottom: '16px', textAlign: 'center',
            }}>
              Available Internship Domains
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '10px',
            }}>
              {INTERNSHIP_DOMAINS.map(({ domain, icon, color, openings }) => (
                <div
                  key={domain}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 14px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontSize: '0.8rem', fontWeight: '600',
                      color: '#F1F5F9', margin: 0,
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {domain}
                    </p>
                    <p style={{ fontSize: '0.7rem', color, margin: 0, fontWeight: '600' }}>
                      {openings} openings
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp} style={{ textAlign: 'center' }}>
            <Link href="/register?type=internship" className="btn-primary" style={{ padding: '13px 32px' }}>
              Apply for Internship
            </Link>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-faint)', marginTop: '12px' }}>
              Free to apply. Seats are limited per domain.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
