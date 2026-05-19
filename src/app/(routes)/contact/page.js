'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import EnquiryForm from '@/components/contact/EnquiryForm';
import FreeDemoSection from '@/components/contact/FreeDemoSection';

/* ─── Page metadata is set in layout, but we add extra via head tag ─────── */

const CONTACT_CHANNELS = [
  {
    icon: '📞',
    label: 'Call Us',
    value: '+91 98765 43210',
    href: 'tel:+919876543210',
    note: 'Mon–Sat, 9 AM – 7 PM',
    color: '#3B82F6',
  },
  {
    icon: '💬',
    label: 'WhatsApp',
    value: 'Chat Instantly',
    href: 'https://wa.me/919876543210?text=Hi%2C%20I%20found%20Shree Balaji%20online%20and%20want%20to%20know%20more.',
    note: 'Fastest response',
    color: '#25D366',
  },
  {
    icon: '📧',
    label: 'Email',
    value: 'info@shreebalaji.in',
    href: 'mailto:info@shreebalaji.in',
    note: 'Response in 4–6 hours',
    color: '#06B6D4',
  },
  {
    icon: '📍',
    label: 'Visit Us',
    value: 'Chandigarh Campus',
    href: 'https://maps.google.com/?q=Chandigarh,India',
    note: 'Sector 34-A, CHD',
    color: '#F59E0B',
  },
];

const CTA_BLOCKS = [
  { id: 'cta-demo',       href: '/contact?type=demo',        icon: '🎓', label: 'Book Free Demo',       desc: 'Try before you commit', bg: '#2563EB' },
  { id: 'cta-counsellor', href: 'https://wa.me/919876543210', icon: '🤝', label: 'Talk to Counsellor',   desc: 'Get personalised guidance', bg: '#25D366', external: true },
  { id: 'cta-internship', href: '/contact?type=internship',  icon: '💼', label: 'Apply for Internship', desc: '50+ domains available', bg: '#7C3AED' },
  { id: 'cta-enroll',     href: '/register',                 icon: '🚀', label: 'Enroll Now',           desc: 'Start your journey today', bg: '#059669' },
];

function ContactPageContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type'); // 'demo' | 'internship' | null

  return (
    <div style={{ paddingTop: '70px' }}>

      {/* ── Hero ── */}
      <section className="contact-hero hero-bg">
        <div className="container contact-hero-inner">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ maxWidth: '640px' }}
          >
            <span className="badge badge-blue" style={{ marginBottom: '20px' }}>
              📬 Get in Touch
            </span>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', marginBottom: '16px' }}>
              Have Questions?<br />
              <span className="text-gradient">We&apos;re Here to Help.</span>
            </h1>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.75', marginBottom: '32px' }}>
              Whether you want to know which course suits you, book a free demo, or
              apply for an internship — just reach out. Our counsellors respond fast.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="#enquiry-form" className="btn-primary">Send an Enquiry</a>
              <a
                href="https://wa.me/919876543210"
                target="_blank" rel="noopener noreferrer"
                className="btn-outline"
                style={{ borderColor: '#25D366', color: '#4ADE80' }}
              >
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'radial-gradient(circle at top center, #1E293B 0%, #090E17 60%)',
          pointerEvents: 'none',
        }} />
      </section>

      {/* ── Channel cards ── */}
      <section style={{ padding: '56px 0 48px' }}>
        <div className="container">
          <div className="contact-channels">
            {CONTACT_CHANNELS.map(({ icon, label, value, href, note, color }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="card contact-channel-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                style={{ textDecoration: 'none' }}
              >
                <div className="contact-channel-icon" style={{ background: `${color}20`, borderColor: `${color}35`, color }}>
                  {icon}
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '3px' }}>{label}</div>
                  <div style={{ fontWeight: '700', color: '#F1F5F9', fontSize: '0.95rem' }}>{value}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>{note}</div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA blocks strip ── */}
      <section style={{ padding: '0 0 56px' }}>
        <div className="container">
          <div className="cta-blocks">
            {CTA_BLOCKS.map(({ id, href, icon, label, desc, bg, external }) => (
              <Link
                key={id}
                id={id}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="cta-block"
                style={{ '--cta-color': bg }}
              >
                <span className="cta-block-icon" aria-hidden="true">{icon}</span>
                <strong className="cta-block-label">{label}</strong>
                <span className="cta-block-desc">{desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main form + sidebar ── */}
      <section id="enquiry-form" style={{ padding: '0 0 80px' }}>
        <div className="container">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '48px' }}
          >
            <span className="badge badge-blue" style={{ marginBottom: '14px' }}>
              {type === 'demo' ? '🎓 Book Demo' : type === 'internship' ? '💼 Internship' : '📋 Enquiry Form'}
            </span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', marginBottom: '12px' }}>
              {type === 'demo'
                ? 'Book Your Free Demo Class'
                : type === 'internship'
                  ? 'Apply for an Internship'
                  : 'Send Us Your Enquiry'}
            </h2>
            <p style={{ maxWidth: '500px', margin: '0 auto', fontSize: '0.95rem' }}>
              Fill in the form below and our counsellor will get back to you within 2 hours on working days.
            </p>
          </motion.div>

          <div className="contact-layout">
            {/* Form card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card contact-form-card"
            >
              <EnquiryForm />
            </motion.div>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="contact-sidebar"
            >
              {/* Why Shree Balaji blurb */}
              <div className="card contact-sidebar-card">
                <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Why Students Choose Shree Balaji</h3>
                <ul className="sidebar-points">
                  {[
                    '✅ 500+ students trained',
                    '✅ 90%+ placement rate',
                    '✅ Live projects — not just theory',
                    '✅ Industry mentors, not just teachers',
                    '✅ Free demo — no obligation',
                    '✅ Flexible batch timings',
                  ].map(pt => (
                    <li key={pt} style={{ fontSize: '0.88rem', color: 'var(--text-muted)', padding: '5px 0', borderBottom: '1px solid var(--border)' }}>{pt}</li>
                  ))}
                </ul>
              </div>

              {/* Quick WhatsApp card */}
              <div className="card contact-sidebar-card" style={{ background: 'rgba(37, 211, 102, 0.06)', borderColor: 'rgba(37,211,102,0.2)' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '10px', color: '#4ADE80' }}>Prefer WhatsApp?</h3>
                <p style={{ fontSize: '0.85rem', marginBottom: '16px', lineHeight: '1.6' }}>
                  Message us directly and get a reply in minutes during business hours.
                </p>
                <a
                  href="https://wa.me/919876543210?text=Hi%2C%20I%20want%20to%20know%20more%20about%20Shree Balaji%20courses."
                  target="_blank" rel="noopener noreferrer"
                  id="sidebar-wa-btn"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    background: '#25D366', color: '#fff',
                    padding: '11px', borderRadius: 'var(--radius-sm)',
                    fontWeight: '600', fontSize: '0.9rem',
                    textDecoration: 'none',
                  }}
                >
                  <svg viewBox="0 0 32 32" width="18" height="18" fill="white" aria-hidden="true">
                    <path d="M16 2C8.28 2 2 8.28 2 16c0 2.44.64 4.72 1.76 6.72L2 30l7.52-1.72A13.9 13.9 0 0 0 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2z"/>
                  </svg>
                  Open WhatsApp Chat
                </a>
              </div>

              {/* Location card */}
              <div className="card contact-sidebar-card">
                <h3 style={{ fontSize: '1rem', marginBottom: '12px' }}>📍 Find Us</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '12px' }}>
                  Shree Balaji Coaching Institute<br />
                  Sector 34-A, Chandigarh<br />
                  Punjab, India – 160034
                </p>
                <a
                  href="https://maps.google.com/?q=Sector+34+Chandigarh+India"
                  target="_blank" rel="noopener noreferrer"
                  className="btn-outline"
                  style={{ width: '100%', fontSize: '0.85rem', padding: '9px' }}
                >
                  Get Directions
                </a>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* ── Free Demo Section ── */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <FreeDemoSection />
      </div>

      {/* ── Bottom CTA strip ── */}
      <section style={{
        background: 'linear-gradient(135deg, #1E1B4B 0%, #3730A3 50%, #4F46E5 100%)',
        padding: '56px 0',
        textAlign: 'center',
      }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#fff', marginBottom: '12px' }}>
            Still Have Questions?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '28px', fontSize: '1rem' }}>
            Our counsellors are happy to walk you through every option — free of charge.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#enquiry-form"
              style={{ background: '#fff', color: '#3730A3', padding: '13px 28px', borderRadius: 'var(--radius-md)', fontWeight: '700', textDecoration: 'none' }}
            >
              Send Enquiry
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank" rel="noopener noreferrer"
              style={{ background: '#25D366', color: '#fff', padding: '13px 28px', borderRadius: 'var(--radius-md)', fontWeight: '700', textDecoration: 'none' }}
            >
              WhatsApp Now
            </a>
          </div>
        </div>
      </section>

      <style>{`
        /* ── Hero ── */
        .contact-hero {
          position: relative;
          padding: 80px 0 72px;
          z-index: 0;
        }
        .contact-hero-inner {
          position: relative;
          z-index: 1;
        }

        /* ── Channel cards ── */
        .contact-channels {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media (max-width: 860px) {
          .contact-channels { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .contact-channels { grid-template-columns: 1fr; }
        }
        .contact-channel-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 20px;
          cursor: pointer;
        }
        .contact-channel-icon {
          width: 44px; height: 44px;
          border-radius: var(--radius-sm);
          border: 1px solid;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        /* ── CTA blocks ── */
        .cta-blocks {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        @media (max-width: 860px) {
          .cta-blocks { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .cta-blocks { grid-template-columns: repeat(2, 1fr); }
        }
        .cta-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 20px 14px;
          border-radius: var(--radius-md);
          background: var(--bg-card);
          border: 1px solid var(--border);
          text-decoration: none;
          text-align: center;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .cta-block:hover {
          transform: translateY(-4px);
          border-color: var(--cta-color, var(--primary));
          box-shadow: 0 6px 24px rgba(0,0,0,0.3);
        }
        .cta-block-icon { font-size: 1.6rem; }
        .cta-block-label {
          font-size: 0.88rem;
          font-weight: 700;
          color: #F1F5F9;
        }
        .cta-block-desc {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        /* ── Main layout ── */
        .contact-layout {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 32px;
          align-items: start;
        }
        @media (max-width: 1024px) {
          .contact-layout { grid-template-columns: 1fr; }
        }
        .contact-form-card { padding: 36px 40px; }
        @media (max-width: 560px) {
          .contact-form-card { padding: 24px 20px; }
        }

        /* ── Sidebar ── */
        .contact-sidebar {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .contact-sidebar-card { padding: 22px 24px; }
        .sidebar-points {
          list-style: none;
          display: flex;
          flex-direction: column;
        }
        .sidebar-points li:last-child { border-bottom: none !important; }
      `}</style>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div style={{ paddingTop: '70px', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '32px', height: '32px', border: '3px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    }>
      <ContactPageContent />
    </Suspense>
  );
}
