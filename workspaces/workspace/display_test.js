const fs = require('fs');
const data = fs.readFileSync('src/repertoryData.ts', 'utf8');
const lines = data.split('\n');
const subrubrics = lines.filter(l => l.includes('"name":') && l.includes(',')).slice(0, 10);
console.log(subrubrics);
