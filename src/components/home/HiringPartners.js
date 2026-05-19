'use client';
import { motion } from 'framer-motion';
import { HIRING_PARTNERS } from '@/data/trust';

const fadeUp = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function HiringPartners() {
  return (
    <section id="hiring-partners" style={{
      borderTop: '1px solid var(--border)',
      padding: '72px 0',
      background: 'var(--bg)',
    }}>
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {/* Label */}
          <motion.p variants={fadeUp} style={{
            textAlign: 'center',
            fontSize: '0.75rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--text-faint)',
            marginBottom: '12px',
          }}>
            Our Students Have Been Hired By
          </motion.p>

          <motion.h2 variants={fadeUp} style={{
            textAlign: 'center',
            fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
            marginBottom: '10px',
          }}>
            200+ <span className="text-gradient">Hiring Partners</span>
          </motion.h2>

          <motion.p variants={fadeUp} style={{
            textAlign: 'center', fontSize: '0.9rem',
            color: 'var(--text-muted)', marginBottom: '48px', maxWidth: '400px', margin: '0 auto 48px',
          }}>
            From Fortune 500 giants to high-growth startups — our network is your network.
          </motion.p>

          {/* Logo grid */}
          <motion.div
            variants={fadeUp}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: '16px',
            }}
          >
            {HIRING_PARTNERS.map(({ name, abbr, bg }) => (
              <div
                key={name}
                title={name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 16px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  transition: 'border-color 0.2s ease, transform 0.2s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--border-hover)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Logo placeholder — coloured monogram */}
                <div style={{
                  width: '34px', height: '34px',
                  background: bg,
                  borderRadius: '8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.62rem', fontWeight: '800', color: '#fff',
                  flexShrink: 0,
                  letterSpacing: '0.03em',
                }}>
                  {abbr}
                </div>
                <span style={{
                  fontSize: '0.85rem', fontWeight: '600',
                  color: 'var(--text-muted)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {name}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Footer note */}
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginTop: '32px' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-faint)', marginBottom: '16px' }}>
              * Representative companies. Actual logo integration pending partner authorisation.
            </p>
            <a href="/register" className="btn-primary" style={{ display: 'inline-flex' }}>
              Connect With Our Placement Cell →
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
