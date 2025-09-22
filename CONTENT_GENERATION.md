# Automated Content Generation System

This document explains the automated content generation and publishing system for Iceberg Data's case studies, powered by Google's Gemini AI.

## 🏗️ System Overview

The system consists of two main components:

1. **Content Generation**: AI-powered creation of case studies using Gemini API
2. **Scheduled Publishing**: Automated daily publishing via GitHub Actions

### Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Generation    │    │   Storage        │    │   Publishing    │
│   Scripts       │───▶│   JSON Files     │───▶│   GitHub Action │
│   (Gemini AI)   │    │   (Future Dates) │    │   (Daily Cron)  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x (required for Vercel deployment)
- Google Gemini API key
- Git repository with GitHub Actions enabled

### Setup

1. **Install dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Configure API key**:
   Create a `.env` file in the project root:
   ```bash
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Generate case studies**:
   ```bash
   npm run generate-case-studies -- --sector=Retail --count=5 --start-date=2025-02-01 --end-date=2025-07-31
   ```

## 📝 Content Generation

### Main Generation Script

**File**: `scripts/generate-new-case-studies.js`

This script uses Google's Gemini 2.5 Pro model to generate realistic case studies for Iceberg Data's web scraping services.

#### Features

- **AI-Powered Content**: Uses Gemini 2.5 Pro for high-quality case study generation
- **Sector-Specific**: Generates content tailored to specific business sectors
- **Date Scheduling**: Assigns random publication dates within specified ranges
- **Batch Processing**: Supports concurrent generation for efficiency
- **Validation**: Built-in content validation and retry logic
- **Error Handling**: Robust error handling with detailed logging

#### Command Line Options

```bash
node scripts/generate-new-case-studies.js [options]

Options:
  --sector=<sector>        Business sector (default: Retail)
  --count=<number>         Number of case studies to generate (default: 1)
  --start-from=<number>    Starting case study number (default: 1)
  --start-date=<date>      Start date for publication range (default: 2025-02-01)
  --end-date=<date>        End date for publication range (default: 2025-07-31)
  --model=<model>          Gemini model to use (default: gemini-2.5-pro)
```

#### Examples

```bash
# Generate 3 retail case studies
npm run generate-case-studies -- --sector=Retail --count=3

# Generate healthcare case studies for Q2 2025
npm run generate-case-studies -- --sector=Healthcare --count=5 --start-date=2025-04-01 --end-date=2025-06-30

# Generate case studies starting from number 50
npm run generate-case-studies -- --sector=E-commerce --count=10 --start-from=50
```

### Content Structure

Each generated case study includes:

- **Title**: Compelling, specific title with metrics
- **Subtitle**: Brief description of the solution
- **Sector**: Business sector classification
- **Story**: Detailed 500+ word narrative in HTML format
- **Business Impact**: Quantifiable results and metrics
- **Problems Solved**: List of specific challenges addressed
- **Input Schema**: JSON structure of required input data
- **Output Schema**: JSON structure of generated output data
- **Matching Algorithm**: Technical approach description
- **Publication Date**: Scheduled publication date

### File Organization

Generated case studies are stored in:
```
public/articles/cases/
├── case-study-1.json
├── case-study-2.json
├── ...
└── index.json (auto-generated)
```

## 📅 Scheduled Publishing

### GitHub Actions Workflow

**File**: `.github/workflows/scheduled-index-update.yml`

The system automatically publishes case studies daily at 9:00 AM UTC using GitHub Actions.

#### Workflow Steps

1. **Checkout Repository**: Gets the latest code
2. **Setup Node.js**: Configures Node.js 22.x environment
3. **Install Dependencies**: Installs npm packages
4. **Regenerate Index**: Runs the index regeneration script
5. **Check for Changes**: Detects if new content should be published
6. **Commit & Push**: Automatically commits and pushes changes

#### Publishing Logic

The system uses a "future-dated content" approach:

1. **Generation Phase**: Case studies are created with future publication dates
2. **Storage Phase**: Files are stored but not included in the public index
3. **Publishing Phase**: Daily workflow reveals content when publication date arrives

#### Index Regeneration

**File**: `scripts/regenerate-index.js`

This script:
- Scans all case study files in `public/articles/cases/`
- Filters out future-dated content (not yet ready for publication)
- Generates a clean index file with only published content
- Updates the sitemap automatically
- Sorts content by publication date (newest first)

## 🛠️ Supporting Scripts

### Content Enhancement

- **`scripts/improve-stories.js`**: Enhances existing case study narratives
- **`scripts/improve-single-story.js`**: Improves individual case studies
- **`scripts/generate-exact-schemas.js`**: Generates detailed input/output schemas

### SEO & Discovery

- **`scripts/generate-sitemap.js`**: Creates XML sitemap for search engines
- **`scripts/generate-seo-files.js`**: Generates SEO metadata files
- **`scripts/generate-static-html.js`**: Creates static HTML versions

### Utilities

- **`scripts/add-publication-dates.js`**: Adds publication dates to existing content
- **`scripts/format-stories.js`**: Formats and cleans up story content
- **`scripts/list-case-studies.js`**: Lists all case studies with metadata
- **`scripts/check-processed-stories.js`**: Validates processed content

## 📋 Available NPM Scripts

```bash
# Content Generation
npm run generate-case-studies          # Generate new case studies
npm run regenerate-index              # Regenerate case studies index

# SEO & Discovery
npm run generate-sitemap              # Generate XML sitemap
npm run generate-seo                  # Generate SEO files

# Development
npm run dev:add-dates                 # Add publication dates
npm run dev:generate-schemas          # Generate exact schemas
npm run dev:format-stories            # Format story content
npm run dev:list-cases                # List all case studies
npm run dev:improve-stories           # Improve existing stories
npm run dev:check-stories             # Check processed stories
npm run dev:improve-story             # Improve single story

# Build & Deploy
npm run build                         # Build with index regeneration
npm run build:prerender               # Generate static HTML
npm run build:seo                     # Build with SEO optimization
```

## 🔧 Configuration

### Environment Variables

```bash
# Required
GEMINI_API_KEY=your_gemini_api_key_here

# Optional (with defaults)
NODE_ENV=production
```

### Generation Settings

The system uses these default settings (configurable in code):

```javascript
const DELAY_BETWEEN_CALLS_MS = 1000;     // 1 second between API calls
const MAX_API_RETRIES = 3;               // Retry failed API calls
const MAX_VALIDATION_RETRIES = 2;        // Retry validation failures
const CONCURRENT_REQUESTS = 5;           // Concurrent generation limit
```

### Supported Sectors

The system can generate content for various business sectors:

- Retail
- Healthcare
- E-commerce
- Finance
- Manufacturing
- Technology
- Real Estate
- Travel & Hospitality
- Education
- And more...

## 🚨 Troubleshooting

### Common Issues

#### 1. API Key Errors
```
Error: GEMINI_API_KEY environment variable is not set
```
**Solution**: Ensure your `.env` file contains a valid Gemini API key.

#### 2. Generation Failures
```
❌ Critical error during generation: API Error: HTTP status 429
```
**Solution**: Rate limiting - the script includes automatic retries and delays.

#### 3. Validation Errors
```
⚠️ Validation failed: Missing required field 'Title'
```
**Solution**: The system automatically retries with improved prompts.

#### 4. GitHub Actions Failures
```
Error: No changes to index file
```
**Solution**: This is normal when no new content is ready for publication.

### Debug Mode

Enable detailed logging by setting:
```bash
NODE_ENV=development
```

### Manual Index Regeneration

If the automated workflow fails, manually regenerate the index:
```bash
npm run regenerate-index
```

### Checking Generated Content

List all case studies with their status:
```bash
npm run dev:list-cases
```

## 🔄 Workflow Examples

### Typical Content Creation Workflow

1. **Plan Content Strategy**:
   ```bash
   # Generate 10 retail case studies for Q2 2025
   npm run generate-case-studies -- --sector=Retail --count=10 --start-date=2025-04-01 --end-date=2025-06-30
   ```

2. **Review Generated Content**:
   ```bash
   npm run dev:list-cases
   ```

3. **Enhance Content** (optional):
   ```bash
   npm run dev:improve-stories
   ```

4. **Verify Publication Schedule**:
   - Check that case studies have appropriate publication dates
   - Ensure content will be revealed on desired dates

5. **Monitor Automated Publishing**:
   - GitHub Actions will automatically publish content daily
   - Check the Actions tab for workflow status

### Content Maintenance Workflow

1. **Regular Content Review**:
   ```bash
   npm run dev:check-stories
   ```

2. **Update SEO Files**:
   ```bash
   npm run generate-seo
   ```

3. **Regenerate Sitemap**:
   ```bash
   npm run generate-sitemap
   ```

## 📊 Monitoring & Analytics

### GitHub Actions Monitoring

- Check workflow status in the Actions tab
- Review commit messages for published content
- Monitor for any workflow failures

### Content Analytics

- Track publication dates and frequency
- Monitor content quality and engagement
- Analyze sector distribution and coverage

## 🔐 Security Considerations

- **API Keys**: Store Gemini API key in environment variables only
- **Rate Limiting**: Built-in delays prevent API abuse
- **Content Validation**: All generated content is validated before storage
- **GitHub Permissions**: Workflow uses minimal required permissions

## 🚀 Future Enhancements

Potential improvements to consider:

- **Multi-language Support**: Generate content in multiple languages
- **Content Templates**: Customizable templates for different content types
- **Analytics Integration**: Track content performance and engagement
- **A/B Testing**: Test different content variations
- **Content Scheduling UI**: Web interface for content management
- **Quality Scoring**: Automated content quality assessment

## 📞 Support

For issues or questions about the content generation system:

1. Check this documentation first
2. Review the troubleshooting section
3. Check GitHub Actions logs for workflow issues
4. Examine generated content for quality issues
5. Verify API key and environment configuration

---

*Last updated: January 2025*

