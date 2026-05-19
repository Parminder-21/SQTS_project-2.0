import { NextResponse } from 'next/server';
import { dbAll } from '@/lib/db';
import { verifyToken, getTokenFromRequest } from '@/lib/auth';
import { getLogger } from '@/lib/logger';
import { checkRateLimit, getClientIp, rateLimitConfigs } from '@/lib/rateLimit';

const logger = getLogger('StudentEnquiriesAPI');

export async function GET(request) {
  try {
    const clientIp = getClientIp(request);
    const rateLimitResult = checkRateLimit(clientIp, rateLimitConfigs.relaxed);
    if (!rateLimitResult.allowed) {
      logger.warn(`GET /api/student/enquiries rate limited for IP ${clientIp}`);
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: Missing token' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded || !decoded.username) {
      return NextResponse.json({ error: 'Unauthorized: Invalid or expired token' }, { status: 401 });
    }

    const username = decoded.username.toLowerCase();
    logger.info(`Fetching enquiries for student: ${username}`);

    // Query both enquiries matching username as email
    const enquiries = await dbAll(
      'SELECT id, name, phone, email, course, class_college as classCollege, city, message, source, submitted_at as submittedAt FROM enquiries WHERE LOWER(email) = ? OR LOWER(name) = ? ORDER BY id DESC',
      [username, username]
    );

    return NextResponse.json({
      success: true,
      data: enquiries
    });
  } catch (error) {
    logger.error('Failed to fetch student enquiries', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
