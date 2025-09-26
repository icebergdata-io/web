#!/usr/bin/env node

/**
 * Private Case Studies JSON Validator
 * 
 * This script validates all private case study JSON files to ensure they:
 * 1. Have valid JSON syntax
 * 2. Contain required fields
 * 3. Have proper structure
 * 4. Are accessible via the API
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Required fields for private case studies
const REQUIRED_FIELDS = [
  'Title',
  'Subtitle', 
  'Business Impact',
  'Sector',
  'Platform',
  'Use Case',
  'What data was collected',
  'Why this matters',
  'Implementation time',
  'Problems this solves',
  'Why it was better to outsource this solution',
  'Example_Input_JSON',
  'Example_Output_JSON',
  'Matching algorithm used to integrate the data',
  'Story',
  'publicationDate',
  'isPrivate',
  'sharingLevel'
];

// Validation results
const results = {
  valid: [],
  invalid: [],
  errors: []
};

/**
 * Validate a single JSON file
 */
function validateJsonFile(filePath) {
  const filename = path.basename(filePath);
  const errors = [];
  
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      errors.push(`File does not exist: ${filePath}`);
      return { filename, valid: false, errors };
    }

    // Read and parse JSON
    const content = fs.readFileSync(filePath, 'utf8');
    let jsonData;
    
    try {
      jsonData = JSON.parse(content);
    } catch (parseError) {
      errors.push(`JSON Parse Error: ${parseError.message}`);
      return { filename, valid: false, errors };
    }

    // Check required fields
    for (const field of REQUIRED_FIELDS) {
      if (!(field in jsonData)) {
        errors.push(`Missing required field: ${field}`);
      } else if (jsonData[field] === null || jsonData[field] === undefined) {
        errors.push(`Required field is null/undefined: ${field}`);
      }
    }

    // Validate specific field types
    if (jsonData['Problems this solves'] && !Array.isArray(jsonData['Problems this solves'])) {
      errors.push(`'Problems this solves' should be an array`);
    }

    if (jsonData['Example_Input_JSON'] && typeof jsonData['Example_Input_JSON'] !== 'object') {
      errors.push(`'Example_Input_JSON' should be an object`);
    }

    if (jsonData['Example_Output_JSON'] && typeof jsonData['Example_Output_JSON'] !== 'object') {
      errors.push(`'Example_Output_JSON' should be an object`);
    }

    if (jsonData['isPrivate'] !== true) {
      errors.push(`'isPrivate' should be true for private case studies`);
    }

    if (jsonData['sharingLevel'] !== 'private') {
      errors.push(`'sharingLevel' should be 'private'`);
    }

    // Check for common issues
    if (jsonData['Story'] && jsonData['Story'].length < 100) {
      errors.push(`'Story' seems too short (${jsonData['Story'].length} characters)`);
    }

    // Check for empty arrays or objects that should have content
    if (jsonData['Example_Output_JSON'] && 
        Object.keys(jsonData['Example_Output_JSON']).length === 0) {
      errors.push(`'Example_Output_JSON' is empty`);
    }

    if (jsonData['Example_Input_JSON'] && 
        Object.keys(jsonData['Example_Input_JSON']).length === 0) {
      errors.push(`'Example_Input_JSON' is empty`);
    }

    return {
      filename,
      valid: errors.length === 0,
      errors,
      data: jsonData
    };

  } catch (error) {
    errors.push(`Unexpected error: ${error.message}`);
    return { filename, valid: false, errors };
  }
}

/**
 * Validate private sharing configuration
 */
function validateSharingConfig() {
  const configPath = path.join(__dirname, '../public/private-sharing-config.json');
  const errors = [];
  
  try {
    if (!fs.existsSync(configPath)) {
      errors.push('private-sharing-config.json does not exist');
      return { valid: false, errors };
    }

    const content = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(content);

    if (!config.sharingEnabled) {
      errors.push('sharingEnabled is false');
    }

    if (!config.accessTokens || typeof config.accessTokens !== 'object') {
      errors.push('accessTokens is missing or not an object');
    } else {
      const tokenEntries = Object.entries(config.accessTokens);
      
      for (const [caseId, tokenData] of tokenEntries) {
        if (!tokenData.token || !tokenData.filename) {
          errors.push(`Missing token or filename for case: ${caseId}`);
        }
        
        // Check if the referenced file exists
        const filePath = path.join(__dirname, '../public/private-case-studies', tokenData.filename);
        if (!fs.existsSync(filePath)) {
          errors.push(`Referenced file does not exist: ${tokenData.filename}`);
        }
      }
    }

    return { valid: errors.length === 0, errors, config };

  } catch (error) {
    errors.push(`Config validation error: ${error.message}`);
    return { valid: false, errors };
  }
}

/**
 * Main validation function
 */
async function validateAll() {
  console.log('🔍 Validating Private Case Studies...\n');

  // Get all JSON files in private-case-studies directory
  const privateCaseStudiesDir = path.join(__dirname, '../public/private-case-studies');
  
  if (!fs.existsSync(privateCaseStudiesDir)) {
    console.error('❌ private-case-studies directory does not exist');
    process.exit(1);
  }

  const files = fs.readdirSync(privateCaseStudiesDir)
    .filter(file => file.endsWith('.json'))
    .sort();

  console.log(`📁 Found ${files.length} JSON files to validate\n`);

  // Validate each file
  for (const file of files) {
    const filePath = path.join(privateCaseStudiesDir, file);
    const result = validateJsonFile(filePath);
    
    if (result.valid) {
      results.valid.push(result);
      console.log(`✅ ${result.filename}`);
    } else {
      results.invalid.push(result);
      console.log(`❌ ${result.filename}`);
      result.errors.forEach(error => {
        console.log(`   • ${error}`);
      });
    }
  }

  // Validate sharing configuration
  console.log('\n🔧 Validating sharing configuration...');
  const configResult = validateSharingConfig();
  
  if (configResult.valid) {
    console.log('✅ private-sharing-config.json');
  } else {
    console.log('❌ private-sharing-config.json');
    configResult.errors.forEach(error => {
      console.log(`   • ${error}`);
    });
  }

  // Summary
  console.log('\n📊 Validation Summary:');
  console.log(`✅ Valid files: ${results.valid.length}`);
  console.log(`❌ Invalid files: ${results.invalid.length}`);
  console.log(`🔧 Config valid: ${configResult.valid ? 'Yes' : 'No'}`);

  // Exit with error code if any files are invalid
  if (results.invalid.length > 0 || !configResult.valid) {
    console.log('\n🚨 Validation failed! Please fix the errors above before deploying.');
    process.exit(1);
  } else {
    console.log('\n🎉 All validations passed! Safe to deploy.');
    process.exit(0);
  }
}

// Run validation
validateAll().catch(error => {
  console.error('💥 Validation script error:', error);
  process.exit(1);
});
