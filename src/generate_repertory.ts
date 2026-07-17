import fs from 'fs';

const text = fs.readFileSync('src/extracted_data.txt', 'utf8');

const chapters = [];
let currentChapter = null;
let currentRubric = null;

const lines = text.split('\n');

for (const line of lines) {
    const rawMatch = line.match(/^(\s*)([0-9\.]+)\s+(.*)$/);
    if (!rawMatch) continue;
    
    const [, spaces, numbering, content] = rawMatch;
    const depth = numbering.split('.').filter(x => x).length;
    
    const cleanContent = content.trim().replace(/"/g, '\\"');

    if (depth === 1) {
        let chapName = cleanContent.replace(/^chp-/, '');
        chapName = chapName.charAt(0).toUpperCase() + chapName.slice(1).toLowerCase();
        
        currentChapter = { 
            name: chapName, 
            tr: chapName, 
            t: chapName,
            icon: "📖",
            pages: "",
            rubrics: [] 
        };
        chapters.push(currentChapter);
    } else if (depth === 2) {
        currentRubric = { 
            name: cleanContent, 
            tr: cleanContent,
            em: "📌",
            sr: [] 
        };
        if (currentChapter) currentChapter.rubrics.push(currentRubric);
    } else if (depth >= 3) {
        const subName = cleanContent;
        const subInfo = {
            name: subName,
            tr: subName,
            d: { mind: [], general: {} }
        };
        if (currentRubric) {
            currentRubric.sr.push(subInfo);
        }
    }
}

// Write the output to a new ts file
const outContent = `import { Chapter } from './types';

export const REPERTORY_DATA: Chapter[] = ${JSON.stringify(chapters, null, 2)};
`;

fs.writeFileSync('src/repertoryData.ts', outContent);
console.log('Successfully updated repertoryData.ts');
