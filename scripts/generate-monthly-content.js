#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ================================================================= //
//                      CONFIGURATION                               //
// ================================================================= //

// Default distribution (can be overridden via command line)
const DEFAULT_DISTRIBUTION = {
  'E-commerce': 6,
  'Car Rental': 4,
  'Airlines': 3,
  'Hotels': 3,
  'Retail': 3,
  'Lead Generation': 2,
  'Healthcare': 2,
  'Manufacturing': 2,
  'Market Intelligence': 2,
  'Consumer Electronics': 1,
  'Food Delivery': 1,
  'Home Services': 1
};

// ================================================================= //
//                      HELPER FUNCTIONS                            //
// ================================================================= //

/**
 * Parses command line arguments
 */
function parseArguments() {
  const args = process.argv.slice(2);
  
  const startMonth = args.find(arg => arg.startsWith('--start-month='))?.split('=')[1];
  const endMonth = args.find(arg => arg.startsWith('--end-month='))?.split('=')[1];
  const startFrom = parseInt(args.find(arg => arg.startsWith('--start-from='))?.split('=')[1], 10) || 97;
  const distribution = args.find(arg => arg.startsWith('--distribution='))?.split('=')[1];
  const model = args.find(arg => arg.startsWith('--model='))?.split('=')[1] || 'gemini-2.5-pro';
  
  if (!startMonth || !endMonth) {
    console.error('❌ Error: --start-month and --end-month are required');
    console.log('\nUsage:');
    console.log('  node scripts/generate-monthly-content.js --start-month=2025-09 --end-month=2026-08 --start-from=97');
    console.log('\nOptional:');
    console.log('  --distribution="E-commerce:6,Car Rental:4,Airlines:3" (default distribution will be used if not specified)');
    console.log('  --model=gemini-2.5-pro (default model)');
    process.exit(1);
  }
  
  return { startMonth, endMonth, startFrom, distribution, model };
}

/**
 * Parses distribution string into object
 */
function parseDistribution(distributionStr) {
  if (!distributionStr) return DEFAULT_DISTRIBUTION;
  
  const distribution = {};
  const pairs = distributionStr.split(',');
  
  for (const pair of pairs) {
    const [sector, count] = pair.split(':');
    if (sector && count) {
      distribution[sector.trim()] = parseInt(count.trim(), 10);
    }
  }
  
  return distribution;
}

/**
 * Generates date range for a given month
 */
function getMonthDateRange(yearMonth) {
  const [year, month] = yearMonth.split('-').map(Number);
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0); // Last day of the month
  
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  return {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate)
  };
}

/**
 * Generates all months between start and end
 */
function generateMonthRange(startMonth, endMonth) {
  const months = [];
  const [startYear, startMonthNum] = startMonth.split('-').map(Number);
  const [endYear, endMonthNum] = endMonth.split('-').map(Number);
  
  let currentYear = startYear;
  let currentMonth = startMonthNum;
  
  while (currentYear < endYear || (currentYear === endYear && currentMonth <= endMonthNum)) {
    months.push(`${currentYear}-${String(currentMonth).padStart(2, '0')}`);
    
    currentMonth++;
    if (currentMonth > 12) {
      currentMonth = 1;
      currentYear++;
    }
  }
  
  return months;
}

/**
 * Gets the next available case study number
 */
function getNextCaseNumber() {
  try {
    const casesDir = path.join(__dirname, '../public/articles/cases');
    if (!fs.existsSync(casesDir)) {
      return 1;
    }
    
    const files = fs.readdirSync(casesDir)
      .filter(file => file.endsWith('.json') && file !== 'index.json')
      .map(file => {
        const match = file.match(/(\d+)\.json$/);
        return match ? parseInt(match[1], 10) : 0;
      })
      .filter(num => num > 0)
      .sort((a, b) => b - a);
    
    return files.length > 0 ? files[0] + 1 : 1;
  } catch (error) {
    console.warn('⚠️ Could not determine next case number, starting from 1');
    return 1;
  }
}

/**
 * Executes a single generation command
 */
async function generateCaseStudies(sector, count, startFrom, startDate, endDate, model) {
  const command = `node scripts/generate-new-case-studies.js --sector="${sector}" --count=${count} --start-from=${startFrom} --start-date=${startDate} --end-date=${endDate} --model=${model}`;
  
  console.log(`\n🔄 Generating ${count} case studies for ${sector}...`);
  console.log(`   Command: ${command}`);
  
  try {
    const { stdout, stderr } = await execAsync(command, { cwd: process.cwd() });
    
    if (stdout) {
      console.log(`✅ ${sector} generation completed successfully`);
      // Show last few lines of output for verification
      const lines = stdout.trim().split('\n');
      const lastLines = lines.slice(-3);
      lastLines.forEach(line => console.log(`   ${line}`));
    }
    
    if (stderr) {
      console.warn(`⚠️ Warnings for ${sector}:`, stderr);
    }
    
    return { success: true, sector, count };
  } catch (error) {
    console.error(`❌ Error generating ${sector}:`, error.message);
    return { success: false, sector, count, error: error.message };
  }
}

/**
 * Processes a single month
 */
async function processMonth(yearMonth, distribution, startFrom, model) {
  const { startDate, endDate } = getMonthDateRange(yearMonth);
  const totalPosts = Object.values(distribution).reduce((sum, count) => sum + count, 0);
  
  console.log(`\n📅 Processing ${yearMonth} (${startDate} to ${endDate})`);
  console.log(`   Total posts to generate: ${totalPosts}`);
  console.log(`   Starting from case number: ${startFrom}`);
  
  const results = [];
  let currentStartFrom = startFrom;
  
  // Process each sector in the distribution
  for (const [sector, count] of Object.entries(distribution)) {
    if (count > 0) {
      const result = await generateCaseStudies(sector, count, currentStartFrom, startDate, endDate, model);
      results.push(result);
      
      if (result.success) {
        currentStartFrom += count;
      }
      
      // Add a small delay between sectors to avoid overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  return { month: yearMonth, results, nextStartFrom: currentStartFrom };
}

/**
 * Main execution function
 */
async function main() {
  console.log('=============================================');
  console.log('📚 Monthly Content Generation Script');
  console.log('=============================================');
  
  const { startMonth, endMonth, startFrom, distribution, model } = parseArguments();
  const distributionObj = parseDistribution(distribution);
  
  console.log('\n📋 Configuration:');
  console.log(`   Start Month: ${startMonth}`);
  console.log(`   End Month: ${endMonth}`);
  console.log(`   Starting Case Number: ${startFrom}`);
  console.log(`   Model: ${model}`);
  console.log('\n📊 Distribution:');
  Object.entries(distributionObj).forEach(([sector, count]) => {
    console.log(`   ${sector}: ${count} posts`);
  });
  
  const months = generateMonthRange(startMonth, endMonth);
  const totalMonths = months.length;
  const postsPerMonth = Object.values(distributionObj).reduce((sum, count) => sum + count, 0);
  const totalPosts = totalMonths * postsPerMonth;
  
  console.log(`\n📈 Summary:`);
  console.log(`   Months to process: ${totalMonths}`);
  console.log(`   Posts per month: ${postsPerMonth}`);
  console.log(`   Total posts to generate: ${totalPosts}`);
  console.log(`   Estimated completion: ${new Date(Date.now() + (totalPosts * 30000)).toLocaleString()}`);
  
  // Confirm before proceeding
  console.log('\n⚠️ This will generate a large number of case studies. Continue? (y/N)');
  
  // For automation, you can set AUTO_CONFIRM=true
  if (process.env.AUTO_CONFIRM !== 'true') {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    
    const answer = await new Promise(resolve => {
      process.stdin.on('data', (key) => {
        process.stdin.setRawMode(false);
        process.stdin.pause();
        resolve(key.toLowerCase());
      });
    });
    
    if (answer !== 'y' && answer !== 'yes') {
      console.log('❌ Operation cancelled');
      process.exit(0);
    }
  }
  
  console.log('\n🚀 Starting generation process...');
  
  let currentStartFrom = startFrom;
  const allResults = [];
  
  // Process each month
  for (let i = 0; i < months.length; i++) {
    const month = months[i];
    console.log(`\n${'='.repeat(50)}`);
    console.log(`📅 Month ${i + 1}/${totalMonths}: ${month}`);
    console.log(`${'='.repeat(50)}`);
    
    const monthResult = await processMonth(month, distributionObj, currentStartFrom, model);
    allResults.push(monthResult);
    
    currentStartFrom = monthResult.nextStartFrom;
    
    // Add delay between months
    if (i < months.length - 1) {
      console.log('\n⏳ Waiting 5 seconds before next month...');
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
  
  // Final summary
  console.log('\n\n🎉 Generation Complete!');
  console.log('=============================================');
  
  let totalSuccessful = 0;
  let totalFailed = 0;
  
  allResults.forEach(monthResult => {
    console.log(`\n📅 ${monthResult.month}:`);
    monthResult.results.forEach(result => {
      if (result.success) {
        console.log(`   ✅ ${result.sector}: ${result.count} posts`);
        totalSuccessful += result.count;
      } else {
        console.log(`   ❌ ${result.sector}: ${result.count} posts (FAILED)`);
        totalFailed += result.count;
      }
    });
  });
  
  console.log(`\n📊 Final Statistics:`);
  console.log(`   Total successful: ${totalSuccessful} posts`);
  console.log(`   Total failed: ${totalFailed} posts`);
  console.log(`   Success rate: ${((totalSuccessful / (totalSuccessful + totalFailed)) * 100).toFixed(1)}%`);
  
  if (totalFailed > 0) {
    console.log(`\n⚠️ Some generations failed. Check the logs above for details.`);
  }
  
  console.log(`\n✅ Monthly content generation completed!`);
  console.log(`   Next case number: ${currentStartFrom}`);
}

// Handle errors gracefully
process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled error:', error);
  process.exit(1);
});

process.on('SIGINT', () => {
  console.log('\n\n⚠️ Process interrupted by user');
  process.exit(0);
});

// Run the script
main().catch(error => {
  console.error('❌ A critical error occurred:', error);
  process.exit(1);
});

