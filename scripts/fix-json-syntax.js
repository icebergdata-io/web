#!/usr/bin/env node

/**
 * JSON Syntax Fixer
 * 
 * This script fixes common JSON syntax errors in private case study files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const privateCaseStudiesDir = path.join(__dirname, '../public/private-case-studies');

function fixJsonFile(filePath) {
  const filename = path.basename(filePath);
  console.log(`🔧 Fixing ${filename}...`);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix common JSON syntax issues
    // 1. Remove trailing commas before closing braces/brackets
    content = content.replace(/,(\s*[}\]])/g, '$1');
    
    // 2. Remove any BOM or invisible characters
    content = content.replace(/^\uFEFF/, '');
    
    // 3. Ensure proper line endings
    content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    
    // Try to parse the JSON to validate it
    try {
      JSON.parse(content);
      console.log(`✅ ${filename} - Fixed and validated`);
      
      // Write the fixed content back
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    } catch (parseError) {
      console.log(`❌ ${filename} - Still has parse errors: ${parseError.message}`);
      return false;
    }
    
  } catch (error) {
    console.log(`💥 ${filename} - Error: ${error.message}`);
    return false;
  }
}

function main() {
  console.log('🔧 Fixing JSON syntax errors...\n');
  
  const files = fs.readdirSync(privateCaseStudiesDir)
    .filter(file => file.endsWith('.json'))
    .sort();
  
  let fixed = 0;
  let failed = 0;
  
  for (const file of files) {
    const filePath = path.join(privateCaseStudiesDir, file);
    if (fixJsonFile(filePath)) {
      fixed++;
    } else {
      failed++;
    }
  }
  
  console.log(`\n📊 Results:`);
  console.log(`✅ Fixed: ${fixed}`);
  console.log(`❌ Failed: ${failed}`);
  
  if (failed > 0) {
    console.log('\n🚨 Some files still have issues. Manual review required.');
    process.exit(1);
  } else {
    console.log('\n🎉 All files fixed successfully!');
    process.exit(0);
  }
}

main();
