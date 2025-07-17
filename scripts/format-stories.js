import fs from 'fs';
import path from 'path';

const PARAGRAPH_STARTERS = [
  'The project',
  'By partnering',
  'Armed with',
  'As a result',
  'Over time',
  'By outsourcing',
  'Initially',
  'However',
  'Furthermore',
  'In addition',
  'Finally',
  'This led to',
  'The team',
  'Through this',
  'Ultimately'
];

function formatStory(story) {
  let formattedStory = story;
  
  // Add a line break before each paragraph starter
  PARAGRAPH_STARTERS.forEach(starter => {
    const regex = new RegExp(`\\. ${starter}`, 'g');
    formattedStory = formattedStory.replace(regex, `.\n\n${starter}`);
  });
  
  // Clean up any multiple consecutive line breaks
  formattedStory = formattedStory.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  return formattedStory.trim();
}

async function formatCaseStudies() {
  console.log('🔄 Starting story formatting...');
  const casesDir = path.join(process.cwd(), 'public/articles/cases');
  
  // Read all case study files
  const files = fs.readdirSync(casesDir)
    .filter(file => file.endsWith('.json'))
    .sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)[0]);
      const numB = parseInt(b.match(/\d+/)[0]);
      return numA - numB;
    });

  let formattedCount = 0;
  
  for (const file of files) {
    const filePath = path.join(casesDir, file);
    console.log(`\n📝 Processing ${file}...`);
    
    try {
      // Read and parse the case study
      const content = fs.readFileSync(filePath, 'utf8');
      const caseStudy = JSON.parse(content);
      
      // Format the story
      const originalStory = caseStudy.Story;
      const formattedStory = formatStory(originalStory);
      
      // Only update if the story has changed
      if (formattedStory !== originalStory) {
        caseStudy.Story = formattedStory;
        fs.writeFileSync(filePath, JSON.stringify(caseStudy, null, 2));
        console.log(`✅ Updated story format in ${file}`);
        formattedCount++;
      } else {
        console.log(`ℹ️ No formatting changes needed for ${file}`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
    }
  }
  
  console.log(`\n✨ Formatting complete! Updated ${formattedCount} case studies.`);
}

// Run the script
formatCaseStudies().catch(console.error); 