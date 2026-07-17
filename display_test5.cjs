const fs = require('fs');
const text = fs.readFileSync('src/extracted_data.txt', 'utf8');
const lines = text.split('\n');
const depths = new Set();
for (const line of lines) {
    const rawMatch = line.match(/^(\s*)([0-9\.]+)\s+(.*)$/);
    if (rawMatch) {
        const [, spaces, numbering, content] = rawMatch;
        depths.add(numbering.split('.').filter(x => x).length);
    }
}
console.log(Array.from(depths));
