const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://www.icebergdata.co';

// Generate robots.txt
const robotsTxt = `User-agent: *
Allow: /
Sitemap: ${DOMAIN}/sitemap.xml

# Optimize crawling rate
Crawl-delay: 1`;

// Generate sitemap.xml
const pages = [
  '',  // homepage
  '/dm', // calendly redirect
];

const generateSitemap = () => {
  const today = new Date().toISOString();
  
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
  <url>
    <loc>${DOMAIN}${page}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`;

  return sitemapXml;
};

// Ensure public directory exists
const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Write robots.txt
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);
console.log('✅ Generated robots.txt');

// Write sitemap.xml
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), generateSitemap());
console.log('✅ Generated sitemap.xml'); 