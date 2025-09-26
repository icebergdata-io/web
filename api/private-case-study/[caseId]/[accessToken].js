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
    // Load sharing configuration from public URL (use a fixed URL for Vercel)
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NODE_ENV === 'development'
        ? 'http://localhost:5173'
        : 'https://www.icebergdata.co';

    const configResponse = await fetch(`${baseUrl}/private-sharing-config.json`);
    if (!configResponse.ok) {
      return res.status(404).json({ error: 'Sharing configuration not found' });
    }

    const config = await configResponse.json();

    // Check if sharing is enabled (override with env var if needed)
    const sharingEnabled = process.env.PRIVATE_SHARING_ENABLED !== undefined
      ? process.env.PRIVATE_SHARING_ENABLED === 'true'
      : config.sharingEnabled;

    if (!sharingEnabled) {
      return res.status(403).json({ error: 'Private sharing is disabled' });
    }

    // Validate access token
    const tokenData = config.accessTokens[caseId];
    if (!tokenData || tokenData.token !== accessToken) {
      return res.status(403).json({ error: 'Invalid access token' });
    }

    // Load case study from public URL
    const caseStudyResponse = await fetch(`${baseUrl}/private-case-studies/${tokenData.filename}`);
    if (!caseStudyResponse.ok) {
      return res.status(404).json({ error: 'Case study file not found' });
    }

    const caseStudy = await caseStudyResponse.json();

    // Return case study
    return res.status(200).json(caseStudy);

  } catch (error) {
    const logLevel = process.env.PRIVATE_SHARING_LOG_LEVEL || 'error';
    if (logLevel === 'debug') {
      console.error('Error serving private case study:', error);
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
}
