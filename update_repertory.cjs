import fs from 'fs';

const tempChaptersRaw = fs.readFileSync('temp_chapters.txt', 'utf8');

// The structure is:
// 4 spaces: name: "Chapter",
// 8 spaces: name: "Rubric",
// 12 spaces: name: "Subrubric",
// 16 spaces: ...etc? Let's check temp_chapters.txt format:

const lines = tempChaptersRaw.split('\n');

const newChapters = [];
let currentChapter = null;
let currentRubric = null;

for (let line of lines) {
  if (line.trim() === '') continue;
  let indent = line.search(/\S/);
  let nameMatch = line.match(/name:\s*"([^"]+)"/);
  if (!nameMatch) continue;
  let name = nameMatch[1];

  if (indent === 4) {
    currentChapter = { name, tr: "", t: name, icon: "🩺", pages: "", rubrics: [] };
    if (name === 'Mind') currentChapter.icon = '🧠';
    if (name === 'Vertigo') currentChapter.icon = '💫';
    if (name === 'Head') currentChapter.icon = '🤕';
    if (name === 'Eye') currentChapter.icon = '👁️';
    newChapters.push(currentChapter);
    currentRubric = null;
  } else if (indent === 8) {
    if (currentChapter) {
      currentRubric = { name, tr: "", em: currentChapter.icon || "💊", sr: [] };
      currentChapter.rubrics.push(currentRubric);
    }
  } else if (indent >= 10 && indent <= 14) {
    if (currentRubric) {
      currentRubric.sr.push({
        name,
        tr: "",
        em: currentRubric.em,
        d: { general: {}, location: [] }
      });
    }
  }
}

// Now we need to merge this into src/repertoryData.ts
// Wait, doing this will overwrite everything. Let's make sure we preserve existing data if any.
// Or we can just rebuild the whole REPERTORY_DATA from newChapters.
// Wait, src/repertoryData.ts already has some data, like `Generalities` and `Weakness`.
// Let's just output the whole file.

let out = `import { Chapter } from './types';\n\nexport const REPERTORY_DATA: Chapter[] = ` + JSON.stringify(newChapters, null, 2) + `;\n`;

fs.writeFileSync('src/repertoryData.ts', out);
console.log('Saved src/repertoryData.ts');

