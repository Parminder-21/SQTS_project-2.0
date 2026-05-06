import { NextResponse } from 'next/server';
import { dbGet, dbRun } from '@/lib/db';
import { verifyToken, generateToken, generateRefreshToken } from '@/lib/auth';
import { TOTP } from 'otplib';

const totp = new TOTP();

export async function POST(request) {
  try {
    const { token: clientToken, username, intent } = await request.json();

    // ── MODE 1: ENABLING 2FA (requires a valid Bearer token) ──────────────────
    if (intent === 'enable') {
      const authHeader = request.headers.get('Authorization');
      const bearer = authHeader?.replace(/^Bearer\s+/i, '');
      const decoded = verifyToken(bearer);

      if (!decoded?.username) {
        return NextResponse.json({ error: 'Unauthorized to enable 2FA' }, { status: 401 });
      }

      const user = await dbGet('SELECT two_factor_secret FROM users WHERE username = ?', [decoded.username]);
      if (!user?.two_factor_secret) {
        return NextResponse.json({ error: '2FA setup not initiated' }, { status: 400 });
      }

      // totp.verify() returns a boolean
      const isValid = totp.verify({ token: clientToken, secret: user.two_factor_secret });

      if (!isValid) {
        return NextResponse.json({ error: 'Invalid 2FA code' }, { status: 400 });
      }

      await dbRun('UPDATE users SET two_factor_enabled = 1 WHERE username = ?', [decoded.username]);
      return NextResponse.json({ success: true, message: '2FA has been successfully enabled.' });
    }

    // ── MODE 2: LOGGING IN WITH 2FA ───────────────────────────────────────────
    if (intent === 'login') {
      if (!username || !clientToken) {
        return NextResponse.json({ error: 'Username and token required' }, { status: 400 });
      }

      const user = await dbGet(
        'SELECT username, role, two_factor_enabled, two_factor_secret FROM users WHERE username = ?',
        [username]
      );

      if (!user || user.two_factor_enabled !== 1) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
      }

      // totp.verify() returns a boolean
      const isValid = totp.verify({ token: clientToken, secret: user.two_factor_secret });

      if (!isValid) {
        return NextResponse.json({ error: 'Invalid 2FA token' }, { status: 401 });
      }

      const payload = { username: user.username, role: user.role };
      const authToken = generateToken(payload);
      const refreshToken = generateRefreshToken(payload);

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);

      try {
        await dbRun(
          'INSERT INTO refresh_tokens (token, username, expires_at) VALUES (?, ?, ?)',
          [refreshToken, username, expiresAt.toISOString()]
        );
      } catch (e) {
        console.error('Failed to persist refresh token via 2FA login:', e.message);
      }

      return NextResponse.json({
        success: true,
        token: authToken,
        refreshToken,
        expiresIn: '24h'
      });
    }

    return NextResponse.json({ error: 'Invalid intent. Use "enable" or "login".' }, { status: 400 });
  } catch (error) {
    console.error('2FA Verify error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
