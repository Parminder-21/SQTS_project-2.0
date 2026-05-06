import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { isAuthorized, unauthorizedResponse } from '@/lib/auth';
import { errorResponse, validationErrorResponse } from '@/lib/validation';
import { checkRateLimit, getClientIp, rateLimitConfigs } from '@/lib/rateLimit';
import { getLogger } from '@/lib/logger';

const logger = getLogger('EmailSendAPI');

export async function POST(request) {
  try {
    const clientIp = getClientIp(request);
    const rateLimitResult = checkRateLimit(clientIp, rateLimitConfigs.standard);

    if (!rateLimitResult.allowed) {
      logger.warn(`Email send rate limited for IP ${clientIp}`);
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const authorized = await isAuthorized(request);
    if (!authorized) {
      return unauthorizedResponse('You must be logged in as admin to send emails');
    }

    const body = await request.json();
    const { to, subject, text, html } = body || {};

    if (!to || !subject || (!text && !html)) {
      return validationErrorResponse([
        'Recipient address is required',
        'Subject is required',
        'Either text or html content is required'
      ]);
    }

    const sent = await sendEmail({ to, subject, text, html });

    if (!sent) {
      return errorResponse('Failed to send email', 500);
    }

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully'
    });
  } catch (error) {
    logger.error('Email send error:', error);
    return errorResponse('Failed to send email', 500);
  }
}
