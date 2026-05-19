'use client';
import { useState } from 'react';

/**
 * Accordion component for course syllabus modules.
 * Props: modules (array), color (accent color string)
 */
export default function SyllabusAccordion({ modules = [], color = '#2563EB' }) {
  const [open, setOpen] = useState(0); // first module open by default

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {modules.map((mod, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            style={{
              background: 'var(--bg-card)',
              border: `1px solid ${isOpen ? `${color}40` : 'var(--border)'}`,
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              transition: 'border-color 0.2s ease',
            }}
          >
            {/* Header */}
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '16px 20px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              {/* Module number */}
              <div style={{
                width: '32px', height: '32px', flexShrink: 0,
                background: isOpen ? color : `${color}20`,
                color: isOpen ? '#fff' : color,
                borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: '700', fontSize: '0.8rem',
                transition: 'background 0.2s, color 0.2s',
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>

              <span style={{
                flex: 1,
                fontSize: '0.95rem',
                fontWeight: '600',
                color: isOpen ? '#F1F5F9' : 'var(--text)',
                fontFamily: 'Inter, sans-serif',
              }}>
                {mod.title}
              </span>

              {/* Chevron */}
              <span style={{
                fontSize: '0.75rem',
                color: 'var(--text-faint)',
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.25s ease',
                flexShrink: 0,
              }}>
                ▼
              </span>
            </button>

            {/* Body */}
            {isOpen && (
              <div style={{ padding: '0 20px 20px 66px' }}>
                {mod.details && (
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: '1.6' }}>
                    {mod.details}
                  </p>
                )}
                {mod.topics?.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {mod.topics.map((topic, j) => (
                      <span key={j} style={{
                        fontSize: '0.75rem',
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-muted)',
                        padding: '3px 10px',
                        borderRadius: '999px',
                      }}>
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
