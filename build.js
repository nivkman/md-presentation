const fs = require('fs');
const path = require('path');

const slidesDir = path.join(__dirname, 'slides');
const output = path.join(__dirname, 'slides.js');

const files = fs.readdirSync(slidesDir)
  .filter(f => f.endsWith('.md'))
  .sort();

const content = files
  .map(f => fs.readFileSync(path.join(slidesDir, f), 'utf8').trim())
  .join('\n\n---\n\n');

const escaped = content.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');

fs.writeFileSync(output, `const SLIDES = \`\n${escaped}\n\`;\n`);

console.log(`Built ${files.length} slides → slides.js`);
files.forEach(f => console.log(`  ${f}`));
