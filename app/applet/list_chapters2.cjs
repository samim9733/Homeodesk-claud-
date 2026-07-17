const fs = require('fs');
const content = fs.readFileSync('src/repertoryData.ts', 'utf8');
const lines = content.split('\n');
const chapterLines = lines.filter(l => l.startsWith('  {') || l.startsWith('    name: "'));
console.log(chapterLines.join('\n').slice(0, 500));
