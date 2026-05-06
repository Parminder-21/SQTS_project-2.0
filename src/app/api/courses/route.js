import { NextResponse } from 'next/server';
import { dbAll } from '@/lib/db';
import { validators, errorResponse } from '@/lib/validation';
import { getLogger } from '@/lib/logger';
import { checkRateLimit, getClientIp, rateLimitConfigs } from '@/lib/rateLimit';

const logger = getLogger('CoursesAPI');

export async function GET(request) {
  try {
    const clientIp = getClientIp(request);
    const rateLimitResult = checkRateLimit(clientIp, rateLimitConfigs.relaxed);
    if (!rateLimitResult.allowed) {
      logger.warn(`GET /api/courses rate limited for IP ${clientIp}`);
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    // Extract pagination params from query string
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '10';

    const { page: pageNum, limit: limitNum } = validators.validatePagination(page, limit);
    const offset = (pageNum - 1) * limitNum;

    logger.debug('Fetching courses', { page: pageNum, limit: limitNum, offset });

    // Get total count
    const countResult = await dbAll('SELECT COUNT(*) as total FROM courses');
    const total = countResult[0]?.total || 0;

    // Get paginated courses
    const courses = await dbAll(
      'SELECT * FROM courses LIMIT ? OFFSET ?',
      [limitNum, offset]
    );

    // Parse the JSON strings back to objects
    const parsedCourses = courses.map(course => {
      try {
        return {
          ...course,
          modules: course.modules ? JSON.parse(course.modules) : [],
          packages: course.packages ? JSON.parse(course.packages) : []
        };
      } catch (e) {
        logger.error(`Failed to parse course ${course.id}`, e);
        return course;
      }
    });

    logger.info(`Retrieved ${parsedCourses.length} courses`, { total, page: pageNum });

    const response = NextResponse.json({
      data: parsedCourses,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    });

    // Add caching headers
    response.headers.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=600'); // 5 min cache
    response.headers.set('Content-Type', 'application/json');

    return response;
  } catch (error) {
    logger.error('Failed to fetch courses', error);
    return errorResponse('Failed to fetch courses', 500);
  }
}
