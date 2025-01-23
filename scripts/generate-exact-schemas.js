import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';
import { fileURLToPath } from 'url';
import process from 'process';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
if (!CLAUDE_API_KEY) {
  console.error('❌ CLAUDE_API_KEY environment variable is not set');
  process.exit(1);
}

// Get starting file number from command line argument
const startFromFile = parseInt(process.argv[2]) || 10;
console.log(`Will process case studies starting from ${startFromFile}.json...`);

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const MAX_CONCURRENT_WORKERS = 2; // Reduce concurrent workers
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

    const data = await response.json();
    if (data.error) {
      if (data.error.type === 'rate_limit_error' && retryCount < MAX_RETRIES) {
        const backoffTime = Math.pow(2, retryCount) * DELAY_BETWEEN_CALLS;
        console.log(`⏳ Rate limit hit. Retrying in ${backoffTime/1000} seconds... (Attempt ${retryCount + 1}/${MAX_RETRIES})`);
        await sleep(backoffTime);
        return callClaudeWithRetry(prompt, retryCount + 1);
      }
      console.error('❌ Claude API error:', data.error);
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
    console.error('❌ Error calling Claude API:', error);
    throw error;
  }
}

async function generateExactSchema(description, type, filename) {
  console.log(`\n📝 Generating ${type} schema for ${filename}...`);
  const prompt = `
As a data schema expert, create a detailed and realistic JSON schema based on this ${type} schema description:

"${description}"

Please provide a complete, properly formatted JSON schema that:
1. Includes all necessary fields mentioned in the description
2. Adds appropriate data types and validation rules
3. Includes realistic example values
4. Uses proper JSON schema format with nested objects where appropriate
5. Includes comments explaining each field
6. Makes the schema as practical and implementable as possible

Return ONLY the JSON schema, properly formatted, without any additional explanation.
`;

  const response = await callClaudeWithRetry(prompt);
  try {
    const parsedResponse = JSON.parse(response);
    console.log(`✅ Successfully generated ${type} schema for ${filename}`);
    return parsedResponse;
  } catch (error) {
    console.error(`❌ Invalid JSON response for ${filename}:`, response);
    throw new Error('Invalid JSON response from Claude');
  }
}

// Worker thread code
if (!isMainThread) {
  const { filePath } = workerData;
  const filename = path.basename(filePath);
  
  async function processFile() {
    try {
      console.log(`\n🔄 Starting processing of ${filename}...`);
      const content = fs.readFileSync(filePath, 'utf8');
      const caseStudy = JSON.parse(content);
      
      // Create backup
      const backupPath = `${filePath}.backup`;
      fs.copyFileSync(filePath, backupPath);
      console.log(`📑 Created backup at ${backupPath}`);

      // Generate schemas
      const exactInputSchema = await generateExactSchema(caseStudy["Input Schema"], "input", filename);
      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_CALLS));
      
      const exactOutputSchema = await generateExactSchema(caseStudy["Output Schema"], "output", filename);
      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_CALLS));

      // Update and save
      caseStudy["Exact_Input_Schema"] = exactInputSchema;
      caseStudy["Exact_Output_Schema"] = exactOutputSchema;
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
      })
      // Only process files starting from the specified number
      .filter(file => {
        const fileNum = parseInt(file.match(/\d+/)[0]);
        return fileNum >= startFromFile;
      });

    console.log(`📁 Found ${files.length} case study files to process`);

    // Skip files that have already been processed
    const remainingFiles = files.filter(file => {
      try {
        const content = JSON.parse(fs.readFileSync(path.join(casesDir, file), 'utf8'));
        return !content.Exact_Input_Schema || !content.Exact_Output_Schema;
      } catch (err) {
        console.error(`❌ Error reading ${file}:`, err.message);
        return false;
      }
    });

    console.log(`\n📊 Status:
- Starting from: Case study ${startFromFile}
- Files to process: ${files.length}
- Already processed: ${files.length - remainingFiles.length}
- Remaining to process: ${remainingFiles.length}
- Concurrent workers: ${MAX_CONCURRENT_WORKERS}
- Expected batches: ${Math.ceil(remainingFiles.length / MAX_CONCURRENT_WORKERS)}
- Delay between API calls: ${DELAY_BETWEEN_CALLS/1000} seconds
- Max retries per request: ${MAX_RETRIES}
`);

    if (remainingFiles.length === 0) {
      console.log('✨ All files are already processed! Nothing to do.');
      return;
    }

    // Process files in batches to limit concurrent API calls
    for (let i = 0; i < remainingFiles.length; i += MAX_CONCURRENT_WORKERS) {
      const batch = remainingFiles.slice(i, i + MAX_CONCURRENT_WORKERS);
      const batchNumber = Math.floor(i / MAX_CONCURRENT_WORKERS) + 1;
      const totalBatches = Math.ceil(remainingFiles.length / MAX_CONCURRENT_WORKERS);
      
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
      
      const remainingBatches = totalBatches - batchNumber;
      if (remainingBatches > 0) {
        console.log(`⏳ Remaining batches: ${remainingBatches}`);
      }
    }
  }

  console.log('\n🚀 Starting parallel schema generation...');
  processFilesInParallel()
    .then(() => console.log('\n✨ All files processed successfully!'))
    .catch(error => console.error('\n❌ Error during processing:', error));
}

if (startFromFile < 1) {
  console.error('Please provide a positive file number to start from');
  process.exit(1);
} 