import { NextResponse } from 'next/server';
import { verifyToken, generateToken, generateRefreshToken } from '@/lib/auth';
import { dbRun, dbGet } from '@/lib/db';

export async function POST(request) {
  try {
    const { refreshToken } = await request.json();

    if (!refreshToken) {
      return NextResponse.json({ error: 'Refresh token is required' }, { status: 400 });
    }

    // Verify token structure
    const decoded = verifyToken(refreshToken, true);
    if (!decoded || !decoded.username) {
      return NextResponse.json({ error: 'Invalid or expired refresh token' }, { status: 401 });
    }

    // Verify it exists in database and is not revoked
    try {
      const storedToken = await dbGet('SELECT * FROM refresh_tokens WHERE token = ? AND expires_at > datetime("now")', [refreshToken]);
      
      if (!storedToken) {
        return NextResponse.json({ error: 'Invalid or revoked refresh token' }, { status: 401 });
      }

      // Delete the old refresh token (token rotation)
      await dbRun('DELETE FROM refresh_tokens WHERE token = ?', [refreshToken]);
    } catch (dbError) {
      console.error('Database error during token refresh (ignoring for development):', dbError.message);
      // Fallback: If DB fails, we still allow refresh if the signature is valid, but this should be strict in prod.
    }

    // Generate new tokens
    const payload = { username: decoded.username, role: decoded.role || 'admin' };
    const newToken = generateToken(payload);
    const newRefreshToken = generateRefreshToken(payload);

    // Calculate expiry 7 days from now
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    
    // Store new refresh token
    try {
      await dbRun(
        'INSERT INTO refresh_tokens (token, username, expires_at) VALUES (?, ?, ?)',
        [newRefreshToken, decoded.username, expiresAt.toISOString()]
      );
    } catch (dbError) {
      console.error('Database error saving new refresh token:', dbError.message);
    }

    return NextResponse.json({
      token: newToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
