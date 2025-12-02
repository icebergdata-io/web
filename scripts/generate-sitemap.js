import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { slugify } from '../src/utils/slugify.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://www.icebergdata.co'; // Production URL with www
const casesDir = path.join(__dirname, '../public/articles/cases');

/**
 * Escapes XML entities in a string
 * @param {string} str - String to escape
 * @returns {string} - XML-escaped string
 */
function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Maximum URL length (characters)
const MAX_URL_LENGTH = 80;

/**
 * Shortens a title to create a more manageable URL slug
 * @param {string} title - The original title
 * @param {string} sector - The sector name
 * @returns {string} - Shortened slug
 */
function createShortSlug(title, sector) {
  // Remove common words that don't add SEO value
  const stopWords = [
    'how', 'a', 'an', 'the', 'by', 'with', 'using', 'to', 'for', 'from', 'in', 'on', 'at',
    'and', 'or', 'but', 'so', 'yet', 'for', 'nor', 'of', 'is', 'are', 'was', 'were', 'be',
    'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
    'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those'
  ];
  
  // Split title into words and filter out stop words
  let words = title.toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters except hyphens
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.includes(word));
  
  // Take first 6-8 meaningful words
  const meaningfulWords = words.slice(0, 8);
  
  // Ensure it's not too long
  let slug = meaningfulWords.join('-');
  
  if (slug.length > MAX_URL_LENGTH - 20) { // Leave room for sector prefix
    slug = meaningfulWords.slice(0, 6).join('-');
  }
  
  // Add sector context
  const sectorSlug = sector.toLowerCase().replace(/\s+/g, '-');
  return `${sectorSlug}-${slug}`;
}

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
    // Scan the cases directory to find all JSON files
    const files = fs.readdirSync(casesDir)
      .filter(file => file.endsWith('.json') && file !== 'index.json')
      .sort((a, b) => {
        const matchA = a.match(/\d+/);
        const matchB = b.match(/\d+/);
        if (!matchA || !matchB) return 0;
        const numA = parseInt(matchA[0]);
        const numB = parseInt(matchB[0]);
        return numA - numB;
      });

    const caseStudies = [];

    // Process each case study file
    for (const file of files) {
      try {
        const content = fs.readFileSync(path.join(casesDir, file), 'utf8');
        const caseData = JSON.parse(content);
        
        // Skip files that don't have required fields
        if (!caseData.Sector || !caseData.Title || !caseData.Subtitle) {
          console.warn(`⚠️ Skipping ${file} - missing required fields`);
          continue;
        }
        
        const match = file.match(/\d+/);
        const id = match ? parseInt(match[0]) : 0;
        
        // Generate slug from title and subtitle
        const sectorSlug = slugify(caseData.Sector);
        const titleSlug = createShortSlug(caseData.Title, caseData.Sector);
        
        caseStudies.push({
          id,
          sector: sectorSlug,
          slug: titleSlug,
          title: caseData.Title,
          subtitle: caseData.Subtitle,
          sectorName: caseData.Sector,
          publicationDate: caseData.publicationDate
        });
      } catch (error) {
        console.warn(`⚠️ Error processing ${file}:`, error.message);
        continue;
      }
    }

    // Sort by publication date (newest first)
    caseStudies.sort((a, b) => {
      if (!a.publicationDate && !b.publicationDate) return 0;
      if (!a.publicationDate) return 1;
      if (!b.publicationDate) return -1;
      return new Date(b.publicationDate) - new Date(a.publicationDate);
    });

    // Write index file
    const indexFilePath = path.join(casesDir, 'index.json');
    fs.writeFileSync(indexFilePath, JSON.stringify({
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
  
  // Load the pre-generated case study index (already filters out future-dated studies)
  let caseStudies = [];
  try {
    const indexData = JSON.parse(fs.readFileSync(path.join(casesDir, 'index.json'), 'utf8'));
    caseStudies = indexData.caseStudies || [];
  } catch (err) {
    console.warn('⚠️ Could not read index.json, falling back to scanning files.');
    caseStudies = await generateCaseStudyIndex();
  }
  
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
  <url>
    <loc>${BASE_URL}/refund-policy</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  ${sortedCaseStudies.map(study => `  <url>
    <loc>${escapeXml(`${BASE_URL}/case-study/${study.sector}/${study.slug}`)}</loc>
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