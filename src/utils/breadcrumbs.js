/**
 * Generate BreadcrumbList structured data for SEO
 * @param {Array} items - Array of {name, url} objects
 * @returns {Object} BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

/**
 * Generate breadcrumbs for a case study page
 * @param {Object} caseData - Case study data
 * @returns {Array} Breadcrumb items
 */
export function getCaseStudyBreadcrumbs(caseData) {
  const baseUrl = 'https://www.icebergdata.co';
  return [
    { name: 'Home', url: `${baseUrl}/` },
    { name: 'Case Studies', url: `${baseUrl}/case-studies` },
    { name: caseData.Sector || 'Case Study', url: `${baseUrl}/case-studies? sector=${encodeURIComponent(caseData.Sector || '')}` },
    { name: caseData.Title || 'Case Study', url: `${baseUrl}/case-study/${caseData.sectorSlug || caseData.Sector?.toLowerCase().replace(/\s+/g, '-')}/${caseData.slug}` }
  ];
}

/**
 * Generate breadcrumbs for a service page
 * @param {string} serviceName - Name of the service
 * @param {string} path - Current path
 * @returns {Array} Breadcrumb items
 */
export function getServiceBreadcrumbs(serviceName, path) {
  const baseUrl = 'https://www.icebergdata.co';
  return [
    { name: 'Home', url: `${baseUrl}/` },
    { name: 'Services', url: `${baseUrl}/services` },
    { name: serviceName, url: `${baseUrl}${path}` }
  ];
}

