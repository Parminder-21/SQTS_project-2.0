import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET environment variable is not set.');
  return secret;
}

function getJwtRefreshSecret() {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) throw new Error('JWT_REFRESH_SECRET environment variable is not set.');
  return secret;
}

/**
 * Verify JWT token
 */
export function verifyToken(token, isRefresh = false) {
  try {
    if (!token) return null;

    // Remove Bearer prefix if present
    const cleanToken = token.replace(/^Bearer\s+/i, '');
    const secret = isRefresh ? getJwtRefreshSecret() : getJwtSecret();
    return jwt.verify(cleanToken, secret);
  } catch (error) {
    // Only log unexpected errors, not normal expiry/invalid signature
    if (!['JsonWebTokenError', 'TokenExpiredError', 'NotBeforeError'].includes(error.name)) {
      console.error('Token verification failed:', error.message);
    }
    return null;
  }
}

/**
 * Generate JWT access token (24h)
 */
export function generateToken(payload) {
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: '24h',
    algorithm: 'HS256'
  });
}

/**
 * Generate JWT refresh token (7d)
 */
export function generateRefreshToken(payload) {
  return jwt.sign(payload, getJwtRefreshSecret(), {
    expiresIn: '7d',
    algorithm: 'HS256'
  });
}

/**
 * Hash password
 */
export async function hashPassword(password) {
  return await bcryptjs.hash(password, 12);
}

/**
 * Compare password with hash
 */
export async function comparePassword(password, hash) {
  return await bcryptjs.compare(password, hash);
}

/**
 * Verify admin credentials against the database
 */
export async function verifyAdminCredentials(username, password) {
  // Dynamically import to avoid circular deps at module load time
  const { dbGet } = await import('./db.js');

  const user = await dbGet(
    'SELECT password, role FROM users WHERE username = ? AND role = ?',
    [username, 'admin']
  );

  if (!user) return false;

  try {
    return await comparePassword(password, user.password);
  } catch (error) {
    console.error('Password comparison failed:', error);
    return false;
  }
}

/**
 * Extract token from request Authorization header
 */
export function getTokenFromRequest(request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) return null;
  return authHeader.replace(/^Bearer\s+/i, '');
}

/**
 * Check if request carries a valid admin token
 */
export async function isAuthorized(request) {
  const token = getTokenFromRequest(request);
  const decoded = verifyToken(token);
  return decoded && decoded.role === 'admin';
}

/**
 * Create a 401 Unauthorized JSON response
 */
export function unauthorizedResponse(message = 'Unauthorized') {
  return new Response(
    JSON.stringify({ error: message }),
    {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}
