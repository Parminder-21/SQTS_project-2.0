import Link from 'next/link';

/**
 * Reusable course card — used on the courses listing page and category sections.
 * Props: course (from COURSES data), size ('default' | 'compact')
 */
export default function CourseCard({ course, size = 'default' }) {
  const { id, title, category, description, duration, level, icon, color, tagline } = course;
  const isCompact = size === 'compact';

  return (
    <Link
      href={`/courses/${id}`}
      style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}
    >
      <div
        className="card"
        style={{
          padding: isCompact ? '20px' : '28px',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
      >
        {/* Top accent bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '3px',
          background: color || 'var(--primary)',
          borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
        }} />

        {/* Icon + category row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <div style={{
            width: isCompact ? '36px' : '44px',
            height: isCompact ? '36px' : '44px',
            background: `${color || 'var(--primary)'}18`,
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: isCompact ? '1.1rem' : '1.4rem',
            flexShrink: 0,
          }}>
            {icon || '📚'}
          </div>
          <span style={{
            fontSize: '0.72rem', fontWeight: '700',
            textTransform: 'uppercase', letterSpacing: '0.06em',
            color: color || 'var(--primary-light)',
            background: `${color || 'var(--primary)'}14`,
            border: `1px solid ${color || 'var(--primary)'}30`,
            padding: '3px 10px', borderRadius: '999px',
          }}>
            {category}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: isCompact ? '1rem' : '1.1rem',
          fontFamily: 'Inter, sans-serif',
          fontWeight: '700',
          color: '#F1F5F9',
          marginBottom: '8px',
          lineHeight: '1.3',
        }}>
          {title}
        </h3>

        {/* Tagline / description */}
        {!isCompact && (
          <p style={{
            fontSize: '0.85rem',
            lineHeight: '1.6',
            color: 'var(--text-muted)',
            flexGrow: 1,
            marginBottom: '16px',
          }}>
            {tagline || description?.slice(0, 100)}
          </p>
        )}

        {/* Meta row */}
        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          marginTop: isCompact ? '8px' : '0',
          flexWrap: 'wrap',
        }}>
          {duration && (
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              ⏱ {duration}
            </span>
          )}
          {level && (
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              📶 {level}
            </span>
          )}
        </div>

        {/* CTA */}
        {!isCompact && (
          <div style={{
            marginTop: '20px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.85rem',
            fontWeight: '600',
            color: color || 'var(--primary-light)',
          }}>
            View Course →
          </div>
        )}
      </div>
    </Link>
  );
}
