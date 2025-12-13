import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://www.icebergdata.co';
const PROPERTY_URL = `sc-domain:icebergdata.co`; // Search Console property format
const SERVICE_ACCOUNT_PATH = path.join(__dirname, '../iceberg-atlas-c719b15e9a05.json');
const SEO_FOLDER = path.join(__dirname, '../seo');
const BATCH_SIZE = 10; // Process 10 URLs concurrently
const BATCH_DELAY = 1000; // 1 second delay between batches

// Ensure SEO folder exists
if (!fs.existsSync(SEO_FOLDER)) {
  fs.mkdirSync(SEO_FOLDER, { recursive: true });
}

/**
 * Delay function for rate limiting
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Escape CSV field
 */
function escapeCSV(value) {
  if (value === null || value === undefined) {
    return '';
  }
  const stringValue = String(value);
  // If contains comma, quote, or newline, wrap in quotes and escape quotes
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
}

/**
 * Generate actionable recommendation based on analysis
 */
function generateAction(analysis) {
  const actions = [];

  // Check indexing status
  if (!analysis.indexing || analysis.indexing.verdict === 'FAIL' || analysis.indexing.verdict === 'NEUTRAL') {
    const coverageState = analysis.indexing?.coverageState || '';
    if (analysis.accessibility?.accessible) {
      // Check if it's a case that needs indexing request
      if (coverageState.includes('Discovered') || coverageState.includes('unknown') || coverageState.includes('Crawled')) {
        actions.push('Request Indexing');
      } else if (analysis.indexing.verdict === 'FAIL') {
        actions.push('Request Indexing');
      }
    } else {
      actions.push('Fix Accessibility First');
    }
  }
  
  // Check for noindex tag issue
  if (analysis.indexing?.coverageState?.includes('noindex')) {
    actions.push('Remove noindex Tag');
  }

  // Check accessibility
  if (!analysis.accessibility?.accessible || analysis.accessibility?.status !== 200) {
    actions.push('Fix Accessibility');
  }

  // Check sitemap inclusion
  if (!analysis.sitemap?.inSitemap) {
    actions.push('Add to Sitemap');
  }
  
  // Check for duplicate canonical
  if (analysis.indexing?.coverageState?.includes('Duplicate')) {
    actions.push('Fix Canonical Tag');
  }

  // Check performance
  if (analysis.indexing?.verdict === 'PASS' && (!analysis.performance || !analysis.performance.success)) {
    if (analysis.performance?.impressions === 0 || !analysis.performance) {
      actions.push('Optimize Content for SEO');
    }
  }

  // Check last crawl date (if older than 30 days)
  if (analysis.indexing?.lastCrawlTime) {
    const lastCrawl = new Date(analysis.indexing.lastCrawlTime);
    const daysSinceCrawl = (new Date() - lastCrawl) / (1000 * 60 * 60 * 24);
    if (daysSinceCrawl > 30) {
      actions.push('Request Recrawl');
    }
  }

  return actions.length > 0 ? actions.join('; ') : 'No Action';
}

/**
 * Generate CSV from analysis results
 */
function generateCSV(results) {
  const headers = [
    'URL',
    'Index Status',
    'Coverage State',
    'Last Crawl Date',
    'Clicks (30d)',
    'Impressions (30d)',
    'CTR (%)',
    'Avg Position',
    'HTTP Status',
    'In Sitemap',
    'Sitemap Last Modified',
    'Accessible',
    'Indexing Requested',
    'Action Needed'
  ];

  const rows = results.map(analysis => {
    const indexing = analysis.indexing || {};
    const performance = analysis.performance || {};
    const sitemap = analysis.sitemap || {};
    const accessibility = analysis.accessibility || {};

    return [
      escapeCSV(analysis.url),
      escapeCSV(indexing.verdict || 'UNKNOWN'),
      escapeCSV(indexing.coverageState || 'UNKNOWN'),
      escapeCSV(indexing.lastCrawlTime ? new Date(indexing.lastCrawlTime).toISOString().split('T')[0] : ''),
      escapeCSV(performance.clicks || 0),
      escapeCSV(performance.impressions || 0),
      escapeCSV(performance.ctr ? (performance.ctr * 100).toFixed(2) : '0.00'),
      escapeCSV(performance.position ? performance.position.toFixed(1) : ''),
      escapeCSV(accessibility.status || ''),
      escapeCSV(sitemap.inSitemap ? 'Yes' : 'No'),
      escapeCSV(sitemap.lastmod || ''),
      escapeCSV(accessibility.accessible ? 'Yes' : 'No'),
      escapeCSV(analysis.indexingRequested ? 'Yes' : 'No'),
      escapeCSV(generateAction(analysis))
    ];
  });

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  return csvContent;
}

/**
 * Authenticate with Google Search Console API using service account
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
 * Request indexing for a URL via Google Search Console API
 */
async function requestIndexing(url, searchconsole) {
  try {
    const response = await searchconsole.urlInspection.index.requestIndexing({
      requestBody: {
        inspectionUrl: url,
        siteUrl: PROPERTY_URL
      }
    });

    if (response.data) {
      return {
        success: true,
        inspectionUrl: response.data.inspectionUrl || url
      };
    }
  } catch (error) {
    // Indexing request may fail if:
    // - URL was recently requested (rate limit)
    // - URL is not eligible for indexing
    // - Service account doesn't have permission
    return {
      success: false,
      error: error.message,
      code: error.code
    };
  }
  
  return { success: false, error: 'Unknown error' };
}

/**
 * Get comprehensive indexing status for a URL
 */
async function getUrlInspection(url, searchconsole) {
  try {
    const response = await searchconsole.urlInspection.index.inspect({
      requestBody: {
        inspectionUrl: url,
        siteUrl: PROPERTY_URL
      }
    });

    if (response.data?.inspectionResult) {
      const result = response.data.inspectionResult;
      return {
        indexStatus: {
          verdict: result.indexStatusResult?.verdict || 'UNKNOWN',
          coverageState: result.indexStatusResult?.coverageState || 'UNKNOWN',
          lastCrawlTime: result.indexStatusResult?.lastCrawlTime || null,
          pageFetchState: result.indexStatusResult?.pageFetchState || 'UNKNOWN',
          referringUrls: result.indexStatusResult?.referringUrls || [],
          userCanRequestIndexing: result.indexStatusResult?.userCanRequestIndexing || false,
          indexingState: result.indexStatusResult?.indexingState || 'UNKNOWN',
          lastCrawlResult: result.indexStatusResult?.lastCrawlResult || 'UNKNOWN',
          crawlAs: result.indexStatusResult?.crawlAs || 'UNKNOWN',
          googleCanonical: result.indexStatusResult?.googleCanonical || null,
          userCanonical: result.indexStatusResult?.userCanonical || null,
          sitemap: result.indexStatusResult?.sitemap || [],
          platform: result.indexStatusResult?.platform || 'UNKNOWN',
          mobileUsabilityResult: result.indexStatusResult?.mobileUsabilityResult || null,
          richResultsResult: result.richResultsResult || null,
          ampResult: result.ampResult || null
        },
        success: true
      };
    }
  } catch (error) {
    if (error.code === 403) {
      console.error(`   ⚠️  Access denied. Make sure the service account has access in Search Console.`);
      console.error(`   Service account email: ${JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_PATH, 'utf8')).client_email}`);
    }
    return { success: false, error: error.message };
  }
  
  return { success: false, error: 'No inspection result returned' };
}

/**
 * Get search performance data for a URL (if available)
 */
async function getSearchPerformance(url, searchconsole, startDate, endDate) {
  try {
    // Extract path from URL
    const urlPath = url.replace(SITE_URL, '') || '/';
    
    const response = await searchconsole.searchanalytics.query({
      siteUrl: PROPERTY_URL,
      requestBody: {
        startDate: startDate,
        endDate: endDate,
        dimensions: ['page'],
        dimensionFilterGroups: [{
          filters: [{
            dimension: 'page',
            expression: urlPath,
            operator: 'equals'
          }]
        }],
        rowLimit: 1
      }
    });

    if (response.data?.rows && response.data.rows.length > 0) {
      const row = response.data.rows[0];
      return {
        clicks: row.clicks || 0,
        impressions: row.impressions || 0,
        ctr: row.ctr || 0,
        position: row.position || 0,
        success: true
      };
    }
  } catch (error) {
    // Performance data may not be available for all URLs
    return { success: false, error: error.message };
  }
  
  return { success: false, error: 'No performance data available' };
}

/**
 * Check if URL is in sitemap
 */
function checkSitemap(url) {
  const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
  
  if (!fs.existsSync(sitemapPath)) {
    return { inSitemap: false, error: 'Sitemap not found' };
  }

  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  const isInSitemap = sitemapContent.includes(url);
  
  // Extract lastmod if available
  const urlMatch = sitemapContent.match(new RegExp(`<loc>${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}<\/loc>\\s*<lastmod>(.*?)<\/lastmod>`, 'i'));
  const lastmod = urlMatch ? urlMatch[1] : null;

  return {
    inSitemap: isInSitemap,
    lastmod: lastmod
  };
}

/**
 * Check URL accessibility
 */
async function checkAccessibility(url) {
  try {
    const response = await fetch(url, { 
      method: 'HEAD',
      redirect: 'follow',
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });
    
    return {
      accessible: response.ok,
      status: response.status,
      statusText: response.statusText,
      contentType: response.headers.get('content-type'),
      lastModified: response.headers.get('last-modified')
    };
  } catch (error) {
    return {
      accessible: false,
      error: error.message
    };
  }
}

/**
 * Perform full SEO analysis for a single URL (without console logs for parallel processing)
 */
async function analyzeUrl(url, searchconsole, silent = false) {
  if (!silent) {
    console.log(`\n🔍 Analyzing: ${url}`);
    console.log('   ' + '='.repeat(70));
  }

  const analysis = {
    url,
    timestamp: new Date().toISOString(),
    sitemap: checkSitemap(url),
    accessibility: await checkAccessibility(url),
    indexing: null,
    performance: null,
    indexingRequested: false,
    indexingRequestResult: null
  };

  // Get indexing status
  if (!silent) console.log('   📊 Checking indexing status...');
  const indexingResult = await getUrlInspection(url, searchconsole);
  if (indexingResult.success) {
    analysis.indexing = indexingResult.indexStatus;
    if (!silent) {
      console.log(`   ✅ Index Status: ${indexingResult.indexStatus.verdict}`);
      console.log(`   ✅ Coverage State: ${indexingResult.indexStatus.coverageState}`);
      if (indexingResult.indexStatus.lastCrawlTime) {
        console.log(`   ✅ Last Crawl: ${indexingResult.indexStatus.lastCrawlTime}`);
      }
    }
  } else {
    if (!silent) console.log(`   ⚠️  Could not get indexing status: ${indexingResult.error}`);
  }

  // Get performance data (last 30 days)
  if (!silent) console.log('   📈 Checking search performance...');
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);
  
  const perfResult = await getSearchPerformance(
    url, 
    searchconsole,
    startDate.toISOString().split('T')[0],
    endDate.toISOString().split('T')[0]
  );
  
  if (perfResult.success) {
    analysis.performance = perfResult;
    if (!silent) {
      console.log(`   ✅ Clicks: ${perfResult.clicks}, Impressions: ${perfResult.impressions}`);
      console.log(`   ✅ CTR: ${(perfResult.ctr * 100).toFixed(2)}%, Avg Position: ${perfResult.position.toFixed(1)}`);
    }
  } else {
    if (!silent) console.log(`   ℹ️  No performance data available (URL may not have received traffic)`);
  }

  // Accessibility check
  if (!silent) {
    if (analysis.accessibility.accessible) {
      console.log(`   ✅ URL is accessible (${analysis.accessibility.status})`);
    } else {
      console.log(`   ❌ URL accessibility issue: ${analysis.accessibility.error || analysis.accessibility.statusText}`);
    }

    // Sitemap check
    if (analysis.sitemap.inSitemap) {
      console.log(`   ✅ URL is in sitemap${analysis.sitemap.lastmod ? ` (lastmod: ${analysis.sitemap.lastmod})` : ''}`);
    } else {
      console.log(`   ⚠️  URL not found in sitemap`);
    }
  }

  return analysis;
}

/**
 * Process URLs in parallel batches
 */
async function processBatch(urls, batchNumber, totalBatches, searchconsole) {
  const batchStartTime = Date.now();
  console.log(`\n📦 Processing batch ${batchNumber}/${totalBatches} (${urls.length} URLs)...`);

  const promises = urls.map(url => 
    analyzeUrl(url, searchconsole, true).catch(error => {
      console.error(`   ❌ Error analyzing ${url}: ${error.message}`);
      return { url, error: error.message, failed: true };
    })
  );

  const results = await Promise.allSettled(promises);
  const batchTime = ((Date.now() - batchStartTime) / 1000).toFixed(1);

  const successful = results.filter(r => r.status === 'fulfilled' && !r.value.failed).length;
  const failed = results.filter(r => r.status === 'rejected' || r.value?.failed).length;

  console.log(`   ✅ Completed batch ${batchNumber}/${totalBatches} in ${batchTime}s (${successful} success, ${failed} failed)`);

  return results.map(result => {
    if (result.status === 'fulfilled') {
      return result.value;
    } else {
      return { url: 'unknown', error: result.reason?.message || 'Unknown error', failed: true };
    }
  });
}

/**
 * Analyze multiple URLs from sitemap with parallel processing
 */
async function analyzeSitemapUrls(limit = null) {
  const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
  
  if (!fs.existsSync(sitemapPath)) {
    console.error('❌ Sitemap not found. Run "npm run generate-sitemap" first.');
    return;
  }

  console.log('🚀 Starting comprehensive SEO analysis with parallel processing...\n');
  console.log('🔐 Authenticating with Google Search Console API...');
  
  const auth = await authenticate();
  const searchconsole = google.searchconsole({ version: 'v1', auth });

  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  const urlMatches = sitemapContent.match(/<loc>(.*?)<\/loc>/g) || [];
  let urls = urlMatches.map(match => match.replace(/<\/?loc>/g, ''));
  
  if (limit) {
    urls = urls.slice(0, limit);
  }

  console.log(`📋 Analyzing ${urls.length} URLs from sitemap...`);
  console.log(`⚡ Using parallel processing (${BATCH_SIZE} concurrent requests per batch)\n`);

  // Split URLs into batches
  const batches = [];
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    batches.push(urls.slice(i, i + BATCH_SIZE));
  }

  const totalBatches = batches.length;
  const results = [];
  const errors = [];
  const startTime = Date.now();
  
  // Check if auto-request indexing is enabled
  const args = process.argv.slice(2);
  const autoRequestIndexing = args.includes('--request-indexing');

  // Process batches sequentially with delay between them
  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    const batchResults = await processBatch(batch, i + 1, totalBatches, searchconsole);
    
    batchResults.forEach(result => {
      if (result.failed) {
        errors.push({ url: result.url, error: result.error });
      } else {
        results.push(result);
      }
    });

    // Rate limiting: wait between batches (except for the last one)
    if (i < batches.length - 1) {
      await delay(BATCH_DELAY);
    }
  }

  // Request indexing for URLs that need it (if enabled)
  if (autoRequestIndexing) {
    console.log('\n📤 Requesting indexing for eligible URLs...');
    const urlsToIndex = results.filter(r => {
      if (r.failed || !r.indexing) return false;
      const coverageState = r.indexing.coverageState || '';
      const verdict = r.indexing.verdict || '';
      return (
        (verdict === 'FAIL' || verdict === 'NEUTRAL') &&
        (coverageState.includes('Discovered') || 
         coverageState.includes('unknown') || 
         coverageState.includes('Crawled') ||
         coverageState.includes('noindex')) &&
        r.accessibility?.accessible &&
        r.indexing.userCanRequestIndexing !== false
      );
    });

    console.log(`   Found ${urlsToIndex.length} URLs eligible for indexing request`);
    
    for (let i = 0; i < urlsToIndex.length; i++) {
      const url = urlsToIndex[i].url;
      console.log(`   [${i + 1}/${urlsToIndex.length}] Requesting indexing: ${url}`);
      const requestResult = await requestIndexing(url, searchconsole);
      
      // Find and update the result
      const resultIndex = results.findIndex(r => r.url === url);
      if (resultIndex !== -1) {
        results[resultIndex].indexingRequested = requestResult.success;
        results[resultIndex].indexingRequestResult = requestResult;
      }
      
      // Rate limiting for indexing requests (Google allows 200 requests per day)
      if (i < urlsToIndex.length - 1) {
        await delay(2000); // 2 second delay between indexing requests
      }
    }
    
    const successfulRequests = results.filter(r => r.indexingRequested).length;
    console.log(`\n✅ Successfully requested indexing for ${successfulRequests} URLs`);
  }

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);

  // Generate summary
  const summary = {
    timestamp: new Date().toISOString(),
    totalUrls: urls.length,
    analyzed: results.length,
    errors: errors.length,
    indexed: results.filter(r => r.indexing?.verdict === 'PASS').length,
    notIndexed: results.filter(r => r.indexing?.verdict === 'FAIL').length,
    unknownIndexStatus: results.filter(r => !r.indexing || r.indexing.verdict === 'UNKNOWN').length,
    inSitemap: results.filter(r => r.sitemap?.inSitemap).length,
    accessible: results.filter(r => r.accessibility?.accessible).length,
    hasPerformanceData: results.filter(r => r.performance?.success).length,
    totalClicks: results.reduce((sum, r) => sum + (r.performance?.clicks || 0), 0),
    totalImpressions: results.reduce((sum, r) => sum + (r.performance?.impressions || 0), 0),
    indexingRequested: results.filter(r => r.indexingRequested).length,
    processingTime: `${totalTime}s`
  };

  // Generate CSV
  const csvContent = generateCSV(results);

  // Save results
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
  const resultsFile = path.join(SEO_FOLDER, `seo-analysis-${timestamp}.json`);
  const summaryFile = path.join(SEO_FOLDER, `seo-summary-${timestamp}.json`);
  const csvFile = path.join(SEO_FOLDER, `seo-analysis-${timestamp}.csv`);

  fs.writeFileSync(resultsFile, JSON.stringify({
    summary,
    results,
    errors
  }, null, 2));

  fs.writeFileSync(summaryFile, JSON.stringify(summary, null, 2));
  fs.writeFileSync(csvFile, csvContent);

  // Print summary
  console.log('\n\n' + '='.repeat(80));
  console.log('📊 ANALYSIS SUMMARY');
  console.log('='.repeat(80));
  console.log(`Total URLs analyzed: ${summary.analyzed}`);
  console.log(`Errors: ${summary.errors}`);
  console.log(`Processing time: ${summary.processingTime}`);
  console.log(`\nIndexing Status:`);
  console.log(`  ✅ Indexed: ${summary.indexed}`);
  console.log(`  ❌ Not Indexed: ${summary.notIndexed}`);
  console.log(`  ❓ Unknown: ${summary.unknownIndexStatus}`);
  console.log(`\nTechnical Checks:`);
  console.log(`  📄 In Sitemap: ${summary.inSitemap}`);
  console.log(`  🌐 Accessible: ${summary.accessible}`);
  console.log(`\nPerformance (Last 30 Days):`);
  console.log(`  📈 URLs with data: ${summary.hasPerformanceData}`);
  console.log(`  👆 Total Clicks: ${summary.totalClicks}`);
  console.log(`  👁️  Total Impressions: ${summary.totalImpressions}`);
  if (autoRequestIndexing && summary.indexingRequested > 0) {
    console.log(`\nIndexing Requests:`);
    console.log(`  📤 Indexing requested: ${summary.indexingRequested}`);
  }
  console.log(`\n📁 Results saved to:`);
  console.log(`  ${resultsFile}`);
  console.log(`  ${summaryFile}`);
  console.log(`  ${csvFile} (CSV for actionable analysis)`);
  console.log('='.repeat(80));

  return { summary, results, errors };
}

/**
 * Analyze a single URL
 */
async function analyzeSingleUrl(url) {
  console.log('🚀 Starting comprehensive SEO analysis...\n');
  console.log('🔐 Authenticating with Google Search Console API...');
  
  const auth = await authenticate();
  const searchconsole = google.searchconsole({ version: 'v1', auth });

  const analysis = await analyzeUrl(url, searchconsole);

  // Generate CSV for single URL
  const csvContent = generateCSV([analysis]);

  // Save result
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `url-analysis-${timestamp}.json`;
  const csvFilename = `url-analysis-${timestamp}.csv`;
  const filepath = path.join(SEO_FOLDER, filename);
  const csvFilepath = path.join(SEO_FOLDER, csvFilename);

  fs.writeFileSync(filepath, JSON.stringify(analysis, null, 2));
  fs.writeFileSync(csvFilepath, csvContent);

  console.log(`\n📁 Analysis saved to:`);
  console.log(`  ${filepath}`);
  console.log(`  ${csvFilepath}`);

  return analysis;
}

// Main execution
const args = process.argv.slice(2);
const urlArg = args.find(arg => arg.startsWith('--url='));
const limitArg = args.find(arg => arg.startsWith('--limit='));

if (urlArg) {
  const url = urlArg.split('=')[1];
  analyzeSingleUrl(url).catch(error => {
    console.error('\n❌ Fatal error:', error.message);
    if (error.code === 403) {
      console.error('\n💡 Make sure:');
      console.error('   1. The service account has access in Google Search Console');
      console.error(`   2. Service account email: ${JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_PATH, 'utf8')).client_email}`);
      console.error('   3. Search Console API is enabled in Google Cloud Console');
    }
    process.exit(1);
  });
} else {
  const limit = limitArg ? parseInt(limitArg.split('=')[1]) : null;
  analyzeSitemapUrls(limit).catch(error => {
    console.error('\n❌ Fatal error:', error.message);
    if (error.code === 403) {
      console.error('\n💡 Make sure:');
      console.error('   1. The service account has access in Google Search Console');
      console.error(`   2. Service account email: ${JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_PATH, 'utf8')).client_email}`);
      console.error('   3. Search Console API is enabled in Google Cloud Console');
    }
    process.exit(1);
  });
}
