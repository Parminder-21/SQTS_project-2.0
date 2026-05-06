import { NextResponse } from 'next/server';
import { dbGet, dbRun } from '@/lib/db';
import { verifyToken, generateToken, generateRefreshToken } from '@/lib/auth';
import { OTP } from 'otplib';

const otp = new OTP();

export async function POST(request) {
  try {
    const { token: clientToken, username, intent } = await request.json();
    
    // TWO DIFFERENT MODES: ENABLING 2FA (with Bearer token) vs LOGGING IN WITH 2FA
    if (intent === 'enable') {
      const authHeader = request.headers.get('Authorization');
      const bearer = authHeader?.replace(/^Bearer\s+/i, '');
      const decoded = verifyToken(bearer);
      
      if (!decoded || !decoded.username) {
        return NextResponse.json({ error: 'Unauthorized to enable 2FA' }, { status: 401 });
      }
      
      const user = await dbGet('SELECT * FROM users WHERE username = ?', [decoded.username]);
      if (!user || !user.two_factor_secret) {
        return NextResponse.json({ error: '2FA setup not initiated' }, { status: 400 });
      }
      
      const isValid = (await otp.verify({ token: clientToken, secret: user.two_factor_secret })).valid;
      
      if (isValid) {
        await dbRun('UPDATE users SET two_factor_enabled = 1 WHERE username = ?', [decoded.username]);
        return NextResponse.json({ success: true, message: '2FA has been successfully enabled.' });
      } else {
        return NextResponse.json({ error: 'Invalid 2FA code' }, { status: 400 });
      }
    } 
    // LOGIN INTENT
    else if (intent === 'login') {
      if (!username || !clientToken) {
        return NextResponse.json({ error: 'Username and token required' }, { status: 400 });
      }

      const user = await dbGet('SELECT * FROM users WHERE username = ?', [username]);
      if (!user || user.two_factor_enabled !== 1) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
      }

      const isValid = (await otp.verify({ token: clientToken, secret: user.two_factor_secret })).valid;
      
      if (!isValid) {
        return NextResponse.json({ error: 'Invalid 2FA token' }, { status: 401 });
      }

      // Finalize login (assuming first factor already checked or passing some pre-auth validation)
      const payload = { username: user.username, role: user.role };
      const authToken = generateToken(payload);
      const refreshToken = generateRefreshToken(payload);

      // Insert refresh token logic, similar to the main login (simplified here)
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);
      
      try {
        await dbRun(
          'INSERT INTO refresh_tokens (token, username, expires_at) VALUES (?, ?, ?)',
          [refreshToken, username, expiresAt.toISOString()]
        );
      } catch (e) {
        console.error('refresh token insert fail via 2FA:', e);
      }

      return NextResponse.json({
        success: true,
        token: authToken,
        refreshToken,
        expiresIn: '24h'
      });
    } else {
      return NextResponse.json({ error: 'Invalid intent' }, { status: 400 });
    }
  } catch (error) {
    console.error('2FA Verify error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
