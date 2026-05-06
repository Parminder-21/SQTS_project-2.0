'use client';
import { useEffect } from 'react';
import Link from 'next/link';

export default function CoursesError({ error, reset }) {
  useEffect(() => { console.error('Courses page error:', error); }, [error]);

  return (
    <div style={{ paddingTop: '70px', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ textAlign: 'center', padding: '80px 24px' }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '20px' }}>⚠️</div>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '12px' }}>Something went wrong</h1>
        <p style={{ marginBottom: '32px', maxWidth: '400px', margin: '0 auto 32px' }}>
          We couldn't load the courses right now. This is usually a temporary issue.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={reset} className="btn-primary" style={{ padding: '11px 28px' }}>Try Again</button>
          <Link href="/" className="btn-outline" style={{ padding: '11px 28px' }}>Go Home</Link>
        </div>
      </div>
    </div>
  );
}
