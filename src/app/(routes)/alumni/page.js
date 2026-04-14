import { dbAll } from '@/lib/db';

export default async function AlumniPage() {
  // We fetch alumni records from the 'students' table (which was seeded with legacy placed-students data)
  const students = await dbAll('SELECT * FROM students');

  return (
    <div className="container" style={{ paddingTop: '150px', minHeight: '100vh', paddingBottom: '80px' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '20px' }}>Our Alumni</h1>
        <p style={{ color: '#a1a1aa', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          See where our top graduates are shining in the tech industry today.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
        {students.map((student) => (
          <div key={student.id} className="glass-panel" style={{ padding: '30px', display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ 
              width: '80px', height: '80px', borderRadius: '50%', 
              background: 'linear-gradient(135deg, var(--primary), var(--accent))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2rem', fontWeight: 'bold', color: 'white', flexShrink: 0
            }}>
              {student.name.charAt(0)}
            </div>
            
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{student.name}</h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '5px' }}>
                {student.role} <br/>
                <span className="text-gradient-soft" style={{ fontWeight: 'bold' }}>@ {student.company}</span>
              </p>
              <div style={{ background: 'rgba(236, 72, 153, 0.1)', color: '#ec4899', display: 'inline-block', padding: '3px 10px', borderRadius: '15px', fontSize: '0.8rem', fontWeight: 'bold', marginTop: '5px' }}>
                {student.salary}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
