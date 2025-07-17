import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
if (!CLAUDE_API_KEY) {
  console.error('❌ CLAUDE_API_KEY environment variable is not set');
  process.exit(1);
}

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const MAX_CONCURRENT_WORKERS = 2; // Limit concurrent API calls
const DELAY_BETWEEN_CALLS = 5000; // 5 seconds between API calls
const MAX_RETRIES = 3;

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function callClaudeWithRetry(prompt, retryCount = 0) {
  try {
    console.log('🔄 Calling Claude API...');
    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229',
        max_tokens: 4096,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error) {
      if (data.error.type === 'rate_limit_error' && retryCount < MAX_RETRIES) {
        const backoffTime = Math.pow(2, retryCount) * DELAY_BETWEEN_CALLS;
        console.log(`⏳ Rate limit hit. Retrying in ${backoffTime/1000} seconds... (Attempt ${retryCount + 1}/${MAX_RETRIES})`);
        await sleep(backoffTime);
        return callClaudeWithRetry(prompt, retryCount + 1);
      }
      throw new Error(data.error.message);
    }

    console.log('✅ Claude API response received');
    return data.content[0].text;
  } catch (error) {
    if (error.message?.includes('rate_limit') && retryCount < MAX_RETRIES) {
      const backoffTime = Math.pow(2, retryCount) * DELAY_BETWEEN_CALLS;
      console.log(`⏳ Rate limit hit. Retrying in ${backoffTime/1000} seconds... (Attempt ${retryCount + 1}/${MAX_RETRIES})`);
      await sleep(backoffTime);
      return callClaudeWithRetry(prompt, retryCount + 1);
    }
    throw error;
  }
}

function generatePrompt(caseStudy) {
  return `As an expert technical writer for Iceberg Data, please improve and reformat this case study story. The story should showcase Iceberg Data's expertise while being well-structured, engaging, and optimized for web display.

Title: ${caseStudy.Title}
Subtitle: ${caseStudy.Subtitle}
Sector: ${caseStudy.Sector}

Original Story:
${caseStudy.Story}

Please rewrite the story following these guidelines:
1. Use proper HTML paragraph tags (<p>) for better web formatting
2. Break the content into logical sections with clear transitions
3. Ensure each paragraph focuses on one main idea
4. Add emphasis using <strong> tags for key points and metrics
5. Include bullet points or numbered lists where appropriate using <ul> or <ol> tags
6. Maintain a professional yet engaging tone
7. Highlight key metrics and results with <strong> tags
8. Follow this structure:
   - Opening: Introduce the challenge and its significance
   - Problem: Detail the specific issues faced
   - Solution: Explain how Iceberg Data addressed these challenges
   - Implementation: Describe the technical approach
   - Results: Highlight specific metrics and improvements
   - Conclusion: Emphasize the business impact
9. Replace any mentions of "external provider", "data provider", or similar terms with "Iceberg Data"
10. Emphasize Iceberg Data's expertise and unique approach
11. Include specific metrics and results where available
12. End with a strong conclusion that ties back to the business impact

Return ONLY the improved story with HTML formatting, without any additional explanation.`;
}

// Worker thread code
if (!isMainThread) {
  const { filePath } = workerData;
  const filename = path.basename(filePath);
  
  async function processFile() {
    try {
      console.log(`\n🔄 Processing ${filename}...`);
      const content = fs.readFileSync(filePath, 'utf8');
      const caseStudy = JSON.parse(content);
      
      // Create backup
      const backupPath = `${filePath}.backup`;
      if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(filePath, backupPath);
        console.log(`📑 Created backup at ${backupPath}`);
      }

      // Generate improved story
      const prompt = generatePrompt(caseStudy);
      const improvedStory = await callClaudeWithRetry(prompt);

      // Update and save
      caseStudy.Story = improvedStory;
      fs.writeFileSync(filePath, JSON.stringify(caseStudy, null, 2));

      parentPort.postMessage({ success: true, file: filename });
    } catch (error) {
      parentPort.postMessage({ 
        success: false, 
        file: filename, 
        error: error.message 
      });
    }
  }

  processFile();
}

// Main thread code
if (isMainThread) {
  async function processFilesInParallel() {
    console.log('\n🔍 Scanning case studies directory...');
    const casesDir = path.join(process.cwd(), 'public/articles/cases');
    const files = fs.readdirSync(casesDir)
      .filter(file => file.endsWith('.json'))
      .filter(file => !file.endsWith('.backup.json'))
      .sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)[0]);
        const numB = parseInt(b.match(/\d+/)[0]);
        return numA - numB;
      });

    console.log(`📁 Found ${files.length} case study files to process`);

    // Process files in batches to limit concurrent API calls
    for (let i = 0; i < files.length; i += MAX_CONCURRENT_WORKERS) {
      const batch = files.slice(i, i + MAX_CONCURRENT_WORKERS);
      const batchNumber = Math.floor(i / MAX_CONCURRENT_WORKERS) + 1;
      const totalBatches = Math.ceil(files.length / MAX_CONCURRENT_WORKERS);
      
      console.log(`\n🔄 Processing batch ${batchNumber}/${totalBatches}:`);
      console.log(batch.map(f => `  - ${f}`).join('\n'));

      const workers = batch.map(file => {
        const worker = new Worker(fileURLToPath(import.meta.url), {
          workerData: { filePath: path.join(casesDir, file) }
        });

        return new Promise((resolve, reject) => {
          worker.on('message', (message) => {
            if (message.success) {
              console.log(`✅ Successfully processed ${message.file}`);
            } else {
              console.error(`❌ Error processing ${message.file}:`, message.error);
            }
            resolve();
          });

          worker.on('error', reject);
          worker.on('exit', (code) => {
            if (code !== 0) {
              reject(new Error(`Worker stopped with exit code ${code}`));
            }
          });
        });
      });

      // Wait for current batch to complete
      await Promise.all(workers);
      console.log(`\n✨ Completed batch ${batchNumber}/${totalBatches}`);
      
      // Add delay between batches to avoid rate limiting
      if (batchNumber < totalBatches) {
        console.log(`⏳ Waiting ${DELAY_BETWEEN_CALLS/1000} seconds before next batch...`);
        await sleep(DELAY_BETWEEN_CALLS);
      }
    }
  }

  console.log('\n🚀 Starting parallel story improvement...');
  processFilesInParallel()
    .then(() => console.log('\n✨ All stories have been improved!'))
    .catch(error => console.error('\n❌ Error during processing:', error));
} 