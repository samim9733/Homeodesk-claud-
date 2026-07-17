const fs = require('fs');
const text = fs.readFileSync('src/repertoryData.ts', 'utf8');
const lines = text.split('\n');
const amels = lines.filter(l => l.includes('amel')).slice(0, 10);
console.log(amels);
