const fs = require('fs');

try {
  let repertoryFile = fs.readFileSync('src/repertoryData.ts', 'utf8');

  // get the output of generate_rubrics.mjs
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

  // Instead of parsing TS, let's use regex to replace the rubrics array inside the chapter.
  // This is tricky because the rubrics array can be huge.
  // Better way: we can replace the ENTIRE chapter in the file!

  function replaceChapterWithBetterRegex(chapterName, newRubricsObjectArray, icon, trStr, pagesStr) {
    const chapterNameStr = `name: "${chapterName}",`;
    const startIndex = repertoryFile.indexOf(chapterNameStr);
    
    if (startIndex === -1) {
      console.log(`Could not find chapter ${chapterName}`);
      return;
    }

    // find the end of the chapter object: "      }," or similar.
    // we can just match from start to next `    name: ` or end of array
    // Since we know the basic structure, let's just do an ast parse or simple reconstruction.
  }

  // Best way to avoid regex issues on huge TS files:
  // Write a separate ts file that imports REPERTORY_DATA, mutates it, and exports it as a JSON that we then stringify and write?
  // Wait! TypeScript file cannot be required easily to mutate.
} catch(e){
  console.log(e);
}
