#!/usr/bin/env node

/**
 * Private Case Study Sharing System
 * Creates secure sharing links for private case studies
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRIVATE_CASES_DIR = path.join(__dirname, '../private-case-studies');
const SHARING_CONFIG_FILE = path.join(__dirname, '../private-sharing-config.json');

/**
 * Creates a secure sharing configuration
 */
function createSharingConfig() {
  const config = {
    sharingEnabled: true,
    baseUrl: 'https://www.icebergdata.co/private-case-study',
    accessTokens: {},
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString()
  };
  
  fs.writeFileSync(SHARING_CONFIG_FILE, JSON.stringify(config, null, 2));
  console.log('📝 Created sharing configuration file');
  return config;
}

/**
 * Generates a secure access token for a case study
 */
function generateAccessToken(caseStudyId) {
  const timestamp = Date.now();
  const randomBytes = crypto.randomBytes(16).toString('hex');
  const token = crypto.createHash('sha256')
    .update(`${caseStudyId}-${timestamp}-${randomBytes}`)
    .digest('hex')
    .substring(0, 32);
  
  return token;
}

/**
 * Creates sharing links for all private case studies
 */
function createSharingLinks() {
  if (!fs.existsSync(PRIVATE_CASES_DIR)) {
    console.log('❌ No private case studies found. Run "npm run generate-social-cases" first.');
    return;
  }
  
  let config;
  if (fs.existsSync(SHARING_CONFIG_FILE)) {
    config = JSON.parse(fs.readFileSync(SHARING_CONFIG_FILE, 'utf8'));
  } else {
    config = createSharingConfig();
  }
  
  const files = fs.readdirSync(PRIVATE_CASES_DIR)
    .filter(file => file.endsWith('.json'))
    .sort();
  
  console.log(`\n🔗 Creating sharing links for ${files.length} private case studies...\n`);
  
  const sharingLinks = [];
  
  files.forEach((file, index) => {
    try {
      const filePath = path.join(PRIVATE_CASES_DIR, file);
      const caseStudy = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      const caseId = `social-${(index + 1).toString().padStart(3, '0')}`;
      const accessToken = generateAccessToken(caseId);
      
      // Store access token in config
      config.accessTokens[caseId] = {
        token: accessToken,
        filename: file,
        platform: caseStudy.Platform,
        useCase: caseStudy.Use_Case,
        title: caseStudy.Title,
        createdAt: new Date().toISOString(),
        accessCount: 0
      };
      
      const sharingUrl = `${config.baseUrl}/${caseId}/${accessToken}`;
      
      sharingLinks.push({
        id: caseId,
        platform: caseStudy.Platform,
        title: caseStudy.Title,
        sharingUrl: sharingUrl,
        filename: file
      });
      
      console.log(`📱 ${caseStudy.Platform}: ${caseStudy.Title}`);
      console.log(`🔗 ${sharingUrl}`);
      console.log('');
      
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
    }
  });
  
  // Update config
  config.lastUpdated = new Date().toISOString();
  fs.writeFileSync(SHARING_CONFIG_FILE, JSON.stringify(config, null, 2));
  
  // Create sharing summary
  const summaryFile = path.join(__dirname, '../private-sharing-summary.md');
  let summary = `# Private Social Media Case Studies - Sharing Links\n\n`;
  summary += `Generated on: ${new Date().toLocaleString()}\n\n`;
  summary += `## Overview\n`;
  summary += `These case studies are for private sharing only and are not published on the public website.\n\n`;
  
  // Group by platform
  const groupedByPlatform = {};
  sharingLinks.forEach(link => {
    if (!groupedByPlatform[link.platform]) {
      groupedByPlatform[link.platform] = [];
    }
    groupedByPlatform[link.platform].push(link);
  });
  
  Object.entries(groupedByPlatform).forEach(([platform, links]) => {
    summary += `## ${platform}\n\n`;
    links.forEach(link => {
      summary += `### ${link.title}\n`;
      summary += `**Sharing URL:** ${link.sharingUrl}\n\n`;
    });
  });
  
  summary += `## Usage Instructions\n\n`;
  summary += `1. Share the URLs above with clients or prospects privately\n`;
  summary += `2. URLs are secure and require the access token\n`;
  summary += `3. Access is logged for analytics\n`;
  summary += `4. URLs can be revoked by updating the sharing configuration\n\n`;
  
  fs.writeFileSync(summaryFile, summary);
  
  console.log(`\n✅ Created ${sharingLinks.length} sharing links`);
  console.log(`📄 Sharing summary saved to: ${summaryFile}`);
  console.log(`⚙️  Configuration saved to: ${SHARING_CONFIG_FILE}`);
  
  return sharingLinks;
}

/**
 * Lists all available private case studies
 */
function listPrivateCaseStudies() {
  if (!fs.existsSync(PRIVATE_CASES_DIR)) {
    console.log('❌ No private case studies found. Run "npm run generate-social-cases" first.');
    return;
  }
  
  const files = fs.readdirSync(PRIVATE_CASES_DIR)
    .filter(file => file.endsWith('.json'))
    .sort();
  
  console.log(`\n📱 Private Social Media Case Studies (${files.length} total)\n`);
  
  files.forEach((file, index) => {
    try {
      const filePath = path.join(PRIVATE_CASES_DIR, file);
      const caseStudy = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      console.log(`${(index + 1).toString().padStart(2, '0')}. ${caseStudy.Platform}: ${caseStudy.Title}`);
      console.log(`    Use Case: ${caseStudy.Use_Case}`);
      console.log(`    File: ${file}`);
      console.log('');
      
    } catch (error) {
      console.error(`❌ Error reading ${file}:`, error.message);
    }
  });
}

/**
 * Main execution function
 */
async function main() {
  const command = process.argv[2];
  
  switch (command) {
    case 'list':
      listPrivateCaseStudies();
      break;
    case 'links':
      createSharingLinks();
      break;
    default:
      console.log('🔗 Private Case Study Sharing System\n');
      console.log('Usage:');
      console.log('  npm run private-sharing list   - List all private case studies');
      console.log('  npm run private-sharing links  - Create sharing links');
      console.log('');
      console.log('First, generate case studies:');
      console.log('  npm run generate-social-cases');
      break;
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
}

export { createSharingLinks, listPrivateCaseStudies };
