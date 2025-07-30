import puppeteer from 'puppeteer';
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Static routes to pre-render
const staticRoutes = [
  '/',
  '/car-rental',
  '/services',
  '/services/web-scraping',
  '/services/data-integration',
  '/services/custom-solutions',
  '/case-studies',
  '/press'
];

// Function to get case study routes from index.json
function getCaseStudyRoutes() {
  try {
    const indexPath = resolve(__dirname, '../public/articles/cases/index.json');
    const indexData = JSON.parse(readFileSync(indexPath, 'utf8'));
    
    return indexData.caseStudies.map(study => 
      `/case-study/${study.sector}/${study.slug}`
    );
  } catch (error) {
    console.error('❌ Error reading case study index:', error.message);
    return [];
  }
}

// Function to pre-render a single route
async function prerenderRoute(page, route, distDir) {
  try {
    console.log(`📄 Pre-rendering: ${route}`);
    
    // Navigate to the route with optimized settings
    await page.goto(`http://localhost:5173${route}`, {
      waitUntil: 'domcontentloaded', // Faster than 'networkidle0'
      timeout: 15000 // Reduced timeout
    });
    
    // Reduced wait time for React hydration
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get the rendered HTML
    const html = await page.content();
    
    // Create filename
    const filename = route === '/' ? 'index.html' : `${route.slice(1)}.html`;
    const filepath = resolve(distDir, filename);
    
    // Ensure directory exists
    const fileDir = dirname(filepath);
    if (!existsSync(fileDir)) {
      mkdirSync(fileDir, { recursive: true });
    }
    
    // Write the HTML file
    writeFileSync(filepath, html);
    console.log(`✅ Generated: ${filename}`);
    
  } catch (error) {
    console.error(`❌ Failed to pre-render ${route}:`, error.message);
  }
}

async function prerender() {
  console.log('🚀 Starting optimized pre-rendering process...');
  
  // Get all routes including case studies
  const caseStudyRoutes = getCaseStudyRoutes();
  const allRoutes = [...staticRoutes, ...caseStudyRoutes];
  
  console.log(`📊 Found ${caseStudyRoutes.length} case study routes to pre-render`);
  console.log(`📊 Total routes to pre-render: ${allRoutes.length}`);
  
  let browser;
  
  try {
    // Start the development server
    console.log('🌐 Starting development server...');
    const { spawn } = await import('child_process');
    const devServer = spawn('npm', ['run', 'dev'], { 
      stdio: 'pipe',
      cwd: resolve(__dirname, '..')
    });
    
    // Reduced wait time for server to start
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Launch browser with optimized settings
    console.log('🔍 Launching optimized headless browser...');
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });
    
    const page = await browser.newPage();
    
    // Optimize page settings for speed
    await page.setViewport({ width: 1280, height: 720 }); // Smaller viewport
    await page.setRequestInterception(true);
    
    // Block unnecessary resources to speed up loading
    page.on('request', (req) => {
      const resourceType = req.resourceType();
      if (resourceType === 'image' || resourceType === 'stylesheet' || resourceType === 'font') {
        req.abort();
      } else {
        req.continue();
      }
    });
    
    // Create dist directory if it doesn't exist
    const distDir = resolve(__dirname, '../dist');
    if (!existsSync(distDir)) {
      mkdirSync(distDir, { recursive: true });
    }
    
    // Pre-render routes sequentially (faster than concurrent for this use case)
    for (const route of allRoutes) {
      await prerenderRoute(page, route, distDir);
    }
    
    console.log('\n🎉 Pre-rendering completed successfully!');
    console.log('📁 Static HTML files generated in dist/ directory');
    console.log('🔍 Search engines can now easily crawl your content!');
    console.log('\n📄 Pre-rendered routes:');
    console.log('   Static routes:');
    staticRoutes.forEach(route => {
      const filename = route === '/' ? 'index.html' : `${route.slice(1)}.html`;
      console.log(`     - ${route} → ${filename}`);
    });
    console.log('   Case study routes:');
    caseStudyRoutes.slice(0, 5).forEach(route => {
      const filename = `${route.slice(1)}.html`;
      console.log(`     - ${route} → ${filename}`);
    });
    if (caseStudyRoutes.length > 5) {
      console.log(`     ... and ${caseStudyRoutes.length - 5} more case study routes`);
    }
    
  } catch (error) {
    console.error('❌ Pre-rendering failed:', error);
    process.exit(1);
  } finally {
    // Cleanup
    if (browser) {
      await browser.close();
    }
    console.log('🧹 Cleanup completed');
  }
}

prerender(); 