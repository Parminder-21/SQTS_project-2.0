'use client';
import { motion } from 'framer-motion';

const STATS = [
  { number: '500+',  label: 'Students Trained'     },
  { number: '50+',   label: 'Internship Domains'   },
  { number: '100+',  label: 'Projects Built'        },
  { number: '92%',   label: 'Placement Rate'        },
];

export default function StatsBar() {
  return (
    <section style={{
      background: 'var(--bg-surface)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      padding: '40px 0',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '20px',
        }}>
          {STATS.map(({ number, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="stat-card"
            >
              <div className="stat-number text-gradient">{number}</div>
              <div className="stat-label">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
