import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Routes to generate static HTML for
const routes = [
  '/',
  '/car-rental',
  '/services',
  '/services/web-scraping',
  '/services/data-integration',
  '/services/custom-solutions',
  '/case-studies',
  '/press'
];

function generateStaticHTML() {
  console.log('🚀 Generating static HTML files for SEO...');
  
  try {
    const distDir = resolve(__dirname, '../dist');
    
    if (!existsSync(distDir)) {
      console.log('❌ Dist directory not found. Please run "npm run build" first.');
      return;
    }
    
    // Read the main index.html
    const indexPath = resolve(distDir, 'index.html');
    if (!existsSync(indexPath)) {
      console.log('❌ index.html not found in dist directory.');
      return;
    }
    
    let indexHTML = readFileSync(indexPath, 'utf8');
    
    // Generate static HTML for each route
    routes.forEach(route => {
      console.log(`📄 Generating: ${route}`);
      
      // Create filename
      const filename = route === '/' ? 'index.html' : `${route.slice(1)}.html`;
      const filepath = resolve(distDir, filename);
      
      // Ensure directory exists
      const fileDir = dirname(filepath);
      if (!existsSync(fileDir)) {
        mkdirSync(fileDir, { recursive: true });
      }
      
      // For now, we'll create a basic HTML file that redirects to the SPA
      // This ensures search engines can find the pages
      const staticHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${getPageTitle(route)}</title>
    <meta name="description" content="${getPageDescription(route)}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://www.icebergdata.co${route}">
    
    <!-- Preload the main app -->
    <link rel="preload" href="/assets/index.js" as="script">
    <link rel="preload" href="/assets/index.css" as="style">
    
    <!-- Redirect to SPA after a brief moment for SEO -->
    <script>
        // This ensures search engines can crawl the content
        // while still providing the full SPA experience
        window.location.href = '${route}';
    </script>
</head>
<body>
    <div id="root">
        <!-- SEO-friendly content that will be replaced by React -->
        <h1>${getPageTitle(route)}</h1>
        <p>${getPageDescription(route)}</p>
        <p>Loading...</p>
    </div>
    
    <!-- Load the main app -->
    <script type="module" src="/assets/index.js"></script>
</body>
</html>`;
      
      writeFileSync(filepath, staticHTML);
      console.log(`✅ Generated: ${filename}`);
    });
    
    console.log('\n🎉 Static HTML generation completed!');
    console.log('📁 Files generated in dist/ directory');
    console.log('🔍 Search engines can now easily find your pages!');
    
  } catch (error) {
    console.error('❌ Static HTML generation failed:', error);
  }
}

function getPageTitle(route) {
  const titles = {
    '/': 'Enterprise Web Scraping Services | Custom Data Collection Solutions | Iceberg Data',
    '/car-rental': 'Car Rental Pricing Intelligence | Real-Time Market Analysis | Iceberg Data',
    '/services': 'Web Scraping Services | Data Collection Solutions | Iceberg Data',
    '/services/web-scraping': 'Web Scraping Services | Automated Data Collection | Iceberg Data',
    '/services/data-integration': 'Data Integration Services | ETL Solutions | Iceberg Data',
    '/services/custom-solutions': 'Custom Data Solutions | Enterprise Web Scraping | Iceberg Data',
    '/case-studies': 'Case Studies | Web Scraping Success Stories | Iceberg Data',
    '/press': 'Press Coverage | Iceberg Data in the News'
  };
  return titles[route] || 'Iceberg Data - Enterprise Web Scraping Services';
}

function getPageDescription(route) {
  const descriptions = {
    '/': 'Expert web scraping services for enterprises. We build & maintain reliable scrapers for daily automated data collection. Get clean, structured data with 24/7 monitoring and maintenance.',
    '/car-rental': 'Get real-time car rental pricing intelligence from Hertz, Avis, Enterprise & more. Boost profitability with competitor analysis, availability insights & market trends. 99% accuracy guaranteed.',
    '/services': 'Professional web scraping and data integration services. Custom solutions for enterprise data collection needs with 24/7 monitoring and maintenance.',
    '/services/web-scraping': 'Professional web scraping service with daily automated data collection. Expert-built scrapers with 24/7 monitoring and maintenance.',
    '/services/data-integration': 'Enterprise data integration and ETL services. Seamlessly connect and transform your data sources for better insights.',
    '/services/custom-solutions': 'Custom data collection solutions tailored to your specific business needs. Enterprise-grade web scraping and data processing.',
    '/case-studies': 'Real-world case studies and success stories from our web scraping projects. See how we help businesses collect and analyze data.',
    '/press': 'Latest press coverage and media mentions of Iceberg Data. Read about our web scraping innovations and industry impact.'
  };
  return descriptions[route] || 'Enterprise web scraping and data collection solutions provider.';
}

generateStaticHTML(); 