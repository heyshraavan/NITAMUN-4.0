import fs from 'fs';

const code = fs.readFileSync('dist/assets/index-CVF7qLVH.js', 'utf8');
console.log('Total file length:', code.length, 'bytes');

const lucideCount = (code.match(/createLucideIcon/g) || []).length;
console.log('Total createLucideIcon occurrences:', lucideCount);

// Look for package origins
if (code.includes('react-dom')) console.log('Contains react-dom');
if (code.includes('lenis')) console.log('Contains lenis');
if (code.includes('gsap')) console.log('Contains gsap');
if (code.includes('tailwind')) console.log('Contains tailwind');

// Check sizes of other bundles
const files = fs.readdirSync('dist/assets');
console.log('\n--- All Assets in dist/assets ---');
files.forEach(f => {
  const stat = fs.statSync(`dist/assets/${f}`);
  console.log(`${f.padEnd(40)}: ${(stat.size / 1024).toFixed(2)} kB`);
});
