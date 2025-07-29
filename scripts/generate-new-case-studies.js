import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

// ================================================================= //
//                      CONFIGURATION & SETUP                        //
// ================================================================= //

// Load environment variables from a .env file
dotenv.config();

const GEMINI_API_KEY = process.env['gmini-api-key'];
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent';

// --- Script Settings ---
const DELAY_BETWEEN_CALLS_MS = 3000; // 3 seconds
const MAX_API_RETRIES = 3; // Retries for network/API errors
const MAX_VALIDATION_RETRIES = 2; // Retries if the generated JSON is invalid

// ================================================================= //
//                      COMMAND-LINE ARGUMENTS                       //
// ================================================================= //

function getCliArgs() {
    const args = process.argv.slice(2);
    const sector = args.find(arg => arg.startsWith('--sector='))?.split('=')[1] || 'Retail';
    const count = parseInt(args.find(arg => arg.startsWith('--count='))?.split('=')[1], 10) || 1;
    const startFrom = parseInt(args.find(arg => arg.startsWith('--start-from='))?.split('=')[1], 10) || 39;
    return { sector, count, startFrom };
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
 * @param {boolean} isRetry - If true, adds a note to the prompt to be more strict.
 * @returns {string} The complete prompt text.
 */
function generateCaseStudyPrompt(sector, isRetry = false) {
    const retryInstruction = isRetry ?
        `
    IMPORTANT: This is a retry due to a validation or formatting error.
    Pay strict attention to the required JSON structure and field requirements.
    Ensure the Story, Input Schema, and Output Schema are all logically connected.
    DO NOT output anything other than the single, complete, valid JSON object.` :
        '';

    return `
    You are an expert content creator for "Iceberg Data," a web scraping and data intelligence company.
    Your task is to generate a single, complete, high-quality case study in JSON format for the "${sector}" sector.

    CRITICAL INSTRUCTIONS:
    1.  **JSON ONLY:** Your entire output must be a single, raw, valid JSON object. Do not wrap it in markdown \`\`\`json blocks or include any other text.
    2.  **DEEP INTEGRATION:** The "Story" must be directly and logically reflected in the "Exact_Input_Schema" and "Exact_Output_Schema". The data mentioned in the story (e.g., "competitor check-ins", "ad creatives") MUST correspond to properties in the schemas.
    3.  **REALISTIC SCHEMAS:** The JSON schemas must be practical, detailed, and directly usable. Include clear descriptions, types, and realistic examples for each property.
    4.  **METRICS-DRIVEN:** The "Business Impact" and "Story" must feature specific, quantifiable metrics (e.g., "15-25% revenue boost," "reduced launch failures by up to 40%").
    5.  **COMPLETE & ACCURATE:** Fill out every single field in the provided JSON structure. Do not omit any. The publicationDate must be a valid date in 2024.

    ${retryInstruction}

    Below is a PERFECT example of the required output structure and quality. Use this as your guide:

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
      "Input Schema": "A JSON object listing brand-related hashtags, store geotags, competitor references, and the time frames to scrape. Example: { 'hashtags': ['#ShopXYZ'], 'geotags': ['StoreLocation1'], 'competitors': ['StoreABC'], 'time_frames': ['weekend'] }",
      "Output Schema": "A JSON object correlating mention spikes with footfall changes, competitor insights, and recommended marketing actions. Example: { 'location': 'StoreLocation1', 'mention_spike': 'Saturday 5pm', 'footfall_delta': 0.12, 'marketing_suggestions': [...] }",
      "Matching algorithm used to integrate the data": "Social posts tagged with a location or brand hashtag are matched to store coordinates. Footfall sensor logs are cross-referenced by time to detect correlation between online buzz and offline visits.",
      "Story": "<p>For retailers, aligning online buzz with in-store traffic can be challenging. One regional clothing chain faced this exact dilemma—until they partnered with <strong>Iceberg Data's web scraping experts</strong> for a solution.</p><p>Over 8-10 weeks, Iceberg Data's team set up advanced location-based queries to consistently capture public posts tagging the retailer's stores and competitor check-ins.</p><p>This approach revealed that whenever local influencers posted from the store, foot traffic would jump within hours. Armed with this intelligence from Iceberg Data, the retailer orchestrated micro-promotions to amplify organic social buzz, like flash sales and influencer partnerships.</p><p>By synchronizing online and offline efforts more effectively, the clothing chain boosted weekend foot traffic and average purchase size within months. The impact was significant—aligning digital marketing with store visits <strong>drove a 10-15% increase in overall sales</strong>.</p>",
      "publicationDate": "2024-12-05",
      "Exact_Input_Schema": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "type": "object",
        "properties": {
          "hashtags": { "type": "array", "items": { "type": "string" }, "description": "Array of brand-related hashtags to scrape" },
          "geotags": { "type": "array", "items": { "type": "string" }, "description": "Array of store location geotags to scrape" },
          "competitors": { "type": "array", "items": { "type": "string" }, "description": "Array of competitor store names to scrape for mentions" }
        },
        "required": ["hashtags", "geotags", "competitors"]
      },
      "Exact_Output_Schema": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "type": "object",
        "properties": {
          "location": { "type": "string", "description": "The identifier or name of the store location." },
          "mention_spike": { "type": "string", "description": "The day and time when a significant increase in online mentions occurred." },
          "footfall_delta": { "type": "number", "description": "The percentage change in footfall (customer visits)." },
          "marketing_suggestions": { "type": "array", "items": { "type": "string" }, "description": "Suggested marketing actions based on the analysis." }
        },
        "required": ["location", "mention_spike", "footfall_delta"]
      }
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
 * @returns {Promise<string>} The text response from the API.
 */
async function callGeminiAPI(prompt) {
    for (let attempt = 1; attempt <= MAX_API_RETRIES; attempt++) {
        try {
            console.log(`\tCalling Gemini API (Attempt ${attempt}/${MAX_API_RETRIES})...`);
            const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
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
                // Handle non-200 responses
                throw new Error(`API Error: HTTP status ${response.status} ${response.statusText}`);
            }

            const data = await response.json();

            if (data.error) {
                // Handle API-level errors (e.g., quota)
                throw new Error(`API Error: ${data.error.message}`);
            }
            
            if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
                throw new Error("API Error: Invalid response structure from Gemini.");
            }

            console.log('\t✅ Gemini API response received.');
            return data.candidates[0].content.parts[0].text;

        } catch (error) {
            console.warn(`\t⚠️ Gemini API call failed: ${error.message}`);
            if (attempt === MAX_API_RETRIES) {
                throw error; // Rethrow after final attempt
            }
            const backoffTime = Math.pow(2, attempt - 1) * 1000;
            console.log(`\t⏳ Retrying in ${backoffTime / 1000} seconds...`);
            await sleep(backoffTime);
        }
    }
}

/**
 * Validates the structure and content of the generated case study object.
 * @param {object} caseStudy - The parsed JSON object.
 * @returns {{isValid: boolean, errors: string[]}} Validation result.
 */
function validateCaseStudy(caseStudy) {
    const errors = [];
    const requiredFields = [
        'Title', 'Subtitle', 'Business Impact', 'Sector',
        'What data was collected', 'Why this matters', 'Implementation time',
        'Problems this solves', 'Why it was better to outsource this solution',
        'Input Schema', 'Output Schema', 'Matching algorithm used to integrate the data',
        'Story', 'publicationDate', 'Exact_Input_Schema', 'Exact_Output_Schema'
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
    if (caseStudy.publicationDate && !/^\d{4}-\d{2}-\d{2}$/.test(caseStudy.publicationDate)) {
        errors.push('publicationDate must be a string in YYYY-MM-DD format.');
    }

    // Validate JSON Schema structures
    ['Exact_Input_Schema', 'Exact_Output_Schema'].forEach(schemaKey => {
        const schema = caseStudy[schemaKey];
        if (!schema || typeof schema !== 'object') {
            errors.push(`${schemaKey} must be a valid object.`);
            return;
        }
        if (schema.type !== 'object') errors.push(`${schemaKey} "type" must be "object".`);
        if (!schema.properties || typeof schema.properties !== 'object') {
            errors.push(`${schemaKey} must have a "properties" object.`);
        }
        if (!schema.required || !Array.isArray(schema.required)) {
            errors.push(`${schemaKey} must have a "required" array.`);
        }
    });

    return { isValid: errors.length === 0, errors };
}

/**
 * Cleans the raw API response and attempts to parse it as JSON.
 * @param {string} rawResponse - The text response from the API.
 * @returns {object} The parsed JSON object.
 * @throws {Error} If parsing fails.
 */
function validateAndParseJSON(rawResponse) {
    let cleanedResponse = rawResponse.trim();

    // Find the first '{' and the last '}' to isolate the JSON object
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
    if (!fs.existsSync(casesDir)) {
        fs.mkdirSync(casesDir, { recursive: true });
    }

    const filename = `${caseNumber}.json`;
    const filepath = path.join(casesDir, filename);

    try {
        fs.writeFileSync(filepath, JSON.stringify(caseStudy, null, 2));
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
 * @returns {Promise<object|null>} The generated case study object or null on failure.
 */
async function generateSingleCaseStudy(sector, caseNumber) {
    console.log(`\n📝 Generating case study #${caseNumber} for the "${sector}" sector...`);

    for (let attempt = 1; attempt <= MAX_VALIDATION_RETRIES + 1; attempt++) {
        try {
            const isRetry = attempt > 1;
            const prompt = generateCaseStudyPrompt(sector, isRetry);
            const rawResponse = await callGeminiAPI(prompt);
            const caseStudy = validateAndParseJSON(rawResponse);

            const { isValid, errors } = validateCaseStudy(caseStudy);
            if (!isValid) {
                console.warn(`\t⚠️ Validation failed (Attempt ${attempt}/${MAX_VALIDATION_RETRIES + 1}):`);
                errors.forEach(e => console.warn(`\t   - ${e}`));
                if (attempt > MAX_VALIDATION_RETRIES) {
                    throw new Error("Exceeded max validation retries.");
                }
                console.log(`\t🔄 Retrying generation...`);
                await sleep(DELAY_BETWEEN_CALLS_MS);
                continue; // Go to the next iteration of the loop
            }

            console.log(`\t✅ Successfully generated and validated: "${caseStudy.Title}"`);
            return caseStudy;

        } catch (error) {
            console.error(`\t❌ Critical error during generation for case #${caseNumber}: ${error.message}`);
            if (attempt > MAX_VALIDATION_RETRIES) {
                return null; // Return null after the final failed attempt
            }
        }
    }
    return null; // Should not be reached, but as a fallback
}


/**
 * Main function to orchestrate the generation of multiple case studies.
 */
async function main() {
    console.log('=============================================');
    console.log('📚 Iceberg Data Case Study Generator (Gemini)');
    console.log('=============================================');

    checkApiKey();
    const { sector, count, startFrom } = getCliArgs();

    console.log(`\nConfiguration:`);
    console.log(`   - Sector: ${sector}`);
    console.log(`   - Count: ${count}`);
    console.log(`   - Starting Number: ${startFrom}`);
    
    const generatedFiles = [];
    const failedCases = [];

    for (let i = 0; i < count; i++) {
        const caseNumber = startFrom + i;
        const caseStudy = await generateSingleCaseStudy(sector, caseNumber);

        if (caseStudy) {
            try {
                const filepath = saveCaseStudy(caseStudy, caseNumber);
                generatedFiles.push(path.basename(filepath));
            } catch (saveError) {
                failedCases.push({ caseNumber, error: `File save failed: ${saveError.message}` });
            }
        } else {
            failedCases.push({ caseNumber, error: "Generation failed after all retries." });
        }

        if (i < count - 1) {
            console.log(`\n⏳ Waiting ${DELAY_BETWEEN_CALLS_MS / 1000}s before next call...`);
            await sleep(DELAY_BETWEEN_CALLS_MS);
        }
    }

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
}

// --- Run the script ---
main().catch(error => {
    console.error('\n❌ A critical error occurred in the main script execution:', error);
    process.exit(1);
});
