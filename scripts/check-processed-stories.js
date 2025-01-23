import fs from 'fs';
import path from 'path';

async function checkProcessedStories() {
  console.log('🔍 Checking processed case studies...\n');
  const casesDir = path.join(process.cwd(), 'public/articles/cases');
  
  // Read all case study files
  const files = fs.readdirSync(casesDir)
    .filter(file => file.endsWith('.json') && !file.endsWith('.backup.json'))
    .sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)[0]);
      const numB = parseInt(b.match(/\d+/)[0]);
      return numA - numB;
    });

  let processed = [];
  let unprocessed = [];
  let noBackup = [];

  // Check each file
  files.forEach(file => {
    try {
      const filePath = path.join(casesDir, file);
      const backupPath = `${filePath}.backup`;
      const caseNumber = file.match(/\d+/)[0];

      if (!fs.existsSync(backupPath)) {
        noBackup.push(caseNumber);
        return;
      }

      const currentContent = fs.readFileSync(filePath, 'utf8');
      const backupContent = fs.readFileSync(backupPath, 'utf8');
      
      const current = JSON.parse(currentContent);
      const backup = JSON.parse(backupContent);

      if (current.Story !== backup.Story) {
        processed.push(caseNumber);
      } else {
        unprocessed.push(caseNumber);
      }
    } catch (error) {
      console.error(`❌ Error checking ${file}:`, error.message);
    }
  });

  // Print results
  console.log('✅ Processed case studies:', processed.join(', '));
  console.log('\n❌ Unprocessed case studies:', unprocessed.join(', '));
  if (noBackup.length > 0) {
    console.log('\n⚠️ Case studies without backup:', noBackup.join(', '));
  }
  
  console.log(`\n📊 Summary:
- Total case studies: ${files.length}
- Processed: ${processed.length}
- Unprocessed: ${unprocessed.length}
- No backup: ${noBackup.length}`);
}

// Run the script
checkProcessedStories().catch(console.error); 