import { dbGet } from '@/lib/db';
import Link from 'next/link';

export default async function CourseDetail({ params }) {
  const { id } = await params;
  
  const rawCourse = await dbGet('SELECT * FROM courses WHERE id = ?', [id]);
  
  if (!rawCourse) {
    return (
      <div className="container" style={{ paddingTop: '150px', textAlign: 'center', minHeight: '80vh' }}>
        <h1 className="text-gradient">Course Not Found</h1>
        <Link href="/courses" className="btn-primary" style={{ marginTop: '30px' }}>Back to Courses</Link>
      </div>
    );
  }

  const course = {
    ...rawCourse,
    modules: JSON.parse(rawCourse.modules),
    packages: JSON.parse(rawCourse.packages)
  };

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '100vh' }}>
      <div style={{ marginBottom: '60px' }}>
        <Link href="/courses" style={{ color: '#a1a1aa', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          ← Back to all courses
        </Link>
        <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '20px' }}>{course.title}</h1>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '30px' }}>
          <span style={{ background: 'rgba(99,102,241,0.2)', color: '#a5b4fc', padding: '8px 20px', borderRadius: '30px' }}>{course.category}</span>
          <span style={{ color: '#a1a1aa' }}>Duration: <strong style={{ color: '#fff' }}>{course.duration}</strong></span>
        </div>
        <p style={{ fontSize: '1.2rem', color: '#e4e4e7', maxWidth: '800px', lineHeight: '1.8' }}>
          {course.description}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '60px' }}>
        <section>
          <h2 style={{ fontSize: '2rem', marginBottom: '30px' }}>Curriculum <span className="text-gradient">Modules</span></h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {course.modules.map((mod, i) => (
              <div key={i} className="glass-panel" style={{ padding: '30px', borderLeft: '4px solid var(--primary)' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Module {i + 1}: {mod.title}</h3>
                <p style={{ color: '#a1a1aa', marginBottom: '20px' }}>{mod.details}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {mod.topics.map((topic, j) => (
                    <span key={j} style={{ background: 'rgba(255,255,255,0.05)', padding: '5px 15px', borderRadius: '8px', fontSize: '0.9rem' }}>
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: '2rem', marginBottom: '30px' }}>Pricing <span className="text-gradient">Plans</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {course.packages.map((pkg, i) => (
              <div key={i} className="glass-panel" style={{ padding: '40px 30px', textAlign: 'center', position: 'relative' }}>
                {i === course.packages.length - 1 && (
                  <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'var(--accent)', color: 'white', padding: '5px 15px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    MOST POPULAR
                  </div>
                )}
                <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#a5b4fc' }}>{pkg.name}</h3>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '20px', color: '#fff' }}>
                  {pkg.price}
                </div>
                <p style={{ color: '#a1a1aa', marginBottom: '30px', minHeight: '50px' }}>
                  Includes: {pkg.includes}
                </p>
                <Link 
                  href={`/register?course=${course.id}&plan=${pkg.name}`} 
                  className="btn-primary" 
                  style={{ 
                    width: '100%', 
                    background: i !== course.packages.length - 1 ? 'rgba(255,255,255,0.1)' : undefined, 
                    boxShadow: i !== course.packages.length - 1 ? 'none' : undefined 
                  }}
                >
                  Select Plan
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
