'use client';
import { motion } from 'framer-motion';

// Mock hiring partners — replace with real logos/names
const PARTNERS = [
  { name: 'Infosys',      bg: '#0052CC', initials: 'IN' },
  { name: 'TCS',          bg: '#1A1A2E', initials: 'TC' },
  { name: 'Wipro',        bg: '#341F97', initials: 'WI' },
  { name: 'HCL Tech',     bg: '#E31837', initials: 'HC' },
  { name: 'Capgemini',    bg: '#0070AD', initials: 'CA' },
  { name: 'Tech Mahindra',bg: '#C8102E', initials: 'TM' },
  { name: 'Accenture',    bg: '#A100FF', initials: 'AC' },
  { name: 'Cognizant',    bg: '#1A6FBF', initials: 'CO' },
];

export default function HiringPartners() {
  return (
    <section style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)', padding: '60px 0' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p style={{
            textAlign: 'center',
            fontSize: '0.78rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--text-faint)',
            marginBottom: '28px',
          }}>
            Our Students Have Been Hired By
          </p>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {PARTNERS.map(({ name, bg, initials }) => (
              <div
                key={name}
                title={name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 18px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  transition: 'border-color 0.2s ease',
                  cursor: 'default',
                }}
              >
                <div style={{
                  width: '28px', height: '28px',
                  background: bg,
                  borderRadius: '6px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.6rem', fontWeight: '800', color: '#fff',
                  flexShrink: 0,
                }}>{initials}</div>
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                  {name}
                </span>
              </div>
            ))}
          </div>

          <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-faint)', marginTop: '20px' }}>
            * Representative companies. Real partner logos will be added soon.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
