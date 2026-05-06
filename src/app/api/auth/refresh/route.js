import { NextResponse } from 'next/server';
import { verifyToken, generateToken, generateRefreshToken } from '@/lib/auth';
import { dbRun, dbGet } from '@/lib/db';
import { getLogger } from '@/lib/logger';

const logger = getLogger('RefreshAPI');

export async function POST(request) {
  try {
    const { refreshToken } = await request.json();

    if (!refreshToken) {
      return NextResponse.json({ error: 'Refresh token is required' }, { status: 400 });
    }

    // Verify token signature and expiry
    const decoded = verifyToken(refreshToken, true);
    if (!decoded?.username) {
      return NextResponse.json({ error: 'Invalid or expired refresh token' }, { status: 401 });
    }

    // Verify the token exists in the DB and has not been revoked
    // Fail closed — if the DB is unavailable we do NOT allow the refresh
    const storedToken = await dbGet(
      'SELECT id FROM refresh_tokens WHERE token = ? AND expires_at > datetime("now")',
      [refreshToken]
    );

    if (!storedToken) {
      return NextResponse.json({ error: 'Invalid or revoked refresh token' }, { status: 401 });
    }

    // Rotate: delete old token, issue new pair
    await dbRun('DELETE FROM refresh_tokens WHERE token = ?', [refreshToken]);

    const payload = { username: decoded.username, role: decoded.role || 'user' };
    const newToken = generateToken(payload);
    const newRefreshToken = generateRefreshToken(payload);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await dbRun(
      'INSERT INTO refresh_tokens (token, username, expires_at) VALUES (?, ?, ?)',
      [newRefreshToken, decoded.username, expiresAt.toISOString()]
    );

    logger.info(`Token refreshed for user "${decoded.username}"`);

    return NextResponse.json({
      token: newToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    logger.error('Token refresh error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
