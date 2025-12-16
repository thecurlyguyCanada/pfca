import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

// Canadian maple leaf SVG path (simplified)
const mapleLeafPath = `M12 0L13.5 4.5L18 4.5L14.5 7.5L16 12L12 9L8 12L9.5 7.5L6 4.5L10.5 4.5Z`;

// Create OG Image (1200x630) - Main social media sharing image
async function createOGImage() {
  const width = 1200;
  const height = 630;

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FF0000;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#C40000;stop-opacity:1" />
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.3"/>
        </filter>
      </defs>

      <!-- Background -->
      <rect width="${width}" height="${height}" fill="url(#bgGradient)"/>

      <!-- Decorative maple leaves -->
      <g fill="rgba(255,255,255,0.08)" transform="translate(50, 80) scale(8)">
        ${mapleLeafPath.replace('M', 'M').replace(/Z/, 'Z')}
      </g>
      <g fill="rgba(255,255,255,0.06)" transform="translate(1000, 400) scale(10)">
        ${mapleLeafPath}
      </g>
      <g fill="rgba(255,255,255,0.05)" transform="translate(900, 50) scale(6)">
        ${mapleLeafPath}
      </g>

      <!-- Main content card -->
      <rect x="100" y="115" width="1000" height="400" rx="24" fill="white" filter="url(#shadow)"/>

      <!-- Logo circle -->
      <circle cx="230" cy="315" r="80" fill="#FF0000"/>
      <text x="230" y="315" text-anchor="middle" dominant-baseline="central"
            font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="white">P</text>

      <!-- Main text -->
      <text x="350" y="260" font-family="Arial, sans-serif" font-size="56" font-weight="bold" fill="#1a1a1a">
        pdfcanada.ca
      </text>

      <!-- Tagline -->
      <text x="350" y="330" font-family="Arial, sans-serif" font-size="28" fill="#666666">
        Free PDF Tools | Proudly Canadian
      </text>

      <!-- Features -->
      <text x="350" y="400" font-family="Arial, sans-serif" font-size="22" fill="#888888">
        Secure • Private • No Signup Required
      </text>

      <!-- Canadian flag indicator -->
      <rect x="950" y="135" width="130" height="80" rx="8" fill="#FF0000"/>
      <rect x="990" y="135" width="50" height="80" fill="white"/>
      <g fill="#FF0000" transform="translate(1015, 175) scale(2.5)">
        <path d="M0-8L1.5-3L6-3L2.5 1L4 6L0 3L-4 6L-2.5 1L-6-3L-1.5-3Z"/>
      </g>
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(join(publicDir, 'og-image.png'));

  console.log('Created og-image.png (1200x630)');
}

// Create Twitter-specific image (same as OG for summary_large_image)
async function createTwitterImage() {
  // Twitter summary_large_image uses the same dimensions as OG
  // We'll create a copy or use the same file
  console.log('Twitter image uses og-image.png');
}

// Create Favicon 32x32
async function createFavicon32() {
  const size = 32;
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" rx="6" fill="#FF0000"/>
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central"
            font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="white">P</text>
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(join(publicDir, 'favicon-32x32.png'));

  console.log('Created favicon-32x32.png');
}

// Create Favicon 16x16
async function createFavicon16() {
  const size = 16;
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" rx="3" fill="#FF0000"/>
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central"
            font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="white">P</text>
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(join(publicDir, 'favicon-16x16.png'));

  console.log('Created favicon-16x16.png');
}

// Create Apple Touch Icon (180x180)
async function createAppleTouchIcon() {
  const size = 180;
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FF0000;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#D80000;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${size}" height="${size}" rx="36" fill="url(#iconGradient)"/>
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central"
            font-family="Arial, sans-serif" font-size="100" font-weight="bold" fill="white">P</text>
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(join(publicDir, 'apple-touch-icon.png'));

  console.log('Created apple-touch-icon.png (180x180)');
}

// Create Android Chrome icons for PWA
async function createAndroidIcons() {
  const sizes = [192, 512];

  for (const size of sizes) {
    const svg = `
      <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="androidGradient${size}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#FF0000;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#D80000;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#androidGradient${size})"/>
        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central"
              font-family="Arial, sans-serif" font-size="${size * 0.55}" font-weight="bold" fill="white">P</text>
      </svg>
    `;

    await sharp(Buffer.from(svg))
      .png()
      .toFile(join(publicDir, `android-chrome-${size}x${size}.png`));

    console.log(`Created android-chrome-${size}x${size}.png`);
  }
}

// Run all generators
async function main() {
  console.log('Generating social media and favicon images...\n');

  try {
    await createOGImage();
    await createTwitterImage();
    await createFavicon32();
    await createFavicon16();
    await createAppleTouchIcon();
    await createAndroidIcons();

    console.log('\nAll images generated successfully!');
  } catch (error) {
    console.error('Error generating images:', error);
    process.exit(1);
  }
}

main();
