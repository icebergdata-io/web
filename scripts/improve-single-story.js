import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
if (!CLAUDE_API_KEY) {
  console.error('❌ CLAUDE_API_KEY environment variable is not set');
  process.exit(1);
}

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const DELAY_BETWEEN_CALLS = 5000; // 5 seconds between API calls
const MAX_RETRIES = 5; // Maximum number of retries for API calls
const RETRY_DELAYS = [5000, 10000, 20000, 30000, 60000]; // Increasing delays between retries

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
      const errorBody = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message || 'Unknown API error');
    }

    console.log('✅ Claude API response received');
    return data.content[0].text;
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      const delay = RETRY_DELAYS[retryCount] || RETRY_DELAYS[RETRY_DELAYS.length - 1];
      console.log(`⚠️ API call failed (attempt ${retryCount + 1}/${MAX_RETRIES}). Error: ${error.message}`);
      console.log(`⏳ Retrying in ${delay/1000} seconds...`);
      await sleep(delay);
      return callClaudeWithRetry(prompt, retryCount + 1);
    }
    throw new Error(`Failed after ${MAX_RETRIES} retries: ${error.message}`);
  }
}

function generatePrompt(caseStudy) {
  return `As an expert technical writer for Iceberg Data, please improve and reformat this case study story. You have the complete context of the case study below. The story should showcase Iceberg Data's expertise while being well-structured, engaging, and optimized for web display.

Complete Case Study Context:
${JSON.stringify(caseStudy, null, 2)}

CRITICAL RESPONSE FORMAT INSTRUCTIONS:
1. Your response MUST be a single valid JSON object
2. The JSON object MUST contain exactly one field named "story"
3. The response MUST start with "{" and end with "}"
4. NO text, prefixes, or explanations outside the JSON structure
5. NO line breaks before the opening "{" or after the closing "}"
6. The JSON must be parseable by JSON.parse()

Example of EXACT response format:
{"story":"<p>First paragraph</p>\\n\\n<p>Second paragraph</p>"}

Guidelines for the story content:
1. Use proper HTML paragraph tags (<p>) for better web formatting
2. Break the content into logical sections with clear transitions
3. Ensure each paragraph focuses on one main idea
4. Add emphasis using <strong> tags for key points and metrics
5. Include bullet points or numbered lists where appropriate using <ul> or <ol> tags
6. Maintain a professional yet engaging tone
7. Highlight key metrics and results with <strong> tags
8. Follow this structure:
   - Opening: Introduce the challenge and its significance
   - Problem: Detail the specific issues faced (reference the "Problems this solves" field)
   - Solution: Explain how Iceberg Data addressed these challenges
   - Implementation: Describe the technical approach (reference Input/Output Schemas and Matching algorithm)
   - Results: Highlight specific metrics and improvements (reference Business Impact)
   - Conclusion: Focus on concrete business outcomes and ROI
9. Replace any mentions of "external provider", "data provider", or similar non specific reference with terms like "Iceberg Data" or "Iceberg Data's web scraping experts" or "Iceberg Data's web scraping team"
10. Emphasize Iceberg Data's expertise and unique approach 
11. Include specific metrics and results from the Business Impact field 
12. Reference the technical implementation details from the Input Schema, Output Schema, and Matching algorithm fields
13. Ensure consistency with all other fields in the case study

Important writing guidelines:
- Avoid generic AI-like conclusions about "transformative power", "leveraging data", or similar clichés
- Focus on concrete business outcomes and specific technical achievements
- End with measurable results or client benefits rather than broad statements
- Use industry-specific terminology from the case study
- Keep the tone professional and focused on business value
- Avoid any phrases that might hint at AI generation
- Never use phrases like "this success story demonstrates" or "this case study shows"
- Conclude with specific ROI metrics and business outcomes, not general statements about impact
- Focus on the client's achieved results rather than abstract benefits
- Avoid meta-references to the case study itself

REMEMBER: Your response must be ONLY the JSON object. No other text or explanations.`;
}

async function cleanAndParseResponse(response) {
  try {
    // Try to parse the response directly first
    return JSON.parse(response);
  } catch (error) {
    // If direct parsing fails, try to extract JSON
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch (innerError) {
        throw new Error('Could not parse JSON from response');
      }
    }
    throw new Error('No valid JSON found in response');
  }
}

async function improveStory(caseNumber) {
  console.log(`\n🔄 Processing case study ${caseNumber}...`);
  const casesDir = path.join(process.cwd(), 'public/articles/cases');
  const filePath = path.join(casesDir, `${caseNumber}.json`);

  try {
    if (!fs.existsSync(filePath)) {
      console.error(`❌ Case study ${caseNumber} does not exist`);
      return false;
    }

    // Read and parse the case study
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
    const response = await callClaudeWithRetry(prompt);
    
    try {
      // Parse the response and extract just the story content
      const improvedContent = await cleanAndParseResponse(response);
      if (!improvedContent.story) {
        throw new Error('Response does not contain a story field');
      }
      
      // Update and save
      caseStudy.Story = improvedContent.story;
      fs.writeFileSync(filePath, JSON.stringify(caseStudy, null, 2));
      
      console.log(`✅ Successfully processed case study ${caseNumber}`);
      return true;
    } catch (parseError) {
      console.error('❌ Error parsing Claude response:', parseError.message);
      console.error('Raw response:', response);
      throw parseError;
    }
  } catch (error) {
    console.error(`❌ Error processing case study ${caseNumber}:`, error.message);
    return false;
  }
}

async function processMultipleStories(startNum, endNum) {
  console.log(`\n🚀 Starting batch processing of case studies ${startNum} to ${endNum}...`);
  let successful = 0;
  let failed = 0;

  for (let i = startNum; i <= endNum; i++) {
    const success = await improveStory(i);
    if (success) {
      successful++;
    } else {
      failed++;
    }
    
    // Add delay between processing to avoid rate limits
    if (i < endNum) {
      console.log('\n⏳ Waiting before processing next case study...');
      await sleep(DELAY_BETWEEN_CALLS);
    }
  }

  console.log(`\n📊 Processing complete:`);
  console.log(`✅ Successfully processed: ${successful}`);
  console.log(`❌ Failed: ${failed}`);
}

// Parse command line arguments
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Please provide case study number(s) as arguments');
  console.error('Usage: node improve-single-story.js <number>');
  console.error('   or: node improve-single-story.js <start> <end>');
  process.exit(1);
}

if (args.length === 1) {
  // Single case study
  improveStory(parseInt(args[0])).catch(console.error);
} else {
  // Range of case studies
  const start = parseInt(args[0]);
  const end = parseInt(args[1]);
  if (isNaN(start) || isNaN(end) || start > end) {
    console.error('Invalid range. Please provide valid start and end numbers.');
    process.exit(1);
  }
  processMultipleStories(start, end).catch(console.error);
} 