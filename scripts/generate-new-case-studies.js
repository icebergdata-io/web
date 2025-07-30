import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

// ================================================================= //
//                      CONFIGURATION & SETUP                        //
// ================================================================= //

// Load environment variables from a .env file
dotenv.config();

// Standardized API key lookup
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// Default model - can be overridden via --model parameter. Corrected to a valid model name.
const DEFAULT_MODEL = 'gemini-2.5-pro';

// --- Script Settings ---
const DELAY_BETWEEN_CALLS_MS = 1000; // 1 second
const MAX_API_RETRIES = 3; // Retries for network/API errors
const MAX_VALIDATION_RETRIES = 2; // Retries if the generated JSON is invalid
const CONCURRENT_REQUESTS = 3; // Number of concurrent requests (conservative for gemini-2.5-pro)

// ================================================================= //
//                      COMMAND-LINE ARGUMENTS                       //
// ================================================================= //

function getCliArgs() {
    const args = process.argv.slice(2);
    const sector = args.find(arg => arg.startsWith('--sector='))?.split('=')[1] || 'Retail';
    const count = parseInt(args.find(arg => arg.startsWith('--count='))?.split('=')[1], 10) || 1;
    const startFrom = parseInt(args.find(arg => arg.startsWith('--start-from='))?.split('=')[1], 10) || 39;
    const startDate = args.find(arg => arg.startsWith('--start-date='))?.split('=')[1] || '2025-02-01';
    const endDate = args.find(arg => arg.startsWith('--end-date='))?.split('=')[1] || '2025-07-31';
    const model = args.find(arg => arg.startsWith('--model='))?.split('=')[1] || DEFAULT_MODEL;
    return { sector, count, startFrom, startDate, endDate, model };
}


// ================================================================= //
//                        CORE HELPER FUNCTIONS                      //
// ================================================================= //

/**
 * Pauses execution for a specified duration.
 * @param {number} ms - The number of milliseconds to wait.
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generates a random date between two dates.
 * @param {string} startDate - Start date in YYYY-MM-DD format.
 * @param {string} endDate - End date in YYYY-MM-DD format.
 * @returns {string} Random date in YYYY-MM-DD format.
 */
function generateRandomDate(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
    const randomDate = new Date(randomTime);
    
    // Format as YYYY-MM-DD
    const year = randomDate.getFullYear();
    const month = String(randomDate.getMonth() + 1).padStart(2, '0');
    const day = String(randomDate.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}

/**
 * Checks if the Gemini API key is available in the environment variables.
 */
function checkApiKey() {
    if (!GEMINI_API_KEY) {
        console.error('❌ FATAL: GEMINI_API_KEY environment variable is not set.');
        console.error('   Please create a .env file and add GEMINI_API_KEY="your_key_here"');
        process.exit(1);
    }
}


// ================================================================= //
//                      AI PROMPT ENGINEERING                        //
// ================================================================= //

/**
 * Generates the detailed prompt for the Gemini API.
 * This prompt includes a high-quality example to guide the AI's output (one-shot prompting).
 * @param {string} sector - The business sector for the case study.
 * @param {string} startDate - The start date for the publication date range.
 * @param {string} endDate - The end date for the publication date range.
 * @param {boolean} isRetry - If true, adds a note to the prompt to be more strict.
 * @returns {string} The complete prompt text.
 */
function generateCaseStudyPrompt(sector, startDate, endDate, isRetry = false) {
    const retryInstruction = isRetry ?
        `
    IMPORTANT: This is a retry due to a validation or formatting error.
    Pay strict attention to the required JSON structure and field requirements.
    Ensure the Story, Input JSON, and Output JSON are all logically connected.
    CRITICAL: The "Story" field MUST use HTML formatting with <p> tags for paragraphs and <strong> tags for emphasis.
    CRITICAL: Do NOT mention specific customer names in the "Story" - use generic terms like "the client," "the retailer," etc.
    CRITICAL: The publicationDate field will be automatically generated - use "2025-03-15" as placeholder.
    DO NOT output anything other than the single, complete, valid JSON object.` :
        '';

    return `
    You are an expert content creator for "Iceberg Data," a web scraping and data intelligence company.
    Your task is to generate a single, complete, high-quality case study in JSON format for the "${sector}" sector.

    CRITICAL INSTRUCTIONS:
    1.  **JSON ONLY:** Your entire output must be a single, raw, valid JSON object. Do not wrap it in markdown \`\`\`json blocks or include any other text.
    2.  **DEEP INTEGRATION:** The "Story" must be directly and logically reflected in the "Example_Input_JSON" and "Example_Output_JSON". The data mentioned in the story (e.g., "competitor check-ins", "ad creatives") MUST correspond to properties in the JSON objects.
    3.  **JSON EXAMPLES, NOT SCHEMAS:** The "Example_Input_JSON" and "Example_Output_JSON" fields are NOT schema definitions. They must be complete, concrete JSON objects filled with realistic example data, representing exactly what a user would POST as input or GET as output.
    4.  **METRICS-DRIVEN:** The "Business Impact" and "Story" must feature specific, quantifiable metrics (e.g., "15-25% revenue boost," "reduced launch failures by up to 40%").
    5.  **FIRST-PERSON STORY:** The "Story" must be written in FIRST PERSON perspective using "our team", "we", "us" instead of "Iceberg Data". Example: "They engaged with our team" not "They engaged Iceberg Data".
    6.  **STORY LENGTH:** The "Story" must be AT LEAST 800 words long. This is a comprehensive case study that should include detailed context, methodology, challenges, solutions, and results.
    7.  **HTML FORMATTING:** The "Story" MUST be formatted with HTML tags. Use <p> tags for paragraphs and <strong> tags for emphasis. Example: "<p>This is a paragraph.</p><p>This is another paragraph with <strong>bold text</strong>.</p>"
    8.  **NO CUSTOMER NAMES:** Do NOT mention specific customer names, company names, or client names in the "Story" or descriptions. Use generic terms like "a regional car rental company," "the retailer," "the client," etc. You CAN mention competitor names (Hertz, Avis, etc.) in JSON examples.
    9.  **COMPLETE & ACCURATE:** Fill out every single field in the provided JSON structure. Do not omit any. The publicationDate field will be automatically generated - you can use "2025-03-15" as a placeholder.

    ${retryInstruction}

    Below is a PERFECT example of the required output structure and quality. Use this as your guide:
    
    **IMPORTANT:** Notice how the "Story" field uses HTML formatting with <p> tags for paragraphs and <strong> tags for emphasis. Your story MUST follow this exact HTML formatting pattern.

    --- EXAMPLE START ---
    {
      "Title": "Omnichannel Footfall Analysis by Tracking Public Mentions & Store Check-ins",
      "Subtitle": "Aligning Digital Marketing With Real-World Store Visits",
      "Business Impact": "By correlating in-store footfall data with public digital check-ins and social media mentions, retailers can adjust promotions to boost overall sales by 10-15%.",
      "Sector": "Retail",
      "What data was collected": "Publicly visible store check-ins on social media (e.g., Facebook), user posts tagging store locations, competitor footfall statistics from public news or aggregator sites, and internal sensor data.",
      "Why this matters": "Foot traffic is increasingly influenced by online buzz. Tying public store mention trends to offline visitor counts ensures marketing campaigns stay relevant and well-timed.",
      "Implementation time": "8 to 10 weeks, needing social platform scraping for location-based mentions, data correlation with internal store sensors, and a campaign analysis dashboard.",
      "Problems this solves": "1) Disconnected online vs. offline performance insights. 2) Poor event planning due to unknown store visitation patterns. 3) Inability to measure how public hype correlates with actual visits.",
      "Why it was better to outsource this solution": "A web scraping partner navigates social media’s advanced location queries, consistently capturing public mentions of the store and competitor check-ins that can be tricky to track manually.",
      "Example_Input_JSON": {
        "client_id": "client-abc-123",
        "job_type": "footfall_analysis",
        "target_locations": [
          {
            "store_id": "XYZ-001",
            "address": "123 Main St, Springfield, IL",
            "geotag_id": "XYZ_Springfield_Main"
          },
          {
            "store_id": "XYZ-002",
            "address": "456 Oak Ave, Springfield, IL",
            "geotag_id": "XYZ_Springfield_Oak"
          }
        ],
        "competitor_ids": ["StoreABC", "BrandDEF"],
        "social_platforms": ["instagram", "facebook", "twitter"],
        "keywords_to_track": ["#ShopXYZ", "#XYZSale", "new collection"],
        "date_range": {
          "start": "2025-05-01",
          "end": "2025-05-31"
        },
        "report_frequency": "daily"
      },
      "Example_Output_JSON": {
        "report_id": "report-xyz-987",
        "generated_at": "2025-06-01T10:00:00Z",
        "analysis_period": {
          "start": "2025-05-01",
          "end": "2025-05-31"
        },
        "location_summary": [
          {
            "store_id": "XYZ-001",
            "total_mentions": 1250,
            "peak_mention_time": "2025-05-18T15:30:00Z",
            "correlated_footfall_increase": 0.18,
            "top_influencers": [
              { "username": "@styleguru", "followers": 55000, "impact_score": 0.85 },
              { "username": "@springfieldshopper", "followers": 12000, "impact_score": 0.72 }
            ],
            "sentiment": { "positive": 0.85, "neutral": 0.10, "negative": 0.05 },
            "marketing_recommendation": "Amplify influencer content on Saturday afternoons. Consider a flash sale on 'new collection' items."
          },
          {
            "store_id": "XYZ-002",
            "total_mentions": 850,
            "peak_mention_time": "2025-05-25T19:00:00Z",
            "correlated_footfall_increase": 0.11,
            "top_influencers": [],
            "sentiment": { "positive": 0.75, "neutral": 0.20, "negative": 0.05 },
            "marketing_recommendation": "Boost local ad spend for this location during evening hours."
          }
        ],
        "competitor_benchmark": {
          "StoreABC": { "mentions": 980, "sentiment": 0.70 },
          "BrandDEF": { "mentions": 1100, "sentiment": 0.65 }
        }
      },
      "Matching algorithm used to integrate the data": "Social posts tagged with a location or brand hashtag are matched to store coordinates using geospatial analysis. Footfall sensor logs, identified by timestamp and store ID, are then cross-referenced by time to detect statistically significant correlations between online buzz and offline visits within a predefined time window (e.g., 2-4 hours).",
      "Story": "<p>For retailers, aligning online buzz with in-store traffic can be challenging. One regional clothing chain faced this exact dilemma—until they partnered with <strong>our web scraping experts</strong> for a solution.</p><p>The retailer, operating 45 stores across the Midwest, was struggling to understand the correlation between their social media presence and actual store visits. Their marketing team was spending significant resources on influencer partnerships and social media campaigns, but they couldn't measure the direct impact on foot traffic or sales. This lack of visibility was costing them both money and market opportunities.</p><p>Our team began by conducting a comprehensive analysis of their current social media landscape. We identified that while the retailer had a strong online presence, they were missing crucial data points that could connect digital engagement to physical store performance. The challenge was to create a system that could track public mentions, check-ins, and social media activity in real-time and correlate this data with their internal foot traffic sensors.</p><p>Over 8-10 weeks, our team set up advanced location-based queries to consistently capture public posts tagging the retailer's stores and competitor check-ins. We deployed sophisticated web scraping tools that monitored multiple social media platforms simultaneously, including Facebook, Instagram, Twitter, and TikTok. Our system was designed to capture not just direct mentions, but also location-based posts, hashtag usage, and even competitor activity in the same geographic areas.</p><p>The technical implementation involved creating custom APIs that could handle the high volume of social media data while maintaining accuracy and avoiding rate limiting. We developed a sophisticated filtering system that could distinguish between relevant mentions and spam, ensuring that only quality data was included in the analysis. Additionally, we integrated with the retailer's existing foot traffic sensors to create a unified data stream.</p><p>This approach revealed that whenever local influencers posted from the store, foot traffic would jump within hours. We discovered specific patterns that the retailer had never noticed before. For instance, posts featuring certain product categories during specific time windows consistently drove higher foot traffic. We also identified that competitor mentions in the same geographic area often preceded increased traffic to the retailer's stores, suggesting that social media was creating general shopping interest in the area.</p><p>Armed with this intelligence from our team, the retailer orchestrated micro-promotions to amplify organic social buzz, like flash sales and influencer partnerships. They began timing their promotions to coincide with peak social media activity periods we had identified. The marketing team started working more closely with local influencers, providing them with real-time data about which products and messaging were driving the most engagement.</p><p>The retailer also implemented a dynamic pricing strategy based on our social media insights. When we detected increased social media activity around certain products, they would adjust pricing and inventory accordingly. This real-time responsiveness gave them a significant competitive advantage in their market.</p><p>By synchronizing online and offline efforts more effectively, the clothing chain boosted weekend foot traffic and average purchase size within months. The impact was significant—aligning digital marketing with store visits <strong>drove a 10-15% increase in overall sales</strong>. The retailer reported that their marketing ROI improved by 40% within the first quarter of implementation, and they were able to reduce their customer acquisition costs by 25%.</p><p>Perhaps most importantly, the retailer gained a competitive advantage that was difficult for others to replicate. While competitors were still relying on traditional marketing metrics, this retailer now had real-time insights into how social media was driving physical store performance. This allowed them to make faster, more informed decisions about their marketing spend and store operations.</p><p>The success of this project led to an expanded partnership, with our team now providing ongoing monitoring and analysis services. The retailer has since expanded this approach to all 45 of their locations, creating a comprehensive social media intelligence system that continues to drive measurable business results.</p>",
      "publicationDate": "2025-03-15"
    }
    --- EXAMPLE END ---

    Now, generate a new, unique case study for the "${sector}" sector following all instructions.
    `;
}


// ================================================================= //
//                       API & DATA HANDLING                         //
// ================================================================= //

/**
 * Calls the Gemini API with a given prompt and handles retries.
 * @param {string} prompt - The prompt to send to the API.
 * @param {string} model - The model name to use for the API call.
 * @returns {Promise<string>} The text response from the API.
 */
async function callGeminiAPI(prompt, model) {
    for (let attempt = 1; attempt <= MAX_API_RETRIES; attempt++) {
        try {
            console.log(`\tCalling Gemini API (Attempt ${attempt}/${MAX_API_RETRIES})...`);
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
            const response = await fetch(`${apiUrl}?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: {
                        temperature: 0.75,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 8192,
                        response_mime_type: "application/json",
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
                throw error; // Rethrow after final attempt
            }
            const backoffTime = Math.pow(2, attempt) * 1000; // Increased backoff
            console.log(`\t⏳ Retrying in ${backoffTime / 1000} seconds...`);
            await sleep(backoffTime);
        }
    }
}

/**
 * Validates the structure and content of the generated case study object.
 * @param {object} caseStudy - The parsed JSON object.
 * @param {string} startDate - The start date for validation.
 * @param {string} endDate - The end date for validation.
 * @returns {{isValid: boolean, errors: string[]}} Validation result.
 */
function validateCaseStudy(caseStudy, startDate, endDate) {
    const errors = [];
    const requiredFields = [
        'Title', 'Subtitle', 'Business Impact', 'Sector',
        'What data was collected', 'Why this matters', 'Implementation time',
        'Problems this solves', 'Why it was better to outsource this solution',
        'Matching algorithm used to integrate the data', 'Story', 'publicationDate',
        'Example_Input_JSON', 'Example_Output_JSON'
    ];

    // Check for missing top-level fields
    for (const field of requiredFields) {
        if (!caseStudy[field]) {
            errors.push(`Missing required top-level field: "${field}"`);
        }
    }

    // Check content of specific fields
    if (caseStudy.Story && (!caseStudy.Story.includes('<p>') || !caseStudy.Story.includes('<strong>'))) {
        errors.push('Story must contain HTML <p> and <strong> tags.');
    }
    
    if (caseStudy.Story) {
        const wordCount = caseStudy.Story.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
        if (wordCount < 800) {
            errors.push(`Story must be at least 800 words long, but found only ${wordCount} words.`);
        }
    }

    // Note: publicationDate will be automatically generated and injected by the code
    // We only validate it if it exists and is not the placeholder
    if (caseStudy.publicationDate && caseStudy.publicationDate !== "2025-03-15") {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(caseStudy.publicationDate)) {
            errors.push(`publicationDate must be a string in YYYY-MM-DD format, but got "${caseStudy.publicationDate}".`);
        } else {
            const date = new Date(caseStudy.publicationDate);
            const startDateObj = new Date(startDate);
            const endDateObj = new Date(endDate);
            if (isNaN(date.getTime()) || date < startDateObj || date > endDateObj) {
                errors.push(`publicationDate "${caseStudy.publicationDate}" must be a valid date between ${startDate} and ${endDate}.`);
            }
        }
    }

    // Validate JSON example objects
    if (caseStudy.Example_Input_JSON && (typeof caseStudy.Example_Input_JSON !== 'object' || Array.isArray(caseStudy.Example_Input_JSON) || caseStudy.Example_Input_JSON === null)) {
        errors.push('Example_Input_JSON must be a valid JSON object.');
    }
    if (caseStudy.Example_Output_JSON && (typeof caseStudy.Example_Output_JSON !== 'object' || Array.isArray(caseStudy.Example_Output_JSON) || caseStudy.Example_Output_JSON === null)) {
        errors.push('Example_Output_JSON must be a valid JSON object.');
    }

    return { isValid: errors.length === 0, errors };
}

/**
 * Cleans the raw API response and attempts to parse it as JSON.
 * @param {string} rawResponse - The text response from the API.
 * @returns {object} The parsed JSON object.
 * @throws {Error} If parsing fails.
 */
function validateAndParseJSON(rawResponse) {
    if (!rawResponse || typeof rawResponse !== 'string') {
        throw new Error("Cannot parse empty or non-string response.");
    }
    let cleanedResponse = rawResponse.trim();

    const jsonStartIndex = cleanedResponse.indexOf('{');
    const jsonEndIndex = cleanedResponse.lastIndexOf('}');

    if (jsonStartIndex === -1 || jsonEndIndex === -1 || jsonEndIndex < jsonStartIndex) {
        throw new Error("Could not find a valid JSON object in the response.");
    }

    cleanedResponse = cleanedResponse.substring(jsonStartIndex, jsonEndIndex + 1);

    try {
        return JSON.parse(cleanedResponse);
    } catch (parseError) {
        throw new Error(`JSON Parsing Failed: ${parseError.message}`);
    }
}


/**
 * Saves the case study object to a JSON file.
 * @param {object} caseStudy - The case study object.
 * @param {number} caseNumber - The file number.
 * @returns {string} The path to the saved file.
 */
function saveCaseStudy(caseStudy, caseNumber) {
    const casesDir = path.join(process.cwd(), 'public', 'articles', 'cases');
    fs.mkdirSync(casesDir, { recursive: true });

    const filename = `${caseNumber}.json`;
    const filepath = path.join(casesDir, filename);

    try {
        fs.writeFileSync(filepath, JSON.stringify(caseStudy, null, 2), 'utf-8');
        console.log(`\t💾 Successfully saved case study to: ${path.relative(process.cwd(), filepath)}`);
        return filepath;
    } catch (error) {
        console.error(`\t❌ Error saving file ${filename}:`, error.message);
        throw error;
    }
}


// ================================================================= //
//                      MAIN EXECUTION LOGIC                         //
// ================================================================= //

/**
 * Generates a single case study, handling retries for validation.
 * @param {string} sector - The business sector.
 * @param {number} caseNumber - The current case number.
 * @param {string} startDate - The start date for the publication date range.
 * @param {string} endDate - The end date for the publication date range.
 * @param {string} model - The model name to use.
 * @returns {Promise<object|null>} The generated case study object or null on failure.
 */
async function generateSingleCaseStudy(sector, caseNumber, startDate, endDate, model) {
    console.log(`\n📝 Generating case study #${caseNumber} for the "${sector}" sector...`);

    for (let attempt = 1; attempt <= MAX_VALIDATION_RETRIES + 1; attempt++) {
        try {
            const isRetry = attempt > 1;
            const prompt = generateCaseStudyPrompt(sector, startDate, endDate, isRetry);
            const rawResponse = await callGeminiAPI(prompt, model);
            const caseStudy = validateAndParseJSON(rawResponse);

            // Generate and inject a random publication date
            const randomPublicationDate = generateRandomDate(startDate, endDate);
            caseStudy.publicationDate = randomPublicationDate;
            console.log(`\t📅 Generated random publication date: ${randomPublicationDate}`);

            const { isValid, errors } = validateCaseStudy(caseStudy, startDate, endDate);
            if (!isValid) {
                console.warn(`\t⚠️ Validation failed (Attempt ${attempt}/${MAX_VALIDATION_RETRIES + 1}):`);
                errors.forEach(e => console.warn(`\t   - ${e}`));
                if (attempt > MAX_VALIDATION_RETRIES) {
                    throw new Error("Exceeded max validation retries.");
                }
                console.log(`\t🔄 Retrying generation...`);
                await sleep(DELAY_BETWEEN_CALLS_MS);
                continue;
            }

            console.log(`\t✅ Successfully generated and validated: "${caseStudy.Title}"`);
            return caseStudy;

        } catch (error) {
            console.error(`\t❌ Critical error during generation for case #${caseNumber}: ${error.message}`);
            if (attempt > MAX_VALIDATION_RETRIES) {
                return null;
            }
        }
    }
    return null;
}


/**
 * Processes case studies in batches with controlled concurrency.
 * @param {string} sector - The business sector.
 * @param {number[]} caseNumbers - Array of case numbers to generate.
 * @param {string} startDate - Start date for publication.
 * @param {string} endDate - End date for publication.
 * @param {string} model - The model name to use.
 * @returns {Promise<Array>} Array of results (success/failure).
 */
async function processCaseStudiesConcurrently(sector, caseNumbers, startDate, endDate, model) {
    const results = [];
    
    for (let i = 0; i < caseNumbers.length; i += CONCURRENT_REQUESTS) {
        const batch = caseNumbers.slice(i, i + CONCURRENT_REQUESTS);
        console.log(`\n🔄 Processing batch ${Math.floor(i / CONCURRENT_REQUESTS) + 1}/${Math.ceil(caseNumbers.length / CONCURRENT_REQUESTS)} (${batch.length} case studies)...`);
        
        const batchPromises = batch.map(async (caseNumber) => {
            try {
                const caseStudy = await generateSingleCaseStudy(sector, caseNumber, startDate, endDate, model);
                if (caseStudy) {
                    const filepath = saveCaseStudy(caseStudy, caseNumber);
                    return { success: true, caseNumber, filepath: path.basename(filepath) };
                } else {
                    return { success: false, caseNumber, error: "Generation failed after all retries." };
                }
            } catch (error) {
                return { success: false, caseNumber, error: error.message };
            }
        });
        
        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults);
        
        if (i + CONCURRENT_REQUESTS < caseNumbers.length) {
            console.log(`⏳ Waiting ${DELAY_BETWEEN_CALLS_MS / 1000}s before next batch...`);
            await sleep(DELAY_BETWEEN_CALLS_MS);
        }
    }
    
    return results;
}

/**
 * Main function to orchestrate the generation of multiple case studies.
 */
async function main() {
    console.log('=============================================');
    console.log('📚 Iceberg Data Case Study Generator (Gemini)');
    console.log('=============================================');

    checkApiKey();
    const { sector, count, startFrom, startDate, endDate, model } = getCliArgs();

    console.log('\nConfiguration:');
    console.log(`   - Sector: ${sector}`);
    console.log(`   - Count: ${count}`);
    console.log(`   - Starting Number: ${startFrom}`);
    console.log(`   - Date Range: ${startDate} to ${endDate}`);
    console.log(`   - Model: ${model}`);
    console.log(`   - Concurrent Requests: ${CONCURRENT_REQUESTS}`);
    
    const caseNumbers = Array.from({ length: count }, (_, i) => startFrom + i);
    
    const results = await processCaseStudiesConcurrently(sector, caseNumbers, startDate, endDate, model);
    
    const generatedFiles = results.filter(r => r.success).map(r => r.filepath);
    const failedCases = results.filter(r => !r.success);

    console.log('\n\n🎉 Generation Complete!');
    console.log('--------------------------------');
    
    if (generatedFiles.length > 0) {
        console.log(`✅ ${generatedFiles.length} case studies generated successfully:`);
        generatedFiles.forEach(file => console.log(`   - ${file}`));
    }
    
    if (failedCases.length > 0) {
        console.error(`\n❌ ${failedCases.length} case studies failed:`);
        failedCases.forEach(fail => console.error(`   - Case #${fail.caseNumber}: ${fail.error}`));
        process.exit(1);
    }

    console.log('\nAll tasks completed successfully.');
}

// --- Run the script ---
main().catch(error => {
    console.error('\n❌ A critical error occurred in the main script execution:', error);
    process.exit(1);
});