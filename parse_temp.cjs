const fs = require('fs');

const lines = fs.readFileSync('temp_chapters.txt', 'utf8').split('\n');

let chapters = [];
let currentChapter = null;
let currentRubric = null;

const extractName = (line) => {
  const match = line.match(/name:\s*"([^"]+)"/);
  return match ? match[1] : null;
};

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (!line.trim()) continue;

  const matchSpaces = line.match(/^(\s*)/);
  const indent = matchSpaces ? matchSpaces[1].length : 0;
  
  if (line.includes('d: {')) {
     // try to evaluate it as JS!
     // it looks like: { name: "...", d: ... } or sr: [{ ... }]
     try {
       let jsCode = `(${line.trim().replace(/^sr:\s*\[|\],?$/g, '').replace(/,?$/, '')})`;
       if (jsCode.startsWith('({')) {
         let evaluated = eval(jsCode);
         if (evaluated && evaluated.name) {
           if (currentRubric) {
             evaluated.em = currentRubric.em;
             currentRubric.sr.push(evaluated);
           }
         }
       }
     } catch(e) {
       console.log("Failed to parse:", line);
     }
     continue;
  }

  const name = extractName(line);
  if (!name) continue;

  if (indent === 4) {
    currentChapter = {
      name,
      tr: "",
      icon: name === 'Mind' ? '🧠' : (name === 'Vertigo' ? '💫' : (name === 'Head' ? '🤕' : '💊')),
      pages: "",
      rubrics: []
    };
    chapters.push(currentChapter);
    currentRubric = null;
  } else if (indent === 8) {
    currentRubric = {
      name,
      tr: "",
      em: currentChapter.icon,
      sr: []
    };
    currentChapter.rubrics.push(currentRubric);
  } else if (indent >= 10) {
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

// Write the parsed chapters basically for reference
fs.writeFileSync('parsed_chapters.json', JSON.stringify(chapters, null, 2));
console.log('Successfully wrote parsed_chapters.json');
console.log("Found chapters:", chapters.map(c => c.name));

