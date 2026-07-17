const fs = require('fs');
const text = fs.readFileSync('src/repertoryData.ts', 'utf8');
const lines = text.split('\n');
const names = lines.filter(l => l.includes('"name":')).map(l => l.split('"name": "')[1]?.replace('",', ''));
console.log(names.slice(20, 40));
