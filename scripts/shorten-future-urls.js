#!/usr/bin/env node

/**
 * Script to shorten URLs for case studies with future publication dates
 * This prevents extremely long URLs from being indexed by Google
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { slugify } from '../src/utils/slugify.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CASES_DIR = path.join(__dirname, '../public/articles/cases');
const INDEX_FILE = path.join(CASES_DIR, 'index.json');
const TODAY = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

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
  
  // Add sector context if needed
  let slug = meaningfulWords.join('-');
  
  // Ensure it's not too long
  if (slug.length > MAX_URL_LENGTH - 20) { // Leave room for sector prefix
    slug = meaningfulWords.slice(0, 6).join('-');
  }
  
  // Add sector context
  const sectorSlug = sector.toLowerCase().replace(/\s+/g, '-');
  return `${sectorSlug}-${slug}`;
}

/**
 * Checks if a publication date is in the future
 * @param {string} publicationDate - Date in YYYY-MM-DD format
 * @returns {boolean}
 */
function isFutureDate(publicationDate) {
  return publicationDate > TODAY;
}

/**
 * Processes individual case study files for future publications
 * @returns {number} - Number of URLs shortened
 */
function processFutureCaseStudies() {
  try {
    // Get all case study files
    const files = fs.readdirSync(CASES_DIR)
      .filter(file => file.endsWith('.json') && file !== 'index.json')
      .map(file => path.join(CASES_DIR, file))
      .sort((a, b) => {
        const aNum = parseInt(path.basename(a, '.json'));
        const bNum = parseInt(path.basename(b, '.json'));
        return aNum - bNum;
      });
    
    let modifiedCount = 0;
    
    // Process each file
    for (const filePath of files) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const caseData = JSON.parse(content);
        
        // Check if this is a future publication
        if (!isFutureDate(caseData.publicationDate)) {
          continue; // Skip past publications
        }
        
        // Generate current slug using the same logic as the index
        const sectorSlug = caseData.Sector?.toLowerCase().replace(/\s+/g, '-') || 'unknown';
        const currentSlug = slugify(`${caseData.Title}-${caseData.Subtitle}`);
        const currentUrlLength = `https://www.icebergdata.co/case-study/${sectorSlug}/${currentSlug}`.length;
        
        if (currentUrlLength <= MAX_URL_LENGTH) {
          continue; // URL is already short enough
        }
        
        // Create new shortened slug
        const newSlug = createShortSlug(caseData.Title, caseData.Sector);
        const newUrlLength = `https://www.icebergdata.co/case-study/${sectorSlug}/${newSlug}`.length;
        
        console.log(`📝 Case Study ${path.basename(filePath, '.json')}:`);
        console.log(`   Title: ${caseData.Title.substring(0, 50)}...`);
        console.log(`   Old: ${currentSlug.substring(0, 60)}... (${currentUrlLength} chars)`);
        console.log(`   New: ${newSlug} (${newUrlLength} chars)`);
        
        // Add the slug to the case data (for future reference)
        caseData.slug = newSlug;
        
        // Write back to file
        fs.writeFileSync(filePath, JSON.stringify(caseData, null, 2));
        modifiedCount++;
        
      } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
      }
    }
    
    return modifiedCount;
  } catch (error) {
    console.error('❌ Error processing case study files:', error.message);
    return 0;
  }
}


/**
 * Main execution function
 */
async function main() {
  console.log('🚀 Starting URL shortening for future case studies...\n');
  console.log(`📅 Today's date: ${TODAY}`);
  console.log(`📏 Max URL length: ${MAX_URL_LENGTH} characters\n`);
  
  // Process future case study files
  console.log('📁 Processing future case study files...\n');
  
  const modifiedCount = processFutureCaseStudies();
  
  console.log(`\n✅ Processing complete!`);
  console.log(`✏️  Modified: ${modifiedCount} URLs`);
  
  if (modifiedCount > 0) {
    console.log(`\n🎉 URL shortening complete!`);
    console.log(`💡 Next steps:`);
    console.log(`   1. Run: npm run regenerate-index`);
    console.log(`   2. Run: npm run generate-sitemap`);
    console.log(`   3. Commit and push changes`);
    console.log(`   4. Submit updated sitemap to Google Search Console`);
  } else {
    console.log(`\n✅ No URLs needed shortening - all future URLs are already short enough!`);
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
}

export { createShortSlug, isFutureDate };
