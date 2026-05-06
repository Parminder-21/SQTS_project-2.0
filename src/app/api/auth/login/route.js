import { NextResponse } from 'next/server';
import { generateToken, generateRefreshToken, verifyAdminCredentials } from '@/lib/auth';
import { validators, validationErrorResponse } from '@/lib/validation';
import { checkRateLimit, getClientIp, rateLimitConfigs } from '@/lib/rateLimit';
import { getLogger } from '@/lib/logger';
import { dbRun, dbGet } from '@/lib/db';

const logger = getLogger('LoginAPI');

export async function POST(request) {
  try {
    const clientIp = getClientIp(request);

    // Rate limiting: strict (5 attempts per 15 minutes)
    const rateLimitResult = checkRateLimit(clientIp, rateLimitConfigs.strict);
    if (!rateLimitResult.allowed) {
      logger.warn(`Login rate limited for IP ${clientIp}`);
      const response = NextResponse.json(
        { error: rateLimitResult.reason },
        { status: 429 }
      );
      response.headers.set(
        'Retry-After',
        Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString()
      );
      return response;
    }

    const body = await request.json();

    // Validate input
    const validation = validators.validateLoginCredentials(body);
    if (!validation.isValid) {
      logger.warn(`Login validation failed for IP ${clientIp}`, { errors: validation.errors });
      return validationErrorResponse(validation.errors);
    }

    const { username, password } = body;

    // Verify credentials against the database
    const isValid = await verifyAdminCredentials(username, password);

    if (!isValid) {
      logger.warn(`Failed login attempt for username "${username}" from IP ${clientIp}`);
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Check 2FA requirement
    const userObj = await dbGet('SELECT two_factor_enabled FROM users WHERE username = ?', [username]);
    if (userObj && userObj.two_factor_enabled === 1) {
      logger.info(`2FA required for user "${username}" from IP ${clientIp}`);
      return NextResponse.json({
        requires2FA: true,
        username,
        message: 'Proceed to 2FA verification.'
      });
    }

    // Generate tokens — let JWT handle iat automatically
    const tokenPayload = { username, role: 'admin' };
    const token = generateToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    // Calculate expiry 7 days from now
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Persist refresh token (table created by migration script)
    try {
      await dbRun(
        'INSERT INTO refresh_tokens (token, username, expires_at) VALUES (?, ?, ?)',
        [refreshToken, username, expiresAt.toISOString()]
      );
    } catch (dbError) {
      logger.error('Failed to persist refresh token:', dbError.message);
    }

    logger.info(`Successful login for user "${username}" from IP ${clientIp}`);

    const response = NextResponse.json({
      success: true,
      token,
      refreshToken,
      expiresIn: '24h'
    });

    response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString());
    response.headers.set(
      'X-RateLimit-Reset',
      Math.ceil(rateLimitResult.resetTime / 1000).toString()
    );

    return response;
  } catch (error) {
    logger.error('Login error:', error);
    return NextResponse.json(
      { error: 'Failed to process login' },
      { status: 500 }
    );
  }
}
