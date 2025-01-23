import fs from 'fs';
import path from 'path';
import { slugify } from '../src/utils/slugify.js';

const generateSitemap = async () => {
  const baseUrl = 'https://icebergdata.co';
  const casesDir = path.join(process.cwd(), 'public/articles/cases');
  
  // Start XML content
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/press</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/case-studies</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;

  // Read all case study files
  const files = fs.readdirSync(casesDir);
  const caseStudies = [];
  
  // First collect all case studies with their dates
  for (const file of files) {
    if (file.endsWith('.json')) {
      const content = fs.readFileSync(path.join(casesDir, file), 'utf8');
      const caseStudy = JSON.parse(content);
      const slug = slugify(`${caseStudy.Title}-${caseStudy.Subtitle}`);
      caseStudies.push({
        slug,
        publicationDate: caseStudy.publicationDate
      });
    }
  }

  // Sort case studies by publication date (newest first)
  caseStudies.sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate));
  
  // Add sorted case studies to sitemap
  for (const study of caseStudies) {
    sitemap += `
  <url>
    <loc>${baseUrl}/case-study/${study.slug}</loc>
    <lastmod>${study.publicationDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }

  // Close XML
  sitemap += '\n</urlset>';

  // Write sitemap
  fs.writeFileSync(path.join(process.cwd(), 'public/sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully!');
};

generateSitemap().catch(console.error); 