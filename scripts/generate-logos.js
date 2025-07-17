import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const squareLogoSizes = {
  'small': 48,
  'medium': 96,
  'large': 144,
  'xlarge': 192,
  'navbar': 40
};

const faviconSizes = {
  'favicon-16x16': 16,
  'favicon-32x32': 32,
  'favicon-48x48': 48,
  'android-chrome-192x192': 192,
  'android-chrome-512x512': 512,
  'apple-touch-icon': 180
};

async function generateAssets() {
  try {
    // Input paths
    const squareLogoPath = join(dirname(__dirname), 'Input_for_logo/logo_iceberg_SQUARE_trans.png');
    
    // Output directories
    const logosDir = join(dirname(__dirname), 'public/logos');
    const publicDir = join(dirname(__dirname), 'public');
    await mkdir(logosDir, { recursive: true });

    // Generate square logos
    console.log('Generating square logos...');
    for (const [name, size] of Object.entries(squareLogoSizes)) {
      await sharp(squareLogoPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .toFile(join(logosDir, `logo-${name}.png`));
      console.log(`Generated logo-${name}.png (${size}x${size})`);
    }

    // Generate favicons
    console.log('\nGenerating favicons...');
    for (const [name, size] of Object.entries(faviconSizes)) {
      await sharp(squareLogoPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .toFile(join(publicDir, `${name}.png`));
      console.log(`Generated ${name}.png (${size}x${size})`);
    }

    // Generate favicon.ico
    console.log('\nGenerating favicon.ico...');
    await sharp(squareLogoPath)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(join(publicDir, 'favicon.ico'));
    
    console.log('Generated favicon.ico');
    console.log('\nAll assets generated successfully!');
  } catch (error) {
    console.error('Error generating assets:', error);
  }
}

generateAssets(); 