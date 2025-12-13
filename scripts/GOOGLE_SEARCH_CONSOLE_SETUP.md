# Google Search Console API Setup Guide

This guide will help you set up the Google Search Console API to check indexing status for your website.

## Prerequisites

1. A Google account with access to Google Search Console
2. Access to Google Cloud Console
3. Your website verified in Google Search Console

## Setup Steps

### Option 1: Service Account (Recommended for Automation)

1. **Create a Service Account**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Select or create a project
   - Navigate to "IAM & Admin" > "Service Accounts"
   - Click "Create Service Account"
   - Name it (e.g., "search-console-api")
   - Click "Create and Continue"
   - Skip role assignment for now
   - Click "Done"

2. **Create and Download Key**
   - Click on the service account you just created
   - Go to "Keys" tab
   - Click "Add Key" > "Create new key"
   - Choose "JSON" format
   - Download the JSON file
   - Save it securely (e.g., `google-service-account.json`)

3. **Enable Search Console API**
   - In Google Cloud Console, go to "APIs & Services" > "Library"
   - Search for "Google Search Console API"
   - Click on it and click "Enable"

4. **Grant Access in Search Console**
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Select your property (icebergdata.co)
   - Go to "Settings" > "Users and permissions"
   - Click "Add user"
   - Enter the service account email (found in the JSON file: `client_email`)
   - Grant "Full" access
   - Click "Add"

5. **Configure Environment Variables**
   - Add to your `.env` file:
   ```bash
   GOOGLE_SERVICE_ACCOUNT_PATH=./google-service-account.json
   ```
   OR paste the JSON content directly:
   ```bash
   GOOGLE_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":"...","private_key":"...","client_email":"..."}'
   ```

### Option 2: OAuth2 (For Manual/Interactive Use)

1. **Create OAuth2 Credentials**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Navigate to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Choose "Desktop app" as application type
   - Name it (e.g., "Search Console Checker")
   - Click "Create"
   - Download the credentials JSON

2. **Enable Search Console API**
   - In Google Cloud Console, go to "APIs & Services" > "Library"
   - Search for "Google Search Console API"
   - Click on it and click "Enable"

3. **Get Refresh Token** (One-time setup)
   - Run the OAuth flow script (if available) or use Google's OAuth Playground
   - You'll need to authorize and get a refresh token
   - Add to `.env`:
   ```bash
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   GOOGLE_REFRESH_TOKEN=your_refresh_token
   GOOGLE_REDIRECT_URI=http://localhost:3000/oauth2callback
   ```

## Usage

### Check a Single URL
```bash
npm run check-indexing -- --url=https://www.icebergdata.co/case-study/consumer-electronics/consumer-electronics-redesigning-in-store-customer-journeys-sales-uplift
```

### Check Multiple URLs from Sitemap
```bash
npm run check-indexing -- --limit=20
```

### Without API Authentication (Basic Check)
If you don't have API credentials set up, the script will:
- Check if URLs are in the sitemap
- Verify URLs are accessible
- Provide basic status information

For actual indexing status, you'll need to use the Google Search Console web interface or set up API authentication.

## Troubleshooting

### Error: "No Google API credentials found"
- Make sure you've set up either Service Account or OAuth2 credentials
- Check that your `.env` file has the correct variable names
- Verify the file paths are correct

### Error: "403 Forbidden"
- Make sure the Search Console API is enabled in Google Cloud Console
- Verify the service account has access in Search Console
- Check that the property URL format is correct (`sc-domain:icebergdata.co`)

### Error: "URL Inspection API not available"
- The URL Inspection API requires the property to be verified
- Make sure your domain is verified in Search Console
- The API may have rate limits - wait and try again

## Notes

- The Search Console API has rate limits (typically 600 requests per minute)
- URL Inspection API requires the property to be verified
- Some features may require specific permissions in Search Console
- For production use, consider caching results to avoid hitting rate limits

