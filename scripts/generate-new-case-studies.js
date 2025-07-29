import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const GEMINI_API_KEY = process.env['gmini-api-key'];
if (!GEMINI_API_KEY) {
  console.error('❌ gmini-api-key environment variable is not set');
  process.exit(1);
}

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent';
const DELAY_BETWEEN_CALLS = 3000; // 3 seconds between API calls
const MAX_RETRIES = 3;
const MAX_JSON_RETRIES = 2; // Additional retries for JSON formatting issues

// Get command line arguments
const args = process.argv.slice(2);
const sector = args.find(arg => arg.startsWith('--sector='))?.split('=')[1] || 'retail';
const count = parseInt(args.find(arg => arg.startsWith('--count='))?.split('=')[1]) || 1;
const startFrom = parseInt(args.find(arg => arg.startsWith('--start-from='))?.split('=')[1]) || 39;

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function callGeminiWithRetry(prompt, retryCount = 0) {
  try {
    console.log('🔄 Calling Gemini API...');
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 4096,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error) {
      if (data.error.message?.includes('quota') && retryCount < MAX_RETRIES) {
        const backoffTime = Math.pow(2, retryCount) * DELAY_BETWEEN_CALLS;
        console.log(`⏳ Rate limit hit. Retrying in ${backoffTime/1000} seconds... (Attempt ${retryCount + 1}/${MAX_RETRIES})`);
        await sleep(backoffTime);
        return callGeminiWithRetry(prompt, retryCount + 1);
      }
      throw new Error(data.error.message || 'Unknown API error');
    }

    console.log('✅ Gemini API response received');
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    if (error.message?.includes('quota') && retryCount < MAX_RETRIES) {
      const backoffTime = Math.pow(2, retryCount) * DELAY_BETWEEN_CALLS;
      console.log(`⏳ Rate limit hit. Retrying in ${backoffTime/1000} seconds... (Attempt ${retryCount + 1}/${MAX_RETRIES})`);
      await sleep(backoffTime);
      return callGeminiWithRetry(prompt, retryCount + 1);
    }
    throw error;
  }
}

function cleanJsonResponse(response) {
  let cleanedResponse = response.trim();
  
  // Remove any markdown code blocks if present
  if (cleanedResponse.startsWith('```json')) {
    cleanedResponse = cleanedResponse.replace(/```json\n?/, '').replace(/```\n?/, '');
  }
  if (cleanedResponse.startsWith('```')) {
    cleanedResponse = cleanedResponse.replace(/```\n?/, '').replace(/```\n?/, '');
  }
  
  // Remove any leading/trailing text that's not JSON
  const jsonStart = cleanedResponse.indexOf('{');
  const jsonEnd = cleanedResponse.lastIndexOf('}');
  
  if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
    cleanedResponse = cleanedResponse.substring(jsonStart, jsonEnd + 1);
  }
  
  return cleanedResponse;
}

function validateCaseStudy(caseStudy) {
  const requiredFields = [
    'Title', 'Subtitle', 'Business Impact', 'Sector', 
    'What data was collected', 'Why this matters', 'Implementation time',
    'Problems this solves', 'Why it was better to outsource this solution',
    'Input Schema', 'Output Schema', 'Matching algorithm used to integrate the data',
    'Story', 'publicationDate', 'Exact_Input_Schema', 'Exact_Output_Schema'
  ];
  
  const missingFields = requiredFields.filter(field => !caseStudy[field]);
  
  if (missingFields.length > 0) {
    return {
      isValid: false,
      errors: [`Missing required fields: ${missingFields.join(', ')}`]
    };
  }
  
  // Validate specific field types and content
  const validationErrors = [];
  
  // Check if Title is not empty and is a string
  if (!caseStudy.Title || typeof caseStudy.Title !== 'string' || caseStudy.Title.trim().length === 0) {
    validationErrors.push('Title must be a non-empty string');
  }
  
  // Check if Story contains HTML content
  if (!caseStudy.Story || !caseStudy.Story.includes('<p>')) {
    validationErrors.push('Story must contain HTML paragraph tags');
  }
  
  // Check if publicationDate is in correct format
  if (!caseStudy.publicationDate || !/^\d{4}-\d{2}-\d{2}$/.test(caseStudy.publicationDate)) {
    validationErrors.push('publicationDate must be in YYYY-MM-DD format');
  }
  
  // Check if schemas are objects
  if (!caseStudy.Exact_Input_Schema || typeof caseStudy.Exact_Input_Schema !== 'object') {
    validationErrors.push('Exact_Input_Schema must be a valid JSON object');
  }
  
  if (!caseStudy.Exact_Output_Schema || typeof caseStudy.Exact_Output_Schema !== 'object') {
    validationErrors.push('Exact_Output_Schema must be a valid JSON object');
  }
  
  return {
    isValid: validationErrors.length === 0,
    errors: validationErrors
  };
}

function generateCaseStudyPrompt(sector, caseNumber, isRetry = false) {
  const retryNote = isRetry ? '\n\nIMPORTANT: This is a retry. Please ensure you return ONLY a complete, valid JSON object with all required fields. Do not include any explanatory text outside the JSON.' : '';
  
  return `Create a detailed, realistic case study for Iceberg Data following this EXACT JSON structure. The case study should be about web scraping and data collection in the ${sector} sector.

CRITICAL: Return ONLY a valid JSON object with this exact structure, no additional text or explanations:

{
  "Title": "Specific, descriptive title about the use case",
  "Subtitle": "Brief subtitle explaining the outcome or benefit",
  "Business Impact": "One sentence describing the measurable business impact with specific metrics",
  "Sector": "${sector}",
  "What data was collected": "Detailed description of what specific data was scraped or collected",
  "Why this matters": "Explanation of why this data collection is valuable for businesses in this sector",
  "Implementation time": "Realistic timeframe for implementation (e.g., '4 to 6 weeks' or '8 to 12 weeks')",
  "Problems this solves": "1) First problem. 2) Second problem. 3) Third problem.",
  "Why it was better to outsource this solution": "Explanation of why using Iceberg Data was better than doing it in-house",
  "Input Schema": "Brief description of the input data structure needed",
  "Output Schema": "Brief description of the output data structure provided",
  "Matching algorithm used to integrate the data": "Description of how the data was processed and integrated",
  "Story": "<p>Detailed story in HTML format with <strong> tags for emphasis, following this structure:</p><p>1. Opening: Introduce the business challenge</p><p>2. Problem: Detail the specific issues</p><p>3. Solution: How Iceberg Data helped</p><p>4. Implementation: Technical approach</p><p>5. Results: Specific metrics and outcomes</p><p>6. Conclusion: Business impact and ROI</p>",
  "publicationDate": "2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}",
  "Exact_Input_Schema": {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
      "example_property": {
        "type": "string",
        "description": "Example description"
      }
    },
    "required": ["example_property"]
  },
  "Exact_Output_Schema": {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
      "example_result": {
        "type": "string",
        "description": "Example result description"
      }
    },
    "required": ["example_result"]
  }
}

Guidelines for the case study:
1. Make it realistic and specific to ${sector} businesses
2. Include specific metrics and measurable outcomes
3. Focus on web scraping, data collection, and competitive intelligence
4. Use realistic business scenarios and challenges
5. Include technical details about data sources and processing
6. Make the story engaging and professional
7. Ensure all dates are in 2024
8. Make the schemas practical and implementable
9. Ensure the JSON is complete and properly formatted

Generate a unique, high-quality case study that would be valuable for ${sector} businesses looking for data solutions.${retryNote}`;
}

async function generateCaseStudy(sector, caseNumber) {
  console.log(`\n📝 Generating case study ${caseNumber} for ${sector} sector...`);
  
  let jsonRetryCount = 0;
  
  while (jsonRetryCount <= MAX_JSON_RETRIES) {
    try {
      const isRetry = jsonRetryCount > 0;
      const prompt = generateCaseStudyPrompt(sector, caseNumber, isRetry);
      const response = await callGeminiWithRetry(prompt);
      
      // Clean and parse the response
      const cleanedResponse = cleanJsonResponse(response);
      
      // Try to parse the JSON
      let caseStudy;
      try {
        caseStudy = JSON.parse(cleanedResponse);
      } catch (parseError) {
        console.log(`⚠️ JSON parsing failed (attempt ${jsonRetryCount + 1}/${MAX_JSON_RETRIES + 1}): ${parseError.message}`);
        console.log(`📄 Raw response preview: ${cleanedResponse.substring(0, 200)}...`);
        
        if (jsonRetryCount < MAX_JSON_RETRIES) {
          jsonRetryCount++;
          console.log(`🔄 Retrying JSON generation...`);
          await sleep(DELAY_BETWEEN_CALLS);
          continue;
        } else {
          throw new Error(`Failed to parse JSON after ${MAX_JSON_RETRIES + 1} attempts`);
        }
      }
      
      // Validate the case study structure
      const validation = validateCaseStudy(caseStudy);
      
      if (!validation.isValid) {
        console.log(`⚠️ Case study validation failed (attempt ${jsonRetryCount + 1}/${MAX_JSON_RETRIES + 1}):`);
        validation.errors.forEach(error => console.log(`   ❌ ${error}`));
        
        if (jsonRetryCount < MAX_JSON_RETRIES) {
          jsonRetryCount++;
          console.log(`🔄 Retrying case study generation...`);
          await sleep(DELAY_BETWEEN_CALLS);
          continue;
        } else {
          throw new Error(`Case study validation failed after ${MAX_JSON_RETRIES + 1} attempts: ${validation.errors.join(', ')}`);
        }
      }
      
      console.log(`✅ Successfully generated case study: ${caseStudy.Title}`);
      return caseStudy;
      
    } catch (error) {
      if (jsonRetryCount < MAX_JSON_RETRIES) {
        jsonRetryCount++;
        console.log(`🔄 Retrying due to error: ${error.message}`);
        await sleep(DELAY_BETWEEN_CALLS);
        continue;
      } else {
        console.error(`❌ Error generating case study ${caseNumber}:`, error.message);
        throw error;
      }
    }
  }
}

async function saveCaseStudy(caseStudy, caseNumber) {
  const casesDir = path.join(process.cwd(), 'public/articles/cases');
  const filename = `${caseNumber}.json`;
  const filepath = path.join(casesDir, filename);
  
  try {
    fs.writeFileSync(filepath, JSON.stringify(caseStudy, null, 2));
    console.log(`💾 Saved case study to: ${filename}`);
    return filepath;
  } catch (error) {
    console.error(`❌ Error saving case study ${caseNumber}:`, error.message);
    throw error;
  }
}

async function generateMultipleCaseStudies(sector, count, startFrom) {
  console.log(`🚀 Starting generation of ${count} case studies for ${sector} sector, starting from ${startFrom}`);
  console.log(`📁 Case studies will be saved in: public/articles/cases/`);
  
  const generatedFiles = [];
  const failedCases = [];
  
  for (let i = 0; i < count; i++) {
    const caseNumber = startFrom + i;
    
    try {
      // Generate the case study
      const caseStudy = await generateCaseStudy(sector, caseNumber);
      
      // Save the case study
      const filepath = await saveCaseStudy(caseStudy, caseNumber);
      generatedFiles.push(filepath);
      
      // Add delay between API calls
      if (i < count - 1) {
        console.log(`⏳ Waiting ${DELAY_BETWEEN_CALLS/1000} seconds before next generation...`);
        await sleep(DELAY_BETWEEN_CALLS);
      }
      
    } catch (error) {
      console.error(`❌ Failed to generate case study ${caseNumber}:`, error.message);
      failedCases.push({ caseNumber, error: error.message });
      // Continue with next case study
    }
  }
  
  console.log(`\n🎉 Generation complete!`);
  console.log(`✅ Generated ${generatedFiles.length} case studies:`);
  generatedFiles.forEach(filepath => {
    console.log(`   📄 ${path.basename(filepath)}`);
  });
  
  if (failedCases.length > 0) {
    console.log(`\n❌ Failed to generate ${failedCases.length} case studies:`);
    failedCases.forEach(failed => {
      console.log(`   📄 Case ${failed.caseNumber}: ${failed.error}`);
    });
  }
  
  return { generatedFiles, failedCases };
}

// Main execution
async function main() {
  try {
    console.log('📚 Iceberg Data Case Study Generator (Gemini)');
    console.log('=============================================');
    console.log(`Sector: ${sector}`);
    console.log(`Count: ${count}`);
    console.log(`Starting from: ${startFrom}`);
    console.log('');
    
    const result = await generateMultipleCaseStudies(sector, count, startFrom);
    
    if (result.failedCases.length > 0) {
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ Script failed:', error.message);
    process.exit(1);
  }
}

// Run the script
main(); 