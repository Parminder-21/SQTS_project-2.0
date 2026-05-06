import { NextResponse } from 'next/server';
import { dbAll } from '@/lib/db';
import { validators, errorResponse } from '@/lib/validation';
import { checkRateLimit, getClientIp, rateLimitConfigs } from '@/lib/rateLimit';
import { getLogger } from '@/lib/logger';

const logger = getLogger('CoursesSearchAPI');

function parseJsonArray(value) {
  if (!value) return [];

  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
}

export async function GET(request) {
  try {
    const clientIp = getClientIp(request);
    const rateLimitResult = checkRateLimit(clientIp, rateLimitConfigs.relaxed);

    if (!rateLimitResult.allowed) {
      logger.warn(`GET /api/courses/search rate limited for IP ${clientIp}`);
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || 'All';
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '10';

    const { page: pageNum, limit: limitNum } = validators.validatePagination(page, limit);
    const normalizedQuery = query.trim();
    const normalizedCategory = category.trim();
    const offset = (pageNum - 1) * limitNum;

    const whereParts = [];
    const queryArgs = [];

    if (normalizedQuery) {
      whereParts.push('(title LIKE ? OR description LIKE ? OR category LIKE ?)');
      const searchValue = `%${normalizedQuery}%`;
      queryArgs.push(searchValue, searchValue, searchValue);
    }

    if (normalizedCategory && normalizedCategory !== 'All') {
      whereParts.push('category = ?');
      queryArgs.push(normalizedCategory);
    }

    const whereClause = whereParts.length > 0 ? `WHERE ${whereParts.join(' AND ')}` : '';

    const [countRows, rawCourses] = await Promise.all([
      dbAll(`SELECT COUNT(*) as total FROM courses ${whereClause}`, queryArgs),
      dbAll(`SELECT * FROM courses ${whereClause} ORDER BY title ASC LIMIT ? OFFSET ?`, [...queryArgs, limitNum, offset])
    ]);

    const total = countRows[0]?.total || 0;
    const courses = rawCourses.map((course) => ({
      ...course,
      modules: parseJsonArray(course.modules),
      packages: parseJsonArray(course.packages)
    }));

    const response = NextResponse.json({
      data: courses,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.max(1, Math.ceil(total / limitNum))
      },
      filters: {
        q: normalizedQuery,
        category: normalizedCategory
      }
    });

    response.headers.set('Cache-Control', 'public, max-age=120, stale-while-revalidate=300');
    return response;
  } catch (error) {
    logger.error('Failed to search courses', error);
    return errorResponse('Failed to search courses', 500);
  }
}
