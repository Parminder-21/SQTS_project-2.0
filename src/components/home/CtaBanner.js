'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CtaBanner({ loggedIn }) {
  return (
    <section style={{ padding: '80px 0' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            background: 'linear-gradient(135deg, #1E1B4B 0%, #3730A3 50%, #4F46E5 100%)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(40px, 6vw, 64px)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle dot grid */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            pointerEvents: 'none',
          }} />

          {/* Glow */}
          <div style={{
            position: 'absolute', top: '-80px', right: '-80px',
            width: '300px', height: '300px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative' }}>
            <span style={{
              display: 'inline-flex', marginBottom: '16px',
              fontSize: '0.75rem', fontWeight: '700',
              textTransform: 'uppercase', letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.6)',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.15)',
              padding: '4px 14px', borderRadius: '999px',
            }}>
              Next Batch — June 15, 2026
            </span>

            <h2 style={{
              fontSize: 'clamp(1.6rem, 4vw, 2.6rem)',
              color: '#fff', marginBottom: '16px',
              fontFamily: 'Playfair Display, serif',
            }}>
              {loggedIn
                ? 'Continue Your Learning Journey'
                : 'Ready to Transform Your Career?'}
            </h2>

            <p style={{
              color: 'rgba(255,255,255,0.75)',
              maxWidth: '500px', margin: '0 auto 36px',
              fontSize: '1rem', lineHeight: '1.7',
            }}>
              {loggedIn
                ? 'Explore all programs, apply for internships, or book a free demo class.'
                : 'Join 500+ students who built real skills, completed internships, and got placed. Your journey starts with one step.'}
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {loggedIn ? (
                <Link href="/courses" style={{
                  background: '#fff', color: '#3730A3',
                  padding: '13px 32px', borderRadius: 'var(--radius-md)',
                  fontWeight: '700', textDecoration: 'none', fontSize: '1rem',
                }}>
                  Browse All Courses
                </Link>
              ) : (
                <>
                  <Link href="/register" style={{
                    background: '#fff', color: '#3730A3',
                    padding: '13px 28px', borderRadius: 'var(--radius-md)',
                    fontWeight: '700', textDecoration: 'none', fontSize: '0.95rem',
                  }}>
                    Enroll Now
                  </Link>
                  <Link href="/contact?type=demo" style={{
                    background: 'rgba(255,255,255,0.12)',
                    border: '1.5px solid rgba(255,255,255,0.3)',
                    color: '#fff',
                    padding: '12px 28px', borderRadius: 'var(--radius-md)',
                    fontWeight: '600', textDecoration: 'none', fontSize: '0.95rem',
                  }}>
                    Book Free Demo
                  </Link>
                  <a
                    href="https://wa.me/919876543210?text=Hi%2C%20I%20want%20to%20talk%20to%20a%20counsellor%20at%20Shree Balaji."
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      background: 'rgba(37,211,102,0.2)',
                      border: '1.5px solid rgba(37,211,102,0.4)',
                      color: '#4ADE80',
                      padding: '12px 28px', borderRadius: 'var(--radius-md)',
                      fontWeight: '600', textDecoration: 'none', fontSize: '0.95rem',
                    }}
                  >
                    Talk to Counsellor
                  </a>
                  <Link href="/register?type=internship" style={{
                    background: 'rgba(124,58,237,0.2)',
                    border: '1.5px solid rgba(124,58,237,0.4)',
                    color: '#C4B5FD',
                    padding: '12px 28px', borderRadius: 'var(--radius-md)',
                    fontWeight: '600', textDecoration: 'none', fontSize: '0.95rem',
                  }}>
                    Apply for Internship
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
