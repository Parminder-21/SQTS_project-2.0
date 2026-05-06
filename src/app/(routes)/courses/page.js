import Link from 'next/link';
import { dbAll } from '@/lib/db';
import SearchBar from '@/components/SearchBar';
import CourseFilters from '@/components/CourseFilters';

export const dynamic = 'force-dynamic';

function parseJsonArray(value) {
  if (!value) return [];
  try { return JSON.parse(value); } catch { return []; }
}

function normalizeSearchParams(p = {}) {
  return {
    query:    typeof p.q        === 'string' ? p.q.trim()        : '',
    category: typeof p.category === 'string' ? p.category.trim() : 'All',
    page:     Math.max(1, parseInt(p.page  || '1',  10) || 1),
    limit:    Math.min(24, Math.max(3, parseInt(p.limit || '9', 10) || 9)),
  };
}

function buildQS(filters, page) {
  const p = new URLSearchParams();
  if (filters.query)                    p.set('q',        filters.query);
  if (filters.category !== 'All')       p.set('category', filters.category);
  if (filters.limit !== 9)              p.set('limit',    String(filters.limit));
  p.set('page', String(page));
  const qs = p.toString();
  return qs ? `/courses?${qs}` : '/courses';
}

const CATEGORY_COLORS = {
  'Data Science':            '#3B82F6',
  'Web Development':         '#06B6D4',
  'Digital Marketing':       '#8B5CF6',
  'Artificial Intelligence': '#10B981',
};
function catColor(c) { return CATEGORY_COLORS[c] || '#3B82F6'; }

export default async function CoursesPage({ searchParams }) {
  const sp      = await searchParams;
  const filters = normalizeSearchParams(sp);
  const offset  = (filters.page - 1) * filters.limit;

  const whereParts = [];
  const args       = [];

  if (filters.query) {
    whereParts.push('(title LIKE ? OR description LIKE ? OR category LIKE ?)');
    const v = `%${filters.query}%`;
    args.push(v, v, v);
  }
  if (filters.category !== 'All') {
    whereParts.push('category = ?');
    args.push(filters.category);
  }

  const where = whereParts.length ? `WHERE ${whereParts.join(' AND ')}` : '';

  let catRows = [], countRows = [], rawCourses = [], dbError = null;
  try {
    [catRows, countRows, rawCourses] = await Promise.all([
      dbAll('SELECT DISTINCT category FROM courses ORDER BY category ASC'),
      dbAll(`SELECT COUNT(*) as total FROM courses ${where}`, args),
      dbAll(`SELECT * FROM courses ${where} ORDER BY title ASC LIMIT ? OFFSET ?`, [...args, filters.limit, offset]),
    ]);
  } catch (err) {
    dbError = err?.message || 'Database unavailable';
  }

  const categories  = ['All', ...catRows.map(r => r.category).filter(Boolean)];
  const total       = countRows[0]?.total || 0;
  const totalPages  = Math.max(1, Math.ceil(total / filters.limit));
  const courses     = rawCourses.map(c => ({ ...c, modules: parseJsonArray(c.modules), packages: parseJsonArray(c.packages) }));

  const winStart = Math.max(1, Math.min(filters.page - 2, Math.max(1, totalPages - 4)));
  const winEnd   = Math.min(totalPages, winStart + 4);

  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh' }}>

      {/* ── Page Header ── */}
      <div style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)', padding: '48px 0 40px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="badge badge-blue" style={{ marginBottom: '16px', display: 'inline-flex' }}>All Programs</span>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '12px' }}>
            Our <span className="text-gradient">Courses</span>
          </h1>
          <p style={{ maxWidth: '520px', margin: '0 auto', fontSize: '1.05rem' }}>
            Expert-led programs designed to make you industry-ready and placement-confident.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 24px' }}>

        {/* ── Search & Filter ── */}
        <form method="GET" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr) auto auto',
          gap: '12px',
          alignItems: 'end',
          marginBottom: '28px',
          padding: '20px 24px',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
        }}>
          <SearchBar defaultValue={filters.query} />
          <CourseFilters categories={categories} selectedCategory={filters.category} selectedLimit={filters.limit} />
        </form>

        {/* ── Result count ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '8px' }}>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>
            Showing <strong style={{ color: '#F1F5F9' }}>{courses.length}</strong> of <strong style={{ color: '#F1F5F9' }}>{total}</strong> courses
            {filters.query    ? <> for <em>"{filters.query}"</em></>    : ''}
            {filters.category !== 'All' ? <> in <em>{filters.category}</em></> : ''}
          </p>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-faint)' }}>Page {filters.page} of {totalPages}</p>
        </div>

        {/* ── DB Error ── */}
        {dbError && (
          <div className="card" style={{ padding: '40px', textAlign: 'center', borderColor: 'rgba(239,68,68,0.3)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>⚠️</div>
            <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: '600', marginBottom: '8px', color: '#FCA5A5' }}>Could not load courses</h3>
            <p style={{ fontSize: '0.9rem' }}>There was a problem connecting to the database. Please try again in a moment.</p>
          </div>
        )}

        {/* ── Course Grid ── */}
        {!dbError && courses.length === 0 ? (
          <div className="card" style={{ padding: '60px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
            <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: '600', marginBottom: '8px' }}>No courses found</h3>
            <p>Try adjusting your search or filters.</p>
          </div>
        ) : !dbError && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '28px' }}>
            {courses.map(course => {
              const color = catColor(course.category);
              return (
                <div key={course.id} className="card" style={{ display: 'flex', flexDirection: 'column', padding: '28px', position: 'relative', overflow: 'hidden' }}>
                  {/* Accent bar */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: color, borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }} />

                  {/* Header row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px', gap: '12px' }}>
                    <span className="badge" style={{ background: `${color}20`, color }}>
                      {course.category}
                    </span>
                    {course.duration && (
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', background: 'var(--bg-surface)', padding: '4px 10px', borderRadius: '999px', border: '1px solid var(--border)' }}>
                        ⏱ {course.duration}
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontFamily: 'Inter, sans-serif', fontWeight: '700', marginBottom: '10px', color: '#F1F5F9' }}>
                    {course.title}
                  </h3>

                  <p style={{ fontSize: '0.88rem', lineHeight: '1.65', flexGrow: 1, marginBottom: '20px' }}>
                    {course.description?.slice(0, 130)}{course.description?.length > 130 ? '…' : ''}
                  </p>

                  {/* Key modules */}
                  {course.modules?.length > 0 && (
                    <div style={{ marginBottom: '20px' }}>
                      <p style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-faint)', marginBottom: '8px' }}>Key Topics</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {course.modules.slice(0, 3).map((m, i) => (
                          <span key={i} style={{ fontSize: '0.78rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-muted)', padding: '3px 10px', borderRadius: '999px' }}>
                            {m.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <Link href={`/courses/${course.id}`} className="btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                    View Details
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '48px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link
              href={buildQS(filters, Math.max(1, filters.page - 1))}
              className={`page-btn${filters.page === 1 ? '' : ''}`}
              style={{ opacity: filters.page === 1 ? 0.4 : 1, pointerEvents: filters.page === 1 ? 'none' : 'auto' }}
            >
              ← Prev
            </Link>

            {Array.from({ length: winEnd - winStart + 1 }, (_, i) => {
              const n = winStart + i;
              return (
                <Link key={n} href={buildQS(filters, n)} className={`page-btn${n === filters.page ? ' active' : ''}`}>
                  {n}
                </Link>
              );
            })}

            <Link
              href={buildQS(filters, Math.min(totalPages, filters.page + 1))}
              className="page-btn"
              style={{ opacity: filters.page === totalPages ? 0.4 : 1, pointerEvents: filters.page === totalPages ? 'none' : 'auto' }}
            >
              Next →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
