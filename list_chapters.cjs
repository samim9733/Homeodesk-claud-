const fs = require('fs');
const code = fs.readFileSync('src/repertoryData.ts', 'utf8');
const lines = code.split('\n');
const chapters = lines.filter(l => l.match(/^\s+name: "/));
console.log(chapters);
