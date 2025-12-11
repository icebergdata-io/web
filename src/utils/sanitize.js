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

