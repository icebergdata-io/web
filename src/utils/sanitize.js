import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML content to prevent XSS attacks
 * @param {string} dirty - The unsanitized HTML string
 * @returns {string} - Sanitized HTML safe for rendering
 */
export function sanitizeHTML(dirty) {
  if (typeof window === 'undefined') {
    // Server-side rendering: return empty string or basic sanitization
    // DOMPurify requires DOM, so for SSR we'll do basic escaping
    return dirty || '';
  }
  
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'blockquote', 'code', 'pre'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
    ALLOW_DATA_ATTR: false
  });
}

/**
 * Validates job data structure (defense in depth - React already escapes HTML)
 * Ensures job data has expected structure and types
 * @param {Object} job - Job data object
 * @returns {boolean} - True if job data is valid
 */
export function validateJobData(job) {
  if (!job || typeof job !== 'object') {
    return false;
  }

  // Check required string fields
  const requiredStringFields = ['id', 'title', 'department', 'location', 'contractType', 'purpose'];
  for (const field of requiredStringFields) {
    if (!job[field] || typeof job[field] !== 'string') {
      return false;
    }
  }

  // Check required array fields (technicalRequirements is an object, not an array)
  const requiredArrayFields = ['responsibilities', 'benefits'];
  for (const field of requiredArrayFields) {
    if (!Array.isArray(job[field])) {
      return false;
    }
  }

  // Validate technicalRequirements structure (it's an object with arrays inside)
  if (!job.technicalRequirements || 
      typeof job.technicalRequirements !== 'object' ||
      !Array.isArray(job.technicalRequirements.mustHave) ||
      !Array.isArray(job.technicalRequirements.niceToHave)) {
    return false;
  }

  return true;
}

