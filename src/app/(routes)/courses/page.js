import { getDb } from '@/lib/db';
import Link from 'next/link';

export default async function CoursesPage() {
  const db = await getDb();
  const rawCourses = await db.all('SELECT * FROM courses');
  
  const courses = rawCourses.map(course => ({
    ...course,
    modules: JSON.parse(course.modules),
    packages: JSON.parse(course.packages)
  }));

  const categories = ['All', ...new Set(courses.map(c => c.category))];

  return (
    <div className="container" style={{ paddingTop: '150px', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '20px' }}>Our Programs</h1>
        <p style={{ color: '#a1a1aa', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Explore our expert-led courses designed to make you industry-ready.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
        {courses.map(course => (
          <div key={course.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', padding: '30px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ 
              position: 'absolute', top: 0, left: 0, right: 0, height: '5px', 
              background: 'linear-gradient(90deg, var(--primary), var(--accent))' 
            }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{course.title}</h3>
              <span style={{ background: 'rgba(255,255,255,0.1)', padding: '5px 15px', borderRadius: '20px', fontSize: '0.8rem', color: '#fff' }}>
                {course.duration}
              </span>
            </div>
            
            <p style={{ color: '#a1a1aa', marginBottom: '30px', flexGrow: 1, lineHeight: '1.6' }}>
              {course.description}
            </p>

            <div style={{ marginBottom: '30px' }}>
              <h4 style={{ fontSize: '1rem', marginBottom: '15px', color: '#fff' }}>Key Modules:</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {course.modules.slice(0, 3).map((mod, i) => (
                  <span key={i} style={{ background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', padding: '5px 12px', borderRadius: '8px', fontSize: '0.85rem' }}>
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
    </div>
  );
}
