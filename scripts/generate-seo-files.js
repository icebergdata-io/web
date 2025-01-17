import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://www.icebergdata.co';

// Generate padded social media image
async function generatePaddedLogo() {
  const inputPath = path.join(__dirname, '../public/android-chrome-512x512.png');
  const outputPath = path.join(__dirname, '../public/og-logo.png');
  
  try {
    const metadata = await sharp(inputPath).metadata();
    const padding = Math.floor(Math.max(metadata.width, metadata.height) * 0.3); // 30% padding
    
    await sharp(inputPath)
      .resize(1200, 1200)  // Resize to optimal size for social media
      .extend({
        top: padding,
        bottom: padding,
        left: padding,
        right: padding,
        background: { r: 255, g: 255, b: 255, alpha: 1 } // White background
      })
      .toFile(outputPath);
      
    console.log('✅ Generated padded logo for social media');
  } catch (error) {
    console.error('Error generating padded logo:', error);
  }
}

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

// Main execution
async function main() {
  // Ensure public directory exists
  const publicDir = path.join(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  // Generate padded logo
  await generatePaddedLogo();

  // Write robots.txt
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);
  console.log('✅ Generated robots.txt');

  // Write sitemap.xml
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), generateSitemap());
  console.log('✅ Generated sitemap.xml');
}

main().catch(console.error); 