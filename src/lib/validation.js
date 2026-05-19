/**
 * Validation utilities for API requests
 */

export const validators = {
  /**
   * Validate course update data
   */
  validateCourseUpdate(data) {
    const errors = [];

    if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
      errors.push('Title is required and must be a non-empty string');
    } else if (data.title.length > 200) {
      errors.push('Title must be less than 200 characters');
    }

    if (!data.description || typeof data.description !== 'string' || data.description.trim().length === 0) {
      errors.push('Description is required and must be a non-empty string');
    } else if (data.description.length > 2000) {
      errors.push('Description must be less than 2000 characters');
    }

    if (!data.category || typeof data.category !== 'string' || data.category.trim().length === 0) {
      errors.push('Category is required and must be a non-empty string');
    } else if (data.category.length > 100) {
      errors.push('Category must be less than 100 characters');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  /**
   * Validate login credentials
   */
  validateLoginCredentials(data) {
    const errors = [];

    if (!data.username || typeof data.username !== 'string') {
      errors.push('Username is required');
    }

    if (!data.password || typeof data.password !== 'string') {
      errors.push('Password is required');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  /**
   * Sanitize string input
   */
  sanitizeString(str) {
    if (typeof str !== 'string') return '';
    return str.trim().replace(/[<>]/g, '');
  },

  /**
   * Validate course ID — accepts numeric IDs or slug strings (e.g. 'python', 'mern-stack')
   */
  validateId(id) {
    if (!id || typeof id !== 'string') return false;
    // Accept numeric IDs (legacy) or slug strings (letters, numbers, hyphens)
    return /^[a-z0-9][a-z0-9-]*[a-z0-9]$|^[a-z0-9]$/.test(id) || (!isNaN(parseInt(id, 10)) && parseInt(id, 10) > 0);
  },

  /**
   * Validate pagination parameters
   */
  validatePagination(page, limit) {
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;

    return {
      page: Math.max(1, pageNum),
      limit: Math.min(100, Math.max(1, limitNum))
    };
  }
};

/**
 * Create validation error response
 */
export function validationErrorResponse(errors) {
  return new Response(
    JSON.stringify({ 
      error: 'Validation failed',
      details: errors 
    }),
    { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}

/**
 * Create success response
 */
export function successResponse(data, status = 200) {
  return new Response(
    JSON.stringify(data),
    { 
      status,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}

/**
 * Create error response
 */
export function errorResponse(message, status = 500) {
  return new Response(
    JSON.stringify({ error: message }),
    { 
      status,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}
