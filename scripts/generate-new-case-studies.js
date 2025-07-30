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
// Default model - can be overridden via --model parameter.
const DEFAULT_MODEL = 'gemini-1.5-pro-latest'; 

// --- Script Settings ---
const DELAY_BETWEEN_CALLS_MS = 1000; // 1 second
const MAX_API_RETRIES = 3; // Retries for network/API errors
const MAX_VALIDATION_RETRIES = 2; // Retries if the generated JSON is invalid
const CONCURRENT_REQUESTS = 5; // Number of concurrent requests (increased for faster generation)

// ================================================================= //
//                      COMMAND-LINE ARGUMENTS                       //
// ================================================================= //

function getCliArgs() {
    const args = process.argv.slice(2);
    const sector = args.find(arg => arg.startsWith('--sector='))?.split('=')[1] || 'Retail';
    const count = parseInt(args.find(arg => arg.startsWith('--count='))?.split('=')[1], 10) || 1;
    const startFrom = parseInt(args.find(arg => arg.startsWith('--start-from='))?.split('=')[1], 10) || 1;
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
 * This version encourages topic diversity by providing brainstorming ideas and a specific theme.
 * @param {string} sector - The business sector for the case study.
 * @param {string} sub_theme - A specific business problem or theme to focus on.
 * @param {string} startDate - The start date for the publication date range.
 * @param {string} endDate - The end date for the publication date range.
 * @param {boolean} isRetry - If true, adds a note to the prompt to be more strict.
 * @returns {string} The complete prompt text.
 */
function generateCaseStudyPrompt(sector, sub_theme, startDate, endDate, isRetry = false) {
    const retryInstruction = isRetry ?
        `
    IMPORTANT: This is a retry due to a validation or formatting error. Pay strict attention to the required JSON structure and field requirements. Ensure the Story, Input JSON, and Output JSON are all logically connected. DO NOT output anything other than the single, complete, valid JSON object.` :
        '';

    return `
    You are an expert content creator for "Iceberg Data," a web scraping and data intelligence company.
    Your task is to generate a single, complete, and unique case study in JSON format for the "${sector}" sector.

    --- TASK DIRECTIVES ---
    1.  **FOCUS THEME:** For this generation, you MUST focus on the specific theme of: **"${sub_theme}"**. All aspects of the case study—the title, problem, story, and JSON examples—must revolve around this theme.
    2.  **BE CREATIVE & UNIQUE:** Do NOT simply copy the patterns from the example below. Your primary goal is to generate a case study that is conceptually different from previous ones. Explore niche problems within the "${sector}" sector related to the theme.
    3.  **DIVERSE TITLES:** Create a compelling, specific title. Avoid generic titles. Here are some formats to inspire you, but do not copy them directly:
        -   [Action Verb] [Metric] by [Methodology]: "Boosting Accessory Sales by 25% through Predictive Trend Analysis"
        -   [Goal-Oriented]: "Dynamic Pricing Strategy for Perishable Goods Using Competitor Stock Monitoring"
        -   [Problem/Solution]: "Solving Supply Chain Bottlenecks with Real-Time Logistics Data"
        -   [Insight-Driven]: "Uncovering New Market Segments by Analyzing Customer Review Data"

    --- BRAINSTORMING: POTENTIAL USE CASES FOR THE "${sector.toUpperCase()}" SECTOR ---
    To ensure diversity, consider problems across the entire value chain, not just marketing:
    -   **Competitive Intelligence:** Monitoring competitor pricing, promotions, product launches, or new store openings.
    -   **Operational Efficiency:** Optimizing supply chains by tracking shipping and logistics data; monitoring inventory levels from public supplier portals.
    -   **Market Analysis:** Identifying expansion opportunities by analyzing regional demand indicators or demographic data.
    -   **Product Development:** Scraping customer reviews and social media to find feature requests or complaints to inform R&D.
    -   **Risk & Compliance:** Ensuring pricing consistency across all channels or monitoring for brand infringement online.
    -   **Customer Sentiment:** Analyzing public reviews and forum discussions to gauge brand perception and product satisfaction.

    --- CRITICAL JSON & CONTENT REQUIREMENTS ---
    * **JSON ONLY:** Your entire output must be a single, raw, valid JSON object. Do not wrap it in markdown \`\`\`json blocks.
    * **DEEP INTEGRATION:** The "Story" must be logically reflected in the "Example_Input_JSON" and "Example_Output_JSON". The data mentioned in the story MUST correspond to properties in the JSON objects.
    * **METRICS-DRIVEN:** The "Business Impact" and "Story" must feature specific, quantifiable metrics.
    * **FIRST-PERSON STORY:** Write the "Story" in the FIRST PERSON ("our team," "we").
    * **STORY LENGTH & FORMAT:** The "Story" must be AT LEAST 800 words and formatted with HTML <p> and <strong> tags.
    * **NO CUSTOMER NAMES:** Use generic terms like "a regional retailer," "the client," etc.
    * **COMPLETE & ACCURATE:** Fill out every single field. Use "2025-03-15" as a placeholder for publicationDate.
    ${retryInstruction}

    --- STRUCTURAL EXAMPLE (FOR FORMATTING ONLY) ---
    The following example shows the required JSON structure, field names, and data types.
    **DO NOT COPY THE TOPIC OR CONTENT.** Your task is to invent a NEW use case based on the **"${sub_theme}"** theme.

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
      "Example_Input_JSON": { "client_id": "client-abc-123", "job_type": "footfall_analysis" },
      "Example_Output_JSON": { "report_id": "report-xyz-987", "generated_at": "2025-06-01T10:00:00Z" },
      "Matching algorithm used to integrate the data": "Social posts tagged with a location or brand hashtag are matched to store coordinates using geospatial analysis...",
      "Story": "<p>For retailers, aligning online buzz with in-store traffic can be challenging...</p>",
      "publicationDate": "2025-03-15"
    }
    --- END OF EXAMPLE ---

    Now, generate a new, unique case study for the "${sector}" sector, focusing on the theme of "${sub_theme}", following all instructions.
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
                        temperature: 0.85,
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
            const backoffTime = Math.pow(2, attempt) * 1000;
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

    for (const field of requiredFields) {
        if (!caseStudy[field]) {
            errors.push(`Missing required top-level field: "${field}"`);
        }
    }

    if (caseStudy.Story && (!caseStudy.Story.includes('<p>') || !caseStudy.Story.includes('<strong>'))) {
        errors.push('Story must contain HTML <p> and <strong> tags.');
    }
    
    if (caseStudy.Story) {
        const wordCount = caseStudy.Story.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
        if (wordCount < 800) {
            errors.push(`Story must be at least 800 words long, but found only ${wordCount} words.`);
        }
    }

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

const USE_CASE_THEMES = [
    "Competitive Pricing Intelligence",
    "Supply Chain & Logistics Optimization",
    "Market Expansion Analysis",
    "Product Feature Gap Analysis from Customer Reviews",
    "Dynamic Pricing and Promotion Strategy",
    "Customer Sentiment and Brand Perception Tracking",
    "Regulatory Compliance Monitoring",
    "Identifying Influencer Marketing Opportunities",
    "Optimizing Store Layouts with Foot Traffic Data",
    "Predictive Inventory Management"
];

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
    const sub_theme = USE_CASE_THEMES[Math.floor(Math.random() * USE_CASE_THEMES.length)];
    
    console.log(`\n📝 Generating case study #${caseNumber} for "${sector}" with theme: "${sub_theme}"...`);

    for (let attempt = 1; attempt <= MAX_VALIDATION_RETRIES + 1; attempt++) {
        try {
            const isRetry = attempt > 1;
            const prompt = generateCaseStudyPrompt(sector, sub_theme, startDate, endDate, isRetry);
            const rawResponse = await callGeminiAPI(prompt, model);
            const caseStudy = validateAndParseJSON(rawResponse);

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
