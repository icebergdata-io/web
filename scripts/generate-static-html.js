import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { slugify } from '../src/utils/slugify.js';
import { readdirSync } from 'fs';

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
  '/careers',
  '/press',
  '/refund-policy'
];

async function generateStaticHTML() {
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
    <meta property="og:image" content="https://www.icebergdata.co/og-logo.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="1200">
    <meta property="og:site_name" content="Iceberg Data">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${getPageTitle(route)}">
    <meta name="twitter:description" content="${getPageDescription(route)}">
    <meta name="twitter:image" content="https://www.icebergdata.co/og-logo.png">
    
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
        <!-- Minimal content for SEO - React will hydrate immediately -->
        <div style="display: none;">
            <h1>${getPageTitle(route)}</h1>
            <p>${getPageDescription(route)}</p>
        </div>
    </div>
    
    <!-- Load the React app -->
    <script type="module" src="${jsPath}"></script>
</body>
</html>`;
      
      writeFileSync(filepath, staticHTML);
      console.log(`✅ Generated: ${filename}`);
    });
    
    // Generate static HTML for case studies
    console.log('\n📚 Generating case study pages...');
    generateCaseStudyPages(distDir, cssPath, jsPath);
    
    // Generate static HTML for job detail pages
    console.log('\n💼 Generating job detail pages...');
    await generateJobDetailPages(distDir, cssPath, jsPath);
    
    console.log('\n🎉 Static HTML generation completed!');
    console.log('📁 Files generated in dist/ directory');
    console.log('🔍 Search engines can now easily find your pages!');
    
  } catch (error) {
    console.error('❌ Static HTML generation failed:', error);
  }
}

function generateCaseStudyPages(distDir, cssPath, jsPath) {
  try {
    const casesDir = resolve(__dirname, '../public/articles/cases');
    
    if (!existsSync(casesDir)) {
      console.log('❌ Cases directory not found.');
      return;
    }
    
    // Read the index.json to get the correct slugs
    const indexPath = resolve(casesDir, 'index.json');
    if (!existsSync(indexPath)) {
      console.log('❌ Case study index not found.');
      return;
    }
    
    const indexContent = readFileSync(indexPath, 'utf8');
    const indexData = JSON.parse(indexContent);
    
    // Create case-study directory
    const caseStudyDir = resolve(distDir, 'case-study');
    if (!existsSync(caseStudyDir)) {
      mkdirSync(caseStudyDir, { recursive: true });
    }
    
    // Generate static HTML for each case study using the correct slugs from index.json
    indexData.caseStudies.forEach(caseStudy => {
      try {
        // Find the corresponding JSON file
        const jsonFile = resolve(casesDir, `${caseStudy.id}.json`);
        if (!existsSync(jsonFile)) {
          console.log(`⚠️ JSON file not found for case study ${caseStudy.id}`);
          return;
        }
        
        const content = readFileSync(jsonFile, 'utf8');
        const caseData = JSON.parse(content);
        
        // Use the exact slug from index.json to match the React app URLs
        const sectorSlug = caseStudy.sector;
        const titleSlug = caseStudy.slug;
        
        // Create a shorter filename to avoid ENAMETOOLONG errors while keeping the URL working
        const maxFilenameLength = 200; // Reasonable limit for filesystem
        const filenameSlug = titleSlug.length > maxFilenameLength 
          ? titleSlug.substring(0, maxFilenameLength) 
          : titleSlug;
        
        // Create sector directory
        const sectorDir = resolve(caseStudyDir, sectorSlug);
        if (!existsSync(sectorDir)) {
          mkdirSync(sectorDir, { recursive: true });
        }
        
        // Create case study HTML file
        const caseStudyHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${caseData.Title} - Iceberg Data Case Study</title>
    <meta name="description" content="${caseData["Business Impact"]}">
    <meta name="keywords" content="${caseData.Sector}, data analytics, case study, business intelligence, ${caseData.Title.toLowerCase()}">
    <meta name="robots" content="noindex, follow">
    <meta name="author" content="Iceberg Data">
    <link rel="canonical" href="https://www.icebergdata.co/case-study/${sectorSlug}/${titleSlug}">
    
    <!-- Open Graph -->
    <meta property="og:title" content="${caseData.Title} - Iceberg Data Case Study">
    <meta property="og:description" content="${caseData["Business Impact"]}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://www.icebergdata.co/case-study/${sectorSlug}/${titleSlug}">
    <meta property="og:image" content="https://www.icebergdata.co/og-logo.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="1200">
    <meta property="og:site_name" content="Iceberg Data">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${caseData.Title} - Iceberg Data Case Study">
    <meta name="twitter:description" content="${caseData["Business Impact"]}">
    <meta name="twitter:image" content="https://www.icebergdata.co/og-logo.png">
    
    <!-- Preload critical assets -->
    <link rel="preload" href="${cssPath}" as="style">
    <link rel="preload" href="${jsPath}" as="script">
    
    <!-- Load CSS -->
    <link rel="stylesheet" href="${cssPath}">
    
    <!-- Structured Data -->
    <script type="application/ld+json">
      ${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": caseData.Title,
        "description": caseData.Subtitle,
        "articleBody": caseData.Story,
        "author": {
          "@type": "Organization",
          "name": "Iceberg Data"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Iceberg Data",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.icebergdata.co/logos/logo-large.png"
          }
        },
        "datePublished": caseData.publicationDate,
        "industry": caseData.Sector,
        "keywords": [caseData.Sector, "data analytics", "case study", "business intelligence"]
      })}
    </script>
</head>
<body>
    <div id="root">
        <!-- Minimal content for SEO - React will hydrate immediately -->
        <div style="display: none;">
            <h1>${caseData.Title}</h1>
            <p>${caseData.Subtitle}</p>
            <p>${caseData["Business Impact"]}</p>
        </div>
    </div>
    
    <!-- Load the React app -->
    <script type="module" src="${jsPath}"></script>
</body>
</html>`;
        
        const filepath = resolve(sectorDir, `${filenameSlug}.html`);
        writeFileSync(filepath, caseStudyHTML);
        console.log(`✅ Generated case study: ${sectorSlug}/${filenameSlug}.html`);
        
      } catch (error) {
        console.error(`❌ Error generating case study ${caseStudy.id}:`, error);
      }
    });
    
  } catch (error) {
    console.error('❌ Error generating case study pages:', error);
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
    '/careers': 'Careers - Join Iceberg Data | Open Positions',
    '/press': 'Press Coverage | Iceberg Data in the News',
    '/refund-policy': 'Refund Policy | Iceberg Data'
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
    '/careers': 'Join our team of data engineers and help build the future of web scraping and data automation. Explore open positions at Iceberg Data. We\'re hiring data engineers, web scraping engineers, and sales development representatives.',
    '/press': 'Latest press coverage and media mentions of Iceberg Data. Read about our web scraping innovations and industry impact.',
    '/refund-policy': 'Our commitment to transparency and customer satisfaction. Learn about our refund policy and how we ensure your peace of mind.'
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
    '/careers': 'careers, jobs, data engineer, web scraping engineer, python developer, remote jobs, Bogotá jobs, software engineer jobs, sales development representative, SDR jobs',
    '/press': 'press coverage, media mentions, Iceberg Data news, web scraping industry news',
    '/refund-policy': 'refund policy, money back guarantee, data accuracy, customer satisfaction, transparency'
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
    '/press': 'Press Coverage & Media Mentions',
    '/refund-policy': 'Refund Policy'
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
    '/press': 'Stay updated with the latest news and media coverage about Iceberg Data. Read about our innovations in web scraping technology and our impact on the data collection industry.',
    '/refund-policy': 'At Iceberg Data, we are committed to delivering high-quality services and ensuring customer satisfaction. If you are not fully satisfied with our services, we offer a 30-day money-back guarantee. This policy applies to all our web scraping, data integration, and custom solutions.'
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

async function generateJobDetailPages(distDir, cssPath, jsPath) {
  try {
    // Import jobsData using dynamic import
    const jobsDataPath = resolve(__dirname, '../src/data/jobsData.js');
    
    if (!existsSync(jobsDataPath)) {
      console.log('❌ Jobs data file not found.');
      return;
    }
    
    // Use dynamic import to load the ES module
    const jobsDataUrl = pathToFileURL(jobsDataPath).href;
    const jobsDataModule = await import(jobsDataUrl);
    const jobOpenings = jobsDataModule.jobOpenings || [];
    
    // Create careers directory
    const careersDir = resolve(distDir, 'careers');
    if (!existsSync(careersDir)) {
      mkdirSync(careersDir, { recursive: true });
    }
    
    // Generate static HTML for each active job
    jobOpenings.forEach(job => {
      if (!job.isActive) {
        return; // Skip inactive jobs
      }
      
      try {
        const jobId = job.id;
        const jobTitle = job.title;
        const jobDescription = job.purpose || `Join our team as a ${jobTitle} at Iceberg Data. ${job.department} position in ${job.location}.`;
        
        // Create job detail HTML file
        const jobDetailHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${jobTitle} - Careers at Iceberg Data</title>
    <meta name="description" content="${jobDescription.substring(0, 160)}">
    <meta name="keywords" content="${jobTitle}, ${job.department}, careers, jobs, Iceberg Data, ${job.location}, ${job.contractType}">
    <meta name="robots" content="noindex, follow">
    <meta name="author" content="Iceberg Data">
    <link rel="canonical" href="https://www.icebergdata.co/careers/${jobId}">
    
    <!-- Open Graph -->
    <meta property="og:title" content="${jobTitle} - Careers at Iceberg Data">
    <meta property="og:description" content="${jobDescription.substring(0, 200)}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://www.icebergdata.co/careers/${jobId}">
    <meta property="og:image" content="https://www.icebergdata.co/og-logo.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="1200">
    <meta property="og:site_name" content="Iceberg Data">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${jobTitle} - Careers at Iceberg Data">
    <meta name="twitter:description" content="${jobDescription.substring(0, 200)}">
    <meta name="twitter:image" content="https://www.icebergdata.co/og-logo.png">
    
    <!-- Preload critical assets -->
    <link rel="preload" href="${cssPath}" as="style">
    <link rel="preload" href="${jsPath}" as="script">
    
    <!-- Load CSS -->
    <link rel="stylesheet" href="${cssPath}">
    
    <!-- Structured Data -->
    <script type="application/ld+json">
      ${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "JobPosting",
        "title": jobTitle,
        "description": jobDescription,
        "identifier": {
          "@type": "PropertyValue",
          "name": "Iceberg Data",
          "value": jobId
        },
        "datePosted": job.postedDate || new Date().toISOString().split('T')[0],
        "employmentType": job.contractType,
        "hiringOrganization": {
          "@type": "Organization",
          "name": "Iceberg Data",
          "sameAs": "https://www.icebergdata.co",
          "logo": "https://www.icebergdata.co/logos/logo-large.png"
        },
        "jobLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": job.location.split(',')[0],
            "addressCountry": job.location.includes('Colombia') ? 'CO' : 'US'
          }
        },
        "baseSalary": {
          "@type": "MonetaryAmount",
          "currency": "USD"
        }
      })}
    </script>
</head>
<body>
    <div id="root">
        <!-- Minimal content for SEO - React will hydrate immediately -->
        <div style="display: none;">
            <h1>${jobTitle}</h1>
            <p>${jobDescription}</p>
            <p>Location: ${job.location}</p>
            <p>Department: ${job.department}</p>
            <p>Type: ${job.contractType}</p>
        </div>
    </div>
    
    <!-- Load the React app -->
    <script type="module" src="${jsPath}"></script>
</body>
</html>`;
        
        const filepath = resolve(careersDir, `${jobId}.html`);
        writeFileSync(filepath, jobDetailHTML);
        console.log(`✅ Generated job detail: ${jobId}.html`);
        
      } catch (error) {
        console.error(`❌ Error generating job detail ${job.id}:`, error);
      }
    });
    
  } catch (error) {
    console.error('❌ Error generating job detail pages:', error);
  }
}

generateStaticHTML(); 