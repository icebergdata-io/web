import fs from 'fs';
import path from 'path';

async function listCaseStudies() {
  console.log('📚 Listing all case studies...\n');
  const casesDir = path.join(process.cwd(), 'public/articles/cases');
  
  // Read all case study files
  const files = fs.readdirSync(casesDir)
    .filter(file => file.endsWith('.json'))
    .sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)[0]);
      const numB = parseInt(b.match(/\d+/)[0]);
      return numA - numB;
    });

  // Process each file
  files.forEach(file => {
    try {
      const content = fs.readFileSync(path.join(casesDir, file), 'utf8');
      const caseStudy = JSON.parse(content);
      const caseNumber = file.match(/\d+/)[0];
      
      console.log(`${caseNumber}. [${caseStudy.Sector}] ${caseStudy.Title}`);
      console.log(`   Subtitle: ${caseStudy.Subtitle}`);
      console.log(''); // Empty line for readability
    } catch (error) {
      console.error(`❌ Error reading ${file}:`, error.message);
    }
  });
}

// Run the script
listCaseStudies().catch(console.error); 