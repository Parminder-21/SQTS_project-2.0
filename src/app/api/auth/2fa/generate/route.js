import { NextResponse } from 'next/server';
import { dbGet, dbRun } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { TOTP, generateSecret } from 'otplib';
import QRCode from 'qrcode';

const totp = new TOTP();

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

    const { username } = decoded;

    const user = await dbGet('SELECT id FROM users WHERE username = ?', [username]);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Generate a cryptographically secure TOTP secret
    const secret = generateSecret(20);

    const otpauthUrl = totp.keyuri(username, 'SQTS', secret);

    // Generate QR code as a data URL
    const qrCodeUrl = await QRCode.toDataURL(otpauthUrl);

    // Store the secret — 2FA is not yet enabled until the user verifies
    await dbRun(
      'UPDATE users SET two_factor_secret = ?, two_factor_enabled = 0 WHERE username = ?',
      [secret, username]
    );

    return NextResponse.json({
      secret,
      qrCodeUrl,
      message: 'Scan the QR code with your authenticator app, then verify to enable 2FA.'
    });
  } catch (error) {
    console.error('2FA Generate error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
