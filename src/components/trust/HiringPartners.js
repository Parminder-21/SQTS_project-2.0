'use client';
import { motion } from 'framer-motion';
import { HIRING_PARTNERS } from '@/data/trust';

export default function HiringPartners() {
  return (
    <section style={{
      background: 'var(--bg-surface)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      padding: '56px 0',
    }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p style={{
            textAlign: 'center',
            fontSize: '0.75rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--text-faint)',
            marginBottom: '32px',
          }}>
            Our Students Have Been Hired By
          </p>

          {/* Partner grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '12px',
          }}>
            {HIRING_PARTNERS.map(({ name, abbr, bg }) => (
              <div
                key={name}
                title={name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 16px',
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
                {/* Logo placeholder */}
                <div style={{
                  width: '30px', height: '30px', flexShrink: 0,
                  background: bg,
                  borderRadius: '6px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.6rem', fontWeight: '800', color: '#fff',
                }}>
                  {abbr}
                </div>
                <span style={{
                  fontSize: '0.82rem', fontWeight: '600',
                  color: 'var(--text-muted)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {name}
                </span>
              </div>
            ))}
          </div>

          <p style={{
            textAlign: 'center',
            fontSize: '0.72rem',
            color: 'var(--text-faint)',
            marginTop: '20px',
          }}>
            * Representative companies. Real partner logos will be added soon.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
