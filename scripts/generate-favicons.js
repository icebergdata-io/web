import sharp from 'sharp';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const faviconSizes = [
  { width: 16, height: 16, name: 'favicon-16x16' },
  { width: 32, height: 32, name: 'favicon-32x32' },
  { width: 48, height: 48, name: 'favicon-48x48' },
  { width: 180, height: 180, name: 'apple-touch-icon' },
  { width: 192, height: 192, name: 'android-chrome-192x192' },
  { width: 512, height: 512, name: 'android-chrome-512x512' },
];

async function generateFavicons() {
  const inputPath = path.join(__dirname, '../public/logo/logo_iceberg_trans_720.png');
  const outputDir = path.join(__dirname, '../public');

  // Generate each favicon size
  for (const size of faviconSizes) {
    await sharp(inputPath)
      .resize(size.width, size.height, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .toFile(path.join(outputDir, `${size.name}.png`));
    
    console.log(`Generated ${size.name} (${size.width}x${size.height})`);
  }

  // Generate ICO file for favicon.ico (includes 16x16, 32x32, and 48x48)
  const icoSizes = faviconSizes.filter(size => size.width <= 48);
  const icoBuffers = await Promise.all(
    icoSizes.map(size =>
      sharp(inputPath)
        .resize(size.width, size.height, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .toBuffer()
    )
  );

  // Combine into ICO file
  const icoData = Buffer.concat(icoBuffers);
  await fs.writeFile(path.join(outputDir, 'favicon.ico'), icoData);
  console.log('Generated favicon.ico');
}

generateFavicons().catch(console.error); 