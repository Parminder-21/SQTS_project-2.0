'use client';
import { motion } from 'framer-motion';

// Mock data — replace with real DB data when available
const PLACEMENTS = [
  { name: 'Rahul Sharma',    role: 'Frontend Developer',     company: 'Infosys',       package: '₹6.5 LPA', batch: '2024' },
  { name: 'Priya Verma',     role: 'Data Analyst',           company: 'TCS',           package: '₹7.2 LPA', batch: '2024' },
  { name: 'Amit Patel',      role: 'Full Stack Developer',   company: 'Wipro',         package: '₹8.0 LPA', batch: '2025' },
  { name: 'Sneha Gupta',     role: 'UI/UX Designer',         company: 'Capgemini',     package: '₹5.8 LPA', batch: '2025' },
  { name: 'Vikram Singh',    role: 'Python Developer',       company: 'HCL Tech',      package: '₹7.5 LPA', batch: '2025' },
  { name: 'Anjali Mehta',    role: 'Digital Marketing Lead', company: 'Startup India', package: '₹5.2 LPA', batch: '2024' },
];

const COMPANY_INITIALS = {
  'Infosys': { bg: '#0052CC', text: 'IN' },
  'TCS':     { bg: '#1A1A2E', text: 'TC' },
  'Wipro':   { bg: '#341F97', text: 'WI' },
  'Capgemini': { bg: '#0070AD', text: 'CA' },
  'HCL Tech':  { bg: '#E31837', text: 'HC' },
  'Startup India': { bg: '#FF6B35', text: 'SI' },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function PlacementSection() {
  return (
    <section style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)', padding: '80px 0' }}>
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
        >
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="badge badge-blue" style={{ marginBottom: '14px', display: 'inline-flex' }}>
              Placement Success
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginBottom: '12px' }}>
              Our Students Are{' '}
              <span className="text-gradient">Getting Hired</span>
            </h2>
            <p style={{ maxWidth: '480px', margin: '0 auto', fontSize: '1rem' }}>
              Real placements, real companies, real packages. Here's a glimpse of our recent success stories.
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
          }}>
            {PLACEMENTS.map(({ name, role, company, package: pkg, batch }) => {
              const co = COMPANY_INITIALS[company] || { bg: '#2563EB', text: company.slice(0, 2).toUpperCase() };
              return (
                <motion.div
                  key={name}
                  variants={fadeUp}
                  className="card"
                  style={{ padding: '22px 20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}
                >
                  {/* Avatar */}
                  <div style={{
                    width: '44px', height: '44px', flexShrink: 0,
                    background: 'var(--primary-dim)',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: '700', fontSize: '0.9rem', color: 'var(--primary-light)',
                  }}>
                    {name.split(' ').map(n => n[0]).join('')}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '4px' }}>
                      <h4 style={{ fontSize: '0.95rem', color: '#F1F5F9', fontFamily: 'Inter, sans-serif' }}>{name}</h4>
                      <span style={{
                        fontSize: '0.72rem', fontWeight: '700',
                        background: 'rgba(16,185,129,0.12)',
                        color: '#6EE7B7',
                        border: '1px solid rgba(16,185,129,0.25)',
                        padding: '2px 8px', borderRadius: '999px',
                        whiteSpace: 'nowrap',
                      }}>{pkg}</span>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '8px' }}>{role}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '22px', height: '22px',
                        background: co.bg,
                        borderRadius: '4px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.55rem', fontWeight: '800', color: '#fff',
                      }}>{co.text}</div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '500' }}>{company}</span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-faint)', marginLeft: 'auto' }}>Batch {batch}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Disclaimer */}
          <motion.p
            variants={fadeUp}
            style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-faint)', marginTop: '24px' }}
          >
            * Sample placement data. Real student stories coming soon.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
