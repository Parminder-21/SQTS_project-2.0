import { NextResponse } from 'next/server';
import { dbGet, dbRun } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function POST(request) {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace(/^Bearer\s+/i, '');

    if (!token) {
      return NextResponse.json({ error: 'Authorization required' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded?.username) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const user = await dbGet('SELECT * FROM users WHERE username = ?', [decoded.username]);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    await dbRun(
      'UPDATE users SET two_factor_enabled = 0, two_factor_secret = NULL WHERE username = ?',
      [decoded.username]
    );

    return NextResponse.json({
      success: true,
      message: '2FA has been disabled.'
    });
  } catch (error) {
    console.error('2FA disable error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
