'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Error caught by boundary:', error);
  }, [error]);

  return (
    <div className="container" style={{ paddingTop: '150px', minHeight: '100vh', textAlign: 'center' }}>
      <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto', padding: '60px 40px' }}>
        <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
          Oops! Something went wrong
        </h1>
        
        <p style={{ color: '#a1a1aa', fontSize: '1.1rem', marginBottom: '30px', lineHeight: '1.6' }}>
          {error?.message || 'An unexpected error occurred. Please try again.'}
        </p>

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => reset()}
            className="btn-primary"
            style={{ padding: '12px 30px' }}
          >
            Try Again
          </button>
          
          <Link
            href="/"
            style={{
              padding: '12px 30px',
              background: 'transparent',
              color: '#a5b4fc',
              border: '1px solid #4f46e5',
              borderRadius: '30px',
              textDecoration: 'none',
              display: 'inline-block',
              cursor: 'pointer'
            }}
          >
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
