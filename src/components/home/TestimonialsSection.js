'use client';
import { motion } from 'framer-motion';

// Mock data — replace with real testimonials
const TESTIMONIALS = [
  {
    name: 'Riya Kapoor',
    role: 'BCA Student → Web Developer',
    batch: '2024',
    rating: 5,
    text: 'SQTS completely changed my career trajectory. The live projects and mock interviews gave me the confidence to crack my first job interview. The mentors are incredibly supportive and always available.',
    avatar: 'RK',
    color: '#3B82F6',
  },
  {
    name: 'Arjun Nair',
    role: 'School Student (Class 8)',
    batch: '2025',
    rating: 5,
    text: 'My son joined the school computer program and within 3 months he was creating his own presentations and learning Python basics. The teachers make it fun and easy to understand.',
    avatar: 'AN',
    color: '#10B981',
  },
  {
    name: 'Pooja Sharma',
    role: 'Internship → Digital Marketing',
    batch: '2024',
    rating: 5,
    text: 'The internship program at SQTS is genuinely different. I worked on real campaigns, got a verified certificate, and the experience directly helped me land a full-time role. Highly recommend!',
    avatar: 'PS',
    color: '#8B5CF6',
  },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

function Stars({ count }) {
  return (
    <div style={{ display: 'flex', gap: '2px', marginBottom: '14px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: '#F59E0B', fontSize: '0.9rem' }}>★</span>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section style={{ padding: '80px 0' }}>
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="badge badge-cyan" style={{ marginBottom: '14px', display: 'inline-flex' }}>
              Student Stories
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginBottom: '12px' }}>
              What Our Students <span className="text-gradient">Say</span>
            </h2>
            <p style={{ maxWidth: '480px', margin: '0 auto', fontSize: '1rem' }}>
              Don't take our word for it — hear from the students who've been through our programs.
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}>
            {TESTIMONIALS.map(({ name, role, batch, rating, text, avatar, color }) => (
              <motion.div
                key={name}
                variants={fadeUp}
                className="card"
                style={{ padding: '28px', display: 'flex', flexDirection: 'column' }}
              >
                <Stars count={rating} />

                <p style={{
                  fontSize: '0.9rem', lineHeight: '1.75', flexGrow: 1,
                  color: '#CBD5E1', marginBottom: '24px',
                  fontStyle: 'italic',
                }}>
                  "{text}"
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                  <div style={{
                    width: '40px', height: '40px', flexShrink: 0,
                    background: `${color}20`,
                    border: `1.5px solid ${color}40`,
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: '700', fontSize: '0.82rem', color,
                  }}>
                    {avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#F1F5F9' }}>{name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{role} · Batch {batch}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
