const fs = require('fs');

const text = fs.readFileSync('./src/extracted_data.txt', 'utf8');

const chapters = {};
let currentChapter = null;
let currentRubric = null;
let currentLevel2 = null;
let currentLevel3 = null;
let currentLevel4 = null;
let currentLevel5 = null;

const lines = text.split('\n');

for (const line of lines) {
    const rawMatch = line.match(/^(\s*)([0-9\.]+)\s+(.*)$/);
    if (!rawMatch) continue;
    
    const [, spaces, numbering, content] = rawMatch;
    const depth = numbering.split('.').filter(x => x).length;
    
    const cleanContent = content.trim();

    if (depth === 1) {
        let chapName = cleanContent.replace(/^chp-/, '');
        chapName = chapName.charAt(0).toUpperCase() + chapName.slice(1).toLowerCase();
        currentChapter = { name: chapName, rubrics: [] };
        chapters[chapName] = currentChapter;
    } else if (depth === 2) {
        currentRubric = { name: cleanContent, sr: [] };
        if (currentChapter) currentChapter.rubrics.push(currentRubric);
    } else if (depth === 3) {
        currentLevel2 = { name: cleanContent, sr: [] };
        if (currentRubric) currentRubric.sr.push(currentLevel2);
    } else if (depth === 4) {
        currentLevel3 = { name: cleanContent, sr: [] };
        if (currentLevel2) currentLevel2.sr.push(currentLevel3);
    } else if (depth === 5) {
        currentLevel4 = { name: cleanContent, sr: [] };
        if (currentLevel3) currentLevel3.sr.push(currentLevel4);
    } else if (depth === 6) {
        currentLevel5 = { name: cleanContent, sr: [] };
        if (currentLevel4) currentLevel4.sr.push(currentLevel5);
    }
}

function removeEmptySr(obj) {
    if (obj.sr) {
        if (obj.sr.length === 0) {
            delete obj.sr;
        } else {
            for (const child of obj.sr) removeEmptySr(child);
        }
    }
}

Object.values(chapters).forEach(c => {
    c.rubrics.forEach(r => removeEmptySr(r));
});

// Write to json file
fs.writeFileSync('./src/parsed_repertory.json', JSON.stringify(chapters, null, 2));

// Update repertoryData.ts
const code = fs.readFileSync('./src/repertoryData.ts', 'utf8');

// Replace chapters that were parsed
let newCode = code;
// (This is a simplified replacer, we might just want to inject these chapters)

console.log("Found chapters:", Object.keys(chapters).join(", "));
