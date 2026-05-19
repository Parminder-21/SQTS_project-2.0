'use client';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';

/**
 * SectionCta — a compact conversion nudge placed after major sections.
 *
 * Props:
 *   variant: 'placement' | 'internship' | 'demo' | 'enroll'
 */

const VARIANTS = {
  placement: {
    icon: 'target',
    headline: 'Want a placement like these?',
    sub: 'Start with a free demo class — no commitment required.',
    primary:   { label: 'Book Free Demo',     href: '/contact?type=demo' },
    secondary: { label: 'Talk to Counsellor', href: 'https://wa.me/919876543210?text=Hi%2C%20I%20want%20placement%20guidance.', external: true },
    accent: '#2563EB',
  },
  internship: {
    icon: 'briefcase',
    headline: 'Ready to start your internship?',
    sub: 'Apply today — 50+ domains, live project experience, verified certificate.',
    primary:   { label: 'Apply for Internship', href: '/contact?type=internship' },
    secondary: { label: 'Know More on WhatsApp', href: 'https://wa.me/919876543210?text=Hi%2C%20I%20want%20to%20apply%20for%20an%20internship.', external: true },
    accent: '#7C3AED',
  },
  demo: {
    icon: 'graduation',
    headline: 'Not sure which course is right?',
    sub: 'Book a free 45-min demo class and find out — on us.',
    primary:   { label: 'Book My Free Demo', href: '/contact?type=demo' },
    secondary: { label: 'Enroll Now', href: '/register' },
    accent: '#06B6D4',
  },
  enroll: {
    icon: 'rocket',
    headline: 'Ready to get started?',
    sub: 'Join the next batch and start building real skills today.',
    primary:   { label: 'Enroll Now',       href: '/register' },
    secondary: { label: 'Book Free Demo',   href: '/contact?type=demo' },
    accent: '#059669',
  },
};

export default function SectionCta({ variant = 'demo' }) {
  const cfg = VARIANTS[variant] || VARIANTS.demo;

  return (
    <div
      style={{
        margin: '0 auto',
        maxWidth: '860px',
        padding: '28px 32px',
        background: 'var(--bg-card)',
        border: `1px solid ${cfg.accent}30`,
        borderLeft: `4px solid ${cfg.accent}`,
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px',
        flexWrap: 'wrap',
      }}
    >
      {/* Left: copy */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: '1 1 260px' }}>
        <div style={{
          width: '52px', height: '52px',
          background: `${cfg.accent}14`,
          borderRadius: '12px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Icon name={cfg.icon} color={cfg.accent} size={28} />
        </div>
        <div>
          <p style={{ fontWeight: '700', color: '#F1F5F9', fontSize: '0.95rem', marginBottom: '4px' }}>
            {cfg.headline}
          </p>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
            {cfg.sub}
          </p>
        </div>
      </div>

      {/* Right: buttons */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', flexShrink: 0 }}>
        <Link
          href={cfg.primary.href}
          target={cfg.primary.external ? '_blank' : undefined}
          rel={cfg.primary.external ? 'noopener noreferrer' : undefined}
          className="btn-primary"
          style={{ 
            padding: '10px 22px', 
            fontSize: '0.88rem', 
            background: `linear-gradient(135deg, ${cfg.accent} 0%, ${cfg.accent}dd 100%)`, 
          }}
        >
          {cfg.primary.label}
        </Link>
        {cfg.secondary.external ? (
          <a
            href={cfg.secondary.href}
            target="_blank" rel="noopener noreferrer"
            className="btn-outline"
            style={{ padding: '9px 22px', fontSize: '0.88rem' }}
          >
            {cfg.secondary.label}
          </a>
        ) : (
          <Link href={cfg.secondary.href} className="btn-outline" style={{ padding: '9px 22px', fontSize: '0.88rem' }}>
            {cfg.secondary.label}
          </Link>
        )}
      </div>
    </div>
  );
}
