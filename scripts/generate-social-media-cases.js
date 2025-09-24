#!/usr/bin/env node

/**
 * Script to generate private social media case studies
 * These case studies are for private sharing only and won't be published on the website
 */

import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const DEFAULT_MODEL = 'gemini-1.5-pro';

// Configuration
const DELAY_BETWEEN_CALLS_MS = 1000;
const MAX_API_RETRIES = 3;
const MAX_VALIDATION_RETRIES = 2;

// Social media platforms and their specific use cases
const SOCIAL_MEDIA_PLATFORMS = {
  'Instagram': [
    'influencer identification and verification',
    'hashtag trend analysis and optimization',
    'competitor content strategy analysis',
    'user-generated content monitoring',
    'brand mention sentiment tracking'
  ],
  'LinkedIn': [
    'B2B lead generation and qualification',
    'thought leadership content analysis',
    'competitor employee movement tracking',
    'industry trend monitoring',
    'professional network mapping'
  ],
  'Facebook': [
    'ad performance and competitor analysis',
    'community sentiment monitoring',
    'event promotion effectiveness tracking',
    'local business review analysis',
    'demographic targeting optimization'
  ],
  'TikTok': [
    'viral content pattern analysis',
    'creator collaboration opportunities',
    'trend prediction and early adoption',
    'brand safety monitoring',
    'audience engagement optimization'
  ],
  'Twitter/X': [
    'real-time crisis management',
    'trending topic analysis',
    'influencer engagement tracking',
    'brand reputation monitoring',
    'customer service response analysis'
  ],
  'YouTube': [
    'competitor video strategy analysis',
    'keyword and SEO optimization',
    'audience retention pattern analysis',
    'monetization opportunity identification',
    'content gap analysis'
  ],
  'Pinterest': [
    'visual trend identification',
    'seasonal content planning',
    'competitor pin strategy analysis',
    'shopping behavior tracking',
    'inspiration content curation'
  ],
  'Snapchat': [
    'AR filter performance analysis',
    'story engagement optimization',
    'demographic targeting refinement',
    'competitor campaign monitoring',
    'user behavior pattern analysis'
  ],
  'Reddit': [
    'community sentiment analysis',
    'trending discussion monitoring',
    'brand mention tracking',
    'competitor analysis in subreddits',
    'influencer identification in communities'
  ],
  'Discord': [
    'community engagement analysis',
    'moderation effectiveness tracking',
    'member growth pattern analysis',
    'competitor server monitoring',
    'content strategy optimization'
  ]
};

// Private case study directory (not included in public website)
const PRIVATE_CASES_DIR = path.join(__dirname, '../private-case-studies');

/**
 * Creates the private case studies directory if it doesn't exist
 */
function ensurePrivateDirectory() {
  if (!fs.existsSync(PRIVATE_CASES_DIR)) {
    fs.mkdirSync(PRIVATE_CASES_DIR, { recursive: true });
    console.log(`📁 Created private case studies directory: ${PRIVATE_CASES_DIR}`);
  }
}

/**
 * Generates a specialized prompt for social media case studies
 */
function generateSocialMediaPrompt(platform, useCase, startDate, endDate) {
  return `You are an expert in social media data analysis and web scraping. Generate a detailed case study about how a company used web scraping and data analysis to solve a business problem specifically related to ${platform}.

PLATFORM: ${platform}
USE CASE: ${useCase}
PUBLICATION DATE RANGE: ${startDate} to ${endDate}

Create a comprehensive case study with the following structure (return as valid JSON):

{
  "Title": "[Compelling title focusing on the social media platform and specific outcome]",
  "Subtitle": "[Detailed subtitle explaining the approach and business impact]",
  "Business Impact": "[Specific, quantifiable results achieved through the social media data analysis]",
  "Sector": "Social Media - ${platform}",
  "Platform": "${platform}",
  "Use Case": "${useCase}",
  "What data was collected": "[Detailed description of the specific social media data sources, APIs, and scraping targets]",
  "Why this matters": "[Explanation of why this social media data is critical for business success]",
  "Implementation time": "[Realistic timeframe for implementing this social media data solution]",
  "Problems this solves": "[Numbered list of specific business problems this social media analysis addresses]",
  "Why it was better to outsource this solution": "[Explanation of why outsourcing social media data collection was the right choice]",
  "Example_Input_JSON": {
    "[example input data structure for the social media scraping]": "[sample values]"
  },
  "Example_Output_JSON": {
    "[example output data structure]": "[sample processed data]"
  },
  "Matching algorithm used to integrate the data": "[Detailed explanation of how the social media data was processed and analyzed]",
  "Story": "[Comprehensive narrative explaining the challenge, solution, implementation, and results - formatted as HTML with <p> tags]",
  "publicationDate": "[random date between ${startDate} and ${endDate}]",
  "isPrivate": true,
  "sharingLevel": "private"
}

IMPORTANT REQUIREMENTS:
- Focus specifically on ${platform} and ${useCase}
- Include realistic social media metrics and KPIs
- Mention specific ${platform} features, algorithms, or behaviors
- Use actual social media terminology and concepts
- Include quantifiable results (engagement rates, reach, conversions, etc.)
- Make it sound like a real-world implementation
- Ensure the JSON is valid and properly formatted
- The story should be detailed and compelling
- Include specific technical details about data collection methods`;
}

/**
 * Calls the Gemini API with retry logic
 */
async function callGeminiAPI(prompt, model = DEFAULT_MODEL) {
  for (let attempt = 1; attempt <= MAX_API_RETRIES; attempt++) {
    try {
      console.log(`\t🔄 Calling Gemini API (Attempt ${attempt}/${MAX_API_RETRIES})...`);
      
      const response = await fetch(`https://generativeai.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`, {
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
            maxOutputTokens: 8192,
          }
        })
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`API Error: HTTP status ${response.status} ${response.statusText} - ${errorBody}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(`API Error: ${data.error.message}`);
      }
      
      if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
        console.warn("\t⚠️ API Warning: Response structure is valid but content is empty.", JSON.stringify(data, null, 2));
        throw new Error("API Error: Invalid response structure from Gemini (empty content).");
      }

      console.log('\t✅ Gemini API response received.');
      return data.candidates[0].content.parts[0].text;

    } catch (error) {
      console.warn(`\t⚠️ Gemini API call failed: ${error.message}`);
      if (attempt === MAX_API_RETRIES) {
        throw error;
      }
      const backoffTime = Math.pow(2, attempt) * 1000;
      console.log(`\t⏳ Retrying in ${backoffTime / 1000} seconds...`);
      await sleep(backoffTime);
    }
  }
}

/**
 * Validates and parses JSON response
 */
function validateAndParseJSON(rawResponse) {
  try {
    // Try to extract JSON from the response
    const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON object found in response");
    }
    
    const jsonStr = jsonMatch[0];
    const parsed = JSON.parse(jsonStr);
    
    // Validate required fields
    const requiredFields = ['Title', 'Subtitle', 'Business Impact', 'Sector', 'Platform', 'Use Case'];
    for (const field of requiredFields) {
      if (!parsed[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
    
    return parsed;
  } catch (error) {
    throw new Error(`JSON parsing failed: ${error.message}`);
  }
}

/**
 * Generates a single social media case study
 */
async function generateSingleSocialMediaCase(platform, useCase, startDate, endDate, model) {
  console.log(`\n🎯 Generating ${platform} case study: ${useCase}`);
  
  for (let attempt = 1; attempt <= MAX_VALIDATION_RETRIES + 1; attempt++) {
    try {
      const isRetry = attempt > 1;
      const prompt = generateSocialMediaPrompt(platform, useCase, startDate, endDate);
      const rawResponse = await callGeminiAPI(prompt, model);
      const caseStudy = validateAndParseJSON(rawResponse);

      // Add metadata
      caseStudy.isPrivate = true;
      caseStudy.sharingLevel = 'private';
      caseStudy.platform = platform;
      caseStudy.useCase = useCase;
      
      console.log(`\t✅ Successfully generated: "${caseStudy.Title}"`);
      return caseStudy;

    } catch (error) {
      console.error(`\t❌ Error during generation (Attempt ${attempt}/${MAX_VALIDATION_RETRIES + 1}): ${error.message}`);
      if (attempt > MAX_VALIDATION_RETRIES) {
        return null;
      }
      await sleep(DELAY_BETWEEN_CALLS_MS);
    }
  }
  return null;
}

/**
 * Saves a case study to the private directory
 */
function savePrivateCaseStudy(caseStudy, filename) {
  const filePath = path.join(PRIVATE_CASES_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(caseStudy, null, 2));
  console.log(`\t💾 Saved: ${filename}`);
  return filePath;
}

/**
 * Generates all social media case studies
 */
async function generateAllSocialMediaCases() {
  console.log('🚀 Starting generation of private social media case studies...\n');
  
  ensurePrivateDirectory();
  
  const startDate = '2025-01-01';
  const endDate = '2025-12-31';
  let caseNumber = 1;
  
  for (const [platform, useCases] of Object.entries(SOCIAL_MEDIA_PLATFORMS)) {
    console.log(`\n📱 Processing ${platform}...`);
    
    for (const useCase of useCases) {
      const caseStudy = await generateSingleSocialMediaCase(platform, useCase, startDate, endDate);
      
      if (caseStudy) {
        const filename = `social-media-${caseNumber.toString().padStart(3, '0')}-${platform.toLowerCase()}-${useCase.replace(/\s+/g, '-').toLowerCase()}.json`;
        savePrivateCaseStudy(caseStudy, filename);
        caseNumber++;
      }
      
      // Delay between requests
      await sleep(DELAY_BETWEEN_CALLS_MS);
    }
  }
  
  console.log(`\n🎉 Generation complete! Created ${caseNumber - 1} private social media case studies.`);
  console.log(`📁 Files saved in: ${PRIVATE_CASES_DIR}`);
  console.log(`\n💡 These case studies are private and won't appear on the public website.`);
  console.log(`🔗 You can share them privately via direct links or email.`);
}

/**
 * Sleep function
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  generateAllSocialMediaCases().catch(error => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
}

export { generateAllSocialMediaCases, SOCIAL_MEDIA_PLATFORMS };
