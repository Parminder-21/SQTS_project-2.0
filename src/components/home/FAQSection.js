'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQS } from '@/data/trust';
import Icon from '@/components/ui/Icon';

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const CATEGORY_ICONS = {
  'Fees & Payment':    'card',
  'Demo Class':        'graduation',
  'Internship':        'rocket',
  'Placement Support': 'handshake',
  'Who Can Join':      'users',
  'Certification':     'trophy',
};

function FAQItem({ q, a, isOpen, onToggle }) {
  return (
    <div style={{
      border: '1px solid',
      borderColor: isOpen ? 'rgba(37,99,235,0.35)' : 'var(--border)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      transition: 'border-color 0.25s ease',
      background: isOpen ? 'rgba(37,99,235,0.04)' : 'var(--bg-card)',
    }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', textAlign: 'left',
          padding: '18px 20px',
          background: 'none', border: 'none',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
        }}
      >
        <span style={{
          fontSize: '0.92rem', fontWeight: '600',
          color: isOpen ? '#93C5FD' : '#E2E8F0',
          fontFamily: 'Inter, sans-serif',
          lineHeight: '1.45',
        }}>
          {q}
        </span>
        <span style={{
          fontSize: '1.1rem', color: isOpen ? 'var(--primary-light)' : 'var(--text-faint)',
          flexShrink: 0,
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'transform 0.25s ease, color 0.2s ease',
          display: 'inline-block',
        }}>
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{
              padding: '0 20px 18px',
              fontSize: '0.88rem',
              color: 'var(--text-muted)',
              lineHeight: '1.75',
            }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openKey, setOpenKey] = useState(null); // "cat-qindex"
  const [activeCategory, setActiveCategory] = useState('all');

  const toggle = key => setOpenKey(prev => (prev === key ? null : key));

  const categories = FAQS.map(c => c.category);
  const visibleFAQs = activeCategory === 'all'
    ? FAQS
    : FAQS.filter(c => c.category === activeCategory);

  return (
    <section id="faq" style={{ padding: '90px 0', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
        >
          {/* Header */}
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="badge badge-blue" style={{ marginBottom: '16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Icon name="help" size={14} animate={false} /> FAQ
            </span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.7rem)', marginBottom: '14px' }}>
              Questions We Get{' '}
              <span className="text-gradient">All the Time</span>
            </h2>
            <p style={{ maxWidth: '480px', margin: '0 auto', fontSize: '1rem', color: 'var(--text-muted)' }}>
              Honest answers. No fluff. If your question isn&apos;t here, just call us.
            </p>
          </motion.div>

          {/* Category filter */}
          <motion.div variants={fadeUp} style={{
            display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center',
            marginBottom: '40px',
          }}>
            <button
              onClick={() => setActiveCategory('all')}
              style={{
                padding: '7px 18px', borderRadius: '999px',
                border: '1.5px solid',
                borderColor: activeCategory === 'all' ? 'var(--primary-light)' : 'var(--border)',
                background: activeCategory === 'all' ? 'var(--primary-dim)' : 'transparent',
                color: activeCategory === 'all' ? '#93C5FD' : 'var(--text-muted)',
                fontSize: '0.82rem', fontWeight: '600',
                cursor: 'pointer', transition: 'all 0.2s ease',
              }}
            >
              All Topics
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '7px 18px', borderRadius: '999px',
                  border: '1.5px solid',
                  borderColor: activeCategory === cat ? 'var(--primary-light)' : 'var(--border)',
                  background: activeCategory === cat ? 'var(--primary-dim)' : 'transparent',
                  color: activeCategory === cat ? '#93C5FD' : 'var(--text-muted)',
                  fontSize: '0.82rem', fontWeight: '600',
                  cursor: 'pointer', transition: 'all 0.2s ease',
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                }}
              >
                {CATEGORY_ICONS[cat] ? <Icon name={CATEGORY_ICONS[cat]} size={14} animate={false} /> : '•'} {cat}
              </button>
            ))}
          </motion.div>

          {/* FAQ groups */}
          <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
            <AnimatePresence mode="popLayout">
              {visibleFAQs.map(({ category, questions }) => (
                <motion.div
                  key={category}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Category heading */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    marginBottom: '16px',
                  }}>
                    {CATEGORY_ICONS[category] ? (
                      <Icon name={CATEGORY_ICONS[category]} size={20} color="#93C5FD" animate={false} />
                    ) : (
                      <span style={{ fontSize: '1.1rem' }}>•</span>
                    )}
                    <h3 style={{
                      fontSize: '1rem', color: '#F1F5F9',
                      fontFamily: 'Inter, sans-serif', fontWeight: '700',
                    }}>
                      {category}
                    </h3>
                    <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
                  </div>

                  {/* Questions */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {questions.map(({ q, a }, qi) => {
                      const key = `${category}-${qi}`;
                      return (
                        <FAQItem
                          key={key}
                          q={q}
                          a={a}
                          isOpen={openKey === key}
                          onToggle={() => toggle(key)}
                        />
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div variants={fadeUp} style={{
            marginTop: '52px',
            padding: '28px 32px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-xl)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: '20px', flexWrap: 'wrap', textAlign: 'left',
          }}>
            <div>
              <h4 style={{ color: '#F1F5F9', marginBottom: '4px', fontSize: '1rem' }}>
                Still have questions?
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Call us at <strong style={{ color: '#93C5FD' }}>+91 98765 43210</strong> or book a free demo — we&apos;ll answer everything.
              </p>
            </div>
            <a href="/register" className="btn-primary" style={{ flexShrink: 0 }}>
              Book Free Demo →
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
