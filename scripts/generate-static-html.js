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
    
    // Read the main index.html to get asset paths
    const indexPath = resolve(distDir, 'index.html');
    if (!existsSync(indexPath)) {
      console.log('❌ index.html not found in dist directory.');
      return;
    }
    
    let indexHTML = readFileSync(indexPath, 'utf8');
    
    // Extract asset paths from the main index.html
    const cssMatch = indexHTML.match(/href="([^"]*\.css)"/);
    const jsMatch = indexHTML.match(/src="([^"]*\.js)"/);
    
    const cssPath = cssMatch ? cssMatch[1] : '/assets/index.css';
    const jsPath = jsMatch ? jsMatch[1] : '/assets/index.js';
    
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
      
      // Create SEO-optimized static HTML without redirects
      const staticHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${getPageTitle(route)}</title>
    <meta name="description" content="${getPageDescription(route)}">
    <meta name="keywords" content="${getPageKeywords(route)}">
    <meta name="robots" content="index, follow">
    <meta name="author" content="Iceberg Data">
    <link rel="canonical" href="https://www.icebergdata.co${route}">
    
    <!-- Open Graph -->
    <meta property="og:title" content="${getPageTitle(route)}">
    <meta property="og:description" content="${getPageDescription(route)}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://www.icebergdata.co${route}">
    <meta property="og:image" content="https://www.icebergdata.co/logos/logo-large.png">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${getPageTitle(route)}">
    <meta name="twitter:description" content="${getPageDescription(route)}">
    <meta name="twitter:image" content="https://www.icebergdata.co/logos/logo-large.png">
    
    <!-- Preload critical assets -->
    <link rel="preload" href="${cssPath}" as="style">
    <link rel="preload" href="${jsPath}" as="script">
    
    <!-- Load CSS -->
    <link rel="stylesheet" href="${cssPath}">
    
    <!-- Structured Data -->
    <script type="application/ld+json">
      ${getStructuredData(route)}
    </script>
</head>
<body>
    <div id="root">
        <!-- SEO-friendly content visible to search engines -->
        <header style="padding: 2rem; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
            <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">${getPageTitle(route)}</h1>
            <p style="font-size: 1.2rem; max-width: 800px; margin: 0 auto;">${getPageDescription(route)}</p>
        </header>
        
        <main style="padding: 2rem; max-width: 1200px; margin: 0 auto;">
            <section style="margin-bottom: 2rem;">
                <h2 style="color: #333; margin-bottom: 1rem;">${getPageHeading(route)}</h2>
                <p style="line-height: 1.6; color: #666;">${getPageContent(route)}</p>
            </section>
            
            <section style="background: #f8f9fa; padding: 2rem; border-radius: 8px;">
                <h3 style="color: #333; margin-bottom: 1rem;">Ready to Get Started?</h3>
                <p style="margin-bottom: 1rem;">Contact us to learn how we can help your business with data collection and web scraping solutions.</p>
                <a href="https://calendly.com/d/csxd-vq2-j8k/data-collection-consultation-with-david-and-gabriel" 
                   style="display: inline-block; background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
                    Schedule a Consultation
                </a>
            </section>
        </main>
        
        <footer style="background: #333; color: white; padding: 2rem; text-align: center; margin-top: 2rem;">
            <p>&copy; 2024 Iceberg Data. All rights reserved.</p>
        </footer>
    </div>
    
    <!-- Load the React app -->
    <script type="module" src="${jsPath}"></script>
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

function getPageKeywords(route) {
  const keywords = {
    '/': 'web scraping service, automated data collection, daily web scraping, web scraper maintenance, enterprise web scraping, reliable data extraction',
    '/car-rental': 'car rental pricing intelligence, competitor pricing analysis, rental market data, Hertz pricing, Avis pricing, Enterprise pricing, Kayak rental data, Expedia rental pricing, car rental market analysis, pricing optimization, fleet availability tracking, rental industry insights',
    '/services': 'web scraping services, data collection solutions, enterprise data services, automated data extraction, custom data solutions',
    '/services/web-scraping': 'web scraping service, automated data collection, daily web scraping, web scraper maintenance, enterprise web scraping, reliable data extraction',
    '/services/data-integration': 'data integration services, ETL solutions, enterprise data integration, data transformation, data pipeline',
    '/services/custom-solutions': 'custom data solutions, enterprise web scraping, custom data collection, tailored data services',
    '/case-studies': 'case studies, web scraping success stories, data collection examples, enterprise data projects',
    '/press': 'press coverage, media mentions, Iceberg Data news, web scraping industry news'
  };
  return keywords[route] || 'web scraping, data collection, enterprise solutions';
}

function getPageHeading(route) {
  const headings = {
    '/': 'Enterprise Web Scraping Services',
    '/car-rental': 'Car Rental Pricing Intelligence Solutions',
    '/services': 'Professional Web Scraping & Data Services',
    '/services/web-scraping': 'Automated Web Scraping Services',
    '/services/data-integration': 'Data Integration & ETL Services',
    '/services/custom-solutions': 'Custom Data Collection Solutions',
    '/case-studies': 'Success Stories & Case Studies',
    '/press': 'Press Coverage & Media Mentions'
  };
  return headings[route] || 'Enterprise Data Solutions';
}

function getPageContent(route) {
  const content = {
    '/': 'We provide expert web scraping services for enterprises, building and maintaining reliable scrapers for daily automated data collection. Our solutions deliver clean, structured data with 24/7 monitoring and maintenance to ensure your business always has the data it needs.',
    '/car-rental': 'Our car rental pricing intelligence platform provides real-time data from major platforms including Hertz, Avis, Enterprise, Kayak, and Expedia. With 99% accuracy guaranteed, you can optimize your pricing strategy and boost profitability through comprehensive competitor analysis and market insights.',
    '/services': 'We offer comprehensive web scraping and data integration services tailored for enterprise needs. Our solutions include custom data collection, automated monitoring, and seamless integration with your existing systems.',
    '/services/web-scraping': 'Our web scraping services provide daily automated data collection with expert-built scrapers and 24/7 monitoring. We ensure reliable data extraction with maintenance and support to keep your data pipeline running smoothly.',
    '/services/data-integration': 'Transform and connect your data sources with our enterprise data integration services. We provide ETL solutions that seamlessly integrate with your existing analytics and CRM systems.',
    '/services/custom-solutions': 'Get tailored data collection solutions designed specifically for your business needs. Our custom web scraping and data processing services scale with your enterprise requirements.',
    '/case-studies': 'Explore real-world examples of how our web scraping solutions have helped businesses collect and analyze data effectively. See the measurable impact of our data collection services.',
    '/press': 'Stay updated with the latest news and media coverage about Iceberg Data. Read about our innovations in web scraping technology and our impact on the data collection industry.'
  };
  return content[route] || 'Professional data collection and web scraping solutions for enterprise businesses.';
}

function getStructuredData(route) {
  const baseData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "provider": {
      "@type": "Organization",
      "name": "Iceberg Data",
      "url": "https://www.icebergdata.co",
      "logo": "https://www.icebergdata.co/logos/logo-large.png"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "price": "Custom",
      "priceCurrency": "USD"
    }
  };

  if (route === '/car-rental') {
    return JSON.stringify({
      ...baseData,
      "name": "Car Rental Pricing Intelligence & Market Analysis",
      "description": "Professional web scraping services for car rental businesses. Get real-time competitor pricing, availability insights, and market analysis.",
      "serviceType": "Car Rental Market Intelligence & Web Scraping",
      "areaServed": "Worldwide",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "100+",
        "bestRating": "5",
        "worstRating": "1"
      }
    });
  }

  return JSON.stringify({
    ...baseData,
    "name": getPageTitle(route),
    "description": getPageDescription(route),
    "serviceType": "Web Scraping & Data Collection"
  });
}

generateStaticHTML(); 