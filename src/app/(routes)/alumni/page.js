import Link from 'next/link';

export const dynamic = 'force-dynamic';

async function getStudents() {
  try {
    const { dbAll } = await import('@/lib/db');
    return await dbAll('SELECT * FROM students');
  } catch {
    return [];
  }
}

export default async function AlumniPage() {
  const students = await getStudents();

  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh' }}>

      {/* ── Page Header ── */}
      <div style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)', padding: '56px 0 48px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="badge badge-blue" style={{ marginBottom: '16px', display: 'inline-flex' }}>
            Placement Success
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '14px' }}>
            Our <span className="text-gradient">Alumni</span>
          </h1>
          <p style={{ maxWidth: '540px', margin: '0 auto', fontSize: '1.05rem' }}>
            500+ students trained. See where our graduates are building their careers today.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '56px 24px' }}>

        {students.length === 0 ? (
          <div className="card" style={{ padding: '60px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎓</div>
            <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: '600', marginBottom: '8px' }}>
              Alumni stories coming soon
            </h3>
            <p style={{ marginBottom: '28px' }}>
              We're collecting placement stories from our graduates. Check back soon.
            </p>
            <Link href="/courses" className="btn-primary" style={{ display: 'inline-flex' }}>
              Explore Courses
            </Link>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            {students.map((student) => {
              const initials = student.name
                .split(' ')
                .map(n => n[0])
                .slice(0, 2)
                .join('');

              return (
                <div
                  key={student.id}
                  className="card"
                  style={{ padding: '24px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}
                >
                  {/* Avatar */}
                  <div style={{
                    width: '52px', height: '52px', flexShrink: 0,
                    background: 'var(--primary-dim)',
                    border: '2px solid rgba(37,99,235,0.3)',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: '700', fontSize: '1rem',
                    color: 'var(--primary-light)',
                    fontFamily: 'Inter, sans-serif',
                  }}>
                    {initials}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{
                      fontSize: '1rem',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: '700',
                      color: '#F1F5F9',
                      marginBottom: '4px',
                    }}>
                      {student.name}
                    </h3>

                    <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      {student.role}
                    </p>

                    <p style={{
                      fontSize: '0.83rem',
                      fontWeight: '600',
                      color: 'var(--primary-light)',
                      marginBottom: '10px',
                    }}>
                      {student.company}
                    </p>

                    {student.salary && (
                      <span style={{
                        display: 'inline-flex',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        background: 'rgba(16,185,129,0.12)',
                        color: '#6EE7B7',
                        border: '1px solid rgba(16,185,129,0.25)',
                        padding: '3px 10px',
                        borderRadius: '999px',
                      }}>
                        {student.salary}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <div style={{
          marginTop: '64px',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-xl)',
          padding: '48px 32px',
          textAlign: 'center',
        }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: '12px' }}>
            Your Name Could Be <span className="text-gradient">Next</span>
          </h2>
          <p style={{ maxWidth: '440px', margin: '0 auto 28px', fontSize: '0.95rem' }}>
            Join SQTS Training Institute and get the skills, projects, and placement support to land your dream role.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/courses" className="btn-primary">Explore Programs</Link>
            <Link href="/register" className="btn-outline">Enroll Now</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
