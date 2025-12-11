/**
 * Escapes HTML entities to prevent XSS and email injection attacks
 * @param {string} str - The string to escape
 * @returns {string} - Escaped string safe for HTML/email
 */
export function escapeHtml(str) {
  if (typeof str !== 'string') {
    return '';
  }
  
  const htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  };
  
  return str.replace(/[&<>"'/]/g, (match) => htmlEscapes[match]);
}

