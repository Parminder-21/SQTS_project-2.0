import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{
                width: '36px', height: '36px',
                background: 'var(--primary)',
                borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Playfair Display, serif',
                fontWeight: '700', fontSize: '1rem', color: '#fff'
              }}>SB</div>
              <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: '700', fontSize: '1.2rem', color: '#F1F5F9' }}>
                Shree Balaji
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', lineHeight: '1.6', maxWidth: '220px' }}>
              Shree Balaji Coaching Institute — practical tech education with placement support for students at every stage.
            </p>
          </div>

          {/* Programs */}
          <div>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94A3B8', marginBottom: '16px' }}>Programs</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                ['School Coaching',    '/courses?category=School+Coaching'],
                ['Programming',        '/courses?category=Programming'],
                ['Web Development',    '/courses?category=Web+Development'],
                ['AI & Future Tech',   '/courses?category=Artificial+Intelligence'],
                ['Internship Programs','/register?type=internship'],
                ['Graphic Design',     '/courses?category=Digital+Marketing'],
              ].map(([label, href]) => (
                <Link key={label} href={href} className="footer-link">{label}</Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94A3B8', marginBottom: '16px' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                ['Home',        '/'],
                ['All Courses', '/courses'],
                ['Alumni',      '/alumni'],
                ['Contact',     '/contact'],
                ['Free Demo',   '/contact?type=demo'],
                ['Internships', '/contact?type=internship'],
                ['Register',    '/register'],
              ].map(([label, href]) => (
                <Link key={label} href={href} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94A3B8', marginBottom: '16px' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <span>Email: info@shreebalaji.in</span>
              <span>Phone: +91 98765 43210</span>
              <span>Location: Chandigarh, India</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-faint)', margin: 0 }}>
            © {year} Shree Balaji Coaching Institute. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Privacy Policy', 'Terms of Service'].map(t => (
              <Link key={t} href="/" style={{ fontSize: '0.85rem', color: 'var(--text-faint)', textDecoration: 'none' }}>{t}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
