import { dbGet } from '@/lib/db';
import Link from 'next/link';
import CourseViewTracker from '@/components/CourseViewTracker';

const CATEGORY_COLORS = {
  'Data Science':            '#3B82F6',
  'Web Development':         '#06B6D4',
  'Digital Marketing':       '#8B5CF6',
  'Artificial Intelligence': '#10B981',
};
function catColor(c) { return CATEGORY_COLORS[c] || '#3B82F6'; }

export default async function CourseDetail({ params }) {
  const { id } = await params;

  let raw = null;
  try {
    raw = await dbGet('SELECT * FROM courses WHERE id = ?', [id]);
  } catch {
    return (
      <div style={{ paddingTop: '70px', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container" style={{ textAlign: 'center', padding: '80px 24px' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '20px' }}>⚠️</div>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '12px' }}>Could not load course</h1>
          <p style={{ marginBottom: '32px' }}>Database temporarily unavailable. Please try again.</p>
          <Link href="/courses" className="btn-primary">← Back to Courses</Link>
        </div>
      </div>
    );
  }

  if (!raw) {
    return (
      <div style={{ paddingTop: '70px', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container" style={{ textAlign: 'center', padding: '80px 24px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📚</div>
          <h1 style={{ marginBottom: '12px' }}>Course Not Found</h1>
          <p style={{ marginBottom: '32px' }}>This course may have been removed or the link is incorrect.</p>
          <Link href="/courses" className="btn-primary">← Back to Courses</Link>
        </div>
      </div>
    );
  }

  const course = {
    ...raw,
    modules:  JSON.parse(raw.modules  || '[]'),
    packages: JSON.parse(raw.packages || '[]'),
  };

  const color = catColor(course.category);

  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh' }}>
      <CourseViewTracker courseId={course.id} courseTitle={course.title} />

      {/* ── Course Hero ── */}
      <div style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)', padding: '48px 0' }}>
        <div className="container">
          <Link href="/courses" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', marginBottom: '24px', transition: 'color 0.2s' }}>
            ← Back to all courses
          </Link>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
            <span className="badge" style={{ background: `${color}20`, color }}>
              {course.category}
            </span>
            {course.duration && (
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '4px 12px', borderRadius: '999px' }}>
                ⏱ {course.duration}
              </span>
            )}
          </div>

          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', marginBottom: '16px', maxWidth: '800px' }}>
            {course.title}
          </h1>

          <p style={{ fontSize: '1.05rem', lineHeight: '1.8', maxWidth: '720px', color: '#CBD5E1' }}>
            {course.description}
          </p>

          <div style={{ marginTop: '32px' }}>
            <Link href={`/register?course=${course.id}`} className="btn-primary" style={{ padding: '13px 32px', fontSize: '1rem' }}>
              Enroll in This Course
            </Link>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="container" style={{ padding: '56px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '56px' }}>

          {/* Curriculum */}
          {course.modules.length > 0 && (
            <section>
              <div style={{ marginBottom: '32px' }}>
                <span className="badge badge-blue" style={{ marginBottom: '12px', display: 'inline-flex' }}>Curriculum</span>
                <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
                  Course <span className="text-gradient">Modules</span>
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {course.modules.map((mod, i) => (
                  <div key={i} className="card" style={{ padding: '24px 28px', borderLeft: `4px solid ${color}` }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                      <div style={{
                        width: '36px', height: '36px', flexShrink: 0,
                        background: `${color}20`, color,
                        borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: '700', fontSize: '0.9rem'
                      }}>
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ marginBottom: '6px', fontSize: '1rem' }}>{mod.title}</h4>
                        {mod.details && <p style={{ fontSize: '0.88rem', marginBottom: '14px' }}>{mod.details}</p>}
                        {mod.topics?.length > 0 && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {mod.topics.map((t, j) => (
                              <span key={j} style={{ fontSize: '0.78rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-muted)', padding: '3px 10px', borderRadius: '999px' }}>
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Pricing */}
          {course.packages.length > 0 && (
            <section>
              <div style={{ marginBottom: '32px' }}>
                <span className="badge badge-cyan" style={{ marginBottom: '12px', display: 'inline-flex' }}>Pricing</span>
                <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
                  Choose Your <span className="text-gradient">Plan</span>
                </h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
                {course.packages.map((pkg, i) => {
                  const isPopular = i === course.packages.length - 1;
                  return (
                    <div key={i} className="card" style={{
                      padding: '32px 28px',
                      textAlign: 'center',
                      position: 'relative',
                      border: isPopular ? `2px solid ${color}` : undefined,
                    }}>
                      {isPopular && (
                        <div style={{
                          position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)',
                          background: color, color: '#fff',
                          padding: '4px 16px', borderRadius: '999px',
                          fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.05em', textTransform: 'uppercase',
                          whiteSpace: 'nowrap'
                        }}>
                          Most Popular
                        </div>
                      )}

                      <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: '700', fontSize: '1.1rem', marginBottom: '12px', color: '#F1F5F9' }}>
                        {pkg.name}
                      </h3>
                      <div style={{ fontSize: '2.2rem', fontWeight: '800', color: color, marginBottom: '16px', fontFamily: 'Playfair Display, serif' }}>
                        {pkg.price}
                      </div>
                      <p style={{ fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '28px', minHeight: '48px' }}>
                        {pkg.includes}
                      </p>
                      <Link
                        href={`/register?course=${course.id}&plan=${encodeURIComponent(pkg.name)}`}
                        className={isPopular ? 'btn-primary' : 'btn-outline'}
                        style={{ width: '100%', textAlign: 'center' }}
                      >
                        Select Plan
                      </Link>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
}
