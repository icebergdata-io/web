// Simple in-memory rate limiter for Vercel serverless functions
// Note: For production scale, consider using Vercel Edge Config or Redis

const rateLimitStore = new Map();

/**
 * Rate limiter middleware
 * @param {number} maxRequests - Maximum requests allowed
 * @param {number} windowMs - Time window in milliseconds
 * @returns {Function} Middleware function
 */
export function createRateLimiter(maxRequests = 5, windowMs = 60000) {
  return (req, res, next) => {
    const clientId = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 
                     req.headers['x-real-ip'] || 
                     req.connection?.remoteAddress || 
                     'unknown';
    
    const now = Date.now();
    const key = `${clientId}-${req.url}`;
    
    // Clean up old entries periodically
    if (rateLimitStore.size > 1000) {
      const cutoff = now - windowMs;
      for (const [k, v] of rateLimitStore.entries()) {
        if (v.lastRequest < cutoff) {
          rateLimitStore.delete(k);
        }
      }
    }
    
    const record = rateLimitStore.get(key);
    
    if (!record) {
      // First request
      rateLimitStore.set(key, {
        count: 1,
        lastRequest: now,
        resetTime: now + windowMs
      });
      return next ? next() : true;
    }
    
    // Check if window has expired
    if (now > record.resetTime) {
      record.count = 1;
      record.lastRequest = now;
      record.resetTime = now + windowMs;
      return next ? next() : true;
    }
    
    // Check if limit exceeded
    if (record.count >= maxRequests) {
      const retryAfter = Math.ceil((record.resetTime - now) / 1000);
      res.status(429).json({
        error: 'Too many requests',
        message: `Rate limit exceeded. Please try again after ${retryAfter} seconds.`,
        retryAfter
      });
      return false;
    }
    
    // Increment count
    record.count++;
    record.lastRequest = now;
    
    return next ? next() : true;
  };
}

/**
 * Get client IP from request
 */
export function getClientIP(req) {
  return req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 
         req.headers['x-real-ip'] || 
         req.connection?.remoteAddress || 
         'unknown';
}

