import { NextResponse } from 'next/server';
import { dbRun, dbGet } from '@/lib/db';
import { hashPassword, generateToken, generateRefreshToken } from '@/lib/auth';
import { checkRateLimit, rateLimitConfigs, getClientIp } from '@/lib/rateLimit';
import { getLogger } from '@/lib/logger';
import { sendWelcomeEmail } from '@/lib/email';

const logger = getLogger('RegisterAPI');

export async function POST(request) {
  try {
    const clientIp = getClientIp(request);

    // Apply strict rate limiting for registration
    const rateLimitResult = checkRateLimit(clientIp, rateLimitConfigs.strict);
    if (!rateLimitResult.allowed) {
      logger.warn(`Registration rate limited for IP ${clientIp}`);
      return NextResponse.json(
        { error: rateLimitResult.reason },
        { status: 429 }
      );
    }

    const { username, password } = await request.json();

    if (!username || !password || password.length < 6) {
      return NextResponse.json(
        { error: 'Valid username/email and password (min 6 characters) are required.' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await dbGet('SELECT id FROM users WHERE username = ?', [username]);
    if (existingUser) {
      return NextResponse.json(
        { error: 'Username already exists' },
        { status: 409 }
      );
    }

    // Hash password and insert user
    const hashed = await hashPassword(password);
    await dbRun(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, hashed, 'user']
    );

    // Generate initial tokens for the new user
    const payload = { username, role: 'user' };
    const token = generateToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // Calculate expiry 7 days from now
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Save refresh token to db
    try {
      await dbRun(
        'INSERT INTO refresh_tokens (token, username, expires_at) VALUES (?, ?, ?)',
        [refreshToken, username, expiresAt.toISOString()]
      );
    } catch (dbError) {
      logger.error('Failed to insert refresh token:', dbError.message);
    }

    // Send welcome email — pass username as both email and display name.
    // If username is a valid email address it will be delivered; otherwise skipped gracefully.
    sendWelcomeEmail(username, username).catch(err => {
      logger.error('Failed invoking welcome email:', err);
    });

    logger.info(`New user registered: ${username} from IP ${clientIp}`);

    const response = NextResponse.json({
      success: true,
      message: 'Registration successful',
      token,
      refreshToken,
    });

    response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString());
    response.headers.set('X-RateLimit-Reset', Math.ceil(rateLimitResult.resetTime / 1000).toString());

    return response;
  } catch (error) {
    logger.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to process registration' },
      { status: 500 }
    );
  }
}
