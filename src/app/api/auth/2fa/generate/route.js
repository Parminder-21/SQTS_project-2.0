import { NextResponse } from 'next/server';
import { dbGet, dbRun } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { OTP } from 'otplib';
import QRCode from 'qrcode';

const otp = new OTP();

export async function POST(request) {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace(/^Bearer\s+/i, '');
    
    if (!token) {
      return NextResponse.json({ error: 'Authorization required' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded || !decoded.username) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const username = decoded.username;
    
    const user = await dbGet('SELECT * FROM users WHERE username = ?', [username]);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Generate a secure secret
    const secret = otp.generateSecret(20);

    const otpauthUrl = otp.generateURI({
      issuer: 'SQTS',
      label: username,
      secret
    });
    
    // Generate QR code data URL
    const qrCodeUrl = await QRCode.toDataURL(otpauthUrl);
    
    // Store the secret temporarily (or directly on user for setup phase)
    await dbRun('UPDATE users SET two_factor_secret = ? WHERE username = ?', [secret, username]);

    return NextResponse.json({
      secret,
      qrCodeUrl,
      message: 'Scan the QR code to set up 2FA, then verify to enable it.'
    });

  } catch (error) {
    console.error('2FA Generate error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
