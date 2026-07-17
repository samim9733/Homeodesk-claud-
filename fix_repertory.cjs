const fs = require('fs');
const execSync = require('child_process').execSync;

let lines = fs.readFileSync('src/repertoryData.ts', 'utf8').split('\n');

const generateOutput = execSync('node generate_rubrics.mjs', { encoding: 'utf8' });

const mindStartOut = generateOutput.indexOf('MIND_RUBRICS_START') + 19;
const mindEndOut = generateOutput.indexOf('MIND_RUBRICS_END');
const mindRubricsJSON = generateOutput.substring(mindStartOut, mindEndOut).trim();

const genStartOut = generateOutput.indexOf('GEN_RUBRICS_START') + 18;
const genEndOut = generateOutput.indexOf('GEN_RUBRICS_END');
const genRubricsJSON = generateOutput.substring(genStartOut, genEndOut).trim();

const mindRubrics = JSON.parse('[' + mindRubricsJSON + ']');
const genRubrics = JSON.parse('[' + genRubricsJSON + ']');

let mindChapterString = `  {
    name: "Mind",
    tr: "মন",
    t: "মন",
    icon: "🧠",
    pages: "1-95",
    rubrics: ${JSON.stringify(mindRubrics, null, 2).replace(/\n/g, '\n    ')}
  },`;

let genChapterString = `  {
    name: "Generalities",
    tr: "সাধারণ লক্ষণ",
    icon: "🌐",
    pages: "1341-1423",
    rubrics: ${JSON.stringify(genRubrics, null, 2).replace(/\n/g, '\n    ')}
  }
];`;

let mindStartIndex = -1;
let vertigoStartIndex = -1;
let genStartIndex = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('name: "Mind"')) mindStartIndex = i - 1; // get the { line
  if (lines[i].includes('name: "Vertigo"')) vertigoStartIndex = i - 1;
  if (lines[i].includes('name: "Generalities"')) genStartIndex = i - 1;
}

if (mindStartIndex !== -1 && vertigoStartIndex !== -1) {
  lines.splice(mindStartIndex, vertigoStartIndex - mindStartIndex, mindChapterString);
} else {
  console.log("Could not find Mind or Vertigo");
}

// Re-calculate after splice
genStartIndex = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('name: "Generalities"')) genStartIndex = i - 1;
}

if (genStartIndex !== -1) {
  lines.splice(genStartIndex, lines.length - genStartIndex, genChapterString);
} else {
  console.log("Could not find Generalities");
}

fs.writeFileSync('src/repertoryData.ts', lines.join('\n'));
console.log('Fixed repertoryData.ts manually.');
