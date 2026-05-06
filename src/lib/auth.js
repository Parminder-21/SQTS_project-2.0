import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'; // Should be hashed in production

/**
 * Verify JWT token
 */
export function verifyToken(token, isRefresh = false) {
  try {
    if (!token) return null;
    
    // Remove Bearer prefix if present
    const cleanToken = token.replace(/^Bearer\s+/i, '');
    const secret = isRefresh ? (process.env.JWT_REFRESH_SECRET || JWT_SECRET + '_refresh') : JWT_SECRET;
    return jwt.verify(cleanToken, secret);
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return null;
  }
}

/**
 * Generate JWT token
 */
export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '24h',
    algorithm: 'HS256'
  });
}

/**
 * Generate Refresh token
 */
export function generateRefreshToken(payload) {
  const secret = process.env.JWT_REFRESH_SECRET || JWT_SECRET + '_refresh';
  return jwt.sign(payload, secret, {
    expiresIn: '7d',
    algorithm: 'HS256'
  });
}

/**
 * Hash password
 */
export async function hashPassword(password) {
  return await bcryptjs.hash(password, 10);
}

/**
 * Compare password with hash
 */
export async function comparePassword(password, hash) {
  return await bcryptjs.compare(password, hash);
}

/**
 * Verify admin credentials
 */
export async function verifyAdminCredentials(username, password) {
  // In production, fetch from database with hashed password
  // For now, simple verification
  if (username !== 'admin') return false;
  
  const hashedAdminPassword = process.env.ADMIN_PASSWORD_HASH || 
    '$2a$10$YjcBNzr4d8D8xvXS8bKVOuHhYi5QbYOyqq4yE5OW8gW5N4kzE4v4m'; // bcrypt hash of 'admin123'
  
  try {
    return await comparePassword(password, hashedAdminPassword);
  } catch (error) {
    console.error('Password comparison failed:', error);
    return false;
  }
}

/**
 * Extract token from request headers
 */
export function getTokenFromRequest(request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) return null;
  
  return authHeader.replace(/^Bearer\s+/i, '');
}

/**
 * Check if request is authorized (has valid admin token)
 */
export async function isAuthorized(request) {
  const token = getTokenFromRequest(request);
  const decoded = verifyToken(token);
  
  return decoded && decoded.role === 'admin';
}

/**
 * Create unauthorized response
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
