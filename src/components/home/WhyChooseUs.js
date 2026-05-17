'use client';
import { motion } from 'framer-motion';

const FEATURES = [
  {
    icon: '⚙️',
    title: 'Practical Learning',
    desc: 'Every session is hands-on. No theory-only lectures — you build real things from day one.',
    color: '#3B82F6',
  },
  {
    icon: '🗂️',
    title: 'Live Projects',
    desc: 'Work on real client-style projects that go into your portfolio and impress recruiters.',
    color: '#06B6D4',
  },
  {
    icon: '🤝',
    title: 'Placement Support',
    desc: 'Dedicated placement cell with 200+ hiring partners. We don\'t stop until you\'re placed.',
    color: '#8B5CF6',
  },
  {
    icon: '🚀',
    title: 'Internship Opportunities',
    desc: '50+ internship domains available. Get real work experience with a verified certificate.',
    color: '#10B981',
  },
  {
    icon: '📄',
    title: 'Resume Building',
    desc: 'Professional resume workshops with ATS-optimised templates reviewed by HR experts.',
    color: '#F59E0B',
  },
  {
    icon: '🎤',
    title: 'Mock Interviews',
    desc: 'Weekly mock interviews with industry professionals to build confidence and sharpen answers.',
    color: '#EC4899',
  },
  {
    icon: '👨‍🏫',
    title: 'Experienced Mentors',
    desc: 'Learn from working professionals with 5–15 years of industry experience, not just academics.',
    color: '#06B6D4',
  },
  {
    icon: '💰',
    title: 'Affordable Fees',
    desc: 'Premium training at accessible prices. EMI options and scholarships available for deserving students.',
    color: '#10B981',
  },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function WhyChooseUs() {
  return (
    <section style={{ padding: '80px 0' }}>
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="badge badge-green" style={{ marginBottom: '14px', display: 'inline-flex' }}>
              Why SQTS
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginBottom: '12px' }}>
              We Don't Just Teach —{' '}
              <span className="text-gradient">We Transform Careers</span>
            </h2>
            <p style={{ maxWidth: '520px', margin: '0 auto', fontSize: '1rem' }}>
              8 reasons why 500+ students chose SQTS for their career journey.
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '20px',
          }}>
            {FEATURES.map(({ icon, title, desc, color }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                style={{
                  display: 'flex',
                  gap: '16px',
                  padding: '22px 20px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  transition: 'border-color 0.25s ease',
                }}
                whileHover={{ borderColor: `${color}50` }}
              >
                <div style={{
                  width: '40px', height: '40px', flexShrink: 0,
                  background: `${color}18`,
                  borderRadius: '10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.2rem',
                }}>
                  {icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', marginBottom: '6px', color: '#F1F5F9' }}>{title}</h4>
                  <p style={{ fontSize: '0.83rem', lineHeight: '1.6' }}>{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
