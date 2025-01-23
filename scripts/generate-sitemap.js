import fs from 'fs';
import path from 'path';
import { slugify } from '../src/utils/slugify.js';

const BASE_URL = 'https://icebergdata.co';

async function generateSitemap() {
  console.log('🔄 Generating sitemap...');
  
  // Get all case studies
  const casesDir = path.join(process.cwd(), 'public/articles/cases');
  const caseStudies = [];
  
  // Read all case study files
  const files = fs.readdirSync(casesDir)
    .filter(file => file.endsWith('.json'))
    .sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)[0]);
      const numB = parseInt(b.match(/\d+/)[0]);
      return numA - numB;
    });

  for (const file of files) {
    const content = fs.readFileSync(path.join(casesDir, file), 'utf8');
    const data = JSON.parse(content);
    caseStudies.push({
      sector: slugify(data.Sector),
      slug: slugify(`${data.Title}-${data.Subtitle}`),
      lastmod: data.publicationDate || new Date().toISOString().split('T')[0]
    });
  }

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${BASE_URL}/case-studies</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${BASE_URL}/contact</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.8</priority>
  </url>
  ${caseStudies.map(study => `
  <url>
    <loc>${BASE_URL}/case-study/${study.sector}/${study.slug}</loc>
    <lastmod>${study.lastmod}</lastmod>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;

  // Write sitemap file
  const publicDir = path.join(process.cwd(), 'public');
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated successfully!');
}

generateSitemap().catch(console.error); 