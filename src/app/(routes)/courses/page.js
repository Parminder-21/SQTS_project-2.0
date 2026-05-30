import Link from 'next/link';
import { COURSES, CATEGORIES, CATEGORY_META } from '@/data/courses';
import CourseCard from '@/components/courses/CourseCard';
import Icon from '@/components/ui/Icon';

// Static — data comes from the JS file, not the DB
export const dynamic = 'force-static';

const CATEGORY_ORDER = [
  'Programming',
  'Web Development',
  'AI & Future Tech',
  'Design & Digital Skills',
  'School Coaching',
];

export default function CoursesPage() {
  const orderedCategories = CATEGORY_ORDER.filter(c => CATEGORIES.includes(c));

  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh' }}>

      {/* ── Page Header ── */}
      <div style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)', padding: '56px 0 48px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="badge badge-blue" style={{ marginBottom: '16px', display: 'inline-flex' }}>
            All Programs
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '14px' }}>
            Our <span className="text-gradient">Training Programs</span>
          </h1>
          <p style={{ maxWidth: '560px', margin: '0 auto', fontSize: '1.05rem' }}>
            {COURSES.length} courses across {CATEGORIES.length} domains — from school basics to advanced tech skills.
          </p>

          {/* Category quick-nav */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginTop: '28px' }}>
            {orderedCategories.map(cat => {
              const meta = CATEGORY_META[cat] || {};
              return (
                <a
                  key={cat}
                  href={`#${cat.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    padding: '7px 16px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: '999px',
                    fontSize: '0.82rem', fontWeight: '600',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                >
                  <Icon name={meta.icon} color="var(--text-muted)" size={14} animate={false} /> {cat}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Category Sections ── */}
      <div className="container" style={{ padding: '64px 24px' }}>
        {orderedCategories.map((category, catIdx) => {
          const meta = CATEGORY_META[category] || { icon: '📚', color: '#3B82F6', desc: '' };
          const categoryCourses = COURSES.filter(c => c.category === category);
          const anchorId = category.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

          return (
            <section
              key={category}
              id={anchorId}
              style={{ marginBottom: catIdx < orderedCategories.length - 1 ? '72px' : '0' }}
            >
              {/* Section header */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '28px',
                paddingBottom: '20px',
                borderBottom: '1px solid var(--border)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '48px', height: '48px',
                    background: `${meta.color}18`,
                    border: `1px solid ${meta.color}30`,
                    borderRadius: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon name={meta.icon || 'school'} color={meta.color} size={22} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', marginBottom: '2px' }}>
                      {category}
                    </h2>
                    <p style={{ fontSize: '0.85rem', margin: 0 }}>{meta.desc}</p>
                  </div>
                </div>
                <span style={{
                  fontSize: '0.78rem', fontWeight: '600',
                  color: meta.color,
                  background: `${meta.color}14`,
                  border: `1px solid ${meta.color}30`,
                  padding: '4px 12px', borderRadius: '999px',
                }}>
                  {categoryCourses.length} course{categoryCourses.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Course grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '20px',
              }}>
                {categoryCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* ── Bottom CTA ── */}
      <div style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)', padding: '56px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: '12px' }}>
            Not sure which course to pick?
          </h2>
          <p style={{ maxWidth: '440px', margin: '0 auto 28px', fontSize: '0.95rem' }}>
            Book a free demo class and our mentors will guide you to the right program for your goals.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/register?type=demo" className="btn-primary">Book Free Demo</Link>
            <Link href="/register?type=internship" className="btn-outline">Apply for Internship</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
