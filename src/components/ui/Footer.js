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
              }}>S</div>
              <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: '700', fontSize: '1.2rem', color: '#F1F5F9' }}>
                SQTS
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', lineHeight: '1.6', maxWidth: '220px' }}>
              Sparkque Tech Solutions — empowering careers through industry-focused tech education.
            </p>
          </div>

          {/* Programs */}
          <div>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94A3B8', marginBottom: '16px' }}>Programs</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Data Science', 'Web Development', 'Digital Marketing', 'Artificial Intelligence'].map(p => (
                <Link key={p} href="/courses" className="footer-link">
                  {p}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94A3B8', marginBottom: '16px' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[['About Us', '/'], ['Our Courses', '/courses'], ['Alumni', '/alumni'], ['Register', '/register']].map(([label, href]) => (
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
              <span>📧 info@sqts.in</span>
              <span>📞 +91 98765 43210</span>
              <span>📍 Chandigarh, India</span>
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
            © {year} Sparkque Tech Solutions. All rights reserved.
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
