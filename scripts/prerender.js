import puppeteer from 'puppeteer';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Routes to pre-render
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

async function prerender() {
  console.log('🚀 Starting pre-rendering process...');
  
  let browser;
  
  try {
    // Start the development server
    console.log('🌐 Starting development server...');
    const { spawn } = await import('child_process');
    const devServer = spawn('npm', ['run', 'dev'], { 
      stdio: 'pipe',
      cwd: resolve(__dirname, '..')
    });
    
    // Wait for server to start
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Launch browser
    console.log('🔍 Launching headless browser...');
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set viewport
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Create dist directory if it doesn't exist
    const distDir = resolve(__dirname, '../dist');
    if (!existsSync(distDir)) {
      mkdirSync(distDir, { recursive: true });
    }
    
    // Pre-render each route
    for (const route of routes) {
      console.log(`📄 Pre-rendering: ${route}`);
      
      try {
        // Navigate to the route
        await page.goto(`http://localhost:5173${route}`, {
          waitUntil: 'networkidle0',
          timeout: 30000
        });
        
        // Wait for React to hydrate
        await new Promise(resolve => setTimeout(resolve, 2000));
        
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
    
    console.log('\n🎉 Pre-rendering completed successfully!');
    console.log('📁 Static HTML files generated in dist/ directory');
    console.log('🔍 Search engines can now easily crawl your content!');
    console.log('\n📄 Pre-rendered routes:');
    routes.forEach(route => {
      const filename = route === '/' ? 'index.html' : `${route.slice(1)}.html`;
      console.log(`   - ${route} → ${filename}`);
    });
    
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