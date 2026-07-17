import fs from 'fs';
const content = fs.readFileSync('src/repertoryData.ts', 'utf8');
const chapters = content.match(/ {4}name: "([^"]+)",/g);
console.log(chapters?.join('\n'));
