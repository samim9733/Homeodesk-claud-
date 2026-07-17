const fs = require('fs');

try {
  let content = fs.readFileSync('src/repertoryData.ts', 'utf8');

  // execute generate_rubrics.mjs
  const execSync = require('child_process').execSync;
  const generateOutput = execSync('node generate_rubrics.mjs', { encoding: 'utf8' });

  const mindStart = generateOutput.indexOf('MIND_RUBRICS_START') + 19;
  const mindEnd = generateOutput.indexOf('MIND_RUBRICS_END');
  const mindRubricsJSON = '[' + generateOutput.substring(mindStart, mindEnd).trim() + ']';

  const genStart = generateOutput.indexOf('GEN_RUBRICS_START') + 18;
  const genEnd = generateOutput.indexOf('GEN_RUBRICS_END');
  const genRubricsJSON = '[' + generateOutput.substring(genStart, genEnd).trim() + ']';

  const mindRubrics = JSON.parse(mindRubricsJSON);
  const genRubrics = JSON.parse(genRubricsJSON);

  // function to replace a chapter's rubrics
  function replaceChapter(chapterName, newRubricsObject) {
    // We look for name: "ChapterName" and then its rubrics: [ ... ]
    // The previous regex was: (name:\s*"ChapterName"[\s\S]*?rubrics:\s*\[)([\s\S]*?)(\n\s*\]\s*\}?,?\s*\{|\]\s*\})
    const regex = new RegExp(`(name:\\s*"${chapterName}"[\\s\\S]*?rubrics:\\s*\\[)([\\s\\S]*?)(\\n\\s*\\]\\s*\\})`, 'g');
    
    content = content.replace(regex, (m, p1, p2, p3) => {
      // transform standard JSON into the pseudo-TS format
      const replacement = JSON.stringify(newRubricsObject, null, 2)
        .replace(/"([^"]+)":/g, '$1:')
        .slice(1, -1);
      return `${p1}\n${replacement}${p3}`;
    });

    // Alternatively, if there's a following chapter:
    const regex2 = new RegExp(`(name:\\s*"${chapterName}"[\\s\\S]*?rubrics:\\s*\\[)([\\s\\S]*?)(\\n\\s*\\]\\n?\\s*\\},?\\s*\\{)`, 'g');
    content = content.replace(regex2, (m, p1, p2, p3) => {
      const replacement = JSON.stringify(newRubricsObject, null, 2)
        .replace(/"([^"]+)":/g, '$1:')
        .slice(1, -1);
      return `${p1}\n${replacement}${p3}`;
    });
  }

  replaceChapter("Mind", mindRubrics);
  replaceChapter("Generalities", genRubrics);

  fs.writeFileSync('src/repertoryData.ts', content);
  console.log("Updated repertoryData.ts with rich rubrics successfully.");

} catch (e) {
  console.error("Error:", e);
}
