import Link from 'next/link';
import { dbAll } from '@/lib/db';
import SearchBar from '@/components/SearchBar';
import CourseFilters from '@/components/CourseFilters';

export const dynamic = 'force-dynamic';

function parseJsonArray(value) {
  if (!value) return [];

  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
}

function normalizeSearchParams(searchParams) {
  const params = searchParams || {};
  const query = typeof params.q === 'string' ? params.q.trim() : '';
  const category = typeof params.category === 'string' ? params.category.trim() : 'All';
  const page = Math.max(1, parseInt(typeof params.page === 'string' ? params.page : '1', 10) || 1);
  const limit = Math.min(24, Math.max(3, parseInt(typeof params.limit === 'string' ? params.limit : '9', 10) || 9));

  return { query, category, page, limit };
}

function buildQueryString(filters, nextPage) {
  const params = new URLSearchParams();

  if (filters.query) {
    params.set('q', filters.query);
  }

  if (filters.category && filters.category !== 'All') {
    params.set('category', filters.category);
  }

  if (filters.limit !== 9) {
    params.set('limit', String(filters.limit));
  }

  params.set('page', String(nextPage));

  const queryString = params.toString();
  return queryString ? `/courses?${queryString}` : '/courses';
}

export default async function CoursesPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const filters = normalizeSearchParams(resolvedSearchParams);
  const offset = (filters.page - 1) * filters.limit;

  const whereParts = [];
  const queryArgs = [];

  if (filters.query) {
    whereParts.push('(title LIKE ? OR description LIKE ? OR category LIKE ?)');
    const searchValue = `%${filters.query}%`;
    queryArgs.push(searchValue, searchValue, searchValue);
  }

  if (filters.category && filters.category !== 'All') {
    whereParts.push('category = ?');
    queryArgs.push(filters.category);
  }

  const whereClause = whereParts.length > 0 ? `WHERE ${whereParts.join(' AND ')}` : '';

  const [categoryRows, countRows, rawCourses] = await Promise.all([
    dbAll('SELECT DISTINCT category FROM courses ORDER BY category ASC'),
    dbAll(`SELECT COUNT(*) as total FROM courses ${whereClause}`, queryArgs),
    dbAll(`SELECT * FROM courses ${whereClause} ORDER BY title ASC LIMIT ? OFFSET ?`, [...queryArgs, filters.limit, offset])
  ]);

  const categories = ['All', ...categoryRows.map((row) => row.category).filter(Boolean)];
  const total = countRows[0]?.total || 0;
  const totalPages = Math.max(1, Math.ceil(total / filters.limit));

  const courses = rawCourses.map((course) => ({
    ...course,
    modules: parseJsonArray(course.modules),
    packages: parseJsonArray(course.packages)
  }));

  const paginationWindowStart = Math.max(1, Math.min(filters.page - 1, Math.max(1, totalPages - 4)));
  const paginationWindowEnd = Math.min(totalPages, paginationWindowStart + 4);

  return (
    <div className="container" style={{ paddingTop: '150px', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '20px' }}>Our Programs</h1>
        <p style={{ color: '#a1a1aa', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Explore our expert-led courses designed to make you industry-ready.
        </p>
      </div>

      <form
        method="GET"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr) auto auto',
          gap: '12px',
          alignItems: 'end',
          marginBottom: '30px',
          padding: '20px',
          borderRadius: '24px',
          background: 'rgba(15, 23, 42, 0.55)',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <SearchBar defaultValue={filters.query} />
        <CourseFilters categories={categories} selectedCategory={filters.category} selectedLimit={filters.limit} />
      </form>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', color: '#a1a1aa', gap: '16px', flexWrap: 'wrap' }}>
        <p style={{ margin: 0 }}>
          Showing {courses.length} of {total} courses
          {filters.query ? ` for "${filters.query}"` : ''}
          {filters.category !== 'All' ? ` in ${filters.category}` : ''}
        </p>
        <p style={{ margin: 0 }}>Page {filters.page} of {totalPages}</p>
      </div>

      {courses.length === 0 ? (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: '#a1a1aa' }}>
          No courses matched your filters.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
          {courses.map((course) => (
            <div key={course.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', padding: '30px', position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '5px',
                background: 'linear-gradient(90deg, var(--primary), var(--accent))'
              }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', gap: '12px' }}>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{course.title}</h3>
                <span style={{ background: 'rgba(255,255,255,0.1)', padding: '5px 15px', borderRadius: '20px', fontSize: '0.8rem', color: '#fff', whiteSpace: 'nowrap' }}>
                  {course.duration}
                </span>
              </div>

              <p style={{ color: '#a1a1aa', marginBottom: '16px', flexGrow: 1, lineHeight: '1.6' }}>
                {course.description}
              </p>

              <span style={{ display: 'inline-flex', alignSelf: 'flex-start', marginBottom: '24px', background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', padding: '5px 12px', borderRadius: '8px', fontSize: '0.85rem' }}>
                {course.category}
              </span>

              <div style={{ marginBottom: '30px' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '15px', color: '#fff' }}>Key Modules:</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {course.modules.slice(0, 3).map((mod, index) => (
                    <span key={index} style={{ background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', padding: '5px 12px', borderRadius: '8px', fontSize: '0.85rem' }}>
                      {mod.title}
                    </span>
                  ))}
                </div>
              </div>

              <Link href={`/courses/${course.id}`} className="btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                Explore Details
              </Link>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '40px', flexWrap: 'wrap' }}>
          <Link
            href={buildQueryString(filters, Math.max(1, filters.page - 1))}
            aria-disabled={filters.page === 1}
            style={{
              pointerEvents: filters.page === 1 ? 'none' : 'auto',
              opacity: filters.page === 1 ? 0.45 : 1,
              padding: '10px 16px',
              borderRadius: '999px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#fff',
              textDecoration: 'none'
            }}
          >
            Previous
          </Link>

          {Array.from({ length: paginationWindowEnd - paginationWindowStart + 1 }, (_, index) => {
            const pageNumber = paginationWindowStart + index;
            const isActive = pageNumber === filters.page;

            return (
              <Link
                key={pageNumber}
                href={buildQueryString(filters, pageNumber)}
                style={{
                  padding: '10px 16px',
                  borderRadius: '999px',
                  border: isActive ? '1px solid rgba(165, 180, 252, 0.6)' : '1px solid rgba(255, 255, 255, 0.12)',
                  background: isActive ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                  color: '#fff',
                  textDecoration: 'none'
                }}
              >
                {pageNumber}
              </Link>
            );
          })}

          <Link
            href={buildQueryString(filters, Math.min(totalPages, filters.page + 1))}
            aria-disabled={filters.page === totalPages}
            style={{
              pointerEvents: filters.page === totalPages ? 'none' : 'auto',
              opacity: filters.page === totalPages ? 0.45 : 1,
              padding: '10px 16px',
              borderRadius: '999px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#fff',
              textDecoration: 'none'
            }}
          >
            Next
          </Link>
        </div>
      )}
    </div>
  );
}
