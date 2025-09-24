import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRIVATE_CASES_DIR = path.join(__dirname, '../../private-case-studies');
const SHARING_CONFIG_FILE = path.join(__dirname, '../../private-sharing-config.json');

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { caseId, accessToken } = req.query;

  // Validate parameters
  if (!caseId || !accessToken) {
    return res.status(400).json({ error: 'Missing case ID or access token' });
  }

  try {
    // Load sharing configuration
    if (!fs.existsSync(SHARING_CONFIG_FILE)) {
      return res.status(404).json({ error: 'Sharing configuration not found' });
    }

    const config = JSON.parse(fs.readFileSync(SHARING_CONFIG_FILE, 'utf8'));
    
    // Check if sharing is enabled
    if (!config.sharingEnabled) {
      return res.status(403).json({ error: 'Private sharing is disabled' });
    }

    // Validate access token
    const tokenData = config.accessTokens[caseId];
    if (!tokenData || tokenData.token !== accessToken) {
      return res.status(403).json({ error: 'Invalid access token' });
    }

    // Load case study
    const caseStudyPath = path.join(PRIVATE_CASES_DIR, tokenData.filename);
    if (!fs.existsSync(caseStudyPath)) {
      return res.status(404).json({ error: 'Case study file not found' });
    }

    const caseStudy = JSON.parse(fs.readFileSync(caseStudyPath, 'utf8'));

    // Increment access count
    tokenData.accessCount = (tokenData.accessCount || 0) + 1;
    tokenData.lastAccessed = new Date().toISOString();
    
    // Save updated config
    config.lastUpdated = new Date().toISOString();
    fs.writeFileSync(SHARING_CONFIG_FILE, JSON.stringify(config, null, 2));

    // Return case study
    return res.status(200).json(caseStudy);

  } catch (error) {
    console.error('Error serving private case study:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
