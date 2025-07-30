import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { slugify } from '../src/utils/slugify.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://www.icebergdata.co'; // Production URL with www
const casesDir = path.join(__dirname, '../public/articles/cases');

// Define service pages
const servicePages = [
  {
    url: '/services',
    priority: '0.9'
  },
  {
    url: '/services/web-scraping',
    priority: '0.8'
  },
  {
    url: '/services/data-integration',
    priority: '0.8'
  },
  {
    url: '/services/custom-solutions',
    priority: '0.8'
  }
];

async function generateCaseStudyIndex() {
  console.log('📚 Generating case study index...');
  
  try {
    const files = fs.readdirSync(casesDir)
      .filter(file => file.endsWith('.json'))
      .sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)[0]);
        const numB = parseInt(b.match(/\d+/)[0]);
        return numA - numB;
      });

    const caseStudies = [];

    // Process each case study
    for (const file of files) {
      const content = fs.readFileSync(path.join(casesDir, file), 'utf8');
      const caseData = JSON.parse(content);
      const sectorSlug = slugify(caseData.Sector);
      const titleSlug = slugify(`${caseData.Title}-${caseData.Subtitle}`);
      const id = parseInt(file.match(/\d+/)[0]);
      
      caseStudies.push({
        id,
        sector: sectorSlug,
        slug: titleSlug,
        title: caseData.Title,
        subtitle: caseData.Subtitle,
        sectorName: caseData.Sector,
        publicationDate: caseData.publicationDate
      });
    }

    // Sort by publication date (newest first)
    caseStudies.sort((a, b) => {
      if (!a.publicationDate && !b.publicationDate) return 0;
      if (!a.publicationDate) return 1;
      if (!b.publicationDate) return -1;
      return new Date(b.publicationDate) - new Date(a.publicationDate);
    });

    // Write index file
    const indexPath = path.join(casesDir, 'index.json');
    fs.writeFileSync(indexPath, JSON.stringify({
      total: caseStudies.length,
      caseStudies
    }, null, 2));

    console.log(`✅ Generated case study index with ${caseStudies.length} case studies`);
    return caseStudies;
  } catch (error) {
    console.error('❌ Error generating case study index:', error);
    return [];
  }
}

async function generateSitemap() {
  console.log('🔄 Generating sitemap...');
  
  // Generate case study index first
  const caseStudies = await generateCaseStudyIndex();
  
  // Sort case studies by publication date (newest first)
  const sortedCaseStudies = caseStudies.sort((a, b) => {
    if (!a.publicationDate && !b.publicationDate) return 0;
    if (!a.publicationDate) return 1;
    if (!b.publicationDate) return -1;
    return new Date(b.publicationDate) - new Date(a.publicationDate);
  });

  const today = new Date().toISOString().split('T')[0];

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${BASE_URL}/press</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  ${servicePages.map(page => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
  <url>
    <loc>${BASE_URL}/case-studies</loc>
    <lastmod>${sortedCaseStudies.length > 0 ? sortedCaseStudies[0].publicationDate : today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  ${sortedCaseStudies.map(study => `  <url>
    <loc>${BASE_URL}/case-study/${study.sector}/${study.slug}</loc>
    <lastmod>${study.publicationDate || today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

  // Write sitemap to file
  fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated successfully!');
}

generateSitemap().catch(console.error); 