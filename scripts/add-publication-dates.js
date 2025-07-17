import fs from 'fs';
import path from 'path';

const getRandomDate = () => {
  const end = new Date();
  const start = new Date();
  start.setFullYear(end.getFullYear() - 2); // 2 years ago

  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    .toISOString()
    .split('T')[0];
};

const addPublicationDates = async () => {
  const casesDir = path.join(process.cwd(), 'public/articles/cases');
  const files = fs.readdirSync(casesDir);
  
  // Sort files to ensure consistent ordering
  files.sort((a, b) => {
    const numA = parseInt(a.split('.')[0]);
    const numB = parseInt(b.split('.')[0]);
    return numA - numB;
  });

  // Generate dates in chronological order (older to newer)
  const dates = Array(files.length).fill()
    .map(() => getRandomDate())
    .sort();

  files.forEach((file, index) => {
    if (file.endsWith('.json')) {
      const filePath = path.join(casesDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const caseStudy = JSON.parse(content);

      // Add publication date
      caseStudy.publicationDate = dates[index];

      // Write back to file with proper formatting
      fs.writeFileSync(
        filePath,
        JSON.stringify(caseStudy, null, 2)
      );

      console.log(`Added publication date ${dates[index]} to case study ${file}`);
    }
  });

  console.log('Successfully added publication dates to all case studies!');
};

addPublicationDates().catch(console.error); 