'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/',        label: 'Home'    },
  { href: '/courses', label: 'Courses' },
  { href: '/alumni',  label: 'Alumni'  },
  { href: '/contact', label: 'Contact' },
];

// ── Auth button — shown in both desktop and mobile ──────────────────────
const AuthButton = ({ mobile = false, loggedIn, username, role, handleLogout }) => {
  if (loggedIn) {
    const dashboardLink = role === 'admin' ? '/admin' : '/dashboard';
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexDirection: mobile ? 'column' : 'row', width: mobile ? '100%' : 'auto' }}>
        <Link href={dashboardLink} style={{ textDecoration: 'none' }}>
          <span style={{
            fontSize: '0.82rem', color: 'var(--text-muted)',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: '999px',
            padding: '5px 14px',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
          }}>
            👤 {username} (Dashboard)
          </span>
        </Link>
        <button
          onClick={handleLogout}
          className="btn-outline"
          style={{ padding: '7px 18px', fontSize: '0.85rem', width: mobile ? '100%' : 'auto' }}
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/register"
      className="btn-primary"
      style={{ padding: '9px 22px', fontSize: '0.88rem', width: mobile ? '100%' : 'auto', textAlign: 'center' }}
    >
      Enroll Now
    </Link>
  );
};

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [loggedIn,  setLoggedIn]  = useState(false);
  const [username,  setUsername]  = useState('');
  const [role,      setRole]      = useState('');
  const pathname = usePathname();

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Check auth state from localStorage — runs on mount and on every route change
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('userToken') || localStorage.getItem('adminToken');
      if (!token) { setLoggedIn(false); setUsername(''); setRole(''); return; }

      // Decode JWT payload (no verification needed here — just for display)
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        // Check expiry
        if (payload.exp && payload.exp * 1000 < Date.now()) {
          localStorage.removeItem('userToken');
          localStorage.removeItem('adminToken');
          setLoggedIn(false); setUsername(''); setRole('');
          return;
        }
        setLoggedIn(true);
        setUsername(payload.username || '');
        setRole(payload.role || '');
      } catch {
        setLoggedIn(false); setUsername(''); setRole('');
      }
    };

    checkAuth();
    // Re-check when storage changes (e.g. login in another tab)
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRefreshToken');
    localStorage.removeItem('adminToken');
    setLoggedIn(false);
    setUsername('');
    setRole('');
    window.location.href = '/';
  };

  return (
    <nav className={`sticky-nav${scrolled ? ' scrolled' : ''}`}>
      <div className="container">
        {/* ── Top bar ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0' }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src="/logo.png"
              alt="Shree Balaji Coaching Logo"
              width={34}
              height={34}
              style={{
                borderRadius: '8px',
                objectFit: 'cover',
                flexShrink: 0,
                border: '1px solid var(--border)',
              }}
            />
            <span style={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: '700',
              fontSize: '1.15rem',
              color: '#F1F5F9',
              letterSpacing: '-0.01em'
            }}>
              Shree Balaji
            </span>
          </Link>

          {/* Desktop links */}
          <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
              return (
                <Link key={href} href={href} className={`nav-link${isActive ? ' active' : ''}`} onClick={() => setMenuOpen(false)}>
                  {label}
                </Link>
              );
            })}
            <AuthButton loggedIn={loggedIn} username={username} role={role} handleLogout={handleLogout} />
          </div>

          {/* Hamburger */}
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>

        {/* ── Mobile menu ── */}
        <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>{label}</Link>
          ))}
          <div style={{ marginTop: '8px' }}>
            <AuthButton mobile loggedIn={loggedIn} username={username} role={role} handleLogout={handleLogout} />
          </div>
        </div>
      </div>
    </nav>
  );
}
