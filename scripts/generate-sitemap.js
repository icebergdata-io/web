import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { slugify } from '../src/utils/slugify.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://www.icebergdata.co'; // Production URL with www
const casesDir = path.join(__dirname, '../public/articles/cases');

// Static pages
const staticPages = [
  '',  // homepage
  '/services',
  '/services/web-scraping',
  '/services/data-integration',
  '/services/custom-solutions',
  '/case-studies',
  '/press',
  '/dm', // calendly redirect
];

async function generateSitemap() {
  const today = new Date().toISOString();
  
  // Get case studies
  const cases = fs.readdirSync(casesDir)
    .filter(file => file.endsWith('.json'))
    .map(file => {
      const caseData = JSON.parse(fs.readFileSync(path.join(casesDir, file), 'utf8'));
      return `/case-study/${slugify(caseData.sector)}/${slugify(caseData.title)}`;
    });

  // Combine all URLs
  const urls = [...staticPages, ...cases];

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(url => `
  <url>
    <loc>${BASE_URL}${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${url === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${url === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`;

  // Write sitemap to file
  fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated successfully!');
}

generateSitemap().catch(console.error); 