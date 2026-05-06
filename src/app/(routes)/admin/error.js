'use client';

import { useEffect } from 'react';

export default function AdminError({ error, reset }) {
  useEffect(() => {
    console.error('Admin error:', error);
  }, [error]);

  return (
    <div className="container" style={{ paddingTop: '150px', minHeight: '100vh' }}>
      <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto', padding: '60px 40px', textAlign: 'center' }}>
        <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
          Admin Error
        </h1>
        
        <p style={{ color: '#a1a1aa', fontSize: '1.1rem', marginBottom: '30px' }}>
          {error?.message || 'An error occurred in the admin dashboard.'}
        </p>

        {error?.message?.includes('unauthorized') && (
          <p style={{ color: '#ec4899', marginBottom: '20px' }}>
            You need to be logged in as admin to access this area.
          </p>
        )}

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button
            onClick={() => reset()}
            className="btn-primary"
            style={{ padding: '12px 30px' }}
          >
            Retry
          </button>
          
          <a
            href="/register"
            style={{
              padding: '12px 30px',
              background: 'transparent',
              color: '#a5b4fc',
              border: '1px solid #4f46e5',
              borderRadius: '30px',
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
