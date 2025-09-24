#!/usr/bin/env node

/**
 * Script to shorten URLs for case studies with future publication dates
 * This prevents extremely long URLs from being indexed by Google
 */

const fs = require('fs');
const path = require('path');

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
 * Processes a single case study file
 * @param {string} filePath - Path to the JSON file
 * @returns {boolean} - Whether the file was modified
 */
function processCaseStudyFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const caseData = JSON.parse(content);
    
    // Check if this is a future publication
    if (!isFutureDate(caseData.publicationDate)) {
      return false; // Skip past publications
    }
    
    // Check if URL is too long
    const currentSlug = caseData.slug || '';
    const currentUrlLength = `https://www.icebergdata.co/case-study/${caseData.Sector?.toLowerCase().replace(/\s+/g, '-')}/${currentSlug}`.length;
    
    if (currentUrlLength <= MAX_URL_LENGTH) {
      return false; // URL is already short enough
    }
    
    // Create new shortened slug
    const newSlug = createShortSlug(caseData.Title, caseData.Sector);
    const newUrlLength = `https://www.icebergdata.co/case-study/${caseData.Sector?.toLowerCase().replace(/\s+/g, '-')}/${newSlug}`.length;
    
    console.log(`📝 ${path.basename(filePath)}:`);
    console.log(`   Old: ${currentSlug.substring(0, 60)}... (${currentUrlLength} chars)`);
    console.log(`   New: ${newSlug} (${newUrlLength} chars)`);
    
    // Update the slug
    caseData.slug = newSlug;
    
    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(caseData, null, 2));
    
    return true;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

/**
 * Updates the index.json file with new slugs
 */
function updateIndexFile() {
  try {
    const indexContent = fs.readFileSync(INDEX_FILE, 'utf8');
    const indexData = JSON.parse(indexContent);
    
    let updatedCount = 0;
    
    // Update slugs in index
    indexData.forEach((item, index) => {
      if (isFutureDate(item.publicationDate)) {
        const caseFilePath = path.join(CASES_DIR, `${item.id}.json`);
        
        if (fs.existsSync(caseFilePath)) {
          const caseContent = fs.readFileSync(caseFilePath, 'utf8');
          const caseData = JSON.parse(caseContent);
          
          if (caseData.slug !== item.slug) {
            console.log(`🔄 Updating index entry ${item.id}: ${item.slug} → ${caseData.slug}`);
            indexData[index].slug = caseData.slug;
            updatedCount++;
          }
        }
      }
    });
    
    if (updatedCount > 0) {
      fs.writeFileSync(INDEX_FILE, JSON.stringify(indexData, null, 2));
      console.log(`✅ Updated ${updatedCount} entries in index.json`);
    }
    
    return updatedCount;
  } catch (error) {
    console.error('❌ Error updating index file:', error.message);
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
  
  // Get all case study files
  const files = fs.readdirSync(CASES_DIR)
    .filter(file => file.endsWith('.json') && file !== 'index.json')
    .map(file => path.join(CASES_DIR, file))
    .sort((a, b) => {
      const aNum = parseInt(path.basename(a, '.json'));
      const bNum = parseInt(path.basename(b, '.json'));
      return aNum - bNum;
    });
  
  console.log(`📁 Found ${files.length} case study files\n`);
  
  let processedCount = 0;
  let modifiedCount = 0;
  
  // Process each file
  for (const filePath of files) {
    const wasModified = processCaseStudyFile(filePath);
    processedCount++;
    
    if (wasModified) {
      modifiedCount++;
    }
    
    // Progress indicator
    if (processedCount % 50 === 0) {
      console.log(`\n📊 Progress: ${processedCount}/${files.length} files processed\n`);
    }
  }
  
  console.log(`\n✅ Processing complete!`);
  console.log(`📊 Processed: ${processedCount} files`);
  console.log(`✏️  Modified: ${modifiedCount} files`);
  
  // Update index file
  if (modifiedCount > 0) {
    console.log(`\n🔄 Updating index.json...`);
    const indexUpdates = updateIndexFile();
    console.log(`✅ Index updated with ${indexUpdates} changes`);
  }
  
  console.log(`\n🎉 URL shortening complete!`);
  console.log(`💡 Next steps:`);
  console.log(`   1. Run: npm run generate-sitemap`);
  console.log(`   2. Commit and push changes`);
  console.log(`   3. Submit updated sitemap to Google Search Console`);
}

// Run the script
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
}

module.exports = { createShortSlug, isFutureDate };
