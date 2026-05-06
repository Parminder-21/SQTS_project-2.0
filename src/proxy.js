import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

/**
 * Proxy (formerly middleware) to protect admin routes and course mutation APIs.
 * Renamed from middleware.js → proxy.js per Next.js 16 convention.
 */
export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Protected route prefixes
  const protectedRoutes = ['/admin', '/api/courses'];

  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

  if (!isProtected) {
    return NextResponse.next();
  }

  // GET /api/courses and GET /api/courses/search are public
  if (
    pathname.startsWith('/api/courses') &&
    request.method === 'GET'
  ) {
    return NextResponse.next();
  }

  // Extract Bearer token
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.replace(/^Bearer\s+/i, '');

  if (!token) {
    if (pathname.startsWith('/api')) {
      return NextResponse.json(
        { error: 'Authorization required' },
        { status: 401 }
      );
    }
    return NextResponse.redirect(new URL('/register', request.url));
  }

  // Verify token
  const decoded = verifyToken(token);

  if (!decoded || decoded.role !== 'admin') {
    if (pathname.startsWith('/api')) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }
    return NextResponse.redirect(new URL('/register', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/courses',
    '/api/courses/:path*',
  ],
};
