/**
 * Rate Limiting Utility for Next.js
 * Implements sliding window rate limiting with in-memory storage
 * For production, use Redis for distributed rate limiting
 */

import { getLogger } from './logger';

const logger = getLogger('RateLimit');

// Store for rate limit tracking: { key: [timestamps] }
const rateLimitStore = new Map();

// Store for blocked IPs: { ip: blockUntilTime }
const blockedIps = new Map();

/**
 * Get client IP from request
 */
export function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || 
         request.headers.get('cf-connecting-ip') ||
         'unknown';
}

/**
 * Clean old timestamps from store (sliding window)
 */
function cleanOldTimestamps(key, windowMs) {
  const now = Date.now();
  const timestamps = rateLimitStore.get(key) || [];
  
  // Keep only timestamps within the window
  const filtered = timestamps.filter(ts => now - ts < windowMs);
  
  if (filtered.length > 0) {
    rateLimitStore.set(key, filtered);
  } else {
    rateLimitStore.delete(key);
  }
  
  return filtered;
}

/**
 * Check if client is rate limited
 * Returns: { allowed: boolean, remaining: number, resetTime: number }
 */
export function checkRateLimit(identifier, options = {}) {
  const {
    maxRequests = 100,
    windowMs = 60 * 1000, // 1 minute
  } = options;

  const now = Date.now();
  
  // Check if IP is blocked
  const blockUntilTime = blockedIps.get(identifier);
  if (blockUntilTime && now < blockUntilTime) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: blockUntilTime,
      reason: 'IP temporarily blocked due to rate limit violations'
    };
  }

  // Clean old timestamps
  const timestamps = cleanOldTimestamps(identifier, windowMs);
  
  // Check if limit exceeded
  if (timestamps.length >= maxRequests) {
    // Block for next window period
    blockedIps.set(identifier, now + windowMs);
    logger.warn(`Rate limit exceeded for ${identifier}`, { 
      requests: timestamps.length, 
      limit: maxRequests 
    });
    
    return {
      allowed: false,
      remaining: 0,
      resetTime: now + windowMs,
      reason: 'Rate limit exceeded'
    };
  }

  // Add current timestamp
  timestamps.push(now);
  rateLimitStore.set(identifier, timestamps);

  return {
    allowed: true,
    remaining: maxRequests - timestamps.length,
    resetTime: timestamps[0] + windowMs
  };
}

/**
 * Create rate limit middleware for API routes
 */
export function createRateLimitMiddleware(options = {}) {
  const {
    maxRequests = 100,
    windowMs = 60 * 1000,
    keyGenerator = getClientIp,
    skipSuccessfulRequests = false,
    skipFailedRequests = false,
    message = 'Too many requests, please try again later.'
  } = options;

  return function rateLimitMiddleware(request) {
    const key = typeof keyGenerator === 'function' 
      ? keyGenerator(request) 
      : keyGenerator;

    const result = checkRateLimit(key, { maxRequests, windowMs });

    if (!result.allowed) {
      const retryAfter = Math.ceil((result.resetTime - Date.now()) / 1000);
      
      return new Response(
        JSON.stringify({ 
          error: message,
          retryAfter
        }),
        {
          status: 429,
          headers: {
            'Retry-After': retryAfter.toString(),
            'Content-Type': 'application/json'
          }
        }
      );
    }

    return null; // Allow request
  };
}

/**
 * Pre-defined rate limit configurations
 */
export const rateLimitConfigs = {
  // Strict: for login/authentication attempts
  strict: {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
    message: 'Too many login attempts. Please try again later.'
  },

  // Standard: for API endpoints
  standard: {
    maxRequests: 100,
    windowMs: 60 * 1000, // 1 minute
    message: 'Rate limit exceeded. Please try again later.'
  },

  // Relaxed: for public endpoints like GET courses
  relaxed: {
    maxRequests: 500,
    windowMs: 60 * 1000, // 1 minute
    message: 'Rate limit exceeded.'
  },

  // Very relaxed: for static content
  veryRelaxed: {
    maxRequests: 1000,
    windowMs: 60 * 1000, // 1 minute
    message: 'Rate limit exceeded.'
  }
};

/**
 * Utility to format rate limit headers
 */
export function addRateLimitHeaders(response, remaining, resetTime) {
  response.headers.set('X-RateLimit-Limit', '100');
  response.headers.set('X-RateLimit-Remaining', remaining.toString());
  response.headers.set('X-RateLimit-Reset', Math.ceil(resetTime / 1000).toString());
  return response;
}

/**
 * Clear rate limit for a specific identifier (e.g., for admin override)
 */
export function clearRateLimit(identifier) {
  rateLimitStore.delete(identifier);
  blockedIps.delete(identifier);
  logger.info(`Rate limit cleared for ${identifier}`);
}

/**
 * Get rate limit status for monitoring
 */
export function getRateLimitStatus(identifier) {
  const timestamps = rateLimitStore.get(identifier) || [];
  const blockUntilTime = blockedIps.get(identifier);
  
  return {
    identifier,
    requestsInWindow: timestamps.length,
    isBlocked: blockUntilTime && Date.now() < blockUntilTime,
    blockUntilTime
  };
}

/**
 * Cleanup old entries periodically (run every 5 minutes)
 */
export function startRateLimitCleanup(interval = 5 * 60 * 1000) {
  setInterval(() => {
    const now = Date.now();
    
    // Clean expired blocks
    for (const [ip, blockTime] of blockedIps.entries()) {
      if (now > blockTime) {
        blockedIps.delete(ip);
      }
    }
    
    logger.debug('Rate limit cleanup completed', {
      activeIps: rateLimitStore.size,
      blockedIps: blockedIps.size
    });
  }, interval);
}

logger.info('Rate limiter initialized');
