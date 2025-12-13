import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://www.icebergdata.co';
const PROPERTY_URL = `sc-domain:icebergdata.co`;
const SERVICE_ACCOUNT_PATH = path.join(__dirname, '../iceberg-atlas-c719b15e9a05.json');

/**
 * Authenticate with Google Search Console API
 */
async function authenticate() {
  if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
    throw new Error(`Service account file not found at: ${SERVICE_ACCOUNT_PATH}`);
  }

  console.log('🔐 Authenticating with Google Search Console API...');
  const serviceAccount = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_PATH, 'utf8'));
  
  const auth = new google.auth.GoogleAuth({
    credentials: serviceAccount,
    scopes: [
      'https://www.googleapis.com/auth/webmasters.readonly',
      'https://www.googleapis.com/auth/webmasters'
    ]
  });
  
  return await auth.getClient();
}

/**
 * Request indexing for a URL
 */
async function requestIndexing(url, searchconsole) {
  try {
    const response = await searchconsole.urlInspection.index.requestIndexing({
      requestBody: {
        inspectionUrl: url,
        siteUrl: PROPERTY_URL
      }
    });

    return {
      success: true,
      inspectionUrl: response.data?.inspectionUrl || url
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      code: error.code
    };
  }
}

/**
 * Delay function
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Batch request indexing for URLs
 */
async function batchRequestIndexing(urls) {
  console.log(`🚀 Starting batch indexing requests for ${urls.length} URLs...\n`);
  
  const auth = await authenticate();
  const searchconsole = google.searchconsole({ version: 'v1', auth });

  const results = [];
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    console.log(`[${i + 1}/${urls.length}] Requesting indexing: ${url}`);
    
    const result = await requestIndexing(url, searchconsole);
    results.push({ url, ...result });

    if (result.success) {
      successCount++;
      console.log(`   ✅ Success`);
    } else {
      failCount++;
      console.log(`   ❌ Failed: ${result.error}`);
      if (result.code === 429) {
        console.log(`   ⚠️  Rate limit hit. Waiting 60 seconds...`);
        await delay(60000);
      }
    }

    // Rate limiting: Google allows 200 requests per day, so we space them out
    if (i < urls.length - 1) {
      await delay(2000); // 2 second delay between requests
    }
  }

  console.log(`\n\n📊 Summary:`);
  console.log(`   Total URLs: ${urls.length}`);
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);

  // Save results
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
  const resultsFile = path.join(__dirname, '../seo', `indexing-requests-${timestamp}.json`);
  fs.writeFileSync(resultsFile, JSON.stringify({ results, summary: { total: urls.length, success: successCount, failed: failCount } }, null, 2));
  console.log(`\n📁 Results saved to: ${resultsFile}`);

  return results;
}

// Main execution
const urls = [
  // URLs from the analysis that need indexing
  'https://www.icebergdata.co/case-study/home-services/home-services-decoding-local-service-narratives-hyper-local-sentiment',
  'https://www.icebergdata.co/case-study/airlines/airlines-slashing-aircraft-ground-aog-incidents-through',
  'https://www.icebergdata.co/case-study/airlines/airlines-decoding-passenger-priorities-review-scraping-uncovered',
  'https://www.icebergdata.co/case-study/hotels/hotels-automating-resort-fee-disclosure-audits-ensure',
  'https://www.icebergdata.co/case-study/car-rental/car-rental-queue-keys-halving-customer-wait-times-car-rental',
  'https://www.icebergdata.co/case-study/healthcare/healthcare-winning-bid-securing-contract-win-rate-increase',
  'https://www.icebergdata.co/case-study/healthcare/healthcare-reducing-clinic-congestion-patient-flow-public',
  'https://www.icebergdata.co/case-study/car-rental/car-rental-closing-weekend-profit-gap-hyper-local-demand-sensing',
  'https://www.icebergdata.co/case-study/airlines/airlines-proactive-tarmac-delay-mitigation-aggregating-real-time',
  'https://www.icebergdata.co/case-study/hotels/hotels-closing-wellness-gap-hotel-chain-lifted-guest-satisfaction',
  'https://www.icebergdata.co/case-study/market-intelligence/market-intelligence-uncovering-niche-influencers-analyzing-unstructured-forum',
  'https://www.icebergdata.co/case-study/retail/retail-mapping-in-store-cold-zones-pathing-analysis',
  'https://www.icebergdata.co/case-study/lead-generation/lead-generation-automating-tcpa-dnc-compliance-mitigating-legal',
  'https://www.icebergdata.co/case-study/manufacturing/manufacturing-slashing-reverse-logistics-costs-real-time-carrier',
  'https://www.icebergdata.co/case-study/home-services/home-services-pinpointing-service-deserts-expanding-specialty-appliance',
  'https://www.icebergdata.co/case-study/e-commerce/e-commerce-hack-feature-quantifying-unintended-product-uses',
  'https://www.icebergdata.co/case-study/dtc-and-retail/dtc-&-retail-de-risking-retail-expansion-identifying-whitespace-opportunities',
  'https://www.icebergdata.co/case-study/e-commerce/e-commerce-dynamic-carrier-selection-slashing-delivery-exceptions',
  'https://www.icebergdata.co/case-study/home-services-and-repair/home-services-&-repair-pinpointing-service-deserts-expanding-premium-appliance',
  'https://www.icebergdata.co/case-study/hotels/hotels-dynamic-lobby-monetization-boosting-ancillary-revenue'
];

batchRequestIndexing(urls).catch(error => {
  console.error('\n❌ Fatal error:', error.message);
  process.exit(1);
});

