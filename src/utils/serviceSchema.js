/**
 * Generate Service structured data for SEO
 * @param {Object} serviceData - Service information
 * @returns {Object} Service schema
 */
export function generateServiceSchema(serviceData) {
  const baseUrl = 'https://www.icebergdata.co';
  const {
    name,
    description,
    serviceType,
    url,
    provider = {
      name: 'Iceberg Data',
      url: baseUrl,
      logo: `${baseUrl}/logos/logo-large.png`
    },
    areaServed = 'Worldwide',
    offers = {
      price: 'Custom',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    },
    aggregateRating
  } = serviceData;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      "name": provider.name,
      "url": provider.url,
      "logo": {
        "@type": "ImageObject",
        "url": provider.logo,
        "width": 1200,
        "height": 1200
      }
    },
    "serviceType": serviceType || "Web Scraping & Data Collection",
    "areaServed": {
      "@type": "Country",
      "name": areaServed
    },
    "offers": {
      "@type": "Offer",
      "price": offers.price,
      "priceCurrency": offers.priceCurrency,
      "availability": offers.availability,
      "url": url
    },
    "url": url
  };

  // Add aggregate rating if provided
  if (aggregateRating) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": aggregateRating.ratingValue || "4.9",
      "reviewCount": aggregateRating.reviewCount || "100+",
      "bestRating": "5",
      "worstRating": "1"
    };
  }

  return schema;
}

/**
 * Generate BreadcrumbList for service pages
 * @param {string} serviceName - Name of the service
 * @param {string} servicePath - Path to the service page
 * @returns {Object} BreadcrumbList schema
 */
export function generateServiceBreadcrumbSchema(serviceName, servicePath) {
  const baseUrl = 'https://www.icebergdata.co';
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${baseUrl}/`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": `${baseUrl}/services`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": serviceName,
        "item": `${baseUrl}${servicePath}`
      }
    ]
  };
}

