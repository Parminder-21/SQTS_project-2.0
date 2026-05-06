import { NextResponse } from 'next/server';
import { dbRun, dbGet } from '@/lib/db';
import { isAuthorized, unauthorizedResponse } from '@/lib/auth';
import { validators, validationErrorResponse, errorResponse } from '@/lib/validation';
import { checkRateLimit, getClientIp, rateLimitConfigs } from '@/lib/rateLimit';
import { getLogger } from '@/lib/logger';

const logger = getLogger('CoursesModifyAPI');

export async function PUT(request, { params }) {
  try {
    const clientIp = getClientIp(request);
    const rateLimitResult = checkRateLimit(clientIp, rateLimitConfigs.standard);
    if (!rateLimitResult.allowed) {
      logger.warn(`PUT rate limited for ${clientIp}`);
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    // Check authorization
    const authorized = await isAuthorized(request);
    if (!authorized) {
      return unauthorizedResponse('You must be logged in as admin to update courses');
    }

    const { id } = params;

    // Validate ID
    if (!validators.validateId(id)) {
      return errorResponse('Invalid course ID', 400);
    }

    // Validate request body
    const body = await request.json();
    const validation = validators.validateCourseUpdate(body);
    if (!validation.isValid) {
      return validationErrorResponse(validation.errors);
    }

    // Check if course exists
    const course = await dbGet('SELECT id FROM courses WHERE id = ?', [id]);
    if (!course) {
      return errorResponse('Course not found', 404);
    }

    // Update course
    await dbRun(
      'UPDATE courses SET title = ?, description = ?, category = ? WHERE id = ?',
      [body.title.trim(), body.description.trim(), body.category.trim(), id]
    );

    return NextResponse.json({ 
      success: true,
      message: 'Course updated successfully' 
    });
  } catch (error) {
    logger.error('Update course error:', error);
    return errorResponse('Failed to update course', 500);
  }
}

export async function DELETE(request, { params }) {
  try {
    const clientIp = getClientIp(request);
    const rateLimitResult = checkRateLimit(clientIp, rateLimitConfigs.standard);
    if (!rateLimitResult.allowed) {
      logger.warn(`DELETE rate limited for ${clientIp}`);
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    // Check authorization
    const authorized = await isAuthorized(request);
    if (!authorized) {
      return unauthorizedResponse('You must be logged in as admin to delete courses');
    }

    const { id } = params;

    // Validate ID
    if (!validators.validateId(id)) {
      return errorResponse('Invalid course ID', 400);
    }

    // Check if course exists
    const course = await dbGet('SELECT id FROM courses WHERE id = ?', [id]);
    if (!course) {
      return errorResponse('Course not found', 404);
    }

    // Delete course
    await dbRun('DELETE FROM courses WHERE id = ?', [id]);

    return NextResponse.json({ 
      success: true,
      message: 'Course deleted successfully' 
    });
  } catch (error) {
    console.error('Delete course error:', error);
    return errorResponse('Failed to delete course', 500);
  }
}
