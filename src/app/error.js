'use client';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Error caught by boundary:', error);
  }, [error]);

  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ textAlign: 'center', padding: '80px 24px' }}>
        <div style={{
          width: '64px', height: '64px',
          background: 'rgba(239,68,68,0.12)',
          border: '1px solid rgba(239,68,68,0.25)',
          borderRadius: '16px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.8rem', margin: '0 auto 24px',
        }}>⚠️</div>

        <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', marginBottom: '12px' }}>
          Something Went Wrong
        </h1>

        <p style={{ maxWidth: '420px', margin: '0 auto 32px', fontSize: '0.95rem', lineHeight: '1.7' }}>
          {error?.message || 'An unexpected error occurred. Please try again.'}
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => reset()} className="btn-primary" style={{ padding: '11px 28px' }}>
            Try Again
          </button>
          <Link href="/" className="btn-outline" style={{ padding: '11px 28px' }}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
