import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

/**
 * Middleware to protect admin routes
 */
export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protected routes
  const protectedRoutes = ['/admin', '/api/courses'];

  // Check if current path is protected
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

  if (!isProtected) {
    return NextResponse.next();
  }

  // Skip auth check for GET /api/courses (public endpoint)
  if (pathname === '/api/courses' && request.method === 'GET') {
    return NextResponse.next();
  }

  // Get token from headers
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.replace(/^Bearer\s+/i, '');

  if (!token) {
    // For API routes, return JSON error
    if (pathname.startsWith('/api')) {
      return NextResponse.json(
        { error: 'Authorization required' },
        { status: 401 }
      );
    }
    
    // For pages, redirect to login
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

  // Token is valid, proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protect admin routes
    '/admin/:path*',
    // Protect courses API routes; GET /api/courses is allowed in middleware above
    '/api/courses',
    '/api/courses/:path*'
  ]
};
