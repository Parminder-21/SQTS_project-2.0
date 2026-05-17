'use client';
import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

/* ── Type config — maps ?type= param to UI copy ── */
const TYPE_CONFIG = {
  internship: {
    badge:    'Internship Application',
    title:    'Apply for Internship',
    subtitle: '50+ domains available. Real work experience with a verified certificate.',
    cta:      'Submit Application',
  },
  demo: {
    badge:    'Free Demo Class',
    title:    'Book Your Free Demo',
    subtitle: 'Experience our teaching style before you commit. No payment required.',
    cta:      'Book Demo Class',
  },
  placement: {
    badge:    'Placement Prep',
    title:    'Start Placement Training',
    subtitle: 'Resume building, mock interviews, and direct placement assistance.',
    cta:      'Start Placement Prep',
  },
};

function RegisterContent() {
  const searchParams = useSearchParams();
  const typeParam    = searchParams.get('type');
  const typeConfig   = TYPE_CONFIG[typeParam] || null;

  const [isLogin, setIsLogin]                 = useState(false);
  const [formData, setFormData]               = useState({ username: '', password: '' });
  const [twoFaCode, setTwoFaCode]             = useState('');
  const [pendingUsername, setPendingUsername] = useState(null);
  const [loading, setLoading]                 = useState(false);
  const [error, setError]                     = useState('');
  const [success, setSuccess]                 = useState('');

  // If a type param is present, default to register mode
  useEffect(() => {
    if (typeParam && !isLogin) setIsLogin(false);
  }, [typeParam]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess('');
    try {
      const res  = await fetch(isLogin ? '/api/auth/login' : '/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Something went wrong.'); return; }
      if (data.requires2FA) { setPendingUsername(data.username); return; }
      if (data.token) {
        localStorage.setItem('userToken', data.token);
        if (data.refreshToken) localStorage.setItem('userRefreshToken', data.refreshToken);
      }
      setSuccess(`${isLogin ? 'Login' : 'Registration'} successful! Redirecting…`);
      setTimeout(() => { window.location.href = '/'; }, 1200);
    } catch { setError('Network error. Please try again.'); }
    finally { setLoading(false); }
  };

  const handle2FA = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res  = await fetch('/api/auth/2fa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intent: 'login', username: pendingUsername, token: twoFaCode }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Invalid code.'); return; }
      if (data.token) {
        localStorage.setItem('userToken', data.token);
        if (data.refreshToken) localStorage.setItem('userRefreshToken', data.refreshToken);
      }
      setSuccess('Login successful! Redirecting…');
      setTimeout(() => { window.location.href = '/'; }, 1200);
    } catch { setError('Network error. Please try again.'); }
    finally { setLoading(false); }
  };

  /* ── 2FA step ── */
  if (pendingUsername) {
    return (
      <AuthLayout badge="Security Check" title="Two-Factor Auth" subtitle="Enter the 6-digit code from your authenticator app.">
        {error   && <div className="alert-error"   style={{ marginBottom: '20px' }}>{error}</div>}
        {success && <div className="alert-success" style={{ marginBottom: '20px' }}>{success}</div>}
        <form onSubmit={handle2FA} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label className="field-label">Authenticator Code</label>
            <input
              required type="text" inputMode="numeric" pattern="[0-9]{6}" maxLength={6}
              value={twoFaCode} onChange={e => setTwoFaCode(e.target.value.replace(/\D/g, ''))}
              placeholder="000000" className="input"
              style={{ letterSpacing: '0.4em', textAlign: 'center', fontSize: '1.5rem', fontWeight: '700' }}
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px' }} disabled={loading}>
            {loading ? 'Verifying…' : 'Verify & Login'}
          </button>
        </form>
        <button onClick={() => { setPendingUsername(null); setError(''); }}
          style={{ marginTop: '20px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.9rem', display: 'block', textAlign: 'center', width: '100%' }}>
          ← Back to login
        </button>
      </AuthLayout>
    );
  }

  /* ── Determine title/subtitle/badge ── */
  const badge    = typeConfig?.badge    || (isLogin ? 'Welcome Back'    : 'Get Started');
  const title    = typeConfig?.title    || (isLogin ? 'Sign In'         : 'Create Account');
  const subtitle = typeConfig?.subtitle || (isLogin ? 'Sign in to access your courses and dashboard.' : 'Join 500+ students building their tech careers.');
  const ctaLabel = typeConfig?.cta      || (isLogin ? 'Sign In'         : 'Create Account');

  return (
    <AuthLayout badge={badge} title={title} subtitle={subtitle}>
      {error   && <div className="alert-error"   style={{ marginBottom: '20px' }}>{error}</div>}
      {success && <div className="alert-success" style={{ marginBottom: '20px' }}>{success}</div>}

      {/* Type-specific info banner */}
      {typeConfig && !isLogin && (
        <div style={{
          background: 'var(--primary-dim)',
          border: '1px solid rgba(37,99,235,0.25)',
          borderRadius: 'var(--radius-sm)',
          padding: '12px 16px',
          marginBottom: '20px',
          fontSize: '0.85rem',
          color: '#93C5FD',
        }}>
          Create a free account to complete your {typeParam} application. Takes 30 seconds.
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div>
          <label className="field-label">Username / Email</label>
          <input required type="text" value={formData.username}
            onChange={e => setFormData({ ...formData, username: e.target.value })}
            placeholder="johndoe@email.com" className="input" />
        </div>
        <div>
          <label className="field-label">Password</label>
          <input required type="password" value={formData.password} minLength={6}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
            placeholder="••••••••" className="input" />
          {!isLogin && <p style={{ fontSize: '0.78rem', color: 'var(--text-faint)', marginTop: '6px' }}>Minimum 6 characters</p>}
        </div>
        <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: '1rem', marginTop: '4px' }} disabled={loading}>
          {loading ? (isLogin ? 'Signing in…' : 'Creating account…') : ctaLabel}
        </button>
      </form>

      <div style={{ marginTop: '24px', textAlign: 'center', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess(''); }}
            style={{ background: 'none', border: 'none', color: 'var(--primary-light)', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' }}>
            {isLogin ? 'Sign up free' : 'Sign in'}
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}

/* ── Shared auth layout wrapper ── */
function AuthLayout({ badge, title, subtitle, children }) {
  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 24px 60px' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ width: '100%', maxWidth: '460px' }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
            <div style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Playfair Display, serif', fontWeight: '700', fontSize: '1.1rem', color: '#fff' }}>S</div>
            <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: '700', fontSize: '1.3rem', color: '#F1F5F9' }}>SQTS</span>
          </Link>
        </div>

        <div className="card" style={{ padding: '36px 40px' }}>
          {badge && (
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <span className="badge badge-blue">{badge}</span>
            </div>
          )}
          <h1 style={{ fontSize: '1.6rem', textAlign: 'center', marginBottom: '8px' }}>{title}</h1>
          <p style={{ textAlign: 'center', fontSize: '0.88rem', marginBottom: '24px', lineHeight: '1.6' }}>{subtitle}</p>
          {children}
        </div>
      </motion.div>

      <style>{`
        .field-label {
          display: block;
          margin-bottom: 7px;
          font-size: 0.88rem;
          font-weight: 600;
          color: #CBD5E1;
        }
      `}</style>
    </div>
  );
}

/* ── Page export wrapped in Suspense for useSearchParams ── */
export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div style={{ paddingTop: '70px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '32px', height: '32px', border: '3px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    }>
      <RegisterContent />
    </Suspense>
  );
}
