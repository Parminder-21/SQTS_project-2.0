'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';

const PERKS = [
  { icon: 'target', text: 'See our real teaching style — no marketing fluff' },
  { icon: 'gift', text: '100% free — no credit card or commitment' },
  { icon: 'clock', text: '45-minute live session, interactive Q&A included' },
  { icon: 'smartphone', text: 'Online or in-person at Chandigarh campus' },
];

export default function FreeDemoSection() {
  return (
    <section className="demo-section">
      {/* Glow orb */}
      <div className="demo-glow" aria-hidden="true" />

      <div className="container demo-inner">
        {/* Left copy */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="demo-copy"
        >
          <span className="badge badge-cyan" style={{ marginBottom: '18px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Icon name="graduation" size={14} animate={false} /> Zero-risk offer
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginBottom: '16px' }}>
            Attend a Free Demo Class<br />
            <span className="text-gradient">Before You Decide</span>
          </h2>
          <p style={{ fontSize: '1.05rem', lineHeight: '1.75', marginBottom: '28px' }}>
            Not sure which course fits you? Sit in on a live class, meet the instructor,
            and ask anything — completely free and with zero obligation to enroll.
          </p>

          <ul className="demo-perks" role="list">
            {PERKS.map(({ icon, text }) => (
              <li key={text} className="demo-perk-item">
                <span className="demo-perk-icon" aria-hidden="true">
                  <Icon name={icon} size={16} animate={false} color="#06B6D4" />
                </span>
                <span>{text}</span>
              </li>
            ))}
          </ul>

          <div className="demo-actions">
            <Link href="/contact?type=demo" className="btn-primary" id="demo-book-btn">
              Book My Free Demo
            </Link>
            <a
              href="https://wa.me/919876543210?text=Hi%2C%20I%20want%20to%20book%20a%20free%20demo%20class%20at%20Shree Balaji."
              target="_blank" rel="noopener noreferrer"
              className="btn-outline"
              id="demo-wa-btn"
            >
              <svg viewBox="0 0 32 32" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M16 2C8.28 2 2 8.28 2 16c0 2.44.64 4.72 1.76 6.72L2 30l7.52-1.72A13.9 13.9 0 0 0 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2z"/>
              </svg>
              WhatsApp to Book
            </a>
          </div>
        </motion.div>

        {/* Right card */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="demo-card card"
        >
          <div className="demo-card-header" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '46px',
              height: '46px',
              background: 'rgba(6,182,212,0.12)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Icon name="monitor" color="#06B6D4" size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>Live Demo Session</h3>
              <p style={{ fontSize: '0.85rem', margin: 0 }}>Next available: <strong style={{ color: '#F1F5F9' }}>This Week</strong></p>
            </div>
          </div>

          <div className="demo-slots">
            {[
              { day: 'Monday / Wednesday', time: '5:00 PM – 5:45 PM' },
              { day: 'Saturday',           time: '11:00 AM – 11:45 AM' },
              { day: 'Sunday',             time: '10:00 AM – 10:45 AM' },
            ].map(({ day, time }) => (
              <div key={day} className="demo-slot">
                <span className="demo-slot-day">{day}</span>
                <span className="demo-slot-time">{time}</span>
              </div>
            ))}
          </div>

          <div className="demo-card-footer">
            <div className="demo-meta-item">
              <Icon name="map_pin" size={16} color="var(--text-muted)" style={{ flexShrink: 0 }} animate={false} />
              <span>Online + Chandigarh Campus</span>
            </div>
            <div className="demo-meta-item">
              <Icon name="users" size={16} color="var(--text-muted)" style={{ flexShrink: 0 }} animate={false} />
              <span>Small batch — max 8 students</span>
            </div>
          </div>

          {/* Urgency nudge */}
          <div className="demo-urgency" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <Icon name="flame" size={15} color="#FBBF24" /> 3 seats left this week — book before they fill up
          </div>
        </motion.div>
      </div>

      <style>{`
        .demo-section {
          position: relative;
          padding: 88px 0;
          overflow: hidden;
        }
        .demo-glow {
          position: absolute;
          bottom: -100px; left: -100px;
          width: 480px; height: 480px;
          background: radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .demo-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          align-items: center;
        }
        @media (max-width: 860px) {
          .demo-inner { grid-template-columns: 1fr; gap: 40px; }
        }

        .demo-perks {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 32px;
        }
        .demo-perk-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 0.95rem;
          color: var(--text-muted);
        }
        .demo-perk-icon {
          font-size: 1.1rem;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .demo-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        /* Right card */
        .demo-card {
          padding: 28px 32px;
        }
        .demo-card-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border);
        }
        .demo-slots {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 22px;
        }
        .demo-slot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 14px;
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          font-size: 0.88rem;
        }
        .demo-slot-day  { color: var(--text-muted); }
        .demo-slot-time { color: var(--accent); font-weight: 600; }

        .demo-card-footer {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-top: 18px;
          border-top: 1px solid var(--border);
          margin-bottom: 18px;
        }
        .demo-meta-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.88rem;
          color: var(--text-muted);
        }
        .demo-urgency {
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.25);
          color: #FCD34D;
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          font-size: 0.82rem;
          font-weight: 600;
          text-align: center;
        }
      `}</style>
    </section>
  );
}
