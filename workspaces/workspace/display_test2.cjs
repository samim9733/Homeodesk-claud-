const fs = require('fs');
const text = fs.readFileSync('src/types.ts', 'utf8');
console.log(text.match(/interface SubRubric {(.*?)}/s)[0]);
