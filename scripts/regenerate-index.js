import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';
import { slugify } from '../src/utils/slugify.js';

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const casesDir = path.join(__dirname, '../public/articles/cases');

async function regenerateIndex() {
  console.log('🔄 Regenerating case study index from scratch...');
  
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

    console.log(`📁 Found ${files.length} case study files`);

    const caseStudies = [];

    // Get current date for filtering future-dated case studies
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison
    
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
        
        // Skip future-dated case studies (scheduled publishing)
        if (caseData.publicationDate) {
          const publicationDate = new Date(caseData.publicationDate);
          publicationDate.setHours(0, 0, 0, 0);
          
          if (publicationDate > today) {
            console.log(`📅 Skipping future-dated case study ${file} - scheduled for ${caseData.publicationDate}`);
            continue;
          }
        }
        
        const match = file.match(/\d+/);
        const id = match ? parseInt(match[0]) : 0;
        
        // Generate slug from title and subtitle
        const sectorSlug = slugify(caseData.Sector);
        const titleSlug = slugify(`${caseData.Title}-${caseData.Subtitle}`);
        
        caseStudies.push({
          id,
          sector: sectorSlug,
          slug: titleSlug,
          title: caseData.Title,
          subtitle: caseData.Subtitle,
          sectorName: caseData.Sector,
          publicationDate: caseData.publicationDate
        });
        
        console.log(`✅ Processed case study ${id}: ${caseData.Title}`);
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
    const indexPath = path.join(casesDir, 'index.json');
    fs.writeFileSync(indexPath, JSON.stringify({
      total: caseStudies.length,
      caseStudies
    }, null, 2));

    console.log(`✅ Successfully regenerated index.json with ${caseStudies.length} case studies`);
    console.log(`📄 Index file written to: ${indexPath}`);
    
    // Log the case study IDs for verification
    const ids = caseStudies.map(cs => cs.id).sort((a, b) => a - b);
    console.log(`📋 Case study IDs: ${ids.join(', ')}`);
    
    // Automatically generate sitemap after successful index regeneration
    console.log('\n🔄 Generating sitemap...');
    try {
      await execAsync('node scripts/generate-sitemap.js', { cwd: process.cwd() });
      console.log('✅ Sitemap generated successfully!');
    } catch (error) {
      console.error('❌ Failed to generate sitemap:', error.message);
      // Don't exit on sitemap failure, just warn
    }
    
  } catch (error) {
    console.error('❌ Error regenerating index:', error);
    process.exit(1);
  }
}

regenerateIndex().catch(error => {
  console.error('❌ A critical error occurred:', error);
  process.exit(1);
}); 