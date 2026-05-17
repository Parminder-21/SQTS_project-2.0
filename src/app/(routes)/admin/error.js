'use client';
import { useEffect } from 'react';
import Link from 'next/link';

export default function AdminError({ error, reset }) {
  useEffect(() => {
    console.error('Admin error:', error);
  }, [error]);

  const isUnauthorized = error?.message?.toLowerCase().includes('unauthorized') ||
                         error?.message?.toLowerCase().includes('auth');

  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ textAlign: 'center', padding: '80px 24px' }}>
        <div style={{
          width: '64px', height: '64px',
          background: isUnauthorized ? 'rgba(245,158,11,0.12)' : 'rgba(239,68,68,0.12)',
          border: `1px solid ${isUnauthorized ? 'rgba(245,158,11,0.25)' : 'rgba(239,68,68,0.25)'}`,
          borderRadius: '16px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.8rem', margin: '0 auto 24px',
        }}>
          {isUnauthorized ? '🔐' : '⚠️'}
        </div>

        <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', marginBottom: '12px' }}>
          {isUnauthorized ? 'Access Denied' : 'Admin Error'}
        </h1>

        <p style={{ maxWidth: '400px', margin: '0 auto 32px', fontSize: '0.95rem', lineHeight: '1.7' }}>
          {isUnauthorized
            ? 'You need to be logged in as an administrator to access this area.'
            : (error?.message || 'An error occurred in the admin dashboard.')}
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {isUnauthorized ? (
            <Link href="/admin" className="btn-primary" style={{ padding: '11px 28px' }}>
              Go to Login
            </Link>
          ) : (
            <button onClick={() => reset()} className="btn-primary" style={{ padding: '11px 28px' }}>
              Retry
            </button>
          )}
          <Link href="/" className="btn-outline" style={{ padding: '11px 28px' }}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
