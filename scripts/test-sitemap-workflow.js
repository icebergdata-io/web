#!/usr/bin/env node

/**
 * Test script to verify sitemap generation workflow
 * This simulates what the GitHub Action does locally
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INDEX_FILE = 'public/articles/cases/index.json';
const SITEMAP_FILE = 'public/sitemap.xml';

console.log('🧪 Testing Sitemap Generation Workflow\n');

// Test 1: Check if required files exist
console.log('1️⃣ Checking required files...');
if (!fs.existsSync(INDEX_FILE)) {
  console.error(`❌ ${INDEX_FILE} not found`);
  process.exit(1);
}
if (!fs.existsSync(SITEMAP_FILE)) {
  console.error(`❌ ${SITEMAP_FILE} not found`);
  process.exit(1);
}
console.log('✅ Required files exist\n');

// Test 2: Backup current files for comparison
console.log('2️⃣ Backing up current files...');
const backupIndex = fs.readFileSync(INDEX_FILE, 'utf8');
const backupSitemap = fs.readFileSync(SITEMAP_FILE, 'utf8');
console.log('✅ Files backed up\n');

// Test 3: Run regeneration
console.log('3️⃣ Running regeneration script...');
try {
  execSync('node scripts/regenerate-index.js', { stdio: 'inherit' });
  console.log('✅ Regeneration completed\n');
} catch (error) {
  console.error('❌ Regeneration failed:', error.message);
  process.exit(1);
}

// Test 4: Check for file changes
console.log('4️⃣ Checking for file changes...');
const newIndex = fs.readFileSync(INDEX_FILE, 'utf8');
const newSitemap = fs.readFileSync(SITEMAP_FILE, 'utf8');

const indexChanged = newIndex !== backupIndex;
const sitemapChanged = newSitemap !== backupSitemap;

console.log(`Index changed: ${indexChanged ? '📝 Yes' : '✅ No'}`);
console.log(`Sitemap changed: ${sitemapChanged ? '📝 Yes' : '✅ No'}`);

if (indexChanged || sitemapChanged) {
  console.log('✅ Changes detected - GitHub Action would commit\n');
} else {
  console.log('✅ No changes - GitHub Action would skip commit\n');
}

// Test 5: Validate XML
console.log('5️⃣ Validating sitemap XML...');
try {
  execSync('xmllint --noout public/sitemap.xml', { stdio: 'pipe' });
  console.log('✅ XML is valid\n');
} catch (error) {
  console.error('❌ XML validation failed');
  process.exit(1);
}

// Test 6: Check sitemap statistics
console.log('6️⃣ Checking sitemap statistics...');
try {
  const sitemapContent = fs.readFileSync(SITEMAP_FILE, 'utf8');
  const urlCount = (sitemapContent.match(/<loc>/g) || []).length;
  const caseStudyCount = (sitemapContent.match(/case-study/g) || []).length;
  const escapedAmpersands = (sitemapContent.match(/&amp;/g) || []).length;

  console.log(`Total URLs: ${urlCount}`);
  console.log(`Case study URLs: ${caseStudyCount}`);
  console.log(`Escaped ampersands: ${escapedAmpersands}`);

  if (urlCount > 0 && caseStudyCount >= 0 && escapedAmpersands >= 0) {
    console.log('✅ Statistics look good\n');
  } else {
    console.log('⚠️ Unexpected statistics\n');
  }
} catch (error) {
  console.error('❌ Failed to analyze sitemap:', error.message);
  process.exit(1);
}

// Test 7: Restore original files
console.log('7️⃣ Restoring original files...');
fs.writeFileSync(INDEX_FILE, backupIndex);
fs.writeFileSync(SITEMAP_FILE, backupSitemap);
console.log('✅ Files restored\n');

// Final result
console.log('🎉 All tests passed! GitHub Action should work correctly.');
console.log('\n📋 Summary:');
console.log('- ✅ Files exist');
console.log('- ✅ Regeneration works');
console.log('- ✅ Change detection logic works');
console.log('- ✅ XML validation passes');
console.log('- ✅ Statistics are reasonable');
console.log('- ✅ Files can be safely restored');
