const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const zodiacSigns = [
  { name: 'rat', emoji: '🐭', color: '#4B5563', gradient: ['#6B7280', '#374151'] },
  { name: 'ox', emoji: '🐮', color: '#92400E', gradient: ['#B45309', '#78350F'] },
  { name: 'tiger', emoji: '🐯', color: '#EA580C', gradient: ['#F97316', '#DC2626'] },
  { name: 'rabbit', emoji: '🐰', color: '#EC4899', gradient: ['#F472B6', '#E11D48'] },
  { name: 'dragon', emoji: '🐲', color: '#DC2626', gradient: ['#EF4444', '#9333EA'] },
  { name: 'snake', emoji: '🐍', color: '#059669', gradient: ['#10B981', '#15803D'] },
  { name: 'horse', emoji: '🐴', color: '#D97706', gradient: ['#F59E0B', '#EA580C'] },
  { name: 'goat', emoji: '🐐', color: '#78716C', gradient: ['#A8A29E', '#57534E'] },
  { name: 'monkey', emoji: '🐵', color: '#CA8A04', gradient: ['#EAB308', '#CA8A04'] },
  { name: 'rooster', emoji: '🐓', color: '#DC2626', gradient: ['#F87171', '#E11D48'] },
  { name: 'dog', emoji: '🐕', color: '#EA580C', gradient: ['#FB923C', '#D97706'] },
  { name: 'pig', emoji: '🐷', color: '#F472B6', gradient: ['#F9A8D4', '#FB7185'] },
];

const width = 1200;
const height = 630;

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function generateOGImage(zodiac) {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${zodiac.gradient[0]};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${zodiac.gradient[1]};stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <rect width="${width}" height="${height}" fill="url(#grad)"/>
      
      <!-- Decorative circles -->
      <circle cx="100" cy="100" r="150" fill="rgba(255,255,255,0.1)"/>
      <circle cx="1100" cy="530" r="200" fill="rgba(255,255,255,0.08)"/>
      <circle cx="600" cy="315" r="300" fill="rgba(255,255,255,0.05)"/>
      
      <!-- Stars -->
      <text x="150" y="150" font-size="30" fill="rgba(255,255,255,0.6)">✦</text>
      <text x="1050" y="200" font-size="25" fill="rgba(255,255,255,0.5)">✦</text>
      <text x="200" y="500" font-size="20" fill="rgba(255,255,255,0.4)">✦</text>
      <text x="1000" y="450" font-size="35" fill="rgba(255,255,255,0.5)">✦</text>
      <text x="500" y="100" font-size="20" fill="rgba(255,255,255,0.3)">✦</text>
      
      <!-- Main content -->
      <text x="600" y="280" font-size="180" text-anchor="middle" font-family="Arial, sans-serif">${zodiac.emoji}</text>
      
      <text x="600" y="420" font-size="56" font-weight="bold" text-anchor="middle" fill="white" font-family="Arial, sans-serif">
        Year of the ${escapeXml(zodiac.name.charAt(0).toUpperCase() + zodiac.name.slice(1))}
      </text>
      
      <text x="600" y="480" font-size="28" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-family="Arial, sans-serif">
        2026 Fortune Reading - Career - Love - Lucky Numbers
      </text>
      
      <text x="600" y="560" font-size="24" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-family="Arial, sans-serif">
        fortune-cookie.me
      </text>
    </svg>
  `;

  const outputPath = path.join(__dirname, '../public/og-zodiac-' + zodiac.name + '.jpg');
  
  await sharp(Buffer.from(svg))
    .jpeg({ quality: 90 })
    .toFile(outputPath);
  
  console.log(`✓ Generated og-zodiac-${zodiac.name}.jpg`);
}

async function generateMainOGImage() {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#6366F1;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#A855F7;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <rect width="${width}" height="${height}" fill="url(#mainGrad)"/>
      
      <!-- Decorative elements -->
      <circle cx="100" cy="100" r="150" fill="rgba(255,255,255,0.1)"/>
      <circle cx="1100" cy="530" r="200" fill="rgba(255,255,255,0.08)"/>
      <circle cx="600" cy="315" r="250" fill="rgba(255,255,255,0.05)"/>
      
      <!-- Stars -->
      <text x="150" y="150" font-size="40" fill="rgba(255,255,255,0.6)">✦</text>
      <text x="1050" y="180" font-size="30" fill="rgba(255,255,255,0.5)">✦</text>
      <text x="180" y="520" font-size="25" fill="rgba(255,255,255,0.4)">✦</text>
      <text x="1020" y="480" font-size="35" fill="rgba(255,255,255,0.5)">✦</text>
      
      <!-- Fortune cookie emoji -->
      <text x="600" y="240" font-size="140" text-anchor="middle" font-family="Arial, sans-serif">🥠</text>
      
      <text x="600" y="360" font-size="52" font-weight="bold" text-anchor="middle" fill="white" font-family="Arial, sans-serif">
        Fortune Cookie
      </text>
      
      <text x="600" y="420" font-size="32" text-anchor="middle" fill="rgba(255,255,255,0.95)" font-family="Arial, sans-serif">
        Free Chinese Zodiac Readings and Daily Fortune
      </text>
      
      <text x="600" y="470" font-size="24" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="Arial, sans-serif">
        Personalized Insights - Lucky Numbers - 2026 Predictions
      </text>
      
      <text x="600" y="560" font-size="22" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-family="Arial, sans-serif">
        fortune-cookie.me
      </text>
    </svg>
  `;

  const outputPath = path.join(__dirname, '../public/og-image.jpg');
  
  await sharp(Buffer.from(svg))
    .jpeg({ quality: 90 })
    .toFile(outputPath);
  
  console.log(`✓ Generated og-image.jpg (main)`);
}

async function main() {
  console.log('Generating OG images...\n');
  
  // Generate main OG image
  await generateMainOGImage();
  
  // Generate zodiac OG images
  for (const zodiac of zodiacSigns) {
    await generateOGImage(zodiac);
  }
  
  console.log('\n✅ All OG images generated successfully!');
}

main().catch(console.error);
