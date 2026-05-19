import Link from 'next/link';
import { getCourseById, getRelatedCourses } from '@/data/courses';
import SyllabusAccordion from '@/components/courses/SyllabusAccordion';
import CourseCard from '@/components/courses/CourseCard';
import CourseViewTracker from '@/components/CourseViewTracker';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const { COURSES } = await import('@/data/courses');
  return COURSES.map(c => ({ id: c.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const course = getCourseById(id);
  if (!course) return { title: 'Course Not Found' };
  return {
    title: `${course.title} | SQTS Training Institute`,
    description: course.tagline || course.description,
  };
}

export default async function CourseDetailPage({ params }) {
  const { id } = await params;
  const course = getCourseById(id);

  if (!course) {
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

  const related = getRelatedCourses(course);
  const { color = '#2563EB' } = course;

  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh' }}>
      <CourseViewTracker courseId={course.id} courseTitle={course.title} />

      {/* ── HERO ── */}
      <div style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)', padding: '48px 0 40px' }}>
        <div className="container">
          <Link href="/courses" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            color: 'var(--text-muted)', textDecoration: 'none',
            fontSize: '0.85rem', marginBottom: '24px',
          }}>
            ← All Courses
          </Link>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
            <span className="badge" style={{ background: `${color}20`, color }}>{course.category}</span>
            {course.level && (
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '3px 12px', borderRadius: '999px' }}>
                📶 {course.level}
              </span>
            )}
            {course.duration && (
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '3px 12px', borderRadius: '999px' }}>
                ⏱ {course.duration}
              </span>
            )}
            {course.certification && (
              <span style={{ fontSize: '0.8rem', color: '#6EE7B7', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', padding: '3px 12px', borderRadius: '999px' }}>
                🏆 Certificate
              </span>
            )}
            {course.internship && (
              <span style={{ fontSize: '0.8rem', color: '#93C5FD', background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.25)', padding: '3px 12px', borderRadius: '999px' }}>
                🚀 Internship Available
              </span>
            )}
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{
              width: '56px', height: '56px', flexShrink: 0,
              background: `${color}18`, borderRadius: '14px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.8rem',
            }}>
              {course.icon}
            </div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', marginBottom: '10px' }}>
                {course.title}
              </h1>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.8', maxWidth: '720px', color: '#CBD5E1' }}>
                {course.tagline}
              </p>
            </div>
          </div>

          {/* Sticky enroll CTA */}
          <div style={{ marginTop: '28px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href={`/register?course=${course.id}`} className="btn-primary" style={{ padding: '13px 32px' }}>
              Enroll Now
            </Link>
            <Link href="/register?type=demo" className="btn-outline" style={{ padding: '12px 28px' }}>
              Book Free Demo
            </Link>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="container" style={{ padding: '56px 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 300px',
          gap: '48px',
          alignItems: 'start',
        }}>

          {/* ── LEFT COLUMN ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>

            {/* Overview */}
            <section>
              <SectionHeader badge="Overview" title="About This Course" color={color} />
              <p style={{ fontSize: '1rem', lineHeight: '1.85', color: '#CBD5E1' }}>
                {course.description}
              </p>
            </section>

            {/* Who this is for */}
            {course.forWhom?.length > 0 && (
              <section>
                <SectionHeader badge="Audience" title="Who This Course Is For" color={color} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {course.forWhom.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{
                        width: '22px', height: '22px', flexShrink: 0,
                        background: `${color}20`, color,
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.65rem', fontWeight: '800', marginTop: '2px',
                      }}>✓</div>
                      <p style={{ fontSize: '0.95rem', color: '#CBD5E1', margin: 0 }}>{item}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Syllabus */}
            {course.modules?.length > 0 && (
              <section>
                <SectionHeader badge="Curriculum" title="Course Syllabus" color={color} />
                <SyllabusAccordion modules={course.modules} color={color} />
              </section>
            )}

            {/* Projects */}
            {course.projects?.length > 0 && (
              <section>
                <SectionHeader badge="Hands-On" title="Projects You'll Build" color={color} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
                  {course.projects.map((proj, i) => (
                    <div key={i} className="card" style={{ padding: '20px', borderLeft: `3px solid ${color}` }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: '700', color, background: `${color}14`, border: `1px solid ${color}30`, padding: '2px 8px', borderRadius: '999px' }}>
                          Project {i + 1}
                        </span>
                      </div>
                      <h4 style={{ fontSize: '0.95rem', marginBottom: '6px', color: '#F1F5F9' }}>{proj.title}</h4>
                      <p style={{ fontSize: '0.83rem', lineHeight: '1.6', margin: 0 }}>{proj.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Career paths */}
            {course.careerPaths?.length > 0 && (
              <section>
                <SectionHeader badge="Outcomes" title="Career Opportunities" color={color} />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {course.careerPaths.map((path, i) => (
                    <span key={i} style={{
                      fontSize: '0.88rem', fontWeight: '600',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      padding: '8px 16px', borderRadius: 'var(--radius-sm)',
                    }}>
                      {path}
                    </span>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'sticky', top: '90px' }}>

            {/* Quick info card */}
            <div className="card" style={{ padding: '24px' }}>
              <h4 style={{ fontSize: '0.9rem', marginBottom: '16px', color: '#F1F5F9' }}>Course Details</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { label: 'Duration',      value: course.duration,                    icon: '⏱' },
                  { label: 'Level',         value: course.level,                       icon: '📶' },
                  { label: 'Certificate',   value: course.certification ? 'Yes' : 'No', icon: '🏆' },
                  { label: 'Internship',    value: course.internship ? 'Available' : 'Not included', icon: '🚀' },
                  { label: 'Modules',       value: `${course.modules?.length || 0} modules`, icon: '📋' },
                  { label: 'Projects',      value: `${course.projects?.length || 0} projects`, icon: '🗂️' },
                ].filter(r => r.value).map(({ label, value, icon }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{icon} {label}</span>
                    <span style={{ fontSize: '0.82rem', fontWeight: '600', color: '#F1F5F9' }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools */}
            {course.tools?.length > 0 && (
              <div className="card" style={{ padding: '24px' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '14px', color: '#F1F5F9' }}>Tools & Technologies</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {course.tools.map((tool, i) => (
                    <span key={i} style={{
                      fontSize: '0.75rem', fontWeight: '600',
                      background: `${color}14`, color,
                      border: `1px solid ${color}30`,
                      padding: '4px 10px', borderRadius: '999px',
                    }}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Pricing */}
            {course.packages?.length > 0 && (
              <div className="card" style={{ padding: '24px' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '16px', color: '#F1F5F9' }}>Pricing Plans</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {course.packages.map((pkg, i) => {
                    const isPopular = i === course.packages.length - 1;
                    return (
                      <div key={i} style={{
                        padding: '14px 16px',
                        background: isPopular ? `${color}14` : 'var(--bg-surface)',
                        border: `1px solid ${isPopular ? `${color}40` : 'var(--border)'}`,
                        borderRadius: 'var(--radius-sm)',
                        position: 'relative',
                      }}>
                        {isPopular && (
                          <span style={{
                            position: 'absolute', top: '-10px', right: '12px',
                            fontSize: '0.65rem', fontWeight: '800',
                            background: color, color: '#fff',
                            padding: '2px 8px', borderRadius: '999px',
                            textTransform: 'uppercase', letterSpacing: '0.05em',
                          }}>Popular</span>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                          <span style={{ fontSize: '0.88rem', fontWeight: '700', color: '#F1F5F9' }}>{pkg.name}</span>
                          <span style={{ fontSize: '1rem', fontWeight: '800', color, fontFamily: 'Playfair Display, serif' }}>{pkg.price}</span>
                        </div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>{pkg.includes}</p>
                      </div>
                    );
                  })}
                </div>
                <Link
                  href={`/register?course=${course.id}`}
                  className="btn-primary"
                  style={{ width: '100%', textAlign: 'center', marginTop: '16px', display: 'block' }}
                >
                  Enroll Now
                </Link>
              </div>
            )}

          </aside>
        </div>
      </div>

      {/* ── RELATED COURSES ── */}
      {related.length > 0 && (
        <div style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)', padding: '56px 0' }}>
          <div className="container">
            <div style={{ marginBottom: '32px' }}>
              <span className="badge badge-cyan" style={{ marginBottom: '12px', display: 'inline-flex' }}>Next Steps</span>
              <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)' }}>
                Recommended <span className="text-gradient">Next Courses</span>
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
              {related.map(c => <CourseCard key={c.id} course={c} size="compact" />)}
            </div>
          </div>
        </div>
      )}

      {/* ── BOTTOM CTA ── */}
      <div style={{ padding: '56px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '12px' }}>
            Ready to start <span className="text-gradient">{course.title}?</span>
          </h2>
          <p style={{ maxWidth: '420px', margin: '0 auto 28px', fontSize: '0.95rem' }}>
            Join hundreds of students who have already enrolled. Next batch starts June 15.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={`/register?course=${course.id}`} className="btn-primary">Enroll Now</Link>
            <Link href="/register?type=demo" className="btn-outline">Book Free Demo</Link>
          </div>
        </div>
      </div>

      {/* Responsive sidebar collapse */}
      <style>{`
        @media (max-width: 900px) {
          .course-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

/* ── Shared section header ── */
function SectionHeader({ badge, title, color }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <span className="badge" style={{
        background: `${color}14`, color,
        border: `1px solid ${color}30`,
        marginBottom: '10px', display: 'inline-flex',
      }}>
        {badge}
      </span>
      <h2 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.7rem)' }}>{title}</h2>
    </div>
  );
}
